import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-8nJ1rqSf.js";const e={},p=t(`<hr><h1 id="java-nio和nio-2的区别是什么-baeldung" tabindex="-1"><a class="header-anchor" href="#java-nio和nio-2的区别是什么-baeldung"><span>Java NIO和NIO.2的区别是什么？ | Baeldung---</span></a></h1><p>date: 2022-04-01 category:</p><ul><li>Java</li><li>NIO tag:</li><li>Java NIO</li><li>Java NIO.2 head:</li><li><ul><li>meta</li><li>name: keywords content: Java NIO, Java NIO.2, 文件系统操作, 非阻塞IO</li></ul></li></ul><hr><h1 id="java-nio和nio-2的区别是什么-baeldung-1" tabindex="-1"><a class="header-anchor" href="#java-nio和nio-2的区别是什么-baeldung-1"><span>Java NIO和NIO.2的区别是什么？ | Baeldung</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>在本教程中，我们将介绍Java IO功能以及它们在不同Java版本中的演变。首先，我们将介绍最初Java版本中的_java.io_包。接下来，我们将介绍在Java 1.4中引入的_java.nio_包。最后，我们将介绍_java.nio.file_包，通常被称为NIO.2包。</p><h2 id="_2-java-nio包" tabindex="-1"><a class="header-anchor" href="#_2-java-nio包"><span>2. Java NIO包</span></a></h2><p>Java的第一个版本发布了_java.io_包，引入了一个_File_类来访问文件系统。<strong>_File_类代表文件和目录，并提供有限的文件系统操作。</strong> 我们可以创建和删除文件，检查它们是否存在，检查读写访问权限等。</p><p>它也有一些缺点：</p><ul><li><strong>缺少复制方法</strong> - 要复制文件，我们需要创建两个_File_实例，并使用缓冲区从一个实例读取并写入另一个_File_实例。</li><li><strong>错误处理不佳</strong> - 一些方法返回_boolean_作为操作成功与否的指示。</li><li><strong>文件属性集有限</strong> - 名称、路径、读写权限、内存大小等可用。</li><li><strong>阻塞API</strong> - 我们的线程在IO操作完成之前被阻塞。</li></ul><p>要读取文件，我们需要一个_FileInputStream_实例来从文件中读取字节：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">readFromFileUsingFileIO</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
    <span class="token class-name">File</span> file <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">File</span><span class="token punctuation">(</span><span class="token string">&quot;src/test/resources/nio-vs-nio2.txt&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">FileInputStream</span> in <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileInputStream</span><span class="token punctuation">(</span>file<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">StringBuilder</span> content <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> data <span class="token operator">=</span> in<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>data <span class="token operator">!=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        content<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">char</span><span class="token punctuation">)</span> data<span class="token punctuation">)</span><span class="token punctuation">;</span>
        data <span class="token operator">=</span> in<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    in<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertThat</span><span class="token punctuation">(</span>content<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token string">&quot;Hello from file!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，Java 1.4引入了非阻塞IO API，捆绑在_java.nio_包中（nio代表新的IO）。NIO被引入是为了克服_java.io_包的限制。这个包引入了三个核心类：<em>Channel</em>、<em>Buffer_和_Selector</em>。</p><h3 id="_2-1-channel" tabindex="-1"><a class="header-anchor" href="#_2-1-channel"><span>2.1. <em>Channel</em></span></a></h3><p><strong>Java NIO _Channel_是一个允许我们读写缓冲区的类。</strong> <em>Channel_类类似于_Streams</em>（这里我们说的是IO <em>Streams</em>，不是Java 1.8 <em>Streams</em>），有几个不同之处。_Channel_是双向的，而_Streams_通常是单向的，并且它们可以异步读写。</p><p><em>Channel_类有几种实现，包括用于文件系统读写的_FileChannel</em>、用于使用UDP进行读写的_DatagramChannel_和用于使用TCP进行读写的_SocketChannel_。</p><h3 id="_2-2-buffer" tabindex="-1"><a class="header-anchor" href="#_2-2-buffer"><span>2.2. <em>Buffer</em></span></a></h3><p><strong>缓冲区是一块内存，我们可以从中读取或写入数据。</strong> NIO _Buffer_对象包装了一个内存块。_Buffer_类提供了一组功能，用于操作内存块。要使用_Buffer_对象，我们需要了解_Buffer_类的三个主要属性：容量、位置和限制。</p><ul><li>容量定义了内存块的大小。当我们向缓冲区写入数据时，我们只能写入有限的长度。当缓冲区满时，我们需要读取数据或清除它。</li><li>位置是我们写入数据的起始点。一个空缓冲区从0开始，一直到_capacity – 1_。同样，当我们读取数据时，我们从位置值开始。</li><li>限制意味着我们可以从缓冲区读写。</li></ul><p><em>Buffer_类有多种变体。每种原始Java类型都有一个，不包括_Boolean_类型，还有_MappedByteBuffer</em>。</p><p>要使用缓冲区，我们需要了解一些重要的方法：</p><ul><li><em>allocate(int value) –</em> 我们使用此方法创建特定大小的缓冲区。</li><li><em>flip()</em> – 这个方法用于从写入模式切换到读取模式</li><li><em>clear() –</em> 清除缓冲区内容的方法</li><li><em>compact() –</em> 清除我们已读取内容的方法</li><li><em>rewind() –</em> 将位置重置为0，以便我们可以重新读取缓冲区中的数据</li></ul><p>使用前面描述的概念，让我们使用_Channel_和_Buffer_类从文件中读取内容：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">readFromFileUsingFileChannel</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
    <span class="token class-name">RandomAccessFile</span> file <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">RandomAccessFile</span><span class="token punctuation">(</span><span class="token string">&quot;src/test/resources/nio-vs-nio2.txt&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;r&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">FileChannel</span> channel <span class="token operator">=</span> file<span class="token punctuation">.</span><span class="token function">getChannel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">StringBuilder</span> content <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">ByteBuffer</span> buffer <span class="token operator">=</span> <span class="token class-name">ByteBuffer</span><span class="token punctuation">.</span><span class="token function">allocate</span><span class="token punctuation">(</span><span class="token number">256</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> bytesRead <span class="token operator">=</span> channel<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span>buffer<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>bytesRead <span class="token operator">!=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        buffer<span class="token punctuation">.</span><span class="token function">flip</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>buffer<span class="token punctuation">.</span><span class="token function">hasRemaining</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            content<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">char</span><span class="token punctuation">)</span> buffer<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        buffer<span class="token punctuation">.</span><span class="token function">clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        bytesRead <span class="token operator">=</span> channel<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span>buffer<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    file<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertThat</span><span class="token punctuation">(</span>content<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token string">&quot;Hello from file!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>初始化所有必需的对象后，我们从通道读入缓冲区。接下来，在while循环中，我们使用_flip()_方法标记缓冲区以供读取，并逐字节读取，将其附加到我们的结果中。最后，我们清除数据并读取另一批。</p><h3 id="_2-3-selector" tabindex="-1"><a class="header-anchor" href="#_2-3-selector"><span>2.3. <em>Selector</em></span></a></h3><p><strong>Java NIO Selector允许我们用单个线程管理多个通道。</strong> 要使用selector对象监视多个通道，每个通道实例必须是非阻塞模式，并且我们必须注册它。注册通道后，我们得到一个_SelectionKey_对象，表示通道和选择器之间的连接。当我们有多个通道连接到选择器时，我们可以使用_select()_方法检查有多少通道准备好使用。调用_select()_方法后，我们可以使用_selectedKeys()_方法获取所有准备好的通道。</p><h3 id="_2-4-nio包的缺点" tabindex="-1"><a class="header-anchor" href="#_2-4-nio包的缺点"><span>2.4. NIO包的缺点</span></a></h3><p>_java.nio_包引入的变化更多地与低级数据IO有关。虽然它们允许非阻塞API，但其他方面仍然存在问题：</p><ul><li><strong>对符号链接的支持有限</strong></li><li><strong>对文件属性访问的支持有限</strong></li><li><strong>缺少更好的文件系统管理工具</strong></li></ul><h2 id="_3-java-nio-2包" tabindex="-1"><a class="header-anchor" href="#_3-java-nio-2包"><span>3. Java NIO.2包</span></a></h2><p>Java 1.7引入了新的_java.nio.file_包，也称为NIO.2包。这个包采用了非阻塞IO的异步方法，这是_java.nio_包不支持的。最显著的变化与高级文件操作有关。它们通过_Files_、<em>Path_和_Paths_类添加。最值得注意的低级变化是添加了_AsynchronousFileChannel_和_AsyncroniousSocketChannel</em>。</p><p><strong>_Path_对象表示由分隔符分隔的目录和文件名的层次序列。</strong> 根组件最左边，文件在右边。这个类提供了诸如_getFileName()_、_getParent()_等实用方法。_Path_类还提供了_resolve_和_relativize_方法，帮助构建不同文件之间的路径。Paths类是一组静态实用方法，接收_String_或_URI_以创建_Path_实例。</p><p><strong>_Files_类提供了使用前面描述的_Path_类的实用方法，并对文件、目录和符号链接进行操作。</strong> 它还提供了一种使用_readAttributes()_方法读取许多文件属性的方式。</p><p>最后，让我们看看在读取文件方面，NIO.2与以前的IO版本相比如何：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">readFromFileUsingNIO2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
    <span class="token class-name">List</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\` strings <span class="token operator">=</span> <span class="token class-name">Files</span><span class="token punctuation">.</span><span class="token function">readAllLines</span><span class="token punctuation">(</span><span class="token class-name">Paths</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;src/test/resources/nio-vs-nio2.txt&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertThat</span><span class="token punctuation">(</span>strings<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token string">&quot;Hello from file!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们介绍了_java.nio_和_java.nio.file_包的基础知识。正如我们所看到的，NIO.2不是NIO包的新版本。NIO包引入了一个用于非阻塞IO的低级API，而NIO.2引入了更好的文件管理。这两个包不是同义词，而是相互补充。像往常一样，所有代码示例都可以在GitHub上找到。</p><p>OK</p>`,41),o=[p];function l(c,i){return s(),a("div",null,o)}const k=n(e,[["render",l],["__file","2024-07-22-What Is the Difference Between NIO and NIO.2 .html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-22/2024-07-22-What%20Is%20the%20Difference%20Between%20NIO%20and%20NIO.2%20.html","title":"Java NIO和NIO.2的区别是什么？ | Baeldung---","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","NIO"],"tag":["Java NIO","Java NIO.2"],"head":[["meta",{"name":"keywords","content":"Java NIO, Java NIO.2, 文件系统操作, 非阻塞IO"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-22/2024-07-22-What%20Is%20the%20Difference%20Between%20NIO%20and%20NIO.2%20.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java NIO和NIO.2的区别是什么？ | Baeldung---"}],["meta",{"property":"og:description","content":"Java NIO和NIO.2的区别是什么？ | Baeldung--- date: 2022-04-01 category: Java NIO tag: Java NIO Java NIO.2 head: meta name: keywords content: Java NIO, Java NIO.2, 文件系统操作, 非阻塞IO Java NIO和..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-22T09:47:24.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java NIO"}],["meta",{"property":"article:tag","content":"Java NIO.2"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-22T09:47:24.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java NIO和NIO.2的区别是什么？ | Baeldung---\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-22T09:47:24.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java NIO和NIO.2的区别是什么？ | Baeldung--- date: 2022-04-01 category: Java NIO tag: Java NIO Java NIO.2 head: meta name: keywords content: Java NIO, Java NIO.2, 文件系统操作, 非阻塞IO Java NIO和..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. Java NIO包","slug":"_2-java-nio包","link":"#_2-java-nio包","children":[{"level":3,"title":"2.1. Channel","slug":"_2-1-channel","link":"#_2-1-channel","children":[]},{"level":3,"title":"2.2. Buffer","slug":"_2-2-buffer","link":"#_2-2-buffer","children":[]},{"level":3,"title":"2.3. Selector","slug":"_2-3-selector","link":"#_2-3-selector","children":[]},{"level":3,"title":"2.4. NIO包的缺点","slug":"_2-4-nio包的缺点","link":"#_2-4-nio包的缺点","children":[]}]},{"level":2,"title":"3. Java NIO.2包","slug":"_3-java-nio-2包","link":"#_3-java-nio-2包","children":[]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1721641644000,"updatedTime":1721641644000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.62,"words":1687},"filePathRelative":"posts/baeldung/2024-07-22/2024-07-22-What Is the Difference Between NIO and NIO.2 .md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>Java NIO和NIO.2的区别是什么？ | Baeldung---</h1>\\n<p>date: 2022-04-01\\ncategory:</p>\\n<ul>\\n<li>Java</li>\\n<li>NIO\\ntag:</li>\\n<li>Java NIO</li>\\n<li>Java NIO.2\\nhead:</li>\\n<li>\\n<ul>\\n<li>meta</li>\\n<li>name: keywords\\ncontent: Java NIO, Java NIO.2, 文件系统操作, 非阻塞IO</li>\\n</ul>\\n</li>\\n</ul>\\n<hr>\\n<h1>Java NIO和NIO.2的区别是什么？ | Baeldung</h1>","autoDesc":true}');export{k as comp,d as data};
