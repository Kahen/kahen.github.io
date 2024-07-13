---
date: 2022-04-01
category:
  - Spring
  - Groovy
tag:
  - Groovy
  - Spring Framework
  - Configuration
head:
  - - meta
    - name: keywords
      content: Spring, Groovy, Configuration, Dynamic Language, Bean Definitions
---
# Groovy 在 Spring 中的使用

## 1. 概述

Groovy 是一种功能强大且动态的 JVM 语言，拥有众多特性。在 Spring 中使用 Groovy 可以显著增强应用程序的灵活性和可读性。自版本 4 起，Spring 支持基于 Groovy 的配置。

在本教程中，**我们将探讨使用 Groovy 与 Spring 的不同方式**。首先，我们将看到如何使用 Spring 提供的多种选项创建 Groovy bean 定义。接下来，我们将讨论如何使用 Groovy 脚本引导应用程序上下文。最后，我们将看到如何使用 XML 和 _GroovyScriptEngine_ 类执行 Groovy 脚本（无需编译）。

## 2. Maven 依赖

让我们首先在 _pom.xml_ 中定义 Groovy 依赖：

```xml
`<dependency>`
    ``<groupId>``org.apache.groovy``</groupId>``
    ``<artifactId>``groovy``</artifactId>``
    ``<version>``4.0.21``</version>``
`</dependency>`
```

此外，我们需要添加 GMavenPlus 插件来编译 Groovy 文件：

```xml
`<build>`
    `<plugins>`
        `<plugin>`
            ``<groupId>``org.codehaus.gmavenplus``</groupId>``
            ``<artifactId>``gmavenplus-plugin``</artifactId>``
            ``<version>``3.0.2``</version>``
            `<executions>`
                `<execution>`
                    `<goals>`
                        ````````<goal>````````addSources````````</goal>````````
                        ````````<goal>````````addTestSources````````</goal>````````
                        ````````<goal>````````generateStubs````````</goal>````````
                        ````````<goal>````````compile````````</goal>````````
                        ````````<goal>````````generateTestStubs````````</goal>````````
                        ````````<goal>````````compileTests````````</goal>````````
                        ````````<goal>````````removeStubs````````</goal>````````
                        ````````<goal>````````removeTestStubs````````</goal>````````
                    `</goals>`
                `</execution>`
            `</executions>`
        `</plugin>`
    `</plugins>`
`</build>`
```

## 3. Bean 定义

传统上，开发人员通过 XML 配置声明 beans。后来这种风格被 Java 注解的程序化定义所取代。另一种声明 beans 的方式是通过 Groovy 脚本。

由于我们使用 GMavenPlus 插件，Groovy 源文件可以与其他 Java 代码一起混合在 _src/main/java_ 源文件夹中。然而，**最好将 Groovy 文件放在专用的 _src/main/groovy_ 源文件夹中，以避免后期混淆**。

### 3.1. 使用 Groovy Bean Builder

Groovy Bean Builder 是 Java 的 _@Configuration_ 注解基础配置和基于 XML 的配置的强大替代品。让我们看看使用 Groovy 代码的一些基本 bean 定义：

```groovy
beans {
    // 声明一个带有构造函数参数的简单 bean
    company(Company, name: 'ABC Inc')

    // 可以使用更简单的语法声明相同的 bean：beanName(type, constructor-args)
    company String, 'ABC Inc'

    // 声明一个员工对象，使用 setter 引用前面的 bean
    employee(Employee) {
        firstName = 'Lakshmi'
        lastName = 'Priya'
        // 其他 bean 的引用可以以两种方式完成
        vendor = company // 或 vendor = ref('company')
    }

    // 允许导入其他配置文件，包括 XML 和 Groovy
    importBeans('classpath:ApplicationContext.xml')
    importBeans('classpath:GroovyContext.groovy')
}
```

在这里，顶级的 _beans_ 构造函数包装了所有声明的 beans，是一个闭包，由 _GroovyBeanDefinitionReader_ 作为 DSL 处理。

### 3.2. 使用注解

另外，Groovy 类可以是有效的 Spring beans，Groovy 可以代替 Java 用于基于注解的配置：

```groovy
@Configuration
class SpringGroovyConfiguration {

    @Bean
    List`<String>` fruits() {
        ['Apple', 'Orange', 'Banana', 'Grapes']
    }

    @Bean
    Map`<Integer, String>` rankings() {
        [1: 'Gold', 2: 'Silver', 3: 'Bronze']
    }
}
```

### 3.3. 使用 XML

当然，Groovy Bean Builder 和基于注解的配置更加灵活。然而，我们仍然可以使用 XML 来声明 Groovy 脚本中定义的 beans。Groovy 是一种动态语言，Spring 为此提供了全面的支持。因此，**我们需要在 XML 配置中使用一个特殊元素（ _`<lang:groovy>`_ ）来表示我们正在定义动态语言支持的 beans**。

例如，让我们看看一个引用正确模式的 XML 配置示例，以便 _lang_ 命名空间中的标签可用：

```xml
`<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:lang="http://www.springframework.org/schema/lang"
       xsi:schemaLocation="
        http://www.springframework.org/schema/beans https://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/lang https://www.springframework.org/schema/lang/spring-lang.xsd">`
    `<lang:groovy id="notification" script-source="file:NotificationServiceImpl.groovy" refresh-check-delay="10000">`
        `<lang:property name="message" value="Hello" />`
    `</lang:groovy>`
`</beans>`
```

在这里，我们声明了 _notification_ bean，它通过 _script-source_ 属性引用 Groovy 脚本。我们可以使用 _file_ 前缀指定脚本的确切位置。或者，我们可以使用 _classpath_ 前缀直接从类路径访问资源。_refresh-check-delay_ 属性定义了脚本的刷新间隔，当脚本内容更改时，可以自动刷新。

## 4. 引导应用程序上下文

Spring 需要知道如何引导 Groovy 上下文文件，以便将 beans 可用于应用程序。我们可以通过在 _web.xml_ 中配置或以编程方式加载上下文来实现。

### 4.1. 在 _web.xml_ 中添加 Groovy 配置

为了简化事情，Spring 版本 4.1 通过 _GroovyWebApplicationContext_ 的帮助，增加了通过 _web.xml_ 加载 Groovy 配置文件的支持。

默认情况下，配置将从 _/WEB-INF/applicationContext.groovy_ 加载。然而，这个位置可以通过 _contextConfigLocation_ servlet 上下文参数覆盖：

```xml
`<web-app>`
    ...
    `<listener>`
        `<listener-class>`org.springframework.web.context.ContextLoaderListener`</listener-class>`
    `</listener>`

    ``<context-param>``
        ``<param-name>``contextClass``</param-name>``
        ``<param-value>``org.springframework.web.context.support.GroovyWebApplicationContext``</param-value>``
    ``</context-param>``
    ``<context-param>``
        ``<param-name>``contextConfigLocation``</param-name>``
        ``<param-value>``/WEB-INF/applicationContext.groovy``</param-value>``
    ``</context-param>``

    ...
`</web-app>`
```

### 4.2. 使用 _GenericGroovyApplicationContext_

Spring 提供了 _GenericGroovyApplicationContext_ 来引导 Groovy bean 定义。此外，上下文可以使用内联 bean 定义闭包进行加载：

```groovy
def context = new GenericGroovyApplicationContext()
context.reader.beans {
    department(Department) {
        name = 'Finance'
        floor = 3
    }
}
context.refresh()
```

**或者，我们可以将这个 bean 定义外部化，并从 Groovy 配置文件加载应用程序上下文**：

```groovy
GenericGroovyApplicationContext context = new GenericGroovyApplicationContext();
context.load("config/applicationContext.groovy");
context.refresh();
```

正如我们所看到的，加载 Groovy 上下文类似于 Java 风格的实例化 _XmlWebApplicationContext_ 或 _ClassPathXmlApplicationContext_。

如果没有额外的配置，代码可以更加简洁：

```groovy
ApplicationContext context = new GenericGroovyApplicationContext("config/applicationContext.groovy");
String foo = context.getBean("foo", String.class);
```

此外，**_GenericGroovyApplicationContext_** **还理解 XML bean 定义文件。** **这增加了更多的灵活性，允许与 Groovy bean 定义文件无缝混合和匹配。**

## 5. 执行 Groovy 脚本

除了 Groovy bean 定义之外，Spring 还支持执行 Groovy 脚本，无需编译。这种执行可以作为一个独立的 bean，或者通过在 bean 中调用 Groovy 脚本，使脚本成为它的可执行部分。

### 5.1. 作为内联脚本

正如我们之前看到的，我们可以使用 Spring 提供的动态语言支持将 Groovy 源文件直接嵌入 Spring bean 定义中。因此，我们可以利用 _`<lang:inline-script/>`_ 元素在 Spring 配置 XML 文件内立即定义 Groovy 源代码。

例如，我们可以使用内联脚本特性创建一个 _Notifier_ bean：

```xml
`<lang:groovy id="notifier">`
    `<lang:inline-script>`
