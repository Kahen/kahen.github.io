import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as e,a}from"./app-BDZ-trJf.js";const s={},o=a(`<h1 id="使用spring-boot-cli编码密码" tabindex="-1"><a class="header-anchor" href="#使用spring-boot-cli编码密码"><span>使用Spring Boot CLI编码密码</span></a></h1><p>如果你正在开发Spring Security（尤其是OAuth）实现，一定要看看《学习Spring安全》课程：</p><p><strong>&gt;&gt; 学习Spring</strong><strong>安全</strong></p><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span><strong>1. 概述</strong></span></a></h2><p>Spring Boot CLI（命令行界面）是一个用于从命令提示符运行和测试Spring Boot应用程序的Spring Boot工具。这个工具提供了一个非常有用的功能，用于编码密码。<strong>这个工具的主要目的是避免暴露明文密码，并能够生成和使用编码密码。</strong></p><p>在本教程中，我们将深入Spring Security的世界，学习<strong>如何使用Spring Boot CLI编码密码</strong>。</p><h2 id="_2-密码编码" tabindex="-1"><a class="header-anchor" href="#_2-密码编码"><span><strong>2. 密码编码</strong></span></a></h2><p>密码编码是一种将密码以二进制格式表示的方法，可以保存在存储介质上。我们可以使用Spring Security对密码进行编码，也可以委托给Spring Boot CLI。</p><h3 id="_2-1-spring-security-passwordencoder" tabindex="-1"><a class="header-anchor" href="#_2-1-spring-security-passwordencoder"><span>2.1. Spring Security <em>PasswordEncoder</em></span></a></h3><p>Spring Security提供了_PasswordEncoder_接口，它有相当多的实现方式，例如_StandardPasswordEncoder_和_BCryptPasswordEncoder_。</p><p>此外，Spring Security推荐使用_BCryptPasswordEncoder_，它基于一个强大的算法，带有随机生成的盐。在框架的早期版本中，可以使用_MD5PasswordEncoder_或_SHAPasswordEncoder_类，但由于它们的算法弱点，现在它们已经被弃用。</p><p>另外，这两个类迫使开发者将盐作为构造函数参数传递，而_BCryptPasswordEncoder_将内部生成一个随机盐。由_BCryptPasswordEncoder_生成的字符串将有60个字符大小，因此基础列应该接受这个大小的字符串。</p><p>另一方面，_StandardPasswordEncoder_类基于_SHA-256_算法。</p><p>显然，第三方系统中创建的用户密码必须按照Spring Security中选择的编码类型进行编码，以确保其认证成功。</p><h3 id="_2-2-spring-boot-cli-密码编码器" tabindex="-1"><a class="header-anchor" href="#_2-2-spring-boot-cli-密码编码器"><span>2.2. Spring Boot CLI 密码编码器</span></a></h3><p>Spring Boot CLI带有一堆命令，其中之一是_encodepassword_。这个命令允许为Spring Security使用而对密码进行编码。简单来说，<strong>Spring Boot CLI _encodepassword_命令可以直接将原始密码转换为加密密码</strong>，使用这个简单的语法：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>spring encodepassword <span class="token punctuation">[</span>options<span class="token punctuation">]</span> <span class="token variable"><span class="token variable">\`</span><span class="token operator">&lt;</span>password to encode<span class="token operator">&gt;</span><span class="token variable">\`</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>值得注意的是，从Spring Security 5.0开始，默认的密码编码机制是_BCrypt_。</strong></p><h2 id="_3-示例" tabindex="-1"><a class="header-anchor" href="#_3-示例"><span><strong>3. 示例</strong></span></a></h2><p>为了阐明使用Spring Boot CLI的密码编码机制，我们将使用一个基本的认证服务通过用户名和密码来验证用户。在这个例子中，我们将简单地使用Spring Security的自动配置。</p><p>我们的想法是避免暴露明文密码，而是使用编码密码。现在让我们看看如何使用_encodepassword_命令使用Spring Boot CLI编码密码。我们只需要在命令提示符中执行这个命令：</p><p><code>spring encodepassword baeldungPassword</code></p><p>上述命令的结果是一个用_BCrypt_编码的密码，这非常难以破解。例如，用于Spring Boot Security配置的编码密码看起来像这样：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token punctuation">{</span>bcrypt<span class="token punctuation">}</span><span class="token variable">$2y</span><span class="token variable">$10</span><span class="token variable">$R8VIwFiQ7aUST17YqMaWJuxjkCYqk3jjPlSxyDLLzqCTOwFuJNq2a</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>现在让我们通过修改属性文件来自定义默认的安全配置。例如，我们可以通过添加我们自己的用户名和密码来覆盖默认的用户名和密码。</p><p>我们的编码密码进入_spring.security.user.password_属性：</p><div class="language-properties line-numbers-mode" data-ext="properties" data-title="properties"><pre class="language-properties"><code><span class="token key attr-name">spring</span><span class="token punctuation">:</span>
<span class="token key attr-name">  security</span><span class="token punctuation">:</span>
<span class="token key attr-name">    user</span><span class="token punctuation">:</span>
<span class="token key attr-name">      name</span><span class="token punctuation">:</span> <span class="token value attr-value">baeldung</span>
<span class="token key attr-name">      password</span><span class="token punctuation">:</span> <span class="token value attr-value">&#39;{bcrypt}$2y$10$R8VIwFiQ7aUST17YqMaWJuxjkCYqk3jjPlSxyDLLzqCTOwFuJNq2a&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span><strong>4. 结论</strong></span></a></h2><p>在本文中，我们学习了如何使用Spring Boot CLI编码密码。我们还使用Spring Security简单认证来演示如何使用编码密码。主要目的是避免暴露明文密码，并能够轻松生成编码密码。</p><p>如往常一样，教程的完整代码可以在GitHub上找到。</p><p><img src="https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg" alt="img" loading="lazy"><img src="https://secure.gravatar.com/avatar/0728087722c48c379bfd934fd8723735?s=50&amp;r=g" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/custom_avatars/viniok-150x150.jpg" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-security-post-footer-main-1.2.0.jpg" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-security-lightbox-icn-1.0.0-1.png" alt="img" loading="lazy"></p><p>OK</p>`,32),r=[o];function p(i,c){return e(),t("div",null,r)}const g=n(s,[["render",p],["__file","2024-07-06-Encode Passwords With Spring Boot CLI.html.vue"]]),u=JSON.parse('{"path":"/posts/baeldung/2024-07-06/2024-07-06-Encode%20Passwords%20With%20Spring%20Boot%20CLI.html","title":"使用Spring Boot CLI编码密码","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Spring Boot CLI","密码编码"],"tag":["Spring Security","OAuth"],"head":[["meta",{"name":"keywords","content":"Spring Boot CLI, 密码编码, Spring Security, BCryptPasswordEncoder"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-06/2024-07-06-Encode%20Passwords%20With%20Spring%20Boot%20CLI.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用Spring Boot CLI编码密码"}],["meta",{"property":"og:description","content":"使用Spring Boot CLI编码密码 如果你正在开发Spring Security（尤其是OAuth）实现，一定要看看《学习Spring安全》课程： >> 学习Spring 安全 1. 概述 Spring Boot CLI（命令行界面）是一个用于从命令提示符运行和测试Spring Boot应用程序的Spring Boot工具。这个工具提供了一个非..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-06T07:31:50.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Spring Security"}],["meta",{"property":"article:tag","content":"OAuth"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-06T07:31:50.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用Spring Boot CLI编码密码\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg\\",\\"https://secure.gravatar.com/avatar/0728087722c48c379bfd934fd8723735?s=50&r=g\\",\\"https://www.baeldung.com/wp-content/uploads/custom_avatars/viniok-150x150.jpg\\",\\"https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-security-post-footer-main-1.2.0.jpg\\",\\"https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-security-lightbox-icn-1.0.0-1.png\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-06T07:31:50.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用Spring Boot CLI编码密码 如果你正在开发Spring Security（尤其是OAuth）实现，一定要看看《学习Spring安全》课程： >> 学习Spring 安全 1. 概述 Spring Boot CLI（命令行界面）是一个用于从命令提示符运行和测试Spring Boot应用程序的Spring Boot工具。这个工具提供了一个非..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 密码编码","slug":"_2-密码编码","link":"#_2-密码编码","children":[{"level":3,"title":"2.1. Spring Security PasswordEncoder","slug":"_2-1-spring-security-passwordencoder","link":"#_2-1-spring-security-passwordencoder","children":[]},{"level":3,"title":"2.2. Spring Boot CLI 密码编码器","slug":"_2-2-spring-boot-cli-密码编码器","link":"#_2-2-spring-boot-cli-密码编码器","children":[]}]},{"level":2,"title":"3. 示例","slug":"_3-示例","link":"#_3-示例","children":[]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1720251110000,"updatedTime":1720251110000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.18,"words":954},"filePathRelative":"posts/baeldung/2024-07-06/2024-07-06-Encode Passwords With Spring Boot CLI.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>如果你正在开发Spring Security（尤其是OAuth）实现，一定要看看《学习Spring安全》课程：</p>\\n<p><strong>&gt;&gt; 学习Spring</strong>\\n<strong>安全</strong></p>\\n<h2><strong>1. 概述</strong></h2>\\n<p>Spring Boot CLI（命令行界面）是一个用于从命令提示符运行和测试Spring Boot应用程序的Spring Boot工具。这个工具提供了一个非常有用的功能，用于编码密码。<strong>这个工具的主要目的是避免暴露明文密码，并能够生成和使用编码密码。</strong></p>","autoDesc":true}');export{g as comp,u as data};
