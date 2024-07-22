---
date: 2022-04-01
category:
  - Java
  - Security
tag:
  - X509
  - Certificate
  - Thumbprint
head:
  - - meta
    - name: keywords
      content: Java, X509, Certificate, Thumbprint
------
# 在Java中计算X509证书的指纹

## 1. 概述

证书的**指纹（或称哈希值）**是证书的唯一标识符。它不是证书的一部分，而是从证书中计算得出的。

在这个简短的教程中，我们将看到如何在Java中计算X509证书的指纹。

## 2. 使用纯Java

首先，让我们从我们的证书文件中获取一个_X509Certificate_对象：

```java
public static X509Certificate getCertObject(String filePath)
  throws IOException, CertificateException {
     try (FileInputStream is = new FileInputStream(filePath)) {
        CertificateFactory certificateFactory = CertificateFactory
          .getInstance("X.509");
        return (X509Certificate) certificateFactory.generateCertificate(is);
     }
}
```

接下来，让我们从这个对象中获取指纹：

```java
private static String getThumbprint(X509Certificate cert)
  throws NoSuchAlgorithmException, CertificateEncodingException {
    MessageDigest md = MessageDigest.getInstance("SHA-1");
    md.update(cert.getEncoded());
    return DatatypeConverter.printHexBinary(md.digest()).toLowerCase();
}
```

例如，如果我们有一个名为_baeldung.pem_的X509证书文件，我们可以使用上述方法轻松打印其指纹：

```java
X509Certificate certObject = getCertObject("baeldung.pem");
System.out.println(getThumbprint(certObject));
```

结果将类似于：

```
c9fa9f008655c8401ad27e213b985804854d928c
```

## 3. 使用Apache Commons Codec

我们还可以使用Apache Commons Codec库中的_DigestUtils_类来实现相同的目标。

让我们在我们的_pom.xml_文件中添加一个依赖项：

```xml
`<dependency>`
    `<groupId>`commons-codec`</groupId>`
    `<artifactId>`commons-codec`</artifactId>`
    `<version>`1.15`</version>`
`</dependency>`
```

现在，我们只需使用_sha1Hex()_方法从我们的_X509Certificate_对象中获取指纹：

```java
DigestUtils.sha1Hex(certObject.getEncoded());
```

## 4. 结论

在这个快速教程中，我们学习了两种在Java中计算X509证书指纹的方法。

正如往常一样，本文的示例代码可以在GitHub上找到。