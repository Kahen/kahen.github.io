---
date: 2024-06-15
category:
  - Java
  - MyBatis
tag:
  - Logging
  - SQL
---
# 在MyBatis中将SQL查询记录到控制台

MyBatis是一个流行的基于Java的持久层框架，它通过将SQL查询映射到Java方法来简化数据库操作。

在使用MyBatis开发应用程序时，查看正在使用的SQL查询通常对调试非常有用。

在本教程中，我们将探讨如何在MyBatis中将SQL查询记录到控制台。

## 2. 支持的日志实现

在深入研究MyBatis中的SQL记录之前，了解支持的日志实现是很重要的。

**MyBatis是一个灵活的框架，可以与各种日志框架集成**，包括SLF4J、Apache Commons Logging、Log4j 2和JDK Logging。本文将探讨两种不同的日志选项：标准输出日志和SLF4J。

标准输出日志在本地功能开发期间很有帮助，因为它为调试提供了一种简单的方法。另一方面，SLF4J更适合生产应用程序，提供了灵活的抽象，可以无缝集成用户在部署期间首选的日志框架。

## 3. 在MyBatis中配置标准输出日志

使用标准输出记录MyBatis SQL允许我们直接在控制台上查看执行的SQL语句。这种方法在开发和调试期间非常方便。

要为MyBatis SQL启用标准输出日志，我们需要在我们的应用程序的_mybatis-config_文件中添加一个日志设置：

```xml
```<configuration>```
    ``<settings>``
        `<setting name="logImpl" value="STDOUT_LOGGING"/>`
    ``</settings>``
```</configuration>```
```

配置_logImpl_属性为_STDOUT_LOGGING_后，MyBatis在执行SQL查询时将输出原始SQL语句、查询参数和查询结果。输出通常包括诸如执行的SQL、绑定参数和返回的结果集等详细信息：

```
==>  Preparing: SELECT addressId, streetAddress FROM Address WHERE addressId = ?
==> Parameters: 1(Integer)
`<==    Columns: ADDRESSID, STREETADDRESS
<==        Row: 1, 123 Main Street
```

输出指示正在准备一个SQL查询，以使用特定ID从_Address_表中获取数据。它显示了参数、结果集列（_ADDRESSID_和_STREETADDRESS_），以及数据的示例行（_ADDRESSID: 1, STREETADDRESS: 123 Main Street_）。此外，它还告诉我们返回的行总数为1。

除了在_mybatis-config_中配置_logImpl_属性外，**我们还可以选择以编程方式设置日志实现**。我们可以通过在调用任何其他MyBatis方法之前调用静态方法_LogFactory.useStdOutLogging()_来实现这一点。

使用**标准输出日志的缺点在于它缺乏对日志的细粒度控制**。使用标准输出日志时，MyBatis会详细记录所有执行的SQL查询，这可能会让人感到不知所措，并使人们难以关注重要信息。

要实现更精确的日志控制，例如确定哪部分或映射器打印日志，建议使用日志框架。

## 4. 在MyBatis中配置SLF4J和Logback日志

### 4.1. 设置SLF4J和Logback日志

首先，我们需要将SLF4J和Logback依赖项添加到我们项目的构建文件中。由于Logback自动将SLF4J作为传递依赖项包含在内，对于Maven项目，我们只需要在_pom.xml_文件中指定Logback依赖项：

```xml
<dependency>`
    `<groupId>`ch.qos.logback`</groupId>`
    `<artifactId>`logback-classic`</artifactId>`
    `<version>`1.4.14`</version>`
`</dependency>`
```

接下来，我们需要创建一个Logback配置文件，通常命名为_logback.xml_，以定义日志行为：

```xml
```<configuration>```
    `<appender name="stdout" class="ch.qos.logback.core.ConsoleAppender">`
        `<encoder>`
            `<pattern>`%level [%thread] - %msg%n`</pattern>`
        `</encoder>`
    `</appender>`
    `<root level="INFO">`
        `<appender-ref ref="stdout"/>`
    `</root>`
```</configuration>```
```

此配置创建了一个根记录器，用于记录INFO或更高级别的日志消息，并将它们指向_stdout_附加器以输出到控制台。

跟标准输出日志配置类似，我们需要在_mybatis-config_文件中将_logImpl_属性设置为SLF4J：

```xml
```<configuration>```
    ``<settings>``
        `<setting name="logImpl" value="SLF4J" />`
    ``</settings>``
```</configuration>```
```

### 4.2. 记录映射器

按照上述配置进行日志记录后，记录映射器变得很简单。我们可以将记录器名称设置为映射器接口的完全限定名，或者如果使用XML映射器文件，则设置为命名空间：

```xml
`<logger name="com.baeldung.mybatis.mapper.AddressMapper" level="TRACE"/>`
```

这允许通过将记录器与所需的映射器关联来轻松控制日志记录。只有与此映射器相关的查询才会应用跟踪级别的日志记录。

### 4.3. 记录特定映射器方法

要选择性地记录特定方法的执行，例如在_FruitMapper_中的_getFruitById_，我们可以相应地配置记录器：

```xml
`<logger name="com.baeldung.mybatis.mapper.AddressMapper.getAddresses" level="TRACE"/>`
```

有了这种配置，记录器将仅在执行_getFruitById_方法时将日志打印到控制台，允许更专注和细粒度的日志控制。

### 4.4. 记录包中的映射器

我们可以轻松地通过将记录器名称设置为包名称来启用特定包下所有映射器的日志记录：

```xml
`<logger name="com.baeldung.mybatis.mapper" level="TRACE"/>`
```

这种方法允许在指定包内的所有映射器上进行全面的日志记录。

### 4.5. 仅记录SQL语句

在查询可能产生大型结果集的情况下，我们可能更希望查看SQL语句而不是记录实际结果。MyBatis设计为在DEBUG级别记录SQL语句，而在TRACE级别记录结果。如果我们希望看到语句而没有结果，我们需要将日志级别设置为DEBUG：

```xml
`<logger name="com.baeldung.mybatis.mapper.AddressMapper" level="DEBUG"/>`
```

## 5. 在Spring Boot中配置MyBatis的SQL日志记录

Spring是一个广泛采用的框架，在许多情况下，MyBatis是与Spring而不是独立使用的。当使用Spring Boot时，配置MyBatis SQL日志记录的工作很少。**Spring Boot使用logback作为其默认的日志实现，并且MyBatis的日志机制优先考虑SLF4J。**

因此，要为特定映射器启用MyBatis SQL日志记录，我们向Spring Boot的_application.properties_文件添加属性：

```properties
logging.level.com.baeldung.mybatis.spring.ArticleMapper=DEBUG
```

通过为指定的映射器配置日志级别为_DEBUG_，我们将为该特定映射器提供详细的SQL日志记录。

## 6. 结论

在本文中，我们查看了MyBatis中SQL日志记录的配置，包括标准输出日志、SLF4J与Logback、记录特定映射器/方法/包，以及与Spring Boot的集成。

可以在GitHub上找到在独立MyBatis应用程序中配置SQL日志记录的代码，我们还有一个单独的示例用于配置MyBatis中的SQL日志记录。