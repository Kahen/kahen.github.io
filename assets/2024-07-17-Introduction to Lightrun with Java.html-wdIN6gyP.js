import{_ as t}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as e,o as a,a as n}from"./app-BUAgDejY.js";const r={},i=n(`<hr><h1 id="lightrun-与-java-介绍" tabindex="-1"><a class="header-anchor" href="#lightrun-与-java-介绍"><span>Lightrun 与 Java 介绍</span></a></h1><p>在本文中，我们将探索 Lightrun——一个开发者可观测性平台——通过将其引入应用程序并展示我们可以用它实现的功能。</p><h2 id="_2-什么是-lightrun" tabindex="-1"><a class="header-anchor" href="#_2-什么是-lightrun"><span><strong>2. 什么是 Lightrun?</strong></span></a></h2><p><strong>Lightrun 是一个可观测性平台，允许我们对我们的 Java（也支持其他语言）应用程序进行仪器化，然后直接从 IntelliJ、Visual Studio Code 和许多其他日志平台和 APM 中查看这些仪器。</strong> 它被设计为能够无缝地向在任何环境中运行的应用程序添加仪器，并从任何地方访问它们，使我们能够从本地工作站到生产实例快速诊断问题。</p><p>Lightrun 通过两个不同的组件集成在一起工作：</p><ul><li>Lightrun Agent 作为应用程序的一部分运行，并根据请求仪器遥测。在 Java 应用程序中，这作为 Java Agent 工作。我们将把此代理作为我们希望使用 Lightrun 的每个应用程序的一部分运行。</li><li>Lightrun 插件作为我们开发环境的一部分运行，并允许我们与代理通信。这是我们查看正在运行的内容、向应用程序添加新仪器并接收此仪器结果的手段。</li></ul><p>一旦所有这些都设置好了，我们就可以管理三种不同类型的仪器：</p><ul><li>日志 – 这些是能够在运行中的应用程序的任何点添加任意日志语句的能力，记录任何可用值（包括复杂表达式）。这些日志可以发送到标准输出、回到我们开发环境中的 Lightrun 插件，或同时发送到两者。此外，它们可以根据特定用户或会话 ID 有条件地调用。</li><li>快照 – 这些允许我们在任何点捕捉应用程序的实时快照。这将记录触发快照的确切时间和位置、所有变量的值以及到此点的完整调用堆栈。这些也可以像日志一样有条件地调用。</li><li>指标 – 这些允许我们记录类似于 Micrometer 生成的指标，允许我们计算代码行执行的次数、记录代码块的计时或我们可能想要的任何其他数值计算。</li></ul><p>所有这些在我们的代码中已经可以轻松完成。Lightrun 在这里给我们的是<strong>在已经运行的应用程序中执行这些操作的能力，而无需更改或重新部署应用程序。</strong> 这意味着我们可以在生产中进行有针对性的仪器化，零停机时间。</p><p>此外，所有这些日志都是短暂的。它们不会在源代码或运行中的应用程序中持久存在，可以根据需要添加和删除。</p><h2 id="_3-示例应用程序" tabindex="-1"><a class="header-anchor" href="#_3-示例应用程序"><span><strong>3. 示例应用程序</strong></span></a></h2><p>对于本文，我们有一个已经构建并准备好使用的应用程序。这个应用程序旨在跟踪分配给人们的待办事项，并允许用户查询这些数据。这段代码可以在 GitHub 上找到，并且需要 Java 17+ 和 Maven 3.6 才能正确构建。</p><p>这个应用程序被架构为三个不同的服务——一个用于管理用户，另一个用于管理任务，第三个协调这两个服务。然后 <em>tasks-service</em> 和 <em>users-services</em> 有自己的数据库，并且两者之间有一个 JMS 队列——允许 <em>users-service</em> 指示一个用户被删除，以便 <em>tasks-service</em> 可以整理事情。</p><p>这些数据库和 JMS 队列都嵌入在应用程序中以方便使用。然而，在现实中，这自然会使用真实的基础设施。</p><h3 id="_3-1-任务服务" tabindex="-1"><a class="header-anchor" href="#_3-1-任务服务"><span><strong>3.1. 任务服务</strong></span></a></h3><p><strong>在本文中，我们只对 <em>tasks-service</em> 感兴趣。</strong> 然而，在将来的文章中，我们将探索所有三个服务以及它们如何相互交互。</p><p>这个服务是一个用 Maven 在 Java 17 上构建的 Spring Boot 应用程序。运行时，这有 HTTP 端点：</p><ul><li>GET / – 允许客户端按创建它的用户和其状态过滤搜索任务。</li><li>POST / – 允许客户端创建新任务。</li><li>GET /{id} – 允许客户端通过 ID 获取单个任务。</li><li>PATCH /{id} – 允许客户端更新任务，更改状态和分配给它的用户。</li><li>DELETE /{id} – 允许客户端删除任务。</li></ul><p>我们还有一个 JMS 监听器，可以指示我们的 <em>users-service</em> 中的用户何时被删除。在这种情况下，我们会自动删除该用户创建的所有任务并取消分配给该用户的所有任务。</p><p><strong>我们应用程序中还有几个错误，我们将在 Lightrun 的帮助下诊断这些错误。</strong></p><h2 id="_4-设置-lightrun" tabindex="-1"><a class="header-anchor" href="#_4-设置-lightrun"><span><strong>4. 设置 Lightrun</strong></span></a></h2><p><strong>在我们开始之前，我们需要一个 Lightrun 账户并将其设置为本地。</strong> 这可以通过访问 https://app.lightrun.com/ 并按照说明完成。</p><p>一旦我们注册了，我们需要选择开发环境和编程语言。对于本文，我们将使用 IntelliJ 和 Java，所以我们会选择这些并继续：</p><p>然后我们得到如何将 Lightrun 插件安装到我们的环境中的说明，所以我们只需按照这些说明进行。</p><p>我们还需要确保我们从开发环境中登录到我们的新账户，之后我们将能够在编辑器内访问我们的 Lightrun 代理——目前还没有——：</p><p>最后，我们得到如何下载我们将用于仪器化应用程序的 Java 代理的说明。这些说明是平台特定的，所以我们需要确保我们遵循适合我们确切设置的那些说明。</p><p>一旦我们完成了这些，我们可以开始启动应用程序并安装代理。确保 <em>tasks-service</em> 已构建，然后我们可以运行它：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">java</span> <span class="token parameter variable">-jar</span> -agentpath:<span class="token punctuation">..</span>/agent/lightrun_agent.so target/tasks-service-0.0.1-SNAPSHOT.jar
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>此时，我们的 web 浏览器中的 Onboarding 屏幕将允许我们继续，并且我们开发环境中的 UI 将自动更新以显示我们的应用程序正在运行：</p><p><strong>注意这些都连接到我们的 Lightrun 账户，所以我们可以看到它们，不管应用程序在哪里运行。</strong> 这意味着我们可以在本地机器上运行的应用程序、Docker 容器内或任何其他支持我们运行时的环境中使用完全相同的工具，无论它在世界何处。</p><h2 id="_5-捕获快照" tabindex="-1"><a class="header-anchor" href="#_5-捕获快照"><span><strong>5. 捕获快照</strong></span></a></h2><p><strong>Lightrun 最强大的功能之一是能够向当前运行的应用程序添加快照。这些将允许我们捕获应用程序在给定点的确切执行状态。</strong> 然后可以为我们提供对代码内部发生的事情的宝贵见解。它们可以被看作是“虚拟断点”，但它们不会中断程序流程。相反，它们捕获了你从断点能看到的所有信息，供我们稍后查看。</p><p>快照——以及日志和指标——是从我们开发环境中添加的。我们通常会通过右键单击我们想要添加仪器的行，然后选择“Lightrun”选项来完成此操作。</p><p>然后我们可以通过从随后的菜单中选择它来添加我们的仪器：</p><p>这将打开一个面板，允许我们添加快照：</p><p>在这里我们需要选择我们想要仪器的代理，并可能指定其他细节，确切说明它将如何工作。</p><p>当我们对一切都满意时，我们点击创建按钮。这将在我们侧边栏中添加一个新的快照条目，并且我们将在代码行旁边得到一个蓝色相机图标。</p><p>这表明当执行该行时将捕获一个快照：</p><p>注意，如果出现问题，相机会变成红色。通常，这意味着运行的代码与源代码不对应，但其他原因也可能存在，需要在这里探索。</p><h2 id="_6-诊断一个错误-–-搜索任务" tabindex="-1"><a class="header-anchor" href="#_6-诊断一个错误-–-搜索任务"><span><strong>6. 诊断一个错误 – 搜索任务</strong></span></a></h2><p><strong>我们的 <em>tasks-service</em> 有一个错误，执行过滤搜索任务时从不返回任何内容。</strong> 如果我们执行一个未过滤的搜索，那么将正确返回所有任务，但只要添加了过滤器——无论是 <em>createdBy</em>、<em>status</em> 或两者——我们就突然得到没有结果。</p><p>例如，如果我们调用 http://localhost:8082?status=PENDING，我们应该得到一些结果，但相反，我们总是得到一个空数组。</p><p>我们的应用程序架构是这样的，我们有一个 <em>TasksController</em> 来处理传入的 HTTP 请求。然后它调用 <em>TasksService</em> 来做实际的工作，这在 <em>TasksRepository</em> 中工作。</p><p>这个仓库是一个 Spring Data 接口，意味着我们没有直接的代码可以仪器化。相反，<strong>我们将在 <em>TasksService</em> 中添加一个快照。</strong> 特别是，我们将在 <em>search()</em> 方法的第一行添加它。这将让我们看到调用方法时存在的初始条件，无论我们最终走方法内的哪个代码路径：</p><p>完成这个操作后，我们将再次调用我们的端点。再次，我们将得到相同的结果，一个空数组。</p><p>然而，这次我们将在我们的开发环境中捕获一个快照——我们可以在快照选项卡上看到：</p><p><strong>这向我们展示了我们的快照被捕获的堆栈跟踪和当时捕获的所有可见变量的状态。</strong> 让我们专注于这里的变量。其中两个是传递给方法的参数，第三个是 <em>this</em>。参数是潜在最感兴趣的，所以我们会看看那些。</p><p>立即，我们可以看到问题。我们得到了“PENDING”的值——这是我们正在搜索的状态——在 <em>createdBy</em> 参数中！</p><p>更仔细地查看代码，我们发现不幸的是 <em>TasksController</em> 和 <em>TasksService</em> 之间的参数被转置了。这是一个简单的修复，如果我们进行修复——要么通过在 <em>TasksService</em> 中交换参数，要么通过从 <em>TasksController</em> 传递的值——那么我们的搜索将开始正常工作。</p><h2 id="_7-总结" tabindex="-1"><a class="header-anchor" href="#_7-总结"><span><strong>7. 总结</strong></span></a></h2><p><strong>在这里，我们看到了 Lightrun 可观测性平台的快速介绍，如何开始使用它，以及它可以给我们带来的一些好处。</strong> 我们将在即将发布的文章中更深入地探讨这些内容。</p><p>为什么不在你的下一个应用程序中使用它，以增加对其操作的信心和洞察力。</p><p>示例可以在 GitHub 上找到。</p>`,54),s=[i];function o(p,l){return a(),e("div",null,s)}const u=t(r,[["render",o],["__file","2024-07-17-Introduction to Lightrun with Java.html.vue"]]),c=JSON.parse('{"path":"/posts/baeldung/2024-07-17/2024-07-17-Introduction%20to%20Lightrun%20with%20Java.html","title":"Lightrun 与 Java 介绍","lang":"zh-CN","frontmatter":{"date":"2022-06-01T00:00:00.000Z","category":["Java","Lightrun"],"tag":["Lightrun","Java","Observability","Developer Tools"],"head":[["meta",{"name":"keywords","content":"Java, Lightrun, Observability, Developer Tools"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-17/2024-07-17-Introduction%20to%20Lightrun%20with%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Lightrun 与 Java 介绍"}],["meta",{"property":"og:description","content":"Lightrun 与 Java 介绍 在本文中，我们将探索 Lightrun——一个开发者可观测性平台——通过将其引入应用程序并展示我们可以用它实现的功能。 2. 什么是 Lightrun? Lightrun 是一个可观测性平台，允许我们对我们的 Java（也支持其他语言）应用程序进行仪器化，然后直接从 IntelliJ、Visual Studio C..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-18T00:08:55.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Lightrun"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Observability"}],["meta",{"property":"article:tag","content":"Developer Tools"}],["meta",{"property":"article:published_time","content":"2022-06-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-18T00:08:55.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Lightrun 与 Java 介绍\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-06-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-18T00:08:55.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Lightrun 与 Java 介绍 在本文中，我们将探索 Lightrun——一个开发者可观测性平台——通过将其引入应用程序并展示我们可以用它实现的功能。 2. 什么是 Lightrun? Lightrun 是一个可观测性平台，允许我们对我们的 Java（也支持其他语言）应用程序进行仪器化，然后直接从 IntelliJ、Visual Studio C..."},"headers":[{"level":2,"title":"2. 什么是 Lightrun?","slug":"_2-什么是-lightrun","link":"#_2-什么是-lightrun","children":[]},{"level":2,"title":"3. 示例应用程序","slug":"_3-示例应用程序","link":"#_3-示例应用程序","children":[{"level":3,"title":"3.1. 任务服务","slug":"_3-1-任务服务","link":"#_3-1-任务服务","children":[]}]},{"level":2,"title":"4. 设置 Lightrun","slug":"_4-设置-lightrun","link":"#_4-设置-lightrun","children":[]},{"level":2,"title":"5. 捕获快照","slug":"_5-捕获快照","link":"#_5-捕获快照","children":[]},{"level":2,"title":"6. 诊断一个错误 – 搜索任务","slug":"_6-诊断一个错误-–-搜索任务","link":"#_6-诊断一个错误-–-搜索任务","children":[]},{"level":2,"title":"7. 总结","slug":"_7-总结","link":"#_7-总结","children":[]}],"git":{"createdTime":1721261335000,"updatedTime":1721261335000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":8.96,"words":2689},"filePathRelative":"posts/baeldung/2024-07-17/2024-07-17-Introduction to Lightrun with Java.md","localizedDate":"2022年6月1日","excerpt":"<hr>\\n<h1>Lightrun 与 Java 介绍</h1>\\n<p>在本文中，我们将探索 Lightrun——一个开发者可观测性平台——通过将其引入应用程序并展示我们可以用它实现的功能。</p>\\n<h2><strong>2. 什么是 Lightrun?</strong></h2>\\n<p><strong>Lightrun 是一个可观测性平台，允许我们对我们的 Java（也支持其他语言）应用程序进行仪器化，然后直接从 IntelliJ、Visual Studio Code 和许多其他日志平台和 APM 中查看这些仪器。</strong> 它被设计为能够无缝地向在任何环境中运行的应用程序添加仪器，并从任何地方访问它们，使我们能够从本地工作站到生产实例快速诊断问题。</p>","autoDesc":true}');export{u as comp,c as data};
