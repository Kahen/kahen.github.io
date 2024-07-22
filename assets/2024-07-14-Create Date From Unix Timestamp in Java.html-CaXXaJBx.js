import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-BMOUrRO4.js";const e={},p=t(`<hr><h1 id="java中从unix时间戳创建日期" tabindex="-1"><a class="header-anchor" href="#java中从unix时间戳创建日期"><span>Java中从Unix时间戳创建日期</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>在本快速教程中，我们将学习如何从Unix时间戳解析日期的表示。<strong>Unix时间</strong>是自1970年1月1日以来经过的秒数。然而，时间戳可以表示到纳秒级的精度。因此，我们将看到可用的工具，并创建一个方法将任何范围的时间戳转换为Java对象。</p><h2 id="_2-旧方法-java-8之前" tabindex="-1"><a class="header-anchor" href="#_2-旧方法-java-8之前"><span>2. 旧方法（Java 8之前）</span></a></h2><p>在Java 8之前，我们最简单的选择是_日期(Date)<em>和_日历(Calendar)</em>。_日期_类有一个构造函数，直接接受以毫秒为单位的时间戳：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Date</span> <span class="token function">dateFrom</span><span class="token punctuation">(</span><span class="token keyword">long</span> input<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用_日历_，我们必须在_getInstance()<em>之后调用_setTimeInMillis()</em>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Calendar</span> <span class="token function">calendarFrom</span><span class="token punctuation">(</span><span class="token keyword">long</span> input<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Calendar</span> calendar <span class="token operator">=</span> <span class="token class-name">Calendar</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    calendar<span class="token punctuation">.</span><span class="token function">setTimeInMillis</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> calendar<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>换句话说，我们必须知道我们的输入是以秒、纳秒还是两者之间的任何其他精度。然后，我们必须手动将我们的时间戳转换为毫秒。</p><h2 id="_3-新方法-java-8" tabindex="-1"><a class="header-anchor" href="#_3-新方法-java-8"><span>3. 新方法（Java 8+）</span></a></h2><p>Java 8引入了_Instant_。**这个类有实用的方法从秒和毫秒创建实例。**此外，其中一个接受纳秒调整参数：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Instant</span><span class="token punctuation">.</span><span class="token function">ofEpochSecond</span><span class="token punctuation">(</span>seconds<span class="token punctuation">,</span> nanos<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>**但我们仍然必须事先知道我们的时间戳的精度。**例如，如果我们知道我们的时间戳是以纳秒为单位的，我们需要进行一些计算：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Instant</span> <span class="token function">fromNanos</span><span class="token punctuation">(</span><span class="token keyword">long</span> input<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">long</span> seconds <span class="token operator">=</span> input <span class="token operator">/</span> <span class="token number">1_000_000_000</span><span class="token punctuation">;</span>
    <span class="token keyword">long</span> nanos <span class="token operator">=</span> input <span class="token operator">%</span> <span class="token number">1_000_000_000</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> <span class="token class-name">Instant</span><span class="token punctuation">.</span><span class="token function">ofEpochSecond</span><span class="token punctuation">(</span>seconds<span class="token punctuation">,</span> nanos<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先，我们将时间戳除以十亿以获取秒数。然后，我们使用它的余数来获取秒之后的部分。</p><h2 id="_4-使用instant的通用解决方案" tabindex="-1"><a class="header-anchor" href="#_4-使用instant的通用解决方案"><span>4. 使用Instant的通用解决方案</span></a></h2><p>**为了避免额外的工作，让我们创建一个方法，可以将任何输入转换为毫秒，大多数类都可以解析。**首先，我们检查我们的时间戳在什么范围内。然后，我们执行计算以提取毫秒。此外，我们将使用科学记数法使我们的条件更易读。</p><p>还记得时间戳是有符号的，所以我们必须检查正负范围（负时间戳意味着它们从1970年开始倒数）。</p><p><strong>让我们先检查我们的输入是否在纳秒范围内</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">long</span> <span class="token function">millis</span><span class="token punctuation">(</span><span class="token keyword">long</span> timestamp<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>millis <span class="token operator">&gt;=</span> <span class="token number">1E16</span> <span class="token operator">||</span> millis \`<span class="token operator">&lt;=</span> <span class="token operator">-</span><span class="token number">1E16</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> timestamp <span class="token operator">/</span> <span class="token number">1_000_000</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 下一个范围检查</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先，我们检查它是否在_1E16_范围内，这是一后面跟着16个零。**负值代表1970年之前的日期，所以我们也必须检查它们。**然后，我们将我们的值除以一百万以获得毫秒。</p><p>类似地，微秒在_1E14_范围内。这次，我们除以一千：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">if</span> <span class="token punctuation">(</span>timestamp <span class="token operator">&gt;</span>\`<span class="token operator">=</span> <span class="token number">1E14</span> <span class="token operator">||</span> timestamp \`<span class="token operator">&lt;=</span> <span class="token operator">-</span><span class="token number">1E14</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> timestamp <span class="token operator">/</span> <span class="token number">1_000</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>当我们的值在1E11到-3E10范围内时，我们不需要改变任何东西</strong>。这意味着我们的输入已经是毫秒精度：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">if</span> <span class="token punctuation">(</span>timestamp <span class="token operator">&gt;</span>\`<span class="token operator">=</span> <span class="token number">1E11</span> <span class="token operator">||</span> timestamp <span class="token operator">&lt;=</span> <span class="token operator">-</span><span class="token number">3E10</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> timestamp<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，如果我们的输入不是这些范围内的任何一种，那么它一定是秒，所以我们需要将其转换为毫秒：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">return</span> timestamp <span class="token operator">*</span> <span class="token number">1_000</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_4-1-为-instant-标准化输入" tabindex="-1"><a class="header-anchor" href="#_4-1-为-instant-标准化输入"><span>4.1. 为_Instant_标准化输入</span></a></h3><p><strong>现在，让我们创建一个方法，使用_Instant.ofEpochMilli()<em>从任何精度的输入返回_Instant</em></strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Instant</span> <span class="token function">fromTimestamp</span><span class="token punctuation">(</span><span class="token keyword">long</span> input<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">Instant</span><span class="token punctuation">.</span><span class="token function">ofEpochMilli</span><span class="token punctuation">(</span><span class="token function">millis</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意，每次我们除以或乘以值时，都会丢失精度。</p><h3 id="_4-2-使用-localdatetime-的本地时间" tabindex="-1"><a class="header-anchor" href="#_4-2-使用-localdatetime-的本地时间"><span>4.2. 使用_LocalDateTime_的本地时间</span></a></h3><p>**_Instant_代表一个时间点。但是，没有时区，它不容易阅读，因为它取决于我们在世界的位置。**所以，让我们创建一个方法来生成本地时间表示。我们将使用UTC以避免我们的测试中出现不同的结果：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">LocalDateTime</span> <span class="token function">localTimeUtc</span><span class="token punctuation">(</span><span class="token class-name">Instant</span> instant<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">LocalDateTime</span><span class="token punctuation">.</span><span class="token function">ofInstant</span><span class="token punctuation">(</span>instant<span class="token punctuation">,</span> <span class="token class-name">ZoneOffset</span><span class="token punctuation">.</span><span class="token constant">UTC</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>**现在，我们可以测试使用错误的精度时，当方法期望特定格式时，可能会导致完全不同的日期。**首先，让我们传递一个我们已知正确日期的纳秒时间戳，但是将其转换为微秒并使用我们之前创建的_fromNanos()_方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenWrongPrecision_whenInstantFromNanos_thenUnexpectedTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">long</span> microseconds <span class="token operator">=</span> <span class="token number">1660663532747420283l</span> <span class="token operator">/</span> <span class="token number">1000</span><span class="token punctuation">;</span>
    <span class="token class-name">Instant</span> instant <span class="token operator">=</span> <span class="token function">fromNanos</span><span class="token punctuation">(</span>microseconds<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> expectedTime <span class="token operator">=</span> <span class="token string">&quot;2022-08-16T15:25:32&quot;</span><span class="token punctuation">;</span>

    <span class="token class-name">LocalDateTime</span> time <span class="token operator">=</span> <span class="token function">localTimeUtc</span><span class="token punctuation">(</span>instant<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertThat</span><span class="token punctuation">(</span><span class="token operator">!</span>time<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">startsWith</span><span class="token punctuation">(</span>expectedTime<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;1970-01-20T05:17:43.532747420&quot;</span><span class="token punctuation">,</span> time<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>当我们使用我们在前一节中创建的_fromTimestamp()_方法时，这个问题不会发生</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenMicroseconds_whenInstantFromTimestamp_thenLocalTimeMatches</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">long</span> microseconds <span class="token operator">=</span> <span class="token number">1660663532747420283l</span> <span class="token operator">/</span> <span class="token number">1000</span><span class="token punctuation">;</span>

    <span class="token class-name">Instant</span> instant <span class="token operator">=</span> <span class="token function">fromTimestamp</span><span class="token punctuation">(</span>microseconds<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> expectedTime <span class="token operator">=</span> <span class="token string">&quot;2022-08-16T15:25:32&quot;</span><span class="token punctuation">;</span>

    <span class="token class-name">LocalDateTime</span> time <span class="token operator">=</span> <span class="token function">localTimeUtc</span><span class="token punctuation">(</span>instant<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertThat</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">startsWith</span><span class="token punctuation">(</span>expectedTime<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们学习了如何使用Java核心类转换时间戳。**然后，我们看到了它们可以有不同的精度级别以及这如何影响我们的结果。**最后，我们创建了一个简单的方法来标准化我们的输入并获得一致的结果。</p><p>如往常一样，源代码可在GitHub上获得。</p>`,42),o=[p];function c(i,l){return s(),a("div",null,o)}const d=n(e,[["render",c],["__file","2024-07-14-Create Date From Unix Timestamp in Java.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-14/2024-07-14-Create%20Date%20From%20Unix%20Timestamp%20in%20Java.html","title":"Java中从Unix时间戳创建日期","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Date and Time"],"tag":["Java","Unix Timestamp","Date Conversion"],"head":[["meta",{"name":"keywords","content":"Java, Unix Timestamp, Date Conversion"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-14/2024-07-14-Create%20Date%20From%20Unix%20Timestamp%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中从Unix时间戳创建日期"}],["meta",{"property":"og:description","content":"Java中从Unix时间戳创建日期 1. 引言 在本快速教程中，我们将学习如何从Unix时间戳解析日期的表示。Unix时间是自1970年1月1日以来经过的秒数。然而，时间戳可以表示到纳秒级的精度。因此，我们将看到可用的工具，并创建一个方法将任何范围的时间戳转换为Java对象。 2. 旧方法（Java 8之前） 在Java 8之前，我们最简单的选择是_日..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-14T13:31:26.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Unix Timestamp"}],["meta",{"property":"article:tag","content":"Date Conversion"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-14T13:31:26.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中从Unix时间戳创建日期\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-14T13:31:26.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中从Unix时间戳创建日期 1. 引言 在本快速教程中，我们将学习如何从Unix时间戳解析日期的表示。Unix时间是自1970年1月1日以来经过的秒数。然而，时间戳可以表示到纳秒级的精度。因此，我们将看到可用的工具，并创建一个方法将任何范围的时间戳转换为Java对象。 2. 旧方法（Java 8之前） 在Java 8之前，我们最简单的选择是_日..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 旧方法（Java 8之前）","slug":"_2-旧方法-java-8之前","link":"#_2-旧方法-java-8之前","children":[]},{"level":2,"title":"3. 新方法（Java 8+）","slug":"_3-新方法-java-8","link":"#_3-新方法-java-8","children":[]},{"level":2,"title":"4. 使用Instant的通用解决方案","slug":"_4-使用instant的通用解决方案","link":"#_4-使用instant的通用解决方案","children":[{"level":3,"title":"4.1. 为_Instant_标准化输入","slug":"_4-1-为-instant-标准化输入","link":"#_4-1-为-instant-标准化输入","children":[]},{"level":3,"title":"4.2. 使用_LocalDateTime_的本地时间","slug":"_4-2-使用-localdatetime-的本地时间","link":"#_4-2-使用-localdatetime-的本地时间","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720963886000,"updatedTime":1720963886000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.17,"words":1251},"filePathRelative":"posts/baeldung/2024-07-14/2024-07-14-Create Date From Unix Timestamp in Java.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>Java中从Unix时间戳创建日期</h1>\\n<h2>1. 引言</h2>\\n<p>在本快速教程中，我们将学习如何从Unix时间戳解析日期的表示。<strong>Unix时间</strong>是自1970年1月1日以来经过的秒数。然而，时间戳可以表示到纳秒级的精度。因此，我们将看到可用的工具，并创建一个方法将任何范围的时间戳转换为Java对象。</p>\\n<h2>2. 旧方法（Java 8之前）</h2>\\n<p>在Java 8之前，我们最简单的选择是_日期(Date)<em>和_日历(Calendar)</em>。_日期_类有一个构造函数，直接接受以毫秒为单位的时间戳：</p>\\n","autoDesc":true}');export{d as comp,k as data};
