import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-uizvaz9h.js";const e={},p=t(`<h1 id="java中将日期转换为unix时间戳" tabindex="-1"><a class="header-anchor" href="#java中将日期转换为unix时间戳"><span>Java中将日期转换为Unix时间戳</span></a></h1><p>在计算机科学中，Unix时间戳，也称为纪元时间，是一种标准的表示特定时间点的方式。它表示自1970年1月1日以来经过的秒数。</p><p>本教程将介绍如何将传统日期转换为Unix时间戳。首先，我们将探讨如何使用内置的JDK方法来实现这一点。然后，我们将展示如何使用Joda-Time等外部库来达到相同的目标。</p><h2 id="_2-使用java-8-日期时间api" tabindex="-1"><a class="header-anchor" href="#_2-使用java-8-日期时间api"><span>2. 使用Java 8+日期时间API</span></a></h2><p>Java 8引入了一个新的日期时间API，我们可以使用它来回答我们的核心问题。这个新API带有几种方法和类来操作日期。那么，让我们仔细看看每个选项。</p><h3 id="_2-1-使用instant类" tabindex="-1"><a class="header-anchor" href="#_2-1-使用instant类"><span>2.1. 使用Instant类</span></a></h3><p>简而言之，Instant类模拟了时间线上的一个瞬时点。<strong>这个类提供了一个直接且简洁的方法来从给定的日期获取Unix时间</strong>。</p><p>让我们看看它在实际中的应用：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenDate_whenUsingInstantClass_thenConvertToUnixTimeStamp</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Instant</span> givenDate <span class="token operator">=</span> <span class="token class-name">Instant</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span><span class="token string">&quot;2020-09-08T12:16:40Z&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">1599567400L</span><span class="token punctuation">,</span> givenDate<span class="token punctuation">.</span><span class="token function">getEpochSecond</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如我们所见，Instant类提供了getEpochSecond()方法，可以从指定的日期获取自纪元以来的秒数。</p><h3 id="_2-2-使用localdatetime类" tabindex="-1"><a class="header-anchor" href="#_2-2-使用localdatetime类"><span>2.2. 使用LocalDateTime类</span></a></h3><p>LocalDateTime是另一个在转换日期为纪元时间时可以考虑的选项。这个类表示日期和时间的组合，通常被视为年、月、日、小时、分钟和秒。</p><p><strong>通常，这个类提供了toEpochSecond()方法来从指定的日期时间获取纪元时间的秒数</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenDate_whenUsingLocalDateTimeClass_thenConvertToUnixTimeStamp</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">LocalDateTime</span> givenDate <span class="token operator">=</span> <span class="token class-name">LocalDateTime</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token number">2023</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">19</span><span class="token punctuation">,</span> <span class="token number">22</span><span class="token punctuation">,</span> <span class="token number">45</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">1697755500L</span><span class="token punctuation">,</span> givenDate<span class="token punctuation">.</span><span class="token function">toEpochSecond</span><span class="token punctuation">(</span><span class="token class-name">ZoneOffset</span><span class="token punctuation">.</span><span class="token constant">UTC</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上所示，与其他方法不同，toEpochSecond()接受一个ZoneOffset对象，这允许我们定义时区的固定偏移量，UTC。</p><h2 id="_3-使用旧版日期api" tabindex="-1"><a class="header-anchor" href="#_3-使用旧版日期api"><span>3. 使用旧版日期API</span></a></h2><p>或者，我们可以使用旧版API中的Date和Calendar类来实现相同的结果。那么，让我们深入探索并看看如何在实践中使用它们。</p><h3 id="_3-1-使用date类" tabindex="-1"><a class="header-anchor" href="#_3-1-使用date类"><span>3.1. 使用Date类</span></a></h3><p>在Java中，Date类以毫秒精度表示一个特定的时间点。<strong>它提供了将日期转换为Unix时间戳的最简单方法之一，通过getTime()方法</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenDate_whenUsingDateClass_thenConvertToUnixTimeStamp</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">ParseException</span> <span class="token punctuation">{</span>
    <span class="token class-name">SimpleDateFormat</span> dateFormat <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SimpleDateFormat</span><span class="token punctuation">(</span><span class="token string">&quot;yyyy-MM-dd HH:mm:ss&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    dateFormat<span class="token punctuation">.</span><span class="token function">setTimeZone</span><span class="token punctuation">(</span><span class="token class-name">TimeZone</span><span class="token punctuation">.</span><span class="token function">getTimeZone</span><span class="token punctuation">(</span><span class="token string">&quot;UTC&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Date</span> givenDate <span class="token operator">=</span> dateFormat<span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span><span class="token string">&quot;2023-10-15 22:00:00&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">1697407200L</span><span class="token punctuation">,</span> givenDate<span class="token punctuation">.</span><span class="token function">getTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通常，该方法返回自纪元以来的毫秒数。如我们所见，我们将结果除以1000以获得秒数。<strong>然而，这个类被认为是过时的，并且在处理日期时不应该使用</strong>。</p><h3 id="_3-2-使用calendar类" tabindex="-1"><a class="header-anchor" href="#_3-2-使用calendar类"><span>3.2. 使用Calendar类</span></a></h3><p>同样，我们可以使用同一包java.util中的Calendar类。这个类提供了许多设置和操作日期的方法。</p><p><strong>使用Calendar，我们必须调用getTimeInMillis()来返回指定日期的Unix时间</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenDate_whenUsingCalendarClass_thenConvertToUnixTimeStamp</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">ParseException</span> <span class="token punctuation">{</span>
    <span class="token class-name">Calendar</span> calendar <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">GregorianCalendar</span><span class="token punctuation">(</span><span class="token number">2023</span><span class="token punctuation">,</span> <span class="token class-name">Calendar</span><span class="token punctuation">.</span><span class="token constant">OCTOBER</span><span class="token punctuation">,</span> <span class="token number">17</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    calendar<span class="token punctuation">.</span><span class="token function">setTimeZone</span><span class="token punctuation">(</span><span class="token class-name">TimeZone</span><span class="token punctuation">.</span><span class="token function">getTimeZone</span><span class="token punctuation">(</span><span class="token string">&quot;UTC&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">1697500800L</span><span class="token punctuation">,</span> calendar<span class="token punctuation">.</span><span class="token function">getTimeInMillis</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>请注意，这个方法顾名思义，返回以毫秒为单位的时间戳。<strong>选择这种方法的缺点是，Calendar自旧版API以来被宣布为事实上的遗留</strong>。</p><h2 id="_4-使用joda-time" tabindex="-1"><a class="header-anchor" href="#_4-使用joda-time"><span>4. 使用Joda-Time</span></a></h2><p>另一种解决方案是使用Joda-Time库。在开始使用库之前，让我们将它的依赖项添加到pom.xml中：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`joda-time\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`joda-time\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\`2.12.6\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\`
\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Joda-Time提供了它自己的Instant类版本，我们可以使用它来解决我们的挑战</strong>。那么，让我们通过一个新的测试用例来说明如何使用这个类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenDate_whenUsingJodaTimeInstantClass_thenConvertToUnixTimeStamp</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name"><span class="token namespace">org<span class="token punctuation">.</span>joda<span class="token punctuation">.</span>time<span class="token punctuation">.</span></span>Instant</span> givenDate <span class="token operator">=</span> <span class="token class-name"><span class="token namespace">org<span class="token punctuation">.</span>joda<span class="token punctuation">.</span>time<span class="token punctuation">.</span></span>Instant</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span><span class="token string">&quot;2020-09-08T12:16:40Z&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">1599567400L</span><span class="token punctuation">,</span> givenDate<span class="token punctuation">.</span><span class="token function">getMillis</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>所示，Instant类提供了一个直接的方法来获取自纪元以来的毫秒数。</p><p><strong>DateTime类是在使用Joda-Time时考虑的另一个解决方案</strong>。它提供了getMillis()方法来返回DateTime瞬间自纪元以来的毫秒数：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenDate_whenUsingJodaTimeDateTimeClass_thenConvertToUnixTimeStamp</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">DateTime</span> givenDate <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DateTime</span><span class="token punctuation">(</span><span class="token string">&quot;2020-09-08T12:16:40Z&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">1599567400L</span><span class="token punctuation">,</span> givenDate<span class="token punctuation">.</span><span class="token function">getMillis</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>毫不意外，测试用例成功通过。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在这篇短文中，我们探讨了将给定日期转换为Unix时间戳的不同方法。</p><p>首先，我们解释了如何使用核心JDK方法和类来实现这一点。然后，我们展示了如何使用Joda-Time来达到相同的目标。</p><p>如往常一样，本文中使用的代码可以在GitHub上找到。</p>`,39),o=[p];function c(i,l){return s(),a("div",null,o)}const d=n(e,[["render",c],["__file","2024-06-22-Convert Date to Unix Timestamp in Java.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-06-22/2024-06-22-Convert%20Date%20to%20Unix%20Timestamp%20in%20Java.html","title":"Java中将日期转换为Unix时间戳","lang":"zh-CN","frontmatter":{"date":"2024-06-23T00:00:00.000Z","category":["Java","Date-Time"],"tag":["Unix Timestamp","Java 8"],"head":[["meta",{"name":"keywords","content":"Java, Unix Timestamp, Date-Time API, Conversion"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-22/2024-06-22-Convert%20Date%20to%20Unix%20Timestamp%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中将日期转换为Unix时间戳"}],["meta",{"property":"og:description","content":"Java中将日期转换为Unix时间戳 在计算机科学中，Unix时间戳，也称为纪元时间，是一种标准的表示特定时间点的方式。它表示自1970年1月1日以来经过的秒数。 本教程将介绍如何将传统日期转换为Unix时间戳。首先，我们将探讨如何使用内置的JDK方法来实现这一点。然后，我们将展示如何使用Joda-Time等外部库来达到相同的目标。 2. 使用Java..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-22T20:27:43.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Unix Timestamp"}],["meta",{"property":"article:tag","content":"Java 8"}],["meta",{"property":"article:published_time","content":"2024-06-23T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-22T20:27:43.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中将日期转换为Unix时间戳\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-23T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-22T20:27:43.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中将日期转换为Unix时间戳 在计算机科学中，Unix时间戳，也称为纪元时间，是一种标准的表示特定时间点的方式。它表示自1970年1月1日以来经过的秒数。 本教程将介绍如何将传统日期转换为Unix时间戳。首先，我们将探讨如何使用内置的JDK方法来实现这一点。然后，我们将展示如何使用Joda-Time等外部库来达到相同的目标。 2. 使用Java..."},"headers":[{"level":2,"title":"2. 使用Java 8+日期时间API","slug":"_2-使用java-8-日期时间api","link":"#_2-使用java-8-日期时间api","children":[{"level":3,"title":"2.1. 使用Instant类","slug":"_2-1-使用instant类","link":"#_2-1-使用instant类","children":[]},{"level":3,"title":"2.2. 使用LocalDateTime类","slug":"_2-2-使用localdatetime类","link":"#_2-2-使用localdatetime类","children":[]}]},{"level":2,"title":"3. 使用旧版日期API","slug":"_3-使用旧版日期api","link":"#_3-使用旧版日期api","children":[{"level":3,"title":"3.1. 使用Date类","slug":"_3-1-使用date类","link":"#_3-1-使用date类","children":[]},{"level":3,"title":"3.2. 使用Calendar类","slug":"_3-2-使用calendar类","link":"#_3-2-使用calendar类","children":[]}]},{"level":2,"title":"4. 使用Joda-Time","slug":"_4-使用joda-time","link":"#_4-使用joda-time","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1719088063000,"updatedTime":1719088063000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.73,"words":1120},"filePathRelative":"posts/baeldung/2024-06-22/2024-06-22-Convert Date to Unix Timestamp in Java.md","localizedDate":"2024年6月23日","excerpt":"\\n<p>在计算机科学中，Unix时间戳，也称为纪元时间，是一种标准的表示特定时间点的方式。它表示自1970年1月1日以来经过的秒数。</p>\\n<p>本教程将介绍如何将传统日期转换为Unix时间戳。首先，我们将探讨如何使用内置的JDK方法来实现这一点。然后，我们将展示如何使用Joda-Time等外部库来达到相同的目标。</p>\\n<h2>2. 使用Java 8+日期时间API</h2>\\n<p>Java 8引入了一个新的日期时间API，我们可以使用它来回答我们的核心问题。这个新API带有几种方法和类来操作日期。那么，让我们仔细看看每个选项。</p>\\n<h3>2.1. 使用Instant类</h3>\\n","autoDesc":true}');export{d as comp,k as data};
