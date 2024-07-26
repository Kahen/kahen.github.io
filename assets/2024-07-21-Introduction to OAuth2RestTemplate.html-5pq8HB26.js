import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as a,a as n}from"./app-DpYLEM_u.js";const r={},i=n('<hr><h1 id="spring-oauth2resttemplate-使用指南" tabindex="-1"><a class="header-anchor" href="#spring-oauth2resttemplate-使用指南"><span>Spring OAuth2RestTemplate 使用指南</span></a></h1><p>在本教程中，我们将学习如何使用 Spring <strong>OAuth2RestTemplate</strong> 来进行 OAuth2 REST 调用。我们将创建一个能够列出 GitHub 账户仓库的 Spring Web 应用程序。</p><h2 id="_2-maven-配置" tabindex="-1"><a class="header-anchor" href="#_2-maven-配置"><span>2. Maven 配置</span></a></h2><p>首先，我们需要在我们的 <em>pom.xml</em> 文件中添加 spring-boot-starter-security 和 spring-security-oauth2-autoconfigure 依赖项。由于我们正在构建一个 Web 应用程序，我们还需要包括 spring-boot-starter-web 和 spring-boot-starter-thymeleaf 构件。</p><h2 id="_3-oauth2-属性" tabindex="-1"><a class="header-anchor" href="#_3-oauth2-属性"><span>3. OAuth2 属性</span></a></h2><p>接下来，让我们将 OAuth 配置添加到我们的 <em>application.properties</em> 文件中，以便能够连接 GitHub 账户：</p><h2 id="_4-oauth2resttemplate-配置" tabindex="-1"><a class="header-anchor" href="#_4-oauth2resttemplate-配置"><span>4. OAuth2RestTemplate 配置</span></a></h2><p>现在，是时候创建一个安全配置来为我们的应用程序提供 OAuth2 支持了。</p><h3 id="_4-1-securityconfig-类" tabindex="-1"><a class="header-anchor" href="#_4-1-securityconfig-类"><span>4.1. SecurityConfig 类</span></a></h3><p>首先，让我们创建 Spring 的安全配置：</p><h3 id="_4-2-oauth2resttemplate-bean" tabindex="-1"><a class="header-anchor" href="#_4-2-oauth2resttemplate-bean"><span>4.2. OAuth2RestTemplate Bean</span></a></h3><p>其次，我们将为我们的 OAuth2RestTemplate 创建 Bean：</p><h3 id="_4-3-认证过滤器" tabindex="-1"><a class="header-anchor" href="#_4-3-认证过滤器"><span>4.3. 认证过滤器</span></a></h3><p>第三，我们需要一个认证过滤器来处理 OAuth2 流程：</p><h3 id="_4-4-spring-security-配置" tabindex="-1"><a class="header-anchor" href="#_4-4-spring-security-配置"><span>4.4. Spring Security 配置</span></a></h3><p>最后，让我们注册 OAuth2ClientContextFilter 并创建一个 Web 安全配置：</p><h2 id="_5-使用-oauth2resttemplate" tabindex="-1"><a class="header-anchor" href="#_5-使用-oauth2resttemplate"><span>5. 使用 OAuth2RestTemplate</span></a></h2><p><strong>OAuth2RestTemplate 的主要目标是简化对 OAuth2 资源服务器（如 GitHub）的 REST 调用。</strong> 它基本上满足我们应用程序的两个需求：</p><h3 id="_5-1-登录" tabindex="-1"><a class="header-anchor" href="#_5-1-登录"><span>5.1. 登录</span></a></h3><p>让我们创建带有登录和主页选项的 <em>index.html</em> 文件：</p><h3 id="_5-2-主页" tabindex="-1"><a class="header-anchor" href="#_5-2-主页"><span>5.2. 主页</span></a></h3><p>现在，让我们创建一个控制器来欢迎经过身份验证的 GitHub 用户：</p><h3 id="_5-3-github-仓库" tabindex="-1"><a class="header-anchor" href="#_5-3-github-仓库"><span>5.3. GitHub 仓库</span></a></h3><p>现在，是时候使用之前控制器中创建的 OAuth2RestTemplate 来展示用户拥有的所有 GitHub 仓库了。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们学习了如何使用 <strong>OAuth2RestTemplate</strong> 简化对 OAuth2 资源服务器（如 GitHub）的 REST 调用。</p><p>我们经历了运行 OAuth2 流程的 Web 应用程序的构建模块。然后，我们看到了如何进行 REST API 调用以检索 GitHub 用户的所有仓库。</p><p>如常，本教程的完整示例可以在 GitHub 上找到。</p>',29),p=[i];function s(h,l){return a(),t("div",null,p)}const c=e(r,[["render",s],["__file","2024-07-21-Introduction to OAuth2RestTemplate.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-07-21/2024-07-21-Introduction%20to%20OAuth2RestTemplate.html","title":"Spring OAuth2RestTemplate 使用指南","lang":"zh-CN","frontmatter":{"date":"2022-03-01T00:00:00.000Z","category":["Spring Security","OAuth2"],"tag":["OAuth2","Spring Security","REST API"],"head":[["meta",{"name":"keywords","content":"Spring Security, OAuth2, REST API, Spring OAuth2RestTemplate"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-21/2024-07-21-Introduction%20to%20OAuth2RestTemplate.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Spring OAuth2RestTemplate 使用指南"}],["meta",{"property":"og:description","content":"Spring OAuth2RestTemplate 使用指南 在本教程中，我们将学习如何使用 Spring OAuth2RestTemplate 来进行 OAuth2 REST 调用。我们将创建一个能够列出 GitHub 账户仓库的 Spring Web 应用程序。 2. Maven 配置 首先，我们需要在我们的 pom.xml 文件中添加 sprin..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-21T03:44:07.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"OAuth2"}],["meta",{"property":"article:tag","content":"Spring Security"}],["meta",{"property":"article:tag","content":"REST API"}],["meta",{"property":"article:published_time","content":"2022-03-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-21T03:44:07.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Spring OAuth2RestTemplate 使用指南\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-03-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-21T03:44:07.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Spring OAuth2RestTemplate 使用指南 在本教程中，我们将学习如何使用 Spring OAuth2RestTemplate 来进行 OAuth2 REST 调用。我们将创建一个能够列出 GitHub 账户仓库的 Spring Web 应用程序。 2. Maven 配置 首先，我们需要在我们的 pom.xml 文件中添加 sprin..."},"headers":[{"level":2,"title":"2. Maven 配置","slug":"_2-maven-配置","link":"#_2-maven-配置","children":[]},{"level":2,"title":"3. OAuth2 属性","slug":"_3-oauth2-属性","link":"#_3-oauth2-属性","children":[]},{"level":2,"title":"4. OAuth2RestTemplate 配置","slug":"_4-oauth2resttemplate-配置","link":"#_4-oauth2resttemplate-配置","children":[{"level":3,"title":"4.1. SecurityConfig 类","slug":"_4-1-securityconfig-类","link":"#_4-1-securityconfig-类","children":[]},{"level":3,"title":"4.2. OAuth2RestTemplate Bean","slug":"_4-2-oauth2resttemplate-bean","link":"#_4-2-oauth2resttemplate-bean","children":[]},{"level":3,"title":"4.3. 认证过滤器","slug":"_4-3-认证过滤器","link":"#_4-3-认证过滤器","children":[]},{"level":3,"title":"4.4. Spring Security 配置","slug":"_4-4-spring-security-配置","link":"#_4-4-spring-security-配置","children":[]}]},{"level":2,"title":"5. 使用 OAuth2RestTemplate","slug":"_5-使用-oauth2resttemplate","link":"#_5-使用-oauth2resttemplate","children":[{"level":3,"title":"5.1. 登录","slug":"_5-1-登录","link":"#_5-1-登录","children":[]},{"level":3,"title":"5.2. 主页","slug":"_5-2-主页","link":"#_5-2-主页","children":[]},{"level":3,"title":"5.3. GitHub 仓库","slug":"_5-3-github-仓库","link":"#_5-3-github-仓库","children":[]}]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1721533447000,"updatedTime":1721533447000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":1.7,"words":511},"filePathRelative":"posts/baeldung/2024-07-21/2024-07-21-Introduction to OAuth2RestTemplate.md","localizedDate":"2022年3月1日","excerpt":"<hr>\\n<h1>Spring OAuth2RestTemplate 使用指南</h1>\\n<p>在本教程中，我们将学习如何使用 Spring <strong>OAuth2RestTemplate</strong> 来进行 OAuth2 REST 调用。我们将创建一个能够列出 GitHub 账户仓库的 Spring Web 应用程序。</p>\\n<h2>2. Maven 配置</h2>\\n<p>首先，我们需要在我们的 <em>pom.xml</em> 文件中添加 spring-boot-starter-security 和 spring-security-oauth2-autoconfigure 依赖项。由于我们正在构建一个 Web 应用程序，我们还需要包括 spring-boot-starter-web 和 spring-boot-starter-thymeleaf 构件。</p>","autoDesc":true}');export{c as comp,m as data};
