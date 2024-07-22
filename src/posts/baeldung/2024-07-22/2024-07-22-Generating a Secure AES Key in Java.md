---
date: 2022-01-01
category:
  - Java
  - Security
tag:
  - AES
  - Key Generation
  - Encryption
head:
  - - meta
    - name: keywords
      content: Java, AES, Key Generation, Encryption, Security
---
# 在Java中生成安全的AES密钥

在这篇文章中，我们将深入探讨AES或一般密码算法中密钥的目的。我们将回顾生成密钥时需要记住的最佳实践，并最终探讨生成密钥的各种方法，并根据指南对它们进行权衡。

高级加密标准（AES）是数据加密标准（DES）的后继者，由国家标准与技术研究院（NIST）在2001年发布。它被归类为对称块密码算法。

对称密码算法使用相同的密钥进行加密和解密。块密码意味着它处理128位的输入明文块：

### 2.1 AES变体

**基于密钥大小，AES支持三种变体：AES-128（128位）、AES-192（192位）和AES-256（256位）。**增加密钥大小会增加加密的强度，因为更大的密钥大小意味着可能的密钥数量更多。因此，在算法执行期间要执行的轮数也会增加，从而增加了所需的计算量：

| 密钥大小 | 块大小 | 轮数 |
| --- | --- | --- |
| 128 | 128 | 10 |
| 192 | 128 | 12 |
| 256 | 128 | 14 |

### 2.2 AES有多安全？

AES算法是公开信息——密钥是秘密，必须知道它才能成功解密。因此，归结为破解AES密钥。

让我们看看暴力破解方法在猜测密钥方面的表现。

**AES-128密钥是128位，这意味着有** **2^128个可能的值**。要搜索这个数量级，需要花费巨大且不可行的时间和金钱。因此，AES实际上无法通过暴力破解方法破解。

有一些非暴力破解方法，但这些只能将可能的密钥查找空间减少几个比特。

所有这些都意味着，**如果对密钥一无所知，AES实际上是不可能被破解的**。

## 3. 好密钥的属性

现在，让我们看看生成AES密钥时需要遵循的一些重要指南。

### 3.1 密钥大小

由于AES支持三种密钥大小，我们应该为用例选择正确的密钥大小。AES-128是商业应用中最常见的选择。它在安全性和速度之间提供了平衡。国家政府通常使用AES-192和AES-256以获得最大安全性。如果我们想要额外的安全级别，可以使用AES-256。

量子计算机可能会威胁到减少大密钥空间所需的计算量。因此，拥有AES-256密钥将更具未来性，尽管到目前为止，它们还没有对任何商业应用的威胁者构成威胁。

### 3.2 熵

熵指的是密钥中的随机性。如果生成的密钥不够随机，并且与时间依赖、机器依赖或字典中的单词等有某种相关性，那么它就会变得脆弱。攻击者将能够缩小密钥搜索空间，削弱AES的强度。因此，**密钥必须是真正随机的**。

## 4. 生成AES密钥

现在，我们有了生成AES密钥的指南，让我们看看生成它们的方法。

对于所有代码片段，我们定义我们的密码算法为：

```java
private static final String CIPHER = "AES";
```

### 4.1 随机

让我们使用Java中的_Random_类来生成密钥：

```java
private static Key getRandomKey(String cipher, int keySize) {
    byte[] randomKeyBytes = new byte[keySize / 8];
    Random random = new Random();
    random.nextBytes(randomKeyBytes);
    return new SecretKeySpec(randomKeyBytes, cipher);
}
```

我们创建一个所需密钥大小的字节数组，并用来自_random.nextBytes()_的随机字节填充它。然后使用随机字节数组创建_SecretKeySpec_。

Java _Random_类是一个**伪随机数生成器**（PRNG），也称为**确定性随机数生成器**（DRNG）。这意味着它不是真正的随机。基于其种子，PRNG中的随机数序列可以完全确定。Java不推荐将_Random_用于加密应用程序。

话虽如此，**永远不要使用_Random_生成密钥**。

### 4.2 安全随机

我们现在将使用Java中的_SecureRandom_类来生成密钥：

```java
private static Key getSecureRandomKey(String cipher, int keySize) {
    byte[] secureRandomKeyBytes = new byte[keySize / 8];
    SecureRandom secureRandom = new SecureRandom();
    secureRandom.nextBytes(secureRandomKeyBytes);
    return new SecretKeySpec(secureRandomKeyBytes, cipher);
}
```

与前一个示例类似，我们实例化一个所需密钥大小的字节数组。现在，我们不是使用_Random_，而是使用_SecureRandom_为我们的字节数组生成随机字节。_SecureRandom_被Java推荐用于生成加密应用程序的随机数。它至少符合_FIPS 140-2，密码模块的安全要求_。

显然，在Java中，**_SecureRandom_是获取随机性的事实上的标准**。但这是否是生成密钥的最佳方式？让我们继续探讨下一个方法。

### 4.3 密钥生成器

接下来，让我们使用_密钥生成器_类生成密钥：

```java
private static Key getKeyFromKeyGenerator(String cipher, int keySize) throws NoSuchAlgorithmException {
    KeyGenerator keyGenerator = KeyGenerator.getInstance(cipher);
    keyGenerator.init(keySize);
    return keyGenerator.generateKey();
}
```

我们为我们要使用的密码算法获取一个_密钥生成器_实例。然后，我们使用所需的_keySize_初始化_keyGenerator_对象。最后，我们调用_generateKey_方法来生成我们的密钥。那么，它与_Random_和_SecureRandom_方法有什么不同呢？

**有两个关键的区别值得强调。**

首先，_Random_或_SecureRandom_方法无法告诉我们是否生成了符合密码算法规范的正确大小的密钥。只有在我们进行加密时，如果密钥大小不受支持，我们才会遇到异常。

使用无效的_keySize_与_SecureRandom_一起，在初始化加密密码算法时会抛出异常：

```java
encrypt(plainText, getSecureRandomKey(CIPHER, 111));
```

```java
java.security.InvalidKeyException: Invalid AES key length: 13 bytes
  at java.base/com.sun.crypto.provider.AESCrypt.init(AESCrypt.java:90)
  at java.base/com.sun.crypto.provider.GaloisCounterMode.init(GaloisCounterMode.java:321)
  at java.base/com.sun.crypto.provider.CipherCore.init(CipherCore.java:592)
  at java.base/com.sun.crypto.provider.CipherCore.init(CipherCore.java:470)
  at java.base/com.sun.crypto.provider.AESCipher.engineInit(AESCipher.java:322)
  at java.base/javax.crypto.Cipher.implInit(Cipher.java:867)
  at java.base/javax.crypto.Cipher.chooseProvider(Cipher.java:929)
  at java.base/javax.crypto.Cipher.init(Cipher.java:1299)
  at java.base/javax.crypto.Cipher.init(Cipher.java:1236)
  at com.baeldung.secretkey.Main.encrypt(Main.java:59)
  at com.baeldung.secretkey.Main.main(Main.java:51)
```

另一方面，使用_密钥生成器_在密钥生成过程中就会失败，允许我们更适当地处理它：

```java
encrypt(plainText, getKeyFromKeyGenerator(CIPHER, 111));
```

```java
java.security.InvalidParameterException: Wrong keysize: must be equal to 128, 192 or 256
  at java.base/com.sun.crypto.provider.AESKeyGenerator.engineInit(AESKeyGenerator.java:93)
  at java.base/javax.crypto.KeyGenerator.init(KeyGenerator.java:539)
  at java.base/javax.crypto.KeyGenerator.init(KeyGenerator.java:516)
  at com.baeldung.secretkey.Main.getKeyFromKeyGenerator(Main.java:89)
  at com.baeldung.secretkey.Main.main(Main.java:58)
```

另一个关键区别是默认使用_SecureRandom_。_密钥生成器_类是Java的加密包_javax.crypto_的一部分，它确保了使用_SecureRandom_来实现随机性。我们可以看到_密钥生成器_类中的_init_方法的定义：

```java
public final void init(int keysize) {
    init(keysize, JCAUtil.getSecureRandom());
}
```

因此，使用_密钥生成器_作为一种实践，确保我们永远不会使用_随机_类对象来生成密钥。

### 4.4 基于密码的密钥

到目前为止，我们一直在从不那么人性化的字节数组中生成密钥。基于密码的密钥（PBK）为我们提供了基于人类可读密码生成_SecretKey_的能力：

```java
private static Key getPasswordBasedKey(String cipher, int keySize, char[] password) throws NoSuchAlgorithmException, InvalidKeySpecException {
    byte[] salt = new byte[100];
    SecureRandom random = new SecureRandom();
    random.nextBytes(salt);
    PBEKeySpec pbeKeySpec = newKeySpec(pbeKeySpec, salt, 1000, keySize);
    SecretKey pbeKey = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256").generateSecret(pbeKeySpec);
    return new SecretKeySpec(pbeKey.getEncoded(), cipher);
}
```

我们在这里进行了很多操作。让我们分解一下。

**我们从人类可读的密码开始。**这是一个秘密，必须受到保护。必须遵循密码指南，例如最小长度为8个字符，使用特殊字符，结合大小写字母、数字等。此外，OWASP指南建议检查是否已经暴露的密码。

用户友好的密码没有足够的熵。因此，**我们添加了额外的随机生成字节称为 _salt_ 使其更难以猜测。** 最小盐长度应为128位。我们使用_SecureRandom_生成我们的盐。盐不是秘密，以明文形式存储。我们应该为每个密码生成盐，而不是全局使用相同的盐。这将保护免受彩虹表攻击，彩虹表攻击使用预先计算的哈希表查找以破解密码。

迭代次数是秘密生成算法应用转换函数的次数。它应该尽可能大。推荐的最小迭代次数为1,000。更高的迭代次数增加了攻击者在执行所有可能密码的暴力检查时的复杂性。

密钥大小与我们之前讨论的相同，可以是AES的128、192或256。

我们将上述四个元素包装到一个_PBEKeySpec_对象中。接下来，使用_SecretKeyFactory_，我们得到一个_PBKDF2WithHmacSHA256_算法的实例来生成密钥。

最后，使用_PBEKeySpec_调用_generateSecret_，我们根据人类可读的密码生成一个_SecretKey_。

## 结论

生成密钥有两个主要基础。它可以是随机密钥或基于人类可读密码的密钥。我们讨论了生成随机密钥的三种方法。其中，_KeyGenerator_提供真正的随机性，并提供检查和平衡。因此，**_KeyGenerator_是更好的选择**。

对于基于人类可读密码的密钥，我们可以使用_SecretKeyFactory_以及使用_SecureRandom_生成的盐和高迭代次数。

如常，完整的代码可在GitHub上获得。

OK