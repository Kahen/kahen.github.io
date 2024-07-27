import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as n,a as t}from"./app-CJGTm_7y.js";const s={},i=t(`<hr><h1 id="selenium-webdriver-中-get-和-navigate-方法的区别" tabindex="-1"><a class="header-anchor" href="#selenium-webdriver-中-get-和-navigate-方法的区别"><span>Selenium WebDriver 中 get() 和 navigate() 方法的区别</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>Selenium WebDriver 是一个 API，允许我们测试网页。在这个简短的教程中，我们将探讨 WebDriver 中的 <em>get()</em> 和 <em>navigate()</em> 方法的区别。</p><h2 id="_2-关于-webdriver" tabindex="-1"><a class="header-anchor" href="#_2-关于-webdriver"><span>2. 关于 WebDriver</span></a></h2><p><strong>Selenium WebDriver API 包含与不同网络浏览器交互的高级方法</strong>。使用此 API，我们可以调用不同的操作，例如加载网页、点击链接、搜索 DOM 以查找特定元素等。</p><p>API 中的两个方法 <em>get()</em> 和 <em>navigate()</em> 允许我们加载网页。虽然它们在名称上相似，但<strong>它们在行为上存在一些差异，我们将在下面看到</strong>。</p><h2 id="_3-get-方法" tabindex="-1"><a class="header-anchor" href="#_3-get-方法"><span>3. <em>get()</em> 方法</span></a></h2><p>在 WebDriver 中加载网页的最简单方式是使用 <em>get()</em> 方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">WebDriver</span> driver <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ChromeDriver</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
driver<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;https://www.baeldung.com/&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这段代码创建了一个新的 Chrome WebDriver 并加载了 Baeldung 的主页。值得注意的是，<strong><em>get()</em> 方法会等待直到网页被认为完全加载并准备好返回控制权</strong>。如果页面有很多 JavaScript 或其他资源，调用可能需要一段时间。</p><h2 id="_4-navigate-api" tabindex="-1"><a class="header-anchor" href="#_4-navigate-api"><span>4. Navigate API</span></a></h2><p>WebDriver API 包括一组用于导航的独立函数。让我们看看第一个：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">WebDriver</span> driver <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ChromeDriver</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
driver<span class="token punctuation">.</span><span class="token function">navigate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token keyword">to</span><span class="token punctuation">(</span><span class="token string">&quot;https://www.baeldung.com/&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>功能上，<strong><em>navigate().to()</em> 方法的行为与 <em>get()</em> 方法完全相同</strong>。实际上，它是 <em>get()</em> 方法的别名，只是在远程网络浏览器中简单地加载指定的 URL。并且因为它只是 <em>get()</em> 的别名，它也不会在网页完全加载之前返回。</p><p>然而，navigate API 还具有超出 <em>get()</em> 方法提供的功能。</p><p>首先，它跟踪浏览器历史记录，并允许逐页移动：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>driver<span class="token punctuation">.</span><span class="token function">navigate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forward</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
driver<span class="token punctuation">.</span><span class="token function">navigate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">back</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>navigate 接口还允许我们刷新当前 URL：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>driver<span class="token punctuation">.</span><span class="token function">navigate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">refresh</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然而，最重要的是，<strong>每次我们使用 navigate API 时，它都会保留 cookie</strong>。与每次调用都会丢弃会话状态的 <em>get()</em> 方法不同，<em>navigate()</em> 方法确实会保持状态。</p><p>这意味着我们使用 navigate API 加载的每个页面都包含之前的 cookie。这对于测试许多场景（如登录和单页应用程序）是必要的。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在这篇快速文章中，我们查看了 Selenium WebDriver API 中 <em>get()</em> 和 <em>navigate()</em> 方法的区别。虽然 <em>get()</em> 更容易使用，但 <em>navigate()</em> 有两个主要优点。</p><p>首先，<em>navigate()</em> 提供了额外的方法用于导航页面历史记录，以及刷新当前页面。其次，它在导航到每个 URL 时保持状态，这意味着 cookie 和其他会话数据在每次页面加载中都会持续存在。</p><p>了解这些差异使我们能够根据测试的需求选择最佳方法。</p>`,26),p=[i];function r(o,c){return n(),a("div",null,p)}const v=e(s,[["render",r],["__file","2024-07-04-Difference Between get   and navigate   in Selenium WebDriver.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-04/2024-07-04-Difference%20Between%20get%20%20%20and%20navigate%20%20%20in%20Selenium%20WebDriver.html","title":"Selenium WebDriver 中 get() 和 navigate() 方法的区别","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Selenium WebDriver","Web Testing"],"tag":["get()","navigate()"],"head":[["meta",{"name":"keywords","content":"Selenium WebDriver, get() vs navigate(), web testing"}],["meta",{"name":"description","content":"A comparison between the get() and navigate() methods in Selenium WebDriver for web testing."}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-04/2024-07-04-Difference%20Between%20get%20%20%20and%20navigate%20%20%20in%20Selenium%20WebDriver.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Selenium WebDriver 中 get() 和 navigate() 方法的区别"}],["meta",{"property":"og:description","content":"Selenium WebDriver 中 get() 和 navigate() 方法的区别 1. 引言 Selenium WebDriver 是一个 API，允许我们测试网页。在这个简短的教程中，我们将探讨 WebDriver 中的 get() 和 navigate() 方法的区别。 2. 关于 WebDriver Selenium WebDriver..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-04T15:55:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"get()"}],["meta",{"property":"article:tag","content":"navigate()"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-04T15:55:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Selenium WebDriver 中 get() 和 navigate() 方法的区别\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-04T15:55:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Selenium WebDriver 中 get() 和 navigate() 方法的区别 1. 引言 Selenium WebDriver 是一个 API，允许我们测试网页。在这个简短的教程中，我们将探讨 WebDriver 中的 get() 和 navigate() 方法的区别。 2. 关于 WebDriver Selenium WebDriver..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 关于 WebDriver","slug":"_2-关于-webdriver","link":"#_2-关于-webdriver","children":[]},{"level":2,"title":"3. get() 方法","slug":"_3-get-方法","link":"#_3-get-方法","children":[]},{"level":2,"title":"4. Navigate API","slug":"_4-navigate-api","link":"#_4-navigate-api","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720108556000,"updatedTime":1720108556000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.45,"words":734},"filePathRelative":"posts/baeldung/2024-07-04/2024-07-04-Difference Between get   and navigate   in Selenium WebDriver.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>Selenium WebDriver 中 get() 和 navigate() 方法的区别</h1>\\n<h2>1. 引言</h2>\\n<p>Selenium WebDriver 是一个 API，允许我们测试网页。在这个简短的教程中，我们将探讨 WebDriver 中的 <em>get()</em> 和 <em>navigate()</em> 方法的区别。</p>\\n<h2>2. 关于 WebDriver</h2>\\n<p><strong>Selenium WebDriver API 包含与不同网络浏览器交互的高级方法</strong>。使用此 API，我们可以调用不同的操作，例如加载网页、点击链接、搜索 DOM 以查找特定元素等。</p>","autoDesc":true}');export{v as comp,d as data};
