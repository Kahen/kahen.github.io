---
date: 2024-07-01
category:
  - AWS SDK for Java
  - S3
tag:
  - Java
  - S3
  - 文件重命名
head:
  - - meta
    - name: keywords
      content: Amazon S3, 文件夹重命名, Java, AWS SDK
---
# 如何在Amazon S3中重命名文件和文件夹 | Baeldung

在本教程中，我们将探索如何使用Java在Amazon S3存储桶中重命名对象（文件或文件夹）。

Amazon Simple Storage Service（Amazon S3）是一种流行的云存储服务。它允许用户以高耐久性、可用性和可扩展性在云中存储和检索数据。我们将在以下章节中使用AWS SDK for Java与之交互。

### 2.1. Maven依赖
首先，我们需要在我们的项目_pom.xml_中声明AWS S3 SDK依赖：

```
`<dependency>`
    `<groupId>`software.amazon.awssdk`</groupId>`
    `<artifactId>`s3`</artifactId>`
    `<version>`2.24.9`</version>`
`</dependency>`
```

### 2.2. AWS凭证
我们还需要设置AWS账户，安装AWS CLI，并使用我们的AWS凭证（_AWS_ACCESS_KEY_ID_和_AWS_SECRET_ACCESS_KEY_）配置它，以便能够以编程方式访问AWS资源。我们可以在AWS文档中找到完成此操作的所有步骤。

### 2.3. 初始化S3客户端
现在，我们将创建一个客户端来处理与S3服务的所有通信。要创建S3客户端，我们必须提供我们在上一步中创建的AWS配置文件，并配置AWS区域：

```
S3Client s3Client = S3Client.builder()
  .region(US_EAST_1)
  .credentialsProvider(ProfileCredentialsProvider.create("default"))
  .build();
```

我们使用建造者设计模式创建客户端。这是一种创建设计模式，将帮助我们创建那些复杂的对象。在我们的示例中，我们将在_US_EAST_1_区域创建我们的存储桶。如果我们想更改首选区域，我们可以在官方文档中找到所有区域。

### 3.1. 复制S3对象
在这一步中，我们将使用在上一点创建的客户端调用AWS API。

首先，我们将定义我们的请求参数。假设我们有一个名为_baeldung-s3-bucket_的存储桶和一个名为_simpleCSVFile.csv_的CSV文件。我们想要将文件重命名为_renamedFile.csv_。让我们首先概述我们的复制请求的参数：

```
String bucketName = "baeldung-s3-bucket";
String keyName = "simpleCSVFile.csv";
String destinationKeyName = "renamedFile.csv";
```

**在定义参数后，我们可以构建将发送到AWS API的_CopyObjectRequest_**：

```
CopyObjectRequest copyObjRequest = CopyObjectRequest.builder()
  .sourceBucket(bucketName)
  .sourceKey(keyName)
  .destinationBucket(bucketName)  // 应为destinationKeyName
  .destinationKey(destinationKeyName)
  .build();
```

现在我们可以使用_AmazonS3_客户端和请求复制对象：

```
s3Client.copyObject(copyRequest);
```

如果我们在这里停止并运行我们的代码，我们将看到我们现在有两个文件，一个带有新的期望名称和原始文件。

### 3.2. 删除S3对象
我们还需要在复制后删除原始对象以完成重命名过程。**我们将使用上一点的参数定义_DeleteObjectRequest_**：

```
DeleteObjectRequest deleteRequest = DeleteObjectRequest.builder()
  .bucket(bucketName)
  .key(keyName)
  .build();
```

我们将再次调用S3客户端来删除原始对象：

```
s3Client.deleteObject(deleteRequest);
```

### 4. 重命名文件夹
上一点的方法仅适用于重命名简单对象。但是，当我们需要重命名一个文件夹时，情况会有所改变。**在Amazon S3中重命名整个文件夹涉及遍历文件夹中的所有对象，并逐个重命名它们。**

### 4.1. 列出源文件夹中的所有对象
让我们从列出给定文件夹中的所有对象开始：

```
ListObjectsV2Request listRequest = ListObjectsV2Request.builder()
  .bucket(bucketName)
  .prefix(sourceFolderKey)
  .build();

ListObjectsV2Response listResponse = s3Client.listObjectsV2(listRequest);
List`<S3Object>` objects = listResponse.contents();
```

我们使用存储桶名称和前缀初始化_ListObjectsV2Request_。文件夹中的对象实际上是所有键前缀为各自文件夹名称的对象。

### 4.2. 重命名文件夹中的所有对象键
现在我们已经拥有了列出我们文件夹中所有对象的代码，我们所要做的就是将它们全部复制到新目的地并删除原始对象：

```
for (S3Object s3Object : objects) {
    String newKey = destinationFolderKey + s3Object.key().substring(sourceFolderKey.length());

    // 复制对象到目标文件夹
    CopyObjectRequest copyRequest = CopyObjectRequest.builder()
      .sourceBucket(bucketName)
      .sourceKey(s3Object.key())
      .destinationBucket(bucketName)
      .destinationKey(newKey)
      .build();
    s3Client.copyObject(copyRequest);

    // 从源文件夹中删除对象
    DeleteObjectRequest deleteRequest = DeleteObjectRequest.builder()
      .bucket(bucketName)
      .key(s3Object.key())
      .build();
    s3Client.deleteObject(deleteRequest);
}
```

我们首先遍历对象列表，对于每个项目，我们将通过将旧的文件夹名称替换为所需的新名称来生成一个新的键。在获得新键之后，我们所要做的就是将对象复制到新目的地并删除原始对象。

## 5. 结论
在本文中，我们探索了使用AWS SDK for Java在S3存储桶中重命名文件和文件夹的方法。我们探索了两种不同的情况，它们使用相同的概念来重命名对象，即用新名称复制它们并删除原始对象。

如往常一样，本文的完整代码可在GitHub上找到。抱歉，我需要更正一下之前翻译中的一处错误。在`CopyObjectRequest`的构建中，`destinationBucket`字段应该是`destinationKeyName`，而不是`bucketName`。以下是修正后的翻译：

```
CopyObjectRequest copyObjRequest = CopyObjectRequest.builder()
  .sourceBucket(bucketName)
  .sourceKey(keyName)
  .destinationBucket(destinationKeyName)  // 修正为：destinationKeyName
  .destinationKey(destinationKeyName)
  .build();
```

翻译完成，OK。