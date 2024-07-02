---
date: 2022-04-01
category:
  - Java
  - Database
tag:
  - ShardingSphere
  - Database Sharding
head:
  - - meta
    - name: keywords
      content: Java, Database, ShardingSphere, Database Sharding
---
# Apache ShardingSphere 使用指南

## 1. 概述

Apache ShardingSphere 是一个开源项目，由一套集成的数据加工工具组成。它提供了分布式数据库解决方案、事务管理、治理等一套功能。

本教程将提供这个生态系统的快速概览以及入门指南。

## 2. ShardingSphere 是什么？

**Apache ShardingSphere，最初被称为 Sharding-JDBC，是为了解决 Java 应用程序的数据分片问题而创建的。** 然而，现在它已经扩展为包括代理、边车以及处理分片之外的更多工具的一套工具。

在考虑使用 ShardingSphere 时，了解这样一个项目为我们的解决方案带来哪些优势非常重要。以下是一些关键点：

- 性能：鉴于项目的成熟度，驱动程序在效率和性能方面接近原生 JDBC
- 兼容性：驱动程序可以连接到任何实现 JDBC 规范的数据库；除此之外，代理可以被任何使用 MySQL 和 PostgreSQL 的应用程序使用
- 零业务侵入：无业务影响的故障转移
- 低运维和维护成本：快速学习曲线，并且对当前堆栈的干预保持最小
- 安全性和稳定性：在确保两者的同时增加额外的能力
- 弹性扩展：仅扩展
- 开放生态系统：提供出色的灵活性

## 3. 使用案例

现在让我们更深入地了解这些功能，并简要描述每个使用案例在 ShardingSphere 的背景下。

### 3.1. 分片

**分片是将数据库拆分成称为分片的较小部分，分布在多个服务器上的做法。** ShardingSphere 简化了这一过程，允许开发人员更有效地分发他们的数据，提高了应用程序的性能和可扩展性。

### 3.2. 分布式事务

在分布式系统中，事务可能需要在多个数据库上修改数据。**ShardingSphere 提供了一种管理这些分布式事务的机制，确保所有涉及的数据库中的数据一致性。**

### 3.3. 读写分离

这是一种通过将读写操作指向不同的数据库来优化数据库访问的方法。**ShardingSphere 可以自动将读操作路由到副本数据库，将写操作路由到主数据库，从而平衡负载并提高系统的整体性能。**

### 3.4. 数据库网关

ShardingSphere 充当数据库网关，将多个数据库的复杂性抽象为应用程序的统一数据接口。**这允许开发人员像与单个实体交互一样与各种数据库交互，简化了数据库管理。**

### 3.5. 流量治理

ShardingSphere 允许对系统中的数据流量进行细粒度控制。**它提供了数据分片、读写分离等功能，可以有效地在各种资源之间分配流量负载。**

### 3.6. 数据迁移

ShardingSphere 提供了在分片或数据库之间迁移数据的支持。**它帮助在通过添加或删除数据库节点来扩展系统时平滑地重新分配数据。**

### 3.7. 加密

**ShardingSphere 支持在将数据保存到数据库之前自动加密数据，提供了额外的安全层。** 这在处理敏感数据时特别有用，例如用户密码或个人可识别信息。

### 3.8. 数据掩码

数据掩码是使用修改后的内容（字符或其他数据）隐藏原始数据的过程。ShardingSphere 支持数据掩码，这在非生产环境中确保数据隐私至关重要。

### 3.9. 影子

**ShardingSphere 中的 Shadow 功能允许您测试数据库更新、新的 SQL 语句和索引的影响，而不影响实际的生产环境。** 这是通过将某些流量并行路由到实际数据库的影子数据库来完成的。

### 3.10. 可观察性

**ShardingSphere 提供了一种监控分片数据库健康和性能的机制。** 它支持查询跟踪、延迟跟踪、流量洞察等指标，使开发人员能够实时观察和诊断问题。

## 4. 入门

为了介绍这项技术并开始熟悉它，让我们以使用 Maven 的 Spring Boot 应用程序为例。

正如所提到的，项目中有多种功能可用。因此，为了保持简单，我们现在只使用分片功能。这样做让我们知道如何配置并集成解决方案到我们的示例应用程序中。

### 4.1. 依赖项

**第一步是将最新项目依赖项添加到我们的 _pom.xml_ 文件中：**

```xml
`<dependency>`
    `<groupId>`org.apache.shardingsphere`</groupId>`
    `<artifactId>`shardingsphere-jdbc-core`</artifactId>`
    `<version>`5.4.0`</version>`
`</dependency>`
```

这使我们能够开始配置我们的数据源以使用 ShardingSphere。

### 4.2. 数据源配置

现在我们已经拥有了所需的依赖项，我们必须配置我们的数据源以使用 ShardingSphere JDBC 驱动程序。**在这里，我们必须定义我们想要使用的功能，在本例中，是分片功能。**

我们的 _Order_ 表的数据将根据 _order_id_ 字段的模数分布在两个 MySQL 实例上。**为此，我们将创建一个 _sharding.yml_ 文件来保存必要的配置，并将其放在我们的资源文件夹中：**

```yaml
dataSources:
  ds0:
    dataSourceClassName: com.zaxxer.hikari.HikariDataSource
    driverClassName: com.mysql.jdbc.Driver
    jdbcUrl: jdbc:mysql://localhost:13306/ds0?serverTimezone=UTC&useSSL=false&useUnicode=true&characterEncoding=UTF-8
    username: test
    password: test
  ds1:
    dataSourceClassName: com.zaxxer.hikari.HikariDataSource
    driverClassName: com.mysql.jdbc.Driver
    jdbcUrl: jdbc:mysql://localhost:13307/ds1?serverTimezone=UTC&useSSL=false&useUnicode=true&characterEncoding=UTF-8
    username: test
    password: test
rules:
  - !SHARDING
    tables:
      order:
        actualDataNodes: ds${0..1}.order
    defaultDatabaseStrategy:
      standard:
        shardingColumn: order_id
        shardingAlgorithmName: database_inline
    defaultTableStrategy:
      none:
    shardingAlgorithms:
      database_inline:
        type: INLINE
        props:
          algorithm-expression: ds${order_id % 2}
props:
  sql-show: false
```

接下来，我们需要配置 JPA 以使用这些设置。

### 4.3. JPA 配置

现在，我们需要将我们的 JPA/Spring Data 设置连接到我们的 ShardingSphere 数据源。**现在让我们调整我们的 _application.yml_ 以使用刚刚提到的配置：**

```yaml
spring:
  datasource:
    driver-class-name: org.apache.shardingsphere.driver.ShardingSphereDriver
    url: jdbc:shardingsphere:classpath:sharding.yml
  jpa:
    properties:
      hibernate:
        dialect: org.hibernate.dialect.MySQL8Dialect
        ...
```

对于其余部分，我们的应用程序应该遵循默认的 Spring Data JPA 模式，通过定义我们的实体和仓库。例如，在本例中，我们可以考虑以下类：

```java
@Entity
@Table(name = "order")
public class Order {

    @Id
    @Column(name = "order_id")
    private Long orderId;

    @Column(name = "customer_id")
    private Long customerId;

    @Column(name = "total_price")
    private BigDecimal totalPrice;

    @Enumerated(EnumType.STRING)
    @Column(name = "order_status")
    private Status orderStatus;

    @Column(name = "order_date")
    private LocalDate orderDate;

    @Column(name = "delivery_address")
    private String deliveryAddress;

    // ... getter and setters
}
```

这是我们的 _Order_ 类的映射，接下来我们也可以看到它相应的仓库：

```java
public interface OrderRepository extends JpaRepository`<Order, Long>` { }
```

正如我们所观察到的，标准的 Spring JPA。此时不需要其他代码更改。

## 5. 连接点

通过最小的更改，ShardingSphere 使我们能够对我们的表应用分片策略。然而，应用程序中不需要进行重大更改。实际上，只需要在持久层进行配置更改即可。

**得益于 ShardingSphere 与 JDBC 驱动程序的出色集成，我们的应用程序可以利用高级功能，而几乎不需要代码更改。**

## 6. 结论

在本文中，我们迈出了使用 ShardingSphere 的第一步。ShardingSphere 是一个强大的工具，用于管理和操作分布式系统中的数据库，它提供了广泛的高级功能，但抽象了相当多的复杂性。

像往常一样，本文中使用的所有代码示例都可以在 GitHub 上找到。