---
date: 2022-04-01
category:
  - Spring Security
  - OAuth2
tag:
  - Testing
  - Access Control
head:
  - - meta
    - name: keywords
      content: Spring Security, OAuth2, Testing, Access Control
---
# 测试Spring OAuth2访问控制 | Baeldung

如果您正在处理Spring Security（特别是OAuth）实现，一定要查看《学习Spring安全》课程。

## 1. 概述

在本教程中，我们将探讨在Spring应用程序中使用模拟身份测试OAuth2安全下的访问控制规则的选项。

我们将使用_MockMvc_请求后处理器、_WebTestClient_变异器以及来自_spring-security-test_和_spring-addons_的测试注解。

## 2. 为什么使用Spring-Addons？

在OAuth2领域，_spring-security-test_仅提供了需要分别在_MockMvc_或_WebTestClient_请求上下文中的请求后处理器和变异器。这对于_Controller_来说可能很好，但测试具有@Service或@Repository等方法安全性（@PreAuthorize、@PostFilter等）是一个问题。

**使用@WithJwt或@WithOidcLogin等注解，我们可以在单元测试中模拟安全上下文，无论是在servlet还是响应式应用程序中的任何@Component。** 这就是我们在某些测试中使用_spring-addons-oauth2-test_的原因：它为我们提供了Spring OAuth2 _Authentication_实现的大多数注解。

## 3. 我们将测试什么？

配套的GitHub存储库包含两个资源服务器，它们共享以下功能：

- **使用JWT解码器进行保护**（而不是不透明的令牌内省）
- **需要_ROLE_AUTHORIZED_PERSONNEL_权限才能访问/secured-route和/secured-method**
- **如果认证缺失或无效（过期、错误的发行者等）则返回_401_，如果访问被拒绝（缺少角色）则返回_403_
- 使用Java配置定义访问控制（对于servlet和响应式应用程序，分别使用_requestMatcher_和_pathMatcher_）和方法安全性
- 使用安全上下文中的Authentication数据构建响应有效载荷

为了说明servlet和响应式测试API之间的轻微差异，一个是servlet（浏览代码），第二个是响应式应用程序（浏览代码）。

在本文中，我们将重点关注在单元和集成测试中测试访问控制规则，并**断言响应的HTTP状态与根据模拟用户身份的预期相匹配**，或者在单元测试其他使用@PreAuthorize、@PostFilter等保护的@Component，如@Service或@Repository时抛出异常。

**所有测试在没有授权服务器的情况下通过**，但如果我们想启动资源服务器并在测试中使用Postman等工具进行查询，则需要一个运行中的授权服务器。提供了一个Docker Compose文件，用于快速启动本地Keycloak实例：

- 管理控制台可在：http://localhost:8080/admin/master/console/#/baeldung
- 管理账户是_admin / admin_
- 已经创建了一个_baeldung_领域，其中包含一个机密客户端（_baeldung_confidential / secret_）和两个用户（_authorized_和_forbidden_，两者的秘密都是_secret_）

## 4. 使用模拟认证的单元测试

通过“单元测试”，我们指的是在隔离任何其他依赖项的情况下测试单个@Component（我们将模拟）。被测试的@Component可以是@WebMvcTest或@WebFluxTest中的_Controller_，或者在简单的JUnit测试中的任何其他受保护的@Service、@Repository等。

**_MockMvc_和_WebTestClient_忽略_Authorization_头**，没有必要提供有效的访问令牌。当然，我们可以实例化或模拟任何认证实现，并在每个测试开始时手动创建安全上下文，但这太繁琐了。相反，**我们将使用_spring-security-test_ _MockMvc_请求后处理器、_WebTestClient_变异器，或_spring-addons_注解来用我们选择的模拟_Authentication_实例填充测试安全上下文**。

我们将使用@WithMockUser只是为了看到它构建了一个_UsernamePasswordAuthenticationToken_实例，这通常是一个问题，因为OAuth2运行时配置在安全上下文中放置了其他类型的_Authentication_：

- 资源服务器使用JWT解码器的_JwtAuthenticationToken_
- 使用访问令牌内省（_opaqueToken_）的资源服务器的_BearerTokenAuthentication_
- 使用_oauth2Login_的客户端的_OAuth2AuthenticationToken_
- 如果我们决定在自定义认证转换器中返回与Spring默认的_Authentication_不同的任何_Authentication_实例。因此，技术上，OAuth2认证转换器可以返回一个_UsernamePasswordAuthenticationToken_实例，并在测试中使用@WithMockUser，但这是一个非常不自然的选择，我们这里不会使用。

### 4.1. 重要说明

_MockMvc_预处理器和_WebTestClient_变异器不使用安全配置中定义的bean来构建测试_Authentication_实例。因此，**使用_SecurityMockMvcRequestPostProcessors.jwt()_或_SecurityMockServerConfigurers.mockJwt()_定义OAuth2声明不会有任何影响，认证名称和权限。** 我们必须自己使用专用方法设置名称和权限。

相比之下，spring-addons注解背后的工厂会扫描测试上下文中的认证转换器，并在找到时使用它。因此，**使用@WithJwt时，重要的是将任何自定义_JwtAuthenticationConverter_作为bean公开**（而不是仅仅作为安全配置中的lambda内联）：

```java
@Configuration
@EnableMethodSecurity
@EnableWebSecurity
static class SecurityConf {
    @Bean
    SecurityFilterChain filterChain(HttpSecurity http, Converter`<Jwt, AbstractAuthenticationToken>` authenticationConverter) throws Exception {
        http.oauth2ResourceServer(resourceServer -> resourceServer.jwt(jwtResourceServer -> jwtResourceServer.jwtAuthenticationConverter(authenticationConverter)));
        ...
    }

    @Bean
    JwtAuthenticationConverter authenticationConverter(Converter`<Jwt, Collection<GrantedAuthority>`> authoritiesConverter) {
        final var authenticationConverter = new JwtAuthenticationConverter();
        authenticationConverter.setPrincipalClaimName(StandardClaimNames.PREFERRED_USERNAME);
        authenticationConverter.setJwtGrantedAuthoritiesConverter(authoritiesConverter);
        return authenticationConverter;
    }
}
```

值得注意的是，认证转换器被公开为_@Bean_，明确注入到安全过滤器链中。这样，@WithJwt背后的工厂就可以使用它从声明中构建_Authentication_，就像在运行时使用真实令牌一样。

还要注意，在高级情况下，如果认证转换器返回的不是_JwtAuthenticationToken_（或在资源服务器使用令牌内省的情况下是_BearerTokenAuthentication_），则只有Spring addons的测试注解会构建预期类型的_Authentication_。

### 4.2. 测试设置

**对于_Controller_单元测试，我们应该用_@WebMvcTest_装饰测试类，用于servlet应用程序，用_@WebFluxTest_用于响应式应用程序。**

Spring为我们自动装配了_MockMvc_或_WebTestClient_，并且由于我们正在编写控制器单元测试，我们将模拟_MessageService_。

这是一个servlet应用程序中的空_@Controller_单元测试的样子：

```java
@WebMvcTest(controllers = GreetingController.class)
class GreetingControllerTest {

    @MockBean
    MessageService messageService;

    @Autowired
    MockMvc mockMvc;

    //...
}
```

这是一个响应式应用程序中的空_@Controller_单元测试的样子：

```java
@WebFluxTest(controllers = GreetingController.class)
class GreetingControllerTest {
    private static final AnonymousAuthenticationToken ANONYMOUS =
      new AnonymousAuthenticationToken("anonymous", "anonymousUser",
      AuthorityUtils.createAuthorityList("ROLE_ANONYMOUS"));

    @MockBean
    MessageService messageService;

    @Autowired
    WebTestClient webTestClient;

    //...
}
```

现在，让我们看看如何断言HTTP状态码是否符合我们之前设置的规范。

### 4.3. 使用_MockMvc_后处理器进行单元测试

**为了在测试安全上下文中填充_JwtAuthenticationToken_**，这是JWT解码器的资源服务器的默认_Authentication_类型，**我们将使用_MockMvc_请求的_jwt_后处理器：**

```java
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
```

让我们看几个使用_MockMvc_的请求示例和对响应状态的断言，这取决于端点和模拟认证：

```java
@Test
void givenRequestIsAnonymous_whenGetGreet_thenUnauthorized() throws Exception {
    mockMvc.perform(get("/greet").with(SecurityMockMvcRequestPostProcessors.anonymous()))
      .andExpect(status().isUnauthorized());
}
```

在上面，我们确保匿名请求无法获得问候，并且正确返回了_401_。

现在让我们看看请求是如何根据端点的安全规则和分配给测试_JwtAuthenticationToken_的权限回答200 Ok或403 Forbidden：

```java
@Test
void givenUserIsGrantedWithRoleAuthorizedPersonnel_whenGetSecuredRoute_thenOk() throws Exception {
    var secret = "Secret!";
    when(messageService.getSecret()).thenReturn(secret);

    mockMvc.perform(get("/secured-route").with(SecurityMockMvcRequestPostProcessors.jwt()
      .authorities(new SimpleGrantedAuthority("ROLE_AUTHORIZED_PERSONNEL"))))
        .andExpect(status().isOk())
        .andExpect(content().string(secret));
}

@Test
void givenUserIsNotGrantedWithRoleAuthorizedPersonnel_whenGetSecuredRoute_thenForbidden() throws Exception {
    mockMvc.perform(get("/secured-route").with(SecurityMockMvcRequestProcessors.jwt()
.authorities(new SimpleGrantedAuthority("admin"))))
.andExpect(status().isForbidden());
```

### 4.4. 使用_WebTestClient_变异器进行单元测试

在响应式资源服务器中，安全上下文中的_Authentication_类型与servlet中的相同：_JwtAuthenticationToken_。因此，我们将使用_WebTestClient_的_mockJwt_变异器：

```java
import org.springframework.security.test.web.reactive.server.SecurityMockServerConfigurers;
```

与_MockMvc_后处理器不同，没有匿名_WebTestClient_变异器。然而，我们可以很容易地定义一个匿名_Authentication_实例，并使用通用的_mockAuthentication_变异器：

```java
private static final AnonymousAuthenticationToken ANONYMOUS = new AnonymousAuthenticationToken(
    "anonymous", "anonymousUser", AuthorityUtils.createAuthorityList("ROLE_ANONYMOUS"));

@Test
void givenRequestIsAnonymous_whenGetGreet_thenUnauthorized() throws Exception {
    webTestClient.mutateWith(SecurityMockServerConfigurers.mockAuthentication(ANONYMOUS))
        .get()
        .uri("/greet")
        .exchange()
        .expectStatus()
        .isUnauthorized();
}

@Test
void givenUserIsAuthenticated_whenGetGreet_thenOk() throws Exception {
    var greeting = "Whatever the service returns";
    when(messageService.greet()).thenReturn(Mono.just(greeting));

    webTestClient.mutateWith(SecurityMockServerConfigurers.mockJwt().authorities(List.of(
      new SimpleGrantedAuthority("admin"),
      new SimpleGrantedAuthority("ROLE_AUTHORIZED_PERSONNEL")))
        .jwt(jwt -> jwt.claim(StandardClaimNames.PREFERRED_USERNAME, "ch4mpy")))
        .get()
        .uri("/greet")
        .exchange()
        .expectStatus()
        .isOk()
        .expectBody(String.class)
        .isEqualTo(greeting);

    verify(messageService, times(1)).greet();
}

@Test
void givenUserIsNotGrantedWithRoleAuthorizedPersonnel_whenGetSecuredRoute_thenForbidden() throws Exception {
    webTestClient.mutateWith(mockJwt().authorities(new SimpleGrantedAuthority("admin")))
        .get()
        .uri("/secured-route")
        .exchange()
        .expectStatus()
        .isForbidden();
}
```

### 4.5. 使用_Spring-Addons_注解进行控制器单元测试

我们可以在servlet和响应式应用程序中以完全相同的方式使用测试注解。

我们所需要做的就是添加对_spring-addons-oauth2-test_的依赖：

```xml
`<dependency>`
    `<groupId>`com.c4-soft.springaddons`</groupId>`
    `<artifactId>`spring-addons-oauth2-test`</artifactId>`
    `<version>`7.6.12`</version>`
    `<scope>`test`</scope>`
`</dependency>`
```

这个库带有很多注解，涵盖了以下用例：

- _@WithMockAuthentication_在测试基于角色的访问控制时通常足够用：它旨在接受权限作为参数，但也接受用户名和模拟_Authentication_和_Principal_的实现类型。
- _@WithJwt_用于测试具有JWT解码器的资源服务器。它依赖于认证工厂，该工厂从安全配置中选择_Converter`<Jwt, ? extends AbstractAthenticationToken>`_（或响应式应用程序中的_Converter`<Jwt, ? extends Mono<? extends AbstractAuthenticationToken>`>_），以及测试类路径上的JSON有效载荷。这为您提供了对声明的完全控制，并提供了与运行时相同的JWT有效载荷相同的认证实例。
- _@WithOpaqueToken_的工作方式与_@WithJwt_相同，但适用于具有令牌内省的资源服务器：它依赖于选择_OpaqueTokenAuthenticationConverter_（或_ ReactiveOpaqueTokenAuthenticationConverter_）的工厂。
- _@WithOAuth2Login_和_@WithOidcLogin_将是我们测试OAuth2客户端登录时的选择

在进行测试之前，我们将定义一些JSON文件作为测试资源。它的目的是模拟代表性用户（角色或角色）的访问令牌的JSON有效载荷（或内省响应）。我们可以使用像https://jwt.io这样的工具复制真实令牌的负载。

Ch4mpy将是我们具有_AUTHORIZED_PERSONNEL_角色的测试用户：

```json
{
  "iss": "https://localhost:8443/realms/master",
  "sub": "281c4558-550c-413b-9972-2d2e5bde6b9b",
  "iat": 1695992542,
  "exp": 1695992642,
  "preferred_username": "ch4mpy",
  "realm_access": {
    "roles": [
      "admin",
      "ROLE_AUTHORIZED_PERSONNEL"
    ]
  },
  "email": "ch4mp@c4-soft.com",
  "scope": "openid email"
}
```

我们将定义第二个没有_AUTHORIZED_PERSONNEL_角色的用户：

```json
{
  "iss": "https://localhost:8443/realms/master",
  "sub": "2d2e5bde6b9b-550c-413b-9972-281c4558",
  "iat": 1695992551,
  "exp": 1695992651,
  "preferred_username": "tonton-pirate",
  "realm_access": {
    "roles": [
      "uncle",
      "skipper"
    ]
  },
  "email": "tonton-pirate@c4-soft.com",
  "scope": "openid email"
}
```

现在，我们可以将身份模拟从测试主体中移除，改为用注解装饰测试方法。为了演示目的，我们将使用_@WithMockAuthentication_和_@WithJwt_，但实际测试中一个就足够了。我们可能选择前者当我们只需要定义权限或名称时，选择后者当我们需要控制许多声明时：

```java
@Test
@WithAnonymousUser
void givenRequestIsAnonymous_whenGetSecuredMethod_thenUnauthorized() throws Exception {
    api.perform(get("/secured-method"))
        .andExpect(status().isUnauthorized());
}

@Test
@WithMockAuthentication({"admin", "ROLE_AUTHORIZED_PERSONNEL"})
void givenUserIsGrantedWithRoleAuthorizedPersonnel_whenGetSecuredMethod_thenOk() throws Exception {
    final var secret = "Secret!";
    when(messageService.getSecret()).thenReturn(secret);

    api.perform(get("/secured-method"))
        .andExpect(status().isOk())
        .andExpect(content().string(secret));
}

@Test
@WithMockAuthentication({"admin"})
void givenUserIsNotGrantedWithRoleAuthorizedPersonnel_whenGetSecuredMethod_thenForbidden() throws Exception {
    api.perform(get("/secured-method"))
        .andExpect(status().isForbidden());
}

@Test
@WithJwt("ch4mpy.json")
void givenUserIsCh4mpy_whenGetSecuredMethod_thenOk() throws Exception {
    final var secret = "Secret!";
    when(messageService.getSecret()).thenReturn(secret);

    api.perform(get("/secured-method"))
        .andExpect(status().isOk())
        .andExpect(content().string(secret));
}

@Test
@WithJwt("tonton-pirate.json")
void givenUserIsTontonPirate_whenGetSecuredMethod_thenForbidden() throws Exception {
    api.perform(get("/secured-method"))
        .andExpect(status().isForbidden());
}
```

**注解非常适合_BDD_范式：**

- 前提条件（_Given_）在文本上下文中（装饰测试的注解）
- 只有被测试的代码执行（_When_）和结果断言（_Then_）在测试主体中

### 4.6. 单元测试_@Service_或_@Repository_安全方法

当测试_Controller_时，选择请求_MockMvc_后处理器（或_WebTestClient_变异器）和注解大多取决于团队偏好，但是**要单元测试_MessageService::getSecret_访问控制，_spring-security-test_不再是一个选项**，我们将需要_spring-addons_注解。

这是servlet应用程序中@Service的完整单元测试的JUnit设置：

```java
@ExtendWith(SpringExtension.class)
@TestInstance(Lifecycle.PER_CLASS)
@Import({ MessageService.class, SecurityConf.class })
@ImportAutoConfiguration(AuthenticationFactoriesTestConf.class)
class MessageServiceUnitTest {
    @Autowired
    MessageService messageService;

    @MockBean
    JwtDecoder jwtDecoder;

    @Test
    void givenSecurityContextIsNotSet_whenGreet_thenThrowsAuthenticationCredentialsNotFoundException() {
        assertThrows(AuthenticationCredentialsNotFoundException.class, () -> messageService.getSecret());
    }

    @Test
    @WithAnonymousUser
    void givenUserIsAnonymous_whenGreet_thenThrowsAccessDeniedException() {
        assertThrows(AccessDeniedException.class, () -> messageService.getSecret());
    }

    @Test
    @WithJwt("ch4mpy.json")
    void givenUserIsCh4mpy_whenGreet_thenReturnGreetingWithPreferredUsernameAndAuthorities() {
        assertEquals("Hello ch4mpy! You are granted with [admin, ROLE_AUTHORIZED_PERSONNEL].",
          messageService.greet());
    }

    @Test
    @WithMockUser(authorities = { "admin", "ROLE_AUTHORIZED_PERSONNEL" }, username = "ch4mpy")
    void givenSecurityContextIsPopulatedWithUsernamePasswordAuthenticationToken_whenGreet_thenThrowsClassCastException() {
        assertThrows(ClassCastException.class, () -> messageService.getSecret());
    }
}
```