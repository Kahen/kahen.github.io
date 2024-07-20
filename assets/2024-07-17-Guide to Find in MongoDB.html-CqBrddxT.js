import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as n,a as i}from"./app-DfO5Xg_k.js";const o={},a=i('<hr><h1 id="mongodb中查找指南" tabindex="-1"><a class="header-anchor" href="#mongodb中查找指南"><span>MongoDB中查找指南</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在本教程中，我们将探讨执行搜索操作以检索MongoDB中的文档。MongoDB提供了一个_find_操作符，用于从集合中查询文档。<strong>_find_操作符的主要目的是根据查询条件从集合中选择文档，并返回一个游标到所选文档。</strong></p><p>在本教程中，我们首先将查看MongoDB Shell查询中的_find_操作符，然后使用Java驱动代码。</p><h2 id="_2-数据库初始化" tabindex="-1"><a class="header-anchor" href="#_2-数据库初始化"><span>2. 数据库初始化</span></a></h2><p>在我们继续执行_find_操作之前，我们首先需要设置一个名为_baeldung_的数据库和一个示例集合_employee_：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>db.employee.insertMany([\n{\n    &quot;employeeId&quot;:&quot;EMP1&quot;,\n    &quot;name&quot;:&quot;Sam&quot;,\n    &quot;age&quot;:23,\n    &quot;type&quot;:&quot;Full Time&quot;,\n    &quot;department&quot;:&quot;Engineering&quot;\n},\n{\n    &quot;employeeId&quot;:&quot;EMP2&quot;,\n    &quot;name&quot;:&quot;Tony&quot;,\n    &quot;age&quot;:31,\n    &quot;type&quot;:&quot;Full Time&quot;,\n    &quot;department&quot;:&quot;Admin&quot;\n},\n{\n    &quot;employeeId&quot;:&quot;EMP3&quot;,\n    &quot;name&quot;:&quot;Lisa&quot;,\n    &quot;age&quot;:42,\n    &quot;type&quot;:&quot;Part Time&quot;,\n    &quot;department&quot;:&quot;Engineering&quot;\n}]);\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述查询成功插入后，将返回类似于以下内容的JSON结果：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>{\n    &quot;acknowledged&quot; : true,\n    &quot;insertedIds&quot; : [\n        ObjectId(&quot;62a88223ff0a77909323a7fa&quot;),\n        ObjectId(&quot;62a88223ff0a77909323a7fb&quot;),\n        ObjectId(&quot;62a88223ff0a77909323a7fc&quot;)\n    ]\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时，我们已经将一些文档插入到我们的集合中，以执行各种类型的_find_操作。</p><h2 id="_3-使用mongodb-shell" tabindex="-1"><a class="header-anchor" href="#_3-使用mongodb-shell"><span>3. 使用MongoDB Shell</span></a></h2><p>要从MongoDB集合中查询文档，我们使用_db.collection.find(query, projection)_方法。该方法接受两个可选参数——<em>query_和_projection</em>——作为MongoDB BSON文档。</p><p>_query_参数接受带有查询操作符的选择过滤器。要检索MongoDB集合中的所有文档，我们可以省略此参数或传递一个空白文档。</p><p>接下来，_projection_参数用于指定从匹配文档中返回的字段。要返回匹配文档中的所有字段，我们可以省略此参数。</p><p>让我们从基本的_find_查询开始，该查询将返回所有集合文档：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>db.employee.find({});\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上述查询将返回_employee_集合中的所有文档：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>{ &quot;_id&quot; : ObjectId(&quot;62a88223ff0a77909323a7fa&quot;), &quot;employeeId&quot; : &quot;1&quot;, &quot;name&quot; : &quot;Sam&quot;, &quot;age&quot; : 23, &quot;type&quot; : &quot;Full Time&quot;, &quot;department&quot; : &quot;Engineering&quot; }\n{ &quot;_id&quot; : ObjectId(&quot;62a88223ff0a77909323a7fb&quot;), &quot;employeeId&quot; : &quot;2&quot;, &quot;name&quot; : &quot;Tony&quot;, &quot;age&quot; : 31, &quot;type&quot; : &quot;Full Time&quot;, &quot;department&quot; : &quot;Admin&quot; }\n{ &quot;_id&quot; : ObjectId(&quot;62a88223ff0a77909323a7fc&quot;), &quot;employeeId&quot; : &quot;3&quot;, &quot;name&quot; : &quot;Ray&quot;, &quot;age&quot; : 42, &quot;type&quot; : &quot;Part Time&quot;, &quot;department&quot; : &quot;Engineering&quot; }\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们编写一个查询，返回所有属于“Engineering”部门的员工：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>db.employee.find(\n{\n    &quot;department&quot;:&quot;Engineering&quot;\n});\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述查询返回所有_employee_集合文档，其中_department_等于“Engineering”：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>{ &quot;_id&quot; : ObjectId(&quot;62a88223ff0a77909323a7fa&quot;), &quot;employeeId&quot; : &quot;1&quot;, &quot;name&quot; : &quot;Sam&quot;, &quot;age&quot; : 23, &quot;type&quot; : &quot;Full Time&quot;, &quot;department&quot; : &quot;Engineering&quot; }\n{ &quot;_id&quot; : ObjectId(&quot;62a88223ff0a77909323a7fc&quot;), &quot;employeeId&quot; : &quot;3&quot;, &quot;name&quot; : &quot;Ray&quot;, &quot;age&quot; : 42, &quot;type&quot; : &quot;Part Time&quot;, &quot;department&quot; : &quot;Engineering&quot; }\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，让我们编写一个查询，获取属于“Engineering”部门的所有员工的_name_和_age_字段：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>db.employee.find(\n{\n    &quot;department&quot;:&quot;Engineering&quot;\n},\n{\n    &quot;name&quot;:1,\n    &quot;age&quot;:1\n});\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述查询仅返回与查询条件匹配的文档的_name_和_age_字段：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>{ &quot;_id&quot; : ObjectId(&quot;62a88223ff0a77909323a7fa&quot;), &quot;name&quot; : &quot;Sam&quot;, &quot;age&quot; : 23 }\n{ &quot;_id&quot; : ObjectId(&quot;62a88223ff0a77909323a7fc&quot;), &quot;name&quot; : &quot;Ray&quot;, &quot;age&quot; : 42 }\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>注意，默认情况下，所有文档中都会返回_id_字段，除非明确排除。</p><p>还需要注意的是，_find_操作符返回一个游标到与查询过滤器匹配的文档。MongoDB Shell自动迭代游标以显示最多20个文档。</p><p>此外，MongoDB Shell还提供了一个_findOne()_方法，该方法仅返回满足提到的查询条件的一个文档。如果有多个文档匹配，将根据磁盘上文档的自然顺序返回第一个文档：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>db.employee.findOne();\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>与_find()_不同，上述查询将仅返回一个文档而不是游标：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>{\n    &quot;_id&quot; : ObjectId(&quot;62a99e22a849e1472c440bbf&quot;),\n    &quot;employeeId&quot; : &quot;EMP1&quot;,\n    &quot;name&quot; : &quot;Sam&quot;,\n    &quot;age&quot; : 23,\n    &quot;type&quot; : &quot;Full Time&quot;,\n    &quot;department&quot; : &quot;Engineering&quot;\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-使用java驱动" tabindex="-1"><a class="header-anchor" href="#_4-使用java驱动"><span>4. 使用Java驱动</span></a></h2><p>到目前为止，我们已经看到了如何使用MongoDB Shell执行_find_操作。接下来，让我们使用MongoDB Java驱动实现相同的操作。在我们开始之前，让我们首先创建一个_MongoClient_连接到_employee_集合：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>MongoClient mongoClient = new MongoClient(&quot;localhost&quot;, 27017);\nMongoDatabase database = mongoClient.getDatabase(&quot;baeldung&quot;);\nMongoCollection`````````&lt;Document&gt;````````` collection = database.getCollection(&quot;employee&quot;);\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们创建了一个连接到默认端口27017上运行的MongoDB服务器的连接。接下来，我们从连接中创建的_MongoDatabase_实例中获取_MongoCollection_的实例。</p><p>首先，要执行_find_操作，我们调用_MongoCollection_实例上的_find()_方法。让我们检查一下代码，以从集合中检索所有文档：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>FindIterable`````````&lt;Document&gt;````````` documents = collection.find();\nMongoCursor`````````&lt;Document&gt;````````` cursor = documents.iterator();\nwhile (cursor.hasNext()) {\n    System.out.println(cursor.next());\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意，_find()_方法返回一个_FindIterable<code>&lt;Document&gt;</code>_实例。然后我们通过调用_FindIterable_的_iterator()_方法获取_MongoCursor_的实例。最后，我们迭代游标以检索每个文档。</p><p>接下来，让我们添加查询操作符来过滤_find_操作返回的文档：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Bson filter = Filters.eq(&quot;department&quot;, &quot;Engineering&quot;);\nFindIterable`````````&lt;Document&gt;````````` documents = collection.find(filter);\n\nMongoCursor`````````&lt;Document&gt;````````` cursor = documents.iterator();\nwhile (cursor.hasNext()) {\n    System.out.println(cursor.next());\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们将一个_Bson_过滤器作为参数传递给_find()_方法。我们可以使用任何组合的查询操作符作为_find()_方法的过滤器。上述代码片段将返回所有_department_等于“Engineering”的文档。</p><p>进一步，让我们编写一个代码片段，仅从匹配选择标准的文档中返回_name_和_age_字段：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Bson filter = Filters.eq(&quot;department&quot;, &quot;Engineering&quot;);\nBson projection = Projections.fields(Projections.include(&quot;name&quot;, &quot;age&quot;));\nFindIterable`````````&lt;Document&gt;````````` documents = collection.find(filter)\n  .projection(projection);\n\nMongoCursor`````````&lt;Document&gt;````````` cursor = documents.iterator();\nwhile (cursor.hasNext()) {\n    System.out.println(cursor.next());\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们在_FindIterable_实例上调用_projection()_方法。我们将一个_Bson_过滤器作为参数传递给_projection()_方法。我们可以使用_projection_操作包含或排除最终结果中的任何字段。作为直接使用MongoDB驱动和_Bson_的替代方案，请查看我们的Spring Data MongoDB投影指南。</p><p>最后，我们可以使用_FindIterable_实例上的_first()_方法检索结果中的第一个文档。这返回一个单一的文档而不是_MongoCursor_实例：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>FindIterable`````````&lt;Document&gt;````````` documents = collection.find();\nDocument document = documents.first();\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们学习了使用各种方法在MongoDB中执行_find_操作。我们执行_find_以检索符合选择标准的特定文档，使用查询操作符。此外，我们还学习了执行_projection_以确定匹配文档中返回哪些字段。</p><p>首先，我们</p>',51),d=[a];function u(l,s){return n(),t("div",null,d)}const m=e(o,[["render",u],["__file","2024-07-17-Guide to Find in MongoDB.html.vue"]]),v=JSON.parse('{"path":"/posts/baeldung/2024-07-17/2024-07-17-Guide%20to%20Find%20in%20MongoDB.html","title":"MongoDB中查找指南","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["MongoDB","Java"],"tag":["MongoDB","Java Driver","find","query"],"head":[["meta",{"name":"keywords","content":"MongoDB find, Java Driver, MongoDB 查询"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-17/2024-07-17-Guide%20to%20Find%20in%20MongoDB.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"MongoDB中查找指南"}],["meta",{"property":"og:description","content":"MongoDB中查找指南 1. 概述 在本教程中，我们将探讨执行搜索操作以检索MongoDB中的文档。MongoDB提供了一个_find_操作符，用于从集合中查询文档。_find_操作符的主要目的是根据查询条件从集合中选择文档，并返回一个游标到所选文档。 在本教程中，我们首先将查看MongoDB Shell查询中的_find_操作符，然后使用Java驱..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-17T14:30:35.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"MongoDB"}],["meta",{"property":"article:tag","content":"Java Driver"}],["meta",{"property":"article:tag","content":"find"}],["meta",{"property":"article:tag","content":"query"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-17T14:30:35.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"MongoDB中查找指南\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-17T14:30:35.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"MongoDB中查找指南 1. 概述 在本教程中，我们将探讨执行搜索操作以检索MongoDB中的文档。MongoDB提供了一个_find_操作符，用于从集合中查询文档。_find_操作符的主要目的是根据查询条件从集合中选择文档，并返回一个游标到所选文档。 在本教程中，我们首先将查看MongoDB Shell查询中的_find_操作符，然后使用Java驱..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 数据库初始化","slug":"_2-数据库初始化","link":"#_2-数据库初始化","children":[]},{"level":2,"title":"3. 使用MongoDB Shell","slug":"_3-使用mongodb-shell","link":"#_3-使用mongodb-shell","children":[]},{"level":2,"title":"4. 使用Java驱动","slug":"_4-使用java驱动","link":"#_4-使用java驱动","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1721226635000,"updatedTime":1721226635000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.84,"words":1452},"filePathRelative":"posts/baeldung/2024-07-17/2024-07-17-Guide to Find in MongoDB.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>MongoDB中查找指南</h1>\\n<h2>1. 概述</h2>\\n<p>在本教程中，我们将探讨执行搜索操作以检索MongoDB中的文档。MongoDB提供了一个_find_操作符，用于从集合中查询文档。<strong>_find_操作符的主要目的是根据查询条件从集合中选择文档，并返回一个游标到所选文档。</strong></p>\\n<p>在本教程中，我们首先将查看MongoDB Shell查询中的_find_操作符，然后使用Java驱动代码。</p>\\n<h2>2. 数据库初始化</h2>\\n<p>在我们继续执行_find_操作之前，我们首先需要设置一个名为_baeldung_的数据库和一个示例集合_employee_：</p>","autoDesc":true}');export{m as comp,v as data};
