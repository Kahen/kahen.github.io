import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-CbPcg273.js";const e={},p=t(`<h1 id="理解java中的java-net-socketexception-broken-pipe-错误" tabindex="-1"><a class="header-anchor" href="#理解java中的java-net-socketexception-broken-pipe-错误"><span>理解Java中的java.net.SocketException：&quot;Broken Pipe&quot;错误</span></a></h1><p>在本教程中，我们将仔细研究Java中的“java.net.SocketException: &#39;Broken Pipe&#39;”错误。首先，我们将展示如何重现这个异常。接下来，我们将理解这个异常的主要原因，然后我们将看到如何修复它。</p><h2 id="_2-实例演示" tabindex="-1"><a class="header-anchor" href="#_2-实例演示"><span>2. 实例演示</span></a></h2><p>现在，让我们看一个生成错误“java.net.SocketException: &#39;Broken Pipe&#39;”的示例。</p><p>简单来说，当一个设备尝试从一个已经死亡或连接已经被断开的另一个设备读取或写入数据时，通常会发生管道破裂。</p><p>由于连接已关闭，必须建立一个新的连接才能继续传输数据。否则，数据传输将停止。</p><h3 id="_2-1-设置客户端和服务器" tabindex="-1"><a class="header-anchor" href="#_2-1-设置客户端和服务器"><span>2.1. 设置客户端和服务器</span></a></h3><p>为了在本地模拟这种情况，我们将使用一个作为我们web服务器的_Server_类和一个作为我们客户端机器的_Client_类。</p><p>一旦我们关闭服务器套接字，连接到该套接字的客户端仍然发送消息并接收到错误消息。</p><p>如果服务器向客户端发送了一些响应，而客户端在此期间丢失了连接，也会发生这种情况。</p><p>首先，让我们创建一个名为_Server_的服务器类，监听端口_1234_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Server</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token class-name">ServerSocket</span> serverSocket <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ServerSocket</span><span class="token punctuation">(</span><span class="token number">1234</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;服务器正在端口1234上监听...&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            
            <span class="token class-name">Socket</span> clientSocket <span class="token operator">=</span> serverSocket<span class="token punctuation">.</span><span class="token function">accept</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;客户端已连接: &quot;</span> <span class="token operator">+</span> clientSocket<span class="token punctuation">.</span><span class="token function">getInetAddress</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 为从客户端读取添加一些延迟</span>
            <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">2000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">InputStream</span> in <span class="token operator">=</span> clientSocket<span class="token punctuation">.</span><span class="token function">getInputStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;从客户端读取:&quot;</span> <span class="token operator">+</span> in<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            in<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            clientSocket<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            serverSocket<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IOException</span> <span class="token operator">|</span> <span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其次，让我们创建一个客户端_Client_并将其附加到端口_1234_的套接字：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Client</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token class-name">Socket</span> socket <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Socket</span><span class="token punctuation">(</span><span class="token string">&quot;localhost&quot;</span><span class="token punctuation">,</span> <span class="token number">1234</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">OutputStream</span> outputStream <span class="token operator">=</span> socket<span class="token punctuation">.</span><span class="token function">getOutputStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            outputStream<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span><span class="token string">&quot;HELLO&quot;</span><span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;正在写入服务器..&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 这里我们再次写入。</span>
            outputStream<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span><span class="token string">&quot;HI&quot;</span><span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;再次写入服务器..&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;关闭客户端.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            outputStream<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            socket<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IOException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们向服务器发送了一些消息，服务器读取并打印了这些消息。一旦我们运行服务器并启动客户端，在服务器关闭套接字之前发送数据，我们不会看到任何错误：</p><div class="language-plaintext line-numbers-mode" data-ext="plaintext" data-title="plaintext"><pre class="language-plaintext"><code>// 服务器控制台
服务器正在端口12345上监听...
客户端已连接: /127.0.0.1
从客户端读取：66

// 客户端控制台
正在写入服务器..
再次写入服务器..
关闭客户端.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-重现broken-pipe错误" tabindex="-1"><a class="header-anchor" href="#_2-2-重现broken-pipe错误"><span>2.2. 重现Broken Pipe错误</span></a></h3><p>为了得到这个错误，让我们延迟发送客户端的下一条消息，直到服务器已经关闭了连接：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Client</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token class-name">Socket</span> socket <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Socket</span><span class="token punctuation">(</span><span class="token string">&quot;localhost&quot;</span><span class="token punctuation">,</span> <span class="token number">1234</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">OutputStream</span> outputStream <span class="token operator">=</span> socket<span class="token punctuation">.</span><span class="token function">getOutputStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            outputStream<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span><span class="token string">&quot;HELLO&quot;</span><span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;正在写入服务器..&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 模拟在写入套接字后的延迟</span>
            <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">3000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            outputStream<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span><span class="token string">&quot;HI&quot;</span><span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;再次写入服务器..&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;关闭客户端.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            outputStream<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            socket<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IOException</span> <span class="token operator">|</span> <span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们再次运行它，看看服务器套接字已关闭，如果客户端发送消息，它将返回broken pipe错误：</p><div class="language-plaintext line-numbers-mode" data-ext="plaintext" data-title="plaintext"><pre class="language-plaintext"><code>// 服务器控制台
服务器正在端口12345上监听...
客户端已连接: /127.0.0.1
从客户端读取：66

// 客户端控制台
正在写入服务器..
java.net.SocketException: Broken pipe (Write failed)
    at java.net.SocketOutputStream.socketWrite0(Native Method)
    at java.net.SocketOutputStream.socketWrite(SocketOutputStream.java:111)
    at java.net.SocketOutputStream.write(SocketOutputStream.java:143)
    at com.baeldung.socketexception.brokenpipe.Client.main(Client.java:18)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-原因" tabindex="-1"><a class="header-anchor" href="#_3-原因"><span>3. 原因</span></a></h2><p>这个错误一个例子是<strong>当一个客户端程序，比如一个浏览器窗口，在完全从服务器读取数据之前崩溃或终止。如果连接被关闭，客户端在此后尝试向服务器写入数据将导致一个‘Broken pipe’错误。</strong></p><p>当涉及到网络套接字时，如果网络电缆被拔出或另一端的进程不工作，这种情况可能会发生。在这种情况下，连接可能被意外终止，或者网络可能正在经历问题。</p><p>就Java而言，并没有特定的_BrokenPipeException_。这个错误通常与其他错误捆绑在一起，比如_SocketException_和_IOException_。</p><p>客户端丢失连接可能有几种原因，包括在服务器响应之前关闭浏览器，服务器过载，或响应时间过长。</p><h2 id="_4-解决方案" tabindex="-1"><a class="header-anchor" href="#_4-解决方案"><span>4. 解决方案</span></a></h2><p>没有保证客户端/服务器总是会等待优雅的连接关闭。然而，仍然可以以有效的方式处理broken pipe错误。</p><p><strong>始终建议确保客户端和服务器适当地处理套接字连接，并优雅地关闭流和套接字，以便管理Java的“Broken pipe”错误。</strong></p><p>我们还必须有效地管理超时并快速响应。</p><p>同样，没有通用的修复方法。我们需要确定潜在问题并适当地解决它。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们学习了Java的“java.net.SocketException Broken pipe”错误。然后，我们讨论了如何产生这个错误并理解了异常的原因。最后，我们查看了处理错误的可能方法。</p><p>像往常一样，本文的示例代码可在GitHub上找到。</p>`,34),o=[p];function c(i,l){return a(),s("div",null,o)}const r=n(e,[["render",c],["__file","2024-07-02-Understanding the java.net.SocketException Broken Pipe Error.html.vue"]]),d=JSON.parse(`{"path":"/posts/baeldung/2024-07-02/2024-07-02-Understanding%20the%20java.net.SocketException%20Broken%20Pipe%20Error.html","title":"理解Java中的java.net.SocketException：\\"Broken Pipe\\"错误","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Networking"],"tag":["SocketException","Broken Pipe"],"head":[["meta",{"name":"keywords","content":"Java, SocketException, Broken Pipe, Networking, Error Handling"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-02/2024-07-02-Understanding%20the%20java.net.SocketException%20Broken%20Pipe%20Error.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"理解Java中的java.net.SocketException：\\"Broken Pipe\\"错误"}],["meta",{"property":"og:description","content":"理解Java中的java.net.SocketException：\\"Broken Pipe\\"错误 在本教程中，我们将仔细研究Java中的“java.net.SocketException: 'Broken Pipe'”错误。首先，我们将展示如何重现这个异常。接下来，我们将理解这个异常的主要原因，然后我们将看到如何修复它。 2. 实例演示 现在，让我们看..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-02T10:36:25.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"SocketException"}],["meta",{"property":"article:tag","content":"Broken Pipe"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-02T10:36:25.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"理解Java中的java.net.SocketException：\\\\\\"Broken Pipe\\\\\\"错误\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-02T10:36:25.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"理解Java中的java.net.SocketException：\\"Broken Pipe\\"错误 在本教程中，我们将仔细研究Java中的“java.net.SocketException: 'Broken Pipe'”错误。首先，我们将展示如何重现这个异常。接下来，我们将理解这个异常的主要原因，然后我们将看到如何修复它。 2. 实例演示 现在，让我们看..."},"headers":[{"level":2,"title":"2. 实例演示","slug":"_2-实例演示","link":"#_2-实例演示","children":[{"level":3,"title":"2.1. 设置客户端和服务器","slug":"_2-1-设置客户端和服务器","link":"#_2-1-设置客户端和服务器","children":[]},{"level":3,"title":"2.2. 重现Broken Pipe错误","slug":"_2-2-重现broken-pipe错误","link":"#_2-2-重现broken-pipe错误","children":[]}]},{"level":2,"title":"3. 原因","slug":"_3-原因","link":"#_3-原因","children":[]},{"level":2,"title":"4. 解决方案","slug":"_4-解决方案","link":"#_4-解决方案","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1719916585000,"updatedTime":1719916585000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.34,"words":1303},"filePathRelative":"posts/baeldung/2024-07-02/2024-07-02-Understanding the java.net.SocketException Broken Pipe Error.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在本教程中，我们将仔细研究Java中的“java.net.SocketException: 'Broken Pipe'”错误。首先，我们将展示如何重现这个异常。接下来，我们将理解这个异常的主要原因，然后我们将看到如何修复它。</p>\\n<h2>2. 实例演示</h2>\\n<p>现在，让我们看一个生成错误“java.net.SocketException: 'Broken Pipe'”的示例。</p>\\n<p>简单来说，当一个设备尝试从一个已经死亡或连接已经被断开的另一个设备读取或写入数据时，通常会发生管道破裂。</p>\\n<p>由于连接已关闭，必须建立一个新的连接才能继续传输数据。否则，数据传输将停止。</p>","autoDesc":true}`);export{r as comp,d as data};
