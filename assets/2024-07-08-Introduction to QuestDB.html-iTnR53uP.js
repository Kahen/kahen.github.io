import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-COaDJFIk.js";const e={},p=t(`<h1 id="questdb简介" tabindex="-1"><a class="header-anchor" href="#questdb简介"><span>QuestDB简介</span></a></h1><ol><li>概览</li></ol><p>在本教程中，我们将简要介绍QuestDB，这是一个面向时间序列和事件数据的关系型列式数据库。然后，我们将学习如何从Java应用程序向数据库发送数据。</p><ol start="2"><li>什么是QuestDB？</li></ol><p><strong>QuestDB是一个快速的开源时间序列数据库，具有高性能的数据摄取和SQL分析能力</strong>。简而言之，QuestDB解决了管理基于时间的高吞吐量数据时的困难，并通过简单的SQL查询使分析摄取的数据变得容易。</p><p>它与InfluxDB行协议、PostgreSQL线协议和HTTP REST API兼容。此外，它还有一个美观的Web控制台应用程序，我们可以直接与数据库交互。然而，我们将只关注InfluxDB行协议，这是一个包含每个数据点的测量、标签、字段和时间戳的文本格式。在这种情况下，我们将使用一个易于使用的Java客户端库来发送数据，并抽象出这些细节。</p><p>QuestDB的一些优势包括：</p><ul><li>它易于使用并提供高性能</li><li>它使用关系模型来处理时间序列数据</li><li>数据摄取非常可扩展</li><li>提供即时一致性</li></ul><p>接下来，我们将使用Docker容器创建一个本地数据库实例。或者，我们可以支付完全托管的云实例，无需维护。</p><ol start="3"><li>安装</li></ol><p>让我们从使用Docker安装的容器化版本开始：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">docker</span> run <span class="token parameter variable">-p</span> <span class="token number">9000</span>:9000 <span class="token punctuation">\\</span>
  <span class="token parameter variable">-p</span> <span class="token number">9009</span>:9009 <span class="token punctuation">\\</span>
  <span class="token parameter variable">-p</span> <span class="token number">8812</span>:8812 <span class="token punctuation">\\</span>
  <span class="token parameter variable">-p</span> <span class="token number">9003</span>:9003 <span class="token punctuation">\\</span>
  <span class="token parameter variable">-v</span> <span class="token string">&quot;<span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">pwd</span><span class="token variable">)</span></span>:/var/lib/questdb&quot;</span> <span class="token punctuation">\\</span>
  <span class="token parameter variable">-d</span> <span class="token parameter variable">--name</span> questdb questdb/questdb:7.0.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这将在我们机器上创建一个QuestDB的本地实例。要检查它是否启动，我们可以访问端口9000上暴露的Web应用程序：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/03/Screenshot-2023-02-26-at-17.31.14.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>QuestDB Web应用程序的用户界面</p><p>或者，QuestDB还在9003端口上暴露了一个端点，我们可以使用它来检查数据库的健康状况。</p><ol start="4"><li>在Java项目中使用QuestDB</li></ol><h3 id="_4-1-连接到数据库" tabindex="-1"><a class="header-anchor" href="#_4-1-连接到数据库"><span>4.1. 连接到数据库</span></a></h3><p>首先，我们需要从应用程序与数据库进行通信。为此，QuestDB提供了几种连接方法，这些方法在以下端口上公开：</p><ul><li>InfluxDB Line Protocol: 端口9009</li><li>PostgreSQL Wire Protocol: 端口8812</li><li>HTTP REST API: 端口9000</li><li>Web Console: 端口9000</li></ul><p>例如，我们将只使用InfluxDB行协议，这是推荐的方法，并使用Java客户端插入数据：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`org.questdb\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`questdb\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\`7.0.0\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\`
\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，我们将向数据库发送一些数据。</p><h3 id="_4-2-发送数据" tabindex="-1"><a class="header-anchor" href="#_4-2-发送数据"><span>4.2. 发送数据</span></a></h3><p>简而言之，我们想要创建一个温度跟踪系统，将数据发送到我们的数据库中的_sensors_表。因此，我们需要创建一个_Sender_对象，向构建器提供数据库的正确地址：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Sender</span> sender <span class="token operator">=</span> <span class="token class-name">Sender</span><span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">address</span><span class="token punctuation">(</span><span class="token string">&quot;localhost:9009&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Sender是可关闭的，所以我们在try-with结构中使用它。</p><p>然后，我们可以引用_sensors_表，并通过为每个列提供值来简单地添加数据：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>sender<span class="token punctuation">.</span><span class="token function">table</span><span class="token punctuation">(</span><span class="token constant">SENSORS_TABLE_NAME</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">stringColumn</span><span class="token punctuation">(</span><span class="token string">&quot;id&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;KTC&quot;</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">stringColumn</span><span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Kitchen temperature (Celsius)&quot;</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">doubleColumn</span><span class="token punctuation">(</span><span class="token string">&quot;currentValue&quot;</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">atNow</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>特别是，我们不需要事先创建表，因为库将根据我们发送到数据库的数据来创建表。</p><h3 id="_4-3-查询数据" tabindex="-1"><a class="header-anchor" href="#_4-3-查询数据"><span>4.3. 查询数据</span></a></h3><p>一旦我们有一些数据，我们就可以在Web应用程序上使用SELECT语句查询数据。例如，我们可以使用以下方式查看我们的厨房传感器的读数：</p><div class="language-sql line-numbers-mode" data-ext="sql" data-title="sql"><pre class="language-sql"><code><span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">from</span> <span class="token string">&#39;sensors&#39;</span> <span class="token keyword">WHERE</span> id <span class="token operator">=</span> <span class="token string">&#39;KTC&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们可以在Web应用程序中看到这一点：<img src="https://www.baeldung.com/wp-content/uploads/2023/03/Screenshot-2023-03-16-at-21.55.59.png" alt="img" loading="lazy"></p><h3 id="_4-4-删除行" tabindex="-1"><a class="header-anchor" href="#_4-4-删除行"><span>4.4. 删除行</span></a></h3><p>QuestDB不允许删除单行，但可以通过创建一个不包含所需行的表的副本，删除表，然后将副本重命名为原始表名来解决这个问题。</p><p>尽管可以使用这种解决方法，但我们建议尽可能避免使用它，因为它成本很高。</p><ol start="5"><li>结论</li></ol><p>在本文中，我们学习了如何安装和连接到QuestDB，执行查询，并从我们的应用程序与之交互。</p><p>本文的所有代码示例都可以在GitHub上找到。</p><p>OK</p>`,41),o=[p];function l(c,i){return s(),a("div",null,o)}const d=n(e,[["render",l],["__file","2024-07-08-Introduction to QuestDB.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-08/2024-07-08-Introduction%20to%20QuestDB.html","title":"QuestDB简介","lang":"zh-CN","frontmatter":{"date":"2023-03-16T00:00:00.000Z","category":["Java","QuestDB"],"tag":["Java","QuestDB","数据库"],"head":[["meta",{"name":"keywords","content":"QuestDB, Java, 时间序列数据库, SQL, 数据库"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-08/2024-07-08-Introduction%20to%20QuestDB.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"QuestDB简介"}],["meta",{"property":"og:description","content":"QuestDB简介 概览 在本教程中，我们将简要介绍QuestDB，这是一个面向时间序列和事件数据的关系型列式数据库。然后，我们将学习如何从Java应用程序向数据库发送数据。 什么是QuestDB？ QuestDB是一个快速的开源时间序列数据库，具有高性能的数据摄取和SQL分析能力。简而言之，QuestDB解决了管理基于时间的高吞吐量数据时的困难，并通..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2023/03/Screenshot-2023-02-26-at-17.31.14.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-08T03:02:40.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"QuestDB"}],["meta",{"property":"article:tag","content":"数据库"}],["meta",{"property":"article:published_time","content":"2023-03-16T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-08T03:02:40.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"QuestDB简介\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2023/03/Screenshot-2023-02-26-at-17.31.14.png\\",\\"https://www.baeldung.com/wp-content/uploads/2023/03/Screenshot-2023-03-16-at-21.55.59.png\\"],\\"datePublished\\":\\"2023-03-16T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-08T03:02:40.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"QuestDB简介 概览 在本教程中，我们将简要介绍QuestDB，这是一个面向时间序列和事件数据的关系型列式数据库。然后，我们将学习如何从Java应用程序向数据库发送数据。 什么是QuestDB？ QuestDB是一个快速的开源时间序列数据库，具有高性能的数据摄取和SQL分析能力。简而言之，QuestDB解决了管理基于时间的高吞吐量数据时的困难，并通..."},"headers":[{"level":3,"title":"4.1. 连接到数据库","slug":"_4-1-连接到数据库","link":"#_4-1-连接到数据库","children":[]},{"level":3,"title":"4.2. 发送数据","slug":"_4-2-发送数据","link":"#_4-2-发送数据","children":[]},{"level":3,"title":"4.3. 查询数据","slug":"_4-3-查询数据","link":"#_4-3-查询数据","children":[]},{"level":3,"title":"4.4. 删除行","slug":"_4-4-删除行","link":"#_4-4-删除行","children":[]}],"git":{"createdTime":1720407760000,"updatedTime":1720407760000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.6,"words":1079},"filePathRelative":"posts/baeldung/2024-07-08/2024-07-08-Introduction to QuestDB.md","localizedDate":"2023年3月16日","excerpt":"\\n<ol>\\n<li>概览</li>\\n</ol>\\n<p>在本教程中，我们将简要介绍QuestDB，这是一个面向时间序列和事件数据的关系型列式数据库。然后，我们将学习如何从Java应用程序向数据库发送数据。</p>\\n<ol start=\\"2\\">\\n<li>什么是QuestDB？</li>\\n</ol>\\n<p><strong>QuestDB是一个快速的开源时间序列数据库，具有高性能的数据摄取和SQL分析能力</strong>。简而言之，QuestDB解决了管理基于时间的高吞吐量数据时的困难，并通过简单的SQL查询使分析摄取的数据变得容易。</p>\\n<p>它与InfluxDB行协议、PostgreSQL线协议和HTTP REST API兼容。此外，它还有一个美观的Web控制台应用程序，我们可以直接与数据库交互。然而，我们将只关注InfluxDB行协议，这是一个包含每个数据点的测量、标签、字段和时间戳的文本格式。在这种情况下，我们将使用一个易于使用的Java客户端库来发送数据，并抽象出这些细节。</p>","autoDesc":true}');export{d as comp,k as data};
