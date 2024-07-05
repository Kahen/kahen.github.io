---
date: 2023-05-04
category:
  - Introduction
tag:
  - MinIO
  - S3
head:
  - - meta
    - name: keywords
      content: MinIO, S3, object storage, API compatibility, open-source
---
# MinIO简介

MinIO是一个高性能的对象存储系统。它被设计为云原生存储系统的替代品。事实上，它的API与亚马逊S3完全兼容。

在本教程中，我们将快速介绍如何使用MinIO。

## 关于MinIO

MinIO从一开始就被设计为亚马逊S3存储API的完全兼容替代品。他们声称自己是最具兼容性的S3替代品，同时还提供可比的性能和可扩展性。

MinIO还提供了多种部署选项。它可以作为本地应用程序在大多数流行的架构上运行，也可以使用Docker或Kubernetes作为容器化应用程序部署。

此外，MinIO是开源软件。组织可以自由地在AGPLv3许可证的条款下使用它。只是要注意，这个选项除了在线文档和MinIO用户社区之外没有支持。对于较大的企业，也有提供专用支持的付费订阅。

由于其S3 API的兼容性，能够在多种部署中运行，以及开源的特性，MinIO是开发和测试，以及DevOps场景中的重要工具。

### 2.1 对象存储的工作原理

对象存储的概念类似于标准的Unix文件系统，但我们使用的是存储桶和对象，而不是目录和文件。

存储桶可以像目录一样嵌套到层次结构中，对象可以被看作是字节的集合。这些集合可以是任意的字节数组或正常的文件，如图像、PDF等。

一个示例对象存储系统可能看起来像这样：

```
/
/images/
  image1.png
  image2.jpg
/videos/
  video1.mp4
/users/
  /john.doe/
    3rd quarter revenue report.docx
```

就像目录和文件一样，存储桶和对象可以有权限。这允许对数据进行细粒度的访问控制，特别是在有许多用户的大组织中。

## 安装MinIO

正如前面提到的，MinIO几乎适用于每个平台。Windows、Linux和MacOS都有独立的安装程序。然而，对于开发和测试目的，最简单的入门方式是使用容器化分发。

让我们以容器的形式运行一个独立的MinIO服务器：

```
$ docker run -p 9000:9000 -p 9001:9001 \
  quay.io/minio/minio server /data --console-address ":9001"
```

虽然容器化部署对于评估MinIO来说是完全可行的，但**需要意识到一些限制**。

特别是，一些高级功能，如版本控制、对象锁定和存储桶复制在单服务器部署中不可用。这些功能需要MinIO的分布式部署，这在单服务器部署中不可用。

## 使用MinIO

**有多种不同的方式来与MinIO服务器交互和管理存储桶和对象**。下面，我们将看看它们全部。

### 4.1 MinIO客户端

MinIO客户端提供了与Unix文件管理命令相同的命令，如_cp和_ls，但它是为本地和远程存储系统设计的。它完全兼容AWS S3，其语法模仿了AWS客户端工具。

使用MinIO客户端的第一步是配置它与云存储系统通信。让我们将其指向上面的容器化部署：

```
$ mc alias set docker_minio http://127.0.0.1:9000 minioadmin minioadmin
```

这个命令创建了一个别名，指向在localhost上的端口9000的MinIO容器化部署。在这个部署中，默认的访问密钥和秘密密钥都是_minioadmin_。

我们可以使用_admin_子命令来验证连接：

```
$ mc admin info docker_minio

   127.0.0.1:9000
   Uptime: 3 minutes
   Version: 2023-05-04T21:44:30Z
   Network: 1/1 OK
   Drives: 1/1 OK
   Pool: 1

Pools:
   1st, Erasure sets: 1, Drives per erasure set: 1

1 drive online, 0 drives offline
```

**现在，我们可以开始执行创建存储桶和对象等基本操作**。MinIO客户端的许多子命令都模仿了熟悉的Unix命令：

- _cp_: 在文件系统之间复制文件或对象。
- _ls_: 在存储桶中列出文件或对象。
- _mb_: 创建存储桶（类似于Linux上的_mkdir_）。
- _mv_: 移动/重新定位文件或对象从一个文件系统到另一个。
- _rb_: 删除存储桶（类似于Linux上的_rmdir_）。
- _rm_: 删除文件或对象。

**这些子命令中的大多数在本地文件系统和云存储上都有效**。例如，我们可以使用以下命令序列来创建一个新的存储桶，将文件复制到该存储桶中，将对象在存储桶之间移动，然后删除存储桶：

```
$ mc mb user1
$ mc cp ~/Resume.pdf prattm
$ mc mb user2
$ mc cp user1/Resume.pdf user2
$ mc rb user1
$ mc ls user2
[2023-05-15 21:39:10 MDT]     491K Resume.pdf
```

### 4.2 MinIO控制台

另一种在MinIO部署中管理数据的方式是使用基于Web的管理控制台。对于容器化部署，我们首先在Web浏览器中打开地址http://127.0.0.1:9001。我们使用默认的凭证_minioadmin_ / _minioadmin_登录。

从那里，我们可以创建我们的第一个存储桶：

![img](https://www.baeldung.com/wp-content/uploads/2023/05/minio-admin-console-create-bucket-1024x515.jpg)

记住**并非所有选项，例如版本控制，将适用于我们的容器化部署**。

现在，我们可以导航到_Object Browser_并点击我们的新存储桶。在这个屏幕上，我们有几个选项。首先，我们可以使用_Create new path_按钮创建子存储桶：

![img](https://www.baeldung.com/wp-content/uploads/2023/05/minio-admin-console-create-path-1024x381.jpg)

我们还可以将文件作为新对象上传到存储桶中：

![img](https://www.baeldung.com/wp-content/uploads/2023/05/minio-admin-console-upload-file-1024x277.jpg)

总的来说，MinIO管理控制台的功能等同于命令行客户端。然而，它确实有一些小的差异。

首先，与命令行客户端不同，使用客户端无法在存储桶之间移动对象。

此外，命令行客户端还有一些子命令，在管理控制台中不存在。例如，_diff_、_du_和_pipe_子命令都模仿了标准的Unix命令，并且在管理控制台中没有等效的命令。

### 4.3 MinIO Java SDK

我们将看到的与MinIO工作的最后一种方式是使用Java SDK。首先，在应用程序中包含所需的依赖项：

```
`<dependency>`
    `<groupId>`io.minio`</groupId>`
    `<artifactId>`minio`</artifactId>`
    `<version>`8.5.2`</version>`
`</dependency>`
```

使用Java SDK的第一步是创建客户端实例：

```
MinioClient minioClient =
  MinioClient.builder()
    .endpoint("http://127.0.0.1:9000")
    .credentials("minioadmin", "minioadmin")
    .build();
```

**这个客户端可以执行我们之前在命令行工具和控制台中看到的相同操作**。例如，我们可以创建一个存储桶：

```
minioClient.makeBucket(
  MakeBucketArgs
    .builder()
    .bucket("user1")
    .build());
```

然后，我们可以将文件作为对象上传到该存储桶中：

```
minioClient.putObject(PutObjectArgs
  .builder()
  .bucket("user1")
  .object("Resume.pdf")
  .stream(new FileInputStream("/tmp/Resume.pdf")
  .build());
```

最后，让我们看看如何从存储桶中获取对象：

```
try (InputStream stream =
  minioClient.getObject(GetObjectArgs
    .builder()
    .bucket("user2")
    .object("Resume.pdf")
    .build())) {
    // 读取流
}
```

这只是Java SDK的一小部分示例。记住，因为MinIO完全兼容S3，**相同的代码可以用于Amazon S3**。

## 结论

在本文中，我们简要介绍了MinIO，这是一个具有完整S3兼容性的对象存储引擎。虽然它是一个生产级的对象存储系统，但它也适合其他用例。因为它是开源的，可以部署在任何地方，并且完全兼容S3，所以它是开发和测试环境的一个很好的替代品。