---
date: 2024-07-11
category:
  - Java
  - Security
tag:
  - Auth0
  - JWT
head:
  - - meta
    - name: keywords
      content: Java, JWT, Auth0, Security, Tutorial
---

# 使用Auth0 Java库管理JWT

## 1. 引言

JWT（JSON Web Token）是一种标准，定义了一种紧凑且安全的方式，在两个参与方之间传输数据以及签名。JWT中的负载是一个JSON对象，它声明了一些声明。由于这些声明是数字签名的，因此可以被验证者轻松验证和信任。**JWT可以使用密钥或公钥/私钥对进行签名。**

在本教程中，我们将学习如何使用Auth0 JWT Java库创建和解码JWT。

## 2. JWT的结构

JWT基本上由三部分组成：

- 头部
- 负载
- 签名

这些部分各自代表一个Base64编码的字符串，由点（'.'）作为分隔符连接。

JWT头部通常由两部分组成：令牌类型，即"JWT"，以及用于签名JWT的签名算法。

Auth0 Java JWT库提供了各种算法实现来签名JWT，如HMAC、RSA和ECDSA。

让我们看看一个JWT头部的示例：

```
{
  "alg": "HS256",
  "typ": "JWT"
}
```

上述头部对象随后被Base64编码，形成JWT的第一部分。

### 2.2 JWT负载

JWT负载包含一组声明。声明基本上是关于实体的一些陈述以及一些附加数据。

有三种类型的声明：

- 注册的 – 这是一组有用的预定义声明，推荐使用但不是强制性的。这些声明名称只有三个字符长，以保持JWT紧凑。一些注册声明包括_iss_（发行者）、_exp_（过期时间）和_sub_（主题）等。
- 公共的 – 这些可以由使用JWT的人任意定义。
- 私有的 – 我们可以使用这些声明来创建自定义声明。

让我们看看一个JWT负载的示例：

```
{
  "sub": "Baeldung Details",
  "nbf": 1669463994,
  "iss": "Baeldung",
  "exp": 1669463998,
  "userId": "1234",
  "iat": 1669463993,
  "jti": "b44bd6c6-f128-4415-8458-6d8b4bc98e4a"
}
```

在这里，我们可以看到负载包含了一个私有声明_userId_，表示登录用户ID。此外，我们还可以找到一些有用的受限声明，它们定义了关于JWT的额外细节。

JWT负载随后被Base64编码，形成JWT的第二部分。

### 2.3 JWT签名

最后，**JWT签名是在我们使用签名算法和密钥对编码的头部和编码的负载进行签名时生成的**。然后可以使用签名来验证JWT中的数据是否有效。

需要注意的是，**任何拥有JWT的人都能够轻松解码并查看其内容**。签名令牌可以验证其中包含的声明的完整性。如果令牌使用公钥/私钥对签名，签名还证明只有持有私钥的一方才是签名者。

最后，将所有三部分结合起来，我们得到了JWT：

```
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJCYWVsZHVuZyBEZXRhaWxzIiwibmJmIjoxNjY5NDYzOTk0LCJpc3MiOiJCYWVsZHVuZyIsImV4cCI6MTY2OTQ2Mzk5OCwidXNlcklkIjoiMTIzNCIsImlhdCI6MTY2OTQ2Mzk5MywianRpIjoiYjQ0YmQ2YzYtZjEyOC00NDE1LTg0NTgtNmQ4YjRiYzk4ZTRhIn0.14jm1FVPXFDJCUBARDTQkUErMmUTqdt5uMTGW6hDuV0
```

接下来，让我们看看如何使用Auth0 Java JWT库创建和管理JWT。

## 3. 使用Auth0

Auth0提供了一个易于使用的Java库，用于创建和管理JWT。

### 3.1. 依赖项

要开始使用，我们将Auth0 Java JWT库的Maven依赖项添加到我们的项目_pom.xml_文件中：

```
`<dependency>`
    `<groupId>`com.auth0`</groupId>`
    `<artifactId>`java-jwt`</artifactId>`
    `<version>`4.2.1`</version>`
`</dependency>`
```

### 3.2. 配置算法和验证器

我们首先创建一个_Algorithm_类的实例。在本教程中，我们将使用HMAC256算法来签名我们的JWT：

```
Algorithm algorithm = Algorithm.HMAC256("baeldung");
```

在这里，我们使用密钥初始化了一个_Algorithm_的实例。我们将在创建和验证令牌时使用这个实例。

进一步，让我们初始化一个我们将用于验证创建的令牌的_JWTVerifier_实例：

```
JWTVerifier verifier = JWT.require(algorithm)
  .withIssuer("Baeldung")
  .build();
```

**要初始化验证器，我们使用_JWT.require(Algorithm)_方法**。这个方法返回一个_Verification_的实例，然后我们可以使用它来构建一个_JWTVerifier_的实例。

现在我们准备好创建我们的JWT了。

### 3.3. 创建JWT

**要创建JWT，我们使用_JWT.create()_方法**。该方法返回一个_JWTCreator.Builder_类的实例。我们将使用这个_Builder_类通过使用_Algorithm_实例签名声明来构建JWT令牌：

```
String jwtToken = JWT.create()
  .withIssuer("Baeldung")
  .withSubject("Baeldung Details")
  .withClaim("userId", "1234")
  .withIssuedAt(new Date())
  .withExpiresAt(new Date(System.currentTimeMillis() + 5000L))
  .withJWTId(UUID.randomUUID()
    .toString())
  .withNotBefore(new Date(System.currentTimeMillis() + 1000L))
  .sign(algorithm);
```

上述代码片段返回一个JWT：

```
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJCYWVsZHVuZyBEZXRhaWxzIiwibmJmIjoxNjY5NDYzOTk0LCJpc3MiOiJCYWVsZHVuZyIsImV4cCI6MTY2OTQ2Mzk5OCwidXNlcklkIjoiMTIzNCIsImlhdCI6MTY2OTQ2Mzk5MywianRpIjoiYjQ0YmQ2YzYtZjEyOC00NDE1LTg0NTgtNmQ4YjRiYzk4ZTRhIn0.14jm1FVPXFDJCUBARDTQkUErMmUTqdt5uMTGW6hDuV0
```

让我们讨论一下上面使用的_JWTCreator.Builder_类方法来设置一些声明：

- _withIssuer()_ – 标识创建并签名令牌的一方
- _withSubject()_ – 标识JWT的主题
- _withIssuedAt()_ – 标识JWT创建的时间；我们可以使用它来确定JWT的年龄
- _withExpiresAt()_ – 标识JWT的过期时间
- _withJWTId()_ – JWT的唯一标识符
- _withNotBefore()_ – 标识JWT不应在该时间之前被接受处理的时间
- _withClaim()_ – 用于设置任何自定义声明

### 3.4. 验证JWT

进一步地，**要验证JWT，我们使用我们之前初始化的_JWTVerifier_的_JWTVerifier.verify(String)_方法**。如果JWT有效，该方法解析JWT并返回一个_DecodedJWT_的实例。

_DecodedJWT_实例提供了我们可以使用的各种便捷方法来获取JWT中包含的声明。如果JWT无效，该方法将抛出一个_JWTVerificationException_。

让我们解码我们之前创建的JWT：

```
try {
    DecodedJWT decodedJWT = verifier.verify(jwtToken);
} catch (JWTVerificationException e) {
    System.out.println(e.getMessage());
}
```

一旦我们获得了_DecodedJWT_实例，我们可以使用它的各种getter方法来获取声明。

例如，要获取自定义声明，我们使用_DecodedJWT.getClaim(String)_方法。这个方法返回一个_Claim_的实例：

```
Claim claim = decodedJWT.getClaim("userId");
```

在这里，我们获取了我们之前在创建JWT时设置的自定义声明_userId_。我们现在可以通过