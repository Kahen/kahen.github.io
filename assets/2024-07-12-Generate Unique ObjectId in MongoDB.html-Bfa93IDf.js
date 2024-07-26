import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as n,a as d}from"./app-8nJ1rqSf.js";const i={},a=d(`<h1 id="在mongodb中生成唯一的objectid" tabindex="-1"><a class="header-anchor" href="#在mongodb中生成唯一的objectid"><span>在MongoDB中生成唯一的ObjectId</span></a></h1><p>在这篇文章中，我们将讨论什么是ObjectId，如何生成它，以及确保其唯一性可能的方法。</p><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><h2 id="_2-objectid-基本信息" tabindex="-1"><a class="header-anchor" href="#_2-objectid-基本信息"><span>2. ObjectId 基本信息</span></a></h2><p>让我们首先解释一下什么是ObjectId。<strong>ObjectId是一个12字节的十六进制值</strong>，是BSON规范中可能的数据类型之一。BSON是JSON文档的二进制序列化。此外，MongoDB使用ObjectId作为文档中_id字段的默认标识符。当创建集合时，还会在_id字段上设置默认的唯一索引。</p><p>这防止用户插入两个具有相同_id的文档。此外，_id索引不能从集合中删除。然而，可以在两个集合中插入具有相同_id的单个文档。</p><h3 id="_2-1-objectid-结构" tabindex="-1"><a class="header-anchor" href="#_2-1-objectid-结构"><span>2.1 ObjectId 结构</span></a></h3><p>ObjectId可以分为三个不同的部分。考虑到ObjectId 6359388c80616b1fc6d7ec71，第一部分将由4个字节组成 - 6359388c。这4个字节表示自Unix纪元以来的秒数。第二部分由接下来的5个字节组成，即80616b1fc6。这些字节表示每个进程生成一次的随机值。该随机值对于机器和进程是唯一的。最后一部分是3个字节d7ec71，它表示从随机值开始的递增计数器。</p><p>还值得一提的是，<strong>上述结构适用于MongoDB 4.0及以上版本</strong>。在此之前，ObjectId由四部分组成。前4个字节表示自Unix纪元以来的秒数，接下来的三个字节用于机器标识符。</p><p>接下来的2个字节用于进程ID，最后的3个字节用于从随机值开始的计数器。</p><h3 id="_2-2-objectid-唯一性" tabindex="-1"><a class="header-anchor" href="#_2-2-objectid-唯一性"><span>2.2 ObjectId 唯一性</span></a></h3><p>MongoDB文档中也提到了最重要的一点，即在生成时ObjectId被<strong>高度认为可能是唯一的</strong>。也就是说，生成重复ObjectId的可能性非常小。查看ObjectId的结构，我们可以看到在一秒钟内生成ObjectId的可能性超过1.8×10^19。</p><p>即使所有ID都是在同一秒、同一台机器、同一进程中生成的，仅计数器本身就有超过1700万种可能性。</p><h2 id="_3-objectid-创建" tabindex="-1"><a class="header-anchor" href="#_3-objectid-创建"><span>3. ObjectId 创建</span></a></h2><p>在Java中有多种创建ObjectId的方法。可以通过无参数构造函数或参数化构造函数来完成。</p><h3 id="_3-1-使用无参数构造函数创建objectid" tabindex="-1"><a class="header-anchor" href="#_3-1-使用无参数构造函数创建objectid"><span>3.1 使用无参数构造函数创建ObjectId</span></a></h3><p>第一种，也是最简单的一种，是通过使用无参数构造函数的新关键字：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>ObjectId objectId = new ObjectId();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>第二种是简单地调用ObjectId类的静态方法_get()_。而不是直接调用无参数构造函数。然而，_get()_方法的实现与第一个示例中通过新关键字创建ObjectId相同：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>ObjectId objectId = ObjectId.get();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_3-2-使用参数化构造函数创建objectid" tabindex="-1"><a class="header-anchor" href="#_3-2-使用参数化构造函数创建objectid"><span>3.2 使用参数化构造函数创建ObjectId</span></a></h3><p>其余示例使用参数化构造函数。我们可以通过传递Date类作为参数或同时传递Date类和int计数器来创建ObjectId。如果我们尝试使用相同的Date在这两种方法中创建ObjectId，我们将得到不同的ObjectId，即new ObjectId(date)与new ObjectId(date, counter)。</p><p>然而，如果我们在同一秒通过new ObjectId(date, counter)创建两个ObjectId，我们将得到一个重复的ObjectId，因为它是在同一秒、同一台机器上，并且使用相同的计数器生成的。让我们看一个例子：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
public void givenSameDateAndCounter_whenComparingObjectIds_thenTheyAreNotEqual() {
    Date date = new Date();
    ObjectId objectIdDate = new ObjectId(date); // 635981f6e40f61599e839ddb
    ObjectId objectIdDateCounter1 = new ObjectId(date, 100); // 635981f6e40f61599e000064
    ObjectId objectIdDateCounter2 = new ObjectId(date, 100); // 635981f6e40f61599e000064

    assertThat(objectIdDate).isNotEqualTo(objectIdDateCounter1);
    assertThat(objectIdDate).isNotEqualTo(objectIdDateCounter2);

    assertThat(objectIdDateCounter1).isEqualTo(objectIdDateCounter2);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此外，还可以通过直接提供十六进制值作为参数来创建ObjectId：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>ObjectId objectIdHex = new ObjectId(&quot;635981f6e40f61599e000064&quot;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>还有更多创建ObjectId的可能性。我们可以传递byte[]或ByteBuffer类。如果我们通过将字节数组传递给构造函数来创建ObjectId，我们应该能够通过使用相同的字节数组创建ByteBuffer类来得到相同的ObjectId。</p><p>让我们看一个例子：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
public void givenSameArrayOfBytes_whenComparingObjectIdsCreatedViaDifferentMethods_thenTheObjectIdsAreEqual(){
    byte[] bytes = &quot;123456789012&quot;.getBytes();
    ObjectId objectIdBytes = new ObjectId(bytes);

    ByteBuffer buffer = ByteBuffer.wrap(bytes);
    ObjectId objectIdByteBuffer = new ObjectId(buffer);

    assertThat(objectIdBytes).isEqualTo(objectIdByteBuffer);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后一种可能的方法是通过传递时间戳和计数器到构造函数来创建ObjectId。</p><h2 id="_4-objectid-的优缺点" tabindex="-1"><a class="header-anchor" href="#_4-objectid-的优缺点"><span>4. ObjectId 的优缺点</span></a></h2><p>正如所有事物一样，了解ObjectId的优缺点是值得的。</p><h3 id="_4-1-objectid-的好处" tabindex="-1"><a class="header-anchor" href="#_4-1-objectid-的好处"><span>4.1 ObjectId 的好处</span></a></h3><p>由于ObjectId是12字节长，它比16字节的UUID小。也就是说，如果我们在数据库中使用ObjectId而不是UUID，我们将节省一些空间。大约26500次ObjectId的使用可以比UUID节省大约1MB。这看起来是一个最小的数量。</p><p>尽管如此，如果数据库足够大，而且也有可能单个文档会有多个ObjectId的出现，那么磁盘空间和RAM的节省可能会更显著，因为最终文档会更小。其次，正如我们之前学到的，ObjectId中嵌入了时间戳，这在某些情况下可能很有用。</p><p>例如，确定哪个ObjectId是首先创建的，假设所有ObjectId都是自动生成的，而不是像我们之前看到的那样通过操作Date类到参数化构造函数中创建的。</p><h3 id="_4-2-objectid-的缺点" tabindex="-1"><a class="header-anchor" href="#_4-2-objectid-的缺点"><span>4.2 ObjectId 的缺点</span></a></h3><p>另一方面，还有一些甚至比12字节的ObjectId更小的标识符，这将节省更多的磁盘空间和RAM。此外，由于ObjectId只是一个生成的十六进制值，这意味着有<strong>可能存在重复的id</strong>。可能性非常小，但仍然存在。</p><h2 id="_5-确保objectid-的唯一性" tabindex="-1"><a class="header-anchor" href="#_5-确保objectid-的唯一性"><span>5. 确保ObjectId 的唯一性</span></a></h2><p>如果我们必须确保生成的ObjectId是唯一的，我们可以尝试围绕它进行一些编程，以确保它100%不是重复的。</p><h3 id="_5-1-捕获-duplicatekeyexception" tabindex="-1"><a class="header-anchor" href="#_5-1-捕获-duplicatekeyexception"><span>5.1 捕获 DuplicateKeyException</span></a></h3><p>假设我们向数据库中插入一个已经存在的_id字段的文档。在这种情况下，我们可以捕获<strong>DuplicateKeyException</strong>并重试插入操作，直到成功。此方法仅适用于<strong>已创建唯一索引的字段</strong>。</p><p>让我们看一个例子。考虑到一个User类：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public class User {
    public static final String NAME_FIELD = &quot;name&quot;;

    private final ObjectId id;
    private final String name;

    // 构造函数
    // getter
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们将User插入数据库，然后尝试插入另一个具有相同ObjectId的User。这将导致抛出DuplicateKeyException。我们可以捕获它并重试User的插入操作。然而，这次我们将生成另一个ObjectId。为了这个测试，我们将使用嵌入式MongoDB库和Spring Data with MongoDB。</p><p>让我们看一个例子：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
public void givenUserInDatabase_whenInsertingAnotherUserWithTheSameObjectId_DKEThrownAndInsertRetried() {
    // given
    String userName = &quot;Kevin&quot;;
    User firstUser = new User(ObjectId.get(), userName);
    User secondUser = new User(ObjectId.get(), userName);

    mongoTemplate.insert(firstUser);

    // when
    try {
        mongoTemplate.insert(firstUser);
    } catch (DuplicateKeyException dke) {
        mongoTemplate.insert(secondUser);
    }

    // then
    Query query = new Query();
    query.addCriteria(Criteria.where(User.NAME_FIELD)
      .is(userName));
    List\`&lt;User&gt;\` users = mongoTemplate.find(query, User.class);
    assertThat(users).usingRecursiveComparison()
      .isEqualTo(Lists.newArrayList(firstUser, secondUser));
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-2-查找和插入" tabindex="-1"><a class="header-anchor" href="#_5-2-查找和插入"><span>5.2 查找和插入</span></a></h3><p>另一种可能的方法，可能不推荐，可能是查找具有给定ObjectId的文档，看看它是否存在。如果不存在，我们可以插入它。否则，抛出错误或生成另一个ObjectId并重试。这种方法也是不可靠的，因为MongoDB中没有<strong>原子查找和插入</strong>选项，这可能导致不一致。</p><p><strong>通常的做法是自动生成ObjectId并尝试插入文档而不确保其唯一性</strong>。在每次插入时尝试捕获DuplicateKeyException并重试操作似乎有些过头。边缘情况的数量非常有限，而且如果不首先通过Date、计数器或时间戳来播种ObjectId，就很难重现这种情况。</p><p>然而，如果出于某种原因，我们不能承受由于这些边缘情况而有重复的ObjectId，那么我们会考虑使用上述方法来确保全局唯一性。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在这篇文章中，我们学习了什么是ObjectId，它是如何构建的，如何生成它，以及确保其唯一性可能的方法。最终，最好的想法是信任ObjectId的自动生成。</p><p>所有代码示例都可以在GitHub上找到。</p>`,54),c=[a];function s(r,l){return n(),t("div",null,c)}const p=e(i,[["render",s],["__file","2024-07-12-Generate Unique ObjectId in MongoDB.html.vue"]]),u=JSON.parse('{"path":"/posts/baeldung/2024-07-12/2024-07-12-Generate%20Unique%20ObjectId%20in%20MongoDB.html","title":"在MongoDB中生成唯一的ObjectId","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["MongoDB","技术"],"tag":["ObjectId","唯一性","技术"],"head":[["meta",{"name":"keywords","content":"MongoDB, ObjectId, 唯一性, 技术"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-12/2024-07-12-Generate%20Unique%20ObjectId%20in%20MongoDB.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在MongoDB中生成唯一的ObjectId"}],["meta",{"property":"og:description","content":"在MongoDB中生成唯一的ObjectId 在这篇文章中，我们将讨论什么是ObjectId，如何生成它，以及确保其唯一性可能的方法。 1. 引言 2. ObjectId 基本信息 让我们首先解释一下什么是ObjectId。ObjectId是一个12字节的十六进制值，是BSON规范中可能的数据类型之一。BSON是JSON文档的二进制序列化。此外，Mon..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-12T19:36:03.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"ObjectId"}],["meta",{"property":"article:tag","content":"唯一性"}],["meta",{"property":"article:tag","content":"技术"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-12T19:36:03.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在MongoDB中生成唯一的ObjectId\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-12T19:36:03.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在MongoDB中生成唯一的ObjectId 在这篇文章中，我们将讨论什么是ObjectId，如何生成它，以及确保其唯一性可能的方法。 1. 引言 2. ObjectId 基本信息 让我们首先解释一下什么是ObjectId。ObjectId是一个12字节的十六进制值，是BSON规范中可能的数据类型之一。BSON是JSON文档的二进制序列化。此外，Mon..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. ObjectId 基本信息","slug":"_2-objectid-基本信息","link":"#_2-objectid-基本信息","children":[{"level":3,"title":"2.1 ObjectId 结构","slug":"_2-1-objectid-结构","link":"#_2-1-objectid-结构","children":[]},{"level":3,"title":"2.2 ObjectId 唯一性","slug":"_2-2-objectid-唯一性","link":"#_2-2-objectid-唯一性","children":[]}]},{"level":2,"title":"3. ObjectId 创建","slug":"_3-objectid-创建","link":"#_3-objectid-创建","children":[{"level":3,"title":"3.1 使用无参数构造函数创建ObjectId","slug":"_3-1-使用无参数构造函数创建objectid","link":"#_3-1-使用无参数构造函数创建objectid","children":[]},{"level":3,"title":"3.2 使用参数化构造函数创建ObjectId","slug":"_3-2-使用参数化构造函数创建objectid","link":"#_3-2-使用参数化构造函数创建objectid","children":[]}]},{"level":2,"title":"4. ObjectId 的优缺点","slug":"_4-objectid-的优缺点","link":"#_4-objectid-的优缺点","children":[{"level":3,"title":"4.1 ObjectId 的好处","slug":"_4-1-objectid-的好处","link":"#_4-1-objectid-的好处","children":[]},{"level":3,"title":"4.2 ObjectId 的缺点","slug":"_4-2-objectid-的缺点","link":"#_4-2-objectid-的缺点","children":[]}]},{"level":2,"title":"5. 确保ObjectId 的唯一性","slug":"_5-确保objectid-的唯一性","link":"#_5-确保objectid-的唯一性","children":[{"level":3,"title":"5.1 捕获 DuplicateKeyException","slug":"_5-1-捕获-duplicatekeyexception","link":"#_5-1-捕获-duplicatekeyexception","children":[]},{"level":3,"title":"5.2 查找和插入","slug":"_5-2-查找和插入","link":"#_5-2-查找和插入","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720812963000,"updatedTime":1720812963000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":6.75,"words":2025},"filePathRelative":"posts/baeldung/2024-07-12/2024-07-12-Generate Unique ObjectId in MongoDB.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在这篇文章中，我们将讨论什么是ObjectId，如何生成它，以及确保其唯一性可能的方法。</p>\\n<h2>1. 引言</h2>\\n<h2>2. ObjectId 基本信息</h2>\\n<p>让我们首先解释一下什么是ObjectId。<strong>ObjectId是一个12字节的十六进制值</strong>，是BSON规范中可能的数据类型之一。BSON是JSON文档的二进制序列化。此外，MongoDB使用ObjectId作为文档中_id字段的默认标识符。当创建集合时，还会在_id字段上设置默认的唯一索引。</p>\\n<p>这防止用户插入两个具有相同_id的文档。此外，_id索引不能从集合中删除。然而，可以在两个集合中插入具有相同_id的单个文档。</p>","autoDesc":true}');export{p as comp,u as data};
