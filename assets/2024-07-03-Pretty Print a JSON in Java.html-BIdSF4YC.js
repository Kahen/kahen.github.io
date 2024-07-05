import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-C4Y6naXm.js";const e={},p=t(`<hr><h1 id="java中美化json的打印" tabindex="-1"><a class="header-anchor" href="#java中美化json的打印"><span>Java中美化JSON的打印</span></a></h1><p>在本教程中，我们将深入了解在Java中格式化JSON数据以提高其可读性的过程。</p><p>通常，处理大型JSON对象时，理解和调试它们可能是一个艰巨的任务。因此，采用美化打印JSON对象的做法变得至关重要。</p><p>为了实现这一点，我们将利用Jackson和Gson库的功能，这些库提供了方便的方法来生成格式良好的JSON输出。</p><h3 id="_2-1-使用jackson按需美化打印json" tabindex="-1"><a class="header-anchor" href="#_2-1-使用jackson按需美化打印json"><span>2.1 使用Jackson按需美化打印JSON</span></a></h3><p>要实现按需美化打印JSON，我们可以利用<code>writeWithDefaultPrettyPrinter()</code>方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> uglyJsonString <span class="token operator">=</span> <span class="token string">&quot;{...}&quot;</span><span class="token punctuation">;</span> <span class="token comment">// 省略原始JSON字符串</span>

<span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">prettyPrintJsonUsingDefaultPrettyPrinter</span><span class="token punctuation">(</span><span class="token class-name">String</span> uglyJsonString<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">ObjectMapper</span> objectMapper <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ObjectMapper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Object</span> jsonObject <span class="token operator">=</span> objectMapper<span class="token punctuation">.</span><span class="token function">readValue</span><span class="token punctuation">(</span>uglyJsonString<span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> prettyJson <span class="token operator">=</span> objectMapper<span class="token punctuation">.</span><span class="token function">writerWithDefaultPrettyPrinter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">writeValueAsString</span><span class="token punctuation">(</span>jsonObject<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> prettyJson<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结果是格式良好的JSON对象：</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">&quot;one&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;AAA&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;two&quot;</span> <span class="token operator">:</span> <span class="token punctuation">[</span> <span class="token string">&quot;BBB&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;CCC&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token property">&quot;three&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;four&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;DDD&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;five&quot;</span> <span class="token operator">:</span> <span class="token punctuation">[</span> <span class="token string">&quot;EEE&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;FFF&quot;</span> <span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-全局美化打印json" tabindex="-1"><a class="header-anchor" href="#_2-2-全局美化打印json"><span>2.2 全局美化打印JSON</span></a></h3><p>通过全局启用<code>INDENT_OUTPUT</code>设置，我们可以生成格式良好的JSON字符串，进行美化打印。这确保了整个系统中的JSON输出将以一致的、可读的方式进行格式化。</p><p>让我们继续启用<code>INDENT_OUTPUT</code>设置：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">prettyPrintUsingGlobalSetting</span><span class="token punctuation">(</span><span class="token class-name">String</span> uglyJsonString<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">ObjectMapper</span> mapper <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ObjectMapper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">enable</span><span class="token punctuation">(</span><span class="token class-name">SerializationFeature</span><span class="token punctuation">.</span><span class="token constant">INDENT_OUTPUT</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Object</span> jsonObject <span class="token operator">=</span> mapper<span class="token punctuation">.</span><span class="token function">readValue</span><span class="token punctuation">(</span>uglyJsonString<span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> prettyJson <span class="token operator">=</span> mapper<span class="token punctuation">.</span><span class="token function">writeValueAsString</span><span class="token punctuation">(</span>jsonObject<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> prettyJson<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结果是格式良好的JSON对象：</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">&quot;one&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;AAA&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;two&quot;</span> <span class="token operator">:</span> <span class="token punctuation">[</span> <span class="token string">&quot;BBB&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;CCC&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token property">&quot;three&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;four&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;DDD&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;five&quot;</span> <span class="token operator">:</span> <span class="token punctuation">[</span> <span class="token string">&quot;EEE&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;FFF&quot;</span> <span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-使用gson美化打印json" tabindex="-1"><a class="header-anchor" href="#_3-使用gson美化打印json"><span>3. 使用Gson美化打印JSON</span></a></h3><p>首先添加Gson Maven依赖：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`com.google.code.gson\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`gson\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\`2.10.1\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\`
\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>要美化打印JSON，我们将使用<code>GsonBuilder</code>的<code>setPrettyPrinting()</code>方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">prettyPrintUsingGson</span><span class="token punctuation">(</span><span class="token class-name">String</span> uglyJson<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Gson</span> gson <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">GsonBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setPrettyPrinting</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">JsonElement</span> jsonElement <span class="token operator">=</span> <span class="token class-name">JsonParser</span><span class="token punctuation">.</span><span class="token function">parseString</span><span class="token punctuation">(</span>uglyJsonString<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> prettyJsonString <span class="token operator">=</span> gson<span class="token punctuation">.</span><span class="token function">toJson</span><span class="token punctuation">(</span>jsonElement<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> prettyJsonString<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结果是格式良好的JSON对象：</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">&quot;one&quot;</span><span class="token operator">:</span> <span class="token string">&quot;AAA&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;two&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token string">&quot;BBB&quot;</span><span class="token punctuation">,</span>
        <span class="token string">&quot;CCC&quot;</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token property">&quot;three&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;four&quot;</span><span class="token operator">:</span> <span class="token string">&quot;DDD&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;five&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token string">&quot;EEE&quot;</span><span class="token punctuation">,</span>
            <span class="token string">&quot;FFF&quot;</span>
        <span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们探讨了在Java中实现JSON美化打印的各种方法。</p><p>文章的源代码可以在GitHub上找到。</p>`,26),o=[p];function c(l,i){return a(),s("div",null,o)}const k=n(e,[["render",c],["__file","2024-07-03-Pretty Print a JSON in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-03/2024-07-03-Pretty%20Print%20a%20JSON%20in%20Java.html","title":"Java中美化JSON的打印","lang":"zh-CN","frontmatter":{"date":"2024-07-03T00:00:00.000Z","category":["Java","JSON"],"tag":["JSON格式化","Jackson","Gson"],"head":[["meta",{"name":"keywords","content":"Java, JSON, 格式化, Jackson, Gson"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-03/2024-07-03-Pretty%20Print%20a%20JSON%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中美化JSON的打印"}],["meta",{"property":"og:description","content":"Java中美化JSON的打印 在本教程中，我们将深入了解在Java中格式化JSON数据以提高其可读性的过程。 通常，处理大型JSON对象时，理解和调试它们可能是一个艰巨的任务。因此，采用美化打印JSON对象的做法变得至关重要。 为了实现这一点，我们将利用Jackson和Gson库的功能，这些库提供了方便的方法来生成格式良好的JSON输出。 2.1 使用..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-03T04:34:58.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"JSON格式化"}],["meta",{"property":"article:tag","content":"Jackson"}],["meta",{"property":"article:tag","content":"Gson"}],["meta",{"property":"article:published_time","content":"2024-07-03T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-03T04:34:58.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中美化JSON的打印\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-03T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-03T04:34:58.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中美化JSON的打印 在本教程中，我们将深入了解在Java中格式化JSON数据以提高其可读性的过程。 通常，处理大型JSON对象时，理解和调试它们可能是一个艰巨的任务。因此，采用美化打印JSON对象的做法变得至关重要。 为了实现这一点，我们将利用Jackson和Gson库的功能，这些库提供了方便的方法来生成格式良好的JSON输出。 2.1 使用..."},"headers":[{"level":3,"title":"2.1 使用Jackson按需美化打印JSON","slug":"_2-1-使用jackson按需美化打印json","link":"#_2-1-使用jackson按需美化打印json","children":[]},{"level":3,"title":"2.2 全局美化打印JSON","slug":"_2-2-全局美化打印json","link":"#_2-2-全局美化打印json","children":[]},{"level":3,"title":"3. 使用Gson美化打印JSON","slug":"_3-使用gson美化打印json","link":"#_3-使用gson美化打印json","children":[]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1719981298000,"updatedTime":1719981298000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":1.64,"words":492},"filePathRelative":"posts/baeldung/2024-07-03/2024-07-03-Pretty Print a JSON in Java.md","localizedDate":"2024年7月3日","excerpt":"<hr>\\n<h1>Java中美化JSON的打印</h1>\\n<p>在本教程中，我们将深入了解在Java中格式化JSON数据以提高其可读性的过程。</p>\\n<p>通常，处理大型JSON对象时，理解和调试它们可能是一个艰巨的任务。因此，采用美化打印JSON对象的做法变得至关重要。</p>\\n<p>为了实现这一点，我们将利用Jackson和Gson库的功能，这些库提供了方便的方法来生成格式良好的JSON输出。</p>\\n<h3>2.1 使用Jackson按需美化打印JSON</h3>\\n<p>要实现按需美化打印JSON，我们可以利用<code>writeWithDefaultPrettyPrinter()</code>方法：</p>","autoDesc":true}');export{k as comp,d as data};
