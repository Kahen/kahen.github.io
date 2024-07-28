import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as e}from"./app-DzJ3ruqA.js";const t={},c=e(`<h1 id="uri-create-与-new-uri-的区别-baeldung" tabindex="-1"><a class="header-anchor" href="#uri-create-与-new-uri-的区别-baeldung"><span>URI.create() 与 new URI() 的区别 | Baeldung</span></a></h1><p>当我们尝试访问网络中的某些资源时，我们首先必须获取资源的统一资源标识符（URI）。Java 标准库提供了 URI 类，使我们更容易处理 URI。当然，要使用 URI 类，第一步是获取一个 URI 实例。</p><p>假设我们有某个网络资源的地址字符串。有两种方法可以获得一个 URI 实例：</p><ul><li>直接使用地址字符串调用构造函数 - <code>URI myUri = new URI(theAddress);</code></li><li>调用 <code>URI.create()</code> 静态方法 - <code>URI myUri = URI.create(theAddress);</code></li></ul><p>在这个快速教程中，我们将仔细看看这两种方法，并讨论它们的区别。</p><h3 id="使用-uri-构造函数" tabindex="-1"><a class="header-anchor" href="#使用-uri-构造函数"><span>使用 URI 构造函数</span></a></h3><p>首先，让我们看看构造函数的签名：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token function">URI</span><span class="token punctuation">(</span><span class="token class-name">String</span> str<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">URISyntaxException</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>正如我们所看到的，如果使用无效的地址调用构造函数，可能会抛出 <code>URISyntaxException</code>。为了简单起见，让我们创建一个单元测试来看看这个情况：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertThrows</span><span class="token punctuation">(</span><span class="token class-name">URISyntaxException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token keyword">new</span> <span class="token class-name">URI</span><span class="token punctuation">(</span><span class="token string">&quot;I am an invalid URI string.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们应该注意到 <code>URISyntaxException</code> 是 <code>Exception</code> 的子类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">URISyntaxException</span> <span class="token keyword">extends</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>因此，它是一个检查异常。换句话说，当我们调用这个构造函数时，我们必须处理 <code>URISyntaxException</code>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">try</span> <span class="token punctuation">{</span>
    <span class="token class-name">URI</span> myUri <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">URI</span><span class="token punctuation">(</span><span class="token string">&quot;https://www.baeldung.com/articles&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertNotNull</span><span class="token punctuation">(</span>myUri<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">URISyntaxException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">fail</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们已经看到了构造函数的使用和作为单元测试的异常处理。如果我们执行测试，它会通过。<strong>然而，如果没有 <code>try-catch</code>，代码无法编译。</strong></p><p>正如我们所看到的，使用构造函数创建 URI 实例非常简单。接下来，让我们看看 <code>URI.create()</code> 方法。</p><h3 id="使用-uri-create-方法" tabindex="-1"><a class="header-anchor" href="#使用-uri-create-方法"><span>使用 URI.create() 方法</span></a></h3><p>我们已经提到 <code>URI.create()</code> 也可以创建 URI 实例。为了理解 <code>create()</code> 方法和构造函数之间的区别，让我们看看 <code>create()</code> 方法的源代码：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">URI</span> <span class="token function">create</span><span class="token punctuation">(</span><span class="token class-name">String</span> str<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">URI</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">URISyntaxException</span> x<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalArgumentException</span><span class="token punctuation">(</span>x<span class="token punctuation">.</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> x<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如上面的代码所示，<code>create()</code> 方法的实现非常简单。首先，它直接调用构造函数。然后，如果抛出 <code>URISyntaxException</code>，<strong>它将异常包装在一个新的 <code>IllegalArgumentException</code> 中。</strong></p><p>那么，让我们创建一个测试来看看，如果我们给 <code>create()</code> 一个无效的 URI 字符串，我们是否能得到预期的 <code>IllegalArgumentException</code>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertThrows</span><span class="token punctuation">(</span><span class="token class-name">IllegalArgumentException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token constant">URI</span><span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token string">&quot;I am an invalid URI string.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果我们运行测试，它会通过。</p><p>如果我们仔细看看 <code>IllegalArgumentException</code> 类，我们可以看到它是 <code>RuntimeException</code> 的子类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">IllegalArgumentException</span> <span class="token keyword">extends</span> <span class="token class-name">RuntimeException</span> <span class="token punctuation">{</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们知道 <code>RuntimeException</code> 是一个非检查异常。这意味着<strong>当我们使用 <code>create()</code> 方法创建 URI 实例时，我们不需要在显式的 <code>try-catch</code> 中处理异常</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">URI</span> myUri <span class="token operator">=</span> <span class="token constant">URI</span><span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token string">&quot;https://www.baeldung.com/articles&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertNotNull</span><span class="token punctuation">(</span>myUri<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>因此，<code>create()</code> 和 <code>URI()</code> 构造函数之间的主要区别是 <code>create()</code> 方法将构造函数的检查异常（<code>URISyntaxException</code>）变为非检查异常（<code>IllegalArgumentException</code>）。</p><p><strong>如果我们不想处理检查异常，我们可以使用 <code>create()</code> 静态方法来创建 URI 实例</strong>。</p><h3 id="结论" tabindex="-1"><a class="header-anchor" href="#结论"><span>结论</span></a></h3><p>在这篇文章中，我们讨论了使用构造函数和 <code>URI.create()</code> 方法实例化 URI 对象的区别。</p><p>像往常一样，这里展示的所有代码片段都可以在 GitHub 上找到。</p>`,32),p=[c];function o(l,i){return s(),n("div",null,p)}const r=a(t,[["render",o],["__file","2024-07-13-Difference Between URI.create   and new URI  .html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-13/2024-07-13-Difference%20Between%20URI.create%20%20%20and%20new%20URI%20%20.html","title":"URI.create() 与 new URI() 的区别 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java"],"tag":["URI","Java"],"head":[["meta",{"name":"keywords","content":"Java URI, URI.create(), new URI(), 异常处理"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-13/2024-07-13-Difference%20Between%20URI.create%20%20%20and%20new%20URI%20%20.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"URI.create() 与 new URI() 的区别 | Baeldung"}],["meta",{"property":"og:description","content":"URI.create() 与 new URI() 的区别 | Baeldung 当我们尝试访问网络中的某些资源时，我们首先必须获取资源的统一资源标识符（URI）。Java 标准库提供了 URI 类，使我们更容易处理 URI。当然，要使用 URI 类，第一步是获取一个 URI 实例。 假设我们有某个网络资源的地址字符串。有两种方法可以获得一个 URI 实..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-13T04:44:08.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"URI"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-13T04:44:08.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"URI.create() 与 new URI() 的区别 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-13T04:44:08.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"URI.create() 与 new URI() 的区别 | Baeldung 当我们尝试访问网络中的某些资源时，我们首先必须获取资源的统一资源标识符（URI）。Java 标准库提供了 URI 类，使我们更容易处理 URI。当然，要使用 URI 类，第一步是获取一个 URI 实例。 假设我们有某个网络资源的地址字符串。有两种方法可以获得一个 URI 实..."},"headers":[{"level":3,"title":"使用 URI 构造函数","slug":"使用-uri-构造函数","link":"#使用-uri-构造函数","children":[]},{"level":3,"title":"使用 URI.create() 方法","slug":"使用-uri-create-方法","link":"#使用-uri-create-方法","children":[]},{"level":3,"title":"结论","slug":"结论","link":"#结论","children":[]}],"git":{"createdTime":1720845848000,"updatedTime":1720845848000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.75,"words":826},"filePathRelative":"posts/baeldung/2024-07-13/2024-07-13-Difference Between URI.create   and new URI  .md","localizedDate":"2022年4月1日","excerpt":"\\n<p>当我们尝试访问网络中的某些资源时，我们首先必须获取资源的统一资源标识符（URI）。Java 标准库提供了 URI 类，使我们更容易处理 URI。当然，要使用 URI 类，第一步是获取一个 URI 实例。</p>\\n<p>假设我们有某个网络资源的地址字符串。有两种方法可以获得一个 URI 实例：</p>\\n<ul>\\n<li>直接使用地址字符串调用构造函数 - <code>URI myUri = new URI(theAddress);</code></li>\\n<li>调用 <code>URI.create()</code> 静态方法 - <code>URI myUri = URI.create(theAddress);</code></li>\\n</ul>","autoDesc":true}');export{r as comp,k as data};
