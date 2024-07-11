import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-uizvaz9h.js";const e={},p=t(`<h1 id="java中的internet地址解析服务提供者接口" tabindex="-1"><a class="header-anchor" href="#java中的internet地址解析服务提供者接口"><span>Java中的Internet地址解析服务提供者接口</span></a></h1><p>在本教程中，我们将讨论Java的JEP 418，它为Internet主机和地址解析建立了一个新的服务提供者接口（SPI）。</p><p>任何连接到计算机网络的设备都被分配一个数值或IP（Internet协议）地址。IP地址有助于唯一地识别网络上的设备，并且它们也有助于路由数据包到设备和从设备。</p><p>它们通常有两种类型。IPv4是IP标准的第四代，是一个32位地址。由于互联网的快速增长，还发布了一个更大的新的v6版本的IP标准，其中包含十六进制字符。</p><p>此外，还有另一种相关的地址类型。网络设备，如以太网端口或网络接口卡（NIC），具有MAC（媒体访问控制）地址。这些是全球分布的，所有网络接口设备都可以用MAC地址唯一地识别。</p><p>Internet地址解析通常指的是将较高级别的网络地址（例如，域名（baeldung）或URL（https://www.baeldung.com））转换为较低级别的网络地址，如IP地址或MAC地址。</p><p>在Java中，今天有多种方式使用java.net.InetAddress API解析Internet地址。该API内部使用操作系统的本地解析器进行DNS查找。</p><p>操作系统的本地地址解析，InetAddress API当前使用的，涉及多个步骤。涉及到系统级DNS缓存，其中存储了常见的DNS映射。如果在本地DNS缓存中发生缓存未命中，则系统解析器配置提供了有关执行后续查找的DNS服务器的信息。</p><p>然后，操作系统查询上一步中获得的配置DNS服务器以获取信息。这一步可能会递归地再发生几次。</p><p>如果匹配并查找成功，DNS地址将被缓存在所有服务器上并返回给原始客户端。但是，如果没有匹配，则触发到根服务器的迭代查找过程，提供有关权威导航服务器（ANS）的信息。这些权威名称服务器（ANS）存储有关顶级域名（TLD）的信息，例如.org、.com等。</p><p>这些步骤最终将域名与Internet地址匹配（如果有效）或返回客户端失败。</p><p>使用Java的InetAddress API</p><p>InetAddress API提供了多种方法来执行DNS查询和解析。这些API是java.net包的一部分。</p><p>4.1. getAllByName() API getAllByName() API尝试将主机名映射到一组IP地址：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">InetAddress</span><span class="token punctuation">[</span><span class="token punctuation">]</span> inetAddresses <span class="token operator">=</span> <span class="token class-name">InetAddress</span><span class="token punctuation">.</span><span class="token function">getAllByName</span><span class="token punctuation">(</span>host<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Assert</span><span class="token punctuation">.</span><span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span>inetAddresses<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token class-name">InetAddress</span><span class="token operator">::</span><span class="token function">getHostAddress</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toArray</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">::</span><span class="token keyword">new</span><span class="token punctuation">)</span><span class="token punctuation">.</span>length <span class="token operator">&gt;</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这也被称为正向查找。</p><p>4.2. getByName() API getByName() API与之前的正向查找API类似，但它只将主机映射到第一个匹配的IP地址：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">InetAddress</span> inetAddress <span class="token operator">=</span> <span class="token class-name">InetAddress</span><span class="token punctuation">.</span><span class="token function">getByName</span><span class="token punctuation">(</span><span class="token string">&quot;www.google.com&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Assert</span><span class="token punctuation">.</span><span class="token function">assertNotNull</span><span class="token punctuation">(</span>inetAddress<span class="token punctuation">.</span><span class="token function">getHostAddress</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 返回一个IP地址</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>4.3. getByAddress() API 这是执行反向查找的最基本API，它以IP地址为输入，并尝试返回与之关联的主机：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">InetAddress</span> inetAddress <span class="token operator">=</span> <span class="token class-name">InetAddress</span><span class="token punctuation">.</span><span class="token function">getByAddress</span><span class="token punctuation">(</span>ip<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Assert</span><span class="token punctuation">.</span><span class="token function">assertNotNull</span><span class="token punctuation">(</span>inetAddress<span class="token punctuation">.</span><span class="token function">getHostName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 返回一个主机（例如google.com）</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>4.4. getCanonicalHostName() API和getHostName() API 这些API执行类似的反向查找，并尝试返回与之关联的完全限定域名（FQDN）：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">InetAddress</span> inetAddress <span class="token operator">=</span> <span class="token class-name">InetAddress</span><span class="token punctuation">.</span><span class="token function">getByAddress</span><span class="token punctuation">(</span>ip<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Assert</span><span class="token punctuation">.</span><span class="token function">assertNotNull</span><span class="token punctuation">(</span>inetAddress<span class="token punctuation">.</span><span class="token function">getCanonicalHostName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 返回一个FQDN</span>
<span class="token class-name">Assert</span><span class="token punctuation">.</span><span class="token function">assertNotNull</span><span class="token punctuation">(</span>inetAddress<span class="token punctuation">.</span><span class="token function">getHostName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="5"><li>服务提供者接口（SPI）</li></ol><p>服务提供者接口（SPI）模式是软件开发中使用的一种重要设计模式。这种模式的目的是允许为特定服务提供可插拔的组件和实现。</p><p>它允许开发人员扩展系统的功能，而无需修改服务的任何核心期望，并使用任何实现而不受单一实现的限制。</p><p>5.1. InetAddress中的SPI组件 遵循SPI设计模式，这个JEP提出了一种用自定义解析器替换默认系统解析器的方法。SPI从Java 18开始可用。需要一个服务定位器来定位要使用的提供者。如果服务定位器未能识别任何提供者服务，它将返回到默认实现。</p><p>与任何SPI实现一样，有四个主要组件：</p><ol><li>服务是第一个组件，是一组提供特定功能的接口和类的集合。在我们的情况下，我们处理的是Internet地址解析作为服务</li><li>服务提供者接口是一个接口或抽象类，作为服务的代理。这个接口将其定义的所有操作委托给它的实现。InetAddressResolver接口是我们用例的服务提供者接口，它定义了用于查找主机名和IP地址解析的操作</li><li>第三个组件是服务提供者，它定义了服务提供者接口的具体实现。InetAddressResolverProvider是一个抽象类，其目的是作为许多自定义解析器实现的工厂。我们将通过扩展这个抽象类来定义我们的实现。JVM维护一个单一的系统范围解析器，然后由InetAddress使用，并通常在VM初始化期间设置</li><li>服务加载器组件，最后一个组件，将所有这些联系在一起。ServiceLoader机制将定位一个合格的InetAddressResolverProvider提供者实现，并将其设置为默认的系统范围解析器。如果失败，回退机制将设置默认解析器系统范围</li></ol><p>5.2. InetAddressResolverProvider的自定义实现 通过这个SPI提出的变化在java.net.spi包中可用，并且添加了以下类：</p><ul><li>InetAddressResolverProvider</li><li>InetAddressResolver</li><li>InetAddressResolver.LookupPolicy</li><li>InetAddressResolverProvider.Configuration</li></ul><p>在这一部分，我们将尝试为InetAddressResolver编写自定义解析器实现，以替换系统默认解析器。在编写自定义解析器之前，我们可以定义一个小型实用程序类，该类将从文件加载地址映射的注册表到内存（或缓存）。</p><p>根据注册表条目，我们的自定义地址解析器将能够将地址主机解析为IP，反之亦然。</p><p><strong>首先，我们通过从抽象类InetAddressResolverProvider扩展来定义我们的类CustomAddressResolverImpl。这样做需要我们立即提供两个方法的实现：get(Configuration configuration)和name()。</strong></p><p>我们可以使用name()返回当前实现类的名称或任何其他相关标识符：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Override</span>
<span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">name</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">&quot;CustomInternetAddressResolverImpl&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在让我们实现get()方法。<strong>get()方法返回InetAddressResolver类的实例，我们可以内联定义或单独定义。</strong> 为了简单起见，我们将内联定义。</p><p>InetAddressResolver接口有两个方法：</p><ul><li>Stream<code>&lt;InetAddress&gt;</code> lookupByName(String host, LookupPolicy lookupPolicy) throws UnknownHostException</li><li>String lookupByAddress(byte[] addr) throws UnknownHostException</li></ul><p>我们可以编写任何自定义逻辑来将主机映射到其IP地址（以InetAddress的形式），反之亦然。在这个例子中，让我们的Registry功能来处理相同的：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Override</span>
<span class="token keyword">public</span> <span class="token class-name">InetAddressResolver</span> <span class="token function">get</span><span class="token punctuation">(</span><span class="token class-name">Configuration</span> configuration<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token constant">LOGGER</span><span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;Using Custom Address Resolver :: &quot;</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">name</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token constant">LOGGER</span><span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;Registry initialised&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">InetAddressResolver</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token annotation punctuation">@Override</span>
        <span class="token keyword">public</span> <span class="token class-name">Stream</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">InetAddress</span><span class="token punctuation">&gt;</span></span>\`\`\` <span class="token function">lookupByName</span><span class="token punctuation">(</span><span class="token class-name">String</span> host<span class="token punctuation">,</span> <span class="token class-name">LookupPolicy</span> lookupPolicy<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">UnknownHostException</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> registry<span class="token punctuation">.</span><span class="token function">getAddressesfromHost</span><span class="token punctuation">(</span>host<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token annotation punctuation">@Override</span>
        <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">lookupByAddress</span><span class="token punctuation">(</span><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> addr<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">UnknownHostException</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> registry<span class="token punctuation">.</span><span class="token function">getHostFromAddress</span><span class="token punctuation">(</span>addr<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>5.3. Registry类实现</p><p>对于本文，我们将使用HashMap在内存中存储IP地址和主机名的列表。我们也可以从系统上的文件加载列表。</p><p>该映射的类型是Map<code>&lt;String, List&lt;byte[]&gt;</code>&gt;，其中主机名存储为键，IP地址存储为byte[]的List。这种数据结构允许将多个IP映射到单个主机。我们可以使用这个Map执行正向和反向查找。</p><p><strong>正向查找，在这种情况下，是我们传递主机名作为参数，并期望将其解析为其IP地址，例如，当我们输入www.baeldung.com时：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">Stream</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">InetAddress</span><span class="token punctuation">&gt;</span></span>\`\`\` <span class="token function">getAddressesfromHost</span><span class="token punctuation">(</span><span class="token class-name">String</span> host<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">UnknownHostException</span> <span class="token punctuation">{</span>
    <span class="token constant">LOGGER</span><span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;Performing Forward Lookup for HOST : &quot;</span> <span class="token operator">+</span> host<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>registry<span class="token punctuation">.</span><span class="token function">containsKey</span><span class="token punctuation">(</span>host<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">UnknownHostException</span><span class="token punctuation">(</span><span class="token string">&quot;Missing Host information in Resolver&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> registry<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>host<span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>add <span class="token operator">-&gt;</span> <span class="token function">constructInetAddress</span><span class="token punctuation">(</span>host<span class="token punctuation">,</span> add<span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token class-name">Objects</span><span class="token operator">::</span><span class="token function">nonNull</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>我们应该注意到，响应是InetAddress的Stream，以适应多个IP。</strong></p><p>反向查找的一个例子是我们想要知道与IP地址关联的主机名：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getHostFromAddress</span><span class="token punctuation">(</span><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arr<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">UnknownHostException</span> <span class="token punctuation">{</span>
    <span class="token constant">LOGGER</span><span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;Performing Reverse Lookup for Address : &quot;</span> <span class="token operator">+</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Map<span class="token punctuation">.</span>Entry</span>\`\`<span class="token operator">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">List</span><span class="token operator">&lt;</span><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">&gt;</span>\`\`<span class="token operator">&gt;</span> entry <span class="token operator">:</span> registry<span class="token punctuation">.</span><span class="token function">entrySet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>entry<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">anyMatch</span><span class="token punctuation">(</span>ba <span class="token operator">-&gt;</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>ba<span class="token punctuation">,</span> arr<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> entry<span class="token punctuation">.</span><span class="token function">getKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">UnknownHostException</span><span class="token punctuation">(</span><span class="token string">&quot;Address Not Found&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>最后，ServiceLoader模块加载我们的自定义实现用于InetAddress解析。</strong></p><p>要发现我们的服务提供者，我们在resources/META-INF/services层次结构下创建一个名为java.net.spi.InetAddressResolverProvider的配置。配置文件应保持我们提供者的完全限定路径为com.baeldung.inetspi.providers.CustomAddressResolverImpl.java。</p><p>这指示：用户要求继续翻译未完成的部分。</p><p>指示：用户要求翻译完成后回复&quot;OK&quot;。</p><p>指示：检查翻译是否完成。</p><p>指示：翻译完成。</p><p>OK</p>`,55),o=[p];function c(l,i){return a(),s("div",null,o)}const d=n(e,[["render",c],["__file","2024-06-19-Internet Address Resolution SPI in Java.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/Archive/2024-06-19-Internet%20Address%20Resolution%20SPI%20in%20Java.html","title":"Java中的Internet地址解析服务提供者接口","lang":"zh-CN","frontmatter":{"date":"2024-06-20T00:00:00.000Z","category":["Java","JEP 418"],"tag":["Service Provider Interface","Internet Address Resolution"],"head":[["meta",{"name":"keywords","content":"Java, SPI, InetAddress, DNS, JEP 418"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/2024-06-19-Internet%20Address%20Resolution%20SPI%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中的Internet地址解析服务提供者接口"}],["meta",{"property":"og:description","content":"Java中的Internet地址解析服务提供者接口 在本教程中，我们将讨论Java的JEP 418，它为Internet主机和地址解析建立了一个新的服务提供者接口（SPI）。 任何连接到计算机网络的设备都被分配一个数值或IP（Internet协议）地址。IP地址有助于唯一地识别网络上的设备，并且它们也有助于路由数据包到设备和从设备。 它们通常有两种类型..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Service Provider Interface"}],["meta",{"property":"article:tag","content":"Internet Address Resolution"}],["meta",{"property":"article:published_time","content":"2024-06-20T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中的Internet地址解析服务提供者接口\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-20T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中的Internet地址解析服务提供者接口 在本教程中，我们将讨论Java的JEP 418，它为Internet主机和地址解析建立了一个新的服务提供者接口（SPI）。 任何连接到计算机网络的设备都被分配一个数值或IP（Internet协议）地址。IP地址有助于唯一地识别网络上的设备，并且它们也有助于路由数据包到设备和从设备。 它们通常有两种类型..."},"headers":[],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":7.23,"words":2169},"filePathRelative":"posts/baeldung/Archive/2024-06-19-Internet Address Resolution SPI in Java.md","localizedDate":"2024年6月20日","excerpt":"\\n<p>在本教程中，我们将讨论Java的JEP 418，它为Internet主机和地址解析建立了一个新的服务提供者接口（SPI）。</p>\\n<p>任何连接到计算机网络的设备都被分配一个数值或IP（Internet协议）地址。IP地址有助于唯一地识别网络上的设备，并且它们也有助于路由数据包到设备和从设备。</p>\\n<p>它们通常有两种类型。IPv4是IP标准的第四代，是一个32位地址。由于互联网的快速增长，还发布了一个更大的新的v6版本的IP标准，其中包含十六进制字符。</p>\\n<p>此外，还有另一种相关的地址类型。网络设备，如以太网端口或网络接口卡（NIC），具有MAC（媒体访问控制）地址。这些是全球分布的，所有网络接口设备都可以用MAC地址唯一地识别。</p>","autoDesc":true}');export{d as comp,k as data};
