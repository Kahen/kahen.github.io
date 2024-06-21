---
date: 2024-06-21
category:
  - Spring Security
  - JWT
tag:
  - Spring
  - Security
  - JWT
  - Token
head:
  - - meta
    - name: keywords
      content: Spring Security, JWT, Token Signing, Authentication
---
# 创建用于签名JWT令牌的Spring Security密钥

如果您正在使用Spring Security（尤其是OAuth）实现，一定要查看《学习Spring安全》课程。

## 1. 概述

JSON Web Tokens（JWT）是保护无状态应用程序的事实标准。Spring Security框架提供了将JWT集成以保护REST API的方法。生成令牌的一个关键过程是应用签名以保证真实性。

在本教程中，我们将探索一个使用JWT认证的无状态Spring Boot应用程序。我们将设置必要的组件并创建一个加密的_SecretKey_实例来签名和验证JWT。

## 2. 项目设置

首先，让我们使用Spring Security和JWT令牌来引导一个无状态的Spring Boot应用程序。**值得注意的是，为了简单和简洁，我们不会展示完整的设置代码。**

### 2.1. Maven依赖

首先，让我们在_pom.xml_中添加_spring-boot-starter-web_, _spring-boot-starter-security_, _spring-boot-starter-data-jpa_, 和_h2_数据库依赖：

```xml
```````<dependency>```````
    ```````<groupId>```````org.springframework.boot```````</groupId>```````
    ```````<artifactId>```````spring-boot-starter-web```````</artifactId>```````
    ```````<version>```````3.2.3```````</version>```````
```````</dependency>```````
```````<dependency>```````
    ```````<groupId>```````org.springframework.boot```````</groupId>```````
    ```````<artifactId>```````spring-boot-starter-security```````</artifactId>```````
    ```````<version>```````3.2.3```````</version>```````
```````</dependency>```````
```````<dependency>```````
    ```````<groupId>```````org.springframework.boot```````</groupId>```````
    ```````<artifactId>```````spring-boot-starter-data-jpa```````</artifactId>```````
    ```````<version>```````3.2.3```````</version>```````
```````</dependency>```````
```````<dependency>```````
    ```````<groupId>```````com.h2database```````</groupId>```````
    ```````<artifactId>```````h2```````</artifactId>```````
    ```````<version>```````2.2.224```````</version>```````
```````</dependency>```````
```

Spring Boot Starter Web提供了构建REST API的API。此外，Spring Boot Starter Security依赖有助于提供认证和授权。我们添加了一个内存数据库，以便快速原型设计。

接下来，让我们在_pom.xml_中添加_jjwt-api_, _jjwt-impl_ 和 _jjwt-jackson_依赖：

```xml
```````<dependency>```````
    ```````<groupId>```````io.jsonwebtoken```````</groupId>```````
    ```````<artifactId>```````jjwt-api```````</artifactId>```````
    ```````<version>```````0.12.5```````</version>```````
```````</dependency>```````
```````<dependency>```````
    ```````<groupId>```````io.jsonwebtoken```````</groupId>```````
    ```````<artifactId>```````jjwt-impl```````</artifactId>```````
    ```````<version>```````0.12.5```````</version>```````
```````</dependency>```````
```````<dependency>```````
    ```````<groupId>```````io.jsonwebtoken```````</groupId>```````
    ```````<artifactId>```````jjwt-jackson```````</artifactId>```````
    ```````<version>```````0.12.5```````</version>```````
```````</dependency>```````
```

这些依赖提供了生成和签名JWT的API，并将其集成到Spring Security中。

### 2.2. JWT配置

首先，让我们创建一个认证入口点：

```java
@Component
class AuthEntryPointJwt implements AuthenticationEntryPoint {
    // ...
}
```

在这里，我们创建了一个类来处理使用JWT认证的Spring Security应用程序中的授权访问尝试。它充当守门人，确保只有具有有效访问权限的用户才能访问受保护的资源。

然后，让我们创建一个名为_AuthTokenFilter_的类，该类拦截传入的请求，验证JWT令牌，并在存在有效令牌时对用户进行身份验证：

```java
class AuthTokenFilter extends OncePerRequestFilter {
    // ...
}
```

最后，让我们创建_JwtUtil_类，它提供创建和验证令牌的方法：

```java
@Component
class JwtUtils {
    // ...
}
```

这个类包含了使用_signWith()_方法的逻辑。

### 2.3. 安全配置

最后，让我们定义_SecurityConfiguration_类并集成JWT：

```java
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
class SecurityConfiguration {
    // ...

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable)
          .cors(AbstractHttpConfigurer::disable)
          .authorizeHttpRequests(req -> req.requestMatchers(WHITE_LIST_URL)
            .permitAll()
            .anyRequest()
            .authenticated())
          .exceptionHandling(ex -> ex.authenticationEntryPoint(unauthorizedHandler))
          .sessionManagement(session -> session.sessionCreationPolicy(STATELESS))
          .authenticationProvider(authenticationProvider())
          .addFilterBefore(
              authenticationJwtTokenFilter(),
              UsernamePasswordAuthenticationFilter.class
          );

        return http.build();
    }

    // ...
}
```

在上面的代码中，我们集成了JWT入口点和过滤器以激活JWT认证。

## 3. _signWith()_方法

**JJWT库提供了一个_signWith()_方法，帮助使用特定的加密算法和密钥对JWT进行签名。** 这个签名过程对于确保JWT的完整性和真实性至关重要。

_signWith()_方法接受_Key_或_SecretKey_实例和签名算法作为参数。**基于哈希的消息认证码（HMAC）算法是最常用的签名算法之一。**

重要的是，该方法需要一个密钥，通常是一个字节数组，用于签名过程。我们可以使用_Key_或_SecretKey_实例将密钥字符串转换为密钥。

**值得注意的是，我们可以将一个普通字符串作为密钥。然而，这缺乏加密_Key_或_SecretKey_实例的安全性和随机性。**

使用_SecretKey_实例确保了JWT的完整性和真实性。

我们可以使用_Key_和_SecretKey_实例创建一个强大的密钥来签名JWT。

### 4.1. 使用_Key_实例

本质上，我们可以将密钥字符串转换为_Key_实例，然后使用它来进一步加密它，然后再用它来签名JWT。

首先，让我们确保密钥字符串是Base64编码的：

```java
private String jwtSecret = "4261656C64756E67";
```

接下来，让我们创建一个_Key_对象：

```java
private Key getSigningKey() {
    byte[] keyBytes = Decoders.BASE64.decode(this.jwtSecret);
    return Keys.hmacShaKeyFor(keyBytes);
}
```

在上面的代码中，我们将_jwtSecret_解码为一个字节数组。接下来，我们调用接受_keyBytes_作为参数的_hmacShaKeyFor()_，它在_Keys_实例上生成一个基于HMAC算法的密钥。

如果密钥不是Base64编码的，我们可以在普通字符串上调用_getByte()_方法：

```java
private Key getSigningKey() {
    byte[] keyBytes = this.jwtSecret.getBytes(StandardCharsets.UTF_8);
    return Keys.hmacShaKeyFor(keyBytes);
}
```

然而，这是不推荐的，因为密钥可能格式不良，字符串可能包含非UTF-8字符。因此，我们必须确保在从它生成密钥之前，密钥字符串是Base64编码的。

### 4.2. 使用_SecretKey_实例

同样，我们可以使用HMAC-SHA算法创建一个_SecretKey_实例来形成一个强大的密钥。让我们创建一个返回密钥的_SecretKey_实例：

```java
SecretKey getSigningKey() {
    return Jwts.SIG.HS256.key().build();
}
```

在这里，我们直接使用HMAC-SHA算法而不使用字节数组。这形成了一个强大的签名密钥。接下来，我们可以通过将_getSigningKey()_作为参数来更新_signWith()_方法。

或者，我们可以从一个Base16编码的字符串创建一个_SecretKey_实例：

```java
SecretKey getSigningKey() {
    byte[] keyBytes = Decoders.BASE64.decode(jwtSecret);
    return Keys.hmacShaKeyFor(keyBytes);
}
```

这生成了一个强大的_SecretKey_类型来签名和验证JWT。

**值得注意的是，使用_SecretKey_实例而不是_Key_实例是可取的，因为新的名为_verifyWith()_的方法来验证令牌接受_SecretKey_类型作为参数。**

### 4.3. 应用密钥

现在，让我们将密钥应用于签名我们应用程序的JWT：

```java
String generateJwtToken(Authentication authentication) {
    UserDetailsImpl userPrincipal = (UserDetailsImpl) authentication.getPrincipal();

    return Jwts.builder()
      .subject((userPrincipal.getUsername()))
      .issuedAt(new Date())
      .expiration(new Date((new Date()).getTime() + jwtExpirationMs))
      .signWith(key)
      .compact();
}
```

_signWith()_方法以_SecretKey_实例作为参数，为令牌附加一个独特的签名。

## 5. 结论

在本文中，我们学习了如何使用Java Key和SecretKey实例创建密钥。我们还看到了一个使用JWT令牌进行令牌完整性的无状态Spring Boot应用程序，并应用了_Key_或_SecretKey_实例来签名和验证它。使用普通字符串已不再推荐。

一如既往，示例代码的完整源代码可在GitHub上获得。