import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-CZdUP17Q.js";const p={},e=t(`<h1 id="java-中的-printwriter-write-与-print-方法比较-baeldung-1-引言" tabindex="-1"><a class="header-anchor" href="#java-中的-printwriter-write-与-print-方法比较-baeldung-1-引言"><span>Java 中的 PrintWriter write() 与 print() 方法比较 | Baeldung## 1. 引言</span></a></h1><p>本文将讨论Java IO包中的_PrintWriter_类。具体来说，我们将讨论它的两个方法，_write()<em>和_print()</em>，以及它们之间的区别。</p><p>_PrintWriter_类将对象的格式化表示打印到文本输出流。此类中的方法永远不会抛出I/O异常。然而，它的一些构造函数可能会抛出异常。要使用这些方法，我们必须调用_PrintWriter_构造函数，并提供文件、文件名或输出流作为参数。</p><p><strong><em>write()<em>方法有五个重载版本，两个用于_char</em>，两个用于_String</em>，一个用于_int_。</strong> 这个方法只是我们可以将内容写入控制台或文件的方式之一。</p><p>此外，_char_和_String_版本可以写入整个_char[]<em>或_String</em>，或者数组或_String_的部分。另外，_int_版本写入一个单一字符——相当于给定十进制输入的ASCII符号。</p><p>首先，让我们看看_write(int c)_版本：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenUsingWriteInt_thenASCIICharacterIsPrinted</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">FileNotFoundException</span> <span class="token punctuation">{</span>
    <span class="token class-name">PrintWriter</span> printWriter <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PrintWriter</span><span class="token punctuation">(</span><span class="token string">&quot;output.txt&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    printWriter<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span><span class="token number">48</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    printWriter<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token function">outputFromPrintWriter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们传递了_48_作为_write()<em>方法的参数，并得到了_0_作为输出。此外，如果我们查看ASCII表，我们会发现_48</em> DEC输入对应的符号是数字_0_。如果我们传递另一个值，比如说_64_，那么打印的输出将是数字_4_。</p><p>这里，_outputFromPrintWriter()_只是一个服务方法，它读取_write()_方法写入文件的内容，这样我们可以比较值：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Object</span> outputFromPrintWriter<span class="token punctuation">;</span>

<span class="token class-name">Object</span> <span class="token function">outputFromPrintWriter</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">BufferedReader</span> br <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BufferedReader</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">FileReader</span><span class="token punctuation">(</span><span class="token string">&quot;output.txt&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span> 
        outputFromPrintWriter <span class="token operator">=</span> br<span class="token punctuation">.</span><span class="token function">readLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IOException</span> e<span class="token punctuation">)</span><span class="token punctuation">{</span>
        e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">fail</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> outputFromPrintWriter<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们看看第二个版本——<em>write(char[] buf, int off, int len)</em>——它从给定的起始位置写入数组的一部分，直到给定的长度：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenUsingWriteCharArrayFromOffset_thenCharArrayIsPrinted</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">FileNotFoundException</span> <span class="token punctuation">{</span>
    <span class="token class-name">PrintWriter</span> printWriter <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PrintWriter</span><span class="token punctuation">(</span><span class="token string">&quot;output.txt&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    printWriter<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token char">&#39;A&#39;</span><span class="token punctuation">,</span><span class="token char">&#39;/&#39;</span><span class="token punctuation">,</span><span class="token char">&#39;\\u0026&#39;</span><span class="token punctuation">,</span><span class="token char">&#39;4&#39;</span><span class="token punctuation">,</span><span class="token char">&#39;E&#39;</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    printWriter<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;/\\u00264E&quot;</span><span class="token punctuation">,</span> <span class="token function">outputFromPrintWriter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们从上面的测试中看到的，_write()_方法从我们指定的偏移量开始，将四个字符写入了_output.txt_文件。</p><p>让我们分析_write(String s, int off, int len)_方法的第二个版本。这写入了_String_的一部分，从给定的起始位置直到给定的长度：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenUsingWriteStringFromOffset_thenLengthOfStringIsPrinted</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">FileNotFoundException</span> <span class="token punctuation">{</span>
    <span class="token class-name">PrintWriter</span> printWriter <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PrintWriter</span><span class="token punctuation">(</span><span class="token string">&quot;output.txt&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    printWriter<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span><span class="token string">&quot;StringExample&quot;</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">7</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
    printWriter<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Example&quot;</span><span class="token punctuation">,</span> <span class="token function">outputFromPrintWriter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-printwriter-print" tabindex="-1"><a class="header-anchor" href="#_3-printwriter-print"><span>3. <em>PrintWriter.print()</em></span></a></h2><p><strong>_print()_方法有九个重载版本。</strong> 它可以接收以下类型的参数：_boolean, char, char[], double, float, int, long, Object,<em>和_String</em>。</p><p>_print()_方法在其各种变体中的行为是相似的。<strong>对于除了_String_和_char_之外的每种类型，由_String.valueOf()_方法产生的字符串被转换为字节</strong>。这种转换是根据平台的默认字符编码进行的，字节以与_write(int)_版本相同的方式写入。</p><p>首先，让我们看看_print(boolean b)_版本：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenUsingPrintBoolean_thenStringValueIsPrinted</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">FileNotFoundException</span> <span class="token punctuation">{</span>
    <span class="token class-name">PrintWriter</span> printWriter <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PrintWriter</span><span class="token punctuation">(</span><span class="token string">&quot;output.txt&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    printWriter<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    printWriter<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;true&quot;</span><span class="token punctuation">,</span> <span class="token function">outputFromPrintWriter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们看看_print(char c)_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenUsingPrintChar_thenCharIsPrinted</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">FileNotFoundException</span> <span class="token punctuation">{</span>
    <span class="token class-name">PrintWriter</span> printWriter <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PrintWriter</span><span class="token punctuation">(</span><span class="token string">&quot;output.txt&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    printWriter<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span><span class="token char">&#39;A&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    printWriter<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;A&quot;</span><span class="token punctuation">,</span> <span class="token function">outputFromPrintWriter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是_print(int i)_的工作方式：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenUsingPrintInt_thenValueOfIntIsPrinted</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">FileNotFoundException</span> <span class="token punctuation">{</span>
    <span class="token class-name">PrintWriter</span> printWriter <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PrintWriter</span><span class="token punctuation">(</span><span class="token string">&quot;output.txt&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    printWriter<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span><span class="token number">420</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    printWriter<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;420&quot;</span><span class="token punctuation">,</span> <span class="token function">outputFromPrintWriter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们看看_print(String s)_版本输出了什么：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenUsingPrintString_thenStringIsPrinted</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">FileNotFoundException</span> <span class="token punctuation">{</span>
    <span class="token class-name">PrintWriter</span> printWriter <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PrintWriter</span><span class="token punctuation">(</span><span class="token string">&quot;output.txt&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    printWriter<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span><span class="token string">&quot;RandomString&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    printWriter<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;RandomString&quot;</span><span class="token punctuation">,</span> <span class="token function">outputFromPrintWriter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里是_print(Object obj)_的测试：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenUsingPrintObject_thenObjectToStringIsPrinted</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">FileNotFoundException</span> <span class="token punctuation">{</span>
    <span class="token class-name">PrintWriter</span> printWriter <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PrintWriter</span><span class="token punctuation">(</span><span class="token string">&quot;output.txt&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">Map</span> example <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    printWriter<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span>example<span class="token punctuation">)</span><span class="token punctuation">;</span>
    printWriter<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span>example<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">outputFromPrintWriter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们从上面的例子中看到的，<strong>调用_print()_方法并传递一个对象作为参数会打印该对象的_toString()_表示</strong>。</p><h2 id="_4-write-和-print-方法之间的区别" tabindex="-1"><a class="header-anchor" href="#_4-write-和-print-方法之间的区别"><span>4. _write()_和_print()_方法之间的区别</span></a></h2><p>两种方法之间的区别很微妙，所以我们需要留意它们。</p><p><strong>_write(int)_只写一个字符。它输出等同于传递参数的ASCII符号。</strong></p><p><strong>此外，_print(_typeOfData)_将_char, int_等类型的参数通过调用_String.valueOf(typeOfData)<em>转换为_String</em>。</strong> 这个_String_根据平台的默认字符编码被转换为字节，并且它的字节以与_write(int)_相同的方式写入。</p><p>与_print()_方法不同，_write()_方法只处理单个字符、字符串和字符数组。_print()_方法涵盖了许多参数类型，使用_String.valueOf()_将它们转换为可打印的字符串字符。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本教程中，我们探索了_PrintWriter_类，更具体地说，是_write()_和_print()_方法。正如我们所看到的，_PrintWriter_类提供了几种帮助我们将数据打印到输出的方法。_write()_方法打印传递给它的字符，而_print()_方法转换输出。</p><p>如常，代码可以在GitHub上找到。</p><p>文章发布后30天内开放评论。对于超过此日期的任何问题，请使用网站上的联系方式。</p><p>OK</p>`,39),i=[e];function o(c,r){return a(),s("div",null,i)}const k=n(p,[["render",o],["__file","PrintWriter write   vs print   Method in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/Archive/PrintWriter%20write%20%20%20vs%20print%20%20%20Method%20in%20Java.html","title":"Java 中的 PrintWriter write() 与 print() 方法比较 | Baeldung## 1. 引言","lang":"zh-CN","frontmatter":{"date":"2024-06-19T00:00:00.000Z","category":["Java","IO"],"tag":["PrintWriter","write()","print()"],"head":[["meta",{"name":"keywords","content":"Java, PrintWriter, write() vs print(), 输出方法比较"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/PrintWriter%20write%20%20%20vs%20print%20%20%20Method%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java 中的 PrintWriter write() 与 print() 方法比较 | Baeldung## 1. 引言"}],["meta",{"property":"og:description","content":"Java 中的 PrintWriter write() 与 print() 方法比较 | Baeldung## 1. 引言 本文将讨论Java IO包中的_PrintWriter_类。具体来说，我们将讨论它的两个方法，_write()和_print()，以及它们之间的区别。 _PrintWriter_类将对象的格式化表示打印到文本输出流。此类中的方法永..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"PrintWriter"}],["meta",{"property":"article:tag","content":"write()"}],["meta",{"property":"article:tag","content":"print()"}],["meta",{"property":"article:published_time","content":"2024-06-19T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java 中的 PrintWriter write() 与 print() 方法比较 | Baeldung## 1. 引言\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-19T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java 中的 PrintWriter write() 与 print() 方法比较 | Baeldung## 1. 引言 本文将讨论Java IO包中的_PrintWriter_类。具体来说，我们将讨论它的两个方法，_write()和_print()，以及它们之间的区别。 _PrintWriter_类将对象的格式化表示打印到文本输出流。此类中的方法永..."},"headers":[{"level":2,"title":"3. PrintWriter.print()","slug":"_3-printwriter-print","link":"#_3-printwriter-print","children":[]},{"level":2,"title":"4. _write()_和_print()_方法之间的区别","slug":"_4-write-和-print-方法之间的区别","link":"#_4-write-和-print-方法之间的区别","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":4.1,"words":1231},"filePathRelative":"posts/baeldung/Archive/PrintWriter write   vs print   Method in Java.md","localizedDate":"2024年6月19日","excerpt":"\\n<p>本文将讨论Java IO包中的_PrintWriter_类。具体来说，我们将讨论它的两个方法，_write()<em>和_print()</em>，以及它们之间的区别。</p>\\n<p>_PrintWriter_类将对象的格式化表示打印到文本输出流。此类中的方法永远不会抛出I/O异常。然而，它的一些构造函数可能会抛出异常。要使用这些方法，我们必须调用_PrintWriter_构造函数，并提供文件、文件名或输出流作为参数。</p>\\n<p><strong><em>write()<em>方法有五个重载版本，两个用于_char</em>，两个用于_String</em>，一个用于_int_。</strong> 这个方法只是我们可以将内容写入控制台或文件的方式之一。</p>","autoDesc":true}');export{k as comp,d as data};
