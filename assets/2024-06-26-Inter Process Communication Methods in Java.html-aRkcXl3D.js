import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as e}from"./app-DqNnL-2T.js";const t={},p=e(`<h1 id="java中的进程间通信方法" tabindex="-1"><a class="header-anchor" href="#java中的进程间通信方法"><span>Java中的进程间通信方法</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span><strong>1. 引言</strong></span></a></h2><p>们之前已经研究了进程间通信（IPC），并比较了不同方法之间的性能。在本文中，我们将探讨如何在Java应用程序中实现这些方法。</p><p>进程间通信，简称IPC，是一种不同进程之间可以相互通信的机制。这可以是构成同一应用程序的不同进程，也可以是在同一台计算机上运行的不同进程，或者是分布在互联网上的其他进程。</p><p>例如，一些网络浏览器将每个标签页作为不同的操作系统进程运行。这样做是为了使它们彼此隔离，但确实需要在标签页进程和主浏览器进程之间进行一定程度的IPC，以确保一切正常工作。</p><p>这里我们所看到的一切都将以消息传递的形式出现。Java缺乏对共享内存机制的标准支持，尽管一些第三方库可以促进这一点。因此，我们将考虑一个生产进程向消费进程发送消息。</p><h2 id="_3-基于文件的ipc" tabindex="-1"><a class="header-anchor" href="#_3-基于文件的ipc"><span><strong>3. 基于文件的IPC</strong></span></a></h2><p>我们可以在标准Java中实现的最简单的IPC形式就是简单地使用本地文件系统中的文件。一个进程可以写入文件，而另一个进程可以从同一个文件中读取。任何进程在进程边界之外使用文件系统所做的操作都可以被同一台计算机上的其他所有进程看到。</p><h3 id="_3-1-共享文件" tabindex="-1"><a class="header-anchor" href="#_3-1-共享文件"><span><strong>3.1. 共享文件</strong></span></a></h3><p>我们可以从让我们的两个进程读写同一个文件开始。我们的生产进程将向文件系统中写入文件，稍后，我们的消费进程将从同一个文件中读取。</p><p>我们需要小心的是，写入文件和从文件中读取不要重叠。在许多计算机上，文件系统操作不是原子的，因此如果读写同时发生，消费进程可能会收到损坏的消息。然而，如果我们能够保证这一点——例如，使用文件系统锁定——那么共享文件是实现IPC的一种直接方式。</p><h3 id="_3-2-共享目录" tabindex="-1"><a class="header-anchor" href="#_3-2-共享目录"><span><strong>3.2. 共享目录</strong></span></a></h3><p>比共享单个众所周知的文件更进一步的是共享整个目录。我们的生产应用程序每次需要时都可以向目录中写入一个新文件，我们的消费应用程序可以检测到新文件的存在并对其进行响应。</p><p>Java在NIO2中有_WatchService_ API，我们可以用它来实现这一点。我们的消费进程可以使用它来监视我们的目标目录，每当它通知我们创建了新文件时，我们就可以对其进行响应：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">WatchService</span> watchService <span class="token operator">=</span> <span class="token class-name">FileSystems</span><span class="token punctuation">.</span><span class="token function">getDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">newWatchService</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">Path</span> path <span class="token operator">=</span> <span class="token class-name">Paths</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;pathToDir&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
path<span class="token punctuation">.</span><span class="token function">register</span><span class="token punctuation">(</span>watchService<span class="token punctuation">,</span> <span class="token class-name">StandardWatchEventKinds</span><span class="token punctuation">.</span><span class="token constant">ENTRY_CREATE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">WatchKey</span> key<span class="token punctuation">;</span>
<span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>key <span class="token operator">=</span> watchService<span class="token punctuation">.</span><span class="token function">take</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">WatchEvent</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span>\` event <span class="token operator">:</span> key<span class="token punctuation">.</span><span class="token function">pollEvents</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 响应新文件。</span>
    <span class="token punctuation">}</span>
    key<span class="token punctuation">.</span><span class="token function">reset</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样做之后，我们的生产进程需要在这个目录中创建适当的文件，消费进程将检测并处理它们。</p><p>然而，请记住，大多数文件系统操作不是原子的。我们必须确保只有在文件完全写入后才会触发文件创建事件。这通常通过将文件写入临时目录，然后在完成后将其移动到目标目录来完成。</p><p>在大多数文件系统中，只要发生在同一文件系统中，“移动文件”或“重命名文件”操作被认为是原子的。</p><h3 id="_3-3-命名管道" tabindex="-1"><a class="header-anchor" href="#_3-3-命名管道"><span><strong>3.3. 命名管道</strong></span></a></h3><p>到目前为止，我们使用完整的文件来在进程之间传递消息。这要求生产进程在消费进程读取之前已经写入了整个文件。</p><p>命名管道是我们在这里可以使用的一种特殊类型的文件。命名管道是文件系统中的条目，但它们背后没有任何存储。相反，它们充当写入和读取进程之间的管道。</p><p>我们首先让我们的消费进程为读取打开命名管道。因为命名管道在文件系统中呈现为文件，所以我们使用标准的文件IO机制来完成这个操作：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">BufferedReader</span> reader <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BufferedReader</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">FileReader</span><span class="token punctuation">(</span>file<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">String</span> line<span class="token punctuation">;</span>
<span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>line <span class="token operator">=</span> reader<span class="token punctuation">.</span><span class="token function">readLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 处理读取的行</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，写入到这个命名管道的任何内容将立即被这个消费进程读取。这意味着我们的生产进程需要以正常方式打开此文件并写入它。</p><p>不幸的是，我们没有在Java中创建这些命名管道的机制。相反，我们需要使用标准的操作系统命令来创建文件系统条目，然后我们的程序才能使用它。我们如何做到这一点因操作系统而异。例如，在Linux上，我们会使用_mkfifo_命令：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">mkfifo</span> /tmp/ipc-namedpipe
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后，我们可以在我们的消费和生产进程中使用_/tmp/ipc-namedpipe_。</p><h2 id="_4-基于网络的ipc" tabindex="-1"><a class="header-anchor" href="#_4-基于网络的ipc"><span><strong>4. 基于网络的IPC</strong></span></a></h2><p>我们所看到的一切一直围绕着两个进程共享同一个文件系统。这意味着它们需要在同一台计算机上运行。</p><p>然而，在某些情况下，我们希望我们的进程无论在哪个计算机上运行都能相互通信。</p><p>我们可以通过使用基于网络的IPC来实现这一点。本质上，这只是一个进程运行网络服务器，另一个进程运行网络客户端。</p><h3 id="_4-1-简单套接字" tabindex="-1"><a class="header-anchor" href="#_4-1-简单套接字"><span><strong>4.1. 简单套接字</strong></span></a></h3><p>实现基于网络的IPC最明显的例子是使用简单的网络套接字。我们可以在JDK中使用套接字支持，或者依赖于如Netty或Grizzly之类的库。</p><p>我们的消费进程将运行一个网络服务器，监听已知地址。然后，它可以处理传入的连接并像任何网络服务器一样处理消息：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">ServerSocket</span> serverSocket <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ServerSocket</span><span class="token punctuation">(</span><span class="token number">1234</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Socket</span> clientSocket <span class="token operator">=</span> serverSocket<span class="token punctuation">.</span><span class="token function">accept</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">PrintWriter</span> out <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PrintWriter</span><span class="token punctuation">(</span>clientSocket<span class="token punctuation">.</span><span class="token function">getOutputStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">BufferedReader</span> in <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BufferedReader</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">InputStreamReader</span><span class="token punctuation">(</span>clientSocket<span class="token punctuation">.</span><span class="token function">getInputStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">String</span> line<span class="token punctuation">;</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>line <span class="token operator">=</span> in<span class="token punctuation">.</span><span class="token function">readLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 处理读取的行</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，生产进程可以向此发送网络消息以促进我们的IPC：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">Socket</span> clientSocket <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Socket</span><span class="token punctuation">(</span>host<span class="token punctuation">,</span> port<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">PrintWriter</span> out <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PrintWriter</span><span class="token punctuation">(</span>clientSocket<span class="token punctuation">.</span><span class="token function">getOutputStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">BufferedReader</span> in <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BufferedReader</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">InputStreamReader</span><span class="token punctuation">(</span>clientSocket<span class="token punctuation">.</span><span class="token function">getInputStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>msg<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>值得注意的是，与我们的基于文件的IPC相比，我们可以更容易地双向发送消息。</p><h3 id="_4-2-jmx" tabindex="-1"><a class="header-anchor" href="#_4-2-jmx"><span><strong>4.2. JMX</strong></span></a></h3><p>使用网络套接字运行良好，但我们需要自己管理很多复杂性。作为替代方案，我们也可以使用方法JMX。这在技术上仍然使用基于网络的IPC，但它将网络抽象化，因此我们只使用MBeans。</p><p>和以前一样，我们需要在我们的消费进程上运行一个服务器。然而，这个服务器现在是JVM的标准_MBeanServer_而不是我们自己做的任何东西。</p><p>我们首先需要定义我们的MBean本身：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">IPCTestMBean</span> <span class="token punctuation">{</span>
    <span class="token keyword">void</span> <span class="token function">sendMessage</span><span class="token punctuation">(</span><span class="token class-name">String</span> message<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">IPCTest</span> <span class="token keyword">implements</span> <span class="token class-name">IPCTestMBean</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">sendMessage</span><span class="token punctuation">(</span><span class="token class-name">String</span> message<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 处理消息</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，我们可以将其提供给JVM中的_MBeanServer_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">ObjectName</span> objectName <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ObjectName</span><span class="token punctuation">(</span><span class="token string">&quot;com.baeldung.ipc:type=basic,name=test&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">MBeanServer</span> server <span class="token operator">=</span> <span class="token class-name">ManagementFactory</span><span class="token punctuation">.</span><span class="token function">getPlatformMBeanServer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
server<span class="token punctuation">.</span><span class="token function">registerMBean</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">IPCTest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> objectName<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时，我们的消费者已经准备好了。</p><p>然后，我们可以使用_JMXConnectorFactory_实例从生产系统向这个服务器发送消息：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">JMXServiceURL</span> url <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">JMXServiceURL</span><span class="token punctuation">(</span><span class="token string">&quot;service:jmx:rmi:///jndi/rmi://localhost:1234/jmxrmi&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">JMXConnector</span> jmxc <span class="token operator">=</span> <span class="token class-name">JMXConnectorFactory</span><span class="token punctuation">.</span><span class="token function">connect</span><span class="token punctuation">(</span>url<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">ObjectName</span> objectName <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ObjectName</span><span class="token punctuation">(</span><span class="token string">&quot;com.baeldung.ipc:type=basic,name=test&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">IPCTestMBean</span> mbeanProxy <span class="token operator">=</span> <span class="token constant">JMX</span><span class="token punctuation">.</span><span class="token function">newMBeanProxy</span><span class="token punctuation">(</span>jmxc<span class="token punctuation">.</span><span class="token function">getMBeanServerConnection</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> objectName<span class="token punctuation">,</span> <span class="token class-name">IPCTestMBean</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    mbeanProxy<span class="token punctuation">.</span><span class="token function">sendMessage</span><span class="token punctuation">(</span><span class="token string">&quot;Hello&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>注意，要使这工作，我们需要使用一些额外的JVM参数来运行我们的消费者，以在众所周知的端口上公开JMX</strong>：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token parameter variable">-Dcom.sun.management.jmxremote</span><span class="token operator">=</span>true
<span class="token parameter variable">-Dcom.sun.management.jmxremote.port</span><span class="token operator">=</span><span class="token number">1234</span>
<span class="token parameter variable">-Dcom.sun.management.jmxremote.authenticate</span><span class="token operator">=</span>false
<span class="token parameter variable">-Dcom.sun.management.jmxremote.ssl</span><span class="token operator">=</span>false
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后我们需要在客户端的URL中使用这个，以便它连接到正确的服务器。</p><h2 id="_5-消息基础设施" tabindex="-1"><a class="header-anchor" href="#_5-消息基础设施"><span><strong>5. 消息基础设施</strong></span></a></h2><p>我们到目前为止所看到的所有内容都是相对简单的IPC手段。在某个时候，这将不再有效。例如，它假设只有一个进程消费消息——或者生产者确切知道要与哪个消费者交谈。</p><p><strong>如果我们需要超越这一点，我们可以集成使用像JMS、AMPQ或Kafka这样的专用消息基础设施。</strong></p><p>显然，这比我们在这里涵盖的规模要大得多——这将允许一整套生产和消费系统相互传递消息。然而，如果我们需要这种规模，那么这些选项确实存在。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span><strong>6. 结论</strong></span></a></h2><p>我们已经看到了几种不同的过程间通信手段以及我们如何自己实现它们。这涵盖了从共享单个文件到企业级规模的范围。</p><p>下次你需要多个进程相互通信时，为什么不考虑这些选项呢？</p><p>像往常一样，本文的所有代码都可以在GitHub上找到。</p>`,59),c=[p];function o(l,i){return s(),a("div",null,c)}const k=n(t,[["render",o],["__file","2024-06-26-Inter Process Communication Methods in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-06-26/2024-06-26-Inter%20Process%20Communication%20Methods%20in%20Java.html","title":"Java中的进程间通信方法","lang":"zh-CN","frontmatter":{"date":"2024-06-26T00:00:00.000Z","category":["Java","编程"],"tag":["Inter-Process Communication","Java IPC"],"head":[["meta",{"name":"keywords","content":"Java, IPC, 进程间通信, 文件系统, 网络套接字, JMX, 消息队列"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-26/2024-06-26-Inter%20Process%20Communication%20Methods%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中的进程间通信方法"}],["meta",{"property":"og:description","content":"Java中的进程间通信方法 1. 引言 们之前已经研究了进程间通信（IPC），并比较了不同方法之间的性能。在本文中，我们将探讨如何在Java应用程序中实现这些方法。 进程间通信，简称IPC，是一种不同进程之间可以相互通信的机制。这可以是构成同一应用程序的不同进程，也可以是在同一台计算机上运行的不同进程，或者是分布在互联网上的其他进程。 例如，一些网络浏..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-26T11:25:42.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Inter-Process Communication"}],["meta",{"property":"article:tag","content":"Java IPC"}],["meta",{"property":"article:published_time","content":"2024-06-26T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-26T11:25:42.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中的进程间通信方法\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-26T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-26T11:25:42.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中的进程间通信方法 1. 引言 们之前已经研究了进程间通信（IPC），并比较了不同方法之间的性能。在本文中，我们将探讨如何在Java应用程序中实现这些方法。 进程间通信，简称IPC，是一种不同进程之间可以相互通信的机制。这可以是构成同一应用程序的不同进程，也可以是在同一台计算机上运行的不同进程，或者是分布在互联网上的其他进程。 例如，一些网络浏..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"3. 基于文件的IPC","slug":"_3-基于文件的ipc","link":"#_3-基于文件的ipc","children":[{"level":3,"title":"3.1. 共享文件","slug":"_3-1-共享文件","link":"#_3-1-共享文件","children":[]},{"level":3,"title":"3.2. 共享目录","slug":"_3-2-共享目录","link":"#_3-2-共享目录","children":[]},{"level":3,"title":"3.3. 命名管道","slug":"_3-3-命名管道","link":"#_3-3-命名管道","children":[]}]},{"level":2,"title":"4. 基于网络的IPC","slug":"_4-基于网络的ipc","link":"#_4-基于网络的ipc","children":[{"level":3,"title":"4.1. 简单套接字","slug":"_4-1-简单套接字","link":"#_4-1-简单套接字","children":[]},{"level":3,"title":"4.2. JMX","slug":"_4-2-jmx","link":"#_4-2-jmx","children":[]}]},{"level":2,"title":"5. 消息基础设施","slug":"_5-消息基础设施","link":"#_5-消息基础设施","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1719401142000,"updatedTime":1719401142000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":7.66,"words":2297},"filePathRelative":"posts/baeldung/2024-06-26/2024-06-26-Inter Process Communication Methods in Java.md","localizedDate":"2024年6月26日","excerpt":"\\n<h2><strong>1. 引言</strong></h2>\\n<p>们之前已经研究了进程间通信（IPC），并比较了不同方法之间的性能。在本文中，我们将探讨如何在Java应用程序中实现这些方法。</p>\\n<p>进程间通信，简称IPC，是一种不同进程之间可以相互通信的机制。这可以是构成同一应用程序的不同进程，也可以是在同一台计算机上运行的不同进程，或者是分布在互联网上的其他进程。</p>\\n<p>例如，一些网络浏览器将每个标签页作为不同的操作系统进程运行。这样做是为了使它们彼此隔离，但确实需要在标签页进程和主浏览器进程之间进行一定程度的IPC，以确保一切正常工作。</p>\\n<p>这里我们所看到的一切都将以消息传递的形式出现。Java缺乏对共享内存机制的标准支持，尽管一些第三方库可以促进这一点。因此，我们将考虑一个生产进程向消费进程发送消息。</p>","autoDesc":true}');export{k as comp,d as data};
