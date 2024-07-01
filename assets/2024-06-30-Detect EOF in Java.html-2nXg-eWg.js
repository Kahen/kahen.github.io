import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-CZdUP17Q.js";const e={},p=t(`<h1 id="java中检测文件结束的几种方法" tabindex="-1"><a class="header-anchor" href="#java中检测文件结束的几种方法"><span>Java中检测文件结束的几种方法</span></a></h1><p>EOF（文件结束）是指在读取文件时，已经到达文件的末尾的状态。理解EOF检测对于某些应用程序来说至关重要，因为这些应用程序可能需要读取配置文件、处理数据或验证文件。在Java中，有几种方法可以检测到EOF。</p><p>在本教程中，我们将探索Java中检测EOF的几种方法。</p><h2 id="_2-示例设置" tabindex="-1"><a class="header-anchor" href="#_2-示例设置"><span>2. 示例设置</span></a></h2><p>在我们继续之前，让我们首先创建一个包含测试用例数据的示例文本文件：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token annotation punctuation">@Order</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">prepareFileForTest</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">File</span> file <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">File</span><span class="token punctuation">(</span>pathToFile<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>file<span class="token punctuation">.</span><span class="token function">exists</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            file<span class="token punctuation">.</span><span class="token function">createNewFile</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">FileWriter</span> writer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileWriter</span><span class="token punctuation">(</span>file<span class="token punctuation">)</span><span class="token punctuation">;</span>
            writer<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span><span class="token constant">LOREM_IPSUM</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            writer<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IOException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个方法必须在其他方法之前运行，因为它确保了测试文件的存在。因此，我们添加了<code>@Order(0)</code>注解。</p><h2 id="_3-使用fileinputstream检测eof" tabindex="-1"><a class="header-anchor" href="#_3-使用fileinputstream检测eof"><span>3. 使用<code>FileInputStream</code>检测EOF</span></a></h2><p>在第一种方法中，我们将使用<code>FileInputStream</code>，它是<code>InputStream</code>的一个子类。</p><p><code>FileInputStream</code>有一个<code>read()</code>方法，它逐字节地读取数据，当它到达EOF时，会产生一个<code>-1</code>的值。</p><p>让我们将测试文件读取到文件末尾，并将数据存储在一个<code>ByteArrayOutputStream</code>对象中：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> <span class="token function">readWithFileInputStream</span><span class="token punctuation">(</span><span class="token class-name">String</span> pathFile<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">FileInputStream</span> fis <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileInputStream</span><span class="token punctuation">(</span>pathFile<span class="token punctuation">)</span><span class="token punctuation">;</span>
         <span class="token class-name">ByteArrayOutputStream</span> baos <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ByteArrayOutputStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> data<span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>data <span class="token operator">=</span> fis<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            baos<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> baos<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们创建一个单元测试并确保测试通过：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token annotation punctuation">@Order</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenDummyText_whenReadWithFileInputStream_thenReturnText</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> actualText <span class="token operator">=</span> eofDetection<span class="token punctuation">.</span><span class="token function">readWithFileInputStream</span><span class="token punctuation">(</span>pathToFile<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token constant">LOREM_IPSUM</span><span class="token punctuation">,</span> actualText<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IOException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">fail</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>FileInputStream</code>的优点在于效率——它非常快。不幸的是，没有按行读取文本的方法，所以在读取文本文件的情况下，我们必须将字节转换为字符。</p><p>因此，这种方法<strong>适用于读取二进制数据，并在字节逐字节处理方面提供灵活性</strong>。但是，如果我们想要以结构化格式读取文本数据，则需要更多的数据转换代码。</p><h2 id="_4-使用bufferedreader检测eof" tabindex="-1"><a class="header-anchor" href="#_4-使用bufferedreader检测eof"><span>4. 使用<code>BufferedReader</code>检测EOF</span></a></h2><p><code>BufferedReader</code>是<code>java.io</code>包中的一个类，用于从输入流中读取文本。<code>BufferedReader</code>的工作方式是通过<strong>缓冲或临时将数据存储在内存中</strong>。</p><p>在<code>BufferedReader</code>中，有一个<code>readline()</code>方法，它逐行读取文件，并在到达EOF时返回一个<code>null</code>值：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> <span class="token function">readWithBufferedReader</span><span class="token punctuation">(</span><span class="token class-name">String</span> pathFile<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">FileInputStream</span> fis <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileInputStream</span><span class="token punctuation">(</span>pathFile<span class="token punctuation">)</span><span class="token punctuation">;</span>
         <span class="token class-name">InputStreamReader</span> isr <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">InputStreamReader</span><span class="token punctuation">(</span>fis<span class="token punctuation">)</span><span class="token punctuation">;</span>
         <span class="token class-name">BufferedReader</span> reader <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BufferedReader</span><span class="token punctuation">(</span>isr<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">StringBuilder</span> actualContent <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> line<span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>line <span class="token operator">=</span> reader<span class="token punctuation">.</span><span class="token function">readLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            actualContent<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span>line<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> actualContent<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，文件的内容是通过<code>readLine()</code>方法逐行读取的。然后，结果存储在<code>actualContent</code>变量中，直到它产生一个<code>null</code>值，这表示EOF。</p><p>接下来，让我们进行测试以确保结果的准确性：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token annotation punctuation">@Order</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenDummyText_whenReadWithBufferedReader_thenReturnText</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> actualText <span class="token operator">=</span> eofDetection<span class="token punctuation">.</span><span class="token function">readWithBufferedReader</span><span class="token punctuation">(</span>pathToFile<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token constant">LOREM_IPSUM</span><span class="token punctuation">,</span> actualText<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IOException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">fail</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于我们有<code>readLine()</code>方法，这种技术<strong>非常适合以结构化格式读取文本数据</strong>，例如CSV。然而，它不适合读取二进制数据。</p><h2 id="_5-使用scanner检测eof" tabindex="-1"><a class="header-anchor" href="#_5-使用scanner检测eof"><span>5. 使用<code>Scanner</code>检测EOF</span></a></h2><p><code>Scanner</code>是<code>java.util</code>包中的一个类，可以用来读取各种类型的数据输入，如文本、整数等。</p><p><code>Scanner</code><strong>提供了一个<code>hasNext()</code>方法，用于读取文件的全部内容</strong>，直到它产生一个<code>false</code>值，这表示EOF：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> <span class="token function">readWithScanner</span><span class="token punctuation">(</span><span class="token class-name">String</span> pathFile<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span><span class="token punctuation">{</span>
    <span class="token class-name">StringBuilder</span> actualContent <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">File</span> file <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">File</span><span class="token punctuation">(</span>pathFile<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Scanner</span> scanner <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Scanner</span><span class="token punctuation">(</span>file<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>scanner<span class="token punctuation">.</span><span class="token function">hasNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> line <span class="token operator">=</span> scanner<span class="token punctuation">.</span><span class="token function">nextLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        actualContent<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span>line<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> actualContent<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以观察到<code>scanner</code>是如何读取文件的，只要<code>hasNext()</code>评估为<code>true</code>。这意味着我们可以使用<code>nextLine()</code>方法从扫描器中检索字符串值，直到<code>hasNext()</code>评估为<code>false</code>，表示我们已经到达了EOF。</p><p>让我们测试以确保该方法正确工作：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token annotation punctuation">@Order</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenDummyText_whenReadWithScanner_thenReturnText</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> actualText <span class="token operator">=</span> eofDetection<span class="token punctuation">.</span><span class="token function">readWithScanner</span><span class="token punctuation">(</span>pathToFile<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token constant">LOREM_IPSUM</span><span class="token punctuation">,</span> actualText<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IOException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">fail</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种方法的优点是<strong>非常灵活，可以轻松读取各种类型的数据</strong>，但对二进制数据来说并不理想。然而，它的性能可能略低于<code>BufferedReader</code>，并且不适合读取二进制数据。</p><h2 id="_6-使用filechannel和bytebuffer检测eof" tabindex="-1"><a class="header-anchor" href="#_6-使用filechannel和bytebuffer检测eof"><span>6. 使用<code>FileChannel</code>和<code>ByteBuffer</code>检测EOF</span></a></h2><p><code>FileChannel</code>和<code>ByteBuffer</code>是Java NIO（New I/O）中的类，是对传统I/O的改进。</p><p><code>FileChannel</code>函数用于处理文件输入和输出操作，而<code>ByteBuffer</code>用于高效地以字节数组的形式处理二进制数据。</p><p>对于EOF检测，我们将使用这两个类——<code>FileChannel</code>来读取文件，<code>ByteBuffer</code>来存储结果。我们使用的方法<strong>是读取缓冲区直到它返回-1的值，这表示文件的末尾（EOF）</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> <span class="token function">readFileWithFileChannelAndByteBuffer</span><span class="token punctuation">(</span><span class="token class-name">String</span> pathFile<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">FileInputStream</span> fis <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileInputStream</span><span class="token punctuation">(</span>pathFile<span class="token punctuation">)</span><span class="token punctuation">;</span>
         <span class="token class-name">FileChannel</span> channel <span class="token operator">=</span> fis<span class="token punctuation">.</span><span class="token function">getChannel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">ByteBuffer</span> buffer <span class="token operator">=</span> <span class="token class-name">ByteBuffer</span><span class="token punctuation">.</span><span class="token function">allocate</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span> channel<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>channel<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span>buffer<span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            buffer<span class="token punctuation">.</span><span class="token function">flip</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            buffer<span class="token punctuation">.</span><span class="token function">clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token class-name">StandardCharsets</span><span class="token punctuation">.</span><span class="token constant">UTF_8</span><span class="token punctuation">.</span><span class="token function">decode</span><span class="token punctuation">(</span>buffer<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这一次，我们不需要使用<code>StringBuilder</code>，因为我们可以从转换或解码的<code>ByteBuffer</code>对象中获取读取文件的结果。</p><p>让我们再次测试以确保该方法工作：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token annotation punctuation">@Order</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenDummyText_whenReadWithFileChannelAndByteBuffer_thenReturnText</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> actualText <span class="token operator">=</span> eofDetection<span class="token punctuation">.</span><span class="token function">readFileWithFileChannelAndByteBuffer</span><span class="token punctuation">(</span>pathToFile<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token constant">LOREM_IPSUM</span><span class="token punctuation">,</span> actualText<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IOException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">fail</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种方法<strong>在读取或写入文件数据时提供高性能</strong>，<strong>适合随机访问，并支持<code>MappedByteBuffer</code></strong>。然而，它的使用更为复杂，需要仔细管理缓冲区。</p><p>它特别适合读取二进制数据和需要随机文件访问的应用程序。</p><h2 id="_7-fileinputstream与bufferedreader与scanner与filechannel和bytebuffer的比较" tabindex="-1"><a class="header-anchor" href="#_7-fileinputstream与bufferedreader与scanner与filechannel和bytebuffer的比较"><span>7. <code>FileInputStream</code>与<code>BufferedReader</code>与<code>Scanner</code>与<code>FileChannel</code>和<code>ByteBuffer</code>的比较</span></a></h2><p>下表总结了四种方法之间的比较，每种方法都有其优缺点：</p><table><thead><tr><th>特性</th><th>FileInputStream</th><th>BufferedReader</th><th>Scanner</th><th>FileChannel 和 ByteBuffer</th></tr></thead><tbody><tr><td><strong>数据类型</strong></td><td>二进制</td><td>结构化文本</td><td>结构化文本</td><td>二进制</td></tr><tr><td><strong>性能</strong></td><td>好</td><td>好</td><td>好</td><td>极好</td></tr><tr><td><strong>灵活性</strong></td><td>高</td><td>中等</td><td>高</td><td>低</td></tr><tr><td><strong>易用性</strong></td><td>低</td><td>高</td><td>高</td><td>低</td></tr></tbody></table><h2 id="_8-结论" tabindex="-1"><a class="header-anchor" href="#_8-结论"><span>8. 结论</span></a></h2><p>在本文中，我们学习了Java中检测EOF的四种方法。</p><p>每种方法都有其优缺点。正确的选择取决于我们应用程序的具体需求，无论是涉及读取结构化文本数据还是二进制数据，以及在我们的用例中性能的重要性如何。</p><p>如常，完整的源代码可以在GitHub上找到。</p>`,49),c=[p];function o(l,i){return s(),a("div",null,c)}const d=n(e,[["render",o],["__file","2024-06-30-Detect EOF in Java.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-06-30/2024-06-30-Detect%20EOF%20in%20Java.html","title":"Java中检测文件结束的几种方法","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","I/O"],"tag":["EOF","FileInputStream","BufferedReader","Scanner","FileChannel"],"head":[["meta",{"name":"keywords","content":"Java, EOF, FileInputStream, BufferedReader, Scanner, FileChannel, ByteBuffer"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-30/2024-06-30-Detect%20EOF%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中检测文件结束的几种方法"}],["meta",{"property":"og:description","content":"Java中检测文件结束的几种方法 EOF（文件结束）是指在读取文件时，已经到达文件的末尾的状态。理解EOF检测对于某些应用程序来说至关重要，因为这些应用程序可能需要读取配置文件、处理数据或验证文件。在Java中，有几种方法可以检测到EOF。 在本教程中，我们将探索Java中检测EOF的几种方法。 2. 示例设置 在我们继续之前，让我们首先创建一个包含测..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-30T06:53:20.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"EOF"}],["meta",{"property":"article:tag","content":"FileInputStream"}],["meta",{"property":"article:tag","content":"BufferedReader"}],["meta",{"property":"article:tag","content":"Scanner"}],["meta",{"property":"article:tag","content":"FileChannel"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-30T06:53:20.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中检测文件结束的几种方法\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-30T06:53:20.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中检测文件结束的几种方法 EOF（文件结束）是指在读取文件时，已经到达文件的末尾的状态。理解EOF检测对于某些应用程序来说至关重要，因为这些应用程序可能需要读取配置文件、处理数据或验证文件。在Java中，有几种方法可以检测到EOF。 在本教程中，我们将探索Java中检测EOF的几种方法。 2. 示例设置 在我们继续之前，让我们首先创建一个包含测..."},"headers":[{"level":2,"title":"2. 示例设置","slug":"_2-示例设置","link":"#_2-示例设置","children":[]},{"level":2,"title":"3. 使用FileInputStream检测EOF","slug":"_3-使用fileinputstream检测eof","link":"#_3-使用fileinputstream检测eof","children":[]},{"level":2,"title":"4. 使用BufferedReader检测EOF","slug":"_4-使用bufferedreader检测eof","link":"#_4-使用bufferedreader检测eof","children":[]},{"level":2,"title":"5. 使用Scanner检测EOF","slug":"_5-使用scanner检测eof","link":"#_5-使用scanner检测eof","children":[]},{"level":2,"title":"6. 使用FileChannel和ByteBuffer检测EOF","slug":"_6-使用filechannel和bytebuffer检测eof","link":"#_6-使用filechannel和bytebuffer检测eof","children":[]},{"level":2,"title":"7. FileInputStream与BufferedReader与Scanner与FileChannel和ByteBuffer的比较","slug":"_7-fileinputstream与bufferedreader与scanner与filechannel和bytebuffer的比较","link":"#_7-fileinputstream与bufferedreader与scanner与filechannel和bytebuffer的比较","children":[]},{"level":2,"title":"8. 结论","slug":"_8-结论","link":"#_8-结论","children":[]}],"git":{"createdTime":1719730400000,"updatedTime":1719730400000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.03,"words":1508},"filePathRelative":"posts/baeldung/2024-06-30/2024-06-30-Detect EOF in Java.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>EOF（文件结束）是指在读取文件时，已经到达文件的末尾的状态。理解EOF检测对于某些应用程序来说至关重要，因为这些应用程序可能需要读取配置文件、处理数据或验证文件。在Java中，有几种方法可以检测到EOF。</p>\\n<p>在本教程中，我们将探索Java中检测EOF的几种方法。</p>\\n<h2>2. 示例设置</h2>\\n<p>在我们继续之前，让我们首先创建一个包含测试用例数据的示例文本文件：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token annotation punctuation\\">@Test</span>\\n<span class=\\"token annotation punctuation\\">@Order</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">0</span><span class=\\"token punctuation\\">)</span>\\n<span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">void</span> <span class=\\"token function\\">prepareFileForTest</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token class-name\\">File</span> file <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">File</span><span class=\\"token punctuation\\">(</span>pathToFile<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\n    <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span><span class=\\"token operator\\">!</span>file<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">exists</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token keyword\\">try</span> <span class=\\"token punctuation\\">{</span>\\n            file<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">createNewFile</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n            <span class=\\"token class-name\\">FileWriter</span> writer <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">FileWriter</span><span class=\\"token punctuation\\">(</span>file<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n            writer<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">write</span><span class=\\"token punctuation\\">(</span><span class=\\"token constant\\">LOREM_IPSUM</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n            writer<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">close</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token punctuation\\">}</span> <span class=\\"token keyword\\">catch</span> <span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">IOException</span> e<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n            e<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">printStackTrace</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token punctuation\\">}</span>\\n    <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{d as comp,k as data};
