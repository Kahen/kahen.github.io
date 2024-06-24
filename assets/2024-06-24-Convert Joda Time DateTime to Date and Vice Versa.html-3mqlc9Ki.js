import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as e,a as t}from"./app-Bxrsut6s.js";const s={},p=t(`<h1 id="joda-time-datetime-与-java-date-互转" tabindex="-1"><a class="header-anchor" href="#joda-time-datetime-与-java-date-互转"><span>Joda-Time DateTime 与 Java Date 互转</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>Joda-Time 是一个非常流行的 Java 日期和时间操作库。它提供了比标准 <em>DateTime</em> 类通常提供的更直观、更灵活的 API。</p><h3 id="在本教程中-我们将探讨如何将-joda-time-datetime-对象转换为标准的-java-date-对象-反之亦然。" tabindex="-1"><a class="header-anchor" href="#在本教程中-我们将探讨如何将-joda-time-datetime-对象转换为标准的-java-date-对象-反之亦然。"><span>在本教程中，我们将探讨如何将 Joda-Time <em>DateTime</em> 对象转换为标准的 Java <em>Date</em> 对象，反之亦然。</span></a></h3><h2 id="_2-设置-joda-time" tabindex="-1"><a class="header-anchor" href="#_2-设置-joda-time"><span>2. 设置 Joda-Time</span></a></h2><p>首先，我们应该确保我们的项目包含了 <em>joda-time</em> 库：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`joda-time\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`joda-time\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\`2.12.6\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\`
\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>或者，我们可以下载 jar 文件并将其放入我们的 <em>classpath</em>。</p><p>要将 Joda-Time <em>DateTime</em> 对象转换为标准 Java <em>Date</em>，我们使用名为 <em>toDate()</em> 的方法。以下是一个简单的例子：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenJodaDateTime_whenConvertingToJavaDate_thenConversionIsCorrect</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">DateTime</span> jodaDateTime <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DateTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span>Date</span> javaDate <span class="token operator">=</span> jodaDateTime<span class="token punctuation">.</span><span class="token function">toDate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span>jodaDateTime<span class="token punctuation">.</span><span class="token function">getMillis</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> javaDate<span class="token punctuation">.</span><span class="token function">getTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个测试方法中，我们创建了一个名为 <em>jodaDateTime</em> 的 Joda-Time <em>DateTime</em> 的新实例。随后，我们调用了这个 <em>Joda</em> <em>DateTime</em> 实例上的 <em>toDate()</em> 方法以获得相应的 <em>java.util.Date</em> 对象。</p><p>测试使用 <em>assertEquals</em> 方法执行，该方法断言从原始 Joda <em>DateTime</em> 对象中检索的毫秒时间等于通过 <em>java.util.Date</em> 创建的新 <em>DateTime</em> 对象中的时间。</p><h2 id="_4-将-java-date-转换为-joda-time-datetime" tabindex="-1"><a class="header-anchor" href="#_4-将-java-date-转换为-joda-time-datetime"><span>4. 将 Java <em>Date</em> 转换为 Joda-Time <em>DateTime</em></span></a></h2><p>将一个普通的 Java <em>Date</em> 对象转换为 Joda-Time <em>DateTime</em> 也很简单。我们可以使用为 <em>java.util.Date</em> 参数设计的 <em>DateTime</em> 构造函数如下：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenJavaDate_whenConvertingToJodaDateTime_thenConversionIsCorrect</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span>Date</span> javaDate <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span>Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">DateTime</span> jodaDateTime <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DateTime</span><span class="token punctuation">(</span>javaDate<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span>javaDate<span class="token punctuation">.</span><span class="token function">getTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> jodaDateTime<span class="token punctuation">.</span><span class="token function">getMillis</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上述测试方法中，我们积极地实例化了一个新的 <em>java.util.Date</em> 对象，代表当前的日期和时间。随后，我们使用提供的 Java <em>Date</em> 创建了相应的 Joda <em>DateTime</em> 对象。实际的验证发生在使用 <em>assertEquals</em> 方法时，我们验证从原始 <em>java.util.Date</em> 对象中检索的毫秒时间等于由 <em>Joda DateTime</em> 对象表示的时间。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>总之，在使用 Java 处理日期和时间时的一个常见操作是将 Joda-Time <em>DateTime</em> 对象和标准 Java <em>Date</em> 之间进行转换。</p><p>现在我们已经经历了上述示例，我们应该能够很容易地在我们的项目中实现 Joda-Time 并轻松地转换这两种类型。</p><p>如常，相关的源代码可以在 GitHub 上找到。</p>`,20),o=[p];function i(c,l){return e(),n("div",null,o)}const d=a(s,[["render",i],["__file","2024-06-24-Convert Joda Time DateTime to Date and Vice Versa.html.vue"]]),r=JSON.parse('{"path":"/posts/baeldung/2024-06-24/2024-06-24-Convert%20Joda%20Time%20DateTime%20to%20Date%20and%20Vice%20Versa.html","title":"Joda-Time DateTime 与 Java Date 互转","lang":"zh-CN","frontmatter":{"date":"2024-06-24T00:00:00.000Z","category":["Java","Joda-Time"],"tag":["Joda-Time","DateTime","Date"],"head":[["meta",{"name":"keywords","content":"Joda-Time, DateTime, Date, Java日期时间转换"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-24/2024-06-24-Convert%20Joda%20Time%20DateTime%20to%20Date%20and%20Vice%20Versa.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Joda-Time DateTime 与 Java Date 互转"}],["meta",{"property":"og:description","content":"Joda-Time DateTime 与 Java Date 互转 1. 引言 Joda-Time 是一个非常流行的 Java 日期和时间操作库。它提供了比标准 DateTime 类通常提供的更直观、更灵活的 API。 在本教程中，我们将探讨如何将 Joda-Time DateTime 对象转换为标准的 Java Date 对象，反之亦然。 2. 设置..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-24T13:00:38.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Joda-Time"}],["meta",{"property":"article:tag","content":"DateTime"}],["meta",{"property":"article:tag","content":"Date"}],["meta",{"property":"article:published_time","content":"2024-06-24T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-24T13:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Joda-Time DateTime 与 Java Date 互转\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-24T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-24T13:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Joda-Time DateTime 与 Java Date 互转 1. 引言 Joda-Time 是一个非常流行的 Java 日期和时间操作库。它提供了比标准 DateTime 类通常提供的更直观、更灵活的 API。 在本教程中，我们将探讨如何将 Joda-Time DateTime 对象转换为标准的 Java Date 对象，反之亦然。 2. 设置..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[{"level":3,"title":"在本教程中，我们将探讨如何将 Joda-Time DateTime 对象转换为标准的 Java Date 对象，反之亦然。","slug":"在本教程中-我们将探讨如何将-joda-time-datetime-对象转换为标准的-java-date-对象-反之亦然。","link":"#在本教程中-我们将探讨如何将-joda-time-datetime-对象转换为标准的-java-date-对象-反之亦然。","children":[]}]},{"level":2,"title":"2. 设置 Joda-Time","slug":"_2-设置-joda-time","link":"#_2-设置-joda-time","children":[]},{"level":2,"title":"4. 将 Java Date 转换为 Joda-Time DateTime","slug":"_4-将-java-date-转换为-joda-time-datetime","link":"#_4-将-java-date-转换为-joda-time-datetime","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1719234038000,"updatedTime":1719234038000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":1.96,"words":588},"filePathRelative":"posts/baeldung/2024-06-24/2024-06-24-Convert Joda Time DateTime to Date and Vice Versa.md","localizedDate":"2024年6月24日","excerpt":"\\n<h2>1. 引言</h2>\\n<p>Joda-Time 是一个非常流行的 Java 日期和时间操作库。它提供了比标准 <em>DateTime</em> 类通常提供的更直观、更灵活的 API。</p>\\n<h3>在本教程中，我们将探讨如何将 Joda-Time <em>DateTime</em> 对象转换为标准的 Java <em>Date</em> 对象，反之亦然。</h3>\\n<h2>2. 设置 Joda-Time</h2>\\n<p>首先，我们应该确保我们的项目包含了 <em>joda-time</em> 库：</p>\\n<div class=\\"language-xml\\" data-ext=\\"xml\\" data-title=\\"xml\\"><pre class=\\"language-xml\\"><code>`<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>dependency</span><span class=\\"token punctuation\\">&gt;</span></span>`\\n    `<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>groupId</span><span class=\\"token punctuation\\">&gt;</span></span>`joda-time`<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>groupId</span><span class=\\"token punctuation\\">&gt;</span></span>`\\n    `<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>artifactId</span><span class=\\"token punctuation\\">&gt;</span></span>`joda-time`<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>artifactId</span><span class=\\"token punctuation\\">&gt;</span></span>`\\n    `<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>version</span><span class=\\"token punctuation\\">&gt;</span></span>`2.12.6`<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>version</span><span class=\\"token punctuation\\">&gt;</span></span>`\\n`<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>dependency</span><span class=\\"token punctuation\\">&gt;</span></span>`\\n</code></pre></div>","autoDesc":true}');export{d as comp,r as data};
