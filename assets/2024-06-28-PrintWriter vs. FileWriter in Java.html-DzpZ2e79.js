import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-CtR6X2Br.js";const e={},p=t(`<h1 id="java中的printwriter与filewriter对比-baeldung" tabindex="-1"><a class="header-anchor" href="#java中的printwriter与filewriter对比-baeldung"><span>Java中的PrintWriter与FileWriter对比 | Baeldung</span></a></h1><h2 id="_1-概览" tabindex="-1"><a class="header-anchor" href="#_1-概览"><span>1. 概览</span></a></h2><p>Java标准库提供了文件操作的API。<strong>PrintWriter和FileWriter类帮助将字符写入到文件中</strong>。然而，这两个类适用于不同的使用场景。</p><p>在本教程中，我们将探讨PrintWriter和FileWriter的详细情况，包括它们的用例。同时，我们还将看到这两个类之间的区别和相似之处。</p><p><strong>PrintWriter类帮助将格式化文本写入到输出流，如文件和控制台</strong>。</p><p>此外，PrintWriter类的方法不会抛出IOException。相反，它有一个checkError()方法来了解写操作的状态。checkError()方法如果写操作通过则返回false，如果由于错误失败则返回true。</p><p>此外，如果流在检查错误状态之前未关闭，则checkError()还会刷新流。</p><p>PrintWriter还提供了一个名为flush()的方法，以在写操作后显式刷新流。但是，当使用try-with-resources语句块时，无需显式刷新流。</p><h3 id="_2-1-printwriter-println" tabindex="-1"><a class="header-anchor" href="#_2-1-printwriter-println"><span>2.1 PrintWriter.println()</span></a></h3><p>println()方法将字符串写入到输出流，并以新行结束。它不能将格式化文本写入到输出流。</p><p>此外，如果我们决定不以新行结束字符串，PrintWriter还提供了print()方法。</p><p>以下是使用println()方法将字符串写入文件的示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenWritingToTextFileUsingPrintWriterPrintln_thenTextMatches</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> result <span class="token operator">=</span> <span class="token string">&quot;I&#39;m going to Alabama\\nAlabama is a state in the US\\n&quot;</span><span class="token punctuation">;</span>
    <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">PrintWriter</span> pw <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PrintWriter</span><span class="token punctuation">(</span><span class="token string">&quot;alabama.txt&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        pw<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;I&#39;m going to Alabama&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        pw<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Alabama is a state in the US&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token class-name">Path</span> path <span class="token operator">=</span> <span class="token class-name">Paths</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;alabama.txt&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> actualData <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span><span class="token class-name">Files</span><span class="token punctuation">.</span><span class="token function">readAllBytes</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span>result<span class="token punctuation">,</span> actualData<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们创建了一个PrintWriter对象，它以文件路径作为参数。接下来，我们在PrintWriter对象上调用println()方法将字符写入文件。</p><p>最后，我们断言预期结果等于文件内容。</p><p><strong>值得注意的是，PrintWriter还提供了一个write()方法将文本写入文件，我们可以将其替换print()方法使用</strong>。</p><h3 id="_2-2-printwriter-printf" tabindex="-1"><a class="header-anchor" href="#_2-2-printwriter-printf"><span>2.2 PrintWriter.printf()</span></a></h3><p><strong>printf()方法帮助将格式化文本写入到输出流</strong>。我们可以使用像%s, %d, %.2f等格式说明符将不同数据类型写入到输出流。</p><p>让我们看看使用printf()将格式化数据写入文件的示例代码：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenWritingToTextFileUsingPrintWriterPrintf_thenTextMatches</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> result <span class="token operator">=</span> <span class="token string">&quot;Dreams from My Father by Barack Obama&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">File</span> file <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">File</span><span class="token punctuation">(</span><span class="token string">&quot;dream.txt&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">PrintWriter</span> pw <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PrintWriter</span><span class="token punctuation">(</span>file<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> author <span class="token operator">=</span> <span class="token string">&quot;Barack Obama&quot;</span><span class="token punctuation">;</span>
        pw<span class="token punctuation">.</span><span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;Dreams from My Father by %s&quot;</span><span class="token punctuation">,</span> author<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token operator">!</span>pw<span class="token punctuation">.</span><span class="token function">checkError</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">BufferedReader</span> reader <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BufferedReader</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">FileReader</span><span class="token punctuation">(</span>file<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> actualData <span class="token operator">=</span> reader<span class="token punctuation">.</span><span class="token function">readLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">assertEquals</span><span class="token punctuation">(</span>result<span class="token punctuation">,</span> actualData<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的代码中，我们将格式化文本写入到文件。我们使用%s标识符直接添加String数据类型到文本中。</p><p>我们还创建了一个BufferedReader实例，它以FileReader对象作为参数来读取文件的内容。</p><p>由于该方法不抛出IOException，我们调用checkError()方法来了解写操作的状态。在这种情况下，checkError()返回false，表示没有错误。</p><h2 id="_3-filewriter" tabindex="-1"><a class="header-anchor" href="#_3-filewriter"><span>3. FileWriter</span></a></h2><p>FileWriter类扩展了Writer类。<strong>它提供了一个方便的方法，使用预设的缓冲区大小将字符写入文件</strong>。</p><p>FileWriter不会自动刷新缓冲区。我们需要调用flush()方法。然而，当FileWriter与try-with-resources语句块一起使用时，它在退出块时自动刷新并关闭流。</p><p><strong>此外，如果文件丢失，文件无法打开等情况下，它会抛出IOException</strong>。</p><p>与PrintWriter不同，它不能将格式化文本写入文件。</p><p>让我们看看使用FileWriter类中的write()方法将字符写入File的示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenWritingToTextFileUsingFileWriter_thenTextMatches</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> result <span class="token operator">=</span> <span class="token string">&quot;Harry Potter and the Chamber of Secrets&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">File</span> file <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">File</span><span class="token punctuation">(</span><span class="token string">&quot;potter.txt&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">FileWriter</span> fw <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileWriter</span><span class="token punctuation">(</span>file<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        fw<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span><span class="token string">&quot;Harry Potter and the Chamber of Secrets&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">BufferedReader</span> reader <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BufferedReader</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">FileReader</span><span class="token punctuation">(</span>file<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> actualData <span class="token operator">=</span> reader<span class="token punctuation">.</span><span class="token function">readLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">assertEquals</span><span class="token punctuation">(</span>result<span class="token punctuation">,</span> actualData<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的代码中，我们创建了一个File实例，并将其传递给FileWriter对象。接下来，我们在FileWriter对象上调用write()方法将字符串字符写入文件。</p><p>最后，我们断言预期结果等于文件内容。</p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们学习了FileWriter和PrintWriter的基本用法，并提供了示例代码。</p><p>FileWriter的主要目的是将字符写入文件。<strong>然而，PrintWriter具有更多功能。它可以写入除了文件之外的其他输出流</strong>。此外，它还提供了一种方法，可以将格式化文本写入文件或控制台。</p><p>如常，示例的源代码可在GitHub上找到。</p><p>OK</p>`,37),i=[p];function r(o,c){return s(),a("div",null,i)}const k=n(e,[["render",r],["__file","2024-06-28-PrintWriter vs. FileWriter in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-06-28/2024-06-28-PrintWriter%20vs.%20FileWriter%20in%20Java.html","title":"Java中的PrintWriter与FileWriter对比 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","文件操作"],"tag":["PrintWriter","FileWriter"],"head":[["meta",{"name":"keywords","content":"Java, 文件写入, 格式化文本"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-28/2024-06-28-PrintWriter%20vs.%20FileWriter%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中的PrintWriter与FileWriter对比 | Baeldung"}],["meta",{"property":"og:description","content":"Java中的PrintWriter与FileWriter对比 | Baeldung 1. 概览 Java标准库提供了文件操作的API。PrintWriter和FileWriter类帮助将字符写入到文件中。然而，这两个类适用于不同的使用场景。 在本教程中，我们将探讨PrintWriter和FileWriter的详细情况，包括它们的用例。同时，我们还将看到..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-28T11:27:08.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"PrintWriter"}],["meta",{"property":"article:tag","content":"FileWriter"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-28T11:27:08.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中的PrintWriter与FileWriter对比 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-28T11:27:08.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中的PrintWriter与FileWriter对比 | Baeldung 1. 概览 Java标准库提供了文件操作的API。PrintWriter和FileWriter类帮助将字符写入到文件中。然而，这两个类适用于不同的使用场景。 在本教程中，我们将探讨PrintWriter和FileWriter的详细情况，包括它们的用例。同时，我们还将看到..."},"headers":[{"level":2,"title":"1. 概览","slug":"_1-概览","link":"#_1-概览","children":[{"level":3,"title":"2.1 PrintWriter.println()","slug":"_2-1-printwriter-println","link":"#_2-1-printwriter-println","children":[]},{"level":3,"title":"2.2 PrintWriter.printf()","slug":"_2-2-printwriter-printf","link":"#_2-2-printwriter-printf","children":[]}]},{"level":2,"title":"3. FileWriter","slug":"_3-filewriter","link":"#_3-filewriter","children":[]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1719574028000,"updatedTime":1719574028000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.72,"words":1117},"filePathRelative":"posts/baeldung/2024-06-28/2024-06-28-PrintWriter vs. FileWriter in Java.md","localizedDate":"2022年4月1日","excerpt":"\\n<h2>1. 概览</h2>\\n<p>Java标准库提供了文件操作的API。<strong>PrintWriter和FileWriter类帮助将字符写入到文件中</strong>。然而，这两个类适用于不同的使用场景。</p>\\n<p>在本教程中，我们将探讨PrintWriter和FileWriter的详细情况，包括它们的用例。同时，我们还将看到这两个类之间的区别和相似之处。</p>\\n<p><strong>PrintWriter类帮助将格式化文本写入到输出流，如文件和控制台</strong>。</p>\\n<p>此外，PrintWriter类的方法不会抛出IOException。相反，它有一个checkError()方法来了解写操作的状态。checkError()方法如果写操作通过则返回false，如果由于错误失败则返回true。</p>","autoDesc":true}');export{k as comp,d as data};
