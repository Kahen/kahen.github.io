import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as t,a as l}from"./app-DzJ3ruqA.js";const n={},i=l(`<h1 id="postman中的变量指南" tabindex="-1"><a class="header-anchor" href="#postman中的变量指南"><span>Postman中的变量指南</span></a></h1><p>在Postman中，变量允许我们保存值并在不同API中按需使用它们。我们可以通过将它们传递到集合、环境或任何请求中来引用这些值。它基本上使我们能够更有效地使用这些变量来访问存储的值。我们还可以利用这些变量与多个团队成员协作或在Postman上设置动态工作流。</p><p>在本文中，我们将深入理解变量、它们的类型以及如何将它们嵌入到我们的API中。</p><h2 id="什么是变量" tabindex="-1"><a class="header-anchor" href="#什么是变量"><span>什么是变量？</span></a></h2><p>变量代表数据表示，让我们在需要的地方无需手动输入即可访问一个值。当我们需要在多个地方使用相同的值时，它们非常有用。一些实例包括基础URL、令牌和路径变量。此外，使用它们还使请求更加灵活，因为更改变量将自动在所有使用这些变量的地方进行更改。</p><p>我们可以在Postman中将变量定义为键值对。键定义了变量名称，允许我们直接使用此键访问它的值。</p><p>此外，我们还可以使用环境来设置一组变量。这些变量将根据环境的不同而具有不同的值。</p><p>让我们深入了解变量并理解不同的变量作用域。</p><h3 id="_2-1-变量作用域" tabindex="-1"><a class="header-anchor" href="#_2-1-变量作用域"><span>2.1 变量作用域</span></a></h3><p>有多个作用域让我们能够在不同的环境中处理API的开发和测试，具有不同的值。以下是从最广泛到最狭窄覆盖区域定义的变量作用域：</p><ul><li>全局变量：**这些在整个工作区中都是可访问的，在Postman中具有最广泛的作用域。**它们可以在工作区中的多个请求和集合中使用。</li><li>集合变量：**这些变量只在某个集合内部可访问。**它们在集合内的所有请求中都是可用的。此外，它们不会根据所选环境而改变。</li><li>环境变量：**这些变量让我们根据不同的环境来限定工作范围。**它们会随着我们正在工作的本地环境、暂存环境或生产环境的变化而变化。</li><li>数据变量：这些类型的变量是外部的，在运行集合时定义数据集的Collection Runner。我们可以从CSV或JSON文件中提取这些变量。<strong>它们具有当前值，在请求或集合执行后不会持久保存。</strong></li><li>本地变量：这些变量也称为**临时变量，仅在请求脚本中可访问。**它们的作用域仅到当前请求或集合。一旦执行完成，它们就不再可用。</li></ul><h3 id="_2-2-变量类型" tabindex="-1"><a class="header-anchor" href="#_2-2-变量类型"><span>2.2 变量类型</span></a></h3><p>全局和环境变量可以根据它们的类型进一步分类。以下是我们如何配置它们的方法：</p><ul><li>默认类型：默认情况下，变量是这些类型的。这些显示为纯文本，没有其他属性。</li><li>密文类型：这些变量隐藏了所有工作区的初始和当前值，类似于密码。它们让我们防止敏感数据的意外泄露。</li></ul><h2 id="定义具有作用域的变量" tabindex="-1"><a class="header-anchor" href="#定义具有作用域的变量"><span>定义具有作用域的变量</span></a></h2><p>正如我们上面讨论的，我们可以在多种类型和作用域中定义变量。<strong>我们可以在请求构建器中的任何作用域定义变量。</strong></p><p>首先，选择文本并点击_Set as a variable_。一旦完成，我们必须将其存储为一个新变量。然后，我们输入一个键值，并从Postman中可用的不同作用域中选择：</p><h3 id="_3-1-将响应体设置为变量" tabindex="-1"><a class="header-anchor" href="#_3-1-将响应体设置为变量"><span>3.1 将响应体设置为变量</span></a></h3><p><strong>请求的响应体中的值也可以设置为变量</strong>，并在集合中进一步使用。这有助于按顺序运行多个请求并创建特定流程。</p><p>首先，让我们选择我们想要保存的文本，然后按右键或Control-click按钮将其存储为变量。</p><p>一旦完成，我们必须从可能的选项中选择相关的作用域，即环境、本地或全局，并命名变量以保存它：</p><h3 id="_3-2-定义全局变量" tabindex="-1"><a class="header-anchor" href="#_3-2-定义全局变量"><span>3.2 定义全局变量</span></a></h3><p>让我们看看在Postman中设置全局变量的步骤：</p><ol><li>我们首先点击全局变量部分的_Add a new variable_，然后输入变量名称以直接将其存储为全局变量。</li><li>另一个选项是选择值并选择Global选项作为Type来存储变量。</li><li>一旦完成，我们不应该忘记标记<img src="https://assets.postman.com/postman-docs/icon-save.jpg#icon" alt="img" loading="lazy"> Save并确认更改。</li></ol><p>我们还可以通过以下步骤下载全局变量并与他人共享：</p><ol><li>首先，让我们进入Postman并选择sidebar中的Global环境类型。</li><li>然后，我们可以点击**_Export_按钮，这将把变量导出到一个文件。**</li><li>一旦文件准备好，我们可以通过点击系统的_Save_来存储文件，并按需共享。</li></ol><h3 id="_3-3-定义环境变量" tabindex="-1"><a class="header-anchor" href="#_3-3-定义环境变量"><span>3.3 定义环境变量</span></a></h3><p>我们可以按照以下步骤在Postman中保存环境变量：</p><ol><li>首先，我们点击_Add a new variable_，并输入变量名称。</li><li>在保存变量之前，我们可以<strong>选择环境作为变量类型。</strong></li><li>变量将需要指定初始值和当前值。</li><li>一旦完成，我们必须点击Save以确认更改。</li></ol><h3 id="_3-4-定义集合变量" tabindex="-1"><a class="header-anchor" href="#_3-4-定义集合变量"><span>3.4 定义集合变量</span></a></h3><p>Postman还提供了添加集合变量并按需使用它们的机会。</p><p>我们必须点击sidebar中的_Collections_。一旦完成，让我们选择_Variables_标签来存储集合变量：</p><h3 id="_3-5-在脚本中定义变量" tabindex="-1"><a class="header-anchor" href="#_3-5-在脚本中定义变量"><span>3.5 在脚本中定义变量</span></a></h3><p>与在集合、环境或全局中定义变量类似，我们也可以在我们的请求脚本中以编程方式设置变量。</p><p>所有这些方法都接受(<em>variable_key</em>, <em>variable_value</em>)作为输入：</p><ol><li><em>pm.globals</em>：<strong>这个方法用于在请求脚本中定义全局变量</strong>，例如，<em>pm.globals.set(&quot;variable_key&quot;, &quot;variable_value&quot;);</em></li><li><em>pm.collectionVariables</em>：我们可以使用这种方法定义<strong>作用域为‘collection’的变量</strong>，例如，<em>pm.collectionVariables.set(&quot;variable_key&quot;, &quot;variable_value&quot;);</em></li><li><em>pm.environment</em>：这可以用于<strong>定义作用域为当前环境的环境变量</strong>，例如，<em>pm.environment.set(&quot;variable_key&quot;, &quot;variable_value&quot;);</em></li><li><em>pm.variables</em>：<strong>这定义了具有本地/临时作用域的局部变量</strong>，例如，<em>pm.variables.set(&quot;variable_key&quot;, &quot;variable_value&quot;);</em></li><li><em>unset</em>：<strong>这个方法可以用来移除一个已设置的变量</strong>。Unset可以根据它们的范围与上述变量实例一起定义，例如，<em>pm.environment.unset(&quot;variable_key&quot;, &quot;variable_value&quot;);</em></li></ol><h3 id="_3-6-在脚本中使用变量" tabindex="-1"><a class="header-anchor" href="#_3-6-在脚本中使用变量"><span>3.6 在脚本中使用变量</span></a></h3><p>我们已经使用上述方法在脚本中存储了变量。因此，我们可以使用这些方法检索它们的当前值：</p><ol><li><em>pm.variables.get(&quot;variable_key&quot;)</em>：这将在任何作用域中访问变量，包括本地。</li><li><em>pm.globals.get(&quot;variable_key&quot;)</em>：这可以访问全局变量</li><li><em>pm.collectionVariables.get(&quot;variable_key&quot;)</em>：这可以访问集合变量。</li><li><em>pm.environment.get(&quot;variable_key&quot;)</em>：这可以访问环境变量。</li></ol><p>在这里，我们可以使用_variable_key_检索值。对象表示作用域级别，而_get()_方法检索值。</p><p>_pm.variables.get()_方法还提供了更改变量作用域的选项，而不影响脚本的功能。它返回当前具有最高优先级的变量。</p><h2 id="使用变量" tabindex="-1"><a class="header-anchor" href="#使用变量"><span>使用变量</span></a></h2><p>现在，我们已经定义了不同的变量作用域，并学习了如何在Postman中存储它们。让我们看看如何在请求路径和正文中使用这些变量。</p><p>**要在Postman中引用变量，我们应该在变量名称周围使用双花括号。**它会自动从定义的不同变量中获取值。这是Postman中的标准，不依赖于变量类型和作用域：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>{{studentName}}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>此外，运行CURL或点击请求解析变量，并使用当前值更新变量。以下请求URL引用了变量：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>http://localhost:8080/get?student_name={{studentName}}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>假设_studentName_是“John”。Postman从其变量中检索值，并发送当前存储的任何值。因此，在Postman上点击上述请求时，它自动转换为请求：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>http://localhost:8080/get?student_name=John
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="结论" tabindex="-1"><a class="header-anchor" href="#结论"><span>结论</span></a></h2><p>在本教程中，<strong>我们使用Postman变量进行了基本初始化，使用了GUI模式。</strong></p><p>此外，我们了解了它们的类型和作用域。我们还查看了它们可以在不同地方初始化，例如URI、请求正文和标题。显然，这让我们通过不必多次初始化相同的值来节省时间和空间。</p>`,52),s=[i];function o(r,p){return t(),a("div",null,s)}const c=e(n,[["render",o],["__file","2024-07-14-A Guide to Variables in Postman.html.vue"]]),h=JSON.parse('{"path":"/posts/baeldung/2024-07-14/2024-07-14-A%20Guide%20to%20Variables%20in%20Postman.html","title":"Postman中的变量指南","lang":"zh-CN","frontmatter":{"date":"2022-10-03T00:00:00.000Z","category":["Postman","API"],"tag":["Variables","Postman"],"head":[["meta",{"name":"keywords","content":"Postman, Variables, API"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-14/2024-07-14-A%20Guide%20to%20Variables%20in%20Postman.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Postman中的变量指南"}],["meta",{"property":"og:description","content":"Postman中的变量指南 在Postman中，变量允许我们保存值并在不同API中按需使用它们。我们可以通过将它们传递到集合、环境或任何请求中来引用这些值。它基本上使我们能够更有效地使用这些变量来访问存储的值。我们还可以利用这些变量与多个团队成员协作或在Postman上设置动态工作流。 在本文中，我们将深入理解变量、它们的类型以及如何将它们嵌入到我们的..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://assets.postman.com/postman-docs/icon-save.jpg#icon"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-14T04:05:23.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Variables"}],["meta",{"property":"article:tag","content":"Postman"}],["meta",{"property":"article:published_time","content":"2022-10-03T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-14T04:05:23.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Postman中的变量指南\\",\\"image\\":[\\"https://assets.postman.com/postman-docs/icon-save.jpg#icon\\"],\\"datePublished\\":\\"2022-10-03T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-14T04:05:23.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Postman中的变量指南 在Postman中，变量允许我们保存值并在不同API中按需使用它们。我们可以通过将它们传递到集合、环境或任何请求中来引用这些值。它基本上使我们能够更有效地使用这些变量来访问存储的值。我们还可以利用这些变量与多个团队成员协作或在Postman上设置动态工作流。 在本文中，我们将深入理解变量、它们的类型以及如何将它们嵌入到我们的..."},"headers":[{"level":2,"title":"什么是变量？","slug":"什么是变量","link":"#什么是变量","children":[{"level":3,"title":"2.1 变量作用域","slug":"_2-1-变量作用域","link":"#_2-1-变量作用域","children":[]},{"level":3,"title":"2.2 变量类型","slug":"_2-2-变量类型","link":"#_2-2-变量类型","children":[]}]},{"level":2,"title":"定义具有作用域的变量","slug":"定义具有作用域的变量","link":"#定义具有作用域的变量","children":[{"level":3,"title":"3.1 将响应体设置为变量","slug":"_3-1-将响应体设置为变量","link":"#_3-1-将响应体设置为变量","children":[]},{"level":3,"title":"3.2 定义全局变量","slug":"_3-2-定义全局变量","link":"#_3-2-定义全局变量","children":[]},{"level":3,"title":"3.3 定义环境变量","slug":"_3-3-定义环境变量","link":"#_3-3-定义环境变量","children":[]},{"level":3,"title":"3.4 定义集合变量","slug":"_3-4-定义集合变量","link":"#_3-4-定义集合变量","children":[]},{"level":3,"title":"3.5 在脚本中定义变量","slug":"_3-5-在脚本中定义变量","link":"#_3-5-在脚本中定义变量","children":[]},{"level":3,"title":"3.6 在脚本中使用变量","slug":"_3-6-在脚本中使用变量","link":"#_3-6-在脚本中使用变量","children":[]}]},{"level":2,"title":"使用变量","slug":"使用变量","link":"#使用变量","children":[]},{"level":2,"title":"结论","slug":"结论","link":"#结论","children":[]}],"git":{"createdTime":1720929923000,"updatedTime":1720929923000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":7.15,"words":2144},"filePathRelative":"posts/baeldung/2024-07-14/2024-07-14-A Guide to Variables in Postman.md","localizedDate":"2022年10月3日","excerpt":"\\n<p>在Postman中，变量允许我们保存值并在不同API中按需使用它们。我们可以通过将它们传递到集合、环境或任何请求中来引用这些值。它基本上使我们能够更有效地使用这些变量来访问存储的值。我们还可以利用这些变量与多个团队成员协作或在Postman上设置动态工作流。</p>\\n<p>在本文中，我们将深入理解变量、它们的类型以及如何将它们嵌入到我们的API中。</p>\\n<h2>什么是变量？</h2>\\n<p>变量代表数据表示，让我们在需要的地方无需手动输入即可访问一个值。当我们需要在多个地方使用相同的值时，它们非常有用。一些实例包括基础URL、令牌和路径变量。此外，使用它们还使请求更加灵活，因为更改变量将自动在所有使用这些变量的地方进行更改。</p>","autoDesc":true}');export{c as comp,h as data};
