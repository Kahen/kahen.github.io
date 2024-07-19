---
date: 2022-04-01
category:
  - Java
  - Networking
tag:
  - IP Address
  - Java
head:
  - - meta
    - name: keywords
      content: Java, IP Address, Network Programming
---
# 使用Java获取当前机器的IP地址

IP地址或互联网协议地址是唯一标识互联网上的一个设备。因此，了解运行我们应用程序的设备的身份是某些应用程序的关键部分。

在本教程中，我们将探讨使用Java检索计算机IP地址的各种方法。

## 1. 查找本地IP地址

首先，让我们看看获取当前机器的本地IPv4地址的一些方法。

### 1.1 使用Java Net库获取本地地址

这种方法使用Java Net库来建立一个UDP连接：

```
try (final DatagramSocket datagramSocket = new DatagramSocket()) {
    datagramSocket.connect(InetAddress.getByName("8.8.8.8"), 12345);
    return datagramSocket.getLocalAddress().getHostAddress();
}
```

在这里，为了简单起见，我们使用Google的主要DNS作为我们的目的地主机，并提供IP地址_8.8.8.8_。Java Net库此时仅检查地址格式的有效性，因此地址本身可能是不可达的。此外，我们使用随机端口_12345_来创建与_socket.connect()_方法的UDP连接。在幕后，它设置了发送和接收数据所需的所有变量，包括机器的本地地址，而实际上并没有向目标主机发送任何请求。

虽然这个解决方案在Linux和Windows机器上运行得非常好，但在macOS上却有问题，并没有返回预期的IP地址。

### 1.2 使用Socket连接获取本地地址

或者，我们可以通过可靠的互联网连接使用**套接字连接来查找IP地址**：

```
try (Socket socket = new Socket()) {
    socket.connect(new InetSocketAddress("google.com", 80));
    return socket.getLocalAddress().getHostAddress();
}
```

在这里，同样为了简单起见，我们使用_google.com_在端口_80_上进行连接以获取主机地址。只要它是可达的，我们可以使用任何其他URL来创建套接字连接。

### 1.3 复杂网络情况下的注意事项

上面列出的方法在简单的网络情况下运行得非常好。然而，在机器具有更多网络接口的情况下，行为可能不那么可预测。

换句话说，**从上述函数返回的IP地址将是机器上首选网络接口的地址。因此，它可能与我们预期的一个不同。**对于特定需求，我们可以找到连接到服务器的客户端的IP地址。

## 2. 查找公共IP地址

与本地IP地址类似，我们可能想要知道当前机器的公共IP地址。**公共IP地址是一个从互联网可达的IPv4地址。**此外，它可能不会唯一地标识查找地址的机器。例如，同一路由器下的多个主机具有相同的公共IP地址。

简单地说，我们可以连接到Amazon AWS _checkip.amazonaws.com_ URL并读取响应：

```
String urlString = "http://checkip.amazonaws.com/";
URL url = new URL(urlString);
try (BufferedReader br = new BufferedReader(new InputStreamReader(url.openStream()))) {
    return br.readLine();
}
```

这在大多数时候都运行得很好。然而，我们明确依赖于一个外部来源，其可靠性不能得到保证。因此，作为备选方案，我们可以使用以下任何URL来检索公共IP地址：

- _https://ipv4.icanhazip.com/_
- _http://myexternalip.com/raw_
- _http://ipecho.net/plain_

## 3. 结论

在本文中，我们学习了如何查找当前机器的IP地址以及如何使用Java检索它们。我们还查看了检查本地和公共IP地址的各种方法。

并且一如既往，示例的源代码可以在GitHub上找到。