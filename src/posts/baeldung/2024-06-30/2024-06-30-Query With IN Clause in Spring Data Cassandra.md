---
date: 2024-04-23
category:
  - Spring Data Cassandra
  - Query IN Clause
tag:
  - Spring Data Cassandra
  - IN Clause
  - Query Optimization
head:
  - - meta
    - name: keywords
      content: Spring Data Cassandra, IN Clause, Query Optimization
------
# Spring Data Cassandra中使用IN子句查询的实现

在本教程中，我们将学习如何使用Spring Data Cassandra实现使用IN子句查询多个记录的方法。我们将使用IN子句来指定一列的多个值。我们还将测试时遇到一个意外的错误，并理解其根本原因并解决问题。

### 2.1. 理解IN运算符的使用
在我们构建应用程序之前，让我们先了解这个运算符的使用。IN条件只允许在分区键的最后一列使用**如果我们查询所有前面的键列的等值**。同样，我们可以在任何聚簇键列中使用它，遵循相同的规则。

### 2.2. Maven依赖
我们将添加spring-boot-starter-data-cassandra依赖：

### 2.3. 实现Spring Data Repository
让我们通过扩展CassandraRepository接口来实现查询。首先，我们将实现上述product表的一些属性。

### 3. 实现ProductRepository的测试
现在，让我们使用Cassandra容器实例来实现ProductRepository的测试案例。

### 3.4. 错误的根源
上述日志表明测试因内部CodecNotFoundException异常而失败。CodecNotFoundException异常表明查询参数类型未找到所需的操作。

### 4. 修正查询
为了修正错误，我们将在ProductRepository接口中添加一个有效的查询参数类型。

### 5. 结论
在本文中，我们学习了如何在Cassandra中使用Spring Data Cassandra实现IN查询子句。我们还遇到了测试中的一个意外错误，并理解了根本原因。我们看到了如何使用有效的方法参数中的集合类型来解决问题。继续翻译：

### 2.2. Maven依赖性
我们将添加`spring-boot-starter-data-cassandra`依赖项：

```xml
```<dependency>```
    ```<groupId>```org.springframework.boot```</groupId>```
    ```<artifactId>```spring-boot-starter-data-cassandra```</artifactId>```
    ```<version>```3.1.5```</version>```
```</dependency>```
```

### 2.3. 实现Spring Data Repository
通过扩展`CassandraRepository`接口来实现查询。首先，我们将实现上述`product`表的一些属性：

```java
@Table
public class Product {
    @PrimaryKeyColumn(name = "product_id", ordinal = 0, type = PrimaryKeyType.PARTITIONED)
    private UUID productId;

    @PrimaryKeyColumn(name = "product_name", ordinal = 1, type = PrimaryKeyType.CLUSTERED)
    private String productName;

    @Column("description")
    private String description;

    @Column("price")
    private double price;
}
```
在上面的`Product`类中，我们将`productId`注解为主分区键，`productName`作为聚簇键。这两个列共同构成了主键。

现在，假设我们尝试找到所有匹配单个`productId`和多个`productName`的产品。
我们将实现`ProductRepository`接口，使用`IN`查询：

```java
@Repository
public interface ProductRepository extends CassandraRepository`<Product, UUID>` {
    @Query("select * from product where product_id = :productId and product_name in :productNames")
    List``<Product>`` findByProductIdAndNames(@Param("productId") UUID productId, @Param("productNames") String[] productNames);
}
```
在上面的查询中，我们将`productId`作为`UUID`传递，并将`productNames`作为数组类型，以获取匹配的产品。
Cassandra不允许在没有包含所有主键的情况下对非主键列进行查询。这是由于在多个节点上执行此类查询时性能的不可预测性。

或者，我们可以使用`ALLOW FILTERING`选项在任何列上使用`IN`或任何其他条件：

```cql
cqlsh:mykeyspace> select * from product where product_name in ('banana', 'apple') and price=6.05 ALLOW FILTERING;
```
`ALLOW FILTERING`选项可能会对性能产生潜在影响，我们应该谨慎使用。

### 3.1. 设置测试容器
为了进行实验，我们需要一个测试容器来运行Cassandra。我们将使用`testcontainers`库设置容器。

我们应该注意到`testcontainers`库需要一个运行中的Docker环境才能正常工作。

让我们添加`testcontainers`和`testcontainers-cassandra`依赖项：

```xml
```<dependency>```
    ```<groupId>```org.testcontainers```</groupId>```
    ```<artifactId>```testcontainers```</artifactId>```
    ```<version>```1.19.0```</version>```
    ``<scope>``test``</scope>``
```</dependency>```
```<dependency>```
    ```<groupId>```org.testcontainers```</groupId>```
    ```<artifactId>```cassandra```</artifactId>```
    ```<version>```1.19.0```</version>```
    ``<scope>``test``</scope>``
```</dependency>```
```

### 3.2. 启动测试容器
首先，我们将使用`@Testcontainers`注解设置测试类：

```java
@Testcontainers
@SpringBootTest
class ProductRepositoryIntegrationTest { }
```

接下来，我们将定义Cassandra容器对象，并在指定端口上公开它：

```java
@Container
private static final CassandraContainer cassandra = new CassandraContainer("cassandra:3.11.2")
  .withExposedPorts(9042);
```

最后，让我们配置一些与连接相关的属性，并创建`Keyspace`：

```java
@BeforeAll
static void setupCassandraConnectionProperties() {
    System.setProperty("spring.cassandra.keyspace-name", "mykeyspace");
    System.setProperty("spring.cassandra.contact-points", cassandra.getHost());
    System.setProperty("spring.cassandra.port", String.valueOf(cassandra.getMappedPort(9042)));
    createKeyspace(cassandra.getCluster());
}

static void createKeyspace(Cluster cluster) {
    try (Session session = cluster.connect()) {
       session.execute("CREATE KEYSPACE IF NOT EXISTS " + KEYSPACE_NAME + " WITH replication = " +
         "{'class':'SimpleStrategy','replication_factor':'1'};");
    }
}
```

### 3.3. 实施集成测试
为了测试，我们将使用上述`ProductRepository`查询检索一些现有产品。

现在，让我们完成测试并验证检索功能：

```java
UUID productId1 = UUIDs.timeBased();
Product product1 = new Product(productId1, "Apple", "Apple v1", 12.5);
Product product2 = new Product(productId1, "Apple v2", "Apple v2", 15.5);
UUID productId2 = UUIDs.timeBased();
Product product3 = new Product(productId2, "Banana", "Banana v1", 5.5);
Product product4 = new Product(productId2, "Banana v2", "Banana v2", 15.5);
productRepository.saveAll(List.of(product1, product2, product3, product4));

List``<Product>`` existingProducts = productRepository.findByProductIdAndNames(productId1, new String[] {"Apple", "Apple v2"});
assertEquals(2, existingProducts.size());
assertTrue(existingProducts.contains(product1));
assertTrue(existingProducts.contains(product2));
```

预计上述测试应该通过。相反，我们将从`ProductRepository`收到一个意外的错误：

```plaintext
com.datastax.oss.driver.api.core.type.codec.CodecNotFoundException: Codec not found for requested operation: [List(TEXT, not frozen] <- [Ljava.lang.String;
    at com.datastax.oss.driver.internal.core.type.codec.registry.CachingCodecRegistry.createCodec(CachingCodecRegistry.java:609)
    at com.datastax.oss.driver.internal.core.type.codec.registry.DefaultCodecRegistry$1.load(DefaultCodecRegistry.java:95)
    at com.datastax.oss.driver.internal.core.type.codec.registry.DefaultCodecRegistry$1.load(DefaultCodecRegistry.java:92)
    at com.datastax.oss.driver.shaded.guava.common.cache.LocalCache$LoadingValueReference.loadFuture(LocalCache.java:3527)
    ....
    at com.datastax.oss.driver.internal.core.data.ValuesHelper.encodePreparedValues(ValuesHelper.java:112)
    at com.datastax.oss.driver.internal.core.cql.DefaultPreparedStatement.boundStatementBuilder(DefaultPreparedStatement.java:187)
    at org.springframework.data.cassandra.core.PreparedStatementDelegate.bind(PreparedStatementDelegate.java:59)
    at org.springframework.data.cassandra.core.CassandraTemplate$PreparedStatementHandler.bindValues(CassandraTemplate.java:1117)
    at org.springframework.data.cassandra.core.cql.CqlTemplate.query(CqlTemplate.java:541)
    at org.springframework.data.cassandra.core.cql.CqlTemplate.query(CqlTemplate.java:571)...
    at com.sun.proxy.$Proxy90.findByProductIdAndNames(Unknown Source)
    at org.baeldung.inquery.ProductRepositoryIntegrationTest$ProductRepositoryLiveTest.givenExistingProducts_whenFindByProductIdAndNames_thenProductsIsFetched(ProductRepositoryNestedLiveTest.java:113)
```

接下来，让我们详细调查错误。

OK