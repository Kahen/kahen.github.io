import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-on0L14Tx.js";const p={},e=t(`<h1 id="mongodb中通过键名检索值" tabindex="-1"><a class="header-anchor" href="#mongodb中通过键名检索值"><span>MongoDB中通过键名检索值</span></a></h1><p>在本教程中，我们将学习如何在MongoDB中通过键名检索值。我们将探索MongoDB的各种方法，根据应用的过滤器获取文档的键字段名称。首先，我们将使用_find_或_findone_方法来获取所需的数据，然后使用_aggregation_方法。这里，我们将在MongoDB shell查询和Java驱动程序代码中编写查询。</p><p>让我们看看在MongoDB中通过字段名称检索值的不同方法。</p><h2 id="_2-数据库初始化" tabindex="-1"><a class="header-anchor" href="#_2-数据库初始化"><span>2. 数据库初始化</span></a></h2><p>首先，我们需要设置一个新的数据库_baeldung_和一个新集合，<em>travel</em>：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>use baeldung<span class="token punctuation">;</span>
db.createCollection<span class="token punctuation">(</span>travel<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>现在让我们使用MongoDB的_insertMany_方法向集合中添加一些虚拟数据：</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
        <span class="token property">&quot;passengerId&quot;</span><span class="token operator">:</span> <span class="token number">145</span><span class="token punctuation">,</span>
        <span class="token property">&quot;passengerName&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Nathan Green&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;passengerAge&quot;</span><span class="token operator">:</span> <span class="token number">25</span><span class="token punctuation">,</span>
        <span class="token property">&quot;sourceStation&quot;</span><span class="token operator">:</span> <span class="token string">&quot;London&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;destinationStation&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Birmingham&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;seatType&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Slepper&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;emailAddress&quot;</span><span class="token operator">:</span> <span class="token string">&quot;nathongreen12@gmail.com&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
        <span class="token property">&quot;passengerId&quot;</span><span class="token operator">:</span> <span class="token number">148</span><span class="token punctuation">,</span>
        <span class="token property">&quot;passengerName&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Kevin Joseph&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;passengerAge&quot;</span><span class="token operator">:</span> <span class="token number">28</span><span class="token punctuation">,</span>
        <span class="token property">&quot;sourceStation&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Manchester&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;destinationStation&quot;</span><span class="token operator">:</span> <span class="token string">&quot;London&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;seatType&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Slepper&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;emailAddress&quot;</span><span class="token operator">:</span> <span class="token string">&quot;kevin13@gmail.com&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
        <span class="token property">&quot;passengerId&quot;</span><span class="token operator">:</span> <span class="token number">154</span><span class="token punctuation">,</span>
        <span class="token property">&quot;passengerName&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Sheldon burns&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;passengerAge&quot;</span><span class="token operator">:</span> <span class="token number">26</span><span class="token punctuation">,</span>
        <span class="token property">&quot;sourceStation&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Cambridge&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;destinationStation&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Leeds&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;seatType&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Slepper&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;emailAddress&quot;</span><span class="token operator">:</span> <span class="token string">&quot;sheldonnn160@gmail.com&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
        <span class="token property">&quot;passengerId&quot;</span><span class="token operator">:</span> <span class="token number">168</span><span class="token punctuation">,</span>
        <span class="token property">&quot;passengerName&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Jack Ferguson&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;passengerAge&quot;</span><span class="token operator">:</span> <span class="token number">24</span><span class="token punctuation">,</span>
        <span class="token property">&quot;sourceStation&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Cardiff&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;destinationStation&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Coventry&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;seatType&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Slepper&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;emailAddress&quot;</span><span class="token operator">:</span> <span class="token string">&quot;jackfergusion9890@gmail.com&quot;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述_insertMany_查询将返回以下JSON：</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">&quot;acknowledged&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token property">&quot;insertedIds&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        ObjectId(<span class="token string">&quot;623d7f079d55d4e137e47825&quot;</span>)<span class="token punctuation">,</span>
        ObjectId(<span class="token string">&quot;623d7f079d55d4e137e47826&quot;</span>)<span class="token punctuation">,</span>
        ObjectId(<span class="token string">&quot;623d7f079d55d4e137e47827&quot;</span>)<span class="token punctuation">,</span>
        ObjectId(<span class="token string">&quot;623d7f079d55d4e137e47828&quot;</span>)
    <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>到目前为止，我们已经将虚拟数据插入到_travel_集合中。</p><h2 id="_3-使用-find-方法" tabindex="-1"><a class="header-anchor" href="#_3-使用-find-方法"><span>3. 使用_find_方法</span></a></h2><p>_find_方法查找并返回与集合上指定的查询条件匹配的文档。如果有多个文档符合条件，它将根据磁盘上的文档顺序返回所有文档。此外，在MongoDB中，_find_方法支持查询中的参数投影。如果我们在_find_方法中指定了投影参数，它将只返回包含投影字段的所有文档。</p><p><strong>一个关键点是，除非显式移除，否则__id_字段总是在响应中包含。</strong></p><p>为了演示，让我们看看shell查询来投影一个键字段：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>db.travel.find<span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span>, <span class="token punctuation">{</span><span class="token string">&quot;passengerId&quot;</span><span class="token builtin class-name">:</span> <span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">)</span>.pretty<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上述查询的响应将是：</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">&quot;_id&quot;</span><span class="token operator">:</span> ObjectId(<span class="token string">&quot;623d7f079d55d4e137e47825&quot;</span>)<span class="token punctuation">,</span>
    <span class="token property">&quot;passengerId&quot;</span><span class="token operator">:</span> <span class="token number">145</span>
<span class="token punctuation">}</span>
<span class="token punctuation">{</span>
    <span class="token property">&quot;_id&quot;</span><span class="token operator">:</span> ObjectId(<span class="token string">&quot;623d7f079d55d4e137e47826&quot;</span>)<span class="token punctuation">,</span>
    <span class="token property">&quot;passengerId&quot;</span><span class="token operator">:</span> <span class="token number">148</span>
<span class="token punctuation">}</span>
<span class="token punctuation">{</span>
    <span class="token property">&quot;_id&quot;</span><span class="token operator">:</span> ObjectId(<span class="token string">&quot;623d7f079d55d4e137e47827&quot;</span>)<span class="token punctuation">,</span>
    <span class="token property">&quot;passengerId&quot;</span><span class="token operator">:</span> <span class="token number">154</span>
<span class="token punctuation">}</span>
<span class="token punctuation">{</span>
    <span class="token property">&quot;_id&quot;</span><span class="token operator">:</span> ObjectId(<span class="token string">&quot;623d7f079d55d4e137e47828&quot;</span>)<span class="token punctuation">,</span>
    <span class="token property">&quot;passengerId&quot;</span><span class="token operator">:</span> <span class="token number">168</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，在这个查询中，我们只投影了_passengerId_。现在让我们看看不包含__id_的键字段：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>db.travel.find<span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span>, <span class="token punctuation">{</span><span class="token string">&quot;passengerId&quot;</span><span class="token builtin class-name">:</span> <span class="token number">1</span>, <span class="token string">&quot;_id&quot;</span><span class="token builtin class-name">:</span> <span class="token number">0</span><span class="token punctuation">}</span><span class="token punctuation">)</span>.pretty<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上述查询的响应将是：</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">&quot;passengerId&quot;</span><span class="token operator">:</span> <span class="token number">145</span>
<span class="token punctuation">}</span>
<span class="token punctuation">{</span>
    <span class="token property">&quot;passengerId&quot;</span><span class="token operator">:</span> <span class="token number">148</span>
<span class="token punctuation">}</span>
<span class="token punctuation">{</span>
    <span class="token property">&quot;passengerId&quot;</span><span class="token operator">:</span> <span class="token number">154</span>
<span class="token punctuation">}</span>
<span class="token punctuation">{</span>
    <span class="token property">&quot;passengerId&quot;</span><span class="token operator">:</span> <span class="token number">168</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，在这个查询中，我们从响应投影中排除了__id_字段。让我们看看上面的Java驱动程序代码：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">MongoClient</span> mongoClient <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MongoClient</span><span class="token punctuation">(</span><span class="token string">&quot;localhost&quot;</span><span class="token punctuation">,</span> <span class="token number">27017</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">DB</span> database <span class="token operator">=</span> mongoClient<span class="token punctuation">.</span><span class="token function">getDB</span><span class="token punctuation">(</span><span class="token string">&quot;baeldung&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">DBCollection</span> collection <span class="token operator">=</span> database<span class="token punctuation">.</span><span class="token function">getCollection</span><span class="token punctuation">(</span><span class="token string">&quot;travel&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">BasicDBObject</span> queryFilter <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BasicDBObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">BasicDBObject</span> projection <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BasicDBObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
projection<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;passengerId&quot;</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
projection<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;_id&quot;</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">DBCursor</span> dbCursor <span class="token operator">=</span> collection<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span>queryFilter<span class="token punctuation">,</span> projection<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">while</span> <span class="token punctuation">(</span>dbCursor<span class="token punctuation">.</span><span class="token function">hasNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>dbCursor<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的代码中，首先，我们使用端口_27017_上的本地mongo服务器创建了一个_MongoClient_连接。接下来，我们使用了_find_方法，它有两个参数，_queryFilter_和投影。查询_DBObject_包含我们需要获取数据的过滤器。在这里，我们使用_DBCursor_打印了所有旅行文档的投影字段。</p><h2 id="_4-使用-aggregation-方法" tabindex="-1"><a class="header-anchor" href="#_4-使用-aggregation-方法"><span>4. 使用_aggregation_方法</span></a></h2><p>MongoDB中的_aggregation_操作处理数据记录和文档，并返回计算结果。它从各种文档中收集值，并将它们分组在一起，然后对分组的数据执行不同类型的操作，如求和、平均、最小、最大等。</p><p>当我们需要进行更复杂的聚合时，可以使用MongoDB聚合管道。<strong>聚合管道是与MongoDB查询语法结合的阶段集合，以产生聚合结果。</strong></p><p>让我们看看聚合查询通过键名检索值：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>db.travel.aggregate<span class="token punctuation">(</span><span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
        <span class="token string">&quot;<span class="token variable">$project</span>&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
            <span class="token string">&quot;passengerId&quot;</span><span class="token builtin class-name">:</span> <span class="token number">1</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">]</span><span class="token punctuation">)</span>.pretty<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述聚合查询的响应将是：</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">&quot;_id&quot;</span><span class="token operator">:</span> ObjectId(<span class="token string">&quot;623d7f079d55d4e137e47825&quot;</span>)<span class="token punctuation">,</span>
    <span class="token property">&quot;passengerId&quot;</span><span class="token operator">:</span> <span class="token number">145</span>
<span class="token punctuation">}</span>
<span class="token punctuation">{</span>
    <span class="token property">&quot;_id&quot;</span><span class="token operator">:</span> ObjectId(<span class="token string">&quot;623d7f079d55d4e137e47826&quot;</span>)<span class="token punctuation">,</span>
    <span class="token property">&quot;passengerId&quot;</span><span class="token operator">:</span> <span class="token number">148</span>
<span class="token punctuation">}</span>
<span class="token punctuation">{</span>
    <span class="token property">&quot;_id&quot;</span><span class="token operator">:</span> ObjectId(<span class="token string">&quot;623d7f079d55d4e137e47827&quot;</span>)<span class="token punctuation">,</span>
    <span class="token property">&quot;passengerId&quot;</span><span class="token operator">:</span> <span class="token number">154</span>
<span class="token punctuation">}</span>
<span class="token punctuation">{</span>
    <span class="token property">&quot;_id&quot;</span><span class="token operator">:</span> ObjectId(<span class="token string">&quot;623d7f079d55d4e137e47828&quot;</span>)<span class="token punctuation">,</span>
    <span class="token property">&quot;passengerId&quot;</span><span class="token operator">:</span> <span class="token number">168</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这种情况下，我们使用了聚合管道的_$project_阶段。_$project_指定要包括或排除哪些字段。在我们的查询中，我们只在投影阶段传递了passengerId。</p><p>让我们看看上面的Java驱动程序代码：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">ArrayList</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Document</span><span class="token punctuation">&gt;</span></span>\`\`\` response <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">ArrayList</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Document</span><span class="token punctuation">&gt;</span></span>\`\`\` pipeline <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Document</span><span class="token punctuation">(</span><span class="token string">&quot;$project&quot;</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Document</span><span class="token punctuation">(</span><span class="token string">&quot;passengerId&quot;</span><span class="token punctuation">,</span> <span class="token number">1L</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
database <span class="token operator">=</span> mongoClient<span class="token punctuation">.</span><span class="token function">getDatabase</span><span class="token punctuation">(</span><span class="token string">&quot;baeldung&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
database<span class="token punctuation">.</span><span class="token function">getCollection</span><span class="token punctuation">(</span><span class="token string">&quot;travel&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">aggregate</span><span class="token punctuation">(</span>pipeline<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">allowDiskUse</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">into</span><span class="token punctuation">(</span>response<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;response:- &quot;</span> <span class="token operator">+</span> response<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们还可以用以下方式编写聚合管道</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">ArrayList</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Document</span><span class="token punctuation">&gt;</span></span>\`\`\` response <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">ArrayList</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Bson</span><span class="token punctuation">&gt;</span></span>\` pipeline <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span>
    <span class="token function">project</span><span class="token punctuation">(</span><span class="token function">fields</span><span class="token punctuation">(</span><span class="token class-name">Projections</span><span class="token punctuation">.</span><span class="token function">exclude</span><span class="token punctuation">(</span><span class="token string">&quot;_id&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">Projections</span><span class="token punctuation">.</span><span class="token function">include</span><span class="token punctuation">(</span><span class="token string">&quot;passengerId&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
<span class="token class-name">MongoDatabase</span> database <span class="token operator">=</span> mongoClient<span class="token punctuation">.</span><span class="token function">getDatabase</span><span class="token punctuation">(</span><span class="token string">&quot;baeldung&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
database<span class="token punctuation">.</span><span class="token function">getCollection</span><span class="token punctuation">(</span><span class="token string">&quot;travel&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">aggregate</span><span class="token punctuation">(</span>pipeline<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">allowDiskUse</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">into</span><span class="token punctuation">(</span>response<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;response:-&quot;</span> <span class="token operator">+</span> response<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们使用Java驱动程序代码创建了一个聚合管道，并仅设置项目阶段以包括_passengerId_字段。最后，我们将聚合管道传递给_aggregate_方法以检索数据。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们学习了如何在MongoDB中通过键名检索值。我们探索了MongoDB的不同方法来获取数据。首先，我们使用_find_方法检索数据，然后使用_aggregate_方法。我们研究了MongoDB中字段投影的使用情况。简而言之，我们使用Mongo shell查询和Java驱动程序代码实现了字段的投影。</p><p>我们可以在GitHub上找到所有案例的实现。</p>`,41),o=[e];function c(l,i){return a(),s("div",null,o)}const d=n(p,[["render",c],["__file","2024-07-20-Retrieve a Value from MongoDB by Its Key Name.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-20/2024-07-20-Retrieve%20a%20Value%20from%20MongoDB%20by%20Its%20Key%20Name.html","title":"MongoDB中通过键名检索值","lang":"zh-CN","frontmatter":{"date":"2024-07-20T00:00:00.000Z","category":["MongoDB","数据库"],"tag":["MongoDB","数据检索"],"head":[["meta",{"name":"keywords","content":"MongoDB, 数据检索, Java, 数据库操作"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-20/2024-07-20-Retrieve%20a%20Value%20from%20MongoDB%20by%20Its%20Key%20Name.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"MongoDB中通过键名检索值"}],["meta",{"property":"og:description","content":"MongoDB中通过键名检索值 在本教程中，我们将学习如何在MongoDB中通过键名检索值。我们将探索MongoDB的各种方法，根据应用的过滤器获取文档的键字段名称。首先，我们将使用_find_或_findone_方法来获取所需的数据，然后使用_aggregation_方法。这里，我们将在MongoDB shell查询和Java驱动程序代码中编写查询。..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-20T07:19:10.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"MongoDB"}],["meta",{"property":"article:tag","content":"数据检索"}],["meta",{"property":"article:published_time","content":"2024-07-20T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-20T07:19:10.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"MongoDB中通过键名检索值\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-20T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-20T07:19:10.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"MongoDB中通过键名检索值 在本教程中，我们将学习如何在MongoDB中通过键名检索值。我们将探索MongoDB的各种方法，根据应用的过滤器获取文档的键字段名称。首先，我们将使用_find_或_findone_方法来获取所需的数据，然后使用_aggregation_方法。这里，我们将在MongoDB shell查询和Java驱动程序代码中编写查询。..."},"headers":[{"level":2,"title":"2. 数据库初始化","slug":"_2-数据库初始化","link":"#_2-数据库初始化","children":[]},{"level":2,"title":"3. 使用_find_方法","slug":"_3-使用-find-方法","link":"#_3-使用-find-方法","children":[]},{"level":2,"title":"4. 使用_aggregation_方法","slug":"_4-使用-aggregation-方法","link":"#_4-使用-aggregation-方法","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1721459950000,"updatedTime":1721459950000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.14,"words":1243},"filePathRelative":"posts/baeldung/2024-07-20/2024-07-20-Retrieve a Value from MongoDB by Its Key Name.md","localizedDate":"2024年7月20日","excerpt":"\\n<p>在本教程中，我们将学习如何在MongoDB中通过键名检索值。我们将探索MongoDB的各种方法，根据应用的过滤器获取文档的键字段名称。首先，我们将使用_find_或_findone_方法来获取所需的数据，然后使用_aggregation_方法。这里，我们将在MongoDB shell查询和Java驱动程序代码中编写查询。</p>\\n<p>让我们看看在MongoDB中通过字段名称检索值的不同方法。</p>\\n<h2>2. 数据库初始化</h2>\\n<p>首先，我们需要设置一个新的数据库_baeldung_和一个新集合，<em>travel</em>：</p>\\n<div class=\\"language-bash\\" data-ext=\\"sh\\" data-title=\\"sh\\"><pre class=\\"language-bash\\"><code>use baeldung<span class=\\"token punctuation\\">;</span>\\ndb.createCollection<span class=\\"token punctuation\\">(</span>travel<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n</code></pre></div>","autoDesc":true}');export{d as comp,k as data};
