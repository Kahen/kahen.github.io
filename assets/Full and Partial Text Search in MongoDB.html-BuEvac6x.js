import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-DgBtAgUy.js";const p={},o=t(`<h1 id="mongodb中的全文和部分文本搜索" tabindex="-1"><a class="header-anchor" href="#mongodb中的全文和部分文本搜索"><span>MongoDB中的全文和部分文本搜索</span></a></h1><p>全文搜索和部分文本搜索的需求在开发数据库应用程序时经常出现。它们还应该支持全文和部分文本匹配，以使这些搜索更加用户友好。为此，MongoDB提供了几种使用文本搜索查找相关文档的方法。</p><p>在本教程中，我们将探索MongoDB中的文本搜索，其特性，如何使用它，以及如何充分利用它。</p><p>尽管文本搜索查询是一个强大的工具，但它们需要特定的设置。为了实现这一点，我们需要在集合上创建一个文本索引。</p><p><strong>索引就像是特殊的文件夹，只保存集合中每个文档的一点点信息</strong>。换句话说，它们与实际的文档本身是分开的。此外，MongoDB允许用户创建不同类型的索引。</p><p>幸运的是，MongoDB提供了设计用于促进字符串内容搜索的文本索引。这些索引灵活，可以包含多个字段，允许进行全面搜索。此外，这些索引帮助数据库更快地搜索集合。</p><p>首先，让我们通过指定连接字符串、数据库名称和集合名称来创建一个数据库客户端：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Before</span>
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>mongoClient <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        mongoClient <span class="token operator">=</span> <span class="token class-name">MongoClients</span><span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token string">&quot;mongodb://localhost:27017&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        database <span class="token operator">=</span> mongoClient<span class="token punctuation">.</span><span class="token function">getDatabase</span><span class="token punctuation">(</span><span class="token string">&quot;baeldung&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        collection <span class="token operator">=</span> database<span class="token punctuation">.</span><span class="token function">getCollection</span><span class="token punctuation">(</span><span class="token string">&quot;user&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们还在集合的字段上创建一个文本索引：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">void</span> <span class="token function">createTextIndex</span><span class="token punctuation">(</span><span class="token class-name">String</span> field<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">IndexOptions</span> indexOptions <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">IndexOptions</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    indexOptions<span class="token punctuation">.</span><span class="token function">name</span><span class="token punctuation">(</span><span class="token string">&quot;textIndex&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">unique</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">background</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    collection<span class="token punctuation">.</span><span class="token function">createIndex</span><span class="token punctuation">(</span><span class="token class-name">Indexes</span><span class="token punctuation">.</span><span class="token function">text</span><span class="token punctuation">(</span>field<span class="token punctuation">)</span><span class="token punctuation">,</span> indexOptions<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>有一个限制：一个集合只能有一个专用的文本搜索索引</strong>。</p><h3 id="_3-全文搜索" tabindex="-1"><a class="header-anchor" href="#_3-全文搜索"><span>3. 全文搜索</span></a></h3><p>简单的全文搜索非常直接。我们可以输入关键词或短语，然后系统定位包含这些确切术语的文档。</p><p>除了简单的全文搜索外，还有几种执行全文搜索的方法。每种都有其自身的优势，并且适用于特定的用例。一些常见的方法包括布尔全文搜索、短语搜索和邻近搜索。</p><p>让我们创建一个执行文本搜索查询的方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Document</span><span class="token punctuation">&gt;</span></span>\` <span class="token function">searchUser</span><span class="token punctuation">(</span><span class="token class-name">String</span> query<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Document</span> result <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Document</span><span class="token punctuation">(</span><span class="token string">&quot;$text&quot;</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Document</span><span class="token punctuation">(</span><span class="token string">&quot;$search&quot;</span><span class="token punctuation">,</span> query<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> collection<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">into</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><em>$text</em> 在使用文本索引索引的字段的内容上执行文本搜索，而 <em>$search</em> 定义要搜索的目标文本。此外，<em>$text</em> 使用空格对搜索字符串进行分词，并在搜索字符串中对所有此类标记执行逻辑或。<strong>这意味着，当我们搜索“Java Spring”时，我们将找到所有包含“Java”或“Spring”或两者都有的文档</strong>。</p><p>让我们创建一些记录来探索全文搜索功能：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenSearchingUserWithFullText_thenCorrectCountReturned</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// WHEN</span>
    <span class="token function">insertUser</span><span class="token punctuation">(</span><span class="token string">&quot;Leonel&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Java Spring&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">insertUser</span><span class="token punctuation">(</span><span class="token string">&quot;John&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Java Spring MongoDB&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">insertUser</span><span class="token punctuation">(</span><span class="token string">&quot;Smith&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Java&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">createTextIndex</span><span class="token punctuation">(</span><span class="token string">&quot;description&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// THEN</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;All users with term &#39;Java&#39; or &#39;Spring&#39;&quot;</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token function">searchUser</span><span class="token punctuation">(</span><span class="token string">&quot;Java Spring&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 我们还可以通过在搜索查询中添加“-”字符来排除一个词：</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;All users with term &#39;Java&#39; or &#39;Spring&#39; but not &#39;MongoDB&#39;&quot;</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token function">searchUser</span><span class="token punctuation">(</span><span class="token string">&quot;Java Spring -MongoDB&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 类似地，我们也可以通过将它们用双引号括起来来搜索确切的短语：</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;All users with term Java only&quot;</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token function">searchUser</span><span class="token punctuation">(</span><span class="token string">&quot;\\&quot;Java\\&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-部分文本搜索" tabindex="-1"><a class="header-anchor" href="#_4-部分文本搜索"><span>4. 部分文本搜索</span></a></h3><p>MongoDB不原生支持部分搜索。与全文搜索不同，部分、模糊或子字符串搜索并不直接。搜索功能应用了针对停用词和词干提取的语言特定规则。</p><p><strong>支持语言的词干提取规则基于标准算法，这些算法处理常见的动词和名词，但通常不涉及专有名词</strong>。</p><p>让我们尝试使用部分搜索来搜索用户：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenSearchingUserWithPartialText_thenCorrectCountReturned</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// WHEN</span>
    <span class="token function">insertUser</span><span class="token punctuation">(</span><span class="token string">&quot;LEONEL&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Java Spring&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">createTextIndex</span><span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// THEN</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Search with capital case&quot;</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> mongoDBClient<span class="token punctuation">.</span><span class="token function">searchUser</span><span class="token punctuation">(</span><span class="token string">&quot;LEONEL&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Search with lower case&quot;</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> mongoDBClient<span class="token punctuation">.</span><span class="token function">searchUser</span><span class="token punctuation">(</span><span class="token string">&quot;leonel&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Partial search&quot;</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> mongoDBClient<span class="token punctuation">.</span><span class="token function">searchUser</span><span class="token punctuation">(</span><span class="token string">&quot;LEONE&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 相反，由于词干提取规则，系统无法定位‘L’、‘LEO’或‘NEL’：</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Partial search with L&quot;</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token function">searchUser</span><span class="token punctuation">(</span><span class="token string">&quot;L&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Partial search with LEO&quot;</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token function">searchUser</span><span class="token punctuation">(</span><span class="token string">&quot;LEO&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Partial search with NEL&quot;</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token function">searchUser</span><span class="token punctuation">(</span><span class="token string">&quot;NEL&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>部分搜索的一种解决方法是使用 <em>$regex</em>。为此，我们将不需要文本索引，这可能会在集合非常大的情况下减慢搜索操作。</p><h3 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h3><p>在这个快速教程中，我们检查了MongoDB中的全文和部分文本搜索。我们学习了如何使用搜索查询来精确地找到我们正在寻找的内容，并从搜索结果中排除某些术语。我们还发现，前缀和后缀在文档的部分搜索中不匹配，并找到了一种解决方法。</p><p>如常，所有的代码片段都可以在GitHub上找到。</p><p>发布帖子后30天内开放评论。对于此日期之后的任何问题，请使用网站上的联系表单。</p>`,29),e=[o];function c(u,i){return a(),s("div",null,e)}const k=n(p,[["render",c],["__file","Full and Partial Text Search in MongoDB.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/Archive/Full%20and%20Partial%20Text%20Search%20in%20MongoDB.html","title":"MongoDB中的全文和部分文本搜索","lang":"zh-CN","frontmatter":{"date":"2024-06-16T00:00:00.000Z","category":["MongoDB","Java"],"tag":["Full-Text Search","Partial-Text Search"],"description":"MongoDB中的全文和部分文本搜索 全文搜索和部分文本搜索的需求在开发数据库应用程序时经常出现。它们还应该支持全文和部分文本匹配，以使这些搜索更加用户友好。为此，MongoDB提供了几种使用文本搜索查找相关文档的方法。 在本教程中，我们将探索MongoDB中的文本搜索，其特性，如何使用它，以及如何充分利用它。 尽管文本搜索查询是一个强大的工具，但它们...","head":[["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/Full%20and%20Partial%20Text%20Search%20in%20MongoDB.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"MongoDB中的全文和部分文本搜索"}],["meta",{"property":"og:description","content":"MongoDB中的全文和部分文本搜索 全文搜索和部分文本搜索的需求在开发数据库应用程序时经常出现。它们还应该支持全文和部分文本匹配，以使这些搜索更加用户友好。为此，MongoDB提供了几种使用文本搜索查找相关文档的方法。 在本教程中，我们将探索MongoDB中的文本搜索，其特性，如何使用它，以及如何充分利用它。 尽管文本搜索查询是一个强大的工具，但它们..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Full-Text Search"}],["meta",{"property":"article:tag","content":"Partial-Text Search"}],["meta",{"property":"article:published_time","content":"2024-06-16T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"MongoDB中的全文和部分文本搜索\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-16T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]]},"headers":[{"level":3,"title":"3. 全文搜索","slug":"_3-全文搜索","link":"#_3-全文搜索","children":[]},{"level":3,"title":"4. 部分文本搜索","slug":"_4-部分文本搜索","link":"#_4-部分文本搜索","children":[]},{"level":3,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":4.11,"words":1232},"filePathRelative":"posts/baeldung/Archive/Full and Partial Text Search in MongoDB.md","localizedDate":"2024年6月16日","excerpt":"\\n<p>全文搜索和部分文本搜索的需求在开发数据库应用程序时经常出现。它们还应该支持全文和部分文本匹配，以使这些搜索更加用户友好。为此，MongoDB提供了几种使用文本搜索查找相关文档的方法。</p>\\n<p>在本教程中，我们将探索MongoDB中的文本搜索，其特性，如何使用它，以及如何充分利用它。</p>\\n<p>尽管文本搜索查询是一个强大的工具，但它们需要特定的设置。为了实现这一点，我们需要在集合上创建一个文本索引。</p>\\n<p><strong>索引就像是特殊的文件夹，只保存集合中每个文档的一点点信息</strong>。换句话说，它们与实际的文档本身是分开的。此外，MongoDB允许用户创建不同类型的索引。</p>","autoDesc":true}');export{k as comp,d as data};
