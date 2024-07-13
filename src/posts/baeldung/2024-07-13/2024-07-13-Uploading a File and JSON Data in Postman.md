---
date: 2022-10-28
category:
  - Postman
  - Spring Boot
tag:
  - API测试
  - 文件上传
  - JSON数据
head:
  - - meta
    - name: keywords
      content: Postman, Spring Boot, 文件上传, JSON数据, API测试
---
# 使用Postman上传文件和JSON数据

Postman是一个流行的API平台，它优化了API开发生命周期的各个步骤。Postman可以用来在不写任何代码的情况下测试我们的API。我们可以使用独立的应用程序或浏览器扩展。

在本教程中，我们将看到在使用Postman时如何上传文件和JSON数据。

### 2.1. 依赖项
我们定义了一个基本的spring应用程序，在_pom.xml_中使用了_spring-boot-starter-web_依赖项：

```xml
`<dependency>`
    `<groupId>`org.springframework.boot`</groupId>`
    `<artifactId>`spring-boot-starter-web`</artifactId>`
`</dependency>`
```

### 2.2. 模型
接下来，我们为JSON输入定义一个简单的模型类：

```java
public class JsonRequest {
    int id;
    String name;
}
```

为了简洁，我们省略了构造函数、getter/setter等的声明。

### 2.3. 端点
最后，让我们根据用例设置一个端点来处理作为文件的请求：

```java
@PostMapping("/uploadFile")
public ResponseEntity```<String>``` handleFileUpload(@RequestParam("file") MultipartFile file){
    return ResponseEntity.ok().body("file received successfully");
}
```

在_handleFileUpload()_方法中，我们期望输入一个_MultipartFile_，然后返回一个带有静态文本的_200_状态消息。我们保持简单，没有探索保存或处理输入文件。

**_MultipartFile_由Spring-Web提供，它表示一个上传的文件**。然后这个文件存储在内存中或临时磁盘上，一旦请求处理完成就会被清除。

让我们也创建一个处理JSON数据的端点：

```java
@PostMapping("/uploadJson")
public ResponseEntity```<String>``` handleJsonInput(@RequestBody JsonRequest json){
    return ResponseEntity.ok().body(json.getId()+json.getName());
}
```

在这里，_handleJsonInput()_，我们期望一个类型为_JsonRequest_的对象，这是我们定义的模型类。该方法返回一个_200_ HTTP状态码，并将输入详情_id_和_name_在响应中返回。

我们使用了_@RequestBody_注解，它将输入反序列化为_JsonRequest_对象。这样，我们已经看到了JSON的简单处理，以验证输入。

我们已经设置了应用程序，现在让我们检查两种向应用程序提供输入的方式。

### 3.1. 在Postman中上传JSON
JSON是端点的文本输入类型之一。我们将按照以下步骤将相同的内容传递给公开的端点。

默认方法是_SET_。所以一旦我们添加了_localhost_ URL，我们需要选择_POST_作为方法：

![img](https://www.baeldung.com/wp-content/uploads/2022/10/JsonStep1.jpg)

让我们点击_Body_选项卡，然后选择_raw_。在显示_Text_的下拉菜单中，让我们选择_JSON_作为输入：

![img](https://www.baeldung.com/wp-content/uploads/2022/10/JsonStep2.jpg)

我们需要粘贴输入的JSON，然后点击_Send_：

![img](https://www.baeldung.com/wp-content/uploads/2022/10/JsonStep3.jpg)

我们在快照的底部可以看到一个_200_状态码作为响应。此外，**输入中的_id_和_name_在响应体中返回，确认JSON在端点正确处理**。

### 3.2. 在Postman中上传文件
让我们以文档文件为例，因为我们没有定义端点可以消费的文件类型。

让我们添加_localhost_ URL并选择_POST_作为方法，因为默认方法是_GET_：

![img](https://www.baeldung.com/wp-content/uploads/2022/10/FileUploadStep1.jpg)

让我们点击_Body_选项卡，然后选择_form-data_。在第一行的键值对上，让我们点击键字段右上角的下拉菜单，并选择_File_作为输入：

![img](https://www.baeldung.com/wp-content/uploads/2022/10/FileUploadStep2.jpg)

我们需要在键列中添加文本_file_，这是我们端点的_@RequestParam_，并在值列中浏览所需的文件。

最后，让我们点击_Send_：

![img](https://www.baeldung.com/wp-content/uploads/2022/10/FileUploadStep3.jpg)

当我们点击_Send_时，我们得到一个**_200_ HTTP状态码和我们端点定义中定义的静态文本**。这意味着我们的**文件已成功传递到端点，没有错误或异常**。

## 4. 在同一个请求中发送多部分数据和JSON
现在，让我们看看如何在Postman中使用同一个请求发送多部分数据和JSON。

首先，我们需要配置我们的Postman请求，并在预请求脚本中设置我们想要发送的JSON数据：

然后，我们将转到请求编辑器的“Body”选项卡，并选择“form-data”作为正文类型。然后，我们必须为嵌套的JSON对象和多部分文件添加字段：

- 对于嵌套的JSON，我们将从我们在预请求脚本中定义的“jsonData”变量中获取其值。另外，我们需要将其内容类型设置为_application/json_。
- 对于文件字段，我们需要点击“Choose Files”按钮，将打开一个文件对话框，允许我们选择要上传的文件。一旦我们选择了文件，Postman将把它作为_multipart/form-data_请求的一部分包含进来。

最后，让我们创建一个适当的控制器来处理_multipart/form-data_请求，并相应地处理文件和嵌套的JSON对象。

```java
@PostMapping("/uploadJsonAndMultipartData")
public ResponseEntity```<String>``` handleJsonAndMultipartInput(@RequestPart("data") JsonRequest json, @RequestPart("file") MultipartFile file) {
    return ResponseEntity.ok()
      .body(json.getId() + json.getName());
}
```

在这个端点中，_handleJsonAndMultipartInput()_方法接受嵌套的JSON对象作为一个_JsonRequest_对象使用_@RequestPart("data")_，文件作为使用_@RequestPart("file")_的_MultipartFile_对象接收。

## 5. 结论
在本文中，我们构建了一个简单的Spring Boot应用程序，并通过Postman查看了两种向公开端点提供数据的不同方式。

如往常一样，代码示例可在GitHub上获取。