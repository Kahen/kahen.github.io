---
date: 2022-04-01
category:
  - Java
  - JAR
tag:
  - JAR文件
  - 类路径
head:
  - - meta
    - name: keywords
      content: Java, JAR文件, 类路径, 完整路径
---
# 从类获取JAR文件的完整路径

JAR文件是Java归档文件。我们在构建Java应用程序时可能会包含各种JAR文件作为库。

在本教程中，我们将探讨如何从给定的类找到JAR文件及其完整路径。

## 2. 问题介绍

假设我们在运行时有一个_类_对象。我们的目标是找出这个类属于哪个JAR文件。

一个例子可能会帮助我们快速理解问题。假设我们有一个Guava的_Ascii_类的实例。我们想要创建一个方法来找出包含_Ascii_类的JAR文件的完整路径。

我们将主要讨论两种方法来获取JAR文件的完整路径。此外，我们将讨论它们的优缺点。

为了简单起见，我们将通过单元测试断言来验证结果。

接下来，让我们看看它们是如何工作的。

## 3. 使用_getProtectionDomain()_方法

Java的类对象提供了_getProtectionDomain()_方法来获取_ProtectionDomain_对象。然后，我们可以通过_ProtectionDomain_对象获取_CodeSource_。_CodeSource_实例将是我们正在寻找的JAR文件。进一步地，_CodeSource.getLocation()_方法为我们提供了JAR文件的URL对象。最后，我们可以使用_Paths_类来获取JAR文件的完整路径。

### 3.1. 实现_byGetProtectionDomain()_方法

如果我们将上述所有步骤包装在一个方法中，几行代码就能做到这一点：

```java
public class JarFilePathResolver {
    String byGetProtectionDomain(Class clazz) throws URISyntaxException {
        URL url = clazz.getProtectionDomain().getCodeSource().getLocation();
        return Paths.get(url.toURI()).toString();
    }
}
```

接下来，让我们以Guava的_Ascii_类为例，测试我们的方法是否按预期工作：

```java
String jarPath = jarFilePathResolver.byGetProtectionDomain(Ascii.class);
assertThat(jarPath).endsWith(".jar").contains("guava");
assertThat(new File(jarPath)).exists();
```

正如我们所看到的，我们已经通过两个断言验证了返回的_jarPath_：

- 首先，路径应该指向Guava JAR文件
- 如果_jarPath_是有效的完整路径，我们可以从_jarPath_创建一个_File_对象，文件应该存在

如果我们运行测试，它会通过。所以_byGetProtectionDomain()_方法按预期工作。

### 3.2. _getProtectionDomain()_方法的一些限制

正如上面的代码所示，我们的_byGetProtectionDomain()_方法非常紧凑和直接。然而，如果我们阅读_getProtectionDomain()_方法的JavaDoc，它说**_getProtectionDomain()_方法可能会抛出_SecurityException_**。

我们编写了一个单元测试，测试通过了。这是因为我们在我们的本地开发环境中测试这个方法。在我们的示例中，Guava JAR位于我们的本地Maven仓库中。因此，没有抛出_SecurityException_。

然而，**一些平台，例如Java/OpenWebStart和一些应用服务器，可能禁止通过调用_getProtectionDomain()_方法获取_ProtectionDomain_对象。** 因此，如果我们将应用程序部署到这些平台，我们的方法将失败并抛出_SecurityException_。

接下来，让我们看看另一种获取JAR文件完整路径的方法。

## 4. 使用_getResource()_方法

我们知道我们调用_Class.getResource_()方法来获取类的资源的_URL_对象。那么让我们从这个方法开始，最终解析出相应JAR文件的完整路径。

### 4.1. 实现_byGetResource()_方法

让我们先看看实现，然后理解它的工作原理：

```java
String byGetResource(Class clazz) {
    URL classResource = clazz.getResource(clazz.getSimpleName() + ".class");
    if (classResource == null) {
        throw new RuntimeException("class resource is null");
    }
    String url = classResource.toString();
    if (url.startsWith("jar:file:")) {
        // 从url字符串中提取'file:......jarName.jar'部分
        String path = url.replaceAll("^jar:(file:.*[.]jar)!/.*", "$1");
        try {
            return Paths.get(new URL(path).toURI()).toString();
        } catch (Exception e) {
            throw new RuntimeException("Invalid Jar File URL String");
        }
    }
    throw new RuntimeException("Invalid Jar File URL String");
}
```

与_byGetProtectionDomain_方法相比，上述方法看起来复杂。但实际上，它也很容易理解。

接下来，让我们快速浏览一下这个方法并理解它的工作原理。为了简单起见，我们为各种异常情况抛出_RuntimeException_。

### 4.2. 理解它的工作原理

首先，我们调用_Class.getResource(className)_方法来获取给定类的URL。

**如果类来自本地文件系统的JAR文件，URL字符串应该是这种格式**：

```java
jar:file:/FULL/PATH/TO/jarName.jar!/PACKAGE/HIERARCHY/TO/CLASS/className.class
```

例如，这是Linux系统上Guava的_Ascii_类的URL字符串：

```java
jar:file:/home/kent/.m2/repository/com/google/guava/guava/31.0.1-jre/guava-31.0.1-jre.jar!/com/google/common/base/Ascii.class
```

正如我们所看到的，JAR文件的完整路径位于URL字符串的中间。

**由于不同操作系统上的文件URL格式可能不同，我们将提取“_file:…..jar_”部分，将其转换回_URL_对象，并使用_Paths_类来获取路径作为_String_。**

我们构建一个正则表达式，并使用_String_的_replaceAll()_方法来提取我们需要的部分：_String path = url.replaceAll("^jar:(file:.*[.]jar)!/.*", "$1");_

接下来，类似于_byGetProtectionDomain()_方法，我们使用_Paths_类获得最终结果。

现在，让我们创建一个测试来验证我们的方法是否与Guava的_Ascii_类一起工作：

```java
String jarPath = jarFilePathResolver.byGetResource(Ascii.class);
assertThat(jarPath).endsWith(".jar").contains("guava");
assertThat(new File(jarPath)).exists();
```

如果我们运行测试，它会通过。

## 5. 结合两种方法

到目前为止，我们已经看到了两种解决问题的方法。_byGetProtectionDomain_方法简单可靠，但由于安全限制，可能在某些平台上失败。

另一方面，_byGetResource_方法没有安全问题。但是，我们需要进行更多的手动操作，例如处理不同的异常情况和使用正则表达式提取JAR文件的URL字符串。

### 5.1. 实现_getJarFilePath()_方法

我们可以结合这两种方法。首先，让我们尝试使用_byGetProtectionDomain()_解析JAR文件的路径。如果失败，我们作为后备调用_byGetResource()_方法：

```java
String getJarFilePath(Class clazz) {
    try {
        return byGetProtectionDomain(clazz);
    } catch (Exception e) {
        // 无法使用byGetProtectionDomain获取jar文件路径
        // 省略异常处理
    }
    return byGetResource(clazz);
}
```

### 5.2. 测试_getJarFilePath()_方法

为了在我们的本地开发环境中模拟_byGetProtectionDomain()_抛出_SecurityException_，让我们添加Mockito依赖项，并使用_@Spy_注解**部分模拟_JarFilePathResolver_：

```java
@ExtendWith(MockitoExtension.class)
class JarFilePathResolverUnitTest {
    @Spy
    JarFilePathResolver jarFilePathResolver;
    ...
}
```

接下来，让我们首先测试_getProtectionDomain()_方法没有抛出_SecurityException_的场景：

```java
String jarPath = jarFilePathResolver.getJarFilePath(Ascii.class);
assertThat(jarPath).endsWith(".jar").contains("guava");
assertThat(new File(jarPath)).exists();
verify(jarFilePathResolver, times(1)).byGetProtectionDomain(Ascii.class);
verify(jarFilePathResolver, never()).byGetResource(Ascii.class);
```

正如上面的代码所示，除了测试路径是否有效之外，我们还验证了如果我们可以通过_byGetProtectionDomain()_方法获取JAR文件的路径，_byGetResource()_方法应该永远不会被调用。

当然，如果_byGetProtectionDomain()_抛出_SecurityException_，两种方法将被调用一次：

```java
when(jarFilePathResolver.byGetProtectionDomain(Ascii.class)).thenThrow(new SecurityException("not allowed"));
String jarPath = jarFilePathResolver.getJarFilePath(Ascii.class);
assertThat(jarPath).endsWith(".jar").contains("guava");
assertThat(new File(jarPath)).exists();
verify(jarFilePathResolver, times(1)).byGetProtectionDomain(Ascii.class);
verify(jarFilePathResolver, times(1)).byGetResource(Ascii.class);
```

如果我们执行测试，两个测试都会通过。

## 6. 结论

在这篇文章中，我们学习了如何从给定的类获取JAR文件的完整路径。

一如既往，完整的source code is available over on GitHub.

![img](https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg)![img](https://secure.gravatar.com/avatar/c6c28b2e0205c9b87004ebaade245ff1?s=50&r=g)![img](https://www.baeldung.com/wp-content/uploads/custom_avatars/Eric-Martin-150x150.jpg)![img](https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png)![img](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg)![img](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png)

OK