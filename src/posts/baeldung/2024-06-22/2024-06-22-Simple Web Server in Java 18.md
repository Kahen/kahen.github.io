---
date: 2024-02-09
category:
  - Java
  - Web Server
tag:
  - Java 18
  - Simple Web Server
head:
  - - meta
    - name: keywords
      content: Java 18, Simple Web Server, JEP 408, jwebserver, API, HttpServer, HttpHandler, HttpFilter
---
# Java 18中的简单Web服务器教程

从Java 18开始，我们可以使用JEP 408中引入的简单Web服务器。我们可以通过命令行工具和API访问其功能。

简单Web服务器提供了一个基础的Web服务器，用于服务静态文件。它被描述为对测试、原型设计和教育非常有用。服务器故意设置得非常简单，并且不打算与Apache Tomcat或Jetty等更完全功能的选项竞争或取代。

引入该工具的目标之一是让开发人员尽可能少地设置障碍，快速开始Web开发。

在本教程中，我们将了解简单Web服务器及其工作原理。

启动服务器最简单和最直接的方法是使用提供的命令行工具。

### 2.1. 启动
我们在这里需要的命令是_jwebserver_。**单独使用命令_jwebserver_就足以启动服务器。**

如果一切正常，我们会看到这个响应：

```shell
$ jwebserver
默认绑定到回环地址。使用"-b 0.0.0.0"或"-b ::"绑定到所有接口。
在127.0.0.1端口8000上服务/usr及其子目录
URL http://127.0.0.1:8000/
```

**默认情况下，我们运行命令时所在的目录是被服务的目录，如上面示例中的/usr。但是，我们可以使用_d_标志更改目录：**

```shell
$ jwebserver -d /opt
默认绑定到回环地址。使用"-b 0.0.0.0"或"-b ::"绑定到所有接口。
在127.0.0.1端口8000上服务/opt及其子目录
URL http://127.0.0.1:8000/
```

值得注意的是，这里我们必须提供绝对路径。

我们还可以**使用_p_和_b_标志更改端口和地址**：

```shell
$ jwebserver -b 0.0.0.0 -p 3003
在0.0.0.0（所有接口）端口3003上服务/及其子目录
URL http://192.168.1.1:3003/
```

运行上述配置将使我们的当前目录对网络上的任何人在输出中给定的IP地址上可见。如果我们试图传输文件，这可能很有用，但我们应该确保我们愿意首先分享它们。

### 2.2. GET请求
**我们可以使用浏览器访问正确的地址和端口来访问Web服务器。** 到达那里后，我们将看到从我们启动服务器的目录开始的文件和子目录列表：

然后，如果我们访问这些文件中的任何一个，我们将在浏览器中看到它们，并且在终端中也会看到新的一行：

```shell
127.0.0.1 - - [09/Feb/2024:12:06:26 +0000] "GET /file.txt HTTP/1.1" 200 -
```

类似地，当进入一个新的子目录时，我们将看到GET请求记录我们正在访问的目录：

```shell
127.0.0.1 - - [09/Feb/2024:12:06:52 +0000] "GET /subdirectory/ HTTP/1.1" 200 -
```

## 3. API
使用简单Web服务器的第二种选项是API。通过使用它，我们可以获得更多的控制并自定义请求的处理方式。

### 3.1. 定义服务器
首先，让我们使用API重新创建我们的命令行Web服务器。

**为此我们将使用类** _**SimpleFileServer.**_ **我们可以使用这个类做三件事 - 创建一个_HttpServer_，创建一个_HttpHandler_，以及创建一个_HttpFilter_。**

首先，我们只是使用_createFileServer()_创建并启动一个服务器：

```java
public static void main(String[] args) {
    InetSocketAddress address = new InetSocketAddress(8080);
    Path path = Path.of("/");
    HttpServer server = SimpleFileServer.createFileServer(address, path, SimpleFileServer.OutputLevel.VERBOSE);
    server.start();
}
```

在这里，我们指定了一个地址，使用_InetSocketAddress_类。我们也可以在这里更改其余的地址，而不仅仅是端口。

然后，我们设置了一个_Path_对象，指向我们想要服务的目录。

接下来，我们将这些作为参数传递给_createFileServer()_，以及日志级别，就像之前一样，我们可以配置这些以满足我们的需求。由此产生的Web服务器与使用命令行工具创建的服务器相同，并且可以通过我们的浏览器在_127.0.0.1:8080_上访问。

### 3.2. 处理器
显然，创建上面的服务器并没有提供比命令行工具更多的优势。**要开始获得一些控制，我们需要引入一个_HttpHandler_。**

让我们看看如何向我们的服务器添加自定义处理器。我们可以使用_SimpleFileServer_的另一个方法，_createFileHandler()_来创建处理器。假设我们已经有了一个像之前创建的那样的服务器，我们可以将我们的新处理器附加到它：

```java
HttpHandler handler = SimpleFileServer.createFileHandler(Path.of("/Users"));
server.createContext("/test", handler);
```

这导致所有流量到_127.0.0.1:8080/test_都通过我们的新处理器。

我们可以使用处理器做更多的事情。例如，让我们设置一个服务器，模拟在不同端点上允许和拒绝访问。我们可以使用_HttpHandlers.of()_方法来为两者创建响应：

```java
HttpHandler allowedResponse = HttpHandlers.of(200, Headers.of("Allow", "GET"), "Welcome");
HttpHandler deniedResponse = HttpHandlers.of(401, Headers.of("Deny", "GET"), "Denied");
```

接下来，我们需要定义一个_Predicate_来决定何时返回每个响应：

```java
Predicate`<Request>` findAllowedPath = r -> r.getRequestURI().getPath().equals("/test/allowed");
```

这只在我们尝试访问URL_/test/allowed_时返回_true_。所有其他端点都失败。

现在我们可以使用_HttpHandlers.handleOrElse()_，它接受我们的_Predicate_和两个选项。如果_Predicate_通过，则执行第一个，否则执行第二个：

```java
HttpHandler handler = HttpHandlers.handleOrElse(findAllowedPath, allowedResponse, deniedResponse);
```

最后，我们可以像以前一样使用新的_HttpHandler_设置我们的_HttpServer_：

```java
HttpServer server = SimpleFileServer.createFileServer(address, path, SimpleFileServer.OutputLevel.VERBOSE);
server.createContext("/test", handler);
```

结果是，导航到_http://127.0.0.1:8080/test/allowed_会显示文本‘_Welcome_’和_200_响应。导航到任何其他路径会显示‘_Denied_’和_401_响应。我们可以根据需要使用此方法设置测试环境。然而，潜在的复杂性相当低。

### 3.3. 过滤器
_SimpleFileServer_类的最后一部分是创建一个_Filter_的能力。这个_Filter_的作用是处理日志消息。通过定义我们自己的_Filter_，我们可以将我们的消息重定向到我们选择的_OutputStream_。

**应用_Filter_时，服务器的创建方式不同。** 首先，我们使用_createOutputFilter()_创建_Filter_：

```java
Filter filter = SimpleFileServer.createOutputFilter(System.out, SimpleFileServer.OutputLevel.INFO);
```

我们在这里使用了_System.out_作为一个简单的_OutputStream_示例，但我们可以使用任何我们想要的记录器或其他东西。

接下来，我们将使用_HttpServer_类的_create()_方法，使用我们刚刚制作的_filter_：

```java
HttpServer server = HttpServer.create(new InetSocketAddress(8080), 10, "/test", handler, filter);
```

这里有几个参数，让我们一一了解。首先，地址以_InetSocketAddress_的形式，像以前一样。其次，一个整数指定套接字回退。这是一次允许的最大TCP连接排队数。第三，我们有上下文。在这里，我们指定我们想要处理打击_127.0.0.1:8080/test_的流量。第四个参数是一个_HttpHandler_，类似于我们之前创建的。最后是我们的_Filter_作为第五个参数。

这提供了与我们之前使用处理器时相同的功能。**然而，我们现在对日志输出有了完全的控制。**

## 4. 结论
在本文中，我们已经看到我们可以快速启动Java 18的简单Web服务器，并且它提供了一些有用的功能。

首先，我们看到通过使用命令行工具_jwebserver_，我们可以在瞬间启动一个服务器。这个服务器提供了对我们运行它的位置上的文件和子目录的读取访问。

接着，我们查看了API和可用的新类，如_SimpleFileServer_。使用这个API，我们可以以编程方式实现与命令行工具相同的结果，我们还可以使用_HttpHandler_和_Filter_扩展我们的控制。

如常，示例的完整代码可在GitHub上找到。