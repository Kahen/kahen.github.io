import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as t,a as d}from"./app-BUAgDejY.js";const i={},a=d(`<hr><h1 id="mongodb中更新文档-baeldung" tabindex="-1"><a class="header-anchor" href="#mongodb中更新文档-baeldung"><span>MongoDB中更新文档 | Baeldung</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>MongoDB 是一个跨平台的、面向文档的开源 NoSQL 数据库，用 C++ 编写。此外，MongoDB 提供高性能、高可用性和自动扩展。</p><p>为了在 MongoDB 中更新文档，我们可以使用不同的方法，如 <em>updateOne</em>、<em>findOneAndUpdate</em> 等。此外，MongoDB 为更新方法提供了各种操作符。</p><p>在本教程中，我们将讨论在 MongoDB 中执行更新操作的不同方法。对于每种方法，我们将首先讨论 mongo shell 查询，然后是其在 Java 中的实现。</p><h2 id="_2-数据库设置" tabindex="-1"><a class="header-anchor" href="#_2-数据库设置"><span>2. 数据库设置</span></a></h2><p>在我们继续更新查询之前，让我们首先创建一个数据库 <em>baeldung</em> 和一个示例集合 <em>student</em>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>use baeldung;
db.createCollection(student);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>作为示例，让我们使用 <em>insertMany</em> 查询向集合 <em>student</em> 中添加一些文档：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>db.student.insertMany([
    {
        &quot;student_id&quot;: 8764,
        &quot;student_name&quot;: &quot;Paul Starc&quot;,
        &quot;address&quot;: &quot;Hostel 1&quot;,
        &quot;age&quot;: 16,
        &quot;roll_no&quot;:199406
    },
    {
        &quot;student_id&quot;: 8765,
        &quot;student_name&quot;: &quot;Andrew Boult&quot;,
        &quot;address&quot;: &quot;Hostel 2&quot;,
        &quot;age&quot;: 18,
        &quot;roll_no&quot;:199408
    }
]);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>成功插入后，我们将得到一个带有 <em>acknowledged:true</em> 的 JSON：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>{
    &quot;acknowledged&quot; : true,
    &quot;insertedIds&quot; : [
        ObjectId(&quot;621b078485e943405d04b557&quot;),
ObjectId(&quot;621b078485e943405d04b558&quot;)
    ]
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在让我们深入了解在 MongoDB 中更新文档的不同方式。</p><h2 id="_3-使用-updateone-方法" tabindex="-1"><a class="header-anchor" href="#_3-使用-updateone-方法"><span>3. 使用 <em>updateOne</em> 方法</span></a></h2><p>在 MongoDB 中的更新操作可以通过添加一个新字段、删除一个字段或更新一个现有字段来完成。<em>updateOne</em> 方法根据应用的查询过滤器更新集合中的单个文档。它首先找到匹配过滤器的文档，然后更新指定的字段。</p><p>此外，<strong>我们可以使用不同的操作符如 <em>$set</em>、<em>$unset</em>、<em>$inc</em> 等，与更新方法一起使用。</strong></p><p>为了演示，让我们看看更新集合中的单个文档的查询：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>db.student.updateOne(
    {
        &quot;student_name&quot; : &quot;Paul Starc&quot;
    },
    {
        $set: {
            &quot;address&quot; : &quot;Hostel 2&quot;
        }
    }
 );
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们将得到类似于下面显示的输出：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>{
    &quot;acknowledged&quot;:true,
    &quot;matchedCount&quot;:1,
    &quot;modifiedCount&quot;:1
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在让我们看看上述 <em>updateOne</em> 查询的 Java 驱动代码：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>UpdateResult updateResult = collection.updateOne(Filters.eq(&quot;student_name&quot;, &quot;Paul Starc&quot;),
Updates.set(&quot;address&quot;, &quot;Hostel 2&quot;));
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们首先使用 <em>student_name</em> 字段来过滤文档。然后我们更新 <em>student_name</em> “Paul Starc” 的文档的地址。</p><h2 id="_4-使用-updatemany-方法" tabindex="-1"><a class="header-anchor" href="#_4-使用-updatemany-方法"><span>4. 使用 <em>updateMany</em> 方法</span></a></h2><p><em>updateMany</em> 方法更新 MongoDB 集合中所有匹配给定过滤器的文档。<strong>使用 <em>updateMany</em> 的好处之一是我们可以更新多个文档而不会丢失旧文档的字段。</strong></p><p>让我们看看使用 <em>updateMany</em> 方法的 MongoDB shell 查询：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>db.student.updateMany(
    {
        age: {
            $lt: 20
         }
    },
    {
        $set:{
            &quot;Review&quot; : true
        }
    }
);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述命令将返回以下输出：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>{
    &quot;acknowledged&quot;:true,
    &quot;matchedCount&quot;:2,
    &quot;modifiedCount&quot;:2
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，<em>matchedCount</em> 包含匹配文档的数量，而 <em>modifiedCount</em> 包含修改的文档数量。</p><p>现在让我们看看使用 <em>updateMany</em> 方法的 Java 驱动代码：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>UpdateResult updateResult = collection.updateMany(Filters.lt(&quot;age&quot;, 20), Updates.set(&quot;Review&quot;, true));
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在这里，所有 <em>age</em> 小于 20 的文档将被过滤，并将 <em>Review</em> 字段设置为 <em>true</em>。</p><h2 id="_5-使用-replaceone-方法" tabindex="-1"><a class="header-anchor" href="#_5-使用-replaceone-方法"><span>5. 使用 <em>replaceOne</em> 方法</span></a></h2><p>MongoDB 的 <em>replaceOne</em> 方法替换整个文档。<strong>使用 <em>replaceOne</em> 的一个缺点是所有旧字段将被新字段替换，旧字段也会丢失：</strong></p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>db.student.replaceOne(
    {
        &quot;student_id&quot;: 8764
    },
    {
        &quot;student_id&quot;: 8764,
        &quot;student_name&quot;: &quot;Paul Starc&quot;,
        &quot;address&quot;: &quot;Hostel 2&quot;,
        &quot;age&quot;: 18,
        &quot;roll_no&quot;:199406
    }
);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这种情况下，我们将得到以下输出：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>{
    &quot;acknowledged&quot;:true,
    &quot;matchedCount&quot;:1,
    &quot;modifiedCount&quot;:1
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果没有找到匹配项，操作将返回 <em>matchedCount</em> 为 0：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>{
    &quot;acknowledged&quot;:true,
    &quot;matchedCount&quot;:0,
    &quot;modifiedCount&quot;:0
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在让我们编写使用 <em>replaceOne</em> 方法的相应 Java 驱动代码：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Document replaceDocument = new Document();
replaceDocument
  .append(&quot;student_id&quot;, 8764)
  .append(&quot;student_name&quot;, &quot;Paul Starc&quot;)
  .append(&quot;address&quot;, &quot;Hostel 2&quot;)
  .append(&quot;age&quot;,18)
  .append(&quot;roll_no&quot;, 199406);
UpdateResult updateResult = collection.replaceOne(Filters.eq(&quot;student_id&quot;, 8764), replaceDocument);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的代码中，我们创建了一个文档，旧文档将被该文档替换。具有 <em>student_id</em> 8764 的文档将被新创建的文档替换。</p><h2 id="_6-使用-findoneandreplace-方法" tabindex="-1"><a class="header-anchor" href="#_6-使用-findoneandreplace-方法"><span>6. 使用 <em>findOneAndReplace</em> 方法</span></a></h2><p><em>findOneAndReplace</em> 方法是 MongoDB 提供的一种高级更新方法，它根据给定的选择标准替换第一个匹配的文档。默认情况下，此方法返回原始文档。我们可以使用 <em>findOneAndReplace</em> 的不同选项对文档进行排序和投影（如果需要）。</p><p>简而言之，<em>findOneAndReplace</em> 根据应用的过滤器替换集合中的第一个匹配文档：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>db.student.findOneAndReplace(
    {
        &quot;student_id&quot; : {
            $eq : 8764
        }
    },
    {
        &quot;student_id&quot; : 8764,
        &quot;student_name&quot; : &quot;Paul Starc&quot;,
        &quot;address&quot;: &quot;Hostel 2&quot;,
        &quot;age&quot;: 18,
        &quot;roll_no&quot;:199406
    },
    {
        returnNewDocument: false
    }
);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此查询将返回以下文档：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>{
    &quot;student_id&quot;:8764,
    &quot;student_name&quot;:&quot;Paul Starc&quot;,
    &quot;address&quot;:&quot;Hostel 1&quot;,
    &quot;age&quot;:16,
    &quot;roll_no&quot;:199406
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们将 <em>returnNewDocument</em> 设置为 <em>true</em>，则操作将返回替换后的文档：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>{
    &quot;student_id&quot;:8764,
    &quot;student_name&quot;:&quot;Paul Starc&quot;,
    &quot;address&quot;:&quot;Hostel 2&quot;,
    &quot;age&quot;:18,
    &quot;roll_no&quot;:199406
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在让我们使用 <em>findOneAndReplace</em> 方法在返回的文档中投影 <em>student_id</em> 和 <em>age</em> 字段：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>db.student.findOneAndReplace(
    {
        &quot;student_id&quot; : {
        $eq : 8764
        }
    },
    {
        &quot;student_id&quot; : 8764,
        &quot;student_name&quot; : &quot;Paul Starc&quot;,
        &quot;address&quot;: &quot;Hostel 2&quot;,
        &quot;age&quot;: 18,
        &quot;roll_no&quot;:199406
    },
    {
        projection: {
            &quot;_id&quot; : 0,
            &quot;student_id&quot;:1,
            &quot;age&quot; : 1
        }
    }
);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述查询的输出将仅包含投影字段：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>{
    &quot;student_id&quot;:&quot;8764&quot;,
    &quot;age&quot;:16
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述查询的各种选项的 Java 驱动代码：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Document replaceDocument = new Document();
replaceDocument
  .append(&quot;student_id&quot;, 8764)
  .append(&quot;student_name&quot;, &quot;Paul Starc&quot;)
  .append(&quot;address&quot;, &quot;Hostel 2&quot;)
  .append(&quot;age&quot;, 18)
  .append(&quot;roll_no&quot;, 199406);
Document sort = new Document(&quot;roll_no&quot;, 1);
Document projection = new Document(&quot;_id&quot;, 0).append(&quot;student_id&quot;, 1).append(&quot;address&quot;, 1);
Document resultDocument = collection.findOneAndReplace(
  Filters.eq(&quot;student_id&quot;, 8764),
  replaceDocument,
  new FindOneAndReplaceOptions().upsert(true\`\`\` 
).sort(sort).projection(projection).returnDocument(ReturnDocument.AFTER));
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的查询中，<em>findOneAndReplace</em> 方法将首先根据 <em>roll_no</em> 升序排序文档，然后新创建的文档将替换具有 <em>student_id</em> “8764” 的文档。</p><h2 id="_7-使用-findoneandupdate-方法" tabindex="-1"><a class="header-anchor" href="#_7-使用-findoneandupdate-方法"><span>7. 使用 <em>findOneAndUpdate</em> 方法</span></a></h2><p><em>findOneAndUpdate</em> 方法更新集合中的第一个匹配文档。如果多个文档匹配选择标准，则只更新第一个匹配的文档。当我们更新文档时，<em>_id</em> 字段的值保持不变：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>db.student.findOneAndUpdate(
    {
        &quot;student_id&quot; : 8764
    },
    {
        $inc : {
            &quot;roll_no&quot; : 5
        }
    },
    {
        sort: {
            &quot;roll_no&quot; : 1
        },
        projection: {
            &quot;_id&quot; : 0,
            &quot;student_id&quot;:1,
            &quot;address&quot; : 1
        }
    }
);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查询的输出将只包含旧文档的 <em>studentId</em> 和 <em>address</em>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>{
    &quot;student_id&quot;:8764,
    &quot;address&quot;:&quot;Hostel 1&quot;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述查询的不同选项的 <em>findOneAndUpdate</em> 的 Java 驱动代码如下：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Document sort = new Document(&quot;roll_no&quot;, 1);
Document projection = new Document(&quot;_id&quot;, 0).append(&quot;student_id&quot;, 1).append(&quot;address&quot;, 1);
Document resultDocument = collection.findOneAndUpdate(
  Filters.eq(&quot;student_id&quot;, 8764),
  Updates.inc(&quot;roll_no&quot;, 5),
  new FindOneAndUpdateOptions().sort(sort).projection(projection).returnDocument(ReturnDocument.BEFORE));
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这种情况下，<em>findOneAndUpdate</em> 方法将首先根据 <em>roll_no</em> 升序排序文档。上述查询将 <em>roll_no</em> 增加 5，然后返回 <em>student_id</em> 和 <em>address</em> 字段。</p><h2 id="_8-结论" tabindex="-1"><a class="header-anchor" href="#_8-结论"><span>8. 结论</span></a></h2><p>在本文中，我们看到了在 MongoDB 中更新文档的各种方式。首先，我们查看了 MongoDB shell 查询，然后我们讨论了相应的 Java 驱动代码。</p><p>所有这些示例和代码片段的实现都可以在 GitHub 上找到。</p><p>OK</p>`,71),l=[a];function s(u,o){return t(),n("div",null,l)}const v=e(i,[["render",s],["__file","2024-07-21-Update Documents in MongoDB.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-07-21/2024-07-21-Update%20Documents%20in%20MongoDB.html","title":"MongoDB中更新文档 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-07-21T00:00:00.000Z","category":["MongoDB","数据库"],"tag":["MongoDB","更新文档","Java"],"head":[["meta",{"name":"keywords","content":"MongoDB, 更新文档, Java"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-21/2024-07-21-Update%20Documents%20in%20MongoDB.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"MongoDB中更新文档 | Baeldung"}],["meta",{"property":"og:description","content":"MongoDB中更新文档 | Baeldung 1. 概述 MongoDB 是一个跨平台的、面向文档的开源 NoSQL 数据库，用 C++ 编写。此外，MongoDB 提供高性能、高可用性和自动扩展。 为了在 MongoDB 中更新文档，我们可以使用不同的方法，如 updateOne、findOneAndUpdate 等。此外，MongoDB 为更新方..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-21T03:18:28.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"MongoDB"}],["meta",{"property":"article:tag","content":"更新文档"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:published_time","content":"2024-07-21T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-21T03:18:28.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"MongoDB中更新文档 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-21T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-21T03:18:28.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"MongoDB中更新文档 | Baeldung 1. 概述 MongoDB 是一个跨平台的、面向文档的开源 NoSQL 数据库，用 C++ 编写。此外，MongoDB 提供高性能、高可用性和自动扩展。 为了在 MongoDB 中更新文档，我们可以使用不同的方法，如 updateOne、findOneAndUpdate 等。此外，MongoDB 为更新方..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 数据库设置","slug":"_2-数据库设置","link":"#_2-数据库设置","children":[]},{"level":2,"title":"3. 使用 updateOne 方法","slug":"_3-使用-updateone-方法","link":"#_3-使用-updateone-方法","children":[]},{"level":2,"title":"4. 使用 updateMany 方法","slug":"_4-使用-updatemany-方法","link":"#_4-使用-updatemany-方法","children":[]},{"level":2,"title":"5. 使用 replaceOne 方法","slug":"_5-使用-replaceone-方法","link":"#_5-使用-replaceone-方法","children":[]},{"level":2,"title":"6. 使用 findOneAndReplace 方法","slug":"_6-使用-findoneandreplace-方法","link":"#_6-使用-findoneandreplace-方法","children":[]},{"level":2,"title":"7. 使用 findOneAndUpdate 方法","slug":"_7-使用-findoneandupdate-方法","link":"#_7-使用-findoneandupdate-方法","children":[]},{"level":2,"title":"8. 结论","slug":"_8-结论","link":"#_8-结论","children":[]}],"git":{"createdTime":1721531908000,"updatedTime":1721531908000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.1,"words":1530},"filePathRelative":"posts/baeldung/2024-07-21/2024-07-21-Update Documents in MongoDB.md","localizedDate":"2024年7月21日","excerpt":"<hr>\\n<h1>MongoDB中更新文档 | Baeldung</h1>\\n<h2>1. 概述</h2>\\n<p>MongoDB 是一个跨平台的、面向文档的开源 NoSQL 数据库，用 C++ 编写。此外，MongoDB 提供高性能、高可用性和自动扩展。</p>\\n<p>为了在 MongoDB 中更新文档，我们可以使用不同的方法，如 <em>updateOne</em>、<em>findOneAndUpdate</em> 等。此外，MongoDB 为更新方法提供了各种操作符。</p>\\n<p>在本教程中，我们将讨论在 MongoDB 中执行更新操作的不同方法。对于每种方法，我们将首先讨论 mongo shell 查询，然后是其在 Java 中的实现。</p>","autoDesc":true}');export{v as comp,m as data};
