import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-BMOUrRO4.js";const p={},e=t(`<h1 id="mongodb中在对象内插入数组-baeldung" tabindex="-1"><a class="header-anchor" href="#mongodb中在对象内插入数组-baeldung"><span>MongoDB中在对象内插入数组 | Baeldung</span></a></h1><p>MongoDB 是最受欢迎的开源分布式文档导向型NoSQL数据库。MongoDB中的一个文档是一个具有字段和值对的JSON类对象的数据结构。</p><p>为了将文档插入MongoDB集合中，我们可以使用不同的方法，如_insert()_、_insertOne()<em>和_insertMany()</em>。</p><p>本教程将讨论如何在MongoDB文档中插入数组。首先，我们将查看如何使用MongoDB Shell查询将数组插入文档。然后，我们将使用MongoDB Java驱动程序代码。</p><h2 id="_2-数据库初始化" tabindex="-1"><a class="header-anchor" href="#_2-数据库初始化"><span>2. 数据库初始化</span></a></h2><p>在我们继续插入查询之前，让我们首先创建一个数据库。让我们称它为_baeldung_。我们还将创建一个名为_student_的示例集合：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>use baeldung<span class="token punctuation">;</span>
db.createCollection<span class="token punctuation">(</span>student<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>通过这个命令，我们的示例_baeldung_数据库和_student_集合已成功设置。我们将在所有示例中使用它们。</p><h2 id="_3-使用mongodb-shell" tabindex="-1"><a class="header-anchor" href="#_3-使用mongodb-shell"><span>3. 使用MongoDB Shell</span></a></h2><p><strong>要使用MongoDB Shell将数组插入集合，我们可以简单地将数组作为JSON数组类型传递给shell：</strong></p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>db.student.insert<span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token string">&quot;studentId&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;STU1&quot;</span>,
    <span class="token string">&quot;name&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;Avin&quot;</span>,
    <span class="token string">&quot;Age&quot;</span> <span class="token builtin class-name">:</span> <span class="token number">12</span>,
    <span class="token string">&quot;courses&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">[</span><span class="token string">&quot;Science&quot;</span>, <span class="token string">&quot;Math&quot;</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述查询在_student_集合中插入了一个带有数组的单个文档。我们可以通过使用_find_操作符查询_student_集合中的文档来验证结果：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>db.student.find<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上述查询返回插入的_student_集合文档：</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">&quot;_id&quot;</span> <span class="token operator">:</span> ObjectId(<span class="token string">&quot;631da4197581ba6bc1d2524d&quot;</span>)<span class="token punctuation">,</span>
    <span class="token property">&quot;studentId&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;STU1&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;name&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;Avin&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;Age&quot;</span> <span class="token operator">:</span> <span class="token number">12</span><span class="token punctuation">,</span>
    <span class="token property">&quot;courses&quot;</span> <span class="token operator">:</span> <span class="token punctuation">[</span> <span class="token string">&quot;Science&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Math&quot;</span> <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-使用java驱动程序代码进行插入操作" tabindex="-1"><a class="header-anchor" href="#_4-使用java驱动程序代码进行插入操作"><span>4. 使用Java驱动程序代码进行插入操作</span></a></h2><p>MongoDB Java驱动程序提供了各种便捷的方法来帮助我们将文档插入集合：</p><ul><li><em>insert()</em> – 向集合中插入单个文档或多个文档</li><li><em>insertOne()</em> – 向集合中插入单个文档</li><li><em>insertMany()</em> – 向集合中插入多个文档</li></ul><p>上述任何方法都以用来对MongoDB集合执行_insert_操作。</p><p>接下来，让我们深入了解使用Java MongoDB驱动程序实现数组插入操作。MongoDB Java驱动程序支持_DBObject_和_BSON_文档。</p><h2 id="_5-使用-dbobject" tabindex="-1"><a class="header-anchor" href="#_5-使用-dbobject"><span>5. 使用_DBObject_</span></a></h2><p>这里，<strong>_DBObject_是MongoDB旧版驱动程序的一部分，但在较新的MongoDB版本中已被弃用。</strong></p><p>让我们将一个带有数组的_DBObject_文档插入到_student_集合中：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">BasicDBList</span> coursesList <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BasicDBList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
coursesList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&quot;Chemistry&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
coursesList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&quot;Science&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">DBObject</span> student <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BasicDBObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot;studentId&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;STU1&quot;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Jim&quot;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot;age&quot;</span><span class="token punctuation">,</span> <span class="token number">13</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot;courses&quot;</span><span class="token punctuation">,</span> coursesList<span class="token punctuation">)</span><span class="token punctuation">;</span>

dbCollection<span class="token punctuation">.</span><span class="token function">insert</span><span class="token punctuation">(</span>student<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述查询将一个带有数组的_DBObject_文档插入到_student_集合中。</p><h2 id="_6-使用-bson-文档" tabindex="-1"><a class="header-anchor" href="#_6-使用-bson-文档"><span>6. 使用_BSON_文档</span></a></h2><p>_BSON_文档是在Java中访问MongoDB文档的新方式，并且是使用较新的客户端堆栈构建的。幸运的是，它也更易于使用。</p><p><strong>Java驱动程序提供了一个_org.bson.Document_类，用于将一个_Bson_文档对象带有数组插入到_student_集合中。</strong></p><h3 id="_6-1-插入一个带有数组的单个文档" tabindex="-1"><a class="header-anchor" href="#_6-1-插入一个带有数组的单个文档"><span>6.1. 插入一个带有数组的单个文档</span></a></h3><p>首先，让我们使用_insertOne()_方法将一个带有数组的单个文档插入到集合中：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\`\` coursesList <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
coursesList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&quot;Science&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
coursesList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&quot;Geography&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">Document</span> student <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Document</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot;studentId&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;STU2&quot;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Sam&quot;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot;age&quot;</span><span class="token punctuation">,</span> <span class="token number">13</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot;courses&quot;</span><span class="token punctuation">,</span> coursesList<span class="token punctuation">)</span><span class="token punctuation">;</span>

collection<span class="token punctuation">.</span><span class="token function">insertOne</span><span class="token punctuation">(</span>student<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述查询将一个带有数组的单个文档插入到_student_集合中。重要的是要注意，_Document_类的_append(String, Object)_方法接受一个_Object_作为值。我们可以将任何_Object_类型的_List_作为值传递，将其作为数组插入到文档中。</p><h3 id="_6-2-插入多个带有数组的文档" tabindex="-1"><a class="header-anchor" href="#_6-2-插入多个带有数组的文档"><span>6.2. 插入多个带有数组的文档</span></a></h3><p>让我们使用_insertMany()_方法将多个带有数组的文档插入到集合中：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\`\` coursesList1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
coursesList1<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&quot;Chemistry&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
coursesList1<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&quot;Geography&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">Document</span> student1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Document</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot;studentId&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;STU3&quot;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Sarah&quot;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot;age&quot;</span><span class="token punctuation">,</span> <span class="token number">12</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot;courses&quot;</span><span class="token punctuation">,</span> coursesList1<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">List</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\`\` coursesList2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
coursesList2<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&quot;Math&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
coursesList2<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&quot;History&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">Document</span> student2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Document</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot;studentId&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;STU4&quot;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Tom&quot;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot;age&quot;</span><span class="token punctuation">,</span> <span class="token number">13</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot;courses&quot;</span><span class="token punctuation">,</span> coursesList2<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">List</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Document</span><span class="token punctuation">&gt;</span></span>\`\` students <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
students<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>student1<span class="token punctuation">)</span><span class="token punctuation">;</span>
students<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>student2<span class="token punctuation">)</span><span class="token punctuation">;</span>

collection<span class="token punctuation">.</span><span class="token function">insertMany</span><span class="token punctuation">(</span>students<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述查询将多个带有数组的文档插入到_student_集合中。</p><h3 id="_6-3-插入一个对象数组" tabindex="-1"><a class="header-anchor" href="#_6-3-插入一个对象数组"><span>6.3. 插入一个对象数组</span></a></h3><p>最后，让我们将一个对象数组类型的文档插入到MongoDB集合中：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Document</span> course1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Document</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;C1&quot;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot;points&quot;</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">Document</span> course2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Document</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;C2&quot;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot;points&quot;</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">List</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Document</span><span class="token punctuation">&gt;</span></span>\`\` coursesList <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
coursesList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>course1<span class="token punctuation">)</span><span class="token punctuation">;</span>
coursesList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>course2<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">Document</span> student <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Document</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot;studentId&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;STU5&quot;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Sam&quot;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot;age&quot;</span><span class="token punctuation">,</span> <span class="token number">13</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot;courses&quot;</span><span class="token punctuation">,</span> coursesList<span class="token punctuation">)</span><span class="token punctuation">;</span>

collection<span class="token punctuation">.</span><span class="token function">insertOne</span><span class="token punctuation">(</span>student<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述查询将多个带有对象数组的文档插入到_student_集合中。在这里，我们插入了一个包含文档列表作为数组的文档到集合中。同样，我们可以构建任何复杂的数组对象并将其插入到MongoDB集合中。</p><h2 id="_7-结论" tabindex="-1"><a class="header-anchor" href="#_7-结论"><span>7. 结论</span></a></h2><p>在本文中，我们看到了将带有数组对象的文档插入MongoDB集合的多种方式。我们使用MongoDB Shell查询以及相应的Java驱动程序代码实现来讨论了这些用例。</p><p>使用Java驱动程序代码，我们首先查看了使用已弃用的_DBObject_类的实现。然后，我们学习了如何使用新的_BSON_文档类来实现相同的操作。</p><p>所有这些示例和代码片段的实现都可以在GitHub上找到。</p>`,44),o=[e];function c(u,i){return a(),s("div",null,o)}const d=n(p,[["render",c],["__file","2024-07-14-Insert Array Inside an Object in MongoDB.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-14/2024-07-14-Insert%20Array%20Inside%20an%20Object%20in%20MongoDB.html","title":"MongoDB中在对象内插入数组 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-07-14T00:00:00.000Z","category":["Java","MongoDB"],"tag":["MongoDB Shell","Java Driver","Document","Array"],"head":[["meta",{"name":"keywords","content":"MongoDB, Java, Array, Document, NoSQL"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-14/2024-07-14-Insert%20Array%20Inside%20an%20Object%20in%20MongoDB.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"MongoDB中在对象内插入数组 | Baeldung"}],["meta",{"property":"og:description","content":"MongoDB中在对象内插入数组 | Baeldung MongoDB 是最受欢迎的开源分布式文档导向型NoSQL数据库。MongoDB中的一个文档是一个具有字段和值对的JSON类对象的数据结构。 为了将文档插入MongoDB集合中，我们可以使用不同的方法，如_insert()_、_insertOne()和_insertMany()。 本教程将讨论如何..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-14T03:47:12.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"MongoDB Shell"}],["meta",{"property":"article:tag","content":"Java Driver"}],["meta",{"property":"article:tag","content":"Document"}],["meta",{"property":"article:tag","content":"Array"}],["meta",{"property":"article:published_time","content":"2024-07-14T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-14T03:47:12.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"MongoDB中在对象内插入数组 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-14T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-14T03:47:12.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"MongoDB中在对象内插入数组 | Baeldung MongoDB 是最受欢迎的开源分布式文档导向型NoSQL数据库。MongoDB中的一个文档是一个具有字段和值对的JSON类对象的数据结构。 为了将文档插入MongoDB集合中，我们可以使用不同的方法，如_insert()_、_insertOne()和_insertMany()。 本教程将讨论如何..."},"headers":[{"level":2,"title":"2. 数据库初始化","slug":"_2-数据库初始化","link":"#_2-数据库初始化","children":[]},{"level":2,"title":"3. 使用MongoDB Shell","slug":"_3-使用mongodb-shell","link":"#_3-使用mongodb-shell","children":[]},{"level":2,"title":"4. 使用Java驱动程序代码进行插入操作","slug":"_4-使用java驱动程序代码进行插入操作","link":"#_4-使用java驱动程序代码进行插入操作","children":[]},{"level":2,"title":"5. 使用_DBObject_","slug":"_5-使用-dbobject","link":"#_5-使用-dbobject","children":[]},{"level":2,"title":"6. 使用_BSON_文档","slug":"_6-使用-bson-文档","link":"#_6-使用-bson-文档","children":[{"level":3,"title":"6.1. 插入一个带有数组的单个文档","slug":"_6-1-插入一个带有数组的单个文档","link":"#_6-1-插入一个带有数组的单个文档","children":[]},{"level":3,"title":"6.2. 插入多个带有数组的文档","slug":"_6-2-插入多个带有数组的文档","link":"#_6-2-插入多个带有数组的文档","children":[]},{"level":3,"title":"6.3. 插入一个对象数组","slug":"_6-3-插入一个对象数组","link":"#_6-3-插入一个对象数组","children":[]}]},{"level":2,"title":"7. 结论","slug":"_7-结论","link":"#_7-结论","children":[]}],"git":{"createdTime":1720928832000,"updatedTime":1720928832000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.26,"words":1277},"filePathRelative":"posts/baeldung/2024-07-14/2024-07-14-Insert Array Inside an Object in MongoDB.md","localizedDate":"2024年7月14日","excerpt":"\\n<p>MongoDB 是最受欢迎的开源分布式文档导向型NoSQL数据库。MongoDB中的一个文档是一个具有字段和值对的JSON类对象的数据结构。</p>\\n<p>为了将文档插入MongoDB集合中，我们可以使用不同的方法，如_insert()_、_insertOne()<em>和_insertMany()</em>。</p>\\n<p>本教程将讨论如何在MongoDB文档中插入数组。首先，我们将查看如何使用MongoDB Shell查询将数组插入文档。然后，我们将使用MongoDB Java驱动程序代码。</p>\\n<h2>2. 数据库初始化</h2>\\n<p>在我们继续插入查询之前，让我们首先创建一个数据库。让我们称它为_baeldung_。我们还将创建一个名为_student_的示例集合：</p>","autoDesc":true}');export{d as comp,k as data};
