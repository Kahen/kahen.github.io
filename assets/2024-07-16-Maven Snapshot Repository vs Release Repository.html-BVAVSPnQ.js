import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as n,a}from"./app-BkL9UgS7.js";const i={},l=a('<h1 id="maven快照仓库与发布仓库的区别" tabindex="-1"><a class="header-anchor" href="#maven快照仓库与发布仓库的区别"><span>Maven快照仓库与发布仓库的区别</span></a></h1><p>在本教程中，我们将解释Maven快照仓库和发布仓库之间的区别。</p><h2 id="_2-maven仓库概述" tabindex="-1"><a class="header-anchor" href="#_2-maven仓库概述"><span>2. Maven仓库概述</span></a></h2><p>Maven仓库包含了一系列预编译的构件，我们可以在应用程序中作为依赖项使用。对于传统的Java应用程序，这些通常是_.jar_文件。</p><p>通常有两种类型的仓库：本地和远程。</p><p>本地仓库是Maven在构建计算机上创建的仓库。它通常位于_$HOME/.m2/repository_目录下。</p><p>当我们构建应用程序时，Maven会在本地仓库中搜索依赖项。如果找不到某个特定的依赖项，Maven会在远程仓库中搜索（定义在_settings.xml_或_pom.xml_文件中）。此外，它会将依赖项复制到我们的本地仓库以供将来使用。</p><p>我们还可以基于构件类型区分快照和发布仓库。</p><p>快照仓库是用于增量、未发布构件版本的仓库。</p><p><strong>快照版本是尚未发布的版本。</strong> 通常的想法是在发布版本之前拥有一个快照版本。它允许我们逐步部署相同的瞬时版本，而无需要求项目升级它们正在使用的构件版本。这些项目可以使用相同的版本来获取更新的快照版本。</p><p>例如，在发布版本_1.0.0_之前，我们可以拥有它的快照版本。快照版本的版本号后有_SNAPSHOT_后缀（例如，<em>1.0.0-SNAPSHOT</em>）。</p><h3 id="_3-1-部署构件" tabindex="-1"><a class="header-anchor" href="#_3-1-部署构件"><span>3.1. 部署构件</span></a></h3><p>持续开发通常使用快照版本控制。有了快照版本，我们可以部署一个包含时间戳和构建号的数字的构件。</p><p>假设我们有一个正在开发中的项目，具有_SNAPSHOT_版本：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>`````&lt;groupId&gt;`````com.baeldung`````&lt;/groupId&gt;`````\n`````&lt;artifactId&gt;`````maven-snapshot-repository`````&lt;/artifactId&gt;`````\n`````&lt;version&gt;`````1.0.0-SNAPSHOT`````&lt;/version&gt;`````\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们将把项目部署到一个自托管的Nexus仓库。</p><p>首先，让我们定义我们想要部署构件的发布仓库信息。我们可以使用分发管理插件：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>``&lt;distributionManagement&gt;``\n    ``&lt;snapshotRepository&gt;``\n        `````&lt;id&gt;`````nexus`````&lt;/id&gt;`````\n        `````&lt;name&gt;`````nexus-snapshot`````&lt;/name&gt;`````\n        `````&lt;url&gt;`````http://localhost:8081/repository/maven-snapshots/`````&lt;/url&gt;`````\n    ``&lt;/snapshotRepository&gt;``\n``&lt;/distributionManagement&gt;``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>进一步，我们将使用_mvn deploy_命令部署我们的项目。</p><p><strong>部署后，实际构件的版本将包含时间戳值而不是_SNAPSHOT_值。</strong> 例如，当我们部署_1.0.0-SNAPSHOT_时，实际值将包含当前的时间戳和构建号（例如，<em>1.0.0-20220709.063105-3</em>）。</p><p>时间戳值在构件部署期间计算。Maven生成校验和并上传具有相同时间戳的构件文件。</p><p>_maven-metadata.xml_文件保存了快照版本及其链接到最新时间戳值的精确信息：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>`&lt;metadata modelVersion=&quot;1.1.0&quot;&gt;`\n    `````&lt;groupId&gt;`````com.baeldung`````&lt;/groupId&gt;`````\n    `````&lt;artifactId&gt;`````maven-snapshot-repository`````&lt;/artifactId&gt;`````\n    `````&lt;version&gt;`````1.0.0-SNAPSHOT`````&lt;/version&gt;`````\n    `&lt;versioning&gt;`\n        `&lt;snapshot&gt;`\n            `&lt;timestamp&gt;`20220709.063105`&lt;/timestamp&gt;`\n            `&lt;buildNumber&gt;`3`&lt;/buildNumber&gt;`\n        `&lt;/snapshot&gt;`\n        `&lt;lastUpdated&gt;`20220709063105`&lt;/lastUpdated&gt;`\n        `&lt;snapshotVersions&gt;`\n            ``&lt;snapshotVersion&gt;``\n                ``&lt;extension&gt;``jar``&lt;/extension&gt;``\n                ``&lt;value&gt;``1.0.0-20220709.063105-3``&lt;/value&gt;``\n                ``&lt;updated&gt;``20220709063105``&lt;/updated&gt;``\n            ``&lt;/snapshotVersion&gt;``\n            ``&lt;snapshotVersion&gt;``\n                ``&lt;extension&gt;``pom``&lt;/extension&gt;``\n                ``&lt;value&gt;``1.0.0-20220709.063105-3``&lt;/value&gt;``\n                ``&lt;updated&gt;``20220709063105``&lt;/updated&gt;``\n            ``&lt;/snapshotVersion&gt;``\n        `&lt;/snapshotVersions&gt;`\n    `&lt;/versioning&gt;`\n`&lt;/metadata&gt;`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>元数据文件有助于从快照版本到时间戳值的转换管理。</p><p>每次我们在相同的快照版本下部署项目时，Maven都会生成包含新时间戳值和新构建号的版本。</p><h3 id="_3-2-下载构件" tabindex="-1"><a class="header-anchor" href="#_3-2-下载构件"><span>3.2. 下载构件</span></a></h3><p>在下载快照构件之前，Maven会下载其关联的_maven-metadata.xml_文件。这样，Maven可以根据时间戳值和构建号检查是否有更新的版本。</p><p><strong>即使使用_SNAPSHOT_版本，也可以检索此类构件。</strong></p><p>要从仓库下载构件，首先，我们需要定义一个依赖仓库：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>`&lt;repositories&gt;`\n    ```&lt;repository&gt;```\n        `````&lt;id&gt;`````nexus`````&lt;/id&gt;`````\n        `````&lt;name&gt;`````nexus-snapshot`````&lt;/name&gt;`````\n        `````&lt;url&gt;`````http://localhost:8081/repository/maven-snapshots/`````&lt;/url&gt;`````\n        ```&lt;snapshots&gt;```\n            ````&lt;enabled&gt;````true````&lt;/enabled&gt;````\n        ```&lt;/snapshots&gt;```\n        `&lt;releases&gt;`\n            ````&lt;enabled&gt;````false````&lt;/enabled&gt;````\n        `&lt;/releases&gt;`\n    ```&lt;/repository&gt;```\n`&lt;/repositories&gt;`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>快照版本默认不启用。</strong> 我们需要手动启用它们：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>```&lt;snapshots&gt;```\n    ````&lt;enabled&gt;````true````&lt;/enabled&gt;````\n```&lt;/snapshots&gt;```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过启用快照，我们可以定义多久检查一次_SNAPSHOT_构件的更新版本。然而，默认的更新策略设置为每天一次。我们可以通过设置不同的更新策略来覆盖此行为：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>```&lt;snapshots&gt;```\n    ````&lt;enabled&gt;````true````&lt;/enabled&gt;````\n    `&lt;updatePolicy&gt;`always`&lt;/updatePolicy&gt;`\n```&lt;/snapshots&gt;```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以在_updatePolicy_元素内放置四种不同的值：</p><ul><li><em>always</em> — 每次检查更新版本</li><li><em>daily</em> （默认值）— 每天检查一次更新版本</li><li><em>interval:mm</em> — 根据设置的分钟间隔检查更新版本</li><li><em>never</em> — 永远不要尝试获取更新版本（与我们本地已有的相比）</li></ul><p>此外，而不是定义_updatePolicy_，我们可以通过在命令中传递-U参数来强制更新所有快照构件：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>mvn install -U\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>此外，如果依赖项已经被下载并且校验和与我们本地已有的相同，则不会重新下载依赖项。</p><p>接下来，我们可以将快照版本的构件添加到我们的项目中：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>``&lt;dependencies&gt;``\n    ``&lt;dependency&gt;``\n        `````&lt;groupId&gt;`````com.baeldung`````&lt;/groupId&gt;`````\n        `````&lt;artifactId&gt;`````maven-snapshot-repository`````&lt;/artifactId&gt;`````\n        `````&lt;version&gt;`````1.0.0-SNAPSHOT`````&lt;/version&gt;`````\n    ``&lt;/dependency&gt;``\n``&lt;/dependencies&gt;``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>在开发阶段使用快照版本可以防止有多个版本的构件。</strong> 我们可以使用相同的_SNAPSHOT_版本，其构建将包含在给定时间的我们的代码快照。</p><h2 id="_4-发布仓库" tabindex="-1"><a class="header-anchor" href="#_4-发布仓库"><span>4. 发布仓库</span></a></h2><p>发布仓库包含构件的最终版本（发布版）。简单来说，发布构件代表其内容不应被修改的构件。</p><p>发布仓库默认为我们在_settings.xml_或_pom.xml_文件中定义的所有仓库启用。</p><h3 id="_4-1-部署构件" tabindex="-1"><a class="header-anchor" href="#_4-1-部署构件"><span>4.1. 部署构件</span></a></h3><p>现在，让我们在本地Nexus仓库中部署项目。假设我们已经完成了开发并准备发布项目：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>`````&lt;groupId&gt;`````com.baeldung`````&lt;/groupId&gt;`````\n`````&lt;artifactId&gt;`````maven-release-repository`````&lt;/artifactId&gt;`````\n`````&lt;version&gt;`````1.0.0`````&lt;/version&gt;`````\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们在分发管理器中定义发布仓库：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>``&lt;distributionManagement&gt;``\n    ```&lt;repository&gt;```\n        `````&lt;id&gt;`````nexus`````&lt;/id&gt;`````\n        `````&lt;name&gt;`````nexus-release`````&lt;/name&gt;`````\n        `````&lt;url&gt;`````http://localhost:8081/repository/maven-releases/`````&lt;/url&gt;`````\n    ```&lt;/repository&gt;```\n    ``&lt;snapshotRepository&gt;``\n        `````&lt;id&gt;`````nexus`````&lt;/id&gt;`````\n        `````&lt;name&gt;`````nexus-snapshot`````&lt;/name&gt;`````\n        `````&lt;url&gt;`````http://localhost:8081/repository/maven-snapshots/`````&lt;/url&gt;`````\n    ``&lt;/snapshotRepository&gt;``\n``&lt;/distributionManagement&gt;``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一旦我们从项目版本中移除_SNAPSHOT_这个词，发布仓库将在部署期间自动被选择而不是快照仓库。</p><p>此外，如果我们想要在相同版本下重新部署构件，我们可能会得到一个错误：“<em>仓库不允许更新资产</em>”。<strong>一旦我们部署了发布的构件版本，我们就不能更改其内容。</strong> 因此，为了解决这个问题，我们只需要简单地发布下一个版本。</p><h3 id="_4-2-下载构件" tabindex="-1"><a class="header-anchor" href="#_4-2-下载构件"><span>4.2. 下载构件</span></a></h3><p>Maven默认从Maven中央仓库查找组件。这个仓库默认使用发布版本策略。</p><p><strong>发布仓库只会解析发布的构件。</strong> 换句话说，它应该只包含已经发布且内容在未来不应更改的构件版本。</p><p>如果我们想要下载发布的构件，我们需要定义仓库：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>```&lt;repository&gt;```\n    `````&lt;id&gt;`````nexus`````&lt;/id&gt;`````\n    `````&lt;name&gt;`````nexus-release`````&lt;/name&gt;`````\n    `````&lt;url&gt;`````http://localhost:8081/repository/maven-releases/`````&lt;/url&gt;`````\n```&lt;/repository&gt;```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，让我们简单地将发布的版本添加到我们的项目中：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>``&lt;dependencies&gt;``\n    ``&lt;dependency&gt;``\n        `````&lt;groupId&gt;`````com.baeldung`````&lt;/groupId&gt;`````\n        `````&lt;artifactId&gt;`````maven-release-repository`````&lt;/artifactId&gt;`````\n        `````&lt;version&gt;`````1.0.0`````&lt;/version&gt;`````\n    ``&lt;/dependency&gt;``\n``&lt;/dependencies&gt;``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本教程中，我们学习了M</p>',61),s=[l];function d(r,v){return n(),t("div",null,s)}const c=e(i,[["render",d],["__file","2024-07-16-Maven Snapshot Repository vs Release Repository.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-07-16/2024-07-16-Maven%20Snapshot%20Repository%20vs%20Release%20Repository.html","title":"Maven快照仓库与发布仓库的区别","lang":"zh-CN","frontmatter":{"date":"2022-06-01T00:00:00.000Z","category":["Maven","Repository"],"tag":["Maven Snapshot","Maven Release"],"head":[["meta",{"name":"keywords","content":"Maven, Snapshot, Release, Repository"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-16/2024-07-16-Maven%20Snapshot%20Repository%20vs%20Release%20Repository.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Maven快照仓库与发布仓库的区别"}],["meta",{"property":"og:description","content":"Maven快照仓库与发布仓库的区别 在本教程中，我们将解释Maven快照仓库和发布仓库之间的区别。 2. Maven仓库概述 Maven仓库包含了一系列预编译的构件，我们可以在应用程序中作为依赖项使用。对于传统的Java应用程序，这些通常是_.jar_文件。 通常有两种类型的仓库：本地和远程。 本地仓库是Maven在构建计算机上创建的仓库。它通常位于_..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-16T22:07:36.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Maven Snapshot"}],["meta",{"property":"article:tag","content":"Maven Release"}],["meta",{"property":"article:published_time","content":"2022-06-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-16T22:07:36.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Maven快照仓库与发布仓库的区别\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-06-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-16T22:07:36.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Maven快照仓库与发布仓库的区别 在本教程中，我们将解释Maven快照仓库和发布仓库之间的区别。 2. Maven仓库概述 Maven仓库包含了一系列预编译的构件，我们可以在应用程序中作为依赖项使用。对于传统的Java应用程序，这些通常是_.jar_文件。 通常有两种类型的仓库：本地和远程。 本地仓库是Maven在构建计算机上创建的仓库。它通常位于_..."},"headers":[{"level":2,"title":"2. Maven仓库概述","slug":"_2-maven仓库概述","link":"#_2-maven仓库概述","children":[{"level":3,"title":"3.1. 部署构件","slug":"_3-1-部署构件","link":"#_3-1-部署构件","children":[]},{"level":3,"title":"3.2. 下载构件","slug":"_3-2-下载构件","link":"#_3-2-下载构件","children":[]}]},{"level":2,"title":"4. 发布仓库","slug":"_4-发布仓库","link":"#_4-发布仓库","children":[{"level":3,"title":"4.1. 部署构件","slug":"_4-1-部署构件","link":"#_4-1-部署构件","children":[]},{"level":3,"title":"4.2. 下载构件","slug":"_4-2-下载构件","link":"#_4-2-下载构件","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1721167656000,"updatedTime":1721167656000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.74,"words":1722},"filePathRelative":"posts/baeldung/2024-07-16/2024-07-16-Maven Snapshot Repository vs Release Repository.md","localizedDate":"2022年6月1日","excerpt":"\\n<p>在本教程中，我们将解释Maven快照仓库和发布仓库之间的区别。</p>\\n<h2>2. Maven仓库概述</h2>\\n<p>Maven仓库包含了一系列预编译的构件，我们可以在应用程序中作为依赖项使用。对于传统的Java应用程序，这些通常是_.jar_文件。</p>\\n<p>通常有两种类型的仓库：本地和远程。</p>\\n<p>本地仓库是Maven在构建计算机上创建的仓库。它通常位于_$HOME/.m2/repository_目录下。</p>\\n<p>当我们构建应用程序时，Maven会在本地仓库中搜索依赖项。如果找不到某个特定的依赖项，Maven会在远程仓库中搜索（定义在_settings.xml_或_pom.xml_文件中）。此外，它会将依赖项复制到我们的本地仓库以供将来使用。</p>","autoDesc":true}');export{c as comp,m as data};
