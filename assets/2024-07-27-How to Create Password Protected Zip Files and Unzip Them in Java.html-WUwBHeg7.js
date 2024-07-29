import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-BUAgDejY.js";const p={},e=t(`<h1 id="如何在java中创建受密码保护的zip文件以及解压它们-baeldung" tabindex="-1"><a class="header-anchor" href="#如何在java中创建受密码保护的zip文件以及解压它们-baeldung"><span>如何在Java中创建受密码保护的Zip文件以及解压它们 | Baeldung</span></a></h1><ol><li>概述</li></ol><p>在之前的教程中，我们展示了如何使用java.util.zip包在Java中进行压缩和解压。但我们没有标准的Java库来创建受密码保护的zip文件。</p><p>在本教程中，我们将学习如何使用Zip4j库创建受密码保护的zip文件以及解压它们。它是Java中最全面的zip文件库。</p><ol start="2"><li>依赖性</li></ol><p>让我们首先将zip4j依赖项添加到我们的pom.xml文件中：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`net.lingala.zip4j\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`zip4j\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\`2.11.5\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\`
\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>压缩文件</li></ol><p>首先，我们将使用ZipFile的addFile()方法将名为aFile.txt的文件压缩到名为compressed.zip的受密码保护的归档中：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">ZipParameters</span> zipParameters <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ZipParameters</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
zipParameters<span class="token punctuation">.</span><span class="token function">setEncryptFiles</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
zipParameters<span class="token punctuation">.</span><span class="token function">setCompressionLevel</span><span class="token punctuation">(</span><span class="token class-name">CompressionLevel</span><span class="token punctuation">.</span><span class="token constant">HIGHER</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
zipParameters<span class="token punctuation">.</span><span class="token function">setEncryptionMethod</span><span class="token punctuation">(</span><span class="token class-name">EncryptionMethod</span><span class="token punctuation">.</span><span class="token constant">AES</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">ZipFile</span> zipFile <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ZipFile</span><span class="token punctuation">(</span><span class="token string">&quot;compressed.zip&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;password&quot;</span><span class="token punctuation">.</span><span class="token function">toCharArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
zipFile<span class="token punctuation">.</span><span class="token function">addFile</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">File</span><span class="token punctuation">(</span><span class="token string">&quot;aFile.txt&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> zipParameters<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>设置压缩级别这一行是可选的。我们可以选择从FASTEST到ULTRA（默认为NORMAL）。</p><p>在这个例子中，我们使用了AES加密。如果我们想使用Zip标准加密，我们只需要将AES替换为ZIP_STANDARD。</p><p>请注意，如果文件&quot;aFile.txt&quot;在磁盘上不存在，该方法将抛出异常：“net.lingala.zip4j.exception.ZipException: File does not exist: …”。</p><p>为了解决这个问题，我们必须确保文件要么手动创建并放置在项目文件夹中，要么我们得从Java中创建它：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">File</span> fileToAdd <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">File</span><span class="token punctuation">(</span><span class="token string">&quot;aFile.txt&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>fileToAdd<span class="token punctuation">.</span><span class="token function">exists</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    fileToAdd<span class="token punctuation">.</span><span class="token function">createNewFile</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此外，完成新的ZipFile后，<strong>关闭资源是一个好习惯：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>zipFile<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="4"><li>压缩多个文件</li></ol><p>让我们稍微修改一下代码，以便我们可以一次性压缩多个文件：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">ZipParameters</span> zipParameters <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ZipParameters</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
zipParameters<span class="token punctuation">.</span><span class="token function">setEncryptFiles</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
zipParameters<span class="token punctuation">.</span><span class="token function">setEncryptionMethod</span><span class="token punctuation">(</span><span class="token class-name">EncryptionMethod</span><span class="token punctuation">.</span><span class="token constant">AES</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">List</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">File</span><span class="token punctuation">&gt;</span></span>\` filesToAdd <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span>
  <span class="token keyword">new</span> <span class="token class-name">File</span><span class="token punctuation">(</span><span class="token string">&quot;aFile.txt&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token keyword">new</span> <span class="token class-name">File</span><span class="token punctuation">(</span><span class="token string">&quot;bFile.txt&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">ZipFile</span> zipFile <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ZipFile</span><span class="token punctuation">(</span><span class="token string">&quot;compressed.zip&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;password&quot;</span><span class="token punctuation">.</span><span class="token function">toCharArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
zipFile<span class="token punctuation">.</span><span class="token function">addFiles</span><span class="token punctuation">(</span>filesToAdd<span class="token punctuation">,</span> zipParameters<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们使用addFiles()而不是addFile方法，并传入一个文件列表。</p><ol start="5"><li>压缩一个目录</li></ol><p>我们可以通过将addFile方法替换为addFolder来简单地压缩一个文件夹：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">ZipFile</span> zipFile <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ZipFile</span><span class="token punctuation">(</span><span class="token string">&quot;compressed.zip&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;password&quot;</span><span class="token punctuation">.</span><span class="token function">toCharArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
zipFile<span class="token punctuation">.</span><span class="token function">addFolder</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">File</span><span class="token punctuation">(</span><span class="token string">&quot;/users/folder_to_add&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> zipParameters<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ol start="6"><li>创建分割的Zip文件</li></ol><p>当大小超过特定限制时，我们可以通过使用createSplitZipFile和createSplitZipFileFromFolder方法将zip文件分割成多个文件：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">ZipFile</span> zipFile <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ZipFile</span><span class="token punctuation">(</span><span class="token string">&quot;compressed.zip&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;password&quot;</span><span class="token punctuation">.</span><span class="token function">toCharArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> splitLength <span class="token operator">=</span> <span class="token number">1024</span> <span class="token operator">*</span> <span class="token number">1024</span> <span class="token operator">*</span> <span class="token number">10</span><span class="token punctuation">;</span> <span class="token comment">//10MB</span>
zipFile<span class="token punctuation">.</span><span class="token function">createSplitZipFile</span><span class="token punctuation">(</span><span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">File</span><span class="token punctuation">(</span><span class="token string">&quot;aFile.txt&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span> zipParameters<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">,</span> splitLength<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>zipFile<span class="token punctuation">.</span><span class="token function">createSplitZipFileFromFolder</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">File</span><span class="token punctuation">(</span><span class="token string">&quot;/users/folder_to_add&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> zipParameters<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">,</span> splitLength<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>splitLength的单位是字节。</p><p>提取文件同样简单。我们可以使用extractAll()方法从我们的compressed.zip中提取所有文件：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">ZipFile</span> zipFile <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ZipFile</span><span class="token punctuation">(</span><span class="token string">&quot;compressed.zip&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;password&quot;</span><span class="token punctuation">.</span><span class="token function">toCharArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
zipFile<span class="token punctuation">.</span><span class="token function">extractAll</span><span class="token punctuation">(</span><span class="token string">&quot;/destination_directory&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们只想从compressed.zip中提取单个文件，我们可以使用extractFile()方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">ZipFile</span> zipFile <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ZipFile</span><span class="token punctuation">(</span><span class="token string">&quot;compressed.zip&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;password&quot;</span><span class="token punctuation">.</span><span class="token function">toCharArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
zipFile<span class="token punctuation">.</span><span class="token function">extractFile</span><span class="token punctuation">(</span><span class="token string">&quot;aFile.txt&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;/destination_directory&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ol start="9"><li>结论</li></ol><p>总结来说，我们学习了如何使用Zip4j库在Java中创建受密码保护的zip文件以及解压它们。</p><p>这些示例的实现可以在GitHub上找到。</p>`,36),o=[e];function c(l,i){return s(),a("div",null,o)}const k=n(p,[["render",c],["__file","2024-07-27-How to Create Password Protected Zip Files and Unzip Them in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-27/2024-07-27-How%20to%20Create%20Password%20Protected%20Zip%20Files%20and%20Unzip%20Them%20in%20Java.html","title":"如何在Java中创建受密码保护的Zip文件以及解压它们 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Zip4j"],"tag":["Java","Zip4j","密码保护","压缩文件"],"head":[["meta",{"name":"keywords","content":"Java, Zip4j, 密码保护, 压缩文件"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-27/2024-07-27-How%20to%20Create%20Password%20Protected%20Zip%20Files%20and%20Unzip%20Them%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"如何在Java中创建受密码保护的Zip文件以及解压它们 | Baeldung"}],["meta",{"property":"og:description","content":"如何在Java中创建受密码保护的Zip文件以及解压它们 | Baeldung 概述 在之前的教程中，我们展示了如何使用java.util.zip包在Java中进行压缩和解压。但我们没有标准的Java库来创建受密码保护的zip文件。 在本教程中，我们将学习如何使用Zip4j库创建受密码保护的zip文件以及解压它们。它是Java中最全面的zip文件库。 依..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-27T08:58:34.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Zip4j"}],["meta",{"property":"article:tag","content":"密码保护"}],["meta",{"property":"article:tag","content":"压缩文件"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-27T08:58:34.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"如何在Java中创建受密码保护的Zip文件以及解压它们 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-27T08:58:34.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"如何在Java中创建受密码保护的Zip文件以及解压它们 | Baeldung 概述 在之前的教程中，我们展示了如何使用java.util.zip包在Java中进行压缩和解压。但我们没有标准的Java库来创建受密码保护的zip文件。 在本教程中，我们将学习如何使用Zip4j库创建受密码保护的zip文件以及解压它们。它是Java中最全面的zip文件库。 依..."},"headers":[],"git":{"createdTime":1722070714000,"updatedTime":1722070714000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.5,"words":750},"filePathRelative":"posts/baeldung/2024-07-27/2024-07-27-How to Create Password Protected Zip Files and Unzip Them in Java.md","localizedDate":"2022年4月1日","excerpt":"\\n<ol>\\n<li>概述</li>\\n</ol>\\n<p>在之前的教程中，我们展示了如何使用java.util.zip包在Java中进行压缩和解压。但我们没有标准的Java库来创建受密码保护的zip文件。</p>\\n<p>在本教程中，我们将学习如何使用Zip4j库创建受密码保护的zip文件以及解压它们。它是Java中最全面的zip文件库。</p>\\n<ol start=\\"2\\">\\n<li>依赖性</li>\\n</ol>\\n<p>让我们首先将zip4j依赖项添加到我们的pom.xml文件中：</p>\\n<div class=\\"language-xml\\" data-ext=\\"xml\\" data-title=\\"xml\\"><pre class=\\"language-xml\\"><code>`<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>dependency</span><span class=\\"token punctuation\\">&gt;</span></span>`\\n    `<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>groupId</span><span class=\\"token punctuation\\">&gt;</span></span>`net.lingala.zip4j`<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>groupId</span><span class=\\"token punctuation\\">&gt;</span></span>`\\n    `<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>artifactId</span><span class=\\"token punctuation\\">&gt;</span></span>`zip4j`<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>artifactId</span><span class=\\"token punctuation\\">&gt;</span></span>`\\n    `<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>version</span><span class=\\"token punctuation\\">&gt;</span></span>`2.11.5`<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>version</span><span class=\\"token punctuation\\">&gt;</span></span>`\\n`<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>dependency</span><span class=\\"token punctuation\\">&gt;</span></span>`\\n</code></pre></div>","autoDesc":true}');export{k as comp,d as data};
