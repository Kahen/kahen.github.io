---
date: 2022-03-01
category:
  - Apache Tomcat
  - SSO
tag:
  - Single Sign-On
  - Tomcat Configuration
head:
  - - meta
    - name: keywords
      content: Apache Tomcat, SSO, Tomcat Configuration
------
# Apache Tomcat 单点登录

## 1. 概述

在本文中，我们将学习 Tomcat 服务器的基础知识，它是如何工作的，以及如何启用 Tomcat 的单点登录（SSO）功能。我们将探索 Tomcat 服务器和 Web 应用程序所需的配置。

## 2. Tomcat 架构

组成 Catalina servlet 容器的主要部分是包含定义连接器的服务的服务器，以及由主机构成的引擎，最终这些主机将包含上下文或 Web 应用程序。

连接器监听客户端的请求并发送响应。在 Tomcat 10 中，我们可以找到以下协议的连接器：HTTP/1.1、HTTP/2 和 AJP。

引擎将处理由连接器接收的请求并生成输出。它将包含一个处理管道，这是一个按请求执行的进程链，以生成响应。这些进程是 Tomcat 的阀门。例如，Tomcat 上的 SSO 是作为阀门实现的。

之后，我们发现主机定义了将网络名称与服务器关联的虚拟主机。这是定义 SSO 阀门的级别，因此主机下的所有上下文都将处于 SSO 下。

最后，我们将拥有与主机关联的上下文元素。这些上下文是在服务器上运行的 Web 应用程序。上下文必须遵循 servlet 规范 2.3 或更高版本。

## 3. Tomcat 上的单点登录

Tomcat 在一个阀门中实现了单点登录功能，必须在主机级别配置该阀门。它的工作原理是 SSO 阀门将存储用户凭据，并在需要时传递它们，因此用户不需要再次登录。

**SSO 阀门需要满足以下要求**：

- 领域或“用户数据库”必须由虚拟主机下的所有 Web 应用程序共享。
- Web 应用程序的认证机制必须是标准认证器之一：基本、摘要、表单、SSL 或 SPNEGO。
- 当客户端请求受保护的资源时，服务器将执行 Web 应用程序的认证机制。
- 服务器将使用经过认证的用户的角色来访问虚拟主机下 Web 应用程序的受保护资源，而无需再次登录。
- 当用户从 Web 应用程序注销时，服务器将在所有 Web 应用程序中使用户会话失效。
- 客户端必须接受 cookie。Cookie 存储将请求与用户凭据关联的令牌。

### 3.1. Tomcat 服务器配置

**在服务器端，我们需要配置 _SingleSignOn_ 阀门和领域或“用户数据库”**。这些配置位于 Tomcat 安装文件夹的 conf 文件夹中的 server.xml 文件中。要添加 SSO 阀门，我们需要取消注释以下行：

```xml
`<Valve className="org.apache.catalina.authenticator.SingleSignOn" />`
```

对于本文的示例，**我们将依赖默认配置的领域，并只需要将用户添加到数据库中**。领域定义如下：

```xml
`<Realm
  className="org.apache.catalina.realm.UserDatabaseRealm"
  resourceName="UserDatabase"/>`
```

此配置使用全局 JNDI 资源来定义用户数据库的来源：

```xml
`<Resource name="UserDatabase" auth="Container"
  type="org.apache.catalina.UserDatabase"
  description="可以更新和保存的用户数据库"
  factory="org.apache.catalina.users.MemoryUserDatabaseFactory"
  pathname="conf/tomcat-users.xml" />`
```

该资源将实例化一个 _org.apache.catalina.UserDatabase_ 类型的对象，并使用工厂类 _org.apache.catalina.users.MemoryUserDatabaseFactory_ 从 tomcat-users.xml 文件中填充它。

最后，我们看看如何添加示例文章所需的具有管理员角色的用户。我们需要修改 tomcat-users.xml 文件：

```xml
`<tomcat-users xmlns="http://tomcat.apache.org/xml"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://tomcat.apache.org/xml tomcat-users.xsd"
  version="1.0">`
    `<role rolename="admin"/>`
    `<user username="demo" password="demo" roles="admin"/>`
`</tomcat-users>`
```

### 3.2. Web 应用程序配置

配置好服务器后，让我们通过每个 servlet 的 WEB-INF 文件夹中的 web.xml 配置文件来配置 servlet。

**所有需要 SSO 的 Web 应用程序必须有受保护的资源，并使用 Tomcat 认证方法之一**。**如 Servlet API 规范 2.3 所定义，Web 应用程序的认证机制在 _web-app_ 元素内的 login-config 元素中定义**。此元素将包含一个需要使用以下值之一的 auth-method 表单：BASIC、DIGEST、FORM 或 CLIENT-CERT。每种认证方法将有不同的配置，但我们将在 Tomcat Web 应用程序配置部分仅讨论 DIGEST 和 FORM 认证方法。

**要完成 Web 应用程序配置，我们需要设置受保护的区域**。在 web.xml 文件的 web-app 元素下，我们可以添加尽可能多的 _security-constraint_ 元素。每个安全约束定义受保护资源的 URL 模式，并设置允许的角色。此外，我们需要定义所有角色的安全角色元素，并且它们必须与 tomcat-users.xml 文件中的定义匹配。我们将在下一节中看到示例。

## 4. 示例认证机制

现在我们知道了如何配置 Web 应用程序，让我们看两个示例：Ping 和 Pong。**我们选择了不同的认证机制来展示 SSO 如何与不同的机制良好工作**。

### 4.1. Ping 认证机制

在 ping Web 应用程序中，我们使用表单认证方法。**表单认证方法需要一个登录表单，登录失败的网页**。例如，当我们要自定义登录页面以使其看起来像 Web 应用程序时，这种方法将很有用，配置如下：

```xml
``<login-config>``
    ``<auth-method>``FORM``</auth-method>``
    `<form-login-config>`
        `<form-login-page>`/logging.html`</form-login-page>`
        `<form-error-page>`/logging_error.html`</form-error-page>`
    `</form-login-config>`
``</login-config>``
```

**登录页面必须遵循 servlet 规范 2.3 中登录表单注释中定义的严格规则**，因为我们不能选择表单或输入字段的名称。它们必须是 _j_security_check_、_j_username_ 和 _j_password_。这是为了使登录表单能够与所有类型的资源一起工作，并消除在服务器中配置出站表单的动作字段的需要。这里我们可以看到它必须看起来像什么：

```html
`<!DOCTYPE html>`
`<html>`
`<head>`
    `<title>`Ping - 登录`</title>`
`</head>`
`<body>`
    `<form method="post" action="j_security_check">`
        `<table>`
            ``<tr>``
                ````<td>````用户名：````</td>````
                ````<td>`````<input type="text" name="j_username" size="20"/>`````</td>````
            ``</tr>``
            ``<tr>``
                ````<td>````密码：````</td>````
                ````<td>`````<input type="password" name="j_password" size="20"/>`````</td>````
            ``</tr>``
        `</table>`
        `<p>``</p>`
        `<input type="submit" value="提交"/>`
        &nbsp;
        `<input type="reset" value="重置"/>`
    `</form>`
`</body>`
`</html>`
```

要了解服务器在接收到表单认证 Web 应用程序的受保护资源请求时会发生什么，让我们总结一下这种认证机制的流程。

首先，客户端请求受保护的资源。如果服务器不包含有效的 SSO 会话 ID，则服务器将重定向客户端到登录表单。在用户填写表单并将其凭据发送到服务器后，认证机制将开始。

在用户认证成功后，服务器将检查用户的角色，如果安全约束允许至少一个，则服务器将重定向客户端到请求的 URL。在另一种情况下，服务器将重定向客户端到错误页面。

### 4.2. Pong 认证机制

在 Pong Web 应用程序中，我们使用摘要认证机制，配置如下：

```xml
``<login-config>``
    ``<auth-method>``DIGEST``</auth-method>``
``</login-config>``
```

**摘要认证机制的流程类似于 BASIC 认证：**当客户端请求受保护的资源时，服务器返回一个对话框以请求用户凭据。如果认证成功，则服务器返回请求的资源，但在另一种情况下，服务器再次发送认证对话框。

**尽管摘要和 BASIC 认证方法相似，但有一个重要区别：密码保留在服务器中。**

### 4.3. Web 应用程序安全约束配置

在这一点上，我们不会区分 Ping 和 Pong。尽管它们具有不同值的元素，但配置的重要部分在两个应用程序中将保持相同：

```xml
`<security-constraint>`
    `<display-name>`Ping 登录认证`</display-name>`
    `<web-resource-collection>`
        `<web-resource-name>`PingRestrictedAccess`</web-resource-name>`
        `<url-pattern>`/private/*`</url-pattern>`
    `</web-resource-collection>`
    `<auth-constraint>`
        `<role-name>`admin`</role-name>`
    `</auth-constraint>`
    `<user-data-constraint>`
        `<transport-guarantee>`NONE`</transport-guarantee>`
    `</user-data-constraint>`
`</security-constraint>`
```

安全约束定义了 private 文件夹下的所有内容都是受保护的资源，并定义了需要具有管理员角色才能访问资源。

## 5. 运行示例

现在我们需要安装一个 Tomcat 10 服务器，根据文章中显示的配置进行调整，并将 Ping 和 Pong Web 应用程序放在 Tomcat 的 Web 应用程序文件夹下。

一旦服务器启动并运行，并且两个应用程序都已部署，请求资源 http://localhost:8080/ping/private。服务器将显示登录认证，因为我们尚未登录：

![img](https://www.baeldung.com/wp-content/uploads/2022/03/ping_app_login_request.png)

然后我们需要输入在 Tomcat 服务器配置部分配置的凭据并提交表单。如果服务器验证了凭据，我们将看到一个带有指向 pong 的私有部分链接的网页：

![img](https://www.baeldung.com/wp-content/uploads/2022/03/ping_app_private_page.png)

如果服务器没有验证访问，我们将看到登录错误页面。

![img](https://www.baeldung.com/wp-content/uploads/2022/03/ping_app_login_error.png)

在成功登录到 Ping 应用程序后，我们可以看到 SSO 机制在起作用，点击链接到 pong 的私有部分。如果会话已经激活，服务器将发送 Pong 的受保护资源，而无需我们再次登录。

![img](https://www.baeldung.com/wp-content/uploads/2022/03/pong_app_private_page.png)

最后，我们可以检查会话过期后，服务器将再次显示登录页面。我们可以通过等待几分钟并点击链接到 ping 的私有部分来做到这一点。

## 6. 其他 SSO 解决方案

在本文中，我们介绍了由 Tomcat 服务器实现的 Web-SSO。如果我们想探索其他 SSO 选项，这里有一些流行的选项：

- Spring Security 和 OpenID Connect
- Spring Security OAuth 与 KeyCloak
- 使用 Spring Security 的 SAML
- Apereo Central Authentication Service

## 7. 结论

在本教程中，我们学习了 Tomcat 架构的基础知识。稍后，我们回顾了如何配置服务器。最后，我们回顾了必须包含在 SSO 下的 servlet 或 Web 应用程序的配置。

像往常一样，完整的源代码可以在 GitHub 上找到。

![img](https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg)![img](https://secure.gravatar.com/avatar/dc417739e22ae675b0e1f7012bbddaa5?s=50&r=g)
OK