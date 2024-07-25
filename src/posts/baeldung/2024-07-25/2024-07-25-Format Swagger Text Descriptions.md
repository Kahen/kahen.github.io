---
date: 2021-10-01
category:
  - OpenAPI
  - Swagger
tag:
  - 文档格式化
  - YAML
  - JSON
head:
  - - meta
    - name: keywords
      content: OpenAPI, Swagger, 文档格式化, YAML, JSON
---
# OpenAPI文档中的文本描述格式化 | Baeldung

## 1. 引言

OpenAPI规范（前Swagger规范）标准化了REST API文档语言，并且是平台无关的。我们可以以YAML或JSON格式创建**OpenAPI文档**。

另一方面，Swagger是一系列用于实现和使用该标准的**工具集合**。有些是免费的，有些是开源的，有些是商业的。这些工具帮助我们设计、文档化和使用REST API。

在本文中，我们将学习如何格式化OpenAPI文档中的文本描述。

## 2. OpenAPI编辑器

有几种工具支持我们创建OpenAPI文档。一些流行的工具包括：

- Swagger编辑器
- Visual Studio Code OpenAPI插件
- IntelliJ IDEA OpenApi插件

还有许多其他编辑器提供创建OpenAPI文档的支持。**然而，最受欢迎且广泛使用的编辑器是Swagger编辑器**。因此，我们将学习如何使用Swagger编辑器来格式化我们的OpenAPI文档。

## 3. YAML与JSON格式化

**OpenAPI文档以JSON或YAML格式表示**。然而，在使用YAML时格式化文档是直接的。

例如，要在YAML中标记一个单词或句子作为标题，我们使用以下片段：

```yaml
description: |
    # 这是*斜体*标题
    这是下一行

    这是**粗体**
```

YAML表示使用|（管道）来表示标量文字，可以是多行。

现在，让我们在JSON中定义同样的事情：

```json
{
    "description": "# 这是*斜体*标题\\n这是下一行\\n\\n这是**粗体**"
}
```

相比之下，在JSON表示中，转义序列使格式化变得反直觉。因此，我们将只关注YAML编写的OpenAPI规范文档的格式化技术。

最后，OpenAPI规范允许在所有级别上格式化_description_字段。因此，根据规范，只要允许_description_字段，我们就可以格式化它，并且_description_字段符合CommonMark格式化风格。

现在，让我们通过格式化来增强我们的API文档。

## 4. 标题

就像我们在HTML中使用_`<h1>`_到_`<h6>`_标题一样，我们可以使用Markdown标题来突出文本。**一个_#_代表一个标题**。我们可以使用_#_多达六个级别来强调文本。_#_的数量越多，文本强调的程度就越小。

例如，考虑YAML：

```yaml
openapi: 3.0.1
info:
  title: Petstore
  description: |
    # 宠物店API
    ## 这是一个示例宠物店服务器
    ### 包含管理宠物店的API
    #### 注意，API支持基本认证和OAUTH
    ##### 样本包含请求和响应模型
      ###### 还定义了状态码
```

Swagger渲染文本为：

![img](https://www.baeldung.com/wp-content/uploads/2021/10/headings-7-1024x264-1.jpg)

## 5. 文本强调

为了提高_description_文本的可读性，我们可以通过使其加粗或斜体来强调它。

**将文本放在_**_和_**_之间或在__和__之间可以使文本加粗**。同样，将文本放在*和*或_和_之间将使文本斜体。例如，对于YAML：

```yaml
openapi: 3.0.1
info:
  title: Petstore
  description: |
    ## 此文档包含

    **宠物店API** *注意：所有API返回application/json*。
    __用户API__  _注意：这些API包含附件，并且只支持image/jpeg作为内容类型_
```

Swagger渲染YAML为：

![img](https://www.baeldung.com/wp-content/uploads/2021/10/emphasis-5-1024x195-1.jpg)

## 6. 表格

接下来，让我们看看如何在我们的OpenAPI文档中添加表格。

要渲染表格，需要遵循一组规则。**首先，表格中的每一都应该以_|（管道）_符号开始和结束。其次，至少使用一个_–（连字符）_符号分隔每个表头**。然而，_–（连字符）_的最大数量没有限制。

例如，让我们添加一个表格来定义我们的POST API的HTTP状态码：

```yaml
paths:
  /pet:
    post:
      tags:
      - pet
      description: |
        **下面的表格定义了此API可能返回的HTTP状态码**

        | 状态码          | 描述       | 原因                             |
        | ---------------- | ------------| -----------------------------------|
        | 201              | CREATED     | 如果宠物创建成功。               |
        | 400              | BAD REQUEST | 如果请求无效。                   |
        | 401              | UNAUTHORIZED| 如果凭据无效。                  |
```

Swagger生成：

![img](https://www.baeldung.com/wp-content/uploads/2021/10/tables-2-1024x248-1.jpg)

## 7. 列表

现在，让我们看看如何格式化描述文本以包含列表。

### 7.1. 有序列表

**描述文本项目应该以数字后跟_.（点）_开始**。然而，项目的编号顺序并不重要。也就是说，片段：

```yaml
description: |
  1. 可用
  3. 待处理
  1. 已售出
```

```yaml
description: |
  1. 可用
  200. 待处理
  30. 已售出
```

```yaml
description: |
  1. 可用
  100. 待处理
  50. 已售出
```

生成相同的输出：

```yaml
1. 可用
2. 待处理
3. 已售出
```

**项目的编号取决于起始项**。例如，如果我们以_10_开始项目编号，随后的项目将被编号为_11_、_12_、_13_等。下面的YAML：

```yaml
description: |
  10. 可用
  120. 待处理
  50. 已售出
```

生成：

```yaml
10. 可用
11. 待处理
12. 已售出
```

同样，有序子列表的规则也适用。将子列表缩进到其父项。例如，考虑YAML：

```yaml
description: |
  1. 可用
  2. 待处理
     1. 店内待处理
     200. 购物车待处理
  3. 已售出
```

生成：

```yaml
1. 可用
2. 待处理
    1. 店内待处理
    2. 购物车待处理
3. 已售出
```

### 7.2. 无序列表

**使用_*（星号）_或_+（加号）_或_–（连字符）_来创建无序列表**。也就是说，列表中的每个项目应该以这些符号之一开始。例如：

```yaml
description: |
  * 可用
  * 待处理
  * 已售出

description: |
  + 可用
  + 待处理
  + 已售出

description: |
  - 可用
  - 待处理
  - 已售出
```

所有上述片段生成一个无序列表。

同样，**要生成无序列表子列表，将项目缩进到其父项，并以_*（星号）_或_+（加号）_或_–（连字符）_开始**。例如，YAML：

```yaml
- 可用
- 待处理
   * 店内待处理
   + 购物车待处理
- 已售出
```

生成一个带有子列表的无序列表。注意分隔符的混合和匹配。**可以混合分隔符，这会产生相同的结果**。

最后，让我们将所有这些放入一个YAML中：

```yaml
/pet/findByStatus:
  get:
    summary: 按状态查找宠物
    description: |
      __以下是宠物的有效状态列表__

      1. 可用
      2. 待处理
         1. 购物车中待处理
         2. 店内待处理
      3. 已售出

      **以下是此API可能返回的HTTP状态码**

      * 200 - OK
      * 400 - Bad Request. API返回以下与内容类型和接受头相关的状态码
        + 415 - Unsupported Media Type
        - 406 - Not Acceptable
      * 401 - Unauthorized
      * 405 - Method not supported
```

这个YAML生成：

![img](https://www.baeldung.com/wp-content/uploads/2021/10/lists-1-1024x366-1.jpg)

## 8. 杂项

### 8.1