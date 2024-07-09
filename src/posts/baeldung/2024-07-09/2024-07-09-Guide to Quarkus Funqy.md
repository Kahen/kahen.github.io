---
date: 2024-07-09
category:
  - Java
  - Quarkus
tag:
  - Funqy
  - Serverless
head:
  - - meta
    - name: keywords
      content: Java, Quarkus, Funqy, Serverless, Deployment, Kubernetes, Knative, FAAS
---

# Quarkus Funqy 指南

1. 概述

Quarkus 允许我们交付具有极快启动时间和较低首次接触响应时间的小体量构件。

在本教程中，我们将探索 Quarkus 框架的 Funqy 扩展。

2. 什么是 Funqy？

Quarkus Funqy 是一种解决方案，旨在提供一种便携的 Java API，允许我们编写无服务器函数。我们可以轻松地将这些函数部署到 FAAS（功能即服务）环境中，如 AWS Lambda、Azure Functions、Google Cloud Functions 和 Kubernetes Knative。我们也可以将它们作为独立服务使用。

3. 实现

让我们使用 Quarkus Funqy 创建一个简单的问候函数，并将其部署在 FAAS 基础设施上。我们可以使用 Quarkus Web 界面创建项目。我们也可以通过执行以下命令使用 Maven 创建项目：

```
$ mvn io.quarkus:quarkus-maven-plugin:2.7.7.Final:create \
  -DprojectGroupId=com.baeldung.quarkus \
  -DprojectArtifactId=quarkus-funqy-project \
  -Dextensions="funqy-http"
```

我们使用 `quarkus-maven-plugin` 创建项目。它将生成一个带有函数类的项目框架。

让我们将此项目导入我们的 IDE 以获得以下结构：

![img](https://www.baeldung.com/wp-content/uploads/2023/02/quarkus-project-1-172x300.png)

### 3.1. Java 代码

让我们打开 `MyFunctions.java` 文件并分析内容：

```java
public class MyFunctions {

    @Funq
    public String fun(FunInput input) {
        return String.format("Hello %s!", input != null ? input.name : "Funqy");
    }

    public static class FunInput {
        public String name;
        // 构造函数，getter，setter
    }
}
```

**注解 `@Funq` 标记方法作为入口点函数。** 最多只能有一个方法参数，该参数可能或不返回响应。默认的函数名称是注解方法的名称；我们可以通过在 `@Funq` 注解中传递名称字符串来更新它。

让我们将名称更新为 `GreetUser` 并添加一个简单的日志语句：

```java
@Funq("GreetUser")
public String fun(FunInput input) {
    log.info("Function Triggered");
    ...
}
```

4. 部署

现在让我们打开 `MyFunctionTest.java` 类并更新所有测试用例中提到的路径中的方法名称。我们首先通过运行以下命令在本地运行它：

```
$ ./mvnw quarkus:dev
```

它将启动服务器并执行测试用例。

让我们使用 `curl` 进行测试：

```
$ curl -X POST 'http://localhost:8080/GreetUser' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Baeldung"
}'
```

它将给我们问候的响应。

### 4.1. Kubernetes Knative

现在让我们在 Kubernetes Knative 上部署它。我们将在 `pom.xml` 文件中添加 `quarkus-funqy-knative-events` 依赖项：

```xml
`<dependency>`
    `<groupId>`io.quarkus`</groupId>`
    `<artifactId>`quarkus-funqy-knative-events`</artifactId>`
    `<version>`3.0.0.Alpha3`</version>`
`</dependency>`
```

让我们用一个单元测试来测试它：

```java
@Test
public void givenFunctionAPI_whenCallWithEvent_thenShouldReturn200() {
    RestAssured.given().contentType("application/json")
      .header("ce-specversion", "1.0")
      .header("ce-id", UUID.randomUUID().toString())
      .header("ce-type", "GreetUser")
      .header("ce-source", "test")
      .body("{ \"name\": \"Baeldung\" }")
      .post("/")
      .then().statusCode(200);
}
```

现在让我们创建我们的应用程序的构建和镜像：

```
$ ./mvnw install
$ docker build -f src/main/docker/Dockerfile.jvm -t ```<ourDockerAccountName>```/quarkus-funqy-project .
$ docker push ```<ourDockerAccountName>```/quarkus-funqy-project
```

我们将在 `src/main/kubernetes` 目录中创建 Kubernetes Knative 配置 `knative.yaml` 文件，用于资源创建：

```yaml
apiVersion: serving.knative.dev/v1
kind: Service
metadata:
  name: quarkus-funqy-project
spec:
  template:
    metadata:
      name: quarkus-funqy-project-v1
    spec:
      containers:
        - image: docker.io/```<ourDockerAccountName>```/quarkus-funqy-project
```

现在我们只需要创建一个代理，代理事件配置 YAML 文件，并部署所有这些。

让我们创建一个 `knative-trigger.yaml` 文件：

```yaml
apiVersion: eventing.knative.dev/v1
kind: Trigger
metadata:
  name: baeldung-event
spec:
  broker: baeldung
  filter:
    attributes:
      type: GreetUser
  subscriber:
    ref:
      apiVersion: serving.knative.dev/v1
      kind: Service
      name: quarkus-funqy-project
```

```
$ kn broker create baeldung
$ kubectl apply -f src/main/kubernetes/knative.yaml
$ kubectl apply -f src/main/kubernetes/knative-trigger.yaml
```

让我们验证 pod 和 pod 日志，因为 pod 应该正在运行。如果我们没有发送任何事件，pod 将自动缩放到零。让我们获取代理 URL 以发送事件：

```
$ kubectl get broker baeldung -o jsonpath='{.status.address.url}'
```

现在，我们可以从任何 pod 发送事件到这个 URL，并看到如果我们的 Quarkus 应用程序已经关闭，它将启动一个新的 pod。我们还可以通过检查日志来验证我们的函数是否被触发：

```
$ curl -v "`<our_broker_url>`"
  -X POST
  -H "Ce-Id: 1234"
  -H "Ce-Specversion: 1.0"
  -H "Ce-Type: GreetUser"
  -H "Ce-Source: curl"
  -H "Content-Type: application/json"
  -d "{ \"name\": \"Baeldung\" }"
```

### 4.2. 云部署

我们可以类似地更新我们的应用程序以部署在云平台上。然而，**每个云部署只能导出一个 Funqy 函数**。如果我们的应用程序有多个 Funqy 方法，我们可以通过在 application.properties 文件中添加以下内容来指定活动函数（将 _GreetUser_ 替换为活动函数名称）：

```properties
quarkus.funqy.export=GreetUser
```

5. 结论

在本文中，我们看到了 Quarkus Funqy 是一个很棒的补充，它帮助我们在无服务器基础设施上轻松运行 Java 函数。我们学习了 Quarkus Funqy 以及如何在无服务器环境中实现、部署和测试它。

如常，示例的完整源代码可在 GitHub 上获得。

![img](https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg)![img](https://secure.gravatar.com/avatar/dc417739e22ae675b0e1f7012bbddaa5?s=50&r=g)![img](https://secure.gravatar.com/avatar/db9b6e888453bec33b0a1b1522bae628?s=50&r=g)![img](https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png)![img](https://www.baeldung.com/wp-content/uploads/2023/02/quarkus-project-1-172x300.png)

OK