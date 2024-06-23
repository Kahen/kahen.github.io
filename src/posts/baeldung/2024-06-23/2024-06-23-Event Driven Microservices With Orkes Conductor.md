---
date: 2024-06-23
category:
  - Microservices
  - Event-Driven Architecture
tag:
  - Orkes Conductor
  - Spring
head:
  - - meta
    - name: keywords
      content: Event-Driven Microservices, Microservices Orchestration, Orkes Conductor, Spring Boot
---
# 使用Orkes Conductor构建事件驱动的微服务

在这个教程中，我们将探讨如何使用Orkes Conductor和Spring构建事件驱动的微服务。我们将使用Conductor来使用HTTP端点和服务工作器编排微服务。

微服务提供了一种很好的方式，可以创建一个可以独立扩展和管理的模块化架构。开发人员通常将微服务设计为单一责任服务，这些服务在执行一件事情上表现得非常出色。然而，应用程序流程通常需要跨多个微服务进行协调以实现业务目标。

事件驱动架构通过事件系统在微服务之间进行通信，确保流程的可扩展性和持久性。由于这些原因，事件驱动的微服务最近变得非常流行，特别是在实现异步流程时特别有用。

### 2.1. 事件驱动系统的不足

虽然在解耦服务交互方面做得很好，但事件驱动系统也带来了几个挑战：

- **难以可视化执行流程** - 所有微服务之间的通信都发生在事件总线上，因此很难可视化和理解业务流程。这使得识别、调试和从故障中恢复变得更加困难。通常，分布式跟踪和集中式日志记录被用来解决这个问题。
- **没有单一的应用程序状态权威** - 通常，每个服务都维护自己的本地数据库，该数据库作为该服务的记录系统。例如，信用卡服务可能有一个数据库，其中包含信用卡支付列表和相关信息。然而，在多个服务调用中，应用程序的整体状态是分布式的，这使得可视化应用程序流程、处理故障情况下的补偿事务以及查询给定时间点的应用程序状态变得困难。
- **易于构建，难以扩展** - 像Spring这样的框架简化了可以连接到各种pub/sub系统的事件驱动应用程序的构建。然而，开发人员经常需要投入大量的时间来解决诸如使系统运行、扩展以处理大量工作负载或构建具有非常复杂连接规则的应用程序等挑战。

## 3. 使用Conductor的事件驱动架构

**Netflix最初构建Conductor作为一个编排微服务的平台**。Netflix的开发人员设计并构建了Conductor，以创建事件驱动的微服务，并解决上述列出的一些不足。

作为一个编排器，Conductor允许我们以代码或JSON的形式定义服务执行流程，并使我们能够使用任何支持的语言SDK连接服务或编写服务工作器。**作为一个完全开源的平台，Conductor在Apache 2.0许可证下运行**。

Conductor的多语言特性允许我们用任何语言编写服务工作器，或者在单个应用程序流程中，服务和工作器可以使用不同的语言。

Conductor让我们创建可重用、单一责任原则的事件驱动服务，以响应事件。Conductor还可以用于连接通过持久队列暴露的服务。

### 4.1. 使用Orkes Conductor和Spring构建事件驱动微服务

现在，让我们探索一个示例Spring Boot应用程序，该程序利用Conductor跨微服务进行编排。

#### 4.1. 设置Orkes Conductor

Orkes Conductor可以以多种方式配置。首先，我们可以使用Docker在本地设置它，或者我们也可以利用免费的开发者沙盒Playground。

还有一个Slack社区可用，这可能是一个查询Conductor相关问题的好地方。

#### 4.2. 方法1 - 使用Docker本地安装和运行

首先，让我们确保设备上安装了Docker。

然后，我们使用以下Docker命令在端口9090上启动服务器，在端口1234上启动UI：

```
docker run --init -p 9090:8080 -p 1234:5000 --mount source=redis,target=/redis \
--mount source=postgres,target=/pgdata orkesio/orkes-conductor-community-standalone:latest
```

让我们创建一个简单的Spring Boot应用程序，它执行以下两项操作：

- 使用Conductor创建一个微服务工作器。
- 在这两个服务之间进行编排：
  - HTTP端点 https://orkes-api-tester.orkesconductor.com/api
  - 我们在第一步中创建的服务工作器。

以下是我们如何使用Conductor中的任务工作器创建一个简单的服务工作器，该工作器不需要通过HTTP端点公开：

```
@WorkerTask(value = "fraud-check-required")
public FraudCheckResult isFraudCheckRequired(BigDecimal amount) {
    return fraudCheckService.checkForFraud(amount);
}
```

让我们创建一个简单的工作流，该工作流调用示例HTTP端点以获取客户详细信息（https://orkes-api-tester.orkesconductor.com/api）和我们刚刚在上面实现的欺诈检查服务工作器并行运行。

我们使用以下命令执行工作流，结果是一个可在 http://localhost:1234/workflowDef/microservice_orchestration 访问的工作流：

```
curl -X 'POST' 'http://localhost:9090/api/metadata/workflow' \
     -H 'accept: */*' \
     -H 'Content-Type: application/json' \
     -d '{
         "name": "microservice_orchestration",
         "description": "microservice_orchestration_example_workflow",
         "version": 1,
         "tasks": [
             {
                 "name": "fork_task",
                 "taskReferenceName": "fork_task_ref",
                 "inputParameters": {},
                 "type": "FORK_JOIN",
                 "forkTasks": [
                     [
                         {
                             "name": "fraud-check-required",
                             "taskReferenceName": "fraud-check-required_ref",
                             "inputParameters": {
                                 "amount": "${workflow.input.amount}"
                             },
                             "type": "SIMPLE"
                         }
                     ],
                     [
                         {
                             "name": "get_customer_details",
                             "taskReferenceName": "get_customer_details_ref",
                             "inputParameters": {
                                 "http_request": {
                                     "uri": "https://orkes-api-tester.orkesconductor.com/api",
                                     "method": "GET",
                                     "accept": "application/json",
                                     "contentType": "application/json"
                                 }
                             },
                             "type": "HTTP"
                         }
                     ]
                 ]
             },
             {
                 "name": "join_task",
                 "taskReferenceName": "join_task_ref",
                 "type": "JOIN",
                 "joinOn": [
                     "get_customer_details_ref",
                     "fraud-check-required_ref"
                 ]
             }
         ],
         "inputParameters": [
             "amount"
         ],
         "schemaVersion": 2,
         "restartable": true
     }'
```

让我们通过发起一个HTTP POST请求来运行新创建的工作流：

```
curl -X 'POST' \
'http://localhost:9090/api/workflow/microservice_orchestration' \
-H 'accept: text/plain' \
-H 'Content-Type: application/json' \
-d '{
    "amount": 1000.00
}'
```

我们可以通过导航到Orkes Conductor UI中的“Executions”并检查工作流执行ID来验证完成的执行。

现在，让我们深入了解如何在应用程序中跨服务使用此编排。我们将公开一个端点来执行此工作流，有效地创建一个新的API端点，使用事件驱动设计编排微服务。

以下是示例命令：

```
curl -X 'POST' \
'http://localhost:8081/checkForFraud' \
-H 'accept: application/json' \
-H 'Content-Type: application/json' \
-d '{
    "accountId": "string",
    "amount": 12
}'
```

### 4.3. 方法2 - 使用Orkes Playground

让我们创建一个免费账户，并利用Playground实时测试Conductor，按照以下步骤进行：

1. 登录到 https://play.orkes.io/。
2. 创建一个账户以开始使用Orkes Conductor。

现在，让我们在Playground中创建一个新的工作流，或者为了测试方便，我们也可以使用以下工作流：

_在Playground中查看工作流_

为了在Orkes Playground和工作器之间创建连接，我们需要在Orkes Conductor中创建一个应用程序。让我们按照以下步骤进行：

1. 在Orkes Playground上，导航到 Access Control > Applications。
2. 点击‘Create Application’并提供应用程序名称。
3. 选择‘Application role’为‘Worker’。
4. 点击‘Create access key’并复制并保留密钥ID和密钥密文。

接下来，让我们通过以下步骤授予运行工作流的访问权限：

1. 在‘Permissions’部分，我们点击‘+Add permission’。
2. 在‘Workflows’标签下，我们选择‘microservice_orchestration’，在‘Tasks’标签下，让我们选择‘fraud_check_required’
3. 选择‘EXECUTE’权限并添加权限。

现在，让我们打开工作器，并在application.properties文件中提供生成的密钥ID和密文。我们应该将**conductor.server.url**替换为**https://play.orkes.io/api**：

```
conductor.security.client.key-id=your_key_id
conductor.security.client.secret=your_key_secret
conductor.server.url=https://play.orkes.io/api
让我们运行应用程序。我们可以看到工作器轮询Conductor任务并在任务可用时接取任务。

现在，我们使用我们在Spring Boot应用程序中创建的http://localhost:8081/checkForFraud端点，它将使用play.orkes.io作为Conductor后端服务器来运行工作流。

## 5. 结论

事件驱动的微服务为构建可扩展和响应迅速的软件系统提供了激动人心的可能性。在本文中，我们经历了事件驱动微服务的基础知识，强调了它们的优势和挑战。

我们探讨了微服务，凭借其模块化和单一责任的特性，为创建复杂应用程序提供了极好的基础。

如常，文章的源代码可在GitHub上获得。

OK