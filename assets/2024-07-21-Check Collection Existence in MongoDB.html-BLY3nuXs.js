import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as n,a}from"./app-C4eFoh0f.js";const o={},l=a(`<h1 id="mongodb中检查集合存在性的多种方法" tabindex="-1"><a class="header-anchor" href="#mongodb中检查集合存在性的多种方法"><span>MongoDB中检查集合存在性的多种方法</span></a></h1><p>MongoDB 是一种 NoSQL 数据库，它将数据记录以 BSON 文档的形式存储到集合中。我们可以拥有多个数据库，每个数据库可以有一个或多个文档集合。</p><p>与关系型数据库不同，MongoDB 在插入文档时会自动创建集合，无需任何结构定义。在本教程中，我们将学习检查集合存在性的多种方法。我们将使用 collectionExists、createCollection、listCollectionNames 和 count 方法来检查集合是否存在。</p><h3 id="_2-1-使用-mongoclient-创建连接" tabindex="-1"><a class="header-anchor" href="#_2-1-使用-mongoclient-创建连接"><span>2.1. 使用 <em>MongoClient</em> 创建连接</span></a></h3><p><em>MongoClient</em> 是一个 Java 类，用于与 MongoDB 实例建立连接：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>MongoClient mongoClient = MongoClients.create(&quot;mongodb://localhost:27017&quot;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这里，我们连接到在本地主机上运行的 MongoDB，使用的是默认端口 27017。</p><h3 id="_2-2-连接到数据库" tabindex="-1"><a class="header-anchor" href="#_2-2-连接到数据库"><span>2.2. 连接到数据库</span></a></h3><p>现在，让我们使用 <em>MongoClient</em> 对象来访问数据库。有几种方法可以使用 <em>MongoClient</em> 访问数据库。</p><p>首先，我们将使用 getDatabase 方法访问 <em>baeldung</em> 数据库：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>MongoDatabase database = mongoClient.getDatabase(&quot;baeldung&quot;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们也可以使用 Mongo Java 驱动程序的 getDB 方法连接到数据库：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>MongoDatabase db = mongoClient.getDatabase(&quot;baeldung&quot;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>getDB 方法已被弃用，因此不建议使用。</p><p>到目前为止，我们已经使用 MongoClient 设置了与 MongoDB 的连接，并进一步连接到了 <em>baeldung</em> 数据库。</p><p>让我们深入研究在 MongoDB 中检查集合存在的不同方法。</p><h3 id="_3-使用-db-类" tabindex="-1"><a class="header-anchor" href="#_3-使用-db-类"><span>3. 使用 <em>DB</em> 类</span></a></h3><p>MongoDB Java 驱动程序提供了同步和异步方法调用。为了连接到数据库，我们只需要指定数据库名称。<strong>如果数据库不存在，MongoDB 会自动创建一个。</strong></p><p>collectionExists 方法在较新版本中不存在，因此我们基于 listCollectionNames() 创建了一个检查集合是否存在的工作方式：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>MongoClient mongoClient = MongoClients.create(&quot;mongodb://localhost:27017&quot;);
MongoDatabase db = mongoClient.getDatabase(&quot;baeldung&quot;);
String testCollectionName = &quot;student&quot;;
System.out.println(&quot;Collection Name &quot; + testCollectionName + &quot; &quot; + db.listCollectionNames().into(new ArrayList&lt;&gt;()).contains(testCollectionName));
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里，listCollectioNames 方法将返回所有集合，然后与所需的集合进行匹配。</p><p><strong>MongoDB Java 驱动程序的 com.mongodb.DB API 从 3.x 版本开始已被弃用，但仍然可以访问。</strong> 因此，不建议在新项目中使用 DB 类。</p><h3 id="_4-使用-mongodatabase-类" tabindex="-1"><a class="header-anchor" href="#_4-使用-mongodatabase-类"><span>4. 使用 <em>MongoDatabase</em> 类</span></a></h3><p>com.mongodb.client.MongoDatabase 是 Mongo 3.x 及以上版本的更新 API。与 DB 类不同，MongoDatabase 类没有提供任何特定方法来检查集合的存在。但是，我们可以使用各种方法来获得所需的结果。</p><h4 id="_4-1-使用-createcollection-方法" tabindex="-1"><a class="header-anchor" href="#_4-1-使用-createcollection-方法"><span>4.1. 使用 <em>createCollection</em> 方法</span></a></h4><p>createCollection 方法在 MongoDB 中创建一个新集合。但我们也可以使用它来检查集合是否存在：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>String databaseName=&quot;baeldung&quot;;
MongoDatabase database = mongoClient.getDatabase(databaseName);
String testCollectionName = &quot;student&quot;;
try {
    database.createCollection(testCollectionName);
} catch (Exception exception) {
    System.err.println(&quot;Collection:- &quot; + testCollectionName + &quot; already Exists&quot;);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述代码将在数据库中创建一个新的 <em>student</em> 集合（如果它尚未存在）。如果集合已经存在，createCollection 方法将抛出异常。</p><p><strong>这种方法不推荐使用，因为它会在数据库中创建一个新的集合。</strong></p><h4 id="_4-2-使用-listcollectionnames-方法" tabindex="-1"><a class="header-anchor" href="#_4-2-使用-listcollectionnames-方法"><span>4.2. 使用 <em>listCollectionNames</em> 方法</span></a></h4><p>listCollectionNames 方法列出了数据库中的所有集合名称。因此，我们可以使用此方法来解决集合存在性的问题。</p><p>让我们现在看看使用 Java 驱动程序代码的 listCollectionNames 方法的示例代码：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>String databaseName=&quot;baeldung&quot;;
MongoDatabase database = mongoClient.getDatabase(databaseName);
String testCollectionName = &quot;student&quot;;
boolean collectionExists = database.listCollectionNames()
  .into(new ArrayList()).contains(testCollectionName);
System.out.println(&quot;collectionExists:- &quot; + collectionExists);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们遍历了数据库 <em>baeldung</em> 中所有集合名称的列表。对于每次出现，我们将集合字符串名称与 testCollectionName 进行匹配。如果成功匹配，它将返回 true，否则返回 false。</p><h4 id="_4-3-使用-count-方法" tabindex="-1"><a class="header-anchor" href="#_4-3-使用-count-方法"><span>4.3. 使用 <em>count</em> 方法</span></a></h4><p>MongoCollection 的 count 方法统计集合中存在的文档数量。</p><p>作为一种替代方案，我们可以使用这种方法来检查集合的存在。以下是相同的 Java 代码片段：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>String databaseName=&quot;baeldung&quot;;
MongoDatabase database = mongoClient.getDatabase(databaseName);
String testCollectionName = &quot;student&quot;;
MongoCollection\`&lt;Document&gt;\` collection = database.getCollection(testCollectionName);
Boolean collectionExists = collection.countDocuments() &gt; 0 ? true : false;
System.out.println(&quot;collectionExists:- &quot; + collectionExists);
Boolean expectedStatus = false;
assertEquals(expectedStatus, collectionExists);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果集合存在但没有数据，这种方法将不起作用。在这种情况下，它将返回 0，但集合存在且数据为空。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span><strong>5. 结论</strong></span></a></h2><p>在本文中，我们探索了使用 MongoDatabase 和 DB 类方法检查集合存在性的各种方式。</p><p>简而言之，推荐使用 com.mongodb.DB 类的 collectionExists 方法和 com.mongodb.client.MongoDatabase 的 listCollectionNames 方法来检查集合的存在。</p><p>如常，所有示例的源代码和代码片段都可以在 GitHub 上找到。</p>`,43),i=[l];function s(c,d){return n(),t("div",null,i)}const g=e(o,[["render",s],["__file","2024-07-21-Check Collection Existence in MongoDB.html.vue"]]),u=JSON.parse('{"path":"/posts/baeldung/2024-07-21/2024-07-21-Check%20Collection%20Existence%20in%20MongoDB.html","title":"MongoDB中检查集合存在性的多种方法","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","MongoDB"],"tag":["MongoDB","Java"],"head":[["meta",{"name":"keywords","content":"MongoDB, Java, 集合存在性检查"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-21/2024-07-21-Check%20Collection%20Existence%20in%20MongoDB.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"MongoDB中检查集合存在性的多种方法"}],["meta",{"property":"og:description","content":"MongoDB中检查集合存在性的多种方法 MongoDB 是一种 NoSQL 数据库，它将数据记录以 BSON 文档的形式存储到集合中。我们可以拥有多个数据库，每个数据库可以有一个或多个文档集合。 与关系型数据库不同，MongoDB 在插入文档时会自动创建集合，无需任何结构定义。在本教程中，我们将学习检查集合存在性的多种方法。我们将使用 collect..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-21T02:21:58.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"MongoDB"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-21T02:21:58.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"MongoDB中检查集合存在性的多种方法\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-21T02:21:58.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"MongoDB中检查集合存在性的多种方法 MongoDB 是一种 NoSQL 数据库，它将数据记录以 BSON 文档的形式存储到集合中。我们可以拥有多个数据库，每个数据库可以有一个或多个文档集合。 与关系型数据库不同，MongoDB 在插入文档时会自动创建集合，无需任何结构定义。在本教程中，我们将学习检查集合存在性的多种方法。我们将使用 collect..."},"headers":[{"level":3,"title":"2.1. 使用 MongoClient 创建连接","slug":"_2-1-使用-mongoclient-创建连接","link":"#_2-1-使用-mongoclient-创建连接","children":[]},{"level":3,"title":"2.2. 连接到数据库","slug":"_2-2-连接到数据库","link":"#_2-2-连接到数据库","children":[]},{"level":3,"title":"3. 使用 DB 类","slug":"_3-使用-db-类","link":"#_3-使用-db-类","children":[]},{"level":3,"title":"4. 使用 MongoDatabase 类","slug":"_4-使用-mongodatabase-类","link":"#_4-使用-mongodatabase-类","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1721528518000,"updatedTime":1721528518000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.71,"words":1112},"filePathRelative":"posts/baeldung/2024-07-21/2024-07-21-Check Collection Existence in MongoDB.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>MongoDB 是一种 NoSQL 数据库，它将数据记录以 BSON 文档的形式存储到集合中。我们可以拥有多个数据库，每个数据库可以有一个或多个文档集合。</p>\\n<p>与关系型数据库不同，MongoDB 在插入文档时会自动创建集合，无需任何结构定义。在本教程中，我们将学习检查集合存在性的多种方法。我们将使用 collectionExists、createCollection、listCollectionNames 和 count 方法来检查集合是否存在。</p>\\n<h3>2.1. 使用 <em>MongoClient</em> 创建连接</h3>\\n<p><em>MongoClient</em> 是一个 Java 类，用于与 MongoDB 实例建立连接：</p>","autoDesc":true}');export{g as comp,u as data};
