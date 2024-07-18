---
date: 2022-05-01
category:
  - Spring
  - Transactions
tag:
  - MySQL
  - InnoDB
  - Read-Only
head:
  - - meta
    - name: keywords
      content: Spring, Transactions, MySQL, InnoDB, Read-Only
------
# 使用事务进行只读操作

## 1. 概述

在本文中，我们将讨论只读事务。我们将讨论它们的目的以及如何使用它们，并检查与性能和优化相关的一些细微差别。**为了简单起见，我们将重点关注MySQL的InnoDB引擎**。但请记住，根据数据库/存储引擎的不同，一些信息可能会有所变化。

## 2. 什么是事务？

**事务是一个原子操作，由一个或多个语句组成**。它是原子的，因为该操作中的所有语句要么全部成功（被提交），要么全部失败（被回滚），这意味着全有或全无。事务的原子性由ACID属性中的字母‘A’表示。

**另一个关键点是，所有语句在InnoDB引擎中都会变成事务，如果不是显式的，那么就是隐式的**。当我们将并发性加入等式时，这个概念变得更加难以理解。然后，我们需要澄清另一个ACID属性，即隔离性‘I’。

**理解隔离级别属性对我们来说至关重要，这样我们才能理解性能与一致性保证之间的权衡**。然而，在详细讨论隔离级别之前，请记住，由于InnoDB中的所有语句都是事务，它们可以被提交或回滚。如果没有指定事务，数据库会创建一个，并且根据_autocommit_属性，它可能会被提交或不被提交。

### 2.1. 隔离级别

对于本文，我们将假设MySQL的默认值——可重复读。它在同一事务内提供一致的读取，这意味着第一次读取将建立一个快照（时间点），所有后续读取将与彼此一致。我们可以查阅MySQL的官方文档以获取更多信息。当然，保持这样的快照有其后果，但保证了较高的一致性水平。

不同的数据库可能有不同的名称或隔离级别选项，但大多数可能都是相似的。

## 3. 为什么以及在哪里使用事务？

现在我们更好地理解了事务是什么以及它的不同属性，让我们来谈谈只读事务。正如前面所解释的，在InnoDB引擎中，所有语句都是事务，因此它们可能涉及诸如锁定和快照之类的事情。然而，我们可以看到**与事务协调相关的一些开销，例如用事务ID标记行和其他内部结构，对于简单的查询来说可能并不是必需的**。这就是只读事务发挥作用的地方。

我们可以使用语法_START TRANSACTION READ ONLY_明确定义一个只读事务。MySQL还尝试自动检测只读事务。但在声明时可以应用进一步的优化。**读密集型应用程序可以利用这些优化，并在我们的数据库集群上节省资源利用**。

### 3.1. 应用程序与数据库

我们需要知道，在应用程序中处理持久性层可能涉及许多抽象层。每个层都有不同的责任。然而，为了简化，让我们说最终，这些层影响我们的应用程序如何处理数据库或数据库如何处理数据操作。

当然，并非所有应用程序都有所有这些层，但这代表了一个很好的概括。假设我们有一个Spring应用程序，简而言之，这些层的目的是：

- DAO **:** 作为业务逻辑和持久性细节之间的桥梁
- 事务抽象：处理应用程序级别的事务复杂性（开始，提交，回滚）
- JPA抽象：提供供应商之间的标准API的Java规范
- ORM框架：JPA背后的实际实现（例如，Hibernate）
- JDBC：负责实际与数据库通信

主要收获是，这些因素中的许多可能会影响我们的事务行为。然而，让我们专注于直接影响这种行为的特定属性组。**通常，客户端可以在全局或会话级别定义这些属性**。所有属性的列表很长，因此我们只会讨论其中两个关键的。然而，我们应该已经熟悉它们了。

### 3.2. 事务管理

**JDBC驱动程序从应用程序端启动事务的方式是通过关闭_autocommit_属性**。它相当于_BEGIN TRANSACTION_语句，从那一刻起，所有后续语句必须被提交或回滚才能完成事务。

在全局级别定义，此属性告诉数据库将所有传入的请求视为手动事务，并要求用户提交或回滚。然而，如果用户在会话级别覆盖此定义，这将不再有效。因此，许多驱动程序默认关闭此属性，以保证一致的行为并确保应用程序控制它。

接下来，**我们可以使用_transaction_属性来定义是否允许写操作**。但有一个警告：即使在只读事务中，也可以操作使用_TEMPORARY_关键字创建的表。此属性也具有全局和会话范围，尽管我们通常在应用程序中处理此和其他属性时，通常在会话级别处理。

使用连接池时，由于打开连接和重用它们的性质。处理事务和连接的框架或库必须确保在开始新事务之前会话处于干净状态。

因此，可能会执行一些语句以丢弃任何剩余的待处理更改，并正确设置会话。

我们已经看到，读密集型应用程序可以利用只读事务来优化并节省我们数据库集群中的资源。但是，许多开发人员也忘记了在设置之间切换也会导致数据库的往返，影响连接的吞吐量。

在MySQL中，我们可以在全局级别定义这些属性：

```sql
SET GLOBAL TRANSACTION READ WRITE;
SET autocommit = 0;
/* transaction */
commit;
```

或者，我们可以在会话级别设置属性：

```sql
SET SESSION TRANSACTION READ ONLY;
SET autocommit = 1;
/* transaction */
```

### 3.3. 提示

**在只执行一个查询的事务中，启用_autocommit_属性可能会为我们节省** **往返次数**。如果这是我们应用程序中最常见的原因，使用默认启用_autocommit_的单独只读数据源将更加有效。

现在，如果事务有更多的查询，我们应该使用显式的只读事务。创建一个只读数据源也可以通过避免在写和只读事务之间切换来帮助节省往返次数。但是，**如果我们有混合工作负载，管理一个新数据源的复杂性可能不值得**。

处理具有多个语句的事务时，另一个重要点是要考虑由隔离级别确定的行为，因为它可以改变我们的事务结果，可能会影响性能。为了简单起见，我们的示例中只会考虑默认值（可重复读）。

## 4. 实践应用

现在，从应用程序端，我们将尝试理解如何处理这些属性以及哪些层可以访问这种行为。但是，再次强调，有很多不同的方法可以做到这一点，具体取决于框架，这可能会有所变化。因此，以JPA和Spring为例，我们可以很好地理解在其他情况下会是什么样子。

### 4.1. JPA

让我们看看如何在我们的应用程序中使用JPA/Hibernate有效地定义一个只读事务：

```java
EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory("jpa-unit");
EntityManager entityManager = entityManagerFactory.createEntityManager();
entityManager.unwrap(Session.class).setDefaultReadOnly(true);
entityManager.getTransaction().begin();
entityManager.find(Book.class, id);
entityManager.getTransaction().commit();
```

重要的是要注意**在JPA中没有定义只读事务的标准方法**。因此，我们需要获取实际的Hibernate会话来将其定义为只读。

### 4.2. JPA+Spring

当使用Spring事务管理系统时，事情变得更加简单，如下所示：

```java
@Transactional(readOnly = true)
public Book getBookById(long id) {
    return entityManagerFactory.createEntityManager().find(Book.class, id);
}
```

通过这样做，**Spring承担了打开、关闭和定义事务模式的责任**。然而，有时这也是不必要的，因为在使用Spring Data JPA时，我们已经有这样的配置准备好了。

Spring JPA存储库基类将所有方法标记为只读事务。通过在类级别添加此注释，可以通过仅在方法级别添加_@Transactional_来改变方法的行为。

最后，也可以在配置数据源时定义只读连接并更改_autcommit_属性。正如我们所看到的，如果我们只需要读取，这可以进一步提高应用程序的性能。数据源保存这些配置：

```java
@Bean
public DataSource readOnlyDataSource() {
    HikariConfig config = new HikariConfig();
    config.setJdbcUrl("jdbc:mysql://localhost/baeldung?useUnicode=true&characterEncoding=UTF-8");
    config.setUsername("baeldung");
    config.setPassword("baeldung");
    config.setReadOnly(true);
    config.setAutoCommit(true);
    return new HikariDataSource(config);
}
```

然而，这只有在我们应用程序的主要特征是单一查询资源的情况下才有意义。另外，如果使用Spring Data JPA，需要禁用Spring创建的默认事务。因此，我们只需要将_enableDefaultTransactions_属性设置为_false_：

```java
@Configuration
@EnableJpaRepositories(enableDefaultTransactions = false)
@EnableTransactionManagement
public class Config {
    //Definition of data sources and other persistence related beans
}
```

从这一刻起，我们完全控制并负责在必要时添加_@Transactional(readOnly=true)_。然而，这并不是大多数应用程序的情况，所以我们不应该改变这些配置，除非我们确信我们的应用程序会从中受益。

### 4.3. 路由语句

**在更现实的场景中，我们可能有两个数据源，一个用于写入，一个用于只读**。然后，我们需要在组件级别定义使用哪个数据源。**这种方法更有效地处理读连接，并防止使用不必要的命令来确保会话是干净的并且有适当的设置**。

有多种方法可以实现这一结果，但首先，我们需要创建一个路由数据源类：

```java
public class RoutingDS extends AbstractRoutingDataSource {

    public RoutingDS(DataSource writer, DataSource reader) {
        Map`<Object, Object>` dataSources = new HashMap<>();
        dataSources.put("writer", writer);
        dataSources.put("reader", reader);

        setTargetDataSources(dataSources);
    }

    @Override
    protected Object determineCurrentLookupKey() {
        return ReadOnlyContext.isReadOnly() ? "reader" : "writer";
    }
}
```

还有更多关于路由数据源的知识。然而，总结起来，在我们的案例中，这个类将在应用程序请求时返回适当的数据源。为此，我们使用_ReadOnlyContent_类，它将在运行时保存数据源上下文：

```java
public class ReadOnlyContext {

    private static final ThreadLocal`<AtomicInteger>` READ_ONLY_LEVEL = ThreadLocal.withInitial(() -> new AtomicInteger(0));

    // 默认构造函数

    public static boolean isReadOnly() {
        return READ_ONLY_LEVEL.get().get() > 0;
    }

    public static void enter() {
        READ_ONLY_LEVEL.get().incrementAndGet();
    }

    public static void exit() {
        READ_ONLY_LEVEL.get().decrementAndGet();
    }
}
```

接下来，我们需要定义这些数据源并将它们注册到Spring上下文中。为此，我们只需要使用之前创建的_RoutingDS_类：

```java
//之前提到的注释
public Config {

    //其他bean...

    @Bean
    public DataSource routingDataSource() {
        return new RoutingDS(
            dataSource(false, false),
            dataSource(true, true)
        );
    }

    private DataSource dataSource(boolean readOnly, boolean isAutoCommit) {
        HikariConfig config = new HikariConfig();
        config.setJdbcUrl("jdbc:mysql://localhost/baeldung?useUnicode=true&characterEncoding=UTF-8");
        config.setUsername("baeldung");
        config.setPassword("baeldung");
        config.setReadOnly(readOnly);
        config.setAutoCommit(isAutoCommit);
        return new HikariDataSource(config);
    }

    //其他bean...
}
```

几乎完成了——现在，**让我们创建一个注解来告诉Spring何时将组件包装在只读上下文中**。为此，我们将使用_@ReaderDS_注解：

```java
@Inherited
@Retention(RetentionPolicy.RUNTIME)
public @interface ReaderDS { }
```

最后，我们使用AOP将组件执行包装在上下文中：

```java
@Aspect
@Component
public class ReadOnlyInterception {
    @Around("@annotation(com.baeldung.readonlytransactions.mysql.spring.ReaderDS)")
    public Object aroundMethod(ProceedingJoinPoint joinPoint) throws Throwable {
        try {
            ReadOnlyContext.enter();
            return joinPoint.proceed();
        } finally {
            ReadOnlyContext.exit();
        }
    }
}
```

通常，我们希望尽可能在最高级别的点添加注解。不过，为了简单起见，我们将在存储库层添加注解，并且组件中只有一个查询：

```java
public interface BookRepository extends JpaRepository`<BookEntity, Long>` {

    @ReaderDS
    @Query("Select t from BookEntity t where t.id = ?1")
    BookEntity get(Long id);
}
```

**正如我们所观察到的，这种设置允许我们通过利用整个只读事务并避免会话上下文切换，更有效地处理只读操作**。因此，这可以显著提高我们应用程序的吞吐量和响应性。

## 5. 结论

在本文中，我们探讨了只读事务及其好处。我们还了解了MySQL InnoDB引擎如何处理它们以及如何配置影响我们应用程序事务的主要属性。此外，我们还讨论了通过使用专用资源（如专用数据源）进行额外改进的可能性。像往常一样，本文中使用的所有代码示例都可以在GitHub上找到。