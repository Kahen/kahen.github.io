---
date: 2024-06-27
category:
  - Development Tools
  - Configuration
tag:
  - Gradle
  - Proxy
head:
  - - meta
    - name: keywords
      content: Gradle, Proxy Configuration, Build Automation, Development
---
# Gradle代理配置

代理服务器充当客户端和服务器之间的中介。它根据特定标准帮助评估来自客户端的请求，然后将其转发到目标服务器。这为系统提供了灵活性，以确定是否连接到某个网络。

在本教程中，我们将学习如何配置Gradle以在代理服务器后面工作。以我们的示例为例，我们的代理正在localhost上运行，代理端口为3128，用于HTTP和HTTPS连接。

我们可以配置Gradle在有或没有认证凭据的情况下在代理服务器后面工作。

### 2.1. 基本代理配置

首先，让我们设置一个不需要认证凭据的基本代理配置。首先，让我们在Gradle项目的根目录中创建一个名为_gradle.properties_的文件。

接下来，在_gradle.properties_文件中定义代理服务器的系统属性：

```
systemProp.http.proxyHost=localhost
systemProp.http.proxyPort=3128
systemProp.https.proxyHost=localhost
systemProp.https.proxyPort=3128
```

在这里，我们定义了Gradle在构建过程中将使用的系统属性。我们为HTTP和HTTPS连接定义了系统属性。在这种情况下，它们具有相同的主机名和代理端口。

此外，我们还可以在_gradle.properties_文件中指定一个主机，以绕过代理服务器：

```
systemProp.http.nonProxyHosts=*.nonproxyrepos.com
systemProp.https.nonProxyHosts=*.nonproxyrepos.com
```

在上面的配置中，子域_nonproxyrepos.com_将绕过代理服务器，并直接从服务器请求资源。

或者，我们可以通过终端使用系统属性作为选项运行_./gradlew build_命令：

```
$ ./gradlew -Dhttp.proxyHost=localhost -Dhttp.proxyPort=3128 -Dhttps.proxyHost=localhost -Dhttps.proxyPort=3128 build
```

在这里，我们通过终端定义了连接到代理服务器的系统属性。

**值得注意的是，通过终端定义的系统属性会覆盖_gradle.properties_文件的配置。**

### 2.2. 添加认证凭据

在代理受到保护的情况下，我们可以在_gradle.properties_文件中添加认证凭据：

```
systemProp.http.proxyUser=Baeldung
systemProp.http.proxyPassword=admin
systemProp.https.proxyUser=Baeldung
systemProp.https.proxyPassword=admin
```

在这里，我们通过定义用户名和密码的系统属性来添加认证凭据。同时，我们也为HTTP和HTTPS连接实现了认证凭据。

或者，我们可以通过终端指定用户名和密码：

```
$ ./gradlew -Dhttp.proxyHost=localhost -Dhttp.proxyPort=3128 -Dhttps.proxyHost=localhost -Dhttps.proxyPort=3128 -Dhttps.proxyUser=Baeldung -Dhttps.proxyPassword=admin build
```

在这里，我们在终端命令中包含了认证凭据。

## 3. 可能的错误

**如果主机名和代理端口不正确，可能会发生错误：**

```
> Could not get resource 'https://repo.maven.apache.org/maven2/io/micrometer/micrometer-core/1.12.0/micrometer-core-1.12.0.pom'.
> Could not GET 'https://repo.maven.apache.org/maven2/io/micrometer/micrometer-core/1.12.0/micrometer-core-1.12.0.pom'.
> localhosty: Name or service not known
```

在这里，构建失败是因为我们错误地将代理主机写成了“_localhosty_”，而不是“_localhost_”。

此外，如果我们在_gradle.properties_文件和命令行中定义了系统属性，命令行定义在构建过程中具有最高优先级：

```
$ ./gradlew -Dhttp.proxyHost=localhost -Dhttp.proxyPort=3120 -Dhttps.proxyHost=localhost -Dhttps.proxyPort=3120 build
```

在这里，命令行中的代理端口值是3120，这是错误的。_gradle.properties_文件中的代理端口值是3128，这是正确的。然而，构建失败，并出现以下错误消息：

```
> Could not get resource 'https://repo.maven.apache.org/maven2/io/micrometer/micrometer-core/1.12.0/micrometer-core-1.12.0.pom'.
> Could not GET 'https://repo.maven.apache.org/maven2/io/micrometer/micrometer-core/1.12.0/micrometer-core-1.12.0.pom'.
> Connect to localhost:3120 [localhost/127.0.0.1, localhost/0:0:0:0:0:0:0:1] failed: Connection refused
```

在这里，代理服务器拒绝了连接，因为**命令行参数中的代理端口定义是错误的，尽管_gradle.properties_文件中的代理端口值是正确的**。命令行参数定义优先于_gradle.properties_的值。

此外，如果认证凭据在受保护的代理服务器上是错误的，代理服务器也会拒绝连接。为了避免这些错误，需要正确检查配置。

## 4. 结论

在本文中，我们学习了如何通过在_gradle.properties_文件中定义所需的系统属性来配置Gradle在代理后面工作。我们还看到了如何通过终端定义系统属性。最后，我们看到了一些容易犯的错误以及如何避免它们。

如往常一样，完整的示例代码可在GitHub上找到。