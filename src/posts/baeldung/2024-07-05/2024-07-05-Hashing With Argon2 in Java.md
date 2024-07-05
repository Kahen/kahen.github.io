---
date: 2022-04-01
category:
  - Java
  - Security
tag:
  - Argon2
  - Hashing
  - Java
head:
  - - meta
    - name: keywords
      content: Java, Security, Argon2, Hashing
---
# Java中使用Argon2进行哈希处理

在构建涉及用户认证的Web应用程序时，保护用户免受黑客攻击非常重要。大多数Web应用程序设计为不存储明文密码，而是存储密码的哈希值。哈希和盐值是增强存储在数据库中的密码安全性的两种技术。

在本教程中，我们将学习哈希和盐值技术，以及如何在Java中使用Argon2进行哈希处理。

## 2. 密码哈希和盐值
密码哈希和盐值是两种可以增强存储在数据库中的密码安全性的技术。哈希算法涉及一种数学运算，可以将密码转换为一串随机字符。

然而，黑客可以通过比较常见密码的哈希值来猜测密码。为了防止这种情况，密码盐值就派上用场了。

密码盐值是在应用哈希算法之前，向密码添加一个称为盐值的随机数据片段的方法。盐值确保哈希值是独特的，即使两个用户有相同的密码，他们的哈希值也会不同。

此外，哈希算法是单向的，这意味着哈希值不能像加密那样转换回明文。这增加了另一层安全性和保护。

## 3. 什么是Argon2？
Argon2是一种基于密码的密钥派生函数。它是一种设计有许多可调整参数的安全密码哈希函数。此外，Argon2是一种内存密集型函数，意味着它需要大量的内存来计算，并且在内存有限的硬件上难以实现。

此外，它允许应用程序根据其安全需求自定义算法。这对于具有不同安全需求的应用程序至关重要。

另外，由于Argon2提供高安全性，它推荐用于需要强大密码保护的应用程序。它抵抗来自GPU和其他专用硬件的攻击。

Argon2的一个优势是，我们可以根据不同的需要进行配置。我们可以设置迭代次数。这是密码将被哈希的次数。更高的迭代次数将需要更多的时间来哈希密码，但会使密码更安全。

此外，我们可以设置内存成本。这是Argon2将使用的内存量。更高的内存成本将使密码更安全，但会消耗更多的系统内存。

另外，我们还可以设置并行成本。这是Argon2算法将使用的线程数量。更高的并行成本将加速密码哈希过程，但会降低密码安全性。

在以下小节中，我们将使用Spring Security Crypto库和Bouncy Castle库实现Argon2哈希。

### 4.1 使用Spring Security Crypto实现Argon2哈希
Spring Security Crypto库有一个类，可以使用Argon2对密码进行哈希处理。它内部依赖于Bouncy Castle库。

让我们使用Spring Security Crypto库来哈希一个密码。首先，我们需要将其依赖项添加到_pom.xml_：

```xml
``<dependency>``
    ``<groupId>``org.springframework.security``</groupId>``
    ``<artifactId>``spring-security-crypto``</artifactId>``
    ``<version>``6.0.3``</version>``
``</dependency>``
```

接下来，让我们看看一个单元测试，它基于Argon2哈希一个密码：

```java
@Test
public void givenRawPassword_whenEncodedWithArgon2_thenMatchesEncodedPassword() {
    String rawPassword = "Baeldung";
    Argon2PasswordEncoder arg2SpringSecurity = new Argon2PasswordEncoder(16, 32, 1, 60000, 10);
    String springBouncyHash = arg2SpringSecurity.encode(rawPassword);

    assertTrue(arg2SpringSecurity.matches(rawPassword, springBouncyHash));
}
```

在上面的示例中，我们声明一个变量来存储原始密码“_Baeldung_”。接下来，我们使用五个参数创建_Argon2PasswordEncoder_的实例。我们将迭代次数设置为十次，并将哈希长度设置为32字节。默认哈希长度为64字节。此外，我们将内存成本设置为_60000_千字节，将并行因子设置为一个线程，将时间成本设置为_16_次迭代。

最后，我们验证原始密码与哈希密码是否匹配。

### 4.2 使用Bouncy Castle实现Argon2哈希
与Spring Security Crypto库相比，Bouncy Castle库的实现更为底层。要使用Bouncy Castle库，我们需要将其依赖项添加到_pom.xml_：

```xml
``<dependency>``
    ``<groupId>``org.bouncycastle``</groupId>``
    ``<artifactId>``bcpkix-jdk18on``</artifactId>``
    ``<version>``1.76``</version>``
``</dependency>``
```

让我们看一个使用Bouncy Castle库实现哈希的示例。

首先，让我们创建一个方法为我们生成一个随机盐：

```java
private byte[] generateSalt16Byte() {
    SecureRandom secureRandom = new SecureRandom();
    byte[] salt = new byte[16];
    secureRandom.nextBytes(salt);

    return salt;
}
```

在上面的示例代码中，我们创建了一个_SecureRandom_对象，这是一个提供密码学强随机数生成器的类。接下来，我们创建一个大小为_16_的_byte_数组来存储16字节的数据。然后，我们调用_secureRandom_上的_nextBytes()_方法来生成盐。

最后，让我们哈希密码“_Baeldung_”：

```java
@Test
public void givenRawPasswordAndSalt_whenArgon2AlgorithmIsUsed_thenHashIsCorrect() {
    byte[] salt = generateSalt16Byte();
    String password = "Baeldung";

    int iterations = 2;
    int memLimit = 66536;
    int hashLength = 32;
    int parallelism = 1;

    Argon2Parameters.Builder builder = new Argon2Parameters.Builder(Argon2Parameters.ARGON2_id)
      .withVersion(Argon2Parameters.ARGON2_VERSION_13)
      .withIterations(iterations)
      .withMemoryAsKB(memLimit)
      .withParallelism(parallelism)
      .withSalt(salt);

    Argon2BytesGenerator generate = new Argon2BytesGenerator();
    generate.init(builder.build());
    byte[] result = new byte[hashLength];
    generate.generateBytes(password.getBytes(StandardCharsets.UTF_8), result, 0, result.length);

    Argon2BytesGenerator verifier = new Argon2BytesGenerator();
    verifier.init(builder.build());
    byte[] testHash = new byte[hashLength];
    verifier.generateBytes(password.getBytes(StandardCharsets.UTF_8), testHash, 0, testHash.length);

    assertTrue(Arrays.equals(result, testHash));
}
```

在上面的示例中，我们使用_generateSalt16Byte()_方法创建了一个随机的16字节盐。接下来，我们为算法定义了必要的参数，如迭代次数、内存限制、哈希长度、并行因子和盐。

然后，我们创建了一个_Argon2BytesGenerator_对象。这个对象帮助生成密码哈希。我们还定义了一个_byte_数组来存储生成的哈希结果。

最后，我们创建了另一个_Argon2BytesGenerator_实例来将结果与测试哈希进行比较。这断言密码哈希是正确的，并且可以通过Argon2算法进行验证。

## 5. 结论
在本文中，我们学习了密码哈希和盐值的基础知识。此外，我们深入研究了Argon2算法，并看到了使用Spring Security Crypto和Bouncy Castle的实现。Spring Security Crypto看起来更简单，因为它抽象了一些过程。

如常，示例的完整源代码可在GitHub上找到。