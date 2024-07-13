import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as e}from"./app-DkA39C0B.js";const t={},o=e(`<h1 id="java-system-currenttimemillis-与-system-nanotime-比较-baeldung" tabindex="-1"><a class="header-anchor" href="#java-system-currenttimemillis-与-system-nanotime-比较-baeldung"><span>Java System.currentTimeMillis() 与 System.nanoTime() 比较 | Baeldung</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>Java 中用于时间测量的两个常用方法是 <code>System.currentTimeMillis()</code> 和 <code>System.nanoTime()</code>。尽管这两种方法都提供了测量时间的方式，它们服务于不同的目的，并且具有不同的特点。</p><p><strong>在本教程中，我们将探索这两种方法之间的区别，并了解何时使用每种方法。</strong></p><h2 id="_2-system-currenttimemillis-方法" tabindex="-1"><a class="header-anchor" href="#_2-system-currenttimemillis-方法"><span>2. <code>System.currentTimeMillis()</code> 方法</span></a></h2><p><code>currentTimeMillis()</code> 方法返回自1970年1月1日00:00:00 UTC起的当前时间（以毫秒为单位）。此外，它基于系统时钟，适用于测量绝对时间，例如当前日期和时间。</p><p><strong>如果我们需要绝对时间信息，例如用于记录日志或显示时间戳，<code>currentTimeMillis()</code> 是合适的。然而，由于时钟可能发生的变化（如夏令时），这种方法可能导致难以消除的错误。</strong></p><p>让我们看一个简单的代码示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenTaskInProgress_whenMeasuringTimeDuration_thenDurationShouldBeNonNegative</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">long</span> startTime <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">currentTimeMillis</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">performTask</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">long</span> endTime <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">currentTimeMillis</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">long</span> duration <span class="token operator">=</span> endTime <span class="token operator">-</span> startTime<span class="token punctuation">;</span>

    logger<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;任务持续时间：&quot;</span> <span class="token operator">+</span> duration <span class="token operator">+</span> <span class="token string">&quot; 毫秒&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertTrue</span><span class="token punctuation">(</span>duration <span class="token operator">&gt;=</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这段代码展示了如何使用 <code>currentTimeMillis()</code> 方法来测量任务的持续时间。测试方法在执行任务前捕获开始时间，在任务完成后捕获结束时间，然后计算并返回任务的持续时间（以毫秒为单位）。</p><p><strong>注意 <code>performTask()</code> 方法是实际要测量的任务的占位符。我们可以将其替换为我们想要测量的具体代码。</strong></p><h2 id="_3-system-nanotime-方法" tabindex="-1"><a class="header-anchor" href="#_3-system-nanotime-方法"><span>3. <code>System.nanoTime()</code> 方法</span></a></h2><p>与 <code>currentTimeMillis()</code> 不同，<code>nanoTime()</code> 方法返回最精确可用系统计时器的当前值，通常具有纳秒精度。<strong>这个方法设计用于以高精度测量经过的时间，通常用于性能分析和基准测试。</strong></p><p>让我们看一个例子：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenShortTaskInProgress_whenMeasuringShortDuration_thenDurationShouldBeNonNegative</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">long</span> startNanoTime <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">nanoTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">performShortTask</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">long</span> endNanoTime <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">nanoTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">long</span> duration <span class="token operator">=</span> endNanoTime <span class="token operator">-</span> startNanoTime<span class="token punctuation">;</span>

    logger<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;短任务持续时间：&quot;</span> <span class="token operator">+</span> duration <span class="token operator">+</span> <span class="token string">&quot; 纳秒&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertTrue</span><span class="token punctuation">(</span>duration <span class="token operator">&gt;=</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，测试方法使用 <code>nanoTime()</code> 来捕获一个短任务的开始和结束时间，以纳秒的高精度提供。</p><p><strong>需要注意的是，<code>nanoTime()</code> 的精度可能在不同平台上有所不同。虽然它通常比 <code>currentTimeMillis()</code> 更精确，但我们应该谨慎依赖极高的精度。</strong></p><h2 id="_4-差异和相似性" tabindex="-1"><a class="header-anchor" href="#_4-差异和相似性"><span>4. 差异和相似性</span></a></h2><p>为了提供 <code>System.currentTimeMillis()</code> 和 <code>System.nanoTime()</code> 之间区别的简洁概述，让我们深入比较它们的关键特性，突出它们的差异和相似之处：</p><table><thead><tr><th>特性</th><th><code>System.currentTimeMillis()</code></th><th><code>System.nanoTime()</code></th></tr></thead><tbody><tr><td><strong>精度</strong></td><td>毫秒精度</td><td>纳秒精度</td></tr><tr><td><strong>用例</strong></td><td>绝对时间（记录日志、时间戳）</td><td>经过时间、性能分析</td></tr><tr><td><strong>基础</strong></td><td>基于系统时钟</td><td>基于系统计时器</td></tr><tr><td><strong>平台依赖性</strong></td><td>较少平台依赖</td><td>精度可能在不同平台上有所不同</td></tr></tbody></table><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>总之，了解 <code>currentTimeMillis()</code> 和 <code>nanoTime()</code> 之间的区别对于在Java应用程序中做出明智的决策以测量时间至关重要。无论我们优先考虑绝对时间还是高精度，选择适合我们特定用例的正确方法将有助于在我们的Java程序中进行更准确和有效的时间测量。</p><p>如常，本文的完整代码示例可以在 GitHub 上找到。</p>`,23),i=[o];function p(c,l){return a(),s("div",null,i)}const d=n(t,[["render",p],["__file","2024-06-25-Java System.currentTimeMillis   Vs. System.nanoTime  .html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-06-25/2024-06-25-Java%20System.currentTimeMillis%20%20%20Vs.%20System.nanoTime%20%20.html","title":"Java System.currentTimeMillis() 与 System.nanoTime() 比较 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-06-25T00:00:00.000Z","category":["Java","性能"],"tag":["System.currentTimeMillis()","System.nanoTime()"],"head":[["meta",{"name":"keywords","content":"Java, 时间测量, currentTimeMillis, nanoTime"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-25/2024-06-25-Java%20System.currentTimeMillis%20%20%20Vs.%20System.nanoTime%20%20.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java System.currentTimeMillis() 与 System.nanoTime() 比较 | Baeldung"}],["meta",{"property":"og:description","content":"Java System.currentTimeMillis() 与 System.nanoTime() 比较 | Baeldung 1. 引言 Java 中用于时间测量的两个常用方法是 System.currentTimeMillis() 和 System.nanoTime()。尽管这两种方法都提供了测量时间的方式，它们服务于不同的目的，并且具有不同的..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-25T08:32:15.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"System.currentTimeMillis()"}],["meta",{"property":"article:tag","content":"System.nanoTime()"}],["meta",{"property":"article:published_time","content":"2024-06-25T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-25T08:32:15.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java System.currentTimeMillis() 与 System.nanoTime() 比较 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-25T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-25T08:32:15.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java System.currentTimeMillis() 与 System.nanoTime() 比较 | Baeldung 1. 引言 Java 中用于时间测量的两个常用方法是 System.currentTimeMillis() 和 System.nanoTime()。尽管这两种方法都提供了测量时间的方式，它们服务于不同的目的，并且具有不同的..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. System.currentTimeMillis() 方法","slug":"_2-system-currenttimemillis-方法","link":"#_2-system-currenttimemillis-方法","children":[]},{"level":2,"title":"3. System.nanoTime() 方法","slug":"_3-system-nanotime-方法","link":"#_3-system-nanotime-方法","children":[]},{"level":2,"title":"4. 差异和相似性","slug":"_4-差异和相似性","link":"#_4-差异和相似性","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1719304335000,"updatedTime":1719304335000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.74,"words":822},"filePathRelative":"posts/baeldung/2024-06-25/2024-06-25-Java System.currentTimeMillis   Vs. System.nanoTime  .md","localizedDate":"2024年6月25日","excerpt":"\\n<h2>1. 引言</h2>\\n<p>Java 中用于时间测量的两个常用方法是 <code>System.currentTimeMillis()</code> 和 <code>System.nanoTime()</code>。尽管这两种方法都提供了测量时间的方式，它们服务于不同的目的，并且具有不同的特点。</p>\\n<p><strong>在本教程中，我们将探索这两种方法之间的区别，并了解何时使用每种方法。</strong></p>\\n<h2>2. <code>System.currentTimeMillis()</code> 方法</h2>\\n<p><code>currentTimeMillis()</code> 方法返回自1970年1月1日00:00:00 UTC起的当前时间（以毫秒为单位）。此外，它基于系统时钟，适用于测量绝对时间，例如当前日期和时间。</p>","autoDesc":true}');export{d as comp,m as data};
