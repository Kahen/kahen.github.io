import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-CBerKIce.js";const e={},p=t(`<h1 id="java中将instant格式化为string的方法" tabindex="-1"><a class="header-anchor" href="#java中将instant格式化为string的方法"><span>Java中将Instant格式化为String的方法</span></a></h1><p>在本教程中，我们将学习<strong>如何在Java中将一个瞬间（Instant）格式化为字符串（String）</strong>。</p><p>首先，我们将从一些关于Java中瞬间是什么的背景知识开始。然后，我们将演示如何使用Java核心库和第三方库，例如Joda-Time，来回答我们的中心问题。</p><h3 id="_2-1-使用datetimeformatter类" tabindex="-1"><a class="header-anchor" href="#_2-1-使用datetimeformatter类"><span>2.1 使用DateTimeFormatter类</span></a></h3><p>通常来说，我们需要一个格式化器来格式化一个Instant对象。幸运的是，Java 8引入了DateTimeFormatter类来统一格式化日期和时间。</p><p>简单来说，DateTimeFormatter提供了format()方法来完成这项工作。</p><p>基本上，<strong>DateTimeFormatter需要一个时区来格式化一个瞬间</strong>。如果没有指定时区，它将无法将瞬间转换为人类可读的日期/时间字段。</p><p>例如，假设我们想使用dd.MM.yyyy格式来显示我们的Instant实例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FormatInstantUnitTest</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">PATTERN_FORMAT</span> <span class="token operator">=</span> <span class="token string">&quot;dd.MM.yyyy&quot;</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenInstant_whenUsingDateTimeFormatter_thenFormat</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">DateTimeFormatter</span> formatter <span class="token operator">=</span> <span class="token class-name">DateTimeFormatter</span><span class="token punctuation">.</span><span class="token function">ofPattern</span><span class="token punctuation">(</span><span class="token constant">PATTERN_FORMAT</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">withZone</span><span class="token punctuation">(</span><span class="token class-name">ZoneId</span><span class="token punctuation">.</span><span class="token function">systemDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">Instant</span> instant <span class="token operator">=</span> <span class="token class-name">Instant</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span><span class="token string">&quot;2022-02-15T18:35:24.00Z&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> formattedInstant <span class="token operator">=</span> formatter<span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span>instant<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token function">assertThat</span><span class="token punctuation">(</span>formattedInstant<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token string">&quot;15.02.2022&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上所示，我们可以使用withZone()方法来指定时区。</p><p>请注意，<strong>未指定时区将导致UnsupportedTemporalTypeException异常</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span><span class="token punctuation">(</span>expected <span class="token operator">=</span> <span class="token class-name">UnsupportedTemporalTypeException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenInstant_whenNotSpecifyingTimeZone_thenThrowException</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">DateTimeFormatter</span> formatter <span class="token operator">=</span> <span class="token class-name">DateTimeFormatter</span><span class="token punctuation">.</span><span class="token function">ofPattern</span><span class="token punctuation">(</span><span class="token constant">PATTERN_FORMAT</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">Instant</span> instant <span class="token operator">=</span> <span class="token class-name">Instant</span><span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    formatter<span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span>instant<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-使用tostring-方法" tabindex="-1"><a class="header-anchor" href="#_2-2-使用tostring-方法"><span>2.2 使用toString()方法</span></a></h3><p>另一种解决方案是使用toString()方法来获取Instant对象的字符串表示。</p><p>让我们通过一个测试用例来示例toString()方法的使用：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenInstant_whenUsingToString_thenFormat</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Instant</span> instant <span class="token operator">=</span> <span class="token class-name">Instant</span><span class="token punctuation">.</span><span class="token function">ofEpochMilli</span><span class="token punctuation">(</span><span class="token number">1641828224000L</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> formattedInstant <span class="token operator">=</span> instant<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertThat</span><span class="token punctuation">(</span>formattedInstant<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token string">&quot;2022-01-10T15:23:44Z&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种方法的局限性是，<strong>我们不能使用自定义的、人类友好的格式来显示瞬间</strong>。</p><h3 id="_3-joda-time库" tabindex="-1"><a class="header-anchor" href="#_3-joda-time库"><span>3. Joda-Time库</span></a></h3><p>或者，我们可以使用Joda-Time API来实现相同的目标。这个库提供了一套现成的类和接口，用于在Java中操作日期和时间。</p><p>在这些类中，我们将找到DateTimeFormat类。顾名思义，<strong>这个类可以用来将日期/时间数据格式化或解析为字符串</strong>。</p><p>让我们说明如何使用DateTimeFormatter将瞬间转换为字符串：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenInstant_whenUsingJodaTime_thenFormat</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name"><span class="token namespace">org<span class="token punctuation">.</span>joda<span class="token punctuation">.</span>time<span class="token punctuation">.</span></span>Instant</span> instant <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name"><span class="token namespace">org<span class="token punctuation">.</span>joda<span class="token punctuation">.</span>time<span class="token punctuation">.</span></span>Instant</span><span class="token punctuation">(</span><span class="token string">&quot;2022-03-20T10:11:12&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">String</span> formattedInstant <span class="token operator">=</span> <span class="token class-name">DateTimeFormat</span><span class="token punctuation">.</span><span class="token function">forPattern</span><span class="token punctuation">(</span><span class="token constant">PATTERN_FORMAT</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span>instant<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertThat</span><span class="token punctuation">(</span>formattedInstant<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token string">&quot;20.03.2022&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如我们所见，DateTimeFormatter提供了forPattern()来指定格式化模式，以及print()来格式化Instant对象。</p><h3 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h3><p>在本文中，我们深入覆盖了如何在Java中将瞬间格式化为字符串。</p><p>我们探索了使用Java核心方法实现此目的的几种方式。然后我们解释了如何使用Joda-Time库来完成同样的事情。</p><p>一如既往，本文中使用的代码可以在GitHub上找到。</p>`,27),o=[p];function i(c,l){return s(),a("div",null,o)}const d=n(e,[["render",i],["__file","2024-07-20-Format Instant to String in Java.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-07-20/2024-07-20-Format%20Instant%20to%20String%20in%20Java.html","title":"Java中将Instant格式化为String的方法","lang":"zh-CN","frontmatter":{"date":"2024-07-20T00:00:00.000Z","category":["Java","日期时间"],"tag":["Instant","String","DateTimeFormatter","Joda-Time"],"head":[["meta",{"name":"keywords","content":"Java, Instant, String, DateTimeFormatter, Joda-Time"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-20/2024-07-20-Format%20Instant%20to%20String%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中将Instant格式化为String的方法"}],["meta",{"property":"og:description","content":"Java中将Instant格式化为String的方法 在本教程中，我们将学习如何在Java中将一个瞬间（Instant）格式化为字符串（String）。 首先，我们将从一些关于Java中瞬间是什么的背景知识开始。然后，我们将演示如何使用Java核心库和第三方库，例如Joda-Time，来回答我们的中心问题。 2.1 使用DateTimeFormatte..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-20T08:40:29.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Instant"}],["meta",{"property":"article:tag","content":"String"}],["meta",{"property":"article:tag","content":"DateTimeFormatter"}],["meta",{"property":"article:tag","content":"Joda-Time"}],["meta",{"property":"article:published_time","content":"2024-07-20T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-20T08:40:29.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中将Instant格式化为String的方法\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-20T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-20T08:40:29.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中将Instant格式化为String的方法 在本教程中，我们将学习如何在Java中将一个瞬间（Instant）格式化为字符串（String）。 首先，我们将从一些关于Java中瞬间是什么的背景知识开始。然后，我们将演示如何使用Java核心库和第三方库，例如Joda-Time，来回答我们的中心问题。 2.1 使用DateTimeFormatte..."},"headers":[{"level":3,"title":"2.1 使用DateTimeFormatter类","slug":"_2-1-使用datetimeformatter类","link":"#_2-1-使用datetimeformatter类","children":[]},{"level":3,"title":"2.2 使用toString()方法","slug":"_2-2-使用tostring-方法","link":"#_2-2-使用tostring-方法","children":[]},{"level":3,"title":"3. Joda-Time库","slug":"_3-joda-time库","link":"#_3-joda-time库","children":[]},{"level":3,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1721464829000,"updatedTime":1721464829000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.35,"words":704},"filePathRelative":"posts/baeldung/2024-07-20/2024-07-20-Format Instant to String in Java.md","localizedDate":"2024年7月20日","excerpt":"\\n<p>在本教程中，我们将学习<strong>如何在Java中将一个瞬间（Instant）格式化为字符串（String）</strong>。</p>\\n<p>首先，我们将从一些关于Java中瞬间是什么的背景知识开始。然后，我们将演示如何使用Java核心库和第三方库，例如Joda-Time，来回答我们的中心问题。</p>\\n<h3>2.1 使用DateTimeFormatter类</h3>\\n<p>通常来说，我们需要一个格式化器来格式化一个Instant对象。幸运的是，Java 8引入了DateTimeFormatter类来统一格式化日期和时间。</p>\\n<p>简单来说，DateTimeFormatter提供了format()方法来完成这项工作。</p>","autoDesc":true}');export{d as comp,m as data};
