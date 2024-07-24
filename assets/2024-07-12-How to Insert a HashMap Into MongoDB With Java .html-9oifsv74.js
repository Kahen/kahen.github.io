import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-BkL9UgS7.js";const p={},e=t(`<h1 id="如何使用java将hashmap插入mongodb" tabindex="-1"><a class="header-anchor" href="#如何使用java将hashmap插入mongodb"><span>如何使用Java将HashMap插入MongoDB？</span></a></h1><p>在这个快速教程中，我们将学习如何在Java中使用HashMap与MongoDB进行交互。MongoDB拥有一个对map友好的API，而Spring Data MongoDB使得使用map或map列表的工作变得更加直接。</p><h2 id="_2-设置我们的场景" tabindex="-1"><a class="header-anchor" href="#_2-设置我们的场景"><span>2. 设置我们的场景</span></a></h2><p>Spring Data MongoDB带有MongoTemplate，它有许多重载版本的insert()方法，允许我们将map插入到我们的集合中。MongoDB以JSON格式表示一个文档。因此，我们可以用Java中的Map<code>&lt;String, Object&gt;</code>来复制它。</p><p>我们将使用MongoTemplate和简单的可重用map来实现我们的用例。首先，创建map引用并注入MongoTemplate：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">MongoDbHashMapIntegrationTest</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Map</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span>\`\`\`\` <span class="token constant">MAP</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">MongoTemplate</span> mongo<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，我们将map初始化为几个不同类型的条目：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@BeforeAll</span>
<span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token constant">MAP</span><span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Document A&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token constant">MAP</span><span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;number&quot;</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token constant">MAP</span><span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;dynamic&quot;</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们使用@BeforeAll标记它，以便我们所有的测试都可以使用它。</p><h2 id="_3-直接插入单个map" tabindex="-1"><a class="header-anchor" href="#_3-直接插入单个map"><span>3. 直接插入单个Map</span></a></h2><p>首先，我们调用mongo.insert()并选择一个集合来放置它：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenUsingMap_thenInsertSucceeds</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Map</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span>\`\`\`\` saved <span class="token operator">=</span> mongo<span class="token punctuation">.</span><span class="token function">insert</span><span class="token punctuation">(</span><span class="token constant">MAP</span><span class="token punctuation">,</span> <span class="token string">&quot;map-collection&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token function">assertNotNull</span><span class="token punctuation">(</span>saved<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;_id&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>不需要特定的包装器。插入后，我们的map变成了我们集合中的一个单独的JSON文档。最重要的是，我们可以检查MongoDB生成的_id属性的存在，确保它被正确处理。</p><h2 id="_4-直接批量插入map" tabindex="-1"><a class="header-anchor" href="#_4-直接批量插入map"><span>4. 直接批量插入Map</span></a></h2><p>我们也可以插入Map的集合。每次插入都会成为一个不同的文档。另外，为了避免插入重复项，我们将使用一个Set。</p><p><strong>让我们将我们之前创建的map以及一个新的map添加到我们的set中：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenMapSet_thenInsertSucceeds</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Set</span><span class="token operator">&lt;</span><span class="token class-name">Map</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span>\`\`\`\`<span class="token operator">&gt;</span> set <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashSet</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token class-name">Map</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span>\`\`\`\` otherMap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    otherMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Other Document&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    otherMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;number&quot;</span><span class="token punctuation">,</span> <span class="token number">22</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    set<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token constant">MAP</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    set<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>otherMap<span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token class-name">Collection</span><span class="token operator">&lt;</span><span class="token class-name">Map</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span>\`\`\`\`<span class="token operator">&gt;</span> insert <span class="token operator">=</span> mongo<span class="token punctuation">.</span><span class="token function">insert</span><span class="token punctuation">(</span>set<span class="token punctuation">,</span> <span class="token string">&quot;map-set&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> insert<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结果，我们得到了两次插入。这种方法有助于减少一次性添加大量文档的开销。</p><h2 id="_5-从map构建document并插入" tabindex="-1"><a class="header-anchor" href="#_5-从map构建document并插入"><span>5. 从Map构建Document并插入</span></a></h2><p>Document类是Java中处理MongoDB文档的推荐方式。它实现了Map和Bson，使得工作变得容易。让我们使用接受map的构造函数：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenMap_whenDocumentConstructed_thenInsertSucceeds</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Document</span> document <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Document</span><span class="token punctuation">(</span><span class="token constant">MAP</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token class-name">Document</span> saved <span class="token operator">=</span> mongo<span class="token punctuation">.</span><span class="token function">insert</span><span class="token punctuation">(</span>document<span class="token punctuation">,</span> <span class="token string">&quot;doc-collection&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token function">assertNotNull</span><span class="token punctuation">(</span>saved<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;_id&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>内部，Document使用LinkedHashMap，保证插入的顺序。</p><h2 id="_6-从map构建basicdbobject并插入" tabindex="-1"><a class="header-anchor" href="#_6-从map构建basicdbobject并插入"><span>6. 从Map构建BasicDBObject并插入</span></a></h2><p>尽管Document类是首选，我们也可以从未map构建一个BasicDBObject：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenMap_whenBasicDbObjectConstructed_thenInsertSucceeds</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">BasicDBObject</span> dbObject <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BasicDBObject</span><span class="token punctuation">(</span><span class="token constant">MAP</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token class-name">BasicDBObject</span> saved <span class="token operator">=</span> mongo<span class="token punctuation">.</span><span class="token function">insert</span><span class="token punctuation">(</span>dbObject<span class="token punctuation">,</span> <span class="token string">&quot;db-collection&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token function">assertNotNull</span><span class="token punctuation">(</span>saved<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;_id&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>BasicDBObject在我们处理遗留代码时仍然很有帮助，因为Document类仅从MongoDB驱动程序版本3开始可用。</strong></p><h2 id="_7-从object值流构建document并插入" tabindex="-1"><a class="header-anchor" href="#_7-从object值流构建document并插入"><span>7. 从Object值流构建Document并插入</span></a></h2><p>在我们最后一个示例中，我们将从未map构建一个Document对象，其中每个键的值是Object值的列表。由于我们知道值的格式，我们可以通过为每个值放置一个属性名称来构建我们的Document。</p><p>让我们首先构建我们的输入map：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Map</span>\`<span class="token operator">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">List</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span>\`\`\`\`<span class="token operator">&gt;</span> input <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">List</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span>\`\`\` listOne <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
listOne<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&quot;Doc A&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
listOne<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">List</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span>\`\`\` listTwo <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
listTwo<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&quot;Doc B&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
listTwo<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

input<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;a&quot;</span><span class="token punctuation">,</span> listOne<span class="token punctuation">)</span><span class="token punctuation">;</span>
input<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;b&quot;</span><span class="token punctuation">,</span> listTwo<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>如我们所见，没有属性名称，只有值。</strong> 所以，让我们流化我们的input的entrySet()并从中构建我们的结果。为此，我们将在我们的input中的每个条目收集到一个HashSet中。<strong>然后，我们将在累加器函数中构建一个Document，将条目键作为_id属性。之后，我们将迭代条目值，将它们放在适当的属性名下。</strong> 最后，我们将每个Document添加到我们的结果中：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Set</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Document</span><span class="token punctuation">&gt;</span></span>\`\` result <span class="token operator">=</span> input<span class="token punctuation">.</span><span class="token function">entrySet</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">HashSet</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Document</span><span class="token punctuation">&gt;</span></span>\`\`<span class="token operator">::</span><span class="token keyword">new</span><span class="token punctuation">,</span>
    <span class="token punctuation">(</span>set<span class="token punctuation">,</span> entry<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
      <span class="token class-name">Document</span> document <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Document</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      
      document<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;_id&quot;</span><span class="token punctuation">,</span> entry<span class="token punctuation">.</span><span class="token function">getKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token class-name">Iterator</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span>\`\`\` iterator <span class="token operator">=</span> entry<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">iterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      document<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">,</span> iterator<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      document<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;number&quot;</span><span class="token punctuation">,</span> iterator<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      
      set<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>document<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token class-name">Set</span><span class="token operator">::</span><span class="token function">addAll</span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们注意，我们在collect()的第三个参数在这个例子中不需要。但那是因为只有并行流使用合并函数。</p><p><strong>最后，我们可以将结果插入MongoDB：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>mongo<span class="token punctuation">.</span><span class="token function">insert</span><span class="token punctuation">(</span>result<span class="token punctuation">,</span> <span class="token string">&quot;custom-set&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这种策略很有用，例如，如果我们想将CSV值转换为JSON。</p><h2 id="_8-结论" tabindex="-1"><a class="header-anchor" href="#_8-结论"><span>8. 结论</span></a></h2><p>在本文中，我们看到了使用HashMap和HashMap列表的不同方法将文档插入MongoDB集合。我们使用了MongoTemplate来简化任务，并使用了最常见的文档抽象：BasicDBObject和Document。</p><p>并且，正如往常一样，源代码可以在GitHub上找到。翻译已完成，以下是剩余部分：</p><h2 id="_8-结论-1" tabindex="-1"><a class="header-anchor" href="#_8-结论-1"><span>8. 结论</span></a></h2><p>在这篇文章中，我们看到了不同的方式来使用HashMap和HashMap列表将文档插入MongoDB集合。我们使用了MongoTemplate来简化任务，并使用了最常见的文档抽象：BasicDBObject和Document。</p><p>而且，正如往常一样，源代码可以在GitHub上找到。</p><p><img src="https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg" alt="img" loading="lazy"><img src="https://secure.gravatar.com/avatar/11c3bee512ea79aa4341510e5bb5f001?s=50&amp;r=g" alt="img" loading="lazy"><img src="https://secure.gravatar.com/avatar/74d85e58eea7ae3bd05956bff5cb1b49?s=50&amp;r=g" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-persistence-post-footer-main-1.2.0.jpg" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-persistence-post-footer-icn-1.0.0.png" alt="img" loading="lazy"></p><p>OK</p>`,44),o=[e];function c(l,i){return s(),a("div",null,o)}const r=n(p,[["render",c],["__file","2024-07-12-How to Insert a HashMap Into MongoDB With Java .html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-12/2024-07-12-How%20to%20Insert%20a%20HashMap%20Into%20MongoDB%20With%20Java%20.html","title":"如何使用Java将HashMap插入MongoDB？","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","MongoDB"],"tag":["HashMap","Spring Data MongoDB"],"head":[["meta",{"name":"keywords","content":"Java, MongoDB, HashMap, 插入, 数据库"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-12/2024-07-12-How%20to%20Insert%20a%20HashMap%20Into%20MongoDB%20With%20Java%20.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"如何使用Java将HashMap插入MongoDB？"}],["meta",{"property":"og:description","content":"如何使用Java将HashMap插入MongoDB？ 在这个快速教程中，我们将学习如何在Java中使用HashMap与MongoDB进行交互。MongoDB拥有一个对map友好的API，而Spring Data MongoDB使得使用map或map列表的工作变得更加直接。 2. 设置我们的场景 Spring Data MongoDB带有MongoTem..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-12T22:42:58.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"HashMap"}],["meta",{"property":"article:tag","content":"Spring Data MongoDB"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-12T22:42:58.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"如何使用Java将HashMap插入MongoDB？\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg\\",\\"https://secure.gravatar.com/avatar/11c3bee512ea79aa4341510e5bb5f001?s=50&r=g\\",\\"https://secure.gravatar.com/avatar/74d85e58eea7ae3bd05956bff5cb1b49?s=50&r=g\\",\\"https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png\\",\\"https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-persistence-post-footer-main-1.2.0.jpg\\",\\"https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-persistence-post-footer-icn-1.0.0.png\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-12T22:42:58.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"如何使用Java将HashMap插入MongoDB？ 在这个快速教程中，我们将学习如何在Java中使用HashMap与MongoDB进行交互。MongoDB拥有一个对map友好的API，而Spring Data MongoDB使得使用map或map列表的工作变得更加直接。 2. 设置我们的场景 Spring Data MongoDB带有MongoTem..."},"headers":[{"level":2,"title":"2. 设置我们的场景","slug":"_2-设置我们的场景","link":"#_2-设置我们的场景","children":[]},{"level":2,"title":"3. 直接插入单个Map","slug":"_3-直接插入单个map","link":"#_3-直接插入单个map","children":[]},{"level":2,"title":"4. 直接批量插入Map","slug":"_4-直接批量插入map","link":"#_4-直接批量插入map","children":[]},{"level":2,"title":"5. 从Map构建Document并插入","slug":"_5-从map构建document并插入","link":"#_5-从map构建document并插入","children":[]},{"level":2,"title":"6. 从Map构建BasicDBObject并插入","slug":"_6-从map构建basicdbobject并插入","link":"#_6-从map构建basicdbobject并插入","children":[]},{"level":2,"title":"7. 从Object值流构建Document并插入","slug":"_7-从object值流构建document并插入","link":"#_7-从object值流构建document并插入","children":[]},{"level":2,"title":"8. 结论","slug":"_8-结论","link":"#_8-结论","children":[]},{"level":2,"title":"8. 结论","slug":"_8-结论-1","link":"#_8-结论-1","children":[]}],"git":{"createdTime":1720824178000,"updatedTime":1720824178000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.22,"words":1265},"filePathRelative":"posts/baeldung/2024-07-12/2024-07-12-How to Insert a HashMap Into MongoDB With Java .md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在这个快速教程中，我们将学习如何在Java中使用HashMap与MongoDB进行交互。MongoDB拥有一个对map友好的API，而Spring Data MongoDB使得使用map或map列表的工作变得更加直接。</p>\\n<h2>2. 设置我们的场景</h2>\\n<p>Spring Data MongoDB带有MongoTemplate，它有许多重载版本的insert()方法，允许我们将map插入到我们的集合中。MongoDB以JSON格式表示一个文档。因此，我们可以用Java中的Map<code>&lt;String, Object&gt;</code>来复制它。</p>\\n<p>我们将使用MongoTemplate和简单的可重用map来实现我们的用例。首先，创建map引用并注入MongoTemplate：</p>","autoDesc":true}');export{r as comp,d as data};
