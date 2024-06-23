import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as t}from"./app-2DYvpUCK.js";const e={},p=t(`<h1 id="java中将short转换为byte-的几种方法" tabindex="-1"><a class="header-anchor" href="#java中将short转换为byte-的几种方法"><span>Java中将short转换为byte[]的几种方法</span></a></h1><p>将short值转换为byte[]数组是Java编程中的一项常见任务，特别是在处理二进制数据或网络通信时。</p><p>在本教程中，我们将探索实现这种转换的不同方法。</p><h3 id="_2-使用bytebuffer类-java-nio" tabindex="-1"><a class="header-anchor" href="#_2-使用bytebuffer类-java-nio"><span>2. 使用ByteBuffer类（Java NIO）</span></a></h3><p>Java NIO包提供了ByteBuffer类，它简化了将原始数据类型转换为字节数组的过程。让我们看看如何使用它将short值转换为byte[]数组：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">short</span> shortValue <span class="token operator">=</span> <span class="token number">12345</span><span class="token punctuation">;</span>
<span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> expectedByteArray <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token number">48</span><span class="token punctuation">,</span> <span class="token number">57</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenShort_whenUsingByteBuffer_thenConvertToByteArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">ByteBuffer</span> buffer <span class="token operator">=</span> <span class="token class-name">ByteBuffer</span><span class="token punctuation">.</span><span class="token function">allocate</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    buffer<span class="token punctuation">.</span><span class="token function">putShort</span><span class="token punctuation">(</span>shortValue<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> byteArray <span class="token operator">=</span> buffer<span class="token punctuation">.</span><span class="token function">array</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertArrayEquals</span><span class="token punctuation">(</span>expectedByteArray<span class="token punctuation">,</span> byteArray<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这种方法中，我们使用allocate()方法分配一个容量为2字节的ByteBuffer来容纳shortValue。接下来，我们使用putShort()方法将shortValue的二进制表示写入buffer对象。这个操作的结果是buffer包含了shortValue的字节表示。</p><p>然后我们使用array()方法从buffer中提取名为byteArray的字节数组，该方法检索存储的short值对应的字节数组。</p><p>最后，我们使用assertArrayEquals()方法确保byteArray与expectedByteArray匹配，以确保转换过程的准确性。</p><h3 id="_3-使用dataoutputstream类" tabindex="-1"><a class="header-anchor" href="#_3-使用dataoutputstream类"><span>3. 使用DataOutputStream类</span></a></h3><p>另一种方法是使用DataOutputStream类，它提供了一种有效的方式来完成转换过程。让我们看看如何实现这种方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenShort_whenUsingDataOutputStream_thenConvertToByteArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token class-name">ByteArrayOutputStream</span> baos <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ByteArrayOutputStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">DataOutputStream</span> dos <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DataOutputStream</span><span class="token punctuation">(</span>baos<span class="token punctuation">)</span><span class="token punctuation">;</span>
    dos<span class="token punctuation">.</span><span class="token function">writeShort</span><span class="token punctuation">(</span>shortValue<span class="token punctuation">)</span><span class="token punctuation">;</span>
    dos<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> byteArray <span class="token operator">=</span> baos<span class="token punctuation">.</span><span class="token function">toByteArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertArrayEquals</span><span class="token punctuation">(</span>expectedByteArray<span class="token punctuation">,</span> byteArray<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个测试方法中，我们首先使用DataOutputStream类将short值写入名为baos的ByteArrayOutputStream对象。</p><p>此外，我们调用writeShort()方法将shortValue序列化为代表其二进制形式的两个字节。随后，我们使用toByteArray()方法从baos中检索生成的字节数组。</p><h3 id="_4-手动位操作" tabindex="-1"><a class="header-anchor" href="#_4-手动位操作"><span>4. 手动位操作</span></a></h3><p>这种方法通过显式地操作short值的位来有效地将short值转换为字节数组，将最高有效字节（MSB）和最低有效字节（LSB）组件分别隔离并存储在字节数组的相应位置。</p><p>让我们深入实现：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenShort_whenUsingManualBitManipulation_thenConvertToByteArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> byteArray <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    byteArray<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">byte</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>shortValue <span class="token operator">&gt;&gt;</span> <span class="token number">8</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    byteArray<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">byte</span><span class="token punctuation">)</span> shortValue<span class="token punctuation">;</span>

    <span class="token function">assertArrayEquals</span><span class="token punctuation">(</span>expectedByteArray<span class="token punctuation">,</span> byteArray<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们首先通过将shortValue右移8位（shortValue &gt;&gt; 8）来提取MSB，并将结果转换为一个字节以存储在byteArray[0]中。类似地，shortValue的最低有效字节（LSB）是通过直接将其转换为一个字节，然后存储在byteArray[1]中获得的。</p><h3 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h3><p>总之，在Java中掌握将short值转换为byte[]数组的技巧对于各种任务至关重要。因此，我们探索了不同的方法，例如使用Java NIO中的ByteBuffer，手动位操作，或利用DataOutputStream。</p><p>如常，本文的完整代码示例可以在GitHub上找到。</p><p>文章发布后30天内开放评论。对于此日期之后的问题，请使用网站上的联系表单。翻译已经完成，以下是翻译的完整内容：</p><hr><p>date: 2024-06-16 category:</p><ul><li>Java</li><li>编程 tag:</li><li>Java NIO</li><li>ByteBuffer</li><li>DataOutputStream</li><li>位操作</li></ul><hr><h1 id="java中将short转换为byte-的几种方法-1" tabindex="-1"><a class="header-anchor" href="#java中将short转换为byte-的几种方法-1"><span>Java中将short转换为byte[]的几种方法</span></a></h1><p>将short值转换为byte[]数组是Java编程中的一项常见任务，特别是在处理二进制数据或网络通信时。</p><p>在本教程中，我们将探索实现这种转换的不同方法。</p><h3 id="_2-使用bytebuffer类-java-nio-1" tabindex="-1"><a class="header-anchor" href="#_2-使用bytebuffer类-java-nio-1"><span>2. 使用ByteBuffer类（Java NIO）</span></a></h3><p>Java NIO包提供了ByteBuffer类，它简化了将原始数据类型转换为字节数组的过程。让我们看看如何使用它将short值转换为byte[]数组：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">short</span> shortValue <span class="token operator">=</span> <span class="token number">12345</span><span class="token punctuation">;</span>
<span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> expectedByteArray <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token number">48</span><span class="token punctuation">,</span> <span class="token number">57</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenShort_whenUsingByteBuffer_thenConvertToByteArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">ByteBuffer</span> buffer <span class="token operator">=</span> <span class="token class-name">ByteBuffer</span><span class="token punctuation">.</span><span class="token function">allocate</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    buffer<span class="token punctuation">.</span><span class="token function">putShort</span><span class="token punctuation">(</span>shortValue<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> byteArray <span class="token operator">=</span> buffer<span class="token punctuation">.</span><span class="token function">array</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertArrayEquals</span><span class="token punctuation">(</span>expectedByteArray<span class="token punctuation">,</span> byteArray<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这种方法中，我们使用allocate()方法分配一个容量为2字节的ByteBuffer来容纳shortValue。接下来，我们使用putShort()方法将shortValue的二进制表示写入buffer对象。这个操作的结果是buffer包含了shortValue的字节表示。</p><p>然后我们使用array()方法从buffer中提取名为byteArray的字节数组，该方法检索存储的short值对应的字节数组。</p><p>最后，我们使用assertArrayEquals()方法确保byteArray与expectedByteArray匹配，以确保转换过程的准确性。</p><h3 id="_3-使用dataoutputstream类-1" tabindex="-1"><a class="header-anchor" href="#_3-使用dataoutputstream类-1"><span>3. 使用DataOutputStream类</span></a></h3><p>另一种方法是使用DataOutputStream类，它提供了一种有效的方式来完成转换过程。让我们看看如何实现这种方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenShort_whenUsingDataOutputStream_thenConvertToByteArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token class-name">ByteArrayOutputStream</span> baos <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ByteArrayOutputStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">DataOutputStream</span> dos <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DataOutputStream</span><span class="token punctuation">(</span>baos<span class="token punctuation">)</span><span class="token punctuation">;</span>
    dos<span class="token punctuation">.</span><span class="token function">writeShort</span><span class="token punctuation">(</span>shortValue<span class="token punctuation">)</span><span class="token punctuation">;</span>
    dos<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> byteArray <span class="token operator">=</span> baos<span class="token punctuation">.</span><span class="token function">toByteArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertArrayEquals</span><span class="token punctuation">(</span>expectedByteArray<span class="token punctuation">,</span> byteArray<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个测试方法中，我们首先使用DataOutputStream类将short值写入名为baos的ByteArrayOutputStream对象。</p><p>此外，我们调用writeShort()方法将shortValue序列化为代表其二进制形式的两个字节。随后，我们使用toByteArray()方法从baos中检索生成的字节数组。</p><h3 id="_4-手动位操作-1" tabindex="-1"><a class="header-anchor" href="#_4-手动位操作-1"><span>4. 手动位操作</span></a></h3><p>这种方法通过显式地操作short值的位来有效地将short值转换为字节数组，将最高有效字节（MSB）和最低有效字节（LSB）组件分别隔离并存储在字节数组的相应位置。</p><p>让我们深入实现：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenShort_whenUsingManualBitManipulation_thenConvertToByteArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> byteArray <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    byteArray<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">byte</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>shortValue <span class="token operator">&gt;&gt;</span> <span class="token number">8</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    byteArray<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">byte</span><span class="token punctuation">)</span> shortValue<span class="token punctuation">;</span>

    <span class="token function">assertArrayEquals</span><span class="token punctuation">(</span>expectedByteArray<span class="token punctuation">,</span> byteArray<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们首先通过将shortValue右移8位（shortValue &gt;&gt; 8）来提取MSB，并将结果转换为一个字节以存储在byteArray[0]中。类似地，shortValue的最低有效字节（LSB）是通过直接将其转换为一个字节，然后存储在byteArray[1]中获得的。</p><h3 id="_5-结论-1" tabindex="-1"><a class="header-anchor" href="#_5-结论-1"><span>5. 结论</span></a></h3><p>总之，在Java中掌握将short值转换为byte[]数组的技巧对于各种任务至关重要。因此，我们探索了不同的方法，例如使用Java NIO中的ByteBuffer，手动位操作，或利用DataOutputStream。</p><p>如常，本文的完整代码示例可以在GitHub上找到。</p><p>文章发布后30天内开放评论。对于此日期之后的问题，请使用网站上的联系表单。</p><p>OK</p>`,51),o=[p];function c(u,l){return s(),n("div",null,o)}const k=a(e,[["render",c],["__file","Converting short to byte   in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/Archive/Converting%20short%20to%20byte%20%20%20in%20Java.html","title":"Java中将short转换为byte[]的几种方法","lang":"zh-CN","frontmatter":{"date":"2024-06-16T00:00:00.000Z","category":["Java","编程"],"tag":["Java NIO","ByteBuffer","DataOutputStream","位操作"],"description":"Java中将short转换为byte[]的几种方法 将short值转换为byte[]数组是Java编程中的一项常见任务，特别是在处理二进制数据或网络通信时。 在本教程中，我们将探索实现这种转换的不同方法。 2. 使用ByteBuffer类（Java NIO） Java NIO包提供了ByteBuffer类，它简化了将原始数据类型转换为字节数组的过程。让...","head":[["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/Converting%20short%20to%20byte%20%20%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中将short转换为byte[]的几种方法"}],["meta",{"property":"og:description","content":"Java中将short转换为byte[]的几种方法 将short值转换为byte[]数组是Java编程中的一项常见任务，特别是在处理二进制数据或网络通信时。 在本教程中，我们将探索实现这种转换的不同方法。 2. 使用ByteBuffer类（Java NIO） Java NIO包提供了ByteBuffer类，它简化了将原始数据类型转换为字节数组的过程。让..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java NIO"}],["meta",{"property":"article:tag","content":"ByteBuffer"}],["meta",{"property":"article:tag","content":"DataOutputStream"}],["meta",{"property":"article:tag","content":"位操作"}],["meta",{"property":"article:published_time","content":"2024-06-16T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中将short转换为byte[]的几种方法\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-16T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]]},"headers":[{"level":3,"title":"2. 使用ByteBuffer类（Java NIO）","slug":"_2-使用bytebuffer类-java-nio","link":"#_2-使用bytebuffer类-java-nio","children":[]},{"level":3,"title":"3. 使用DataOutputStream类","slug":"_3-使用dataoutputstream类","link":"#_3-使用dataoutputstream类","children":[]},{"level":3,"title":"4. 手动位操作","slug":"_4-手动位操作","link":"#_4-手动位操作","children":[]},{"level":3,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]},{"level":3,"title":"2. 使用ByteBuffer类（Java NIO）","slug":"_2-使用bytebuffer类-java-nio-1","link":"#_2-使用bytebuffer类-java-nio-1","children":[]},{"level":3,"title":"3. 使用DataOutputStream类","slug":"_3-使用dataoutputstream类-1","link":"#_3-使用dataoutputstream类-1","children":[]},{"level":3,"title":"4. 手动位操作","slug":"_4-手动位操作-1","link":"#_4-手动位操作-1","children":[]},{"level":3,"title":"5. 结论","slug":"_5-结论-1","link":"#_5-结论-1","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":4.98,"words":1495},"filePathRelative":"posts/baeldung/Archive/Converting short to byte   in Java.md","localizedDate":"2024年6月16日","excerpt":"\\n<p>将short值转换为byte[]数组是Java编程中的一项常见任务，特别是在处理二进制数据或网络通信时。</p>\\n<p>在本教程中，我们将探索实现这种转换的不同方法。</p>\\n<h3>2. 使用ByteBuffer类（Java NIO）</h3>\\n<p>Java NIO包提供了ByteBuffer类，它简化了将原始数据类型转换为字节数组的过程。让我们看看如何使用它将short值转换为byte[]数组：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">short</span> shortValue <span class=\\"token operator\\">=</span> <span class=\\"token number\\">12345</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">byte</span><span class=\\"token punctuation\\">[</span><span class=\\"token punctuation\\">]</span> expectedByteArray <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">{</span><span class=\\"token number\\">48</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">57</span><span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>\\n\\n<span class=\\"token annotation punctuation\\">@Test</span>\\n<span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">void</span> <span class=\\"token function\\">givenShort_whenUsingByteBuffer_thenConvertToByteArray</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token class-name\\">ByteBuffer</span> buffer <span class=\\"token operator\\">=</span> <span class=\\"token class-name\\">ByteBuffer</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">allocate</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">2</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    buffer<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">putShort</span><span class=\\"token punctuation\\">(</span>shortValue<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">byte</span><span class=\\"token punctuation\\">[</span><span class=\\"token punctuation\\">]</span> byteArray <span class=\\"token operator\\">=</span> buffer<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">array</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\n    <span class=\\"token function\\">assertArrayEquals</span><span class=\\"token punctuation\\">(</span>expectedByteArray<span class=\\"token punctuation\\">,</span> byteArray<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{k as comp,d as data};
