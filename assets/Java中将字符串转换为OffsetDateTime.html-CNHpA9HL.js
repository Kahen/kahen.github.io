import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as e}from"./app-hBlfnCEU.js";const t={},p=e(`<hr><h1 id="java中将字符串转换为offsetdatetime" tabindex="-1"><a class="header-anchor" href="#java中将字符串转换为offsetdatetime"><span>Java中将字符串转换为OffsetDateTime</span></a></h1><p>在软件开发中，处理日期和时间值是一项常见任务，尤其是在构建涉及调度、日志记录或任何时间敏感操作的应用程序时。在相同的背景下，Java中的_OffsetDateTime_类提供了一种强大的解决方案，用于表示带有UTC/GMT偏移量的日期和时间信息。</p><p><strong>在本教程中，我们将探讨如何高效地将表示日期和时间信息的字符串转换为Java中的_OffsetDateTime_对象。</strong></p><h3 id="_2-使用-offsetdatetime-parse-方法" tabindex="-1"><a class="header-anchor" href="#_2-使用-offsetdatetime-parse-方法"><span>2. 使用_OffsetDateTime.parse()_方法</span></a></h3><p>将字符串转换为_OffsetDateTime_对象的最简单方法之一是使用_OffsetDateTime.parse(CharSequence text)_方法。此方法根据ISO-8601格式解析输入字符串，并返回表示解析日期和时间的_OffsetDateTime_对象：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> dateTimeString <span class="token operator">=</span> <span class="token string">&quot;2024-04-11T10:15:30+01:00&quot;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenDateTimeString_whenUsingOffsetDateTimeParse_thenConvertToOffsetDateTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">OffsetDateTime</span> offsetDateTime <span class="token operator">=</span> <span class="token class-name">OffsetDateTime</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>dateTimeString<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">OffsetDateTime</span> expected <span class="token operator">=</span> <span class="token class-name">OffsetDateTime</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token number">2024</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">15</span><span class="token punctuation">,</span> <span class="token number">30</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token class-name">ZoneOffset</span><span class="token punctuation">.</span><span class="token function">ofHours</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span>expected<span class="token punctuation">,</span> offsetDateTime<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，_dateTimeString_表示一个按照ISO-8601标准格式化的特定日期和时间。此外，我们使用_OffsetDateTime.parse()_方法，它解释输入字符串_dateTimeString_并相应地构建一个_OffsetDateTime_对象。</p><p>此外，此解析过程涉及从字符串中提取日期和时间的各个组成部分，并确定UTC/GMT的偏移量。生成的_OffsetDateTime_对象表示解析的日期和时间信息，包括偏移量。</p><h3 id="_3-使用-datetimeformatter-与-offsetdatetime-parse" tabindex="-1"><a class="header-anchor" href="#_3-使用-datetimeformatter-与-offsetdatetime-parse"><span>3. 使用_DateTimeFormatter_与_OffsetDateTime.parse()_</span></a></h3><p>将字符串转换为_OffsetDateTime_对象的另一种方法是使用_DateTimeFormatter_类来明确指定输入字符串的格式。请注意，这种方法提供了更多的灵活性，并允许解析具有自定义日期和时间格式的字符串。</p><p>以下是实现：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenDateTimeStringAndFormatter_whenUsingDateTimeFormatter_thenConvertToOffsetDateTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> customDateTimeString <span class="token operator">=</span> <span class="token string">&quot;11-04-2024 10:15:30 +0100&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">DateTimeFormatter</span> formatter <span class="token operator">=</span> <span class="token class-name">DateTimeFormatter</span><span class="token punctuation">.</span><span class="token function">ofPattern</span><span class="token punctuation">(</span><span class="token string">&quot;dd-MM-yyyy HH:mm:ss Z&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">OffsetDateTime</span> offsetDateTime <span class="token operator">=</span> <span class="token class-name">OffsetDateTime</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>customDateTimeString<span class="token punctuation">,</span> formatter<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">OffsetDateTime</span> expected <span class="token operator">=</span> <span class="token class-name">OffsetDateTime</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token number">2024</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">15</span><span class="token punctuation">,</span> <span class="token number">30</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token class-name">ZoneOffset</span><span class="token punctuation">.</span><span class="token function">ofHours</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span>expected<span class="token punctuation">,</span> offsetDateTime<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们使用_DateTimeFormatter_类创建一个自定义的_formatter_，对应于输入字符串的格式。<strong>此外，模式(dd-MM-yyyy HH:mm:ss Z)指定了输入字符串中日期和时间组成部分的预期结构，包括UTC/GMT的偏移量。</strong></p><p>一旦创建了_formatter_，我们就使用它以及_OffsetDateTime.parse()_方法来解析_customDateTimeString_并生成一个_OffsetDateTime_对象。</p><h3 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h3><p>总之，将字符串转换为_OffsetDateTime_对象对于处理Java应用程序中的日期和时间至关重要。</p><p>无论是解析用户输入或外部数据源中的日期时间字符串，将它们转换为_OffsetDateTime_对象都允许无缝地操作和处理日期和时间数据。</p><p>如常，本文的完整代码示例可以在GitHub上找到。</p><p>评论在文章发布后30天内开放。对于此日期之后的任何问题，请使用网站上的联系表单。</p>`,21),o=[p];function i(c,l){return s(),n("div",null,o)}const m=a(t,[["render",i],["__file","Java中将字符串转换为OffsetDateTime.html.vue"]]),f=JSON.parse('{"path":"/posts/baeldung/Archive/Java%E4%B8%AD%E5%B0%86%E5%AD%97%E7%AC%A6%E4%B8%B2%E8%BD%AC%E6%8D%A2%E4%B8%BAOffsetDateTime.html","title":"Java中将字符串转换为OffsetDateTime","lang":"zh-CN","frontmatter":{"date":"2024-06-19T00:00:00.000Z","category":["Java","Date and Time"],"tag":["OffsetDateTime","String Conversion"],"head":[["meta",{"name":"keywords","content":"Java, OffsetDateTime, String Conversion, Date and Time"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/Java%E4%B8%AD%E5%B0%86%E5%AD%97%E7%AC%A6%E4%B8%B2%E8%BD%AC%E6%8D%A2%E4%B8%BAOffsetDateTime.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中将字符串转换为OffsetDateTime"}],["meta",{"property":"og:description","content":"Java中将字符串转换为OffsetDateTime 在软件开发中，处理日期和时间值是一项常见任务，尤其是在构建涉及调度、日志记录或任何时间敏感操作的应用程序时。在相同的背景下，Java中的_OffsetDateTime_类提供了一种强大的解决方案，用于表示带有UTC/GMT偏移量的日期和时间信息。 在本教程中，我们将探讨如何高效地将表示日期和时间信息..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"OffsetDateTime"}],["meta",{"property":"article:tag","content":"String Conversion"}],["meta",{"property":"article:published_time","content":"2024-06-19T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中将字符串转换为OffsetDateTime\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-19T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中将字符串转换为OffsetDateTime 在软件开发中，处理日期和时间值是一项常见任务，尤其是在构建涉及调度、日志记录或任何时间敏感操作的应用程序时。在相同的背景下，Java中的_OffsetDateTime_类提供了一种强大的解决方案，用于表示带有UTC/GMT偏移量的日期和时间信息。 在本教程中，我们将探讨如何高效地将表示日期和时间信息..."},"headers":[{"level":3,"title":"2. 使用_OffsetDateTime.parse()_方法","slug":"_2-使用-offsetdatetime-parse-方法","link":"#_2-使用-offsetdatetime-parse-方法","children":[]},{"level":3,"title":"3. 使用_DateTimeFormatter_与_OffsetDateTime.parse()_","slug":"_3-使用-datetimeformatter-与-offsetdatetime-parse","link":"#_3-使用-datetimeformatter-与-offsetdatetime-parse","children":[]},{"level":3,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":2.5,"words":749},"filePathRelative":"posts/baeldung/Archive/Java中将字符串转换为OffsetDateTime.md","localizedDate":"2024年6月19日","excerpt":"<hr>\\n<h1>Java中将字符串转换为OffsetDateTime</h1>\\n<p>在软件开发中，处理日期和时间值是一项常见任务，尤其是在构建涉及调度、日志记录或任何时间敏感操作的应用程序时。在相同的背景下，Java中的_OffsetDateTime_类提供了一种强大的解决方案，用于表示带有UTC/GMT偏移量的日期和时间信息。</p>\\n<p><strong>在本教程中，我们将探讨如何高效地将表示日期和时间信息的字符串转换为Java中的_OffsetDateTime_对象。</strong></p>\\n<h3>2. 使用_OffsetDateTime.parse()_方法</h3>\\n<p>将字符串转换为_OffsetDateTime_对象的最简单方法之一是使用_OffsetDateTime.parse(CharSequence text)_方法。此方法根据ISO-8601格式解析输入字符串，并返回表示解析日期和时间的_OffsetDateTime_对象：</p>","autoDesc":true}');export{m as comp,f as data};
