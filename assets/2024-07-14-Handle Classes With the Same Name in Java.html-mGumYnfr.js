import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as e}from"./app-BkL9UgS7.js";const t={},p=e(`<hr><h1 id="java中处理同名类的策略" tabindex="-1"><a class="header-anchor" href="#java中处理同名类的策略"><span>Java中处理同名类的策略</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>Java的类命名遵循一种称为大驼峰命名法的国际惯例，就像主要的编程语言一样。然而，当处理同名的类时，就遇到了挑战。</p><p><strong>自1998年JDK最初发布以来，如何解决这种不寻常的情况一直存在争议。</strong> 这是JDK-4194542，关于这个主题的第一个开放的bug，从那时起，JDK开发团队的建议是使用完全限定的类名。然而，JDK目前没有计划很快推出允许这种用法的功能。</p><p>最近，在2019年8月，Java开发社区提出了一个新的提议（JEP），关于如何解决这种情况，并且正在获得全球Java开发者的更多支持。</p><p><strong>在本教程中，我们将讨论处理同名类的策略和建议。</strong></p><h2 id="_2-定义类" tabindex="-1"><a class="header-anchor" href="#_2-定义类"><span>2. 定义类</span></a></h2><p>首先，让我们在一个自定义包_com.baeldung.date_中创建一个名为_Date_的类。</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>baeldung<span class="token punctuation">.</span>date</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Date</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">long</span> currentTimeMillis<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">(</span><span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">currentTimeMillis</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token keyword">long</span> currentTimeMillis<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>currentTimeMillis <span class="token operator">=</span> currentTimeMillis<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">long</span> <span class="token function">getTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> currentTimeMillis<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-使用完全限定类名" tabindex="-1"><a class="header-anchor" href="#_3-使用完全限定类名"><span>3. 使用完全限定类名</span></a></h2><p><strong>我们将采用这种方法来避免当这种用法被隔离且不经常重复时的冲突。</strong> 然而，通常认为使用完全限定名是一种较差的风格。</p><p><strong>让我们看看如何使用它，特别是如果包名简短且描述性强，可以使代码更具表现力，从而减少混淆并提高可读性。</strong></p><p>另一方面，当使用的对象是大型类或方法时，它有助于调试：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DateUnitTest</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenUsingFullyQualifiedClassNames</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

        <span class="token class-name"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span>Date</span> javaDate <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span>Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token namespace">com<span class="token punctuation">.</span>baeldung<span class="token punctuation">.</span>date<span class="token punctuation">.</span></span>Date</span> baeldungDate <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name"><span class="token namespace">com<span class="token punctuation">.</span>baeldung<span class="token punctuation">.</span>date<span class="token punctuation">.</span></span>Date</span><span class="token punctuation">(</span>javaDate<span class="token punctuation">.</span><span class="token function">getTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">Assert</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span>javaDate<span class="token punctuation">.</span><span class="token function">getTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> baeldungDate<span class="token punctuation">.</span><span class="token function">getTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-导入最常用的类" tabindex="-1"><a class="header-anchor" href="#_4-导入最常用的类"><span>4. 导入最常用的类</span></a></h2><p><strong>我们导入我们最常用的类，并使用最不常用的类使用完整类路径，这是Java开发者中常见的技术和最佳实践：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Date</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DateUnitTest</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenImportTheMostUsedOne</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

        <span class="token class-name">Date</span> javaDate <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token namespace">com<span class="token punctuation">.</span>baeldung<span class="token punctuation">.</span>date<span class="token punctuation">.</span></span>Date</span> baeldungDate <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name"><span class="token namespace">com<span class="token punctuation">.</span>baeldung<span class="token punctuation">.</span>date<span class="token punctuation">.</span></span>Date</span><span class="token punctuation">(</span>javaDate<span class="token punctuation">.</span><span class="token function">getTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">Assert</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span>javaDate<span class="token punctuation">.</span><span class="token function">getTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> baeldungDate<span class="token punctuation">.</span><span class="token function">getTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们根据特定情况展示了使用同名类的两种可能方法，并观察了它们之间的主要区别。</p><p>如常，本文的完整代码示例可以在GitHub上找到。</p>`,21),c=[p];function o(l,i){return s(),a("div",null,c)}const r=n(t,[["render",o],["__file","2024-07-14-Handle Classes With the Same Name in Java.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-14/2024-07-14-Handle%20Classes%20With%20the%20Same%20Name%20in%20Java.html","title":"Java中处理同名类的策略","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","编程"],"tag":["Java","类名冲突","命名冲突"],"head":[["meta",{"name":"keywords","content":"Java, 类名冲突, 编程"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-14/2024-07-14-Handle%20Classes%20With%20the%20Same%20Name%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中处理同名类的策略"}],["meta",{"property":"og:description","content":"Java中处理同名类的策略 1. 引言 Java的类命名遵循一种称为大驼峰命名法的国际惯例，就像主要的编程语言一样。然而，当处理同名的类时，就遇到了挑战。 自1998年JDK最初发布以来，如何解决这种不寻常的情况一直存在争议。 这是JDK-4194542，关于这个主题的第一个开放的bug，从那时起，JDK开发团队的建议是使用完全限定的类名。然而，JDK..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-15T00:04:58.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"类名冲突"}],["meta",{"property":"article:tag","content":"命名冲突"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-15T00:04:58.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中处理同名类的策略\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-15T00:04:58.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中处理同名类的策略 1. 引言 Java的类命名遵循一种称为大驼峰命名法的国际惯例，就像主要的编程语言一样。然而，当处理同名的类时，就遇到了挑战。 自1998年JDK最初发布以来，如何解决这种不寻常的情况一直存在争议。 这是JDK-4194542，关于这个主题的第一个开放的bug，从那时起，JDK开发团队的建议是使用完全限定的类名。然而，JDK..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 定义类","slug":"_2-定义类","link":"#_2-定义类","children":[]},{"level":2,"title":"3. 使用完全限定类名","slug":"_3-使用完全限定类名","link":"#_3-使用完全限定类名","children":[]},{"level":2,"title":"4. 导入最常用的类","slug":"_4-导入最常用的类","link":"#_4-导入最常用的类","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1721001898000,"updatedTime":1721001898000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":1.96,"words":588},"filePathRelative":"posts/baeldung/2024-07-14/2024-07-14-Handle Classes With the Same Name in Java.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>Java中处理同名类的策略</h1>\\n<h2>1. 引言</h2>\\n<p>Java的类命名遵循一种称为大驼峰命名法的国际惯例，就像主要的编程语言一样。然而，当处理同名的类时，就遇到了挑战。</p>\\n<p><strong>自1998年JDK最初发布以来，如何解决这种不寻常的情况一直存在争议。</strong> 这是JDK-4194542，关于这个主题的第一个开放的bug，从那时起，JDK开发团队的建议是使用完全限定的类名。然而，JDK目前没有计划很快推出允许这种用法的功能。</p>\\n<p>最近，在2019年8月，Java开发社区提出了一个新的提议（JEP），关于如何解决这种情况，并且正在获得全球Java开发者的更多支持。</p>","autoDesc":true}');export{r as comp,k as data};
