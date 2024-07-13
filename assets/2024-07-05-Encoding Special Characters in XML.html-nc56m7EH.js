import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as a,a as n}from"./app-DkA39C0B.js";const i={},l=n('<h1 id="xml中特殊字符的编码" tabindex="-1"><a class="header-anchor" href="#xml中特殊字符的编码"><span>XML中特殊字符的编码</span></a></h1><p>在这篇文章中，我们将探索XML实体，它们是什么，以它们能为我们做些什么。特别是，我们将看到XML中的标准实体以及如何定义我们自己的实体（如果需要的话）。</p><h2 id="_2-xml是如何构建的" tabindex="-1"><a class="header-anchor" href="#_2-xml是如何构建的"><span>2. XML是如何构建的？</span></a></h2><p>XML是一种用于表示任意数据的标记格式。它使用XML元素的层次结构来实现这一点，每个元素都可以有属性。例如：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>`````&lt;part number=&quot;1976&quot;&gt;`````\n    `````&lt;name&gt;`````Windscreen Wiper`````&lt;/name&gt;`````\n`````&lt;/part&gt;`````\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这显示了一个名为“part”的元素，它有一个属性——“number”——以及一个嵌套元素——“name”。</p><p><strong>值得注意的是，XML语言使用一些特殊字符来管理这一点。</strong> 例如，一个元素总是以小于号——“<code>&lt;”开始，并以大于号——“&gt;</code>”结束。</p><p><strong>然而，如果这些字符对XML有特殊含义，那就意味着我们不能在内容中使用它们。</strong> 这样做至少会导致歧义，在最坏的情况下会导致无法解析。</p><p>例如，如果我们试图使用XML来表示一个简单的数学方程，我们可能会这样写：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>`&lt;math&gt;` 1 `&lt; x &gt;` 5 `&lt;/math&gt;`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这试图表示_x_的值在1和5之间。然而，XML处理器无法知道意图不是在两个数字之间有一个“x”元素。</p><h2 id="_3-标准xml实体" tabindex="-1"><a class="header-anchor" href="#_3-标准xml实体"><span>3. 标准XML实体</span></a></h2><p><strong>XML通过使用XML实体来解决这个问题。这些是特殊的序列，它们代表其他字符。</strong></p><p>XML实体总是以和号字符——“&amp;”开始，并以分号字符——“;”结束。然后实体的名称位于这两个字符之间。例如，实体“&lt;”用于表示小于字符——“`&lt;”。</p><p>有一组五个标准实体，对于表示XML中具有特殊含义的字符是必要的：</p><table><thead><tr><th>实体</th><th>表示的字符</th></tr></thead><tbody><tr><td>&amp;</td><td>和号——&amp;</td></tr><tr><td>&#39;</td><td>单引号——‘</td></tr><tr><td>&gt;</td><td>大于号——&gt;`</td></tr><tr><td>&lt;</td><td>小于号——`&lt;</td></tr><tr><td>&quot;</td><td>引号——“</td></tr></tbody></table><p>知道了这一点，我们上面尝试表示数学方程的尝试将变成：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/05/lt.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>突然之间，如何理解这一点就没有歧义了。</p><h2 id="_4-字符实体" tabindex="-1"><a class="header-anchor" href="#_4-字符实体"><span>4. 字符实体</span></a></h2><p>除了上述内容，<strong>XML还提供了表示任意Unicode字符的能力。</strong> 我们通过直接引用Unicode代码点的十进制或十六进制形式来实现这一点。</p><p>这些是标准XML实体——意味着它们以“&amp;”字符为前缀，并以“;”字符为后缀。十进制代码点以“#”字符为前缀，十六进制的以“#x”为前缀。</p><p>例如，字符“÷”是除法符号。Unicode将其表示为代码点U+00F7。因此，我们可以将其表示为XML中的 <img src="https://www.baeldung.com/wp-content/uploads/2023/05/Screenshot-2023-05-19-at-07.19.36.png" alt="img" loading="lazy"> 或 <img src="https://www.baeldung.com/wp-content/uploads/2023/05/Screenshot-2023-05-19-at-07.22.00.png" alt="img" loading="lazy">。</p><p>如果我们不使用Unicode字符集来编码我们的XML文档——例如，如果我们使用ISO-8859-1——但仍然想要表示Unicode字符，这将特别有用。它也可以用于表示某些特殊字符，如非打印或组合字符，以便开发人员在阅读时可以看到它们的存在。</p><p>最后，我们可以使用它来表示否则无法出现在文档中的控制字符——例如，U+0000是空字符，但将这个裸字符直接放在文档中可能会破坏许多阅读器。</p><h2 id="_5-自定义实体" tabindex="-1"><a class="header-anchor" href="#_5-自定义实体"><span>5. 自定义实体</span></a></h2><p><strong>我们也可以定义自己的XML实体。</strong> 这让我们指定我们选择的实体名称，并定义它将被替换的值。如果我们有某些重复的值需要轻松管理，这可能会有所帮助，但如果使用不当，它也会带来一些潜在的安全风险。</p><p>我们需要使用文档类型定义（DTD）来定义自定义实体。这是XML文档开始之前的一个部分，可以用来定义其结构——类似于XSD。我们使用“&lt;!DOCTYPE name [...”构造，其中“name”是DTD的任意名称：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>&lt;!DOCTYPE example [\n    ....\n]&gt;`\n`````&lt;part number=&quot;1976&quot;&gt;`````\n    `````&lt;name&gt;`````Windscreen Wiper`````&lt;/name&gt;`````\n`````&lt;/part&gt;`````\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个构造内部，我们包括了DTD定义。这可以包括除其他事项外的自定义实体定义——无论是内部还是外部实体。</p><h3 id="_5-1-内部实体" tabindex="-1"><a class="header-anchor" href="#_5-1-内部实体"><span>5.1. 内部实体</span></a></h3><p><strong>内部实体是直接定义的，给它一个名称和一个值。</strong> 一旦这样做了，就可以像使用任何其他实体一样使用这个名称的实体。例如：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>`&lt;!DOCTYPE example [\n    &lt;!ENTITY windscreen &quot;Windscreen Wiper&quot;&gt;`\n]&gt;\n`````&lt;part number=&quot;1976&quot;&gt;`````\n    `````&lt;name&gt;`````&amp;windscreen;`````&lt;/name&gt;`````\n`````&lt;/part&gt;`````\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们定义了一个名为“windscreen”的自定义实体和一个替换值为“Windscreen Wiper”。我们使用“&amp;windscreen;”。我们的XML处理程序将用“Windscreen Wiper”值替换这个。</p><h3 id="_5-2-外部实体" tabindex="-1"><a class="header-anchor" href="#_5-2-外部实体"><span>5.2. 外部实体</span></a></h3><p><strong>外部实体的工作方式相同，但不是直接在DTD中提供值，而是提供找到它的位置。</strong> 例如：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>`&lt;!DOCTYPE example [\n    &lt;!ENTITY windscreen SYSTEM &quot;http://example.com/parts/windscreen.txt&quot;&gt;`\n]&gt;\n`````&lt;part number=&quot;1976&quot;&gt;`````\n    `````&lt;name&gt;`````&amp;windscreen;`````&lt;/name&gt;`````\n`````&lt;/part&gt;`````\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们定义了一个名为“windscreen”的自定义实体，替换值为URL“http://example.com/parts/windscreen.txt”上找到的内容。我们可以像以前一样使用它，XML处理器将在需要时自动获取这个外部资源。</p><h3 id="_5-3-潜在的安全风险" tabindex="-1"><a class="header-anchor" href="#_5-3-潜在的安全风险"><span>5.3. 潜在的安全风险</span></a></h3><p><strong>使用自定义实体可能很强大，但也可能使我们面临一些潜在的安全风险。</strong> 特别是，如果我们处理的XML文档是由不受信任的来源提供的，那么我们需要特别小心。</p><p>这里最明显的攻击是XML外部实体（XXE）注入。这是某人可以精心制作一个XML文档，恶意加载攻击者不应该访问的资源。例如：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>`&lt;!DOCTYPE example [\n    &lt;!ENTITY windscreen SYSTEM &quot;file:///etc/passwd&quot;&gt;`\n]&gt;\n`````&lt;part number=&quot;1976&quot;&gt;`````\n    `````&lt;name&gt;`````&amp;windscreen;`````&lt;/name&gt;`````\n`````&lt;/part&gt;`````\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个XML文档声明了一个自定义实体，系统密码文件的内容将替换它。显然，这是不应该发生的，但如果我们不小心，攻击者确实可以做到这一点。</p><p><strong>另一种潜在的攻击有时被称为XML炸弹。</strong> 这是一种使用XML实体重复扩展的DoS攻击：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>`&lt;!DOCTYPE test [\n    &lt;!ENTITY a0 &quot;someLargeString&quot;&gt;`\n    `&lt;!ENTITY a1 &quot;&amp;a0;&amp;a0;&amp;a0;&amp;a0;&amp;a0;&amp;a0;&amp;a0;&amp;a0;&amp;a0;&quot;&gt;`\n    `&lt;!ENTITY a2 &quot;&amp;a1;&amp;a1;&amp;a1;&amp;a1;&amp;a1;&amp;a1;&amp;a1;&amp;a1;&amp;a1;&amp;a1;&quot;&gt;`\n    `&lt;!ENTITY a3 &quot;&amp;a2;&amp;a2;&amp;a2;&amp;a2;&amp;a2;&amp;a2;&amp;a2;&amp;a2;&amp;a2;&amp;a2;&quot;&gt;`\n    `&lt;!ENTITY a4 &quot;&amp;a3;&amp;a3;&amp;a3;&amp;a3;&amp;a3;&amp;a3;&amp;a3;&amp;a3;&amp;a3;&amp;a3;&quot;&gt;`\n]&gt;\n`&lt;document&gt;`&amp;a4;`&lt;/document&gt;`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们有“&amp;a4;”实体。这扩展为“&amp;a3;”的10个实例，每个实例又扩展为“&amp;a2;”的10个实例，依此类推。这导致我们的文档包括了“someLargeString”的10,000个实例。如果攻击者走得更远，我们可以得到更多——深入10个级别将给我们10,000,000,000个实例，这将是140 GB的大小。</p><p><strong>总的来说，避免这些风险的唯一方法是在XML处理器中完全禁用自定义实体。</strong> 然而，这也消除了它们带来的好处。如果我们处理来自不受信任来源的XML文档，那么这个风险可能不值得好处，但对于内部文档，可能是有益的。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在这篇文章中，我们看到了如何在XML文档中使用XML实体来表示特殊字符。我们甚至学会了如何定义我们自己的实体（如果必要的话）。</p>',49),d=[l];function r(s,p){return a(),t("div",null,d)}const o=e(i,[["render",r],["__file","2024-07-05-Encoding Special Characters in XML.html.vue"]]),g=JSON.parse('{"path":"/posts/baeldung/2024-07-05/2024-07-05-Encoding%20Special%20Characters%20in%20XML.html","title":"XML中特殊字符的编码","lang":"zh-CN","frontmatter":{"date":"2023-05-19T00:00:00.000Z","category":["XML","编码"],"tag":["XML","特殊字符","实体"],"head":[["meta",{"name":"keywords","content":"XML, 特殊字符编码, 实体"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-05/2024-07-05-Encoding%20Special%20Characters%20in%20XML.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"XML中特殊字符的编码"}],["meta",{"property":"og:description","content":"XML中特殊字符的编码 在这篇文章中，我们将探索XML实体，它们是什么，以它们能为我们做些什么。特别是，我们将看到XML中的标准实体以及如何定义我们自己的实体（如果需要的话）。 2. XML是如何构建的？ XML是一种用于表示任意数据的标记格式。它使用XML元素的层次结构来实现这一点，每个元素都可以有属性。例如： 这显示了一个名为“part”的元素，它..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2023/05/lt.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-05T08:37:36.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"XML"}],["meta",{"property":"article:tag","content":"特殊字符"}],["meta",{"property":"article:tag","content":"实体"}],["meta",{"property":"article:published_time","content":"2023-05-19T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-05T08:37:36.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"XML中特殊字符的编码\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2023/05/lt.png\\",\\"https://www.baeldung.com/wp-content/uploads/2023/05/Screenshot-2023-05-19-at-07.19.36.png\\",\\"https://www.baeldung.com/wp-content/uploads/2023/05/Screenshot-2023-05-19-at-07.22.00.png\\"],\\"datePublished\\":\\"2023-05-19T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-05T08:37:36.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"XML中特殊字符的编码 在这篇文章中，我们将探索XML实体，它们是什么，以它们能为我们做些什么。特别是，我们将看到XML中的标准实体以及如何定义我们自己的实体（如果需要的话）。 2. XML是如何构建的？ XML是一种用于表示任意数据的标记格式。它使用XML元素的层次结构来实现这一点，每个元素都可以有属性。例如： 这显示了一个名为“part”的元素，它..."},"headers":[{"level":2,"title":"2. XML是如何构建的？","slug":"_2-xml是如何构建的","link":"#_2-xml是如何构建的","children":[]},{"level":2,"title":"3. 标准XML实体","slug":"_3-标准xml实体","link":"#_3-标准xml实体","children":[]},{"level":2,"title":"4. 字符实体","slug":"_4-字符实体","link":"#_4-字符实体","children":[]},{"level":2,"title":"5. 自定义实体","slug":"_5-自定义实体","link":"#_5-自定义实体","children":[{"level":3,"title":"5.1. 内部实体","slug":"_5-1-内部实体","link":"#_5-1-内部实体","children":[]},{"level":3,"title":"5.2. 外部实体","slug":"_5-2-外部实体","link":"#_5-2-外部实体","children":[]},{"level":3,"title":"5.3. 潜在的安全风险","slug":"_5-3-潜在的安全风险","link":"#_5-3-潜在的安全风险","children":[]}]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1720168656000,"updatedTime":1720168656000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":6.11,"words":1832},"filePathRelative":"posts/baeldung/2024-07-05/2024-07-05-Encoding Special Characters in XML.md","localizedDate":"2023年5月19日","excerpt":"\\n<p>在这篇文章中，我们将探索XML实体，它们是什么，以它们能为我们做些什么。特别是，我们将看到XML中的标准实体以及如何定义我们自己的实体（如果需要的话）。</p>\\n<h2>2. XML是如何构建的？</h2>\\n<p>XML是一种用于表示任意数据的标记格式。它使用XML元素的层次结构来实现这一点，每个元素都可以有属性。例如：</p>\\n<div class=\\"language-text\\" data-ext=\\"text\\" data-title=\\"text\\"><pre class=\\"language-text\\"><code>`````&lt;part number=\\"1976\\"&gt;`````\\n    `````&lt;name&gt;`````Windscreen Wiper`````&lt;/name&gt;`````\\n`````&lt;/part&gt;`````\\n</code></pre></div>","autoDesc":true}');export{o as comp,g as data};
