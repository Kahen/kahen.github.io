import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-WRJux_nM.js";const e={},p=t(`<h1 id="java中将int转换为无符号字节" tabindex="-1"><a class="header-anchor" href="#java中将int转换为无符号字节"><span>Java中将int转换为无符号字节</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>在Java中，_byte_类型是一个有符号的8位整数。这意味着它可以存储-128到127之间的值。然而，在某些情况下，我们可能需要将_bytes_作为无符号数来处理，表示0到255的值。这在处理二进制数据、网络和文件I/O时尤为重要，因为无符号字节很常见。</p><p><strong>在本教程中，我们将探讨将_int_转换为无符号_byte_的两种方法。</strong></p><h2 id="_2-使用类型转换和位掩码" tabindex="-1"><a class="header-anchor" href="#_2-使用类型转换和位掩码"><span>2. 使用类型转换和位掩码</span></a></h2><p>最常见的方法是使用类型转换结合位掩码。让我们探索实现方式：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span> value <span class="token operator">=</span> <span class="token number">200</span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenInt_whenUsingTypeCastingAndBitMasking_thenConvertToUnsignedByte</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">byte</span> unsignedByte <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">byte</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>value <span class="token operator">&amp;</span> <span class="token number">0xFF</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span>value<span class="token punctuation">,</span> <span class="token class-name">Byte</span><span class="token punctuation">.</span><span class="token function">toUnsignedInt</span><span class="token punctuation">(</span>unsignedByte<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个测试中，我们首先初始化一个值为200的整数。然后，我们使用表达式（value &amp; 0xFF）将这个整数转换为无符号_byte_表示。这个操作涉及到整数值和十六进制值0xFF之间的按位与运算，它对应于十进制的255或二进制的11111111。</p><p><strong>通过执行这个按位与运算，我们确保只保留了整数值的最低8位，有效地丢弃了任何更高阶的位。因此，（value &amp; 0xFF）的结果值表示了一个0到255范围内的无符号字节。此外，这个得到的无符号_byte_值然后使用（byte）强制转换为byte数据类型，以兼容Java的byte类型。</strong></p><p>随后，在获得这个字节表示后，我们使用_Byte.toUnsignedInt()_方法正确地将其解释为无符号值。</p><h2 id="_3-使用-bytebuffer" tabindex="-1"><a class="header-anchor" href="#_3-使用-bytebuffer"><span>3. 使用_ByteBuffer_</span></a></h2><p>另一种方法是使用_ByteBuffer_类将int转换为_byte_数组，然后提取_byte_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenIntInRange_whenUsingByteBuffer_thenConvertToUnsignedByte</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> value <span class="token operator">=</span> <span class="token number">200</span><span class="token punctuation">;</span>
    <span class="token class-name">ByteBuffer</span> buffer <span class="token operator">=</span> <span class="token class-name">ByteBuffer</span><span class="token punctuation">.</span><span class="token function">allocate</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">putInt</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">byte</span> unsignedByte <span class="token operator">=</span> buffer<span class="token punctuation">.</span><span class="token function">array</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span>value<span class="token punctuation">,</span> <span class="token class-name">Byte</span><span class="token punctuation">.</span><span class="token function">toUnsignedInt</span><span class="token punctuation">(</span>unsignedByte<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里，我们分配了一个4字节的_ByteBuffer_来存储整数值。然后，我们使用_putInt(value)_方法将整数存储在缓冲区中。由于_buffer_默认以大端序存储值，我们需要的最低有效字节（我们所需的）是缓冲区中的第四个字节（索引3）。</p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>总之，虽然Java缺少无符号_byte_类型，但使用类型转换结合位掩码或使用_ByteBuffer_等技术提供了将int转换为无符号_byte_的有效手段，这对于需要表示0到255值的场景至关重要。</p><p>如往常一样，本文的完整代码示例可以在GitHub上找到。</p>`,17),o=[p];function c(i,l){return s(),a("div",null,o)}const d=n(e,[["render",c],["__file","Java中将int转换为无符号字节.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/Archive/Java%E4%B8%AD%E5%B0%86int%E8%BD%AC%E6%8D%A2%E4%B8%BA%E6%97%A0%E7%AC%A6%E5%8F%B7%E5%AD%97%E8%8A%82.html","title":"Java中将int转换为无符号字节","lang":"zh-CN","frontmatter":{"date":"2024-06-18T00:00:00.000Z","category":["Java","编程"],"tag":["Java","转换","无符号字节"],"head":[["meta",{"name":"keywords","content":"Java, 转换, 无符号字节, 位掩码, ByteBuffer"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/Java%E4%B8%AD%E5%B0%86int%E8%BD%AC%E6%8D%A2%E4%B8%BA%E6%97%A0%E7%AC%A6%E5%8F%B7%E5%AD%97%E8%8A%82.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中将int转换为无符号字节"}],["meta",{"property":"og:description","content":"Java中将int转换为无符号字节 1. 引言 在Java中，_byte_类型是一个有符号的8位整数。这意味着它可以存储-128到127之间的值。然而，在某些情况下，我们可能需要将_bytes_作为无符号数来处理，表示0到255的值。这在处理二进制数据、网络和文件I/O时尤为重要，因为无符号字节很常见。 在本教程中，我们将探讨将_int_转换为无符号_..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"转换"}],["meta",{"property":"article:tag","content":"无符号字节"}],["meta",{"property":"article:published_time","content":"2024-06-18T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中将int转换为无符号字节\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-18T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中将int转换为无符号字节 1. 引言 在Java中，_byte_类型是一个有符号的8位整数。这意味着它可以存储-128到127之间的值。然而，在某些情况下，我们可能需要将_bytes_作为无符号数来处理，表示0到255的值。这在处理二进制数据、网络和文件I/O时尤为重要，因为无符号字节很常见。 在本教程中，我们将探讨将_int_转换为无符号_..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 使用类型转换和位掩码","slug":"_2-使用类型转换和位掩码","link":"#_2-使用类型转换和位掩码","children":[]},{"level":2,"title":"3. 使用_ByteBuffer_","slug":"_3-使用-bytebuffer","link":"#_3-使用-bytebuffer","children":[]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":2.21,"words":664},"filePathRelative":"posts/baeldung/Archive/Java中将int转换为无符号字节.md","localizedDate":"2024年6月18日","excerpt":"\\n<h2>1. 引言</h2>\\n<p>在Java中，_byte_类型是一个有符号的8位整数。这意味着它可以存储-128到127之间的值。然而，在某些情况下，我们可能需要将_bytes_作为无符号数来处理，表示0到255的值。这在处理二进制数据、网络和文件I/O时尤为重要，因为无符号字节很常见。</p>\\n<p><strong>在本教程中，我们将探讨将_int_转换为无符号_byte_的两种方法。</strong></p>\\n<h2>2. 使用类型转换和位掩码</h2>\\n<p>最常见的方法是使用类型转换结合位掩码。让我们探索实现方式：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">int</span> value <span class=\\"token operator\\">=</span> <span class=\\"token number\\">200</span><span class=\\"token punctuation\\">;</span>\\n\\n<span class=\\"token annotation punctuation\\">@Test</span>\\n<span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">void</span> <span class=\\"token function\\">givenInt_whenUsingTypeCastingAndBitMasking_thenConvertToUnsignedByte</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">byte</span> unsignedByte <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">byte</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">(</span>value <span class=\\"token operator\\">&amp;</span> <span class=\\"token number\\">0xFF</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\n    <span class=\\"token function\\">assertEquals</span><span class=\\"token punctuation\\">(</span>value<span class=\\"token punctuation\\">,</span> <span class=\\"token class-name\\">Byte</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">toUnsignedInt</span><span class=\\"token punctuation\\">(</span>unsignedByte<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{d as comp,k as data};
