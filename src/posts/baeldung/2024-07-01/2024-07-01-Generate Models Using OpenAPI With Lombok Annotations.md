---
date: 2024-01-03
category:
  - Java
  - OpenAPI
  - Lombok
tag:
  - Java
  - Lombok
  - OpenAPI
  - Spring Boot
  - 自动生成模型
head:
  - - meta
    - name: keywords
      content: Java, Lombok, OpenAPI, 自动生成模型, Spring Boot
---
# 使用Lombok注解通过OpenAPI生成模型

Lombok是一个Java库，有助于减少像getter、setter等样板代码。OpenAPI提供了一个属性来自动生成带有Lombok注解的模型。

在本教程中，我们将探讨如何使用OpenAPI代码生成器生成带有Lombok注解的模型。

## 2. 项目设置

首先，让我们启动一个Spring Boot项目，并添加Spring Boot Starter Web和Lombok依赖项：

```xml
```````<dependency>```````
    ````````<groupId>````````org.springframework.boot````````</groupId>````````
    ````````<artifactId>````````spring-boot-starter-web````````</artifactId>````````
    ````````<version>````````3.1.2````````</version>````````
```````</dependency>```````
```````<dependency>```````
    ````````<groupId>````````org.projectlombok````````</groupId>````````
    ````````<artifactId>````````lombok````````</artifactId>````````
    ````````<version>````````1.18.30````````</version>````````
    `<scope>`provided`</scope>`
```````</dependency>```````
```

此外，我们还需要Swagger注解、Gson、Java注解API依赖项等，以防止生成代码中与包相关的错误：

```xml
```````<dependency>```````
    ````````<groupId>````````javax.annotation````````</groupId>````````
    ````````<artifactId>````````javax.annotation-api````````</artifactId>````````
    ````````<version>````````1.3.2````````</version>````````
```````</dependency>```````
```````<dependency>```````
    ````````<groupId>````````com.google.code.gson````````</groupId>````````
    ````````<artifactId>````````gson````````</artifactId>````````
    ````````<version>````````2.10.1````````</version>````````
```````</dependency>```````
```````<dependency>```````
    ````````<groupId>````````io.swagger.core.v3````````</groupId>````````
    ````````<artifactId>````````swagger-annotations````````</artifactId>````````
    ````````<version>````````2.2.19````````</version>````````
```````</dependency>```````
```````<dependency>```````
    ````````<groupId>````````org.openapitools````````</groupId>````````
    ````````<artifactId>````````jackson-databind-nullable````````</artifactId>````````
    ````````<version>````````7.1.0````````</version>````````
```````</dependency>```````
```````<dependency>```````
    ````````<groupId>````````javax.validation````````</groupId>````````
    ````````<artifactId>````````validation-api````````</artifactId>````````
    ````````<version>````````2.0.1.Final````````</version>````````
```````</dependency>```````
```

在下一节中，我们将为名为_Book_的模型创建API规范，然后使用OpenAPI代码生成器生成带有Lombok注解的代码。

## 3. 使用OpenAPI生成模型

OpenAPI的理念是在实际编码开始之前编写API规范。在这里，我们将创建一个规范文件，并根据规范生成模型。

### 3.1. 创建模型规范

首先，让我们在_resources_文件夹中创建一个名为_bookapi.yml_的新文件，以定义_Book_规范：

```yaml
openapi: 3.0.2
info:
  version: 1.0.0
  title: 书店
  license:
    name: MIT
paths:
  /books:
    get:
      tags:
        - book
      summary: 获取所有书籍
      responses:
        200:
          description: 操作成功
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Book'
        404:
          description: 书籍未找到
          content: { }
components:
  schemas:
    Book:
      type: object
      required:
        - id
        - name
        - author
      properties:
        id:
          type: integer
          format: int64
        name:
          type: string
        author:
          type: string
```

在上述规范中，我们定义了具有_id_、_name_和_author_字段的_Book_模式。此外，我们定义了一个端点来获取所有存储的书籍。

### 3.2. 生成带有Lombok注解的模型

在定义了API规范之后，让我们将OpenAPI插件添加到_pom.xml_中，以帮助根据规范生成代码：

```xml
`<plugin>`
    ````````<groupId>````````org.openapitools````````</groupId>````````
    ````````<artifactId>````````openapi-generator-maven-plugin````````</artifactId>````````
    ````````<version>````````7.1.0````````</version>````````
    `<executions>`
        `<execution>`
            `<goals>`
                `<goal>`generate`</goal>`
            `</goals>`
            `<configuration>`
                `<inputSpec>`${project.basedir}/src/main/resources/bookapi.yml`</inputSpec>`
                `<generatorName>`spring`</generatorName>`
                `<configOptions>`
                    `<additionalModelTypeAnnotations>`@lombok.Data @lombok.NoArgsConstructor @lombok.AllArgsConstructor`</additionalModelTypeAnnotations>`
                `</configOptions>`
                `<generateApis>`false`</generateApis>`
                `<generateSupportingFiles>`false`</generateSupportingFiles>`
                `<generateApiDocumentation>`false`</generateApiDocumentation>`
            `</configuration>`
        `</execution>`
    `</executions>`
`</plugin>`
```

在这里，我们指定了插件在生成过程中要检查的规范文件的位置。此外，我们添加了_additionalModelTypeAnnotations_属性，以向模型添加三个Lombok注解。

为了简化，我们禁用了支持文件和API文档的生成。

最后，让我们通过执行Maven _install_命令来生成模型：

```
$ ./mvnw install
```

上述命令在_target_文件夹中生成了一个_Book_模型。

### 3.3. 生成的代码

让我们看看生成的_Book_模型：

```java
@lombok.Data @lombok.NoArgsConstructor @lombok.AllArgsConstructor
@Generated(value = "org.openapitools.codegen.languages.SpringCodegen", date = "2024-01-03T22:22:14.557819500+02:00[Europe/Bucharest]")
public class Book {

    private Long id;

    private String name;

    private String author;

    // ..
}
```

在上述生成的代码中，我们使用插件中的_additionalModelTypeAnnotations_属性定义的三个Lombok注解被添加到了模型类中。

_@Data_注解在编译时帮助生成getter、setter等。_@NoArgsConstructor_生成一个空构造函数，而_@AllArgsConstructor_生成一个接受类中所有字段参数的构造函数。

## 4. 结论

在本文中，我们学习了如何使用OpenAPI代码生成器生成带有Lombok注解的模型。添加_additionalModelTypeAnnotations_属性为我们提供了添加所需Lombok注解的灵活性。

如常，示例的完整源代码可在GitHub上找到。