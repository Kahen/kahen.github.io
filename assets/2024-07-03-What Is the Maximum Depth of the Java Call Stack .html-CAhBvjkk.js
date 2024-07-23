import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as e,a as s}from"./app-on0L14Tx.js";const t={},p=s(`<h1 id="java调用栈的最大深度是多少" tabindex="-1"><a class="header-anchor" href="#java调用栈的最大深度是多少"><span>Java调用栈的最大深度是多少？</span></a></h1><p>调用栈是Java中管理方法执行和变量作用域的关键数据结构。栈的深度，或者说它可以容纳的活动方法调用的数量，是处理递归函数或深层调用链时的一个重要考虑因素。</p><p>在本教程中，我们将探讨确定Java调用栈最大深度的技术。</p><h2 id="java调用栈的理解" tabindex="-1"><a class="header-anchor" href="#java调用栈的理解"><span>Java调用栈的理解</span></a></h2><p>Java调用栈遵循后进先出（LIFO）结构。当一个方法被调用时，一个新的栈帧会被推到栈顶，包含参数、局部变量和返回地址等信息。一旦方法完成执行，它的栈就会被弹出。</p><p>每个线程分配的总栈大小决定了其调用栈可以容纳的数据量。默认的栈大小因JVM实现而异，但对于标准JVM来说，通常大约是1MB。</p><p>我们可以使用<code>-XX:+PrintFlagsFinal</code>参数检查我们的JVM的默认栈大小：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">java</span> <span class="token parameter variable">-XX:+PrintFlagsFinal</span> <span class="token parameter variable">-version</span> <span class="token operator">|</span> <span class="token function">grep</span> ThreadStackSize
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>使用1MB的栈，我们可以在达到最大深度之前进行大约10000到20000次方法调用，假设每个栈帧使用大约100字节。关键是栈大小限制了调用栈可以增长的深度。</p><p>这里有一个故意溢出调用栈以确定其最大深度的示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RecursiveCallStackOverflow</span> <span class="token punctuation">{</span>
    <span class="token keyword">static</span> <span class="token keyword">int</span> depth <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">recursiveStackOverflow</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        depth<span class="token operator">++</span><span class="token punctuation">;</span>
        <span class="token function">recursiveStackOverflow</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token function">recursiveStackOverflow</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">StackOverflowError</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Maximum depth of the call stack is &quot;</span> <span class="token operator">+</span> depth<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>recursiveStackOverflow()</code>方法简单地递增一个计数器并递归地调用自己，直到栈溢出。通过捕获结果错误，我们可以打印出达到的深度。</p><p>当我们在标准JVM上测试时，这里是输出结果：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Maximum depth of the call stack is 21792
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>让我们使用<code>-XX:+PrintFlagsFinal</code>参数检查我们JVM的默认栈大小：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">java</span> <span class="token parameter variable">-XX:+PrintFlagsFinal</span> <span class="token parameter variable">-version</span> <span class="token operator">|</span> <span class="token function">grep</span> ThreadStackSize

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这里是我们JVM的默认线程栈大小：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>intx ThreadStackSize = 1024
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>默认情况下，JVM为线程栈分配了1MB的大小。</p><p>我们可以通过使用<code>-Xss</code> JVM参数为线程分配更多的栈空间来增加最大深度：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">java</span> <span class="token parameter variable">-Xss2m</span> RecursiveCallStackOverflow
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>使用2MB的线程栈大小，这里是输出结果：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Maximum depth of the call stack is 49522
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>栈大小翻倍允许深度成比例地增加。</p><h2 id="结论" tabindex="-1"><a class="header-anchor" href="#结论"><span>结论</span></a></h2><p>在本文中，我们学习了如何通过递归调用方法来获取栈调用的最大深度。此外，我们还看到了JVM有一个默认的栈大小。通过分配更多的内存空间，可以增加栈调用的深度。</p><p>如常，示例的完整源代码可在GitHub上获得。</p>`,27),i=[p];function c(l,o){return e(),n("div",null,i)}const u=a(t,[["render",c],["__file","2024-07-03-What Is the Maximum Depth of the Java Call Stack .html.vue"]]),v=JSON.parse('{"path":"/posts/baeldung/2024-07-03/2024-07-03-What%20Is%20the%20Maximum%20Depth%20of%20the%20Java%20Call%20Stack%20.html","title":"Java调用栈的最大深度是多少？","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","JVM"],"tag":["Call Stack","Stack Overflow"],"head":[["meta",{"name":"keywords","content":"Java, JVM, Call Stack, Stack Overflow, Method Execution, Variable Scope, Recursive Functions, Deep Call Chains"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-03/2024-07-03-What%20Is%20the%20Maximum%20Depth%20of%20the%20Java%20Call%20Stack%20.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java调用栈的最大深度是多少？"}],["meta",{"property":"og:description","content":"Java调用栈的最大深度是多少？ 调用栈是Java中管理方法执行和变量作用域的关键数据结构。栈的深度，或者说它可以容纳的活动方法调用的数量，是处理递归函数或深层调用链时的一个重要考虑因素。 在本教程中，我们将探讨确定Java调用栈最大深度的技术。 Java调用栈的理解 Java调用栈遵循后进先出（LIFO）结构。当一个方法被调用时，一个新的栈帧会被推到..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-03T01:45:16.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Call Stack"}],["meta",{"property":"article:tag","content":"Stack Overflow"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-03T01:45:16.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java调用栈的最大深度是多少？\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-03T01:45:16.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java调用栈的最大深度是多少？ 调用栈是Java中管理方法执行和变量作用域的关键数据结构。栈的深度，或者说它可以容纳的活动方法调用的数量，是处理递归函数或深层调用链时的一个重要考虑因素。 在本教程中，我们将探讨确定Java调用栈最大深度的技术。 Java调用栈的理解 Java调用栈遵循后进先出（LIFO）结构。当一个方法被调用时，一个新的栈帧会被推到..."},"headers":[{"level":2,"title":"Java调用栈的理解","slug":"java调用栈的理解","link":"#java调用栈的理解","children":[]},{"level":2,"title":"结论","slug":"结论","link":"#结论","children":[]}],"git":{"createdTime":1719971116000,"updatedTime":1719971116000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.34,"words":703},"filePathRelative":"posts/baeldung/2024-07-03/2024-07-03-What Is the Maximum Depth of the Java Call Stack .md","localizedDate":"2022年4月1日","excerpt":"\\n<p>调用栈是Java中管理方法执行和变量作用域的关键数据结构。栈的深度，或者说它可以容纳的活动方法调用的数量，是处理递归函数或深层调用链时的一个重要考虑因素。</p>\\n<p>在本教程中，我们将探讨确定Java调用栈最大深度的技术。</p>\\n<h2>Java调用栈的理解</h2>\\n<p>Java调用栈遵循后进先出（LIFO）结构。当一个方法被调用时，一个新的栈帧会被推到栈顶，包含参数、局部变量和返回地址等信息。一旦方法完成执行，它的栈就会被弹出。</p>\\n<p>每个线程分配的总栈大小决定了其调用栈可以容纳的数据量。默认的栈大小因JVM实现而异，但对于标准JVM来说，通常大约是1MB。</p>","autoDesc":true}');export{u as comp,v as data};
