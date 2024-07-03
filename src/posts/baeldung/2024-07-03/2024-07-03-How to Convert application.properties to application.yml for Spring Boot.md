---
date: 2023-06-01
category:
  - Spring Boot
  - Configuration
tag:
  - application.properties
  - application.yml
head:
  - - meta
    - name: keywords
      content: Spring Boot, application.properties, application.yml, Configuration, Tutorial
  - - meta
    - name: description
      content: Learn how to convert application.properties to application.yml in Spring Boot applications.
---

# Spring Boot中将application.properties转换为application.yml

在本教程中，我们将学习如何将从Spring Initializer下载新Spring Boot项目时默认获得的_application.properties_文件转换为更易于阅读的_application.yml_文件。

## 属性文件与YML文件之间的区别

在直接进入主题之前，让我们通过代码形式看看这两种文件格式之间的区别。

**在_application.properties_文件中，属性以单行配置的形式存储。** Spring Boot将属性文件生成为默认文件：

```
spring.datasource.url=jdbc:h2:mem:testDB
spring.datasource.username=user
spring.datasource.password=testpwd
```

另一方面，我们可以创建一个_application.yml_。这是一个基于YML的文件，与属性文件相比，在处理分层数据时更易于阅读：

```
spring:
  datasource:
    url: 'jdbc:h2:mem:testDB'
    username: user
    password: testpwd
```

**正如我们所看到的，通过基于YML的配置，我们消除了添加重复前缀（_spring.datasource_）的需要。**

### 3.1. IntelliJ插件

如果我们使用IntelliJ作为我们的IDE来运行Spring Boot应用程序，我们可以通过安装以下插件来进行转换：

![img](https://www.baeldung.com/wp-content/uploads/2023/06/Plugin-properties-to-yml-1024x735.png)

我们需要转到 _File > Settings > Plugins > Install_ “_Convert YAML and Properties file_”。

一旦我们安装了插件，我们：

- 右键点击_application.properties_文件
- 选择“_Convert YAML and Properties file_”选项自动将文件转换为_application.yml_

我们也可以将其转换回。

### 3.2. 在线网站工具

除了使用Intellij并安装插件之外，我们还可以直接将属性文件的内容从我们的代码库复制粘贴到simpleStep转换器网站。

出于安全原因，我们必须确保**我们不在第三方网站上输入密码进行转换：**

![img](https://www.baeldung.com/wp-content/uploads/2023/12/prop-to-yaml-online-tool-simplestep.png)

正如我们在截图中看到的，我们首先使用两个下拉框选择输入和输出内容类型。当我们在“_Input_”部分粘贴属性文件内容时，转换后的YML格式会立即在“_Output_”部分显示。

## 结论

在本文中，我们已经看到了_properties_和 _.yml_ 文件之间的区别，并学习了如何使用各种工具和插件将_application.properties_文件转换为_application.yml_。