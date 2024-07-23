import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-on0L14Tx.js";const e={},p=t(`<h1 id="java中system-in-read-方法指南" tabindex="-1"><a class="header-anchor" href="#java中system-in-read-方法指南"><span>Java中System.in.read()方法指南</span></a></h1><p>Java提供了多种工具和函数来处理用户输入。<em>System.in.read()</em> 是Java中用于从控制台读取输入的常用方法之一。在本文中，我们将探讨它的功能以及如何在Java中使用它。</p><h2 id="_2-system-in-read-是什么" tabindex="-1"><a class="header-anchor" href="#_2-system-in-read-是什么"><span>2. System.in.read()是什么？</span></a></h2><p>Java方法_System.in.read()_ 从标准输入流中读取一个字节，通常与键盘或其他来源相关联。它是_System_类的一部分，提供了一种低级别的机制来读取基于字节的输入：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">read</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>这里，该方法返回一个整数，表示读取的字符的ASCII值。</strong> 我们需要将ASCII整数值转换为字符来查看实际值。如果到达流的末尾，则返回-1。</p><p><strong>需要注意的是，<em>System.in.read()</em> 一次只读取一个字节。</strong> 如果我们需要读取一整行或处理不同的数据类型，我们可能需要使用其他方法或类，例如_BufferedReader_或_Scanner_。</p><h2 id="_3-其他输入源" tabindex="-1"><a class="header-anchor" href="#_3-其他输入源"><span>3. 其他输入源</span></a></h2><p>虽然_System.in_通常用于控制台输入，但_System.in.read()_也可以重定向以从各种其他源读取，包括文件、网络连接和用户界面。</p><p>这些替代输入源启用了广泛的应用程序，例如读取配置文件、管理客户端-服务器通信、与数据库交互、处理用户界面以及与传感器和物联网设备等外部设备进行接口。</p><h2 id="_4-读取单个字符" tabindex="-1"><a class="header-anchor" href="#_4-读取单个字符"><span>4. 读取单个字符</span></a></h2><p><em>System.in.read()</em> 最简单的用法是读取单个字符：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">void</span> <span class="token function">readSingleCharacter</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Enter a character:&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> input <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span>in<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">char</span><span class="token punctuation">)</span> input<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IOException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>err<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Error reading input: &quot;</span> <span class="token operator">+</span> e<span class="token punctuation">.</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>由于_System.in.read()_ 抛出_IO异常_，这是一个检查异常，我们需要处理它。</strong> 在上述示例中，我们捕获_IO异常_并输出错误消息到标准错误流。</p><p>让我们通过从输入流中读取一个字符来进行测试，以确认一切按预期工作：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenUserInput_whenUsingReadSingleCharacter_thenRead</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">setIn</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">ByteArrayInputStream</span><span class="token punctuation">(</span><span class="token string">&quot;A&quot;</span><span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">ByteArrayOutputStream</span> outputStream <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ByteArrayOutputStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">setOut</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">PrintStream</span><span class="token punctuation">(</span>outputStream<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">SystemInRead</span><span class="token punctuation">.</span><span class="token function">readSingleCharacter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Enter a character:\\nA&quot;</span><span class="token punctuation">,</span> outputStream<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">trim</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们将_System.in.read()_ 重定向为从_ByteArrayInputStream_读取。通过这样做，我们可以在运行测试时避免提示用户输入，并且我们可以断言控制台输出。</p><h2 id="_5-读取多个字符" tabindex="-1"><a class="header-anchor" href="#_5-读取多个字符"><span>5. 读取多个字符</span></a></h2><p>虽然_System.in.read()_ 一次读取一个字节，但我们经常需要读取多个字符。一种常见的方法是在循环中连续读取，直到满足特定条件：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">void</span> <span class="token function">readMultipleCharacters</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Enter characters (Press &#39;Enter&#39; to quit):&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> input<span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>input <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span>in<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token char">&#39;\\n&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">char</span><span class="token punctuation">)</span> input<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IOException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>err<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Error reading input: &quot;</span> <span class="token operator">+</span> e<span class="token punctuation">.</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们在while循环中使用_System.in.read()_，循环继续执行，直到我们按下回车键。让我们用一个单元测试来测试新的行为：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenUserInput_whenUsingReadMultipleCharacters_thenRead</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">setIn</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">ByteArrayInputStream</span><span class="token punctuation">(</span><span class="token string">&quot;Hello\\n&quot;</span><span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">ByteArrayOutputStream</span> outputStream <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ByteArrayOutputStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">setOut</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">PrintStream</span><span class="token punctuation">(</span>outputStream<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">SystemInRead</span><span class="token punctuation">.</span><span class="token function">readMultipleCharacters</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Enter characters (Press &#39;Enter&#39; to quit):\\n&quot;</span> <span class="token operator">+</span> <span class="token string">&quot;Hello&quot;</span><span class="token punctuation">,</span> outputStream<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">trim</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-system-in-read-带参数" tabindex="-1"><a class="header-anchor" href="#_6-system-in-read-带参数"><span>6. System.in.read()带参数</span></a></h2><p><em>System.in.read()</em> 方法还有另外两个版本，它们返回从输入流中读取的字节数。</p><h3 id="_6-1-带多个参数的读取" tabindex="-1"><a class="header-anchor" href="#_6-1-带多个参数的读取"><span>6.1. 带多个参数的读取</span></a></h3><p>这个方法从输入流中读取数据，并将其存储在字节数组中，从指定的偏移量开始，继续到指定的长度。如果遇到流的末尾，该方法可能会读取少于指定长度的字节：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">void</span> <span class="token function">readWithParameters</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> byteArray <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token number">5</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> bytesRead<span class="token punctuation">;</span>
        <span class="token keyword">int</span> totalBytesRead <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>bytesRead <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span>in<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span>byteArray<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> byteArray<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span><span class="token string">&quot;Data read: &quot;</span> <span class="token operator">+</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span>byteArray<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> bytesRead<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            totalBytesRead <span class="token operator">+=</span> bytesRead<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;\\nBytes read: &quot;</span> <span class="token operator">+</span> totalBytesRead<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token punctuation">}</span>
    <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IOException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的示例中，我们从标准输入流中读取字节到一个字节数组并打印读取的字节数和数据。我们可以执行一个测试来验证其预期行为：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenUserInput_whenUsingReadWithParameters_thenRead</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">setIn</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">ByteArrayInputStream</span><span class="token punctuation">(</span><span class="token string">&quot;ABC&quot;</span><span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">ByteArrayOutputStream</span> outputStream <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ByteArrayOutputStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">setOut</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">PrintStream</span><span class="token punctuation">(</span>outputStream<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">SystemInRead</span><span class="token punctuation">.</span><span class="token function">readWithParameters</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Data read: ABC\\n&quot;</span> <span class="token operator">+</span> <span class="token string">&quot;Bytes Read: 3&quot;</span><span class="token punctuation">,</span> outputStream<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">trim</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-2-带单个参数的读取" tabindex="-1"><a class="header-anchor" href="#_6-2-带单个参数的读取"><span>6.2. 带单个参数的读取</span></a></h3><p>这是_System.in.read()_ 方法的另一个版本，它接受一个字节数组作为参数。它在内部调用_System.in.read(byte[] b, int off, int len)_。</p><p>该方法的定义如下：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">read</span><span class="token punctuation">(</span><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> b<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_7-限制" tabindex="-1"><a class="header-anchor" href="#_7-限制"><span>7. 限制</span></a></h2><p>虽然_System.in.read()_ 简单，但它有一些限制：</p><ul><li>它一次只读取一个_字节_，这使得它在读取完整的行或处理多字节字符时效率较低。</li><li>该方法在接收到输入之前会阻塞。如果用户不提供输入，可能会导致应用程序看起来无响应。</li><li>对于更复杂的输入处理，例如处理整数或字符串，最好使用其他类，如_BufferedReader_或_Scanner_。</li></ul><h2 id="_8-结论" tabindex="-1"><a class="header-anchor" href="#_8-结论"><span>8. 结论</span></a></h2><p>在本文中，我们查看了Java中的_System.in.read()_ 方法，并探讨了如何在应用程序中使用它。它提供了一种基本但功能强大的方式，直接从标准输入流处理用户输入。</p><p>通过理解其用法、处理错误并将其纳入更复杂的输入场景，我们可以创建交互式和用户友好的应用程序。</p><p>如常，完整的源代码可在GitHub上获得。</p>`,40),o=[p];function c(i,l){return s(),a("div",null,o)}const k=n(e,[["render",c],["__file","2024-06-22-Guide to System.in.read  .html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-06-22/2024-06-22-Guide%20to%20System.in.read%20%20.html","title":"Java中System.in.read()方法指南","lang":"zh-CN","frontmatter":{"date":"2024-06-22T00:00:00.000Z","category":["Java","编程"],"tag":["System.in.read()","用户输入"],"head":[["meta",{"name":"keywords","content":"Java, System.in.read(), 用户输入, 控制台输入"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-22/2024-06-22-Guide%20to%20System.in.read%20%20.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中System.in.read()方法指南"}],["meta",{"property":"og:description","content":"Java中System.in.read()方法指南 Java提供了多种工具和函数来处理用户输入。System.in.read() 是Java中用于从控制台读取输入的常用方法之一。在本文中，我们将探讨它的功能以及如何在Java中使用它。 2. System.in.read()是什么？ Java方法_System.in.read()_ 从标准输入流中读取一..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-22T13:01:15.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"System.in.read()"}],["meta",{"property":"article:tag","content":"用户输入"}],["meta",{"property":"article:published_time","content":"2024-06-22T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-22T13:01:15.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中System.in.read()方法指南\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-22T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-22T13:01:15.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中System.in.read()方法指南 Java提供了多种工具和函数来处理用户输入。System.in.read() 是Java中用于从控制台读取输入的常用方法之一。在本文中，我们将探讨它的功能以及如何在Java中使用它。 2. System.in.read()是什么？ Java方法_System.in.read()_ 从标准输入流中读取一..."},"headers":[{"level":2,"title":"2. System.in.read()是什么？","slug":"_2-system-in-read-是什么","link":"#_2-system-in-read-是什么","children":[]},{"level":2,"title":"3. 其他输入源","slug":"_3-其他输入源","link":"#_3-其他输入源","children":[]},{"level":2,"title":"4. 读取单个字符","slug":"_4-读取单个字符","link":"#_4-读取单个字符","children":[]},{"level":2,"title":"5. 读取多个字符","slug":"_5-读取多个字符","link":"#_5-读取多个字符","children":[]},{"level":2,"title":"6. System.in.read()带参数","slug":"_6-system-in-read-带参数","link":"#_6-system-in-read-带参数","children":[{"level":3,"title":"6.1. 带多个参数的读取","slug":"_6-1-带多个参数的读取","link":"#_6-1-带多个参数的读取","children":[]},{"level":3,"title":"6.2. 带单个参数的读取","slug":"_6-2-带单个参数的读取","link":"#_6-2-带单个参数的读取","children":[]}]},{"level":2,"title":"7. 限制","slug":"_7-限制","link":"#_7-限制","children":[]},{"level":2,"title":"8. 结论","slug":"_8-结论","link":"#_8-结论","children":[]}],"git":{"createdTime":1719061275000,"updatedTime":1719061275000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.34,"words":1301},"filePathRelative":"posts/baeldung/2024-06-22/2024-06-22-Guide to System.in.read  .md","localizedDate":"2024年6月22日","excerpt":"\\n<p>Java提供了多种工具和函数来处理用户输入。<em>System.in.read()</em> 是Java中用于从控制台读取输入的常用方法之一。在本文中，我们将探讨它的功能以及如何在Java中使用它。</p>\\n<h2>2. System.in.read()是什么？</h2>\\n<p>Java方法_System.in.read()_ 从标准输入流中读取一个字节，通常与键盘或其他来源相关联。它是_System_类的一部分，提供了一种低级别的机制来读取基于字节的输入：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">static</span> <span class=\\"token keyword\\">int</span> <span class=\\"token function\\">read</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token keyword\\">throws</span> <span class=\\"token class-name\\">IOException</span>\\n</code></pre></div>","autoDesc":true}');export{k as comp,d as data};
