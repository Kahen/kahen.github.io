import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-CLcIWzo_.js";const e={},p=t(`<h1 id="在java中不使用main-方法在控制台打印消息" tabindex="-1"><a class="header-anchor" href="#在java中不使用main-方法在控制台打印消息"><span>在Java中不使用main()方法在控制台打印消息</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>Java程序的执行始于_main()_方法。然而，在某些场景中，我们可能希望在不使用_main()_方法的情况下显示消息。</p><p><strong>在本教程中，我们将探讨完成此任务的一些方法。</strong></p><h2 id="_2-使用静态代码块" tabindex="-1"><a class="header-anchor" href="#_2-使用静态代码块"><span>2. 使用静态代码块</span></a></h2><p>静态代码块在类被加载到内存中时执行，这使得在不使用_main()_方法的情况下显示消息成为可能。</p><p>让我们看一个例子：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token keyword">class</span> <span class="token class-name">PrintMessageWithoutMainMethod</span> <span class="token punctuation">{</span>
    <span class="token keyword">static</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Hello World!!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">exit</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这种情况下，无论_main()_方法是否为空或不存在，消息“Hello World!!”都会在类加载期间出现。此外，_System.exit(0)_方法会立即结束程序。</p><h2 id="_3-使用内部类" tabindex="-1"><a class="header-anchor" href="#_3-使用内部类"><span>3. 使用内部类</span></a></h2><p>我们也可以不使用main()方法，使用内部类来打印消息。让我们看看如何使用这种方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token keyword">class</span> <span class="token class-name">PrintMessageWithoutMainMethod</span> <span class="token punctuation">{</span>
    <span class="token keyword">static</span> <span class="token punctuation">{</span>
        <span class="token class-name">NestedClass</span><span class="token punctuation">.</span><span class="token function">printMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">NestedClass</span> <span class="token punctuation">{</span>
        <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">printMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Message from nested class&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这种情况下，外部类中的静态代码块调用了嵌套类中的静态方法，并输出了一条消息。</p><h2 id="_4-在类初始化期间执行代码" tabindex="-1"><a class="header-anchor" href="#_4-在类初始化期间执行代码"><span>4. 在类初始化期间执行代码</span></a></h2><p>在某些情况下，需要在类初始化期间执行某些方法。<strong>请注意，这种方法在配置或执行只需要执行一次的初始化任务时非常有用。</strong></p><p>给定代码显示了在加载类时调用名为_getStatus()_的方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token keyword">class</span> <span class="token class-name">PrintMessageWithoutMainMethod</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">int</span> <span class="token constant">STATUS</span> <span class="token operator">=</span> <span class="token function">getStatus</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">getStatus</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Hello World!!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">exit</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这种情况下，我们在类加载过程中调用_getStatus()_方法，并在控制台打印“Hello World!!”。</p><p><strong>我们应该小心使用这种方法，因为它会强制终止Java虚拟机(JVM)的执行。因此，如果需要干净地关闭，请寻找替代方案。</strong></p><h2 id="_5-使用junit测试" tabindex="-1"><a class="header-anchor" href="#_5-使用junit测试"><span>5. 使用JUnit测试</span></a></h2><p>除了上述方法，我们还可以使用JUnit测试来在控制台打印我们的消息，如下所示：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">PrintMessageWithoutMainUnitTest</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenMessage_whenUsingJunitTest_thenPrintMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Hello World!!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这种情况下，我们创建了一个单元测试作为测试方法，它将“Hello World!!”打印到控制台。这不是_main()_方法的替代品，而是一种不同的实现方式，特别是在测试时。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>总之，Java中还有其他不使用_main()_方法打印消息的方法。因此，本教程提供了几种解决这个问题的方法，例如使用静态代码块、在类初始化期间执行代码以及利用嵌套类。</p><p>如往常一样，本文的完整代码示例可以在GitHub上找到。</p>`,26),o=[p];function i(c,l){return s(),a("div",null,o)}const d=n(e,[["render",i],["__file","2024-06-24-Printing Message on Console without Using main   Method in Java.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-06-24/2024-06-24-Printing%20Message%20on%20Console%20without%20Using%20main%20%20%20Method%20in%20Java.html","title":"在Java中不使用main()方法在控制台打印消息","lang":"zh-CN","frontmatter":{"date":"2024-06-24T00:00:00.000Z","category":["Java","Programming"],"tag":["Java","main method","static block"],"head":[["meta",{"name":"keywords","content":"Java, main method, static block, JUnit, nested class"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-24/2024-06-24-Printing%20Message%20on%20Console%20without%20Using%20main%20%20%20Method%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Java中不使用main()方法在控制台打印消息"}],["meta",{"property":"og:description","content":"在Java中不使用main()方法在控制台打印消息 1. 引言 Java程序的执行始于_main()_方法。然而，在某些场景中，我们可能希望在不使用_main()_方法的情况下显示消息。 在本教程中，我们将探讨完成此任务的一些方法。 2. 使用静态代码块 静态代码块在类被加载到内存中时执行，这使得在不使用_main()_方法的情况下显示消息成为可能。 ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-24T01:50:38.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"main method"}],["meta",{"property":"article:tag","content":"static block"}],["meta",{"property":"article:published_time","content":"2024-06-24T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-24T01:50:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Java中不使用main()方法在控制台打印消息\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-24T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-24T01:50:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Java中不使用main()方法在控制台打印消息 1. 引言 Java程序的执行始于_main()_方法。然而，在某些场景中，我们可能希望在不使用_main()_方法的情况下显示消息。 在本教程中，我们将探讨完成此任务的一些方法。 2. 使用静态代码块 静态代码块在类被加载到内存中时执行，这使得在不使用_main()_方法的情况下显示消息成为可能。 ..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 使用静态代码块","slug":"_2-使用静态代码块","link":"#_2-使用静态代码块","children":[]},{"level":2,"title":"3. 使用内部类","slug":"_3-使用内部类","link":"#_3-使用内部类","children":[]},{"level":2,"title":"4. 在类初始化期间执行代码","slug":"_4-在类初始化期间执行代码","link":"#_4-在类初始化期间执行代码","children":[]},{"level":2,"title":"5. 使用JUnit测试","slug":"_5-使用junit测试","link":"#_5-使用junit测试","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1719193838000,"updatedTime":1719193838000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.34,"words":703},"filePathRelative":"posts/baeldung/2024-06-24/2024-06-24-Printing Message on Console without Using main   Method in Java.md","localizedDate":"2024年6月24日","excerpt":"\\n<h2>1. 引言</h2>\\n<p>Java程序的执行始于_main()_方法。然而，在某些场景中，我们可能希望在不使用_main()_方法的情况下显示消息。</p>\\n<p><strong>在本教程中，我们将探讨完成此任务的一些方法。</strong></p>\\n<h2>2. 使用静态代码块</h2>\\n<p>静态代码块在类被加载到内存中时执行，这使得在不使用_main()_方法的情况下显示消息成为可能。</p>\\n<p>让我们看一个例子：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">final</span> <span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">PrintMessageWithoutMainMethod</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">static</span> <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token class-name\\">System</span><span class=\\"token punctuation\\">.</span>out<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">println</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"Hello World!!\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token class-name\\">System</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">exit</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">0</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{d as comp,k as data};
