import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as t}from"./app-c243dxVF.js";const e={},p=t(`<h1 id="如何在java中将字节数组转换为字符数组" tabindex="-1"><a class="header-anchor" href="#如何在java中将字节数组转换为字符数组"><span>如何在Java中将字节数组转换为字符数组</span></a></h1><p>将字节转换为Java中的字符数组涉及到将字节序列转换为其对应的字符数组。具体来说，字节代表原始数据，而字符是Unicode表示，允许文本操作。</p><p><strong>在本教程中，我们将探索执行此转换的不同方法。</strong></p><h2 id="_2-使用-standardcharsets-和-string-类" tabindex="-1"><a class="header-anchor" href="#_2-使用-standardcharsets-和-string-类"><span>2. 使用_StandardCharsets_和_String_类</span></a></h2><p><em>String_类提供了一种使用特定字符编码将字节转换为字符数组的直接方法。让我们考虑以下字节数组_byteArray_及其对应的字符数组_expectedCharArray</em>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>byte[] byteArray = {65, 66, 67, 68};
char[] expectedCharArray = {&#39;A&#39;, &#39;B&#39;, &#39;C&#39;, &#39;D&#39;};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>_String_类的_getBytes()_方法在此转换中如下所示：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenByteArray_WhenUsingStandardCharsets_thenConvertToCharArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span> charArray <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span>byteArray<span class="token punctuation">,</span> <span class="token class-name">StandardCharsets</span><span class="token punctuation">.</span><span class="token constant">UTF_8</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toCharArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertArrayEquals</span><span class="token punctuation">(</span>expectedCharArray<span class="token punctuation">,</span> charArray<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们使用_String_类的构造函数初始化一个新的_charArray_，它接受字节数组和指定的字符编码_StandardCharsets.UTF_8_作为参数。</p><p><strong>然后我们使用_toCharArray()_方法将结果字符串转换为字符数组。</strong> 最后，我们使用断言验证结果_charArray_与_expectedCharArray_的等同性。</p><h2 id="_3-使用-inputstreamreader-和-bytearrayoutputstream" tabindex="-1"><a class="header-anchor" href="#_3-使用-inputstreamreader-和-bytearrayoutputstream"><span>3. 使用_InputStreamReader_和_ByteArrayOutputStream_</span></a></h2><p>另外，我们可以使用_InputStreamReader_和_ByteArrayOutputStream_类通过读取字节并将它们转换为字符来完成转换任务：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenByteArray_WhenUsingSUsingStreams_thenConvertToCharArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token class-name">ByteArrayInputStream</span> inputStream <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ByteArrayInputStream</span><span class="token punctuation">(</span>byteArray<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">InputStreamReader</span> reader <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">InputStreamReader</span><span class="token punctuation">(</span>inputStream<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">ByteArrayOutputStream</span> outputStream <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ByteArrayOutputStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> data<span class="token punctuation">;</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>data <span class="token operator">=</span> reader<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">char</span> ch <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">char</span><span class="token punctuation">)</span> data<span class="token punctuation">;</span>
        outputStream<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>ch<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span> charArray <span class="token operator">=</span> outputStream<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toCharArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertArrayEquals</span><span class="token punctuation">(</span>expectedCharArray<span class="token punctuation">,</span> charArray<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>在这里，我们使用一个while循环，其中从_InputStreamReader_读取的每个字节都被读取，转换为字符，然后写入_outputStream_。在此积累之后，我们对_outputStream_应用_toString()_方法将累积的字符转换为字符串。</strong></p><p>最后，结果字符串使用_toCharArray()_方法转换为字符数组。</p><h2 id="_4-使用-charbuffer-和-bytebuffer" tabindex="-1"><a class="header-anchor" href="#_4-使用-charbuffer-和-bytebuffer"><span>4. 使用_CharBuffer_和_ByteBuffer_</span></a></h2><p>Java中将字节数组转换为字符数组的另一种方法涉及使用_CharBuffer_和_ByteBuffer_类。此外，这种方法使用_Charset_类进行编码和解码操作：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenByteArray_WhenUsingCharBuffer_thenConvertToCharArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">ByteBuffer</span> byteBuffer <span class="token operator">=</span> <span class="token class-name">ByteBuffer</span><span class="token punctuation">.</span><span class="token function">wrap</span><span class="token punctuation">(</span>byteArray<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">CharBuffer</span> charBuffer <span class="token operator">=</span> <span class="token class-name">StandardCharsets</span><span class="token punctuation">.</span><span class="token constant">UTF_8</span><span class="token punctuation">.</span><span class="token function">decode</span><span class="token punctuation">(</span>byteBuffer<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span> charArray <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">char</span><span class="token punctuation">[</span>charBuffer<span class="token punctuation">.</span><span class="token function">remaining</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    charBuffer<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>charArray<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertArrayEquals</span><span class="token punctuation">(</span>expectedCharArray<span class="token punctuation">,</span> charArray<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上述方法中，我们首先将字节数组包装在_ByteBuffer_中。随后，我们通过使用UTF-8字符集解码字节缓冲区来创建_CharBuffer_。</p><p><strong>此外，我们使用_CharBuffer.remaining()_方法确定从剩余字符中字符数组的大小。</strong> 然后，字符从_CharBuffer_中检索出来，并使用_CharBuffer.get()_方法存储在_charArray_中。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>总之，在Java中将字节数组转换为字符数组在管理各种数据操作任务时是必不可少的。此外，根据要求使用适当的方法确保有效处理和转换数据，促进Java应用程序中的无缝操作。</p><p>如常，本文的完整代码示例可以在GitHub上找到。</p>`,23),r=[p];function o(c,i){return s(),n("div",null,r)}const d=a(e,[["render",o],["__file","2024-06-26-How to Convert Byte Array to Char Array.html.vue"]]),k=JSON.parse(`{"path":"/posts/baeldung/2024-06-26/2024-06-26-How%20to%20Convert%20Byte%20Array%20to%20Char%20Array.html","title":"如何在Java中将字节数组转换为字符数组","lang":"zh-CN","frontmatter":{"date":"2024-06-27T00:00:00.000Z","category":["Java","编程"],"tag":["字节数组","字符数组"],"head":[["meta",{"name":"keywords","content":"Java, 字节数组, 字符数组, 转换"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-26/2024-06-26-How%20to%20Convert%20Byte%20Array%20to%20Char%20Array.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"如何在Java中将字节数组转换为字符数组"}],["meta",{"property":"og:description","content":"如何在Java中将字节数组转换为字符数组 将字节转换为Java中的字符数组涉及到将字节序列转换为其对应的字符数组。具体来说，字节代表原始数据，而字符是Unicode表示，允许文本操作。 在本教程中，我们将探索执行此转换的不同方法。 2. 使用_StandardCharsets_和_String_类 String_类提供了一种使用特定字符编码将字节转换为..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-26T17:29:21.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"字节数组"}],["meta",{"property":"article:tag","content":"字符数组"}],["meta",{"property":"article:published_time","content":"2024-06-27T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-26T17:29:21.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"如何在Java中将字节数组转换为字符数组\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-27T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-26T17:29:21.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"如何在Java中将字节数组转换为字符数组 将字节转换为Java中的字符数组涉及到将字节序列转换为其对应的字符数组。具体来说，字节代表原始数据，而字符是Unicode表示，允许文本操作。 在本教程中，我们将探索执行此转换的不同方法。 2. 使用_StandardCharsets_和_String_类 String_类提供了一种使用特定字符编码将字节转换为..."},"headers":[{"level":2,"title":"2. 使用_StandardCharsets_和_String_类","slug":"_2-使用-standardcharsets-和-string-类","link":"#_2-使用-standardcharsets-和-string-类","children":[]},{"level":2,"title":"3. 使用_InputStreamReader_和_ByteArrayOutputStream_","slug":"_3-使用-inputstreamreader-和-bytearrayoutputstream","link":"#_3-使用-inputstreamreader-和-bytearrayoutputstream","children":[]},{"level":2,"title":"4. 使用_CharBuffer_和_ByteBuffer_","slug":"_4-使用-charbuffer-和-bytebuffer","link":"#_4-使用-charbuffer-和-bytebuffer","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1719422961000,"updatedTime":1719422961000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.45,"words":736},"filePathRelative":"posts/baeldung/2024-06-26/2024-06-26-How to Convert Byte Array to Char Array.md","localizedDate":"2024年6月27日","excerpt":"\\n<p>将字节转换为Java中的字符数组涉及到将字节序列转换为其对应的字符数组。具体来说，字节代表原始数据，而字符是Unicode表示，允许文本操作。</p>\\n<p><strong>在本教程中，我们将探索执行此转换的不同方法。</strong></p>\\n<h2>2. 使用_StandardCharsets_和_String_类</h2>\\n<p><em>String_类提供了一种使用特定字符编码将字节转换为字符数组的直接方法。让我们考虑以下字节数组_byteArray_及其对应的字符数组_expectedCharArray</em>：</p>\\n<div class=\\"language-text\\" data-ext=\\"text\\" data-title=\\"text\\"><pre class=\\"language-text\\"><code>byte[] byteArray = {65, 66, 67, 68};\\nchar[] expectedCharArray = {'A', 'B', 'C', 'D'};\\n</code></pre></div>","autoDesc":true}`);export{d as comp,k as data};
