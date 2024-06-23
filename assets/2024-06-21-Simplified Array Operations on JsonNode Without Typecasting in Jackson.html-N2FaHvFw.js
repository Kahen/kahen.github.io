import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-CPbsBEaw.js";const o={},e=t(`<h1 id="jackson中无需类型转换简化jsonnode数组操作" tabindex="-1"><a class="header-anchor" href="#jackson中无需类型转换简化jsonnode数组操作"><span>Jackson中无需类型转换简化JsonNode数组操作</span></a></h1><p>在Java中使用JSON（JavaScript对象标记）通常涉及到使用像Jackson这样的库，它提供了多种类来表示这种类型的数据，比如_JsonNode, ObjectNode,_ 和 <em>ArrayNode</em>。</p><p><strong>在本教程中，我们将</strong> <strong>探索不同的方法来简化对_JsonNode_的数组操作，而无需在Java中显式地将其转换为_ArrayNode_。</strong> 这在我们直接在代码中操作数据时是必要的。</p><p><em>JsonNode</em> 是Jackson库中的一个抽象类，它表示JSON树中的一个节点。它是所有节点的基类，并且能够存储不同类型的数据，包括对象、数组、字符串、数字、布尔值和null值。<strong><em>JsonNode</em> 实例是不可变的，这意味着我们不能在它们上面设置属性。</strong></p><p><em>ArrayNode</em> 是_JsonNode_的一个特定类型，它表示一个JSON数组。它扩展了_JsonNode_的功能，包括添加、删除和按索引访问数组元素的方法。</p><p>通过使用_JsonNode_方法，我们可以将其转换为_ArrayNode_而无需显式转换。这种方法在我们需要对JSON数组中的每个元素执行特定操作或验证时非常有用：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenJsonNode_whenUsingJsonNodeMethods_thenConvertToArrayNode</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">JsonProcessingException</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> count <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> json <span class="token operator">=</span> <span class="token string">&quot;{&#39;objects&#39;: [&#39;One&#39;, &#39;Two&#39;, &#39;Three&#39;]}&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">JsonNode</span> arrayNode <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ObjectMapper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">readTree</span><span class="token punctuation">(</span>json<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;objects&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertNotNull</span><span class="token punctuation">(</span>arrayNode<span class="token punctuation">,</span> <span class="token string">&quot;The &#39;objects&#39; array should not be null&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertTrue</span><span class="token punctuation">(</span>arrayNode<span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;The &#39;objects&#39; should be an array&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>arrayNode<span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">JsonNode</span> objNode <span class="token operator">:</span> arrayNode<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">assertNotNull</span><span class="token punctuation">(</span>objNode<span class="token punctuation">,</span> <span class="token string">&quot;Array element should not be null&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            count<span class="token operator">++</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> count<span class="token punctuation">,</span> <span class="token string">&quot;The &#39;objects&#39; array should have 3 elements&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种方法还确保我们在尝试遍历其元素之前，正在使用一个数组结构，这有助于防止与意外的JSON结构相关的潜在运行时错误。</p><p>在Jackson中，我们可以使用_createObjectNode()_方法创建一个JSON对象。同样，我们可以使用_ObjectMapper_类的_createArrayNode()_方法来创建一个JSON数组。<em>method createArrayNode()</em> 将返回一个_ArrayNode_类的引用：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenJsonNode_whenUsingCreateArrayNode_thenConvertToArrayNode</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
    <span class="token class-name">ObjectMapper</span> objectMapper <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ObjectMapper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">JsonNode</span> originalJsonNode <span class="token operator">=</span> objectMapper<span class="token punctuation">.</span><span class="token function">readTree</span><span class="token punctuation">(</span><span class="token string">&quot;{&#39;objects&#39;: [&#39;One&#39;, &#39;Two&#39;, &#39;Three&#39;]}&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">ArrayNode</span> arrayNode <span class="token operator">=</span> objectMapper<span class="token punctuation">.</span><span class="token function">createArrayNode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    originalJsonNode<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;objects&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">elements</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEachRemaining</span><span class="token punctuation">(</span>arrayNode<span class="token operator">::</span><span class="token function">add</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;[&#39;One&#39;,&#39;Two&#39;,&#39;Three&#39;]&quot;</span><span class="token punctuation">,</span> arrayNode<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种方法在我们需要将JSON结构的特定部分转换为_ArrayNode_而无需显式转换时非常有用。显式创建_ArrayNode_清楚地传达了我们正在使用一个_数组_，使代码更易于阅读和表达。</p><p><em>StreamSupport</em> 是一个实用类，它提供了静态方法来创建各种数据结构上的_Stream_ 和 <em>Spliterator</em>，包括集合、数组和专门的迭代器。字符串使用_ObjectMapper_反序列化为_JsonNode_对象。在这里，我们从_objects_数组的_Spliterator_创建一个_Stream_，并将元素收集到_List<code>&lt;JsonNode&gt;</code>_中：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenJsonNode_whenUsingStreamSupport_thenConvertToArrayNode</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> json <span class="token operator">=</span> <span class="token string">&quot;{&#39;objects&#39;: [&#39;One&#39;, &#39;Two&#39;, &#39;Three&#39;]}&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">JsonNode</span> obj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ObjectMapper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">readTree</span><span class="token punctuation">(</span>json<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">List</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">JsonNode</span><span class="token punctuation">&gt;</span></span>\`\`\` objects <span class="token operator">=</span> <span class="token class-name">StreamSupport</span>
      <span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span>obj<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;objects&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">spliterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> objects<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;The &#39;objects&#39; list should contain 3 elements&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">JsonNode</span> firstObject <span class="token operator">=</span> objects<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;One&quot;</span><span class="token punctuation">,</span> firstObject<span class="token punctuation">.</span><span class="token function">asText</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;The first element should be One&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当我们想要利用Java Streams以简洁和表达方式从JSON数组中提取和处理元素时，这种方法非常有用。</p><p>一个_Iterator_ 是我们可以遍历集合的多种方式之一。在这种方法中，我们使用迭代器遍历给定JSON结构中_objects_数组的元素：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenJsonNode_whenUsingIterator_thenConvertToArrayNode</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> json <span class="token operator">=</span> <span class="token string">&quot;{&#39;objects&#39;: [&#39;One&#39;, &#39;Two&#39;, &#39;Three&#39;]}&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">JsonNode</span> datasets <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ObjectMapper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">readTree</span><span class="token punctuation">(</span>json<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Iterator</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">JsonNode</span><span class="token punctuation">&gt;</span></span>\`\`\` iterator <span class="token operator">=</span> datasets<span class="token punctuation">.</span><span class="token function">withArray</span><span class="token punctuation">(</span><span class="token string">&quot;objects&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">elements</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">int</span> count <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>iterator<span class="token punctuation">.</span><span class="token function">hasNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">JsonNode</span> dataset <span class="token operator">=</span> iterator<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span>dataset<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot; &quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        count<span class="token operator">++</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> count<span class="token punctuation">,</span> <span class="token string">&quot;The &#39;objects&#39; list should contain 3 elements&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种方法通过直接遍历元素减少了整体复杂性。它为在迭代期间自定义处理JSON元素提供了一种直接的机制。</p><h3 id="结论" tabindex="-1"><a class="header-anchor" href="#结论"><span>结论</span></a></h3><p>在本教程中，我们探索了在Jackson中简化_JsonNode_数组操作的不同方法，而无需显式地将其类型转换为_ArrayNode_。</p><p>如常，源代码可在GitHub上找到。</p>`,20),p=[e];function c(i,l){return a(),s("div",null,p)}const k=n(o,[["render",c],["__file","2024-06-21-Simplified Array Operations on JsonNode Without Typecasting in Jackson.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-06-21/2024-06-21-Simplified%20Array%20Operations%20on%20JsonNode%20Without%20Typecasting%20in%20Jackson.html","title":"Jackson中无需类型转换简化JsonNode数组操作","lang":"zh-CN","frontmatter":{"date":"2024-06-21T00:00:00.000Z","category":["Java","Jackson"],"tag":["JsonNode","ArrayNode"],"head":[["meta",{"name":"keywords","content":"Jackson, JsonNode, ArrayNode, JSON操作, Java"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-21/2024-06-21-Simplified%20Array%20Operations%20on%20JsonNode%20Without%20Typecasting%20in%20Jackson.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Jackson中无需类型转换简化JsonNode数组操作"}],["meta",{"property":"og:description","content":"Jackson中无需类型转换简化JsonNode数组操作 在Java中使用JSON（JavaScript对象标记）通常涉及到使用像Jackson这样的库，它提供了多种类来表示这种类型的数据，比如_JsonNode, ObjectNode,_ 和 ArrayNode。 在本教程中，我们将 探索不同的方法来简化对_JsonNode_的数组操作，而无需在Ja..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T10:40:49.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"JsonNode"}],["meta",{"property":"article:tag","content":"ArrayNode"}],["meta",{"property":"article:published_time","content":"2024-06-21T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T10:40:49.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Jackson中无需类型转换简化JsonNode数组操作\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-21T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T10:40:49.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Jackson中无需类型转换简化JsonNode数组操作 在Java中使用JSON（JavaScript对象标记）通常涉及到使用像Jackson这样的库，它提供了多种类来表示这种类型的数据，比如_JsonNode, ObjectNode,_ 和 ArrayNode。 在本教程中，我们将 探索不同的方法来简化对_JsonNode_的数组操作，而无需在Ja..."},"headers":[{"level":3,"title":"结论","slug":"结论","link":"#结论","children":[]}],"git":{"createdTime":1718966449000,"updatedTime":1718966449000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.22,"words":965},"filePathRelative":"posts/baeldung/2024-06-21/2024-06-21-Simplified Array Operations on JsonNode Without Typecasting in Jackson.md","localizedDate":"2024年6月21日","excerpt":"\\n<p>在Java中使用JSON（JavaScript对象标记）通常涉及到使用像Jackson这样的库，它提供了多种类来表示这种类型的数据，比如_JsonNode, ObjectNode,_ 和 <em>ArrayNode</em>。</p>\\n<p><strong>在本教程中，我们将</strong> <strong>探索不同的方法来简化对_JsonNode_的数组操作，而无需在Java中显式地将其转换为_ArrayNode_。</strong> 这在我们直接在代码中操作数据时是必要的。</p>\\n<p><em>JsonNode</em> 是Jackson库中的一个抽象类，它表示JSON树中的一个节点。它是所有节点的基类，并且能够存储不同类型的数据，包括对象、数组、字符串、数字、布尔值和null值。<strong><em>JsonNode</em> 实例是不可变的，这意味着我们不能在它们上面设置属性。</strong></p>","autoDesc":true}');export{k as comp,d as data};
