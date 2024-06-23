import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-DFCp-P9j.js";const e={},o=t('<h1 id="xml中无效字符的处理" tabindex="-1"><a class="header-anchor" href="#xml中无效字符的处理"><span>XML中无效字符的处理</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>XML（可扩展标记语言）是用于跨不同平台和应用程序存储和传输数据的最广泛使用的格式之一。然而，尽管其具有强大的功能，XML并非没有问题，处理XML文档中的无效字符就是一个挑战。</p><p>在本文中，我们将探讨不同的无效字符以及如何在XML处理中处理它们。</p><h2 id="_2-xml中有效字符" tabindex="-1"><a class="header-anchor" href="#_2-xml中有效字符"><span>2. XML中有效字符</span></a></h2><p>XML规范定义了允许在元素内容和属性值中的字符。根据XML 1.0规范，可接受的字符如下所示。XML将这些范围之外的任何字符视为无效字符：</p><table><thead><tr><th><strong>描述</strong></th><th><strong>范围</strong></th><th><strong>示例</strong></th></tr></thead><tbody><tr><td>制表符（水平制表）</td><td>9 (TAB)</td><td>\\t</td></tr><tr><td>换行符（新行）</td><td>10 (LF)</td><td>\\n</td></tr><tr><td>回车符（回到行首）</td><td>13 (CR)</td><td>\\r</td></tr><tr><td>基本多语言平面（BMP）中的字符，不包括代理块</td><td>32 to 55295</td><td>A, b, &amp;, 1, α（希腊字母α）</td></tr><tr><td>辅助私用区A（SMP）中的字符，不包括代理块</td><td>57344 to 65533</td><td>😊（笑脸），🎉（派对彩带）</td></tr><tr><td>辅助平面中的BMP之外的字符</td><td>65536 to 1114111</td><td>🌍（带有经线的地球），🚀（火箭）</td></tr></tbody></table><p>注意：在Unicode中，我们使用代理块作为UTF-16编码中特定的码点范围，以表示基本多语言平面之外的字符。</p><h2 id="_3-xml-1-1和处理无效字符" tabindex="-1"><a class="header-anchor" href="#_3-xml-1-1和处理无效字符"><span>3. XML 1.1和处理无效字符</span></a></h2><p><strong>XML 1.1作为XML 1.0的更新引入，提供了额外的灵活性和对更广泛字符范围的支持，包括整个Unicode字符集的字符</strong>。它允许1-31范围内的字符（除了TAB、LF和CR）和某些控制字符，如NEL（下一行，Unicode 0x0085）。</p><p>XML中的无效字符通常分为两类：</p><h3 id="_4-1-保留字符" tabindex="-1"><a class="header-anchor" href="#_4-1-保留字符"><span>4.1. 保留字符</span></a></h3><p>XML为其语法内的特定目的保留了某些字符，例如 <em><code>&lt;_, _&gt;</code></em>, <em>&amp;</em>, <em>&quot;</em> 和 <em>&#39;</em>。当这些字符在没有适当编码的情况下出现在XML元素的上下文中时，它们可能会破坏解析过程并使XML文档无效。让我们看一个提供无效字符的代码示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">givenXml_whenReservedCharacters_thenThrowException</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">String</span> invalidXmlString <span class="token operator">=</span> <span class="token string">&quot;`````&lt;?xml version=\\&quot;1.1\\&quot; encoding=\\&quot;UTF-8\\&quot;?&gt;``````````&lt;root&gt;``````````&lt;name&gt;`````John &amp; Doe`````&lt;/name&gt;``````````&lt;/root&gt;`````&quot;</span><span class="token punctuation">;</span>\n    <span class="token function">assertThrowsExactly</span><span class="token punctuation">(</span><span class="token class-name">SAXParseException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token function">parseXmlString</span><span class="token punctuation">(</span>invalidXmlString<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>我们应该使用预定义的字符实体正确转义保留字符</strong>。例如：</p><ul><li><em>`&lt;</em> 应该被编码为 <em>&lt;</em></li><li><em>&gt;`</em> 应该被编码为 <em>&gt;</em></li><li><em>&amp;</em> 应该被编码为 <em>&amp;</em></li><li><em>&quot;</em> 应该被编码为 <em>&quot;</em></li><li><em>&#39;</em> 应该被编码为 <em>&#39;</em></li></ul><p>我们可以通过执行以下测试来测试它：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">givenXml_whenReservedCharactersEscaped_thenSuccess</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">String</span> validXmlString <span class="token operator">=</span> <span class="token string">&quot;`````&lt;?xml version=\\&quot;1.1\\&quot; encoding=\\&quot;UTF-8\\&quot;?&gt;``````````&lt;root&gt;``````````&lt;name&gt;`````John &amp;amp; Doe`````&lt;/name&gt;``````````&lt;/root&gt;`````&quot;</span><span class="token punctuation">;</span>\n\n    <span class="token function">assertDoesNotThrow</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>\n        <span class="token class-name">Document</span> document <span class="token operator">=</span> <span class="token function">parseXmlString</span><span class="token punctuation">(</span>validXmlString<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n        <span class="token function">assertNotNull</span><span class="token punctuation">(</span>document<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;John &amp; Doe&quot;</span><span class="token punctuation">,</span> document<span class="token punctuation">.</span><span class="token function">getElementsByTagName</span><span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">item</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getTextContent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>处理XML中保留字符的另一种方法是使用CDATA节。它作为封装可能包含被解释为标记的字符的文本块的手段：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">givenXml_whenUsingCdataForReservedCharacters_thenSuccess</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">String</span> validXmlString <span class="token operator">=</span> <span class="token string">&quot;`````&lt;?xml version=\\&quot;1.1\\&quot; encoding=\\&quot;UTF-8\\&quot;?&gt;``````````&lt;root&gt;``````````&lt;name&gt;``````&lt;![CDATA[John &amp; Doe]]&gt;``````&lt;/name&gt;``````````&lt;/root&gt;`````&quot;</span><span class="token punctuation">;</span>\n\n    <span class="token function">assertDoesNotThrow</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>\n        <span class="token class-name">Document</span> document <span class="token operator">=</span> <span class="token function">parseXmlString</span><span class="token punctuation">(</span>validXmlString<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n        <span class="token function">assertNotNull</span><span class="token punctuation">(</span>document<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;John &amp; Doe&quot;</span><span class="token punctuation">,</span> document<span class="token punctuation">.</span><span class="token function">getElementsByTagName</span><span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">item</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getTextContent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2-unicode字符" tabindex="-1"><a class="header-anchor" href="#_4-2-unicode字符"><span>4.2. Unicode字符</span></a></h3><p>XML文档使用Unicode编码，支持来自不同语言和脚本的广泛字符范围。虽然Unicode提供了广泛的覆盖，但它也包括可能与XML编码标准不兼容的字符，导致解析错误。</p><p>让我们考察以下测试场景，我们在其中将记录分隔符纳入XML。Unicode将记录分隔符表示为 <em>\\u001E</em>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">givenXml_whenUnicodeCharacters_thenThrowException</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">String</span> invalidXmlString <span class="token operator">=</span> <span class="token string">&quot;`````&lt;?xml version=\\&quot;1.1\\&quot; encoding=\\&quot;UTF-8\\&quot;?&gt;``````````&lt;root&gt;``````````&lt;name&gt;`````John \\u001E Doe`````&lt;/name&gt;``````````&lt;/root&gt;`````&quot;</span><span class="token punctuation">;</span>\n    <span class="token function">assertThrowsExactly</span><span class="token punctuation">(</span><span class="token class-name">SAXParseException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token function">parseXmlString</span><span class="token punctuation">(</span>invalidXmlString<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该字符具有ASCII值为30，超出了接受范围。因此，解析它的测试将失败。<strong>要正确处理非ASCII字符，我们应该使用Unicode方案如UTF-8或UTF-16对它们进行编码</strong>。</p><p>这确保了在不同平台上的兼容性并避免了数据损坏问题。现在让我们用适当的编码执行以下测试：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">givenXml_whenUnicodeCharactersEscaped_thenSuccess</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">String</span> validXmlString <span class="token operator">=</span> <span class="token string">&quot;`````&lt;?xml version=\\&quot;1.1\\&quot; encoding=\\&quot;UTF-8\\&quot;?&gt;``````````&lt;root&gt;``````````&lt;name&gt;`````John &amp;#x1E; Doe`````&lt;/name&gt;``````````&lt;/root&gt;`````&quot;</span><span class="token punctuation">;</span>\n    <span class="token function">assertDoesNotThrow</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>\n        <span class="token class-name">Document</span> document <span class="token operator">=</span> <span class="token function">parseXmlString</span><span class="token punctuation">(</span>validXmlString<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n        <span class="token function">assertNotNull</span><span class="token punctuation">(</span>document<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;John \\u001E Doe&quot;</span><span class="token punctuation">,</span> document<span class="token punctuation">.</span><span class="token function">getElementsByTagName</span><span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">item</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getTextContent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们探讨了XML中的不同无效字符以及如何有效地处理它们。通过理解无效字符的原因并采用适当的处理策略，开发人员可以确保其XML处理流程的健壮性和可靠性。</p><p>如常，完整的源代码可在GitHub上获得。 OK</p>',30),p=[o];function c(l,i){return s(),a("div",null,p)}const d=n(e,[["render",c],["__file","2024-06-20-Invalid Characters in XML.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/Archive/2024-06-20-Invalid%20Characters%20in%20XML.html","title":"XML中无效字符的处理","lang":"zh-CN","frontmatter":{"date":"2024-06-21T00:00:00.000Z","category":["XML","Java"],"tag":["XML","Java","Invalid Characters"],"head":[["meta",{"name":"keywords","content":"XML, Java, Invalid Characters, XML处理, Java编程"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/2024-06-20-Invalid%20Characters%20in%20XML.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"XML中无效字符的处理"}],["meta",{"property":"og:description","content":"XML中无效字符的处理 1. 概述 XML（可扩展标记语言）是用于跨不同平台和应用程序存储和传输数据的最广泛使用的格式之一。然而，尽管其具有强大的功能，XML并非没有问题，处理XML文档中的无效字符就是一个挑战。 在本文中，我们将探讨不同的无效字符以及如何在XML处理中处理它们。 2. XML中有效字符 XML规范定义了允许在元素内容和属性值中的字符。..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"XML"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Invalid Characters"}],["meta",{"property":"article:published_time","content":"2024-06-21T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"XML中无效字符的处理\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-21T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"XML中无效字符的处理 1. 概述 XML（可扩展标记语言）是用于跨不同平台和应用程序存储和传输数据的最广泛使用的格式之一。然而，尽管其具有强大的功能，XML并非没有问题，处理XML文档中的无效字符就是一个挑战。 在本文中，我们将探讨不同的无效字符以及如何在XML处理中处理它们。 2. XML中有效字符 XML规范定义了允许在元素内容和属性值中的字符。..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. XML中有效字符","slug":"_2-xml中有效字符","link":"#_2-xml中有效字符","children":[]},{"level":2,"title":"3. XML 1.1和处理无效字符","slug":"_3-xml-1-1和处理无效字符","link":"#_3-xml-1-1和处理无效字符","children":[{"level":3,"title":"4.1. 保留字符","slug":"_4-1-保留字符","link":"#_4-1-保留字符","children":[]},{"level":3,"title":"4.2. Unicode字符","slug":"_4-2-unicode字符","link":"#_4-2-unicode字符","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":3.78,"words":1134},"filePathRelative":"posts/baeldung/Archive/2024-06-20-Invalid Characters in XML.md","localizedDate":"2024年6月21日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>XML（可扩展标记语言）是用于跨不同平台和应用程序存储和传输数据的最广泛使用的格式之一。然而，尽管其具有强大的功能，XML并非没有问题，处理XML文档中的无效字符就是一个挑战。</p>\\n<p>在本文中，我们将探讨不同的无效字符以及如何在XML处理中处理它们。</p>\\n<h2>2. XML中有效字符</h2>\\n<p>XML规范定义了允许在元素内容和属性值中的字符。根据XML 1.0规范，可接受的字符如下所示。XML将这些范围之外的任何字符视为无效字符：</p>\\n<table>\\n<thead>\\n<tr>\\n<th><strong>描述</strong></th>\\n<th><strong>范围</strong></th>\\n<th><strong>示例</strong></th>\\n</tr>\\n</thead>\\n<tbody>\\n<tr>\\n<td>制表符（水平制表）</td>\\n<td>9 (TAB)</td>\\n<td>\\\\t</td>\\n</tr>\\n<tr>\\n<td>换行符（新行）</td>\\n<td>10 (LF)</td>\\n<td>\\\\n</td>\\n</tr>\\n<tr>\\n<td>回车符（回到行首）</td>\\n<td>13 (CR)</td>\\n<td>\\\\r</td>\\n</tr>\\n<tr>\\n<td>基本多语言平面（BMP）中的字符，不包括代理块</td>\\n<td>32 to 55295</td>\\n<td>A, b, &amp;, 1, α（希腊字母α）</td>\\n</tr>\\n<tr>\\n<td>辅助私用区A（SMP）中的字符，不包括代理块</td>\\n<td>57344 to 65533</td>\\n<td>😊（笑脸），🎉（派对彩带）</td>\\n</tr>\\n<tr>\\n<td>辅助平面中的BMP之外的字符</td>\\n<td>65536 to 1114111</td>\\n<td>🌍（带有经线的地球），🚀（火箭）</td>\\n</tr>\\n</tbody>\\n</table>","autoDesc":true}');export{d as comp,m as data};
