---
date: 2023-04-22
category:
  - Java
  - Testing
tag:
  - URLConnection
  - Mockito
  - JMockit
head:
  - - meta
    - name: keywords
      content: Java, Testing, URLConnection, Mockito, JMockit
---

# Java中模拟URL连接

## 1. 概述

`UrlConnection`是一个抽象类，提供了与网络上的资源进行交互的接口，例如从URL检索数据以及向它们发送数据。

**在编写单元测试时，我们通常希望模拟网络连接和响应，而不需要实际进行网络请求。**

在本教程中，我们将探讨几种在Java中模拟URL连接的方法。

## 2. 一个简单的URL获取器类

在整个教程中，我们的测试重点将是一个简单的URL获取器类：

```java
public class UrlFetcher {
    private URL url;

    public UrlFetcher(URL url) throws IOException {
        this.url = url;
    }

    public boolean isUrlAvailable() throws IOException {
        return getResponseCode() == HttpURLConnection.HTTP_OK;
    }

    private int getResponseCode() throws IOException {
        HttpURLConnection con = (HttpURLConnection) this.url.openConnection();
        return con.getResponseCode();
    }
}
```

为了演示，我们有一个公共方法`isUrlAvailable()`，它指示给定地址的URL是否可用。返回值基于我们收到的HTTP响应消息的状态代码。

## 3. 使用纯Java进行单元测试

通常，使用模拟对象的第一步是使用第三方测试框架。然而，在某些情况下，这可能不是一个可行的选项。

**幸运的是，`URL`类提供了一种机制，允许我们提供知道如何建立连接的自定义处理器。** 我们可以使用这个来提供我们的处理器，它将返回一个虚拟连接对象和响应。

### 3.1. 支持类

对于这种方法，我们需要几个支持类。让我们首先定义一个`MockHttpURLConnection`：

```java
public class MockHttpURLConnection extends HttpURLConnection {
    protected MockHttpURLConnection(URL url) {
        super(url);
    }

    @Override
    public int getResponseCode() {
        return responseCode;
    }

    public void setResponseCode(int responseCode) {
        this.responseCode = responseCode;
    }

    @Override
    public void disconnect() {
    }

    @Override
    public boolean usingProxy() {
        return false;
    }

    @Override
    public void connect() throws IOException {
    }
}
```

正如我们所看到的，这个类是对`HttpURLConnection`类的简单扩展，具有最小的实现。重要的部分是，我们提供了一个设置和获取HTTP响应代码的机制。

接下来，我们需要一个虚拟流处理器，返回我们新创建的`MockHttpURLConnection`：

```java
public class MockURLStreamHandler extends URLStreamHandler {
    private MockHttpURLConnection mockHttpURLConnection;

    public MockURLStreamHandler(MockHttpURLConnection mockHttpURLConnection) {
        this.mockHttpURLConnection = mockHttpURLConnection;
    }

    @Override
    protected URLConnection openConnection(URL url) throws IOException {
        return this.mockHttpURLConnection;
    }
}
```

最后，我们需要提供一个流处理器工厂，它将返回我们新创建的流处理器：

```java
public class MockURLStreamHandlerFactory implements URLStreamHandlerFactory {
    private MockHttpURLConnection mockHttpURLConnection;

    public MockURLStreamHandlerFactory(MockHttpURLConnection mockHttpURLConnection) {
        this.mockHttpURLConnection = mockHttpURLConnection;
    }

    @Override
    public URLStreamHandler createURLStreamHandler(String protocol) {
        return new MockURLStreamHandler(this.mockHttpURLConnection);
    }
}
```

### 3.2. 整合在一起

现在我们已经准备好了支持类，我们可以继续编写我们的第一个单元测试：

```java
private static MockHttpURLConnection mockHttpURLConnection;

@BeforeAll
public static void setUp() {
    mockHttpURLConnection = new MockHttpURLConnection(null);
    URL.setURLStreamHandlerFactory(new MockURLStreamHandlerFactory(mockHttpURLConnection));
}

@Test
void givenMockedUrl_whenRequestSent_thenIsUrlAvailableTrue() throws Exception {
    mockHttpURLConnection.setResponseCode(HttpURLConnection.HTTP_OK);
    URL url = new URL("https://www.baeldung.com/");

    UrlFetcher fetcher = new UrlFetcher(url);
    assertTrue(fetcher.isUrlAvailable(), "Url should be available: ");
}
```

让我们浏览一下我们测试的关键部分：

- 首先，我们开始定义`setUp()`方法，**在这里我们创建我们的`MockHttpURLConnection`，并通过静态方法`setURLStreamHandlerFactory()`将其注入到`URL`类中。**
- 现在我们可以开始编写测试的主体。首先，我们需要使用我们的`mockHttpURLConnection`变量上的`setResponseCode()`方法设置预期的响应代码。
- 然后我们可以创建一个新的URL并构建我们的`UrlFetcher`，最后断言`isUrlAvailable()`方法。

当我们运行测试时，无论网络地址是否可用，我们应该始终获得相同的行为。一个很好的测试是关闭你的Wi-Fi或网络连接，然后检查测试是否仍然以完全相同的方式运行。

### 3.3. 这种方法的问题

尽管这个解决方案有效，并且不依赖于第三方库，但由于几个原因，它有点麻烦。

首先，我们需要创建几个模拟支持类，随着我们的测试需求变得更加复杂，我们的模拟对象也会变得更加复杂。例如，如果我们开始模拟不同的响应体。

**同样，我们的测试有一些重要的设置，其中我们混合了静态方法调用与`URL`类的实例。** 这很令人困惑，并且可能会导致后续出现意想不到的结果。

## 4. 使用Mockito进行工作

在接下来的部分中，我们将看到如何使用Mockito这个众所周知的单元测试框架来简化我们的测试。

首先，我们需要将`mockito`依赖项添加到我们的项目中：

```xml
```<dependency>```
    ```<groupId>```org.mockito```</groupId>```
    ```<artifactId>```mockito-core```</artifactId>```
    ```<version>```5.11.0```</version>```
    ```<scope>```test```</scope>```
```</dependency>```
```

现在我们可以定义我们的测试：

```java
@Test
void givenMockedUrl_whenRequestSent_thenIsUrlAvailableFalse() throws Exception {
    HttpURLConnection mockHttpURLConnection = mock(HttpURLConnection.class);
    when(mockHttpURLConnection.getResponseCode()).thenReturn(HttpURLConnection.HTTP_NOT_FOUND);

    URL mockURL = mock(URL.class);
    when(mockURL.openConnection()).thenReturn(mockHttpURLConnection);

    UrlFetcher fetcher = new UrlFetcher(mockURL);
    assertFalse(fetcher.isUrlAvailable(), "Url should be available: ");
}
```

这一次，我们使用Mockito的`mock`方法创建了一个虚拟的URL连接。**然后我们配置模拟对象，当它的`openConnection`方法被调用时返回一个虚拟的HTTP URL连接。** 当然，我们的模拟HTTP连接已经包含了一个被存根化的响应代码。

我们应该注意到，对于Mockito 4.8.0以下的版本，当我们运行这个测试时可能会收到一个错误：

```java
org.mockito.exceptions.base.MockitoException:
Cannot mock/spy class java.net.URL
Mockito cannot mock/spy because :
 - final class
```

这是因为URL是一个最终类，而在Mockito的早期版本中，直接模拟最终类型和方法是不可行的。

为了解决这个问题，我们可以简单地在我们的`pom.xml`中添加一个额外的依赖项：

```xml
```<dependency>```
    ```<groupId>```org.mockito```</groupId>```
    ```<artifactId>```mockito-inline```</artifactId>```
    ```<version>```5.2.0```</version>```
    ```<scope>```test```</scope>```
```</dependency>```
```

现在我们的测试将成功运行！

## 5. 使用JMockit进行工作

在我们最后的示例中，我们将看看另一个名为JMockit的测试库，以确保完整性。

首先，我们需要将`jmockit`依赖项添加到我们的项目中：

```xml
```<dependency>```
    ```<groupId>```org.jmockit```</groupId>```
    ```<artifactId>```jmockit```</artifactId>```
    ```<version>```1.49```</version>```
    ```<scope>```test```</scope>```
```</dependency>```
```

现在我们可以继续定义我们的测试类：

```java
@ExtendWith(JMockitExtension.class)
class UrlFetcherJMockitUnitTest {

    @Test
    void givenMockedUrl_whenRequestSent_thenIsUrlAvailableTrue(@Mocked URL anyURL,
      @Mocked HttpURLConnection mockConn) throws Exception {
        new Expectations() {{
            mockConn.getResponseCode();
            result = HttpURLConnection.HTTP_OK;
        }};

        UrlFetcher fetcher = new UrlFetcher(new URL("https://www.baeldung.com/"));
        assertTrue(fetcher.isUrlAvailable(), "Url should be available: ");
    }
}
```

JMockit最强大的一点是其表达能力。**为了创建模拟并定义它们的行为，我们不需要调用模拟API的方法，我们只需要直接定义它们。**

## 6. 结论

在这篇文章中，我们学习了几种我们可以模拟URL连接的方法，以编写不依赖任何外部服务的独立单元测试。首先，我们看一个使用纯Java的例子，然后探索了使用Mockito和JMockit的另外两种选项。

如往常一样，文章的全部源代码可以在GitHub上找到。

OK