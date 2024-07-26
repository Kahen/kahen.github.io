import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as e,o as a,a as t}from"./app-8nJ1rqSf.js";const s={},o=t(`<h1 id="axon-中聚合快照的实现" tabindex="-1"><a class="header-anchor" href="#axon-中聚合快照的实现"><span>Axon 中聚合快照的实现</span></a></h1><p>在本文中，我们将探讨 Axon 如何支持聚合快照。我们认为这篇文章是我们关于 Axon 主要指南的扩展。因此，我们将再次使用 Axon Framework 和 Axon Server。我们将在本文的实现中使用前者，后者是事件存储和消息路由器。</p><p>聚合快照 让我们首先理解聚合快照的含义。当我们开始在应用程序中使用事件溯源时，一个自然的问题是如何使我的应用程序中的聚合保持高性能？尽管有几种优化选项，最直接的是引入快照。</p><p>聚合快照是存储聚合状态的快照以提高加载性能的过程。当引入快照时，加载聚合以处理命令变成了一个两步过程：</p><ol><li>检索最近的快照（如果有），并使用它来溯源聚合。快照携带一个序列号，定义了它代表聚合状态的截止点。</li><li>从快照的序列号开始检索其余事件，并溯源聚合的其余部分。</li></ol><p>如果应该启用快照，需要一个触发创建快照的过程。快照创建过程应确保快照在创建点时反映了整个聚合状态。最后，聚合加载机制（即：存储库）应首先加载快照，然后加载任何剩余的事件。</p><p>在 Axon 中的聚合快照 Axon Framework 支持聚合的快照。要获取此过程的完整概述，请查看 Axon 参考指南的这一部分。</p><p>在框架内，快照过程由两个主要组件组成：</p><ul><li>快照器（<em>Snapshotter</em>)</li><li>快照触发定义（<em>SnapshotTriggerDefinition</em>）</li></ul><p>快照器是为聚合实例构建快照的组件。默认情况下，框架将使用整个聚合的状态作为快照。</p><p>快照触发定义定义了触发快照器构建快照的条件。触发条件可以是：</p><ul><li>在一定数量的事件之后，</li><li>当加载时间达到一定量时，</li><li>或在时间的设定时刻。</li></ul><p>快照的存储和检索由事件存储和聚合的存储库负责。为此，事件存储包含一个单独的部分来存储快照。在 Axon Server 中，一个单独的快照文件反映了这一部分。</p><p>快照加载由存储库执行，它咨询事件存储。因此，加载聚合并整合快照完全由框架处理。</p><p>配置快照 我们将查看在之前文章中引入的订单领域。快照构建、存储和加载已经由快照器、事件存储和存储库处理。</p><p>因此，要向 <em>OrderAggregate</em> 引入快照，我们只需要配置快照触发定义。</p><h3 id="_4-1-定义快照触发器" tabindex="-1"><a class="header-anchor" href="#_4-1-定义快照触发器"><span>4.1. 定义快照触发器</span></a></h3><p>由于应用程序使用 Spring，我们可以向应用程序上下文添加一个快照触发定义。为此，我们添加一个配置类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">OrderApplicationConfiguration</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">SnapshotTriggerDefinition</span> <span class="token function">orderAggregateSnapshotTriggerDefinition</span><span class="token punctuation">(</span>
        <span class="token class-name">Snapshotter</span> snapshotter<span class="token punctuation">,</span>
        <span class="token annotation punctuation">@Value</span><span class="token punctuation">(</span><span class="token string">&quot;\${axon.aggregate.order.snapshot-threshold:250}&quot;</span><span class="token punctuation">)</span> <span class="token keyword">int</span> threshold<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">EventCountSnapshotTriggerDefinition</span><span class="token punctuation">(</span>snapshotter<span class="token punctuation">,</span> threshold<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这种情况下，我们选择了 <em>EventCountSnapshotTriggerDefinition</em>。这个定义在聚合的事件计数与“阈值”匹配时触发快照的创建。请注意，阈值可以通过属性配置。</p><p>定义还需要快照器，Axon 会自动将快照器添加到应用程序上下文中。因此，在构建触发定义时，可以将其作为参数连接。</p><p>我们可以使用另一种实现，即 <em>AggregateLoadTimeSnapshotTriggerDefinition</em>。如果加载聚合的时间超过 <em>loadTimeMillisThreshold</em>，则此定义触发快照的创建。最后，由于它是一个快照触发器，它还需要快照器来构建快照。</p><h3 id="_4-2-使用快照触发器" tabindex="-1"><a class="header-anchor" href="#_4-2-使用快照触发器"><span>4.2. 使用快照触发器</span></a></h3><p>现在 <em>SnapshotTriggerDefinition</em> 是应用程序的一部分，我们需要为 <em>OrderAggregate</em> 设置它。Axon 的 <em>Aggregate</em> 注解允许我们指定快照触发器的 bean 名称。</p><p>在注释上设置 bean 名称将自动为聚合配置触发定义：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Aggregate</span><span class="token punctuation">(</span>snapshotTriggerDefinition <span class="token operator">=</span> <span class="token string">&quot;orderAggregateSnapshotTriggerDefinition&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">OrderAggregate</span> <span class="token punctuation">{</span>
    <span class="token comment">// 省略状态、命令处理程序和事件源处理程序</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过将 <em>snapshotTriggerDefinition</em> 设置为构建定义的 bean 名称，我们指示框架为此聚合配置它。</p><h2 id="_5-实际中的快照" tabindex="-1"><a class="header-anchor" href="#_5-实际中的快照"><span>5. 实际中的快照</span></a></h2><p>配置将触发定义阈值设置为“250”。这意味着框在发布 250 个事件后构建一个快照。尽管这对于大多数应用程序来说是一个合理的默认值，但这延长了我们的测试。</p><p>因此，为了进行测试，我们将 <em>axon.aggregate.order.snapshot-threshold</em> 属性调整为“5”。现在，我们可以更容易地测试快照是否起作用。</p><p>为此，我们启动 Axon Server 和订单应用程序。在向 <em>OrderAggregate</em> 发出足够多的命令以生成五个事件后，我们可以通过在 Axon Server Dashboard 中搜索来检查应用程序是否存储了一个快照。</p><p>要搜索快照，我们需要点击左侧标签中的“搜索”按钮，在左上角选择“快照”，然后点击右侧的橙色“搜索”按钮。下面的表格应该显示一个像这样的单个条目：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2021/09/axon-server-dashboard-snapshot-search.jpg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们探讨了聚合快照是什么以及 Axon Framework 如何支持这个概念。</p><p>启用快照所需的唯一事项是在聚合上配置 <em>SnapshotTriggerDefinition</em>。创建、存储和检索快照的工作都为我们处理了。</p><p>你可以在 GitHub 上找到订单应用程序的实现和代码片段。对于这个主题的任何额外问题，也请查看 Discuss AxonIQ。</p>`,37),p=[o];function i(r,l){return a(),e("div",null,p)}const g=n(s,[["render",i],["__file","2024-07-25-Snapshotting Aggregates in Axon.html.vue"]]),u=JSON.parse('{"path":"/posts/baeldung/2024-07-25/2024-07-25-Snapshotting%20Aggregates%20in%20Axon.html","title":"Axon 中聚合快照的实现","lang":"zh-CN","frontmatter":{"date":"2021-09-01T00:00:00.000Z","category":["Axon","Event Sourcing"],"tag":["Axon Framework","Snapshotting"],"head":[["meta",{"name":"keywords","content":"Axon, Event Sourcing, Snapshotting, Aggregate"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-25/2024-07-25-Snapshotting%20Aggregates%20in%20Axon.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Axon 中聚合快照的实现"}],["meta",{"property":"og:description","content":"Axon 中聚合快照的实现 在本文中，我们将探讨 Axon 如何支持聚合快照。我们认为这篇文章是我们关于 Axon 主要指南的扩展。因此，我们将再次使用 Axon Framework 和 Axon Server。我们将在本文的实现中使用前者，后者是事件存储和消息路由器。 聚合快照 让我们首先理解聚合快照的含义。当我们开始在应用程序中使用事件溯源时，一个..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2021/09/axon-server-dashboard-snapshot-search.jpg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-25T21:55:24.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Axon Framework"}],["meta",{"property":"article:tag","content":"Snapshotting"}],["meta",{"property":"article:published_time","content":"2021-09-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-25T21:55:24.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Axon 中聚合快照的实现\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2021/09/axon-server-dashboard-snapshot-search.jpg\\"],\\"datePublished\\":\\"2021-09-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-25T21:55:24.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Axon 中聚合快照的实现 在本文中，我们将探讨 Axon 如何支持聚合快照。我们认为这篇文章是我们关于 Axon 主要指南的扩展。因此，我们将再次使用 Axon Framework 和 Axon Server。我们将在本文的实现中使用前者，后者是事件存储和消息路由器。 聚合快照 让我们首先理解聚合快照的含义。当我们开始在应用程序中使用事件溯源时，一个..."},"headers":[{"level":3,"title":"4.1. 定义快照触发器","slug":"_4-1-定义快照触发器","link":"#_4-1-定义快照触发器","children":[]},{"level":3,"title":"4.2. 使用快照触发器","slug":"_4-2-使用快照触发器","link":"#_4-2-使用快照触发器","children":[]},{"level":2,"title":"5. 实际中的快照","slug":"_5-实际中的快照","link":"#_5-实际中的快照","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1721944524000,"updatedTime":1721944524000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.73,"words":1420},"filePathRelative":"posts/baeldung/2024-07-25/2024-07-25-Snapshotting Aggregates in Axon.md","localizedDate":"2021年9月1日","excerpt":"\\n<p>在本文中，我们将探讨 Axon 如何支持聚合快照。我们认为这篇文章是我们关于 Axon 主要指南的扩展。因此，我们将再次使用 Axon Framework 和 Axon Server。我们将在本文的实现中使用前者，后者是事件存储和消息路由器。</p>\\n<p>聚合快照\\n让我们首先理解聚合快照的含义。当我们开始在应用程序中使用事件溯源时，一个自然的问题是如何使我的应用程序中的聚合保持高性能？尽管有几种优化选项，最直接的是引入快照。</p>\\n<p>聚合快照是存储聚合状态的快照以提高加载性能的过程。当引入快照时，加载聚合以处理命令变成了一个两步过程：</p>\\n<ol>\\n<li>检索最近的快照（如果有），并使用它来溯源聚合。快照携带一个序列号，定义了它代表聚合状态的截止点。</li>\\n<li>从快照的序列号开始检索其余事件，并溯源聚合的其余部分。</li>\\n</ol>","autoDesc":true}');export{g as comp,u as data};
