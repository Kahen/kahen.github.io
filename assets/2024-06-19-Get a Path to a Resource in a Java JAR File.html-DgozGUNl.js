import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as n,a as e}from"./app-CN8IhxOU.js";const t={},o=e(`<h1 id="在java-jar文件中获取资源路径" tabindex="-1"><a class="header-anchor" href="#在java-jar文件中获取资源路径"><span>在Java JAR文件中获取资源路径</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>Java中JAR文件内的资源通常使用相对于JAR文件根的路径来访问。此外，了解这路径的结构对于有效检索资源至关重要。</p><p><strong>在本教程中，我们将探讨获取Java JAR文件内资源路径的不同方法。</strong></p><h2 id="_2-使用-class-getresource-方法获取资源的url" tabindex="-1"><a class="header-anchor" href="#_2-使用-class-getresource-方法获取资源的url"><span>2. 使用 <em>Class.getResource()</em> 方法获取资源的URL</span></a></h2><p><em>Class.getResource()</em> 方法提供了一种直接获取JAR文件内资源的_URL_ 的方式。让我们看看如何使用这个方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenFile_whenClassUsed_thenGetResourcePath</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">URL</span> resourceUrl <span class="token operator">=</span> <span class="token class-name">GetPathToResourceUnitTest</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">.</span><span class="token function">getResource</span><span class="token punctuation">(</span><span class="token string">&quot;/myFile.txt&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertNotNull</span><span class="token punctuation">(</span>resourceUrl<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个测试中，我们在 <em>GetPathToResourceUnitTest.class</em> 上调用 <em>getResource()</em> 方法，传递资源文件的路径 “ <em>/myFile.txt</em>” 作为参数。然后，我们断言获得的 <em>resourceUrl</em> 不为空，这表明资源文件已成功定位。</p><h2 id="_3-使用-classloader-getresource-方法" tabindex="-1"><a class="header-anchor" href="#_3-使用-classloader-getresource-方法"><span>3. 使用 <em>ClassLoader.getResource()</em> 方法</span></a></h2><p>或者，我们可以使用 <em>ClassLoader.getResource()</em> 方法来访问JAR文件内的资源。当资源路径在编译时未知时，这个方法很有用：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenFile_whenClassLoaderUsed_thenGetResourcePath</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">URL</span> resourceUrl <span class="token operator">=</span> <span class="token class-name">GetPathToResourceUnitTest</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">.</span><span class="token function">getClassLoader</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getResource</span><span class="token punctuation">(</span><span class="token string">&quot;myFile.txt&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertNotNull</span><span class="token punctuation">(</span>resourceUrl<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个测试中，我们使用类加载器 <em>GetPathToResourceUnitTest.class.getClassLoader()</em> 来获取资源文件。与前一种方法不同，这种方法不依赖于类的包结构。相反，它在类路径的根级别搜索资源文件。</p><p><strong>这意味着它可以定位项目结构内任何位置的资源，使其在访问类包外的资源时更加灵活。</strong></p><h2 id="_4-使用-paths-get-方法" tabindex="-1"><a class="header-anchor" href="#_4-使用-paths-get-方法"><span>4. 使用 <em>Paths.get()</em> 方法</span></a></h2><p>从Java 7开始，我们可以使用 <em>Paths.get()</em> 方法来获取代表JAR文件内资源的 <em>Path</em> 对象。以下是如何操作的：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenFile_whenPathUsed_thenGetResourcePath</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
    <span class="token class-name">Path</span> resourcePath <span class="token operator">=</span> <span class="token class-name">Paths</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token class-name">Objects</span><span class="token punctuation">.</span><span class="token function">requireNonNull</span><span class="token punctuation">(</span><span class="token class-name">GetPathToResourceUnitTest</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">.</span><span class="token function">getResource</span><span class="token punctuation">(</span><span class="token string">&quot;/myFile.txt&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toURI</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertNotNull</span><span class="token punctuation">(</span>resourcePath<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里，我们首先调用 <em>getResource()</em> 方法检索资源文件的URL。然后，我们将这个URL转换为URI，并将其传递给 <em>Paths.get()</em> 以获得代表资源文件位置的 <em>Path</em> 对象。</p><p><strong>这种方法在我们需要以 <em>Path</em> 对象的形式工作资源文件时非常有用。它支持更高级的文件操作，例如读取或写入文件内容。此外，它提供了在Java NIO包的上下文中与资源交互的便捷方式。</strong></p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>总之，访问Java JAR文件内的资源对于许多应用程序至关重要。无论我们偏好 <em>Class.getResource()</em> 的简单性，还是 <em>ClassLoader.getResource()</em> 的灵活性，或是 <em>Paths.get()</em> 的现代方法，Java都提供了多种方法来高效地完成这项任务。</p><p>如常，相关的源代码可以在GitHub上找到。</p><p>文章发布后的30天内开放评论。对于超过此日期的任何问题，请使用网站上的联系表单。</p>`,22),p=[o];function c(l,i){return n(),s("div",null,p)}const d=a(t,[["render",c],["__file","2024-06-19-Get a Path to a Resource in a Java JAR File.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/Archive/2024-06-19-Get%20a%20Path%20to%20a%20Resource%20in%20a%20Java%20JAR%20File.html","title":"在Java JAR文件中获取资源路径","lang":"zh-CN","frontmatter":{"date":"2024-06-20T00:00:00.000Z","category":["Java","JAR文件"],"tag":["JAR","资源路径"],"head":[["meta",{"name":"keywords","content":"Java, JAR, 资源路径, 文件访问"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/2024-06-19-Get%20a%20Path%20to%20a%20Resource%20in%20a%20Java%20JAR%20File.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Java JAR文件中获取资源路径"}],["meta",{"property":"og:description","content":"在Java JAR文件中获取资源路径 1. 引言 Java中JAR文件内的资源通常使用相对于JAR文件根的路径来访问。此外，了解这路径的结构对于有效检索资源至关重要。 在本教程中，我们将探讨获取Java JAR文件内资源路径的不同方法。 2. 使用 Class.getResource() 方法获取资源的URL Class.getResource() 方..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"JAR"}],["meta",{"property":"article:tag","content":"资源路径"}],["meta",{"property":"article:published_time","content":"2024-06-20T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Java JAR文件中获取资源路径\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-20T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Java JAR文件中获取资源路径 1. 引言 Java中JAR文件内的资源通常使用相对于JAR文件根的路径来访问。此外，了解这路径的结构对于有效检索资源至关重要。 在本教程中，我们将探讨获取Java JAR文件内资源路径的不同方法。 2. 使用 Class.getResource() 方法获取资源的URL Class.getResource() 方..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 使用 Class.getResource() 方法获取资源的URL","slug":"_2-使用-class-getresource-方法获取资源的url","link":"#_2-使用-class-getresource-方法获取资源的url","children":[]},{"level":2,"title":"3. 使用 ClassLoader.getResource() 方法","slug":"_3-使用-classloader-getresource-方法","link":"#_3-使用-classloader-getresource-方法","children":[]},{"level":2,"title":"4. 使用 Paths.get() 方法","slug":"_4-使用-paths-get-方法","link":"#_4-使用-paths-get-方法","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":2.37,"words":710},"filePathRelative":"posts/baeldung/Archive/2024-06-19-Get a Path to a Resource in a Java JAR File.md","localizedDate":"2024年6月20日","excerpt":"\\n<h2>1. 引言</h2>\\n<p>Java中JAR文件内的资源通常使用相对于JAR文件根的路径来访问。此外，了解这路径的结构对于有效检索资源至关重要。</p>\\n<p><strong>在本教程中，我们将探讨获取Java JAR文件内资源路径的不同方法。</strong></p>\\n<h2>2. 使用 <em>Class.getResource()</em> 方法获取资源的URL</h2>\\n<p><em>Class.getResource()</em> 方法提供了一种直接获取JAR文件内资源的_URL_ 的方式。让我们看看如何使用这个方法：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token annotation punctuation\\">@Test</span>\\n<span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">void</span> <span class=\\"token function\\">givenFile_whenClassUsed_thenGetResourcePath</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token class-name\\">URL</span> resourceUrl <span class=\\"token operator\\">=</span> <span class=\\"token class-name\\">GetPathToResourceUnitTest</span><span class=\\"token punctuation\\">.</span><span class=\\"token keyword\\">class</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">getResource</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"/myFile.txt\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token function\\">assertNotNull</span><span class=\\"token punctuation\\">(</span>resourceUrl<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{d as comp,k as data};
