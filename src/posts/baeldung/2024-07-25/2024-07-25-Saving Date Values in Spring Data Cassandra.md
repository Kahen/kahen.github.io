---
date: 2021-10-01
category:
  - Spring Data Cassandra
  - Tutorial
tag:
  - Java
  - Cassandra
  - Spring Data
head:
  - - meta
    - name: keywords
      content: Spring Data Cassandra, Java, NoSQL, Date Types
------
# 在Spring Data Cassandra中保存日期值

Apache Cassandra是一个可扩展的NoSQL数据库。它提供了**无单点故障的持续可用性**。此外，Cassandra能够以卓越的性能处理大量数据。

在本教程中，我们将探讨如何使用Spring Data和Docker连接到Cassandra。此外，我们将利用Spring Data的存储库抽象来处理Cassandra的数据层。

我们将看到如何在Cassandra中保存不同的Java日期值。最后，我们将研究这些日期值是如何映射到Cassandra类型的。

Spring Data for Apache Cassandra为Spring开发人员提供了**一个熟悉的接口来使用Cassandra**。这个项目将核心Spring概念应用于使用Cassandra数据存储的解决方案开发。

Spring Data允许我们基于常见的Spring接口创建存储库。它还允许使用_QueryBuilders_来消除学习Cassandra查询语言（CQL）的需要。该项目提供了简单的注释，以实现丰富的对象映射。

有两个重要的辅助类：
- _CqlTemplate_ 处理常见的数据访问操作
- _CassandraTemplate_ 提供对象映射

该项目与Spring的核心JDBC支持有显著的相似之处。

### 3.1. Cassandra容器

让我们使用_Testcontainers_库配置并启动Cassandra。首先，我们将定义一个Cassandra容器并将其暴露到特定端口：

```java
@Container
public static final CassandraContainer cassandra = (CassandraContainer) new CassandraContainer("cassandra:3.11.2")
    .withExposedPorts(9042);
```

接下来，我们需要覆盖Spring Data所需的测试属性，以便能够与Cassandra容器建立连接：

```java
TestPropertyValues.of(
    "spring.data.cassandra.keyspace-name=" + KEYSPACE_NAME,
    "spring.data.cassandra.contact-points=" + cassandra.getContainerIpAddress(),
    "spring.data.cassandra.port=" + cassandra.getMappedPort(9042)
).applyTo(configurableApplicationContext.getEnvironment());
```

最后，在创建任何对象/表之前，我们需要创建一个keyspace：

```sql
session.execute("CREATE KEYSPACE IF NOT EXISTS " + KEYSPACE_NAME + " WITH replication = {'class':'SimpleStrategy','replication_factor':'1'};");
```

一个keyspace在Cassandra中只是一个数据容器。实际上，它非常类似于关系数据库管理系统中的数据库。

### 3.2. Cassandra存储库

Spring Data的**存储库支持大大简化了DAO的实现**。让我们从创建一个简单的DAO开始。

_@Table_注解在_org.springframework.data.cassandra.core.mapping_包中提供，它启用了领域对象映射：

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

    //getters, setters, equals 和 hash code
}
```

接下来，我们将通过扩展_CassandraRepository_接口为我们的DAO定义一个Spring Data存储库：

```java
@Repository
public interface PersonRepository extends CassandraRepository`<Person, UUID>` {}
```

最后，在开始编写集成测试之前，我们需要定义两个额外的属性：

```properties
spring.data.cassandra.schema-action=create_if_not_exists
spring.data.cassandra.local-datacenter=datacenter1
```

第一个属性将确保Spring Data为我们自动创建注释的表。

我们应该注意到，**这种设置不推荐用于生产系统**。

### 4. 使用日期值

在Spring Data for Apache Cassandra的现代版本中，使用日期值相当直接。**Spring Data将自动确保Java日期类型正确映射**到和从Apache Cassandra表示。

#### 4.1. LocalDate类型

让我们向我们的_Person_ DAO添加一个名为_birthDate_的新字段，类型为_LocalDate_：

```java
@Test
public void givenValidPersonUsingLocalDate_whenSavingIt_thenDataIsPersisted() {
    UUID personId = UUIDs.timeBased();
    Person newPerson = new Person(personId, "Luka", "Modric");
    newPerson.setBirthDate(LocalDate.of(1985, 9, 9));
    personRepository.save(newPerson);

    List```<Person>``` savedPersons = personRepository.findAllById(List.of(personId));
    assertThat(savedPersons.get(0)).isEqualTo(newPerson);
}
```

**Spring Data自动将Java的_LocalDate_转换为Cassandra的_date_类型**。在将记录保存和从Cassandra获取记录后，DAO中的_LocalDate_值是相同的。

#### 4.2. LocalDateTime类型

让我们向我们的_Person_ DAO添加另一个名为_lastVisitedDate_的字段，类型为_LocalDateTime_：

```java
@Test
public void givenValidPersonUsingLocalDateTime_whenSavingIt_thenDataIsPersisted() {
    UUID personId = UUIDs.timeBased();
    Person newPerson = new Person(personId, "Luka", "Modric");
    newPerson.setLastVisitedDate(LocalDateTime.of(2021, 7, 13, 11, 30));
    personRepository.save(newPerson);

    List```<Person>``` savedPersons = personRepository.findAllById(List.of(personId));
    assertThat(savedPersons.get(0)).isEqualTo(newPerson);
}
```

**Spring Data自动将Java的_LocalDateTime_转换为Cassandra的_timestamp_类型**。在将记录保存和从Cassandra获取记录后，DAO中的_LocalDateTime_值是相同的。

#### 4.3. 旧版Date类型

最后，让我们向我们的_Person_ DAO添加一个名为_lastPurchasedDate_的字段，使用旧版类型_Date_：

```java
@Test
public void givenValidPersonUsingLegacyDate_whenSavingIt_thenDataIsPersisted() {
    UUID personId = UUIDs.timeBased();
    Person newPerson = new Person(personId, "Luka", "Modric");
    newPerson.setLastPurchasedDate(new Date(LocalDate.of(2021, 7, 13).toEpochDay()));
    personRepository.save(newPerson);

    List```<Person>``` savedPersons = personRepository.findAllById(List.of(personId));
    assertThat(savedPersons.get(0)).isEqualTo(newPerson);
}
```

与_LocalDateTime_一样，**Spring Data将Java的_java.util.Date_转换为Cassandra的_timestamp_类型**。

#### 4.4. 映射的Cassandra类型

让我们使用CQLSH检查保存在Cassandra中的数据。CQLSH是一个**通过CQL与Cassandra交互的命令行shell**。

为了在测试执行期间检查保存在Cassandra容器中的数据，我们可以简单地在我们的测试中设置一个断点。在暂停的测试执行期间，我们可以通过Docker桌面应用程序连接到Docker容器CLI：

```sql
# cqlsh
Connected to Test Cluster at 127.0.0.1:9042.
[cqlsh 5.0.1 | Cassandra 3.11.2 | CQL spec 3.4.4 | Native protocol v4]
Use HELP for help.
cqlsh> USE test;
cqlsh:test> select * from person;
```

结果，CQLSH将显示表中保存的数据的格式化输出：

```sql
 id                                   | birthdate  | firstname | lastname | lastpurchaseddate | lastvisiteddate
--------------------------------------+------------+-----------+----------+-------------------+-----------------
 9abef910-e3fd-11eb-9829-c5149ac796de | 1985-09-09 |      Luka |   Modric |              null |            null
```

然而，我们也想检查特定日期列使用的数据显示类型：

```sql
cqlsh:test> DESC TABLE person;
```

输出返回了一个用于创建表的CQL命令。因此，它包含了所有数据类型定义：

```sql
CREATE TABLE test.person (
    id uuid PRIMARY KEY,
    birthdate date,
    firstname text,
    lastname text,
    lastpurchaseddate timestamp,
    lastvisiteddate timestamp
)
```

## 5. 结论

在本文中，我们探讨了在Spring Data for Apache Cassandra中使用不同的日期值。

在示例中，我们涵盖了使用_LocalDate_、_LocalDateTime_和旧版_Date_ Java类型。我们看到了如何连接到使用_Testcontainers_启动的Cassandra实例。最后，我们使用了Spring Data存储库抽象来操作存储在Cassandra中的数据。

如往常一样，源代码可在GitHub上获得。