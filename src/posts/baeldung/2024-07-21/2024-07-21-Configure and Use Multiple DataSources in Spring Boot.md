---
date: 2022-04-01
category:
  - Spring Boot
  - 数据源
tag:
  - Spring Boot
  - 多数据源
  - 数据库配置
head:
  - - meta
    - name: keywords
      content: Spring Boot, 多数据源, 数据库配置
------
# Spring Boot中配置和使用多个数据源

## 1. 概述

Spring Boot应用程序的典型场景是将数据存储在单个关系型数据库中。但有时我们需要访问多个数据库。

在本教程中，我们将学习如何在Spring Boot中配置和使用多个数据源。

要了解如何处理单个数据源，请查看我们对Spring Data JPA的介绍。

## 2. 默认行为

让我们回顾一下在Spring Boot中声明数据源在_application.yml_中的样子：

```yaml
spring:
  datasource:
    url: ...
    username: ...
    password: ...
    driverClassname: ...
```

在内部，Spring将这些设置映射到_org.springframework.boot.autoconfigure.jdbc.DataSourceProperties_的一个实例。

让我们看看实现：

```java
@ConfigurationProperties(prefix = "spring.datasource")
public class DataSourceProperties implements BeanClassLoaderAware, InitializingBean {

    // ...

    /**
     * JDBC驱动程序的完全限定名称。默认情况下根据URL自动检测。
     */
    private String driverClassName;

    /**
     * 数据库的JDBC URL。
     */
    private String url;

    /**
     * 数据库的登录用户名。
     */
    private String username;

    /**
     * 数据库的登录密码。
     */
    private String password;

    // ...
}
```

我们应该指出_@ConfigurationProperties_注解，它自动将配置属性映射到Java对象。

## 3. 扩展默认设置

因此，要使用多个数据源，我们需要在Spring的应用程序上下文中声明具有不同映射的多个bean。

我们可以通过使用配置类来实现这一点：

```java
@Configuration
public class TodoDatasourceConfiguration {

    @Bean
    @ConfigurationProperties("spring.datasource.todos")
    public DataSourceProperties todosDataSourceProperties() {
        return new DataSourceProperties();
    }
}

@Configuration
public class TopicDatasourceConfiguration {

    @Bean
    @ConfigurationProperties("spring.datasource.topics")
    public DataSourceProperties topicsDataSourceProperties() {
        return new DataSourceProperties();
    }
}
```

数据源的配置必须如下所示：

```yaml
spring:
  datasource:
    todos:
      url: ...
      username: ...
      password: ...
      driverClassName: ...
    topics:
      url: ...
      username: ...
      password: ...
      driverClassName: ...
```

然后我们可以使用_DataSourceProperties_对象来创建数据源：

```java
@Bean
public DataSource todosDataSource() {
    return todosDataSourceProperties()
      .initializeDataSourceBuilder()
      .build();
}

@Bean
public DataSource topicsDataSource() {
    return topicsDataSourceProperties()
      .initializeDataSourceBuilder()
      .build();
}
```

## 4. Spring Data JDBC

当使用Spring Data JDBC时，我们还需要为每个_DataSource_配置一个_JdbcTemplate_实例：

```java
@Bean
public JdbcTemplate todosJdbcTemplate(@Qualifier("todosDataSource") DataSource dataSource) {
    return new JdbcTemplate(dataSource);
}

@Bean
public JdbcTemplate topicsJdbcTemplate(@Qualifier("topicsDataSource") DataSource dataSource) {
    return new JdbcTemplate(dataSource);
}
```

然后我们也可以通过指定_@Qualifier_来使用它们：

```java
@Autowired
@Qualifier("topicsJdbcTemplate")
JdbcTemplate jdbcTemplate;
```

## 5. Spring Data JPA

当使用Spring Data JPA时，我们希望使用如下所示的存储库，其中_Todo_是实体：

```java
public interface TodoRepository extends JpaRepository`<Todo, Long>` {}
```

因此，我们需要为每个数据源声明_EntityManager_工厂：

```java
@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(
  basePackageClasses = Todo.class,
  entityManagerFactoryRef = "todosEntityManagerFactory",
  transactionManagerRef = "todosTransactionManager"
)
public class TodoJpaConfiguration {

    @Bean
    public LocalContainerEntityManagerFactoryBean todosEntityManagerFactory(
      @Qualifier("todosDataSource") DataSource dataSource,
      EntityManagerFactoryBuilder builder) {
        return builder
          .dataSource(dataSource)
          .packages(Todo.class)
          .build();
    }

    @Bean
    public PlatformTransactionManager todosTransactionManager(
      @Qualifier("todosEntityManagerFactory") LocalContainerEntityManagerFactoryBean todosEntityManagerFactory) {
        return new JpaTransactionManager(Objects.requireNonNull(todosEntityManagerFactory.getObject()));
    }

}
```

**让我们看看一些我们应该意识到的限制。**

我们需要分割包，以允许每个数据源使用一个_@EnableJpaRepositories_。

不幸的是，要获取_EntityManagerFactoryBuilder_注入，我们需要将其中一个数据源声明为_@Primary_。

这是因为_EntityManagerFactoryBuilder_在_org.springframework.boot.autoconfigure.orm.jpa.JpaBaseConfiguration_中声明，这个类需要注入一个单一的数据源。通常，框架的某些部分可能不会预期配置了多个数据源。

## 6. 配置Hikari连接池

如果我们想要配置Hikari，我们只需要在数据源定义中添加一个_@ConfigurationProperties_：

```java
@Bean
@ConfigurationProperties("spring.datasource.todos.hikari")
public DataSource todosDataSource() {
    return todosDataSourceProperties()
      .initializeDataSourceBuilder()
      .build();
}
```

然后我们可以将以下行插入到_application.properties_文件中：

```properties
spring.datasource.todos.hikari.connectionTimeout=30000
spring.datasource.todos.hikari.idleTimeout=600000
spring.datasource.todos.hikari.maxLifetime=1800000
```

## 7. 结论

在本文中，我们学习了如何在Spring Boot中配置多个数据源。

我们看到需要一些配置，并且当偏离标准时可能会有陷阱，但最终这是可能的。

像往常一样，所有的代码都可以在GitHub上找到。