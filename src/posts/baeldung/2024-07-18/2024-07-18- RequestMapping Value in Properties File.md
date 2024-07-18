---
date: 2022-04-01
category:
  - Spring
  - REST
tag:
  - Spring MVC
  - RequestMapping
head:
  - - meta
    - name: keywords
      content: Spring MVC, RequestMapping, Properties File
------
# 在属性文件中设置@RequestMapping值

## 1. 概述

在本教程中，**我们将探讨如何在属性文件中设置_@RequestMapping_的值**。同时，我们将通过一个实际示例来解释所有必要的配置。

首先，让我们定义一个基本的_@RequestMapping_及其配置。

## 2. @RequestMapping 基础

首先，**我们将创建并使用_@RequestMapping_注解我们的类_WelcomeController_以映射web请求**。这个类将分配我们的处理器方法_getWelcomeMessage_()。

那么，让我们定义它：

```java
@RestController
@RequestMapping("/welcome")
public class WelcomeController {

   @GetMapping
   public String getWelcomeMessage() {
       return "Welcome to Baeldung!";
   }
}
```

另外，**值得注意的是我们将使用_@GetMapping_注解_getWelcomeMessage_()以映射仅GET请求**。正如我们所看到的，我们使用了硬编码的字符串作为路径，静态地指示我们想要访问的路径。通过这种配置，我们可以完美地访问我们感兴趣的资源，如下所示：

```bash
curl http://localhost:9006/welcome
> Welcome to Baeldung!
```

但是，如果我们想要使路径依赖于配置参数呢？正如我们接下来将看到的，我们可以利用_application.properties_。

首先，正如我们在文档中看到的，**_@RequestMapping_注解中的模式支持${…}占位符，针对本地属性和/或系统属性和环境变量**。这样，我们可以将我们的属性文件链接到我们的控制器。

一方面，我们需要创建属性文件本身。**我们将把它放在_resources_文件夹中，并将其命名为_application.properties_**。然后，我们需要创建我们选择的属性名称。在我们的案例中，我们将设置名称_welcome-controller.path_并将我们想要作为请求端点的值设置为该值。现在我们的_application.properties_看起来像这样：

```properties
welcome-controller.path=welcome
```

另一方面，**我们必须修改我们在_@RequestMapping_中静态建立的路径，以便它读取我们创建的新属性**：

```java
@RestController
@RequestMapping("/${welcome-controller.path}")
public class WelcomeController {
    @GetMapping
    public String getWelcomeMessage() {
        return "Welcome to Baeldung!";
    }
}
```

这样，Spring就能够映射端点的值，当用户访问这个URL时，这个方法将负责处理它。我们可以在下面看到如何使用相同的请求显示相同的消息：

```bash
curl http://localhost:9006/welcome
> Welcome to Baeldung!
```

## 4. 结论

在这篇简短的文章中，**我们学会了如何在属性文件中设置_@RequestMapping_的值**。此外，我们创建了一个完全功能的示例，帮助我们理解所解释的概念。

文章的完整源代码可以在GitHub上找到。