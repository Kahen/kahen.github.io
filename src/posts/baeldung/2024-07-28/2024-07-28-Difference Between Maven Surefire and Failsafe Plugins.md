---
date: 2022-06-06
category:
  - Maven
  - Testing
tag:
  - Maven
  - Surefire
  - Failsafe
head:
  - - meta
    - name: keywords
      content: Maven, Surefire, Failsafe, Testing
---
# Maven Surefire与Failsafe插件比较

## 1. 概述

在典型的测试驱动开发中，我们的目标是编写许多低级别的单元测试，这些测试运行速度快，可以独立设置。此外，还有一些高级别的集成测试，它们依赖于外部系统，例如设置服务器或数据库。不出所料，这些测试通常都是资源和时间密集型的。

因此，这些测试大多需要一些集成前的设置和集成后的清理，以实现优雅的终止。因此，区分这两种类型的测试并在构建过程中分别运行它们是可取的。

在本教程中，我们将比较Surefire和Failsafe插件，这两种插件通常用于在Apache Maven构建中运行各种类型的测试。

## 2. Surefire插件

Surefire插件属于Maven核心插件集，用于运行应用程序的单元测试。

项目POM默认包含此插件，但我们也可以显式配置它：

```xml
`<build>`
    `<pluginManagement>`
        `<plugins>`
            ```<plugin>```
                ``<groupId>``org.apache.maven.plugins``</groupId>``
                ```<artifactId>```maven-surefire-plugin```</artifactId>```
                ```<version>```3.0.0-M5```</version>```
                ....
            ```</plugin>```
        `</plugins>`
    `</pluginManagement>`
`</build>`
```

该插件绑定到默认生命周期的_test_阶段。因此，让我们使用以下命令执行它：

```shell
mvn clean test
```

这将运行我们项目中的所有单元测试。由于Surefire插件绑定到_test_阶段，如果有任何测试失败，构建将失败，并且在构建过程中不会执行后续阶段。

或者，我们可以修改插件配置以运行集成测试以及单元测试。然而，对于集成测试来说，这可能不是理想的行为，因为它们可能需要在测试执行之前进行一些环境设置，以及在测试执行后进行一些清理。

Maven为此目的提供了另一个插件。

## 3. Failsafe插件

Failsafe插件旨在运行项目中的集成测试。

### 3.1. 配置

首先，让我们在项目POM中进行配置：

```xml
```<plugin>```
    ```<artifactId>```maven-failsafe-plugin```</artifactId>```
    ```<version>```3.1.2```</version>```
    ``<executions>``
        ```<execution>```
            ```<goals>```
                ````<goal>````integration-test````</goal>````
                ````<goal>````verify````</goal>````
            ```</goals>```
            ....
        ```</execution>```
    ``</executions>``
```</plugin>```
```

在这里，插件的目标绑定到构建周期的_integration-test_和_verify_阶段，以执行集成测试。

现在，让我们从命令行执行_verify_阶段：

```shell
mvn clean verify
```

这将运行所有的集成测试，但如果在_integration-test_阶段有任何测试失败，插件不会立即使构建失败。

相反，Maven仍然执行_post-integration-test_阶段。因此，我们仍然可以在_post-integration-test_阶段执行任何清理和环境拆除。构建过程中的后续_verify_阶段报告任何测试失败。

### 3.2. 示例

在我们的示例中，我们将配置Jetty服务器在运行集成测试之前启动，并在测试执行后停止。

首先，让我们将Jetty插件添加到我们的POM中：

```xml
```<plugin>```
    ``<groupId>``org.eclipse.jetty``</groupId>``
    ```<artifactId>```jetty-maven-plugin```</artifactId>```
    ```<version>```9.4.11.v20180605```</version>```
    ....
    ``<executions>``
        ```<execution>```
            ``<id>``start-jetty``</id>``
            ``<phase>``pre-integration-test``</phase>``
            ```<goals>```
                ````<goal>````start````</goal>````
            ```</goals>```
        ```</execution>```
        ```<execution>```
            ``<id>``stop-jetty``</id>``
            ``<phase>``post-integration-test``</phase>``
            ```<goals>```
                ````<goal>````stop````</goal>````
            ```</goals>```
        ```</execution>```
    ``</executions>``
```</plugin>```
```

在这里，我们添加了配置，在_pre-integration-test_和_post-integration-test_阶段分别启动和停止Jetty服务器。

现在，让我们再次执行我们的集成测试并查看控制台输出：

```shell
....
[INFO] `<<< jetty-maven-plugin:9.4.11.v20180605:start (start-jetty)
   validate @ maven-integration-test <<<
[INFO] --- jetty-maven-plugin:9.4.11.v20180605:start (start-jetty)
   @ maven-integration-test ---
[INFO] Started ServerConnector@4b9dc62f{HTTP/1.1,[http/1.1]}{0.0.0.0:8999}
[INFO] Started @6794ms
[INFO] Started Jetty Server
[INFO]
[INFO] --- maven-failsafe-plugin:3.1.2:integration-test (default)
   @ maven-integration-test ---
[INFO]
[INFO] -------------------------------------------------------
[INFO] T E S T S
[INFO] -------------------------------------------------------
[INFO] Running com.baeldung.maven.it.FailsafeBuildPhaseIntegrationTest
[ERROR] Tests run: 1, Failures: 1, Errors: 0, Skipped: 0, Time elapsed: 0.024 s
  FAILURE! - in com.baeldung.maven.it.FailsafeBuildPhaseIntegrationTest
[ERROR] com.baeldung.maven.it.FailsafeBuildPhaseIntegrationTest.whenTestExecutes_thenPreAndPostIntegrationBuildPhasesAreExecuted
  Time elapsed: 0.012 s  FAILURE!
org.opentest4j.AssertionFailedError: expected: `<true>`` but was: ``<false>``
   at com.baeldung.maven.it.FailsafeBuildPhaseIntegrationTest
      .whenTestExecutes_thenPreAndPostIntegrationBuildPhasesAreExecuted(FailsafeBuildPhaseIntegrationTest.java:11)
[INFO]
[INFO] Results:
[INFO]
[ERROR] Failures:
[ERROR]   FailsafeBuildPhaseIntegrationTest.whenTestExecutes_thenPreAndPostIntegrationBuildPhasesAreExecuted:11
  expected: `<true>` but was: ``<false>``
[INFO]
[ERROR] Tests run: 1, Failures: 1, Errors: 0, Skipped: 0
[INFO]
[INFO] --- jetty-maven-plugin:9.4.11.v20180605:stop (stop-jetty)
   @ maven-integration-test ---
[INFO]
[INFO] --- maven-failsafe-plugin:3.1.2:verify (default)
   @ maven-integration-test ---
[INFO] Stopped ServerConnector@4b9dc62f{HTTP/1.1,[http/1.1]}{0.0.0.0:8999}
[INFO] node0 Stopped scavenging
[INFO] ------------------------------------------------------------------------
[INFO] BUILD FAILURE
[INFO] ------------------------------------------------------------------------
....
```

根据我们的配置，Jetty服务器在集成测试执行之前启动。为了演示，我们有一个失败的集成测试，但这并没有立即使构建失败。_post-integration-test_阶段在测试执行后执行，服务器在构建失败前停止。

**相比之下，如果我们使用Surefire插件来运行这些集成测试，构建将在_integration-test_阶段停止，而不会执行任何所需的清理。**

使用不同的插件来运行不同类型的测试的一个额外好处是，它们之间的配置是分离的。这提高了项目构建的可维护性。

## 4. 结论

在本文中，我们比较了Surefire和Failsafe插件，用于分离和运行不同类型的测试。我们还查看了一个示例，看到了Failsafe插件为需要进一步设置和清理的测试提供了额外的功能。

如常，代码可在GitHub上找到。