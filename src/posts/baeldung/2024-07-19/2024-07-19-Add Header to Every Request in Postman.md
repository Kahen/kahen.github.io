---
date: 2022-05-01
category:
  - Postman
  - HTTP
tag:
  - Postman
  - HTTP headers
  - pre-request scripts
head:
  - - meta
    - name: keywords
      content: Postman, HTTP headers, pre-request scripts, JavaScript
---
# 在Postman中为每个请求添加头部

在本教程中，我们将学习如何使用预请求脚本在Postman中为每个请求添加HTTP头部。

在深入实现之前，让我们回顾一下HTTP头部是什么。

在HTTP请求中，头部是提供客户端和服务器HTTP通信之间附加信息的字段。HTTP头部具有键值对格式，并且可以附加到请求和响应上。

授权、内容类型和cookie是通过HTTP头部提供的元数据的示例。

例如：

```
Authorization: Bearer YmFyIiwiaWF0IjoxN;
Content-Type: application/json;
Cookie: foo=bar;
```

**我们将使用Postman的预请求脚本功能通过执行JavaScript代码来设置头部。**

### 3. 运行服务器

在本教程中，我们将使用之前的Baeldung项目 _spring-boot-json_ 进行演示。该应用程序包含一个单一的控制器 _StudentController_，它接受对 _Student_ Java模型的CRUD操作。

我们必须使用Maven _install_ 命令安装所有依赖项，然后运行 _SpringBootStudentsApplication_ 文件，这将在端口8080上启动Tomcat服务器。

使用Postman，我们可以通过发送GET请求到以下端点并期望JSON响应来确认服务器正在运行：

```
http://localhost:8080/students/
```

例如： ![img]

现在我们已经验证了服务器正在运行，**我们可以在Postman发送的请求中通过程序添加HTTP头部。**

要在Postman中使用预请求脚本为HTTP请求添加头部，我们需要访问Postman JavaScript API对象提供的请求数据，该对象名为 _pm_。

**我们可以通过调用 _pm_ _.request_ 对象来对请求元数据执行操作；因此，我们可以在发送请求之前添加、修改和删除HTTP头部。**

如前所述，HTTP头部具有键值对格式。Postman JavaScript API在添加请求头部时期望提供键和值。

我们可以使用 _name: value_ 格式作为字符串来添加头部：

```
pm.request.headers.add("foo: bar");
```

我们也可以按如下方式传递具有 _key_ 和 _value_ 属性的JavaScript对象：

```
pm.request.headers.add({
  key: "foo",
  value: "bar"
});
```

**然而，根据Postman文档，我们可以向头部对象添加额外的属性，如 _id_、_name_ 和 _disabled_，这将在Postman JavaScript运行时环境中扩展功能。**

现在，让我们看看实际操作。首先，我们将向个别Postman请求添加脚本；然后，我们将为整个集合添加头部。

### 4.1. 个别请求

我们可以通过使用预请求脚本在Postman中为个别请求添加头部。我们可以参照上一节所示的实现；然而，我们将专注于第二个实现，其中我们传递一个JavaScript对象，以便我们可以添加扩展功能的额外属性。

在Postman窗口的预请求脚本中，我们添加以下脚本，指示客户端期望JSON类型的响应：

```
pm.request.headers.add({
    key: "Accept",
    value: "application/json"
});
```

在Postman中，请求如下所示：

 ![img]

现在，我们通过点击 _Send_ 按钮发送GET请求。一旦请求发送，我们必须打开Postman控制台（通常通过点击左下角的 _console_ 按钮）并展开我们最近的请求，以查看 _Request Headers_ 部分：

 ![img]

在控制台中，我们可以看到 _Accept: “application/json”_ 头部，表明它已成功地通过脚本附加到GET请求上。此外，我们可以检查响应的正文和状态码，以确认请求是否成功。

为了进一步验证预请求脚本，我们可以添加以下头部，并期望一个空响应以及状态码 _406 Not Acceptable_：

```
pm.request.headers.add({
    key: "Accept",
    value: "image/*"
});
```

### 4.2. 集合

**同样，我们可以使用预请求脚本为整个集合添加HTTP头部。**

首先，我们将创建一个Student API Collection来测试我们的API端点，并确认每个请求都包含我们用预请求脚本添加的头部。

在Postman中，我们可以通过在左侧的 _Collections_ 菜单选项中点击加号按钮来分组Web API端点，并创建一个名为 _Student API Collection_ 的新集合：

 ![img]

请注意，我们还向我们的集合中添加了两个端点：_http://localhost:8080/students/_ 和 _http://localhost:8080/students/2_。

与个别请求类似，我们可以通过选择左侧菜单中的 _Student API Collection_ 并转到 _Pre-request Script_ 标签来向我们的集合添加预请求脚本。现在，我们可以添加我们的脚本：

```
pm.request.headers.add({
    key: "Accept",
    value: "application/json"
});
```

在Postman中，_Student API Collection_ 应该如下所示：

 ![img]

在运行集合之前，我们必须确保我们移除了之前在本节中添加的预请求脚本。否则，HTTP头部将被请求脚本中指定的那些覆盖，集合级别上的那些将被丢弃。

现在，我们准备运行我们的集合。点击集合栏上的 _Run_ 按钮，_Runner_ 标签将自动打开：

 ![img]

_Runner_ 标签允许我们对集合中的请求进行排序，选择或取消选择集合中的请求，并指定其他设置。点击 _Run Student API Collection_ 来执行我们的请求。

一旦整个集合完成，我们可以看到执行顺序和测试结果，如果有的话。然而，我们要确保我们的HTTP头部是我们请求的一部分，我们可以通过打开Postman控制台来确认：

再次，我们可以在控制台中展开我们请求的 _Request Headers_ 部分，并确认我们的预请求脚本添加了 _Accept_ 头部。此外，通过查看状态码和响应正文，您可以确认请求是否成功。

## 5. 结论

在本文中，我们使用Postman的预请求脚本功能为每个请求添加了HTTP头部。首先，我们回顾了HTTP头部是什么；然后，我们向个别请求和集合都添加了预请求脚本以添加头部。请参阅Postman文档以进一步探索预请求脚本和其他功能。

本教程中创建的集合可在GitHub上获得。