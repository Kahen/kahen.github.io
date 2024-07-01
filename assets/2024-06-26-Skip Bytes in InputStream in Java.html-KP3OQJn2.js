import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-BEmnZ9jQ.js";const e={},p=t(`<h1 id="java中在inputstream中跳过字节" tabindex="-1"><a class="header-anchor" href="#java中在inputstream中跳过字节"><span>Java中在InputStream中跳过字节</span></a></h1><p>在Java编程中，<code>InputStream</code>是一个基本类，用于从源头读取字节。然而，在某些场景中，可能需要在<code>InputStream</code>中跳过一定数量的字节。</p><p>在本教程中，我们将深入探讨<code>skip()</code>方法，探索如何在Java的<code>InputStream</code>中有效地跳过字节。</p><p><code>InputStream</code>是一个抽象类，作为所有表示字节输入流的类的超类。此外，它提供了从流中读取字节的方法，成为输入操作的基本组件。</p><p>在相同的背景下，有多种情况需要跳过字节。一个常见的场景是处理文件头或元数据，这些对于特定操作不是必需的。因此，跳过不必要的字节可以提高性能并减少需要处理的数据量。</p><p>使用<code>skip()</code>方法跳过字节</p><p>Java中的<code>InputStream</code>类提供了一个内置的方法叫做<code>skip(long n)</code>，用于跳过指定数量的字节。参数<code>n</code>表示要跳过的字节数。</p><p>让我们以以下示例为例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenInputStreamWithBytes_whenSkipBytes_thenRemainingBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> inputData <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token class-name">InputStream</span> inputStream <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ByteArrayInputStream</span><span class="token punctuation">(</span>inputData<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">long</span> bytesToSkip <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
    <span class="token keyword">long</span> skippedBytes <span class="token operator">=</span> inputStream<span class="token punctuation">.</span><span class="token function">skip</span><span class="token punctuation">(</span>bytesToSkip<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertArrayEquals</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token function">readRemainingBytes</span><span class="token punctuation">(</span>inputStream<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">assert</span> skippedBytes <span class="token operator">==</span> bytesToSkip <span class="token operator">:</span> <span class="token string">&quot;跳过的字节数量不正确&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该测试首先设置了一个从1到10的字节数组，并使用字节数组初始化了一个<code>ByteArrayInputStream</code>创建了<code>InputStream</code>。随后，代码指定了要跳过的字节数（在本例中为3），并在<code>InputStream</code>上调用了跳过方法。</p><p>然后，测试使用断言来验证输入流中剩余的字节是否与预期的数组{4, 5, 6, 7, 8, 9, 10}匹配，使用<code>readRemainingBytes()</code>方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">readRemainingBytes</span><span class="token punctuation">(</span><span class="token class-name">InputStream</span> inputStream<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> buffer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">byte</span><span class="token punctuation">[</span>inputStream<span class="token punctuation">.</span><span class="token function">available</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> bytesRead <span class="token operator">=</span> inputStream<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span>buffer<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>bytesRead <span class="token operator">==</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IOException</span><span class="token punctuation">(</span><span class="token string">&quot;已到达流的末尾&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> buffer<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个方法将剩余的字节读入缓冲区，并确保没有到达流的末尾。</p><p>总之，高效的字节流管理在Java中至关重要，特别是<code>InputStream</code>类，尤其是<code>skip()</code>方法，在处理输入操作时提供了一个有价值的工具，用于跳过字节，提高性能并减少不必要的数据处理。</p><p>如往常一样，本文的完整代码示例可以在GitHub上找到。</p>`,15),o=[p];function c(u,i){return s(),a("div",null,o)}const k=n(e,[["render",c],["__file","2024-06-26-Skip Bytes in InputStream in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-06-26/2024-06-26-Skip%20Bytes%20in%20InputStream%20in%20Java.html","title":"Java中在InputStream中跳过字节","lang":"zh-CN","frontmatter":{"date":"2024-06-26T00:00:00.000Z","category":["Java","InputStream"],"tag":["Java","InputStream","skip bytes"],"head":[["meta",{"name":"keywords","content":"Java, InputStream, skip bytes, Java编程, 字节流, 跳过字节"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-26/2024-06-26-Skip%20Bytes%20in%20InputStream%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中在InputStream中跳过字节"}],["meta",{"property":"og:description","content":"Java中在InputStream中跳过字节 在Java编程中，InputStream是一个基本类，用于从源头读取字节。然而，在某些场景中，可能需要在InputStream中跳过一定数量的字节。 在本教程中，我们将深入探讨skip()方法，探索如何在Java的InputStream中有效地跳过字节。 InputStream是一个抽象类，作为所有表示字节..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-26T02:52:28.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"InputStream"}],["meta",{"property":"article:tag","content":"skip bytes"}],["meta",{"property":"article:published_time","content":"2024-06-26T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-26T02:52:28.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中在InputStream中跳过字节\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-26T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-26T02:52:28.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中在InputStream中跳过字节 在Java编程中，InputStream是一个基本类，用于从源头读取字节。然而，在某些场景中，可能需要在InputStream中跳过一定数量的字节。 在本教程中，我们将深入探讨skip()方法，探索如何在Java的InputStream中有效地跳过字节。 InputStream是一个抽象类，作为所有表示字节..."},"headers":[],"git":{"createdTime":1719370348000,"updatedTime":1719370348000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.05,"words":614},"filePathRelative":"posts/baeldung/2024-06-26/2024-06-26-Skip Bytes in InputStream in Java.md","localizedDate":"2024年6月26日","excerpt":"\\n<p>在Java编程中，<code>InputStream</code>是一个基本类，用于从源头读取字节。然而，在某些场景中，可能需要在<code>InputStream</code>中跳过一定数量的字节。</p>\\n<p>在本教程中，我们将深入探讨<code>skip()</code>方法，探索如何在Java的<code>InputStream</code>中有效地跳过字节。</p>\\n<p><code>InputStream</code>是一个抽象类，作为所有表示字节输入流的类的超类。此外，它提供了从流中读取字节的方法，成为输入操作的基本组件。</p>\\n<p>在相同的背景下，有多种情况需要跳过字节。一个常见的场景是处理文件头或元数据，这些对于特定操作不是必需的。因此，跳过不必要的字节可以提高性能并减少需要处理的数据量。</p>","autoDesc":true}');export{k as comp,d as data};
