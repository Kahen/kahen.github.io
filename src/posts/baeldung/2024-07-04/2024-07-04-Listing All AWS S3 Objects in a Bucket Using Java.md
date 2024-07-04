---
date: 2023-06-01
category:
  - AWS
  - Java
tag:
  - S3
  - Java SDK
head:
  - - meta
    - name: keywords
      content: AWS S3, Java, 列表, 对象, 桶, 分页
---

# 在Java中使用AWS S3列出存储桶中的所有对象

## 1. 概述

本文将重点介绍如何使用Java列出S3存储桶中的所有对象。我们将讨论使用AWS SDK for Java V2与S3交互的方法，并查看不同用例的示例。

我们将重点使用Java V2版本的AWS SDK，它以其比前一个版本有多项改进而著称，例如增强的性能、非阻塞I/O和用户友好的API设计。

## 2. 先决条件

要列出S3存储桶中的所有对象，我们可以利用AWS SDK for Java提供的_S3Client_类。

首先，让我们创建一个新的Java项目，并将以下Maven依赖项添加到我们的_pom.xml_文件中：

```
`<dependency>`
    `<groupId>`software.amazon.awssdk`</groupId>`
    `<artifactId>`s3`</artifactId>`
    `<version>`2.24.9`</version>`
`</dependency>`
```

在本文的示例中，我们将使用版本_2.20.52_。要查看最新版本，我们可以检查Maven仓库。

我们还需要设置AWS账户，安装AWS CLI，并使用我们的AWS凭据( _AWS_ACCESS_KEY_ID_ 和 _AWS_SECRET_ACCESS_KEY_ )进行配置，以便能够以编程方式访问AWS资源。我们可以在AWS文档中找到完成此操作的所有步骤。

最后，我们需要创建一个AWS S3存储桶并上传一些文件。正如我们在以下图片中看到的，对于我们的示例，我们创建了一个名为_baeldung-tutorials-s3_的存储桶，并上传了1060个文件：

![img](https://www.baeldung.com/wp-content/uploads/2023/06/aws-s3-bucket-1-1024x879.png)

## 3. 从S3存储桶中列出对象

让我们使用AWS SDK for Java V2并创建一个方法来从存储桶中读取对象：

```
String AWS_BUCKET = "baeldung-tutorial-s3";
Region AWS_REGION = Region.EU_CENTRAL_1;
```

```
void listObjectsInBucket() {
    S3Client s3Client = S3Client.builder()
      .region(AWS_REGION)
      .build();

    ListObjectsV2Request listObjectsV2Request = ListObjectsV2Request.builder()
      .bucket(AWS_BUCKET)
      .build();
    ListObjectsV2Response listObjectsV2Response = s3Client.listObjectsV2(listObjectsV2Request);

    List`<S3Object>` contents = listObjectsV2Response.contents();

    System.out.println("存储桶中的对象数量: " + contents.stream().count());
    contents.stream().forEach(System.out::println);

    s3Client.close();
}
```

要从AWS S3存储桶中列出对象，我们首先需要创建一个_ListObjectsV2Request_实例，指定存储桶名称。然后，我们在_s3Client_对象上调用_listObjectsV2_方法，将请求作为参数传递。此方法返回一个_ListObjectsV2Response_，其中包含有关存储桶中对象的信息。

最后，我们使用_contents()_方法访问S3对象列表，并将检索到的对象数量作为输出。我们还为存储桶名称和相应的AWS区域定义了两个静态属性。

执行该方法后，我们得到以下结果：

```
存储桶中的对象数量: 1000
S3Object(Key=file_0.txt, LastModified=2023-06-06T11:35:06Z, ETag="b9ece18c950afbfa6b0fdbfa4ff731d3", Size=1, StorageClass=STANDARD)
S3Object(Key=file_1.txt, LastModified=2023-06-06T11:35:07Z, ETag="97a6dd4c45b23db9c5d603ce161b8cab", Size=1, StorageClass=STANDARD)
S3Object(Key=file_10.txt, LastModified=2023-06-06T11:35:07Z, ETag="3406877694691ddd1dfb0aca54681407", Size=1, StorageClass=STANDARD)
S3Object(Key=file_100.txt, LastModified=2023-06-06T11:35:15Z, ETag="b99834bc19bbad24580b3adfa04fb947", Size=1, StorageClass=STANDARD)
S3Object(Key=file_1000.txt, LastModified=2023-04-29T18:54:31Z, ETag="47ed733b8d10be225eceba344d533586", Size=1, StorageClass=STANDARD)
[...]
```

正如我们所看到的，我们没有得到所有上传的对象作为结果返回。

**需要注意的是，这个解决方案设计上只返回最多1000个对象。如果存储桶包含超过1000个对象，我们必须使用_ListObjectsV2Response_对象中的_nextContinuationToken()_方法实现分页。**

如果AWS S3存储桶包含超过1000个对象，我们需要使用_nextContinuationToken()_方法实现分页。

让我们看一个示例，演示如何处理这种情况：

```
void listAllObjectsInBucket() {
    S3Client s3Client = S3Client.builder()
      .region(AWS_REGION)
      .build();
    String nextContinuationToken = null;
    long totalObjects = 0;

    do {
        ListObjectsV2Request.Builder requestBuilder = ListObjectsV2Request.builder()
          .bucket(AWS_BUCKET)
          .continuationToken(nextContinuationToken);

        ListObjectsV2Response response = s3Client.listObjectsV2(requestBuilder.build());
        nextContinuationToken = response.nextContinuationToken();

        totalObjects += response.contents().stream()
          .peek(System.out::println)
          .reduce(0, (subtotal, element) -> subtotal + 1, Integer::sum);
    } while (nextContinuationToken != null);
    System.out.println("存储桶中的对象数量: " + totalObjects);

    s3Client.close();
}
```

在这里，我们使用_do-while_循环来分页浏览存储桶中的所有对象。循环继续进行，直到没有更多的续订令牌，这表明我们检索了所有对象。

因此，我们得到了以下输出：

```
存储桶中的对象数量: 1060
```

通过这种方法，我们显式地管理分页。我们检查续订令牌的存在，并在随后的请求中使用它。这为我们提供了在何时以及如何请求下一页的完全控制。它允许在处理分页过程时具有更大的灵活性。

**默认情况下，响应中返回的对象的最大数量是1000。它可能包含较少的键，但永远不会包含更多。我们可以通过_ListObjectsV2Reqeust_的_maxKeys()_方法来更改此设置。**

我们可以使用AWS SDK通过使用_ListObjectsV2Iterable_类和_listObjectsV2Paginator()_方法来为我们处理分页。这简化了代码，因为我们不需要手动管理分页过程。这导致代码更简洁、易读，更易于维护。

让我们看看如何将其付诸实践：

```
void listAllObjectsInBucketPaginated(int pageSize) {
    S3Client s3Client = S3Client.builder()
      .region(AWS_REGION)
      .build();

    ListObjectsV2Request listObjectsV2Request = ListObjectsV2Request.builder()
      .bucket(AWS_BUCKET )
      .maxKeys(pageSize) // 设置maxKeys参数以控制页面大小
      .build();

    ListObjectsV2Iterable listObjectsV2Iterable = s3Client.listObjectsV2Paginator(listObjectsV2Request);
    long totalObjects = 0;

    for (ListObjectsV2Response page : listObjectsV2Iterable) {
        long retrievedPageSize = page.contents().stream()
          .peek(System.out::println)
          .reduce(0, (subtotal, element) -> subtotal + 1, Integer::sum);
        totalObjects += retrievedPageSize;
        System.out.println("页面大小: " + retrievedPageSize);
    }
    System.out.println("存储桶中的总对象数: " + totalObjects);

    s3Client.close()
}
```

这是我们在调用方法时，将_pageSize_设置为_500_时得到的输出：

```
S3Object(Key=file_0.txt, LastModified=2023-06-06T11:35:06Z, ETag="b9ece18c950afbfa6b0fdbfa4ff731d3", Size=1, StorageClass=STANDARD)
S3Object(Key=file_1.txt, LastModified=2023-06-06T11:35:07Z, ETag="97a6dd4c45b23db9c5d603ce161b8cab", Size=1, StorageClass=STANDARD)
S3Object(Key=file_10.txt, LastModified=2023-06-06T11:35:07Z,