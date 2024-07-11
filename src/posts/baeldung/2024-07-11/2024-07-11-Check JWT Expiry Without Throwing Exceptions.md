---
date: 2022-04-01
category:
  - Java
  - JWT
tag:
  - Java
  - JWT
  - Expiry
head:
  - - meta
    - name: keywords
      content: Java, JWT, Expiry, Security
---
# Java中不抛出异常检查JWT过期

JSON Web Token（JWT）基本上是一个用于在网络上安全传输信息的JSON对象。这些信息可以被验证和信任，因为它是数字签名的。

在本教程中，我们首先将看看验证JWT和解码JWT之间的区别。然后，我们将学习如何在Java中不抛出任何异常地检查JWT的过期。

## 2. 验证和解码JWT之间的区别

在我们开始研究如何检查JWT的过期之前，让我们首先了解一些基础知识。

我们知道，JWT在其紧凑形式中是一个Base64编码的字符串，包含三个部分：头部、负载和签名。任何访问JWT的人都很容易解码它并查看其内容。因此，要信任一个令牌，我们必须验证JWT中包含的签名。

有各种Java JWT库可用于创建和管理JWT。我们将使用Auth0 JWT Java库作为我们的代码示例。这是一个易于使用的库，用于创建和管理JWT。

### 2.1. 依赖项

要开始，我们将Auth0 Java JWT库的Maven依赖项添加到我们的项目的_pom.xml_文件中：

```
`<dependency>`
    `<groupId>`com.auth0`</groupId>`
    `<artifactId>`java-jwt`</artifactId>`
    `<version>`4.2.1`</version>`
`</dependency>`
```

接下来，让我们了解解码和验证JWT之间的区别。

### 2.2. 解码JWT

我们可以通过简单地Base64解码JWT的各个部分来解码JWT。解码JWT返回未验证JWT签名的解码负载。这种操作不建议用于任何不受信任的消息，仅用于查看JWT内容。

**要解码JWT，我们使用_JWT.decode(String)_方法。**这个方法解析JWT并返回一个_DecodedJWT_实例。

_DecodedJWT_实例提供了我们可以用来获取JWT中包含的数据的各种便利方法。如果JWT不是有效的Base64编码字符串，该方法会抛出一个_JWTDecodeException_。

让我们看看解码JWT的代码：

```java
try {
    DecodedJWT decodedJWT = JWT.decode(jwtString);
    return decodedJWT;
} catch (JWTDecodeException e) {
    // ...
}
```

一旦我们获得了_DecodedJWT_实例，我们可以使用它的各种getter方法来获取解码后的数据。

例如，要获取令牌的过期时间，我们使用_DecodedJWT.getExpiresAt()_方法。这个方法返回一个包含令牌过期时间的_java.util.Date_实例：

```java
Date expiresAt = decodedJWT.getExpiresAt();
```

接下来，让我们看看JWT验证操作。

### 2.3. 验证JWT

验证JWT确保包含的签名是有效的。可选地，它还检查过期时间、非有效时间、发行者、受众或JWT中包含的任何其他声明（如果JWT包含任何）。

**要验证JWT，我们使用_JWTVerifier.verify(String)_方法**。验证操作在签名有效时也返回一个_DecodedJWT_实例。只有在签名和所有声明都有效时才返回解码的JWT。如果签名无效或任何声明验证失败，它会抛出一个_JWTVerificationException_。

让我们检查验证JWT的代码：

```java
try {
    DecodedJWT decodedJWT = verifier.verify(jwtString);
} catch (JWTVerificationException e) {
    // ...
}
```

从上面的代码片段中可以看出，如果JWT无效，_verify()_方法会抛出异常。由于该方法在验证后还对令牌进行解码，因此它提供了一种更安全、更安全的方式来解码令牌。另一方面，_decode()_方法只是简单地解码提供的JWT令牌。因此，**为了在不抛出任何异常的情况下验证令牌的过期时间，我们使用_JWT.decode()_方法**。

## 3. 检查JWT过期

要简单地读取JWT中包含的数据，我们可以解码JWT并解析数据。让我们看看Java代码，检查JWT是否已过期：

```java
boolean isJWTExpired(DecodedJWT decodedJWT) {
    Date expiresAt = decodedJWT.getExpiresAt();
    return expiresAt.before(new Date());
}
```

正如前面提到的，我们使用_DecodedJWT.getExpiresAt()_方法来获取JWT的过期时间。然后我们将过期时间与当前时间进行匹配，以检查令牌是否已过期。

**_JWT.decode()_方法和_JWTVerifier.verify()_方法都返回一个_DecodedJWT_实例**。唯一的区别是，_verify()_方法还检查签名的有效性，并在无效时返回异常。因此，**我们只能对可信消息使用_decode()_方法**。**对于任何不可信的消息，我们应该始终使用_verify()_方法，**这确保了有效的签名和JWT中的任何其他声明。

## 4. 结论

在本文中，我们首先查看了JWT解码和JWT验证操作之间的区别。

然后，我们查看了如何使用解码操作在不抛出任何异常的情况下检查JWT的过期。

如常，所有示例的完整代码可在GitHub上找到。