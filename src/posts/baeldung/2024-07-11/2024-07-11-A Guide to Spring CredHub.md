---
date: 2022-04-01
category:
  - Spring
  - Spring Boot
tag:
  - CredHub
  - Spring Security
head:
  - - meta
    - name: keywords
      content: Spring, Spring Boot, CredHub, Spring Security
---
# Spring CredHub 指南

## 1. 概述

在本教程中，我们将实现 Spring CredHub，这是 CredHub 的 Spring 抽象，用于存储具有访问控制规则的秘密，这些规则将凭证资源映射到用户和操作。请注意，在运行代码之前，我们需要确保我们的应用程序在已安装 CredHub 的 Cloud Foundry 平台上运行。

## 2. Maven 依赖

首先，我们需要安装 `spring-credhub-starter` 依赖项：

```
`<dependency>`
    `<groupId>`org.springframework.credhub`</groupId>`
    `<artifactId>`spring-credhub-starter`</artifactId>`
    `<version>`2.2.0`</version>`
`</dependency>`
```

## 3. 凭证管理的重要性

**凭证管理是安全、集中地处理凭证在其整个生命周期中的过程，主要包括生成、创建、轮换和撤销。** 尽管每家公司的应用程序和信息技术环境都各不相同，但有一件事是一致的：每个应用程序都需要凭证来访问其他应用程序、数据库或工具。

**凭证管理对数据安全至关重要，因为它为用户和应用程序提供了访问敏感信息的权限。** 因此，确保它们在传输和静态存储时的安全非常重要。一种最佳策略是用 API 调用来替代硬编码凭证及其手动管理，使用像 CredHub 这样的专用凭证管理工具以编程方式检索它们。

## 4. CredHub API

### 4.1. 认证

**CredHub API 的认证有两种方式：UAA(OAuth2) 和双向 TLS。**

默认情况下，CredHub 提供集成的双向 TLS 认证。要使用此方案，请在应用程序属性中指定 CredHub 服务器的 URL：

```
spring:
  credhub:
    url: ``<CredHub URL>``
```

通过 UAA 认证 API 的另一种方法是需要客户端凭据授权令牌来获取访问令牌：

```
spring:
  credhub:
    url: ``<CredHub URL>``
    oauth2:
      registration-id: `<credhub-client>`
  security:
    oauth2:
      client:
        registration:
          credhub-client:
            provider: uaa
            client-id: `<OAuth2 client ID>`
            client-secret: `<OAuth2 client secret>`
            authorization-grant-type: `<client_credentials>`
        provider:
          uaa:
            token-uri: `<UAA token server endpoint>`
```

然后可以将访问令牌传递到授权标头。

### 4.2. 凭证 API

**使用 `CredHubCredentialOperations` 接口，我们可以调用 CredHub API 来创建、更新、检索和删除凭证。** CredHub 支持的凭证类型包括：

- `value` – 用于单个配置的字符串
- `json` – 用于静态配置的 JSON 对象
- `user` – 3 个字符串 – 用户名、密码和密码哈希
- `password` – 用于密码和其他字符串凭证的字符串
- `certificate` – 包含根 CA、证书和私钥的对象
- `rsa` – 包含公钥和私钥的对象
- `ssh` – 包含 SSH 格式的公钥和私钥的对象

### 4.2. 权限 API

在写入凭证时提供权限，以控制用户可以访问、更新或检索什么。Spring **CredHub 提供 `CredHubPermissionV2Operations` 接口来创建、更新、检索和删除权限。** 用户被允许对凭证执行的操作有：`read`、`write` 和 `delete`。

## 5. CredHub 集成

现在我们将实现一个 Spring Boot 应用程序，该程序返回订单详情，并展示一些示例来解释凭证管理的完整生命周期。

### 5.1. `CredHubOperations` 接口

**`CredHubOperations` 接口位于 `org.springframework.credhub.core` 包中。它是 Spring 的 CredHub 的中心类，支持丰富的功能集与 CredHub 交互。** 它提供了访问模拟整个 CredHub API 的接口，并在域对象和 CredHub 数据之间进行映射：

```java
public class CredentialService {
    private final CredHubCredentialOperations credentialOperations;
    private final CredHubPermissionV2Operations permissionOperations;

    public CredentialService(CredHubOperations credHubOperations) {
        this.credentialOperations = credHubOperations.credentials();
        this.permissionOperations = credHubOperations.permissionsV2();
    }
}
```

### 5.2. 凭证创建

让我们从创建一个新的 `password` 类型的凭证开始，这是使用 `PasswordCredentialRequest` 构建的：

```java
SimpleCredentialName credentialName = new SimpleCredentialName(credential.getName());
PasswordCredential passwordCredential = new PasswordCredential((String) value.get("password"));
PasswordCredentialRequest request = PasswordCredentialRequest.builder()
  .name(credentialName)
  .value(passwordCredential)
  .build();
credentialOperations.write(request);
```

类似地，可以使用其他 `CredentialRequest` 的实现来构建不同类型的凭证，例如 `ValueCredentialRequest` 用于 `value` 类型的凭证，`RsaCredentialRequest` 用于 `rsa` 类型的凭证，等等：

```java
ValueCredential valueCredential = new ValueCredential((String) value.get("value"));
request = ValueCredentialRequest.builder()
  .name(credentialName)
  .value(valueCredential)
  .build();
```

```java
RsaCredential rsaCredential = new RsaCredential((String) value.get("public_key"), (String) value.get("private_key"));
request = RsaCredentialRequest.builder()
  .name(credentialName)
  .value(rsaCredential)
  .build();
```

### 5.3. 凭证生成

Spring CredHub 还提供了一个选项，可以动态生成凭证，以避免在应用程序端管理它们所涉及的努力。这反过来又增强了数据安全性。让我们看看如何实现这个功能：

```java
SimpleCredentialName credentialName = new SimpleCredentialName("api_key");
PasswordParameters parameters = PasswordParameters.builder()
  .length(24)
  .excludeUpper(false)
  .excludeLower(false)
  .includeSpecial(true)
  .excludeNumber(false)
  .build();

CredentialDetails``<PasswordCredential>`` generatedCred = credentialOperations.generate(PasswordParametersRequest.builder()
  .name(credentialName)
  .parameters(parameters)
  .build());

String password = generatedCred.getValue().getPassword();
```

### 5.4. 凭证轮换和撤销

凭证管理的另一个重要阶段是轮换凭证。下面的代码演示了如何使用 `password` 类型的凭证实现这一点：

```java
CredentialDetails``<PasswordCredential>`` newPassword = credentialOperations.regenerate(credentialName, PasswordCredential.class);
```

CredHub 还允许 `certificate` 类型的凭证同时拥有多个活动版本，以便它们可以在不停机的情况下进行轮换。凭证管理的最后也是最关键的阶段是撤销凭证，可以实现如下：

```java
credentialOperations.deleteByName(credentialName);
```

### 5.5. 凭证检索

现在我们已经了解了完整的凭证管理生命周期。我们将看看如何检索用于订单 API 认证的 `password` 凭证的最新版本：

```java
public ResponseEntity`<Collection<Order>`> getAllOrders() {
    try {
        String apiKey = credentialService.getPassword("api_key");
        return new ResponseEntity<>(new ArrayList<>(getOrderList(apiKey)), HttpStatus.OK);
    } catch (Exception e) {
        return new ResponseEntity<>(HttpStatus.FORBIDDEN);
    }
}

public String getPassword(String name) {
    SimpleCredentialName credentialName = new SimpleCredentialName(name);
    return credentialOperations.getByName(credentialName, PasswordCredential.class)
      .getValue()
      .getPassword();
}
```

### 5.6. 控制对凭证的访问

**可以向凭证附加权限以限制访问。** 例如，可以附加一个权限，允许用户 `u101` 对凭证执行 `READ` 和 `WRITE` 操作。另一个权限可以附加，允许所有用户仅对凭证执行 `READ` 操作。

让我们看看向凭证添加一个权限的示例，允许用户 `u101` 执行 `READ` 和 `WRITE` 操作：

```java
Permission permission = Permission.builder()
  .app(UUID.randomUUID().toString())
  .operations(Operation.READ, Operation.WRITE)
  .user("u101")
  .build();
permissionOperations.addPermissions(name, permission);
```

Spring CredHub 除了 `READ` 和 `WRITE` 之外还提供对其他操作的支持，允许用户：

- `READ` – 通过 ID 和名称获取凭证
- `WRITE` – 通过名称设置、生成和重新生成凭证
- `DELETE` – 通过名称删除凭证
- `READ_ACL` – 通过凭证名称获取 ACL(访问控制列表)
- `WRITE_ACL` – 向凭证 ACL 添加和删除条目

## 6. 结论

在本教程中，我们展示了如何使用 Spring CredHub 库将 CredHub 与 Spring Boot 集成。**我们为订单应用程序集中了凭证管理，涵盖了两个关键方面：凭证生命周期和权限。**

本文的完整源代码可以在 GitHub 上找到。