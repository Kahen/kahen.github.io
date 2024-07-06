import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-ConjvFaO.js";const e={},p=t(`<h1 id="java中逐字符读取输入的方法" tabindex="-1"><a class="header-anchor" href="#java中逐字符读取输入的方法"><span>Java中逐字符读取输入的方法</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>在许多Java应用程序中，我们需要逐字符地读取输入数据，这通常是一个常见的任务，尤其是在处理来自流源的大量数据时。</p><p><strong>在本教程中，我们将探讨Java中逐字符读取数据的不同方法。</strong></p><h2 id="_2-使用bufferedreader进行控制台输入" tabindex="-1"><a class="header-anchor" href="#_2-使用bufferedreader进行控制台输入"><span>2. 使用BufferedReader进行控制台输入</span></a></h2><p>我们可以利用BufferedReader从控制台逐字符地执行读取。<strong>请注意，如果我们要交互式地读取字符，这种方法很有帮助。</strong></p><p>让我们来看一个例子：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenInputFromConsole_whenUsingBufferedStream_thenReadCharByChar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token class-name">ByteArrayInputStream</span> inputStream <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ByteArrayInputStream</span><span class="token punctuation">(</span><span class="token string">&quot;TestInput&quot;</span><span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">setIn</span><span class="token punctuation">(</span>inputStream<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">BufferedReader</span> buffer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BufferedReader</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">InputStreamReader</span><span class="token punctuation">(</span><span class="token class-name">System</span><span class="token punctuation">.</span>in<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span> result <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">char</span><span class="token punctuation">[</span><span class="token number">9</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> index <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> c<span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>c <span class="token operator">=</span> buffer<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            result<span class="token punctuation">[</span>index<span class="token operator">++</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">char</span><span class="token punctuation">)</span> c<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token function">assertArrayEquals</span><span class="token punctuation">(</span><span class="token string">&quot;TestInput&quot;</span><span class="token punctuation">.</span><span class="token function">toCharArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们通过实例化一个包含“TestInput”内容的ByteArrayInputStream来模拟控制台输入。然后，我们使用BufferedReader从System.in读取字符。之后，我们使用read()方法读取一个字符作为整数代码，并将其转换为char。最后，我们使用assertArrayEquals()方法来验证读取的字符是否与预期的输入匹配。</p><h2 id="_3-使用filereader从文件中读取" tabindex="-1"><a class="header-anchor" href="#_3-使用filereader从文件中读取"><span>3. 使用FileReader从文件中读取</span></a></h2><p>当处理文件时，FileReader是逐字符读取的合适选择：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenInputFromFile_whenUsingFileReader_thenReadCharByChar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token class-name">File</span> tempFile <span class="token operator">=</span> <span class="token class-name">File</span><span class="token punctuation">.</span><span class="token function">createTempFile</span><span class="token punctuation">(</span><span class="token string">&quot;tempTestFile&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;.txt&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">FileWriter</span> fileWriter <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileWriter</span><span class="token punctuation">(</span>tempFile<span class="token punctuation">)</span><span class="token punctuation">;</span>
    fileWriter<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span><span class="token string">&quot;TestFileContent&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    fileWriter<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">FileReader</span> fileReader <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileReader</span><span class="token punctuation">(</span>tempFile<span class="token punctuation">.</span><span class="token function">getAbsolutePath</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span> result <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">char</span><span class="token punctuation">[</span><span class="token number">15</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> index <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> charCode<span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>charCode <span class="token operator">=</span> fileReader<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            result<span class="token punctuation">[</span>index<span class="token operator">++</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">char</span><span class="token punctuation">)</span> charCode<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token function">assertArrayEquals</span><span class="token punctuation">(</span><span class="token string">&quot;TestFileContent&quot;</span><span class="token punctuation">.</span><span class="token function">toCharArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上述代码中，我们创建了一个带有“tempTestFile”内容的临时测试文件进行模拟。然后，我们使用FileReader通过tempFile.getAbsolutePath()方法指定的路径建立与文件的连接。在try-with-resources块中，我们逐字符读取文件。</p><h2 id="_4-使用scanner进行标记化输入" tabindex="-1"><a class="header-anchor" href="#_4-使用scanner进行标记化输入"><span>4. 使用Scanner进行标记化输入</span></a></h2><p>对于更灵活的方法，允许标记化输入，我们可以使用Scanner：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenInputFromConsole_whenUsingScanner_thenReadCharByChar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">ByteArrayInputStream</span> inputStream <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ByteArrayInputStream</span><span class="token punctuation">(</span><span class="token string">&quot;TestInput&quot;</span><span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">setIn</span><span class="token punctuation">(</span>inputStream<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">Scanner</span> scanner <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Scanner</span><span class="token punctuation">(</span><span class="token class-name">System</span><span class="token punctuation">.</span>in<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>scanner<span class="token punctuation">.</span><span class="token function">hasNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span> result <span class="token operator">=</span> scanner<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toCharArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">assertArrayEquals</span><span class="token punctuation">(</span><span class="token string">&quot;TestInput&quot;</span><span class="token punctuation">.</span><span class="token function">toCharArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上述测试方法中，我们通过实例化一个包含“TestInput”内容的ByteArrayInputStream来模拟控制台输入。<strong>然后，我们使用hasNext()方法来验证是否还有另一个标记。之后，我们使用next()方法将当前的标记作为String获取。</strong></p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>总之，我们探索了Java中读取字符的不同方法，涵盖了使用BufferedReader进行交互式控制台输入、使用FileReader进行基于文件的字符读取以及通过Scanner处理标记化输入，为开发者在不同场景中高效处理字符数据提供了多样化的方法。</p><p>如往常一样，本文的完整代码示例可以在GitHub上找到。</p>`,20),o=[p];function c(l,u){return s(),a("div",null,o)}const k=n(e,[["render",c],["__file","2024-06-24-Read Input Character by Character in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-06-24/2024-06-24-Read%20Input%20Character%20by%20Character%20in%20Java.html","title":"Java中逐字符读取输入的方法","lang":"zh-CN","frontmatter":{"category":["Java","输入处理"],"tag":["Java","BufferedReader","FileReader","Scanner"],"head":[["meta",{"name":"keywords","content":"Java, 输入处理, BufferedReader, FileReader, Scanner"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-24/2024-06-24-Read%20Input%20Character%20by%20Character%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中逐字符读取输入的方法"}],["meta",{"property":"og:description","content":"Java中逐字符读取输入的方法 1. 引言 在许多Java应用程序中，我们需要逐字符地读取输入数据，这通常是一个常见的任务，尤其是在处理来自流源的大量数据时。 在本教程中，我们将探讨Java中逐字符读取数据的不同方法。 2. 使用BufferedReader进行控制台输入 我们可以利用BufferedReader从控制台逐字符地执行读取。请注意，如果我..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-24T09:50:47.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"BufferedReader"}],["meta",{"property":"article:tag","content":"FileReader"}],["meta",{"property":"article:tag","content":"Scanner"}],["meta",{"property":"article:modified_time","content":"2024-06-24T09:50:47.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中逐字符读取输入的方法\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-06-24T09:50:47.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中逐字符读取输入的方法 1. 引言 在许多Java应用程序中，我们需要逐字符地读取输入数据，这通常是一个常见的任务，尤其是在处理来自流源的大量数据时。 在本教程中，我们将探讨Java中逐字符读取数据的不同方法。 2. 使用BufferedReader进行控制台输入 我们可以利用BufferedReader从控制台逐字符地执行读取。请注意，如果我..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 使用BufferedReader进行控制台输入","slug":"_2-使用bufferedreader进行控制台输入","link":"#_2-使用bufferedreader进行控制台输入","children":[]},{"level":2,"title":"3. 使用FileReader从文件中读取","slug":"_3-使用filereader从文件中读取","link":"#_3-使用filereader从文件中读取","children":[]},{"level":2,"title":"4. 使用Scanner进行标记化输入","slug":"_4-使用scanner进行标记化输入","link":"#_4-使用scanner进行标记化输入","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1719222647000,"updatedTime":1719222647000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.37,"words":711},"filePathRelative":"posts/baeldung/2024-06-24/2024-06-24-Read Input Character by Character in Java.md","localizedDate":"2024年6月24日","excerpt":"\\n<h2>1. 引言</h2>\\n<p>在许多Java应用程序中，我们需要逐字符地读取输入数据，这通常是一个常见的任务，尤其是在处理来自流源的大量数据时。</p>\\n<p><strong>在本教程中，我们将探讨Java中逐字符读取数据的不同方法。</strong></p>\\n<h2>2. 使用BufferedReader进行控制台输入</h2>\\n<p>我们可以利用BufferedReader从控制台逐字符地执行读取。<strong>请注意，如果我们要交互式地读取字符，这种方法很有帮助。</strong></p>\\n<p>让我们来看一个例子：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token annotation punctuation\\">@Test</span>\\n<span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">void</span> <span class=\\"token function\\">givenInputFromConsole_whenUsingBufferedStream_thenReadCharByChar</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token keyword\\">throws</span> <span class=\\"token class-name\\">IOException</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token class-name\\">ByteArrayInputStream</span> inputStream <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">ByteArrayInputStream</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"TestInput\\"</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">getBytes</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token class-name\\">System</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">setIn</span><span class=\\"token punctuation\\">(</span>inputStream<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\n    <span class=\\"token keyword\\">try</span> <span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">BufferedReader</span> buffer <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">BufferedReader</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">InputStreamReader</span><span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">System</span><span class=\\"token punctuation\\">.</span>in<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token keyword\\">char</span><span class=\\"token punctuation\\">[</span><span class=\\"token punctuation\\">]</span> result <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token keyword\\">char</span><span class=\\"token punctuation\\">[</span><span class=\\"token number\\">9</span><span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token keyword\\">int</span> index <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token keyword\\">int</span> c<span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token keyword\\">while</span> <span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">(</span>c <span class=\\"token operator\\">=</span> buffer<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">read</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">!=</span> <span class=\\"token operator\\">-</span><span class=\\"token number\\">1</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n            result<span class=\\"token punctuation\\">[</span>index<span class=\\"token operator\\">++</span><span class=\\"token punctuation\\">]</span> <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">char</span><span class=\\"token punctuation\\">)</span> c<span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token punctuation\\">}</span>\\n\\n        <span class=\\"token function\\">assertArrayEquals</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"TestInput\\"</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">toCharArray</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">,</span> result<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{k as comp,d as data};
