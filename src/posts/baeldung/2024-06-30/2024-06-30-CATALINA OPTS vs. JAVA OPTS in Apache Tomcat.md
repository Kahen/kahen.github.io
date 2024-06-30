---
date: 2022-04-01
category:
  - Tomcat
  - Java
tag:
  - CATALINA_OPTS
  - JAVA_OPTS
head:
  - - meta
    - name: keywords
      content: Apache Tomcat, JVM, CATALINA_OPTS, JAVA_OPTS
---

# Apache Tomcat中的CATALINA_OPTS与JAVA_OPTS | Baeldung

Apache Tomcat是一个开源的Java Servlet Web容器服务器，用于部署基于Java的应用程序。Tomcat服务器主要执行Java Servlet和JSP，用于动态Web应用程序。**在配置Tomcat服务器时，我们可以使用_CATALINA\_OPTS_和_JAVA\_OPTS_环境变量来进行JVM设置。**

在本教程中，我们将探讨在Tomcat服务器中使用_CATALINA\_OPTS_和_JAVA\_OPTS_的用途。

## 2. CATALINA\_OPTS和JAVA\_OPTS的重要性

Tomcat服务器使用_CATALINA\_OPTS_和_JAVA\_OPTS_环境变量进行自定义配置。这两个环境变量允许我们为Tomcat服务器自定义JVM选项，但它们的用途略有不同。自定义JVM选项对于实现Web应用程序的高性能至关重要。

我们可以使用这些环境变量来增强服务器的可扩展性和安全性。此外，我们还可以利用这些环境变量进行全局JVM配置、性能调整和配置标准化。

**这两个环境变量的关键区别在于，_JAVA\_OPTS_的任何更改都会应用于所有正在运行的Tomcat实例，而_CATALINA\_OPTS_仅对单个Tomcat实例有效。因此，我们可以使用_JAVA\_OPTS_为同一JVM上运行的所有Tomcat实例设置全局JVM配置。**

## 3. 使用JAVA\_OPTS

_JAVA\_OPTS_是一个关键的环境变量，用于配置自定义的JVM设置。我们可以使用_JAVA\_OPTS_来管理内存、GC配置和系统属性。为了理解_JAVA\_OPTS_的工作方式，我们首先使用docker run命令运行一个Tomcat服务器：

```shell
$ docker run -d -p 8080:8080 --name baeldung tomcat:latest
```

在上面的命令中，我们使用名为baeldung的docker容器在8080端口上公开了一个Tomcat服务器的HTTP端口。让我们也查看一下这个Tomcat进程的默认JVM设置：

```shell
$ ps -ef | grep tomcat
root         1     0  7 14:42 ?        00:00:01 /opt/java/openjdk/bin/java -Djava.util.logging.config.file=/usr/local/tomcat/conf/logging.properties ...
```

在上面的命令中，我们可以看到Tomcat服务器以一些默认配置启动。现在，如果我们想要对这个过程进行一些更改，我们需要将自定义配置添加到_JAVA\_OPTS_中。让我们更改Tomcat服务器进程的最小/最大堆内存：

```shell
$ export JAVA_OPTS="-Xmx512m -Xms256m"
```

上述命令将简单地更新服务器上的_max 512m_和_min 256m_内存。在Docker容器中，我们可以在运行命令本身中提供环境变量：

```shell
$ docker run -d -p 8080:8080 -e JAVA_OPTS="-Xmx512m -Xms256m" --name baeldung tomcat:latest
```

为了验证，让我们再次检查Tomcat服务器进程的详细信息：

```shell
$ ps -ef | grep tomcat
root         1     0  8 14:49 ?        00:00:01 /opt/java/openjdk/bin/java -Djava.util.logging.config.file=/usr/local/tomcat/conf/logging.properties -Xmx512m -Xms256m ...
```

在上面的输出中，我们可以看到_max_和_min_堆分别设置为_512m_和_256m_。类似地，我们也可以为垃圾收集配置使用_JAVA\_OPTS_。

简而言之，我们可以使用_JAVA\_OPTS_根据服务器需求自定义JVM配置。此外，它允许我们调整内存管理、服务器分析、GC任务和Tomcat进程的资源利用。

## 4. 使用CATALINA\_OPTS

_CATALINA\_OPTS_是一个环境变量，允许我们自定义Apache服务器相关的配置。与主要用于配置JVM相关选项的_JAVA\_OPTS_不同，_CATALINA\_OPTS_主要配置与Tomcat服务器相关的设置。为了演示，让我们运行命令更改Tomcat服务器的HTTP端口：

```shell
$ docker run -d -p 8080:8082 -e CATALINA_OPTS="-Dcatalina.http.port=8082" --name baeldung tomcat:latest
```

在上面的命令中，我们将Tomcat服务器的默认HTTP端口从_8080_更改为_8082_。为了验证，让我们查看命令以查看Tomcat服务器的更新HTTP端口：

```shell
$ ps -ef | grep tomcat
root         1     0  1 15:12 ?        00:00:02 /opt/java/openjdk/bin/java -Djava.util.logging.config.file=/usr/local/tomcat/conf/logging.properties -Dcatalina.http.port=8082 ...
```

在上面的命令输出中，我们可以看到HTTP端口已更新为_8082_。_CATALINA\_OPTS_的一个主要用途是添加自定义系统属性。为了演示，让我们看看命令：

```shell
$ export CATALINA_OPTS="$CATALINA_OPTS -Dcustom.property=baeldung-example-value"
```

在上面的命令中，我们为Tomcat服务器添加了一个自定义属性。设置此环境并在重启Tomcat服务器后，Java应用程序和Tomcat服务器将访问此自定义属性值。我们还可以使用此命令提供整个配置属性。为了说明，让我们看看命令：

```shell
$ export CATALINA_OPTS="$CATALINA_OPTS -Dbaeldungapp.config=/usr/local/tomcat/config/config.properties"
```

在上面的命令中，我们使用_baeldungapp.config_属性文件为baeldung应用程序提供了配置文件。只需重启服务器即可使此配置生效。

## 5. 结论

在本文中，我们探讨了在Tomcat服务器中_CATALINA\_OPTS_和_JAVA\_OPTS_的应用。首先，我们使用_JAVA\_OPTS_更改Tomcat服务器的JVM配置。之后，我们使用_CATALINA\_OPTS_更新了Tomcat服务器的HTTP端口。