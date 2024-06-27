import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-DnJ2tmUQ.js";const e={},p=t(`<h1 id="在java中获取uri的最后一个路径段" tabindex="-1"><a class="header-anchor" href="#在java中获取uri的最后一个路径段"><span>在Java中获取URI的最后一个路径段</span></a></h1><hr><p>在Web开发和文件管理中，处理统一资源标识符（URI）是一项常见的操作。</p><p>除此之外，最常见的需求之一是从URL中获取最后一个路径段（最后一个段是在最后一个‘/’字符之后的最后一个段）。</p><p><strong>在本教程中，我们将探讨获取URL最后一个段的不同方法。</strong></p><h3 id="_2-使用-uri-类" tabindex="-1"><a class="header-anchor" href="#_2-使用-uri-类"><span>2. 使用_URI_类</span></a></h3><p>java.net.URI类提供了一种面向对象的URI解析和操作方法。为了简化，让我们以一个示例为例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenURL_whenUsingURIClass_thenGetLastPathSegment</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">URISyntaxException</span> <span class="token punctuation">{</span>
    <span class="token class-name">URI</span> uri <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">URI</span><span class="token punctuation">(</span><span class="token string">&quot;https://www.example.com/path/to/resource&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> path <span class="token operator">=</span> uri<span class="token punctuation">.</span><span class="token function">getPath</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> segments <span class="token operator">=</span> path<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> lastSegment <span class="token operator">=</span> segments<span class="token punctuation">[</span>segments<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;resource&quot;</span><span class="token punctuation">,</span> lastSegment<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>给定的方法使用示例URL初始化一个_URI_。随后，使用_getPath()_方法提取URI的路径。然后，将路径基于正斜杠（“/”）分隔符分割成段。<strong>然后通过访问段数组的最后一个元素来确定最后一个路径段。</strong></p><p>最后，测试断言最后一个路径段与预期值匹配，确认功能正确地从URL中提取了预期的资源。</p><h3 id="_3-使用-path-类" tabindex="-1"><a class="header-anchor" href="#_3-使用-path-类"><span>3. 使用_Path_类</span></a></h3><p>在Java 7中，java.nio.file.Path类提供了文件和路径的平台独立表示。提供了一种有效的方法来提取URI的最后一个段。以下是一个示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenURL_whenUsingPathClass_thenGetLastPathSegment</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> exampleURI <span class="token operator">=</span> <span class="token string">&quot;https://www.example.com/path/to/resource&quot;</span><span class="token punctuation">;</span>

    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token class-name">URI</span> uri <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">URI</span><span class="token punctuation">(</span>exampleURI<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> pathString <span class="token operator">=</span> uri<span class="token punctuation">.</span><span class="token function">getPath</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Path</span> path <span class="token operator">=</span> <span class="token class-name">Paths</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>pathString<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Path</span> lastSegment <span class="token operator">=</span> path<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span>path<span class="token punctuation">.</span><span class="token function">getNameCount</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;resource&quot;</span><span class="token punctuation">,</span> lastSegment<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">fail</span><span class="token punctuation">(</span><span class="token string">&quot;Exception occurred: &quot;</span> <span class="token operator">+</span> e<span class="token punctuation">.</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>与前一节一样，我们首先初始化一个URI并使用_getPath()_方法。随后，我们从获取的_pathString_创建一个名为path的_Path_对象。**最后一个段是使用_index计算的_getName()_方法确定的。**然后将最后一个路径段转换为字符串进行比较。</p><h3 id="_4-使用-filenameutils-类" tabindex="-1"><a class="header-anchor" href="#_4-使用-filenameutils-类"><span>4. 使用_FilenameUtils_类</span></a></h3><p>Apache Commons IO库有一个_FilenameUtils_类，作为常用文件和路径任务的实用类。让我们以一个示例为例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenURL_whenUsingFilenameUtilsClass_thenGetLastPathSegment</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">URISyntaxException</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> exampleURI <span class="token operator">=</span> <span class="token string">&quot;https://www.example.com/path/to/resource&quot;</span><span class="token punctuation">;</span>

    <span class="token class-name">URI</span> uri <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">URI</span><span class="token punctuation">(</span>exampleURI<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> path <span class="token operator">=</span> uri<span class="token punctuation">.</span><span class="token function">getPath</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">String</span> lastSegment <span class="token operator">=</span> <span class="token class-name">FilenameUtils</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;resource&quot;</span><span class="token punctuation">,</span> lastSegment<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在使用_getPath()_方法提取_path_之后，我们使用_FilenameUtils_类使用_getName()_方法获取最后一个路径段，该方法以_path_作为参数。</p><h3 id="_5-使用正则表达式" tabindex="-1"><a class="header-anchor" href="#_5-使用正则表达式"><span>5. 使用正则表达式</span></a></h3><p>在从URL中提取最后一个路径段时，正则表达式提供了一种灵活且精确的模式定义的优雅解决方案。以下是一个示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenURL_whenUsingRegularExpression_thenGetLastPathSegment</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">URISyntaxException</span> <span class="token punctuation">{</span>
    <span class="token class-name">URI</span> uri <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">URI</span><span class="token punctuation">(</span><span class="token string">&quot;https://www.example.com/path/to/resource&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> path <span class="token operator">=</span> uri<span class="token punctuation">.</span><span class="token function">getPath</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">Pattern</span> pattern <span class="token operator">=</span> <span class="token class-name">Pattern</span><span class="token punctuation">.</span><span class="token function">compile</span><span class="token punctuation">(</span><span class="token string">&quot;.*/(.+)&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Matcher</span> matcher <span class="token operator">=</span> pattern<span class="token punctuation">.</span><span class="token function">matcher</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>matcher<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">fail</span><span class="token punctuation">(</span><span class="token string">&quot;Regex pattern didn&#39;t match.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token class-name">String</span> lastSegment <span class="token operator">=</span> matcher<span class="token punctuation">.</span><span class="token function">group</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;resource&quot;</span><span class="token punctuation">,</span> lastSegment<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们定义了一个正则表达式模式“<em>/(.+)</em>”来精确捕获URL路径的最后一个段。<strong>利用_Pattern_和_Matcher_类，我们使用_compile()_和_matcher()_方法编译并应用正则表达式模式到_path_字符串。</strong></p><p>此外，条件检查进一步验证了正则表达式模式应用的成功，使用_find()_方法。在成功匹配后，使用_Matcher_对象的_group(1)_方法提取最后一个路径段。</p><h3 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h3><p>总之，本教程探索了多种Java方法，包括_URI_类、_Path_类、_FilenameUtils_和正则表达式，提供了从URL中有效提取最后一个路径段的多种方法。</p><p>像往常一样，相应的源代码可以在GitHub上找到。</p>`,26),o=[p];function c(l,i){return s(),a("div",null,o)}const k=n(e,[["render",c],["__file","2024-06-21-Obtaining the Last Path Segment of a URI in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/Archive/2024-06-21-Obtaining%20the%20Last%20Path%20Segment%20of%20a%20URI%20in%20Java.html","title":"在Java中获取URI的最后一个路径段","lang":"zh-CN","frontmatter":{"date":"2024-06-21T00:00:00.000Z","category":["Java","URI"],"tag":["URI","Java","路径"],"head":[["meta",{"name":"keywords","content":"Java URI 最后路径段 获取方法"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/2024-06-21-Obtaining%20the%20Last%20Path%20Segment%20of%20a%20URI%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Java中获取URI的最后一个路径段"}],["meta",{"property":"og:description","content":"在Java中获取URI的最后一个路径段 在Web开发和文件管理中，处理统一资源标识符（URI）是一项常见的操作。 除此之外，最常见的需求之一是从URL中获取最后一个路径段（最后一个段是在最后一个‘/’字符之后的最后一个段）。 在本教程中，我们将探讨获取URL最后一个段的不同方法。 2. 使用_URI_类 java.net.URI类提供了一种面向对象的U..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"URI"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"路径"}],["meta",{"property":"article:published_time","content":"2024-06-21T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Java中获取URI的最后一个路径段\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-21T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Java中获取URI的最后一个路径段 在Web开发和文件管理中，处理统一资源标识符（URI）是一项常见的操作。 除此之外，最常见的需求之一是从URL中获取最后一个路径段（最后一个段是在最后一个‘/’字符之后的最后一个段）。 在本教程中，我们将探讨获取URL最后一个段的不同方法。 2. 使用_URI_类 java.net.URI类提供了一种面向对象的U..."},"headers":[{"level":3,"title":"2. 使用_URI_类","slug":"_2-使用-uri-类","link":"#_2-使用-uri-类","children":[]},{"level":3,"title":"3. 使用_Path_类","slug":"_3-使用-path-类","link":"#_3-使用-path-类","children":[]},{"level":3,"title":"4. 使用_FilenameUtils_类","slug":"_4-使用-filenameutils-类","link":"#_4-使用-filenameutils-类","children":[]},{"level":3,"title":"5. 使用正则表达式","slug":"_5-使用正则表达式","link":"#_5-使用正则表达式","children":[]},{"level":3,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":2.96,"words":887},"filePathRelative":"posts/baeldung/Archive/2024-06-21-Obtaining the Last Path Segment of a URI in Java.md","localizedDate":"2024年6月21日","excerpt":"\\n<hr>\\n<p>在Web开发和文件管理中，处理统一资源标识符（URI）是一项常见的操作。</p>\\n<p>除此之外，最常见的需求之一是从URL中获取最后一个路径段（最后一个段是在最后一个‘/’字符之后的最后一个段）。</p>\\n<p><strong>在本教程中，我们将探讨获取URL最后一个段的不同方法。</strong></p>\\n<h3>2. 使用_URI_类</h3>\\n<p>java.net.URI类提供了一种面向对象的URI解析和操作方法。为了简化，让我们以一个示例为例：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token annotation punctuation\\">@Test</span>\\n<span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">void</span> <span class=\\"token function\\">givenURL_whenUsingURIClass_thenGetLastPathSegment</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token keyword\\">throws</span> <span class=\\"token class-name\\">URISyntaxException</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token class-name\\">URI</span> uri <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">URI</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"https://www.example.com/path/to/resource\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token class-name\\">String</span> path <span class=\\"token operator\\">=</span> uri<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">getPath</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\n    <span class=\\"token class-name\\">String</span><span class=\\"token punctuation\\">[</span><span class=\\"token punctuation\\">]</span> segments <span class=\\"token operator\\">=</span> path<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">split</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"/\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token class-name\\">String</span> lastSegment <span class=\\"token operator\\">=</span> segments<span class=\\"token punctuation\\">[</span>segments<span class=\\"token punctuation\\">.</span>length <span class=\\"token operator\\">-</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">;</span>\\n\\n    <span class=\\"token function\\">assertEquals</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"resource\\"</span><span class=\\"token punctuation\\">,</span> lastSegment<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{k as comp,d as data};
