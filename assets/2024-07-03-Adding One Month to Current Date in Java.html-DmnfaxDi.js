import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-BEVMBw2k.js";const p={},e=t(`<h1 id="在java中向当前日期添加一个月" tabindex="-1"><a class="header-anchor" href="#在java中向当前日期添加一个月"><span>在Java中向当前日期添加一个月</span></a></h1><p>在本简短教程中，我们将学习如何在Java中向当前日期添加一个月。</p><p>首先，我们将了解如何使用Java核心方法来实现这一点。然后，我们将看看如何使用Joda-Time和Apache Commons Lang3等外部库来完成相同的任务。</p><h2 id="_2-java核心方法" tabindex="-1"><a class="header-anchor" href="#_2-java核心方法"><span>2. Java核心方法</span></a></h2><p>Java提供了几种方便的方式来操作日期和时间。让我们探索不同的选项来向当前日期添加一个月。</p><h3 id="_2-1-使用calendar类" tabindex="-1"><a class="header-anchor" href="#_2-1-使用calendar类"><span>2.1 使用Calendar类</span></a></h3><p>对于Java 8之前的版本，我们可以使用Calendar来处理时间数据。这个类提供了一组我们可以用于操作日期和时间的方法。</p><p>让我们看看它在实际中的应用：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenCalendarDate_whenAddingOneMonth_thenDateIsChangedCorrectly</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Calendar</span> calendar <span class="token operator">=</span> <span class="token class-name">Calendar</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 虚拟当前日期</span>
    calendar<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token number">2023</span><span class="token punctuation">,</span> <span class="token class-name">Calendar</span><span class="token punctuation">.</span><span class="token constant">APRIL</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 添加一个月</span>
    calendar<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token class-name">Calendar</span><span class="token punctuation">.</span><span class="token constant">MONTH</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token class-name">Calendar</span><span class="token punctuation">.</span><span class="token constant">MAY</span><span class="token punctuation">,</span> calendar<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token class-name">Calendar</span><span class="token punctuation">.</span><span class="token constant">MONTH</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">,</span> calendar<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token class-name">Calendar</span><span class="token punctuation">.</span><span class="token constant">DAY_OF_MONTH</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">2023</span><span class="token punctuation">,</span> calendar<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token class-name">Calendar</span><span class="token punctuation">.</span><span class="token constant">YEAR</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，我们使用了add()方法向给定的日期添加了整整一个月。Calendar.MONTH是表示月份的常量。</p><h3 id="_2-2-使用date类" tabindex="-1"><a class="header-anchor" href="#_2-2-使用date类"><span>2.2 使用Date类</span></a></h3><p>Date类是另一个选择，如果我们想要改变特定日期的月份。<strong>然而，这个选择的缺点是这个类已经被弃用了</strong>。</p><p>让我们通过一个测试用例来看看Date的使用：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@SuppressWarnings</span><span class="token punctuation">(</span><span class="token string">&quot;deprecation&quot;</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenDate_whenAddingOneMonth_thenDateIsChangedCorrectly</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Date</span> currentDate <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token number">2023</span><span class="token punctuation">,</span> <span class="token class-name">Calendar</span><span class="token punctuation">.</span><span class="token constant">DECEMBER</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Date</span> expectedDate <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token number">2024</span><span class="token punctuation">,</span> <span class="token class-name">Calendar</span><span class="token punctuation">.</span><span class="token constant">JANUARY</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    currentDate<span class="token punctuation">.</span><span class="token function">setMonth</span><span class="token punctuation">(</span>currentDate<span class="token punctuation">.</span><span class="token function">getMonth</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span>expectedDate<span class="token punctuation">,</span> currentDate<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上所示，Date类提供了getMonth()方法，该方法返回表示月份的数字。此外，我们向返回的数字添加了1。然后，我们调用setMonth()来使用新的月份更新Date对象。</p><p>值得注意的是，总是建议使用Java 8的新日期/时间API而不是旧的API。</p><h3 id="_2-3-使用localdate类" tabindex="-1"><a class="header-anchor" href="#_2-3-使用localdate类"><span>2.3 使用LocalDate类</span></a></h3><p>同样，我们可以使用Java 8中引入的LocalDate类。<strong>这个类通过plusMonths()方法提供了一种简单明了的方式来向特定日期添加月份</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenJavaLocalDate_whenAddingOneMonth_thenDateIsChangedCorrectly</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">LocalDate</span> localDate <span class="token operator">=</span> <span class="token class-name">LocalDate</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token number">2023</span><span class="token punctuation">,</span> <span class="token number">12</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    localDate <span class="token operator">=</span> localDate<span class="token punctuation">.</span><span class="token function">plusMonths</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> localDate<span class="token punctuation">.</span><span class="token function">getMonthValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">,</span> localDate<span class="token punctuation">.</span><span class="token function">getDayOfMonth</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">2024</span><span class="token punctuation">,</span> localDate<span class="token punctuation">.</span><span class="token function">getYear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>毫不意外，测试用例成功通过。</p><h2 id="_3-使用joda-time" tabindex="-1"><a class="header-anchor" href="#_3-使用joda-time"><span>3. 使用Joda-Time</span></a></h2><p>如果Java 8不是一个选项，我们可以选择Joda-Time库来实现相同的目标。</p><p>首先，我们需要将它的依赖项添加到pom.xml文件中：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`\`
    \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`\`joda-time\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`\`
    \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`\`joda-time\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`\`
    \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\`\`2.10\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\`\`
\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Joda-Time提供了它自己的LocalDate类。让我们看看如何使用它来添加一个月：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenJodaTimeLocalDate_whenAddingOneMonth_thenDateIsChangedCorrectly</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name"><span class="token namespace">org<span class="token punctuation">.</span>joda<span class="token punctuation">.</span>time<span class="token punctuation">.</span></span>LocalDate</span> localDate <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name"><span class="token namespace">org<span class="token punctuation">.</span>joda<span class="token punctuation">.</span>time<span class="token punctuation">.</span></span>LocalDate</span><span class="token punctuation">(</span><span class="token number">2023</span><span class="token punctuation">,</span> <span class="token number">12</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    localDate <span class="token operator">=</span> localDate<span class="token punctuation">.</span><span class="token function">plusMonths</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> localDate<span class="token punctuation">.</span><span class="token function">getMonthOfYear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">,</span> localDate<span class="token punctuation">.</span><span class="token function">getDayOfMonth</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">2024</span><span class="token punctuation">,</span> localDate<span class="token punctuation">.</span><span class="token function">getYear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，LocalDate也有相同的plusMonths()方法。<strong>正如名称所示，它允许我们添加一定数量的月份，在我们的例子中是1</strong>。</p><h2 id="_4-使用apache-commons-lang3" tabindex="-1"><a class="header-anchor" href="#_4-使用apache-commons-lang3"><span>4. 使用Apache Commons Lang3</span></a></h2><p>或者，我们可以使用Apache Commons Lang3库。像往常一样，要开始使用这个库，我们首先需要添加Maven依赖项：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`\`
    \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`\`org.apache.commons\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`\`
    \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`\`commons-lang3\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`\`
    \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\`\`3.14.0\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\`\`
\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通常，Apache Commons Lang3提供了DateUtils实用类来执行一系列日期操作。</p><p>让我们通过一个实际的例子来看看如何使用它：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenApacheCommonsLangDateUtils_whenAddingOneMonth_thenDateIsChangedCorrectly</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Date</span> currentDate <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">GregorianCalendar</span><span class="token punctuation">(</span><span class="token number">2023</span><span class="token punctuation">,</span> <span class="token class-name">Calendar</span><span class="token punctuation">.</span><span class="token constant">APRIL</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Date</span> expectedDate <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">GregorianCalendar</span><span class="token punctuation">(</span><span class="token number">2023</span><span class="token punctuation">,</span> <span class="token class-name">Calendar</span><span class="token punctuation">.</span><span class="token constant">MAY</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span>expectedDate<span class="token punctuation">,</span> <span class="token class-name">DateUtils</span><span class="token punctuation">.</span><span class="token function">addMonths</span><span class="token punctuation">(</span>currentDate<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>简而言之，我们使用了addMonths()方法将指定的月份增加一。<strong>这里需要注意的一个要点是这个方法返回一个新的Date对象</strong>。<strong>原始对象保持不变</strong>。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在这篇短文中，我们探讨了在Java中向当前日期添加一个月的不同方式。</p><p>首先，我们看到了如何使用Java核心类来做到这一点。然后，我们学习了如何使用Joda Time和Apache Commons Lang3等第三方库来实现相同的目标。</p><p>正如往常一样，本文中使用的代码示例可以在GitHub上找到。</p>`,38),o=[e];function c(l,i){return s(),a("div",null,o)}const k=n(p,[["render",c],["__file","2024-07-03-Adding One Month to Current Date in Java.html.vue"]]),r=JSON.parse('{"path":"/posts/baeldung/2024-07-03/2024-07-03-Adding%20One%20Month%20to%20Current%20Date%20in%20Java.html","title":"在Java中向当前日期添加一个月","lang":"zh-CN","frontmatter":{"date":"2024-07-04T00:00:00.000Z","category":["Java","日期处理"],"tag":["Java","LocalDate","Calendar","Joda-Time","Apache Commons Lang3"],"head":[["meta",{"name":"keywords","content":"Java, 日期, LocalDate, Calendar, Joda-Time, Apache Commons Lang3"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-03/2024-07-03-Adding%20One%20Month%20to%20Current%20Date%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Java中向当前日期添加一个月"}],["meta",{"property":"og:description","content":"在Java中向当前日期添加一个月 在本简短教程中，我们将学习如何在Java中向当前日期添加一个月。 首先，我们将了解如何使用Java核心方法来实现这一点。然后，我们将看看如何使用Joda-Time和Apache Commons Lang3等外部库来完成相同的任务。 2. Java核心方法 Java提供了几种方便的方式来操作日期和时间。让我们探索不同的选..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-03T21:31:21.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"LocalDate"}],["meta",{"property":"article:tag","content":"Calendar"}],["meta",{"property":"article:tag","content":"Joda-Time"}],["meta",{"property":"article:tag","content":"Apache Commons Lang3"}],["meta",{"property":"article:published_time","content":"2024-07-04T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-03T21:31:21.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Java中向当前日期添加一个月\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-04T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-03T21:31:21.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Java中向当前日期添加一个月 在本简短教程中，我们将学习如何在Java中向当前日期添加一个月。 首先，我们将了解如何使用Java核心方法来实现这一点。然后，我们将看看如何使用Joda-Time和Apache Commons Lang3等外部库来完成相同的任务。 2. Java核心方法 Java提供了几种方便的方式来操作日期和时间。让我们探索不同的选..."},"headers":[{"level":2,"title":"2. Java核心方法","slug":"_2-java核心方法","link":"#_2-java核心方法","children":[{"level":3,"title":"2.1 使用Calendar类","slug":"_2-1-使用calendar类","link":"#_2-1-使用calendar类","children":[]},{"level":3,"title":"2.2 使用Date类","slug":"_2-2-使用date类","link":"#_2-2-使用date类","children":[]},{"level":3,"title":"2.3 使用LocalDate类","slug":"_2-3-使用localdate类","link":"#_2-3-使用localdate类","children":[]}]},{"level":2,"title":"3. 使用Joda-Time","slug":"_3-使用joda-time","link":"#_3-使用joda-time","children":[]},{"level":2,"title":"4. 使用Apache Commons Lang3","slug":"_4-使用apache-commons-lang3","link":"#_4-使用apache-commons-lang3","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720042281000,"updatedTime":1720042281000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.41,"words":1023},"filePathRelative":"posts/baeldung/2024-07-03/2024-07-03-Adding One Month to Current Date in Java.md","localizedDate":"2024年7月4日","excerpt":"\\n<p>在本简短教程中，我们将学习如何在Java中向当前日期添加一个月。</p>\\n<p>首先，我们将了解如何使用Java核心方法来实现这一点。然后，我们将看看如何使用Joda-Time和Apache Commons Lang3等外部库来完成相同的任务。</p>\\n<h2>2. Java核心方法</h2>\\n<p>Java提供了几种方便的方式来操作日期和时间。让我们探索不同的选项来向当前日期添加一个月。</p>\\n<h3>2.1 使用Calendar类</h3>\\n<p>对于Java 8之前的版本，我们可以使用Calendar来处理时间数据。这个类提供了一组我们可以用于操作日期和时间的方法。</p>\\n<p>让我们看看它在实际中的应用：</p>","autoDesc":true}');export{k as comp,r as data};
