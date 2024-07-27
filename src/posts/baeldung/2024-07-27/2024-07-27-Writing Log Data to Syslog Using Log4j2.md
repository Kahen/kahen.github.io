---
date: 2021-07-07
category:
  - Spring Boot
  - Log4j2
tag:
  - Syslog
  - Logging
  - Configuration
head:
  - - meta
    - name: keywords
      content: Log4j2, Syslog, Spring Boot, Logging, Configuration
---
# 使用Log4j2将日志数据写入Syslog

日志记录是每个应用程序中的重要组成部分。当我们在应用程序中使用日志记录机制时，我们可以将日志存储在文件或数据库中。此外，我们还可以将日志数据发送到集中的日志管理应用程序，如Graylog或Syslog。

在本教程中，我们将描述如何使用Log4j2在Spring Boot应用程序中将日志信息发送到Syslog服务器。

Log4j2是Log4j的最新版本。它是高性能日志记录的常见选择，并在许多生产应用程序中使用。

### 2.1. Maven依赖
让我们首先向我们的_pom.xml_添加_spring-boot-starter-log4j2_依赖项：

```
``<dependency>``
    ```<groupId>```org.springframework.boot```</groupId>```
    ```<artifactId>```spring-boot-starter-log4j2```</artifactId>```
``</dependency>``
```

为了在Spring Boot应用程序中配置Log4j2，我们需要从_pom.xml_中的任何启动库中排除默认的_Logback_日志记录框架。在我们的项目中，只有_spring-boot-starter-web_启动依赖项。让我们从它中排除默认的日志记录：

```
``<dependency>``
    ```<groupId>```org.springframework.boot```</groupId>```
    ```<artifactId>```spring-boot-starter-web```</artifactId>```
    `<exclusions>`
        `<exclusion>`
            ```<groupId>```org.springframework.boot```</groupId>```
            ```<artifactId>```spring-boot-starter-logging```</artifactId>```
        `</exclusion>`
    `</exclusions>`
``</dependency>``
```

### 2.2. Log4j2配置
现在，我们将创建Log4j2配置文件。Spring Boot项目在类路径中搜索_log4j2-spring.xml_或_log4j2.xml_文件。让我们在_resource_目录中配置一个简单的_log4j2-spring.xml_：

```
`<?xml version="1.0" encoding="UTF-8"?>`
`<Configuration>`
    `<Appenders>`
        `<Console name="ConsoleAppender" target="SYSTEM_OUT">`
            `<PatternLayout
                pattern="%style{%date{DEFAULT}}{yellow} %highlight{%-5level}{FATAL=bg_red, ERROR=red, WARN=yellow, INFO=green} %message"/>`
        `</Console>`
    `</Appenders>`
    `<Loggers>`
        `<Root level="info">`
            `<AppenderRef ref="ConsoleAppender"/>`
        `</Root>`
    `</Loggers>`
`</Configuration>`
```

该配置具有一个_Console_附加器，用于将日志数据显示到控制台。

### 2.3. Syslog附加器
附加器是日志框架中将日志数据传递到目的地的主要组件。Log4j2支持许多附加器，例如Syslog附加器。让我们更新我们的_log4j2-spring.xml_文件，以添加Syslog附加器，将日志数据发送到Syslog服务器：

```
`<Syslog name="Syslog" format="RFC5424" host="localhost" port="514"
    protocol="UDP" appName="baeldung" facility="LOCAL0" />`
```

Syslog附加器具有许多属性：
- _name_: 附加器的名称
- _format_: 可以设置为BSD或RFC5424
- _host_: Syslog服务器的地址
- _port_: Syslog服务器的端口
- _protocol_: 是否使用TCP或UDP
- _appName_: 记录日志的应用程序的名称
- _facility_: 消息的类别

## 3. Syslog服务器
现在，让我们设置Syslog服务器。在许多Linux发行版中，_rsyslog_是主要的日志记录机制。它包含在大多数Linux发行版中，例如Ubuntu和CentOS。

### 3.1. Syslog配置
**我们的_rsyslog_配置应与Log4j2设置匹配。** _rsyslog_配置定义在_/etc/rsyslog.conf_文件中。我们在Log4j2配置中分别使用UDP和端口514作为_protocol_和_port_。因此，我们将添加或取消注释_rsyslog.conf_文件中的以下行：

```
# provides UDP syslog reception
module(load="imudp")
input(type="imudp" port="514")
```

在这种情况下，我们设置_module(load="imudp")_来加载_imudp_模块通过UDP接收Syslog消息。然后，我们使用_input_配置将_port_设置为514。_input_将端口分配给模块。之后，我们应该重启_rsyslog_服务器：

```
sudo service rsyslog restart
```

现在配置已经准备好了。

### 3.2. 测试
让我们创建一个简单的Spring Boot应用程序，记录一些消息：

```
@SpringBootApplication
public class SpringBootSyslogApplication {
    private static final Logger logger = LogManager.getLogger(SpringBootSyslogApplication.class);

    public static void main(String[] args) {
        SpringApplication.run(SpringBootSyslogApplication.class, args);

        logger.debug("Debug log message");
        logger.info("Info log message");
        logger.error("Error log message");
        logger.warn("Warn log message");
        logger.fatal("Fatal log message");
        logger.trace("Trace log message");
    }
}
```

日志信息存储在_/var/log/_目录中。让我们检查_syslog_文件：

```
tail -f /var/log/syslog
```

当我们运行我们的Spring Boot应用程序时，我们将看到我们的日志消息：

```
Jun 30 19:49:35 baeldung[16841] Info log message
Jun 30 19:49:35 baeldung[16841] Error log message
Jun 30 19:49:35 baeldung[16841] Warn log message
Jun 30 19:49:35 baeldung[16841] Fatal log message
```

## 4. 结论
在本教程中，我们描述了在Spring Boot应用程序中Log4j2的Syslog配置。我们还配置了_rsyslog_服务器作为Syslog服务器。像往常一样，完整的源代码可以在GitHub上找到。