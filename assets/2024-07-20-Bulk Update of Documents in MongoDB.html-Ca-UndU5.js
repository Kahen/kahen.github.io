import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as t,a as i}from"./app-CoWjjpto.js";const o={},l=i(`<hr><h1 id="mongodb中批量更新文档" tabindex="-1"><a class="header-anchor" href="#mongodb中批量更新文档"><span>MongoDB中批量更新文档</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在本教程中，我们将探讨在MongoDB中执行批量更新和插入操作。此外，MongoDB提供了API调用，允许在单个操作中插入或检索多个文档。MongoDB使用数组或批量接口，通过减少客户端和数据库之间的调用次数，大大提高了数据库性能。</p><p>在本教程中，我们将查看使用MongoDB Shell和Java驱动代码的解决方案。</p><p>让我们深入实现MongoDB中文档的批量更新。</p><h2 id="_2-数据库初始化" tabindex="-1"><a class="header-anchor" href="#_2-数据库初始化"><span>2. 数据库初始化</span></a></h2><p>首先，我们需要连接到mongo shell：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>mongo --host localhost --port 27017
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>现在，设置一个数据库_baeldung_和一个样本集合_populations_：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>use baeldung;
db.createCollection(populations);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们使用_insertMany_方法向集合_populations_中添加一些样本数据：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>db.populations.insertMany([
{
    &quot;cityId&quot;:1124,
    &quot;cityName&quot;:&quot;New York&quot;,
    &quot;countryName&quot;:&quot;United States&quot;,
    &quot;continentName&quot;:&quot;North America&quot;,
    &quot;population&quot;:22
},
{
    &quot;cityId&quot;:1125,
    &quot;cityName&quot;:&quot;Mexico City&quot;,
    &quot;countryName&quot;:&quot;Mexico&quot;,
    &quot;continentName&quot;:&quot;North America&quot;,
    &quot;population&quot;:25
},
{
    &quot;cityId&quot;:1126,
    &quot;cityName&quot;:&quot;New Delhi&quot;,
    &quot;countryName&quot;:&quot;India&quot;,
    &quot;continentName&quot;:&quot;Asia&quot;,
    &quot;population&quot;:45
},
{
    &quot;cityId&quot;:1134,
    &quot;cityName&quot;:&quot;London&quot;,
    &quot;countryName&quot;:&quot;England&quot;,
    &quot;continentName&quot;:&quot;Europe&quot;,
    &quot;population&quot;:32
}]);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述_insertMany_查询将返回以下文档：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>{
    &quot;acknowledged&quot; : true,
    &quot;insertedIds&quot; : [
        ObjectId(&quot;623575049d55d4e137e477f6&quot;),
        ObjectId(&quot;623575049d55d4e137e477f7&quot;),
        ObjectId(&quot;623575049d55d4e137e477f8&quot;),
        ObjectId(&quot;623575049d55d4e137e477f9&quot;)
    ]
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们在上述查询中插入了四个文档，以执行MongoDB中的所有类型的批量写操作。</p><p>数据库_baeldung_已成功创建，所有所需数据也已插入到集合_populations_中，因此我们准备执行批量更新。</p><h2 id="_3-使用mongodb-shell查询" tabindex="-1"><a class="header-anchor" href="#_3-使用mongodb-shell查询"><span>3. 使用MongoDB Shell查询</span></a></h2><p>MongoDB的批量操作构建器用于为单个集合构建批量写操作列表。我们可以以两种不同的方式初始化批量操作。方法_initializeOrderedBulkOp_用于按顺序执行批量写操作列表。<strong>_initializeOrderedBulkOp_的一个缺点是，如果在处理任何写操作时发生错误，MongoDB将返回而不处理列表中剩余的写操作。</strong></p><p>我们可以使用insert、update、replace和remove方法在单个DB调用中执行不同类型的操作。作为示例，让我们看看使用MongoDB shell的批量写操作查询：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>db.populations.bulkWrite([
    {
        insertOne :
            {
                &quot;document&quot; :
                    {
                        &quot;cityId&quot;:1128,
                        &quot;cityName&quot;:&quot;Kathmandu&quot;,
                        &quot;countryName&quot;:&quot;Nepal&quot;,
                        &quot;continentName&quot;:&quot;Asia&quot;,
                        &quot;population&quot;:12
                    }
            }
    },
    {
        insertOne :
            {
                &quot;document&quot; :
                    {
                        &quot;cityId&quot;:1130,
                        &quot;cityName&quot;:&quot;Mumbai&quot;,
                        &quot;countryName&quot;:&quot;India&quot;,
                        &quot;continentName&quot;:&quot;Asia&quot;,
                        &quot;population&quot;:55
                    }
            }
    },
    {
        updateOne :
            {
                &quot;filter&quot; :
                     {
                         &quot;cityName&quot;: &quot;New Delhi&quot;
                     },
                 &quot;update&quot; :
                     {
                         $set :
                         {
                             &quot;status&quot; : &quot;High Population&quot;
                         }
                     }
            }
    },
    {
        updateMany :
            {
                &quot;filter&quot; :
                     {
                         &quot;cityName&quot;: &quot;London&quot;
                     },
                 &quot;update&quot; :
                     {
                         $set :
                         {
                             &quot;status&quot; : &quot;Low Population&quot;
                         }
                     }
            }
    },
    {
        deleteOne :
            {
                &quot;filter&quot; :
                    {
                        &quot;cityName&quot;:&quot;Mexico City&quot;
                    }
            }
    },
    {
        replaceOne :
            {
                &quot;filter&quot; :
                    {
                        &quot;cityName&quot;:&quot;New York&quot;
                    },
                 &quot;replacement&quot; :
                    {
                        &quot;cityId&quot;:1124,
                        &quot;cityName&quot;:&quot;New York&quot;,
                        &quot;countryName&quot;:&quot;United States&quot;,
                        &quot;continentName&quot;:&quot;North America&quot;,
                        &quot;population&quot;:28
                    }
             }
    }
]);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述_bulkWrite_查询将返回以下文档：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>{
    &quot;acknowledged&quot; : true,
    &quot;deletedCount&quot; : 1,
    &quot;insertedCount&quot; : 2,
    &quot;matchedCount&quot; : 3,
    &quot;upsertedCount&quot; : 0,
    &quot;insertedIds&quot; :
        {
            &quot;0&quot; : ObjectId(&quot;623575f89d55d4e137e477f9&quot;),
            &quot;1&quot; : ObjectId(&quot;623575f89d55d4e137e477fa&quot;)
        },
    &quot;upsertedIds&quot; : {}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，上述查询中，我们执行了所有类型的写操作，即_insertOne_、<em>updateOne</em>、<em>deleteOne</em>、<em>replaceOne</em>。</p><p>首先，我们使用_insertOne_方法向集合中插入了一个新的文档。其次，我们使用_updateOne_更新了_cityName_“New Delhi”的文档。后来，我们使用_deleteOne_方法根据过滤器从集合中删除了一个文档。最后，我们使用_replaceOne_用过滤器_cityName_“New York”替换了一个完整的文档。</p><h2 id="_4-使用java驱动" tabindex="-1"><a class="header-anchor" href="#_4-使用java驱动"><span>4. 使用Java驱动</span></a></h2><p>我们已经讨论了MongoDB shell查询来执行批量写操作。在创建批量写操作之前，让我们首先创建一个与数据库_baeldung_的集合_populations_的_MongoClient_连接：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>MongoClient mongoClient = new MongoClient(&quot;localhost&quot;, 27017);
MongoDatabase database = mongoClient.getDatabase(&quot;baeldung&quot;);
MongoCollection\`\`\`\`\`\`\`&lt;Document&gt;\`\`\`\`\`\`\` collection = database.getCollection(&quot;populations&quot;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们与在默认端口27017上运行的MongoDB服务器创建了连接。现在，让我们使用Java代码实现相同的批量操作：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>List&lt;WriteModel\`\`\`\`\`\`\`&lt;Document&gt;\`\`\`\`\`\`\`&gt; writeOperations = new ArrayList&lt;WriteModel\`\`\`\`\`\`\`&lt;Document&gt;\`\`\`\`\`\`\`&gt;();
writeOperations.add(new InsertOneModel\`\`\`\`\`\`\`&lt;Document&gt;\`\`\`\`\`\`\`(new Document(&quot;cityId&quot;, 1128)
  .append(&quot;cityName&quot;, &quot;Kathmandu&quot;)
  .append(&quot;countryName&quot;, &quot;Nepal&quot;)
  .append(&quot;continentName&quot;, &quot;Asia&quot;)
  .append(&quot;population&quot;, 12)));
writeOperations.add(new InsertOneModel\`\`\`\`\`\`\`&lt;Document&gt;\`\`\`\`\`\`\`(new Document(&quot;cityId&quot;, 1130)
  .append(&quot;cityName&quot;, &quot;Mumbai&quot;)
  .append(&quot;countryName&quot;, &quot;India&quot;)
  .append(&quot;continentName&quot;, &quot;Asia&quot;)
  .append(&quot;population&quot;, 55)));
writeOperations.add(new UpdateOneModel\`\`\`\`\`\`\`&lt;Document&gt;\`\`\`\`\`\`\`(new Document(&quot;cityName&quot;, &quot;New Delhi&quot;),
  new Document(&quot;$set&quot;, new Document(&quot;status&quot;, &quot;High Population&quot;))
));
writeOperations.add(new UpdateManyModel\`\`\`\`\`\`\`&lt;Document&gt;\`\`\`\`\`\`\`(new Document(&quot;cityName&quot;, &quot;London&quot;),
  new Document(&quot;$set&quot;, new Document(&quot;status&quot;, &quot;Low Population&quot;))
));
writeOperations.add(new DeleteOneModel\`\`\`\`\`\`\`&lt;Document&gt;\`\`\`\`\`\`\`(new Document(&quot;cityName&quot;, &quot;Mexico City&quot;)));
writeOperations.add(new ReplaceOneModel\`\`\`\`\`\`\`&lt;Document&gt;\`\`\`\`\`\`\`(new Document(&quot;cityId&quot;, 1124),
  new Document(&quot;cityName&quot;, &quot;New York&quot;).append(&quot;cityName&quot;, &quot;United States&quot;)
    .append(&quot;continentName&quot;, &quot;North America&quot;)
    .append(&quot;population&quot;, 28)));
BulkWriteResult bulkWriteResult = collection.bulkWrite(writeOperations);
System.out.println(&quot;bulkWriteResult:- &quot; + bulkWriteResult);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们首先创建了一个_writeModel_列表，将所有不同类型的写操作添加到一个单一的更新列表中。此外，我们在我们的查询中使用了_InsertOneModel_、<em>UpdateOneModel</em>、<em>UpdateManyModel</em>、<em>DeleteOneModel_和_ReplaceOneModel</em>。最后，_bulkWrite_方法一次性执行了所有操作。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们学习了如何使用不同类型的写操作在MongoDB中执行批量操作。我们在一个单独的DB查询中执行了文档的插入、更新、删除和替换。此外，我们学习了在MongoDB中批量更新中使用_initializeOrderedBulkOp_的用例。</p><p>首先，我们查看了MongoDB shell查询中批量操作的用例，然后我们讨论了相应的Java驱动代码。</p><p>所有案例的示例可以在GitHub上找到。</p>`,35),d=[l];function a(u,s){return t(),n("div",null,d)}const v=e(o,[["render",a],["__file","2024-07-20-Bulk Update of Documents in MongoDB.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-07-20/2024-07-20-Bulk%20Update%20of%20Documents%20in%20MongoDB.html","title":"MongoDB中批量更新文档","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["MongoDB","Java"],"tag":["MongoDB","Bulk Update","Java"],"head":[["meta",{"name":"keywords","content":"MongoDB, Bulk Update, Java, Database Performance"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-20/2024-07-20-Bulk%20Update%20of%20Documents%20in%20MongoDB.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"MongoDB中批量更新文档"}],["meta",{"property":"og:description","content":"MongoDB中批量更新文档 1. 概述 在本教程中，我们将探讨在MongoDB中执行批量更新和插入操作。此外，MongoDB提供了API调用，允许在单个操作中插入或检索多个文档。MongoDB使用数组或批量接口，通过减少客户端和数据库之间的调用次数，大大提高了数据库性能。 在本教程中，我们将查看使用MongoDB Shell和Java驱动代码的解决方..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-20T10:12:39.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"MongoDB"}],["meta",{"property":"article:tag","content":"Bulk Update"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-20T10:12:39.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"MongoDB中批量更新文档\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-20T10:12:39.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"MongoDB中批量更新文档 1. 概述 在本教程中，我们将探讨在MongoDB中执行批量更新和插入操作。此外，MongoDB提供了API调用，允许在单个操作中插入或检索多个文档。MongoDB使用数组或批量接口，通过减少客户端和数据库之间的调用次数，大大提高了数据库性能。 在本教程中，我们将查看使用MongoDB Shell和Java驱动代码的解决方..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 数据库初始化","slug":"_2-数据库初始化","link":"#_2-数据库初始化","children":[]},{"level":2,"title":"3. 使用MongoDB Shell查询","slug":"_3-使用mongodb-shell查询","link":"#_3-使用mongodb-shell查询","children":[]},{"level":2,"title":"4. 使用Java驱动","slug":"_4-使用java驱动","link":"#_4-使用java驱动","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1721470359000,"updatedTime":1721470359000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.92,"words":1177},"filePathRelative":"posts/baeldung/2024-07-20/2024-07-20-Bulk Update of Documents in MongoDB.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>MongoDB中批量更新文档</h1>\\n<h2>1. 概述</h2>\\n<p>在本教程中，我们将探讨在MongoDB中执行批量更新和插入操作。此外，MongoDB提供了API调用，允许在单个操作中插入或检索多个文档。MongoDB使用数组或批量接口，通过减少客户端和数据库之间的调用次数，大大提高了数据库性能。</p>\\n<p>在本教程中，我们将查看使用MongoDB Shell和Java驱动代码的解决方案。</p>\\n<p>让我们深入实现MongoDB中文档的批量更新。</p>\\n<h2>2. 数据库初始化</h2>\\n<p>首先，我们需要连接到mongo shell：</p>\\n<div class=\\"language-text\\" data-ext=\\"text\\" data-title=\\"text\\"><pre class=\\"language-text\\"><code>mongo --host localhost --port 27017\\n</code></pre></div>","autoDesc":true}');export{v as comp,m as data};
