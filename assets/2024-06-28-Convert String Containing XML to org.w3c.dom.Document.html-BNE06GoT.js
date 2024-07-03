import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-D1jsmMBg.js";const e={},o=t(`<h1 id="将包含-xml-的字符串转换为-org-w3c-dom-document" tabindex="-1"><a class="header-anchor" href="#将包含-xml-的字符串转换为-org-w3c-dom-document"><span>将包含 XML 的字符串转换为 org.w3c.dom.Document</span></a></h1><p>XML（可扩展标记语言）是当今最常见的数据格式之一，广泛应用于应用程序之间的数据结构化和交换。此外，在Java中，将XML标记文本的某些部分转换为_org.w3c.dom.Document_对象是常见的用例。</p><p>在本教程中，我们将讨论如何在Java中将包含XML内容的字符串转换为_Org.w3c.dom.Document_。</p><p>_org.w3c.dom.Document_是Java中文档对象模型（DOM）XML API的一个核心组件。这个重要的类代表整个XML文档，并提供了一套全面的方法来浏览、修改和检索XML文档中的数据。在Java中使用XML时，_org.w3c.dom.Document_对象成为一个不可或缺的工具。</p><p>为了更好地理解如何创建_org.w3c.dom.Document_对象，让我们看以下示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">try</span> <span class="token punctuation">{</span>
    <span class="token comment">// 创建DocumentBuilderFactory</span>
    <span class="token class-name">DocumentBuilderFactory</span> factory <span class="token operator">=</span> <span class="token class-name">DocumentBuilderFactory</span><span class="token punctuation">.</span><span class="token function">newInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 创建DocumentBuilder</span>
    <span class="token class-name">DocumentBuilder</span> builder <span class="token operator">=</span> factory<span class="token punctuation">.</span><span class="token function">newDocumentBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 创建一个新的Document</span>
    <span class="token class-name">Document</span> document <span class="token operator">=</span> builder<span class="token punctuation">.</span><span class="token function">newDocument</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 创建示例XML结构</span>
    <span class="token class-name">Element</span> rootElement <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&quot;root&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    document<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>rootElement<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">Element</span> element <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&quot;element&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    element<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>document<span class="token punctuation">.</span><span class="token function">createTextNode</span><span class="token punctuation">(</span><span class="token string">&quot;XML Document Example&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    rootElement<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>element<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">ParserConfigurationException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在前面的代码中，我们首先创建了解析XML所需的元素，例如_DocumentBuilderFactory_和_DocumentBuilder_。之后，它构建了一个基本的XML架构，其中包含一个标记为_“root”<em>的初始节点元素，该元素包含另一个称为</em>“element”<em>的子节点元素，该元素具有字符串</em>“XML文档示例”_。此外，XML输出应如下所示：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>\`\`&lt;root&gt;\`\`
    \`\`&lt;element&gt;\`\`XML Document Example\`\`&lt;/element&gt;\`\`
\`\`&lt;/root&gt;\`\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-从字符串解析xml" tabindex="-1"><a class="header-anchor" href="#_3-从字符串解析xml"><span>3. 从字符串解析XML</span></a></h2><p>需要解析XML字符串，以便将包含XML的字符串转换为_org.w3c.dom.Document_。幸运的是，Java中有几种XML解析库，包括DOM、SAX和StAX。</p><p>本文通过专注于DOM解析器来简化解释。让我们逐步了解如何解析包含XML的字符串并创建_org.w3c.dom.Document_对象：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenValidXMLString_whenParsing_thenDocumentIsCorrect</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">throws</span> <span class="token class-name">ParserConfigurationException</span> <span class="token punctuation">{</span>
    <span class="token class-name">DocumentBuilderFactory</span> factory <span class="token operator">=</span> <span class="token class-name">DocumentBuilderFactory</span><span class="token punctuation">.</span><span class="token function">newInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">DocumentBuilder</span> builder <span class="token operator">=</span> factory<span class="token punctuation">.</span><span class="token function">newDocumentBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> xmlString <span class="token operator">=</span> <span class="token string">&quot;\`\`&lt;root&gt;\`\`\`\`&lt;element&gt;\`\`XML Parsing Example\`\`&lt;/element&gt;\`\`\`\`&lt;/root&gt;\`\`&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">InputSource</span> is <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">InputSource</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">StringReader</span><span class="token punctuation">(</span>xmlString<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Document</span> xmlDoc <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        xmlDoc <span class="token operator">=</span> builder<span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>is<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">SAXException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IOException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;root&quot;</span><span class="token punctuation">,</span> xmlDoc<span class="token punctuation">.</span><span class="token function">getDocumentElement</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getNodeName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;element&quot;</span><span class="token punctuation">,</span> xmlDoc<span class="token punctuation">.</span><span class="token function">getDocumentElement</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getElementsByTagName</span><span class="token punctuation">(</span><span class="token string">&quot;element&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">item</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getNodeName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;XML Parsing Example&quot;</span><span class="token punctuation">,</span>
      xmlDoc<span class="token punctuation">.</span><span class="token function">getDocumentElement</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getElementsByTagName</span><span class="token punctuation">(</span><span class="token string">&quot;element&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">item</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getTextContent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上述代码中，我们创建了_DocumentBuilderFactory_和_DocumentBuilder_，它们对XML解析至关重要。<strong>此外，我们定义了一个示例XML字符串（<em>xmlString</em>），它被转换为用于解析的_InputSource_。我们在_try-catch_块中解析XML，并捕获任何可能的异常，如_SAXException_或_IOException_。</strong></p><p>最后，我们使用一系列断言来验证解析的XML文档的正确性，包括使用_getDocumentElement().getNodeName()_检查根元素的名称，使用_getDocumentElement().getElementsByTagName()_检查子元素的名称，以及检查子元素内的文本内容。</p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>总之，对于任何处理众多应用程序中基于XML的数据的熟练Java开发人员，从数据处理到Web服务或配置任务，了解如何操作_org.w3c.dom.Document_（NS）至关重要。</p><p>如常，本文的完整代码示例可以在GitHub上找到。翻译已经完成，以下是剩余部分：</p><hr><h2 id="_4-结论-1" tabindex="-1"><a class="header-anchor" href="#_4-结论-1"><span>4. 结论</span></a></h2><p>总之，对于任何熟练的Java开发者来说，处理众多应用程序中的基于XML的数据，无论是数据处理、Web服务还是配置任务，了解如何操作org.w3c.dom.Document（NS）都是至关重要的。</p><p>如常，本文的完整代码示例可以在GitHub上找到。</p><p><img src="https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg" alt="img" loading="lazy"><img src="https://secure.gravatar.com/avatar/dc417739e22ae675b0e1f7012bbddaa5?s=50&amp;r=g" alt="img" loading="lazy"><img src="https://secure.gravatar.com/avatar/db9b6e888453bec33b0a1b1522bae628?s=50&amp;r=g" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png" alt="img" loading="lazy"></p><p>OK</p>`,23),p=[o];function c(l,u){return s(),a("div",null,p)}const m=n(e,[["render",c],["__file","2024-06-28-Convert String Containing XML to org.w3c.dom.Document.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-06-28/2024-06-28-Convert%20String%20Containing%20XML%20to%20org.w3c.dom.Document.html","title":"将包含 XML 的字符串转换为 org.w3c.dom.Document","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","XML"],"tag":["DOM","XML Parsing"],"head":[["meta",{"name":"keywords","content":"Java, XML, DOM, Document Object Model, XML Parsing"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-28/2024-06-28-Convert%20String%20Containing%20XML%20to%20org.w3c.dom.Document.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"将包含 XML 的字符串转换为 org.w3c.dom.Document"}],["meta",{"property":"og:description","content":"将包含 XML 的字符串转换为 org.w3c.dom.Document XML（可扩展标记语言）是当今最常见的数据格式之一，广泛应用于应用程序之间的数据结构化和交换。此外，在Java中，将XML标记文本的某些部分转换为_org.w3c.dom.Document_对象是常见的用例。 在本教程中，我们将讨论如何在Java中将包含XML内容的字符串转换为_..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-28T08:52:21.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"DOM"}],["meta",{"property":"article:tag","content":"XML Parsing"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-28T08:52:21.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"将包含 XML 的字符串转换为 org.w3c.dom.Document\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg\\",\\"https://secure.gravatar.com/avatar/dc417739e22ae675b0e1f7012bbddaa5?s=50&r=g\\",\\"https://secure.gravatar.com/avatar/db9b6e888453bec33b0a1b1522bae628?s=50&r=g\\",\\"https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png\\",\\"https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg\\",\\"https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-28T08:52:21.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"将包含 XML 的字符串转换为 org.w3c.dom.Document XML（可扩展标记语言）是当今最常见的数据格式之一，广泛应用于应用程序之间的数据结构化和交换。此外，在Java中，将XML标记文本的某些部分转换为_org.w3c.dom.Document_对象是常见的用例。 在本教程中，我们将讨论如何在Java中将包含XML内容的字符串转换为_..."},"headers":[{"level":2,"title":"3. 从字符串解析XML","slug":"_3-从字符串解析xml","link":"#_3-从字符串解析xml","children":[]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]},{"level":2,"title":"4. 结论","slug":"_4-结论-1","link":"#_4-结论-1","children":[]}],"git":{"createdTime":1719564741000,"updatedTime":1719564741000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.06,"words":918},"filePathRelative":"posts/baeldung/2024-06-28/2024-06-28-Convert String Containing XML to org.w3c.dom.Document.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>XML（可扩展标记语言）是当今最常见的数据格式之一，广泛应用于应用程序之间的数据结构化和交换。此外，在Java中，将XML标记文本的某些部分转换为_org.w3c.dom.Document_对象是常见的用例。</p>\\n<p>在本教程中，我们将讨论如何在Java中将包含XML内容的字符串转换为_Org.w3c.dom.Document_。</p>\\n<p>_org.w3c.dom.Document_是Java中文档对象模型（DOM）XML API的一个核心组件。这个重要的类代表整个XML文档，并提供了一套全面的方法来浏览、修改和检索XML文档中的数据。在Java中使用XML时，_org.w3c.dom.Document_对象成为一个不可或缺的工具。</p>","autoDesc":true}');export{m as comp,d as data};
