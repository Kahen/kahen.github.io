import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as n,a as t}from"./app-C3EhKTFl.js";const e={},p=t('<h1 id="在jsp中读取javascript变量的概述" tabindex="-1"><a class="header-anchor" href="#在jsp中读取javascript变量的概述"><span>在JSP中读取JavaScript变量的概述</span></a></h1><p>当使用JSP开发Web应用程序时，经常需要将数据从服务器端的JSP传递到客户端的JavaScript。这允许在客户端进行动态交互和自定义。</p><p>在本教程中，我们将探讨从JavaScript访问JSP变量的不同方法。</p><h2 id="_2-设置" tabindex="-1"><a class="header-anchor" href="#_2-设置"><span>2. 设置</span></a></h2><p>在我们开始之前，我们需要设置我们的环境以包含JSTL库，以支持在我们的JSP页面中使用JSTL标签：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>``javax.servlet``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>``jstl``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>``1.2``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>``\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们需要commons-text库来处理文本操作，包括转义JavaScript语句：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>``org.apache.commons``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>``commons-text``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>``1.10.0``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>``\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-转换为javascript变量" tabindex="-1"><a class="header-anchor" href="#_3-转换为javascript变量"><span>3. 转换为JavaScript变量</span></a></h2><p>让我们首先考虑一个场景，我们有一个JSP变量，并希望将其嵌入为JavaScript变量：</p><div class="language-jsp line-numbers-mode" data-ext="jsp" data-title="jsp"><pre class="language-jsp"><code>`&lt;%\n    String jspMsg = StringEscapeUtils.escapeEcmaScript(&quot;Hello! This is Sam&#39;s page.&quot;);\n    request.setAttribute(&quot;scopedMsg&quot;, jspMsg);\n%&gt;`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为了正确处理JavaScript字面量，我们使用commons-text库中的_StringEscapeUtils.escapeEcmaScript()_方法进行消毒。这个方法帮助我们转义任何可能在将变量嵌入JavaScript语句时引起问题的单引号或双引号字符。</p><p>如果我们忽略了转义这些字符，可能会导致由于语法冲突而出现JavaScript错误。<strong>JavaScript将单引号和双引号视为特殊字符，这些字符可能会破坏JavaScript语句的结构。因此，转义它们以确保JavaScript代码保持完整至关重要。</strong></p><p>在这个例子中，我们的目标是将JSP变量_jspMsg_转换为JavaScript变量_jsMsg_，以便我们可以在客户端访问JSP变量：</p><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">&lt;script type=&quot;text/javascript&quot;&gt;</span><span class="token template-punctuation string">`</span></span>\n    <span class="token keyword">var</span> jsMsg <span class="token operator">=</span> <span class="token comment">// 转换实现在这里</span>\n    console<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span>jsMsg<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">&lt;/script&gt;</span><span class="token template-punctuation string">`</span></span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们期望在浏览器控制台中看到消息“<em>Hello! This is Sam’s page.</em>”。接下来，让我们探索我们可以应用的转换的不同方法。</p><h3 id="_3-1-使用jsp表达式标签" tabindex="-1"><a class="header-anchor" href="#_3-1-使用jsp表达式标签"><span>3.1. 使用JSP表达式标签</span></a></h3><p>将JSP变量转换为JavaScript变量的最简单方法是使用JSP表达式标签_<code>&lt;%= %&gt;</code>_。我们可以直接在JavaScript代码中嵌入JSP变量：</p><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">var</span> jsMsg <span class="token operator">=</span> <span class="token string">&#39;`&lt;%=jspMsg%&gt;`&#39;</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>当处理作用域变量，例如存储在_request_作用域中的变量时，我们可以使用隐式_request_对象检索属性：</p><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">var</span> jsMsg <span class="token operator">=</span> <span class="token string">&#39;`&lt;%=request.getAttribute(&quot;jspMsg&quot;)%&gt;`&#39;</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_3-2-使用jstl" tabindex="-1"><a class="header-anchor" href="#_3-2-使用jstl"><span>3.2. 使用JSTL</span></a></h3><p>JSTL只能访问作用域变量。我们将使用JSTL的_<code>&lt;c:out&gt;</code>_标签将作用域变量转换为JavaScript使用：</p><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">var</span> jsMsg <span class="token operator">=</span> <span class="token string">&#39;`&lt;c:out value=&quot;${scopedMsg}&quot; scope=&quot;request&quot; escapeXml=&quot;false&quot;/&gt;`&#39;</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>_scope_属性是可选的，但在处理不同作用域中的重复变量名称时很有用。它指示JSTL从指定的作用域中获取变量。</p><p><strong>如果未指定作用域，JSTL按照_page_, <em>request</em>, <em>session</em>, 和 _application_作用域的顺序获取作用域变量。</strong> 明确指定标签中的作用域通常是一个好的实践。</p><p><em>escapeXml_属性控制是否应该为XML/HTML实体转义值。由于我们正在将其转换为JavaScript而不是HTML，我们将此属性设置为_false</em>。</p><h3 id="_3-3-使用jsp表达式语言-el" tabindex="-1"><a class="header-anchor" href="#_3-3-使用jsp表达式语言-el"><span>3.3. 使用JSP表达式语言（EL）</span></a></h3><p>使用与前一节相同的作用域变量，我们可以通过使用EL简化语句：</p><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">var</span> jsMsg <span class="token operator">=</span> <span class="token string">&#39;${jspName}&#39;</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们可以看到，在前面的语句中没有提供作用域，因为这是最简单的形式。在不指定作用域的情况下获取顺序与我们在JSTL中描述的相同。如果我们想明确指定作用域，我们可以在变量名称前加上EL隐式作用域对象：</p><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">var</span> jsMsg <span class="token operator">=</span> <span class="token string">&#39;${requestScope.jspName}&#39;</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_4-转换为html" tabindex="-1"><a class="header-anchor" href="#_4-转换为html"><span>4. 转换为HTML</span></a></h2><p>有时，我们可能想要将包含HTML标签的JSP变量转换为实际的HTML标签表示，以便向用户显示：</p><div class="language-jsp line-numbers-mode" data-ext="jsp" data-title="jsp"><pre class="language-jsp"><code>`&lt;% request.setAttribute(&quot;jspTag&quot;, &quot;&lt;h1&gt;`Hello`&lt;/h1&gt;`&quot;); %&gt;\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在这个例子中，我们将在_<code>&lt;div&gt;</code>_标签内将JSP变量转换为HTML内容。我们将使用之前的JSP表达式标签来显示HTML标签：</p><div class="language-html line-numbers-mode" data-ext="html" data-title="html"><pre class="language-html"><code>`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>fromJspTag<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>``&lt;%=jspTag%&gt;``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>一旦JSP变量被转换为HTML标签，我们就可以使用JavaScript访问其内容。我们可以简单地使用JavaScript作为DOM元素访问内容：</p><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">var</span> tagContent <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&quot;fromJspTag&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>innerHTML<span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们探讨了从JavaScript访问JSP变量的不同技术。<strong>我们讨论了使用JSP表达式、JSTL标签和JSP表达式语言（EL）来转换和访问变量。</strong></p><p><strong>在将JSP变量转换为JavaScript变量之前对其进行消毒非常重要。</strong> 此外，我们还简要讨论了动态地将变量转换为HTML标签。</p><p>通过了解这些方法，我们可以有效地将数据从JSP传递到JavaScript，实现动态和交互式的Web应用程序开发。</p><p>像往常一样，所有的源代码都可以在GitHub上找到。</p>',44),c=[p];function l(i,o){return n(),s("div",null,c)}const d=a(e,[["render",l],["__file","2024-07-03-Reading a JSP Variable From JavaScript.html.vue"]]),g=JSON.parse('{"path":"/posts/baeldung/2024-07-03/2024-07-03-Reading%20a%20JSP%20Variable%20From%20JavaScript.html","title":"在JSP中读取JavaScript变量的概述","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["JSP","JavaScript"],"tag":["JSP","JavaScript","Web开发"],"head":[["meta",{"name":"keywords","content":"JSP, JavaScript, 变量, 交互, Web应用"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-03/2024-07-03-Reading%20a%20JSP%20Variable%20From%20JavaScript.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在JSP中读取JavaScript变量的概述"}],["meta",{"property":"og:description","content":"在JSP中读取JavaScript变量的概述 当使用JSP开发Web应用程序时，经常需要将数据从服务器端的JSP传递到客户端的JavaScript。这允许在客户端进行动态交互和自定义。 在本教程中，我们将探讨从JavaScript访问JSP变量的不同方法。 2. 设置 在我们开始之前，我们需要设置我们的环境以包含JSTL库，以支持在我们的JSP页面中使..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-03T10:55:28.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"JSP"}],["meta",{"property":"article:tag","content":"JavaScript"}],["meta",{"property":"article:tag","content":"Web开发"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-03T10:55:28.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在JSP中读取JavaScript变量的概述\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-03T10:55:28.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在JSP中读取JavaScript变量的概述 当使用JSP开发Web应用程序时，经常需要将数据从服务器端的JSP传递到客户端的JavaScript。这允许在客户端进行动态交互和自定义。 在本教程中，我们将探讨从JavaScript访问JSP变量的不同方法。 2. 设置 在我们开始之前，我们需要设置我们的环境以包含JSTL库，以支持在我们的JSP页面中使..."},"headers":[{"level":2,"title":"2. 设置","slug":"_2-设置","link":"#_2-设置","children":[]},{"level":2,"title":"3. 转换为JavaScript变量","slug":"_3-转换为javascript变量","link":"#_3-转换为javascript变量","children":[{"level":3,"title":"3.1. 使用JSP表达式标签","slug":"_3-1-使用jsp表达式标签","link":"#_3-1-使用jsp表达式标签","children":[]},{"level":3,"title":"3.2. 使用JSTL","slug":"_3-2-使用jstl","link":"#_3-2-使用jstl","children":[]},{"level":3,"title":"3.3. 使用JSP表达式语言（EL）","slug":"_3-3-使用jsp表达式语言-el","link":"#_3-3-使用jsp表达式语言-el","children":[]}]},{"level":2,"title":"4. 转换为HTML","slug":"_4-转换为html","link":"#_4-转换为html","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720004128000,"updatedTime":1720004128000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.06,"words":1218},"filePathRelative":"posts/baeldung/2024-07-03/2024-07-03-Reading a JSP Variable From JavaScript.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>当使用JSP开发Web应用程序时，经常需要将数据从服务器端的JSP传递到客户端的JavaScript。这允许在客户端进行动态交互和自定义。</p>\\n<p>在本教程中，我们将探讨从JavaScript访问JSP变量的不同方法。</p>\\n<h2>2. 设置</h2>\\n<p>在我们开始之前，我们需要设置我们的环境以包含JSTL库，以支持在我们的JSP页面中使用JSTL标签：</p>\\n<div class=\\"language-xml\\" data-ext=\\"xml\\" data-title=\\"xml\\"><pre class=\\"language-xml\\"><code>``<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>dependency</span><span class=\\"token punctuation\\">&gt;</span></span>``\\n    ``<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>groupId</span><span class=\\"token punctuation\\">&gt;</span></span>``javax.servlet``<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>groupId</span><span class=\\"token punctuation\\">&gt;</span></span>``\\n    ``<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>artifactId</span><span class=\\"token punctuation\\">&gt;</span></span>``jstl``<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>artifactId</span><span class=\\"token punctuation\\">&gt;</span></span>``\\n    ``<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>version</span><span class=\\"token punctuation\\">&gt;</span></span>``1.2``<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>version</span><span class=\\"token punctuation\\">&gt;</span></span>``\\n``<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>dependency</span><span class=\\"token punctuation\\">&gt;</span></span>``\\n</code></pre></div>","autoDesc":true}');export{d as comp,g as data};
