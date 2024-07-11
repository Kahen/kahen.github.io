import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-BEVMBw2k.js";const p={},e=t(`<h1 id="java中读取文件并将其拆分为多个文件" tabindex="-1"><a class="header-anchor" href="#java中读取文件并将其拆分为多个文件"><span>Java中读取文件并将其拆分为多个文件</span></a></h1><p>在本教程中，我们将学习如何在Java中拆分大文件。首先，我们将比较将文件完整加载到内存中与使用流的方式读取文件。之后，我们将学习基于文件大小和数量来拆分文件。</p><h2 id="_2-内存中读取文件与流式读取文件" tabindex="-1"><a class="header-anchor" href="#_2-内存中读取文件与流式读取文件"><span>2. 内存中读取文件与流式读取文件</span></a></h2><p>当我们将文件完整加载到内存中时，JVM会将所有行保留在内存中。这对于小文件是一个很好的选择。然而，对于大文件来说，这经常会导致<code>OutOfMemoryException</code>。</p><p>流式读取文件是另一种读取方式，并且有很多方法可以流式读取大文件。<strong>由于整个文件并不在内存中，它消耗的内存更少，并且可以很好地处理大文件而不抛出异常。</strong></p><p>在我们的示例中，我们将使用流来读取大文件。</p><h2 id="_3-按文件大小拆分文件" tabindex="-1"><a class="header-anchor" href="#_3-按文件大小拆分文件"><span>3. 按文件大小拆分文件</span></a></h2><p>虽然我们到目前为止已经学会了如何读取大文件，但有时我们需要将它们拆分成更小的文件或以更小的尺寸通过网络发送。</p><p>首先，我们将从将大文件拆分成具有特定大小的更小文件开始。</p><p>以我们的例子为例，我们将采用一个4.3MB的文件<code>largeFile.txt</code>，它位于我们项目的<code>src/main/resource</code>文件夹中，并将其拆分成每个1MB的文件，并将它们存储在<code>/target/split</code>目录下。</p><p>让我们首先<strong>获取大文件并打开它的输入流</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">File</span> largeFile <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">File</span><span class="token punctuation">(</span><span class="token string">&quot;LARGE_FILE_PATH&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">InputStream</span> inputstream <span class="token operator">=</span> <span class="token class-name">Files</span><span class="token punctuation">.</span><span class="token function">newInputStream</span><span class="token punctuation">(</span>largeFile<span class="token punctuation">.</span><span class="token function">toPath</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们只是加载文件元数据，大文件的内容还没有加载到内存中。</p><p>对于我们的例子，我们有一个固定的常量大小。在实际使用案例中，这个<code>maxSizeOfSplitFiles</code>值可以根据应用程序的需要动态读取和更改。</p><p>现在，让我们<strong>有一个方法，它接受<code>largeFile</code>对象和一个定义的<code>maxSizeOfSplitFiles</code>来拆分文件</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">List</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">File</span><span class="token punctuation">&gt;</span></span>\`\`\`\` <span class="token function">splitByFileSize</span><span class="token punctuation">(</span><span class="token class-name">File</span> largeFile<span class="token punctuation">,</span> <span class="token keyword">int</span> maxSizeOfSplitFiles<span class="token punctuation">,</span> <span class="token class-name">String</span> splitFileDirPath<span class="token punctuation">)</span>
  <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们创建一个<code>SplitLargeFile</code>类和<code>splitByFileSize()</code>方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">SplitLargeFile</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token class-name">List</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">File</span><span class="token punctuation">&gt;</span></span>\`\`\`\` <span class="token function">splitByFileSize</span><span class="token punctuation">(</span><span class="token class-name">File</span> largeFile<span class="token punctuation">,</span> <span class="token keyword">int</span> maxSizeOfSplitFiles<span class="token punctuation">,</span> <span class="token class-name">String</span> splitFileDirPath<span class="token punctuation">)</span>
      <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>

        <span class="token class-name">List</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">File</span><span class="token punctuation">&gt;</span></span>\`\`\`\` listOfSplitFiles <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">InputStream</span> in <span class="token operator">=</span> <span class="token class-name">Files</span><span class="token punctuation">.</span><span class="token function">newInputStream</span><span class="token punctuation">(</span>largeFile<span class="token punctuation">.</span><span class="token function">toPath</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">final</span> <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> buffer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">byte</span><span class="token punctuation">[</span>maxSizeOfSplitFiles<span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token keyword">int</span> dataRead <span class="token operator">=</span> in<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span>buffer<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">while</span> <span class="token punctuation">(</span>dataRead <span class="token operator">&gt;</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token class-name">File</span> splitFile <span class="token operator">=</span> <span class="token function">getSplitFile</span><span class="token punctuation">(</span><span class="token class-name">FilenameUtils</span><span class="token punctuation">.</span><span class="token function">removeExtension</span><span class="token punctuation">(</span>largeFile<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                  buffer<span class="token punctuation">,</span> dataRead<span class="token punctuation">,</span> splitFileDirPath<span class="token punctuation">)</span><span class="token punctuation">;</span>
                listOfSplitFiles<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>splitFile<span class="token punctuation">)</span><span class="token punctuation">;</span>
                dataRead <span class="token operator">=</span> in<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span>buffer<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> listOfSplitFiles<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token class-name">File</span> <span class="token function">getSplitFile</span><span class="token punctuation">(</span><span class="token class-name">String</span> largeFileName<span class="token punctuation">,</span> <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> buffer<span class="token punctuation">,</span> <span class="token keyword">int</span> length<span class="token punctuation">,</span> <span class="token class-name">String</span> splitFileDirPath<span class="token punctuation">)</span>
      <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>

        <span class="token class-name">File</span> splitFile <span class="token operator">=</span> <span class="token class-name">File</span><span class="token punctuation">.</span><span class="token function">createTempFile</span><span class="token punctuation">(</span>largeFileName <span class="token operator">+</span> <span class="token string">&quot;-&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;-split&quot;</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">File</span><span class="token punctuation">(</span>splitFileDirPath<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">FileOutputStream</span> fos <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileOutputStream</span><span class="token punctuation">(</span>splitFile<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            fos<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>buffer<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> length<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> splitFile<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用<code>maxSizeOfSplitFiles</code>，我们可以指定每个较小的文件块可以有多少字节。</p><p>**<code>maxSizeOfSplitFiles</code>的数据量将被加载到内存中，处理，并制成一个小文件。然后我们丢弃它。**我们读取下一组<code>maxSizeOfSplitFiles</code>数据。这确保了不会抛出<code>OutOfMemoryException</code>。</p><p>作为最后一步，该方法返回存储在<code>splitFileDirPath</code>下的拆分文件列表。</p><p>我们可以将拆分的文件存储在任何临时目录或任何自定义目录中。</p><p>现在，让我们测试一下：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SplitLargeFileUnitTest</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@BeforeClass</span>
    <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">prepareData</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
        <span class="token class-name">Files</span><span class="token punctuation">.</span><span class="token function">createDirectories</span><span class="token punctuation">(</span><span class="token class-name">Paths</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;target/split&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> <span class="token function">splitFileDirPath</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">Paths</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;target&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;/split&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token class-name">Path</span> <span class="token function">largeFilePath</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">Paths</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getClassLoader</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getResource</span><span class="token punctuation">(</span><span class="token string">&quot;largeFile.txt&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toURI</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">void</span> <span class="token function">givenLargeFile_whenSplitLargeFile_thenSplitBySize</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token class-name">File</span> input <span class="token operator">=</span> <span class="token function">largeFilePath</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toFile</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">SplitLargeFile</span> slf <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SplitLargeFile</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        slf<span class="token punctuation">.</span><span class="token function">splitByFileSize</span><span class="token punctuation">(</span>input<span class="token punctuation">,</span> <span class="token number">1024_000</span><span class="token punctuation">,</span> <span class="token function">splitFileDirPath</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，一旦我们测试，我们可以看到程序将大文件拆分成四个1MB的文件和一个240KB的文件，并将它们放在项目<code>target/split</code>目录下。</p><h2 id="_4-按文件数量拆分文件" tabindex="-1"><a class="header-anchor" href="#_4-按文件数量拆分文件"><span>4. 按文件数量拆分文件</span></a></h2><p>现在，让我们将给定的大文件拆分成指定数量的更小的文件。为此，首先，我们将<strong>检查小文件的大小是否适合根据计数的文件数量</strong>。</p><p>同样，我们将使用前面相同的<code>splitByFileSize()</code>方法来实际进行拆分。</p><p>让我们创建一个<code>splitByNumberOfFiles()</code>方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">SplitLargeFile</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token class-name">List</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">File</span><span class="token punctuation">&gt;</span></span>\`\`\`\` <span class="token function">splitByNumberOfFiles</span><span class="token punctuation">(</span><span class="token class-name">File</span> largeFile<span class="token punctuation">,</span> <span class="token keyword">int</span> noOfFiles<span class="token punctuation">,</span> <span class="token class-name">String</span> splitFileDirPath<span class="token punctuation">)</span>
      <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">splitByFileSize</span><span class="token punctuation">(</span>largeFile<span class="token punctuation">,</span> <span class="token function">getSizeInBytes</span><span class="token punctuation">(</span>largeFile<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> noOfFiles<span class="token punctuation">)</span><span class="token punctuation">,</span> splitFileDirPath<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">int</span> <span class="token function">getSizeInBytes</span><span class="token punctuation">(</span><span class="token keyword">long</span> largefileSizeInBytes<span class="token punctuation">,</span> <span class="token keyword">int</span> numberOfFilesforSplit<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>largefileSizeInBytes <span class="token operator">%</span> numberOfFilesforSplit <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            largefileSizeInBytes <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>largefileSizeInBytes <span class="token operator">/</span> numberOfFilesforSplit<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">*</span> numberOfFilesforSplit<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">long</span> x <span class="token operator">=</span> largefileSizeInBytes <span class="token operator">/</span> numberOfFilesforSplit<span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>x <span class="token operator">&gt;</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token constant">MAX_VALUE</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">NumberFormatException</span><span class="token punctuation">(</span><span class="token string">&quot;size too large&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span> x<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们测试一下：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenLargeFile_whenSplitLargeFile_thenSplitByNumberOfFiles</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
    <span class="token class-name">File</span> input <span class="token operator">=</span> <span class="token function">largeFilePath</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toFile</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">SplitLargeFile</span> slf <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SplitLargeFile</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    slf<span class="token punctuation">.</span><span class="token function">splitByNumberOfFiles</span><span class="token punctuation">(</span>input<span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token function">splitFileDirPath</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，一旦我们测试，我们可以看到程序将大文件拆分成3个1.4MB的文件，并将其放在项目<code>target/split</code>目录下。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们看到了在内存中读取文件和通过流读取文件之间的区别，这有助于我们为任何用例选择适当的方法。之后，我们讨论了如何将大文件拆分成小文件。然后，我们学习了按大小拆分和按文件数量拆分。</p><p>正如往常一样，本文中使用的所有示例代码都在GitHub上。</p>`,36),o=[e];function c(l,i){return a(),s("div",null,o)}const r=n(p,[["render",c],["__file","2024-06-25-Read a File and Split It Into Multiple Files in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-06-25/2024-06-25-Read%20a%20File%20and%20Split%20It%20Into%20Multiple%20Files%20in%20Java.html","title":"Java中读取文件并将其拆分为多个文件","lang":"zh-CN","frontmatter":{"date":"2024-06-25T00:00:00.000Z","category":["Java","文件处理"],"tag":["Java","文件分割"],"head":[["meta",{"name":"keywords","content":"Java, 文件处理, 文件分割"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-25/2024-06-25-Read%20a%20File%20and%20Split%20It%20Into%20Multiple%20Files%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中读取文件并将其拆分为多个文件"}],["meta",{"property":"og:description","content":"Java中读取文件并将其拆分为多个文件 在本教程中，我们将学习如何在Java中拆分大文件。首先，我们将比较将文件完整加载到内存中与使用流的方式读取文件。之后，我们将学习基于文件大小和数量来拆分文件。 2. 内存中读取文件与流式读取文件 当我们将文件完整加载到内存中时，JVM会将所有行保留在内存中。这对于小文件是一个很好的选择。然而，对于大文件来说，这经..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-25T15:51:36.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"文件分割"}],["meta",{"property":"article:published_time","content":"2024-06-25T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-25T15:51:36.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中读取文件并将其拆分为多个文件\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-25T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-25T15:51:36.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中读取文件并将其拆分为多个文件 在本教程中，我们将学习如何在Java中拆分大文件。首先，我们将比较将文件完整加载到内存中与使用流的方式读取文件。之后，我们将学习基于文件大小和数量来拆分文件。 2. 内存中读取文件与流式读取文件 当我们将文件完整加载到内存中时，JVM会将所有行保留在内存中。这对于小文件是一个很好的选择。然而，对于大文件来说，这经..."},"headers":[{"level":2,"title":"2. 内存中读取文件与流式读取文件","slug":"_2-内存中读取文件与流式读取文件","link":"#_2-内存中读取文件与流式读取文件","children":[]},{"level":2,"title":"3. 按文件大小拆分文件","slug":"_3-按文件大小拆分文件","link":"#_3-按文件大小拆分文件","children":[]},{"level":2,"title":"4. 按文件数量拆分文件","slug":"_4-按文件数量拆分文件","link":"#_4-按文件数量拆分文件","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1719330696000,"updatedTime":1719330696000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.11,"words":1232},"filePathRelative":"posts/baeldung/2024-06-25/2024-06-25-Read a File and Split It Into Multiple Files in Java.md","localizedDate":"2024年6月25日","excerpt":"\\n<p>在本教程中，我们将学习如何在Java中拆分大文件。首先，我们将比较将文件完整加载到内存中与使用流的方式读取文件。之后，我们将学习基于文件大小和数量来拆分文件。</p>\\n<h2>2. 内存中读取文件与流式读取文件</h2>\\n<p>当我们将文件完整加载到内存中时，JVM会将所有行保留在内存中。这对于小文件是一个很好的选择。然而，对于大文件来说，这经常会导致<code>OutOfMemoryException</code>。</p>\\n<p>流式读取文件是另一种读取方式，并且有很多方法可以流式读取大文件。<strong>由于整个文件并不在内存中，它消耗的内存更少，并且可以很好地处理大文件而不抛出异常。</strong></p>","autoDesc":true}');export{r as comp,d as data};
