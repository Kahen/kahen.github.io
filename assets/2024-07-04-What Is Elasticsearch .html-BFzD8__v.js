import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as n,a as t}from"./app-DpYLEM_u.js";const e={},p=t(`<h1 id="elasticsearch是什么" tabindex="-1"><a class="header-anchor" href="#elasticsearch是什么"><span>Elasticsearch是什么？</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在本教程中，我们将开始探索Elasticsearch及其相关工具。</p><p>它是一个可以无缝处理大量数据、自动扩展，并持续整合新数据的工具。</p><h2 id="_2-定义" tabindex="-1"><a class="header-anchor" href="#_2-定义"><span>2. 定义</span></a></h2><p>想象我们有一大堆文件，成千上万份，我们想要快速有效地找到特定信息。这就是Elasticsearch发挥作用的地方。</p><p><strong>想象一个超级智能的图书管理员，巧妙地组织了大量文件，从而方便了搜索过程。</strong> 这类似于Elasticsearch——一个开源的搜索和分析引擎，擅长管理庞大的数据量，提供我们所需的精确信息。</p><p>作为分布式的并包含NoSQL特性，Elasticsearch使用JSON文档来表示数据，允许与各种编程语言和系统轻松集成。</p><p>Elasticsearch以其数据处理能力脱颖而出，如即时存储、搜索和检查数据。使用强大的搜索系统，Elasticsearch将我们文档中的所有单词和短语排序成一个易于搜索的列表。这意味着我们可以在大量数据中执行极快的搜索。</p><h3 id="_2-1-索引是什么" tabindex="-1"><a class="header-anchor" href="#_2-1-索引是什么"><span>2.1. 索引是什么？</span></a></h3><p>与关系数据库管理系统（RDBMS）相比，Elasticsearch有一种独特的数据组织方式。在RDBMS中，我们通常使用“数据库”这个术语。然而，在Elasticsearch中，使用的是“索引”这个术语，这更像是传统数据库中的一个表。这只是相同概念的不同术语。</p><p>此外，在关系数据库中，我们使用表来组织数据。在Elasticsearch中，我们有类似的事物，我们可以将其视为索引模式。在旧版本中，它们被称为类型。</p><p>在这些数据库或索引中，关系数据库有由行和列组成的表。在Elasticsearch中，我们可以将行视为文档，个别列被称为字段，反映了许多NoSQL数据源的结构。</p><p>对于习惯于使用MySQL或Postgres等关系数据库的人来说，理解这个新的面向文档的搜索引擎就像扩展我们现有的知识。它帮助我们知道事物如何组合在一起，并规划我们的数据结构。这就像将我们当前的理解翻译成具有自己考虑因素的新系统。</p><p>这是一个有用的比较表：</p><h2 id="_3-与elasticsearch交互" tabindex="-1"><a class="header-anchor" href="#_3-与elasticsearch交互"><span>3. 与Elasticsearch交互</span></a></h2><p>当与它交互时，值得注意的是，这是通过RESTful API完成的。<strong>这意味着我们所有的操作都是通过可编程访问的URL进行的，无论是管理索引还是处理不同类型的数据。</strong></p><p>这些查询通常使用Elasticsearch的查询DSL进行，这是一个灵活而强大的系统，使用JSON来定义查询。重要的是，Elasticsearch的查询DSL允许进行复杂的查询，超出了简单匹配，包括布尔逻辑、通配符、范围查询等。</p><p>它非常适合各种用例。我们可以从不同的来源收集数据，如日志、不同系统的指标，甚至是应用程序跟踪数据。有了Elasticsearch，我们可以将所有这些数据合并成JSON文档，然后轻松地搜索和实时检索信息。</p><h2 id="_4-解决现实世界的挑战" tabindex="-1"><a class="header-anchor" href="#_4-解决现实世界的挑战"><span>4. 解决现实世界的挑战</span></a></h2><p>以下是一些示例，说明我们如何可能与Elasticsearch交互。</p><h3 id="_4-1-电子商务搜索" tabindex="-1"><a class="header-anchor" href="#_4-1-电子商务搜索"><span><strong>4.1.</strong> 电子商务搜索</span></a></h3><p>现在，假设我们有一堆与产品客户评论相关的文档。有了Elasticsearch，我们可以快速搜索这些评论中的特定关键词或短语，立即给我们相关结果。除了找到完全匹配项外，它还根据相关性对结果进行排名，确保我们首先收到最重要的信息。</p><p>假设我们正在索引一个大型产品目录。我们的Elasticsearch查询，以查找所有“红色衬衫”，可能看起来像这样：</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code>curl -X GET <span class="token string">&quot;localhost:9200/products/_search&quot;</span> -H &#39;Content-Type<span class="token operator">:</span> application/json&#39; -d&#39;
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;bool&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;must&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span> <span class="token property">&quot;match&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token property">&quot;color&quot;</span><span class="token operator">:</span> <span class="token string">&quot;red&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span> <span class="token property">&quot;match&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token property">&quot;product_type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;shirt&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
      <span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2-地理空间搜索" tabindex="-1"><a class="header-anchor" href="#_4-2-地理空间搜索"><span><strong>4.2. 地理空间搜索</strong></span></a></h3><p>假设我们正在处理基于位置的应用程序或映射服务。我们需要搜索地点、计算距离或查找附近的地点。Elasticsearch内置了对地理空间数据的支，允许我们轻松存储和查询位置信息。无论是寻找最近的咖啡店还是分析地理数据，它的地理空间能力使处理基于位置的数据变得更容易。</p><p>不仅仅是搜索。它还提供了一些高级功能。例如，它可以对我们的数据执行复杂的查询、过滤和聚合。我们甚至可以使用它来可视化和分析我们的数据，帮助我们获得洞察力并做出明智的决策。</p><p>对于基于位置的搜索，例如，要查找特定位置1公里半径内的所有咖啡店，我们的查询可能看起来像这样：</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code>curl -X GET <span class="token string">&quot;localhost:9200/places/_search&quot;</span> -H &#39;Content-Type<span class="token operator">:</span> application/json&#39; -d&#39;
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;bool&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;must&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;match&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;place_type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;coffee_shop&quot;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;filter&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;geo_distance&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;distance&quot;</span><span class="token operator">:</span> <span class="token string">&quot;1km&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;pin.location&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;lat&quot;</span><span class="token operator">:</span> <span class="token number">40.73</span><span class="token punctuation">,</span>
            <span class="token property">&quot;lon&quot;</span><span class="token operator">:</span> <span class="token number">-74.1</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-3-欺诈检测" tabindex="-1"><a class="header-anchor" href="#_4-3-欺诈检测"><span><strong>4.3. 欺诈检测</strong></span></a></h3><p>欺诈活动，如信用卡欺诈或网络诈骗，可能是一个重大的商业问题。</p><p><strong>Elasticsearch可以通过分析大量交易数据来协助欺诈检测。它可以使用高级分析和机器学习算法识别模式、异常或可疑行为。</strong></p><p>除了其搜索能力外，它还具有高度的可扩展性和容错性。它可以将我们的数据分布在多个服务器上，确保即使一个服务器出现故障，我们的数据仍然可以访问。这使它成为处理大规模应用程序或具有高数据量的系统和应用程序的可靠工具。</p><h2 id="_4-生态系统" tabindex="-1"><a class="header-anchor" href="#_4-生态系统"><span>4. 生态系统</span></a></h2><p>让我们继续探讨整个生态系统。如果我们一直在研究Elasticsearch，很可能我们已经遇到了“Elastic Stack”这个术语，以前称为“ELK Stack”。</p><p>这个广泛使用的短语汇集了三个强大的开源工具：Elasticsearch、Logstash和Kibana。该术语还包括Beats，一组轻量级数据传输器。这些组件共同提供了全面的搜索、日志分析和数据可视化解决方案：</p><h3 id="_4-1-kibana" tabindex="-1"><a class="header-anchor" href="#_4-1-kibana"><span>4.1. Kibana</span></a></h3><p><strong>我们可以将其视为一个方便的、网络友好的界面，让我们与Elasticsearch中的数据进行交互。</strong> 它有点像我们的个人指挥中心，我们可以深入分析所有索引的有趣信息。</p><p>有了Kibana，我们可以创建动态仪表板、图表、图形和实时更新的可视化，随着新数据的到来而更新。它是我们监控和探索数据的主要界面，帮助我们轻松跟上数据流并轻松获得洞察力。</p><p>现在，让我们讨论数据是如何被摄取到Elasticsearch的。有两个关键组件需要考虑：Logstash和Beats。</p><h3 id="_4-2-logstash" tabindex="-1"><a class="header-anchor" href="#_4-2-logstash"><span>4.2. Logstash</span></a></h3><p><strong>Logstash是一个开源的服务器端处理管道。</strong> 它的主要作用是处理三个任务：接收数据，对其进行一些改造，然后将其安全地存储。我们可以配置Logstash从各种来源接收数据。例如，我们可以使用SDK直接将数据格式化并发送到Logstash，或者将其与不同的系统集成。</p><p>此外，虽然Logstash支持各种数据格式，如JSON和CSV，但重要的是要强调它可以使用其广泛的插件生态系统处理自定义格式。</p><p>一旦接收到数据，Logstash能够在数据进入管道之前进行一系列转换，如格式化或结构化。当这些任务完成后，它将精炼后的数据转发到其最终目的地。对我们来说，这些主要目的地之一是Elasticsearch。</p><h3 id="_4-3-beats" tabindex="-1"><a class="header-anchor" href="#_4-3-beats"><span>4.3. Beats</span></a></h3><p>Beats是轻量级数据传输器。可以将其视为安装在不同服务器上的代理，用于收集特定类型的数据。无论我们是在处理无服务器架构、文件还是Windows服务器，Beats作为Logstash的补充组件。它们具有允许与各种服务和系统集成的插件。</p><p><strong>Beats的一个很酷的事情是——它有能力直接将数据发送到Logstash进行一些额外的处理和存储。</strong> 因此，Beats作为一个高效的数据收集器，与Logstash携手合作，确保数据流和集成到我们的Elasticsearch环境中无缝进行。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们探索了Elasticsearch作为一个强大的搜索和分析引擎，它可以彻底改变我们处理和理解数据的方式。</p><p>我们可以在GitHub上找到一些项目实现的用例。</p><p>OK</p>`,52),o=[p];function c(l,i){return n(),s("div",null,o)}const h=a(e,[["render",c],["__file","2024-07-04-What Is Elasticsearch .html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-04/2024-07-04-What%20Is%20Elasticsearch%20.html","title":"Elasticsearch是什么？","lang":"zh-CN","frontmatter":{"date":"2023-06-22T00:00:00.000Z","category":["Elasticsearch","NoSQL"],"tag":["Elasticsearch","搜索引擎","分布式系统","数据分析"],"head":[["meta",{"name":"Elasticsearch介绍","content":"探索Elasticsearch及其相关工具，了解如何使用Elasticsearch进行高效数据搜索和分析。"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-04/2024-07-04-What%20Is%20Elasticsearch%20.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Elasticsearch是什么？"}],["meta",{"property":"og:description","content":"Elasticsearch是什么？ 1. 概述 在本教程中，我们将开始探索Elasticsearch及其相关工具。 它是一个可以无缝处理大量数据、自动扩展，并持续整合新数据的工具。 2. 定义 想象我们有一大堆文件，成千上万份，我们想要快速有效地找到特定信息。这就是Elasticsearch发挥作用的地方。 想象一个超级智能的图书管理员，巧妙地组织了大..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-04T07:32:28.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Elasticsearch"}],["meta",{"property":"article:tag","content":"搜索引擎"}],["meta",{"property":"article:tag","content":"分布式系统"}],["meta",{"property":"article:tag","content":"数据分析"}],["meta",{"property":"article:published_time","content":"2023-06-22T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-04T07:32:28.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Elasticsearch是什么？\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-06-22T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-04T07:32:28.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Elasticsearch是什么？ 1. 概述 在本教程中，我们将开始探索Elasticsearch及其相关工具。 它是一个可以无缝处理大量数据、自动扩展，并持续整合新数据的工具。 2. 定义 想象我们有一大堆文件，成千上万份，我们想要快速有效地找到特定信息。这就是Elasticsearch发挥作用的地方。 想象一个超级智能的图书管理员，巧妙地组织了大..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 定义","slug":"_2-定义","link":"#_2-定义","children":[{"level":3,"title":"2.1. 索引是什么？","slug":"_2-1-索引是什么","link":"#_2-1-索引是什么","children":[]}]},{"level":2,"title":"3. 与Elasticsearch交互","slug":"_3-与elasticsearch交互","link":"#_3-与elasticsearch交互","children":[]},{"level":2,"title":"4. 解决现实世界的挑战","slug":"_4-解决现实世界的挑战","link":"#_4-解决现实世界的挑战","children":[{"level":3,"title":"4.1. 电子商务搜索","slug":"_4-1-电子商务搜索","link":"#_4-1-电子商务搜索","children":[]},{"level":3,"title":"4.2. 地理空间搜索","slug":"_4-2-地理空间搜索","link":"#_4-2-地理空间搜索","children":[]},{"level":3,"title":"4.3. 欺诈检测","slug":"_4-3-欺诈检测","link":"#_4-3-欺诈检测","children":[]}]},{"level":2,"title":"4. 生态系统","slug":"_4-生态系统","link":"#_4-生态系统","children":[{"level":3,"title":"4.1. Kibana","slug":"_4-1-kibana","link":"#_4-1-kibana","children":[]},{"level":3,"title":"4.2. Logstash","slug":"_4-2-logstash","link":"#_4-2-logstash","children":[]},{"level":3,"title":"4.3. Beats","slug":"_4-3-beats","link":"#_4-3-beats","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720078348000,"updatedTime":1720078348000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":7.51,"words":2253},"filePathRelative":"posts/baeldung/2024-07-04/2024-07-04-What Is Elasticsearch .md","localizedDate":"2023年6月22日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>在本教程中，我们将开始探索Elasticsearch及其相关工具。</p>\\n<p>它是一个可以无缝处理大量数据、自动扩展，并持续整合新数据的工具。</p>\\n<h2>2. 定义</h2>\\n<p>想象我们有一大堆文件，成千上万份，我们想要快速有效地找到特定信息。这就是Elasticsearch发挥作用的地方。</p>\\n<p><strong>想象一个超级智能的图书管理员，巧妙地组织了大量文件，从而方便了搜索过程。</strong> 这类似于Elasticsearch——一个开源的搜索和分析引擎，擅长管理庞大的数据量，提供我们所需的精确信息。</p>\\n<p>作为分布式的并包含NoSQL特性，Elasticsearch使用JSON文档来表示数据，允许与各种编程语言和系统轻松集成。</p>","autoDesc":true}');export{h as comp,d as data};
