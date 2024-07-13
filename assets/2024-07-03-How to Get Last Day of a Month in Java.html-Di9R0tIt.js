import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-DkA39C0B.js";const p={},e=t(`<h1 id="如何在java中获取一个月的最后一天-baeldung" tabindex="-1"><a class="header-anchor" href="#如何在java中获取一个月的最后一天-baeldung"><span>如何在Java中获取一个月的最后一天 | Baeldung</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在这个简短的教程中，我们将探讨如何在Java中获取给定月份的最后一天。</p><p>首先，我们将介绍如何使用Java核心方法来实现这一点。然后，我们将展示如何使用Joda Time库来达到相同的目标。</p><h2 id="_2-java-8之前" tabindex="-1"><a class="header-anchor" href="#_2-java-8之前"><span>2. Java 8之前</span></a></h2><p>在Java 8之前，_日期(Date)_和_日历(Calendar)_类是Java中用于操作时间和日期的好选择。</p><p><strong>通常，_日历(Calendar)_提供了一套我们可以用于访问和操作时间信息的方法和常量，例如天、月和年。</strong></p><p>让我们看看如何使用它来获取特定月份的最后一天：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">getLastDayOfMonthUsingCalendar</span><span class="token punctuation">(</span><span class="token keyword">int</span> month<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Calendar</span> cal <span class="token operator">=</span> <span class="token class-name">Calendar</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    cal<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token class-name">Calendar</span><span class="token punctuation">.</span><span class="token constant">MONTH</span><span class="token punctuation">,</span> month<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> cal<span class="token punctuation">.</span><span class="token function">getActualMaximum</span><span class="token punctuation">(</span><span class="token class-name">Calendar</span><span class="token punctuation">.</span><span class="token constant">DAY_OF_MONTH</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如我们所见，我们使用_Calendar.getInstance()_创建了一个_日历(Calendar)_对象。然后，我们将日历月份设置为指定的月份。此外，我们使用_getActualMaximum()_方法和_Calendar.DAY_OF_MONTH_字段来检索月份的最后一天。</p><p>现在，让我们添加一个测试用例来确认我们的方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenMonth_whenUsingCalendar_thenReturnLastDay</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">31</span><span class="token punctuation">,</span> <span class="token class-name">LastDayOfMonth</span><span class="token punctuation">.</span><span class="token function">getLastDayOfMonthUsingCalendar</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">30</span><span class="token punctuation">,</span> <span class="token class-name">LastDayOfMonth</span><span class="token punctuation">.</span><span class="token function">getLastDayOfMonthUsingCalendar</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">31</span><span class="token punctuation">,</span> <span class="token class-name">LastDayOfMonth</span><span class="token punctuation">.</span><span class="token function">getLastDayOfMonthUsingCalendar</span><span class="token punctuation">(</span><span class="token number">9</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>这里需要提到的一个重点是月份值是基于零的</strong>。例如，一月的值是零，所以我们需要从期望的月份值中减去1。</p><h2 id="_3-java-8日期时间api" tabindex="-1"><a class="header-anchor" href="#_3-java-8日期时间api"><span>3. Java 8日期时间API</span></a></h2><p>Java 8带来了许多新特性和增强功能。在这些特性中，我们发现了日期时间API。<strong>这个API被引入是为了克服基于_日期(Date)_和_日历(Calendar)_类的旧API的限制。</strong></p><p>让我们深入探讨这个新API提供了哪些选项来获取一个月的最后一天。</p><h3 id="_3-1-使用-yearmonth" tabindex="-1"><a class="header-anchor" href="#_3-1-使用-yearmonth"><span>3.1. 使用_YearMonth_</span></a></h3><p>操作月份最常见的方式之一是使用_YearMonth_类。顾名思义，它表示年和月的组合。</p><p><strong>这个类提供了_atEndOfMonth()_方法，它返回一个表示给定月份末尾的_LocalDate_对象。</strong></p><p>让我们在实践中看看：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">getLastDayOfMonthUsingYearMonth</span><span class="token punctuation">(</span><span class="token class-name">YearMonth</span> date<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> date<span class="token punctuation">.</span><span class="token function">atEndOfMonth</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">getDayOfMonth</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>简而言之，我们使用_atEndOfMonth()_来获取月份的最后一天。然后，我们使用_getDayOfMonth()_来检索返回的_LocalDate_对象的日期。</p><p>像往常一样，让我们添加一个测试用例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenMonth_whenUsingYearMonth_thenReturnLastDay</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">31</span><span class="token punctuation">,</span> <span class="token class-name">LastDayOfMonth</span><span class="token punctuation">.</span><span class="token function">getLastDayOfMonthUsingYearMonth</span><span class="token punctuation">(</span><span class="token class-name">YearMonth</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token number">2023</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">30</span><span class="token punctuation">,</span> <span class="token class-name">LastDayOfMonth</span><span class="token punctuation">.</span><span class="token function">getLastDayOfMonthUsingYearMonth</span><span class="token punctuation">(</span><span class="token class-name">YearMonth</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token number">2023</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">31</span><span class="token punctuation">,</span> <span class="token class-name">LastDayOfMonth</span><span class="token punctuation">.</span><span class="token function">getLastDayOfMonthUsingYearMonth</span><span class="token punctuation">(</span><span class="token class-name">YearMonth</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token number">2023</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-使用-temporaladjusters" tabindex="-1"><a class="header-anchor" href="#_3-2-使用-temporaladjusters"><span>3.2. 使用_TemporalAdjusters_</span></a></h3><p>另一种解决方案是使用_TemporalAdjusters_类。<strong>通常，这个类提供了几个现成的静态方法，我们可以使用它们来调整时间对象。</strong></p><p>让我们一起来看看如何使用它来获取_LocalDate_实例的最后一天：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">getLastDayOfMonthUsingTemporalAdjusters</span><span class="token punctuation">(</span><span class="token class-name">LocalDate</span> date<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> date<span class="token punctuation">.</span><span class="token keyword">with</span><span class="token punctuation">(</span><span class="token class-name">TemporalAdjusters</span><span class="token punctuation">.</span><span class="token function">lastDayOfMonth</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">getDayOfMonth</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上所示，类提供了调整器_lastDayOfMonth()_。它返回一个新的日期，设置为月份的最后一天。</p><p>此外，我们使用了_getDayOfMonth()_方法来获取返回日期的日期。</p><p>接下来，我们将使用一个测试用例来确认我们的方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenMonth_whenUsingTemporalAdjusters_thenReturnLastDay</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">31</span><span class="token punctuation">,</span> <span class="token class-name">LastDayOfMonth</span><span class="token punctuation">.</span><span class="token function">getLastDayOfMonthUsingTemporalAdjusters</span><span class="token punctuation">(</span><span class="token class-name">LocalDate</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token number">2023</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">30</span><span class="token punctuation">,</span> <span class="token class-name">LastDayOfMonth</span><span class="token punctuation">.</span><span class="token function">getLastDayOfMonthUsingTemporalAdjusters</span><span class="token punctuation">(</span><span class="token class-name">LocalDate</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token number">2023</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">31</span><span class="token punctuation">,</span> <span class="token class-name">LastDayOfMonth</span><span class="token punctuation">.</span><span class="token function">getLastDayOfMonthUsingTemporalAdjusters</span><span class="token punctuation">(</span><span class="token class-name">LocalDate</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token number">2023</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-joda-time库" tabindex="-1"><a class="header-anchor" href="#_4-joda-time库"><span>4. Joda Time库</span></a></h2><p>或者，我们可以使用Joda Time API来实现相同的目标。在Java 8之前，它是日期时间操作的事实标准。首先，我们需要将Joda Time依赖项添加到_pom.xml_文件中：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`joda-time\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`joda-time\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\`2.12.5\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\`
\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同样，Joda Time提供了_LocalDate_类来表示日期。<strong>这包括_withMaximumValue()_方法，可以用来获取一个月的最后一天。</strong></p><p>让我们看看实际操作：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">getLastDayOfMonthUsingJodaTime</span><span class="token punctuation">(</span><span class="token class-name"><span class="token namespace">org<span class="token punctuation">.</span>joda<span class="token punctuation">.</span>time<span class="token punctuation">.</span></span>LocalDate</span> date<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> date<span class="token punctuation">.</span><span class="token function">dayOfMonth</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">withMaximumValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">getDayOfMonth</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，让我们再创建一个测试用例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenMonth_whenUsingJodaTime_thenReturnLastDay</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">31</span><span class="token punctuation">,</span> <span class="token class-name">LastDayOfMonth</span><span class="token punctuation">.</span><span class="token function">getLastDayOfMonthUsingJodaTime</span><span class="token punctuation">(</span><span class="token class-name"><span class="token namespace">org<span class="token punctuation">.</span>joda<span class="token punctuation">.</span>time<span class="token punctuation">.</span></span>LocalDate</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span><span class="token string">&quot;2023-1-1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">30</span><span class="token punctuation">,</span> <span class="token class-name">LastDayOfMonth</span><span class="token punctuation">.</span><span class="token function">getLastDayOfMonthUsingJodaTime</span><span class="token punctuation">(</span><span class="token class-name"><span class="token namespace">org<span class="token punctuation">.</span>joda<span class="token punctuation">.</span>time<span class="token punctuation">.</span></span>LocalDate</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span><span class="token string">&quot;2023-4-1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">31</span><span class="token punctuation">,</span> <span class="token class-name">LastDayOfMonth</span><span class="token punctuation">.</span><span class="token function">getLastDayOfMonthUsingJodaTime</span><span class="token punctuation">(</span><span class="token class-name"><span class="token namespace">org<span class="token punctuation">.</span>joda<span class="token punctuation">.</span>time<span class="token punctuation">.</span></span>LocalDate</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span><span class="token string">&quot;2023-10-1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>毫不意外，测试成功通过。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们探索了在Java中获取给定月份的最后一天的不同方法。在此过程中，我们解释了如何使用Java核心方法。然后，我们展示了如何使用第三方库，如Joda Time。</p><p>一如既往，本文中使用的代码可以在GitHub上找到。</p><p><img src="https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg" alt="img" loading="lazy"><img src="https://secure.gravatar.com/avatar/9a8dd50c78e0b9d049466e9097331198?s=50&amp;r=g" alt="img" loading="lazy"><img src="https://secure.gravatar.com/avatar/74d85e58eea7ae3bd05956bff5cb1b49?s=50&amp;r=g" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png" alt="img" loading="lazy"></p><p>OK</p>`,46),o=[e];function c(l,u){return s(),a("div",null,o)}const r=n(p,[["render",c],["__file","2024-07-03-How to Get Last Day of a Month in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-03/2024-07-03-How%20to%20Get%20Last%20Day%20of%20a%20Month%20in%20Java.html","title":"如何在Java中获取一个月的最后一天 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-07-04T00:00:00.000Z","category":["Java","编程"],"tag":["Java","日期处理","Joda Time"],"head":[["meta",{"name":"keywords","content":"Java, 日期处理, 最后一天, 月份, Calendar, YearMonth, TemporalAdjusters, Joda Time"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-03/2024-07-03-How%20to%20Get%20Last%20Day%20of%20a%20Month%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"如何在Java中获取一个月的最后一天 | Baeldung"}],["meta",{"property":"og:description","content":"如何在Java中获取一个月的最后一天 | Baeldung 1. 概述 在这个简短的教程中，我们将探讨如何在Java中获取给定月份的最后一天。 首先，我们将介绍如何使用Java核心方法来实现这一点。然后，我们将展示如何使用Joda Time库来达到相同的目标。 2. Java 8之前 在Java 8之前，_日期(Date)_和_日历(Calendar)..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-03T19:55:50.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"日期处理"}],["meta",{"property":"article:tag","content":"Joda Time"}],["meta",{"property":"article:published_time","content":"2024-07-04T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-03T19:55:50.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"如何在Java中获取一个月的最后一天 | Baeldung\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg\\",\\"https://secure.gravatar.com/avatar/9a8dd50c78e0b9d049466e9097331198?s=50&r=g\\",\\"https://secure.gravatar.com/avatar/74d85e58eea7ae3bd05956bff5cb1b49?s=50&r=g\\",\\"https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png\\",\\"https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg\\",\\"https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png\\"],\\"datePublished\\":\\"2024-07-04T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-03T19:55:50.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"如何在Java中获取一个月的最后一天 | Baeldung 1. 概述 在这个简短的教程中，我们将探讨如何在Java中获取给定月份的最后一天。 首先，我们将介绍如何使用Java核心方法来实现这一点。然后，我们将展示如何使用Joda Time库来达到相同的目标。 2. Java 8之前 在Java 8之前，_日期(Date)_和_日历(Calendar)..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. Java 8之前","slug":"_2-java-8之前","link":"#_2-java-8之前","children":[]},{"level":2,"title":"3. Java 8日期时间API","slug":"_3-java-8日期时间api","link":"#_3-java-8日期时间api","children":[{"level":3,"title":"3.1. 使用_YearMonth_","slug":"_3-1-使用-yearmonth","link":"#_3-1-使用-yearmonth","children":[]},{"level":3,"title":"3.2. 使用_TemporalAdjusters_","slug":"_3-2-使用-temporaladjusters","link":"#_3-2-使用-temporaladjusters","children":[]}]},{"level":2,"title":"4. Joda Time库","slug":"_4-joda-time库","link":"#_4-joda-time库","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720036550000,"updatedTime":1720036550000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.78,"words":1134},"filePathRelative":"posts/baeldung/2024-07-03/2024-07-03-How to Get Last Day of a Month in Java.md","localizedDate":"2024年7月4日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>在这个简短的教程中，我们将探讨如何在Java中获取给定月份的最后一天。</p>\\n<p>首先，我们将介绍如何使用Java核心方法来实现这一点。然后，我们将展示如何使用Joda Time库来达到相同的目标。</p>\\n<h2>2. Java 8之前</h2>\\n<p>在Java 8之前，_日期(Date)_和_日历(Calendar)_类是Java中用于操作时间和日期的好选择。</p>\\n<p><strong>通常，_日历(Calendar)_提供了一套我们可以用于访问和操作时间信息的方法和常量，例如天、月和年。</strong></p>\\n<p>让我们看看如何使用它来获取特定月份的最后一天：</p>","autoDesc":true}');export{r as comp,d as data};
