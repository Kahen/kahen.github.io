import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as t}from"./app-BDZ-trJf.js";const e={},p=t('<h1 id="如何在jmeter中生成仪表板报告" tabindex="-1"><a class="header-anchor" href="#如何在jmeter中生成仪表板报告"><span>如何在JMeter中生成仪表板报告</span></a></h1><p>在本教程中，我们将探索JMeter仪表板报告的生成。JMeter是一个用Java编写的流行测试工具。我们使用JMeter进行负载测试、性能测试和压力测试。除了生成丰富的统计数据外，一个重要特性是将测试结果以有用的可视化格式显示出来。JMeter正是这样做的，它允许我们除了生成多种格式的文本报告外，还能生成仪表板报告。</p><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><h2 id="_2-先决条件" tabindex="-1"><a class="header-anchor" href="#_2-先决条件"><span>2. 先决条件</span></a></h2><p>我们需要一个带有JMeter maven插件的Spring Boot应用程序。我们已经设置了一个带有三个端点的示例Spring Boot MVC应用程序。这些端点返回问候消息、每日引用和服务器时间。这就是我们运行JMeter测试并生成仪表板报告所需的全部。</p><h2 id="_3-运行jmeter测试" tabindex="-1"><a class="header-anchor" href="#_3-运行jmeter测试"><span>3. 运行JMeter测试</span></a></h2><p>现在，让我们看看针对我们的应用程序端点运行JMeter测试。</p><h3 id="_3-1-创建jmeter测试计划" tabindex="-1"><a class="header-anchor" href="#_3-1-创建jmeter测试计划"><span>3.1. 创建JMeter测试计划</span></a></h3><p><strong>使用JMeter GUI，我们将生成一个JMeter测试计划。</strong></p><p>让我们通过JMeter GUI创建一个名为_ReportsDashboardExample.jmx_的测试计划：</p><div class="language-plaintext line-numbers-mode" data-ext="plaintext" data-title="plaintext"><pre class="language-plaintext"><code>${project.basedir}/src/main/resources/dashboard/ReportsDashboardExample.jmx\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>除了将我们的测试计划保存在文件中，我们还可以将现有的测试计划重新加载到我们的JMeter GUI中。此外，我们可以根据需要审查和更新它。在我们的例子中，我们有一个非常简单的测试计划，这足以满足我们的演示目的。</p><p>当我们执行我们的测试计划_ReportsDashboardExample.jmx_时，它会将测试结果生成到一个CSV文件_ReportsDashboardExample.csv_中。</p><p>接下来，让我们生成JMeter仪表板报告。JMeter使用我们在_ReportsDashboardExample.csv_文件中可用的测试结果来生成仪表板报告。</p><h3 id="_3-2-配置jmeter-maven插件" tabindex="-1"><a class="header-anchor" href="#_3-2-配置jmeter-maven插件"><span>3.2. 配置JMeter Maven插件</span></a></h3><p>JMeter Maven插件的配置非常重要：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>configuration</span><span class="token punctuation">&gt;</span></span>``\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>testFilesDirectory</span><span class="token punctuation">&gt;</span></span>`${project.basedir}/src/main/resources/dashboard`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>testFilesDirectory</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>resultsDirectory</span><span class="token punctuation">&gt;</span></span>`${project.basedir}/src/main/resources/dashboard`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>resultsDirectory</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>generateReports</span><span class="token punctuation">&gt;</span></span>`true`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>generateReports</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ignoreResultFailures</span><span class="token punctuation">&gt;</span></span>`true`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ignoreResultFailures</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>testResultsTimestamp</span><span class="token punctuation">&gt;</span></span>`false`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>testResultsTimestamp</span><span class="token punctuation">&gt;</span></span>`\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>configuration</span><span class="token punctuation">&gt;</span></span>``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>将_generateReports_元素设置为_true_指示插件生成仪表板报告。JMeter默认在_target/jmeter_目录下生成报告。然而，我们也可以覆盖默认行为。</p><h3 id="_3-3-生成仪表板报告" tabindex="-1"><a class="header-anchor" href="#_3-3-生成仪表板报告"><span>3.3. 生成仪表板报告</span></a></h3><p>**为了运行JMeter测试，我们创建了一个名为_dashboard_的Maven配置文件。**将环境变量&#39;_env&#39;设置为&#39;_dash&#39;值可以映射并激活仪表板配置文件：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>profile</span><span class="token punctuation">&gt;</span></span>`\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>id</span><span class="token punctuation">&gt;</span></span>````dashboard````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>id</span><span class="token punctuation">&gt;</span></span>````\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>activation</span><span class="token punctuation">&gt;</span></span>`\n        `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span><span class="token punctuation">&gt;</span></span>`\n            `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>name</span><span class="token punctuation">&gt;</span></span>`env`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>name</span><span class="token punctuation">&gt;</span></span>`\n            `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>value</span><span class="token punctuation">&gt;</span></span>`dash`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>value</span><span class="token punctuation">&gt;</span></span>`\n        `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>activation</span><span class="token punctuation">&gt;</span></span>`\n`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>profile</span><span class="token punctuation">&gt;</span></span>`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用此配置文件运行我们代码的Maven命令是：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>mvn clean <span class="token function">install</span> <span class="token parameter variable">-Denv</span><span class="token operator">=</span>dash\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>尽管我们可以更改全局设置，但设置单独的配置文件可以隔离我们的特定依赖项、插件和配置。这使我们能够避免触及我们的_pom.xml_中的其他配置文件和全局部分。</p><h3 id="_3-4-查看仪表板报告" tabindex="-1"><a class="header-anchor" href="#_3-4-查看仪表板报告"><span>3.4. 查看仪表板报告</span></a></h3><p>在测试运行期间，生成的日志除了其他信息外，还提供了报告的目标路径：</p><div class="language-plaintext line-numbers-mode" data-ext="plaintext" data-title="plaintext"><pre class="language-plaintext"><code>[INFO] Will generate HTML report in [PATH_TO_REPORT]\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>打开此路径中的_index.html_，我们将获得仪表板视图：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/02/dashboard-300x295.jpg" alt="仪表板截图" tabindex="0" loading="lazy"><figcaption>仪表板截图</figcaption></figure><p>此仪表板以漂亮的格式为我们的三个端点的统计数据提供了视图。相应图表支持我们的表格数据。饼图全部是绿色的，这表明我们所有的测试都是成功的。然而，我们也可以引入一些错误使其更加真实。例如，我们可以创建一个指向不存在端点的_HTTP Request Sampler_。因此，这也会引入饼图中的红色区域。</p><p>这结束了我们的仪表板报告生成练习。接下来，我们来看看我们的项目配置。</p><h2 id="_4-maven目标" tabindex="-1"><a class="header-anchor" href="#_4-maven目标"><span>4. Maven目标</span></a></h2><p>我们的目标之一是在测试环境中运行一个示例应用程序。因此，我们的JMeter测试能够使用我们本地测试环境中的目标端点。让我们深入了解相应的_pom.xml_配置。</p><h3 id="_4-1-spring-boot-maven插件" tabindex="-1"><a class="header-anchor" href="#_4-1-spring-boot-maven插件"><span>4.1. Spring Boot Maven插件</span></a></h3><p>在我们的情况下，我们希望Maven目标以守护进程的方式运行Spring Boot应用程序。因此，我们使用来自_spring-boot-maven-plugin_的_start_和_stop_目标。此外，这两个目标包装了JMeter Maven插件的目标。</p><p>Spring Boot Maven插件_start_目标保持web服务器运行，直到我们停止它：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>execution</span><span class="token punctuation">&gt;</span></span>```\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>id</span><span class="token punctuation">&gt;</span></span>````launch-web-app````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>id</span><span class="token punctuation">&gt;</span></span>````\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>goals</span><span class="token punctuation">&gt;</span></span>```\n        ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>goal</span><span class="token punctuation">&gt;</span></span>````start````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>goal</span><span class="token punctuation">&gt;</span></span>````\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>goals</span><span class="token punctuation">&gt;</span></span>```\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>configuration</span><span class="token punctuation">&gt;</span></span>``\n        `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>mainClass</span><span class="token punctuation">&gt;</span></span>`com.baeldung.dashboard.DashboardApplication`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>mainClass</span><span class="token punctuation">&gt;</span></span>`\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>configuration</span><span class="token punctuation">&gt;</span></span>``\n```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>execution</span><span class="token punctuation">&gt;</span></span>```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们Maven配置文件中的最后一个目标是相应的_stop_目标：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>execution</span><span class="token punctuation">&gt;</span></span>```\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>id</span><span class="token punctuation">&gt;</span></span>````stop-web-app````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>id</span><span class="token punctuation">&gt;</span></span>````\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>goals</span><span class="token punctuation">&gt;</span></span>```\n        ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>goal</span><span class="token punctuation">&gt;</span></span>````stop````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>goal</span><span class="token punctuation">&gt;</span></span>````\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>goals</span><span class="token punctuation">&gt;</span></span>```\n```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>execution</span><span class="token punctuation">&gt;</span></span>```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2-jmeter-maven插件" tabindex="-1"><a class="header-anchor" href="#_4-2-jmeter-maven插件"><span>4.2. JMeter Maven插件</span></a></h3><p>我们在Spring Boot <em>start_和_stop_目标之间包装了JMeter Maven插件的目标。我们希望在JMeter测试完成执行时保持Spring Boot应用程序的运行。我们的_pom.xml_文件定义了来自_jmeter-maven-plugin_的_configure</em>、_jmeter_和_results_目标。此外，具有_id_为_jmeter-tests_的执行执行了两个目标：_jmeter_目标和_results_目标：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>execution</span><span class="token punctuation">&gt;</span></span>```\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>id</span><span class="token punctuation">&gt;</span></span>````jmeter-tests````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>id</span><span class="token punctuation">&gt;</span></span>````\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>goals</span><span class="token punctuation">&gt;</span></span>```\n        ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>goal</span><span class="token punctuation">&gt;</span></span>````jmeter````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>goal</span><span class="token punctuation">&gt;</span></span>````\n        ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>goal</span><span class="token punctuation">&gt;</span></span>````results````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>goal</span><span class="token punctuation">&gt;</span></span>````\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>goals</span><span class="token punctuation">&gt;</span></span>```\n```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>execution</span><span class="token punctuation">&gt;</span></span>```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>在某些情况下，如果发生错误，最后一个停止服务器的目标可能无法执行，导致web服务器永久运行。然而，我们可以手动停止web服务器。我们将不得不找出我们的Spring Boot应用程序的进程ID，然后从我们的命令行或Bash shell手动杀死进程。</strong></p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们学习了JMeter仪表板报告的生成。获取可视化报告总是比纯文本更有用、更高效、更容易分析数据的方式。</p><p>在我们的例子中，我们使用JMeter来测试web端点。JMeter还涵盖了其他用例。一些例子包括测试RESTful服务、数据库和消息服务。</p><p>我们还可以添加断言来创建通过/失败标准。JMeter GUI提供了一个更简单的界面来构建您的测试计划。然而，在生产中，我们使用JMeter的非GUI模式，因为GUI模式资源密集。</p><p>我们还可以使用一组资源来运行我们的JMeter测试，以获得更大的负载。这是JMeter大规模测试的典型配置。</p><p>如往常一样，文章示例的源代码可以在GitHub上找到。</p><p>OK</p>',50),l=[p];function o(c,i){return s(),n("div",null,l)}const d=a(e,[["render",o],["__file","2024-07-09-How Do I Generate a Dashboard Report in JMeter .html.vue"]]),g=JSON.parse('{"path":"/posts/baeldung/2024-07-09/2024-07-09-How%20Do%20I%20Generate%20a%20Dashboard%20Report%20in%20JMeter%20.html","title":"如何在JMeter中生成仪表板报告","lang":"zh-CN","frontmatter":{"date":"2023-02-01T00:00:00.000Z","category":["JMeter","性能测试"],"tag":["JMeter","性能测试","报告"],"head":[["meta",{"name":"keywords","content":"JMeter, 性能测试, 报告, 仪表板"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-09/2024-07-09-How%20Do%20I%20Generate%20a%20Dashboard%20Report%20in%20JMeter%20.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"如何在JMeter中生成仪表板报告"}],["meta",{"property":"og:description","content":"如何在JMeter中生成仪表板报告 在本教程中，我们将探索JMeter仪表板报告的生成。JMeter是一个用Java编写的流行测试工具。我们使用JMeter进行负载测试、性能测试和压力测试。除了生成丰富的统计数据外，一个重要特性是将测试结果以有用的可视化格式显示出来。JMeter正是这样做的，它允许我们除了生成多种格式的文本报告外，还能生成仪表板报告。..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2023/02/dashboard-300x295.jpg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-09T20:38:37.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"JMeter"}],["meta",{"property":"article:tag","content":"性能测试"}],["meta",{"property":"article:tag","content":"报告"}],["meta",{"property":"article:published_time","content":"2023-02-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-09T20:38:37.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"如何在JMeter中生成仪表板报告\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2023/02/dashboard-300x295.jpg\\"],\\"datePublished\\":\\"2023-02-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-09T20:38:37.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"如何在JMeter中生成仪表板报告 在本教程中，我们将探索JMeter仪表板报告的生成。JMeter是一个用Java编写的流行测试工具。我们使用JMeter进行负载测试、性能测试和压力测试。除了生成丰富的统计数据外，一个重要特性是将测试结果以有用的可视化格式显示出来。JMeter正是这样做的，它允许我们除了生成多种格式的文本报告外，还能生成仪表板报告。..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 先决条件","slug":"_2-先决条件","link":"#_2-先决条件","children":[]},{"level":2,"title":"3. 运行JMeter测试","slug":"_3-运行jmeter测试","link":"#_3-运行jmeter测试","children":[{"level":3,"title":"3.1. 创建JMeter测试计划","slug":"_3-1-创建jmeter测试计划","link":"#_3-1-创建jmeter测试计划","children":[]},{"level":3,"title":"3.2. 配置JMeter Maven插件","slug":"_3-2-配置jmeter-maven插件","link":"#_3-2-配置jmeter-maven插件","children":[]},{"level":3,"title":"3.3. 生成仪表板报告","slug":"_3-3-生成仪表板报告","link":"#_3-3-生成仪表板报告","children":[]},{"level":3,"title":"3.4. 查看仪表板报告","slug":"_3-4-查看仪表板报告","link":"#_3-4-查看仪表板报告","children":[]}]},{"level":2,"title":"4. Maven目标","slug":"_4-maven目标","link":"#_4-maven目标","children":[{"level":3,"title":"4.1. Spring Boot Maven插件","slug":"_4-1-spring-boot-maven插件","link":"#_4-1-spring-boot-maven插件","children":[]},{"level":3,"title":"4.2. JMeter Maven插件","slug":"_4-2-jmeter-maven插件","link":"#_4-2-jmeter-maven插件","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720557517000,"updatedTime":1720557517000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.37,"words":1610},"filePathRelative":"posts/baeldung/2024-07-09/2024-07-09-How Do I Generate a Dashboard Report in JMeter .md","localizedDate":"2023年2月1日","excerpt":"\\n<p>在本教程中，我们将探索JMeter仪表板报告的生成。JMeter是一个用Java编写的流行测试工具。我们使用JMeter进行负载测试、性能测试和压力测试。除了生成丰富的统计数据外，一个重要特性是将测试结果以有用的可视化格式显示出来。JMeter正是这样做的，它允许我们除了生成多种格式的文本报告外，还能生成仪表板报告。</p>\\n<h2>1. 概述</h2>\\n<h2>2. 先决条件</h2>\\n<p>我们需要一个带有JMeter maven插件的Spring Boot应用程序。我们已经设置了一个带有三个端点的示例Spring Boot MVC应用程序。这些端点返回问候消息、每日引用和服务器时间。这就是我们运行JMeter测试并生成仪表板报告所需的全部。</p>","autoDesc":true}');export{d as comp,g as data};
