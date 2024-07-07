import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-BA-MSwOu.js";const e={},p=t('<hr><h1 id="java中将文件转换为字节数组" tabindex="-1"><a class="header-anchor" href="#java中将文件转换为字节数组"><span>Java中将文件转换为字节数组</span></a></h1><p>在这篇快速教程中，我们将看到如何在Java中将文件转换为字节数组。</p><p>首先，我们将学习如何使用内置的JDK解决方案进行转换。然后，我们将讨论如何使用Apache Commons IO和Guava实现相同的结果。</p><h3 id="_2-1-使用java" tabindex="-1"><a class="header-anchor" href="#_2-1-使用java"><span>2.1 使用Java</span></a></h3><p>JDK提供了几种方便的方法将文件转换为字节数组。例如，我们可以使用java.io或java.nio包来回答我们的中心问题。让我们仔细看看每个选项。</p><h4 id="_2-1-1-fileinputstream" tabindex="-1"><a class="header-anchor" href="#_2-1-1-fileinputstream"><span>2.1.1 FileInputStream</span></a></h4><p>让我们从使用IO包中的FileInputStream类开始，这是最简单的解决方案。通常，这个类带有将文件内容读取为字节的方法。</p><p>例如，假设我们有一个名为sample.txt的文件，内容为“Hello World”：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">FileToByteArrayUnitTest</span> <span class="token punctuation">{</span>\n    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">FILE_NAME</span> <span class="token operator">=</span> <span class="token string">&quot;src&quot;</span> <span class="token operator">+</span> <span class="token class-name">File</span><span class="token punctuation">.</span>separator <span class="token operator">+</span> <span class="token string">&quot;test&quot;</span> <span class="token operator">+</span> <span class="token class-name">File</span><span class="token punctuation">.</span>separator <span class="token operator">+</span> <span class="token string">&quot;resources&quot;</span> <span class="token operator">+</span> <span class="token class-name">File</span><span class="token punctuation">.</span>separator <span class="token operator">+</span> <span class="token string">&quot;sample.txt&quot;</span><span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> expectedByteArray <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token number">72</span><span class="token punctuation">,</span> <span class="token number">101</span><span class="token punctuation">,</span> <span class="token number">108</span><span class="token punctuation">,</span> <span class="token number">108</span><span class="token punctuation">,</span> <span class="token number">111</span><span class="token punctuation">,</span> <span class="token number">32</span><span class="token punctuation">,</span> <span class="token number">87</span><span class="token punctuation">,</span> <span class="token number">111</span><span class="token punctuation">,</span> <span class="token number">114</span><span class="token punctuation">,</span> <span class="token number">108</span><span class="token punctuation">,</span> <span class="token number">100</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n    <span class="token annotation punctuation">@Test</span>\n    <span class="token keyword">void</span> <span class="token function">givenFile_whenUsingFileInputStreamClass_thenConvert</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>\n        <span class="token class-name">File</span> myFile <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">File</span><span class="token punctuation">(</span><span class="token constant">FILE_NAME</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> byteArray <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span> myFile<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">;</span>\n        <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">FileInputStream</span> inputStream <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileInputStream</span><span class="token punctuation">(</span>myFile<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            inputStream<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span>byteArray<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n\n        <span class="token function">assertArrayEquals</span><span class="token punctuation">(</span>expectedByteArray<span class="token punctuation">,</span> byteArray<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们使用给定的sample.txt文件创建了FileInputStream类的实例。此外，我们调用了read(byte[] b)方法，将FileInputStream实例中的数据读取到定义的字节数组中。</p><p>值得注意的是，我们使用了try-with-resources方法来高效地处理资源的关闭。</p><h3 id="_2-2-files-readallbytes" tabindex="-1"><a class="header-anchor" href="#_2-2-files-readallbytes"><span>2.2 Files#readAllBytes</span></a></h3><p>或者，我们可以使用NIO API中的Files类。</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">givenFile_whenUsingNioApiFilesClass_thenConvert</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>\n    <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> byteArray <span class="token operator">=</span> <span class="token class-name">Files</span><span class="token punctuation">.</span><span class="token function">readAllBytes</span><span class="token punctuation">(</span><span class="token class-name">Paths</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token constant">FILE_NAME</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token function">assertArrayEquals</span><span class="token punctuation">(</span>expectedByteArray<span class="token punctuation">,</span> byteArray<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，Files类带有readAllBytes()方法，它返回指定路径文件的所有字节。有趣的是，这个方法在读取字节后自动关闭文件。</p><p>另一个重要的注意事项是，这个方法不打算读取大文件。因此，我们只能在简单的情况下使用它。</p><h3 id="_3-使用apache-commons-io" tabindex="-1"><a class="header-anchor" href="#_3-使用apache-commons-io"><span>3 使用Apache Commons IO</span></a></h3><p>另一种解决方案是使用Apache Commons IO库。它提供了许多方便的实用类，我们可以使用它们来执行常见的IO任务。</p><p>首先，让我们将commons-io依赖项添加到pom.xml文件中：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>``commons-io``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>``commons-io``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>``2.15.1``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>``\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-1-fileutils-readfiletobytearray" tabindex="-1"><a class="header-anchor" href="#_3-1-fileutils-readfiletobytearray"><span>3.1 FileUtils#readFileToByteArray</span></a></h4><p>FileUtils类，顾名思义，提供了一组用于文件操作的方法。在这些方法中，我们找到了readFileToByteArray()方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">givenFile_whenUsingApacheCommonsFileUtilsClass_thenConvert</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>\n    <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> byteArray <span class="token operator">=</span> <span class="token class-name">FileUtils</span><span class="token punctuation">.</span><span class="token function">readFileToByteArray</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">File</span><span class="token punctuation">(</span><span class="token constant">FILE_NAME</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token function">assertArrayEquals</span><span class="token punctuation">(</span>expectedByteArray<span class="token punctuation">,</span> byteArray<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们在上面看到的，readFileToByteArray()以一种直接的方式将指定文件的内容读取到一个字节数组中。这个方法的好处是文件总是被关闭的。</p><p>此外，这个方法没有Files#readAllBytes的限制，并且如果提供的文件是null，它会抛出NullPointerException。</p><h4 id="_3-2-ioutils-tobytearray" tabindex="-1"><a class="header-anchor" href="#_3-2-ioutils-tobytearray"><span>3.2 IOUtils#toByteArray</span></a></h4><p>Apache Commons IO提供了另一种我们可以使用的替代方案来实现相同的结果。它提供了IOUtils类来处理一般的IO流操作。</p><p>让我们通过一个实际的例子来说明使用IOUtils：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">givenFile_whenUsingApacheCommonsIOUtilsClass_thenConvert</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>\n    <span class="token class-name">File</span> myFile <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">File</span><span class="token punctuation">(</span><span class="token constant">FILE_NAME</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> byteArray <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span> myFile<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">;</span>\n    <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">FileInputStream</span> inputStream <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileInputStream</span><span class="token punctuation">(</span>myFile<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        byteArray <span class="token operator">=</span> <span class="token class-name">IOUtils</span><span class="token punctuation">.</span><span class="token function">toByteArray</span><span class="token punctuation">(</span>inputStream<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token function">assertArrayEquals</span><span class="token punctuation">(</span>expectedByteArray<span class="token punctuation">,</span> byteArray<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>简而言之，这个类带有toByteArray()方法，将InputStream的数据作为byte[]返回。我们这里不需要使用BufferedInputStream，因为这个方法内部会进行缓冲。</p><h3 id="_4-使用guava" tabindex="-1"><a class="header-anchor" href="#_4-使用guava"><span>4 使用Guava</span></a></h3><p>Guava库是将文件转换为字节数组时考虑的另一个选项。像往常一样，在开始使用这个库之前，我们需要将其依赖项添加到pom.xml中：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>``com.google.guava``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>``guava``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>``32.1.3-jre``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>``\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_4-1-files-tobytearray" tabindex="-1"><a class="header-anchor" href="#_4-1-files-tobytearray"><span>4.1 Files#toByteArray</span></a></h4><p>Guava库提供了自己的Files类版本。让我们在实践中看看它：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">givenFile_whenUsingGuavaFilesClass_thenConvert</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>\n    <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> byteArray <span class="token operator">=</span> <span class="token class-name"><span class="token namespace">com<span class="token punctuation">.</span>google<span class="token punctuation">.</span>common<span class="token punctuation">.</span>io<span class="token punctuation">.</span></span>Files</span><span class="token punctuation">.</span><span class="token function">toByteArray</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">File</span><span class="token punctuation">(</span><span class="token constant">FILE_NAME</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token function">assertArrayEquals</span><span class="token punctuation">(</span>expectedByteArray<span class="token punctuation">,</span> byteArray<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>简而言之，我们使用toByteArray()方法来获取包含给定文件所有字节的字节数组。</p><h3 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5 结论</span></a></h3><p>在这篇简短的文章中，我们探索了使用JDK方法、Guava和Apache Commons IO库将文件转换为字节数组的各种方式。</p><p>正如往常一样，本文中使用的代码可以在GitHub上找到。</p>',41),o=[p];function c(l,i){return s(),a("div",null,o)}const k=n(e,[["render",c],["__file","2024-06-27-Convert File to Byte Array in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-06-27/2024-06-27-Convert%20File%20to%20Byte%20Array%20in%20Java.html","title":"Java中将文件转换为字节数组","lang":"zh-CN","frontmatter":{"date":"2024-06-28T00:00:00.000Z","category":["Java","文件操作"],"tag":["Java","文件转换","字节数组"],"head":[["meta",{"name":"keywords","content":"Java, 文件转换, 字节数组"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-27/2024-06-27-Convert%20File%20to%20Byte%20Array%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中将文件转换为字节数组"}],["meta",{"property":"og:description","content":"Java中将文件转换为字节数组 在这篇快速教程中，我们将看到如何在Java中将文件转换为字节数组。 首先，我们将学习如何使用内置的JDK解决方案进行转换。然后，我们将讨论如何使用Apache Commons IO和Guava实现相同的结果。 2.1 使用Java JDK提供了几种方便的方法将文件转换为字节数组。例如，我们可以使用java.io或java..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-27T17:51:59.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"文件转换"}],["meta",{"property":"article:tag","content":"字节数组"}],["meta",{"property":"article:published_time","content":"2024-06-28T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-27T17:51:59.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中将文件转换为字节数组\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-28T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-27T17:51:59.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中将文件转换为字节数组 在这篇快速教程中，我们将看到如何在Java中将文件转换为字节数组。 首先，我们将学习如何使用内置的JDK解决方案进行转换。然后，我们将讨论如何使用Apache Commons IO和Guava实现相同的结果。 2.1 使用Java JDK提供了几种方便的方法将文件转换为字节数组。例如，我们可以使用java.io或java..."},"headers":[{"level":3,"title":"2.1 使用Java","slug":"_2-1-使用java","link":"#_2-1-使用java","children":[]},{"level":3,"title":"2.2 Files#readAllBytes","slug":"_2-2-files-readallbytes","link":"#_2-2-files-readallbytes","children":[]},{"level":3,"title":"3 使用Apache Commons IO","slug":"_3-使用apache-commons-io","link":"#_3-使用apache-commons-io","children":[]},{"level":3,"title":"4 使用Guava","slug":"_4-使用guava","link":"#_4-使用guava","children":[]},{"level":3,"title":"5 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1719510719000,"updatedTime":1719510719000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.51,"words":1054},"filePathRelative":"posts/baeldung/2024-06-27/2024-06-27-Convert File to Byte Array in Java.md","localizedDate":"2024年6月28日","excerpt":"<hr>\\n<h1>Java中将文件转换为字节数组</h1>\\n<p>在这篇快速教程中，我们将看到如何在Java中将文件转换为字节数组。</p>\\n<p>首先，我们将学习如何使用内置的JDK解决方案进行转换。然后，我们将讨论如何使用Apache Commons IO和Guava实现相同的结果。</p>\\n<h3>2.1 使用Java</h3>\\n<p>JDK提供了几种方便的方法将文件转换为字节数组。例如，我们可以使用java.io或java.nio包来回答我们的中心问题。让我们仔细看看每个选项。</p>\\n<h4>2.1.1 FileInputStream</h4>\\n<p>让我们从使用IO包中的FileInputStream类开始，这是最简单的解决方案。通常，这个类带有将文件内容读取为字节的方法。</p>","autoDesc":true}');export{k as comp,d as data};
