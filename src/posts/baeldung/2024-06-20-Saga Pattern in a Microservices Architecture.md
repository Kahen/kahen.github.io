---
date: 2024-06-20
category:
  - Microservices
  - Saga Pattern
tag:
  - Spring Boot
  - Orkes Conductor
  - Distributed Transactions
head:
  - - meta
    - name: keywords
      content: Saga Pattern, Microservices, Distributed Transactions, Spring Boot, Orkes Conductor
---
# 微服务架构中的Saga模式 | Baeldung

无论你是刚开始还是拥有多年的经验，**Spring Boot** 显然是构建一个web应用的绝佳选择。

Jmix 建立在这个功能强大且成熟的 Boot 堆栈之上，允许开发者在不需要编写前端代码的情况下构建和交付**全栈web应用**。非常灵活，从简单的web GUI CRUD应用到复杂的企业解决方案。

具体来说，**Jmix平台**包括一个构建在**Spring Boot, JPA, 和 Vaadin**之上的框架，并附带了 Jmix Studio，**一个 IntelliJ IDEA 插件**，配备了一套开发者生产力工具。

平台配备了相互连接的**即用型****插件**，用于报告生成、BPM、地图、从数据库即时生成web应用等更多功能：

**>> 成为一个高效的全栈开发者与Jmix**

现在，随着新版本的 _REST With Spring -_ **“REST With Spring Boot”** 终于发布，当前价格将在6月22日之前有效，之后将永久增加50美元。

**>> 立即获取访问**

## 1. 引言
在典型的基于微服务的架构中，单个业务用例跨越多个微服务，每个服务都有自己的本地数据存储和局部事务。当涉及到多个事务，并且微服务数量庞大时，就会出现处理跨越各种服务的事务的需求。

Saga模式被引入来处理这些多个事务。最初由Hector Garcia Molina和Kenneth Salems在1987年引入，它被定义为可以相互交错的一系列事务。

在本教程中，我们将深入探讨管理分布式事务的挑战，基于编排的Saga模式如何解决这个问题，以及使用Spring Boot 3和Orkes Conductor（领先的开源编排平台Conductor OSS的企业级版本，以前称为Netflix Conductor）实现Saga模式的示例。

## 2. 管理分布式事务的挑战
如果不正确实现，分布式事务将带来许多挑战。在分布式事务中，每个微服务都有一个单独的本地数据库。这种方法通常称为“每个服务一个数据库”模型。

例如，MySQL可能由于其性能特性和功能适合一个微服务，而PostgreSQL可能基于其优势和能力被另一个微服务选择。在这个模型中，每个服务执行其本地事务以完成整个应用程序事务。整个事务被称为分布式事务。

分布式事务可以通过许多方式处理。两种传统方法是2PC（两阶段提交）和ACID（原子性、一致性、隔离性、持久性）事务，每种都带来了诸如多语言持久性、最终一致性、延迟等挑战。

## 3. 理解Saga模式
Saga模式是一种架构模式，用于实现一系列本地事务，帮助在不同的微服务之间维护数据一致性。

本地事务更新其数据库，并通过发布消息或事件触发下一个事务。如果本地事务失败，saga执行一系列补偿事务来回滚之前事务所做的更改。这确保了即使事务失败，系统也能保持一致。

为了进一步说明这一点，考虑一个订单管理系统，它由从下单到交付订单的顺序步骤组成：

在这个例子中，流程始于用户从应用程序下单。然后流程经过几个步骤：库存检查、支付处理、运输和通知服务。

如果支付失败，应用程序必须执行补偿事务来回滚之前步骤所做的更改，例如撤销支付和取消订单。**这确保了Saga模式可以在任何阶段处理失败并补偿之前的事务**。

Saga模式可以通过两种不同的方式实现。

**编排：** 在这种模式中，各个微服务消费事件，执行活动，并将事件传递给下一个服务。没有集中协调器，使得服务之间的通信更加困难：

**编排：** 在这种模式中，所有微服务都连接到集中协调器，该协调器以预定义的顺序编排服务，从而完成应用程序流程。这有助于可视化、监控和错误处理：

## 4. 为什么选择基于编排的Saga模式？
编排模式的去中心化方法在构建分布式应用程序时更具挑战性。由于缺乏集中协调和可视化，复杂性增加，使应用程序更难维护。

让我们看看编排模式的主要缺点和选择编排的优势。

### 4.1. 编排的缺点
基于编排的实现在构建分布式应用程序时有许多限制：

- 紧密耦合 - 服务紧密耦合，因为它们直接连接。应用程序中的任何服务更改都可能影响所有连接的服务，需要在升级服务时依赖。
- 分布式真实来源 - 在各种微服务中维护应用程序状态使跟踪流程变得更加复杂，可能需要一个额外的系统来整合状态信息。**这增加了基础设施，并增加了整个系统的复杂性。**
- 难以排除故障 - 当应用程序流程跨越不同服务时，查找和修复问题可能需要更长的时间。排除故障需要一个集中的日志服务和对代码的良好理解。如果一个服务失败，它可能会导致更大的问题，可能造成广泛的中断。
- 测试环境具有挑战性 - 由于微服务相互连接，测试对开发人员来说变得困难。
- 难以维护 - 随着服务的发展，引入新版本涉及重新引入条件逻辑，再次导致分布式单体。这使得在不检查整个代码的情况下更难理解服务流程。

### 4.2. 编排的优势
基于编排的实现在构建分布式应用程序时有许多优势：

- 分布式系统中的协调事务 - 不同的微服务处理分布式系统中的不同事务方面。有了基于编排的模式，中央协调器以预定义的方式管理这些微服务的执行。它积极确保各个本地事务的精确执行，从而维护应用程序的一致性。
- 补偿事务 - 在应用程序中，由于任何错误，执行过程中的任何点都可能发生故障。**Saga模式在发生故障时启用补偿事务的执行**。它可以回滚之前完成的事务，确保应用程序保持一致状态。
- 异步处理 - 每个微服务可以独立处理其活动，中央协调器可以管理这些异步操作的通信和排序。这在特定步骤可能需要更长时间完成或需要并行处理的情况下非常有用。
- 可扩展性 - 编排模式高度可扩展，这意味着我们可以通过简单地添加或修改所需服务来更改应用程序，而不会显著影响整个应用程序。这在应用程序需要适应不断变化的需求时特别有用，允许轻松扩展或修改架构。
- 增强的可视化和监控能力 - **使用编排模式在分布式应用程序中提供集中的可视化，使问题能够快速识别和解决**。这提高了生产力，最小化了停机时间，并最终减少了从故障中检测和恢复的平均时间。
- 更快的市场上市时间 - 编排器简化了现有服务的重新布线和新流程的创建，促进了快速适应。这使应用程序团队更加敏捷，导致新想法和概念更快地上市。此外，编排器通常管理版本控制，减少了在代码中创建不同版本的广泛“if..then..else”语句的需求。

总之，基于编排的Saga模式为在微服务架构中实现协调、一致和可扩展的分布式事务提供了一种方式，并通过补偿事务处理故障，使其成为构建健壮和可扩展分布式应用程序的强大模式。

## 5. 使用Orkes Conductor实现Saga编排模式
现在，让我们看看使用Orkes Conductor的实际应用程序示例。

考虑一个订单管理系统，其中包括以下服务：

- **OrderService** - 处理初始订单放置，包括将商品添加到购物车、指定数量和初始化结账过程。
- **InventoryService** - 检查并确认商品的可用性。
- **PaymentService** - 安全地管理支付流程，处理各种支付方式。
- **ShipmentService** - 准备商品发货，包括包装、生成运输标签和启动运输流程。
- **NotificationService** - 向用户发送有关订单更新的通知。

让我们探索使用Orkes Conductor和Spring Boot 3复制此流程。

在开始应用开发之前，请确保系统满足以下先决条件。

- 安装Java 17

要为我们的应用设置Orkes Conductor，我们可以选择以下任何方法：

- 在本地设置Conductor
- 使用Playground
- 使用Orkes Cloud - Conductor的企业版本

在这个例子中，我们将使用Playground。

这是使用Saga模式构建的食品配送应用程序的代码片段：

```
@AllArgsConstructor
@Component
@ComponentScan(basePackages = {"io.orkes"})
public class ConductorWorkers {

    @WorkerTask(value = "order_food", threadCount = 3, pollingInterval = 300)
    public TaskResult orderFoodTask(OrderRequest orderRequest) {
        String orderId = OrderService.createOrder(orderRequest);
        TaskResult result = new TaskResult();
        Map`<String, Object>` output = new HashMap<>();

        if(orderId != null) {
            output.put("orderId", orderId);
            result.setOutputData(output);
            result.setStatus(TaskResult.Status.COMPLETED);
        } else {
            output.put("orderId", null);
            result.setStatus(TaskResult.Status.FAILED);
        }

        return result;
    }
}
```

### 5.1. 食品配送应用程序
从Conductor UI来看，示例食品配送应用程序如下所示：

查看Playground

让我们看看工作流是如何进展的：

- 当用户在食品配送应用程序上下达订单时，初始流程被实现为一系列工作任务，包括将食品添加到购物车（_order_food_）、检查餐厅是否有食品供应（_check_inventory_）、支付流程（_make_payment_）和配送流程（_ship_food_）。
- 应用程序流程然后转移到一个分叉-合并任务，它处理通知服务。它有两个分叉，一个用于通知配送人员，另一个用于通知用户。

现在，让我们运行应用程序！

### 5.2. 运行应用程序
1. 克隆项目。
2. 更新_application.properties_文件，使用生成的访问密钥。要将此工作器与应用程序服务器实例（前面解释的工作流）连接，我们需要在Orkes Conductor中创建一个应用程序并生成访问密钥。
   - 如果使用Playground，请参考此视频以生成访问密钥。
   - 如果在本地设置Conductor，请按照此处的说明（安装并运行本地）。

```
conductor.server.url=https://play.orkes.io/api
conductor.security.client.key-id=`<key>`
conductor.security.client.secret=`<secret>`
```

注意：
- **由于我们使用的是playground，_conductor.server.url_** **保持不变**。如果我们在本地设置了Conductor，请用Conductor服务器URL替换它。
- 用生成的密钥替换_key-id_和_secret_。
- 为了使工作器与Conductor服务器连接，我们需要提供权限（在我们刚刚创建的应用程序中）以访问工作流和任务。
- **默认情况下，_conductor.worker.all.domain_** **设置为‘saga’**。确保更新为不同的名称，以避免与Orkes Playground中其他人启动的工作流和工作器发生冲突。

让我们使用以下命令从根项目运行应用程序：

```
gradle bootRun
```

应用程序正在运行；下一步是通过调用应用程序中的_triggerRideBookingFlow_ API来创建一个订单。

```
$ curl --location 'http://localhost:8081/triggerFoodDeliveryFlow' \
 --header 'Content-Type: application/json' \
 --data '{
     "customerEmail": "tester.qa@example.com",
     "customerName": "Tester QA",
     "customerContact": "+1(605)123-5674",
     "address": "350 East 62nd Street, NY 10065",
     "restaurantId": 2,
     "foodItems": [
         {
             "item": "Chicken with Broccoli",
             "quantity": 1
         },
         {
             "item": "Veggie Fried Rice",
             "quantity": 1
         },
         {
             "item": "Egg Drop Soup",
             "quantity": 2
         }
     ],
     "additionalNotes": [
         "Do not put spice.",
         "Send cutlery."
     ],
     "paymentMethod" : {
         "type": "Credit Card",
         "details": {
             "number": "1234 4567 3325 1345",
             "cvv": "123",
             "expiry": "05/2022"
         }
     },
     "paymentAmount": 45.34,
     "deliveryInstructions": "Leave at the door!"
 }'
```

一旦发送请求，我们将收到一个工作流ID，表明我们的食品配送应用程序现在正在运行！🍕

**使用工作流ID，我们可以从Conductor UI可视化我们的应用程序**。让我们复制工作流ID，并在我们的Conductor控制台中，从左侧菜单导航到“_Executions > Workflow_”并使用工作流ID搜索执行。

一个示例执行如下所示：

让我们看看如果应用程序中的一个服务失败，应用程序流程会发生什么。

### 5.3. 补偿流程
这是食品配送应用程序补偿交易的简单可视化：

**在Orkes Conductor中定义工作流时，我们可以在主应用程序失败时触发一个_failureWorkflow_**。在定义中包括在应用程序失败时要运行的工作流名称。

```
"failureWorkflow": "`<在应用程序失败时要运行的工作流名称>`",
```

Orkes Conductor中的补偿工作流在失败时回滚更改：

查看Playground

当主应用程序中的任何服务失败时，此工作流触发。

让我们想象一下，由于资金不足，支付失败。然后，失败工作流触发，启动以下补偿流程：

系统取消支付，随后取消订单，并向用户发送失败通知。

Boom 🎊！这就是我们如何使用Orkes Conductor回滚我们食品配送应用程序中已完成的交易，从而维护应用程序的一致性。

还有一个Slack社区可用，可能是一个检查与Conductor相关的任何查询的好地方。

## 6. 结论
在本文中，我们成功地使用Orkes Conductor和Java Spring Boot 3开发了一个订单管理应用程序，实现了Saga模式。

Orkes Conductor可在所有主要云平台上使用：AWS、Azure和GCP。

一如既往，文章的源代码可在GitHub上获得。

OK