import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-ConjvFaO.js";const e={},p=t('<h1 id="如何检查json数组中特定键的值是否存在-baeldung" tabindex="-1"><a class="header-anchor" href="#如何检查json数组中特定键的值是否存在-baeldung"><span>如何检查JSON数组中特定键的值是否存在 | Baeldung</span></a></h1><p>本文教程将学习如何检查JSON数组中是否存在特定的键，以及该键是否具有特定的值。我们将使用Java处理JSON的两个最流行的库：Jackson和Gson。</p><h2 id="_2-设置" tabindex="-1"><a class="header-anchor" href="#_2-设置"><span>2. 设置</span></a></h2><p>首先，<strong>让我们创建一个JSON数组</strong>。我们将保持简单，创建一个具有单个键/值对的对象数组：</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code>String exampleJson = <span class="token string">&quot;[{\\&quot;color\\&quot;:\\&quot;red\\&quot;},{\\&quot;color\\&quot;:\\&quot;blue\\&quot;},{\\&quot;color\\&quot;:\\&quot;green\\&quot;}]&quot;</span>;\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>所以，数组中的每个对象都有相同的属性_color_和不同的值。在我们的示例中，我们将检查对于键_color_，值_green_是否存在。</p><h2 id="_3-使用jackson" tabindex="-1"><a class="header-anchor" href="#_3-使用jackson"><span>3. 使用Jackson</span></a></h2><p>要在项目中使用Jackson，我们需要将其导入到我们的_pom.xml_：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>``com.fasterxml.jackson.core``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>``jackson-databind``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>``2.15.2``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>``\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最新版本可在Maven仓库中找到。</p><p>现在让我们使用它来解决我们的问题：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">givenJsonArray_whenUsingJackson_thenDetectKeyInArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">JsonProcessingException</span> <span class="token punctuation">{</span>\n    <span class="token class-name">ObjectMapper</span> objectMapper <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ObjectMapper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">JsonNode</span> tree <span class="token operator">=</span> objectMapper<span class="token punctuation">.</span><span class="token function">readTree</span><span class="token punctuation">(</span>exampleJson<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token class-name">Stream</span>`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">JsonNode</span><span class="token punctuation">&gt;</span></span>` s <span class="token operator">=</span> <span class="token class-name">StreamSupport</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span>tree<span class="token punctuation">.</span><span class="token function">spliterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">boolean</span> result <span class="token operator">=</span> s<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>entry <span class="token operator">-&gt;</span> entry<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;color&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token class-name">Objects</span><span class="token operator">::</span><span class="token function">nonNull</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">anyMatch</span><span class="token punctuation">(</span>color <span class="token operator">-&gt;</span> <span class="token string">&quot;green&quot;</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>color<span class="token punctuation">.</span><span class="token function">asText</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">assertTrue</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>**我们的第一个目标是解析JSON。为此，我们使用了_ObjectMapper_。**我们使用了_readTree()<em>方法将我们的JSON_String_转换为_JsonNode</em>。</p><p>接下来，我们将_JsonNode_转换为_Stream_。我们使用_StreamSupport_类，它包含创建和使用_Stream_s的集合实用程序。我们在这里使用的具体实用程序是_stream()<em>方法，它接受一个_Spliterator_和一个_boolean_标志。该标志允许我们选择顺序和并行_Stream</em>。</p><p>之后，有了_Stream_，我们依次检查每个_JsonNode_。我们需要在这里稍微小心。我们没有确认我们的输入JSON有任何名为_color_的键。<strong>这可能导致在将值转换为_String_进行比较时出现_NullPointerException_。</strong></p><p>所以首先，我们尝试获取属性，然后过滤掉任何_null_s，这将发生在_JsonNode_没有名为_color_的键的情况下。一旦我们确信我们有了我们的值，我们可以调用_anyMatch()_。我们给它一个谓词，将每个值与我们选择的颜色_green_进行比较。</p><p><em>anyMatch()<em>方法返回_true_如果有匹配。因此，我们在测试结束时的断言显示，对于所选键_color</em>，有一个值等于_green</em>。</p><h2 id="_4-使用gson" tabindex="-1"><a class="header-anchor" href="#_4-使用gson"><span>4. 使用Gson</span></a></h2><p>接下来，<strong>我们将使用Gson库采用非常类似的方法</strong>。要在项目中使用Gson，我们需要将其导入到我们的_pom.xml_：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>``com.google.code.gson``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>``gson``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>``2.10.1``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>``\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最新版本可在Maven仓库中找到。</p><p>我们将应用与之前相同的计划，解析我们的JSON_String_，将其转换为_Stream_，并使用_anyMatch()_查找我们的值：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">givenJsonArray_whenUsingGson_thenDetectKeyInArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">Gson</span> gson <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Gson</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">JsonArray</span> parsed <span class="token operator">=</span> gson<span class="token punctuation">.</span><span class="token function">fromJson</span><span class="token punctuation">(</span>exampleJson<span class="token punctuation">,</span> <span class="token class-name">JsonArray</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token class-name">Stream</span>`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">JsonElement</span><span class="token punctuation">&gt;</span></span>` s <span class="token operator">=</span> <span class="token class-name">StreamSupport</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span>parsed<span class="token punctuation">.</span><span class="token function">spliterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">boolean</span> result <span class="token operator">=</span> s<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>entry <span class="token operator">-&gt;</span> entry<span class="token punctuation">.</span><span class="token function">getAsJsonObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;color&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token class-name">Objects</span><span class="token operator">::</span><span class="token function">nonNull</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">anyMatch</span><span class="token punctuation">(</span>color <span class="token operator">-&gt;</span> <span class="token string">&quot;green&quot;</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>color<span class="token punctuation">.</span><span class="token function">getAsString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">assertTrue</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先，我们使用_fromJson()<em>方法解析了_String</em>，得到了一个_JsonArray_。由于第二个参数，我们得到了_JsonArray_类型，我们可以指定我们想要将JSON解析为的类。</p><p>接下来，其余的应该看起来很熟悉。我们像以前一样使用_StreamSupport_实用程序来产生_JsonElement_s的_Stream_。唯一的其他变化是我们需要在我们的_JsonElement_上调用_getAsJsonObject()_。这使我们能够检索与_color_属性相关联的值，并将其与我们的_String_进行比较。</p><p>正如在这里再次看到的，匹配在_Stream_中成功找到。值得注意的是，我们采取了与之前相同的预防措施，以防止由于JSON中没有名为_color_的属性而可能发生的_NullPointerException_。如果我们能更确定哪些属性将可用，我们可以直接跳到_anyMatch()_步骤。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们看到了我们可以使用Jackson和Gson来检查JSON数组中是否存在选定属性的值。两种实现都是相似的。它们最终实现了解析JSON，将其转换为_Stream_，然后使用_Stream_实用程序来检查匹配的计划。一旦我们有了_Stream_，我们就可以使用任何比较方法来评估数组中的条目，这使得这是一个多功能的解决方案。</p><p>如往常一样，示例的完整代码可在GitHub上找到。</p>',29),o=[p];function c(l,i){return s(),a("div",null,o)}const k=n(e,[["render",c],["__file","2024-07-01-How to Check if a Value Exists in a JSON Array for a Particular Key.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-01/2024-07-01-How%20to%20Check%20if%20a%20Value%20Exists%20in%20a%20JSON%20Array%20for%20a%20Particular%20Key.html","title":"如何检查JSON数组中特定键的值是否存在 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","JSON"],"tag":["Jackson","Gson"],"head":[["meta",{"name":"keywords","content":"Java, JSON, Jackson, Gson, 检查数组中的键值对"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-01/2024-07-01-How%20to%20Check%20if%20a%20Value%20Exists%20in%20a%20JSON%20Array%20for%20a%20Particular%20Key.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"如何检查JSON数组中特定键的值是否存在 | Baeldung"}],["meta",{"property":"og:description","content":"如何检查JSON数组中特定键的值是否存在 | Baeldung 本文教程将学习如何检查JSON数组中是否存在特定的键，以及该键是否具有特定的值。我们将使用Java处理JSON的两个最流行的库：Jackson和Gson。 2. 设置 首先，让我们创建一个JSON数组。我们将保持简单，创建一个具有单个键/值对的对象数组： 所以，数组中的每个对象都有相同的属..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-01T12:52:10.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Jackson"}],["meta",{"property":"article:tag","content":"Gson"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-01T12:52:10.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"如何检查JSON数组中特定键的值是否存在 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-01T12:52:10.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"如何检查JSON数组中特定键的值是否存在 | Baeldung 本文教程将学习如何检查JSON数组中是否存在特定的键，以及该键是否具有特定的值。我们将使用Java处理JSON的两个最流行的库：Jackson和Gson。 2. 设置 首先，让我们创建一个JSON数组。我们将保持简单，创建一个具有单个键/值对的对象数组： 所以，数组中的每个对象都有相同的属..."},"headers":[{"level":2,"title":"2. 设置","slug":"_2-设置","link":"#_2-设置","children":[]},{"level":2,"title":"3. 使用Jackson","slug":"_3-使用jackson","link":"#_3-使用jackson","children":[]},{"level":2,"title":"4. 使用Gson","slug":"_4-使用gson","link":"#_4-使用gson","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1719838330000,"updatedTime":1719838330000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.7,"words":1110},"filePathRelative":"posts/baeldung/2024-07-01/2024-07-01-How to Check if a Value Exists in a JSON Array for a Particular Key.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>本文教程将学习如何检查JSON数组中是否存在特定的键，以及该键是否具有特定的值。我们将使用Java处理JSON的两个最流行的库：Jackson和Gson。</p>\\n<h2>2. 设置</h2>\\n<p>首先，<strong>让我们创建一个JSON数组</strong>。我们将保持简单，创建一个具有单个键/值对的对象数组：</p>\\n<div class=\\"language-json\\" data-ext=\\"json\\" data-title=\\"json\\"><pre class=\\"language-json\\"><code>String exampleJson = <span class=\\"token string\\">\\"[{\\\\\\"color\\\\\\":\\\\\\"red\\\\\\"},{\\\\\\"color\\\\\\":\\\\\\"blue\\\\\\"},{\\\\\\"color\\\\\\":\\\\\\"green\\\\\\"}]\\"</span>;\\n</code></pre></div>","autoDesc":true}');export{k as comp,d as data};
