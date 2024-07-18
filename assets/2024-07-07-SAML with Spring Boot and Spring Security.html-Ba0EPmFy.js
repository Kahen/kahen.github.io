import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as a,a as i}from"./app-CE5go3V-.js";const n={},l=i(`<h1 id="spring-boot和spring-security中的saml" tabindex="-1"><a class="header-anchor" href="#spring-boot和spring-security中的saml"><span>Spring Boot和Spring Security中的SAML</span></a></h1><p>如果您正在实现Spring Security（特别是OAuth），请务必查看《学习Spring安全》课程。</p><p><strong>&gt;&gt; 学习Spring</strong><strong>安全</strong></p><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在本教程中，我们将使用Spring Boot设置SAML2。SAML是一种长期受信任的技术，用于实现安全应用程序。设置SAML需要多方配置，因此过程有些复杂。我们需要在我们的服务提供商和身份提供商之间来回几次，因此需要耐心地按照逐步指南进行。让我们深入了解创建我们工作应用程序的每个步骤。</p><h2 id="_2-设置服务提供商-sp" tabindex="-1"><a class="header-anchor" href="#_2-设置服务提供商-sp"><span>2. 设置服务提供商（SP）</span></a></h2><p>在我们的例子中，Spring Boot应用程序是我们的服务提供商。让我们设置一个带有Spring Security、Spring MVC和OpenSAML依赖项的Spring Boot应用程序。**一个关键依赖项是Spring Security SAML2。**Spring Security框架中新的SAML2支持通过单一依赖项提供：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>\`&lt;dependency&gt;\`
    \`&lt;groupId&gt;\`org.springframework.security\`&lt;/groupId&gt;\`
    \`&lt;artifactId&gt;\`spring-security-saml2-service-provider\`&lt;/artifactId&gt;\`
\`&lt;/dependency&gt;\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-1-saml配置" tabindex="-1"><a class="header-anchor" href="#_2-1-saml配置"><span>2.1. SAML配置</span></a></h3><p>现在让我们在_application.yml_中添加必要的SAML2配置。<strong>最重要的配置是来自身份提供商的元数据</strong>。尽管我们已经将_metadata-uri_添加到我们的配置中以完成配置，但目前它还没有可用：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>spring:
  security:
    saml2:
      relyingparty:
        registration:
          okta:
            signing:
              credentials:
                - private-key-location: classpath:local.key
                  certificate-location: classpath:local.crt
            singlelogout:
              binding: POST
              response-url: &quot;{baseUrl}/logout/saml2/slo&quot;
            assertingparty:
              metadata-uri: &quot;classpath:metadata/metadata-idp.xml&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>_singlelogout_配置定义了我们的身份提供商在成功登出后将重定向到的端点。此外，_signing_credentials_配置添加了我们的应用程序将用于向身份提供商签署登出请求的密钥和证书。我们使用OpenSSL工具生成_local.key_和_local.crt_文件：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>openssl req -newkey rsa:2048 -nodes -keyout local.key -x509 -days 365 -out local.crt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_2-2-代码中的安全配置" tabindex="-1"><a class="header-anchor" href="#_2-2-代码中的安全配置"><span>2.2. 代码中的安全配置</span></a></h3><p>在这一步中，**让我们在我们的过滤器链中添加一个安全过滤器。这个过滤器将身份提供商的元数据添加到我们的安全上下文中。**此外，让我们还在_http_对象上添加_saml2Login()_和_saml2Logout()_方法调用，分别启用登录和登出：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Saml2MetadataFilter filter = new Saml2MetadataFilter(relyingPartyRegistrationResolver, new OpenSamlMetadataResolver());

http.csrf(AbstractHttpConfigurer::disable).authorizeHttpRequests(authorize -&gt;
    authorize.anyRequest()
  .authenticated())
  .saml2Login(withDefaults())
  .saml2Logout(withDefaults())
  .addFilterBefore(filter, Saml2WebSsoAuthenticationFilter.class);

return http.build();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们使用_withDefaults()_方法配置_saml2Login_和_saml2Logout_的默认行为。这是使用Spring Boot平台的真正力量。只需几行代码即可完成我们所有的SAML2应用程序设置。接下来，我们将在Okta中设置我们的身份提供商。</p><h2 id="_3-设置身份提供商-idp" tabindex="-1"><a class="header-anchor" href="#_3-设置身份提供商-idp"><span>3. 设置身份提供商（IdP）</span></a></h2><p>在这一步中，让我们将Okta设置为我们的身份提供商。<strong>身份提供商是认证我们的用户并生成SAML断言的一方</strong>。然后，这个SAML断言被传回给我们的用户代理。用户代理将这个SAML断言呈现给服务提供商进行认证。服务提供商从身份提供商那里验证它，并允许用户访问其资源。</p><p>在Okta开发人员账户注册并登录后，我们得到一个带有左侧边栏的屏幕。在这个边栏中，让我们导航到应用程序页面并开始我们的SAML应用程序集成过程：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/03/okta1.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h3 id="_3-1-创建应用程序集成" tabindex="-1"><a class="header-anchor" href="#_3-1-创建应用程序集成"><span>3.1. 创建应用程序集成</span></a></h3><p>接下来，让我们点击‘创建应用程序集成’以打开‘创建新的应用程序集成’对话框并选择SAML 2.0：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/03/okta2.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>我们将点击‘下一步’开始‘创建SAML集成’向导。这是一个三步向导。让我们完成每个步骤以完成我们的设置。</p><h3 id="_3-2-常规设置" tabindex="-1"><a class="header-anchor" href="#_3-2-常规设置"><span>3.2. 常规设置</span></a></h3><p>在这一步中，我们将应用程序名称输入为‘<em>Baeldung Spring Security SAML2 App</em>’：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/03/okta4.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h3 id="_3-3-配置saml" tabindex="-1"><a class="header-anchor" href="#_3-3-配置saml"><span>3.3. 配置SAML</span></a></h3><p>**现在让我们为我们的SAML应用程序配置最重要的细节。**在这里，我们将在身份提供商中注册单一登录URL。因此，身份提供商接受来自这个URL的SSO请求。受众URI是SAML断言接收者的标识符。这被添加到生成并发送回用户代理的SAML断言中：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/03/okta-004-create_a_new_app_integration_configure_saml-1-1.jpg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>在我们的例子中，受众URI是_http://localhost:8080/saml2/service-provider-metadata/okta_，而单一登录URL是_http://localhost:8080/login/saml2/sso/okta_。</p><h3 id="_3-4-高级设置和用户属性" tabindex="-1"><a class="header-anchor" href="#_3-4-高级设置和用户属性"><span>3.4. 高级设置和用户属性</span></a></h3><p>现在让我们展开‘显示高级设置’部分。为了启用_singlelogout_功能，我们需要在这里上传_local.crt_证书。<strong>这是我们在服务提供商_application.yml_中配置的相同证书</strong>。服务提供商应用程序使用此证书签署任何登出请求。</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/03/okta3.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>此外，让我们将‘单一登出URL’配置为_http://localhost:8080/logout/saml2/slo_。</p><p>最后，我们还为_emailAddress_和_firstName_配置属性声明：</p><blockquote><p>emailAddress -&gt; 未指定 -&gt; user.email</p></blockquote><blockquote><p>firstName -&gt; 未指定 -&gt; user.firstName</p></blockquote><p>在我们移动到‘下一步’之前，让我们使用此步骤底部的‘预览SAML断言’链接预览SAML断言。</p><h3 id="_3-5-最终反馈" tabindex="-1"><a class="header-anchor" href="#_3-5-最终反馈"><span>3.5. 最终反馈</span></a></h3><p>在反馈步骤中，让我们选择选项，“我是添加内部应用程序的Okta客户”。</p><h3 id="_3-6-saml设置说明" tabindex="-1"><a class="header-anchor" href="#_3-6-saml设置说明"><span>3.6. SAML设置说明</span></a></h3><p>完成反馈步骤后，我们将进入应用程序的‘登录’选项卡。在此屏幕上，让我们按照右侧边栏部的“查看SAML设置说明”链接：</p><p>这将带我们进入一个页面，其中包含有关我们身份提供商的必要信息。让我们移动到最后一个字段，其中包含IdP元数据：</p><p>我们将此元数据复制并保存为我们服务提供商应用程序_resources/metadata_文件夹中的_metadata-idp-okta.xml_，从而满足_application.yml_中的_metadata_uri_要求：</p><p>这完成了我们‘服务提供商’和‘身份提供商’的设置。接下来，我们将在Okta开发人员账户中创建用户并将其分配给我们的应用程序。</p><h2 id="_4-创建用户主体" tabindex="-1"><a class="header-anchor" href="#_4-创建用户主体"><span>4. 创建用户主体</span></a></h2><p>让我们登录到Okta开发人员账户并导航到左侧边栏的‘目录’部分下的‘人员’页面。在这里，我们将填写‘添加人员’表单以创建用户。有时，可能需要刷新‘人员’页面才能在列表中看到新用户：</p><p>在这种情况下，我们自动激活用户。通常，您可能想要发送激活电子邮件或切换切换以使用户在第一次尝试时更改分配的密码。</p><p>最后，我们点击‘分配’并遵循几个步骤将新用户分配给我们的SAML应用程序。</p><h2 id="_5-测试应用程序" tabindex="-1"><a class="header-anchor" href="#_5-测试应用程序"><span>5. 测试应用程序</span></a></h2><p>现在，我们已经准备好测试我们的应用程序。让我们启动我们的Spring Boot应用程序并打开我们应用程序的默认端点_http://localhost:8080_。这将带我们到登录屏幕：</p><p>接下来，我们在我们的成功登录页面上。除了我们的用户名外，我们还在页面上显示了用户属性，例如_emailAddress_和_firstName_：</p><p>这结束了设置我们的SAML应用程序的整个过程。但是，在离开之前，<strong>让我们检查最后一件事：‘登出’按钮</strong>。</p><p>首先，我们需要将属性<code>&lt;OKTA-ID&gt;</code>设置为您的Okta标识符（您可以在URL中看到）：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>spring:
  security:
    saml2:
      relyingparty:
        registration:
          okta:
            ...
            singlelogout:
              url: https://dev-\`\`&lt;OKTA-ID&gt;\`\`.okta.com/app/dev-56617222_springbootsaml_1/exk8b5jr6vYQqVXp45d7/slo/saml
              binding: POST
              response-url: &quot;{baseUrl}/logout/saml2/slo&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后我们将能够从所有我们的SAML会话中注销已登录的用户：</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们学习了Spring Boot Security对SAML2的支持。尽管SAML2是一项复杂技术，但它是大型企业的首选。一旦我们理解了SAML2，利用它提供的强大的功能就非常有趣。除了保护我们的应用程序外，SAML2还允许我们使用单点登录(SSO)，避免记住多个应用程序的多个用户名和密码。</p><p>如往常一样，本文示例的源代码可在GitHub上获得。</p><p>OK</p>`,62),r=[l];function s(p,o){return a(),t("div",null,r)}const g=e(n,[["render",s],["__file","2024-07-07-SAML with Spring Boot and Spring Security.html.vue"]]),u=JSON.parse('{"path":"/posts/baeldung/2024-07-07/2024-07-07-SAML%20with%20Spring%20Boot%20and%20Spring%20Security.html","title":"Spring Boot和Spring Security中的SAML","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Spring Security","SAML"],"tag":["Spring Boot","Spring Security","SAML2"],"head":[["meta",{"name":"keywords","content":"Spring Security, SAML2, Spring Boot, SSO"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-07/2024-07-07-SAML%20with%20Spring%20Boot%20and%20Spring%20Security.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Spring Boot和Spring Security中的SAML"}],["meta",{"property":"og:description","content":"Spring Boot和Spring Security中的SAML 如果您正在实现Spring Security（特别是OAuth），请务必查看《学习Spring安全》课程。 >> 学习Spring 安全 1. 概述 在本教程中，我们将使用Spring Boot设置SAML2。SAML是一种长期受信任的技术，用于实现安全应用程序。设置SAML需要多方配..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2023/03/okta1.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-07T23:35:50.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Spring Boot"}],["meta",{"property":"article:tag","content":"Spring Security"}],["meta",{"property":"article:tag","content":"SAML2"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-07T23:35:50.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Spring Boot和Spring Security中的SAML\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2023/03/okta1.png\\",\\"https://www.baeldung.com/wp-content/uploads/2023/03/okta2.png\\",\\"https://www.baeldung.com/wp-content/uploads/2023/03/okta4.png\\",\\"https://www.baeldung.com/wp-content/uploads/2023/03/okta-004-create_a_new_app_integration_configure_saml-1-1.jpg\\",\\"https://www.baeldung.com/wp-content/uploads/2023/03/okta3.png\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-07T23:35:50.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Spring Boot和Spring Security中的SAML 如果您正在实现Spring Security（特别是OAuth），请务必查看《学习Spring安全》课程。 >> 学习Spring 安全 1. 概述 在本教程中，我们将使用Spring Boot设置SAML2。SAML是一种长期受信任的技术，用于实现安全应用程序。设置SAML需要多方配..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 设置服务提供商（SP）","slug":"_2-设置服务提供商-sp","link":"#_2-设置服务提供商-sp","children":[{"level":3,"title":"2.1. SAML配置","slug":"_2-1-saml配置","link":"#_2-1-saml配置","children":[]},{"level":3,"title":"2.2. 代码中的安全配置","slug":"_2-2-代码中的安全配置","link":"#_2-2-代码中的安全配置","children":[]}]},{"level":2,"title":"3. 设置身份提供商（IdP）","slug":"_3-设置身份提供商-idp","link":"#_3-设置身份提供商-idp","children":[{"level":3,"title":"3.1. 创建应用程序集成","slug":"_3-1-创建应用程序集成","link":"#_3-1-创建应用程序集成","children":[]},{"level":3,"title":"3.2. 常规设置","slug":"_3-2-常规设置","link":"#_3-2-常规设置","children":[]},{"level":3,"title":"3.3. 配置SAML","slug":"_3-3-配置saml","link":"#_3-3-配置saml","children":[]},{"level":3,"title":"3.4. 高级设置和用户属性","slug":"_3-4-高级设置和用户属性","link":"#_3-4-高级设置和用户属性","children":[]},{"level":3,"title":"3.5. 最终反馈","slug":"_3-5-最终反馈","link":"#_3-5-最终反馈","children":[]},{"level":3,"title":"3.6. SAML设置说明","slug":"_3-6-saml设置说明","link":"#_3-6-saml设置说明","children":[]}]},{"level":2,"title":"4. 创建用户主体","slug":"_4-创建用户主体","link":"#_4-创建用户主体","children":[]},{"level":2,"title":"5. 测试应用程序","slug":"_5-测试应用程序","link":"#_5-测试应用程序","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1720395350000,"updatedTime":1720395350000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":6.69,"words":2007},"filePathRelative":"posts/baeldung/2024-07-07/2024-07-07-SAML with Spring Boot and Spring Security.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>如果您正在实现Spring Security（特别是OAuth），请务必查看《学习Spring安全》课程。</p>\\n<p><strong>&gt;&gt; 学习Spring</strong>\\n<strong>安全</strong></p>\\n<h2>1. 概述</h2>\\n<p>在本教程中，我们将使用Spring Boot设置SAML2。SAML是一种长期受信任的技术，用于实现安全应用程序。设置SAML需要多方配置，因此过程有些复杂。我们需要在我们的服务提供商和身份提供商之间来回几次，因此需要耐心地按照逐步指南进行。让我们深入了解创建我们工作应用程序的每个步骤。</p>\\n<h2>2. 设置服务提供商（SP）</h2>","autoDesc":true}');export{g as comp,u as data};
