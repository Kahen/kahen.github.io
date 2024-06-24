import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as e}from"./app-DtXEV2Vi.js";const t={},o=e(`<h1 id="java中将temporalaccessor转换为localdate" tabindex="-1"><a class="header-anchor" href="#java中将temporalaccessor转换为localdate"><span>Java中将TemporalAccessor转换为LocalDate</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>处理日期和时间值是一项常见任务。有时，我们可能需要将TemporalAccessor对象转换为LocalDate对象以执行特定日期的操作。这在解析日期时间字符串或从日期时间对象中提取日期组件时可能非常有用。</p><p><strong>在本教程中，我们将探索在Java中实现这种转换的不同方法。</strong></p><h2 id="_2-使用localdate-from-方法" tabindex="-1"><a class="header-anchor" href="#_2-使用localdate-from-方法"><span>2. 使用LocalDate.from()方法</span></a></h2><p>将TemporalAccessor转换为LocalDate的一种直接方法是使用LocalDate.from(TemporalAccessor temporal)方法。实际上，此方法从TemporalAccessor中提取日期组件（年、月和日）并构建一个LocalDate对象。让我们看一个例子：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> dateString <span class="token operator">=</span> <span class="token string">&quot;2022-03-28&quot;</span><span class="token punctuation">;</span>
<span class="token class-name">TemporalAccessor</span> temporalAccessor <span class="token operator">=</span> <span class="token class-name">DateTimeFormatter</span><span class="token punctuation">.</span><span class="token constant">ISO_LOCAL_DATE</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>dateString<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenTemporalAccessor_whenUsingLocalDateFrom_thenConvertToLocalDate</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">LocalDate</span> convertedDate <span class="token operator">=</span> <span class="token class-name">LocalDate</span><span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span>temporalAccessor<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token class-name">LocalDate</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token number">2022</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">28</span><span class="token punctuation">)</span><span class="token punctuation">,</span> convertedDate<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这段代码片段中，我们初始化一个String变量dateString，值为&quot;2022-03-28&quot;，表示一个ISO 8601格式的日期。此外，我们使用DateTimeFormatter.ISO_LOCAL_DATE.parse()方法将此字符串解析为TemporalAccessor对象temporalAccessor。</p><p><strong>然后，我们使用LocalDate.from(temporalAccessor)方法将temporalAccessor转换为LocalDate对象convertedDate，有效地提取并构建日期组件。</strong></p><p>最后，通过断言assertEquals(LocalDate.of(2022, 3, 28), convertedDate)，我们确保转换结果使convertedDate与预期的日期匹配。</p><h2 id="_3-使用temporalqueries" tabindex="-1"><a class="header-anchor" href="#_3-使用temporalqueries"><span>3. 使用TemporalQueries</span></a></h2><p>将TemporalAccessor转换为LocalDate的另一种方法是使用TemporalQueries。我们可以定义一个自定义的TemporalQuery来提取必要的日期组件并构建一个LocalDate对象。以下是一个例子：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenTemporalAccessor_whenUsingTemporalQueries_thenConvertToLocalDate</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> year <span class="token operator">=</span> temporalAccessor<span class="token punctuation">.</span><span class="token function">query</span><span class="token punctuation">(</span><span class="token class-name">TemporalQueries</span><span class="token punctuation">.</span><span class="token function">localDate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getYear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> month <span class="token operator">=</span> temporalAccessor<span class="token punctuation">.</span><span class="token function">query</span><span class="token punctuation">(</span><span class="token class-name">TemporalQueries</span><span class="token punctuation">.</span><span class="token function">localDate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getMonthValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> day <span class="token operator">=</span> temporalAccessor<span class="token punctuation">.</span><span class="token function">query</span><span class="token punctuation">(</span><span class="token class-name">TemporalQueries</span><span class="token punctuation">.</span><span class="token function">localDate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getDayOfMonth</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">LocalDate</span> convertedDate <span class="token operator">=</span> <span class="token class-name">LocalDate</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span>year<span class="token punctuation">,</span> month<span class="token punctuation">,</span> day<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token class-name">LocalDate</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token number">2022</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">28</span><span class="token punctuation">)</span><span class="token punctuation">,</span> convertedDate<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个测试方法中，我们调用temporalAccessor.query(TemporalQueries.localDate())方法以获得从temporalAccessor中提取的日期的LocalDate实例。</p><p>然后，我们分别使用getYear()、getMonthValue()和getDayOfMonth()方法从这个LocalDate实例中检索年、月和日组件。随后，我们使用这些提取的组件和LocalDate.of()方法构建一个LocalDate对象convertedDate。</p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>总之，在Java中将TemporalAccessor转换为LocalDate可以使用LocalDate.from()或TemporalQueries。除此之外，这些方法提供了灵活高效的方式来执行转换，使得日期时间功能在Java应用程序中的集成变得无缝。</p><p>像往常一样，随附的源代码可以在GitHub上找到。</p><p>文章发布后30天内开放评论。对于超过此日期的任何问题，请使用网站上的联系表单。</p>`,20),p=[o];function c(l,r){return s(),n("div",null,p)}const m=a(t,[["render",c],["__file","2024-06-19-Convert TemporalAccessor to LocalDate.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/Archive/2024-06-19-Convert%20TemporalAccessor%20to%20LocalDate.html","title":"Java中将TemporalAccessor转换为LocalDate","lang":"zh-CN","frontmatter":{"date":"2024-06-20T00:00:00.000Z","category":["Java","Date and Time"],"tag":["TemporalAccessor","LocalDate"],"head":[["meta",{"name":"keywords","content":"Java, TemporalAccessor, LocalDate, Conversion, DateTimeFormatter, TemporalQueries"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/2024-06-19-Convert%20TemporalAccessor%20to%20LocalDate.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中将TemporalAccessor转换为LocalDate"}],["meta",{"property":"og:description","content":"Java中将TemporalAccessor转换为LocalDate 1. 引言 处理日期和时间值是一项常见任务。有时，我们可能需要将TemporalAccessor对象转换为LocalDate对象以执行特定日期的操作。这在解析日期时间字符串或从日期时间对象中提取日期组件时可能非常有用。 在本教程中，我们将探索在Java中实现这种转换的不同方法。 2...."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"TemporalAccessor"}],["meta",{"property":"article:tag","content":"LocalDate"}],["meta",{"property":"article:published_time","content":"2024-06-20T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中将TemporalAccessor转换为LocalDate\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-20T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中将TemporalAccessor转换为LocalDate 1. 引言 处理日期和时间值是一项常见任务。有时，我们可能需要将TemporalAccessor对象转换为LocalDate对象以执行特定日期的操作。这在解析日期时间字符串或从日期时间对象中提取日期组件时可能非常有用。 在本教程中，我们将探索在Java中实现这种转换的不同方法。 2...."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 使用LocalDate.from()方法","slug":"_2-使用localdate-from-方法","link":"#_2-使用localdate-from-方法","children":[]},{"level":2,"title":"3. 使用TemporalQueries","slug":"_3-使用temporalqueries","link":"#_3-使用temporalqueries","children":[]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":2.11,"words":632},"filePathRelative":"posts/baeldung/Archive/2024-06-19-Convert TemporalAccessor to LocalDate.md","localizedDate":"2024年6月20日","excerpt":"\\n<h2>1. 引言</h2>\\n<p>处理日期和时间值是一项常见任务。有时，我们可能需要将TemporalAccessor对象转换为LocalDate对象以执行特定日期的操作。这在解析日期时间字符串或从日期时间对象中提取日期组件时可能非常有用。</p>\\n<p><strong>在本教程中，我们将探索在Java中实现这种转换的不同方法。</strong></p>\\n<h2>2. 使用LocalDate.from()方法</h2>\\n<p>将TemporalAccessor转换为LocalDate的一种直接方法是使用LocalDate.from(TemporalAccessor temporal)方法。实际上，此方法从TemporalAccessor中提取日期组件（年、月和日）并构建一个LocalDate对象。让我们看一个例子：</p>","autoDesc":true}');export{m as comp,d as data};
