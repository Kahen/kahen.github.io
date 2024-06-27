import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as t}from"./app-DnJ2tmUQ.js";const e={},p=t(`<h1 id="java中将时间戳字符串转换为长整型" tabindex="-1"><a class="header-anchor" href="#java中将时间戳字符串转换为长整型"><span>Java中将时间戳字符串转换为长整型</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>在Java编程中，处理时间戳是一个常见的任务，我们可能需要将时间戳字符串转换为长整型值的场景有很多。</p><p><strong>在本教程中，我们将探索不同的方法来帮助我们有效理解和实现转换。</strong></p><h2 id="_2-时间戳概述" tabindex="-1"><a class="header-anchor" href="#_2-时间戳概述"><span>2. 时间戳概述</span></a></h2><p>时间戳通常以各种格式的字符串表示，例如 <em>yyyy-MM-dd HH:mm:ss</em>。此外，将这些时间戳字符串转换为长整型值对于执行Java中的日期和时间相关操作至关重要。</p><p>例如，考虑时间戳字符串2023-11-15 01:02:03，结果的长整型值将是1700010123000L，表示从1970年1月1日00:00:00 GMT到指定日期和时间的毫秒数。</p><h2 id="_3-使用simpledateformat" tabindex="-1"><a class="header-anchor" href="#_3-使用simpledateformat"><span>3. 使用SimpleDateFormat</span></a></h2><p>将时间戳字符串转换为长整型值的传统方法之一是使用SimpleDateFormat类。</p><p>让我们看看以下测试代码：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> timestampString <span class="token operator">=</span> <span class="token string">&quot;2023-11-15 01:02:03&quot;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenSimpleDateFormat_whenFormattingDate_thenConvertToLong</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">ParseException</span> <span class="token punctuation">{</span>
    <span class="token class-name">SimpleDateFormat</span> sdf <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SimpleDateFormat</span><span class="token punctuation">(</span><span class="token string">&quot;yyyy-MM-dd HH:mm:ss&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Date</span> date <span class="token operator">=</span> sdf<span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>timestampString<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">String</span> specifiedDateString <span class="token operator">=</span> sdf<span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span>date<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">long</span> actualTimestamp <span class="token operator">=</span> sdf<span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>specifiedDateString<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">1700010123000L</span><span class="token punctuation">,</span> actualTimestamp<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在提供的代码中，我们使用SimpleDateFormat对象来格式化当前日期时间对象。<strong>特别是，<em>actualTimestamp</em> 是通过使用sdf对象解析输入_timestampString_，然后使用_getTime()_方法提取其毫秒时间。</strong></p><h2 id="_4-使用instant" tabindex="-1"><a class="header-anchor" href="#_4-使用instant"><span>4. 使用Instant</span></a></h2><p>随着Java 8中java.time包的引入，提供了一种线程安全的方法来处理日期和时间操作。Instant类可以用来将时间戳字符串转换为长整型值，如下所示：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenInstantClass_whenGettingTimestamp_thenConvertToLong</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Instant</span> instant <span class="token operator">=</span> <span class="token class-name">LocalDateTime</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>timestampString<span class="token punctuation">,</span> <span class="token class-name">DateTimeFormatter</span><span class="token punctuation">.</span><span class="token function">ofPattern</span><span class="token punctuation">(</span><span class="token string">&quot;yyyy-MM-dd HH:mm:ss&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">atZone</span><span class="token punctuation">(</span><span class="token class-name">ZoneId</span><span class="token punctuation">.</span><span class="token function">systemDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">toInstant</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">long</span> actualTimestamp <span class="token operator">=</span> instant<span class="token punctuation">.</span><span class="token function">toEpochMilli</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">1700010123000L</span><span class="token punctuation">,</span> actualTimestamp<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最初，代码将_timestampString_解析为LocalDateTime对象，使用指定的日期时间模式。然后，它将这个LocalDateTime实例转换为系统默认时区的Instant。方法_toEpochMilli()_被用来从这个Instant中提取毫秒时间戳。</p><h2 id="_5-使用localdatetime" tabindex="-1"><a class="header-anchor" href="#_5-使用localdatetime"><span>5. 使用LocalDateTime</span></a></h2><p>Java 8引入了java.time包，提供了一套全面的类来处理日期和时间。特别是LocalDateTime类可以用来将时间戳字符串转换为长整型值，如下所示：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenJava8DateTime_whenGettingTimestamp_thenConvertToLong</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">LocalDateTime</span> localDateTime <span class="token operator">=</span> <span class="token class-name">LocalDateTime</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>timestampString<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token string">&quot; &quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;T&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">long</span> actualTimestamp <span class="token operator">=</span> localDateTime<span class="token punctuation">.</span><span class="token function">atZone</span><span class="token punctuation">(</span><span class="token class-name">ZoneId</span><span class="token punctuation">.</span><span class="token function">systemDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toInstant</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toEpochMilli</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">1700010123000L</span><span class="token punctuation">,</span> actualTimestamp<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们使用_tZonе(ZonеId.systеmDеfault())_方法将LocalDateTime与_timestampString_关联，从而创建了一个ZonedDateTime对象。接下来，_toInstant()_方法被用来获取ZonedDateTime的Instant表示。最后，_toEpochMilli()_方法被应用来提取毫秒时间戳值。</p><h2 id="_6-使用joda-time" tabindex="-1"><a class="header-anchor" href="#_6-使用joda-time"><span>6. 使用Joda-Time</span></a></h2><p>Joda-Time是Java的一个流行的日期和时间操作库，提供了一个比标准Java日期和时间API更直观的接口。</p><p>让我们探索如何使用Joda-Time将长时间戳转换为格式化的LocalDateTime字符串：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenJodaTime_whenGettingTimestamp_thenConvertToLong</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">DateTime</span> dateTime <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DateTime</span><span class="token punctuation">(</span>timestampInMillis<span class="token punctuation">,</span> <span class="token class-name">DateTimeZone</span><span class="token punctuation">.</span><span class="token constant">UTC</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name"><span class="token namespace">org<span class="token punctuation">.</span>joda<span class="token punctuation">.</span>time<span class="token punctuation">.</span></span>LocalDateTime</span> localDateTime <span class="token operator">=</span> dateTime<span class="token punctuation">.</span><span class="token function">toLocalDateTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name"><span class="token namespace">org<span class="token punctuation">.</span>joda<span class="token punctuation">.</span>time<span class="token punctuation">.</span>format<span class="token punctuation">.</span></span>DateTimeFormatter</span> formatter <span class="token operator">=</span> <span class="token class-name">DateTimeFormat</span><span class="token punctuation">.</span><span class="token function">forPattern</span><span class="token punctuation">(</span><span class="token string">&quot;yyyy-MM-dd HH:mm:ss&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> actualTimestamp <span class="token operator">=</span> formatter<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span>localDateTime<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span>expectedTimestampString<span class="token punctuation">,</span> actualTimestamp<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们从提供的_long_值实例化DateTime对象。此外，DateTimeZone.UTC方法明确定义DateTime对象的时区为协调世界时（UTC）。随后，_toLocalDateTime()_函数无缝地将DateTime对象转换为LocalDateTime对象，保持了时区独立表示。</p><p>最后，我们使用名为_formatter_的DateTimeFormatter将LocalDateTime对象转换为字符串，遵循指定的模式。</p><h2 id="_7-结论" tabindex="-1"><a class="header-anchor" href="#_7-结论"><span>7. 结论</span></a></h2><p>总之，将时间戳字符串转换为长整型值是Java中的一个频繁操作，有多种方法可以完成这项任务。</p><h2 id="如往常一样-本文的完整代码示例可以在github上找到。" tabindex="-1"><a class="header-anchor" href="#如往常一样-本文的完整代码示例可以在github上找到。"><span>如往常一样，本文的完整代码示例可以在GitHub上找到。</span></a></h2>`,30),o=[p];function c(i,l){return s(),n("div",null,o)}const m=a(e,[["render",c],["__file","2024-06-27-Convert Timestamp String to Long in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-06-27/2024-06-27-Convert%20Timestamp%20String%20to%20Long%20in%20Java.html","title":"Java中将时间戳字符串转换为长整型","lang":"zh-CN","frontmatter":{"date":"2024-06-27T00:00:00.000Z","category":["Java","编程"],"tag":["时间戳转换","Java"],"head":[["meta",{"name":"关键词","content":"Java, 时间戳, 长整型, 转换"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-27/2024-06-27-Convert%20Timestamp%20String%20to%20Long%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中将时间戳字符串转换为长整型"}],["meta",{"property":"og:description","content":"Java中将时间戳字符串转换为长整型 1. 引言 在Java编程中，处理时间戳是一个常见的任务，我们可能需要将时间戳字符串转换为长整型值的场景有很多。 在本教程中，我们将探索不同的方法来帮助我们有效理解和实现转换。 2. 时间戳概述 时间戳通常以各种格式的字符串表示，例如 yyyy-MM-dd HH:mm:ss。此外，将这些时间戳字符串转换为长整型值对..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-27T05:51:42.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"时间戳转换"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:published_time","content":"2024-06-27T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-27T05:51:42.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中将时间戳字符串转换为长整型\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-27T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-27T05:51:42.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中将时间戳字符串转换为长整型 1. 引言 在Java编程中，处理时间戳是一个常见的任务，我们可能需要将时间戳字符串转换为长整型值的场景有很多。 在本教程中，我们将探索不同的方法来帮助我们有效理解和实现转换。 2. 时间戳概述 时间戳通常以各种格式的字符串表示，例如 yyyy-MM-dd HH:mm:ss。此外，将这些时间戳字符串转换为长整型值对..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 时间戳概述","slug":"_2-时间戳概述","link":"#_2-时间戳概述","children":[]},{"level":2,"title":"3. 使用SimpleDateFormat","slug":"_3-使用simpledateformat","link":"#_3-使用simpledateformat","children":[]},{"level":2,"title":"4. 使用Instant","slug":"_4-使用instant","link":"#_4-使用instant","children":[]},{"level":2,"title":"5. 使用LocalDateTime","slug":"_5-使用localdatetime","link":"#_5-使用localdatetime","children":[]},{"level":2,"title":"6. 使用Joda-Time","slug":"_6-使用joda-time","link":"#_6-使用joda-time","children":[]},{"level":2,"title":"7. 结论","slug":"_7-结论","link":"#_7-结论","children":[]},{"level":2,"title":"如往常一样，本文的完整代码示例可以在GitHub上找到。","slug":"如往常一样-本文的完整代码示例可以在github上找到。","link":"#如往常一样-本文的完整代码示例可以在github上找到。","children":[]}],"git":{"createdTime":1719467502000,"updatedTime":1719467502000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.08,"words":924},"filePathRelative":"posts/baeldung/2024-06-27/2024-06-27-Convert Timestamp String to Long in Java.md","localizedDate":"2024年6月27日","excerpt":"\\n<h2>1. 引言</h2>\\n<p>在Java编程中，处理时间戳是一个常见的任务，我们可能需要将时间戳字符串转换为长整型值的场景有很多。</p>\\n<p><strong>在本教程中，我们将探索不同的方法来帮助我们有效理解和实现转换。</strong></p>\\n<h2>2. 时间戳概述</h2>\\n<p>时间戳通常以各种格式的字符串表示，例如 <em>yyyy-MM-dd HH:mm:ss</em>。此外，将这些时间戳字符串转换为长整型值对于执行Java中的日期和时间相关操作至关重要。</p>\\n<p>例如，考虑时间戳字符串2023-11-15 01:02:03，结果的长整型值将是1700010123000L，表示从1970年1月1日00:00:00 GMT到指定日期和时间的毫秒数。</p>","autoDesc":true}');export{m as comp,d as data};
