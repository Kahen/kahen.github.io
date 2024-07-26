import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-C4eFoh0f.js";const p={},e=t('<h1 id="如何在jpa中持久化字符串列表" tabindex="-1"><a class="header-anchor" href="#如何在jpa中持久化字符串列表"><span>如何在JPA中持久化字符串列表？</span></a></h1><p>在本教程中，我们将讨论如何在JPA中持久化类型为List<code>&lt;String&gt;</code>的属性。我们将查看实现此目的的可能性，它们之间的区别，并通过示例解释它们的优势。</p><h2 id="_2-示例" tabindex="-1"><a class="header-anchor" href="#_2-示例"><span>2. 示例</span></a></h2><p>我们将使用一个名为library的实体作为模型，该实体具有自动生成的ID、一个名称、一个包含地址的List<code>&lt;String&gt;</code>，以及一个包含书名的List<code>&lt;String&gt;</code>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Entity</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;library&quot;</span><span class="token punctuation">)</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Library</span> <span class="token punctuation">{</span>\n\n    <span class="token annotation punctuation">@Id</span>\n    <span class="token annotation punctuation">@GeneratedValue</span><span class="token punctuation">(</span>strategy <span class="token operator">=</span> <span class="token class-name">GenerationType</span><span class="token punctuation">.</span><span class="token constant">IDENTITY</span><span class="token punctuation">)</span>\n    <span class="token keyword">private</span> <span class="token class-name">Long</span> id<span class="token punctuation">;</span>\n\n    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>\n\n    <span class="token keyword">private</span> <span class="token class-name">List</span>```````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``````````````` addresses <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token class-name">List</span>```````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``````````````` books <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token comment">// getter, setter, 和构造函数</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于List<code>&lt;String&gt;</code>，<strong>我们可以创建一个带有id和字符串的第二个实体，然后使用OneToMany关系进行注解</strong>。我们将探讨JPA中的另外两种可能性，这些可能性简化了这种行为。</p><h2 id="_3-elementcollection" tabindex="-1"><a class="header-anchor" href="#_3-elementcollection"><span>3. @ElementCollection</span></a></h2><p>第一个选项是使用@ElementCollection。此注解允许我们指定集合的目标类。在我们的例子中，这是String。此外，我们可以指定列表是否应该以延迟或即时的方式加载。默认值是延迟。但是，为了示例的简单性，我们将值设置为即时：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@ElementCollection</span><span class="token punctuation">(</span>targetClass <span class="token operator">=</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> fetch <span class="token operator">=</span> <span class="token class-name">FetchType</span><span class="token punctuation">.</span><span class="token constant">EAGER</span><span class="token punctuation">)</span>\n<span class="token annotation punctuation">@CollectionTable</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;books&quot;</span><span class="token punctuation">,</span> joinColumns <span class="token operator">=</span> <span class="token annotation punctuation">@JoinColumn</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;library_id&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n<span class="token annotation punctuation">@Column</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;book&quot;</span><span class="token punctuation">,</span> nullable <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">)</span>\n<span class="token keyword">private</span> <span class="token class-name">List</span>```````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``````````````` books <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们还可以使用@Transactional注解访问列表的方法，或者使用@Query(&quot;SELECT l FROM library l JOIN FETCH l.books WHERE l.id = (:id)&quot;)注解仓库方法，以避免LazyInitializationException。</p><p>注解的结果生成了以下DDL：</p><div class="language-sql line-numbers-mode" data-ext="sql" data-title="sql"><pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> books\n<span class="token punctuation">(</span>\n    library_id <span class="token keyword">BIGINT</span>       <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>\n    book      <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">255</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span>\n<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> library\n<span class="token punctuation">(</span>\n    id        <span class="token keyword">BIGINT</span> GENERATED <span class="token keyword">BY</span> <span class="token keyword">DEFAULT</span> <span class="token keyword">AS</span> <span class="token keyword">IDENTITY</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>\n    name      <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">255</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    addresses <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">255</span><span class="token punctuation">)</span>                            <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>\n    <span class="token keyword">CONSTRAINT</span> pk_library <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span>id<span class="token punctuation">)</span>\n<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">ALTER</span> <span class="token keyword">TABLE</span> books\n    <span class="token keyword">ADD</span> <span class="token keyword">CONSTRAINT</span> fk_books_on_library <span class="token keyword">FOREIGN</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span>library_id<span class="token punctuation">)</span> <span class="token keyword">REFERENCES</span> library <span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以看到@CollectionTable设置了第二个表的名称和引用我们library表的列。此外，外键也适当地创建了。因此，通过使用这种方法中的@ElementCollection，<strong>我们节省了通常需要的第二个实体用于OneToMany链接</strong>。</p><h2 id="_4-属性转换器" tabindex="-1"><a class="header-anchor" href="#_4-属性转换器"><span>4. 属性转换器</span></a></h2><p>另一种选择是使用转换器。为此，我们必须使用我们期望的对象实现通用的AttributeConverter。在我们的例子中，这是List<code>&lt;String&gt;</code>；期望的格式可以是String，例如。<strong>在convertToDatabaseColumn(List<code>&lt;String&gt;</code> stringList)方法中，返回值是对象最终在数据库中应该具有的数据类型</strong>，参数是我们的列表。</p><p><strong>另一方面，convertToEntityAttribute(String string)方法定义了如何将列中的字符串转换回</strong> List<code>&lt;String&gt;</code>。在我们的例子中，我们使用字符“;”来分隔字符串：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Converter</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">StringListConverter</span> <span class="token keyword">implements</span> <span class="token class-name">AttributeConverter</span><span class="token operator">&lt;</span><span class="token class-name">List</span>```````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>```````````````<span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token operator">&gt;</span> <span class="token punctuation">{</span>\n    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">SPLIT_CHAR</span> <span class="token operator">=</span> <span class="token string">&quot;;&quot;</span><span class="token punctuation">;</span>\n\n    <span class="token annotation punctuation">@Override</span>\n    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">convertToDatabaseColumn</span><span class="token punctuation">(</span><span class="token class-name">List</span>```````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``````````````` stringList<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> stringList <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">?</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token constant">SPLIT_CHAR</span><span class="token punctuation">,</span> stringList<span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token annotation punctuation">@Override</span>\n    <span class="token keyword">public</span> <span class="token class-name">List</span>```````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``````````````` <span class="token function">convertToEntityAttribute</span><span class="token punctuation">(</span><span class="token class-name">String</span> string<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> string <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">?</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span>string<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token constant">SPLIT_CHAR</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token function">emptyList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们还必须在字段上添加我们的转换器@Convert：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Convert</span><span class="token punctuation">(</span>converter <span class="token operator">=</span> <span class="token class-name">StringListConverter</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>\n<span class="token annotation punctuation">@Column</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;addresses&quot;</span><span class="token punctuation">,</span> nullable <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">)</span>\n<span class="token keyword">private</span> <span class="token class-name">List</span>```````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``````````````` addresses <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>或者，我们可以将列表作为JSON字符串存储在列中。当我们决定使用AttributeConverter时，<strong>我们必须牢记我们的列表将增长到多大，因为它必须适应所选列的大小</strong>。</p><p>在我们的情况下，它必须适合varchar(255)的addresses列。在ElemenCollection方法中，我们的列表可以有无限数量的项目，每个项目仅受列本身的varchar(255)限制。</p><h2 id="_5-比较" tabindex="-1"><a class="header-anchor" href="#_5-比较"><span>5. 比较</span></a></h2><p>接下来，我们将创建LibraryRepository并测试我们的解决方案：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Repository</span>\n<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">LibraryRepository</span> <span class="token keyword">extends</span> <span class="token class-name">CrudRepository</span>`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Library</span><span class="token punctuation">,</span> <span class="token class-name">Long</span><span class="token punctuation">&gt;</span></span>` <span class="token punctuation">{</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在当我们执行代码时，我们将像往常一样向library实体添加列表项：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Library</span> library <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Library</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nlibrary<span class="token punctuation">.</span><span class="token function">setAddresses</span><span class="token punctuation">(</span><span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token string">&quot;Address 1&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Address 2&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nlibrary<span class="token punctuation">.</span><span class="token function">setBooks</span><span class="token punctuation">(</span><span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token string">&quot;Book 1&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Book 2&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\nlibraryRepository<span class="token punctuation">.</span><span class="token function">save</span><span class="token punctuation">(</span>library<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">Library</span> lib <span class="token operator">=</span> libraryRepository<span class="token punctuation">.</span><span class="token function">findById</span><span class="token punctuation">(</span>library<span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">longValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;lib.getAddresses() = &quot;</span> <span class="token operator">+</span> lib<span class="token punctuation">.</span><span class="token function">getAddresses</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;lib.getBooks() = &quot;</span> <span class="token operator">+</span> lib<span class="token punctuation">.</span><span class="token function">getBooks</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们将得到以下输出：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>lib<span class="token punctuation">.</span><span class="token function">getAddresses</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token class-name">Address</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token class-name">Address</span> <span class="token number">2</span><span class="token punctuation">]</span>\nlib<span class="token punctuation">.</span><span class="token function">getBooks</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token class-name">Book</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token class-name">Book</span> <span class="token number">2</span><span class="token punctuation">]</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，两种实现都按预期工作，并且各自有自己的优势：</p><table><thead><tr><th></th><th>元素集合</th><th>转换器</th></tr></thead><tbody><tr><td>默认获取类型</td><td>延迟</td><td>即时</td></tr><tr><td>列表限制</td><td>无限列表项</td><td>受列长度限制</td></tr><tr><td>每个字符串的限制</td><td>受列长度限制</td><td>受列表项数限制，因此也受列长度限制</td></tr><tr><td>表</td><td>创建额外的表</td><td>不需要自己的表</td></tr></tbody></table><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们讨论了在JPA中存储实体的字符串列表的可能性。虽然我们展示了可能存在的限制以及各种可能性之间的差异。</p><p>如往常一样，示例代码可在GitHub上找到。</p>',33),o=[e];function c(l,i){return a(),s("div",null,o)}const k=n(p,[["render",c],["__file","2024-07-06-How to Persist a List of String in JPA .html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-06/2024-07-06-How%20to%20Persist%20a%20List%20of%20String%20in%20JPA%20.html","title":"如何在JPA中持久化字符串列表？","lang":"zh-CN","frontmatter":{"date":"2024-07-06T00:00:00.000Z","category":["JPA","Java"],"tag":["JPA","持久化","List```````````````<String>```````````````"],"head":[["meta",{"name":"keywords","content":"JPA, 持久化, List```````````````<String>```````````````, Java"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-06/2024-07-06-How%20to%20Persist%20a%20List%20of%20String%20in%20JPA%20.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"如何在JPA中持久化字符串列表？"}],["meta",{"property":"og:description","content":"如何在JPA中持久化字符串列表？ 在本教程中，我们将讨论如何在JPA中持久化类型为List<String>的属性。我们将查看实现此目的的可能性，它们之间的区别，并通过示例解释它们的优势。 2. 示例 我们将使用一个名为library的实体作为模型，该实体具有自动生成的ID、一个名称、一个包含地址的List<String>，以及一个包含书名的List<S..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-06T10:37:10.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"JPA"}],["meta",{"property":"article:tag","content":"持久化"}],["meta",{"property":"article:tag","content":"List```````````````<String>```````````````"}],["meta",{"property":"article:published_time","content":"2024-07-06T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-06T10:37:10.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"如何在JPA中持久化字符串列表？\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-06T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-06T10:37:10.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"如何在JPA中持久化字符串列表？ 在本教程中，我们将讨论如何在JPA中持久化类型为List<String>的属性。我们将查看实现此目的的可能性，它们之间的区别，并通过示例解释它们的优势。 2. 示例 我们将使用一个名为library的实体作为模型，该实体具有自动生成的ID、一个名称、一个包含地址的List<String>，以及一个包含书名的List<S..."},"headers":[{"level":2,"title":"2. 示例","slug":"_2-示例","link":"#_2-示例","children":[]},{"level":2,"title":"3. @ElementCollection","slug":"_3-elementcollection","link":"#_3-elementcollection","children":[]},{"level":2,"title":"4. 属性转换器","slug":"_4-属性转换器","link":"#_4-属性转换器","children":[]},{"level":2,"title":"5. 比较","slug":"_5-比较","link":"#_5-比较","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1720262230000,"updatedTime":1720262230000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.82,"words":1147},"filePathRelative":"posts/baeldung/2024-07-06/2024-07-06-How to Persist a List of String in JPA .md","localizedDate":"2024年7月6日","excerpt":"\\n<p>在本教程中，我们将讨论如何在JPA中持久化类型为List<code>&lt;String&gt;</code>的属性。我们将查看实现此目的的可能性，它们之间的区别，并通过示例解释它们的优势。</p>\\n<h2>2. 示例</h2>\\n<p>我们将使用一个名为library的实体作为模型，该实体具有自动生成的ID、一个名称、一个包含地址的List<code>&lt;String&gt;</code>，以及一个包含书名的List<code>&lt;String&gt;</code>：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token annotation punctuation\\">@Entity</span><span class=\\"token punctuation\\">(</span>name <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\\"library\\"</span><span class=\\"token punctuation\\">)</span>\\n<span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">Library</span> <span class=\\"token punctuation\\">{</span>\\n\\n    <span class=\\"token annotation punctuation\\">@Id</span>\\n    <span class=\\"token annotation punctuation\\">@GeneratedValue</span><span class=\\"token punctuation\\">(</span>strategy <span class=\\"token operator\\">=</span> <span class=\\"token class-name\\">GenerationType</span><span class=\\"token punctuation\\">.</span><span class=\\"token constant\\">IDENTITY</span><span class=\\"token punctuation\\">)</span>\\n    <span class=\\"token keyword\\">private</span> <span class=\\"token class-name\\">Long</span> id<span class=\\"token punctuation\\">;</span>\\n\\n    <span class=\\"token keyword\\">private</span> <span class=\\"token class-name\\">String</span> name<span class=\\"token punctuation\\">;</span>\\n\\n    <span class=\\"token keyword\\">private</span> <span class=\\"token class-name\\">List</span>```````````````<span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">String</span><span class=\\"token punctuation\\">&gt;</span></span>``````````````` addresses <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">ArrayList</span><span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token punctuation\\">&gt;</span></span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">private</span> <span class=\\"token class-name\\">List</span>```````````````<span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">String</span><span class=\\"token punctuation\\">&gt;</span></span>``````````````` books <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">ArrayList</span><span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token punctuation\\">&gt;</span></span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\n    <span class=\\"token comment\\">// getter, setter, 和构造函数</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{k as comp,d as data};
