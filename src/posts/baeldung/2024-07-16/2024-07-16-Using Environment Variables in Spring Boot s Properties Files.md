---
date: 2022-04-01
category:
  - Spring Boot
  - Properties
tag:
  - Environment Variables
  - Spring Boot
head:
  - - meta
    - name: keywords
      content: Spring Boot, Properties, Environment Variables
------
# 使用 Spring Boot 的属性文件中的环境变量

## 1. 概述

在本教程中，我们将讨论如何在 Spring Boot 的 _application.properties_ 和 _application.yml_ 文件中使用环境变量。然后，我们将学习如何在代码中引用这些属性。

## 2. 在 _application.properties_ 文件中使用环境变量

让我们定义一个名为 _JAVA_HOME_ 的全局环境变量，其值为 “ _C:\Program Files\Java\jdk-11.0.14_”。

要在 Spring Boot 的 _application.properties_ 中使用此变量，我们需要将其用大括号包围：

```
java.home=${JAVA_HOME}
```

我们也可以以相同的方式使用系统属性。例如，在 Windows 上，默认定义了一个 OS 属性：

```
environment.name=${OS}
```

还可以组合多个变量值。让我们定义另一个环境变量 _HELLO_BAELDUNG_，其值为 “ _Hello Baeldung_”。现在我们可以连接我们的两个变量：

```
baeldung.presentation=${HELLO_BAELDUNG}. Java is installed in the folder: ${JAVA_HOME}
```

属性 _baeldung.presentation_ 现在包含以下文本：“ _Hello Baeldung. Java is installed in the folder: C:\Program Files\Java\jdk-11.0.14_”。

这样，我们的属性根据环境具有不同的值。

## 3. 在代码中使用我们的环境特定属性

假设我们启动了一个 Spring 上下文，现在我们将看到如何将属性值注入到我们的代码中。

### 3.1. 使用 _@Value_ 注入值

首先，我们可以使用 _@Value_ 注解。 _@Value_ 处理 setter、构造函数和字段注入：

```java
@Value("${baeldung.presentation}")
private String baeldungPresentation;
```

### 3.2. 从 Spring _Environment_ 获取它

我们还可以通过对 Spring 的 _Environment_ 进行自动装配来获取属性值：

```java
@Autowired
private Environment environment;
```

现在可以通过 _getProperty()_ 方法检索属性值：

```java
environment.getProperty("baeldung.presentation")
```

### 3.3. 使用 _@ConfigurationProperties_ 分组属性

如果我们想要将属性分组在一起，《@ConfigurationProperties_ 注解非常有用。我们将定义一个 _Component_，它将收集所有具有给定前缀的属性，在我们的例子中是 _baeldung_。然后，我们可以为每个属性定义一个 setter。setter 的名称是属性名称的其余部分。在我们的例子中，我们只有一个，称为 _presentation_：

```java
@Component
@ConfigurationProperties(prefix = "baeldung")
public class BaeldungProperties {

    private String presentation;

    public String getPresentation() {
        return presentation;
    }

    public void setPresentation(String presentation) {
        this.presentation = presentation;
    }
}
```

现在可以自动装配一个 _BaeldungProperties_ 对象：

```java
@Autowired
private BaeldungProperties baeldungProperties;
```

最后，要获取特定属性的值，我们需要使用相应的 getter：

```java
baeldungProperties.getPresentation()
```

## 4. 在 _application.yml_ 文件中使用环境变量

就像 _application.properties_ 一样，《application.yml_ 是一个定义应用程序的各种属性和设置的配置文件。要使用环境变量，**我们需要在属性占位符中声明其名称**。

让我们看一个带有属性占位符和变量名称的示例 _application.yml_ 文件：

```yaml
spring:
  datasource:
    url: ${DATABASE_URL}
```

上面的示例显示我们正在尝试将数据库 URL 导入我们的 Spring Boot 应用程序。 _${DATABASE_URL}_ 表达式提示 Spring Boot 查找名为 _DATABASE_URL_ 的环境变量。

要在 _application.yml_ 中定义环境变量，我们必须以美元符号开始，后跟一个左大括号，环境变量的名称，和一个右大括号。所有这些结合在一起构成了属性占位符和环境变量名称。

此外，我们可以像使用 _application.properties_ 一样在代码中使用环境特定属性。我们可以使用 _@Value_ 注解注入值。还可以使用 _Environment_ 类。最后，我们可以使用 _@ConfigurationProperties_ 注解。

## 5. 结论

在本文中，我们学习了如何定义具有不同环境值的属性并在代码中使用它们。此外，我们看到了如何在 _application.properties_ 和 _application.yml_ 文件中定义环境变量。最后，我们查看了将定义的属性注入到示例代码中的示例。

一如既往，代码可在 GitHub 上获取。