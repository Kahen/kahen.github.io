---
date: 2022-04-01
category:
  - Java
  - Security
tag:
  - X509
  - Certificate
  - Common Name
head:
  - - meta
    - name: keywords
      content: Java, X509, Certificate, Common Name Extraction
---
# 在Java中从X509证书提取通用名称

**通用名称（CN）是X.509证书中的可分辨名称（DN）字段内的一个属性**。CN通常是证书所属组织的域名。有时，我们需要在应用程序中访问证书文件中的CN值。

在本教程中，我们将学习**在Java中提取CN值的不同方法**。

### 2. 通用名称
证书包含了关于证书所有者的信息：有效期、证书用途、DN等。

**可分辨名称或DN本质上由一组名称-值对组成，名称包括国家（C）、组织（O）、组织单位（OU）、CN等**。

一个DN看起来像这样：“_CN=Baeldung, L=Casablanca, ST=Morocco, C=MA_”。如示例所示，CN通常是网站的域名。

在Java中从X.509证书提取CN，我们可以执行以下操作：

- 解析证书
- 获取其DN
- 解析DN以提取CN

在接下来的部分中，我们将使用不同的库提取CN。

### 3. 使用BouncyCastle
BouncyCastle是一组API集合，用于密码学操作，它补充了Java默认的密码学扩展（JCE）。此外，它提供了一种简单的方法来获取证书信息。

#### 3.1. Maven依赖
让我们首先在_pom.xml_中声明_bouncycastle_依赖：

```xml
``<dependency>``
    ``<groupId>``org.bouncycastle``</groupId>``
    ``<artifactId>``bcpkix-jdk15on``</artifactId>``
    ``<version>``1.70``</version>``
``</dependency>``
```

首先，让我们从我们的证书文件中获取一个_X509Certificate_对象：

```java
Security.addProvider(new BouncyCastleProvider());
CertificateFactory certificateFactory = CertificateFactory.getInstance("X.509", "BC");
X509Certificate certificate = (X509Certificate) certificateFactory.generateCertificate(new FileInputStream("src/main/resources/Baeldung.cer"));
```

在上面的代码中，我们使用_addProvider()_方法注册_BouncyCastleProvider_作为安全提供者。之后，我们使用_getInstance()_方法创建一个_CertificateFactory_对象。_getInstance()_方法接受两个参数——证书类型“_X.509_”和安全提供者“_BC_”。然后使用_certificateFactory_实例通过_generateCertificate()_方法生成_X509Certificate_对象。

接下来，让我们从_X509Certificate_对象中获取CN：

```java
@Test
void whenUsingBouncyCastle_thenExtractCommonName() {
    X500Principal principal = certificate.getSubjectX500Principal();
    X500Name x500Name = new X500Name(principal.getName());
    RDN[] rdns = x500Name.getRDNs(BCStyle.CN);
    List```<String>``` names = new ArrayList<>();
    for (RDN rdn : rdns) {
        String name = IETFUtils.valueToString(rdn.getFirst().getValue());
        names.add(name);
    }

    for (String commonName : names) {
        assertEquals("Baeldung", commonName);
    }
}
```

在这段代码中，我们使用_getSubjectX500Principal()_方法以_X500Principal_格式检索主题DN。然后，我们将该DN转换为BouncyCastle的_X500Name_表示。之后，我们通过_getRDNs()_方法从_X500Name_对象中提取CN。

_RDN_是BouncyCastle的一个类，表示_X.500Name_对象的单个部分。一个_X.500Name_对象由几个RDN组成，每个RDN由一个属性类型和属性值组成。最后，我们使用_BCStyle.CN_，这是BouncyCastle的CN属性类型的常量。

### 4. 使用正则表达式
**正则表达式（regex）是Java中字符串操作的强大工具。我们可以使用它从证书中提取CN**。

让我们创建一个测试用例来提取CN：

```java
@Test
void whenUsingRegex_thenExtractCommonName() {
    X500Principal principal = certificate.getSubjectX500Principal();
    List```<String>``` names = new ArrayList<>();
    Pattern pattern = Pattern.compile("CN=([^,]+)");
    Matcher matcher = pattern.matcher(principal.getName());
    while (matcher.find()) {
        names.add(matcher.group(1));
    }

    for (String commonName : names) {
        assertEquals("Baeldung", commonName);
    }
}
```

在上面的代码中，我们使用_Pattern_和_Matcher_类。我们首先通过调用其静态_compile()_方法并传递“_CN=(\[^,\]+)_”模式来创建_Pattern_对象。然后，我们通过调用_Pattern_对象的_matcher()_方法并传递DN值来创建_Matcher_对象。最后，我们在_Matcher_对象中调用_find()_方法。

### 5. 使用Cryptacular库
**从证书中获取CN值的另一种方法是使用Cryptacular库**。

#### 5.1. Maven依赖
让我们在_pom.xml_中声明_cryptacular_依赖：

```xml
``<dependency>``
    ``<groupId>``org.cryptacular``</groupId>``
    ``<artifactId>``cryptacular``</artifactId>``
    ``<version>``1.2.6``</version>``
``</dependency>``
```

让我们创建一个测试用例，使用_CertUtil_类来提取CN：

```java
@Test
void whenUsingCryptacular_thenExtractCommonName() {
    String commonName = CertUtil.subjectCN(certificate);
    assertEquals("Baeldung", commonName);
}
```

我们使用_subjectCN()_方法从_X509Certificate_对象中提取CN。

我们还应该注意，**当证书有多个CN时，这个库只返回一个CN**。

### 6. 使用LDAP API
**我们还可以使用JDK的标准LDAP API来实现相同的目标**：

```java
@Test
void whenUsingLDAPAPI_thenExtractCommonName() throws Exception {
    X500Principal principal = certificate.getSubjectX500Principal();
    LdapName ldapDN = new LdapName(principal.getName());
    List```<String>``` names = new ArrayList<>();
    for (Rdn rdn : ldapDN.getRdns()) {
        if (rdn.getType().equalsIgnoreCase("cn")) {
            String name = rdn.getValue().toString();
            names.add(name);
        }
    }

    for (String commonName : names) {
        assertEquals("Baeldung", commonName);
    }
}
```

上述代码处理了在LDAP上下文中从X.509证书解析DN。我们从DN的字符串表示构建_LdapName_对象。这是一种将DN从X.509证书的上下文转换为LDAP上下文的方法。

**一旦我们有了_LdapName_的实例，我们就可以很容易地使用_getRdns()_方法将其拆分为其各个组成部分（如CN、OU、O等）**。

### 7. 结论
CN是证书非常重要的一部分。在SSL/TLS证书的上下文中，CN用于指示与证书关联的域名。

在本文中，我们学习了如何使用几种方法从证书文件中提取CN值。

如常，代码示例可以在GitHub上找到。