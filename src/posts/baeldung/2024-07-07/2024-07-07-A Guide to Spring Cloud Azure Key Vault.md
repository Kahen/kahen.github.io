---
date: 2023-04-01
category:
  - Spring Cloud Azure
  - Azure Key Vault
tag:
  - Java
  - Azure
  - Spring
head:
  - - meta
    - name: keywords
      content: Spring Cloud Azure, Azure Key Vault, Java, Azure, Spring
---
# 使用Spring Cloud Azure集成Azure Key Vault

Azure Container Apps是一个完全托管的无服务器容器服务，它使您能够**构建和部署现代化的、云原生的Java应用程序和微服务**。它提供了简化的开发者体验，同时提供了容器的灵活性和可移植性。

当然，Azure Container Apps对我们的生态系统有着非常扎实的支持，从多种构建选项、托管的Java组件、原生度量指标、动态日志记录等等。

要了解更多关于Azure Container Apps上的Java特性，您可以在文档页面开始学习。

而且，您也可以在Azure Container Apps的GitHub页面上提问和留下反馈。

## 1. 概述

在本教程中，我们将探讨云原生开发的基本理念以及使用Spring Cloud Azure Key Vault的好处。

## 2. 什么是Spring Cloud Azure？

**Spring Cloud Azure是一套全面的库和工具，专门设计用于促进Spring应用程序和Microsoft Azure服务之间的集成。**

尽管已经可以使用Azure SDK将Java应用程序与Azure集成，但Spring Cloud Azure的引入将这种集成提升到了一个全新的水平。

通过利用Spring Cloud Azure提供的强大的API集，我们可以方便地与各种Azure服务进行交互，如Azure Storage、Cosmos DB等。

**它简化了开发过程，并增强了应用程序的整体安全性和性能。**

Spring Cloud Azure提供了几个模块，用于将我们的应用程序与最相关的Azure服务集成。让我们看一些例子：

- 配置管理：使用`spring-cloud-azure-starter-appconfiguration`，我们可以轻松地集成Azure配置管理，这是一项用于管理和存储部署在Azure上的应用程序配置的服务
- 存储：使用`spring-cloud-azure-starter-storage`，我们可以无缝地使用Azure Storage，这是一种基于云的存储解决方案，用于存储和管理包括非结构化、结构化和半结构化数据在内的各种类型的数据
- Cosmos DB：使用`spring-cloud-azure-starter-cosmos`，Azure Cosmos DB，一种多模型数据库服务，可以顺利集成
- 服务总线：使用`spring-cloud-azure-starter-servicebus`，我们可以轻松地集成Azure服务总线，这是一种消息服务，它使分布式应用程序和服务之间的解耦通信成为可能
- Active Directory：使用`spring-cloud-azure-starter-active-directory`，使用Azure Active Directory，一种提供集中式身份和访问管理系统的服务，可以轻松实现

我们可以在这里找到所有可用模块的完整列表。

## 3. 项目设置

要开始使用Azure云服务，第一步是注册Azure订阅。

**订阅就绪后，让我们安装Azure CLI。** 这个命令行界面工具允许我们从本地机器与Azure服务进行交互。

接下来，让我们打开命令提示符并运行命令：

```
> az login
```

登录后，我们为订阅创建一个新的资源组：

```
> az group create --name spring_cloud_azure --location eastus
```

**除了通过命令行创建资源组外，我们还可以在网络浏览器中使用Azure门户创建新的订阅。** 这为我们提供了一个直观的界面来管理我们的Azure资源和订阅。

随着我们向前推进，下一步是配置我们的IDE。在本教程中，我们将使用IntelliJ作为我们选择的IDE。

**Azure Toolkit是在进行Azure相关开发时使用的一个有用的工具包。** 它提供了专门设计的工具和资源，帮助开发人员在Azure平台上构建和管理应用程序。

所以让我们在IDE上安装这个插件，然后转到_Tools > Azure > Login_。这将提示我们输入我们的Azure凭据，以验证我们对平台的访问。

## 4. 集成

我们已经完成了将Spring应用程序与Azure服务集成所需的准备工作。

在本教程中，我们将通过使用Java的官方Azure SDK和专用的Spring Cloud模块，将Azure Key Vault服务集成到我们的应用程序中。

### 4.1. Azure Key Vault

**Azure Key Vault是一个强大的基于云的服务，它提供了一种安全和可靠的存储和管理敏感数据的方式，包括加密密钥、秘密和证书。**

它可以作为应用程序的外部配置源。而不是在配置文件中将敏感信息定义为值，我们可以将它们定义为Azure Key Vault中的秘密，然后安全地在运行时注入到应用程序中。

首先，我们需要在之前创建的资源组上创建一个新的Key Vault。我们可以使用Azure CLI来做到这一点，但如果我们更喜欢，也可以使用Azure门户：

```
> az keyvault create --name new_keyvault --resource-group spring_cloud_azure --location eastus
```

创建Key Vault存储后，让我们在Key Vault存储_new_keyvault_中创建两个秘密：

```
> az keyvault secret set --name my-database-secret --value my-database-secret-value --vault-name new_keyvault
```

```
> az keyvault secret set --name my-secret --value my-secret-value --vault-name new_keyvault
```

第一个秘密具有键_my-database-secret_和值_my-database-secret-value_，而第二个具有键_my-secret_和值_my-secret-value_。

我们还可以在Azure门户上检查并确认这些秘密的创建：![img](https://www.baeldung.com/wp-content/uploads/2023/04/url-azure-key-vault-2.jpg)

### 4.2. Secret Client

一旦我们定义了这些秘密，我们可以在我们的应用程序中定义_SecretClient_。

_SecretClient_类提供了一个客户端接口，用于从Azure Key Vault检索和管理秘密。

所以让我们定义一个接口：

```java
public interface KeyVaultClient {
    SecretClient getSecretClient();

    default KeyVaultSecret getSecret(String key) {
        KeyVaultSecret secret;
        try {
            secret = getSecretClient().getSecret(key);
        } catch (Exception ex) {
            throw new NoSuchElementException(String.format("Unable to retrieve %s secret", key), ex);
        }
        return secret;
    }
}
```

接口_KeyVaultClient_声明了两个方法：

- 第一个方法，_getSecretClient()_，返回_SecretClient_类的实例。
- 第二个方法，_getSecret()_，提供了一个默认实现，用于从秘密客户端检索特定的秘密，嵌套在对象_KeyVaultSecret_中。

现在让我们看看两种定义_SecretClient_的方法，一种使用标准的Azure SDK，另一种使用Spring Cloud模块。

### 4.3. 不使用Spring Cloud Azure的集成

在这种方法中，我们将仅使用Microsoft Azure SDK公开的API配置_SecretClient_。

所以让我们将_azure-keyvault-extensions_依赖项添加到我们的_pom.xml_文件中：

```xml
``<dependency>``
    ``<groupId>``com.microsoft.azure``</groupId>``
    ``<artifactId>``azure-keyvault-extensions``</artifactId>``
    ``<version>``1.2.6``</version>``
`</dependency>`
```

现在让我们在_application.yaml_文件中定义配置_SecretClient_所需的参数：

```yaml
azure:
  keyvault:
    vaultUrl: {$myVaultUrl}
    tenantId: {$myTenantId}
    clientId: {$myClientId}
    clientSecret: {$myClientSecret}
```

我们应该用适当的值替换所有的占位符。

一个选择是直接将值硬编码到_application.yaml_中。然而，这种方法需要存储多个敏感数据，包括_clientId_或_clientSecret_，这可能带来安全风险。

**而不是硬编码这些值，我们可以为每个敏感数据创建一个秘密，并使用Azure pipeline将它们注入到我们的配置文件中。**

接下来，我们创建一个_KeyVaultProperties_类来处理这个配置：

```java
@ConfigurationProperties("azure.keyvault")
@ConstructorBinding
public class KeyVaultProperties {
    private String vaultUrl;
    private String tenantId;
    private String clientId;
    private String clientSecret;
    //Standard constructors, getters and setters
}
```

现在让我们创建我们的客户端类：

```java
@EnableConfigurationProperties(KeyVaultProperties.class)
@Component("KeyVaultManuallyConfiguredClient")
public class KeyVaultManuallyConfiguredClient implements KeyVaultClient {

    private KeyVaultProperties keyVaultProperties;

    private SecretClient secretClient;

    @Override
    public SecretClient getSecretClient() {
        if (secretClient == null) {
            secretClient = new SecretClientBuilder()
              .vaultUrl(keyVaultProperties.getVaultUrl())
              .credential(new ClientSecretCredentialBuilder()
                .tenantId(keyVaultProperties.getTenantId())
                .clientId(keyVaultProperties.getClientId())
                .clientSecret(keyVaultProperties.getClientSecret())
                .build())
              .buildClient();
        }
        return secretClient;
    }
}
```

一旦我们注入了这个_SecretClient_的实现，_getSecret()_的默认方法将返回手动配置的_SecretClient_对象。

### 4.4. 使用Spring Cloud Azure的集成

作为这种方法的一部分，我们将使用Spring Cloud Azure Key Vault设置_SecretClient_，并利用框架的另一个有用特性：将秘密注入到属性文件中。

所以让我们将_spring-cloud-azure-starter-keyvault-secrets_依赖项添加到我们的_pom.xml_文件中：

```xml
``<dependency>``
   ``<groupId>``com.azure.spring``</groupId>``
   ``<artifactId>``spring-cloud-azure-starter-keyvault-secrets``</artifactId>``
   ``<version>``5.12.0beta.1``</version>``
```

接下来，让我们在_application.yaml_中添加以下属性：

```yaml
spring:
  cloud:
    azure:
      keyvault:
        secret:
          endpoint: {$key-vault-endpoint}
```

我们应该将_key-vault-endpoint_占位符替换为我们在Azure门户下定义的存储URI，位于_Resources > {our keyvault} > Vault URI_。

现在让我们创建我们的客户端类：

```java
@Component("KeyVaultAutoconfiguredClient")
public class KeyVaultAutoconfiguredClient implements KeyVaultClient {
    private final SecretClient secretClient;

    public KeyVaultAutoconfiguredClient(SecretClient secretClient) {
        this.secretClient = secretClient;
    }

    @Override
    public SecretClient getSecretClient() {
        return secretClient;
    }
}
```

一旦我们注入了这个_SecretClient_的实现，_getSecret()_的默认方法将返回自动配置的_SecretClient_对象。在我们的_application.yaml_中，除了端点秘密外，我们不需要指定任何配置值。

Spring Cloud将自动填充所有_SecretClient_的凭据参数。

我们也可以在属性文件中使用Spring Cloud Azure模块注入秘密。让我们在_application.yaml_中添加属性：

```yaml
spring:
  cloud:
    azure:
      compatibility-verifier:
        enabled: false
      keyvault:
        secret:
          property-sources[0]:
            name: key-vault-property-source-1
            endpoint: https://spring-cloud-azure.vault.azure.net/
          property-source-enabled: true
```

通过设置_flag property-source-enabled_，Spring Cloud Azure从在_keyvault-secret-property-sources[0]_中指定的Key Vault存储中注入秘密。

接下来，我们可以在_application.yaml_中创建一个动态属性：

```yaml
database:
  secret:
    value: ${my-database-secret}
```

当应用程序启动时，Spring Cloud Azure将用Azure Key Vault中定义的实际值替换占位符_${my-database-secret}_。

### 4.5. 在属性文件中注入秘密

我们已经看到了两种将秘密注入到我们的属性文件中的方法：使用Spring Cloud Azure Key Vault或配置Azure pipeline。

如果我们只使用Spring Cloud Azure Key Vault我们应该在_application.yaml_中硬编码Key Vault端点，以启用对我们的属性文件的注入，这可能带来安全风险。

另一方面，使用Azure pipelines时，我们不需要硬编码任何值。该pipeline将替换我们的_application.yaml_中的秘密。

**因此，我们应该仅使用Spring Cloud Azure Key Vault模块的自动配置_SecretClient_和其他特性的好处，同时将秘密注入到我们的属性文件中的任务委托给Azure pipelines。**

### 4.6. 运行应用程序

现在让我们运行我们的Spring Boot应用程序：

```java
@SpringBootApplication
public class Application implements CommandLineRunner {

    @Value("${database.secret.value}")
    private String mySecret;

    private final KeyVaultClient keyVaultClient;

    public Application(@Qualifier(value = "KeyVaultAutoconfiguredClient") KeyVaultAutoconfiguredClient keyVaultAutoconfiguredClient) {
        this.keyVaultClient = keyVaultAutoconfiguredClient;
    }

    public static void main(String[] args) {
        SpringApplication.run(Application.class);
    }

    @Override
    public void run(String... args) throws Exception {
        KeyVaultSecret keyVaultSecret = keyVaultClient.getSecret("my-secret");
        System.out.println("Hey, our secret is here ->" + keyVaultSecret.getValue());
        System.out.println("Hey, our secret is here from application properties file ->" + mySecret);
    }
}

```

我们的应用程序将在启动时从自动配置的客户端和注入到_application.yaml_中的秘密中检索秘密，然后在控制台上显示它们。

## 5. 结论

在本文中，我们讨论了与Azure的Spring Cloud集成。

我们了解到，使用Spring Cloud Azure Key Vault而不是Microsoft提供的Azure SDK，可以使Azure Key Vault和Spring应用程序的集成更加简单和简洁。

如常，示例的完整源代码可以在GitHub上找到。
```

OK