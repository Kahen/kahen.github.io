---
date: 2022-06-01
category:
  - Postman
  - CSRF Token
tag:
  - Postman
  - CSRF
  - 403 Forbidden
head:
  - - meta
    - name: keywords
      content: Postman, CSRF Token, 403 Forbidden
------
# 使用Postman REST客户端发送CSRF令牌

## 1. 概述

每次我们测试启用了CSRF保护的端点时，我们都必须手动从cookie中获取CSRF令牌，并将其设置在_X-XSRF-TOKEN_请求头中。如果我们不发送CSRF令牌，我们会收到_403禁止_错误。

在本教程中，我们将看到如何在使用Postman时自动向服务器发送CSRF令牌。

## 2. 应用程序设置

我们不会讨论如何在Spring应用程序中启用CSRF保护，这在之前的文章中已经介绍过了。

**我们知道，我们可以在客户端的cookie中找到CSRF令牌，默认情况下，CSRF保护对_POST_、_PUT_和_DELETE_ HTTP动词强制执行。**

此外，为了测试，我们将使用之前文章中的一个端点，一个_POST_请求，该请求允许用户将金额转移到一个账户：
`POST http://localhost:8080/transfer?accountNo=1234&amount=100`

首先，我们将在不考虑CSRF令牌的情况下使用Postman客户端进行测试。之后，我们将进行另一个测试，发送CSRF令牌并设置Postman以自动发送它。

### 3.1. 不带CSRF令牌的测试

让我们打开Postman并添加一个新请求：

![img](https://www.baeldung.com/wp-content/uploads/2022/06/request.png)

现在，我们执行请求而不发送CSRF令牌，我们得到了_403禁止_错误：

![img](https://www.baeldung.com/wp-content/uploads/2022/06/forbidden.png)

接下来，我们将看到如何修复这个问题。

在_Headers_标签中，让我们添加一个名为_X-XSRF-TOKEN_的新参数，并将值设置为_xsrf-token._ _X-XSRF-TOKEN_是CSRF的头部，_xsrf-token_是我们稍后将定义的环境变量：

![img](https://www.baeldung.com/wp-content/uploads/2022/06/header.png)

### 3.3. 环境变量_xsrf-token_

现在让我们转到左侧的_Environments_并创建一个名为DEV的新环境：

![img](https://www.baeldung.com/wp-content/uploads/2022/06/env-300x291.png)

在右侧，让我们定义我们上面提到的环境变量，称为_xsrf-token._ 我们将其余字段留空：

![img](https://www.baeldung.com/wp-content/uploads/2022/06/env_variable-1024x170.png)

让我们回到请求并从右上角选择DEV环境，以便我们可以使用我们定义的环境属性：

![img](https://www.baeldung.com/wp-content/uploads/2022/06/dev.png)

### 3.4. 脚本

现在让我们点击_Tests_标签。我们将在这里添加以下脚本：

该脚本检_XSRF-TOKEN_ cookie的值并将其分配给环境变量_xsrf-token._ 现在，无论服务器返回什么值，_XSRF-TOKEN_都将被转移到_X-XSRF-TOKEN_头部属性。

### 2.5. 测试

当我们执行请求时，我们现在得到了_200 OK_响应：

## 3. 结论

在本文中，我们看到了如何测试一个启用了CSRF保护的应用程序的端点。

我们使用Postman客户端自动发送每次在同一个端点执行新请求时的CSRF令牌。这更有效，因为我们不需要手动获取CSRF令牌并将其设置在请求头中。