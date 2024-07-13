import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-DkA39C0B.js";const e={},o=t('<h1 id="在java中向现有mongodb-bson过滤器添加字段" tabindex="-1"><a class="header-anchor" href="#在java中向现有mongodb-bson过滤器添加字段"><span>在Java中向现有MongoDB BSON过滤器添加字段</span></a></h1><p>MongoDB是一个流行的分布式、开源的NoSQL文档存储引擎。它基本上是一个将数据存储在称为BSON（二进制JavaScript对象表示）的JSON格式类型的数据库。MongoDB中以BSON数据存储的文档被组织成集合。</p><p>在本教程中，我们将讨论可以用于向现有MongoDB BSON过滤器添加字段的不同方法。然后，我们将使用MongoDB Java驱动程序来检查它们的相应实现。</p><h2 id="_2-数据库初始化" tabindex="-1"><a class="header-anchor" href="#_2-数据库初始化"><span>2. 数据库初始化</span></a></h2><p>在我们继续之前，让我们首先创建一个新的数据库和一个示例集合。我们将使用这些来演示我们所有的代码示例。</p><p>让我们创建一个名为_baeldung_的数据库：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>use baeldung<span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这条命令将为我们创建一个新的空数据库_baeldung_，如果它还不存在的话。</p><p>进一步地，让我们在新创建的数据库中创建一个名为_pet_的集合：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>db<span class="token punctuation">.</span><span class="token function">createCollection</span><span class="token punctuation">(</span><span class="token string">&quot;pet&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>有了这个，我们的示例_baeldung_数据库和_pet_集合就成功设置好了。</p><p>最后，让我们向_pet_集合添加一些示例数据：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>db<span class="token punctuation">.</span>pet<span class="token punctuation">.</span><span class="token function">insertMany</span><span class="token punctuation">(</span><span class="token punctuation">[</span>\n<span class="token punctuation">{</span>\n    <span class="token string">&quot;petId&quot;</span><span class="token operator">:</span><span class="token string">&quot;P1&quot;</span><span class="token punctuation">,</span>\n    <span class="token string">&quot;name&quot;</span><span class="token operator">:</span><span class="token string">&quot;Tom&quot;</span><span class="token punctuation">,</span>\n    <span class="token string">&quot;age&quot;</span><span class="token operator">:</span><span class="token number">3</span><span class="token punctuation">,</span>\n    <span class="token string">&quot;type&quot;</span><span class="token operator">:</span><span class="token string">&quot;Cat&quot;</span><span class="token punctuation">,</span>\n    <span class="token string">&quot;gender&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Female&quot;</span>\n<span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">{</span>\n    <span class="token string">&quot;petId&quot;</span><span class="token operator">:</span><span class="token string">&quot;P2&quot;</span><span class="token punctuation">,</span>\n    <span class="token string">&quot;name&quot;</span><span class="token operator">:</span><span class="token string">&quot;Max&quot;</span><span class="token punctuation">,</span>\n    <span class="token string">&quot;age&quot;</span><span class="token operator">:</span><span class="token number">4</span><span class="token punctuation">,</span>\n    <span class="token string">&quot;type&quot;</span><span class="token operator">:</span><span class="token string">&quot;Dog&quot;</span><span class="token punctuation">,</span>\n    <span class="token string">&quot;gender&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Male&quot;</span>\n<span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">{</span>\n    <span class="token string">&quot;petId&quot;</span><span class="token operator">:</span><span class="token string">&quot;P3&quot;</span><span class="token punctuation">,</span>\n    <span class="token string">&quot;name&quot;</span><span class="token operator">:</span><span class="token string">&quot;Milo&quot;</span><span class="token punctuation">,</span>\n    <span class="token string">&quot;age&quot;</span><span class="token operator">:</span><span class="token number">8</span><span class="token punctuation">,</span>\n    <span class="token string">&quot;type&quot;</span><span class="token operator">:</span><span class="token string">&quot;Dog&quot;</span><span class="token punctuation">,</span>\n    <span class="token string">&quot;gender&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Male&quot;</span>\n<span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述脚本成功插入后将返回一个JSON结果：</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>\n    <span class="token property">&quot;acknowledged&quot;</span> <span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>\n    <span class="token property">&quot;insertedIds&quot;</span> <span class="token operator">:</span> <span class="token punctuation">[</span>\n        ObjectId(<span class="token string">&quot;64007c0a2b07cc62bfe6accc&quot;</span>)<span class="token punctuation">,</span>\n        ObjectId(<span class="token string">&quot;64007c0a2b07cc62bfe6accd&quot;</span>)<span class="token punctuation">,</span>\n        ObjectId(<span class="token string">&quot;64007c0a2b07cc62bfe6acce&quot;</span>)\n    <span class="token punctuation">]</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在让我们深入理解如何向现有BSON过滤器添加字段。</p><p>我们将使用_Filters_构建器向现有_Filter_添加字段。构建器是由MongoDB Java驱动程序提供的类，将帮助我们构建BSON对象。</p><p>_Filters_类在Java中提供了所有MongoDB查询操作符的静态工厂方法。这些方法中的每一个都将返回一个_Bson_类型的实例。然后我们可以将这个_Bson_对象传递给任何期望查询过滤器的方法。</p><p>请注意，由于_Filter_是不可变的，我们不能直接编辑它们。我们将不得不使用一些过滤器操作符通过应用现有过滤器来创建一个新的_Bson_ <em>Filter</em>。</p><p>具体来说，我们将使用_Filters.and()_方法执行添加操作。<strong>_Filters.and()_方法基本上创建了一个过滤器，它对提供的过滤器列表执行逻辑AND操作。</strong></p><p>我们可以通过以下两种方式实现这一点：</p><ol><li>使用_BsonDocument_</li><li>使用_Filters_</li></ol><p>现在让我们深入每种方法。</p><h3 id="_3-1-使用-bsondocument" tabindex="-1"><a class="header-anchor" href="#_3-1-使用-bsondocument"><span>3.1. 使用_BsonDocument_</span></a></h3><p>通过这种方法，我们将首先将现有的_Bson_过滤器转换为_BsonDocument_。然后，我们将向这个_BsonDocument_添加所需的字段。</p><p>首先，假设我们有一个过滤器，它返回所有_pet_集合中类型为“Dog”的文档：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Bson</span> existingFilter <span class="token operator">=</span> <span class="token function">eq</span><span class="token punctuation">(</span><span class="token string">&quot;type&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Dog&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">BsonDocument</span> existingBsonDocument <span class="token operator">=</span> existingFilter<span class="token punctuation">.</span><span class="token function">toBsonDocument</span><span class="token punctuation">(</span><span class="token class-name">BsonDocument</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token class-name">MongoClient</span><span class="token punctuation">.</span><span class="token function">getDefaultCodecRegistry</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>我们已将过滤器转换为_BsonDocument_类型。</p><p>其次，假设我们现在想要向此过滤器添加一个字段，使得宠物的年龄超过5岁。我们将为此字段创建一个_Bson_过滤器，并将其转换为一个_BsonDocument_对象：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Bson</span> newFilter <span class="token operator">=</span> <span class="token function">gt</span><span class="token punctuation">(</span><span class="token string">&quot;age&quot;</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">BsonDocument</span> newBsonDocument <span class="token operator">=</span> newFilter<span class="token punctuation">.</span><span class="token function">toBsonDocument</span><span class="token punctuation">(</span><span class="token class-name">BsonDocument</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token class-name">MongoClient</span><span class="token punctuation">.</span><span class="token function">getDefaultCodecRegistry</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，我们将新字段附加到现有的_BsonDocument_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>existingBsonDocument<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot;age&quot;</span><span class="token punctuation">,</span> newBsonDocument<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;age&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token class-name">FindIterable</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Document</span><span class="token punctuation">&gt;</span></span>`````` documents <span class="token operator">=</span> collection<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span>existingBsonDocument<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token class-name">MongoCursor</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Document</span><span class="token punctuation">&gt;</span></span>`````` cursor <span class="token operator">=</span> documents<span class="token punctuation">.</span><span class="token function">iterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">while</span> <span class="token punctuation">(</span>cursor<span class="token punctuation">.</span><span class="token function">hasNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>cursor<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><em>BsonDocument.append()<em>方法接受一个键和一个_BsonValue</em>，然后将它们附加到现有的_BsonDocument</em>。然后我们可以使用生成的_BsonDocument_从MongoDB集合中查询文档。</p><h3 id="_3-2-使用-filters" tabindex="-1"><a class="header-anchor" href="#_3-2-使用-filters"><span>3.2. 使用_Filters_</span></a></h3><p>这种方法直接使用_Filters_添加字段，而不需要先将它们转换为_BsonDocument_。</p><p>假设我们有一个过滤器，它返回所有_pet_集合中类型为“Dog”且性别为“Male”的文档：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Bson</span> existingFilter <span class="token operator">=</span> <span class="token function">and</span><span class="token punctuation">(</span><span class="token function">eq</span><span class="token punctuation">(</span><span class="token string">&quot;type&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Dog&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">eq</span><span class="token punctuation">(</span><span class="token string">&quot;gender&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Male&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">FindIterable</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Document</span><span class="token punctuation">&gt;</span></span>`````` documents <span class="token operator">=</span> collection<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span>existingFilter<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token class-name">MongoCursor</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Document</span><span class="token punctuation">&gt;</span></span>`````` cursor <span class="token operator">=</span> documents<span class="token punctuation">.</span><span class="token function">iterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">while</span> <span class="token punctuation">(</span>cursor<span class="token punctuation">.</span><span class="token function">hasNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>cursor<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述代码片段将打印出所有符合我们条件的_pet_集合文档：</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code>Document<span class="token punctuation">{</span>_id=64007c0a2b07cc62bfe6accd<span class="token punctuation">,</span> petId=P2<span class="token punctuation">,</span> name=Max<span class="token punctuation">,</span> age=<span class="token number">4.0</span><span class="token punctuation">,</span> type=Dog<span class="token punctuation">,</span> gender=Male<span class="token punctuation">}</span>\nDocument<span class="token punctuation">{</span>_id=64007c0a2b07cc62bfe6acce<span class="token punctuation">,</span> petId=P3<span class="token punctuation">,</span> name=Milo<span class="token punctuation">,</span> age=<span class="token number">8.0</span><span class="token punctuation">,</span> type=Dog<span class="token punctuation">,</span> gender=Male<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>假设我们现在想要修改这个过滤器，添加一个条件，使得宠物的年龄大于5岁。我们使用_Filters.and()_方法，它接受现有的过滤器和要添加的新字段作为参数。</p><p>让我们看看Java实现代码：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Bson</span> existingFilter <span class="token operator">=</span> <span class="token function">and</span><span class="token punctuation">(</span><span class="token function">eq</span><span class="token punctuation">(</span><span class="token string">&quot;type&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Dog&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">eq</span><span class="token punctuation">(</span><span class="token string">&quot;gender&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Male&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token class-name">Bson</span> newFilter <span class="token operator">=</span> <span class="token function">and</span><span class="token punctuation">(</span>existingFilter<span class="token punctuation">,</span> <span class="token function">gt</span><span class="token punctuation">(</span><span class="token string">&quot;age&quot;</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">FindIterable</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Document</span><span class="token punctuation">&gt;</span></span>`````` documents <span class="token operator">=</span> collection<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span>newFilter<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token class-name">MongoCursor</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Document</span><span class="token punctuation">&gt;</span></span>`````` cursor <span class="token operator">=</span> documents<span class="token punctuation">.</span><span class="token function">iterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">while</span> <span class="token punctuation">(</span>cursor<span class="token punctuation">.</span><span class="token function">hasNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>cursor<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述代码片段将通过向现有过滤器添加所需字段的条件来创建一个新的_Bson_过滤器。我们可以使用新字段以及MongoDB中的任何可用过滤器操作符。现在，代码片段将打印出所有_type_等于“Dog”，_gender_等于“Male”，并且_age_大于5的_pet_集合文档：</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code>Document<span class="token punctuation">{</span>_id=64007c0a2b07cc62bfe6acce<span class="token punctuation">,</span> petId=P3<span class="token punctuation">,</span> name=Milo<span class="token punctuation">,</span> age=<span class="token number">8.0</span><span class="token punctuation">,</span> type=Dog<span class="token punctuation">,</span> gender=Male<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这是向现有_Bson_ _Filter_添加字段的最方便的方法。</p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们看到了向现有_Bson_ _Filter_添加字段的各种方式。然后，我们使用相应的Java驱动程序代码实现讨论了这些用例。</p><p>使用Java驱动程序代码，我们首先查看了使用_BsonDocument_类的实现。然后，我们学习了如何直接使用_Filters_类来实现相同的操作。</p><p>如常，所有示例的完整代码都可以在GitHub上找到。</p><p><a href="https://www.baeldung.com" target="_blank" rel="noopener noreferrer"><img src="https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg" alt="Baeldung Logo" loading="lazy"></a><a href="https://www.baeldung.com/" target="_blank" rel="noopener noreferrer"><img src="https://secure.gravatar.com/avatar/8761915a15b52dde955019cbd6ba4312?s=50&amp;r=g" alt="Gravatar Image" loading="lazy"></a><a href="https://www.baeldung.com/" target="_blank" rel="noopener noreferrer"><img src="https://secure.gravatar.com/avatar/629fdde67cb23f9d3799635d89c7b250?s=50&amp;r=g" alt="Gravatar Image" loading="lazy"></a><a href="https://www.baeldung.com/" target="_blank" rel="noopener noreferrer"><img src="https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png" alt="Announcement Icon" loading="lazy"></a><a href="https://www.baeldung.com/" target="_blank" rel="noopener noreferrer"><img src="https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-persistence-post-footer-main-1.2.0.jpg" alt="Baeldung Persistence Post Footer" loading="lazy"></a><a href="https://www.baeldung.com/" target="_blank" rel="noopener noreferrer"><img src="https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-persistence-post-footer-icn-1.0.0.png" alt="Baeldung Persistence Post Footer Icon" loading="lazy"></a></p><p>OK</p>',51),p=[o];function c(l,i){return a(),s("div",null,p)}const d=n(e,[["render",c],["__file","2024-07-08-Add Field to an Existing MongoDB Bson Filter in Java.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-08/2024-07-08-Add%20Field%20to%20an%20Existing%20MongoDB%20Bson%20Filter%20in%20Java.html","title":"在Java中向现有MongoDB BSON过滤器添加字段","lang":"zh-CN","frontmatter":{"date":"2024-07-08T00:00:00.000Z","category":["MongoDB","Java"],"tag":["BSON","Filter","Java Driver"],"head":[["meta",{"name":"MongoDB BSON Filter","content":"介绍如何在Java中使用MongoDB的BSON过滤器添加字段。"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-08/2024-07-08-Add%20Field%20to%20an%20Existing%20MongoDB%20Bson%20Filter%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Java中向现有MongoDB BSON过滤器添加字段"}],["meta",{"property":"og:description","content":"在Java中向现有MongoDB BSON过滤器添加字段 MongoDB是一个流行的分布式、开源的NoSQL文档存储引擎。它基本上是一个将数据存储在称为BSON（二进制JavaScript对象表示）的JSON格式类型的数据库。MongoDB中以BSON数据存储的文档被组织成集合。 在本教程中，我们将讨论可以用于向现有MongoDB BSON过滤器添加字..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-08T10:42:40.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"BSON"}],["meta",{"property":"article:tag","content":"Filter"}],["meta",{"property":"article:tag","content":"Java Driver"}],["meta",{"property":"article:published_time","content":"2024-07-08T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-08T10:42:40.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Java中向现有MongoDB BSON过滤器添加字段\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg\\",\\"https://secure.gravatar.com/avatar/8761915a15b52dde955019cbd6ba4312?s=50&r=g\\",\\"https://secure.gravatar.com/avatar/629fdde67cb23f9d3799635d89c7b250?s=50&r=g\\",\\"https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png\\",\\"https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-persistence-post-footer-main-1.2.0.jpg\\",\\"https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-persistence-post-footer-icn-1.0.0.png\\"],\\"datePublished\\":\\"2024-07-08T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-08T10:42:40.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Java中向现有MongoDB BSON过滤器添加字段 MongoDB是一个流行的分布式、开源的NoSQL文档存储引擎。它基本上是一个将数据存储在称为BSON（二进制JavaScript对象表示）的JSON格式类型的数据库。MongoDB中以BSON数据存储的文档被组织成集合。 在本教程中，我们将讨论可以用于向现有MongoDB BSON过滤器添加字..."},"headers":[{"level":2,"title":"2. 数据库初始化","slug":"_2-数据库初始化","link":"#_2-数据库初始化","children":[{"level":3,"title":"3.1. 使用_BsonDocument_","slug":"_3-1-使用-bsondocument","link":"#_3-1-使用-bsondocument","children":[]},{"level":3,"title":"3.2. 使用_Filters_","slug":"_3-2-使用-filters","link":"#_3-2-使用-filters","children":[]}]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1720435360000,"updatedTime":1720435360000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.88,"words":1465},"filePathRelative":"posts/baeldung/2024-07-08/2024-07-08-Add Field to an Existing MongoDB Bson Filter in Java.md","localizedDate":"2024年7月8日","excerpt":"\\n<p>MongoDB是一个流行的分布式、开源的NoSQL文档存储引擎。它基本上是一个将数据存储在称为BSON（二进制JavaScript对象表示）的JSON格式类型的数据库。MongoDB中以BSON数据存储的文档被组织成集合。</p>\\n<p>在本教程中，我们将讨论可以用于向现有MongoDB BSON过滤器添加字段的不同方法。然后，我们将使用MongoDB Java驱动程序来检查它们的相应实现。</p>\\n<h2>2. 数据库初始化</h2>\\n<p>在我们继续之前，让我们首先创建一个新的数据库和一个示例集合。我们将使用这些来演示我们所有的代码示例。</p>\\n<p>让我们创建一个名为_baeldung_的数据库：</p>","autoDesc":true}');export{d as comp,k as data};
