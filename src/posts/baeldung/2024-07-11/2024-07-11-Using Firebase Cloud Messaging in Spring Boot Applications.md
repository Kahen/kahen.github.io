---
date: 2022-11-01
category:
  - Spring Boot
  - Firebase Cloud Messaging
tag:
  - FCM
  - Push Notifications
head:
  - - meta
    - name: keywords
      content: Spring Boot, Firebase Cloud Messaging, push notifications, web applications, mobile applications
---
# 使用Firebase Cloud Messaging在Spring Boot应用程序中的实现

在这个快速教程中，我们将展示如何使用Google的Firebase Cloud Messaging（简称FCM）向Web和移动应用程序发送推送通知。

## 2. FCM是什么？

Firebase Cloud Messaging，简称FCM，是一个基于云的消息服务，提供以下功能：

- 可靠地向移动或Web应用程序发送消息，这里统称为“客户端”
- 使用主题或基于订阅的地址向所有或特定客户端发送消息
- 在服务器应用程序中接收来自客户端的消息

以下是这项技术在现实世界应用的一些示例：

- 发送具有特定产品独家优惠的目标消息
- 通知所有给定应用程序的用户新功能可用
- 即时消息/聊天应用程序
- 向特定客户发送直接通知

## 3. 应用程序架构

基于FCM的应用程序的典型架构包括服务器、客户端和FCM本身：

![img](https://www.baeldung.com/wp-content/uploads/2022/11/BAEL_5900_Architecture.png)

**在本教程中，我们将专注于这种应用程序的服务器端**。在我们的案例中，这个服务器将是一个基于Spring Boot的服务，它公开了一个REST API。这个API允许我们探索我们可以向我们（希望是庞大的）用户群发送通知的不同方式：

- 向主题发布通知
- 向特定客户端发布通知
- 向多个主题发布通知

这种应用程序的核心是客户端、主题和订阅的概念。

### 3.1. 主题

**主题是一个命名实体，作为具有某些属性的通知的中心**。例如，金融应用程序可以为它交易的每种资产使用一个主题。同样，体育应用程序可以为每个团队甚至特定比赛使用一个主题。

### 3.2. 客户端

**客户端是我们的应用程序的一个实例，安装在给定的移动设备上或在浏览器上运行**。为了接收通知，客户端使用适当的SDK API调用在我们的Firebase项目中注册自己。

成功注册后，客户端从Firebase获取一个唯一的注册令牌。通常，这个令牌被发送到服务器端，以便用于直接通知。

### 3.3. 订阅

**订阅表示客户端和主题之间的关联**。服务器应用程序使用一个API调用创建新的订阅，该调用采用一个或多个客户端注册令牌和一个主题名称。

## 4. Firebase项目设置

Firebase项目作为我们将与应用程序一起使用的云资源的容器。Google提供了一个无成本的初始层，允许开发人员尝试可用的服务，并仅支付超出可用配额的部分。

因此，要使用FCM，我们的第一步是使用Firebase的控制台创建一个新项目。一旦我们登录，我们将获得Firebase的主页：

![img](https://www.baeldung.com/wp-content/uploads/2022/11/BAEL_5900_Fig2-1024x384.png)

在这里，我们可以选择添加一个新项目或选择一个现有项目。让我们选择前者。这将启动一个向导，收集创建新项目所需的信息。

首先，我们必须为我们的项目命名：

![img](https://www.baeldung.com/wp-content/uploads/2022/11/BAEL_5900_Fig3.png)

注意，在通知的名称下，有一个带有为此项目生成的内部ID的按钮。通常，我们不需要更改它，但如果我们出于某种原因不喜欢它，我们可以点击它并使用不同的一个。**还要注意，虽然项目ID是唯一的，但项目名称不是唯一的，这可能会有点令人困惑。**

下一步，我们可以选择为我们的项目添加分析。我们将禁用此选项，因为我们不需要本教程。如果需要，我们可以稍后启用它。

![img](https://www.baeldung.com/wp-content/uploads/2022/11/BAEL_5900_Fig4.png)

一旦我们点击“创建项目”，Firebase将重定向我们到新创建的项目管理页面。

## 5. 生成服务帐户

**为了让服务器端应用程序能够对Firebase服务进行API调用，我们需要生成一个新的服务帐户并获取其凭据**。我们可以通过访问项目设置页面并选择“服务帐户”选项卡来实现这一点：

![img](https://www.baeldung.com/wp-content/uploads/2022/11/BAEL_5900_Fig6.png)

任何新项目都从一个可以在这个项目中基本上做任何事情的管理员服务帐户开始。**我们将在测试中使用它，但现实世界中的应用程序应该创建一个具有有限权限的专用服务帐户。** 这样做需要一些IAM（Google的身份和访问管理）知识，这超出了本教程的范围。

现在，我们必须点击“生成新的私钥”按钮，以下载一个包含调用Firebase API所需数据的JSON文件。不用说，我们必须将此文件存储在安全的位置。

## 6. Maven依赖项

现在我们已经准备好了Firebase项目，是时候编写将发送通知的服务器组件的代码了。除了常规的Spring Boot MVC应用程序启动器之外，我们还必须添加_firebase-admin_依赖项：

```xml
`<dependency>`
    `<groupId>`com.google.firebase`</groupId>`
    `<artifactId>`firebase-admin`</artifactId>`
    `<version>`9.1.1`</version>`
`</dependency>`
```

这个依赖项的最新版本可在Maven Central上找到。

## 7. Firebase消息配置

**_FirebaseMessaging_类是我们使用FCM发送消息的主要接口**。由于这个类是线程安全的，我们将在_@Configuration_类的_@Bean_方法中创建它的一个单一实例，并使其对我们的控制器可用：

```java
@Bean
FirebaseMessaging firebaseMessaging(FirebaseApp firebaseApp) {
    return FirebaseMessaging.getInstance(firebaseApp);
}

```

非常简单，但我们现在必须提供一个_FirebaseApp_。或者，我们可以使用_getInstance()_的无参数变体，它也能完成工作，但不让我们更改任何默认参数。

为了解决这个问题，让我们创建另一个_@Bean_方法，创建一个定制的_FirebaseApp_实例：

```java
@Bean
FirebaseApp firebaseApp(GoogleCredentials credentials) {
    FirebaseOptions options = FirebaseOptions.builder()
      .setCredentials(credentials)
      .build();

    return FirebaseApp.initializeApp(options);
}

```

这里，唯一的定制是使用特定的_GoogleCredentials_对象。_FirebaseOptions_的构建器允许我们调整Firebase客户端的其他方面：

- 超时
- HTTP请求工厂
- 特定服务的自定义端点
- 线程工厂

最后一块配置是凭据本身。我们将创建另一个_@Bean_，使用通过配置属性提供的服务帐户或使用默认的凭据链创建_GoogleCredentials_实例：

```java
@Bean
GoogleCredentials googleCredentials() {
    if (firebaseProperties.getServiceAccount() != null) {
        try (InputStream is = firebaseProperties.getServiceAccount().getInputStream()) {
            return GoogleCredentials.fromStream(is);
        }
    }
    else {
        // 使用标准凭据链。在GKE内部运行时很有用
        return GoogleCredentials.getApplicationDefault();
    }
}

```

**这种方法简化了在本地机器上的测试，我们可能有多份服务帐户文件。** 我们可以使用标准的_GOOGLE\_APPLICATION\_CREDENTIALS_环境变量指向正确的文件，但更改它有点麻烦。

## 8. 向主题发送消息

向主题发送消息需要两个步骤：构建一个_Message_对象并使用_FirebaseMessaging_的方法之一发送它。**_Message_实例是使用熟悉的构建器模式创建的：**

```java
Message msg = Message.builder()
  .setTopic(topic)
  .putData("body", "some data")
  .build();

```

一旦我们有了_Message_实例，我们就使用_send()_来请求其交付：

```java
String id = fcm.send(msg);
```

在这里，_fcm_是我们注入到控制器类中的_FirebaseMessaging_实例。_send()_返回的值是FCM生成的消息标识符。我们可以使用这标识符进行跟踪或记录。

_send()_还有一个异步版本_sendAsync()_，它返回一个_ApiFuture_对象。这个类扩展了Java的_Future_，所以我们可以很容易地用它与像Project Reactor这样的响应式框架一起使用。

## 9. 向特定客户端发送消息

正如我们之前提到的，每个客户端都有一个与其相关联的唯一订阅令牌。我们在构建_Message_时使用此令牌作为其“地址”，而不是主题名称：

```java
Message msg = Message.builder()
  .setToken(registrationToken)
  .putData("body", "some data")
  .build();

```

对于我们想要向多个客户端发送相同消息的用例，我们可以使用_MulticastMessage_和_sendMulticast()_。它们的工作方式与单播版本相同，但允许我们在单个调用中向多达五百个客户端发送消息：

```java
MulticastMessage msg = MulticastMessage.builder()
  .addAllTokens(message.getRegistrationTokens())
  .putData("body", "some data")
  .build();

BatchResponse response = fcm.sendMulticast(msg);
```

返回的_BatchResponse_包含生成的消息标识符和与给定客户端的交付相关的任何错误。

## 10. 向多个主题发送消息

FCM允许我们指定一个条件来定义消息的目标受众。**_条件_是一个逻辑expression that selects clients based on topics to which they’ve subscribed (or not). For instance, given three topics (T1, T2, and T3), this expression targets devices that are subscribers of T1 or T2 but not T3:

```java
('T1' in topics || 'T2' in topics) && !('T3' in topics)
```

Here, the `topics` variable represents all topics a given client has subscribed to. We can now build a message addressed to clients that satisfy this condition using the `setCondition()` method available in the builder:

```java
Message msg = Message.builder()
  .setCondition("('T1' in topics || 'T2' in topics) && !('T3' in topics)")
  .putData("body", "some data")
  .build();

String id = fcm.send(msg);
```

## 11. Subscribing Clients to Topics

We use the `subscribeToTopic()` (or its async variant `subscribeToTopicAsync()`) method to create a subscription that associates a client with a topic. The method accepts a list of client registration tokens and a topic name as arguments:

```java
fcm.subscribeToTopic(registrationTokens, topic);
```

Notice that, in contrast to other messaging systems, the returned value has no identifier for the created subscriptions. **If we want to keep track of which topics a given client has subscribed to, we must do it ourselves**.

To unsubscribe a client, we use `unsubscribeFromTopic()`:

```java
fcm.unsubscribeFromTopic(Arrays.asList(registrationToken), topic);
```

## 12. Conclusion

In this tutorial, we’ve shown how to send notification messages to web and mobile applications using Google’s Firebase Cloud Messaging service.

As usual, the full code is available over on GitHub.

![img](https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg)

OK