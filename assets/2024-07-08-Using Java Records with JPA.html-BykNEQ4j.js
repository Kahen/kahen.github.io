import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-8nJ1rqSf.js";const e={},p=t('<h1 id="使用java-records与jpa" tabindex="-1"><a class="header-anchor" href="#使用java-records与jpa"><span>使用Java Records与JPA</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在本教程中，我们将探讨如何将Java Records与JPA一起使用。我们将从探讨为什么记录不能用作实体开始。</p><p>然后，我们将看到如何将记录与JPA一起使用。我们还将看看如何在Spring Boot应用程序中使用Spring Data JPA与记录。</p><h2 id="_2-记录与实体" tabindex="-1"><a class="header-anchor" href="#_2-记录与实体"><span>2. 记录与实体</span></a></h2><p>记录是不可变的，用于存储数据。它们**包含字段、全参数构造函数、getter、toString、以及equals/hashCode方法。**由于它们是不可变的，它们没有setter。由于它们的语法简洁，它们通常在Java应用程序中用作数据传输对象（DTO）。</p><p>实体是映射到数据库表的类。它们用于表示数据库中的一个条目。它们的字段映射到数据库表中的列。</p><h3 id="_2-1-记录不能作为实体" tabindex="-1"><a class="header-anchor" href="#_2-1-记录不能作为实体"><span>2.1 记录不能作为实体</span></a></h3><p>实体由**JPA提供者处理。JPA提供者负责创建数据库表、将实体映射到表中，并将实体持久化到数据库。**在像Hibernate这样的流行JPA提供者中，实体是通过代理在运行时生成和管理的。</p><p>代理是在运行时生成的类，并扩展实体类。<strong>这些代理依赖于实体类具有无参数构造函数和setter。由于记录没有这些，它们不能用作实体。</strong></p><h3 id="_2-2-其他将记录与jpa一起使用的方法" tabindex="-1"><a class="header-anchor" href="#_2-2-其他将记录与jpa一起使用的方法"><span>2.2 其他将记录与JPA一起使用的方法</span></a></h3><p>由于在Java应用程序中使用记录的便捷性和安全性，可能以其他方式将它们与JPA一起使用是有益的。</p><p>在JPA中，我们可以以以下方式使用记录：</p><ul><li>将查询结果转换为记录</li><li>将记录用作在层之间传输数据的DTO</li><li>将实体转换为记录。</li></ul><h2 id="_3-项目设置" tabindex="-1"><a class="header-anchor" href="#_3-项目设置"><span>3. 项目设置</span></a></h2><p>我们将使用Spring Boot来创建一个使用JPA和Spring Data JPA的简单应用程序。然后，我们将看看在与数据库交互时使用记录的几种方法。</p><h3 id="_3-1-依赖项" tabindex="-1"><a class="header-anchor" href="#_3-1-依赖项"><span>3.1 依赖项</span></a></h3><p>让我们从向我们的项目添加Spring Data JPA依赖项开始：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>`org.springframework.boot`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>`spring-boot-starter-data-jpa`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>`3.0.4`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>`\n`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>除了Spring Data JPA，我们还需要配置数据库。我们可以使用任何SQL数据库。例如，我们可以使用内存中的H2数据库。</p><h3 id="_3-2-实体和记录" tabindex="-1"><a class="header-anchor" href="#_3-2-实体和记录"><span>3.2 实体和记录</span></a></h3><p>让我们创建一个我们将用于与数据库交互的实体。我们将创建一个_Book_实体，它将映射到数据库中的_book_表：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Entity</span>\n<span class="token annotation punctuation">@Table</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;book&quot;</span><span class="token punctuation">)</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Book</span> <span class="token punctuation">{</span>\n    <span class="token annotation punctuation">@Id</span>\n    <span class="token annotation punctuation">@GeneratedValue</span><span class="token punctuation">(</span>strategy <span class="token operator">=</span> <span class="token class-name">GenerationType</span><span class="token punctuation">.</span><span class="token constant">IDENTITY</span><span class="token punctuation">)</span>\n    <span class="token keyword">private</span> <span class="token class-name">Long</span> id<span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token class-name">String</span> title<span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token class-name">String</span> author<span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token class-name">String</span> isbn<span class="token punctuation">;</span>\n\n    <span class="token comment">// 构造函数，getter，setter</span>\n<span class="token punctuation">}</span>\n\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们也创建一个与_Book_实体相对应的记录：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">record</span> <span class="token class-name">BookRecord</span><span class="token punctuation">(</span><span class="token class-name">Long</span> id<span class="token punctuation">,</span> <span class="token class-name">String</span> title<span class="token punctuation">,</span> <span class="token class-name">String</span> author<span class="token punctuation">,</span> <span class="token class-name">String</span> isbn<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>接下来，我们将看看在我们的应用程序中使用记录而不是实体的几种方法。</p><p>JPA API提供了几种与数据库交互的方式，其中可以使用记录。让我们看看其中的一些。</p><h3 id="_4-1-标准查询构建器" tabindex="-1"><a class="header-anchor" href="#_4-1-标准查询构建器"><span>4.1 标准查询构建器</span></a></h3><p>让我们首先看看如何使用_CriteriaBuilder_与记录。我们将创建一个查询，返回数据库中的所有书籍：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">QueryService</span> <span class="token punctuation">{</span>\n    <span class="token annotation punctuation">@PersistenceContext</span>\n    <span class="token keyword">private</span> <span class="token class-name">EntityManager</span> entityManager<span class="token punctuation">;</span>\n\n    <span class="token keyword">public</span> <span class="token class-name">List</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">BookRecord</span><span class="token punctuation">&gt;</span></span>````` <span class="token function">findAllBooks</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token class-name">CriteriaBuilder</span> cb <span class="token operator">=</span> entityManager<span class="token punctuation">.</span><span class="token function">getCriteriaBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token class-name">CriteriaQuery</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">BookRecord</span><span class="token punctuation">&gt;</span></span>````` query <span class="token operator">=</span> cb<span class="token punctuation">.</span><span class="token function">createQuery</span><span class="token punctuation">(</span><span class="token class-name">BookRecord</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token class-name">Root</span>`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Book</span><span class="token punctuation">&gt;</span></span>` root <span class="token operator">=</span> query<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token class-name">Book</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        query<span class="token punctuation">.</span><span class="token function">select</span><span class="token punctuation">(</span>cb<span class="token punctuation">.</span><span class="token function">construct</span><span class="token punctuation">(</span><span class="token class-name">BookRecord</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> root<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;id&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> root<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;title&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> root<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;author&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> root<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;isbn&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">return</span> entityManager<span class="token punctuation">.</span><span class="token function">createQuery</span><span class="token punctuation">(</span>query<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getResultList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的代码中，我们使用_CriteriaBuilder_创建一个返回_BookRecord_的_CriteriaQuery_。</p><p>让我们看看上面代码中的一些步骤：</p><ul><li>我们使用_CriteriaBuilder.createQuery()<em>方法创建一个_CriteriaQuery</em>。<strong>我们传递我们想要返回的记录类的类作为参数</strong></li><li>然后，我们使用_CriteriaQuery.from()<em>方法创建一个_Root</em>。我们传递实体类作为参数。这就是我们<strong>指定我们想要查询的表的方式</strong></li><li>然后，我们使用_CriteriaQuery.select()_方法指定一个选择子句。我们使用_CriteriaBuilder.construct()_方法将查询结果转换为记录。<strong>我们传递记录的类和我们想要传递给记录构造函数的实体字段作为参数</strong></li><li>最后，我们使用_EntityManager.createQuery()<em>方法从_CriteriaQuery_创建一个_TypedQuery</em>。然后，我们使用_TypedQuery.getResultList()_方法获取查询的结果</li></ul><p>这将创建一个选择查询以获取数据库中的所有书籍。然后，它将使用_construct()<em>方法将每个结果转换为_BookRecord</em>，并在调用_getResultList()_方法时返回记录列表而不是实体列表。</p><p>这样，我们可以使用实体类来创建查询，但在应用程序的其余部分使用记录。</p><h3 id="_4-2-类型化查询" tabindex="-1"><a class="header-anchor" href="#_4-2-类型化查询"><span>4.2 类型化查询</span></a></h3><p>类似于_CriteriaBuilder_，我们可以使用类型化查询返回记录而不是实体。让我们在我们的_QueryService_中添加一个方法，使用类型化查询以记录的形式获取单本书：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">BookRecord</span> <span class="token function">findBookByTitle</span><span class="token punctuation">(</span><span class="token class-name">String</span> title<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">TypedQuery</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">BookRecord</span><span class="token punctuation">&gt;</span></span>````` query <span class="token operator">=</span> entityManager\n        <span class="token punctuation">.</span><span class="token function">createQuery</span><span class="token punctuation">(</span><span class="token string">&quot;SELECT new com.baeldung.recordswithjpa.records.BookRecord(b.id, b.title, b.author, b.isbn) &quot;</span> <span class="token operator">+</span>\n                     <span class="token string">&quot;FROM Book b WHERE b.title = :title&quot;</span><span class="token punctuation">,</span> <span class="token class-name">BookRecord</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    query<span class="token punctuation">.</span><span class="token function">setParameter</span><span class="token punctuation">(</span><span class="token string">&quot;title&quot;</span><span class="token punctuation">,</span> title<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">return</span> query<span class="token punctuation">.</span><span class="token function">getSingleResult</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>_TypedQuery_允许我们将查询结果转换为任何类型，只要该类型具有与查询结果相同数量的参数的构造函数。</strong></p><p>在上面的代码中，我们使用_EntityManager.createQuery()<em>方法创建一个_TypedQuery</em>。我们传递查询字符串和记录的类作为参数。然后，我们使用_TypedQuery.setParameter()_方法设置查询的参数。最后，我们使用_TypedQuery.getSingleResult()_方法获取查询的结果，它将是一个_BookRecord_对象。</p><h3 id="_4-3-本地查询" tabindex="-1"><a class="header-anchor" href="#_4-3-本地查询"><span>4.3 本地查询</span></a></h3><p>我们还可以使用本地查询以记录的形式获取查询结果。然而，**本地查询不允许我们将结果转换为任何类型。相反，我们需要使用映射将结果转换为记录。**首先，让我们在我们的实体中定义一个映射：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@SqlResultSetMapping</span><span class="token punctuation">(</span>\n  name <span class="token operator">=</span> <span class="token string">&quot;BookRecordMapping&quot;</span><span class="token punctuation">,</span>\n  classes <span class="token operator">=</span> <span class="token annotation punctuation">@ConstructorResult</span><span class="token punctuation">(</span>\n    targetClass <span class="token operator">=</span> <span class="token class-name">BookRecord</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span>\n    columns <span class="token operator">=</span> <span class="token punctuation">{</span>\n      <span class="token annotation punctuation">@ColumnResult</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;id&quot;</span><span class="token punctuation">,</span> type <span class="token operator">=</span> <span class="token class-name">Long</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n      <span class="token annotation punctuation">@ColumnResult</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;title&quot;</span><span class="token punctuation">,</span> type <span class="token operator">=</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n      <span class="token annotation punctuation">@ColumnResult</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;author&quot;</span><span class="token punctuation">,</span> type <span class="token operator">=</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n      <span class="token annotation punctuation">@ColumnResult</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;isbn&quot;</span><span class="token punctuation">,</span> type <span class="token operator">=</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">)</span>\n<span class="token punctuation">)</span>\n<span class="token annotation punctuation">@Entity</span>\n<span class="token annotation punctuation">@Table</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;book&quot;</span><span class="token punctuation">)</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Book</span> <span class="token punctuation">{</span>\n    <span class="token comment">// ...</span>\n<span class="token punctuation">}</span>\n\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>映射将以以下方式工作：</p><ul><li>_@SqlResultSetMapping_注解的_name_属性指定映射的名称。</li><li>_@ConstructorResult_注解指定我们想要使用记录的构造函数来转换结果。</li><li>_@ConstructorResult_注解的_targetClass_属性指定记录的类。</li><li>_@ColumnResult_注解指定列名称和列的类型。这些列值将传递给记录的构造函数。</li></ul><p>然后，我们可以使用此映射在我们的本地查询中以记录的形式获取结果：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">List</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">BookRecord</span><span class="token punctuation">&gt;</span></span>````` <span class="token function">findAllBooksUsingMapping</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">Query</span> query <span class="token operator">=</span> entityManager<span class="token punctuation">.</span><span class="token function">createNativeQuery</span><span class="token punctuation">(</span><span class="token string">&quot;SELECT * FROM book&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;BookRecordMapping&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">return</span> query<span class="token punctuation">.</span><span class="token function">getResultList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这将创建一个本地查询，返回数据库中的所有书籍。它将使用映射将结果转换为_BookRecord_，并在调用_getResultList()_方法时返回记录列表而不是实体列表。</p><h2 id="_5-使用spring-data-jpa与记录" tabindex="-1"><a class="header-anchor" href="#_5-使用spring-data-jpa与记录"><span>5. 使用Spring Data JPA与记录</span></a></h2><p>Spring Data JPA提供了对JPA API的一些改进。它使我们能够在几种方式上使用Spring Data JPA存储库中的记录。让我们看看如何使用记录与Spring Data JPA存储库。</p><h3 id="_5-1-从实体到记录的自动映射" tabindex="-1"><a class="header-anchor" href="#_5-1-从实体到记录的自动映射"><span>5.1 从实体到记录的自动映射</span></a></h3><p>Spring Data存储库允许我们将记录用作存储库中方法的返回类型。这将自动将实体映射到记录。只有在记录具有与实体完全相同的字段时，这才可能。让我们看一个例子：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">BookRepository</span> <span class="token keyword">extends</span> <span class="token class-name">JpaRepository</span>``<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Book</span><span class="token punctuation">,</span> <span class="token class-name">Long</span><span class="token punctuation">&gt;</span></span>`` <span class="token punctuation">{</span>\n    <span class="token class-name">List</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">BookRecord</span><span class="token punctuation">&gt;</span></span>````` <span class="token function">findBookByAuthor</span><span class="token punctuation">(</span><span class="token class-name">String</span> author<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于_BookRecord_具有与_Book_实体相同的字段，因此在我们调用_findBookByAuthor()_方法时，Spring Data JPA将自动将实体映射到记录，并返回记录列表而不是实体列表。</p><h3 id="_5-2-使用记录与-query" tabindex="-1"><a class="header-anchor" href="#_5-2-使用记录与-query"><span>5.2 使用记录与@Query</span></a></h3><p>类似于_TypedQuery_，我们可以使用记录与Spring Data JPA存储库中的_@Query_注解。让我们看一个例子：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">BookRepository</span> <span class="token keyword">extends</span> <span class="token class-name">JpaRepository</span>``<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Book</span><span class="token punctuation">,</span> <span class="token class-name">Long</span><span class="token punctuation">&gt;</span></span>`` <span class="token punctuation">{</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>',57),o=[p];function c(l,i){return s(),a("div",null,o)}const k=n(e,[["render",c],["__file","2024-07-08-Using Java Records with JPA.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-08/2024-07-08-Using%20Java%20Records%20with%20JPA.html","title":"使用Java Records与JPA","lang":"zh-CN","frontmatter":{"date":"2024-07-08T00:00:00.000Z","category":["Spring","JPA"],"tag":["Java Records","JPA"],"head":[["meta",{"name":"keywords","content":"Java Records, JPA, Spring Data JPA, Hibernate"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-08/2024-07-08-Using%20Java%20Records%20with%20JPA.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用Java Records与JPA"}],["meta",{"property":"og:description","content":"使用Java Records与JPA 1. 概述 在本教程中，我们将探讨如何将Java Records与JPA一起使用。我们将从探讨为什么记录不能用作实体开始。 然后，我们将看到如何将记录与JPA一起使用。我们还将看看如何在Spring Boot应用程序中使用Spring Data JPA与记录。 2. 记录与实体 记录是不可变的，用于存储数据。它们*..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-08T04:45:07.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java Records"}],["meta",{"property":"article:tag","content":"JPA"}],["meta",{"property":"article:published_time","content":"2024-07-08T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-08T04:45:07.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用Java Records与JPA\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-08T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-08T04:45:07.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用Java Records与JPA 1. 概述 在本教程中，我们将探讨如何将Java Records与JPA一起使用。我们将从探讨为什么记录不能用作实体开始。 然后，我们将看到如何将记录与JPA一起使用。我们还将看看如何在Spring Boot应用程序中使用Spring Data JPA与记录。 2. 记录与实体 记录是不可变的，用于存储数据。它们*..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 记录与实体","slug":"_2-记录与实体","link":"#_2-记录与实体","children":[{"level":3,"title":"2.1 记录不能作为实体","slug":"_2-1-记录不能作为实体","link":"#_2-1-记录不能作为实体","children":[]},{"level":3,"title":"2.2 其他将记录与JPA一起使用的方法","slug":"_2-2-其他将记录与jpa一起使用的方法","link":"#_2-2-其他将记录与jpa一起使用的方法","children":[]}]},{"level":2,"title":"3. 项目设置","slug":"_3-项目设置","link":"#_3-项目设置","children":[{"level":3,"title":"3.1 依赖项","slug":"_3-1-依赖项","link":"#_3-1-依赖项","children":[]},{"level":3,"title":"3.2 实体和记录","slug":"_3-2-实体和记录","link":"#_3-2-实体和记录","children":[]},{"level":3,"title":"4.1 标准查询构建器","slug":"_4-1-标准查询构建器","link":"#_4-1-标准查询构建器","children":[]},{"level":3,"title":"4.2 类型化查询","slug":"_4-2-类型化查询","link":"#_4-2-类型化查询","children":[]},{"level":3,"title":"4.3 本地查询","slug":"_4-3-本地查询","link":"#_4-3-本地查询","children":[]}]},{"level":2,"title":"5. 使用Spring Data JPA与记录","slug":"_5-使用spring-data-jpa与记录","link":"#_5-使用spring-data-jpa与记录","children":[{"level":3,"title":"5.1 从实体到记录的自动映射","slug":"_5-1-从实体到记录的自动映射","link":"#_5-1-从实体到记录的自动映射","children":[]},{"level":3,"title":"5.2 使用记录与@Query","slug":"_5-2-使用记录与-query","link":"#_5-2-使用记录与-query","children":[]}]}],"git":{"createdTime":1720413907000,"updatedTime":1720413907000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":6.54,"words":1963},"filePathRelative":"posts/baeldung/2024-07-08/2024-07-08-Using Java Records with JPA.md","localizedDate":"2024年7月8日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>在本教程中，我们将探讨如何将Java Records与JPA一起使用。我们将从探讨为什么记录不能用作实体开始。</p>\\n<p>然后，我们将看到如何将记录与JPA一起使用。我们还将看看如何在Spring Boot应用程序中使用Spring Data JPA与记录。</p>\\n<h2>2. 记录与实体</h2>\\n<p>记录是不可变的，用于存储数据。它们**包含字段、全参数构造函数、getter、toString、以及equals/hashCode方法。**由于它们是不可变的，它们没有setter。由于它们的语法简洁，它们通常在Java应用程序中用作数据传输对象（DTO）。</p>","autoDesc":true}');export{k as comp,d as data};
