---
date: 2022-04-01
category:
  - Spring Boot
  - AWS Lambda
tag:
  - Serverless
  - AWS
  - Deployment
head:
  - - meta
    - name: keywords
      content: Spring Boot, AWS Lambda, Serverless, Deployment, Java
---
# 在AWS Lambda上运行Spring Boot应用程序

在本教程中，我们将探讨如何使用无服务器应用模型（Serverless Application Model，SAM）框架将Spring Boot应用程序部署到AWS Lambda上。

我们可能会发现这种方法对于将现有的API服务器迁移到无服务器非常有用。

通过这样做，我们可以利用AWS Lambda的可扩展性和按执行付费的定价模型，以高效且成本效益的方式运行我们的应用程序。

AWS Lambda是由Amazon Web Services（AWS）提供的无服务器计算服务。它允许我们在不需要提供或管理服务器的情况下运行我们的代码。

Lambda函数与传统服务器之间的一个关键区别在于**Lambda函数是事件驱动的，并且生命周期非常短**。

与像服务器一样持续运行不同，Lambda函数只在响应特定事件时才运行，例如API请求、队列中的消息或S3中的文件上传。

我们应该注意，Lambda在处理第一个请求时需要启动时间。这被称为“冷启动”。

如果短时间内下一个请求到来，可能会使用相同的Lambda运行时，这被称为“热启动”。如果有多个请求同时到达，会启动多个Lambda运行时。

由于**Spring Boot的启动时间相对较长**，与Lambda理想的毫秒级启动时间相比，我们将讨论这如何影响性能。

让我们通过修改_pom.xml_并添加一些配置来迁移现有的Spring Boot项目。

支持的Spring Boot版本是2.2.x、2.3.x、2.4.x、2.5.x、2.6.x和2.7.x。

### 3.1. 示例Spring Boot API
我们的应用程序由一个简单的API组成，它处理对_api/v1/users_端点的任何_GET_请求：

```java
@RestController
@RequestMapping("/api/v1/")
public class ProfileController {

    @GetMapping(value = "users", produces = MediaType.APPLICATION_JSON_VALUE)
    public List`<User>` getUser() {
        return List.of(new User("John", "Doe", "john.doe@baeldung.com"),
                       new User("John", "Doe", "john.doe-2@baeldung.com"));
    }
}
```

响应的是一系列_User_对象：

```java
public class User {

    private String name;
    private String surname;
    private String emailAddress;

    // 标准构造函数，getter和setter
}
```

让我们启动应用程序并调用API：

```shell
$ java -jar app.jar
$ curl -X GET http://localhost:8080/api/v1/users -H "Content-Type: application/json"
```

API响应是：

```json
[
   {
      "name":"John",
      "surname":"Doe",
      "email":"john.doe@baeldung.com"
   },
   {
      "name":"John",
      "surname":"Doe",
      "email":"john.doe-2@baeldung.com"
   }
]
```

### 3.2. 通过Maven将Spring Boot应用程序转换为Lambda
为了在Lambda上运行我们的应用程序，让我们添加_aws-serverless-java-container-springboot2_依赖到我们的_pom.xml_文件：

```xml
`<dependency>`
    ``<groupId>``com.amazonaws.serverless``</groupId>``
    ``<artifactId>``aws-serverless-java-container-springboot2``</artifactId>``
    ``<version>``${springboot2.aws.version}``</version>``
`</dependency>`
```

然后，我们将添加_maven-shade-plugin_并移除_spring-boot-maven-plugin_。

Maven Shade插件用于创建一个阴影（或超级）JAR文件。**一个阴影JAR文件是一个自包含的可执行JAR文件，它将所有依赖项包含在JAR文件本身中，以便它可以独立运行**：

```xml
`<plugin>`
    ``<groupId>``org.apache.maven.plugins``</groupId>``
    ``<artifactId>``maven-shade-plugin``</artifactId>``
    ``<version>``3.3.0``</version>``
    ``<configuration>``
        `<createDependencyReducedPom>`false`</createDependencyReducedPom>`
    ``</configuration>``
    `<executions>`
        `<execution>`
            `<phase>`package`</phase>`
            `<goals>`
                `<goal>`shade`</goal>`
            `</goals>`
            ``<configuration>``
                `<artifactSet>`
                    `<excludes>`
                        `<exclude>`org.apache.tomcat.embed:*`</exclude>`
                    `</excludes>`
                `</artifactSet>`
            ``</configuration>``
        `</execution>`
    `</executions>`
`</plugin>`
```

总的来说，此配置将在Maven构建的打包阶段生成一个阴影JAR文件。

JAR文件将包括Spring Boot通常会打包的所有类和资源，除了Tomcat的那些。我们不需要为AWS Lambda使用嵌入式Web容器。

## 4. Lambda处理器
下一步是创建一个实现_RequestHandler_的类。

**_RequestHandler_是一个定义了单个方法_handleRequest_的接口**。根据我们正在构建的Lambda的类型，有几种不同的处理请求的方式。

在这种情况下，我们正在处理来自API Gateway的请求，所以我们可以使用_RequestHandler``````<AwsProxyRequest, AwsProxyResponse>``````_版本，其中输入是API Gateway请求，响应是API Gateway响应。

由AWS提供的Spring Boot无服务器库为我们提供了一个特殊的_SpringBootLambdaContainerHandler_类，它用于通过Spring处理API调用，从而使Spring Boot API服务器代码库表现得像Lambda。

### 4.1. 启动时间
我们应该注意，在AWS Lambda中，**初始化阶段的时间限制为10秒**。

如果我们的应用程序启动时间超过这个时间限制，AWS Lambda将超时并尝试启动一个新的Lambda运行时。

根据我们的Spring Boot应用程序启动速度的快慢，我们可以选择两种初始化Lambda处理器的方式：

- 同步 – 我们的应用程序启动时间远小于时间限制
- 异步 – 我们的应用程序启动时间可能较长

### 4.2. 同步初始化
让我们在我们的Spring Boot项目中定义一个新的处理器：

```java
public class LambdaHandler implements RequestHandler``````<AwsProxyRequest, AwsProxyResponse>`````` {
    private static SpringBootLambdaContainerHandler``````<AwsProxyRequest, AwsProxyResponse>`````` handler;

    static {
        try {
            handler = SpringBootLambdaContainerHandler.getAwsProxyHandler(Application.class); 
        } catch (ContainerInitializationException ex){
            throw new RuntimeException("Unable to load spring boot application",ex); 
        }
    }

    @Override
    public AwsProxyResponse handleRequest(AwsProxyRequest input, Context context) {
        return handler.proxy(input, context);
    }
}
```

我们使用_SpringBootLambdaContainerHandler_来处理API Gateway请求，并通过我们的应用程序上下文传递它们。我们在_LambaHandler_类的静态构造函数中初始化此处理器，并从_handleRequest_函数调用它。

**然后处理器调用Spring Boot应用程序中的适当方法来处理请求**并生成响应。最后，它将响应返回给Lambda运行时，以便传回API Gateway。

让我们通过Lambda处理器调用我们的API：

```java
@Test
void whenTheUsersPathIsInvokedViaLambda_thenShouldReturnAList() throws IOException {
    LambdaHandler lambdaHandler = new LambdaHandler();
    AwsProxyRequest req = new AwsProxyRequestBuilder("/api/v1/users", "GET").build();
    AwsProxyResponse resp = lambdaHandler.handleRequest(req, lambdaContext);
    Assertions.assertNotNull(resp.getBody());
    Assertions.assertEquals(200, resp.getStatusCode());
}
```

### 4.3. 异步初始化
有时Spring Boot应用程序启动可能较慢。这是因为，在启动阶段，Spring引擎构建其上下文，扫描并初始化代码库中的所有bean。

这个过程可能会影响启动时间，并在无服务器环境中造成许多问题。

为了解决这个问题，我们可以定义一个新的处理器：

```java
public class AsynchronousLambdaHandler implements RequestHandler``````<AwsProxyRequest, AwsProxyResponse>`````` {
    private SpringBootLambdaContainerHandler``````<AwsProxyRequest, AwsProxyResponse>`````` handler;

    public AsynchronousLambdaHandler() throws ContainerInitializationException {
        handler = (SpringBootLambdaContainerHandler``````<AwsProxyRequest, AwsProxyResponse>``````)
          new SpringBootProxyHandlerBuilder()
            .springBootApplication(Application.class)
            .asyncInit()
            .buildAndInitialize();
    }

    @Override
    public AwsProxyResponse handleRequest(AwsProxyRequest input, Context context) {
        return handler.proxy(input, context);
    }
}
```

这个方法与前一个类似。在这种情况下，_SpringBootLambdaContainerHandler_是在请求处理器的对象构造函数中构建的，而不是静态构造函数。因此，它在Lambda启动的不同阶段执行。

## 5. 部署应用程序
AWS SAM（Serverless Application Model）是一个用于在AWS上构建无服务器应用程序的开源框架。

在为我们的Spring Boot应用程序定义了Lambda处理器之后，我们需要准备所有组件，使用SAM进行部署。

### 5.1. SAM模板
**SAM模板（SAM YAML）是一个YAML格式的文件，定义了部署无服务器应用程序所需的AWS资源**。基本上，它提供了一种声明性的方式来指定我们无服务器应用程序的配置。

所以，让我们定义我们的_template.yaml_：

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Transform: AWS::Serverless-2016-10-31

Globals:
  Function:
    Timeout: 30

Resources:
  ProfileApiFunction:
    Type: AWS::Serverless::Function
    Properties:
      CodeUri: .
      Handler: com.baeldung.aws.handler.LambdaHandler::handleRequest
      Runtime: java11
      AutoPublishAlias: production
      SnapStart:
        ApplyOn: PublishedVersions
      Architectures:
        - x86_64
      MemorySize: 2048
      Environment:
        Variables:
          JAVA_TOOL_OPTIONS: -XX:+TieredCompilation -XX:TieredStopAtLevel=1
      Events:
        HelloWorld:
          Type: Api
          Properties:
            Path: /{proxy+}
            Method: ANY
```

让我们讨论一下我们配置中的一些字段：

- _type_ – 表示这是一个使用_AWS::Serverless::Function_资源类型定义的AWS Lambda函数。
- _CodeUri_ – 指定函数代码的位置。
- _AutoPublishAlias_ – 指定AWS Lambda在自动发布函数新版本时应使用的别名。
- _Handler_ – 指定Lambda处理器类。
- _Events_ – 指定触发Lambda函数的事件。
- _Type_ – 指定这是一个_Api_事件源。
- _Properties_ – 对于API事件，这定义了API Gateway应该响应的HTTP方法和路径。

### 5.2. SAM部署
是时候将我们的应用程序作为AWS Lambda部署了。

第一步是下载并安装AWS CLI，然后是AWS SAM CLI。

让我们在_path_上运行AWS SAM CLI，该路径上存在_template.yaml_，并执行命令：

```shell
$ sam build
```

当我们运行这个命令时，AWS SAM CLI将把我们的Lambda函数的源代码和依赖项打包和构建成一个ZIP文件，作为我们的部署包。

让我们本地部署我们的应用程序：

```shell
$ sam local start-api
```

接下来，让我们通过_sam local_触发我们的Spring Boot服务，当它运行时：

```shell
$ curl localhost:3000/api/v1/users
```

API响应与之前相同：

```json
[
   {
      "name":"John",
      "surname":"Doe",
      "email":"john.doe@baeldung.com"
   },
   {
      "name":"John",
      "surname":"Doe",
      "email":"john.doe-2@baeldung.com"
   }
]
```

我们也可以将其部署到AWS：

```shell
$ sam deploy
```

## 6. 在Lambda中使用Spring的限制
尽管Spring是一个强大且灵活的框架，用于构建复杂且可扩展的应用程序，但它并不总是Lambda环境中的最佳选择。

主要原因是**Lambda旨在成为小的、单一目的的函数，它们能够快速高效地执行**。

### 6.1. 冷启动
AWS Lambda函数的冷启动时间是在处理事件之前初始化函数环境所需的时间。

有几个因素可能影响Lambda函数的冷启动性能：

- 包大小 – 更大的包大小可能导致更长的初始化时间，并导致更慢的冷启动。
- 初始化时间 – Spring框架初始化并设置应用程序上下文所需的时间。

  这包括初始化任何依赖项，如数据库连接、HTTP客户端或缓存框架。

- 自定义初始化逻辑 – 重要的是要最小化自定义初始化逻辑的数量，并确保它针对冷启动进行了优化。
**我们可以使用Lambda SnapStart来提高我们的启动时间**。

### 6.2. 数据库连接池
在AWS Lambda这样的无服务器环境中，函数按需执行，维护连接池可能具有挑战性。

**当事件触发Lambda时，AWS Lambda引擎可以创建应用程序的新实例**。在请求之间，运行时被暂停或可能被终止。

许多连接池持有打开的连接。这可能导致在热启动后重用池时出现混淆或错误，并且可能导致某些数据库引擎的资源泄漏。简而言之，标准连接池依赖于服务器持续运行并维护连接。

为了解决这个问题，AWS提供了一个名为RDS Proxy的解决方案，它为Lambda函数提供了连接池服务。

通过使用RDS Proxy，Lambda函数可以连接到数据库，而无需维护自己的连接池。

## 7. 结论
在本文中，我们学习了如何将现有的Spring Boot API应用程序转换为AWS Lambda。

我们查看了AWS提供的帮助库。我们还考虑了Spring Boot的较慢启动时间可能如何影响我们的设置方式。

然后我们查看了如何使用SAM CLI部署Lambda并进行测试。

如往常一样，示例的完整源代码可以在GitHub上找到。

![img](https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg)![img](https://secure.gravatar.com/avatar/dc417739e22ae675b0e1f7012bbddaa5?s=50&r=g)![img](https://secure.gravatar.com/avatar/6c3babf3d6ea5d49c2bc4e7957870d75?s=50&r=g)![img](https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png)![img](https://www.baeldung.com/wp-content/uploads/2018/07/Microservice-BookCover-1.png)![img](https://www.baeldung.com/wp-content/uploads/2018/07/MicroserviceSpring-Icon.png)

OK