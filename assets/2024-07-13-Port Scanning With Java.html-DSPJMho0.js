import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-B6f8H54y.js";const p={},e=t(`<h1 id="java端口扫描概述" tabindex="-1"><a class="header-anchor" href="#java端口扫描概述"><span>Java端口扫描概述</span></a></h1><p>端口扫描是一种枚举目标机器上开放或活动的端口的方法。其主要目标是列出开放的端口，以便了解当前正在运行的应用程序和服务。</p><p>在本教程中，<strong>我们将解释如何使用Java开发一个简单的端口扫描应用程序</strong>，我们可以使用它来扫描主机的开放端口。</p><h3 id="_2-什么是计算机端口" tabindex="-1"><a class="header-anchor" href="#_2-什么是计算机端口"><span>2. 什么是计算机端口？</span></a></h3><p>计算机端口是一个逻辑实体，它使特定服务与连接关联成为可能。此外，端口由1到65535的整数标识。按照惯例，前1024个端口是为标准服务预留的，例如：</p><ul><li>端口20：FTP</li><li>端口23：Telnet</li><li>端口25：SMTP</li><li>端口80：HTTP</li></ul><p>端口扫描器的思想是创建一个_TCP_套接字并尝试连接到特定端口。如果连接成功建立，那么我们将标记此端口为开放的，如果没有，我们将标记为关闭的。</p><p>然而，建立每个65535端口的连接每个端口可能需要高达200毫秒。这听起来可能是一个短暂的时间，但总的来说，<strong>逐个扫描单个主机的所有端口需要相当长的时间</strong>。</p><p>为了解决性能问题，<strong>我们将使用多线程方法</strong>。与尝试按顺序连接每个端口相比，这可以显著加快进程。</p><h3 id="_3-实现" tabindex="-1"><a class="header-anchor" href="#_3-实现"><span>3. 实现</span></a></h3><p>要实现我们的程序，我们创建一个带有两个参数输入的_portScan()_函数：</p><ul><li><em>ip</em>：要扫描的_IP_地址；它相当于localhost的127.0.0.1</li><li><em>nbrPortMaxToScan</em>：要扫描的最大端口数；如果我们想扫描所有端口，这个数字相当于65535</li></ul><h4 id="_3-1-实现" tabindex="-1"><a class="header-anchor" href="#_3-1-实现"><span>3.1. 实现</span></a></h4><p>让我们看看我们的_portScan()_方法是什么样子的：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">runPortScan</span><span class="token punctuation">(</span><span class="token class-name">String</span> ip<span class="token punctuation">,</span> <span class="token keyword">int</span> nbrPortMaxToScan<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token class-name">ConcurrentLinkedQueue</span> openPorts <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ConcurrentLinkedQueue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">ExecutorService</span> executorService <span class="token operator">=</span> <span class="token class-name">Executors</span><span class="token punctuation">.</span><span class="token function">newFixedThreadPool</span><span class="token punctuation">(</span>poolSize<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">AtomicInteger</span> port <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">AtomicInteger</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>port<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span> \`<span class="token operator">&lt;</span> nbrPortMaxToScan<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">final</span> <span class="token keyword">int</span> currentPort <span class="token operator">=</span> port<span class="token punctuation">.</span><span class="token function">getAndIncrement</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        executorService<span class="token punctuation">.</span><span class="token function">submit</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span>\` <span class="token punctuation">{</span>
            <span class="token keyword">try</span> <span class="token punctuation">{</span>
                <span class="token class-name">Socket</span> socket <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Socket</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                socket<span class="token punctuation">.</span><span class="token function">connect</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">InetSocketAddress</span><span class="token punctuation">(</span>ip<span class="token punctuation">,</span> currentPort<span class="token punctuation">)</span><span class="token punctuation">,</span> timeOut<span class="token punctuation">)</span><span class="token punctuation">;</span>
                socket<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                openPorts<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>currentPort<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>ip <span class="token operator">+</span> <span class="token string">&quot; ,port open: &quot;</span> <span class="token operator">+</span> currentPort<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IOException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token class-name">System</span><span class="token punctuation">.</span>err<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    executorService<span class="token punctuation">.</span><span class="token function">shutdown</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        executorService<span class="token punctuation">.</span><span class="token function">awaitTermination</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">MINUTES</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token class-name">List</span> openPortList <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;openPortsQueue: &quot;</span> <span class="token operator">+</span> openPorts<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token operator">!</span>openPorts<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        openPortList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>openPorts<span class="token punctuation">.</span><span class="token function">poll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    openPortList<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>p <span class="token operator">-&gt;</span> <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;port &quot;</span> <span class="token operator">+</span> p <span class="token operator">+</span> <span class="token string">&quot; is open&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们的方法返回一个包含所有开放端口的_List_。为此，我们创建一个新的_Socket_对象，用作两个主机之间的连接器。如果连接成功建立，那么我们假设该端口是开放的，然后我们继续下一行。另一方面，如果连接失败，那么我们假设该端口是关闭的，并且抛出一个_SocketTimeoutException_，我们将被抛出到异常_catch_块。</p><h4 id="_3-2-多线程" tabindex="-1"><a class="header-anchor" href="#_3-2-多线程"><span>3.2. 多线程</span></a></h4><p>为了优化扫描目标机器所有65535个端口所需的时间，我们将并发运行我们的方法。我们使用_ExecutorService_，它封装了一个线程池和要执行的任务队列。池中的所有线程仍在运行。</p><p>该服务检查队列中是否有要处理的任务，如果有，它就取出任务并执行它。一旦任务执行完成，线程再次等待服务从队列中分配给它一个新任务。</p><p>此外，我们使用一个有10个_线程_的_FixedThreadPool_，这意味着程序将并行运行最多10个线程。我们可以根据我们的机器配置和容量调整这个池大小。</p><h3 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h3><p>在这个快速教程中，我们解释了如何使用_Socket_和多线程方法开发一个简单的Java端口扫描应用程序。</p><p>如往常一样，代码片段可在GitHub上找到。</p>`,23),o=[e];function c(i,l){return s(),a("div",null,o)}const k=n(p,[["render",c],["__file","2024-07-13-Port Scanning With Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-13/2024-07-13-Port%20Scanning%20With%20Java.html","title":"Java端口扫描概述","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Networking"],"tag":["Port Scanning","Java Socket"],"head":[["meta",{"name":"keywords","content":"Java, Port Scanning, Networking, Socket"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-13/2024-07-13-Port%20Scanning%20With%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java端口扫描概述"}],["meta",{"property":"og:description","content":"Java端口扫描概述 端口扫描是一种枚举目标机器上开放或活动的端口的方法。其主要目标是列出开放的端口，以便了解当前正在运行的应用程序和服务。 在本教程中，我们将解释如何使用Java开发一个简单的端口扫描应用程序，我们可以使用它来扫描主机的开放端口。 2. 什么是计算机端口？ 计算机端口是一个逻辑实体，它使特定服务与连接关联成为可能。此外，端口由1到65..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-13T21:05:19.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Port Scanning"}],["meta",{"property":"article:tag","content":"Java Socket"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-13T21:05:19.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java端口扫描概述\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-13T21:05:19.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java端口扫描概述 端口扫描是一种枚举目标机器上开放或活动的端口的方法。其主要目标是列出开放的端口，以便了解当前正在运行的应用程序和服务。 在本教程中，我们将解释如何使用Java开发一个简单的端口扫描应用程序，我们可以使用它来扫描主机的开放端口。 2. 什么是计算机端口？ 计算机端口是一个逻辑实体，它使特定服务与连接关联成为可能。此外，端口由1到65..."},"headers":[{"level":3,"title":"2. 什么是计算机端口？","slug":"_2-什么是计算机端口","link":"#_2-什么是计算机端口","children":[]},{"level":3,"title":"3. 实现","slug":"_3-实现","link":"#_3-实现","children":[]},{"level":3,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1720904719000,"updatedTime":1720904719000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.08,"words":925},"filePathRelative":"posts/baeldung/2024-07-13/2024-07-13-Port Scanning With Java.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>端口扫描是一种枚举目标机器上开放或活动的端口的方法。其主要目标是列出开放的端口，以便了解当前正在运行的应用程序和服务。</p>\\n<p>在本教程中，<strong>我们将解释如何使用Java开发一个简单的端口扫描应用程序</strong>，我们可以使用它来扫描主机的开放端口。</p>\\n<h3>2. 什么是计算机端口？</h3>\\n<p>计算机端口是一个逻辑实体，它使特定服务与连接关联成为可能。此外，端口由1到65535的整数标识。按照惯例，前1024个端口是为标准服务预留的，例如：</p>\\n<ul>\\n<li>端口20：FTP</li>\\n<li>端口23：Telnet</li>\\n<li>端口25：SMTP</li>\\n<li>端口80：HTTP</li>\\n</ul>","autoDesc":true}');export{k as comp,d as data};
