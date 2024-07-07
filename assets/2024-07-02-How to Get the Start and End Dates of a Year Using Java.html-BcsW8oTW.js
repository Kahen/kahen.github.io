import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as t}from"./app-C3EhKTFl.js";const p={},e=t(`<hr><h1 id="如何使用java获取一年的起始和结束日期" tabindex="-1"><a class="header-anchor" href="#如何使用java获取一年的起始和结束日期"><span>如何使用Java获取一年的起始和结束日期</span></a></h1><p>Java 8引入了新的日期时间API，使得在Java中处理日期和时间变得更加容易。它提供了不同的方法来操作日期和时间。</p><p>在本教程中，我们将探讨如何使用日期时间API和_Calendar_类来获取一年的起始和结束日期。</p><h3 id="_2-使用日期时间api" tabindex="-1"><a class="header-anchor" href="#_2-使用日期时间api"><span>2. 使用日期时间API</span></a></h3><p>日期时间API中的_LocalDate_和_TemporalAdjuster_类使得获取一年的起始和结束日期变得简单。</p><p>以下是一个使用这些类的示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenCurrentDate_whenGettingFirstAndLastDayOfYear_thenCorrectDatesReturned</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">LocalDate</span> today <span class="token operator">=</span> <span class="token class-name">LocalDate</span><span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">LocalDate</span> firstDay <span class="token operator">=</span> today<span class="token punctuation">.</span><span class="token keyword">with</span><span class="token punctuation">(</span><span class="token function">firstDayOfYear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">LocalDate</span> lastDay <span class="token operator">=</span> today<span class="token punctuation">.</span><span class="token keyword">with</span><span class="token punctuation">(</span><span class="token function">lastDayOfYear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;2023-01-01&quot;</span><span class="token punctuation">,</span> firstDay<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;2023-12-31&quot;</span><span class="token punctuation">,</span> lastDay<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先，我们创建一个_LocalDate_对象以获取当前日期。接下来，我们通过调用_today_对象上的_with()_和_firstDayOfYear()_来获取一年的第一天。</p><p>同样，我们调用_today_上的_with()_和_lastDayOfYear()_来获取一年的最后一天。</p><p>值得注意的是，_firstDayOfYear()_和_lastDayOfYear()_是_TemporalAdjuster_类的静态方法。</p><p>最后，我们断言一年的第一和最后一天等于预期的结果。</p><h3 id="_3-使用-calendar-和-date-类" tabindex="-1"><a class="header-anchor" href="#_3-使用-calendar-和-date-类"><span>3. 使用_Calendar_和_Date_类</span></a></h3><p>旧的_Calendar_和_Date_类也可以获取一年的起始和结束日期。</p><h4 id="_3-1-获取一年的开始" tabindex="-1"><a class="header-anchor" href="#_3-1-获取一年的开始"><span>3.1. 获取一年的开始</span></a></h4><p>让我们使用_Calendar_和_Date_获取一年的开始：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenCalendarWithSpecificDate_whenFormattingToISO8601_thenFormattedDateMatches</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Calendar</span> cal <span class="token operator">=</span> <span class="token class-name">Calendar</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    cal<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token class-name">Calendar</span><span class="token punctuation">.</span><span class="token constant">YEAR</span><span class="token punctuation">,</span> <span class="token number">2023</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    cal<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token class-name">Calendar</span><span class="token punctuation">.</span><span class="token constant">DAY_OF_YEAR</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Date</span> firstDay <span class="token operator">=</span> cal<span class="token punctuation">.</span><span class="token function">getTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">SimpleDateFormat</span> sdf <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SimpleDateFormat</span><span class="token punctuation">(</span><span class="token string">&quot;yyyy-MM-dd&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> formattedDate <span class="token operator">=</span> sdf<span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span>firstDay<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;2023-01-01&quot;</span><span class="token punctuation">,</span> formattedDate<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们创建一个新的_Calendar_实例，并设置年份和一年中的天数。然后，我们获取_Date_对象并将其格式化为预期的开始日期。</p><p>最后，我们断言返回的日期等于预期的日期。</p><h4 id="_3-2-获取一年的结束" tabindex="-1"><a class="header-anchor" href="#_3-2-获取一年的结束"><span>3.2. 获取一年的结束</span></a></h4><p>类似地，以下是获取最后一天的方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenCalendarSetToFirstDayOfYear_whenFormattingDateToISO8601_thenFormattedDateMatchesLastDay</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Calendar</span> cal <span class="token operator">=</span> <span class="token class-name">Calendar</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    cal<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token class-name">Calendar</span><span class="token punctuation">.</span><span class="token constant">YEAR</span><span class="token punctuation">,</span> <span class="token number">2023</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    cal<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token class-name">Calendar</span><span class="token punctuation">.</span><span class="token constant">MONTH</span><span class="token punctuation">,</span> <span class="token number">11</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    cal<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token class-name">Calendar</span><span class="token punctuation">.</span><span class="token constant">DAY_OF_MONTH</span><span class="token punctuation">,</span> <span class="token number">31</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Date</span> lastDay <span class="token operator">=</span> cal<span class="token punctuation">.</span><span class="token function">getTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">SimpleDateFormat</span> sdf <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SimpleDateFormat</span><span class="token punctuation">(</span><span class="token string">&quot;yyyy-MM-dd&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> formattedDate <span class="token operator">=</span> sdf<span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span>lastDay<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;2023-12-31&quot;</span><span class="token punctuation">,</span> formattedDate<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上述代码中，我们设置年份、月份和一年的最后一天的日期。同样，我们格式化日期并断言它等于预期的日期。</p><h3 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h3><p>在本文中，我们学习了如何使用现代的日期时间API和旧的_Calendar_和_Date_类来获取一年的起始和结束日期。与_Calendar_和_Date_相比，日期时间API提供了更干净、更直观的API。</p><p>如常，示例的完整源代码可在GitHub上找到。</p>`,26),o=[e];function c(l,i){return s(),n("div",null,o)}const k=a(p,[["render",c],["__file","2024-07-02-How to Get the Start and End Dates of a Year Using Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-02/2024-07-02-How%20to%20Get%20the%20Start%20and%20End%20Dates%20of%20a%20Year%20Using%20Java.html","title":"如何使用Java获取一年的起始和结束日期","lang":"zh-CN","frontmatter":{"date":"2022-04-06T00:00:00.000Z","category":["Java","Date and Time"],"tag":["Java 8","Date Time API","Calendar"],"head":[["meta",{"name":"keywords","content":"Java, Date Time API, Calendar, start and end of year"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-02/2024-07-02-How%20to%20Get%20the%20Start%20and%20End%20Dates%20of%20a%20Year%20Using%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"如何使用Java获取一年的起始和结束日期"}],["meta",{"property":"og:description","content":"如何使用Java获取一年的起始和结束日期 Java 8引入了新的日期时间API，使得在Java中处理日期和时间变得更加容易。它提供了不同的方法来操作日期和时间。 在本教程中，我们将探讨如何使用日期时间API和_Calendar_类来获取一年的起始和结束日期。 2. 使用日期时间API 日期时间API中的_LocalDate_和_TemporalAdju..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-02T14:31:57.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java 8"}],["meta",{"property":"article:tag","content":"Date Time API"}],["meta",{"property":"article:tag","content":"Calendar"}],["meta",{"property":"article:published_time","content":"2022-04-06T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-02T14:31:57.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"如何使用Java获取一年的起始和结束日期\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-06T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-02T14:31:57.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"如何使用Java获取一年的起始和结束日期 Java 8引入了新的日期时间API，使得在Java中处理日期和时间变得更加容易。它提供了不同的方法来操作日期和时间。 在本教程中，我们将探讨如何使用日期时间API和_Calendar_类来获取一年的起始和结束日期。 2. 使用日期时间API 日期时间API中的_LocalDate_和_TemporalAdju..."},"headers":[{"level":3,"title":"2. 使用日期时间API","slug":"_2-使用日期时间api","link":"#_2-使用日期时间api","children":[]},{"level":3,"title":"3. 使用_Calendar_和_Date_类","slug":"_3-使用-calendar-和-date-类","link":"#_3-使用-calendar-和-date-类","children":[]},{"level":3,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1719930717000,"updatedTime":1719930717000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.17,"words":652},"filePathRelative":"posts/baeldung/2024-07-02/2024-07-02-How to Get the Start and End Dates of a Year Using Java.md","localizedDate":"2022年4月6日","excerpt":"<hr>\\n<h1>如何使用Java获取一年的起始和结束日期</h1>\\n<p>Java 8引入了新的日期时间API，使得在Java中处理日期和时间变得更加容易。它提供了不同的方法来操作日期和时间。</p>\\n<p>在本教程中，我们将探讨如何使用日期时间API和_Calendar_类来获取一年的起始和结束日期。</p>\\n<h3>2. 使用日期时间API</h3>\\n<p>日期时间API中的_LocalDate_和_TemporalAdjuster_类使得获取一年的起始和结束日期变得简单。</p>\\n<p>以下是一个使用这些类的示例：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token annotation punctuation\\">@Test</span>\\n<span class=\\"token keyword\\">void</span> <span class=\\"token function\\">givenCurrentDate_whenGettingFirstAndLastDayOfYear_thenCorrectDatesReturned</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token class-name\\">LocalDate</span> today <span class=\\"token operator\\">=</span> <span class=\\"token class-name\\">LocalDate</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">now</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token class-name\\">LocalDate</span> firstDay <span class=\\"token operator\\">=</span> today<span class=\\"token punctuation\\">.</span><span class=\\"token keyword\\">with</span><span class=\\"token punctuation\\">(</span><span class=\\"token function\\">firstDayOfYear</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token class-name\\">LocalDate</span> lastDay <span class=\\"token operator\\">=</span> today<span class=\\"token punctuation\\">.</span><span class=\\"token keyword\\">with</span><span class=\\"token punctuation\\">(</span><span class=\\"token function\\">lastDayOfYear</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\n    <span class=\\"token function\\">assertEquals</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"2023-01-01\\"</span><span class=\\"token punctuation\\">,</span> firstDay<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">toString</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token function\\">assertEquals</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"2023-12-31\\"</span><span class=\\"token punctuation\\">,</span> lastDay<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">toString</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{k as comp,d as data};
