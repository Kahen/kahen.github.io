import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as a,a as r}from"./app-DflOUhLU.js";const n={},l=r('<h1 id="在java中为httpservletrequest设置参数" tabindex="-1"><a class="header-anchor" href="#在java中为httpservletrequest设置参数"><span>在Java中为HttpServletRequest设置参数</span></a></h1><p>当使用Servlet API开发Java Web应用程序时，_HttpServletRequest_对象在处理传入的HTTP请求中扮演着关键角色。它提供了对请求的各个方面的访问，例如参数、头和属性。</p><p>请求参数始终由HTTP客户端提供。然而，在某些场景中，我们可能需要在应用程序处理之前，在_HttpServletRequest_对象中以编程方式设置参数。</p><p>需要注意的是，**_HttpServletRequest_缺少添加新参数或更改参数值的setter方法。**在本文中，我们将探讨如何通过扩展原始_HttpServletRequest_的功能来实现这一点。</p><h2 id="_2-maven依赖项" tabindex="-1"><a class="header-anchor" href="#_2-maven依赖项"><span>2. Maven依赖项</span></a></h2><p>除了标准的Java Servlet API：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>``&lt;dependency&gt;``\n    ``&lt;groupId&gt;``javax.servlet``&lt;/groupId&gt;``\n    ``&lt;artifactId&gt;``javax.servlet-api``&lt;/artifactId&gt;``\n    ``&lt;version&gt;``4.0.1``&lt;/version&gt;``\n    `&lt;scope&gt;`provided`&lt;/scope&gt;`\n``&lt;/dependency&gt;``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们还将使用commons-text库在我们的一个用例中，通过转义HTML实体来清理请求参数：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>``&lt;dependency&gt;``\n    ``&lt;groupId&gt;``org.apache.commons``&lt;/groupId&gt;``\n    ``&lt;artifactId&gt;``commons-text``&lt;/artifactId&gt;``\n    ``&lt;version&gt;``1.10.0``&lt;/version&gt;``\n``&lt;/dependency&gt;``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-必要的servlet组件" tabindex="-1"><a class="header-anchor" href="#_3-必要的servlet组件"><span>3. 必要的Servlet组件</span></a></h2><p>在我们深入实际使用示例之前，让我们快速看一下我们将要使用的某些基础Servlet组件。</p><h3 id="_3-1-httpservletrequest" tabindex="-1"><a class="header-anchor" href="#_3-1-httpservletrequest"><span>3.1. <em>HttpServletRequest</em></span></a></h3><p>_HttpServletRequest_类是客户端和Servlets之间通信的主要方式。它<strong>封装了传入的HTTP请求</strong>，提供了对参数、头和其他请求相关信息的访问。</p><h3 id="_3-2-httpservletrequestwrapper" tabindex="-1"><a class="header-anchor" href="#_3-2-httpservletrequestwrapper"><span>3.2. <em>HttpServletRequestWrapper</em></span></a></h3><p>_HttpServletRequestWrapper_通过作为现有_HttpServletRequest_对象的装饰器来扩展_HttpServletRequest_的功能。这允许我们根据我们的特定需求<strong>附加额外的责任</strong>。</p><h3 id="_3-3-filter" tabindex="-1"><a class="header-anchor" href="#_3-3-filter"><span>3.3. <em>Filter</em></span></a></h3><p>_Filter_在Servlet容器中捕获并处理请求和响应。这些_Filter_被设计为在Servlet执行之前调用，使它们能够<strong>修改传入的请求和传出的响应</strong>。</p><h2 id="_4-参数清理" tabindex="-1"><a class="header-anchor" href="#_4-参数清理"><span>4. 参数清理</span></a></h2><p>在_HttpServletRequest_中以编程方式设置参数的一个应用是清理请求参数，有效地减轻跨站脚本（XSS）漏洞。<strong>这个过程涉及从用户输入中消除或编码潜在的有害字符，从而增强Web应用程序的安全性。</strong></p><h3 id="_4-1-示例" tabindex="-1"><a class="header-anchor" href="#_4-1-示例"><span>4.1. 示例</span></a></h3><p>现在，让我们详细探讨这个过程。首先，我们必须设置一个Servlet _Filter_来拦截请求。过滤器提供了一种在请求到达目标Servlet或JSP之前修改请求和响应的方法。</p><p>以下是一个Servlet _Filter_的具体示例，它拦截所有对特定URL模式的请求，确保过滤器链返回_SanitizeParametersRequestWrapper_而不是原始_HttpSevletRequest_对象：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@WebFilter(urlPatterns = {&quot;/sanitize/with-sanitize.jsp&quot;})\npublic class SanitizeParametersFilter implements Filter {\n\n    @Override\n    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)\n            throws IOException, ServletException {\n\n        HttpSerlvetRequest httpReq = (HttpSerlvetRequest) request;\n        chain.doFilter(new SanitizeParametersRequestWrapper(httpReq), response);\n    }\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>类_SanitizeParameterRequestWrapper_扩展了_HttpServletRequestWrapper_。这在参数清理过程中起着至关重要的作用。这个类被设计为清理原始_HttpServletRequest_的请求参数，并且只向调用JSP公开清理后的参数：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public class SanitizeParametersRequestWrapper extends HttpServletRequestWrapper {\n\n    private final Map````&lt;String, String[]&gt;```` sanitizedMap;\n\n    public SanitizeParametersRequestWrapper(HttpServletRequest request) {\n        super(request);\n        sanitizedMap = Collections.unmodifiableMap(\n            request.getParameterMap().entrySet().stream()\n                .collect(Collectors.toMap(\n                  Map.Entry::getKey,\n                  entry -&gt; Arrays.stream(entry.getValue())\n                    .map(StringEscapeUtils::escapeHtml4)\n                    .toArray(String[]::new)\n                )));\n    }\n\n    @Override\n    public Map````&lt;String, String[]&gt;```` getParameterMap() {\n        return sanitizedMap;\n    }\n\n    @Override\n    public String[] getParameterValues(String name) {\n        return Optional.ofNullable(getParameterMap().get(name))\n            .map(values -&gt; Arrays.copyOf(values, values.length))\n            .orElse(null);\n    }\n\n    @Override\n    public String getParameter(String name) {\n        return Optional.ofNullable(getParameterValues(name))\n            .map(values -&gt; values[0])\n            .orElse(null);\n    }\n\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在构造函数中，我们遍历每个请求参数并使用_StringEscapeUtils.escapeHtml4_来清理该值。处理后的参数被收集到一个新的清理后的映射中。</p><p>我们重写_getParameter_方法，以返回来自清理映射的相应参数，而不是原始请求参数。即使_getParameter_方法是主要的使用重点，重写_getParameterMap_和_getParameterValues_也是至关重要的。<strong>我们确保所有参数检索方法之间的一致行为，并在整个过程中保持安全标准。</strong></p><p>根据规范，_getParameterMap_方法保证返回一个不可修改的映射，防止更改内部值。**因此，遵守这个约定并确保重写也返回一个不可修改的映射是很重要的。**同样，重写的_getParameterValues_方法返回一个克隆的数组，而不是其内部值。</p><p>现在，让我们创建一个JSP来说明我们的工作。它简单地在屏幕上呈现_request_请求参数的值：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>The text below comes from request parameter &quot;input&quot;:`&lt;br/&gt;`\n`&lt;%=request.getParameter(&quot;input&quot;)%&gt;`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2-结果" tabindex="-1"><a class="header-anchor" href="#_4-2-结果"><span>4.2. 结果</span></a></h3><p>现在，让我们在未激活清理过滤器的情况下运行JSP。我们将向请求参数注入一个脚本标签，作为反射XSS：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>http://localhost:8080/sanitize/without-sanitize.jsp?input=```&lt;script&gt;```alert(&#39;Hello&#39;);```&lt;/script&gt;```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们将看到嵌入在参数中的JavaScript被浏览器执行：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/09/hello-popup.jpg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>接下来，我们将运行清理版本：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>http://localhost:8080/sanitize/with-sanitize.jsp?input=```&lt;script&gt;```alert(&#39;Hello&#39;);```&lt;/script&gt;```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在这种情况下，过滤器将捕获请求并将_SanitizeParameterRequestWrapper_传递给调用JSP。结果，弹出窗口将不再出现。相反，我们将观察到HTML实体被转义，并在屏幕上可见地呈现：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>The text below comes from request parameter &quot;input&quot;:\n```&lt;script&gt;```alert(&#39;Hello&#39;);```&lt;/script&gt;```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-第三方资源访问" tabindex="-1"><a class="header-anchor" href="#_5-第三方资源访问"><span>5. 第三方资源访问</span></a></h2><p>让我们考虑另一个场景，其中一个第三方模块接受一个请求参数_locale_来改变模块显示的语言。注意，我们无法直接修改第三方模块的源代码。</p><p>在我们的示例中，我们将_locale_参数设置为默认系统区域设置。然而，它也可以从另一个来源获取，例如HTTP会话。</p><h3 id="_5-1-示例" tabindex="-1"><a class="header-anchor" href="#_5-1-示例"><span>5.1. 示例</span></a></h3><p>第三方模块是一个JSP页面：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>`&lt;%\n    String localeStr = request.getParameter(&quot;locale&quot;);\n    Locale currentLocale = (localeStr != null ? new Locale(localeStr) : null);\n%&gt;`\nThe language you have selected: `&lt;%=currentLocale != null ? currentLocale.getDisplayLanguage(currentLocale) : &quot; None&quot;%&gt;`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果提供了_locale_参数，模块将显示语言名称。</p><p>我们将通过_SetParameterRequestWrapper_向目标请求参数提供默认系统语言_Locale.getDefault().getLanguage()<em>。为此，让我们在我们的_SetParameterRequestWrapper_中设置_locale_参数，它装饰了原始_HttpServletRequest</em>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@WebServlet(name = &quot;LanguageServlet&quot;, urlPatterns = &quot;/setparam/lang&quot;)\npublic class LanguageServlet extends HttpServlet {\n\n    @Override\n    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {\n\n        SetParameterRequestWrapper requestWrapper = new SetParameterRequestWrapper(request);\n        requestWrapper.setParameter(&quot;locale&quot;, Locale.getDefault().getLanguage());\n        request.getRequestDispatcher(&quot;/setparam/3rd_party_module.jsp&quot;).forward(requestWrapper, response);\n    }\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们将采取与前一节类似的方法来创建_SetParameterRequestWrapper_。此外，我们将实现_setParameter_方法，以向现有参数映射中添加一个新参数：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public class SetParameterRequestWrapper extends HttpServletRequestWrapper {\n\n    private final Map````&lt;String, String[]&gt;```` paramMap;\n\n    public SetParameterRequestWrapper(HttpServletRequest request) {\n        super(request);\n        paramMap = new HashMap&lt;&gt;(request.getParameterMap());\n    }\n\n    @Override\n    public Map````&lt;String, String[]&gt;```` getParameterMap() {\n        return Collections.unmodifiableMap(paramMap);\n    }\n\n    public void setParameter(String name, String value) {\n        paramMap.put(name, new String[] {value});\n    }\n\n    // getParameter() 和 getParameterValues() 与 SanitizeParametersRequestWrapper 相同\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>_getParameter_方法检索存储在_paramMap_中的参数，而不是原始请求。</p><h3 id="_5-2-结果" tabindex="-1"><a class="header-anchor" href="#_5-2-结果"><span>5.2. 结果</span></a></h3><p>_LangaugeServlet_通过_SetParameterRequestWrapper_将_locale_参数传递给第三方模块。当我们在英语语言服务器上访问第三方模块时，我们将看到以下内容：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>The language you have selected: English\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们查看了在Java Web应用程序开发中可以用于处理客户端请求的一些重要的Servlet组件。这些包括_HttpServletRequest_、<em>HttpServletRequestWrapper_和_Filter</em>。</p><p>通过具体示例，<strong>我们展示了如何扩展_HttpServletRequest_的功能，以编程方式设置和修改请求参数。</strong></p><p>无论是通过清理用户输入来增强安全性，还是与第三方资源集成，这些技术都使开发人员能够应对各种场景。</p><p>像往常一样，这个示例的完整源代码可以在GitHub上找到。</p><p><a href="https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg" target="_blank" rel="noopener noreferrer">Baeldung Logo</a><a href="https://secure.gravatar.com/avatar/e40831f54e3d08c1273e41e60a538c33?s=50&amp;r=g" target="_blank" rel="noopener noreferrer">Gravatar Profile Image</a><a href="https://www.baeldung.com/wp-content/uploads/custom_avatars/Liam-Williams-Baeldung-Editor-150x150.jpeg" target="_blank" rel="noopener noreferrer">Liam Williams Baeldung Editor</a><a href="https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png" target="_blank" rel="noopener noreferrer">Announcement Icon</a><a href="https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg" target="_blank" rel="noopener noreferrer">Baeldung REST POST Footer</a></p><p>OK</p>',61),i=[l];function s(d,p){return a(),t("div",null,i)}const c=e(n,[["render",s],["__file","2024-07-01-Set a Parameter in an HttpServletRequest in Java.html.vue"]]),o=JSON.parse('{"path":"/posts/baeldung/2024-07-01/2024-07-01-Set%20a%20Parameter%20in%20an%20HttpServletRequest%20in%20Java.html","title":"在Java中为HttpServletRequest设置参数","lang":"zh-CN","frontmatter":{"date":"2023-09-01T00:00:00.000Z","category":["Java","Servlet"],"tag":["HttpServletRequest","Java Web"],"head":[["meta",{"name":"keywords","content":"Java Servlet API, HttpServletRequest, request parameter, parameter sanitization, XSS"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-01/2024-07-01-Set%20a%20Parameter%20in%20an%20HttpServletRequest%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Java中为HttpServletRequest设置参数"}],["meta",{"property":"og:description","content":"在Java中为HttpServletRequest设置参数 当使用Servlet API开发Java Web应用程序时，_HttpServletRequest_对象在处理传入的HTTP请求中扮演着关键角色。它提供了对请求的各个方面的访问，例如参数、头和属性。 请求参数始终由HTTP客户端提供。然而，在某些场景中，我们可能需要在应用程序处理之前，在_Ht..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2023/09/hello-popup.jpg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-01T02:08:55.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"HttpServletRequest"}],["meta",{"property":"article:tag","content":"Java Web"}],["meta",{"property":"article:published_time","content":"2023-09-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-01T02:08:55.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Java中为HttpServletRequest设置参数\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2023/09/hello-popup.jpg\\"],\\"datePublished\\":\\"2023-09-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-01T02:08:55.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Java中为HttpServletRequest设置参数 当使用Servlet API开发Java Web应用程序时，_HttpServletRequest_对象在处理传入的HTTP请求中扮演着关键角色。它提供了对请求的各个方面的访问，例如参数、头和属性。 请求参数始终由HTTP客户端提供。然而，在某些场景中，我们可能需要在应用程序处理之前，在_Ht..."},"headers":[{"level":2,"title":"2. Maven依赖项","slug":"_2-maven依赖项","link":"#_2-maven依赖项","children":[]},{"level":2,"title":"3. 必要的Servlet组件","slug":"_3-必要的servlet组件","link":"#_3-必要的servlet组件","children":[{"level":3,"title":"3.1. HttpServletRequest","slug":"_3-1-httpservletrequest","link":"#_3-1-httpservletrequest","children":[]},{"level":3,"title":"3.2. HttpServletRequestWrapper","slug":"_3-2-httpservletrequestwrapper","link":"#_3-2-httpservletrequestwrapper","children":[]},{"level":3,"title":"3.3. Filter","slug":"_3-3-filter","link":"#_3-3-filter","children":[]}]},{"level":2,"title":"4. 参数清理","slug":"_4-参数清理","link":"#_4-参数清理","children":[{"level":3,"title":"4.1. 示例","slug":"_4-1-示例","link":"#_4-1-示例","children":[]},{"level":3,"title":"4.2. 结果","slug":"_4-2-结果","link":"#_4-2-结果","children":[]}]},{"level":2,"title":"5. 第三方资源访问","slug":"_5-第三方资源访问","link":"#_5-第三方资源访问","children":[{"level":3,"title":"5.1. 示例","slug":"_5-1-示例","link":"#_5-1-示例","children":[]},{"level":3,"title":"5.2. 结果","slug":"_5-2-结果","link":"#_5-2-结果","children":[]}]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1719799735000,"updatedTime":1719799735000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":6.1,"words":1831},"filePathRelative":"posts/baeldung/2024-07-01/2024-07-01-Set a Parameter in an HttpServletRequest in Java.md","localizedDate":"2023年9月1日","excerpt":"\\n<p>当使用Servlet API开发Java Web应用程序时，_HttpServletRequest_对象在处理传入的HTTP请求中扮演着关键角色。它提供了对请求的各个方面的访问，例如参数、头和属性。</p>\\n<p>请求参数始终由HTTP客户端提供。然而，在某些场景中，我们可能需要在应用程序处理之前，在_HttpServletRequest_对象中以编程方式设置参数。</p>\\n<p>需要注意的是，**_HttpServletRequest_缺少添加新参数或更改参数值的setter方法。**在本文中，我们将探讨如何通过扩展原始_HttpServletRequest_的功能来实现这一点。</p>","autoDesc":true}');export{c as comp,o as data};
