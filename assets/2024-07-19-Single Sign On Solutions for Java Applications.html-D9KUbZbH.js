import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as a,a as n}from"./app-LwwahXlT.js";const o={},i=n('<h1 id="java应用程序的单点登录解决方案" tabindex="-1"><a class="header-anchor" href="#java应用程序的单点登录解决方案"><span>Java应用程序的单点登录解决方案</span></a></h1><p>组织用户在使用多个应用程序时经常需要在多个系统中进行身份验证。结果，用户必须记住多个账户和密码。单点登录（SSO）技术是解决这个问题的方案。<strong>SSO为一组系统提供了单一的登录凭证。</strong></p><p>在本教程中，我们将简要解释SSO是什么，然后我们将查看Java应用程序的七种不同的SSO解决方案。</p><p><strong>实现SSO解决方案可以通过以下两种协议之一进行：</strong></p><ul><li>SAML 2.0</li><li>OpenID Connect</li></ul><p>SAML 2.0（安全断言标记语言）简化了用户身份验证。它允许用户只需在身份提供者处注册和验证即可访问多个服务。它基于XML。OpenID Connect（OIDC）是SAML 2.0的后继者。同样，它是用于身份验证的OAuth 2.0协议的扩展。OIDC比SAML 2.0更简单易配置。</p><h3 id="_3-keycloak" tabindex="-1"><a class="header-anchor" href="#_3-keycloak"><span>3. Keycloak</span></a></h3><p><strong>Keycloak是一个开源的身份和访问管理（IAM）系统</strong>。它提供诸如SSO、用户联合、细粒度授权、社交登录、双因素认证（2FA）等功能。此外，它支持OpenID Connect、OAuth 2.0和SAML。它与第三方工具有很好的集成。例如，它与Spring Boot应用程序集成得非常好。最新版本可以在此处找到。此外，它为管理员和开发人员提供了友好的管理控制台，用于配置和管理Keycloak。源代码在GitHub上可用。</p><h3 id="_4-wso2-identity-server" tabindex="-1"><a class="header-anchor" href="#_4-wso2-identity-server"><span>4. WSO2 Identity Server</span></a></h3><p><strong>WSO2 Identity Server是由WSO2开发的开源IAM系统</strong>。它提供SSO、2FA、身份联合、社交登录等功能。它还支持几乎所有流行的身份标准。此外，它配备了管理控制台，并为与其他应用程序的集成公开了API。然而，它主要是用Java编写的，源代码在GitHub上可用。</p><h3 id="_5-gluu" tabindex="-1"><a class="header-anchor" href="#_5-gluu"><span>5. Gluu</span></a></h3><p><strong>Gluu是一个开源且云原生的IAM解决方案</strong>，具有多种访问管理功能。它提供强认证、移动认证、2FA和身份代理。此外，它还支持开放的Web标准，如OpenID Connect、SAML 2.0、FIDO和用户管理访问。它用Python语言编写。此外，自动化部署和配置Gluu服务器的脚本在GitHub上可用。</p><h3 id="_6-apereo-cas" tabindex="-1"><a class="header-anchor" href="#_6-apereo-cas"><span>6. Apereo CAS</span></a></h3><p><strong>Apereo CAS是一个开源的企业级SSO系统</strong>。它也是中央认证服务（CAS）项目的一部分。与之前的解决方案类似，它支持SAML、OAuth 2.0、OpenID Connect等多种协议。此外，它可以与uPortal、BlueSocket、TikiWiki、Mule、Liferay、Moodle等集成。它建立在Spring Boot和Spring Cloud之上。源代码在GitHub上可用。</p><h3 id="_7-spring-security-oauth2" tabindex="-1"><a class="header-anchor" href="#_7-spring-security-oauth2"><span>7. Spring Security OAuth2</span></a></h3><p>我们可以使用Spring Security OAuth项目来实现SSO解决方案。它支持OAuth提供者和OAuth消费者。此外，我们可以与软令牌和Spring Security一起实现2FA功能。</p><h3 id="_8-openam" tabindex="-1"><a class="header-anchor" href="#_8-openam"><span>8. OpenAM</span></a></h3><p><strong>OpenAM是一个开放访问管理解决方案，包括认证、授权、SSO和身份提供者</strong>。它支持跨域单点登录（CDSSO）、SAML 2.0、OAuth 2.0和OpenID Connect。最新版本和源代码可以在此处找到。</p><h3 id="_9-authelia" tabindex="-1"><a class="header-anchor" href="#_9-authelia"><span>9. Authelia</span></a></h3><p><strong>Authelia是一个开源的认证和授权服务器，提供SSO和2FA</strong>。它提供多种基于硬件的2FA，利用FIDO2 Webauthn兼容的安全密钥。此外，它还支持由应用程序（如Google Authenticator）生成的基于时间的一次性密码。Authelia服务器是用Go语言编写的，其所有源代码都在GitHub上可用。</p><h3 id="_10-结论" tabindex="-1"><a class="header-anchor" href="#_10-结论"><span>10. 结论</span></a></h3><p>许多组织今天使用SSO。在本文中，我们从非常高的层面上查看了Java生态系统中的SSO解决方案。一些解决方案提供了完整的IAM，而其他解决方案仅提供了SSO服务器和认证方法。Apereo CAS 是一个开源的企业级单点登录系统，也是中央认证服务（CAS）项目的一部分。与之前的解决方案一样，它支持多种协议，如SAML、OAuth 2.0、OpenID Connect等。它还可以与 uPortal、BlueSocket、TikiWiki、Mule、Liferay、Moodle 等集成。Apereo CAS 构建在 Spring Boot 和 Spring Cloud 之上，其源代码可在 GitHub 上获取。</p><p>Spring Security OAuth2 项目可以用来实现单点登录解决方案。它支持 OAuth 提供者和 OAuth 消费者。此外，我们可以使用软令牌和 Spring Security 实现双因素认证功能。</p><p>OpenAM 是一个开放访问管理解决方案，包括认证、授权、单点登录和身份提供者。它支持跨域单点登录（CDSSO）、SAML 2.0、OAuth 2.0 和 OpenID Connect。最新版本和源代码可以在其官方网站上找到。</p><p>Authelia 是一个开源的认证和授权服务器，提供单点登录和双因素认证。它支持多种基于硬件的双因素认证，利用 FIDO2 Webauthn 兼容的安全密钥。此外，它还支持由应用程序（如 Google Authenticator）生成的基于时间的一次性密码。Authelia 服务器是用 Go 语言编写的，其所有源代码都在 GitHub 上可用。</p><p>许多组织今天都在使用单点登录。在本文中，我们从非常高的层面上查看了 Java 生态系统中的单点登录解决方案。一些解决方案提供了完整的身份和访问管理，而其他解决方案仅提供了单点登录服务器和认证方法。</p><p>OK</p>',27),r=[i];function p(l,s){return a(),t("div",null,r)}const h=e(o,[["render",p],["__file","2024-07-19-Single Sign On Solutions for Java Applications.html.vue"]]),u=JSON.parse('{"path":"/posts/baeldung/2024-07-19/2024-07-19-Single%20Sign%20On%20Solutions%20for%20Java%20Applications.html","title":"Java应用程序的单点登录解决方案","lang":"zh-CN","frontmatter":{"date":"2024-07-20T00:00:00.000Z","category":["Java","SSO"],"tag":["SSO","Java应用","身份认证"],"head":[["meta",{"name":"keywords","content":"Java SSO解决方案,身份认证,单点登录"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-19/2024-07-19-Single%20Sign%20On%20Solutions%20for%20Java%20Applications.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java应用程序的单点登录解决方案"}],["meta",{"property":"og:description","content":"Java应用程序的单点登录解决方案 组织用户在使用多个应用程序时经常需要在多个系统中进行身份验证。结果，用户必须记住多个账户和密码。单点登录（SSO）技术是解决这个问题的方案。SSO为一组系统提供了单一的登录凭证。 在本教程中，我们将简要解释SSO是什么，然后我们将查看Java应用程序的七种不同的SSO解决方案。 实现SSO解决方案可以通过以下两种协议..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-19T21:11:28.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"SSO"}],["meta",{"property":"article:tag","content":"Java应用"}],["meta",{"property":"article:tag","content":"身份认证"}],["meta",{"property":"article:published_time","content":"2024-07-20T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-19T21:11:28.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java应用程序的单点登录解决方案\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-20T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-19T21:11:28.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java应用程序的单点登录解决方案 组织用户在使用多个应用程序时经常需要在多个系统中进行身份验证。结果，用户必须记住多个账户和密码。单点登录（SSO）技术是解决这个问题的方案。SSO为一组系统提供了单一的登录凭证。 在本教程中，我们将简要解释SSO是什么，然后我们将查看Java应用程序的七种不同的SSO解决方案。 实现SSO解决方案可以通过以下两种协议..."},"headers":[{"level":3,"title":"3. Keycloak","slug":"_3-keycloak","link":"#_3-keycloak","children":[]},{"level":3,"title":"4. WSO2 Identity Server","slug":"_4-wso2-identity-server","link":"#_4-wso2-identity-server","children":[]},{"level":3,"title":"5. Gluu","slug":"_5-gluu","link":"#_5-gluu","children":[]},{"level":3,"title":"6. Apereo CAS","slug":"_6-apereo-cas","link":"#_6-apereo-cas","children":[]},{"level":3,"title":"7. Spring Security OAuth2","slug":"_7-spring-security-oauth2","link":"#_7-spring-security-oauth2","children":[]},{"level":3,"title":"8. OpenAM","slug":"_8-openam","link":"#_8-openam","children":[]},{"level":3,"title":"9. Authelia","slug":"_9-authelia","link":"#_9-authelia","children":[]},{"level":3,"title":"10. 结论","slug":"_10-结论","link":"#_10-结论","children":[]}],"git":{"createdTime":1721423488000,"updatedTime":1721423488000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.63,"words":1389},"filePathRelative":"posts/baeldung/2024-07-19/2024-07-19-Single Sign On Solutions for Java Applications.md","localizedDate":"2024年7月20日","excerpt":"\\n<p>组织用户在使用多个应用程序时经常需要在多个系统中进行身份验证。结果，用户必须记住多个账户和密码。单点登录（SSO）技术是解决这个问题的方案。<strong>SSO为一组系统提供了单一的登录凭证。</strong></p>\\n<p>在本教程中，我们将简要解释SSO是什么，然后我们将查看Java应用程序的七种不同的SSO解决方案。</p>\\n<p><strong>实现SSO解决方案可以通过以下两种协议之一进行：</strong></p>\\n<ul>\\n<li>SAML 2.0</li>\\n<li>OpenID Connect</li>\\n</ul>\\n<p>SAML 2.0（安全断言标记语言）简化了用户身份验证。它允许用户只需在身份提供者处注册和验证即可访问多个服务。它基于XML。OpenID Connect（OIDC）是SAML 2.0的后继者。同样，它是用于身份验证的OAuth 2.0协议的扩展。OIDC比SAML 2.0更简单易配置。</p>","autoDesc":true}');export{h as comp,u as data};
