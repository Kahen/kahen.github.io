import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as e}from"./app-DI0Ohe7a.js";const p={},t=e(`<hr><h1 id="java中xmx与maxram-jvm参数的区别" tabindex="-1"><a class="header-anchor" href="#java中xmx与maxram-jvm参数的区别"><span>Java中Xmx与MaxRAM JVM参数的区别</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>堆大小是Java应用程序的一个关键参数。它直接影响我们可以使用多少内存，并间接影响应用程序的性能。例如，使用压缩指针、垃圾回收周期的数量和持续时间等。</p><p>在本教程中，我们将学习如何使用<code>-XX:MaxRAM</code>标志来提供更多的堆大小计算调整机会。这在容器内运行应用程序或在不同主机上运行时尤其重要。</p><h2 id="_2-堆大小计算" tabindex="-1"><a class="header-anchor" href="#_2-堆大小计算"><span>2. 堆大小计算</span></a></h2><p>配置堆的标记可以一起工作，也可以相互覆盖。理解它们之间的关系对于更深入地了解它们的用途非常重要。</p><h3 id="_2-1-使用-xmx" tabindex="-1"><a class="header-anchor" href="#_2-1-使用-xmx"><span>2.1 使用<code>-Xmx</code></span></a></h3><p>控制堆大小的主要方式是<code>-Xmx</code>和<code>-Xms</code>标志，分别控制最大和初始大小。这是一个强大的工具，但不考虑机器或容器上的可用空间。假设我们在可用RAM从4GB到64GB的不同主机上运行应用程序。</p><p>没有<code>-Xmx</code>的情况下，JVM会自动为应用程序堆分配大约25%的可用RAM。然而，通常JVM分配的初始堆大小取决于各种参数：系统架构、JVM版本、平台等。</p><p>这种行为在某些情况下可能是不可取的。根据可用RAM，它可能会分配截然不同的堆。让我们检查一下在具有24GB RAM的机器上JVM默认分配了多少：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">java</span> <span class="token parameter variable">-XX:+PrintFlagsFinal</span> <span class="token parameter variable">-version</span> <span class="token operator">|</span><span class="token punctuation">\\</span>
<span class="token function">grep</span> <span class="token parameter variable">-e</span> <span class="token string">&#39;\\bMaxHeapSize\\|MinHeapSize\\|InitialHeapSize&#39;</span>
   size_t InitialHeapSize   <span class="token operator">=</span> <span class="token number">402653184</span>    <span class="token punctuation">{</span>product<span class="token punctuation">}</span> <span class="token punctuation">{</span>ergonomic<span class="token punctuation">}</span>
   size_t MaxHeapSize       <span class="token operator">=</span> <span class="token number">6442450944</span>   <span class="token punctuation">{</span>product<span class="token punctuation">}</span> <span class="token punctuation">{</span>ergonomic<span class="token punctuation">}</span>
   size_t MinHeapSize       <span class="token operator">=</span> <span class="token number">8388608</span>      <span class="token punctuation">{</span>product<span class="token punctuation">}</span> <span class="token punctuation">{</span>ergonomic<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>JVM大约分配了6GB或25%，对我们的应用程序来说可能太多了。设置特定的最大堆也可能会造成问题。如果我们使用<code>-Xmx4g</code>，它可能对内存不足的主机失败，同时我们也不会得到我们可以拥有的额外内存：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">java</span> <span class="token parameter variable">-XX:+PrintFlagsFinal</span> <span class="token parameter variable">-Xmx4g</span> <span class="token parameter variable">-version</span> <span class="token operator">|</span><span class="token punctuation">\\</span>
<span class="token function">grep</span> <span class="token parameter variable">-e</span> <span class="token string">&#39;\\bMaxHeapSize\\|MinHeapSize\\|InitialHeapSize&#39;</span>
   size_t InitialHeapSize   <span class="token operator">=</span> <span class="token number">402653184</span>    <span class="token punctuation">{</span>product<span class="token punctuation">}</span> <span class="token punctuation">{</span>ergonomic<span class="token punctuation">}</span>
   size_t MaxHeapSize       <span class="token operator">=</span> <span class="token number">4294967296</span>   <span class="token punctuation">{</span>product<span class="token punctuation">}</span> <span class="token punctuation">{</span>command line<span class="token punctuation">}</span>
   size_t MinHeapSize       <span class="token operator">=</span> <span class="token number">8388608</span>      <span class="token punctuation">{</span>product<span class="token punctuation">}</span> <span class="token punctuation">{</span>ergonomic<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在某些情况下，这个问题可以通过使用脚本即时计算<code>-Xmx</code>来解决。然而，它绕过了JVM关于应用程序需求可能更精确的启发式算法。</p><h3 id="_2-2-使用-xx-maxram" tabindex="-1"><a class="header-anchor" href="#_2-2-使用-xx-maxram"><span>2.2 使用<code>-XX:MaxRAM</code></span></a></h3><p><code>-XX:MaxRAM</code>标志旨在解决上述问题。首先，它防止JVM在具有大量RAM的系统上过度分配内存。我们可以将这个标志视为“运行应用程序，但假设你最多只有X量的RAM”。</p><p>此外，<code>-XX:MaxRAM</code>允许JVM使用标准启发式算法来计算堆大小。让我们回顾一下前面的例子，但使用<code>-XX:MaxRAM</code>：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">java</span> <span class="token parameter variable">-XX:+PrintFlagsFinal</span> <span class="token parameter variable">-XX:MaxRAM</span><span class="token operator">=</span>6g <span class="token parameter variable">-version</span> <span class="token operator">|</span><span class="token punctuation">\\</span>
<span class="token function">grep</span> <span class="token parameter variable">-e</span> <span class="token string">&#39;\\bMaxHeapSize\\|MinHeapSize\\|InitialHeapSize&#39;</span>
   size_t InitialHeapSize   <span class="token operator">=</span> <span class="token number">100663296</span>    <span class="token punctuation">{</span>product<span class="token punctuation">}</span> <span class="token punctuation">{</span>ergonomic<span class="token punctuation">}</span>
   size_t MaxHeapSize       <span class="token operator">=</span> <span class="token number">1610612736</span>   <span class="token punctuation">{</span>product<span class="token punctuation">}</span> <span class="token punctuation">{</span>ergonomic<span class="token punctuation">}</span>
   size_t MinHeapSize       <span class="token operator">=</span> <span class="token number">8388608</span>      <span class="token punctuation">{</span>product<span class="token punctuation">}</span> <span class="token punctuation">{</span>ergonomic<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这种情况下，JVM计算了最大堆大小，但假设我们只有6GB的RAM。注意我们不应该与<code>-XX:MaxRAM</code>一起使用<code>-Xmx</code>。因为<code>-Xmx</code>更具体，它会覆盖<code>-XX:MaxRAM</code>：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">java</span> <span class="token parameter variable">-XX:+PrintFlagsFinal</span> <span class="token parameter variable">-XX:MaxRAM</span><span class="token operator">=</span>6g <span class="token parameter variable">-Xmx6g</span> <span class="token parameter variable">-version</span> <span class="token operator">|</span><span class="token punctuation">\\</span>
<span class="token function">grep</span> <span class="token parameter variable">-e</span> <span class="token string">&#39;\\bMaxHeapSize\\|MinHeapSize\\|InitialHeapSize&#39;</span>
   size_t InitialHeapSize   <span class="token operator">=</span> <span class="token number">100663296</span>    <span class="token punctuation">{</span>product<span class="token punctuation">}</span> <span class="token punctuation">{</span>ergonomic<span class="token punctuation">}</span>
   size_t MaxHeapSize       <span class="token operator">=</span> <span class="token number">6442450944</span>   <span class="token punctuation">{</span>product<span class="token punctuation">}</span> <span class="token punctuation">{</span>command line<span class="token punctuation">}</span>
   size_t MinHeapSize       <span class="token operator">=</span> <span class="token number">8388608</span>      <span class="token punctuation">{</span>product<span class="token punctuation">}</span> <span class="token punctuation">{</span>ergonomic<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个标志可以提高资源利用率和堆分配。然而，我们仍然无法控制应该将多少RAM分配给堆。</p><h3 id="_2-3-使用-xx-maxrampercentage和-xx-minrampercentage" tabindex="-1"><a class="header-anchor" href="#_2-3-使用-xx-maxrampercentage和-xx-minrampercentage"><span>2.3 使用<code>-XX:MaxRAMPercentage</code>和<code>-XX:MinRAMPercentage</code></span></a></h3><p>现在我们可以控制并告诉JVM它应该考虑多少RAM。让我们定义我们的堆分配策略。<code>-XX:MaxRAM</code>标志与<code>-XX:MaxRAMPercentage</code>和<code>-XX:MinRAMPercentage</code>很好地配合使用。**它们提供了更多的灵活性，特别是在容器化环境中。**让我们尝试将其与<code>-XX:MaxRAM</code>一起使用，并将堆设置为可用RAM的50%：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">java</span> <span class="token parameter variable">-XX:+PrintFlagsFinal</span> <span class="token parameter variable">-XX:MaxRAM</span><span class="token operator">=</span>6g <span class="token parameter variable">-XX:MaxRAMPercentage</span><span class="token operator">=</span><span class="token number">50</span> <span class="token parameter variable">-version</span> <span class="token operator">|</span><span class="token punctuation">\\</span>
<span class="token function">grep</span> <span class="token parameter variable">-e</span> <span class="token string">&#39;\\bMaxHeapSize\\|MinHeapSize\\|InitialHeapSize&#39;</span>
   size_t InitialHeapSize   <span class="token operator">=</span> <span class="token number">100663296</span>    <span class="token punctuation">{</span>product<span class="token punctuation">}</span> <span class="token punctuation">{</span>ergonomic<span class="token punctuation">}</span>
   size_t MaxHeapSize       <span class="token operator">=</span> <span class="token number">3221225472</span>   <span class="token punctuation">{</span>product<span class="token punctuation">}</span> <span class="token punctuation">{</span>ergonomic<span class="token punctuation">}</span>
   size_t MinHeapSize       <span class="token operator">=</span> <span class="token number">8388608</span>      <span class="token punctuation">{</span>product<span class="token punctuation">}</span> <span class="token punctuation">{</span>ergonomic<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>关于<code>-XX:MinRAMPercentage</code>有一个常见的误解。它并不像<code>-Xms</code>那样表现。尽管，假设它设置最小堆大小是合理的。让我们检查以下设置：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">java</span> <span class="token parameter variable">-XX:+PrintFlagsFinal</span> <span class="token parameter variable">-XX:MaxRAM</span><span class="token operator">=</span>16g <span class="token parameter variable">-XX:MaxRAMPercentage</span><span class="token operator">=</span><span class="token number">10</span> <span class="token parameter variable">-XX:MinRAMPercentage</span><span class="token operator">=</span><span class="token number">50</span> <span class="token parameter variable">-version</span> <span class="token operator">|</span><span class="token punctuation">\\</span>
<span class="token function">grep</span> <span class="token parameter variable">-e</span> <span class="token string">&#39;\\bMaxHeapSize\\|MinHeapSize\\|InitialHeapSize&#39;</span>
   size_t InitialHeapSize   <span class="token operator">=</span> <span class="token number">268435456</span>    <span class="token punctuation">{</span>product<span class="token punctuation">}</span> <span class="token punctuation">{</span>ergonomic<span class="token punctuation">}</span>
   size_t MaxHeapSize       <span class="token operator">=</span> <span class="token number">1719664640</span>   <span class="token punctuation">{</span>product<span class="token punctuation">}</span> <span class="token punctuation">{</span>ergonomic<span class="token punctuation">}</span>
   size_t MinHeapSize       <span class="token operator">=</span> <span class="token number">8388608</span>      <span class="token punctuation">{</span>product<span class="token punctuation">}</span> <span class="token punctuation">{</span>ergonomic<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们设置了<code>-XX:MaxRAMPercentage</code>和<code>-XX:MinRAMPercentage</code>，但很明显只有<code>-XX:MaxRAMPercentage</code>在工作。<strong>我们为堆分配了16GB RAM的10%。</strong> 然而，如果我们将可用RAM减少到200MB，我们会得到不同的行为：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">java</span> <span class="token parameter variable">-XX:+PrintFlagsFinal</span> <span class="token parameter variable">-XX:MaxRAM</span><span class="token operator">=</span>200m <span class="token parameter variable">-XX:MaxRAMPercentage</span><span class="token operator">=</span><span class="token number">10</span> <span class="token parameter variable">-XX:MinRAMPercentage</span><span class="token operator">=</span><span class="token number">50</span> <span class="token parameter variable">-version</span> <span class="token operator">|</span><span class="token punctuation">\\</span>
<span class="token function">grep</span> <span class="token parameter variable">-e</span> <span class="token string">&#39;\\bMaxHeapSize\\|MinHeapSize\\|InitialHeapSize&#39;</span>
   size_t InitialHeapSize   <span class="token operator">=</span> <span class="token number">8388608</span>      <span class="token punctuation">{</span>product<span class="token punctuation">}</span> <span class="token punctuation">{</span>ergonomic<span class="token punctuation">}</span>
   size_t MaxHeapSize       <span class="token operator">=</span> <span class="token number">109051904</span>    <span class="token punctuation">{</span>product<span class="token punctuation">}</span> <span class="token punctuation">{</span>ergonomic<span class="token punctuation">}</span>
   size_t MinHeapSize       <span class="token operator">=</span> <span class="token number">8388608</span>      <span class="token punctuation">{</span>product<span class="token punctuation">}</span> <span class="token punctuation">{</span>ergonomic<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这种情况下，堆大小由<code>-XX:MinRAMPercentage</code>控制。当可用RAM降至200MB以下时，这个标志开始生效。现在，我们可以将堆增加到75%：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">java</span> <span class="token parameter variable">-XX:+PrintFlagsFinal</span> <span class="token parameter variable">-XX:MaxRAM</span><span class="token operator">=</span>200m <span class="token parameter variable">-XX:MaxRAMPercentage</span><span class="token operator">=</span><span class="token number">10</span> <span class="token parameter variable">-XX:MinRAMPercentage</span><span class="token operator">=</span><span class="token number">75</span> <span class="token parameter variable">-version</span> <span class="token operator">|</span><span class="token punctuation">\\</span>
<span class="token function">grep</span> <span class="token parameter variable">-e</span> <span class="token string">&#39;\\bMaxHeapSize\\|MinHeapSize\\|InitialHeapSize&#39;</span>
   size_t InitialHeapSize   <span class="token operator">=</span> <span class="token number">8388608</span>      <span class="token punctuation">{</span>product<span class="token punctuation">}</span> <span class="token punctuation">{</span>ergonomic<span class="token punctuation">}</span>
   size_t MaxHeapSize       <span class="token operator">=</span> <span class="token number">134217728</span>    <span class="token punctuation">{</span>product<span class="token punctuation">}</span> <span class="token punctuation">{</span>ergonomic<span class="token punctuation">}</span>
   size_t MinHeapSize       <span class="token operator">=</span> <span class="token number">8388608</span>      <span class="token punctuation">{</span>product<span class="token punctuation">}</span> <span class="token punctuation">{</span>ergonomic<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们对这样小的堆使用<code>-XX:MaxRAMPercentage</code>，我们会得到20MB的堆，这可能对我们的目的来说不够。<strong>这就是为什么我们为大堆和小堆有不同标志的原因。</strong><code>-XX:MaxRAM</code>标志与它们配合得很好，给我们更多的控制。</p><h2 id="_3-结论" tabindex="-1"><a class="header-anchor" href="#_3-结论"><span>3. 结论</span></a></h2><p>控制堆大小对Java应用程序至关重要。分配更多的内存并不一定好；同时，分配不够内存也是坏的。</p><p>使用<code>-Xmx</code>、<code>-XX:MaxRAM</code>、<code>-XX:MaxRAMPercentage</code>和<code>-XX:MinRAMPercentage</code>可以帮助我们更好地调整应用程序并提高性能。</p>`,35),o=[t];function c(i,r){return s(),n("div",null,o)}const d=a(p,[["render",c],["__file","2024-06-24-Difference Between Xmx and MaxRAM JVM Parameters.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-06-24/2024-06-24-Difference%20Between%20Xmx%20and%20MaxRAM%20JVM%20Parameters.html","title":"Java中Xmx与MaxRAM JVM参数的区别","lang":"zh-CN","frontmatter":{"date":"2024-06-25T00:00:00.000Z","category":["Java","JVM"],"tag":["Xmx","MaxRAM"],"head":[["meta",{"name":"keywords","content":"Java, JVM, Xmx, MaxRAM, 堆大小, 内存分配"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-24/2024-06-24-Difference%20Between%20Xmx%20and%20MaxRAM%20JVM%20Parameters.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中Xmx与MaxRAM JVM参数的区别"}],["meta",{"property":"og:description","content":"Java中Xmx与MaxRAM JVM参数的区别 1. 概述 堆大小是Java应用程序的一个关键参数。它直接影响我们可以使用多少内存，并间接影响应用程序的性能。例如，使用压缩指针、垃圾回收周期的数量和持续时间等。 在本教程中，我们将学习如何使用-XX:MaxRAM标志来提供更多的堆大小计算调整机会。这在容器内运行应用程序或在不同主机上运行时尤其重要。 ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-24T23:51:12.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Xmx"}],["meta",{"property":"article:tag","content":"MaxRAM"}],["meta",{"property":"article:published_time","content":"2024-06-25T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-24T23:51:12.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中Xmx与MaxRAM JVM参数的区别\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-25T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-24T23:51:12.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中Xmx与MaxRAM JVM参数的区别 1. 概述 堆大小是Java应用程序的一个关键参数。它直接影响我们可以使用多少内存，并间接影响应用程序的性能。例如，使用压缩指针、垃圾回收周期的数量和持续时间等。 在本教程中，我们将学习如何使用-XX:MaxRAM标志来提供更多的堆大小计算调整机会。这在容器内运行应用程序或在不同主机上运行时尤其重要。 ..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 堆大小计算","slug":"_2-堆大小计算","link":"#_2-堆大小计算","children":[{"level":3,"title":"2.1 使用-Xmx","slug":"_2-1-使用-xmx","link":"#_2-1-使用-xmx","children":[]},{"level":3,"title":"2.2 使用-XX:MaxRAM","slug":"_2-2-使用-xx-maxram","link":"#_2-2-使用-xx-maxram","children":[]},{"level":3,"title":"2.3 使用-XX:MaxRAMPercentage和-XX:MinRAMPercentage","slug":"_2-3-使用-xx-maxrampercentage和-xx-minrampercentage","link":"#_2-3-使用-xx-maxrampercentage和-xx-minrampercentage","children":[]}]},{"level":2,"title":"3. 结论","slug":"_3-结论","link":"#_3-结论","children":[]}],"git":{"createdTime":1719273072000,"updatedTime":1719273072000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.59,"words":1378},"filePathRelative":"posts/baeldung/2024-06-24/2024-06-24-Difference Between Xmx and MaxRAM JVM Parameters.md","localizedDate":"2024年6月25日","excerpt":"<hr>\\n<h1>Java中Xmx与MaxRAM JVM参数的区别</h1>\\n<h2>1. 概述</h2>\\n<p>堆大小是Java应用程序的一个关键参数。它直接影响我们可以使用多少内存，并间接影响应用程序的性能。例如，使用压缩指针、垃圾回收周期的数量和持续时间等。</p>\\n<p>在本教程中，我们将学习如何使用<code>-XX:MaxRAM</code>标志来提供更多的堆大小计算调整机会。这在容器内运行应用程序或在不同主机上运行时尤其重要。</p>\\n<h2>2. 堆大小计算</h2>\\n<p>配置堆的标记可以一起工作，也可以相互覆盖。理解它们之间的关系对于更深入地了解它们的用途非常重要。</p>","autoDesc":true}');export{d as comp,m as data};
