import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-CXN34Kw1.js";const e={},p=t(`<h1 id="hibernate的-非空属性引用了空或瞬态值-错误" tabindex="-1"><a class="header-anchor" href="#hibernate的-非空属性引用了空或瞬态值-错误"><span>Hibernate的“非空属性引用了空或瞬态值”错误</span></a></h1><p>在本文中，我们将学习Hibernate的_PropertyValueException_。特别是，我们将考虑“非空属性引用了空或瞬态值”的错误消息。</p><p>Hibernate主要在两种情况下抛出_PropertyValueException_：</p><ul><li>当为标记为_nullable = false_的列保存一个_null_值时</li><li>当保存一个引用未保存实例的关联实体时</li></ul><h2 id="_2-hibernate的空值检查" tabindex="-1"><a class="header-anchor" href="#_2-hibernate的空值检查"><span>2. Hibernate的空值检查</span></a></h2><p>首先，让我们讨论Hibernate的_@Column(nullable = false)_注解。<strong>如果不存在其他Bean验证，我们可以依赖</strong>Hibernate的空值检查。</p><p>此外，我们可以通过设置_hibernate.check_nullability = true_来强制执行此验证。为了重现以下示例，我们需要启用空值检查。</p><h2 id="_3-为非空列保存-null-值" tabindex="-1"><a class="header-anchor" href="#_3-为非空列保存-null-值"><span>3. 为非空列保存_null_值</span></a></h2><p>现在，让我们利用Hibernate的验证机制来重现一个简单的用例的错误。我们将尝试保存一个没有设置其必填字段的_@Entity_。为此示例，我们将使用简单的_Book_类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Entity</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Book</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Id</span>
    <span class="token annotation punctuation">@GeneratedValue</span><span class="token punctuation">(</span>strategy <span class="token operator">=</span> <span class="token class-name">GenerationType</span><span class="token punctuation">.</span><span class="token constant">AUTO</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">Long</span> id<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Column</span><span class="token punctuation">(</span>nullable <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> title<span class="token punctuation">;</span>

    <span class="token comment">// getters and setters</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><em>title_列的_nullable_标志设置为_false</em>。现在我们可以保存一个没有设置标题的_Book_对象，并断言抛出了_PropertyValueException_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenSavingEntityWithNullMandatoryField_thenThrowPropertyValueException</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Book</span> book <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Book</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertThatThrownBy</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> session<span class="token punctuation">.</span><span class="token function">save</span><span class="token punctuation">(</span>book<span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">isInstanceOf</span><span class="token punctuation">(</span><span class="token class-name">PropertyValueException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">hasMessageContaining</span><span class="token punctuation">(</span><span class="token string">&quot;not-null property references a null or transient value&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因此，我们只需要在保存实体之前设置必填字段就可以解决问题：<em>book.setTitle(&quot;Clean Code&quot;)</em>。</p><h2 id="_4-保存引用未保存实例的关联" tabindex="-1"><a class="header-anchor" href="#_4-保存引用未保存实例的关联"><span>4. 保存引用未保存实例的关联</span></a></h2><p>在这一部分，我们将探索一个更复杂的设置中常见的场景。为此示例，我们将使用_Author_和_Article_实体，它们共享双向关系：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Entity</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Author</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Id</span>
    <span class="token annotation punctuation">@GeneratedValue</span><span class="token punctuation">(</span>strategy <span class="token operator">=</span> <span class="token class-name">GenerationType</span><span class="token punctuation">.</span><span class="token constant">IDENTITY</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token keyword">long</span> id<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@OneToMany</span>
    <span class="token annotation punctuation">@Cascade</span><span class="token punctuation">(</span><span class="token class-name">CascadeType</span><span class="token punctuation">.</span><span class="token constant">ALL</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">List</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Article</span><span class="token punctuation">&gt;</span></span>\`\` articles<span class="token punctuation">;</span>

    <span class="token comment">// constructor, getters and setters</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><em>articles_字段有</em>@Cascade(CascadeType.ALL)_注解。因此，当我们保存一个_Author_实体时，操作将传播到所有的_Article_对象：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Entity</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Article</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Id</span>
    <span class="token annotation punctuation">@GeneratedValue</span><span class="token punctuation">(</span>strategy <span class="token operator">=</span> <span class="token class-name">GenerationType</span><span class="token punctuation">.</span><span class="token constant">IDENTITY</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token keyword">long</span> id<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> title<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@ManyToOne</span><span class="token punctuation">(</span>optional <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">Author</span> author<span class="token punctuation">;</span>

    <span class="token comment">// constructor, getters and setters</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们尝试保存一个_Author_和一些_Articles_并看看会发生什么：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenSavingBidirectionalEntityiesithCorrectParent_thenDoNotThrowException</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Author</span> author <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Author</span><span class="token punctuation">(</span><span class="token string">&quot;John Doe&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    author<span class="token punctuation">.</span><span class="token function">setArticles</span><span class="token punctuation">(</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Article</span><span class="token punctuation">(</span><span class="token string">&quot;Java tutorial&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Article</span><span class="token punctuation">(</span><span class="token string">&quot;What&#39;s new in JUnit5&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertThatThrownBy</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> session<span class="token punctuation">.</span><span class="token function">save</span><span class="token punctuation">(</span>author<span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">isInstanceOf</span><span class="token punctuation">(</span><span class="token class-name">PropertyValueException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">hasMessageContaining</span><span class="token punctuation">(</span><span class="token string">&quot;not-null property references a null or transient value&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当我们使用双向关系时，我们可能会犯忘记从两边更新分配的常见错误。<strong>我们可以通过改变_Author_类的_setter_来更新所有子_articles_来避免这个问题。</strong></p><p>为了说明文章中提出的所有用例，我们将为此创建一个不同的方法。然而，从父实体的_setter_设置这些字段是一个好习惯：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">addArticles</span><span class="token punctuation">(</span><span class="token class-name">List</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Article</span><span class="token punctuation">&gt;</span></span>\`\` articles<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>articles <span class="token operator">=</span> articles<span class="token punctuation">;</span>
    articles<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>article <span class="token operator">-&gt;</span> article<span class="token punctuation">.</span><span class="token function">setAuthor</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在我们可以使用新方法设置分配，并期望没有错误：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenSavingBidirectionalEntitesWithCorrectParent_thenDoNotThrowException</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Author</span> author <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Author</span><span class="token punctuation">(</span><span class="token string">&quot;John Doe&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    author<span class="token punctuation">.</span><span class="token function">addArticles</span><span class="token punctuation">(</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Article</span><span class="token punctuation">(</span><span class="token string">&quot;Java tutorial&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Article</span><span class="token punctuation">(</span><span class="token string">&quot;What&#39;s new in JUnit5&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    session<span class="token punctuation">.</span><span class="token function">save</span><span class="token punctuation">(</span>author<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们看到了Hibernate的验证机制是如何工作的。首先，我们发现了如何在项目中启用_nullability checking_。之后，我们举例说明了导致_PropertyValueException_的主要原因，并学习了如何修复它们。</p><p>像往常一样，源代码可以在GitHub上找到。</p>`,28),o=[p];function l(i,c){return s(),a("div",null,o)}const d=n(e,[["render",l],["__file","2024-07-19-Hibernate s  Not Null Property References a Null or Transient Value  Error.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-19/2024-07-19-Hibernate%20s%20%20Not%20Null%20Property%20References%20a%20Null%20or%20Transient%20Value%20%20Error.html","title":"Hibernate的“非空属性引用了空或瞬态值”错误","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Hibernate","JPA"],"tag":["Hibernate","Error"],"head":[["meta",{"name":"keywords","content":"Hibernate, JPA, PropertyValueException, Nullability, Error Handling"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-19/2024-07-19-Hibernate%20s%20%20Not%20Null%20Property%20References%20a%20Null%20or%20Transient%20Value%20%20Error.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Hibernate的“非空属性引用了空或瞬态值”错误"}],["meta",{"property":"og:description","content":"Hibernate的“非空属性引用了空或瞬态值”错误 在本文中，我们将学习Hibernate的_PropertyValueException_。特别是，我们将考虑“非空属性引用了空或瞬态值”的错误消息。 Hibernate主要在两种情况下抛出_PropertyValueException_： 当为标记为_nullable = false_的列保存一个_..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-19T18:50:41.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Hibernate"}],["meta",{"property":"article:tag","content":"Error"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-19T18:50:41.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Hibernate的“非空属性引用了空或瞬态值”错误\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-19T18:50:41.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Hibernate的“非空属性引用了空或瞬态值”错误 在本文中，我们将学习Hibernate的_PropertyValueException_。特别是，我们将考虑“非空属性引用了空或瞬态值”的错误消息。 Hibernate主要在两种情况下抛出_PropertyValueException_： 当为标记为_nullable = false_的列保存一个_..."},"headers":[{"level":2,"title":"2. Hibernate的空值检查","slug":"_2-hibernate的空值检查","link":"#_2-hibernate的空值检查","children":[]},{"level":2,"title":"3. 为非空列保存_null_值","slug":"_3-为非空列保存-null-值","link":"#_3-为非空列保存-null-值","children":[]},{"level":2,"title":"4. 保存引用未保存实例的关联","slug":"_4-保存引用未保存实例的关联","link":"#_4-保存引用未保存实例的关联","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1721415041000,"updatedTime":1721415041000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.81,"words":842},"filePathRelative":"posts/baeldung/2024-07-19/2024-07-19-Hibernate s  Not Null Property References a Null or Transient Value  Error.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在本文中，我们将学习Hibernate的_PropertyValueException_。特别是，我们将考虑“非空属性引用了空或瞬态值”的错误消息。</p>\\n<p>Hibernate主要在两种情况下抛出_PropertyValueException_：</p>\\n<ul>\\n<li>当为标记为_nullable = false_的列保存一个_null_值时</li>\\n<li>当保存一个引用未保存实例的关联实体时</li>\\n</ul>\\n<h2>2. Hibernate的空值检查</h2>\\n<p>首先，让我们讨论Hibernate的_@Column(nullable = false)_注解。<strong>如果不存在其他Bean验证，我们可以依赖</strong>Hibernate的空值检查。</p>","autoDesc":true}');export{d as comp,k as data};
