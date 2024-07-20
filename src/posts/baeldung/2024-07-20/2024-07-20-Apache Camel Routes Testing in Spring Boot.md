---
date: 2024-07-21
category:
  - Spring Boot
  - Apache Camel
tag:
  - 集成测试
  - 单元测试
head:
  - - meta
    - name: keywords
      content: Spring Boot, Apache Camel, 单元测试, 集成测试
---

# Apache Camel 路由在 Spring Boot 中的测试

Apache Camel 是一个强大的开源集成框架，实现了一些众所周知的企业集成模式。

在本教程中，**我们将学习如何为我们的 Camel 路由编写可靠、自包含的单元测试**。

首先，我们将创建一个使用 Spring Boot 的基本 Camel 应用程序。然后，我们将看看如何使用 Camel 的 Spring 测试支持 API 和 JUnit 5 来测试我们的应用程序。

## **2. 依赖项**

假设我们的项目已经设置并配置为与 Spring Boot 和 Camel 一起工作。

然后，我们需要在我们的 _pom.xml_ 中添加 _camel-test-spring-junit5_ 依赖项：

```
`<dependency>`
    `<groupId>`org.apache.camel`</groupId>`
    `<artifactId>`camel-test-spring-junit5`</artifactId>`
    `<version>`4.3.0`</version>`
    `<scope>`test`</scope>`
`</dependency>`
```

顾名思义，这个依赖项专门用于我们的单元测试。

## **3. 定义一个简单的 Camel Spring Boot 应用程序**

在整个教程中，我们的测试重点将是一个简单的 Apache Camel Spring Boot 应用程序。

所以让我们从定义我们的应用程序入口点开始：

```
@SpringBootApplication
public class GreetingsFileSpringApplication {

    public static void main(String[] args) {
        SpringApplication.run(GreetingsFileSpringApplication.class, args);
    }
}
```

正如我们所看到的，这是一个标准的 Spring Boot 应用程序。

### **3.1 创建路由**

接下来，我们将定义一个相当基础的路由：

```
@Component
public class GreetingsFileRouter extends RouteBuilder {

    @Override
    public void configure() throws Exception {

        from("direct:start")
          .routeId("greetings-route")
          .setBody(constant("Hello Baeldung Readers!"))
          .to("file:output");
    }
}
```

快速回顾一下，Apache Camel 中的路由是一个基本构建块，通常由 Camel 按顺序执行的一系列步骤组成，用于消费和处理消息。

正如我们简单示例中所看到的，我们配置我们的路由从称为 _start_ 的直接端点消费消息。

然后，**我们将消息体设置为包含字符串 _Hello Baeldung Readers!_ 并使用文件组件将我们的消息交换内容写入名为 _output_ 的文件目录**。

我们还为我们的路由设置了一个名为 _greetings-route_ 的 ID。在路由中使用 ID 通常被认为是一种良好的实践，可以帮助我们在测试路由时。

### **3.2 运行我们的应用程序**

在本节的最后，如果我们运行我们的应用程序并向我们的直接消费者端点发送消息，我们应该会看到我们的问候文本在我们的输出目录中的一个文件里。如果我们没有指定文件名，Camel 将为我们创建一个：

```
$ cat output/D97099B6B2958D2-0000000000000000
Hello Baeldung Readers!
```

## **4. 关于测试的说明**

通常，在编写清晰的测试时，我们不应该依赖我们可能无法控制或可能突然停止工作的外部服务或文件系统。这可能对我们的测试结果产生不利影响。

我们也不想为我们的单元测试特别编写代码。**幸运的是，Camel 有一套专门用于测试的扩展和 API**。所以我们可以将这看作是一种测试工具包。

这个工具包通过发送消息到路由并检查消息是否按预期接收，使测试我们的 Camel 应用程序变得更容易。

## **5. 使用 _@MockEndpoints_ 进行测试**

考虑到上一节的内容，让我们继续编写我们的第一个单元测试：

```
@SpringBootTest
@CamelSpringBootTest
@MockEndpoints("file:output")
class GreetingsFileRouterUnitTest {

    @Autowired
    private ProducerTemplate template;

    @EndpointInject("mock:file:output")
    private MockEndpoint mock;

    @Test
    void whenSendBody_thenGreetingReceivedSuccessfully() throws InterruptedException {
        mock.expectedBodiesReceived("Hello Baeldung Readers!");
        template.sendBody("direct:start", null);
        mock.assertIsSatisfied();
    }
}
```

让我们浏览一下我们测试的关键部分。

首先，我们通过三个注解来装饰我们的测试类：

- _@SpringBootTest_ 注解将确保我们的测试引导 Spring 应用程序上下文
- 我们还使用 _@CamelSpringBootRunner,_ 它为我们基于 Boot 的测试带来了基于 Spring 的 Camel 测试支持
- **最后，我们添加 _@MockEndpoints_ 注解，它告诉 Camel 我们想要为哪些端点制作模拟**

接下来，我们自动装配一个 _ProducerTemplate_ 对象，这是一个接口，允许我们向端点发送消息交换。

另一个关键组件是 _MockEndpoint_，我们使用 _@EndpointInject_ 进行注入。**使用这个注解告诉 Camel 当路由开始时，我们想要注入我们的模拟端点。**

现在我们已经准备好了所有的测试设置，我们可以编写我们的测试，它由三个步骤组成：

- 首先，让我们设置一个期望，我们的模拟端点将接收给定的消息体
- 然后我们将使用我们的模板向 _direct:start_ 端点发送消息。注意，我们将发送一个 _null_ 消息体，因为我们的路由不操作传入的消息体
- 作为我们测试的结论，**我们使用 _assertIsSatisfied_ 方法来验证我们对模拟端点的初始期望是否已经满足**

这证实了我们的测试工作正常。太棒了！我们现在有了一种使用 Camel 测试支持工具编写自包含、独立的单元测试的方法。

## **6. 结论**

在本文中，我们学习了如何在 Spring Boot 中测试我们的 Apache Camel 路由。首先，我们学习了如何使用 Spring Boot 创建一个带有一条路由的简单 Camel 应用程序。

然后学习了使用 Apache Camel 内置测试支持项目中可用的一些特性来测试我们的路由的推荐方法。

像往常一样，文章的完整源代码可以在 GitHub 上找到。抱歉，由于篇幅限制，翻译没有一次性完成。以下是剩余部分的翻译：

## **6. 结论**

在本文中，我们学习了如何在 Spring Boot 中测试我们的 Apache Camel 路由。首先，我们学习了如何使用 Spring Boot 创建一个带有一条路由的简单 Camel 应用程序。

然后，我们学习了使用 Apache Camel 内置测试支持项目中的一些特性来测试我们的路由的推荐方法。

如往常一样，文章的完整源代码可以在 GitHub 上找到。

![img](https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg)![img](https://secure.gravatar.com/avatar/66d236ad2fbffe8cfd463ebd2b4a43c0?s=50&r=g)![img](https://secure.gravatar.com/avatar/db9b6e888453bec33b0a1b1522bae628?s=50&r=g)![img](https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png)![img](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg)![img](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png)

OK