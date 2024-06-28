---
date: 2023-10-10
category:
  - GlassFish
  - Eclipse
tag:
  - GlassFish Server
  - Java Enterprise
head:
  - - meta
    - name: keywords
      content: GlassFish, Eclipse IDE, Java Enterprise applications, application server
------
# 在Eclipse中配置GlassFish服务器

## 1. 概述

**GlassFish服务器是一个用于开发和部署Java企业应用的开源应用程序服务器**。此外，它还提供对Web容器、负载均衡、配置和管理的控制台等的支持。

在本教程中，我们将一步一步学习如何在Eclipse IDE中配置GlassFish服务器。

要在Eclipse IDE中配置GlassFish服务器，我们必须在我们的机器上安装Eclipse IDE for Enterprise Java and Web Developers。

Eclipse IDE for Enterprise Java Developers扩展了标准Eclipse IDE的功能。它具有额外的工具来启动Java EE/Jakarta EE应用程序。

### 2.1. GlassFish工具

Eclipse IDE for Enterprise Java Developers默认情况下捆绑了设置流行Web服务器如Tomcat、WebSphere等的工具。然而，GlassFish工具不是默认安装的。

Oracle Enterprise Pack for Eclipse包含了Eclipse GlassFish工具。让我们将插件仓库“_http://download.oracle.com/otn_software/oepe/12.2.1.8/oxygen/repository/dependencies/_”添加到Eclipse IDE中以安装GlassFish工具。

首先，让我们点击菜单栏上的_Help_选项，然后选择_Install New Software_。然后，让我们添加Oracle Enterprise Pack的链接以安装GlassFish工具：

![img](https://www.baeldung.com/wp-content/uploads/2023/10/install_glassfishtool_from_oracle_pack.png)

在这里，我们添加Oracle Enterprise Pack的链接并按_Enter_键。所有可用的软件都被加载了，但我们感兴趣的是GlassFish工具。因此，我们选择GlassFish工具并点击_Next_按钮安装工具。

安装完成后，让我们重新启动Eclipse IDE并检查GlassFish工具。首先，让我们点击菜单栏上的_Windows_选项。接下来，让我们点击_Show View_选项。最后，让我们选择_Servers_选项：

![img](https://www.baeldung.com/wp-content/uploads/2023/10/server_view_within_eclipse.png)

我们现在在视图中有了_Servers_。让我们点击“_Create New Server_”链接以查看GlassFish工具：

![img](https://www.baeldung.com/wp-content/uploads/2023/10/glassfish_tool_in_eclipse.png)

**值得注意的是，Eclipse IDE for Enterprise Java Developer当前的GlassFish工具仅支持GlassFish版本1、3和5。**

### 2.2. 设置GlassFish服务器

此外，让我们下载GlassFish 5.1并将其解压到一个文件夹中。**值得注意的是，GlassFish 5.1仅支持Java 8。**

接下来，让我们在_Servers_视图中点击_Create a new server_。这将打开服务器工具，让我们选择_GlassFish_：

![img](https://www.baeldung.com/wp-content/uploads/2023/10/add_new_glassfish_server_runtime.png)

在这里，我们点击_Create a new server_并选择GlassFish。此外，我们点击_Add_选项通过指定解压的GlassFish服务器的路径来创建GlassFish运行时环境。

或者，我们可以在_Servers_视图中右键单击并选择“_New_”选项以添加新服务器。

点击_Add_选项后，让我们指定服务器和JDK的路径：

![img](https://www.baeldung.com/wp-content/uploads/2023/10/glass_fish_runtime_property.png)

在上面的图片中，我们定义了GlassFish服务器和JDK的路径。最后，我们点击_Finish_按钮添加GlassFish运行时属性。

接下来，让我们回到_New Server_视图并选择我们刚刚创建的GlassFish服务器运行时：

![img](https://www.baeldung.com/wp-content/uploads/2023/10/select_glassfish_runtime_configuration.png)

_Next_按钮将我们带到一个页面，定义服务器属性，如_Admin password_：

为了简单起见，我们没有定义管理员用户名和密码。

_Next_按钮将我们带到一个页面，向服务器添加资源：

我们的目标是设置一个服务器，所以我们让配置框保持为空并点击_Finish_。

服务器现在已完全设置好，可以从_Servers_视图中进行评估：

服务器现在已列在_Servers_视图中。接下来，让我们选择它并点击开始按钮启动服务器。

最后，让我们在浏览器中打开URL“_http://localhost:8080_”以查看运行中的服务器：

上面的图片显示了运行中服务器的索引页面。

## 3. 结论

在本文中，我们学习了如何通过逐步指南在Eclipse IDE中设置GlassFish服务器。

此外，我们还看到了如何通过Oracle Enterprise Pack安装Eclipse GlassFish工具。