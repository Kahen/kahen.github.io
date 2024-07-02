import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as n}from"./app-B3tK_ksD.js";const t={},l=n(`<h1 id="在macos使用homebrew安装postgresql并且创建新用户和数据库-并将数据库的所有权分配给新用户。" tabindex="-1"><a class="header-anchor" href="#在macos使用homebrew安装postgresql并且创建新用户和数据库-并将数据库的所有权分配给新用户。"><span>在MacOS使用Homebrew安装postgresql并且创建新用户和数据库，并将数据库的所有权分配给新用户。</span></a></h1><h2 id="_1-安装postgresql" tabindex="-1"><a class="header-anchor" href="#_1-安装postgresql"><span>1. 安装PostgreSQL</span></a></h2><h3 id="先决条件-您的计算机上已安装-homebrew。如果没有-您可以随时访问-https-brew-sh-zh-cn-获取安装说明。" tabindex="-1"><a class="header-anchor" href="#先决条件-您的计算机上已安装-homebrew。如果没有-您可以随时访问-https-brew-sh-zh-cn-获取安装说明。"><span>先决条件：您的计算机上已安装 Homebrew。如果没有，您可以随时访问 https://brew.sh/zh-cn/ 获取安装说明。</span></a></h3><p>使用以下命令安装 PostgreSQL：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>brew <span class="token function">install</span> postgresql@16
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_2-配置postgresql后台运行" tabindex="-1"><a class="header-anchor" href="#_2-配置postgresql后台运行"><span>2.配置PostgreSQL后台运行</span></a></h2><p>启动PostgreSQL服务 使用以下命令启动 PostgreSQL 服务：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>brew services start postgresql@16
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>现在，要从命令行访问 postgres，您必须将其添加到路径变量中，在终端中键入以下命令以在 TextEdit 中打开 ~/.zshrc 文件：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">nano</span> .zshrc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>将以下行添加到文件的末尾：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 例如，要将 postgresql@16 bin 目录添加到您的 PATH：</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable"><span class="token environment constant">PATH</span></span><span class="token operator">=</span><span class="token string">&quot;/opt/homebrew/opt/postgresql@16/bin:<span class="token environment constant">$PATH</span>&quot;</span> 

<span class="token comment"># 为了让编译器找到 postgresql@16，您可能需要设置：</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">LDFLAGS</span><span class="token operator">=</span><span class="token string">&quot;-L/opt/homebrew/opt/postgresql@16/lib&quot;</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">CPPFLAGS</span><span class="token operator">=</span><span class="token string">&quot;-I/opt/homebrew/opt/postgresql@16/include&quot;</span>

<span class="token comment"># 为了让 pkg-config 找到 postgresql@16，您可能需要设置：:</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">PKG_CONFIG_PATH</span><span class="token operator">=</span><span class="token string">&quot;/opt/homebrew/opt/postgresql@16/lib/pkgconfig&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在终端中键入以下命令以使更改生效：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token builtin class-name">source</span> ~/.zshrc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>当我们执行成功后，我们可以通过以下命令检查 PostgreSQL 的版本：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>psql <span class="token parameter variable">--version</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>你会看到类似这样的输出：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>psql <span class="token punctuation">(</span>PostgreSQL<span class="token punctuation">)</span> <span class="token number">16.0</span> <span class="token punctuation">(</span>Homebrew<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_3-配置-postgresql" tabindex="-1"><a class="header-anchor" href="#_3-配置-postgresql"><span>3.配置 PostgreSQL</span></a></h2><p>使用 homebrew 安装 Postgres 将创建一个没有密码和用户名的用户作为您的 MacOS 用户名（在终端中输入“id -un”，您将获得您的用户名），除此之外，它还会创建一个名为“postgres”的数据库，因此第一个我们要做的就是连接到默认数据库（即 postgres）并为我们的用户（或角色）分配一个密码。</p><p>连接数据库</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>psql <span class="token parameter variable">-U</span> <span class="token operator">&lt;</span>CURRENTLY_LOGGED_IN_MAC_USERNAME<span class="token operator">&gt;</span> postgres
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>为当前用户分配密码(可选)</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>ALTER <span class="token environment constant">USER</span> <span class="token operator">&lt;</span>CURRENTLY_LOGGED_IN_MAC_USERNAME<span class="token operator">&gt;</span> PASSWORD <span class="token string">&#39;&lt;PASSWORD&gt;&#39;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote><p><em>注意：用单引号输入您的密码，并且不要忘记附加分号 (😉。</em></p></blockquote><p>完成密码修改后，使用 \\q 退出，现在需要修改 pg_hba.conf 文件中定义的身份验证方法，默认情况下它被设置为 &quot;信任&quot;，这就是连接到数据库后没有密码提示的原因。 你可以使用以下命令找到 pg_hba.conf 文件，随后会出现密码提示（输入在前一条命令中设置的密码）：</p><div class="language-mar line-numbers-mode" data-ext="mar" data-title="mar"><pre class="language-mar"><code>sudo -u &lt;CURRENTLY_LOGGED_IN_MAC_USERNAME&gt; psql postgres -c &quot;SHOW hba_file;&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>最有可能的是，它会存储在与我相同的路径中，即 /opt/homebrew/var/postgresql@16/pg_hba.conf 。现在你可以在你选择的任何编辑器中打开这个文件，我使用 vs-code 来打开这个文件。 配置文件将如下图所示。我们现在需要将所有身份验证方法从“trust”更改为“md5”。</p><div class="language-properties line-numbers-mode" data-ext="properties" data-title="properties"><pre class="language-properties"><code><span class="token comment"># &quot;local&quot; is for Unix domain socket connections only</span>
<span class="token key attr-name">local</span> <span class="token value attr-value">  all             all                                     trust</span>
<span class="token comment"># IPv4 local connections:</span>
<span class="token key attr-name">host</span> <span class="token value attr-value">   all             all             127.0.0.1/32            trust</span>
<span class="token comment"># IPv6 local connections:</span>
<span class="token key attr-name">host</span> <span class="token value attr-value">   all             all             ::1/128                 trust</span>
<span class="token comment"># Allow replication connections from localhost, by a user with the</span>
<span class="token comment"># replication privilege.</span>
<span class="token key attr-name">local</span> <span class="token value attr-value">  replication     all                                     trust</span>
<span class="token key attr-name">host</span> <span class="token value attr-value">   replication     all             127.0.0.1/32            trust</span>
<span class="token key attr-name">host</span> <span class="token value attr-value">   replication     all             ::1/128                 trust</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>改完之后如下所示</p><div class="language-properties line-numbers-mode" data-ext="properties" data-title="properties"><pre class="language-properties"><code><span class="token comment"># &quot;local&quot; is for Unix domain socket connections only</span>
<span class="token key attr-name">local</span> <span class="token value attr-value">  all             all                                     md5</span>
<span class="token comment"># IPv4 local connections:</span>
<span class="token key attr-name">host</span> <span class="token value attr-value">   all             all             127.0.0.1/32            md5</span>
<span class="token comment"># IPv6 local connections:</span>
<span class="token key attr-name">host</span> <span class="token value attr-value">   all             all             ::1/128                 md5</span>
<span class="token comment"># Allow replication connections from localhost, by a user with the</span>
<span class="token comment"># replication privilege.</span>
<span class="token key attr-name">local</span> <span class="token value attr-value">  replication     all                                     md5</span>
<span class="token key attr-name">host</span> <span class="token value attr-value">   replication     all             127.0.0.1/32            md5</span>
<span class="token key attr-name">host</span> <span class="token value attr-value">   replication     all             ::1/128                 md5</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用以下命令重新启动 postgres 服务以使更改生效：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>brew services restart postgresql@16
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>尝试使用相同的用户名连接到 postgres 数据库，现在系统会要求您输入密码，请使用我们最初连接到数据库时使用的相同命令：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>psql <span class="token parameter variable">-U</span> <span class="token operator">&lt;</span>CURRENTLY_LOGGED_IN_MAC_USERNAME<span class="token operator">&gt;</span> postgres
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>输入密码，就可以成功连接到数据库了。由于默认用户是superuser（拥有所有权限，输入 \\du+ 查找所有用户及与之相关的角色，在上一条命令之后）。</p><p>我们将创建一个具有最小权限的新用户/角色，以遵循最小权限原则，以增强本地 postgres 服务器的安全性。使用上述命令连接数据库后，使用以下命令创建新用户：</p><h4 id="_3-1-创建用户和数据库" tabindex="-1"><a class="header-anchor" href="#_3-1-创建用户和数据库"><span>3.1 创建用户和数据库</span></a></h4><p>创建新用户和数据库，并将数据库的所有权分配给新用户。</p><div class="language-postgresql line-numbers-mode" data-ext="postgresql" data-title="postgresql"><pre class="language-postgresql"><code>CREATE USER db_admin WITH PASSWORD &#39;secure_password&#39;;
CREATE DATABASE my_database OWNER db_admin;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-2-切换到目标数据库" tabindex="-1"><a class="header-anchor" href="#_3-2-切换到目标数据库"><span>3.2 切换到目标数据库</span></a></h4><p>切换到新创建的数据库。</p><div class="language-postgresql line-numbers-mode" data-ext="postgresql" data-title="postgresql"><pre class="language-postgresql"><code>\\c my_database
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_3-3授予模式的权限" tabindex="-1"><a class="header-anchor" href="#_3-3授予模式的权限"><span>3.3授予模式的权限</span></a></h4><p>授予新用户对 <code>public</code> 模式的使用和创建权限。</p><div class="language-postgresql line-numbers-mode" data-ext="postgresql" data-title="postgresql"><pre class="language-postgresql"><code>GRANT USAGE ON SCHEMA public TO db_admin;
GRANT CREATE ON SCHEMA public TO db_admin;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-4-授予数据库和表的权限" tabindex="-1"><a class="header-anchor" href="#_3-4-授予数据库和表的权限"><span>3.4 授予数据库和表的权限</span></a></h4><p>授予新用户对数据库和所有现有表的所有权限。</p><div class="language-postgresql line-numbers-mode" data-ext="postgresql" data-title="postgresql"><pre class="language-postgresql"><code>GRANT ALL PRIVILEGES ON DATABASE my_database TO db_admin;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>命令执行后，使用 \\q 退出并使用新的用户名和密码登录。</p><p>通过这些步骤，你可以确保 <code>db_admin</code> 用户在 <code>my_database</code> 数据库中拥有所有必要的权限。</p>`,51),r=[l];function o(i,p){return a(),s("div",null,r)}const m=e(t,[["render",o],["__file","在Mac说安装postgresql并且创建一个数据库单独给一个用户赋予权限.html.vue"]]),u=JSON.parse('{"path":"/posts/articles/postgresql/%E5%9C%A8Mac%E8%AF%B4%E5%AE%89%E8%A3%85postgresql%E5%B9%B6%E4%B8%94%E5%88%9B%E5%BB%BA%E4%B8%80%E4%B8%AA%E6%95%B0%E6%8D%AE%E5%BA%93%E5%8D%95%E7%8B%AC%E7%BB%99%E4%B8%80%E4%B8%AA%E7%94%A8%E6%88%B7%E8%B5%8B%E4%BA%88%E6%9D%83%E9%99%90.html","title":"在MacOS使用Homebrew安装postgresql并且创建新用户和数据库，并将数据库的所有权分配给新用户。","lang":"zh-CN","frontmatter":{"date":"2024-06-20T00:00:00.000Z","category":["PostgreSQL","MacOS"],"tag":["PostgreSQL","MacOS","Homebrew","Database"],"head":[["meta",{"name":"keywords","content":"PostgreSQL, MacOS, Homebrew, Database, User, Owner ,Permission"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/articles/postgresql/%E5%9C%A8Mac%E8%AF%B4%E5%AE%89%E8%A3%85postgresql%E5%B9%B6%E4%B8%94%E5%88%9B%E5%BB%BA%E4%B8%80%E4%B8%AA%E6%95%B0%E6%8D%AE%E5%BA%93%E5%8D%95%E7%8B%AC%E7%BB%99%E4%B8%80%E4%B8%AA%E7%94%A8%E6%88%B7%E8%B5%8B%E4%BA%88%E6%9D%83%E9%99%90.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在MacOS使用Homebrew安装postgresql并且创建新用户和数据库，并将数据库的所有权分配给新用户。"}],["meta",{"property":"og:description","content":"在MacOS使用Homebrew安装postgresql并且创建新用户和数据库，并将数据库的所有权分配给新用户。 1. 安装PostgreSQL 先决条件：您的计算机上已安装 Homebrew。如果没有，您可以随时访问 https://brew.sh/zh-cn/ 获取安装说明。 使用以下命令安装 PostgreSQL： 2.配置PostgreSQL后..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T07:05:24.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"PostgreSQL"}],["meta",{"property":"article:tag","content":"MacOS"}],["meta",{"property":"article:tag","content":"Homebrew"}],["meta",{"property":"article:tag","content":"Database"}],["meta",{"property":"article:published_time","content":"2024-06-20T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T07:05:24.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在MacOS使用Homebrew安装postgresql并且创建新用户和数据库，并将数据库的所有权分配给新用户。\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-20T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T07:05:24.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在MacOS使用Homebrew安装postgresql并且创建新用户和数据库，并将数据库的所有权分配给新用户。 1. 安装PostgreSQL 先决条件：您的计算机上已安装 Homebrew。如果没有，您可以随时访问 https://brew.sh/zh-cn/ 获取安装说明。 使用以下命令安装 PostgreSQL： 2.配置PostgreSQL后..."},"headers":[{"level":2,"title":"1. 安装PostgreSQL","slug":"_1-安装postgresql","link":"#_1-安装postgresql","children":[{"level":3,"title":"先决条件：您的计算机上已安装 Homebrew。如果没有，您可以随时访问 https://brew.sh/zh-cn/ 获取安装说明。","slug":"先决条件-您的计算机上已安装-homebrew。如果没有-您可以随时访问-https-brew-sh-zh-cn-获取安装说明。","link":"#先决条件-您的计算机上已安装-homebrew。如果没有-您可以随时访问-https-brew-sh-zh-cn-获取安装说明。","children":[]}]},{"level":2,"title":"2.配置PostgreSQL后台运行","slug":"_2-配置postgresql后台运行","link":"#_2-配置postgresql后台运行","children":[]},{"level":2,"title":"3.配置 PostgreSQL","slug":"_3-配置-postgresql","link":"#_3-配置-postgresql","children":[]}],"git":{"createdTime":1718953524000,"updatedTime":1718953524000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":3.94,"words":1182},"filePathRelative":"posts/articles/postgresql/在Mac说安装postgresql并且创建一个数据库单独给一个用户赋予权限.md","localizedDate":"2024年6月20日","excerpt":"\\n<h2>1. 安装PostgreSQL</h2>\\n<h3>先决条件：您的计算机上已安装 Homebrew。如果没有，您可以随时访问 https://brew.sh/zh-cn/ 获取安装说明。</h3>\\n<p>使用以下命令安装 PostgreSQL：</p>\\n<div class=\\"language-bash\\" data-ext=\\"sh\\" data-title=\\"sh\\"><pre class=\\"language-bash\\"><code>brew <span class=\\"token function\\">install</span> postgresql@16\\n</code></pre></div>","autoDesc":true}');export{m as comp,u as data};
