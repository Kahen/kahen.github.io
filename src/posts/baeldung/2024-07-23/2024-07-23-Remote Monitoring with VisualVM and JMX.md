---
date: 2021-12-01
category:
  - Java
  - VisualVM
tag:
  - Java
  - VisualVM
  - JMX
  - 远程监控
head:
  - - meta
    - name: keywords
      content: Java, VisualVM, JMX, 远程监控, JVM
---

# 使用VisualVM和JMX进行远程监控

在本文中，我们将学习如何使用VisualVM和Java管理扩展（JMX）对Java应用程序进行远程监控。

JMX是**用于管理和监控JVM应用程序的标准API**。JVM具有内置的仪器化工具，JMX可以利用这些工具进行管理与监控。因此，我们通常将这些工具称为“开箱即用的管理工具”或者在这种情况下称为“JMX代理”。

## 3. VisualVM

VisualVM是一个提供JVM轻量级分析功能的视觉工具。市场上有许多其他主流的分析工具。然而，**VisualVM是免费的**，并且从JDK 6U7版本开始捆绑发布，直到JDK 8的早期更新。对于其他版本，Java VisualVM作为一个独立的应用程序提供。

VisualVM**允许我们连接到本地和远程JVM应用程序**进行监控。

在任何机器上启动时，它**自动发现并开始监控所有本地运行的JVM应用程序**。然而，我们需要显式连接远程应用程序。

### 3.1. JVM连接模式

JVM通过诸如_jstatd_或JMX等工具暴露自身以供监控。这些工具反过来为VisualVM等工具提供API以获取分析数据。

_jstatd_程序是一个与JDK捆绑的守护进程。然而，它的功能有限。例如，我们不能监控CPU使用情况，也不能获取线程转储。

另一方面，JMX技术不需要在JVM上运行任何守护进程。此外，它可以用来分析本地和远程JVM应用程序。但是，我们需要使用特殊的属性启动JVM以启用开箱即用的监控功能。在本文中，我们将只关注JMX模式。

### **3.2. 启动**

正如我之前看到的，我们的JDK版本可能捆绑了VisualVM，也可能没有。无论哪种情况，我们都可以通过执行适当的二进制文件来启动它：

```
./jvisualvm
```

如果二进制文件存在于_$JAVA_HOME/bin_文件夹中，那么上述命令将打开VisualVM界面，如果单独安装，则可能在不同的文件夹中。

默认情况下，VisualVM启动时会加载所有本地运行的Java应用程序：

![img](https://www.baeldung.com/wp-content/uploads/2021/12/visualvm-launch.png)

### **3.3. 特性**

VisualVM提供了几个有用的特性：

- 显示本地和远程Java应用程序进程
- 监控进程性能，包括CPU使用情况、GC活动、加载的类数量等指标
- 在所有进程中可视化线程以及它们在不同状态（如睡眠和等待）中花费的时间
- 获取并显示线程转储，以便立即了解被监控进程的内部情况

VisualVM特性页面有更全面的可用特性列表。像所有设计良好的软件一样，通过在_插件_标签上安装第三方插件，VisualVM可以扩展以访问更高级和独特的特性。

## **4. 远程监控**

在本节中，我们将演示如何使用VisualVM和JMX远程监控Java应用程序。我们还有机会探索所有必要的配置和JVM启动选项。

### **4.1. 应用程序配置**

我们大多数，如果不是全部Java应用程序，都是通过启动脚本启动的。在这个脚本中，启动命令通常向JVM传递必要的参数，以指定应用程序的需求，例如最大和最小内存要求。

假设我们有一个打包为_MyApp.jar_的应用程序，让我们看看一个包含主要JMX配置参数的示例启动命令：

```
java -Dcom.sun.management.jmxremote.port=8080 -Dcom.sun.management.jmxremote.ssl=false -Dcom.sun.management.jmxremote.authenticate=false -Xms1024m -Xmx1024m -jar MyApp.jar
```

在上面的命令中，_MyApp.jar_通过端口8080配置了开箱即用的监控能力。此外，为了简单起见，我们停用了SSL加密和密码认证。

在公共网络中，我们理想上应该在VisualVM和JVM应用程序之间的通信中进行安全设置。

### **4.2. VisualVM配置**

现在我们已经在本地运行了VisualVM，并且_MyApp.jar_在远程服务器上运行，我们可以开始我们的远程监控会话。

右键点击左侧面板，选择_添加JMX连接_：

![img](https://www.baeldung.com/wp-content/uploads/2021/12/visualvm-jmx-connection.png)

在弹出的对话框中的_连接_字段中输入_host:port_组合，然后点击_OK_。

如果成功，我们现在应该能够通过双击左侧面板中的新连接看到一个监控窗口：

![img](https://www.baeldung.com/wp-content/uploads/2021/12/visualvm-remote-monitor.png)

## **5. 结论**

在本文中，我们探讨了使用VisualVM和JMX对Java应用程序进行远程监控。