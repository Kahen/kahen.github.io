import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as e}from"./app-DpYLEM_u.js";const t={},p=e(`<hr><h1 id="使用scanner类读取文件时处理nosuchelementexception异常" tabindex="-1"><a class="header-anchor" href="#使用scanner类读取文件时处理nosuchelementexception异常"><span>使用Scanner类读取文件时处理NoSuchElementException异常</span></a></h1><p>在这篇简短的教程中，我们将探讨在使用Scanner类读取文件时如何处理“NoSuchElementException: No line found”异常。</p><p>首先，我们将了解异常的根本原因。然后，我们将学习如何在实践中重现它，最后，我们将学习如何修复它。</p><h3 id="_2-理解异常" tabindex="-1"><a class="header-anchor" href="#_2-理解异常"><span>2. 理解异常</span></a></h3><p>Scanner类，顾名思义，是一个Java类，提供了扫描和解析原始类型和字符串的方法。</p><p>在这些方法中，我们找到了nextLine()，它返回当前行，不包括末尾的任何行分隔符。</p><p>在深入细节之前，让我们研究一下“NoSuchElementException: No line found”意味着什么。</p><p>NoSuchElementException表示我们尝试访问的元素不存在。因此，堆栈跟踪“No line found”表明Scanner无法检索到请求的行。</p><p>这种异常最常见的原因是在没有行可读时调用nextLine()方法。</p><h3 id="_3-重现异常" tabindex="-1"><a class="header-anchor" href="#_3-重现异常"><span>3. 重现异常</span></a></h3><p>现在我们知道Scanner为什么会出现NoSuchElementException。让我们看看如何重现它。</p><p>为了举例说明异常，我们将创建一个使用Scanner.nextLine()读取文件的方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">readFileV1</span><span class="token punctuation">(</span><span class="token class-name">String</span> pathname<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token class-name">Path</span> pathFile <span class="token operator">=</span> <span class="token class-name">Paths</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>pathname<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">Files</span><span class="token punctuation">.</span><span class="token function">notExists</span><span class="token punctuation">(</span>pathFile<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">Scanner</span> scanner <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Scanner</span><span class="token punctuation">(</span>pathFile<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> scanner<span class="token punctuation">.</span><span class="token function">nextLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，我们使用Path类来表示我们想要读取的文件。</p><p>现在，让我们将一个空文件作为参数传递给我们的方法，看看会发生什么：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenEmptyFile_whenUsingReadFileV1_thenThrowException</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token class-name">Exception</span> exception <span class="token operator">=</span> <span class="token function">assertThrows</span><span class="token punctuation">(</span><span class="token class-name">NoSuchElementException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
        <span class="token class-name">ScannerNoSuchElementException</span><span class="token punctuation">.</span><span class="token function">readFileV1</span><span class="token punctuation">(</span><span class="token string">&quot;src/test/resources/emptyFile.txt&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;No line found&quot;</span><span class="token punctuation">,</span> exception<span class="token punctuation">.</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因此，尝试读取一个空文件会导致NoSuchElementException: No line found。</p><p>这里的主要原因是nextLine()期望存在一行。否则，它将抛出异常。</p><h3 id="_4-使用防御性编程解决方案" tabindex="-1"><a class="header-anchor" href="#_4-使用防御性编程解决方案"><span>4. 使用防御性编程解决方案</span></a></h3><p>避免异常的最简单方法是在调用nextLine()之前检查是否有下一行。</p><p>为此，我们可以使用hasNextLine()方法，如果输入有另一行，则返回true。</p><p>所以，让我们创建另一个方法readFileV2()作为readFileV1()的增强：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">readFileV2</span><span class="token punctuation">(</span><span class="token class-name">String</span> pathname<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token class-name">Path</span> pathFile <span class="token operator">=</span> <span class="token class-name">Paths</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>pathname<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">Files</span><span class="token punctuation">.</span><span class="token function">notExists</span><span class="token punctuation">(</span>pathFile<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">Scanner</span> scanner <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Scanner</span><span class="token punctuation">(</span>pathFile<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> scanner<span class="token punctuation">.</span><span class="token function">hasNextLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">?</span> scanner<span class="token punctuation">.</span><span class="token function">nextLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上所述，如果有下一行，我们返回它，否则返回一个空字符串。</p><p>现在，让我们使用一个测试用例来验证一切是否按预期工作：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenEmptyFile_whenUsingReadFileV2_thenSuccess</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> emptyLine <span class="token operator">=</span> <span class="token class-name">ScannerNoSuchElementException</span><span class="token punctuation">.</span><span class="token function">readFileV2</span><span class="token punctuation">(</span><span class="token string">&quot;src/test/resources/emptyFile.txt&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">,</span> emptyLine<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>解决方案工作正常，如测试用例所示。hasNextLine()防止nextLine()抛出异常。</p><p>另一种解决方案是在使用Scanner读取之前检查给定的文件是否为空：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">readFileV3</span><span class="token punctuation">(</span><span class="token class-name">String</span> pathname<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token class-name">Path</span> pathFile <span class="token operator">=</span> <span class="token class-name">Paths</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>pathname<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">Files</span><span class="token punctuation">.</span><span class="token function">notExists</span><span class="token punctuation">(</span>pathFile<span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token class-name">Files</span><span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span>pathFile<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">Scanner</span> scanner <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Scanner</span><span class="token punctuation">(</span>pathFile<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> scanner<span class="token punctuation">.</span><span class="token function">nextLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样，我们确保至少一行将被nextLine()消费。因此，我们省略了hasNextLine()。</p><p>现在，让我们测试这种新方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenEmptyFile_whenUsingReadFileV3_thenSuccess</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> emptyLine <span class="token operator">=</span> <span class="token class-name">ScannerNoSuchElementException</span><span class="token punctuation">.</span><span class="token function">readFileV3</span><span class="token punctuation">(</span><span class="token string">&quot;src/test/resources/emptyFile.txt&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">,</span> emptyLine<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-使用异常处理解决方案" tabindex="-1"><a class="header-anchor" href="#_5-使用异常处理解决方案"><span>5. 使用异常处理解决方案</span></a></h3><p>或者，我们可以使用try-catch块以传统方式处理NoSuchElementException：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">readFileV4</span><span class="token punctuation">(</span><span class="token class-name">String</span> pathname<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token class-name">Path</span> pathFile <span class="token operator">=</span> <span class="token class-name">Paths</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>pathname<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">Files</span><span class="token punctuation">.</span><span class="token function">notExists</span><span class="token punctuation">(</span>pathFile<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">Scanner</span> scanner <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Scanner</span><span class="token punctuation">(</span>pathFile<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> scanner<span class="token punctuation">.</span><span class="token function">nextLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">NoSuchElementException</span> exception<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上所示，我们捕获了异常并返回了一个空字符串。</p><p>最后，让我们使用一个测试用例来确认：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenEmptyFile_whenUsingReadFileV4_thenSuccess</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> emptyLine <span class="token operator">=</span> <span class="token class-name">ScannerNoSuchElementException</span><span class="token punctuation">.</span><span class="token function">readFileV4</span><span class="token punctuation">(</span><span class="token string">&quot;src/test/resources/emptyFile.txt&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">,</span> emptyLine<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h3><p>在本文中，我们学习了Scanner在读取文件时抛出“NoSuchElementException: No line found”的原因。</p><p>然后，我们通过实际示例了解了如何产生异常以及如何修复它。</p><p>如往常一样，示例的完整源代码可在GitHub上获得。</p>`,43),c=[p];function o(l,i){return s(),a("div",null,c)}const k=n(t,[["render",o],["__file","2024-07-05-Handle NoSuchElementException When Reading a File Through Scanner.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-05/2024-07-05-Handle%20NoSuchElementException%20When%20Reading%20a%20File%20Through%20Scanner.html","title":"使用Scanner类读取文件时处理NoSuchElementException异常","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Exception Handling"],"tag":["NoSuchElementException","Scanner","Java"],"head":[["meta",{"name":"keywords","content":"NoSuchElementException, Scanner, Java, 文件读取, 异常处理"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-05/2024-07-05-Handle%20NoSuchElementException%20When%20Reading%20a%20File%20Through%20Scanner.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用Scanner类读取文件时处理NoSuchElementException异常"}],["meta",{"property":"og:description","content":"使用Scanner类读取文件时处理NoSuchElementException异常 在这篇简短的教程中，我们将探讨在使用Scanner类读取文件时如何处理“NoSuchElementException: No line found”异常。 首先，我们将了解异常的根本原因。然后，我们将学习如何在实践中重现它，最后，我们将学习如何修复它。 2. 理解异常 ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-05T02:46:37.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"NoSuchElementException"}],["meta",{"property":"article:tag","content":"Scanner"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-05T02:46:37.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用Scanner类读取文件时处理NoSuchElementException异常\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-05T02:46:37.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用Scanner类读取文件时处理NoSuchElementException异常 在这篇简短的教程中，我们将探讨在使用Scanner类读取文件时如何处理“NoSuchElementException: No line found”异常。 首先，我们将了解异常的根本原因。然后，我们将学习如何在实践中重现它，最后，我们将学习如何修复它。 2. 理解异常 ..."},"headers":[{"level":3,"title":"2. 理解异常","slug":"_2-理解异常","link":"#_2-理解异常","children":[]},{"level":3,"title":"3. 重现异常","slug":"_3-重现异常","link":"#_3-重现异常","children":[]},{"level":3,"title":"4. 使用防御性编程解决方案","slug":"_4-使用防御性编程解决方案","link":"#_4-使用防御性编程解决方案","children":[]},{"level":3,"title":"5. 使用异常处理解决方案","slug":"_5-使用异常处理解决方案","link":"#_5-使用异常处理解决方案","children":[]},{"level":3,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1720147597000,"updatedTime":1720147597000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.09,"words":927},"filePathRelative":"posts/baeldung/2024-07-05/2024-07-05-Handle NoSuchElementException When Reading a File Through Scanner.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>使用Scanner类读取文件时处理NoSuchElementException异常</h1>\\n<p>在这篇简短的教程中，我们将探讨在使用Scanner类读取文件时如何处理“NoSuchElementException: No line found”异常。</p>\\n<p>首先，我们将了解异常的根本原因。然后，我们将学习如何在实践中重现它，最后，我们将学习如何修复它。</p>\\n<h3>2. 理解异常</h3>\\n<p>Scanner类，顾名思义，是一个Java类，提供了扫描和解析原始类型和字符串的方法。</p>\\n<p>在这些方法中，我们找到了nextLine()，它返回当前行，不包括末尾的任何行分隔符。</p>","autoDesc":true}');export{k as comp,d as data};
