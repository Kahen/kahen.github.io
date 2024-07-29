import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-BUAgDejY.js";const e={},p=t(`<h1 id="使用servlets和jsp检查用户是否登录" tabindex="-1"><a class="header-anchor" href="#使用servlets和jsp检查用户是否登录"><span>使用Servlets和JSP检查用户是否登录</span></a></h1><p>在本教程中，我们将学习如何检查用户的登录情况，并确保用户使用有效的凭据填写了登录表单并启动了会话。**然而，我们将不使用Spring Security，只使用JSP和servlets。**因此，我们需要一个能够支持它的servlet容器，比如Tomcat 9。</p><p>通过本教程，我们将对底层工作机制有一个良好的理解。</p><h2 id="_2-持久化策略" tabindex="-1"><a class="header-anchor" href="#_2-持久化策略"><span>2. 持久化策略</span></a></h2><p>首先，我们需要用户。为了简单起见，我们将使用预加载的映射。让我们定义它以及我们的_User_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">User</span> <span class="token punctuation">{</span>
    <span class="token keyword">static</span> <span class="token class-name">HashMap</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">User</span><span class="token punctuation">&gt;</span></span>\` <span class="token constant">DB</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">static</span> <span class="token punctuation">{</span>
        <span class="token constant">DB</span><span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;user&quot;</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token string">&quot;user&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;pass&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// ...</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> password<span class="token punctuation">;</span>

    <span class="token comment">// getters and setters</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-过滤请求" tabindex="-1"><a class="header-anchor" href="#_3-过滤请求"><span>3. 过滤请求</span></a></h2><p>我们将通过创建一个过滤器来检查无会话请求，阻止直接访问我们的servlet：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@WebFilter</span><span class="token punctuation">(</span><span class="token string">&quot;/*&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UserCheckFilter</span> <span class="token keyword">implements</span> <span class="token class-name">Filter</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">doFilter</span><span class="token punctuation">(</span><span class="token class-name">ServletRequest</span> req<span class="token punctuation">,</span> <span class="token class-name">ServletResponse</span> res<span class="token punctuation">,</span> <span class="token class-name">FilterChain</span> chain<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// ...</span>
        request<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">&quot;origin&quot;</span><span class="token punctuation">,</span> request<span class="token punctuation">.</span><span class="token function">getRequestURI</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>request<span class="token punctuation">.</span><span class="token function">getRequestURI</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">&quot;login&quot;</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> request<span class="token punctuation">.</span><span class="token function">getSession</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">forward</span><span class="token punctuation">(</span>request<span class="token punctuation">,</span> response<span class="token punctuation">,</span> <span class="token string">&quot;/login.jsp&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        chain<span class="token punctuation">.</span><span class="token function">doFilter</span><span class="token punctuation">(</span>request<span class="token punctuation">,</span> response<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>**在这里，通过在_@WebFilter_上定义“<em>/*</em>”作为我们的URL模式，所有请求首先会通过我们的过滤器。**然后，如果没有会话，我们将请求重定向到我们的登录页面，存储_origin_以备后用。最后，我们提前返回，防止我们的servlet在没有适当会话的情况下处理。</p><h2 id="_4-使用jsp创建登录表单" tabindex="-1"><a class="header-anchor" href="#_4-使用jsp创建登录表单"><span>4. 使用JSP创建登录表单</span></a></h2><p>为了构建我们的登录表单，我们需要导入JSTL的核心标签库。同时，让我们在_page_指令中将_session_属性设置为“<em>false</em>”。结果，不会自动创建新会话，我们可以完全控制：</p><div class="language-jsp line-numbers-mode" data-ext="jsp" data-title="jsp"><pre class="language-jsp"><code>\`&lt;%@ page session=&quot;false&quot;%&gt;\`
\`&lt;%@ taglib uri=&quot;http://java.sun.com/jstl/core_rt&quot; prefix=&quot;c&quot;%&gt;\`

\`&lt;form action=&quot;login&quot; method=&quot;POST&quot;&gt;\`
    ...
\`&lt;/form&gt;\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，在我们的_form_内部，我们将有一个隐藏输入来保存_origin_：</p><div class="language-jsp line-numbers-mode" data-ext="jsp" data-title="jsp"><pre class="language-jsp"><code>\`&lt;input type=&quot;hidden&quot; name=&quot;origin&quot; value=&quot;\${origin}&quot;&gt;\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>接下来，我们将包括一个条件元素来输出错误：</p><div class="language-jsp line-numbers-mode" data-ext="jsp" data-title="jsp"><pre class="language-jsp"><code>\`&lt;c:if test=&quot;\${not empty error}&quot;&gt;\`
    * error: \${error}
\`&lt;/c:if&gt;\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，让我们添加一些_input_标签，以便用户可以输入并提交凭据：</p><div class="language-jsp line-numbers-mode" data-ext="jsp" data-title="jsp"><pre class="language-jsp"><code>\`&lt;input type=&quot;text&quot; name=&quot;name&quot;&gt;\`
\`&lt;input type=&quot;password&quot; name=&quot;password&quot;&gt;\`
\`&lt;input type=&quot;submit&quot;&gt;\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-设置我们的登录servlet" tabindex="-1"><a class="header-anchor" href="#_5-设置我们的登录servlet"><span>5. 设置我们的登录servlet</span></a></h2><p>在我们的servlet中，如果是_GET_，我们将转发请求到我们的登录表单。<strong>最重要的是，如果是_POST_，我们将验证登录</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@WebServlet</span><span class="token punctuation">(</span><span class="token string">&quot;/login&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UserCheckLoginServlet</span> <span class="token keyword">extends</span> <span class="token class-name">HttpServlet</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>所以，在我们的_doGet()_方法中，我们将重定向到我们的登录JSP，传递_origin_转发：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">doGet</span><span class="token punctuation">(</span><span class="token class-name">HttpServletRequest</span> request<span class="token punctuation">,</span> <span class="token class-name">HttpServletResponse</span> response<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> referer <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">)</span> request<span class="token punctuation">.</span><span class="token function">getAttribute</span><span class="token punctuation">(</span><span class="token string">&quot;origin&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    request<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">&quot;origin&quot;</span><span class="token punctuation">,</span> referer<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">forward</span><span class="token punctuation">(</span>request<span class="token punctuation">,</span> response<span class="token punctuation">,</span> <span class="token string">&quot;/login.jsp&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在我们的_doPost()<em>中，我们验证凭据并创建会话，传递_User_对象转发并重定向到_origin</em>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">doPost</span><span class="token punctuation">(</span><span class="token class-name">HttpServletRequest</span> request<span class="token punctuation">,</span> <span class="token class-name">HttpServletResponse</span> response<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> key <span class="token operator">=</span> request<span class="token punctuation">.</span><span class="token function">getParameter</span><span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> pass <span class="token operator">=</span> request<span class="token punctuation">.</span><span class="token function">getParameter</span><span class="token punctuation">(</span><span class="token string">&quot;password&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">User</span> user <span class="token operator">=</span> <span class="token class-name">User</span><span class="token punctuation">.</span><span class="token constant">DB</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>user<span class="token punctuation">.</span><span class="token function">getPassword</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>pass<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        request<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">&quot;error&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;invalid login&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">forward</span><span class="token punctuation">(</span>request<span class="token punctuation">,</span> response<span class="token punctuation">,</span> <span class="token string">&quot;/login.jsp&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token class-name">HttpSession</span> session <span class="token operator">=</span> request<span class="token punctuation">.</span><span class="token function">getSession</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    session<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">&quot;user&quot;</span><span class="token punctuation">,</span> user<span class="token punctuation">)</span><span class="token punctuation">;</span>

    response<span class="token punctuation">.</span><span class="token function">sendRedirect</span><span class="token punctuation">(</span>request<span class="token punctuation">.</span><span class="token function">getParameter</span><span class="token punctuation">(</span><span class="token string">&quot;origin&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>**如果凭据无效，我们将在我们的_error_变量中设置一条消息。**否则，我们使用_User_对象更新会话。</p><h2 id="_6-检查登录信息" tabindex="-1"><a class="header-anchor" href="#_6-检查登录信息"><span>6. 检查登录信息</span></a></h2><p>最后，让我们创建我们的主页。它只显示会话信息，并有一个注销链接：</p><div class="language-jsp line-numbers-mode" data-ext="jsp" data-title="jsp"><pre class="language-jsp"><code>\`&lt;body&gt;\`
    current session info: \${user.name}

    \`&lt;a href=&quot;logout&quot;&gt;\`logout\`&lt;/a&gt;\`
\`&lt;/body&gt;\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们所有的主页servlet所做的就是将_User_转发到主页：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@WebServlet</span><span class="token punctuation">(</span><span class="token string">&quot;/home&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UserCheckServlet</span> <span class="token keyword">extends</span> <span class="token class-name">HttpServlet</span> <span class="token punctuation">{</span>

    <span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">doGet</span><span class="token punctuation">(</span><span class="token class-name">HttpServletRequest</span> request<span class="token punctuation">,</span> <span class="token class-name">HttpServletResponse</span> response<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">User</span> user <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">User</span><span class="token punctuation">)</span> session<span class="token punctuation">.</span><span class="token function">getAttribute</span><span class="token punctuation">(</span><span class="token string">&quot;user&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        request<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">&quot;user&quot;</span><span class="token punctuation">,</span> user<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token function">forward</span><span class="token punctuation">(</span>request<span class="token punctuation">,</span> response<span class="token punctuation">,</span> <span class="token string">&quot;/home.jsp&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>它看起来是这样的： <img src="https://www.baeldung.com/wp-content/uploads/2022/02/login-success.png" alt="img" loading="lazy"></p><h2 id="_7-注销" tabindex="-1"><a class="header-anchor" href="#_7-注销"><span>7. 注销</span></a></h2><p><strong>要注销，我们只需使当前会话无效并重定向首页</strong>。之后，我们的_UserCheckFilter_将检测到无会话请求，并将我们重定向回登录页面，重新开始流程：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@WebServlet</span><span class="token punctuation">(</span><span class="token string">&quot;/logout&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UserCheckLogoutServlet</span> <span class="token keyword">extends</span> <span class="token class-name">HttpServlet</span> <span class="token punctuation">{</span>

    <span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">doGet</span><span class="token punctuation">(</span><span class="token class-name">HttpServletRequest</span> request<span class="token punctuation">,</span> <span class="token class-name">HttpServletResponse</span> response<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        request<span class="token punctuation">.</span><span class="token function">getSession</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">invalidate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        response<span class="token punctuation">.</span><span class="token function">sendRedirect</span><span class="token punctuation">(</span><span class="token string">&quot;./&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_8-结论" tabindex="-1"><a class="header-anchor" href="#_8-结论"><span>8. 结论</span></a></h2><p>在本文中，我们经历了创建完整的登录周期的过程。我们看到了我们现在如何完全控制对我们servlet的访问，使用单个过滤器。简而言之，通过这种方法，我们可以始终确保在需要的地方有一个有效的会话。同样，我们可以扩展该机制以实现更细粒度的访问控制。</p><p>如往常一样，源代码可在GitHub上获得。</p>`,39),o=[p];function c(l,i){return a(),s("div",null,o)}const d=n(e,[["render",c],["__file","2024-07-21-Check if a User Is Logged in With Servlets and JSP.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-21/2024-07-21-Check%20if%20a%20User%20Is%20Logged%20in%20With%20Servlets%20and%20JSP.html","title":"使用Servlets和JSP检查用户是否登录","lang":"zh-CN","frontmatter":{"date":"2022-02-01T00:00:00.000Z","category":["Servlets","JSP"],"tag":["Java","Login","Security"],"head":[["meta",{"name":"keywords","content":"Servlets, JSP, User Login, Session Management"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-21/2024-07-21-Check%20if%20a%20User%20Is%20Logged%20in%20With%20Servlets%20and%20JSP.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用Servlets和JSP检查用户是否登录"}],["meta",{"property":"og:description","content":"使用Servlets和JSP检查用户是否登录 在本教程中，我们将学习如何检查用户的登录情况，并确保用户使用有效的凭据填写了登录表单并启动了会话。**然而，我们将不使用Spring Security，只使用JSP和servlets。**因此，我们需要一个能够支持它的servlet容器，比如Tomcat 9。 通过本教程，我们将对底层工作机制有一个良好的理..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2022/02/login-success.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-21T10:42:15.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Login"}],["meta",{"property":"article:tag","content":"Security"}],["meta",{"property":"article:published_time","content":"2022-02-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-21T10:42:15.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用Servlets和JSP检查用户是否登录\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2022/02/login-success.png\\"],\\"datePublished\\":\\"2022-02-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-21T10:42:15.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用Servlets和JSP检查用户是否登录 在本教程中，我们将学习如何检查用户的登录情况，并确保用户使用有效的凭据填写了登录表单并启动了会话。**然而，我们将不使用Spring Security，只使用JSP和servlets。**因此，我们需要一个能够支持它的servlet容器，比如Tomcat 9。 通过本教程，我们将对底层工作机制有一个良好的理..."},"headers":[{"level":2,"title":"2. 持久化策略","slug":"_2-持久化策略","link":"#_2-持久化策略","children":[]},{"level":2,"title":"3. 过滤请求","slug":"_3-过滤请求","link":"#_3-过滤请求","children":[]},{"level":2,"title":"4. 使用JSP创建登录表单","slug":"_4-使用jsp创建登录表单","link":"#_4-使用jsp创建登录表单","children":[]},{"level":2,"title":"5. 设置我们的登录servlet","slug":"_5-设置我们的登录servlet","link":"#_5-设置我们的登录servlet","children":[]},{"level":2,"title":"6. 检查登录信息","slug":"_6-检查登录信息","link":"#_6-检查登录信息","children":[]},{"level":2,"title":"7. 注销","slug":"_7-注销","link":"#_7-注销","children":[]},{"level":2,"title":"8. 结论","slug":"_8-结论","link":"#_8-结论","children":[]}],"git":{"createdTime":1721558535000,"updatedTime":1721558535000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.64,"words":1091},"filePathRelative":"posts/baeldung/2024-07-21/2024-07-21-Check if a User Is Logged in With Servlets and JSP.md","localizedDate":"2022年2月1日","excerpt":"\\n<p>在本教程中，我们将学习如何检查用户的登录情况，并确保用户使用有效的凭据填写了登录表单并启动了会话。**然而，我们将不使用Spring Security，只使用JSP和servlets。**因此，我们需要一个能够支持它的servlet容器，比如Tomcat 9。</p>\\n<p>通过本教程，我们将对底层工作机制有一个良好的理解。</p>\\n<h2>2. 持久化策略</h2>\\n<p>首先，我们需要用户。为了简单起见，我们将使用预加载的映射。让我们定义它以及我们的_User_：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">User</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">static</span> <span class=\\"token class-name\\">HashMap</span>`<span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">String</span><span class=\\"token punctuation\\">,</span> <span class=\\"token class-name\\">User</span><span class=\\"token punctuation\\">&gt;</span></span>` <span class=\\"token constant\\">DB</span> <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">HashMap</span><span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token punctuation\\">&gt;</span></span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">static</span> <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token constant\\">DB</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">put</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"user\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">User</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"user\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"pass\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token comment\\">// ...</span>\\n    <span class=\\"token punctuation\\">}</span>\\n\\n    <span class=\\"token keyword\\">private</span> <span class=\\"token class-name\\">String</span> name<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">private</span> <span class=\\"token class-name\\">String</span> password<span class=\\"token punctuation\\">;</span>\\n\\n    <span class=\\"token comment\\">// getters and setters</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{d as comp,k as data};
