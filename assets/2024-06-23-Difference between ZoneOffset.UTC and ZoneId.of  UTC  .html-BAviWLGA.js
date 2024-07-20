import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as e,a}from"./app-DfO5Xg_k.js";const s={},o=a(`<h1 id="java中的zoneoffset-utc与zoneid-of-utc-的区别" tabindex="-1"><a class="header-anchor" href="#java中的zoneoffset-utc与zoneid-of-utc-的区别"><span>Java中的ZoneOffset.UTC与ZoneId.of(&quot;UTC&quot;)的区别</span></a></h1><p>时间日期信息在Java中必须准确处理，这涉及到时区的管理。ZoneOffset.UTC和ZoneId.of(&quot;UTC&quot;)是两种标准方法，我们可以用它们来表示协调世界时（UTC）。尽管两者看起来都像是UTC，但它们有一些不同。</p><p>在本教程中，我们将概述这两种方法、它们之间的主要差异以及使用场景。</p><h3 id="_2-zoneoffset-utc" tabindex="-1"><a class="header-anchor" href="#_2-zoneoffset-utc"><span>2. ZoneOffset.UTC</span></a></h3><p>自Java 8引入的java.time包提供了诸如ZoneId和ZoneOffset这样的类，我们可以用它们来表示时区。ZoneOffset.UTC是ZoneOffset类的一个常量成员。它表示UTC的固定偏移量，始终是+00:00。这意味着无论季节如何变化，UTC都是相同的。</p><p>以下是使用ZoneOffset.UTC的示例代码：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenOffsetDateTimeWithUTCZoneOffset_thenOffsetShouldBeUTC</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">OffsetDateTime</span> dateTimeWithOffset <span class="token operator">=</span> <span class="token class-name">OffsetDateTime</span><span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token class-name">ZoneOffset</span><span class="token punctuation">.</span><span class="token constant">UTC</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span>dateTimeWithOffset<span class="token punctuation">.</span><span class="token function">getOffset</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">ZoneOffset</span><span class="token punctuation">.</span><span class="token constant">UTC</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上述代码片段中，我们首先创建一个表示当前日期和时间的OffsetDateTime对象，并使用UTC偏移量。然后，我们使用ZoneOffset.UTC常量指定UTC区域偏移量（即UTC之前0小时）。最后，使用assertEquals()方法验证结果。</p><h3 id="_3-zoneid-of-utc" tabindex="-1"><a class="header-anchor" href="#_3-zoneid-of-utc"><span>3. ZoneId.of(&quot;UTC&quot;)</span></a></h3><p>另一方面，ZoneId.of(&quot;UTC&quot;)创建了一个表示UTC区域的ZoneId实例。与ZoneOffset.UTC不同，ZoneId.of()可以通过更改区域ID来表示其他时区。以下是示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenZonedDateTimeWithUTCZoneId_thenZoneShouldBeUTC</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">ZonedDateTime</span> zonedDateTime <span class="token operator">=</span> <span class="token class-name">ZonedDateTime</span><span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token class-name">ZoneId</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;UTC&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span>zonedDateTime<span class="token punctuation">.</span><span class="token function">getZone</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">ZoneId</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;UTC&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上述代码块中，我们创建了一个表示UTC区域当前日期和时间的ZonedDateTime对象。然后，我们使用ZoneId.of(&quot;UTC&quot;)来指定UTC区域。</p><h3 id="_4-差异和使用场景" tabindex="-1"><a class="header-anchor" href="#_4-差异和使用场景"><span>4. 差异和使用场景</span></a></h3><p>下表总结了ZoneOffset.UTC和ZoneId.of(&quot;UTC&quot;)之间的主要差异：</p><table><thead><tr><th>特性</th><th>ZoneOffset.UTC</th><th>ZoneId.of(&quot;UTC&quot;)</th></tr></thead><tbody><tr><td><strong>不变性</strong></td><td>常量且不可变</td><td>灵活且不可变</td></tr><tr><td><strong>用途</strong></td><td>固定的UTC偏移量</td><td>可以表示不同的时区</td></tr></tbody></table><p>下表提供了两种方法的使用场景：</p><table><thead><tr><th>使用场景</th><th>ZoneOffset.UTC</th><th>ZoneId.of(&quot;UTC&quot;)</th></tr></thead><tbody><tr><td><strong>固定偏移量</strong></td><td>适用于仅处理UTC的应用程序</td><td>N/A（使用ZoneOffset.UTC）</td></tr><tr><td><strong>不同时区的灵活性</strong></td><td>如果固定偏移量足够，使用ZoneOffset.UTC</td><td>适用于涉及多个时区的场景</td></tr><tr><td><strong>处理各种时区</strong></td><td>使用ZoneOffset.UTC进行固定的UTC偏移</td><td>提供处理不同时区的灵活性</td></tr></tbody></table><h3 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h3><p>总之，我们对ZoneOffset.UTC和ZoneId.of(&quot;UTC&quot;)方法有了一个很好的概述。此外，当在Java中处理时区时，区分这两种方法非常重要。</p><p>如常，相关的源代码可以在GitHub上找到。</p>`,20),p=[o];function c(i,d){return e(),t("div",null,p)}const f=n(s,[["render",c],["__file","2024-06-23-Difference between ZoneOffset.UTC and ZoneId.of  UTC  .html.vue"]]),r=JSON.parse('{"path":"/posts/baeldung/2024-06-23/2024-06-23-Difference%20between%20ZoneOffset.UTC%20and%20ZoneId.of%20%20UTC%20%20.html","title":"Java中的ZoneOffset.UTC与ZoneId.of(\\"UTC\\")的区别","lang":"zh-CN","frontmatter":{"date":"2024-06-23T00:00:00.000Z","category":["Java","编程"],"tag":["时间","时区"],"head":[["meta",{"name":"keywords","content":"Java, 时区, ZoneOffset, ZoneId, UTC"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-23/2024-06-23-Difference%20between%20ZoneOffset.UTC%20and%20ZoneId.of%20%20UTC%20%20.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中的ZoneOffset.UTC与ZoneId.of(\\"UTC\\")的区别"}],["meta",{"property":"og:description","content":"Java中的ZoneOffset.UTC与ZoneId.of(\\"UTC\\")的区别 时间日期信息在Java中必须准确处理，这涉及到时区的管理。ZoneOffset.UTC和ZoneId.of(\\"UTC\\")是两种标准方法，我们可以用它们来表示协调世界时（UTC）。尽管两者看起来都像是UTC，但它们有一些不同。 在本教程中，我们将概述这两种方法、它们之间的主..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-23T15:29:10.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"时间"}],["meta",{"property":"article:tag","content":"时区"}],["meta",{"property":"article:published_time","content":"2024-06-23T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-23T15:29:10.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中的ZoneOffset.UTC与ZoneId.of(\\\\\\"UTC\\\\\\")的区别\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-23T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-23T15:29:10.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中的ZoneOffset.UTC与ZoneId.of(\\"UTC\\")的区别 时间日期信息在Java中必须准确处理，这涉及到时区的管理。ZoneOffset.UTC和ZoneId.of(\\"UTC\\")是两种标准方法，我们可以用它们来表示协调世界时（UTC）。尽管两者看起来都像是UTC，但它们有一些不同。 在本教程中，我们将概述这两种方法、它们之间的主..."},"headers":[{"level":3,"title":"2. ZoneOffset.UTC","slug":"_2-zoneoffset-utc","link":"#_2-zoneoffset-utc","children":[]},{"level":3,"title":"3. ZoneId.of(\\"UTC\\")","slug":"_3-zoneid-of-utc","link":"#_3-zoneid-of-utc","children":[]},{"level":3,"title":"4. 差异和使用场景","slug":"_4-差异和使用场景","link":"#_4-差异和使用场景","children":[]},{"level":3,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1719156550000,"updatedTime":1719156550000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.13,"words":638},"filePathRelative":"posts/baeldung/2024-06-23/2024-06-23-Difference between ZoneOffset.UTC and ZoneId.of  UTC  .md","localizedDate":"2024年6月23日","excerpt":"\\n<p>时间日期信息在Java中必须准确处理，这涉及到时区的管理。ZoneOffset.UTC和ZoneId.of(\\"UTC\\")是两种标准方法，我们可以用它们来表示协调世界时（UTC）。尽管两者看起来都像是UTC，但它们有一些不同。</p>\\n<p>在本教程中，我们将概述这两种方法、它们之间的主要差异以及使用场景。</p>\\n<h3>2. ZoneOffset.UTC</h3>\\n<p>自Java 8引入的java.time包提供了诸如ZoneId和ZoneOffset这样的类，我们可以用它们来表示时区。ZoneOffset.UTC是ZoneOffset类的一个常量成员。它表示UTC的固定偏移量，始终是+00:00。这意味着无论季节如何变化，UTC都是相同的。</p>","autoDesc":true}');export{f as comp,r as data};
