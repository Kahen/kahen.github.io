import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-C6rqSDgP.js";const e={},p=t(`<h1 id="feign-客户端异常处理" tabindex="-1"><a class="header-anchor" href="#feign-客户端异常处理"><span>Feign 客户端异常处理</span></a></h1><p>在本教程中，我们将演示如何在 Feign 中处理异常。Feign 是微服务开发者的强大工具，它支持 <strong><em>ErrorDecoder</em> 和 <em>FallbackFactory</em> 用于异常处理</strong>。</p><h2 id="_2-maven-依赖" tabindex="-1"><a class="header-anchor" href="#_2-maven-依赖"><span><strong>2. Maven 依赖</strong></span></a></h2><p>首先，让我们通过包含 <em>spring-cloud-starter-openfeign</em> 创建一个 Spring Boot 项目。<strong><em>spring-cloud-starter-openfeign</em> 包含了它内部的 <em>feign-core</em> 依赖</strong>：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`\`
    \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`\`org.springframework.cloud\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`\`
    \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`\`spring-cloud-starter-openfeign\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`\`
    \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\`\`3.1.3\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\`\`
\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>或者我们可以将 <em>feign-core</em> 依赖添加到我们的 <em>pom.xml</em> 文件中：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`\`
    \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`\`io.github.openfeign\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`\`
    \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`\`feign-core\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`\`
    \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\`\`11.9.1\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\`\`
\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-使用-errordecoder-处理异常" tabindex="-1"><a class="header-anchor" href="#_3-使用-errordecoder-处理异常"><span><strong>3. 使用 <em>ErrorDecoder</em> 处理异常</strong></span></a></h2><p>我们可以通过配置 <em>ErrorDecoder</em> 来 <strong>处理异常</strong>，它还允许我们在需要时自定义消息。当发生错误时，Feign 客户端会抑制原始消息。为了检索它，我们可以编写自定义的 <em>ErrorDecoder</em>。让我们覆盖默认的 <em>ErrorDecoder</em> 实现：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RetreiveMessageErrorDecoder</span> <span class="token keyword">implements</span> <span class="token class-name">ErrorDecoder</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">ErrorDecoder</span> errorDecoder <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Exception</span> <span class="token function">decode</span><span class="token punctuation">(</span><span class="token class-name">String</span> methodKey<span class="token punctuation">,</span> <span class="token class-name">Response</span> response<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">ExceptionMessage</span> message <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">InputStream</span> bodyIs <span class="token operator">=</span> response<span class="token punctuation">.</span><span class="token function">body</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">asInputStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">ObjectMapper</span> mapper <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ObjectMapper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            message <span class="token operator">=</span> mapper<span class="token punctuation">.</span><span class="token function">readValue</span><span class="token punctuation">(</span>bodyIs<span class="token punctuation">,</span> <span class="token class-name">ExceptionMessage</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IOException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Exception</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">switch</span> <span class="token punctuation">(</span>response<span class="token punctuation">.</span><span class="token function">status</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">case</span> <span class="token number">400</span><span class="token operator">:</span>
                <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">BadRequestException</span><span class="token punctuation">(</span>message<span class="token punctuation">.</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">?</span> message<span class="token punctuation">.</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token string">&quot;Bad Request&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">case</span> <span class="token number">404</span><span class="token operator">:</span>
                <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">NotFoundException</span><span class="token punctuation">(</span>message<span class="token punctuation">.</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">?</span> message<span class="token punctuation">.</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token string">&quot;Not found&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">default</span><span class="token operator">:</span>
                <span class="token keyword">return</span> errorDecoder<span class="token punctuation">.</span><span class="token function">decode</span><span class="token punctuation">(</span>methodKey<span class="token punctuation">,</span> response<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的编码器中，我们覆盖了默认行为以获得对异常的更多控制。</p><h2 id="_4-使用-fallback-处理异常" tabindex="-1"><a class="header-anchor" href="#_4-使用-fallback-处理异常"><span><strong>4. 使用 <em>Fallback</em> 处理异常</strong></span></a></h2><p>我们还可以通过配置 <em>fallback</em> 来处理异常。让我们首先创建一个客户端并配置 <em>fallback</em>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@FeignClient</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;file&quot;</span><span class="token punctuation">,</span> url <span class="token operator">=</span> <span class="token string">&quot;http://localhost:8081&quot;</span><span class="token punctuation">,</span>
  configuration <span class="token operator">=</span> <span class="token class-name">FeignSupportConfig</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> fallback <span class="token operator">=</span> <span class="token class-name">FileUploadClientWithFallbackImpl</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">FileUploadClientWithFallBack</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@PostMapping</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;/upload-error&quot;</span><span class="token punctuation">,</span> consumes <span class="token operator">=</span> <span class="token class-name">MediaType</span><span class="token punctuation">.</span><span class="token constant">MULTIPART_FORM_DATA_VALUE</span><span class="token punctuation">)</span>
    <span class="token class-name">String</span> <span class="token function">fileUpload</span><span class="token punctuation">(</span><span class="token annotation punctuation">@RequestPart</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;file&quot;</span><span class="token punctuation">)</span> <span class="token class-name">MultipartFile</span> file<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们创建 <em>FileUploadClientWithFallbackImpl</em> 根据我们的要求处理异常：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FileUploadClientWithFallbackImpl</span> <span class="token keyword">implements</span> <span class="token class-name">FileUploadClientWithFallBack</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">fileUpload</span><span class="token punctuation">(</span><span class="token class-name">MultipartFile</span> file<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">NotFoundException</span><span class="token punctuation">(</span><span class="token string">&quot;hi, something wrong&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> ex<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>ex <span class="token keyword">instanceof</span> <span class="token class-name">BadRequestException</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span> <span class="token string">&quot;Bad Request!!!&quot;</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>ex <span class="token keyword">instanceof</span> <span class="token class-name">NotFoundException</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span> <span class="token string">&quot;Not Found!!!&quot;</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>ex <span class="token keyword">instanceof</span> <span class="token class-name">Exception</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span> <span class="token string">&quot;Exception!!!&quot;</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">return</span> <span class="token string">&quot;Successfully Uploaded file!!!&quot;</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在让我们创建一个简单的测试来验证 <em>fallback</em> 选项：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span><span class="token punctuation">(</span>expected <span class="token operator">=</span> <span class="token class-name">NotFoundException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenFileUploadClientFallback_thenFileUploadError</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token class-name">ClassLoader</span> classloader <span class="token operator">=</span> <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getContextClassLoader</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">File</span> file <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">File</span><span class="token punctuation">(</span>classloader<span class="token punctuation">.</span><span class="token function">getResource</span><span class="token punctuation">(</span><span class="token constant">FILE_NAME</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getFile</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Assert</span><span class="token punctuation">.</span><span class="token function">assertTrue</span><span class="token punctuation">(</span>file<span class="token punctuation">.</span><span class="token function">exists</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">FileInputStream</span> input <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileInputStream</span><span class="token punctuation">(</span>file<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">MultipartFile</span> multipartFile <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MockMultipartFile</span><span class="token punctuation">(</span><span class="token string">&quot;file&quot;</span><span class="token punctuation">,</span> file<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;text/plain&quot;</span><span class="token punctuation">,</span>
      <span class="token class-name">IOUtils</span><span class="token punctuation">.</span><span class="token function">toByteArray</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    uploadService<span class="token punctuation">.</span><span class="token function">uploadFileWithFallback</span><span class="token punctuation">(</span>multipartFile<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-使用-fallbackfactory-处理异常" tabindex="-1"><a class="header-anchor" href="#_5-使用-fallbackfactory-处理异常"><span><strong>5. 使用 <em>FallbackFactory</em> 处理异常</strong></span></a></h2><p>我们还可以通过配置 <em>FallbackFactory</em> 来处理异常。让我们首先创建一个客户端并配置 <em>FallbackFactory</em>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@FeignClient</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;file&quot;</span><span class="token punctuation">,</span> url <span class="token operator">=</span> <span class="token string">&quot;http://localhost:8081&quot;</span><span class="token punctuation">,</span>
  configuration <span class="token operator">=</span> <span class="token class-name">FeignSupportConfig</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> fallbackFactory <span class="token operator">=</span> <span class="token class-name">FileUploadClientFallbackFactory</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">FileUploadClient</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@PostMapping</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;/upload-file&quot;</span><span class="token punctuation">,</span> consumes <span class="token operator">=</span> <span class="token class-name">MediaType</span><span class="token punctuation">.</span><span class="token constant">MULTIPART_FORM_DATA_VALUE</span><span class="token punctuation">)</span>
    <span class="token class-name">String</span> <span class="token function">fileUpload</span><span class="token punctuation">(</span><span class="token annotation punctuation">@RequestPart</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;file&quot;</span><span class="token punctuation">)</span> <span class="token class-name">MultipartFile</span> file<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们创建 <em>FileUploadClientFallbackFactory</em> 根据我们的要求处理异常：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FileUploadClientFallbackFactory</span> <span class="token keyword">implements</span> <span class="token class-name">FallbackFactory</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">FileUploadClient</span><span class="token punctuation">&gt;</span></span>\` <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">FileUploadClient</span> <span class="token function">create</span><span class="token punctuation">(</span><span class="token class-name">Throwable</span> cause<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">FileUploadClient</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token annotation punctuation">@Override</span>
            <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">fileUpload</span><span class="token punctuation">(</span><span class="token class-name">MultipartFile</span> file<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>cause <span class="token keyword">instanceof</span> <span class="token class-name">BadRequestException</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token keyword">return</span> <span class="token string">&quot;Bad Request!!!&quot;</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>cause <span class="token keyword">instanceof</span> <span class="token class-name">NotFoundException</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token keyword">return</span> <span class="token string">&quot;Not Found!!!&quot;</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>cause <span class="token keyword">instanceof</span> <span class="token class-name">Exception</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token keyword">return</span> <span class="token string">&quot;Exception!!!&quot;</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                <span class="token keyword">return</span> <span class="token string">&quot;Successfully Uploaded file!!!&quot;</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在让我们创建一个简单的测试来验证 <em>FallbackFactory</em> 选项：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span><span class="token punctuation">(</span>expected <span class="token operator">=</span> <span class="token class-name">NotFoundException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenFileUploadClientFallbackFactory_thenFileUploadError</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token class-name">ClassLoader</span> classloader <span class="token operator">=</span> <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getContextClassLoader</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">File</span> file <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">File</span><span class="token punctuation">(</span>classloader<span class="token punctuation">.</span><span class="token function">getResource</span><span class="token punctuation">(</span><span class="token constant">FILE_NAME</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getFile</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Assert</span><span class="token punctuation">.</span><span class="token function">assertTrue</span><span class="token punctuation">(</span>file<span class="token punctuation">.</span><span class="token function">exists</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">FileInputStream</span> input <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileInputStream</span><span class="token punctuation">(</span>file<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">MultipartFile</span> multipartFile <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MockMultipartFile</span><span class="token punctuation">(</span><span class="token string">&quot;file&quot;</span><span class="token punctuation">,</span> file<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;text/plain&quot;</span><span class="token punctuation">,</span>
      <span class="token class-name">IOUtils</span><span class="token punctuation">.</span><span class="token function">toByteArray</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    uploadService<span class="token punctuation">.</span><span class="token function">uploadFileWithFallbackFactory</span><span class="token punctuation">(</span>multipartFile<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span><strong>6. 结论</strong></span></a></h2><p>在本文中，我们展示了如何在 Feign 中处理异常。</p><p>如往常一样，本教程中使用的所有代码示例都可以在 GitHub 上找到。</p>`,28),o=[p];function c(l,i){return a(),s("div",null,o)}const r=n(e,[["render",c],["__file","2024-07-15-Feign Client Exception Handling.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-15/2024-07-15-Feign%20Client%20Exception%20Handling.html","title":"Feign 客户端异常处理","lang":"zh-CN","frontmatter":{"date":"2024-07-15T00:00:00.000Z","category":["Java","Spring Cloud"],"tag":["Feign","Exception Handling"],"head":[["meta",{"name":"keywords","content":"Feign, 异常处理, 微服务"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-15/2024-07-15-Feign%20Client%20Exception%20Handling.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Feign 客户端异常处理"}],["meta",{"property":"og:description","content":"Feign 客户端异常处理 在本教程中，我们将演示如何在 Feign 中处理异常。Feign 是微服务开发者的强大工具，它支持 ErrorDecoder 和 FallbackFactory 用于异常处理。 2. Maven 依赖 首先，让我们通过包含 spring-cloud-starter-openfeign 创建一个 Spring Boot 项目。..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-15T09:07:39.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Feign"}],["meta",{"property":"article:tag","content":"Exception Handling"}],["meta",{"property":"article:published_time","content":"2024-07-15T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-15T09:07:39.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Feign 客户端异常处理\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-15T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-15T09:07:39.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Feign 客户端异常处理 在本教程中，我们将演示如何在 Feign 中处理异常。Feign 是微服务开发者的强大工具，它支持 ErrorDecoder 和 FallbackFactory 用于异常处理。 2. Maven 依赖 首先，让我们通过包含 spring-cloud-starter-openfeign 创建一个 Spring Boot 项目。..."},"headers":[{"level":2,"title":"2. Maven 依赖","slug":"_2-maven-依赖","link":"#_2-maven-依赖","children":[]},{"level":2,"title":"3. 使用 ErrorDecoder 处理异常","slug":"_3-使用-errordecoder-处理异常","link":"#_3-使用-errordecoder-处理异常","children":[]},{"level":2,"title":"4. 使用 Fallback 处理异常","slug":"_4-使用-fallback-处理异常","link":"#_4-使用-fallback-处理异常","children":[]},{"level":2,"title":"5. 使用 FallbackFactory 处理异常","slug":"_5-使用-fallbackfactory-处理异常","link":"#_5-使用-fallbackfactory-处理异常","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1721034459000,"updatedTime":1721034459000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.58,"words":774},"filePathRelative":"posts/baeldung/2024-07-15/2024-07-15-Feign Client Exception Handling.md","localizedDate":"2024年7月15日","excerpt":"\\n<p>在本教程中，我们将演示如何在 Feign 中处理异常。Feign 是微服务开发者的强大工具，它支持 <strong><em>ErrorDecoder</em> 和 <em>FallbackFactory</em> 用于异常处理</strong>。</p>\\n<h2><strong>2. Maven 依赖</strong></h2>\\n<p>首先，让我们通过包含 <em>spring-cloud-starter-openfeign</em> 创建一个 Spring Boot 项目。<strong><em>spring-cloud-starter-openfeign</em> 包含了它内部的 <em>feign-core</em> 依赖</strong>：</p>","autoDesc":true}');export{r as comp,d as data};
