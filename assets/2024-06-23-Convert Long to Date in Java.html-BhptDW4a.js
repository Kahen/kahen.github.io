import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-CPbsBEaw.js";const e={},p=t(`<h1 id="java中将long值转换为日期" tabindex="-1"><a class="header-anchor" href="#java中将long值转换为日期"><span>Java中将long值转换为日期</span></a></h1><p>在Java中处理日期时，我们经常看到日期/时间值以_long_值的形式表示，它表示自纪元（1970年1月1日，00:00:00 GMT）以来的天数、秒数或毫秒数。</p><p>在这个简短的教程中，我们将探索将_long_值转换为Java中的日期的不同方法。首先，我们将解释如何使用核心JDK类来完成这项操作。然后，我们将展示如何使用第三方Joda-Time库来实现相同的目标。</p><h2 id="_2-使用java-8-的日期时间api" tabindex="-1"><a class="header-anchor" href="#_2-使用java-8-的日期时间api"><span>2. 使用Java 8+的日期时间API</span></a></h2><p>Java 8因其引入的新的日期时间API而受到赞誉。这个API主要是为了覆盖旧日期API的缺点。那么，让我们仔细看看这个API为我们的中心问题提供了什么。</p><h3 id="_2-1-使用-instant-类" tabindex="-1"><a class="header-anchor" href="#_2-1-使用-instant-类"><span>2.1. 使用_Instant_类</span></a></h3><p>最简单的解决方案是使用Java 8新日期时间API中引入的_Instant_类。<strong>这个类描述了时间线上的一个单一瞬时点</strong>。</p><p>让我们在实践中看看：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenLongValue_whenUsingInstantClass_thenConvert</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Instant</span> expectedDate <span class="token operator">=</span> <span class="token class-name">Instant</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span><span class="token string">&quot;2020-09-08T12:16:40Z&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">long</span> seconds <span class="token operator">=</span> <span class="token number">1599567400L</span><span class="token punctuation">;</span>

    <span class="token class-name">Instant</span> date <span class="token operator">=</span> <span class="token class-name">Instant</span><span class="token punctuation">.</span><span class="token function">ofEpochSecond</span><span class="token punctuation">(</span>seconds<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span>expectedDate<span class="token punctuation">,</span> date<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上所示，我们使用_ofEpochSecond()_方法创建了_Instant_类的对象。请注意，我们也可以使用方法_ofEpochMilli()_使用毫秒创建_Instant_实例。</p><h3 id="_2-2-使用-localdate-类" tabindex="-1"><a class="header-anchor" href="#_2-2-使用-localdate-类"><span>2.2. 使用_LocalDate_类</span></a></h3><p>_LocalDate_是另一个在转换_long_值为日期时需要考虑的选项。这个类模拟了一个经典的日期，例如2023-10-17，没有时间细节。</p><p>通常，我们可以使用_LocalDate#ofEpochDay_方法来实现我们的目标：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenLongValue_whenUsingLocalDateClass_thenConvert</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">LocalDate</span> expectedDate <span class="token operator">=</span> <span class="token class-name">LocalDate</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token number">2023</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">17</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">long</span> epochDay <span class="token operator">=</span> <span class="token number">19647L</span><span class="token punctuation">;</span>

    <span class="token class-name">LocalDate</span> date <span class="token operator">=</span> <span class="token class-name">LocalDate</span><span class="token punctuation">.</span><span class="token function">ofEpochDay</span><span class="token punctuation">(</span>epochDay<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span>expectedDate<span class="token punctuation">,</span> date<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>_ofEpochDay()_方法根据给定的纪元日创建了_LocalDate_类的实例。</p><h2 id="_3-使用旧版日期api" tabindex="-1"><a class="header-anchor" href="#_3-使用旧版日期api"><span>3. 使用旧版日期API</span></a></h2><p>在Java 8之前，我们通常会使用java.util包中的_Date_或_Calendar_类来实现我们的目标。那么，让我们看看如何使用这两个类将_long_值转换为日期。</p><h3 id="_3-1-使用-date-类" tabindex="-1"><a class="header-anchor" href="#_3-1-使用-date-类"><span>3.1. 使用_Date_类</span></a></h3><p>_Date_类表示具有毫秒精度的特定时间瞬间。顾名思义，它带有我们可以用于操作日期的大量方法。<strong>它提供了将_long_值转换为日期的最简单方式，因为它提供了一个接受_long_类型参数的重载构造函数</strong>。</p><p>让我们在实践中看看：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenLongValue_whenUsingDateClass_thenConvert</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">SimpleDateFormat</span> dateFormat <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SimpleDateFormat</span><span class="token punctuation">(</span><span class="token string">&quot;yyyy-MM-dd HH:mm:ss&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    dateFormat<span class="token punctuation">.</span><span class="token function">setTimeZone</span><span class="token punctuation">(</span><span class="token class-name">TimeZone</span><span class="token punctuation">.</span><span class="token function">getTimeZone</span><span class="token punctuation">(</span><span class="token string">&quot;UTC&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Date</span> expectedDate <span class="token operator">=</span> dateFormat<span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span><span class="token string">&quot;2023-10-15 22:00:00&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">long</span> milliseconds <span class="token operator">=</span> <span class="token number">1689458400000L</span><span class="token punctuation">;</span>

    <span class="token class-name">Date</span> date <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span>milliseconds<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span>expectedDate<span class="token punctuation">,</span> date<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>请注意，_Date_类已经过时，属于旧API。因此，当处理日期时，这不是最好的方法。</p><h3 id="_3-2-使用-calendar-类" tabindex="-1"><a class="header-anchor" href="#_3-2-使用-calendar-类"><span>3.2. 使用_Calendar_类</span></a></h3><p>另一个解决方案是使用旧日期API中的_Calendar_类。<strong>这个类提供了_setTimeInMillis(long value)_方法，我们可以使用它将时间设置为给定的_long_值</strong>。</p><p>现在，让我们用另一个测试案例来说明这个方法的使用：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenLongValue_whenUsingCalendarClass_thenConvert</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">SimpleDateFormat</span> dateFormat <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SimpleDateFormat</span><span class="token punctuation">(</span><span class="token string">&quot;yyyy-MM-dd HH:mm:ss&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    dateFormat<span class="token punctuation">.</span><span class="token function">setTimeZone</span><span class="token punctuation">(</span><span class="token class-name">TimeZone</span><span class="token punctuation">.</span><span class="token function">getTimeZone</span><span class="token punctuation">(</span><span class="token string">&quot;UTC&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Date</span> expectedDate <span class="token operator">=</span> dateFormat<span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span><span class="token string">&quot;2023-07-15 22:00:00&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">long</span> milliseconds <span class="token operator">=</span> <span class="token number">1689458400000L</span><span class="token punctuation">;</span>

    <span class="token class-name">Calendar</span> calendar <span class="token operator">=</span> <span class="token class-name">Calendar</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    calendar<span class="token punctuation">.</span><span class="token function">setTimeZone</span><span class="token punctuation">(</span><span class="token class-name">TimeZone</span><span class="token punctuation">.</span><span class="token function">getTimeZone</span><span class="token punctuation">(</span><span class="token string">&quot;UTC&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    calendar<span class="token punctuation">.</span><span class="token function">setTimeInMillis</span><span class="token punctuation">(</span>milliseconds<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span>expectedDate<span class="token punctuation">,</span> calendar<span class="token punctuation">.</span><span class="token function">getTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同样，指定的_long_值表示自纪元以来经过的毫秒数。</p><h2 id="_4-使用joda-time" tabindex="-1"><a class="header-anchor" href="#_4-使用joda-time"><span>4. 使用Joda-Time</span></a></h2><p>最后，我们可以使用Joda-Time库来解决我们的挑战。首先，让我们将它的依赖项添加到_pom.xml_文件中：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`joda-time\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`joda-time\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\`2.12.5\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\`
\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同样，Joda-Time提供了它自己的_LocalDate_类版本。那么，让我们看看如何使用它将_long_值转换为_LocalDate_对象：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenLongValue_whenUsingJodaTimeLocalDateClass_thenConvert</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name"><span class="token namespace">org<span class="token punctuation">.</span>joda<span class="token punctuation">.</span>time<span class="token punctuation">.</span></span>LocalDate</span> expectedDate <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name"><span class="token namespace">org<span class="token punctuation">.</span>joda<span class="token punctuation">.</span>time<span class="token punctuation">.</span></span>LocalDate</span><span class="token punctuation">(</span><span class="token number">2023</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">15</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">long</span> milliseconds <span class="token operator">=</span> <span class="token number">1689458400000L</span><span class="token punctuation">;</span>

    <span class="token class-name"><span class="token namespace">org<span class="token punctuation">.</span>joda<span class="token punctuation">.</span>time<span class="token punctuation">.</span></span>LocalDate</span> date <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name"><span class="token namespace">org<span class="token punctuation">.</span>joda<span class="token punctuation">.</span>time<span class="token punctuation">.</span></span>LocalDate</span><span class="token punctuation">(</span>milliseconds<span class="token punctuation">,</span> <span class="token class-name">DateTimeZone</span><span class="token punctuation">.</span><span class="token constant">UTC</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span>expectedDate<span class="token punctuation">,</span> date<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如所展示的，_LocalDate_提供了一种直接从_long_值构造日期的方法。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在这篇短文中，我们详细解释了如何在Java中将_long_值转换为日期。</p><p>首先，我们看到了如何使用内置的JDK类来进行转换。然后，我们展示了如何使用Joda-Time库来实现相同的目标。</p><p>正如往常一样，本文中使用的代码可以在GitHub上找到。</p>`,37),o=[p];function c(l,i){return s(),a("div",null,o)}const r=n(e,[["render",c],["__file","2024-06-23-Convert Long to Date in Java.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-06-23/2024-06-23-Convert%20Long%20to%20Date%20in%20Java.html","title":"Java中将long值转换为日期","lang":"zh-CN","frontmatter":{"date":"2024-06-23T00:00:00.000Z","category":["Java","日期时间"],"tag":["Java","日期转换","Instant","LocalDate","Joda-Time"],"head":[["meta",{"name":"keywords","content":"Java日期转换，时间戳转换，Instant，LocalDate，Joda-Time"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-23/2024-06-23-Convert%20Long%20to%20Date%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中将long值转换为日期"}],["meta",{"property":"og:description","content":"Java中将long值转换为日期 在Java中处理日期时，我们经常看到日期/时间值以_long_值的形式表示，它表示自纪元（1970年1月1日，00:00:00 GMT）以来的天数、秒数或毫秒数。 在这个简短的教程中，我们将探索将_long_值转换为Java中的日期的不同方法。首先，我们将解释如何使用核心JDK类来完成这项操作。然后，我们将展示如何使用..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-23T08:49:29.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"日期转换"}],["meta",{"property":"article:tag","content":"Instant"}],["meta",{"property":"article:tag","content":"LocalDate"}],["meta",{"property":"article:tag","content":"Joda-Time"}],["meta",{"property":"article:published_time","content":"2024-06-23T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-23T08:49:29.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中将long值转换为日期\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-23T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-23T08:49:29.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中将long值转换为日期 在Java中处理日期时，我们经常看到日期/时间值以_long_值的形式表示，它表示自纪元（1970年1月1日，00:00:00 GMT）以来的天数、秒数或毫秒数。 在这个简短的教程中，我们将探索将_long_值转换为Java中的日期的不同方法。首先，我们将解释如何使用核心JDK类来完成这项操作。然后，我们将展示如何使用..."},"headers":[{"level":2,"title":"2. 使用Java 8+的日期时间API","slug":"_2-使用java-8-的日期时间api","link":"#_2-使用java-8-的日期时间api","children":[{"level":3,"title":"2.1. 使用_Instant_类","slug":"_2-1-使用-instant-类","link":"#_2-1-使用-instant-类","children":[]},{"level":3,"title":"2.2. 使用_LocalDate_类","slug":"_2-2-使用-localdate-类","link":"#_2-2-使用-localdate-类","children":[]}]},{"level":2,"title":"3. 使用旧版日期API","slug":"_3-使用旧版日期api","link":"#_3-使用旧版日期api","children":[{"level":3,"title":"3.1. 使用_Date_类","slug":"_3-1-使用-date-类","link":"#_3-1-使用-date-类","children":[]},{"level":3,"title":"3.2. 使用_Calendar_类","slug":"_3-2-使用-calendar-类","link":"#_3-2-使用-calendar-类","children":[]}]},{"level":2,"title":"4. 使用Joda-Time","slug":"_4-使用joda-time","link":"#_4-使用joda-time","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1719132569000,"updatedTime":1719132569000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.57,"words":1071},"filePathRelative":"posts/baeldung/2024-06-23/2024-06-23-Convert Long to Date in Java.md","localizedDate":"2024年6月23日","excerpt":"\\n<p>在Java中处理日期时，我们经常看到日期/时间值以_long_值的形式表示，它表示自纪元（1970年1月1日，00:00:00 GMT）以来的天数、秒数或毫秒数。</p>\\n<p>在这个简短的教程中，我们将探索将_long_值转换为Java中的日期的不同方法。首先，我们将解释如何使用核心JDK类来完成这项操作。然后，我们将展示如何使用第三方Joda-Time库来实现相同的目标。</p>\\n<h2>2. 使用Java 8+的日期时间API</h2>\\n<p>Java 8因其引入的新的日期时间API而受到赞誉。这个API主要是为了覆盖旧日期API的缺点。那么，让我们仔细看看这个API为我们的中心问题提供了什么。</p>","autoDesc":true}');export{r as comp,k as data};
