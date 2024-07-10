---
date: 2023-01-01
category:
  - Spring MVC
  - Web Development
tag:
  - Spring MVC
  - Root URL Mapping
head:
  - - meta
    - name: keywords
      content: Spring MVC, Root URL Mapping, Web Development
------
# Spring MVC – 将根URL映射到页面

本教程将展示如何在Spring MVC中将根URL映射到一个页面。

首先，我们将查看Spring MVC的默认行为。然后，我们将讨论这种行为被抑制的场景。最后，我们将学习提供自定义映射的方法。

## 2. 项目设置

我们可以使用Spring Initializr生成项目，并添加Spring Web Starter依赖。

如果手动添加依赖，我们需要在_pom.xml_文件中添加以下内容：

```xml
`<dependency>`
    `<groupId>`org.springframework.boot`</groupId>`
    `<artifactId>`spring-boot-starter-web`</artifactId>`
`</dependency>`
```

### 2.1. 创建索引页面

让我们在_src/main/resources/templates_文件夹中创建一个页面。我们将这个页面命名为_index.html_：

```html
`<!DOCTYPE html>`
`<html lang="en">`
`<head>`
    `<meta charset="UTF-8">`
    `<title>`索引页面`</title>`
`</head>`
`<body>`
    `<h1>`你好，世界！`</h1>`
`</body>`
`</html>`
```

### 2.2. 默认行为

让我们运行应用程序并查看Spring MVC的默认行为。

一旦应用程序启动并运行，让我们导航到根URL：_http://localhost:8080/_：

![img](https://www.baeldung.com/wp-content/uploads/2023/01/index-page-e1673539470769.png)

如我们所见，索引页面在没有任何映射需求的情况下显示。

## 3. 更改默认行为

让我们看看默认行为被抑制的场景。

### 3.1. @EnableWebMvc

让我们在_RootMappingApplication_类中添加_@EnableWebMvc_注解：

```java
@SpringBootApplication
@EnableWebMvc
public class RootMappingApplication {
    public static void main(String[] args) {
        SpringApplication.run(RootMappingApplication.class, args);
    }
}
```

让我们运行应用程序并导航到根URL：_http://localhost:8080/_。这次，我们得到了一个错误：

![img](https://www.baeldung.com/wp-content/uploads/2023/01/404-error-page-1-e1673539498205.png)

**这是因为_@EnableWebMvc_注解禁用了Spring Boot自动进行的Web应用程序配置。**

为了解决这个问题，我们需要提供我们自己的自定义映射。让我们看看不同的方法。

## 4. 自定义映射

让我们看看提供自定义映射的不同方法。

### 4.1. 使用控制器

一种提供路径和文件映射的方法是使用控制器。

让我们先创建一个控制器类：

```java
@Controller
public class RootController {
    @GetMapping("/")
    public String index() {
        return "index";
    }
}
```

这个控制器类有一个映射到“/”路径的单个方法。该方法简单地返回字符串“_index_”。**在解释返回值时，Spring MVC会在_src/main/resources/templates_文件夹中查找同名的模板。**

如果我们运行应用程序并导航到根URL：_http://localhost:8080/_，我们将看到索引页面被显示。

这是一种提供自定义映射的简单方法。当我们只有一个页面需要映射时，使用这种方法是很好的。然而，如果我们有多个页面需要映射，这种方法可能会变得繁琐。

让我们看看一种更有效的提供自定义映射的方法。

### 4.2. 使用_WebMvcConfigurer_

另一种提供路径和文件映射的方法是使用_WebMvcConfigurer_接口。

让我们先创建一个配置类：

```java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/").setViewName("index");
    }
}
```

这个配置类实现了_WebMvcConfigurer_接口。**它覆盖了_addViewControllers()_方法以添加一个视图控制器。视图控制器映射到“/”路径并返回“_index_”视图。**

再次，如果我们运行应用程序并导航到根URL：_http://localhost:8080/_，我们将看到索引页面。

我们应该注意到**如果控制器和配置都为同一路径提供映射，控制器优先。**

## 5. 结论

在本文中，我们看到了如何在Spring MVC中将根URL映射到一个页面。我们讨论了Spring MVC的默认行为以及如何通过自定义配置来覆盖它。

我们还看了两种提供自定义映射的方法——使用控制器和使用_WebMvcConfigurer_接口。

如往常一样，本文中使用的所有代码示例都可以在GitHub上找到。