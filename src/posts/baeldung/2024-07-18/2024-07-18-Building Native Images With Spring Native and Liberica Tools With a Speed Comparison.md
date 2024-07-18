---
date: 2022-04-01
category:
  - Spring Native
  - Liberica
tag:
  - Spring Boot
  - GraalVM
  - Native Image
head:
  - - meta
    - name: keywords
      content: Spring Native, Liberica, GraalVM, Native Image
------
# 使用Spring Native和Liberica工具构建原生镜像及其启动速度比较

## 1. 概述

随着微服务架构的流行，庞大的单体应用程序正在成为过去。Java并没有停滞不前，而是在适应现代需求。例如，Oracle、Red Hat、BellSoft和其他贡献者正在积极开发GraalVM项目。此外，针对微服务的框架Quarkus一年前发布。就Spring Boot而言，VMware已经致力于Spring Native项目两年了。

由于VMware和BellSoft的合作，Spring Native成为了一个端到端的原生镜像解决方案，其中包括基于GraalVM源代码的Liberica原生镜像工具包。Spring Native和Liberica NIK允许开发人员创建优化资源消耗并最小化启动时间的Spring Boot应用程序的原生可执行文件。

在本教程中，我们将通过三种方式构建并运行同一个应用程序，了解如何使用原生镜像技术与Spring Boot应用程序——作为一个经典的JAR文件；作为使用Liberica JDK和Spring Native的原生镜像容器；以及使用Liberica原生镜像工具包的原生镜像。然后我们将比较它们的启动速度。在每种情况下，我们都将以Spring Native项目中的petclinic JDBC应用程序为例。

## 2. 安装Liberica JDK

首先，让我们安装系统的Java运行时。我们可以访问Liberica JDK下载页面并选择我们平台的版本。让我们使用JDK 11，x86 Linux标准JDK包。

安装Liberica JDK有两种方法。一种是通过包管理器，或者通过下载.tar.gz包（对于Windows是.zip包）。

后者是一种更高级的方法，但不用担心，它只需要四个步骤。我们首先需要更改到我们想要安装的目录：
```shell
cd directory_path_name
```

在不离开目录的情况下，我们可以运行：
```shell
wget https://download.bell-sw.com/java/11.0.14.1+1/bellsoft-jdk11.0.14.1+1-linux-amd64.tar.gz
```

如果我们没有wget命令，我们可以通过brew install wget（对于Linux和Mac）来安装它。

这样，我们将解包运行时到我们所在的目录：
```shell
tar -zxvf bellsoft-jdk11.0.14.1+1-linux-amd64.tar.gz
```

安装完成后，如果我们想要节省磁盘空间，可以删除.tar.gz文件。

最后，我们需要通过指向Liberica JDK目录来设置_JAVA_HOME_变量：
```shell
export JAVA_HOME=$(pwd)/jdk-11.0.14.1
```

**请注意：macOS和Windows用户可以参阅Liberica JDK安装指南获取说明。**

## 3. 获取Spring Native项目

我们可以通过运行以下命令获取带有petclinic应用程序样本的Spring Native项目：
```shell
git clone https://github.com/spring-projects-experimental/spring-native.git
```

## 4. 构建JAR文件

我们希望在整个Spring Native项目中使用一个样本，因此通过运行以下命令进入带有spring petclinic JDBC的目录：
```shell
export PROJECT_DIR=$(pwd)/spring-native/samples/petclinic-jdbc && cd $PROJECT_DIR
```

要构建JAR文件，我们可以应用此命令：
```shell
./mvnw clean install
```

这将为我们提供一个24 MB的_target/petclinic-jdbc-0.0.1-SNAPSHOT.jar_。我们将通过运行以下命令来测试它：
```shell
java -jar target/petclinic-jdbc-0.0.1-SNAPSHOT.jar
```

## 5. 使用Liberica JDK构建原生镜像容器

现在让我们将我们的应用程序容器化。

确保我们的Docker守护进程正在运行。注意，如果我们使用Windows或macOS x86，我们需要为Docker分配至少8 GB的内存。从Spring petclinic JDBC应用程序目录，我们需要输入以下命令：
```shell
./mvnw spring-boot:build-image
```

这将构建一个原生镜像容器，我们可以使用以下命令启动：
```shell
docker run -it docker.io/library/petclinic-jdbc:0.0.1-SNAPSHOT
```

如果我们使用Apple M1，这一步将不可用，因为缺少Docker所需的构建包。然而，最新版本的Liberica原生镜像工具包完全兼容Apple Silicon，因此我们可以进入下一步，使用NIK构建原生镜像。

## 6. 使用Liberica NIK构建原生镜像

我们将使用Liberica原生镜像工具包构建另一个版本的petclinic原生镜像。下面我们可以找到为Linux安装NIK的步骤。对于macOS或Windows，让我们参考Liberica NIK安装指南。

我们首先需要更改到我们想要安装的目录：
```shell
cd directory_path_name
```

然后我们下载适用于我们平台的Liberica NIK Core。它包含Liberica VM和基于GraalVM的原生镜像工具包，没有额外的语言，因此是构建Java原生镜像的绝佳工具。

在我们的情况下，我们将获取适用于Linux的Java 11版本的NIK：
```shell
wget https://download.bell-sw.com/vm/22.0.0.2/bellsoft-liberica-vm-openjdk11-22.0.0.2-linux-amd64.tar.gz
```

然后我们通过运行以下命令解包文件：
```shell
tar -xzf bellsoft-liberica-vm-openjdk11-22.0.0.2-linux-amd64.tar.gz
```

通过指向Liberica NIK来定义$JAVA_HOME变量：
```shell
export JAVA_HOME=$(pwd)/bellsoft-liberica-vm-openjdk11-22.0.0.2
```

现在，我们进入petclinic JDBC应用程序目录：
```shell
cd $PROJECT_DIR
```

我们可以通过运行以下命令创建原生镜像：
```shell
./mvnw -Pnative install
```

它涉及构建的“native”配置文件，并生成了102.3 MB大小的_target/petclinic-jdbc_二进制文件。

## 7. 比较启动时间

现在让我们测试我们的应用程序和镜像的速度。我们使用带有SSD的Intel(R) Core(TM) i7-8750H CPU PC来运行它们：

- JAR文件启动大约需要3.3秒
- 我们构建的第一个容器启动大约需要0.07秒
- 使用NIK Core制作的原生镜像启动时间为0.068秒。

## 8. 结论

即使项目仍处于Beta阶段，Spring原生镜像的构建和运行都非常出色。启动时间的减少是巨大的。

我们可以期待当Spring Native与Liberica原生镜像工具包一起发布时，作为构建原生镜像的端到端解决方案，将获得更好的结果。