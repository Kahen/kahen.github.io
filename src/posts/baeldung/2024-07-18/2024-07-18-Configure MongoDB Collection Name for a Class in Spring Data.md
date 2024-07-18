---
date: 2024-04-01
category:
  - Spring Data
  - MongoDB
tag:
  - MongoDB
  - Collection Name
  - Spring Data
  - Configuration
head:
  - - meta
    - name: keywords
      content: Spring Data MongoDB Collection Name Configuration
------
# 在Spring Data中为类配置MongoDB集合名称

## 1. 概述

在本教程中，我们将学习如何为我们的类配置MongoDB集合名称，并提供一个实际示例。我们将使用Spring Data，它为我们提供了几种配置选项，几乎不需要额外配置。我们将通过构建一个简单的音乐商店来探索每种选项的使用场景。

## 2. 使用案例和设置

我们的使用案例有四个简单的类：_MusicAlbum_、_Compilation_、_MusicTrack_ 和 _Store_。**每个类都将以不同的方式配置其集合名称。** 此外，每个类都将拥有自己的 _MongoRepository_。不需要自定义查询。此外，我们需要一个正确配置的MongoDB数据库实例。

### 2.1. 按名称列出集合内容的服务

**首先，让我们编写一个控制器来验证我们的配置是否正常工作。我们将通过按集合名称搜索来实现这一点。** 注意，在使用存储库时，集合名称配置是透明的：

```java
@RestController
@RequestMapping("/collection")
public class CollectionController {
    @Autowired
    private MongoTemplate mongoDb;

    @GetMapping("/{name}")
    public List`<DBObject>` get(@PathVariable String name) {
        return mongoDb.findAll(DBObject.class, name);
    }
}
```

这个控制器基于 _MongoTemplate_，并使用通用类型 _DBObject_，这不依赖于类和存储库。此外，这样我们能够看到内部MongoDB属性。最重要的是，“\_class”属性，Spring Data用于反序列化JSON对象，确保我们的配置正确。

### 2.2. API服务

其次，我们将开始构建我们的服务，该服务仅保存对象并检索其集合。** _Compilation_ 类将在我们的第一个配置示例中稍后创建**：

```java
@Service
public class MusicStoreService {
    @Autowired
    private CompilationRepository compilationRepository;

    public Compilation add(Compilation item) {
        return compilationRepository.save(item);
    }

    public List``<Compilation>`` getCompilationList() {
        return compilationRepository.findAll();
    }

    // 其他服务方法
}
```

### 2.3. API端点

最后，让我们编写一个控制器来与我们的应用程序接口。我们将公开服务方法的端点：

```java
@RestController
@RequestMapping("/music")
public class MusicStoreController {
    @Autowired
    private MusicStoreService service;

    @PostMapping("/compilation")
    public Compilation post(@RequestBody Compilation item) {
        return service.add(item);
    }

    @GetMapping("/compilation")
    public List``<Compilation>`` getCompilationList() {
        return service.getCompilationList();
    }

    // 其他端点方法
}
```

之后，我们准备开始配置我们的类。

## 3. 使用 _@Document_ 注解进行配置

自Spring Data版本1.9以来，_Document_ 注解做了我们需要的一切。它专门用于MongoDB，类似于JPA的 _Entity_ 注解。**截至本文撰写时，没有办法为集合名称定义命名策略，只有字段名称可以。** 因此，让我们探索可用的选项。

### 3.1. 默认行为

默认行为认为集合名称与类名相同，但以小写字母开头。**简而言之，我们只需要添加 _Document_ 注解，它就会起作用**：

```java
@Document
public class Compilation {
    @Id
    private String id;

    // getters and setters
}
```

之后，从我们的 _Compilation_ 存储库的所有插入操作将进入MongoDB中的名为“compilation”的集合：

```shell
$ curl -X POST http://localhost:8080/music/compilation -H 'Content-Type: application/json' -d '{
    "name": "Spring Hits"
}'

{ "id": "6272e26e04a673360d926ca1" }
```

让我们列出我们的“compilation”集合的内容以验证我们的配置：

```shell
$ curl http://localhost:8080/collection/compilation

[
  {
    "name": "Spring Hits",
    "_class": "com.baeldung.boot.collection.name.data.Compilation"
  }
]
```

这是配置集合名称的最干净的方式，因为它基本上与我们的类名相同。**一个缺点是，如果我们决定更改我们的数据库命名约定，我们将需要重构我们所有的类。** 例如，如果我们决定使用蛇形命名法为我们的集合名称，我们将无法利用默认行为。

### 3.2. 覆盖 _value_ 属性

_Document_ 注解允许我们使用 _collection_ 属性覆盖默认行为。由于这个属性是 _value_ 属性的别名，我们可以隐式设置它：

```java
@Document("albums")
public class MusicAlbum {
    @Id
    private String id;

    private String name;

    private String artist;

    // getters and setters
}
```

现在，而不是将文档放入名为“musicAlbum”的集合中，它们将进入“albums”集合。**这是使用Spring Data配置集合名称的最简单方式**。让我们通过向我们的集合添加一张专辑来看看它的效果：

```shell
$ curl -X POST 'http://localhost:8080/music/album' -H 'Content-Type: application/json' -d '{
  "name": "Album 1",
  "artist": "Artist A"
}'

{ "id": "62740de003d2452a61a75c35" }
```

然后，我们可以获取我们的“albums”集合，确保我们的配置起作用：

```shell
$ curl 'http://localhost:8080/collection/albums'

[
  {
    "name": "Album 1",
    "artist": "Artist A",
    "_class": "com.baeldung.boot.collection.name.data.MusicAlbum"
  }
]
```

这也非常适合将我们的应用程序适应到一个集合名称与我们的类不匹配的现有数据库中。一个缺点是，如果我们需要添加一个默认前缀，我们将需要为每个类都这样做。

### 3.3. 使用SpEL与配置属性

**这种组合可以帮助做一些仅使用 _Document_ 注解无法完成的事情**。我们将从一个我们希望在类之间重用的应用程序特定属性开始。

**首先，让我们添加一个属性到我们的 _application.properties_，我们将使用它作为我们集合名称的后缀**：

```properties
collection.suffix=db
```

现在，让我们通过 _environment_ bean使用SpEL引用它来创建我们的下一个类：

```java
@Document("store-#{@environment.getProperty('collection.suffix')}")
public class Store {
    @Id
    private String id;

    private String name;

    // getters and setters
}
```

然后，让我们创建我们的第一个商店：

```shell
$ curl -X POST 'http://localhost:8080/music/store' -H 'Content-Type: application/json' -d '{
  "name": "Store A"
}'

{ "id": "62744c6267d3a034ec5e5719" }
```

结果，我们的类将存储在名为“store-db”的集合中。再次，我们可以通过列出其内容来验证我们的配置：

```shell
$ curl 'http://localhost:8080/collection/store-db'

[
  {
    "name": "Store A",
    "_class": "com.baeldung.boot.collection.name.data.Store"
  }
]
```

这样，如果我们更改后缀，我们不必在每个类中手动更改它。相反，我们只需要更新我们的属性文件。缺点是它有更多的样板代码，我们仍然需要编写类名。然而，**它也可以帮助支持多租户**。例如，我们可以使用租户ID而不是后缀来标记不共享的集合。

### 3.4. 使用SpEL与Bean方法

使用SpEL的另一个缺点是它需要额外的工作来程序性地评估。但是，它打开了很多可能性，比如调用任何bean方法来确定我们的集合名称。因此，在我们的下一个示例中，**我们将创建一个bean来固定集合名称以符合我们的命名规则**。

在我们的命名策略中，我们将使用蛇形命名法。首先，让我们从Spring Data的 _SnakeCaseFieldNamingStrategy_ 借用代码来创建我们的实用程序bean：

```java
public class Naming {
    public String fix(String name) {
        List``<String>`` parts = ParsingUtils.splitCamelCaseToLower(name);
        List``<String>`` result = new ArrayList<>();

        for (String part : parts) {
            if (StringUtils.hasText(part)) {
                result.add(part);
            }
        }

        return StringUtils.collectionToDelimitedString(result, "_");
    }
}
```

接下来，让我们将该bean添加到我们的应用程序中：

```java
@SpringBootApplication
public class SpringBootCollectionNameApplication {

    // main method

    @Bean
    public Naming naming() {
        return new Naming();
    }
}
```

之后，我们将能够通过SpEL引用我们的bean：

```java
@Document("#{@naming.fix('MusicTrack')}")
public class MusicTrack {
    @Id
    private String id;

    private String name;

    private String artist;

    // getters and setters```java
@Document("#{@naming.fix('MusicTrack')}")
public class MusicTrack {
    @Id
    private String id;

    private String name;

    private String artist;

    // getters and setters
}
```

让我们尝试通过向我们的集合添加一个项目来测试它：

```shell
$ curl -X POST 'http://localhost:8080/music/track' -H 'Content-Type: application/json' -d '{
  "name": "Track 1",
  "artist":"Artist A"
}'

{ "id": "62755987ae94c5278b9530cc" }
```

因此，我们的曲目将存储在名为“music_track”的集合中：

```shell
$ curl 'http://localhost:8080/collection/music_track'

[
  {
    "name": "Track 1",
    "artist": "Artist A",
    "_class": "com.baeldung.boot.collection.name.data.MusicTrack"
  }
]
```

**不幸的是，没有办法动态获取类名，这是一个主要缺点**，但它允许我们在不手动重命名所有类的情况下更改我们的数据库命名规则。

## 4. 结论

在本文中，我们探讨了使用Spring Data提供的工具配置集合名称的不同方式。**此外，我们看到了每种方式的优缺点，这样我们就可以决定哪种方式最适合特定场景。** 在此过程中，我们构建了一个简单的用例来展示不同的方法。

如往常一样，源代码可在GitHub上获取。

OK