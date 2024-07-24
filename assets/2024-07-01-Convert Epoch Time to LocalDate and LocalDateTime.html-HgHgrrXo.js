import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as t}from"./app-B6f8H54y.js";const e={},o=t(`<h1 id="将纪元时间转换为localdate和localdatetime-baeldung" tabindex="-1"><a class="header-anchor" href="#将纪元时间转换为localdate和localdatetime-baeldung"><span>将纪元时间转换为LocalDate和LocalDateTime | Baeldung</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>纪元时间，也被称为Unix时间，是一种将日期和时间表示为单一数值的系统。它测量了自1970年1月1日00:00:00协调世界时（UTC）以来经过的毫秒数。纪元时间因其简单性和易于操作而在计算机系统和编程语言中广泛使用。</p><p>在本教程中，我们将探讨将毫秒为单位的纪元时间转换为LocalDate和LocalDateTime。</p><h2 id="_2-将纪元时间转换为localdate" tabindex="-1"><a class="header-anchor" href="#_2-将纪元时间转换为localdate"><span>2. 将纪元时间转换为LocalDate</span></a></h2><p>要将纪元时间转换为LocalDate，我们需要将毫秒为单位的纪元时间转换为Instant对象。</p><p>Instant表示UTC时区的时间线上的一个点：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">long</span> epochTimeMillis <span class="token operator">=</span> <span class="token number">1624962431000L</span><span class="token punctuation">;</span> <span class="token comment">// 示例的毫秒纪元时间</span>
<span class="token class-name">Instant</span> instant <span class="token operator">=</span> <span class="token class-name">Instant</span><span class="token punctuation">.</span><span class="token function">ofEpochMilli</span><span class="token punctuation">(</span>epochTimeMillis<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>一旦我们有了Instant对象，我们可以通过使用atZone()方法指定时区，并将日期部分提取出来，将其转换为LocalDate对象：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">ZoneId</span> zoneId <span class="token operator">=</span> <span class="token class-name">ZoneId</span><span class="token punctuation">.</span><span class="token function">systemDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 使用系统默认时区</span>
<span class="token class-name">LocalDate</span> localDate <span class="token operator">=</span> instant<span class="token punctuation">.</span><span class="token function">atZone</span><span class="token punctuation">(</span>zoneId<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toLocalDate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，我们可以以人类可读的格式输出转换后的LocalDate对象：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>localDate<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 输出：2021-06-29</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们可以使用DateTimeFormatter类使用特定的模式格式化日期：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">DateTimeFormatter</span> formatter <span class="token operator">=</span> <span class="token class-name">DateTimeFormatter</span><span class="token punctuation">.</span><span class="token function">ofPattern</span><span class="token punctuation">(</span><span class="token string">&quot;yyyy-MM-dd&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> formattedDate <span class="token operator">=</span> localDate<span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span>formatter<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>formattedDate<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 输出：2021-06-29</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以根据需要选择不同的模式。</p><p>以下是脚本的表示：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">long</span> epochTimeMillis <span class="token operator">=</span> <span class="token number">1624962431000L</span><span class="token punctuation">;</span> <span class="token comment">// 示例的毫秒纪元时间</span>
<span class="token class-name">Instant</span> instant <span class="token operator">=</span> <span class="token class-name">Instant</span><span class="token punctuation">.</span><span class="token function">ofEpochMilli</span><span class="token punctuation">(</span>epochTimeMillis<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">ZoneId</span> zoneId <span class="token operator">=</span> <span class="token class-name">ZoneId</span><span class="token punctuation">.</span><span class="token function">systemDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 使用系统默认时区</span>
<span class="token class-name">LocalDate</span> localDate <span class="token operator">=</span> instant<span class="token punctuation">.</span><span class="token function">atZone</span><span class="token punctuation">(</span>zoneId<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toLocalDate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">DateTimeFormatter</span> formatter <span class="token operator">=</span> <span class="token class-name">DateTimeFormatter</span><span class="token punctuation">.</span><span class="token function">ofPattern</span><span class="token punctuation">(</span><span class="token string">&quot;yyyy-MM-dd&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> formattedDate <span class="token operator">=</span> localDate<span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span>formatter<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>formattedDate<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 输出：2021-06-29</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过这四个步骤，我们可以轻松地将毫秒为单位的纪元时间转换为LocalDate，甚至可以为输出指定格式。</p><h2 id="_3-将纪元时间转换为localdatetime" tabindex="-1"><a class="header-anchor" href="#_3-将纪元时间转换为localdatetime"><span>3. 将纪元时间转换为LocalDateTime</span></a></h2><p>将毫秒为单位的纪元时间转换为LocalDateTime的步骤与上面LocalDate的示例类似。唯一的区别是我们将导入LocalDateTime类。</p><p>将所有内容整合在一起，以下是转换为LocalDateTime的脚本：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">long</span> epochTimeMillis <span class="token operator">=</span> <span class="token number">1624962431000L</span><span class="token punctuation">;</span> <span class="token comment">// 示例的毫秒纪元时间</span>
<span class="token class-name">Instant</span> instant <span class="token operator">=</span> <span class="token class-name">Instant</span><span class="token punctuation">.</span><span class="token function">ofEpochMilli</span><span class="token punctuation">(</span>epochTimeMillis<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">ZoneId</span> zoneId <span class="token operator">=</span> <span class="token class-name">ZoneId</span><span class="token punctuation">.</span><span class="token function">systemDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 使用系统默认时区</span>
<span class="token class-name">LocalDateTime</span> localDateTime <span class="token operator">=</span> instant<span class="token punctuation">.</span><span class="token function">atZone</span><span class="token punctuation">(</span>zoneId<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toLocalDateTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">DateTimeFormatter</span> formatter <span class="token operator">=</span> <span class="token class-name">DateTimeFormatter</span><span class="token punctuation">.</span><span class="token function">ofPattern</span><span class="token punctuation">(</span><span class="token string">&quot;yyyy-MM-dd HH:mm:ss&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> formattedDateTime <span class="token operator">=</span> localDateTime<span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span>formatter<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>formattedDateTime<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 输出：2021-06-29 12:13:51</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>脚本将毫秒为单位的纪元时间转换为LocalDateTime，我们可以使用DateTimeFormatter类格式化日期和时间。</p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们探讨了将毫秒为单位的纪元时间转换为LocalDate和LocalDateTime。这是一个相当直接的过程，我们使用了DateTimeFormatter类将输出转换为特定的日期或时间格式。</p><p>本文的完整实现可在GitHub上找到。</p>`,26),p=[o];function c(l,i){return s(),n("div",null,p)}const m=a(e,[["render",c],["__file","2024-07-01-Convert Epoch Time to LocalDate and LocalDateTime.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-01/2024-07-01-Convert%20Epoch%20Time%20to%20LocalDate%20and%20LocalDateTime.html","title":"将纪元时间转换为LocalDate和LocalDateTime | Baeldung","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java"],"tag":["Epoch Time","LocalDate","LocalDateTime"],"head":[["meta",{"name":"keywords","content":"Java, Epoch Time, LocalDate, LocalDateTime, Conversion"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-01/2024-07-01-Convert%20Epoch%20Time%20to%20LocalDate%20and%20LocalDateTime.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"将纪元时间转换为LocalDate和LocalDateTime | Baeldung"}],["meta",{"property":"og:description","content":"将纪元时间转换为LocalDate和LocalDateTime | Baeldung 1. 引言 纪元时间，也被称为Unix时间，是一种将日期和时间表示为单一数值的系统。它测量了自1970年1月1日00:00:00协调世界时（UTC）以来经过的毫秒数。纪元时间因其简单性和易于操作而在计算机系统和编程语言中广泛使用。 在本教程中，我们将探讨将毫秒为单位的..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-01T15:53:54.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Epoch Time"}],["meta",{"property":"article:tag","content":"LocalDate"}],["meta",{"property":"article:tag","content":"LocalDateTime"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-01T15:53:54.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"将纪元时间转换为LocalDate和LocalDateTime | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-01T15:53:54.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"将纪元时间转换为LocalDate和LocalDateTime | Baeldung 1. 引言 纪元时间，也被称为Unix时间，是一种将日期和时间表示为单一数值的系统。它测量了自1970年1月1日00:00:00协调世界时（UTC）以来经过的毫秒数。纪元时间因其简单性和易于操作而在计算机系统和编程语言中广泛使用。 在本教程中，我们将探讨将毫秒为单位的..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 将纪元时间转换为LocalDate","slug":"_2-将纪元时间转换为localdate","link":"#_2-将纪元时间转换为localdate","children":[]},{"level":2,"title":"3. 将纪元时间转换为LocalDateTime","slug":"_3-将纪元时间转换为localdatetime","link":"#_3-将纪元时间转换为localdatetime","children":[]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1719849234000,"updatedTime":1719849234000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.37,"words":712},"filePathRelative":"posts/baeldung/2024-07-01/2024-07-01-Convert Epoch Time to LocalDate and LocalDateTime.md","localizedDate":"2022年4月1日","excerpt":"\\n<h2>1. 引言</h2>\\n<p>纪元时间，也被称为Unix时间，是一种将日期和时间表示为单一数值的系统。它测量了自1970年1月1日00:00:00协调世界时（UTC）以来经过的毫秒数。纪元时间因其简单性和易于操作而在计算机系统和编程语言中广泛使用。</p>\\n<p>在本教程中，我们将探讨将毫秒为单位的纪元时间转换为LocalDate和LocalDateTime。</p>\\n<h2>2. 将纪元时间转换为LocalDate</h2>\\n<p>要将纪元时间转换为LocalDate，我们需要将毫秒为单位的纪元时间转换为Instant对象。</p>\\n<p>Instant表示UTC时区的时间线上的一个点：</p>","autoDesc":true}');export{m as comp,d as data};
