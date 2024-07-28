import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as e}from"./app-D4B8YWfq.js";const t={},p=e(`<hr><h1 id="更新-mongodb-文档中的多个字段" tabindex="-1"><a class="header-anchor" href="#更新-mongodb-文档中的多个字段"><span>更新 MongoDB 文档中的多个字段</span></a></h1><p>MongoDB 是一个公开可用的面向文档的 NoSQL 数据库。我们可以使用各种方法如 <em>update</em>、<em>replace</em> 和 <em>save</em> 来更新集合中的文档。为了更改文档的特定字段，我们将使用不同的操作符如 <em>$set</em>、<em>$inc</em> 等。</p><p>在本教程中，我们将学习如何使用 <em>update</em> 和 <em>replace</em> 查询来修改文档的多个字段。为了演示目的，我们首先讨论 mongo shell 查询，然后是其在 Java 中的对应实现。</p><p>让我们现在看看实现目的的各种方法。</p><h3 id="_2-1-更新单个文档的多个字段" tabindex="-1"><a class="header-anchor" href="#_2-1-更新单个文档的多个字段"><span>2.1. 更新单个文档的多个字段</span></a></h3><p>我们可以使用 <em>$set</em> 和 <em>$inc</em> 操作符来更新 MongoDB 中的任何字段。<em>$set</em> 操作符将设置新指定的值，而 <em>$inc</em> 操作符将按指定值增加值。</p><p>让我们首先看看使用 <em>$set</em> 操作符更新员工集合中两个字段的 MongoDB 查询：</p><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code>db<span class="token punctuation">.</span>employee<span class="token punctuation">.</span><span class="token function">updateOne</span><span class="token punctuation">(</span>
    <span class="token punctuation">{</span>
        <span class="token string-property property">&quot;employee_id&quot;</span><span class="token operator">:</span> <span class="token number">794875</span><span class="token punctuation">,</span>
        <span class="token string-property property">&quot;employee_name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;David Smith&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
        <span class="token literal-property property">$set</span><span class="token operator">:</span><span class="token punctuation">{</span>
            <span class="token literal-property property">department_id</span><span class="token operator">:</span><span class="token number">3</span><span class="token punctuation">,</span>
            <span class="token literal-property property">job</span><span class="token operator">:</span><span class="token string">&quot;Sales Manager&quot;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的查询中，使用 <em>employee_id</em> 和 <em>employee_name</em> 字段来过滤文档，并使用 <em>$set</em> 操作符来更新 <em>job</em> 和 <em>department_id</em> 字段。</p><p>我们也可以在单个更新查询中一起使用 <em>$set</em> 和 <em>$inc</em> 操作符：</p><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code>db<span class="token punctuation">.</span>employee<span class="token punctuation">.</span><span class="token function">updateOne</span><span class="token punctuation">(</span>
    <span class="token punctuation">{</span>
        <span class="token string-property property">&quot;employee_id&quot;</span><span class="token operator">:</span> <span class="token number">794875</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
        <span class="token literal-property property">$inc</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">department_id</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token literal-property property">$set</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">job</span><span class="token operator">:</span> <span class="token string">&quot;Sales Manager&quot;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这将把 <em>job</em> 字段更新为 Sales Manager 并将 <em>department_id</em> 增加 1。</p><h3 id="_2-2-更新多个文档的多个字段" tabindex="-1"><a class="header-anchor" href="#_2-2-更新多个文档的多个字段"><span>2.2. 更新多个文档的多个字段</span></a></h3><p>此外，我们还可以更新 MongoDB 中多个文档的多个字段。我们只需要在修改所有匹配过滤查询条件的文档时包含选项 <em>multi:true</em>：</p><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code>db<span class="token punctuation">.</span>employee<span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span>
    <span class="token punctuation">{</span>
        <span class="token string-property property">&quot;job&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Sales Representative&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
        <span class="token literal-property property">$inc</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">salary</span><span class="token operator">:</span> <span class="token number">10000</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token literal-property property">$set</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">department_id</span><span class="token operator">:</span> <span class="token number">5</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
        <span class="token literal-property property">multi</span><span class="token operator">:</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>或者，我们可以使用 <em>updateMany</em> 查询得到相同的结果：</p><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code>db<span class="token punctuation">.</span>employee<span class="token punctuation">.</span><span class="token function">updateMany</span><span class="token punctuation">(</span>
    <span class="token punctuation">{</span>
        <span class="token string-property property">&quot;job&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Sales Representative&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
        <span class="token literal-property property">$inc</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">salary</span><span class="token operator">:</span> <span class="token number">10000</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token literal-property property">$set</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">department_id</span><span class="token operator">:</span> <span class="token number">5</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的查询中，我们使用 <em>updateMany</em> 方法更新集合中的多个文档。</p><h3 id="_2-3-更新多个字段时的常见问题" tabindex="-1"><a class="header-anchor" href="#_2-3-更新多个字段时的常见问题"><span>2.3. 更新多个字段时的常见问题</span></a></h3><p>到目前为止，我们已经学会了如何使用更新查询通过提供两个不同的操作符或在多个字段上使用单个操作符来更新多个字段。</p><p>现在，如果我们在单个查询中多次使用不同的字段的同一个操作符，<strong>MongoDB 只会更新更新查询的最后一个语句</strong>并忽略其余部分：</p><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code>db<span class="token punctuation">.</span>employee<span class="token punctuation">.</span><span class="token function">updateMany</span><span class="token punctuation">(</span>
    <span class="token punctuation">{</span>
        <span class="token string-property property">&quot;employee_id&quot;</span><span class="token operator">:</span> <span class="token number">794875</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
        <span class="token literal-property property">$set</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">department_id</span><span class="token operator">:</span> <span class="token number">3</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token literal-property property">$set</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">job</span><span class="token operator">:</span><span class="token string">&quot;Sales Manager&quot;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述查询将返回类似于此的输出：</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">&quot;acknowledged&quot;</span><span class="token operator">:</span><span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token property">&quot;matchedCount&quot;</span><span class="token operator">:</span><span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token property">&quot;modifiedCount&quot;</span><span class="token operator">:</span><span class="token number">1</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这种情况下，只有 <em>job</em> 将被更新为 “Sales Manager”。<em>department_id</em> 的值将不会被更新为 3。</p><h2 id="_3-使用-java-驱动程序更新字段" tabindex="-1"><a class="header-anchor" href="#_3-使用-java-驱动程序更新字段"><span>3. 使用 Java 驱动程序更新字段</span></a></h2><p>到目前为止，我们已经讨论了原始的 MongoDB 查询。现在让我们使用 Java 来执行相同的操作。MongoDB Java 驱动程序支持两个类来表示 MongoDB 文档，<em>com.mongodb.BasicDBObject</em> 和 <em>org.bson.Document</em>。我们将看看使用这两种方法来更新文档中的字段。</p><p>在我们继续之前，让我们首先连接到 <em>baeldung</em> DB 中的 <em>employee</em> 集合：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">MongoClient</span> mongoClient <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MongoClient</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">MongoClientURI</span><span class="token punctuation">(</span><span class="token string">&quot;localhost&quot;</span><span class="token punctuation">,</span> <span class="token number">27017</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">MongoDatabase</span> database <span class="token operator">=</span> mongoClient<span class="token punctuation">.</span><span class="token function">getDatabase</span><span class="token punctuation">(</span><span class="token string">&quot;baeldung&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">MongoCollection</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Document</span><span class="token punctuation">&gt;</span></span>\` collection <span class="token operator">=</span> database<span class="token punctuation">.</span><span class="token function">getCollection</span><span class="token punctuation">(</span><span class="token string">&quot;employee&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里我们假设 MongoDB 在默认端口 27017 上本地运行。</p><h3 id="_3-1-使用-dbobject" tabindex="-1"><a class="header-anchor" href="#_3-1-使用-dbobject"><span>3.1. 使用 <em>DBObject</em></span></a></h3><p>为了在 MongoDB 中创建文档，我们将使用 <em>com.mongodb.</em> DBObject 接口及其实现类 <em>com.mongodb.BasicDBObject</em>。</p><p><em>DBObject</em> 的实现基于键值对。<strong><em>BasicDBObject</em> 继承自 <em>util</em> 包中的 <em>LinkedHashMap</em> 类。</strong></p><p>现在让我们使用 <em>com.mongodb.BasicDBObject</em> 来执行多个字段的更新操作：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">BasicDBObject</span> searchQuery <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BasicDBObject</span><span class="token punctuation">(</span><span class="token string">&quot;employee_id&quot;</span><span class="token punctuation">,</span> <span class="token number">794875</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">BasicDBObject</span> updateFields <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BasicDBObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
updateFields<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot;department_id&quot;</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
updateFields<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot;job&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Sales Manager&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">BasicDBObject</span> setQuery <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BasicDBObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
setQuery<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot;$set&quot;</span><span class="token punctuation">,</span> updateFields<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">UpdateResult</span> updateResult <span class="token operator">=</span> collection<span class="token punctuation">.</span><span class="token function">updateMany</span><span class="token punctuation">(</span>searchQuery<span class="token punctuation">,</span> setQuery<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，首先我们基于 <em>employee_id</em> 创建了一个过滤查询。此操作将返回一组文档。进一步，我们根据设置查询更新了 <em>department_id</em> 和 <em>job</em> 的值。</p><h3 id="_3-2-使用-bson-文档" tabindex="-1"><a class="header-anchor" href="#_3-2-使用-bson-文档"><span>3.2. 使用 <em>bson</em> 文档</span></a></h3><p>我们可以使用 <em>bson</em> 文档执行所有 MongoDB 操作。为此，首先需要集合对象，然后使用 <em>updateMany</em> 方法和 <em>filter</em> 和 <em>set</em> 函数执行更新操作。</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">UpdateResult</span> updateQueryResult <span class="token operator">=</span> collection<span class="token punctuation">.</span><span class="token function">updateMany</span><span class="token punctuation">(</span><span class="token class-name">Filters</span><span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span><span class="token string">&quot;employee_id&quot;</span><span class="token punctuation">,</span> <span class="token number">794875</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token class-name">Updates</span><span class="token punctuation">.</span><span class="token function">combine</span><span class="token punctuation">(</span><span class="token class-name">Updates</span><span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">&quot;department_id&quot;</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">Updates</span><span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">&quot;job&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Sales Manager&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们向 <em>updateMany</em> 方法传递了一个查询过滤器。<em>eq</em> 过滤器匹配 <em>employee_id</em> 与精确匹配文本 ‘794875’。然后，我们使用 <em>set</em> 操作符更新 <em>department_id</em> 和 <em>job</em>。</p><h2 id="_4-使用-replace-查询" tabindex="-1"><a class="header-anchor" href="#_4-使用-replace-查询"><span>4. 使用 Replace 查询</span></a></h2><p>更新文档的多个字段的简单方法是用具有更新值的新文档替换它。</p><p>例如，如果我们希望替换 <em>employee_id</em> 为 794875 的文档，我们可以执行以下查询：</p><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code>db<span class="token punctuation">.</span>employee<span class="token punctuation">.</span><span class="token function">replaceOne</span><span class="token punctuation">(</span>
    <span class="token punctuation">{</span>
        <span class="token string-property property">&quot;employee_id&quot;</span><span class="token operator">:</span> <span class="token number">794875</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
        <span class="token string-property property">&quot;employee_id&quot;</span><span class="token operator">:</span> <span class="token number">794875</span><span class="token punctuation">,</span>
        <span class="token string-property property">&quot;employee_name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;David Smith&quot;</span><span class="token punctuation">,</span>
        <span class="token string-property property">&quot;job&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Sales Manager&quot;</span><span class="token punctuation">,</span>
        <span class="token string-property property">&quot;department_id&quot;</span><span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span>
        <span class="token string-property property">&quot;salary&quot;</span><span class="token operator">:</span> <span class="token number">30000</span><span class="token punctuation">,</span>
        <span class="token string-property property">&quot;hire_date&quot;</span><span class="token operator">:</span> <span class="token function">NumberLong</span><span class="token punctuation">(</span><span class="token string">&quot;1643969311817&quot;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述命令将在输出中打印确认 JSON：</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">&quot;acknowledged&quot;</span><span class="token operator">:</span><span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token property">&quot;matchedCount&quot;</span><span class="token operator">:</span><span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token property">&quot;modifiedCount&quot;</span><span class="token operator">:</span><span class="token number">1</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，使用 <em>employee_id</em> 字段来过滤文档。更新查询的第二个参数表示从现有文档将被替换的文档。</p><p>在上面的查询中，我们正在执行 <em>replaceOne</em>，因此，它将仅用该过滤器替换单个文档。或者，如果我们想用该过滤器查询替换所有文档，则需要使用 <em>updateMany</em> 方法。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们探讨了在 MongoDB 中更新文档的多个字段的各种方法。我们广泛讨论了两种实现，使用 MongoDB shell 和使用 Java 驱动程序。</p><p>更新文档的多个字段有各种选项，包括 <em>$inc</em> 和 <em>$set</em> 操作符。</p><p>所有这些示例和代码片段的实现都可以在 GitHub 上找到。</p>`,53),o=[p];function l(c,i){return a(),s("div",null,o)}const d=n(t,[["render",l],["__file","2024-07-21-Update Multiple Fields in a MongoDB Document.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-07-21/2024-07-21-Update%20Multiple%20Fields%20in%20a%20MongoDB%20Document.html","title":"更新 MongoDB 文档中的多个字段","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["MongoDB","Java"],"tag":["MongoDB","Java","更新","文档"],"head":[["meta",{"name":"keywords","content":"MongoDB, Java, 更新, 文档"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-21/2024-07-21-Update%20Multiple%20Fields%20in%20a%20MongoDB%20Document.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"更新 MongoDB 文档中的多个字段"}],["meta",{"property":"og:description","content":"更新 MongoDB 文档中的多个字段 MongoDB 是一个公开可用的面向文档的 NoSQL 数据库。我们可以使用各种方法如 update、replace 和 save 来更新集合中的文档。为了更改文档的特定字段，我们将使用不同的操作符如 $set、$inc 等。 在本教程中，我们将学习如何使用 update 和 replace 查询来修改文档的多个..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-21T06:13:49.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"MongoDB"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"更新"}],["meta",{"property":"article:tag","content":"文档"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-21T06:13:49.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"更新 MongoDB 文档中的多个字段\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-21T06:13:49.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"更新 MongoDB 文档中的多个字段 MongoDB 是一个公开可用的面向文档的 NoSQL 数据库。我们可以使用各种方法如 update、replace 和 save 来更新集合中的文档。为了更改文档的特定字段，我们将使用不同的操作符如 $set、$inc 等。 在本教程中，我们将学习如何使用 update 和 replace 查询来修改文档的多个..."},"headers":[{"level":3,"title":"2.1. 更新单个文档的多个字段","slug":"_2-1-更新单个文档的多个字段","link":"#_2-1-更新单个文档的多个字段","children":[]},{"level":3,"title":"2.2. 更新多个文档的多个字段","slug":"_2-2-更新多个文档的多个字段","link":"#_2-2-更新多个文档的多个字段","children":[]},{"level":3,"title":"2.3. 更新多个字段时的常见问题","slug":"_2-3-更新多个字段时的常见问题","link":"#_2-3-更新多个字段时的常见问题","children":[]},{"level":2,"title":"3. 使用 Java 驱动程序更新字段","slug":"_3-使用-java-驱动程序更新字段","link":"#_3-使用-java-驱动程序更新字段","children":[{"level":3,"title":"3.1. 使用 DBObject","slug":"_3-1-使用-dbobject","link":"#_3-1-使用-dbobject","children":[]},{"level":3,"title":"3.2. 使用 bson 文档","slug":"_3-2-使用-bson-文档","link":"#_3-2-使用-bson-文档","children":[]}]},{"level":2,"title":"4. 使用 Replace 查询","slug":"_4-使用-replace-查询","link":"#_4-使用-replace-查询","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1721542429000,"updatedTime":1721542429000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.57,"words":1372},"filePathRelative":"posts/baeldung/2024-07-21/2024-07-21-Update Multiple Fields in a MongoDB Document.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>更新 MongoDB 文档中的多个字段</h1>\\n<p>MongoDB 是一个公开可用的面向文档的 NoSQL 数据库。我们可以使用各种方法如 <em>update</em>、<em>replace</em> 和 <em>save</em> 来更新集合中的文档。为了更改文档的特定字段，我们将使用不同的操作符如 <em>$set</em>、<em>$inc</em> 等。</p>\\n<p>在本教程中，我们将学习如何使用 <em>update</em> 和 <em>replace</em> 查询来修改文档的多个字段。为了演示目的，我们首先讨论 mongo shell 查询，然后是其在 Java 中的对应实现。</p>","autoDesc":true}');export{d as comp,m as data};
