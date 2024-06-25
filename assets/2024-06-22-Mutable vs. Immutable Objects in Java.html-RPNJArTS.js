import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-BaMF6Agx.js";const e={},p=t(`<h1 id="java中的可变对象与不可变对象" tabindex="-1"><a class="header-anchor" href="#java中的可变对象与不可变对象"><span>Java中的可变对象与不可变对象</span></a></h1><ol><li>引言</li></ol><p>在Java中使用对象时，理解可变对象（mutable objects）和不可变对象（immutable objects）之间的区别至关重要。这些概念影响您的Java代码的行为和设计。</p><p>在本教程中，我们将探讨可变和不可变对象的定义、示例、优势和考虑因素。</p><p>不可变对象是指一旦创建后其状态就无法改变的对象。一旦不可变对象被实例化，其值和属性在其生命周期内保持不变。</p><p>让我们探索Java中一些内置的不可变类的示例。</p><p>2.1. String类</p><p>Java中String的不可变性确保了线程安全性，增强了安全性，并通过String Pool机制帮助高效使用内存。</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenImmutableString_whenConcatString_thenNotSameAndCorrectValues</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> originalString <span class="token operator">=</span> <span class="token string">&quot;Hello&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> modifiedString <span class="token operator">=</span> originalString<span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span><span class="token string">&quot; World&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertNotSame</span><span class="token punctuation">(</span>originalString<span class="token punctuation">,</span> modifiedString<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Hello&quot;</span><span class="token punctuation">,</span> originalString<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Hello World&quot;</span><span class="token punctuation">,</span> modifiedString<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个示例中，concat()方法创建了一个新的String，原始的String保持不变。</p><p>2.2. Integer类</p><p>在Java中，Integer类是不可变的，这意味着一旦它们被设置，其值就不能被改变。然而，当您对一个Integer执行操作时，会创建一个新的实例来保存结果。</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenImmutableInteger_whenAddInteger_thenNotSameAndCorrectValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Integer</span> immutableInt <span class="token operator">=</span> <span class="token number">42</span><span class="token punctuation">;</span>
    <span class="token class-name">Integer</span> modifiedInt <span class="token operator">=</span> immutableInt <span class="token operator">+</span> <span class="token number">8</span><span class="token punctuation">;</span>

    <span class="token function">assertNotSame</span><span class="token punctuation">(</span>immutableInt<span class="token punctuation">,</span> modifiedInt<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">42</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span> immutableInt<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span> modifiedInt<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里，+操作创建了一个新的Integer对象，原始对象保持不可变性。</p><p>2.3. 不可变对象的优势</p><p>Java中的不可变对象提供了几个优势，有助于提高代码的可靠性、简洁性和性能。让我们了解使用不可变对象的一些好处：</p><ul><li><strong>线程安全</strong>：不可变性天生确保线程安全。由于不可变对象的状态在创建后不能被修改，它可以在多个线程之间安全共享，无需显式同步。这简化了并发编程，并减少了竞态条件的风险。</li><li><strong>可预测性和调试</strong>：不可变对象的恒定状态使代码更加可预测。一旦创建，不可变对象的值就保持不变，简化了对代码行为的推理。</li><li><strong>促进缓存和优化</strong>：不可变对象可以轻松地被缓存和重用。一旦创建，不可变对象的状态不会改变，允许有效的缓存策略。</li></ul><p>因此，开发者可以在Java应用程序中使用不可变对象来设计更强大、可预测和高效的系统。</p><ol start="3"><li>创建不可变对象</li></ol><p>要创建一个不可变对象，让我们考虑一个名为ImmutablePerson的类示例。该类被声明为final以防止扩展，并且它包含没有setter方法的private final字段，遵循不可变性的原则。</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token keyword">class</span> <span class="token class-name">ImmutablePerson</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token keyword">int</span> age<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">ImmutablePerson</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token keyword">int</span> age<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> age<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> name<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">getAge</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> age<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们考虑当我们尝试修改ImmutablePerson实例的名称时会发生什么：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">ImmutablePerson</span> person <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ImmutablePerson</span><span class="token punctuation">(</span><span class="token string">&quot;John&quot;</span><span class="token punctuation">,</span> <span class="token number">30</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
person<span class="token punctuation">.</span><span class="token function">setName</span><span class="token punctuation">(</span><span class="token string">&quot;Jane&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>尝试修改ImmutablePerson实例的名称将导致编译错误。这是因为该类被设计为不可变的，没有setter方法允许在实例化后更改其状态。</p><p><strong>缺少setter和将类声明为final确保了对象的不可变性，提供了一种清晰和健壮的方式来处理其生命周期内的恒定状态。</strong></p><ol start="4"><li>可变对象</li></ol><p><strong>Java中的可变对象是可以在其创建后修改其状态的实体。</strong> 这种可变性引入了可改变的内部数据的概念，允许在对象的生命周期内更改值和属性。</p><p>让我们探索一些示例来理解它们的特性。</p><p>4.1. StringBuilder类</p><p>Java中的StringBuilder类表示一个可变的字符序列。与它的不可变对应物String不同，StringBuilder允许动态修改其内容。</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenMutableString_whenAppendElement_thenCorrectValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">StringBuilder</span> mutableString <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringBuilder</span><span class="token punctuation">(</span><span class="token string">&quot;Hello&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    mutableString<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot; World&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Hello World&quot;</span><span class="token punctuation">,</span> mutableString<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里，append方法直接改变了StringBuilder对象的内部状态，展示了它的可变性。</p><p>4.2. ArrayList类</p><p>ArrayList类是另一个可变对象的例子。它表示一个可以增长或缩小的动态数组，允许添加和删除元素。</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenMutableList_whenAddElement_thenCorrectSize</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">List</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\` mutableList <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    mutableList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&quot;Java&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> mutableList<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>add方法通过添加一个元素来修改ArrayList的状态，展示了其可变特性。</p><p>4.3. 考虑因素</p><p>虽然可变对象提供了灵活性，但它们带来了开发者需要留意的某些考虑因素：</p><ul><li><strong>线程安全</strong>：可变对象可能需要额外的同步机制来确保多线程环境中的线程安全。如果没有适当的同步，同时修改可能导致意外行为。</li><li><strong>代码理解的复杂性</strong>：修改可变对象内部状态的能力引入了代码理解的复杂性。开发者需要谨慎对待对象状态的潜在变化，特别是在大型代码库中。</li><li><strong>状态管理挑战</strong>：管理可变对象的内部状态需要仔细考虑。开发者应该跟踪和控制变化，以确保对象的完整性并防止意外修改。</li></ul><p>尽管有这些考虑因素，可变对象提供了一种动态和灵活的方法，允许开发者根据不断变化的需求调整对象的状态。</p><ol start="5"><li>可变对象与不可变对象</li></ol><p>当对比可变和不可变对象时，有几个因素需要考虑。让我们探索这两种类型对象之间的根本区别：</p><table><thead><tr><th>标准</th><th>可变对象</th><th>不可变对象</th></tr></thead><tbody><tr><td><strong>可修改性</strong></td><td>创建后可以更改</td><td>一旦创建就保持不变</td></tr><tr><td><strong>线程安全</strong></td><td>可能需要同步以确保线程安全</td><td>天生线程安全</td></tr><tr><td><strong>可预测性</strong></td><td>可能在理解上引入复杂性</td><td>简化推理和调试</td></tr><tr><td><strong>性能影响</strong></td><td>可能因同步而影响性能</td><td>通常对性能有积极影响</td></tr></tbody></table><p>5.1. 选择可变性与不可变性</p><p>选择可变性和不可变性取决于应用程序的需求。<strong>如果需要适应性和频繁更改，请选择可变对象。然而，如果一致性、安全性和稳定状态是优先考虑的，不可变性是正确的选择。</strong></p><p>考虑多任务场景中的并发性。<strong>不可变性简化了任务之间的数据共享，而无需同步的复杂性。</strong></p><p>此外，评估应用程序的性能需求。虽然不可变对象通常提高性能，但权衡这种提升是否比可变对象提供的灵活性更重要，特别是在数据更改不频繁的情况下。</p><p>保持正确的平衡确保您的代码有效地与应用程序的需求对齐。</p><ol start="6"><li>结论</li></ol><p>总之，Java中选择可变和不可变对象在塑造代码的可靠性、效率和可维护性方面起着关键作用。<strong>虽然不可变性提供了线程安全、可预测性和其他优势，但可变性提供了灵活性和动态状态变化。</strong></p><p>评估应用程序的需求，并考虑并发性、性能和代码复杂性等因素，将有助于为设计有弹性和高效的Java应用程序做出适当的选择。</p><p>您可以在GitHub上找到本文中使用的所有示例。</p><p>OK</p>`,53),o=[p];function i(l,c){return s(),a("div",null,o)}const d=n(e,[["render",i],["__file","2024-06-22-Mutable vs. Immutable Objects in Java.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-06-22/2024-06-22-Mutable%20vs.%20Immutable%20Objects%20in%20Java.html","title":"Java中的可变对象与不可变对象","lang":"zh-CN","frontmatter":{"date":"2024-06-22T00:00:00.000Z","category":["Java","编程"],"tag":["可变对象","不可变对象"],"head":[["meta",{"name":"keywords","content":"Java, 可变对象, 不可变对象, 线程安全, 代码设计"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-22/2024-06-22-Mutable%20vs.%20Immutable%20Objects%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中的可变对象与不可变对象"}],["meta",{"property":"og:description","content":"Java中的可变对象与不可变对象 引言 在Java中使用对象时，理解可变对象（mutable objects）和不可变对象（immutable objects）之间的区别至关重要。这些概念影响您的Java代码的行为和设计。 在本教程中，我们将探讨可变和不可变对象的定义、示例、优势和考虑因素。 不可变对象是指一旦创建后其状态就无法改变的对象。一旦不可变对..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-22T15:49:34.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"可变对象"}],["meta",{"property":"article:tag","content":"不可变对象"}],["meta",{"property":"article:published_time","content":"2024-06-22T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-22T15:49:34.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中的可变对象与不可变对象\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-22T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-22T15:49:34.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中的可变对象与不可变对象 引言 在Java中使用对象时，理解可变对象（mutable objects）和不可变对象（immutable objects）之间的区别至关重要。这些概念影响您的Java代码的行为和设计。 在本教程中，我们将探讨可变和不可变对象的定义、示例、优势和考虑因素。 不可变对象是指一旦创建后其状态就无法改变的对象。一旦不可变对..."},"headers":[],"git":{"createdTime":1719071374000,"updatedTime":1719071374000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":6.35,"words":1904},"filePathRelative":"posts/baeldung/2024-06-22/2024-06-22-Mutable vs. Immutable Objects in Java.md","localizedDate":"2024年6月22日","excerpt":"\\n<ol>\\n<li>引言</li>\\n</ol>\\n<p>在Java中使用对象时，理解可变对象（mutable objects）和不可变对象（immutable objects）之间的区别至关重要。这些概念影响您的Java代码的行为和设计。</p>\\n<p>在本教程中，我们将探讨可变和不可变对象的定义、示例、优势和考虑因素。</p>\\n<p>不可变对象是指一旦创建后其状态就无法改变的对象。一旦不可变对象被实例化，其值和属性在其生命周期内保持不变。</p>\\n<p>让我们探索Java中一些内置的不可变类的示例。</p>\\n<p>2.1. String类</p>\\n<p>Java中String的不可变性确保了线程安全性，增强了安全性，并通过String Pool机制帮助高效使用内存。</p>","autoDesc":true}');export{d as comp,k as data};
