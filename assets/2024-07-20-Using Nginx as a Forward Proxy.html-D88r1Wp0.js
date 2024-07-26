import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as e,a}from"./app-DpYLEM_u.js";const t={},i=a(`<h1 id="nginx-作为正向代理的配置和使用教程" tabindex="-1"><a class="header-anchor" href="#nginx-作为正向代理的配置和使用教程"><span>Nginx 作为正向代理的配置和使用教程</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span><strong>1.</strong> 引言</span></a></h2><p>当谈到 Nginx，它是目前最受欢迎的服务器之一。它快速、轻量级，并且负责托管一些互联网上最大的网站。Nginx 通常被用作负载均衡器、反向代理和 HTTP 缓存等。</p><p><strong>本教程将重点介绍如何将其用作请求位置的正向代理。</strong></p><h2 id="_2-使用正向代理的动机" tabindex="-1"><a class="header-anchor" href="#_2-使用正向代理的动机"><span><strong>2.</strong> 使用正向代理的动机</span></a></h2><p>代理服务器是作为客户端和请求资源的主机之间的中间人实体。这意味着流量需要通过额外的机器才能到达目的地（主机服务器）。代理代表客户端继续请求，所以当主机服务器接受请求时，他们只能看到代理的 IP。相比之下，反向代理直接位于网络前面，将来自客户端的请求路由到正确的 Web 服务器（在多个服务器的网络中）。</p><p>使用正向代理的唯一缺点是它们在应用层工作，因此我们必须为每个计划路由流量的应用程序设置代理。</p><p><strong>使用正向代理的一些用例包括：</strong></p><ul><li>隐藏 IP 和位置以获得访问位置限制的服务</li><li>对于需要连接互联网上特定资源的隔离内部网络</li><li>为了节省资源，对特定服务器的请求进行缓存，以获取很少变化的内容</li></ul><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/04/Forward-Proxy-01-1024x512.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>值得注意的是，<strong>代理不加密流量，而 VPN 通过安全和加密的隧道重定向流量</strong>。</p><h2 id="_3-使用-nginx-实现正向代理" tabindex="-1"><a class="header-anchor" href="#_3-使用-nginx-实现正向代理"><span><strong>3.</strong> 使用 Nginx 实现正向代理</span></a></h2><p>为了实现转发代理，我们将使用一台安装了 Nginx 的 Linux 机器。为了本教程的目的，我们将使用 VirtualBox 与一个正在运行的 Linux 发行版服务器以及安装的 Nginx，但您可以使用任何更方便的方法，如 Docker 或者角落里多年未用的旧 PC。</p><p>首先，我们找到默认的 <em>Nginx</em> 配置文件，并注释掉 <em>server</em> 部分以将其保存为归档副本。通常，我们可以在 <em>/etc/nginx/sites-enabled/default</em> 中找到它：</p><div class="language-nginx line-numbers-mode" data-ext="nginx" data-title="nginx"><pre class="language-nginx"><code><span class="token comment"># 默认服务器配置</span>
<span class="token comment">#server {</span>
    <span class="token comment">#listen 80 default_server;</span>
    <span class="token comment">#listen [::]:80 default_server;</span>

    <span class="token comment">#root /var/www/html;</span>

    <span class="token comment">#如果你使用 PHP，请将 index.php 添加到列表中</span>
    <span class="token comment">#index index.html index.htm index.nginx-debian.html;</span>

    <span class="token comment">#server_name _;</span>

    <span class="token comment">#location / {</span>
        <span class="token comment">#首先尝试作为文件提供请求，然后</span>
        <span class="token comment">#作为目录，然后回退到显示 404。</span>
        <span class="token comment">#try_files $uri $uri/ =404;</span>
    <span class="token comment">#}</span>
<span class="token comment">#}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们<strong>创建一个名为 <em>forward</em> 的新文件，并添加所有必要的配置，将 Nginx 变成一个工作的正向代理</strong>：</p><div class="language-nginx line-numbers-mode" data-ext="nginx" data-title="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">listen</span> <span class="token number">8888</span></span><span class="token punctuation">;</span>

    <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">resolver</span> 8.8.8.8</span><span class="token punctuation">;</span>

        <span class="token directive"><span class="token keyword">proxy_pass</span> http://<span class="token variable">$http_host</span><span class="token variable">$uri</span><span class="token variable">$is_args</span><span class="token variable">$args</span></span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用第一个配置 <em>‘listen 8888;’ –</em> 我们基本上是告诉服务器，所有发往这个端口的请求都必须用以下配置来处理。<em>location</em> 参数负责特定服务器子区域块配置，并基本上告诉服务器如何处理特定 URI 的请求。</p><p><em>‘resolver 8.8.8.8’</em> 指令指定了应该使用哪些名称服务器将上游服务器的名称解析为地址，在这种情况下 8.8.8.8 对应于 Google 的名称服务器。</p><p>变量 <em>$http_host</em> 包含原始请求中的主机，而 <em>$uri</em> 包含域或 IP 后的路径。最后两个变量 <em>$is_args</em> 和 <em>$args</em> 检查初始请求中的任何额外参数，并将它们自动添加到代理请求中。</p><p>在我们更新了所有必要的配置之后，我们需要重启 <em>nginx.service</em> 以使它们生效：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">sudo</span> systemctl restart nginx.service
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>正如我们之前提到的，正向代理在应用层工作，所以自然地，根据客户端的不同，我们有多种方式可以配置正向代理。<strong>在这一步中，我们将创建一个简单的 JavaScript 客户端并追踪请求。</strong></p><p>在我们开始之前，让我们确保在我们的本地机器上安装了最新的 node.js 和 npm。接下来，我们创建客户端的目录和文件。让我们将目录命名为 <em>Proxy Test</em>，文件命名为 <em>proxytest.js</em>。</p><p>接下来，我们需要初始化 NPM 的 <em>package.json</em>，这样我们就可以安装所有需要的库。我们通过在项目目录中的终端运行 <em>npm init</em> 命令来完成这个操作：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">npm</span> init
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在我们成功初始化存储库之后，我们需要安装我们将用于构建带有代理配置的自定义请求的请求库：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> request
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>最后，让我们打开一个 IDE 并将以下代码粘贴到我们的 <em>proxytest.js</em> 文件中：</p><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">var</span> request <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;request&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">request</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token string-property property">&#39;url&#39;</span><span class="token operator">:</span><span class="token string">&#39;http://www.google.com/&#39;</span><span class="token punctuation">,</span>
    <span class="token string-property property">&#39;method&#39;</span><span class="token operator">:</span> <span class="token string">&quot;GET&quot;</span><span class="token punctuation">,</span>
    <span class="token string-property property">&#39;proxy&#39;</span><span class="token operator">:</span><span class="token string">&#39;http://192.168.100.40:8888&#39;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">error<span class="token punctuation">,</span> response<span class="token punctuation">,</span> body</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>error <span class="token operator">&amp;&amp;</span> response<span class="token punctuation">.</span>statusCode <span class="token operator">==</span> <span class="token number">200</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>body<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们运行这段代码片段：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">node</span> proxytest.js
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>让我们退一步，看看每一行。第一行将库导入到 <em>request</em> 对象中，我们将在后面使用它。</p><p>在 <em>request</em> 对象内，我们指定了目标服务器的 URL、HTTP 方法和代理作为 URL 和端口键对。在回调函数内，如果请求成功，我们在控制台中记录响应体。</p><p>接下来，让我们看看 Nginx 的调试日志：</p><div class="language-nginx line-numbers-mode" data-ext="nginx" data-title="nginx"><pre class="language-nginx"><code>2022/02/20 13:46:13 [debug] 1790#1790: *1 http script copy: &quot;http://&quot;
2022/02/20 13:46:13 [debug] 1790#1790: *1 http script var: &quot;www.google.com&quot;
2022/02/20 13:46:13 [debug] 1790#1790: *1 http script var: &quot;/&quot;
2022/02/20 13:46:13 [debug] 1790#1790: *1 http script var: &quot;&quot;
2022/02/20 13:46:13 [debug] 1790#1790: *1 http init upstream, client timer: 0
2022/02/20 13:46:13 [debug] 1790#1790: *1 epoll add event: fd:7 op:3 ev:80002005
2022/02/20 13:46:13 [debug] 1790#1790: *1 http script copy: &quot;Host&quot;
2022/02/20 13:46:13 [debug] 1790#1790: *1 http script var: &quot;www.google.com&quot;
2022/02/20 13:46:13 [debug] 1790#1790: *1 http script copy: &quot;Connection&quot;
2022/02/20 13:46:13 [debug] 1790#1790: *1 http script copy: &quot;close&quot;
2022/02/20 13:46:13 [debug] 1790#1790: *1 http script copy: &quot;&quot;
2022/02/20 13:46:13 [debug] 1790#1790: *1 http script copy: &quot;&quot;
2022/02/20 13:46:13 [debug] 1790#1790: *1 http proxy header:
&quot;GET / HTTP/1.0
Host: www.google.com
Connection: close

&quot;
2022/02/20 13:46:13 [debug] 1790#1790: *1 http cleanup add: 0000560CE3CF5E30
2022/02/20 13:46:13 [debug] 1790#1790: *1 http finalize request: -4, &quot;/?&quot; a:1, c:2
2022/02/20 13:46:13 [debug] 1790#1790: *1 http request count:2 blk:0
2022/02/20 13:46:13 [debug] 1790#1790: *1 http run request: &quot;/?&quot;
2022/02/20 13:46:13 [debug] 1790#1790: *1 http upstream check client, write event:1, &quot;/&quot;
2022/02/20 13:46:14 [debug] 1790#1790: *1 http upstream resolve: &quot;/?&quot;
2022/02/20 13:46:14 [debug] 1790#1790: *1 name was resolved to 142.250.184.100
2022/250.184.100
2022/02/20 13:46:14 [debug] 1790#1790: *1 name was resolved to 2a00:1450:4002:406::2004
2022/02/20 13:46:14 [debug] 1790#1790: *1 get rr peer, try: 2
2022/02/20 13:46:14 [debug] 1790#1790: *1 get rr peer, current: 0000560CE3CF5EB8 -1
2022/02/20 13:46:14 [debug] 1790#1790: *1 stream socket 12
2022/02/20 13:46:14 [debug] 1790#1790: *1 epoll add connection: fd:12 ev:80002005
2022/02/20 13:46:14 [debug] 1790#1790: *1 connect to 142.250.184.100:80, fd:12 <span class="token comment">#3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，我们的初始请求通过代理。代理服务器立即启动了一个新的请求，包含初始请求的所有数据，发送到目标资源。然后，它从资源中获取响应并将其返回给我们的客户端：</p><div class="language-nginx line-numbers-mode" data-ext="nginx" data-title="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">2022/02/20</span> 13:46:14 [debug] 1790#1790: *1 http proxy status <span class="token number">200</span> <span class="token string">&quot;200 OK&quot;</span>
2022/02/20 13:46:14 [debug] 1790#1790: *1 http proxy header: <span class="token string">&quot;Date: Sun, 20 Feb 2022 12:46:15 GMT&quot;</span>
2022/02/20 13:46:14 [debug] 1790#1790: *1 http proxy header: <span class="token string">&quot;Expires: -1&quot;</span>
2022/02/20 13:46:14 [debug] 1790#1790: *1 http proxy header: <span class="token string">&quot;Cache-Control: private, max-age=0&quot;</span>
2022/02/20 13:46:14 [debug] 1790#1790: *1 http proxy header: <span class="token string">&quot;Content-Type: text/html; charset=ISO-8859-1&quot;</span>
2022/02/20 13:46:14 [debug] 1790#1790: *1 http proxy header: <span class="token string">&quot;P3P: CP=<span class="token escape entity">\\&quot;</span>This is not a P3P policy! See g.co/p3phelp for more info.<span class="token escape entity">\\&quot;</span>&quot;</span>
2022/02/20 13:46:14 [debug] 1790#1790: *1 http proxy header: <span class="token string">&quot;Server: gws&quot;</span>
2022/02/20 13:46:14 [debug] 1790#1790: *1 http proxy header: <span class="token string">&quot;X-XSS-Protection: 0&quot;</span>
2022/02/20 13:46:14 [debug] 1790#1790: *1 http proxy header: <span class="token string">&quot;X-Frame-Options: SAMEORIGIN&quot;</span>
2022/02/20 13:46:14 [debug] 1790#1790: *1 http proxy header: <span class="token string">&quot;Set-Cookie: 1P_JAR=2022-02-20-12; expires=Tue, 22-Mar-2022 12:46:15 GMT; path=/; domain=.google.com; Secure&quot;</span>
2022/02/20 13:46:14 [debug] 1790#1790: *1 http proxy header: <span class="token string">&quot;Set-Cookie: NID=511=IkyJTmMt6I2b3fHpGNUwdfCkv1q9cjzyeUaxC-cxMZWcbmSi4sVlRlwXJUTRA9ujqQnK2v6DNyhitL3zPRSf7RSIHDCv8aYcUD7jp3vX4sE7ZkiprAWmJo9FlnUJtV9H0IzOFyPck15Jfs0zb1VeOMOjKZk0BZ0XRQ3gNptMOl8; expires=Mon, 22-Aug-2022 12:46:15 GMT; path=/; domain=.google.com; HttpOnly&quot;</span>
2022/02/20 13:46:14 [debug] 1790#1790: *1 http proxy header: <span class="token string">&quot;Accept-Ranges: none&quot;</span>
2022/02/20 13:46:14 [debug] 1790#1790: *1 http proxy header: <span class="token string">&quot;Vary: Accept-Encoding&quot;</span>
2022/02/20 13:46:14 [debug] 1790#1790: *1 http proxy header done
2022/02/20 13:46:14 [debug] 1790#1790: *1 xslt filter header
2022/02/20 13:46:14 [debug] 1790#1790: *1 HTTP/1.1 <span class="token number">200</span> OK
Server: nginx/1.18.0
Date: Sun, <span class="token number">20</span> Feb <span class="token number">2022</span> 12:46:14 GMT
Content-Type: text/html</span><span class="token punctuation">;</span> <span class="token directive"><span class="token keyword">charset=ISO-8859-1</span>
Transfer-Encoding: chunked
Connection: close
Expires: -1
Cache-Control: private, max-age=0
P3P: CP=\\&quot;This is not a P3P policy! See g.co/p3phelp for more info.\\&quot;
X-XSS-Protection: <span class="token number">0</span>
X-Frame-Options: SAMEORIGIN
Set-Cookie: 1P_JAR=2022-02-20-12</span><span class="token punctuation">;</span> <span class="token directive"><span class="token keyword">expires=Tue,</span> 22-Mar-2022 12:46:15 GMT</span><span class="token punctuation">;</span> <span class="token directive"><span class="token keyword">path=/</span></span><span class="token punctuation">;</span> <span class="token directive"><span class="token keyword">domain=.google.com</span></span><span class="token punctuation">;</span> <span class="token directive"><span class="token keyword">Secure</span>
Set-Cookie: NID=511=IkyJTmMt6I2b3fHpGNUwdfCkv1q9cjzyeUaxC-cxMZWcbmSi4sVlRlwXJUTRA9ujqQnK2v6DNyhitL3zPRSf7RSIHDCv8aYcUD7jp3vX4sE7ZkiprAWmJo9FlnUJtV9H0IzOFyPck15Jfs0zb1VeOMOjKZk0BZ0XRQ3gNptMOl8</span><span class="token punctuation">;</span> <span class="token directive"><span class="token keyword">expires=Mon,</span> 22-Aug-2022 12:46:15 GMT</span><span class="token punctuation">;</span> <span class="token directive"><span class="token keyword">path=/</span></span><span class="token punctuation">;</span> <span class="token directive"><span class="token keyword">domain=.google.com</span></span><span class="token punctuation">;</span> HttpOnly
Accept-Ranges: none
Vary: Accept-Encoding

2022/02/20 13:46:14 [debug] 1790#1790: *1 write new buf t:1 f:0 0000560CE3CF7AD0, pos 0000560CE3CF7AD0, size: 760 file: 0, size: 0
2022/02/20 13:46:14 [debug] 1790#1790: *1 http write filter: l:0 f:0 s:760
2022/02/20 13:46:14 [debug] 1790#1790: *1 http cacheable: 0
2022/02/20 13:46:14 [debug] 1790#1790: *1 http proxy filter init s:200 h:0 c:0 l:-1
2022/02/20 13:46:14 [debug] 1790#1790: *1 http upstream process upstream
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当请求成功发送到目标时，我们在日志中看到响应“200 OK”，这意味着请求被接受并且响应成功返回。从我们的日志中我们还可以看到所有目标服务器返回的 HTTP 头，逐行列出。目标服务器返回的任何 HTTP 头都会自动添加到代理返回对象中。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span><strong>5.</strong> 结论</span></a></h2><p>在本教程中，我们学习了如何使用 Nginx 服务器设置一个简单且轻量级的正向代理。我们了解了正向代理和 VPN 之间的重要区别。最后，我们还学习了如何将基于 JavaScript 的客户端连接到我们新创建的正向代理。</p><p>完整的源代码可以在 GitHub 上找到。 OK</p>`,42),p=[i];function o(l,r){return e(),s("div",null,p)}const u=n(t,[["render",o],["__file","2024-07-20-Using Nginx as a Forward Proxy.html.vue"]]),v=JSON.parse('{"path":"/posts/baeldung/2024-07-20/2024-07-20-Using%20Nginx%20as%20a%20Forward%20Proxy.html","title":"Nginx 作为正向代理的配置和使用教程","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Nginx","代理服务器"],"tag":["Nginx","正向代理","教程"],"head":[["meta",{"name":"keywords","content":"Nginx, 正向代理, 代理服务器, 教程"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-20/2024-07-20-Using%20Nginx%20as%20a%20Forward%20Proxy.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Nginx 作为正向代理的配置和使用教程"}],["meta",{"property":"og:description","content":"Nginx 作为正向代理的配置和使用教程 1. 引言 当谈到 Nginx，它是目前最受欢迎的服务器之一。它快速、轻量级，并且负责托管一些互联网上最大的网站。Nginx 通常被用作负载均衡器、反向代理和 HTTP 缓存等。 本教程将重点介绍如何将其用作请求位置的正向代理。 2. 使用正向代理的动机 代理服务器是作为客户端和请求资源的主机之间的中间人实体。..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2022/04/Forward-Proxy-01-1024x512.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-20T20:14:26.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Nginx"}],["meta",{"property":"article:tag","content":"正向代理"}],["meta",{"property":"article:tag","content":"教程"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-20T20:14:26.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Nginx 作为正向代理的配置和使用教程\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2022/04/Forward-Proxy-01-1024x512.png\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-20T20:14:26.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Nginx 作为正向代理的配置和使用教程 1. 引言 当谈到 Nginx，它是目前最受欢迎的服务器之一。它快速、轻量级，并且负责托管一些互联网上最大的网站。Nginx 通常被用作负载均衡器、反向代理和 HTTP 缓存等。 本教程将重点介绍如何将其用作请求位置的正向代理。 2. 使用正向代理的动机 代理服务器是作为客户端和请求资源的主机之间的中间人实体。..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 使用正向代理的动机","slug":"_2-使用正向代理的动机","link":"#_2-使用正向代理的动机","children":[]},{"level":2,"title":"3. 使用 Nginx 实现正向代理","slug":"_3-使用-nginx-实现正向代理","link":"#_3-使用-nginx-实现正向代理","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1721506466000,"updatedTime":1721506466000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":8.07,"words":2421},"filePathRelative":"posts/baeldung/2024-07-20/2024-07-20-Using Nginx as a Forward Proxy.md","localizedDate":"2022年4月1日","excerpt":"\\n<h2><strong>1.</strong> 引言</h2>\\n<p>当谈到 Nginx，它是目前最受欢迎的服务器之一。它快速、轻量级，并且负责托管一些互联网上最大的网站。Nginx 通常被用作负载均衡器、反向代理和 HTTP 缓存等。</p>\\n<p><strong>本教程将重点介绍如何将其用作请求位置的正向代理。</strong></p>\\n<h2><strong>2.</strong> 使用正向代理的动机</h2>\\n<p>代理服务器是作为客户端和请求资源的主机之间的中间人实体。这意味着流量需要通过额外的机器才能到达目的地（主机服务器）。代理代表客户端继续请求，所以当主机服务器接受请求时，他们只能看到代理的 IP。相比之下，反向代理直接位于网络前面，将来自客户端的请求路由到正确的 Web 服务器（在多个服务器的网络中）。</p>","autoDesc":true}');export{u as comp,v as data};
