import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-C3EhKTFl.js";const p={},e=t(`<h1 id="使用gzip压缩并创建字节数组" tabindex="-1"><a class="header-anchor" href="#使用gzip压缩并创建字节数组"><span>使用GZip压缩并创建字节数组</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p><strong>GZIP格式是一种用于数据压缩的文件格式</strong>。Java语言中的_GZipInputStream_和_GZipOutputStream_类实现了这种文件格式。</p><p>在本教程中，我们将学习如何在Java中使用GZIP压缩数据。同时，我们还将探讨如何将压缩后的数据写入字节数组。</p><h2 id="_2-gzipoutputstream-类" tabindex="-1"><a class="header-anchor" href="#_2-gzipoutputstream-类"><span>2. _GZipOutputStream_类</span></a></h2><p>_GZipOutputStream_类将数据压缩并写入底层输出流。</p><h3 id="_2-1-对象实例化" tabindex="-1"><a class="header-anchor" href="#_2-1-对象实例化"><span>2.1. 对象实例化</span></a></h3><p><strong>我们可以使用构造函数来创建类的实例</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">ByteArrayOutputStream</span> os <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ByteArrayOutputStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">GZIPOutputStream</span> gzipOs <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">GZIPOutputStream</span><span class="token punctuation">(</span>os<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们将一个_ByteArrayOutputStream_对象传递给构造函数。因此，我们稍后可以使用_toByteArray()_方法获得压缩后的数据字节数组。</p><p>除了_ByteArrayOutputStream_，我们还可以提供其他_OutputSteam_实例：</p><ul><li><em>FileOutputStream</em>：将数据存储在文件中</li><li><em>ServletOutputStream</em>：通过网络传输数据</li></ul><p>在这两种情况下，数据在到达时被发送到其目的地。</p><h3 id="_2-2-压缩数据" tabindex="-1"><a class="header-anchor" href="#_2-2-压缩数据"><span>2.2. 压缩数据</span></a></h3><p><strong>_write()_方法执行数据压缩</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> buffer <span class="token operator">=</span> <span class="token string">&quot;Sample Text&quot;</span><span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
gzipOs<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>buffer<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> buffer<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>_write()_方法压缩_buffer_字节数组的内容，并将其写入包装的输出流。</p><p><strong>除了_buffer_字节数组外，_write()_还包括另外两个参数，<em>offset_和_length</em></strong>。这些定义了字节数组内部的字节范围。因此，我们可以使用它们来指定要写入的字节范围，而不是整个_buffer_。</p><p>最后，为了完成数据压缩，我们调用_close()_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>gzipOs<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>_close()_方法写入所有剩余数据并关闭流</strong>。因此，重要的是要调用_close()_，否则我们会丢失数据。</p><h2 id="_3-获取压缩数据的字节数组" tabindex="-1"><a class="header-anchor" href="#_3-获取压缩数据的字节数组"><span>3. 获取压缩数据的字节数组</span></a></h2><p><strong>我们将创建一个使用GZIP压缩数据的实用方法</strong>。我们还将看到如何获得包含压缩数据的字节数组。</p><h3 id="_3-1-压缩数据" tabindex="-1"><a class="header-anchor" href="#_3-1-压缩数据"><span>3.1. 压缩数据</span></a></h3><p><strong>让我们创建一个在GZIP格式下压缩数据的_gzip()_方法</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">int</span> <span class="token constant">BUFFER_SIZE</span> <span class="token operator">=</span> <span class="token number">512</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">gzip</span><span class="token punctuation">(</span><span class="token class-name">InputStream</span> is<span class="token punctuation">,</span> <span class="token class-name">OutputStream</span> os<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token class-name">GZIPOutputStream</span> gzipOs <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">GZIPOutputStream</span><span class="token punctuation">(</span>os<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> buffer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token constant">BUFFER_SIZE</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> bytesRead <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>bytesRead <span class="token operator">=</span> is<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span>buffer<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        gzipOs<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>buffer<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> bytesRead<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    gzipOs<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上述方法中，首先，我们创建一个新的_GZIPOutputStream_实例。然后，我们开始从_is_输入流复制数据，使用_buffer_字节数组。</p><p>值得注意的是，我们继续读取字节，直到我们得到_-1_的返回值。<strong><em>read()<em>方法在到达流的末尾时返回</em>-1</em></strong>。</p><h3 id="_3-2-获取包含压缩数据的字节数组" tabindex="-1"><a class="header-anchor" href="#_3-2-获取包含压缩数据的字节数组"><span>3.2. 获取包含压缩数据的字节数组</span></a></h3><p><strong>让我们压缩一个字符串，并将结果写入字节数组</strong>。我们将使用我们之前创建的_gzip()_方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> payload <span class="token operator">=</span> <span class="token string">&quot;This is a sample text to test the gzip method. Have a nice day!&quot;</span><span class="token punctuation">;</span>
<span class="token class-name">ByteArrayOutputStream</span> os <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ByteArrayOutputStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">gzip</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">ByteArrayInputStream</span><span class="token punctuation">(</span>payload<span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span> os<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> compressed <span class="token operator">=</span> os<span class="token punctuation">.</span><span class="token function">toByteArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们为_gzip()<em>方法提供输入和输出流。我们将_payload_值包装在一个_ByteArrayInputStream_对象中。之后，我们创建一个空的_ByteArrayOutputStream</em>，_gzip()_将压缩后的数据写入其中。</p><p>最后，在调用_gzip()_之后，我们使用_toByteArray()_方法获得压缩数据。</p><h2 id="_4-测试" tabindex="-1"><a class="header-anchor" href="#_4-测试"><span>4. 测试</span></a></h2><p>在测试我们的代码之前，让我们将_gzip()_方法添加到_GZip_类中。<strong>现在，我们已经准备好用单元测试来测试我们的代码</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenCompressingUsingGZip_thenGetCompressedByteArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> payload <span class="token operator">=</span> <span class="token string">&quot;This is a sample text to test method gzip. The gzip algorithm will compress this string. &quot;</span>
        <span class="token operator">+</span> <span class="token string">&quot;The result will be smaller than this string.&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">ByteArrayOutputStream</span> os <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ByteArrayOutputStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">GZip</span><span class="token punctuation">.</span><span class="token function">gzip</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">ByteArrayInputStream</span><span class="token punctuation">(</span>payload<span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span> os<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> compressed <span class="token operator">=</span> os<span class="token punctuation">.</span><span class="token function">toByteArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertTrue</span><span class="token punctuation">(</span>payload<span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>length <span class="token operator">&gt;</span> compressed<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;1f&quot;</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token function">toHexString</span><span class="token punctuation">(</span>compressed<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">&amp;</span> <span class="token number">0xFF</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;8b&quot;</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token function">toHexString</span><span class="token punctuation">(</span>compressed<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">&amp;</span> <span class="token number">0xFF</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个测试中，我们压缩了一个字符串值。<strong>我们将字符串转换为_ByteArrayInputStream_并提供给_gzip()_方法</strong>。同时，<strong>输出数据被写入_ByteArrayOutputStream_</strong>。</p><p>此外，如果两个条件都为真，测试就成功：</p><ol><li>压缩后的数据大小小于未压缩的</li><li>压缩字节数组以_1f 8b_值开始。</li></ol><p>关于第二个条件，<strong>GZIP文件以固定值_1f 8b_开始，以符合GZIP文件格式</strong>。</p><p>因此，如果我们运行单元测试，我们将验证这两个条件是否都为真。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，<strong>我们学习了在使用Java语言中的GZIP文件格式时如何获取字节数组中的压缩数据</strong>。为此，我们创建了一个压缩的实用方法。最后，我们测试了我们的代码。</p><p>和往常一样，我们示例的完整源代码可以在GitHub上找到。</p><p>评论在文章发布后30天内开放。对于超过此日期的任何问题，请使用网站上的联系表单。</p>`,45),o=[e];function c(l,i){return s(),a("div",null,o)}const k=n(p,[["render",c],["__file","Compress and Create a Byte Array Using GZip.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/Archive/Compress%20and%20Create%20a%20Byte%20Array%20Using%20GZip.html","title":"使用GZip压缩并创建字节数组","lang":"zh-CN","frontmatter":{"date":"2024-06-18T00:00:00.000Z","category":["Java","GZIP"],"tag":["数据压缩","Java GZIP"],"head":[["meta",{"name":"keywords","content":"Java, GZIP, 数据压缩, 字节数组"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/Compress%20and%20Create%20a%20Byte%20Array%20Using%20GZip.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用GZip压缩并创建字节数组"}],["meta",{"property":"og:description","content":"使用GZip压缩并创建字节数组 1. 概述 GZIP格式是一种用于数据压缩的文件格式。Java语言中的_GZipInputStream_和_GZipOutputStream_类实现了这种文件格式。 在本教程中，我们将学习如何在Java中使用GZIP压缩数据。同时，我们还将探讨如何将压缩后的数据写入字节数组。 2. _GZipOutputStream_类..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"数据压缩"}],["meta",{"property":"article:tag","content":"Java GZIP"}],["meta",{"property":"article:published_time","content":"2024-06-18T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用GZip压缩并创建字节数组\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-18T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用GZip压缩并创建字节数组 1. 概述 GZIP格式是一种用于数据压缩的文件格式。Java语言中的_GZipInputStream_和_GZipOutputStream_类实现了这种文件格式。 在本教程中，我们将学习如何在Java中使用GZIP压缩数据。同时，我们还将探讨如何将压缩后的数据写入字节数组。 2. _GZipOutputStream_类..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. _GZipOutputStream_类","slug":"_2-gzipoutputstream-类","link":"#_2-gzipoutputstream-类","children":[{"level":3,"title":"2.1. 对象实例化","slug":"_2-1-对象实例化","link":"#_2-1-对象实例化","children":[]},{"level":3,"title":"2.2. 压缩数据","slug":"_2-2-压缩数据","link":"#_2-2-压缩数据","children":[]}]},{"level":2,"title":"3. 获取压缩数据的字节数组","slug":"_3-获取压缩数据的字节数组","link":"#_3-获取压缩数据的字节数组","children":[{"level":3,"title":"3.1. 压缩数据","slug":"_3-1-压缩数据","link":"#_3-1-压缩数据","children":[]},{"level":3,"title":"3.2. 获取包含压缩数据的字节数组","slug":"_3-2-获取包含压缩数据的字节数组","link":"#_3-2-获取包含压缩数据的字节数组","children":[]}]},{"level":2,"title":"4. 测试","slug":"_4-测试","link":"#_4-测试","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":3.93,"words":1179},"filePathRelative":"posts/baeldung/Archive/Compress and Create a Byte Array Using GZip.md","localizedDate":"2024年6月18日","excerpt":"\\n<h2>1. 概述</h2>\\n<p><strong>GZIP格式是一种用于数据压缩的文件格式</strong>。Java语言中的_GZipInputStream_和_GZipOutputStream_类实现了这种文件格式。</p>\\n<p>在本教程中，我们将学习如何在Java中使用GZIP压缩数据。同时，我们还将探讨如何将压缩后的数据写入字节数组。</p>\\n<h2>2. _GZipOutputStream_类</h2>\\n<p>_GZipOutputStream_类将数据压缩并写入底层输出流。</p>\\n<h3>2.1. 对象实例化</h3>\\n<p><strong>我们可以使用构造函数来创建类的实例</strong>：</p>","autoDesc":true}');export{k as comp,d as data};
