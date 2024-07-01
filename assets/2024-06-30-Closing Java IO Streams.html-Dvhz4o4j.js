import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-BEmnZ9jQ.js";const e={},p=t(`<h1 id="java-io-流的关闭" tabindex="-1"><a class="header-anchor" href="#java-io-流的关闭"><span>Java IO 流的关闭</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在 Java IO 操作领域内，确保正确关闭 IO 流是非常重要的。这对于资源管理和代码的健壮性至关重要。</p><p>在本教程中，我们将<strong>详细探讨为什么需要关闭 IO 流</strong>。</p><h2 id="_2-不关闭-io-流会发生什么" tabindex="-1"><a class="header-anchor" href="#_2-不关闭-io-流会发生什么"><span>2. 不关闭 IO 流会发生什么？</span></a></h2><p>在完成对它们的所有操作后，显式关闭 IO 流始终是一个好习惯。忽略关闭它们可能会导致各种问题。</p><p>在这一部分，我们将看看这些问题。</p><h3 id="_2-1-资源泄漏" tabindex="-1"><a class="header-anchor" href="#_2-1-资源泄漏"><span>2.1. 资源泄漏</span></a></h3><p>每当我们打开一个 IO 流时，它总是用一些系统资源。<strong>这些资源直到 IO 流的 <em>close()</em> 方法被调用才会被释放</strong>。</p><p>某些 IO 流实现可以在它们的 <em>finalize()</em> 方法中自动关闭自己。_<em>finalize()</em> 方法在垃圾收集器（GC）被触发时调用。</p><p>然而，没有保证 GC 会被触发，也没有保证它何时被调用。资源可能在 GC 被调用之前就已经耗尽。因此，<strong>我们不应该完全依赖 GC 来回收系统资源</strong>。</p><h3 id="_2-2-数据损坏" tabindex="-1"><a class="header-anchor" href="#_2-2-数据损坏"><span>2.2. 数据损坏</span></a></h3><p>我们经常将 <em>BufferedOutputStream</em> 包装在 <em>OutputStream</em> 周围，以提供缓冲功能，减少每次写操作的开销。这是一种常见的做法，旨在提高写数据的性能。</p><p><em>BufferedOutputStream</em> 内部的缓冲区是一个用于临时存储数据的暂存区。当缓冲区达到一定大小或调用 <em>flush()</em> 方法时，数据将被写入目标。</p><p>当我们完成向 <em>BufferedOutputStream</em> 写入数据后，最后一块数据可能还没有写入目标，导致数据损坏。<strong>调用 <em>close()</em> 方法会调用 <em>flush()</em> 将缓冲区中的剩余数据写入</strong>。</p><h3 id="_2-3-文件锁定" tabindex="-1"><a class="header-anchor" href="#_2-3-文件锁定"><span>2.3. 文件锁定</span></a></h3><p>当我们使用 <em>FileOutputStream</em> 向文件写入数据时，一些操作系统（如 Windows）会将文件保持在我们的应用程序中。<strong>这阻止了其他应用程序写入甚至访问文件，直到 <em>FileOutputStream</em> 被关闭</strong>。</p><p>现在让我们来看看一些关闭 Java IO 流的方法。这些方法帮助我们避免我们讨论的问题，并确保适当的资源管理。</p><h3 id="_3-1-try-catch-finally" tabindex="-1"><a class="header-anchor" href="#_3-1-try-catch-finally"><span>3.1. <em>try-catch-finally</em></span></a></h3><p>这是关闭 IO 流的传统方式。<strong>我们在 <em>finally</em> 块中关闭 IO 流。这确保了无论操作是否成功，都会调用 <em>close()</em> 方法</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">InputStream</span> inputStream <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
<span class="token class-name">OutputStream</span> outputStream <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

<span class="token keyword">try</span> <span class="token punctuation">{</span>
    inputStream <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BufferedInputStream</span><span class="token punctuation">(</span>wrappedInputStream<span class="token punctuation">)</span><span class="token punctuation">;</span>
    outputStream <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BufferedOutputStream</span><span class="token punctuation">(</span>wrappedOutputStream<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 流操作...</span>
<span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>inputStream <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
            inputStream<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IOException</span> ioe1<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">&quot;无法关闭 InputStream&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>outputStream <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
            outputStream<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IOException</span> ioe2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">&quot;无法关闭 OutputStream&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所展示的，<em>close()</em> 方法也可能引发 <em>IOException</em>。因此，当关闭 IO 流时，我们必须在 <em>finally</em> 块中再放置一个 <em>try-catch</em> 块。<strong>当有大量 IO 流需要处理时，这个过程变得繁琐</strong>。</p><h3 id="_3-2-apache-commons-io" tabindex="-1"><a class="header-anchor" href="#_3-2-apache-commons-io"><span>3.2. Apache Commons IO</span></a></h3><p>Apache Commons IO 是一个多功能的 Java 库，为 IO 操作提供实用类和方法。</p><p>要使用它，让我们在 <em>pom.xml</em> 中包含以下依赖项：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`commons-io\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`commons-io\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\`2.15.1\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\`
\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Apache Commons 库简化了在 <em>finally</em> 块中关闭 IO 流等复杂任务：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">InputStream</span> inputStream <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
<span class="token class-name">OutputStream</span> outputStream <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

<span class="token keyword">try</span> <span class="token punctuation">{</span>
    inputStream <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BufferedInputStream</span><span class="token punctuation">(</span>wrappedInputStream<span class="token punctuation">)</span><span class="token punctuation">;</span>
    outputStream <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BufferedOutputStream</span><span class="token punctuation">(</span>wrappedOutputStream<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 流操作...</span>
<span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
    <span class="token class-name">IOUtils</span><span class="token punctuation">.</span><span class="token function">closeQuietly</span><span class="token punctuation">(</span>inputStream<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">IOUtils</span><span class="token punctuation">.</span><span class="token function">closeQuietly</span><span class="token punctuation">(</span>outputStream<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong><em>IOUtils.closeQuietly()</em> 有效地关闭 IO 流，无需进行空值检查，并处理关闭过程中发生的异常。</strong></p><p>除了 <em>IOUtils.closeQuietly()</em>，<strong>该库还提供了 <em>AutoCloseInputStream</em> 类来自动关闭包装的 <em>InputStream</em></strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">InputStream</span> inputStream <span class="token operator">=</span> <span class="token class-name">AutoCloseInputStream</span><span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setInputStream</span><span class="token punctuation">(</span>wrappedInputStream<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> buffer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token number">256</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">while</span> <span class="token punctuation">(</span>inputStream<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span>buffer<span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 其他操作...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述示例从 <em>InputStream</em> 中读取数据。<strong><em>AutoCloseInputStream</em> 在到达输入的末尾时自动关闭 <em>InputStream</em></strong>，这是通过从 <em>InputStream</em> 的 <em>read()</em> 方法中获取 <em>-1</em> 来确定的。在这种情况下，我们甚至不需要显式调用 <em>close()</em> 方法。</p><h3 id="_3-3-try-with-resources" tabindex="-1"><a class="header-anchor" href="#_3-3-try-with-resources"><span>3.3. <em>try-with-resources</em></span></a></h3><p><em>try-with-resources</em> 块是在 Java 7 中引入的。它被认为是关闭 IO 流的首选方式。</p><p><strong>这种方法允许我们在 <em>try</em> 语句中定义资源。</strong> 资源是在我们完成使用后必须关闭的对象。</p><p>例如，实现 <em>AutoClosable</em> 接口的类如 <em>InputStream</em> 和 <em>OutputStream</em> 被用作资源。它们将在 <em>try-catch</em> 块之后自动关闭。这<strong>消除了在 <em>finally</em> 块中显式调用 <em>close()</em> 方法的需要</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">BufferedInputStream</span> inputStream <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BufferedInputStream</span><span class="token punctuation">(</span>wrappedInputStream<span class="token punctuation">)</span><span class="token punctuation">;</span>
     <span class="token class-name">BufferedOutputStream</span> outputStream <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BufferedOutputStream</span><span class="token punctuation">(</span>wrappedOutputStream<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 流操作...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Java 9 进一步改进了 <em>try-with-resources</em> 语法。<strong>我们可以在 <em>try-with-resources</em> 块之前声明资源变量，并直接在 <em>try</em> 语句中指定它们的变量名</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">InputStream</span> inputStream <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BufferedInputStream</span><span class="token punctuation">(</span>wrappedInputStream<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">OutputStream</span> outputStream <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BufferedOutputStream</span><span class="token punctuation">(</span>wrappedOutputStream<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">try</span> <span class="token punctuation">(</span>inputStream<span class="token punctuation">;</span> outputStream<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 流操作...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们检查了关闭 IO 流的各种策略，从在 <em>finally</em> 块中调用 <em>close()</em> 方法的传统方法到 Apache Commons IO 等库提供的更简化的方法，以及 <em>try-with-resources</em> 的优雅。</p><p>有各种技术可供选择，我们可以根据自己的代码库选择最佳方法，并确保顺畅且无错误的 IO 操作。</p><p>像往常一样，文章中展示的源代码可以在 GitHub 上找到。</p>`,43),o=[p];function c(l,i){return s(),a("div",null,o)}const m=n(e,[["render",c],["__file","2024-06-30-Closing Java IO Streams.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-06-30/2024-06-30-Closing%20Java%20IO%20Streams.html","title":"Java IO 流的关闭","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","IO"],"tag":["Java IO","Streams"],"head":[["meta",{"name":"keywords","content":"Java IO Streams, Closing Streams, Resource Management"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-30/2024-06-30-Closing%20Java%20IO%20Streams.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java IO 流的关闭"}],["meta",{"property":"og:description","content":"Java IO 流的关闭 1. 概述 在 Java IO 操作领域内，确保正确关闭 IO 流是非常重要的。这对于资源管理和代码的健壮性至关重要。 在本教程中，我们将详细探讨为什么需要关闭 IO 流。 2. 不关闭 IO 流会发生什么？ 在完成对它们的所有操作后，显式关闭 IO 流始终是一个好习惯。忽略关闭它们可能会导致各种问题。 在这一部分，我们将看看..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-30T20:53:16.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java IO"}],["meta",{"property":"article:tag","content":"Streams"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-30T20:53:16.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java IO 流的关闭\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-30T20:53:16.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java IO 流的关闭 1. 概述 在 Java IO 操作领域内，确保正确关闭 IO 流是非常重要的。这对于资源管理和代码的健壮性至关重要。 在本教程中，我们将详细探讨为什么需要关闭 IO 流。 2. 不关闭 IO 流会发生什么？ 在完成对它们的所有操作后，显式关闭 IO 流始终是一个好习惯。忽略关闭它们可能会导致各种问题。 在这一部分，我们将看看..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 不关闭 IO 流会发生什么？","slug":"_2-不关闭-io-流会发生什么","link":"#_2-不关闭-io-流会发生什么","children":[{"level":3,"title":"2.1. 资源泄漏","slug":"_2-1-资源泄漏","link":"#_2-1-资源泄漏","children":[]},{"level":3,"title":"2.2. 数据损坏","slug":"_2-2-数据损坏","link":"#_2-2-数据损坏","children":[]},{"level":3,"title":"2.3. 文件锁定","slug":"_2-3-文件锁定","link":"#_2-3-文件锁定","children":[]},{"level":3,"title":"3.1. try-catch-finally","slug":"_3-1-try-catch-finally","link":"#_3-1-try-catch-finally","children":[]},{"level":3,"title":"3.2. Apache Commons IO","slug":"_3-2-apache-commons-io","link":"#_3-2-apache-commons-io","children":[]},{"level":3,"title":"3.3. try-with-resources","slug":"_3-3-try-with-resources","link":"#_3-3-try-with-resources","children":[]}]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1719780796000,"updatedTime":1719780796000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.3,"words":1289},"filePathRelative":"posts/baeldung/2024-06-30/2024-06-30-Closing Java IO Streams.md","localizedDate":"2022年4月1日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>在 Java IO 操作领域内，确保正确关闭 IO 流是非常重要的。这对于资源管理和代码的健壮性至关重要。</p>\\n<p>在本教程中，我们将<strong>详细探讨为什么需要关闭 IO 流</strong>。</p>\\n<h2>2. 不关闭 IO 流会发生什么？</h2>\\n<p>在完成对它们的所有操作后，显式关闭 IO 流始终是一个好习惯。忽略关闭它们可能会导致各种问题。</p>\\n<p>在这一部分，我们将看看这些问题。</p>\\n<h3>2.1. 资源泄漏</h3>\\n<p>每当我们打开一个 IO 流时，它总是用一些系统资源。<strong>这些资源直到 IO 流的 <em>close()</em> 方法被调用才会被释放</strong>。</p>","autoDesc":true}');export{m as comp,d as data};
