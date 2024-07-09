import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-COaDJFIk.js";const e={},p=t(`<h1 id="jeromq-简介-baeldung" tabindex="-1"><a class="header-anchor" href="#jeromq-简介-baeldung"><span>JeroMQ 简介 | Baeldung</span></a></h1><p>在这篇文章中，我们将深入了解JeroMQ，这是ZeroMQ的一个纯Java实现。我们将看看它是什么，以及它在我们的应用程序中能为我们做些什么。</p><h2 id="_2-zeromq-是什么" tabindex="-1"><a class="header-anchor" href="#_2-zeromq-是什么"><span>2. ZeroMQ 是什么？</span></a></h2><p>ZeroMQ 是一个消息基础设施，它不需要任何实际的基础设施服务来设置。我们不需要像使用ActiveMQ或Kafka这样的实现中的单独消息代理。相反，我们应用程序中的ZeroMQ依赖项有能力为我们完成所有这些工作。</p><p>那么，我们能用这个做什么呢？我们可以实现我们通常想要的所有标准消息模式：</p><ul><li>请求/响应</li><li>发布/订阅</li><li>同步与异步</li><li>等等</li></ul><h3 id="_2-1-套接字" tabindex="-1"><a class="header-anchor" href="#_2-1-套接字"><span>2.1. 套接字</span></a></h3><p>ZeroMQ 使用套接字的概念。这些在概念上非常类似于我们在低级网络编程中使用的套接字。</p><p>所有套接字都有一个类型，我们将在本文中看到一些。然后它们要么监听来自其他套接字的连接，要么打开到其他套接字的连接。一旦一对套接字连接上，我们就准备好在它们之间发送消息了。注意，只有某些套接字组合可以一起使用，这取决于我们想要实现的确切目标。</p><p>JeroMQ 还支持套接字之间的几种不同的传输机制。例如，常见的包括：</p><ul><li><em>tcp://<code>&lt;host&gt;</code>:<code>&lt;port&gt;</code></em> – 这使用TCP/IP网络在套接字之间发送消息。这可以允许套接字在不同的过程和不同的主机上，但也带来了网络所具有的一些可靠性问题。</li><li><em>ipc://<code>&lt;endpoint&gt;</code></em> – 这使用系统依赖机制在套接字之间发送消息。这允许套接字在不同的过程上，但它们必须在同一主机上，可能还有其他系统限制，定哪些进程可以通信。</li><li><em>inproc://<code>&lt;name&gt;</code></em> – 这允许在同一进程中的套接字之间进行通信。具体来说，它们必须在同一个JeroMQ上下文中。</li></ul><p>传输的确切选择将取决于我们的需求。根据传输和套接字类型的确切情况，我们还可以使用它与其他ZeroMQ实现进行通信，包括使用其他语言的实现。</p><h2 id="_3-开始使用" tabindex="-1"><a class="header-anchor" href="#_3-开始使用"><span>3. 开始使用</span></a></h2><p>JeroMQ 是 ZeroMQ 的纯 Java 实现。让我们快速看看如何在应用程序中使用它。</p><h3 id="_3-1-依赖项" tabindex="-1"><a class="header-anchor" href="#_3-1-依赖项"><span>3.1. 依赖项</span></a></h3><p>首先，我们需要添加依赖项：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>\`&lt;dependency&gt;\`
    \`&lt;groupId&gt;\`org.zeromq\`&lt;/groupId&gt;\`
    \`&lt;artifactId&gt;\`jeromq\`&lt;/artifactId&gt;\`
    \`&lt;version&gt;\`0.5.3\`&lt;/version&gt;\`
\`&lt;/dependency&gt;\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以在 Maven 中央仓库中找到最新版本。</p><h3 id="_3-2-jeromq-上下文" tabindex="-1"><a class="header-anchor" href="#_3-2-jeromq-上下文"><span>3.2. JeroMQ 上下文</span></a></h3><p>在我们可以使用 JeroMQ 之前，我们需要设置一个上下文。这是一个 <em>ZContext</em> 类的实例，负责管理一切。</p><p>创建我们的上下文没有什么特别的——我们可以使用 <em>new ZContext()</em>。我们还必须确保正确关闭它——使用 <em>close()</em> 方法。这确保我们正确释放任何网络资源。</p><p>我们使用的实例必须至少在我们做的任何事情的生命周期内，所以我们需要确保它在应用程序开始时创建，直到结束时才关闭。</p><p>如果我们正在编写标准的Java应用程序，我们可以简单地使用 try-with-resources 模式。如果我们使用像Spring这样的框架，那么我们可以将其设置为具有配置销毁方法的bean。根据我们使用的框架需要的其他模式。</p><h3 id="_3-3-创建套接字" tabindex="-1"><a class="header-anchor" href="#_3-3-创建套接字"><span>3.3. 创建套接字</span></a></h3><p>一旦我们有了上下文，我们就可以使用它来创建套接字。这些套接字然后是我们所有消息传递的基础。</p><p>我们使用 <em>ZContext.createSocket()</em> 方法创建套接字，提供我们想要使用的套接字类型。完成此操作后，我们通常需要调用 <em>ZMQ.Socket.bind()</em> 来监听连接，或者调用 <em>ZMQ.Socket.connect()</em> 打开到另一个套接字的连接。</p><p>在这一点上，我们现在可以使用我们的套接字了。使用 <em>send()</em> 等方法发送消息，使用 <em>recv()</em> 等方法接收消息。</p><p>我们可以关闭我们的套接字以断开连接，当我们完成时。我们可以通过显式调用 <em>Socket.close()</em> 来做到这一点，或者通过关闭 <em>ZContext</em> 然后自动关闭所有从中创建的套接字。</p><p>注意，套接字不是线程安全的。我们可以在线程之间传递它们，但重要的是，一次只有一个线程访问它们。</p><h2 id="_4-请求-响应消息传递" tabindex="-1"><a class="header-anchor" href="#_4-请求-响应消息传递"><span>4. 请求/响应消息传递</span></a></h2><p>让我们从一个简单的请求/响应设置开始。我们首先需要一个服务器。这是监听传入连接的部分：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">ZContext</span> context <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ZContext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">ZMQ<span class="token punctuation">.</span>Socket</span> socket <span class="token operator">=</span> context<span class="token punctuation">.</span><span class="token function">createSocket</span><span class="token punctuation">(</span><span class="token class-name">SocketType</span><span class="token punctuation">.</span><span class="token constant">REP</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    socket<span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token string">&quot;tcp://*:5555&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> reply <span class="token operator">=</span> socket<span class="token punctuation">.</span><span class="token function">recv</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 在这里做一些事情。</span>

    <span class="token class-name">String</span> response <span class="token operator">=</span> <span class="token string">&quot;world&quot;</span><span class="token punctuation">;</span>
    socket<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span>response<span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token constant">ZMQ</span><span class="token punctuation">.</span><span class="token constant">CHARSET</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们创建了一个新的套接字，类型为 <em>REP</em>——代表回复。我们可以指示它开始在给定地址上监听，然后进入一个循环，在循环中我们从套接字接收下一条消息，对其进行一些处理，然后发送一个响应。</p><p>接下来，我们需要一个客户端。这是打开到服务器的连接的一方。这也是必须发送初始请求的一方——我们的服务器只能回复它收到的请求：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">ZContext</span> context <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ZContext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">ZMQ<span class="token punctuation">.</span>Socket</span> socket <span class="token operator">=</span> context<span class="token punctuation">.</span><span class="token function">createSocket</span><span class="token punctuation">(</span><span class="token class-name">SocketType</span><span class="token punctuation">.</span><span class="token constant">REQ</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    socket<span class="token punctuation">.</span><span class="token function">connect</span><span class="token punctuation">(</span><span class="token string">&quot;tcp://localhost:5555&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">String</span> request <span class="token operator">=</span> <span class="token string">&quot;Hello&quot;</span><span class="token punctuation">;</span>
    socket<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span>request<span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token constant">ZMQ</span><span class="token punctuation">.</span><span class="token constant">CHARSET</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> reply <span class="token operator">=</span> socket<span class="token punctuation">.</span><span class="token function">recv</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>和之前一样，我们创建了一个新的套接字。只是这次，它是 <em>REQ</em> 类型——代表请求。然后我们指示它连接到另一个套接字的某个地方，然后发送消息并接收响应。</p><p><em>REQ</em> 和 <em>REP</em> 之间的主要区别是它们被允许发送消息的时间。<em>REQ</em> 端可以随时发送消息，而 <em>REP</em> 端只能在收到消息后回复消息——因此是请求和响应。</p><h3 id="_4-1-多个客户端" tabindex="-1"><a class="header-anchor" href="#_4-1-多个客户端"><span>4.1. 多个客户端</span></a></h3><p>我们已经看到了如何让一个客户端向一个服务器发送消息。但如果我们想要有多个客户端呢？</p><p>好消息是，它就是可以工作。<strong>JeroMQ 将允许任意数量的客户端连接到同一个服务器地址，并且它会为我们处理所有的网络需求。</strong></p><p>但是，这是如何工作的呢？在我们的服务器中没有说明要向哪个客户端发送响应。这是因为我们不需要它。JeroMQ 为我们跟踪了所有这些。当服务器调用 <em>send()</em> 时，消息将发送给我们最后收到消息的那个客户端。这使我们的代码不需要关心任何这些。</p><p>缺点是，我们的处理必须是完全单线程的。由于这种方式，我们在接收下一条消息之前必须完成一条消息的所有处理并发送回复。对于一些场景来说，这是可以的，但通常这将是一个很大的瓶颈。</p><h3 id="_4-2-异步处理" tabindex="-1"><a class="header-anchor" href="#_4-2-异步处理"><span>4.2. 异步处理</span></a></h3><p><strong>如果我们想能够异步处理传入的请求并以无序的方式发送响应怎么办？</strong> 我们不能很容易地用 REQ/REP 设置做到这一点，因为每个响应都直接发送到最后收到的请求。</p><p>相反，我们可以使用一种不同类型的套接字——<em>ROUTER</em>。它的工作方式非常类似于 <em>REP</em>，只是它成为我们的责任来指示谁是消息的接收者。</p><p>让我们看看服务器组件：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">ZContext</span> context <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ZContext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">ZMQ<span class="token punctuation">.</span>Socket</span> broker <span class="token operator">=</span> context<span class="token punctuation">.</span><span class="token function">createSocket</span><span class="token punctuation">(</span><span class="token class-name">SocketType</span><span class="token punctuation">.</span><span class="token constant">ROUTER</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    broker<span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token string">&quot;tcp://*:5555&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">String</span> identity <span class="token operator">=</span> broker<span class="token punctuation">.</span><span class="token function">recvStr</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    broker<span class="token punctuation">.</span><span class="token function">recv</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 信封分隔符</span>
    <span class="token class-name">String</span> message <span class="token operator">=</span> broker<span class="token punctuation">.</span><span class="token function">recvStr</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 在这里做一些事情。</span>

    broker<span class="token punctuation">.</span><span class="token function">sendMore</span><span class="token punctuation">(</span>identity<span class="token punctuation">)</span><span class="token punctuation">;</span>
    broker<span class="token punctuation">.</span><span class="token function">sendMore</span><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    broker<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token string">&quot;Hello back&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这看起来非常相似，但并不完全相同。我们将套接字类型设置为 <em>ROUTER</em> 而不是 <em>REP</em>。这种套接字类型允许服务器通过知道他们的身份来将消息路由到特定的客户端。</p><p>当我们在这里接收消息时，我们实际上接收了三种不同的数据。首先，我们接收客户端的身份，然后是一个信封分隔符，然后是实际的消息。</p><p>同样地，当我们发送消息时，我们需要做同样的事情。我们发送消息的客户端的身份，然后是一个信封分隔符——可以是任何字符串——然后是实际的消息。</p><p>让我们看看客户端：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">ZContext</span> context <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ZContext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">ZMQ<span class="token punctuation">.</span>Socket</span> worker <span class="token operator">=</span> context<span class="token punctuation">.</span><span class="token function">createSocket</span><span class="token punctuation">(</span><span class="token class-name">SocketType</span><span class="token punctuation">.</span><span class="token constant">REQ</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    worker<span class="token punctuation">.</span><span class="token function">setIdentity</span><span class="token punctuation">(</span><span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token constant">ZMQ</span><span class="token punctuation">.</span><span class="token constant">CHARSET</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    worker<span class="token punctuation">.</span><span class="token function">connect</span><span class="token punctuation">(</span><span class="token string">&quot;tcp://localhost:5555&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    worker<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token string">&quot;Hello &quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">String</span> workload <span class="token operator">=</span> worker<span class="token punctuation">.</span><span class="token function">recvStr</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 对响应做一些事情。</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这几乎和我们之前的客户端一样。<strong>我们现在给客户端一个身份，这样服务器就知道哪个客户端是哪个。如果没有这个，服务器将无法将响应定向到正确的客户端。</strong> 除此之外，这和我们之前看到的一样因为篇幅限制，我将从上次停止的地方继续翻译：</p><p>由于我们的服务器现在可以指明消息是给哪个客户端的，我们可以突然同时处理多个请求——例如，使用一个执行器服务。唯一的要求是我们永远不要让多个线程同时访问套接字。</p><h2 id="_5-发布-订阅消息传递" tabindex="-1"><a class="header-anchor" href="#_5-发布-订阅消息传递"><span>5. 发布/订阅消息传递</span></a></h2><p>到目前为止，我们看到的情况是客户端发送了一个初始请求，然后服务器发送回一个响应。<strong>如果我们想让服务器只是广播事件，客户端可以消费怎么办？</strong></p><p>我们可以使用发布/订阅模式来实现这一点。服务器将发布消息，订阅者将消费这些消息。那么这是什么样子的呢？</p><p>首先我们需要我们的发布者：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">ZContext</span> context <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ZContext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">ZMQ<span class="token punctuation">.</span>Socket</span> pub <span class="token operator">=</span> context<span class="token punctuation">.</span><span class="token function">createSocket</span><span class="token punctuation">(</span><span class="token class-name">SocketType</span><span class="token punctuation">.</span><span class="token constant">PUB</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    pub<span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token string">&quot;tcp://*:5555&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 等待某些事情发生。</span>
    pub<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token string">&quot;Hello&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这看起来非常简单，但这是因为JeroMQ为我们管理了大部分复杂性。我们所做的只是创建一个类型为 <em>PUB</em> 的套接字——发布的意思，监听连接，然后通过它发送一条消息。</p><p>接下来，我们需要一个订阅者：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">ZContext</span> context <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ZContext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">ZMQ<span class="token punctuation">.</span>Socket</span> sub <span class="token operator">=</span> context<span class="token punctuation">.</span><span class="token function">createSocket</span><span class="token punctuation">(</span><span class="token class-name">SocketType</span><span class="token punctuation">.</span><span class="token constant">SUB</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    sub<span class="token punctuation">.</span><span class="token function">connect</span><span class="token punctuation">(</span><span class="token string">&quot;tcp://localhost:5555&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    sub<span class="token punctuation">.</span><span class="token function">subscribe</span><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">String</span> message <span class="token operator">=</span> sub<span class="token punctuation">.</span><span class="token function">recvStr</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这稍微复杂一些，但仍然不是很多。在这里我们创建了一个类型为 <em>SUB</em> 的套接字——订阅的意思，并将其连接到我们的发布者。然后我们需要订阅消息。这需要一组字节，作为所有传入消息的前缀——或者为空集合的字节，以订阅所有消息。</p><p>一旦我们这样做了，我们就可以接收消息。我们接收到任何适当的由发布者发送的消息。<strong>注意，我们只能接收到我们在订阅后发送的消息——在那之前发送的任何内容都将丢失。</strong></p><h3 id="_5-1-多个客户端" tabindex="-1"><a class="header-anchor" href="#_5-1-多个客户端"><span>5.1. 多个客户端</span></a></h3><p>和之前一样，如果我们想要有多个客户端，我们可以这样做。<strong>每个连接的订阅者都会收到所有适当的由发布者发送的消息，这意味着这充当了多播——例如，类似于JMS主题，而不是JMS队列。</strong></p><p>我们也可以有不同的客户端有不同的订阅。这意味着他们每个人都只得到广播消息的一个适当的子集。所有这些工作都完全符合我们的预期，不需要我们额外的努力。</p><h3 id="_5-2-异步处理" tabindex="-1"><a class="header-anchor" href="#_5-2-异步处理"><span>5.2. 异步处理</span></a></h3><p><strong>我们在这里遇到的一个问题是 <em>recv()</em> 方法会阻塞直到有消息可用。</strong> 如果我们的订阅者只是永远等待这个套接字的消息，然后对它们做出反应，那没问题。但是，如果我们想要我们的订阅者在做其他事情——例如，等待多个套接字——那么这就不行了。</p><p>我们使用的 <em>recv()</em> 或 <em>recvStr()</em> 方法有一个替代签名，允许提供一些标志。如果提供了标志 <em>ZMQ.DONTWAIT</em>，这将导致方法立即返回而不是阻塞。如果没有消息准备好读取，那么它将返回 <em>null</em>。</p><p>这将允许我们轮询套接字，看看是否有消息在等待，如果有，就处理它，如果没有，那么就在间歇期间做其他事情。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p><strong>在这里，我们对使用JeroMQ可以实现的内容进行了非常简短的介绍。</strong> 然而，我们可以利用它做更多的事情，而不仅仅是我们在这里所涵盖的。下次你需要在应用程序中进行任何形式的消息传递时，为什么不尝试一下呢？</p><p>和往常一样，我们可以在 GitHub 上找到本文的所有代码。</p><p>OK</p>`,75),o=[p];function c(l,i){return a(),s("div",null,o)}const k=n(e,[["render",c],["__file","2024-07-03-Introduction to JeroMQ.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-03/2024-07-03-Introduction%20to%20JeroMQ.html","title":"JeroMQ 简介 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Messaging"],"tag":["JeroMQ","ZeroMQ"],"head":[["meta",{"name":"keywords","content":"Java, JeroMQ, ZeroMQ, messaging, asynchronous, request/response"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-03/2024-07-03-Introduction%20to%20JeroMQ.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"JeroMQ 简介 | Baeldung"}],["meta",{"property":"og:description","content":"JeroMQ 简介 | Baeldung 在这篇文章中，我们将深入了解JeroMQ，这是ZeroMQ的一个纯Java实现。我们将看看它是什么，以及它在我们的应用程序中能为我们做些什么。 2. ZeroMQ 是什么？ ZeroMQ 是一个消息基础设施，它不需要任何实际的基础设施服务来设置。我们不需要像使用ActiveMQ或Kafka这样的实现中的单独消息..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-03T01:54:40.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"JeroMQ"}],["meta",{"property":"article:tag","content":"ZeroMQ"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-03T01:54:40.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"JeroMQ 简介 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-03T01:54:40.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"JeroMQ 简介 | Baeldung 在这篇文章中，我们将深入了解JeroMQ，这是ZeroMQ的一个纯Java实现。我们将看看它是什么，以及它在我们的应用程序中能为我们做些什么。 2. ZeroMQ 是什么？ ZeroMQ 是一个消息基础设施，它不需要任何实际的基础设施服务来设置。我们不需要像使用ActiveMQ或Kafka这样的实现中的单独消息..."},"headers":[{"level":2,"title":"2. ZeroMQ 是什么？","slug":"_2-zeromq-是什么","link":"#_2-zeromq-是什么","children":[{"level":3,"title":"2.1. 套接字","slug":"_2-1-套接字","link":"#_2-1-套接字","children":[]}]},{"level":2,"title":"3. 开始使用","slug":"_3-开始使用","link":"#_3-开始使用","children":[{"level":3,"title":"3.1. 依赖项","slug":"_3-1-依赖项","link":"#_3-1-依赖项","children":[]},{"level":3,"title":"3.2. JeroMQ 上下文","slug":"_3-2-jeromq-上下文","link":"#_3-2-jeromq-上下文","children":[]},{"level":3,"title":"3.3. 创建套接字","slug":"_3-3-创建套接字","link":"#_3-3-创建套接字","children":[]}]},{"level":2,"title":"4. 请求/响应消息传递","slug":"_4-请求-响应消息传递","link":"#_4-请求-响应消息传递","children":[{"level":3,"title":"4.1. 多个客户端","slug":"_4-1-多个客户端","link":"#_4-1-多个客户端","children":[]},{"level":3,"title":"4.2. 异步处理","slug":"_4-2-异步处理","link":"#_4-2-异步处理","children":[]}]},{"level":2,"title":"5. 发布/订阅消息传递","slug":"_5-发布-订阅消息传递","link":"#_5-发布-订阅消息传递","children":[{"level":3,"title":"5.1. 多个客户端","slug":"_5-1-多个客户端","link":"#_5-1-多个客户端","children":[]},{"level":3,"title":"5.2. 异步处理","slug":"_5-2-异步处理","link":"#_5-2-异步处理","children":[]}]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1719971680000,"updatedTime":1719971680000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":10.94,"words":3283},"filePathRelative":"posts/baeldung/2024-07-03/2024-07-03-Introduction to JeroMQ.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在这篇文章中，我们将深入了解JeroMQ，这是ZeroMQ的一个纯Java实现。我们将看看它是什么，以及它在我们的应用程序中能为我们做些什么。</p>\\n<h2>2. ZeroMQ 是什么？</h2>\\n<p>ZeroMQ 是一个消息基础设施，它不需要任何实际的基础设施服务来设置。我们不需要像使用ActiveMQ或Kafka这样的实现中的单独消息代理。相反，我们应用程序中的ZeroMQ依赖项有能力为我们完成所有这些工作。</p>\\n<p>那么，我们能用这个做什么呢？我们可以实现我们通常想要的所有标准消息模式：</p>\\n<ul>\\n<li>请求/响应</li>\\n<li>发布/订阅</li>\\n<li>同步与异步</li>\\n<li>等等</li>\\n</ul>","autoDesc":true}');export{k as comp,d as data};
