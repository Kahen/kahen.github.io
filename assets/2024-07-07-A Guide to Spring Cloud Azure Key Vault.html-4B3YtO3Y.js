import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as e}from"./app-DzJ3ruqA.js";const t={},p=e(`<h1 id="使用spring-cloud-azure集成azure-key-vault" tabindex="-1"><a class="header-anchor" href="#使用spring-cloud-azure集成azure-key-vault"><span>使用Spring Cloud Azure集成Azure Key Vault</span></a></h1><p>Azure Container Apps是一个完全托管的无服务器容器服务，它使您能够<strong>构建和部署现代化的、云原生的Java应用程序和微服务</strong>。它提供了简化的开发者体验，同时提供了容器的灵活性和可移植性。</p><p>当然，Azure Container Apps对我们的生态系统有着非常扎实的支持，从多种构建选项、托管的Java组件、原生度量指标、动态日志记录等等。</p><p>要了解更多关于Azure Container Apps上的Java特性，您可以在文档页面开始学习。</p><p>而且，您也可以在Azure Container Apps的GitHub页面上提问和留下反馈。</p><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在本教程中，我们将探讨云原生开发的基本理念以及使用Spring Cloud Azure Key Vault的好处。</p><h2 id="_2-什么是spring-cloud-azure" tabindex="-1"><a class="header-anchor" href="#_2-什么是spring-cloud-azure"><span>2. 什么是Spring Cloud Azure？</span></a></h2><p><strong>Spring Cloud Azure是一套全面的库和工具，专门设计用于促进Spring应用程序和Microsoft Azure服务之间的集成。</strong></p><p>尽管已经可以使用Azure SDK将Java应用程序与Azure集成，但Spring Cloud Azure的引入将这种集成提升到了一个全新的水平。</p><p>通过利用Spring Cloud Azure提供的强大的API集，我们可以方便地与各种Azure服务进行交互，如Azure Storage、Cosmos DB等。</p><p><strong>它简化了开发过程，并增强了应用程序的整体安全性和性能。</strong></p><p>Spring Cloud Azure提供了几个模块，用于将我们的应用程序与最相关的Azure服务集成。让我们看一些例子：</p><ul><li>配置管理：使用<code>spring-cloud-azure-starter-appconfiguration</code>，我们可以轻松地集成Azure配置管理，这是一项用于管理和存储部署在Azure上的应用程序配置的服务</li><li>存储：使用<code>spring-cloud-azure-starter-storage</code>，我们可以无缝地使用Azure Storage，这是一种基于云的存储解决方案，用于存储和管理包括非结构化、结构化和半结构化数据在内的各种类型的数据</li><li>Cosmos DB：使用<code>spring-cloud-azure-starter-cosmos</code>，Azure Cosmos DB，一种多模型数据库服务，可以顺利集成</li><li>服务总线：使用<code>spring-cloud-azure-starter-servicebus</code>，我们可以轻松地集成Azure服务总线，这是一种消息服务，它使分布式应用程序和服务之间的解耦通信成为可能</li><li>Active Directory：使用<code>spring-cloud-azure-starter-active-directory</code>，使用Azure Active Directory，一种提供集中式身份和访问管理系统的服务，可以轻松实现</li></ul><p>我们可以在这里找到所有可用模块的完整列表。</p><h2 id="_3-项目设置" tabindex="-1"><a class="header-anchor" href="#_3-项目设置"><span>3. 项目设置</span></a></h2><p>要开始使用Azure云服务，第一步是注册Azure订阅。</p><p><strong>订阅就绪后，让我们安装Azure CLI。</strong> 这个命令行界面工具允许我们从本地机器与Azure服务进行交互。</p><p>接下来，让我们打开命令提示符并运行命令：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>&gt; az login
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>登录后，我们为订阅创建一个新的资源组：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>&gt; az group create --name spring_cloud_azure --location eastus
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>除了通过命令行创建资源组外，我们还可以在网络浏览器中使用Azure门户创建新的订阅。</strong> 这为我们提供了一个直观的界面来管理我们的Azure资源和订阅。</p><p>随着我们向前推进，下一步是配置我们的IDE。在本教程中，我们将使用IntelliJ作为我们选择的IDE。</p><p><strong>Azure Toolkit是在进行Azure相关开发时使用的一个有用的工具包。</strong> 它提供了专门设计的工具和资源，帮助开发人员在Azure平台上构建和管理应用程序。</p><p>所以让我们在IDE上安装这个插件，然后转到_Tools &gt; Azure &gt; Login_。这将提示我们输入我们的Azure凭据，以验证我们对平台的访问。</p><h2 id="_4-集成" tabindex="-1"><a class="header-anchor" href="#_4-集成"><span>4. 集成</span></a></h2><p>我们已经完成了将Spring应用程序与Azure服务集成所需的准备工作。</p><p>在本教程中，我们将通过使用Java的官方Azure SDK和专用的Spring Cloud模块，将Azure Key Vault服务集成到我们的应用程序中。</p><h3 id="_4-1-azure-key-vault" tabindex="-1"><a class="header-anchor" href="#_4-1-azure-key-vault"><span>4.1. Azure Key Vault</span></a></h3><p><strong>Azure Key Vault是一个强大的基于云的服务，它提供了一种安全和可靠的存储和管理敏感数据的方式，包括加密密钥、秘密和证书。</strong></p><p>它可以作为应用程序的外部配置源。而不是在配置文件中将敏感信息定义为值，我们可以将它们定义为Azure Key Vault中的秘密，然后安全地在运行时注入到应用程序中。</p><p>首先，我们需要在之前创建的资源组上创建一个新的Key Vault。我们可以使用Azure CLI来做到这一点，但如果我们更喜欢，也可以使用Azure门户：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>&gt; az keyvault create --name new_keyvault --resource-group spring_cloud_azure --location eastus
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>创建Key Vault存储后，让我们在Key Vault存储_new_keyvault_中创建两个秘密：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>&gt; az keyvault secret set --name my-database-secret --value my-database-secret-value --vault-name new_keyvault
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>&gt; az keyvault secret set --name my-secret --value my-secret-value --vault-name new_keyvault
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>第一个秘密具有键_my-database-secret_和值_my-database-secret-value_，而第二个具有键_my-secret_和值_my-secret-value_。</p><p>我们还可以在Azure门户上检查并确认这些秘密的创建：<img src="https://www.baeldung.com/wp-content/uploads/2023/04/url-azure-key-vault-2.jpg" alt="img" loading="lazy"></p><h3 id="_4-2-secret-client" tabindex="-1"><a class="header-anchor" href="#_4-2-secret-client"><span>4.2. Secret Client</span></a></h3><p>一旦我们定义了这些秘密，我们可以在我们的应用程序中定义_SecretClient_。</p><p>_SecretClient_类提供了一个客户端接口，用于从Azure Key Vault检索和管理秘密。</p><p>所以让我们定义一个接口：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">KeyVaultClient</span> <span class="token punctuation">{</span>
    <span class="token class-name">SecretClient</span> <span class="token function">getSecretClient</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">default</span> <span class="token class-name">KeyVaultSecret</span> <span class="token function">getSecret</span><span class="token punctuation">(</span><span class="token class-name">String</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">KeyVaultSecret</span> secret<span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            secret <span class="token operator">=</span> <span class="token function">getSecretClient</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getSecret</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> ex<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">NoSuchElementException</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token string">&quot;Unable to retrieve %s secret&quot;</span><span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">,</span> ex<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> secret<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接口_KeyVaultClient_声明了两个方法：</p><ul><li>第一个方法，<em>getSecretClient()</em>，返回_SecretClient_类的实例。</li><li>第二个方法，<em>getSecret()</em>，提供了一个默认实现，用于从秘密客户端检索特定的秘密，嵌套在对象_KeyVaultSecret_中。</li></ul><p>现在让我们看看两种定义_SecretClient_的方法，一种使用标准的Azure SDK，另一种使用Spring Cloud模块。</p><h3 id="_4-3-不使用spring-cloud-azure的集成" tabindex="-1"><a class="header-anchor" href="#_4-3-不使用spring-cloud-azure的集成"><span>4.3. 不使用Spring Cloud Azure的集成</span></a></h3><p>在这种方法中，我们将仅使用Microsoft Azure SDK公开的API配置_SecretClient_。</p><p>所以让我们将_azure-keyvault-extensions_依赖项添加到我们的_pom.xml_文件中：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`\`
    \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`\`com.microsoft.azure\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`\`
    \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`\`azure-keyvault-extensions\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`\`
    \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\`\`1.2.6\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\`\`
\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在让我们在_application.yaml_文件中定义配置_SecretClient_所需的参数：</p><div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre class="language-yaml"><code><span class="token key atrule">azure</span><span class="token punctuation">:</span>
  <span class="token key atrule">keyvault</span><span class="token punctuation">:</span>
    <span class="token key atrule">vaultUrl</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>$myVaultUrl<span class="token punctuation">}</span>
    <span class="token key atrule">tenantId</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>$myTenantId<span class="token punctuation">}</span>
    <span class="token key atrule">clientId</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>$myClientId<span class="token punctuation">}</span>
    <span class="token key atrule">clientSecret</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>$myClientSecret<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们应该用适当的值替换所有的占位符。</p><p>一个选择是直接将值硬编码到_application.yaml_中。然而，这种方法需要存储多个敏感数据，包括_clientId_或_clientSecret_，这可能带来安全风险。</p><p><strong>而不是硬编码这些值，我们可以为每个敏感数据创建一个秘密，并使用Azure pipeline将它们注入到我们的配置文件中。</strong></p><p>接下来，我们创建一个_KeyVaultProperties_类来处理这个配置：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@ConfigurationProperties</span><span class="token punctuation">(</span><span class="token string">&quot;azure.keyvault&quot;</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@ConstructorBinding</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">KeyVaultProperties</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> vaultUrl<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> tenantId<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> clientId<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> clientSecret<span class="token punctuation">;</span>
    <span class="token comment">//Standard constructors, getters and setters</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在让我们创建我们的客户端类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@EnableConfigurationProperties</span><span class="token punctuation">(</span><span class="token class-name">KeyVaultProperties</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Component</span><span class="token punctuation">(</span><span class="token string">&quot;KeyVaultManuallyConfiguredClient&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">KeyVaultManuallyConfiguredClient</span> <span class="token keyword">implements</span> <span class="token class-name">KeyVaultClient</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token class-name">KeyVaultProperties</span> keyVaultProperties<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">SecretClient</span> secretClient<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">SecretClient</span> <span class="token function">getSecretClient</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>secretClient <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            secretClient <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SecretClientBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
              <span class="token punctuation">.</span><span class="token function">vaultUrl</span><span class="token punctuation">(</span>keyVaultProperties<span class="token punctuation">.</span><span class="token function">getVaultUrl</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
              <span class="token punctuation">.</span><span class="token function">credential</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">ClientSecretCredentialBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">tenantId</span><span class="token punctuation">(</span>keyVaultProperties<span class="token punctuation">.</span><span class="token function">getTenantId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">clientId</span><span class="token punctuation">(</span>keyVaultProperties<span class="token punctuation">.</span><span class="token function">getClientId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">clientSecret</span><span class="token punctuation">(</span>keyVaultProperties<span class="token punctuation">.</span><span class="token function">getClientSecret</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
              <span class="token punctuation">.</span><span class="token function">buildClient</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> secretClient<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一旦我们注入了这个_SecretClient_的实现，_getSecret()_的默认方法将返回手动配置的_SecretClient_对象。</p><h3 id="_4-4-使用spring-cloud-azure的集成" tabindex="-1"><a class="header-anchor" href="#_4-4-使用spring-cloud-azure的集成"><span>4.4. 使用Spring Cloud Azure的集成</span></a></h3><p>作为这种方法的一部分，我们将使用Spring Cloud Azure Key Vault设置_SecretClient_，并利用框架的另一个有用特性：将秘密注入到属性文件中。</p><p>所以让我们将_spring-cloud-azure-starter-keyvault-secrets_依赖项添加到我们的_pom.xml_文件中：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`\`
   \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`\`com.azure.spring\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`\`
   \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`\`spring-cloud-azure-starter-keyvault-secrets\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`\`
   \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\`\`5.12.0beta.1\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\`\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们在_application.yaml_中添加以下属性：</p><div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">cloud</span><span class="token punctuation">:</span>
    <span class="token key atrule">azure</span><span class="token punctuation">:</span>
      <span class="token key atrule">keyvault</span><span class="token punctuation">:</span>
        <span class="token key atrule">secret</span><span class="token punctuation">:</span>
          <span class="token key atrule">endpoint</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>$key<span class="token punctuation">-</span>vault<span class="token punctuation">-</span>endpoint<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们应该将_key-vault-endpoint_占位符替换为我们在Azure门户下定义的存储URI，位于_Resources &gt; {our keyvault} &gt; Vault URI_。</p><p>现在让我们创建我们的客户端类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Component</span><span class="token punctuation">(</span><span class="token string">&quot;KeyVaultAutoconfiguredClient&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">KeyVaultAutoconfiguredClient</span> <span class="token keyword">implements</span> <span class="token class-name">KeyVaultClient</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">SecretClient</span> secretClient<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">KeyVaultAutoconfiguredClient</span><span class="token punctuation">(</span><span class="token class-name">SecretClient</span> secretClient<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>secretClient <span class="token operator">=</span> secretClient<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">SecretClient</span> <span class="token function">getSecretClient</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> secretClient<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一旦我们注入了这个_SecretClient_的实现，_getSecret()_的默认方法将返回自动配置的_SecretClient_对象。在我们的_application.yaml_中，除了端点秘密外，我们不需要指定任何配置值。</p><p>Spring Cloud将自动填充所有_SecretClient_的凭据参数。</p><p>我们也可以在属性文件中使用Spring Cloud Azure模块注入秘密。让我们在_application.yaml_中添加属性：</p><div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">cloud</span><span class="token punctuation">:</span>
    <span class="token key atrule">azure</span><span class="token punctuation">:</span>
      <span class="token key atrule">compatibility-verifier</span><span class="token punctuation">:</span>
        <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
      <span class="token key atrule">keyvault</span><span class="token punctuation">:</span>
        <span class="token key atrule">secret</span><span class="token punctuation">:</span>
          property<span class="token punctuation">-</span>sources<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">:</span>
            <span class="token key atrule">name</span><span class="token punctuation">:</span> key<span class="token punctuation">-</span>vault<span class="token punctuation">-</span>property<span class="token punctuation">-</span>source<span class="token punctuation">-</span><span class="token number">1</span>
            <span class="token key atrule">endpoint</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//spring<span class="token punctuation">-</span>cloud<span class="token punctuation">-</span>azure.vault.azure.net/
          <span class="token key atrule">property-source-enabled</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过设置_flag property-source-enabled_，Spring Cloud Azure从在_keyvault-secret-property-sources[0]_中指定的Key Vault存储中注入秘密。</p><p>接下来，我们可以在_application.yaml_中创建一个动态属性：</p><div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre class="language-yaml"><code><span class="token key atrule">database</span><span class="token punctuation">:</span>
  <span class="token key atrule">secret</span><span class="token punctuation">:</span>
    <span class="token key atrule">value</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span>my<span class="token punctuation">-</span>database<span class="token punctuation">-</span>secret<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当应用程序启动时，Spring Cloud Azure将用Azure Key Vault中定义的实际值替换占位符_\${my-database-secret}_。</p><h3 id="_4-5-在属性文件中注入秘密" tabindex="-1"><a class="header-anchor" href="#_4-5-在属性文件中注入秘密"><span>4.5. 在属性文件中注入秘密</span></a></h3><p>我们已经看到了两种将秘密注入到我们的属性文件中的方法：使用Spring Cloud Azure Key Vault或配置Azure pipeline。</p><p>如果我们只使用Spring Cloud Azure Key Vault我们应该在_application.yaml_中硬编码Key Vault端点，以启用对我们的属性文件的注入，这可能带来安全风险。</p><p>另一方面，使用Azure pipelines时，我们不需要硬编码任何值。该pipeline将替换我们的_application.yaml_中的秘密。</p><p><strong>因此，我们应该仅使用Spring Cloud Azure Key Vault模块的自动配置_SecretClient_和其他特性的好处，同时将秘密注入到我们的属性文件中的任务委托给Azure pipelines。</strong></p><h3 id="_4-6-运行应用程序" tabindex="-1"><a class="header-anchor" href="#_4-6-运行应用程序"><span>4.6. 运行应用程序</span></a></h3><p>现在让我们运行我们的Spring Boot应用程序：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@SpringBootApplication</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Application</span> <span class="token keyword">implements</span> <span class="token class-name">CommandLineRunner</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Value</span><span class="token punctuation">(</span><span class="token string">&quot;\${database.secret.value}&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> mySecret<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">KeyVaultClient</span> keyVaultClient<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">Application</span><span class="token punctuation">(</span><span class="token annotation punctuation">@Qualifier</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;KeyVaultAutoconfiguredClient&quot;</span><span class="token punctuation">)</span> <span class="token class-name">KeyVaultAutoconfiguredClient</span> keyVaultAutoconfiguredClient<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>keyVaultClient <span class="token operator">=</span> keyVaultAutoconfiguredClient<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">SpringApplication</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">Application</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token class-name">KeyVaultSecret</span> keyVaultSecret <span class="token operator">=</span> keyVaultClient<span class="token punctuation">.</span><span class="token function">getSecret</span><span class="token punctuation">(</span><span class="token string">&quot;my-secret&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Hey, our secret is here -&gt;&quot;</span> <span class="token operator">+</span> keyVaultSecret<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Hey, our secret is here from application properties file -&gt;&quot;</span> <span class="token operator">+</span> mySecret<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们的应用程序将在启动时从自动配置的客户端和注入到_application.yaml_中的秘密中检索秘密，然后在控制台上显示它们。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们讨论了与Azure的Spring Cloud集成。</p><p>我们了解到，使用Spring Cloud Azure Key Vault而不是Microsoft提供的Azure SDK，可以使Azure Key Vault和Spring应用程序的集成更加简单和简洁。</p><p>如常，示例的完整源代码可以在GitHub上找到。</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>
OK</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,92),l=[p];function c(i,o){return s(),a("div",null,l)}const d=n(t,[["render",c],["__file","2024-07-07-A Guide to Spring Cloud Azure Key Vault.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-07/2024-07-07-A%20Guide%20to%20Spring%20Cloud%20Azure%20Key%20Vault.html","title":"使用Spring Cloud Azure集成Azure Key Vault","lang":"zh-CN","frontmatter":{"date":"2023-04-01T00:00:00.000Z","category":["Spring Cloud Azure","Azure Key Vault"],"tag":["Java","Azure","Spring"],"head":[["meta",{"name":"keywords","content":"Spring Cloud Azure, Azure Key Vault, Java, Azure, Spring"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-07/2024-07-07-A%20Guide%20to%20Spring%20Cloud%20Azure%20Key%20Vault.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用Spring Cloud Azure集成Azure Key Vault"}],["meta",{"property":"og:description","content":"使用Spring Cloud Azure集成Azure Key Vault Azure Container Apps是一个完全托管的无服务器容器服务，它使您能够构建和部署现代化的、云原生的Java应用程序和微服务。它提供了简化的开发者体验，同时提供了容器的灵活性和可移植性。 当然，Azure Container Apps对我们的生态系统有着非常扎实的支..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2023/04/url-azure-key-vault-2.jpg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-07T17:39:03.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Azure"}],["meta",{"property":"article:tag","content":"Spring"}],["meta",{"property":"article:published_time","content":"2023-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-07T17:39:03.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用Spring Cloud Azure集成Azure Key Vault\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2023/04/url-azure-key-vault-2.jpg\\"],\\"datePublished\\":\\"2023-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-07T17:39:03.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用Spring Cloud Azure集成Azure Key Vault Azure Container Apps是一个完全托管的无服务器容器服务，它使您能够构建和部署现代化的、云原生的Java应用程序和微服务。它提供了简化的开发者体验，同时提供了容器的灵活性和可移植性。 当然，Azure Container Apps对我们的生态系统有着非常扎实的支..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 什么是Spring Cloud Azure？","slug":"_2-什么是spring-cloud-azure","link":"#_2-什么是spring-cloud-azure","children":[]},{"level":2,"title":"3. 项目设置","slug":"_3-项目设置","link":"#_3-项目设置","children":[]},{"level":2,"title":"4. 集成","slug":"_4-集成","link":"#_4-集成","children":[{"level":3,"title":"4.1. Azure Key Vault","slug":"_4-1-azure-key-vault","link":"#_4-1-azure-key-vault","children":[]},{"level":3,"title":"4.2. Secret Client","slug":"_4-2-secret-client","link":"#_4-2-secret-client","children":[]},{"level":3,"title":"4.3. 不使用Spring Cloud Azure的集成","slug":"_4-3-不使用spring-cloud-azure的集成","link":"#_4-3-不使用spring-cloud-azure的集成","children":[]},{"level":3,"title":"4.4. 使用Spring Cloud Azure的集成","slug":"_4-4-使用spring-cloud-azure的集成","link":"#_4-4-使用spring-cloud-azure的集成","children":[]},{"level":3,"title":"4.5. 在属性文件中注入秘密","slug":"_4-5-在属性文件中注入秘密","link":"#_4-5-在属性文件中注入秘密","children":[]},{"level":3,"title":"4.6. 运行应用程序","slug":"_4-6-运行应用程序","link":"#_4-6-运行应用程序","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720373943000,"updatedTime":1720373943000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":9.05,"words":2715},"filePathRelative":"posts/baeldung/2024-07-07/2024-07-07-A Guide to Spring Cloud Azure Key Vault.md","localizedDate":"2023年4月1日","excerpt":"\\n<p>Azure Container Apps是一个完全托管的无服务器容器服务，它使您能够<strong>构建和部署现代化的、云原生的Java应用程序和微服务</strong>。它提供了简化的开发者体验，同时提供了容器的灵活性和可移植性。</p>\\n<p>当然，Azure Container Apps对我们的生态系统有着非常扎实的支持，从多种构建选项、托管的Java组件、原生度量指标、动态日志记录等等。</p>\\n<p>要了解更多关于Azure Container Apps上的Java特性，您可以在文档页面开始学习。</p>\\n<p>而且，您也可以在Azure Container Apps的GitHub页面上提问和留下反馈。</p>","autoDesc":true}');export{d as comp,k as data};
