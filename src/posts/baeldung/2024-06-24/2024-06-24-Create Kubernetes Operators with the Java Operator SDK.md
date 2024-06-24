---
date: 2024-06-24
category:
  - Kubernetes
  - Java
tag:
  - Kubernetes Operator
  - Java Operator SDK
head:
  - - meta
    - name: keywords
      content: Kubernetes, Java, Operator, SDK, Baeldung
---

# 使用Java Operator SDK创建Kubernetes Operators | Baeldung

## 1. 引言

在本教程中，我们将介绍Kubernetes Operators的概念以及如何使用Java Operator SDK来实现它们。为了说明这一点，我们将实现一个Operators，它简化了在集群中部署OWASP的Dependency-Track应用程序实例的任务。

## 2. Kubernetes Operators是什么？

在Kubernetes术语中，**Operators是一个通常部署在集群中的软件组件，它管理一组资源的生命周期**。它扩展了原生控制器集合，例如副本集和作业控制器，以管理复杂或相互关联的组件作为一个单一管理单元。

让我们看看Operators的一些常见用例：

- 在集群中部署应用程序时执行最佳实践
- 跟踪并从意外删除/更改应用程序使用的资源中恢复
- 自动化与应用程序相关的日常维护任务，例如定期备份和清理
- 自动化集群外资源配置——例如，存储桶和证书
- 改善应用程序开发人员与Kubernetes的交互体验
- 通过允许用户仅管理应用程序级别的资源而不是低级别的资源（如Pods和部署）来提高整体安全性
- 将应用程序特定的资源（即自定义资源定义）公开为Kubernetes资源

最后一个用例非常有趣。它允许解决方案提供商利用围绕常规Kubernetes资源的现有实践来管理应用程序特定的资源。**主要好处是任何采用此应用程序的人都可以利用现有的基础设施即代码工具**。

为了让我们了解可用的不同类型的Operators，我们可以查看OperatorHub.io网站。在那里，我们会找到用于流行的数据库、API管理器、开发工具等的Operators。

## 3. Operators和CRDs

**自定义资源定义，简称CRDs，是Kubernetes的扩展机制，允许我们在集群中存储结构化数据**。就像这个平台上几乎所有的东西一样，CRD定义本身也是一个资源。

这个元定义描述了给定CRD实例的范围（基于命名空间或全局）和用于验证CRD实例的模式。一旦注册，用户可以像创建原生实例一样创建CRD实例。集群管理员还可以将CRDs作为角色定义的一部分，从而只授予授权用户和应用程序访问权限。

**现在，注册CRD本身并不意味着Kubernetes将以任何方式使用它**。就Kubernetes而言，CRD实例只是其内部数据库中的一个条目。由于没有任何标准的Kubernetes原生控制器知道如何处理它，所以什么也不会发生。

这就是Operators的控制器部分发挥作用的地方。**一旦部署，它将监视与相应自定义资源相关的事件并相应地做出响应**。

在这里，《行动》部分是重要的。术语受到控制理论的启发，可以总结在以下图表中：

## 4. 实现Operators

让我们回顾一下创建Operators需要完成的主要任务：

- 定义我们通过Operators管理的目标资源模型
- 创建一个CRD，捕获部署这些资源所需的参数
- 创建一个控制器，监视与注册CRD相关的集群事件

**对于本教程，我们将为OWASP旗舰项目Dependency-Track实现一个Operators**。这个应用程序允许用户跟踪组织中使用的库中的漏洞，从而允许软件安全专业人员评估并解决发现的任何问题。

Dependency-Track的Docker分发由两个组件组成：API和前端服务，每个组件都有自己的镜像。在将它们部署到Kubernetes集群时，通常的做法是将每个组件包装在Deployment中以管理运行这些镜像的Pods。

然而，这还不是全部。我们还需要一些额外的资源来完成解决方案：

- 作为每个Deployment前面的负载均衡器的服务
- 一个Ingress，将应用程序暴露给外部世界
- 一个持久卷声明，用于存储从公共源下载的漏洞定义
- ConfigMap和Secret资源，分别存储通用和敏感参数

此外，我们还需要正确设置存活/就绪探针、资源限制和其他普通用户不应关心的细节。

让我们看看如何使用Operators简化这项任务。

## 5. 定义模型

我们的Operators将专注于运行Dependency-Track系统所需的最小资源集。**幸运的是，提供的镜像具有合理的默认值，所以我们只需要一个信息：用于访问应用程序的外部URL**。

现在暂时不考虑数据库和存储设置，但一旦我们掌握了基础知识，添加这些功能就很简单了。

然而，我们将留出一些自定义的空间。特别是，允许用户覆盖用于部署的镜像和版本是方便的，因为它们在不断发展。

让我们看看一个Dependency-Track安装图，显示了其所有组件：

所需的模型参数是：

- 在Kubernetes命名空间中创建资源
- 用于安装的名称，并用于派生每个组件名称
- 用于Ingress资源的主机名
- 可选的额外注释添加到Ingress。我们需要这些，因为一些云提供商（例如AWS）需要它们才能正常工作。

## 6. 控制器项目设置

**下一步将是手动定义CRD模式，但由于我们使用Java Operator SDK，这将被处理**。相反，让我们转到控制器项目本身。

我们将从一个标准的Spring Boot 3 WebFlux应用程序开始，并添加所需的依赖项：

```xml
`````<dependency>`````
    ``````<groupId>``````io.javaoperatorsdk``````</groupId>``````
    ``````<artifactId>``````operator-framework-spring-boot-starter``````</artifactId>``````
    `````<version>`````5.4.0`````</version>`````
`````</dependency>`````

`````<dependency>`````
    ``````<groupId>``````io.javaoperatorsdk``````</groupId>``````
    ``````<artifactId>``````operator-framework-spring-boot-starter-test``````</artifactId>``````
    `````<version>`````5.4.0`````</version>`````
    ``<scope>``test``</scope>``
    `<exclusions>`
        `<exclusion>`
            ``````<groupId>``````org.apache.logging.log4j``````</groupId>``````
            ``````<artifactId>``````log4j-slf4j2-impl``````</artifactId>``````
        `</exclusion>`
    `</exclusions>`
`````</dependency>`````

`````<dependency>`````
    ``````<groupId>``````io.fabric8``````</groupId>``````
    ``````<artifactId>``````crd-generator-apt``````</artifactId>``````
    `````<version>`````6.9.2`````</version>`````
    ``<scope>``provided``</scope>``
`````</dependency>`````

`````<dependency>`````
    ``````<groupId>``````org.bouncycastle``````</groupId>``````
    ``````<artifactId>``````bcprov-jdk18on``````</artifactId>``````
    `````<version>`````1.77`````</version>`````
`````</dependency>`````

`````<dependency>`````
    ``````<groupId>``````org.bouncycastle``````</groupId>``````
    ``````<artifactId>``````bcpkix-jdk18on``````</artifactId>``````
    `````<version>`````1.77`````</version>`````
`````</dependency>`````
```

这些依赖项的最新版本可在Maven Central上找到：

- _operator-framework-spring-boot-starter_
- _operator-framework-spring-boot-starter-test_
- _crd-generator-apt_
- _bcprov-jdk18on_
- _bcpkix-jdk18on_

前两个分别用于实现和测试Operators。_crd-generator-apt_是注解处理器，它从注解类生成CRD定义。最后，bouncycastle库需要支持现代加密标准。

注意添加到测试启动器的排除。我们移除了_log4j_依赖，因为它与_logback_冲突。

## 7. 实现主要资源

**一个主要资源类表示用户将部署到集群中的CRD**。它使用_@Group_和_@Version_注解进行标识，以便CRD注解处理器可以在编译时生成适当的CRD定义：

```java
@Group("com.baeldung")
@Version("v1")
public class DeptrackResource extends CustomResource`<DeptrackSpec, DeptrackStatus>` implements Namespaced {
    @JsonIgnore
    public String getFrontendServiceName() {
        return this.getMetadata().getName() + "-" + DeptrackFrontendServiceResource.COMPONENT;
    }

    @JsonIgnore
    public String getApiServerServiceName() {
        return this.getMetadata().getName() + "-" + DeptrackApiServerServiceResource.COMPONENT;
    }
}
```

在这里，我们利用SDK的类_CustomResource_来实现我们的_DeptrackResource_。除了基类，我们还使用了_Namespaced_，这是一个标记接口，它告知注解处理器我们的CRD实例将部署到Kubernetes命名空间。

我们在类中添加了两个辅助方法，稍后我们将使用它们来派生前端和API服务的名称。在这种情况下，我们需要_@JsonIgnore_注解，以避免在将CRD实例序列化/反序列化到Kubernetes API调用时出现问题。

## 8. 规范和状态类

_CustomResource_类需要两个模板参数：

- 一个规范类，包含我们的模型支持的参数
- 一个状态类，包含有关我们系统动态状态的信息

在我们的情况下，只有几个参数，所以这个规范相当简单：

```java
public class DeptrackSpec {
    private String apiServerImage = "dependencytrack/apiserver";
    private String apiServerVersion = "";

    private String frontendImage = "dependencytrack/frontend";
    private String frontendVersion = "";

    private String ingressHostname;
    private Map``<String, String>`` ingressAnnotations;

    // ... getters/setters omitted
}
```

至于状态类，我们将只扩展_ObservedGenerationAwareStatus_：

```java
public class DeptrackStatus extends ObservedGenerationAwareStatus {
}
```

**使用这种方法，SDK将在每次更新时自动增加_observedGeneration_status field**. 这是一种常见的做法，控制器使用它来跟踪资源的更改。

## 9. Reconciler

接下来，我们需要创建一个_Resonciler_类，负责管理Dependency-Track系统的整体状态。我们的类必须实现这个接口，它以资源类作为参数：

```java
@ControllerConfiguration(dependents = {
    @Dependent(name = DeptrackApiServerDeploymentResource.COMPONENT, type = DeptrackApiServerDeploymentResource.class),
    @Dependent(name = DeptrackFrontendDeploymentResource.COMPONENT, type = DeptrackFrontendDeploymentResource.class),
    @Dependent(name = DeptrackApiServerServiceResource.COMPONENT, type = DeptrackApiServerServiceResource.class),
    @Dependent(name = DeptrackFrontendServiceResource.COMPONENT, type = DeptrackFrontendServiceResource.class),
    @Dependent(type = DeptrackIngressResource.class)
})
@Component
public class DeptrackOperatorReconciler implements Reconciler````<DeptrackResource>```` {
    @Override
    public UpdateControl````<DeptrackResource>```` reconcile(DeptrackResource resource, Context````<DeptrackResource>```` context) throws Exception {
        return UpdateControl.noUpdate();
    }
}
```

这里的关键点是_@ControllerConfiguration_注解。它的_dependents_属性列出了将与主要资源的生命周期相关联的各个资源。

对于部署和服务，我们除了资源的_type_外还需要指定一个_name_属性，以区分它们。至于Ingress，由于每个部署的Dependency-Track资源只有一个，所以不需要名称。

注意我们还添加了_@Component_注解。我们需要这个注解，以便Operators的自动配置逻辑检测到调和器并将其添加到其内部注册表中。

## 10. 依赖资源类

对于我们想要在CRD部署的结果中在集群中创建的每个资源，我们需要实现一个_KubernetesDependentResource_类。**这些类必须用_@KubernetesDependent_注解，并负责管理这些资源的生命周期以响应主要资源的更改**。

SDK提供了_CRUDKubernetesDependentResource_实用类，大大简化了这项任务。我们只需要重写_desired()_方法，它返回依赖资源的期望状态描述：

```java
@KubernetesDependent(resourceDiscriminator = DeptrackApiServerDeploymentResource.Discriminator.class)
public class DeptrackApiServerDeploymentResource extends CRUDKubernetesDependentResource``<Deployment, DeptrackResource>`` {
    public static final String COMPONENT = "api-server";
    private Deployment template;

    public DeptrackApiServerDeploymentResource() {
        super(Deployment.class);
        this.template = BuilderHelper.loadTemplate(Deployment.class, "templates/api-server-deployment.yaml");
    }

    @Override
    protected Deployment desired(DeptrackResource primary, Context````<DeptrackResource>```` context) {
        ObjectMeta meta = fromPrimary(primary, COMPONENT)
          .build();

        return new DeploymentBuilder(template)
          .withMetadata(meta)
          .withSpec(buildSpec(primary, meta))
          .build();
    }

    private DeploymentSpec buildSpec(DeptrackResource primary, ObjectMeta primaryMeta) {
        return new DeploymentSpecBuilder()
          .withSelector(buildSelector(primaryMeta.getLabels()))
          .withReplicas(1)
          .withTemplate(buildPodTemplate(primary,primaryMeta))
          .build();
    }

    private LabelSelector buildSelector(Map``<String, String>`` labels) {
        return new LabelSelectorBuilder()
          .addToMatchLabels(labels)
          .build();
    }

    private PodTemplateSpec buildPodTemplate(DeptrackResource primary, ObjectMeta primaryMeta) {
        return new PodTemplateSpecBuilder()
          .withMetadata(primaryMeta)
          .withSpec(buildPodSpec(primary))
          .build();
    }

    private PodSpec buildPodSpec(DeptrackResource primary) {
        String imageVersion = StringUtils.hasText(primary.getSpec().getApiServerVersion()) ?
          ":" + primary.getSpec().getApiServerVersion().trim() : "";
        String imageName = StringUtils.hasText(primary.getSpec().getApiServerImage()) ?
          primary.getSpec().getApiServerImage().trim() : Constants.DEFAULT_API_SERVER_IMAGE;

        return new PodSpecBuilder(template.getSpec().getTemplate().getSpec())
          .editContainer(0)
            .withImage(imageName + imageVersion)
            .and()
          .build();
    }
}
```

在这种情况下，我们使用可用的构建器类创建_Deployment_。数据本身部分来自传递给方法的主要资源的元数据，部分来自初始化时读取的模板。**这种方法允许我们使用已经经过实战考验的现有部署作为模板，只修改真正需要的部分。**

最后，我们需要指定一个_Discriminator_类，Operators引擎使用它在处理来自同一种类的多个来源的事件时定位正确的资源类。在这里，我们将使用框架中提供的基于_ResourceIDMatcherDiscriminator_实用类的实现：

```java
class Discriminator extends ResourceIDMatcherDiscriminator``<Deployment, DeptrackResource>`` {
     public Discriminator() {
         super(COMPONENT, (p) -> new ResourceID(
           p.getMetadata().getName() + "-" + COMPONENT,
           p.getMetadata().getNamespace()));
     }
}
```

实用类需要一个事件源名称和一个映射函数。后者接受一个主要资源实例，并返回相关组件的资源标识符（命名空间+名称）。

由于所有资源类共享相同的基本结构，我们在这里不会重复它们。相反，我们建议查看源代码，了解每个资源是如何构建的。

## 11. 本地测试

由于控制器只是一个常规的Spring应用程序，我们可以使用常规的测试框架为我们的应用程序创建单元和集成测试。

**Java Operator SDK还提供了一个方便的模拟Kubernetes实现，有助于进行简单的测试用例**。要在测试类中使用这个模拟实现，我们使用_@EnableMockOperator_与标准的_@SpringBootTest_：

```java
@SpringBootTest
@EnableMockOperator(crdPaths = "classpath:META-INF/fabric8/deptrackresources.com.baeldung-v1.yml")
class ApplicationUnitTest {
    @Autowired
    KubernetesClient client;
    @Test
    void whenContextLoaded_thenCrdRegistered() {
        assertThat(
          client
            .apiextensions()
            .v1()
            .customResourceDefinitions()
            .withName("deptrackresources.com.baeldung")
            .get())
          .isNotNull();
    }
}
```

_crdPath_属性包含注解处理器创建CRD定义YAML文件的位置。**在测试初始化期间，模拟Kubernetes服务将自动注册它，我们可以创建一个CRD实例并检查是否正确创建了预期的资源。**

SDK的测试基础设施还配置了一个_Kubernetes_客户端，我们可以用它来模拟部署并检查是否正确创建了预期的资源。注意，**不需要一个工作的Kubernetes集群**！

## 12. 打包和部署

要打包我们的控制器项目，我们可以使用_Dockerfile_，或者更好的是使用Spring Boot的_build-image_目标。**我们推荐后者，因为它确保了镜像遵循有关安全和层组织的最佳实践**。

一旦我们将镜像发布到本地或远程注册表，我们必须创建一个YAML清单来将控制器部署到现有集群中。

这个清单包含了管理控制器的部署本身以及支持资源：

- CRD定义
- 控制器将“生活”的命名空间
- 列出控制器使用的所有API的集群角色
- 服务帐户
- 将角色链接到帐户的集群角色绑定

最终的清单可在GitHub仓库中找到。

## 13. CRD部署测试

**为了完成我们的教程，让我们创建一个简单的Dependency-Track CRD清单并部署它**。我们将使用专用的命名空间（“test”）并将其暴露出来。

对于我们的测试，我们使用的是监听IP地址172.31.42.16的本地Kubernetes，因此我们将使用_deptrack.172.31.42.16.nip.io_作为主机名。**NIP.IO是一个DNS服务，它解析任何形式为_*.1.2.3.4.nip.io_的主机名到IP地址_1.2.3.4，所以我们不需要设置任何DNS条目。**

让我们看看部署清单：

```yaml
apiVersion: com.baeldung/v1
kind: DeptrackResource
metadata:
  namespace: test
  name: deptrack1
  labels:
    project: tutorials
  annotations:
    author: Baeldung

spec:
  ingressHostname: deptrack.172.31.42.16.nip.io
```

现在，让我们使用_kubectl_部署它：

```shell
$ kubectl apply -f k8s/test-resource.yaml
deptrackresource.com.baeldung/deptrack1 created
```

我们可以得到控制器日志，看看它对CRD的创建做出了反应，并创建了依赖资源：

```shell
$ kubectl get --namespace test deployments
NAME                   READY   UP-TO-DATE   AVAILABLE   AGE
deptrack1-api-server   0/1     1            0           62s
deptrack1-frontend     1/1     1            1           62s

$ kubectl get --namespace test services
NAME TYPE CLUSTER-IP EXTERNAL-IP PORT(S) AGE
deptrack1-frontend-service ClusterIP 10.43.122.76 `<none>` 8080/TCP 2m17s

$ kubectl get --namespace test ingresses
NAME CLASS HOSTS ADDRESS PORTS AGE
deptrack1-ingress traefik deptrack.172.31.42.16.nip.io 172.31.42.16 80 2m5