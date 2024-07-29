---
date: 2021-05-01
category:
  - Java
  - Reflection
tag:
  - Java
  - Reflection
  - Class Loaders
  - Reflections Library
  - Google Guava Library
head:
  - - meta
    - name: keywords
      content: Java, Reflection, Class Loaders, Reflections Library, Google Guava Library
------
# 在Java包中查找所有类

## 1. 概述

有时，我们希望了解应用程序的运行时行为，例如查找运行时可用的所有类。

在本教程中，我们将探讨几个示例，展示如何在运行时查找Java包中的所有类。

## 2. 类加载器

首先，我们将从Java类加载器开始讨论。Java类加载器是Java运行时环境（JRE）的一部分，它动态地将Java类加载到Java虚拟机（JVM）中。Java类加载器将JRE与文件和文件系统解耦。**并非所有类都由单个类加载器加载**。

让我们通过图示来理解Java中可用的类加载器：

![img](https://www.baeldung.com/wp-content/uploads/2021/05/ClassLoaders.png)

Java 9在类加载器方面引入了一些重大变化。随着模块的引入，我们可以选择在类路径旁边提供模块路径。系统类加载器加载在模块路径上存在的类。

**类加载器是动态的**。它们不需要告诉JVM它在运行时可以提供哪些类。因此，查找包中的类本质上是一个文件系统操作，而不是通过使用Java反射来完成的。

然而，我们可以编写自己的类加载器或检查类路径以查找包内的类。

为了说明，让我们创建一个包 `com.baeldung.reflection.access.packages.search`。

现在，让我们定义一个示例类：

```java
public class ClassExample {
    class NestedClass {
    }
}
```

接下来，让我们定义一个接口：

```java
public interface InterfaceExample {
}
```

在接下来的部分中，我们将看看如何使用系统类加载器和一些第三方库来查找类。

### 3.1. 系统类加载器

首先，我们将使用内置的系统类加载器。**系统类加载器** **加载在类路径中找到的所有类**。这发生在JVM的早期初始化期间：

```java
public class AccessingAllClassesInPackage {

    public Set``````<Class>`````` findAllClassesUsingClassLoader(String packageName) {
        InputStream stream = ClassLoader.getSystemClassLoader()
          .getResourceAsStream(packageName.replaceAll("[.]", "/"));
        BufferedReader reader = new BufferedReader(new InputStreamReader(stream));
        return reader.lines()
          .filter(line -> line.endsWith(".class"))
          .map(line -> getClass(line, packageName))
          .collect(Collectors.toSet());
    }

    private Class getClass(String className, String packageName) {
        try {
            return Class.forName(packageName + "."
              + className.substring(0, className.lastIndexOf('.')));
        } catch (ClassNotFoundException e) {
            // 处理异常
        }
        return null;
    }
}
```

在我们上面的示例中，我们使用静态 _getSystemClassLoader()_ 方法加载系统类加载器。

接下来，我们将查找给定包中的资源。我们将使用 _getResourceAsStream_ 方法将资源作为URL流读取。为了获取包下的资源，我们需要将包名转换为URL字符串。因此，我们需要将所有的点（.）替换为路径分隔符（“/”）。

之后，我们将流输入到 _BufferedReader_ 并过滤所有以 _.class_ 扩展名结尾的URL。获取所需的资源后，我们将构造类并将所有结果收集到一个 _Set_ 中。**由于Java不允许lambda抛出异常，我们必须在 _getClass_ 方法中处理它**。

让我们现在测试这个方法：

```java
@Test
public void when_findAllClassesUsingClassLoader_thenSuccess() {
    AccessingAllClassesInPackage instance = new AccessingAllClassesInPackage();

    Set``````<Class>`````` classes = instance.findAllClassesUsingClassLoader(
      "com.baeldung.reflection.access.packages.search");

    Assertions.assertEquals(3, classes.size());
}

```

包中只有两个Java文件。然而，我们声明了三个类——包括嵌套类 _NestedExample_。因此，我们的测试结果显示了三个类。

请注意，搜索包与当前工作包不同。

### 3.2. Reflections库

Reflections是一个流行的库，它扫描当前类路径并允许我们在运行时查询它。

让我们首先将 _reflections_ 依赖项添加到我们的Maven项目中：

```xml
``<dependency>``
    ``<groupId>``org.reflections``</groupId>``
    ``<artifactId>``reflections``</artifactId>``
    ``<version>``0.9.12``</version>``
``</dependency>``
```

现在，让我们深入代码示例：

```java
public Set``````<Class>`````` findAllClassesUsingReflectionsLibrary(String packageName) {
    Reflections reflections = new Reflections(packageName, new SubTypesScanner(false));
    return reflections.getSubTypesOf(Object.class)
      .stream()
      .collect(Collectors.toSet());
}
```

在这种方法中，我们初始化了 _SubTypesScanner_ 类，并获取了 _Object_ 类的所有子类型。通过这种方法，我们在获取类时可以获得更多的粒度。

再次，让我们测试一下：

```java
@Test
public void when_findAllClassesUsingReflectionsLibrary_thenSuccess() {
    AccessingAllClassesInPackage instance = new AccessingAllClassesInPackage();

    Set``````<Class>`````` classes = instance.findAllClassesUsingReflectionsLibrary(
      "com.baeldung.reflection.access.packages.search");

    Assertions.assertEquals(3, classes.size());
}
```

与我们之前的测试类似，这个测试找到了在给定包中声明的类。

现在，让我们继续下一个示例。

### 3.3. Google Guava库

在这一部分，我们将看到如何使用Google Guava库查找类。Google Guava提供了一个 _ClassPath_ 工具类，它扫描类加载器的源并找到所有可加载的类和资源。

首先，让我们将 _guava_ 依赖项添加到我们的项目中：

```xml
``<dependency>``
      ``<groupId>``com.google.guava``</groupId>``
      ``<artifactId>``guava``</artifactId>``
      ``<version>``31.0.1-jre``</version>``
``</dependency>``
```

让我们深入代码：

```java
public Set``````<Class>`````` findAllClassesUsingGoogleGuice(String packageName) throws IOException {
    return ClassPath.from(ClassLoader.getSystemClassLoader())
      .getAllClasses()
      .stream()
      .filter(clazz -> clazz.getPackageName()
        .equalsIgnoreCase(packageName))
      .map(clazz -> clazz.load())
      .collect(Collectors.toSet());
}
```

在上述方法中，我们将系统类加载器作为输入提供给 _ClassPath#from_ 方法。所有由 _ClassPath_ 扫描的类都根据包名进行过滤。过滤后的类然后被加载（但未链接或初始化）并收集到一个 _Set_ 中。

让我们现在测试这个方法：

```java
@Test
public void when_findAllClassesUsingGoogleGuice_thenSuccess() throws IOException {
    AccessingAllClassesInPackage instance = new AccessingAllClassesInPackage();

    Set``````<Class>`````` classes = instance.findAllClassesUsingGoogleGuice(
      "com.baeldung.reflection.access.packages.search");

    Assertions.assertEquals(3, classes.size());
}
```

此外，Google Guava库还提供了 _getTopLevelClasses()_ 和 _getTopLevelClassesRecursive()_ 方法。

重要的是要注意，在所有上述示例中，如果存在 _package-info_ 并在包下注释了一个或多个包级注释，则会将其包含在可用类列表中。

下一节将讨论如何在模块化应用程序中查找类。

### 4. 在模块化应用程序中查找类

Java平台模块系统（JPMS）通过模块引入了**新的访问控制级别**。每个包必须显式导出才能被模块外部访问。

在模块化应用程序中，每个模块可以是命名模块、未命名模块或自动模块。

对于命名和自动模块，内置系统类加载器将没有类路径。系统类加载器将使用应用程序模块路径搜索类和资源。

对于未命名模块，它将将类路径设置为当前工作目录。

### 4.1. 模块内

模块中的所有包都可以访问模块中的其他包。模块内的代码享有对所有类型及其成员的反射访问权限。

### 4.2. 模块外

由于Java执行最严格的访问控制，我们必须显式声明使用 _export_ 或 _open_ 模块声明来获取模块内类的反射访问权限。

对于普通模块，导出包（但不是开放包）的反射访问仅提供对声明包的 _public_ 和 _protected_ 类型及其所有成员的访问权限。

我们可以构建一个导出需要搜索的包的模块：

```java
module my.module {
    exports com.baeldung.reflection.access.packages.search;
}
```

对于普通模块，开放包的反射访问提供对声明包的所有类型及其成员的访问：

```java
module my.module {
    opens com.baeldung.reflection.access.packages.search;
}
```

同样，开放模块授予对所有类型及其成员的反射访问权限，就好像所有包都已打开一样。让我们现在打开我们的整个模块以进行反射访问：

```java
open module my.module{
}
```

最后，在确保为模块提供了适当的模块描述以访问包之后，可以使用上一节中的任何方法来查找包中的所有可用类。

