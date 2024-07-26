import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as a,a as n}from"./app-C4eFoh0f.js";const r={},i=n(`<h1 id="使用java获取当前机器的ip地址" tabindex="-1"><a class="header-anchor" href="#使用java获取当前机器的ip地址"><span>使用Java获取当前机器的IP地址</span></a></h1><p>IP地址或互联网协议地址是唯一标识互联网上的一个设备。因此，了解运行我们应用程序的设备的身份是某些应用程序的关键部分。</p><p>在本教程中，我们将探讨使用Java检索计算机IP地址的各种方法。</p><h2 id="_1-查找本地ip地址" tabindex="-1"><a class="header-anchor" href="#_1-查找本地ip地址"><span>1. 查找本地IP地址</span></a></h2><p>首先，让我们看看获取当前机器的本地IPv4地址的一些方法。</p><h3 id="_1-1-使用java-net库获取本地地址" tabindex="-1"><a class="header-anchor" href="#_1-1-使用java-net库获取本地地址"><span>1.1 使用Java Net库获取本地地址</span></a></h3><p>这种方法使用Java Net库来建立一个UDP连接：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>try (final DatagramSocket datagramSocket = new DatagramSocket()) {
    datagramSocket.connect(InetAddress.getByName(&quot;8.8.8.8&quot;), 12345);
    return datagramSocket.getLocalAddress().getHostAddress();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，为了简单起见，我们使用Google的主要DNS作为我们的目的地主机，并提供IP地址_8.8.8.8_。Java Net库此时仅检查地址格式的有效性，因此地址本身可能是不可达的。此外，我们使用随机端口_12345_来创建与_socket.connect()_方法的UDP连接。在幕后，它设置了发送和接收数据所需的所有变量，包括机器的本地地址，而实际上并没有向目标主机发送任何请求。</p><p>虽然这个解决方案在Linux和Windows机器上运行得非常好，但在macOS上却有问题，并没有返回预期的IP地址。</p><h3 id="_1-2-使用socket连接获取本地地址" tabindex="-1"><a class="header-anchor" href="#_1-2-使用socket连接获取本地地址"><span>1.2 使用Socket连接获取本地地址</span></a></h3><p>或者，我们可以通过可靠的互联网连接使用<strong>套接字连接来查找IP地址</strong>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>try (Socket socket = new Socket()) {
    socket.connect(new InetSocketAddress(&quot;google.com&quot;, 80));
    return socket.getLocalAddress().getHostAddress();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，同样为了简单起见，我们使用_google.com_在端口_80_上进行连接以获取主机地址。只要它是可达的，我们可以使用任何其他URL来创建套接字连接。</p><h3 id="_1-3-复杂网络情况下的注意事项" tabindex="-1"><a class="header-anchor" href="#_1-3-复杂网络情况下的注意事项"><span>1.3 复杂网络情况下的注意事项</span></a></h3><p>上面列出的方法在简单的网络情况下运行得非常好。然而，在机器具有更多网络接口的情况下，行为可能不那么可预测。</p><p>换句话说，**从上述函数返回的IP地址将是机器上首选网络接口的地址。因此，它可能与我们预期的一个不同。**对于特定需求，我们可以找到连接到服务器的客户端的IP地址。</p><h2 id="_2-查找公共ip地址" tabindex="-1"><a class="header-anchor" href="#_2-查找公共ip地址"><span>2. 查找公共IP地址</span></a></h2><p>与本地IP地址类似，我们可能想要知道当前机器的公共IP地址。**公共IP地址是一个从互联网可达的IPv4地址。**此外，它可能不会唯一地标识查找地址的机器。例如，同一路由器下的多个主机具有相同的公共IP地址。</p><p>简单地说，我们可以连接到Amazon AWS <em>checkip.amazonaws.com</em> URL并读取响应：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>String urlString = &quot;http://checkip.amazonaws.com/&quot;;
URL url = new URL(urlString);
try (BufferedReader br = new BufferedReader(new InputStreamReader(url.openStream()))) {
    return br.readLine();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这在大多数时候都运行得很好。然而，我们明确依赖于一个外部来源，其可靠性不能得到保证。因此，作为备选方案，我们可以使用以下任何URL来检索公共IP地址：</p><ul><li><em>https://ipv4.icanhazip.com/</em></li><li><em>http://myexternalip.com/raw</em></li><li><em>http://ipecho.net/plain</em></li></ul><h2 id="_3-结论" tabindex="-1"><a class="header-anchor" href="#_3-结论"><span>3. 结论</span></a></h2><p>在本文中，我们学习了如何查找当前机器的IP地址以及如何使用Java检索它们。我们还查看了检查本地和公共IP地址的各种方法。</p><p>并且一如既往，示例的源代码可以在GitHub上找到。</p>`,26),s=[i];function d(o,l){return a(),t("div",null,s)}const m=e(r,[["render",d],["__file","2024-07-19-Get the IP Address of the Current Machine Using Java.html.vue"]]),h=JSON.parse('{"path":"/posts/baeldung/2024-07-19/2024-07-19-Get%20the%20IP%20Address%20of%20the%20Current%20Machine%20Using%20Java.html","title":"使用Java获取当前机器的IP地址","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Networking"],"tag":["IP Address","Java"],"head":[["meta",{"name":"keywords","content":"Java, IP Address, Network Programming"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-19/2024-07-19-Get%20the%20IP%20Address%20of%20the%20Current%20Machine%20Using%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用Java获取当前机器的IP地址"}],["meta",{"property":"og:description","content":"使用Java获取当前机器的IP地址 IP地址或互联网协议地址是唯一标识互联网上的一个设备。因此，了解运行我们应用程序的设备的身份是某些应用程序的关键部分。 在本教程中，我们将探讨使用Java检索计算机IP地址的各种方法。 1. 查找本地IP地址 首先，让我们看看获取当前机器的本地IPv4地址的一些方法。 1.1 使用Java Net库获取本地地址 这种..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-19T13:20:53.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"IP Address"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-19T13:20:53.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用Java获取当前机器的IP地址\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-19T13:20:53.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用Java获取当前机器的IP地址 IP地址或互联网协议地址是唯一标识互联网上的一个设备。因此，了解运行我们应用程序的设备的身份是某些应用程序的关键部分。 在本教程中，我们将探讨使用Java检索计算机IP地址的各种方法。 1. 查找本地IP地址 首先，让我们看看获取当前机器的本地IPv4地址的一些方法。 1.1 使用Java Net库获取本地地址 这种..."},"headers":[{"level":2,"title":"1. 查找本地IP地址","slug":"_1-查找本地ip地址","link":"#_1-查找本地ip地址","children":[{"level":3,"title":"1.1 使用Java Net库获取本地地址","slug":"_1-1-使用java-net库获取本地地址","link":"#_1-1-使用java-net库获取本地地址","children":[]},{"level":3,"title":"1.2 使用Socket连接获取本地地址","slug":"_1-2-使用socket连接获取本地地址","link":"#_1-2-使用socket连接获取本地地址","children":[]},{"level":3,"title":"1.3 复杂网络情况下的注意事项","slug":"_1-3-复杂网络情况下的注意事项","link":"#_1-3-复杂网络情况下的注意事项","children":[]}]},{"level":2,"title":"2. 查找公共IP地址","slug":"_2-查找公共ip地址","link":"#_2-查找公共ip地址","children":[]},{"level":2,"title":"3. 结论","slug":"_3-结论","link":"#_3-结论","children":[]}],"git":{"createdTime":1721395253000,"updatedTime":1721395253000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.96,"words":887},"filePathRelative":"posts/baeldung/2024-07-19/2024-07-19-Get the IP Address of the Current Machine Using Java.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>IP地址或互联网协议地址是唯一标识互联网上的一个设备。因此，了解运行我们应用程序的设备的身份是某些应用程序的关键部分。</p>\\n<p>在本教程中，我们将探讨使用Java检索计算机IP地址的各种方法。</p>\\n<h2>1. 查找本地IP地址</h2>\\n<p>首先，让我们看看获取当前机器的本地IPv4地址的一些方法。</p>\\n<h3>1.1 使用Java Net库获取本地地址</h3>\\n<p>这种方法使用Java Net库来建立一个UDP连接：</p>\\n<div class=\\"language-text\\" data-ext=\\"text\\" data-title=\\"text\\"><pre class=\\"language-text\\"><code>try (final DatagramSocket datagramSocket = new DatagramSocket()) {\\n    datagramSocket.connect(InetAddress.getByName(\\"8.8.8.8\\"), 12345);\\n    return datagramSocket.getLocalAddress().getHostAddress();\\n}\\n</code></pre></div>","autoDesc":true}');export{m as comp,h as data};
