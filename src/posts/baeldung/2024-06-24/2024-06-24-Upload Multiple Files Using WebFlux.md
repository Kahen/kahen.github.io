---
date: 2024-06-24
category:
  - Spring WebFlux
  - 文件上传
tag:
  - Spring WebFlux
  - 文件上传
  - 异步I/O
  - 非阻塞
head:
  - - meta
    - name: keywords
      content: Spring WebFlux, 文件上传, 异步I/O, 非阻塞
------
# Spring WebFlux 多文件上传指南

## 1. 概述

Spring WebFlux 是一个响应式的 Web 框架，它提供了一个非阻塞事件循环来异步处理 I/O 操作。此外，它使用 _Mono_ 和 _Flux_ 反应式流发布者在订阅时发出数据。

这种响应式方法有助于应用程序在不分配大量资源的情况下处理大量请求和数据。

在本教程中，我们将学习如何通过 Spring WebFlux 逐步将多个文件上传到目录。此外，我们将把文件名映射到实体类，以便于检索。

## 2. 项目设置

让我们创建一个简单的反应式 Spring Boot 项目，将多个文件上传到目录。为了简单起见，我们将使用项目的根目录来存储文件。**在生产环境中，我们可以使用像 AWS S3、Azure Blob Storage、Oracle Cloud Infrastructure 存储等文件系统**。

### 2.1. Maven 依赖

首先，让我们通过向 _pom.xml_ 添加 _spring-boot-starter-webflux_ 依赖来启动一个 Spring WebFlux 应用程序：

```xml
````<dependency>````
    ````<groupId>````org.springframework.boot````</groupId>````
    ````<artifactId>````spring-boot-starter-webflux````</artifactId>````
    ````<version>````3.2.0````</version>````
````</dependency>````
```

**这提供了构建反应式 Web 应用程序的核心 Spring WebFlux API 和嵌入式 Netty 服务器**。

同时，让我们向 _pom.xml_ 文件添加 _spring-boot-starter-data-r2dbc_ 和 H2 数据库依赖：

```xml
````<dependency>````
    ````<groupId>````org.springframework.boot````</groupId>````
    ````<artifactId>````spring-boot-starter-data-r2dbc````</artifactId>````
    ````<version>````3.2.0````</version>````
````</dependency>````
````<dependency>````
    ````<groupId>````com.h2database````</groupId>````
    ````<artifactId>````h2````</artifactId>````
    ````<version>````2.2.224````</version>````
````</dependency>````
```

Spring WebFlux R2DBC 是一个反应式数据库连接器，H2 数据库是一个内存数据库。

最后，让我们向 _pom.xml_ 添加 R2DBC 原生驱动依赖：

```xml
````<dependency>````
    ````<groupId>````io.r2dbc````</groupId>````
    ````<artifactId>````r2dbc-h2````</artifactId>````
    ````<version>````1.0.0.RELEASE````</version>````
````</dependency>````
```

这个原生驱动是为 H2 数据库实现的。

### 2.2. 实体、仓库和控制器

让我们创建一个名为 _FileRecord_ 的实体类：

```java
class FileRecord {
    @Id
    private int id;
    private List``<String>`` filenames;

    // 标准的 getter, setter, 构造函数
}
```

接下来，让我们创建一个名为 _FileRecordRepository_ 的仓库：

```java
@Repository
interface FileRecordRepository extends R2dbcRepository`<FileRecord, Integer>` {
}
```

最后，让我们创建一个控制器类：

```java
@RestController
class FileRecordController {
}
```

在后续部分中，我们将把文件名及其扩展名映射到 _fileName_ 字段。

## 3. 将文件上传到目录

有时，我们可能会将多个文件上传到文件系统，而不将文件名映射到数据库实体。**在这种情况下，以后检索文件可能会有挑战**。

让我们看一个示例代码，它将多个文件上传到我们的根目录，而不映射文件名到实体：

```java
@PostMapping("/upload-files")
Mono``<String>`` uploadFileWithoutEntity(@RequestPart("files") Flux``<FilePart>`` filePartFlux) {
    return filePartFlux.flatMap(file ->
        file.transferTo(Paths.get(file.filename()))
    ).then(Mono.just("OK"))
    .onErrorResume(error -> Mono.just("Error uploading files"));
}
```

首先，我们创建了一个名为 _uploadFileWithoutEntity()_ 的方法，它接受 _FilePart_ 对象的 _Flux_。**然后，我们对每个 _FilePart_ 对象调用 _flatMap()_ 方法来传输文件并返回一个 _Mono_**。这为每个文件传输操作创建了一个单独的 _Mono_，并将 _Mono_ 流展平为一个单一的 _Mono_。

让我们通过 Postman 测试端点：

在上面的图片中，我们将三个文件上传到项目根目录。端点返回 _OK_ 以显示操作已成功完成。

**值得注意的是，我们使用 _onErrorResume()_ 方法来显式处理与文件上传相关的错误。如果上传过程中发生失败，端点将返回错误消息**。

然而，在失败之前上传的文件可能已经成功传输。在这种情况下，可能需要清理以删除错误时的部分上传文件。为了简单起见，我们没有涵盖清理过程。

## 4. 将上传的文件映射到数据库实体

此外，我们可以将文件名映射到数据库实体。这使我们以后可以通过它们的 _Id_ 检索文件。当我们想要显示图像或执行进一步计算时，这很有用。

### 4.1. 数据库配置

首先，让我们在资源文件夹中创建一个 _schema.sql_ 文件来定义数据库表结构：

```sql
CREATE TABLE IF NOT EXISTS file_record (
    id INT NOT NULL AUTO_INCREMENT,
    filenames VARCHAR(255),
    PRIMARY KEY (id)
);
```

在这里，我们创建了一个文件记录表来存储上传的文件名及其扩展名。接下来，让我们编写一个配置来在启动时初始化模式：

```java
@Bean
ConnectionFactoryInitializer initializer(ConnectionFactory connectionFactory) {
    ConnectionFactoryInitializer initializer = new ConnectionFactoryInitializer();
    initializer.setConnectionFactory(connectionFactory);
    initializer.setDatabasePopulator(new ResourceDatabasePopulator(new ClassPathResource("schema.sql")));

    return initializer;
}
```

同时，让我们在 _application.properties_ 文件中定义数据库 URL：

```properties
spring.r2dbc.url=r2dbc:h2:file:///./testdb
```

在这里，我们定义了 R2DBC URL 以连接到 H2 数据库。为了简单起见，数据库没有用密码保护。

### 4.2. 服务层

首先，让我们创建一个服务类并添加处理数据持久性的逻辑：

```java
@Service
public class FileRecordService {
    private FileRecordRepository fileRecordRepository;

    public FileRecordService(FileRecordRepository fileRecordRepository) {
        this.fileRecordRepository = fileRecordRepository;
    }

    public Mono````<FileRecord>```` save(FileRecord fileRecord) {
        return fileRecordRepository.save(fileRecord);
    }
}
```

**在这里，我们在服务类中注入了 _FileRecordRepository_ 接口，并定义了保存文件名及其扩展名到数据库的逻辑**。

接下来，让我们将 _FileRecordService_ 类注入到控制器类中：

```java
private FileRecordService fileRecordService;

public FileRecordController(FileRecordService fileRecordService) {
    this.fileRecordService = fileRecordService;
}
```

上面的代码使持久化数据的逻辑在控制器类中可用。

### 4.3. 上传端点

最后，让我们编写一个端点，将多个文件上传到根目录，并将文件名及其扩展名映射到实体类：

```java
@PostMapping("/upload-files-entity")
Mono````<FileRecord>```` uploadFileWithEntity(@RequestPart("files") Flux``<FilePart>`` filePartFlux) {
    FileRecord fileRecord = new FileRecord();

    return filePartFlux.flatMap(filePart ->
        filePart.transferTo(Paths.get(filePart.filename()))
    ).then(Mono.just(filePart.filename()))
    .collectList()
    .flatMap(filenames -> {
        fileRecord.setFilenames(filenames);
        return fileRecordService.save(fileRecord);
    })
    .onErrorResume(error -> Mono.error(error));
}
```

在这里，我们创建了一个发出 _Mono_ 的端点。**它接受 _FilePart_ 的 _Flux_ 并上传每个文件。接下来，它收集文件名及其扩展名，并将它们映射到 _FileRecord_ 实体**。

让我们使用 Postman 测试端点：

在这里，我们将名为 _spring-config.xml_ 和 _server_name.png_ 的两个文件上传到服务器。POST 请求发出一个 _Mono_，显示请求的详细信息。

为了简单起见，我们没有验证文件名、类型和大小。

### 4.4. 通过 _Id_ 检索文件

让我们实现一个端点，通过其 _Id_ 检索存储的文件记录以查看关联的文件名。

首先，让我们将通过其 _Id_ 检索文件记录的逻辑添加到服务类中：

```java
Mono````<FileRecord>```` findById(int id) {
    return fileRecordRepository.findById(id);
}
```

在这里，我们调用 _bookRepository_ 上的 _findById()_ 来检索存储的书籍。

接下来，让我们编写一个检索文件记录的端点：

```java
@GetMapping("/files/{id}")
Mono````<FileRecord>```` getFilesById(@PathVariable("id") int id) {
    return```java
fileRecordService.findById(id)
    .onErrorResume(error -> Mono.error(error));
}
```

这个端点返回一个包含文件 _Id_ 和文件名的 _Mono_。

让我们看看使用 Postman 的端点操作：

上面的图片显示了返回的文件信息。**可以在 API 响应中返回图片文件的 URL。客户端可以使用这些 URL 来检索和显示图片**。通过将文件传递给处理服务，可以实现对图片的额外处理和编辑。

## 5. 结论

在本文中，我们学习了如何使用 Spring WebFlux 将多个文件上传到服务器文件系统。我们还看到了如何带或不带将文件名和扩展名映射到数据库实体来上传文件。

最后，我们看到了一种将文件上传并将其名称和扩展名持久化到数据库的方法。

如往常一样，示例的完整源代码可在 GitHub 上找到。

OK