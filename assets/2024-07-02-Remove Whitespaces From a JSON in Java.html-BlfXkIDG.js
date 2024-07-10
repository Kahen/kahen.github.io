import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-BmeLisJw.js";const p={},e=t('<h1 id="在java中从json移除空白符" tabindex="-1"><a class="header-anchor" href="#在java中从json移除空白符"><span>在Java中从JSON移除空白符</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>在本教程中，我们将探索在Java中从JSON数据中移除额外空白符以进行压缩的过程。</p><p>我们经常面临需要压缩提供的JSON数据以优化存储，或者需要移除额外的空白符以便我们可以轻松比较多个JSON对象的情况。</p><p>为了实现这一点，我们将利用Jackson和Gson库的功能，这将有助于从提供的JSON数据中移除空白符。</p><h2 id="_2-使用自定义逻辑移除空白符" tabindex="-1"><a class="header-anchor" href="#_2-使用自定义逻辑移除空白符"><span>2. 使用自定义逻辑移除空白符</span></a></h2><p>JSON数据通常使用冒号(“:”)来分隔键和值，使用逗号(“,”)来分隔键值对。考虑到JSON键被引号(‘”‘)包围，并且JSON字符串使用转义序列，<strong>我们可以实施一种逻辑，逐个读取字符并构建没有任何额外空白的JSON字符串。</strong></p><p>通过仔细处理字符，同时考虑引用部分和转义序列，我们可以确保一个干净且正确格式化的JSON输出：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">removeExtraWhiteSpaces</span><span class="token punctuation">(</span><span class="token class-name">String</span> jsonString<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">StringBuilder</span> result <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringBuilder</span><span class="token punctuation">(</span>json<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">boolean</span> inQuotes <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>\n    <span class="token keyword">boolean</span> escapeMode <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>\n    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">char</span> character <span class="token operator">:</span> json<span class="token punctuation">.</span><span class="token function">toCharArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">if</span> <span class="token punctuation">(</span>escapeMode<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            result<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span>character<span class="token punctuation">)</span><span class="token punctuation">;</span>\n            escapeMode <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>character <span class="token operator">==</span> <span class="token char">&#39;\\&quot;&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            inQuotes <span class="token operator">=</span> <span class="token operator">!</span>inQuotes<span class="token punctuation">;</span>\n            result<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span>character<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>character <span class="token operator">==</span> <span class="token char">&#39;\\\\&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            escapeMode <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>\n            result<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span>character<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>inQuotes <span class="token operator">&amp;&amp;</span> character <span class="token operator">==</span> <span class="token char">&#39; &#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token keyword">continue</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>\n            result<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span>character<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n    <span class="token keyword">return</span> result<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-使用jackson移除空白符" tabindex="-1"><a class="header-anchor" href="#_3-使用jackson移除空白符"><span>3. 使用Jackson移除空白符</span></a></h2><p>要使用Jackson移除空白符，让我们首先向_pom.xml_文件添加以下依赖项：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>``com.fasterxml.jackson.core``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>``jackson-databind``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>``2.15.2``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>``\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>强烈建议考虑使用Maven中央仓库中可用的最新版本的_jackson-databind_库。</p><p>要移除JSON字符串中的额外空白符，我们将使用_writeValueAsString(_)方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">removeExtraWhitespacesUsingJackson</span><span class="token punctuation">(</span><span class="token class-name">String</span> json<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">ObjectMapper</span> objectMapper <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ObjectMapper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">JsonNode</span> jsonNode <span class="token operator">=</span> objectMapper<span class="token punctuation">.</span><span class="token function">readTree</span><span class="token punctuation">(</span>json<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">return</span> objectMapper<span class="token punctuation">.</span><span class="token function">writeValueAsString</span><span class="token punctuation">(</span>jsonNode<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-使用gson移除空白符" tabindex="-1"><a class="header-anchor" href="#_4-使用gson移除空白符"><span>4. 使用Gson移除空白符</span></a></h2><p>首先让我们添加Gson Maven依赖项：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>``com.google.code.gson``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>``gson``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>``2.10.1``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>``\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们鼓励您始终使用Maven中央仓库中最新版本的_gson_库。</p><p><strong>要从JSON字符串中移除空白符，我们需要使用自定义_JsonSerializer。</strong></p><p>我们将使用自定义_StringSerializer_来修剪JSON字符串值中的空白符。<strong>通过将此序列化器注册到_GsonBuilder_，Gson将为字符串应用自定义序列化逻辑，有效地移除值中的空白符，同时保持JSON结构的完整性</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">removeWhitespacesUsingGson</span><span class="token punctuation">(</span><span class="token class-name">String</span> json<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">Gson</span> gson <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">GsonBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">registerTypeAdapter</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">StringSerializer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">JsonElement</span> jsonElement <span class="token operator">=</span> gson<span class="token punctuation">.</span><span class="token function">fromJson</span><span class="token punctuation">(</span>json<span class="token punctuation">,</span> <span class="token class-name">JsonElement</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">return</span> gson<span class="token punctuation">.</span><span class="token function">toJson</span><span class="token punctuation">(</span>jsonElement<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">class</span> <span class="token class-name">StringSerializer</span> <span class="token keyword">implements</span> <span class="token class-name">JsonSerializer</span>`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>` <span class="token punctuation">{</span>\n    <span class="token annotation punctuation">@Override</span>\n    <span class="token keyword">public</span> <span class="token class-name">JsonElement</span> <span class="token function">serialize</span><span class="token punctuation">(</span><span class="token class-name">String</span> src<span class="token punctuation">,</span> <span class="token class-name">Type</span> typeOfSrc<span class="token punctuation">,</span> <span class="token class-name">JsonSerializationContext</span> context<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">JsonPrimitive</span><span class="token punctuation">(</span>src<span class="token punctuation">.</span><span class="token function">trim</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们探讨了在Java中从JSON字符串中移除额外空白符的各种方法。</p><p>文章的源代码可在GitHub上找到。</p>',25),o=[e];function c(l,i){return s(),a("div",null,o)}const k=n(p,[["render",c],["__file","2024-07-02-Remove Whitespaces From a JSON in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-02/2024-07-02-Remove%20Whitespaces%20From%20a%20JSON%20in%20Java.html","title":"在Java中从JSON移除空白符","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","JSON"],"tag":["JSON Minify","Whitespace Removal"],"head":[["meta",{"name":"keywords","content":"JSON, Java, Minify, Whitespace Removal"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-02/2024-07-02-Remove%20Whitespaces%20From%20a%20JSON%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Java中从JSON移除空白符"}],["meta",{"property":"og:description","content":"在Java中从JSON移除空白符 1. 引言 在本教程中，我们将探索在Java中从JSON数据中移除额外空白符以进行压缩的过程。 我们经常面临需要压缩提供的JSON数据以优化存储，或者需要移除额外的空白符以便我们可以轻松比较多个JSON对象的情况。 为了实现这一点，我们将利用Jackson和Gson库的功能，这将有助于从提供的JSON数据中移除空白符。..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-02T17:33:59.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"JSON Minify"}],["meta",{"property":"article:tag","content":"Whitespace Removal"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-02T17:33:59.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Java中从JSON移除空白符\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-02T17:33:59.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Java中从JSON移除空白符 1. 引言 在本教程中，我们将探索在Java中从JSON数据中移除额外空白符以进行压缩的过程。 我们经常面临需要压缩提供的JSON数据以优化存储，或者需要移除额外的空白符以便我们可以轻松比较多个JSON对象的情况。 为了实现这一点，我们将利用Jackson和Gson库的功能，这将有助于从提供的JSON数据中移除空白符。..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 使用自定义逻辑移除空白符","slug":"_2-使用自定义逻辑移除空白符","link":"#_2-使用自定义逻辑移除空白符","children":[]},{"level":2,"title":"3. 使用Jackson移除空白符","slug":"_3-使用jackson移除空白符","link":"#_3-使用jackson移除空白符","children":[]},{"level":2,"title":"4. 使用Gson移除空白符","slug":"_4-使用gson移除空白符","link":"#_4-使用gson移除空白符","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1719941639000,"updatedTime":1719941639000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.29,"words":688},"filePathRelative":"posts/baeldung/2024-07-02/2024-07-02-Remove Whitespaces From a JSON in Java.md","localizedDate":"2022年4月1日","excerpt":"\\n<h2>1. 引言</h2>\\n<p>在本教程中，我们将探索在Java中从JSON数据中移除额外空白符以进行压缩的过程。</p>\\n<p>我们经常面临需要压缩提供的JSON数据以优化存储，或者需要移除额外的空白符以便我们可以轻松比较多个JSON对象的情况。</p>\\n<p>为了实现这一点，我们将利用Jackson和Gson库的功能，这将有助于从提供的JSON数据中移除空白符。</p>\\n<h2>2. 使用自定义逻辑移除空白符</h2>\\n<p>JSON数据通常使用冒号(“:”)来分隔键和值，使用逗号(“,”)来分隔键值对。考虑到JSON键被引号(‘”‘)包围，并且JSON字符串使用转义序列，<strong>我们可以实施一种逻辑，逐个读取字符并构建没有任何额外空白的JSON字符串。</strong></p>","autoDesc":true}');export{k as comp,d as data};
