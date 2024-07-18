import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-c243dxVF.js";const e={},p=t('<hr><h1 id="spring-mvc-–-将根url映射到页面" tabindex="-1"><a class="header-anchor" href="#spring-mvc-–-将根url映射到页面"><span>Spring MVC – 将根URL映射到页面</span></a></h1><p>本教程将展示如何在Spring MVC中将根URL映射到一个页面。</p><p>首先，我们将查看Spring MVC的默认行为。然后，我们将讨论这种行为被抑制的场景。最后，我们将学习提供自定义映射的方法。</p><h2 id="_2-项目设置" tabindex="-1"><a class="header-anchor" href="#_2-项目设置"><span>2. 项目设置</span></a></h2><p>我们可以使用Spring Initializr生成项目，并添加Spring Web Starter依赖。</p><p>如果手动添加依赖，我们需要在_pom.xml_文件中添加以下内容：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>`org.springframework.boot`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>`spring-boot-starter-web`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>`\n`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-1-创建索引页面" tabindex="-1"><a class="header-anchor" href="#_2-1-创建索引页面"><span>2.1. 创建索引页面</span></a></h3><p>让我们在_src/main/resources/templates_文件夹中创建一个页面。我们将这个页面命名为_index.html_：</p><div class="language-html line-numbers-mode" data-ext="html" data-title="html"><pre class="language-html"><code>`<span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">&gt;</span></span>`\n`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>en<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>`\n`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>UTF-8<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">&gt;</span></span>`索引页面`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">&gt;</span></span>`\n`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">&gt;</span></span>`\n`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">&gt;</span></span>`你好，世界！`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">&gt;</span></span>`\n`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">&gt;</span></span>`\n`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">&gt;</span></span>`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-默认行为" tabindex="-1"><a class="header-anchor" href="#_2-2-默认行为"><span>2.2. 默认行为</span></a></h3><p>让我们运行应用程序并查看Spring MVC的默认行为。</p><p>一旦应用程序启动并运行，让我们导航到根URL：<em>http://localhost:8080/</em>：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/01/index-page-e1673539470769.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>如我们所见，索引页面在没有任何映射需求的情况下显示。</p><h2 id="_3-更改默认行为" tabindex="-1"><a class="header-anchor" href="#_3-更改默认行为"><span>3. 更改默认行为</span></a></h2><p>让我们看看默认行为被抑制的场景。</p><h3 id="_3-1-enablewebmvc" tabindex="-1"><a class="header-anchor" href="#_3-1-enablewebmvc"><span>3.1. @EnableWebMvc</span></a></h3><p>让我们在_RootMappingApplication_类中添加_@EnableWebMvc_注解：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@SpringBootApplication</span>\n<span class="token annotation punctuation">@EnableWebMvc</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RootMappingApplication</span> <span class="token punctuation">{</span>\n    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token class-name">SpringApplication</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">RootMappingApplication</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们运行应用程序并导航到根URL：<em>http://localhost:8080/</em>。这次，我们得到了一个错误：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/01/404-error-page-1-e1673539498205.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p><strong>这是因为_@EnableWebMvc_注解禁用了Spring Boot自动进行的Web应用程序配置。</strong></p><p>为了解决这个问题，我们需要提供我们自己的自定义映射。让我们看看不同的方法。</p><h2 id="_4-自定义映射" tabindex="-1"><a class="header-anchor" href="#_4-自定义映射"><span>4. 自定义映射</span></a></h2><p>让我们看看提供自定义映射的不同方法。</p><h3 id="_4-1-使用控制器" tabindex="-1"><a class="header-anchor" href="#_4-1-使用控制器"><span>4.1. 使用控制器</span></a></h3><p>一种提供路径和文件映射的方法是使用控制器。</p><p>让我们先创建一个控制器类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Controller</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RootController</span> <span class="token punctuation">{</span>\n    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">)</span>\n    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">index</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token string">&quot;index&quot;</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个控制器类有一个映射到“/”路径的单个方法。该方法简单地返回字符串“<em>index</em>”。<strong>在解释返回值时，Spring MVC会在_src/main/resources/templates_文件夹中查找同名的模板。</strong></p><p>如果我们运行应用程序并导航到根URL：<em>http://localhost:8080/</em>，我们将看到索引页面被显示。</p><p>这是一种提供自定义映射的简单方法。当我们只有一个页面需要映射时，使用这种方法是很好的。然而，如果我们有多个页面需要映射，这种方法可能会变得繁琐。</p><p>让我们看看一种更有效的提供自定义映射的方法。</p><h3 id="_4-2-使用-webmvcconfigurer" tabindex="-1"><a class="header-anchor" href="#_4-2-使用-webmvcconfigurer"><span>4.2. 使用_WebMvcConfigurer_</span></a></h3><p>另一种提供路径和文件映射的方法是使用_WebMvcConfigurer_接口。</p><p>让我们先创建一个配置类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">WebConfig</span> <span class="token keyword">implements</span> <span class="token class-name">WebMvcConfigurer</span> <span class="token punctuation">{</span>\n    <span class="token annotation punctuation">@Override</span>\n    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">addViewControllers</span><span class="token punctuation">(</span><span class="token class-name">ViewControllerRegistry</span> registry<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        registry<span class="token punctuation">.</span><span class="token function">addViewController</span><span class="token punctuation">(</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setViewName</span><span class="token punctuation">(</span><span class="token string">&quot;index&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个配置类实现了_WebMvcConfigurer_接口。<strong>它覆盖了_addViewControllers()_方法以添加一个视图控制器。视图控制器映射到“/”路径并返回“<em>index</em>”视图。</strong></p><p>再次，如果我们运行应用程序并导航到根URL：<em>http://localhost:8080/</em>，我们将看到索引页面。</p><p>我们应该注意到<strong>如果控制器和配置都为同一路径提供映射，控制器优先。</strong></p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们看到了如何在Spring MVC中将根URL映射到一个页面。我们讨论了Spring MVC的默认行为以及如何通过自定义配置来覆盖它。</p><p>我们还看了两种提供自定义映射的方法——使用控制器和使用_WebMvcConfigurer_接口。</p><p>如往常一样，本文中使用的所有代码示例都可以在GitHub上找到。</p>',46),o=[p];function l(c,i){return s(),a("div",null,o)}const d=n(e,[["render",l],["__file","2024-07-10-Spring MVC   Mapping the Root URL to a Page.html.vue"]]),g=JSON.parse('{"path":"/posts/baeldung/2024-07-10/2024-07-10-Spring%20MVC%20%20%20Mapping%20the%20Root%20URL%20to%20a%20Page.html","title":"Spring MVC – 将根URL映射到页面","lang":"zh-CN","frontmatter":{"date":"2023-01-01T00:00:00.000Z","category":["Spring MVC","Web Development"],"tag":["Spring MVC","Root URL Mapping"],"head":[["meta",{"name":"keywords","content":"Spring MVC, Root URL Mapping, Web Development"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-10/2024-07-10-Spring%20MVC%20%20%20Mapping%20the%20Root%20URL%20to%20a%20Page.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Spring MVC – 将根URL映射到页面"}],["meta",{"property":"og:description","content":"Spring MVC – 将根URL映射到页面 本教程将展示如何在Spring MVC中将根URL映射到一个页面。 首先，我们将查看Spring MVC的默认行为。然后，我们将讨论这种行为被抑制的场景。最后，我们将学习提供自定义映射的方法。 2. 项目设置 我们可以使用Spring Initializr生成项目，并添加Spring Web Starte..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2023/01/index-page-e1673539470769.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-10T15:40:47.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Spring MVC"}],["meta",{"property":"article:tag","content":"Root URL Mapping"}],["meta",{"property":"article:published_time","content":"2023-01-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-10T15:40:47.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Spring MVC – 将根URL映射到页面\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2023/01/index-page-e1673539470769.png\\",\\"https://www.baeldung.com/wp-content/uploads/2023/01/404-error-page-1-e1673539498205.png\\"],\\"datePublished\\":\\"2023-01-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-10T15:40:47.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Spring MVC – 将根URL映射到页面 本教程将展示如何在Spring MVC中将根URL映射到一个页面。 首先，我们将查看Spring MVC的默认行为。然后，我们将讨论这种行为被抑制的场景。最后，我们将学习提供自定义映射的方法。 2. 项目设置 我们可以使用Spring Initializr生成项目，并添加Spring Web Starte..."},"headers":[{"level":2,"title":"2. 项目设置","slug":"_2-项目设置","link":"#_2-项目设置","children":[{"level":3,"title":"2.1. 创建索引页面","slug":"_2-1-创建索引页面","link":"#_2-1-创建索引页面","children":[]},{"level":3,"title":"2.2. 默认行为","slug":"_2-2-默认行为","link":"#_2-2-默认行为","children":[]}]},{"level":2,"title":"3. 更改默认行为","slug":"_3-更改默认行为","link":"#_3-更改默认行为","children":[{"level":3,"title":"3.1. @EnableWebMvc","slug":"_3-1-enablewebmvc","link":"#_3-1-enablewebmvc","children":[]}]},{"level":2,"title":"4. 自定义映射","slug":"_4-自定义映射","link":"#_4-自定义映射","children":[{"level":3,"title":"4.1. 使用控制器","slug":"_4-1-使用控制器","link":"#_4-1-使用控制器","children":[]},{"level":3,"title":"4.2. 使用_WebMvcConfigurer_","slug":"_4-2-使用-webmvcconfigurer","link":"#_4-2-使用-webmvcconfigurer","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720626047000,"updatedTime":1720626047000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.21,"words":962},"filePathRelative":"posts/baeldung/2024-07-10/2024-07-10-Spring MVC   Mapping the Root URL to a Page.md","localizedDate":"2023年1月1日","excerpt":"<hr>\\n<h1>Spring MVC – 将根URL映射到页面</h1>\\n<p>本教程将展示如何在Spring MVC中将根URL映射到一个页面。</p>\\n<p>首先，我们将查看Spring MVC的默认行为。然后，我们将讨论这种行为被抑制的场景。最后，我们将学习提供自定义映射的方法。</p>\\n<h2>2. 项目设置</h2>\\n<p>我们可以使用Spring Initializr生成项目，并添加Spring Web Starter依赖。</p>\\n<p>如果手动添加依赖，我们需要在_pom.xml_文件中添加以下内容：</p>\\n<div class=\\"language-xml\\" data-ext=\\"xml\\" data-title=\\"xml\\"><pre class=\\"language-xml\\"><code>`<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>dependency</span><span class=\\"token punctuation\\">&gt;</span></span>`\\n    `<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>groupId</span><span class=\\"token punctuation\\">&gt;</span></span>`org.springframework.boot`<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>groupId</span><span class=\\"token punctuation\\">&gt;</span></span>`\\n    `<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>artifactId</span><span class=\\"token punctuation\\">&gt;</span></span>`spring-boot-starter-web`<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>artifactId</span><span class=\\"token punctuation\\">&gt;</span></span>`\\n`<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>dependency</span><span class=\\"token punctuation\\">&gt;</span></span>`\\n</code></pre></div>","autoDesc":true}');export{d as comp,g as data};
