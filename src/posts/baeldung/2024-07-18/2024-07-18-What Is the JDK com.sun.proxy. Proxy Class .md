---
date: 2022-05-01
category:
  - Java
  - JDK
tag:
  - JDK
  - 动态代理
head:
  - - meta
    - name: keywords
      content: JDK, 动态代理, $Proxy类
---

# JDK 中的 com.sun.proxy.$Proxy 类是什么？

当我们使用动态代理时，JDK 会动态生成一个 _$Proxy_ 类。通常，这个 _$Proxy_ 类的完全限定类名类似于 _com.sun.proxy.$Proxy0_。正如 Java 文档所说，“$Proxy” 是代理类的保留名称前缀。

在本教程中，我们将探索这个 _$Proxy_ 类。

在开始之前，让我们区分一下 _java.lang.reflect.Proxy_ 类和 _$Proxy_ 类。_java.lang.reflect.Proxy_ 是 JDK 内置的类。与之相反，**_$Proxy_ 类是在运行时动态生成的**。从类层次结构的角度来看，_$Proxy_ 类继承了 _java.lang.reflect.Proxy_ 类。

### 2.1. 动态代理示例

为了讨论的基础，我们定义了两个接口：_BasicOperation_ 和 _AdvancedOperation_。_BasicOperation_ 接口包含了 _add_ 和 _subtract_ 方法：

```java
public interface BasicOperation {
    int add(int a, int b);

    int subtract(int a, int b);
}
```

而 _AdvancedOperation_ 接口有 _multiply_ 和 _divide_ 方法：

```java
public interface AdvancedOperation {
    int multiply(int a, int b);

    int divide(int a, int b);
}
```

要获取一个新生成的代理类——_$Proxy_ 类——我们可以调用 _Proxy::getProxyClass_ 方法：

```java
ClassLoader classLoader = ClassLoader.getSystemClassLoader();
Class```<?>```[] interfaces = {BasicOperation.class, AdvancedOperation.class};
Class```<?>``` proxyClass = Proxy.getProxyClass(classLoader, interfaces);
```

然而，**上述 _proxyClass_ 只存在于运行中的 JVM 中，我们不能直接查看其类成员**。

### 2.2. 转储 _$Proxy_ 类

为了仔细检查这个 _$Proxy_ 类，我们最好将其转储到磁盘。在使用 Java 8 时，我们可以在命令行指定 “_sun.misc.ProxyGenerator.saveGeneratedFiles_” 选项：

```shell
-Dsun.misc.ProxyGenerator.saveGeneratedFiles=true
```

或者我们可以通过调用 _System::setProperty_ 方法来设置这个选项：

```java
System.setProperty("sun.misc.ProxyGenerator.saveGeneratedFiles", "true");
```

在 Java 9 及更高版本中，我们应该使用 “_jdk.proxy.ProxyGenerator.saveGeneratedFiles_” 选项代替。为什么会有这样的差异？由于 Java 模块系统，_ProxyGenerator_ 类的包已经改变了。在 Java 8 中，_ProxyGenerator_ 在 “_sun.misc_” 包中；然而，自 Java 9 以来，_ProxyGenerator_ 已经移动到了 “_java.lang.reflect_” 包中。

如果我们仍然不知道哪个选项合适，我们可以查看 _ProxyGenerator_ 类的 _saveGeneratedFiles_ 字段以确定正确的选项。

注意这里：**_ProxyGenerator_ 类只读取这个属性一次**。这意味着 _System::setProperty_ 方法在 JVM 显式或隐式生成任何 _$Proxy_ 类后将无效。具体来说，调用 _Proxy::getProxyClass_ 或 _Proxy::newProxyInstance_ 方法将显式生成 _$Proxy_ 类。另一方面，当我们读取注解时，尤其是在单元测试框架中，JVM 将隐式或自动生成 _$Proxy_ 类来表示注解实例。

转储的类文件的确切位置直接关系到其完全限定类名。例如，如果新生成的类名是 “_com.sun.proxy.$Proxy0_”，那么转储的类文件将是当前目录下的 “_com/sun/proxy/$Proxy0.class_”：

![img](https://www.baeldung.com/wp-content/uploads/2022/05/p1.png)

### 2.3. _$Proxy_ 类的成员

现在，让我们检查一下这个生成的 _$Proxy_ 类的类成员。

让我们首先检查类层次结构。**_$Proxy0_ 类将 _java.lang.reflect.Proxy_ 作为其超类，这隐含地解释了为什么动态代理只支持接口**。此外，《$Proxy0_ 类实现了我们之前定义的 _BasicOperation_ 和 _AdvancedOperation_ 接口：

```java
public final class $Proxy0 extends Proxy implements BasicOperation, AdvancedOperation
```

为了可读性，我们已经将 _$Proxy0_ 类的字段名称更改为更有意义的名称。_hashCodeMethod_、_equalsMethod_ 和 _toStringMethod_ 字段追溯到 _Object_ 类；_addMethod_ 和 _subtractMethod_ 字段与 _BasicOperation_ 接口相关；_multiplyMethod_ 和 _divideMethod_ 字段映射到 _AdvanceOperation_ 接口：

```java
private static Method hashCodeMethod;
private static Method equalsMethod;
private static Method toStringMethod;
private static Method addMethod;
private static Method subtractMethod;
private static Method multiplyMethod;
private static Method divideMethod;
```

最后，《$Proxy0_ 类中定义的方法遵循相同的逻辑：**它们所有的实现都委托给 _InvocationHandler::invoke_ 方法**。而且，《$Proxy0_ 类将从其构造函数中获取一个 _InvocationHandler_ 实例：

```java
public $Proxy0(InvocationHandler handler) {
    super(handler);
}

public final int hashCode() {
    try {
        return (Integer) super.h.invoke(this, hashCodeMethod, (Object[]) null);
    }
    catch (RuntimeException | Error ex1) {
        throw ex1;
    }
    catch (Throwable ex2) {
        throw new UndeclaredThrowableException(ex2);
    }
}
```

## 3. 代理如何工作

在我们检查了 _$Proxy_ 类本身之后，是时候更进一步了：如何生成 _$Proxy_ 类以及如何加载 _$Proxy_ 类？关键逻辑在于 _java.lang.reflect.Proxy_ 和 _ProxyGenerator_ 类。

随着新 Java 版本的发布，《Proxy_ 和 _ProxyGenerator_ 类的实现细节不断发展。简单来说，《ProxyGenerator_ 负责生成 _$Proxy_ 类的字节数组，而 _Proxy_ 类负责将这个字节数组加载到 JVM 中。

现在，让我们使用 Java 8、Java 11 和 Java 17 进行讨论，因为它们是 LTS（长期支持）版本。

### 3.1. Java 8

在 Java 8 中，我们可以将 _$Proxy_ 类的生成过程描述为五个步骤：

![img](https://www.baeldung.com/wp-content/uploads/2022/05/p8.png)

_Proxy::getProxyClass_ 或 _Proxy::newProxyInstance_ 方法是我们的起点——两者都会调用 _Proxy::getProxyClass0_ 方法。而 _Proxy::getProxyClass0_ 方法是一个 _private_ 方法，并将进一步调用 _ProxyClassFactory::apply_ 方法。

_ProxyClassFactory_ 是在 _Proxy_ 类中定义的静态嵌套类。它的 _apply_ 方法计算即将到来的类的包名、类名和访问标志。然后，_apply_ 方法将调用 _ProxyGenerator::generateProxyClass_ 方法。

在 Java 8 中，《ProxyGenerator_ 类是一个定义在 “_sun.misc_” 包中的 _public_ 类。它自 Java 9 以来已经迁移到了 “_java.lang.reflect_” 包中。而且，_generateProxyClass_ 方法将创建一个 _ProxyGenerator_ 实例，调用其 _generateClassFile_ 方法，该方法负责生成字节码，可选择性地转储类文件，并返回生成的字节数组。

在字节码生成成功后，《Proxy::defineClass0_ 方法负责将该字节数组加载到运行中的 JVM 中。最后，我们得到了一个动态生成的 _$Proxy_ 类。

### 3.2. Java 11

与 Java 8 版本相比，Java 11 引入了 **三个主要变化**：

- _Proxy_ 类增加了一个新的 _getProxyConstructor_ 方法和一个静态嵌套的 _ProxyBuilder_ 类
- 为了 Java 模块系统，《ProxyGenerator_ 迁移到了 “_java.lang.reflect_” 包并成为了一个包私有类
- 为了将生成的字节数组加载到 JVM 中，《Unsafe::defineClass_ 发挥了作用

![img](https://www.baeldung.com/wp-content/uploads/2022/05/p11.png)

### 3.3. Java 17

与 Java 11 版本相比，Java 17 有 **两个主要变化**：

- 从实现的角度来看，《ProxyGenerator_ 类使用 JDK 内置的 ASM 进行字节码生成
- _JavaLangAccess::defineClass_ 方法负责将生成的字节码加载到 JVM 中

![img](https://www.baeldung.com/wp-content/uploads/2022/05/p17.png)

## 4. 使用代理的注解

在 Java 中，注解类型是一种特殊类型的接口类型。但我们可能会想如何创建注解实例。事实上，我们不需要。**当我们使用 Java 反射 API 读取注解时，JVM 将动态生成一个 _$Proxy_ 类作为注解类型的实现**：

```java
FunctionalInterface instance = Consumer.class.getDeclaredAnnotation(FunctionalInterface.class);
Class```<?>``` clazz = instance.getClass();

boolean isProxyClass = Proxy.isProxyClass(clazz);
assertTrue(isProxyClass);
```

在上述代码片段中，我们使用 _Consumer_ 类来获取其 _FunctionalInterface_ 实例，然后获取实例的类，并最后使用 _Proxy::isProxyClass_ 方法来检查该类是否是一个 _$Proxy_ 类。

## 5. 结论

在本教程中，我们首先介绍了一个动态代理示例，然后转储了生成的 _$Proxy_ 类并检查了它的成员。为了进一步了解，我们解释了在不同 Java 版本中，_Proxy_ 和 _ProxyGenerator_ 类如何协同工作来生成和加载 _$Proxy_ 类。最后，我们提到注解类型也是通过使用 _$Proxy_ 类来实现的。

像往常一样，本教程的源代码可以在 GitHub 上找到。

![img](https://www.baeldung.com/wp-content/uploads/2022/05/p1.png)

OK