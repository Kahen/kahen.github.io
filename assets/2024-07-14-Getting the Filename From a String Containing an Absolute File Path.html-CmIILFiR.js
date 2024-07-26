import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-C4eFoh0f.js";const e={},p=t(`<h1 id="从包含绝对文件路径的字符串中获取文件名-baeldung" tabindex="-1"><a class="header-anchor" href="#从包含绝对文件路径的字符串中获取文件名-baeldung"><span>从包含绝对文件路径的字符串中获取文件名 | Baeldung</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>当我们在Java中处理文件时，我们经常需要从一个给定的绝对路径中提取文件名。</p><p>在本教程中，我们将探讨如何提取文件名。</p><h2 id="_2-问题介绍" tabindex="-1"><a class="header-anchor" href="#_2-问题介绍"><span>2. 问题介绍</span></a></h2><p>问题非常直接。想象一下，我们有一个绝对文件路径字符串。我们想要从中提取文件名。一些例子可以快速解释这个问题：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> <span class="token constant">PATH_LINUX</span> <span class="token operator">=</span> <span class="token string">&quot;/root/with space/subDir/myFile.linux&quot;</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> <span class="token constant">EXPECTED_FILENAME_LINUX</span> <span class="token operator">=</span> <span class="token string">&quot;myFile.linux&quot;</span><span class="token punctuation">;</span>

<span class="token class-name">String</span> <span class="token constant">PATH_WIN</span> <span class="token operator">=</span> <span class="token string">&quot;C:\\\\root\\\\with space\\\\subDir\\\\myFile.win&quot;</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> <span class="token constant">EXPECTED_FILENAME_WIN</span> <span class="token operator">=</span> <span class="token string">&quot;myFile.win&quot;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，<strong>不同的文件系统可能有不同的文件分隔符</strong>。因此，在本教程中，我们将解决一些平台无关的解决方案。换句话说，相同的实现将在*nix和Windows系统上工作。</p><p>为了简单起见，我们将使用单元测试断言来验证解决方案是否按预期工作。</p><p>接下来，让我们看看它们在行动中的表现。</p><h2 id="_3-将绝对路径作为字符串解析" tabindex="-1"><a class="header-anchor" href="#_3-将绝对路径作为字符串解析"><span>3. 将绝对路径作为字符串解析</span></a></h2><p>首先，<strong>文件系统不允许文件名包含文件分隔符</strong>。因此，例如，我们不能在Linux的Ext2、Ext3或Ext4文件系统上创建一个包含“/”的文件名：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">touch</span> <span class="token string">&quot;a/b.txt&quot;</span>
touch: cannot <span class="token function">touch</span> <span class="token string">&#39;a/b.txt&#39;</span><span class="token builtin class-name">:</span> No such <span class="token function">file</span> or directory
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的例子中，文件系统将“a/”视为一个目录。基于这个规则，解决这个问题的一个想法是<strong>从最后一个文件分隔符开始取出子字符串直到字符串的末尾</strong>。</p><p>String的_lastIndexOf()_方法返回该字符串中子字符串的最后索引。然后，我们可以通过调用_absolutePath.substring(lastIndex+1)_简单地获取文件名。</p><p>正如我们所看到的，实现是直接的。然而，我们应该注意到，为了使我们的解决方案系统无关，我们不应该将文件分隔符硬编码为Windows的“\\\\”或*nix系统的“/”。相反，<strong>让我们在代码中使用_File.separator_，以便我们的程序自动适应它运行的系统：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span> index <span class="token operator">=</span> <span class="token constant">PATH_LINUX</span><span class="token punctuation">.</span><span class="token function">lastIndexOf</span><span class="token punctuation">(</span><span class="token class-name">File</span><span class="token punctuation">.</span>separator<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> filenameLinux <span class="token operator">=</span> <span class="token constant">PATH_LINUX</span><span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span>index <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token constant">EXPECTED_FILENAME_LINUX</span><span class="token punctuation">,</span> filenameLinux<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们在Linux机器上运行上述测试，它会通过。类似地，下面的测试在Windows机器上也会通过：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span> index <span class="token operator">=</span> <span class="token constant">PATH_WIN</span><span class="token punctuation">.</span><span class="token function">lastIndexOf</span><span class="token punctuation">(</span><span class="token class-name">File</span><span class="token punctuation">.</span>pathSeparator<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> filenameWin <span class="token operator">=</span> <span class="token constant">PATH_WIN</span><span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span>index <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token constant">EXPECTED_FILENAME_WIN</span><span class="token punctuation">,</span> filenameWin<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，相同的实现在两个系统上都有效。</p><p>除了将绝对路径作为字符串解析之外，我们可以使用标准的_File_类来解决这个问题。</p><h2 id="_4-使用-file-getname-方法" tabindex="-1"><a class="header-anchor" href="#_4-使用-file-getname-方法"><span>4. 使用_File.getName()_方法</span></a></h2><p>_File_类提供了_getName()_方法直接获取文件名。此外，我们可以从给定的绝对路径字符串构造一个_File_对象。</p><p>让我们首先在Linux系统上测试它：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">File</span> fileLinux <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">File</span><span class="token punctuation">(</span><span class="token constant">PATH_LINUX</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token constant">EXPECTED_FILENAME_LINUX</span><span class="token punctuation">,</span> fileLinux<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们运行测试，它会通过。正如**<em>File_在内部使用_File.separator</em>**，如果我们在Windows系统上测试相同的解决方案，它也会通过：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">File</span> fileWin <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">File</span><span class="token punctuation">(</span><span class="token constant">PATH_WIN</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token constant">EXPECTED_FILENAME_WIN</span><span class="token punctuation">,</span> fileWin<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-使用-path-getfilename-方法" tabindex="-1"><a class="header-anchor" href="#_5-使用-path-getfilename-方法"><span>5. 使用_Path.getFileName()_方法</span></a></h2><p>_File_是_java.io_包的标准类。从Java 1.7开始，较新的_java.nio_库带有_Path_接口。</p><p>一旦我们有一个_Path_对象，我们可以通过调用_Path.getFileName()_方法来获取文件名。与_File_类不同，<strong>我们可以使用静态_Paths.get()_方法创建一个_Path_实例。</strong></p><p>接下来，让我们从给定的_PATH_LINUX_字符串创建一个_Path_实例，并在Linux上测试解决方案：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Path</span> pathLinux <span class="token operator">=</span> <span class="token class-name">Paths</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token constant">PATH_LINUX</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token constant">EXPECTED_FILENAME_LINUX</span><span class="token punctuation">,</span> pathLinux<span class="token punctuation">.</span><span class="token function">getFileName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>当我们执行测试时，它会通过。值得一提的是，<strong>_Path.getFileName()_返回一个_Path_对象</strong>。因此，我们明确调用_toString()_方法将其转换为字符串。</p><p>相同的实现在Windows系统上使用_PATH_WIN_作为路径字符串也有效。这是因为_Path_可以检测它运行的当前_FileSystem_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Path</span> pathWin <span class="token operator">=</span> <span class="token class-name">Paths</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token constant">PATH_WIN</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token constant">EXPECTED_FILENAME_WIN</span><span class="token punctuation">,</span> pathWin<span class="token punctuation">.</span><span class="token function">getFileName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-使用apache-commons-io中的-filenameutils-getname" tabindex="-1"><a class="header-anchor" href="#_6-使用apache-commons-io中的-filenameutils-getname"><span>6. 使用Apache Commons IO中的_FilenameUtils.getName()_</span></a></h2><p>到目前为止，我们已经讨论了三种从绝对路径中提取文件名的解决方案。正如我们提到的，它们是平台无关的。然而，所有这三种解决方案只有在给定的绝对路径与程序运行的系统相匹配时才正确。例如，我们的程序只有在Windows上运行时才能处理Windows路径。</p><h3 id="_6-1-智能-filenameutils-getname-方法" tabindex="-1"><a class="header-anchor" href="#_6-1-智能-filenameutils-getname-方法"><span>6.1. 智能_FilenameUtils.getName()_方法</span></a></h3><p>嗯，在实践中，解析不同系统路径格式的可能性相对较低。然而，<strong>Apache Commons IO的_FilenameUtils_类可以“智能”地从不同的路径格式中提取文件名</strong>。因此，如果我们的程序在Windows上运行，它也可以处理Linux文件路径，反之亦然。</p><p>接下来，让我们创建一个测试：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> filenameLinux <span class="token operator">=</span> <span class="token class-name">FilenameUtils</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token constant">PATH_LINUX</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token constant">EXPECTED_FILENAME_LINUX</span><span class="token punctuation">,</span> filenameLinux<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">String</span> filenameWin <span class="token operator">=</span> <span class="token class-name">FilenameUtils</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token constant">PATH_WIN</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token constant">EXPECTED_FILENAME_WIN</span><span class="token punctuation">,</span> filenameWin<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，上面的测试解析了_PATH_LINUX_和_PATH_WIN_。无论我们在Linux还是Windows上运行它，测试都会通过。</p><p>所以接下来，我们可能想知道_FilenameUtils_如何自动处理不同系统的路径。</p><h3 id="_6-2-filenameutils-getname-的工作原理" tabindex="-1"><a class="header-anchor" href="#_6-2-filenameutils-getname-的工作原理"><span>6.2. _FilenameUtils.getName()_的工作原理</span></a></h3><p>如果我们看看_FilenameUtils.getName()_的实现，它的逻辑与我们的“lastIndexOf”文件分隔符方法类似。不同之处在于_FilenameUtils_调用_lastIndexOf()_方法两次，一次使用*nix分隔符(/)，然后使用Windows文件分隔符(\\)。最后，它将较大的索引作为“lastIndex”：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token keyword">final</span> <span class="token keyword">int</span> lastUnixPos <span class="token operator">=</span> fileName<span class="token punctuation">.</span><span class="token function">lastIndexOf</span><span class="token punctuation">(</span><span class="token constant">UNIX_SEPARATOR</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// UNIX_SEPARATOR = &#39;/&#39;</span>
<span class="token keyword">final</span> <span class="token keyword">int</span> lastWindowsPos <span class="token operator">=</span> fileName<span class="token punctuation">.</span><span class="token function">lastIndexOf</span><span class="token punctuation">(</span><span class="token constant">WINDOWS_SEPARATOR</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// WINDOWS_SEPARATOR = &#39;\\\\&#39;</span>
<span class="token keyword">return</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span>lastUnixPos<span class="token punctuation">,</span> lastWindowsPos<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因此，<strong>_FilenameUtils.getName()_不检查当前文件系统或系统的文件分隔符</strong>。相反，它找到最后一个文件分隔符的索引，无论它属于哪个系统，然后从这个索引提取子字符串直到字符串的末尾作为最终结果。</p><h3 id="_6-3-使-filenameutils-getname-失败的边缘情况" tabindex="-1"><a class="header-anchor" href="#_6-3-使-filenameutils-getname-失败的边缘情况"><span>6.3. 使_FilenameUtils.getName()_失败的边缘情况</span></a></h3><p>现在我们了解了_FilenameUtils.getName()_的工作原理。这确实是一个聪明的解决方案，而且在大多数情况下都有效。然而，<strong>许多Linux支持的文件系统允许文件名包含反斜杠（‘\\’）</strong>：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token builtin class-name">echo</span> <span class="token string">&#39;Hi there!&#39;</span> <span class="token operator">&gt;</span> <span class="token string">&#39;my\\file.txt&#39;</span>

$ <span class="token function">ls</span> <span class="token parameter variable">-l</span> my*
-rw-r--r-- <span class="token number">1</span> kent kent <span class="token number">10</span> Sep <span class="token number">13</span> <span class="token number">23</span>:55 <span class="token string">&#39;my\\file.txt&#39;</span>

$ <span class="token function">cat</span> <span class="token string">&#39;my\\file.txt&#39;</span>
Hi there<span class="token operator">!</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果给定的Linux文件路径中的文件名包含反斜杠，_FilenameUtils.getName()_将失败。一个测试可以清楚地解释它：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> filenameToBreak <span class="token operator">=</span> <span class="token class-name">FilenameUtils</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token string">&quot;/root/somedir/magic\\\\file.txt&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertNotEquals</span><span class="token punctuation">(</span><span class="token string">&quot;magic\\\\file.txt&quot;</span><span class="token punctuation">,</span> filenameToBreak<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// &lt;-- filenameToBreak = &quot;file.txt&quot;, 但我们期望：magic\\file.txt</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>当我们使用这种方法时，我们应该记住这种情况。</p><h2 id="_7-结论" tabindex="-1"><a class="header-anchor" href="#_7-结论"><span>7. 结论</span></a></h2><p>在本文中，我们学习了如何从一个给定的绝对路径字符串中提取文件名。</p><p>如往常一样，示例的完整源代码可在GitHub上获得。</p>`,56),l=[p];function i(o,c){return s(),a("div",null,l)}const d=n(e,[["render",i],["__file","2024-07-14-Getting the Filename From a String Containing an Absolute File Path.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-07-14/2024-07-14-Getting%20the%20Filename%20From%20a%20String%20Containing%20an%20Absolute%20File%20Path.html","title":"从包含绝对文件路径的字符串中获取文件名 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","文件操作"],"tag":["Java","文件名","文件路径"],"head":[["meta",{"name":"keywords","content":"Java, 文件名提取, 文件路径解析"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-14/2024-07-14-Getting%20the%20Filename%20From%20a%20String%20Containing%20an%20Absolute%20File%20Path.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"从包含绝对文件路径的字符串中获取文件名 | Baeldung"}],["meta",{"property":"og:description","content":"从包含绝对文件路径的字符串中获取文件名 | Baeldung 1. 概述 当我们在Java中处理文件时，我们经常需要从一个给定的绝对路径中提取文件名。 在本教程中，我们将探讨如何提取文件名。 2. 问题介绍 问题非常直接。想象一下，我们有一个绝对文件路径字符串。我们想要从中提取文件名。一些例子可以快速解释这个问题： 正如我们所看到的，不同的文件系统可能..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-14T12:06:02.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"文件名"}],["meta",{"property":"article:tag","content":"文件路径"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-14T12:06:02.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"从包含绝对文件路径的字符串中获取文件名 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-14T12:06:02.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"从包含绝对文件路径的字符串中获取文件名 | Baeldung 1. 概述 当我们在Java中处理文件时，我们经常需要从一个给定的绝对路径中提取文件名。 在本教程中，我们将探讨如何提取文件名。 2. 问题介绍 问题非常直接。想象一下，我们有一个绝对文件路径字符串。我们想要从中提取文件名。一些例子可以快速解释这个问题： 正如我们所看到的，不同的文件系统可能..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 问题介绍","slug":"_2-问题介绍","link":"#_2-问题介绍","children":[]},{"level":2,"title":"3. 将绝对路径作为字符串解析","slug":"_3-将绝对路径作为字符串解析","link":"#_3-将绝对路径作为字符串解析","children":[]},{"level":2,"title":"4. 使用_File.getName()_方法","slug":"_4-使用-file-getname-方法","link":"#_4-使用-file-getname-方法","children":[]},{"level":2,"title":"5. 使用_Path.getFileName()_方法","slug":"_5-使用-path-getfilename-方法","link":"#_5-使用-path-getfilename-方法","children":[]},{"level":2,"title":"6. 使用Apache Commons IO中的_FilenameUtils.getName()_","slug":"_6-使用apache-commons-io中的-filenameutils-getname","link":"#_6-使用apache-commons-io中的-filenameutils-getname","children":[{"level":3,"title":"6.1. 智能_FilenameUtils.getName()_方法","slug":"_6-1-智能-filenameutils-getname-方法","link":"#_6-1-智能-filenameutils-getname-方法","children":[]},{"level":3,"title":"6.2. _FilenameUtils.getName()_的工作原理","slug":"_6-2-filenameutils-getname-的工作原理","link":"#_6-2-filenameutils-getname-的工作原理","children":[]},{"level":3,"title":"6.3. 使_FilenameUtils.getName()_失败的边缘情况","slug":"_6-3-使-filenameutils-getname-失败的边缘情况","link":"#_6-3-使-filenameutils-getname-失败的边缘情况","children":[]}]},{"level":2,"title":"7. 结论","slug":"_7-结论","link":"#_7-结论","children":[]}],"git":{"createdTime":1720958762000,"updatedTime":1720958762000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.74,"words":1723},"filePathRelative":"posts/baeldung/2024-07-14/2024-07-14-Getting the Filename From a String Containing an Absolute File Path.md","localizedDate":"2022年4月1日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>当我们在Java中处理文件时，我们经常需要从一个给定的绝对路径中提取文件名。</p>\\n<p>在本教程中，我们将探讨如何提取文件名。</p>\\n<h2>2. 问题介绍</h2>\\n<p>问题非常直接。想象一下，我们有一个绝对文件路径字符串。我们想要从中提取文件名。一些例子可以快速解释这个问题：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token class-name\\">String</span> <span class=\\"token constant\\">PATH_LINUX</span> <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\\"/root/with space/subDir/myFile.linux\\"</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token class-name\\">String</span> <span class=\\"token constant\\">EXPECTED_FILENAME_LINUX</span> <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\\"myFile.linux\\"</span><span class=\\"token punctuation\\">;</span>\\n\\n<span class=\\"token class-name\\">String</span> <span class=\\"token constant\\">PATH_WIN</span> <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\\"C:\\\\\\\\root\\\\\\\\with space\\\\\\\\subDir\\\\\\\\myFile.win\\"</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token class-name\\">String</span> <span class=\\"token constant\\">EXPECTED_FILENAME_WIN</span> <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\\"myFile.win\\"</span><span class=\\"token punctuation\\">;</span>\\n</code></pre></div>","autoDesc":true}');export{d as comp,m as data};
