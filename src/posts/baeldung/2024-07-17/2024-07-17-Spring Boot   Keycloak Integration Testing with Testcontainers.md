---
date: 2022-09-01
category:
  - Spring Boot
  - Keycloak
tag:
  - Spring Security
  - OAuth
  - Integration Testing
  - Testcontainers
head:
  - - meta
    - name: keywords
      content: Spring Boot, Keycloak, Spring Security, OAuth, Integration Testing, Testcontainers
---
# Spring Boot – 使用Testcontainers进行Keycloak集成测试

如果你正在处理Spring Security（特别是OAuth）实现，一定要看看《学习Spring安全》课程。

**>> 学习Spring**
**安全**

## 1. 引言

集成测试在验证应用程序是否正常工作时至关重要。我们还应该正确地测试认证，因为它是一个敏感部分。Testcontainers允许我们在测试阶段启动Docker容器，以针对实际的技术栈运行我们的测试。

在本文中，**我们将看到如何使用Testcontainers设置针对实际Keycloak实例的集成测试**。

## 2. 使用Keycloak设置Spring Security

我们需要设置Spring Security、Keycloak配置，最后是Testcontainers。

### 2.1. 设置Spring Boot和Spring Security

让我们通过Spring Security来设置安全性。我们需要spring-boot-starter-security依赖项。所以，让我们将其添加到我们的pom中：

```xml
`````<dependency>`````
    `````<groupId>`````org.springframework.boot`````</groupId>`````
    `````<artifactId>`````spring-boot-starter-security`````</artifactId>`````
`````</dependency>`````
```

我们将使用spring-boot父pom。因此，我们不需要指定其依赖管理中库的版本。

接下来，让我们创建一个简单的控制器来返回一个用户：

```java
@RestController
@RequestMapping("/users")
public class UserController {

    @GetMapping("/me")
    public UserDto getMe() {
        return new UserDto(1L, "janedoe", "Doe", "Jane", "jane.doe@baeldung.com");
    }
}
```

此时，**我们有一个安全的控制器，响应对“/users/me”的请求**。启动应用程序时，Spring Security为用户‘user’生成一个密码，在应用程序日志中可见。

### 2.2. 配置Keycloak

**启动本地Keycloak的最简单方法是使用Docker**。因此，让我们使用一个已经配置了管理员账户的Keycloak容器：

```bash
docker run -p 8081:8080 -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak:17.0.1 start-dev
```

让我们在浏览器中打开URL http://localhost:8081 以访问Keycloak控制台：

![img](https://www.baeldung.com/wp-content/uploads/2022/09/Keycloak-login-page.png)

接下来，让我们创建我们的领域。我们将称之为baeldung：

![img](https://www.baeldung.com/wp-content/uploads/2022/09/Keycloak-create-realm.png)

我们需要添加一个客户端，我们将命名为baeldung-api：

![img](https://www.baeldung.com/wp-content/uploads/2022/09/Keycloak-create-client-1024x724.png)

最后，让我们使用用户菜单添加一个名为Jane Doe的用户：

![img](https://www.baeldung.com/wp-content/uploads/2022/09/Keycloak-create-user-1024x724.png)

现在我们已经创建了用户，我们必须为其分配一个密码。让我们选择s3cr3t并取消勾选临时按钮：

![img](https://www.baeldung.com/wp-content/uploads/2022/09/Keycloak-update-password-1024x724.png)

**现在我们已经设置了我们的Keycloak领域，有一个baeldung-api客户端和一个Jane Doe用户**。

接下来，我们将配置Spring使用Keycloak作为身份提供者。

### 2.3. 将两者结合起来

首先，我们将身份控制委托给Keycloak服务器。为此，我们将使用spring-boot-starter-oauth2-resource-server库。它将允许我们使用Keycloak服务器验证JWT令牌。因此，让我们将其添加到我们的pom中：

```xml
`````<dependency>`````
    `````<groupId>`````org.springframework.boot`````</groupId>`````
    `````<artifactId>`````spring-boot-starter-oauth2-resource-server`````</artifactId>`````
`````</dependency>`````
```

让我们继续配置Spring Security以添加OAuth 2资源服务器支持：

```java
@Configuration
@ConditionalOnProperty(name = "keycloak.enabled", havingValue = "true", matchIfMissing = true)
public class WebSecurityConfiguration {

    @Bean
    protected SessionAuthenticationStrategy sessionAuthenticationStrategy() {
        return new NullAuthenticatedSessionStrategy();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        return http.csrf()
            .disable()
            .cors()
            .and()
            .authorizeHttpRequests(auth -> auth.anyRequest()
                .authenticated())
            .oauth2ResourceServer(OAuth2ResourceServerConfigurer::jwt)
            .build();
    }
}
```

我们正在设置一个新的过滤器链，它将适用于所有传入的请求。它将验证绑定的JWT令牌与我们的Keycloak服务器。

由于我们正在构建一个带有仅承载者身份验证的无状态应用程序，**我们将使用_NullAuthenticatedSessionStrategy_作为会话策略**。此外，《@ConditionalOnProperty_》允许我们通过将_keycloak.enabled_属性设置为_false_来禁用Keycloak配置。

最后，让我们在_application.properties_文件中添加连接到我们的Keycloak所需的配置：

```properties
keycloak.enabled=true
spring.security.oauth2.resourceserver.jwt.issuer-uri=http://localhost:8180/auth/realms/baeldung-api
```

**现在我们的应用程序是安全的，并且在每个请求上查询Keycloak以验证身份验证**。

## 3. 为Keycloak设置Testcontainers

### 3.1. 导出领域配置

Keycloak容器启动时没有任何配置。因此，**当容器启动时，我们必须将其作为JSON文件导入**。让我们从我们当前运行的实例中导出此文件：

不幸的是，Keycloak不通过管理界面导出用户。我们可以登录到容器并使用_kc.sh export_命令。对于我们的示例，手动编辑生成的_realm-export.json_文件并添加我们的Jane Doe更容易。让我们在最终的大括号之前添加此配置：

```json
"users": [
  {
    "username": "janedoe",
    "email": "jane.doe@baeldung.com",
    "firstName": "Jane",
    "lastName": "Doe",
    "enabled": true,
    "credentials": [
      {
        "type": "password",
        "value": "s3cr3t"
      }
    ],
    "clientRoles": {
      "account": [
        "view-profile",
        "manage-account"
      ]
    }
  }
]
```

让我们将_realm-export.json_文件包含在我们的项目中的_src/test/resources/keycloak_文件夹中。我们将在启动Keycloak容器时使用它。

### 3.2. 设置Testcontainers

让我们添加testcontainers依赖项以及testcontainers-keycloak，它允许我们启动Keycloak容器：

```xml
`````<dependency>`````
    `````<groupId>`````com.github.dasniko`````</groupId>`````
    `````<artifactId>`````testcontainers-keycloak`````</artifactId>`````
    ``<version>``2.1.2``</version>``
    ```<scope>```test```</scope>```
`````</dependency>`````
`````<dependency>`````
    `````<groupId>`````org.testcontainers`````</groupId>`````
    `````<artifactId>`````testcontainers`````</artifactId>`````
    ``<version>``1.16.3``</version>``
    ```<scope>```test```</scope>```
`````</dependency>`````
```

接下来，让我们创建一个类，所有测试都将从中派生。我们使用它来配置由Testcontainers启动的Keycloak容器：

```java
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
public abstract class KeycloakTestContainers {

    static {
        keycloak = new KeycloakContainer().withRealmImportFile("keycloak/realm-export.json");
        keycloak.start();
    }
}
```

静态声明和启动我们的容器将确保它将为所有测试实例化和启动一次。**我们使用_KeycloakContainer_对象的_withRealmImportFile_方法在启动时指定要导入的领域的配置**。

### 3.3. Spring Boot测试配置

Keycloak容器使用随机端口。所以我们需要覆盖_application.properties_中定义的_spring.security.oauth2.resourceserver.jwt.issuer-uri_配置一旦启动。为此，我们将使用方便的_@DynamicPropertySource_注解：

```java
@DynamicPropertySource
static void registerResourceServerIssuerProperty(DynamicPropertyRegistry registry) {
    registry.add("spring.security.oauth2.resourceserver.jwt.issuer-uri", () -> keycloak.getAuthServerUrl() + "/realms/baeldung");
}
```

## 4. 创建集成测试

现在我们已经拥有负责启动我们的Keycloak容器和配置Spring属性的主要测试类，让我们创建一个集成测试调用我们的_User_控制器。

### 4.1. 获取访问令牌

首先，让我们添加到我们的抽象类IntegrationTest一个使用Jane Doe的凭据请求令牌的方法：

```java
URI authorizationURI = new URIBuilder(keycloak.getAuthServerUrl() + "/realms/baeldung/protocol/openid-connect/token").build();
WebClient webclient = WebClient.builder().build();
MultiValueMap``<String, String>`` formData = new Linked```java
MultiValueMap``<String, String>`` formData = new LinkedMultiValueMap<>();
formData.put("grant_type", Collections.singletonList("password"));
formData.put("client_id", Collections.singletonList("baeldung-api"));
formData.put("username", Collections.singletonList("jane.doe@baeldung.com"));
formData.put("password", Collections.singletonList("s3cr3t"));

String result = webclient.post()
  .uri(authorizationURI)
  .contentType(MediaType.APPLICATION_FORM_URLENCODED)
  .body(BodyInserters.fromFormData(formData))
  .retrieve()
  .bodyToMono(String.class)
  .block();
```

在这里，我们使用Webflux的WebClient发布一个包含获取访问令牌所需不同参数的表单。

最后，我们将**解析Keycloak服务器的响应以从中提取令牌**。具体来说，我们生成一个包含_Bearer_关键字的经典身份验证字符串，后面跟着令牌的内容，准备在标题中使用：

```java
JacksonJsonParser jsonParser = new JacksonJsonParser();
return "Bearer " + jsonParser.parseMap(result)
  .get("access_token")
  .toString();
```

### 4.2. 创建集成测试

让我们快速设置针对我们配置的Keycloak容器的集成测试。我们将使用RestAssured和Hamcrest进行测试。让我们添加rest-assured依赖项：

```xml
`````<dependency>`````
    `````<groupId>`````io.rest-assured`````</groupId>`````
    `````<artifactId>`````rest-assured`````</artifactId>`````
    ```<scope>```test```</scope>```
`````</dependency>`````
```

现在我们可以创建我们的测试，使用我们的抽象_IntegrationTest_类：

```java
@Test
void givenAuthenticatedUser_whenGetMe_shouldReturnMyInfo() {

    given().header("Authorization", getJaneDoeBearer())
      .when()
      .get("/users/me")
      .then()
      .body("username", equalTo("janedoe"))
      .body("lastname", equalTo("Doe"))
      .body("firstname", equalTo("Jane"))
      .body("email", equalTo("jane.doe@baeldung.com"));
}
```

因此，**从Keycloak获取的访问令牌被添加到请求的Authorization标题中**。

## 5. 结论

在本文中，**我们设置了针对由Testcontainers管理的实际Keycloak的集成测试**。我们导入了一个领域配置，以便每次启动测试阶段时都有一个预配置的环境。

像往常一样，本文中使用的所有代码示例都可以在GitHub上找到。