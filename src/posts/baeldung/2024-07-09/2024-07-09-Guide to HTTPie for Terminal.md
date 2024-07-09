---
date: 2024-07-10
category:
  - HTTPie
  - 命令行工具
tag:
  - HTTP客户端
  - API测试
head:
  - - meta
    - name: keywords
      content: HTTPie, 命令行, HTTP客户端, API测试, 调试
---

# HTTPie 命令行工具指南

1. 概述

在本教程中，我们将学习如何使用 HTTPie 命令行界面工具。

2. HTTPie 是什么？

**HTTPie 是一个用于与 HTTP 服务器和 API 交互的命令行 HTTP 客户端**。此外，HTTPie 也可以用于测试和调试。
它还具有格式化和着色输出、直观的语法和内置的 JSON 支持。

3. 安装

首先，我们需要安装它：

3.1. 在 Linux 上

我们可以使用 Snapcraft 在 Linux 上安装 HTTPie：

```
$ sudo snap install httpie
```

3.2. 在 Windows 上

在 Windows 上安装，我们可以使用 Chocolatey：

```
$ choco install httpie
```

3.3. 在 macOS 上

最后，在 macOS 上安装，我们可以使用 Homebrew：

```
$ brew update
$ brew install httpie
```

4. 使用方法

我们应该按照以下通用模式调用 HTTPie：

```
http [flags] [METHOD] URL [ITEM [ITEM]]
```

或：

```
https [flags] [METHOD] URL [ITEM [ITEM]]
```

5. 示例

让我们看一些例子：

5.1. Hello World

一个简单的 hello world GET 请求：

```
$ https httpie.io/hello
HTTP/1.1 200 OK
Age: 0
Cache-Control: public, max-age=0, must-revalidate
Connection: keep-alive
...
{
    "ahoy": [
        "Hello, World! 👋 感谢您尝试 HTTPie 🥳",
        "我们希望这将成为友谊。"
    ...
}
```

我们得到响应头和正文作为输出。

5.2. 添加自定义 HTTP 方法、HTTP 头和正文

我们也可以指定方法并添加自定义项目到请求：

```
$ http PUT httpbin.org/put X-API-Token:123 name=John
HTTP/1.1 200 OK
Access-Control-Allow-Credentials: true
... 
Server: gunicorn/19.9.0

{
    "args": {},
    ... 
    "headers": {
        ... 
        "X-Api-Token": "123"
    },
    "json": {
        "name": "John"
    },
    ...
}
```

需要澄清的是，_PUT_ 是方法，_X-API-Token:123_ 是自定义 HTTP 头，_name=john_ 是自定义数据项。

5.3. 提交表单

我们也可以提交表单数据，如果我们添加 _-f_ 标志：

```
$ http -f POST httpbin.org/post hello=world
HTTP/1.1 200 OK
Access-Control-Allow-Credentials: true
...
Server: gunicorn/19.9.0

{
    "args": {},
    ... 
    "form": {
        "hello": "world"
    },
    ...
}
```

我们可以看到 HTTP 响应包含了我们指定的表单数据。

5.4. 输出请求

要同时输出请求和响应，我们可以添加 _-v_，代表详细输出：

```
$ http -v httpbin.org/get
GET /get HTTP/1.1
Accept: */*
...
User-Agent: HTTPie/3.2.1

HTTP/1.1 200 OK
Access-Control-Allow-Credentials: true
Access-Control-Allow-Origin: *
...
Server: gunicorn/19.9.0

{
    "args": {},
    "headers": {
        "Accept": "*/*",
    ...
}
```

输出包含请求和响应。

5.5. 上传文件

我们也可以将文件作为请求数据传递：

```
$ http httpbin.org/post `< hello.json
HTTP/1.1 200 OK
Access-Control-Allow-Credentials: true
... 
Server: gunicorn/19.9.0

{
    "args": {},
    "data": "{\"ahoy\":[\"Hello, World! 👋 感谢您尝试 HTTPie 🥳\",\"我们希望这将成为友谊。...\"json\": {
        "ahoy": [
            "Hello, World! 👋 感谢您尝试 HTTPie 🥳",
            "我们希望这将成为友谊。"
        ],
        "links": {
        ...
        }
    },
    ...
}
```

5.6. 下载文件

我们可以下载文件并重定向输出：

```
$ http httpbin.org/image/png >` image.png
```

此外，我们也可以以 _wget_ 风格下载文件：

```
$ http --download httpbin.org/image/png
HTTP/1.1 200 OK
...
Server: gunicorn/19.9.0

Downloading to png.png
Done. 8.1 kB in 00:0.06310 (128.2 kB/s)
```

6. 总结

在本文中，我们学习了如何安装和使用 HTTPie 命令行工具。