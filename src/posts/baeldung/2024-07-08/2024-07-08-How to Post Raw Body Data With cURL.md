---
date: 2023-02-01
category:
  - cURL
  - HTTP
tag:
  - cURL
  - POST请求
  - 原始数据
head:
  - - meta
    - name: keywords
      content: cURL, POST请求, 原始数据, HTTP, 数据传输
------
# 如何使用cURL发送原始正文数据

客户端URL（cURL）是Linux中的一个命令行实用程序，支持通过多种协议（包括HTTP和HTTPS）在客户端和服务器之间进行数据交换。在本教程中，**我们将学习如何使用cURL通过POST请求发送原始正文数据**。

## 2. 理解 --data 和 --data-raw

cURL命令支持使用 --data 和 --data-raw 选项通过POST请求传输数据。在本节中，让我们了解使用这些选项的cURL的默认行为。

首先，我们需要一个服务器端点，该端点将接受我们作为客户端发起的请求。因此，**让我们访问webhook.site并获取服务器端点**：

```plaintext
https://webhook.site/5610141b-bd31-4940-9a83-1db44ff2283e
```

现在，让我们为了可重用性目的，用这个端点初始化变量website：

```shell
$ website="https://webhook.site/5610141b-bd31-4940-9a83-1db44ff2283e"
```

接下来，让我们**使用带有 --data 和 --data-raw 选项的cURL命令通过POST请求发送文本**：

```shell
$ curl --data "simple_body" --trace-ascii website-data.log "$website"
$ curl --data-raw "simple_body" --trace-ascii website-data-raw.log "$website"
```

我们必须注意，我们使用了 --trace-ascii 选项来追踪请求，并将追踪日志捕获在website-data.log和website-data-raw.log文件中。

继续进一步，让我们通过在捕获的追踪日志上执行grep来检查Content-Type头的值：

```shell
$ grep --max-count=1 Content-Type website-data-raw.log website-data.log
website-data-raw.log:0083: Content-Type: application/x-www-form-urlencoded
website-data.log:0083: Content-Type: application/x-www-form-urlencoded
```

我们可以推断，即使我们在原始请求中没有指定Content-Type，cURL将其设置为默认值application/x-www-form-urlencoded。因此，请求没有将文本“simple_body”作为原始数据发送，而是作为表单数据发送。

最后，让我们通过webhook.site页面直观地确认这一点：

![img](https://www.baeldung.com/wp-content/uploads/2023/02/curl-requests-inspection-1024x167.png)

我们可以注意到“simple_body”作为键出现在“表单值”部分，其值为空。

## 3. 定义 Content-Type 头

在这一部分，**我们将使用 --header 选项显式设置 Content-Type 头**，这样cURL就不会默认选择了。

让我们继续使用相同的内容进行cURL请求，但使用正确的头：

```shell
$ curl --header "Content-Type: text/plain" --data "simple_body" --trace-ascii website-data.log "$website"
$ curl --header "Content-Type: text/plain" --data-raw "simple_body" --trace-ascii website-data-raw.log "$website"
```

接下来，**让我们检查请求头中的Content-Type值**：

```shell
$ grep --max-count=1 Content-Type website-data-raw.log website-data.log
website-data-raw.log:006f: Content-Type: text/plain
website-data.log:006f: Content-Type: text/plain
```

我们可以注意到Content-Type头是正确的。此外，我们将看到我们使用了grep与--max-count=1来限制输出结果到请求头。

最后，让我们也通过访问webhook.site页面来直观地确认：

![img](https://www.baeldung.com/wp-content/uploads/2023/02/curl-requests-inspection-headers-1024x225.png)

我们可以看到原始文本出现在“原始内容”部分，而“表单值”部分现在是空的。

## 4. 从文件发送内容

有时，请求正文可能包含大量文本，建议我们直接从文件发送内容。

首先，让我们将内容存储在content.txt文件中：

```shell
$ echo "simple_body" > content.txt
```

我们必须注意，我们为了简单起见在文件中添加了简短的文本，相同的方法适用于更大的文件。

接下来，我们需要理解**cURL支持使用 --data 选项通过 @file 符号发送原始文本，而不是使用 --data-raw 选项**。所以让我们继续使用带有@file符号的 --data 选项进行cURL请求：

```shell
$ curl --header "Content-Type: plain/text" --data @content.txt --trace-ascii website-data.log "$website"
```

进一步，让我们通过检查website-data.log追踪文件中的请求正文来验证：

```shell
$ grep -B1 -i simple_body website-data.log
=> Send data, 11 bytes (0xb)
0000: simple_body
```

最后，让我们也看看当我们使用 --data-raw 选项与@file时会发生什么：

```shell
$ curl --header "Content-Type: plain/text" --data-raw @content.txt --trace-ascii website-data-raw.log "$website"
$ grep -B1 -i content.txt website-data-raw.log
=> Send data, 12 bytes (0xc)
0000: @content.txt
```

我们可以注意到这次，cURL没有理解它需要从content.txt文件中获取内容。相反，它将文本“@content.txt”作为请求正文发送了。

## 5. 结论

在本文中，**我们学习了如何使用cURL命令通过POST请求发送原始正文内容**。此外，我们还学习了如何使用文件发送大型内容。