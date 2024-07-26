import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as e}from"./app-DpYLEM_u.js";const t={},p=e(`<h1 id="kotlin中的代理模式" tabindex="-1"><a class="header-anchor" href="#kotlin中的代理模式"><span>Kotlin中的代理模式</span></a></h1><p>设计模式在创建健壮、可维护和可扩展的代码中起着关键作用。其中，代理模式因其多功能性和实用性而脱颖而出。</p><p>在本教程中，我们将深入探讨代理模式，探索其定义、用例和在Kotlin中的实现。</p><h2 id="理解代理模式" tabindex="-1"><a class="header-anchor" href="#理解代理模式"><span>理解代理模式</span></a></h2><p><strong>代理模式是一种结构型设计模式，它为另一个对象提供了一个代理或占位符来控制对其的访问</strong>。这个代理允许在实际对象的方法调用之前、之后或周围添加行为。代理模式在需要控制访问、管理资源或在不修改现有代码的情况下添加功能的场景中被广泛使用。</p><h2 id="代理模式的变体" tabindex="-1"><a class="header-anchor" href="#代理模式的变体"><span>代理模式的变体</span></a></h2><p>让我们探索代理模式的几个变体。</p><h3 id="_3-1-虚拟代理" tabindex="-1"><a class="header-anchor" href="#_3-1-虚拟代理"><span>3.1. 虚拟代理</span></a></h3><p>虚拟代理是那些创建成本高昂的对象的占位符。通过使用虚拟代理，我们可以延迟实际对象的创建，直到它被需要，从而优化性能。这在处理大型数据集或资源密集型操作时特别有用：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">interface</span> RealObject <span class="token punctuation">{</span>
    <span class="token keyword">fun</span> <span class="token function">performOperation</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> RealObjectImpl <span class="token operator">:</span> RealObject <span class="token punctuation">{</span>
    <span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">performOperation</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">println</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;RealObject performing operation&quot;</span></span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> VirtualProxy <span class="token operator">:</span> RealObject <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">val</span> realbject <span class="token keyword">by</span> lazy <span class="token punctuation">{</span> <span class="token function">RealObjectImpl</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
    <span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">performOperation</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        realObject<span class="token punctuation">.</span><span class="token function">performOperation</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个代码中，<em>VirtualProxy</em> 类实现了 <em>RealObject</em> 接口，作为 <em>RealObjectImpl</em> 的代理。<em>VirtualProxy</em> 类的 <em>performOperation()</em> 方法将实际操作委托给实际对象。代理还使用 <em>lazy</em> <em>()</em> 初始化来延迟 <em>RealObjectImpl</em> 的创建，直到第一次调用 <em>performOperation()</em>。</p><h3 id="_3-2-保护代理" tabindex="-1"><a class="header-anchor" href="#_3-2-保护代理"><span>3.2. 保护代理</span></a></h3><p>保护代理通过实施访问限制来控制对敏感或关键组件的访问。它们确保只有授权客户端才能与实际对象交互，提供额外的安全层。需要根据用户角色或权限限制操作的系统通常会依赖于这样的模式：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">interface</span> SensitiveObject <span class="token punctuation">{</span>
    <span class="token keyword">fun</span> <span class="token function">access</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> SensitiveObjectImpl <span class="token operator">:</span> SensitiveObject <span class="token punctuation">{</span>
    <span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">access</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">println</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;SensitiveObject accessed&quot;</span></span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token function">ProtectionProxy</span><span class="token punctuation">(</span><span class="token keyword">private</span> <span class="token keyword">val</span> userRole<span class="token operator">:</span> String<span class="token punctuation">)</span> <span class="token operator">:</span> SensitiveObject <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">val</span> realObject<span class="token operator">:</span> SensitiveObjectImpl <span class="token operator">=</span> <span class="token function">SensitiveObjectImpl</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">access</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>userRole <span class="token operator">==</span> <span class="token string-literal singleline"><span class="token string">&quot;admin&quot;</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            realObject<span class="token punctuation">.</span><span class="token function">access</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token function">println</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Access denied. Insufficient privileges.&quot;</span></span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个代码中，<em>ProtectionProxy</em> 作为 <em>SensitiveObjectImpl</em> 的代理，并添加了一个访问控制机制。</p><h3 id="_3-3-日志代理" tabindex="-1"><a class="header-anchor" href="#_3-3-日志代理"><span>3.3. 日志代理</span></a></h3><p>日志代理能够跟踪和监控对象上的方法调用。通过拦截调用，日志代理可以记录相关信息，如方法名称、参数和返回值。这对于调试、性能监控和审计非常有价值：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">interface</span> ObjectToLog <span class="token punctuation">{</span>
    <span class="token keyword">fun</span> <span class="token function">operation</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> RealObjectToLog <span class="token operator">:</span> ObjectToLog <span class="token punctuation">{</span>
    <span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">operation</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">println</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;RealObjectToLog performing operation&quot;</span></span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token function">LoggingProxy</span><span class="token punctuation">(</span><span class="token keyword">private</span> <span class="token keyword">val</span> realObject<span class="token operator">:</span> RealObjectToLog<span class="token punctuation">)</span> <span class="token operator">:</span> ObjectToLog <span class="token punctuation">{</span>
    <span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">operation</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">println</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Logging: Before operation&quot;</span></span><span class="token punctuation">)</span>
        realObject<span class="token punctuation">.</span><span class="token function">operation</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token function">println</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Logging: After operation&quot;</span></span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个代码中，接口 <em>ObjectToLog</em> 声明了 <em>operation()</em> 方法。此外，<em>RealObjectToLog</em> 类实现了 <em>ObjectToLog</em>。<em>LoggingProxy</em> 类作为代理，通过实现 <em>ObjectToLog</em> 并包装 <em>RealObjectToLog</em> 来拦截 <em>operation()</em> 调用。在实际方法执行之前和之后，这个代理打印日志消息。</p><h3 id="_3-4-远程代理" tabindex="-1"><a class="header-anchor" href="#_3-4-远程代理"><span>3.4. 远程代理</span></a></h3><p>远程代理作为位于不同地址空间的对象的本地表示，例如在远程服务器上。这允许组件之间进行透明通信，使使用分布式系统变得更加容易：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">interface</span> RemoteObject <span class="token punctuation">{</span>
    <span class="token keyword">fun</span> <span class="token function">performRemoteOperation</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> RemoteObjectImpl <span class="token operator">:</span> RemoteObject <span class="token punctuation">{</span>
    <span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">performRemoteOperation</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">println</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;RemoteObject performing remote operation on the server&quot;</span></span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token function">RemoteProxy</span><span class="token punctuation">(</span><span class="token keyword">private</span> <span class="token keyword">val</span> serverAddress<span class="token operator">:</span> String<span class="token punctuation">)</span> <span class="token operator">:</span> RemoteObject <span class="token punctuation">{</span>
    <span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">performRemoteOperation</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">println</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Proxy: Initiating remote communication with server at </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">serverAddress</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span>
        <span class="token keyword">val</span> remoteObject <span class="token operator">=</span> <span class="token function">RemoteObjectImpl</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        remoteObject<span class="token punctuation">.</span><span class="token function">performRemoteOperation</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

        <span class="token function">println</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Proxy: Remote communication complete&quot;</span></span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token function">Client</span><span class="token punctuation">(</span><span class="token keyword">private</span> <span class="token keyword">val</span> remoteObject<span class="token operator">:</span> RemoteObject<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">fun</span> <span class="token function">executeRemoteOperation</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">println</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Client: Performing operation through remote proxy&quot;</span></span><span class="token punctuation">)</span>
        remoteObject<span class="token punctuation">.</span><span class="token function">performRemoteOperation</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token function">Server</span><span class="token punctuation">(</span><span class="token keyword">private</span> <span class="token keyword">val</span> remoteObject<span class="token operator">:</span> RemoteObject<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">fun</span> <span class="token function">startServer</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">println</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Server: Server started&quot;</span></span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，<em>Client</em> 使用 <em>RemoteProxy</em> 在服务器端的 <em>RemoteObject</em> 上启动远程操作。客户端和服务器之间的通信由 <em>RemoteProxy</em> 抽象化，使客户端能够像操作本地对象一样透明地与远程对象交互。</p><p>在代理模式中，为 <em>RealSubject</em> 和 <em>Proxy</em> 建立了一个接口，使得代理可以无缝替换。这个公共接口确保实现相同接口的代理可以被传递给任何期望实际服务对象的客户端。</p><p><strong>代理持有对实际主题的引用</strong>。这个引用允许代理访问原始类的功能。<strong>此外，代理类控制对实际主题的访问，并可能处理其创建和删除</strong>。这种设计确保客户端与代理交互，提供了一层间接性，可以管理实际主题的实例化和行为。</p><h2 id="在kotlin中实现代理模式" tabindex="-1"><a class="header-anchor" href="#在kotlin中实现代理模式"><span>在Kotlin中实现代理模式</span></a></h2><p>现在我们已经看到了一些例子，我们将更深入地探讨在Kotlin中实现代理模式的具体实现。</p><h3 id="_4-1-没有代理模式的示例" tabindex="-1"><a class="header-anchor" href="#_4-1-没有代理模式的示例"><span>4.1. 没有代理模式的示例</span></a></h3><p>首先，让我们看看一些没有使用代理模式加载和显示 <em>Image</em> 的代码：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">interface</span> Image <span class="token punctuation">{</span>
    <span class="token keyword">fun</span> <span class="token function">display</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> Unit
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token function">RealImage</span><span class="token punctuation">(</span><span class="token keyword">private</span> <span class="token keyword">val</span> filename<span class="token operator">:</span> String<span class="token punctuation">)</span> <span class="token operator">:</span> Image <span class="token punctuation">{</span>
    <span class="token keyword">init</span> <span class="token punctuation">{</span>
        <span class="token function">loadFromDisk</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">private</span> <span class="token keyword">fun</span> <span class="token function">loadFromDisk</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">println</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Loading image: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">filename</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">display</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">println</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Displaying image: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">filename</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这种情况下，<em>RealImage</em> 类负责加载和显示图像。没有中间的代理类来控制访问或添加任何功能。</p><p>此外，在没有代理模式的情况下，客户端代码直接与 <em>RealImage</em> 类交互。当调用 <em>display()</em> 方法时，图像的加载和显示立即发生，没有任何中间步骤或额外的控制。</p><h3 id="_4-2-使用代理模式的示例" tabindex="-1"><a class="header-anchor" href="#_4-2-使用代理模式的示例"><span>4.2. 使用代理模式的示例</span></a></h3><p>相反，让我们探索如何使用代理模式实现这个解决方案。具体来说，使用相同的 <em>Image</em> 接口，我们的目标是建立一个代理，有效地管理对底层图像对象的访问：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">interface</span> Image <span class="token punctuation">{</span>
    <span class="token keyword">fun</span> <span class="token function">display</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> Unit
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token function">RealImage</span><span class="token punctuation">(</span><span class="token keyword">private</span> <span class="token keyword">val</span> filename<span class="token operator">:</span> String<span class="token punctuation">)</span> <span class="token operator">:</span> Image <span class="token punctuation">{</span>
    <span class="token keyword">init</span> <span class="token punctuation">{</span>
        <span class="token function">loadFromDisk</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">private</span> <span class="token keyword">fun</span> <span class="token function">loadFromDisk</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">println</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Loading image: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">filename</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">display</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">println</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Displaying image: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">filename</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token function">ProxyImage</span><span class="token punctuation">(</span><span class="token keyword">private</span> <span class="token keyword">val</span> filename<span class="token operator">:</span> String<span class="token punctuation">)</span> <span class="token operator">:</span> Image <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">var</span> realImage<span class="token operator">:</span> RealImage<span class="token operator">?</span> <span class="token operator">=</span> <span class="token keyword">null</span>
    <span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">display</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>realImage <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            realImage <span class="token operator">=</span> <span class="token function">RealImage</span><span class="token punctuation">(</span>filename<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        realImage<span class="token operator">?</span><span class="token punctuation">.</span><span class="token function">display</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，<em>ProxyImage</em> 类作为 <em>RealImage</em> 类的代理。实际的图像加载和显示发生在 <em>RealImage</em> 类中，但 <em>ProxyImage</em> 类通过延迟加载图像直到客户端调用 <em>display()</em> 方法来控制加载图像。此外，无论客户端调用 <em>display()</em> 方法多少次，<em>ProxyImage</em> 只加载一次图像。</p><h2 id="使用代理模式的优势" tabindex="-1"><a class="header-anchor" href="#使用代理模式的优势"><span>使用代理模式的优势</span></a></h2><p>让我们看看使用代理模式的一些优势：</p><ul><li><strong>代理提供了一种控制对实际对象访问的方式，允许进行额外的检查、记录或安全措施</strong>。这在需要细粒度控制方法调用的场景中非常有益。</li><li>代理能够在实际对象的方法调用之前、之后或周围添加新功能。这有助于实现记录、缓存或访问控制等功能，而无需修改对象的核心功能。</li><li>代理模式提供了一种管理它所包装的底层资源的方式。例如，本文中的代理管理了由代理控制的资源的延迟加载。</li></ul><h2 id="使用代理模式的缺点" tabindex="-1"><a class="header-anchor" href="#使用代理模式的缺点"><span>使用代理模式的缺点</span></a></h2><p>我们也来看看使用代理模式的一些缺点：</p><ul><li>引入代理可能会导致代码复杂性增加，特别是当涉及多种代理类型时。</li><li>在处理多线程应用程序时，可能会出现同步问题。如果多个线程同时尝试访问实际对象，<strong>代理需要处理同步以确保线程安全</strong>。</li><li>使用代理<strong>可能导致客户端代码和代理之间的紧密耦合</strong>，使系统对变化的灵活性降低。如果对实际对象或代理进行了更改，依赖这些代理的客户端可能需要相应地进行修改。</li></ul><h2 id="结论" tabindex="-1"><a class="header-anchor" href="#结论"><span>结论</span></a></h2><p>Kotlin中的代理模式是一个强大的工具，用于管理对象访问、增强功能和优化资源使用。通过使用代理，开发人员可以创建更模块化、维护性和可扩展的代码。无论是用于延迟加载、访问控制还是记录，代理模式都被证明是宝贵的资产。</p><p>如往常一样，这些示例的完整实现可以在GitHub上找到。</p><p><a href="https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg" target="_blank" rel="noopener noreferrer">Kotlin Logo</a><a href="https://www.baeldung.com/wp-content/uploads/sites/5/2022/11/kotlin_sublogo.png" target="_blank" rel="noopener noreferrer">Kotlin Sublogo</a><a href="https://secure.gravatar.com/avatar/2b7c820e884a055a46b81eb79a49cd12?s=50&amp;r=g" target="_blank" rel="noopener noreferrer">Baeldung Logo</a><a href="https://www.baeldung.com/wp-content/uploads/custom_avatars/brandon_ward_headshot-150x150.jpeg" target="_blank" rel="noopener noreferrer">Author Photo</a></p><p>OK</p>`,47),o=[p];function i(l,c){return a(),s("div",null,o)}const k=n(t,[["render",i],["__file","2024-07-14-The Proxy Pattern in Kotlin.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-14/2024-07-14-The%20Proxy%20Pattern%20in%20Kotlin.html","title":"Kotlin中的代理模式","lang":"zh-CN","frontmatter":{"date":"2024-02-01T00:00:00.000Z","category":["Kotlin","设计模式"],"tag":["Kotlin","代理模式","设计模式"],"head":[["meta",{"name":"keywords","content":"Kotlin, 代理模式, 设计模式"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-14/2024-07-14-The%20Proxy%20Pattern%20in%20Kotlin.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Kotlin中的代理模式"}],["meta",{"property":"og:description","content":"Kotlin中的代理模式 设计模式在创建健壮、可维护和可扩展的代码中起着关键作用。其中，代理模式因其多功能性和实用性而脱颖而出。 在本教程中，我们将深入探讨代理模式，探索其定义、用例和在Kotlin中的实现。 理解代理模式 代理模式是一种结构型设计模式，它为另一个对象提供了一个代理或占位符来控制对其的访问。这个代理允许在实际对象的方法调用之前、之后或周..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-14T09:46:29.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Kotlin"}],["meta",{"property":"article:tag","content":"代理模式"}],["meta",{"property":"article:tag","content":"设计模式"}],["meta",{"property":"article:published_time","content":"2024-02-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-14T09:46:29.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Kotlin中的代理模式\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-02-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-14T09:46:29.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Kotlin中的代理模式 设计模式在创建健壮、可维护和可扩展的代码中起着关键作用。其中，代理模式因其多功能性和实用性而脱颖而出。 在本教程中，我们将深入探讨代理模式，探索其定义、用例和在Kotlin中的实现。 理解代理模式 代理模式是一种结构型设计模式，它为另一个对象提供了一个代理或占位符来控制对其的访问。这个代理允许在实际对象的方法调用之前、之后或周..."},"headers":[{"level":2,"title":"理解代理模式","slug":"理解代理模式","link":"#理解代理模式","children":[]},{"level":2,"title":"代理模式的变体","slug":"代理模式的变体","link":"#代理模式的变体","children":[{"level":3,"title":"3.1. 虚拟代理","slug":"_3-1-虚拟代理","link":"#_3-1-虚拟代理","children":[]},{"level":3,"title":"3.2. 保护代理","slug":"_3-2-保护代理","link":"#_3-2-保护代理","children":[]},{"level":3,"title":"3.3. 日志代理","slug":"_3-3-日志代理","link":"#_3-3-日志代理","children":[]},{"level":3,"title":"3.4. 远程代理","slug":"_3-4-远程代理","link":"#_3-4-远程代理","children":[]}]},{"level":2,"title":"在Kotlin中实现代理模式","slug":"在kotlin中实现代理模式","link":"#在kotlin中实现代理模式","children":[{"level":3,"title":"4.1. 没有代理模式的示例","slug":"_4-1-没有代理模式的示例","link":"#_4-1-没有代理模式的示例","children":[]},{"level":3,"title":"4.2. 使用代理模式的示例","slug":"_4-2-使用代理模式的示例","link":"#_4-2-使用代理模式的示例","children":[]}]},{"level":2,"title":"使用代理模式的优势","slug":"使用代理模式的优势","link":"#使用代理模式的优势","children":[]},{"level":2,"title":"使用代理模式的缺点","slug":"使用代理模式的缺点","link":"#使用代理模式的缺点","children":[]},{"level":2,"title":"结论","slug":"结论","link":"#结论","children":[]}],"git":{"createdTime":1720950389000,"updatedTime":1720950389000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":6.75,"words":2026},"filePathRelative":"posts/baeldung/2024-07-14/2024-07-14-The Proxy Pattern in Kotlin.md","localizedDate":"2024年2月1日","excerpt":"\\n<p>设计模式在创建健壮、可维护和可扩展的代码中起着关键作用。其中，代理模式因其多功能性和实用性而脱颖而出。</p>\\n<p>在本教程中，我们将深入探讨代理模式，探索其定义、用例和在Kotlin中的实现。</p>\\n<h2>理解代理模式</h2>\\n<p><strong>代理模式是一种结构型设计模式，它为另一个对象提供了一个代理或占位符来控制对其的访问</strong>。这个代理允许在实际对象的方法调用之前、之后或周围添加行为。代理模式在需要控制访问、管理资源或在不修改现有代码的情况下添加功能的场景中被广泛使用。</p>\\n<h2>代理模式的变体</h2>\\n<p>让我们探索代理模式的几个变体。</p>","autoDesc":true}');export{k as comp,d as data};
