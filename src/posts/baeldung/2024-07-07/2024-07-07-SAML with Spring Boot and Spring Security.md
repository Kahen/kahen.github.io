---
date: 2022-04-01
category:
  - Spring Security
  - SAML
tag:
  - Spring Boot
  - Spring Security
  - SAML2
head:
  - - meta
    - name: keywords
      content: Spring Security, SAML2, Spring Boot, SSO
---
# Spring Boot和Spring Security中的SAML

如果您正在实现Spring Security（特别是OAuth），请务必查看《学习Spring安全》课程。

**>> 学习Spring**
**安全**

## 1. 概述

在本教程中，我们将使用Spring Boot设置SAML2。SAML是一种长期受信任的技术，用于实现安全应用程序。设置SAML需要多方配置，因此过程有些复杂。我们需要在我们的服务提供商和身份提供商之间来回几次，因此需要耐心地按照逐步指南进行。让我们深入了解创建我们工作应用程序的每个步骤。

## 2. 设置服务提供商（SP）

在我们的例子中，Spring Boot应用程序是我们的服务提供商。让我们设置一个带有Spring Security、Spring MVC和OpenSAML依赖项的Spring Boot应用程序。**一个关键依赖项是Spring Security SAML2。**Spring Security框架中新的SAML2支持通过单一依赖项提供：

```
`<dependency>`
    `<groupId>`org.springframework.security`</groupId>`
    `<artifactId>`spring-security-saml2-service-provider`</artifactId>`
`</dependency>`
```

### 2.1. SAML配置

现在让我们在_application.yml_中添加必要的SAML2配置。**最重要的配置是来自身份提供商的元数据**。尽管我们已经将_metadata-uri_添加到我们的配置中以完成配置，但目前它还没有可用：

```
spring:
  security:
    saml2:
      relyingparty:
        registration:
          okta:
            signing:
              credentials:
                - private-key-location: classpath:local.key
                  certificate-location: classpath:local.crt
            singlelogout:
              binding: POST
              response-url: "{baseUrl}/logout/saml2/slo"
            assertingparty:
              metadata-uri: "classpath:metadata/metadata-idp.xml"
```

_singlelogout_配置定义了我们的身份提供商在成功登出后将重定向到的端点。此外，_signing_credentials_配置添加了我们的应用程序将用于向身份提供商签署登出请求的密钥和证书。我们使用OpenSSL工具生成_local.key_和_local.crt_文件：

```
openssl req -newkey rsa:2048 -nodes -keyout local.key -x509 -days 365 -out local.crt
```

### 2.2. 代码中的安全配置

在这一步中，**让我们在我们的过滤器链中添加一个安全过滤器。这个过滤器将身份提供商的元数据添加到我们的安全上下文中。**此外，让我们还在_http_对象上添加_saml2Login()_和_saml2Logout()_方法调用，分别启用登录和登出：

```
Saml2MetadataFilter filter = new Saml2MetadataFilter(relyingPartyRegistrationResolver, new OpenSamlMetadataResolver());

http.csrf(AbstractHttpConfigurer::disable).authorizeHttpRequests(authorize ->
    authorize.anyRequest()
  .authenticated())
  .saml2Login(withDefaults())
  .saml2Logout(withDefaults())
  .addFilterBefore(filter, Saml2WebSsoAuthenticationFilter.class);

return http.build();
```

我们使用_withDefaults()_方法配置_saml2Login_和_saml2Logout_的默认行为。这是使用Spring Boot平台的真正力量。只需几行代码即可完成我们所有的SAML2应用程序设置。接下来，我们将在Okta中设置我们的身份提供商。

## 3. 设置身份提供商（IdP）

在这一步中，让我们将Okta设置为我们的身份提供商。**身份提供商是认证我们的用户并生成SAML断言的一方**。然后，这个SAML断言被传回给我们的用户代理。用户代理将这个SAML断言呈现给服务提供商进行认证。服务提供商从身份提供商那里验证它，并允许用户访问其资源。

在Okta开发人员账户注册并登录后，我们得到一个带有左侧边栏的屏幕。在这个边栏中，让我们导航到应用程序页面并开始我们的SAML应用程序集成过程：

![img](https://www.baeldung.com/wp-content/uploads/2023/03/okta1.png)

### 3.1. 创建应用程序集成

接下来，让我们点击‘创建应用程序集成’以打开‘创建新的应用程序集成’对话框并选择SAML 2.0：

![img](https://www.baeldung.com/wp-content/uploads/2023/03/okta2.png)

我们将点击‘下一步’开始‘创建SAML集成’向导。这是一个三步向导。让我们完成每个步骤以完成我们的设置。

### 3.2. 常规设置

在这一步中，我们将应用程序名称输入为‘_Baeldung Spring Security SAML2 App_’：

![img](https://www.baeldung.com/wp-content/uploads/2023/03/okta4.png)

### 3.3. 配置SAML

**现在让我们为我们的SAML应用程序配置最重要的细节。**在这里，我们将在身份提供商中注册单一登录URL。因此，身份提供商接受来自这个URL的SSO请求。受众URI是SAML断言接收者的标识符。这被添加到生成并发送回用户代理的SAML断言中：

![img](https://www.baeldung.com/wp-content/uploads/2023/03/okta-004-create_a_new_app_integration_configure_saml-1-1.jpg)

在我们的例子中，受众URI是_http://localhost:8080/saml2/service-provider-metadata/okta_，而单一登录URL是_http://localhost:8080/login/saml2/sso/okta_。

### 3.4. 高级设置和用户属性

现在让我们展开‘显示高级设置’部分。为了启用_singlelogout_功能，我们需要在这里上传_local.crt_证书。**这是我们在服务提供商_application.yml_中配置的相同证书**。服务提供商应用程序使用此证书签署任何登出请求。

![img](https://www.baeldung.com/wp-content/uploads/2023/03/okta3.png)

此外，让我们将‘单一登出URL’配置为_http://localhost:8080/logout/saml2/slo_。

最后，我们还为_emailAddress_和_firstName_配置属性声明：

> emailAddress -> 未指定 -> user.email

> firstName -> 未指定 -> user.firstName

在我们移动到‘下一步’之前，让我们使用此步骤底部的‘预览SAML断言’链接预览SAML断言。

### 3.5. 最终反馈

在反馈步骤中，让我们选择选项，“我是添加内部应用程序的Okta客户”。

### 3.6. SAML设置说明

完成反馈步骤后，我们将进入应用程序的‘登录’选项卡。在此屏幕上，让我们按照右侧边栏部的“查看SAML设置说明”链接：

这将带我们进入一个页面，其中包含有关我们身份提供商的必要信息。让我们移动到最后一个字段，其中包含IdP元数据：

我们将此元数据复制并保存为我们服务提供商应用程序_resources/metadata_文件夹中的_metadata-idp-okta.xml_，从而满足_application.yml_中的_metadata_uri_要求：

这完成了我们‘服务提供商’和‘身份提供商’的设置。接下来，我们将在Okta开发人员账户中创建用户并将其分配给我们的应用程序。

## 4. 创建用户主体

让我们登录到Okta开发人员账户并导航到左侧边栏的‘目录’部分下的‘人员’页面。在这里，我们将填写‘添加人员’表单以创建用户。有时，可能需要刷新‘人员’页面才能在列表中看到新用户：

在这种情况下，我们自动激活用户。通常，您可能想要发送激活电子邮件或切换切换以使用户在第一次尝试时更改分配的密码。

最后，我们点击‘分配’并遵循几个步骤将新用户分配给我们的SAML应用程序。

## 5. 测试应用程序

现在，我们已经准备好测试我们的应用程序。让我们启动我们的Spring Boot应用程序并打开我们应用程序的默认端点_http://localhost:8080_。这将带我们到登录屏幕：

接下来，我们在我们的成功登录页面上。除了我们的用户名外，我们还在页面上显示了用户属性，例如_emailAddress_和_firstName_：

这结束了设置我们的SAML应用程序的整个过程。但是，在离开之前，**让我们检查最后一件事：‘登出’按钮**。

首先，我们需要将属性``<OKTA-ID>``设置为您的Okta标识符（您可以在URL中看到）：

```
spring:
  security:
    saml2:
      relyingparty:
        registration:
          okta:
            ...
            singlelogout:
              url: https://dev-``<OKTA-ID>``.okta.com/app/dev-56617222_springbootsaml_1/exk8b5jr6vYQqVXp45d7/slo/saml
              binding: POST
              response-url: "{baseUrl}/logout/saml2/slo"
```

然后我们将能够从所有我们的SAML会话中注销已登录的用户：

## 6. 结论

在本文中，我们学习了Spring Boot Security对SAML2的支持。尽管SAML2是一项复杂技术，但它是大型企业的首选。一旦我们理解了SAML2，利用它提供的强大的功能就非常有趣。除了保护我们的应用程序外，SAML2还允许我们使用单点登录(SSO)，避免记住多个应用程序的多个用户名和密码。

如往常一样，本文示例的源代码可在GitHub上获得。

OK