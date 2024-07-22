---
date: 2022-02-01
category:
  - Spring Boot
  - Swagger
tag:
  - SpringFox
  - Swagger-UI
  - BasicErrorController
head:
  - - meta
    - name: keywords
      content: Spring Boot, Swagger, SpringFox, Swagger-UI, BasicErrorController
------
# 在SpringFox Swagger-UI中移除BasicErrorController

## 1. 概述

在本教程中，我们将学习多种方法来配置Spring Boot应用程序中的Swagger，以隐藏由_BasicErrorController_暴露的路径。

## 2. 目标项目

本文不会涵盖使用Spring Boot和Swagger-UI开始的基本配置。我们可以使用已经配置好的项目，或者按照“使用Spring REST API设置Swagger 2”的指南来创建基本配置。

## 3. 问题

**如果我们的代码包含一个_BasicErrorController_，Swagger默认会将其所有端点也包含在生成的文档中。** 我们需要提供自定义配置来移除不需要的控制器。

例如，假设我们想提供标准_RestController_的API文档：
```java
@RestController
@RequestMapping("good-path")
public class RegularRestController {

   @ApiOperation(value = "此方法用于获取作者名称。")
   @GetMapping("getAuthor")
   public String getAuthor() {
       return "姓名 姓氏";
   }

   // 其他类似方法
}
```

再假设我们的代码中包含一个扩展了_BasicErrorController_的类：
```java
@Component
@RequestMapping("my-error-controller")
public class MyErrorController extends BasicErrorController {
    // 基本构造函数
}
```

我们可以看到_my-error-controller_被包含在生成的文档中： ![img](https://www.baeldung.com/wp-content/uploads/2022/02/swagger.png)

## 4. 解决方案

在本节中，我们将探讨四种不同的方法来从Swagger文档中排除资源。

### 4.1. 使用_basePackage()_排除

**通过指定我们想要记录的控制器的基础包，我们可以排除我们不需要的资源。**
这仅在错误控制器包与标准控制器包不同时有效。使用Spring Boot，我们只需要提供一个_Docket_ Bean：
```java
@Configuration
public class SwaggerConfiguration {

   @Bean
   public Docket api() {
      return new Docket(DocumentationType.SWAGGER_2).apiInfo(apiInfo())
        .select()
        .apis(RequestHandlerSelectors.basePackage("com.baeldung.swaggerconf.controller"))
        .build();
   }
}
```

通过此自定义配置，Swagger将仅在指定的包内检查REST Controller方法。因此，例如，如果我们的_BasicErrorController_定义在包“_com.baeldung.swaggerconf.error_”中，它将不被考虑。

### 4.2. 使用注解排除

**另外，我们也可以指示Swagger只生成带有特定Java注解的类的文档。**
在此示例中，我们将设置为_RestController.class：_
```java
@Bean
public Docket api() {
   return new Docket(DocumentationType.SWAGGER_2).apiInfo(apiInfo())
     .select()
     .apis(RequestHandlerSelectors.withClassAnnotation(RestController.class))
     .build();
}
```

在这种情况下，_BasicErrorController_将被排除在Swagger文档之外，因为它没有被_@RestController_注解装饰。相反，我们想要记录的_RegularRestController_则带有此注解。

### 4.3. 使用路径上的正则表达式排除

另一种方法是**在自定义路径上指定正则表达式。** 在这种情况下，只有映射到“/_good-path”_前缀的资源才会被记录：
```java
@Bean
public Docket api() {
   return new Docket(DocumentationType.SWAGGER_2).apiInfo(apiInfo())
     .select()
     .paths(regex("/good-path/.*"))
     .build();
}
```

### 4.4. 使用_@ApiIgnore_排除

**最后，我们可以使用注解_@ApiIgnore_来排除特定类从Swagger。**
```java
@Component
@RequestMapping("my-error-controller")
@ApiIgnore
public class MyErrorController extends BasicErrorController {
   // 基本构造函数
}
```

## 5. 结论

在本文中，我们展示了四种不同的方法来配置Spring Boot应用程序中的Swagger，以隐藏_BasicErrorController_资源。

如常，完整代码可在GitHub上获取。