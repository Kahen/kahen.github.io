import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as n,a}from"./app-D4B8YWfq.js";const r={},i=a('<h1 id="spring-enablemethodsecurity-注解-baeldung" tabindex="-1"><a class="header-anchor" href="#spring-enablemethodsecurity-注解-baeldung"><span>Spring @EnableMethodSecurity 注解 | Baeldung</span></a></h1><p>如果您正在使用Spring Security（特别是OAuth）实现，一定要看看《学习Spring安全》课程。</p><p><strong>&gt;&gt; 学习Spring</strong><strong>安全</strong></p><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>使用Spring Security，我们可以为应用程序的方法配置身份验证和授权，例如我们的端点。例如，如果用户在我们的域上有身份验证，我们可以通过对现有方法应用限制来分析他使用应用程序的情况。</p><p>使用@EnableGlobalMethodSecurity注解一直是一种标准做法，直到5.6版本，@EnableMethodSecurity引入了一种更灵活的方法安全配置方式。</p><p>在本教程中，我们将看到@EnableMethodSecurity如何取代@EnableGlobalMethodSecurity注解。我们还将看到它们之间的区别以及一些代码示例。</p><h2 id="_2-enablemethodsecurity与-enableglobalmethodsecurity" tabindex="-1"><a class="header-anchor" href="#_2-enablemethodsecurity与-enableglobalmethodsecurity"><span>2. @EnableMethodSecurity与@EnableGlobalMethodSecurity</span></a></h2><p>让我们看看使用@EnableMethodSecurity和@EnableGlobalMethodSecurity时方法授权是如何工作的。</p><h3 id="_2-1-enablemethodsecurity" tabindex="-1"><a class="header-anchor" href="#_2-1-enablemethodsecurity"><span>2.1. @EnableMethodSecurity</span></a></h3><p>使用@EnableMethodSecurity，我们可以看到Spring Security打算将授权类型转向基于bean的配置。</p><p>我们不再有全局配置，而是现在每种类型都有一个。让我们以Jsr250MethodSecurityConfiguration为例：</p><p>[代码省略]</p><h3 id="_2-2-enableglobalmethodsecurity" tabindex="-1"><a class="header-anchor" href="#_2-2-enableglobalmethodsecurity"><span>2.2. @EnableGlobalMethodSecurity</span></a></h3><p>@EnableGlobalMethodSecurity是我们创建安全层并获得方法授权时需要与@EnableWebSecurity一起使用的函数接口。</p><p>让我们创建一个示例配置类：</p><p>[代码省略]</p><p>所有方法安全实现都使用一个MethodInterceptor，在需要授权时触发。在这种情况下，GlobalMethodSecurityConfiguration类是启用全局方法安全的基配置。</p><p>[代码省略]</p><h2 id="_3-enablemethodsecurity功能" tabindex="-1"><a class="header-anchor" href="#_3-enablemethodsecurity功能"><span>3. @EnableMethodSecurity功能</span></a></h2><p>与之前的遗留实现相比，@EnableMethodSecurity带来了一些小的和大的改进。</p><h3 id="_3-1-小改进" tabindex="-1"><a class="header-anchor" href="#_3-1-小改进"><span>3.1. 小改进</span></a></h3><p>所有授权类型仍然受到支持。例如，它仍然符合JSR-250。但是，我们不再需要在注解中添加prePostEnabled，因为它现在默认为true：</p><p>[代码省略]</p><p>如果我们想要禁用它，我们需要将prePostEnabled设置为false。</p><h3 id="_3-2-大改进" tabindex="-1"><a class="header-anchor" href="#_3-2-大改进"><span>3.2. 大改进</span></a></h3><p>GlobalMethodSecurityConfiguration类不再使用。Spring Security用分段配置和AuthorizationManager替换了它，这意味着我们可以在不扩展任何基配置类的情况下定义我们的授权bean。</p><p>值得注意的是，AuthorizationManager接口是通用的，可以适应任何对象，尽管标准安全适用于MethodInvocation：</p><p>[代码省略]</p><p>总的来说，这为我们提供了使用委派的细粒度授权。因此，在实践中，我们为每种类型都有一个AuthorizationManager。当然，我们也可以构建我们自己的。</p><p>此外，这也意味着@EnableMethodSecurity不允许像遗留实现中的@AspectJ注解与AspectJ方法拦截器：</p><p>[代码省略]</p><p>然而，我们仍然拥有完整的AOP支持。例如，让我们看看我们之前讨论过的Jsr250MethodSecurityConfiguration中使用的拦截器：</p><p>[代码省略]</p><p>所以让我们看看如何创建一个自定义的授权管理器。</p><p>假设我们有端点，我们想要应用一个策略。我们只想在用户有访问该策略的权限时授权用户。否则，我们将阻止用户。</p><p>作为第一步，我们通过向访问受限策略的字段添加定义我们的用户：</p><p>[代码省略]</p><p>现在，让我们看看我们的认证层，以定义我们系统中的用户。为此，我们将创建一个自定义UserDetailService。我们将使用内存映射来存储用户：</p><p>[代码省略]</p><p>一旦用户存在于我们的系统中，我们想要通过检查他是否有权访问某些受限策略来限制他可以访问的信息。</p><p>为了演示，我们创建了一个Java注解@Policy，用于在方法上应用，并定义了一个策略枚举：</p><p>[代码省略]</p><p>让我们创建我们想要应用此策略的服务：</p><p>[代码省略]</p><p>我们不能使用内置的授权管理器，例如Jsr250AuthorizationManager。它不会知道何时以及如何拦截服务策略检查。所以，让我们定义我们的自定义管理器：</p><p>[代码省略]</p><p>当服务方法被触发时，我们再次检查用户是否有认证。然后，如果策略是开放的，我们授予访问权限。在限制的情况下，我们检查用户是否有权访问受限策略。</p><p>为此，我们需要定义一个MethodInterceptor，它将就位，例如在执行之前，但也可以是之后。所以让我们把它和我们的安全配置类包装在一起：</p><p>[代码省略]</p><p>我们正在使用AuthorizationManagerBeforeMethodInterceptor。它匹配我们的策略服务模式，并使用自定义授权管理器。</p><p>此外，我们还需要让我们的AuthenticationManager了解自定义UserDetailsService。然后，当Spring Security拦截服务方法时，我们可以访问我们的自定义用户并检查用户的策略访问权限。</p><h2 id="_5-测试" tabindex="-1"><a class="header-anchor" href="#_5-测试"><span>5. 测试</span></a></h2><p>让我们定义一个REST控制器：</p><p>[代码省略]</p><p>我们将使用Spring Boot Test与我们的应用程序一起模拟方法安全：</p><p>[代码省略]</p><p>所有响应都应该被授权，除了用户调用他没有访问受限策略的服务的那个响应。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们看到了@EnableMethodSecurity的主要功能以及它如何取代@EnableGlobalMethodSecurity。</p><p>我们还通过实现流程了解了这些注解之间的区别。然后，我们讨论了@EnableMethodSecurity如何提供更灵活的基于bean的配置。最后，我们了解了如何创建自定义授权管理器和MVC测试。</p><p>如往常一样，我们可以在GitHub上找到工作的代码示例。</p>',62),o=[i];function p(l,c){return n(),t("div",null,o)}const u=e(r,[["render",p],["__file","2024-07-12-Spring  EnableMethodSecurity Annotation.html.vue"]]),s=JSON.parse('{"path":"/posts/baeldung/2024-07-12/2024-07-12-Spring%20%20EnableMethodSecurity%20Annotation.html","title":"Spring @EnableMethodSecurity 注解 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Spring Security","Method Security"],"tag":["Spring","Security","Method Security"],"head":[["meta",{"name":"keywords","content":"Spring Security, Method Security, Annotation, EnableMethodSecurity, EnableGlobalMethodSecurity"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-12/2024-07-12-Spring%20%20EnableMethodSecurity%20Annotation.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Spring @EnableMethodSecurity 注解 | Baeldung"}],["meta",{"property":"og:description","content":"Spring @EnableMethodSecurity 注解 | Baeldung 如果您正在使用Spring Security（特别是OAuth）实现，一定要看看《学习Spring安全》课程。 >> 学习Spring 安全 1. 概述 使用Spring Security，我们可以为应用程序的方法配置身份验证和授权，例如我们的端点。例如，如果用户在我..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-12T15:02:54.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Spring"}],["meta",{"property":"article:tag","content":"Security"}],["meta",{"property":"article:tag","content":"Method Security"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-12T15:02:54.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Spring @EnableMethodSecurity 注解 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-12T15:02:54.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Spring @EnableMethodSecurity 注解 | Baeldung 如果您正在使用Spring Security（特别是OAuth）实现，一定要看看《学习Spring安全》课程。 >> 学习Spring 安全 1. 概述 使用Spring Security，我们可以为应用程序的方法配置身份验证和授权，例如我们的端点。例如，如果用户在我..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. @EnableMethodSecurity与@EnableGlobalMethodSecurity","slug":"_2-enablemethodsecurity与-enableglobalmethodsecurity","link":"#_2-enablemethodsecurity与-enableglobalmethodsecurity","children":[{"level":3,"title":"2.1. @EnableMethodSecurity","slug":"_2-1-enablemethodsecurity","link":"#_2-1-enablemethodsecurity","children":[]},{"level":3,"title":"2.2. @EnableGlobalMethodSecurity","slug":"_2-2-enableglobalmethodsecurity","link":"#_2-2-enableglobalmethodsecurity","children":[]}]},{"level":2,"title":"3. @EnableMethodSecurity功能","slug":"_3-enablemethodsecurity功能","link":"#_3-enablemethodsecurity功能","children":[{"level":3,"title":"3.1. 小改进","slug":"_3-1-小改进","link":"#_3-1-小改进","children":[]},{"level":3,"title":"3.2. 大改进","slug":"_3-2-大改进","link":"#_3-2-大改进","children":[]}]},{"level":2,"title":"5. 测试","slug":"_5-测试","link":"#_5-测试","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1720796574000,"updatedTime":1720796574000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.74,"words":1422},"filePathRelative":"posts/baeldung/2024-07-12/2024-07-12-Spring  EnableMethodSecurity Annotation.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>如果您正在使用Spring Security（特别是OAuth）实现，一定要看看《学习Spring安全》课程。</p>\\n<p><strong>&gt;&gt; 学习Spring</strong>\\n<strong>安全</strong></p>\\n<h2>1. 概述</h2>\\n<p>使用Spring Security，我们可以为应用程序的方法配置身份验证和授权，例如我们的端点。例如，如果用户在我们的域上有身份验证，我们可以通过对现有方法应用限制来分析他使用应用程序的情况。</p>\\n<p>使用@EnableGlobalMethodSecurity注解一直是一种标准做法，直到5.6版本，@EnableMethodSecurity引入了一种更灵活的方法安全配置方式。</p>","autoDesc":true}');export{u as comp,s as data};
