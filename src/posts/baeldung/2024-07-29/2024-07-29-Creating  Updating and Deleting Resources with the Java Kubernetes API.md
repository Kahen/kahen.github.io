---
date: 2022-04-01
category:
  - Kubernetes
  - Java
tag:
  - Java
  - Kubernetes
  - API
head:
  - - meta
    - name: keywords
      content: Java, Kubernetes, CRUD, API
---
# 使用Java Kubernetes API进行资源的创建、更新和删除

在本教程中，我们将使用Kubernetes的官方Java API来执行资源的CRUD操作。

我们已经在之前的文章中介绍了这个API的基本使用方法，包括基本项目设置以及我们可以使用它来获取有关运行中集群的各种信息。

通常，Kubernetes部署大多是静态的。我们创建一些描述我们想要创建的内容的工件（例如YAML文件），然后将它们提交到DevOps流水线。然后，我们系统的各个部分保持不变，直到我们添加一个新组件或升级一个现有组件。

然而，有时我们需要即时添加资源。一个常见的例子是响应用户启动的请求来运行作业。作为响应，应用程序将启动一个后台作业来处理报告，并使其可供以后检索。

这里的关键是，通过使用这些API，我们可以更好地利用可用的基础设施，因为我们只有在需要时才消耗资源，之后释放它们。

### 2. 创建新资源

在这个例子中，我们将在Kubernetes集群中创建一个作业资源。作业是一种与其他类型不同的Kubernetes工作负载，它运行到完成为止。也就是说，一旦其pod中运行的程序终止，作业本身也会终止。它的YAML表示与其他资源类似：

```yaml
apiVersion: batch/v1
kind: Job
metadata:
  namespace: jobs
  name: report-job
  labels:
    app: reports
spec:
  template:
    metadata:
      name: payroll-report
    spec:
      containers:
      - name: main
        image: report-runner
        command:
        - payroll
        args:
        - --date
        - 2021-05-01
      restartPolicy: Never
```

Kubernetes API提供了两种创建等效Java对象的方法：

- 使用_new_创建POJOS并通过setter填充所有必需的属性
- 使用流畅的API构建Java资源表示

使用哪种方法主要是个人偏好。在这里，我们将使用流畅的方法来创建_V1Job_对象，因为构建过程看起来非常类似于它的YAML对应物：

```java
ApiClient client  = Config.defaultClient();
BatchV1Api api = new BatchV1Api(client);
V1Job body = new V1JobBuilder()
  .withNewMetadata()
    .withNamespace("report-jobs")
    .withName("payroll-report-job")
  .endMetadata()
  .withNewSpec()
    .withNewTemplate()
      .withNewMetadata()
        .addToLabels("name", "payroll-report")
      .endMetadata()
      .editOrNewSpec()
        .addNewContainer()
          .withName("main")
          .withImage("report-runner")
          .addNewCommand("payroll")
          .addNewArg("--date")
          .addNewArg("2021-05-01")
        .endContainer()
        .withRestartPolicy("Never")
      .endSpec()
    .endTemplate()
  .endSpec()
.build();
V1Job createdJob = api.createNamespacedJob("report-jobs", body, null, null, null);
```

我们首先创建_ApiClient_，然后创建API存根实例。_作业_资源是_Batch API_的一部分，所以我们创建一个_BatchV1Api_实例，我们将使用它来调用集群的API服务器。

接下来，我们实例化一个_V1JobBuilder_实例，它引导我们完成填充所有属性的过程。注意使用嵌套构建器：要“关闭”一个嵌套构建器，我们必须调用它的_endXXX()_方法，这使我们回到它的父构建器。

另外，我们还可以使用_withXXX_方法直接注入一个嵌套对象。当我们想要重用一组常见的属性，如元数据、标签和注解时，这很有用。

最后一步只是一个对API存根的调用。这将序列化我们的资源对象，并将请求POST到服务器。如预期的那样，API有同步（如上所述）和异步版本。

返回的对象将包含与创建的作业相关的元数据和状态字段。在_作业_的情况下，我们可以使用其状态字段来检查它何时完成。我们还可以使用我们在关于监控资源的文章中介绍的一种技术来接收此通知。

### 3. 更新现有资源

更新现有资源包括向Kubernetes API服务器发送一个PATCH请求，其中包含我们想要修改的字段。截至Kubernetes版本1.16，有四种方法可以指定这些字段：

- JSON Patch（RFC 6092）
- JSON Merge Patch（RFC 7396）
- Strategic Merge Patch
- 应用YAML

其中最后一个是最容易使用的，因为它将所有合并和冲突解决留给了服务器：我们所要做的就是发送一个带有我们想要修改的字段的YAML文档。

不幸的是，Java API没有提供一种简单的方法来构建这个部分YAML文档。相反，我们必须使用_PatchUtil_辅助类来发送原始的YAML或JSON字符串。然而，我们可以使用_ApiClient_对象提供的内置JSON序列化器来实现：

```java
V1Job patchedJob = new V1JobBuilder(createdJob)
  .withNewMetadata()
    .withName(createdJob.getMetadata().getName())
    .withNamespace(createdJob.getMetadata().getNamespace())
  .endMetadata()
  .editSpec()
    .withParallelism(2)
  .endSpec()
  .build();

String patchedJobJSON = client.getJSON().serialize(patchedJob);

PatchUtils.patch(
  V1Job.class,
  () -> api.patchNamespacedJobCall(
    createdJob.getMetadata().getName(),
    createdJob.getMetadata().getNamespace(),
    new V1Patch(patchedJobJSON),
    null,
    null,
    "baeldung",
    true,
    null),
  V1Patch.PATCH_FORMAT_APPLY_YAML,
  api.getApiClient());
```

在这里，我们使用从_createNamespacedJob()_返回的对象作为模板，我们将构建修补过的版本。在这种情况下，我们只是将_parallelism_值从1增加到2，其他所有字段保持不变。一个重要的点是，当我们构建修改后的资源时，我们必须使用_withNewMetadata()_。这确保我们不会构建一个包含在创建资源后返回的对象中存在的托管字段的对象。有关托管字段及其在Kubernetes中的使用方式的完整描述，请参考文档。

一旦我们构建了一个带有修改字段的对象，然后我们使用_serialize_方法将其转换为其JSON表示。然后我们使用这个序列化版本来构建用作PATCH调用有效载荷的_V1Patch_对象。_patch_方法还接受一个额外的参数，我们在这里告知请求中存在的数据类型。在我们的例子中，这是_PATCH_FORMAT_APPLY_YAML_，库使用它作为HTTP请求中包含的_Content-Type_头。

传递给_fieldManager_参数的“baeldung”值定义了操作资源字段的行为者的名称。Kubernetes在内部使用这个值来解决两个或更多客户端尝试修改同一资源时可能出现的冲突。我们还传递_true_到_force_参数，这意味着我们将拥有任何修改字段的所有权。

### 4. 删除资源

与之前的操作相比，删除资源相当直接：

```java
V1Status response = api.deleteNamespacedJob(
  createdJob.getMetadata().getName(),
  createdJob.getMetadata().getNamespace(),
  null,
  null,
  null,
  null,
  null,
  null );
```

在这里，我们只是使用_deleteNamespacedJob_方法使用这种特定资源的默认选项来删除作业。如果需要，我们可以使用最后一个参数来控制删除过程的细节。这采用了_V1DeleteOptions_对象的形式，我们可以使用它来指定任何依赖资源的宽限期和级联行为。

### 5. 结论

在本文中，我们介绍了如何使用Java Kubernetes API库来操作Kubernetes资源。像往常一样，示例的完整源代码可以在GitHub上找到。