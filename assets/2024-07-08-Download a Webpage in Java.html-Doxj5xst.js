import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-c243dxVF.js";const p={},e=t(`<h1 id="java中下载网页的方法" tabindex="-1"><a class="header-anchor" href="#java中下载网页的方法"><span>Java中下载网页的方法</span></a></h1><p>在某些应用中，我们可能需要从互联网下载网页并将其内容提取为字符串。一个流行的用例是网页抓取或内容解析。</p><p>在本教程中，我们将使用Jsoup和_HttpURLConnection_来下载一个示例网页。</p><h2 id="使用-httpurlconnection-下载网页" tabindex="-1"><a class="header-anchor" href="#使用-httpurlconnection-下载网页"><span>使用_HttpURLConnection_下载网页</span></a></h2><p>_HttpURLConnection_是_URLConnection_的一个子类。**它有助于连接到使用HTTP协议的统一资源定位符（URL）。**该类包含不同的方法来操作HTTP请求。</p><p>让我们使用_HttpURLConnection_下载一个示例网页：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenURLConnection_whenRetrieveWebpage_thenWebpageIsNotNullAndContainsHtmlTag</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token class-name">URL</span> url <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">URL</span><span class="token punctuation">(</span><span class="token string">&quot;https://example.com&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">HttpURLConnection</span> connection <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">HttpURLConnection</span><span class="token punctuation">)</span> url<span class="token punctuation">.</span><span class="token function">openConnection</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    connection<span class="token punctuation">.</span><span class="token function">setRequestMethod</span><span class="token punctuation">(</span><span class="token string">&quot;GET&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">BufferedReader</span> reader <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BufferedReader</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">InputStreamReader</span><span class="token punctuation">(</span>connection<span class="token punctuation">.</span><span class="token function">getInputStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">StringBuilder</span> responseBuilder <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> line<span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>line <span class="token operator">=</span> reader<span class="token punctuation">.</span><span class="token function">readLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            responseBuilder<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span>line<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token function">assertNotNull</span><span class="token punctuation">(</span>responseBuilder<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">assertTrue</span><span class="token punctuation">(</span>responseBuilder<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
              <span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">&quot;\`\`&lt;html&gt;\`\`&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们创建了一个表示网页地址的_URL_对象。接下来，我们创建了一个_HttpURLConnection_的实例，并在_URL_对象上调用_openConnection()_方法。这会打开到网页的连接。此外，我们设置请求方法为GET以检索网页的内容。</p><p>然后，我们创建一个新的_BufferedReader_和_InputStreamReader_实例来帮助从网页读取数据。_InputStreamReader_类有助于将原始字节转换为可以由_BufferedReader_读取的字符。</p><p>最后，我们通过从_BufferedReader_读取并连接行来将网页转换为_String_。我们使用_StringBuilder_对象有效地连接行。</p><h2 id="使用jsoup下载网页" tabindex="-1"><a class="header-anchor" href="#使用jsoup下载网页"><span>使用Jsoup下载网页</span></a></h2><p>Jsoup是一个流行的开源Java库，用于处理HTML。它有助于获取URL并提取它们的数据。<strong>它的一个重要优势是使用HTML DOM方法和CSS选择器从URL抓取HTML。</strong></p><p>要开始使用Jsoup，我们需要将其依赖项添加到我们的依赖管理器中。让我们将Jsoup依赖项添加到_pom.xml_：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`org.jsoup\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`jsoup\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\`1.17.2\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\`
\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以下是使用Jsoup下载网页的示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenJsoup_whenRetrievingWebpage_thenWebpageDocumentIsNotNullAndContainsHtmlTag</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token class-name">Document</span> document <span class="token operator">=</span> <span class="token class-name">Jsoup</span><span class="token punctuation">.</span><span class="token function">connect</span><span class="token punctuation">(</span><span class="token string">&quot;https://www.example.com&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> webpage <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">html</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertNotNull</span><span class="token punctuation">(</span>webpage<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertTrue</span><span class="token punctuation">(</span>webpage<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">&quot;\`\`&lt;html&gt;\`\`&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，我们创建了一个_Document_的实例，并使用_Jsoup.connect()_建立到示例网站的连接。Jsoup.connect()_有助于建立到URL的连接并将其内容作为_Document_对象检索。</p><p>接下来，我们调用_get()_方法，它向指定的URL发送GET请求。它以_Document_的形式返回响应。</p><p>最后，我们通过在_Document_对象上调用_html()_方法，将提取的内容存储到_string_类型的变量_webpage_中。</p><h2 id="结论" tabindex="-1"><a class="header-anchor" href="#结论"><span>结论</span></a></h2><p>在本文中，我们学习了在Java中下载网页的两种方法。我们使用了_HttpURLConnection_类和Jsoup来下载网页的内容。两种方法都可以使用，但Jsoup看起来更容易使用。</p><p>如常，示例的完整源代码可以在GitHub上找到。</p>`,22),o=[e];function c(l,u){return s(),a("div",null,o)}const r=n(p,[["render",c],["__file","2024-07-08-Download a Webpage in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-08/2024-07-08-Download%20a%20Webpage%20in%20Java.html","title":"Java中下载网页的方法","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Web Scraping"],"tag":["Jsoup","HttpURLConnection"],"head":[["meta",{"name":"keywords","content":"Java, Web Scraping, Jsoup, HttpURLConnection"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-08/2024-07-08-Download%20a%20Webpage%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中下载网页的方法"}],["meta",{"property":"og:description","content":"Java中下载网页的方法 在某些应用中，我们可能需要从互联网下载网页并将其内容提取为字符串。一个流行的用例是网页抓取或内容解析。 在本教程中，我们将使用Jsoup和_HttpURLConnection_来下载一个示例网页。 使用_HttpURLConnection_下载网页 _HttpURLConnection_是_URLConnection_的一个子..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-08T23:00:12.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Jsoup"}],["meta",{"property":"article:tag","content":"HttpURLConnection"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-08T23:00:12.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中下载网页的方法\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-08T23:00:12.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中下载网页的方法 在某些应用中，我们可能需要从互联网下载网页并将其内容提取为字符串。一个流行的用例是网页抓取或内容解析。 在本教程中，我们将使用Jsoup和_HttpURLConnection_来下载一个示例网页。 使用_HttpURLConnection_下载网页 _HttpURLConnection_是_URLConnection_的一个子..."},"headers":[{"level":2,"title":"使用_HttpURLConnection_下载网页","slug":"使用-httpurlconnection-下载网页","link":"#使用-httpurlconnection-下载网页","children":[]},{"level":2,"title":"使用Jsoup下载网页","slug":"使用jsoup下载网页","link":"#使用jsoup下载网页","children":[]},{"level":2,"title":"结论","slug":"结论","link":"#结论","children":[]}],"git":{"createdTime":1720479612000,"updatedTime":1720479612000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.37,"words":712},"filePathRelative":"posts/baeldung/2024-07-08/2024-07-08-Download a Webpage in Java.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在某些应用中，我们可能需要从互联网下载网页并将其内容提取为字符串。一个流行的用例是网页抓取或内容解析。</p>\\n<p>在本教程中，我们将使用Jsoup和_HttpURLConnection_来下载一个示例网页。</p>\\n<h2>使用_HttpURLConnection_下载网页</h2>\\n<p>_HttpURLConnection_是_URLConnection_的一个子类。**它有助于连接到使用HTTP协议的统一资源定位符（URL）。**该类包含不同的方法来操作HTTP请求。</p>\\n<p>让我们使用_HttpURLConnection_下载一个示例网页：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token annotation punctuation\\">@Test</span>\\n<span class=\\"token keyword\\">void</span> <span class=\\"token function\\">givenURLConnection_whenRetrieveWebpage_thenWebpageIsNotNullAndContainsHtmlTag</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token keyword\\">throws</span> <span class=\\"token class-name\\">IOException</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token class-name\\">URL</span> url <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">URL</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"https://example.com\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token class-name\\">HttpURLConnection</span> connection <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">HttpURLConnection</span><span class=\\"token punctuation\\">)</span> url<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">openConnection</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    connection<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">setRequestMethod</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"GET\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\n    <span class=\\"token keyword\\">try</span> <span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">BufferedReader</span> reader <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">BufferedReader</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">InputStreamReader</span><span class=\\"token punctuation\\">(</span>connection<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">getInputStream</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token class-name\\">StringBuilder</span> responseBuilder <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">StringBuilder</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token class-name\\">String</span> line<span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token keyword\\">while</span> <span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">(</span>line <span class=\\"token operator\\">=</span> reader<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">readLine</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">!=</span> <span class=\\"token keyword\\">null</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n            responseBuilder<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">append</span><span class=\\"token punctuation\\">(</span>line<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token punctuation\\">}</span>\\n\\n        <span class=\\"token function\\">assertNotNull</span><span class=\\"token punctuation\\">(</span>responseBuilder<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token function\\">assertTrue</span><span class=\\"token punctuation\\">(</span>responseBuilder<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">toString</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span>\\n              <span class=\\"token punctuation\\">.</span><span class=\\"token function\\">contains</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"``&lt;html&gt;``\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{r as comp,d as data};
