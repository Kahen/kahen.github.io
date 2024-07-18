import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-CE5go3V-.js";const e={},p=t(`<hr><h1 id="java中的错误-非静态方法不能从静态上下文中引用-是什么" tabindex="-1"><a class="header-anchor" href="#java中的错误-非静态方法不能从静态上下文中引用-是什么"><span>Java中的错误：“非静态方法不能从静态上下文中引用”是什么？</span></a></h1><p>当我们使用Java时，经常会遇到需要更深入理解语言细节的问题。一个常见的难题是错误消息：“非静态方法...不能从静态上下文中引用。”这个错误对于初学者来说可能看起来很吓人，甚至可能会让经验丰富的程序员感到困惑。</p><p>在本教程中，我们将深入探讨这个错误背后的原因，并探索解决它的方法。</p><h2 id="_2-问题介绍" tabindex="-1"><a class="header-anchor" href="#_2-问题介绍"><span>2. 问题介绍</span></a></h2><p>像往常一样，让我们通过一个例子快速理解问题。假设我们有一个_ToolBox_类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">ToolBox</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> <span class="token function">concat</span><span class="token punctuation">(</span><span class="token class-name">String</span> str1<span class="token punctuation">,</span> <span class="token class-name">String</span> str2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> str1 <span class="token operator">+</span> str2<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">joinTwoStrings</span><span class="token punctuation">(</span><span class="token class-name">String</span> str1<span class="token punctuation">,</span> <span class="token class-name">String</span> str2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">concat</span><span class="token punctuation">(</span>str1<span class="token punctuation">,</span> str2<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// &lt;-- 编译错误</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>_ToolBox_类有一个_concat()<em>方法。我们不希望每个人都调用它，所以我们将其声明为一个_private_方法。此外，我们还有一个静态方法_joinTwoStrings()</em>，它在内部调用_concat()_方法。</p><p>然而，如果我们编译它，就会出现一个编译错误：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>java<span class="token operator">:</span> 非静态方法<span class="token function">concat</span><span class="token punctuation">(</span><span class="token class-name"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span></span>String</span><span class="token punctuation">,</span><span class="token class-name"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span></span>String</span><span class="token punctuation">)</span>不能从静态上下文中引用
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>接下来，让我们理解这个错误消息的含义，看看如何解决它。</p><h2 id="_3-错误的含义是什么" tabindex="-1"><a class="header-anchor" href="#_3-错误的含义是什么"><span>3. 错误的含义是什么？</span></a></h2><p>在我们解决非静态方法问题之前，让我们先理解Java中的静态上下文概念。</p><p>在Java中，<strong>关键字“<em>static</em>”用于声明属于类的元素而不是实例</strong>。静态员在所有类的实例之间共享，并且<strong>可以在不创建类的实例的情况下访问</strong>。</p><p>然而，另一方面，<strong>非静态方法是与类的实例相关联的，不能在不创建对象的情况下调用</strong>。它们可以依赖于对象的特定状态，它们的行为可能会根据实例变量的值而变化。</p><p>“非静态方法...不能从静态上下文中引用”的编译错误发生在尝试<strong>从静态上下文调用非静态方法时</strong>。这个静态上下文可能是静态方法、静态块或总是静态的_main()_方法。</p><p>现在我们理解了问题发生的原因，让我们看看如何修复它。</p><h2 id="_4-解决问题" tabindex="-1"><a class="header-anchor" href="#_4-解决问题"><span>4. 解决问题</span></a></h2><p>我们已经了解到，非静态成员不能在不创建实例的情况下调用。然后，根据要求，我们有几种方法可以解决问题。</p><p>接下来，让我们仔细看看它们。</p><h3 id="_4-1-从静态上下文中调用静态方法" tabindex="-1"><a class="header-anchor" href="#_4-1-从静态上下文中调用静态方法"><span>4.1. 从静态上下文中调用静态方法</span></a></h3><p>第一种解决方案是<strong>将实例方法转换为静态方法</strong>。如果我们完成了这种转换，那么我们从静态上下文调用它就不会有任何问题：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">ToolBox</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">concatStatic</span><span class="token punctuation">(</span><span class="token class-name">String</span> str1<span class="token punctuation">,</span> <span class="token class-name">String</span> str2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> str1 <span class="token operator">+</span> str2<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">joinTwoStrings</span><span class="token punctuation">(</span><span class="token class-name">String</span> str1<span class="token punctuation">,</span> <span class="token class-name">String</span> str2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">concatStatic</span><span class="token punctuation">(</span>str1<span class="token punctuation">,</span> str2<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们在上面的代码中看到的，为了更容易地发现我们所做的更改，我们使用了新的方法名称_concatStatic_。此外，我们通过添加_static_关键字使其成为静态方法。</p><p>现在，如果我们调用静态的_joinTwoStrings()_方法，我们将得到预期的结果：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;ab&quot;</span><span class="token punctuation">,</span> <span class="token class-name">ToolBox</span><span class="token punctuation">.</span><span class="token function">joinTwoStrings</span><span class="token punctuation">(</span><span class="token string">&quot;a&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;b&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_4-2-创建实例并调用实例方法" tabindex="-1"><a class="header-anchor" href="#_4-2-创建实例并调用实例方法"><span>4.2. 创建实例并调用实例方法</span></a></h3><p>有时，需求不允许我们将实例方法更改为静态的。在这种情况下，我们可以重构静态方法，<strong>首先创建一个实例，然后调用实例方法</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">ToolBox</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> <span class="token function">concat</span><span class="token punctuation">(</span><span class="token class-name">String</span> str1<span class="token punctuation">,</span> <span class="token class-name">String</span> str2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> str1 <span class="token operator">+</span> str2<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">creatingInstanceJoinTwoStrings</span><span class="token punctuation">(</span><span class="token class-name">String</span> str1<span class="token punctuation">,</span> <span class="token class-name">String</span> str2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">ToolBox</span> toolBox <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ToolBox</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> toolBox<span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span>str1<span class="token punctuation">,</span> str2<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，如果我们调用静态的_creatingInstanceJoinTwoStrings()_方法，它将正常工作：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;ab&quot;</span><span class="token punctuation">,</span> <span class="token class-name">ToolBox</span><span class="token punctuation">.</span><span class="token function">creatingInstanceJoinTwoStrings</span><span class="token punctuation">(</span><span class="token string">&quot;a&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;b&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>另外，我们可以考虑<strong>这个类中的_creatingInstanceJoinTwoStrings()_方法是否必须是静态的</strong>。如果不是，我们也可以<strong>将静态方法转换为常规的实例方法</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">ToolBox</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> <span class="token function">concat</span><span class="token punctuation">(</span><span class="token class-name">String</span> str1<span class="token punctuation">,</span> <span class="token class-name">String</span> str2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> str1 <span class="token operator">+</span> str2<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token class-name">String</span> <span class="token function">instanceJoinTwoStrings</span><span class="token punctuation">(</span><span class="token class-name">String</span> str1<span class="token punctuation">,</span> <span class="token class-name">String</span> str2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">concat</span><span class="token punctuation">(</span>str1<span class="token punctuation">,</span> str2<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过这个修复，_instanceJoinTwoStrings()_方法不再静态。因此，它可以直接调用私有的_concat()_实例方法。</p><p>当然，当我们使用_instanceJoinTwoStrings()_时，我们必须首先创建一个_ToolBox_对象：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">ToolBox</span> toolBox <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ToolBox</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;ab&quot;</span><span class="token punctuation">,</span> toolBox<span class="token punctuation">.</span><span class="token function">instanceJoinTwoStrings</span><span class="token punctuation">(</span><span class="token string">&quot;a&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;b&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-实例能调用静态方法吗" tabindex="-1"><a class="header-anchor" href="#_5-实例能调用静态方法吗"><span>5. 实例能调用静态方法吗？</span></a></h2><p>我们已经了解到我们不能从静态上下文中引用非静态成员。一些人可能会问，<strong>我们能在实例方法中调用静态方法吗</strong>？</p><p>接下来，让我们进行测试：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">ToolBox</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">concatStatic</span><span class="token punctuation">(</span><span class="token class-name">String</span> str1<span class="token punctuation">,</span> <span class="token class-name">String</span> str2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> str1 <span class="token operator">+</span> str2<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token class-name">String</span> <span class="token function">instanceCallStaticJoinTwoStrings</span><span class="token punctuation">(</span><span class="token class-name">String</span> str1<span class="token punctuation">,</span> <span class="token class-name">String</span> str2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">concatStatic</span><span class="token punctuation">(</span>str1<span class="token punctuation">,</span> str2<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们在上面的代码中看到的，实例方法_instanceCallStaticJoinTwoStrings()<em>调用了私有静态方法_concatStatic()</em>。</p><p>代码可以编译。进一步地，如果我们测试它，它也能正常工作：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">ToolBox</span> toolBox <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ToolBox</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;ab&quot;</span><span class="token punctuation">,</span> toolBox<span class="token punctuation">.</span><span class="token function">instanceCallStaticJoinTwoStrings</span><span class="token punctuation">(</span><span class="token string">&quot;a&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;b&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>所以，问题的答案是肯定的。</p><p>在Java中，<strong>从实例方法中调用静态方法是允许的</strong>。这是因为静态成员不绑定到特定的实例。相反，它们与类本身关联，并且可以使用类名来调用。在我们的代码中，我们调用_concatStatic(str1, str2)_没有使用类名“<em>ToolBox.concatStatic(str1, str2)</em>”，因为我们已经在_ToolBox_类中了。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们探讨了编译错误“非静态方法不能从静态上下文中引用”，深入研究了其原因，并检查了各种解决和修复此问题的方法。</p><p>像往常一样，示例的完整源代码可以在GitHub上找到。</p>`,48),o=[p];function c(l,i){return s(),a("div",null,o)}const d=n(e,[["render",c],["__file","2024-06-24-What Is the Error   Non static method cannot be referenced from a static context  .html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-06-24/2024-06-24-What%20Is%20the%20Error%20%20%20Non%20static%20method%20cannot%20be%20referenced%20from%20a%20static%20context%20%20.html","title":"Java中的错误：“非静态方法不能从静态上下文中引用”是什么？","lang":"zh-CN","frontmatter":{"date":"2024-06-24T00:00:00.000Z","category":["Java","Programming"],"tag":["Java","Static Context","Non-Static Method"],"head":[["meta",{"name":"keywords","content":"Java, Static Context, Non-Static Method, Compilation Error"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-24/2024-06-24-What%20Is%20the%20Error%20%20%20Non%20static%20method%20cannot%20be%20referenced%20from%20a%20static%20context%20%20.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中的错误：“非静态方法不能从静态上下文中引用”是什么？"}],["meta",{"property":"og:description","content":"Java中的错误：“非静态方法不能从静态上下文中引用”是什么？ 当我们使用Java时，经常会遇到需要更深入理解语言细节的问题。一个常见的难题是错误消息：“非静态方法...不能从静态上下文中引用。”这个错误对于初学者来说可能看起来很吓人，甚至可能会让经验丰富的程序员感到困惑。 在本教程中，我们将深入探讨这个错误背后的原因，并探索解决它的方法。 2. 问题..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-24T11:25:27.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Static Context"}],["meta",{"property":"article:tag","content":"Non-Static Method"}],["meta",{"property":"article:published_time","content":"2024-06-24T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-24T11:25:27.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中的错误：“非静态方法不能从静态上下文中引用”是什么？\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-24T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-24T11:25:27.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中的错误：“非静态方法不能从静态上下文中引用”是什么？ 当我们使用Java时，经常会遇到需要更深入理解语言细节的问题。一个常见的难题是错误消息：“非静态方法...不能从静态上下文中引用。”这个错误对于初学者来说可能看起来很吓人，甚至可能会让经验丰富的程序员感到困惑。 在本教程中，我们将深入探讨这个错误背后的原因，并探索解决它的方法。 2. 问题..."},"headers":[{"level":2,"title":"2. 问题介绍","slug":"_2-问题介绍","link":"#_2-问题介绍","children":[]},{"level":2,"title":"3. 错误的含义是什么？","slug":"_3-错误的含义是什么","link":"#_3-错误的含义是什么","children":[]},{"level":2,"title":"4. 解决问题","slug":"_4-解决问题","link":"#_4-解决问题","children":[{"level":3,"title":"4.1. 从静态上下文中调用静态方法","slug":"_4-1-从静态上下文中调用静态方法","link":"#_4-1-从静态上下文中调用静态方法","children":[]},{"level":3,"title":"4.2. 创建实例并调用实例方法","slug":"_4-2-创建实例并调用实例方法","link":"#_4-2-创建实例并调用实例方法","children":[]}]},{"level":2,"title":"5. 实例能调用静态方法吗？","slug":"_5-实例能调用静态方法吗","link":"#_5-实例能调用静态方法吗","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1719228327000,"updatedTime":1719228327000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.84,"words":1452},"filePathRelative":"posts/baeldung/2024-06-24/2024-06-24-What Is the Error   Non static method cannot be referenced from a static context  .md","localizedDate":"2024年6月24日","excerpt":"<hr>\\n<h1>Java中的错误：“非静态方法不能从静态上下文中引用”是什么？</h1>\\n<p>当我们使用Java时，经常会遇到需要更深入理解语言细节的问题。一个常见的难题是错误消息：“非静态方法...不能从静态上下文中引用。”这个错误对于初学者来说可能看起来很吓人，甚至可能会让经验丰富的程序员感到困惑。</p>\\n<p>在本教程中，我们将深入探讨这个错误背后的原因，并探索解决它的方法。</p>\\n<h2>2. 问题介绍</h2>\\n<p>像往常一样，让我们通过一个例子快速理解问题。假设我们有一个_ToolBox_类：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">ToolBox</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">private</span> <span class=\\"token class-name\\">String</span> <span class=\\"token function\\">concat</span><span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">String</span> str1<span class=\\"token punctuation\\">,</span> <span class=\\"token class-name\\">String</span> str2<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token keyword\\">return</span> str1 <span class=\\"token operator\\">+</span> str2<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span>\\n\\n    <span class=\\"token keyword\\">static</span> <span class=\\"token class-name\\">String</span> <span class=\\"token function\\">joinTwoStrings</span><span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">String</span> str1<span class=\\"token punctuation\\">,</span> <span class=\\"token class-name\\">String</span> str2<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token keyword\\">return</span> <span class=\\"token function\\">concat</span><span class=\\"token punctuation\\">(</span>str1<span class=\\"token punctuation\\">,</span> str2<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span> <span class=\\"token comment\\">// &lt;-- 编译错误</span>\\n    <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{d as comp,k as data};
