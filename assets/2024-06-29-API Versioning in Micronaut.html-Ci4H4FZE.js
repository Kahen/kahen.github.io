import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-CtR6X2Br.js";const e={},p=t(`<ul><li></li></ul><h1 id="micronaut-中的-api-版本控制" tabindex="-1"><a class="header-anchor" href="#micronaut-中的-api-版本控制"><span>Micronaut 中的 API 版本控制</span></a></h1><p>在本教程中，我们将讨论如何利用 Micronaut 框架的功能来实现不断发展的 REST API。</p><p>在软件开发项目不断演变的领域中，有时完全基于 REST API，同时引入新功能和改进，同时保持向后兼容性是一个至关重要的挑战。实现这一点的一个基本方面是我们必须实现一种称为 API 版本控制的技术。</p><p>我们将探讨 Micronaut 中 API 版本控制的概念，Micronaut 是一个流行的微服务框架，用于构建高效且可扩展的应用程序。我们将深入探讨 API 版本控制的重要性，Micronaut 中实现它的不同策略，以及确保平滑版本过渡的最佳实践。</p><h3 id="_2-api-版本控制的重要性" tabindex="-1"><a class="header-anchor" href="#_2-api-版本控制的重要性"><span>2. API 版本控制的重要性</span></a></h3><p>API 版本控制是管理和发展应用程序编程接口（API）的做法，允许客户端在准备好时继续使用现有版本，同时也采用新版本。它有几个重要原因。</p><h4 id="_2-1-保持兼容性" tabindex="-1"><a class="header-anchor" href="#_2-1-保持兼容性"><span>2.1. 保持兼容性</span></a></h4><p>随着应用程序的发展，我们可能需要更改我们的 API 以引入新功能、修复错误或提高性能。同时，确保这些更改不会干扰现有客户端也是必要的。<strong>API 版本控制使我们能够在保持与以前版本的兼容性的同时引入更改</strong>。</p><h4 id="_2-2-允许逐步采用" tabindex="-1"><a class="header-anchor" href="#_2-2-允许逐步采用"><span>2.2. 允许逐步采用</span></a></h4><p>我们的 API 客户端可能有不同的采用新版本的计划。因此，提供多个版本的 API 允许客户端在合理的采用时间内更新他们的代码，减少破坏其应用程序的风险。</p><h4 id="_2-3-促进协作" tabindex="-1"><a class="header-anchor" href="#_2-3-促进协作"><span>2.3. 促进协作</span></a></h4><p>它还促进了开发团队之间的协作。当不同的团队在系统的其他部分工作，或者第三方开发人员与我们的 API 集成时，版本控制允许每个团队即使在其他地方进行更改时也有一个稳定的接口。</p><h3 id="_3-micronaut-中的-api-版本控制策略" tabindex="-1"><a class="header-anchor" href="#_3-micronaut-中的-api-版本控制策略"><span>3. Micronaut 中的 API 版本控制策略</span></a></h3><p><strong>Micronaut 提供了不同的策略来实现 API 版本控制</strong>。我们不会讨论哪一个是最好的，因为这在很大程度上取决于用例和项目的实际情况。尽管如此，我们可以讨论它们各自的具体情况。</p><h4 id="_3-1-uri-版本控制" tabindex="-1"><a class="header-anchor" href="#_3-1-uri-版本控制"><span>3.1. URI 版本控制</span></a></h4><p>在 URI 版本控制中，API 的版本在 URI 中定义。<strong>这种方法清楚地表明客户端正在使用的 API 版本</strong>。尽管 URL 可能不如它可能的那样用户友好，但它向客户端明确了它使用的版本。</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Controller</span><span class="token punctuation">(</span><span class="token string">&quot;/v1/sheep/count&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SheepCountControllerV1</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Get</span><span class="token punctuation">(</span>
        uri <span class="token operator">=</span> <span class="token string">&quot;{?max}&quot;</span><span class="token punctuation">,</span>
        consumes <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">&quot;application/json&quot;</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
        produces <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">&quot;application/json&quot;</span><span class="token punctuation">}</span>
    <span class="token punctuation">)</span>
    <span class="token class-name">Flowable</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\`\`\` <span class="token function">countV1</span><span class="token punctuation">(</span><span class="token annotation punctuation">@Nullable</span> <span class="token class-name">Integer</span> max<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 实现</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>虽然这可能不太实用，但我们的客户端对使用的版本很确定，这意味着透明度。从开发角度来看，很容易实现特定于特定版本的任何业务规则，这意味着很好的隔离。然而，有人可能会说它是侵入性的，因为 URI 可能会频繁更改。它可能需要客户端硬编码并增加了不完全特定于资源的额外上下文。</p><p>实现 API 版本控制的另一种选择是利用头部来路由请求到正确的控制器。这里是一个例子：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Controller</span><span class="token punctuation">(</span><span class="token string">&quot;/dog&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DogCountController</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Get</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;/count&quot;</span><span class="token punctuation">,</span> produces <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">&quot;application/json&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@Version</span><span class="token punctuation">(</span><span class="token string">&quot;1&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">Flowable</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\`\`\` <span class="token function">countV1</span><span class="token punctuation">(</span><span class="token annotation punctuation">@QueryValue</span><span class="token punctuation">(</span><span class="token string">&quot;max&quot;</span><span class="token punctuation">)</span> <span class="token annotation punctuation">@Nullable</span> <span class="token class-name">Integer</span> max<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 逻辑</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Get</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;/count&quot;</span><span class="token punctuation">,</span> produces <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">&quot;application/json&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@Version</span><span class="token punctuation">(</span><span class="token string">&quot;2&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">Flowable</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\`\`\` <span class="token function">countV2</span><span class="token punctuation">(</span><span class="token annotation punctuation">@QueryValue</span><span class="token punctuation">(</span><span class="token string">&quot;max&quot;</span><span class="token punctuation">)</span> <span class="token annotation punctuation">@NonNull</span> <span class="token class-name">Integer</span> max<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 逻辑</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过简单地使用 <em>@Version</em> 注解，Micronaut 可以根据头部的值定向请求到正确的处理器。然而，我们仍然需要更改一些配置，正如我们接下来看到的：</p><div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre class="language-yaml"><code><span class="token key atrule">micronaut</span><span class="token punctuation">:</span>
  <span class="token key atrule">router</span><span class="token punctuation">:</span>
    <span class="token key atrule">versioning</span><span class="token punctuation">:</span>
      <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
      <span class="token key atrule">default-version</span><span class="token punctuation">:</span> <span class="token number">2</span>
      <span class="token key atrule">header</span><span class="token punctuation">:</span>
        <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
        <span class="token key atrule">names</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> <span class="token string">&#39;X-API-VERSION&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在我们通过 Micronaut 启用了版本控制，将版本 2 定义为默认版本，以防没有指定版本。使用的策略将基于头部，头部 <em>X-API-VERSION</em> 将用于确定版本。实际上，这是 Micronaut 默认查看的头部，所以在这种情况下，没有必要定义它，但如果我们想使用另一个头部，我们可以这样指定。</p><p><strong>使用头部，URI 保持清晰简洁，我们可以保留向后兼容性，URI 纯粹基于资源，它允许 API 的发展更加灵活</strong>。然而，它不那么直观和可见。客户端必须意识到他想使用的版本，而且更容易出错。还有另一种类似的策略，它使用 MineTypes 来实现这一点。</p><h4 id="_3-3-参数版本控制" tabindex="-1"><a class="header-anchor" href="#_3-3-参数版本控制"><span>3.3. 参数版本控制</span></a></h4><p>这种策略利用 URI 中的查询参数进行路由。在 Mircronaut 中的实现与前一种策略完全相同。我们只需要在我们的控制器中添加 @Version。然而，我们需要更改一些属性：</p><div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre class="language-yaml"><code><span class="token key atrule">micronaut</span><span class="token punctuation">:</span>
  <span class="token key atrule">router</span><span class="token punctuation">:</span>
    <span class="token key atrule">versioning</span><span class="token punctuation">:</span>
      <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
      <span class="token key atrule">default-version</span><span class="token punctuation">:</span> <span class="token number">2</span>
      <span class="token key atrule">parameter</span><span class="token punctuation">:</span>
        <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
        <span class="token key atrule">names</span><span class="token punctuation">:</span> <span class="token string">&#39;v,api-version&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>有了这个，客户端只需要在每个请求中传递 <em>v</em> 或 <em>api-version</em> 作为查询参数，Micronat 就会为我们处理路由。</p><p>再次使用这种策略，URI 将没有与资源相关的信息，尽管比更改 URI 本身要少。除此之外，版本控制不那么显式，更容易出错。这是非 RESTful 的，需要文档以避免混淆。然而，我们也以欣赏解决方案的简单性。</p><h4 id="_3-4-自定义版本控制" tabindex="-1"><a class="header-anchor" href="#_3-4-自定义版本控制"><span>3.4. 自定义版本控制</span></a></h4><p>Micronaut 还提供了一种自定义的方式来实现 API 版本控制，我们可以实施一个版本路由解析器并告诉 Micronaut 使用哪个版本。实现很简单，我们只需要实现一个接口，就像下面的例子：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Singleton</span>
<span class="token annotation punctuation">@Requires</span><span class="token punctuation">(</span>property <span class="token operator">=</span> <span class="token string">&quot;my.router.versioning.enabled&quot;</span><span class="token punctuation">,</span> value <span class="token operator">=</span> <span class="token string">&quot;true&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CustomVersionResolver</span> <span class="token keyword">implements</span> <span class="token class-name">RequestVersionResolver</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Inject</span>
    <span class="token annotation punctuation">@Value</span><span class="token punctuation">(</span><span class="token string">&quot;\${micronaut.router.versioning.default-version}&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> defaultVersion<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Optional</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\`\`\` <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token class-name">HttpRequest</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span>\` request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">var</span> apiKey <span class="token operator">=</span> <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">ofNullable</span><span class="token punctuation">(</span>request<span class="token punctuation">.</span><span class="token function">getHeaders</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;api-key&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>apiKey<span class="token punctuation">.</span><span class="token function">isPresent</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>apiKey<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token function">parseInt</span><span class="token punctuation">(</span>apiKey<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">%</span> <span class="token number">2</span> <span class="token operator">==</span> <span class="token number">0</span> <span class="token operator">?</span> <span class="token string">&quot;2&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">return</span> <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span>defaultVersion<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们可以看到如何利用请求中的任何信息来实现路由策略，Micronaut 会做其余的事情。<strong>这是强大的，但我们需要谨慎，因为这可能导致实现版本控制的形式较差和不太直观</strong>。</p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们看到了如何使用 Micronaut 实现 API 版本控制。此外，我们还讨论了应用这种技术的不同策略及其细微差别。</p><p><strong>还很明显，选择正确的策略涉及权衡 URI 的清晰度、版本控制的显式性、易用性、向后兼容性、RESTful 遵守以及消费 API 的客户端的具体需求。最佳方法取决于我们项目的独特要求和限制</strong>。</p><p>像往常一样，本文中使用的所有代码示例都可以在 GitHub 上找到。</p>`,38),o=[p];function c(i,l){return s(),a("div",null,o)}const k=n(e,[["render",c],["__file","2024-06-29-API Versioning in Micronaut.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-06-29/2024-06-29-API%20Versioning%20in%20Micronaut.html","title":"Micronaut 中的 API 版本控制","lang":"zh-CN","frontmatter":{"date":"2024-06-29T00:00:00.000Z","category":["Java","Micronaut"],"tag":["API","版本控制"],"head":[["meta",{"name":"keywords","content":"Java, Micronaut, API, 版本控制"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-29/2024-06-29-API%20Versioning%20in%20Micronaut.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Micronaut 中的 API 版本控制"}],["meta",{"property":"og:description","content":"Micronaut 中的 API 版本控制 在本教程中，我们将讨论如何利用 Micronaut 框架的功能来实现不断发展的 REST API。 在软件开发项目不断演变的领域中，有时完全基于 REST API，同时引入新功能和改进，同时保持向后兼容性是一个至关重要的挑战。实现这一点的一个基本方面是我们必须实现一种称为 API 版本控制的技术。 我们将探讨..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-29T12:47:09.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"API"}],["meta",{"property":"article:tag","content":"版本控制"}],["meta",{"property":"article:published_time","content":"2024-06-29T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-29T12:47:09.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Micronaut 中的 API 版本控制\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-29T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-29T12:47:09.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Micronaut 中的 API 版本控制 在本教程中，我们将讨论如何利用 Micronaut 框架的功能来实现不断发展的 REST API。 在软件开发项目不断演变的领域中，有时完全基于 REST API，同时引入新功能和改进，同时保持向后兼容性是一个至关重要的挑战。实现这一点的一个基本方面是我们必须实现一种称为 API 版本控制的技术。 我们将探讨..."},"headers":[{"level":3,"title":"2. API 版本控制的重要性","slug":"_2-api-版本控制的重要性","link":"#_2-api-版本控制的重要性","children":[]},{"level":3,"title":"3. Micronaut 中的 API 版本控制策略","slug":"_3-micronaut-中的-api-版本控制策略","link":"#_3-micronaut-中的-api-版本控制策略","children":[]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1719665229000,"updatedTime":1719665229000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.77,"words":1731},"filePathRelative":"posts/baeldung/2024-06-29/2024-06-29-API Versioning in Micronaut.md","localizedDate":"2024年6月29日","excerpt":"<ul>\\n<li></li>\\n</ul>\\n<h1>Micronaut 中的 API 版本控制</h1>\\n<p>在本教程中，我们将讨论如何利用 Micronaut 框架的功能来实现不断发展的 REST API。</p>\\n<p>在软件开发项目不断演变的领域中，有时完全基于 REST API，同时引入新功能和改进，同时保持向后兼容性是一个至关重要的挑战。实现这一点的一个基本方面是我们必须实现一种称为 API 版本控制的技术。</p>\\n<p>我们将探讨 Micronaut 中 API 版本控制的概念，Micronaut 是一个流行的微服务框架，用于构建高效且可扩展的应用程序。我们将深入探讨 API 版本控制的重要性，Micronaut 中实现它的不同策略，以及确保平滑版本过渡的最佳实践。</p>","autoDesc":true}');export{k as comp,d as data};
