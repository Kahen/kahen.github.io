import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-D4B8YWfq.js";const p={},e=t('<h1 id="使用postman上传文件和json数据" tabindex="-1"><a class="header-anchor" href="#使用postman上传文件和json数据"><span>使用Postman上传文件和JSON数据</span></a></h1><p>Postman是一个流行的API平台，它优化了API开发生命周期的各个步骤。Postman可以用来在不写任何代码的情况下测试我们的API。我们可以使用独立的应用程序或浏览器扩展。</p><p>在本教程中，我们将看到在使用Postman时如何上传文件和JSON数据。</p><h3 id="_2-1-依赖项" tabindex="-1"><a class="header-anchor" href="#_2-1-依赖项"><span>2.1. 依赖项</span></a></h3><p>我们定义了一个基本的spring应用程序，在_pom.xml_中使用了_spring-boot-starter-web_依赖项：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>`org.springframework.boot`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>`spring-boot-starter-web`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>`\n`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-模型" tabindex="-1"><a class="header-anchor" href="#_2-2-模型"><span>2.2. 模型</span></a></h3><p>接下来，我们为JSON输入定义一个简单的模型类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">JsonRequest</span> <span class="token punctuation">{</span>\n    <span class="token keyword">int</span> id<span class="token punctuation">;</span>\n    <span class="token class-name">String</span> name<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为了简洁，我们省略了构造函数、getter/setter等的声明。</p><h3 id="_2-3-端点" tabindex="-1"><a class="header-anchor" href="#_2-3-端点"><span>2.3. 端点</span></a></h3><p>最后，让我们根据用例设置一个端点来处理作为文件的请求：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@PostMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/uploadFile&quot;</span><span class="token punctuation">)</span>\n<span class="token keyword">public</span> <span class="token class-name">ResponseEntity</span>```<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``` <span class="token function">handleFileUpload</span><span class="token punctuation">(</span><span class="token annotation punctuation">@RequestParam</span><span class="token punctuation">(</span><span class="token string">&quot;file&quot;</span><span class="token punctuation">)</span> <span class="token class-name">MultipartFile</span> file<span class="token punctuation">)</span><span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token class-name">ResponseEntity</span><span class="token punctuation">.</span><span class="token function">ok</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">body</span><span class="token punctuation">(</span><span class="token string">&quot;file received successfully&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在_handleFileUpload()<em>方法中，我们期望输入一个_MultipartFile</em>，然后返回一个带有静态文本的_200_状态消息。我们保持简单，没有探索保存或处理输入文件。</p><p><strong>_MultipartFile_由Spring-Web提供，它表示一个上传的文件</strong>。然后这个文件存储在内存中或临时磁盘上，一旦请求处理完成就会被清除。</p><p>让我们也创建一个处理JSON数据的端点：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@PostMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/uploadJson&quot;</span><span class="token punctuation">)</span>\n<span class="token keyword">public</span> <span class="token class-name">ResponseEntity</span>```<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``` <span class="token function">handleJsonInput</span><span class="token punctuation">(</span><span class="token annotation punctuation">@RequestBody</span> <span class="token class-name">JsonRequest</span> json<span class="token punctuation">)</span><span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token class-name">ResponseEntity</span><span class="token punctuation">.</span><span class="token function">ok</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">body</span><span class="token punctuation">(</span>json<span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">+</span>json<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，<em>handleJsonInput()</em>，我们期望一个类型为_JsonRequest_的对象，这是我们定义的模型类。该方法返回一个_200_ HTTP状态码，并将输入详情_id_和_name_在响应中返回。</p><p>我们使用了_@RequestBody_注解，它将输入反序列化为_JsonRequest_对象。这样，我们已经看到了JSON的简单处理，以验证输入。</p><p>我们已经设置了应用程序，现在让我们检查两种向应用程序提供输入的方式。</p><h3 id="_3-1-在postman中上传json" tabindex="-1"><a class="header-anchor" href="#_3-1-在postman中上传json"><span>3.1. 在Postman中上传JSON</span></a></h3><p>JSON是端点的文本输入类型之一。我们将按照以下步骤将相同的内容传递给公开的端点。</p><p>默认方法是_SET_。所以一旦我们添加了_localhost_ URL，我们需要选择_POST_作为方法：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/10/JsonStep1.jpg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>让我们点击_Body_选项卡，然后选择_raw_。在显示_Text_的下拉菜单中，让我们选择_JSON_作为输入：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/10/JsonStep2.jpg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>我们需要粘贴输入的JSON，然后点击_Send_：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/10/JsonStep3.jpg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>我们在快照的底部可以看到一个_200_状态码作为响应。此外，<strong>输入中的_id_和_name_在响应体中返回，确认JSON在端点正确处理</strong>。</p><h3 id="_3-2-在postman中上传文件" tabindex="-1"><a class="header-anchor" href="#_3-2-在postman中上传文件"><span>3.2. 在Postman中上传文件</span></a></h3><p>让我们以文档文件为例，因为我们没有定义端点可以消费的文件类型。</p><p>让我们添加_localhost_ URL并选择_POST_作为方法，因为默认方法是_GET_：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/10/FileUploadStep1.jpg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>让我们点击_Body_选项卡，然后选择_form-data_。在第一行的键值对上，让我们点击键字段右上角的下拉菜单，并选择_File_作为输入：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/10/FileUploadStep2.jpg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>我们需要在键列中添加文本_file_，这是我们端点的_@RequestParam_，并在值列中浏览所需的文件。</p><p>最后，让我们点击_Send_：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/10/FileUploadStep3.jpg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>当我们点击_Send_时，我们得到一个**<em>200</em> HTTP状态码和我们端点定义中定义的静态文本**。这意味着我们的<strong>文件已成功传递到端点，没有错误或异常</strong>。</p><h2 id="_4-在同一个请求中发送多部分数据和json" tabindex="-1"><a class="header-anchor" href="#_4-在同一个请求中发送多部分数据和json"><span>4. 在同一个请求中发送多部分数据和JSON</span></a></h2><p>现在，让我们看看如何在Postman中使用同一个请求发送多部分数据和JSON。</p><p>首先，我们需要配置我们的Postman请求，并在预请求脚本中设置我们想要发送的JSON数据：</p><p>然后，我们将转到请求编辑器的“Body”选项卡，并选择“form-data”作为正文类型。然后，我们必须为嵌套的JSON对象和多部分文件添加字段：</p><ul><li>对于嵌套的JSON，我们将从我们在预请求脚本中定义的“jsonData”变量中获取其值。另外，我们需要将其内容类型设置为_application/json_。</li><li>对于文件字段，我们需要点击“Choose Files”按钮，将打开一个文件对话框，允许我们选择要上传的文件。一旦我们选择了文件，Postman将把它作为_multipart/form-data_请求的一部分包含进来。</li></ul><p>最后，让我们创建一个适当的控制器来处理_multipart/form-data_请求，并相应地处理文件和嵌套的JSON对象。</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@PostMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/uploadJsonAndMultipartData&quot;</span><span class="token punctuation">)</span>\n<span class="token keyword">public</span> <span class="token class-name">ResponseEntity</span>```<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``` <span class="token function">handleJsonAndMultipartInput</span><span class="token punctuation">(</span><span class="token annotation punctuation">@RequestPart</span><span class="token punctuation">(</span><span class="token string">&quot;data&quot;</span><span class="token punctuation">)</span> <span class="token class-name">JsonRequest</span> json<span class="token punctuation">,</span> <span class="token annotation punctuation">@RequestPart</span><span class="token punctuation">(</span><span class="token string">&quot;file&quot;</span><span class="token punctuation">)</span> <span class="token class-name">MultipartFile</span> file<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token class-name">ResponseEntity</span><span class="token punctuation">.</span><span class="token function">ok</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">body</span><span class="token punctuation">(</span>json<span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> json<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个端点中，<em>handleJsonAndMultipartInput()<em>方法接受嵌套的JSON对象作为一个_JsonRequest_对象使用</em>@RequestPart(&quot;data&quot;)</em>，文件作为使用_@RequestPart(&quot;file&quot;)_的_MultipartFile_对象接收。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们构建了一个简单的Spring Boot应用程序，并通过Postman查看了两种向公开端点提供数据的不同方式。</p><p>如往常一样，代码示例可在GitHub上获取。</p>',50),o=[e];function l(c,i){return s(),a("div",null,o)}const r=n(p,[["render",l],["__file","2024-07-13-Uploading a File and JSON Data in Postman.html.vue"]]),g=JSON.parse('{"path":"/posts/baeldung/2024-07-13/2024-07-13-Uploading%20a%20File%20and%20JSON%20Data%20in%20Postman.html","title":"使用Postman上传文件和JSON数据","lang":"zh-CN","frontmatter":{"date":"2022-10-28T00:00:00.000Z","category":["Postman","Spring Boot"],"tag":["API测试","文件上传","JSON数据"],"head":[["meta",{"name":"keywords","content":"Postman, Spring Boot, 文件上传, JSON数据, API测试"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-13/2024-07-13-Uploading%20a%20File%20and%20JSON%20Data%20in%20Postman.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用Postman上传文件和JSON数据"}],["meta",{"property":"og:description","content":"使用Postman上传文件和JSON数据 Postman是一个流行的API平台，它优化了API开发生命周期的各个步骤。Postman可以用来在不写任何代码的情况下测试我们的API。我们可以使用独立的应用程序或浏览器扩展。 在本教程中，我们将看到在使用Postman时如何上传文件和JSON数据。 2.1. 依赖项 我们定义了一个基本的spring应用程序..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2022/10/JsonStep1.jpg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-13T14:41:18.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"API测试"}],["meta",{"property":"article:tag","content":"文件上传"}],["meta",{"property":"article:tag","content":"JSON数据"}],["meta",{"property":"article:published_time","content":"2022-10-28T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-13T14:41:18.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用Postman上传文件和JSON数据\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2022/10/JsonStep1.jpg\\",\\"https://www.baeldung.com/wp-content/uploads/2022/10/JsonStep2.jpg\\",\\"https://www.baeldung.com/wp-content/uploads/2022/10/JsonStep3.jpg\\",\\"https://www.baeldung.com/wp-content/uploads/2022/10/FileUploadStep1.jpg\\",\\"https://www.baeldung.com/wp-content/uploads/2022/10/FileUploadStep2.jpg\\",\\"https://www.baeldung.com/wp-content/uploads/2022/10/FileUploadStep3.jpg\\"],\\"datePublished\\":\\"2022-10-28T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-13T14:41:18.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用Postman上传文件和JSON数据 Postman是一个流行的API平台，它优化了API开发生命周期的各个步骤。Postman可以用来在不写任何代码的情况下测试我们的API。我们可以使用独立的应用程序或浏览器扩展。 在本教程中，我们将看到在使用Postman时如何上传文件和JSON数据。 2.1. 依赖项 我们定义了一个基本的spring应用程序..."},"headers":[{"level":3,"title":"2.1. 依赖项","slug":"_2-1-依赖项","link":"#_2-1-依赖项","children":[]},{"level":3,"title":"2.2. 模型","slug":"_2-2-模型","link":"#_2-2-模型","children":[]},{"level":3,"title":"2.3. 端点","slug":"_2-3-端点","link":"#_2-3-端点","children":[]},{"level":3,"title":"3.1. 在Postman中上传JSON","slug":"_3-1-在postman中上传json","link":"#_3-1-在postman中上传json","children":[]},{"level":3,"title":"3.2. 在Postman中上传文件","slug":"_3-2-在postman中上传文件","link":"#_3-2-在postman中上传文件","children":[]},{"level":2,"title":"4. 在同一个请求中发送多部分数据和JSON","slug":"_4-在同一个请求中发送多部分数据和json","link":"#_4-在同一个请求中发送多部分数据和json","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720881678000,"updatedTime":1720881678000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.45,"words":1336},"filePathRelative":"posts/baeldung/2024-07-13/2024-07-13-Uploading a File and JSON Data in Postman.md","localizedDate":"2022年10月28日","excerpt":"\\n<p>Postman是一个流行的API平台，它优化了API开发生命周期的各个步骤。Postman可以用来在不写任何代码的情况下测试我们的API。我们可以使用独立的应用程序或浏览器扩展。</p>\\n<p>在本教程中，我们将看到在使用Postman时如何上传文件和JSON数据。</p>\\n<h3>2.1. 依赖项</h3>\\n<p>我们定义了一个基本的spring应用程序，在_pom.xml_中使用了_spring-boot-starter-web_依赖项：</p>\\n<div class=\\"language-xml\\" data-ext=\\"xml\\" data-title=\\"xml\\"><pre class=\\"language-xml\\"><code>`<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>dependency</span><span class=\\"token punctuation\\">&gt;</span></span>`\\n    `<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>groupId</span><span class=\\"token punctuation\\">&gt;</span></span>`org.springframework.boot`<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>groupId</span><span class=\\"token punctuation\\">&gt;</span></span>`\\n    `<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>artifactId</span><span class=\\"token punctuation\\">&gt;</span></span>`spring-boot-starter-web`<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>artifactId</span><span class=\\"token punctuation\\">&gt;</span></span>`\\n`<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>dependency</span><span class=\\"token punctuation\\">&gt;</span></span>`\\n</code></pre></div>","autoDesc":true}');export{r as comp,g as data};
