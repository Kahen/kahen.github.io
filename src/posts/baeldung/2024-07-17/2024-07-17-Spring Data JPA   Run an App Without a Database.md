---
date: 2022-04-01
category:
  - Spring Data JPA
  - Spring Boot
tag:
  - JPA
  - Hibernate
  - MySQL
head:
  - - meta
    - name: keywords
      content: Spring Boot, Spring Data JPA, Hibernate, MySQL, JPA
------
# Spring Data JPA – 不需要数据库运行应用程序

## 1. 概述

在本教程中，**我们将学习如何在没有运行数据库的情况下启动 Spring Boot 应用程序。**

默认情况下，如果我们有一个包含 Spring Data JPA 的 Spring Boot 应用程序，那么应用程序将自动尝试创建数据库连接。然而，在应用程序启动时数据库不可用的情况下，可能需要避免这种情况。

## 2. 设置

我们将使用一个简单的使用 MySQL 的 Spring Boot 应用程序。让我们看看设置应用程序的步骤。

### 2.1. 依赖项

让我们将 Spring Data JPA 启动器和 MySQL 连接器依赖项添加到 _pom.xml_ 文件中：

```xml
```<dependency>```
    ```<groupId>```org.springframework.boot```</groupId>```
    ```<artifactId>```spring-boot-starter-data-jpa```</artifactId>```
```</dependency>```

```<dependency>```
    ```<groupId>```mysql```</groupId>```
    ```<artifactId>```mysql-connector-java```</artifactId>```
    `<scope>`runtime`</scope>`
```</dependency>```
```

这将把 JPA、MySQL 连接器和 Hibernate 添加到类路径中。

此外，我们希望在应用程序启动时有一个任务持续运行。为此，让我们将 Web 启动器添加到 _pom.xml_ 文件中：

```xml
```<dependency>```
    ```<groupId>```org.springframework.boot```</groupId>```
    ```<artifactId>```spring-boot-starter-web```</artifactId>```
```</dependency>```
```

这将在端口 8080 上启动一个 web 服务器并保持应用程序运行。

### 2.2. 属性

**在启动应用程序之前，我们需要在 _application.properties_ 文件中设置一些必需的属性**：

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/myDb
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
```

让我们理解我们设置的属性：

- _spring.datasource.url_: 服务器的 URL 和数据库的名称。
- _spring.datasource.driver-class-name_: 驱动程序类名。MySQL 连接器提供此驱动程序。
- _spring.jpa.properties.hibernate.dialect_: 我们将其设置为 MySQL。这告诉 JPA 提供者使用 MySQL 方言。

**此外，我们需要设置连接到数据库所需的用户名和密码**：

```properties
spring.datasource.username=root
spring.datasource.password=root
```

### 2.3. 启动应用程序

如果我们启动应用程序，我们将看到以下错误：

```
HHH000342: Could not obtain connection to query metadata
com.mysql.cj.jdbc.exceptions.CommunicationsException: Communications link failure
The last packet sent successfully to the server was 0 milliseconds ago. The driver has not received any packets from the server.
```

这是因为我们在指定的 URL 上没有运行数据库服务器。然而，应用程序的默认行为是执行以下两个操作：

- **JPA 尝试连接到数据库服务器并获取元数据**
- **Hibernate 会尝试创建数据库（如果不存在）。** 这是由于属性 _spring.jpa.hibernate.ddl-auto_ 默认设置为 _create_。

## 3. 不需要数据库运行

为了在没有数据库的情况下继续，我们需要通过覆盖上述两个属性来修复默认行为。

首先，**让我们禁用元数据获取**：

```properties
spring.jpa.properties.hibernate.temp.use_jdbc_metadata_defaults=false
```

然后，**我们禁用自动数据库创建**：

```properties
spring.jpa.hibernate.ddl-auto=none
```

通过设置此属性，**我们已禁用数据库的创建。因此，应用程序没有理由创建连接。**

与之前不同，现在，当我们启动应用程序时，它在没有任何错误的情况下启动。**除非操作需要与数据库交互，否则不会启动连接。**

## 4. 结论

在本文中，我们学习了如何在不需要运行数据库的情况下启动 Spring Boot 应用程序。

我们查看了应用程序查找数据库连接的默认行为。然后我们通过覆盖两个属性来修复默认行为。

一如既往，本文中使用的所有代码示例都可以在 GitHub 上找到。