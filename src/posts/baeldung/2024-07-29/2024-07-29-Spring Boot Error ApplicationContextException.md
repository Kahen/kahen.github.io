---
date: 2022-04-01
category:
  - Spring Boot
  - Error Handling
tag:
  - ApplicationContextException
  - ServletWebServerFactory
head:
  - - meta
    - name: keywords
      content: Spring Boot, ApplicationContextException, ServletWebServerFactory, error handling
---
# Spring Boot 错误 ApplicationContextException | Baeldung

在本快速教程中，我们将仔细研究 Spring Boot 错误 "ApplicationContextException: 由于缺少 ServletWebServerFactory bean 而无法启动 ServletWebServerApplicationContext"。首先，我们将阐明此错误的背后主要原因。然后，我们将通过一个实际示例深入探讨如何重现它，以及如何解决它。

## 1. 概述

## 2. 可能的原因

首先，让我们尝试理解错误消息的含义。"由于缺少 ServletWebServerFactory bean 而无法启动 ServletWebServerApplicationContext" 已经说明了一切。它简单地告诉我们，在 ApplicationContext 中没有配置 ServletWebServerFactory bean。

当 Spring Boot 无法启动 ServletWebServerApplicationContext 时，通常会出现此错误。为什么？因为 ServletWebServerApplicationContext 使用包含的 ServletWebServerFactory bean 来自举。

通常，Spring Boot 提供 SpringApplication.run 方法来启动 Spring 应用程序。

SpringApplication 类将尝试为我们创建正确的 ApplicationContext，**取决于我们是否正在开发 Web 应用程序**。

例如，用于确定 Web 应用程序的算法来自一些依赖项，如 spring-boot-starter-web。话虽如此，缺少这些依赖项可能是我们错误背后的一个原因。

另一个原因可能是 Spring Boot 入口类中缺少 @SpringBootApplication 注解。

## 3. 重现错误

现在，让我们看一个我们可以产生 Spring Boot 错误的示例。实现这一点的最简单方法是 **创建一个没有 @SpringBootApplication 注解的主类**。

首先，让我们创建一个入口类，并故意忘记用 @SpringBootApplication 注解：

```
public class MainEntryPoint {
    public static void main(String[] args) {
        SpringApplication.run(MainEntryPoint.class, args);
    }
}
```

现在，让我们运行我们的示例 Spring Boot 应用程序，看看会发生什么：

```
22:20:39.134 [main] ERROR o.s.boot.SpringApplication - 应用程序运行失败
org.springframework.context.ApplicationContextException: Unable to start web server; nested exception is org.springframework.context.ApplicationContextException: Unable to start ServletWebServerApplicationContext due to missing ServletWebServerFactory bean.
    ...
    at com.baeldung.applicationcontextexception.MainEntryPoint.main(MainEntryPoint.java:10)
Caused by: org.springframework.context.ApplicationContextException: Unable to start ServletWebServerApplicationContext due to missing ServletWebServerFactory bean.
    at org.springframework.boot.web.servlet.context.ServletWebServerApplicationContext.getWebServerFactory(ServletWebServerApplicationContext.java:209)
    at org.springframework.boot.web.servlet.context.ServletWebServerApplicationContext.createWebServer(ServletWebServerApplicationContext.java:179)
    ...
```

如上所示，我们得到了 "ApplicationContextException: 由于缺少 ServletWebServerFactory bean 而无法启动 ServletWebServerApplicationContext" 错误。

## 4. 修复错误

修复我们错误的简单解决方案是使用 @SpringBootApplication 注解我们的 MainEntryPoint 类。

通过使用此注解，**我们告诉 Spring Boot 自动配置必要的 beans 并将它们注册到上下文中**。

同样，我们可以通过禁用 Web 环境来避免非 Web 应用程序的错误。为此，我们可以使用 spring.main.web-application-type 属性。

在 application.properties 中：

```
spring.main.web-application-type=none
```

同样，在 application.yml 中：

```
spring:
    main:
        web-application-type: none
```

**none 意味着应用程序不应作为 Web 应用程序运行。它用于禁用 Web 服务器**。

请记住，从 Spring Boot 2.0 开始，我们还可以使用 SpringApplicationBuilder 明确定义特定类型的 Web 应用程序：

```
@SpringBootApplication
public class MainClass {
    public static void main(String[] args) {
        new SpringApplicationBuilder(MainClass.class)
          .web(WebApplicationType.NONE)
          .run(args);
    }
}
```

**对于 WebFlux 项目，我们可以使用 WebApplicationType.REACTIVE。** 另一种解决方案可能是排除 spring-webmvc 依赖项。

此依赖项在类路径上的存在告诉 Spring Boot 将项目视为 Servlet 应用程序，而不是响应式 Web 应用程序。因此，Spring Boot 无法启动 ServletWebServerApplicationContext。

## 5. 结论

在这篇短文中，我们详细讨论了什么导致 Spring Boot 在启动时出现此错误："ApplicationContextException: 由于缺少 ServletWebServerFactory bean 而无法启动 ServletWebServerApplicationContext"。

在此过程中，我们通过一个实际示例解释了如何产生错误以及如何修复它。

如往常一样，示例的完整源代码可在 GitHub 上获取。翻译已经完成，以下是剩余部分的翻译：

## 5. 结论

在这篇简短的文章中，我们详细讨论了 Spring Boot 在启动时出现此错误的原因："ApplicationContextException: 由于缺少 ServletWebServerFactory bean 而无法启动 ServletWebServerApplicationContext"。

通过实际示例，我们解释了如何产生这个错误以及如何修复它。

如常，示例的完整源代码可以在 GitHub 上找到。

[给Kimi加油](kimi://action?name=cheer-on-kimi)

![img](https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg) ![img](https://secure.gravatar.com/avatar/9a8dd50c78e0b9d049466e9097331198?s=50&r=g) ![img](https://secure.gravatar.com/avatar/66d236ad2fbffe8cfd463ebd2b4a43c0?s=50&r=g) ![img](https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png) ![img](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg) ![img](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png)

OK