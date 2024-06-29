import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as a,a as i}from"./app-O62yWemN.js";const n={},l=i(`<h1 id="selenium中通过属性查找元素" tabindex="-1"><a class="header-anchor" href="#selenium中通过属性查找元素"><span>Selenium中通过属性查找元素</span></a></h1><p>Selenium提供了多种在网页上定位元素的方法，我们经常需要基于元素的属性来查找它。属性是额外的信息片段，可以添加以提供更多的上下文或功能。它们大致可以分为两种类型：</p><ul><li>标准属性：这些属性是预定义的，并且被浏览器所识别。例如_id_, <em>class</em>, <em>src</em>, <em>href</em>, <em>alt</em>, _title_等。标准属性具有预定义的含义，并且在不同的HTML元素中广泛使用。</li><li>自定义属性：自定义属性不是HTML规范预定义的，而是由开发人员为特定需求创建的。这些属性通常以“<em>data-</em>”开头，后面跟着一个描述性名称。例如_data-id_, <em>data-toggle</em>, _data-target_等。自定义属性对于存储与元素相关的额外信息或元数据很有用，它们通常在Web开发中用于在HTML和JavaScript之间传递数据。</li></ul><p>在本教程中，我们将深入使用CSS来精确定位网页上的元素。我们将探索通过属性名称或描述来查找元素，包括完全匹配和部分匹配的选项。到结束时，我们将能够轻松地找到页面上的任何元素！</p><h3 id="_2-通过属性名称查找元素" tabindex="-1"><a class="header-anchor" href="#_2-通过属性名称查找元素"><span>2. 通过属性名称查找元素</span></a></h3><p>最简单的场景之一是基于特定属性的存在来查找元素。考虑一个网页上有许多按钮，每个按钮都标记有一个名为“<em>data-action</em>”的自定义属性。现在，假设我们想要定位页面上具有此属性的所有按钮。在这种情况下，我们可以使用_[attribute]_定位器：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>driver.findElements(By.cssSelector(&quot;[data-action]&quot;));
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在上面的代码中，_[data-action]_将选择页面上具有目标属性的所有元素，我们将收到一个_WebElements_列表。</p><h3 id="_3-通过属性值查找元素" tabindex="-1"><a class="header-anchor" href="#_3-通过属性值查找元素"><span>3. 通过属性值查找元素</span></a></h3><p><strong>当我们需要定位具有唯一属性值的具体元素时，我们可以使用CSS定位器的严格匹配变体[attribute=value]</strong>。这种方法允许我们找到具有完全属性值匹配的元素。</p><p>让我们继续以我们的网页为例，按钮具有一个“<em>data-action</em>”属性，每个按钮都被分配了一个不同的动作值。例如_data-action=&#39;delete&#39;_, _data-action=&#39;edit&#39;_等。如果我们想要定位具有特定动作的按钮，例如“delete”，我们可以使用具有精确匹配的属性选择器：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>driver.findElement(By.cssSelector(&quot;[data-action=&#39;delete&#39;]&quot;));
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_4-通过属性值的开始部分查找元素" tabindex="-1"><a class="header-anchor" href="#_4-通过属性值的开始部分查找元素"><span>4. 通过属性值的开始部分查找元素</span></a></h3><p>在确切的属性值可能不同但以特定子字符串开始的情况下，我们可以使用另一种方法。</p><p>考虑一个场景，我们的应用程序有许多弹出窗口，每个窗口都有一个名为“<em>data-action</em>”的自定义属性的“Accept”按钮。这些按钮可能有附加在共享前缀后的不同的标识符，例如“<em>btn_accept_user_pop_up</em>”, “<em>btn_accept_document_pop_up</em>”等。我们可以使用_[attribute^=value]_定位器在基类中编写通用定位器：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>driver.findElement(By.cssSelector(&quot;[data-action^=&#39;btn_accept&#39;]&quot;));
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这个定位器将找到“data-action”属性值以“btn_accept”开头的元素，因此我们可以为每个弹出窗口编写一个通用的“Accept”按钮定位器。</p><h3 id="_5-通过属性值的结尾查找元素" tabindex="-1"><a class="header-anchor" href="#_5-通过属性值的结尾查找元素"><span>5. 通过属性值的结尾查找元素</span></a></h3><p>类似地，<strong>当我们的属性值以特定后缀结束时</strong>，让我们使用_[attribute$=value]_。假设我们有一个页面上的URL列表，想要获取所有PDF文档引用：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>driver.findElements(By.cssSelector(&quot;[href$=&#39;.pdf&#39;]&quot;));
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在这个例子中，driver将找到所有“href”属性值以“.pdf”结尾的元素。</p><h3 id="_6-通过属性值的一部分查找元素" tabindex="-1"><a class="header-anchor" href="#_6-通过属性值的一部分查找元素"><span>6. 通过属性值的一部分查找元素</span></a></h3><p>当我们不确定属性的前缀或后缀时，将有助于使用包含方法_[attribute*=value]_。考虑一个场景，我们想要获取所有引用特定资源路径的元素：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>driver.findElements(By.cssSelector(&quot;[href*=&#39;archive/documents&#39;]&quot;));
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在这个例子中，我们将收到所有引用来自存档文件夹的文档的元素。</p><h3 id="_7-通过特定类查找元素" tabindex="-1"><a class="header-anchor" href="#_7-通过特定类查找元素"><span>7. 通过特定类查找元素</span></a></h3><p><strong>我们可以使用它的类作为属性来定位一个元素</strong>。这是一种常见的技术，特别是当检查一个元素是否被启用，禁用，或者具有在其类中反映的其他能力时。考虑我们想要找到一个禁用的按钮：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>\`&lt;a href=&quot;#&quot; class=&quot;btn btn-primary btn-lg disabled&quot; role=&quot;button&quot; aria-disabled=&quot;true&quot;&gt;\`Accept\`&lt;/a&gt;\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这次，让我们对角色使用严格匹配，并包含对类的匹配：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>driver.findElement(By.cssSelector(&quot;[role=&#39;button&#39;][class*=&#39;disabled&#39;]&quot;));
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在这个例子中，“class”被用作属性定位器_[attribute*=value]_，并在值“btn btn-primary btn-lg disabled”中检测到“disabled”部分。</p><h3 id="_8-结论" tabindex="-1"><a class="header-anchor" href="#_8-结论"><span>8. 结论</span></a></h3><p>在本教程中，我们探索了基于属性的不同方式来定位元素。</p><p>我们将属性分为两种主要类型：标准，由浏览器识别并具有预定义的含义；自定义，由开发人员创建以满足特定要求。</p><p>使用CSS选择器，我们学习了如何高效地基于属性名称、值、前缀、后缀甚至子字符串来查找元素。理解这些方法为我们提供了强大的工具，可以轻松地定位元素，使我们的自动化任务更加顺畅和高效。</p><p>如常，所有代码示例都可以在GitHub上找到。</p><p>评论在文章发布后30天内开放。对于此日期之后的任何问题，请使用网站上的联系表单。</p>`,37),r=[l];function d(s,c){return a(),t("div",null,r)}const p=e(n,[["render",d],["__file","2024-06-20-Finding Element by Attribute in Selenium.html.vue"]]),u=JSON.parse('{"path":"/posts/baeldung/Archive/2024-06-20-Finding%20Element%20by%20Attribute%20in%20Selenium.html","title":"Selenium中通过属性查找元素","lang":"zh-CN","frontmatter":{"date":"2024-06-20T00:00:00.000Z","category":["Selenium","Web Automation"],"tag":["CSS Selectors","Web Testing"],"head":[["meta",{"name":"keywords","content":"Selenium, Web Automation, CSS Selectors, Element Locator, Attribute Search"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/2024-06-20-Finding%20Element%20by%20Attribute%20in%20Selenium.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Selenium中通过属性查找元素"}],["meta",{"property":"og:description","content":"Selenium中通过属性查找元素 Selenium提供了多种在网页上定位元素的方法，我们经常需要基于元素的属性来查找它。属性是额外的信息片段，可以添加以提供更多的上下文或功能。它们大致可以分为两种类型： 标准属性：这些属性是预定义的，并且被浏览器所识别。例如_id_, class, src, href, alt, _title_等。标准属性具有预定义..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"CSS Selectors"}],["meta",{"property":"article:tag","content":"Web Testing"}],["meta",{"property":"article:published_time","content":"2024-06-20T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Selenium中通过属性查找元素\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-20T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Selenium中通过属性查找元素 Selenium提供了多种在网页上定位元素的方法，我们经常需要基于元素的属性来查找它。属性是额外的信息片段，可以添加以提供更多的上下文或功能。它们大致可以分为两种类型： 标准属性：这些属性是预定义的，并且被浏览器所识别。例如_id_, class, src, href, alt, _title_等。标准属性具有预定义..."},"headers":[{"level":3,"title":"2. 通过属性名称查找元素","slug":"_2-通过属性名称查找元素","link":"#_2-通过属性名称查找元素","children":[]},{"level":3,"title":"3. 通过属性值查找元素","slug":"_3-通过属性值查找元素","link":"#_3-通过属性值查找元素","children":[]},{"level":3,"title":"4. 通过属性值的开始部分查找元素","slug":"_4-通过属性值的开始部分查找元素","link":"#_4-通过属性值的开始部分查找元素","children":[]},{"level":3,"title":"5. 通过属性值的结尾查找元素","slug":"_5-通过属性值的结尾查找元素","link":"#_5-通过属性值的结尾查找元素","children":[]},{"level":3,"title":"6. 通过属性值的一部分查找元素","slug":"_6-通过属性值的一部分查找元素","link":"#_6-通过属性值的一部分查找元素","children":[]},{"level":3,"title":"7. 通过特定类查找元素","slug":"_7-通过特定类查找元素","link":"#_7-通过特定类查找元素","children":[]},{"level":3,"title":"8. 结论","slug":"_8-结论","link":"#_8-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":4.77,"words":1430},"filePathRelative":"posts/baeldung/Archive/2024-06-20-Finding Element by Attribute in Selenium.md","localizedDate":"2024年6月20日","excerpt":"\\n<p>Selenium提供了多种在网页上定位元素的方法，我们经常需要基于元素的属性来查找它。属性是额外的信息片段，可以添加以提供更多的上下文或功能。它们大致可以分为两种类型：</p>\\n<ul>\\n<li>标准属性：这些属性是预定义的，并且被浏览器所识别。例如_id_, <em>class</em>, <em>src</em>, <em>href</em>, <em>alt</em>, _title_等。标准属性具有预定义的含义，并且在不同的HTML元素中广泛使用。</li>\\n<li>自定义属性：自定义属性不是HTML规范预定义的，而是由开发人员为特定需求创建的。这些属性通常以“<em>data-</em>”开头，后面跟着一个描述性名称。例如_data-id_, <em>data-toggle</em>, _data-target_等。自定义属性对于存储与元素相关的额外信息或元数据很有用，它们通常在Web开发中用于在HTML和JavaScript之间传递数据。</li>\\n</ul>","autoDesc":true}');export{p as comp,u as data};
