---
date: 2022-04-01
category:
  - Java
  - Security
tag:
  - TrustAnchors
  - KeyStore
  - PKIXParameters
head:
  - - meta
    - name: keywords
      content: Java, TrustAnchors, KeyStore, PKIXParameters, SSL, Security
---
# "trustAnchors 参数必须非空"错误解析

## 1. 概述

在本教程中，我们将解释什么是信任锚点。此外，我们将展示Java中_TrustStore_的默认位置和预期的文件格式。最后，我们将阐明出现错误：“_java.security.InvalidAlgorithmParameterException_: trust anchors parameter must be non-empty”的原因。

## 2. 信任锚点定义

首先让我们解释一下信任锚点是什么。**在密码学系统中，信任锚点定义了信任被假定并派生的根实体**。在像X.509这样的架构中，根证书是信任锚点。此外，根证书保证链中所有其他证书的信任。

## 3. _TrustStore_ 位置和格式

现在让我们来看看Java中_TrustStore_的位置和格式。首先，Java按顺序在两个位置查找_TrustStore_：

- _$JAVA_HOME/lib/security/jssecacerts_
- _$JAVA_HOME/lib/security/cacerts_

我们可以使用参数_-Djavax.net.ssl.trustStore_覆盖默认位置。

此外，参数_-Djavax.net.ssl.trustStorePassword_允许我们为_TrustStore_提供密码。最终，命令看起来像这样：

```shell
java -Djavax.net.ssl.trustStore=/some/loc/on/server/our_truststore.jks -Djavax.net.ssl.trustStorePassword=our_password -jar application.jar
```

此外，JKS是默认的_TrustStore_格式。参数_-Djavax.net.ssl.trustStoreType_允许覆盖默认的_TrustStore_类型。

让我们看看Java 16中_keytool_实用工具对_$JAVA_HOME/lib/security/cacerts_的输出：

```shell
$ keytool -list -cacerts
Enter keystore password:
Keystore type: JKS
Keystore provider: SUN

Your keystore contains 90 entries
....
```

正如预期的那样，_KeyStore_类型是JKS。此外，我们得到了文件中存储的所有90个证书。

## 4. 异常原因

现在让我们看看异常“_java.security.InvalidAlgorithmParameterException_: trustAnchors parameter must be non-empty”。

首先，Java运行时只在_PKIXParameters_类中创建_InvalidAlgorithmParameterException_，该类用于从_KeyStore_读取证书。**_PKIXParameters_的构造函数从作为参数给出的_KeyStore_中收集_trustAnchors_**。

当提供的_KeyStore_没有_trustAnchors_时，会抛出异常：

```java
...
if (trustAnchors.isEmpty()) {
    throw new InvalidAlgorithmParameterException("the trustAnchors " +
        "parameter must be non-empty");
}
...
```

**让我们尝试复现这个情况。首先，让我们创建一个空的_KeyStore_**：

```java
private KeyStore getKeyStore() throws CertificateException, NoSuchAlgorithmException, IOException, KeyStoreException {
    KeyStore ks = KeyStore.getInstance(KeyStore.getDefaultType());
    ks.load(null, "changeIt".toCharArray());
    return ks;
}
```

现在让我们测试_PKIXParameters_类的实例化：

```java
@Test
public void whenOpeningTrustStore_thenExceptionIsThrown() throws Exception {
    KeyStore keyStore = getKeyStore();
    InvalidAlgorithmParameterException invalidAlgorithmParameterException =
      Assertions.assertThrows(InvalidAlgorithmParameterException.class, () -> new PKIXParameters(keyStore));
    Assertions.assertEquals("the trustAnchors parameter must be non-empty", invalidAlgorithmParameterException.getMessage());
}
```

也就是说，构造函数如预期那样抛出了异常。换句话说，当给定_KeyStore_中没有受信任的证书时，无法创建_PKIXParameters_类的实例。

## 5. 结论

在这篇短文中，我们描述了什么是信任锚点。然后，我们展示了默认_TrustStore_的位置和文件格式。最后，我们展示了“trust anchors parameter must be non-empty”错误的原因。

如常，示例的源代码可以在GitHub上找到。