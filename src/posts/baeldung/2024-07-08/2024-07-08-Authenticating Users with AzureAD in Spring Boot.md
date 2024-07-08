---
date: 2022-04-01
category:
  - Spring Boot
  - AzureAD
tag:
  - Spring Security
  - OAuth
  - OIDC
head:
  - - meta
    - name: keywords
      content: AzureAD, Spring Boot, Spring Security, OAuth, OIDC
---
# 使用AzureAD在Spring Boot中验证用户

Azure Container Apps是一个完全托管的无服务器容器服务，它使您能够**构建和部署现代的、** **云原生的Java应用程序和微服务**。它提供了简化的开发者体验，同时提供了容器的灵活性和可移植性。

当然，Azure Container Apps对我们的生态系统有着真正坚实的支持，从多种构建选项、受管理的Java组件、本地指标、动态日志记录等等。

要了解更多关于Azure Container Apps上的Java特性，您可以在文档页面开始。

而且，您还可以在Azure Container Apps GitHub页面上提问和留下反馈。

如果您正在处理Spring Security（特别是OAuth）实现，一定要看看**学习Spring** **安全**课程：

**>> 学习Spring安全**

## 1. 引言

在本教程中，我们将展示如何轻松地使用AzureAD作为Spring Boot应用程序的身份提供者。

## 2. 概述

Microsoft的AzureAD是一个全面的标识管理产品，被全球许多组织使用。它支持多种登录机制和控制，为用户提供跨组织应用程序组合的单一登录体验。

**此外，忠于Microsoft的起源，AzureAD与现有的Active Directory安装集成良好，许多组织已经在企业网络中使用它进行身份和访问管理**。这允许管理员使用他们已经习惯的工具授予现有用户访问应用程序并管理他们的权限。

## 3. 集成AzureAD

**从基于Spring Boot的应用程序的角度来看，AzureAD表现为符合OIDC的身份提供者**。这意味着我们可以通过仅配置所需的属性和依赖项来使用它与Spring Security。

为了说明AzureAD集成，我们将实现一个机密客户端，访问代码授权在服务器端进行。**此流程永远不会将访问令牌暴露给用户的浏览器，因此它比公共客户端替代方案更安全。**

## 4. Maven依赖项

我们首先为基于Spring Security的WebMVC应用程序添加所需的maven依赖项：

```xml
``<dependency>``
    ``<groupId>``org.springframework.boot``</groupId>``
    ``<artifactId>``spring-boot-starter-oauth2-client``</artifactId>``
    ``<version>``3.1.5``</version>``
``</dependency>``
``<dependency>``
    ``<groupId>``org.springframework.boot``</groupId>``
    ``<artifactId>``spring-boot-starter-web``</artifactId>``
    ``<version>``3.1.5``</version>``
``</dependency>``
```

这些依赖项的最新版本可在Maven Central上找到：

- spring-boot-stater-oauth2-client
- spring-boot-starter-web

## 5. 配置属性

接下来，我们将添加用于配置客户端的所需Spring Security属性。**将这些属性放在专用的Spring配置文件中是一个好习惯，这使得随着应用程序的增长，维护变得更加容易**。我们将此配置文件命名为_azuread_，这清楚地表明了其用途。相应地，我们将在_application-azuread.yml_文件中添加相关属性：

```yaml
spring:
  security:
    oauth2:
      client:
        provider:
          azure:
            issuer-uri: https://login.microsoftonline.com/your-tenant-id-comes-here/v2.0
        registration:
          azure-dev:
            provider: azure
            #client-id: 外部提供
            #client-secret: 外部提供
            scope:
              - openid
              - email
              - profile
```

在提供者部分，我们定义了一个_azure_提供者。**AzureAD支持OIDC标准终端发现机制，所以我们唯一需要配置的属性是_issuer-uri。**

这个属性具有双重目的：首先，它是客户端附加发现资源名称以获取实际下载URL的基础URI。其次，它也用于检查JSON Web Token（JWT）的真实性。例如，由身份提供者创建的JWT的_iss_声明必须与_issuer-uri_值相同。

对于AzureAD，_issuer-uri_始终采用以下形式：_https://login.microsoftonline.com/my-tenant-id/v2.0_，其中_my-tenant-id_是您的租户标识符。

在注册部分，我们定义了使用前面定义的提供者的_azure-dev_客户端。我们还必须通过_client-id_和_client-secret_属性提供客户端凭据。我们将在本文稍后介绍如何在Azure中注册此应用程序时再次讨论这些属性。

最后，作用域属性定义了此客户端将在授权请求中包含的作用域集。在这里，我们请求_profile_作用域，这允许此客户端应用程序请求标准_userinfo_端点。此端点返回存储在AzureAD用户目录中的可配置信息集。这些可能包括用户的首选语言和地区数据等。

## 6. 客户端注册

正如前面提到的，**我们需要在AzureAD中注册我们的客户端应用程序以获取所需属性_client-id_和_client-secret_的实际值**。假设我们已经拥有Azure帐户，第一步是登录到Web控制台，并使用左上角菜单选择_Azure Active Directory_服务页面：

在_概述_部分，我们可以获取我们需要在_issuer-uri_配置属性中使用的租户标识符。接下来，我们将点击_应用程序注册_，这将带我们到现有应用程序的列表，然后点击“新建注册”，这将显示客户端注册表单。在这里，我们必须提供三个信息：

- 应用程序名称
- 支持的帐户类型
- 重定向URI

让我们详细说明每一项。

### 6.1. 应用程序名称

**我们在这里输入的值将在认证过程中向最终用户显示**。因此，我们应该选择一个对目标受众有意义的名称。让我们使用一个非常没有创意的名称：“Baeldung Test App”：

我们不需要太担心正确地命名它。**AzureAD允许我们在任何时候更改它，而不影响注册的应用程序**。重要的是要注意，虽然这个名称不必是唯一的，但是让多个应用程序使用相同的显示名称并不是一个明智的做法。

### 6.2. 支持的帐户类型

在这里，我们有一些选项可供选择，根据应用程序的目标受众。**对于组织内部使用的应用程序，第一个选项（“仅此组织目录中的帐户”）通常是我们想要的**。这意味着即使应用程序可以从互联网访问，只有组织内的用户才能登录：

其他可用的选项增加了接受来自其他AzureAD支持的目录的用户的能力，比如使用Office 365的任何学校或组织以及用于Skype和/或Xbox的个人帐户。

虽然不是很常见，但我们稍后也可以更改此设置，但正如文档中所述，用户在进行此更改后可能会收到错误消息。

### 6.3. 重定向URI

最后，我们需要提供一个或多个可接受的授权流程目标的重定向URI。我们必须选择与URI相关联的“平台”，这转化为我们正在注册的应用程序类型：

- Web：授权代码与访问令牌交换在后端发生
- SPA：授权代码与访问令牌交换在前端发生
- 公共客户端：用于桌面和移动应用程序。

在我们的情况下，我们将选择第一个选项，因为这是我们需要进行用户认证的。

至于URI，我们将使用值_http://localhost:8080/login/oauth2/code/azure-dev_。这个值来自Spring Security的OAuth回调控制器使用的路径，该控制器默认期望在_/login/oauth2/code/{registration-name}_处收到响应代码。在这里，_{registration-name}_必须与配置中的注册部分之一的键匹配，在我们的情况下是_azure-dev_。

**同样重要的是，AzureAD强制使用HTTPS用于这些URI，但对_localhost_有例外**。这使得本地开发无需设置证书。稍后，当我们移动到目标部署环境（例如，Kubernetes集群）时，我们可以添加其他URI。

注意，这个键的值与AzureAD的注册名称没有直接关系，尽管使用一个与它使用位置相关的名称是有意义的。

### 6.4. 添加客户端密钥

一旦我们在初始注册表单上按下注册按钮，我们将看到客户端信息页面：

生成新客户端密钥，我们将点击_添加证书或密钥_，这将带我们到_证书和密钥_页面。接下来，我们将选择_客户端密钥_选项卡并点击_新建客户端密钥_以打开密钥创建表单：

在这里，我们将为这个密钥提供一个描述性的名称并定义其过期日期。我们可以选择预配置的持续时间之一，或者选择自定义选项，这允许我们定义开始和结束日期。

截至本文撰写时，客户端密钥最多在两年后过期。**这意味着我们必须建立一个密钥轮换程序，最好使用像Terraform这样的自动化工具**。两年可能看起来是很长的时间，但在企业环境中，运行多年的应用程序在被替换或更新之前是很常见的。

一旦我们点击_添加_，新创建的密钥就会出现在客户端凭据列表中：

**我们必须立即将密钥值复制到安全的地方，因为一旦我们离开这个页面，它就不会再显示**。在我们的情况下，我们将直接将值复制到应用程序的属性文件中，在_client-secret_属性下。

无论如何，我们必须记住这是一个敏感值！在将应用程序部署到生产环境时，这个值通常会通过一些动态机制提供，比如Kubernetes密钥。

## 7. 应用程序代码

我们的测试应用程序有一个单一的控制器，它处理对根路径的请求，记录有关入站的认证信息，并将请求转发到一个_Thymeleaf_视图。在那里，它将呈现一个页面，显示有关当前用户的信息。

实际控制器的代码是微不足道的：

```java
@Controller
@RequestMapping("/")
public class IndexController {

    @GetMapping
    public String index(Model model, Authentication user) {
        model.addAttribute("user", user);
        return "index";
    }
}
```

视图代码使用_user_模型属性来创建一个包含有关认证对象和所有可用声明的漂亮表格。

## 8. 运行测试应用程序

所有部分都准备就绪后，我们现在可以运行应用程序。**由于我们使用了具有AzureAD属性的特定配置文件，我们需要激活它**。通过Spring Boot的maven插件运行应用程序时，我们可以使用_spring-boot.run.profiles_属性来实现这一点：

```shell
mvn -Dspring-boot.run.profiles=azuread spring-boot:run
```

现在，我们可以打开浏览器并访问_http://localhost:8080_。Spring Security将检测到此请求尚未经过身份验证，并将我们重定向到AzureAD的通用登录页面：

具体的登录序列将根据组织的设置而有所不同，但通常包括填写用户名或电子邮件并提供密码。如果配置了，它还可以请求第二个认证因素。然而，如果我们当前在同一个浏览器中登录到同一AzureAD租户中的另一个应用程序，它将跳过登录序列 - 这毕竟是单一登录的全部意义。

第一次访问我们的应用程序时，AzureAD还将显示应用程序的同意表单：

虽然这里没有涵盖，但AzureAD支持自定义登录UI的多个方面，包括特定区域的自定义。此外，可以完全绕过授权表单，这在授权内部应用程序时非常有用。

一旦我们授予权限，我们将看到我们应用程序的主页，部分显示在这里：

我们可以看到，我们已经可以访问有关用户的基本
OK