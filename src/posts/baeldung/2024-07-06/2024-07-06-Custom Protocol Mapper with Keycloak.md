---
date: 2023-04-05
category:
  - Keycloak
  - IAM
tag:
  - Keycloak
  - IAM
  - Custom Protocol Mapper
head:
  - - meta
    - name: keycloak custom protocol mapper
      content: 教程介绍了如何在Keycloak认证服务器中添加自定义协议映射器。
---

# Keycloak中自定义协议映射器

Keycloak是一个开源的身份和访问管理(IAM)解决方案，专注于现代应用程序和服务。当用户通过Keycloak进行身份验证时，服务器颁发的令牌包含有关经过身份验证的用户和令牌所颁发的客户端的重要信息。

Keycloak的令牌包含一些默认属性，例如_iss_（发行者）、_exp_（过期时间）、_sub_（主题）和_aud_（受众）。但很多时候，这些属性还不够，我们可能需要向令牌添加一些额外的信息。在这种情况下，我们使用协议映射器。

在本教程中，我们将展示**如何在Keycloak授权服务器中添加自定义协议映射器**。

**Keycloak令牌只是一个包含一组声明的JSON对象**，并且通常都是数字签名的。让我们检查一下令牌的有效载荷示例及其标准化声明的集合：

```
{
  "exp": 1680679982,
  "iat": 1680679682,
  "jti": "bebf7b2c-f813-47be-ad63-0ca6323bba19",
  "iss": "http://192.168.198.128:8085/auth/realms/baeldung",
  "aud": "account",
  "sub": "648b0687-c002-441d-b797-0003b30168ed",
  "typ": "Bearer",
  "azp": "client-app",
  "acr": "1",
  ...
  "scope": "email profile",
  "clientId": "client-app",
  "clientHost": "192.168.198.1",
  "email_verified": false,
  "preferred_username": "service-account-client-app",
  "clientAddress": "192.168.198.1"
}
```

**协议映射器将诸如电子邮件地址之类的项目映射到身份和访问令牌中的特定声明**。我们可以通过向客户端添加协议映射器来自定义令牌中的声明。

## 3. 设置Keycloak服务器

在本教程中，我们将使用Keycloak独立版本。我们已经介绍过如何设置Keycloak服务器，所以这里不会详细介绍。

让我们在Keycloak实例中添加一个新的领域称为_baeldung_和一个新的客户端称为_client-app_：

![img](https://www.baeldung.com/wp-content/uploads/2023/04/bael-0.png)

我们将保留所有默认设置，除了_Client authentication_和_Service accounts roles_字段：

![img](https://www.baeldung.com/wp-content/uploads/2023/04/bael-00.png)

_Service accounts roles_字段启用了此客户端的_Client Credentials Grant_支持。

## 4. 自定义协议映射器实现

现在我们已经设置了Keycloak服务器，我们将创建一个自定义协议映射器并在Keycloak服务器中配置它。

### 4.1. 依赖项

我们的**自定义协议映射器是一个常规的Maven项目，它创建一个JAR文件**。

让我们首先在_pom.xml_中声明_keycloak-core_、_keycloak-server-spi_、_keycloak-server-spi-private_和_keycloak-services_依赖项：

```
````<dependency>````
    ````<groupId>````org.keycloak````</groupId>````
    ````<artifactId>````keycloak-core````</artifactId>````
    ````<scope>````provided````</scope>````
    ````<version>````21.0.1````</version>````
````</dependency>````
````<dependency>````
    ````<groupId>````org.keycloak````</groupId>````
    ````<artifactId>````keycloak-server-spi````</artifactId>````
    ````<scope>````provided````</scope>````
    ````<version>````21.0.1````</version>````
````</dependency>````
````<dependency>````
    ````<groupId>````org.keycloak````</groupId>````
    ````<artifactId>````keycloak-server-spi-private````</artifactId>````
    ````<scope>````provided````</scope>````
    ````<version>````21.0.1````</version>````
````</dependency>````
````<dependency>````
    ````<groupId>````org.keycloak````</groupId>````
    ````<artifactId>````keycloak-services````</artifactId>````
    ````<scope>````provided````</scope>````
    ````<version>````21.0.1````</version>````
````</dependency>````
```

### 4.2. 扩展_AbstractOIDCProtocolMapper_类

现在让我们创建我们的协议映射器。为此，**我们扩展_AbstractOIDCProtocolMapper_类并实现所有抽象方法**：

```
public class CustomProtocolMapper extends AbstractOIDCProtocolMapper implements OIDCAccessTokenMapper,
  OIDCIDTokenMapper, UserInfoTokenMapper {
    public static final String PROVIDER_ID = "custom-protocol-mapper";

    private static final List``<ProviderConfigProperty>`` configProperties = new ArrayList<>();
    static {
        OIDCAttributeMapperHelper.addTokenClaimNameConfig(configProperties);
        OIDCAttributeMapperHelper.addIncludeInTokensConfig(configProperties, CustomProtocolMapper.class);
    }

    @Override
    public String getDisplayCategory() {
        return "Token Mapper";
    }

    @Override
    public String getDisplayType() {
        return "Custom Token Mapper";
    }

    @Override
    public String getHelpText() {
        return "Adds a Baeldung text to the claim";
    }

    @Override
    public List``<ProviderConfigProperty>`` getConfigProperties() {
        return configProperties;
    }

    @Override
    public String getId() {
        return PROVIDER_ID;
    }

    @Override
    protected void setClaim(IDToken token, ProtocolMapperModel mappingModel,
      UserSessionModel userSession, KeycloakSession keycloakSession,
      ClientSessionContext clientSessionCtx) {
        OIDCAttributeMapperHelper.mapClaim(token, mappingModel, "Baeldung");
    }
}
```

我们选择了_"custom-protocol-mapper"_作为我们的提供者ID，这是令牌映射器的ID。我们需要这个ID来在我们的Keycloak服务器中配置协议映射器。

**主要方法是_setClaim()_**。**它将我们的数据添加到令牌中**。我们的_setClaim()_实现简单地将_Baeldung_文本添加到令牌中。

_getDisplayType()_和_getHelpText()_方法用于管理控制台。_getDisplayType()_方法定义了在管理控制台中列出协议映射器时显示的文本。_getHelpText()_方法是我们在选择协议映射器时显示的提示工具文本。

### 4.3. 整合

我们不能忘记创建一个服务定义文件并将其添加到我们的项目中。这个文件应该被命名为_org.keycloak.protocol.ProtocolMapper_，并放置在我们的最终JAR的_META-INF/services_目录中。此外，文件的内容是自定义协议映射器实现的完全限定类名：

```
com.baeldung.auth.provider.mapper.CustomProtocolMapper
```

目录结构如下所示：

![img](https://www.baeldung.com/wp-content/uploads/2023/04/directory-structure.png)

现在，项目已经准备好运行。首先，我们使用Maven _install_命令创建一个JAR文件：

```
mvn clean install
```

接下来，我们通过将JAR文件添加到Keycloak的_providers_目录来部署它。之后，我们必须重新启动服务器，以使用我们JAR文件中的实现更新服务器的提供者注册表：

```
$ bin/kc.sh start-dev
```

正如我们在控制台输出中看到的，Keycloak注册了我们的自定义协议映射器：

```
Updating the configuration and installing your custom providers, if any. Please wait.
2023-04-05 14:55:42,588 WARN  [org.keycloak.services] (build-108) KC-SERVICES0047: custom-protocol-mapper (com.baeldung.auth.provider.CustomProtocolMapper) is implementing the internal SPI protocol-mapper.
```

最后，如果我们去Keycloak的管理控制台的_Provider info_页面，我们将看到我们的_custom-protocol-mapper_：

![img](https://www.baeldung.com/wp-content/uploads/2023/04/bael-1.png)

现在，我们可以配置服务器使用我们的自定义协议映射器。

### 4.4. 配置客户端

在Keycloak中，我们可以使用管理面板**添加自定义声明**。为此，我们需要进入管理控制台中的客户端。回想一下，我们之前创建了一个客户端，_client-app_。之后，我们导航到_Client scopes_标签：

![img](https://www.baeldung.com/wp-content/uploads/2023/04/bael-2.png)

现在，让我们点击_client-app-dedicated_并转到它的_Add mapper By configuration_来创建一个新的映射：

![img](https://www.baeldung.com/wp-content/uploads/2023/04/bael-6.png)

在这里，我们需要**输入我们的自定义映射器的_Mapper type_**。我们将输入“_Custom Token Mapper_”，这是我们在_CustomProtocolMapper_类中用于_getDisplayType()_方法的值：

接下来，我们给映射器一个_Name_并保存它。然后，当我们回到_client-app-dedicated_，我们将在列表中看到新的映射：

现在，我们已经准备好测试我们的协议映射器