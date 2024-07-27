---
date: 2022-04-01
category:
  - Open Source
  - SSL
tag:
  - OpenSSL
  - Self-Signed Certificate
head:
  - - meta
    - name: keywords
      content: SSL, Open Source, Security, Certificate
---
# 使用OpenSSL创建自签名证书

## 1. 概述

OpenSSL是一个开源的命令行工具，允许用户执行各种与SSL相关的任务。

在本教程中，我们将学习**如何使用OpenSSL创建自签名证书**。

## 2. 创建私钥

首先，我们将创建一个私钥。私钥有助于实现加密，是我们证书中最重要的组成部分。

让我们使用`openssl`命令创建一个带密码保护的、2048位的RSA私钥（_domain.key_）：

```shell
openssl genrsa -des3 -out domain.key 2048
```

当提示时，我们将输入一个密码。输出将看起来像：

```shell
Generating RSA private key, 2048 bit long modulus (2 primes)
.....................+++++
.........+++++e is 65537 (0x010001)
Enter pass phrase for domain.key:
Verifying - Enter pass phrase for domain.key:
```

如果我们想要我们的私钥不被加密，我们可以简单地从命令中移除`-des3`选项。

## 3. 创建证书签名请求

**如果我们想要我们的证书被签名，我们需要一个证书签名请求（CSR）**。CSR包括公钥和一些额外信息（例如组织和国家）。

让我们从我们现有的私钥创建一个CSR（_domain.csr_）：

```shell
openssl req -key domain.key -new -out domain.csr
```

我们将输入我们的私钥密码和一些CSR信息以完成这个过程。输出将看起来像：

```shell
Enter pass phrase for domain.key:
You are about to be asked to enter information that will be incorporated
into your certificate request.
What you are about to enter is what is called a Distinguished Name or a DN.
There are quite a few fields but you can leave some blank
For some fields there will be a default value,
If you enter '.', the field will be left blank.
-----
Country Name (2 letter code) [AU]:AU
State or Province Name (full name) [Some-State]:stateA
Locality Name (eg, city) []:cityA
Organization Name (eg, company) [Internet Widgits Pty Ltd]:companyA
Organizational Unit Name (eg, section) []:sectionA
Common Name (e.g. server FQDN or YOUR name) []:domain
Email Address []:email@email.com

Please enter the following 'extra' attributes
to be sent with your certificate request
A challenge password []:
An optional company name []:
```

一个重要的字段是“_Common Name_”，它应该是我们域的确切完全限定域名（FQDN）。

“_一个挑战密码_”和“_一个可选的公司名称_”可以留空。

**我们也可以只用一个命令创建私钥和CSR**：

```shell
openssl req -newkey rsa:2048 -keyout domain.key -out domain.csr
```

如果我们想要我们的私钥不被加密，我们可以添加`-nodes`选项：

```shell
openssl req -newkey rsa:2048 -noenc -keyout domain.key -out domain.csr
```

自签名证书是**用它自己的私钥签名的证书**。它可以像CA签名的证书一样用来加密数据，但是我们的用户将会看到一个警告，说证书不被信任。

让我们使用我们现有的私钥和CSR创建一个自签名证书（_domain.crt_）：

```shell
openssl x509 -signkey domain.key -in domain.csr -req -days 365 -out domain.crt
```

`-days`选项指定了证书有效期的天数。

我们可以用一个私钥只创建一个自签名证书：

```shell
openssl req -key domain.key -new -x509 -days 365 -out domain.crt
```

**这个命令将创建一个临时CSR**。我们当然还是有CSR信息提示。

我们甚至可以用一个命令创建一个私钥和一个自签名证书：

```shell
openssl req -newkey rsa:2048 -keyout domain.key -x509 -days 365 -out domain.crt
```

## 5. 使用我们自己的CA创建CA签名证书

我们可以成为我们自己的证书颁发机构（CA），通过创建一个自签名的根CA证书，然后将其安装为本地浏览器中的信任证书。

### 5.1. 创建自签名根CA

让我们从命令行创建一个私钥（_rootCA.key_）和一个自签名根CA证书（_rootCA.crt_）：

```shell
openssl req -x509 -sha256 -days 1825 -newkey rsa:2048 -keyout rootCA.key -out rootCA.crt
```

### 5.2. 使用根CA签名我们的CSR

我们可以使用根CA证书及其私钥来签名我们的CSR（_domain.csr_）：

```shell
openssl x509 -req -CA rootCA.crt -CAkey rootCA.key -in domain.csr -out domain.crt -days 365 -CAcreateserial
```

结果，CA签名的证书将在_domain.crt_文件中。这将产生一个有效的证书，但浏览器仍然会标记它们。这是因为X.509证书和SAN扩展的更改。

### 5.3. SAN扩展

X.509证书需要有关为此特定证书发行的域的信息。例如，证书可能是有效的，但用于与发行时不同的域。

**如果我们创建一个没有正确配置_subjectAltName_的证书，我们仍然可以使用它。但是，浏览器会将其标记为不安全**。这种方法可能适用于开发。然而，在组织级别使用这种方法可能会使员工对安全通知不敏感。

为了符合SAN扩展标准，我们需要创建一个配置文本文件（_domain.ext_），内容如下：

```shell
authorityKeyIdentifier=keyid,issuer
basicConstraints=CA:FALSE
subjectAltName = @alt_names
[alt_names]
DNS.1 = domain
```

“_DNS.1_”字段应该是我们网站的域。

然后，我们可以稍微修改我们之前的命令，并添加有关扩展文件的信息：

```shell
openssl x509 -req -CA rootCA.crt -CAkey rootCA.key -in domain.csr -out domain.crt -days 365 -CAcreateserial -extfile domain.ext
```

现在，我们的证书符合所有SAN要求并且可以正确工作。这个过程需要一个额外的步骤，并且_openssl_不提供此信息的提示，所以我们必须创建一个单独的扩展文件。**然而，SAN使证书更安全**。此外，它允许定义多个域或IP地址，我们可以使用单个证书跨多个域。

## 6. 查看证书

我们可以使用_openssl_命令以纯文本形式查看我们证书的内容：

```shell
openssl x509 -text -noout -in domain.crt
```

输出将看起来像：

```shell
Certificate:
    Data:
        Version: 1 (0x0)
        Serial Number:
            64:1a:ad:0f:83:0f:21:33:ff:ac:9e:e6:a5:ec:28:95:b6:e8:8a:f4
        Signature Algorithm: sha256WithRSAEncryption
        Issuer: C = AU, ST = stateA, L = cityA, O = companyA, OU = sectionA, CN = domain, emailAddress = email@email.com
        Validity
            Not Before: Jul 12 07:18:18 2021 GMT
            Not After : Jul 12 07:18:18 2022 GMT
        Subject: C = AU, ST = stateA, L = cityA, O = companyA, OU = sectionA, CN = domain, emailAddress = email@email.com
        Subject Public Key Info:
            Public Key Algorithm: rsaEncryption
                RSA Public-Key: (2048 bit)
                Modulus: [...]
                Exponent: 65537 (0x10001)
    Signature Algorithm: sha256WithRSAEncryption [...]
```

## 7. 转换证书格式

我们的证书（_domain.crt_）是**一个ASCII PEM编码的X.509证书**。我们可以使用OpenSSL将其转换为其他格式以供多用途使用。

### 7.1. 将PEM转换为DER

DER格式通常与Java一起使用。让我们将我们的PEM编码证书转换为DER编码证书：

```shell
openssl x509 -in domain.crt -outform der -out domain.der
```

### 7.2. 将PEM转换为PKCS12

PKCS12文件，也称为PFX文件，通常用于在Microsoft IIS中导入和导出证书链。

我们将使用以下命令获取我们的私钥和证书，然后将它们组合成一个PKCS12文件：

```shell
openssl pkcs12 -inkey domain.key -in domain.crt -export -out domain.pfx
```

## 8. 结论

在本文中，我们学习了如何从头开始**使用OpenSSL创建自签名证书**，**查看此证书，并将其转换为其他格式**。我们希望这些内容能帮助到你的工作。