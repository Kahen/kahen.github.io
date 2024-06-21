---
date: 2024-06-15
category:
  - Java
  - Libraries
tag:
  - JavaParser
  - AST
---
# JavaParser 简介 | Baeldung

在本文中，我们将了解 JavaParser 库。我们将看到它是什么，我们可以用它做什么，以及如何使用它。

## **2. JavaParser 是什么？**

JavaParser 是一个用于处理 Java 源代码的开源库。**它允许我们将 Java 源代码解析为抽象语法树（AST）。一旦我们完成这一步，我们可以分析解析后的代码，对其进行操作，甚至编写新的代码。**

使用 JavaParser，我们可以解析 Java 语言直到 Java 18 的源代码。这包括所有稳定的语言特性，但可能不包括任何预览特性。

## **3. 依赖项**

**在我们可以使用 JavaParser 之前，我们需要在构建中包含最新版本，目前是 3.25.10。**

我们需要包含的主要依赖项是 _javaparser-core_。如果我们使用 Maven，我们可以在 _pom.xml_ 文件中包含此依赖项：

```xml
`<dependency>`
    `<groupId>`com.github.javaparser`</groupId>`
    `<artifactId>`javaparser-core`</artifactId>`
    `<version>`3.25.10`</version>`
`</dependency>`
```

或者如果我们使用 Gradle，我们可以在 _build.gradle_ 文件中包含它：

```gradle
implementation("com.github.javaparser:javaparser-core:3.25.10")
```

此时，我们已经准备好在我们的应用程序中使用它了。

还有两个额外的依赖项可用。依赖项 _com.github.javaparser:javaparser-symbol-solver-core_ 提供了一种分析解析后的 AST 的方法，以找到 Java 元素及其声明之间的关系。依赖项 _com.github.javaparser:javaparser-core-serialization_ 提供了一种将解析后的 AST 序列化和反序列化到 JSON 的方法。

## **4. 解析 Java 代码**

一旦我们在应用程序中设置了依赖项，我们就可以开始了。**Java 代码的解析总是从 _StaticJavaParser_ 类开始的。** 这为我们提供了几种不同的解析代码的机制，具体取决于我们正在解析的内容以及它来自何处。

### **4.1. 解析源文件**

**我们将首先查看解析整个源文件。我们可以使用 _StaticJavaParser.parse()_ 方法来实现。** 有几个重载的版本允许我们以不同的方式提供源代码 - 直接作为字符串，作为本地文件系统中的 _File_，或者作为某些资源的 _InputStream_ 或 _Reader_。所有这些的工作方式相同，只是提供要解析的代码的便捷方式。

让我们看看实际应用。这里，我们将尝试解析提供的源代码并生成一个 _CompilationUnit_ 作为结果：

```java
CompilationUnit parsed = StaticJavaParser.parse("class TestClass {}");
```

这代表了我们的 AST，并允许我们检查和操作解析后的代码。

### **4.2. 解析语句**

**我们可以解析的代码的另一端是单独的语句。我们使用 _StaticJavaParser.parseStatement()_ 方法来实现这一点。** 与源文件不同，这里只有一个版本，它接受一个包含要解析的语句的单个字符串。

这个方法返回一个 _Statement_ 对象，表示解析后的语句：

```java
Statement parsed = StaticJavaParser.parseStatement("final int answer = 42;");
```

### **4.3. 解析其他结构**

**JavaParser 还可以解析许多其他结构，涵盖整个 Java 语言直到 Java 18。每种结构都有一个单独的专用解析方法，并返回一个适当的类型来表示解析后的代码。** 例如，我们可以使用 _parseAnnotation()_ 来解析注解，使用 _parseImport()_ 来解析导入语句，使用 _parseBlock()_ 来解析语句块等。

在内部，JavaParser 将使用完全相同的代码来解析我们代码的各个部分。例如，当使用 _parseBlock()_ 解析一个块时，JavaParser 最终将调用与 _parseStatement()_ 直接调用相同的代码。这意味着我们可以依赖这些不同的解析方法对相同的代码子集以相同的方式工作。

**我们需要确切知道我们正在解析的代码类型，以便选择正确的解析方法。** 例如，使用 _parseStatement()_ 方法来解析类定义将会失败。

### **4.4. 格式错误的代码**

**如果解析失败，JavaParser 将抛出一个 _ParseProblemException_，指明代码出了什么问题。** 例如，如果我们尝试解析一个格式错误的 _class_ 定义，那么我们将得到类似这样的内容：

```java
ParseProblemException parseProblemException = assertThrows(ParseProblemException.class,
    () -> StaticJavaParser.parse("class TestClass"));

assertEquals(1, parseProblemException.getProblems().size());
assertEquals("Parse error. Found `<EOF>`, expected one of  \"`<\" \"extends\" \"implements\" \"permits\" \"{\"",
    parseProblemException.getProblems().get(0).getMessage());
```

我们可以从这个错误消息中看出，问题是 _class_ 定义是错误的。在 Java 中，这样的语句必须跟在一个“ _<“_ - 用于泛型定义，_extends_ 或 _implements_ 关键字，或者是一个“ _{“_ 来开始类的实际主体。

## **5. 分析解析后的代码**

**一旦我们解析了一些代码，我们就可以开始分析它以从中学习。这类似于在运行应用程序中的反射，只是针对解析后的源代码而不是当前运行的代码。**

### **5.1. 访问解析后的元素**

**一旦我们解析了一些源代码，我们可以查询 AST 以访问单个元素。** 我们如何做到这一点取决于我们想要访问的元素以及我们解析的内容。

例如，如果我们将源文件解析为 _CompilationUnit_，那么我们可以使用 _getClassByName()_ 访问我们期望存在的类：

```java
Optional`<ClassOrInterfaceDeclaration>`` cls = compilationUnit.getClassByName("TestClass");
```

请注意，这返回一个 _Optional`<ClassOrInterfaceDeclaration>`_。使用 _Optional_ 是因为我们不能保证在该编译单元中存在该类型。在其他情况下，我们可能能够保证元素的存在。例如，一个类总会有一个名称，所以 _ClassOrInterfaceDeclaration.getName()_ 不需要返回一个 _Optional_。

在每个阶段，我们只能直接访问我们当前正在处理的元素中最外层的元素。例如，如果我们从解析源文件中得到了一个 _CompilationUnit_，那么我们可以访问 _package_ 声明、_import_ 语句和顶层类型，但我们不能访问这些类型内的成员。然而，一旦我们访问了这些类型之一，我们就可以访问其中的成员。

### **5.2. 迭代解析后的元素**

**在某些情况下，我们可能不知道解析后的代码中确切存在哪些元素，或者我们只是想处理所有某种特定类型的元素而不是只有一个。**

我们的每种 AST 类型都可以访问一系列适当的嵌套元素。这如何工作取决于我们想要处理的内容。例如，我们可以从 _CompilationUnit_ 中提取所有的 _import_ 语句：

```java
NodeList`<ImportDeclaration>` imports = compilationUnit.getImports();
```

不需要 _Optional_，因为这是保证返回结果的。然而，如果没有导入存在，这个结果可能是一个空列表。

一旦我们这样做了，我们可以像处理任何集合一样处理它。_NodeList_ 类型正确实现了 _java.util.List_，所以我们可以像处理任何其他列表一样处理它。

### **5.3. 迭代整个 AST**

除了从我们解析后的代码中提取确切的一种类型的元素之外，我们还可以遍历整个解析树。**JavaParser 中的所有 AST 类型都实现了访问者模式，允许我们使用自定义访问者访问解析源代码中的每个元素：**

```java
compilationUnit.accept(visitor, arg);
```

然后有两种标准类型的访问者可以使用。这两种都有一个 _visit()_ 方法，用于每种可能的 AST 类型，它接受一个状态参数，该参数被传递到 _accept()_ 调用中。

**最简单的是 _VoidVisitor`<A>`_。** 这有一个针对每种 AST 类型的方法，并且没有返回值。然后我们有一个适配器类型 - _VoidVisitorAdapter_ - 它为我们提供了一个标准实现，以帮助确保整个树被正确调用。

然后我们只需要实现我们感兴趣的方法 - 例如：

```java
compilationUnit.accept(new VoidVisitorAdapter``<Object>``() {
    @Override
    public void visit(MethodDeclaration n, Object arg) {
        super.visit(n, arg);

        System.out.println("Method: " + n.getName());
    }
}, null);
```

这将输出源文件中每个方法名称的日志消息，无论它们在哪里。这个递归遍历整个树结构意味着这些方法可以是顶级类中的，内部类中的，甚至是其他方法中的匿名类中的。

**另一种选择是 _GenericVisitor`<R, A>`_。** 它的工作方式类似于 _VoidVisitor_，除了它的 _visit()_ 方法有返回值。我们也有适配器类，取决于我们想要如何收集每个方法的返回值。例如，_GenericListVisitorAdaptor_ 将强制我们每个方法的返回类型为 _List`<R>`_ 并将所有这些列表合并在一起：

```java
List`````<String>````` allMethods = compilationUnit.accept(new GenericListVisitorAdapter`<String, Object>`() {
    @Override
    public List`````<String>````` visit(MethodDeclaration n, Object arg) {
        List`````<String>````` result = super.visit(n, arg);
        result.add(n.getName().asString());
        return result;
    }
}, null);

```

这将返回一个列表，其中包含整个树中每个方法的名称。

## **6. 输出解析后的代码**

**除了解析和分析我们的代码之外，我们还可以将其再次输出为字符串。** 这可能有很多用途 - 例如，如果我们想要提取并仅输出代码的特定部分。

**实现这一点的最简单方式是使用标准的 _toString()_ 方法。** 我们所有的 AST 类型都正确实现了这一点，并将产生格式化的代码。注意，这可能不会完全按照我们解析代码时的格式，但它仍然会遵循相对标准的习惯。

例如，如果我们解析了以下代码：

```java
package com.baeldung.javaparser;
import java.util.List;
class TestClass {
    private List`````<String>````` doSomething() { }
    private class Inner {
        private String other() { }
    }
}
```

当我们格式化它时，我们将得到这样的输出：

```java
package com.baeldung.javaparser;

import java.util.List;

class TestClass {

    private List`````<String>````` doSomething() {
    }

    private class Inner {

        private String other() {
        }
    }
}
```

**我们可以使用的另一种格式化代码的方法是使用 _DefaultPrettyPrinterVisitor_。** 这是一个标准的访问者类，将处理格式化。这使我们能够配置输出格式化的一些方面。例如，如果我们想要使用两个空格而不是四个进行缩进，我们可以编写：

```java
DefaultPrinterConfiguration printerConfiguration = new DefaultPrinterConfiguration();
printerConfiguration.addOption(new DefaultConfigurationOption(DefaultPrinterConfiguration.ConfigOption.INDENTATION,
    new Indentation(Indentation.IndentType.SPACES, 2)));
DefaultPrettyPrinterVisitor visitor = new DefaultPrettyPrinterVisitor(printerConfiguration);

compilationUnit.accept(visitor, null);
String formatted = visitor.toString();
```

## **7. 操作解析后的代码**

**一旦我们将一些代码解析为 AST，我们也能够对其进行更改。** 由于这现在只是一个 Java 对象模型，我们可以像处理任何其他对象模型一样对待它，JavaParser 为我们提供了自由更改其大多数方面的能力。

结合将我们的 AST 重新输出为工作源代码的能力，这意味着我们可以操作解析后的代码，对其进行更改，并以某种形式提供输出。这对于 IDE 插件、代码编译步骤等非常有用。

我们可以以任何方式使用这一点，只要我们能够访问适当的 AST 元素 - 无论是直接访问它们，使用访问者迭代，还是其他有意义的方式。

例如，如果我们想要将代码中的每个方法名称都大写，我们可以这样做：

```java
compilationUnit.accept(new VoidVisitorAdapter``<Object>``() {
    @Override
    public void visit(MethodDeclaration n, Object arg) {
        super.visit(n, arg);

        String oldName = n.getName().asString();
        n.setName(oldName.toUpperCase());
    }
}, null);
```

这使用一个简单的访问者访问我们源树中的每个方法声明，并使用 _setName()_ 方法为每个方法赋予一个新名称。然后新名称就是旧名称的大写形式。

完成这些后，AST 就会就地更新。然后我们可以按照我们的意愿进行格式化，新格式化的代码将反映我们的更改。

## **8. 总结**

在这里，我们快速介绍了 JavaParser。我们已经展示了如何开始使用它以及使用它可以实现的一些事项。下次你需要操作一些 Java 代码时，为什么不试试呢？

所有示例都可以在 GitHub 上找到。

文章发布后 30 天内开放评论。对于此日期之后的任何问题，请使用网站上的联系方式。

OK