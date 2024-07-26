---
date: 2022-04-01
category:
  - Spring Boot
  - Log4j2
tag:
  - Spring Boot
  - Log4j2
  - Configuration
head:
  - - meta
    - name: keywords
      content: Spring Boot, Log4j2, Configuration
------
# 在Spring Boot中更改Log4j2配置文件的默认位置

## 1. 概述

在我们之前的Spring Boot日志记录教程中，我们展示了如何在Spring Boot中使用Log4j2。

在这个简短的教程中，我们将学习如何**更改Log4j2配置文件的默认位置**。

## 2. 使用属性文件

默认情况下，我们将Log4j2配置文件（_log4j2.xml/log4j2-spring.xml_）保留在项目类路径或资源文件夹中。

我们可以通过在_ application.properties_文件中添加/修改以下行来更改此文件的位置：

```
logging.config=/path/to/log4j2.xml
```

## 3. 使用VM选项

我们还可以通过在运行程序时添加以下VM选项来实现相同的目标：

```
-Dlogging.config=/path/to/log4j2.xml
```

## 4. 程序化配置

最后，我们可以通过更改Spring Boot的_Application_类来程序化配置此文件的位置，如下所示：

```java
@SpringBootApplication
public class Application implements CommandLineRunner {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @Override
    public void run(String... param) {
        Configurator.initialize(null, "/path/to/log4j2.xml");
    }
}
```

这种解决方案有一个缺点：应用程序启动过程将不会使用Log4j2进行日志记录。

## 5. 结论

总之，我们学习了在Spring Boot中**更改Log4j2配置文件的默认位置**的不同方法。我希望这些内容对你的工作有所帮助。