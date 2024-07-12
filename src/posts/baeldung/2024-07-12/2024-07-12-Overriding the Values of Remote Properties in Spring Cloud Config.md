---
date: 2022-07-12
category:
  - Spring Cloud
  - Configuration
tag:
  - Spring Cloud Config
  - Remote Properties
head:
  - - meta
    - name: keywords
      content: Spring Cloud, Configuration, Properties Override
  - - meta
    - name: description
      content: 学习如何在Spring Cloud Config中覆盖远程属性的值。
------
# Spring Cloud Config中覆盖远程属性值的方法

Spring Cloud Config是Spring Cloud项目的一部分。它通过集中式服务管理应用程序配置数据，使其与部署的微服务明显分离。Spring Cloud Config拥有自己的属性管理仓库，并且也与Git、Consul和Eureka等开源项目集成。

在本文中，我们将看到在Spring Cloud Config中覆盖远程属性值的不同方法，Spring从2.4版本开始施加的限制，以及3.0版本带来的变化。本教程将使用spring-boot版本3.2.2。

## 1. 概述

创建一个Spring Config Server以外部化配置文件。它被定位为配置文件的分发服务器。本文中，我们将使用文件系统仓库。

### 2.1 创建配置文件

在application.properties文件中定义的配置与所有客户端应用程序共享。也可以为特定应用程序或给定配置文件定义特定配置。

首先，创建一个包含将提供给我们的客户端应用程序属性的配置文件。我们将我们的客户端应用程序命名为‘baeldung’。在_/resources/config_文件夹内，创建一个_baeldung.properties_文件。

### 2.2 添加属性

让我们向我们的_baeldung.properties_文件添加一些属性，然后我们将在客户端应用程序中使用它们：

```
hello=你好 Jane Doe!
welcome=欢迎 Jane Doe!
```

让我们也在_resources/config/application.properties_文件中添加一个共享属性，Spring将在所有客户端之间共享：

```
shared-property=这个属性在所有客户端应用程序中共享
```

### 2.3 Spring-Boot Config Server应用程序

现在，让我们创建将为我们的配置提供服务的Spring应用程序。我们还需要_spring-cloud-config-server_依赖项：

```
````<dependency>````
    ````<groupId>````org.springframework.cloud````</groupId>````
    ````<artifactId>````spring-cloud-config-server````</artifactId>````
````</dependency>````
```

安装完成后，让我们创建应用程序并启用配置服务器：

```java
@SpringBootApplication
@EnableConfigServer
public class ConfigServer {
    public static void main(String[] args) {
        SpringApplication.run(ConfigServer.class, args);
    }
}
```

让我们在应用程序的_application.properties_文件中添加以下属性，告诉它在端口8081上启动并加载前面定义的配置：

```
server.port=8081
spring.cloud.config.server.native.searchLocations=classpath:/config
```

现在，让我们启动我们的服务器应用程序，激活native配置文件，并允许我们使用文件系统作为配置仓库：

```
mvn spring-boot:run -Dspring-boot.run.profiles=native
```

我们的服务器现在正在运行并提供我们的配置。让我们验证我们的共享属性是否可以访问：

```
$ curl localhost:8081/unknownclient/default
{
  "name": "unknownclient",
  "profiles": [
    "default"
  ],
  "label": null,
  "version": null,
  "state": null,
  "propertySources": [
    {
      "name": "classpath:/config/application.properties",
      "source": {
        "shared-property": "这个属性在所有客户端应用程序中共享"
      }
    }
  ]
}
```

以及特定于我们应用程序的属性：

```
$ curl localhost:8081/baeldung/default
{
  "name": "baeldung",
  "profiles": [
    "default"
  ],
  "label": null,
  "version": null,
  "state": null,
  "propertySources": [
    {
      "name": "classpath:/config/baeldung.properties",
      "source": {
        "hello": "你好 Jane Doe!",
        "welcome": "欢迎 Jane Doe!"
      }
    },
    {
      "name": "classpath:/config/application.properties",
      "source": {
        "shared-property": "这个属性在所有客户端应用程序中共享"
      }
    }
  ]
}
```

我们向服务器指示我们的应用程序名称以及使用的配置文件，_default_。

我们没有禁用_spring.cloud.config.server.accept-empty_属性，默认为true。如果应用程序是未知的(_unknownclient)_，配置服务器仍然返回共享属性。

## 3. 客户端应用程序

现在，让我们创建一个客户端应用程序，在启动时加载由我们的服务器提供的配置。

### 3.1 项目设置和依赖项

让我们在_pom.xml_中添加_spring-cloud-starter-config_依赖项来加载配置，并添加_spring-boot-starter-web_来创建控制器：

```
````<dependency>````
    ````<groupId>````org.springframework.cloud````</groupId>````
    ````<artifactId>````spring-cloud-starter-config````</artifactId>````
````</dependency>````
````<dependency>````
    ````<groupId>````org.springframework.boot````</groupId>````
    ````<artifactId>````spring-boot-starter-web````</artifactId>````
````</dependency>````
```

### 3.2 创建客户端应用程序

接下来，让我们创建将从我们的spring-cloud-config服务器读取配置的客户端应用程序：

```java
@SpringBootApplication
public class Client {
    public static void main(String[] args) {
        SpringApplication.run(Client.class, args);
    }
}
```

### 3.3 获取配置

让我们修改我们的_application.properties_文件，告诉spring-boot从我们的服务器获取其配置：

```
spring.cloud.config.name=baeldung
spring.config.import=optional:configserver:http://localhost:8081
```

我们还指定我们的应用程序名称为‘baeldung’，以利用专用属性。

### 3.4 添加一个简单的控制器

现在让我们创建一个控制器，负责显示我们配置的特定属性，以及共享属性：

```java
@RestController
public class HelloController {

    @Value("${hello}")
    private String hello;

    @Value("${welcome}")
    private String welcome;

    @Value("${shared-property}")
    private String shared;

    @GetMapping("hello")
    public String hello() {
        return this.hello;
    }

    @GetMapping("welcome")
    public String welcome() {
        return this.welcome;
    }

    @GetMapping("shared")
    public String shared() {
        return this.shared;
    }
}
```

现在我们可以导航到这三个URL来验证我们的配置是否被考虑：

```
$ curl http://localhost:8080/hello
你好 Jane Doe!
$ curl http://localhost:8080/welcome
欢迎 Jane Doe!
$ curl http://localhost:8080/shared
这个属性在所有客户端应用程序中共享
```

## 4. 在服务器端覆盖属性

可以通过修改服务器配置来覆盖为特定应用程序定义的属性。

让我们编辑服务器的_resources/application.properties_文件以覆盖_hello_属性：

```
spring.cloud.config.server.overrides.hello=你好 Jane Doe - application.properties!
```

让我们再次测试对_/hello_控制器的调用，以验证过载是否被考虑：

```
$ curl http://localhost:8080/hello
你好 Jane Doe - application.properties!
```

可以在_resources/config/application.properties_文件的共享配置级别添加此过载。**在这种情况下，它将优先于上面定义的一个**。

## 5. 在客户端覆盖属性

自Spring Boot版本2.4以来，不再可能通过客户端应用程序的_application.properties_文件覆盖属性。

### 5.1 使用Spring配置文件

然而，我们可以使用Spring配置文件。**在配置文件中本地定义的属性具有比在服务器级别为应用程序定义的属性更高的优先级**。

让我们为我们的客户端应用程序添加一个_application-development.properties_配置文件，覆盖_hello_属性：

```
hello=你好本地属性!
```

现在，让我们通过激活开发配置文件启动我们的客户端：

```
mvn spring-boot:run -Drun.profiles=development
```

我们现在可以再次测试我们的控制器_/hello_以验证过载是否正确工作：

```
$ curl http://localhost:8080/hello
你好本地属性!
```

### 5.2 使用占位符

我们可以使用占位符来值属性。**因此，服务器将提供一个默认值，客户端定义的属性可以覆盖它**。

让我们从服务器的_resources/application.properties_文件中移除我们的_hello_属性的过载，并修改_config/baeldung.properties_中的一个以包含使用占位符：

```
hello=${app.hello:你好 Jane Doe!}
```

因此，服务器提供了一个默认值，如果客户端声明了一个名为_app.hello_的属性，可以被覆盖。

让我们编辑客户端的_resources/application.properties_文件以添加属性：

```
app.hello=你好，覆盖的本地属性!
```

让我们再次测试我们的控制器hello，以验证过载是否正确被考虑：

```
$ curl http://localhost:8080/hello
你好，覆盖的本地属性!
```

请注意，如果_hello_属性也在配文件中定义，后者将优先。

## 6. 旧版配置

自spring-boot 2.4以来，可以使用“旧版配置”。**这允许我们使用spring-boot 2.4版本之前更改的旧属性管理系统**。

### 6.1 加载外部配置

在2.4版本抱歉，我将完成剩余部分的翻译。

### 6.1 加载外部配置

在2.4版本之前，外部配置的管理是由bootstrap确保的。我们需要_spring-cloud-starter-bootstrap_依赖项。让我们将其添加到我们的_pom.xml_：

```
````<dependency>````
    ````<groupId>````org.springframework.cloud````</groupId>````
    ````<artifactId>````spring-cloud-starter-bootstrap````</artifactId>````
````</dependency>````
```

接下来，我们将在资源文件夹中创建一个_bootstrap.properties_文件，并配置我们服务器的访问URL：

```
spring.cloud.config.name=baeldung
spring.cloud.config.uri=http://localhost:8081
```

让我们在_application.properties_中启用旧版配置：

```
spring.config.use-legacy-processing=true
```

### 6.2 启用覆盖能力

在服务器端，我们需要指出属性覆盖是可能的。让我们以这种方式修改我们的_baeldung.properties_文件：

```
spring.cloud.config.overrideNone=true
```

因此，外部属性将不会优先于在应用程序JAR中定义的那些。

### 6.3 覆盖服务器的属性

我们现在可以通过客户端应用程序的_application.properties_文件覆盖_hello_属性：

```
hello=localproperty
```

让我们测试我们控制器的调用：

```
$ curl http://localhost:8080/hello
localproperty
```

### 6.4 旧版配置的弃用

**自Spring Boot版本3.0以来，不再可能启用旧版配置**。在这种情况下，我们应该使用上面提出的其他方法。

## 7. 结论

在本文中，**我们看到了在Spring Cloud Config中覆盖远程属性值的不同方式**。

可以从服务器覆盖为特定应用程序定义的属性。**也可以使用配置文件或占位符在客户端级别覆盖属性**。我们还看到了如何激活旧版配置以返回旧的属性管理系统。

如往常一样，源代码可在GitHub上找到。

OK