---
date: 2024-06-21
category:
  - Java
  - AWS
tag:
  - S3
  - Mock
  - Testing
head:
  - - meta
    - name: keywords
      content: Java, AWS S3, Mock, Testing, Integration Testing
---
# 如何为集成测试模拟Amazon S3 | Baeldung

## 1. 引言

在本文中，我们将学习如何模拟Amazon S3（简单存储服务）以运行Java应用程序的集成测试。

为了演示它的工作原理，我们将创建一个使用AWS SDK与S3交互的CRUD（创建、读取、更新、删除）服务。然后，我们将使用模拟的S3服务为每个操作编写集成测试。

## 2. S3概述

Amazon Simple Storage Service（S3）是由Amazon Web Services（AWS）提供的高可扩展性和安全的云存储服务。它使用**对象存储模型，允许用户从网络上的任何地方存储和检索数据**。

该服务可通过REST风格的API访问，AWS为Java应用程序提供了一个SDK，以执行创建、列出和删除S3存储桶和对象等操作。

接下来，让我们开始使用AWS SDK创建Java S3 CRUD服务，并实现创建、读取、更新和删除操作。

## 3. 演示S3 CRUD Java服务

在我们开始使用S3之前，我们需要向我们的项目添加AWS SDK的依赖项：

```xml
````<dependency>````
    ````<groupId>````software.amazon.awssdk````</groupId>````
    ````<artifactId>````s3````</artifactId>````
    ````<version>````2.20.52````</version>````
````</dependency>````
```

要查看最新版本，我们可以检查Maven Central。

接下来，我们创建了使用`software.amazon.awssdk.services.s3.S3Client`作为依赖项的`S3CrudService`类：

```java
class S3CrudService {
    private final S3Client s3Client;

    public S3CrudService(S3Client s3Client) {
        this.s3Client = s3Client;
    }

    // ...
}
```

现在我们已经创建了服务，**让我们使用AWS SDK提供的`S3Client` API实现`createBucket()`、`createObject()`、`getObject()`和`deleteObject()`操作**：

```java
void createBucket(String bucketName) {
    // 构建bucketRequest
    s3Client.createBucket(bucketRequest);
}

void createObject(String bucketName, File inMemoryObject) {
    // 构建putObjectRequest
    s3Client.putObject(request, RequestBody.fromByteBuffer(inMemoryObject.getContent()));
}

Optional`<byte[]>` getObject(String bucketName, String objectKey) {
    try {
        // 构建getObjectRequest
        ResponseBytes`<GetObjectResponse>` responseResponseBytes = s3Client.getObjectAsBytes(getObjectRequest);
        return Optional.of(responseResponseBytes.asByteArray());
    } catch (S3Exception e) {
        return Optional.empty();
    }
}

boolean deleteObject(String bucketName, String objectKey) {
    try {
        // 构建deleteObjectRequest
        s3Client.deleteObject(deleteObjectRequest);
        return true;
    } catch (S3Exception e) {
        return false;
    }
}
```

现在我们已经创建了S3操作，让我们学习如何使用模拟的S3服务实现集成测试。

## 4. 使用S3Mock库进行集成测试

对于本教程，**我们选择使用Adobe提供的S3Mock库，该库在开源Apache V2许可下提供**。S3Mock是一个轻量级服务器，实现了Amazon S3 API中最常用的操作。对于支持的S3操作，我们可以在S3Mock存储库的自述文件的专用部分中进行检查。

库的开发者建议在隔离环境中运行S3Mock服务，最好使用提供的Docker容器。

按照建议，**让我们使用Docker和Testcontainers为集成测试运行S3Mock服务**。

### 4.1. 依赖项

接下来，让我们添加运行S3Mock以及Testcontainers所需的依赖项：

```xml
````<dependency>````
    ````<groupId>````com.adobe.testing````</groupId>````
    ````<artifactId>````s3mock````</artifactId>````
    ````<version>````3.3.0````</version>````
    ```<scope>```test```</scope>```
````</dependency>````
````<dependency>````
    ````<groupId>````com.adobe.testing````</groupId>````
    ````<artifactId>````s3mock-testcontainers````</artifactId>````
    ````<version>````3.3.0````</version>````
    ```<scope>```test```</scope>```
````</dependency>````
````<dependency>````
    ````<groupId>````org.testcontainers````</groupId>````
    ````<artifactId>````junit-jupiter````</artifactId>````
    ````<version>````1.19.4````</version>````
    ```<scope>```test```</scope>```
````</dependency>````
```

我们可以在Maven Central上查看_s3mock_、_s3mock-testcontainers_、_junit-jupiter_的最新版本。

### 4.2. 设置

**作为先决条件，我们必须有一个运行中的Docker环境，以确保可以启动Test Containers。**

当我们在集成测试类上使用_@TestConainers_和_@Container_注解时，将从注册表中拉取_S3MockContainer_的最新Docker镜像，并在本地Docker环境中启动：

```java
@Testcontainers
class S3CrudServiceIntegrationTest {
    @Container
    private S3MockContainer s3Mock = new S3MockContainer("latest");
}
```

在运行集成测试之前，让我们在_@BeforeEach_生命周期方法中创建一个_S3Client_实例：

```java
@BeforeEach
void setUp() {
    var endpoint = s3Mock.getHttpsEndpoint();
    var serviceConfig = S3Configuration.builder()
      .pathStyleAccessEnabled(true)
      .build();
    var httpClient = UrlConnectionHttpClient.builder()
      .buildWithDefaults(AttributeMap.builder()
        .put(TRUST_ALL_CERTIFICATES, Boolean.TRUE)
        .build());
    s3Client = S3Client.builder()
      .endpointOverride(URI.create(endpoint))
      .serviceConfiguration(serviceConfig)
      .httpClient(httpClient)
      .build();
}
```

在_setup()_方法中，我们使用_S3Client_接口提供的构建器初始化了一个_S3Client_实例。在此初始化中，我们为以下参数指定了配置：

- **_endpointOverwrite_**：此参数配置为定义模拟服务的地址。
- **_pathStyleAccessEnabled_**：我们在服务配置中将此参数设置为_true_。
- _**TRUST_ALL_CERTIFICATES**_：此外，我们配置了一个_httpClient_实例，通过将_TRUST_ALL_CERTIFICATES_设置为_true_，信任所有证书。

### 4.3. 为_S3CrudService_编写集成测试

完成基础设施设置后，让我们为_S3CrudService_操作编写一些集成测试。

首先，让我们创建一个存储桶并验证其成功创建：

```java
var s3CrudService = new S3CrudService(s3Client);
s3CrudService.createBucket(TEST_BUCKET_NAME);

var createdBucketName = s3Client.listBuckets().buckets().get(0).name();
assertThat(TEST_BUCKET_NAME).isEqualTo(createdBucketName);
```

成功创建存储桶后，让我们在S3中上传一个新对象。

为此，首先使用_FileGenerator_生成一个字节数组，然后使用已创建的存储桶中的_createObject()_方法将其保存为对象：

```java
var fileToSave = FileGenerator.generateFiles(1, 100).get(0);
s3CrudService.createObject(TEST_BUCKET_NAME, fileToSave);
```

接下来，让我们使用已保存文件的文件名调用_getObject()_方法，以确认对象确实保存在S3中：

```java
var savedFileContent = s3CrudService.getObject(TEST_BUCKET_NAME, fileToSave.getName());
assertThat(Arrays.equals(fileToSave.getContent().array(), savedFileContent)).isTrue();
```

最后，让我们测试_deleteObject()_是否也按预期工作。首先，我们使用存储桶名称和目标文件名调用_deleteObject()_方法。随后，我们再次调用_getObject()_并检查结果是否为空：

```java
s3CrudService.deleteObject(TEST_BUCKET_NAME, fileToSave.getName());

var deletedFileContent = s3CrudService.getObject(TEST_BUCKET_NAME, fileToSave.getName());
assertThat(deletedFileContent).isEmpty();
```

## 5. 结论

在本教程中，**我们学习了如何使用_S3Mock_库模拟真实的S3服务来编写依赖于AWS S3服务的集成测试**。

为了演示这一点，我们首先实现了一个基本的CRUD服务，用于在S3中创建、读取和删除对象。然后，我们使用S3Mock库实现了集成测试。

如常，本文的完整实现可以在GitHub上找到。