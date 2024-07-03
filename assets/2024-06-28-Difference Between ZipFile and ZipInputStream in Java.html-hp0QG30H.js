import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-BX3-P94R.js";const e={},p=t('<h1 id="java-中-zipfile-与-zipinputstream-的区别" tabindex="-1"><a class="header-anchor" href="#java-中-zipfile-与-zipinputstream-的区别"><span>Java 中 ZipFile 与 ZipInputStream 的区别</span></a></h1><p>在需要将多个文件压缩成一个单一的归档文件以方便传输和节省空间的情况下，<strong>Zip 是一种广泛使用的压缩归档文件格式。</strong></p><p>Java 提供了一套标准类，如 <em>ZipFile</em> 和 <em>ZipInputStream</em>，用于访问 zip 文件。在本教程中，我们将学习如何使用它们来读取 zip 文件。同时，我们将探索它们的功能差异并评估它们的性能。</p><h2 id="_2-创建-zip-文件" tabindex="-1"><a class="header-anchor" href="#_2-创建-zip-文件"><span>2. 创建 Zip 文件</span></a></h2><p>在我们深入到读取 zip 文件的代码之前，让我们先回顾一下创建 zip 文件的过程。</p><p>在以下代码片段中，我们将有两个变量。<em>data</em> 存储要压缩的内容，<em>file</em> 代表我们的目的地文件：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> data <span class="token operator">=</span> <span class="token string">&quot;...&quot;</span><span class="token punctuation">;</span> <span class="token comment">// 一个非常长的字符串</span>\n\n<span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">BufferedOutputStream</span> bos <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BufferedOutputStream</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">FileOutputStream</span><span class="token punctuation">(</span>file<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token class-name">ZipOutputStream</span> zos <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ZipOutputStream</span><span class="token punctuation">(</span>bos<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">ZipEntry</span> zipEntry <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ZipEntry</span><span class="token punctuation">(</span><span class="token string">&quot;zip-entry.txt&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    zos<span class="token punctuation">.</span><span class="token function">putNextEntry</span><span class="token punctuation">(</span>zipEntry<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    zos<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    zos<span class="token punctuation">.</span><span class="token function">closeEntry</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>此片段将 <em>data</em> 归档到名为 <em>zip-entry.txt</em> 的 zip 条目中，然后将条目写入目标 <em>file</em>。</strong></p><h2 id="_3-通过-zipfile-读取" tabindex="-1"><a class="header-anchor" href="#_3-通过-zipfile-读取"><span>3. 通过 <em>ZipFile</em> 读取</span></a></h2><p>首先，让我们看看如何通过 <em>ZipFile</em> 类从 zip 文件中读取所有条目：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">ZipFile</span> zipFile <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ZipFile</span><span class="token punctuation">(</span>compressedFile<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">Enumeration</span>`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span> <span class="token keyword">extends</span> <span class="token class-name">ZipEntry</span><span class="token punctuation">&gt;</span></span>` zipEntries <span class="token operator">=</span> zipFile<span class="token punctuation">.</span><span class="token function">entries</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">while</span> <span class="token punctuation">(</span>zipEntries<span class="token punctuation">.</span><span class="token function">hasMoreElements</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>  <span class="token punctuation">{</span>\n        <span class="token class-name">ZipEntry</span> zipEntry <span class="token operator">=</span> zipEntries<span class="token punctuation">.</span><span class="token function">nextElement</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">InputStream</span> inputStream <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BufferedInputStream</span><span class="token punctuation">(</span>zipFile<span class="token punctuation">.</span><span class="token function">getInputStream</span><span class="token punctuation">(</span>zipEntry<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token comment">// 从 InputStream 读取数据</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们创建一个 <em>ZipFile</em> 的实例来读取压缩文件。<em>ZipFile.entries()</em> 返回 zip 文件中的所有 zip 条目。然后我们可以从 <em>ZipEntry</em> 获取 <em>InputStream</em> 来读取它的内容。</p><p><strong>除了 <em>entries()</em>，ZipFile 还有一个方法 <em>getEntry(…)</em>，它允许我们基于条目名称随机访问特定的 <em>ZipEntry</em>：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">ZipEntry</span> zipEntry <span class="token operator">=</span> zipFile<span class="token punctuation">.</span><span class="token function">getEntry</span><span class="token punctuation">(</span><span class="token string">&quot;str-data-10.txt&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">InputStream</span> inputStream <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BufferedInputStream</span><span class="token punctuation">(</span>zipFile<span class="token punctuation">.</span><span class="token function">getInputStream</span><span class="token punctuation">(</span>zipEntry<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token comment">// 从 InputStream 读取数据</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-通过-zipinputstream-读取" tabindex="-1"><a class="header-anchor" href="#_4-通过-zipinputstream-读取"><span>4. 通过 <em>ZipInputStream</em> 读取</span></a></h2><p>接下来，我们将通过一个典型的例子来了解如何通过 <em>ZipInputStream</em> 从 zip 文件中读取所有条目：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">BufferedInputStream</span> bis <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BufferedInputStream</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">FileInputStream</span><span class="token punctuation">(</span>compressedFile<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token class-name">ZipInputStream</span> zipInputStream <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ZipInputStream</span><span class="token punctuation">(</span>bis<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">ZipEntry</span> zipEntry<span class="token punctuation">;</span>\n    <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>zipEntry <span class="token operator">=</span> zipInputStream<span class="token punctuation">.</span><span class="token function">getNextEntry</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token comment">// 从 ZipInputStream 读取数据</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们创建一个 <em>ZipInputStream</em> 来包装数据源，即我们案例中的 <em>compressedFile</em>。之后，我们通过 <em>getNextEntry()</em> 迭代 <em>ZipInputStream</em>。</p><p>在循环中，我们通过从 <em>ZipIputStream</em> 读取数据来读取每个 <em>ZipEntry</em> 的数据。一旦我们完成一个条目的读取，然后我们再次调用 <em>getNextEntry()</em> 来表示我们将要读取下一个条目。</p><h2 id="_5-功能差异" tabindex="-1"><a class="header-anchor" href="#_5-功能差异"><span>5. 功能差异</span></a></h2><p>尽管这两个类都可以从 zip 文件中读取条目，但它们有两个明显不同的功能差异。</p><h3 id="_5-1-访问类型" tabindex="-1"><a class="header-anchor" href="#_5-1-访问类型"><span>5.1. 访问类型</span></a></h3><p>它们之间的主要区别是 <em>ZipFile</em> 支持随机访问，而 <em>ZipInputStream</em> 仅支持顺序访问。</p><p>在 <em>ZipFile</em> 中，我们可以通过调用 <em>ZipFile.getEntry(…)</em> 来提取特定的条目。当我们只需要 <em>ZipFile</em> 中的特定条目时，这个特性特别有利。如果我们想在 <em>ZipInputStream</em> 中实现相同的功能，我们必须在迭代过程中循环遍历每个 <em>ZipEntry</em>，直到找到匹配项。</p><h3 id="_5-2-数据源" tabindex="-1"><a class="header-anchor" href="#_5-2-数据源"><span>5.2. 数据源</span></a></h3><p><em>ZipFile</em> 需要数据源是一个物理文件，而 <em>ZipInputStream</em> 只需要一个 <em>InputStream</em>。可能会有这样的情况，我们的数据不是一个文件。例如，我们的数据来自网络流。在这种情况下，在使用 <em>ZipFile</em> 处理之前，我们必须将整个 <em>InputStream</em> 转换为文件。</p><h2 id="_6-性能比较" tabindex="-1"><a class="header-anchor" href="#_6-性能比较"><span>6. 性能比较</span></a></h2><p>我们已经了解了 <em>ZipFile</em> 和 <em>ZipInputStream</em> 之间的功能差异。现在，让我们进一步探索它们在性能方面的差异。</p><p>我们将使用 JMH（Java Microbenchmark Harness）来捕捉这两种方式处理 zip 文件的速度。JMH 是一个旨在测量代码片段性能的框架。</p><p>在我们进行基准测试之前，我们必须在 <em>pom.xml</em> 中包含以下 Maven 依赖项：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>``org.openjdk.jmh``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>``jmh-core``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>``1.37``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>``\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>``org.openjdk.jmh``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>``jmh-generator-annprocess``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>``1.37``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>``\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>JMH Core 和 Annotation 的最新版本可以在 Maven Central 中找到。</p><h3 id="_6-1-读取所有条目" tabindex="-1"><a class="header-anchor" href="#_6-1-读取所有条目"><span>6.1. 读取所有条目</span></a></h3><p>在这个实验中，我们的目标是评估从 zip 文件中读取所有条目的性能。在我们的设置中，我们有一个包含 10 个条目的 zip 文件，每个条目包含 200KB 的数据。我们将分别通过 <em>ZipFile</em> 和 <em>ZipInputStream</em> 读取它们：</p><table><thead><tr><th>类</th><th>运行时间（毫秒）</th></tr></thead><tbody><tr><td><em>ZipFile</em></td><td>11.072</td></tr><tr><td><em>ZipInputStream</em></td><td>11.642</td></tr></tbody></table><p><strong>从结果中，我们看不到两个类之间的显著性能差异。运行时间的差异在 10% 以内。它们在读取 zip 文件中的所有条目时都表现出了可比的效率。</strong></p><h3 id="_6-2-读取最后一个条目" tabindex="-1"><a class="header-anchor" href="#_6-2-读取最后一个条目"><span>6.2. 读取最后一个条目</span></a></h3><p>接下来，我们将特别针对从同一个 zip 文件中读取最后一个条目：</p><table><thead><tr><th>类</th><th>运行时间（毫秒）</th></tr></thead><tbody><tr><td><em>ZipFile</em></td><td>1.016</td></tr><tr><td><em>ZipInputStream</em></td><td>12.830</td></tr></tbody></table><p>这次它们之间有很大的差异。<em>ZipFile</em> 只需要读取所有条目所需时间的 1/10 来读取 10 个条目中的单个条目，而 <em>ZipInputStream</em> 花费的时间几乎相同。</p><p>我们可以从结果中观察到 <em>ZipInputStream</em> 顺序读取条目。输入流必须从 zip 文件的开头读取到目标条目被定位，而 <em>ZipFile</em> 允许跳转到目标条目而无需读取整个文件。</p><p><strong>结果表明，特别是当处理大量条目中的少数条目时，选择 <em>ZipFile</em> 而不是 <em>ZipInputStream</em> 的重要性。</strong></p><h2 id="_7-结论" tabindex="-1"><a class="header-anchor" href="#_7-结论"><span>7. 结论</span></a></h2><p>在软件开发中，使用 zip 压缩文件是常见的。Java 提供了两个不同的类，<em>ZipFile</em> 和 <em>ZipIputStream,</em> 来读取 zip 文件。</p><p>在本文中，我们探讨了它们的用法和功能差异。我们还评估了它们之间的性能。</p><p>选择它们之间的差异取决于我们的需求。<strong>当我们处理大型 zip 归档中的有限数量条目以确保最佳性能时，我们将选择 <em>ZipFile</em>。相反，如果我们的数据源不是文件，我们将选择 <em>ZipInputStream</em>。</strong></p><p>如常，我们的示例的完整源代码可以在 GitHub 上找到。</p>',47),i=[p];function o(l,c){return s(),a("div",null,i)}const m=n(e,[["render",o],["__file","2024-06-28-Difference Between ZipFile and ZipInputStream in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-06-28/2024-06-28-Difference%20Between%20ZipFile%20and%20ZipInputStream%20in%20Java.html","title":"Java 中 ZipFile 与 ZipInputStream 的区别","lang":"zh-CN","frontmatter":{"date":"2024-06-28T00:00:00.000Z","category":["Java","编程"],"tag":["ZipFile","ZipInputStream"],"head":[["meta",{"name":"keywords","content":"Java, 压缩文件, ZipFile, ZipInputStream"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-28/2024-06-28-Difference%20Between%20ZipFile%20and%20ZipInputStream%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java 中 ZipFile 与 ZipInputStream 的区别"}],["meta",{"property":"og:description","content":"Java 中 ZipFile 与 ZipInputStream 的区别 在需要将多个文件压缩成一个单一的归档文件以方便传输和节省空间的情况下，Zip 是一种广泛使用的压缩归档文件格式。 Java 提供了一套标准类，如 ZipFile 和 ZipInputStream，用于访问 zip 文件。在本教程中，我们将学习如何使用它们来读取 zip 文件。同时，..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-28T10:37:33.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"ZipFile"}],["meta",{"property":"article:tag","content":"ZipInputStream"}],["meta",{"property":"article:published_time","content":"2024-06-28T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-28T10:37:33.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java 中 ZipFile 与 ZipInputStream 的区别\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-28T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-28T10:37:33.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java 中 ZipFile 与 ZipInputStream 的区别 在需要将多个文件压缩成一个单一的归档文件以方便传输和节省空间的情况下，Zip 是一种广泛使用的压缩归档文件格式。 Java 提供了一套标准类，如 ZipFile 和 ZipInputStream，用于访问 zip 文件。在本教程中，我们将学习如何使用它们来读取 zip 文件。同时，..."},"headers":[{"level":2,"title":"2. 创建 Zip 文件","slug":"_2-创建-zip-文件","link":"#_2-创建-zip-文件","children":[]},{"level":2,"title":"3. 通过 ZipFile 读取","slug":"_3-通过-zipfile-读取","link":"#_3-通过-zipfile-读取","children":[]},{"level":2,"title":"4. 通过 ZipInputStream 读取","slug":"_4-通过-zipinputstream-读取","link":"#_4-通过-zipinputstream-读取","children":[]},{"level":2,"title":"5. 功能差异","slug":"_5-功能差异","link":"#_5-功能差异","children":[{"level":3,"title":"5.1. 访问类型","slug":"_5-1-访问类型","link":"#_5-1-访问类型","children":[]},{"level":3,"title":"5.2. 数据源","slug":"_5-2-数据源","link":"#_5-2-数据源","children":[]}]},{"level":2,"title":"6. 性能比较","slug":"_6-性能比较","link":"#_6-性能比较","children":[{"level":3,"title":"6.1. 读取所有条目","slug":"_6-1-读取所有条目","link":"#_6-1-读取所有条目","children":[]},{"level":3,"title":"6.2. 读取最后一个条目","slug":"_6-2-读取最后一个条目","link":"#_6-2-读取最后一个条目","children":[]}]},{"level":2,"title":"7. 结论","slug":"_7-结论","link":"#_7-结论","children":[]}],"git":{"createdTime":1719571053000,"updatedTime":1719571053000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.98,"words":1495},"filePathRelative":"posts/baeldung/2024-06-28/2024-06-28-Difference Between ZipFile and ZipInputStream in Java.md","localizedDate":"2024年6月28日","excerpt":"\\n<p>在需要将多个文件压缩成一个单一的归档文件以方便传输和节省空间的情况下，<strong>Zip 是一种广泛使用的压缩归档文件格式。</strong></p>\\n<p>Java 提供了一套标准类，如 <em>ZipFile</em> 和 <em>ZipInputStream</em>，用于访问 zip 文件。在本教程中，我们将学习如何使用它们来读取 zip 文件。同时，我们将探索它们的功能差异并评估它们的性能。</p>\\n<h2>2. 创建 Zip 文件</h2>\\n<p>在我们深入到读取 zip 文件的代码之前，让我们先回顾一下创建 zip 文件的过程。</p>\\n<p>在以下代码片段中，我们将有两个变量。<em>data</em> 存储要压缩的内容，<em>file</em> 代表我们的目的地文件：</p>","autoDesc":true}');export{m as comp,d as data};
