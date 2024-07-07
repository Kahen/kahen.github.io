---
date: 2024-07-08
category:
  - Java
  - Keycloak
tag:
  - Keycloak
  - 用户搜索
head:
  - - meta
    - name: keywords
      content: Keycloak, 用户搜索, Java集成, 身份认证, 访问管理
---
# Keycloak 在 Java 中搜索用户

Keycloak 是一个第三方的身份和访问管理解决方案，可以帮助我们将认证和授权集成到我们的应用程序中。

在本教程中，我们将看到一些在 Keycloak 中搜索用户的例子。

## 2. Keycloak 配置

首先，我们需要配置 Keycloak。让我们创建一个名为 _baeldung_ 的初始管理员用户，密码为 _secretPassword_。其次，我们需要一个领域来工作。让我们使用当我们启动 Keycloak 时已经存在的 _master_ 领域。

最后，我们需要一个客户端，我们可以从我们的 Spring Boot 应用程序中使用。对于这个例子，让我们使用默认创建的 _admin-cli_ 客户端。

我们需要一些用户在领域中，这样我们之后才能搜索他们。让我们创建一个用户名为 “_user1_”，电子邮件为 “_user1@test.com_”，名称为 “_First User_” 的用户。现在，我们可以重复这个模式几次，总共拥有 10 个用户。

## 3. Keycloak 管理客户端

Keycloak 提供了一个 REST API，可以用来访问管理控制台 UI 上提供的所有功能。我们可以使用任何我们想要的客户端，但是 **Keycloak 提供了一个 Java 客户端**，这使得它变得更加容易。在我们的第一个例子中，**我们将从 Spring Boot 应用程序中使用这个 Java 客户端**。

首先，让我们将 _keycloak-admin-client_ 依赖项添加到我们的 _pom.xml_：

```xml
`<dependency>`
    `<groupId>`org.keycloak`</groupId>`
    `<artifactId>`keycloak-admin-client`</artifactId>`
    `<version>`21.0.1`</version>`
`</dependency>`
```

确保 **客户端的版本与服务器的版本相匹配**。版本不匹配可能无法正常工作。

现在，让我们 **在我们的应用程序中配置客户端**。为此，我们需要创建一个 _Keycloak_ bean：

```java
@Bean
Keycloak keycloak() {
    return KeycloakBuilder.builder()
      .serverUrl("http://localhost:8080")
      .realm("master")
      .clientId("admin-cli")
      .grantType(OAuth2Constants.PASSWORD)
      .username("baeldung")
      .password("secretPassword")
      .build();
}
```

在这个构建器中，我们配置了服务器 URL，设置了前面提到的领域和客户端名称，并提供了正确的凭据。

让我们创建一个服务，将使用这个 bean 来访问我们的 Keycloak 服务器：

```java
@Service
public class AdminClientService {

    @Autowired
    Keycloak keycloak;

    @PostConstruct
    void searchUsers() {
        // ...
    }
}
```

在此之后，让我们启动我们的应用程序。现在我们可以开始搜索用户了。

### 3.1. 按用户名搜索

Java 客户端提供了一个非常方便的方式来 **按用户名搜索用户**。首先，我们需要引用我们想要使用的领域，然后访问用户并使用 **_searchByUsername()_ 方法**。让我们创建一个搜索用户并记录结果的方法：

```java
private static final String REALM_NAME = "master";

void searchByUsername(String username, boolean exact) {
    logger.info("Searching by username: {} (exact {})", username, exact);
    List``````<UserRepresentation>`````` users = keycloak.realm(REALM_NAME)
      .users()
      .searchByUsername(username, exact);

    logger.info("Users found by username {}", users.stream()
      .map(user -> user.getUsername())
      .collect(Collectors.toList()));
}
```

现在，我们可以使用不同的参数从我们的 _searchUsers()_ 方法中使用它：

```java
void searchUsers() {
    searchByUsername("user1", true);
    searchByUsername("user", false);
    searchByUsername("1", false);
}
```

第一次搜索寻找 “_user1_” 用户名的精确匹配。第二次不需要精确匹配，所以它返回所有包含单词 “_user_” 的用户名的用户。第三次类似，寻找包含数字 “1” 的用户名。由于我们有 10 个用户名从 _user1_ 到 _user10_，日志包含以下结果：

```plaintext
12:20:22.295 [main] INFO c.b.k.adminclient.AdminClientService - Searching users in Keycloak 21.0.1
12:20:22.296 [main] INFO c.b.k.adminclient.AdminClientService - Searching by username: user1 (exact true)
12:20:22.341 [main] INFO c.b.k.adminclient.AdminClientService - Users found by username [user1]
12:20:22.341 [main] INFO c.b.k.adminclient.AdminClientService - Searching by username: user (exact false)
12:20:22.357 [main] INFO c.b.k.adminclient.AdminClientService - Users found by username [user1, user10, user2, user3, user4, user5, user6, user7, user8, user9]
12:20:22.357 [main] INFO c.b.k.adminclient.AdminClientService - Searching by username: 1 (exact false)
12:20:22.369 [main] INFO c.b.k.adminclient.AdminClientService - Users found by username [user1, user10]
```

### 3.2. 按电子邮件搜索

正如我们之前看到的，基于用户名进行过滤非常简单。**幸运的是，使用电子邮件地址作为过滤器与此非常相似**。让我们使用接受电子邮件地址和 _boolean_ 参数进行精确匹配的 _searchByEmail()_ 方法：

```java
void searchByEmail(String email, boolean exact) {
    logger.info("Searching by email: {} (exact {})", email, exact);

    List``````<UserRepresentation>`````` users = keycloak.realm(REALM_NAME)
      .users()
      .searchByEmail(email, exact);

    logger.info("Users found by email {}", users.stream()
      .map(user -> user.getEmail())
      .collect(Collectors.toList()));
}
```

让我们用 “_user2@test.com_” 地址进行测试，并寻找一个精确匹配。这次只有一个结果：

```plaintext
12:24:16.130 [main] INFO c.b.k.adminclient.AdminClientService - Searching by email: user2@test.com (exact true)
12:24:16.141 [main] INFO c.b.k.adminclient.AdminClientService - Users found by email [user2@test.com]
```

### 3.3. 按自定义属性搜索

在 Keycloak 中，**用户也可以拥有自定义属性**，不仅仅是简单的用户名和电子邮件。让我们为 _user1_ 添加一个名为 _DOB_（出生日期）的自定义属性，值为 “2000-01-05”。

现在，我们可以使用管理客户端的 _searchByAttributes()_ 方法：

```java
void searchByAttributes(String query) {
    logger.info("Searching by attributes: {}", query);

    List``````<UserRepresentation>`````` users = keycloak.realm(REALM_NAME)
      .users()
      .searchByAttributes(query);

    logger.info("Users found by attributes {}", users.stream()
      .map(user -> user.getUsername() + " " + user.getAttributes())
      .collect(Collectors.toList()));
}
```

让我们使用 “_DOB:2000-01-05_” 查询列出具有匹配属性的用户：

```plaintext
13:19:51.091 [main] INFO c.b.k.adminclient.AdminClientService - Searching by attributes: DOB:2000-01-05
13:19:51.103 [main] INFO c.b.k.adminclient.AdminClientService - Users found by attributes [user1 {DOB=[2000-01-05]}]
```

### 3.4. 按组搜索

**用户也可以属于一个组，我们也可以按此进行过滤**。让我们创建一个名为 “_Test Group_” 的组，并向其中添加一些成员。现在，我们可以使用管理客户端获取这个组的成员：

```java
void searchByGroup(String groupId) {
    logger.info("Searching by group: {}", groupId);

    List``````<UserRepresentation>`````` users = keycloak.realm(REALM_NAME)
      .groups()
      .group(groupId)
      .members();

    logger.info("Users found by group {}", users.stream()
      .map(user -> user.getUsername())
      .collect(Collectors.toList()));
}
```

然而，重要的是要注意，我们在这里使用了组 ID 而不是名称。这样，**我们可以列出 Keycloak 组的成员**：

```plaintext
14:35:09.275 [main] INFO c.b.k.adminclient.AdminClientService - Searching by group: c67643fb-514e-488a-a4b4-5c0bdf2e7477
14:35:09.290 [main] INFO c.b.k.adminclient.AdminClientService - Users found by group [user1, user2, user3, user4, user5]
```

### 3.5. 按角色搜索

按角色搜索与前一种方法非常相似，因为我们可以根据特定角色列出用户，就像我们列出组成员一样。为此，我们需要给一些用户分配角色。让我们创建一个名为 “_user_” 的角色，并将其分配给 “user1”。现在，我们可以实施搜索功能：

```java
void searchByRole(String roleName) {
    logger.info("Searching by role: {}", roleName);

    List``````<UserRepresentation>`````` users = keycloak.realm(REALM_NAME)
      .roles()
      .get(roleName)
      .getUserMembers();

    logger.info("Users found by role {}", users.stream()
      .map(user -> user.getUsername())
      .collect(Collectors.toList()));
}
```

让我们来看看哪些用户拥有这个角色：

```plaintext
12:03:23.788 [main] INFO c.b.k.adminclient.AdminClientService - Searching by role: user
12:03:23.802 [main] INFO c.b.k.adminclient.AdminClientService - Users found by role [user1]
```

## 4. 自定义 REST 端点

正如我们所看到的，Keycloak 默认提供了有用的搜索功能，但在某些情况下，我们可能需要不同或更复杂的功能。但这也有一个解决方案。**我们可以通过向 Keycloak 添加新的 API 端点来实现我们自己的自定义功能**。

假设我们想要找到属于特定组并具有特定角色的用户。例如，我们可以找到所有在 “_software development department_” 组中具有 “_project manager_” 角色的用户。

**首先，我们需要一个从 Keycloak 的 _RealmResourceProvider_ 扩展的新类**。让我们在这里实现我们的自定义功能：

```java
public class KeycloakUserApiProvider implements RealmResourceProvider {
    private final KeycloakSession session;

    public KeycloakUserApiProvider(KeycloakSession session) {
        this.session = session;
    }

    public void close() {
    }

    public Object getResource() {
        return this;
    }

    @GET
    @Produces({ MediaType.APPLICATION_JSON })
    public Stream``````<UserRepresentation>`````` searchUsersByGroupAndRoleName(@QueryParam("groupName") @NotNull String groupName, @QueryParam("roleName") @NotBlank String roleName) {
        RealmModel realm = session.getContext().getRealm();

        Optional`<GroupModel>` groupByName = session.groups()
          .getGroupsStream(realm)
          .filter(group -> group.getName().equals(groupName))
          .findAny();

        GroupModel group = groupByName.orElseThrow(() -> new NotFoundException("Group not found with name " + groupName));

        return session.users()
          .getGroupMembersStream(realm, group)
          .filter(user -> user.getRealmRoleMappingsStream().anyMatch(role -> role.getName().equals(roleName)))
          .map(user -> ModelToRepresentation.toBriefRepresentation(user));
    }
}
```

**之后，我们需要通过配置一个 _RealmResourceProviderFactory_ 来告诉 Keycloak 使用这个类**：

```java
public class KeycloakUserApiProviderFactory implements RealmResourceProviderFactory {
    public static final String ID = "users-by-group-and-role-name";

    @Override
    public RealmResourceProvider create(KeycloakSession session) {
        return new KeycloakUserApiProvider(session);
    }

    @Override
    public void init(Scope config) {
    }

    @Override
    public void postInit(KeycloakSessionFactory factory) {
    }

    @Override
    public void close() {
    }

    @Override
    public String getId() {
        return ID;
    }
}
```

**最后，我们需要通过在 _META-INF_ 文件夹中创建一个文件来注册这个类**。这个文件中应该只有一行，包含我们类的限定名称。让我们创建 **_src/main/resources/META-INF/services/org.keycloak.services.resource.RealmResourceProviderFactory_** 文件，使其包含我们类的名称：

```plaintext
com.baeldung.keycloak.customendpoint.KeycloakUserApiProviderFactory
```

让我们构建项目并将 jar 复制到 Keycloak 的 _providers_ 文件夹中，并运行 _build_ 命令以更新服务器的提供者注册表：

```shell
kc build
```

我们得到以下输出，意味着 **我们的自定义提供者被识别并注册了**：

```plaintext
Updating the configuration and installing your custom providers, if any. Please wait.

Server configuration updated and persisted. Run the following command to review the configuration:
kc.bat show-config
```

**让我们再次启动 Keycloak 实例并访问我们的自定义 API 端点** 在 _http://localhost:8080/realms/master/users-by-group-and-role-name?groupName=Test%20Group&roleName=user_。

这个 API 端点成功返回满足两个条件的用户，这意味着它属于 “_Test Group_” 并具有角色 “_user_”：

```json
[
    {
        "id": "2c59a20f-df38-4d14-8ff9-067ea30f7937",
        "createdTimestamp": 1678099525313,
        "username": "user1",
        "enabled": true,
        "emailVerified": true,
        "firstName": "First",
        "lastName": "User",
        "email": "user1@test.com"
    }
]
```

## 5. 结论

在本文中，我们使用 Keycloak 管理客户端将我们的 Spring Boot 应用程序与 Keycloak 集成，以管理用户。这提供了一种访问现有功能的便捷方式。然后，我们创建了一个自定义 REST 端点来扩展 Keycloak，使我们能够实现任何必要的自定义逻辑。

如往常一样，这些示例的源代码可以在 GitHub 上找到。

[![Baeldung Logo](https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg)](https://www.baeldung.com/)
[![Gravatar Image](https://secure.gravatar.com/avatar/ca13303288f480d70285ec29b5c7e03c?s=50&r=g)](https://www.baeldung.com/)
[![Gravatar Image](https://secure.gravatar.com/avatar/e10d6ff4ff6d95fd255cc95a5ab28c0e?s=50&r=g)](https://www.baeldung.com/)
[![Announcement Icon](https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png)](https://www.baeldung.com/)
[![Baeldung Security Post Footer](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-security-post-footer-main-1.2.0.jpg)](https://www.baeldung.com/)
[![Baeldung Security Lightbox Icon](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-security-lightbox-icn-1.0.0-1.png)](https://www.baeldung.com/)

OK