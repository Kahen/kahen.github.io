import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-LwwahXlT.js";const e={},p=t(`<h1 id="如何管理completablefuture的超时" tabindex="-1"><a class="header-anchor" href="#如何管理completablefuture的超时"><span>如何管理CompletableFuture的超时</span></a></h1><p>当我们构建依赖于其他服务的服务时，通常需要处理依赖服务响应过慢的情况。</p><p>如果我们使用CompletableFuture来异步管理对我们依赖项的调用，它的超时功能使我们能够为结果设置最大等待时间。如果预期的结果在指定时间内没有到达，我们可以采取行动，例如提供默认值，以防止我们的应用程序陷入漫长的过程。</p><p>在本文中，我们将讨论三种不同的CompletableFuture超时管理方式。</p><p>设想一个电子商务应用程序，它需要调用外部服务以获取特殊产品优惠。**我们可以使用带有超时设置的CompletableFuture来保持响应性。**如果服务未能及时响应，这可以抛出错误或提供默认值。</p><p>例如，在这种情况下，假设我们将向返回PRODUCT_OFFERS的API发出请求。让我们称之为fetchProductData()，我们可以将其包装在CompletableFuture中，以便我们可以处理超时：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token class-name">CompletableFuture</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\` <span class="token function">fetchProductData</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">CompletableFuture</span><span class="token punctuation">.</span><span class="token function">supplyAsync</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token class-name">URL</span> url <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">URL</span><span class="token punctuation">(</span><span class="token string">&quot;http://localhost:8080/api/dummy&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">HttpURLConnection</span> connection <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">HttpURLConnection</span><span class="token punctuation">)</span> url<span class="token punctuation">.</span><span class="token function">openConnection</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">BufferedReader</span> in <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BufferedReader</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">InputStreamReader</span><span class="token punctuation">(</span>connection<span class="token punctuation">.</span><span class="token function">getInputStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token class-name">String</span> inputLine<span class="token punctuation">;</span>
                <span class="token class-name">StringBuffer</span> response <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringBuffer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

                <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>inputLine <span class="token operator">=</span> in<span class="token punctuation">.</span><span class="token function">readLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    response<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span>inputLine<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>

                <span class="token keyword">return</span> response<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
                connection<span class="token punctuation">.</span><span class="token function">disconnect</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IOException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>要使用WireMock测试超时，我们可以通过遵循WireMock使用指南轻松配置模拟服务器以进行超时。让我们假设在典型的互联网连接上合理的网页加载时间是1000毫秒，因此我们设置DEFAULT_TIMEOUT为此值：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">int</span> <span class="token constant">DEFAULT_TIMEOUT</span> <span class="token operator">=</span> <span class="token number">1000</span><span class="token punctuation">;</span> <span class="token comment">// 1 秒</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后，我们将创建一个wireMockServer，它给出PRODUCT_OFFERS的body响应，并设置5000毫秒或5秒的延迟，确保这个值超过DEFAULT_TIMEOUT以确保超时发生：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">stubFor</span><span class="token punctuation">(</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token function">urlEqualTo</span><span class="token punctuation">(</span><span class="token string">&quot;/api/dummy&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">willReturn</span><span class="token punctuation">(</span><span class="token function">aResponse</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">withFixedDelay</span><span class="token punctuation">(</span><span class="token number">5000</span><span class="token punctuation">)</span> <span class="token comment">// 必须大于 DEFAULT_TIMEOUT 才能发生超时</span>
    <span class="token punctuation">.</span><span class="token function">withBody</span><span class="token punctuation">(</span><span class="token constant">PRODUCT_OFFERS</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-使用-completeontimeout" tabindex="-1"><a class="header-anchor" href="#_3-使用-completeontimeout"><span>3. 使用 completeOnTimeout()</span></a></h3><p>completeOnTimeout()方法如果在指定时间内任务未完成，则解析CompletableFuture为默认值。</p><p>使用此方法，<strong>我们可以设置默认值<code>&lt;T&gt;</code>，以便在超时发生时返回</strong>。此方法返回调用此方法的CompletableFuture。</p><p>在这个例子中，让我们默认为DEFAULT_PRODUCT：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">CompletableFuture</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>\`\`\` productDataFuture <span class="token operator">=</span> <span class="token function">fetchProductData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
productDataFuture<span class="token punctuation">.</span><span class="token function">completeOnTimeout</span><span class="token punctuation">(</span><span class="token constant">DEFAULT_PRODUCT</span><span class="token punctuation">,</span> <span class="token constant">DEFAULT_TIMEOUT</span><span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">MILLISECONDS</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token constant">DEFAULT_PRODUCT</span><span class="token punctuation">,</span> productDataFuture<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们的目标是即使在请求失败或超时期间也保持结果有意义，那么这种方法是适当的。</p><p>例如，在电子商务场景中，当展示产品促销时，如果检索特殊促销产品数据失败或超过超时，系统将显示默认产品。</p><h3 id="_4-使用-ortimeout" tabindex="-1"><a class="header-anchor" href="#_4-使用-ortimeout"><span>4. 使用 orTimeout()</span></a></h3><p>我们可以使用orTimeout()来增强CompletableFuture的超时处理行为，如果未来在特定时间内未完成。</p><p>此方法返回应用于此方法的相同CompletableFuture，并且在超时情况下<strong>将抛出TimeoutException</strong>。</p><p>然后，为了测试这个方法，我们应该使用assertThrows()来证明异常被引发：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">CompletableFuture</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>\`\`\` productDataFuture <span class="token operator">=</span> <span class="token function">fetchProductData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
productDataFuture<span class="token punctuation">.</span><span class="token function">orTimeout</span><span class="token punctuation">(</span><span class="token constant">DEFAULT_TIMEOUT</span><span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">MILLISECONDS</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertThrows</span><span class="token punctuation">(</span><span class="token class-name">ExecutionException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> productDataFuture<span class="token operator">::</span><span class="token function">get</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们的优先级是响应性或耗时任务，我们希望在超时发生时提供快速行动，那么这是合适的方法。</p><p>然而，需要适当处理这些异常以获得良好的性能，因为这种方法明确抛出异常。</p><p>此外，这种方法适用于各种场景，例如管理网络连接、处理IO操作、处理实时数据和管理队列。</p><h3 id="_5-使用-completeexceptionally" tabindex="-1"><a class="header-anchor" href="#_5-使用-completeexceptionally"><span>5. 使用 completeExceptionally()</span></a></h3><p>CompletableFuture类的completeExceptionally()方法允许我们用特定异常异常地完成未来。对结果检索方法的后续调用，如get()和join()，将抛出指定的异常。</p><p>如果方法调用导致CompletableFuture过渡到完成状态，则此方法返回true。否则，它返回false。</p><p>在这里，我们将使用ScheduledExecutorService，它是Java中用于安排和管理特定时间或延迟执行任务的接口。它提供了在并发环境中安排重复任务、处理超时和管理错误的灵活性：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">ScheduledExecutorService</span> executorService <span class="token operator">=</span> <span class="token class-name">Executors</span><span class="token punctuation">.</span><span class="token function">newScheduledThreadPool</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//...</span>
<span class="token class-name">CompletableFuture</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>\`\`\` productDataFuture <span class="token operator">=</span> <span class="token function">fetchProductData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
executorService<span class="token punctuation">.</span><span class="token function">schedule</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> productDataFuture<span class="token punctuation">.</span><span class="token function">completeExceptionally</span><span class="token punctuation">(</span>
  <span class="token keyword">new</span> <span class="token class-name">TimeoutException</span><span class="token punctuation">(</span><span class="token string">&quot;Timeout occurred&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token constant">DEFAULT_TIMEOUT</span><span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">MILLISECONDS</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertThrows</span><span class="token punctuation">(</span><span class="token class-name">ExecutionException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> productDataFuture<span class="token operator">::</span><span class="token function">get</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们需要处理TimeoutException以及其他异常，或者我们想要使其自定义或特定，也许这是合适的方式。我们通常使用这种方法来处理失败的数据验证、致命错误，或者当任务没有默认值时。</p><h3 id="_6-比较-completeontimeout-vs-ortimeout-vs-completeexceptionally" tabindex="-1"><a class="header-anchor" href="#_6-比较-completeontimeout-vs-ortimeout-vs-completeexceptionally"><span>6. 比较：completeOnTimeout() vs orTimeout() vs completeExceptionally()</span></a></h3><p>通过所有这些方法，我们可以管理和控制CompletableFuture在不同场景下的行为，特别是当处理需要定时和处理超时或错误的异步操作时。</p><p>让我们比较completeOnTimeout()、orTimeout()和completeExceptionally()的优缺点：</p><table><thead><tr><th>方法</th><th>优点</th><th>缺点</th></tr></thead><tbody><tr><td>completeOnTimeout()</td><td>允许替换长时间运行任务的默认结果，如果任务运行时间过长<code>&lt;br&gt;</code>避免抛出异常的情况下很有用</td><td>没有明确标记超时发生</td></tr><tr><td>orTimeout()</td><td>当超时发生时明确生成TimeoutException<code>&lt;br&gt;</code>可以以特定方式处理超时</td><td>不提供替换默认结果的选项</td></tr><tr><td>completeExceptionally()</td><td>允许用自定义异常明确标记结果<code>&lt;br&gt;</code>在指示异步操作失败时很有用</td><td>比管理超时更通用</td></tr></tbody></table><h3 id="_7-结论" tabindex="-1"><a class="header-anchor" href="#_7-结论"><span>7. 结论</span></a></h3><p>在本文中，我们探讨了CompletableFuture内部异步过程中超时的三种不同响应方式。</p><p>在选择我们的方法时，我们应该考虑我们管理长时间运行任务的需求。我们应该在默认值和使用特定异常指示异步操作超时之间做出决定。</p><p>如常，完整的源代码可在GitHub上获取。</p>`,40),o=[p];function c(l,u){return s(),a("div",null,o)}const k=n(e,[["render",c],["__file","2024-06-28-How To Manage Timeout for CompletableFuture.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-06-28/2024-06-28-How%20To%20Manage%20Timeout%20for%20CompletableFuture.html","title":"如何管理CompletableFuture的超时","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java"],"tag":["CompletableFuture","异步编程"],"head":[["meta",{"name":"keywords","content":"CompletableFuture, 异步编程, 超时管理"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-28/2024-06-28-How%20To%20Manage%20Timeout%20for%20CompletableFuture.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"如何管理CompletableFuture的超时"}],["meta",{"property":"og:description","content":"如何管理CompletableFuture的超时 当我们构建依赖于其他服务的服务时，通常需要处理依赖服务响应过慢的情况。 如果我们使用CompletableFuture来异步管理对我们依赖项的调用，它的超时功能使我们能够为结果设置最大等待时间。如果预期的结果在指定时间内没有到达，我们可以采取行动，例如提供默认值，以防止我们的应用程序陷入漫长的过程。 在..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-28T14:56:14.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"CompletableFuture"}],["meta",{"property":"article:tag","content":"异步编程"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-28T14:56:14.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"如何管理CompletableFuture的超时\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-28T14:56:14.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"如何管理CompletableFuture的超时 当我们构建依赖于其他服务的服务时，通常需要处理依赖服务响应过慢的情况。 如果我们使用CompletableFuture来异步管理对我们依赖项的调用，它的超时功能使我们能够为结果设置最大等待时间。如果预期的结果在指定时间内没有到达，我们可以采取行动，例如提供默认值，以防止我们的应用程序陷入漫长的过程。 在..."},"headers":[{"level":3,"title":"3. 使用 completeOnTimeout()","slug":"_3-使用-completeontimeout","link":"#_3-使用-completeontimeout","children":[]},{"level":3,"title":"4. 使用 orTimeout()","slug":"_4-使用-ortimeout","link":"#_4-使用-ortimeout","children":[]},{"level":3,"title":"5. 使用 completeExceptionally()","slug":"_5-使用-completeexceptionally","link":"#_5-使用-completeexceptionally","children":[]},{"level":3,"title":"6. 比较：completeOnTimeout() vs orTimeout() vs completeExceptionally()","slug":"_6-比较-completeontimeout-vs-ortimeout-vs-completeexceptionally","link":"#_6-比较-completeontimeout-vs-ortimeout-vs-completeexceptionally","children":[]},{"level":3,"title":"7. 结论","slug":"_7-结论","link":"#_7-结论","children":[]}],"git":{"createdTime":1719586574000,"updatedTime":1719586574000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.76,"words":1428},"filePathRelative":"posts/baeldung/2024-06-28/2024-06-28-How To Manage Timeout for CompletableFuture.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>当我们构建依赖于其他服务的服务时，通常需要处理依赖服务响应过慢的情况。</p>\\n<p>如果我们使用CompletableFuture来异步管理对我们依赖项的调用，它的超时功能使我们能够为结果设置最大等待时间。如果预期的结果在指定时间内没有到达，我们可以采取行动，例如提供默认值，以防止我们的应用程序陷入漫长的过程。</p>\\n<p>在本文中，我们将讨论三种不同的CompletableFuture超时管理方式。</p>\\n<p>设想一个电子商务应用程序，它需要调用外部服务以获取特殊产品优惠。**我们可以使用带有超时设置的CompletableFuture来保持响应性。**如果服务未能及时响应，这可以抛出错误或提供默认值。</p>","autoDesc":true}');export{k as comp,d as data};
