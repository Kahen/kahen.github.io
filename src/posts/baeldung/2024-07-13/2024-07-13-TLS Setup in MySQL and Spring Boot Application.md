---
date: 2022-09-17
category:
  - Spring Boot
  - MySQL
tag:
  - TLS
  - Security
head:
  - - meta
    - name: keywords
      content: Spring Boot, MySQL, TLS, Security, Configuration
---
# MySQL和Spring Boot应用程序中的TLS设置

在MySQL服务器和客户端之间的未加密连接可能会在网络上暴露传输中的数据。对于生产就绪的应用程序，我们应该通过TLS（传输层安全）协议将所有通信转移到安全连接上。

在本教程中，我们将学习如何在MySQL服务器上启用安全连接。此外，我们将配置Spring Boot应用程序使用此安全连接。

## 2. 为什么在MySQL上使用TLS？

首先，让我们了解一些TLS的基本知识。

TLS协议使用加密算法确保通过网络安全传输的数据可以被信任，并且没有被篡改或检查。它具有检测数据变化、丢失或重放攻击的机制。**TLS还结合了使用X.509标准的提供身份验证的算法。**

加密连接增加了一层安全性，使网络流量中的数据不可读。

在MySQL服务器和客户端之间配置安全连接可以提供更好的身份验证、数据完整性和可信度。此外，MySQL服务器可以对客户端的身份进行额外的检查。

然而，这种安全连接由于加密而带来了性能损失。性能成本的严重程度取决于各种因素，如查询大小、数据负载、服务器硬件、网络带宽等因素。

## 3. 在MySQL服务器上配置TLS连接

MySQL服务器按连接进行加密，可以为给定用户设置为强制或可选。MySQL支持在运行时使用安装的OpenSSL库进行SSL加密相关操作。

**我们可以使用JDBC驱动程序Connector/J在初始握手后加密客户端和服务器之间的数据。**

MySQL服务器版本8.0.28或更高版本仅支持TLS v1.2和TLS v1.3。它不再支持早期版本的TLS（v1和v1.1）。

服务器身份验证可以通过使用受信任的根证书颁发机构签名的证书或自签名证书来启用。此外，**即使在生产环境中，也常见使用我们自己的根CA文件构建MySQL**。

此外，服务器可以验证和验证客户端的SSL证书，并执行对客户端身份的额外检查。

### 3.1. 使用TLS证书配置MySQL服务器

我们将使用属性_require_secure_transport_和默认生成的证书启用MySQL服务器上的安全传输。

让我们通过在_docker-compose.yml_中实现设置来快速启动MySQL服务器：

```
version: '3.8'

services:
  mysql-service:
    image: "mysql/mysql-server:8.0.30"
    container_name: mysql-db
    command: [ "mysqld",
      "--require_secure_transport=ON",
      "--default_authentication_plugin=mysql_native_password",
      "--general_log=ON" ]
    ports:
      - "3306:3306"
    volumes:
      - type: bind
        source: ./data
        target: /var/lib/mysql
    restart: always
    environment:
      MYSQL_ROOT_HOST: "%"
      MYSQL_ROOT_PASSWORD: "Password2022"
      MYSQL_DATABASE: test_db
```

我们应该注意，上述**MySQL服务器使用的默认证书位于路径_/var/lib/mysql_**。

或者，我们可以通过在_docker-compose.yml_中包含一些_mysqld_配置来覆盖默认证书：

```
command: [ "mysqld",
  "--require_secure_transport=ON",
  "--ssl-ca=/etc/certs/ca.pem",
  "--ssl-cert=/etc/certs/server-cert.pem",
  "--ssl-key=/etc/certs/server-key.pem",
  ....]
```

现在，让我们使用_docker-compose_命令启动_mysql-service_：

```
$ docker-compose -p mysql-server up
```

### 3.2. 创建_X509_用户

我们可以选择使用X.509标准配置MySQL服务器进行客户端身份识别。使用_X509_，需要有效的客户端证书。这使得双向相互TLS或_mTLS_成为可能。

让我们创建一个_X509_用户并授予_test_db_数据库的权限：

```
mysql> CREATE USER 'test_user'@'%' IDENTIFIED BY 'Password2022' require X509;
mysql> GRANT ALL PRIVILEGES ON test_db.* TO 'test_user'@'%';
```

我们可以设置一个不需要任何用户证书识别的TLS连接：

```
mysql> CREATE USER 'test_user'@'%' IDENTIFIED BY 'Password2022' require SSL;
```

我们应该注意到，**如果使用SSL，则客户端需要提供信任存储**。

## 4. 在Spring Boot应用程序上配置TLS

Spring Boot应用程序可以通过设置JDBC URL的一些属性来配置JDBC连接上的TLS。

在之前，我们需要将信任存储和客户端证书转换为_JKS_格式。

### 4.1. 将PEM文件转换为JKS格式

让我们将MySQL服务器生成的_ca.pem_和_client-cert.pem_文件转换为_JKS_格式：

```
keytool -importcert -alias MySQLCACert.jks -file ./data/ca.pem \
    -keystore ./certs/truststore.jks -storepass mypassword
openssl pkcs12 -export -in ./data/client-cert.pem -inkey ./data/client-key.pem \
    -out ./certs/certificate.p12 -name "certificate"
keytool -importkeystore -srckeystore ./certs/certificate.p12 -srcstoretype pkcs12 -destkeystore ./certs/client-cert.jks
```

我们应该注意到，**从Java 9开始，默认的密钥库格式是_PKCS12_**。

### 4.2. 使用_application.yml_配置

可以通过将_sslMode_设置为_PREFERRED_、_REQUIRED_、_VERIFY_CA_或_VERIFY_IDENTITY_来启用TLS。

_PREFERRED_模式如果服务器支持，则使用安全连接，否则回退到未加密连接。

使用_REQUIRED_模式，客户端只能使用加密连接。像_REQUIRED_一样，_VERIFY_CA_模式使用安全连接，但还额外验证服务器证书是否符合配置的证书颁发机构（CA）证书。

_VERIFY_IDENTITY_模式除了证书验证外，还对主机名进行了额外的检查。

还需要向JDBC URL添加一些_Connector/J_属性，例如_trustCertificateKeyStoreUrl_、_trustCertificateKeyStorePassword_、_clientCertificateKeyStoreUrl_和_clientCertificateKeyStorePassword_。

让我们在_application.yml_中配置JDBC URL，将_sslMode_设置为_VERIFY_CA_：

```
spring:
  profiles: "dev2"
  datasource:
    url: >-
      jdbc:mysql://localhost:3306/test_db?
      sslMode=VERIFY_CA&
      trustCertificateKeyStoreUrl=file:/``<project-path>``/mysql-server/certs/truststore.jks&
      trustCertificateKeyStorePassword=mypassword&
      clientCertificateKeyStoreUrl=file:/``<project-path>``/mysql-server/certs/client-cert.jks&
      clientCertificateKeyStorePassword=mypassword
    username: test_user
    password: Password2022
```

我们应该注意到，等效于**_VERIFY_CA_的弃用属性是_useSSL=true_和_verifyServerCertificate=true_**的组合。

如果未提供信任证书文件，我们将收到一个错误提示：

```
Caused by: java.security.cert.CertPathValidatorException: Path does not chain with any of the trust anchors
    at java.base/sun.security.provider.certpath.PKIXCertPathValidator.validate(PKIXCertPathValidator.java:157) ~[na:na]
    at java.base/sun.security.provider.certpath.PKIXCertPathValidator.engineValidate(PKIXCertPathValidator.java:83) ~[na:na]
    at java.base/java.security.cert.CertPathValidator.validate(CertPathValidator.java:309) ~[na:na]
    at com.mysql.cj.protocol.ExportControlled$X509TrustManagerWrapper.checkServerTrusted(ExportControlled.java:402) ~[mysql-connector-java-8.0.29.jar:8.0.29]
```

如果客户端证书缺失，我们将收到不同的错误：

```
Caused by: java.sql.SQLException: Access denied for user 'test_user'@'172.20.0.1'
```

### 4.3. 使用环境变量配置TLS

或者，我们可以将上述配置设置为环境变量，并包括SSL相关的配置作为JVM参数。

让我们将TLS和Spring相关的配置作为环境变量添加：

```
export TRUSTSTORE=./mysql-server/certs/truststore.jks
export TRUSTSTORE_PASSWORD=mypassword
export KEYSTORE=./mysql-server/certs/client-cert.jks
export KEYSTORE_PASSWORD=mypassword
export SPRING_DATASOURCE_URL=jdbc:mysql://localhost:3306/test_db?sslMode=VERIFY_CA
export SPRING_DATASOURCE_USERNAME=test_user
export SPRING_DATASOURCE_PASSWORD=Password2022
```

然后，让我们使用上述SSL配置运行应用程序：

```
$ java -Djavax.net.ssl.keyStore=$KEYSTORE \
 -Djavax.net.ssl.keyStorePassword=$KEYSTORE_PASSWORD \
 -Djavax.net.ssl.trustStore=$TRUSTSTORE \
 -Djavax.net.ssl.trustStorePassword=$TRUSTSTORE_PASSWORD \
 -jar ./target/spring-boot-mysql-0.1.0.jar
```

## 5. 验证TLS连接

现在让我们使用上述任何方法