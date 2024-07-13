import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as t}from"./app-BDZ-trJf.js";const e={},o=t(`<h1 id="java中将长时间戳转换为localdatetime" tabindex="-1"><a class="header-anchor" href="#java中将长时间戳转换为localdatetime"><span>Java中将长时间戳转换为LocalDateTime</span></a></h1><p>处理Java中的时间戳是一项常见任务，它使我们能够更有效地操作和显示日期和时间信息，尤其是在处理数据库或外部API时。</p><p>本文教程将探讨如何将长时间戳转换为LocalDateTime对象。</p><h2 id="_2-理解长时间戳和localdatetime" tabindex="-1"><a class="header-anchor" href="#_2-理解长时间戳和localdatetime"><span>2. 理解长时间戳和LocalDateTime</span></a></h2><h3 id="_2-1-长时间戳" tabindex="-1"><a class="header-anchor" href="#_2-1-长时间戳"><span>2.1. 长时间戳</span></a></h3><p>长时间戳表示一个特定的时间点，作为自纪元（epoch）以来的毫秒数。具体来说，它是一个单一值，表示自1970年1月1日以来经过的时间。</p><p>此外，以这种格式处理时间戳对于计算是高效的，但需要转换为可读的日期时间格式，以用于用户交互或显示目的。</p><p>例如，长值1700010123000L代表参考点2023-11-15 01:02:03。</p><h3 id="_2-2-localdatetime" tabindex="-1"><a class="header-anchor" href="#_2-2-localdatetime"><span>2.2. LocalDateTime</span></a></h3><p>java.time包是在Java 8中引入的，提供了一个现代的日期和时间API。LocalDateTime是这个包中的一个类，可以存储和操作不同时区的日期和时间。</p><h2 id="_3-使用instant类" tabindex="-1"><a class="header-anchor" href="#_3-使用instant类"><span>3. 使用Instant类</span></a></h2><p>Instant类表示一个时间点，并且可以很容易地转换为其他日期和时间表示。因此，要将长时间戳转换为LocalDateTime对象，我们可以使用Instant类，如下所示：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">long</span> timestampInMillis <span class="token operator">=</span> <span class="token number">1700010123000L</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> expectedTimestampString <span class="token operator">=</span> <span class="token string">&quot;2023-11-15 01:02:03&quot;</span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenTimestamp_whenConvertingToLocalDateTime_thenConvertSuccessfully</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Instant</span> instant <span class="token operator">=</span> <span class="token class-name">Instant</span><span class="token punctuation">.</span><span class="token function">ofEpochMilli</span><span class="token punctuation">(</span>timestampInMillis<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">LocalDateTime</span> localDateTime <span class="token operator">=</span>
      <span class="token class-name">LocalDateTime</span><span class="token punctuation">.</span><span class="token function">ofInstant</span><span class="token punctuation">(</span>instant<span class="token punctuation">,</span> <span class="token class-name">ZoneId</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;UTC&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">DateTimeFormatter</span> formatter <span class="token operator">=</span> <span class="token class-name">DateTimeFormatter</span><span class="token punctuation">.</span><span class="token function">ofPattern</span><span class="token punctuation">(</span><span class="token string">&quot;yyyy-MM-dd HH:mm:ss&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> formattedDateTime <span class="token operator">=</span> localDateTime<span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span>formatter<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span>expectedTimestampString<span class="token punctuation">,</span> formattedDateTime<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的测试方法中，我们使用1700010123000L初始化长变量timestampInMillis。此外，我们使用Instant.ofEpochMilli(timestampInMillis)方法将长时间戳转换为Instant。</p><p>随后，LocalDateTime.ofInstant(instant, ZoneId.of(&quot;UTC&quot;))方法使用UTC时区将Instant转换为LocalDateTime。</p><h2 id="_4-使用joda-time" tabindex="-1"><a class="header-anchor" href="#_4-使用joda-time"><span>4. 使用Joda-Time</span></a></h2><p>Joda-Time是Java的一个流行的日期和时间操作库，提供了一个比标准Java日期和时间API更直观的接口。</p><p>让我们探索如何使用Joda-Time将长时间戳转换为格式化的LocalDateTime字符串：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenJodaTime_whenGettingTimestamp_thenConvertToLong</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">DateTime</span> dateTime <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DateTime</span><span class="token punctuation">(</span>timestampInMillis<span class="token punctuation">,</span> <span class="token class-name">DateTimeZone</span><span class="token punctuation">.</span><span class="token constant">UTC</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name"><span class="token namespace">org<span class="token punctuation">.</span>joda<span class="token punctuation">.</span>time<span class="token punctuation">.</span></span>LocalDateTime</span> localDateTime <span class="token operator">=</span> dateTime<span class="token punctuation">.</span><span class="token function">toLocalDateTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name"><span class="token namespace">org<span class="token punctuation">.</span>joda<span class="token punctuation">.</span>time<span class="token punctuation">.</span>format<span class="token punctuation">.</span></span>DateTimeFormatter</span> formatter <span class="token operator">=</span> <span class="token class-name">DateTimeFormat</span><span class="token punctuation">.</span><span class="token function">forPattern</span><span class="token punctuation">(</span><span class="token string">&quot;yyyy-MM-dd HH:mm:ss&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> actualTimestamp <span class="token operator">=</span> formatter<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span>localDateTime<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span>expectedTimestampString<span class="token punctuation">,</span> actualTimestamp<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们从提供的长值实例化DateTime对象。此外，DateTimeZone.UTC方法显式地将DateTime对象的时区定义为协调世界时（UTC）。随后，toLocalDateTime()函数无缝地将DateTime对象转换为LocalDateTime对象，保持时区独立表示。</p><p>最后，我们使用名为formatter的DateTimeFormatter将LocalDateTime对象转换为字符串，遵循指定的模式。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>总之，将长时间戳转换为Java中的LocalDateTime对象的过程涉及使用Instant类来准确表示时间。允许有效地操作和显示日期和时间信息，确保与数据库或外部API的无缝交互。</p><p>如常，本文的完整代码示例可以在GitHub上找到。</p>`,24),p=[o];function i(c,l){return s(),n("div",null,p)}const r=a(e,[["render",i],["__file","2024-06-26-Convert Long Timestamp to LocalDateTime in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-06-26/2024-06-26-Convert%20Long%20Timestamp%20to%20LocalDateTime%20in%20Java.html","title":"Java中将长时间戳转换为LocalDateTime","lang":"zh-CN","frontmatter":{"date":"2024-06-27T00:00:00.000Z","category":["Java","LocalDateTime"],"tag":["Long Timestamp","Convert"],"head":[["meta",{"name":"keywords","content":"Java, LocalDateTime, Convert, Long Timestamp"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-26/2024-06-26-Convert%20Long%20Timestamp%20to%20LocalDateTime%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中将长时间戳转换为LocalDateTime"}],["meta",{"property":"og:description","content":"Java中将长时间戳转换为LocalDateTime 处理Java中的时间戳是一项常见任务，它使我们能够更有效地操作和显示日期和时间信息，尤其是在处理数据库或外部API时。 本文教程将探讨如何将长时间戳转换为LocalDateTime对象。 2. 理解长时间戳和LocalDateTime 2.1. 长时间戳 长时间戳表示一个特定的时间点，作为自纪元（e..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-26T19:50:58.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Long Timestamp"}],["meta",{"property":"article:tag","content":"Convert"}],["meta",{"property":"article:published_time","content":"2024-06-27T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-26T19:50:58.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中将长时间戳转换为LocalDateTime\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-27T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-26T19:50:58.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中将长时间戳转换为LocalDateTime 处理Java中的时间戳是一项常见任务，它使我们能够更有效地操作和显示日期和时间信息，尤其是在处理数据库或外部API时。 本文教程将探讨如何将长时间戳转换为LocalDateTime对象。 2. 理解长时间戳和LocalDateTime 2.1. 长时间戳 长时间戳表示一个特定的时间点，作为自纪元（e..."},"headers":[{"level":2,"title":"2. 理解长时间戳和LocalDateTime","slug":"_2-理解长时间戳和localdatetime","link":"#_2-理解长时间戳和localdatetime","children":[{"level":3,"title":"2.1. 长时间戳","slug":"_2-1-长时间戳","link":"#_2-1-长时间戳","children":[]},{"level":3,"title":"2.2. LocalDateTime","slug":"_2-2-localdatetime","link":"#_2-2-localdatetime","children":[]}]},{"level":2,"title":"3. 使用Instant类","slug":"_3-使用instant类","link":"#_3-使用instant类","children":[]},{"level":2,"title":"4. 使用Joda-Time","slug":"_4-使用joda-time","link":"#_4-使用joda-time","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1719431458000,"updatedTime":1719431458000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.42,"words":726},"filePathRelative":"posts/baeldung/2024-06-26/2024-06-26-Convert Long Timestamp to LocalDateTime in Java.md","localizedDate":"2024年6月27日","excerpt":"\\n<p>处理Java中的时间戳是一项常见任务，它使我们能够更有效地操作和显示日期和时间信息，尤其是在处理数据库或外部API时。</p>\\n<p>本文教程将探讨如何将长时间戳转换为LocalDateTime对象。</p>\\n<h2>2. 理解长时间戳和LocalDateTime</h2>\\n<h3>2.1. 长时间戳</h3>\\n<p>长时间戳表示一个特定的时间点，作为自纪元（epoch）以来的毫秒数。具体来说，它是一个单一值，表示自1970年1月1日以来经过的时间。</p>\\n<p>此外，以这种格式处理时间戳对于计算是高效的，但需要转换为可读的日期时间格式，以用于用户交互或显示目的。</p>\\n<p>例如，长值1700010123000L代表参考点2023-11-15 01:02:03。</p>","autoDesc":true}');export{r as comp,d as data};
