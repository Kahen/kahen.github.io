import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as n}from"./app-YddbDb53.js";const t={},l=n(`<hr><h1 id="如何在kubernetes中找到服务的url" tabindex="-1"><a class="header-anchor" href="#如何在kubernetes中找到服务的url"><span>如何在Kubernetes中找到服务的URL</span></a></h1><p>网络是Kubernetes不可或缺的一部分，而&quot;Service&quot;是其基础网络对象之一。Kubernetes &quot;Service&quot;允许我们将网络应用程序暴露给外部世界。然而，为了访问它，我们必须知道它的URL。</p><p>在本实践教程中，我们将讨论如何找到并使用Kubernetes服务的URL作为可靠的网络端点。</p><h2 id="_2-设置示例" tabindex="-1"><a class="header-anchor" href="#_2-设置示例"><span>2. 设置示例</span></a></h2><p>我们需要创建一些Kubernetes对象作为示例。首先，让我们创建&quot;Namespace&quot;对象。</p><h3 id="_2-1-创建kubernetes命名空间" tabindex="-1"><a class="header-anchor" href="#_2-1-创建kubernetes命名空间"><span>2.1. 创建Kubernetes命名空间</span></a></h3><p>Kubernetes命名空间允许我们在同一个集群内隔离资源。因此，让我们使用_create_命令创建两个命名空间 - <em>dev_和_stg</em>：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ kubectl create ns dev
namespace/dev created

$ kubectl create ns stg
namespace/stg created
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-创建kubernetes部署" tabindex="-1"><a class="header-anchor" href="#_2-2-创建kubernetes部署"><span>2.2. 创建Kubernetes部署</span></a></h3><p>在上一步中，我们创建了两个命名空间。现在，让我们将Redis pod部署到这些命名空间：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ kubectl create deploy redis-dev <span class="token parameter variable">--image</span><span class="token operator">=</span>redis:alpine <span class="token parameter variable">-n</span> dev
deployment.apps/redis-dev created

$ kubectl create deploy redis-stg <span class="token parameter variable">--image</span><span class="token operator">=</span>redis:alpine <span class="token parameter variable">-n</span> stg
deployment.apps/redis-stg created
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们验证pod是否已创建并且它们处于健康状态：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ kubectl get pods <span class="token parameter variable">-n</span> dev
NAME                         READY   STATUS    RESTARTS   AGE
redis-dev-7b647c797c-c2mmg   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          16s

$ kubectl get pods <span class="token parameter variable">-n</span> stg
NAME                        READY   STATUS    RESTARTS   AGE
redis-stg-d66978466-plfpv   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          9s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们可以观察到两个pod的状态都是_Running_。</p><p>现在，所需的设置已经准备好。在接下来的部分中，我们将创建一些_Service_对象以建立与这些pod的通信。</p><h2 id="_3-找到-clusterip-服务的url" tabindex="-1"><a class="header-anchor" href="#_3-找到-clusterip-服务的url"><span>3. 找到_ClusterIP_服务的URL</span></a></h2><p>在Kubernetes中，默认的服务类型是_ClusterIP_。<strong>对于_ClusterIP_服务，我们可以使用服务名称或其IP地址作为其URL</strong>。这允许我们仅在集群内限制通信。让我们通过一个简单的例子来理解这一点。</p><h3 id="_3-1-创建-clusterip-服务" tabindex="-1"><a class="header-anchor" href="#_3-1-创建-clusterip-服务"><span>3.1. 创建_ClusterIP_服务</span></a></h3><p>首先，让我们在两个命名空间中创建_ClusterIP_ _Service_对象：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ kubectl expose deploy redis-dev <span class="token parameter variable">--port</span> <span class="token number">6379</span> <span class="token parameter variable">--type</span> ClusterIP <span class="token parameter variable">-n</span> dev
service/redis-dev exposed

$ kubectl expose deploy redis-stg <span class="token parameter variable">--port</span> <span class="token number">6379</span> <span class="token parameter variable">--type</span> ClusterIP <span class="token parameter variable">-n</span> stg
service/redis-stg exposed
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，我们使用了_expose_命令来创建一个_Service_对象。<strong><em>expose_命令使用_Deployment_对象的选择器，并使用相同的选择器创建_Service</em></strong>。</p><p>在接下来的部分中，我们将讨论如何找到并使用这些服务的名称作为URL。</p><h3 id="_3-2-在同一命名空间中使用-clusterip-服务的url" tabindex="-1"><a class="header-anchor" href="#_3-2-在同一命名空间中使用-clusterip-服务的url"><span>3.2. 在同一命名空间中使用_ClusterIP_服务的URL</span></a></h3><p>首先，让我们使用_get_命令从_dev_命名空间中找到服务名称：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ kubectl get svc <span class="token parameter variable">-n</span> dev
NAME        TYPE        CLUSTER-IP      EXTERNAL-IP   PORT<span class="token punctuation">(</span>S<span class="token punctuation">)</span>    AGE
redis-dev   ClusterIP   <span class="token number">10.100</span>.18.154   \`\`\`<span class="token variable"><span class="token variable">\`</span><span class="token operator">&lt;</span>none<span class="token operator">&gt;</span><span class="token variable">\`</span></span>\`\`\`        <span class="token number">6379</span>/TCP   9s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在输出中，第一列显示服务名称。在我们的例子中，它是_redis-dev_。</p><p>现在，让我们_exec_到部署在_dev_命名空间中的Redis pod，使用_redis-dev_作为主机名连接到Redis服务器，并执行_PING_命令：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ kubectl <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> redis-dev-7b647c797c-c2mmg <span class="token parameter variable">-n</span> dev -- <span class="token function">sh</span>
/data <span class="token comment"># redis-cli -h redis-dev PING</span>
PONG
/data <span class="token comment"># exit</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们可以看到Redis服务器以_PONG_消息响应。</p><p>最后，我们执行_exit_命令从pod退出。</p><h3 id="_3-3-从另一个命名空间使用-clusterip-服务的url" tabindex="-1"><a class="header-anchor" href="#_3-3-从另一个命名空间使用-clusterip-服务的url"><span>3.3. 从另一个命名空间使用_ClusterIP_服务的URL</span></a></h3><p>让我们检查_ClusterIP_服务URL的格式：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token variable"><span class="token variable">\`</span><span class="token operator">&lt;</span>service-name<span class="token operator">&gt;</span><span class="token variable">\`</span></span><span class="token builtin class-name">.</span><span class="token variable"><span class="token variable">\`</span><span class="token operator">&lt;</span>namespace<span class="token operator">&gt;</span><span class="token variable">\`</span></span><span class="token builtin class-name">.</span><span class="token variable"><span class="token variable">\`</span><span class="token operator">&lt;</span>cluster-name<span class="token operator">&gt;</span><span class="token variable">\`</span></span><span class="token builtin class-name">:</span><span class="token variable"><span class="token variable">\`</span><span class="token operator">&lt;</span>service-port<span class="token operator">&gt;</span><span class="token variable">\`</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们在上一个例子中没有使用_命名空间_和_集群名称_，因为我们从同一命名空间和集群执行了命令。此外，我们还跳过了_服务端口_，因为服务是使用默认的Redis端口_6379_公开的。</p><p>然而，<strong>我们需要指定命名空间名称才能从另一个命名空间使用_ClusterIP_服务</strong>。让我们通过一个例子来理解这一点。</p><p>首先，让我们找出_stg_命名空间中的服务名称：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ kubectl get svc <span class="token parameter variable">-n</span> stg
NAME        TYPE        CLUSTER-IP      EXTERNAL-IP   PORT<span class="token punctuation">(</span>S<span class="token punctuation">)</span>    AGE
redis-stg   ClusterIP   <span class="token number">10.110</span>.213.51   \`\`\`<span class="token variable"><span class="token variable">\`</span><span class="token operator">&lt;</span>none<span class="token operator">&gt;</span><span class="token variable">\`</span></span>\`\`\`        <span class="token number">6379</span>/TCP   9s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们_exec_到部署在_dev_命名空间中的Redis pod，使用_redis-stg.stg_作为主机名连接到Redis服务器，并执行_PING_命令：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ kubectl <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> redis-dev-7b647c797c-c2mmg <span class="token parameter variable">-n</span> dev -- <span class="token function">sh</span>
/data <span class="token comment"># redis-cli -h redis-stg.stg PING</span>
PONG
/data <span class="token comment"># exit</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，我们可以看到Redis服务器发送了一个_PONG_回复。</p><p>需要注意的一个重要事项是，我们<strong>使用了_redis-stg.stg_作为主机名，其中_redis-stg_是服务名称，_stg_是创建_Service_对象的命名空间名称</strong>。</p><h3 id="_3-4-清理" tabindex="-1"><a class="header-anchor" href="#_3-4-清理"><span>3.4. 清理</span></a></h3><p>在前面的例子中，我们看到了如何使用服务名称作为URL。</p><p>现在，让我们使用_delete_命令从_dev_和_stg_命名空间中清理服务：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ kubectl delete svc redis-dev <span class="token parameter variable">-n</span> dev
<span class="token function">service</span> <span class="token string">&quot;redis-dev&quot;</span> deleted

$ kubectl delete svc redis-stg <span class="token parameter variable">-n</span> stg
<span class="token function">service</span> <span class="token string">&quot;redis-stg&quot;</span> deleted
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-找到-nodeport-服务的url" tabindex="-1"><a class="header-anchor" href="#_4-找到-nodeport-服务的url"><span>4. 找到_NodePort_服务的URL</span></a></h2><p>_NodePort_服务允许使用Kubernetes节点的IP地址和端口连接到应用程序。让我们通过创建一个_NodePort_服务来理解这一点。</p><h3 id="_4-1-创建-nodeport-服务" tabindex="-1"><a class="header-anchor" href="#_4-1-创建-nodeport-服务"><span>4.1. 创建_NodePort_服务</span></a></h3><p>首先，让我们使用_expose_命令创建一个类型为_NodePort_的_Service_：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ kubectl expose deploy redis-dev <span class="token parameter variable">--port</span> <span class="token number">6379</span> <span class="token parameter variable">--type</span> NodePort <span class="token parameter variable">-n</span> dev
service/redis-dev exposed
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们验证_Service_是否已创建：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ kubectl get svc <span class="token parameter variable">-n</span> dev
NAME        TYPE       CLUSTER-IP       EXTERNAL-IP   PORT<span class="token punctuation">(</span>S<span class="token punctuation">)</span>          AGE
redis-dev   NodePort   <span class="token number">10.111</span>.147.176   \`\`\`<span class="token variable"><span class="token variable">\`</span><span class="token operator">&lt;</span>none<span class="token operator">&gt;</span><span class="token variable">\`</span></span>\`\`\`        <span class="token number">6379</span>:30243/TCP   2s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们可以看到_Service_类型是_NodePort_。在倒数第二列中，它显示了Kubernetes节点的端口_30243_映射到了pod的端口_6379_。</p><p>现在，<strong>我们可以使用Kubernetes节点的IP地址和端口_30243_从集群外部访问Redis服务器</strong>。让我们实际操作一下。</p><h3 id="_4-2-使用-nodeport-服务的url" tabindex="-1"><a class="header-anchor" href="#_4-2-使用-nodeport-服务的url"><span>4.2. 使用_NodePort_服务的URL</span></a></h3><p>首先，让我们找到Kubernetes节点的IP地址：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ kubectl get nodes <span class="token parameter variable">-o</span> wide
NAME       STATUS   ROLES           AGE   VERSION   INTERNAL-IP    EXTERNAL-IP   OS-IMAGE             KERNEL-VERSION      CONTAINER-RUNTIME
baeldung   Ready    control-plane   24h   v1.28.3   <span class="token number">192.168</span>.49.2   \`\`\`<span class="token variable"><span class="token variable">\`</span><span class="token operator">&lt;</span>none<span class="token operator">&gt;</span><span class="token variable">\`</span></span>\`\`\`        Ubuntu <span class="token number">22.04</span>.3 LTS   <span class="token number">5.15</span>.0-41-generic   docker://24.0.7
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们使用了_Node_对象的_o wide_选项来显示附加字段。</p><p>在上面的输出中，<strong>带有标题_INTERNAL-IP_的列显示了Kubernetes节点的IP地址</strong>。</p><p>现在，从外部机器上，让我们使用_192.168.49.2_作为主机名，_30243_作为端口号，并执行_PING_命令：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ redis-cli <span class="token parameter variable">-h</span> <span class="token number">192.168</span>.49.2 <span class="token parameter variable">-p</span> <span class="token number">30243</span> PING
PONG
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们可以看到Redis服务器以_PONG_消息响应。</p><h3 id="_4-3-清理" tabindex="-1"><a class="header-anchor" href="#_4-3-清理"><span>4.3. 清理</span></a></h3><p>在下一部分，我们将看到_LoadBalancer_服务的使用。但在此之前，让我们清理_dev_命名空间中的_NodePort_服务：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ kubectl delete svc redis-dev <span class="token parameter variable">-n</span> dev
<span class="token function">service</span> <span class="token string">&quot;redis-dev&quot;</span> deleted
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-找到-loadbalancer-服务的url" tabindex="-1"><a class="header-anchor" href="#_5-找到-loadbalancer-服务的url"><span>5. 找到_LoadBalancer_服务的URL</span></a></h2><p>就像_NodePort_服务一样，_LoadBalancer_服务也允许使用负载均衡器的IPaddress来连接到应用程序。让我们通过创建一个_LoadBalancer_服务来理解这一点。</p><h3 id="_5-1-创建-loadbalancer-服务" tabindex="-1"><a class="header-anchor" href="#_5-1-创建-loadbalancer-服务"><span>5.1. 创建_LoadBalancer_服务</span></a></h3><p>让我们使用_expose_命令在_dev_命名空间中创建一个_LoadBalancer_服务：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ kubectl expose deploy redis-dev <span class="token parameter variable">--port</span> <span class="token number">6379</span> <span class="token parameter variable">--type</span> LoadBalancer <span class="token parameter variable">-n</span> dev
service/redis-dev exposed
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-2-使用-loadbalancer-服务的url" tabindex="-1"><a class="header-anchor" href="#_5-2-使用-loadbalancer-服务的url"><span>5.2. 使用_LoadBalancer_服务的URL</span></a></h3><p>接下来，让我们使用_get_命令找到负载均衡器的IP地址：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ kubectl get svc <span class="token parameter variable">-n</span> dev
NAME        TYPE           CLUSTER-IP       EXTERNAL-IP     PORT<span class="token punctuation">(</span>S<span class="token punctuation">)</span>          AGE
redis-dev   LoadBalancer   <span class="token number">10.111</span>.167.249   <span class="token number">192.168</span>.49.10   <span class="token number">6379</span>:32637/TCP   7s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，带有标题_EXTERNAL-IP_的列表示_LoadBalancer_服务的IP地址。</p><p>在我们的情况下，负载均衡器的IP地址是_192.168.49.10_。</p><p>现在，从外部机器上，让我们使用_192.168.49.10_作为主机名并执行_PING_命令：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ redis-cli <span class="token parameter variable">-h</span> <span class="token number">192.168</span>.49.10 PING
PONG
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在输出中，我们可以看到Redis服务器回复了一个_PONG_消息。</p><h2 id="_6-清理" tabindex="-1"><a class="header-anchor" href="#_6-清理"><span>6. 清理</span></a></h2><p>删除所有不需要的对象以整理集群是一个好习惯。这有助于我们通过减少硬件消耗来降低成本。</p><p>所以，让我们使用_delete_命令删除_dev和_stg_命名空间：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ kubectl delete ns dev
namespace <span class="token string">&quot;dev&quot;</span> deleted

$ kubectl delete ns stg
namespace <span class="token string">&quot;stg&quot;</span> deleted
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这条命令删除了命名空间本身以及这个命名空间中存在的所有对象。</p><p>在这里，<strong>我们直接删除了命名空间，因为这是一个测试设置。然而，在生产环境中执行删除操作时，我们应该非常小心</strong>。</p><h2 id="_7-结论" tabindex="-1"><a class="header-anchor" href="#_7-结论"><span>7. 结论</span></a></h2><p>在本文中，我们讨论了如何在Kubernetes中找到并使用服务的URL。</p><p>首先，我们看到了如何在同一命名空间和另一个命名空间中使用_ClusterIP_服务名称作为URL。然后，我们讨论了如何找到并使用_NodePort_服务的URL。</p><p>最后，我们讨论了使用负载均衡器的IP地址作为服务URL。</p><p>OK</p>`,90),r=[l];function i(d,p){return s(),a("div",null,r)}const u=e(t,[["render",i],["__file","2024-06-23-How to Find the URL of a Service in Kubernetes.html.vue"]]),v=JSON.parse('{"path":"/posts/baeldung/2024-06-23/2024-06-23-How%20to%20Find%20the%20URL%20of%20a%20Service%20in%20Kubernetes.html","title":"如何在Kubernetes中找到服务的URL","lang":"zh-CN","frontmatter":{"date":"2024-06-23T00:00:00.000Z","category":["Kubernetes","Networking"],"tag":["Service URL","ClusterIP","NodePort","LoadBalancer"],"head":[["meta",{"name":"keywords","content":"Kubernetes, Service URL, ClusterIP, NodePort, LoadBalancer, Networking"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-23/2024-06-23-How%20to%20Find%20the%20URL%20of%20a%20Service%20in%20Kubernetes.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"如何在Kubernetes中找到服务的URL"}],["meta",{"property":"og:description","content":"如何在Kubernetes中找到服务的URL 网络是Kubernetes不可或缺的一部分，而\\"Service\\"是其基础网络对象之一。Kubernetes \\"Service\\"允许我们将网络应用程序暴露给外部世界。然而，为了访问它，我们必须知道它的URL。 在本实践教程中，我们将讨论如何找到并使用Kubernetes服务的URL作为可靠的网络端点。 2. ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-23T13:28:44.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Service URL"}],["meta",{"property":"article:tag","content":"ClusterIP"}],["meta",{"property":"article:tag","content":"NodePort"}],["meta",{"property":"article:tag","content":"LoadBalancer"}],["meta",{"property":"article:published_time","content":"2024-06-23T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-23T13:28:44.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"如何在Kubernetes中找到服务的URL\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-23T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-23T13:28:44.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"如何在Kubernetes中找到服务的URL 网络是Kubernetes不可或缺的一部分，而\\"Service\\"是其基础网络对象之一。Kubernetes \\"Service\\"允许我们将网络应用程序暴露给外部世界。然而，为了访问它，我们必须知道它的URL。 在本实践教程中，我们将讨论如何找到并使用Kubernetes服务的URL作为可靠的网络端点。 2. ..."},"headers":[{"level":2,"title":"2. 设置示例","slug":"_2-设置示例","link":"#_2-设置示例","children":[{"level":3,"title":"2.1. 创建Kubernetes命名空间","slug":"_2-1-创建kubernetes命名空间","link":"#_2-1-创建kubernetes命名空间","children":[]},{"level":3,"title":"2.2. 创建Kubernetes部署","slug":"_2-2-创建kubernetes部署","link":"#_2-2-创建kubernetes部署","children":[]}]},{"level":2,"title":"3. 找到_ClusterIP_服务的URL","slug":"_3-找到-clusterip-服务的url","link":"#_3-找到-clusterip-服务的url","children":[{"level":3,"title":"3.1. 创建_ClusterIP_服务","slug":"_3-1-创建-clusterip-服务","link":"#_3-1-创建-clusterip-服务","children":[]},{"level":3,"title":"3.2. 在同一命名空间中使用_ClusterIP_服务的URL","slug":"_3-2-在同一命名空间中使用-clusterip-服务的url","link":"#_3-2-在同一命名空间中使用-clusterip-服务的url","children":[]},{"level":3,"title":"3.3. 从另一个命名空间使用_ClusterIP_服务的URL","slug":"_3-3-从另一个命名空间使用-clusterip-服务的url","link":"#_3-3-从另一个命名空间使用-clusterip-服务的url","children":[]},{"level":3,"title":"3.4. 清理","slug":"_3-4-清理","link":"#_3-4-清理","children":[]}]},{"level":2,"title":"4. 找到_NodePort_服务的URL","slug":"_4-找到-nodeport-服务的url","link":"#_4-找到-nodeport-服务的url","children":[{"level":3,"title":"4.1. 创建_NodePort_服务","slug":"_4-1-创建-nodeport-服务","link":"#_4-1-创建-nodeport-服务","children":[]},{"level":3,"title":"4.2. 使用_NodePort_服务的URL","slug":"_4-2-使用-nodeport-服务的url","link":"#_4-2-使用-nodeport-服务的url","children":[]},{"level":3,"title":"4.3. 清理","slug":"_4-3-清理","link":"#_4-3-清理","children":[]}]},{"level":2,"title":"5. 找到_LoadBalancer_服务的URL","slug":"_5-找到-loadbalancer-服务的url","link":"#_5-找到-loadbalancer-服务的url","children":[{"level":3,"title":"5.1. 创建_LoadBalancer_服务","slug":"_5-1-创建-loadbalancer-服务","link":"#_5-1-创建-loadbalancer-服务","children":[]},{"level":3,"title":"5.2. 使用_LoadBalancer_服务的URL","slug":"_5-2-使用-loadbalancer-服务的url","link":"#_5-2-使用-loadbalancer-服务的url","children":[]}]},{"level":2,"title":"6. 清理","slug":"_6-清理","link":"#_6-清理","children":[]},{"level":2,"title":"7. 结论","slug":"_7-结论","link":"#_7-结论","children":[]}],"git":{"createdTime":1719149324000,"updatedTime":1719149324000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":7.08,"words":2124},"filePathRelative":"posts/baeldung/2024-06-23/2024-06-23-How to Find the URL of a Service in Kubernetes.md","localizedDate":"2024年6月23日","excerpt":"<hr>\\n<h1>如何在Kubernetes中找到服务的URL</h1>\\n<p>网络是Kubernetes不可或缺的一部分，而\\"Service\\"是其基础网络对象之一。Kubernetes \\"Service\\"允许我们将网络应用程序暴露给外部世界。然而，为了访问它，我们必须知道它的URL。</p>\\n<p>在本实践教程中，我们将讨论如何找到并使用Kubernetes服务的URL作为可靠的网络端点。</p>\\n<h2>2. 设置示例</h2>\\n<p>我们需要创建一些Kubernetes对象作为示例。首先，让我们创建\\"Namespace\\"对象。</p>\\n<h3>2.1. 创建Kubernetes命名空间</h3>","autoDesc":true}');export{u as comp,v as data};
