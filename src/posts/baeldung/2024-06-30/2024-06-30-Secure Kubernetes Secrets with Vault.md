---
date: 2022-04-04
category:
  - Spring
  - Kubernetes
tag:
  - Vault
  - Kubernetes Secrets
head:
  - - meta
    - name: keywords
      content: Spring, Kubernetes, Vault, Secrets, Hashicorp
---
# 使用Vault安全存储Kubernetes Secrets

在本教程中，我们将探讨从运行在Kubernetes上的应用中访问存储在Hashicorp的Vault中的秘密的不同方式。

## 2. 快速回顾

我们在之前的教程中已经介绍过Hashicorp的Vault，其中展示了如何安装Vault并用秘密填充它。简而言之，Vault为应用程序秘密提供了一个安全的存储服务，这些秘密可以是静态的或动态生成的。

要访问Vault服务，应用程序必须使用可用的机制之一进行身份验证。**当应用程序在Kubernetes环境中运行时，Vault可以根据其关联的服务帐户对其进行身份验证，从而消除了单独凭据的需要。**

在这种情况下，Kubernetes服务帐户绑定到一个Vault角色，该角色定义了相关的访问策略。此策略定义了应用程序可以访问哪些秘密。

## 3. 向应用程序提供秘密

在Kubernetes环境中，开发人员有多种选项可以从Vault管理的秘密中获取，这些选项可以被分类为或多或少的侵入性。在这里，“侵入性”与应用程序对秘密来源的意识水平有关。

这是我们将要涵盖的方法的摘要：

- 使用Vault的API显式检索
- 使用Spring Boot的Vault支持进行半显式检索
- 使用Vault Sidecar进行透明支持
- 使用Vault Secret CSI Provider进行透明支持
- 使用Vault Secret Operator进行透明支持

## 4. 认证设置

在所有这些方法中，测试应用程序将使用Kubernetes认证来访问Vault的API。在Kubernetes内部运行时，这将自动提供。**然而，要从集群外部使用这种认证，我们需要一个与服务帐户相关联的有效令牌。**

实现此目的的一种方法是创建服务帐户令牌密钥。密钥和服务帐户是命名空间作用域的资源，因此让我们首先创建一个命名空间来保存它们：

```
$ kubectl create namespace baeldung
```

接下来，我们创建服务帐户：

```
$ kubectl create serviceaccount --namespace baeldung vault-test-sa
```

最后，让我们生成一个有效期为24小时的令牌并将其保存到文件中：

```
$ kubectl create token --namespace baeldung vault-test-sa --duration 24h > sa-token.txt
```

现在，我们需要将Kubernetes服务帐户与Vault角色绑定：

```
$ vault write auth/kubernetes/role/baeldung-test-role \
  bound_service_account_names=vault-test-sa \
  bound_service_account_namespaces=baeldung \
  policies=default,baeldung-test-policy \
  ttl=1h
```

## 5. 显式检索

在这种情况下，应用程序直接使用Vault的REST API或更可能的是使用可用的库之一来获取所需的秘密。对于Java，我们将使用来自_spring-vault_项目的库，它利用Spring框架进行低级REST操作：

```
``<dependency>``
    ``<groupId>``org.springframework.vault``</groupId>``
    ``<artifactId>``spring-vault-core``</artifactId>``
    ``<version>``3.1.1``</version>``
``</dependency>``
```

这个依赖项的最新版本可在Maven Central上找到。

**请确保选择与Spring Framework的主要版本兼容的版本**：_spring-vault-core_ 3.x需要Spring 6.x，而_spring-vault-core_ 2.x需要Spring 5.3.x。

访问Vault的API的主要入口点是_VaultTemplate_类。该库提供了_EnvironmentVaultConfiguration_辅助类，简化了使用所需的访问和认证详细信息配置_VaultTemplate_实例的过程。使用它推荐的方式是从我们应用程序的一个_@Configuration_类中导入它：

```
@Configuration
@PropertySource("vault-config-k8s.properties")
@Import(EnvironmentVaultConfiguration.class)
public class VaultConfig {
    // 无代码！
}
```

在这种情况下，我们还添加了_vault-config-k8s_属性源，我们将在其中添加所需的连接详细信息。至少，我们需要通知Vault的端点URI和要使用的认证机制。**由于我们将在集群外部开发期间运行应用程序，我们还需要提供包含服务帐户令牌的文件的位置**：

```
vault.uri=http://localhost:8200
vault.authentication=KUBERNETES
vault.kubernetes.role=baeldung-test-role
vault.kubernetes.service-account-token-file=sa-token.txt
```

我们现在可以在需要访问Vault的API的任何地方注入_VaultTemplate_。作为一个快速示例，让我们创建一个列出所有秘密内容的_CommandLineRunner_ _@Bean_：

```
@Bean
CommandLineRunner listSecrets(VaultTemplate vault) {
    return args ->
    {
        VaultKeyValueOperations ops = vault.opsForKeyValue("secrets", VaultKeyValueOperationsSupport.KeyValueBackend.KV_2);
        List`<String>` secrets = ops.list("");
        if (secrets == null) {
            System.out.println("未找到秘密");
            return;
        }

        secrets.forEach(s ->
        {
            System.out.println("secret=" + s);
            var response = ops.get(s);
            var data = response.getRequiredData();

            data.entrySet()
              .forEach(e ->
              {
                  System.out.println("- key=" + e.getKey() + " => " + e.getValue());
              });
        });
    };
}
```

在我们的情况下，Vault有一个KV Version 2秘密引擎安装在_/secrets_路径上，所以我们使用了_opsForKeyValue_方法来获取一个_VaultKeyValueOperations_对象，我们将使用它来列出所有秘密。其他秘密引擎也有专门的操作对象，提供定制的方法来访问它们。

对于没有专门的_VaultXYZOperations_外观的秘密引擎，我们可以使用通用方法访问任何路径：

- _read(path)_: 从指定路径读取数据
- _write(path, data)_: 在指定路径写入数据
- _list(path)_: 返回指定路径下的所有条目列表
- _delete_(_path_): 移除指定路径的秘密

## 6. 半显式检索

**在前面的方法中，我们直接访问Vault的API引入了强烈的耦合，这可能会带来一些障碍**。例如，这意味着开发人员在开发时间和运行CI管道时需要Vault实例或创建模拟。

**或者，我们可以使用Spring Cloud Vault库在我们的项目中，使Vault的秘密查找对应用程序的代码透明**。这个库通过向Spring公开一个自定义_PropertySource_来实现这一点，它将在应用程序启动时被拾取和配置。

我们称这种方法为“半显式”，因为尽管应用程序的代码不知道Vault的使用，但我们仍然必须向项目添加所需的依赖项。实现这一点的最简单方法是使用可用的启动器库：

```
``<dependency>``
    ``<groupId>``org.springframework.cloud``</groupId>``
    ``<artifactId>``spring-cloud-starter-vault-config``</artifactId>``
    ``<version>``4.1.1``</version>``
``</dependency>``
```

这个依赖项的最新版本可在Maven Central上找到。

**和以前一样，我们必须选择一个与我们项目中使用的Spring Boot的主要版本兼容的版本**。Spring Boot 2.7.x需要版本3.1.x，而Spring Boot 3.x需要版本4.x。

要将Vault作为属性源启用，我们必须添加一些配置属性。一个常见的做法是为此使用一个专用的Spring配置文件，这允许我们快速从基于Vault的秘密切换到任何其他来源。

对于Kubernetes，这是一个典型的配置属性文件的样子：

```
spring.config.import=vault://
spring.cloud.vault.uri=http://vault-internal.vault.svc.cluster.local:8200
spring.cloud.vault.authentication=KUBERNETES
spring.cloud.vault.kv.backend=secrets
spring.cloud.vault.kv.application-name=baeldung-test
```

此配置启用了Vault的KV后端在服务器上的_secrets_路径上挂载。库将使用配置的应用程序名称作为此后端下的路径，从哪里获取秘密。

还需要属性_spring.config.import_来启用Vault作为属性源。**请注意，这个属性是在Spring Boot 2.4中引入的，同时废弃了bootstrap上下文初始化**。当迁移基于旧版本Spring Boot的应用程序时，这是需要特别关注的事项。

Spring Cloud Vault的文档中提供了所有可用配置属性的完整列表。

现在，让我们通过一个简单的示例展示如何使用它从Spring的Environment中获取配置值：

```
@Bean
CommandLineRunner listSecrets(Environment env) {
    return args ->
    {
        var foo = env.getProperty("foo");
        Assert.notNull(foo, "foo必须有一个值");
        System.out.println("foo=" + foo);
    };
}
```

当我们运行这个应用程序时，我们可以看到秘密的值在输出中，确认集成正在工作。

## 7. 使用Vault Sidecar透明支持

如果我们不想或不能更改现有应用程序的代码以从Vault获取其秘密，使用Vault的sidecar方法是合适的替代方案。**唯一的要求是应用程序已经能够从环境变量和配置文件中获取值。**

sidecar模式在Kubernetes领域是常见的做法，其中一个应用程序将一些特定功能委托给同一pod上运行的另一个容器。这种模式的一个流行应用是Istio服务网格，它用于向现有应用程序添加流量控制策略和服务发现等功能。

我们可以继续翻译。

## 7. 使用Vault Sidecar透明支持

如果我们不想或不能更改现有应用程序的代码以从Vault获取其秘密，使用Vault的sidecar方法是合适的替代方案。**唯一的要求是应用程序已经能够从环境变量和配置文件中获取值。**

sidecar模式在Kubernetes领域是常见的做法，其中一个应用程序将一些特定功能委托给同一pod上运行的另一个容器。这种模式的一个流行应用是Istio服务网格，它用于向现有应用程序添加流量控制策略和服务发现等功能。

我们可以使用这种方法与任何Kubernetes工作负载类型，例如_Deployment_、_Statefulset_或_Job_。**此外，我们可以使用_Mutating Webhook_在创建pod时自动注入sidecar，从而让用户免于手动添加它到工作负载的规范中。**

Vault sidecar使用在工作负载的pods模板的元数据部分中出现的注释来指示sidecar从Vault拉取哪些秘密。然后，这些秘密被存储在一个文件中，该文件存储在sidecar和同一pod中的任何其他容器之间的共享卷中。如果这些秘密中的任何一个是动态的，sidecar还负责跟踪其续订，必要时重新渲染文件。

### 7.1. Sidecar Injector部署

**在我们使用这种方法之前，首先需要部署Vault的Sidecar Injector组件。**最简单的方法是使用Hashicorp提供的helm图表，它默认情况下已经在Kubernetes上的常规Vault部署中添加了注入器。

如果情况并非如此，我们必须使用_injector.enabled_属性的新值升级现有的helm发布：

```
$ helm upgrade vault hashicorp/vault -n vault --set injector.enabled=true
```

为了验证注入器是否正确安装，让我们查询可用的_WebHookConfiguration_对象：

```
$ kubectl get mutatingwebhookconfiguration
NAME                       WEBHOOKS   AGE
vault-agent-injector-cfg   1          16d
```

### 7.2. 注解部署

**秘密注入是“选择加入”的，这意味着除非注入器在工作负载的元数据中找到特定的注释，否则不会发生任何变化。**这是一个使用最小集所需注释的部署清单的示例：

```
apiVersion: apps/v1
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
        vault.hashicorp.com/agent-inject: "true"
        vault.hashicorp.com/agent-inject-secret-baeldung.properties: "secrets/baeldung-test"
        vault.hashicorp.com/role: "baeldung-test-role"
        vault.hashicorp.com/agent-inject-template-baeldung.properties: |
          {{- with secret "secrets/baeldung-test" -}}
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
```

当我们将此清单部署到集群时，注入器将修补它并注入配置如下的Vault代理sidecar容器：

- 使用_baeldung-test-role_自动登录
- 位于_secrets/baeldung-test_路径下的秘密将被渲染到名为_baeldung.properties_的文件中，默认的秘密目录( _/vault/secrets_)下
- 使用提供的模板生成文件内容

还有更多的注释可用，我们可以使用它们来自定义用于渲染秘密的位置和模板。Vault文档上提供了支持的注释的完整列表。

## 8. 使用Vault Secret CSI Provider透明支持

CSI（容器存储接口）提供程序允许供应商扩展Kubernetes集群支持的卷类型。Vault CSI Provider是使用sidecar的替代方案，它允许将Vault秘密作为常规卷暴露给pod。

**这里的主要优点是我们不需要为每个pod附加一个sidecar，所以我们需要更少的资源(CPU/Memory)来运行我们的工作负载**。虽然sidecar并不是非常消耗资源，但其成本随着活动pod的数量而增加。相比之下，CSI使用_DaemonSet_，这意味着集群中的每个节点都有一个pod。

### 8.1. 启用Vault CSI Provider

在我们安装此提供程序之前，必须检查CSI Secret Store Driver是否已经存在于目标集群中：

```
$ kubectl get csidrivers
```

结果应该包括secrets-store.csi.k8s.io驱动程序：

```
NAME                       ATTACHREQUIRED   PODINFOONMOUNT  ...
secrets-store.csi.k8s.io   false            true             ...
```

如果没有，只需应用适当的helm图表：

```
$ helm repo add secrets-store-csi-driver https://kubernetes-sigs.github.io/secrets-store-csi-driver/charts
$ helm install csi-secrets-store secrets-store-csi-driver/secrets-store-csi-driver \
     --namespace kube-system\
     --set syncSecret.enabled=true
```

项目的文档还描述了其他安装方法，但除非有特定要求，否则helm方法是首选。

现在，让我们继续安装Vault CSI Provider本身。再次使用官方的Vault helm图表。**CSI提供程序默认情况下未启用，因此我们需要使用_csi.enabled_属性进行升级：**

```
$ helm upgrade vault hashicorp/vault -n vault –-set csi.enabled=true
```

为了验证驱动程序是否正确安装，我们将检查其_DaemonSet_是否运行良好：

```
$ kubectl get daemonsets –n vault
NAME DESIRED CURRENT READY UP-TO-DATE AVAILABLE NODE SELECTOR AGE
vault-csi-provider 1 1 1 1 1 `<none>` 15d
```

### 8.2. Vault CSI Provider使用

使用Vault CSI Provider配置工作负载以使用vault秘密需要两个步骤。首先，我们定义一个_SecretProviderClass_资源，指定要检索的秘密和密钥：

```
apiVersion: secrets-store.csi.x-k8s.io/v1
kind: SecretProviderClass
metadata:
  name: baeldung-csi-secrets
  namespace: baeldung
spec:
  provider: vault
  parameters:
    roleName: 'baeldung-test-role'
    objects: |
      - objectName: 'baeldung.properties'
        secretPath: "secrets/data/baeldung-test"
```

注意_spec.provider_属性，必须设置为_vault_。这是必要的，以便CSI驱动程序知道使用哪个可用的提供程序。参数部分包含提供程序用来定位请求秘密的信息：

- _roleName_: 在登录期间使用的Vault角色，它定义了应用程序将访问的秘密
- _objects_: 值是一个YAML格式的字符串（因此是“|”），包含要检索的秘密数组

_objects_数组中的每个条目都是一个具有三个属性的对象：

- _secretPath_: Vault的秘密路径
- _objectName_: 将包含秘密的文件的名称
- _objectKey_: Vault的秘密中的键，提供要放入文件的内容。如果省略，文件将包含一个包含所有值的JSON对象

现在，让我们在示例部署工作负载中使用这个资源：

```
apiVersion: apps/v1
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
          driver: 'secrets-store.csi.k8s.io'
          readOnly: true
          volumeAttributes:
            secretProviderClass: baeldung-csi-secrets
```

在_volumes_部分，注意我们如何使用指向我们之前定义的_SecretStorageClass_的CSI定义。

要验证此部署，我们可以打开主容器的shell并检查指定挂载路径下秘密的存在：

```
$ kubectl get pods -n baeldung -l app=nginx-csi
NAME                        READY   STATUS    RESTARTS   AGE
nginx-csi-b7866bc69-njzff   1/1     Running   0          19m
$ kubectl exec -it -n baeldung nginx-csi-b7866bc69-njzff -- /bin/sh
# cat /vault/secrets/baeldung.properties
{"request_id":"eb417a64-b1c4-087d-a5f4-30229f27aba1","lease_id":"","lease_duration":0,
   "renewable":false,
   "data":{
      "data":{"foo":"bar"},
  ... 更多数据省略
```

## 9. 使用Vault Secrets Operator透明