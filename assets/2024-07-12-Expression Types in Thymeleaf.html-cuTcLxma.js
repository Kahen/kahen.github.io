import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as t,a as n}from"./app-D4B8YWfq.js";const s={},i=n('<h1 id="thymeleaf中的表达式类型-baeldung" tabindex="-1"><a class="header-anchor" href="#thymeleaf中的表达式类型-baeldung"><span>Thymeleaf中的表达式类型 | Baeldung</span></a></h1><p>Thymeleaf 是Java生态系统中流行的模板引擎。它帮助将控制器层的数据绑定到视图层。本教程将通过示例讨论Thymeleaf的表达式类型。</p><p>我们将使用名为Dino的简单Web应用程序作为示例。这是一个用于创建恐龙资料的简单Web应用程序。</p><p>首先，让我们为我们的恐龙创建一个模型类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Dino</span> <span class="token punctuation">{</span>\n    <span class="token keyword">private</span> <span class="token keyword">int</span> id<span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>\n    <span class="token comment">// 构造函数</span>\n    <span class="token comment">// getter和setter</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们创建一个控制器类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Controller</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DinoController</span> <span class="token punctuation">{</span>\n\n    <span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">)</span>\n    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">dinoList</span><span class="token punctuation">(</span><span class="token class-name">Model</span> model<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token class-name">Dino</span> dinos <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Dino</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">&quot;alpha&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;red&quot;</span><span class="token punctuation">,</span> <span class="token number">50</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        model<span class="token punctuation">.</span><span class="token function">addAttribute</span><span class="token punctuation">(</span><span class="token string">&quot;dinos&quot;</span><span class="token punctuation">,</span> dinos<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">return</span> <span class="token string">&quot;index&quot;</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过我们的示例设置，我们可以将_Dino_实例注入到我们的模板文件中。</p><h3 id="_3-变量表达式" tabindex="-1"><a class="header-anchor" href="#_3-变量表达式"><span>3. 变量表达式</span></a></h3><p>变量表达式有助于将控制器中的数据注入到模板文件中。它将模型属性暴露给Web视图。</p><p>变量表达式的语法是美元符号和花括号的组合。我们的变量名称位于花括号内：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>${...}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>让我们将我们的_Dino_数据注入到模板文件中：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>`&lt;span th:text=&quot;${dinos.id}&quot;&gt;```&lt;/span&gt;``\n`&lt;span th:text=&quot;${dinos.name}&quot;&gt;```&lt;/span&gt;``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>条件语句和迭代也可以使用变量表达式：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>`&lt;!-- 用于迭代 --&gt;`\n`&lt;div th:each=&quot;dinos : ${dinos}&quot;&gt;`\n\n`&lt;!-- 在条件语句中 --&gt;`\n`&lt;div th:if=&quot;${dinos.id == 2}&quot;&gt;`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-选择表达式" tabindex="-1"><a class="header-anchor" href="#_4-选择表达式"><span>4. 选择表达式</span></a></h3><p>选择表达式操作在之前选择的对象上。它帮助我们选择所选对象的子对象。</p><p>选择表达式的语法是星号和花括号的组合。我们的子对象位于花括号内：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>*{...}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>让我们选择我们的_Dino_实例的_id_和_name_，并将它们注入到我们的模板文件中：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>`&lt;div th:object=&quot;${dinos}&quot;&gt;`\n    `&lt;p th:text=&quot;*{id}&quot;&gt;``````&lt;/p&gt;`````\n    `&lt;p th:text=&quot;*{name}&quot;&gt;``````&lt;/p&gt;`````\n```&lt;/div&gt;```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此外，选择表达式主要用于HTML表单中。它帮助将表单输入与模型属性绑定。</p><p>与变量表达式不同，不需要单独处理每个输入元素。以我们的Dino Web应用程序为例，让我们创建一个新的_Dino_实例并将其绑定到我们的模型属性：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>`&lt;form action=&quot;#&quot; th:action=&quot;@{/dino}&quot; th:object=&quot;${dinos}&quot; method=&quot;post&quot;&gt;`\n    ```&lt;p&gt;```Id: `&lt;input type=&quot;text&quot; th:field=&quot;*{id}&quot; /&gt;``````&lt;/p&gt;`````\n    ```&lt;p&gt;```Name: `&lt;input type=&quot;text&quot; th:field=&quot;*{name}&quot; /&gt;``````&lt;/p&gt;`````\n`&lt;/form&gt;`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-消息表达式" tabindex="-1"><a class="header-anchor" href="#_5-消息表达式"><span>5. 消息表达式</span></a></h3><p>这种表达式有助于将外部文本引入我们的模板文件。它也称为文本国际化。</p><p>我们的文本所在的外部来源可能是一个_.properties_文件。当它具有占位符时，这种表达式是动态的。</p><p>消息表达式的语法是井号和花括号的组合。我们的键位于花括号内：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>#{...}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>例如，假设我们想要在Dino Web应用程序的页面上显示特定的消息。我们可以将消息放在_messages.properties_文件中：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>welcome.message=welcome to Dino world.\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>要将欢迎消息绑定到我们视图模板，我们可以通过其键引用它：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>`&lt;h2 th:text=&quot;#{welcome.message}&quot;&gt;````&lt;/h2&gt;```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们可以通过在我们的外部文件中添加占位符来使消息表达式接受参数：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>dino.color=red is my favourite, mine is {0}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在我们的模板文件中，我们将引用消息并添加一个值到占位符：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>`&lt;h2 th:text=&quot;#{dino.color(&#39;blue&#39;)}&quot;&gt;````&lt;/h2&gt;```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>此外，我们可以通过将变量表达式注入为占位符的值来使我们的占位符动态化：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>`&lt;h2 th:text=&quot;#{dino.color(${dino.color})}&quot;&gt;````&lt;/h2&gt;```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这种表达式也称为国际化。它可以帮助我们适应不同的语言，以适应我们的Web应用程序。</p><h3 id="_6-链接表达式" tabindex="-1"><a class="header-anchor" href="#_6-链接表达式"><span>6. 链接表达式</span></a></h3><p>链接表达式在URL构建中是不可或缺的。这种表达式绑定到指定的URL。</p><p>链接表达式的语法是“at”符号和花括号的组合。我们的链接位于花括号内：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@{...}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>URL可以是绝对的或相对的。当使用链接表达式与绝对URL时，它绑定到以“<em>http(s)</em>”开头的完整URL：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>`&lt;a th:href=&quot;@{http://www.baeldung.com}&quot;&gt;` Baeldung Home````&lt;/a&gt;````\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>另一方面，相对链接绑定到我们的Web服务器的上下文。我们可以轻松地按照控制器中定义的方式在我们的模板文件中导航：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@RequestMapping(&quot;/create&quot;)\npublic String dinoCreate(Model model) {\n    model.addAttribute(&quot;dinos&quot;, new Dino());\n    return &quot;form&quot;;\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以按指定的_@RequestMapping_请求页面：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>`&lt;a th:href=&quot;@{/create}&quot;&gt;`Submit Another Dino````&lt;/a&gt;````\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>它可以通过对路径变量的参数进行传递。</strong> 假设我们想要提供链接以编辑现有实体。我们可以通过其_id_调用我们想要编辑的对象。链接表达式可以接受_id_作为参数：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>`&lt;a th:href=&quot;/@{&#39;/edit/&#39; + ${dino.id}}&quot;&gt;`Edit````&lt;/a&gt;````\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>链接表达式可以设置协议相对URL。协议相对类似于绝对URL。URL将使用HTTP或HTTPS协议方案，具体取决于服务器的协议：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>`&lt;a th:href=&quot;@{//baeldung.com}&quot;&gt;`Baeldung````&lt;/a&gt;````\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_7-片段表达式" tabindex="-1"><a class="header-anchor" href="#_7-片段表达式"><span>7. 片段表达式</span></a></h3><p>片段表达式可以帮助我们在模板文件之间移动标记。这种表达式使我们能够生成可移动的标记片段。</p><p>片段表达式的语法是波浪号和花括号的组合。我们的片段位于花括号内：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>~{...}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>对于我们的Dino Web应用程序，让我们在_index.html_文件中创建一个带有_fragment_属性的页脚：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>`&lt;div th:fragment=&quot;footer&quot;&gt;`\n    ```&lt;p&gt;```Copyright 2022`````&lt;/p&gt;`````\n```&lt;/div&gt;```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们现在可以将_footer_注入到其他模板文件中：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>`&lt;div th:replace=&quot;~{index :: footer}&quot;&gt;````&lt;/div&gt;```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_8-结论" tabindex="-1"><a class="header-anchor" href="#_8-结论"><span>8. 结论</span></a></h3><p>在本文中，我们查看了各种Thymeleaf简单表达式和示例。</p><p>如往常一样，示例的完整源代码可在GitHub上获得。</p>',66),l=[i];function d(o,p){return t(),a("div",null,l)}const u=e(s,[["render",d],["__file","2024-07-12-Expression Types in Thymeleaf.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-07-12/2024-07-12-Expression%20Types%20in%20Thymeleaf.html","title":"Thymeleaf中的表达式类型 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Thymeleaf"],"tag":["Template Engine","Expression Types"],"head":[["meta",{"name":"keywords","content":"Thymeleaf, Template Engine, Expression Types, Java"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-12/2024-07-12-Expression%20Types%20in%20Thymeleaf.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Thymeleaf中的表达式类型 | Baeldung"}],["meta",{"property":"og:description","content":"Thymeleaf中的表达式类型 | Baeldung Thymeleaf 是Java生态系统中流行的模板引擎。它帮助将控制器层的数据绑定到视图层。本教程将通过示例讨论Thymeleaf的表达式类型。 我们将使用名为Dino的简单Web应用程序作为示例。这是一个用于创建恐龙资料的简单Web应用程序。 首先，让我们为我们的恐龙创建一个模型类： 接下来，让..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-12T09:03:44.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Template Engine"}],["meta",{"property":"article:tag","content":"Expression Types"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-12T09:03:44.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Thymeleaf中的表达式类型 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-12T09:03:44.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Thymeleaf中的表达式类型 | Baeldung Thymeleaf 是Java生态系统中流行的模板引擎。它帮助将控制器层的数据绑定到视图层。本教程将通过示例讨论Thymeleaf的表达式类型。 我们将使用名为Dino的简单Web应用程序作为示例。这是一个用于创建恐龙资料的简单Web应用程序。 首先，让我们为我们的恐龙创建一个模型类： 接下来，让..."},"headers":[{"level":3,"title":"3. 变量表达式","slug":"_3-变量表达式","link":"#_3-变量表达式","children":[]},{"level":3,"title":"4. 选择表达式","slug":"_4-选择表达式","link":"#_4-选择表达式","children":[]},{"level":3,"title":"5. 消息表达式","slug":"_5-消息表达式","link":"#_5-消息表达式","children":[]},{"level":3,"title":"6. 链接表达式","slug":"_6-链接表达式","link":"#_6-链接表达式","children":[]},{"level":3,"title":"7. 片段表达式","slug":"_7-片段表达式","link":"#_7-片段表达式","children":[]},{"level":3,"title":"8. 结论","slug":"_8-结论","link":"#_8-结论","children":[]}],"git":{"createdTime":1720775024000,"updatedTime":1720775024000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.78,"words":1435},"filePathRelative":"posts/baeldung/2024-07-12/2024-07-12-Expression Types in Thymeleaf.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>Thymeleaf 是Java生态系统中流行的模板引擎。它帮助将控制器层的数据绑定到视图层。本教程将通过示例讨论Thymeleaf的表达式类型。</p>\\n<p>我们将使用名为Dino的简单Web应用程序作为示例。这是一个用于创建恐龙资料的简单Web应用程序。</p>\\n<p>首先，让我们为我们的恐龙创建一个模型类：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">Dino</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">private</span> <span class=\\"token keyword\\">int</span> id<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">private</span> <span class=\\"token class-name\\">String</span> name<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token comment\\">// 构造函数</span>\\n    <span class=\\"token comment\\">// getter和setter</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{u as comp,m as data};
