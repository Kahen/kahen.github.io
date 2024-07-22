import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as t,a as s}from"./app-BMOUrRO4.js";const e={},p=s('<h1 id="thymeleaf-中-th-text-和-th-value-的区别" tabindex="-1"><a class="header-anchor" href="#thymeleaf-中-th-text-和-th-value-的区别"><span>Thymeleaf 中 th:text 和 th:value 的区别</span></a></h1><p>Thymeleaf 是一个流行的服务器端 Java 模板引擎，允许我们创建动态网页。它提供了多个属性来将模型中的数据绑定到视图。</p><p>在这个简短的教程中，我们将探讨 Thymeleaf 中 th:text 和 th:value 属性的关键区别。</p><h2 id="_2-th-text-属性" tabindex="-1"><a class="header-anchor" href="#_2-th-text-属性"><span>2. th:text 属性</span></a></h2><p>Thymeleaf 中的 th:text 属性用于设置元素的文本内容。此外，它替换了标准的 HTML text 属性。因此，我们可以将其放在任何支持文本内容的 HTML 元素中，例如标题、段落、标签等。</p><p>此外，我们可以使用该属性来显示动态文本内容，例如网页上的标题。假设我们想在 HTML 页面上显示由控制器提供的 title 属性。</p><p>首先，让我们创建一个控制器类和一个方法，我们将在其中指定模型属性：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@GetMapping</span>\n<span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">show</span><span class="token punctuation">(</span><span class="token class-name">Model</span> model<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    model<span class="token punctuation">.</span><span class="token function">addAttribute</span><span class="token punctuation">(</span><span class="token string">&quot;title&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Baeldung&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">return</span> <span class="token string">&quot;attributes/index&quot;</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们将在标题元素中显示该值：</p><div class="language-html line-numbers-mode" data-ext="html" data-title="html"><pre class="language-html"><code>`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span> <span class="token attr-name"><span class="token namespace">th:</span>text</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>${title}<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">&gt;</span></span>```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在这里，Thymeleaf 评估表达式“${title}”并将值插入到标题元素中。</p><p>我们将得到以下结果的 HTML：</p><div class="language-html line-numbers-mode" data-ext="html" data-title="html"><pre class="language-html"><code>`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">&gt;</span></span>`Baeldung```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">&gt;</span></span>```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>此外，与标准 HTML text 属性不同，th:text 属性支持表达式。除了变量外，这些表达式可能包括运算符和函数。</p><p>例如，让我们指定如果 title 属性没有提供时的默认值：</p><div class="language-html line-numbers-mode" data-ext="html" data-title="html"><pre class="language-html"><code>`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span> <span class="token attr-name"><span class="token namespace">th:</span>text</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>${title} ?: &#39;默认标题&#39;<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">&gt;</span></span>```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_3-th-value-属性" tabindex="-1"><a class="header-anchor" href="#_3-th-value-属性"><span>3. th:value 属性</span></a></h2><p>另一方面，th:value 属性用于设置通常需要用户输入的元素的值。属于这一类的元素包括输入字段、复选框、单选按钮和下拉列表。</p><p>我们可以在任何具有 value 属性的元素中使用此属性，而不是标准 HTML value 属性。因此，将此属性添加到不支持它的元素上 - 例如，段落 - 将不会有任何效果。</p><p>首先，让我们创建一个包含一个电子邮件输入字段的简单表单：</p><div class="language-html line-numbers-mode" data-ext="html" data-title="html"><pre class="language-html"><code>`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>form</span> <span class="token attr-name"><span class="token namespace">th:</span>action</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>@{/attributes}<span class="token punctuation">&quot;</span></span> <span class="token attr-name">method</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>post<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>email<span class="token punctuation">&quot;</span></span> <span class="token attr-name"><span class="token namespace">th:</span>value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>${email}<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>submit<span class="token punctuation">&quot;</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>提交<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>`\n`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>form</span><span class="token punctuation">&gt;</span></span>`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们修改控制器中的方法并添加 email 属性：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@GetMapping</span>\n<span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">show</span><span class="token punctuation">(</span><span class="token class-name">Model</span> model<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    model<span class="token punctuation">.</span><span class="token function">addAttribute</span><span class="token punctuation">(</span><span class="token string">&quot;title&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Baeldung&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    model<span class="token punctuation">.</span><span class="token function">addAttribute</span><span class="token punctuation">(</span><span class="token string">&quot;email&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;default@example.com&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">return</span> <span class="token string">&quot;attributes/index&quot;</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，Thymeleaf 将在输入元素中显示值：</p><div class="language-html line-numbers-mode" data-ext="html" data-title="html"><pre class="language-html"><code>`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>email<span class="token punctuation">&quot;</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>default@example.com<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>由于我们在使用 th:value 的输入字段内，我们更有可能希望在表单提交时将值传回控制器。<strong>要传递值，我们需要以与变量名匹配的方式指定输入字段的 th:name ：</strong></p><div class="language-html line-numbers-mode" data-ext="html" data-title="html"><pre class="language-html"><code>`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name"><span class="token namespace">th:</span>name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>email<span class="token punctuation">&quot;</span></span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>email<span class="token punctuation">&quot;</span></span> <span class="token attr-name"><span class="token namespace">th:</span>value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>${email}<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>现在，我们可以向控制器添加一个 POST 方法来读取用户的输入：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@PostMapping</span>\n<span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">submit</span><span class="token punctuation">(</span><span class="token class-name">String</span> email<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    logger<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;Email: {}&quot;</span><span class="token punctuation">,</span> email<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">return</span> <span class="token string">&quot;attributes/index&quot;</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该属性也支持表达式：</p><div class="language-html line-numbers-mode" data-ext="html" data-title="html"><pre class="language-html"><code>`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>email<span class="token punctuation">&quot;</span></span> <span class="token attr-name"><span class="token namespace">th:</span>value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>${email} ?: &#39;default@email.com&#39;<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们探讨了 Thymeleaf 属性 th:text 和 th:value 之间的区别。我们使用 th:text 属性来指定元素的文本内容，使用 th:value 属性来设置元素的值。</p><p>如常，所有源代码都可以在 GitHub 上找到。</p><p><img src="https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg" alt="img" loading="lazy"><img src="https://secure.gravatar.com/avatar/8b2c4148df481ca115ca7c0151fe8c93?s=50&amp;r=g" alt="img" loading="lazy"><img src="https://secure.gravatar.com/avatar/e10d6ff4ff6d95fd255cc95a5ab28c0e?s=50&amp;r=g" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png" alt="img" loading="lazy"></p><p>OK</p>',36),l=[p];function o(c,u){return t(),n("div",null,l)}const d=a(e,[["render",o],["__file","2024-07-06-Difference Between th text and th value in Thymeleaf.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-07-06/2024-07-06-Difference%20Between%20th%20text%20and%20th%20value%20in%20Thymeleaf.html","title":"Thymeleaf 中 th:text 和 th:value 的区别","lang":"zh-CN","frontmatter":{"date":"2024-07-07T00:00:00.000Z","category":["Java","Thymeleaf"],"tag":["th:text","th:value"],"head":[["meta",{"name":"keywords","content":"Thymeleaf, th:text, th:value, 服务器端模板引擎, 动态网页, 数据绑定"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-06/2024-07-06-Difference%20Between%20th%20text%20and%20th%20value%20in%20Thymeleaf.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Thymeleaf 中 th:text 和 th:value 的区别"}],["meta",{"property":"og:description","content":"Thymeleaf 中 th:text 和 th:value 的区别 Thymeleaf 是一个流行的服务器端 Java 模板引擎，允许我们创建动态网页。它提供了多个属性来将模型中的数据绑定到视图。 在这个简短的教程中，我们将探讨 Thymeleaf 中 th:text 和 th:value 属性的关键区别。 2. th:text 属性 Thymele..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-06T19:57:44.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"th:text"}],["meta",{"property":"article:tag","content":"th:value"}],["meta",{"property":"article:published_time","content":"2024-07-07T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-06T19:57:44.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Thymeleaf 中 th:text 和 th:value 的区别\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg\\",\\"https://secure.gravatar.com/avatar/8b2c4148df481ca115ca7c0151fe8c93?s=50&r=g\\",\\"https://secure.gravatar.com/avatar/e10d6ff4ff6d95fd255cc95a5ab28c0e?s=50&r=g\\",\\"https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png\\",\\"https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg\\",\\"https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png\\"],\\"datePublished\\":\\"2024-07-07T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-06T19:57:44.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Thymeleaf 中 th:text 和 th:value 的区别 Thymeleaf 是一个流行的服务器端 Java 模板引擎，允许我们创建动态网页。它提供了多个属性来将模型中的数据绑定到视图。 在这个简短的教程中，我们将探讨 Thymeleaf 中 th:text 和 th:value 属性的关键区别。 2. th:text 属性 Thymele..."},"headers":[{"level":2,"title":"2. th:text 属性","slug":"_2-th-text-属性","link":"#_2-th-text-属性","children":[]},{"level":2,"title":"3. th:value 属性","slug":"_3-th-value-属性","link":"#_3-th-value-属性","children":[]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1720295864000,"updatedTime":1720295864000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.9,"words":869},"filePathRelative":"posts/baeldung/2024-07-06/2024-07-06-Difference Between th text and th value in Thymeleaf.md","localizedDate":"2024年7月7日","excerpt":"\\n<p>Thymeleaf 是一个流行的服务器端 Java 模板引擎，允许我们创建动态网页。它提供了多个属性来将模型中的数据绑定到视图。</p>\\n<p>在这个简短的教程中，我们将探讨 Thymeleaf 中 th:text 和 th:value 属性的关键区别。</p>\\n<h2>2. th:text 属性</h2>\\n<p>Thymeleaf 中的 th:text 属性用于设置元素的文本内容。此外，它替换了标准的 HTML text 属性。因此，我们可以将其放在任何支持文本内容的 HTML 元素中，例如标题、段落、标签等。</p>\\n<p>此外，我们可以使用该属性来显示动态文本内容，例如网页上的标题。假设我们想在 HTML 页面上显示由控制器提供的 title 属性。</p>","autoDesc":true}');export{d as comp,m as data};
