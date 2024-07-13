import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as e,a as t}from"./app-DkA39C0B.js";const i={},o=t('<h1 id="在spring-boot应用程序中使用嵌入式camunda引擎" tabindex="-1"><a class="header-anchor" href="#在spring-boot应用程序中使用嵌入式camunda引擎"><span>在Spring Boot应用程序中使用嵌入式Camunda引擎</span></a></h1><p>工作流引擎在业务流程自动化中扮演着重要角色。<strong>Camunda平台是一个开源的工作流和业务流程管理系统（BPMS），它为业务流程建模提供了一个流程引擎</strong>。Spring Boot与Camunda平台有很好的集成。在本教程中，我们将探讨如何将嵌入式Camunda引擎集成到Spring Boot应用程序中。</p><h3 id="_2-camunda工作流引擎" tabindex="-1"><a class="header-anchor" href="#_2-camunda工作流引擎"><span>2. Camunda工作流引擎</span></a></h3><p>Camunda工作流引擎是Activiti的一个分支，提供了一个基于业务流程建模符号2.0（BPMN 2.0）标准的流程和仿真引擎。此外，它还包含了用于建模、执行和监控的工具和API。首先，我们可以使用<strong>Modeler</strong>建模我们的端到端业务流程。Camunda提供了用于设计BPMN工作流的Modeler。Modeler作为一个桌面应用程序本地运行。然后，我们将业务流程模型部署到工作流引擎并执行它。我们可以使用REST API和提供的Web应用程序（Cockpit、Tasklist和Admin）以不同的方式执行业务流程。Camunda引擎可以以不同的方式使用：SaaS、自托管和可嵌入的库。<strong>本教程重点介绍在Spring Boot应用程序中的Camunda嵌入式引擎</strong>。</p><h3 id="_3-使用嵌入式camunda引擎创建spring-boot应用程序" tabindex="-1"><a class="header-anchor" href="#_3-使用嵌入式camunda引擎创建spring-boot应用程序"><span>3. 使用嵌入式Camunda引擎创建Spring Boot应用程序</span></a></h3><p>在这一部分中，我们将使用Camunda Platform Initializr创建和配置带有嵌入式Camunda引擎的Spring Boot应用程序。</p><h4 id="_3-1-camunda平台initializr" tabindex="-1"><a class="header-anchor" href="#_3-1-camunda平台initializr"><span>3.1. Camunda平台Initializr</span></a></h4><p><strong>我们可以使用Camunda Platform Initializr创建一个与Camunda引擎集成的Spring Boot应用程序</strong>。它是由Camunda提供的Web应用程序工具，类似于Spring Initializr。让我们使用以下信息在Camunda Platform Initializr中创建应用程序：<img src="https://www.baeldung.com/wp-content/uploads/2022/12/init.png" alt="img" loading="lazy"> 该工具允许我们添加项目元数据，包括_组_、<em>工件</em>、<em>Camunda BPM版本</em>、<em>H2数据库_和_Java版本</em>。此外，我们可以添加_Camunda BPM模块_以支持我们的Spring Boot应用程序中的Camunda REST API或Camunda Web应用程序。我们还可以添加Spring Boot Web和Security模块。我们有的另一个选项是设置管理员用户名和密码，这是使用Camunda Web应用程序（如Cockpit应用程序登录）所需的。现在，我们点击生成项目以下载项目模板作为.zip文件。最后，我们解压文件并在IDE中打开_pom.xml_。</p><h4 id="_3-2-camunda配置" tabindex="-1"><a class="header-anchor" href="#_3-2-camunda配置"><span>3.2. Camunda配置</span></a></h4><p>生成的项目是一个<strong>带有额外Camunda依赖项和配置的常规Spring Boot应用程序</strong>。目录结构如下所示：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/12/camunda_proyect.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>在_resources_目录中有一个简单的工作流图_process.bpmn_。它使用开始节点启动执行流程。之后，它将继续执行_向演示问好_任务。在完成此任务后，执行在遇到最终节点时停止。Camunda属性存在于_application.yaml_中。让我们看看_application.yaml_中生成的默认Camunda属性：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>camunda.bpm.admin-user:\n  id: demo\n  password: demo\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以使用_camunda.bpm.admin-user_属性更改管理员用户名和密码。</p><h3 id="_4-使用spring-boot创建应用程序" tabindex="-1"><a class="header-anchor" href="#_4-使用spring-boot创建应用程序"><span>4. 使用Spring Boot创建应用程序</span></a></h3><p>使用嵌入式Camunda引擎创建Spring Boot应用程序的另一种方式是从零开始使用Spring Boot并添加Camunda库。</p><h4 id="_4-1-maven依赖项" tabindex="-1"><a class="header-anchor" href="#_4-1-maven依赖项"><span>4.1. Maven依赖项</span></a></h4><p>让我们从在我们的_pom.xml_中声明_camunda-bpm-spring-boot-starter-webapp_依赖项开始：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>```&lt;dependency&gt;```\n    ```&lt;groupId&gt;```org.camunda.bpm.springboot```&lt;/groupId&gt;```\n    ```&lt;artifactId&gt;```camunda-bpm-spring-boot-starter-webapp```&lt;/artifactId&gt;```\n    `&lt;version&gt;`7.18.0`&lt;/version&gt;`\n```&lt;/dependency&gt;```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们需要一个数据库来存储流程定义、流程实例、历史信息等。在本教程中，我们使用基于文件的_H2_数据库。因此，我们需要添加_h2_和_spring-boot-starter-jdbc_依赖项：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>```&lt;dependency&gt;```\n    ```&lt;groupId&gt;```com.h2database```&lt;/groupId&gt;```\n    ```&lt;artifactId&gt;```h2```&lt;/artifactId&gt;```\n```&lt;/dependency&gt;```\n```&lt;dependency&gt;```\n    ```&lt;groupId&gt;```org.springframework.boot```&lt;/groupId&gt;```\n    ```&lt;artifactId&gt;```spring-boot-starter-jdbc```&lt;/artifactId&gt;```\n```&lt;/dependency&gt;```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_4-2-示例流程模型" tabindex="-1"><a class="header-anchor" href="#_4-2-示例流程模型"><span>4.2. 示例流程模型</span></a></h4><p>我们使用Camunda Modeler定义一个简单的贷款请求工作流图_loanProcess.bpmn_。这里是_loanProcess_ _.bpmn_模型执行顺序的图形流程图，以帮助我们理解：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/12/loanProcess.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>我们使用开始节点启动执行流程。之后，执行_计算利息_任务。接下来，我们将继续执行_批准贷款_任务。在完成此任务后，执行在遇到最终节点时停止。<em>计算利息_任务是一个服务任务，并调用_CalculateInterestService</em> bean：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Component\npublic class CalculateInterestService implements JavaDelegate {\n\n    private static final Logger LOGGER = LoggerFactory.getLogger(CalculateInterestService.class);\n\n    @Override\n    public void execute(DelegateExecution execution) {\n        LOGGER.info(&quot;calculating interest of the loan&quot;);\n    }\n\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>我们需要实现_JavaDelegate_接口</strong>。这个类可以用于服务任务和事件监听器。<strong>它在流程执行期间在_execute()_方法中提供了所需的逻辑</strong>。现在，应用程序已经准备好启动了。</p><h3 id="_5-演示" tabindex="-1"><a class="header-anchor" href="#_5-演示"><span>5. 演示</span></a></h3><p>现在让我们运行Spring Boot应用程序。我们打开浏览器并输入URL http://localhost:8080/：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/12/camunda_login.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>让我们输入用户凭据并访问Camunda Web应用程序Cockpit、Tasklist和Admin：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/12/camunda_welcome.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h4 id="_5-1-cockpit应用程序" tabindex="-1"><a class="header-anchor" href="#_5-1-cockpit应用程序"><span>5.1. Cockpit应用程序</span></a></h4><p><strong>Camunda Cockpit Web应用程序为用户提供了监控实施流程及其操作的实时视图</strong>。我们可以看到当Spring Boot应用程序启动时自动部署的流程数量：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/12/camunda_cockpit.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>如我们所见，有一个部署的流程（<em>loanProcess</em> <em>.bpmn</em>）。我们可以通过点击部署的流程来查看部署的流程图：</p><p>现在，流程尚未启动。我们可以使用Tasklist应用程序启动它。</p><h4 id="_5-2-tasklist应用程序" tabindex="-1"><a class="header-anchor" href="#_5-2-tasklist应用程序"><span>5.2. Tasklist应用程序</span></a></h4><p><strong>Camunda Tasklist应用程序用于管理用户与他们任务的交互</strong>。我们可以通过点击开始流程菜单项来启动我们的示例流程：</p><p>启动流程后，执行_计算利息_任务。它记录在控制台中：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>2022-11-27 09:34:05.848 INFO 2748 --- [nio-8080-exec-3] c.e.c.task.CalculateInterestService : calculating interest of the loan\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>现在，我们可以看到在Cockpit应用程序中运行的流程实例：</p><p>注意，流程正在等待_批准贷款_用户任务。在这一步中，我们将任务分配给_demo_用户。因此，_demo_用户可以在Tasklist应用程序中看到任务：</p><p>我们可以通过点击完成按钮来完成任务。最后，我们可以看到在Cockpit应用程序中运行的流程已经完成。</p><h4 id="_5-3-admin应用程序" tabindex="-1"><a class="header-anchor" href="#_5-3-admin应用程序"><span>5.3. Admin应用程序</span></a></h4><p><strong>Camunda Admin应用程序用于管理用户及其对系统的访问</strong>。此外，我们可以管理租户和组：</p><h3 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h3><p>在本文中，我们讨论了使用嵌入式Camunda引擎设置Spring Boot应用程序的基础知识。我们使用Camunda Platform Initializr工具和从头开始的Spring Boot创建了应用程序。此外，我们使用Camunda Modeler定义了一个简单的贷款请求流程模型。此外，我们使用Camunda Web应用程序启动并探索了这个流程模型。本文所示代码的工作版本可在GitHub上找到。</p>',48),d=[o];function r(s,p){return e(),n("div",null,d)}const m=a(i,[["render",r],["__file","2024-07-11-Running Spring Boot Applications with the Embedded Camunda Engine.html.vue"]]),g=JSON.parse('{"path":"/posts/baeldung/2024-07-11/2024-07-11-Running%20Spring%20Boot%20Applications%20with%20the%20Embedded%20Camunda%20Engine.html","title":"在Spring Boot应用程序中使用嵌入式Camunda引擎","lang":"zh-CN","frontmatter":{"date":"2022-12-01T00:00:00.000Z","category":["Spring Boot","Camunda"],"tag":["workflow","BPMS"],"head":[["meta",{"name":"keywords","content":"Spring Boot, Camunda, embedded engine, workflow engine, business process automation"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-11/2024-07-11-Running%20Spring%20Boot%20Applications%20with%20the%20Embedded%20Camunda%20Engine.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Spring Boot应用程序中使用嵌入式Camunda引擎"}],["meta",{"property":"og:description","content":"在Spring Boot应用程序中使用嵌入式Camunda引擎 工作流引擎在业务流程自动化中扮演着重要角色。Camunda平台是一个开源的工作流和业务流程管理系统（BPMS），它为业务流程建模提供了一个流程引擎。Spring Boot与Camunda平台有很好的集成。在本教程中，我们将探讨如何将嵌入式Camunda引擎集成到Spring Boot应用程..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2022/12/init.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-11T20:03:12.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"workflow"}],["meta",{"property":"article:tag","content":"BPMS"}],["meta",{"property":"article:published_time","content":"2022-12-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-11T20:03:12.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Spring Boot应用程序中使用嵌入式Camunda引擎\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2022/12/init.png\\",\\"https://www.baeldung.com/wp-content/uploads/2022/12/camunda_proyect.png\\",\\"https://www.baeldung.com/wp-content/uploads/2022/12/loanProcess.png\\",\\"https://www.baeldung.com/wp-content/uploads/2022/12/camunda_login.png\\",\\"https://www.baeldung.com/wp-content/uploads/2022/12/camunda_welcome.png\\",\\"https://www.baeldung.com/wp-content/uploads/2022/12/camunda_cockpit.png\\"],\\"datePublished\\":\\"2022-12-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-11T20:03:12.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Spring Boot应用程序中使用嵌入式Camunda引擎 工作流引擎在业务流程自动化中扮演着重要角色。Camunda平台是一个开源的工作流和业务流程管理系统（BPMS），它为业务流程建模提供了一个流程引擎。Spring Boot与Camunda平台有很好的集成。在本教程中，我们将探讨如何将嵌入式Camunda引擎集成到Spring Boot应用程..."},"headers":[{"level":3,"title":"2. Camunda工作流引擎","slug":"_2-camunda工作流引擎","link":"#_2-camunda工作流引擎","children":[]},{"level":3,"title":"3. 使用嵌入式Camunda引擎创建Spring Boot应用程序","slug":"_3-使用嵌入式camunda引擎创建spring-boot应用程序","link":"#_3-使用嵌入式camunda引擎创建spring-boot应用程序","children":[]},{"level":3,"title":"4. 使用Spring Boot创建应用程序","slug":"_4-使用spring-boot创建应用程序","link":"#_4-使用spring-boot创建应用程序","children":[]},{"level":3,"title":"5. 演示","slug":"_5-演示","link":"#_5-演示","children":[]},{"level":3,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1720728192000,"updatedTime":1720728192000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.87,"words":1761},"filePathRelative":"posts/baeldung/2024-07-11/2024-07-11-Running Spring Boot Applications with the Embedded Camunda Engine.md","localizedDate":"2022年12月1日","excerpt":"\\n<p>工作流引擎在业务流程自动化中扮演着重要角色。<strong>Camunda平台是一个开源的工作流和业务流程管理系统（BPMS），它为业务流程建模提供了一个流程引擎</strong>。Spring Boot与Camunda平台有很好的集成。在本教程中，我们将探讨如何将嵌入式Camunda引擎集成到Spring Boot应用程序中。</p>\\n<h3>2. Camunda工作流引擎</h3>\\n<p>Camunda工作流引擎是Activiti的一个分支，提供了一个基于业务流程建模符号2.0（BPMN 2.0）标准的流程和仿真引擎。此外，它还包含了用于建模、执行和监控的工具和API。首先，我们可以使用<strong>Modeler</strong>建模我们的端到端业务流程。Camunda提供了用于设计BPMN工作流的Modeler。Modeler作为一个桌面应用程序本地运行。然后，我们将业务流程模型部署到工作流引擎并执行它。我们可以使用REST API和提供的Web应用程序（Cockpit、Tasklist和Admin）以不同的方式执行业务流程。Camunda引擎可以以不同的方式使用：SaaS、自托管和可嵌入的库。<strong>本教程重点介绍在Spring Boot应用程序中的Camunda嵌入式引擎</strong>。</p>","autoDesc":true}');export{m as comp,g as data};
