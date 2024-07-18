import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as t}from"./app-c243dxVF.js";const e={},p=t('<hr><h1 id="在java中获取昨天的日期" tabindex="-1"><a class="header-anchor" href="#在java中获取昨天的日期"><span>在Java中获取昨天的日期</span></a></h1><p>在这篇简短的教程中，我们将探索在Java中获取昨天日期的不同方法。</p><p>首先，我们将解释如何使用核心Java来实现。然后，我们将演示如何使用诸如Joda-Time和Apache Commons Lang等外部库来解决我们的主要难题。</p><h3 id="_1-java-8之前" tabindex="-1"><a class="header-anchor" href="#_1-java-8之前"><span>1. Java 8之前</span></a></h3><p>在Java 8之前，我们通常会使用_Date_或_Calendar_来处理和操作日期/时间信息。那么，让我们看看如何使用这两个类来获取昨天的日期。</p><h4 id="_1-1-使用-date" tabindex="-1"><a class="header-anchor" href="#_1-1-使用-date"><span>1.1 使用_Date_</span></a></h4><p>_Date_类表示一个特定的时间点。它提供了一组方法来操作和检索有关日期的信息。然而，重要的是要提到<strong>这个类已经过时并被标记为已弃用</strong>。</p><p>让我们看看实际操作：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">givenDate_whenUsingDateClass_thenReturnYesterday</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">Date</span> date <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token number">2023</span><span class="token punctuation">,</span> <span class="token class-name">Calendar</span><span class="token punctuation">.</span><span class="token constant">DECEMBER</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">Date</span> yesterdayDate <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span>date<span class="token punctuation">.</span><span class="token function">getTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">24</span> <span class="token operator">*</span> <span class="token number">60</span> <span class="token operator">*</span> <span class="token number">60</span> <span class="token operator">*</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">Date</span> expectedYesterdayDate <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token number">2023</span><span class="token punctuation">,</span> <span class="token class-name">Calendar</span><span class="token punctuation">.</span><span class="token constant">DECEMBER</span><span class="token punctuation">,</span> <span class="token number">19</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span>expectedYesterdayDate<span class="token punctuation">,</span> yesterdayDate<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如我们所见，我们使用_getTime()_方法来获取给定日期的毫秒数。然后，我们<strong>减去一天，即24 * 60 * 60 * 1000毫秒</strong>。</p><h4 id="_1-2-使用-calendar" tabindex="-1"><a class="header-anchor" href="#_1-2-使用-calendar"><span>1.2 使用_Calendar_</span></a></h4><p>_Calendar_是另一个选择，如果我们想使用旧的API。这个类带有一组方法来管理时间数据，例如天和月份。</p><p>例如，我们可以使用_add()_方法来添加一定数量的天数。由于我们想要<strong>获取昨天的日期，我们需要将-1作为值</strong>。</p><p>让我们在实践中看到它：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">givenDate_whenUsingCalendarClass_thenReturnYesterday</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">Calendar</span> date <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">GregorianCalendar</span><span class="token punctuation">(</span><span class="token number">2023</span><span class="token punctuation">,</span> <span class="token class-name">Calendar</span><span class="token punctuation">.</span><span class="token constant">APRIL</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    date<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token class-name">Calendar</span><span class="token punctuation">.</span><span class="token constant">DATE</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">Calendar</span> expectedYesterdayDate <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">GregorianCalendar</span><span class="token punctuation">(</span><span class="token number">2023</span><span class="token punctuation">,</span> <span class="token class-name">Calendar</span><span class="token punctuation">.</span><span class="token constant">APRIL</span><span class="token punctuation">,</span> <span class="token number">19</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span>expectedYesterdayDate<span class="token punctuation">,</span> date<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如预期的那样，测试成功通过。</p><h3 id="_2-java-8日期时间api" tabindex="-1"><a class="header-anchor" href="#_2-java-8日期时间api"><span>2. Java 8日期时间API</span></a></h3><p>Java 8因其新的日期时间特性而经常受到赞誉。这个API带有大量现成的类和方法，以更简洁和人性化的方式进行日期和时间计算。那么，让我们仔细看看如何使用新的日期时间API来获取昨天的日期。</p><h4 id="_2-1-使用-localdate" tabindex="-1"><a class="header-anchor" href="#_2-1-使用-localdate"><span>2.1 使用_LocalDate_</span></a></h4><p>一个最简单的解决方案是使用_LocalDate_类。<strong>它提供了_minusDays()_方法从给定的日期中减去特定数量的天数。在我们的情况下，我们需要减去整整一天</strong>。</p><p>现在，让我们用一个测试案例来说明_LocalDate.minusDays()_的使用：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">givenDate_whenUsingLocalDateClass_thenReturnYesterday</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">LocalDate</span> localDate <span class="token operator">=</span> <span class="token class-name">LocalDate</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token number">2023</span><span class="token punctuation">,</span> <span class="token number">12</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">LocalDate</span> yesterdayDate <span class="token operator">=</span> localDate<span class="token punctuation">.</span><span class="token function">minusDays</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">LocalDate</span> expectedYesterdayDate <span class="token operator">=</span> <span class="token class-name">LocalDate</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token number">2023</span><span class="token punctuation">,</span> <span class="token number">12</span><span class="token punctuation">,</span> <span class="token number">19</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span>expectedYesterdayDate<span class="token punctuation">,</span> yesterdayDate<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上所示，_minusDays(1)_返回一个新的_LocalDate_对象，表示昨天。</p><h4 id="_2-2-使用-instant" tabindex="-1"><a class="header-anchor" href="#_2-2-使用-instant"><span>2.2 使用_Instant_</span></a></h4><p>另一个解决方案是使用_Instant_类。顾名思义，它模拟时间轴上的一个特定时间点。<strong>通常，_Instant_类带有_minus()_方法，我们可以使用它来减去特定数量的毫秒</strong>。</p><p>那么，让我们用一个实际的例子来说明如何使用它来获取昨天的日期：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">givenDate_whenUsingInstantClass_thenReturnYesterday</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">Instant</span> date <span class="token operator">=</span> <span class="token class-name">Instant</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span><span class="token string">&quot;2023-10-25&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">Instant</span> yesterdayDate <span class="token operator">=</span> date<span class="token punctuation">.</span><span class="token function">minus</span><span class="token punctuation">(</span><span class="token number">24</span> <span class="token operator">*</span> <span class="token number">60</span> <span class="token operator">*</span> <span class="token number">60</span> <span class="token operator">*</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">Instant</span> expectedYesterdayDate <span class="token operator">=</span> <span class="token class-name">Instant</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span><span class="token string">&quot;2023-10-24&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span>expectedYesterdayDate<span class="token punctuation">,</span> yesterdayDate<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们前面提到的，24 * 60 * 60 * 1000表示一天的毫秒数。所以在这里，我们从给定的日期中减去一天。</p><h3 id="_3-使用joda-time" tabindex="-1"><a class="header-anchor" href="#_3-使用joda-time"><span>3. 使用Joda-Time</span></a></h3><p>同样，我们可以使用Joda-Time API来回答我们的中心问题。首先，我们需要将其依赖项添加到_pom.xml_文件中：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>``joda-time``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>``joda-time``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>``2.10``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>``\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Joda-Time是在Java 8发布之前日期和时间操作的事实标准。它提供了自己的_LocalDate_类版本。那么，让我们在实践中看到：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">givenDate_whenUsingJodaTimeLocalDateClass_thenReturnYesterday</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name"><span class="token namespace">org<span class="token punctuation">.</span>joda<span class="token punctuation">.</span>time<span class="token punctuation">.</span></span>LocalDate</span> localDate <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name"><span class="token namespace">org<span class="token punctuation">.</span>joda<span class="token punctuation">.</span>time<span class="token punctuation">.</span></span>LocalDate</span><span class="token punctuation">(</span><span class="token number">2023</span><span class="token punctuation">,</span> <span class="token number">12</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name"><span class="token namespace">org<span class="token punctuation">.</span>joda<span class="token punctuation">.</span>time<span class="token punctuation">.</span></span>LocalDate</span> yesterdayDate <span class="token operator">=</span> localDate<span class="token punctuation">.</span><span class="token function">minusDays</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name"><span class="token namespace">org<span class="token punctuation">.</span>joda<span class="token punctuation">.</span>time<span class="token punctuation">.</span></span>LocalDate</span> expectedYesterdayDate <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name"><span class="token namespace">org<span class="token punctuation">.</span>joda<span class="token punctuation">.</span>time<span class="token punctuation">.</span></span>LocalDate</span><span class="token punctuation">(</span><span class="token number">2023</span><span class="token punctuation">,</span> <span class="token number">12</span><span class="token punctuation">,</span> <span class="token number">19</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span>expectedYesterdayDate<span class="token punctuation">,</span> yesterdayDate<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>简而言之，<strong>这个类提供了完全相同的方法_minusDays()_，我们可以使用它来减去特定数量的天数，正如它的名字所指示的</strong>。</p><h3 id="_4-使用apache-commons-lang3" tabindex="-1"><a class="header-anchor" href="#_4-使用apache-commons-lang3"><span>4. 使用Apache Commons Lang3</span></a></h3><p>另一方面，我们可以选择Apache Commons Lang3库。像往常一样，在开始使用之前，我们需要添加Maven依赖项：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>``org.apache.commons``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>``commons-lang3``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>``3.12.0``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>``\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们演示如何使用这个库来获取昨天的日期：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">givenDate_whenUsingApacheCommonsLangDateUtils_thenReturnYesterday</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">Date</span> date <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">GregorianCalendar</span><span class="token punctuation">(</span><span class="token number">2023</span><span class="token punctuation">,</span> <span class="token class-name">Calendar</span><span class="token punctuation">.</span><span class="token constant">MAY</span><span class="token punctuation">,</span> <span class="token number">16</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">Date</span> yesterdayDate <span class="token operator">=</span> <span class="token class-name">DateUtils</span><span class="token punctuation">.</span><span class="token function">addDays</span><span class="token punctuation">(</span>date<span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">Date</span> expectedYesterdayDate <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">GregorianCalendar</span><span class="token punctuation">(</span><span class="token number">2023</span><span class="token punctuation">,</span> <span class="token class-name">Calendar</span><span class="token punctuation">.</span><span class="token constant">MAY</span><span class="token punctuation">,</span> <span class="token number">15</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span>expectedYesterdayDate<span class="token punctuation">,</span> yesterdayDate<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Apache Commons Lang3库提供了_DateUtils()_类进行日期时间操作。<strong>这个实用类提供了_addDays()_方法来添加天数，在我们的情况下是-1</strong>。</p><p>请注意，该方法返回一个新的_Date_对象。原始给定的日期保持不变。</p><h3 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h3><p>在这篇短文中，我们详细解释了如何在Java中获取昨天的日期。在整个课程中，我们展示了如何使用核心Java类来实现。然后，我们展示了如何使用Apache Commons Lang3和Joda-Time等外部库。</p><p>一如既往，本文中使用的代码可以在GitHub上找到。</p>',45),o=[p];function c(l,i){return s(),n("div",null,o)}const k=a(e,[["render",c],["__file","2024-07-03-Getting Yesterday s Date in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-03/2024-07-03-Getting%20Yesterday%20s%20Date%20in%20Java.html","title":"在Java中获取昨天的日期","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Date and Time"],"tag":["Java","Date","Time"],"head":[["meta",{"name":"keywords","content":"Java, Date, Time, Yesterday"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-03/2024-07-03-Getting%20Yesterday%20s%20Date%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Java中获取昨天的日期"}],["meta",{"property":"og:description","content":"在Java中获取昨天的日期 在这篇简短的教程中，我们将探索在Java中获取昨天日期的不同方法。 首先，我们将解释如何使用核心Java来实现。然后，我们将演示如何使用诸如Joda-Time和Apache Commons Lang等外部库来解决我们的主要难题。 1. Java 8之前 在Java 8之前，我们通常会使用_Date_或_Calendar_来处..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-03T03:54:53.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Date"}],["meta",{"property":"article:tag","content":"Time"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-03T03:54:53.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Java中获取昨天的日期\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-03T03:54:53.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Java中获取昨天的日期 在这篇简短的教程中，我们将探索在Java中获取昨天日期的不同方法。 首先，我们将解释如何使用核心Java来实现。然后，我们将演示如何使用诸如Joda-Time和Apache Commons Lang等外部库来解决我们的主要难题。 1. Java 8之前 在Java 8之前，我们通常会使用_Date_或_Calendar_来处..."},"headers":[{"level":3,"title":"1. Java 8之前","slug":"_1-java-8之前","link":"#_1-java-8之前","children":[]},{"level":3,"title":"2. Java 8日期时间API","slug":"_2-java-8日期时间api","link":"#_2-java-8日期时间api","children":[]},{"level":3,"title":"3. 使用Joda-Time","slug":"_3-使用joda-time","link":"#_3-使用joda-time","children":[]},{"level":3,"title":"4. 使用Apache Commons Lang3","slug":"_4-使用apache-commons-lang3","link":"#_4-使用apache-commons-lang3","children":[]},{"level":3,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1719978893000,"updatedTime":1719978893000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.18,"words":1253},"filePathRelative":"posts/baeldung/2024-07-03/2024-07-03-Getting Yesterday s Date in Java.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>在Java中获取昨天的日期</h1>\\n<p>在这篇简短的教程中，我们将探索在Java中获取昨天日期的不同方法。</p>\\n<p>首先，我们将解释如何使用核心Java来实现。然后，我们将演示如何使用诸如Joda-Time和Apache Commons Lang等外部库来解决我们的主要难题。</p>\\n<h3>1. Java 8之前</h3>\\n<p>在Java 8之前，我们通常会使用_Date_或_Calendar_来处理和操作日期/时间信息。那么，让我们看看如何使用这两个类来获取昨天的日期。</p>\\n<h4>1.1 使用_Date_</h4>\\n<p>_Date_类表示一个特定的时间点。它提供了一组方法来操作和检索有关日期的信息。然而，重要的是要提到<strong>这个类已经过时并被标记为已弃用</strong>。</p>","autoDesc":true}');export{k as comp,d as data};
