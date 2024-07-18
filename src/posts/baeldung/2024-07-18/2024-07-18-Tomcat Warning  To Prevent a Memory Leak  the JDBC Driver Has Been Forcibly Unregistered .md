---
date: 2022-04-01
category:
  - Tomcat
  - JDBC
tag:
  - Memory Leak
  - JDBC Driver
head:
  - - meta
    - name: keywords
      content: Tomcat, JDBC, Memory Leak, JDBC Driver
------
# Tomcat警告：“为了防止内存泄漏，JDBC驱动已被强制注销” | Baeldung## 1. 概述

在本教程中，我们将探讨Tomcat发出的警告消息，该消息通知我们它强制注销了一个JDBC驱动。我们将探索消息的含义、其根本原因以及我们可以采取的缓解措施。

## 2. 消息及其含义

消息的一个版本可能是以下内容：

```
SEVERE: 一个Web应用程序注册了JBDC驱动 [oracle.jdbc.driver.OracleDriver]
  但在Web应用程序停止时未能注销它。
  为了防止内存泄漏，JDBC驱动已被强制注销。
```

以上消息表明，当我们部署Web应用程序时，注册了_OracleDriver_类的JDBC驱动，但在相同的应用程序被卸载时，它并未被注销。

我们可以通过多种方式加载和注册JDBC驱动，它本质上是一个扩展了_java.sql.Driver_接口的类。Tomcat使用Java服务提供者接口（SPI），并**自动加载它在Web应用程序的_WEB-INF/lib_目录下找到的任何JDBC 4.0兼容驱动类**。

当我们卸载一个Web应用程序时，我们还必须注销它带来的任何驱动。否则，它们将一直与Tomcat注册在一起。**这会创建一个内存泄漏，直到我们关闭整个Web服务器**。

从6.0.24版本开始，Tomcat检测到这种类型的泄漏，并强制注销所有泄漏的驱动。然而，它仍然通知我们这个问题，这在我们将相同的应用程序部署到不支持此功能的其他Web服务器上时非常有帮助。

## 3. 根本原因及潜在问题

问题的原因在于JDBC驱动的不当实现。它应该监听应用程序卸载事件并自行注销。

当Java SPI加载JDBC驱动时，它使用当前上下文类加载器加载它。由于驱动位于应用程序的_WEB-INF/lib_下，SPI使用其类加载器加载它。**以这种方式加载的驱动与_DriverManager_类注册，这是一个JVM单例。如果这没有发生，它将在加载的类中引入内存泄漏**。

当我们卸载Web应用程序时，其类加载器被垃圾回收。**另一方面，_DriverManager_仍然引用JDBC驱动，阻止垃圾回收**。如果我们再次部署相同的Web应用程序，将创建一个新的类加载器，SPI将第二次加载相同的JDBC驱动。这实际上是一个内存泄漏。

## 4. 缓解措施

我们可以通过多种方式缓解这个问题。

### 4.1. 使用更新的Tomcat版本

从6.0.24版本开始，Tomcat为我们自动处理这个问题。**这意味着我们可以安全地忽略警告消息**。

### 4.2. 在关闭时手动注销

我们可以在任何应用程序关闭回调上手动注销驱动。在我们应用程序将加载一个JDBC驱动的标准情况下，我们可以用一行代码做到这一点：

```java
DriverManager.deregisterDriver(DriverManager.getDrivers().nextElement());
```

需要注意的是，尽管Tomcat调用操作注销，但_DriverManager_方法被称为注销。

### 4.3. 移动JDBC Jar

处理这个问题的官方方式是将JDBC驱动jar文件从应用程序的_WEB-INF/lib_移动到Tomcat的/ _lib_目录。由于/ _lib_目录下的所有jar也位于类路径上，Tomcat仍将自动加载驱动，但使用它自己的类加载器。

Tomcat在部署应用程序时不会加载任何驱动实现，因为不会有任何驱动位于_WEB-INF/lib_。这意味着我们可以安全地卸载和重新部署它，而不会加载任何新内容，从而防止任何泄漏。

## 5. 结论

在本文中，我们讨论了Tomcat发出的JDBC驱动强制注销警告消息的含义。我们还查看了其根本原因以及可能的解决方法。

OK