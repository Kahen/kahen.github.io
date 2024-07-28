import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as n,a as i}from"./app-D4B8YWfq.js";const a={},l=i('<h1 id="keycloak中自定义协议映射器" tabindex="-1"><a class="header-anchor" href="#keycloak中自定义协议映射器"><span>Keycloak中自定义协议映射器</span></a></h1><p>Keycloak是一个开源的身份和访问管理(IAM)解决方案，专注于现代应用程序和服务。当用户通过Keycloak进行身份验证时，服务器颁发的令牌包含有关经过身份验证的用户和令牌所颁发的客户端的重要信息。</p><p>Keycloak的令牌包含一些默认属性，例如_iss_（发行者）、<em>exp</em>（过期时间）、<em>sub</em>（主题）和_aud_（受众）。但很多时候，这些属性还不够，我们可能需要向令牌添加一些额外的信息。在这种情况下，我们使用协议映射器。</p><p>在本教程中，我们将展示<strong>如何在Keycloak授权服务器中添加自定义协议映射器</strong>。</p><p><strong>Keycloak令牌只是一个包含一组声明的JSON对象</strong>，并且通常都是数字签名的。让我们检查一下令牌的有效载荷示例及其标准化声明的集合：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>{\n  &quot;exp&quot;: 1680679982,\n  &quot;iat&quot;: 1680679682,\n  &quot;jti&quot;: &quot;bebf7b2c-f813-47be-ad63-0ca6323bba19&quot;,\n  &quot;iss&quot;: &quot;http://192.168.198.128:8085/auth/realms/baeldung&quot;,\n  &quot;aud&quot;: &quot;account&quot;,\n  &quot;sub&quot;: &quot;648b0687-c002-441d-b797-0003b30168ed&quot;,\n  &quot;typ&quot;: &quot;Bearer&quot;,\n  &quot;azp&quot;: &quot;client-app&quot;,\n  &quot;acr&quot;: &quot;1&quot;,\n  ...\n  &quot;scope&quot;: &quot;email profile&quot;,\n  &quot;clientId&quot;: &quot;client-app&quot;,\n  &quot;clientHost&quot;: &quot;192.168.198.1&quot;,\n  &quot;email_verified&quot;: false,\n  &quot;preferred_username&quot;: &quot;service-account-client-app&quot;,\n  &quot;clientAddress&quot;: &quot;192.168.198.1&quot;\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>协议映射器将诸如电子邮件地址之类的项目映射到身份和访问令牌中的特定声明</strong>。我们可以通过向客户端添加协议映射器来自定义令牌中的声明。</p><h2 id="_3-设置keycloak服务器" tabindex="-1"><a class="header-anchor" href="#_3-设置keycloak服务器"><span>3. 设置Keycloak服务器</span></a></h2><p>在本教程中，我们将使用Keycloak独立版本。我们已经介绍过如何设置Keycloak服务器，所以这里不会详细介绍。</p><p>让我们在Keycloak实例中添加一个新的领域称为_baeldung_和一个新的客户端称为_client-app_：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/04/bael-0.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>我们将保留所有默认设置，除了_Client authentication_和_Service accounts roles_字段：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/04/bael-00.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>_Service accounts roles_字段启用了此客户端的_Client Credentials Grant_支持。</p><h2 id="_4-自定义协议映射器实现" tabindex="-1"><a class="header-anchor" href="#_4-自定义协议映射器实现"><span>4. 自定义协议映射器实现</span></a></h2><p>现在我们已经设置了Keycloak服务器，我们将创建一个自定义协议映射器并在Keycloak服务器中配置它。</p><h3 id="_4-1-依赖项" tabindex="-1"><a class="header-anchor" href="#_4-1-依赖项"><span>4.1. 依赖项</span></a></h3><p>我们的<strong>自定义协议映射器是一个常规的Maven项目，它创建一个JAR文件</strong>。</p><p>让我们首先在_pom.xml_中声明_keycloak-core_、<em>keycloak-server-spi</em>、_keycloak-server-spi-private_和_keycloak-services_依赖项：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>````&lt;dependency&gt;````\n    ````&lt;groupId&gt;````org.keycloak````&lt;/groupId&gt;````\n    ````&lt;artifactId&gt;````keycloak-core````&lt;/artifactId&gt;````\n    ````&lt;scope&gt;````provided````&lt;/scope&gt;````\n    ````&lt;version&gt;````21.0.1````&lt;/version&gt;````\n````&lt;/dependency&gt;````\n````&lt;dependency&gt;````\n    ````&lt;groupId&gt;````org.keycloak````&lt;/groupId&gt;````\n    ````&lt;artifactId&gt;````keycloak-server-spi````&lt;/artifactId&gt;````\n    ````&lt;scope&gt;````provided````&lt;/scope&gt;````\n    ````&lt;version&gt;````21.0.1````&lt;/version&gt;````\n````&lt;/dependency&gt;````\n````&lt;dependency&gt;````\n    ````&lt;groupId&gt;````org.keycloak````&lt;/groupId&gt;````\n    ````&lt;artifactId&gt;````keycloak-server-spi-private````&lt;/artifactId&gt;````\n    ````&lt;scope&gt;````provided````&lt;/scope&gt;````\n    ````&lt;version&gt;````21.0.1````&lt;/version&gt;````\n````&lt;/dependency&gt;````\n````&lt;dependency&gt;````\n    ````&lt;groupId&gt;````org.keycloak````&lt;/groupId&gt;````\n    ````&lt;artifactId&gt;````keycloak-services````&lt;/artifactId&gt;````\n    ````&lt;scope&gt;````provided````&lt;/scope&gt;````\n    ````&lt;version&gt;````21.0.1````&lt;/version&gt;````\n````&lt;/dependency&gt;````\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2-扩展-abstractoidcprotocolmapper-类" tabindex="-1"><a class="header-anchor" href="#_4-2-扩展-abstractoidcprotocolmapper-类"><span>4.2. 扩展_AbstractOIDCProtocolMapper_类</span></a></h3><p>现在让我们创建我们的协议映射器。为此，<strong>我们扩展_AbstractOIDCProtocolMapper_类并实现所有抽象方法</strong>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public class CustomProtocolMapper extends AbstractOIDCProtocolMapper implements OIDCAccessTokenMapper,\n  OIDCIDTokenMapper, UserInfoTokenMapper {\n    public static final String PROVIDER_ID = &quot;custom-protocol-mapper&quot;;\n\n    private static final List``&lt;ProviderConfigProperty&gt;`` configProperties = new ArrayList&lt;&gt;();\n    static {\n        OIDCAttributeMapperHelper.addTokenClaimNameConfig(configProperties);\n        OIDCAttributeMapperHelper.addIncludeInTokensConfig(configProperties, CustomProtocolMapper.class);\n    }\n\n    @Override\n    public String getDisplayCategory() {\n        return &quot;Token Mapper&quot;;\n    }\n\n    @Override\n    public String getDisplayType() {\n        return &quot;Custom Token Mapper&quot;;\n    }\n\n    @Override\n    public String getHelpText() {\n        return &quot;Adds a Baeldung text to the claim&quot;;\n    }\n\n    @Override\n    public List``&lt;ProviderConfigProperty&gt;`` getConfigProperties() {\n        return configProperties;\n    }\n\n    @Override\n    public String getId() {\n        return PROVIDER_ID;\n    }\n\n    @Override\n    protected void setClaim(IDToken token, ProtocolMapperModel mappingModel,\n      UserSessionModel userSession, KeycloakSession keycloakSession,\n      ClientSessionContext clientSessionCtx) {\n        OIDCAttributeMapperHelper.mapClaim(token, mappingModel, &quot;Baeldung&quot;);\n    }\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们选择了_&quot;custom-protocol-mapper&quot;_作为我们的提供者ID，这是令牌映射器的ID。我们需要这个ID来在我们的Keycloak服务器中配置协议映射器。</p><p><strong>主要方法是_setClaim()_</strong>。<strong>它将我们的数据添加到令牌中</strong>。我们的_setClaim()_实现简单地将_Baeldung_文本添加到令牌中。</p><p>_getDisplayType()_和_getHelpText()_方法用于管理控制台。_getDisplayType()_方法定义了在管理控制台中列出协议映射器时显示的文本。_getHelpText()_方法是我们在选择协议映射器时显示的提示工具文本。</p><h3 id="_4-3-整合" tabindex="-1"><a class="header-anchor" href="#_4-3-整合"><span>4.3. 整合</span></a></h3><p>我们不能忘记创建一个服务定义文件并将其添加到我们的项目中。这个文件应该被命名为_org.keycloak.protocol.ProtocolMapper_，并放置在我们的最终JAR的_META-INF/services_目录中。此外，文件的内容是自定义协议映射器实现的完全限定类名：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>com.baeldung.auth.provider.mapper.CustomProtocolMapper\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>目录结构如下所示：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/04/directory-structure.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>现在，项目已经准备好运行。首先，我们使用Maven _install_命令创建一个JAR文件：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>mvn clean install\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>接下来，我们通过将JAR文件添加到Keycloak的_providers_目录来部署它。之后，我们必须重新启动服务器，以使用我们JAR文件中的实现更新服务器的提供者注册表：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ bin/kc.sh start-dev\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>正如我们在控制台输出中看到的，Keycloak注册了我们的自定义协议映射器：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Updating the configuration and installing your custom providers, if any. Please wait.\n2023-04-05 14:55:42,588 WARN  [org.keycloak.services] (build-108) KC-SERVICES0047: custom-protocol-mapper (com.baeldung.auth.provider.CustomProtocolMapper) is implementing the internal SPI protocol-mapper.\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，如果我们去Keycloak的管理控制台的_Provider info_页面，我们将看到我们的_custom-protocol-mapper_：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/04/bael-1.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>现在，我们可以配置服务器使用我们的自定义协议映射器。</p><h3 id="_4-4-配置客户端" tabindex="-1"><a class="header-anchor" href="#_4-4-配置客户端"><span>4.4. 配置客户端</span></a></h3><p>在Keycloak中，我们可以使用管理面板<strong>添加自定义声明</strong>。为此，我们需要进入管理控制台中的客户端。回想一下，我们之前创建了一个客户端，<em>client-app</em>。之后，我们导航到_Client scopes_标签：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/04/bael-2.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>现在，让我们点击_client-app-dedicated_并转到它的_Add mapper By configuration_来创建一个新的映射：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/04/bael-6.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>在这里，我们需要<strong>输入我们的自定义映射器的_Mapper type_</strong>。我们将输入“<em>Custom Token Mapper</em>”，这是我们在_CustomProtocolMapper_类中用于_getDisplayType()_方法的值：</p><p>接下来，我们给映射器一个_Name_并保存它。然后，当我们回到_client-app-dedicated_，我们将在列表中看到新的映射：</p><p>现在，我们已经准备好测试我们的协议映射器</p>',48),o=[l];function s(r,d){return n(),t("div",null,o)}const u=e(a,[["render",s],["__file","2024-07-06-Custom Protocol Mapper with Keycloak.html.vue"]]),v=JSON.parse('{"path":"/posts/baeldung/2024-07-06/2024-07-06-Custom%20Protocol%20Mapper%20with%20Keycloak.html","title":"Keycloak中自定义协议映射器","lang":"zh-CN","frontmatter":{"date":"2023-04-05T00:00:00.000Z","category":["Keycloak","IAM"],"tag":["Keycloak","IAM","Custom Protocol Mapper"],"head":[["meta",{"name":"keycloak custom protocol mapper","content":"教程介绍了如何在Keycloak认证服务器中添加自定义协议映射器。"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-06/2024-07-06-Custom%20Protocol%20Mapper%20with%20Keycloak.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Keycloak中自定义协议映射器"}],["meta",{"property":"og:description","content":"Keycloak中自定义协议映射器 Keycloak是一个开源的身份和访问管理(IAM)解决方案，专注于现代应用程序和服务。当用户通过Keycloak进行身份验证时，服务器颁发的令牌包含有关经过身份验证的用户和令牌所颁发的客户端的重要信息。 Keycloak的令牌包含一些默认属性，例如_iss_（发行者）、exp（过期时间）、sub（主题）和_aud_..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2023/04/bael-0.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-06T18:40:01.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Keycloak"}],["meta",{"property":"article:tag","content":"IAM"}],["meta",{"property":"article:tag","content":"Custom Protocol Mapper"}],["meta",{"property":"article:published_time","content":"2023-04-05T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-06T18:40:01.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Keycloak中自定义协议映射器\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2023/04/bael-0.png\\",\\"https://www.baeldung.com/wp-content/uploads/2023/04/bael-00.png\\",\\"https://www.baeldung.com/wp-content/uploads/2023/04/directory-structure.png\\",\\"https://www.baeldung.com/wp-content/uploads/2023/04/bael-1.png\\",\\"https://www.baeldung.com/wp-content/uploads/2023/04/bael-2.png\\",\\"https://www.baeldung.com/wp-content/uploads/2023/04/bael-6.png\\"],\\"datePublished\\":\\"2023-04-05T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-06T18:40:01.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Keycloak中自定义协议映射器 Keycloak是一个开源的身份和访问管理(IAM)解决方案，专注于现代应用程序和服务。当用户通过Keycloak进行身份验证时，服务器颁发的令牌包含有关经过身份验证的用户和令牌所颁发的客户端的重要信息。 Keycloak的令牌包含一些默认属性，例如_iss_（发行者）、exp（过期时间）、sub（主题）和_aud_..."},"headers":[{"level":2,"title":"3. 设置Keycloak服务器","slug":"_3-设置keycloak服务器","link":"#_3-设置keycloak服务器","children":[]},{"level":2,"title":"4. 自定义协议映射器实现","slug":"_4-自定义协议映射器实现","link":"#_4-自定义协议映射器实现","children":[{"level":3,"title":"4.1. 依赖项","slug":"_4-1-依赖项","link":"#_4-1-依赖项","children":[]},{"level":3,"title":"4.2. 扩展_AbstractOIDCProtocolMapper_类","slug":"_4-2-扩展-abstractoidcprotocolmapper-类","link":"#_4-2-扩展-abstractoidcprotocolmapper-类","children":[]},{"level":3,"title":"4.3. 整合","slug":"_4-3-整合","link":"#_4-3-整合","children":[]},{"level":3,"title":"4.4. 配置客户端","slug":"_4-4-配置客户端","link":"#_4-4-配置客户端","children":[]}]}],"git":{"createdTime":1720291201000,"updatedTime":1720291201000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.04,"words":1513},"filePathRelative":"posts/baeldung/2024-07-06/2024-07-06-Custom Protocol Mapper with Keycloak.md","localizedDate":"2023年4月5日","excerpt":"\\n<p>Keycloak是一个开源的身份和访问管理(IAM)解决方案，专注于现代应用程序和服务。当用户通过Keycloak进行身份验证时，服务器颁发的令牌包含有关经过身份验证的用户和令牌所颁发的客户端的重要信息。</p>\\n<p>Keycloak的令牌包含一些默认属性，例如_iss_（发行者）、<em>exp</em>（过期时间）、<em>sub</em>（主题）和_aud_（受众）。但很多时候，这些属性还不够，我们可能需要向令牌添加一些额外的信息。在这种情况下，我们使用协议映射器。</p>\\n<p>在本教程中，我们将展示<strong>如何在Keycloak授权服务器中添加自定义协议映射器</strong>。</p>","autoDesc":true}');export{u as comp,v as data};
