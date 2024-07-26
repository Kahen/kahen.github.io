import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as e}from"./app-8nJ1rqSf.js";const t={},p=e(`<hr><h1 id="如何在junit-4中忽略基测试类" tabindex="-1"><a class="header-anchor" href="#如何在junit-4中忽略基测试类"><span>如何在JUnit 4中忽略基测试类</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>本教程将讨论在JUnit 4中跳过运行基测试类中测试的可能解决方案。在本教程中，<strong>基类仅包含辅助方法，而子类将扩展它并运行实际测试</strong>。</p><h2 id="_2-绕过基测试类" tabindex="-1"><a class="header-anchor" href="#_2-绕过基测试类"><span>2. 绕过基测试类</span></a></h2><p>假设我们有一个包含一些辅助方法的_BaseUnitTest_类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">BaseUnitTest</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">helperMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// ...</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，我们用一个包含测试的类来扩展它：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ExtendedBaseUnitTest</span> <span class="token keyword">extends</span> <span class="token class-name">BaseUnitTest</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenDoTest_thenAssert</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// ...</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们运行测试，无论是使用IDE还是Maven构建，<strong>我们可能会收到一个错误，告诉我们_BaseUnitTest_中没有可运行的测试方法</strong>。<strong>我们不想在此类中运行测试</strong>，所以我们正在寻找一种避免这种错误的方法。</p><p>我们将查看三种不同的可能性。如果使用IDE运行测试，结果可能会有所不同，这取决于我们的IDE插件以及我们如何配置它来运行JUnit测试。</p><h3 id="_2-1-重命名类" tabindex="-1"><a class="header-anchor" href="#_2-1-重命名类"><span>2.1. 重命名类</span></a></h3><p>我们可以将类名重命名为构建约定将排除的名称。例如，如果我们使用Maven，我们可以检查Maven Surefire插件的默认设置。</p><p><strong>我们可以将名称从_BaseUnitTest_更改为_BaseUnitTestHelper_或类似</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">BaseUnitTestHelper</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">helperMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// ...</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-忽略" tabindex="-1"><a class="header-anchor" href="#_2-2-忽略"><span>2.2. 忽略</span></a></h3><p>第二个选项是<strong>使用JUnit的_@Ignore_注解暂时禁用测试。我们可以在类级别添加它以禁用类中的所有测试</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Ignore</span><span class="token punctuation">(</span><span class="token string">&quot;Class not ready for tests&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">IgnoreClassUnitTest</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenDoTest_thenAssert</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// ...</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同样，<strong>我们可以在方法级别添加它</strong>，以防我们仍然需要在类中运行其他测试，但只想排除一个或几个：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">IgnoreMethodTest</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Ignore</span><span class="token punctuation">(</span><span class="token string">&quot;This method not ready yet&quot;</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenMethodIsIgnored_thenTestsDoNotRun</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// ...</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果使用Maven运行，我们将看到类似这样的输出：</p><div class="language-plaintext line-numbers-mode" data-ext="plaintext" data-title="plaintext"><pre class="language-plaintext"><code>Tests run: 1, Failures: 0, Errors: 0, Skipped: 1, Time elapsed: 0.041 s - in com.baeldung.IgnoreMethodTest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>自JUnit 5起，<em>@Disabled_注解取代了</em>@Ignore_</strong>。</p><h3 id="_2-3-使基类-抽象" tabindex="-1"><a class="header-anchor" href="#_2-3-使基类-抽象"><span>2.3. 使基类_抽象_</span></a></h3><p>可能<strong>最好的方法是使基测试类_抽象_</strong>。抽象将要求一个具体类来扩展它。这就是为什么JUnit在任何情况下都不会将其视为测试实例。</p><p>让我们将我们的_BaseUnitTest_类设为抽象：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">BaseUnitTest</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">helperMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// ...</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-结论" tabindex="-1"><a class="header-anchor" href="#_3-结论"><span>3. 结论</span></a></h2><p>在本文中，<strong>我们看到了一些在JUnit 4中排除运行基测试类的示例</strong>。最好的方法是创建抽象类。</p><p>JUnit的_@Ignore_注解也被广泛使用，但被认为是一种不良实践。<strong>通过忽略测试，我们可能会忘记它们以及忽略它们的原因</strong>。</p><p>一如既往，本文中展示的代码可以在GitHub上找到。</p>`,31),i=[p];function o(l,c){return s(),a("div",null,i)}const u=n(t,[["render",o],["__file","2024-07-25-JUnit 4 on How to Ignore a Base Test Class.html.vue"]]),v=JSON.parse('{"path":"/posts/baeldung/2024-07-25/2024-07-25-JUnit%204%20on%20How%20to%20Ignore%20a%20Base%20Test%20Class.html","title":"如何在JUnit 4中忽略基测试类","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","JUnit"],"tag":["JUnit 4","测试"],"head":[["meta",{"name":"keywords","content":"JUnit 4, 测试, 忽略基类"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-25/2024-07-25-JUnit%204%20on%20How%20to%20Ignore%20a%20Base%20Test%20Class.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"如何在JUnit 4中忽略基测试类"}],["meta",{"property":"og:description","content":"如何在JUnit 4中忽略基测试类 1. 概述 本教程将讨论在JUnit 4中跳过运行基测试类中测试的可能解决方案。在本教程中，基类仅包含辅助方法，而子类将扩展它并运行实际测试。 2. 绕过基测试类 假设我们有一个包含一些辅助方法的_BaseUnitTest_类： 现在，我们用一个包含测试的类来扩展它： 如果我们运行测试，无论是使用IDE还是Maven..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-25T19:57:14.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"JUnit 4"}],["meta",{"property":"article:tag","content":"测试"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-25T19:57:14.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"如何在JUnit 4中忽略基测试类\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-25T19:57:14.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"如何在JUnit 4中忽略基测试类 1. 概述 本教程将讨论在JUnit 4中跳过运行基测试类中测试的可能解决方案。在本教程中，基类仅包含辅助方法，而子类将扩展它并运行实际测试。 2. 绕过基测试类 假设我们有一个包含一些辅助方法的_BaseUnitTest_类： 现在，我们用一个包含测试的类来扩展它： 如果我们运行测试，无论是使用IDE还是Maven..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 绕过基测试类","slug":"_2-绕过基测试类","link":"#_2-绕过基测试类","children":[{"level":3,"title":"2.1. 重命名类","slug":"_2-1-重命名类","link":"#_2-1-重命名类","children":[]},{"level":3,"title":"2.2. 忽略","slug":"_2-2-忽略","link":"#_2-2-忽略","children":[]},{"level":3,"title":"2.3. 使基类_抽象_","slug":"_2-3-使基类-抽象","link":"#_2-3-使基类-抽象","children":[]}]},{"level":2,"title":"3. 结论","slug":"_3-结论","link":"#_3-结论","children":[]}],"git":{"createdTime":1721937434000,"updatedTime":1721937434000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.4,"words":720},"filePathRelative":"posts/baeldung/2024-07-25/2024-07-25-JUnit 4 on How to Ignore a Base Test Class.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>如何在JUnit 4中忽略基测试类</h1>\\n<h2>1. 概述</h2>\\n<p>本教程将讨论在JUnit 4中跳过运行基测试类中测试的可能解决方案。在本教程中，<strong>基类仅包含辅助方法，而子类将扩展它并运行实际测试</strong>。</p>\\n<h2>2. 绕过基测试类</h2>\\n<p>假设我们有一个包含一些辅助方法的_BaseUnitTest_类：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">BaseUnitTest</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">void</span> <span class=\\"token function\\">helperMethod</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token comment\\">// ...</span>\\n    <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{u as comp,v as data};
