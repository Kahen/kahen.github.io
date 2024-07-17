---
date: 2022-06-18
category:
  - Postman
  - API
tag:
  - form-data
  - x-www-form-urlencoded
  - raw
head:
  - - meta
    - name: keywords
      content: Postman, form-data, x-www-form-urlencoded, raw
------
# Postman中form-data、x-www-form-urlencoded和raw的区别

## 1. 概述

**Postman 提供了多种方式与 API 或服务器请求交互，使用不同类型的正文参数。** 这些代表了通过 HTTP 请求向 API 发送数据的不同方式。

在本教程中，我们将探讨在请求正文中使用 _form-data_、_x-www-form-urlencoded_ 和 _raw_ 之间的差异。

**_form-data_ 表示从网站表单发送到 API 的数据，作为 _multipart/form-data_ 的一部分。** Postman 中的 _form-data_ 选项模拟了在网站上填写表单并提交的过程。我们可以编辑表单数据，并允许它通过转换数据中的关键值编辑器来设置不同的键/值对。

这也可以用来将文件附加到键上。然而，我们应该注意，使用 HTML5 意味着文件不在任何历史记录或集合中。因此，我们必须在发送请求正文时再次选择文件。另外，Postman 不支持上传多个文件及其内容类型。

注意，Postman 会保留文件路径以供后续使用，即当我们反复进行 API 调用将同一文件发送到服务器时。这有助于在运行包含多个请求上传文件的集合时。

让我们看看在 Postman 中使用 _form-data_ 是什么样的：

## 3. _x-www-form-urlencoded_

**URL 编码数据将编码后的数据发送到服务器，并使用与 URL 参数相同的编码。** 要使用它，我们需要在请求正文中选择 _x-www-form-urlencoded_ 标签。我们需要输入发送请求正文到服务器的键值对，Postman 会在发送之前对所需的数据进行编码。Postman 对键和值都进行编码。

注意，它不能用于编码文件，因此我们需要手动进行编码。然而，它只能编码请求正文数据或 URL 参数。

**这也是所谓的默认内容类型。** 所有使用此内容类型提交的表单都遵循以下编码模式：
- 控件名称和值被转义。所有空格字符将被替换为‘+’符号，保留字符遵循 RFC 1738 符号。
- 等号，‘=’，用于分隔键和值，键/值对使用‘&’彼此分隔。

让我们看看 Postman 中的 _x-www-form-urlencoded_ 标签：

## 4. _raw_

顾名思义，_raw_ 数据可以包含任何内容。**Postman 不会触碰 _raw_ 字符串或对其进行任何类型的修改。** 添加到 _raw_ 编辑器的字符串未经修改，除了替换定义的环境变量。**这个编辑器让我们可以设置 Postman 支持的不同格式样式，以及发送 _raw_ 正文所需的正确标题。** 支持以下类型：
- 文本
- Javascript
- JSON
- HTML
- XML

我们也可以手动将这些内容类型设置到我们的请求正文中：

## 5. _form-data_、_x-www-form-urlencoded_ 和 _raw_ 之间的差异

我们可以使用 W3C 委员会定义的不同数据内容类型。他们定义了通过网络层发送数据的多种格式。这些包括 _form-data_、x-www-form- _urlencoded_ 和 _raw_ 数据。**默认情况下，我们可以使用 _x-www-form-urlencoded_ 格式以简单的文本/ASCII格式发送数据。**

然而，使用 _x-www-form-urlencoded_ 数据类型有数据限制。因此，**我们可以使用 _form-data_ 发送大的二进制或非 ASCII 文本到服务器。**

_raw_ 数据类型将任何纯文本或 JSON 发送到服务器，正如其名称所示。它支持多种内容类型，Postman 将发送原始数据而不进行任何修改，与其他数据类型不同。

我们可以使用 _raw_ 数据类型在请求正文中发送任何类型的数据。这也包括发送可以在服务器端执行的 Javascript 函数。我们可以在 Javascript 选项下发送脚本。_raw_ 数据类型还支持标记语言，如 HTML 和 XML。这在前端没有逻辑且需要消费整个 HTML/XML 页面时很有帮助。

## 6. 结论

在本文中，我们检查了 Postman 支持的一些请求正文数据类型。

我们还概述了 Postman 中 _form-data_、_x-www-form-urlencoded_ 和 _raw_ 之间的差异。然而，我们只获得了对这些请求正文类型的基本理解。如果你想更深入地了解这些请求正文类型，可以探索 Postman 的在线文档。