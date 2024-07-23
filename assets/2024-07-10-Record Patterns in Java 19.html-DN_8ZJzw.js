import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as e}from"./app-LwwahXlT.js";const t={},p=e(`<h1 id="java-19-中的记录模式-baeldung" tabindex="-1"><a class="header-anchor" href="#java-19-中的记录模式-baeldung"><span>Java 19 中的记录模式 | Baeldung</span></a></h1><p>在本教程中，我们将讨论 Java SE 19 中的新预览特性 JEP-405：记录模式。我们将看到如何分解记录值以及如何将记录模式与类型模式结合起来使用。</p><p>我们将使用以下两个记录：一个名为 <code>GPSPoint</code> 的记录，它包含 <code>latitude</code> 和 <code>longitude</code>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">record</span> <span class="token class-name">GPSPoint</span><span class="token punctuation">(</span><span class="token keyword">double</span> latitude<span class="token punctuation">,</span> <span class="token keyword">double</span> longitude<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>以及一个名为 <code>Location</code> 的记录，它包含一个 <code>name</code> 和一个 <code>GPSPoint</code>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">record</span> <span class="token class-name">Location</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token class-name">GPSPoint</span> gpsPoint<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>记录模式是一种构造，允许我们将值与记录类型进行匹配，并将变量绑定到记录的相应组件上。我们还可以给记录模式一个可选的标识符，这使得它成为一个命名的记录模式，并允许我们引用记录模式变量。</p><h3 id="_3-1-instanceof" tabindex="-1"><a class="header-anchor" href="#_3-1-instanceof"><span>3.1. instanceof</span></a></h3><p>在 Java 16 中引入的 <code>instanceof</code> 模式匹配允许我们在进行 <code>instanceof</code> 检查时直接声明一个变量。从 Java 19 开始，它现在也可以与记录一起使用：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">if</span> <span class="token punctuation">(</span>o <span class="token keyword">instanceof</span> <span class="token class-name">Location</span> location<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>location<span class="token punctuation">.</span><span class="token function">name</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们还可以**使用模式匹配将模式变量 <code>location</code> 的值提取到变量中。**我们可以省略模式变量 <code>location</code>，因为调用访问器方法 <code>name()</code> 变得不必要：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">if</span> <span class="token punctuation">(</span>o <span class="token keyword">instanceof</span> <span class="token class-name">Location</span> <span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token class-name">GPSPoint</span> gpsPoint<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们有一个对象 <code>o</code> 我们想要将其与记录模式进行匹配。该模式只有在它是相应记录类型的实例时才会匹配。如果模式匹配，它会初始化变量并将它们转换为相应的类型。**请记住：<code>null</code> 值不匹配任何记录模式。**我们可以将变量的类型替换为 <code>var</code>。在特定情况下，编译器将为我们推断类型：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">if</span> <span class="token punctuation">(</span>o <span class="token keyword">instanceof</span> <span class="token class-name">Location</span> <span class="token punctuation">(</span><span class="token keyword">var</span> name<span class="token punctuation">,</span> <span class="token keyword">var</span> gpsPoint<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们甚至可以进一步分解 <code>GPSPoint</code>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">if</span> <span class="token punctuation">(</span>o <span class="token keyword">instanceof</span> <span class="token class-name">Location</span> <span class="token punctuation">(</span><span class="token keyword">var</span> name<span class="token punctuation">,</span> <span class="token class-name">GPSPoint</span><span class="token punctuation">(</span><span class="token keyword">var</span> latitude<span class="token punctuation">,</span> <span class="token keyword">var</span> longitude<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;lat: &quot;</span> <span class="token operator">+</span> latitude <span class="token operator">+</span> <span class="token string">&quot;, lng: &quot;</span> <span class="token operator">+</span> longitude<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这称为嵌套分解。它有助于我们的数据导航，并允许我们直接访问 <code>latitude</code> 和 <code>longitude</code>，而无需使用 <code>Location</code> 的 getter 来获取 <code>GPSPoint</code>，然后使用 <code>GPSPoint</code> 对象上的 getter 来获取 <code>latitude</code> 和 <code>longitude</code> 值。</p><p>我们还可以使用此方法处理泛型记录。让我们引入一个新的泛型记录 <code>Wrapper</code>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">record</span> <span class="token class-name">Wrapper</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span>\`<span class="token punctuation">(</span><span class="token class-name">T</span> t<span class="token punctuation">,</span> <span class="token class-name">String</span> description<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这个记录包装任何类型的对象，并允许我们添加描述。我们仍然可以像以前一样使用 <code>instanceof</code>，甚至可以分解记录：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Wrapper</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Location</span><span class="token punctuation">&gt;</span></span>\`\` wrapper <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Wrapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Location</span><span class="token punctuation">(</span><span class="token string">&quot;Home&quot;</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">GPSPoint</span><span class="token punctuation">(</span><span class="token number">1.0</span><span class="token punctuation">,</span> <span class="token number">2.0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;Description&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>wrapper <span class="token keyword">instanceof</span> <span class="token class-name">Wrapper</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Location</span><span class="token punctuation">&gt;</span></span>\`\`<span class="token punctuation">(</span><span class="token keyword">var</span> location<span class="token punctuation">,</span> <span class="token keyword">var</span> description<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>description<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译器也可以推断变量 <code>location</code> 的类型。</p><h3 id="_3-2-switch-表达式" tabindex="-1"><a class="header-anchor" href="#_3-2-switch-表达式"><span>3.2. Switch 表达式</span></a></h3><p>我们还可以使用 switch 表达式根据我们的对象类型执行特定操作：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> result <span class="token operator">=</span> <span class="token keyword">switch</span> <span class="token punctuation">(</span>o<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token class-name">Location</span> l <span class="token operator">-&gt;</span> l<span class="token punctuation">.</span><span class="token function">name</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">default</span> <span class="token operator">-&gt;</span> <span class="token string">&quot;default&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>它将寻找第一个匹配的案例。同样，我们也可以使用嵌套分解：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Double</span> result <span class="token operator">=</span> <span class="token keyword">switch</span> <span class="token punctuation">(</span>object<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token class-name">Location</span><span class="token punctuation">(</span><span class="token keyword">var</span> name<span class="token punctuation">,</span> <span class="token class-name">GPSPoint</span><span class="token punctuation">(</span><span class="token keyword">var</span> latitude<span class="token punctuation">,</span> <span class="token keyword">var</span> longitude<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> latitude<span class="token punctuation">;</span>
    <span class="token keyword">default</span> <span class="token operator">-&gt;</span> <span class="token number">0.0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们必须记住总是要放入一个 <code>default</code> <code>case</code> 以应对没有匹配的情况。</p><p>如果我们想要避免 <code>default case</code>，我们也可以使用一个 <code>sealed interface</code> 并 <code>permit</code> 必须实现 <code>interface</code> 的对象：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">sealed</span> <span class="token keyword">interface</span> <span class="token class-name">ILocation</span> <span class="token keyword">permits</span> <span class="token class-name">Location</span> <span class="token punctuation">{</span>
    <span class="token keyword">default</span> <span class="token class-name">String</span> <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">switch</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">case</span> <span class="token class-name">Location</span><span class="token punctuation">(</span><span class="token keyword">var</span> name<span class="token punctuation">,</span> <span class="token keyword">var</span> ignored<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> name<span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这有助于我们消除 <code>default</code> <code>case</code> 并仅创建相应的案例。</p><p>我们还可以保护特定案例。例如，我们会使用 <code>when</code> 关键字来检查等式并引入一个新的 <code>Location</code>，如果有一些不想要的行为：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> result <span class="token operator">=</span> <span class="token keyword">switch</span> <span class="token punctuation">(</span>object<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token class-name">Location</span><span class="token punctuation">(</span><span class="token keyword">var</span> name<span class="token punctuation">,</span> <span class="token keyword">var</span> ignored<span class="token punctuation">)</span> when name<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token string">&quot;Home&quot;</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token keyword">new</span> <span class="token class-name">Location</span><span class="token punctuation">(</span><span class="token string">&quot;Test&quot;</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">GPSPoint</span><span class="token punctuation">(</span><span class="token number">1.0</span><span class="token punctuation">,</span> <span class="token number">2.0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">case</span> <span class="token class-name">Location</span><span class="token punctuation">(</span><span class="token keyword">var</span> name<span class="token punctuation">,</span> <span class="token keyword">var</span> ignored<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> name<span class="token punctuation">;</span>
    <span class="token keyword">default</span> <span class="token operator">-&gt;</span> <span class="token string">&quot;default&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果这个 switch 表达式被以下对象调用：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Object</span> object <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Location</span><span class="token punctuation">(</span><span class="token string">&quot;Home&quot;</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">GPSPoint</span><span class="token punctuation">(</span><span class="token number">1.0</span><span class="token punctuation">,</span> <span class="token number">2.0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>它将把变量 <code>result</code> 分配为 “Test”。我们的对象是 <code>Location</code> 记录类型，它的名称是 “Home”。因此它直接跳转到 switch 的第一个案例。如果名称不是 “Home”，它将跳转到第二个案例。如果对象根本不是 <code>Location</code> 类型，将返回默认值。</p><h2 id="结论" tabindex="-1"><a class="header-anchor" href="#结论"><span>结论</span></a></h2><p>在本文中，我们看到了记录模式<strong>如何允许我们使用模式匹配将记录的值提取到变量中</strong>。我们可以使用 <code>instanceof</code>、<code>switch</code> 语句，甚至使用附加条件的守卫来实现这一点。记录模式在处理嵌套记录或封闭记录的层次结构时特别有用。</p><p>这些示例也可以在 GitHub 上找到。</p>`,39),o=[p];function c(l,i){return s(),n("div",null,o)}const r=a(t,[["render",c],["__file","2024-07-10-Record Patterns in Java 19.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-10/2024-07-10-Record%20Patterns%20in%20Java%2019.html","title":"Java 19 中的记录模式 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-07-11T00:00:00.000Z","category":["Java"],"tag":["Java 19","Record Patterns"],"head":[["meta",{"name":"keywords","content":"Java 19, Record Patterns, JEP-405, Java SE 19, 模式匹配, 记录模式"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-10/2024-07-10-Record%20Patterns%20in%20Java%2019.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java 19 中的记录模式 | Baeldung"}],["meta",{"property":"og:description","content":"Java 19 中的记录模式 | Baeldung 在本教程中，我们将讨论 Java SE 19 中的新预览特性 JEP-405：记录模式。我们将看到如何分解记录值以及如何将记录模式与类型模式结合起来使用。 我们将使用以下两个记录：一个名为 GPSPoint 的记录，它包含 latitude 和 longitude： 以及一个名为 Location 的..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-10T20:01:30.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java 19"}],["meta",{"property":"article:tag","content":"Record Patterns"}],["meta",{"property":"article:published_time","content":"2024-07-11T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-10T20:01:30.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java 19 中的记录模式 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-11T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-10T20:01:30.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java 19 中的记录模式 | Baeldung 在本教程中，我们将讨论 Java SE 19 中的新预览特性 JEP-405：记录模式。我们将看到如何分解记录值以及如何将记录模式与类型模式结合起来使用。 我们将使用以下两个记录：一个名为 GPSPoint 的记录，它包含 latitude 和 longitude： 以及一个名为 Location 的..."},"headers":[{"level":3,"title":"3.1. instanceof","slug":"_3-1-instanceof","link":"#_3-1-instanceof","children":[]},{"level":3,"title":"3.2. Switch 表达式","slug":"_3-2-switch-表达式","link":"#_3-2-switch-表达式","children":[]},{"level":2,"title":"结论","slug":"结论","link":"#结论","children":[]}],"git":{"createdTime":1720641690000,"updatedTime":1720641690000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.88,"words":1165},"filePathRelative":"posts/baeldung/2024-07-10/2024-07-10-Record Patterns in Java 19.md","localizedDate":"2024年7月11日","excerpt":"\\n<p>在本教程中，我们将讨论 Java SE 19 中的新预览特性 JEP-405：记录模式。我们将看到如何分解记录值以及如何将记录模式与类型模式结合起来使用。</p>\\n<p>我们将使用以下两个记录：一个名为 <code>GPSPoint</code> 的记录，它包含 <code>latitude</code> 和 <code>longitude</code>：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">record</span> <span class=\\"token class-name\\">GPSPoint</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">double</span> latitude<span class=\\"token punctuation\\">,</span> <span class=\\"token keyword\\">double</span> longitude<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{r as comp,k as data};
