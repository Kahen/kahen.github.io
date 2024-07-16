---
date: 2024-07-17
category:
  - Spring JMS
  - Testing
tag:
  - Spring
  - JMS
  - Testing
head:
  - - meta
    - name: keywords
      content: Spring JMS, Testing, ActiveMQ, Embedded ActiveMQ, TestContainers
------
# Spring JMS 测试

## **1. 概述**

在本教程中，我们将创建一个简单的 Spring 应用程序，该程序连接到 ActiveMQ 来发送和接收消息。**我们将专注于测试这个应用程序以及测试 Spring JMS 的不同方法。**

## **2. 应用程序设置**

首先，让我们创建一个基本的应用程序，该程序可以用于测试。我们需要添加必要的依赖项并实现消息处理。

### **2.1. 依赖项**

让我们向我们的项目的 _pom.xml_ 添加所需的依赖项。**我们需要 Spring JMS 才能监听 JMS 消息。我们将使用 ActiveMQ-Junit 启动嵌入式 ActiveMQ 实例的一部分测试，并使用 TestContainers 运行其他测试中的 ActiveMQ Docker 容器：**

```xml
```<dependency>```
    ```<groupId>```org.springframework```</groupId>```
    ```<artifactId>```spring-jms```</artifactId>```
    ```<version>```4.3.4.RELEASE```</version>```
```</dependency>```

```<dependency>```
    ```<groupId>```org.apache.activemq.tooling```</groupId>```
    ```<artifactId>```activemq-junit```</artifactId>```
    ```<version>```5.16.5```</version>```
    ``<scope>``test``</scope>``
```</dependency>```

```<dependency>```
    ```<groupId>```org.testcontainers```</groupId>```
    ```<artifactId>```testcontainers```</artifactId>```
    ```<version>```1.17.3```</version>```
    ``<scope>``test``</scope>``
```</dependency>```
```

### **2.2. 应用程序代码**

现在让我们创建一个可以监听消息的 Spring 应用程序：

```java
@ComponentScan
public class JmsApplication {
    public static void main(String[] args) {
        ApplicationContext context = new AnnotationConfigApplicationContext(JmsApplication.class);
    }
}
```

我们需要创建一个配置类，并使用 _@EnableJms_ 注解启用 JMS 并配置 _ConnectionFactory_ 以连接到我们的 ActiveMQ 实例：

```java
@Configuration
@EnableJms
public class JmsConfig {

    @Bean
    public JmsListenerContainerFactory```<?>``` jmsListenerContainerFactory() {
        DefaultJmsListenerContainerFactory factory = new DefaultJmsListenerContainerFactory();
        factory.setConnectionFactory(connectionFactory());
        return factory;
    }

    @Bean
    public ConnectionFactory connectionFactory() {
        return new ActiveMQConnectionFactory("tcp://localhost:61616");
    }

    @Bean
    public JmsTemplate jmsTemplate() {
        return new JmsTemplate(connectionFactory());
    }
}
```

之后，让我们创建我们的监听器，可以接收和处理消息：

```java
@Component
public class MessageListener {

    private static final Logger logger = LoggerFactory.getLogger(MessageListener.class);

    @JmsListener(destination = "queue-1")
    public void sampleJmsListenerMethod(TextMessage message) throws JMSException {
        logger.info("JMS listener received text message: {}", message.getText());
    }
}
```

我们还需要一个可以发送消息的类：

```java
@Component
public class MessageSender {

    @Autowired
    private JmsTemplate jmsTemplate;

    private static final Logger logger = LoggerFactory.getLogger(MessageSender.class);

    public void sendTextMessage(String destination, String message) {
        logger.info("Sending message to {} destination with text {}", destination, message);
        jmsTemplate.send(destination, s -> s.createTextMessage(message));
    }
}
```

## **3. 使用嵌入式 ActiveMQ 进行测试**

让我们测试我们的应用程序。**我们首先使用嵌入式 ActiveMQ 实例。** 让我们创建我们的测试类并添加一个 JUnit Rule 来管理我们的 ActiveMQ 实例：

```java
@RunWith(SpringRunner.class)
public class EmbeddedActiveMqTests4 {

    @ClassRule
    public static EmbeddedActiveMQBroker embeddedBroker = new EmbeddedActiveMQBroker();

    @Test
    public void test() {
    }

    // ...
}
```

让我们运行这个空测试并检查日志。**我们可以看到嵌入式代理与我们的测试一起启动：**

```
INFO | Starting embedded ActiveMQ broker: embedded-broker
INFO | Using Persistence Adapter: MemoryPersistenceAdapter
INFO | Apache ActiveMQ 5.14.1 (embedded-broker, ID:DESKTOP-52539-254421135-0:1) is starting
INFO | Apache ActiveMQ 5.14.1 (embedded-broker, ID:DESKTOP-52539-254421135-0:1) started
INFO | For help or more information please see: http://activemq.apache.org
INFO | Connector vm://embedded-broker started
INFO | Successfully connected to vm://embedded-broker?create=false
```

代理在测试类中的所有测试执行完毕后停止。

我们需要配置我们的应用程序以连接到这个 ActiveMQ 实例，以便我们可以正确测试我们的 _MessageListener_ 和 _MessageSender_ 类：

```java
@Configuration
@EnableJms
static class TestConfiguration {
    @Bean
    public JmsListenerContainerFactory```<?>``` jmsListenerContainerFactory() {
        DefaultJmsListenerContainerFactory factory = new DefaultJmsListenerContainerFactory();
        factory.setConnectionFactory(connectionFactory());
        return factory;
    }

    @Bean
    public ConnectionFactory connectionFactory() {
        return new ActiveMQConnectionFactory(embeddedBroker.getVmURL());
    }

    @Bean
    public JmsTemplate jmsTemplate() {
        return new JmsTemplate(connectionFactory());
    }
}
```

这个类使用一个特殊的 _ConnectionFactory_，它从我们的嵌入式代理获取 URL。现在我们需要通过添加 _@ContextConfiguration_ 注解到包含我们测试的类中来使用这个配置：

```java
@ContextConfiguration(classes = { TestConfiguration.class, MessageSender.class })
public class EmbeddedActiveMqTests {
```

### **3.1. 发送消息**

让我们编写我们的第一个测试并检查我们的 _MessageSender_ 类的功能。首先，我们通过简单地将其注入为字段来获取这个类的实例：

```java
@Autowired
private MessageSender messageSender;
```

让我们向 ActiveMQ 发送一个简单的消息并添加一些断言来检查功能：

```java
@Test
public void whenSendingMessage_thenCorrectQueueAndMessageText() throws JMSException {
    String queueName = "queue-2";
    String messageText = "Test message";

    messageSender.sendTextMessage(queueName, messageText);

    assertEquals(1, embeddedBroker.getMessageCount(queueName));
    TextMessage sentMessage = embeddedBroker.peekTextMessage(queueName);
    assertEquals(messageText, sentMessage.getText());
}
```

**现在我们可以确定我们的 _MessageSender_ 工作正常，因为在我们发送消息后，队列中恰好包含一个条目，并且文本正确。**

### **3.2. 接收消息**

让我们也检查我们的监听器类。**让我们从创建一个新的测试方法并使用嵌入式代理发送消息开始。** 我们的监听器设置为使用 “queue-1” 作为其目标，因此我们需要确保我们在这里也使用相同的名称。

让我们使用 Mockito 来检查监听器的行为。我们将使用 _@SpyBean_ 注解来获取 _MessageListener_ 的实例：

```java
@SpyBean
private MessageListener messageListener;
```

然后，我们将检查方法是否被调用，并使用 _ArgumentCaptor_ 捕获接收到的方法参数：

```java
@Test
public void whenListening_thenReceivingCorrectMessage() throws JMSException {
    String queueName = "queue-1";
    String messageText = "Test message";

    assertEquals(0, embeddedBroker.getDestination(queueName).getDestinationStatistics().getDispatched().getCount());
    assertEquals(0, embeddedBroker.getDestination(queueName).getDestinationStatistics().getMessages().getCount());

    embeddedBroker.pushMessage(queueName, messageText);

    ArgumentCaptor messageCaptor = ArgumentCaptor.forClass(TextMessage.class);
    Mockito.verify(messageListener, Mockito.timeout(100))
        .sampleJmsListenerMethod(messageCaptor.capture());

    TextMessage receivedMessage = messageCaptor.getValue();
    assertEquals(messageText, receivedMessage.getText());

    assertEquals(1, embeddedBroker.getDestination(queueName).getDestinationStatistics().getDispatched().getCount());
    assertEquals(0, embeddedBroker.getDestination(queueName).getDestinationStatistics().getMessages().getCount());
}
```

**现在我们可以运行测试，并且它们都通过了。**

## **4. 使用 TestContainers 进行测试**

让我们看看另一种测试 Spring 应用程序中 JMS 的方法。**我们可以使用 TestContainers 运行一个 ActiveMQ Docker 容器并在我们的测试中连接到它。**

让我们创建一个新的测试类并包括 Docker 容器作为 JUnit Rule：

```java
@RunWith(SpringRunner.class)
public class TestContainersActiveMqTests {

    @ClassRule
    public static GenericContainer```<?>``` activeMqContainer
      = new GenericContainer<>(DockerImageName.parse("rmohr/activemq:5.14.3")).withExposedPorts(61616);

    @Test
    public void test() throws JMSException {
    }
}
```

让我们运行这个测试并检查日志。**我们可以看到一些与 TestContainers 相关的信息，因为它正在拉取指定的 docker 镜像，并且它启动的容器：**

```
INFO | Creating container for image: rmohr/activemq:5.14.3
INFO | Container rmohr/activemq:5.14.3 is starting: e9b0ddcd45c54fc9994aff99d734d84b5fae14b55fdc70887c4a2c2309b229a7
INFO | Container rmohr/activemq:5.14.3 started in PT2.635S
```

让我们创建一个类似于我们使用 ActiveMQ 实现的配置类。唯一的区别是 _ConnectionFactory_ 的配置：

```java
@Bean
public ConnectionFactory connectionFactory() {
    String brokerUrlFormat = "tcp://%s:%d";
    String brokerUrl = String.format(brokerUrlFormat, activeMqContainer.getHost(), activeMqContainer.getFirstMappedPort());
    return new ActiveMQConnectionFactory(brokerUrl);
}
```

### **4.1. 发送消息**

让我们测试我们的 _MessageSender_ 类，看看它是否适用于这个 Docker 容器。**这次我们不能使用 _EmbeddedBroker_ 上的方法，但 Spring 的 _JmsTemplate_ 也很容易使用：**

```java
@Autowired
private MessageSender messageSender;

@Autowired
private JmsTemplate jmsTemplate;

@Test
public void whenSendingMessage_thenCorrectQueueAndMessageText() throws JMSException {
    String queueName = "queue-2";
    String messageText = "Test message";

    messageSender.sendTextMessage(queueName, messageText);

    Message sentMessage = jmsTemplate.receive(queueName);
    Assertions.assertThat(sentMessage).isInstanceOf(TextMessage.class);

    assertEquals(messageText, ((TextMessage) sentMessage).getText());
}
```

我们可以使用 _JmsTemplate_ 读取队列的内容并检查我们的类是否发送了正确的消息。

### **4.2. 接收消息**

测试我们的监听器类也没有太大的不同。**让我们使用 _JmsTemplate_ 发送消息并验证我们的监听器是否接收到了正确的文本：**

```java
@SpyBean
private MessageListener messageListener;

@Test
public void whenListening_thenReceivingCorrectMessage() throws JMSException {
    String queueName = "queue-1";
    String messageText = "Test message";

    jmsTemplate.send(queueName, s -> s.createTextMessage(messageText));

    ArgumentCaptor`<TextMessage>` messageCaptor = ArgumentCaptor.forClass(TextMessage.class);

    Mockito.verify(messageListener, Mockito.timeout(100)).sampleJmsListenerMethod(messageCaptor.capture());

    TextMessage receivedMessage = messageCaptor.getValue();
    assertEquals(messageText, receivedMessage.getText());
}
```

## **5. 结论**

在本文中，我们创建了一个基本的应用程序，该程序可以使用 Spring JMS 发送和接收消息。然后，我们讨论了两种测试它的方法。

首先，我们使用了一个嵌入式 ActiveMQ 实例，它甚至提供了一些方便的方法与代理交互。其次，我们使用 TestContainers 来测试我们的代码，使用 Docker 容器模拟了更接近真实世界的场景。

如往常一样，这些示例的源代码可以在 GitHub 上找到。

[给Kimi加油](kimi://action?name=cheer-on-kimi)