import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-DI0Ohe7a.js";const e={},p=t(`<hr><h1 id="在java中检索unix时间" tabindex="-1"><a class="header-anchor" href="#在java中检索unix时间"><span>在Java中检索Unix时间</span></a></h1><p>Unix时间是从1970年1月1日00:00:00 UTC开始经过的总秒数。这个时间点被称为Unix纪元。Unix时间有助于在编程中表示日期和时间。</p><p>在本教程中，我们将学习如何使用旧版Date API、Date Time API和Joda-Time库在Java中检索Unix时间值。</p><h3 id="_2-使用旧版date-api" tabindex="-1"><a class="header-anchor" href="#_2-使用旧版date-api"><span>2. 使用旧版Date API</span></a></h3><p>Date API提供了一个名为_Date_的类，该类提供了一个获取当前时间的方法。<strong>我们可以通过将当前时间的毫秒数除以_1000L_来获取当前的Unix时间</strong>。</p><p>让我们看一个使用_Date_类检索当前Unix时间的示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenTimeUsingDateApi_whenConvertedToUnixTime_thenMatch</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Date</span> date <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token number">2023</span> <span class="token operator">-</span> <span class="token number">1900</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">15</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">long</span> expected <span class="token operator">=</span> <span class="token number">1676419200</span><span class="token punctuation">;</span>
    <span class="token keyword">long</span> actual <span class="token operator">=</span> date<span class="token punctuation">.</span><span class="token function">getTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">1000L</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span>expected<span class="token punctuation">,</span> actual<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们创建一个新的_Date_对象，并用一个固定日期和时间初始化它。接下来，我们调用_Date_对象上的_getTime()_来获取毫秒时间。然后，我们将毫秒时间除以_1000L_以获取Unix时间。</p><p><strong>值得注意的是，标准的Unix时间时间戳是以纪元以来的秒数，而不是毫秒</strong>。</p><p>最后，我们断言结果等于预期的Unix时间。</p><h3 id="_3-使用date-time-api" tabindex="-1"><a class="header-anchor" href="#_3-使用date-time-api"><span>3. 使用Date Time API</span></a></h3><p>Java 8中的新Date Time API提供了_LocalDate_和_Instant_类来操作日期和时间。我们可以通过调用_Instant_对象上的_getEpochSecond()_来获取当前的Unix时间：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenTimeUsingLocalDate_whenConvertedToUnixTime_thenMatch</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">LocalDate</span> date <span class="token operator">=</span> <span class="token class-name">LocalDate</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token number">2023</span><span class="token punctuation">,</span> <span class="token class-name">Month</span><span class="token punctuation">.</span><span class="token constant">FEBRUARY</span><span class="token punctuation">,</span> <span class="token number">15</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Instant</span> instant <span class="token operator">=</span> date<span class="token punctuation">.</span><span class="token function">atStartOfDay</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">atZone</span><span class="token punctuation">(</span><span class="token class-name">ZoneId</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;UTC&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toInstant</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">long</span> expected <span class="token operator">=</span> <span class="token number">1676419200</span><span class="token punctuation">;</span>
    <span class="token keyword">long</span> actual <span class="token operator">=</span> instant<span class="token punctuation">.</span><span class="token function">getEpochSecond</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span>expected<span class="token punctuation">,</span> actual<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们创建一个_LocalDate_对象来表示一个固定的时间。接下来，我们将_LocalDate_对象传递给_Instant_对象以表示一天的开始。</p><p>此外，我们调用_Instant_对象上的_getEpochSecond()_来获取指定时间的Unix时间值。</p><p>最后，我们断言返回的Unix时间值等于预期的Unix时间戳。</p><h3 id="_4-使用joda-time库" tabindex="-1"><a class="header-anchor" href="#_4-使用joda-time库"><span>4. 使用Joda-Time库</span></a></h3><p>Joda-Time库提供了一个_DateTime_类来获取当前时间。获取当前时间后，我们可以轻松计算Unix时间。要使用Joda Time，让我们在_pom.xml_中添加它的依赖：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`joda-time\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`joda-time\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\`2.12.5\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\`
\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以下是使用Joda-Time库中的_DateTime_类检索Unix时间的示例代码：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenTimeUsingJodaTime_whenConvertedToUnixTime_thenMatch</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">DateTime</span> dateTime <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DateTime</span><span class="token punctuation">(</span><span class="token number">2023</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">15</span><span class="token punctuation">,</span> <span class="token number">00</span><span class="token punctuation">,</span> <span class="token number">00</span><span class="token punctuation">,</span> <span class="token number">00</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">long</span> expected <span class="token operator">=</span> <span class="token number">1676419200</span><span class="token punctuation">;</span>
    <span class="token keyword">long</span> actual <span class="token operator">=</span> dateTime<span class="token punctuation">.</span><span class="token function">getMillis</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">1000L</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span>expected<span class="token punctuation">,</span> actual<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的代码中，我们使用固定日期和时间创建了一个_DateTime_的实例，并调用了_getMillis()_方法。接下来，我们将其除以_1000L_以获取Unix时间戳。</p><h3 id="_5-避免2038年问题" tabindex="-1"><a class="header-anchor" href="#_5-避免2038年问题"><span>5. 避免2038年问题</span></a></h3><p>通常，Unix时间在许多系统和编程语言中以有符号的32位整数存储。然而，32位整数可以存储的最大值是_2 147 483 647_。</p><p><strong>这为Unix时间创造了一个问题，因为在2038年1月19日03:14:07 UTC，Unix时间值将达到其限制</strong>。下一秒将回滚到一个负数，这可能导致系统出现故障行为、应用程序失败、崩溃和系统故障。</p><p>我们可以通过在Java中将Unix时间存储在64位长整数而不是32位整数来避免这个限制。</p><h3 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h3><p>在本文中，我们学习了如何使用旧版Data API、Date Time API和Joda-Time库来检索Unix时间。将Unix时间值存储在64位长整数中可以避免未来日期的任何限制或溢出问题。</p><p>如常，示例的完整源代码可在GitHub上找到。</p>`,30),o=[p];function i(c,l){return s(),a("div",null,o)}const d=n(e,[["render",i],["__file","2024-06-26-Retrieving Unix Time in Java.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-06-26/2024-06-26-Retrieving%20Unix%20Time%20in%20Java.html","title":"在Java中检索Unix时间","lang":"zh-CN","frontmatter":{"date":"2024-06-26T00:00:00.000Z","category":["Java","Unix Time"],"tag":["Java","Unix Time","Legacy Date API","Date Time API","Joda-Time"],"head":[["meta",{"name":"keywords","content":"Java, Unix Time, Legacy Date API, Date Time API, Joda-Time"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-26/2024-06-26-Retrieving%20Unix%20Time%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Java中检索Unix时间"}],["meta",{"property":"og:description","content":"在Java中检索Unix时间 Unix时间是从1970年1月1日00:00:00 UTC开始经过的总秒数。这个时间点被称为Unix纪元。Unix时间有助于在编程中表示日期和时间。 在本教程中，我们将学习如何使用旧版Date API、Date Time API和Joda-Time库在Java中检索Unix时间值。 2. 使用旧版Date API Date..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-26T13:51:05.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Unix Time"}],["meta",{"property":"article:tag","content":"Legacy Date API"}],["meta",{"property":"article:tag","content":"Date Time API"}],["meta",{"property":"article:tag","content":"Joda-Time"}],["meta",{"property":"article:published_time","content":"2024-06-26T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-26T13:51:05.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Java中检索Unix时间\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-26T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-26T13:51:05.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Java中检索Unix时间 Unix时间是从1970年1月1日00:00:00 UTC开始经过的总秒数。这个时间点被称为Unix纪元。Unix时间有助于在编程中表示日期和时间。 在本教程中，我们将学习如何使用旧版Date API、Date Time API和Joda-Time库在Java中检索Unix时间值。 2. 使用旧版Date API Date..."},"headers":[{"level":3,"title":"2. 使用旧版Date API","slug":"_2-使用旧版date-api","link":"#_2-使用旧版date-api","children":[]},{"level":3,"title":"3. 使用Date Time API","slug":"_3-使用date-time-api","link":"#_3-使用date-time-api","children":[]},{"level":3,"title":"4. 使用Joda-Time库","slug":"_4-使用joda-time库","link":"#_4-使用joda-time库","children":[]},{"level":3,"title":"5. 避免2038年问题","slug":"_5-避免2038年问题","link":"#_5-避免2038年问题","children":[]},{"level":3,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1719409865000,"updatedTime":1719409865000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.11,"words":934},"filePathRelative":"posts/baeldung/2024-06-26/2024-06-26-Retrieving Unix Time in Java.md","localizedDate":"2024年6月26日","excerpt":"<hr>\\n<h1>在Java中检索Unix时间</h1>\\n<p>Unix时间是从1970年1月1日00:00:00 UTC开始经过的总秒数。这个时间点被称为Unix纪元。Unix时间有助于在编程中表示日期和时间。</p>\\n<p>在本教程中，我们将学习如何使用旧版Date API、Date Time API和Joda-Time库在Java中检索Unix时间值。</p>\\n<h3>2. 使用旧版Date API</h3>\\n<p>Date API提供了一个名为_Date_的类，该类提供了一个获取当前时间的方法。<strong>我们可以通过将当前时间的毫秒数除以_1000L_来获取当前的Unix时间</strong>。</p>","autoDesc":true}');export{d as comp,k as data};
