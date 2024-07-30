import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-CbPcg273.js";const e={},p=t(`<h1 id="如何在给定年份的特定月份中查找天数-baeldung" tabindex="-1"><a class="header-anchor" href="#如何在给定年份的特定月份中查找天数-baeldung"><span>如何在给定年份的特定月份中查找天数 | Baeldung</span></a></h1><p>在本教程中，我们将学习如何在Java编程中查找给定年份中特定月份的天数。例如，对于输入表示2024年3月的月份，我们的代码将返回_31_。</p><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><h2 id="_2-使用-yearmonth" tabindex="-1"><a class="header-anchor" href="#_2-使用-yearmonth"><span>2. 使用 <em>YearMonth</em></span></a></h2><p>Java 8引入了全新的日期/时间API。特别是，它增加了_YearMonth_，一个代表年份和月份组合的不可变对象。</p><p>可以通过静态工厂方法_of()_轻松创建_YearMonth_的实例。然后，我们可以调用它的_lengthOfMonth()_方法，该方法返回月份的长度，并考虑年份：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span> <span class="token function">getDaysInMonthWithYearOfMonth</span><span class="token punctuation">(</span><span class="token keyword">int</span> month<span class="token punctuation">,</span> <span class="token keyword">int</span> year<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">YearMonth</span> yearMonth <span class="token operator">=</span> <span class="token class-name">YearMonth</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span>year<span class="token punctuation">,</span> month<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> yearMonth<span class="token punctuation">.</span><span class="token function">lengthOfMonth</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们使用以下输入来检查我们方法的结果：</p><ul><li>2024年3月有31天</li><li>1999年11月有30天</li><li>2025年2月有28天</li><li>2004年2月有29天</li></ul><p>假设我们的类名为_DaysInMonthUtils_，我们可以编写我们的单元测试：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenGetDaysInMonthWithYearOfMonth_thenCorrectResult</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">31</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">DaysInMonthUtils</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getDaysInMonthWithYearOfMonth</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">2024</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">30</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">DaysInMonthUtils</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getDaysInMonthWithYearOfMonth</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">1999</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">28</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">DaysInMonthUtils</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getDaysInMonthWithYearOfMonth</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">2025</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">29</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">DaysInMonthUtils</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getDaysInMonthWithYearOfMonth</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">2004</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-使用-calendar" tabindex="-1"><a class="header-anchor" href="#_3-使用-calendar"><span>3. 使用 <em>Calendar</em></span></a></h2><p><strong>对于Java 8之前的版本，我们可以回退到原始的Calendar API。</strong></p><p>我们可以使用_Calendar_的_instance()_方法使用默认时区和区域设置获取_Calendar_对象。然后，我们需要更改_Calendar_的日期和月份为给定的值。最后，我们调用_getActualMaximum()_并将_Calendar.DATE_作为参数来返回我们的结果：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span> <span class="token function">getDaysInMonthWithCalendar</span><span class="token punctuation">(</span><span class="token keyword">int</span> month<span class="token punctuation">,</span> <span class="token keyword">int</span> year<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Calendar</span> calendar <span class="token operator">=</span> <span class="token class-name">Calendar</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    calendar<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token class-name">Calendar</span><span class="token punctuation">.</span><span class="token constant">DAY_OF_MONTH</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    calendar<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token class-name">Calendar</span><span class="token punctuation">.</span><span class="token constant">YEAR</span><span class="token punctuation">,</span> year<span class="token punctuation">)</span><span class="token punctuation">;</span>
    calendar<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token class-name">Calendar</span><span class="token punctuation">.</span><span class="token constant">MONTH</span><span class="token punctuation">,</span> month <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> calendar<span class="token punctuation">.</span><span class="token function">getActualMaximum</span><span class="token punctuation">(</span><span class="token class-name">Calendar</span><span class="token punctuation">.</span><span class="token constant">DATE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们实际上对月份编号减去了一，因为_Calendar_对月份使用基于零的索引。另一个有趣的注意点是我们将月份设置为_1_。乍一看，这似乎与目的不符。但是，我们需要这样做，因为_Calendar_根据当前的日期值调整日期。例如，假设我们有一个设置在7月31日的_Calendar_，我们将月份更改为6月。由于6月只有30天，API将滚动到下一个有效日期，即7月1日。</p><p>我们现在可以使用相同的测试输入来验证我们方法的行为：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenGetDaysInMonthWithCalendar_thenCorrectResult</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">31</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">DaysInMonthUtils</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getDaysInMonthWithCalendar</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">2024</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">30</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">DaysInMonthUtils</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getDaysInMonthWithCalendar</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">1999</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">28</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">DaysInMonthUtils</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getDaysInMonthWithCalendar</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">2025</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">29</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">DaysInMonthUtils</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getDaysInMonthWithCalendar</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">2004</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们使用_YearMonth_直接计算了一个月的天数。我们还看到了如何绕过Calendar API的设计决策，以确保使用它也能获得正确的结果。</p><p>一如既往，代码可在GitHub上找到。</p>`,21),o=[p];function c(l,u){return s(),a("div",null,o)}const k=n(e,[["render",c],["__file","2024-07-04-How Many Days Are There in a Particular Month of a Given Year .html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-04/2024-07-04-How%20Many%20Days%20Are%20There%20in%20a%20Particular%20Month%20of%20a%20Given%20Year%20.html","title":"如何在给定年份的特定月份中查找天数 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-07-04T00:00:00.000Z","category":["Java","编程"],"tag":["Java 8","日期时间API","Calendar"],"head":[["meta",{"name":"keywords","content":"Java, 日期时间, YearMonth, Calendar"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-04/2024-07-04-How%20Many%20Days%20Are%20There%20in%20a%20Particular%20Month%20of%20a%20Given%20Year%20.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"如何在给定年份的特定月份中查找天数 | Baeldung"}],["meta",{"property":"og:description","content":"如何在给定年份的特定月份中查找天数 | Baeldung 在本教程中，我们将学习如何在Java编程中查找给定年份中特定月份的天数。例如，对于输入表示2024年3月的月份，我们的代码将返回_31_。 1. 概述 2. 使用 YearMonth Java 8引入了全新的日期/时间API。特别是，它增加了_YearMonth_，一个代表年份和月份组合的不可变..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-04T12:51:54.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java 8"}],["meta",{"property":"article:tag","content":"日期时间API"}],["meta",{"property":"article:tag","content":"Calendar"}],["meta",{"property":"article:published_time","content":"2024-07-04T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-04T12:51:54.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"如何在给定年份的特定月份中查找天数 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-04T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-04T12:51:54.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"如何在给定年份的特定月份中查找天数 | Baeldung 在本教程中，我们将学习如何在Java编程中查找给定年份中特定月份的天数。例如，对于输入表示2024年3月的月份，我们的代码将返回_31_。 1. 概述 2. 使用 YearMonth Java 8引入了全新的日期/时间API。特别是，它增加了_YearMonth_，一个代表年份和月份组合的不可变..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 使用 YearMonth","slug":"_2-使用-yearmonth","link":"#_2-使用-yearmonth","children":[]},{"level":2,"title":"3. 使用 Calendar","slug":"_3-使用-calendar","link":"#_3-使用-calendar","children":[]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1720097514000,"updatedTime":1720097514000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.31,"words":692},"filePathRelative":"posts/baeldung/2024-07-04/2024-07-04-How Many Days Are There in a Particular Month of a Given Year .md","localizedDate":"2024年7月4日","excerpt":"\\n<p>在本教程中，我们将学习如何在Java编程中查找给定年份中特定月份的天数。例如，对于输入表示2024年3月的月份，我们的代码将返回_31_。</p>\\n<h2>1. 概述</h2>\\n<h2>2. 使用 <em>YearMonth</em></h2>\\n<p>Java 8引入了全新的日期/时间API。特别是，它增加了_YearMonth_，一个代表年份和月份组合的不可变对象。</p>\\n<p>可以通过静态工厂方法_of()_轻松创建_YearMonth_的实例。然后，我们可以调用它的_lengthOfMonth()_方法，该方法返回月份的长度，并考虑年份：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">int</span> <span class=\\"token function\\">getDaysInMonthWithYearOfMonth</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">int</span> month<span class=\\"token punctuation\\">,</span> <span class=\\"token keyword\\">int</span> year<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token class-name\\">YearMonth</span> yearMonth <span class=\\"token operator\\">=</span> <span class=\\"token class-name\\">YearMonth</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">of</span><span class=\\"token punctuation\\">(</span>year<span class=\\"token punctuation\\">,</span> month<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">return</span> yearMonth<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">lengthOfMonth</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{k as comp,d as data};
