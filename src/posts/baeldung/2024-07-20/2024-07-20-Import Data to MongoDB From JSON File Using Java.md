---
date: 2022-04-01
category:
  - Java
  - MongoDB
tag:
  - Spring Boot
  - JSON
  - 数据导入
head:
  - - meta
    - name: keywords
      content: Java, MongoDB, Spring Boot, JSON, 数据导入
---

# 将JSON文件数据导入MongoDB的Java实现 | Baeldung

## 1. 引言

在本教程中，我们将学习如何从文件中读取JSON数据并使用Spring Boot将它们导入MongoDB。**这在许多情况下都非常有用：恢复数据、批量插入新数据或插入默认值。**MongoDB内部使用JSON来构建其文档结构，因此很自然地，我们将使用JSON来存储可导入的文件。作为纯文本，这种策略还具有易于压缩的优势。

此外，我们将学习在必要时如何验证输入文件与我们的自定义类型是否匹配。**最后，我们将公开一个API，以便我们可以在web应用程序运行时使用它。**

## 2. 依赖项

让我们将这些Spring Boot依赖项添加到我们的_pom.xml_中：

```xml
``<dependency>``
    ``<groupId>``org.springframework.boot``</groupId>``
    ``<artifactId>``spring-boot-starter-web``</artifactId>``
``</dependency>``
``<dependency>``
    ``<groupId>``org.springframework.boot``</groupId>``
    ``<artifactId>``spring-boot-starter-data-mongodb``</artifactId>``
``</dependency>``
```

我们还需要一个运行中的MongoDB实例，这需要一个正确配置的_application.properties_文件。

## 3. 导入JSON字符串

**将JSON导入MongoDB的最简单方法是首先将其转换为“_org.bson.Document_”对象。**这个类表示一个无特定类型的通用MongoDB文档。因此，我们不必担心为可能导入的所有类型的对象创建存储库。

我们的策略是将JSON（来自文件、资源或字符串）转换为_Document_，并使用_MongoTemplate_保存它们。**批量操作通常表现更好，因为与逐个插入每个对象相比，减少了往返次数。**

最重要的是，我们将考虑输入每个换行符只有一个JSON对象。这样，我们可以很容易地分隔我们的对象。我们将这些功能封装到我们将创建的两个类中：_ImportUtils_和_ImportJsonService_。让我们从我们的服务类开始：

```java
@Service
public class ImportJsonService {
    @Autowired
    private MongoTemplate mongo;
}
```

接下来，让我们添加一个将JSON行解析为文档的方法：

```java
private List````````<Document>```````` generateMongoDocs(List``````````<String>`````````` lines) {
    List````````<Document>```````` docs = new ArrayList<>();
    for (String json : lines) {
        docs.add(Document.parse(json));
    }
    return docs;
}
```

然后我们添加一个将_Document_对象列表插入到所需_集合_中的方法。同样，如果批量操作部分失败，我们可以通过检查异常的_原因_来返回插入的文档数量：

```java
private int insertInto(String collection, List````````<Document>```````` mongoDocs) {
    try {
        Collection````````<Document>```````` inserts = mongo.insert(mongoDocs, collection);
        return inserts.size();
    } catch (DataIntegrityViolationException e) {
        if (e.getCause() instanceof MongoBulkWriteException) {
            return ((MongoBulkWriteException) e.getCause())
              .getWriteResult()
              .getInsertedCount();
        }
        return 0;
    }
}
```

最后，让我们结合这些方法。这个方法接受输入并返回一个字符串，显示读取的行数与成功插入的行数：

```java
public String importTo(String collection, List``````````<String>`````````` jsonLines) {
    List````````<Document>```````` mongoDocs = generateMongoDocs(jsonLines);
    int inserts = insertInto(collection, mongoDocs);
    return inserts + "/" + jsonLines.size();
}
```

## 4. 使用案例

现在我们已经准备好处理输入，我们可以构建一些使用案例。让我们创建_ImportUtils_类来帮助我们。**这个类将负责将输入转换为JSON行。**它将只包含静态方法。让我们从一个用于读取简单_String_的方法开始：

```java
public static List``````````<String>`````````` lines(String json) {
    String[] split = json.split("[\r\n]+");
    return Arrays.asList(split);
}
```

由于我们使用换行符作为分隔符，正则表达式非常适合将字符串拆分为多行。这个正则表达式处理Unix和Windows行结尾。接下来，一个将File转换为字符串列表的方法：

```java
public static List``````````<String>`````````` lines(File file) {
    return Files.readAllLines(file.toPath());
}
```

同样，我们完成一个将类路径资源转换为列表的方法：

```java
public static List``````````<String>`````````` linesFromResource(String resource) {
    Resource input = new ClassPathResource(resource);
    Path path = input.getFile().toPath();
    return Files.readAllLines(path);
}
```

### 4.1. 在启动期间通过CLI导入文件

在我们的第一个使用案例中，我们将实现通过应用程序参数导入文件的功能。我们将利用Spring Boot的_ApplicationRunner_接口在启动时执行此操作。**例如，我们可以读取命令行参数来定义要导入的文件：**

```java
@SpringBootApplication
public class SpringBootJsonConvertFileApplication implements ApplicationRunner {
    private static final String RESOURCE_PREFIX = "classpath:";

    @Autowired
    private ImportJsonService importService;

    public static void main(String ... args) {
        SpringApplication.run(SpringBootPersistenceApplication.class, args);
    }

    @Override
    public void run(ApplicationArguments args) {
        if (args.containsOption("import")) {
            String collection = args.getOptionValues("collection")
              .get(0);

            List``````````<String>`````````` sources = args.getOptionValues("import");
            for (String source : sources) {
                List``````````<String>`````````` jsonLines = new ArrayList<>();
                if (source.startsWith(RESOURCE_PREFIX)) {
                    String resource = source.substring(RESOURCE_PREFIX.length());
                    jsonLines = ImportUtils.linesFromResource(resource);
                } else {
                    jsonLines = ImportUtils.lines(new File(source));
                }

                String result = importService.importTo(collection, jsonLines);
                log.info(source + " - result: " + result);
            }
        }
    }
}
```

使用_getOptionValues()_我们可以处理一个或多个文件。**这些文件可以来自我们的类路径或文件系统。**我们使用_RESOURCE_PREFIX_来区分它们。每个以“_classpath:_”开头的参数将从资源文件夹而不是文件系统读取。之后，它们将全部导入到所需的_collection_中。

让我们通过在_src/main/resources/data.json.log_下创建一个文件来开始使用我们的应用程序：

```json
{"name":"Book A", "genre": "Comedy"}
{"name":"Book B", "genre": "Thriller"}
{"name":"Book C", "genre": "Drama"}
```

构建后，我们可以使用以下示例来运行它（为了可读性添加了换行）。在我们的示例中，将导入两个文件，一个来自类路径，一个来自文件系统：

```shell
java -cp target/spring-boot-persistence-mongodb/WEB-INF/lib/*:target/spring-boot-persistence-mongodb/WEB-INF/classes \
  -Djdk.tls.client.protocols=TLSv1.2 \
  com.baeldung.SpringBootPersistenceApplication \
  --import=classpath:data.json.log \
  --import=/tmp/data.json \
  --collection=books
```

### 4.2. 通过HTTP POST上传JSON文件

此外，如果我们创建一个REST Controller，我们将拥有一个上传和导入JSON文件的端点。为此，我们需要一个_MultipartFile_参数：

```java
@RestController
@RequestMapping("/import-json")
public class ImportJsonController {
    @Autowired
    private ImportJsonService service;

    @PostMapping("/file/{collection}")
    public String postJsonFile(@RequestPart("parts") MultipartFile jsonStringsFile, @PathVariable String collection)  {
        List``````````<String>`````````` jsonLines = ImportUtils.lines(jsonStringsFile);
        return service.importTo(collection, jsonLines);
    }
}
```

现在，我们可以使用POST来导入文件，其中“_/tmp/data.json_”指的是一个存在的文件：

```shell
curl -X POST http://localhost:8082/import-json/file/books -F "parts=@/tmp/books.json"
```

### 4.3. 将JSON映射到特定的Java类型

我们一直在使用未绑定到任何类型的JSON，这是使用MongoDB的一个优势。**现在我们想要验证我们的输入。**在这种情况下，让我们通过在服务中进行以下更改来添加一个_ObjectMapper_：

```java
private ``<T>`` List````````<Document>```````` generateMongoDocs(List``````````<String>`````````` lines, Class``<T>`` type) {
    ObjectMapper mapper = new ObjectMapper();

    List````````<Document>```````` docs = new ArrayList<>();
    for (String json : lines) {
        if (type != null) {
            mapper.readValue(json, type);
        }
        docs.add(Document.parse(json));
    }
    return docs;
}
```

这样，如果指定了_type_参数，我们的_mapper_将尝试将我们的JSON字符串解析为该类型。**并且，默认配置将在存在任何未知属性时抛出异常。**这是我们用于MongoDB存储库的简单Bean定义：

```java
@Document("books")
public class Book {
    @Id
    private String id;
    private String name;
    private String genre;
    // getters and setters
}
```

现在，为了使用我们改进的文档生成器版本，让我们也更改这个方法：

```java
public String importTo(Class`<?>` type, List``````````<String>`````````` jsonLines) {
    List````````<Document>```````` mongoDocs = generateMongoDocs(jsonLines, type);
    String collection = type.getAnnotation(org.springframework.data.mongodb.core.mapping.Document.class)
      .value();
    int inserts = insertInto(collection, mongoDocs);
    return inserts + "/" + jsonLines.size();
}
```

现在，我们不是传递集合的名称，而是传递一个_Class_。我们假设它具有我们在_Book_中使用的_Document_注释，因此它可以检索集合名称。然而，由于注释和_Document_类具有相同的名称，我们必须指定整个包。

## 5. 结论

在本文中，我们经历了从文件、资源或简单字符串中拆分JSON输入并将它们导入MongoDB的过程。我们将此功能集中到一个服务类和一个实用程序类中，以便我们可以在任何地方重用它。**我们的使用案例包括CLI和REST选项，以及如何使用它们的示例命令。**

如往常一样，源代码可在GitHub上获取。