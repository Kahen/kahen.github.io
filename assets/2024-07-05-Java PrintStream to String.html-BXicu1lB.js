import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-BMOUrRO4.js";const p={},e=t(`<h1 id="java-printstream-转-string" tabindex="-1"><a class="header-anchor" href="#java-printstream-转-string"><span>Java PrintStream 转 String</span></a></h1><p>在这篇简短的教程中，我们将介绍如何在Java中将 PrintStream 转换为 String。</p><p>我们将从使用Java核心方法开始。然后，我们将看到如何使用Apache Commons IO等外部库来实现相同的目标。</p><h2 id="_2-printstream-是什么" tabindex="-1"><a class="header-anchor" href="#_2-printstream-是什么"><span>2. PrintStream 是什么</span></a></h2><p>在Java中，PrintStream 是一种输出流，提供了一种方便的方式来打印和格式化数据。它带有一组用于打印和格式化不同类型数据的方法，例如 println() 和 printf()。</p><p>与其他输出流不同，它永远不会抛出 IOException。然而，在出现错误的情况下，它会设置一个可以通过 checkError() 方法测试的标志。</p><p>现在我们知道了 PrintStream 是什么，让我们看看如何将其转换为字符串。</p><h2 id="_3-使用-bytearrayoutputstream" tabindex="-1"><a class="header-anchor" href="#_3-使用-bytearrayoutputstream"><span>3. 使用 ByteArrayOutputStream</span></a></h2><p>简而言之，ByteArrayOutputStream 是一个输出流，数据被写入到一个字节数组中。</p><p>通常，<strong>我们可以使用它来捕获 PrintStream 的输出，然后将捕获的字节转换为字符串</strong>。让我们看看实际操作：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">usingByteArrayOutputStreamClass</span><span class="token punctuation">(</span><span class="token class-name">String</span> input<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>input <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token class-name">String</span> output<span class="token punctuation">;</span>
    <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">ByteArrayOutputStream</span> outputStream <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ByteArrayOutputStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token class-name">PrintStream</span> printStream <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PrintStream</span><span class="token punctuation">(</span>outputStream<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        printStream<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">;</span>

        output <span class="token operator">=</span> outputStream<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> output<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，我们用传递给构造函数的 ByteArrayOutputStream 创建了一个 PrintStream 对象。</p><p>然后，我们使用 print() 方法将输入字符串写入 PrintStream。</p><p>最后，我们使用 ByteArrayOutputStream 类的 toString() 方法将输入转换为 String 对象。</p><p>现在，让我们使用一个测试用例来确认：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenUsingByteArrayOutputStreamClass_thenConvert</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;test&quot;</span><span class="token punctuation">,</span> <span class="token class-name">PrintStreamToStringUtil</span><span class="token punctuation">.</span><span class="token function">usingByteArrayOutputStreamClass</span><span class="token punctuation">(</span><span class="token string">&quot;test&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">,</span> <span class="token class-name">PrintStreamToStringUtil</span><span class="token punctuation">.</span><span class="token function">usingByteArrayOutputStreamClass</span><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertNull</span><span class="token punctuation">(</span><span class="token class-name">PrintStreamToStringUtil</span><span class="token punctuation">.</span><span class="token function">usingByteArrayOutputStreamClass</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上所示，我们的方法能够将 PrintStream 转换为字符串。</p><h2 id="_4-使用自定义输出流" tabindex="-1"><a class="header-anchor" href="#_4-使用自定义输出流"><span>4. 使用自定义输出流</span></a></h2><p>另一种解决方案是使用 OutputStream 类的自定义实现。</p><p>基本上，OutputStream 是所有表示字节输出流的类的超类，包括 ByteArrayOutputStream。</p><p>首先，让我们考虑 CustomOutputStream 静态内部类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">CustomOutputStream</span> <span class="token keyword">extends</span> <span class="token class-name">OutputStream</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token class-name">StringBuilder</span> string <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">write</span><span class="token punctuation">(</span><span class="token keyword">int</span> b<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>string<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">char</span><span class="token punctuation">)</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>string<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们使用 StringBuilder 实例逐字节写入给定的数据。此外，我们重写了 toString() 方法以获取 StringBuilder 对象的字符串表示。</p><p>接下来，让我们重用前一节中的相同示例。<strong>但是，我们将使用我们的自定义实现而不是 ByteArrayOutputStream</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">usingCustomOutputStream</span><span class="token punctuation">(</span><span class="token class-name">String</span> input<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>input <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token class-name">String</span> output<span class="token punctuation">;</span>
    <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">CustomOutputStream</span> outputStream <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CustomOutputStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token class-name">PrintStream</span> printStream <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PrintStream</span><span class="token punctuation">(</span>outputStream<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        printStream<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">;</span>

        output <span class="token operator">=</span> outputStream<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> output<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们添加另一个测试用例以确认一切按预期工作：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenCustomOutputStream_thenConvert</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;world&quot;</span><span class="token punctuation">,</span> <span class="token class-name">PrintStreamToStringUtil</span><span class="token punctuation">.</span><span class="token function">usingCustomOutputStream</span><span class="token punctuation">(</span><span class="token string">&quot;world&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">,</span> <span class="token class-name">PrintStreamToStringUtil</span><span class="token punctuation">.</span><span class="token function">usingCustomOutputStream</span><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertNull</span><span class="token punctuation">(</span><span class="token class-name">PrintStreamToStringUtil</span><span class="token punctuation">.</span><span class="token function">usingCustomOutputStream</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-使用-apache-commons-io" tabindex="-1"><a class="header-anchor" href="#_5-使用-apache-commons-io"><span>5. 使用 Apache Commons IO</span></a></h2><p>或者，我们可以使用 Apache Commons IO 库来实现相同的目标。</p><p>首先，让我们将 Apache Commons IO 依赖项添加到我们的 pom.xml：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`commons-io\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`commons-io\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\`2.15.1\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\`
\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Apache Commons IO 提供了自己版本的 ByteArrayOutputStream。<strong>这个类带有 toByteArray() 方法来检索数据作为字节数组</strong>。</p><p>让我们在实践中看看：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">usingApacheCommonsIO</span><span class="token punctuation">(</span><span class="token class-name">String</span> input<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>input <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token class-name"><span class="token namespace">org<span class="token punctuation">.</span>apache<span class="token punctuation">.</span>commons<span class="token punctuation">.</span>io<span class="token punctuation">.</span>output<span class="token punctuation">.</span></span>ByteArrayOutputStream</span> outputStream <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name"><span class="token namespace">org<span class="token punctuation">.</span>apache<span class="token punctuation">.</span>commons<span class="token punctuation">.</span>io<span class="token punctuation">.</span>output<span class="token punctuation">.</span></span>ByteArrayOutputStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">PrintStream</span> printStream <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PrintStream</span><span class="token punctuation">(</span>outputStream<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        printStream<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span>outputStream<span class="token punctuation">.</span><span class="token function">toByteArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>简而言之，我们使用 toByteArray() 从输出流中获取字节数组。然后，我们将返回的数组传递给 String 构造函数。</p><p>这里的一个重要警告是，与 Java 不同，我们不需要关闭 ByteArrayOutputStream。</p><p>这个解决方案也运行得很好，如单元测试所示：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenUsingApacheCommonsIO_thenConvert</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;hello&quot;</span><span class="token punctuation">,</span> <span class="token class-name">PrintStreamToStringUtil</span><span class="token punctuation">.</span><span class="token function">usingApacheCommonsIO</span><span class="token punctuation">(</span><span class="token string">&quot;hello&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">,</span> <span class="token class-name">PrintStreamToStringUtil</span><span class="token punctuation">.</span><span class="token function">usingApacheCommonsIO</span><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertNull</span><span class="token punctuation">(</span><span class="token class-name">PrintStreamToStringUtil</span><span class="token punctuation">.</span><span class="token function">usingApacheCommonsIO</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们学习了如何将 PrintStream 转换为 String。</p><p>在此过程中，我们解释了如何使用 Java 核心方法来实现它。然后，我们展示了如何使用 Apache Commons IO 等外部库。</p><p>一如既往，本文中使用的代码可以在 GitHub 上找到。</p>`,42),o=[e];function c(i,l){return s(),a("div",null,o)}const k=n(p,[["render",c],["__file","2024-07-05-Java PrintStream to String.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-05/2024-07-05-Java%20PrintStream%20to%20String.html","title":"Java PrintStream 转 String","lang":"zh-CN","frontmatter":{"date":"2024-07-06T00:00:00.000Z","category":["Java","编程"],"tag":["PrintStream","字符串转换"],"head":[["meta",{"name":"keywords","content":"Java, PrintStream, 字符串, 转换"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-05/2024-07-05-Java%20PrintStream%20to%20String.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java PrintStream 转 String"}],["meta",{"property":"og:description","content":"Java PrintStream 转 String 在这篇简短的教程中，我们将介绍如何在Java中将 PrintStream 转换为 String。 我们将从使用Java核心方法开始。然后，我们将看到如何使用Apache Commons IO等外部库来实现相同的目标。 2. PrintStream 是什么 在Java中，PrintStream 是一种输..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-05T18:57:01.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"PrintStream"}],["meta",{"property":"article:tag","content":"字符串转换"}],["meta",{"property":"article:published_time","content":"2024-07-06T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-05T18:57:01.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java PrintStream 转 String\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-06T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-05T18:57:01.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java PrintStream 转 String 在这篇简短的教程中，我们将介绍如何在Java中将 PrintStream 转换为 String。 我们将从使用Java核心方法开始。然后，我们将看到如何使用Apache Commons IO等外部库来实现相同的目标。 2. PrintStream 是什么 在Java中，PrintStream 是一种输..."},"headers":[{"level":2,"title":"2. PrintStream 是什么","slug":"_2-printstream-是什么","link":"#_2-printstream-是什么","children":[]},{"level":2,"title":"3. 使用 ByteArrayOutputStream","slug":"_3-使用-bytearrayoutputstream","link":"#_3-使用-bytearrayoutputstream","children":[]},{"level":2,"title":"4. 使用自定义输出流","slug":"_4-使用自定义输出流","link":"#_4-使用自定义输出流","children":[]},{"level":2,"title":"5. 使用 Apache Commons IO","slug":"_5-使用-apache-commons-io","link":"#_5-使用-apache-commons-io","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1720205821000,"updatedTime":1720205821000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.28,"words":985},"filePathRelative":"posts/baeldung/2024-07-05/2024-07-05-Java PrintStream to String.md","localizedDate":"2024年7月6日","excerpt":"\\n<p>在这篇简短的教程中，我们将介绍如何在Java中将 PrintStream 转换为 String。</p>\\n<p>我们将从使用Java核心方法开始。然后，我们将看到如何使用Apache Commons IO等外部库来实现相同的目标。</p>\\n<h2>2. PrintStream 是什么</h2>\\n<p>在Java中，PrintStream 是一种输出流，提供了一种方便的方式来打印和格式化数据。它带有一组用于打印和格式化不同类型数据的方法，例如 println() 和 printf()。</p>\\n<p>与其他输出流不同，它永远不会抛出 IOException。然而，在出现错误的情况下，它会设置一个可以通过 checkError() 方法测试的标志。</p>","autoDesc":true}');export{k as comp,d as data};
