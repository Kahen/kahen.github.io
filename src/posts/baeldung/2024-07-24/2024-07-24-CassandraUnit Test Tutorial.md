---
date: 2024-07-24
category:
  - Java
  - Cassandra
tag:
  - CassandraUnit
  - Unit Test
head:
  - - meta
    - name: keywords
      content: Java, Cassandra, Unit Test, CassandraUnit, Baeldung
---
# Cassandra单元测试教程

Apache Cassandra是一个功能强大的开源NoSQL分布式数据库。在之前的教程中，我们探讨了如何使用Cassandra和Java进行基本操作。

在本教程中，**我们将在前一个教程的基础上，学习如何使用CassandraUnit编写可靠、自包含的单元测试。**

首先，我们将从设置和配置最新版本的CassandraUnit开始。然后，我们将探索几个示例，展示我们如何编写不依赖于外部数据库服务器运行的单元测试。

而且，如果您在生产环境中运行Cassandra，您肯定可以减少运行和维护自己的服务器的复杂性，转而使用Astra数据库，这是一个基于Apache Cassandra构建的**云数据库**。

## **2. 依赖项**

当然，我们需要将标准的Datastax Java驱动程序添加到我们的_pom.xml_中：

```xml
```<dependency>```
    ```<groupId>```com.datastax.oss```</groupId>```
    ```<artifactId>```java-driver-core```</artifactId>```
    ```<version>```4.13.0```</version>```
```</dependency>```
```

为了使用嵌入式数据库服务器测试我们的代码，我们还应该将_cassandra-unit_依赖项添加到我们的_pom.xml_中：

```xml
```<dependency>```
    ```<groupId>```org.cassandraunit```</groupId>```
    ```<artifactId>```cassandra-unit```</artifactId>```
    ```<version>```4.3.1.0```</version>```
    ``<scope>``test``</scope>``
```</dependency>```
```

现在我们已经配置了所有必要的依赖项，我们可以开始编写我们的单元测试了。

## **3. 入门**

在本教程中，我们的测试重点将是一个简单的人员表，我们通过一个简单的CQL脚本进行控制：

```sql
CREATE TABLE person(
    id varchar,
    name varchar,
    PRIMARY KEY(id);

INSERT INTO person(id, name) values('1234','Eugen');
INSERT INTO person(id, name) values('5678','Michael');
```

正如我们将看到的，CassandraUnit提供了几种变体来帮助我们编写测试，但它们的核心是几个我们将不断重复的简单概念：

- 首先，我们将启动一个嵌入式Cassandra服务器，该服务器在我们的JVM内运行在内存中。
- 然后我们将人员数据集加载到运行中的嵌入式实例中。
- 最后，我们将发起一个简单的查询，以验证我们的数据是否已正确加载。

**在本节结束时，快速说一下测试。通常，在编写干净的单元或集成测试时，我们不应该依赖于我们可能无法控制或可能突然停止工作的外部服务**。这可能对我们的测试结果产生不利影响。

同样，如果我们依赖于外部服务，在这种情况下是一个运行中的Cassandra数据库，我们能无法以我们想要的方式设置它、控制它并从我们的测试中拆除它。

## **4. 使用原生方法进行测试**

让我们首先看看如何使用CassandraUnit附带的原生API。首先，我们将定义我们的单元测试和测试设置：

```java
public class NativeEmbeddedCassandraUnitTest {

    private CqlSession session;

    @Before
    public void setUp() throws Exception {
        EmbeddedCassandraServerHelper.startEmbeddedCassandra();
        session = EmbeddedCassandraServerHelper.getSession();
        new CQLDataLoader(session).load(new ClassPathCQLDataSet("people.cql", "people"));
    }
}
```

让我们浏览一下我们测试设置的关键部分。**首先，我们通过调用_startEmbeddedCassandra()_方法开始启动嵌入式Cassandra服务器。**

这将使用固定端口9142启动我们的数据库服务器：

```plaintext
11:13:36.754 [pool-2-thread-1] INFO  o.apache.cassandra.transport.Server
  - Starting listening for CQL clients on localhost/127.0.0.1:9142 (unencrypted)...
```

如果我们希望使用一个随机可用的端口，我们可以使用提供的Cassandra YAML配置文件：

```java
EmbeddedCassandraServerHelper
  .startEmbeddedCassandra(EmbeddedCassandraServerHelper.CASSANDRA_RNDPORT_YML_FILE);
```

同样，我们也可以在启动服务器时传递我们自己的YAML配置文件。当然，这个文件需要在我们的类路径中。

接下来，我们可以将_people.cql_数据集加载到我们的数据库中。**为此，我们使用_ClassPathCQLDataSet_类，它需要数据集位置和可选的keyspace名称。**

现在我们已经加载了一些数据，并且我们的嵌入式服务器正在运行，我们可以继续编写一个简单的单元测试：

```java
@Test
public void givenEmbeddedCassandraInstance_whenStarted_thenQuerySuccess() throws Exception {
    ResultSet result = session.execute("select * from person WHERE id=1234");
    assertThat(result.iterator().next().getString("name"), is("Eugen"));
}
```

正如我们所看到的，执行一个简单的查询确认了我们的测试正在正确工作。太棒了！**我们现在有了一种使用内存中的Cassandra数据库编写自包含、独立的单元测试的方法。**

最后，当我们拆除测试时，我们将清理我们的嵌入式实例：

```java
@After
public void tearDown() throws Exception {
    EmbeddedCassandraServerHelper.cleanEmbeddedCassandra();
}
```

执行此操作将删除除_system_ keyspace之外的所有现有keyspace。

## **5. 使用CassandraUnit抽象JUnit测试用例进行测试**

为了帮助简化我们在上一节中看到的例子，CassandraUnit提供了一个抽象测试用例类_AbstractCassandraUnit4CQLTestCase,_它负责我们之前看到的设置和拆除：

```java
public class AbstractTestCaseWithEmbeddedCassandraUnitTest
  extends AbstractCassandraUnit4CQLTestCase {

    @Override
    public CQLDataSet getDataSet() {
        return new ClassPathCQLDataSet("people.cql", "people");
    }

    @Test
    public void givenEmbeddedCassandraInstance_whenStarted_thenQuerySuccess()
      throws Exception {
        ResultSet result = this.getSession().execute("select * from person WHERE id=1234");
        assertThat(result.iterator().next().getString("name"), is("Eugen"));
    }
}
```

这一次，通过扩展_AbstractCassandraUnit4CQLTestCase_类，我们所要做的就是覆盖_getDataSet()_方法，它返回我们想要加载的_CQLDataSet_。

另一个微妙的区别是，我们的测试需要调用_getSession()_来访问Cassandra Java驱动程序。

## **6. 使用CassandraCQLUnit JUnit规则进行测试**

如果我们不想强制我们的测试扩展_AbstractCassandraUnit4CQLTestCase,_那么幸运的是，CassandraUnit还提供了一个标准的JUnit规则：

```java
public class JUnitRuleWithEmbeddedCassandraUnitTest {

    @Rule
    public CassandraCQLUnit cassandra = new CassandraCQLUnit(new ClassPathCQLDataSet("people.cql", "people"));

    @Test
    public void givenEmbeddedCassandraInstance_whenStarted_thenQuerySuccess() throws Exception {
        ResultSet result = cassandra.session.execute("select * from person WHERE id=5678");
        assertThat(result.iterator().next().getString("name"), is("Michael"));
    }
}
```

**我们所要做的就是在我们的测试中声明一个_CassandraCQLUnit_字段，它是标准的JUnit_@Rule_。这个规则将准备和管理我们的Cassandra服务器的生命周期。**

## **7. 与Spring一起工作**

通常我们可能会在项目中将Cassandra与Spring集成。幸运的是，CassandraUnit还提供了与Spring TestContext Framework一起工作的支持。

为了利用这种支持，我们需要将_cassandra-unit-spring_ Maven依赖项添加到我们的项目中：

```xml
```<dependency>```
    ```<groupId>```org.cassandraunit```</groupId>```
    ```<artifactId>```cassandra-unit-spring```</artifactId>```
    ```<version>```4.3.1.0```</version>```
    ``<scope>``test``</scope>``
```</dependency>```
```

现在我们可以从我们的测试中使用一些注释和类。让我们继续编写一个使用最基本的Spring配置的测试：

```java
@RunWith(SpringJUnit4ClassRunner.class)
@TestExecutionListeners({ CassandraUnitTestExecutionListener.class })
@CassandraDataSet(value = "people.cql", keyspace = "people")
@EmbeddedCassandra
public class SpringWithEmbeddedCassandraUnitTest {

    @Test
    public void givenEmbeddedCassandraInstance_whenStarted_thenQuerySuccess() throws Exception {
        CqlSession session = EmbeddedCassandraServerHelper.getSession();

        ResultSet result = session.execute("select * from person WHERE id=1234");
        assertThat(result.iterator().next().getString("name"), is("Eugen"));
    }
}
```

让我们浏览一下我们测试的关键部分。首先，我们通过装饰我们的测试类来使用两个相当标准的Spring相关注释：

- _@RunWith(SpringJUnit4ClassRunner.class)_注释将确保我们的测试嵌入Spring的_TestContextManager_，让我们可以访问Spring_ApplicationContext_。
- 我们还指定了一个自定义_TestExecutionListener,_叫做_CassandraUnitTestExecutionListener,_它负责启动和停止我们的服务器并查找其他CassandraUnit注释。

**这里是关键部分；我们使用_@EmbeddedCassandra_注释将嵌入式Cassandra服务器的实例注入到我们的测试中**。此外，还有几个属性可供我们使用，以进一步配置嵌入式数据库服务器：

- _configuration_ – 一个不同的Cassandra配置file
- _clusterName_ – 集群的名称
- _host_ – 我们集群的主机
- _port_ – 我们集群使用的端口

我们在这里保持简单，通过从声明中省略这些属性选择了默认值。

对于难题的最后一部分，我们使用_@CassandraDataSet_注释加载我们之前看到的相同的CQL数据集。与之前一样，我们可以发送一个查询来验证我们的数据库内容是否正确。

## **8. 结论**

在本文中，我们学习了几种可以使用CassandraUnit编写独立单元测试的方法，这些测试使用Apache Cassandra的嵌入式实例。我们还讨论了如何从单元测试中使用Spring。

如往常一样，本文的完整源代码可在GitHub上获得。

![img](https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg)![img](https://secure.gravatar.com/avatar/66d236ad2fbffe8cfd463ebd2b4a43c0?s=50&r=g)![img](https://secure.gravatar.com/avatar/db9b6e888453bec33b0a1b1522bae628?s=50&r=g)![img](https://www.baeldung.com/wp-content/themes/baeldung/icon/whiteleaf.svg)

OK