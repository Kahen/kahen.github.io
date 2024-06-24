import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-DtXEV2Vi.js";const e={},p=t(`<h1 id="java中使用gzipinputstream逐行读取-gz文件" tabindex="-1"><a class="header-anchor" href="#java中使用gzipinputstream逐行读取-gz文件"><span>Java中使用GZIPInputStream逐行读取.gz文件</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>我们可能希望在Java中使用压缩文件。常见的格式是_.gz_，这是由GZIP实用工具生成的。</p><p><strong>在本教程中，我们将探讨如何使用_Java_中的_GZIPInputStream_类逐行读取压缩的(<em>.gz</em>)文件。</strong></p><h2 id="_2-读取gzipped文件" tabindex="-1"><a class="header-anchor" href="#_2-读取gzipped文件"><span>2. 读取GZipped文件</span></a></h2><p>让我们想象一下，我们想要将文件的内容读入一个_List_。首先，我们需要在我们的路径上找到文件：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> filePath <span class="token operator">=</span> <span class="token class-name">Objects</span><span class="token punctuation">.</span><span class="token function">requireNonNull</span><span class="token punctuation">(</span><span class="token class-name">Main</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">.</span><span class="token function">getClassLoader</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getResource</span><span class="token punctuation">(</span><span class="token string">&quot;myFile.gz&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getFile</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>接下来，让我们准备从这个文件读入一个空列表：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\`\` lines <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">FileInputStream</span> fileInputStream <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileInputStream</span><span class="token punctuation">(</span>filePath<span class="token punctuation">)</span><span class="token punctuation">;</span>
     <span class="token class-name">GZIPInputStream</span> gzipInputStream <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">GZIPInputStream</span><span class="token punctuation">(</span>fileInputStream<span class="token punctuation">)</span><span class="token punctuation">;</span>
     <span class="token class-name">InputStreamReader</span> inputStreamReader <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">InputStreamReader</span><span class="token punctuation">(</span>gzipInputStream<span class="token punctuation">)</span><span class="token punctuation">;</span>
     <span class="token class-name">BufferedReader</span> bufferedReader <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BufferedReader</span><span class="token punctuation">(</span>inputStreamReader<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token comment">//...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在我们的_try-with-resources_块中，我们定义了一个_FileInputStream_对象来读取GZIP文件。然后，我们有一个_GZIPInputStream_，它从GZIP文件中解压缩数据。最后，有一个_BufferedReader_来读取它的行。</p><p>现在，我们可以循环遍历文件逐行读取：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> line<span class="token punctuation">;</span>
<span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>line <span class="token operator">=</span> bufferedReader<span class="token punctuation">.</span><span class="token function">readLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    lines<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>line<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-使用java-stream-api处理大型gzipped文件" tabindex="-1"><a class="header-anchor" href="#_3-使用java-stream-api处理大型gzipped文件"><span>3. 使用Java <em>Stream</em> API处理大型GZipped文件</span></a></h2><p>**面对大型GZIP压缩文件时，我们可能没有足够的内存来加载整个文件。**然而，流式方法允许我们按从流中读取的内容逐行处理。</p><h3 id="_3-1-独立方法" tabindex="-1"><a class="header-anchor" href="#_3-1-独立方法"><span>3.1. 独立方法</span></a></h3><p>让我们构建一个例程，从我们的文件中收集包含特定子字符串的行：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">InputStream</span> inputStream <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileInputStream</span><span class="token punctuation">(</span>filePath<span class="token punctuation">)</span><span class="token punctuation">;</span>
     <span class="token class-name">GZIPInputStream</span> gzipInputStream <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">GZIPInputStream</span><span class="token punctuation">(</span>inputStream<span class="token punctuation">)</span><span class="token punctuation">;</span>
     <span class="token class-name">InputStreamReader</span> inputStreamReader <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">InputStreamReader</span><span class="token punctuation">(</span>gzipInputStream<span class="token punctuation">)</span><span class="token punctuation">;</span>
     <span class="token class-name">BufferedReader</span> bufferedReader <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BufferedReader</span><span class="token punctuation">(</span>inputStreamReader<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token keyword">return</span> bufferedReader<span class="token punctuation">.</span><span class="token function">lines</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>line <span class="token operator">-&gt;</span> line<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span>toFind<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种方法使用_lines()_方法从文件创建一行的流。然后，后续的_filter()_操作选择感兴趣的行，并使用_collect()_将它们收集到列表中。</p><p><strong>_try-with-resources_的使用确保了各种文件和输入流在完成时正确关闭。</strong></p><h3 id="_3-2-使用-consumer-stream-string" tabindex="-1"><a class="header-anchor" href="#_3-2-使用-consumer-stream-string"><span>3.2. 使用 <em>Consumer&lt;Stream<code>&lt;String&gt;</code>&gt;</em></span></a></h3><p>在前一个例子中，我们从周围的_try-with-resources_中受益，以照顾我们的_.gz_流资源。然而，我们可能希望将方法泛化为操作从_.gz_文件即时读取的_Stream<code>&lt;String&gt;</code>_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">InputStream</span> inputStream <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileInputStream</span><span class="token punctuation">(</span>filePath<span class="token punctuation">)</span><span class="token punctuation">;</span>
     <span class="token class-name">GZIPInputStream</span> gzipInputStream <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">GZIPInputStream</span><span class="token punctuation">(</span>inputStream<span class="token punctuation">)</span><span class="token punctuation">;</span>
     <span class="token class-name">InputStreamReader</span> inputStreamReader <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">InputStreamReader</span><span class="token punctuation">(</span>gzipInputStream<span class="token punctuation">)</span><span class="token punctuation">;</span>
     <span class="token class-name">BufferedReader</span> bufferedReader <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BufferedReader</span><span class="token punctuation">(</span>inputStreamReader<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

    consumer<span class="token punctuation">.</span><span class="token function">accept</span><span class="token punctuation">(</span>bufferedReader<span class="token punctuation">.</span><span class="token function">lines</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>**这种方法允许调用者传入一个_Consumer&lt;Stream<code>&lt;String&gt;</code>&gt;_来操作解压行的流。**此外，代码调用了那个_Consumer_的_accept()<em>方法，以提供_Stream</em>。这允许我们传入任何东西来操作行：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">useContentsOfZipFile</span><span class="token punctuation">(</span>testFilePath<span class="token punctuation">,</span> linesStream <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
  linesStream<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>line <span class="token operator">-&gt;</span> line<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>line <span class="token operator">-&gt;</span> count<span class="token punctuation">.</span><span class="token function">incrementAndGet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，我们提供了一个消费者，它计算所有超过一定长度的行。</p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在这篇短文中，我们看了如何在Java中读取_.gz_文件。</p><p>首先，我们看了如何使用_BufferedReader_和_readLine()_将文件读入列表。然后，我们看了将文件视为_Stream<code>&lt;String&gt;</code>_来处理行，而不必一次性将它们全部加载到内存中。</p><p>正如往常一样，示例的实现可以在GitHub上找到。</p>`,29),c=[p];function o(l,i){return s(),a("div",null,c)}const d=n(e,[["render",o],["__file","2024-06-20-Reading a .gz File Line by Line Using GZIPInputStream.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/Archive/2024-06-20-Reading%20a%20.gz%20File%20Line%20by%20Line%20Using%20GZIPInputStream.html","title":"Java中使用GZIPInputStream逐行读取.gz文件","lang":"zh-CN","frontmatter":{"date":"2024-06-20T00:00:00.000Z","category":["Java","GZIP"],"tag":["GZIPInputStream","文件处理"],"head":[["meta",{"name":"keywords","content":"Java, GZIP, 文件读取, 流处理"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/2024-06-20-Reading%20a%20.gz%20File%20Line%20by%20Line%20Using%20GZIPInputStream.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中使用GZIPInputStream逐行读取.gz文件"}],["meta",{"property":"og:description","content":"Java中使用GZIPInputStream逐行读取.gz文件 1. 概述 我们可能希望在Java中使用压缩文件。常见的格式是_.gz_，这是由GZIP实用工具生成的。 在本教程中，我们将探讨如何使用_Java_中的_GZIPInputStream_类逐行读取压缩的(.gz)文件。 2. 读取GZipped文件 让我们想象一下，我们想要将文件的内容读入..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"GZIPInputStream"}],["meta",{"property":"article:tag","content":"文件处理"}],["meta",{"property":"article:published_time","content":"2024-06-20T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中使用GZIPInputStream逐行读取.gz文件\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-20T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中使用GZIPInputStream逐行读取.gz文件 1. 概述 我们可能希望在Java中使用压缩文件。常见的格式是_.gz_，这是由GZIP实用工具生成的。 在本教程中，我们将探讨如何使用_Java_中的_GZIPInputStream_类逐行读取压缩的(.gz)文件。 2. 读取GZipped文件 让我们想象一下，我们想要将文件的内容读入..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 读取GZipped文件","slug":"_2-读取gzipped文件","link":"#_2-读取gzipped文件","children":[]},{"level":2,"title":"3. 使用Java Stream API处理大型GZipped文件","slug":"_3-使用java-stream-api处理大型gzipped文件","link":"#_3-使用java-stream-api处理大型gzipped文件","children":[{"level":3,"title":"3.1. 独立方法","slug":"_3-1-独立方法","link":"#_3-1-独立方法","children":[]},{"level":3,"title":"3.2. 使用 Consumer<Stream<String>>","slug":"_3-2-使用-consumer-stream-string","link":"#_3-2-使用-consumer-stream-string","children":[]}]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":2.57,"words":771},"filePathRelative":"posts/baeldung/Archive/2024-06-20-Reading a .gz File Line by Line Using GZIPInputStream.md","localizedDate":"2024年6月20日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>我们可能希望在Java中使用压缩文件。常见的格式是_.gz_，这是由GZIP实用工具生成的。</p>\\n<p><strong>在本教程中，我们将探讨如何使用_Java_中的_GZIPInputStream_类逐行读取压缩的(<em>.gz</em>)文件。</strong></p>\\n<h2>2. 读取GZipped文件</h2>\\n<p>让我们想象一下，我们想要将文件的内容读入一个_List_。首先，我们需要在我们的路径上找到文件：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token class-name\\">String</span> filePath <span class=\\"token operator\\">=</span> <span class=\\"token class-name\\">Objects</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">requireNonNull</span><span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">Main</span><span class=\\"token punctuation\\">.</span><span class=\\"token keyword\\">class</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">getClassLoader</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">getResource</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"myFile.gz\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">getFile</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n</code></pre></div>","autoDesc":true}');export{d as comp,k as data};
