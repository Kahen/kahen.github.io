import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-DzJ3ruqA.js";const p={},e=t('<hr><h1 id="使用spring-boot和thymeleaf上传图片" tabindex="-1"><a class="header-anchor" href="#使用spring-boot和thymeleaf上传图片"><span>使用Spring Boot和Thymeleaf上传图片</span></a></h1><p>在这个快速教程中，我们将看看如何在使用Spring Boot和Thymeleaf的Java Web应用程序中上传图片。</p><h2 id="_2-依赖项" tabindex="-1"><a class="header-anchor" href="#_2-依赖项"><span><strong>2. 依赖项</strong></span></a></h2><p>我们只需要两个依赖项——Spring Boot Web和Thymeleaf：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>``org.springframework.boot``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>``spring-boot-starter-web``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>``\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>``org.springframework.boot``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>``spring-boot-starter-thymeleaf``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>``\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-spring-boot-控制器" tabindex="-1"><a class="header-anchor" href="#_3-spring-boot-控制器"><span><strong>3. Spring Boot 控制器</strong></span></a></h2><p>我们的第一步是创建一个Spring Boot Web控制器来处理我们的请求：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Controller</span> <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UploadController</span> <span class="token punctuation">{</span>\n\n    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token constant">UPLOAD_DIRECTORY</span> <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">getProperty</span><span class="token punctuation">(</span><span class="token string">&quot;user.dir&quot;</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;/uploads&quot;</span><span class="token punctuation">;</span>\n\n    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/uploadimage&quot;</span><span class="token punctuation">)</span> <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">displayUploadForm</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token string">&quot;imageupload/index&quot;</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token annotation punctuation">@PostMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/upload&quot;</span><span class="token punctuation">)</span> <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">uploadImage</span><span class="token punctuation">(</span><span class="token class-name">Model</span> model<span class="token punctuation">,</span> <span class="token annotation punctuation">@RequestParam</span><span class="token punctuation">(</span><span class="token string">&quot;image&quot;</span><span class="token punctuation">)</span> <span class="token class-name">MultipartFile</span> file<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>\n        <span class="token class-name">StringBuilder</span> fileNames <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token class-name">Path</span> fileNameAndPath <span class="token operator">=</span> <span class="token class-name">Paths</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token constant">UPLOAD_DIRECTORY</span><span class="token punctuation">,</span> file<span class="token punctuation">.</span><span class="token function">getOriginalFilename</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        fileNames<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span>file<span class="token punctuation">.</span><span class="token function">getOriginalFilename</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token class-name">Files</span><span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>fileNameAndPath<span class="token punctuation">,</span> file<span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        model<span class="token punctuation">.</span><span class="token function">addAttribute</span><span class="token punctuation">(</span><span class="token string">&quot;msg&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Uploaded images: &quot;</span> <span class="token operator">+</span> fileNames<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">return</span> <span class="token string">&quot;imageupload/index&quot;</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们定义了两个方法来处理HTTP GET请求。_displayUploadForm()_方法处理GET请求并返回Thymeleaf模板的名称，以便让用户导入图片。</p><p>_uploadImage()<em>方法处理图片上传。它接受一个_image_的_multipart/form-data</em> POST请求并将其保存在本地文件系统中。<strong>_MultipartFile_接口是Spring Boot提供的一种特殊数据结构，用于表示多部分请求中的上传文件。</strong></p><p>最后，我们创建了一个上传文件夹来存储所有上传的图片。我们还添加了一个包含上传图片名称的消息，以便在用户提交表单后显示。</p><h2 id="_4-thymeleaf-模板" tabindex="-1"><a class="header-anchor" href="#_4-thymeleaf-模板"><span><strong>4. Thymeleaf 模板</strong></span></a></h2><p>第二步是创建一个我们将称之为_index.html_的Thymeleaf模板，路径为_src/main/resources/templates_。此模板显示一个HTML表单，允许用户选择并上传图片。此外，我们使用_accept=&quot;image/*&quot;_属性，只允许用户导入图片而不是导入任何文件。</p><p>让我们看看我们的_index.html_文件的结构：</p><div class="language-html line-numbers-mode" data-ext="html" data-title="html"><pre class="language-html"><code>`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">&gt;</span></span>`\n`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>section</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>my-5<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>container<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>`\n        `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>row<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>`\n            `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>col-md-8 mx-auto<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>`\n                `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h2</span><span class="token punctuation">&gt;</span></span>`上传图片示例`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h2</span><span class="token punctuation">&gt;</span></span>`\n                `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span> <span class="token attr-name"><span class="token namespace">th:</span>text</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>${message}<span class="token punctuation">&quot;</span></span> <span class="token attr-name"><span class="token namespace">th:</span>if</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>${message ne null}<span class="token punctuation">&quot;</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>alert alert-primary<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>`\n                `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>form</span> <span class="token attr-name">method</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>post<span class="token punctuation">&quot;</span></span> <span class="token attr-name"><span class="token namespace">th:</span>action</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>@{/upload}<span class="token punctuation">&quot;</span></span> <span class="token attr-name">enctype</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>multipart/form-data<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>`\n                    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>form-group<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>`\n                        `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>file<span class="token punctuation">&quot;</span></span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>image<span class="token punctuation">&quot;</span></span> <span class="token attr-name">accept</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>image/*<span class="token punctuation">&quot;</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>form-control-file<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>`\n                    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>````\n                    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>submit<span class="token punctuation">&quot;</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>btn btn-primary<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>`上传图片`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span>`\n                `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>form</span><span class="token punctuation">&gt;</span></span>`\n                `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name"><span class="token namespace">th:</span>if</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>${msg != null}<span class="token punctuation">&quot;</span></span> <span class="token attr-name"><span class="token namespace">th:</span>text</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>${msg}<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">&gt;</span></span>`\n            ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>````\n        ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>````\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>````\n`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>section</span><span class="token punctuation">&gt;</span></span>`\n`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">&gt;</span></span>`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-自定义文件大小" tabindex="-1"><a class="header-anchor" href="#_5-自定义文件大小"><span><strong>5. 自定义文件大小</strong></span></a></h2><p>如果我们尝试上传一个大文件，将会抛出_MaxUploadSizeExceededException_异常。然而，<strong>我们可以通过在_application.properties_文件中定义_spring.servlet.multipart.max-file-size_和_spring.servlet.multipart.max-request-size_属性来调整文件上传限制</strong>：</p><div class="language-properties line-numbers-mode" data-ext="properties" data-title="properties"><pre class="language-properties"><code><span class="token key attr-name">spring.servlet.multipart.max-file-size</span> <span class="token punctuation">=</span> <span class="token value attr-value">5MB</span>\n<span class="token key attr-name">spring.servlet.multipart.max-request-size</span> <span class="token punctuation">=</span> <span class="token value attr-value">5MB</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span><strong>6. 结论</strong></span></a></h2><p>在这篇文章中，我们展示了如何在使用Spring Boot和Thymeleaf的Java Web应用程序中上传图片。</p>',21),o=[e];function l(c,u){return s(),a("div",null,o)}const r=n(p,[["render",l],["__file","2024-07-16-Upload Image With Spring Boot and Thymeleaf.html.vue"]]),g=JSON.parse('{"path":"/posts/baeldung/2024-07-16/2024-07-16-Upload%20Image%20With%20Spring%20Boot%20and%20Thymeleaf.html","title":"使用Spring Boot和Thymeleaf上传图片","lang":"zh-CN","frontmatter":{"date":"2024-07-16T00:00:00.000Z","category":["Spring Boot","Thymeleaf"],"tag":["Image Upload","Java Web Application"],"head":[["meta",{"name":"keywords","content":"Spring Boot, Thymeleaf, Image Upload, Java Web Application"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-16/2024-07-16-Upload%20Image%20With%20Spring%20Boot%20and%20Thymeleaf.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用Spring Boot和Thymeleaf上传图片"}],["meta",{"property":"og:description","content":"使用Spring Boot和Thymeleaf上传图片 在这个快速教程中，我们将看看如何在使用Spring Boot和Thymeleaf的Java Web应用程序中上传图片。 2. 依赖项 我们只需要两个依赖项——Spring Boot Web和Thymeleaf： 3. Spring Boot 控制器 我们的第一步是创建一个Spring Boot W..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-16T14:27:07.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Image Upload"}],["meta",{"property":"article:tag","content":"Java Web Application"}],["meta",{"property":"article:published_time","content":"2024-07-16T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-16T14:27:07.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用Spring Boot和Thymeleaf上传图片\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-16T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-16T14:27:07.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用Spring Boot和Thymeleaf上传图片 在这个快速教程中，我们将看看如何在使用Spring Boot和Thymeleaf的Java Web应用程序中上传图片。 2. 依赖项 我们只需要两个依赖项——Spring Boot Web和Thymeleaf： 3. Spring Boot 控制器 我们的第一步是创建一个Spring Boot W..."},"headers":[{"level":2,"title":"2. 依赖项","slug":"_2-依赖项","link":"#_2-依赖项","children":[]},{"level":2,"title":"3. Spring Boot 控制器","slug":"_3-spring-boot-控制器","link":"#_3-spring-boot-控制器","children":[]},{"level":2,"title":"4. Thymeleaf 模板","slug":"_4-thymeleaf-模板","link":"#_4-thymeleaf-模板","children":[]},{"level":2,"title":"5. 自定义文件大小","slug":"_5-自定义文件大小","link":"#_5-自定义文件大小","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1721140027000,"updatedTime":1721140027000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.17,"words":652},"filePathRelative":"posts/baeldung/2024-07-16/2024-07-16-Upload Image With Spring Boot and Thymeleaf.md","localizedDate":"2024年7月16日","excerpt":"<hr>\\n<h1>使用Spring Boot和Thymeleaf上传图片</h1>\\n<p>在这个快速教程中，我们将看看如何在使用Spring Boot和Thymeleaf的Java Web应用程序中上传图片。</p>\\n<h2><strong>2. 依赖项</strong></h2>\\n<p>我们只需要两个依赖项——Spring Boot Web和Thymeleaf：</p>\\n<div class=\\"language-xml\\" data-ext=\\"xml\\" data-title=\\"xml\\"><pre class=\\"language-xml\\"><code>``<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>dependency</span><span class=\\"token punctuation\\">&gt;</span></span>``\\n    ``<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>groupId</span><span class=\\"token punctuation\\">&gt;</span></span>``org.springframework.boot``<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>groupId</span><span class=\\"token punctuation\\">&gt;</span></span>``\\n    ``<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>artifactId</span><span class=\\"token punctuation\\">&gt;</span></span>``spring-boot-starter-web``<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>artifactId</span><span class=\\"token punctuation\\">&gt;</span></span>``\\n``<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>dependency</span><span class=\\"token punctuation\\">&gt;</span></span>``\\n``<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>dependency</span><span class=\\"token punctuation\\">&gt;</span></span>``\\n    ``<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>groupId</span><span class=\\"token punctuation\\">&gt;</span></span>``org.springframework.boot``<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>groupId</span><span class=\\"token punctuation\\">&gt;</span></span>``\\n    ``<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>artifactId</span><span class=\\"token punctuation\\">&gt;</span></span>``spring-boot-starter-thymeleaf``<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>artifactId</span><span class=\\"token punctuation\\">&gt;</span></span>``\\n``<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>dependency</span><span class=\\"token punctuation\\">&gt;</span></span>``\\n</code></pre></div>","autoDesc":true}');export{r as comp,g as data};
