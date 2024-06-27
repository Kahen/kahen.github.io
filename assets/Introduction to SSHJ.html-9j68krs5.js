import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as i,a as t}from"./app-DVNPGkbu.js";const s={},a=t(`<h1 id="sshj简介-baeldung" tabindex="-1"><a class="header-anchor" href="#sshj简介-baeldung"><span>SSHJ简介 | Baeldung</span></a></h1><h2 id="_1-概览" tabindex="-1"><a class="header-anchor" href="#_1-概览"><span>1. 概览</span></a></h2><p><strong>SSHJ是一个使用SSH协议与远程服务器安全通信的开源Java库。</strong></p><p>在本文中，我们将介绍SSHJ库的基本功能。</p><h2 id="_2-依赖项" tabindex="-1"><a class="header-anchor" href="#_2-依赖项"><span>2. 依赖项</span></a></h2><p>要使用SSHJ库，我们需要向项目中添加以下依赖项：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>\`&lt;dependency&gt;\`
    \`&lt;groupId&gt;\`com.hierynomus\`&lt;/groupId&gt;\`
    \`&lt;artifactId&gt;\`sshj\`&lt;/artifactId&gt;\`
    \`&lt;version&gt;\`0.38.0\`&lt;/version&gt;\`
\`&lt;/dependency&gt;\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以在Maven Central找到SSHJ库的最新版本。</p><h2 id="_3-sshj库" tabindex="-1"><a class="header-anchor" href="#_3-sshj库"><span>3. SSHJ库</span></a></h2><p>SSHJ库帮助我们通过SSH建立与远程服务器的安全连接。</p><p>使用<strong>SSHJ库，我们可以处理使用SCP或SFTP协议的文件上传和下载。此外，我们还可以使用它来进行本地端口转发和远程端口转发。</strong></p><h2 id="_4-连接ssh客户端" tabindex="-1"><a class="header-anchor" href="#_4-连接ssh客户端"><span>4. 连接SSH客户端</span></a></h2><p>SSH客户端可以使用密码或公钥认证连接到服务器。SSHJ库使我们能够使用任一方法登录。</p><h3 id="_4-1-密码认证" tabindex="-1"><a class="header-anchor" href="#_4-1-密码认证"><span>4.1. 密码认证</span></a></h3><p>我们可以使用SSHJ库通过SSH端口连接到服务器。需要为SSH连接指定主机名、端口、用户名和密码。</p><p><strong>SSH客户端使用_passwordAuthentication()_方法通过密码认证连接到服务器：</strong></p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>String host = // ...;
int port = // ...;
String username = // ...;
String password = // ...;

SSHClient client = new SSHClient();
client.addHostKeyVerifier(new PromiscuousVerifier());
client.connect(host, port);
client.authPassword(username, password);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上代码所示，我们使用密码认证将客户端连接到主机。</p><h3 id="_4-2-公钥认证" tabindex="-1"><a class="header-anchor" href="#_4-2-公钥认证"><span>4.2. 公钥认证</span></a></h3><p>我们也可以使用公钥连接到服务器。对于使用公钥连接，我们需要在服务器上的_known_hosts_文件中有文件条目，或者我们可以在客户端机器上为远程服务器生成公钥，并将公钥复制到服务器的授权SSH密钥中。</p><p><strong>SSH客户端使用_authPublickey()_方法通过公钥认证连接到服务器：</strong></p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>String host = // ...;
String username = // ...;
File privateKeyFile = // ...;
int port = // ...;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>SSHClient client = new SSHClient();
KeyProvider privateKey = client.loadKeys(privateKeyFile.getPath());
client.addHostKeyVerifier(new PromiscuousVerifier());
client.connect(host, port);
client.authPublickey(username, privateKey);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以为客户端生成公钥并更新服务器以连接。在其余示例中，我们将使用第一种方法登录，即使用用户名和密码。</p><h2 id="_5-通过ssh执行命令" tabindex="-1"><a class="header-anchor" href="#_5-通过ssh执行命令"><span>5. 通过SSH执行命令</span></a></h2><p><strong>我们可以使用_sshClient_连接到服务器后启动的_session_上的_exec()_方法通过SSHJ库执行命令：</strong></p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>SSHClient client = new SSHClient();
Session session = sshClient.startSession();
Command cmd = session.exec(&quot;ls -lsa&quot;);
BufferedReader reader = new BufferedReader(new InputStreamReader(cmd.getInputStream()));
String line;
while ((line = reader.readLine()) != null) {
    System.out.println(line);
}
cmd.join(5, TimeUnit.SECONDS);
session.close();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上代码所示，我们为_sshClient_启动一个_session_。然后，我们执行_ls -lsa_命令，该命令列出目录中的所有文件。然后我们使用_BufferedReader_读取执行命令的输出。</p><p>同样，也可以在这里执行其他命令。</p><h2 id="_6-通过scp上传-下载文件" tabindex="-1"><a class="header-anchor" href="#_6-通过scp上传-下载文件"><span>6. 通过SCP上传/下载文件</span></a></h2><p>我们可以通过SCP上传文件。<strong>对于上传，我们使用_SCPFileTransfer_对象上的_upload()_方法：</strong></p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>String filePath = // ...;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>SSHClient ssh = new SSHClient();
ssh.useCompression();
ssh.newSCPFileTransfer()
  .upload(new FileSystemFile(filePath), &quot;/upload/&quot;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们将文件传输到服务器上的_upload_目录。</p><p><strong><em>method useCompression()</em></strong> <strong>添加_zlib_压缩到首选算法中，这可能会导致显著的速度提升。</strong> 并不能保证它会被成功协商。如果客户端已经连接，则进行重新协商；否则，它只会返回。我们也可以在连接客户端之前使用_useCompression()_。</p><p><strong>对于SCP文件下载，我们使用_SCPFileTransfer_对象上的_download()_方法：</strong></p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>String downloadPath = // ...;
String fileName = // ...;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>SSHClient ssh = new SSHClient();
ssh.useCompression();
ssh.newSCPFileTransfer()
  .download(&quot;/upload/&quot; + fileName, downloadPath);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们从服务器上的_upload_目录下载文件到客户端上的_downloadPath_位置。</p><p><strong>上述上传和下载方法在内部运行_scp_命令，使用SSH连接从本地机器复制文件到远程服务器，反之亦然。</strong></p><h2 id="_7-通过sftp上传-下载文件" tabindex="-1"><a class="header-anchor" href="#_7-通过sftp上传-下载文件"><span>7. 通过SFTP上传/下载文件</span></a></h2><p>我们可以通过SFTP上传文件。<strong>对于上传，我们使用_SFTPClient_对象上的_put()_方法：</strong></p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>String filePath = // ...;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>SSHClient ssh = new SSHClient();
SFTPClient sftp = ssh.newSFTPClient();
sftp.put(new FileSystemFile(filePath), &quot;/upload/&quot;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们将文件从客户端上的用户主目录传输到服务器上的_upload_目录。</p><p><strong>对于SFTP下载，我们使用_SFTPClient_对象上的_get()_方法：</strong></p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>String downloadPath = // ...;
String fileName = // ...;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>SSHClient ssh = new SSHClient();
SFTPClient sftp = ssh.newSFTPClient();
sftp.get(&quot;/upload/&quot; + fileName, downloadPath);
sftp.close();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们从服务器上的_upload_目录下载文件到客户端上的_downloadPath_位置。</p><h2 id="_8-本地端口转发" tabindex="-1"><a class="header-anchor" href="#_8-本地端口转发"><span>8. 本地端口转发</span></a></h2><p>本地端口转发用于访问远程服务器上的服务，就像服务在客户端上运行一样：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>SSHClient ssh = new SSHClient();
Parameters params = new Parameters(ssh.getRemoteHostname(), 8081, &quot;google.com&quot;, 80);
ServerSocket ss = new ServerSocket();
ss.setReuseAddress(true);
ss.bind(new InetSocketAddress(params.getLocalHost(), params.getLocalPort()));
ssh.newLocalPortForwarder(params, ss)
  .listen();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，<strong>我们将服务器的_80_端口转发到客户端机器的_8081_端口，这样我们就可以从客户端机器的_8081_端口访问托管在服务器_80_端口上的网站或服务。</strong></p><h2 id="_9-远程端口转发" tabindex="-1"><a class="header-anchor" href="#_9-远程端口转发"><span>9. 远程端口转发</span></a></h2><p>使用远程端口转发，我们可以将客户端机器上运行的服务暴露给远程服务器网络：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>SSHClient ssh = new SSHClient();
ssh.getConnection()
  .getKeepAlive()
  .setKeepAliveInterval(5);
ssh.getRemotePortForwarder()
  .bind(new Forward(8083), new SocketForwardingConnectListener(new InetSocketAddress(&quot;google.com&quot;, 80)));
ssh.getTransport()
  .join();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，<strong>我们将客户端上运行在_8083_端口的服务转发到远程服务器的_80_端口。实际上，客户端机器上运行在_8083_端口的服务被暴露在远程服务器的_80_端口上。</strong></p><p>对于本地和远程端口转发，我们需要确保适当的防火墙设置已经到位。</p><h2 id="_10-检查连接断开" tabindex="-1"><a class="header-anchor" href="#_10-检查连接断开"><span>10. 检查连接断开</span></a></h2><p>我们需要检查连接断开以监控服务器连接状态和健康状况。SSHJ提供了使用keep alive检查连接断开的选项：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>String hostName = // ...;
String userName = // ...;
String password = // ...;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>DefaultConfig defaultConfig = new DefaultConfig();
defaultConfig.setKeepAliveProvider(KeepAliveProvider.KEEP_ALIVE);
SSHClient ssh = new SSHClient(defaultConfig);

ssh.addHostKeyVerifier(new PromiscuousVerifier());
ssh.connect(hostName, 22);
ssh.getConnection()
  .getKeepAlive()
  .setKeepAliveInterval(5);
ssh.authPassword(userName, password);

Session session = ssh.startSession();
session.allocateDefaultPTY();
new CountDownLatch(1).await();
session.allocateDefaultPTY();

session.close();
ssh.disconnect();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上述代码中，我们可以看到<strong>配置_KeepAliveProvider.KEEP_ALIVE_为SSHJ库启用了keep alive模式。</strong></p><p>我们使用_setKeepAliveInterval()_来设置客户端发送keep-alive消息之间的间隔。</p><h2 id="_11-结论" tabindex="-1"><a class="header-anchor" href="#_11-结论"><span>11. 结论</span></a></h2><p>在本文中，我们回顾了SSHJ库的基本使用和实现。我们了解了如何使用SCP和SFTP模式上传或下载文件。此外，我们还看到了如何使用密码或公钥认证连接SSH客户端。通过SSHJ库，远程和本地端口转发也是可行的。总的来说，SSHJ库为Java中的SSH客户端做了大部分事情。</p><p>如常，源代码示例可在GitHub上找到。</p><p>文章发布后30天内开放评论。对于此日期之后的任何问题，请使用网站上的联系表单。</p>`,68),l=[a];function d(r,o){return i(),n("div",null,l)}const u=e(s,[["render",d],["__file","Introduction to SSHJ.html.vue"]]),p=JSON.parse('{"path":"/posts/baeldung/Archive/Introduction%20to%20SSHJ.html","title":"SSHJ简介 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-06-16T00:00:00.000Z","category":["SSHJ","Java"],"tag":["SSH","Java库"],"description":"SSHJ简介 | Baeldung 1. 概览 SSHJ是一个使用SSH协议与远程服务器安全通信的开源Java库。 在本文中，我们将介绍SSHJ库的基本功能。 2. 依赖项 要使用SSHJ库，我们需要向项目中添加以下依赖项： 我们可以在Maven Central找到SSHJ库的最新版本。 3. SSHJ库 SSHJ库帮助我们通过SSH建立与远程服务器的...","head":[["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/Introduction%20to%20SSHJ.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"SSHJ简介 | Baeldung"}],["meta",{"property":"og:description","content":"SSHJ简介 | Baeldung 1. 概览 SSHJ是一个使用SSH协议与远程服务器安全通信的开源Java库。 在本文中，我们将介绍SSHJ库的基本功能。 2. 依赖项 要使用SSHJ库，我们需要向项目中添加以下依赖项： 我们可以在Maven Central找到SSHJ库的最新版本。 3. SSHJ库 SSHJ库帮助我们通过SSH建立与远程服务器的..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"SSH"}],["meta",{"property":"article:tag","content":"Java库"}],["meta",{"property":"article:published_time","content":"2024-06-16T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"SSHJ简介 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-16T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]]},"headers":[{"level":2,"title":"1. 概览","slug":"_1-概览","link":"#_1-概览","children":[]},{"level":2,"title":"2. 依赖项","slug":"_2-依赖项","link":"#_2-依赖项","children":[]},{"level":2,"title":"3. SSHJ库","slug":"_3-sshj库","link":"#_3-sshj库","children":[]},{"level":2,"title":"4. 连接SSH客户端","slug":"_4-连接ssh客户端","link":"#_4-连接ssh客户端","children":[{"level":3,"title":"4.1. 密码认证","slug":"_4-1-密码认证","link":"#_4-1-密码认证","children":[]},{"level":3,"title":"4.2. 公钥认证","slug":"_4-2-公钥认证","link":"#_4-2-公钥认证","children":[]}]},{"level":2,"title":"5. 通过SSH执行命令","slug":"_5-通过ssh执行命令","link":"#_5-通过ssh执行命令","children":[]},{"level":2,"title":"6. 通过SCP上传/下载文件","slug":"_6-通过scp上传-下载文件","link":"#_6-通过scp上传-下载文件","children":[]},{"level":2,"title":"7. 通过SFTP上传/下载文件","slug":"_7-通过sftp上传-下载文件","link":"#_7-通过sftp上传-下载文件","children":[]},{"level":2,"title":"8. 本地端口转发","slug":"_8-本地端口转发","link":"#_8-本地端口转发","children":[]},{"level":2,"title":"9. 远程端口转发","slug":"_9-远程端口转发","link":"#_9-远程端口转发","children":[]},{"level":2,"title":"10. 检查连接断开","slug":"_10-检查连接断开","link":"#_10-检查连接断开","children":[]},{"level":2,"title":"11. 结论","slug":"_11-结论","link":"#_11-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":5.54,"words":1661},"filePathRelative":"posts/baeldung/Archive/Introduction to SSHJ.md","localizedDate":"2024年6月16日","excerpt":"\\n<h2>1. 概览</h2>\\n<p><strong>SSHJ是一个使用SSH协议与远程服务器安全通信的开源Java库。</strong></p>\\n<p>在本文中，我们将介绍SSHJ库的基本功能。</p>\\n<h2>2. 依赖项</h2>\\n<p>要使用SSHJ库，我们需要向项目中添加以下依赖项：</p>\\n<div class=\\"language-text\\" data-ext=\\"text\\" data-title=\\"text\\"><pre class=\\"language-text\\"><code>`&lt;dependency&gt;`\\n    `&lt;groupId&gt;`com.hierynomus`&lt;/groupId&gt;`\\n    `&lt;artifactId&gt;`sshj`&lt;/artifactId&gt;`\\n    `&lt;version&gt;`0.38.0`&lt;/version&gt;`\\n`&lt;/dependency&gt;`\\n</code></pre></div>","autoDesc":true}');export{u as comp,p as data};
