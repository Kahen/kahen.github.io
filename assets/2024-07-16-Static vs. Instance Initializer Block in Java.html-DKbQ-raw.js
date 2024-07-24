import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-BkL9UgS7.js";const e={},p=t(`<h1 id="java中的静态初始化块与实例初始化块" tabindex="-1"><a class="header-anchor" href="#java中的静态初始化块与实例初始化块"><span>Java中的静态初始化块与实例初始化块</span></a></h1><p>在本教程中，我们将学习静态块和实例初始化块的概念。我们还将检查类构造函数和初始化块的执行顺序及其差异。</p><p>在Java中，<strong>静态块在对象初始化前执行代码</strong>。静态块是带有_static_关键字的代码块：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token punctuation">{</span>
    <span class="token comment">// 静态块的定义</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>静态初始化块或静态初始化子句还有其他一些名称，比如静态块。<strong>静态块代码仅在类加载期间执行一次</strong>。静态块总是在Java中的_main()_方法之前执行，因为编译器在类加载时将它们存储在内存中，并且在对象创建之前。</p><p>一个类可以有多个静态块，它们将按照在类中出现的顺序执行：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">StaticBlockExample</span> <span class="token punctuation">{</span>

    <span class="token keyword">static</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;静态块 1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">static</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;静态块 2&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;主方法&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述代码片段的输出为：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>静态块 1
静态块 2
主方法
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，编译器首先执行所有静态块，完成静态块执行后，调用_main()_方法。Java编译器确保静态初始化块的执行顺序与它们在源代码中出现的顺序相同。</p><p>父类的静态块首先执行，因为编译器在加载子类之前加载父类。</p><p>作为一个有趣的事实，Java 1.7之前，main()方法并不是每个Java应用程序中都必须的，所以所有代码都可以在静态块内编写。然而，从Java 1.7开始，main()方法是强制性的。</p><h3 id="实例初始化块" tabindex="-1"><a class="header-anchor" href="#实例初始化块"><span>实例初始化块</span></a></h3><p>顾名思义，<strong>实例初始化块的目的是初始化实例数据成员</strong>。</p><p>实例初始化块看起来就像静态初始化块，但没有_static_关键字：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token punctuation">{</span>
    <span class="token comment">// 实例初始化块的定义</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>静态初始化块总是在实例初始化块之前执行，因为静态块在类加载时运行。然而，实例块在实例创建时运行</strong>。Java编译器将初始化块复制到每个构造函数中。因此，多个构造函数可以使用这种方法共享一段代码：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">InstanceBlockExample</span> <span class="token punctuation">{</span>

    <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;实例初始化块 1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;实例初始化块 2&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">InstanceBlockExample</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;类构造函数&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">InstanceBlockExample</span> iib <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">InstanceBlockExample</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;主方法&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这种情况下，上述代码的输出将是：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>实例初始化块 1
实例初始化块 2
类构造函数
主方法
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>实例初始化块在每次构造函数调用期间执行，因为编译器将初始化块复制到构造函数本身中。</p><p>编译器在执行当前类的实例块之前先执行父类的实例块。编译器通过_super()_调用父类构造函数，实例块在构造函数调用时执行。</p><h3 id="静态块与实例初始化块之间的差异" tabindex="-1"><a class="header-anchor" href="#静态块与实例初始化块之间的差异"><span>静态块与实例初始化块之间的差异</span></a></h3><table><thead><tr><th>静态块</th><th>实例初始化块</th></tr></thead><tbody><tr><td>它在类加载期间执行</td><td>它在类实例化期间执行</td></tr><tr><td>它只能使用静态变量</td><td>它可以使用静态或非静态（实例变量）</td></tr><tr><td>它不能使用this</td><td>它可以使用this</td></tr><tr><td>当类加载到内存时，它在整个程序执行期间只执行一次</td><td>每次调用构造函数时都可以运行多次</td></tr></tbody></table><h3 id="结论" tabindex="-1"><a class="header-anchor" href="#结论"><span>结论</span></a></h3><p>在本教程中，我们了解到编译器在类加载期间执行静态块。静态块可用于初始化静态变量或调用静态方法。然而，实例块每次创建类的实例时都会执行，并且可用于初始化实例数据成员。</p><p>此外，本文的完整代码示例可以在GitHub上找到。</p>`,27),i=[p];function c(l,o){return s(),a("div",null,i)}const r=n(e,[["render",c],["__file","2024-07-16-Static vs. Instance Initializer Block in Java.html.vue"]]),v=JSON.parse('{"path":"/posts/baeldung/2024-07-16/2024-07-16-Static%20vs.%20Instance%20Initializer%20Block%20in%20Java.html","title":"Java中的静态初始化块与实例初始化块","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Programming"],"tag":["Java","Static Block","Instance Initializer Block"],"head":[["meta",{"name":"keywords","content":"Java, Static Block, Instance Initializer Block"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-16/2024-07-16-Static%20vs.%20Instance%20Initializer%20Block%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中的静态初始化块与实例初始化块"}],["meta",{"property":"og:description","content":"Java中的静态初始化块与实例初始化块 在本教程中，我们将学习静态块和实例初始化块的概念。我们还将检查类构造函数和初始化块的执行顺序及其差异。 在Java中，静态块在对象初始化前执行代码。静态块是带有_static_关键字的代码块： 静态初始化块或静态初始化子句还有其他一些名称，比如静态块。静态块代码仅在类加载期间执行一次。静态块总是在Java中的_m..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-16T20:06:36.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Static Block"}],["meta",{"property":"article:tag","content":"Instance Initializer Block"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-16T20:06:36.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中的静态初始化块与实例初始化块\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-16T20:06:36.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中的静态初始化块与实例初始化块 在本教程中，我们将学习静态块和实例初始化块的概念。我们还将检查类构造函数和初始化块的执行顺序及其差异。 在Java中，静态块在对象初始化前执行代码。静态块是带有_static_关键字的代码块： 静态初始化块或静态初始化子句还有其他一些名称，比如静态块。静态块代码仅在类加载期间执行一次。静态块总是在Java中的_m..."},"headers":[{"level":3,"title":"实例初始化块","slug":"实例初始化块","link":"#实例初始化块","children":[]},{"level":3,"title":"静态块与实例初始化块之间的差异","slug":"静态块与实例初始化块之间的差异","link":"#静态块与实例初始化块之间的差异","children":[]},{"level":3,"title":"结论","slug":"结论","link":"#结论","children":[]}],"git":{"createdTime":1721160396000,"updatedTime":1721160396000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.24,"words":972},"filePathRelative":"posts/baeldung/2024-07-16/2024-07-16-Static vs. Instance Initializer Block in Java.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在本教程中，我们将学习静态块和实例初始化块的概念。我们还将检查类构造函数和初始化块的执行顺序及其差异。</p>\\n<p>在Java中，<strong>静态块在对象初始化前执行代码</strong>。静态块是带有_static_关键字的代码块：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">static</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token comment\\">// 静态块的定义</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{r as comp,v as data};
