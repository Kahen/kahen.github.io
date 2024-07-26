import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-C4eFoh0f.js";const e={},p=t('<hr><h1 id="unix域套接字在java-16-baeldung" tabindex="-1"><a class="header-anchor" href="#unix域套接字在java-16-baeldung"><span>Unix域套接字在Java 16 | Baeldung</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>在本教程中，我们将学习Unix域套接字通道。</p><p>我们将涵盖一些理论基础、优缺点，并构建一个简单的Java客户端-服务器应用程序，该应用程序使用Unix域套接字通道交换文本消息。</p><p>我们还将看看如何使用Unix域套接字连接数据库。</p><h2 id="_2-unix域套接字通道" tabindex="-1"><a class="header-anchor" href="#_2-unix域套接字通道"><span>2. Unix域套接字通道</span></a></h2><p>传统的进程间通信涉及由IP地址和端口号定义的TCP/IP套接字。它们用于互联网或私有网络上的网络通信。</p><p>另一方面，Unix域套接字仅限于同一物理主机上的进程之间的通信。它们在Unix操作系统中已经存在了几十年，但最近才被添加到Microsoft Windows中。因此，它们不再仅限于Unix系统。</p><p>Unix域套接字由文件系统路径名寻址，看起来与其他文件名非常相似，例如 <em>/folder/socket</em> 或 <em>C:\\folder\\socket</em>。与TCP/IP连接相比，它们具有更快的设置时间、更高的数据吞吐量，并且在接受远程连接时没有安全风险。另一方面，最大的缺点是仅限于单个物理主机。</p><p>请注意，我们甚至可以使用Unix域套接字在同一系统上的容器之间进行通信，只要我们在共享卷上创建套接字即可。</p><h2 id="_3-套接字配置" tabindex="-1"><a class="header-anchor" href="#_3-套接字配置"><span>3. 套接字配置</span></a></h2><p>正如我们之前了解到的，Unix域套接字基于文件系统路径名，因此首先，我们需要为我们的套接字文件定义一个路径，并将其转换为_UnixDomainSocketAddress_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Path</span> socketPath <span class="token operator">=</span> <span class="token class-name">Path</span>\n  <span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">getProperty</span><span class="token punctuation">(</span><span class="token string">&quot;user.home&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&quot;baeldung.socket&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">UnixDomainSocketAddress</span> socketAddress <span class="token operator">=</span> <span class="token class-name">UnixDomainSocketAddress</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span>socketPath<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在我们的示例中，我们在用户的主目录下创建了名为_baeldung.socket_的套接字文件。</p><p>我们需要记住的一件事是在服务器每次关闭后删除套接字文件：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Files</span><span class="token punctuation">.</span><span class="token function">deleteIfExists</span><span class="token punctuation">(</span>socketPath<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>不幸的是，它不会自动删除，我们无法在进一步的连接中重用它。任何尝试重用相同路径的尝试最终都会以异常结束，提示该地址已经被使用：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name"><span class="token namespace">java<span class="token punctuation">.</span>net<span class="token punctuation">.</span></span>BindException</span><span class="token operator">:</span> <span class="token class-name">Address</span> already in use\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_4-接收消息" tabindex="-1"><a class="header-anchor" href="#_4-接收消息"><span>4. 接收消息</span></a></h2><p>接下来我们可以做的是启动一个服务器，该服务器将从套接字通道接收消息。</p><p>首先，我们应该使用Unix协议创建一个服务器套接字通道：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">ServerSocketChannel</span> serverChannel <span class="token operator">=</span> <span class="token class-name">ServerSocketChannel</span>\n  <span class="token punctuation">.</span><span class="token keyword">open</span><span class="token punctuation">(</span><span class="token class-name">StandardProtocolFamily</span><span class="token punctuation">.</span><span class="token constant">UNIX</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>进一步，我们需要将其与我们之前创建的套接字地址绑定：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>serverChannel<span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span>socketAddress<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>现在我们可以等待第一个客户端连接：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">SocketChannel</span> channel <span class="token operator">=</span> serverChannel<span class="token punctuation">.</span><span class="token function">accept</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>当客户端连接时，消息将以字节缓冲区的形式传来。为了读取这些消息，我们需要构建一个无限循环，处理输入并将每条消息打印到控制台：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token function">readSocketMessage</span><span class="token punctuation">(</span>channel<span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">ifPresent</span><span class="token punctuation">(</span>message <span class="token operator">-&gt;</span> <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;[Client message] %s&quot;</span><span class="token punctuation">,</span> message<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的示例中，<em>readSocketMessage_方法负责将套接字通道缓冲区转换为_String</em>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token class-name">Optional</span>`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>` <span class="token function">readSocketMessage</span><span class="token punctuation">(</span><span class="token class-name">SocketChannel</span> channel<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>\n    <span class="token class-name">ByteBuffer</span> buffer <span class="token operator">=</span> <span class="token class-name">ByteBuffer</span><span class="token punctuation">.</span><span class="token function">allocate</span><span class="token punctuation">(</span><span class="token number">1024</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">int</span> bytesRead <span class="token operator">=</span> channel<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span>buffer<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>bytesRead `<span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span>\n        <span class="token keyword">return</span> <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">empty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> bytes <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">byte</span><span class="token punctuation">[</span>bytesRead<span class="token punctuation">]</span><span class="token punctuation">;</span>\n    buffer<span class="token punctuation">.</span><span class="token function">flip</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    buffer<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>bytes<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">String</span> message <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span>bytes<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">return</span> <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span>message<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们需要记住的是，服务器需要在客户端之前启动。正如我们的示例中，它只能接受单个客户端连接。</p><h2 id="_5-发送消息" tabindex="-1"><a class="header-anchor" href="#_5-发送消息"><span>5. 发送消息</span></a></h2><p>发送消息比接收消息要简单一些。</p><p>我们需要设置的唯一事情是一个Unix协议的套接字通道，并将其连接到我们的套接字地址：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">SocketChannel</span> channel <span class="token operator">=</span> <span class="token class-name">SocketChannel</span>\n  <span class="token punctuation">.</span><span class="token keyword">open</span><span class="token punctuation">(</span><span class="token class-name">StandardProtocolFamily</span><span class="token punctuation">.</span><span class="token constant">UNIX</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nchannel<span class="token punctuation">.</span><span class="token function">connect</span><span class="token punctuation">(</span>socketAddress<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在我们可以准备一条文本消息：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> message <span class="token operator">=</span> <span class="token string">&quot;Hello from Baeldung Unix domain socket article&quot;</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>将其转换为字节缓冲区：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">ByteBuffer</span> buffer <span class="token operator">=</span> <span class="token class-name">ByteBuffer</span><span class="token punctuation">.</span><span class="token function">allocate</span><span class="token punctuation">(</span><span class="token number">1024</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nbuffer<span class="token punctuation">.</span><span class="token function">clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nbuffer<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>message<span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nbuffer<span class="token punctuation">.</span><span class="token function">flip</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>并将所有数据写入我们的套接字：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">while</span> <span class="token punctuation">(</span>buffer<span class="token punctuation">.</span><span class="token function">hasRemaining</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    channel<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>buffer<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，以下输出将出现在服务器日志中：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token punctuation">[</span><span class="token class-name">Client</span> message<span class="token punctuation">]</span> <span class="token class-name">Hello</span> from <span class="token class-name">Baeldung</span> <span class="token class-name">Unix</span> domain socket article<span class="token operator">!</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_6-连接到数据库" tabindex="-1"><a class="header-anchor" href="#_6-连接到数据库"><span>6. 连接到数据库</span></a></h2><p>Unix域套接字可用于连接数据库。许多流行的发行版如MongoDB或PostgreSQL都带有默认配置，可以直接使用。</p><p>例如，MongoDB在_/tmp/mongodb-27017.sock_创建了一个Unix域套接字，我们可以直接在_MongoClient_配置中使用：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">MongoClient</span> mongoClient <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MongoClient</span><span class="token punctuation">(</span><span class="token string">&quot;/tmp/mongodb-27017.sock&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>一个要求是将_jnr.unixsocket_依赖项添加到我们的项目中：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>``com.github.jnr``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>``jnr-unixsocket``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>``0.38.13``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>``\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>另一方面，PostgreSQL允许我们使用JDBC标准使用Unix域套接字。因此，我们只需要在创建连接时提供额外的_socketFactory_参数：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> dbUrl <span class="token operator">=</span> <span class="token string">&quot;jdbc:postgresql://databaseName?socketFactory=org.newsclub.net.unix.AFUNIXSocketFactory$FactoryArg&amp;socketFactoryArg=/var/run/postgresql/.s.PGSQL.5432&quot;</span><span class="token punctuation">;</span>\n<span class="token class-name">Connection</span> connection <span class="token operator">=</span> <span class="token class-name">DriverManager</span>\n  <span class="token punctuation">.</span><span class="token function">getConnection</span><span class="token punctuation">(</span>dbUrl<span class="token punctuation">,</span> <span class="token string">&quot;dbUsername&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;dbPassword&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>_socketFactory_参数应指向扩展_java.net.SocketFactory_的类。这个类将负责创建Unix域套接字而不是TCP/IP套接字。</p><p>在我们的示例中，我们使用了_junixsocket_库中的_AFUNIXSocketFactory_类：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>`\n  ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>``com.kohlschutter.junixsocket``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>``\n  ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>``junixsocket-core``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>``\n  ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>``2.4.0``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>``\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_7-总结" tabindex="-1"><a class="header-anchor" href="#_7-总结"><span>7. 总结</span></a></h2><p>在本教程中，我们学习了如何使用Unix域套接字通道。我们涵盖了使用Unix域套接字发送和接收消息，以及如何使用Unix域套接字连接数据库。如常，所有源代码都可以在GitHub上找到。</p>',57),c=[p];function o(l,i){return s(),a("div",null,c)}const r=n(e,[["render",o],["__file","2024-07-23-Unix Domain Socket in Java 16.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-23/2024-07-23-Unix%20Domain%20Socket%20in%20Java%2016.html","title":"Unix域套接字在Java 16 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Socket"],"tag":["Unix Domain Socket","Java 16"],"head":[["meta",{"name":"keywords","content":"Unix Domain Socket, Java 16, Java Socket Programming"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-23/2024-07-23-Unix%20Domain%20Socket%20in%20Java%2016.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Unix域套接字在Java 16 | Baeldung"}],["meta",{"property":"og:description","content":"Unix域套接字在Java 16 | Baeldung 1. 引言 在本教程中，我们将学习Unix域套接字通道。 我们将涵盖一些理论基础、优缺点，并构建一个简单的Java客户端-服务器应用程序，该应用程序使用Unix域套接字通道交换文本消息。 我们还将看看如何使用Unix域套接字连接数据库。 2. Unix域套接字通道 传统的进程间通信涉及由IP地址和..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-23T20:50:21.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Unix Domain Socket"}],["meta",{"property":"article:tag","content":"Java 16"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-23T20:50:21.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Unix域套接字在Java 16 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-23T20:50:21.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Unix域套接字在Java 16 | Baeldung 1. 引言 在本教程中，我们将学习Unix域套接字通道。 我们将涵盖一些理论基础、优缺点，并构建一个简单的Java客户端-服务器应用程序，该应用程序使用Unix域套接字通道交换文本消息。 我们还将看看如何使用Unix域套接字连接数据库。 2. Unix域套接字通道 传统的进程间通信涉及由IP地址和..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. Unix域套接字通道","slug":"_2-unix域套接字通道","link":"#_2-unix域套接字通道","children":[]},{"level":2,"title":"3. 套接字配置","slug":"_3-套接字配置","link":"#_3-套接字配置","children":[]},{"level":2,"title":"4. 接收消息","slug":"_4-接收消息","link":"#_4-接收消息","children":[]},{"level":2,"title":"5. 发送消息","slug":"_5-发送消息","link":"#_5-发送消息","children":[]},{"level":2,"title":"6. 连接到数据库","slug":"_6-连接到数据库","link":"#_6-连接到数据库","children":[]},{"level":2,"title":"7. 总结","slug":"_7-总结","link":"#_7-总结","children":[]}],"git":{"createdTime":1721767821000,"updatedTime":1721767821000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.44,"words":1333},"filePathRelative":"posts/baeldung/2024-07-23/2024-07-23-Unix Domain Socket in Java 16.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>Unix域套接字在Java 16 | Baeldung</h1>\\n<h2>1. 引言</h2>\\n<p>在本教程中，我们将学习Unix域套接字通道。</p>\\n<p>我们将涵盖一些理论基础、优缺点，并构建一个简单的Java客户端-服务器应用程序，该应用程序使用Unix域套接字通道交换文本消息。</p>\\n<p>我们还将看看如何使用Unix域套接字连接数据库。</p>\\n<h2>2. Unix域套接字通道</h2>\\n<p>传统的进程间通信涉及由IP地址和端口号定义的TCP/IP套接字。它们用于互联网或私有网络上的网络通信。</p>\\n<p>另一方面，Unix域套接字仅限于同一物理主机上的进程之间的通信。它们在Unix操作系统中已经存在了几十年，但最近才被添加到Microsoft Windows中。因此，它们不再仅限于Unix系统。</p>","autoDesc":true}');export{r as comp,k as data};
