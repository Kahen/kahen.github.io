---
date: 2022-04-01
category:
  - JMeter
  - HTTP Basic Authentication
tag:
  - JMeter
  - Basic Authentication
  - HTTP
head:
  - - meta
    - name: keywords
      content: JMeter, Basic Authentication, HTTP, 性能测试
---
# Apache JMeter 中的基本认证配置

## 1. 概述

当我们使用 JMeter 进行性能测试时，可能会遇到通过 HTTP 基础认证协议保护的 Web 服务。

在本教程中，我们将看到如何在测试期间配置 Apache JMeter 以提供必要的凭据。

## 2. 什么是基础认证？

基础认证是我们可以用于保护 Web 资源的最简单访问控制方法。它由客户端发送的 HTTP 头组成：

```
Authorization: Basic `<credentials>`
```

这里，凭据是用户名和密码的 Base64 字符串编码，由单个冒号 “:” 分隔。

我们可以看到，当浏览器窗口而不是 HTML 表单要求凭据时，就会使用基础认证。我们可能会在浏览器中收到提示：

![img](https://www.baeldung.com/wp-content/uploads/2022/04/basicAuthenticationChrome.png)

因此，如果我们尝试对受保护的 Web 资源启动 JMeter 测试，响应代码将是 HTTP 401，这意味着“未授权”。我们还将收到一个“WWW-Authenticate”响应头，该头将描述服务器所需的认证类型。在这种情况下，将是“Basic”：

![img](https://www.baeldung.com/wp-content/uploads/2022/04/http-401-response-code.png)

## 3. 在 JMeter 中实现基础认证的简单方法

发送凭据的最简单方法是将它们直接添加到请求头。**我们可以使用_HTTP头管理器_组件轻松实现这一点**，该组件允许我们向 HTTP 请求组件发送的请求添加头。头管理器必须是 HTTP 请求组件的子组件：

![img](https://www.baeldung.com/wp-content/uploads/2022/04/jmeter-header-manager.png)

在_HTTP头管理器_的配置选项卡中，我们只需要添加一个键/值条目，使用我们的认证详细信息和“Authorization”作为名称：

![img](https://www.baeldung.com/wp-content/uploads/2022/04/http-header-manager-config.png)

我们可以使用在线工具对我们的字符串进行编码并粘贴到头管理器中。我们应该小心地在我们的编码凭据前加上“basic”。

如果一切顺利，我们应该从服务器收到 200 响应代码。

### 3.2 使用 JSR223 PreProcessor 编码凭据

如果我们希望 JMeter 为我们编码凭据，我们可以使用 _JSR223 PreProcessor_ 组件。如果我们希望测试计划使用不同的凭据，我们将需要使用此组件。

我们所要做的就是在 _HTTP头管理器_ 组件之前添加一个 _JSR223 PreProcessor_：

![img](https://www.baeldung.com/wp-content/uploads/2022/04/jsr223-preprocessor.png)

使用此组件，我们可以在运行时执行脚本。我们需要提供一个脚本来检索凭据并对其进行编码。让我们使用 Java：

```java
import org.apache.commons.codec.binary.Base64;

String username = vars.get("username");
String password = vars.get("password");
String credentials = username + ":" + password;
byte[] encodedUsernamePassword = Base64.encodeBase64(credentials.getBytes());
vars.put("base64Credentials", new String(encodedUsernamePassword));
```

我们现在应该在 _用户定义的变量_ 组件中定义 _username_ 和 _password_ 变量：

![img](https://www.baeldung.com/wp-content/uploads/2022/04/User-Defined-Variables.png)

最后，在 _HTTP头管理器_ 组件中，我们必须设置 _Authorization_ 头以使用编码的凭据：

我们完成了！一切应该正常工作，我们可以在我们的用户定义变量中轻松更改凭据。

## 4. 使用 HTTP 授权管理器

JMeter 提供了 _HTTP 授权管理器_ 组件，以简化对认证凭据的使用。**使用此组件，我们可以为多个域和认证协议提供凭据。** 此组件必须是 _Thread Group_ 的子组件，并在 _HTTP 请求_ 组件之前定义：

在组件的配置选项卡中，我们必须定义用于认证的用户名和密码：

如果我们在 _用户定义的变量_ 组件中定义了 _username_ 和 _password_，我们可以在此选项卡中使用变量。密码也可以。尽管它仍然被隐藏，我们可以在密码字段中键入 _“${password}”_。

我们必须注意选择正确的 _Mechanism_ 进行认证。在这里，我们将选择 _“BASIC”_。

就是这样！_HTTP请求_ 组件将自动在请求中添加 _Authorization_ 头，我们应该收到 HTTP 200 OK 响应代码。

## 5. 在 HTTP 授权管理器中使用多个凭据

有时，我们可能希望在测试期间使用多个凭据。**例如，这可能有助于验证基于角色的访问限制。**

要配置此测试用例，我们应该创建一个 CSV 文件，我们将在其中存储凭据和其他对我们的测试计划有用的信息。此文件由 JMeter 的 _CSV 数据集配置_ 组件读取。此组件应该是 _Thread Group_ 的子组件，并将迭代每个 _Thread Group_ 循环的 CSV 行：

然后，在此组件中，我们必须定义：

- 作为 _用户定义的变量_ 组件中的路径的文件位置
- 由 _CSV 数据集_ 组件执行后设置的 _变量名称_
- 组件是否应该忽略第一行 - 如果我们在 CSV 文件中有列名，这将很有帮助
- CSV 文件中使用的 _分隔符_

**在 CSV 文件中定义多个凭据时，我们应该注意配置我们的 _Thread Group_ 以执行多个循环。**

有了这些设置，我们应该能够看到我们的请求头中使用了不同的凭据。

## 6. 结论

在本文中，我们查看了 HTTP 资源的基本认证如何工作。

我们还学习了如何在 Apache JMeter 中设置测试计划以使用此协议进行认证。我们涵盖了硬编码凭据，使用 JSR223 PreProcessor，然后从 CSV 文件提供多个凭据。

像往常一样，这些示例的代码可以在 GitHub 上找到。