---
date: 2022-03-01
category:
  - Spring Security
  - OAuth2
tag:
  - OAuth2
  - Spring Security
  - REST API
head:
  - - meta
    - name: keywords
      content: Spring Security, OAuth2, REST API, Spring OAuth2RestTemplate
------
# Spring OAuth2RestTemplate 使用指南

在本教程中，我们将学习如何使用 Spring **OAuth2RestTemplate** 来进行 OAuth2 REST 调用。我们将创建一个能够列出 GitHub 账户仓库的 Spring Web 应用程序。

## 2. Maven 配置

首先，我们需要在我们的 _pom.xml_ 文件中添加 spring-boot-starter-security 和 spring-security-oauth2-autoconfigure 依赖项。由于我们正在构建一个 Web 应用程序，我们还需要包括 spring-boot-starter-web 和 spring-boot-starter-thymeleaf 构件。

## 3. OAuth2 属性

接下来，让我们将 OAuth 配置添加到我们的 _application.properties_ 文件中，以便能够连接 GitHub 账户：

## 4. OAuth2RestTemplate 配置

现在，是时候创建一个安全配置来为我们的应用程序提供 OAuth2 支持了。

### 4.1. SecurityConfig 类

首先，让我们创建 Spring 的安全配置：

### 4.2. OAuth2RestTemplate Bean

其次，我们将为我们的 OAuth2RestTemplate 创建 Bean：

### 4.3. 认证过滤器

第三，我们需要一个认证过滤器来处理 OAuth2 流程：

### 4.4. Spring Security 配置

最后，让我们注册 OAuth2ClientContextFilter 并创建一个 Web 安全配置：

## 5. 使用 OAuth2RestTemplate

**OAuth2RestTemplate 的主要目标是简化对 OAuth2 资源服务器（如 GitHub）的 REST 调用。** 它基本上满足我们应用程序的两个需求：

### 5.1. 登录

让我们创建带有登录和主页选项的 _index.html_ 文件：

### 5.2. 主页

现在，让我们创建一个控制器来欢迎经过身份验证的 GitHub 用户：

### 5.3. GitHub 仓库

现在，是时候使用之前控制器中创建的 OAuth2RestTemplate 来展示用户拥有的所有 GitHub 仓库了。

## 6. 结论

在本文中，我们学习了如何使用 **OAuth2RestTemplate** 简化对 OAuth2 资源服务器（如 GitHub）的 REST 调用。

我们经历了运行 OAuth2 流程的 Web 应用程序的构建模块。然后，我们看到了如何进行 REST API 调用以检索 GitHub 用户的所有仓库。

如常，本教程的完整示例可以在 GitHub 上找到。