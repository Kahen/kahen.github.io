---
date: 2024-06-18
category:
  - Java
  - AWS
tag:
  - S3
  - SDK
  - 文件下载
head:
  - - meta
    - name: keywords
      content: Java, AWS S3, SDK, 文件下载
---

# 使用Java从S3 URL下载文件

在当今的软件领域，与云存储服务如Amazon Simple Storage Service (S3)的交互已成为许多应用程序的基本方面。一个常见的需求是使用提供的URL从S3下载文件。

在本文中，我们将探讨使用Java、Spring Boot和Java的AWS SDK来实现这一目标的简化方法。

## 2. 设置

首先，我们需要配置我们的AWS凭据以访问S3存储桶。这可以通过几种方式完成。对于开发目的，我们可以在_application.properties_文件中设置我们的凭据：

```
aws.accessKeyId=`<你的访问密钥ID>`
aws.secretKey=`<你的密钥>`
aws.region=`<你的区域>`
```

接下来，让我们包含AWS S3 maven依赖项：

```
`<dependency>`
    `<groupId>`software.amazon.awssdk`</groupId>`
    `<artifactId>`s3`</artifactId>`
    `<version>`${amazon.s3.version}`</version>`
`</dependency>`
```

## 3. 配置S3客户端

**S3客户端通常指允许用户与Amazon S3交互的软件或库。**由于我们使用AWS Java SDK，我们将使用Java AWS SDK提供的API创建S3客户端：

```
S3Client s3Client = S3Client.builder()
    .region(Region.US_EAST_1)
    .credentialsProvider(DefaultCredentialsProvider.create())
    .build();
```

**S3客户端在与Amazon S3交互时处理身份验证和授权。**它使用提供的凭据对S3服务的请求进行身份验证。在这种情况下，我们使用默认的凭据提供者配置客户端。这通常在环境变量或我们在先决条件设置中创建的共享凭据文件中查找凭据。

## 4. 定义下载服务

让我们定义一个与S3Client交互以进行下载的服务。

首先，让我们从定义服务的方法合同开始：

```
public interface FileService {
    FileDownloadResponse downloadFile(String s3url) throws IOException, S3Exception;
}
```

现在，让我们按顺序经历下载步骤。

### 4.1. 从URL中提取键和存储桶

在这一步，让我们专注于从有效的S3 URL中提取基本信息，特别是存储桶名称和对象键。

假设我们在名为“_baeldung_”的S3存储桶中存储了一个文件，路径为“_path/to/my/s3article.txt_”。这代表了S3存储桶中的分层结构，其中对象“_s3article.txt_”嵌套在“_path_”、“_to_”和“_my_”目录中。

为了以编程方式提取这些信息，我们将使用Java的URI类将S3 URL解码为其组成部分。然后，我们将分离主机名（存储桶名称）和路径（对象键）：

```
URI uri = new URI(s3Url);
String bucketName = uri.getHost();
String objectKey = uri.getPath()
    .substring(1);
```

考虑到前面的例子，我们将有URI“_s3://baeldung/path/to/my/s3article.txt_”，我们将提取存储桶名称为“_baeldung_”。对象键，表示存储桶内的路径，将是“_path/to/my/s3article.txt_”。**重要的是，通过使用_substring(1)_，我们将删除前导的“/”字符，得到的结果是对象键“path/to/my/s3article.txt”，这是S3对象键所需的格式。**

总之，在这里我们可以确定文件在S3存储桶内的位置，使我们能够构建请求并执行所需的对象操作。

### 4.2. 构建_GetObjectRequest_

现在，让我们使用AWS SDK构建一个_GetObjectRequest_：

```
GetObjectRequest getObjectRequest = GetObjectRequest.builder()
    .bucket(bucketName)
    .key(objectKey)
    .build();
```

_GetObjectRequest_具有从S3检索对象所需的信息，例如存储桶名称和要检索的对象的键。它还允许开发人员指定其他参数，如版本ID、范围、响应头等，以自定义对象检索过程的行为。

### 4.3. 发送_GetObjectRequest_

有了准备好的_GetObjectRequest_，我们将使用配置好的_S3Client_将其发送到Amazon S3以检索对象数据：

```
ResponseInputStream`<GetObjectResponse>` responseInputStream = s3ResponseReader.readResponse(getObjectRequest);
GetObjectResponse getObjectResponse = responseInputStream.response();
```

### 4.4. 响应数据和元数据

收到来自Amazon S3的响应后，我们将提取与相关元数据关联的文件内容。

让我们首先将文件内容提取为字节数组：

```
byte[] fileContent = IOUtils.toByteArray(responseInputStream);
```

接下来，让我们使用响检查一些有用的元数据：

```
// 获取对象元数据
String contentType = getObjectResponse.contentType();
String contentDisposition =  getObjectResponse.contentDisposition();
String key = getObjectRequest.key();
String filename = extractFilenameFromKey(key);
String originalFilename = contentDisposition == null ? filename : contentDisposition.substring(contentDisposition.indexOf("=")+1);
```

当向客户端发送响应时，将需要一些元数据。我们将创建一个抽象的_FileDownloadResponse_，它封装了文件内容作为字节，_contentType_和_originalFilename_：

```
@Builder
@Data
@RequiredArgsConstructor
public class FileDownloadResponse {
private final byte[] fileContent;
private final String originalFilename;
private final String contentType;
}
```

如果我们希望执行集成测试，我们可以考虑使用Test Containers来模拟S3。

## 5. 结论

在本文中，我们快速了解了如何使用提供的URL从S3下载文件。我们使用了由S3客户端组成的AWS Java SDK，使用户能够安全地访问和下载S3资源。它通过提供方便且一致的API来简化S3存储桶和对象的管理，以执行各种S3资源操作。

如常，本文的完整实现可以在GitHub上找到。

评论在文章发布后30天内开放。对于此日期之后的任何问题，请使用网站上的联系表单。