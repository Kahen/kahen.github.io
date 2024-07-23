import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as e}from"./app-on0L14Tx.js";const t={},p=e(`<h1 id="如何使用java中的localdate确定一周的第一天" tabindex="-1"><a class="header-anchor" href="#如何使用java中的localdate确定一周的第一天"><span>如何使用Java中的LocalDate确定一周的第一天</span></a></h1><p>在这篇简短的教程中，我们将讨论如何使用Java中的LocalDate输入来找到一周的第一天。</p><h2 id="_2-问题陈述" tabindex="-1"><a class="header-anchor" href="#_2-问题陈述"><span>2. 问题陈述</span></a></h2><p>我们经常需要找到一周的第一天来为业务逻辑建立一周的边界，例如为员工构建时间跟踪系统。</p><p>在Java 8之前，JodaTime库被用来找到一周的第一天。然而，在Java 8之后，不再提供相同的支持。因此，我们将看到如何使用java.time.LocalDate类提供的功能来找到一周的第一天。</p><h2 id="_3-calendar类" tabindex="-1"><a class="header-anchor" href="#_3-calendar类"><span>3. Calendar类</span></a></h2><p>我们可以使用java.util.Calendar类来追溯到一周中的某一天。首先，我们可以循环到我们定义的一周的开始（星期日/星期一）。</p><p>让我们为同样的目的设置Calendar类的实例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Calendar</span> calendar <span class="token operator">=</span> <span class="token class-name">Calendar</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">ZoneId</span> zoneId <span class="token operator">=</span> <span class="token class-name">ZoneId</span><span class="token punctuation">.</span><span class="token function">systemDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Date</span> date <span class="token operator">=</span> <span class="token class-name">Date</span><span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span>localDate<span class="token punctuation">.</span><span class="token function">atStartOfDay</span><span class="token punctuation">(</span>zoneId<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toInstant</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
calendar<span class="token punctuation">.</span><span class="token function">setTime</span><span class="token punctuation">(</span>date<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一旦日历对象设置好，我们必须确定一周的第一天作为一个固定的日子。它可以是星期一，根据ISO标准，或者是星期日，正如世界上许多国家（例如美国）所遵循的。我们可以继续循环直到我们到达我们确定的一周的第一天：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">while</span> <span class="token punctuation">(</span>calendar<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token class-name">Calendar</span><span class="token punctuation">.</span><span class="token constant">DAY_OF_WEEK</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token class-name">Calendar</span><span class="token punctuation">.</span><span class="token constant">MONDAY</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    calendar<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token class-name">Calendar</span><span class="token punctuation">.</span><span class="token constant">DATE</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以看到，每次减去一天直到我们到达星期一，这有助于我们检索一周的第一天的日期。Calendar.MONDAY是在Calendar类中定义的一个常量。现在我们可以将日历日期转换为java.time.LocalDate：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">LocalDateTime</span><span class="token punctuation">.</span><span class="token function">ofInstant</span><span class="token punctuation">(</span>calendar<span class="token punctuation">.</span><span class="token function">toInstant</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> calendar<span class="token punctuation">.</span><span class="token function">getTimeZone</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toZoneId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toLocalDate</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_4-temporaladjuster" tabindex="-1"><a class="header-anchor" href="#_4-temporaladjuster"><span>4. TemporalAdjuster</span></a></h2><p>TemporalAdjuster允许我们执行复杂的日期操作。例如，我们可以获取下周日的日期，当前月份的最后一天，或下一年的第一天。</p><p>我们可以使用它来确定一周中星期一或星期日的日期，根据我们如何确定一周的第一天：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">DayOfWeek</span> weekStart <span class="token operator">=</span> <span class="token class-name">DayOfWeek</span><span class="token punctuation">.</span><span class="token constant">MONDAY</span><span class="token punctuation">;</span>
<span class="token keyword">return</span> localDate<span class="token punctuation">.</span><span class="token keyword">with</span><span class="token punctuation">(</span><span class="token class-name">TemporalAdjusters</span><span class="token punctuation">.</span><span class="token function">previousOrSame</span><span class="token punctuation">(</span>weekStart<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>previousOrSame函数返回一个TemporalAdjuster。TemporalAdjuster返回指定星期的上一个出现或如果当前日期已经是该星期的同一天。我们可以使用它来调整日期并计算给定日期的一周的开始。</p><h2 id="_5-temporalfield" tabindex="-1"><a class="header-anchor" href="#_5-temporalfield"><span>5. TemporalField</span></a></h2><p>TemporalField表示日期时间的一个字段，例如年月或分钟小时。我们可以调整输入日期以获取给定输入日期的一周的第一天。</p><p>我们可以使用dayOfWeek函数根据WeekFields访问一周的第一天。Java日期和时间API的WeekFields类表示基于周的年份及其组成部分，包括周数、星期几和基于周的年份。</p><p>当一周的第一天是星期日时，一周的天数编号从1到7，其中1是星期日，7是星期六。它提供了一种方便的方式来处理ISO周日期。这可以帮助我们获取一周的第一天的日期：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">TemporalField</span> fieldISO <span class="token operator">=</span> <span class="token class-name">WeekFields</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span>locale<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">dayOfWeek</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">return</span> localDate<span class="token punctuation">.</span><span class="token keyword">with</span><span class="token punctuation">(</span>fieldISO<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在这种情况下，我们传递了locale；因此，一周的第一天是星期日还是星期一的定义将取决于地区。为了避免这种情况，我们可以使用ISO标准，它接受星期一作为一周的第一天：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">TemporalField</span> dayOfWeek <span class="token operator">=</span> <span class="token class-name">WeekFields</span><span class="token punctuation">.</span><span class="token constant">ISO</span><span class="token punctuation">.</span><span class="token function">dayOfWeek</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">return</span> localDate<span class="token punctuation">.</span><span class="token keyword">with</span><span class="token punctuation">(</span>dayOfWeek<span class="token punctuation">,</span> dayOfWeek<span class="token punctuation">.</span><span class="token function">range</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getMinimum</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这段代码片段返回给定LocalDate实例的一周的第一天的日期，使用ISO日历系统，它以星期一作为一周的第一天。它通过将星期字段设置为给定LocalDate实例的最小有效值（即星期一的1）来实现这一点。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在这篇文章中，我们从Java中的LocalDate检索了一周的第一天的日期。我们看到了如何使用Calendar类和使用TemporalAdjuster和TemporalField的多种方式来做到这一点。</p><p>一如既往，代码可以在GitHub上找到。</p>`,29),o=[p];function c(l,i){return s(),n("div",null,o)}const d=a(t,[["render",c],["__file","2024-07-07-How to Determine Date of the First Day of the Week Using LocalDate in Java.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-07/2024-07-07-How%20to%20Determine%20Date%20of%20the%20First%20Day%20of%20the%20Week%20Using%20LocalDate%20in%20Java.html","title":"如何使用Java中的LocalDate确定一周的第一天","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","LocalDate"],"tag":["Java","LocalDate","Week","Date Calculation"],"head":[["meta",{"name":"keywords","content":"Java, LocalDate, Week, Date Calculation"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-07/2024-07-07-How%20to%20Determine%20Date%20of%20the%20First%20Day%20of%20the%20Week%20Using%20LocalDate%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"如何使用Java中的LocalDate确定一周的第一天"}],["meta",{"property":"og:description","content":"如何使用Java中的LocalDate确定一周的第一天 在这篇简短的教程中，我们将讨论如何使用Java中的LocalDate输入来找到一周的第一天。 2. 问题陈述 我们经常需要找到一周的第一天来为业务逻辑建立一周的边界，例如为员工构建时间跟踪系统。 在Java 8之前，JodaTime库被用来找到一周的第一天。然而，在Java 8之后，不再提供相同的..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-07T21:58:28.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"LocalDate"}],["meta",{"property":"article:tag","content":"Week"}],["meta",{"property":"article:tag","content":"Date Calculation"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-07T21:58:28.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"如何使用Java中的LocalDate确定一周的第一天\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-07T21:58:28.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"如何使用Java中的LocalDate确定一周的第一天 在这篇简短的教程中，我们将讨论如何使用Java中的LocalDate输入来找到一周的第一天。 2. 问题陈述 我们经常需要找到一周的第一天来为业务逻辑建立一周的边界，例如为员工构建时间跟踪系统。 在Java 8之前，JodaTime库被用来找到一周的第一天。然而，在Java 8之后，不再提供相同的..."},"headers":[{"level":2,"title":"2. 问题陈述","slug":"_2-问题陈述","link":"#_2-问题陈述","children":[]},{"level":2,"title":"3. Calendar类","slug":"_3-calendar类","link":"#_3-calendar类","children":[]},{"level":2,"title":"4. TemporalAdjuster","slug":"_4-temporaladjuster","link":"#_4-temporaladjuster","children":[]},{"level":2,"title":"5. TemporalField","slug":"_5-temporalfield","link":"#_5-temporalfield","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1720389508000,"updatedTime":1720389508000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.31,"words":994},"filePathRelative":"posts/baeldung/2024-07-07/2024-07-07-How to Determine Date of the First Day of the Week Using LocalDate in Java.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在这篇简短的教程中，我们将讨论如何使用Java中的LocalDate输入来找到一周的第一天。</p>\\n<h2>2. 问题陈述</h2>\\n<p>我们经常需要找到一周的第一天来为业务逻辑建立一周的边界，例如为员工构建时间跟踪系统。</p>\\n<p>在Java 8之前，JodaTime库被用来找到一周的第一天。然而，在Java 8之后，不再提供相同的支持。因此，我们将看到如何使用java.time.LocalDate类提供的功能来找到一周的第一天。</p>\\n<h2>3. Calendar类</h2>\\n<p>我们可以使用java.util.Calendar类来追溯到一周中的某一天。首先，我们可以循环到我们定义的一周的开始（星期日/星期一）。</p>","autoDesc":true}');export{d as comp,k as data};
