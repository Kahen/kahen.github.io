---
date: 2022-04-01
category:
  - Java
  - Networking
tag:
  - SocketException
  - Broken Pipe
head:
  - - meta
    - name: keywords
      content: Java, SocketException, Broken Pipe, Networking, Error Handling
---
# 理解Java中的java.net.SocketException："Broken Pipe"错误

在本教程中，我们将仔细研究Java中的“java.net.SocketException: 'Broken Pipe'”错误。首先，我们将展示如何重现这个异常。接下来，我们将理解这个异常的主要原因，然后我们将看到如何修复它。

## 2. 实例演示

现在，让我们看一个生成错误“java.net.SocketException: 'Broken Pipe'”的示例。

简单来说，当一个设备尝试从一个已经死亡或连接已经被断开的另一个设备读取或写入数据时，通常会发生管道破裂。

由于连接已关闭，必须建立一个新的连接才能继续传输数据。否则，数据传输将停止。

### 2.1. 设置客户端和服务器

为了在本地模拟这种情况，我们将使用一个作为我们web服务器的_Server_类和一个作为我们客户端机器的_Client_类。

一旦我们关闭服务器套接字，连接到该套接字的客户端仍然发送消息并接收到错误消息。

如果服务器向客户端发送了一些响应，而客户端在此期间丢失了连接，也会发生这种情况。

首先，让我们创建一个名为_Server_的服务器类，监听端口_1234_：

```java
public class Server {
    public static void main(String[] args) {
        try {
            ServerSocket serverSocket = new ServerSocket(1234);
            System.out.println("服务器正在端口1234上监听...");
            
            Socket clientSocket = serverSocket.accept();
            System.out.println("客户端已连接: " + clientSocket.getInetAddress());
            // 为从客户端读取添加一些延迟
            Thread.sleep(2000);
            InputStream in = clientSocket.getInputStream();
            System.out.println("从客户端读取:" + in.read());
            in.close();
            clientSocket.close();
            serverSocket.close();
        }
        catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
    }
}
```

其次，让我们创建一个客户端_Client_并将其附加到端口_1234_的套接字：

```java
public class Client {
    public static void main(String[] args) {
        try {
            Socket socket = new Socket("localhost", 1234);
            OutputStream outputStream = socket.getOutputStream();
            outputStream.write("HELLO".getBytes());
            System.out.println("正在写入服务器..");
            // 这里我们再次写入。
            outputStream.write("HI".getBytes());
            System.out.println("再次写入服务器..");
            System.out.println("关闭客户端.");
            outputStream.close();
            socket.close();
        }
        catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

在这里，我们向服务器发送了一些消息，服务器读取并打印了这些消息。一旦我们运行服务器并启动客户端，在服务器关闭套接字之前发送数据，我们不会看到任何错误：

```plaintext
// 服务器控制台
服务器正在端口12345上监听...
客户端已连接: /127.0.0.1
从客户端读取：66

// 客户端控制台
正在写入服务器..
再次写入服务器..
关闭客户端.
```

### 2.2. 重现Broken Pipe错误

为了得到这个错误，让我们延迟发送客户端的下一条消息，直到服务器已经关闭了连接：

```java
public class Client {
    public static void main(String[] args) {
        try {
            Socket socket = new Socket("localhost", 1234);
            OutputStream outputStream = socket.getOutputStream();
            outputStream.write("HELLO".getBytes());
            System.out.println("正在写入服务器..");
            // 模拟在写入套接字后的延迟
            Thread.sleep(3000);
            outputStream.write("HI".getBytes());
            System.out.println("再次写入服务器..");
            System.out.println("关闭客户端.");
            outputStream.close();
            socket.close();
        }
        catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
    }
}
```

让我们再次运行它，看看服务器套接字已关闭，如果客户端发送消息，它将返回broken pipe错误：

```plaintext
// 服务器控制台
服务器正在端口12345上监听...
客户端已连接: /127.0.0.1
从客户端读取：66

// 客户端控制台
正在写入服务器..
java.net.SocketException: Broken pipe (Write failed)
    at java.net.SocketOutputStream.socketWrite0(Native Method)
    at java.net.SocketOutputStream.socketWrite(SocketOutputStream.java:111)
    at java.net.SocketOutputStream.write(SocketOutputStream.java:143)
    at com.baeldung.socketexception.brokenpipe.Client.main(Client.java:18)
```

## 3. 原因

这个错误一个例子是**当一个客户端程序，比如一个浏览器窗口，在完全从服务器读取数据之前崩溃或终止。如果连接被关闭，客户端在此后尝试向服务器写入数据将导致一个‘Broken pipe’错误。**

当涉及到网络套接字时，如果网络电缆被拔出或另一端的进程不工作，这种情况可能会发生。在这种情况下，连接可能被意外终止，或者网络可能正在经历问题。

就Java而言，并没有特定的_BrokenPipeException_。这个错误通常与其他错误捆绑在一起，比如_SocketException_和_IOException_。

客户端丢失连接可能有几种原因，包括在服务器响应之前关闭浏览器，服务器过载，或响应时间过长。

## 4. 解决方案

没有保证客户端/服务器总是会等待优雅的连接关闭。然而，仍然可以以有效的方式处理broken pipe错误。

**始终建议确保客户端和服务器适当地处理套接字连接，并优雅地关闭流和套接字，以便管理Java的“Broken pipe”错误。**

我们还必须有效地管理超时并快速响应。

同样，没有通用的修复方法。我们需要确定潜在问题并适当地解决它。

## 5. 结论

在本文中，我们学习了Java的“java.net.SocketException Broken pipe”错误。然后，我们讨论了如何产生这个错误并理解了异常的原因。最后，我们查看了处理错误的可能方法。

像往常一样，本文的示例代码可在GitHub上找到。