---
date: 2022-04-01
category:
  - Docker
  - Java
tag:
  - Java WAR
  - Docker
head:
  - - meta
    - name: keywords
      content: Docker, Java, WAR, Tomcat, Deployment
---

# 在Docker容器中部署Java WAR文件

在本教程中，我们将学习如何在Docker容器内部署Java WAR文件。
我们将在Apache Tomcat上部署WAR文件，Apache Tomcat是一个免费且开源的Web服务器，在Java社区中广泛使用。

WAR（Web Application Archive）是一个压缩归档文件，它打包了所有与Web应用程序相关的文件及其目录结构。

为了让事情变得简单，将WAR文件部署到Tomcat上无非就是将该WAR文件复制到Tomcat服务器的部署目录中。在Linux中，部署目录是\_$CATALINA_HOME/webapps\_。\_$CATALINA_HOME\_表示Tomcat服务器的安装目录。

之后，我们需要**重启Tomcat服务器**，这将提取部署目录中的WAR文件。

假设我们有一个WAR文件，即我们的应用程序_ROOT.war_，我们需要将其部署到Tomcat服务器上。
为了实现我们的目标，我们首先需要创建一个Dockerfile。这个Dockerfile将包括运行我们的应用程序所需的所有依赖项。
接下来，我们将使用这个Dockerfile创建一个Docker镜像，然后启动Docker容器。

现在让我们一步步深入了解这些步骤。

### 3.1 创建Dockerfile
我们将使用最新的Tomcat Docker镜像作为我们Dockerfile的基础镜像。使用此镜像的优势在于所有必要的依赖项/包已经预安装。例如，如果我们使用最新的Ubuntu/CentOS Docker镜像，那么我们需要手动安装Java、Tomcat和其他所需的包。
由于所有必需的包已经安装，我们所要做的就是将WAR文件，即_ROOT.war_，复制到Tomcat服务器的部署目录中。就这些！

让我们更仔细地看看：
```
$ ls
Dockerfile  ROOT.war
$ cat Dockerfile
FROM tomcat

COPY ROOT.war /usr/local/tomcat/webapps/
```

**_$CATALINA_HOME/webapps_表示Tomcat的部署目录**。在这里，Tomcat的官方Docker镜像中的_CATALINA_HOME_是_/usr/local/tomcat_。因此，完整的部署目录将是_/usr/local/tomcat/webapps_。

我们在这里使用的应用程序非常简单，不需要任何其他依赖项。

### 3.2 构建Docker镜像
现在让我们使用我们刚刚创建的Dockerfile创建Docker镜像：
```
$ pwd
/baeldung
$ ls
Dockerfile  ROOT.war
$ docker build -t myapp .
Sending build context to Docker daemon  19.97kB
Step 1/2 : FROM tomcat
 ---＞ 710ec5c56683
Step 2/2 : COPY ROOT.war /usr/local/tomcat/webapps/
 ---＞ Using cache
 ---＞ 8b132ab37a0e
Successfully built 8b132ab37a0e
Successfully tagged myapp:latest
```

_docker build_命令将创建一个带有标签_myapp_的Docker镜像。

**确保从包含Dockerfile的目录内构建Docker镜像**。在我们上面的例子中，我们在构建Docker镜像时位于_/baeldung_目录中。

### 3.3 运行Docker容器
到目前为止，我们已经创建了一个Dockerfile，并从中构建了一个Docker镜像。现在让我们运行Docker容器：
```
$ docker run -itd -p 8080:8080 --name my_application_container myapp
e90c61fdb4ac85b198903e4d744f7b0f3c18c9499ed6e2bbe2f39da0211d42c0
$ docker ps
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS                    NAMES
e90c61fdb4ac        myapp               "catalina.sh run"   6 seconds ago       Up 5 seconds        0.0.0.0:8080->8080/tcp   my_application_container
```

这个命令将使用Docker镜像_myapp_启动一个名为_my_application_container_的Docker容器。

**Tomcat服务器的默认端口是8080**。因此，在启动Docker容器时，确保始终将容器端口8080与任何可用的主机端口绑定。在这里，我们为了简单起见使用了主机端口8080。

### 3.4 验证设置
现在让我们验证我们到目前为止所做的一切。我们将在浏览器中访问URL_http://`<IP>`:`<PORT>`_来查看应用程序。
在这里，_IP_表示Docker主机机器的公共IP（或某些情况下的私有IP）。_PORT_是我们在运行Docker容器时暴露的容器端口（在我们的例子中是8080）。

我们还可以使用Linux中的_curl_实用程序来验证设置：
```
$ curl http://localhost:8080
Hi from Baeldung!!!
```

在上面的命令中，我们从Docker主机机器执行命令。因此，我们能够使用_localhost_连接到应用程序。作为响应，_curl_实用程序打印了应用程序网页的原始HTML。

## 4 结论
在本文中，我们学习了如何在Docker容器中部署Java WAR文件。我们首先使用官方Tomcat Docker镜像创建了Dockerfile。然后，我们构建了Docker镜像并运行了应用程序容器。
最后，我们通过访问应用程序URL来验证了设置。