---
date: 2022-04-01
category:
  - Java
  - SSL
tag:
  - PEM
  - JKS
  - keytool
  - openssl
head:
  - - meta
    - name: keywords
      content: Java, SSL, PEM, JKS, keytool, openssl
---

# 将PEM文件转换为Java KeyStore格式

在之前的教程中，我们展示了如何将Java KeyStore（JKS）转换为PEM格式。在本教程中，我们将转换PEM格式为标准的Java KeyStore（JKS）格式。Java KeyStore是一个容器，用于存储与其匹配的私钥的证书。

我们将使用_keytool_和_openssl_命令的组合来完成从PEM到JKS的转换。_keytool_命令随JDK（Java开发工具包）提供，用于将PEM转换为PKCS12格式。第二个命令_openssl_需要下载，其作用是将PKCS12转换为JKS。

JKS是Java特有的文件格式，直到Java 8之前都是KeyStores的默认格式。从Java 9开始，PKCS#12成为默认的KeyStore格式。尽管JKS存在，PKCS#12是一个标准化的、语言中立的存储加密数据的格式。PKCS#12格式也被称为PKCS12或PFX。

PEM（隐私增强邮件）也是一种证书容器格式。PEM文件以Base64编码。这确保了数据在不同系统之间的传输过程中保持完整。

此外，PEM文件可以包含一个或多个实例，每个实例都由纯文本头和尾分隔：

```
-----BEGIN CERTIFICATE-----

// base64 编码

-----END CERTIFICATE-----
```

我们现在将经历将所有证书和私钥从PEM转换为JKS格式的步骤。

为了示例的目的，我们将创建一个自签名证书。

### 3.1. 创建PEM文件

**我们将首先使用_openssl_生成两个文件，_key.pem_和_cert.pem_：**

```
openssl req -newkey rsa:2048 -x509 -keyout key.pem -out cert.pem -days 365
```

工具将提示我们输入PEM密码短语和其他信息。

一旦我们回答了所有提示，_openssl_工具将输出两个文件：

- _key.pem_（私钥）
- _cert.pem_（公钥证书）

**我们将使用这些文件生成我们的自签名证书。**

### 3.2. 生成PKCS12证书

在大多数情况下，证书以公钥密码学标准#12（PKCS12）格式存在。较少使用Java KeyStore（JKS）格式。

让我们**将PEM转换为PKCS12格式：**

```
openssl pkcs12 -export -in cert.pem -inkey key.pem -out certificate.p12 -name "certificate"
```

在命令运行时，我们将被提示输入之前为_key.pem_创建的密码短语：

```
Enter pass phrase for key.pem:
```

然后，我们将看到提示，要求为_certificate.p12_输入新密码：

```
Enter Export Password:
```

之后，我们将拥有一个存储在PCKS12格式中的_certificate.p12_ KeyStore。

### 3.3. PKCS#12 转换为 JKS

最后一步是将PKCS12转换为JKS格式：

```
keytool -importkeystore -srckeystore certificate.p12 -srcstoretype pkcs12 -destkeystore cert.jks
```

在命令执行时，它将提示我们为_cert.jks_文件输入新密码：

```
Enter destination keystore password:
```

它将提示我们输入我们之前创建的_certificate.p12_密码：

```
Enter source keystore password:
```

然后，我们应该看到最终输出：

```
Entry for alias certificate successfully imported.
Import command completed: 1 entries successfully imported, 0 entries failed or cancelled
```

结果是存储在JKS格式中的_cert.jks_ KeyStore。

## 4. 结论

在本文中，我们描述了使用中间PKCS12格式将PEM文件转换为JKS格式的步骤。

作为辅助工具，我们使用了_keytool_和_openssl_命令。