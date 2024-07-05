import{_ as t}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as e,o as n,a as i}from"./app-C4Y6naXm.js";const d={},a=i('<h1 id="spring-data中findbyid与getbyid的区别" tabindex="-1"><a class="header-anchor" href="#spring-data中findbyid与getbyid的区别"><span>Spring Data中findById与getById的区别</span></a></h1><ol><li>概述</li></ol><p>Spring Data提供了方便的方法来从数据存储中检索实体，包括findById和getById。尽管它们乍一看可能很相似，但存在细微的差别，这些差别可能会影响我们代码的功能。</p><p>本教程将探讨这些差异，并帮助我们有效地确定何时使用每种方法。</p><ol start="2"><li>理解findById</li></ol><p>首先，让我们看看findById方法。</p><p>2.1 方法签名</p><p>findById方法定义在CrudRepository接口中：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Optional`&lt;T&gt;` findById(ID id);\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>2.2 行为和返回类型</p><p>findById方法通过其唯一标识符（id）检索实体。它返回一个Optional包装器，表示实体可能存在于数据存储中，也可能不存在。<strong>如果找到了实体，它将被包装在Optional中。否则，Optional将是空的。</strong></p><p>2.3 使用场景</p><p>有几个使用场景，findById是更好的选择。</p><p>第一种是<strong>当我们预期实体可能不在数据存储中，并且想要优雅地处理两种情况（找到和未找到）</strong>。</p><p>此外，当我们想要与Java 8 Optional API结合使用时，它非常方便，以便在实体未找到时执行条件操作或执行回退逻辑。</p><ol start="3"><li>探索getById</li></ol><p>接下来，让我们探索getById方法。</p><p>3.1 方法签名</p><p>JpaRepository接口定义了getById方法：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>T getById(ID id);\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>3.2 行为和返回类型</p><p>与findById不同，getById方法直接返回实体而不是将其包装在Optional中。<strong>如果数据存储中不存在实体，将抛出EntityNotFoundException。</strong></p><p>3.3 使用场景</p><p>我们可以使用getById<strong>当我们确定给定id的实体存在于数据存储中</strong>。这种方法还提供了更简洁的语法，并避免了额外的Optional处理。</p><ol start="4"><li>选择正确的方法</li></ol><p>最后，让我们考虑一些可以帮助我们确定是使用findById还是getById的因素：</p><ul><li>存在保证：如果实体的存在得到保证，并且缺失将是一个例外情况，那么优先选择getById。这种方法避免了不必要的Optional处理，并简化了代码。</li><li>潜在的缺失：如果实体的存在不确定，或者我们需要优雅地处理找到和未找到的情况，使用findById以及Optional API。这种方法允许我们在不抛出异常的情况下执行条件操作。</li><li>从Spring Boot 2.7版本开始，<strong>getById方法被标记为已弃用</strong>，文档推荐使用getReferenceById方法。</li></ul><ol start="5"><li>结论</li></ol><p>在本教程中，我们学习了Spring Data中findById和getById方法之间的区别。虽然findById返回一个Optional并优雅地处理实体的缺失，getById直接返回实体并在其不存在时抛出异常。<strong>两种方法之间的选择取决于实体的存在是否得到保证，以及是否需要异常处理或条件操作。</strong></p><p>因此，我们可以选择最符合我们应用程序逻辑和要求的那个。</p><p>OK</p>',31),p=[a];function r(o,l){return n(),e("div",null,p)}const s=t(d,[["render",r],["__file","2024-07-04-The Difference Between findById and getById in Spring Data.html.vue"]]),c=JSON.parse('{"path":"/posts/baeldung/2024-07-04/2024-07-04-The%20Difference%20Between%20findById%20and%20getById%20in%20Spring%20Data.html","title":"Spring Data中findById与getById的区别","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Spring Data","Java"],"tag":["findById","getById"],"head":[["meta",{"name":"keywords","content":"Spring Data, Java, findById, getById"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-04/2024-07-04-The%20Difference%20Between%20findById%20and%20getById%20in%20Spring%20Data.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Spring Data中findById与getById的区别"}],["meta",{"property":"og:description","content":"Spring Data中findById与getById的区别 概述 Spring Data提供了方便的方法来从数据存储中检索实体，包括findById和getById。尽管它们乍一看可能很相似，但存在细微的差别，这些差别可能会影响我们代码的功能。 本教程将探讨这些差异，并帮助我们有效地确定何时使用每种方法。 理解findById 首先，让我们看看fi..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-04T23:56:23.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"findById"}],["meta",{"property":"article:tag","content":"getById"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-04T23:56:23.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Spring Data中findById与getById的区别\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-04T23:56:23.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Spring Data中findById与getById的区别 概述 Spring Data提供了方便的方法来从数据存储中检索实体，包括findById和getById。尽管它们乍一看可能很相似，但存在细微的差别，这些差别可能会影响我们代码的功能。 本教程将探讨这些差异，并帮助我们有效地确定何时使用每种方法。 理解findById 首先，让我们看看fi..."},"headers":[],"git":{"createdTime":1720137383000,"updatedTime":1720137383000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.59,"words":778},"filePathRelative":"posts/baeldung/2024-07-04/2024-07-04-The Difference Between findById and getById in Spring Data.md","localizedDate":"2022年4月1日","excerpt":"\\n<ol>\\n<li>概述</li>\\n</ol>\\n<p>Spring Data提供了方便的方法来从数据存储中检索实体，包括findById和getById。尽管它们乍一看可能很相似，但存在细微的差别，这些差别可能会影响我们代码的功能。</p>\\n<p>本教程将探讨这些差异，并帮助我们有效地确定何时使用每种方法。</p>\\n<ol start=\\"2\\">\\n<li>理解findById</li>\\n</ol>\\n<p>首先，让我们看看findById方法。</p>\\n<p>2.1 方法签名</p>\\n<p>findById方法定义在CrudRepository接口中：</p>\\n<div class=\\"language-text\\" data-ext=\\"text\\" data-title=\\"text\\"><pre class=\\"language-text\\"><code>Optional`&lt;T&gt;` findById(ID id);\\n</code></pre></div>","autoDesc":true}');export{s as comp,c as data};
