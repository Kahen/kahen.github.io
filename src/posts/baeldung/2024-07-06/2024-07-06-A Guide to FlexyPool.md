---
date: 2023-04-01
category:
  - Spring
  - FlexyPool
tag:
  - Spring Boot
  - H2
  - HikariCP
head:
  - - meta
    - name: keywords
      content: FlexyPool, Spring Boot, HikariCP, 数据库连接池, 连接池管理
---

# FlexyPool 使用指南

## 1. 概述

在本教程中，我们将学习如何使用 FlexyPool 与 Spring Boot 和 H2 结合 HikariCP。这是一个构建在主要连接池之上的强大连接池管理器。

## 2. FlexyPool 是什么？

连接池是现代 Web 应用程序的重要方面。因为它确保数据库连接在多个客户端之间共享。这就是该技术允许更快、更有效地访问数据库的方式。

然而，管理连接池可能是一个复杂且具有挑战性的任务。当客户端数量和应用程序复杂性增加时，这一点尤为明显。这正是 FlexyPool 派上用场的地方。

FlexyPool 是一个强大的连接池管理工具。实际上，它使管理数据库连接和优化性能变得容易。简单来说，FlexyPool 充当主要连接池的代理，如 Hikari、C3P0、DBCP2、Tomcat 和 Vibur。**为了实现其目标，该库提供了指标和故障转移策略，以帮助按需调整给定池的大小**：

### 2.1. FlexyPool 属性

FlexyPool 提供了两个重要属性：

- **connectionAcquireTimeThresholdMillis**：指定连接获取请求的时间阈值。超过此时间，将发布 ConnectionAcquireTimeThresholdExceededEvent。
- **connectionLeaseTimeThresholdMillis**：这是连接可以从池中租用的最大时间，超过此时间将返回池。当池超过此阈值时，FlexyPool 会发布 ConnectionLeaseTimeThresholdExceededEvent。

### 2.2. FlexyPool 策略

**FlexyPool 提供两种策略来响应连接池中的连接获取失败。**

第一种策略是 IncrementPoolOnTimeoutConnectionAcquiringStrategy。使用此策略，如果在连接获取期间发生超时，FlexyPool 将增加目标连接池的最大大小。该策略有两个选项 - maxOverflowPoolSize 和 timeoutMillis。

maxOverflowPoolSize 设置目标连接池可以扩展到的最大限制。

timeoutMillis 设置尝试池增加之前的持续时间。默认值为连接池超时值。

策略 RetryConnectionAcquiringStrategy 指示 FlexyPool 在放弃之前，从池中重试获取连接 retryAttempts 次。retryAttempts 代表尝试的重试次数。

我们将在 FlexyPoolDataSource 配置中设置所有这些策略。

## 3. 安装

首先，让我们安装 HikariCP 连接池：

```xml
```<dependency>```
    ````<groupId>````com.zaxxer````</groupId>````
    ````<artifactId>````HikariCP````</artifactId>````
    ```<version>```5.1.0```</version>```
```</dependency>```
```

接下来，我们将添加 FlexyPool 依赖项、HikariCP 适配器和 Micrometer 适配器：

```xml
```<dependency>```
    ````<groupId>````com.vladmihalcea.flexy-pool````</groupId>````
    ````<artifactId>````flexy-hikaricp````</artifactId>````
    ```<version>```2.2.3```</version>```
    `<exclusions>`
        `<exclusion>`
            ````<groupId>````com.vladmihalcea.flexy-pool````</groupId>````
            ````<artifactId>````flexy-dropwizard-metrics````</artifactId>````
        `</exclusion>`
    `</exclusions>`
```</dependency>```
```

```xml
```<dependency>```
    ````<groupId>````com.vladmihalcea.flexy-pool````</groupId>````
    ````<artifactId>````flexy-micrometer-metrics````</artifactId>````
    ```<version>```2.2.3```</version>```
```</dependency>```
```

由于我们使用 Micrometer 作为指标实现，我们排除了默认的 Dropwizard-Metrics。**此外，FlexyPool 还为其他支持的连接池框架提供了安装指南**。如果使用的 Java 版本低于 1.8，也建议查阅它。

## 4. 配置

**要让 FlexyPool 运行起来，我们首先需要一个 FlexyPoolDataSource 数据源。**它需要一个特定于使用的连接池的数据源，在我们的情况下是 HikariDataSource 数据源。让我们设置它们。

### 4.1. HikariDataSource 配置

首先，我们使用内存中的 H2 数据库配置 Hikari 数据源：

```java
@Bean
public HikariDataSource hikariDataSource() {
    HikariConfig config = new HikariConfig();
    config.setJdbcUrl("jdbc:h2:mem:test;DB_CLOSE_DELAY=-1;INIT=runscript from 'classpath:/db.sql'");
    config.setUsername("");
    config.setPassword("");
    config.addDataSourceProperty("cachePrepStmts", "true");
    config.addDataSourceProperty("prepStmtCacheSize", "250");
    config.addDataSourceProperty("prepStmtCacheSqlLimit", "2048");
    config.addDataSourceProperty("minimumPoolSize", "1");
    config.addDataSourceProperty("maximumPoolSize", "3");
    config.addDataSourceProperty("connectionTimeout", "1000");
    return new HikariDataSource(config);
}
```

在这里，我们添加了 maximumPoolSize 和 connectionTimeout 属性。正如我们之前看到的，它们对 FlexyPool 的 IncrementPoolOnTimeoutConnectionAcquiringStrategy 很有用。

接下来，我们使用 HikariDataSource 配置一个配置 Bean：

```java
@Bean
public Configuration`````<HikariDataSource>````` flexypoolConfiguration() {
    HikariDataSource dataSource = hikariDataSource();
    return new Configuration.Builder<>(UUID.randomUUID().toString(), dataSource, HikariCPPoolAdapter.FACTORY)
      .setMetricsFactory(MicrometerMetrics::new)
      .setConnectionProxyFactory(ConnectionDecoratorFactoryResolver.INSTANCE.resolve())
      .setMetricLogReporterMillis(TimeUnit.SECONDS.toMillis(5))
      .setMetricNamingUniqueName(UniqueNamingStrategy.INSTANCE)
      .setJmxEnabled(true)
      .setJmxAutoStart(true)
      .setConnectionAcquireTimeThresholdMillis(50L)
      .setConnectionLeaseTimeThresholdMillis(250L)
      .setEventListenerResolver(() -> Arrays.asList(
        new ConnectionAcquireTimeoutEventListener(),
        new ConnectionAcquireTimeThresholdExceededEventListener(),
        new ConnectionLeaseTimeThresholdExceededEventListener()))
      .build();
}
```

此配置：

- 启用了 JMX 报告
- 将指标实现设置为 Micrometer。Micrometer 适配器默认使用 SimpleMetricsRegistry。但是，它可以定制以使用集成的监控报告工具，如 Ganglia 或 Graphite。
- 为各种连接事件添加了侦听器：ConnectionAcquireTimeoutEvent、ConnectionAcquireTimeThresholdExceededEvent 和 ConnectionLeaseTimeThresholdExceeded。值得注意的是，这些侦听器是同步的，不应执行耗时的任务。
- 将连接租用时间设置为 250 毫秒
- 将连接获取时间设置为 50 毫秒

### 4.2. FlexyPoolDataSource 配置

让我们配置一个 FlexyPoolDataSource Bean：

```java
@Bean(initMethod = "start", destroyMethod = "stop")
public FlexyPoolDataSource`````<HikariDataSource>````` flexypoolDataSource() {
    Configuration`````<HikariDataSource>````` configuration = flexypoolConfiguration();
    return new FlexyPoolDataSource<>(
      configuration,
      new IncrementPoolOnTimeoutConnectionAcquiringStrategy.Factory<>(),
      new RetryConnectionAcquiringStrategy.Factory<>());
}
```

这个 FlexyPoolDataSource 在连接超时时向 Hikari 池添加五个额外的连接。如果池无法检索到连接，它还最多重试两次。

最后，我们可以通过调用 FlexyPoolDataSource 来运行我们的应用程序：

```java
@SpringBootApplication
public class FlexypoolDemoApplication {

    private static FlexyPoolDataSource`````<HikariDataSource>````` poolDataSource;

    public FlexypoolDemoApplication(FlexyPoolDataSource`````<HikariDataSource>````` poolDataSource) {
        FlexypoolDemoApplication.poolDataSource = poolDataSource;
    }

    public static List```<Employee>``` getEmployees() throws SQLException {
        String SQL_QUERY = "select * from emp";
        List```<Employee>``` employees;
        try (Connection con = poolDataSource.getConnection(); PreparedStatement pst = con.prepareStatement(SQL_QUERY); ResultSet rs = pst.executeQuery();) {
            employees = new ArrayList<>();
            Employee employee;
            while (rs.next()) {
                employee = new Employee();
                employee.setEmpNo(rs.getInt("empno"));
                employee.setEname(rs.getString("ename"));
                employee.setJob(rs.getString("job"));
                employee.setMgr(rs.getInt("mgr"));
                employee.setHiredate(rs.getDate("hiredate"));
                employee.setSal(rs.getInt("sal"));
                employee.setComm(rs.getInt("comm"));
                employee.setDeptno(rs.getInt("deptno"));
                employees.add(employee);
            }
        }
        return employees;
    }

    public static void main(String[] args) throws SQLException {
        SpringApplication.run(FlexypoolDemoApplication.class, args);
        List```<Employee>``` employees = getEmployees();
        System.out.println(employees);
    }
}
```

## 5. 结论

在本文中，我们学习了如何使用 HikariCP 连接池与 Spring Boot 和 H2 结合使用 FlexyPool。

