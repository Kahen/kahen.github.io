---
date: 2022-04-01
category:
  - Spring Data Cassandra
  - Testcontainers
tag:
  - Spring Boot
  - Cassandra
  - Integration Testing
head:
  - - meta
    - name: keywords
      content: Spring Data Cassandra, Testcontainers, Spring Boot, Cassandra, Integration Testing
------
# 使用Testcontainers与Spring Data Cassandra

## 1. 概述

Apache Cassandra 是一个开源的分布式 NoSQL 数据库。它被设计用来**处理大量数据，具有快速的读写性能，并且没有单点故障**。

在本教程中，我们将探讨测试一个使用 Cassandra 数据库的 Spring Boot 应用程序。我们将解释如何使用 Testcontainers 库中的 Cassandra 容器设置集成测试。此外，我们将利用 Spring Data 仓库抽象来处理 Cassandra 的数据层。

最后，我们将展示如何在多个集成测试中重用共享的 Cassandra 容器实例。

Testcontainers 是一个 Java 库，它**提供了 Docker 容器的轻量级、一次性实例**。因此，我们通常在 Spring 中使用它来进行使用数据库的应用程序的集成测试。Testcontainers 使我们能够在不需要在本地机器上安装和管理数据库的情况下，在真实的数据库实例上进行测试。

### 2.1. Maven 依赖

Cassandra 容器在 Cassandra Testcontainers 模块中可用。这使得我们可以**使用容器化的 Cassandra 实例**。

与 _cassandra-unit_ 库不同，Testcontainers 库**完全兼容 JUnit 5**。让我们从列出所需的 Maven 依赖开始：

```xml
```<dependency>```
    ```<groupId>```org.testcontainers```</groupId>```
    ```<artifactId>```testcontainers```</artifactId>```
    ```<version>```1.19.5```</version>```
    ```<scope>```test```</scope>```
```</dependency>```
```<dependency>```
    ```<groupId>```org.testcontainers```</groupId>```
    ```<artifactId>```cassandra```</artifactId>```
    ```<version>```1.19.5```</version>```
    ```<scope>```test```</scope>```
```</dependency>```
```<dependency>```
    ```<groupId>```org.testcontainers```</groupId>```
    ```<artifactId>```junit-jupiter```</artifactId>```
    ```<version>```1.19.5```</version>```
    ```<scope>```test```</scope>```
```</dependency>```
```

### 2.2. Cassandra 容器

容器化的数据库实例通常用于集成测试。同时**确保我们的数据访问层代码与特定数据库版本完全兼容**。

首先，我们需要使用 _@SpringBootTest_ 和 _@Testcontainers_ 注解我们的测试类：

```java
@SpringBootTest
@Testcontainers
class CassandraSimpleIntegrationTest {}
```

然后，我们可以**定义一个 Cassandra 容器并暴露其特定端口**：

```java
public static final CassandraContainer``<?>`` cassandra
  = new CassandraContainer<>("cassandra:3.11.2").withExposedPorts(9042);
```

这里我们暴露了容器端口 _9042_。不过，需要注意的是，Testcontainers 会将其链接到一个随机的主机端口，稍后我们可以获取这个端口。

使用上述方法，Testcontainers 库会自动为我们启动一个 Docker 化的 Cassandra 容器实例，**与测试类的生命周期对齐**：

```java
@Test
void givenCassandraContainer_whenSpringContextIsBootstrapped_thenContainerIsRunningWithNoExceptions() {
    assertThat(cassandra.isRunning()).isTrue();
}
```

现在我们有一个运行中的 Cassandra 容器。然而，Spring 应用程序还不知道它。

### 2.3. 覆盖测试属性

为了让 Spring Data 能够**与 Cassandra 容器建立连接**，我们需要提供一些连接属性。我们将通过 _java.lang.System_ 类定义系统属性来覆盖默认的 Cassandra 连接属性：

```java
@BeforeAll
static void setupCassandraConnectionProperties() {
    System.setProperty("spring.cassandra.keyspace-name", KEYSPACE_NAME);
    System.setProperty("spring.cassandra.contact-points", cassandra.getContainerIpAddress());
    System.setProperty("spring.cassandra.port", String.valueOf(cassandra.getMappedPort(9042)));
}
```

现在我们配置了 Spring Data 连接我们的 Cassandra 容器。不过，我们还需要创建一个 keyspace。

### 2.4. 创建 Keyspace

在 Cassandra 中创建任何表之前，我们需要创建一个 keyspace：

```java
private static void createKeyspace(Cluster cluster) {
    try (Session session = cluster.connect()) {
        session.execute("CREATE KEYSPACE IF NOT EXISTS " + KEYSPACE_NAME +
          " WITH replication = " +
          "{'class':'SimpleStrategy','replication_factor':'1'};");
    }
}
```

在 Cassandra 中，keyspace 非常类似于 RDBMS 中的数据库。它定义了数据在 Cassandra 集群节点上的复制方式。

## 3. Spring Data for Cassandra

Spring Data for Apache Cassandra **将核心 Spring 概念应用于使用 Cassandra 的应用程序开发**。它提供了仓库、查询构建器和简单的注释，用于丰富的对象映射。因此，它为使用不同数据库的 Spring 开发人员提供了熟悉的接口。

### 3.1. 数据访问对象

让我们首先准备一个简单的 DAO 类，我们将在稍后的集成测试中使用它：

```java
@Table
public class Car {

    @PrimaryKey
    private UUID id;
    private String make;
    private String model;
    private int year;

    public Car(UUID id, String make, String model, int year) {
        this.id = id;
        this.make = make;
        this.model = model;
        this.year = year;
    }

    //getters, setters, equals 和 hashcode
}
```

关键是要**使用 _@Table_ 注解**从 _org.springframework.data.cassandra.core.mapping_ 包。实际上，这个注解启用了自动领域对象映射。

### 3.2. Cassandra 仓库

Spring Data 使得为我们的 DAO 创建一个仓库变得非常简单。首先，我们需要在 Spring Boot 主类中启用 Cassandra 仓库：

```java
@SpringBootApplication
@EnableCassandraRepositories(basePackages = "org.baeldung.springcassandra.repository")
public class SpringCassandraApplication {}
```

然后，我们只需要创建一个扩展 _CassandraRepository_ 的接口：

```java
@Repository
public interface CarRepository extends CassandraRepository`<Car, UUID>` {}
```

在开始集成测试之前，我们需要定义两个额外的属性：

```properties
spring.data.cassandra.local-datacenter=datacenter1
spring.data.cassandra.schema-action=create_if_not_exists
```

第一个属性定义了默认的本地数据中心名称。第二个属性将确保 Spring Data 为我们自动创建所需的数据库表。我们应该注意到，**这个设置不应该在生产系统中使用**。

由于我们正在使用 Testcontainers，我们不需要担心测试完成后删除表。每次运行测试时，都会为我们启动一个新的容器。

## 4. 集成测试

现在我们有了 Cassandra 容器、一个简单的 DAO 类和一个 Spring Data 仓库，我们准备开始编写集成测试。

### 4.1. 保存记录测试

让我们从测试将新记录插入 Cassandra 数据库开始：

```java
@Test
void givenValidCarRecord_whenSavingIt_thenRecordIsSaved() {
    UUID carId = UUIDs.timeBased();
    Car newCar = new Car(carId, "Nissan", "Qashqai", 2018);

    carRepository.save(newCar);

    List````<Car>```` savedCars = carRepository.findAllById(List.of(carId));
    assertThat(savedCars.get(0)).isEqualTo(newCar);
}
```

### 4.2. 更新记录测试

然后，我们可以为更新现有数据库记录编写类似的测试：

```java
@Test
void givenExistingCarRecord_whenUpdatingIt_thenRecordIsUpdated() {
    UUID carId = UUIDs.timeBased();
    Car existingCar = carRepository.save(new Car(carId, "Nissan", "Qashqai", 2018));

    existingCar.setModel("X-Trail");
    carRepository.save(existingCar);

    List````<Car>```` savedCars = carRepository.findAllById(List.of(carId));
    assertThat(savedCars.get(0).getModel()).isEqualTo("X-Trail");
}
```

### 4.3. 删除记录测试

最后，让我们为删除现有数据库记录编写一个测试：

```java
@Test
void givenExistingCarRecord_whenDeletingIt_thenRecordIsDeleted() {
    UUID carId = UUIDs.timeBased();
    Car existingCar = carRepository.save(new Car(carId, "Nissan", "Qashqai", 2018));

    carRepository.delete(existingCar);

    List````<Car>```` savedCars = carRepository.findAllById(List.of(carId));
    assertThat(savedCars.isEmpty()).isTrue();
}
```

大多数时候，在使用集成测试时，我们希望**在多个测试之间重用同一个数据库实例**。我们可以通过使用多个嵌套测试类来共享同一个容器实例：

```java
@Testcontainers
@SpringBootTest
class CassandraNestedIntegrationTest {

    private static final String KEYSPACE_NAME = "test";

    @Container
    private static final CassandraContainer``<?>`` cassandra
      = new CassandraContainer<>("cassandra:3.11.2").withExposedPorts(9042);

    // 设置连接属性并创建 keyspace

    @Nested
    class ApplicationContextIntegrationTest {
        @Test
        void givenCassandraContainer_whenSpringContextIsBootstrapped_thenContainerIsRunningWithNoExceptions() {
            assertThat(cassandra.isRunning()).isTrue();
        }
    }

    @Nested
    class CarRepositoryIntegrationTest {

        @Autowired
        private CarRepository carRepository;

        @Test       @Test
        void givenValidCarRecord_whenSavingIt_thenRecordIsSaved() {
            UUID carId = UUIDs.timeBased();
            Car newCar = new Car(carId, "Nissan", "Qashqai", 2018);

            carRepository.save(newCar);

            List````<Car>```` savedCars = carRepository.findAllById(List.of(carId));
            assertThat(savedCars.get(0)).isEqualTo(newCar);
        }

        // 更新和删除的测试
    }
}

由于 Docker 容器启动需要时间，**在多个嵌套测试类之间共享同一个容器实例将确保更快的执行**。不过，需要注意的是，这个共享实例不会在测试之间自动清除。

## 6. 结论

在本文中，我们探讨了**使用 Cassandra 容器测试使用 Cassandra 数据库的 Spring Boot 应用程序**。

在示例中，我们涵盖了设置 Docker 化的 Cassandra 容器实例、覆盖测试属性、创建 keyspace、DAO 类和 Cassandra 仓库接口。

我们看到了如何编写利用 Cassandra 容器的集成测试。因此，我们的示例测试不需要模拟。最后，我们看到了如何在多个嵌套测试类中重用同一个容器实例。

如往常一样，源代码可在 GitHub 上获取。
OK