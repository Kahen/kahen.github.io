---
date: 2022-04-01
category:
  - Java
  - 反射
tag:
  - Java 9
  - 反射访问
head:
  - - meta
    - name: keywords
      content: Java 9, 反射, 模块系统
---
# Java 9 非法反射访问警告

在Java 9之前，Java反射API拥有一项超能力：它能够在没有限制的情况下访问非公开的类成员。从Java 9开始，模块系统希望将反射API限制在合理的范围内。

在本教程中，我们将检查模块系统与反射之间的关系。

## 2. 模块系统与反射

尽管反射和模块系统在Java历史的不同时间出现，但它们需要协同工作以构建一个可靠的平台。

### 2.1 底层模型

Java模块系统的目标之一是强封装。**强封装主要包括可读性和可访问性**：

- 模块的可读性是一个粗略的概念，涉及一个模块是否依赖于另一个模块。
- 模块的可访问性是一个更细的概念，关心一个类是否可以访问另一个类的字段或方法。它由类边界、包边界和模块边界提供。

为了提高可读性，我们可以使用模块声明中的“_requires_”指令，在命令行上指定“_add-reads_”选项，或者调用_Module.addReads_方法。同样，为了打破封装边界，我们可以使用模块声明中的“_opens_”指令，在命令行上指定“_add-opens_”选项，或者调用_Module.addOpens_方法。

即使反射也不能打破可读性和可访问性的规则；否则，将导致相应的错误或警告。需要注意的一点是：**在使用反射时，运行时会自动在两个模块之间设置可读性边缘**。这也意味着，如果出现问题，那是因为可访问性。

### 2.2 不同的反射使用情况

在Java模块系统中，存在不同类型的模块，例如命名模块、未命名模块、平台/系统模块、应用程序模块等：

在上述模块类型中，不同模块类型之间存在相当多的组合。通常，未命名模块不能被命名模块读取，除了自动模块。让我们只检查三种典型的非法反射访问情况：

在上面的图片中，深度反射意味着使用反射API通过调用_setAccessible(flag)_方法访问类的非公开成员。当使用反射从另一个命名模块访问命名模块时，我们将获得_IllegalAccessException_或_InaccessibleObjectException_。同样，当从未命名模块使用反射访问应用程序命名模块时，我们会得到相同的错误。

然而，当从未命名模块使用反射访问平台模块时，我们将获得_IllegalAccessException_或警告。警告消息有助于我们找到问题发生的地方，并进行进一步的补救：

```
WARNING: Illegal reflective access by $PERPETRATOR to $VICTIM
```

在上面的警告消息形式中，_$PERPETRATOR_表示反射类信息，_$VICTIM_表示被反射类信息。此消息归因于放宽的强封装。

### 2.3 放宽的强封装

在Java 9之前，许多第三方库使用反射API来执行它们的魔法工作。然而，模块系统的强封装规则将使大多数代码无效，特别是那些使用深度反射访问JDK内部API的代码。这将是不可取的。**为了从Java 8到Java 9的模块系统顺利迁移，做出了妥协：放宽的强封装**。

放宽的强封装提供了一个启动选项_–illegal-access_来控制运行时行为。我们应该注意到_–illegal-access_选项仅在我们使用反射从未命名模块访问平台模块时有效。否则，此选项没有效果。

_–illegal-access_选项有四个具体值：

- _permit_：向未命名模块开放平台模块的每个包，并仅显示一次警告消息
- _warn_：与“_permit_”相同，但每次非法反射访问操作都会显示警告消息
- _debug_：与“_warn_”相同，并打印相应的堆栈跟踪
- _deny_：禁用所有非法反射访问操作

从Java 9开始，_–illegal-access=permit_是默认模式。要使用其他模式，我们可以在命令行上指定此选项：

```
java --illegal-access=deny com.baeldung.module.unnamed.Main
```

在Java 16中，_–illegal-access=deny_成为默认模式。从Java 17开始，完全移除了_–illegal-access_选项。

## 3. 如何修复反射非法访问

**在Java模块系统中，需要打开一个包以允许深度反射**。

### 3.1. 在模块声明中

如果我们是代码作者，我们可以在_module-info.java_中打开包：

```
module baeldung.reflected {
    opens com.baeldung.reflected.opened;
}
```

为了更加谨慎，我们可以使用限定的_opens_：

```
module baeldung.reflected {
    opens com.baeldung.reflected.internal to baeldung.intermedium;
}
```

在将现有代码迁移到模块系统时，为了方便，我们可以打开整个模块：

```
open module baeldung.reflected {
    // 不要使用opens指令
}
```

我们应该注意到**一个开放的模块不允许内部_opens_指令**。

### 3.2. 在命令行上

如果我们不是代码作者，我们可以使用命令行上的_–add-opens_选项：

```
--add-opens java.base/java.lang=baeldung.reflecting.named
```

并且，要向所有未命名模块添加开放，我们可以使用_ALL-UNNAMED_：

```
java --add-opens java.base/java.lang=ALL-UNNAMED
```

### 3.3. 在运行时

要在运行时添加开放，我们可以使用_Module.addOpens_方法：

```
srcModule.addOpens("com.baeldung.reflected.internal", targetModule);
```

在上面的代码片段中，_srcModule_向_targetModule_打开了“_com.baeldung.reflected.internal_”包。

需要注意的一点是：**_Module.addOpens_方法是调用者敏感的**。此方法只有在我们从被修改的模块、从它已授予开放访问权限的模块，或从未命名模块调用时才会成功。否则，将导致_IllegalCallerException_。

另一种向目标模块添加开放的方法是使用Java代理。在_java.instrument_模块中，自Java 9以来，_Instrumentation_类增加了一个新的_redefineModule_方法。此方法可以用来添加额外的读取、导出、开放、使用和提供：

```
void redefineModule(Instrumentation inst, Module src, Module target) {
    // 准备额外的读取
    Set`<Module>` extraReads = Collections.singleton(target);

    // 准备额外的导出
    Set`<String>` packages = src.getPackages();
    Map<String, Set`<Module>`> extraExports = new HashMap<>();
    for (String pkg : packages) {
        extraExports.put(pkg, extraReads);
    }

    // 准备额外的开放
    Map<String, Set`<Module>`> extraOpens = new HashMap<>();
    for (String pkg : packages) {
        extraOpens.put(pkg, extraReads);
    }

    // 准备额外的使用
    Set```<Class<?>```> extraUses = Collections.emptySet();

    // 准备额外的提供
    Map```<Class<?>```, List```<Class<?>```>> extraProvides = Collections.emptyMap();

    // 重新定义模块
    inst.redefineModule(src, extraReads, extraExports, extraOpens, extraUses, extraProvides);
}
```

在上面的代码中，我们首先使用_target_模块构建_extraReads_、_extraExports_和_extraOpens_变量。然后，我们调用_Instrumentation.redefineModule_方法。结果，_src_模块将对_target_模块可访问。

## 4. 结论

在本教程中，我们首先介绍了模块系统的可读性和可访问性。然后，我们查看了不同的非法反射访问使用情况以及放宽的强封装如何帮助我们从Java 8迁移到Java 9模块系统。最后，我们提供了解决非法反射访问的不同方法。

像往常一样，本教程的源代码可以在GitHub上找到。