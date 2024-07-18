---
date: 2022-04-01
category:
  - Testing & Mocking
  - Java Servlets
tag:
  - Java
  - Testing
  - Mockito
  - JMockit
  - Spring
head:
  - - meta
    - name: keywords
      content: Java, Testing, Mockito, JMockit, Spring, HttpServletRequest
------
# 如何模拟 HttpServletRequest 对象

## 1. 概述

在本快速教程中，**我们将探讨几种模拟 _HttpServletRequest_ 对象的方法**。

首先，我们将从 Spring 测试库中的完全功能模拟类型——_MockHttpServletRequest_ 开始。然后，我们将看到如何使用两个流行的模拟库——Mockito 和 JMockit 进行测试。最后，我们将看到如何使用匿名子类进行测试。

## 2. 测试 _HttpServletRequest_

当我们要模拟客户端请求信息如 _HttpServletRequest_ 时，测试 Servlet 可能会变得棘手。此外，这个接口定义了各种方法，并且有不同的方式来模拟这些方法。

让我们看看我们想要测试的目标 _UserServlet_ 类：

```java
public class UserServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String firstName = request.getParameter("firstName");
        String lastName = request.getParameter("lastName");

        response.getWriter().append("Full Name: " + firstName + " " + lastName);
    }
}
```

为了单元测试 _doGet()_ 方法，我们需要模拟 _request_ 和 _response_ 参数以模拟实际运行时的行为。

## 3. 使用 Spring 中的 _MockHttpServletRequest_

Spring-Test 库提供了一个完全功能的类 _MockHttpServletRequest_，它实现了 _HttpServletRequest_ 接口。

尽管这个库主要针对测试 Spring 应用程序，**我们可以使用它的 _MockHttpServletRequest_ 类而不实现任何 Spring 特定的功能。换句话说，即使应用程序不使用 Spring，我们仍然可以仅依赖这个库来模拟 _HttpServletRequest_ 对象**。

让我们将这个依赖项添加到 pom.xml：

```xml
```<dependency>```
    ```<groupId>```org.springframework```</groupId>```
    ```<artifactId>```spring-test```</artifactId>```
    ```<version>```5.3.20```</version>```
    ```<scope>```test```</scope>```
```</dependency>```
```

现在，让我们看看如何使用这个类来测试 _UserServlet_：

```java
@Test
void givenHttpServletRequest_whenUsingMockHttpServletRequest_thenReturnsParameterValues() throws IOException {
    MockHttpServletRequest request = new MockHttpServletRequest();
    request.setParameter("firstName", "Spring");
    request.setParameter("lastName", "Test");
    MockHttpServletResponse response = new MockHttpServletResponse();

    servlet.doGet(request, response);

    assertThat(response.getContentAsString()).isEqualTo("Full Name: Spring Test");
}
```

在这里，我们可以注意到实际上并没有涉及模拟。我们使用了完全功能的请求和响应对象，并仅用几行代码测试了目标类。**因此，测试代码是干净、可读和可维护的**。

## 4. 使用模拟框架

或者，**模拟框架提供了一个干净且简单的 API 来测试模拟对象，这些对象模仿原始对象的运行时行为**。

它们的优点包括它们的表达能力和开箱即用的能力来模拟 _静态_ 和 _私有_ 方法。此外，我们可以避免大部分需要模拟的样板代码（与自定义实现相比），而是专注于测试。

### 4.1. 使用 Mockito

Mockito 是一个流行的开源测试自动化框架，它内部使用 Java 反射 API 来创建模拟对象。

让我们从将 mockito-core 依赖项添加到我们的 _pom.xml_ 开始：

```xml
```<dependency>```
    ```<groupId>```org.mockito```</groupId>```
    ```<artifactId>```mockito-core```</artifactId>```
    ```<version>```4.4.0```</version>```
    ```<scope>```test```</scope>```
```</dependency>```
```

接下来，让我们看看如何模拟 _HttpServletRequest_ 对象的 _getParameter()_ 方法：

```java
@Test
void givenHttpServletRequest_whenMockedWithMockito_thenReturnsParameterValues() throws IOException {
    // 模拟 HttpServletRequest 和 HttpServletResponse
    HttpServletRequest request = mock(HttpServletRequest.class);
    HttpServletResponse response = mock(HttpServletResponse.class);

    // 模拟 request.getParameterMap() 返回的值
    when(request.getParameter("firstName")).thenReturn("Mockito");
    when(request.getParameter("lastName")).thenReturn("Test");
    when(response.getWriter()).thenReturn(new PrintWriter(writer));

    servlet.doGet(request, response);

    assertThat(writer.toString()).isEqualTo("Full Name: Mockito Test");
}
```

### 4.2. 使用 JMockit

JMockit 是一个提供有用记录和验证语法的模拟 API（我们可以用它来测试 JUnit 和 TestNG）。它是 Java EE 和基于 Spring 的应用程序的容器外集成测试库。让我们看看如何使用 JMockit 模拟 _HttpServletRequest_。

首先，我们将 _jmockit_ 依赖项添加到我们的项目中：

```xml
```<dependency>```
    ```<groupId>```org.jmockit```</groupId>```
    ```<artifactId>```jmockit```</artifactId>```
    ```<version>```1.49```</version>```
    ```<scope>```test```</scope>```
```</dependency>```
```

接下来，让我们继续在测试类中进行模拟实现：

```java
@Mocked
HttpServletRequest mockRequest;
@Mocked
HttpServletResponse mockResponse;

@Test
void givenHttpServletRequest_whenMockedWithJMockit_thenReturnsParameterValues() throws IOException {
    new Expectations() {{
        mockRequest.getParameter("firstName"); result = "JMockit";
        mockRequest.getParameter("lastName"); result = "Test";
        mockResponse.getWriter(); result = new PrintWriter(writer);
    }};

    servlet.doGet(mockRequest, mockResponse);

    assertThat(writer.toString()).isEqualTo("Full Name: JMockit Test");
}
```

正如我们在上面看到的，通过几行设置，我们成功地使用模拟 _HttpServletRequest_ 对象测试了目标类。

因此，**模拟框架可以为我们节省大量的工作量，并使单元测试更快地编写**。相反，要使用模拟对象，需要理解模拟 API，通常需要一个单独的框架。

## 5. 使用匿名子类

一些项目可能有依赖约束或更喜欢直接控制他们自己的测试类实现。具体来说，这在更大的 servlet 代码库中可能很有用，其中自定义实现的可重用性很重要。在这些情况下，匿名类很有用。

**匿名类是没有名称的内部类**。**此外，它们实现起来很快，并提供对实际对象的直接控制**。如果我们不想为测试包含额外的依赖项，可以考虑这种方法。

现在，让我们创建一个实现 _HttpServletRequest_ 接口的匿名子类，并使用它来测试 _doGet()_ 方法：

```java
public static HttpServletRequest getRequest(Map```<String, String[]>``` params) {
    return new HttpServletRequest() {
        public Map```<String, String[]>``` getParameterMap() {
            return params;
        }

        public String getParameter(String name) {
            String[] values = params.get(name);
            if (values == null || values.length == 0) {
                return null;
            }
            return values[0];
        }

        // 更多方法需要实现
    };
}
```

接下来，让我们将这个请求传递给正在测试的类：

```java
@Test
void givenHttpServletRequest_whenUsingAnonymousClass_thenReturnsParameterValues() throws IOException {
    final Map```<String, String[]>``` params = new HashMap<>();
    params.put("firstName", new String[]{"Anonymous Class"});
    params.put("lastName", new String[]{"Test"});

    servlet.doGet(getRequest(params), getResponse(writer));

    assertThat(writer.toString()).isEqualTo("Full Name: Anonymous Class Test");
}
```

**这种方法的缺点是需要为所有抽象方法创建一个带有虚拟实现的匿名类。此外，嵌套对象如 _HttpSession_ 可能需要特定的实现**。

## 6. 结论

在本文中，我们讨论了在为 servlet 编写单元测试时模拟 _HttpServletRequest_ 对象的几个选项。除了使用模拟框架，我们看到了使用 _MockHttpServletRequest_ 类进行测试似乎比自定义实现更干净和高效。

一如既往，这些示例的代码可以在 GitHub 上找到。