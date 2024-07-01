---
date: 2022-04-01
category:
  - AWS
  - Java
tag:
  - Amazon S3
  - Java SDK
head:
  - - meta
    - name: keywords
      content: Amazon S3, Java, 更新对象, S3对象, AWS SDK
---
# 使用Java更新现有的Amazon S3对象

Amazon Simple Storage Service（Amazon S3）是一种广泛使用的存储服务，提供可扩展、安全和持久的对象存储。有时我们需要更新现有的Amazon S3对象。在S3中，对象是不可变的，这意味着我们不能直接修改对象的内容。然而，我们可以通过使用新内容覆盖对象，有效地“更新”它。

在本教程中，我们将学习如何使用AWS Java SDK，用更新后的内容替换同一AWS S3路径上的现有文件内容。

## 2. 先决条件

首先，我们需要确保AWS SDK Maven依赖包被纳入项目中：

```
`<dependency>`
    `<groupId>`software.amazon.awssdk`</groupId>`
    `<artifactId>`s3`</artifactId>`
    `<version>`2.24.9`</version>`
`</dependency>`
```

可以在线上找到包的最新版本。

要使用AWS SDK，我们需要几样东西：

1. **AWS账户：**我们需要一个Amazon Web Services账户。如果我们没有，我们可以继续创建一个账户。
2. **AWS安全凭证：**这些是我们的访问密钥，允许我们对AWS API操作进行程序化调用。我们可以通过两种方式获取这些凭证，一种是使用安全凭证页面的访问密钥部分的AWS根账户凭证，另一种是使用IAM控制台的IAM用户凭证。
3. **选择AWS区域：**我们还必须选择我们想要存储Amazon S3数据的AWS区域。请注意，S3存储价格因地区而异。有关更多详细信息，请访问官方文档。在本教程中，我们将使用美国东部（俄亥俄州，区域_us-east-2_）。

有关凭证设置的全面指南，请参阅官方AWS文档。

## 3. 更新S3对象的步骤

### 3.1. 初始化S3客户端

首先，我们需要创建一个客户端连接以访问Amazon S3网络服务。为此目的，我们将使用_AmazonS3_接口：

```
AWSCredentials credentials = new BasicAWSCredentials(
        "AWS AccessKey",
        "AWS secretKey"
);
```

然后我们将配置客户端：

```
AmazonS3 s3client = AmazonS3ClientBuilder.standard()
        .withRegion(Regions.fromName("us-east-1"))
        .withCredentials(new AWSStaticCredentialsProvider(credentials))
        .build();
```

### 3.2. 将新对象上传到S3

现在我们可以使用AWS Java SDK中的_putObject()_方法将文件上传到S3存储桶：

```
PutObjectRequest request = PutObjectRequest.builder()
    .bucket(bucketName)
    .key(key)
    .build();

return s3Client.putObject(request, Path.of(file.toURI()));
```

以下是调用上述代码的代码片段：

```
s3Service.putObject(
    AWS_BUCKET,
    "Document/hello.txt",
    new File("/Users/user/Document/hello.txt")
);
```

### 3.3. 上传（覆盖）对象

由于S3中的对象是不可变的，“更新”一个对象涉及用新内容覆盖对象。因此，对于更新，我们需要使用添加文档时使用的同一组参数调用相同的putObject _()_方法：

```
public PutObjectResponse updateObject(String bucketName, String key, java.io.File file) {
    return this.putObject(bucketName, key, file);
}
```

这段代码将用提供的新内容替换现有对象。如果给定键的对象不存在，S3将创建一个新对象。

### 3.4. （可选）验证更新

我们可能想要验证对象是否已成功更新。一种方法是通过检索对象的元数据并检查_lastModified_日期，或者通过计算对象的校验和并将其与预期值进行比较。

```
HeadObjectRequest req = HeadObjectRequest.builder()
    .bucket(bucketName)
    .key(key)
    .build();

HeadObjectResponse response = s3Client.headObject(request);
System.out.println("Last Modified: " + response.lastModified());
```

## 4. 重要考虑事项

**我们还需要记住，在S3中，覆盖一个对象实际上是一个PUT操作，这可能会产生成本。在执行S3上的操作时，始终要注意成本影响。**

如果存储桶启用了版本控制，覆盖一个对象不会删除旧版本。相反，我们将拥有对象的多个版本。每个版本都有一个唯一的ID；如果需要，我们可以检索任何以前的版本。

**最后，如果对象关联了元数据，请意识到覆盖对象将用PUT操作期间提供的新的元数据替换旧的元数据。如果我们想保留旧的元数据，我们必须在请求中明确设置它。**

## 5. 结论

虽然我们不能直接修改S3对象的内容，但使用Java的AWS SDK覆盖对象以新内容是直接的。始终记住最佳实践，例如不要硬编码凭证，并注意操作的成本影响。有了这些步骤，我们可以自信地使用Java管理和更新S3对象。

本文的完整实现可以在GitHub上找到。