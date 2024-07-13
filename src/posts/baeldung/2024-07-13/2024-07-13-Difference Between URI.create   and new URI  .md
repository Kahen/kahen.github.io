---
date: 2022-04-01
category:
  - Java
tag:
  - URI
  - Java
head:
  - - meta
    - name: keywords
      content: Java URI, URI.create(), new URI(), 异常处理
---
# URI.create() 与 new URI() 的区别 | Baeldung

当我们尝试访问网络中的某些资源时，我们首先必须获取资源的统一资源标识符（URI）。Java 标准库提供了 URI 类，使我们更容易处理 URI。当然，要使用 URI 类，第一步是获取一个 URI 实例。

假设我们有某个网络资源的地址字符串。有两种方法可以获得一个 URI 实例：

- 直接使用地址字符串调用构造函数 - `URI myUri = new URI(theAddress);`
- 调用 `URI.create()` 静态方法 - `URI myUri = URI.create(theAddress);`

在这个快速教程中，我们将仔细看看这两种方法，并讨论它们的区别。

### 使用 URI 构造函数

首先，让我们看看构造函数的签名：

```java
public URI(String str) throws URISyntaxException
```

正如我们所看到的，如果使用无效的地址调用构造函数，可能会抛出 `URISyntaxException`。为了简单起见，让我们创建一个单元测试来看看这个情况：

```java
assertThrows(URISyntaxException.class, () -> new URI("I am an invalid URI string."));
```

我们应该注意到 `URISyntaxException` 是 `Exception` 的子类：

```java
public class URISyntaxException extends Exception { ... }
```

因此，它是一个检查异常。换句话说，当我们调用这个构造函数时，我们必须处理 `URISyntaxException`：

```java
try {
    URI myUri = new URI("https://www.baeldung.com/articles");
    assertNotNull(myUri);
} catch (URISyntaxException e) {
    fail();
}
```

我们已经看到了构造函数的使用和作为单元测试的异常处理。如果我们执行测试，它会通过。**然而，如果没有 `try-catch`，代码无法编译。**

正如我们所看到的，使用构造函数创建 URI 实例非常简单。接下来，让我们看看 `URI.create()` 方法。

### 使用 URI.create() 方法

我们已经提到 `URI.create()` 也可以创建 URI 实例。为了理解 `create()` 方法和构造函数之间的区别，让我们看看 `create()` 方法的源代码：

```java
public static URI create(String str) {
    try {
        return new URI(str);
    } catch (URISyntaxException x) {
        throw new IllegalArgumentException(x.getMessage(), x);
    }
}
```

正如上面的代码所示，`create()` 方法的实现非常简单。首先，它直接调用构造函数。然后，如果抛出 `URISyntaxException`，**它将异常包装在一个新的 `IllegalArgumentException` 中。**

那么，让我们创建一个测试来看看，如果我们给 `create()` 一个无效的 URI 字符串，我们是否能得到预期的 `IllegalArgumentException`：

```java
assertThrows(IllegalArgumentException.class, () -> URI.create("I am an invalid URI string."));
```

如果我们运行测试，它会通过。

如果我们仔细看看 `IllegalArgumentException` 类，我们可以看到它是 `RuntimeException` 的子类：

```java
public class IllegalArgumentException extends RuntimeException { ... }
```

我们知道 `RuntimeException` 是一个非检查异常。这意味着**当我们使用 `create()` 方法创建 URI 实例时，我们不需要在显式的 `try-catch` 中处理异常**：

```java
URI myUri = URI.create("https://www.baeldung.com/articles");
assertNotNull(myUri);
```

因此，`create()` 和 `URI()` 构造函数之间的主要区别是 `create()` 方法将构造函数的检查异常（`URISyntaxException`）变为非检查异常（`IllegalArgumentException`）。

**如果我们不想处理检查异常，我们可以使用 `create()` 静态方法来创建 URI 实例**。

### 结论

在这篇文章中，我们讨论了使用构造函数和 `URI.create()` 方法实例化 URI 对象的区别。

像往常一样，这里展示的所有代码片段都可以在 GitHub 上找到。