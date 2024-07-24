---
date: 2021-11-01
category:
  - Java
  - Security
tag:
  - HMAC
  - Java
  - BouncyCastle
  - Apache Commons
head:
  - - meta
    - name: keywords
      content: Java, Security, HMAC, BouncyCastle, Apache Commons
---
# Java中的HMAC

让我们考虑这样一个场景：两个参与者想要进行通信，并且他们需要一种方法来验证他们接收到的消息没有被篡改。基于哈希的消息认证码（HMAC）是一个不错的解决方案。

在本教程中，我们将探讨如何在Java中使用HMAC算法。

## 2. 基于哈希的消息认证码（HMAC）

HMAC是一种加密方法，保证了两个参与者之间消息的完整性。

HMAC算法由一个密钥和一个哈希函数组成。密钥是一段唯一的信息或一串字符。它被消息的发送者和接收者所知晓。

哈希函数是一种映射算法，将一个序列转换为另一个序列。

下面的图表展示了高级的HMAC算法：

![img](https://www.baeldung.com/wp-content/uploads/2021/11/hmac-in-java.png)

HMAC使用MD5和SHA-*等加密哈希函数。

## 3. 使用JDK API进行HMAC

**Java提供了内置的_Mac_类来生成HMAC。** 初始化_Mac_对象后，我们调用_doFinal()_方法来执行HMAC操作。此方法返回一个包含HMAC结果的字节数组。

让我们定义一个使用各种哈希算法（如MD5、SHA-1、SHA-224、SHA-256、SHA-384和SHA-512）计算HMAC的方法：

```java
public static String hmacWithJava(String algorithm, String data, String key)
  throws NoSuchAlgorithmException, InvalidKeyException {
    SecretKeySpec secretKeySpec = new SecretKeySpec(key.getBytes(), algorithm);
    Mac mac = Mac.getInstance(algorithm);
    mac.init(secretKeySpec);
    return bytesToHex(mac.doFinal(data.getBytes()));
}
```

让我们写一个示例测试来演示HMAC计算：

```java
@Test
public void givenDataAndKeyAndAlgorithm_whenHmacWithJava_thenSuccess()
    throws NoSuchAlgorithmException, InvalidKeyException {

    String hmacSHA256Value = "5b50d80c7dc7ae8bb1b1433cc0b99ecd2ac8397a555c6f75cb8a619ae35a0c35";
    String hmacSHA256Algorithm = "HmacSHA256";
    String data = "baeldung";
    String key = "123456";

    String result = HMACUtil.hmacWithJava(hmacSHA256Algorithm, data, key);

    assertEquals(hmacSHA256Value, result);
}
```

在这个测试中，我们使用_HmacSHA512_算法与简单的字符串数据和密钥。然后，我们断言HMAC结果等于预期的数据。

## 4. Apache Commons库

Apache Commons库也提供了一个用于HMAC计算的实用类。

### 4.1. 添加Maven依赖

要使用Apache Commons实用类，我们需要在我们的pom.xml中添加commons-codec：

```xml
``<dependency>``
    ``<groupId>``commons-codec``</groupId>``
    ``<artifactId>``commons-codec``</artifactId>``
    ``<version>``1.15``</version>``
``</dependency>``
```

### 4.2. _HmacUtils_类

**为了计算HMAC，我们可以使用_HmacUtils_类。** 初始化_HmacUtils_对象后，我们调用_hmacHex()_方法来执行HMAC操作。此方法返回一个包含HMAC结果的十六进制字符串。

让我们创建一个生成HMAC的方法：

```java
public static String hmacWithApacheCommons(String algorithm, String data, String key) {
    String hmac = new HmacUtils(algorithm, key).hmacHex(data);
    return hmac;
}
```

让我们写一个示例测试：

```java
@Test
public void givenDataAndKeyAndAlgorithm_whenHmacWithApacheCommons_thenSuccess() {

    String hmacMD5Value = "621dc816b3bf670212e0c261dc9bcdb6";
    String hmacMD5Algorithm = "HmacMD5";
    String data = "baeldung";
    String key = "123456";

    String result = HMACUtil.hmacWithApacheCommons(hmacMD5Algorithm, data, key);

    assertEquals(hmacMD5Value, result);
}
```

在这个测试中，我们使用_HmacMD5_算法。

## 5. BouncyCastle库

同样，**我们也可以在Java中使用BouncyCastle库。** BouncyCastle是一组我们可以在Java中使用的加密API集合。

### 5.1. 添加Maven依赖

在我们开始使用这个库之前，我们需要在我们的pom.xml文件中添加bcpkix-jdk15to18依赖：

```xml
``<dependency>``
    ``<groupId>``org.bouncycastle``</groupId>``
    ``<artifactId>``bcpkix-jdk15to18``</artifactId>``
    ``<version>``1.69``</version>``
``</dependency>``
```

### 5.2. _Hmac_类

我们将通过**基于我们想要使用的哈希算法实例化_HMac_类**。然后我们将使用_update()_方法使用输入数据更新HMAC对象。最后，我们将调用_doFinal()_方法来生成HMAC代码：

```java
public static String hmacWithBouncyCastle(String algorithm, String data, String key) {
    Digest digest = getHashDigest(algorithm);

    HMac hMac = new HMac(digest);
    hMac.init(new KeyParameter(key.getBytes()));

    byte[] hmacIn = data.getBytes();
    hMac.update(hmacIn, 0, hmacIn.length);
    byte[] hmacOut = new byte[hMac.getMacSize()];

    hMac.doFinal(hmacOut, 0);
    return bytesToHex(hmacOut);
}

private static Digest getHashDigest(String algorithm) {
    switch (algorithm) {
      case "HmacMD5":
        return new MD5Digest();
      case "HmacSHA256":
        return new SHA256Digest();
      case "HmacSHA384":
        return new SHA384Digest();
      case "HmacSHA512":
        return new SHA512Digest();
    }
    return new SHA256Digest();
}
```

下面是一个示例，它为字符串数据生成一个HMAC，然后验证它：

```java
@Test
public void givenDataAndKeyAndAlgorithm_whenHmacWithBouncyCastle_thenSuccess() {

    String hmacSHA512Value = "b313a21908df55c9e322e3c65a4b0b7561ab1594ca806b3affbc0d769a1" +
      "290c1922aa6622587bea3c0c4d871470a6d06f54dbd20dbda84250e2741eb01f08e33";
    String hmacSHA512Algorithm = "HmacSHA512";
    String data = "baeldung";
    String key = "123456";

    String result = HMACUtil.hmacWithBouncyCastle(hmacSHA512Algorithm, data, key);

    assertEquals(hmacSHA512Value, result);
}
```

在这个测试中，我们使用_HmacSHA512_算法。

## 6. 结论

**HMAC提供了数据完整性检查。** 在本文中，我们学习了如何使用Java中的HMAC算法为输入的字符串数据生成HMAC。此外，我们还讨论了在HMAC计算中使用Apache Commons和BouncyCastle库的方法。

如常，本文的完整源代码可在GitHub上获得。