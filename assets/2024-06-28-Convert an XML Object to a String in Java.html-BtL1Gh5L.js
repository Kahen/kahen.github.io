import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-CtR6X2Br.js";const e={},p=t(`<h1 id="在java中将xml对象转换为字符串" tabindex="-1"><a class="header-anchor" href="#在java中将xml对象转换为字符串"><span>在Java中将XML对象转换为字符串</span></a></h1><p>XML（可扩展标记语言）是用于信息结构化的一种非常流行的模式。此外，在Java中解析和操作XML文档通常使用DOM（文档对象模型）和SAX（简单API for XML）等技术。</p><p>在某些情况下，可能需要将XML文档对象转换为其字符串形式，这可以用于将XML信息存储在数据库中或通过网络传输。</p><p><strong>在本教程中，我们将讨论在Java中将XML文档对象转换为字符串的几种方法。</strong></p><p>假设我们有以下文档对象：</p><p><code>Document document = // ...</code></p><p>此文档对象在内存中表示XML内容：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`<span class="token prolog">&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot; standalone=&quot;no&quot;?&gt;</span>\`
\`\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>root</span><span class="token punctuation">&gt;</span></span>\`\`\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>child1</span><span class="token punctuation">&gt;</span></span>\`This is child element 1\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>child1</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>child2</span><span class="token punctuation">&gt;</span></span>\`This is child element 2\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>child2</span><span class="token punctuation">&gt;</span></span>\`
\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>root</span><span class="token punctuation">&gt;</span></span>\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，我们需要将此XML文档对象转换为Java字符串。</p><h3 id="使用xml转换api" tabindex="-1"><a class="header-anchor" href="#使用xml转换api"><span>使用XML转换API</span></a></h3><p>Java中的<code>javax.xml.transform</code>包包括执行XML转换的类和接口。它的能力之一是将XML文档对象转换为字符串表示。以下代码演示了如何使用<code>javax.xml.transform</code>包将此XML文档对象解析为Java字符串：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenXMLDocument_whenUsingTransformer_thenConvertXMLToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">TransformerException</span> <span class="token punctuation">{</span>
    <span class="token class-name">TransformerFactory</span> transformerFactory <span class="token operator">=</span> <span class="token class-name">TransformerFactory</span><span class="token punctuation">.</span><span class="token function">newInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Transformer</span> transformer <span class="token operator">=</span> transformerFactory<span class="token punctuation">.</span><span class="token function">newTransformer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">StringWriter</span> stringWriter <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringWriter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    transformer<span class="token punctuation">.</span><span class="token function">transform</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">DOMSource</span><span class="token punctuation">(</span>document<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">StreamResult</span><span class="token punctuation">(</span>stringWriter<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> result <span class="token operator">=</span> stringWriter<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertTrue</span><span class="token punctuation">(</span>result<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">&quot;\`\`\`&lt;root&gt;\`\`\`&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertTrue</span><span class="token punctuation">(</span>result<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">&quot;This is child element 1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertTrue</span><span class="token punctuation">(</span>result<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">&quot;This is child element 2&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们首先实例化一个<code>TransformerFactory</code>和一个<code>Transformer</code>，用于XML转换。然后，我们构建一个<code>StringWriter</code>来以文本形式存储转换后的XML。然后，<code>transform()</code>方法改变XML文档，我们可以使用<code>stringWrite.toString()</code>方法将其保存到<code>result</code>字符串中。</p><h3 id="使用java-xmlbeans" tabindex="-1"><a class="header-anchor" href="#使用java-xmlbeans"><span>使用Java XMLBeans</span></a></h3><p>使用Java XML操作世界中的XMLBeans方法，将XML文档和字符串之间的转换既简单又灵活。我们使用**<em>XmlObject.Factory.parse(document)</em>**，将XML文档解析为<code>XmlObject</code>以进行后续操作活动：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenXMLDocument_whenUsingXmlBeans_thenConvertXMLToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token class-name">XmlObject</span> xmlObject <span class="token operator">=</span> <span class="token class-name">XmlObject<span class="token punctuation">.</span>Factory</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>document<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">XmlOptions</span> options <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">XmlOptions</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        options<span class="token punctuation">.</span><span class="token function">setSavePrettyPrint</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        options<span class="token punctuation">.</span><span class="token function">setUseDefaultNamespace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        options<span class="token punctuation">.</span><span class="token function">setSaveAggressiveNamespaces</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">String</span> xmlString <span class="token operator">=</span> xmlObject<span class="token punctuation">.</span><span class="token function">xmlText</span><span class="token punctuation">(</span>options<span class="token punctuation">)</span><span class="token punctuation">;</span>

        xmlString <span class="token operator">=</span> <span class="token string">&quot;\`&lt;?xml version=\\&quot;1.0\\&quot; encoding=\\&quot;UTF-8\\&quot; standalone=\\&quot;no\\&quot;?&gt;\`&quot;</span> <span class="token operator">+</span> xmlString<span class="token punctuation">;</span>

        <span class="token function">assertTrue</span><span class="token punctuation">(</span>xmlString<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">&quot;\`\`\`&lt;root&gt;\`\`\`&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">assertTrue</span><span class="token punctuation">(</span>xmlString<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">&quot;This is child element 1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">assertTrue</span><span class="token punctuation">(</span>xmlString<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">&quot;This is child element 2&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">XmlException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上述测试方法中，我们使用<code>XmlOptions</code>解析文档为<code>XmlObject</code>，以自定义输出格式化，例如美化打印、命名空间等。此外，进行<code>asserts</code>以确定结果XML字符串包含XML声明和特定的XML元素和元素内容。</p><h3 id="结论" tabindex="-1"><a class="header-anchor" href="#结论"><span>结论</span></a></h3><p>在本教程中，我们讨论了如何在Java中将XML文档对象转换为字符串。</p><p>如常，本文的完整代码示例可以在GitHub上找到。</p>`,20),o=[p];function c(i,l){return s(),a("div",null,o)}const d=n(e,[["render",c],["__file","2024-06-28-Convert an XML Object to a String in Java.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-06-28/2024-06-28-Convert%20an%20XML%20Object%20to%20a%20String%20in%20Java.html","title":"在Java中将XML对象转换为字符串","lang":"zh-CN","frontmatter":{"date":"2024-06-28T00:00:00.000Z","category":["XML","Java"],"tag":["XML转换","文档对象模型","简单API"],"head":[["meta",{"name":"keywords","content":"Java, XML, DOM, SAX, 转换"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-28/2024-06-28-Convert%20an%20XML%20Object%20to%20a%20String%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Java中将XML对象转换为字符串"}],["meta",{"property":"og:description","content":"在Java中将XML对象转换为字符串 XML（可扩展标记语言）是用于信息结构化的一种非常流行的模式。此外，在Java中解析和操作XML文档通常使用DOM（文档对象模型）和SAX（简单API for XML）等技术。 在某些情况下，可能需要将XML文档对象转换为其字符串形式，这可以用于将XML信息存储在数据库中或通过网络传输。 在本教程中，我们将讨论在J..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-28T09:30:02.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"XML转换"}],["meta",{"property":"article:tag","content":"文档对象模型"}],["meta",{"property":"article:tag","content":"简单API"}],["meta",{"property":"article:published_time","content":"2024-06-28T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-28T09:30:02.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Java中将XML对象转换为字符串\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-28T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-28T09:30:02.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Java中将XML对象转换为字符串 XML（可扩展标记语言）是用于信息结构化的一种非常流行的模式。此外，在Java中解析和操作XML文档通常使用DOM（文档对象模型）和SAX（简单API for XML）等技术。 在某些情况下，可能需要将XML文档对象转换为其字符串形式，这可以用于将XML信息存储在数据库中或通过网络传输。 在本教程中，我们将讨论在J..."},"headers":[{"level":3,"title":"使用XML转换API","slug":"使用xml转换api","link":"#使用xml转换api","children":[]},{"level":3,"title":"使用Java XMLBeans","slug":"使用java-xmlbeans","link":"#使用java-xmlbeans","children":[]},{"level":3,"title":"结论","slug":"结论","link":"#结论","children":[]}],"git":{"createdTime":1719567002000,"updatedTime":1719567002000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.23,"words":670},"filePathRelative":"posts/baeldung/2024-06-28/2024-06-28-Convert an XML Object to a String in Java.md","localizedDate":"2024年6月28日","excerpt":"\\n<p>XML（可扩展标记语言）是用于信息结构化的一种非常流行的模式。此外，在Java中解析和操作XML文档通常使用DOM（文档对象模型）和SAX（简单API for XML）等技术。</p>\\n<p>在某些情况下，可能需要将XML文档对象转换为其字符串形式，这可以用于将XML信息存储在数据库中或通过网络传输。</p>\\n<p><strong>在本教程中，我们将讨论在Java中将XML文档对象转换为字符串的几种方法。</strong></p>\\n<p>假设我们有以下文档对象：</p>\\n<p><code>Document document = // ...</code></p>\\n<p>此文档对象在内存中表示XML内容：</p>","autoDesc":true}');export{d as comp,k as data};
