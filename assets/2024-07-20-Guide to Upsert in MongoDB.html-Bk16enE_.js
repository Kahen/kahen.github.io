import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as n,a as i}from"./app-BcsYkzNo.js";const d={},u=i(`<hr><h1 id="mongodb中的upsert操作指南" tabindex="-1"><a class="header-anchor" href="#mongodb中的upsert操作指南"><span>MongoDB中的Upsert操作指南</span></a></h1><ol><li>概述</li></ol><p><strong>Upsert是插入(insert)和更新(update)的结合体（inSERT + UPdate = upsert）。</strong> 我们可以在不同的更新方法中使用_upsert_，例如_update_、<em>findAndModify_和_replaceOne</em>。</p><p>在MongoDB中，<em>upsert_选项是一个布尔值。假设值为_true</em>，并且文档与指定的查询过滤器匹配。在这种情况下，应用的更新操作将更新文档。如果值为_true_并且没有文档匹配条件，此选项将向集合中插入一个新文档。新文档将包含基于过滤器和应用操作的字段。</p><p>在本教程中，我们将首先查看MongoDB Shell查询中的_upsert_，然后使用Java驱动程序代码。</p><ol start="2"><li>数据库初始化</li></ol><p>在我们继续执行_upsert_操作之前，首先需要设置一个新的数据库_baeldung_和一个示例集合，<em>vehicle</em>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>db.vehicle.insertMany([
{
    &quot;companyName&quot;: &quot;Nissan&quot;,
    &quot;modelName&quot;: &quot;GTR&quot;,
    &quot;launchYear&quot;: 2016,
    &quot;type&quot;: &quot;Sports&quot;,
    &quot;registeredNo&quot;: &quot;EPS 5561&quot;
},
{
    &quot;companyName&quot;: &quot;BMW&quot;,
    &quot;modelName&quot;: &quot;X5&quot;,
    &quot;launchYear&quot;: 2020,
    &quot;type&quot;: &quot;SUV&quot;,
    &quot;registeredNo&quot;: &quot;LLS 6899&quot;
},
{
    &quot;companyName&quot;: &quot;Honda&quot;,
    &quot;modelName&quot;: &quot;Gold Wing&quot;,
    &quot;launchYear&quot;: 2018,
    &quot;type&quot;: &quot;Bike&quot;,
    &quot;registeredNo&quot;: &quot;LKS 2477&quot;
}]);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果插入成功，上述命令将打印出类似于下面显示的JSON：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>{
    &quot;acknowledged&quot;: true,
    &quot;insertedIds&quot;: [
        ObjectId(&quot;623c1db39d55d4e137e4781b&quot;),
ObjectId(&quot;623c1db39d55d4e137e4781c&quot;),
ObjectId(&quot;623c1db39d55d4e137e4781d&quot;)
    ]
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们已经成功地将虚拟数据添加到_vehicle_集合中。</p><ol start="3"><li>使用_update_方法</li></ol><p>在这一部分，我们将学习如何使用_update_方法和_upsert_选项。_upsert_选项的主要目的是根据应用的过滤器更新现有文档，或者如果过滤器没有匹配到，则插入一个新文档。</p><p>作为示例，我们将使用_upsert_选项和_$setOnInsert_操作符来获得在插入新字段到文档中的额外优势。</p><p>让我们查看一个查询，其中过滤器条件与集合中的现有文档匹配：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>db.vehicle.update(
{
    &quot;modelName&quot;: &quot;X5&quot;
},
{
    &quot;$set&quot;: {
        &quot;companyName&quot;: &quot;Hero Honda&quot;
    }
},
{
    &quot;upsert&quot;: true
});
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述查询将返回以下文档：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>{
    &quot;nMatched&quot;: 1,
    &quot;nUpserted&quot;: 0,
    &quot;nModified&quot;: 1
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里，我们将看到与上述Mongo shell查询相对应的Java驱动程序代码：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>UpdateOptions options = new UpdateOptions().upsert(true);
UpdateResult updateResult = collection.updateOne(Filters.eq(&quot;modelName&quot;, &quot;X5&quot;),
  Updates.combine(Updates.set(&quot;companyName&quot;, &quot;Hero Honda&quot;)), options);
System.out.println(&quot;updateResult:- &quot; + updateResult);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上述查询中，字段_modelName_ &quot;X5&quot;已经存在于集合中，因此该文档的_companyName_字段将更新为“Hero Honda”。</p><p>现在让我们查看一个使用_$setOnInsert_操作符的_upsert_选项的示例。它仅在添加新文档的情况下适用：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>db.vehicle.update(
{
    &quot;modelName&quot;: &quot;GTPR&quot;
},
{
    &quot;$set&quot;: {
        &quot;companyName&quot;: &quot;Hero Honda&quot;
    },
    &quot;$setOnInsert&quot;: {
        &quot;launchYear&quot;: 2022,
&quot;type&quot;: &quot;Bike&quot;,
&quot;registeredNo&quot;: &quot;EPS 5562&quot;
    },
},
{
    &quot;upsert&quot;: true
});
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述查询将返回以下文档：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>{
    &quot;nMatched&quot;: 0,
    &quot;nUpserted&quot;: 1,
    &quot;nModified&quot;: 0,
    &quot;_id&quot;: ObjectId(&quot;623b378ed648af670fe50e7f&quot;)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述使用_$setOnInsert_选项的更新查询的Java驱动程序代码将是：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>UpdateResult updateSetOnInsertResult = collection.updateOne(Filters.eq(&quot;modelName&quot;, &quot;GTPR&quot;),
  Updates.combine(Updates.set(&quot;companyName&quot;, &quot;Hero Honda&quot;),
  Updates.setOnInsert(&quot;launchYear&quot;, 2022),
  Updates.setOnInsert(&quot;type&quot;, &quot;Bike&quot;),
  Updates.setOnInsert(&quot;registeredNo&quot;, &quot;EPS 5562&quot;)), options);
System.out.println(&quot;updateSetOnInsertResult:- &quot; + updateSetOnInsertResult);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，上述查询中，字段_modelName_ &quot;GTPR&quot;的过滤器条件不匹配任何集合文档，所以我们将向集合添加一个新文档。<strong>需要注意的关键点是，_$setOnInsert_将所有字段添加到新文档中。</strong></p><ol start="4"><li>使用_findAndModify_方法</li></ol><p>我们还可以使用_findAndModify_方法使用_upsert_选项。对于这种方法，默认的_upsert_选项值是_false_。如果我们将_upsert_选项设置为_true_，它将执行与更新方法完全相同的操。</p><p>让我们查看一个使用_upsert_选项_true_的_findAndModify_方法的用例：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>db.vehicle.findAndModify(
{
    query: {
        &quot;modelName&quot;: &quot;X7&quot;
    },
    update: {
        &quot;$set&quot;: {
            &quot;companyName&quot;: &quot;Hero Honda&quot;
        }
    },
    &quot;upsert&quot;: true,
    &quot;new&quot;: true
});
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这种情况下，上述查询将返回新创建的文档。让我们查看上述查询的Java驱动程序代码：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>FindOneAndUpdateOptions upsertOptions = new FindOneAndUpdateOptions();
  upsertOptions.returnDocument(ReturnDocument.AFTER);
  upsertOptions.upsert(true);
Document resultDocument = collection.findOneAndUpdate(Filters.eq(&quot;modelName&quot;, &quot;X7&quot;),
  Updates.set(&quot;companyName&quot;, &quot;Hero Honda&quot;), upsertOptions);
System.out.println(&quot;resultDocument:- &quot; + resultDocument);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们首先创建了基于此的过滤器条件，然后我们将更新现有文档或向_vehicle_集合添加一个新文档。</p><ol start="5"><li>使用_replaceOne_方法</li></ol><p>让我们使用_replaceOne_方法执行_upsert_操作。MongoDB的_replaceOne_方法仅在条件匹配时替换集合中的单个文档。</p><p>首先，让我们看看替换方法的Mongo shell查询：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>db.vehicle.replaceOne(
{
    &quot;modelName&quot;: &quot;GTPR&quot;
},
{
    &quot;modelName&quot;: &quot;GTPR&quot;,
    &quot;companyName&quot;: &quot;Hero Honda&quot;,
    &quot;launchYear&quot;: 2022,
    &quot;type&quot;: &quot;Bike&quot;,
    &quot;registeredNo&quot;: &quot;EPS 5562&quot;
},
{
    &quot;upsert&quot;: true
});
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述查询将返回以下响应：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>{
    &quot;acknowledged&quot;: true,
    &quot;matchedCount&quot;: 1,
    &quot;modifiedCount&quot;: 1
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们使用Java驱动程序代码编写上述查询：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Document replaceDocument = new Document();
replaceDocument.append(&quot;modelName&quot;, &quot;GTPP&quot;)
  .append(&quot;companyName&quot;, &quot;Hero Honda&quot;)
  .append(&quot;launchYear&quot;, 2022)
  .append(&quot;type&quot;, &quot;Bike&quot;)
  .append(&quot;registeredNo&quot;, &quot;EPS 5562&quot;);
UpdateResult updateReplaceResult = collection.replaceOne(Filters.eq(&quot;modelName&quot;, &quot;GTPP&quot;), replaceDocument, options);
System.out.println(&quot;updateReplaceResult:- &quot; + updateReplaceResult);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这种情况下，我们首先需要创建一个新文档，用它来替换现有文档，并且使用_upsert_选项_true_，我们只有在条件匹配时才会替换文档。</p><ol start="6"><li>结论</li></ol><p>在本文中，我们看到了如何使用MongoDB的各种更新方法执行_upsert_操作。首先，我们学习了如何使用_update_和_findAndModify_方法执行_upsert_，然后使用_replaceOne_方法。简而言之，我们使用Mongo shell查询和Java驱动程序代码实现了upsert操作。</p><p>所有案例的实现都可以在GitHub上找到。</p>`,48),s=[u];function a(o,l){return n(),t("div",null,s)}const v=e(d,[["render",a],["__file","2024-07-20-Guide to Upsert in MongoDB.html.vue"]]),p=JSON.parse('{"path":"/posts/baeldung/2024-07-20/2024-07-20-Guide%20to%20Upsert%20in%20MongoDB.html","title":"MongoDB中的Upsert操作指南","lang":"zh-CN","frontmatter":{"date":"2024-07-20T00:00:00.000Z","category":["MongoDB","Upsert"],"tag":["MongoDB","Upsert","Java","数据库"],"head":[["meta",{"name":"MongoDB Upsert操作","content":"本文介绍了MongoDB中upsert操作的基本概念、使用方法和Java实现。"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-20/2024-07-20-Guide%20to%20Upsert%20in%20MongoDB.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"MongoDB中的Upsert操作指南"}],["meta",{"property":"og:description","content":"MongoDB中的Upsert操作指南 概述 Upsert是插入(insert)和更新(update)的结合体（inSERT + UPdate = upsert）。 我们可以在不同的更新方法中使用_upsert_，例如_update_、findAndModify_和_replaceOne。 在MongoDB中，upsert_选项是一个布尔值。假设值为_..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-20T10:38:09.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"MongoDB"}],["meta",{"property":"article:tag","content":"Upsert"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"数据库"}],["meta",{"property":"article:published_time","content":"2024-07-20T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-20T10:38:09.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"MongoDB中的Upsert操作指南\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-20T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-20T10:38:09.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"MongoDB中的Upsert操作指南 概述 Upsert是插入(insert)和更新(update)的结合体（inSERT + UPdate = upsert）。 我们可以在不同的更新方法中使用_upsert_，例如_update_、findAndModify_和_replaceOne。 在MongoDB中，upsert_选项是一个布尔值。假设值为_..."},"headers":[],"git":{"createdTime":1721471889000,"updatedTime":1721471889000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.21,"words":1262},"filePathRelative":"posts/baeldung/2024-07-20/2024-07-20-Guide to Upsert in MongoDB.md","localizedDate":"2024年7月20日","excerpt":"<hr>\\n<h1>MongoDB中的Upsert操作指南</h1>\\n<ol>\\n<li>概述</li>\\n</ol>\\n<p><strong>Upsert是插入(insert)和更新(update)的结合体（inSERT + UPdate = upsert）。</strong> 我们可以在不同的更新方法中使用_upsert_，例如_update_、<em>findAndModify_和_replaceOne</em>。</p>\\n<p>在MongoDB中，<em>upsert_选项是一个布尔值。假设值为_true</em>，并且文档与指定的查询过滤器匹配。在这种情况下，应用的更新操作将更新文档。如果值为_true_并且没有文档匹配条件，此选项将向集合中插入一个新文档。新文档将包含基于过滤器和应用操作的字段。</p>","autoDesc":true}');export{v as comp,p as data};
