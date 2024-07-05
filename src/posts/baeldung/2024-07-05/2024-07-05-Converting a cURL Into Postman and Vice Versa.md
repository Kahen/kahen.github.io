---
date: 2023-05-01
category:
  - Tutorial
  - API Testing
tag:
  - cURL
  - Postman
head:
  - - meta
    - name: keywords
      content: API Testing, cURL, Postman, Tutorial
---

# cURL 与 Postman 转换指南

1. 概述
cURL 是一个用于使用各种协议传输数据的命令行工具。然而，它使用起来可能比较繁琐，尤其是对于复杂的 API 请求。Postman 是一个更加用户友好的工具，允许我们测试和与基于 HTTP 的 API 进行交互。

在这个简短的教程中，我们将看到如何将 cURL 请求转换为 Postman 请求，反之亦然。

2. 将 cURL 请求转换为 Postman
首先，我们来学习如何将 cURL 请求转换为 Postman。

首先，打开 Postman 并点击屏幕左上角的“导入”按钮：

然后，在导入对话框中，选择“原始文本”选项，并将 cURL 命令粘贴到文本框中：

点击“继续”按钮，然后点击最后的“导入”按钮以在 Postman 中生成请求。

然后，Postman 将根据 cURL 命令生成带有头和正文的请求：

3. 将 Postman 请求转换为 cURL
将 Postman 请求转换为 cURL 同样容易。以下是操作方法：

点击请求右侧的“`</>`”按钮（“代码”按钮）：

然后点击“cURL”选项，从我们的请求生成 cURL 命令：

4. 结论
在这个快速教程中，我们展示了如何将 cURL 请求转换为 Postman 请求，反之亦然。

OK