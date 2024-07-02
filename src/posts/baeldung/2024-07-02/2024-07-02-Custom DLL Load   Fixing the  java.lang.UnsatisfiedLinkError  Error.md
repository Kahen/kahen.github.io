---
date: 2022-04-01
category:
  - Java
  - JNI
tag:
  - UnsatisfiedLinkError
  - Java Native Libraries
head:
  - - meta
    - name: keywords
      content: Java, JNI, UnsatisfiedLinkError, Native Libraries, LoadLibrary
---
# 自定义DLL加载 - 修复“java.lang.UnsatisfiedLinkError”错误

## 1. 引言

在这篇快速教程中，我们将探讨不同的导致_UnsatisfiedLinkError_的原因和解决方案。这是一种在使用本地库时常见的令人沮丧的错误。解决这个错误需要彻底理解其原因和适当的纠正措施。

我们将讨论诸如库和方法名称错误、缺少库目录规范、类加载器冲突、不兼容的架构以及Java安全策略的角色等场景。

## 2. 场景和设置

**我们将创建一个简单的类，说明在加载外部库时可能出现的错误。** 假设我们在Linux上，让我们加载一个名为“libtest.so”的简单库，并调用它的_test()_方法：

```java
public class JniUnsatisfiedLink {
    public static final String LIB_NAME = "test";

    public static void main(String[] args) {
        System.loadLibrary(LIB_NAME);
        new JniUnsatisfiedLink().test();
    }

    public native String test();

    public native String nonexistentDllMethod();
}
```

**通常，我们希望在静态块中加载我们的库，以确保它只加载一次。但是，为了更好地模拟错误，我们在_main()_方法中加载它。** 在这种情况下，我们的库只包含一个有效的方法_test()_，它返回一个_String_。**我们还声明了一个_nonexistentDllMethod()_来看看我们的应用程序的行为。**

## 3. 未指定库目录

_UnsatisfiedLinkError_最直接的原因是我们的库不在Java期望库所在的目录中。这可能是在系统变量中，例如Unix或Linux上的_LD_LIBRARY_PATH_，或Windows上的_PATH_。**我们还可以使用我们的库的完整路径与_System.load()_而不是_loadLibrary()_：**

```java
System.load("/full/path/to/libtest.so");
```

**但是，为了避免系统特定的解决方案，我们可以设置_java.library.path_ VM属性。** 这个属性接收一个或多个包含我们需要加载的库的目录路径：

```java
-Djava.library.path=/any/library/dir
```

目录分隔符将取决于我们的操作系统。Unix或Linux是冒号，Windows是分号。

## 4. 错误的库名称或权限

**得到_UnsatisfiedLinkError_的最常见原因之一是使用错误的库名称。** 这是因为Java为了保持代码尽可能的平台无关性，对库名称做了一些假设：

- 对于Windows，它假设库文件名以“.dll”结尾。
- 对于大多数类Unix系统，它假设有“lib”前缀和“.so”扩展名。
- 最后，对于Mac，它假设有“lib”前缀和“.dylib”（以前的“.jnilib”）扩展名。

所以，如果我们包含这些前缀或后缀，我们会得到一个错误：

```java
@Test
public void whenIncorrectLibName_thenLibNotFound() {
    String libName = "lib" + LIB_NAME + ".so";

    Error error = assertThrows(UnsatisfiedLinkError.class, () -> System.loadLibrary(libName));

    assertEquals(
      String.format("no %s in java.library.path", libName),
      error.getMessage()
    );
}
```

顺便说一下，这使得我们无法尝试加载一个为我们正在运行应用程序的平台而构建的库。在这种情况下，如果我们希望我们的应用程序是多平台的，我们必须为所有平台提供二进制文件。**如果我们的Linux环境中的库目录中只有一个“test.dll”，那么_System.loadLibrary("test")_将导致相同的错误。**

类似地，如果我们在_loadLibrary()_中包含路径分隔符，我们会得到一个错误：

```java
@Test
public void whenLoadLibraryContainsPathSeparator_thenErrorThrown() {
    String libName = "/" + LIB_NAME;

    Error error = assertThrows(UnsatisfiedLinkError.class, () -> System.loadLibrary(libName));

    assertEquals(
      String.format("Directory separator should not appear in library name: %s", libName),
      error.getMessage()
    );
}
```

最后，如果我们的库目录权限不足，将导致相同的错误。**例如，我们在Linux上至少需要“执行”权限。另一方面，如果我们的文件没有至少“读取”权限，我们将得到类似这样的消息：**

```java
java.lang.UnsatisfiedLinkError: /path/to/libtest.so: cannot open shared object file: Permission denied
```

## 5. 错误的函数名称/用法

如果我们声明了一个本地方法，它与我们的本地源代码中声明的方法都不匹配，我们也会得到错误，**但只有在我们尝试调用不存在的方法时：**

```java
@Test
public void whenUnlinkedMethod_thenErrorThrown() {
    System.loadLibrary(LIB_NAME);

    Error error = assertThrows(UnsatisfiedLinkError.class, () -> new JniUnsatisfiedLink().nonexistentDllMethod());

    assertTrue(error.getMessage()
      .contains("JniUnsatisfiedLink.nonexistentDllMethod"));
}
```

注意，在_loadLibrary()_中没有抛出异常。

## 6. 库已由另一个类加载器加载

这最有可能发生在我们在同一个Web应用程序服务器（如Tomcat）中加载同一个库的不同Web应用程序中。然后，我们会得到错误：

```java
Native Library libtest.so already loaded in another classloader
```

或者，如果它正在加载过程中，我们会得到：

```java
Native Library libtest.so is being loaded in another classloader
```

**解决这个问题的最简单方法是将加载我们库的代码放在Web应用程序服务器的共享目录中的JAR中。** 例如，在Tomcat中，那将是“\u003ctomcat home\u003e/lib”。

## 7. 不兼容的架构

这最有可能发生在使用旧库时。我们不能加载一个为不同于我们正在运行应用程序的架构编译的库——**例如，如果我们尝试在64位系统上加载一个32位库：**

```java
@Test
public void whenIncompatibleArchitecture_thenErrorThrown() {
    Error error = assertThrows(UnsatisfiedLinkError.class, () -> System.loadLibrary(LIB_NAME + "32"));

    assertTrue(error.getMessage()
      .contains("wrong ELF class: ELFCLASS32"));
}
```

在上面的例子中，我们为了测试目的将库与32位标志链接。一些旁注：

- 如果我们尝试通过重命名文件在不同的平台上加载DLL，我们会遇到包含“无效ELF头”消息的错误。
- 如果我们尝试在不兼容的平台上加载我们的库，库就是找不到。

## 8. 文件损坏

**尝试加载损坏的文件时，总是会导致_UnsatisfiedLinkError_。** 让我们看看当我们尝试加载一个空文件时会发生什么（注意，这个测试是针对单个库路径简化的，并且考虑到了Linux环境）：

```java
@Test
public void whenCorruptedFile_thenErrorThrown() {
    String libPath = System.getProperty("java.library.path");

    String dummyLib = LIB_NAME + "-dummy";
    assertTrue(new File(libPath, "lib" + dummyLib + ".so").isFile());
    Error error = assertThrows(UnsatisfiedLinkError.class, () -> System.loadLibrary(dummyLib));

    assertTrue(error.getMessage().contains("file too short"));
}
```

为了避免这种情况，通常的做法是与二进制文件一起分发MD5校验和，以便我们可以检查完整性。

## 9. Java安全策略

**如果我们使用Java策略文件，我们需要为_loadLibrary()_和我们的库名称授予_RuntimePermission_：**

```java
grant {
    permission java.lang.RuntimePermission "loadLibrary.test";
};
```

否则，当我们尝试加载我们的库时，我们会得到类似的错误：

```java
java.security.AccessControlException: access denied ("java.lang.RuntimePermission" "loadLibrary.test")
```

注意，为了使自定义策略文件生效，我们需要指定我们想要使用安全管理器：

```java
-Djava.security.manager
```

## 10. 结论

在这篇文章中，我们探讨了解决Java应用程序中_UnsatisfiedLinkError_的解决方案。我们讨论了这个错误的常见原因，并提供了有效解决它们的见解。通过实施这些见解并根据我们应用程序的特定需求进行调整，我们可以有效地解决_UnsatisfiedLinkError_的出现。

如往常一样，源代码可在GitHub上获得。