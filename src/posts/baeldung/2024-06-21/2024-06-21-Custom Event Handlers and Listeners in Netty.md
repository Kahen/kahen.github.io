---
date: 2024-01-12
category:
  - Netty
  - 编程
tag:
  - Netty
  - 事件处理器
  - 监听器
head:
  - - meta
    - name: keywords
      content: Netty, 事件处理器, 监听器, 聊天室
---
# Netty中自定义事件处理器和监听器

在本教程中，我们将使用Netty来创建一个聊天室应用程序。在网络编程中，Netty以其强大的框架脱颖而出，简化了异步I/O操作的复杂性。我们将探索如何构建一个基本的聊天服务器，允许多个客户端连接并进行实时对话。

## 场景
发送到服务器的消息将被转发给所有连接的客户端。它还将保留最后几条消息的列表，以便新客户端在连接时可以从当前对话中获得上下文。为此，我们只需要几个事件处理器来维护通道之间的通信：

在Netty中，通信是通过通道完成的，这抽象了任何协议上的异步I/O操作。这使我们能够专注于应用逻辑而不是网络代码。我们的应用程序将通过命令行工作。我们将编写服务器和客户端应用程序。

## 创建自定义事件处理器
为了通道之间的通信，我们将实现一个_GenericChannelInboundHandler````<String>````_，这是_GenericChannelInboundHandlerAdapter_的泛型实现。这个适配器允许我们只关注我们关心的事件。在这种情况下，它是_channelRead0()_，当从服务器接收到消息时会被调用。我们将使用这个来简化我们的用例，因为我们只交换_String_消息。

### 3.1. 客户端事件处理器
让我们从处理客户端消息的处理器开始，它将打印服务器接收到的任何内容到控制台，不做任何修改：

```java
public class ClientEventHandler extends SimpleChannelInboundHandler````<String>```` {
    @Override
    protected void channelRead0(ChannelHandlerContext ctx, String msg) {
        System.out.println(msg);
    }
}
```

稍后，我们将通过直接写入通道来处理消息发送。

### 3.2. 消息对象
在我们继续服务器事件之前，让我们编写一个POJO来表示发送到服务器的每条消息。我们将注册发送日期以及用户名和消息：

```java
public class Message {
    private final Instant time;
    private final String user;
    private final String message;

    public Message(String user, String message) {
        this.time = Instant.now();
        this.user = user;
        this.message = message;
    }

    // 标准getter...
}
```

然后，我们将包括一些助手，首先是消息在控制台显示的方式，当由服务器发送时：

```java
@Override
public String toString() {
    return time + " - " + user + ": " + message;
}
```

然后，对于解析客户端接收到的消息，我们将使用CSV格式。我们将看到客户端在创建客户端应用程序时以这种格式发送消息：

```java
public static Message parse(String string) {
    String[] arr = string.split(";", 2);
    return new Message(arr[0], arr[1]);
}
```

限制分割为2很重要，因为消息部分可能包含分号。

### 3.3. 服务器事件处理器
在我们的服务器事件处理器中，我们首先为我们将覆盖的其他事件创建一个辅助方法。我们还需要一个连接客户端的映射和一个_Queue_，以保持最多_MAX_HISTORY_元素：

```java
public class ServerEventHandler extends SimpleChannelInboundHandler````<String>```` {
    static final Map`<String, Channel>` clients = new HashMap<>();
    static final Queue````<String>```` history = new LinkedList<>();
    static final int MAX_HISTORY = 5;

    private void handleBroadcast(Message message, ChannelHandlerContext context) {
        String channelId = context.channel()
          .id()
          .asShortText();

        clients.forEach((id, channel) -> {
            if (!id.equals(channelId))
                channel.writeAndFlush(message.toString());
        });

        // 历史控制代码...
    }

    // ...
}
```

首先，我们以通道ID作为我们映射的键。然后，对于广播，对于每个连接的客户端，除了发送者，我们转发他们的消息。

重要的是要注意_writeAndFlush()_接收一个_Object_。并且，由于我们的处理器只能处理字符串，因此必须调用_toString()_以便客户端可以正确接收它。

最后，我们进行历史控制。每次我们添加一条新消息时，如果我们的列表超过_MAX_HISTORY_项目，我们就会移除最旧的一个：

```java
history.add(message.toString());
if (history.size() > MAX_HISTORY)
    history.poll();
```

现在，我们可以覆盖_channelRead0()_并解析来自客户端的消息：

```java
@Override
public void channelRead0(ChannelHandlerContext context, String msg) {
    handleBroadcast(Message.parse(msg), context);
}
```

然后，对于每个上线的客户端，我们将其添加到我们的_clients_列表中，转发旧消息以获取上下文，并发送一个系统消息宣布新客户端：

```java
@Override
public void channelActive(final ChannelHandlerContext context) {
    Channel channel = context.channel();
    clients.put(channel.id().asShortText(), channel);

    history.forEach(channel::writeAndFlush);

    handleBroadcast(new Message("system", "client online"), context);
}
```

最后，我们覆盖_channelInactive()_，在客户端下线时调用。这次，我们只需要从列表中移除客户端并发送系统消息：

```java
@Override
public void channelInactive(ChannelHandlerContext context) {
    Channel channel = context.channel();
    clients.remove(channel.id().asShortText());

    handleBroadcast(new Message("system", "client offline"), context);
}
```

## 服务器引导应用程序
我们的处理器不能独立工作，所以我们需要一个应用程序来引导并运行它，这是一个常见的模板。

### 4.1. 在_ChannelPipeline_中注册自定义组件
为了准备引导，我们选择一个通道实现并实现一个子处理器，该处理器为通道提供请求服务：

```java
bootstrap.group(serverGroup, clientGroup)
  .channel(NioServerSocketChannel.class)
  .childHandler(new ChannelInitializer`<SocketChannel>`() {
      @Override
      public void initChannel(SocketChannel channel) {
          channel.pipeline()
            .addFirst(
              new StringDecoder(),
              new ServerEventHandler(),
              new StringEncoder());
      }
  });
```

在子处理器中，我们定义了我们的处理管道。由于我们只关心_String_消息，我们将使用内置的_String_编码器和解码器，这为我们节省了时间，因为我们不必自己编码/解码交换的字节缓冲区。

最后，由于顺序很重要，我们添加了解码器，我们的_ServerEventHandler_和编码器。这是因为事件从入站流到出站。

我们将绑定我们的服务器到一个主机/端口来完成我们的应用程序，这将返回一个_ChannelFuture_。我们将使用这个来等待我们的异步套接字关闭_with sync()_:

```java
ChannelFuture future = bootstrap.bind(HOST, PORT).sync();
System.out.println("server started. accepting clients.");
future.channel().closeFuture().sync();
```

## 客户端引导应用程序
最后，我们的客户端应用程序遵循一个常见的客户端模板进行引导。最重要的是，在调用_handler()_时，我们将使用我们的_ClientEventHandler_:

```java
channel.pipeline().addFirst(
  new StringDecoder(),
  new ClientEventHandler(),
  new StringEncoder());
```

### 5.1. 处理消息输入
最后，为了处理用户输入，在连接到服务器后，我们将使用_Scanner_循环，直到我们收到一个用户名，然后，直到消息等于“exit”。最重要的是，我们必须使用_writeAndFlush()_来发送我们的消息。我们以_Message.parse()_预期的格式发送消息：

```java
private static void messageLoop(Scanner scanner, Channel channel) {
    while (user.isEmpty()) {
        System.out.print("your name: ");
        user = scanner.nextLine();
    }

    while (scanner.hasNext()) {
        System.out.print("> ");
        String message = scanner.nextLine();
        if (message.equals("exit"))
            break;

        channel.writeAndFlush(user + ";" + message);
    }
}
```

## 创建自定义事件监听器
在Netty中，事件监听器在处理通道生命周期中的异步事件中起着至关重要的作用。事件监听器本质上是一个回调机制，我们可以使用它来响应返回_ChannelFuture_的任何操作的完成。

我们实现_ChannelFutureListener_接口以在完成后自定义行为。_ChannelFuture_代表异步操作的结果，例如连接尝试或I/O操作。

_ChannelFutureListener_很有用，因为它定义了像_CLOSE_ON_FAILURE_或_FIRE_EXCEPTION_ON_FAILURE_这样的默认实现。但是，由于我们不会使用这些，让我们实现一个_GenericFutureListener_，我们将用于操作确认。

**我们将持有一个自定义事件名称用于上下文，我们将检查我们的future是否成功完成。否则，我们将在记录之前将状态标记为“FAILED”**:

```java
public class ChannelInfoListener implements GenericFutureListener`<ChannelFuture>` {

    private final String event;

    public ChannelInfoListener(String event) {
        this.event = event;
    }

    @Override
    public void operationComplete(ChannelFuture future) throws Exception {
        Channel channel = future.channel();
        String status = "OK";

        if (!future.isSuccess()) {
            status = "FAILED";
            future.cause().printStackTrace();
        }

        System.out.printf(
          "%s - channel#%s %s: %s%n", Instant.now(), channel.idasShortText(), status, event);
    }
}
```

### 6.1. 事件收据
让我们回到代码的某些部分，包括监听器。首先，对于客户端，让我们包括一个“已连接到服务器”的确认：

```java
future.addListener(new ChannelInfoListener("connected to server"));
```

然后，让我们在消息循环中包括一个“消息已发送”的确认：

```java
ChannelFuture sent = channel.writeAndFlush(user + ";" + message);
sent.addListener(new ChannelInfoListener("message sent"));
```

这使我们能够确保在发送消息时仍然连接到服务器。最后，对于服务器处理器，在广播期间让我们发送一个“消息已转发”的确认：

```java
clients.forEach((id, channel) -> {
    if (!id.equals(channelId)) {
        ChannelFuture relay = channel.writeAndFlush(message.toString());
        relay.addListener(new ChannelInfoListener("message relayed to " + id));
    }
});
```

## 7. 实际操作
Netty允许我们使用_EmbeddedChannel_测试管道，但是对于客户端/服务器交互，让我们看看从终端运行时它是什么样子。让我们启动服务器（为了可读性，我们将省略包名）：

```shell
$ mvn exec:java -Dexec.mainClass=ChatServerMain
chat server started. ready to accept clients.
```

然后，让我们启动第一个客户端，输入一个名字，并发送两条消息：

```shell
$ mvn exec:java -Dexec.mainClass=ChatClientMain
2024-01-12 3:47:02 - channel#03c40ad4 OK: connected to server
your name: Bob
> Hello
2024-01-12 3:47:02 - channel#03c40ad4 OK: message sent
> Anyone there?!
2024-01-12 3:47:03 - channel#03c40ad4 OK: message sent
```

**当我们用第二个客户端连接时，我们将在输入名字之前获得消息历史记录**：

```shell
$ mvn exec:java -Dexec.mainClass=ChatClientMain
2024-01-12 3:49:33 - channel#daa64476 OK: connected to server
2024-01-12 3:46:55 - system: client online: 03c40ad4
2024-01-12 3:47:03 - Bob: Hello
2024-01-12 3:48:40 - Bob: Anyone there?!
```

自然，在选择了名字并发送了一条消息之后：

```shell
your name: Alice
> Hi, Bob!
2024-01-12 3:51:05 - channel#daa64476 OK: message sent
```

第一个客户端将收到它：

```shell
2024-01-12 3:49:33 - system: client online: daa64476
2024-01-12 3:51:05 - Alice: Hi, Bob!
```

## 8. 结论
在本文中，我们成功地使用Netty构建了一个功能齐全的聊天服务器，展示了这个框架在处理异步通信方面的强大和简单性。通过实现事件处理器，我们能够转发连接客户端之间的消息并维护上下文历史。

如常，源代码可在GitHub上获得。 

OK