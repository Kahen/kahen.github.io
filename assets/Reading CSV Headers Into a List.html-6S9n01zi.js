import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-j3liftxp.js";const e={},p=t(`<h1 id="在java中读取csv头部到列表的不同方式" tabindex="-1"><a class="header-anchor" href="#在java中读取csv头部到列表的不同方式"><span>在Java中读取CSV头部到列表的不同方式</span></a></h1><p>在这篇简短的教程中，我们将探讨在Java中将CSV头部读取到列表的不同方法。</p><p>首先，我们将学习如何使用JDK类来完成这项任务。然后，我们将看到如何使用如OpenCSV和Apache Commons CSV等外部库来实现相同的目标。</p><h2 id="_2-使用bufferedreader" tabindex="-1"><a class="header-anchor" href="#_2-使用bufferedreader"><span>2. 使用BufferedReader</span></a></h2><p>BufferedReader类为我们的挑战提供了最简单的解决方案。它提供了一种快速高效的方式来读取CSV文件，因为它通过分块读取内容来减少IO操作的次数。</p><p>让我们看看它的实际应用：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">CsvHeadersAsListUnitTest</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">CSV_FILE</span> <span class="token operator">=</span> <span class="token string">&quot;src/test/resources/employees.csv&quot;</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">COMMA_DELIMITER</span> <span class="token operator">=</span> <span class="token string">&quot;,&quot;</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">List</span>\\<span class="token operator">&lt;</span><span class="token class-name">String</span>\\<span class="token operator">&gt;</span> <span class="token constant">EXPECTED_HEADERS</span> <span class="token operator">=</span> <span class="token class-name">List</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;ID&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;First name&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Last name&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Salary&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">void</span> <span class="token function">givenCsvFile_whenUsingBufferedReader_thenGetHeadersAsList</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">BufferedReader</span> reader <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BufferedReader</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">FileReader</span><span class="token punctuation">(</span><span class="token constant">CSV_FILE</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">String</span> csvHeadersLine <span class="token operator">=</span> reader<span class="token punctuation">.</span><span class="token function">readLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">List</span>\\<span class="token operator">&lt;</span><span class="token class-name">String</span>\\<span class="token operator">&gt;</span> headers <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span>csvHeadersLine<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token constant">COMMA_DELIMITER</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">assertThat</span><span class="token punctuation">(</span>headers<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">containsExactlyElementsOf</span><span class="token punctuation">(</span><span class="token constant">EXPECTED_HEADERS</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如我们所见，我们使用try-with-resources来创建一个BufferedReader实例。这样，我们确保文件在之后被关闭。此外，我们调用readLine()方法一次以提取表示头部的第一行。最后，我们使用split()方法和Arrays#asList来将头部作为列表获取。</p><h2 id="_3-使用scanner" tabindex="-1"><a class="header-anchor" href="#_3-使用scanner"><span>3. 使用Scanner</span></a></h2><p>Scanner类提供了另一种解决方案来实现相同的结果。顾名思义，它扫描并读取给定文件的内容。让我们添加另一个测试用例，看看如何使用Scanner读取CSV文件头部：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenCsvFile_whenUsingScanner_thenGetHeadersAsList</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token keyword">try</span><span class="token punctuation">(</span><span class="token class-name">Scanner</span> scanner <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Scanner</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">File</span><span class="token punctuation">(</span><span class="token constant">CSV_FILE</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> csvHeadersLine <span class="token operator">=</span> scanner<span class="token punctuation">.</span><span class="token function">nextLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">List</span>\\<span class="token operator">&lt;</span><span class="token class-name">String</span>\\<span class="token operator">&gt;</span> headers <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span>csvHeadersLine<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token constant">COMMA_DELIMITER</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">assertThat</span><span class="token punctuation">(</span>headers<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">containsExactlyElementsOf</span><span class="token punctuation">(</span><span class="token constant">EXPECTED_HEADERS</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同样，Scanner类有nextLine()方法，我们可以使用它来获取输入文件的第一行。在这里，第一行代表我们CSV文件的头部。</p><h2 id="_4-使用opencsv" tabindex="-1"><a class="header-anchor" href="#_4-使用opencsv"><span>4. 使用OpenCSV</span></a></h2><p>另外，我们可以使用OpenCSV库来读取特定CSV文件的头部。在深入细节之前，让我们将Maven依赖项添加到pom.xml文件中：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\\<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency\\</span><span class="token punctuation">&gt;</span></span>
    \\<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId\\</span><span class="token punctuation">&gt;</span></span>com.opencsv\\<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId\\</span><span class="token punctuation">&gt;</span></span>
    \\<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId\\</span><span class="token punctuation">&gt;</span></span>opencsv\\<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId\\</span><span class="token punctuation">&gt;</span></span>
    \\<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version\\</span><span class="token punctuation">&gt;</span></span>5.9\\<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version\\</span><span class="token punctuation">&gt;</span></span>
\\<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency\\</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通常，OpenCSV带有一套现成的类和方法，用于读取和解析CSV文件。让我们通过一个实际的例子来说明这个库的使用：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenCsvFile_whenUsingOpenCSV_thenGetHeadersAsList</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">CsvValidationException</span><span class="token punctuation">,</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">CSVReader</span> csvReader <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CSVReader</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">FileReader</span><span class="token punctuation">(</span><span class="token constant">CSV_FILE</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">List</span>\\<span class="token operator">&lt;</span><span class="token class-name">String</span>\\<span class="token operator">&gt;</span> headers <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span>csvReader<span class="token punctuation">.</span><span class="token function">readNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">assertThat</span><span class="token punctuation">(</span>headers<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">containsExactlyElementsOf</span><span class="token punctuation">(</span><span class="token constant">EXPECTED_HEADERS</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上所见，OpenCSV提供了CSVReader类来读取给定文件的内容。CSVReader类提供了readNext()方法，直接将下一行作为String数组检索。</p><h2 id="_5-使用apache-commons-csv" tabindex="-1"><a class="header-anchor" href="#_5-使用apache-commons-csv"><span>5. 使用Apache Commons CSV</span></a></h2><p>另一种解决方案是使用Apache Commons CSV库。顾名思义，它为创建和读取CSV文件提供了几种便利的功能。</p><p>首先，我们需要将最新版本的依赖项添加到pom.xml中：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\\<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency\\</span><span class="token punctuation">&gt;</span></span>
    \\<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId\\</span><span class="token punctuation">&gt;</span></span>org.apache.commons\\<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId\\</span><span class="token punctuation">&gt;</span></span>
    \\<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId\\</span><span class="token punctuation">&gt;</span></span>commons-csv\\<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId\\</span><span class="token punctuation">&gt;</span></span>
    \\<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version\\</span><span class="token punctuation">&gt;</span></span>1.11.0\\<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version\\</span><span class="token punctuation">&gt;</span></span>
\\<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency\\</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>简而言之，Apache Commons CSV的CSVParser类提供了getHeaderNames()方法来返回一个只读的头部名称列表：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenCsvFile_whenUsingApacheCommonsCsv_thenGetHeadersAsList</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token class-name">CSVFormat</span> csvFormat <span class="token operator">=</span> <span class="token class-name">CSVFormat</span><span class="token punctuation">.</span><span class="token constant">DEFAULT</span><span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">setDelimiter</span><span class="token punctuation">(</span><span class="token constant">COMMA_DELIMITER</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">setHeader</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">BufferedReader</span> reader <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BufferedReader</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">FileReader</span><span class="token punctuation">(</span><span class="token constant">CSV_FILE</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">CSVParser</span> parser <span class="token operator">=</span> <span class="token class-name">CSVParser</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>reader<span class="token punctuation">,</span> csvFormat<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">List</span>\\<span class="token operator">&lt;</span><span class="token class-name">String</span>\\<span class="token operator">&gt;</span> headers <span class="token operator">=</span> parser<span class="token punctuation">.</span><span class="token function">getHeaderNames</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">assertThat</span><span class="token punctuation">(</span>headers<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">containsExactlyElementsOf</span><span class="token punctuation">(</span><span class="token constant">EXPECTED_HEADERS</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们使用CSVParser类根据指定的格式解析输入文件。头部通过setHeader()方法的帮助自动从输入文件中解析。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在这篇短文中，我们探讨了将CSV文件头部作为列表读取的不同解决方案。</p><p>首先，我们学习了如何使用JDK来做到这一点。然后，我们看到如何使用外部库来实现相同的目标。</p><p>如常，本文中使用的代码可以在GitHub上找到。</p>`,29),o=[p];function c(l,i){return a(),s("div",null,o)}const k=n(e,[["render",c],["__file","Reading CSV Headers Into a List.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/Archive/Reading%20CSV%20Headers%20Into%20a%20List.html","title":"在Java中读取CSV头部到列表的不同方式","lang":"zh-CN","frontmatter":{"date":"2024-06-13T00:00:00.000Z","category":["Java","CSV"],"tag":["Java","CSV","OpenCSV","Apache Commons CSV"],"description":"在Java中读取CSV头部到列表的不同方式 在这篇简短的教程中，我们将探讨在Java中将CSV头部读取到列表的不同方法。 首先，我们将学习如何使用JDK类来完成这项任务。然后，我们将看到如何使用如OpenCSV和Apache Commons CSV等外部库来实现相同的目标。 2. 使用BufferedReader BufferedReader类为我们的...","head":[["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/Reading%20CSV%20Headers%20Into%20a%20List.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Java中读取CSV头部到列表的不同方式"}],["meta",{"property":"og:description","content":"在Java中读取CSV头部到列表的不同方式 在这篇简短的教程中，我们将探讨在Java中将CSV头部读取到列表的不同方法。 首先，我们将学习如何使用JDK类来完成这项任务。然后，我们将看到如何使用如OpenCSV和Apache Commons CSV等外部库来实现相同的目标。 2. 使用BufferedReader BufferedReader类为我们的..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"CSV"}],["meta",{"property":"article:tag","content":"OpenCSV"}],["meta",{"property":"article:tag","content":"Apache Commons CSV"}],["meta",{"property":"article:published_time","content":"2024-06-13T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Java中读取CSV头部到列表的不同方式\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-13T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]]},"headers":[{"level":2,"title":"2. 使用BufferedReader","slug":"_2-使用bufferedreader","link":"#_2-使用bufferedreader","children":[]},{"level":2,"title":"3. 使用Scanner","slug":"_3-使用scanner","link":"#_3-使用scanner","children":[]},{"level":2,"title":"4. 使用OpenCSV","slug":"_4-使用opencsv","link":"#_4-使用opencsv","children":[]},{"level":2,"title":"5. 使用Apache Commons CSV","slug":"_5-使用apache-commons-csv","link":"#_5-使用apache-commons-csv","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":2.97,"words":891},"filePathRelative":"posts/baeldung/Archive/Reading CSV Headers Into a List.md","localizedDate":"2024年6月13日","excerpt":"\\n<p>在这篇简短的教程中，我们将探讨在Java中将CSV头部读取到列表的不同方法。</p>\\n<p>首先，我们将学习如何使用JDK类来完成这项任务。然后，我们将看到如何使用如OpenCSV和Apache Commons CSV等外部库来实现相同的目标。</p>\\n<h2>2. 使用BufferedReader</h2>\\n<p>BufferedReader类为我们的挑战提供了最简单的解决方案。它提供了一种快速高效的方式来读取CSV文件，因为它通过分块读取内容来减少IO操作的次数。</p>\\n<p>让我们看看它的实际应用：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">CsvHeadersAsListUnitTest</span> <span class=\\"token punctuation\\">{</span>\\n\\n    <span class=\\"token keyword\\">private</span> <span class=\\"token keyword\\">static</span> <span class=\\"token keyword\\">final</span> <span class=\\"token class-name\\">String</span> <span class=\\"token constant\\">CSV_FILE</span> <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\\"src/test/resources/employees.csv\\"</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">private</span> <span class=\\"token keyword\\">static</span> <span class=\\"token keyword\\">final</span> <span class=\\"token class-name\\">String</span> <span class=\\"token constant\\">COMMA_DELIMITER</span> <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\\",\\"</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">private</span> <span class=\\"token keyword\\">static</span> <span class=\\"token keyword\\">final</span> <span class=\\"token class-name\\">List</span>\\\\<span class=\\"token operator\\">&lt;</span><span class=\\"token class-name\\">String</span>\\\\<span class=\\"token operator\\">&gt;</span> <span class=\\"token constant\\">EXPECTED_HEADERS</span> <span class=\\"token operator\\">=</span> <span class=\\"token class-name\\">List</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">of</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"ID\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"First name\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"Last name\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"Salary\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\n    <span class=\\"token annotation punctuation\\">@Test</span>\\n    <span class=\\"token keyword\\">void</span> <span class=\\"token function\\">givenCsvFile_whenUsingBufferedReader_thenGetHeadersAsList</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token keyword\\">throws</span> <span class=\\"token class-name\\">IOException</span> <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token keyword\\">try</span> <span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">BufferedReader</span> reader <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">BufferedReader</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">FileReader</span><span class=\\"token punctuation\\">(</span><span class=\\"token constant\\">CSV_FILE</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n            <span class=\\"token class-name\\">String</span> csvHeadersLine <span class=\\"token operator\\">=</span> reader<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">readLine</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n            <span class=\\"token class-name\\">List</span>\\\\<span class=\\"token operator\\">&lt;</span><span class=\\"token class-name\\">String</span>\\\\<span class=\\"token operator\\">&gt;</span> headers <span class=\\"token operator\\">=</span> <span class=\\"token class-name\\">Arrays</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">asList</span><span class=\\"token punctuation\\">(</span>csvHeadersLine<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">split</span><span class=\\"token punctuation\\">(</span><span class=\\"token constant\\">COMMA_DELIMITER</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n            <span class=\\"token function\\">assertThat</span><span class=\\"token punctuation\\">(</span>headers<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">containsExactlyElementsOf</span><span class=\\"token punctuation\\">(</span><span class=\\"token constant\\">EXPECTED_HEADERS</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token punctuation\\">}</span>\\n    <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{k as comp,d as data};
