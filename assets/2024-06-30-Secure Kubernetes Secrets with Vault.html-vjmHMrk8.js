import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as n,a as i}from"./app-MfNCm5Cz.js";const a={},s=i(`<h1 id="使用vault安全存储kubernetes-secrets" tabindex="-1"><a class="header-anchor" href="#使用vault安全存储kubernetes-secrets"><span>使用Vault安全存储Kubernetes Secrets</span></a></h1><p>在本教程中，我们将探讨从运行在Kubernetes上的应用中访问存储在Hashicorp的Vault中的秘密的不同方式。</p><h2 id="_2-快速回顾" tabindex="-1"><a class="header-anchor" href="#_2-快速回顾"><span>2. 快速回顾</span></a></h2><p>我们在之前的教程中已经介绍过Hashicorp的Vault，其中展示了如何安装Vault并用秘密填充它。简而言之，Vault为应用程序秘密提供了一个安全的存储服务，这些秘密可以是静态的或动态生成的。</p><p>要访问Vault服务，应用程序必须使用可用的机制之一进行身份验证。<strong>当应用程序在Kubernetes环境中运行时，Vault可以根据其关联的服务帐户对其进行身份验证，从而消除了单独凭据的需要。</strong></p><p>在这种情况下，Kubernetes服务帐户绑定到一个Vault角色，该角色定义了相关的访问策略。此策略定义了应用程序可以访问哪些秘密。</p><h2 id="_3-向应用程序提供秘密" tabindex="-1"><a class="header-anchor" href="#_3-向应用程序提供秘密"><span>3. 向应用程序提供秘密</span></a></h2><p>在Kubernetes环境中，开发人员有多种选项可以从Vault管理的秘密中获取，这些选项可以被分类为或多或少的侵入性。在这里，“侵入性”与应用程序对秘密来源的意识水平有关。</p><p>这是我们将要涵盖的方法的摘要：</p><ul><li>使用Vault的API显式检索</li><li>使用Spring Boot的Vault支持进行半显式检索</li><li>使用Vault Sidecar进行透明支持</li><li>使用Vault Secret CSI Provider进行透明支持</li><li>使用Vault Secret Operator进行透明支持</li></ul><h2 id="_4-认证设置" tabindex="-1"><a class="header-anchor" href="#_4-认证设置"><span>4. 认证设置</span></a></h2><p>在所有这些方法中，测试应用程序将使用Kubernetes认证来访问Vault的API。在Kubernetes内部运行时，这将自动提供。<strong>然而，要从集群外部使用这种认证，我们需要一个与服务帐户相关联的有效令牌。</strong></p><p>实现此目的的一种方法是创建服务帐户令牌密钥。密钥和服务帐户是命名空间作用域的资源，因此让我们首先创建一个命名空间来保存它们：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ kubectl create namespace baeldung
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>接下来，我们创建服务帐户：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ kubectl create serviceaccount --namespace baeldung vault-test-sa
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>最后，让我们生成一个有效期为24小时的令牌并将其保存到文件中：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ kubectl create token --namespace baeldung vault-test-sa --duration 24h &gt; sa-token.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>现在，我们需要将Kubernetes服务帐户与Vault角色绑定：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ vault write auth/kubernetes/role/baeldung-test-role \\
  bound_service_account_names=vault-test-sa \\
  bound_service_account_namespaces=baeldung \\
  policies=default,baeldung-test-policy \\
  ttl=1h
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-显式检索" tabindex="-1"><a class="header-anchor" href="#_5-显式检索"><span>5. 显式检索</span></a></h2><p>在这种情况下，应用程序直接使用Vault的REST API或更可能的是使用可用的库之一来获取所需的秘密。对于Java，我们将使用来自_spring-vault_项目的库，它利用Spring框架进行低级REST操作：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>\`\`&lt;dependency&gt;\`\`
    \`\`&lt;groupId&gt;\`\`org.springframework.vault\`\`&lt;/groupId&gt;\`\`
    \`\`&lt;artifactId&gt;\`\`spring-vault-core\`\`&lt;/artifactId&gt;\`\`
    \`\`&lt;version&gt;\`\`3.1.1\`\`&lt;/version&gt;\`\`
\`\`&lt;/dependency&gt;\`\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个依赖项的最新版本可在Maven Central上找到。</p><p><strong>请确保选择与Spring Framework的主要版本兼容的版本</strong>：<em>spring-vault-core</em> 3.x需要Spring 6.x，而_spring-vault-core_ 2.x需要Spring 5.3.x。</p><p>访问Vault的API的主要入口点是_VaultTemplate_类。该库提供了_EnvironmentVaultConfiguration_辅助类，简化了使用所需的访问和认证详细信息配置_VaultTemplate_实例的过程。使用它推荐的方式是从我们应用程序的一个_@Configuration_类中导入它：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Configuration
@PropertySource(&quot;vault-config-k8s.properties&quot;)
@Import(EnvironmentVaultConfiguration.class)
public class VaultConfig {
    // 无代码！
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这种情况下，我们还添加了_vault-config-k8s_属性源，我们将在其中添加所需的连接详细信息。至少，我们需要通知Vault的端点URI和要使用的认证机制。<strong>由于我们将在集群外部开发期间运行应用程序，我们还需要提供包含服务帐户令牌的文件的位置</strong>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>vault.uri=http://localhost:8200
vault.authentication=KUBERNETES
vault.kubernetes.role=baeldung-test-role
vault.kubernetes.service-account-token-file=sa-token.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们现在可以在需要访问Vault的API的任何地方注入_VaultTemplate_。作为一个快速示例，让我们创建一个列出所有秘密内容的_CommandLineRunner_ <em>@Bean</em>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Bean
CommandLineRunner listSecrets(VaultTemplate vault) {
    return args -&gt;
    {
        VaultKeyValueOperations ops = vault.opsForKeyValue(&quot;secrets&quot;, VaultKeyValueOperationsSupport.KeyValueBackend.KV_2);
        List\`&lt;String&gt;\` secrets = ops.list(&quot;&quot;);
        if (secrets == null) {
            System.out.println(&quot;未找到秘密&quot;);
            return;
        }

        secrets.forEach(s -&gt;
        {
            System.out.println(&quot;secret=&quot; + s);
            var response = ops.get(s);
            var data = response.getRequiredData();

            data.entrySet()
              .forEach(e -&gt;
              {
                  System.out.println(&quot;- key=&quot; + e.getKey() + &quot; =&gt; &quot; + e.getValue());
              });
        });
    };
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在我们的情况下，Vault有一个KV Version 2秘密引擎安装在_/secrets_路径上，所以我们使用了_opsForKeyValue_方法来获取一个_VaultKeyValueOperations_对象，我们将使用它来列出所有秘密。其他秘密引擎也有专门的操作对象，提供定制的方法来访问它们。</p><p>对于没有专门的_VaultXYZOperations_外观的秘密引擎，我们可以使用通用方法访问任何路径：</p><ul><li><em>read(path)</em>: 从指定路径读取数据</li><li><em>write(path, data)</em>: 在指定路径写入数据</li><li><em>list(path)</em>: 返回指定路径下的所有条目列表</li><li><em>delete</em>(<em>path</em>): 移除指定路径的秘密</li></ul><h2 id="_6-半显式检索" tabindex="-1"><a class="header-anchor" href="#_6-半显式检索"><span>6. 半显式检索</span></a></h2><p><strong>在前面的方法中，我们直接访问Vault的API引入了强烈的耦合，这可能会带来一些障碍</strong>。例如，这意味着开发人员在开发时间和运行CI管道时需要Vault实例或创建模拟。</p><p><strong>或者，我们可以使用Spring Cloud Vault库在我们的项目中，使Vault的秘密查找对应用程序的代码透明</strong>。这个库通过向Spring公开一个自定义_PropertySource_来实现这一点，它将在应用程序启动时被拾取和配置。</p><p>我们称这种方法为“半显式”，因为尽管应用程序的代码不知道Vault的使用，但我们仍然必须向项目添加所需的依赖项。实现这一点的最简单方法是使用可用的启动器库：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>\`\`&lt;dependency&gt;\`\`
    \`\`&lt;groupId&gt;\`\`org.springframework.cloud\`\`&lt;/groupId&gt;\`\`
    \`\`&lt;artifactId&gt;\`\`spring-cloud-starter-vault-config\`\`&lt;/artifactId&gt;\`\`
    \`\`&lt;version&gt;\`\`4.1.1\`\`&lt;/version&gt;\`\`
\`\`&lt;/dependency&gt;\`\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个依赖项的最新版本可在Maven Central上找到。</p><p><strong>和以前一样，我们必须选择一个与我们项目中使用的Spring Boot的主要版本兼容的版本</strong>。Spring Boot 2.7.x需要版本3.1.x，而Spring Boot 3.x需要版本4.x。</p><p>要将Vault作为属性源启用，我们必须添加一些配置属性。一个常见的做法是为此使用一个专用的Spring配置文件，这允许我们快速从基于Vault的秘密切换到任何其他来源。</p><p>对于Kubernetes，这是一个典型的配置属性文件的样子：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>spring.config.import=vault://
spring.cloud.vault.uri=http://vault-internal.vault.svc.cluster.local:8200
spring.cloud.vault.authentication=KUBERNETES
spring.cloud.vault.kv.backend=secrets
spring.cloud.vault.kv.application-name=baeldung-test
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此配置启用了Vault的KV后端在服务器上的_secrets_路径上挂载。库将使用配置的应用程序名称作为此后端下的路径，从哪里获取秘密。</p><p>还需要属性_spring.config.import_来启用Vault作为属性源。<strong>请注意，这个属性是在Spring Boot 2.4中引入的，同时废弃了bootstrap上下文初始化</strong>。当迁移基于旧版本Spring Boot的应用程序时，这是需要特别关注的事项。</p><p>Spring Cloud Vault的文档中提供了所有可用配置属性的完整列表。</p><p>现在，让我们通过一个简单的示例展示如何使用它从Spring的Environment中获取配置值：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Bean
CommandLineRunner listSecrets(Environment env) {
    return args -&gt;
    {
        var foo = env.getProperty(&quot;foo&quot;);
        Assert.notNull(foo, &quot;foo必须有一个值&quot;);
        System.out.println(&quot;foo=&quot; + foo);
    };
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当我们运行这个应用程序时，我们可以看到秘密的值在输出中，确认集成正在工作。</p><h2 id="_7-使用vault-sidecar透明支持" tabindex="-1"><a class="header-anchor" href="#_7-使用vault-sidecar透明支持"><span>7. 使用Vault Sidecar透明支持</span></a></h2><p>如果我们不想或不能更改现有应用程序的代码以从Vault获取其秘密，使用Vault的sidecar方法是合适的替代方案。<strong>唯一的要求是应用程序已经能够从环境变量和配置文件中获取值。</strong></p><p>sidecar模式在Kubernetes领域是常见的做法，其中一个应用程序将一些特定功能委托给同一pod上运行的另一个容器。这种模式的一个流行应用是Istio服务网格，它用于向现有应用程序添加流量控制策略和服务发现等功能。</p><p>我们可以继续翻译。</p><h2 id="_7-使用vault-sidecar透明支持-1" tabindex="-1"><a class="header-anchor" href="#_7-使用vault-sidecar透明支持-1"><span>7. 使用Vault Sidecar透明支持</span></a></h2><p>如果我们不想或不能更改现有应用程序的代码以从Vault获取其秘密，使用Vault的sidecar方法是合适的替代方案。<strong>唯一的要求是应用程序已经能够从环境变量和配置文件中获取值。</strong></p><p>sidecar模式在Kubernetes领域是常见的做法，其中一个应用程序将一些特定功能委托给同一pod上运行的另一个容器。这种模式的一个流行应用是Istio服务网格，它用于向现有应用程序添加流量控制策略和服务发现等功能。</p><p>我们可以使用这种方法与任何Kubernetes工作负载类型，例如_Deployment_、<em>Statefulset_或_Job</em>。<strong>此外，我们可以使用_Mutating Webhook_在创建pod时自动注入sidecar，从而让用户免于手动添加它到工作负载的规范中。</strong></p><p>Vault sidecar使用在工作负载的pods模板的元数据部分中出现的注释来指示sidecar从Vault拉取哪些秘密。然后，这些秘密被存储在一个文件中，该文件存储在sidecar和同一pod中的任何其他容器之间的共享卷中。如果这些秘密中的任何一个是动态的，sidecar还负责跟踪其续订，必要时重新渲染文件。</p><h3 id="_7-1-sidecar-injector部署" tabindex="-1"><a class="header-anchor" href="#_7-1-sidecar-injector部署"><span>7.1. Sidecar Injector部署</span></a></h3><p>**在我们使用这种方法之前，首先需要部署Vault的Sidecar Injector组件。**最简单的方法是使用Hashicorp提供的helm图表，它默认情况下已经在Kubernetes上的常规Vault部署中添加了注入器。</p><p>如果情况并非如此，我们必须使用_injector.enabled_属性的新值升级现有的helm发布：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ helm upgrade vault hashicorp/vault -n vault --set injector.enabled=true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>为了验证注入器是否正确安装，让我们查询可用的_WebHookConfiguration_对象：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ kubectl get mutatingwebhookconfiguration
NAME                       WEBHOOKS   AGE
vault-agent-injector-cfg   1          16d
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7-2-注解部署" tabindex="-1"><a class="header-anchor" href="#_7-2-注解部署"><span>7.2. 注解部署</span></a></h3><p>**秘密注入是“选择加入”的，这意味着除非注入器在工作负载的元数据中找到特定的注释，否则不会发生任何变化。**这是一个使用最小集所需注释的部署清单的示例：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  namespace: baeldung
spec:
  selector:
    matchLabels:
      app: nginx
  replicas: 1
  template:
    metadata:
      labels:
        app: nginx
      annotations:
        vault.hashicorp.com/agent-inject: &quot;true&quot;
        vault.hashicorp.com/agent-inject-secret-baeldung.properties: &quot;secrets/baeldung-test&quot;
        vault.hashicorp.com/role: &quot;baeldung-test-role&quot;
        vault.hashicorp.com/agent-inject-template-baeldung.properties: |
          {{- with secret &quot;secrets/baeldung-test&quot; -}}
          {{- range $k, $v := .Data.data }}
          {{$k}}={{$v}}
          {{- end -}}
          {{ end }}
    spec:
      serviceAccountName: vault-test-sa
      automountServiceAccountToken: true
      containers:
      - name: nginx
        image: nginx:1.14.2
        ports:
        - containerPort: 80
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当我们将此清单部署到集群时，注入器将修补它并注入配置如下的Vault代理sidecar容器：</p><ul><li>使用_baeldung-test-role_自动登录</li><li>位于_secrets/baeldung-test_路径下的秘密将被渲染到名为_baeldung.properties_的文件中，默认的秘密目录( <em>/vault/secrets</em>)下</li><li>使用提供的模板生成文件内容</li></ul><p>还有更多的注释可用，我们可以使用它们来自定义用于渲染秘密的位置和模板。Vault文档上提供了支持的注释的完整列表。</p><h2 id="_8-使用vault-secret-csi-provider透明支持" tabindex="-1"><a class="header-anchor" href="#_8-使用vault-secret-csi-provider透明支持"><span>8. 使用Vault Secret CSI Provider透明支持</span></a></h2><p>CSI（容器存储接口）提供程序允许供应商扩展Kubernetes集群支持的卷类型。Vault CSI Provider是使用sidecar的替代方案，它允许将Vault秘密作为常规卷暴露给pod。</p><p><strong>这里的主要优点是我们不需要为每个pod附加一个sidecar，所以我们需要更少的资源(CPU/Memory)来运行我们的工作负载</strong>。虽然sidecar并不是非常消耗资源，但其成本随着活动pod的数量而增加。相比之下，CSI使用_DaemonSet_，这意味着集群中的每个节点都有一个pod。</p><h3 id="_8-1-启用vault-csi-provider" tabindex="-1"><a class="header-anchor" href="#_8-1-启用vault-csi-provider"><span>8.1. 启用Vault CSI Provider</span></a></h3><p>在我们安装此提供程序之前，必须检查CSI Secret Store Driver是否已经存在于目标集群中：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ kubectl get csidrivers
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>结果应该包括secrets-store.csi.k8s.io驱动程序：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>NAME                       ATTACHREQUIRED   PODINFOONMOUNT  ...
secrets-store.csi.k8s.io   false            true             ...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果没有，只需应用适当的helm图表：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ helm repo add secrets-store-csi-driver https://kubernetes-sigs.github.io/secrets-store-csi-driver/charts
$ helm install csi-secrets-store secrets-store-csi-driver/secrets-store-csi-driver \\
     --namespace kube-system\\
     --set syncSecret.enabled=true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>项目的文档还描述了其他安装方法，但除非有特定要求，否则helm方法是首选。</p><p>现在，让我们继续安装Vault CSI Provider本身。再次使用官方的Vault helm图表。<strong>CSI提供程序默认情况下未启用，因此我们需要使用_csi.enabled_属性进行升级：</strong></p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ helm upgrade vault hashicorp/vault -n vault –-set csi.enabled=true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>为了验证驱动程序是否正确安装，我们将检查其_DaemonSet_是否运行良好：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ kubectl get daemonsets –n vault
NAME DESIRED CURRENT READY UP-TO-DATE AVAILABLE NODE SELECTOR AGE
vault-csi-provider 1 1 1 1 1 \`&lt;none&gt;\` 15d
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_8-2-vault-csi-provider使用" tabindex="-1"><a class="header-anchor" href="#_8-2-vault-csi-provider使用"><span>8.2. Vault CSI Provider使用</span></a></h3><p>使用Vault CSI Provider配置工作负载以使用vault秘密需要两个步骤。首先，我们定义一个_SecretProviderClass_资源，指定要检索的秘密和密钥：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>apiVersion: secrets-store.csi.x-k8s.io/v1
kind: SecretProviderClass
metadata:
  name: baeldung-csi-secrets
  namespace: baeldung
spec:
  provider: vault
  parameters:
    roleName: &#39;baeldung-test-role&#39;
    objects: |
      - objectName: &#39;baeldung.properties&#39;
        secretPath: &quot;secrets/data/baeldung-test&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意_spec.provider_属性，必须设置为_vault_。这是必要的，以便CSI驱动程序知道使用哪个可用的提供程序。参数部分包含提供程序用来定位请求秘密的信息：</p><ul><li><em>roleName</em>: 在登录期间使用的Vault角色，它定义了应用程序将访问的秘密</li><li><em>objects</em>: 值是一个YAML格式的字符串（因此是“|”），包含要检索的秘密数组</li></ul><p>_objects_数组中的每个条目都是一个具有三个属性的对象：</p><ul><li><em>secretPath</em>: Vault的秘密路径</li><li><em>objectName</em>: 将包含秘密的文件的名称</li><li><em>objectKey</em>: Vault的秘密中的键，提供要放入文件的内容。如果省略，文件将包含一个包含所有值的JSON对象</li></ul><p>现在，让我们在示例部署工作负载中使用这个资源：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-csi
  namespace: baeldung
spec:
  selector:
    matchLabels:
      app: nginx-csi
  replicas: 1
  template:
    metadata:
      labels:
        app: nginx-csi
    spec:
      serviceAccountName: vault-test-sa
      automountServiceAccountToken: true
      containers:
      - name: nginx
        image: nginx:1.14.2
        ports:
        - containerPort: 80
        volumeMounts:
        - name: vault-secrets
          mountPath: /vault/secrets
          readOnly: true
      volumes:
      - name: vault-secrets
        csi:
          driver: &#39;secrets-store.csi.k8s.io&#39;
          readOnly: true
          volumeAttributes:
            secretProviderClass: baeldung-csi-secrets
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在_volumes_部分，注意我们如何使用指向我们之前定义的_SecretStorageClass_的CSI定义。</p><p>要验证此部署，我们可以打开主容器的shell并检查指定挂载路径下秘密的存在：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ kubectl get pods -n baeldung -l app=nginx-csi
NAME                        READY   STATUS    RESTARTS   AGE
nginx-csi-b7866bc69-njzff   1/1     Running   0          19m
$ kubectl exec -it -n baeldung nginx-csi-b7866bc69-njzff -- /bin/sh
# cat /vault/secrets/baeldung.properties
{&quot;request_id&quot;:&quot;eb417a64-b1c4-087d-a5f4-30229f27aba1&quot;,&quot;lease_id&quot;:&quot;&quot;,&quot;lease_duration&quot;:0,
   &quot;renewable&quot;:false,
   &quot;data&quot;:{
      &quot;data&quot;:{&quot;foo&quot;:&quot;bar&quot;},
  ... 更多数据省略
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_9-使用vault-secrets-operator透明" tabindex="-1"><a class="header-anchor" href="#_9-使用vault-secrets-operator透明"><span>9. 使用Vault Secrets Operator透明</span></a></h2>`,99),l=[s];function r(d,u){return n(),t("div",null,l)}const o=e(a,[["render",r],["__file","2024-06-30-Secure Kubernetes Secrets with Vault.html.vue"]]),p=JSON.parse('{"path":"/posts/baeldung/2024-06-30/2024-06-30-Secure%20Kubernetes%20Secrets%20with%20Vault.html","title":"使用Vault安全存储Kubernetes Secrets","lang":"zh-CN","frontmatter":{"date":"2022-04-04T00:00:00.000Z","category":["Spring","Kubernetes"],"tag":["Vault","Kubernetes Secrets"],"head":[["meta",{"name":"keywords","content":"Spring, Kubernetes, Vault, Secrets, Hashicorp"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-30/2024-06-30-Secure%20Kubernetes%20Secrets%20with%20Vault.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用Vault安全存储Kubernetes Secrets"}],["meta",{"property":"og:description","content":"使用Vault安全存储Kubernetes Secrets 在本教程中，我们将探讨从运行在Kubernetes上的应用中访问存储在Hashicorp的Vault中的秘密的不同方式。 2. 快速回顾 我们在之前的教程中已经介绍过Hashicorp的Vault，其中展示了如何安装Vault并用秘密填充它。简而言之，Vault为应用程序秘密提供了一个安全的存..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-30T11:27:03.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Vault"}],["meta",{"property":"article:tag","content":"Kubernetes Secrets"}],["meta",{"property":"article:published_time","content":"2022-04-04T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-30T11:27:03.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用Vault安全存储Kubernetes Secrets\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-04T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-30T11:27:03.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用Vault安全存储Kubernetes Secrets 在本教程中，我们将探讨从运行在Kubernetes上的应用中访问存储在Hashicorp的Vault中的秘密的不同方式。 2. 快速回顾 我们在之前的教程中已经介绍过Hashicorp的Vault，其中展示了如何安装Vault并用秘密填充它。简而言之，Vault为应用程序秘密提供了一个安全的存..."},"headers":[{"level":2,"title":"2. 快速回顾","slug":"_2-快速回顾","link":"#_2-快速回顾","children":[]},{"level":2,"title":"3. 向应用程序提供秘密","slug":"_3-向应用程序提供秘密","link":"#_3-向应用程序提供秘密","children":[]},{"level":2,"title":"4. 认证设置","slug":"_4-认证设置","link":"#_4-认证设置","children":[]},{"level":2,"title":"5. 显式检索","slug":"_5-显式检索","link":"#_5-显式检索","children":[]},{"level":2,"title":"6. 半显式检索","slug":"_6-半显式检索","link":"#_6-半显式检索","children":[]},{"level":2,"title":"7. 使用Vault Sidecar透明支持","slug":"_7-使用vault-sidecar透明支持","link":"#_7-使用vault-sidecar透明支持","children":[]},{"level":2,"title":"7. 使用Vault Sidecar透明支持","slug":"_7-使用vault-sidecar透明支持-1","link":"#_7-使用vault-sidecar透明支持-1","children":[{"level":3,"title":"7.1. Sidecar Injector部署","slug":"_7-1-sidecar-injector部署","link":"#_7-1-sidecar-injector部署","children":[]},{"level":3,"title":"7.2. 注解部署","slug":"_7-2-注解部署","link":"#_7-2-注解部署","children":[]}]},{"level":2,"title":"8. 使用Vault Secret CSI Provider透明支持","slug":"_8-使用vault-secret-csi-provider透明支持","link":"#_8-使用vault-secret-csi-provider透明支持","children":[{"level":3,"title":"8.1. 启用Vault CSI Provider","slug":"_8-1-启用vault-csi-provider","link":"#_8-1-启用vault-csi-provider","children":[]},{"level":3,"title":"8.2. Vault CSI Provider使用","slug":"_8-2-vault-csi-provider使用","link":"#_8-2-vault-csi-provider使用","children":[]}]},{"level":2,"title":"9. 使用Vault Secrets Operator透明","slug":"_9-使用vault-secrets-operator透明","link":"#_9-使用vault-secrets-operator透明","children":[]}],"git":{"createdTime":1719746823000,"updatedTime":1719746823000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":12.35,"words":3706},"filePathRelative":"posts/baeldung/2024-06-30/2024-06-30-Secure Kubernetes Secrets with Vault.md","localizedDate":"2022年4月4日","excerpt":"\\n<p>在本教程中，我们将探讨从运行在Kubernetes上的应用中访问存储在Hashicorp的Vault中的秘密的不同方式。</p>\\n<h2>2. 快速回顾</h2>\\n<p>我们在之前的教程中已经介绍过Hashicorp的Vault，其中展示了如何安装Vault并用秘密填充它。简而言之，Vault为应用程序秘密提供了一个安全的存储服务，这些秘密可以是静态的或动态生成的。</p>\\n<p>要访问Vault服务，应用程序必须使用可用的机制之一进行身份验证。<strong>当应用程序在Kubernetes环境中运行时，Vault可以根据其关联的服务帐户对其进行身份验证，从而消除了单独凭据的需要。</strong></p>","autoDesc":true}');export{o as comp,p as data};
