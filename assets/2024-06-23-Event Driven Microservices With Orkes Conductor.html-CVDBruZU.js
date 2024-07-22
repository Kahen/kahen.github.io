import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as t,a as i}from"./app-jyx3Z1zv.js";const r={},o=i(`<h1 id="使用orkes-conductor构建事件驱动的微服务" tabindex="-1"><a class="header-anchor" href="#使用orkes-conductor构建事件驱动的微服务"><span>使用Orkes Conductor构建事件驱动的微服务</span></a></h1><p>在这个教程中，我们将探讨如何使用Orkes Conductor和Spring构建事件驱动的微服务。我们将使用Conductor来使用HTTP端点和服务工作器编排微服务。</p><p>微服务提供了一种很好的方式，可以创建一个可以独立扩展和管理的模块化架构。开发人员通常将微服务设计为单一责任服务，这些服务在执行一件事情上表现得非常出色。然而，应用程序流程通常需要跨多个微服务进行协调以实现业务目标。</p><p>事件驱动架构通过事件系统在微服务之间进行通信，确保流程的可扩展性和持久性。由于这些原因，事件驱动的微服务最近变得非常流行，特别是在实现异步流程时特别有用。</p><h3 id="_2-1-事件驱动系统的不足" tabindex="-1"><a class="header-anchor" href="#_2-1-事件驱动系统的不足"><span>2.1. 事件驱动系统的不足</span></a></h3><p>虽然在解耦服务交互方面做得很好，但事件驱动系统也带来了几个挑战：</p><ul><li><strong>难以可视化执行流程</strong> - 所有微服务之间的通信都发生在事件总线上，因此很难可视化和理解业务流程。这使得识别、调试和从故障中恢复变得更加困难。通常，分布式跟踪和集中式日志记录被用来解决这个问题。</li><li><strong>没有单一的应用程序状态权威</strong> - 通常，每个服务都维护自己的本地数据库，该数据库作为该服务的记录系统。例如，信用卡服务可能有一个数据库，其中包含信用卡支付列表和相关信息。然而，在多个服务调用中，应用程序的整体状态是分布式的，这使得可视化应用程序流程、处理故障情况下的补偿事务以及查询给定时间点的应用程序状态变得困难。</li><li><strong>易于构建，难以扩展</strong> - 像Spring这样的框架简化了可以连接到各种pub/sub系统的事件驱动应用程序的构建。然而，开发人员经常需要投入大量的时间来解决诸如使系统运行、扩展以处理大量工作负载或构建具有非常复杂连接规则的应用程序等挑战。</li></ul><h2 id="_3-使用conductor的事件驱动架构" tabindex="-1"><a class="header-anchor" href="#_3-使用conductor的事件驱动架构"><span>3. 使用Conductor的事件驱动架构</span></a></h2><p><strong>Netflix最初构建Conductor作为一个编排微服务的平台</strong>。Netflix的开发人员设计并构建了Conductor，以创建事件驱动的微服务，并解决上述列出的一些不足。</p><p>作为一个编排器，Conductor允许我们以代码或JSON的形式定义服务执行流程，并使我们能够使用任何支持的语言SDK连接服务或编写服务工作器。<strong>作为一个完全开源的平台，Conductor在Apache 2.0许可证下运行</strong>。</p><p>Conductor的多语言特性允许我们用任何语言编写服务工作器，或者在单个应用程序流程中，服务和工作器可以使用不同的语言。</p><p>Conductor让我们创建可重用、单一责任原则的事件驱动服务，以响应事件。Conductor还可以用于连接通过持久队列暴露的服务。</p><h3 id="_4-1-使用orkes-conductor和spring构建事件驱动微服务" tabindex="-1"><a class="header-anchor" href="#_4-1-使用orkes-conductor和spring构建事件驱动微服务"><span>4.1. 使用Orkes Conductor和Spring构建事件驱动微服务</span></a></h3><p>现在，让我们探索一个示例Spring Boot应用程序，该程序利用Conductor跨微服务进行编排。</p><h4 id="_4-1-设置orkes-conductor" tabindex="-1"><a class="header-anchor" href="#_4-1-设置orkes-conductor"><span>4.1. 设置Orkes Conductor</span></a></h4><p>Orkes Conductor可以以多种方式配置。首先，我们可以使用Docker在本地设置它，或者我们也可以利用免费的开发者沙盒Playground。</p><p>还有一个Slack社区可用，这可能是一个查询Conductor相关问题的好地方。</p><h4 id="_4-2-方法1-使用docker本地安装和运行" tabindex="-1"><a class="header-anchor" href="#_4-2-方法1-使用docker本地安装和运行"><span>4.2. 方法1 - 使用Docker本地安装和运行</span></a></h4><p>首先，让我们确保设备上安装了Docker。</p><p>然后，我们使用以下Docker命令在端口9090上启动服务器，在端口1234上启动UI：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>docker run --init -p 9090:8080 -p 1234:5000 --mount source=redis,target=/redis \\
--mount source=postgres,target=/pgdata orkesio/orkes-conductor-community-standalone:latest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们创建一个简单的Spring Boot应用程序，它执行以下两项操作：</p><ul><li>使用Conductor创建一个微服务工作器。</li><li>在这两个服务之间进行编排： <ul><li>HTTP端点 https://orkes-api-tester.orkesconductor.com/api</li><li>我们在第一步中创建的服务工作器。</li></ul></li></ul><p>以下是我们如何使用Conductor中的任务工作器创建一个简单的服务工作器，该工作器不需要通过HTTP端点公开：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@WorkerTask(value = &quot;fraud-check-required&quot;)
public FraudCheckResult isFraudCheckRequired(BigDecimal amount) {
    return fraudCheckService.checkForFraud(amount);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们创建一个简单的工作流，该工作流调用示例HTTP端点以获取客户详细信息（https://orkes-api-tester.orkesconductor.com/api）和我们刚刚在上面实现的欺诈检查服务工作器并行运行。</p><p>我们使用以下命令执行工作流，结果是一个可在 http://localhost:1234/workflowDef/microservice_orchestration 访问的工作流：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>curl -X &#39;POST&#39; &#39;http://localhost:9090/api/metadata/workflow&#39; \\
     -H &#39;accept: */*&#39; \\
     -H &#39;Content-Type: application/json&#39; \\
     -d &#39;{
         &quot;name&quot;: &quot;microservice_orchestration&quot;,
         &quot;description&quot;: &quot;microservice_orchestration_example_workflow&quot;,
         &quot;version&quot;: 1,
         &quot;tasks&quot;: [
             {
                 &quot;name&quot;: &quot;fork_task&quot;,
                 &quot;taskReferenceName&quot;: &quot;fork_task_ref&quot;,
                 &quot;inputParameters&quot;: {},
                 &quot;type&quot;: &quot;FORK_JOIN&quot;,
                 &quot;forkTasks&quot;: [
                     [
                         {
                             &quot;name&quot;: &quot;fraud-check-required&quot;,
                             &quot;taskReferenceName&quot;: &quot;fraud-check-required_ref&quot;,
                             &quot;inputParameters&quot;: {
                                 &quot;amount&quot;: &quot;\${workflow.input.amount}&quot;
                             },
                             &quot;type&quot;: &quot;SIMPLE&quot;
                         }
                     ],
                     [
                         {
                             &quot;name&quot;: &quot;get_customer_details&quot;,
                             &quot;taskReferenceName&quot;: &quot;get_customer_details_ref&quot;,
                             &quot;inputParameters&quot;: {
                                 &quot;http_request&quot;: {
                                     &quot;uri&quot;: &quot;https://orkes-api-tester.orkesconductor.com/api&quot;,
                                     &quot;method&quot;: &quot;GET&quot;,
                                     &quot;accept&quot;: &quot;application/json&quot;,
                                     &quot;contentType&quot;: &quot;application/json&quot;
                                 }
                             },
                             &quot;type&quot;: &quot;HTTP&quot;
                         }
                     ]
                 ]
             },
             {
                 &quot;name&quot;: &quot;join_task&quot;,
                 &quot;taskReferenceName&quot;: &quot;join_task_ref&quot;,
                 &quot;type&quot;: &quot;JOIN&quot;,
                 &quot;joinOn&quot;: [
                     &quot;get_customer_details_ref&quot;,
                     &quot;fraud-check-required_ref&quot;
                 ]
             }
         ],
         &quot;inputParameters&quot;: [
             &quot;amount&quot;
         ],
         &quot;schemaVersion&quot;: 2,
         &quot;restartable&quot;: true
     }&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们通过发起一个HTTP POST请求来运行新创建的工作流：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>curl -X &#39;POST&#39; \\
&#39;http://localhost:9090/api/workflow/microservice_orchestration&#39; \\
-H &#39;accept: text/plain&#39; \\
-H &#39;Content-Type: application/json&#39; \\
-d &#39;{
    &quot;amount&quot;: 1000.00
}&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以通过导航到Orkes Conductor UI中的“Executions”并检查工作流执行ID来验证完成的执行。</p><p>现在，让我们深入了解如何在应用程序中跨服务使用此编排。我们将公开一个端点来执行此工作流，有效地创建一个新的API端点，使用事件驱动设计编排微服务。</p><p>以下是示例命令：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>curl -X &#39;POST&#39; \\
&#39;http://localhost:8081/checkForFraud&#39; \\
-H &#39;accept: application/json&#39; \\
-H &#39;Content-Type: application/json&#39; \\
-d &#39;{
    &quot;accountId&quot;: &quot;string&quot;,
    &quot;amount&quot;: 12
}&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-3-方法2-使用orkes-playground" tabindex="-1"><a class="header-anchor" href="#_4-3-方法2-使用orkes-playground"><span>4.3. 方法2 - 使用Orkes Playground</span></a></h3><p>让我们创建一个免费账户，并利用Playground实时测试Conductor，按照以下步骤进行：</p><ol><li>登录到 https://play.orkes.io/。</li><li>创建一个账户以开始使用Orkes Conductor。</li></ol><p>现在，让我们在Playground中创建一个新的工作流，或者为了测试方便，我们也可以使用以下工作流：</p><p><em>在Playground中查看工作流</em></p><p>为了在Orkes Playground和工作器之间创建连接，我们需要在Orkes Conductor中创建一个应用程序。让我们按照以下步骤进行：</p><ol><li>在Orkes Playground上，导航到 Access Control &gt; Applications。</li><li>点击‘Create Application’并提供应用程序名称。</li><li>选择‘Application role’为‘Worker’。</li><li>点击‘Create access key’并复制并保留密钥ID和密钥密文。</li></ol><p>接下来，让我们通过以下步骤授予运行工作流的访问权限：</p><ol><li>在‘Permissions’部分，我们点击‘+Add permission’。</li><li>在‘Workflows’标签下，我们选择‘microservice_orchestration’，在‘Tasks’标签下，让我们选择‘fraud_check_required’</li><li>选择‘EXECUTE’权限并添加权限。</li></ol><p>现在，让我们打开工作器，并在application.properties文件中提供生成的密钥ID和密文。我们应该将<strong>conductor.server.url</strong>替换为<strong>https://play.orkes.io/api</strong>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>conductor.security.client.key-id=your_key_id
conductor.security.client.secret=your_key_secret
conductor.server.url=https://play.orkes.io/api
让我们运行应用程序。我们可以看到工作器轮询Conductor任务并在任务可用时接取任务。

现在，我们使用我们在Spring Boot应用程序中创建的http://localhost:8081/checkForFraud端点，它将使用play.orkes.io作为Conductor后端服务器来运行工作流。

## 5. 结论

事件驱动的微服务为构建可扩展和响应迅速的软件系统提供了激动人心的可能性。在本文中，我们经历了事件驱动微服务的基础知识，强调了它们的优势和挑战。

我们探讨了微服务，凭借其模块化和单一责任的特性，为创建复杂应用程序提供了极好的基础。

如常，文章的源代码可在GitHub上获得。

OK</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,45),s=[o];function a(d,l){return t(),n("div",null,s)}const v=e(r,[["render",a],["__file","2024-06-23-Event Driven Microservices With Orkes Conductor.html.vue"]]),p=JSON.parse('{"path":"/posts/baeldung/2024-06-23/2024-06-23-Event%20Driven%20Microservices%20With%20Orkes%20Conductor.html","title":"使用Orkes Conductor构建事件驱动的微服务","lang":"zh-CN","frontmatter":{"date":"2024-06-23T00:00:00.000Z","category":["Microservices","Event-Driven Architecture"],"tag":["Orkes Conductor","Spring"],"head":[["meta",{"name":"keywords","content":"Event-Driven Microservices, Microservices Orchestration, Orkes Conductor, Spring Boot"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-23/2024-06-23-Event%20Driven%20Microservices%20With%20Orkes%20Conductor.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用Orkes Conductor构建事件驱动的微服务"}],["meta",{"property":"og:description","content":"使用Orkes Conductor构建事件驱动的微服务 在这个教程中，我们将探讨如何使用Orkes Conductor和Spring构建事件驱动的微服务。我们将使用Conductor来使用HTTP端点和服务工作器编排微服务。 微服务提供了一种很好的方式，可以创建一个可以独立扩展和管理的模块化架构。开发人员通常将微服务设计为单一责任服务，这些服务在执行一..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-23T05:31:33.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Orkes Conductor"}],["meta",{"property":"article:tag","content":"Spring"}],["meta",{"property":"article:published_time","content":"2024-06-23T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-23T05:31:33.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用Orkes Conductor构建事件驱动的微服务\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-23T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-23T05:31:33.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用Orkes Conductor构建事件驱动的微服务 在这个教程中，我们将探讨如何使用Orkes Conductor和Spring构建事件驱动的微服务。我们将使用Conductor来使用HTTP端点和服务工作器编排微服务。 微服务提供了一种很好的方式，可以创建一个可以独立扩展和管理的模块化架构。开发人员通常将微服务设计为单一责任服务，这些服务在执行一..."},"headers":[{"level":3,"title":"2.1. 事件驱动系统的不足","slug":"_2-1-事件驱动系统的不足","link":"#_2-1-事件驱动系统的不足","children":[]},{"level":2,"title":"3. 使用Conductor的事件驱动架构","slug":"_3-使用conductor的事件驱动架构","link":"#_3-使用conductor的事件驱动架构","children":[{"level":3,"title":"4.1. 使用Orkes Conductor和Spring构建事件驱动微服务","slug":"_4-1-使用orkes-conductor和spring构建事件驱动微服务","link":"#_4-1-使用orkes-conductor和spring构建事件驱动微服务","children":[]},{"level":3,"title":"4.3. 方法2 - 使用Orkes Playground","slug":"_4-3-方法2-使用orkes-playground","link":"#_4-3-方法2-使用orkes-playground","children":[]}]}],"git":{"createdTime":1719120693000,"updatedTime":1719120693000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":6.82,"words":2045},"filePathRelative":"posts/baeldung/2024-06-23/2024-06-23-Event Driven Microservices With Orkes Conductor.md","localizedDate":"2024年6月23日","excerpt":"\\n<p>在这个教程中，我们将探讨如何使用Orkes Conductor和Spring构建事件驱动的微服务。我们将使用Conductor来使用HTTP端点和服务工作器编排微服务。</p>\\n<p>微服务提供了一种很好的方式，可以创建一个可以独立扩展和管理的模块化架构。开发人员通常将微服务设计为单一责任服务，这些服务在执行一件事情上表现得非常出色。然而，应用程序流程通常需要跨多个微服务进行协调以实现业务目标。</p>\\n<p>事件驱动架构通过事件系统在微服务之间进行通信，确保流程的可扩展性和持久性。由于这些原因，事件驱动的微服务最近变得非常流行，特别是在实现异步流程时特别有用。</p>\\n<h3>2.1. 事件驱动系统的不足</h3>","autoDesc":true}');export{v as comp,p as data};
