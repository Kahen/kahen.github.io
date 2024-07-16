---
date: 2022-08-01
category:
  - Swagger
  - Postman
tag:
  - API
  - REST
head:
  - - meta
    - name: keywords
      content: Swagger, Postman, API, REST, 导入
---
# 将Swagger API导入Postman

在本文中，我们将看到如何将Swagger API导入Postman。

Swagger是一个开源的规则集、规范和工具集，用于开发和描述REST API。然而，2021年之后，**OpenAPI指的是行业标准规范**，而Swagger指的是工具。

Postman是一个用于构建和使用API的平台。Postman简化了API生命周期的每一步，并简化了协作。我们可以使用**Postman在不编写任何代码的情况下测试我们的API**。

我们可以使用独立应用程序或浏览器扩展。

我们可以与任何现有应用程序一起工作，或者我们可以从头开始创建一个简单的应用程序，该程序公开REST API。

### 4.1. Maven依赖
我们需要添加一些依赖项，以使用Swagger与Swagger-UI：

```xml
``<dependency>``
    ``<groupId>``io.springfox``</groupId>``
    ``<artifactId>``springfox-swagger2``</artifactId>``
    ``<version>``3.0.0``</version>``
``</dependency>``
``<dependency>``
    ``<groupId>``io.springfox``</groupId>``
    ``<artifactId>``springfox-swagger-ui``</artifactId>``
    ``<version>``3.0.0``</version>``
``</dependency>``
```

### 4.2. Java配置
Swagger可以像这样简单配置：

```java
@Configuration
public class SpringFoxConfig {
    @Bean
    public Docket api() {
        return new Docket(DocumentationType.SWAGGER_2)
          .select()
          .apis(RequestHandlerSelectors.any())
          .paths(PathSelectors.any())
          .build();
    }
}
```

当我们启动应用程序时，我们可以**检查Swagger-UI并找到每个控制器的REST API描述**：

![img](https://www.baeldung.com/wp-content/uploads/2022/08/1_Swagger-UI.jpg)

我们还可以看到**为我们的REST API生成的API文档**：

![img](https://www.baeldung.com/wp-content/uploads/2022/08/Swagger-API_Docs.jpg)

## 5. 导入到Postman
有多种方法可以将API导入Postman，但在大多数情况下，它需要**Swagger或OpenAPI定义以某种文本格式可用**（例如，JSON）。

我们可以打开Postman并导航到左侧的_APIs_选项，然后点击_Import_以查看可用的不同选项：

![img](https://www.baeldung.com/wp-content/uploads/2022/08/Postman_API_Import.jpg)

### 5.1. 导入文件
**如果我们有一个可用的Swagger JSON文件**，我们可以通过Postman中的文件选项导入它：

![img](https://www.baeldung.com/wp-content/uploads/2022/08/Postman_API_Import_File.jpg)

### 5.2. 导入链接
如果我们有Swagger-UI链接，我们可以直接使用该链接将API导入Postman。

按以下方式从Swagger-UI复制API链接：

![img](https://www.baeldung.com/wp-content/uploads/2022/08/2_Swagger_Copy_Link.jpg)

然后通过Postman使用相同的链接导入它：

![img](https://www.baeldung.com/wp-content/uploads/2022/08/Postman_API_Import_Link.jpg)

### 5.3. 通过原始文本导入
我们还可以直接**将JSON作为原始文本粘贴**以导入API：

### 5.4. 通过代码库导入
要从代码库导入API，我们需要**登录Postman**。以GitHub为例，让我们按照以下步骤操作：

1. 导航到_Code Repository_标签。
2. 点击_GitHub_。
3. 确认GitHub账户并**授权_postmanlabs_访问仓库**。完成后，返回Postman应用程序进行进一步步骤。
4. 在Postman上，选择_**组织**_、_**仓库**_和_**分支**_，然后点击_Continue_。
5. **确认我们需要导入的API**，然后点击_Import_。

## 6. 结论
在本文中，我们探讨了将REST API导入Postman的不同方式。