---
date: 2024-07-25
category:
  - Spring Data Cassandra
  - Logging Queries
tag:
  - Spring Boot
  - Apache Cassandra
  - NoSQL
head:
  - - meta
    - name: keywords
      content: Spring Data Cassandra, Logging Queries, Spring Boot, Apache Cassandra, NoSQL
---
# 使用Spring Data Cassandra记录查询

Apache Cassandra是一个**可扩展的分布式NoSQL数据库**。Cassandra在节点之间传输数据，并提供持续的可用性，没有单点故障。实际上，Cassandra能够以异常的性能处理大量数据。

当开发使用数据库的应用程序时，能够记录和调试执行的查询是非常重要的。在本教程中，我们将探讨在使用Apache Cassandra与Spring Boot时如何记录查询和语句。

在我们的示例中，我们将使用Spring Data仓库抽象和_Testcontainers_库。我们将看到如何通过Spring配置配置Cassandra查询记录。此外，我们将探索Datastax请求记录器。我们可以为更高级的记录配置这个内置组件。

## 2. 设置测试环境

为了演示查询记录，我们需要设置一个测试环境。首先，我们将使用Spring Data为Apache Cassandra设置测试数据。接下来，我们将使用_Testcontainers_库来运行Cassandra数据库容器进行集成测试。

### 2.1. Cassandra仓库

Spring Data使我们能够基于常见的Spring接口创建Cassandra仓库。首先，让我们通过定义一个简单的DAO类开始：

```java
@Table
public class Person {

    @PrimaryKey
    private UUID id;
    private String firstName;
    private String lastName;

    public Person(UUID id, String firstName, String lastName) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    // getters, setters, equals 和 hash code
}
```

然后，我们将通过扩展_CassandraRepository_接口为我们的DAO定义一个Spring Data仓库：

```java
@Repository
public interface PersonRepository extends CassandraRepository`<Person, UUID>` {}
```

最后，我们将在_application.properties_文件中添加两个属性：

```properties
spring.data.cassandra.schema-action=create_if_not_exists
spring.data.cassandra.local-datacenter=datacenter1
```

结果，Spring Data将自动为我们创建注释的表。

我们应该注意到，对于生产系统，不建议使用_create_if_not_exists_选项。

作为替代方案，可以通过从标准根类路径加载_schema.sql_脚本来创建表。

### 2.2. Cassandra容器

作为下一步，让我们配置并暴露一个Cassandra容器在特定端口上：

```java
@Container
public static final CassandraContainer cassandra =
  (CassandraContainer) new CassandraContainer("cassandra:3.11.2").withExposedPorts(9042);
```

在将容器用于集成测试之前，我们需要覆盖Spring Data所需的测试属性，以建立与它的连接：

```java
TestPropertyValues.of(
  "spring.data.cassandra.keyspace-name=" + KEYSPACE_NAME,
  "spring.data.cassandra.contact-points=" + cassandra.getContainerIpAddress(),
  "spring.data.cassandra.port=" + cassandra.getMappedPort(9042)
).applyTo(configurableApplicationContext.getEnvironment());

createKeyspace(cassandra.getCluster());
```

最后，在创建任何对象/表之前，我们需要**创建一个Cassandra keyspace**。一个keyspace类似于RDBMS中的数据库。

### 2.3. 集成测试

现在，我们已经准备好开始编写我们的集成测试。

我们对**记录选择、插入和删除查询**感兴趣。因此，我们将编写一些触发这些不同类型的查询的测试。

首先，我们将编写一个测试来保存和更新一个人的记录。我们期望这个测试执行两个插入和一个选择数据库查询：

```java
@Test
void givenExistingPersonRecord_whenUpdatingIt_thenRecordIsUpdated() {
    UUID personId = UUIDs.timeBased();
    Person existingPerson = new Person(personId, "Luka", "Modric");
    personRepository.save(existingPerson);
    existingPerson.setFirstName("Marko");
    personRepository.save(existingPerson);

    List``<Person>`` savedPersons = personRepository.findAllById(List.of(personId));
    assertThat(savedPersons.get(0).getFirstName()).isEqualTo("Marko");
}
```

然后，我们将编写一个测试来保存和删除现有的人员记录。我们期望这个测试执行一个插入、删除和选择数据库查询：

```java
@Test
void givenExistingPersonRecord_whenDeletingIt_thenRecordIsDeleted() {
    UUID personId = UUIDs.timeBased();
    Person existingPerson = new Person(personId, "Luka", "Modric");

    personRepository.delete(existingPerson);

    List``<Person>`` savedPersons = personRepository.findAllById(List.of(personId));
    assertThat(savedPersons.isEmpty()).isTrue();
}
```

默认情况下，我们不会在控制台中观察到任何数据库查询被记录。

使用Spring Data for Apache Cassandra版本2.0或更高版本，可以在_application.properties_中为_CqlTemplate_类设置日志级别：

```properties
logging.level.org.springframework.data.cassandra.core.cql.CqlTemplate=DEBUG
```

因此，通过将日志级别设置为DEBUG，我们启用了所有执行的查询和准备语句的记录：

```plaintext
2021-09-25 12:41:58.679 DEBUG 17856 --- [           main] o.s.data.cassandra.core.cql.CqlTemplate:
  Executing CQL statement [CREATE TABLE IF NOT EXISTS person
  (birthdate date, firstname text, id uuid, lastname text, lastpurchaseddate timestamp, lastvisiteddate timestamp, PRIMARY KEY (id))];

2021-09-25 12:42:01.204 DEBUG 17856 --- [           main] o.s.data.cassandra.core.cql.CqlTemplate:
  Preparing statement [INSERT INTO person (birthdate,firstname,id,lastname,lastpurchaseddate,lastvisiteddate)
  VALUES (?,?,?,?,?,)] using org.springframework.data.cassandra.core.CassandraTemplate$PreparedStatementHandler@4d16975b

2021-09-25 12:42:01.253 DEBUG 17856 --- [           main] o.s.data.cassandra.core.cql.CqlTemplate:
  Executing prepared statement [INSERT INTO person (birthdate,firstname,id,lastname,lastpurchaseddate,lastvisiteddate) VALUES (?,?,?,?,?,)]

2021-09-25 12:42:01.279 DEBUG 17856 --- [           main] o.s.data.cassandra.core.cql.CqlTemplate:
  Preparing statement [INSERT INTO person (birthdate,firstname,id,lastname,lastpurchaseddate,lastvisiteddate)
  VALUES (?,?,?,?,?,)] using org.springframework.data.cassandra.core.CassandraTemplate$PreparedStatementHandler@539dd2d0

2021-09-25 12:42:01.290 DEBUG 17856 --- [           main] o.s.data.cassandra.core.cql.CqlTemplate:
  Executing prepared statement [INSERT INTO person (birthdate,firstname,id,lastname,lastpurchaseddate,lastvisiteddate) VALUES (?,?,?,?,?,)]

2021-09-25 12:42:01.351 DEBUG 17856 --- [           main] o.s.data.cassandra.core.cql.CqlTemplate:
  Preparing statement [SELECT * FROM person WHERE id IN (371bb4a0-1ded-11ec-8cad-934f1aec79e6)]
  using org.springframework.data.cassandra.core.CassandraTemplate$PreparedStatementHandler@3e61cffd

2021-09-25 12:42:01.370 DEBUG 17856 --- [           main] o.s.data.cassandra.core.cql.CqlTemplate:
  Executing prepared statement [SELECT * FROM person WHERE id IN (371bb4a0-1ded-11ec-8cad-934f1aec79e6)]
```

不幸的是，使用这个解决方案，我们不会看到在语句中使用的绑定值的输出。

## 4. Datastax请求跟踪器

DataStax请求跟踪器是一个会话范围的**组件，它会被通知每一个Cassandra请求的结果**。

DataStax Java驱动程序为Apache Cassandra提供了一个可选的请求跟踪器实现，用于记录所有请求。

### 4.1. Noop请求跟踪器

默认的请求跟踪器实现称为_NoopRequestTracker_。因此，它什么也不做：

```java
System.setProperty("datastax-java-driver.advanced.request-tracker.class", "NoopRequestTracker");
```

要设置一个不同的跟踪器，我们应该在Cassandra配置中指定一个实现_RequestTracker_的类，或者通过系统属性。

### 4.2. 请求记录器

_RequestLogger_是一个**内置的_RequestTracker_实现，它记录每一个请求**。

我们可以通过设置特定的DataStax Java驱动程序系统属性来启用它：

```java
System.setProperty("datastax-java-driver.advanced.request-tracker.class", "RequestLogger");
System.setProperty("datastax-java-driver.advanced.request-tracker.logs.success.enabled", "true");
System.setProperty("datastax-java-driver.advanced.request-tracker.logs.slow.enabled", "true");
System.setProperty("datastax-java-driver.advanced.request-tracker.logs.error.enabled", "true");
```

在这个例子中，我们启用了所有成功、慢和失败请求的记录。

现在，当我们运行我们的测试时，我们将在日志中观察到所有执行的数据库查询：

```plaintext
2021-09-25 13:06:31.799  INFO 11172 --- [        s0-io-4] c.d.o.d.i.core.tracker.RequestLogger:
  [s0|90232530][Node(endPoint=localhost/[0:0:0:0:0:0:0:1]:49281, hostId=c50413d5-03b6-4037-9c46-29f0c0da595a, hashCode=68c305fe)]
  Success (6 ms) [6 values] INSERT INTO person (birthdate,firstname,id,lastname,lastpurchaseddate,lastvisiteddate)
  VALUES (?,?,?,?,?,) [birthdate=NULL, firstname='Luka', id=a3ad6890-1df0-11ec-a295-7d319da1858a, lastname='Modric', lastpurchaseddate=NULL, lastvisiteddate=NULL]

2021-09-25 13:06:31.811  INFO 11172 --- [        s0-io-4] c.d.o.d.i.core.tracker.RequestLogger:
  [s0|778232359][Node(endPoint=localhost/[0:0:0:0:0:0:0:1]:49281, hostId=c50413d5-03b6-4037-9c46-29f0c0da595a, hashCode=68c305fe)]
  Success (4 ms) [6 values] INSERT INTO person (birthdate,firstname,id,lastname,lastpurchaseddate,lastvisiteddate)
  VALUES (?,?,?,?,?,) [birthdate=NULL, firstname='Marko', id=a3ad6890-1df0-11ec-a295-7d319da1858a, lastname='Modric', lastpurchaseddate=NULL, lastvisiteddate=NULL]

2021-09-25 13:06:31.847  INFO 11172 --- [        s0-io-4] c.d.o.d.i.core.tracker.RequestLogger:
  [s0|1947131919][Node(endPoint=localhost/[0:0:0:0:0:0:0:1]:49281, hostId=c50413d5-03b6-4037-9c46-29f0c0da595a, hashCode=68c305fe)]
  Success (5 ms) [0 values] SELECT * FROM person WHERE id IN (a3ad6890-1df0-11ec-a295-7d319da1858a)
```

我们将看到所有的请求都被记录在类别_com.datastax.oss.driver.internal.core.tracker.RequestLogger_下。

此外，**所有在语句中使用的绑定值也会默认被记录**。

### 4.3. 绑定值

内置的**_RequestLogger_是一个非常可定制的组件**。我们可以使用以下系统属性配置绑定值的输出：

```java
System.setProperty("datastax-java-driver.advanced.request-tracker.logs.show-values", "true");
System.setProperty("datastax-java-driver.advanced.request-tracker.logs.max-value-length", "100");
System.setProperty("datastax-java-driver.advanced.request-tracker.logs.max-values", "100");
```

如果值的格式化表示比_max-value-length_属性定义的值长，将会被截断。

使用_max-values_属性，我们可以定义要记录的绑定值的最大数量。

### 4.4. 其他选项

在我们的第一个例子中，我们启用了慢请求的记录。我们可以使用_threshold_属性来将成功的请求分类为慢：

```java
System.setProperty("datastax-java-driver.advanced.request-tracker.logs.slow.threshold ", "1 second");
```

默认情况下，失败请求的堆栈跟踪会被记录。如果我们禁用它们，我们只会在日志中看到异常的字符串表示：

```java
System.setProperty("datastax-java-driver.advanced.request-tracker.logs.show-stack-trace", "true");
```

成功和慢请求使用INFO日志级别。另一方面，失败请求使用ERROR级别。

## 5. 结论

在本文中，我们探讨了**在使用Apache Cassandra与Spring Boot时记录查询和语句**。

在示例中，我们涵盖了为Apache Cassandra配置Spring Data的日志级别。我们看到了Spring Data会记录查询，但不会记录绑定值。最后，我们探索了Datastax请求跟踪器。它是一个非常可定制的组件，我们可以使用它来记录Cassandra查询及其绑定值。

一如既往，源代码可以在GitHub上找到。