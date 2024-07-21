---
date: 2024-07-21
category:
  - Spring Boot
  - NoSQL
tag:
  - Spring Boot
  - NoSQL
  - Cassandra
  - DataStax
head:
  - - meta
    - name: keywords
      content: Spring Boot, NoSQL, Cassandra, DataStax, Astra DB
---

# 使用Spring Boot连接到NoSQL数据库

在本教程中，我们将学习如何使用Spring Boot连接到NoSQL数据库。我们的文章重点是使用DataStax Astra DB，这是一个由Apache Cassandra驱动的DBaaS（数据库即服务），允许我们使用云原生服务开发和部署数据驱动的应用程序。

首先，我们将从设置和配置我们的应用程序与Astra DB开始。然后，我们将学习如何构建一个简单的Spring Boot应用程序。

### 2. 依赖项

让我们从向我们的_pom.xml_添加依赖项开始。当然，我们需要_spring-boot-starter-data-cassandra_依赖项：

```xml
```<dependency>```
    ```<groupId>```org.springframework.boot```</groupId>```
    ```<artifactId>```spring-boot-starter-data-cassandra```</artifactId>```
    ```<version>```2.6.3```</version>```
```</dependency>```
```

接下来，我们将添加_spring-boot-starter-web_依赖项：

```xml
```<dependency>```
    ```<groupId>```org.springframework.boot```</groupId>```
    ```<artifactId>```spring-boot-starter-web```</artifactId>```
    ```<version>```2.6.3```</version>```
```</dependency>```
```

最后，我们将使用Datastax的_astra-spring-boot-starter_：

```xml
```<dependency>```
    ```<groupId>```com.datastax.astra```</groupId>```
    ```<artifactId>```astra-spring-boot-starter```</artifactId>```
    ```<version>```0.3.0```</version>```
```</dependency>```
```

现在我们已经配置了所有必要的依赖项，我们可以开始编写我们的Spring Boot应用程序。

### 3. 数据库设置

在我们开始定义我们的应用程序之前，**重要的是要快速重申DataStax Astra是由Apache Cassandra驱动的基于云的数据库产品**。这为我们提供了一个完全托管、完全管理的Cassandra数据库，我们可以用来存储我们的数据。然而，正如我们将看到的，我们设置和连接数据库的方式有一些特殊性。

为了让我们能够与数据库交互，我们需要在主机平台上设置我们的Astra数据库。然后，我们需要下载我们的Secure Connect Bundle，其中包含SSL证书和数据库的连接详细信息，允许我们安全地连接。

为了本教程的目的，我们假设我们已经完成了这两个任务。

### 4. 应用程序配置

接下来，我们将为我们的应用程序配置一个简单的_main_类：

```java
@SpringBootApplication
public class AstraDbSpringApplication {

    public static void main(String[] args) {
        SpringApplication.run(AstraDbSpringApplication.class, args);
    }
}
```

正如我们所看到的，这是一个普通的Spring Boot应用程序。现在让我们开始填充我们的_application.properties_文件：

```properties
astra.api.application-token=`<token>`
astra.api.database-id=`<your_db_id>`
astra.api.database-region=europe-west1
```

**这些是我们的Cassandra凭据，可以直接从Astra仪表板获取**。

为了使用标准_CqlSession_进行CQL操作，我们将添加另外几个属性，包括我们下载的secure connect bundle的位置：

```properties
astra.cql.enabled=true
astra.cql.downloadScb.path=~/.astra/secure-connect-shopping-list.zip
```

最后，我们将添加一些标准的Spring Data属性，用于与Cassandra一起工作：

```properties
spring.data.cassandra.keyspace=shopping_list
spring.data.cassandra.schema-action=CREATE_IF_NOT_EXISTS
```

在这里，我们指定了数据库的keyspace，并告诉Spring Data如果表不存在则创建它们。

### 5. 测试我们的连接

现在我们已经准备好了所有的部分来测试我们的数据库连接。让我们继续定义一个简单的REST Controller：

```java
@RestController
public class AstraDbApiController {

    @Autowired
    private AstraClient astraClient;

    @GetMapping("/ping")
    public String ping() {
        return astraClient.apiDevopsOrganizations()
          .organizationId();
    }

}
```

正如我们所看到的，我们使用_AstraClient_类创建了一个简单的ping端点，它将返回我们数据库的组织ID。**这是一个包装类，是Astra SDK的一部分，我们可以使用它与各种Astra API进行交互**。

最重要的是，这只是一个简单的测试，以确保我们可以建立连接。让我们继续使用Maven运行我们的应用程序：

```shell
mvn clean install spring-boot:run
```

我们应该在控制台看到与我们的Astra数据库建立的连接：

```
...
13:08:00.656 [main] INFO  c.d.stargate.sdk.StargateClient - + CqlSession   :[ENABLED]
13:08:00.656 [main] INFO  c.d.stargate.sdk.StargateClient - + API Cql      :[ENABLED]
13:08:00.657 [main] INFO  c.d.stargate.sdk.rest.ApiDataClient - + API Data     :[ENABLED]
13:08:00.657 [main] INFO  c.d.s.sdk.doc.ApiDocumentClient - + API Document :[ENABLED]
13:08:00.658 [main] INFO  c.d.s.sdk.gql.ApiGraphQLClient - + API GraphQL  :[ENABLED]
13:08:00.658 [main] INFO  com.datastax.astra.sdk.AstraClient
  - [AstraClient] has been initialized.
13:08:01.515 [main] INFO  o.b.s.a.AstraDbSpringApplication
  - Started AstraDbSpringApplication in 7.653 seconds (JVM running for 8.097)
```

同样，如果我们在浏览器中访问我们的端点或使用_curl_访问它，我们应该得到一个有效的响应：

```shell
$ curl http://localhost:8080/ping; echo
d23bf54d-1bc2-4ab7-9bd9-2c628aa54e85
```

太好了！现在我们已经建立了数据库连接，并实现了一个使用Spring Boot的简单应用程序，让我们看看我们如何存储和检索数据。

### 6. 使用Spring Data

我们可以选择几种风格作为我们的Cassandra数据库访问的基础。在本教程中，我们选择使用Spring Data，它支持Cassandra。

Spring Data的存储库抽象的主要目标是显著减少实现数据访问层所需的样板代码量，这将有助于保持我们的示例非常简单。

对于我们的数据模型，**我们将定义一个实体来表示一个简单的购物清单**：

```java
@Table
public class ShoppingList {

    @PrimaryKey
    @CassandraType(type = Name.UUID)
    private UUID uid = UUID.randomUUID();

    private String title;
    private boolean completed = false;

    @Column
    private List`<String>` items = new ArrayList<>();

    // 标准Getters和Setters
}
```

在这个例子中，我们在我们的bean中使用了几个标准注解来将我们的实体映射到Cassandra数据表，并定义了一个名为_uid_的主键列。

现在让我们创建_ShoppingListRepository_在我们的应用程序中使用：

```java
@Repository
public interface ShoppingListRepository extends CassandraRepository`<ShoppingList, String>` {

    ShoppingList findByTitleAllIgnoreCase(String title);

}
```

这遵循了标准的Spring Data存储库抽象。除了在_CassandraRepository_接口中包含的继承方法，如_findAll_，**我们还添加了一个额外的方法_findByTitleAllIgnoreCase_，我们可以使用它来根据标题查找购物清单**。

实际上，使用Astra Spring Boot Starter的一个真正好处是它为我们创建了_CqlSession_ bean，使用之前定义的属性。

### 7. 整合所有内容

现在我们的数据访问存储库已经就位，让我们定义一个简单的服务和控制器：

```java
@Service
public class ShoppingListService {

    @Autowired
    private ShoppingListRepository shoppingListRepository;

    public List``<ShoppingList>`` findAll() {
        return shoppingListRepository.findAll(CassandraPageRequest.first(10)).toList();
    }

    public ShoppingList findByTitle(String title) {
        return shoppingListRepository.findByTitleAllIgnoreCase(title);
    }

    @PostConstruct
    public void insert() {
        ShoppingList groceries = new ShoppingList("Groceries");
        groceries.setItems(Arrays.asList("Bread", "Milk, Apples"));

        ShoppingList pharmacy = new ShoppingList("Pharmacy");
        pharmacy.setCompleted(true);
        pharmacy.setItems(Arrays.asList("Nappies", "Suncream, Aspirin"));

        shoppingListRepository.save(groceries);
        shoppingListRepository.save(pharmacy);
    }

}
```

对于我们的测试应用程序的目的，**我们添加了一个_@PostContruct_注解来将一些测试数据插入我们的数据库**。

作为谜题的最后一部分，我们将添加一个简单的控制器，带有一个端点来检索我们的购物清单：

```java
@RestController
@RequestMapping(value = "/shopping")
public class ShoppingListController {

    @Autowired
    private ShoppingListService shoppingListService;

    @GetMapping("/list")
    public List``<ShoppingList>`` findAll() {
        return shoppingListService.findAll();
    }
}
```

现在当我们运行我们的应用程序并访问http://localhost:8080/shopping/list - 我们将看到一个包含我们不同购物清单对象的JSON响应：

```json
[
  {
    "uid": "363dba2e-17ff3-4d01-a44f-a805f74fc43d",
    "title": "Groceries",
    "completed": false,
    "items": [
      "Bread",
      "Milk, Apples"
    ]
  },
  {
    "uid": "9c0f407e-5fc1-41ad-8e46-b3c115de9474",
    "title": "Pharmacy",
    "completed": true,
    "items": [
      "Nappies",
      "Suncream, Aspirin"
    ]
  }
]
```

这证实了我们的应用程序正在正常工作。太棒了！

### 8. 使用Cassandra模板工作

另一方面，也可以直接使用Cassandra模板，这是经典的Spring CQL方法，可能仍然是最受欢迎的方法。

简单来说，我们可以很容易地扩展我们的_AstraDbApiController_来检索我们的数据中心：

```java
@Autowired
private CassandraTemplate cassandraTemplate;

@GetMapping("/datacenter")
public String datacenter() {
    return cassandraTemplate
        .getCqlOperations()
        .queryForObject("SELECT data_center FROM system.local", String.class);
}
```

这将仍然利用我们定义的所有配置属性。**正如我们所看到的，两种访问方法之间的切换是完全透明的**。

### 9. 结论

在本文中，我们学习了如何设置和连接到托管的Cassandra Astra数据库。接下来，我们构建了一个简单的购物清单应用程序来使用Spring Data存储和检索数据。最后，我们还讨论了如何使用较低级别的访问方法Cassandra Template。

一如既往，文章的全部源代码可以在GitHub上找到。

![img](https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg)![img](https://secure.gravatar.com/avatar/66d236ad2fbffe8cfd463ebd2b4a43c0?s=50&r=g)![img](https://secure.gravatar.com/avatar/db9b6e888453bec33b0a1b1522bae628?s=50&r=g)![img](https://www.baeldung.com/wp-content/themes/baeldung/icon/whiteleaf.svg)

OK