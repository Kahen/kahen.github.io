---
date: 2024-07-07
category:
  - Java
  - Swagger
tag:
  - OpenAPI
  - API文档
head:
  - - meta
    - name: keywords
      content: Swagger, OpenAPI, Java, API文档, 解析
---
# Swagger解析器指南

Swagger是一套用于设计、描述和记录RESTful API的工具集。

在本教程中，**我们将探讨如何在Java中解析OpenAPI文档文件并提取其各种组件。**

## 2. Swagger是什么？

Swagger本质上是一套开源的规则、规范和工具集，用于开发和描述REST API。然而，随着新标准和规范的演变，这些规范现在被重命名为OpenAPI规范（OAS）。

**OpenAPI规范标准化了如何创建API设计文档。** 它创建了一个我们可以轻松开发和使用API的RESTful接口。API规范有效地映射了与之相关的所有资源和操作。

OpenAPI文档是一个自包含的或复合资源，定义了一个API及其各种元素。该文档可以以JSON或YAML格式表示。

OpenAPI规范的最新版本是OAS 3.1。它允许我们指定HTTP资源、动词、响应代码、数据模型、媒体类型、安全方案和其他API组件。我们可以使用OpenAPI定义来生成文档、代码生成以及许多其他用例。

另一方面，**Swagger已经发展成为开发API的最广泛使用的开源工具集之一。它基本上提供了一套完整的工具集来设计、构建和记录API。**

要验证OpenAPI文档，我们使用Swagger验证器工具。此外，Swagger编辑器提供了一个基于GUI的编辑器，帮助我们在运行时编辑和可视化API文档。

我们可以轻松地使用生成的OpenAPI文档与第三方工具一起使用，例如导入到Postman。

## 3. 使用Swagger解析器

**Swagger解析器是Swagger工具之一，它帮助我们解析OpenAPI文档并提取其各种组件。** 下面，让我们看看如何在Java中实现解析器：

### 3.1. 依赖项

在我们开始之前，让我们将Swagger解析器的Maven依赖项添加到我们项目的_pom.xml_文件中：

```
`<dependency>`
    `<groupId>`io.swagger.parser.v3`</groupId>`
    `<artifactId>`swagger-parser`</artifactId>`
    `<version>`2.1.13`</version>`
`</dependency>`
```

接下来，让我们深入了解如何解析OpenAPI文档。

### 3.2. 示例OpenAPI文档

在我们开始之前，我们需要一些我们可以解析的示例OpenAPI文档。让我们使用以下名为_sample.yml_的示例OpenAPI YAML文档：

```
openapi: 3.0.0
info:
  title: 用户API
  version: '1.0'
servers:
  - url: https://jsonplaceholder.typicode.com
    description: Json占位符服务
paths:
  /users/{id}:
    parameters:
      - schema:
          type: integer
        name: id
        in: path
        required: true
    get:
      summary: 按ID获取用户
      tags:
        - 用户
      responses:
        '200':
          description: OK
          content:
            application/json:
              schema:
                type: object
                properties:
                  id:
                    type: integer
                  name:
                    type: string
      operationId: get-users-user_id
      description: 按ID检索特定用户
```

上述YAML是一个非常简单的OpenAPI规范，定义了一个通过ID获取用户详细信息的API。

同样，我们也有等效的名为_sample.json_的JSON文档文件：

```
{
  "openapi": "3.0.0",
  "info": {
    "title": "用户API",
    "version": "1.0"
  },
  "servers": [
    {
      "url": "https://jsonplaceholder.typicode.com",
      "description": "Json占位符服务"
    }
  ],
  "paths": {
    "/users/{id}": {
      "parameters": [
        {
          "schema": {
            "type": "integer"
          },
          "name": "id",
          "in": "path",
          "required": true
        }
      ],
      "get": {
        "summary": "按ID获取用户",
        "tags": [
          "用户"
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "integer"
                    },
                    "name": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          }
        },
        "operationId": "get-users-user_id",
        "description": "按ID检索特定用户"
      }
    }
  }
}
```

我们将使用这些OpenAPI文档文件进行所有编码示例。

现在让我们来看看如何解析这个文档。

### 3.3. 解析OpenAPI YAML文档

首先，**我们使用_OpenAPIParser().readLocation()_方法来读取和解析YAML或JSON文件。** 这个方法接受三个参数：

- _String_ – 我们想要读取的文件的URL
- _List``<AuthorizationValue>``_ – 如果要读取的OpenAPI文档受保护，则需要传递授权头的_List_
- _ParserOptions_ – 作为自定义解析行为的附加解析选项

首先，让我们检查从URL读取OpenAPI文档的代码片段：

```
SwaggerParseResult result = new OpenAPIParser().readLocation("sample.yml", null, null);
```

_readLocation()_方法返回一个_SwaggerParserResult_实例，其中包含解析后的结果。

其次，我们将使用返回的_SwaggerParserResult_实例来获取解析的详细信息：

```
OpenAPI openAPI = result.getOpenAPI();
```

_SwaggerParserResult.getOpenAPI()_方法返回一个_OpenAPI_类的实例。返回的_OpenAPI_类实例基本上是OpenAPI文档的POJO版本。

最后，我们现在可以使用从获得的_OpenAPI_实例的各种getter方法来获取OpenAPI文档的各个组件：

```
SpecVersion version = openAPI.getSpecVersion();

Info info = openAPI.getInfo();

List`<Server>` servers = openAPI.getServers();

Paths paths = openAPI.getPaths();
```

### 3.4. 解析OpenAPI JSON文档

以类似的方式，我们也可以解析等效的JSON文档文件。让我们通过传递其文件名作为URL来解析_sample.json_文件：

```
SwaggerParseResult result = new OpenAPIParser().readLocation("sample.json", null, null);
```

此外，**我们甚至可以使用_OpenAPIParser().readContents(String swaggerString, List``<AuthorizationValue>`` auth, ParseOptions options)_方法从_String_解析OpenAPI规范文档。**

同样，我们可以通过调用_SwaggerParserResult.getMessages()_方法来获取解析期间的任何验证错误和警告。这个方法返回一个包含错误消息的字符串列表：

```
List`<String>` messages = result.getMessages();
```

## 4. 结论

在本文中，我们查看了OpenAPI规范和Swagger的基础知识。

我们看到了如何在Java中解析OpenAPI文档文件。我们实现了代码来解析YAML和JSON规范文件。

像往常一样，所有示例的完整代码都可以在GitHub上找到。