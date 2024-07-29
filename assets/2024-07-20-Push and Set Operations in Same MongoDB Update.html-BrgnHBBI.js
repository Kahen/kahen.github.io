import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-BUAgDejY.js";const e={},p=t(`<hr><h1 id="mongodb中同一更新操作中的push和set操作" tabindex="-1"><a class="header-anchor" href="#mongodb中同一更新操作中的push和set操作"><span>MongoDB中同一更新操作中的Push和Set操作</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p><em>$push</em> 是 MongoDB 中的一个更新操作符，用于在数组中添加值。相比之下，<em>$set</em> 操作符用于更新文档中现有字段的值。</p><p>在这个简短的教程中，我们将介绍如何在单个更新查询中同时执行 <em>$push</em> 和 <em>$set</em> 操作。</p><h2 id="_2-数据库初始化" tabindex="-1"><a class="header-anchor" href="#_2-数据库初始化"><span>2. 数据库初始化</span></a></h2><p>在我们开始执行多个更新操作之前，我们首先需要设置一个数据库 <em>baeldung</em> 和示例集合 <em>marks</em>：</p><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code>use baeldung<span class="token punctuation">;</span>
db<span class="token punctuation">.</span><span class="token function">createCollection</span><span class="token punctuation">(</span>marks<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们使用 MongoDB 的 <em>insertMany</em> 方法向集合 <em>marks</em> 插入一些文档：</p><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code>db<span class="token punctuation">.</span>marks<span class="token punctuation">.</span><span class="token function">insertMany</span><span class="token punctuation">(</span><span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
        <span class="token string-property property">&quot;studentId&quot;</span><span class="token operator">:</span> <span class="token number">1023</span><span class="token punctuation">,</span>
        <span class="token string-property property">&quot;studentName&quot;</span><span class="token operator">:</span><span class="token string">&quot;James Broad&quot;</span><span class="token punctuation">,</span>
        <span class="token string-property property">&quot;joiningYear&quot;</span><span class="token operator">:</span><span class="token string">&quot;2018&quot;</span><span class="token punctuation">,</span>
        <span class="token string-property property">&quot;totalMarks&quot;</span><span class="token operator">:</span><span class="token number">100</span><span class="token punctuation">,</span>
        <span class="token string-property property">&quot;subjectDetails&quot;</span><span class="token operator">:</span><span class="token punctuation">[</span>
            <span class="token punctuation">{</span>
                <span class="token string-property property">&quot;subjectId&quot;</span><span class="token operator">:</span><span class="token number">123</span><span class="token punctuation">,</span>
                <span class="token string-property property">&quot;subjectName&quot;</span><span class="token operator">:</span><span class="token string">&quot;Operating Systems Concepts&quot;</span><span class="token punctuation">,</span>
                <span class="token string-property property">&quot;marks&quot;</span><span class="token operator">:</span><span class="token number">40</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">{</span>
                <span class="token string-property property">&quot;subjectId&quot;</span><span class="token operator">:</span><span class="token number">124</span><span class="token punctuation">,</span>
                <span class="token string-property property">&quot;subjectName&quot;</span><span class="token operator">:</span><span class="token string">&quot;Numerical Analysis&quot;</span><span class="token punctuation">,</span>
                <span class="token string-property property">&quot;marks&quot;</span><span class="token operator">:</span><span class="token number">60</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
        <span class="token string-property property">&quot;studentId&quot;</span><span class="token operator">:</span> <span class="token number">1024</span><span class="token punctuation">,</span>
        <span class="token string-property property">&quot;studentName&quot;</span><span class="token operator">:</span><span class="token string">&quot;Chris Overton&quot;</span><span class="token punctuation">,</span>
        <span class="token string-property property">&quot;joiningYear&quot;</span><span class="token operator">:</span><span class="token string">&quot;2018&quot;</span><span class="token punctuation">,</span>
        <span class="token string-property property">&quot;totalMarks&quot;</span><span class="token operator">:</span><span class="token number">110</span><span class="token punctuation">,</span>
        <span class="token string-property property">&quot;subjectDetails&quot;</span><span class="token operator">:</span><span class="token punctuation">[</span>
            <span class="token punctuation">{</span>
                <span class="token string-property property">&quot;subjectId&quot;</span><span class="token operator">:</span><span class="token number">123</span><span class="token punctuation">,</span>
                <span class="token string-property property">&quot;subjectName&quot;</span><span class="token operator">:</span><span class="token string">&quot;Operating Systems Concepts&quot;</span><span class="token punctuation">,</span>
                <span class="token string-property property">&quot;marks&quot;</span><span class="token operator">:</span><span class="token number">50</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">{</span>
                <span class="token string-property property">&quot;subjectId&quot;</span><span class="token operator">:</span><span class="token number">124</span><span class="token punctuation">,</span>
                <span class="token string-property property">&quot;subjectName&quot;</span><span class="token operator">:</span><span class="token string">&quot;Numerical Analysis&quot;</span><span class="token punctuation">,</span>
                <span class="token string-property property">&quot;marks&quot;</span><span class="token operator">:</span><span class="token number">60</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>成功插入后，上述查询将返回以下响应：</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">&quot;acknowledged&quot;</span> <span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token property">&quot;insertedIds&quot;</span> <span class="token operator">:</span> <span class="token punctuation">[</span>
        ObjectId(<span class="token string">&quot;622300cc85e943405d04b567&quot;</span>)<span class="token punctuation">,</span>
        ObjectId(<span class="token string">&quot;622300cc85e943405d04b568&quot;</span>)
    <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>到目前为止，我们已经成功地将一些示例文档插入到集合 <em>marks</em> 中。</p><h2 id="_3-理解问题" tabindex="-1"><a class="header-anchor" href="#_3-理解问题"><span>3. 理解问题</span></a></h2><p>为了理解问题，我们首先需要理解我们刚刚插入的文档。它包括学生详细信息以及他们在不同科目中获得的分数。<em>totalMarks</em> 是在不同科目中获得的分数的总和。</p><p>让我们考虑一种情况，我们希望在 <em>subjectDetails</em> 数组中添加一个新的科目。为了使数据一致，我们还需要更新 <em>totalMarks</em> 字段。</p><p>在 MongoDB 中，首先我们使用 <em>$push</em> 操作符将新科目添加到数组中。然后我们使用 <em>$set</em> 操作符将 <em>totalMarks</em> 字段设置为特定值。</p><p>这两个操作可以使用 <em>$push</em> 和 <em>$set</em> 操作符分别单独执行。但我们可以使用 MongoDB 查询将这两个操作一起执行。</p><h2 id="_4-使用-mongodb-shell-查询" tabindex="-1"><a class="header-anchor" href="#_4-使用-mongodb-shell-查询"><span>4. 使用 MongoDB Shell 查询</span></a></h2><p>在 MongoDB 中，我们可以使用不同的更新操作符更新文档的多个字段。在这里，我们将在 <em>updateOne</em> 查询中一起使用 <em>$push</em> 和 <em>$set</em> 操作符。</p><p>让我们看一下包含 <em>$push</em> 和 <em>$set</em> 操作符的示例：</p><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code>db<span class="token punctuation">.</span>marks<span class="token punctuation">.</span><span class="token function">updateOne</span><span class="token punctuation">(</span>
    <span class="token punctuation">{</span>
        <span class="token string-property property">&quot;studentId&quot;</span><span class="token operator">:</span> <span class="token number">1023</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
        <span class="token literal-property property">$set</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">totalMarks</span><span class="token operator">:</span> <span class="token number">170</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token literal-property property">$push</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token string-property property">&quot;subjectDetails&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span> 
                <span class="token string-property property">&quot;subjectId&quot;</span><span class="token operator">:</span> <span class="token number">126</span><span class="token punctuation">,</span>
                <span class="token string-property property">&quot;subjectName&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Java Programming&quot;</span><span class="token punctuation">,</span>
                <span class="token string-property property">&quot;marks&quot;</span><span class="token operator">:</span> <span class="token number">70</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，上述查询中，我们基于 <em>studentId</em> 进行了过滤查询。一旦我们获得过滤后的文档，我们则使用 $set 操作符更新 <em>totalMarks</em>。此外，我们使用 <em>$push</em> 操作符将新科目数据插入到 <em>subjectDetails</em> 数组中。</p><p>结果，上述查询将返回以下输出：</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">&quot;acknowledged&quot;</span><span class="token operator">:</span><span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token property">&quot;matchedCount&quot;</span><span class="token operator">:</span><span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token property">&quot;modifiedCount&quot;</span><span class="token operator">:</span><span class="token number">1</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里，<em>matchedCount</em> 包含匹配过滤器的文档计数，而 <em>modifiedCount</em> 包含修改的文档数量。</p><h2 id="_5-java-驱动代码" tabindex="-1"><a class="header-anchor" href="#_5-java-驱动代码"><span>5. Java 驱动代码</span></a></h2><p>到目前为止，我们讨论了使用 <em>$push</em> 和 <em>$set</em> 操作符的 mongo shell 查询。这里，我们将学习如何使用 Java 驱动代码实现相同的操作。</p><p>在我们继续之前，让我们首先连接到数据库和所需的集合：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">MongoClient</span> mongoClient <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MongoClient</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">MongoClientURI</span><span class="token punctuation">(</span><span class="token string">&quot;localhost&quot;</span><span class="token punctuation">,</span> <span class="token number">27017</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">MongoDatabase</span> database <span class="token operator">=</span> mongoClient<span class="token punctuation">.</span><span class="token function">getDatabase</span><span class="token punctuation">(</span><span class="token string">&quot;baeldung&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">MongoCollection</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Document</span><span class="token punctuation">&gt;</span></span>\` collection <span class="token operator">=</span> database<span class="token punctuation">.</span><span class="token function">getCollection</span><span class="token punctuation">(</span><span class="token string">&quot;marks&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们连接到在 localhost 上运行的 MongoDB，默认端口为 27017。</p><p>现在，让我们看看 Java 驱动代码：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Document</span> subjectData <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Document</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot;subjectId&quot;</span><span class="token punctuation">,</span> <span class="token number">126</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot;subjectName&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Java Programming&quot;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot;marks&quot;</span><span class="token punctuation">,</span> <span class="token number">70</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">UpdateResult</span> updateQueryResult <span class="token operator">=</span> collection<span class="token punctuation">.</span><span class="token function">updateOne</span><span class="token punctuation">(</span><span class="token class-name">Filters</span><span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span><span class="token string">&quot;studentId&quot;</span><span class="token punctuation">,</span> <span class="token number">1023</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token class-name">Updates</span><span class="token punctuation">.</span><span class="token function">combine</span><span class="token punctuation">(</span><span class="token class-name">Updates</span><span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">&quot;totalMarks&quot;</span><span class="token punctuation">,</span> <span class="token number">170</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token class-name">Updates</span><span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token string">&quot;subjectDetails&quot;</span><span class="token punctuation">,</span> subjectData<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这段代码中，我们使用了 <em>updateOne</em> 方法，该方法基于应用的过滤器 <em>studentId</em> 1023 更新单个文档。然后我们使用 <em>Updates.combine</em> 在单个调用中执行多个操作。字段 <em>totalMarks</em> 将更新为 170，并将新的文档 <em>subjectData</em> 推送到数组字段 <em>“subjectDetails”</em>。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们理解了在单个 MongoDB 查询中一起应用多个操作的用例。进一步地，我们使用 MongoDB shell 查询和 Java 驱动代码执行了相同的操作。</p><p>一如既往，所有示例的源代码和代码片段都可以在 GitHub 上找到。</p>`,37),o=[p];function c(l,i){return a(),s("div",null,o)}const d=n(e,[["render",c],["__file","2024-07-20-Push and Set Operations in Same MongoDB Update.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-07-20/2024-07-20-Push%20and%20Set%20Operations%20in%20Same%20MongoDB%20Update.html","title":"MongoDB中同一更新操作中的Push和Set操作","lang":"zh-CN","frontmatter":{"date":"2024-07-21T00:00:00.000Z","category":["MongoDB","Java"],"tag":["MongoDB","Java","Update","$push","$set"],"head":[["meta",{"name":"keywords","content":"MongoDB, Java, Update, $push, $set"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-20/2024-07-20-Push%20and%20Set%20Operations%20in%20Same%20MongoDB%20Update.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"MongoDB中同一更新操作中的Push和Set操作"}],["meta",{"property":"og:description","content":"MongoDB中同一更新操作中的Push和Set操作 1. 概述 $push 是 MongoDB 中的一个更新操作符，用于在数组中添加值。相比之下，$set 操作符用于更新文档中现有字段的值。 在这个简短的教程中，我们将介绍如何在单个更新查询中同时执行 $push 和 $set 操作。 2. 数据库初始化 在我们开始执行多个更新操作之前，我们首先需要设..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-20T20:40:43.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"MongoDB"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Update"}],["meta",{"property":"article:tag","content":"$push"}],["meta",{"property":"article:tag","content":"$set"}],["meta",{"property":"article:published_time","content":"2024-07-21T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-20T20:40:43.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"MongoDB中同一更新操作中的Push和Set操作\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-21T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-20T20:40:43.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"MongoDB中同一更新操作中的Push和Set操作 1. 概述 $push 是 MongoDB 中的一个更新操作符，用于在数组中添加值。相比之下，$set 操作符用于更新文档中现有字段的值。 在这个简短的教程中，我们将介绍如何在单个更新查询中同时执行 $push 和 $set 操作。 2. 数据库初始化 在我们开始执行多个更新操作之前，我们首先需要设..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 数据库初始化","slug":"_2-数据库初始化","link":"#_2-数据库初始化","children":[]},{"level":2,"title":"3. 理解问题","slug":"_3-理解问题","link":"#_3-理解问题","children":[]},{"level":2,"title":"4. 使用 MongoDB Shell 查询","slug":"_4-使用-mongodb-shell-查询","link":"#_4-使用-mongodb-shell-查询","children":[]},{"level":2,"title":"5. Java 驱动代码","slug":"_5-java-驱动代码","link":"#_5-java-驱动代码","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1721508043000,"updatedTime":1721508043000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.36,"words":1008},"filePathRelative":"posts/baeldung/2024-07-20/2024-07-20-Push and Set Operations in Same MongoDB Update.md","localizedDate":"2024年7月21日","excerpt":"<hr>\\n<h1>MongoDB中同一更新操作中的Push和Set操作</h1>\\n<h2>1. 概述</h2>\\n<p><em>$push</em> 是 MongoDB 中的一个更新操作符，用于在数组中添加值。相比之下，<em>$set</em> 操作符用于更新文档中现有字段的值。</p>\\n<p>在这个简短的教程中，我们将介绍如何在单个更新查询中同时执行 <em>$push</em> 和 <em>$set</em> 操作。</p>\\n<h2>2. 数据库初始化</h2>\\n<p>在我们开始执行多个更新操作之前，我们首先需要设置一个数据库 <em>baeldung</em> 和示例集合 <em>marks</em>：</p>","autoDesc":true}');export{d as comp,m as data};
