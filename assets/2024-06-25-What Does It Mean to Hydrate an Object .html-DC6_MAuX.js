import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-CNQ479je.js";const e={},p=t(`<h1 id="什么是对象水合化-baeldung" tabindex="-1"><a class="header-anchor" href="#什么是对象水合化-baeldung"><span>什么是对象水合化？ | Baeldung</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>在本教程中，我们将讨论在编程上下文中“水合化”一词的含义，并深入探讨水合化一个Java对象意味着什么。</p><h2 id="_2-对象水合化" tabindex="-1"><a class="header-anchor" href="#_2-对象水合化"><span>2. 对象水合化</span></a></h2><h3 id="_2-1-延迟初始化" tabindex="-1"><a class="header-anchor" href="#_2-1-延迟初始化"><span>2.1. 延迟初始化</span></a></h3><p>延迟加载或延迟初始化是软件应用程序中常用的模式。在Java中，对象是一个使用_new_关键字创建的类的实例。对象是程序的构建块，对象通过相互交互来实现所需的功能。</p><p>对象通常旨在表示面向对象编程范式中的现实世界实体，因此，对象具有多个相关属性。<strong>对象初始化指的是用真实数据填充对象属性的过程。</strong> 这通常是通过调用类构造函数并将数据作为参数传递来完成的。<strong>初始化也可以从数据源如网络、数据库或文件系统进行。</strong></p><p>对象初始化有时可能是一个资源密集型操作，特别是当数据来自不同的数据源时。此外，对象在创建后并不总是立即被程序使用。</p><p><strong>在这种情况下，将对象初始化推迟到需要它的那一刻是一个好习惯。</strong> 这种模式称为延迟初始化，因为我们首先创建一个带有空数据的对象，并在将来懒惰地用相关数据填充对象。<strong>有意识地延迟数据初始化有助于提高代码性能和内存利用率。</strong></p><p>让我们创建一个具有多个属性的_User_类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">User</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> uId<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> firstName<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> lastName<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> alias<span class="token punctuation">;</span>
    <span class="token comment">// 构造函数，getter-setters</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以创建一个_User_对象并将其保留在内存中，而不使用有意义的数据填充其属性：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">User</span> iamUser <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_2-2-什么是水合化" tabindex="-1"><a class="header-anchor" href="#_2-2-什么是水合化"><span>2.2. 什么是水合化？</span></a></h3><p><strong>有了延迟初始化，我们故意延迟已经创建并存在于内存中的对象的初始化过程。向现有空对象填充数据的过程称为水合化。</strong></p><p>我们创建的User实例是一个虚拟实例。该对象没有任何相关数据属性，因为在这一点上它还不需要。<strong>要使对象有用，我们应该用相关领域数据填充对象，这可以通过用来自网络、数据库或文件系统等源的数据填充它来完成。</strong></p><p>我们按照以下步骤对用户实例进行水合化。我们首先将我们的水合逻辑编写为类级方法，该方法使用类的setter来设置相关数据。在我们的示例中，我们将使用我们的数据。然而，我们也可以从文件或类似源获取数据：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">generateMyUser</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setAlias</span><span class="token punctuation">(</span><span class="token string">&quot;007&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setFirstName</span><span class="token punctuation">(</span><span class="token string">&quot;James&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setLastName</span><span class="token punctuation">(</span><span class="token string">&quot;Bond&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setuId</span><span class="token punctuation">(</span><span class="token string">&quot;JB&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>现在我们创建一个空的_User_实例，并在需要时，通过调用_generateMyUser()_方法来水合化同一个实例：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">User</span> jamesBond <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 执行水合化</span>
jamesBond<span class="token punctuation">.</span><span class="token function">generateMyUser</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以通过断言其属性的状态来验证水合化的结果：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">User</span> jamesBond <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Assert</span><span class="token punctuation">.</span><span class="token function">assertNull</span><span class="token punctuation">(</span>jamesBond<span class="token punctuation">.</span><span class="token function">getAlias</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

jamesBond<span class="token punctuation">.</span><span class="token function">generateMyUser</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Assert</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;007&quot;</span><span class="token punctuation">,</span> jamesBond<span class="token punctuation">.</span><span class="token function">getAlias</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-水合化和反序列化" tabindex="-1"><a class="header-anchor" href="#_3-水合化和反序列化"><span>3. 水合化和反序列化</span></a></h2><p>水合化和反序列化不是同义词，我们不应该将它们互换使用。<strong>反序列化是编程中用于恢复或重新创建对象的过程。</strong> 我们经常存储或通过网络传输对象。在此过程中，序列化（将对象转换为字节流）和反序列化（恢复对象的反向过程）非常有用。</p><p>我们可以将_User_实例序列化到文件或等效物中：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">try</span> <span class="token punctuation">{</span>
    <span class="token class-name">FileOutputStream</span> fileOut <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileOutputStream</span><span class="token punctuation">(</span>outputName<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">ObjectOutputStream</span> out <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ObjectOutputStream</span><span class="token punctuation">(</span>fileOut<span class="token punctuation">)</span><span class="token punctuation">;</span>
    out<span class="token punctuation">.</span><span class="token function">writeObject</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span><span class="token punctuation">;</span>
    out<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    fileOut<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IOException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同样，当需要时，我们可以从其序列化形式重新创建_User_实例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">try</span> <span class="token punctuation">{</span>
    <span class="token class-name">FileInputStream</span> fileIn <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileInputStream</span><span class="token punctuation">(</span>serialisedFile<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">ObjectInputStream</span> in <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ObjectInputStream</span><span class="token punctuation">(</span>fileIn<span class="token punctuation">)</span><span class="token punctuation">;</span>
    deserializedUser <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">User</span><span class="token punctuation">)</span> in<span class="token punctuation">.</span><span class="token function">readObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    in<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    fileIn<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IOException</span> <span class="token operator">|</span> <span class="token class-name">ClassNotFoundException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>很明显，水合化和反序列化都涉及处理对象并用数据填充它。<strong>然而，两者之间的重要区别在于反序列化主要是创建实例并填充属性的单步过程。</strong></p><p><strong>另一方面，水合化只关心向预先形成的对象的属性添加数据。因此，反序列化是对象实例化和对象水合化的同一步骤。</strong></p><h2 id="_4-orm框架中的水合化" tabindex="-1"><a class="header-anchor" href="#_4-orm框架中的水合化"><span>4. ORM框架中的水合化</span></a></h2><p>一个ORM（对象关系映射）框架是一种软件开发范式，它使我们能够将面向对象编程与关系数据库结合起来。ORM框架促进了应用程序代码中的对象与关系数据库中的表之间的映射，并允许开发人员像使用本地对象一样与数据库实体交互。</p><p>对象水合化的概念在ORM框架中更为普遍，例如Hibernate或JPA。</p><p>让我们考虑一个JPA _Entity_类Book及其相应的_Repository_类如下：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Entity</span>
<span class="token annotation punctuation">@Table</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;books&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Book</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Id</span>
    <span class="token annotation punctuation">@GeneratedValue</span><span class="token punctuation">(</span>strategy <span class="token operator">=</span> <span class="token class-name">GenerationType</span><span class="token punctuation">.</span><span class="token constant">IDENTITY</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">Long</span> id<span class="token punctuation">;</span>
    <span class="token annotation punctuation">@Column</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;name&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token comment">// 其他列和方法</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">BookRepository</span> <span class="token keyword">extends</span> <span class="token class-name">JpaRepository</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Book</span><span class="token punctuation">,</span> <span class="token class-name">Long</span><span class="token punctuation">&gt;</span></span>\` <span class="token punctuation">{</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>基于ORM原则，实体_Book_代表我们关系数据库中的一个表。实体与数据库的交互以我们上面定义的_BookRepository_接口的形式抽象化。类的实例代表表中的一行。</p><p>当我们使用众多内置的_find()_方法之一或使用自定义查询从数据库加载_Book_实例时，ORM框架执行几个步骤：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Book</span> aTaleOfTwoCities <span class="token operator">=</span> bookRepository<span class="token punctuation">.</span><span class="token function">findOne</span><span class="token punctuation">(</span><span class="token number">1L</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>框架通过调用类的默认构造函数初始化一个空对象。</strong> <strong>一旦对象准备好，框架尝试从缓存存储加载属性数据。</strong> 如果此时发生缓存未命中，框架将建立与数据库的连接并查询表以获取行。</p><p><strong>一旦获得ResultSet，框架将使用结果集对象水合化前述对象_aTaleOfTwoCities_，最后返回实例。</strong></p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们讨论了编程上下文中“水合化”一词的含义。我们看到了水合化与反序列化的区别。最后，我们探讨了ORM框架和普通对象模型中对象水合化的例子。</p><p>像往常一样，本文的代码可以在GitHub上找到。</p>`,44),o=[p];function c(l,i){return s(),a("div",null,o)}const d=n(e,[["render",c],["__file","2024-06-25-What Does It Mean to Hydrate an Object .html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-06-25/2024-06-25-What%20Does%20It%20Mean%20to%20Hydrate%20an%20Object%20.html","title":"什么是对象水合化？ | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-06-26T00:00:00.000Z","category":["Programming","Java"],"tag":["Object Hydration","Lazy Initialization","ORM Frameworks"],"head":[["meta",{"name":"keywords","content":"Java对象, 延迟初始化, ORM框架, 数据填充"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-25/2024-06-25-What%20Does%20It%20Mean%20to%20Hydrate%20an%20Object%20.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"什么是对象水合化？ | Baeldung"}],["meta",{"property":"og:description","content":"什么是对象水合化？ | Baeldung 1. 引言 在本教程中，我们将讨论在编程上下文中“水合化”一词的含义，并深入探讨水合化一个Java对象意味着什么。 2. 对象水合化 2.1. 延迟初始化 延迟加载或延迟初始化是软件应用程序中常用的模式。在Java中，对象是一个使用_new_关键字创建的类的实例。对象是程序的构建块，对象通过相互交互来实现所需的..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-25T19:23:59.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Object Hydration"}],["meta",{"property":"article:tag","content":"Lazy Initialization"}],["meta",{"property":"article:tag","content":"ORM Frameworks"}],["meta",{"property":"article:published_time","content":"2024-06-26T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-25T19:23:59.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"什么是对象水合化？ | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-26T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-25T19:23:59.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"什么是对象水合化？ | Baeldung 1. 引言 在本教程中，我们将讨论在编程上下文中“水合化”一词的含义，并深入探讨水合化一个Java对象意味着什么。 2. 对象水合化 2.1. 延迟初始化 延迟加载或延迟初始化是软件应用程序中常用的模式。在Java中，对象是一个使用_new_关键字创建的类的实例。对象是程序的构建块，对象通过相互交互来实现所需的..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 对象水合化","slug":"_2-对象水合化","link":"#_2-对象水合化","children":[{"level":3,"title":"2.1. 延迟初始化","slug":"_2-1-延迟初始化","link":"#_2-1-延迟初始化","children":[]},{"level":3,"title":"2.2. 什么是水合化？","slug":"_2-2-什么是水合化","link":"#_2-2-什么是水合化","children":[]}]},{"level":2,"title":"3. 水合化和反序列化","slug":"_3-水合化和反序列化","link":"#_3-水合化和反序列化","children":[]},{"level":2,"title":"4. ORM框架中的水合化","slug":"_4-orm框架中的水合化","link":"#_4-orm框架中的水合化","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1719343439000,"updatedTime":1719343439000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.38,"words":1615},"filePathRelative":"posts/baeldung/2024-06-25/2024-06-25-What Does It Mean to Hydrate an Object .md","localizedDate":"2024年6月26日","excerpt":"\\n<h2>1. 引言</h2>\\n<p>在本教程中，我们将讨论在编程上下文中“水合化”一词的含义，并深入探讨水合化一个Java对象意味着什么。</p>\\n<h2>2. 对象水合化</h2>\\n<h3>2.1. 延迟初始化</h3>\\n<p>延迟加载或延迟初始化是软件应用程序中常用的模式。在Java中，对象是一个使用_new_关键字创建的类的实例。对象是程序的构建块，对象通过相互交互来实现所需的功能。</p>\\n<p>对象通常旨在表示面向对象编程范式中的现实世界实体，因此，对象具有多个相关属性。<strong>对象初始化指的是用真实数据填充对象属性的过程。</strong> 这通常是通过调用类构造函数并将数据作为参数传递来完成的。<strong>初始化也可以从数据源如网络、数据库或文件系统进行。</strong></p>","autoDesc":true}');export{d as comp,k as data};
