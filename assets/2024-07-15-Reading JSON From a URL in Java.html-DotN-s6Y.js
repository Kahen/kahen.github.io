import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-CtR6X2Br.js";const e={},p=t(`<h1 id="在java中从url读取json数据" tabindex="-1"><a class="header-anchor" href="#在java中从url读取json数据"><span>在Java中从URL读取JSON数据</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>在本快速教程中，我们将创建能够从任何URL读取JSON数据的方法。我们将从使用Java核心类开始，然后使用一些库来简化我们的代码。</p><h2 id="_2-使用java核心类" tabindex="-1"><a class="header-anchor" href="#_2-使用java核心类"><span>2. 使用Java核心类</span></a></h2><p>在Java中从URL读取数据的最简单方法之一是使用_URL_类。要使用它，我们对_URL_打开一个输入流，创建一个输入流读取器，然后读取所有字符。我们将这些字符追加到一个_StringBuilder_，然后将其作为_String_返回：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">stream</span><span class="token punctuation">(</span><span class="token class-name">URL</span> url<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">InputStream</span> input <span class="token operator">=</span> url<span class="token punctuation">.</span><span class="token function">openStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">InputStreamReader</span> isr <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">InputStreamReader</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">BufferedReader</span> reader <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BufferedReader</span><span class="token punctuation">(</span>isr<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">StringBuilder</span> json <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> c<span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>c <span class="token operator">=</span> reader<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            json<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">char</span><span class="token punctuation">)</span> c<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> json<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这段代码包含了很多样板代码。此外，如果我们想要将我们的JSON转换为一个映射或POJO，它还需要更多的代码。即使使用新的Java 11 HttpClient，对于一个简单的GET请求来说，代码量也是很多的。而且，它也不帮助我们将响应从字符串转换为POJO。那么，让我们探索一些更简单的方法来做这件事。</p><h2 id="_3-使用commons-io和org-json" tabindex="-1"><a class="header-anchor" href="#_3-使用commons-io和org-json"><span>3. 使用commons-io和org.json</span></a></h2><p>一个非常流行的库是Apache Commons IO。我们将使用_IOUtils_来读取一个URL并得到一个_String_。然后，为了将其转换为_JSONObject_，我们将使用JSON-Java（org.json）库。这是json.org为Java提供的参考实现。让我们将它们结合在一个新的方法中：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">JSONObject</span> <span class="token function">getJson</span><span class="token punctuation">(</span><span class="token class-name">URL</span> url<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> json <span class="token operator">=</span> <span class="token class-name">IOUtils</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span>url<span class="token punctuation">,</span> <span class="token class-name">Charset</span><span class="token punctuation">.</span><span class="token function">forName</span><span class="token punctuation">(</span><span class="token string">&quot;UTF-8&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">JSONObject</span><span class="token punctuation">(</span>json<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用_JSONObject_，我们可以调用_get()<em>来获取任何属性，并得到一个_Object</em>。有类似命名的方法用于特定类型。例如：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>jsonObject<span class="token punctuation">.</span><span class="token function">getString</span><span class="token punctuation">(</span><span class="token string">&quot;stringProperty&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_4-使用jackson和-objectmapper-减少代码" tabindex="-1"><a class="header-anchor" href="#_4-使用jackson和-objectmapper-减少代码"><span>4. 使用Jackson和_ObjectMapper_减少代码</span></a></h2><p>有许多解决方案可以将JSON转换为POJO以及反之。但是，Jackson在像Jersey这样的项目和其他JAX-RS实现中被广泛使用。让我们将我们需要的依赖项添加到我们的_pom.xml_：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`com.fasterxml.jackson.core\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`jackson-databind\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\`2.13.3\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\`
\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>有了这个，我们不仅可以毫不费力地从URL读取JSON，而且同时还可以将其转换为POJO。</p><h3 id="_4-1-反序列化为通用对象" tabindex="-1"><a class="header-anchor" href="#_4-1-反序列化为通用对象"><span>4.1. 反序列化为通用对象</span></a></h3><p>Jackson中大部分动作来自_ObjectMapper_。_ObjectMapper_最常见的场景是给它一个_String_输入并得到一个对象。幸运的是，_ObjectMapper_也可以直接从互联网URL读取输入：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">JsonNode</span> <span class="token function">get</span><span class="token punctuation">(</span><span class="token class-name">URL</span> url<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">ObjectMapper</span> mapper <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ObjectMapper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> mapper<span class="token punctuation">.</span><span class="token function">readTree</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用_readTree()<em>，我们得到一个_JsonNode</em>，这是一个类似树形结构的对象。我们使用它的_get()_方法读取属性：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>json<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;propertyName&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>因此，如果我们不想的话，我们不需要将我们的响应映射到特定类。</p><h3 id="_4-2-反序列化为自定义类" tabindex="-1"><a class="header-anchor" href="#_4-2-反序列化为自定义类"><span>4.2. 反序列化为自定义类</span></a></h3><p>但是，对于更复杂的对象，创建一个表示我们期望的JSON结构的类是有帮助的。<strong>我们可以使用泛型来创建我们的方法的一个版本，使用_readValue()_将响应映射到我们想要的任何类</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> \`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span>\`\` <span class="token class-name">T</span> <span class="token function">get</span><span class="token punctuation">(</span><span class="token class-name">URL</span> url<span class="token punctuation">,</span> <span class="token class-name">Class</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span>\`\` type<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">ObjectMapper</span> mapper <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ObjectMapper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> mapper<span class="token punctuation">.</span><span class="token function">readValue</span><span class="token punctuation">(</span>url<span class="token punctuation">,</span> type<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，只要我们的对象属性和结构匹配，我们就可以得到一个新实例，用JSON响应中的值填充。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们学习了如何向URL发出请求并获得JSON字符串。然后，我们使用了一些库来简化我们的代码。<strong>最后，我们在几行代码中读取了JSON响应，同时将其映射到POJO。</strong></p><p>而且，一如既往，源代码可以在GitHub上找到。</p>`,29),o=[p];function c(l,i){return s(),a("div",null,o)}const k=n(e,[["render",c],["__file","2024-07-15-Reading JSON From a URL in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-15/2024-07-15-Reading%20JSON%20From%20a%20URL%20in%20Java.html","title":"在Java中从URL读取JSON数据","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","JSON"],"tag":["Java","JSON","URL","HTTP","HttpClient","Jackson","ObjectMapper"],"head":[["meta",{"name":"keywords","content":"Java, JSON, URL, HTTP, HttpClient, Jackson, ObjectMapper"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-15/2024-07-15-Reading%20JSON%20From%20a%20URL%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Java中从URL读取JSON数据"}],["meta",{"property":"og:description","content":"在Java中从URL读取JSON数据 1. 引言 在本快速教程中，我们将创建能够从任何URL读取JSON数据的方法。我们将从使用Java核心类开始，然后使用一些库来简化我们的代码。 2. 使用Java核心类 在Java中从URL读取数据的最简单方法之一是使用_URL_类。要使用它，我们对_URL_打开一个输入流，创建一个输入流读取器，然后读取所有字符。..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-16T00:05:52.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"JSON"}],["meta",{"property":"article:tag","content":"URL"}],["meta",{"property":"article:tag","content":"HTTP"}],["meta",{"property":"article:tag","content":"HttpClient"}],["meta",{"property":"article:tag","content":"Jackson"}],["meta",{"property":"article:tag","content":"ObjectMapper"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-16T00:05:52.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Java中从URL读取JSON数据\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-16T00:05:52.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Java中从URL读取JSON数据 1. 引言 在本快速教程中，我们将创建能够从任何URL读取JSON数据的方法。我们将从使用Java核心类开始，然后使用一些库来简化我们的代码。 2. 使用Java核心类 在Java中从URL读取数据的最简单方法之一是使用_URL_类。要使用它，我们对_URL_打开一个输入流，创建一个输入流读取器，然后读取所有字符。..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 使用Java核心类","slug":"_2-使用java核心类","link":"#_2-使用java核心类","children":[]},{"level":2,"title":"3. 使用commons-io和org.json","slug":"_3-使用commons-io和org-json","link":"#_3-使用commons-io和org-json","children":[]},{"level":2,"title":"4. 使用Jackson和_ObjectMapper_减少代码","slug":"_4-使用jackson和-objectmapper-减少代码","link":"#_4-使用jackson和-objectmapper-减少代码","children":[{"level":3,"title":"4.1. 反序列化为通用对象","slug":"_4-1-反序列化为通用对象","link":"#_4-1-反序列化为通用对象","children":[]},{"level":3,"title":"4.2. 反序列化为自定义类","slug":"_4-2-反序列化为自定义类","link":"#_4-2-反序列化为自定义类","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1721088352000,"updatedTime":1721088352000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.18,"words":953},"filePathRelative":"posts/baeldung/2024-07-15/2024-07-15-Reading JSON From a URL in Java.md","localizedDate":"2022年4月1日","excerpt":"\\n<h2>1. 引言</h2>\\n<p>在本快速教程中，我们将创建能够从任何URL读取JSON数据的方法。我们将从使用Java核心类开始，然后使用一些库来简化我们的代码。</p>\\n<h2>2. 使用Java核心类</h2>\\n<p>在Java中从URL读取数据的最简单方法之一是使用_URL_类。要使用它，我们对_URL_打开一个输入流，创建一个输入流读取器，然后读取所有字符。我们将这些字符追加到一个_StringBuilder_，然后将其作为_String_返回：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">static</span> <span class=\\"token class-name\\">String</span> <span class=\\"token function\\">stream</span><span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">URL</span> url<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">try</span> <span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">InputStream</span> input <span class=\\"token operator\\">=</span> url<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">openStream</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token class-name\\">InputStreamReader</span> isr <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">InputStreamReader</span><span class=\\"token punctuation\\">(</span>input<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token class-name\\">BufferedReader</span> reader <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">BufferedReader</span><span class=\\"token punctuation\\">(</span>isr<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token class-name\\">StringBuilder</span> json <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">StringBuilder</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token keyword\\">int</span> c<span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token keyword\\">while</span> <span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">(</span>c <span class=\\"token operator\\">=</span> reader<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">read</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">!=</span> <span class=\\"token operator\\">-</span><span class=\\"token number\\">1</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n            json<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">append</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">char</span><span class=\\"token punctuation\\">)</span> c<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token punctuation\\">}</span>\\n        <span class=\\"token keyword\\">return</span> json<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">toString</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{k as comp,d as data};
