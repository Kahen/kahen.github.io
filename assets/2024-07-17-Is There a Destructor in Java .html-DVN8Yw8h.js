import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as e}from"./app-BMOUrRO4.js";const t={},p=e(`<hr><h1 id="java中有析构函数吗" tabindex="-1"><a class="header-anchor" href="#java中有析构函数吗"><span>Java中有析构函数吗？</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在这篇简短的教程中，我们将探讨在Java中销毁对象的可能性。</p><p>每次我们创建一个对象时，Java会自动在堆上分配内存。同样，当一个对象不再需要时，内存也会自动被释放。</p><p>在像C这样的语言中，当我们在内存中完成使用一个对象时，我们必须手动释放它。不幸的是，<strong>Java不支持手动内存释放</strong>。此外，Java编程语言的一个特性是它自己通过一种称为垃圾回收的技术来处理对象的销毁。</p><h2 id="_3-垃圾回收" tabindex="-1"><a class="header-anchor" href="#_3-垃圾回收"><span>3. 垃圾回收</span></a></h2><p>垃圾回收从堆内存中移除未使用的对象。它有助于防止内存泄漏。简单来说，当没有更多的引用指向特定对象，并且对象不再可访问时，垃圾回收器会将此对象标记为不可达并回收其空间。</p><p>如果不正确处理垃圾回收，可能会导致性能问题，最终导致应用程序耗尽内存。</p><p>当对象达到不再在程序中可访问的状态时，它可以被垃圾回收。一个对象不再可访问时，会发生以下两种情况之一：</p><ul><li>对象没有任何引用指向它</li><li>对象的所有引用都已经超出作用域</li></ul><p>Java包括_System.gc()_方法来帮助支持垃圾回收。通过调用此方法，我们可以建议JVM运行垃圾回收器。然而，我们不能保证JVM实际上会调用它。JVM可以自由地忽略请求。</p><h2 id="_4-终结器" tabindex="-1"><a class="header-anchor" href="#_4-终结器"><span>4. 终结器</span></a></h2><p>Object类提供了_finalize()_方法。在垃圾回收器从内存中移除对象之前，它会调用_finalize()_方法。该方法可以运行零次或一次。然而，它不能为同一个对象运行两次。</p><p>在_Object_类中定义的_finalize()_方法不执行任何特殊操作。</p><p><strong>终结器的主要目标是在对象从内存中移除之前释放对象使用的资源</strong>。例如，我们可以重写该方法来关闭数据库连接或其他资源。</p><p>让我们创建一个包含_BufferedReader_实例变量的类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Resource</span> <span class="token punctuation">{</span>
    <span class="token keyword">final</span> <span class="token class-name">BufferedReader</span> reader<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">Resource</span><span class="token punctuation">(</span><span class="token class-name">String</span> filename<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">FileNotFoundException</span> <span class="token punctuation">{</span>
        reader <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BufferedReader</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">FileReader</span><span class="token punctuation">(</span>filename<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">long</span> <span class="token function">getLineNumber</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> reader<span class="token punctuation">.</span><span class="token function">lines</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">count</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在我们的示例中，我们没有关闭我们的资源。我们可以在_finalize()_方法中关闭它们：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Override</span>
<span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">finalize</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        reader<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IOException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// ...</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当JVM调用_finalize()_方法时，_BufferedReader_资源将被释放。_finalize()_方法抛出的异常将停止对象的最终化。</p><p><strong>然而，从Java 9开始，_finalize()_方法已经被弃用</strong>。使用_finalize()_方法可能会令人困惑且难以正确使用。</p><p>如果我们想释放对象持有的资源，我们应该考虑实现_AutoCloseable_接口。类如_Cleaner_和_PhantomReference_提供了一种更灵活的方式来管理对象变得不可达时的资源。</p><h3 id="_4-1-实现-autocloseable" tabindex="-1"><a class="header-anchor" href="#_4-1-实现-autocloseable"><span>4.1. 实现_AutoCloseable_</span></a></h3><p>_AutoCloseable_接口提供了_close()_方法，该方法将在退出_try-with-resources_块时自动执行。在这个方法中，我们可以关闭对象使用的资源。</p><p>让我们修改我们的示例类以实现_AutoCloseable_接口：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Resource</span> <span class="token keyword">implements</span> <span class="token class-name">AutoCloseable</span> <span class="token punctuation">{</span>

    <span class="token keyword">final</span> <span class="token class-name">BufferedReader</span> reader<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">Resource</span><span class="token punctuation">(</span><span class="token class-name">String</span> filename<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">FileNotFoundException</span> <span class="token punctuation">{</span>
        reader <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BufferedReader</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">FileReader</span><span class="token punctuation">(</span>filename<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">long</span> <span class="token function">getLineNumber</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> reader<span class="token punctuation">.</span><span class="token function">lines</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">count</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        reader<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以使用_close()_方法来关闭我们的资源，而不是使用_finalize()_方法。</p><h3 id="_4-2-cleaner-类" tabindex="-1"><a class="header-anchor" href="#_4-2-cleaner-类"><span>4.2. _Cleaner_类</span></a></h3><p>如果我们想在对象变得幻影可达时执行特定操作，我们可以使用_Cleaner_类。换句话说，当对象被最终化并且其内存准备被释放时。</p><p>现在，让我们看看如何使用_Cleaner_类。首先，让我们定义_Cleaner_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Cleaner</span> cleaner <span class="token operator">=</span> <span class="token class-name">Cleaner</span><span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>接下来，我们将创建一个包含清理器引用的类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Order</span> <span class="token keyword">implements</span> <span class="token class-name">AutoCloseable</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">Cleaner</span> cleaner<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">Order</span><span class="token punctuation">(</span><span class="token class-name">Cleaner</span> cleaner<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>cleaner <span class="token operator">=</span> cleaner<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其次，我们将在_Order_类中定义一个实现_Runnable_的静态内部类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">CleaningAction</span> <span class="token keyword">implements</span> <span class="token class-name">Runnable</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token keyword">int</span> id<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">CleaningAction</span><span class="token punctuation">(</span><span class="token keyword">int</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>id <span class="token operator">=</span> id<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;Object with id %s is garbage collected. %n&quot;</span><span class="token punctuation">,</span> id<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们的内部类的实例将代表清理操作。我们应该注册每个清理操作，以便它们在对象变得幻影可达后运行。</p><p>我们应该考虑不使用lambda表达式作为清理操作。通过使用lambda，我们可能会无意中捕获对象引用，阻止对象变得幻影可达。使用静态嵌套类，如上所示，将避免保留对象引用。</p><p>让我们在_Order_类中添加_Cleanable_实例变量：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token class-name">Cleaner<span class="token punctuation">.</span>Cleanable</span> cleanable<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>_Cleanable_实例表示包含清理操作的清理对象。</p><p>接下来，让我们创建一个方法来注册清理操作：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">register</span><span class="token punctuation">(</span><span class="token class-name">Product</span> product<span class="token punctuation">,</span> <span class="token keyword">int</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>cleanable <span class="token operator">=</span> cleaner<span class="token punctuation">.</span><span class="token function">register</span><span class="token punctuation">(</span>product<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">CleaningAction</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，让我们实现_close()_方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    cleanable<span class="token punctuation">.</span><span class="token function">clean</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>_clean()_方法将注销可清理对象并调用注册的清理操作。此方法最多只会被调用一次，无论clean方法被调用多少次。</p><p>当我们在_try-with-resources_块中使用我们的_CleaningExample_实例时，_close()_方法将调用清理操作：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">final</span> <span class="token class-name">Cleaner</span> cleaner <span class="token operator">=</span> <span class="token class-name">Cleaner</span><span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">Order</span> order <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Order</span><span class="token punctuation">(</span>cleaner<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        order<span class="token punctuation">.</span><span class="token function">register</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Product</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>err<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Error: &quot;</span> <span class="token operator">+</span> e<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在其他情况下，清理器将在实例变得幻影可达时调用_clean()_方法。</p><p>此外，清理器在_System.exit()_期间的行为是实现特定的。Java不保证清理操作是否会被调用。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在这篇简短的教程中，我们探讨了Java中对象销毁的可能性。总结一下，Java不支持手动对象销毁。然而，我们可以使用_finalize()_或_Cleaner_来释放对象持有的资源。如往常一样，示例的源代码可以在GitHub上找到。</p>`,52),c=[p];function l(o,i){return s(),a("div",null,c)}const d=n(t,[["render",l],["__file","2024-07-17-Is There a Destructor in Java .html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-17/2024-07-17-Is%20There%20a%20Destructor%20in%20Java%20.html","title":"Java中有析构函数吗？","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Programming"],"tag":["Java","Destructor","Garbage Collection","Finalizer","AutoCloseable","Cleaner"],"head":[["meta",{"name":"keywords","content":"Java, Destructor, Garbage Collection, Finalizer, AutoCloseable, Cleaner"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-17/2024-07-17-Is%20There%20a%20Destructor%20in%20Java%20.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中有析构函数吗？"}],["meta",{"property":"og:description","content":"Java中有析构函数吗？ 1. 概述 在这篇简短的教程中，我们将探讨在Java中销毁对象的可能性。 每次我们创建一个对象时，Java会自动在堆上分配内存。同样，当一个对象不再需要时，内存也会自动被释放。 在像C这样的语言中，当我们在内存中完成使用一个对象时，我们必须手动释放它。不幸的是，Java不支持手动内存释放。此外，Java编程语言的一个特性是它自..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-17T20:31:12.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Destructor"}],["meta",{"property":"article:tag","content":"Garbage Collection"}],["meta",{"property":"article:tag","content":"Finalizer"}],["meta",{"property":"article:tag","content":"AutoCloseable"}],["meta",{"property":"article:tag","content":"Cleaner"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-17T20:31:12.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中有析构函数吗？\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-17T20:31:12.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中有析构函数吗？ 1. 概述 在这篇简短的教程中，我们将探讨在Java中销毁对象的可能性。 每次我们创建一个对象时，Java会自动在堆上分配内存。同样，当一个对象不再需要时，内存也会自动被释放。 在像C这样的语言中，当我们在内存中完成使用一个对象时，我们必须手动释放它。不幸的是，Java不支持手动内存释放。此外，Java编程语言的一个特性是它自..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"3. 垃圾回收","slug":"_3-垃圾回收","link":"#_3-垃圾回收","children":[]},{"level":2,"title":"4. 终结器","slug":"_4-终结器","link":"#_4-终结器","children":[{"level":3,"title":"4.1. 实现_AutoCloseable_","slug":"_4-1-实现-autocloseable","link":"#_4-1-实现-autocloseable","children":[]},{"level":3,"title":"4.2. _Cleaner_类","slug":"_4-2-cleaner-类","link":"#_4-2-cleaner-类","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1721248272000,"updatedTime":1721248272000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.05,"words":1516},"filePathRelative":"posts/baeldung/2024-07-17/2024-07-17-Is There a Destructor in Java .md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>Java中有析构函数吗？</h1>\\n<h2>1. 概述</h2>\\n<p>在这篇简短的教程中，我们将探讨在Java中销毁对象的可能性。</p>\\n<p>每次我们创建一个对象时，Java会自动在堆上分配内存。同样，当一个对象不再需要时，内存也会自动被释放。</p>\\n<p>在像C这样的语言中，当我们在内存中完成使用一个对象时，我们必须手动释放它。不幸的是，<strong>Java不支持手动内存释放</strong>。此外，Java编程语言的一个特性是它自己通过一种称为垃圾回收的技术来处理对象的销毁。</p>\\n<h2>3. 垃圾回收</h2>\\n<p>垃圾回收从堆内存中移除未使用的对象。它有助于防止内存泄漏。简单来说，当没有更多的引用指向特定对象，并且对象不再可访问时，垃圾回收器会将此对象标记为不可达并回收其空间。</p>","autoDesc":true}');export{d as comp,k as data};
