import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-CE5go3V-.js";const p={},e=t('<h1 id="将-json-数组转换为-java-列表-baeldung" tabindex="-1"><a class="header-anchor" href="#将-json-数组转换为-java-列表-baeldung"><span>将 JSON 数组转换为 Java 列表 | Baeldung</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>JSON 是一种流行的数据交换格式，用于在服务器和客户端之间传输数据。然而，在许多情况下，我们可能需要将 JSON 数组转换为 Java <em>List</em> 对象，以便进一步处理或数据操作。</p><p>在本教程中，我们将比较使用 Java 中两个流行的 JSON 库 - Gson 和 Jackson 来实现这种转换的不同方法。</p><h2 id="_2-使用-gson-库" tabindex="-1"><a class="header-anchor" href="#_2-使用-gson-库"><span>2. 使用 Gson 库</span></a></h2><p>Gson 是一个广泛使用的 JSON 库，用于将 Java 对象序列化和反序列化到 JSON。它提供了一个简单的方法来将 JSON 数组转换为 <em>List</em> 对象。</p><h3 id="_2-1-gson-maven-依赖" tabindex="-1"><a class="header-anchor" href="#_2-1-gson-maven-依赖"><span>2.1. Gson Maven 依赖</span></a></h3><p>我们需要将 Gson 库添加到项目依赖中：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>``com.google.code.gson``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>``gson``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>``2.10.1``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>``\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-将-json-数组转换为-java-list" tabindex="-1"><a class="header-anchor" href="#_2-2-将-json-数组转换为-java-list"><span>2.2. 将 JSON 数组转换为 Java <em>List</em></span></a></h3><p>在本节中，我们将讨论如何使用 Gson 将 JSON 数组转换为 <em>List</em>。</p><p>让我们考虑一个 JSON 数组的示例：</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">[</span>\n  <span class="token punctuation">{</span><span class="token property">&quot;id&quot;</span><span class="token operator">:</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token property">&quot;name&quot;</span><span class="token operator">:</span><span class="token string">&quot;Icecream&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;description&quot;</span><span class="token operator">:</span><span class="token string">&quot;Sweet and cold&quot;</span><span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">{</span><span class="token property">&quot;id&quot;</span><span class="token operator">:</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token property">&quot;name&quot;</span><span class="token operator">:</span><span class="token string">&quot;Apple&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;description&quot;</span><span class="token operator">:</span><span class="token string">&quot;Red and sweet&quot;</span><span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">{</span><span class="token property">&quot;id&quot;</span><span class="token operator">:</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token property">&quot;name&quot;</span><span class="token operator">:</span><span class="token string">&quot;Carrot&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;description&quot;</span><span class="token operator">:</span><span class="token string">&quot;Good for eyes&quot;</span><span class="token punctuation">}</span>\n<span class="token punctuation">]</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述 JSON 数组表示 <em>Product</em> 类的 <em>List</em>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Product</span> <span class="token punctuation">{</span>\n    <span class="token keyword">private</span> <span class="token keyword">int</span> id<span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token class-name">String</span> description<span class="token punctuation">;</span>\n\n    <span class="token keyword">public</span> <span class="token class-name">Product</span><span class="token punctuation">(</span><span class="token keyword">int</span> id<span class="token punctuation">,</span> <span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token class-name">String</span> description<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>id <span class="token operator">=</span> id<span class="token punctuation">;</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>description <span class="token operator">=</span> description<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n    <span class="token comment">// getter 和 setter</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在我们有了 JSON 数组，让我们尝试理解将其转换为 <em>List</em>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenUsingGsonLibrary_thenCompareTwoProducts</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">Gson</span> gson <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Gson</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">Type</span> listType <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">TypeToken</span>`<span class="token operator">&lt;</span><span class="token class-name">List</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Product</span><span class="token punctuation">&gt;</span></span>`````<span class="token operator">&gt;</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">.</span><span class="token function">getType</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token class-name">List</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Product</span><span class="token punctuation">&gt;</span></span>```` gsonList <span class="token operator">=</span> gson<span class="token punctuation">.</span><span class="token function">fromJson</span><span class="token punctuation">(</span>jsonArray<span class="token punctuation">,</span> listType<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">Assert</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> gsonList<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">Assert</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Sweet and cold&quot;</span><span class="token punctuation">,</span> gsonList<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getDescription</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">Assert</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Icecream&quot;</span><span class="token punctuation">,</span> gsonList<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先，我们需要创建 <em>Gson</em> 类的实例，它提供了 JSON 序列化和反序列化的方法。</p><p>我们可以使用 <em>TypeToken</em> 类来指定目标 <em>List</em> 的类型。在上面的例子中，我们定义了目标类型为 <em>List<code>&lt;Product&gt;</code></em>。</p><p>然后，我们使用 <em>Gson</em> 对象的 <em>fromJson()</em> 方法将 JSON 数组 <em>String</em> 转换为 <em>List</em>。</p><p>由于我们已经将 JSON 数组转换为 <em>List</em>，让我们也尝试分析断言。在断言中，我们正在比较 <em>String</em> JSON 数组中的特定字段，如 ID 或描述，与转换后的 <em>gsonList</em>，它表示 <em>Product</em> 类的 <em>List</em>。</p><h2 id="_3-使用-jackson-库" tabindex="-1"><a class="header-anchor" href="#_3-使用-jackson-库"><span>3. 使用 Jackson 库</span></a></h2><p>Jackson 是 Java 的另一个广泛使用的 JSON 库。在本节中，我们将讨论如何使用 Jackson 库将 JSON 数组转换为 <em>List</em>。</p><h3 id="_3-1-jackson-maven-依赖" tabindex="-1"><a class="header-anchor" href="#_3-1-jackson-maven-依赖"><span>3.1. Jackson Maven 依赖</span></a></h3><p>我们需要将下面的 Jackson 库添加到项目依赖中：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>``com.fasterxml.jackson.core``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>``jackson-databind``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>``2.15.2``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>``\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-将-json-数组转换为-java-list" tabindex="-1"><a class="header-anchor" href="#_3-2-将-json-数组转换为-java-list"><span>3.2. 将 JSON 数组转换为 Java <em>List</em></span></a></h3><p>在本节中，我们将讨论如何使用 Jackson 将 JSON 数组转换为 <em>List</em>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenUsingJacksonLibrary_thenCompareTwoProducts</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">JsonProcessingException</span> <span class="token punctuation">{</span>\n\n    <span class="token comment">// jsonArray 是上面示例中的相同 JSON 数组</span>\n    <span class="token class-name">ObjectMapper</span> objectMapper <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ObjectMapper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">TypeReference</span>`<span class="token operator">&lt;</span><span class="token class-name">List</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Product</span><span class="token punctuation">&gt;</span></span>`````<span class="token operator">&gt;</span> jacksonTypeReference <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">TypeReference</span>`<span class="token operator">&lt;</span><span class="token class-name">List</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Product</span><span class="token punctuation">&gt;</span></span>`````<span class="token operator">&gt;</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n    <span class="token class-name">List</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Product</span><span class="token punctuation">&gt;</span></span>```` jacksonList <span class="token operator">=</span> objectMapper<span class="token punctuation">.</span><span class="token function">readValue</span><span class="token punctuation">(</span>jsonArray<span class="token punctuation">,</span> jacksonTypeReference<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">Assert</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> jacksonList<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">Assert</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Sweet and cold&quot;</span><span class="token punctuation">,</span> jacksonList<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getDescription</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">Assert</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Icecream&quot;</span><span class="token punctuation">,</span> jacksonList<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们创建了 <em>ObjectMapper</em> 类的实例，它是 Jackson 库中用于数据操作的核心类。</p><p>我们可以使用 <em>TypeReference</em> 类来指定目标 <em>List</em> 的类型。在上面的例子中，我们定义了目标类型为 <em>List<code>&lt;Product&gt;</code></em>。</p><p>然后，我们使用 <em>ObjectMapper</em> 对象的 <em>readValue()</em> 方法将 JSON 数组 <em>String</em> 转换为 <em>List</em>。</p><p>与之前讨论的断言类似，最后我们比较 <em>String</em> JSON 数组中的特定字段与 <em>jacksonList</em> 对应字段。</p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们讨论了如何使用两个流行的库：Gson 和 Jackson 将 JSON 数组转换为 Java <em>List</em>。</p><p>Gson 提供了一种直接的方法，而 Jackson 提供了高级功能和高性能。选择 Gson 还是 Jackson 取决于具体的项目需求和偏好。</p><p>如往常一样，示例中使用的代码片段可以在 GitHub 上找到。</p>',37),o=[e];function c(l,i){return a(),s("div",null,o)}const r=n(p,[["render",c],["__file","2024-07-02-Convert JSON Array to Java List.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-02/2024-07-02-Convert%20JSON%20Array%20to%20Java%20List.html","title":"将 JSON 数组转换为 Java 列表 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-07-02T00:00:00.000Z","category":["Java","JSON"],"tag":["Gson","Jackson"],"head":[["meta",{"name":"keywords","content":"Java, JSON, List, Gson, Jackson"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-02/2024-07-02-Convert%20JSON%20Array%20to%20Java%20List.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"将 JSON 数组转换为 Java 列表 | Baeldung"}],["meta",{"property":"og:description","content":"将 JSON 数组转换为 Java 列表 | Baeldung 1. 引言 JSON 是一种流行的数据交换格式，用于在服务器和客户端之间传输数据。然而，在许多情况下，我们可能需要将 JSON 数组转换为 Java List 对象，以便进一步处理或数据操作。 在本教程中，我们将比较使用 Java 中两个流行的 JSON 库 - Gson 和 Jackso..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-02T07:54:28.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Gson"}],["meta",{"property":"article:tag","content":"Jackson"}],["meta",{"property":"article:published_time","content":"2024-07-02T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-02T07:54:28.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"将 JSON 数组转换为 Java 列表 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-02T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-02T07:54:28.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"将 JSON 数组转换为 Java 列表 | Baeldung 1. 引言 JSON 是一种流行的数据交换格式，用于在服务器和客户端之间传输数据。然而，在许多情况下，我们可能需要将 JSON 数组转换为 Java List 对象，以便进一步处理或数据操作。 在本教程中，我们将比较使用 Java 中两个流行的 JSON 库 - Gson 和 Jackso..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 使用 Gson 库","slug":"_2-使用-gson-库","link":"#_2-使用-gson-库","children":[{"level":3,"title":"2.1. Gson Maven 依赖","slug":"_2-1-gson-maven-依赖","link":"#_2-1-gson-maven-依赖","children":[]},{"level":3,"title":"2.2. 将 JSON 数组转换为 Java List","slug":"_2-2-将-json-数组转换为-java-list","link":"#_2-2-将-json-数组转换为-java-list","children":[]}]},{"level":2,"title":"3. 使用 Jackson 库","slug":"_3-使用-jackson-库","link":"#_3-使用-jackson-库","children":[{"level":3,"title":"3.1. Jackson Maven 依赖","slug":"_3-1-jackson-maven-依赖","link":"#_3-1-jackson-maven-依赖","children":[]},{"level":3,"title":"3.2. 将 JSON 数组转换为 Java List","slug":"_3-2-将-json-数组转换为-java-list","link":"#_3-2-将-json-数组转换为-java-list","children":[]}]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1719906868000,"updatedTime":1719906868000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.09,"words":928},"filePathRelative":"posts/baeldung/2024-07-02/2024-07-02-Convert JSON Array to Java List.md","localizedDate":"2024年7月2日","excerpt":"\\n<h2>1. 引言</h2>\\n<p>JSON 是一种流行的数据交换格式，用于在服务器和客户端之间传输数据。然而，在许多情况下，我们可能需要将 JSON 数组转换为 Java <em>List</em> 对象，以便进一步处理或数据操作。</p>\\n<p>在本教程中，我们将比较使用 Java 中两个流行的 JSON 库 - Gson 和 Jackson 来实现这种转换的不同方法。</p>\\n<h2>2. 使用 Gson 库</h2>\\n<p>Gson 是一个广泛使用的 JSON 库，用于将 Java 对象序列化和反序列化到 JSON。它提供了一个简单的方法来将 JSON 数组转换为 <em>List</em> 对象。</p>","autoDesc":true}');export{r as comp,d as data};
