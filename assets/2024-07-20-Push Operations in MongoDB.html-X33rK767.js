import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as n,a as i}from"./app-rlMpesB6.js";const a={},d=i(`<h1 id="mongodb中的push操作-baeldung" tabindex="-1"><a class="header-anchor" href="#mongodb中的push操作-baeldung"><span>MongoDB中的Push操作 | Baeldung</span></a></h1><p>在本教程中，我们将介绍如何在MongoDB中向数组中插入文档。此外，我们还将看到使用_$push和_$addToset_操作符将值添加到数组中的各种应用。</p><p>首先，我们将创建一个示例数据库、一个集合，并将虚拟数据插入其中。接下来，我们将看一些基本示例，使用_$push_操作符更新文档。之后，我们还将讨论_$push_和_$addtoSet_操作符的各种用例。</p><p>让我们深入探讨在MongoDB中将文档插入数组的多种方法。</p><h3 id="_2-数据库初始化" tabindex="-1"><a class="header-anchor" href="#_2-数据库初始化"><span>2. 数据库初始化</span></a></h3><p>首先，让我们设置一个新的数据库_baeldung_和一个示例集合_orders_：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>use baeldung;
db.createCollection(orders);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们使用_insertMany_方法将一些文档添加到集合中：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>db.orders.insertMany([
    {
        &quot;customerId&quot;: 1023,
        &quot;orderTimestamp&quot;: NumberLong(&quot;1646460073000&quot;),
        &quot;shippingDestination&quot;: &quot;336, Street No.1 Pawai Mumbai&quot;,
        &quot;purchaseOrder&quot;: 1000,
        &quot;contactNumber&quot;:&quot;9898987676&quot;,
        &quot;items&quot;: [
            {
                &quot;itemName&quot;: &quot;BERGER&quot;,
                &quot;quantity&quot;: 1,
                &quot;price&quot;: 500
            },
            {
                &quot;itemName&quot;: &quot;VEG PIZZA&quot;,
                &quot;quantity&quot;: 1,
                &quot;price&quot;: 800
            }
        ]
    },
    {
        &quot;customerId&quot;: 1027,
        &quot;orderTimestamp&quot;: NumberLong(&quot;1646460087000&quot;),
        &quot;shippingDestination&quot;: &quot;445, Street No.2 Pawai Mumbai&quot;,
        &quot;purchaseOrder&quot;: 2000,
        &quot;contactNumber&quot;:&quot;9898987676&quot;,
        &quot;items&quot;: [
            {
               &quot;itemName&quot;: &quot;BERGER&quot;,
               &quot;quantity&quot;: 1,
               &quot;price&quot;: 500
            },
            {
               &quot;itemName&quot;: &quot;NON-VEG PIZZA&quot;,
               &quot;quantity&quot;: 1,
               &quot;price&quot;: 1200
            }
        ]
    }
]);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果插入成功，上述命令将打印出类似于下面显示的JSON：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>{
    &quot;acknowledged&quot; : true,
    &quot;insertedIds&quot; : [
        ObjectId(&quot;622300cc85e943405d04b567&quot;),
ObjectId(&quot;622300cc85e943405d04b568&quot;)
    ]
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>到目前为止，我们已经成功设置了数据库和集合。我们将在所有示例中使用这个数据库和集合。</p><h3 id="_3-使用mongo查询进行push操作" tabindex="-1"><a class="header-anchor" href="#_3-使用mongo查询进行push操作"><span>3. 使用Mongo查询进行Push操作</span></a></h3><p>MongoDB提供了各种类型的数组操作符来更新MongoDB文档中的数组。**MongoDB中的_$push_操作符将值追加到数组的末尾。**根据查询的类型，我们可以与_updateOne_、<em>updateMany</em>、<em>findAndModify_等方法一起使用</em>$push_操作符。</p><p>现在让我们来看看使用_$push_操作符的shell查询：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>db.orders.updateOne(
    {
        &quot;customerId&quot;: 1023
    },
    {
        $push: {
            &quot;items&quot;:{
                &quot;itemName&quot;: &quot;PIZZA MANIA&quot;,
                &quot;quantity&quot;: 1,
                &quot;price&quot;: 800
            }
        }
    });
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述查询将返回以下文档：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>{
    &quot;acknowledged&quot;:true,
    &quot;matchedCount&quot;:1,
    &quot;modifiedCount&quot;:1
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在让我们检查_customerId_为1023的文档。在这里，我们可以看到新项目被插入到列表“<em>items</em>”的末尾：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>{
    &quot;customerId&quot; : 1023,
    &quot;orderTimestamp&quot; : NumberLong(&quot;1646460073000&quot;),
    &quot;shippingDestination&quot; : &quot;336, Street No.1 Pawai Mumbai&quot;,
    &quot;purchaseOrder&quot; : 1000,
    &quot;contactNumber&quot; : &quot;9898987676&quot;,
    &quot;items&quot; : [
        {
            &quot;itemName&quot; : &quot;BERGER&quot;,
            &quot;quantity&quot; : 1,
        &quot;price&quot; : 500
        },
    {
        &quot;itemName&quot; : &quot;VEG PIZZA&quot;,
        &quot;quantity&quot; : 1,
        &quot;price&quot; : 800
    },
    {
        &quot;itemName&quot; : &quot;PIZZA MANIA&quot;,
        &quot;quantity&quot; : 1,
        &quot;price&quot; : 800
    }
]
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-使用java驱动代码进行push操作" tabindex="-1"><a class="header-anchor" href="#_4-使用java驱动代码进行push操作"><span>4. 使用Java驱动代码进行Push操作</span></a></h3><p>到目前为止，我们已经讨论了将文档推送到数组中的MongoDB shell查询。现在让我们使用Java代码实现推送更新查询。</p><p>在执行更新操作之前，让我们首先连接到_baeldung_数据库中的_orders_集合：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>mongoClient = new MongoClient(&quot;localhost&quot;, 27017);
MongoDatabase database = mongoClient.getDatabase(&quot;baeldung&quot;);
MongoCollection\`&lt;Document&gt;\` collection = database.getCollection(&quot;orders&quot;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这种情况下，我们连接到在localhost上的默认端口27017上运行的MongoDB。</p><h4 id="_4-1-使用-dbobject" tabindex="-1"><a class="header-anchor" href="#_4-1-使用-dbobject"><span>4.1. 使用_DBObject_</span></a></h4><p>MongoDB Java驱动程序支持_DBObject_和_BSON_文档。在这里，_DBObject_是MongoDB旧版驱动程序的一部分，但在MongoDB的较新版本中<strong>已弃用</strong>。</p><p>现在让我们来看看使用Java驱动程序将新值插入数组的代码：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>DBObject listItem = new BasicDBObject(&quot;items&quot;, new BasicDBObject(&quot;itemName&quot;, &quot;PIZZA MANIA&quot;)
  .append(&quot;quantity&quot;, 1)
  .append(&quot;price&quot;, 800));
BasicDBObject searchFilter = new BasicDBObject(&quot;customerId&quot;, 1023);
BasicDBObject updateQuery = new BasicDBObject();
updateQuery.append(&quot;$push&quot;, listItem);
UpdateResult updateResult = collection.updateOne(searchFilter, updateQuery);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的查询中，我们首先使用_BasicDBObject_创建了项目文档。根据_searchQuery_，将过滤集合中的文档，并将值推送到数组中。</p><h4 id="_4-2-使用-bson-文档" tabindex="-1"><a class="header-anchor" href="#_4-2-使用-bson-文档"><span>4.2. 使用_BSON_文档</span></a></h4><p>_BSON_文档是在Java中访问MongoDB文档的新方式，它是基于较新的客户端堆栈构建的。_org.bson.Document_类更简单，更易于使用。</p><p>让我们使用_org.bson.Document_类将值推送到数组“<em>items</em>”中：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Document item = new Document()
  .append(&quot;itemName1&quot;, &quot;PIZZA MANIA&quot;)
  .append(&quot;quantity&quot;, 1).append(&quot;price&quot;, 800);
UpdateResult updateResult = collection.updateOne(Filters.eq(&quot;customerId&quot;, 1023), Updates.push(&quot;items&quot;, item));
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这种情况下，_BSON_的实现与使用_DBObject_运行的代码类似，更新也将是相同的。在这里，我们使用_updateOne_方法仅更新单个文档。</p><h3 id="_5-使用-addtoset-操作符" tabindex="-1"><a class="header-anchor" href="#_5-使用-addtoset-操作符"><span>5. 使用_addToSet_操作符</span></a></h3><p>_$addToSet_操作符也可以用来推送数组中的值。这个操作符只有在数组中不存在该值时才会添加。否则，它只会忽略它。而push操作符将不考虑任何其他条件地将值推送到数组中。</p><p>**一个关键点是要注意，_$addToSet_操作符在处理重复项目时不会推送值。**另一方面，_push操作符_会将值推送到数组中，不管任何其他条件。</p><h4 id="_5-1-使用-addtoset-操作符的shell查询" tabindex="-1"><a class="header-anchor" href="#_5-1-使用-addtoset-操作符的shell查询"><span>5.1. 使用_addToSet_操作符的Shell查询</span></a></h4><p><em>$addToSet_操作符的mongo shell查询类似于</em>$push_操作符，但_$addToSet_不会在数组中插入重复的值。</p><p>现在让我们来看看使用_$addToSet_将值推送到数组中的MongoDB查询：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>db.orders.updateOne(
    {
        &quot;customerId&quot;: 1023
    },
    {
        $addToSet: {
            &quot;items&quot;:{
                &quot;itemName&quot;: &quot;PASTA&quot;,
                &quot;quantity&quot;: 1,
                &quot;price&quot;: 1000
            }
        }
    });
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这种情况下，输出将是如下所示：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>{
    &quot;acknowledged&quot;:true,
    &quot;matchedCount&quot;:1,
    &quot;modifiedCount&quot;:1
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这种情况下，我们使用了_$addToSet_操作符，只有当它是唯一的，文档才会被推送到数组“items”。</p><h4 id="_5-2-使用-addtoset-操作符的java驱动" tabindex="-1"><a class="header-anchor" href="#_5-2-使用-addtoset-操作符的java驱动"><span>5.2. 使用_addToSet_操作符的Java驱动</span></a></h4><p>_$addToSet_操作符提供了与push操作符不同的数组更新操作：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Document item = new Document()
  .append(&quot;itemName1&quot;, &quot;PIZZA MANIA&quot;)
  .append(&quot;quantity&quot;, 1).append(&quot;price&quot;, 800);
UpdateResult updateResult = collection
  .updateOne(Filters.eq(&quot;customerId&quot;, 1023), Updates.addToSet(&quot;items&quot;, item));
System.out.println(&quot;updateResult:- &quot; + updateResult);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上述代码中，我们首先创建了文档“<em>item</em>”，然后基于_customerId_过滤器，_updateOne_方法将尝试将文档“<em>item</em>”推送到数组“<em>items</em>”。</p><h3 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h3><p>在本文中，我们学习了如何使用_$push和$addToSet_操作符将新值推送到数组中。首先，我们查看了MongoDB shell查询中_$push_操作符的使用，然后我们讨论了相应的Java驱动代码。</p><p>所有案例的实现都可以在GitHub上找到。</p><p><a href="kimi://action?name=cheer-on-kimi">给Kimi加油</a></p><p><img src="https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg" alt="img" loading="lazy"><img src="https://secure.gravatar.com/avatar/dc417739e22ae675b0e1f7012bbddaa5?s=50&amp;r=g" alt="img" loading="lazy"><img src="https://secure.gravatar.com/avatar/db9b6e888453bec33b0a1b1522bae628?s=50&amp;r=g" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-persistence-post-footer-main-1.2.0.jpg" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-persistence-post-footer-icn-1.0.0.png" alt="img" loading="lazy"></p><p>OK</p>`,55),s=[d];function o(u,l){return n(),t("div",null,s)}const m=e(a,[["render",o],["__file","2024-07-20-Push Operations in MongoDB.html.vue"]]),v=JSON.parse('{"path":"/posts/baeldung/2024-07-20/2024-07-20-Push%20Operations%20in%20MongoDB.html","title":"MongoDB中的Push操作 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-07-21T00:00:00.000Z","category":["MongoDB","数据库"],"tag":["MongoDB","数据库操作"],"head":[["meta",{"name":"keywords","content":"MongoDB, 数据库, 数组操作, $push, $addToSet"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-20/2024-07-20-Push%20Operations%20in%20MongoDB.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"MongoDB中的Push操作 | Baeldung"}],["meta",{"property":"og:description","content":"MongoDB中的Push操作 | Baeldung 在本教程中，我们将介绍如何在MongoDB中向数组中插入文档。此外，我们还将看到使用_$push和_$addToset_操作符将值添加到数组中的各种应用。 首先，我们将创建一个示例数据库、一个集合，并将虚拟数据插入其中。接下来，我们将看一些基本示例，使用_$push_操作符更新文档。之后，我们还将讨..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-20T18:13:35.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"MongoDB"}],["meta",{"property":"article:tag","content":"数据库操作"}],["meta",{"property":"article:published_time","content":"2024-07-21T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-20T18:13:35.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"MongoDB中的Push操作 | Baeldung\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg\\",\\"https://secure.gravatar.com/avatar/dc417739e22ae675b0e1f7012bbddaa5?s=50&r=g\\",\\"https://secure.gravatar.com/avatar/db9b6e888453bec33b0a1b1522bae628?s=50&r=g\\",\\"https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png\\",\\"https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-persistence-post-footer-main-1.2.0.jpg\\",\\"https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-persistence-post-footer-icn-1.0.0.png\\"],\\"datePublished\\":\\"2024-07-21T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-20T18:13:35.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"MongoDB中的Push操作 | Baeldung 在本教程中，我们将介绍如何在MongoDB中向数组中插入文档。此外，我们还将看到使用_$push和_$addToset_操作符将值添加到数组中的各种应用。 首先，我们将创建一个示例数据库、一个集合，并将虚拟数据插入其中。接下来，我们将看一些基本示例，使用_$push_操作符更新文档。之后，我们还将讨..."},"headers":[{"level":3,"title":"2. 数据库初始化","slug":"_2-数据库初始化","link":"#_2-数据库初始化","children":[]},{"level":3,"title":"3. 使用Mongo查询进行Push操作","slug":"_3-使用mongo查询进行push操作","link":"#_3-使用mongo查询进行push操作","children":[]},{"level":3,"title":"4. 使用Java驱动代码进行Push操作","slug":"_4-使用java驱动代码进行push操作","link":"#_4-使用java驱动代码进行push操作","children":[]},{"level":3,"title":"5. 使用_addToSet_操作符","slug":"_5-使用-addtoset-操作符","link":"#_5-使用-addtoset-操作符","children":[]},{"level":3,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1721499215000,"updatedTime":1721499215000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.89,"words":1468},"filePathRelative":"posts/baeldung/2024-07-20/2024-07-20-Push Operations in MongoDB.md","localizedDate":"2024年7月21日","excerpt":"\\n<p>在本教程中，我们将介绍如何在MongoDB中向数组中插入文档。此外，我们还将看到使用_$push和_$addToset_操作符将值添加到数组中的各种应用。</p>\\n<p>首先，我们将创建一个示例数据库、一个集合，并将虚拟数据插入其中。接下来，我们将看一些基本示例，使用_$push_操作符更新文档。之后，我们还将讨论_$push_和_$addtoSet_操作符的各种用例。</p>\\n<p>让我们深入探讨在MongoDB中将文档插入数组的多种方法。</p>\\n<h3>2. 数据库初始化</h3>\\n<p>首先，让我们设置一个新的数据库_baeldung_和一个示例集合_orders_：</p>\\n","autoDesc":true}');export{m as comp,v as data};
