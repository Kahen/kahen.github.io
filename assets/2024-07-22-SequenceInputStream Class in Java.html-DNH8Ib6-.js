import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as e}from"./app-CbPcg273.js";const t={},p=e(`<hr><h1 id="java中的sequenceinputstream类" tabindex="-1"><a class="header-anchor" href="#java中的sequenceinputstream类"><span>Java中的SequenceInputStream类</span></a></h1><p>在这个教程中，我们将学习如何在Java中使用_SequenceInputStream_类。特别是，这个类在连续读取一系列文件或流时非常有用。</p><p>有关Java IO和其他相关Java类的更多基础知识，我们可以阅读Java IO教程。</p><h3 id="使用-sequenceinputstream-类" tabindex="-1"><a class="header-anchor" href="#使用-sequenceinputstream-类"><span>使用_SequenceInputStream_类</span></a></h3><p>_SequenceInputStream_接受两个或更多的_InputStream_对象作为源。它按照给定的顺序依次从每个源读取。当它完成从第一个_InputStream_的读取后，它会自动开始从第二个读取。这个过程会一直持续，直到它完成所有源流的读取。</p><h4 id="_2-1-对象创建" tabindex="-1"><a class="header-anchor" href="#_2-1-对象创建"><span>2.1. 对象创建</span></a></h4><p>我们可以使用两个_InputStream_对象来初始化_SequenceInputStream_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">InputStream</span> first <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileInputStream</span><span class="token punctuation">(</span>file1<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">InputStream</span> second <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileInputStream</span><span class="token punctuation">(</span>file2<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">SequenceInputStream</span> sequenceInputStream <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SequenceInputStream</span><span class="token punctuation">(</span>first<span class="token punctuation">,</span> second<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们也可以使用_Enumeration_的_InputStream_对象实例化它：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Vector</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">InputStream</span><span class="token punctuation">&gt;</span></span>\` inputStreams <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vector</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">String</span> fileName <span class="token operator">:</span> fileNames<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    inputStreams<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">FileInputStream</span><span class="token punctuation">(</span>fileName<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
sequenceInputStream <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SequenceInputStream</span><span class="token punctuation">(</span>inputStreams<span class="token punctuation">.</span><span class="token function">elements</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-2-从流中读取" tabindex="-1"><a class="header-anchor" href="#_2-2-从流中读取"><span>2.2. 从流中读取</span></a></h4><p>_SequenceInputStream_提供了两种简单的方法来从输入源读取数据。第一种方法读取单个字节，而第二种方法读取字节数组。</p><p>要读取单个字节的数据，我们使用_read()_方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span> byteValue <span class="token operator">=</span> sequenceInputStream<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在上面的例子中，read方法返回流中的下一个字节（0 – 255）值。如果流到达末尾，则返回-1。</p><p>我们还可以从数组中读取字节：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> bytes <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token number">100</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
sequenceInputStream<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span>bytes<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">50</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的例子中，它读取50个字节，并将它们从索引0开始放置。</p><h4 id="_2-3-显示序列读取的示例" tabindex="-1"><a class="header-anchor" href="#_2-3-显示序列读取的示例"><span>2.3. 显示序列读取的示例</span></a></h4><p>以两个字符串作为输入源来演示读取序列：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">InputStream</span> first <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ByteArrayInputStream</span><span class="token punctuation">(</span><span class="token string">&quot;One&quot;</span><span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">InputStream</span> second <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ByteArrayInputStream</span><span class="token punctuation">(</span><span class="token string">&quot;Magic&quot;</span><span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">SequenceInputStream</span> sequenceInputStream <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SequenceInputStream</span><span class="token punctuation">(</span>first<span class="token punctuation">,</span> second<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">StringBuilder</span> stringBuilder <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> byteValue<span class="token punctuation">;</span>
<span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>byteValue <span class="token operator">=</span> sequenceInputStream<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    stringBuilder<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">char</span><span class="token punctuation">)</span> byteValue<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;OneMagic&quot;</span><span class="token punctuation">,</span> stringBuilder<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从上面的例子中，如果我们打印_stringBuilder.toString()_，它将显示以下输出：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>OneMagic
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="结论" tabindex="-1"><a class="header-anchor" href="#结论"><span>结论</span></a></h3><p>在这篇简短的文章中，我们看到了如何使用_SequenceInputStream_。它只是将所有底层输入流合并为一个单一的流。</p><p>完整的代码示例可以在GitHub上找到。</p>`,27),c=[p];function o(u,l){return s(),a("div",null,c)}const d=n(t,[["render",o],["__file","2024-07-22-SequenceInputStream Class in Java.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-22/2024-07-22-SequenceInputStream%20Class%20in%20Java.html","title":"Java中的SequenceInputStream类","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","IO"],"tag":["SequenceInputStream","Java IO"],"head":[["meta",{"name":"keywords","content":"Java, SequenceInputStream, IO, 文件流"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-22/2024-07-22-SequenceInputStream%20Class%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中的SequenceInputStream类"}],["meta",{"property":"og:description","content":"Java中的SequenceInputStream类 在这个教程中，我们将学习如何在Java中使用_SequenceInputStream_类。特别是，这个类在连续读取一系列文件或流时非常有用。 有关Java IO和其他相关Java类的更多基础知识，我们可以阅读Java IO教程。 使用_SequenceInputStream_类 _SequenceI..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-22T19:45:15.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"SequenceInputStream"}],["meta",{"property":"article:tag","content":"Java IO"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-22T19:45:15.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中的SequenceInputStream类\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-22T19:45:15.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中的SequenceInputStream类 在这个教程中，我们将学习如何在Java中使用_SequenceInputStream_类。特别是，这个类在连续读取一系列文件或流时非常有用。 有关Java IO和其他相关Java类的更多基础知识，我们可以阅读Java IO教程。 使用_SequenceInputStream_类 _SequenceI..."},"headers":[{"level":3,"title":"使用_SequenceInputStream_类","slug":"使用-sequenceinputstream-类","link":"#使用-sequenceinputstream-类","children":[]},{"level":3,"title":"结论","slug":"结论","link":"#结论","children":[]}],"git":{"createdTime":1721677515000,"updatedTime":1721677515000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":1.82,"words":547},"filePathRelative":"posts/baeldung/2024-07-22/2024-07-22-SequenceInputStream Class in Java.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>Java中的SequenceInputStream类</h1>\\n<p>在这个教程中，我们将学习如何在Java中使用_SequenceInputStream_类。特别是，这个类在连续读取一系列文件或流时非常有用。</p>\\n<p>有关Java IO和其他相关Java类的更多基础知识，我们可以阅读Java IO教程。</p>\\n<h3>使用_SequenceInputStream_类</h3>\\n<p>_SequenceInputStream_接受两个或更多的_InputStream_对象作为源。它按照给定的顺序依次从每个源读取。当它完成从第一个_InputStream_的读取后，它会自动开始从第二个读取。这个过程会一直持续，直到它完成所有源流的读取。</p>","autoDesc":true}');export{d as comp,k as data};
