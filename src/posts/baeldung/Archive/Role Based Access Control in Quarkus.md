---
date: 2024-06-18
category:
  - Java
  - Security
tag:
  - Quarkus
  - RBAC
  - Security
---

# Quarkus中的基于角色的访问控制

在本教程中，我们将讨论基于角色的访问控制（RBAC）以及如何使用Quarkus实现这一功能。

RBAC是一种广为人知的实现复杂安全系统的机制。Quarkus是一个现代的云原生全栈Java框架，它开箱即支持RBAC。

在我们开始之前，重要的是要注意角色可以以多种方式应用。在企业中，角色通常只是权限的聚合，用于识别用户可以执行的特定操作组。在Jakarta中，角色是允许执行资源操作（等同于权限）的标签。实现RBAC系统有多种不同的方式。

在本教程中，我们将使用分配给资源的权限来控制访问，而角色将组织一系列权限。

## 2. RBAC

基于角色的访问控制是一种安全模型，它根据预定义的权限授予应用程序用户访问权限。系统管理员可以在访问尝试时将这些权限分配和验证给特定资源。为了帮助管理权限，他们创建角色来组织它们：

为了演示如何使用Quarkus实现RBAC系统，我们需要一些其他工具，如JSON Web Tokens（JWT）、JPA和Quarkus安全模块。JWT帮助我们实现一种简单且自包含的方式来验证身份和授权，因此为了简单起见，我们在示例中利用它。同样，JPA将帮助我们处理域逻辑和数据库之间的通信，而Quarkus将是所有这些组件的粘合剂。

## 3. JWT

JSON Web Tokens（JWT）是一种安全地在用户和服务器之间传输信息的方式，作为紧凑、URL安全的JSON对象。此令牌经过数字签名以进行验证，通常用于基于Web的应用程序的身份验证和安全数据交换。在身份验证期间，服务器会发出一个包含用户身份和声明的JWT，客户端将在后续请求中使用它来访问受保护的资源：

客户端通过提供一些凭据来请求令牌，然后授权服务器提供签名的令牌；稍后，在尝试访问资源时，客户端提供JWT令牌，资源服务器验证并验证其所需的权限。考虑到这些基本概念，让我们探讨如何在Quarkus应用程序中集成RBAC和JWT。

## 4. 数据设计

为了保持简单，我们将创建一个基本的RBAC系统供此示例使用。为此，让我们使用以下表格：

这使我们能够表示用户、他们的角色以及组成每个角色的权限。JPA数据库表将表示我们的域对象：

```java
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(unique = true)
    private String username;

    @Column
    private String password;

    @Column(unique = true)
    private String email;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "user_roles",
      joinColumns = @JoinColumn(name = "user_id"),
      inverseJoinColumns = @JoinColumn(name = "role_name"))
    private Set`<Role>` roles = new HashSet<>();
    
    // Getter和Setter
}
```

用户表保存登录凭据以及用户和角色之间的关系：

```java
@Entity
@Table(name = "roles")
public class Role {
    @Id
    private String name;

    @Roles
    @Convert(converter = PermissionConverter.class)
    private Set`<Permission>` permissions = new HashSet<>();

    // Getters和Setters
}
```

再次，为了保持简单，权限以逗号分隔值的形式存储在列中，为此我们使用_PermissionConverter_。

## 5. JSON Web Token和Quarkus

在凭证方面，要使用JWT令牌并启用登录，我们需要以下依赖项：

```xml
````<dependency>````
    ````<groupId>````io.quarkus````</groupId>````
    ````<artifactId>````quarkus-smallrye-jwt-build````</artifactId>````
    ````<version>````3.9.4````</version>````
````</dependency>````
````<dependency>````
    ````<groupId>````io.quarkus````</groupId>````
    ````<artifactId>````quarkus-smallrye-jwt````</artifactId>````
    ````<version>````3.9.4````</version>````
````</dependency>````
````<dependency>````
    ````<groupId>````io.quarkus````</groupId>````
    ````<artifactId>````quarkus-test-security````</artifactId>````
    ``<scope>``test``</scope>``
    ````<version>````3.9.4````</version>````
````</dependency>````
````<dependency>````
    ````<groupId>````io.quarkus````</groupId>````
    ````<artifactId>````quarkus-test-security-jwt````</artifactId>````
    ``<scope>``test``</scope>``
    ````<version>````3.9.4````</version>````
````</dependency>````
```

这些模块为我们提供了实现令牌生成、权限验证和测试我们实现的工具。现在，为了定义依赖项和Quarkus版本，我们将使用BOM父项目，其中包含与框架兼容的特定版本。对于这个示例，我们需要：

- _quarkus-smallrye-jwt-build_
- _quarkus-smallrye-jwt_
- _quarkus-test-security_
- _quarkus-test-security-jwt_

接下来，为了实现令牌签名，我们需要RSA公钥和私钥。Quarkus提供了一种简单的配置方式。生成后，我们必须配置以下属性：

```properties
mp.jwt.verify.publickey.location=publicKey.pem
mp.jwt.verify.issuer=my-issuer
smallrye.jwt.sign.key.location=privateKey.pem
```

Quarkus默认在_/resources_或提供的绝对路径中查找。框架使用密钥来签署声明并验证令牌。

## 6. 凭证

现在，为了创建JWT令牌并设置其权限，我们需要验证用户的凭证。下面的代码是如何做到这一点的一个示例：

```java
@Path("/secured")
public class SecureResourceController {
    // 其他方法...
    
    @POST
    @Path("/login")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @PermitAll
    public Response login(@Valid final LoginDto loginDto) {
        if (userService.checkUserCredentials(loginDto.username(), loginDto.password())) {
            User user = userService.findByUsername(loginDto.username());
            String token = userService.generateJwtToken(user);
            return Response.ok().entity(new TokenResponse("Bearer " + token,"3600")).build();
        } else {
            return Response.status(Response.Status.UNAUTHORIZED).entity(new Message("Invalid credentials")).build();
        }
    }
}
```

登录端点验证用户凭证，并在成功的情况下以响应的形式发出令牌。另一个需要注意的重要事项是_@PermitAll_，它确保此端点是公开的，不需要任何身份验证。然而，我们很快就会更详细地查看权限。

这里，我们将特别关注的另一个重要代码片段是generateJwtToken方法，它创建并签名令牌。

```java
public String generateJwtToken(final User user) {
    Set`<String>` permissions = user.getRoles()
      .stream()
      .flatMap(role -> role.getPermissions().stream())
      .map(Permission::name)
      .collect(Collectors.toSet());

    return Jwt.issuer(issuer)
      .upn(user.getUsername())
      .groups(permissions)
      .expiresIn(3600)
      .claim(Claims.email_verified.name(), user.getEmail())
      .sign();
}
```

在这个方法中，我们检索每个角色提供的权限列表，并将它们注入到令牌中。发行者还定义了令牌、重要的声明和生存时间，然后，最后，我们签名令牌。一旦用户收到它，它将被用来验证所有后续调用。令牌包含了服务器需要验证和授权相应用户的所有信息。用户只需要将承载者令牌发送到_Authentication_头以验证调用。

## 7. 权限

如前所述，_Jakarta_使用_@RolesAllowed_来为资源分配权限。尽管它称之为角色，但它们像权限一样工作（根据我们之前定义的概念），这意味着我们只需要用它来注解我们的端点来保护它们，像这样：

```java
@Path("/secured")
public class SecureResourceController {
    private final UserService userService;
    private final SecurityIdentity securityIdentity;

    // 构造函数

    @GET
    @Path("/resource")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed({"VIEW_ADMIN_DETAILS"})
    public String get() {
        return "Hello world, here are some details about the admin!";
    }

    @GET
    @Path("/resource/user")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed({"VIEW_USER_DETAILS"})
    public Message getUser() {
        return new Message("Hello " + securityIdentity.getPrincipal().getName() + "!");
    }

    //...
}
```

查看代码，我们可以看到向我们的端点添加权限控制是多么简单。在我们的例子中，/secured/resource/user现在需要_VIEW_USER_DETAILS_权限，而/secured/resource需要_VIEW_ADMIN_DETAILS_。我们还可以观察到，可以分配一个权限列表而不是只有一个。在这种情况下，Quarkus将要求至少列出的_@RolesAllowed_中的一个权限。

另一个重要的评论是，令牌包含权限和有关当前登录用户的信息（安全身份中的主体）。

## 8. 测试

Quarkus提供了许多工具，使我们的应用程序测试变得简单易行。使用这些工具，我们可以配置JWT的创建和设置以及它们的上下文，使测试