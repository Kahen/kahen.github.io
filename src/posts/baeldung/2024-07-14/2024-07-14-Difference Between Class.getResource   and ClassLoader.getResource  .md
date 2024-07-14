---
date: 2022-04-01
category:
  - Java
tag:
  - Class
  - ClassLoader
  - getResource
head:
  - - meta
    - name: keywords
      content: Java, Class, ClassLoader, getResource, 资源加载
---
# Class.getResource() 和 ClassLoader.getResource() 之间的区别

在这个简短的教程中，我们将探讨 Class.getResource() 和 ClassLoader.getResource() 方法之间的区别。

## 2. getResource() 方法

我们可以使用 Class 或 ClassLoader 实例上的 getResource() 方法来查找给定名称的资源。资源被认为是数据，例如图像、文本、音频等。作为路径分隔符，我们应该始终使用斜杠（"/"）。

该方法返回一个用于读取资源的 URL 对象，或者如果找不到资源或调用者没有权限检索资源，则返回 null 值。

现在，让我们看看如何使用 Class 实例获取资源。**在使用 Class 对象定位资源时，我们可以传递绝对路径或相对路径。**

与给定类关联的资源搜索规则由类的类加载器实现。

寻找资源的过程将委托给类对象的类加载器。换句话说，定义在 Class 实例上的 getResource() 方法最终将调用 ClassLoader 的 getResource() 方法。

在委托之前，将从给定的资源名称中派生出绝对资源名称。在创建绝对资源名称时，将使用以下算法：

- 如果资源名称以领先的斜杠（"/"）开头，它表示资源名称是绝对的。绝对资源名称将清除其前导斜杠，并且不进行任何修改就传递给适当的 ClassLoader 方法以定位资源。
- 如果提供的资源名称不以斜杠开头，则名称被视为相对于类的包。相对名称首先被转换为绝对名称，然后传递给 ClassLoader 方法。

首先，让我们假设我们有在 _com/baeldung/resource_ 目录中定义的 _example.txt_ 资源。此外，让我们假设类 _ClassGetResourceExample_ 定义在 _com.baeldung.resourc_ e 包中。

现在，我们可以使用绝对路径检索资源：

```java
void givenAbsoluteResourcePath_whenGetResource_thenReturnResource() {
    URL resourceAbsolutePath = ClassGetResourceExample.class
        .getResource("/com/baeldung/resource/example.txt");
    Assertions.assertNotNull(resourceAbsolutePath);
}
```

**使用 Class.getResource() 时，绝对资源路径应该以领先的斜杠开头。**

此外，由于我们的资源与我们的类在同一个包中，我们也可以使用相对路径检索它：

```java
void givenRelativeResourcePath_whenGetResource_thenReturnResource() {
    URL resourceRelativePath = ClassGetResourceExample.class.getResource("example.txt");
    Assertions.assertNotNull(resourceRelativePath);
}
```

然而，重要的是要提到，我们只能使用相对路径获取资源，前提是资源定义在与类相同的包中。否则，我们将得到一个 null 作为值。

## 4. ClassLoader.getResource()

顾名思义，ClassLoader 表示负责加载类的类。每个 Class 实例都包含对其 ClassLoader 的引用。

ClassLoader 类使用委托模型搜索类和资源。此外，每个 ClassLoader 类的实例都有一个相关的父 ClassLoader。

当被要求查找资源时，ClassLoader 实例将首先将其父 ClassLoader 委托搜索，然后尝试自己找到资源。

如果父 ClassLoader 不存在，将搜索虚拟机内置的 ClassLoader 的路径，称为引导类加载器。引导类加载器没有父类加载器，但可以作为 ClassLoader 实例的父类加载器。

或者，如果之前的搜索失败，该方法将调用 findResource() 方法来查找资源。

**指定为输入的资源名称始终被视为绝对。** 值得注意的是，Java 从类路径加载资源。

让我们使用绝对路径和 ClassLoader 实例获取资源：

```java
void givenAbsoluteResourcePath_whenGetResource_thenReturnResource() {
    URL resourceAbsolutePath = ClassLoaderGetResourceExample.class.getClassLoader()
        .getResource("com/baeldung/resource/example.txt");
    Assertions.assertNotNull(resourceAbsolutePath);
}
```

**当我们调用 ClassLoader.getResource() 时，我们应该在定义绝对路径时省略领先的斜杠。**

使用 ClassLoader 实例，**我们不能使用相对路径获取资源**：

```java
void givenRelativeResourcePath_whenGetResource_thenReturnNull() {
    URL resourceRelativePath = ClassLoaderGetResourceExample.class.getClassLoader()
        .getResource("example.txt");
    Assertions.assertNull(resourceRelativePath);
}
```

上述测试表明，该方法返回 null 值作为结果。

## 5. 结论

这个简短的教程解释了从 Class 和 ClassLoader 实例调用 getResource() 方法的区别。总结起来，我们可以在使用 Class 实例调用方法时传递相对或绝对资源路径，但我们可以只能在调用 ClassLoader 上的方法时使用绝对路径。

如常，代码可以在 GitHub 上找到。