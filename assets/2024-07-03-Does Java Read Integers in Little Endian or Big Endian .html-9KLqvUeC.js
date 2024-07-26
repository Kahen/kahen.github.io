import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as t}from"./app-C4eFoh0f.js";const e={},p=t(`<h1 id="java是如何读取整数的-小端还是大端" tabindex="-1"><a class="header-anchor" href="#java是如何读取整数的-小端还是大端"><span>Java是如何读取整数的：小端还是大端？</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>&quot;大端&quot;和&quot;小端&quot;这两个术语描述了内存中字节的排列顺序。在处理数据序列化、网络通信或在不同硬件架构中读取二进制数据时，字节序至关重要。</p><p>在本教程中，我们将深入探讨Java如何读取整数，以及它是否遵循小端或大端方法。</p><h2 id="_2-什么是字节序" tabindex="-1"><a class="header-anchor" href="#_2-什么是字节序"><span>2. 什么是字节序？</span></a></h2><p>字节序指的是计算机内存中字节的排列方式。它有两种形式：小端和大端。</p><p><strong>大端存储在最小的内存地址处存储最高位字节。</strong></p><p>另一方面，<strong>小端在最小的内存地址处存储最低位字节。</strong></p><h2 id="_3-java中的字节顺序" tabindex="-1"><a class="header-anchor" href="#_3-java中的字节顺序"><span>3. Java中的字节顺序</span></a></h2><p>让我们看一个输出整数值字节顺序的示例代码：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span> value <span class="token operator">=</span> <span class="token number">123456789</span><span class="token punctuation">;</span>
<span class="token keyword">byte</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> bytes <span class="token operator">=</span> <span class="token class-name">ByteBuffer</span><span class="token punctuation">.</span><span class="token function">allocate</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">putInt</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">array</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">byte</span> b <span class="token operator">:</span> bytes<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token string">&quot;0x%x &quot;</span><span class="token punctuation">,</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的代码中，我们声明了一个名为_value_的整数变量。接下来，我们声明一个_byte_数组，并通过调用_ByteBuffer_上的_allocate()_方法为其分配4个字节的空间。</p><p>此外，我们调用_putInt()_方法将四个字节的数据写入_ByteBuffer_对象。另外，_array()_方法帮助我们从_ByteBuffer_对象中获取_byte_数组。</p><p>最后，我们打印每个字节的十六进制值。</p><p>让我们看看示例代码的输出：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token number">0x7</span> <span class="token number">0x5b</span> <span class="token number">0xcd</span> <span class="token number">0x15</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上面的输出显示了内存中表示整数的四个字节的顺序。输出中的第一个字节“<em>0x7</em>”是整数的最高位字节，最后一个字节“<em>0x15</em>”是最低位字节。这种从最高位到最低位的字节顺序是大端字节顺序的特征。因此，我们可以推断Java默认使用大端字节顺序来处理整数。</p><p><strong>然而，大多数处理器以小端格式顺序字节。在运行时，JVM使用主机的原生字节序来读取二进制数据。</strong></p><p>Java提供了通过_ByteBuffer_类以小端顺序读取数据的灵活性。让我们修改示例代码以使用主机机器的原生字节序：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span> value <span class="token operator">=</span> <span class="token number">123456789</span><span class="token punctuation">;</span>
<span class="token keyword">byte</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> bytes <span class="token operator">=</span> <span class="token class-name">ByteBuffer</span><span class="token punctuation">.</span><span class="token function">allocate</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">order</span><span class="token punctuation">(</span><span class="token class-name">ByteOrder</span><span class="token punctuation">.</span><span class="token function">nativeOrder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">putInt</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">array</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">byte</span> b <span class="token operator">:</span> bytes<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token string">&quot;0x%x &quot;</span><span class="token punctuation">,</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们通过调用_order()_方法修改示例代码以使用主机机器的字节序。</p><p>让我们看看新的输出：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token number">0x15</span> <span class="token number">0xcd</span> <span class="token number">0x5b</span> <span class="token number">0x7</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>字节顺序从最低位字节“<em>0x15</em>”重新排列到最高位字节“<em>0x7</em>”。这表明主机机器的字节序是小端。</p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们了解到Java默认使用大端字节顺序。此外，Java提供了在必要时以小端读取数据所必需的类。</p><p>如往常一样，示例的完整源代码可在GitHub上找到。</p>`,27),o=[p];function c(i,l){return s(),n("div",null,o)}const d=a(e,[["render",c],["__file","2024-07-03-Does Java Read Integers in Little Endian or Big Endian .html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-03/2024-07-03-Does%20Java%20Read%20Integers%20in%20Little%20Endian%20or%20Big%20Endian%20.html","title":"Java是如何读取整数的：小端还是大端？","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Endianness"],"tag":["Java","Big Endian","Little Endian"],"head":[["meta",{"name":"keywords","content":"Java, Endianness, Big Endian, Little Endian"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-03/2024-07-03-Does%20Java%20Read%20Integers%20in%20Little%20Endian%20or%20Big%20Endian%20.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java是如何读取整数的：小端还是大端？"}],["meta",{"property":"og:description","content":"Java是如何读取整数的：小端还是大端？ 1. 概述 \\"大端\\"和\\"小端\\"这两个术语描述了内存中字节的排列顺序。在处理数据序列化、网络通信或在不同硬件架构中读取二进制数据时，字节序至关重要。 在本教程中，我们将深入探讨Java如何读取整数，以及它是否遵循小端或大端方法。 2. 什么是字节序？ 字节序指的是计算机内存中字节的排列方式。它有两种形式：小端和大..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-03T05:34:34.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Big Endian"}],["meta",{"property":"article:tag","content":"Little Endian"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-03T05:34:34.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java是如何读取整数的：小端还是大端？\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-03T05:34:34.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java是如何读取整数的：小端还是大端？ 1. 概述 \\"大端\\"和\\"小端\\"这两个术语描述了内存中字节的排列顺序。在处理数据序列化、网络通信或在不同硬件架构中读取二进制数据时，字节序至关重要。 在本教程中，我们将深入探讨Java如何读取整数，以及它是否遵循小端或大端方法。 2. 什么是字节序？ 字节序指的是计算机内存中字节的排列方式。它有两种形式：小端和大..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 什么是字节序？","slug":"_2-什么是字节序","link":"#_2-什么是字节序","children":[]},{"level":2,"title":"3. Java中的字节顺序","slug":"_3-java中的字节顺序","link":"#_3-java中的字节顺序","children":[]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1719984874000,"updatedTime":1719984874000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.48,"words":745},"filePathRelative":"posts/baeldung/2024-07-03/2024-07-03-Does Java Read Integers in Little Endian or Big Endian .md","localizedDate":"2022年4月1日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>\\"大端\\"和\\"小端\\"这两个术语描述了内存中字节的排列顺序。在处理数据序列化、网络通信或在不同硬件架构中读取二进制数据时，字节序至关重要。</p>\\n<p>在本教程中，我们将深入探讨Java如何读取整数，以及它是否遵循小端或大端方法。</p>\\n<h2>2. 什么是字节序？</h2>\\n<p>字节序指的是计算机内存中字节的排列方式。它有两种形式：小端和大端。</p>\\n<p><strong>大端存储在最小的内存地址处存储最高位字节。</strong></p>\\n<p>另一方面，<strong>小端在最小的内存地址处存储最低位字节。</strong></p>\\n<h2>3. Java中的字节顺序</h2>","autoDesc":true}');export{d as comp,k as data};
