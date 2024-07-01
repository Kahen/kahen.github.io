import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as e}from"./app-BEmnZ9jQ.js";const t={},p=e(`<h1 id="使用静态方法代替已弃用的jsonparser进行java-json解析" tabindex="-1"><a class="header-anchor" href="#使用静态方法代替已弃用的jsonparser进行java-json解析"><span>使用静态方法代替已弃用的JsonParser进行Java JSON解析</span></a></h1><p>高效地解析JSON是Java编程中数据操作和通信的最重要任务之一。Gson库提供了多功能的_JsonParser_类来简化转换过程。此外，值得注意的是这个类已经被弃用，消除了实例化的需求。相反，我们可以利用提供的静态方法来进行转换过程。</p><p>在本教程中，我们将深入探讨如何使用静态方法代替已弃用的_JsonParser_进行高效的Java JSON解析。</p><p>以下是使用已弃用的_JsonParser_解析JSON字符串的示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> jsonString <span class="token operator">=</span> <span class="token string">&quot;{\\&quot;name\\&quot;: \\&quot;John\\&quot;, \\&quot;age\\&quot;:30, \\&quot;city\\&quot;:\\&quot;New York\\&quot;}&quot;</span><span class="token punctuation">;</span>
<span class="token class-name">JsonObject</span> jsonObject <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">JsonParser</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>jsonString<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getAsJsonObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>已弃用的_JsonParser_实例可能仍然可以工作，但鼓励开发人员采用新的和改进的做法。</p><h3 id="_3-采用静态方法" tabindex="-1"><a class="header-anchor" href="#_3-采用静态方法"><span>3. 采用静态方法</span></a></h3><p>Gson库提供了静态方法作为弃用方法的替代品。此外，这是一种更优雅、更易于理解的JSON解析方式。</p><p>让我们探索推荐的静态方法：</p><h4 id="_3-1-从-string-解析" tabindex="-1"><a class="header-anchor" href="#_3-1-从-string-解析"><span>3.1. 从_String_解析</span></a></h4><p>我们可以直接使用_parseString()<em>静态方法将JSON字符串解析为_JsonObject</em>，而无需使用已弃用的_JsonParser_实例。</p><p>首先，让我们设置一个描述与人员相关的数据的JSON字符串，并使用给定的键如_name_、<em>age_和_city_读取相关的_JsonObject</em>，这是_DeprecatedJsonParserUnitTest_类构造函数的一部分：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> jsonString <span class="token operator">=</span> <span class="token string">&quot;{\\&quot;name\\&quot;: \\&quot;John\\&quot;, \\&quot;age\\&quot;:30, \\&quot;city\\&quot;:\\&quot;New York\\&quot;}&quot;</span><span class="token punctuation">;</span>
<span class="token class-name">JsonObject</span> expectedJsonObject <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">JsonObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">DeprecatedJsonParserUnitTest</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    expectedJsonObject<span class="token punctuation">.</span><span class="token function">addProperty</span><span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;John&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    expectedJsonObject<span class="token punctuation">.</span><span class="token function">addProperty</span><span class="token punctuation">(</span><span class="token string">&quot;age&quot;</span><span class="token punctuation">,</span> <span class="token number">30</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    expectedJsonObject<span class="token punctuation">.</span><span class="token function">addProperty</span><span class="token punctuation">(</span><span class="token string">&quot;city&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;New York&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们直接将_jsonString_解析为_JsonObject_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenJsonString_whenUsingParseString_thenJsonObjectIsExpected</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">JsonObject</span> jsonObjectAlt <span class="token operator">=</span> <span class="token class-name">JsonParser</span><span class="token punctuation">.</span><span class="token function">parseString</span><span class="token punctuation">(</span>jsonString<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getAsJsonObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span>expectedJsonObject<span class="token punctuation">,</span> jsonObjectAlt<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个测试方法中，我们验证解析后的_jsonObjectAlt_是否与之前创建的_expectedJsonObject_匹配。</p><h4 id="_3-2-从-stringreader-解析" tabindex="-1"><a class="header-anchor" href="#_3-2-从-stringreader-解析"><span>3.2. 从_StringReader_解析</span></a></h4><p>有些情况下，获取的JSON数据来自_StringReader_。我们可以使用_parseReader()_静态方法获得相同的结果，而无需使用过时的组件：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenJsonString_whenUsingParseReader_thenJsonObjectIsExpected</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">StringReader</span> reader <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringReader</span><span class="token punctuation">(</span>jsonString<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">JsonObject</span> jsonObject <span class="token operator">=</span> <span class="token class-name">JsonParser</span><span class="token punctuation">.</span><span class="token function">parseReader</span><span class="token punctuation">(</span>reader<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getAsJsonObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span>expectedJsonObject<span class="token punctuation">,</span> jsonObject<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们初始化了一个名为_reader_的_StringReader_。然后，我们使用_JsonParser.parseReader()<em>方法将JSON数据解析为_JsonObject</em>。</p><h4 id="_3-3-从-jsonreader-解析" tabindex="-1"><a class="header-anchor" href="#_3-3-从-jsonreader-解析"><span>3.3. 从_JsonReader_解析</span></a></h4><p>当处理_JsonReader_时，_parseReader()_静态方法仍然是一个有效且现代的决策，避免了过时的构建。让我们来看一个例子：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenJsonReader_whenParseUsingJsonReader_thenJsonObjectIsExpected</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">JsonReader</span> jsonReader <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">JsonReader</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">StringReader</span><span class="token punctuation">(</span>jsonString<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">JsonObject</span> jsonObject <span class="token operator">=</span> <span class="token class-name">JsonParser</span><span class="token punctuation">.</span><span class="token function">parseReader</span><span class="token punctuation">(</span>jsonReader<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getAsJsonObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span>expectedJsonObject<span class="token punctuation">,</span> jsonObject<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的测试方法中，我们首先实例化了一个名为_jsonReader_的_JsonReader_，它包含了JSON字符串的内容。然后，我们使用_JsonParser.parseReader()<em>方法将这样的JSON数据解析为_JsonObject</em>。</p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>总之，<em>JsonParser_已被弃用，Gson类提供了优秀的替代静态方法，如_parseString()</em>、_parseReader()<em>和_parseJson()</em>。</p><p>如常，本文的完整代码示例可以在GitHub上找到。</p>`,27),o=[p];function c(i,r){return a(),s("div",null,o)}const d=n(t,[["render",c],["__file","2024-06-24-Using Static Methods Instead of Deprecated JsonParser.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-06-24/2024-06-24-Using%20Static%20Methods%20Instead%20of%20Deprecated%20JsonParser.html","title":"使用静态方法代替已弃用的JsonParser进行Java JSON解析","lang":"zh-CN","frontmatter":{"date":"2024-06-24T00:00:00.000Z","category":["Java","JSON"],"tag":["Gson","JsonParser"],"head":[["meta",{"name":"keywords","content":"Java, JSON, Gson, JsonParser, 静态方法"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-24/2024-06-24-Using%20Static%20Methods%20Instead%20of%20Deprecated%20JsonParser.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用静态方法代替已弃用的JsonParser进行Java JSON解析"}],["meta",{"property":"og:description","content":"使用静态方法代替已弃用的JsonParser进行Java JSON解析 高效地解析JSON是Java编程中数据操作和通信的最重要任务之一。Gson库提供了多功能的_JsonParser_类来简化转换过程。此外，值得注意的是这个类已经被弃用，消除了实例化的需求。相反，我们可以利用提供的静态方法来进行转换过程。 在本教程中，我们将深入探讨如何使用静态方法代..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-24T08:53:44.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Gson"}],["meta",{"property":"article:tag","content":"JsonParser"}],["meta",{"property":"article:published_time","content":"2024-06-24T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-24T08:53:44.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用静态方法代替已弃用的JsonParser进行Java JSON解析\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-24T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-24T08:53:44.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用静态方法代替已弃用的JsonParser进行Java JSON解析 高效地解析JSON是Java编程中数据操作和通信的最重要任务之一。Gson库提供了多功能的_JsonParser_类来简化转换过程。此外，值得注意的是这个类已经被弃用，消除了实例化的需求。相反，我们可以利用提供的静态方法来进行转换过程。 在本教程中，我们将深入探讨如何使用静态方法代..."},"headers":[{"level":3,"title":"3. 采用静态方法","slug":"_3-采用静态方法","link":"#_3-采用静态方法","children":[]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1719219224000,"updatedTime":1719219224000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.47,"words":740},"filePathRelative":"posts/baeldung/2024-06-24/2024-06-24-Using Static Methods Instead of Deprecated JsonParser.md","localizedDate":"2024年6月24日","excerpt":"\\n<p>高效地解析JSON是Java编程中数据操作和通信的最重要任务之一。Gson库提供了多功能的_JsonParser_类来简化转换过程。此外，值得注意的是这个类已经被弃用，消除了实例化的需求。相反，我们可以利用提供的静态方法来进行转换过程。</p>\\n<p>在本教程中，我们将深入探讨如何使用静态方法代替已弃用的_JsonParser_进行高效的Java JSON解析。</p>\\n<p>以下是使用已弃用的_JsonParser_解析JSON字符串的示例：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token class-name\\">String</span> jsonString <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\\"{\\\\\\"name\\\\\\": \\\\\\"John\\\\\\", \\\\\\"age\\\\\\":30, \\\\\\"city\\\\\\":\\\\\\"New York\\\\\\"}\\"</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token class-name\\">JsonObject</span> jsonObject <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">JsonParser</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">parse</span><span class=\\"token punctuation\\">(</span>jsonString<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">getAsJsonObject</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n</code></pre></div>","autoDesc":true}');export{d as comp,k as data};
