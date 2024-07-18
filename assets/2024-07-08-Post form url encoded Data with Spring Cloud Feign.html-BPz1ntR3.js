import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-CE5go3V-.js";const p={},e=t(`<h1 id="使用spring-cloud-feign发送表单编码数据的post请求" tabindex="-1"><a class="header-anchor" href="#使用spring-cloud-feign发送表单编码数据的post请求"><span>使用Spring Cloud Feign发送表单编码数据的POST请求</span></a></h1><p>在本教程中，我们将学习如何使用Feign客户端在请求正文中使用表单编码数据进行POST API请求。</p><h2 id="_2-发送表单编码数据的方式" tabindex="-1"><a class="header-anchor" href="#_2-发送表单编码数据的方式"><span>2. 发送表单编码数据的方式</span></a></h2><p>我们可以通过两种不同的方式来发送POST表单编码数据。我们首先需要创建一个自定义编码器并为我们的Feign客户端配置它：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">FormFeignEncoderConfig</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">Encoder</span> <span class="token function">encoder</span><span class="token punctuation">(</span><span class="token class-name">ObjectFactory</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">HttpMessageConverters</span><span class="token punctuation">&gt;</span></span>\` converters<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">SpringFormEncoder</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">SpringEncoder</span><span class="token punctuation">(</span>converters<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们将在Feign客户端配置中使用这个自定义类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@FeignClient</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;form-client&quot;</span><span class="token punctuation">,</span> url <span class="token operator">=</span> <span class="token string">&quot;http://localhost:8085/api&quot;</span><span class="token punctuation">,</span>
  configuration <span class="token operator">=</span> <span class="token class-name">FormFeignEncoderConfig</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">FormClient</span> <span class="token punctuation">{</span>
    <span class="token comment">// 请求方法</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Feign和bean配置现在已经完成。现在让我们看看请求方法。</p><h3 id="_2-1-使用pojo" tabindex="-1"><a class="header-anchor" href="#_2-1-使用pojo"><span>2.1. 使用POJO</span></a></h3><p>我们将创建一个Java POJO类，其中包含所有表单参数作为成员：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FormData</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> id<span class="token punctuation">;</span>
    <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token comment">// 构造函数，getter和setter</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们将这个对象作为POST请求的请求正文传递。</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@PostMapping</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;/form&quot;</span><span class="token punctuation">,</span> consumes <span class="token operator">=</span> <span class="token class-name">MediaType</span><span class="token punctuation">.</span><span class="token constant">APPLICATION_FORM_URLENCODED_VALUE</span><span class="token punctuation">)</span>
<span class="token keyword">void</span> <span class="token function">postFormData</span><span class="token punctuation">(</span><span class="token annotation punctuation">@RequestBody</span> <span class="token class-name">FormData</span> data<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们验证我们的代码；请求正文应该有_id_和_name_作为表单编码数据：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenFormData_whenPostFormDataCalled_thenReturnSuccess</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">FormData</span> formData <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FormData</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">&quot;baeldung&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">stubFor</span><span class="token punctuation">(</span><span class="token class-name">WireMock</span><span class="token punctuation">.</span><span class="token function">post</span><span class="token punctuation">(</span><span class="token function">urlEqualTo</span><span class="token punctuation">(</span><span class="token string">&quot;/api/form&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">willReturn</span><span class="token punctuation">(</span><span class="token function">aResponse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">withStatus</span><span class="token punctuation">(</span><span class="token class-name">HttpStatus</span><span class="token punctuation">.</span><span class="token constant">OK</span><span class="token punctuation">.</span><span class="token function">value</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    formClient<span class="token punctuation">.</span><span class="token function">postFormData</span><span class="token punctuation">(</span>formData<span class="token punctuation">)</span><span class="token punctuation">;</span>
    wireMockServer<span class="token punctuation">.</span><span class="token function">verify</span><span class="token punctuation">(</span><span class="token function">postRequestedFor</span><span class="token punctuation">(</span><span class="token function">urlPathEqualTo</span><span class="token punctuation">(</span><span class="token string">&quot;/api/form&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">withHeader</span><span class="token punctuation">(</span><span class="token string">&quot;Content-Type&quot;</span><span class="token punctuation">,</span> <span class="token function">equalTo</span><span class="token punctuation">(</span><span class="token string">&quot;application/x-www-form-urlencoded; charset=UTF-8&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">withRequestBody</span><span class="token punctuation">(</span><span class="token function">equalTo</span><span class="token punctuation">(</span><span class="token string">&quot;name=baeldung&amp;id=1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-使用map" tabindex="-1"><a class="header-anchor" href="#_2-2-使用map"><span>2.2. 使用Map</span></a></h3><p>我们还可以使用_Map_代替POJO类在POST请求正文中发送表单编码数据。</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@PostMapping</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;/form/map&quot;</span><span class="token punctuation">,</span> consumes <span class="token operator">=</span> <span class="token class-name">MediaType</span><span class="token punctuation">.</span><span class="token constant">APPLICATION_FORM_URLENCODED_VALUE</span><span class="token punctuation">)</span>
<span class="token keyword">void</span> <span class="token function">postFormMapData</span><span class="token punctuation">(</span><span class="token class-name">Map</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token operator">?</span><span class="token punctuation">&gt;</span></span>\` data<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>注意Map的值应该是‘?’。</strong></p><p>让我们验证我们的代码：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenFormMap_whenPostFormMapDataCalled_thenReturnSuccess</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Map</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\` mapData <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    mapData<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;baeldung&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    mapData<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;id&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">stubFor</span><span class="token punctuation">(</span><span class="token class-name">WireMock</span><span class="token punctuation">.</span><span class="token function">post</span><span class="token punctuation">(</span><span class="token function">urlEqualTo</span><span class="token punctuation">(</span><span class="token string">&quot;/api/form/map&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">willReturn</span><span class="token punctuation">(</span><span class="token function">aResponse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">withStatus</span><span class="token punctuation">(</span><span class="token class-name">HttpStatus</span><span class="token punctuation">.</span><span class="token constant">OK</span><span class="token punctuation">.</span><span class="token function">value</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    formClient<span class="token punctuation">.</span><span class="token function">postFormMapData</span><span class="token punctuation">(</span>mapData<span class="token punctuation">)</span><span class="token punctuation">;</span>
    wireMockServer<span class="token punctuation">.</span><span class="token function">verify</span><span class="token punctuation">(</span><span class="token function">postRequestedFor</span><span class="token punctuation">(</span><span class="token function">urlPathEqualTo</span><span class="token punctuation">(</span><span class="token string">&quot;/api/form/map&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">withHeader</span><span class="token punctuation">(</span><span class="token string">&quot;Content-Type&quot;</span><span class="token punctuation">,</span> <span class="token function">equalTo</span><span class="token punctuation">(</span><span class="token string">&quot;application/x-www-form-urlencoded; charset=UTF-8&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">withRequestBody</span><span class="token punctuation">(</span><span class="token function">equalTo</span><span class="token punctuation">(</span><span class="token string">&quot;name=baeldung&amp;id=1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-结论" tabindex="-1"><a class="header-anchor" href="#_3-结论"><span>3. 结论</span></a></h2><p>在本文中，我们看到了如何在请求正文中使用表单编码数据进行POST API请求。</p><p>如常，示例的完整源代码可在GitHub上找到。</p>`,24),o=[e];function c(l,i){return s(),a("div",null,o)}const k=n(p,[["render",c],["__file","2024-07-08-Post form url encoded Data with Spring Cloud Feign.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-08/2024-07-08-Post%20form%20url%20encoded%20Data%20with%20Spring%20Cloud%20Feign.html","title":"使用Spring Cloud Feign发送表单编码数据的POST请求","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Spring Cloud","Feign"],"tag":["form-url-encoded","POST","API"],"head":[["meta",{"name":"keywords","content":"Spring Cloud, Feign, form-url-encoded, POST, API"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-08/2024-07-08-Post%20form%20url%20encoded%20Data%20with%20Spring%20Cloud%20Feign.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用Spring Cloud Feign发送表单编码数据的POST请求"}],["meta",{"property":"og:description","content":"使用Spring Cloud Feign发送表单编码数据的POST请求 在本教程中，我们将学习如何使用Feign客户端在请求正文中使用表单编码数据进行POST API请求。 2. 发送表单编码数据的方式 我们可以通过两种不同的方式来发送POST表单编码数据。我们首先需要创建一个自定义编码器并为我们的Feign客户端配置它： 我们将在Feign客户端配置..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-08T17:58:52.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"form-url-encoded"}],["meta",{"property":"article:tag","content":"POST"}],["meta",{"property":"article:tag","content":"API"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-08T17:58:52.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用Spring Cloud Feign发送表单编码数据的POST请求\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-08T17:58:52.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用Spring Cloud Feign发送表单编码数据的POST请求 在本教程中，我们将学习如何使用Feign客户端在请求正文中使用表单编码数据进行POST API请求。 2. 发送表单编码数据的方式 我们可以通过两种不同的方式来发送POST表单编码数据。我们首先需要创建一个自定义编码器并为我们的Feign客户端配置它： 我们将在Feign客户端配置..."},"headers":[{"level":2,"title":"2. 发送表单编码数据的方式","slug":"_2-发送表单编码数据的方式","link":"#_2-发送表单编码数据的方式","children":[{"level":3,"title":"2.1. 使用POJO","slug":"_2-1-使用pojo","link":"#_2-1-使用pojo","children":[]},{"level":3,"title":"2.2. 使用Map","slug":"_2-2-使用map","link":"#_2-2-使用map","children":[]}]},{"level":2,"title":"3. 结论","slug":"_3-结论","link":"#_3-结论","children":[]}],"git":{"createdTime":1720461532000,"updatedTime":1720461532000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":1.74,"words":523},"filePathRelative":"posts/baeldung/2024-07-08/2024-07-08-Post form url encoded Data with Spring Cloud Feign.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在本教程中，我们将学习如何使用Feign客户端在请求正文中使用表单编码数据进行POST API请求。</p>\\n<h2>2. 发送表单编码数据的方式</h2>\\n<p>我们可以通过两种不同的方式来发送POST表单编码数据。我们首先需要创建一个自定义编码器并为我们的Feign客户端配置它：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">FormFeignEncoderConfig</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token annotation punctuation\\">@Bean</span>\\n    <span class=\\"token keyword\\">public</span> <span class=\\"token class-name\\">Encoder</span> <span class=\\"token function\\">encoder</span><span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">ObjectFactory</span>`<span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">HttpMessageConverters</span><span class=\\"token punctuation\\">&gt;</span></span>` converters<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token keyword\\">return</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">SpringFormEncoder</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">SpringEncoder</span><span class=\\"token punctuation\\">(</span>converters<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{k as comp,d as data};
