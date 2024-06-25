import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as n,a as i}from"./app-hBlfnCEU.js";const a={},r=i(`<h1 id="微服务架构中的saga模式-baeldung" tabindex="-1"><a class="header-anchor" href="#微服务架构中的saga模式-baeldung"><span>微服务架构中的Saga模式 | Baeldung</span></a></h1><p>无论你是刚开始还是拥有多年的经验，<strong>Spring Boot</strong> 显然是构建一个web应用的绝佳选择。</p><p>Jmix 建立在这个功能强大且成熟的 Boot 堆栈之上，允许开发者在不需要编写前端代码的情况下构建和交付<strong>全栈web应用</strong>。非常灵活，从简单的web GUI CRUD应用到复杂的企业解决方案。</p><p>具体来说，<strong>Jmix平台</strong>包括一个构建在<strong>Spring Boot, JPA, 和 Vaadin</strong>之上的框架，并附带了 Jmix Studio，<strong>一个 IntelliJ IDEA 插件</strong>，配备了一套开发者生产力工具。</p><p>平台配备了相互连接的<strong>即用型****插件</strong>，用于报告生成、BPM、地图、从数据库即时生成web应用等更多功能：</p><p><strong>&gt;&gt; 成为一个高效的全栈开发者与Jmix</strong></p><p>现在，随着新版本的 <em>REST With Spring -</em> <strong>“REST With Spring Boot”</strong> 终于发布，当前价格将在6月22日之前有效，之后将永久增加50美元。</p><p><strong>&gt;&gt; 立即获取访问</strong></p><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>在典型的基于微服务的架构中，单个业务用例跨越多个微服务，每个服务都有自己的本地数据存储和局部事务。当涉及到多个事务，并且微服务数量庞大时，就会出现处理跨越各种服务的事务的需求。</p><p>Saga模式被引入来处理这些多个事务。最初由Hector Garcia Molina和Kenneth Salems在1987年引入，它被定义为可以相互交错的一系列事务。</p><p>在本教程中，我们将深入探讨管理分布式事务的挑战，基于编排的Saga模式如何解决这个问题，以及使用Spring Boot 3和Orkes Conductor（领先的开源编排平台Conductor OSS的企业级版本，以前称为Netflix Conductor）实现Saga模式的示例。</p><h2 id="_2-管理分布式事务的挑战" tabindex="-1"><a class="header-anchor" href="#_2-管理分布式事务的挑战"><span>2. 管理分布式事务的挑战</span></a></h2><p>如果不正确实现，分布式事务将带来许多挑战。在分布式事务中，每个微服务都有一个单独的本地数据库。这种方法通常称为“每个服务一个数据库”模型。</p><p>例如，MySQL可能由于其性能特性和功能适合一个微服务，而PostgreSQL可能基于其优势和能力被另一个微服务选择。在这个模型中，每个服务执行其本地事务以完成整个应用程序事务。整个事务被称为分布式事务。</p><p>分布式事务可以通过许多方式处理。两种传统方法是2PC（两阶段提交）和ACID（原子性、一致性、隔离性、持久性）事务，每种都带来了诸如多语言持久性、最终一致性、延迟等挑战。</p><h2 id="_3-理解saga模式" tabindex="-1"><a class="header-anchor" href="#_3-理解saga模式"><span>3. 理解Saga模式</span></a></h2><p>Saga模式是一种架构模式，用于实现一系列本地事务，帮助在不同的微服务之间维护数据一致性。</p><p>本地事务更新其数据库，并通过发布消息或事件触发下一个事务。如果本地事务失败，saga执行一系列补偿事务来回滚之前事务所做的更改。这确保了即使事务失败，系统也能保持一致。</p><p>为了进一步说明这一点，考虑一个订单管理系统，它由从下单到交付订单的顺序步骤组成：</p><p>在这个例子中，流程始于用户从应用程序下单。然后流程经过几个步骤：库存检查、支付处理、运输和通知服务。</p><p>如果支付失败，应用程序必须执行补偿事务来回滚之前步骤所做的更改，例如撤销支付和取消订单。<strong>这确保了Saga模式可以在任何阶段处理失败并补偿之前的事务</strong>。</p><p>Saga模式可以通过两种不同的方式实现。</p><p><strong>编排：</strong> 在这种模式中，各个微服务消费事件，执行活动，并将事件传递给下一个服务。没有集中协调器，使得服务之间的通信更加困难：</p><p><strong>编排：</strong> 在这种模式中，所有微服务都连接到集中协调器，该协调器以预定义的顺序编排服务，从而完成应用程序流程。这有助于可视化、监控和错误处理：</p><h2 id="_4-为什么选择基于编排的saga模式" tabindex="-1"><a class="header-anchor" href="#_4-为什么选择基于编排的saga模式"><span>4. 为什么选择基于编排的Saga模式？</span></a></h2><p>编排模式的去中心化方法在构建分布式应用程序时更具挑战性。由于缺乏集中协调和可视化，复杂性增加，使应用程序更难维护。</p><p>让我们看看编排模式的主要缺点和选择编排的优势。</p><h3 id="_4-1-编排的缺点" tabindex="-1"><a class="header-anchor" href="#_4-1-编排的缺点"><span>4.1. 编排的缺点</span></a></h3><p>基于编排的实现在构建分布式应用程序时有许多限制：</p><ul><li>紧密耦合 - 服务紧密耦合，因为它们直接连接。应用程序中的任何服务更改都可能影响所有连接的服务，需要在升级服务时依赖。</li><li>分布式真实来源 - 在各种微服务中维护应用程序状态使跟踪流程变得更加复杂，可能需要一个额外的系统来整合状态信息。<strong>这增加了基础设施，并增加了整个系统的复杂性。</strong></li><li>难以排除故障 - 当应用程序流程跨越不同服务时，查找和修复问题可能需要更长的时间。排除故障需要一个集中的日志服务和对代码的良好理解。如果一个服务失败，它可能会导致更大的问题，可能造成广泛的中断。</li><li>测试环境具有挑战性 - 由于微服务相互连接，测试对开发人员来说变得困难。</li><li>难以维护 - 随着服务的发展，引入新版本涉及重新引入条件逻辑，再次导致分布式单体。这使得在不检查整个代码的情况下更难理解服务流程。</li></ul><h3 id="_4-2-编排的优势" tabindex="-1"><a class="header-anchor" href="#_4-2-编排的优势"><span>4.2. 编排的优势</span></a></h3><p>基于编排的实现在构建分布式应用程序时有许多优势：</p><ul><li>分布式系统中的协调事务 - 不同的微服务处理分布式系统中的不同事务方面。有了基于编排的模式，中央协调器以预定义的方式管理这些微服务的执行。它积极确保各个本地事务的精确执行，从而维护应用程序的一致性。</li><li>补偿事务 - 在应用程序中，由于任何错误，执行过程中的任何点都可能发生故障。<strong>Saga模式在发生故障时启用补偿事务的执行</strong>。它可以回滚之前完成的事务，确保应用程序保持一致状态。</li><li>异步处理 - 每个微服务可以独立处理其活动，中央协调器可以管理这些异步操作的通信和排序。这在特定步骤可能需要更长时间完成或需要并行处理的情况下非常有用。</li><li>可扩展性 - 编排模式高度可扩展，这意味着我们可以通过简单地添加或修改所需服务来更改应用程序，而不会显著影响整个应用程序。这在应用程序需要适应不断变化的需求时特别有用，允许轻松扩展或修改架构。</li><li>增强的可视化和监控能力 - <strong>使用编排模式在分布式应用程序中提供集中的可视化，使问题能够快速识别和解决</strong>。这提高了生产力，最小化了停机时间，并最终减少了从故障中检测和恢复的平均时间。</li><li>更快的市场上市时间 - 编排器简化了现有服务的重新布线和新流程的创建，促进了快速适应。这使应用程序团队更加敏捷，导致新想法和概念更快地上市。此外，编排器通常管理版本控制，减少了在代码中创建不同版本的广泛“if..then..else”语句的需求。</li></ul><p>总之，基于编排的Saga模式为在微服务架构中实现协调、一致和可扩展的分布式事务提供了一种方式，并通过补偿事务处理故障，使其成为构建健壮和可扩展分布式应用程序的强大模式。</p><h2 id="_5-使用orkes-conductor实现saga编排模式" tabindex="-1"><a class="header-anchor" href="#_5-使用orkes-conductor实现saga编排模式"><span>5. 使用Orkes Conductor实现Saga编排模式</span></a></h2><p>现在，让我们看看使用Orkes Conductor的实际应用程序示例。</p><p>考虑一个订单管理系统，其中包括以下服务：</p><ul><li><strong>OrderService</strong> - 处理初始订单放置，包括将商品添加到购物车、指定数量和初始化结账过程。</li><li><strong>InventoryService</strong> - 检查并确认商品的可用性。</li><li><strong>PaymentService</strong> - 安全地管理支付流程，处理各种支付方式。</li><li><strong>ShipmentService</strong> - 准备商品发货，包括包装、生成运输标签和启动运输流程。</li><li><strong>NotificationService</strong> - 向用户发送有关订单更新的通知。</li></ul><p>让我们探索使用Orkes Conductor和Spring Boot 3复制此流程。</p><p>在开始应用开发之前，请确保系统满足以下先决条件。</p><ul><li>安装Java 17</li></ul><p>要为我们的应用设置Orkes Conductor，我们可以选择以下任何方法：</p><ul><li>在本地设置Conductor</li><li>使用Playground</li><li>使用Orkes Cloud - Conductor的企业版本</li></ul><p>在这个例子中，我们将使用Playground。</p><p>这是使用Saga模式构建的食品配送应用程序的代码片段：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@AllArgsConstructor
@Component
@ComponentScan(basePackages = {&quot;io.orkes&quot;})
public class ConductorWorkers {

    @WorkerTask(value = &quot;order_food&quot;, threadCount = 3, pollingInterval = 300)
    public TaskResult orderFoodTask(OrderRequest orderRequest) {
        String orderId = OrderService.createOrder(orderRequest);
        TaskResult result = new TaskResult();
        Map\`&lt;String, Object&gt;\` output = new HashMap&lt;&gt;();

        if(orderId != null) {
            output.put(&quot;orderId&quot;, orderId);
            result.setOutputData(output);
            result.setStatus(TaskResult.Status.COMPLETED);
        } else {
            output.put(&quot;orderId&quot;, null);
            result.setStatus(TaskResult.Status.FAILED);
        }

        return result;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-1-食品配送应用程序" tabindex="-1"><a class="header-anchor" href="#_5-1-食品配送应用程序"><span>5.1. 食品配送应用程序</span></a></h3><p>从Conductor UI来看，示例食品配送应用程序如下所示：</p><p>查看Playground</p><p>让我们看看工作流是如何进展的：</p><ul><li>当用户在食品配送应用程序上下达订单时，初始流程被实现为一系列工作任务，包括将食品添加到购物车（<em>order_food</em>）、检查餐厅是否有食品供应（<em>check_inventory</em>）、支付流程（<em>make_payment</em>）和配送流程（<em>ship_food</em>）。</li><li>应用程序流程然后转移到一个分叉-合并任务，它处理通知服务。它有两个分叉，一个用于通知配送人员，另一个用于通知用户。</li></ul><p>现在，让我们运行应用程序！</p><h3 id="_5-2-运行应用程序" tabindex="-1"><a class="header-anchor" href="#_5-2-运行应用程序"><span>5.2. 运行应用程序</span></a></h3><ol><li>克隆项目。</li><li>更新_application.properties_文件，使用生成的访问密钥。要将此工作器与应用程序服务器实例（前面解释的工作流）连接，我们需要在Orkes Conductor中创建一个应用程序并生成访问密钥。 <ul><li>如果使用Playground，请参考此视频以生成访问密钥。</li><li>如果在本地设置Conductor，请按照此处的说明（安装并运行本地）。</li></ul></li></ol><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>conductor.server.url=https://play.orkes.io/api
conductor.security.client.key-id=\`&lt;key&gt;\`
conductor.security.client.secret=\`&lt;secret&gt;\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意：</p><ul><li><strong>由于我们使用的是playground，<em>conductor.server.url</em></strong> <strong>保持不变</strong>。如果我们在本地设置了Conductor，请用Conductor服务器URL替换它。</li><li>用生成的密钥替换_key-id_和_secret_。</li><li>为了使工作器与Conductor服务器连接，我们需要提供权限（在我们刚刚创建的应用程序中）以访问工作流和任务。</li><li><strong>默认情况下，<em>conductor.worker.all.domain</em></strong> <strong>设置为‘saga’</strong>。确保更新为不同的名称，以避免与Orkes Playground中其他人启动的工作流和工作器发生冲突。</li></ul><p>让我们使用以下命令从根项目运行应用程序：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>gradle bootRun
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>应用程序正在运行；下一步是通过调用应用程序中的_triggerRideBookingFlow_ API来创建一个订单。</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ curl --location &#39;http://localhost:8081/triggerFoodDeliveryFlow&#39; \\
 --header &#39;Content-Type: application/json&#39; \\
 --data &#39;{
     &quot;customerEmail&quot;: &quot;tester.qa@example.com&quot;,
     &quot;customerName&quot;: &quot;Tester QA&quot;,
     &quot;customerContact&quot;: &quot;+1(605)123-5674&quot;,
     &quot;address&quot;: &quot;350 East 62nd Street, NY 10065&quot;,
     &quot;restaurantId&quot;: 2,
     &quot;foodItems&quot;: [
         {
             &quot;item&quot;: &quot;Chicken with Broccoli&quot;,
             &quot;quantity&quot;: 1
         },
         {
             &quot;item&quot;: &quot;Veggie Fried Rice&quot;,
             &quot;quantity&quot;: 1
         },
         {
             &quot;item&quot;: &quot;Egg Drop Soup&quot;,
             &quot;quantity&quot;: 2
         }
     ],
     &quot;additionalNotes&quot;: [
         &quot;Do not put spice.&quot;,
         &quot;Send cutlery.&quot;
     ],
     &quot;paymentMethod&quot; : {
         &quot;type&quot;: &quot;Credit Card&quot;,
         &quot;details&quot;: {
             &quot;number&quot;: &quot;1234 4567 3325 1345&quot;,
             &quot;cvv&quot;: &quot;123&quot;,
             &quot;expiry&quot;: &quot;05/2022&quot;
         }
     },
     &quot;paymentAmount&quot;: 45.34,
     &quot;deliveryInstructions&quot;: &quot;Leave at the door!&quot;
 }&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一旦发送请求，我们将收到一个工作流ID，表明我们的食品配送应用程序现在正在运行！🍕</p><p><strong>使用工作流ID，我们可以从Conductor UI可视化我们的应用程序</strong>。让我们复制工作流ID，并在我们的Conductor控制台中，从左侧菜单导航到“<em>Executions &gt; Workflow</em>”并使用工作流ID搜索执行。</p><p>一个示例执行如下所示：</p><p>让我们看看如果应用程序中的一个服务失败，应用程序流程会发生什么。</p><h3 id="_5-3-补偿流程" tabindex="-1"><a class="header-anchor" href="#_5-3-补偿流程"><span>5.3. 补偿流程</span></a></h3><p>这是食品配送应用程序补偿交易的简单可视化：</p><p><strong>在Orkes Conductor中定义工作流时，我们可以在主应用程序失败时触发一个_failureWorkflow_</strong>。在定义中包括在应用程序失败时要运行的工作流名称。</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>&quot;failureWorkflow&quot;: &quot;\`&lt;在应用程序失败时要运行的工作流名称&gt;\`&quot;,
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Orkes Conductor中的补偿工作流在失败时回滚更改：</p><p>查看Playground</p><p>当主应用程序中的任何服务失败时，此工作流触发。</p><p>让我们想象一下，由于资金不足，支付失败。然后，失败工作流触发，启动以下补偿流程：</p><p>系统取消支付，随后取消订单，并向用户发送失败通知。</p><p>Boom 🎊！这就是我们如何使用Orkes Conductor回滚我们食品配送应用程序中已完成的交易，从而维护应用程序的一致性。</p><p>还有一个Slack社区可用，可能是一个检查与Conductor相关的任何查询的好地方。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们成功地使用Orkes Conductor和Java Spring Boot 3开发了一个订单管理应用程序，实现了Saga模式。</p><p>Orkes Conductor可在所有主要云平台上使用：AWS、Azure和GCP。</p><p>一如既往，文章的源代码可在GitHub上获得。</p><p>OK</p>`,82),o=[r];function s(l,d){return n(),t("div",null,o)}const p=e(a,[["render",s],["__file","2024-06-20-Saga Pattern in a Microservices Architecture.html.vue"]]),g=JSON.parse('{"path":"/posts/baeldung/Archive/2024-06-20-Saga%20Pattern%20in%20a%20Microservices%20Architecture.html","title":"微服务架构中的Saga模式 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-06-20T00:00:00.000Z","category":["Microservices","Saga Pattern"],"tag":["Spring Boot","Orkes Conductor","Distributed Transactions"],"head":[["meta",{"name":"keywords","content":"Saga Pattern, Microservices, Distributed Transactions, Spring Boot, Orkes Conductor"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/2024-06-20-Saga%20Pattern%20in%20a%20Microservices%20Architecture.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"微服务架构中的Saga模式 | Baeldung"}],["meta",{"property":"og:description","content":"微服务架构中的Saga模式 | Baeldung 无论你是刚开始还是拥有多年的经验，Spring Boot 显然是构建一个web应用的绝佳选择。 Jmix 建立在这个功能强大且成熟的 Boot 堆栈之上，允许开发者在不需要编写前端代码的情况下构建和交付全栈web应用。非常灵活，从简单的web GUI CRUD应用到复杂的企业解决方案。 具体来说，Jmi..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Spring Boot"}],["meta",{"property":"article:tag","content":"Orkes Conductor"}],["meta",{"property":"article:tag","content":"Distributed Transactions"}],["meta",{"property":"article:published_time","content":"2024-06-20T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"微服务架构中的Saga模式 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-20T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"微服务架构中的Saga模式 | Baeldung 无论你是刚开始还是拥有多年的经验，Spring Boot 显然是构建一个web应用的绝佳选择。 Jmix 建立在这个功能强大且成熟的 Boot 堆栈之上，允许开发者在不需要编写前端代码的情况下构建和交付全栈web应用。非常灵活，从简单的web GUI CRUD应用到复杂的企业解决方案。 具体来说，Jmi..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 管理分布式事务的挑战","slug":"_2-管理分布式事务的挑战","link":"#_2-管理分布式事务的挑战","children":[]},{"level":2,"title":"3. 理解Saga模式","slug":"_3-理解saga模式","link":"#_3-理解saga模式","children":[]},{"level":2,"title":"4. 为什么选择基于编排的Saga模式？","slug":"_4-为什么选择基于编排的saga模式","link":"#_4-为什么选择基于编排的saga模式","children":[{"level":3,"title":"4.1. 编排的缺点","slug":"_4-1-编排的缺点","link":"#_4-1-编排的缺点","children":[]},{"level":3,"title":"4.2. 编排的优势","slug":"_4-2-编排的优势","link":"#_4-2-编排的优势","children":[]}]},{"level":2,"title":"5. 使用Orkes Conductor实现Saga编排模式","slug":"_5-使用orkes-conductor实现saga编排模式","link":"#_5-使用orkes-conductor实现saga编排模式","children":[{"level":3,"title":"5.1. 食品配送应用程序","slug":"_5-1-食品配送应用程序","link":"#_5-1-食品配送应用程序","children":[]},{"level":3,"title":"5.2. 运行应用程序","slug":"_5-2-运行应用程序","link":"#_5-2-运行应用程序","children":[]},{"level":3,"title":"5.3. 补偿流程","slug":"_5-3-补偿流程","link":"#_5-3-补偿流程","children":[]}]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":11.73,"words":3519},"filePathRelative":"posts/baeldung/Archive/2024-06-20-Saga Pattern in a Microservices Architecture.md","localizedDate":"2024年6月20日","excerpt":"\\n<p>无论你是刚开始还是拥有多年的经验，<strong>Spring Boot</strong> 显然是构建一个web应用的绝佳选择。</p>\\n<p>Jmix 建立在这个功能强大且成熟的 Boot 堆栈之上，允许开发者在不需要编写前端代码的情况下构建和交付<strong>全栈web应用</strong>。非常灵活，从简单的web GUI CRUD应用到复杂的企业解决方案。</p>\\n<p>具体来说，<strong>Jmix平台</strong>包括一个构建在<strong>Spring Boot, JPA, 和 Vaadin</strong>之上的框架，并附带了 Jmix Studio，<strong>一个 IntelliJ IDEA 插件</strong>，配备了一套开发者生产力工具。</p>","autoDesc":true}');export{p as comp,g as data};
