---
date: 2024-07-07
category:
  - Spring Boot
  - AWS Secrets Manager
tag:
  - AWS
  - Secrets Manager
  - Spring Boot
head:
  - - meta
    - name: keywords
      content: Spring Boot, AWS Secrets Manager, Integration, Database Credentials, API Keys
---
# 将 AWS Secrets Manager 集成到 Spring Boot 中

在这个教程中，我们将把 Spring Boot 应用程序与 AWS Secrets Manager 集成起来，以便检索数据库凭据和其他类型的密钥，例如 API 密钥。

AWS Secrets Manager 是一项 AWS 服务，使我们能够安全地存储、轮换和管理凭据，例如数据库、API 密钥、令牌或我们想要管理的任何其他密钥。

我们可以区分两种类型的密钥——一种严格用于数据库凭据，另一种更通用，用于任何其他类型的密钥。

使用 AWS Secrets Manager 的一个好例子是为我们的应用程序提供一组凭据或 API 密钥。

保持密钥的一个推荐方式是以 JSON 格式。此外，如果我们想使用密钥轮换功能，我们必须使用 JSON 结构。

### 3.1. 密钥创建

让我们在 AWS Secrets Manager 中创建一个密钥。为此，我们可以使用 AWS CLI 和 _aws secretsmanager create-secret_ 命令。

在我们的例子中，让我们将密钥命名为 _test/secret/_ 并创建两对 API 密钥——_api-key1_ 与 _apiKeyValue1_ 和 _api-key2_ 与 _apiKeyValue2_：

```shell
aws secretsmanager create-secret \
--name test/secret/ \
--secret-string "{'api-key1':'apiKeyValue1','api-key2':'apiKeyValue2'}"
```

作为响应，我们应该得到创建密钥的 _ARN_，其名称和版本 ID：

```json
{
    "ARN": "arn:aws:secretsmanager:eu-central-1:111122223333:secret:my/secret/-gLK10U",
    "Name": "test/secret/",
    "VersionId": "a04f735e-3b5f-4194-be0d-719d5386b67b"
}
```

### 3.2. Spring Boot 应用程序集成

为了检索我们新创建的密钥，我们必须添加 _spring-cloud-starter-aws-secrets-manager-config_ 依赖项：

```xml
```<dependency>```
    ```<groupId>```io.awspring.cloud```</groupId>```
    ```<artifactId>```spring-cloud-starter-aws-secrets-manager-config```</artifactId>```
    ```<version>```2.4.4```</version>```
```</dependency>```
```

下一步是在我们的 _application.properties_ 文件中添加一个属性：

```properties
spring.config.import=aws-secretsmanager:test/secret/
```

我们在这里提供了我们刚刚创建的密钥的名称。有了这个设置，让我们在应用程序中使用我们的新密钥并验证它们的值。

为此，我们可以通过 _@Value_ 注解将我们的密钥注入到应用程序中。在注解中，我们指定了我们在密钥创建过程中提供的密钥字段的名称。在我们的例子中，它是 _api-key1_ 和 _api-key2_：

```java
@Value("${api-key1}")
private String apiKeyValue1;

@Value("${api-key2}")
private String apiKeyValue2;
```

为了验证这个例子中的值，让我们在 _@PostConstruct_ 中打印它们，在 bean 属性初始化后：

```java
@PostConstruct
private void postConstruct() {
    System.out.println(apiKeyValue1);
    System.out.println(apiKeyValue2);
}
```

我们应该注意到，将密钥值输出到我们的控制台并不是一个好的实践。然而，我们可以看到在这个例子中，当我们运行应用程序时，我们的值已经被正确加载：

```
2023-03-26 12:40:24.376 INFO 33504 [main] j.LocalContainerEntityManagerFactoryBean : Initialized JPA EntityManagerFactory for persistence unit 'default'
apiKeyValue1
apiKeyValue2
2023-03-26 12:40:25.306 INFO 33504 [main] o.s.b.w.embedded.tomcat.TomcatWebServer : Tomcat started on port(s): 8080 (http) with context path ''
```

### 4. 特殊数据库凭据的密钥

在 AWS Secrets Manager 中，有一种特殊类型的密钥用于存储数据库凭据。我们可以选择 AWS 支持的数据库之一，例如 Amazon RDS、Amazon DocumentDB 或 Amazon Redshift。对于非 Amazon 数据库，我们还可以提供服务器地址、数据库名称和端口。

通过在我们的 Spring Boot 应用程序中使用 _aws-secretsmanager-jdbc_ 库，我们可以轻松地将这些凭据提供给我们的数据库。此外，如果我们在 Secrets Manager 中轮换凭据，AWS 提供的库在收到使用先前凭据的认证错误时 **自动** **检索新的凭据集**。

### 4.1. 数据库密钥创建

为了在 AWS Secrets Manager 中创建数据库类型的密钥，我们将再次使用 AWS CLI：

```shell
$ aws secretsmanager create-secret \
    --name rds/credentials \
    --secret-string file://mycredentials.json
```

在上面的命令中，我们使用 _mycredentials.json_ 文件，其中我们指定了我们数据库的所有必要属性：

```json
{
  "engine": "mysql",
  "host": "cwhgvgjbpqqa.eu-central-rds.amazonaws.com",
  "username": "admin",
  "password": "password",
  "dbname": "db-1",
  "port": "3306"
}
```

### 4.2. Spring Boot 应用程序集成

一旦我们创建了密钥，我们就可以在 Spring Boot 应用程序中使用它。为此，我们需要添加一些依赖项，如 _aws-secretsmanager-jdbc_ 和 _mysql-connector-java_：

```xml
```<dependency>```
    ```<groupId>```com.amazonaws.secretsmanager```</groupId>```
    ```<artifactId>```aws-secretsmanager-jdbc```</artifactId>```
    ```<version>```1.0.11```</version>```
```</dependency>```
```<dependency>```
    ```<groupId>```mysql```</groupId>```
    ```<artifactId>```mysql-connector-java```</artifactId>```
    ```<version>```8.0.32```</version>```
```</dependency>```
```

最后，我们还需要在 _application.properties_ 文件中设置一些属性：

```properties
spring.datasource.driver-class-name=com.amazonaws.secretsmanager.sql.AWSSecretsManagerMySQLDriver
spring.jpa.database-platform=org.hibernate.dialect.MySQLDialect
spring.datasource.url=jdbc-secretsmanager:mysql://db-1.cwhqvgjbpgfw.eu-central-1.rds.amazonaws.com:3306
spring.datasource.username=rds/credentials
```

在 _spring.datasource.driver-class-name_ 中，我们指定了我们想要使用的驱动程序的名称。

接下来是 _spring.jpa.database-platform_，我们在这里提供了我们的方言。

当我们在 _spring.datasource.url_ 中指定数据库的 URL 时，我们必须在该 URL 之前添加 _jdbc-secretsmanager_ 前缀。这是必要的，因为我们正在与 AWS Secrets Manager 集成。在这个例子中，我们的 URL 引用了一个 MySQL RDS 实例，尽管它可以引用任何 MySQL 数据库。

在 _spring.datasource.username_ 中，我们只需要提供我们之前设置的 AWS Secrets Manager 的密钥。根据这些属性，我们的应用程序将尝试连接到 Secrets Manager 并在连接到数据库之前检索用户名和密码。

在应用程序日志中，我们可以看到我们成功地获得了数据库连接并且 _EntityManager_ 已经被初始化：

```
2023-03-26 12:40:22.648 INFO 33504 --- [ main ] o.hibernate.jpa.internal.util.LogHelper : HHH000204: Processing PersistenceUnitInfo [name: default]
2023-03-26 12:40:22.697 INFO 33504 --- [ main ] org.hibernate.Version : HHH000412: Hibernate ORM core version 5.6.12.Final
2023-03-26 12:40:22.845 INFO 33504 --- [ main ] o.hibernate.annotations.common.Version : HCANN000001: Hibernate Commons Annotations {5.1.2.Final}
2023-03-26 12:40:22.951 INFO 33504 --- [ main ] com.zaxxer.hikari.HikariDataSource : HikariPool-1 - Starting...
2023-03-26 12:40:23.752 INFO 33504 --- [ main ] com.zaxxer.hikari.HikariDataSource : HikariPool-1 - Start completed.
2023-03-26 12:40:23.783 INFO 33504 --- [ main ] org.hibernate.dialect.Dialect : HHH000400: Using dialect: org.hibernate.dialect.MySQL5Dialect
2023-03-26 12:40:24.363 INFO 33504 --- [ main ] o.h.e.t.j.p.i.JtaPlatformInitiator : HHH000490: Using JtaPlatform implementation: [org.hibernate.engine.transaction.jta.platform.internal.NoJtaPlatform]
2023-03-26 12:40:24.376 INFO 33504 --- [ main ] j.LocalContainerEntityManagerFactoryBean : Initialized JPA EntityManagerFactory for persistence unit 'default'

```

此外，还有一个简单的 `UserController` 创建，我们可以在其中创建、读取和删除用户。

我们可以使用 `curl` 创建一个用户：

```shell
$ curl --location 'localhost:8080/users/' \
--header 'Content-Type: application/json' \
--data '{
    "name": "my-user-1"
}'
```

我们得到一个成功的响应：

```json
{"id":1,"name":"my-user-1"}
```

## 5. 结论

在本文中，我们学习了如何将 Spring Boot 应用程序与 AWS Secrets Manager 集成，以及如何检索数据库凭据和其他类型的密钥。

如往常一样，示例代码可以在 GitHub 上找到。

[Baeldung Logo](https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg)[Gravatar Image](https://secure.gravatar.com/avatar/dc417739e22ae675b0e1f7012bbddaa5?s=50&r=g)[Gravatar Image](https://secure.gravatar.com/avatar/6c3babf3d6ea5d49c2bc4e7957870d75?s=50&r=g)[Announcement Icon](https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png)[Baeldung REST Post Footer](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg)[Baeldung REST Post Footer Icon](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png)
```

OK