import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as e,o as t,a as s}from"./app-CPbsBEaw.js";const a={},o=s(`<h1 id="testcontainers-桌面应用-baeldung" tabindex="-1"><a class="header-anchor" href="#testcontainers-桌面应用-baeldung"><span>Testcontainers 桌面应用 | Baeldung</span></a></h1><p>在本教程中，我们将探索 Testcontainers 桌面应用程序，这是一个简单但功能强大的工具，用于运行 Testcontainers。我们将学习如何使用它来配置我们的 Docker 环境，管理容器生命周期，并了解我们开发和测试模式的见解。</p><p>Testcontainers 桌面提供了一个最小化的 UI 设计，旨在简化 Testcontainer 配置和调试。我们可以从官方网站免费下载 Testcontainers 桌面。要开始使用它，我们将通过创建账户或通过第三方如 Google、GitHub 或 Docker 进行注册。</p><p>就是这样！一旦我们安装了应用程序并登录，我们就可以在开发工作流程中开始使用 Testcontainers 桌面：</p><p>我们应该在任务栏中看到 Testcontainers 的标志。如果我们右键点击它，我们将看到一些我们将在今天探索的关键功能：</p><ul><li>使用 Testcontainers 云</li><li>冻结容器关闭</li><li>定义固定端口</li><li>与容器交互</li><li>查看 Testcontainers 仪表板</li><li>执行高级自定义</li></ul><h2 id="_3-testcontainers-执行模式" tabindex="-1"><a class="header-anchor" href="#_3-testcontainers-执行模式"><span>3. Testcontainers 执行模式</span></a></h2><p>Testcontainers 桌面为开发人员提供了两种主要的运行测试的方式：本地或在云端。值得注意的是，本地执行是默认行为。</p><h3 id="_3-1-本地执行" tabindex="-1"><a class="header-anchor" href="#_3-1-本地执行"><span>3.1. 本地执行</span></a></h3><p>本地执行利用我们本地的 Docker 环境。例如，让我们运行一个使用 Testcontainers 启动 MongoDB Docker 容器的 JUnit 测试：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Testcontainers</span>
<span class="token annotation punctuation">@SpringBootTest</span>
<span class="token keyword">class</span> <span class="token class-name">DynamicPropertiesLiveTest</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Container</span>
    <span class="token keyword">static</span> <span class="token class-name">MongoDBContainer</span> mongoDBContainer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MongoDBContainer</span><span class="token punctuation">(</span><span class="token class-name">DockerImageName</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span><span class="token string">&quot;mongo:4.0.10&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@DynamicPropertySource</span>
    <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">setProperties</span><span class="token punctuation">(</span><span class="token class-name">DynamicPropertyRegistry</span> registry<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        registry<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&quot;spring.data.mongodb.uri&quot;</span><span class="token punctuation">,</span> mongoDBContainer<span class="token operator">::</span><span class="token function">getReplicaSetUrl</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">void</span> <span class="token function">whenRequestingHobbits_thenReturnFrodoAndSam</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// ...</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们还没有本地的 Docker 镜像，我们将在日志中看到 Docker 正在拉取它。之后，MongoDB 容器启动：</p><div class="language-plaintext line-numbers-mode" data-ext="plaintext" data-title="plaintext"><pre class="language-plaintext"><code>org.testcontainers.dockerclient.DockerClientProviderStrategy - 找到具有本地 Npipe 套接字的 Docker 环境 (npipe:////./pipe/docker_engine)
org.testcontainers.DockerClientFactory - Docker 主机 IP 地址是 localhost
org.testcontainers.DockerClientFactory - 已连接到 docker：
    服务器版本：4.8.3
    API 版本：1.41
    操作系统：fedora
    总内存：7871 MB
org.testcontainers.DockerClientFactory - 检查系统...
org.testcontainers.DockerClientFactory - ✔︎ Docker 服务器版本至少应该是 1.6.0
tc.mongo:4.0.10 - 正在拉取 Docker 镜像：mongo:4.0.10。请耐心等待；这可能需要一些时间，但只需要做一次。
tc.mongo:4.0.10 - 开始拉取镜像
tc.mongo:4.0.10 - 正在拉取镜像层：1 待处理，1 下载中，0 已解压，(0 字节/? MB)
[ ... ]
tc.mongo:4.0.10 - 拉取完成。14 层，17 秒内拉取完成（下载了 129 MB，速度为 7 MB/s）
tc.mongo:4.0.10 - 正在为镜像创建容器：mongo:4.0.10
tc.mongo:4.0.10 - 容器 mongo:4.0.10 已启动：3d74c3a...
tc.mongo:4.0.10 - 容器 mongo:4.0.10 已在 PT21.0624015S 内启动
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此外，我们可以通过在终端中运行 &quot;docker ps&quot; 命令来手动检查容器是否已创建。</p><h3 id="_3-2-testcontainers-云执行" tabindex="-1"><a class="header-anchor" href="#_3-2-testcontainers-云执行"><span>3.2. Testcontainers 云执行</span></a></h3><p>Testcontainers 云提供了一个可扩展的平台，用于在云环境中运行测试。如果我们不想在本地运行容器，或者如果我们没有访问运行中的 Docker 环境，这将是理想的选择。</p><p>TestContainer 云是 Testcontainers 的付费功能，但我们可以每月免费使用多达 300 分钟。</p><p>从小型 UI 开始，让我们切换到 &quot;使用 Testcontainers 云运行&quot;：</p><p>让我们使用这个选项重新运行测试，并再次阅读日志：</p><div class="language-plaintext line-numbers-mode" data-ext="plaintext" data-title="plaintext"><pre class="language-plaintext"><code>org.testcontainers.dockerclient.DockerClientProviderStrategy - 找到带有 Testcontainers 主机的 Docker 环境，tc.host=tcp://127.0.0.1:65497
org.testcontainers.DockerClientFactory - Docker 主机 IP 地址是 127.0.0.1
org.testcontainers.DockerClientFactory - 已连接到 docker：
    服务器版本：78+testcontainerscloud（通过 Testcontainers 桌面 1.7.0）
    API 版本：1.43
    操作系统：Ubuntu 20.04 LTS
    总内存：7407 MB
org.testcontainers.DockerClientFactory - 检查系统...
org.testcontainers.DockerClientFactory - ✔︎ Docker 服务器版本至少应该是 1.6.0
tc.mongo:4.0.10 - 正在拉取 Docker 镜像：mongo:4.0.10。请耐心等待；这可能需要一些时间，但只需要做一次。
tc.mongo:4.0.10 - 开始拉取镜像
tc.mongo:4.0.10 - 正在拉取镜像层：0 待处理，0 下载中，0 已解压，(0 字节/0 字节)
[ ... ]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如预期的那样，使用了不同的环境，Docker 镜像不再在本地下载。不用说，如果我们运行命令 &quot;docker ps&quot;，我们将看不到任何容器在本地运行。</p><h2 id="_4-调试-testcontainers" tabindex="-1"><a class="header-anchor" href="#_4-调试-testcontainers"><span>4. 调试 Testcontainers</span></a></h2><p>Testcontainers 桌面通过以下功能，提供了流畅的调试体验：防止容器关闭、定义固定端口、定制配置以满足我们的需求，以及直接与容器交互。</p><h3 id="_4-1-冻结容器关闭" tabindex="-1"><a class="header-anchor" href="#_4-1-冻结容器关闭"><span>4.1. 冻结容器关闭</span></a></h3><p>我们可以使用桌面应用程序手动控制容器的生命周期。例如，我们可以使用 &quot;冻结容器关闭&quot; 选项，允许运行中的容器即使在启动它的测试终止后也能继续运行：</p><p>如果我们启用此功能并重新运行测试，我们将收到通知，确认容器已被冻结。</p><p>接下来，我们将确定我们本地机器上对应于 Docker 容器暴露端口的端口。MongoDB 通常在端口 27017 上运行。让我们打开一个终端并运行命令 &quot;docker ps&quot; 来查看这个映射：</p><p>正如我们所看到的，Docker 将容器的端口 27017 映射到我们机器的端口 64215。因此，我们可以使用这个端口通过我们喜欢的 MongoDB 客户端应用程序连接到数据库。</p><p>Studio3T 是 MongoDB 的图形用户界面，便于数据库管理、查询和可视化。让我们使用它来配置并测试到我们的 Mongo Testcontainer 的连接：</p><p>我们的测试在 &quot;test&quot; 数据库的 &quot;characters&quot; 集合中插入了一些记录。让我们运行一个简单的查询，列出集合中的所有记录：</p><p>正如我们所看到的，所有记录都在数据库中。</p><h3 id="_4-2-定义固定端口" tabindex="-1"><a class="header-anchor" href="#_4-2-定义固定端口"><span>4.2. 定义固定端口</span></a></h3><p>通常，Testcontainers 在随机端口上启动。然而，如果我们经常需要为了调试目的找到暴露的端口，我们可以定义固定端口。要做到这一点，我们首先需要导航到 &quot;服务 &gt; 打开配置位置&quot;。这会打开一个文件夹，其中包含一些更受欢迎的 Testconatiners 模块的配置示例：</p><p>让我们坚持我们的用例并检查 &quot;mongodb.toml.example&quot; 文件。首先，我们将把它重命名为 &quot;mongodb.toml&quot;，去掉 &quot;.example&quot; 扩展名。</p><p>现在，让我们检查文件的内容。注释逐步解释了如何自定义此文件，以允许 Testcontainers 桌面正确代理服务的端口。让我们关注 &quot;ports&quot; 变量，我们可以使用它来定义本地端口和容器端口之间的映射：</p><div class="language-toml line-numbers-mode" data-ext="toml" data-title="toml"><pre class="language-toml"><code><span class="token comment"># \`local-port\` 配置在您的机器上服务暴露的端口。</span>
<span class="token comment"># \`container-port\` 表示要代理的容器内的端口。</span>
<span class="token key property">ports</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span>
  <span class="token punctuation">{</span><span class="token key property">local-port</span> <span class="token punctuation">=</span> <span class="token number">27017</span><span class="token punctuation">,</span> <span class="token key property">container-port</span> <span class="token punctuation">=</span> <span class="token number">27017</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结果，仅仅通过重命名文件并启用此配置，我们将能够使用固定端口 27017 连接到 MongoDB 数据库。</p><p>换句话说，<strong>我们不再需要每次重新运行测试时手动检查端口映射，而是可以依赖 Mongo 的默认端口。</strong></p><h3 id="_4-3-与容器交互" tabindex="-1"><a class="header-anchor" href="#_4-3-与容器交互"><span>4.3. 与容器交互</span></a></h3><p>有时，即使连接到数据库也不够，例如当我们需要更详细的调试时。在这种情况下，<strong>我们可以直接访问 Docker 容器本身。</strong> 例如，我们可以打开一个附加到容器的终端并与它交互。</p><p>要做到这一点，我们导航到 &quot;容器&quot;，然后选择我们想要调试的容器。之后，我们将被提示选择三个操作之一：&quot;打开终端&quot;、&quot;日志尾部&quot; 或 &quot;终止&quot;：</p><p>&quot;打开终端&quot; 操作允许我们访问附加到容器的终端。例如，我们可以使用这个终端启动 MongoDB shell 并在不需要在本地系统上安装任何 MongoDB 客户端应用程序的情况下查询数据。</p><p>让我们首先打开一个终端（容器 &gt; mongo:4.0.10 &gt; 打开终端）：</p><p>从这一点开始，说明取决于我们使用的容器和我们想要调试的用例。在我们的例子中，让我们执行以下命令：</p><ul><li>“mongo” - 打开 MongoDB shell 提示符</li><li>“show dbs” - 列出服务器上存在的数据库</li><li>“use test” - 切换到 “test” 数据库，这是我们应用程序创建的</li><li>“db.getCollection(&quot;characters&quot;).find({&quot;race&quot;:&quot;hobbit&quot;})” - 查询 “characters” 集合，并按 “race” 属性进行过滤</li></ul><p>正如预期的那样，我们可以看到使用 MongoDB shell 执行的命令。最后一个查询，db.getCollection(...), 从 “test” 数据库的 “characters” 集合中检索记录列表。</p><h2 id="_5-testcontainers-仪表板" tabindex="-1"><a class="header-anchor" href="#_5-testcontainers-仪表板"><span>5. Testcontainers 仪表板</span></a></h2><p><strong>Testcontainers 桌面提供了一个用户友好的仪表板，总结了我们使用的 Testcontainers。</strong> 我们可以通过从菜单中选择 “打开仪表板…” 选项来访问这个网页：</p><p>仪表板提供了 Testcontainers 和使用的镜像的概述，以及有用的资源链接和账户设置。在页面底部，我们可以看到最近的活动和用于执行的环境。</p><p><strong>这个协作工具聚合了桌面和 CI 环境的测试数据，提供了对开发和测试模式的洞察。</strong> 仪表板上的小部件帮助回答有关测试一致性、发布影响、流行的容器镜像和过时依赖的问题。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们发现 Testcontainers 桌面应用程序的多样化功能，帮助我们运行和调试 Testcontainers。我们探索了冻结容器关闭、使用固定端口和访问附加到容器的终端。此外，我们还查看了 Testcontainers 仪表板，这是一个增强测试活动可见性和洞察力的工具。</p><p>如常，本文中使用的代码示例可在 GitHub 上获得。</p><p>OK</p>`,54),i=[o];function c(r,l){return t(),e("div",null,i)}const u=n(a,[["render",c],["__file","2024-06-21-Testcontainers Desktop.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-06-21/2024-06-21-Testcontainers%20Desktop.html","title":"Testcontainers 桌面应用 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-06-22T00:00:00.000Z","category":["Software Engineering","Testing"],"tag":["Testcontainers","Docker","Testing Tools"],"head":[["meta",{"name":"keywords","content":"Testcontainers, Docker, Testing, Software Development"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-21/2024-06-21-Testcontainers%20Desktop.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Testcontainers 桌面应用 | Baeldung"}],["meta",{"property":"og:description","content":"Testcontainers 桌面应用 | Baeldung 在本教程中，我们将探索 Testcontainers 桌面应用程序，这是一个简单但功能强大的工具，用于运行 Testcontainers。我们将学习如何使用它来配置我们的 Docker 环境，管理容器生命周期，并了解我们开发和测试模式的见解。 Testcontainers 桌面提供了一个最小..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T21:28:19.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Testcontainers"}],["meta",{"property":"article:tag","content":"Docker"}],["meta",{"property":"article:tag","content":"Testing Tools"}],["meta",{"property":"article:published_time","content":"2024-06-22T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T21:28:19.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Testcontainers 桌面应用 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-22T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T21:28:19.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Testcontainers 桌面应用 | Baeldung 在本教程中，我们将探索 Testcontainers 桌面应用程序，这是一个简单但功能强大的工具，用于运行 Testcontainers。我们将学习如何使用它来配置我们的 Docker 环境，管理容器生命周期，并了解我们开发和测试模式的见解。 Testcontainers 桌面提供了一个最小..."},"headers":[{"level":2,"title":"3. Testcontainers 执行模式","slug":"_3-testcontainers-执行模式","link":"#_3-testcontainers-执行模式","children":[{"level":3,"title":"3.1. 本地执行","slug":"_3-1-本地执行","link":"#_3-1-本地执行","children":[]},{"level":3,"title":"3.2. Testcontainers 云执行","slug":"_3-2-testcontainers-云执行","link":"#_3-2-testcontainers-云执行","children":[]}]},{"level":2,"title":"4. 调试 Testcontainers","slug":"_4-调试-testcontainers","link":"#_4-调试-testcontainers","children":[{"level":3,"title":"4.1. 冻结容器关闭","slug":"_4-1-冻结容器关闭","link":"#_4-1-冻结容器关闭","children":[]},{"level":3,"title":"4.2. 定义固定端口","slug":"_4-2-定义固定端口","link":"#_4-2-定义固定端口","children":[]},{"level":3,"title":"4.3. 与容器交互","slug":"_4-3-与容器交互","link":"#_4-3-与容器交互","children":[]}]},{"level":2,"title":"5. Testcontainers 仪表板","slug":"_5-testcontainers-仪表板","link":"#_5-testcontainers-仪表板","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1719005299000,"updatedTime":1719005299000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":7.94,"words":2381},"filePathRelative":"posts/baeldung/2024-06-21/2024-06-21-Testcontainers Desktop.md","localizedDate":"2024年6月22日","excerpt":"\\n<p>在本教程中，我们将探索 Testcontainers 桌面应用程序，这是一个简单但功能强大的工具，用于运行 Testcontainers。我们将学习如何使用它来配置我们的 Docker 环境，管理容器生命周期，并了解我们开发和测试模式的见解。</p>\\n<p>Testcontainers 桌面提供了一个最小化的 UI 设计，旨在简化 Testcontainer 配置和调试。我们可以从官方网站免费下载 Testcontainers 桌面。要开始使用它，我们将通过创建账户或通过第三方如 Google、GitHub 或 Docker 进行注册。</p>\\n<p>就是这样！一旦我们安装了应用程序并登录，我们就可以在开发工作流程中开始使用 Testcontainers 桌面：</p>","autoDesc":true}');export{u as comp,m as data};
