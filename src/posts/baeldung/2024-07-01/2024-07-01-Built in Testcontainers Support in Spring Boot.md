---
date: 2023-08-01
category:
  - Spring Boot
  - Testcontainers
tag:
  - Spring Boot 3.1
  - 集成测试
head:
  - - meta
    - name: keywords
      content: Spring Boot, Testcontainers, 集成测试, 服务连接, 本地开发
---
# Spring Boot内置的Testcontainers支持

在本教程中，我们将讨论Spring Boot 3.1中引入的增强型Testcontainers支持。

此更新提供了一种更为流畅的配置容器的方法，并允许我们为本地开发目的启动它们。结果，使用Testcontainers进行开发和运行测试变得无缝且高效。

## 2. SpringBoot 3.1之前的Testcontainers

我们可以使用Testcontainers在测试阶段创建一个类似生产环境的环境。通过这样做，我们将消除对模拟的需求，并编写出不依赖于实现细节的高质量自动化测试。

对于本文的代码示例，我们将使用一个简单的Web应用程序，它使用MongoDB数据库作为持久层，并有一个小型REST接口：

```java
@RestController
@RequestMapping("characters")
public class MiddleEarthCharactersController {
    private final MiddleEarthCharactersRepository repository;

    // 构造函数未显示

    @GetMapping
    public List`<MiddleEarthCharacter>` findByRace(@RequestParam String race) {
        return repository.findAllByRace(race);
    }

    @PostMapping
    public MiddleEarthCharacter save(@RequestBody MiddleEarthCharacter character) {
        return repository.save(character);
    }
}
```

在集成测试期间，我们将启动一个包含数据库服务器的Docker容器。由于容器暴露的数据库端口将被动态分配，我们不能在属性文件中定义数据库URL。**结果，对于3.1之前的Spring Boot应用程序，我们需要使用_@DynamicPropertySource_注解以便向_DynamicPropertyRegistry_添加这些属性：**

```java
@Testcontainers
@SpringBootTest(webEnvironment = DEFINED_PORT)
class DynamicPropertiesIntegrationTest {

    @Container
    static MongoDBContainer mongoDBContainer = new MongoDBContainer(DockerImageName.parse("mongo:4.0.10"));

    @DynamicPropertySource
    static void setProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.data.mongodb.uri", mongoDBContainer::getReplicaSetUrl);
    }

    // ...
}
```

对于集成测试，我们将使用_@SpringBootTest_注解启动应用程序在配置文件中定义的端口。此外，我们将使用Testcontainers来设置环境。

最后，让我们使用REST-assured来执行HTTP请求并断言响应的有效性：

```java
@Test
void whenRequestingHobbits_thenReturnFrodoAndSam() {
    repository.saveAll(List.of(
        new MiddleEarthCharacter("Frodo", "hobbit"),
        new MiddleEarthCharacter("Samwise", "hobbit"),
        new MiddleEarthCharacter("Aragon", "human"),
        new MiddleEarthCharacter("Gandalf", "wizzard")
    ));

    when().get("/characters?race=hobbit")
      .then().statusCode(200)
      .and().body("name", hasItems("Frodo", "Samwise"));
}
```

## 3. 使用_@ServiceConnection_进行动态属性

**从SpringBoot 3.1开始，我们可以利用_@ServiceConnection_注解来消除定义动态属性的样板代码。**

首先，我们需要在_pom.xml_中包含_spring-boot-testcontainers_依赖：

```xml
``<dependency>``
  ``<groupId>``org.springframework.boot``</groupId>``
  ``<artifactId>``spring-boot-testcontainers``</artifactId>``
  ``<scope>``test``</scope>``
``</dependency>``
```

之后，我们可以移除注册所有动态属性的静态方法。相反，我们将简单地使用_@ServiceConnection_注解标记容器：

```java
@Testcontainers
@SpringBootTest(webEnvironment = DEFINED_PORT)
class ServiceConnectionIntegrationTest {

    @Container
    @ServiceConnection
    static MongoDBContainer mongoDBContainer = new MongoDBContainer(DockerImageName.parse("mongo:4.0.10"));

    // ...
}
```

_@ServiceConncetion_允许SpringBoot的自动配置动态注册所有需要的属性。在幕后，_@ServiceConncetion_根据容器类或Docker镜像名称确定需要哪些属性。

所有支持此注解的容器和镜像列表可以在Spring Boot的官方文档中找到。

## 4. Testcontainers对本地开发的支持

**另一个令人兴奋的功能是Testcontainers与本地开发的无缝集成，配置极少。** 此功能使我们能够在测试期间以及本地开发中复制生产环境。

为了启用它，我们首先需要创建一个_@TestConfiguration_并声明所有Testcontainers作为Spring Beans。让我们还添加_@ServiceConnection_注解，这将无缝地将应用程序绑定到数据库：

```java
@TestConfiguration(proxyBeanMethods = false)
class LocalDevTestcontainersConfig {
    @Bean
    @ServiceConnection
    public MongoDBContainer mongoDBContainer() {
        return new MongoDBContainer(DockerImageName.parse("mongo:4.0.10"));
    }
}
```

由于所有的_Testcontainers_依赖项都是以_test_作用域导入的，我们需要从_test_包启动应用程序。因此，让我们在这个包中创建一个_main()_方法，调用_java_包中的实际_main()_方法：

```java
public class LocalDevApplication {
    public static void main(String[] args) {
        SpringApplication.from(Application::main)
          .with(LocalDevTestcontainersConfig.class)
          .run(args);
    }
}
```

就是这样。现在我们可以从_test_包中的_main()_方法启动应用程序，它将使用MongoDB数据库。

让我们从Postman发送一个POST请求，然后直接连接到数据库并检查数据是否正确持久化：

![img](https://www.baeldung.com/wp-content/uploads/2023/08/postman_post_data-300x94.png)

为了连接到数据库，我们需要找到容器暴露的端口。我们可以从应用程序日志中获取它，或者简单地运行_docker ps_命令：

![img](https://www.baeldung.com/wp-content/uploads/2023/08/visual-diff-on-changed-files-300x60.png)

最后，我们可以使用MongoDB客户端使用URL _mongodb://localhost:63437/test_ 连接到数据库，并查询_characters_集合：

![img](https://www.baeldung.com/wp-content/uploads/2023/08/mongodb_find_all-300x153.png)

就是这样，我们能够连接并查询由Testcontainer为本地开发启动的数据库。

如果我们在本地开发期间经常重启应用程序，一个潜在的缺点是每次都会重启所有容器。结果，启动可能会变慢，测试数据将丢失。

**然而，我们可以通过利用Testcontainers与_spring-boot-devtools_的集成来在应用程序重新加载时保持容器活跃。** 这是一个实验性的Testcontainers功能，它通过节省宝贵的时间和测试数据，使我们的开发体验更加顺畅和高效。

让我们首先添加_spring-boot-devtools_依赖：

```xml
``<dependency>``
    ``<groupId>``org.springframework.boot``</groupId>``
    ``<artifactId>``spring-boot-devtools``</artifactId>``
    ``<scope>``runtime``</scope>``
    `<optional>`true`</optional>`
``</dependency>``
```

现在，我们可以回到本地开发的测试配置，并使用_@RestartScope_注解标记Testcontainers beans：

```java
@Bean
@RestartScope
@ServiceConnection
public MongoDBContainer mongoDBContainer() {
    return new MongoDBContainer(DockerImageName.parse("mongo:4.0.10"));
}
```

结果，我们现在可以从_test_包中的_main()_方法启动应用程序，并利用_spring-boot-devtools_的实时重载功能。例如，我们可以从Postman保存一个条目，然后重新编译和重载应用程序：

![img](https://www.baeldung.com/wp-content/uploads/2023/08/postmna-save-again-1-300x95.png)

让我们引入一个小变化，比如将请求映射从_“characters”_切换到_“api/characters”_并重新编译：

![img](https://www.baeldung.com/wp-content/uploads/2023/08/devtools_ive_reload-300x187.png)

我们已经可以从应用程序日志或Docker本身看到数据库容器没有重启。然而，让我们更进一步，检查应用程序在重启后是否重新连接到了同一个数据库。例如，我们可以通过在新路径发送GET请求并期望之前插入的数据存在来做到这一点：

![img](https://www.baeldung.com/wp-content/uploads/2023/08/app_reconnected_to_db-1-300x178.png)

同样，我们可以使用Testcontainer的API中的_withReuse(true)_方法：

```java
@Bean
@ServiceConnection
public MongoDBContainer mongoDBContainer() {
    return new MongoDBContainer(DockerImageName.parse("mongo:4.0.10"))
      .withReuse(true);
}
```

**这是一种更强大的替代方案，它使容器能够比应用程序活得更长。换句话说，通过启用重用，我们可以重新加载甚至完全重启应用程序，同时确保容器保持活跃。**

## 6. 结论

在本文中，我们讨论了SpringBoot 3.1的新Testcontainers特性。我们学习了如何使用新的_@ServiceConnection_注解，它提供了一种简化的替代方案，用于使用_@DynamicPropertySource_和样板配置。

接着，我们深入研究了如何通过在_test_包中创建额外的_main()_方法并将它们声明为Spring