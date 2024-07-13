import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-DkA39C0B.js";const e={},p=t(`<h1 id="java中的printstream与printwriter比较" tabindex="-1"><a class="header-anchor" href="#java中的printstream与printwriter比较"><span>Java中的PrintStream与PrintWriter比较</span></a></h1><p>在这个教程中，我们将比较Java中的PrintStream和PrintWriter类。本文将帮助程序员为每个类找到合适的用例。</p><p>在深入内容之前，我们建议查看我们之前的文章，其中展示了如何使用PrintStream和PrintWriter。</p><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><h2 id="_2-printstream和printwriter之间的相似性" tabindex="-1"><a class="header-anchor" href="#_2-printstream和printwriter之间的相似性"><span>2. PrintStream和PrintWriter之间的相似性</span></a></h2><p>因为PrintStream和PrintWriter共享一些功能，程序员有时很难找到这些类的适当用例。让我们首先确定它们的相似之处；然后，我们将看看它们的差异。</p><h3 id="_2-1-字符编码" tabindex="-1"><a class="header-anchor" href="#_2-1-字符编码"><span>2.1. 字符编码</span></a></h3><p>无论系统如何，<strong>字符编码允许程序以一致的方式在不同平台上解释文本</strong>。</p><p>在JDK 1.4版本发布后，PrintStream类在其构造函数中包含了一个字符编码参数。这允许PrintStream类在跨平台实现中对文本进行编码/解码。另一方面，PrintWriter自始至终都有字符编码功能。</p><p>我们可以查看官方Java代码以确认：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">PrintStream</span><span class="token punctuation">(</span><span class="token class-name">OutputStream</span> out<span class="token punctuation">,</span> <span class="token keyword">boolean</span> autoFlush<span class="token punctuation">,</span> <span class="token class-name">String</span> encoding<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">UnsupportedEncodingException</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">(</span><span class="token function">requireNonNull</span><span class="token punctuation">(</span>out<span class="token punctuation">,</span> <span class="token string">&quot;Null output stream&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> autoFlush<span class="token punctuation">,</span> <span class="token function">toCharset</span><span class="token punctuation">(</span>encoding<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同样，PrintWriter构造函数有一个charset参数，用于指定编码目的的Charset：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">PrintWriter</span><span class="token punctuation">(</span><span class="token class-name">OutputStream</span> out<span class="token punctuation">,</span> <span class="token keyword">boolean</span> autoFlush<span class="token punctuation">,</span> <span class="token class-name">Charset</span> charset<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">BufferedWriter</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">OutputStreamWriter</span><span class="token punctuation">(</span>out<span class="token punctuation">,</span> charset<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span> autoFlush<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 保存打印流以传播错误</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>out <span class="token keyword">instanceof</span> <span class="token class-name"><span class="token namespace">java<span class="token punctuation">.</span>io<span class="token punctuation">.</span></span>PrintStream</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        psOut <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">PrintStream</span><span class="token punctuation">)</span> out<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>如果这些类没有提供字符编码，它们将使用默认的平台编码</strong>。</p><h3 id="_2-2-写入文件" tabindex="-1"><a class="header-anchor" href="#_2-2-写入文件"><span>2.2. 写入文件</span></a></h3><p>要将文本写入文件，我们可以将String或File实例传递给相应的构造函数。此外，我们可以传递字符编码的charset。</p><p>以一个具有单个File参数的构造函数为例。在这种情况下，字符编码将默认为平台：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">PrintStream</span><span class="token punctuation">(</span><span class="token class-name">File</span> file<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">FileNotFoundException</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">FileOutputStream</span><span class="token punctuation">(</span>file<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同样，PrintWriter类有一个构造函数来指定要写入的文件：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">PrintWriter</span><span class="token punctuation">(</span><span class="token class-name">File</span> file<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">FileNotFoundException</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">BufferedWriter</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">OutputStreamWriter</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">FileOutputStream</span><span class="token punctuation">(</span>file<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，<strong>两个类都提供了写入文件的功能。然而，它们的实现通过使用不同的流父类而有所不同</strong>。我们将在本文的《差异》部分深入探讨为什么会这样。</p><h2 id="_3-printstream和printwriter之间的差异" tabindex="-1"><a class="header-anchor" href="#_3-printstream和printwriter之间的差异"><span>3. PrintStream和PrintWriter之间的差异</span></a></h2><p>在上一节中，我们展示了PrintStream和PrintWriter共享一些功能，这些功能可能适合我们的情况。尽管如此，<strong>尽管我们可以用这些类做相同的事情，但它们的实现方式不同</strong>，这使我们评估哪个类更适合。</p><p>现在，让我们看看PrintStream和PrintWriter之间的差异。</p><h3 id="_3-1-数据处理" tabindex="-1"><a class="header-anchor" href="#_3-1-数据处理"><span>3.1. 数据处理</span></a></h3><p>在上一节中，我们展示了两个类如何写入文件。让我们看看它们的实现有何不同。</p><p><strong>在PrintStream的情况下，它是OutputStream的子类，在Java中定义为一个字节流。换句话说，数据是逐字节处理的。另一方面，PrintWriter是一个字符流，逐个字符处理，并使用Unicode自动转换为我们指定的每个字符集</strong>。</p><p>我们将在两种不同的情况下展示这些实现。</p><h3 id="_3-2-处理非文本数据" tabindex="-1"><a class="header-anchor" href="#_3-2-处理非文本数据"><span>3.2. 处理非文本数据</span></a></h3><p><strong>由于两个类以不同的方式处理数据，我们可以在处理非文本文件时特别区分</strong>。在这个例子中，我们将使用一个png文件来读取数据，然后看看使用每个类将内容写入另一个文件后的差异：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DataStream</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> main <span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
        <span class="token class-name">FileInputStream</span> inputStream <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileInputStream</span><span class="token punctuation">(</span><span class="token string">&quot;image.png&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">PrintStream</span> printStream <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PrintStream</span><span class="token punctuation">(</span><span class="token string">&quot;ps.png&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">int</span> b<span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>b <span class="token operator">=</span> inputStream<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            printStream<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        printStream<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">FileReader</span> reader <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileReader</span><span class="token punctuation">(</span><span class="token string">&quot;image.png&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">PrintWriter</span> writer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PrintWriter</span><span class="token punctuation">(</span><span class="token string">&quot;pw.png&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">int</span> c<span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>c <span class="token operator">=</span> reader<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            writer<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        writer<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        inputStream<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，我们使用FileInputStream和FileReader来读取图像的内容。然后，我们将数据写入不同的输出文件。</p><p>结果，ps.png和pw.png文件将根据它们的内容被流处理的方式包含数据。<strong>我们知道PrintStream按一次读取一个字节的方式处理数据。因此，结果文件包含与原始文件相同的原始数据</strong>。</p><p><strong>与PrintStream类不同，PrintWriter将数据解释为字符</strong>。<strong>这导致文件损坏</strong>，系统无法理解其内容。或者，我们可以将pw.png的扩展名更改为pw.txt，并检查PrintWriter如何尝试将图像的原始数据转换为不可读的符号。</p><h3 id="_3-3-处理文本数据" tabindex="-1"><a class="header-anchor" href="#_3-3-处理文本数据"><span>3.3. 处理文本数据</span></a></h3><p><strong>现在，让我们看一个例子，我们使用OutputStream，PrintStream的父类，来演示写入文件时字符串是如何被处理的</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">PrintStreamWriter</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> main <span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
        <span class="token class-name">OutputStream</span> out <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileOutputStream</span><span class="token punctuation">(</span><span class="token string">&quot;TestFile.txt&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        out<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span><span class="token string">&quot;foobar&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        out<span class="token punctuation">.</span><span class="token function">flush</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        out<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>上面的代码将无法编译，因为OutputStream不知道如何处理字符串</strong>。<strong>要成功写入文件，输入数据必须是原始字节序列</strong>。以下更改将使我们的代码成功写入文件：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>out<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span><span class="token string">&quot;foobar&quot;</span><span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>回到PrintStream</strong>，尽管这个类是OutputStream的子类，<strong>Java在内部调用getBytes()方法</strong>。这允许PrintStream在调用print方法时接受字符串。让我们看一个例子：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">PrintStreamWriter</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> main <span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
        <span class="token class-name">PrintStream</span> out <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PrintStream</span><span class="token punctuation">(</span><span class="token string">&quot;TestFile.txt&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span><span class="token string">&quot;Hello, world!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        out<span class="token punctuation">.</span><span class="token function">flush</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        out<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，因为PrintWriter知道如何处理字符串，我们在调用print方法时传递字符串输入。然而，在这种情况下，<strong>Java不会将字符串转换为字节，而是在内部将流中的每个字符转换为其对应的Unicode编码</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">PrintStreamWriter</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> main <span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
        <span class="token class-name">PrintWriter</span> out <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PrintWriter</span><span class="token punctuation">(</span><span class="token string">&quot;TestFile.txt&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span><span class="token string">&quot;Hello, world!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        out<span class="token punctuation">.</span><span class="token function">flush</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        out<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>根据这些类如何处理内部文本数据，<strong>像PrintWriter这样的字符流类在执行文本I/O操作时更好地处理这些内容</strong>。此外，在编码过程中将数据转换为Unicode，使得应用程序的国际化更加简单。</p><h3 id="_3-4-刷新" tabindex="-1"><a class="header-anchor" href="#_3-4-刷新"><span>3.4. 刷新</span></a></h3><p>在我们之前的例子中，注意我们如何必须显式调用flush方法。根据Java文档，<strong>这两个类之间的这一过程是不同的</strong>。</p><p>对于PrintStream，我们只能在写入字节数组、调用println方法或写入换行字符时指定自动刷新。然而，PrintWriter也可以有自动刷新，但只有在我们调用println、printf或format方法时。</p><p>这个区别很难证明，因为文档提到刷新会在上述情况下发生，但没有提到它不会发生的情况。因此，<strong>我们可以演示两个类中自动刷新的工作方式，但我们不能保证它将按预期行为</strong>。</p><p>在这个例子中，我们将启用自动刷新功能，并写入一个以换行字符结尾的字符串：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AutoFlushExample</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> main <span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
        <span class="token class-name">PrintStream</span> printStream <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PrintStream</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">FileOutputStream</span><span class="token punctuation">(</span><span class="token string">&quot;autoFlushPrintStream.txt&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        printStream<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span><span class="token string">&quot;Hello, world!\\n&quot;</span><span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        printStream<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">PrintWriter</span> printWriter <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PrintWriter</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">FileOutputStream</span><span class="token punctuation">(</span><span class="token string">&quot;autoFlushPrintWriter.txt&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        printWriter<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span><span class="token string">&quot;Hello, world!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        printWriter<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>我们保证文件autoFlushPrintStream.txt将包含写入文件的内容</strong>，因为我们启用了自动刷新功能。此外，我们调用write方法并包含换行字符的字符串以强制刷新。</p><p>然而，<strong>我们期望看到autoFlushPrintWriter.txt文件为空</strong>，尽管这不是保证的。毕竟，在程序执行期间可能会发生刷新。</p><p>如果我们想在使用PrintWriter时强制刷新，代码必须满足我们提到的所有要求，或者我们可以添加一行代码来显式刷新写入器：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>printWriter<span class="token punctuation">.</span><span class="token function">flush</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们比较了两个数据流类PrintStream和PrintWriter。首先，我们查看了它们的相似之处和使用本地字符集的能力。我们还涵盖了如何从外部文件读取和写入的示例。<strong>尽管我们可以用两个类实现类似的事情，但在查看差异后，我们展示了每个类在不同场景中表现更好</strong>。</p><p>例如，当我们写入所有类型的数据时，我们从PrintStream中受益，因为PrintStream处理原始字节。另一方面，PrintWriter作为字符流，最适合在执行I/O操作时处理文本。此外，由于其内部格式为Unicode，它有助于复杂的软件实现，如国际化。最后，我们比较了两个类</p>`,57),o=[p];function i(c,l){return s(),a("div",null,o)}const k=n(e,[["render",i],["__file","2024-07-10-PrintStream vs PrintWriter in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-10/2024-07-10-PrintStream%20vs%20PrintWriter%20in%20Java.html","title":"Java中的PrintStream与PrintWriter比较","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java"],"tag":["PrintStream","PrintWriter"],"head":[["meta",{"name":"keywords","content":"Java, PrintStream, PrintWriter, 比较, 教程"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-10/2024-07-10-PrintStream%20vs%20PrintWriter%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中的PrintStream与PrintWriter比较"}],["meta",{"property":"og:description","content":"Java中的PrintStream与PrintWriter比较 在这个教程中，我们将比较Java中的PrintStream和PrintWriter类。本文将帮助程序员为每个类找到合适的用例。 在深入内容之前，我们建议查看我们之前的文章，其中展示了如何使用PrintStream和PrintWriter。 1. 引言 2. PrintStream和Prin..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-10T22:02:25.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"PrintStream"}],["meta",{"property":"article:tag","content":"PrintWriter"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-10T22:02:25.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中的PrintStream与PrintWriter比较\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-10T22:02:25.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中的PrintStream与PrintWriter比较 在这个教程中，我们将比较Java中的PrintStream和PrintWriter类。本文将帮助程序员为每个类找到合适的用例。 在深入内容之前，我们建议查看我们之前的文章，其中展示了如何使用PrintStream和PrintWriter。 1. 引言 2. PrintStream和Prin..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. PrintStream和PrintWriter之间的相似性","slug":"_2-printstream和printwriter之间的相似性","link":"#_2-printstream和printwriter之间的相似性","children":[{"level":3,"title":"2.1. 字符编码","slug":"_2-1-字符编码","link":"#_2-1-字符编码","children":[]},{"level":3,"title":"2.2. 写入文件","slug":"_2-2-写入文件","link":"#_2-2-写入文件","children":[]}]},{"level":2,"title":"3. PrintStream和PrintWriter之间的差异","slug":"_3-printstream和printwriter之间的差异","link":"#_3-printstream和printwriter之间的差异","children":[{"level":3,"title":"3.1. 数据处理","slug":"_3-1-数据处理","link":"#_3-1-数据处理","children":[]},{"level":3,"title":"3.2. 处理非文本数据","slug":"_3-2-处理非文本数据","link":"#_3-2-处理非文本数据","children":[]},{"level":3,"title":"3.3. 处理文本数据","slug":"_3-3-处理文本数据","link":"#_3-3-处理文本数据","children":[]},{"level":3,"title":"3.4. 刷新","slug":"_3-4-刷新","link":"#_3-4-刷新","children":[]}]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1720648945000,"updatedTime":1720648945000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":6.9,"words":2069},"filePathRelative":"posts/baeldung/2024-07-10/2024-07-10-PrintStream vs PrintWriter in Java.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在这个教程中，我们将比较Java中的PrintStream和PrintWriter类。本文将帮助程序员为每个类找到合适的用例。</p>\\n<p>在深入内容之前，我们建议查看我们之前的文章，其中展示了如何使用PrintStream和PrintWriter。</p>\\n<h2>1. 引言</h2>\\n<h2>2. PrintStream和PrintWriter之间的相似性</h2>\\n<p>因为PrintStream和PrintWriter共享一些功能，程序员有时很难找到这些类的适当用例。让我们首先确定它们的相似之处；然后，我们将看看它们的差异。</p>\\n<h3>2.1. 字符编码</h3>\\n<p>无论系统如何，<strong>字符编码允许程序以一致的方式在不同平台上解释文本</strong>。</p>","autoDesc":true}');export{k as comp,d as data};
