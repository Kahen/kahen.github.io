---
date: 2022-04-01
category:
  - Java
  - Security
tag:
  - Secret Key
  - String Conversion
head:
  - - meta
    - name: keywords
      content: Java, Secret Key, String Conversion, Encryption, Decryption
---
# Java中的秘密密钥与字符串转换

在现实生活中，我们经常会遇到需要进行加密和解密以确保安全的情况。我们可以使用密钥来轻松实现这一点。因此，为了加密和解密密钥，我们需要知道如何将密钥转换为字符串以及反之。在本教程中，我们将看到Java中的秘密密钥和字符串转换。此外，我们还将通过示例了解在Java中以不同方式创建Secret Key。

密钥是用于加密和解密消息的信息或参数。在Java中，我们有SecretKey接口，它将密钥定义为秘密（对称）密钥。这个接口的目的是将所有秘密密钥接口分组（并提供类型安全性）。

在Java中生成密钥有两种方式：从随机数生成或从给定的密码派生。

**第一种方法是使用密码学安全的（伪）随机数生成器如SecureRandom类来生成密钥。**

为了生成密钥，我们可以使用KeyGenerator类。让我们定义一个生成SecretKey的方法——参数n指定了密钥的长度（128、192或256位）：

```java
public static SecretKey generateKey(int n) throws NoSuchAlgorithmException {
    KeyGenerator keyGenerator = KeyGenerator.getInstance("AES");
    keyGenerator.init(n);
    SecretKey originalKey = keyGenerator.generateKey();
    return originalKey;
}
```

**第二种方法是使用基于密码的密钥派生函数如PBKDF2，从给定的密码派生密钥。** 我们还需要一个盐值，用于将密码转换为密钥。盐也是一个随机值。

我们可以使用SecretKeyFactory类和PBKDF2WithHmacSHA256算法，从给定的密码生成密钥。

让我们定义一个方法，使用65,536次迭代和256位密钥长度从给定的密码生成SecretKey：

```java
public static SecretKey getKeyFromPassword(String password, String salt)
  throws NoSuchAlgorithmException, InvalidKeySpecException {
    SecretKeyFactory factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256");
    KeySpec spec = new PBEKeySpec(password.toCharArray(), salt.getBytes(), 65536, 256);
    SecretKey originalKey = new SecretKeySpec(factory.generateSecret(spec).getEncoded(), "AES");
    return originalKey;
}
```

### 3.1. SecretKey 到 String

我们将SecretKey转换为字节数组。然后，我们将字节数组使用Base64编码转换为String：

```java
public static String convertSecretKeyToString(SecretKey secretKey) throws NoSuchAlgorithmException {
    byte[] rawData = secretKey.getEncoded();
    String encodedKey = Base64.getEncoder().encodeToString(rawData);
    return encodedKey;
}
```

### 3.2. String 到 SecretKey

我们将编码的String密钥使用Base64解码转换为字节数组。然后，使用SecretKeySpecs，我们将字节数组转换为SecretKey：

```java
public static SecretKey convertStringToSecretKey(String encodedKey) {
    byte[] decodedKey = Base64.getDecoder().decode(encodedKey);
    SecretKey originalKey = new SecretKeySpec(decodedKey, 0, decodedKey.length, "AES");
    return originalKey;
}
```

让我们快速验证转换：

```java
SecretKey encodedKey = ConversionClassUtil.getKeyFromPassword("Baeldung@2021", "@$#baelDunG@#^$*");
String encodedString = ConversionClassUtil.convertSecretKeyToString(encodedKey);
SecretKey decodeKey = ConversionClassUtil.convertStringToSecretKey(encodedString);
Assertions.assertEquals(encodedKey, decodeKey);
```

## 4. 结论

总结来说，我们已经学会了如何在Java中将SecretKey转换为String以及反之。此外，我们还讨论了在Java中创建SecretKey的各种方式。

如常，文章的全部源代码可在GitHub上获取。