import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as e}from"./app-BX3-P94R.js";const t={},o=e(`<h1 id="java-localdate与epoch互转教程" tabindex="-1"><a class="header-anchor" href="#java-localdate与epoch互转教程"><span>Java LocalDate与Epoch互转教程</span></a></h1><p>在本教程中，我们将展示如何将Java的_LocalDate_转换为_Epoch_以及如何反向转换。进行转换时，理解_Epoch_和_LocalDate_背后的概念非常重要。Java中的‘<em>Epoch</em>’指的是1970-01-01T00:00:00Z这一时间点。Epoch之后的时间点将具有正值，而Epoch之前的时间点则具有负值。</p><p>所有_Epoch_、<em>LocalDate_和_LocalDateTime_的实例都与时区有关，因此在它们之间进行转换时，我们需要知道时区。在Java中，时区可以通过_ZoneId_类来表示。<em>ZoneId_可以是系统默认时区，通过方法_ZoneId.systemDefault()<em>获得。或者，也可以通过传递已知时区的_String</em>，如_Europe/Amsterdam</em>，来计算_ZoneId</em>。</p><h2 id="_3-epoch转换为日期-时间" tabindex="-1"><a class="header-anchor" href="#_3-epoch转换为日期-时间"><span>3. Epoch转换为日期/时间</span></a></h2><p>我们可以根据自Epoch以来的毫秒数计算出_LocalDate_或_LocalDateTime_。另外，计数可以以秒为单位，或者以秒和纳秒调整。Java中用于这种计数的数据类型是_Long_。最后，我们还需要知道时区。让我们看看如何进行转换：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">long</span> milliSecondsSinceEpoch <span class="token operator">=</span> <span class="token number">2131242L</span><span class="token punctuation">;</span>
<span class="token class-name">ZoneId</span> zoneId <span class="token operator">=</span> <span class="token class-name">ZoneId</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;Europe/Amsterdam&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">LocalDate</span> date <span class="token operator">=</span> <span class="token class-name">Instant</span><span class="token punctuation">.</span><span class="token function">ofEpochMilli</span><span class="token punctuation">(</span>milliSecondsSinceEpoch<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">atZone</span><span class="token punctuation">(</span>zoneId<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toLocalDate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上述代码片段中，我们有自Epoch以来的毫秒数，时区为阿姆斯特丹，因此我们可以使用类_Instant_的_ofEpochMilli()_方法来获取_LocalDate_值。否则，如果我们想要时间而不是日期，那么我们将编写：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">LocalDateTime</span> time <span class="token operator">=</span> <span class="token class-name">Instant</span><span class="token punctuation">.</span><span class="token function">ofEpochMilli</span><span class="token punctuation">(</span>milliSecondsSinceEpoch<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">atZone</span><span class="token punctuation">(</span>zoneId<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toLocalDateTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在上述代码片段中，我们使用了相同的方法，但是使用了_toLocalDateTime_方法。</p><h2 id="_4-日期-时间转换为epoch" tabindex="-1"><a class="header-anchor" href="#_4-日期-时间转换为epoch"><span>4. 日期/时间转换为Epoch</span></a></h2><p>如果我们有一个在给定时区中的_LocalDate_日期，那么我们可以得到秒数的_Epoch_。让我们看看怎么做：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">ZoneId</span> zoneId <span class="token operator">=</span> <span class="token class-name">ZoneId</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;Europe/Tallinn&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">LocalDate</span> date <span class="token operator">=</span> <span class="token class-name">LocalDate</span><span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">long</span> <span class="token class-name">EpochMilliSecondsAtDate</span> <span class="token operator">=</span> date<span class="token punctuation">.</span><span class="token function">atStartOfDay</span><span class="token punctuation">(</span>zoneId<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toInstant</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toEpochMilli</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上述示例中，我们得到了今天日期的_Epoch_秒数和系统当前所在的时区。<strong>请注意，我们只能得到一天开始的_Epoch_计数</strong>。这是因为_LocalDate_没有时间值信息。或者，如果我们确实有时间组件，我们可以在给定的瞬间得到确切的_Epoch_计数：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">LocalDateTime</span> localDateTime <span class="token operator">=</span> <span class="token class-name">LocalDateTime</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span><span class="token string">&quot;2019-11-15T13:15:30&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">long</span> epochMilliSecondsAtTime <span class="token operator">=</span> localDateTime<span class="token punctuation">.</span><span class="token function">atZone</span><span class="token punctuation">(</span>zoneId<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toInstant</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toEpochMilli</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们探讨了如何从_Epoch_转换到_LocalDate_和_LocalDateTime_。我们还展示了如何将_LocalDate_或_LocalDateTime_转换为_Epoch_。</p><p>如常，我们可以在GitHub上找到完整的代码。</p>`,17),p=[o];function c(l,i){return s(),n("div",null,p)}const d=a(t,[["render",c],["__file","2024-07-01-Convert Between Java LocalDate and Epoch.html.vue"]]),_=JSON.parse('{"path":"/posts/baeldung/2024-07-01/2024-07-01-Convert%20Between%20Java%20LocalDate%20and%20Epoch.html","title":"Java LocalDate与Epoch互转教程","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Date and Time"],"tag":["LocalDate","Epoch"],"head":[["meta",{"name":"keywords","content":"Java, LocalDate, Epoch, Conversion, Timezone, ZoneId"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-01/2024-07-01-Convert%20Between%20Java%20LocalDate%20and%20Epoch.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java LocalDate与Epoch互转教程"}],["meta",{"property":"og:description","content":"Java LocalDate与Epoch互转教程 在本教程中，我们将展示如何将Java的_LocalDate_转换为_Epoch_以及如何反向转换。进行转换时，理解_Epoch_和_LocalDate_背后的概念非常重要。Java中的‘Epoch’指的是1970-01-01T00:00:00Z这一时间点。Epoch之后的时间点将具有正值，而Epoch之..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-01T03:53:11.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"LocalDate"}],["meta",{"property":"article:tag","content":"Epoch"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-01T03:53:11.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java LocalDate与Epoch互转教程\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-01T03:53:11.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java LocalDate与Epoch互转教程 在本教程中，我们将展示如何将Java的_LocalDate_转换为_Epoch_以及如何反向转换。进行转换时，理解_Epoch_和_LocalDate_背后的概念非常重要。Java中的‘Epoch’指的是1970-01-01T00:00:00Z这一时间点。Epoch之后的时间点将具有正值，而Epoch之..."},"headers":[{"level":2,"title":"3. Epoch转换为日期/时间","slug":"_3-epoch转换为日期-时间","link":"#_3-epoch转换为日期-时间","children":[]},{"level":2,"title":"4. 日期/时间转换为Epoch","slug":"_4-日期-时间转换为epoch","link":"#_4-日期-时间转换为epoch","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1719805991000,"updatedTime":1719805991000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.11,"words":632},"filePathRelative":"posts/baeldung/2024-07-01/2024-07-01-Convert Between Java LocalDate and Epoch.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在本教程中，我们将展示如何将Java的_LocalDate_转换为_Epoch_以及如何反向转换。进行转换时，理解_Epoch_和_LocalDate_背后的概念非常重要。Java中的‘<em>Epoch</em>’指的是1970-01-01T00:00:00Z这一时间点。Epoch之后的时间点将具有正值，而Epoch之前的时间点则具有负值。</p>\\n<p>所有_Epoch_、<em>LocalDate_和_LocalDateTime_的实例都与时区有关，因此在它们之间进行转换时，我们需要知道时区。在Java中，时区可以通过_ZoneId_类来表示。<em>ZoneId_可以是系统默认时区，通过方法_ZoneId.systemDefault()<em>获得。或者，也可以通过传递已知时区的_String</em>，如_Europe/Amsterdam</em>，来计算_ZoneId</em>。</p>","autoDesc":true}');export{d as comp,_ as data};
