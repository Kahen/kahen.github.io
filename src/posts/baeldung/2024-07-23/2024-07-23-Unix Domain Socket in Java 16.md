---
date: 2022-04-01
category:
  - Java
  - Socket
tag:
  - Unix Domain Socket
  - Java 16
head:
  - - meta
    - name: keywords
      content: Unix Domain Socket, Java 16, Java Socket Programming
------
# Unix域套接字在Java 16 | Baeldung

## 1. 引言

在本教程中，我们将学习Unix域套接字通道。

我们将涵盖一些理论基础、优缺点，并构建一个简单的Java客户端-服务器应用程序，该应用程序使用Unix域套接字通道交换文本消息。

我们还将看看如何使用Unix域套接字连接数据库。

## 2. Unix域套接字通道

传统的进程间通信涉及由IP地址和端口号定义的TCP/IP套接字。它们用于互联网或私有网络上的网络通信。

另一方面，Unix域套接字仅限于同一物理主机上的进程之间的通信。它们在Unix操作系统中已经存在了几十年，但最近才被添加到Microsoft Windows中。因此，它们不再仅限于Unix系统。

Unix域套接字由文件系统路径名寻址，看起来与其他文件名非常相似，例如 _/folder/socket_ 或 _C:\\folder\\socket_。与TCP/IP连接相比，它们具有更快的设置时间、更高的数据吞吐量，并且在接受远程连接时没有安全风险。另一方面，最大的缺点是仅限于单个物理主机。

请注意，我们甚至可以使用Unix域套接字在同一系统上的容器之间进行通信，只要我们在共享卷上创建套接字即可。

## 3. 套接字配置

正如我们之前了解到的，Unix域套接字基于文件系统路径名，因此首先，我们需要为我们的套接字文件定义一个路径，并将其转换为_UnixDomainSocketAddress_：

```java
Path socketPath = Path
  .of(System.getProperty("user.home"))
  .resolve("baeldung.socket");
UnixDomainSocketAddress socketAddress = UnixDomainSocketAddress.of(socketPath);
```

在我们的示例中，我们在用户的主目录下创建了名为_baeldung.socket_的套接字文件。

我们需要记住的一件事是在服务器每次关闭后删除套接字文件：

```java
Files.deleteIfExists(socketPath);
```

不幸的是，它不会自动删除，我们无法在进一步的连接中重用它。任何尝试重用相同路径的尝试最终都会以异常结束，提示该地址已经被使用：

```java
java.net.BindException: Address already in use
```

## 4. 接收消息

接下来我们可以做的是启动一个服务器，该服务器将从套接字通道接收消息。

首先，我们应该使用Unix协议创建一个服务器套接字通道：

```java
ServerSocketChannel serverChannel = ServerSocketChannel
  .open(StandardProtocolFamily.UNIX);
```

进一步，我们需要将其与我们之前创建的套接字地址绑定：

```java
serverChannel.bind(socketAddress);
```

现在我们可以等待第一个客户端连接：

```java
SocketChannel channel = serverChannel.accept();
```

当客户端连接时，消息将以字节缓冲区的形式传来。为了读取这些消息，我们需要构建一个无限循环，处理输入并将每条消息打印到控制台：

```java
while (true) {
    readSocketMessage(channel)
      .ifPresent(message -> System.out.printf("[Client message] %s", message));
    Thread.sleep(100);
}
```

在上面的示例中，_readSocketMessage_方法负责将套接字通道缓冲区转换为_String_：

```java
private Optional`<String>` readSocketMessage(SocketChannel channel) throws IOException {
    ByteBuffer buffer = ByteBuffer.allocate(1024);
    int bytesRead = channel.read(buffer);
    if (bytesRead `< 0)
        return Optional.empty();

    byte[] bytes = new byte[bytesRead];
    buffer.flip();
    buffer.get(bytes);
    String message = new String(bytes);
    return Optional.of(message);
}
```

我们需要记住的是，服务器需要在客户端之前启动。正如我们的示例中，它只能接受单个客户端连接。

## 5. 发送消息

发送消息比接收消息要简单一些。

我们需要设置的唯一事情是一个Unix协议的套接字通道，并将其连接到我们的套接字地址：

```java
SocketChannel channel = SocketChannel
  .open(StandardProtocolFamily.UNIX);
channel.connect(socketAddress);
```

现在我们可以准备一条文本消息：

```java
String message = "Hello from Baeldung Unix domain socket article";
```

将其转换为字节缓冲区：

```java
ByteBuffer buffer = ByteBuffer.allocate(1024);
buffer.clear();
buffer.put(message.getBytes());
buffer.flip();
```

并将所有数据写入我们的套接字：

```java
while (buffer.hasRemaining()) {
    channel.write(buffer);
}
```

最后，以下输出将出现在服务器日志中：

```java
[Client message] Hello from Baeldung Unix domain socket article!
```

## 6. 连接到数据库

Unix域套接字可用于连接数据库。许多流行的发行版如MongoDB或PostgreSQL都带有默认配置，可以直接使用。

例如，MongoDB在_/tmp/mongodb-27017.sock_创建了一个Unix域套接字，我们可以直接在_MongoClient_配置中使用：

```java
MongoClient mongoClient = new MongoClient("/tmp/mongodb-27017.sock");
```

一个要求是将_jnr.unixsocket_依赖项添加到我们的项目中：

```xml
`<dependency>``
    ``<groupId>``com.github.jnr``</groupId>``
    ``<artifactId>``jnr-unixsocket``</artifactId>``
    ``<version>``0.38.13``</version>``
``</dependency>``
```

另一方面，PostgreSQL允许我们使用JDBC标准使用Unix域套接字。因此，我们只需要在创建连接时提供额外的_socketFactory_参数：

```java
String dbUrl = "jdbc:postgresql://databaseName?socketFactory=org.newsclub.net.unix.AFUNIXSocketFactory$FactoryArg&socketFactoryArg=/var/run/postgresql/.s.PGSQL.5432";
Connection connection = DriverManager
  .getConnection(dbUrl, "dbUsername", "dbPassword");
```

_socketFactory_参数应指向扩展_java.net.SocketFactory_的类。这个类将负责创建Unix域套接字而不是TCP/IP套接字。

在我们的示例中，我们使用了_junixsocket_库中的_AFUNIXSocketFactory_类：

```xml
`<dependency>`
  ``<groupId>``com.kohlschutter.junixsocket``</groupId>``
  ``<artifactId>``junixsocket-core``</artifactId>``
  ``<version>``2.4.0``</version>``
``</dependency>``
```

## 7. 总结

在本教程中，我们学习了如何使用Unix域套接字通道。我们涵盖了使用Unix域套接字发送和接收消息，以及如何使用Unix域套接字连接数据库。如常，所有源代码都可以在GitHub上找到。