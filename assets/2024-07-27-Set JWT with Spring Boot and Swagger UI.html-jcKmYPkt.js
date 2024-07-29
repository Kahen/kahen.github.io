import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-BUAgDejY.js";const p={},e=t('<h1 id="使用spring-boot和swagger-ui设置jwt" tabindex="-1"><a class="header-anchor" href="#使用spring-boot和swagger-ui设置jwt"><span>使用Spring Boot和Swagger UI设置JWT</span></a></h1><p>在本简短教程中，我们将了解如何配置Swagger UI以在调用我们的API时包含JSON Web Token（JWT）。</p><h2 id="_2-maven依赖项" tabindex="-1"><a class="header-anchor" href="#_2-maven依赖项"><span>2. Maven依赖项</span></a></h2><p>在这个例子中，我们将使用springdoc-openapi-ui，它包含了开始使用Swagger和Swagger UI所需的所有依赖项。让我们将其添加到我们的_pom.xml_文件中：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>``org.springframework.boot``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>``spring-boot-starter-web``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>``\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>``org.springdoc``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>``springdoc-openapi-ui``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>``\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>`1.7.0`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>`\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-swagger配置" tabindex="-1"><a class="header-anchor" href="#_3-swagger配置"><span>3. Swagger配置</span></a></h2><p>首先，我们需要配置JWT的_SecurityScheme_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token class-name">SecurityScheme</span> <span class="token function">createAPIKeyScheme</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">SecurityScheme</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">type</span><span class="token punctuation">(</span><span class="token class-name">SecurityScheme<span class="token punctuation">.</span>Type</span><span class="token punctuation">.</span><span class="token constant">HTTP</span><span class="token punctuation">)</span>\n        <span class="token punctuation">.</span><span class="token function">bearerFormat</span><span class="token punctuation">(</span><span class="token string">&quot;JWT&quot;</span><span class="token punctuation">)</span>\n        <span class="token punctuation">.</span><span class="token function">scheme</span><span class="token punctuation">(</span><span class="token string">&quot;bearer&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，我们配置我们的OpenAPI bean以包括API信息和安全方案：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Bean</span>\n<span class="token keyword">public</span> <span class="token class-name">OpenAPI</span> <span class="token function">openAPI</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">OpenAPI</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">addSecurityItem</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">SecurityRequirement</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n        <span class="token punctuation">.</span><span class="token function">addList</span><span class="token punctuation">(</span><span class="token string">&quot;Bearer Authentication&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n    <span class="token punctuation">.</span><span class="token function">components</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Components</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>addSecuritySchemes\n    <span class="token punctuation">(</span><span class="token string">&quot;Bearer Authentication&quot;</span><span class="token punctuation">,</span> <span class="token function">createAPIKeyScheme</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n    <span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Info</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">title</span><span class="token punctuation">(</span><span class="token string">&quot;My REST API&quot;</span><span class="token punctuation">)</span>\n        <span class="token punctuation">.</span><span class="token function">description</span><span class="token punctuation">(</span><span class="token string">&quot;Some custom description of API.&quot;</span><span class="token punctuation">)</span>\n        <span class="token punctuation">.</span><span class="token function">version</span><span class="token punctuation">(</span><span class="token string">&quot;1.0&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">contact</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Contact</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">name</span><span class="token punctuation">(</span><span class="token string">&quot;Sallo Szrajbman&quot;</span><span class="token punctuation">)</span>\n            <span class="token punctuation">.</span><span class="token function">email</span><span class="token punctuation">(</span><span class="token string">&quot;www.baeldung.com&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">url</span><span class="token punctuation">(</span><span class="token string">&quot;salloszraj@gmail.com&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n        <span class="token punctuation">.</span><span class="token function">license</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">License</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">name</span><span class="token punctuation">(</span><span class="token string">&quot;License of API&quot;</span><span class="token punctuation">)</span>\n            <span class="token punctuation">.</span><span class="token function">url</span><span class="token punctuation">(</span><span class="token string">&quot;API license URL&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-rest控制器" tabindex="-1"><a class="header-anchor" href="#_4-rest控制器"><span>4. REST控制器</span></a></h2><p>在我们的_ClientsRestController_中，让我们编写一个简单的_getClients_端点以返回客户端列表：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@RestController</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;/clients&quot;</span><span class="token punctuation">)</span>\n<span class="token annotation punctuation">@Tag</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;Clients&quot;</span><span class="token punctuation">)</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ClientsRestController</span> <span class="token punctuation">{</span>\n\n    <span class="token annotation punctuation">@Operation</span><span class="token punctuation">(</span>summary <span class="token operator">=</span> <span class="token string">&quot;This method is used to get the clients.&quot;</span><span class="token punctuation">)</span>\n    <span class="token annotation punctuation">@GetMapping</span>\n    <span class="token keyword">public</span> <span class="token class-name">List</span>`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>` <span class="token function">getClients</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token string">&quot;First Client&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Second Client&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当我们启动应用程序时，我们可以在_http://localhost:8080/swagger-ui.html_ URL访问Swagger UI。</p><p>这是Swagger UI带有_Authorize_按钮的样子：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2020/10/swaggerui-1024x516-1.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>当我们点击Authorize按钮时，Swagger UI将要求输入JWT。</p><p>我们需要输入我们的令牌并点击Authorize，从那时起，所有对我们API的请求将自动在HTTP头中包含令牌：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2020/10/swagger-authorize-1024x499-1.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h2 id="_6-带有jwt的api请求" tabindex="-1"><a class="header-anchor" href="#_6-带有jwt的api请求"><span>6. 带有JWT的API请求</span></a></h2><p>当我们向我们的API发送请求时，我们可以看到有一个带有我们令牌值的“Authorization”头：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2020/10/swagger-get-clients-1024x556-1.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h2 id="_7-结论" tabindex="-1"><a class="header-anchor" href="#_7-结论"><span>7. 结论</span></a></h2><p>在本文中，我们看到了Swagger UI如何提供自定义配置来设置JWT，这在处理应用程序授权时可能很有帮助。在Swagger UI中授权后，所有请求将自动包含我们的JWT。</p><p>本文的源代码可在GitHub上获得。</p>',25),o=[e];function c(i,l){return s(),a("div",null,o)}const g=n(p,[["render",c],["__file","2024-07-27-Set JWT with Spring Boot and Swagger UI.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-27/2024-07-27-Set%20JWT%20with%20Spring%20Boot%20and%20Swagger%20UI.html","title":"使用Spring Boot和Swagger UI设置JWT","lang":"zh-CN","frontmatter":{"date":"2020-10-01T00:00:00.000Z","category":["Spring Boot","Swagger UI"],"tag":["JWT","API","Security"],"head":[["meta",{"name":"keywords","content":"Spring Boot, Swagger UI, JWT, API, Security"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-27/2024-07-27-Set%20JWT%20with%20Spring%20Boot%20and%20Swagger%20UI.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用Spring Boot和Swagger UI设置JWT"}],["meta",{"property":"og:description","content":"使用Spring Boot和Swagger UI设置JWT 在本简短教程中，我们将了解如何配置Swagger UI以在调用我们的API时包含JSON Web Token（JWT）。 2. Maven依赖项 在这个例子中，我们将使用springdoc-openapi-ui，它包含了开始使用Swagger和Swagger UI所需的所有依赖项。让我们将其添..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2020/10/swaggerui-1024x516-1.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-27T22:58:33.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"JWT"}],["meta",{"property":"article:tag","content":"API"}],["meta",{"property":"article:tag","content":"Security"}],["meta",{"property":"article:published_time","content":"2020-10-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-27T22:58:33.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用Spring Boot和Swagger UI设置JWT\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2020/10/swaggerui-1024x516-1.png\\",\\"https://www.baeldung.com/wp-content/uploads/2020/10/swagger-authorize-1024x499-1.png\\",\\"https://www.baeldung.com/wp-content/uploads/2020/10/swagger-get-clients-1024x556-1.png\\"],\\"datePublished\\":\\"2020-10-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-27T22:58:33.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用Spring Boot和Swagger UI设置JWT 在本简短教程中，我们将了解如何配置Swagger UI以在调用我们的API时包含JSON Web Token（JWT）。 2. Maven依赖项 在这个例子中，我们将使用springdoc-openapi-ui，它包含了开始使用Swagger和Swagger UI所需的所有依赖项。让我们将其添..."},"headers":[{"level":2,"title":"2. Maven依赖项","slug":"_2-maven依赖项","link":"#_2-maven依赖项","children":[]},{"level":2,"title":"3. Swagger配置","slug":"_3-swagger配置","link":"#_3-swagger配置","children":[]},{"level":2,"title":"4. REST控制器","slug":"_4-rest控制器","link":"#_4-rest控制器","children":[]},{"level":2,"title":"6. 带有JWT的API请求","slug":"_6-带有jwt的api请求","link":"#_6-带有jwt的api请求","children":[]},{"level":2,"title":"7. 结论","slug":"_7-结论","link":"#_7-结论","children":[]}],"git":{"createdTime":1722121113000,"updatedTime":1722121113000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":1.82,"words":546},"filePathRelative":"posts/baeldung/2024-07-27/2024-07-27-Set JWT with Spring Boot and Swagger UI.md","localizedDate":"2020年10月1日","excerpt":"\\n<p>在本简短教程中，我们将了解如何配置Swagger UI以在调用我们的API时包含JSON Web Token（JWT）。</p>\\n<h2>2. Maven依赖项</h2>\\n<p>在这个例子中，我们将使用springdoc-openapi-ui，它包含了开始使用Swagger和Swagger UI所需的所有依赖项。让我们将其添加到我们的_pom.xml_文件中：</p>\\n<div class=\\"language-xml\\" data-ext=\\"xml\\" data-title=\\"xml\\"><pre class=\\"language-xml\\"><code>``<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>dependency</span><span class=\\"token punctuation\\">&gt;</span></span>``\\n    ``<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>groupId</span><span class=\\"token punctuation\\">&gt;</span></span>``org.springframework.boot``<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>groupId</span><span class=\\"token punctuation\\">&gt;</span></span>``\\n    ``<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>artifactId</span><span class=\\"token punctuation\\">&gt;</span></span>``spring-boot-starter-web``<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>artifactId</span><span class=\\"token punctuation\\">&gt;</span></span>``\\n``<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>dependency</span><span class=\\"token punctuation\\">&gt;</span></span>``\\n``<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>dependency</span><span class=\\"token punctuation\\">&gt;</span></span>``\\n    ``<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>groupId</span><span class=\\"token punctuation\\">&gt;</span></span>``org.springdoc``<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>groupId</span><span class=\\"token punctuation\\">&gt;</span></span>``\\n    ``<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>artifactId</span><span class=\\"token punctuation\\">&gt;</span></span>``springdoc-openapi-ui``<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>artifactId</span><span class=\\"token punctuation\\">&gt;</span></span>``\\n    `<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>version</span><span class=\\"token punctuation\\">&gt;</span></span>`1.7.0`<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>version</span><span class=\\"token punctuation\\">&gt;</span></span>`\\n``<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>dependency</span><span class=\\"token punctuation\\">&gt;</span></span>``\\n</code></pre></div>","autoDesc":true}');export{g as comp,k as data};
