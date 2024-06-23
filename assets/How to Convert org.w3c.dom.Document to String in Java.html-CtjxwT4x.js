import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-DG86bxuB.js";const e={},o=t(`<h1 id="在java中将org-w3c-dom-document转换为string的方法-baeldung-概述" tabindex="-1"><a class="header-anchor" href="#在java中将org-w3c-dom-document转换为string的方法-baeldung-概述"><span>在Java中将org.w3c.dom.Document转换为String的方法 | Baeldung## 概述</span></a></h1><p>在Java中处理XML时，我们经常需要将一个_org.w3c.dom.Document_实例转换为_String_。<strong>通常我们可能出于多种原因需要这样做，例如序列化、记录日志以及处理HTTP请求或响应。</strong></p><p>在这个快速教程中，我们将看到如何将一个_Document_转换为_String_。要了解更多关于Java中使用XML的信息，请查看我们关于XML的全面系列。</p><h2 id="创建一个简单的文档" tabindex="-1"><a class="header-anchor" href="#创建一个简单的文档"><span>创建一个简单的文档</span></a></h2><p>本教程的示例将集中在一个描述一些水果的简单XML文档上：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>\\&lt;fruit\\&gt;
    \\&lt;name\\&gt;Apple\\&lt;/name\\&gt;
    \\&lt;color\\&gt;Red\\&lt;/color\\&gt;
    \\&lt;weight unit=&quot;grams&quot;\\&gt;150\\&lt;/weight\\&gt;
    \\&lt;sweetness\\&gt;7\\&lt;/sweetness\\&gt;
\\&lt;/fruit\\&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们继续从该字符串创建一个XML _Document_对象：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">FRUIT_XML</span> <span class="token operator">=</span> <span class="token string">&quot;\\&lt;fruit\\&gt;\\&lt;name\\&gt;Apple\\&lt;/name\\&gt;\\&lt;color\\&gt;Red\\&lt;/color\\&gt;\\&lt;weight unit=\\&quot;grams\\&quot;\\&gt;150\\&lt;/weight\\&gt;\\&lt;sweetness\\&gt;7\\&lt;/sweetness\\&gt;\\&lt;/fruit\\&gt;&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Document</span> <span class="token function">getDocument</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">SAXException</span><span class="token punctuation">,</span> <span class="token class-name">IOException</span><span class="token punctuation">,</span> <span class="token class-name">ParserConfigurationException</span> <span class="token punctuation">{</span>
    <span class="token class-name">DocumentBuilderFactory</span> factory <span class="token operator">=</span> <span class="token class-name">DocumentBuilderFactory</span><span class="token punctuation">.</span><span class="token function">newInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Document</span> document <span class="token operator">=</span> factory<span class="token punctuation">.</span><span class="token function">newDocumentBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">InputSource</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">StringReader</span><span class="token punctuation">(</span><span class="token constant">FRUIT_XML</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> document<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如我们所见，我们创建了一个用于构建新_Document_的工厂，然后我们调用了使用给定输入源内容的_parse_方法。在这种情况下，我们的输入源是一个包含我们水果XML字符串有效载荷的_StringReader_对象。</p><h2 id="使用xml转换api进行转换" tabindex="-1"><a class="header-anchor" href="#使用xml转换api进行转换"><span>使用XML转换API进行转换</span></a></h2><p><strong>_javax.xml.transform_包包含一组通用API，用于执行从源到结果的转换</strong>。在我们的情况下，源是XML文档，结果是输出字符串：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">toString</span><span class="token punctuation">(</span><span class="token class-name">Document</span> document<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">TransformerException</span> <span class="token punctuation">{</span>
    <span class="token class-name">TransformerFactory</span> transformerFactory <span class="token operator">=</span> <span class="token class-name">TransformerFactory</span><span class="token punctuation">.</span><span class="token function">newInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Transformer</span> transformer <span class="token operator">=</span> transformerFactory<span class="token punctuation">.</span><span class="token function">newTransformer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">StringWriter</span> stringWriter <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringWriter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    transformer<span class="token punctuation">.</span><span class="token function">transform</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">DOMSource</span><span class="token punctuation">(</span>document<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">StreamResult</span><span class="token punctuation">(</span>stringWriter<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> stringWriter<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们浏览一下我们的_toString_方法的关键部分：</p><p>首先，我们开始创建我们的_TransformerFactory_。我们将使用这个工厂来创建转换器，在本例中，转换器将简单地使用平台的默认设置。</p><p>现在，我们可以指定转换的源和结果。在这里，我们将使用我们的_Document_来构建一个DOM源和一个_StringWriter_来保存结果。</p><p><strong>最后，我们调用我们的_StringWriter_对象上的_toString_，它将字符流的当前值作为字符串返回。</strong></p><h2 id="单元测试" tabindex="-1"><a class="header-anchor" href="#单元测试"><span>单元测试</span></a></h2><p>现在我们有了一个将XML文档转换为字符串的简单方法，让我们继续测试它是否正常工作：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenXMLDocument_thenConvertToStringSuccessfully</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
    <span class="token class-name">Document</span> document <span class="token operator">=</span> <span class="token class-name">XmlDocumentToString</span><span class="token punctuation">.</span><span class="token function">getDocument</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">String</span> expectedDeclartion <span class="token operator">=</span> <span class="token string">&quot;\\&lt;?xml version=\\&quot;1.0\\&quot; encoding=\\&quot;UTF-8\\&quot; standalone=\\&quot;no\\&quot;?\\&gt;&quot;</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span>expectedDeclartion <span class="token operator">+</span> <span class="token class-name">XmlDocumentToString</span><span class="token punctuation">.</span><span class="token constant">FRUIT_XML</span><span class="token punctuation">,</span> <span class="token class-name">XmlDocumentToString</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span>document<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>**请注意，我们的转换默认会在字符串的开头添加标准的XML声明。在我们的测试中，我们简单地检查转换后的字符串是否与原始的水果XML匹配，**包括标准声明。</p><h2 id="自定义输出" tabindex="-1"><a class="header-anchor" href="#自定义输出"><span>自定义输出</span></a></h2><p>现在，让我们看看我们的输出。默认情况下，我们的转换器不会应用任何形式的输出格式化：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>\\&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot; standalone=&quot;no&quot;?\\&gt;\\&lt;fruit\\&gt;\\&lt;name\\&gt;Apple\\&lt;/name\\&gt;\\&lt;color\\&gt;Red\\&lt;/color\\&gt;\\&lt;weight unit=&quot;grams&quot;\\&gt;150\\&lt;/weight\\&gt;\\&lt;sweetness\\&gt;7\\&lt;/sweetness\\&gt;\\&lt;/fruit\\&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>显然，对于大型文档，使用这种单行格式化，我们的XML文档很快就会变得难以阅读。幸运的是，_Transformer_接口提供了多种输出属性来帮助我们。</p><p>让我们使用这些输出属性稍微重构一下我们的转换代码：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">toStringWithOptions</span><span class="token punctuation">(</span><span class="token class-name">Document</span> document<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">TransformerException</span> <span class="token punctuation">{</span>
    <span class="token class-name">Transformer</span> transformer <span class="token operator">=</span> <span class="token function">getTransformer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    transformer<span class="token punctuation">.</span><span class="token function">setOutputProperty</span><span class="token punctuation">(</span><span class="token class-name">OutputKeys</span><span class="token punctuation">.</span><span class="token constant">OMIT_XML_DECLARATION</span><span class="token punctuation">,</span> <span class="token string">&quot;yes&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    transformer<span class="token punctuation">.</span><span class="token function">setOutputProperty</span><span class="token punctuation">(</span><span class="token class-name">OutputKeys</span><span class="token punctuation">.</span><span class="token constant">INDENT</span><span class="token punctuation">,</span> <span class="token string">&quot;yes&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    transformer<span class="token punctuation">.</span><span class="token function">setOutputProperty</span><span class="token punctuation">(</span><span class="token string">&quot;{http://xml.apache.org/xslt}indent-amount&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;4&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">StringWriter</span> stringWriter <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringWriter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    transformer<span class="token punctuation">.</span><span class="token function">transform</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">DOMSource</span><span class="token punctuation">(</span>document<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">StreamResult</span><span class="token punctuation">(</span>stringWriter<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> stringWriter<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">Transformer</span> <span class="token function">getTransformer</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">TransformerConfigurationException</span> <span class="token punctuation">{</span>
    <span class="token class-name">TransformerFactory</span> transformerFactory <span class="token operator">=</span> <span class="token class-name">TransformerFactory</span><span class="token punctuation">.</span><span class="token function">newInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> transformerFactory<span class="token punctuation">.</span><span class="token function">newTransformer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>有时，我们可能想要排除XML声明。我们可以通过设置_OutputKeys.OMIT_XML_DECLARATION_属性来配置我们的转换器来做到这一点。</p><p>现在，要应用一些缩进，我们可以使用两个属性：_OutputKeys.INDENT_和缩进量属性来指定缩进量。这将正确地缩进输出，因为默认情况下，缩进使用零个空格。</p><p>通过设置上述属性，我们得到了一个看起来更好的输出：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>\\&lt;fruit\\&gt;
    \\&lt;name\\&gt;Apple\\&lt;/name\\&gt;
    \\&lt;color\\&gt;Red\\&lt;/color\\&gt;
    \\&lt;weight unit=&quot;grams&quot;\\&gt;150\\&lt;/weight\\&gt;
    \\&lt;sweetness\\&gt;7\\&lt;/sweetness\\&gt;
\\&lt;/fruit\\&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="结论" tabindex="-1"><a class="header-anchor" href="#结论"><span>结论</span></a></h2><p>在这篇简短的文章中，我们学习了如何从Java <em>String_对象创建XML Document，然后我们看到了如何使用_javax.xml.transform_包将这个Document转换回_String</em>。</p><p>除此之外，我们还看到了几种自定义XML输出的方法，这在将XML记录到控制台时非常有用。</p><p>如往常一样，文章的完整源代码可以在GitHub上找到。</p><p>OK</p>`,35),p=[o];function c(l,i){return s(),a("div",null,p)}const d=n(e,[["render",c],["__file","How to Convert org.w3c.dom.Document to String in Java.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/Archive/How%20to%20Convert%20org.w3c.dom.Document%20to%20String%20in%20Java.html","title":"在Java中将org.w3c.dom.Document转换为String的方法 | Baeldung## 概述","lang":"zh-CN","frontmatter":{"date":"2024-06-13T00:00:00.000Z","category":["Java","XML"],"tag":["XML转换","DOM","Java"],"description":"在Java中将org.w3c.dom.Document转换为String的方法 | Baeldung## 概述 在Java中处理XML时，我们经常需要将一个_org.w3c.dom.Document_实例转换为_String_。通常我们可能出于多种原因需要这样做，例如序列化、记录日志以及处理HTTP请求或响应。 在这个快速教程中，我们将看到如何将一个_...","head":[["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/How%20to%20Convert%20org.w3c.dom.Document%20to%20String%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Java中将org.w3c.dom.Document转换为String的方法 | Baeldung## 概述"}],["meta",{"property":"og:description","content":"在Java中将org.w3c.dom.Document转换为String的方法 | Baeldung## 概述 在Java中处理XML时，我们经常需要将一个_org.w3c.dom.Document_实例转换为_String_。通常我们可能出于多种原因需要这样做，例如序列化、记录日志以及处理HTTP请求或响应。 在这个快速教程中，我们将看到如何将一个_..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"XML转换"}],["meta",{"property":"article:tag","content":"DOM"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:published_time","content":"2024-06-13T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Java中将org.w3c.dom.Document转换为String的方法 | Baeldung## 概述\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-13T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]]},"headers":[{"level":2,"title":"创建一个简单的文档","slug":"创建一个简单的文档","link":"#创建一个简单的文档","children":[]},{"level":2,"title":"使用XML转换API进行转换","slug":"使用xml转换api进行转换","link":"#使用xml转换api进行转换","children":[]},{"level":2,"title":"单元测试","slug":"单元测试","link":"#单元测试","children":[]},{"level":2,"title":"自定义输出","slug":"自定义输出","link":"#自定义输出","children":[]},{"level":2,"title":"结论","slug":"结论","link":"#结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":3.68,"words":1103},"filePathRelative":"posts/baeldung/Archive/How to Convert org.w3c.dom.Document to String in Java.md","localizedDate":"2024年6月13日","excerpt":"\\n<p>在Java中处理XML时，我们经常需要将一个_org.w3c.dom.Document_实例转换为_String_。<strong>通常我们可能出于多种原因需要这样做，例如序列化、记录日志以及处理HTTP请求或响应。</strong></p>\\n<p>在这个快速教程中，我们将看到如何将一个_Document_转换为_String_。要了解更多关于Java中使用XML的信息，请查看我们关于XML的全面系列。</p>\\n<h2>创建一个简单的文档</h2>\\n<p>本教程的示例将集中在一个描述一些水果的简单XML文档上：</p>\\n<div class=\\"language-text\\" data-ext=\\"text\\" data-title=\\"text\\"><pre class=\\"language-text\\"><code>\\\\&lt;fruit\\\\&gt;\\n    \\\\&lt;name\\\\&gt;Apple\\\\&lt;/name\\\\&gt;\\n    \\\\&lt;color\\\\&gt;Red\\\\&lt;/color\\\\&gt;\\n    \\\\&lt;weight unit=\\"grams\\"\\\\&gt;150\\\\&lt;/weight\\\\&gt;\\n    \\\\&lt;sweetness\\\\&gt;7\\\\&lt;/sweetness\\\\&gt;\\n\\\\&lt;/fruit\\\\&gt;\\n</code></pre></div>","autoDesc":true}');export{d as comp,m as data};
