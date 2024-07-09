import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-COaDJFIk.js";const p={},o=t('<h1 id="spring-data-3中新的crud仓库接口" tabindex="-1"><a class="header-anchor" href="#spring-data-3中新的crud仓库接口"><span>Spring Data 3中新的CRUD仓库接口</span></a></h1><p>在本教程中，我们将探讨Spring Data 3中引入的新仓库接口。</p><p>Spring Data 3引入了基于列表的CRUD仓库接口，这些接口可以用来替代返回Iterable的现有CRUD仓库接口。此外，默认情况下，分页和排序接口不再继承原始的CRUD仓库，而是将这个选项留给用户。我们将看看这些接口与现有接口有何不同，以及如何使用它们。</p><h3 id="_2-项目设置" tabindex="-1"><a class="header-anchor" href="#_2-项目设置"><span>2. 项目设置</span></a></h3><p>让我们从设置我们的项目开始。我们将创建一个包含简单实体和使用新接口的仓库的Spring Boot应用程序。</p><h4 id="_2-1-依赖项" tabindex="-1"><a class="header-anchor" href="#_2-1-依赖项"><span>2.1. 依赖项</span></a></h4><p>让我们首先向我们的项目添加所需的依赖项。我们将添加Spring Boot Starter Data依赖项：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>``org.springframework.boot``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>``spring-boot-starter-data-jpa``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>``\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>`3.1.5`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>`\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>除此之外，我们将配置数据库。可以使用任何SQL数据库。我们将在本教程中使用内存中的H2数据库。让我们添加相同的依赖项：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>``com.h2database``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>``h2``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>``\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-实体" tabindex="-1"><a class="header-anchor" href="#_2-2-实体"><span>2.2. 实体</span></a></h3><p>让我们创建一个我们将在仓库中使用的实体_Book_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Entity</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Book</span> <span class="token punctuation">{</span>\n    <span class="token annotation punctuation">@Id</span>\n    <span class="token annotation punctuation">@GeneratedValue</span><span class="token punctuation">(</span>strategy <span class="token operator">=</span> <span class="token class-name">GenerationType</span><span class="token punctuation">.</span><span class="token constant">IDENTITY</span><span class="token punctuation">)</span>\n    <span class="token keyword">private</span> <span class="token class-name">Long</span> id<span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token class-name">String</span> title<span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token class-name">String</span> author<span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token class-name">String</span> isbn<span class="token punctuation">;</span>\n\n    <span class="token comment">// 构造函数，getter和setter</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在我们已经拥有了我们的实体，让我们看看如何使用新接口与数据库交互。</p><h3 id="_3-基于列表的crud仓库" tabindex="-1"><a class="header-anchor" href="#_3-基于列表的crud仓库"><span>3. 基于列表的CRUD仓库</span></a></h3><p><strong>Spring Data 3引入了一套新的CRUD仓库接口，它们返回实体列表。</strong> 这些接口与现有接口类似，除了它们返回的是_List_而不是_Iterable_。这使我们能够使用_List_接口的高级方法，如_get()<em>和_indexOf()</em>。</p><h4 id="_3-1-基于列表的仓库接口" tabindex="-1"><a class="header-anchor" href="#_3-1-基于列表的仓库接口"><span>3.1. 基于列表的仓库接口</span></a></h4><p>Spring Data 3中新增了三个接口。</p><p><em>ListCrudRepository_接口提供了基本CRUD操作的方法，如_save()</em>、_delete()<em>和_findById()</em>。_ListCrudRepository_与其基于Iterable的对应接口的关键区别在于<strong>返回值现在是列表，这允许我们对返回的数据执行更高级的操作。</strong></p><p><em>ListQuerydslPredicateExecutor_接口提供了使用Querydsl谓词执行查询的方法。Querydsl是一个框架，允许我们用Java编写类型安全的类似SQL的查询。**有了_ListQuerydslPredicateExecutor</em>，我们可以执行Querydsl查询并将结果作为列表返回。**</p><p>_ListQueryByExampleExecutor_接口提供了使用示例实体执行查询的方法，并返回结果作为列表。示例实体是一个包含我们要用来搜索其他实体的值的实体。例如，如果我们有一个标题为_Spring Data_的Book实体，我们可以创建一个标题为_Spring Data_的示例实体，并用它来搜索具有相同标题的其他书籍。</p><h4 id="_3-2-listcrudrepository" tabindex="-1"><a class="header-anchor" href="#_3-2-listcrudrepository"><span>3.2. <em>ListCrudRepository</em></span></a></h4><p>让我们详细看看_ListCrudRepository_接口。我们将创建一个使用此接口与数据库交互的仓库：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Repository</span>\n<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">BookListRepository</span> <span class="token keyword">extends</span> <span class="token class-name">ListCrudRepository</span>```<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Book</span><span class="token punctuation">,</span> <span class="token class-name">Long</span><span class="token punctuation">&gt;</span></span>``` <span class="token punctuation">{</span>\n    <span class="token class-name">List</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Book</span><span class="token punctuation">&gt;</span></span>```` <span class="token function">findBooksByAuthor</span><span class="token punctuation">(</span><span class="token class-name">String</span> author<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>上述仓库扩展了_ListCrudRepository_接口，它为我们提供了基本的CRUD方法。</strong> 我们可以使用现有的仓库方法来保存、删除和查找数据库中的书籍。</p><p>除了这些方法，我们还定义了_findBooksByAuthor()_方法来按作者查找书籍。</p><h4 id="_3-3-使用基于列表的仓库接口" tabindex="-1"><a class="header-anchor" href="#_3-3-使用基于列表的仓库接口"><span>3.3. 使用基于列表的仓库接口</span></a></h4><p>让我们看看如何使用这个仓库与数据库交互：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@SpringBootTest</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">BookListRepositoryIntegrationTest</span> <span class="token punctuation">{</span>\n\n    <span class="token annotation punctuation">@Autowired</span>\n    <span class="token keyword">private</span> <span class="token class-name">BookListRepository</span> bookListRepository<span class="token punctuation">;</span>\n\n    <span class="token annotation punctuation">@Test</span>\n    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenDbContainsBooks_whenFindBooksByAuthor_thenReturnBooksByAuthor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token class-name">Book</span> book1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Book</span><span class="token punctuation">(</span><span class="token string">&quot;Spring Data&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;John Doe&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;1234567890&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token class-name">Book</span> book2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Book</span><span class="token punctuation">(</span><span class="token string">&quot;Spring Data 2&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;John Doe&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;1234567891&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token class-name">Book</span> book3 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Book</span><span class="token punctuation">(</span><span class="token string">&quot;Spring Data 3&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;John Doe&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;1234567892&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        bookListRepository<span class="token punctuation">.</span><span class="token function">saveAll</span><span class="token punctuation">(</span><span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span>book1<span class="token punctuation">,</span> book2<span class="token punctuation">,</span> book3<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n        <span class="token class-name">List</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Book</span><span class="token punctuation">&gt;</span></span>```` books <span class="token operator">=</span> bookListRepository<span class="token punctuation">.</span><span class="token function">findBooksByAuthor</span><span class="token punctuation">(</span><span class="token string">&quot;John Doe&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> books<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们首先创建了三本书并将它们保存到数据库中。然后，我们使用_findBooksByAuthor()_方法查找所有作者为_John Doe_的书籍。最后，我们验证返回的列表是否包含我们创建的三本书。</p><p><strong>请注意，我们在返回的列表上调用了_size()_方法。如果仓库使用了基于Iterable的接口，这是不可能的，因为_Iterable_接口不提供_size()_方法。</strong></p><h3 id="_4-排序仓库" tabindex="-1"><a class="header-anchor" href="#_4-排序仓库"><span>4. 排序仓库</span></a></h3><p>为了能够使用新的基于列表的接口，Spring Data 3不得不对现有的排序接口进行更改。<strong>排序仓库不再扩展旧的CRUD仓库了。</strong> 相反，<strong>用户可以选择扩展新的基于列表的接口或基于Iterable的接口以及排序接口。</strong> 让我们看看如何使用最新的排序接口。</p><h4 id="_4-1-pagingandsortingrepository" tabindex="-1"><a class="header-anchor" href="#_4-1-pagingandsortingrepository"><span>4.1. <em>PagingAndSortingRepository</em></span></a></h4><p>让我们详细看看_PagingAndSortingRepository_接口。我们将创建一个使用此接口与数据库交互的仓库：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Repository</span>\n<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">BookPagingAndSortingRepository</span> <span class="token keyword">extends</span> <span class="token class-name">PagingAndSortingRepository</span>```<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Book</span><span class="token punctuation">,</span> <span class="token class-name">Long</span><span class="token punctuation">&gt;</span></span>```<span class="token punctuation">,</span> <span class="token class-name">ListCrudRepository</span>```<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Book</span><span class="token punctuation">,</span> <span class="token class-name">Long</span><span class="token punctuation">&gt;</span></span>``` <span class="token punctuation">{</span>\n\n    <span class="token class-name">List</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Book</span><span class="token punctuation">&gt;</span></span>```` <span class="token function">findBooksByAuthor</span><span class="token punctuation">(</span><span class="token class-name">String</span> author<span class="token punctuation">,</span> <span class="token class-name">Pageable</span> pageable<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述仓库扩展了_ListCrudRepository_接口，为我们提供了基本的CRUD方法。除此之外，<strong>我们还扩展了_PagingAndSortingRepository_接口，它为我们提供了排序和分页的方法。</strong></p><p>在Spring Data的旧版本中，我们不需要显式扩展CRUD仓库接口。只有排序和分页接口就足够了。我们定义了一个新的方法_findBooksByAuthor()_，它接受一个_Pageable_参数并返回一列书籍。在下一节中，我们将看看如何使用这种方法来排序和分页结果。</p><h4 id="_4-2-使用排序仓库接口" tabindex="-1"><a class="header-anchor" href="#_4-2-使用排序仓库接口"><span>4.2. 使用排序仓库接口</span></a></h4><p>让我们看看如何使用这个仓库与数据库交互：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@SpringBootTest</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">BookPagingAndSortingRepositoryIntegrationTest</span> <span class="token punctuation">{</span>\n\n    <span class="token annotation punctuation">@Autowired</span>\n    <span class="token keyword">private</span> <span class="token class-name">BookPagingAndSortingRepository</span> bookPagingAndSortingRepository<span class="token punctuation">;</span>\n\n    <span class="token annotation punctuation">@Test</span>\n    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenDbContainsBooks_whenfindBooksByAuthor_thenReturnBooksByAuthor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token class-name">Book</span> book1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Book</span><span class="token punctuation">(</span><span class="token string">&quot;Spring Data&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;John Doe&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;1234567890&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token class-name">Book</span> book2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Book</span><span class="token punctuation">(</span><span class="token string">&quot;Spring Data 2&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;John Doe&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;1234567891&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token class-name">Book</span> book3 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Book</span><span class="token punctuation">(</span><span class="token string">&quot;Spring Data 3&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;John Doe&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;1234567892&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        bookPagingAndSortingRepository<span class="token punctuation">.</span><span class="token function">saveAll</span><span class="token punctuation">(</span><span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span>book1<span class="token punctuation">,</span> book2<span class="token punctuation">,</span> book3<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n        <span class="token class-name">Pageable</span> pageable <span class="token operator">=</span> <span class="token class-name">PageRequest</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token class-name">Sort</span><span class="token punctuation">.</span><span class="token function">by</span><span class="token punctuation">(</span><span class="token string">&quot;title&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">descending</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token class-name">List</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Book</span><span class="token punctuation">&gt;</span></span>```` books <span class="token operator">=</span> bookPagingAndSortingRepository<span class="token punctuation">.</span><span class="token function">findBooksByAuthor</span><span class="token punctuation">(</span><span class="token string">&quot;John Doe&quot;</span><span class="token punctuation">,</span> pageable<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> books<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token function">assertEquals</span><span class="token punctuation">(</span>book3<span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> books<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token function">assertEquals</span><span class="token punctuation">(</span>book2<span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> books<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>就像之前一样，我们首先创建了三本书并将它们保存到数据库中。然后，我们使用_findBooksByAuthor()_方法查找所有作者为_John Doe_的书籍。但这次，我们向方法传递了一个_Pageable_对象，以按标题降序排序结果并只返回前两个结果。</p><p>最后，我们验证返回的列表是否包含我们创建的两本书。我们还验证了这些书籍是否按标题降序排序，以便标题为_Spring Data 3_的书籍首先返回，其次是标题为_Spring Data 2_的书籍。</p><h4 id="_4-3-其他排序接口" tabindex="-1"><a class="header-anchor" href="#_4-3-其他排序接口"><span>4.3. 其他排序接口</span></a></h4><p>除了_PagingAndSortingRepository_接口外，以下接口也发生了变化：</p><ul><li><em>ReactiveSortingRepository_不再继承自_ReactiveCrudRepository</em></li><li><em>CoroutineSortingRepository_不再继承自_CoroutineCrudRepository</em></li><li><em>RxJavaSortingRepository_不再继承自_RxJavaCrudRepository</em></li></ul><h3 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h3><p>在本文中，我们探讨了Spring Data 3中新增的基于列表的接口。我们研究了如何使用这些接口与数据库交互。我们还研究了为能够使用新的基于列表的接口而对现有排序接口所做的更改。</p><p>本文的代码示例可以在GitHub上找到。</p>',49),e=[o];function c(i,l){return a(),s("div",null,e)}const k=n(p,[["render",c],["__file","2024-07-08-New CRUD Repository Interfaces in Spring Data 3.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-08/2024-07-08-New%20CRUD%20Repository%20Interfaces%20in%20Spring%20Data%203.html","title":"Spring Data 3中新的CRUD仓库接口","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Spring Data","Java"],"tag":["CRUD","Repository"],"head":[["meta",{"name":"keywords","content":"Spring Data 3, CRUD Repository, List-based, Paging, Sorting"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-08/2024-07-08-New%20CRUD%20Repository%20Interfaces%20in%20Spring%20Data%203.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Spring Data 3中新的CRUD仓库接口"}],["meta",{"property":"og:description","content":"Spring Data 3中新的CRUD仓库接口 在本教程中，我们将探讨Spring Data 3中引入的新仓库接口。 Spring Data 3引入了基于列表的CRUD仓库接口，这些接口可以用来替代返回Iterable的现有CRUD仓库接口。此外，默认情况下，分页和排序接口不再继承原始的CRUD仓库，而是将这个选项留给用户。我们将看看这些接口与现有接..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-08T09:38:30.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"CRUD"}],["meta",{"property":"article:tag","content":"Repository"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-08T09:38:30.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Spring Data 3中新的CRUD仓库接口\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-08T09:38:30.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Spring Data 3中新的CRUD仓库接口 在本教程中，我们将探讨Spring Data 3中引入的新仓库接口。 Spring Data 3引入了基于列表的CRUD仓库接口，这些接口可以用来替代返回Iterable的现有CRUD仓库接口。此外，默认情况下，分页和排序接口不再继承原始的CRUD仓库，而是将这个选项留给用户。我们将看看这些接口与现有接..."},"headers":[{"level":3,"title":"2. 项目设置","slug":"_2-项目设置","link":"#_2-项目设置","children":[]},{"level":3,"title":"2.2. 实体","slug":"_2-2-实体","link":"#_2-2-实体","children":[]},{"level":3,"title":"3. 基于列表的CRUD仓库","slug":"_3-基于列表的crud仓库","link":"#_3-基于列表的crud仓库","children":[]},{"level":3,"title":"4. 排序仓库","slug":"_4-排序仓库","link":"#_4-排序仓库","children":[]},{"level":3,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720431510000,"updatedTime":1720431510000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.81,"words":1743},"filePathRelative":"posts/baeldung/2024-07-08/2024-07-08-New CRUD Repository Interfaces in Spring Data 3.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在本教程中，我们将探讨Spring Data 3中引入的新仓库接口。</p>\\n<p>Spring Data 3引入了基于列表的CRUD仓库接口，这些接口可以用来替代返回Iterable的现有CRUD仓库接口。此外，默认情况下，分页和排序接口不再继承原始的CRUD仓库，而是将这个选项留给用户。我们将看看这些接口与现有接口有何不同，以及如何使用它们。</p>\\n<h3>2. 项目设置</h3>\\n<p>让我们从设置我们的项目开始。我们将创建一个包含简单实体和使用新接口的仓库的Spring Boot应用程序。</p>\\n<h4>2.1. 依赖项</h4>\\n<p>让我们首先向我们的项目添加所需的依赖项。我们将添加Spring Boot Starter Data依赖项：</p>","autoDesc":true}');export{k as comp,d as data};
