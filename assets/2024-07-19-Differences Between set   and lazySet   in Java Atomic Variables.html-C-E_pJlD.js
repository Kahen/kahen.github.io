import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as e}from"./app-CBerKIce.js";const t={},p=e(`<hr><h1 id="java-中原子变量的-set-和-lazyset-方法的区别" tabindex="-1"><a class="header-anchor" href="#java-中原子变量的-set-和-lazyset-方法的区别"><span>Java 中原子变量的 set() 和 lazySet() 方法的区别</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在本教程中，我们将探讨 Java 中如 AtomicInteger 和 AtomicReference 等原子类的方法 <em>set()</em> 和 <em>lazySet()</em> 之间的区别。</p><h2 id="_2-原子变量——快速回顾" tabindex="-1"><a class="header-anchor" href="#_2-原子变量——快速回顾"><span>2. 原子变量——快速回顾</span></a></h2><p><strong>Java 中的原子变量允许我们轻松地在类引用或字段上执行线程安全的操作，而无需添加诸如监视器或互斥锁等并发原语。</strong></p><p>它们定义在 <em>java.util.concurrent.atomic</em> 包下，尽管它们的 API 根据原子类型不同而有所不同，但大多数都支持 <em>set()</em> 和 <em>lazySet()</em> 方法。</p><p>为了简化事情，我们将在本文中使用 <em>AtomicReference</em> 和 <em>AtomicInteger</em>，但相同的原理适用于其他原子类型。</p><h2 id="_3-set-方法" tabindex="-1"><a class="header-anchor" href="#_3-set-方法"><span>3. <em>set()</em> 方法</span></a></h2><p><strong><em>set()</em> 方法等同于写入一个 <em>volatile</em> 字段。</strong></p><p>调用 <em>set()</em> 后，当我们从不同线程使用 <em>get()</em> 方法访问该字段时，更改会立即可见。这意味着该值已从 CPU 缓存刷新到所有 CPU 核心共享的内存层。</p><p>为了展示上述功能，让我们创建一个最小的生产者-消费者控制台应用程序：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Application</span> <span class="token punctuation">{</span>

    <span class="token class-name">AtomicInteger</span> atomic <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">AtomicInteger</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Application</span> app <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Application</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i \`<span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                app<span class="token punctuation">.</span>atomic<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Set: &quot;</span> <span class="token operator">+</span> i<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span>\` <span class="token punctuation">{</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">synchronized</span> <span class="token punctuation">(</span>app<span class="token punctuation">.</span>atomic<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token keyword">int</span> counter <span class="token operator">=</span> app<span class="token punctuation">.</span>atomic<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Get: &quot;</span> <span class="token operator">+</span> counter<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在控制台中，我们应该看到一系列“Set”和“Get”消息：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Set: 3
Set: 4
Get: 4
Get: 5
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>这表明缓存一致性的事实是“Get”语句中的值始终等于或大于它们上面的“Set”语句中的值。</strong></p><p>这种行为虽然非常有用，但会带来性能损失。如果我们不需要缓存一致性，能够避免这种情况就好了。</p><h2 id="_4-lazyset-方法" tabindex="-1"><a class="header-anchor" href="#_4-lazyset-方法"><span>4. <em>lazySet()</em> 方法</span></a></h2><p>_ <em>lazySet()</em> 方法与 <em>set()</em> 方法相同，但没有缓存刷新。</p><p><strong>换句话说，我们的更改最终只会对其他线程可见。</strong> <strong>这意味着从不同线程调用更新后的 <em>AtomicReference</em> 的 <em>get()</em> 可能会给我们旧的值。</strong></p><p>让我们通过更改我们之前控制台应用程序中的第一个线程的 <em>Runnable</em> 来看看这在实际操作中的表现：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    app<span class="token punctuation">.</span>atomic<span class="token punctuation">.</span><span class="token function">lazySet</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Set: &quot;</span> <span class="token operator">+</span> i<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>新的“Set”和“Get”消息可能不总是递增的：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Set: 4
Set: 5
Get: 4
Get: 5
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于线程的性质，我们可能需要多次运行应用程序才能触发这种行为。即使生产者线程已将 <em>AtomicInteger</em> 设置为 5，消费者线程首先检索到值 4 意味着当使用 <em>lazySet()</em> 时，系统最终是一致的。</p><p><strong>用更技术性的术语来说，我们说 <em>lazySet()</em> 方法不作为代码中的 happens-before 边缘，与其 <em>set()</em> 对应物相反。</strong></p><h2 id="_5-何时使用-lazyset" tabindex="-1"><a class="header-anchor" href="#_5-何时使用-lazyset"><span>5. 何时使用 <em>lazySet()</em></span></a></h2><p>由于其与 <em>set()</em> 的差异微妙，我们并不清楚何时应该使用 <em>lazySet()</em>。我们需要仔细分析问题，不仅要确保我们能够获得性能提升，还要确保在多线程环境中的正确性。</p><p><strong>我们可以使用它的一种方式是在我们不再需要它时，用 <em>null</em> 替换对象引用。</strong> 这样，我们表明该对象有资格进行垃圾回收，而不会产生任何性能损失。我们假设其他线程可以继续使用过时的值，直到它们看到 <em>AtomicReference</em> 是 <em>null</em>。</p><p>通常，<strong>当我们想要对原子变量进行更改，并且我们知道更改不需要立即对其他线程可见时，我们应该使用 <em>lazySet()</em>。</strong></p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们查看了原子类中 <em>set()</em> 和 <em>lazySet()</em> 方法的区别。我们还学习了何时使用哪种方法。</p><p>如往常一样，示例的源代码可以在 GitHub 上找到。</p>`,33),o=[p];function c(l,i){return s(),a("div",null,o)}const m=n(t,[["render",c],["__file","2024-07-19-Differences Between set   and lazySet   in Java Atomic Variables.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-19/2024-07-19-Differences%20Between%20set%20%20%20and%20lazySet%20%20%20in%20Java%20Atomic%20Variables.html","title":"Java 中原子变量的 set() 和 lazySet() 方法的区别","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Concurrency"],"tag":["Java","Atomic Variables","set()","lazySet()"],"head":[["meta",{"name":"keywords","content":"Java, Atomic Variables, set(), lazySet()"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-19/2024-07-19-Differences%20Between%20set%20%20%20and%20lazySet%20%20%20in%20Java%20Atomic%20Variables.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java 中原子变量的 set() 和 lazySet() 方法的区别"}],["meta",{"property":"og:description","content":"Java 中原子变量的 set() 和 lazySet() 方法的区别 1. 概述 在本教程中，我们将探讨 Java 中如 AtomicInteger 和 AtomicReference 等原子类的方法 set() 和 lazySet() 之间的区别。 2. 原子变量——快速回顾 Java 中的原子变量允许我们轻松地在类引用或字段上执行线程安全的操作，..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-19T03:38:26.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Atomic Variables"}],["meta",{"property":"article:tag","content":"set()"}],["meta",{"property":"article:tag","content":"lazySet()"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-19T03:38:26.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java 中原子变量的 set() 和 lazySet() 方法的区别\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-19T03:38:26.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java 中原子变量的 set() 和 lazySet() 方法的区别 1. 概述 在本教程中，我们将探讨 Java 中如 AtomicInteger 和 AtomicReference 等原子类的方法 set() 和 lazySet() 之间的区别。 2. 原子变量——快速回顾 Java 中的原子变量允许我们轻松地在类引用或字段上执行线程安全的操作，..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 原子变量——快速回顾","slug":"_2-原子变量——快速回顾","link":"#_2-原子变量——快速回顾","children":[]},{"level":2,"title":"3. set() 方法","slug":"_3-set-方法","link":"#_3-set-方法","children":[]},{"level":2,"title":"4. lazySet() 方法","slug":"_4-lazyset-方法","link":"#_4-lazyset-方法","children":[]},{"level":2,"title":"5. 何时使用 lazySet()","slug":"_5-何时使用-lazyset","link":"#_5-何时使用-lazyset","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1721360306000,"updatedTime":1721360306000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.31,"words":994},"filePathRelative":"posts/baeldung/2024-07-19/2024-07-19-Differences Between set   and lazySet   in Java Atomic Variables.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>Java 中原子变量的 set() 和 lazySet() 方法的区别</h1>\\n<h2>1. 概述</h2>\\n<p>在本教程中，我们将探讨 Java 中如 AtomicInteger 和 AtomicReference 等原子类的方法 <em>set()</em> 和 <em>lazySet()</em> 之间的区别。</p>\\n<h2>2. 原子变量——快速回顾</h2>\\n<p><strong>Java 中的原子变量允许我们轻松地在类引用或字段上执行线程安全的操作，而无需添加诸如监视器或互斥锁等并发原语。</strong></p>\\n<p>它们定义在 <em>java.util.concurrent.atomic</em> 包下，尽管它们的 API 根据原子类型不同而有所不同，但大多数都支持 <em>set()</em> 和 <em>lazySet()</em> 方法。</p>","autoDesc":true}');export{m as comp,d as data};
