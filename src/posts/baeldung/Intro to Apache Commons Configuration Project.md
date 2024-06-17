由于我无法访问外部链接，因此无法获取网页内容以进行翻译。如果您能提供网页的具体内容，我将很乐意帮助您翻译。请提供文本内容，以便我能够继续为您提供翻译服务。---
date: 2024-06-17
category:
  - Java
  - Apache Commons
tag:
  - Apache Commons Configuration
  - Java
---

# Apache Commons Configuration 项目入门

1. 概述

  在部署时，我们可能需要向应用程序提供一些配置。这些配置可能来自多个外部来源。

  Apache Commons Configuration 提供了一种统一的方法来管理来自不同来源的配置。

  在本教程中，我们将探讨 Apache Commons Configuration 如何帮助我们配置应用程序。

2. Apache Commons Configuration 简介

  Apache Commons Configuration **为 Java 应用程序提供了一个接口，用于访问和使用来自不同来源的配置数据**。通过配置构建器，**它提供了对单值和多值特性的类型化访问**。

  它一致地处理来自多个来源的属性，包括文件、数据库以及 XML 等分层文档。

### 2.1. Maven 依赖

让我们首先将配置库和 bean 工具的最新版本添加到 _pom.xml_：

```xml
``<dependency>``
    ``<groupId>``org.apache.commons``</groupId>``
    ``<artifactId>``commons-configuration2``</artifactId>``
    ``<version>``2.10.0``</version>``
``</dependency>``
``<dependency>``
    ``<groupId>``commons-beanutils``</groupId>``
    ``<artifactId>``commons-beanutils``</artifactId>``
    ``<version>``1.9.4``</version>``
``</dependency>``
```

### 2.2. 设置

让我们定义一些我们可能遇到的常见配置文件。

我们将创建一个平面文件格式 - 一个 _.properties_ 文件：

```properties
db.host=baeldung.com
db.port=9999
db.user=admin
db.password=bXlTZWNyZXRTdHJpbmc=
db.url=${db.host}:${db.port}
db.username=${sys:user.name}
db.external-service=${const:com.baeldung.commons.configuration.ExternalServices.BAELDUNG_WEBSITE}
```

让我们再创建一个以分层 XML 格式的文件：

```xml
`<?xml version="1.0" encoding="UTF-8"?>`
`<!DOCTYPE configuration SYSTEM "validation-sample.dtd">`
`<configuration>`
    `<appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">`
        `<encoder>`
            ``<pattern>``Pattern1``</pattern>``
            ``<pattern>``Pattern2``</pattern>``
        `</encoder>`
    `</appender>`
    `<root>`
        `<appender-ref ref="STDOUT" />`
    `</root>`
`</configuration>`
```

3. _Configurations_ 辅助类

Apache Commons Configuration 提供了 _Configurations_ 工具类，用于从不同来源读取配置，以便快速开始使用标准选项。**这是一个线程安全的类，它帮助我们使用默认参数创建各种配置对象**。

此外，我们还可以通过传递 _Parameters_ 实例来提供自定义参数。

### 3.1. 读取属性文件

我们将**通过 _Configurations_ 类读取属性文件，并通过 _Configuration_ 类访问它**。有多种方法可以读取文件或获取测试资源文件夹。我们可以将属性读取或转换为数字或某些对象类型的 _List_。最后，我们还可以提供默认值。

让我们尝试从属性文件访问配置：

```java
Configurations configs = new Configurations();
Configuration config = configs.properties(new File("src/test/resources/configuration/file.properties"));
String dbHost = config.getString("db.host");
int dbPort = config.getInt("db.port");
String dbUser = config.getString("db.user");
String dbPassword = config.getString("undefinedKey", "defaultValue");

assertEquals("baeldung.com", dbHost);
assertEquals(9999, dbPort);
assertEquals("admin", dbUser);
assertEquals("defaultValue", dbPassword);
```

### 3.2. 读取 XML 文件

我们将使用 _XMLConfiguration_ 类来访问 XML 文件中的属性，该类扩展了 _Configuration_ 类：

```java
Configurations configs = new Configurations();
XMLConfiguration config = configs.xml(new File("src/test/resources/configuration/hierarchical.xml"));
String appender = config.getString("appender[@name]");
List``<String>`` encoderPatterns = config.getList(String.class, "appender.encoder.pattern");
String pattern1 = config.getString("appender.encoder.pattern(0)");

```

通过点 '._' 符号的遍历可以访问输入文件的层次结构特性。

4. 来自属性文件的配置

除了使用 _Configurations_ 类之外，Apache Commons Configuration 还提供了支持以附加功能读取/访问此格式。**属性文件的配置对象是使用 _FileBasedConfigurationBuilder_ 实例化的**。

让我们看一个示例，展示如何使用这个构建器访问属性文件：

```java
Parameters params = new Parameters();
FileBasedConfigurationBuilder``<FileBasedConfiguration>`` builder =
  new FileBasedConfigurationBuilder``<FileBasedConfiguration>``(PropertiesConfiguration.class)
    .configure(params.properties()
    .setFileName("src/test/resources/configuration/file1.properties"));
```

随后，我们可以使用标准方法访问属性。此外，我们还可以通过对 _PropertiesReader_ 或 _PropertiesWriter_ 类的 _PropertiesConfiguration_ 进行扩展，提供自定义的属性文件 IO 操作实现。

通过指定文件名作为值，还可以通过 _include_ 和 _includeOptional_ 标志链接更多的属性文件。这两个标志的区别在于，如果找不到属性文件，那么 _include_ 标志会抛出 _ConfigurationException_。

首先，我们创建一个新的属性文件名为 _file1.properties_。此文件使用 _include_ 包含了初始属性文件，并使用 _includeOptional_ 包含了一个不存在的文件：

```properties
db.host=baeldung.com

include=file.properties
includeOptional=file2.properties
```

现在，让我们验证我们可以从两个属性文件中读取：

```java
Configuration config = builder.getConfiguration();
String dbHost = config.getString("db.host");
int dbPort = config.getInt("db.port");
```

5. 来自 XML 的配置

通过 XML 进行配置也是应用程序开发中的常见做法。该库提供了 _XMLConfiguration_ 来访问 XML 文件中的属性。

XML 文件的一个标准需求是验证文件以确保没有差异。_XMLConfiguration_ 提供了两个标志来验证文件的结构和内容。我们可以将 _validating_ 标志设置为启用验证解析器，或者将 _schemaValidation_ 标志设置为 _true_，除了正常验证外，还启用对模式的验证。

让我们为之前定义的 XML 文件定义一个模式：

```xml
`<!ELEMENT configuration (appender+, root)>`
`<!ELEMENT appender (encoder?)>`
`<!ATTLIST appender
    name CDATA #REQUIRED
    class CDATA #REQUIRED
    >`
`<!ELEMENT encoder (pattern+)>`
`<!ELEMENT pattern (#PCDATA)>`
`<!ELEMENT root (appender-ref+)>`
`<!ELEMENT appender-ref EMPTY>`
`<!ATTLIST appender-ref
    ref CDATA #REQUIRED
    >`
```

现在让我们运行一个测试，将 _schemaValidation_ 设置为 true 以验证行为：

```java
Parameters params = new Parameters();
FileBasedConfigurationBuilder``<XMLConfiguration>`` builder = new FileBasedConfigurationBuilder``<XMLConfiguration>``(
  XMLConfiguration.class)
  .configure(params.xml()
  .setFileName("src/test/resources/configuration/hierarchical.xml")
  .setValidating(true));
XMLConfiguration config = builder.getConfiguration();
String appender = config.getString("appender[@name]");
List``<String>`` encoderPatterns = config.getList(String.class, "appender.encoder.pattern");

assertEquals("STDOUT", appender);
assertEquals(2, encoderPatterns.size());
```

6. 多租户配置

在多租户应用程序设置中，多个客户端共享一个公共代码库，并通过每个客户端的配置属性进行区分。该库通过 _MultiFileConfigurationBuilder_ 提供了处理此场景的支持。

我们需要为属性文件传递一个包含客户端识别参数的文件模式。最后，此参数可以通过插值解析，然后作为配置名称解析：

```java
System.setProperty("tenant", "A");
String filePattern = "src/test/resources/configuration/tenant-${sys:tenant}.properties";
MultiFileConfigurationBuilder`<PropertiesConfiguration>` builder = new MultiFileConfigurationBuilder<>(
  PropertiesConfiguration.class)
    .configure(new Parameters()
      .multiFile()
      .setFilePattern(filePattern)
      .setPrefixLookups(ConfigurationInterpolator.getDefaultPrefixLookups()));
Configuration config = builder.getConfiguration();
String tenantAName = config.getString("name");

assertEquals("Tenant A", tenantAName);
```

我们定义了一个文件模式；在此示例中，我们从 _System_ 属性提供了租户值。

**我们还提供了 _DefaultPrefixLookups_，这将用于实例化 _MultiFileConfigurationBuilder_ 的 _ConfigurationInterpolator_**。

7. 处理不同数据类型

该库支持处理各种数据类型。让我们在以下子节中查看一些场景。

### 7.1. 缺少属性

可能尝试访问配置中不存在的属性。在这种情况下，**如果返回值是对象类型，则返回 _null_**。

然而，**如果返回值是原始类型，则抛出 _NoSuchElementException_**。我们可以通过传递默认值来覆盖此行为，以由方法返回：

```java
PropertiesConfiguration propertiesConfig = new PropertiesConfiguration();
String objectProperty = propertiesConfig.getString("anyProperty");
int primitiveProperty = propertiesConfig.getInt("anyProperty", 1);

assertNull(objectProperty);
assertEquals(1, primitiveProperty);
```

在上面