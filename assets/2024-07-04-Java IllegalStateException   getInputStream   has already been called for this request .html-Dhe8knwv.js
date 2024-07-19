import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as e}from"./app-D5kFWV-m.js";const t={},p=e(`<h1 id="java-web应用中servletrequest的illegalstateexception异常解析与解决方法" tabindex="-1"><a class="header-anchor" href="#java-web应用中servletrequest的illegalstateexception异常解析与解决方法"><span>Java Web应用中ServletRequest的IllegalStateException异常解析与解决方法</span></a></h1><ol><li>引言</li></ol><p>在Java Web应用中，有时我们在调用ServletRequest接口的getReader()方法时可能会遇到IllegalStateException异常，错误信息为“getInputStream()已经为这个请求调用过了”。</p><p>本教程将学习为什么会发生这种情况以及如何解决。</p><ol start="2"><li>问题及原因</li></ol><p>Java Servlet规范为构建Java Web应用提供定义，它定义了ServletRequest/HttpServletRequest接口，其中包含getReader()和getInputStream()方法用于从HTTP请求中读取数据。</p><p>getReader()方法以字符数据的形式检索请求体，而getInputStream()以二进制数据的形式检索请求体。</p><p>Servlet API文档对getReader()和getInputStream()强调它们不能同时使用：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name"><span class="token namespace">java<span class="token punctuation">.</span>io<span class="token punctuation">.</span></span>BufferedReader</span> <span class="token function">getReader</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    要么调用此方法要么调用getInputStream来读取请求体，不能同时调用两者。
    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
    抛出：
    <span class="token class-name"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span></span>IllegalStateException</span> <span class="token operator">-</span> 如果在此请求上已经调用了<span class="token function">getInputStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法

<span class="token keyword">public</span> <span class="token class-name">ServletInputStream</span> <span class="token function">getInputStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    要么调用此方法要么调用getReader来读取请求体，不能同时调用两者。
    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
    抛出：
    <span class="token class-name"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span></span>IllegalStateException</span> <span class="token operator">-</span> 如果已经为这个请求调用了<span class="token function">getReader</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因此，使用Tomcat Servlet容器时，如果我们在调用getInputStream()之后调用getReader()，我们会得到IllegalStateException：“getInputStream()已经为这个请求调用过了”。如果我们在调用getReader()之后调用getInputStream()，我们会得到IllegalStateException：“getReader()已经为这个请求调用过了”。</p><p>这里有一个测试来重现这种情况：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">shouldThrowIllegalStateExceptionWhenCalling_getReaderAfter_getInputStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token class-name">HttpServletRequest</span> request <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MockHttpServletRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">ServletInputStream</span> ignored <span class="token operator">=</span> request<span class="token punctuation">.</span><span class="token function">getInputStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">IllegalStateException</span> exception <span class="token operator">=</span> <span class="token function">assertThrows</span><span class="token punctuation">(</span><span class="token class-name">IllegalStateException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> request<span class="token operator">::</span><span class="token function">getReader</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Cannot call getReader() after getInputStream() has already been called for the current request&quot;</span><span class="token punctuation">,</span>
                      exception<span class="token punctuation">.</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们使用MockHttpServletRequest来模拟这种情况。如果我们在调用getReader()之后调用getInputStream()，我们会得到类似的错误消息。不同实现中的错误消息可能会略有不同。</p><ol start="3"><li>使用ContentCachingRequestWrapper避免IllegalStateException</li></ol><p>那么我们如何在应用程序中避免这种异常呢？一个简单的方法是避免同时调用它们。但是一些Web框架可能在我们代码之前读取请求中的数据。如果我们想多次检查输入流，使用Spring MVC框架提供的ContentCachingRequestWrapper是一个很好的选择。</p><p>让我们看看ContentCachingRequestWrapper的核心部分：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ContentCachingRequestWrapper</span> <span class="token keyword">extends</span> <span class="token class-name">HttpServletRequestWrapper</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">ByteArrayOutputStream</span> cachedContent<span class="token punctuation">;</span>
    <span class="token comment">//....</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">ServletInputStream</span> <span class="token function">getInputStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>inputStream <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>inputStream <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ContentCachingInputStream</span><span class="token punctuation">(</span><span class="token function">getRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getInputStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>inputStream<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">BufferedReader</span> <span class="token function">getReader</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>reader <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>reader <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BufferedReader</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">InputStreamReader</span><span class="token punctuation">(</span><span class="token function">getInputStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">getCharacterEncoding</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>reader<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">getContentAsByteArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>cachedContent<span class="token punctuation">.</span><span class="token function">toByteArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//....</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>ContentCachingRequestWrapper按照装饰者模式包装ServletRequest对象。它覆盖了getInputStream()和getReader()方法，以避免抛出IllegalStateException。它还定义了一个ContentCachingInputStream来包装原始的ServletInputStream，将数据缓存到一个输出流中。</p><p>在我们从请求对象中读取数据之后，ContentCachingInputStream帮助我们将字节缓存到类型为ByteArrayOutputStream的cachedContent对象中。然后我们可以通过调用它的getContentAsByteArray()方法重复读取数据。</p><p>在我们使用ContentCachingRequestWrapper之前，我们需要创建一个过滤器将ServletRequest转换为ContentCachingRequestWrapper：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@WebFilter</span><span class="token punctuation">(</span>urlPatterns <span class="token operator">=</span> <span class="token string">&quot;/*&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CacheRequestContentFilter</span> <span class="token keyword">implements</span> <span class="token class-name">Filter</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">doFilter</span><span class="token punctuation">(</span><span class="token class-name">ServletRequest</span> request<span class="token punctuation">,</span> <span class="token class-name">ServletResponse</span> response<span class="token punctuation">,</span> <span class="token class-name">FilterChain</span> chain<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">ServletException</span><span class="token punctuation">,</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>request <span class="token keyword">instanceof</span> <span class="token class-name">HttpServletRequest</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">String</span> contentType <span class="token operator">=</span> request<span class="token punctuation">.</span><span class="token function">getContentType</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>contentType <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> <span class="token operator">!</span>contentType<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">&quot;multipart/form-data&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                request <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ContentCachingRequestWrapper</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token class-name">HttpServletRequest</span><span class="token punctuation">)</span> request<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        chain<span class="token punctuation">.</span><span class="token function">doFilter</span><span class="token punctuation">(</span>request<span class="token punctuation">,</span> response<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，我们创建一个测试以确保它按预期工作：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenServletRequest_whenDoFilter_thenCanCallBoth</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">ServletException</span><span class="token punctuation">,</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token class-name">MockHttpServletRequest</span> req <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MockHttpServletRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">MockHttpServletResponse</span> res <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MockHttpServletResponse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">MockFilterChain</span> chain <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MockFilterChain</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">Filter</span> filter <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CacheRequestContentFilter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    filter<span class="token punctuation">.</span><span class="token function">doFilter</span><span class="token punctuation">(</span>req<span class="token punctuation">,</span> res<span class="token punctuation">,</span> chain<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">ServletRequest</span> request <span class="token operator">=</span> chain<span class="token punctuation">.</span><span class="token function">getRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertTrue</span><span class="token punctuation">(</span>request <span class="token keyword">instanceof</span> <span class="token class-name">ContentCachingRequestWrapper</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 现在我们可以同时调用getInputStream()和getReader()</span>
    request<span class="token punctuation">.</span><span class="token function">getInputStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    request<span class="token punctuation">.</span><span class="token function">getReader</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>实际上，ContentCachingRequestWrapper有一个限制，我们不能多次读取请求。尽管我们采用了ContentCachingRequestWrapper，我们仍然从请求对象的ServletInputStream中读取字节。然而，默认的ServletInputStream实例不支持多次读取数据。当我们到达流的末尾时，调用ServletInputStream.read()将始终返回-1。</p><p>如果我们想克服这个限制，我们需要自己实现ServletRequest。</p><ol start="4"><li>结论</li></ol><p>在本文中，我们查看了ServletRequest的文档，并理解了为什么会得到IllegalStateException。然后，我们学习了使用Spring MVC框架提供的ContentCachingRequestWrapper的解决方案。</p><p>像往常一样，这里展示的所有代码片段都可以在GitHub上找到。</p>`,28),o=[p];function c(l,i){return s(),a("div",null,o)}const k=n(t,[["render",c],["__file","2024-07-04-Java IllegalStateException   getInputStream   has already been called for this request .html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-04/2024-07-04-Java%20IllegalStateException%20%20%20getInputStream%20%20%20has%20already%20been%20called%20for%20this%20request%20.html","title":"Java Web应用中ServletRequest的IllegalStateException异常解析与解决方法","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Servlet"],"tag":["IllegalStateException","ServletRequest","getReader","getInputStream"],"head":[["meta",{"name":"keywords","content":"Java, Servlet, IllegalStateException, getReader, getInputStream"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-04/2024-07-04-Java%20IllegalStateException%20%20%20getInputStream%20%20%20has%20already%20been%20called%20for%20this%20request%20.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java Web应用中ServletRequest的IllegalStateException异常解析与解决方法"}],["meta",{"property":"og:description","content":"Java Web应用中ServletRequest的IllegalStateException异常解析与解决方法 引言 在Java Web应用中，有时我们在调用ServletRequest接口的getReader()方法时可能会遇到IllegalStateException异常，错误信息为“getInputStream()已经为这个请求调用过了”。 本..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-04T09:36:41.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"IllegalStateException"}],["meta",{"property":"article:tag","content":"ServletRequest"}],["meta",{"property":"article:tag","content":"getReader"}],["meta",{"property":"article:tag","content":"getInputStream"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-04T09:36:41.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java Web应用中ServletRequest的IllegalStateException异常解析与解决方法\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-04T09:36:41.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java Web应用中ServletRequest的IllegalStateException异常解析与解决方法 引言 在Java Web应用中，有时我们在调用ServletRequest接口的getReader()方法时可能会遇到IllegalStateException异常，错误信息为“getInputStream()已经为这个请求调用过了”。 本..."},"headers":[],"git":{"createdTime":1720085801000,"updatedTime":1720085801000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.52,"words":1057},"filePathRelative":"posts/baeldung/2024-07-04/2024-07-04-Java IllegalStateException   getInputStream   has already been called for this request .md","localizedDate":"2022年4月1日","excerpt":"\\n<ol>\\n<li>引言</li>\\n</ol>\\n<p>在Java Web应用中，有时我们在调用ServletRequest接口的getReader()方法时可能会遇到IllegalStateException异常，错误信息为“getInputStream()已经为这个请求调用过了”。</p>\\n<p>本教程将学习为什么会发生这种情况以及如何解决。</p>\\n<ol start=\\"2\\">\\n<li>问题及原因</li>\\n</ol>\\n<p>Java Servlet规范为构建Java Web应用提供定义，它定义了ServletRequest/HttpServletRequest接口，其中包含getReader()和getInputStream()方法用于从HTTP请求中读取数据。</p>","autoDesc":true}');export{k as comp,d as data};
