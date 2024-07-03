import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-B5SPsEv6.js";const e={},o=t(`<h1 id="如何在java中将jsonnode转换为objectnode" tabindex="-1"><a class="header-anchor" href="#如何在java中将jsonnode转换为objectnode"><span>如何在Java中将JsonNode转换为ObjectNode</span></a></h1><p>在Java中使用JSON（JavaScript对象表示法）通常涉及到使用像Jackson这样的库，它提供了各种类来表示这种类型的数据，例如_JsonNode_和_ObjectNode_。</p><p><strong>在本教程中，我们将探索如何在Java中将_JsonNode_转换为_ObjectNode_。</strong> 这是当我们需要在代码中直接操作数据时的一个必要步骤。</p><h3 id="_2-理解-jsonnode-和-objectnode" tabindex="-1"><a class="header-anchor" href="#_2-理解-jsonnode-和-objectnode"><span>2. 理解_JsonNode_和_ObjectNode_</span></a></h3><p>_JsonNode_是Jackson库中的一个抽象类，它代表JSON树中的一个节点。它是所有节点的基类，并且能够存储不同类型的数据，包括对象、数组、字符串、数字、布尔值和null值。<strong>_JsonNode_实例是不可变的，这意味着你不能在它们上设置属性。</strong></p><p>_ObjectNode_可以定义为_JsonNode_的一个可变子类，特别代表一个对象节点。它通过提供添加、删除和修改对象中键值对的方法，允许操作这些类型的对象。除了操作方法外，<em>ObjectNode_还提供了方便的访问器，如_asInt</em>、<em>asText_和_asBoolean</em>，以轻松地从对象节点中检索相应的数据类型。</p><h3 id="_3-导入jackson" tabindex="-1"><a class="header-anchor" href="#_3-导入jackson"><span>3. 导入Jackson</span></a></h3><p>Jackson库提供了广泛的功能，以高效地读取、写入和操作JSON数据。</p><p>在使用Jackson之前，有必要在我们的项目_pom.xml_中添加必要的依赖项：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`com.fasterxml.jackson.dataformat\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`jackson-dataformat-xml\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\`2.14.2\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\`
\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-执行转换" tabindex="-1"><a class="header-anchor" href="#_4-执行转换"><span>4. 执行转换</span></a></h3><p>假设我们定义一个简单的JSON对象：</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
   <span class="token property">&quot;name&quot;</span><span class="token operator">:</span><span class="token string">&quot;John&quot;</span><span class="token punctuation">,</span>
   <span class="token property">&quot;gender&quot;</span><span class="token operator">:</span><span class="token string">&quot;male&quot;</span><span class="token punctuation">,</span>
   <span class="token property">&quot;company&quot;</span><span class="token operator">:</span><span class="token string">&quot;Baeldung&quot;</span><span class="token punctuation">,</span>
   <span class="token property">&quot;isEmployee&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
   <span class="token property">&quot;age&quot;</span><span class="token operator">:</span> <span class="token number">30</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们将在代码中将其声明为一个_String_值：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">String</span> jsonString <span class="token operator">=</span> <span class="token string">&quot;{\\&quot;name\\&quot;: \\&quot;John\\&quot;, \\&quot;gender\\&quot;: \\&quot;male\\&quot;, \\&quot;company\\&quot;: \\&quot;Baeldung\\&quot;, \\&quot;isEmployee\\&quot;: true, \\&quot;age\\&quot;: 30}&quot;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>首先，我们使用Jackson的_ObjectMapper_类将这个字符串转换为_JsonNode_，使用_ObjectMapper.readTree()<em>方法。之后，我们可以简单地将其转换为_ObjectNode</em>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">ObjectMapper</span> objectMapper <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ObjectMapper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">JsonNode</span> jsonNode <span class="token operator">=</span> objectMapper<span class="token punctuation">.</span><span class="token function">readTree</span><span class="token punctuation">(</span>jsonString<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">ObjectNode</span> objectNode <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">ObjectNode</span><span class="token punctuation">)</span> jsonNode<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，让我们通过一系列断言来执行验证，检查从_JsonNode_转换到_ObjectNode_后数据的完整性：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;John&quot;</span><span class="token punctuation">,</span> objectNode<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">asText</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;male&quot;</span><span class="token punctuation">,</span> objectNode<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;gender&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">asText</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Baeldung&quot;</span><span class="token punctuation">,</span> objectNode<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;company&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">asText</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertTrue</span><span class="token punctuation">(</span>objectNode<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;isEmployee&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">asBoolean</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">30</span><span class="token punctuation">,</span> objectNode<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;age&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">asInt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h3><p>将_JsonNode_转换为_ObjectNode_的过程在使用Jackson库导航和与JSON数据交互时起着关键作用。</p><p>在本文中，我们展示了如何通过Jackson的_ObjectMapper_类执行这种转换。</p><p>如常，附带的源代码可以在GitHub上找到。</p>`,23),p=[o];function c(l,u){return s(),a("div",null,p)}const r=n(e,[["render",c],["__file","2024-06-26-How to Convert JsonNode to ObjectNode.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-06-26/2024-06-26-How%20to%20Convert%20JsonNode%20to%20ObjectNode.html","title":"如何在Java中将JsonNode转换为ObjectNode","lang":"zh-CN","frontmatter":{"date":"2024-06-26T00:00:00.000Z","category":["Java","Jackson"],"tag":["JsonNode","ObjectNode"],"head":[["meta",{"name":"keywords","content":"Java, Jackson, JsonNode, ObjectNode, JSON转换"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-26/2024-06-26-How%20to%20Convert%20JsonNode%20to%20ObjectNode.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"如何在Java中将JsonNode转换为ObjectNode"}],["meta",{"property":"og:description","content":"如何在Java中将JsonNode转换为ObjectNode 在Java中使用JSON（JavaScript对象表示法）通常涉及到使用像Jackson这样的库，它提供了各种类来表示这种类型的数据，例如_JsonNode_和_ObjectNode_。 在本教程中，我们将探索如何在Java中将_JsonNode_转换为_ObjectNode_。 这是当我们..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-26T13:29:37.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"JsonNode"}],["meta",{"property":"article:tag","content":"ObjectNode"}],["meta",{"property":"article:published_time","content":"2024-06-26T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-26T13:29:37.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"如何在Java中将JsonNode转换为ObjectNode\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-26T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-26T13:29:37.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"如何在Java中将JsonNode转换为ObjectNode 在Java中使用JSON（JavaScript对象表示法）通常涉及到使用像Jackson这样的库，它提供了各种类来表示这种类型的数据，例如_JsonNode_和_ObjectNode_。 在本教程中，我们将探索如何在Java中将_JsonNode_转换为_ObjectNode_。 这是当我们..."},"headers":[{"level":3,"title":"2. 理解_JsonNode_和_ObjectNode_","slug":"_2-理解-jsonnode-和-objectnode","link":"#_2-理解-jsonnode-和-objectnode","children":[]},{"level":3,"title":"3. 导入Jackson","slug":"_3-导入jackson","link":"#_3-导入jackson","children":[]},{"level":3,"title":"4. 执行转换","slug":"_4-执行转换","link":"#_4-执行转换","children":[]},{"level":3,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1719408577000,"updatedTime":1719408577000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.08,"words":624},"filePathRelative":"posts/baeldung/2024-06-26/2024-06-26-How to Convert JsonNode to ObjectNode.md","localizedDate":"2024年6月26日","excerpt":"\\n<p>在Java中使用JSON（JavaScript对象表示法）通常涉及到使用像Jackson这样的库，它提供了各种类来表示这种类型的数据，例如_JsonNode_和_ObjectNode_。</p>\\n<p><strong>在本教程中，我们将探索如何在Java中将_JsonNode_转换为_ObjectNode_。</strong> 这是当我们需要在代码中直接操作数据时的一个必要步骤。</p>\\n<h3>2. 理解_JsonNode_和_ObjectNode_</h3>\\n<p>_JsonNode_是Jackson库中的一个抽象类，它代表JSON树中的一个节点。它是所有节点的基类，并且能够存储不同类型的数据，包括对象、数组、字符串、数字、布尔值和null值。<strong>_JsonNode_实例是不可变的，这意味着你不能在它们上设置属性。</strong></p>","autoDesc":true}');export{r as comp,k as data};
