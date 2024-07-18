import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as t,a as s}from"./app-CE5go3V-.js";const e={},o=s(`<h1 id="java中将字符串转换为instant" tabindex="-1"><a class="header-anchor" href="#java中将字符串转换为instant"><span>Java中将字符串转换为Instant</span></a></h1><p>在本快速教程中，<strong>我们将解释如何使用Java中的java.time包中的类将_字符串_转换为_Instant_</strong>。首先，我们将使用_LocalDateTime_类实现一个解决方案。然后，我们将使用_Instant_类来获取一个时区内的瞬间。</p><h3 id="_2-使用-localdatetime-类" tabindex="-1"><a class="header-anchor" href="#_2-使用-localdatetime-类"><span>2. 使用_LocalDateTime_类</span></a></h3><p><em><strong>java.time.LocalDateTime</strong></em> <strong>表示没有时区的日期和/或时间</strong>。它是一个局部时间对象，意味着它只在特定的上下文中有效，不能在这个上下文之外使用。这个上下文通常是执行代码的机器。</p><p>要从_字符串_获取时间，我们可以使用_DateTimeFormatter_创建一个格式化的对象，并将此格式化器传递给_LocalDateTime_的_parse_方法。我们也可以定义自己的格式化器或使用_DateTimeFormatter_类提供的预定义格式化器。</p><p>让我们看看如何使用_LocalDateTime.parse()_从_字符串_获取时间：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> stringDate <span class="token operator">=</span> <span class="token string">&quot;09:15:30 PM, Sun 10/09/2022&quot;</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> pattern <span class="token operator">=</span> <span class="token string">&quot;hh:mm:ss a, EEE M/d/uuuu&quot;</span><span class="token punctuation">;</span>
<span class="token class-name">DateTimeFormatter</span> dateTimeFormatter <span class="token operator">=</span> <span class="token class-name">DateTimeFormatter</span><span class="token punctuation">.</span><span class="token function">ofPattern</span><span class="token punctuation">(</span>pattern<span class="token punctuation">,</span> <span class="token class-name">Locale</span><span class="token punctuation">.</span><span class="token constant">US</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">LocalDateTime</span> localDateTime <span class="token operator">=</span> <span class="token class-name">LocalDateTime</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>stringDate<span class="token punctuation">,</span> dateTimeFormatter<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的例子中，我们使用_LocalDateTime_类，这是表示带有时间的日期的标准类，来解析日期_字符串_。我们还可以使用_java.time.LocalDate_来表示只有日期而没有时间。</p><h3 id="_3-使用-instant-类" tabindex="-1"><a class="header-anchor" href="#_3-使用-instant-类"><span>3. 使用_Instant_类</span></a></h3><p><strong>java.time.Instant类，是Date-Time API的主要类之一，封装了时间线上的一个点</strong>。它类似于_java.util.Date_类，但提供了纳秒精度。</p><p>在我们下一个例子中，我们将使用前面的_LocalDateTime_来获取一个指定_ZoneId_的瞬间：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> stringDate <span class="token operator">=</span> <span class="token string">&quot;09:15:30 PM, Sun 10/09/2022&quot;</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> pattern <span class="token operator">=</span> <span class="token string">&quot;hh:mm:ss a, EEE M/d/uuuu&quot;</span><span class="token punctuation">;</span>
<span class="token class-name">DateTimeFormatter</span> dateTimeFormatter <span class="token operator">=</span> <span class="token class-name">DateTimeFormatter</span><span class="token punctuation">.</span><span class="token function">ofPattern</span><span class="token punctuation">(</span>pattern<span class="token punctuation">,</span> <span class="token class-name">Locale</span><span class="token punctuation">.</span><span class="token constant">US</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">LocalDateTime</span> localDateTime <span class="token operator">=</span> <span class="token class-name">LocalDateTime</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>stringDate<span class="token punctuation">,</span> dateTimeFormatter<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">ZoneId</span> zoneId <span class="token operator">=</span> <span class="token class-name">ZoneId</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;America/Chicago&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">ZonedDateTime</span> zonedDateTime <span class="token operator">=</span> localDateTime<span class="token punctuation">.</span><span class="token function">atZone</span><span class="token punctuation">(</span>zoneId<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Instant</span> instant <span class="token operator">=</span> zonedDateTime<span class="token punctuation">.</span><span class="token function">toInstant</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的例子中，我们首先创建一个_ZoneId_对象，它用于识别一个时区，然后我们提供_LocalDateTime_和_Instant_之间的转换规则。</p><p>接下来，我们使用_ZonedDateTime_，它封装了一个带有时区和相应偏移的日期和时间。_ZonedDateTime_类是Date-Time API中最接近_java.util.GregorianCalendar_类的类。最后，我们使用_ZonedDateTime.toInstant()<em>方法获取一个_Instant</em>，它将一个时区中的时刻调整为UTC。</p><h3 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h3><p>在本快速教程中，我们解释了<strong>如何使用java.time包中的类将_字符串_转换为_Instant_</strong>。像往常一样，代码片段可以在GitHub上找到。</p>`,16),p=[o];function c(i,l){return t(),n("div",null,p)}const u=a(e,[["render",c],["__file","2024-07-12-Convert String to Instant.html.vue"]]),_=JSON.parse('{"path":"/posts/baeldung/2024-07-12/2024-07-12-Convert%20String%20to%20Instant.html","title":"Java中将字符串转换为Instant","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Date-Time API"],"tag":["String to Instant","LocalDateTime","Instant"],"head":[["meta",{"name":"keywords","content":"Java, Instant, LocalDateTime, Date-Time API"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-12/2024-07-12-Convert%20String%20to%20Instant.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中将字符串转换为Instant"}],["meta",{"property":"og:description","content":"Java中将字符串转换为Instant 在本快速教程中，我们将解释如何使用Java中的java.time包中的类将_字符串_转换为_Instant_。首先，我们将使用_LocalDateTime_类实现一个解决方案。然后，我们将使用_Instant_类来获取一个时区内的瞬间。 2. 使用_LocalDateTime_类 java.time.LocalD..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-12T23:39:15.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"String to Instant"}],["meta",{"property":"article:tag","content":"LocalDateTime"}],["meta",{"property":"article:tag","content":"Instant"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-12T23:39:15.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中将字符串转换为Instant\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-12T23:39:15.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中将字符串转换为Instant 在本快速教程中，我们将解释如何使用Java中的java.time包中的类将_字符串_转换为_Instant_。首先，我们将使用_LocalDateTime_类实现一个解决方案。然后，我们将使用_Instant_类来获取一个时区内的瞬间。 2. 使用_LocalDateTime_类 java.time.LocalD..."},"headers":[{"level":3,"title":"2. 使用_LocalDateTime_类","slug":"_2-使用-localdatetime-类","link":"#_2-使用-localdatetime-类","children":[]},{"level":3,"title":"3. 使用_Instant_类","slug":"_3-使用-instant-类","link":"#_3-使用-instant-类","children":[]},{"level":3,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1720827555000,"updatedTime":1720827555000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.11,"words":633},"filePathRelative":"posts/baeldung/2024-07-12/2024-07-12-Convert String to Instant.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在本快速教程中，<strong>我们将解释如何使用Java中的java.time包中的类将_字符串_转换为_Instant_</strong>。首先，我们将使用_LocalDateTime_类实现一个解决方案。然后，我们将使用_Instant_类来获取一个时区内的瞬间。</p>\\n<h3>2. 使用_LocalDateTime_类</h3>\\n<p><em><strong>java.time.LocalDateTime</strong></em> <strong>表示没有时区的日期和/或时间</strong>。它是一个局部时间对象，意味着它只在特定的上下文中有效，不能在这个上下文之外使用。这个上下文通常是执行代码的机器。</p>","autoDesc":true}');export{u as comp,_ as data};
