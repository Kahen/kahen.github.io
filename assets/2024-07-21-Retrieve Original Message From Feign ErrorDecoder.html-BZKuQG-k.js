import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as e,o as s,a}from"./app-DpYLEM_u.js";const t={},o=a(`<hr><h1 id="使用feign-errordecoder检索原始消息" tabindex="-1"><a class="header-anchor" href="#使用feign-errordecoder检索原始消息"><span>使用Feign ErrorDecoder检索原始消息</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span><strong>1. 概述</strong></span></a></h2><p>RESTful服务可能因多种原因失败。在本教程中，我们将探讨如何在集成REST服务抛出错误时从Feign客户端检索原始消息。</p><h2 id="_2-feign客户端" tabindex="-1"><a class="header-anchor" href="#_2-feign客户端"><span><strong>2. Feign客户端</strong></span></a></h2><p>Feign是一个可插拔且声明式的Web服务客户端，它使编写Web服务客户端变得更容易。除了Feign注解外，它还支持JAX-RS，并且支持<strong>编码器和解码器以提供更多定制</strong>。</p><h2 id="_3-从-errordecoder-检索消息" tabindex="-1"><a class="header-anchor" href="#_3-从-errordecoder-检索消息"><span><strong>3. 从_ErrorDecoder_检索消息</strong></span></a></h2><p>当出现错误时，<strong>Feign客户端会抑制原始消息，要检索它，我们需要编写自定义的</strong><em>ErrorDecoder</em>。如果没有这种定制，我们将得到以下错误：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>feign.FeignException$NotFound: [404] during [POST] to [http://localhost:8080/upload-error-1] [UploadClient#fileUploadError(MultipartFile)]: [{&quot;timestamp&quot;:&quot;2022-02-18T13:25:22.083+00:00&quot;,&quot;status&quot;:404,&quot;error&quot;:&quot;Not Found&quot;,&quot;path&quot;:&quot;/upload-error-1&quot;}]
	at feign.FeignException.clientErrorStatus(FeignException.java:219) ~[feign-core-11.7.jar:na]
	at feign.FeignException.errorStatus(FeignException.java:194) ~[feign-core-11.7.jar:na]

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为了处理这个错误，我们将创建一个简单的_ExceptionMessage_ Java bean来表示错误消息：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public class ExceptionMessage {
    private String timestamp;
    private int status;
    private String error;
    private String message;
    private String path;
    // 标准getter和setter
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们通过在我们的自定义实现中提取它来检索原始消息：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public class RetreiveMessageErrorDecoder implements ErrorDecoder {
    private ErrorDecoder errorDecoder = new Default();

    @Override
    public Exception decode(String methodKey, Response response) {
        ExceptionMessage message = null;
        try (InputStream bodyIs = response.body()
            .asInputStream()) {
            ObjectMapper mapper = new ObjectMapper();
            message = mapper.readValue(bodyIs, ExceptionMessage.class);
        } catch (IOException e) {
            return new Exception(e.getMessage());
        }
        switch (response.status()) {
        case 400:
            return new BadRequestException(message.getMessage() != null ? message.getMessage() : &quot;Bad Request&quot;);
        case 404:
            return new NotFoundException(message.getMessage() != null ? message.getMessage() : &quot;Not found&quot;);
        default:
            return errorDecoder.decode(methodKey, response);
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在我们的实现中，我们根据可能的错误添加了逻辑，因此我们可以定制它们以满足我们的需求。在我们的switch块的默认情况下，我们使用了_ErrorDecoder_的_Default_实现。</p><p>_Default_实现在状态不在2xx范围内时解码HTTP响应。当_可抛出_是_可重试异常_的子类型时，它应该是_RetryableException_的子类型，并且我们应该尽可能地引发应用程序特定的异常。</p><p>为了配置我们的自定义_ErrorDecoder_，我们将我们的实现作为Feign配置中的bean添加：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Bean
public ErrorDecoder errorDecoder() {
    return new RetreiveMessageErrorDecoder();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们看看带有原始消息的异常：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>com.baeldung.cloud.openfeign.exception.NotFoundException: Page Not found
	at com.baeldung.cloud.openfeign.fileupload.config.RetreiveMessageErrorDecoder.decode(RetreiveMessageErrorDecoder.java:30) ~[classes/:na]
	at feign.AsyncResponseHandler.handleResponse(AsyncResponseHandler.java:96) ~[feign-core-11.7.jar:na]

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span><strong>4. 结论</strong></span></a></h2><p>在本文中，我们展示了如何自定义_ErrorDecoder_，以便我们可以捕获Feign错误以获取原始消息。</p><p>像往常一样，本教程中使用的所有代码示例都可以在GitHub上找到。头文件中的category和tag需要根据实际页面内容进行翻译和填充。由于提供的文本中没有具体的category和tag信息，我将根据文章的内容和上下文进行合理的推断和翻译。</p><hr><p>date: 2022-04-01 category:</p><ul><li>Spring Cloud</li><li>Feign tag:</li><li>Feign客户端</li><li>ErrorDecoder</li><li>异常处理 head:</li><li><ul><li>meta</li><li>name: keywords content: Feign客户端, ErrorDecoder, 异常处理</li></ul></li></ul><hr><h1 id="使用feign-errordecoder检索原始消息-1" tabindex="-1"><a class="header-anchor" href="#使用feign-errordecoder检索原始消息-1"><span>使用Feign ErrorDecoder检索原始消息</span></a></h1><h2 id="_1-概述-1" tabindex="-1"><a class="header-anchor" href="#_1-概述-1"><span><strong>1. 概述</strong></span></a></h2><p>RESTful服务可能因多种原因失败。在本教程中，我们将探讨如何在集成REST服务抛出错误时从Feign客户端检索原始消息。</p><h2 id="_2-feign客户端-1" tabindex="-1"><a class="header-anchor" href="#_2-feign客户端-1"><span><strong>2. Feign客户端</strong></span></a></h2><p>Feign是一个可插拔且声明式的Web服务客户端，它使编写Web服务客户端变得更容易。除了Feign注解外，它还支持JAX-RS，并且支持编码器和解码器以提供更多定制。</p><h2 id="_3-从-errordecoder-检索消息-1" tabindex="-1"><a class="header-anchor" href="#_3-从-errordecoder-检索消息-1"><span><strong>3. 从_ErrorDecoder_检索消息</strong></span></a></h2><p>当出现错误时，Feign客户端会抑制原始消息，要检索它，我们需要编写自定义的ErrorDecoder。如果没有这种定制，我们将得到以下错误：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>feign.FeignException$NotFound: [404] during [POST] to [http://localhost:8080/upload-error-1] [UploadClient#fileUploadError(MultipartFile)]: [{...}]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>为了处理这个错误，我们将创建一个简单的ExceptionMessage Java bean来表示错误消息：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ExceptionMessage</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> timestamp<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span> status<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> error<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> message<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> path<span class="token punctuation">;</span>
    <span class="token comment">// 标准getter和setter</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们通过在我们的自定义实现中提取它来检索原始消息：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RetrieveMessageErrorDecoder</span> <span class="token keyword">implements</span> <span class="token class-name">ErrorDecoder</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">ErrorDecoder</span> defaultErrorDecoder <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Exception</span> <span class="token function">decode</span><span class="token punctuation">(</span><span class="token class-name">String</span> methodKey<span class="token punctuation">,</span> <span class="token class-name">Response</span> response<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">ExceptionMessage</span> message <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">InputStream</span> bodyIs <span class="token operator">=</span> response<span class="token punctuation">.</span><span class="token function">body</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">asInputStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">ObjectMapper</span> mapper <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ObjectMapper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            message <span class="token operator">=</span> mapper<span class="token punctuation">.</span><span class="token function">readValue</span><span class="token punctuation">(</span>bodyIs<span class="token punctuation">,</span> <span class="token class-name">ExceptionMessage</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IOException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">switch</span> <span class="token punctuation">(</span>response<span class="token punctuation">.</span><span class="token function">status</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">case</span> <span class="token number">400</span><span class="token operator">:</span>
                <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">BadRequestException</span><span class="token punctuation">(</span>message<span class="token punctuation">.</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">?</span> message<span class="token punctuation">.</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token string">&quot;Bad Request&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">case</span> <span class="token number">404</span><span class="token operator">:</span>
                <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">NotFoundException</span><span class="token punctuation">(</span>message<span class="token punctuation">.</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">?</span> message<span class="token punctuation">.</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token string">&quot;Not Found&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">default</span><span class="token operator">:</span>
                <span class="token keyword">return</span> defaultErrorDecoder<span class="token punctuation">.</span><span class="token function">decode</span><span class="token punctuation">(</span>methodKey<span class="token punctuation">,</span> response<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在我们的实现中，我们根据可能的错误添加了逻辑，因此我们可以定制它们以满足我们的需求。在我们的switch块的默认情况下，我们使用了ErrorDecoder的Default实现。</p><p>Default实现在状态不在2xx范围内时解码HTTP响应。当可抛出是RetryableException的子类型时，它应该是RetryableException的子类型，并且我们应该尽可能地引发应用程序特定的异常。</p><p>为了配置我们的自定义ErrorDecoder，我们将我们的实现作为Feign配置中的bean添加：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Bean</span>
<span class="token keyword">public</span> <span class="token class-name">ErrorDecoder</span> <span class="token function">errorDecoder</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">RetrieveMessageErrorDecoder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们看看带有原始消息的异常：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>com.baeldung.cloud.openfeign.exception.NotFoundException: Page Not Found
    at ...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-结论-1" tabindex="-1"><a class="header-anchor" href="#_4-结论-1"><span><strong>4. 结论</strong></span></a></h2><p>在本文中，我们展示了如何自定义ErrorDecoder，以便我们可以捕获Feign错误以获取原始消息。</p><p>像往常一样，本教程中使用的所有代码示例都可以在GitHub上找到。</p><p>OK</p>`,48),i=[o];function r(p,c){return s(),e("div",null,i)}const u=n(t,[["render",r],["__file","2024-07-21-Retrieve Original Message From Feign ErrorDecoder.html.vue"]]),g=JSON.parse('{"path":"/posts/baeldung/2024-07-21/2024-07-21-Retrieve%20Original%20Message%20From%20Feign%20ErrorDecoder.html","title":"使用Feign ErrorDecoder检索原始消息","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Spring Cloud","Feign"],"tag":["Feign","ErrorDecoder","Exception Handling"],"head":[["meta",{"name":"keywords","content":"Feign, ErrorDecoder, Exception Handling"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-21/2024-07-21-Retrieve%20Original%20Message%20From%20Feign%20ErrorDecoder.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用Feign ErrorDecoder检索原始消息"}],["meta",{"property":"og:description","content":"使用Feign ErrorDecoder检索原始消息 1. 概述 RESTful服务可能因多种原因失败。在本教程中，我们将探讨如何在集成REST服务抛出错误时从Feign客户端检索原始消息。 2. Feign客户端 Feign是一个可插拔且声明式的Web服务客户端，它使编写Web服务客户端变得更容易。除了Feign注解外，它还支持JAX-RS，并且支持..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-21T02:48:15.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Feign"}],["meta",{"property":"article:tag","content":"ErrorDecoder"}],["meta",{"property":"article:tag","content":"Exception Handling"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-21T02:48:15.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用Feign ErrorDecoder检索原始消息\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-21T02:48:15.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用Feign ErrorDecoder检索原始消息 1. 概述 RESTful服务可能因多种原因失败。在本教程中，我们将探讨如何在集成REST服务抛出错误时从Feign客户端检索原始消息。 2. Feign客户端 Feign是一个可插拔且声明式的Web服务客户端，它使编写Web服务客户端变得更容易。除了Feign注解外，它还支持JAX-RS，并且支持..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. Feign客户端","slug":"_2-feign客户端","link":"#_2-feign客户端","children":[]},{"level":2,"title":"3. 从_ErrorDecoder_检索消息","slug":"_3-从-errordecoder-检索消息","link":"#_3-从-errordecoder-检索消息","children":[]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]},{"level":2,"title":"1. 概述","slug":"_1-概述-1","link":"#_1-概述-1","children":[]},{"level":2,"title":"2. Feign客户端","slug":"_2-feign客户端-1","link":"#_2-feign客户端-1","children":[]},{"level":2,"title":"3. 从_ErrorDecoder_检索消息","slug":"_3-从-errordecoder-检索消息-1","link":"#_3-从-errordecoder-检索消息-1","children":[]},{"level":2,"title":"4. 结论","slug":"_4-结论-1","link":"#_4-结论-1","children":[]}],"git":{"createdTime":1721530095000,"updatedTime":1721530095000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.47,"words":1342},"filePathRelative":"posts/baeldung/2024-07-21/2024-07-21-Retrieve Original Message From Feign ErrorDecoder.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>使用Feign ErrorDecoder检索原始消息</h1>\\n<h2><strong>1. 概述</strong></h2>\\n<p>RESTful服务可能因多种原因失败。在本教程中，我们将探讨如何在集成REST服务抛出错误时从Feign客户端检索原始消息。</p>\\n<h2><strong>2. Feign客户端</strong></h2>\\n<p>Feign是一个可插拔且声明式的Web服务客户端，它使编写Web服务客户端变得更容易。除了Feign注解外，它还支持JAX-RS，并且支持<strong>编码器和解码器以提供更多定制</strong>。</p>\\n<h2><strong>3. 从_ErrorDecoder_检索消息</strong></h2>","autoDesc":true}');export{u as comp,g as data};
