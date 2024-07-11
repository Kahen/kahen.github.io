import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-uizvaz9h.js";const e={},p=t(`<h1 id="junit-5-中-timeout-注解指南" tabindex="-1"><a class="header-anchor" href="#junit-5-中-timeout-注解指南"><span>JUnit 5 中 @Timeout 注解指南</span></a></h1><p>在这篇简短的教程中，我们将使用 JUnit5 的 @Timeout 注解以声明式的方式来为单元测试设置超时时间。我们将讨论使用它的不同方式，然后我们将看到它如何与 @Parameterized 和 @Nested 测试进行交互。</p><p>我们可以将 JUnit5 的 @Timeout 注解标注在单元测试上，以指定它最多可以运行的秒数；如果超出这个值，测试将因 java.util.concurrent.TimeoutException 而失败：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token annotation punctuation">@Timeout</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
<span class="token keyword">void</span> <span class="token function">shouldFailAfterOneSecond</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>
    <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">10_000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-1-value-和-unit-属性" tabindex="-1"><a class="header-anchor" href="#_2-1-value-和-unit-属性"><span>2.1. value 和 unit 属性</span></a></h3><p>我们已经学会了如何通过指定它失败后的秒数来指定测试的超时时间。然而，我们可以利用注解的 value 和 unit 属性来指定不同的度量单位：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token annotation punctuation">@Timeout</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">,</span> unit <span class="token operator">=</span> <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">MINUTES</span><span class="token punctuation">)</span>
<span class="token keyword">void</span> <span class="token function">shouldFailAfterTwoMinutes</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>
    <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">10_000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-threadmode-属性" tabindex="-1"><a class="header-anchor" href="#_2-2-threadmode-属性"><span>2.2. threadMode 属性</span></a></h3><p>假设我们有一个慢速测试，因此有一个大的超时时间。为了有效地运行这个测试，我们应该在不同的线程上运行这个测试，而不是阻塞其他测试。通过使用 JUnit5 的并行测试执行，我们可以实现这一点。</p><p>另一方面，@Timeout 注解本身允许我们通过其 threadMode 属性优雅地做到这一点：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token annotation punctuation">@Timeout</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token number">5</span><span class="token punctuation">,</span> unit <span class="token operator">=</span> <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">MINUTES</span><span class="token punctuation">,</span> threadMode <span class="token operator">=</span> <span class="token class-name">Timeout<span class="token punctuation">.</span>ThreadMode</span><span class="token punctuation">.</span><span class="token constant">SEPARATE_THREAD</span><span class="token punctuation">)</span>
<span class="token keyword">void</span> <span class="token function">shouldUseADifferentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">10_000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以通过运行测试并打印当前线程的名称来检查这一点；它应该打印类似于 &quot;junit-timeout-thread-1&quot; 这样的内容。</p><h2 id="_3-timeout-的目标" tabindex="-1"><a class="header-anchor" href="#_3-timeout-的目标"><span>3. @Timeout 的目标</span></a></h2><p>正如前面所强调的，@Timeout 注解可以方便地应用于单个测试方法。然而，也可以通过在类级别放置注解来为每个测试指定默认的超时持续时间。结果，未覆盖类级别超时的测试如果超出该值将失败：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Timeout</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span>
<span class="token keyword">class</span> <span class="token class-name">TimeoutUnitTest</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Test</span>
    <span class="token annotation punctuation">@Timeout</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
    <span class="token keyword">void</span> <span class="token function">shouldFailAfterOneSecond</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>
        <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">10_000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">void</span> <span class="token function">shouldFailAfterDefaultTimeoutOfFiveSeconds</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>
        <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">10_000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-1-timeout-和-nested-测试" tabindex="-1"><a class="header-anchor" href="#_3-1-timeout-和-nested-测试"><span>3.1. @Timeout 和 @Nested 测试</span></a></h3><p>JUnit5 的 @Nested 注解可以为单元测试创建内部类。我们可以将此与 @Timeout 结合使用。如果父类定义了默认的超时值，它也将由内部类的测试使用：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Timeout</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span>
<span class="token keyword">class</span> <span class="token class-name">TimeoutUnitTest</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Nested</span>
    <span class="token keyword">class</span> <span class="token class-name">NestedClassWithoutTimeout</span> <span class="token punctuation">{</span>
        <span class="token annotation punctuation">@Test</span>
        <span class="token keyword">void</span> <span class="token function">shouldFailAfterParentsDefaultTimeoutOfFiveSeconds</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>
            <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">10_000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然而，这个值可以在嵌套类级别或方法级别被覆盖：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Nested</span>
<span class="token annotation punctuation">@Timeout</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span>
<span class="token keyword">class</span> <span class="token class-name">NestedClassWithTimeout</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">void</span> <span class="token function">shouldFailAfterNestedClassTimeoutOfThreeSeconds</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>
        <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">10_000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Test</span>
    <span class="token annotation punctuation">@Timeout</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
    <span class="token keyword">void</span> <span class="token function">shouldFailAfterOneSecond</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>
        <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">10_000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-timeout-和-parameterizedtest" tabindex="-1"><a class="header-anchor" href="#_3-2-timeout-和-parameterizedtest"><span>3.2. @Timeout 和 @ParameterizedTest</span></a></h3><p>我们可以利用 @ParameterizedTest 注解来根据给定的输入值集合执行多个测试。我们可以将 @Timeout 注解标注在参数化测试上，结果，每个生成的测试都将使用超时值。</p><p>例如，如果我们有一个将执行五个测试的 @ParameterizedTest 并且我们用 @Timeout(1) 标注它，那么每个生成的五个测试如果超过一秒钟就会失败：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Timeout</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@ParameterizedTest</span>
<span class="token annotation punctuation">@ValueSource</span><span class="token punctuation">(</span>ints <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">void</span> <span class="token function">eachTestShouldFailAfterOneSecond</span><span class="token punctuation">(</span><span class="token keyword">int</span> input<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>
    <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">1100</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们讨论了 JUnit5 的新 @Timeout 注解。我们学习了如何配置它并使用它以声明式方式为我们的单元测试设置超时值。</p><p>如往常一样，本文的完整源代码可在 GitHub 上找到。翻译已经完成，以下是翻译的结尾部分：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Timeout</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@ParameterizedTest</span>
<span class="token annotation punctuation">@ValueSource</span><span class="token punctuation">(</span>ints <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">void</span> <span class="token function">eachTestShouldFailAfterOneSecond</span><span class="token punctuation">(</span><span class="token keyword">int</span> input<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>
    <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">1100</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-结论-1" tabindex="-1"><a class="header-anchor" href="#_4-结论-1"><span>4. 结论</span></a></h2><p>在本文中，我们讨论了 JUnit5 的新 @Timeout 注解。我们学习了如何配置它并使用它以声明式方式为我们的单元测试设置超时值。</p><p>如往常一样，本文的完整源代码可在 GitHub 上找到。</p><p>OK</p>`,32),o=[p];function i(c,u){return s(),a("div",null,o)}const r=n(e,[["render",i],["__file","2024-07-07-A Guide to  Timeout Annotation in JUnit 5.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-07/2024-07-07-A%20Guide%20to%20%20Timeout%20Annotation%20in%20JUnit%205.html","title":"JUnit 5 中 @Timeout 注解指南","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","JUnit 5"],"tag":["Timeout Annotation","Unit Test"],"head":[["meta",{"name":"keywords","content":"JUnit 5, @Timeout, Unit Test, Java"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-07/2024-07-07-A%20Guide%20to%20%20Timeout%20Annotation%20in%20JUnit%205.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"JUnit 5 中 @Timeout 注解指南"}],["meta",{"property":"og:description","content":"JUnit 5 中 @Timeout 注解指南 在这篇简短的教程中，我们将使用 JUnit5 的 @Timeout 注解以声明式的方式来为单元测试设置超时时间。我们将讨论使用它的不同方式，然后我们将看到它如何与 @Parameterized 和 @Nested 测试进行交互。 我们可以将 JUnit5 的 @Timeout 注解标注在单元测试上，以指定..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-07T13:34:21.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Timeout Annotation"}],["meta",{"property":"article:tag","content":"Unit Test"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-07T13:34:21.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"JUnit 5 中 @Timeout 注解指南\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-07T13:34:21.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"JUnit 5 中 @Timeout 注解指南 在这篇简短的教程中，我们将使用 JUnit5 的 @Timeout 注解以声明式的方式来为单元测试设置超时时间。我们将讨论使用它的不同方式，然后我们将看到它如何与 @Parameterized 和 @Nested 测试进行交互。 我们可以将 JUnit5 的 @Timeout 注解标注在单元测试上，以指定..."},"headers":[{"level":3,"title":"2.1. value 和 unit 属性","slug":"_2-1-value-和-unit-属性","link":"#_2-1-value-和-unit-属性","children":[]},{"level":3,"title":"2.2. threadMode 属性","slug":"_2-2-threadmode-属性","link":"#_2-2-threadmode-属性","children":[]},{"level":2,"title":"3. @Timeout 的目标","slug":"_3-timeout-的目标","link":"#_3-timeout-的目标","children":[{"level":3,"title":"3.1. @Timeout 和 @Nested 测试","slug":"_3-1-timeout-和-nested-测试","link":"#_3-1-timeout-和-nested-测试","children":[]},{"level":3,"title":"3.2. @Timeout 和 @ParameterizedTest","slug":"_3-2-timeout-和-parameterizedtest","link":"#_3-2-timeout-和-parameterizedtest","children":[]}]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]},{"level":2,"title":"4. 结论","slug":"_4-结论-1","link":"#_4-结论-1","children":[]}],"git":{"createdTime":1720359261000,"updatedTime":1720359261000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.12,"words":937},"filePathRelative":"posts/baeldung/2024-07-07/2024-07-07-A Guide to  Timeout Annotation in JUnit 5.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在这篇简短的教程中，我们将使用 JUnit5 的 @Timeout 注解以声明式的方式来为单元测试设置超时时间。我们将讨论使用它的不同方式，然后我们将看到它如何与 @Parameterized 和 @Nested 测试进行交互。</p>\\n<p>我们可以将 JUnit5 的 @Timeout 注解标注在单元测试上，以指定它最多可以运行的秒数；如果超出这个值，测试将因 java.util.concurrent.TimeoutException 而失败：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token annotation punctuation\\">@Test</span>\\n<span class=\\"token annotation punctuation\\">@Timeout</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">1</span><span class=\\"token punctuation\\">)</span>\\n<span class=\\"token keyword\\">void</span> <span class=\\"token function\\">shouldFailAfterOneSecond</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token keyword\\">throws</span> <span class=\\"token class-name\\">InterruptedException</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token class-name\\">Thread</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">sleep</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">10_000</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{r as comp,k as data};
