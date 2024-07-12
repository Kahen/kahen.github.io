import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as e}from"./app-CNQ479je.js";const t={},p=e(`<h1 id="如何在servlet过滤器中自动装配spring-bean" tabindex="-1"><a class="header-anchor" href="#如何在servlet过滤器中自动装配spring-bean"><span>如何在Servlet过滤器中自动装配Spring Bean</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>Servlet过滤器提供了一种强大的机制，用于拦截和操作传入的请求。然而，在这些过滤器中访问Spring管理的Bean可能会带来挑战。</p><p>在本教程中，我们将探讨在Servlet过滤器中无缝获取Spring Bean的各种方法，这在基于Spring的Web应用程序中是一个常见的需求。</p><h2 id="_2-理解-autowired在servlet过滤器中的限制" tabindex="-1"><a class="header-anchor" href="#_2-理解-autowired在servlet过滤器中的限制"><span>2. 理解@Autowired在Servlet过滤器中的限制</span></a></h2><p>虽然Spring的依赖注入机制@Autowired是将依赖注入Spring管理组件的便捷方式，但它与Servlet过滤器并不完全兼容。这是因为Servlet过滤器是由Servlet容器初始化的，通常在Spring的ApplicationContext完全加载和初始化之前。</p><p>因此，当容器实例化一个Servlet过滤器时，Spring上下文可能还没有可用，导致在使用@Autowired注解时依赖项为空或未初始化。让我们探索在Servlet过滤器中访问Spring Bean的替代方法。</p><h2 id="_3-设置" tabindex="-1"><a class="header-anchor" href="#_3-设置"><span>3. 设置</span></a></h2><p>让我们创建一个通用的LoggingService，它将被自动装配到我们的过滤器中：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Service</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">LoggingService</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">Logger</span> logger <span class="token operator">=</span> <span class="token class-name">LoggerFactory</span><span class="token punctuation">.</span><span class="token function">getLogger</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">log</span><span class="token punctuation">(</span><span class="token class-name">String</span> message<span class="token punctuation">,</span> <span class="token class-name">String</span> url<span class="token punctuation">)</span><span class="token punctuation">{</span>
        logger<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;Logging Request {} for URI : {}&quot;</span><span class="token punctuation">,</span> message<span class="token punctuation">,</span> url<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后我们将创建我们的过滤器，它将拦截传入的HTTP请求，使用LoggingService依赖来记录HTTP方法和URI详细信息：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">LoggingFilter</span> <span class="token keyword">implements</span> <span class="token class-name">Filter</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Autowired</span>
    <span class="token class-name">LoggingService</span> loggingService<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">doFilter</span><span class="token punctuation">(</span><span class="token class-name">ServletRequest</span> servletRequest<span class="token punctuation">,</span> <span class="token class-name">ServletResponse</span> servletResponse<span class="token punctuation">,</span> <span class="token class-name">FilterChain</span> filterChain<span class="token punctuation">)</span>
        <span class="token keyword">throws</span> <span class="token class-name">IOException</span><span class="token punctuation">,</span> <span class="token class-name">ServletException</span> <span class="token punctuation">{</span>
        <span class="token class-name">HttpServletRequest</span> httpServletRequest<span class="token operator">=</span><span class="token punctuation">(</span><span class="token class-name">HttpServletRequest</span><span class="token punctuation">)</span>servletRequest<span class="token punctuation">;</span>
        loggingService<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>httpServletRequest<span class="token punctuation">.</span><span class="token function">getMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>httpServletRequest<span class="token punctuation">.</span><span class="token function">getRequestURI</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        filterChain<span class="token punctuation">.</span><span class="token function">doFilter</span><span class="token punctuation">(</span>servletRequest<span class="token punctuation">,</span>servletResponse<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们设置一个RestController，它返回用户列表：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UserController</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/users&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">List</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">User</span><span class="token punctuation">&gt;</span></span>\` <span class="token function">getUsers</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token string">&quot;1&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;John&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;john@email.com&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
          <span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token string">&quot;2&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;Smith&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;smith@email.com&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们将设置测试以检查LoggingService是否成功自动装配到我们的过滤器中：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@RunWith</span><span class="token punctuation">(</span><span class="token class-name">SpringRunner</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@SpringBootTest</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">LoggingFilterTest</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">LoggingFilter</span> loggingFilter<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenFilter_whenAutowired_thenDependencyInjected</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token class-name">Assert</span><span class="token punctuation">.</span><span class="token function">assertNotNull</span><span class="token punctuation">(</span>loggingFilter<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Assert</span><span class="token punctuation">.</span><span class="token function">assertNotNull</span><span class="token punctuation">(</span><span class="token function">getField</span><span class="token punctuation">(</span>loggingFilter<span class="token punctuation">,</span><span class="token string">&quot;loggingService&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token class-name">Object</span> <span class="token function">getField</span><span class="token punctuation">(</span><span class="token class-name">Object</span> target<span class="token punctuation">,</span> <span class="token class-name">String</span> fieldName<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">NoSuchFieldException</span><span class="token punctuation">,</span> <span class="token class-name">IllegalAccessException</span> <span class="token punctuation">{</span>
        <span class="token class-name">Field</span> field <span class="token operator">=</span> target<span class="token punctuation">.</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getDeclaredField</span><span class="token punctuation">(</span>fieldName<span class="token punctuation">)</span><span class="token punctuation">;</span>
        field<span class="token punctuation">.</span><span class="token function">setAccessible</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> field<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然而，在这个阶段，LoggingService可能还没有注入到LoggingFilter中，因为Spring上下文还没有可用。我们将在以下部分探讨解决这个问题的各种选项。</p><h2 id="_4-在servlet过滤器中使用springbeanautowiringsupport" tabindex="-1"><a class="header-anchor" href="#_4-在servlet过滤器中使用springbeanautowiringsupport"><span>4. 在Servlet过滤器中使用SpringBeanAutowiringSupport</span></a></h2><p>Spring的SpringBeanAutowiringSupport类为依赖注入到非Spring管理的类如过滤器和Servlets提供了支持。通过使用这个类，Spring可以将依赖项，如LoggingService这样的Spring管理Bean，注入到LoggingFilter中。</p><p>init方法用于初始化Filter实例，我们将在LoggingFilter中覆盖这个方法以使用SpringBeanAutowiringSupport：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Override</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token class-name">FilterConfig</span> filterConfig<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">ServletException</span> <span class="token punctuation">{</span>
    <span class="token class-name">SpringBeanAutowiringSupport</span><span class="token punctuation">.</span><span class="token function">processInjectionBasedOnServletContext</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span>
      filterConfig<span class="token punctuation">.</span><span class="token function">getServletContext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>processInjectionBasedOnServletContext方法使用与ServletContext关联的ApplicationContext来执行自动装配。它首先从ServletContext中检索ApplicationContext，然后使用它将依赖项自动装配到目标对象中。这个过程涉及检查目标对象的字段是否有@Autowired注解，然后解析并从ApplicationContext中注入相应的Bean。</p><p>这种机制允许非Spring管理的对象，如过滤器和servlets，从Spring的依赖注入功能中受益。</p><h2 id="_5-在servlet过滤器中使用webapplicationcontextutils" tabindex="-1"><a class="header-anchor" href="#_5-在servlet过滤器中使用webapplicationcontextutils"><span>5. 在Servlet过滤器中使用WebApplicationContextUtils</span></a></h2><p>WebApplicationContextUtils提供了一个实用方法，用于检索与ServletContext关联的ApplicationContext。ApplicationContext包含Spring容器管理的所有Bean。</p><p>让我们覆盖LoggingFilter类的init方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Override</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token class-name">FilterConfig</span> filterConfig<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">ServletException</span> <span class="token punctuation">{</span>
    loggingService <span class="token operator">=</span> <span class="token class-name">WebApplicationContextUtils</span>
      <span class="token punctuation">.</span><span class="token function">getRequiredWebApplicationContext</span><span class="token punctuation">(</span>filterConfig<span class="token punctuation">.</span><span class="token function">getServletContext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">getBean</span><span class="token punctuation">(</span><span class="token class-name">LoggingService</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们从ApplicationContext中检索LoggingService的实例，并将其分配给过滤器的loggingService字段。这种方法在我们需要在非Spring管理的组件中访问Spring管理的Bean，如Servlet或Filter，并且不能使用基于注解或构造函数的注入时非常有用。</p><p>需要注意的是，这种方法紧密地将过滤器与Spring耦合，这在某些情况下可能不是理想的。</p><h2 id="_6-在配置中使用filterregistrationbean" tabindex="-1"><a class="header-anchor" href="#_6-在配置中使用filterregistrationbean"><span>6. 在配置中使用FilterRegistrationBean</span></a></h2><p>FilterRegistrationBean用于在servlet容器中以编程方式注册Servlet过滤器。它提供了一种在应用程序的配置类中动态配置过滤器注册的方法。</p><p>通过使用@Bean注解方法，LoggingService会自动注入到方法中，允许它被传递到LoggingFilter构造函数。让我们为我们的config类设置FilterRegistrationBean的方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Bean</span>
<span class="token keyword">public</span> <span class="token class-name">FilterRegistrationBean</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">LoggingFilter</span><span class="token punctuation">&gt;</span></span>\`\` <span class="token function">loggingFilterRegistration</span><span class="token punctuation">(</span><span class="token class-name">LoggingService</span> loggingService<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">FilterRegistrationBean</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">LoggingFilter</span><span class="token punctuation">&gt;</span></span>\`\` registrationBean <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FilterRegistrationBean</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    registrationBean<span class="token punctuation">.</span><span class="token function">setFilter</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">LoggingFilter</span><span class="token punctuation">(</span>loggingService<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    registrationBean<span class="token punctuation">.</span><span class="token function">addUrlPatterns</span><span class="token punctuation">(</span><span class="token string">&quot;/*&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> registrationBean<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后我们将在LoggingFilter中包含一个构造函数以支持上述配置：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">LoggingFilter</span><span class="token punctuation">(</span><span class="token class-name">LoggingService</span> loggingService<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>loggingService <span class="token operator">=</span> loggingService<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种方法集中了过滤器及其依赖项的配置，使代码更加有序，更易于维护。</p><h2 id="_7-在servlet过滤器中使用delegatingfilterproxy" tabindex="-1"><a class="header-anchor" href="#_7-在servlet过滤器中使用delegatingfilterproxy"><span>7. 在Servlet过滤器中使用DelegatingFilterProxy</span></a></h2><p>DelegatingFilterProxy是一个Servlet过滤器，允许将控制权传递给可以访问Spring ApplicationContext的Filter类。</p><p>让我们配置DelegatingFilterProxy委托给一个名为“loggingFilter”的Spring管理Bean。FilterRegistrationBean由Spring在应用程序启动时用于向Servlet容器注册过滤器：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Bean</span>
<span class="token keyword">public</span> <span class="token class-name">FilterRegistrationBean</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">DelegatingFilterProxy</span><span class="token punctuation">&gt;</span></span>\`\` <span class="token function">loggingFilterRegistration</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">FilterRegistrationBean</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">DelegatingFilterProxy</span><span class="token punctuation">&gt;</span></span>\`\` registrationBean <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FilterRegistrationBean</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    registrationBean<span class="token punctuation">.</span><span class="token function">setFilter</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">DelegatingFilterProxy</span><span class="token punctuation">(</span><span class="token string">&quot;loggingFilter&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    registrationBean<span class="token punctuation">.</span><span class="token function">addUrlPatterns</span><span class="token punctuation">(</span><span class="token string">&quot;/*&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> registrationBean<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们使用我们之前定义的过滤器相同的bean名称：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Component</span><span class="token punctuation">(</span><span class="token string">&quot;loggingFilter&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">LoggingFilter</span> <span class="token keyword">implements</span> <span class="token class-name">Filter</span> <span class="token punctuation">{</span>
    <span class="token comment">// 标准方法</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种方法允许我们使用Spring的依赖注入来管理loggingFilter Bean。</p><h2 id="_8-比较servlet过滤器中的依赖注入方法" tabindex="-1"><a class="header-anchor" href="#_8-比较servlet过滤器中的依赖注入方法"><span>8. 比较Servlet过滤器中的依赖注入方法</span></a></h2><p>DelegatingFilterProxy方法与SpringBeanAutowiringSupport和直接使用WebApplicationContextUtils在它将过滤器的执行委托给Spring管理的Bean方面有所不同，允许我们使用Spring的依赖注入。</p><p>DelegatingFilterProxy更符合典型的Spring应用程序架构，并允许更清晰的关注点分离。FilterRegistrationBean方法允许对过滤器的依赖注入有更多的控制，并集中了依赖项的配置。</p><p>相比之下，<strong>SpringBeanAutowiringSupport和WebApplicationContextUtils是更底层的方法，可以在某些我们需要对过滤器的初始化过程有更多的控制或想要直接访问ApplicationContext的场景中非常有用</strong>。然而，它们需要更多的手动设置，并且没有提供与Spring的依赖注入机制相同的集成水平。</p><h2 id="_9-结论" tabindex="-1"><a class="header-anchor" href="#_9-结论"><span>9. 结论</span></a></h2><p>在本文中，我们探讨了将Spring Bean自动装配到Servlet过滤器中的不同方法。每种方法都有其优点和局限性，选择方法取决于应用程序的具体要求和约束。总的来说，它们使Spring管理的Bean能够无缝集成到Servlet过滤器中，增强了应用程序的灵活性和可维护性。</p><p>如常，代码可在GitHub上获得。</p>`,50),i=[p];function o(l,c){return a(),s("div",null,i)}const k=n(t,[["render",o],["__file","2024-06-21-How to Autowire a Spring Bean in a Servlet Filter.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/Archive/2024-06-21-How%20to%20Autowire%20a%20Spring%20Bean%20in%20a%20Servlet%20Filter.html","title":"如何在Servlet过滤器中自动装配Spring Bean","lang":"zh-CN","frontmatter":{"date":"2024-06-21T00:00:00.000Z","category":["Spring","Java"],"tag":["Spring Framework","Servlet Filter"],"head":[["meta",{"name":"keywords","content":"Spring, Java, Dependency Injection, Servlet Filter, Autowire"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/2024-06-21-How%20to%20Autowire%20a%20Spring%20Bean%20in%20a%20Servlet%20Filter.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"如何在Servlet过滤器中自动装配Spring Bean"}],["meta",{"property":"og:description","content":"如何在Servlet过滤器中自动装配Spring Bean 1. 引言 Servlet过滤器提供了一种强大的机制，用于拦截和操作传入的请求。然而，在这些过滤器中访问Spring管理的Bean可能会带来挑战。 在本教程中，我们将探讨在Servlet过滤器中无缝获取Spring Bean的各种方法，这在基于Spring的Web应用程序中是一个常见的需求。 ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Spring Framework"}],["meta",{"property":"article:tag","content":"Servlet Filter"}],["meta",{"property":"article:published_time","content":"2024-06-21T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"如何在Servlet过滤器中自动装配Spring Bean\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-21T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"如何在Servlet过滤器中自动装配Spring Bean 1. 引言 Servlet过滤器提供了一种强大的机制，用于拦截和操作传入的请求。然而，在这些过滤器中访问Spring管理的Bean可能会带来挑战。 在本教程中，我们将探讨在Servlet过滤器中无缝获取Spring Bean的各种方法，这在基于Spring的Web应用程序中是一个常见的需求。 ..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 理解@Autowired在Servlet过滤器中的限制","slug":"_2-理解-autowired在servlet过滤器中的限制","link":"#_2-理解-autowired在servlet过滤器中的限制","children":[]},{"level":2,"title":"3. 设置","slug":"_3-设置","link":"#_3-设置","children":[]},{"level":2,"title":"4. 在Servlet过滤器中使用SpringBeanAutowiringSupport","slug":"_4-在servlet过滤器中使用springbeanautowiringsupport","link":"#_4-在servlet过滤器中使用springbeanautowiringsupport","children":[]},{"level":2,"title":"5. 在Servlet过滤器中使用WebApplicationContextUtils","slug":"_5-在servlet过滤器中使用webapplicationcontextutils","link":"#_5-在servlet过滤器中使用webapplicationcontextutils","children":[]},{"level":2,"title":"6. 在配置中使用FilterRegistrationBean","slug":"_6-在配置中使用filterregistrationbean","link":"#_6-在配置中使用filterregistrationbean","children":[]},{"level":2,"title":"7. 在Servlet过滤器中使用DelegatingFilterProxy","slug":"_7-在servlet过滤器中使用delegatingfilterproxy","link":"#_7-在servlet过滤器中使用delegatingfilterproxy","children":[]},{"level":2,"title":"8. 比较Servlet过滤器中的依赖注入方法","slug":"_8-比较servlet过滤器中的依赖注入方法","link":"#_8-比较servlet过滤器中的依赖注入方法","children":[]},{"level":2,"title":"9. 结论","slug":"_9-结论","link":"#_9-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":5.4,"words":1620},"filePathRelative":"posts/baeldung/Archive/2024-06-21-How to Autowire a Spring Bean in a Servlet Filter.md","localizedDate":"2024年6月21日","excerpt":"\\n<h2>1. 引言</h2>\\n<p>Servlet过滤器提供了一种强大的机制，用于拦截和操作传入的请求。然而，在这些过滤器中访问Spring管理的Bean可能会带来挑战。</p>\\n<p>在本教程中，我们将探讨在Servlet过滤器中无缝获取Spring Bean的各种方法，这在基于Spring的Web应用程序中是一个常见的需求。</p>\\n<h2>2. 理解@Autowired在Servlet过滤器中的限制</h2>\\n<p>虽然Spring的依赖注入机制@Autowired是将依赖注入Spring管理组件的便捷方式，但它与Servlet过滤器并不完全兼容。这是因为Servlet过滤器是由Servlet容器初始化的，通常在Spring的ApplicationContext完全加载和初始化之前。</p>","autoDesc":true}');export{k as comp,d as data};
