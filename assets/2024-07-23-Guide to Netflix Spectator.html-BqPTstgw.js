import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as a,a as i}from"./app-CbPcg273.js";const r={},n=i(`<h1 id="netflix-spectator使用指南" tabindex="-1"><a class="header-anchor" href="#netflix-spectator使用指南"><span>Netflix Spectator使用指南</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p><strong>Spectator 是一个用于代码度量和收集维度时间序列后端系统数据的库。</strong> Spectator 最初由 Netflix 开发用于各种度量数据的收集，与之对应的后端系统主要是 Atlas。</p><p>在本教程中，我们将学习 Spectator 提供了什么以及我们如何使用它来收集度量数据。</p><h2 id="_2-maven-依赖" tabindex="-1"><a class="header-anchor" href="#_2-maven-依赖"><span>2. Maven 依赖</span></a></h2><p>在我们深入实际实现之前，让我们先在 <em>pom.xml</em> 文件中添加 Spectator 依赖：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>\`&lt;dependency&gt;\`
    \`&lt;groupId&gt;\`com.netflix.spectator\`&lt;/groupId&gt;\`
    \`&lt;artifactId&gt;\`spectator-api\`&lt;/artifactId&gt;\`
    \`&lt;version&gt;\`1.7.7\`&lt;/version&gt;\`
\`&lt;/dependency&gt;\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><em>spectator-api</em> 是 Spectator 核心库。</p><h2 id="_3-registry、meter-和度量基础" tabindex="-1"><a class="header-anchor" href="#_3-registry、meter-和度量基础"><span>3. <em>Registry</em>、<em>Meter</em> 和度量基础</span></a></h2><p>在我们更深入地研究这个库之前，我们首先应该理解 <em>Registry, Meter</em> 和度量的基础。</p><ul><li><em>Registry</em> 是我们维护一组度量的地方</li><li><em>Meter</em> 用于收集关于我们应用程序的一组测量数据，例如 <em>Counter, Timer, Gauge</em> 等。</li><li>度量是我们在 <em>Meter</em> 上显示的个别测量数据，例如计数、持续时间、最大值、平均值等。</li></ul><p>让我们进一步探索这些，并了解它们在 Spectator 库中的使用方式。</p><h2 id="_4-registry" tabindex="-1"><a class="header-anchor" href="#_4-registry"><span>4. <em>Registry</em></span></a></h2><p>Spectator 库带有 <em>Registry</em> 接口，有一些内置实现，例如 <em>DefaultRegistry</em> 和 <em>NoopRegistry</em>。我们也可以根据自己的需求创建自定义 <em>Registry</em> 实现。</p><p><em>Registry</em> 实现的使用方式如下：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Registry registry = new DefaultRegistry();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_5-meter" tabindex="-1"><a class="header-anchor" href="#_5-meter"><span>5. <em>Meter</em></span></a></h2><p><strong><em>Meter</em> 主要有两种类型，即主动和被动。</strong></p><h3 id="_5-1-主动度量器" tabindex="-1"><a class="header-anchor" href="#_5-1-主动度量器"><span>5.1. 主动度量器</span></a></h3><p>这些度量器用于测量某个事件的发生频率。我们有三种这样的度量器：</p><ul><li><em>Counter</em></li><li><em>Timers</em></li><li><em>DistributionSummary</em></li></ul><h3 id="_5-2-被动度量器" tabindex="-1"><a class="header-anchor" href="#_5-2-被动度量器"><span>5.2. 被动度量器</span></a></h3><p>这些度量器用于在需要时获取度量的值。例如，运行中的线程数可能是我们想要测量的一个度量。我们有一种这样的度量器，_ Gauge_。</p><p>接下来，让我们详细探讨这些不同类型的度量器。</p><h2 id="_6-counter" tabindex="-1"><a class="header-anchor" href="#_6-counter"><span>6. <em>Counter</em></span></a></h2><p>这些度量器测量事件发生的频率。例如，假设我们想要测量元素被插入或从列表中删除的频率。</p><p>首先，在初始化时将计数器注册到 <em>Registry</em> 对象：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>insertCounter = registry.counter(&quot;list.insert.count&quot;);
removeCounter = registry.counter(&quot;list.remove.count&quot;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们可以允许用户使用任何 <em>Registry</em> 实现，使用依赖注入。</p><p>现在，我们可以分别对列表的添加或删除操作增加或减少 <em>Counter</em> 度量器：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>requestList.add(element);
insertCounter.increment();

requestList.remove(0);
removeCounter.increment();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过这种方式，我们可以生成两个度量器，稍后，我们可以将度量数据推送到 <em>Atlas</em> 进行可视化。</p><h2 id="_7-timers" tabindex="-1"><a class="header-anchor" href="#_7-timers"><span>7. Timers</span></a></h2><p>这些度量器用于测量某个事件所花费的时间。Spectator 支持两种类型的计时器：</p><ul><li><em>Timer</em></li><li><em>LongTaskTimer</em></li></ul><h3 id="_7-1-timer" tabindex="-1"><a class="header-anchor" href="#_7-1-timer"><span>7.1. <em>Timer</em></span></a></h3><p>这些计时器主要用于测量短时事件。因此，它们通常在事件完成后测量所花费的时间。</p><p>首先，我们需要在 <em>Registry</em> 中注册这个度量器：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>requestLatency = registry.timer(&quot;app.request.latency&quot;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>接下来，我们可以调用 <em>Timer</em> 的 <em>record()</em> 方法来测量处理请求所花费的时间：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>requestLatency.record(() -&gt; handleRequest(input));
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_7-2-longtasktimer" tabindex="-1"><a class="header-anchor" href="#_7-2-longtasktimer"><span>7.2. <em>LongTaskTimer</em></span></a></h3><p>这些计时器主要用于测量长时间运行任务的持续时间。因此，即使事件正在进行中，我们也可以查询这些计时器。这也是 <em>Gauge</em> 的一种类型。当事件进行中时，我们可以看到诸如 <em>duration</em> 和 <em>activeTasks</em> 等度量。</p><p>同样，作为第一步，我们需要注册这个度量器：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>refreshDuration = LongTaskTimer.get(registry, registry.createId(&quot;metadata.refreshDuration&quot;));
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>接下来，我们可以使用 <em>LongTaskTimer</em> 来开始和停止围绕长时间运行任务的测量：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>long taskId = refreshDuration.start();
try {
    Thread.sleep(input);
    return &quot;Done&quot;;
} catch (InterruptedException e) {
    e.printStackTrace();
    throw e;
} finally {
    refreshDuration.stop(taskId);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_8-gauges" tabindex="-1"><a class="header-anchor" href="#_8-gauges"><span>8. Gauges</span></a></h2><p>正如我们之前讨论的，仪表是被动度量器。因此，这些在任何给定时间点为运行中的任务提供采样值。例如，如果我们想要知道 JVM 中运行的线程数或任何给定时间点的堆内存使用情况，我们会使用它。</p><p>我们有两种类型的仪表：</p><ul><li>轮询仪表</li><li>活动仪表</li></ul><h3 id="_8-1-轮询仪表" tabindex="-1"><a class="header-anchor" href="#_8-1-轮询仪表"><span>8.1. 轮询仪表</span></a></h3><p>这种类型的仪表在后台轮询运行任务的值。它在它监控的任务上创建了一个钩子。因此，不需要在这个仪表中更新值。</p><p>现在，让我们看看如何使用这个仪表来监控 <em>List</em> 的大小：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>PolledMeter.using(registry)
  .withName(&quot;list.size&quot;)
  .monitorValue(listSize);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，<em>PolledMeter</em> 是一个类，它允许使用 <em>monitorValue()</em> 方法在后台轮询 <em>listSize</em>。进一步地，<em>listSize</em> 是跟踪我们示例列表大小的变量。</p><h3 id="_8-2-活动仪表" tabindex="-1"><a class="header-anchor" href="#_8-2-活动仪表"><span>8.2. 活动仪表</span></a></h3><p>这种类型的仪表需要定期手动更新与监控任务更新相对应的值。以下是使用活动仪表的示例：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>gauge = registry.gauge(&quot;list.size&quot;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们首先在 <em>Registry</em> 中注册这个仪表。然后，们在列表中添加或删除元素时手动更新它：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>list.add(element);
gauge.set(listSize);

list.remove(0);
gauge.set(listSize);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_9-distributionsummary" tabindex="-1"><a class="header-anchor" href="#_9-distributionsummary"><span>9. <em>DistributionSummary</em></span></a></h2><p>现在，我们将查看另一种称为 <em>DistributionSummary</em> 的度量器。它跟踪事件的分布。这个度量器可以测量请求负载的大小。例如，我们将使用 <em>DistributionSummary</em> 来测量请求的大小。</p><p>首先，一如既往地，在 <em>Registry</em> 中注册这个度量器：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>distributionSummary = registry.distributionSummary(&quot;app.request.size&quot;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>现在，我们可以像使用 <em>Timer</em> 一样使用这个度量器来记录请求的大小：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>distributionSummary.record((long) input.length());
handleRequest();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_10-spectator-与-servo-与-micrometer" tabindex="-1"><a class="header-anchor" href="#_10-spectator-与-servo-与-micrometer"><span>10. Spectator 与 Servo 与 Micrometer</span></a></h2><p>Servo 也是一个用于测量不同代码度量的库。Spectator 是由 Netflix 构建的 Servo 的后继者。Spectator 最初是为 Java 8 推出的，从未来支持的角度来看，它是更好的选择。</p><p>这些 Netflix 库是市场上可用的各种选项之一，用于测量不同的度量。我们总是可以单独使用它们，或者我们可以选择像 Micrometer 这样的门面。Micrometer 允许用户轻松切换不同的度量测量库。因此，它也允许选择不同的后端监控系统。</p><h2 id="_11-结论" tabindex="-1"><a class="header-anchor" href="#_11-结论"><span>11. 结论</span></a></h2><p>在本文中，我们介绍了 Spectator，这是 Netflix 的一个度量测量库。我们还研究了它的各种主动和被动度量器的使用。我们可以将度量数据推送并发布到时间序列数据库 <em>Atlas</em>。</p><p>一如既往，本文的完整实现代码可以在 GitHub 上找到。</p>`,73),s=[n];function l(d,m){return a(),t("div",null,s)}const p=e(r,[["render",l],["__file","2024-07-23-Guide to Netflix Spectator.html.vue"]]),u=JSON.parse('{"path":"/posts/baeldung/2024-07-23/2024-07-23-Guide%20to%20Netflix%20Spectator.html","title":"Netflix Spectator使用指南","lang":"zh-CN","frontmatter":{"date":"2024-07-23T00:00:00.000Z","category":["Java","Netflix Spectator"],"tag":["Spectator","度量","监控"],"head":[["meta",{"name":"keywords","content":"Java, Netflix, Spectator, 度量, 监控"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-23/2024-07-23-Guide%20to%20Netflix%20Spectator.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Netflix Spectator使用指南"}],["meta",{"property":"og:description","content":"Netflix Spectator使用指南 1. 概述 Spectator 是一个用于代码度量和收集维度时间序列后端系统数据的库。 Spectator 最初由 Netflix 开发用于各种度量数据的收集，与之对应的后端系统主要是 Atlas。 在本教程中，我们将学习 Spectator 提供了什么以及我们如何使用它来收集度量数据。 2. Maven 依..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-23T02:48:09.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Spectator"}],["meta",{"property":"article:tag","content":"度量"}],["meta",{"property":"article:tag","content":"监控"}],["meta",{"property":"article:published_time","content":"2024-07-23T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-23T02:48:09.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Netflix Spectator使用指南\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-23T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-23T02:48:09.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Netflix Spectator使用指南 1. 概述 Spectator 是一个用于代码度量和收集维度时间序列后端系统数据的库。 Spectator 最初由 Netflix 开发用于各种度量数据的收集，与之对应的后端系统主要是 Atlas。 在本教程中，我们将学习 Spectator 提供了什么以及我们如何使用它来收集度量数据。 2. Maven 依..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. Maven 依赖","slug":"_2-maven-依赖","link":"#_2-maven-依赖","children":[]},{"level":2,"title":"3. Registry、Meter 和度量基础","slug":"_3-registry、meter-和度量基础","link":"#_3-registry、meter-和度量基础","children":[]},{"level":2,"title":"4. Registry","slug":"_4-registry","link":"#_4-registry","children":[]},{"level":2,"title":"5. Meter","slug":"_5-meter","link":"#_5-meter","children":[{"level":3,"title":"5.1. 主动度量器","slug":"_5-1-主动度量器","link":"#_5-1-主动度量器","children":[]},{"level":3,"title":"5.2. 被动度量器","slug":"_5-2-被动度量器","link":"#_5-2-被动度量器","children":[]}]},{"level":2,"title":"6. Counter","slug":"_6-counter","link":"#_6-counter","children":[]},{"level":2,"title":"7. Timers","slug":"_7-timers","link":"#_7-timers","children":[{"level":3,"title":"7.1. Timer","slug":"_7-1-timer","link":"#_7-1-timer","children":[]},{"level":3,"title":"7.2. LongTaskTimer","slug":"_7-2-longtasktimer","link":"#_7-2-longtasktimer","children":[]}]},{"level":2,"title":"8. Gauges","slug":"_8-gauges","link":"#_8-gauges","children":[{"level":3,"title":"8.1. 轮询仪表","slug":"_8-1-轮询仪表","link":"#_8-1-轮询仪表","children":[]},{"level":3,"title":"8.2. 活动仪表","slug":"_8-2-活动仪表","link":"#_8-2-活动仪表","children":[]}]},{"level":2,"title":"9. DistributionSummary","slug":"_9-distributionsummary","link":"#_9-distributionsummary","children":[]},{"level":2,"title":"10. Spectator 与 Servo 与 Micrometer","slug":"_10-spectator-与-servo-与-micrometer","link":"#_10-spectator-与-servo-与-micrometer","children":[]},{"level":2,"title":"11. 结论","slug":"_11-结论","link":"#_11-结论","children":[]}],"git":{"createdTime":1721702889000,"updatedTime":1721702889000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.26,"words":1579},"filePathRelative":"posts/baeldung/2024-07-23/2024-07-23-Guide to Netflix Spectator.md","localizedDate":"2024年7月23日","excerpt":"\\n<h2>1. 概述</h2>\\n<p><strong>Spectator 是一个用于代码度量和收集维度时间序列后端系统数据的库。</strong> Spectator 最初由 Netflix 开发用于各种度量数据的收集，与之对应的后端系统主要是 Atlas。</p>\\n<p>在本教程中，我们将学习 Spectator 提供了什么以及我们如何使用它来收集度量数据。</p>\\n<h2>2. Maven 依赖</h2>\\n<p>在我们深入实际实现之前，让我们先在 <em>pom.xml</em> 文件中添加 Spectator 依赖：</p>\\n<div class=\\"language-text\\" data-ext=\\"text\\" data-title=\\"text\\"><pre class=\\"language-text\\"><code>`&lt;dependency&gt;`\\n    `&lt;groupId&gt;`com.netflix.spectator`&lt;/groupId&gt;`\\n    `&lt;artifactId&gt;`spectator-api`&lt;/artifactId&gt;`\\n    `&lt;version&gt;`1.7.7`&lt;/version&gt;`\\n`&lt;/dependency&gt;`\\n</code></pre></div>","autoDesc":true}');export{p as comp,u as data};
