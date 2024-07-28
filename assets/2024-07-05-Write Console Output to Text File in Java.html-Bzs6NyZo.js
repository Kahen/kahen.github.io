import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-D4B8YWfq.js";const e={},p=t(`<h1 id="java中将控制台输出写入文本文件" tabindex="-1"><a class="header-anchor" href="#java中将控制台输出写入文本文件"><span>Java中将控制台输出写入文本文件</span></a></h1><p>在调试或向用户显示信息时，将输出打印到控制台是常见的做法。然而，有时可能需要将控制台输出保存到文本文件中，以便进一步分析或记录。</p><p>本教程将探讨如何在Java中将控制台输出重定向到文本文件。</p><h2 id="_2-准备" tabindex="-1"><a class="header-anchor" href="#_2-准备"><span>2. 准备</span></a></h2><p>当我们谈论将控制台输出写入文本文件时，可能有两种情况：</p><ul><li>仅文件 - 将所有输出重定向到文件。不会在控制台打印任何输出。</li><li>控制台和文件 - 输出同时写入控制台和文件。</li></ul><p>我们将在本教程中涵盖这两种情况。</p><p>在我们开始编码之前，让我们准备一些要写入控制台的文本。为了更容易测试，让我们将三行文本放入字符串列表中：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">final</span> <span class="token keyword">static</span> <span class="token class-name">List</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\` <span class="token constant">OUTPUT_LINES</span> <span class="token operator">=</span> <span class="token class-name">Lists</span><span class="token punctuation">.</span><span class="token function">newArrayList</span><span class="token punctuation">(</span>
  <span class="token string">&quot;I came&quot;</span><span class="token punctuation">,</span>
  <span class="token string">&quot;I saw&quot;</span><span class="token punctuation">,</span>
  <span class="token string">&quot;I conquered&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>稍后，我们将讨论如何将控制台的输出重定向到文件。因此，我们将使用单元测试断言来验证文件是否包含预期的内容。</p><p><strong>JUnit 5的临时目录特性允许我们创建文件，向文件写入数据，并在验证后自动删除文件</strong>。因此，我们将在测试中使用它。</p><p>接下来，让我们看看如何实现重定向。</p><h2 id="_3-输出仅发送到文件" tabindex="-1"><a class="header-anchor" href="#_3-输出仅发送到文件"><span>3. 输出仅发送到文件</span></a></h2><p>我们通常使用<code>System.out.println()</code>将文本打印到控制台。<strong><code>System.out</code>是一个<code>PrintStream</code>，默认情况下是标准输出</strong>。<code>System</code>类提供了<code>setOut()</code>方法，允许我们用我们自己的<code>PrintStream</code>对象替换默认的“<code>out</code>”。</p><p><strong>由于我们想要将数据写入文件，我们可以从<code>FileOutputStream</code>创建一个<code>PrintStream</code>。</strong></p><p>接下来，让我们创建一个测试方法来查看这个想法是否有效：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenReplacingSystemOutPrintStreamWithFileOutputStream_thenOutputsGoToFile</span><span class="token punctuation">(</span><span class="token annotation punctuation">@TempDir</span> <span class="token class-name">Path</span> tempDir<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token class-name">PrintStream</span> originalOut <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">;</span>
    <span class="token class-name">Path</span> outputFilePath <span class="token operator">=</span> tempDir<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&quot;file-output.txt&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">PrintStream</span> out <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PrintStream</span><span class="token punctuation">(</span><span class="token class-name">Files</span><span class="token punctuation">.</span><span class="token function">newOutputStream</span><span class="token punctuation">(</span>outputFilePath<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">setOut</span><span class="token punctuation">(</span>out<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token constant">OUTPUT_LINES</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>line <span class="token operator">-&gt;</span> <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>line<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertTrue</span><span class="token punctuation">(</span>outputFilePath<span class="token punctuation">.</span><span class="token function">toFile</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">exists</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;The file exists&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertLinesMatch</span><span class="token punctuation">(</span><span class="token constant">OUTPUT_LINES</span><span class="token punctuation">,</span> <span class="token class-name">Files</span><span class="token punctuation">.</span><span class="token function">readAllLines</span><span class="token punctuation">(</span>outputFilePath<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">setOut</span><span class="token punctuation">(</span>originalOut<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在测试中，我们首先备份默认的<code>System.out</code>。然后，我们构造一个<code>PrintStream</code> <code>out</code>，它包装了一个<code>FileOutputStream</code>。接下来，我们用我们的“<code>out</code>”替换默认的<code>System.out</code>。</p><p>这些操作使得<code>System.out.println()</code>将数据打印到文件<code>file-output.txt</code>而不是控制台。<strong>我们使用<code>assertLinesMatch()</code>方法验证了文件内容。</strong></p><p>最后，我们将<code>System.out</code>恢复为默认状态。</p><p>如果我们运行测试，它会通过。此外，没有任何输出打印到控制台。</p><h2 id="_4-创建dualprintstream类" tabindex="-1"><a class="header-anchor" href="#_4-创建dualprintstream类"><span>4. 创建<code>DualPrintStream</code>类</span></a></h2><p>现在，让我们看看如何将数据打印到控制台和文件。换句话说，<strong>我们需要两个<code>PrintStream</code>对象</strong>。</p><p>由于<code>System.setOut()</code>只接受一个<code>PrintStream</code>参数，我们不能传递两个<code>PrintStream</code>。</p><p>然而，我们可以<strong>创建一个新的<code>PrintStream</code>子类来携带一个额外的<code>PrintStream</code>对象</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">DualPrintStream</span> <span class="token keyword">extends</span> <span class="token class-name">PrintStream</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">PrintStream</span> second<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">DualPrintStream</span><span class="token punctuation">(</span><span class="token class-name">OutputStream</span> main<span class="token punctuation">,</span> <span class="token class-name">PrintStream</span> second<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span>main<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>second <span class="token operator">=</span> second<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>DualPrintStream</code>扩展了<code>PrintStream</code>。进一步，我们可以将一个额外的<code>PrintStream</code>对象<code>(second)</code>传递给构造函数。然后，<strong>我们必须重写<code>PrintStream</code>的<code>write()</code>方法，以便第二个<code>PrintStream</code>可以附加相同的操作：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">DualPrintStream</span> <span class="token keyword">extends</span> <span class="token class-name">PrintStream</span> <span class="token punctuation">{</span>
    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">write</span><span class="token punctuation">(</span><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> b<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span>
        second<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们检查它是否按预期工作：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenUsingDualPrintStream_thenOutputsGoToConsoleAndFile</span><span class="token punctuation">(</span><span class="token annotation punctuation">@TempDir</span> <span class="token class-name">Path</span> tempDir<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token class-name">PrintStream</span> originalOut <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">;</span>
    <span class="token class-name">Path</span> outputFilePath <span class="token operator">=</span> tempDir<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&quot;dual-output.txt&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">DualPrintStream</span> dualOut <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DualPrintStream</span><span class="token punctuation">(</span><span class="token class-name">Files</span><span class="token punctuation">.</span><span class="token function">newOutputStream</span><span class="token punctuation">(</span>outputFilePath<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">setOut</span><span class="token punctuation">(</span>dualOut<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token constant">OUTPUT_LINES</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>line <span class="token operator">-&gt;</span> <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>line<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertTrue</span><span class="token punctuation">(</span>outputFilePath<span class="token punctuation">.</span><span class="token function">toFile</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">exists</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;The file exists&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertLinesMatch</span><span class="token punctuation">(</span><span class="token constant">OUTPUT_LINES</span><span class="token punctuation">,</span> <span class="token class-name">Files</span><span class="token punctuation">.</span><span class="token function">readAllLines</span><span class="token punctuation">(</span>outputFilePath<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">setOut</span><span class="token punctuation">(</span>originalOut<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当我们运行它时，它通过了，这意味着文本已经被写入文件。同时，我们也可以看到控制台中的三行文本。</p><p>最后，值得注意的是，<code>PrintStream</code>还有其他我们需要重写的方法，以保持文件和控制台流的同步，如<code>close()</code>、<code>flush()</code>和其他变体的<code>write()</code>。我们还应该重写<code>checkError()</code>方法，以优雅地管理<code>IOExceptions</code>。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们学习了如何通过替换默认的<code>System.out</code>，使<code>System.out.println()</code>将数据打印到文件。</p><p>像往常一样，这里展示的所有代码片段都可以在GitHub上找到。</p>`,35),o=[p];function c(i,l){return s(),a("div",null,o)}const d=n(e,[["render",c],["__file","2024-07-05-Write Console Output to Text File in Java.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-05/2024-07-05-Write%20Console%20Output%20to%20Text%20File%20in%20Java.html","title":"Java中将控制台输出写入文本文件","lang":"zh-CN","frontmatter":{"date":"2024-07-05T00:00:00.000Z","category":["Java","编程"],"tag":["Java","控制台输出","文件输出"],"head":[["meta",{"name":"keywords","content":"Java, 控制台输出, 文件输出, 重定向"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-05/2024-07-05-Write%20Console%20Output%20to%20Text%20File%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中将控制台输出写入文本文件"}],["meta",{"property":"og:description","content":"Java中将控制台输出写入文本文件 在调试或向用户显示信息时，将输出打印到控制台是常见的做法。然而，有时可能需要将控制台输出保存到文本文件中，以便进一步分析或记录。 本教程将探讨如何在Java中将控制台输出重定向到文本文件。 2. 准备 当我们谈论将控制台输出写入文本文件时，可能有两种情况： 仅文件 - 将所有输出重定向到文件。不会在控制台打印任何输出..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-05T09:35:50.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"控制台输出"}],["meta",{"property":"article:tag","content":"文件输出"}],["meta",{"property":"article:published_time","content":"2024-07-05T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-05T09:35:50.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中将控制台输出写入文本文件\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-05T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-05T09:35:50.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中将控制台输出写入文本文件 在调试或向用户显示信息时，将输出打印到控制台是常见的做法。然而，有时可能需要将控制台输出保存到文本文件中，以便进一步分析或记录。 本教程将探讨如何在Java中将控制台输出重定向到文本文件。 2. 准备 当我们谈论将控制台输出写入文本文件时，可能有两种情况： 仅文件 - 将所有输出重定向到文件。不会在控制台打印任何输出..."},"headers":[{"level":2,"title":"2. 准备","slug":"_2-准备","link":"#_2-准备","children":[]},{"level":2,"title":"3. 输出仅发送到文件","slug":"_3-输出仅发送到文件","link":"#_3-输出仅发送到文件","children":[]},{"level":2,"title":"4. 创建DualPrintStream类","slug":"_4-创建dualprintstream类","link":"#_4-创建dualprintstream类","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720172150000,"updatedTime":1720172150000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.57,"words":1072},"filePathRelative":"posts/baeldung/2024-07-05/2024-07-05-Write Console Output to Text File in Java.md","localizedDate":"2024年7月5日","excerpt":"\\n<p>在调试或向用户显示信息时，将输出打印到控制台是常见的做法。然而，有时可能需要将控制台输出保存到文本文件中，以便进一步分析或记录。</p>\\n<p>本教程将探讨如何在Java中将控制台输出重定向到文本文件。</p>\\n<h2>2. 准备</h2>\\n<p>当我们谈论将控制台输出写入文本文件时，可能有两种情况：</p>\\n<ul>\\n<li>仅文件 - 将所有输出重定向到文件。不会在控制台打印任何输出。</li>\\n<li>控制台和文件 - 输出同时写入控制台和文件。</li>\\n</ul>\\n<p>我们将在本教程中涵盖这两种情况。</p>\\n<p>在我们开始编码之前，让我们准备一些要写入控制台的文本。为了更容易测试，让我们将三行文本放入字符串列表中：</p>","autoDesc":true}');export{d as comp,k as data};
