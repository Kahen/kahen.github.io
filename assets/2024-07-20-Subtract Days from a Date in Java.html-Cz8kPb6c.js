import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as t}from"./app-C4eFoh0f.js";const e={},p=t(`<hr><h1 id="在java中从日期中减去天数" tabindex="-1"><a class="header-anchor" href="#在java中从日期中减去天数"><span>在Java中从日期中减去天数</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在本教程中，我们将探索在Java中从日期对象中减去天数的各种方法。</p><p>我们将从Java 8引入的日期时间API开始。之后，我们将学习如何使用_java.util_包中的类来实现这一点，最后我们将借助Joda-Time库来完成同样的任务。</p><h2 id="_2-java-time-localdatetime" tabindex="-1"><a class="header-anchor" href="#_2-java-time-localdatetime"><span>2. <em>java.time.LocalDateTime</em></span></a></h2><p><strong>Java 8引入的日期/时间API是目前进行日期和时间计算的最可行选项。</strong></p><p>让我们看看如何从Java 8_java.util.LocalDateTime_对象中减去天数：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenLocalDate_whenSubtractingFiveDays_dateIsChangedCorrectly</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">LocalDateTime</span> localDateTime <span class="token operator">=</span> <span class="token class-name">LocalDateTime</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token number">2022</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    localDateTime <span class="token operator">=</span> localDateTime<span class="token punctuation">.</span><span class="token function">minusDays</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">15</span><span class="token punctuation">,</span> localDateTime<span class="token punctuation">.</span><span class="token function">getDayOfMonth</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span> localDateTime<span class="token punctuation">.</span><span class="token function">getMonthValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">2022</span><span class="token punctuation">,</span> localDateTime<span class="token punctuation">.</span><span class="token function">getYear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-java-util-calendar" tabindex="-1"><a class="header-anchor" href="#_3-java-util-calendar"><span>3. <em>java.util.Calendar</em></span></a></h2><p>_Date_和_Calendar_是Java 8之前的日期操作中最常用的实用类。</p><p>让我们使用_java.util.Calendar_减去五天：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenCalendarDate_whenSubtractingFiveDays_dateIsChangedCorrectly</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Calendar</span> calendar <span class="token operator">=</span> <span class="token class-name">Calendar</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    calendar<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token number">2022</span><span class="token punctuation">,</span> <span class="token class-name">Calendar</span><span class="token punctuation">.</span><span class="token constant">APRIL</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    calendar<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token class-name">Calendar</span><span class="token punctuation">.</span><span class="token constant">DATE</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">15</span><span class="token punctuation">,</span> calendar<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token class-name">Calendar</span><span class="token punctuation">.</span><span class="token constant">DAY_OF_MONTH</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token class-name">Calendar</span><span class="token punctuation">.</span><span class="token constant">APRIL</span><span class="token punctuation">,</span> calendar<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token class-name">Calendar</span><span class="token punctuation">.</span><span class="token constant">MONTH</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">2022</span><span class="token punctuation">,</span> calendar<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token class-name">Calendar</span><span class="token punctuation">.</span><span class="token constant">YEAR</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>我们在使用它们时应该小心，因为它们有一些设计缺陷，并且不是线程安全的。</strong></p><p>我们可以在关于迁移到新的Java 8日期时间API的文章中阅读更多关于与旧代码的交互以及两个API之间的区别。</p><h2 id="_4-joda-time" tabindex="-1"><a class="header-anchor" href="#_4-joda-time"><span>4. Joda-Time</span></a></h2><p>我们可以将Joda-Time作为Java最初日期和时间处理解决方案的更好替代品。该库提供了更直观的API、多种日历系统、线程安全性和不可变对象。</p><p>为了使用Joda-Time，我们需要在_pom.xml_文件中将其作为依赖项包含：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`joda-time\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`joda-time\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\`2.12.5\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\`
\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们从Joda-Time的_DateTime_对象中减去五天：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenJodaDateTime_whenSubtractingFiveDays_dateIsChangedCorrectly</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">DateTime</span> dateTime <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DateTime</span><span class="token punctuation">(</span><span class="token number">2022</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">,</span> <span class="token number">12</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    dateTime <span class="token operator">=</span> dateTime<span class="token punctuation">.</span><span class="token function">minusDays</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">15</span><span class="token punctuation">,</span> dateTime<span class="token punctuation">.</span><span class="token function">getDayOfMonth</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span> dateTime<span class="token punctuation">.</span><span class="token function">getMonthOfYear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">2022</span><span class="token punctuation">,</span> dateTime<span class="token punctuation">.</span><span class="token function">getYear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Joda-Time是旧代码的良好解决方案。<strong>然而，该项目已正式“完成”，库的作者建议迁移到Java 8的日期/时间API。</strong></p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在这篇简短的文章中，我们探索了几种从日期对象中减去天数的方法。</p><p>我们使用_java.time.LocalDateTime_和Java 8之前的解决方案：_java.util.Calendar_和Joda-Time库来实现这一点。</p><p>像往常一样，源代码可以在GitHub上找到。</p>`,26),o=[p];function c(l,i){return s(),n("div",null,o)}const d=a(e,[["render",c],["__file","2024-07-20-Subtract Days from a Date in Java.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-20/2024-07-20-Subtract%20Days%20from%20a%20Date%20in%20Java.html","title":"在Java中从日期中减去天数","lang":"zh-CN","frontmatter":{"date":"2022-04-20T00:00:00.000Z","category":["Java","日期处理"],"tag":["Java 8","Joda-Time","日期减法"],"head":[["meta",{"name":"keywords","content":"Java日期减法, Java 8日期处理, Joda-Time日期处理"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-20/2024-07-20-Subtract%20Days%20from%20a%20Date%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Java中从日期中减去天数"}],["meta",{"property":"og:description","content":"在Java中从日期中减去天数 1. 概述 在本教程中，我们将探索在Java中从日期对象中减去天数的各种方法。 我们将从Java 8引入的日期时间API开始。之后，我们将学习如何使用_java.util_包中的类来实现这一点，最后我们将借助Joda-Time库来完成同样的任务。 2. java.time.LocalDateTime Java 8引入的日期..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-20T14:12:14.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java 8"}],["meta",{"property":"article:tag","content":"Joda-Time"}],["meta",{"property":"article:tag","content":"日期减法"}],["meta",{"property":"article:published_time","content":"2022-04-20T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-20T14:12:14.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Java中从日期中减去天数\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-20T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-20T14:12:14.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Java中从日期中减去天数 1. 概述 在本教程中，我们将探索在Java中从日期对象中减去天数的各种方法。 我们将从Java 8引入的日期时间API开始。之后，我们将学习如何使用_java.util_包中的类来实现这一点，最后我们将借助Joda-Time库来完成同样的任务。 2. java.time.LocalDateTime Java 8引入的日期..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. java.time.LocalDateTime","slug":"_2-java-time-localdatetime","link":"#_2-java-time-localdatetime","children":[]},{"level":2,"title":"3. java.util.Calendar","slug":"_3-java-util-calendar","link":"#_3-java-util-calendar","children":[]},{"level":2,"title":"4. Joda-Time","slug":"_4-joda-time","link":"#_4-joda-time","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1721484734000,"updatedTime":1721484734000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.01,"words":603},"filePathRelative":"posts/baeldung/2024-07-20/2024-07-20-Subtract Days from a Date in Java.md","localizedDate":"2022年4月20日","excerpt":"<hr>\\n<h1>在Java中从日期中减去天数</h1>\\n<h2>1. 概述</h2>\\n<p>在本教程中，我们将探索在Java中从日期对象中减去天数的各种方法。</p>\\n<p>我们将从Java 8引入的日期时间API开始。之后，我们将学习如何使用_java.util_包中的类来实现这一点，最后我们将借助Joda-Time库来完成同样的任务。</p>\\n<h2>2. <em>java.time.LocalDateTime</em></h2>\\n<p><strong>Java 8引入的日期/时间API是目前进行日期和时间计算的最可行选项。</strong></p>\\n<p>让我们看看如何从Java 8_java.util.LocalDateTime_对象中减去天数：</p>","autoDesc":true}');export{d as comp,k as data};
