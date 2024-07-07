import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as e,a as s}from"./app-B0JIQbDY.js";const t={},i=s(`<h1 id="kubernetes-中获取-pod-日志的连续流" tabindex="-1"><a class="header-anchor" href="#kubernetes-中获取-pod-日志的连续流"><span>Kubernetes 中获取 Pod 日志的连续流</span></a></h1><p>日志流在 Kubernetes 中对于监控和排错运行在容器化环境中的应用程序至关重要。它提供了对 Pod 中容器生成的日志的实时访问。</p><p>在本文中，我们将学习如何使用 <code>kubectl logs</code> 命令从 Kubernetes Pod 中获取日志的连续流。### 1. 概述</p><p>让我们从 <code>ubuntu-pod.yaml</code> 配置文件开始，这个 Pod 使用 <code>ubuntu</code> 镜像，并每分钟打印一条消息：</p><div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre class="language-yaml"><code>$ cat ubuntu<span class="token punctuation">-</span>pod.yaml
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>pod
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>container
    <span class="token key atrule">image</span><span class="token punctuation">:</span> ubuntu
    <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;bash&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;-c&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;while true; do echo &#39;running ...&#39; &amp;&amp; sleep 60; done&quot;</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以看到在 <code>command</code> 属性中指定了一个无限循环的 <code>while</code> 循环。因此，<strong>Pod 应该永远保持运行状态，同时每分钟记录一条消息</strong>。</p><p>现在，让我们使用 <code>kubectl apply</code> 命令根据我们的配置文件创建 <code>ubuntu-pod</code>：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ kubectl apply <span class="token parameter variable">-f</span> ubuntu-pod.yaml
pod/ubuntu-pod created
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>进一步，我们可以验证 Pod 是否确实处于运行状态：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ kubectl get pods --field-selector <span class="token assign-left variable">metadata.name</span><span class="token operator">=</span>ubuntu-pod
NAME         READY   STATUS    RESTARTS   AGE
ubuntu-pod   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          3m7s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，让我们使用 <code>kubectl logs</code> 命令检查我们 <code>ubuntu-pod</code> 的日志：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ kubectl logs ubuntu-pod
running <span class="token punctuation">..</span>.
running <span class="token punctuation">..</span>.
running <span class="token punctuation">..</span>.
running <span class="token punctuation">..</span>.
$ 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>太好了！我们可以在控制台看到到目前为止生成的日志消息。之后，控制权转移到命令提示符 (<code>$</code>)，我们不再看到日志流。然而，如果我们正在排查问题，实时的日志流可以反映应用程序的最新状态，并有助于有效的监控。</p><p>那么，让我们开始学习如何从我们的 Pod 中获取日志流的技术。</p><h3 id="_3-使用-–follow-选项流式传输日志" tabindex="-1"><a class="header-anchor" href="#_3-使用-–follow-选项流式传输日志"><span>3. 使用 <code>–follow</code> 选项流式传输日志</span></a></h3><p>让我们使用 <code>kubectl logs</code> 命令的 <code>–follow</code> 选项来查看 <code>ubuntu-pod</code> 的日志流：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ kubectl logs <span class="token parameter variable">--follow</span> ubuntu-pod
running <span class="token punctuation">..</span>.
running <span class="token punctuation">..</span>.
running <span class="token punctuation">..</span>.
running <span class="token punctuation">..</span>.
running <span class="token punctuation">..</span>.
running <span class="token punctuation">..</span>.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>有趣的是，这种方法不会将控制权转移到命令提示符 (<code>$</code>)。那么，让我们等待一分钟，看看下一条消息是否出现在我们的控制台上：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>running <span class="token punctuation">..</span>.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>太棒了！正如预期的那样，新的日志消息出现了。这是因为我们的 Pod 每分钟生成一条日志消息。</p><p>尽管如此，关于在 Kubernetes 中流式传输日志，我们还有很多要学习的内容。让我们准备深入探讨。</p><h3 id="_4-丰富日志流" tabindex="-1"><a class="header-anchor" href="#_4-丰富日志流"><span>4. 丰富日志流</span></a></h3><p>在本节中，我们将学习如何使用 <code>kubectl logs</code> 命令提供的选项，通过添加元数据来丰富我们的日志流消息。</p><h4 id="_4-1-带时间戳" tabindex="-1"><a class="header-anchor" href="#_4-1-带时间戳"><span>4.1. 带时间戳</span></a></h4><p>知道日志消息的时间戳可能是除了消息本身之外最重要的细节。<code>kubectl logs</code> 命令提供了 <code>–timestamps</code> 选项，我们可以使用它在消息的开头添加时间戳。</p><p>让我们看看这对我们 Kubernetes 集群中运行的 <code>ubuntu-pod</code> 的实际效果：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ kubectl logs <span class="token parameter variable">--follow</span> <span class="token parameter variable">--timestamps</span> ubuntu-pod
<span class="token number">2023</span>-07-30T03:09:49.368021900Z running <span class="token punctuation">..</span>.
<span class="token number">2023</span>-07-30T03:10:49.368683774Z running <span class="token punctuation">..</span>.
<span class="token number">2023</span>-07-30T03:11:49.370931509Z running <span class="token punctuation">..</span>.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以注意到消息显示时带有时间戳细节。此外，我们必须记住时间戳是以 RFC3339 格式显示的。</p><p>现在，每当我们的流中有新消息出现时，由于日志行的保证变化，它很容易引起注意：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token number">2023</span>-07-30T03:12:49.372825176Z running <span class="token punctuation">..</span>.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>太棒了！现在我们的日志流看起来更有用了。</p><h4 id="_4-2-带来源" tabindex="-1"><a class="header-anchor" href="#_4-2-带来源"><span>4.2. 带来源</span></a></h4><p>另一个有用的细节是添加到我们的日志流中的日志消息来源。幸运的是，<code>kubectl logs</code> 命令的 <code>–prefix</code> 选项也在这里为我们提供了帮助。</p><p>让我们继续并使用 <code>–prefix</code> 选项来丰富我们的流，包括日志消息的来源：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ kubectl logs <span class="token parameter variable">--follow</span> <span class="token parameter variable">--prefix</span> ubuntu-pod
<span class="token punctuation">[</span>pod/ubuntu-pod/ubuntu-container<span class="token punctuation">]</span> running <span class="token punctuation">..</span>.
<span class="token punctuation">[</span>pod/ubuntu-pod/ubuntu-container<span class="token punctuation">]</span> running <span class="token punctuation">..</span>.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如预期的那样，我们可以注意到我们的流显示了每个日志行的 Pod 名称 (<code>ubuntu-pod</code>) 和容器名称 (<code>ubuntu-container</code>)。有了这些信息，我们可以将每个日志行追溯到其正确的来源。</p><h3 id="_5-按大小限制日志流" tabindex="-1"><a class="header-anchor" href="#_5-按大小限制日志流"><span>5. 按大小限制日志流</span></a></h3><p>在我们的场景中，我们添加了一个非常简单的日志消息，并且两个日志消息之间有足够的延迟。然而，对于解决实际业务需求的应用程序，应用程序可能以更高的频率记录更长的消息。那么，让我们学习如何通过日志的大小来限制流。</p><h4 id="_5-1-使用-–tail-选项" tabindex="-1"><a class="header-anchor" href="#_5-1-使用-–tail-选项"><span>5.1. 使用 <code>–tail</code> 选项</span></a></h4><p>当我们使用 <code>–follow</code> 选项从运行中的 Pod 获取日志流时，Kubernetes 首先显示历史日志消息。一旦显示了所有消息，我们就可以看到近乎实时的日志直播。然而，如果 Pod 运行了很多天或者在短时间内生成了大量的日志事件，这种行为可能会增加噪声。</p><p>在这种情况下，我们可以使用 <code>–tail</code> 选项来限制历史日志行的大小到一个固定数量。结果，我们应该能更快地看到我们的日志流。</p><p>让我们通过 <code>ubuntu-pod</code> Pod 的日志流来验证我们的理解：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">date</span>
Sun Jul <span class="token number">30</span> 03:19:14 AM UTC <span class="token number">2023</span>
$ kubectl logs <span class="token parameter variable">--follow</span> <span class="token parameter variable">--timestamps</span> <span class="token parameter variable">--tail</span> <span class="token number">2</span> ubuntu-pod
<span class="token number">2023</span>-07-30T03:17:49.383687361Z running <span class="token punctuation">..</span>.
<span class="token number">2023</span>-07-30T03:18:49.386528064Z running <span class="token punctuation">..</span>.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如预期的那样。在输出中，我们可以看到过去只有两条日志行显示出来。</p><h4 id="_5-2-使用-–limit-bytes-选项" tabindex="-1"><a class="header-anchor" href="#_5-2-使用-–limit-bytes-选项"><span>5.2. 使用 <code>–limit-bytes</code> 选项</span></a></h4><p>日志大小是我们可以用于限制我们日志流大小的另一个标准。为此，我们可以使用 <code>kubectl logs</code> 命令的 <code>–limit-bytes</code> 选项。</p><p>让我们首先通过将 <code>1</code> 字节的值传递给 <code>–limit-bytes</code> 选项，检查我们的日志流中每个字节显示多少个字符：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ kubectl logs <span class="token parameter variable">--follow</span> --limit-bytes <span class="token number">1</span> ubuntu-pod
r
$ 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以看到，在这种情况下，一个字节对应一个字符。</p><p>由于在我们的场景中，每条日志行有 <code>11</code> 个字符，通过传递 <code>11</code> 字节给 <code>–limit-bytes</code> 选项来验证这一点是值得的：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ kubectl logs <span class="token parameter variable">--follow</span> --limit-bytes <span class="token number">11</span> ubuntu-pod
running <span class="token punctuation">..</span>.
$ 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>完美！我们已经验证了我们的理解。但是，我们必须注意到控制权在这两种情况下都立即转移到了命令提示符 (<code>$</code>)。那是因为 <strong><code>–limit-bytes</code> 选项适用于整个日志流，而不仅仅是历史日志</strong>。</p><p>最后，让我们传递 <code>500</code> 字节与 <code>–limit-bytes</code> 选项来看看 <code>ubuntu-pod</code> 的日志流：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ kubectl logs <span class="token parameter variable">--follow</span> --limit-bytes <span class="token number">500</span> ubuntu-pod
running <span class="token punctuation">..</span>.
running <span class="token punctuation">..</span>.
running <span class="token punctuation">..</span>.
running <span class="token punctuation">..</span>.
running <span class="token punctuation">..</span>.
running <span class="token punctuation">..</span>.
running <span class="token punctuation">..</span>.
running <span class="token punctuation">..</span>.
running <span class="token punctuation">..</span>.
running <span class="token punctuation">..</span>.
running <span class="token punctuation">..</span>.
running <span class="token punctuation">..</span>.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这种情况下，值得注意的是，一旦它获得了 <code>500</code> 个字符，流就会关闭。</p><h3 id="_6-按时间限制日志流" tabindex="-1"><a class="header-anchor" href="#_6-按时间限制日志流"><span>6. 按时间限制日志流</span></a></h3><p>在本节中，我们将看看如何使用基于时间的选项，如 <code>–since</code> 和 <code>–since-time</code> 来限制日志流。</p><h4 id="_6-1-使用-–since-选项" tabindex="-1"><a class="header-anchor" href="#_6-1-使用-–since-选项"><span>6.1. 使用 <code>–since</code> 选项</span></a></h4><p>我们可以使用 <code>–since</code> 选项指定一个时间段，以限制历史日志行到过去的特定时间。</p><p>让我们首先传递 <code>300s</code>（300 秒）给 <code>–since</code> 选项，并看看 <code>ubuntu-pod</code> 的日志流：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">date</span>
Sun Jul <span class="token number">30</span> 03:28:51 AM UTC <span class="token number">2023</span>
$ kubectl logs <span class="token parameter variable">--follow</span> <span class="token parameter variable">--timestamps</span> <span class="token parameter variable">--since</span> 300s ubuntu-pod
<span class="token number">2023</span>-07-30T03:24:49.398533266Z running <span class="token punctuation">..</span>.
<span class="token number">2023</span>-07-30T03:25:49.401017157Z running <span class="token punctuation">..</span>.
<span class="token number">2023</span>-07-30T03:26:49.402346354Z running <span class="token punctuation">..</span>.
<span class="token number">2023</span>-07-30T03:27:49.404715543Z running <span class="token punctuation">..</span>.
<span class="token number">2023</span>-07-30T03:28:49.407544746Z running <span class="token punctuation">..</span>.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以注意到，日志流中只显示了过去五条日志行。这是因为我们的应用程序每分钟记录一次日志，这在 <code>300</code> 秒内计算为 <code>5</code> 次。</p><p>此外，我们还可以通过传递分钟数来传递持续时间。让我们通过传递 <code>2m</code> 来验证这一点：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">date</span>
Sun Jul <span class="token number">30</span> 03:29:53 AM UTC <span class="token number">2023</span>
$ kubectl logs <span class="token parameter variable">--follow</span> <span class="token parameter variable">--timestamps</span> <span class="token parameter variable">--since</span> 2m ubuntu-pod
<span class="token number">2023</span>-07-30T03:28:49.407544746Z running <span class="token punctuation">..</span>.
<span class="token number">2023</span>-07-30T03:29:49.409491441Z running <span class="token punctuation">..</span>.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结果看起来是正确的。</p><p>接下来</p>`,66),o=[i];function l(p,c){return e(),a("div",null,o)}const r=n(t,[["render",l],["__file","2024-07-02-Get a Continuous Stream of Logs for Pods in Kubernetes.html.vue"]]),b=JSON.parse(`{"path":"/posts/baeldung/2024-07-02/2024-07-02-Get%20a%20Continuous%20Stream%20of%20Logs%20for%20Pods%20in%20Kubernetes.html","title":"Kubernetes 中获取 Pod 日志的连续流","lang":"zh-CN","frontmatter":{"date":"2024-07-02T00:00:00.000Z","category":["Kubernetes","运维"],"tag":["Kubernetes","日志流","监控"],"head":[["meta",{"name":"kubernetes 日志流","content":"学习如何在 Kubernetes 集群中使用 kubectl logs 命令获取 Pod 的连续日志流。"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-02/2024-07-02-Get%20a%20Continuous%20Stream%20of%20Logs%20for%20Pods%20in%20Kubernetes.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Kubernetes 中获取 Pod 日志的连续流"}],["meta",{"property":"og:description","content":"Kubernetes 中获取 Pod 日志的连续流 日志流在 Kubernetes 中对于监控和排错运行在容器化环境中的应用程序至关重要。它提供了对 Pod 中容器生成的日志的实时访问。 在本文中，我们将学习如何使用 kubectl logs 命令从 Kubernetes Pod 中获取日志的连续流。### 1. 概述 让我们从 ubuntu-pod...."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-02T02:56:55.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Kubernetes"}],["meta",{"property":"article:tag","content":"日志流"}],["meta",{"property":"article:tag","content":"监控"}],["meta",{"property":"article:published_time","content":"2024-07-02T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-02T02:56:55.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Kubernetes 中获取 Pod 日志的连续流\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-02T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-02T02:56:55.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Kubernetes 中获取 Pod 日志的连续流 日志流在 Kubernetes 中对于监控和排错运行在容器化环境中的应用程序至关重要。它提供了对 Pod 中容器生成的日志的实时访问。 在本文中，我们将学习如何使用 kubectl logs 命令从 Kubernetes Pod 中获取日志的连续流。### 1. 概述 让我们从 ubuntu-pod...."},"headers":[{"level":3,"title":"3. 使用 –follow 选项流式传输日志","slug":"_3-使用-–follow-选项流式传输日志","link":"#_3-使用-–follow-选项流式传输日志","children":[]},{"level":3,"title":"4. 丰富日志流","slug":"_4-丰富日志流","link":"#_4-丰富日志流","children":[]},{"level":3,"title":"5. 按大小限制日志流","slug":"_5-按大小限制日志流","link":"#_5-按大小限制日志流","children":[]},{"level":3,"title":"6. 按时间限制日志流","slug":"_6-按时间限制日志流","link":"#_6-按时间限制日志流","children":[]}],"git":{"createdTime":1719889015000,"updatedTime":1719889015000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":6.73,"words":2018},"filePathRelative":"posts/baeldung/2024-07-02/2024-07-02-Get a Continuous Stream of Logs for Pods in Kubernetes.md","localizedDate":"2024年7月2日","excerpt":"\\n<p>日志流在 Kubernetes 中对于监控和排错运行在容器化环境中的应用程序至关重要。它提供了对 Pod 中容器生成的日志的实时访问。</p>\\n<p>在本文中，我们将学习如何使用 <code>kubectl logs</code> 命令从 Kubernetes Pod 中获取日志的连续流。### 1. 概述</p>\\n<p>让我们从 <code>ubuntu-pod.yaml</code> 配置文件开始，这个 Pod 使用 <code>ubuntu</code> 镜像，并每分钟打印一条消息：</p>\\n<div class=\\"language-yaml\\" data-ext=\\"yml\\" data-title=\\"yml\\"><pre class=\\"language-yaml\\"><code>$ cat ubuntu<span class=\\"token punctuation\\">-</span>pod.yaml\\n<span class=\\"token key atrule\\">apiVersion</span><span class=\\"token punctuation\\">:</span> v1\\n<span class=\\"token key atrule\\">kind</span><span class=\\"token punctuation\\">:</span> Pod\\n<span class=\\"token key atrule\\">metadata</span><span class=\\"token punctuation\\">:</span>\\n  <span class=\\"token key atrule\\">name</span><span class=\\"token punctuation\\">:</span> ubuntu<span class=\\"token punctuation\\">-</span>pod\\n<span class=\\"token key atrule\\">spec</span><span class=\\"token punctuation\\">:</span>\\n  <span class=\\"token key atrule\\">containers</span><span class=\\"token punctuation\\">:</span>\\n  <span class=\\"token punctuation\\">-</span> <span class=\\"token key atrule\\">name</span><span class=\\"token punctuation\\">:</span> ubuntu<span class=\\"token punctuation\\">-</span>container\\n    <span class=\\"token key atrule\\">image</span><span class=\\"token punctuation\\">:</span> ubuntu\\n    <span class=\\"token key atrule\\">command</span><span class=\\"token punctuation\\">:</span> <span class=\\"token punctuation\\">[</span><span class=\\"token string\\">\\"bash\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"-c\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"while true; do echo 'running ...' &amp;&amp; sleep 60; done\\"</span><span class=\\"token punctuation\\">]</span>\\n</code></pre></div>","autoDesc":true}`);export{r as comp,b as data};
