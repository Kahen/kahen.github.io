---
date: 2022-08-01
category:
  - Docker
  - IntelliJ IDEA
tag:
  - Debugging
  - Docker
  - Java
head:
  - - meta
    - name: keywords
      content: Docker, IntelliJ IDEA, Debugging, Java, Remote JVM Debug
---
# 在IntelliJ IDEA中调试运行在Docker中的应用程序

在本教程中，我们将看到如何在IntelliJ IDEA中调试Docker容器。我们假设已经准备好了用于测试的Docker镜像。构建Docker镜像有多种方法。

IntelliJ可以从未官方网站下载。

对于本文，我们将参考这个基于单个类的Java应用程序。它可以很容易地被docker化、构建和测试。

在开始测试之前，我们需要确保Docker引擎已在我们的计算机上启动并运行。

### 2. 使用_Dockerfile_配置

当使用Docker文件配置时，我们只需要选择我们的_Dockerfile_并为镜像名称、镜像标签、容器名称和配置名称提供适当的名称。如果有任何端口映射，我们也可能会添加：

![img](https://www.baeldung.com/wp-content/uploads/2022/08/configuration-using-docker-file.png)

一旦这个配置被保存，我们就可以从未选项中选择这个配置并点击调试。它首先构建镜像，在Docker引擎中注册镜像，然后运行docker化的应用程序。

### 3. 使用Docker镜像配置

当使用Docker镜像配置时，我们需要提供我们预先构建的应用程序的镜像名称、镜像标签和容器名称。我们可以使用标准的Docker命令来构建镜像并在Docker引擎中注册容器。如果有任何端口映射，我们也可能会添加：

![img](https://www.baeldung.com/wp-content/uploads/2022/08/configuration-using-docker-image.png)

一旦这个配置被保存，我们就可以从未选项中选择这个配置并点击调试。它简单地选择预先构建的Docker镜像和容器并运行它。

### 4. 使用远程JVM调试配置

远程JVM配置将自己附加到任何预先运行的Java进程。所以我们需要首先单独运行Docker容器。

这是运行Java 8的Docker镜像的命令：

```
docker run -d -p 8080:8080  -p 5005:5005 -e JAVA_TOOL_OPTIONS="-agentlib:jdwp=transport=dt_socket,address=5005,server=y,suspend=n" docker-java-jar:latest
```

如果我们使用Java 11，我们将使用这个命令代替：

```
docker run -d -p 8080:8080  -p 5005:5005 -e JAVA_TOOL_OPTIONS="-agentlib:jdwp=transport=dt_socket,address=*:5005,server=y,suspend=n" docker-java-jar:latest
```

这里_docker-java-jar_是我们的镜像名称，_latest_是它的标签。除了正常的HTTP端口8080，我们还映射了额外的端口5005，用于使用_-p_扩展进行远程调试。我们使用_-d_扩展以分离模式运行docker，并使用_-e_将_JAVA_TOOL_OPTIONS_作为环境变量传递给Java进程。

在_JAVA_TOOL_OPTIONS_中，我们传递值_-agentlib:jdwp=transport=dt_shmem,address=,server=y,suspend=n_以允许Java进程启动_JDB_调试会话，并传递值_address=*:5005_以指定5005将是我们远程调试的端口。

所以上述命令启动了我们的Docker容器，我们现在可以配置远程调试配置以连接到它：

![img](https://www.baeldung.com/wp-content/uploads/2022/08/configuration-using-remote-jvm-debug.png)

我们可以看到，在配置中我们指定了使用5005端口连接到远程JVM。

现在，如果我们从未选项中选择这个配置并点击调试，它将通过附加到已经运行的Docker容器来启动调试会话。

### 5. 结论

在本文中，我们学习了可以在IntelliJ中使用的不同配置选项来调试docker化的应用程序。