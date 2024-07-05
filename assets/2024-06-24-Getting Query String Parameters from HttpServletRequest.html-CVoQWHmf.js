import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-BaAI5AMv.js";const e={},p=t(`<hr><h1 id="从httpservletrequest获取查询字符串参数" tabindex="-1"><a class="header-anchor" href="#从httpservletrequest获取查询字符串参数"><span>从HttpServletRequest获取查询字符串参数</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>后端HTTP API开发中最重要的能力之一是解析前端传递的请求查询参数。</p><p>在本教程中，我们将介绍几种直接从_HttpServletRequest_获取查询参数的方法，以及Spring MVC提供的一些简洁方式。</p><h2 id="_2-httpservletrequest-中的方法" tabindex="-1"><a class="header-anchor" href="#_2-httpservletrequest-中的方法"><span>2. _HttpServletRequest_中的方法</span></a></h2><p>首先，我们来看看_HttpServletRequest_提供的与参数相关的方法。</p><h3 id="_2-1-httpservletrequest-getquerystring" tabindex="-1"><a class="header-anchor" href="#_2-1-httpservletrequest-getquerystring"><span>2.1. <em>HttpServletRequest#getQueryString()</em></span></a></h3><p>这个示例展示了我们可以通过调用方法_HttpServletRequest#getQueryString()_直接从URL获取的内容：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/api/byGetQueryString&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">byGetQueryString</span><span class="token punctuation">(</span><span class="token class-name">HttpServletRequest</span> request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> request<span class="token punctuation">.</span><span class="token function">getQueryString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当我们使用curl向这个API发送带有多个参数的GET请求时，方法_getQueryString()_只返回‘?’后的所有字符：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">curl</span> <span class="token string">&#39;http://127.0.0.1:8080/spring-mvc-basics/api/byGetQueryString?username=bob&amp;roles=admin&amp;roles=stuff&#39;</span>
<span class="token assign-left variable">username</span><span class="token operator">=</span>bob<span class="token operator">&amp;</span><span class="token assign-left variable">roles</span><span class="token operator">=</span>admin<span class="token operator">&amp;</span><span class="token assign-left variable">roles</span><span class="token operator">=</span>stuff
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>注意，如果我们将_@GetMapping_更改为_@RequestMapping_，当我们使用POST/PUT/PATCH/DELETE HTTP方法发送请求时，它将返回相同的响应。这意味着无论HTTP方法是什么，_HttpServletRequest_始终会获取查询字符串。因此，我们可以只关注本教程中的GET请求。为了简化我们演示_HttpServletRequest_提供的方法，我们还将使用相同的请求参数在以下每个示例中。</p><h3 id="_2-2-httpservletrequest-getparameter-string" tabindex="-1"><a class="header-anchor" href="#_2-2-httpservletrequest-getparameter-string"><span>2.2. <em>HttpServletRequest#getParameter(String)</em></span></a></h3><p>为了简化参数解析，<em>HttpServletRequest_提供了一个方法_getParameter</em>，通过参数名称获取值：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/api/byGetParameter&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">byGetParameter</span><span class="token punctuation">(</span><span class="token class-name">HttpServletRequest</span> request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> username <span class="token operator">=</span> request<span class="token punctuation">.</span><span class="token function">getParameter</span><span class="token punctuation">(</span><span class="token string">&quot;username&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token string">&quot;username:&quot;</span> <span class="token operator">+</span> username<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当我们发送带有_querystring_的GET请求_username=bob_时，调用_getParameter(&quot;username&quot;)<em>返回_bob</em>。</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">curl</span> <span class="token string">&#39;http://127.0.0.1:8080/spring-mvc-basics/api/byGetParameter?username=bob&amp;roles=admin&amp;roles=stuff&#39;</span>
username:bob
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3-httpservletrequest-getparametervalues-string" tabindex="-1"><a class="header-anchor" href="#_2-3-httpservletrequest-getparametervalues-string"><span>2.3. <em>HttpServletRequest#getParameterValues(String)</em></span></a></h3><p>方法_getParameterValues_的行为类似于_getParameter_方法，但它返回一个_String[]<em>而不是一个_String</em>。这是由于HTTP规范允许传递具有相同名称的多个参数。</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/api/byGetParameterValues&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">byGetParameterValues</span><span class="token punctuation">(</span><span class="token class-name">HttpServletRequest</span> request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> roles <span class="token operator">=</span> request<span class="token punctuation">.</span><span class="token function">getParameterValues</span><span class="token punctuation">(</span><span class="token string">&quot;roles&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token string">&quot;roles:&quot;</span> <span class="token operator">+</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span>roles<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因此，当我们两次传递参数_roles_的值时，我们应该在数组中得到两个值：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">curl</span> <span class="token string">&#39;http://127.0.0.1:8080/spring-mvc-basics/api/byGetParameterValues?username=bob&amp;roles=admin&amp;roles=stuff&#39;</span>
roles:<span class="token punctuation">[</span>admin, stuff<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-4-httpservletrequest-getparametermap" tabindex="-1"><a class="header-anchor" href="#_2-4-httpservletrequest-getparametermap"><span>2.4. <em>HttpServletRequest#getParameterMap()</em></span></a></h3><p>假设我们有以下_UserDto_ POJO作为以下JSON API示例的一部分：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UserDto</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> username<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">List</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\` roles<span class="token punctuation">;</span>
    <span class="token comment">// 标准getter/setter...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如我们所见，可以有一个或多个值的不同参数名称。对于这些情况，<em>HttpServletRequest_提供了另一种方法，<em>getParameterMap()</em>，它返回一个_Map<code>&lt;String, String[]&gt;</code></em>。这个方法允许我们使用_Map_获取参数值。</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/api/byGetParameterMap&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token class-name">UserDto</span> <span class="token function">byGetParameterMap</span><span class="token punctuation">(</span><span class="token class-name">HttpServletRequest</span> request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Map</span>\`\`<span class="token operator">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">&gt;</span>\`\` parameterMap <span class="token operator">=</span> request<span class="token punctuation">.</span><span class="token function">getParameterMap</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> usernames <span class="token operator">=</span> parameterMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;username&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> roles <span class="token operator">=</span> parameterMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;roles&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">UserDto</span> userDto <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">UserDto</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    userDto<span class="token punctuation">.</span><span class="token function">setUsername</span><span class="token punctuation">(</span>usernames<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    userDto<span class="token punctuation">.</span><span class="token function">setRoles</span><span class="token punctuation">(</span><span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span>roles<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> userDto<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们将为这个示例得到一个JSON响应：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">curl</span> <span class="token string">&#39;http://127.0.0.1:8080/spring-mvc-basics/api/byGetParameterMap?username=bob&amp;roles=admin&amp;roles=stuff&#39;</span>
<span class="token punctuation">{</span><span class="token string">&quot;username&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;bob&quot;</span>,<span class="token string">&quot;roles&quot;</span>:<span class="token punctuation">[</span><span class="token string">&quot;admin&quot;</span>,<span class="token string">&quot;stuff&quot;</span><span class="token punctuation">]</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-使用spring-mvc获取参数" tabindex="-1"><a class="header-anchor" href="#_3-使用spring-mvc获取参数"><span>3. 使用Spring MVC获取参数</span></a></h2><p>让我们看看Spring MVC在解析查询字符串时如何提高编码体验。</p><h3 id="_3-1-参数名称" tabindex="-1"><a class="header-anchor" href="#_3-1-参数名称"><span>3.1. 参数名称</span></a></h3><p>使用Spring MVC框架时，我们不必手动使用_HttpServletRequest_解析参数。对于第一种情况，我们定义一个方法，该方法有两个参数，查询参数名称为_username_和_roles_，并移除_HttpServletRequest_的使用，这由Spring MVC处理。</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/api/byParameterName&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token class-name">UserDto</span> <span class="token function">byParameterName</span><span class="token punctuation">(</span><span class="token class-name">String</span> username<span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> roles<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">UserDto</span> userDto <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">UserDto</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    userDto<span class="token punctuation">.</span><span class="token function">setUsername</span><span class="token punctuation">(</span>username<span class="token punctuation">)</span><span class="token punctuation">;</span>
    userDto<span class="token punctuation">.</span><span class="token function">setRoles</span><span class="token punctuation">(</span><span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span>roles<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> userDto<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这将返回与上一个示例相同的结果，因为我们使用相同的模型：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">curl</span> <span class="token string">&#39;http://127.0.0.1:8080/spring-mvc-basics/api/byParameterName?username=bob&amp;roles=admin&amp;roles=stuff&#39;</span>
<span class="token punctuation">{</span><span class="token string">&quot;username&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;bob&quot;</span>,<span class="token string">&quot;roles&quot;</span>:<span class="token punctuation">[</span><span class="token string">&quot;admin&quot;</span>,<span class="token string">&quot;stuff&quot;</span><span class="token punctuation">]</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-requestparam" tabindex="-1"><a class="header-anchor" href="#_3-2-requestparam"><span>3.2. <em>@RequestParam</em></span></a></h3><p>如果HTTP查询参数名称和Java方法参数名称不同，或者方法参数名称在编译字节码中不会被保留，我们可以在方法参数名称上配置注解_@RequestParam_来应对这种情况。</p><p>在我们的案例中，我们使用_@RequestParam(&quot;username&quot;)<em>和</em>@RequestParam(&quot;roles&quot;)_如下：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/api/byAnnoRequestParam&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token class-name">UserDto</span> <span class="token function">byAnnoRequestParam</span><span class="token punctuation">(</span><span class="token annotation punctuation">@RequestParam</span><span class="token punctuation">(</span><span class="token string">&quot;username&quot;</span><span class="token punctuation">)</span> <span class="token class-name">String</span> var1<span class="token punctuation">,</span> <span class="token annotation punctuation">@RequestParam</span><span class="token punctuation">(</span><span class="token string">&quot;roles&quot;</span><span class="token punctuation">)</span> <span class="token class-name">List</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\` var2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">UserDto</span> userDto <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">UserDto</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    userDto<span class="token punctuation">.</span><span class="token function">setUsername</span><span class="token punctuation">(</span>var1<span class="token punctuation">)</span><span class="token punctuation">;</span>
    userDto<span class="token punctuation">.</span><span class="token function">setRoles</span><span class="token punctuation">(</span>var2<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> userDto<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>并测试它：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">curl</span> <span class="token string">&#39;http://127.0.0.1:8080/spring-mvc-basics/api/byAnnoRequestParam?username=bob&amp;roles=admin&amp;roles=stuff&#39;</span>
<span class="token punctuation">{</span><span class="token string">&quot;username&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;bob&quot;</span>,<span class="token string">&quot;roles&quot;</span>:<span class="token punctuation">[</span><span class="token string">&quot;admin&quot;</span>,<span class="token string">&quot;stuff&quot;</span><span class="token punctuation">]</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-pojo" tabindex="-1"><a class="header-anchor" href="#_3-3-pojo"><span>3.3. POJO</span></a></h3><p>更简单地，我们可以直接使用POJO作为参数类型：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/api/byPojo&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token class-name">UserDto</span> <span class="token function">byPojo</span><span class="token punctuation">(</span><span class="token class-name">UserDto</span> userDto<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> userDto<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Spring MVC可以解析参数，创建POJO实例，并自动填充所需的参数。</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">curl</span> <span class="token string">&#39;http://127.0.0.1:8080/spring-mvc-basics/api/byPojo?username=bob&amp;roles=admin&amp;roles=stuff&#39;</span>
<span class="token punctuation">{</span><span class="token string">&quot;username&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;bob&quot;</span>,<span class="token string">&quot;roles&quot;</span>:<span class="token punctuation">[</span><span class="token string">&quot;admin&quot;</span>,<span class="token string">&quot;stuff&quot;</span><span class="token punctuation">]</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，我们通过单元测试来确保最后四种方法提供了完全相同的功能。</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@ParameterizedTest</span>
<span class="token annotation punctuation">@CsvSource</span><span class="token punctuation">(</span>textBlock <span class="token operator">=</span> <span class="token triple-quoted-string string">&quot;&quot;&quot;
    /api/byGetParameterMap
    /api/byParameterName
    /api/byAnnoRequestParam
    /api/byPojo
&quot;&quot;&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenPassParameters_thenReturnResolvedModel</span><span class="token punctuation">(</span><span class="token class-name">String</span> path<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>mockMvc<span class="token punctuation">.</span><span class="token function">perform</span><span class="token punctuation">(</span><span class="token function">get</span><span class="token punctuation">(</span>path <span class="token operator">+</span> <span class="token string">&quot;?username=bob&amp;roles=admin&amp;roles=stuff&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">andExpect</span><span class="token punctuation">(</span><span class="token function">status</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isOk</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">andExpect</span><span class="token punctuation">(</span><span class="token function">jsonPath</span><span class="token punctuation">(</span><span class="token string">&quot;$.username&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">value</span><span class="token punctuation">(</span><span class="token string">&quot;bob&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">andExpect</span><span class="token punctuation">(</span><span class="token function">jsonPath</span><span class="token punctuation">(</span><span class="token string">&quot;$.roles&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">value</span><span class="token punctuation">(</span><span class="token function">containsInRelativeOrder</span><span class="token punctuation">(</span><span class="token string">&quot;admin&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;stuff&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们介绍了如何使用Spring MVC从_HttpServletRequest_获取参数。从这些示例中，我们可以看到，使用Spring MVC解析参数时可以减少大量代码。</p><p>像往常一样，本文中展示的所有代码片段都可以在GitHub上找到。</p>`,53),o=[p];function l(c,u){return a(),s("div",null,o)}const d=n(e,[["render",l],["__file","2024-06-24-Getting Query String Parameters from HttpServletRequest.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-06-24/2024-06-24-Getting%20Query%20String%20Parameters%20from%20HttpServletRequest.html","title":"从HttpServletRequest获取查询字符串参数","lang":"zh-CN","frontmatter":{"date":"2024-06-24T00:00:00.000Z","category":["Java","Spring MVC"],"tag":["HttpServletRequest","Query String"],"head":[["meta",{"name":"keywords","content":"Java, Spring MVC, HttpServletRequest, Query String"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-24/2024-06-24-Getting%20Query%20String%20Parameters%20from%20HttpServletRequest.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"从HttpServletRequest获取查询字符串参数"}],["meta",{"property":"og:description","content":"从HttpServletRequest获取查询字符串参数 1. 引言 后端HTTP API开发中最重要的能力之一是解析前端传递的请求查询参数。 在本教程中，我们将介绍几种直接从_HttpServletRequest_获取查询参数的方法，以及Spring MVC提供的一些简洁方式。 2. _HttpServletRequest_中的方法 首先，我们来看看..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-24T02:46:19.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"HttpServletRequest"}],["meta",{"property":"article:tag","content":"Query String"}],["meta",{"property":"article:published_time","content":"2024-06-24T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-24T02:46:19.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"从HttpServletRequest获取查询字符串参数\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-24T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-24T02:46:19.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"从HttpServletRequest获取查询字符串参数 1. 引言 后端HTTP API开发中最重要的能力之一是解析前端传递的请求查询参数。 在本教程中，我们将介绍几种直接从_HttpServletRequest_获取查询参数的方法，以及Spring MVC提供的一些简洁方式。 2. _HttpServletRequest_中的方法 首先，我们来看看..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. _HttpServletRequest_中的方法","slug":"_2-httpservletrequest-中的方法","link":"#_2-httpservletrequest-中的方法","children":[{"level":3,"title":"2.1. HttpServletRequest#getQueryString()","slug":"_2-1-httpservletrequest-getquerystring","link":"#_2-1-httpservletrequest-getquerystring","children":[]},{"level":3,"title":"2.2. HttpServletRequest#getParameter(String)","slug":"_2-2-httpservletrequest-getparameter-string","link":"#_2-2-httpservletrequest-getparameter-string","children":[]},{"level":3,"title":"2.3. HttpServletRequest#getParameterValues(String)","slug":"_2-3-httpservletrequest-getparametervalues-string","link":"#_2-3-httpservletrequest-getparametervalues-string","children":[]},{"level":3,"title":"2.4. HttpServletRequest#getParameterMap()","slug":"_2-4-httpservletrequest-getparametermap","link":"#_2-4-httpservletrequest-getparametermap","children":[]}]},{"level":2,"title":"3. 使用Spring MVC获取参数","slug":"_3-使用spring-mvc获取参数","link":"#_3-使用spring-mvc获取参数","children":[{"level":3,"title":"3.1. 参数名称","slug":"_3-1-参数名称","link":"#_3-1-参数名称","children":[]},{"level":3,"title":"3.2. @RequestParam","slug":"_3-2-requestparam","link":"#_3-2-requestparam","children":[]},{"level":3,"title":"3.3. POJO","slug":"_3-3-pojo","link":"#_3-3-pojo","children":[]}]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1719197179000,"updatedTime":1719197179000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.07,"words":1222},"filePathRelative":"posts/baeldung/2024-06-24/2024-06-24-Getting Query String Parameters from HttpServletRequest.md","localizedDate":"2024年6月24日","excerpt":"<hr>\\n<h1>从HttpServletRequest获取查询字符串参数</h1>\\n<h2>1. 引言</h2>\\n<p>后端HTTP API开发中最重要的能力之一是解析前端传递的请求查询参数。</p>\\n<p>在本教程中，我们将介绍几种直接从_HttpServletRequest_获取查询参数的方法，以及Spring MVC提供的一些简洁方式。</p>\\n<h2>2. _HttpServletRequest_中的方法</h2>\\n<p>首先，我们来看看_HttpServletRequest_提供的与参数相关的方法。</p>\\n<h3>2.1. <em>HttpServletRequest#getQueryString()</em></h3>","autoDesc":true}');export{d as comp,k as data};
