---
date: 2023-05-01
category:
  - Spring Boot
  - Actuator
tag:
  - Spring Boot Actuator
  - Spring Framework
head:
  - - meta
    - name: keywords
      content: Spring Boot Actuator, Spring Framework, Observability, Health Checks

---
# Spring Boot Actuator 在没有 Spring Boot 的情况下

## 1. 概述

Spring Boot 项目提供了创建独立基于 Spring 的应用程序以及支持云原生开发的功能。因此，它是 Spring 框架的一个非常有用的扩展。

有时，我们不想使用 Spring Boot，比如当我们将 Spring 框架集成到 Jakarta EE 应用程序中时，但我们仍然想从所谓的“可观测性”的生产就绪功能中受益，比如度量和健康检查。（我们可以在文章“Spring Boot 3 中的可观测性”中找到详细信息。）

由 Spring Boot Actuator 提供的可观测性特性是 Spring Boot 的一个子项目。在本文中，我们将找出如何将 Actuator 集成到不使用 Spring Boot 的应用程序中。

## 2. 项目配置

当排除 Spring Boot 时，我们需要自己处理应用程序打包和服务器运行时的配置，并且我们需要自己外部化配置。Spring Boot 提供的这些功能对于在我们的基于 Spring 的应用程序中使用 Actuator 并不是必需的。而且，虽然我们绝对需要项目依赖项，但我们不能使用 Spring Boot 的启动器依赖项（在这种情况下是 _spring-boot-starter-actuator_）。除此之外，我们还需要向应用程序上下文中添加必要的 bean。

我们可以手动完成这些操作，也可以使用自动配置。由于 Actuator 的配置相当复杂，并且没有详细记录，**我们应该更倾向于自动配置。这是我们需要从 Spring Boot 中获取的一部分，所以我们不能完全排除 Spring Boot。**

### 2.1. 添加项目依赖项

为了集成 Actuator，**我们需要 _spring-boot-actuator-autoconfigure_ 依赖项：**

```xml
`<dependency>`
    `<groupId>`org.springframework.boot`</groupId>`
    `<artifactId>`spring-boot-actuator-autoconfigure`</artifactId>`
    `<version>`3.0.6`</version>`
`</dependency>`
```

这也会将 _spring-boot-actuator_、 _spring-boot_ 和 _spring-boot-autoconfigure_ 作为传递依赖项包含进来。

### 2.2. 启用自动配置

然后，我们启用自动配置。这可以通过在应用程序的配置中添加 _@EnableAutoConfiguration_ 来轻松完成：

```java
@EnableAutoConfiguration
// ... @ComponentScan, @Import 或任何其他应用程序配置
public class AppConfig {
    // ...
}
```

**我们应该意识到这可能会影响整个应用程序，因为如果类路径中存在其他自动配置类，这也将自动配置框架的其他部分。**

### 2.3. 启用端点

默认情况下，只有健康端点被启用。Actuator 的自动配置类使用配置属性。例如，_WebEndpointAutoConfiguration_ 使用映射到具有 _“management.endpoints.web”_ 前缀的属性的 _WebEndpointProperties_。要启用所有端点，我们需要：

```properties
management.endpoints.web.exposure.include=*
```

属性必须对上下文可用 - 例如，通过将它们放置在 _application.properties_ 文件中，并使用 _@PropertySource_ 注解我们的配置类：

```java
@EnableAutoConfiguration
@PropertySource("classpath:application.properties")
// ... @ComponentScan, @Import 或任何其他应用程序配置
public class AppConfig {
}
```

### 2.4. 测试项目配置

现在，我们准备好调用 actuator 端点了。我们可以通过这个属性启用健康详情：

```properties
management.endpoint.health.show-details=always
```

我们可以实现一个自定义的健康端点：

```java
@Configuration
public class ActuatorConfiguration {

    @Bean
    public HealthIndicator sampleHealthIndicator() {
        return Health.up()
          .withDetail("info", "Sample Health")
          ::build;
    }

}
```

然后对 _“{url_to_project}/actuator/health”_ 的调用将带来如下输出：

![img](https://www.baeldung.com/wp-content/uploads/2023/05/actuator_health.gif)

## 3. 结论

在本教程中，我们看到了如何在非 Boot 应用程序中集成 Spring Boot Actuator。像往常一样，所有代码实现都可以在 GitHub 上找到。

OK