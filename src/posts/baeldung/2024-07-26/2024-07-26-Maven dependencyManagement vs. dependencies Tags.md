---
date: 2022-04-01
category:
  - Maven
  - Java
tag:
  - dependencyManagement
  - dependencies
head:
  - - meta
    - name: keywords
      content: Maven, dependencyManagement, dependencies, Java, POM
---
# Maven dependencyManagement 与 dependencies 标签对比

在本教程中，我们将回顾 Maven 的两个重要标签 —— _dependencyManagement_ 和 _dependencies_。

这些特性对于多模块项目尤其有用。

我们将回顾这两个标签的相似之处和不同之处，并且我们还将看看开发者在使用它们时常见的一些错误，这些错误可能会导致混淆。

## 2. 使用

通常，我们使 _dependencyManagement_ 标签来避免在 _dependencies_ 标签中重复定义 _version_ 和 _scope_ 标签。通过这种方式，所需依赖项在中央 POM 文件中声明。

### 2.1. _dependencyManagement_

这个标签由一个 _dependencies_ 标签组成，该标签本身可能包含多个 _dependency_ 标签。每个 _dependency_ 至少应该有以下三个主要标签：_groupId__artifactId_ 和 _version_。让我们看一个例子：

```xml
````<dependencyManagement>````
    `````````<dependencies>`````````
        `````````<dependency>`````````
            `````````<groupId>`````````org.apache.commons`````````</groupId>`````````
            `````````<artifactId>`````````commons-lang3`````````</artifactId>`````````
            `````<version>`````3.14.0`````</version>`````
        `````````</dependency>`````````
    `````````</dependencies>`````````
````</dependencyManagement>````
```

上述代码仅声明了新的 artifact _commons-lang3_，但它并没有真正将其添加到项目依赖资源列表中。

### 2.2. _dependencies_

这个标签包含 _dependency_ 标签的列表。每个 _dependency_ 至少应该有以下两个主要标签，分别是 _groupId_ 和 _artifactId_。

让我们快速看一个例子：

```xml
`````````<dependencies>`````````
    `````````<dependency>`````````
        `````````<groupId>`````````org.apache.commons`````````</groupId>`````````
        `````````<artifactId>`````````commons-lang3`````````</artifactId>`````````
        `````<version>`````3.14.0`````</version>`````
    `````````</dependency>`````````
`````````</dependencies>`````````
```

**如果我们之前在 POM 文件中使用了 _dependencyManagement_ 标签，那么 _version_ 和 _scope_ 标签可以隐式继承：**

```xml
`````````<dependencies>`````````
    `````````<dependency>`````````
        `````````<groupId>`````````org.apache.commons`````````</groupId>`````````
        `````````<artifactId>`````````commons-lang3`````````</artifactId>`````````
    `````````</dependency>`````````
`````````</dependencies>`````````
```

## 3. 相似之处

这两个标签都旨在声明一些第三方或子模块依赖。它们相互补充。

事实上，我们通常只定义一次 _dependencyManagement_ 标签，然后是 _dependencies_ 标签。这用于在 POM 文件中声明依赖项。**这种声明只是一种宣告，它并没有真正将依赖项添加到项目中。**

让我们看一个添加 JUnit 库依赖的示例：

```xml
````<dependencyManagement>````
    `````````<dependencies>`````````
        `````````<dependency>`````````
            `````````<groupId>`````````junit`````````</groupId>`````````
            `````````<artifactId>`````````junit`````````</artifactId>`````````
            `````<version>`````4.13.2`````</version>`````
            ```<scope>```test```</scope>```
        `````````</dependency>`````````
    `````````</dependencies>`````````
````</dependencyManagement>````
```

正如我们在上述代码中看到的，有一个 _dependencyManagement_ 标签，它本身包含另一个 _dependencies_ 标签。

现在，让我们看看代码的另一面，它将实际的依赖项添加到项目中：

```xml
`````````<dependencies>`````````
    `````````<dependency>`````````
        `````````<groupId>`````````junit`````````</groupId>`````````
        `````````<artifactId>`````````junit`````````</artifactId>`````````
    `````````</dependency>`````````
`````````</dependencies>`````````
```

所以，当前标签与之前的非常相似。它们都会定义依赖项列表。当然，还有一些小的差异，我们很快就会介绍。

在两个代码片段中重复了相同的 _groupId_ 和 _artifactId_ 标签，它们之间有着有意义的相关性：它们都指向同一个 artifact。

正如我们所看到的，我们后面的 _dependency_ 标签中没有 _version_ 标签。令人惊讶的是，这是有效的语法，可以解析和编译而没有问题。原因很容易猜到：它将使用 _dependencyManagement_ 声明的版本。

## 4. 不同之处

### **4.1. 结构差异**

正如我们之前所覆盖的，这两个标签之间的主要结构差异是继承逻辑。我们在 _dependencyManagement_ 标签中定义版本，然后我们可以在下一个 _dependencies_ 标签中使用提到的版本，而无需指定它。

### **4.2. 行为差异**

**_dependencyManagement_ 只是一个声明，它并没有真正添加依赖项。** 在这一节中声明的 _dependencies_ 必须由 _dependencies_ 标签稍后使用。只是 _dependencies_ 标签才会导致真正的依赖关系发生。在上面的示例中，_dependencyManagement_ 标签不会将 _junit_ 库添加到任何作用域中。它只是对未来 _dependencies_ 标签的声明。

## 5. 真实世界示例

几乎所有基于 Maven 的开源项目都使用这种机制。

让我们看一个 Maven 项目本身的例子。我们看到 _hamcrest-core_ 依赖项，它存在于 Maven 项目中。它首先在 _dependencyManagement_ 标签中声明，然后由主 _dependencies_ 标签导入：

```xml
````<dependencyManagement>````
    `````````<dependencies>`````````
        `````````<dependency>`````````
            `````````<groupId>`````````org.hamcrest`````````</groupId>`````````
            `````````<artifactId>`````````hamcrest-core`````````</artifactId>`````````
            `````<version>`````2.2`````</version>`````
            ```<scope>```test```</scope>```
        `````````</dependency>`````````
    `````````</dependencies>`````````
````</dependencyManagement>````

`````````<dependencies>`````````
    `````````<dependency>`````````
        `````````<groupId>`````````org.hamcrest`````````</groupId>`````````
        `````````<artifactId>`````````hamcrest-core`````````</artifactId>`````````
        ```<scope>```test```</scope>```
    `````````</dependency>`````````
`````````</dependencies>`````````
```

## 6. 常见用例

这种特性的一个非常常见的用例是多模块项目。

想象我们有一个由不同模块组成的大型项目。每个模块都有自己的依赖项，每个开发者可能会使用不同版本的依赖项。然后它可能导致不同 artifact 版本的网状结构，这也可能导致难以解决的冲突。

**解决这个问题的简单方法绝对是在根 POM 文件中使用 _dependencyManagement_ 标签（通常称为“父”），然后在子模块的 POM 文件中（子模块）甚至父模块本身（如果适用）中使用 _dependencies_。**

如果我们有一个单一模块，使用这个特性是否有意义？尽管这在多模块环境中非常有用，即使在单模块项目中，也可以将其作为最佳实践来遵循。这有助于提高项目的可读性，并且也使其准备好扩展到多模块项目。

## 7. 常见错误

一个常见的错误是仅在 _dependencyManagement_ 部分定义依赖项，而没有在 _dependencies_ 标签中包含它。在这种情况下，我们将遇到编译或运行时错误，具体取决于提到的 _scope_。

让我们看一个例子：

```xml
````<dependencyManagement>````
    `````````<dependencies>`````````
        `````````<dependency>`````````
            `````````<groupId>`````````org.apache.commons`````````</groupId>`````````
            `````````<artifactId>`````````commons-lang3`````````</artifactId>`````````
            `````<version>`````3.14.0`````</version>`````
        `````````</dependency>`````````
        ...
    `````````</dependencies>`````````
````</dependencyManagement>````
```

想象上述 POM 代码片段。然后假设我们要在子模块源文件中使用这个库：

```java
import org.apache.commons.lang3.StringUtils;

public class Main {
    public static void main(String[] args) {
        StringUtils.isBlank(" ");
    }
}
```

这段代码将无法编译，因为缺少库。编译器会报错：

```
[ERROR] Failed to execute goal compile (default-compile) on project sample-module: Compilation failure
[ERROR] ~/sample-module/src/main/java/com/baeldung/Main.java:[3,32] package org.apache.commons.lang3 does not exist
```

为了避免这个错误，只需在子模块 POM 文件中添加以下 _dependencies_ 标签即可：

```xml
`````````<dependencies>`````````
    `````````<dependency>`````````
        `````````<groupId>`````````org.apache.commons`````````</groupId>`````````
        `````````<artifactId>`````````commons-lang3`````````</artifactId>`````````
    `````````</dependency>`````````
`````````</dependencies>`````````
```

## 8. 结论

在本教程中，我们比较了 Maven 的 _dependencyManagement_ 和 _dependencies_ 标签。然后，我们回顾了它们的相似之处和不同之处，并看到了它们如何协同工作。

像往常一样，这些示例的代码可以在 GitHub 上找到。