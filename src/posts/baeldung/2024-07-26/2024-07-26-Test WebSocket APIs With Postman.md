---
date: 2021-09-01
category:
  - Web Development
tag:
  - Postman
  - WebSocket
head:
  - - meta
    - name: keywords
      content: WebSocket, Postman, API Testing
  - - meta
    - name: description
      content: Learn how to test WebSocket APIs using Postman, an API platform for building and testing APIs.
---

# 使用Postman测试WebSocket API

在本文中，我们将创建一个带有WebSocket的应用程序，并使用Postman进行测试。

## 2. Java WebSockets

**WebSocket是在Web浏览器和服务器之间建立的双向、全双工、持久的连接**。一旦WebSocket连接建立，连接就会保持开放状态，直到客户端或服务器决定关闭此连接。

WebSocket协议是我们应用程序处理实时消息的一种方式。最常见的替代方案是长轮询和服务器发送的事件。每种解决方案都有其优缺点。

在Spring中使用WebSocket的一种方式是使用STOMP子协议。**然而，在本文中，我们将使用原始WebSocket，因为到目前为止，Postman中尚不支持STOMP。**

## 3. Postman设置

Postman是一个用于构建和使用API的平台。使用Postman时，我们不需要编写HTTP客户端基础设施代码，只是为了测试。相反，我们创建称为集合的测试套件，并让Postman与我们的API进行交互。

## 4. 使用WebSocket的应用程序

我们将构建一个简单的应用程序。我们应用程序的工作流程将是：

- 服务器向客户端发送一次性消息
- 它向客户端发送定期消息
- 收到客户端的消息后，将其记录并发送回客户端
- 客户端向服务器发送不定期消息
- 客户端接收来自服务器的消息并记录它们

工作流程图如下：

![img](https://www.baeldung.com/wp-content/uploads/2021/09/p1.svg)

## 5. Spring WebSocket

我们的服务器由两部分组成。**Spring WebSocket事件处理器和Spring WebSocket配置**。我们将分别讨论它们：

### 5.1. Spring WebSocket配置

我们可以通过添加_@EnableWebSocket_注解来在Spring服务器中启用WebSocket支持。

**在同一配置中，我们还将注册实现的WebSocket处理器用于WebSocket端点：**

```
@Configuration
@EnableWebSocket
public class ServerWebSocketConfig implements WebSocketConfigurer {

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(webSocketHandler(), "/websocket");
    }

    @Bean
    public WebSocketHandler webSocketHandler() {
        return new ServerWebSocketHandler();
    }
}
```

### 5.2. Spring WebSocket处理器

WebSocket处理器类扩展了_TextWebSocketHandler_。**此处理器使用_handleTextMessage_回调方法从客户端接收消息**。_sendMessage_方法向客户端回送消息：

```
@Override
public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
    String request = message.getPayload();
    logger.info("Server received: {}", request);

    String response = String.format("response from server to '%s'", HtmlUtils.htmlEscape(request));
    logger.info("Server sends: {}", response);
    session.sendMessage(new TextMessage(response));
}
```

_@Scheduled_方法使用相同的_sendMessage_方法向活跃的客户端广播定期消息：

```
@Scheduled(fixedRate = 10000)
void sendPeriodicMessages() throws IOException {
    for (WebSocketSession session : sessions) {
        if (session.isOpen()) {
            String broadcast = "server periodic message " + LocalTime.now();
            logger.info("Server sends: {}", broadcast);
            session.sendMessage(new TextMessage(broadcast));
        }
    }
}
```

我们将用于测试的端点将是：

```
ws://localhost:8080/websocket
```

## 6. 使用Postman进行测试

现在我们的端点已经准备好了，我们可以使用Postman进行测试。**要测试WebSocket，我们必须拥有8.5.0或更高版本。**

在开始使用Postman的过程之前，我们将运行我们的服务器。现在让我们继续。

首先，启动Postman应用程序。一旦启动，我们可以继续。

从UI加载后选择新建：

![img](https://www.baeldung.com/wp-content/uploads/2021/09/postman_ws1.png)

将打开一个新的弹出窗口。**从那里** **选择WebSocket请求：**

![img](https://www.baeldung.com/wp-content/uploads/2021/09/postman_ws2.png)

**我们将** **测试原始WebSocket请求**。屏幕应该看起来像这样：

![img](https://www.baeldung.com/wp-content/uploads/2021/09/postman_ws3.png)

现在让我们添加我们的_URL。按下连接按钮并测试连接：

![img](https://www.baeldung.com/wp-content/uploads/2021/09/postman_ws_4.png)

所以，连接工作正常。正如我们从控制台看到的，我们正在从服务器接收响应。现在让我们尝试发送消息，服务器将响应回来：

![img](https://www.baeldung.com/wp-content/uploads/2021/09/postman_ws5.png)

测试完成后，我们可以通过点击断开连接按钮来简单地断开连接。

## 7. 结论

在本文中，我们创建了一个简单的应用程序来测试与WebSocket的连接，并使用Postman进行了测试。

最后，相关代码可以在GitHub上找到。