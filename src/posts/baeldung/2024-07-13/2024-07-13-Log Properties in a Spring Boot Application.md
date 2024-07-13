---
date: 2022-04-01
category:
  - Spring Boot
  - Logging
tag:
  - Spring Boot
  - Logging
  - Properties
head:
  - - meta
    - name: keywords
      content: Spring Boot, Logging, Properties
---
# Spring Boot 应用程序中的日志属性

属性是 Spring Boot 提供的最有用机制之一。它们可以从不同的地方提供，例如专用属性文件、环境变量等。因此，有时查找并记录特定属性非常有用，例如在调试期间。

在这个简短的教程中，我们将看到几种不同的方式来查找并记录 Spring Boot 应用程序中的属性。

首先，我们将创建一个简单的测试应用程序，然后我们将尝试三种不同的方法来记录特定属性。

## 2. 创建测试应用程序

让我们创建一个包含三个自定义属性的简单应用程序。

我们可以使用 Spring Initializr 创建 Spring Boot 应用程序模板。我们将使用 Java 作为语言。我们也可以选择其他选项，例如 Java 版本、项目元数据等。

下一步是向我们的应用程序添加自定义属性。我们将这些属性添加到 _src/main/resources_ 中的一个新的 _application.properties_ 文件：

```
app.name=MyApp
app.description=${app.name} 是一个 Spring Boot 应用程序
bael.property=stagingValue
```

## 3. 使用上下文刷新事件记录属性

在 Spring Boot 应用程序中记录属性的第一种方式是使用 Spring 事件，特别是 _org.springframework.context.event.ContextRefreshedEvent_ 类和相应的 _EventListener_。我们将展示如何记录所有可用属性以及一个更详细的版本，该版本仅打印来自特定文件的属性。

### 3.1. 记录所有属性

让我们从创建一个 bean 和事件监听器方法开始：

```java
@Component
public class AppContextRefreshedEventPropertiesPrinter {

    @EventListener
    public void handleContextRefreshed(ContextRefreshedEvent event) {
        // 事件处理逻辑
    }
}
```

我们使用 _org.springframework.context.event.EventListener_ 注解标记事件监听器方法。当 _ContextRefreshedEvent_ 发生时，Spring 将调用标记的方法。

下一步是从触发的事件中获取 _org.springframework.core.env.ConfigurableEnvironment_ 接口的实例。**_ConfigurableEnvironment_ 接口提供了一个有用的方法 _getPropertySources()_，我们将使用它来获取所有属性源的列表**，例如环境、JVM 或属性文件变量：

```java
ConfigurableEnvironment env = (ConfigurableEnvironment) event.getApplicationContext().getEnvironment();
```

现在让我们看看如何使用它来打印所有属性，不仅仅是来自 _application.properties_ 文件的属性，还包括环境、JVM 变量等：

```java
env.getPropertySources()
    .stream()
    .filter(ps -> ps instanceof MapPropertySource)
    .map(ps -> ((MapPropertySource) ps).getSource().keySet())
    .flatMap(Collection::stream)
    .distinct()
    .sorted()
    .forEach(key -> LOGGER.info("{}={}", key, env.getProperty(key)));
```

首先，我们从可用属性源创建一个 _Stream_。然后，我们使用其 _filter()_ 方法遍历 _org.springframework.core.env.MapPropertySource_ 类的实例的属性源。

顾名思义，该属性源中的属性存储在映射结构中。我们在下一步中使用它，其中我们使用流的 _map()_ 方法来获取属性键的集合。

接下来，我们使用 _Stream_ 的 _flatMap()_ 方法，因为我们想要迭代单个属性键，而不是一组键。我们还想按字母顺序打印唯一属性，而不是重复的属性。

最后一步是记录属性键及其值。

当我们启动应用程序时，我们应该看到从各种来源获取的属性列表：

```
COMMAND_MODE=unix2003
CONSOLE_LOG_CHARSET=UTF-8
...
bael.property=defaultValue
app.name=MyApp
app.description=MyApp is a Spring Boot application
...
java.class.version=52.0
java.runtime.name=OpenJDK Runtime Environment
```

### 3.2. 仅记录来自 _application.properties_ 文件的属性

如果我们想要记录仅在 _application.properties_ 文件中找到的属性，我们可以重用几乎所有之前的代码。我们只需要更改传递给 _filter()_ 方法的 lambda 函数：

```java
env.getPropertySources()
    .stream()
    .filter(ps -> ps instanceof MapPropertySource && ps.getName().contains("application.properties"))
    ...
```

现在，当我们启动应用程序时，我们应该看到以下日志：

```
bael.property=defaultValue
app.name=MyApp
app.description=MyApp is a Spring Boot application
```

## 4. 使用 _Environment_ 接口记录属性

记录属性的另一种方式是使用 _org.springframework.core.env.Environment_ 接口：

```java
@Component
public class EnvironmentPropertiesPrinter {
    @Autowired
    private Environment env;

    @PostConstruct
    public void logApplicationProperties() {
        LOGGER.info("{}={}", "bael.property", env.getProperty("bael.property"));
        LOGGER.info("{}={}", "app.name", env.getProperty("app.name"));
        LOGGER.info("{}={}", "app.description", env.getProperty("app.description"));
    }
}
```

与上下文刷新事件方法相比，唯一的限制是 **我们需要知道属性名称才能获取其值**。环境接口不提供列出所有属性的方法。另一方面，这绝对是一个更短且更简单的技术。

当我们启动应用程序时，我们应该看到与之前相同的输出：

```
bael.property=defaultValue
app.name=MyApp
app.description=MyApp is a Spring Boot application
```

## 5. 使用 Spring Actuator 记录属性

Spring Actuator 是一个非常有用的库，它为我们的应用程序带来了生产就绪的特性。**_/env_ REST 端点返回当前环境属性**。

首先，让我们将 Spring Actuator 库添加到我们的项目中：

```xml
`<dependency>`
    `<groupId>`org.springframework.boot`</groupId>`
    `<artifactId>`spring-boot-starter-actuator`</artifactId>`
    `<version>`3.0.0`</version>`
`</dependency>`
```

接下来，我们需要启用 _/env_ 端点，因为它默认是禁用的。让我们打开 _application.properties_ 并添加以下条目：

```
management.endpoints.web.exposure.include=env
```

现在，我们所要做的就是启动应用程序并转到 _/env_ 端点。在我们的例子中，地址是 _http://localhost:8080/actuator/env._ 我们应该看到一个包含所有环境变量的大量 JSON，包括我们的属性：

```
{
  "activeProfiles": [],
  "propertySources": [
    ...
    {
      "name": "Config resource 'class path resource [application.properties]' via location 'optional:classpath:/' (document #0)",
      "properties": {
        "app.name": {
          "value": "MyApp",
          "origin": "class path resource [application.properties] - 10:10"
        },
        "app.description": {
          "value": "MyApp is a Spring Boot application",
          "origin": "class path resource [application.properties] - 11:17"
        },
        "bael.property": {
          "value": "defaultValue",
          "origin": "class path resource [application.properties] - 13:15"
        }
      }
    }
   ...
  ]
}
```

## 6. 结论

在本文中，我们学习了如何在 Spring Boot 应用程序中记录属性。

首先，我们创建了一个带有三个自定义属性的测试应用程序。然后，我们看到了三种不同的检索和记录所需属性的方式。

如往常一样，本文的完整源代码可在 GitHub 上获取。