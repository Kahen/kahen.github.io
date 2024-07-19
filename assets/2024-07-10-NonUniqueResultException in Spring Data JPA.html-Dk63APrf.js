import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as e,a as s}from"./app-D5kFWV-m.js";const t={},i=s(`<hr><h1 id="spring-data-jpa中的nonuniqueresultexception" tabindex="-1"><a class="header-anchor" href="#spring-data-jpa中的nonuniqueresultexception"><span>Spring Data JPA中的NonUniqueResultException</span></a></h1><p>Spring Data JPA提供了一个简单一致的接口来访问存储在各种关系型数据库中的数据，使开发者能够更容易地编写数据库无关的代码。它还消除了大量样板代码的需要，允许开发者专注于构建应用程序的业务逻辑。</p><p>然而，我们仍然需要确保正确的返回类型，否则会抛出一个异常。在本教程中，我们将重点关注_NonUniqueResultException_。我们将学习是什么导致了它以及当我们遇到它时如何修复我们的代码。</p><p>当一个查询方法预期返回单个结果但发现多个结果时，Spring Data JPA框架会抛出一个_运行时异常NonUniqueResultException_。这可能发生在使用Spring Data JPA的查询方法之一执行查询时，例如_findById()_、_findOne()_或不返回集合的自定义定义方法。</p><p>当抛出_NonUniqueResultException_时，这意味着正在使用的方法被设计为返回单个结果，但它找到了多个。这可能是由于查询不正确或数据库中的数据不一致。</p><h2 id="_3-示例" tabindex="-1"><a class="header-anchor" href="#_3-示例"><span><strong>3. 示例</strong></span></a></h2><p>让我们使用我们文章中已知的_实体Entity_，使用Spring Data JPA按日期和时间查询实体：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Entity</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Article</span> <span class="token punctuation">{</span>
    
    <span class="token annotation punctuation">@Id</span>
    <span class="token annotation punctuation">@GeneratedValue</span>
    <span class="token keyword">private</span> <span class="token class-name">Integer</span> id<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Temporal</span><span class="token punctuation">(</span><span class="token class-name">TemporalType</span><span class="token punctuation">.</span><span class="token constant">DATE</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">Date</span> publicationDate<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Temporal</span><span class="token punctuation">(</span><span class="token class-name">TemporalType</span><span class="token punctuation">.</span><span class="token constant">TIME</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">Date</span> publicationTime<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Temporal</span><span class="token punctuation">(</span><span class="token class-name">TemporalType</span><span class="token punctuation">.</span><span class="token constant">TIMESTAMP</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">Date</span> creationDateTime<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们创建我们的_ArticleRepository_并添加两个方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">ArticleRepository</span> <span class="token keyword">extends</span> <span class="token class-name">JpaRepository</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Article</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>\` <span class="token punctuation">{</span>

    <span class="token class-name">List</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Article</span><span class="token punctuation">&gt;</span></span>\`\` <span class="token function">findAllByPublicationTimeBetween</span><span class="token punctuation">(</span><span class="token class-name">Date</span> publicationTimeStart<span class="token punctuation">,</span> <span class="token class-name">Date</span> publicationTimeEnd<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">Article</span> <span class="token function">findByPublicationTimeBetween</span><span class="token punctuation">(</span><span class="token class-name">Date</span> publicationTimeStart<span class="token punctuation">,</span> <span class="token class-name">Date</span> publicationTimeEnd<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这两种方法之间唯一的区别是_findAllByPublicationTimeBetween()<em>的返回类型是_List<code>&lt;Article&gt;</code></em>，而_findByPublicationTimeBetween()<em>的返回类型是单个_Article</em>。</p><p>当我们执行第一个方法_findAllByPublicationTimeBetween_时，我们总是会得到一个集合。根据我们数据库中的数据，我们可以得到一个空的_List_或者一个包含一个或多个_Article_实例的_List_。</p><p>第二种方法_findByPublicationTimeBetween_，在数据库恰好包含零个或一个匹配的_Article_的情况下，理论上也是可行的。如果给定查询没有单个条目，该方法将返回_null_。另一方面，如果有对应的_Article_，它将返回单个_Article_。</p><p>然而，如果有多个_Article_s与_findByPublicationTimeBetween_的查询匹配，该方法将抛出一个_NonUniqueResultException_，然后被包装在一个_IncorrectResultSizeDataAccessException_中。</p><p>当这样的异常可以在运行时随机发生时，这表明数据库设计或我们的方法实现有问题。在下一节中，我们将学习如何避免这个错误。</p><h2 id="_4-避免-nonuniqueresultexception-的提示" tabindex="-1"><a class="header-anchor" href="#_4-避免-nonuniqueresultexception-的提示"><span><strong>4. 避免_NonUniqueResultException_的提示</strong></span></a></h2><p>为了避免_NonUniqueResultException_，重要的是仔细设计数据库查询并正确使用Spring Data JPA的查询方法。在设计查询时，重要的是确保它总是返回预期数量的结果。我们可以通过仔细指定我们的查询条件来实现这一点，例如使用唯一键或其他识别信息。</p><p>在设计我们的查询方法时，我们应该遵循一些基本规则以避免_NonUniqueResultExceptions_：</p><ul><li><strong>如果可能返回多个值，我们应该使用_List_或_Set_作为返回类型。</strong></li><li>我们只有在能够通过数据库设计<strong>确保只有一个返回值</strong>时才使用单个返回值。这总是发生在我们寻找一个唯一键如_Id_、<em>UUID</em>，或者根据数据库设计，也可能是一个保证唯一的电子邮件或电话号码。</li><li>另一种确保只有一个返回值的方法是<strong>限制返回到单个元素</strong>。这在例如我们总是想要最新的_Article_时可能会很有用。</li></ul><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span><strong>5. 结论</strong></span></a></h2><p>_NonUniqueResultException_是一个在使用Spring Data JPA时需要理解并避免的重要异常。当一个查询预期返回单个结果但发现多个结果时，就会发生这种情况。我们可以通过确保我们的_JpaRepository_方法返回正确数量的元素并相应地指定正确的返回类型来预防这种情况。</p><p>通过理解和正确避免_NonUniqueResultException_，我们可以确保我们的应用程序能够一致可靠地从数据库访问数据。</p><p>如往常一样，这些示例也可以在GitHub上找到。</p>`,24),p=[i];function o(c,l){return e(),a("div",null,p)}const d=n(t,[["render",o],["__file","2024-07-10-NonUniqueResultException in Spring Data JPA.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-07-10/2024-07-10-NonUniqueResultException%20in%20Spring%20Data%20JPA.html","title":"Spring Data JPA中的NonUniqueResultException","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Spring Data JPA","NonUniqueResultException"],"tag":["Exception Handling","JPA"],"head":[["meta",{"name":"keywords","content":"Spring Data JPA, NonUniqueResultException, Exception Handling"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-10/2024-07-10-NonUniqueResultException%20in%20Spring%20Data%20JPA.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Spring Data JPA中的NonUniqueResultException"}],["meta",{"property":"og:description","content":"Spring Data JPA中的NonUniqueResultException Spring Data JPA提供了一个简单一致的接口来访问存储在各种关系型数据库中的数据，使开发者能够更容易地编写数据库无关的代码。它还消除了大量样板代码的需要，允许开发者专注于构建应用程序的业务逻辑。 然而，我们仍然需要确保正确的返回类型，否则会抛出一个异常。在本教..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-11T00:02:05.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Exception Handling"}],["meta",{"property":"article:tag","content":"JPA"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-11T00:02:05.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Spring Data JPA中的NonUniqueResultException\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-11T00:02:05.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Spring Data JPA中的NonUniqueResultException Spring Data JPA提供了一个简单一致的接口来访问存储在各种关系型数据库中的数据，使开发者能够更容易地编写数据库无关的代码。它还消除了大量样板代码的需要，允许开发者专注于构建应用程序的业务逻辑。 然而，我们仍然需要确保正确的返回类型，否则会抛出一个异常。在本教..."},"headers":[{"level":2,"title":"3. 示例","slug":"_3-示例","link":"#_3-示例","children":[]},{"level":2,"title":"4. 避免_NonUniqueResultException_的提示","slug":"_4-避免-nonuniqueresultexception-的提示","link":"#_4-避免-nonuniqueresultexception-的提示","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720656125000,"updatedTime":1720656125000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.69,"words":1107},"filePathRelative":"posts/baeldung/2024-07-10/2024-07-10-NonUniqueResultException in Spring Data JPA.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>Spring Data JPA中的NonUniqueResultException</h1>\\n<p>Spring Data JPA提供了一个简单一致的接口来访问存储在各种关系型数据库中的数据，使开发者能够更容易地编写数据库无关的代码。它还消除了大量样板代码的需要，允许开发者专注于构建应用程序的业务逻辑。</p>\\n<p>然而，我们仍然需要确保正确的返回类型，否则会抛出一个异常。在本教程中，我们将重点关注_NonUniqueResultException_。我们将学习是什么导致了它以及当我们遇到它时如何修复我们的代码。</p>\\n<p>当一个查询方法预期返回单个结果但发现多个结果时，Spring Data JPA框架会抛出一个_运行时异常NonUniqueResultException_。这可能发生在使用Spring Data JPA的查询方法之一执行查询时，例如_findById()_、_findOne()_或不返回集合的自定义定义方法。</p>","autoDesc":true}');export{d as comp,m as data};
