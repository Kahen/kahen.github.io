---
date: 2022-12-01
category:
  - Spring Boot
  - Camunda
tag:
  - workflow
  - BPMS
head:
  - - meta
    - name: keywords
      content: Spring Boot, Camunda, embedded engine, workflow engine, business process automation
---
# 在Spring Boot应用程序中使用嵌入式Camunda引擎

工作流引擎在业务流程自动化中扮演着重要角色。**Camunda平台是一个开源的工作流和业务流程管理系统（BPMS），它为业务流程建模提供了一个流程引擎**。Spring Boot与Camunda平台有很好的集成。在本教程中，我们将探讨如何将嵌入式Camunda引擎集成到Spring Boot应用程序中。

### 2. Camunda工作流引擎

Camunda工作流引擎是Activiti的一个分支，提供了一个基于业务流程建模符号2.0（BPMN 2.0）标准的流程和仿真引擎。此外，它还包含了用于建模、执行和监控的工具和API。首先，我们可以使用**Modeler**建模我们的端到端业务流程。Camunda提供了用于设计BPMN工作流的Modeler。Modeler作为一个桌面应用程序本地运行。然后，我们将业务流程模型部署到工作流引擎并执行它。我们可以使用REST API和提供的Web应用程序（Cockpit、Tasklist和Admin）以不同的方式执行业务流程。Camunda引擎可以以不同的方式使用：SaaS、自托管和可嵌入的库。**本教程重点介绍在Spring Boot应用程序中的Camunda嵌入式引擎**。

### 3. 使用嵌入式Camunda引擎创建Spring Boot应用程序

在这一部分中，我们将使用Camunda Platform Initializr创建和配置带有嵌入式Camunda引擎的Spring Boot应用程序。

#### 3.1. Camunda平台Initializr

**我们可以使用Camunda Platform Initializr创建一个与Camunda引擎集成的Spring Boot应用程序**。它是由Camunda提供的Web应用程序工具，类似于Spring Initializr。让我们使用以下信息在Camunda Platform Initializr中创建应用程序：![img](https://www.baeldung.com/wp-content/uploads/2022/12/init.png) 该工具允许我们添加项目元数据，包括_组_、_工件_、_Camunda BPM版本_、_H2数据库_和_Java版本_。此外，我们可以添加_Camunda BPM模块_以支持我们的Spring Boot应用程序中的Camunda REST API或Camunda Web应用程序。我们还可以添加Spring Boot Web和Security模块。我们有的另一个选项是设置管理员用户名和密码，这是使用Camunda Web应用程序（如Cockpit应用程序登录）所需的。现在，我们点击生成项目以下载项目模板作为.zip文件。最后，我们解压文件并在IDE中打开_pom.xml_。

#### 3.2. Camunda配置

生成的项目是一个**带有额外Camunda依赖项和配置的常规Spring Boot应用程序**。目录结构如下所示：

![img](https://www.baeldung.com/wp-content/uploads/2022/12/camunda_proyect.png)

在_resources_目录中有一个简单的工作流图_process.bpmn_。它使用开始节点启动执行流程。之后，它将继续执行_向演示问好_任务。在完成此任务后，执行在遇到最终节点时停止。Camunda属性存在于_application.yaml_中。让我们看看_application.yaml_中生成的默认Camunda属性：

```
camunda.bpm.admin-user:
  id: demo
  password: demo
```

我们可以使用_camunda.bpm.admin-user_属性更改管理员用户名和密码。

### 4. 使用Spring Boot创建应用程序

使用嵌入式Camunda引擎创建Spring Boot应用程序的另一种方式是从零开始使用Spring Boot并添加Camunda库。

#### 4.1. Maven依赖项

让我们从在我们的_pom.xml_中声明_camunda-bpm-spring-boot-starter-webapp_依赖项开始：

```
```<dependency>```
    ```<groupId>```org.camunda.bpm.springboot```</groupId>```
    ```<artifactId>```camunda-bpm-spring-boot-starter-webapp```</artifactId>```
    `<version>`7.18.0`</version>`
```</dependency>```
```

我们需要一个数据库来存储流程定义、流程实例、历史信息等。在本教程中，我们使用基于文件的_H2_数据库。因此，我们需要添加_h2_和_spring-boot-starter-jdbc_依赖项：

```
```<dependency>```
    ```<groupId>```com.h2database```</groupId>```
    ```<artifactId>```h2```</artifactId>```
```</dependency>```
```<dependency>```
    ```<groupId>```org.springframework.boot```</groupId>```
    ```<artifactId>```spring-boot-starter-jdbc```</artifactId>```
```</dependency>```
```

#### 4.2. 示例流程模型

我们使用Camunda Modeler定义一个简单的贷款请求工作流图_loanProcess.bpmn_。这里是_loanProcess_ _.bpmn_模型执行顺序的图形流程图，以帮助我们理解：

![img](https://www.baeldung.com/wp-content/uploads/2022/12/loanProcess.png)

我们使用开始节点启动执行流程。之后，执行_计算利息_任务。接下来，我们将继续执行_批准贷款_任务。在完成此任务后，执行在遇到最终节点时停止。_计算利息_任务是一个服务任务，并调用_CalculateInterestService_ bean：

```
@Component
public class CalculateInterestService implements JavaDelegate {

    private static final Logger LOGGER = LoggerFactory.getLogger(CalculateInterestService.class);

    @Override
    public void execute(DelegateExecution execution) {
        LOGGER.info("calculating interest of the loan");
    }

}
```

**我们需要实现_JavaDelegate_接口**。这个类可以用于服务任务和事件监听器。**它在流程执行期间在_execute()_方法中提供了所需的逻辑**。现在，应用程序已经准备好启动了。

### 5. 演示

现在让我们运行Spring Boot应用程序。我们打开浏览器并输入URL http://localhost:8080/：

![img](https://www.baeldung.com/wp-content/uploads/2022/12/camunda_login.png)

让我们输入用户凭据并访问Camunda Web应用程序Cockpit、Tasklist和Admin：

![img](https://www.baeldung.com/wp-content/uploads/2022/12/camunda_welcome.png)

#### 5.1. Cockpit应用程序

**Camunda Cockpit Web应用程序为用户提供了监控实施流程及其操作的实时视图**。我们可以看到当Spring Boot应用程序启动时自动部署的流程数量：

![img](https://www.baeldung.com/wp-content/uploads/2022/12/camunda_cockpit.png)

如我们所见，有一个部署的流程（_loanProcess_ _.bpmn_）。我们可以通过点击部署的流程来查看部署的流程图：

现在，流程尚未启动。我们可以使用Tasklist应用程序启动它。

#### 5.2. Tasklist应用程序

**Camunda Tasklist应用程序用于管理用户与他们任务的交互**。我们可以通过点击开始流程菜单项来启动我们的示例流程：

启动流程后，执行_计算利息_任务。它记录在控制台中：

```
2022-11-27 09:34:05.848 INFO 2748 --- [nio-8080-exec-3] c.e.c.task.CalculateInterestService : calculating interest of the loan
```

现在，我们可以看到在Cockpit应用程序中运行的流程实例：

注意，流程正在等待_批准贷款_用户任务。在这一步中，我们将任务分配给_demo_用户。因此，_demo_用户可以在Tasklist应用程序中看到任务：

我们可以通过点击完成按钮来完成任务。最后，我们可以看到在Cockpit应用程序中运行的流程已经完成。

#### 5.3. Admin应用程序

**Camunda Admin应用程序用于管理用户及其对系统的访问**。此外，我们可以管理租户和组：

### 6. 结论

在本文中，我们讨论了使用嵌入式Camunda引擎设置Spring Boot应用程序的基础知识。我们使用Camunda Platform Initializr工具和从头开始的Spring Boot创建了应用程序。此外，我们使用Camunda Modeler定义了一个简单的贷款请求流程模型。此外，我们使用Camunda Web应用程序启动并探索了这个流程模型。本文所示代码的工作版本可在GitHub上找到。