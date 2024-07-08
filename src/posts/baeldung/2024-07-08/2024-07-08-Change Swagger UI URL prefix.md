---
date: 2024-07-08
category:
  - Spring Boot
  - Swagger
tag:
  - Swagger-UI
  - URL Prefix
head:
  - - meta
    - name: keywords
      content: Spring Boot, Swagger, Swagger-UI, URL Prefix, REST API, Springfox, SpringDoc
---
# 修改Swagger-UI URL前缀 | Baeldung

## 1. 概述

作为优秀的开发者，我们知道文档对于构建REST API至关重要，因为它帮助API的用户无缝工作。如今，大多数Java开发者都在使用Spring Boot。截至今日，有两种工具可以通过Springfox和SpringDoc简化Swagger API文档的生成和维护。

在本教程中，**我们将讨论如何通过这些工具默认提供的Swagger-UI URL前缀进行修改。**

## 2. 使用Springdoc更改Swagger UI URL前缀

首先，我们来查看如何使用OpenAPI 3.0设置REST API文档。

根据上述文章，我们需要添加SpringDoc的依赖项：

```
``<dependency>``
   ``<groupId>``org.springdoc``</groupId>``
   ``<artifactId>``springdoc-openapi-starter-webmvc-ui``</artifactId>``
   ``<version>``2.0.2``</version>``
``</dependency>``
```

swagger-ui的默认URL将是_http://localhost:8080/swagger-ui.html_。

现在让我们看看两种自定义swagger-UI URL的方法。我们从_/myproject_开始。

### 2.1. 使用_application.properties_文件

由于我们已经熟悉了Spring中的许多不同属性，我们需要在_application.properties_文件中添加以下属性：

```
springdoc.swagger-ui.disable-swagger-default-url=true
springdoc.swagger-ui.path=/myproject
```

### 2.2. 使用配置类

我们还可以在配置文件中进行此更改：

```
@Component
public class SwaggerConfiguration implements ApplicationListener`<ApplicationPreparedEvent>` {

    @Override
    public void onApplicationEvent(final ApplicationPreparedEvent event) {
        ConfigurableEnvironment environment = event.getApplicationContext().getEnvironment();
        Properties props = new Properties();
        props.put("springdoc.swagger-ui.path", swaggerPath());
        environment.getPropertySources()
          .addFirst(new PropertiesPropertySource("programmatically", props));
    }

    private String swaggerPath() {
        return "/myproject"; // TODO: 在这里实现你的逻辑。
    }
}
```

在这种情况下，我们需要在应用程序启动之前注册监听器：

```
public static void main(String[] args) {
    SpringApplication application = new SpringApplication(SampleApplication.class);
    application.addListeners(new SwaggerConfiguration());
    application.run(args);
}
```

## 3. 使用Springfox更改Swagger UI URL前缀

我们可以查看如何通过设置示例和描述来设置Swagger，并使用Springfox在Spring REST API中设置Swagger 2。

首先，根据上述文章，我们需要添加Springfox的依赖项：

```
``<dependency>``
    ``<groupId>``io.springfox``</groupId>``
    ``<artifactId>``springfox-swagger2``</artifactId>``
    ``<version>``3.0.0``</version>``
``</dependency>``
```

现在假设我们想要将此URL更改为http://localhost:8080/myproject/swagger-ui/index.html。让我们回顾两种可以帮助我们实现这一点的方法。

### 3.1. 使用_application.properties_文件

类似于上述SpringDoc的示例，在_application.properties_文件中添加以下属性将有助于我们成功更改它：

```
springfox.documentation.swagger-ui.base-url=myproject
```

### 3.2. 使用配置中的_Docket_ Bean

```
@Bean
public Docket api() {
    return new Docket(DocumentationType.SWAGGER_2)
      .select()
      .apis(RequestHandlerSelectors.any())
      .paths(PathSelectors.any())
      .build();
}

@Override
public void addViewControllers(ViewControllerRegistry registry) {
   registry.addRedirectViewController("/myproject", "/");
}
```

## 4. 添加重定向控制器

我们还可以向API端点添加重定向逻辑。在这种情况下，无论我们使用SpringDoc还是Springfox：

```
@Controller
public class SwaggerController {

@RequestMapping("/myproject")
public String getRedirectUrl() {
       return "redirect:swagger-ui/";
}
```

## 5. 结论

在本文中，我们学习了如何使用Springfox和SpringDoc更改REST API文档的默认swagger-ui URL。

本文的Springfox完整代码示例可以在GitHub上找到，而SpringDoc的代码示例也可以在这里找到。抱歉，由于原文内容较长，我将翻译剩余部分：

## 5. 结论

在本文中，我们学习了如何使用Springfox和SpringDoc更改REST API文档的默认swagger-ui URL。

Springfox的完整代码示例可以在GitHub上找到，SpringDoc的代码示例也可以在GitHub上找到。

![img](https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg)![img](https://secure.gravatar.com/avatar/dc417739e22ae675b0e1f7012bbddaa5?s=50&r=g)![img](https://secure.gravatar.com/avatar/74d85e58eea7ae3bd05956bff5cb1b49?s=50&r=g)![img](https://wp-content/uploads/2022/04/announcement-icon.png)![img](https://wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg)![img](https://wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png)

OK