import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as n,a}from"./app-B6f8H54y.js";const i={},d=a(`<h1 id="在java驱动中获取mongodb最后插入的文档id" tabindex="-1"><a class="header-anchor" href="#在java驱动中获取mongodb最后插入的文档id"><span>在Java驱动中获取MongoDB最后插入的文档ID</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>有时我们需要刚刚插入到MongoDB数据库中文档的ID。例如，我们可能想要将ID作为响应返回给调用者或记录创建的对象进行调试。</p><p>在本教程中，我们将看到MongoDB中ID是如何实现的，以及如何通过Java程序检索我们刚刚插入到集合中的文档的ID。</p><h2 id="_2-mongodb文档的id是什么" tabindex="-1"><a class="header-anchor" href="#_2-mongodb文档的id是什么"><span>2. MongoDB文档的ID是什么？</span></a></h2><p>像每个数据存储系统一样，MongoDB需要为存储在集合中的每个文档提供一个唯一标识符。这个标识符相当于关系数据库中的主键。</p><p>在MongoDB中，此ID由12个字节组成：</p><ul><li>4字节的时间戳值，表示自Unix纪元以来的秒数</li><li>每个进程一次生成的5字节随机值。这个随机值对于机器和进程是唯一的。</li><li>一个3字节的递增计数器</li></ul><p>**ID存储在一个名为_id的字段中，并且由客户端生成。**这意味着在将文档发送到数据库之前必须生成ID。在客户端，我们可以使用驱动程序生成的ID或生成自定义ID。</p><p>我们可以看到，在同一秒由同一客户端创建的文档将有前9个字节相同。因此，ID的唯一性在这种情况下依赖于计数器。计数器允许客户端在同一秒内创建超过1600万个文档。</p><p>尽管它以时间戳开始，但我们应该小心，不要将标识符用作排序标准。这是因为在同一秒创建的文档不能保证按创建日期排序，因为计数器不能保证是单调的。此外，不同的客户端可能有不同的系统时钟。</p><p>Java驱动程序使用随机数生成器作为计数器，这不是单调的。这就是为什么我们不应该使用驱动程序生成的ID按创建日期排序。</p><h2 id="_3-objectid-类" tabindex="-1"><a class="header-anchor" href="#_3-objectid-类"><span>3. <em>ObjectId</em> 类</span></a></h2><p>唯一标识符存储在_ObjectId_类中，该类提供了方便的方法来获取ID中存储的数据，而无需手动解析。</p><p>例如，以下是我们如何获取ID的创建日期：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Date creationDate = objectId.getDate();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>同样，我们可以检索ID的时间戳（秒）：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>int timestamp = objectId.getTimestamp();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>_ObjectId_类还提供了获取计数器、机器标识符或进程标识符的方法，但它们都被弃用了。</p><h2 id="_4-检索id" tabindex="-1"><a class="header-anchor" href="#_4-检索id"><span>4. 检索ID</span></a></h2><p>需要记住的主要事情是，在MongoDB中，客户端在将_Document_发送到集群之前生成唯一的标识符。这与关系数据库中的序列形成对比。这使得检索此ID非常容易。</p><h3 id="_4-1-驱动程序生成的id" tabindex="-1"><a class="header-anchor" href="#_4-1-驱动程序生成的id"><span>4.1. 驱动程序生成的ID</span></a></h3><p>**生成_Document_的唯一ID的标准且简单的方法是让驱动程序来做这项工作。**当我们向_Collection_插入一个新的_Document_时，如果_Document_中没有_id字段，驱动程序在发送插入命令到集群之前会生成一个新的_ObjectId_。</p><p>我们插入新_Document_到您的Collection的代码可能如下所示：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Document document = new Document();
document.put(&quot;name&quot;, &quot;Shubham&quot;);
document.put(&quot;company&quot;, &quot;Baeldung&quot;);
collection.insertOne(document);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以看到，我们从未指明ID必须如何生成。</p><p>当_insertOne()<em>方法返回时，我们可以从_Document_获取生成的_ObjectId</em>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>ObjectId objectId = document.getObjectId(&quot;_id&quot;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们还可以使用_Document_的标准字段检索_ObjectId_，然后将其转换为_ObjectId_：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>ObjectId oId = (ObjectId) document.get(&quot;_id&quot;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_4-2-自定义id" tabindex="-1"><a class="header-anchor" href="#_4-2-自定义id"><span>4.2. 自定义ID</span></a></h3><p>**检索ID的另一种方式是在代码中生成它，然后像其他字段一样将其放入_Document_中。**如果我们向驱动程序发送带有_id字段的_Document_，它将不会生成一个新的。</p><p>我们可能需要这样做的情况是，我们需要在将_Document_插入_Collection_之前获得MongoDB_Document_的ID。</p><p>我们可以通过创建类的实例来生成一个新的_ObjectId_：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>ObjectId generatedId = new ObjectId();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>或者，我们也可以调用_ObjectId_类的静态_get()_方法：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>ObjectId generatedId = ObjectId.get();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后，我们只需要创建我们的_Document_并使用生成的ID。为此，我们可以在_Document_构造函数中提供它：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Document document = new Document(&quot;_id&quot;, generatedId);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>或者，我们可以使用_put()_方法：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>document.put(&quot;_id&quot;, generatedId);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>使用用户生成的ID时，我们必须小心，在每次插入之前生成一个新的_ObjectId_，因为重复的ID是禁止的。重复的ID将导致_MongoWriteException_，带有重复键消息。</p><p>_ObjectId_类提供了几个其他构造函数，允许我们设置标识符的某些部分：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public ObjectId(final Date date)
public ObjectId(final Date date, final int counter)
public ObjectId(final int timestamp, final int counter)
public ObjectId(final String hexString)
public ObjectId(final byte[] bytes)
public ObjectId(final ByteBuffer buffer)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是，当我们使用这些构造函数时，我们必须非常小心，因为提供给驱动程序的ID的唯一性完全依赖于我们的代码。在这些特定情况下，我们可能会得到重复键错误：</p><ul><li>如果我们多次使用相同的日期（或时间戳）和计数器组合</li><li>如果我们多次使用相同的十六进制_String_、<em>byte_数组或_ByteBuffer</em></li></ul><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们学习了MongoDB文档的唯一标识符是什么以及它的工作原理。然后，我们看到了如何在插入_Document_到_Collection_之后甚至之前检索它。</p><p>像往常一样，这些示例的代码可以在GitHub上找到。</p><p>OK</p>`,50),o=[d];function l(c,s){return n(),t("div",null,o)}const u=e(i,[["render",l],["__file","2024-07-22-Get Last Inserted Document ID in MongoDB With Java Driver.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-07-22/2024-07-22-Get%20Last%20Inserted%20Document%20ID%20in%20MongoDB%20With%20Java%20Driver.html","title":"在Java驱动中获取MongoDB最后插入的文档ID","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["MongoDB","Java"],"tag":["Java","MongoDB","Document ID"],"head":[["meta",{"name":"keywords","content":"MongoDB, Java, Document ID, Last Inserted ID"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-22/2024-07-22-Get%20Last%20Inserted%20Document%20ID%20in%20MongoDB%20With%20Java%20Driver.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Java驱动中获取MongoDB最后插入的文档ID"}],["meta",{"property":"og:description","content":"在Java驱动中获取MongoDB最后插入的文档ID 1. 概述 有时我们需要刚刚插入到MongoDB数据库中文档的ID。例如，我们可能想要将ID作为响应返回给调用者或记录创建的对象进行调试。 在本教程中，我们将看到MongoDB中ID是如何实现的，以及如何通过Java程序检索我们刚刚插入到集合中的文档的ID。 2. MongoDB文档的ID是什么？ ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-22T06:14:59.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"MongoDB"}],["meta",{"property":"article:tag","content":"Document ID"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-22T06:14:59.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Java驱动中获取MongoDB最后插入的文档ID\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-22T06:14:59.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Java驱动中获取MongoDB最后插入的文档ID 1. 概述 有时我们需要刚刚插入到MongoDB数据库中文档的ID。例如，我们可能想要将ID作为响应返回给调用者或记录创建的对象进行调试。 在本教程中，我们将看到MongoDB中ID是如何实现的，以及如何通过Java程序检索我们刚刚插入到集合中的文档的ID。 2. MongoDB文档的ID是什么？ ..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. MongoDB文档的ID是什么？","slug":"_2-mongodb文档的id是什么","link":"#_2-mongodb文档的id是什么","children":[]},{"level":2,"title":"3. ObjectId 类","slug":"_3-objectid-类","link":"#_3-objectid-类","children":[]},{"level":2,"title":"4. 检索ID","slug":"_4-检索id","link":"#_4-检索id","children":[{"level":3,"title":"4.1. 驱动程序生成的ID","slug":"_4-1-驱动程序生成的id","link":"#_4-1-驱动程序生成的id","children":[]},{"level":3,"title":"4.2. 自定义ID","slug":"_4-2-自定义id","link":"#_4-2-自定义id","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1721628899000,"updatedTime":1721628899000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.7,"words":1409},"filePathRelative":"posts/baeldung/2024-07-22/2024-07-22-Get Last Inserted Document ID in MongoDB With Java Driver.md","localizedDate":"2022年4月1日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>有时我们需要刚刚插入到MongoDB数据库中文档的ID。例如，我们可能想要将ID作为响应返回给调用者或记录创建的对象进行调试。</p>\\n<p>在本教程中，我们将看到MongoDB中ID是如何实现的，以及如何通过Java程序检索我们刚刚插入到集合中的文档的ID。</p>\\n<h2>2. MongoDB文档的ID是什么？</h2>\\n<p>像每个数据存储系统一样，MongoDB需要为存储在集合中的每个文档提供一个唯一标识符。这个标识符相当于关系数据库中的主键。</p>\\n<p>在MongoDB中，此ID由12个字节组成：</p>\\n<ul>\\n<li>4字节的时间戳值，表示自Unix纪元以来的秒数</li>\\n<li>每个进程一次生成的5字节随机值。这个随机值对于机器和进程是唯一的。</li>\\n<li>一个3字节的递增计数器</li>\\n</ul>","autoDesc":true}');export{u as comp,m as data};
