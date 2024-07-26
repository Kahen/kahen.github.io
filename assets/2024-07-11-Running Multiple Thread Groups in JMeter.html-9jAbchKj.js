import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as a,a as p}from"./app-DpYLEM_u.js";const l={},n=p('<h1 id="在jmeter中运行多个线程组" tabindex="-1"><a class="header-anchor" href="#在jmeter中运行多个线程组"><span>在JMeter中运行多个线程组</span></a></h1><p>在使用JMeter时，我们可以将场景分组，并以不同的方式运行它们，以复制现实世界的流量。</p><p>在本教程中，我们将学习如何以及何时使用多个线程组来复制现实世界的场景，以及如何使用简单的测试计划将它们按顺序或并行运行。</p><h2 id="_2-创建多个线程组" tabindex="-1"><a class="header-anchor" href="#_2-创建多个线程组"><span>2. 创建多个线程组</span></a></h2><p>线程组是JMeter的一个元素，它控制执行测试的线程数量。</p><p>JMeter测试计划中的每个线程组模拟一个特定的现实世界应用场景。</p><p>大多数基于服务器的应用程序通常有多个场景，因此为每个用例创建一个单独的线程组，可以让我们更灵活地在测试期间正确分配这个负载。</p><p>运行多个线程组有两种方式：顺序或并行。</p><h2 id="_3-顺序运行线程组" tabindex="-1"><a class="header-anchor" href="#_3-顺序运行线程组"><span>3. 顺序运行线程组</span></a></h2><p>当我们想要一个接一个地执行应用程序场景，特别是当各个场景之间存在依赖关系时，这非常有用。</p><h3 id="_3-1-使用案例" tabindex="-1"><a class="header-anchor" href="#_3-1-使用案例"><span>3.1. 使用案例</span></a></h3><p>假设我们有一个电子商务应用程序，用户可以浏览产品，将他们喜欢的产品添加到购物车，最后启动结账，然后下最终订单。</p><p>对于这样的应用程序，当我们想要模拟用户旅程时，我们希望我们的脚本遵循特定的顺序。例如，我们的脚本可能首先执行浏览产品，然后是将产品添加到购物车，最后是下订单。</p><h3 id="_3-2-配置" tabindex="-1"><a class="header-anchor" href="#_3-2-配置"><span>3.2. 配置</span></a></h3><p>从测试计划中，您可以通过选中复选框_“按顺序连续运行线程组（即一次运行一个）”_来实现这种行为。</p><h2 id="_4-并行运行线程组" tabindex="-1"><a class="header-anchor" href="#_4-并行运行线程组"><span>4. 并行运行线程组</span></a></h2><p>当各个场景之间没有依赖关系时，这非常有用。</p><p>测试操作同时执行，模拟对被测试系统混合负载。</p><h3 id="_4-1-使用案例" tabindex="-1"><a class="header-anchor" href="#_4-1-使用案例"><span>4.1. 使用案例</span></a></h3><p>以一个网站为例，该网站有诸如技术新闻、市场新闻、体育新闻等不同类别的新闻。</p><p>这个网站的主页总是显示所有不同类别的最新顶级新闻。</p><p>对于这样的应用程序，我们仍然可以创建多个线程组，以在不同页面上有不同的用户负载分布。</p><p>然而，由于它们是相互独立的，我们可以同时执行这些线程组。</p><h3 id="_4-2-配置" tabindex="-1"><a class="header-anchor" href="#_4-2-配置"><span>4.2. 配置</span></a></h3><p>JMeter的测试计划默认配置为并行运行多个线程组，所以我们不需要选中_“按顺序连续运行线程组”_。</p><h2 id="_5-测试用例设置" tabindex="-1"><a class="header-anchor" href="#_5-测试用例设置"><span>5. 测试用例设置</span></a></h2><p>要尝试一个测试计划，我们需要一个API。我们可以使用JSON Placeholder网站公开的一个API。这个网站为我们提供了用于实验的虚假API。</p><p>我们将使用两个场景进行我们的测试计划：</p><p>场景1：读取特定帖子。</p><p>场景2：创建新帖子。</p><p>由于大多数最终用户对阅读帖子比写新帖子更感兴趣，我们希望将它们作为两个单独的线程组的一部分。</p><h2 id="_6-向测试计划添加线程组" tabindex="-1"><a class="header-anchor" href="#_6-向测试计划添加线程组"><span>6. 向测试计划添加线程组</span></a></h2><h3 id="_6-1-创建基本测试计划" tabindex="-1"><a class="header-anchor" href="#_6-1-创建基本测试计划"><span>6.1. 创建基本测试计划</span></a></h3><p>我们将运行JMeter以开始。</p><p>默认情况下，JMeter创建一个名为_Test Plan_的默认测试计划。让我们将此名称更新为_My Test Plan_。</p><h3 id="_6-2-添加多个线程组" tabindex="-1"><a class="header-anchor" href="#_6-2-添加多个线程组"><span>6.2. 添加多个线程组</span></a></h3><p>要创建线程组，我们将右键单击_Test Plan_并选择_Add -&gt; Threads (Users) -&gt; Thread Group_。</p><p>现在我们将创建两个线程组，首先创建一个GET请求线程组：</p><p>这个线程组将用于读取特定帖子。</p><p>我们在这里指定了一些关键参数：</p><ul><li><em>名称</em>：GET请求线程组（我们要给这个线程组的名称）</li><li><em>线程数量</em>：5（我们将模拟的虚拟用户数量作为负载的一部分）</li><li><em>启动期</em>：10（使配置的线程数量启动并运行所需的时间）</li><li><em>循环次数</em>：1（JMeter应该执行特定场景的次数）</li></ul><p>接下来，我们将创建POST请求线程组：</p><p>这个线程组将用于创建新帖子。</p><p>在这里，我们指定了：</p><ul><li><em>名称</em>：POST请求线程组（我们要给这个线程组的名称）</li><li><em>线程数量</em>：5（我们将模拟的虚拟用户数量作为负载的一部分）。</li><li><em>启动期</em>：10（使特定线程组的配置线程数量启动并运行所需的时间）</li><li><em>循环次数</em>：1（JMeter应该执行定义在个别线程组中的特定场景的次数）</li></ul><h3 id="_6-3-添加请求" tabindex="-1"><a class="header-anchor" href="#_6-3-添加请求"><span>6.3. 添加请求</span></a></h3><p>现在，对于每个线程组，我们将添加一个新的HTTP请求。</p><p>要创建请求，我们右键单击_Test Group_并选择_Add -&gt; Sampler -&gt; HTTP Request_。</p><p>现在我们在GET请求线程组下创建一个请求：</p><p>在这里，我们指定了：</p><ul><li><em>名称</em>：读取帖子（我们要给这个HTTP请求的名称）</li><li>注释：使用ID =1读取特定帖子</li><li><em>服务器名称或IP</em>：my-json-server.typicode.com</li><li><em>HTTP请求类型</em>：GET（HTTP请求方法）</li><li><em>路径</em>：/typicode/demo/posts</li><li>发送请求的参数：在这里，我们使用了1个参数，即id（这是检索具有特定ID的帖子所需的）</li></ul><p>现在我们将在POST请求线程组下创建另一个请求：</p><p>在这里，我们指定了：</p><ul><li><em>名称</em>：创建帖子（我们要给这个HTTP请求的名称）</li><li>注释：通过发布到服务器创建新帖子ID =p1</li><li><em>服务器名称或IP</em>：my-json-server.typicode.com</li><li><em>路径</em>：/typicode/demo/posts</li><li><em>发送请求的参数</em>：在这里，我们使用了两个参数，即id和标题（这些是创建新帖子所需的属性）</li></ul><h3 id="_6-4-添加摘要报告" tabindex="-1"><a class="header-anchor" href="#_6-4-添加摘要报告"><span>6.4. 添加摘要报告</span></a></h3><p>JMeter允许我们以多种格式查看结果。</p><p>要查看我们的执行结果，我们将添加一个在表格中查看结果的监听器。</p><p>要创建请求，我们右键单击_“测试计划”<em>并选择_Add -&gt; Listener -&gt; View Results in Table</em>。</p><h3 id="_6-5-运行测试-并行" tabindex="-1"><a class="header-anchor" href="#_6-5-运行测试-并行"><span>6.5. 运行测试（并行）</span></a></h3><p>现在我们按下工具栏上的_Run_按钮（Ctrl + R）开始JMeter性能测试。</p><p>测试结果实时显示：</p><p>这表明读取帖子和创建帖子是按配置的线程数量一个接一个（并行）运行的。</p><p>这个测试结果是运行多个线程组并行的默认设置（未选中复选框）的结果：</p><h3 id="_6-6-运行测试-顺序" tabindex="-1"><a class="header-anchor" href="#_6-6-运行测试-顺序"><span>6.6. 运行测试（顺序）</span></a></h3><p>现在我们从我们的测试计划中选中_按顺序连续运行线程组_（即一次运行一个）复选框：</p><p>现在我们再次按下工具栏上的_Run_按钮（Ctrl + R）开始JMeter性能测试。</p><p>测试结果实时显示：</p><p>这表明所有映射到读取帖子的线程首先执行，然后是创建帖子的线程。</p><h2 id="_7-结论" tabindex="-1"><a class="header-anchor" href="#_7-结论"><span>7. 结论</span></a></h2><p>在本教程中，我们已经看到如何创建多个线程组，并可以使用它们来模拟真实应用程序的用户负载。</p><p>我们还学习了如何配置多个线程组按顺序或并行的场景。</p>',71),r=[n];function i(s,h){return a(),t("div",null,r)}const _=e(l,[["render",i],["__file","2024-07-11-Running Multiple Thread Groups in JMeter.html.vue"]]),c=JSON.parse('{"path":"/posts/baeldung/2024-07-11/2024-07-11-Running%20Multiple%20Thread%20Groups%20in%20JMeter.html","title":"在JMeter中运行多个线程组","lang":"zh-CN","frontmatter":{"date":"2022-12-01T00:00:00.000Z","category":["JMeter","性能测试"],"tag":["JMeter","多线程组","性能测试"],"head":[["meta",{"name":"keywords","content":"JMeter, 多线程组, 性能测试, 测试计划, 并行, 顺序"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-11/2024-07-11-Running%20Multiple%20Thread%20Groups%20in%20JMeter.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在JMeter中运行多个线程组"}],["meta",{"property":"og:description","content":"在JMeter中运行多个线程组 在使用JMeter时，我们可以将场景分组，并以不同的方式运行它们，以复制现实世界的流量。 在本教程中，我们将学习如何以及何时使用多个线程组来复制现实世界的场景，以及如何使用简单的测试计划将它们按顺序或并行运行。 2. 创建多个线程组 线程组是JMeter的一个元素，它控制执行测试的线程数量。 JMeter测试计划中的每个..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-11T11:37:01.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"JMeter"}],["meta",{"property":"article:tag","content":"多线程组"}],["meta",{"property":"article:tag","content":"性能测试"}],["meta",{"property":"article:published_time","content":"2022-12-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-11T11:37:01.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在JMeter中运行多个线程组\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-12-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-11T11:37:01.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在JMeter中运行多个线程组 在使用JMeter时，我们可以将场景分组，并以不同的方式运行它们，以复制现实世界的流量。 在本教程中，我们将学习如何以及何时使用多个线程组来复制现实世界的场景，以及如何使用简单的测试计划将它们按顺序或并行运行。 2. 创建多个线程组 线程组是JMeter的一个元素，它控制执行测试的线程数量。 JMeter测试计划中的每个..."},"headers":[{"level":2,"title":"2. 创建多个线程组","slug":"_2-创建多个线程组","link":"#_2-创建多个线程组","children":[]},{"level":2,"title":"3. 顺序运行线程组","slug":"_3-顺序运行线程组","link":"#_3-顺序运行线程组","children":[{"level":3,"title":"3.1. 使用案例","slug":"_3-1-使用案例","link":"#_3-1-使用案例","children":[]},{"level":3,"title":"3.2. 配置","slug":"_3-2-配置","link":"#_3-2-配置","children":[]}]},{"level":2,"title":"4. 并行运行线程组","slug":"_4-并行运行线程组","link":"#_4-并行运行线程组","children":[{"level":3,"title":"4.1. 使用案例","slug":"_4-1-使用案例","link":"#_4-1-使用案例","children":[]},{"level":3,"title":"4.2. 配置","slug":"_4-2-配置","link":"#_4-2-配置","children":[]}]},{"level":2,"title":"5. 测试用例设置","slug":"_5-测试用例设置","link":"#_5-测试用例设置","children":[]},{"level":2,"title":"6. 向测试计划添加线程组","slug":"_6-向测试计划添加线程组","link":"#_6-向测试计划添加线程组","children":[{"level":3,"title":"6.1. 创建基本测试计划","slug":"_6-1-创建基本测试计划","link":"#_6-1-创建基本测试计划","children":[]},{"level":3,"title":"6.2. 添加多个线程组","slug":"_6-2-添加多个线程组","link":"#_6-2-添加多个线程组","children":[]},{"level":3,"title":"6.3. 添加请求","slug":"_6-3-添加请求","link":"#_6-3-添加请求","children":[]},{"level":3,"title":"6.4. 添加摘要报告","slug":"_6-4-添加摘要报告","link":"#_6-4-添加摘要报告","children":[]},{"level":3,"title":"6.5. 运行测试（并行）","slug":"_6-5-运行测试-并行","link":"#_6-5-运行测试-并行","children":[]},{"level":3,"title":"6.6. 运行测试（顺序）","slug":"_6-6-运行测试-顺序","link":"#_6-6-运行测试-顺序","children":[]}]},{"level":2,"title":"7. 结论","slug":"_7-结论","link":"#_7-结论","children":[]}],"git":{"createdTime":1720697821000,"updatedTime":1720697821000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":6.23,"words":1868},"filePathRelative":"posts/baeldung/2024-07-11/2024-07-11-Running Multiple Thread Groups in JMeter.md","localizedDate":"2022年12月1日","excerpt":"\\n<p>在使用JMeter时，我们可以将场景分组，并以不同的方式运行它们，以复制现实世界的流量。</p>\\n<p>在本教程中，我们将学习如何以及何时使用多个线程组来复制现实世界的场景，以及如何使用简单的测试计划将它们按顺序或并行运行。</p>\\n<h2>2. 创建多个线程组</h2>\\n<p>线程组是JMeter的一个元素，它控制执行测试的线程数量。</p>\\n<p>JMeter测试计划中的每个线程组模拟一个特定的现实世界应用场景。</p>\\n<p>大多数基于服务器的应用程序通常有多个场景，因此为每个用例创建一个单独的线程组，可以让我们更灵活地在测试期间正确分配这个负载。</p>\\n<p>运行多个线程组有两种方式：顺序或并行。</p>","autoDesc":true}');export{_ as comp,c as data};
