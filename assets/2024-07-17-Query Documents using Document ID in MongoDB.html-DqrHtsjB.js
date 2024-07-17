import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-YddbDb53.js";const p={},o=t('<h1 id="mongodb中使用文档id查询文档" tabindex="-1"><a class="header-anchor" href="#mongodb中使用文档id查询文档"><span>MongoDB中使用文档ID查询文档</span></a></h1><p>在本教程中，我们将探讨在MongoDB中使用文档ID执行查询操作。MongoDB提供了一个_find_操作符来从集合中查询文档。</p><p>首先，让我们看看在MongoDB Shell中使用文档ID查询文档，然后使用Java驱动程序代码。</p><h2 id="_2-mongodb文档的文档id是什么" tabindex="-1"><a class="header-anchor" href="#_2-mongodb文档的文档id是什么"><span>2. MongoDB文档的文档ID是什么？</span></a></h2><p>就像其他数据库管理系统一样，MongoDB要求每个存储在集合中的文档都有一个唯一的标识符。这个唯一的标识符作为集合的主键。</p><p>在MongoDB中，ID由12个字节组成：</p><ul><li>一个4字节的时间戳，表示ID的创建时间，以Unix纪元以来的秒数计算</li><li>一个5字节的随机生成值，对机器和进程是唯一的</li><li>一个3字节的递增计数器</li></ul><p>在MongoDB中，**ID存储在名为__id_的字段中，并由客户端生成。**因此，在将文档发送到数据库之前，应该生成ID。在客户端，我们可以使用驱动程序生成的ID或生成自定义ID。</p><p>唯一标识符存储在_ObjectId_类中。这个类提供了方便的方法来获取存储在ID中的数据，而不需要实际解析它。如果插入文档时没有指定__id_，MongoDB将添加__id_字段并为文档分配一个唯一的_ObjectId_。</p><h2 id="_3-数据库初始化" tabindex="-1"><a class="header-anchor" href="#_3-数据库初始化"><span>3. 数据库初始化</span></a></h2><p>首先，让我们设置一个新的数据库_baeldung_和一个样本集合，<em>vehicle</em>：</p><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code>use baeldung<span class="token punctuation">;</span>\ndb<span class="token punctuation">.</span><span class="token function">createCollection</span><span class="token punctuation">(</span><span class="token string">&quot;vehicle&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>进一步，让我们使用_insertMany_方法将一些文档添加到集合中：</p><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code>db<span class="token punctuation">.</span>vehicle<span class="token punctuation">.</span><span class="token function">insertMany</span><span class="token punctuation">(</span><span class="token punctuation">[</span>\n<span class="token punctuation">{</span>\n    <span class="token string-property property">&quot;companyName&quot;</span><span class="token operator">:</span><span class="token string">&quot;Skoda&quot;</span><span class="token punctuation">,</span>\n    <span class="token string-property property">&quot;modelName&quot;</span><span class="token operator">:</span><span class="token string">&quot;Octavia&quot;</span><span class="token punctuation">,</span>\n    <span class="token string-property property">&quot;launchYear&quot;</span><span class="token operator">:</span><span class="token number">2016</span><span class="token punctuation">,</span>\n    <span class="token string-property property">&quot;type&quot;</span><span class="token operator">:</span><span class="token string">&quot;Sports&quot;</span><span class="token punctuation">,</span>\n    <span class="token string-property property">&quot;registeredNo&quot;</span><span class="token operator">:</span><span class="token string">&quot;SKO 1134&quot;</span>\n<span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">{</span>\n    <span class="token string-property property">&quot;companyName&quot;</span><span class="token operator">:</span><span class="token string">&quot;BMW&quot;</span><span class="token punctuation">,</span>\n    <span class="token string-property property">&quot;modelName&quot;</span><span class="token operator">:</span><span class="token string">&quot;X5&quot;</span><span class="token punctuation">,</span>\n    <span class="token string-property property">&quot;launchYear&quot;</span><span class="token operator">:</span><span class="token number">2020</span><span class="token punctuation">,</span>\n    <span class="token string-property property">&quot;type&quot;</span><span class="token operator">:</span><span class="token string">&quot;SUV&quot;</span><span class="token punctuation">,</span>\n    <span class="token string-property property">&quot;registeredNo&quot;</span><span class="token operator">:</span><span class="token string">&quot;BMW 3325&quot;</span>\n<span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">{</span>\n    <span class="token string-property property">&quot;companyName&quot;</span><span class="token operator">:</span><span class="token string">&quot;Mercedes&quot;</span><span class="token punctuation">,</span>\n    <span class="token string-property property">&quot;modelName&quot;</span><span class="token operator">:</span><span class="token string">&quot;Maybach&quot;</span><span class="token punctuation">,</span>\n    <span class="token string-property property">&quot;launchYear&quot;</span><span class="token operator">:</span><span class="token number">2021</span><span class="token punctuation">,</span>\n    <span class="token string-property property">&quot;type&quot;</span><span class="token operator">:</span><span class="token string">&quot;Luxury&quot;</span><span class="token punctuation">,</span>\n    <span class="token string-property property">&quot;registeredNo&quot;</span><span class="token operator">:</span><span class="token string">&quot;MER 9754&quot;</span>\n<span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果插入成功，上述命令将打印类似于以下内容的JSON：</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>\n    <span class="token property">&quot;acknowledged&quot;</span> <span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>\n    <span class="token property">&quot;insertedIds&quot;</span> <span class="token operator">:</span> <span class="token punctuation">[</span>\n        ObjectId(<span class="token string">&quot;62d01d17cdd1b7c8a5f945b9&quot;</span>)<span class="token punctuation">,</span>\n        ObjectId(<span class="token string">&quot;62d01d17cdd1b7c8a5f945ba&quot;</span>)<span class="token punctuation">,</span>\n        ObjectId(<span class="token string">&quot;62d01d17cdd1b7c8a5f945bb&quot;</span>)\n    <span class="token punctuation">]</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们已经成功设置了数据库和集合。我们将使用这个数据库和集进行所有示例。</p><h2 id="_4-使用mongodb-shell" tabindex="-1"><a class="header-anchor" href="#_4-使用mongodb-shell"><span>4. 使用MongoDB Shell</span></a></h2><p>我们将使用_db.collection.find(query, projection)_方法从MongoDB查询文档。</p><p>首先，让我们编写一个查询，返回所有的_vehicle_集合文档：</p><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code>db<span class="token punctuation">.</span>vehicle<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上述查询返回所有文档：</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span> <span class="token property">&quot;_id&quot;</span> <span class="token operator">:</span> ObjectId(<span class="token string">&quot;62d01d17cdd1b7c8a5f945b9&quot;</span>)<span class="token punctuation">,</span> <span class="token property">&quot;companyName&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;Skoda&quot;</span><span class="token punctuation">,</span>\n    <span class="token property">&quot;modelName&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;Octavia&quot;</span><span class="token punctuation">,</span> <span class="token property">&quot;launchYear&quot;</span> <span class="token operator">:</span> <span class="token number">2016</span><span class="token punctuation">,</span> <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;Sports&quot;</span><span class="token punctuation">,</span> <span class="token property">&quot;registeredNo&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;SKO 1134&quot;</span> <span class="token punctuation">}</span>\n<span class="token punctuation">{</span> <span class="token property">&quot;_id&quot;</span> <span class="token operator">:</span> ObjectId(<span class="token string">&quot;62d01d17cdd1b7c8a5f945ba&quot;</span>)<span class="token punctuation">,</span> <span class="token property">&quot;companyName&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;BMW&quot;</span><span class="token punctuation">,</span>\n    <span class="token property">&quot;modelName&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;X5&quot;</span><span class="token punctuation">,</span> <span class="token property">&quot;launchYear&quot;</span> <span class="token operator">:</span> <span class="token number">2020</span><span class="token punctuation">,</span> <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;SUV&quot;</span><span class="token punctuation">,</span> <span class="token property">&quot;registeredNo&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;BMW 3325&quot;</span> <span class="token punctuation">}</span>\n<span class="token punctuation">{</span> <span class="token property">&quot;_id&quot;</span> <span class="token operator">:</span> ObjectId(<span class="token string">&quot;62d01d17cdd1b7c8a5f945bb&quot;</span>)<span class="token punctuation">,</span> <span class="token property">&quot;companyName&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;Mercedes&quot;</span><span class="token punctuation">,</span>\n    <span class="token property">&quot;modelName&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;Maybach&quot;</span><span class="token punctuation">,</span> <span class="token property">&quot;launchYear&quot;</span> <span class="token operator">:</span> <span class="token number">2021</span><span class="token punctuation">,</span> <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;Luxury&quot;</span><span class="token punctuation">,</span> <span class="token property">&quot;registeredNo&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;MER 9754&quot;</span> <span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>进一步，让我们编写一个查询，使用上面返回的结果中的ID获取_vehicle_集合文档：</p><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code>db<span class="token punctuation">.</span>vehicle<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span>\n<span class="token punctuation">{</span>\n    <span class="token string-property property">&quot;_id&quot;</span><span class="token operator">:</span> <span class="token function">ObjectId</span><span class="token punctuation">(</span><span class="token string">&quot;62d01d17cdd1b7c8a5f945b9&quot;</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述查询返回具有__id_等于_ObjectId(&quot;62d01d17cdd1b7c8a5f945b9&quot;)_的_vehicle_集合文档：</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span> <span class="token property">&quot;_id&quot;</span> <span class="token operator">:</span> ObjectId(<span class="token string">&quot;62d01d17cdd1b7c8a5f945b9&quot;</span>)<span class="token punctuation">,</span> <span class="token property">&quot;companyName&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;Skoda&quot;</span><span class="token punctuation">,</span>\n    <span class="token property">&quot;modelName&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;Octavia&quot;</span><span class="token punctuation">,</span> <span class="token property">&quot;launchYear&quot;</span> <span class="token operator">:</span> <span class="token number">2016</span><span class="token punctuation">,</span> <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;Sports&quot;</span><span class="token punctuation">,</span> <span class="token property">&quot;registeredNo&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;SKO 1134&quot;</span> <span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>此外，我们可以使用_in_查询操作符使用ID检索多个_vehicle_集合文档：</p><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code>db<span class="token punctuation">.</span>vehicle<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span>\n<span class="token punctuation">{</span>\n    <span class="token string-property property">&quot;_id&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n        $<span class="token keyword">in</span><span class="token operator">:</span> <span class="token punctuation">[</span>\n            <span class="token function">ObjectId</span><span class="token punctuation">(</span><span class="token string">&quot;62d01d17cdd1b7c8a5f945b9&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n            <span class="token function">ObjectId</span><span class="token punctuation">(</span><span class="token string">&quot;62d01d17cdd1b7c8a5f945ba&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n            <span class="token function">ObjectId</span><span class="token punctuation">(</span><span class="token string">&quot;62d01d17cdd1b7c8a5f945bb&quot;</span><span class="token punctuation">)</span>\n        <span class="token punctuation">]</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述查询返回_in_操作符中查询ID的所有_vehicle_集合文档：</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span> <span class="token property">&quot;_id&quot;</span> <span class="token operator">:</span> ObjectId(<span class="token string">&quot;62d01d17cdd1b7c8a5f945b9&quot;</span>)<span class="token punctuation">,</span> <span class="token property">&quot;companyName&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;Skoda&quot;</span><span class="token punctuation">,</span>\n    <span class="token property">&quot;modelName&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;Octavia&quot;</span><span class="token punctuation">,</span> <span class="token property">&quot;launchYear&quot;</span> <span class="token operator">:</span> <span class="token number">2016</span><span class="token punctuation">,</span> <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;Sports&quot;</span><span class="token punctuation">,</span> <span class="token property">&quot;registeredNo&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;SKO 1134&quot;</span> <span class="token punctuation">}</span>\n<span class="token punctuation">{</span> <span class="token property">&quot;_id&quot;</span> <span class="token operator">:</span> ObjectId(<span class="token string">&quot;62d01d17cdd1b7c8a5f945ba&quot;</span>)<span class="token punctuation">,</span> <span class="token property">&quot;companyName&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;BMW&quot;</span><span class="token punctuation">,</span>\n    <span class="token property">&quot;modelName&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;X5&quot;</span><span class="token punctuation">,</span> <span class="token property">&quot;launchYear&quot;</span> <span class="token operator">:</span> <span class="token number">2020</span><span class="token punctuation">,</span> <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;SUV&quot;</span><span class="token punctuation">,</span> <span class="token property">&quot;registeredNo&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;BMW 3325&quot;</span> <span class="token punctuation">}</span>\n<span class="token punctuation">{</span> <span class="token property">&quot;_id&quot;</span> <span class="token operator">:</span> ObjectId(<span class="token string">&quot;62d01d17cdd1b7c8a5f945bb&quot;</span>)<span class="token punctuation">,</span> <span class="token property">&quot;companyName&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;Mercedes&quot;</span><span class="token punctuation">,</span>\n    <span class="token property">&quot;modelName&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;Maybach&quot;</span><span class="token punctuation">,</span> <span class="token property">&quot;launchYear&quot;</span> <span class="token operator">:</span> <span class="token number">2021</span><span class="token punctuation">,</span> <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;Luxury&quot;</span><span class="token punctuation">,</span> <span class="token property">&quot;registeredNo&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;MER 9754&quot;</span> <span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同样，任何查询操作符都可以作为_find()_方法的过滤器与要查询的ID一起使用。</p><p>同样重要的是要注意，<strong>在使用__id_字段查询文档时，文档ID字符串值应该指定为_ObjectId()<em>而不是_String</em>。</strong></p><p>让我们尝试使用ID作为_String_值查询现有文档：</p><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code>db<span class="token punctuation">.</span>vehicle<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span>\n<span class="token punctuation">{</span>\n    <span class="token string-property property">&quot;_id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;62d01d17cdd1b7c8a5f945b9&quot;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>不幸的是，上述查询将不会返回任何文档，因为不存在ID为_String_值_62d01d17cdd1b7c8a5f945b9_的文档。</p><h2 id="_5-使用java驱动程序" tabindex="-1"><a class="header-anchor" href="#_5-使用java驱动程序"><span>5. 使用Java驱动程序</span></a></h2><p>到目前为止，我们已经学习了如何使用MongoDB Shell使用ID查询文档。现在让我们使用MongoDB Java驱动程序实现相同的操作。</p><p>在执行更新操作之前，让我们首先连接到_baeldung_数据库中的_vehicle_集合：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">MongoClient</span> mongoClient <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MongoClient</span><span class="token punctuation">(</span><span class="token string">&quot;localhost&quot;</span><span class="token punctuation">,</span> <span class="token number">27017</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">MongoDatabase</span> database <span class="token operator">=</span> mongoClient<span class="token punctuation">.</span><span class="token function">getDatabase</span><span class="token punctuation">(</span><span class="token string">&quot;baeldung&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">MongoCollection</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Document</span><span class="token punctuation">&gt;</span></span>``````` collection <span class="token operator">=</span> database<span class="token punctuation">.</span><span class="token function">getCollection</span><span class="token punctuation">(</span><span class="token string">&quot;vehicle&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们连接到在默认端口27017上运行的MongoDB。</p><p>首先，让我们编写使用ID查询文档的代码：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Bson</span> filter <span class="token operator">=</span> <span class="token class-name">Filters</span><span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span><span class="token string">&quot;_id&quot;</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">ObjectId</span><span class="token punctuation">(</span><span class="token string">&quot;62d01d17cdd1b7c8a5f945b9&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">FindIterable</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Document</span><span class="token punctuation">&gt;</span></span>``````` documents <span class="token operator">=</span> collection<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span>filter<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token class-name">MongoCursor</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Document</span><span class="token punctuation">&gt;</span></span>``````` cursor <span class="token operator">=</span> documents<span class="token punctuation">.</span><span class="token function">iterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">while</span> <span class="token punctuation">(</span>cursor<span class="token punctuation">.</span><span class="token function">hasNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>cursor<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们向_find()<em>方法传递一个_Bson_过滤器作为参数，使用</em>_id_字段进行查询。上述代码片段将返回__id_等于_ObjectId(&quot;62d01d17cdd1b7c8a5f945b9&quot;)_的_vehicle_集合文档。</p><p>进一步，让我们编写一个代码片段，使用多个ID查询文档：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Bson</span> filter <span class="token operator">=</span> <span class="token class-name">Filters</span><span class="token punctuation">.</span><span class="token function">in</span><span class="token punctuation">(</span><span class="token string">&quot;_id&quot;</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">ObjectId</span><span class="token punctuation">(</span><span class="token string">&quot;62d01d17cddb7c8a5f945b9&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n  <span class="token keyword">new</span> <span class="token class-name">ObjectId</span><span class="token punctuation">(</span><span class="token string">&quot;62d01d17cdd1b7c8a5f945ba&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">FindIterable</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Document</span><span class="token punctuation">&gt;</span></span>``````` documents <span class="token operator">=</span> collection<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span>filter<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token class-name">MongoCursor</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Document</span><span class="token punctuation">&gt;</span></span>``````` cursor <span class="token operator">=</span> documents<span class="token punctuation">.</span><span class="token function">iterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">while</span> <span class="token punctuation">(</span>cursor<span class="token punctuation">.</span><span class="token function">hasNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>cursor<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述查询将返回所有查询ID的_vehicle_集合文档。</p><p>最后，让我们尝试使用驱动程序生成的ID查询_vehicle_集合：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Bson</span> filter <span class="token operator">=</span> <span class="token class-name">Filters</span><span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span><span class="token string">&quot;_id&quot;</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">ObjectId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">FindIterable</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Document</span><span class="token punctuation">&gt;</span></span>``````` documents <span class="token operator">=</span> collection<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span>filter<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token class-name">MongoCursor</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Document</span><span class="token punctuation">&gt;</span></span>``````` cursor <span class="token operator">=</span> documents<span class="token punctuation">.</span><span class="token function">iterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">while</span> <span class="token punctuation">(</span>cursor<span class="token punctuation">.</span><span class="token function">hasNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>cursor<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述查询将不会返回任何文档，因为集合中不存在具有新生成ID的文档。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们学习了如何在MongoDB中使用文档ID查询文档。首先，我们研究了在MongoDB Shell查询中的这些用例，然后我们讨论了相应的Java驱动程序代码。</p><p>所有这些示例和代码片段的实现都可以在GitHub上找到。 OK</p>',53),e=[o];function c(l,u){return a(),s("div",null,e)}const d=n(p,[["render",c],["__file","2024-07-17-Query Documents using Document ID in MongoDB.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-17/2024-07-17-Query%20Documents%20using%20Document%20ID%20in%20MongoDB.html","title":"MongoDB中使用文档ID查询文档","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["MongoDB","Java"],"tag":["MongoDB","Java","Database"],"head":[["meta",{"name":"keywords","content":"MongoDB, Java, Database, Query, Document ID"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-17/2024-07-17-Query%20Documents%20using%20Document%20ID%20in%20MongoDB.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"MongoDB中使用文档ID查询文档"}],["meta",{"property":"og:description","content":"MongoDB中使用文档ID查询文档 在本教程中，我们将探讨在MongoDB中使用文档ID执行查询操作。MongoDB提供了一个_find_操作符来从集合中查询文档。 首先，让我们看看在MongoDB Shell中使用文档ID查询文档，然后使用Java驱动程序代码。 2. MongoDB文档的文档ID是什么？ 就像其他数据库管理系统一样，MongoDB..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-17T02:11:46.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"MongoDB"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Database"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-17T02:11:46.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"MongoDB中使用文档ID查询文档\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-17T02:11:46.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"MongoDB中使用文档ID查询文档 在本教程中，我们将探讨在MongoDB中使用文档ID执行查询操作。MongoDB提供了一个_find_操作符来从集合中查询文档。 首先，让我们看看在MongoDB Shell中使用文档ID查询文档，然后使用Java驱动程序代码。 2. MongoDB文档的文档ID是什么？ 就像其他数据库管理系统一样，MongoDB..."},"headers":[{"level":2,"title":"2. MongoDB文档的文档ID是什么？","slug":"_2-mongodb文档的文档id是什么","link":"#_2-mongodb文档的文档id是什么","children":[]},{"level":2,"title":"3. 数据库初始化","slug":"_3-数据库初始化","link":"#_3-数据库初始化","children":[]},{"level":2,"title":"4. 使用MongoDB Shell","slug":"_4-使用mongodb-shell","link":"#_4-使用mongodb-shell","children":[]},{"level":2,"title":"5. 使用Java驱动程序","slug":"_5-使用java驱动程序","link":"#_5-使用java驱动程序","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1721182306000,"updatedTime":1721182306000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.53,"words":1360},"filePathRelative":"posts/baeldung/2024-07-17/2024-07-17-Query Documents using Document ID in MongoDB.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在本教程中，我们将探讨在MongoDB中使用文档ID执行查询操作。MongoDB提供了一个_find_操作符来从集合中查询文档。</p>\\n<p>首先，让我们看看在MongoDB Shell中使用文档ID查询文档，然后使用Java驱动程序代码。</p>\\n<h2>2. MongoDB文档的文档ID是什么？</h2>\\n<p>就像其他数据库管理系统一样，MongoDB要求每个存储在集合中的文档都有一个唯一的标识符。这个唯一的标识符作为集合的主键。</p>\\n<p>在MongoDB中，ID由12个字节组成：</p>\\n<ul>\\n<li>一个4字节的时间戳，表示ID的创建时间，以Unix纪元以来的秒数计算</li>\\n<li>一个5字节的随机生成值，对机器和进程是唯一的</li>\\n<li>一个3字节的递增计数器</li>\\n</ul>","autoDesc":true}');export{d as comp,k as data};
