---
date: 2024-06-21
category:
  - Spring Security
  - Spring Boot
tag:
  - 迁移
  - 安全
head:
  - - meta
    - name: keywords
      content: Spring Security 5, Spring Security 6, Spring Boot 3, 迁移指南
---
# 将应用程序从Spring Security 5迁移到Spring Security 6/Spring Boot 3 | Baeldung

Spring Security 6带来了几个重大变化，包括移除类、弃用方法以及引入新方法。

从Spring Security 5迁移到Spring Security 6可以逐步进行，不会破坏现有的代码库。此外，我们可以使用第三方插件如OpenRewrite来促进迁移到最新版本。

在本教程中，我们将学习如何将使用Spring Security 5的现有应用程序迁移到Spring Security 6。我们将替换弃用的方法，并利用lambda DSL简化配置。此外，我们将利用OpenRewrite使迁移更快。

Spring Boot基于Spring框架，Spring Boot的版本使用Spring框架的最新版本。Spring Boot 2默认使用Spring Security 5，而Spring Boot 3使用Spring Security 6。

要在Spring Boot应用程序中使用Spring Security，我们总是向pom.xml添加spring-boot-starter-security依赖。

**然而，我们可以通过在pom.xml的properties部分指定所需的版本来覆盖默认的Spring Security版本**：

```
`<properties>`
    `<spring-security.version>`5.8.9`</spring-security.version>`
`</properties>`
```

这里，我们指定我们的项目使用Spring Security 5.8.9，覆盖了默认版本。

值得注意的是，我们也可以通过在properties部分覆盖默认版本，在Spring Boot 2中使用Spring Security 6。

Spring Security 6引入了几个功能更新，以提高安全性和健壮性。它现在至少需要Java版本17，并使用jakarta命名空间。

**一个主要的变化是移除了WebSecurityConfigurerAdapter，转而采用基于组件的安全配置**。

此外，authorizeRequests()被移除并被authorizeHttpRequests()取代，以定义授权规则。

**此外，它引入了requestMatcher()和securityMatcher()方法来替换antMatcher()和mvcMatcher()，用于配置请求资源的安全**。requestMatcher()方法更安全，因为它为请求配置选择了适当的RequestMatcher实现。

其他弃用的方法如cors()和csrf()现在有了功能性风格的替代品。

要开始，让我们通过向pom.xml添加spring-boot-starter-web和spring-boot-starter-security来启动一个Spring Boot 2.7.5项目：

```
````<dependency>````
    ````<groupId>````org.springframework.boot````</groupId>````
    ````<artifactId>````spring-boot-starter-web````</artifactId>````
    ````<version>````2.7.5````</version>````
````</dependency>````

````<dependency>````
    ````<groupId>````org.springframework.boot````</groupId>````
    ````<artifactId>````spring-boot-starter-security````</artifactId>````
    ````<version>````2.7.5````</version>````
````</dependency>````
```

spring-boot-starter-security依赖使用Spring Security 5。

接下来，让我们创建一个名为WebSecurityConfig的类：

```
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
class WebSecurityConfig extends WebSecurityConfigurerAdapter {
}
```

在这里，我们用@EnableWebSecurity注解类以启动配置web请求安全的进程。我们还启用了方法级别的授权。接下来，类扩展了WebSecurityConfigurerAdapter类以提供各种安全配置方法。

此外，让我们通过覆盖默认配置来定义一个内存中的用户进行身份验证：

```
@Override
void configure(AuthenticationManagerBuilder auth) throws Exception {
    UserDetails user = User.withDefaultPasswordEncoder()
      .username("Admin")
      .password("password")
      .roles("ADMIN")
      .build();
    auth.inMemoryAuthentication().withUser(user);
}
```

在上面的方法中，我们通过覆盖默认配置创建了一个内存中的用户。

继续，让我们通过覆盖configure(WebSecurity web)方法从安全中排除静态资源：

```
@Override
void configure(WebSecurity web) {
    web.ignoring().antMatchers("/js/**", "/css/**");
}
```

最后，让我们通过覆盖configure(HttpSecurity http)方法来创建HttpSecurity：

```
@Override
void configure(HttpSecurity http) throws Exception {
    http
      .authorizeRequests()
      .antMatchers("/").permitAll()
      .anyRequest().authenticated()
      .and()
      .formLogin()
      .and()
      .httpBasic();
}
```

值得注意的是，此设置展示了典型的Spring Security 5配置。在接下来的部分中，我们将将此代码迁移到Spring Security 6。

Spring推荐逐步迁移方法，以防止在更新到Spring Security 6时破坏现有代码。**在升级到Spring Security 6之前，我们可以先升级我们的Spring Boot应用程序到Spring Security 5.8.5并更新代码以使用新功能**。迁移到5.8.5为我们准备版本6中的预期变化。

在逐步迁移过程中，我们的IDE可以警告我们弃用的功能。这有助于逐步更新过程。

为了简单起见，让我们直接将示例项目迁移到Spring Security 6，通过更新应用程序使用Spring Boot版本3.2.2。在应用程序使用Spring Boot版本2的情况下，我们可以在properties部分指定Spring Security 6。

要开始迁移过程，让我们修改pom.xml以使用最新的Spring Boot版本：

```
````<dependency>````
    ````<groupId>````org.springframework.boot````</groupId>````
    ````<artifactId>````spring-boot-starter-web````</artifactId>````
    ````<version>````3.2.2````</version>````
````</dependency>````

````<dependency>````
    ````<groupId>````org.springframework.boot````</groupId>````
    ````<artifactId>````spring-boot-starter-security````</artifactId>````
    ````<version>````3.2.2````</version>````
````</dependency>````
```

在最初的设置中，我们使用Spring Boot 2.7.5，它在幕后使用Spring Security 5。

值得注意的是，Spring Boot 3的最低Java版本是Java 17。

在随后的小节中，我们将重构现有代码以使用Spring Security 6。

### 5.1. @Configuration注解

在Spring Security 6之前，@Configuration注解是@EnableWebSecurity的一部分，但随着最新更新，我们必须用@Configuration注解我们的安全配置：

```
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
}
```

**这里，我们向现有代码库引入了@Configuration注解，因为它不再是@EnableWebSecurity注解的一部分**。此外，该注解也不再是@EnableMethodSecurity、@EnableWebFluxSecurity或@EnableGlobalMethodSecurity注解的一部分。

**另外，@EnableGlobalMethodSecurity被标记为弃用，并被@EnableMethodSecurity取代**。默认情况下，它启用了Spring的预后注解。因此，我们引入了@EnableMethodSecurity以在方法级别提供授权。

### 5.2. WebSecurityConfigurerAdapter

最新更新移除了WebSecurityConfigurerAdapter类，并采用了基于组件的配置：

```
@Configuration
@EnableWebSecurity
public class WebSecurityConfig {
}
```

在这里，我们移除了WebSecurityConfigurerAdapter，这消除了覆盖安全配置方法的需求。**相反，我们可以为安全配置注册一个bean**。我们可以注册WebSecurityCustomizer bean来配置web安全，注册SecurityFilterChain bean来配置HTTP安全，注册InMemoryUserDetails bean来注册自定义用户等。

### 5.3. WebSecurityCustomizer Bean

让我们通过发布WebSecurityCustomizer bean来修改排除静态资源的方法：

```
@Bean
WebSecurityCustomizer webSecurityCustomizer() {
   return (web) -> web.ignoring().requestMatchers("/js/**", "/css/**");
}
```

WebSecurityCustomizer接口取代了WebSecurityConfigurerAdapter接口中的configure(Websecurity web)。

### 5.4. AuthenticationManager Bean

在早期部分中，我们通过覆盖WebSecurityConfigurerAdapter中的configure(AuthenticationManagerBuilder auth)来创建内存中的用户。

让我们通过注册InMemoryUserDetailsManager bean来重构认证凭据逻辑：

```
@Bean
InMemoryUserDetailsManager userDetailsService() {
    UserDetails user = User.withDefaultPasswordEncoder()
      .username("Admin")
      .password("admin")
      .roles("USER")
      .build();

    return new InMemoryUserDetailsManager(user);
}
```

在这里，我们定义了一个具有USER角色的内存中的用户，以提供基于角色的授权。

### 5.5. HTTP安全配置

在以前的Spring Security版本中，我们通过覆盖WebSecurityConfigurer类中的configure方法来配置HttpSecurity。由于在最新版本中被移除，让我们为HTTP安全配置注册SecurityFilterChain bean：

```
@Bean
SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
      .authorizeHttpRequests(
          request ->
            request
              .requestMatchers("/").permitAll()
              .anyRequest().authenticated()
      )
      .formLogin(Customizer.withDefaults())
      .httpBasic(Customizer.withDefaults());
   return http.build();
}
```

在上面的代码中，我们用authorizeHttpRequests()替换了authorizeRequest()方法。新方法使用了AuthorizationManager API，这简化了重用和定制。

此外，它通过延迟认证查找来提高性能。只有当请求需要授权时，才会进行认证查找。

当我们没有自定义规则时，我们使用Customizer.withDefaults()方法使用默认配置。

此外，我们使用requestMatchers()而不是antMatcher()或mvcMatcher()来保护资源。

### 5.6. RequestCache

请求缓存有助于在用户需要认证并重定向用户到请求时保存