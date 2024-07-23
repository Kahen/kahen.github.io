import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-LwwahXlT.js";const e={},p=t(`<h1 id="使用spring-reactive-webclient将flux-databuffer-读取为单个inputstream" tabindex="-1"><a class="header-anchor" href="#使用spring-reactive-webclient将flux-databuffer-读取为单个inputstream"><span>使用Spring Reactive WebClient将Flux<code>&lt;DataBuffer&gt;</code>读取为单个InputStream</span></a></h1><p>在本教程中，我们将深入探讨Java响应式编程，以解决一个有趣的问题：如何将Flux<code>&lt;DataBuffer&gt;</code>读取为单个InputStream。</p><h2 id="_2-请求设置" tabindex="-1"><a class="header-anchor" href="#_2-请求设置"><span>2. 请求设置</span></a></h2><p>作为将Flux<code>&lt;DataBuffer&gt;</code>读取为单个InputStream问题的第一步，我们将使用Spring响应式WebClient进行GET请求。此外，我们可以使用由gorest.co.in托管的公共API端点进行此类测试场景：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> <span class="token constant">REQUEST_ENDPOINT</span> <span class="token operator">=</span> <span class="token string">&quot;https://gorest.co.in/public/v2/users&quot;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>接下来，让我们定义getWebClient()方法以获取WebClient类的实例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token class-name">WebClient</span> <span class="token function">getWebClient</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">WebClient<span class="token punctuation">.</span>Builder</span> webClientBuilder <span class="token operator">=</span> <span class="token class-name">WebClient</span><span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> webClientBuilder<span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时，我们已准备好向/public/v2/users端点发出GET请求。然而，我们必须以Flux<code>&lt;DataBuffer&gt;</code>对象的形式获取响应体。因此，让我们继续阅读下一节关于BodyExtractors的内容，以实现这一目标。</p><h2 id="_3-bodyextractors和databufferutils" tabindex="-1"><a class="header-anchor" href="#_3-bodyextractors和databufferutils"><span>3. BodyExtractors和DataBufferUtils</span></a></h2><p>我们可以使用spring-webflux中BodyExtractors类提供的toDataBuffers()方法将响应体提取为Flux<code>&lt;DataBuffer&gt;</code>。</p><p>让我们继续创建body作为Flux<code>&lt;DataBuffer&gt;</code>类型的实例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Flux</span>\`\`\`\`\`\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">DataBuffer</span><span class="token punctuation">&gt;</span></span>\`\`\`\`\`\`\`\`\` body <span class="token operator">=</span> client
  <span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>
  <span class="token punctuation">.</span><span class="token function">uri</span><span class="token punctuation">(</span><span class="token constant">REQUEST_ENDPOINT</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">exchangeToFlux</span><span class="token punctuation">(</span> clientResponse <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> clientResponse<span class="token punctuation">.</span><span class="token function">body</span><span class="token punctuation">(</span><span class="token class-name">BodyExtractors</span><span class="token punctuation">.</span><span class="token function">toDataBuffers</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，由于我们需要将这些DataBuffer流收集到单个InputStream中，实现这一目标的一个好策略是使用PipedInputStream和PipedOutputStream。</p><p>此外，我们打算写入PipedOutputStream，最终从PipedInputStream读取。那么，让我们看看如何创建这两个连接的流：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">PipedOutputStream</span> outputStream <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PipedOutputStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">PipedInputStream</span> inputStream <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PipedInputStream</span><span class="token punctuation">(</span><span class="token number">1024</span><span class="token operator">*</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
inputStream<span class="token punctuation">.</span><span class="token function">connect</span><span class="token punctuation">(</span>outputStream<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们必须注意，默认大小为1024字节。然而，我们预期从Flux<code>&lt;DataBuffer&gt;</code>收集的结果可能会超过默认值。因此，我们需要明确指定一个更大的大小值，这里的情况是1024*10。</p><p>最后，我们使用DataBufferUtils类中提供的write()实用方法将body作为发布者写入outputStream：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">DataBufferUtils</span><span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>body<span class="token punctuation">,</span> outputStream<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">subscribe</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们必须注意，在声明时我们将inputStream连接到了outputStream。因此，我们可以从inputStream读取。让我们继续阅读下一节，看看这在实践中是如何工作的。</p><h2 id="_4-从pipedinputstream读取" tabindex="-1"><a class="header-anchor" href="#_4-从pipedinputstream读取"><span>4. 从PipedInputStream读取</span></a></h2><p>首先，让我们定义一个辅助方法readContent()，将InputStream作为String对象读取：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> <span class="token function">readContent</span><span class="token punctuation">(</span><span class="token class-name">InputStream</span> stream<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token class-name">StringBuffer</span> contentStringBuffer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringBuffer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> tmp <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">byte</span><span class="token punctuation">[</span>stream<span class="token punctuation">.</span><span class="token function">available</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> byteCount <span class="token operator">=</span> stream<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span>tmp<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> tmp<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">;</span>
    contentStringBuffer<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span>tmp<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>contentStringBuffer<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，因为通常的做法是在不同的线程中读取PipedInputStream，让我们创建readContentFromPipedInputStream()方法，该方法内部生成一个新线程，通过调用readContent()方法将PipedInputStream中的内容读取为String对象：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> <span class="token function">readContentFromPipedInputStream</span><span class="token punctuation">(</span><span class="token class-name">PipedInputStream</span> stream<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token class-name">StringBuffer</span> contentStringBuffer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringBuffer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token class-name">Thread</span> pipeReader <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
            <span class="token keyword">try</span> <span class="token punctuation">{</span>
                contentStringBuffer<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token function">readContent</span><span class="token punctuation">(</span>stream<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IOException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        pipeReader<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        pipeReader<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
        stream<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>contentStringBuffer<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个阶段，我们的代码已经准备好用于模拟。让我们看看它在实践中是如何工作的：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">WebClient</span> webClient <span class="token operator">=</span> <span class="token function">getWebClient</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">InputStream</span> inputStream <span class="token operator">=</span> <span class="token function">getResponseAsInputStream</span><span class="token punctuation">(</span>webClient<span class="token punctuation">,</span> <span class="token constant">REQUEST_ENDPOINT</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">3000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> content <span class="token operator">=</span> <span class="token function">readContentFromPipedInputStream</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token class-name">PipedInputStream</span><span class="token punctuation">)</span> inputStream<span class="token punctuation">)</span><span class="token punctuation">;</span>
logger<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;response content: \\n{}&quot;</span><span class="token punctuation">,</span> content<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token string">&quot;}&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;}}\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于我们正在处理一个异步系统，我们在从流中读取之前任意延迟了3秒钟，以便我们能够看到完整的响应。此外，在记录时，我们插入了一个换行符，将长输出分解为多行。</p><p>最后，让我们验证代码执行生成的输出：</p><div class="language-plaintext line-numbers-mode" data-ext="plaintext" data-title="plaintext"><pre class="language-plaintext"><code>20:45:04.120 [main] INFO com.baeldung.databuffer.DataBufferToInputStream - response content:
[{&quot;id&quot;:2642,&quot;name&quot;:&quot;Bhupen Trivedi&quot;,&quot;email&quot;:&quot;bhupen_trivedi@renner-pagac.name&quot;,&quot;gender&quot;:&quot;male&quot;,&quot;status&quot;:&quot;active&quot;}
,{&quot;id&quot;:2637,&quot;name&quot;:&quot;Preity Patel&quot;,&quot;email&quot;:&quot;patel_preity@abshire.info&quot;,&quot;gender&quot;:&quot;female&quot;,&quot;status&quot;:&quot;inactive&quot;}
,{&quot;id&quot;:2633,&quot;name&quot;:&quot;Brijesh Shah&quot;,&quot;email&quot;:&quot;brijesh_shah@morar.co&quot;,&quot;gender&quot;:&quot;male&quot;,&quot;status&quot;:&quot;inactive&quot;}
...
{&quot;id&quot;:2623,&quot;name&quot;:&quot;Mohini Mishra&quot;,&quot;email&quot;:&quot;mishra_mohini@hamill-ledner.info&quot;,&quot;gender&quot;:&quot;female&quot;,&quot;status&quot;:&quot;inactive&quot;}
]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>就是这样！看起来我们已经完全正确了。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们使用了管道流的概念以及BodyExtractors和DataBufferUtils类中提供的实用方法，将Flux<code>&lt;DataBuffer&gt;</code>读取为单个InputStream。</p><p>一如既往，本教程的完整源代码可在GitHub上获得。</p>`,33),o=[p];function c(u,i){return s(),a("div",null,o)}const d=n(e,[["render",c],["__file","2024-07-16-Reading Flux Into a Single InputStream Using Spring Reactive WebClient.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-16/2024-07-16-Reading%20Flux%20Into%20a%20Single%20InputStream%20Using%20Spring%20Reactive%20WebClient.html","title":"使用Spring Reactive WebClient将Flux<DataBuffer>读取为单个InputStream","lang":"zh-CN","frontmatter":{"date":"2024-07-17T00:00:00.000Z","category":["Spring","Reactive Programming"],"tag":["WebClient","Flux","InputStream"],"head":[["meta",{"name":"keywords","content":"Java, Reactive Programming, Spring, WebClient, Flux, InputStream"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-16/2024-07-16-Reading%20Flux%20Into%20a%20Single%20InputStream%20Using%20Spring%20Reactive%20WebClient.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用Spring Reactive WebClient将Flux<DataBuffer>读取为单个InputStream"}],["meta",{"property":"og:description","content":"使用Spring Reactive WebClient将Flux<DataBuffer>读取为单个InputStream 在本教程中，我们将深入探讨Java响应式编程，以解决一个有趣的问题：如何将Flux<DataBuffer>读取为单个InputStream。 2. 请求设置 作为将Flux<DataBuffer>读取为单个InputStream问题..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-16T21:28:51.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"WebClient"}],["meta",{"property":"article:tag","content":"Flux"}],["meta",{"property":"article:tag","content":"InputStream"}],["meta",{"property":"article:published_time","content":"2024-07-17T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-16T21:28:51.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用Spring Reactive WebClient将Flux<DataBuffer>读取为单个InputStream\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-17T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-16T21:28:51.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用Spring Reactive WebClient将Flux<DataBuffer>读取为单个InputStream 在本教程中，我们将深入探讨Java响应式编程，以解决一个有趣的问题：如何将Flux<DataBuffer>读取为单个InputStream。 2. 请求设置 作为将Flux<DataBuffer>读取为单个InputStream问题..."},"headers":[{"level":2,"title":"2. 请求设置","slug":"_2-请求设置","link":"#_2-请求设置","children":[]},{"level":2,"title":"3. BodyExtractors和DataBufferUtils","slug":"_3-bodyextractors和databufferutils","link":"#_3-bodyextractors和databufferutils","children":[]},{"level":2,"title":"4. 从PipedInputStream读取","slug":"_4-从pipedinputstream读取","link":"#_4-从pipedinputstream读取","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1721165331000,"updatedTime":1721165331000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.19,"words":958},"filePathRelative":"posts/baeldung/2024-07-16/2024-07-16-Reading Flux Into a Single InputStream Using Spring Reactive WebClient.md","localizedDate":"2024年7月17日","excerpt":"\\n<p>在本教程中，我们将深入探讨Java响应式编程，以解决一个有趣的问题：如何将Flux<code>&lt;DataBuffer&gt;</code>读取为单个InputStream。</p>\\n<h2>2. 请求设置</h2>\\n<p>作为将Flux<code>&lt;DataBuffer&gt;</code>读取为单个InputStream问题的第一步，我们将使用Spring响应式WebClient进行GET请求。此外，我们可以使用由gorest.co.in托管的公共API端点进行此类测试场景：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token class-name\\">String</span> <span class=\\"token constant\\">REQUEST_ENDPOINT</span> <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\\"https://gorest.co.in/public/v2/users\\"</span><span class=\\"token punctuation\\">;</span>\\n</code></pre></div>","autoDesc":true}');export{d as comp,k as data};
