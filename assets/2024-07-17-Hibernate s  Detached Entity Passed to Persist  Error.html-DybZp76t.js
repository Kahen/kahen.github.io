import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-on0L14Tx.js";const e={},p=t(`<hr><h1 id="hibernate的-传递给持久化的分离实体-错误" tabindex="-1"><a class="header-anchor" href="#hibernate的-传递给持久化的分离实体-错误"><span>Hibernate的“传递给持久化的分离实体”错误</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在本教程中，我们将学习Hibernate的_PersistentObjectException_，该错误发生在尝试保存一个分离的实体时。</p><p>我们将首先理解_分离_状态的含义，以及Hibernate的_persist_和_merge_方法之间的区别。然后我们将在各种用例中重现错误，以演示如何修复它。</p><h2 id="_2-分离实体" tabindex="-1"><a class="header-anchor" href="#_2-分离实体"><span>2. 分离实体</span></a></h2><p>让我们首先简要回顾一下_分离_状态是什么以及它如何与实体生命周期相关。</p><p>一个_分离_实体是一个不再被_持久化上下文_跟踪的Java对象。<strong>实体可以通过关闭或清除会话达到这种状态。同样，我们可以通过手动将其从持久化上下文中删除来分离实体。</strong></p><p>我们将在本文中使用_Post_和_Comment_实体作为代码示例。要分离特定的_Post_实体，我们可以使用_session.evict(post)_。我们可以通过使用_session.clear()_清除会话来分离上下文中的所有实体。</p><p>例如，一些测试将需要一个分离的_Post_。让我们看看如何实现这一点：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Before</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">beforeEach</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    session <span class="token operator">=</span> <span class="token class-name">HibernateUtil</span><span class="token punctuation">.</span><span class="token function">getSessionFactory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">openSession</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    session<span class="token punctuation">.</span><span class="token function">beginTransaction</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">this</span><span class="token punctuation">.</span>detachedPost <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Post</span><span class="token punctuation">(</span><span class="token string">&quot;Hibernate Tutorial&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    session<span class="token punctuation">.</span><span class="token function">persist</span><span class="token punctuation">(</span>detachedPost<span class="token punctuation">)</span><span class="token punctuation">;</span>
    session<span class="token punctuation">.</span><span class="token function">evict</span><span class="token punctuation">(</span>detachedPost<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先，我们持久化了_Post_实体，然后我们使用_session.evict(post)_将其分离。</p><h2 id="_3-尝试持久化一个分离实体" tabindex="-1"><a class="header-anchor" href="#_3-尝试持久化一个分离实体"><span>3. 尝试持久化一个分离实体</span></a></h2><p>如果我们尝试持久化一个分离实体，Hibernate会抛出一个带有“detached entity passed to persist”错误消息的_PersistenceException_。</p><p>让我们尝试持久化一个分离的_Post_实体以预期这个异常：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenDetachedPost_whenTryingToPersist_thenThrowException</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    detachedPost<span class="token punctuation">.</span><span class="token function">setTitle</span><span class="token punctuation">(</span><span class="token string">&quot;Hibernate Tutorial for Absolute Beginners&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertThatThrownBy</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> session<span class="token punctuation">.</span><span class="token function">persist</span><span class="token punctuation">(</span>detachedPost<span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">isInstanceOf</span><span class="token punctuation">(</span><span class="token class-name">PersistenceException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">hasMessageContaining</span><span class="token punctuation">(</span><span class="token string">&quot;detached entity passed to persist: com.baeldung.hibernate.exception.detachedentity.entity.Post&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为了避免这种情况，我们应该了解实体状态并使用适当的方法来保存它。</p><p><strong>如果我们使用_merge_方法，Hibernate将根据@</strong> <em><strong>Id</strong></em> <strong>字段重新将实体附加到持久化上下文中：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenDetachedPost_whenTryingToMerge_thenNoExceptionIsThrown</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    detachedPost<span class="token punctuation">.</span><span class="token function">setTitle</span><span class="token punctuation">(</span><span class="token string">&quot;Hibernate Tutorial for Beginners&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    session<span class="token punctuation">.</span><span class="token function">merge</span><span class="token punctuation">(</span>detachedPost<span class="token punctuation">)</span><span class="token punctuation">;</span>
    session<span class="token punctuation">.</span><span class="token function">getTransaction</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">commit</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">List</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Post</span><span class="token punctuation">&gt;</span></span>\` posts <span class="token operator">=</span> session<span class="token punctuation">.</span><span class="token function">createQuery</span><span class="token punctuation">(</span><span class="token string">&quot;Select p from Post p&quot;</span><span class="token punctuation">,</span> <span class="token class-name">Post</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">list</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertThat</span><span class="token punctuation">(</span>posts<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">hasSize</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertThat</span><span class="token punctuation">(</span>posts<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getTitle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token string">&quot;Hibernate Tutorial for Beginners&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同样，我们可以使用其他Hibernate特定方法，如_update_, <em>save_和_saveOrUpdate</em>。与_persist_和_merge_不同，这些方法不是JPA规范的一部分。因此，如果我们想要使用JPA抽象，我们应该避免使用它们。</p><h2 id="_4-通过关联尝试持久化分离实体" tabindex="-1"><a class="header-anchor" href="#_4-通过关联尝试持久化分离实体"><span>4. 通过关联尝试持久化分离实体</span></a></h2><p>在这个例子中，我们将引入_Comment_实体：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Entity</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Comment</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Id</span>
    <span class="token annotation punctuation">@GeneratedValue</span><span class="token punctuation">(</span>strategy <span class="token operator">=</span> <span class="token class-name">GenerationType</span><span class="token punctuation">.</span><span class="token constant">IDENTITY</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">Long</span> id<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> text<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@ManyToOne</span><span class="token punctuation">(</span>cascade <span class="token operator">=</span> <span class="token class-name">CascadeType</span><span class="token punctuation">.</span><span class="token constant">MERGE</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">Post</span> post<span class="token punctuation">;</span>

    <span class="token comment">// constructor, getters and setters</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以看到_Comment_实体与一个_Post_有一对多的关系。</p><p>级联类型设置为_CascadeType.MERGE;<em>，因此，我们将只传播_merge_操作到相关的_Post</em>。</p><p>换句话说，如果我们_merge_一个_Comment_实体，Hibernate将传播操作到相关的_Post_，并且这两个实体都将在数据库中更新。然而，如果我们想使用这种设置_persist_一个_Comment_，我们首先必须_merge_相关的分离_Post_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenDetachedPost_whenMergeAndPersistComment_thenNoExceptionIsThrown</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Comment</span> comment <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Comment</span><span class="token punctuation">(</span><span class="token string">&quot;nice article!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Post</span> mergedPost <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">Post</span><span class="token punctuation">)</span> session<span class="token punctuation">.</span><span class="token function">merge</span><span class="token punctuation">(</span>detachedPost<span class="token punctuation">)</span><span class="token punctuation">;</span>
    comment<span class="token punctuation">.</span><span class="token function">setPost</span><span class="token punctuation">(</span>mergedPost<span class="token punctuation">)</span><span class="token punctuation">;</span>

    session<span class="token punctuation">.</span><span class="token function">persist</span><span class="token punctuation">(</span>comment<span class="token punctuation">)</span><span class="token punctuation">;</span>
    session<span class="token punctuation">.</span><span class="token function">getTransaction</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">commit</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">List</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Comment</span><span class="token punctuation">&gt;</span></span>\` comments <span class="token operator">=</span> session<span class="token punctuation">.</span><span class="token function">createQuery</span><span class="token punctuation">(</span><span class="token string">&quot;Select c from Comment c&quot;</span><span class="token punctuation">,</span> <span class="token class-name">Comment</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">list</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Comment</span> savedComment <span class="token operator">=</span> comments<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertThat</span><span class="token punctuation">(</span>savedComment<span class="token punctuation">.</span><span class="token function">getText</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token string">&quot;nice article!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertThat</span><span class="token punctuation">(</span>savedComment<span class="token punctuation">.</span><span class="token function">getPost</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getTitle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token string">&quot;Hibernate Tutorial&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>相反，如果级联类型设置为_PERSIST_或_ALL_，Hibernate将尝试在分离的关联字段上传播_persist_操作。</strong> 因此，当我们使用这些级联类型_persist_一个_Post_实体时，Hibernate将_persist_相关的分离_Comment_，这将导致另一个_PersistentObjectException_。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们讨论了Hibernate的_PersistentObjectException_并了解了其主要原因。我们可以通过适当使用Hibernate的_save_, <em>persist</em>, <em>update</em>, _merge_和_saveOrUpdate_方法来避免它。</p><p>此外，合理利用JPA级联类型将防止在实体关联中发生_PersistentObjectException_。</p><p>如往常一样，文章的源代码可在GitHub上获取。</p>`,32),o=[p];function c(i,l){return a(),s("div",null,o)}const k=n(e,[["render",c],["__file","2024-07-17-Hibernate s  Detached Entity Passed to Persist  Error.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-17/2024-07-17-Hibernate%20s%20%20Detached%20Entity%20Passed%20to%20Persist%20%20Error.html","title":"Hibernate的“传递给持久化的分离实体”错误","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Hibernate","JPA"],"tag":["Hibernate","JPA","Detached Entity","Persistence"],"head":[["meta",{"name":"keywords","content":"Hibernate, JPA, Detached Entity, Persistence"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-17/2024-07-17-Hibernate%20s%20%20Detached%20Entity%20Passed%20to%20Persist%20%20Error.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Hibernate的“传递给持久化的分离实体”错误"}],["meta",{"property":"og:description","content":"Hibernate的“传递给持久化的分离实体”错误 1. 概述 在本教程中，我们将学习Hibernate的_PersistentObjectException_，该错误发生在尝试保存一个分离的实体时。 我们将首先理解_分离_状态的含义，以及Hibernate的_persist_和_merge_方法之间的区别。然后我们将在各种用例中重现错误，以演示如何修..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-17T15:08:28.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Hibernate"}],["meta",{"property":"article:tag","content":"JPA"}],["meta",{"property":"article:tag","content":"Detached Entity"}],["meta",{"property":"article:tag","content":"Persistence"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-17T15:08:28.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Hibernate的“传递给持久化的分离实体”错误\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-17T15:08:28.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Hibernate的“传递给持久化的分离实体”错误 1. 概述 在本教程中，我们将学习Hibernate的_PersistentObjectException_，该错误发生在尝试保存一个分离的实体时。 我们将首先理解_分离_状态的含义，以及Hibernate的_persist_和_merge_方法之间的区别。然后我们将在各种用例中重现错误，以演示如何修..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 分离实体","slug":"_2-分离实体","link":"#_2-分离实体","children":[]},{"level":2,"title":"3. 尝试持久化一个分离实体","slug":"_3-尝试持久化一个分离实体","link":"#_3-尝试持久化一个分离实体","children":[]},{"level":2,"title":"4. 通过关联尝试持久化分离实体","slug":"_4-通过关联尝试持久化分离实体","link":"#_4-通过关联尝试持久化分离实体","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1721228908000,"updatedTime":1721228908000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.34,"words":1002},"filePathRelative":"posts/baeldung/2024-07-17/2024-07-17-Hibernate s  Detached Entity Passed to Persist  Error.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>Hibernate的“传递给持久化的分离实体”错误</h1>\\n<h2>1. 概述</h2>\\n<p>在本教程中，我们将学习Hibernate的_PersistentObjectException_，该错误发生在尝试保存一个分离的实体时。</p>\\n<p>我们将首先理解_分离_状态的含义，以及Hibernate的_persist_和_merge_方法之间的区别。然后我们将在各种用例中重现错误，以演示如何修复它。</p>\\n<h2>2. 分离实体</h2>\\n<p>让我们首先简要回顾一下_分离_状态是什么以及它如何与实体生命周期相关。</p>\\n<p>一个_分离_实体是一个不再被_持久化上下文_跟踪的Java对象。<strong>实体可以通过关闭或清除会话达到这种状态。同样，我们可以通过手动将其从持久化上下文中删除来分离实体。</strong></p>","autoDesc":true}');export{k as comp,d as data};
