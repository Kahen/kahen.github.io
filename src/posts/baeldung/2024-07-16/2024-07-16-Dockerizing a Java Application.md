---
date: 2024-07-16
category:
  - Docker
  - Java
tag:
  - Java
  - Docker
  - 容器化
head:
  - - meta
    - name: keywords
      content: Docker, Java, 容器化, Java 应用
------
# Docker化 Java 应用程序

## 1. 概述

在本文中，我们将展示如何将基于 Java 的可运行 jar 应用程序 Docker 化。请务必了解使用 Docker 的好处。

## 2. 构建可运行的 Jar

我们将使用 Maven 来构建一个可运行的 jar。

因此，我们的应用程序有一个简单的类，_HelloWorld.java_，其中包含一个 _main_ 方法：

```java
public class HelloWorld {
    public static void main(String[] args){
        System.out.println("Welcome to our application");
    }
}
```

我们使用 _maven-jar-plugin_ 来生成一个可运行的 jar：

```xml
`<plugin>`
   `<groupId>`org.apache.maven.plugins`</groupId>`
   `<artifactId>`maven-jar-plugin`</artifactId>`
   `<version>`${maven-jar-plugin.version}`</version>`
   `<configuration>`
      `<archive>`
         `<manifest>`
            `<mainClass>`com.baeldung.HelloWorld`</mainClass>`
         `</manifest>`
      `</archive>`
   `</configuration>`
`</plugin>`
```

## 3. 编写 Dockerfile

让我们编写 Dockerfile 来 Docker 化我们的可运行 jar。Dockerfile 位于构建上下文的根目录：

```Dockerfile
FROM openjdk:17-jdk-alpine
MAINTAINER baeldung.com
COPY target/docker-java-jar-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]
```

在这里，第一行，我们从他们的官方仓库导入 OpenJDK Java 版本 17 镜像作为我们的基镜像。随后的行将在这一基镜像上**创建额外的层**。

在第二行，我们指定了我们镜像的维护者，这里是 _baeldung.com_。这一步不创建任何额外的层。

在第三行，我们通过将生成的 jar，《docker-java-jar-0.0.1-SNAPSHOT.jar》，从构建上下文的 _target_ 文件夹复制到容器的 _root_ 文件夹中，并命名为 _app.jar_，来创建一个新的层。

最后，在最后一行，**我们指定了主要应用程序与统一的命令，该命令将为这个镜像执行**。在这种情况下，我们告诉容器使用 _java -jar_ 命令运行 _app.jar_。同样，这一行也不引入任何额外的层。

## 4. 构建和测试镜像

现在我们有了 Dockerfile，让我们使用 Maven 来构建和打包我们的可运行 jar：

```shell
mvn package
```

之后，让我们构建我们的 Docker 镜像：

```shell
docker image build -t docker-java-jar:latest .
```

在这里，我们使用 _-t_ 标志来指定一个 **名称和标签在 _\u003cname\u003e:\u003ctag\u003e_ 格式**。在这种情况下，_docker-java-jar_ 是我们的镜像名称，标签是 _latest_。“.” 表示我们的 Dockerfile 所在的路径。在这个例子中，它只是当前目录。

注意：我们可以构建具有相同名称但不同标签的不同 Docker 镜像。

最后，让我们从命令行运行我们的 Docker 镜像：

```shell
docker run docker-java-jar:latest
```

上述命令通过名称和标签在 _\u003cname\u003e:\u003ctag\u003e_ 格式中识别我们的 Docker 镜像。

## 4. 结论

在本文中，我们看到了 Docker 化可运行 Java jar 的涉及的步骤。本文中使用的代码示例可在 GitHub 上获取。