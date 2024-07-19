import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as i,a}from"./app-D5kFWV-m.js";const n={},r=a(`<h1 id="如何修复-git-拒绝合并不相关的历史-错误-baeldung-运维教程" tabindex="-1"><a class="header-anchor" href="#如何修复-git-拒绝合并不相关的历史-错误-baeldung-运维教程"><span>如何修复 Git “拒绝合并不相关的历史”错误 | Baeldung 运维教程</span></a></h1><p>如果你在 DevOps 生态系统中有几年的经验，并且有兴趣与社区分享这些经验，请查看我们的 <strong>贡献指南</strong>。</p><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在 Git 中，有时会遇到分支没有共同的历史基础的情况。因此，如果我们尝试合并它们，我们会得到 <em>“拒绝合并不相关的历史”</em> 错误。在本教程中，我们将讨论如何修复这个错误以及如何在未来的项目中避免这个错误。</p><p>让我们看看分支具有不相关历史的情况。 <strong>具有不相关历史基础的最常见原因是彼此独立地开始分支。</strong> 例如，如果我们在本地机器上启动一个新的 Git 项目，然后将其连接到远程 GitHub 分支，这些分支将具有不同的历史基础。</p><p>唯一的例外是其中一个分支没有任何提交。在这种情况下，它们应该没有问题地合并。否则，我们会像以下示例一样得到 <em>“拒绝合并不相关的历史”</em>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ git pull origin main
...
fatal: refusing to merge unrelated histories
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，我们不能使用 <em>git pull</em> 命令来合并具有不常见历史的分支。</p><h2 id="_3-如何修复错误" tabindex="-1"><a class="header-anchor" href="#_3-如何修复错误"><span>3. 如何修复错误</span></a></h2><p>要修复上述错误，我们需要在 <em>git pull <code>&lt;remote&gt;</code> <code>&lt;branch&gt;</code></em> 命令后使用 <em>–allow-unrelated-histories</em> 选项，其中</p><ul><li><em><code>&lt;remote&gt;</code></em> 是远程仓库 URL 或其简称 <em>origin</em></li><li><em><code>&lt;branch&gt;</code></em> 是我们想要合并的分支名称</li></ul><p>例如：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ git pull origin main --allow-unrelated-histories
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><em>–allow-unrelated-histories</em> 选项将告诉 Git 我们允许合并没有共同历史基础的分支，然后应该能够无误地完成合并。 <strong>我们应该注意，对于 Git 版本 2.9 或更旧的版本，这个选项是不必要的，我们的合并应该可以在没有它的情况下工作。</strong> 要检查 Git 版本，我们可以使用 <em>git –version</em> 命令。</p><h2 id="_4-如何在未来避免错误" tabindex="-1"><a class="header-anchor" href="#_4-如何在未来避免错误"><span>4. 如何在未来避免错误</span></a></h2><p>通常，独立于远程仓库创建本地仓库分支并不是最佳实践。更可靠的方法是使用 <em>git clone</em> 命令将远程仓库下载到本地机器，如下所示：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ git clone \`&lt;repo_url&gt;\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这样，我们从远程服务器复制仓库，远程和本地分支的提交历史基础保持相同。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本教程中，我们讨论了当 Git 拒绝合并不相关的历史时如何合并分支。我们首先查看了何时可能发生此错误。然后，我们使用 <em>–allow-unrelated-histories</em> 选项来修复它。最后，我们学习了如何在未来的项目中避免这个错误。</p>`,20),o=[r];function l(s,d){return i(),t("div",null,o)}const m=e(n,[["render",l],["__file","2024-07-15-How to Fix Git  Refusing to Merge Unrelated Histories .html.vue"]]),g=JSON.parse('{"path":"/posts/baeldung/2024-07-15/2024-07-15-How%20to%20Fix%20Git%20%20Refusing%20to%20Merge%20Unrelated%20Histories%20.html","title":"如何修复 Git “拒绝合并不相关的历史”错误 | Baeldung 运维教程","lang":"zh-CN","frontmatter":{"date":"2024-07-15T00:00:00.000Z","category":["DevOps","Git"],"tag":["Git","Merge","Error"],"head":[["meta",{"name":"keywords","content":"Git, Merge, Unrelated Histories, Error, Fix, Tutorial"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-15/2024-07-15-How%20to%20Fix%20Git%20%20Refusing%20to%20Merge%20Unrelated%20Histories%20.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"如何修复 Git “拒绝合并不相关的历史”错误 | Baeldung 运维教程"}],["meta",{"property":"og:description","content":"如何修复 Git “拒绝合并不相关的历史”错误 | Baeldung 运维教程 如果你在 DevOps 生态系统中有几年的经验，并且有兴趣与社区分享这些经验，请查看我们的 贡献指南。 1. 概述 在 Git 中，有时会遇到分支没有共同的历史基础的情况。因此，如果我们尝试合并它们，我们会得到 “拒绝合并不相关的历史” 错误。在本教程中，我们将讨论如何修复..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-15T06:04:55.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Git"}],["meta",{"property":"article:tag","content":"Merge"}],["meta",{"property":"article:tag","content":"Error"}],["meta",{"property":"article:published_time","content":"2024-07-15T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-15T06:04:55.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"如何修复 Git “拒绝合并不相关的历史”错误 | Baeldung 运维教程\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-15T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-15T06:04:55.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"如何修复 Git “拒绝合并不相关的历史”错误 | Baeldung 运维教程 如果你在 DevOps 生态系统中有几年的经验，并且有兴趣与社区分享这些经验，请查看我们的 贡献指南。 1. 概述 在 Git 中，有时会遇到分支没有共同的历史基础的情况。因此，如果我们尝试合并它们，我们会得到 “拒绝合并不相关的历史” 错误。在本教程中，我们将讨论如何修复..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"3. 如何修复错误","slug":"_3-如何修复错误","link":"#_3-如何修复错误","children":[]},{"level":2,"title":"4. 如何在未来避免错误","slug":"_4-如何在未来避免错误","link":"#_4-如何在未来避免错误","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1721023495000,"updatedTime":1721023495000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.43,"words":729},"filePathRelative":"posts/baeldung/2024-07-15/2024-07-15-How to Fix Git  Refusing to Merge Unrelated Histories .md","localizedDate":"2024年7月15日","excerpt":"\\n<p>如果你在 DevOps 生态系统中有几年的经验，并且有兴趣与社区分享这些经验，请查看我们的 <strong>贡献指南</strong>。</p>\\n<h2>1. 概述</h2>\\n<p>在 Git 中，有时会遇到分支没有共同的历史基础的情况。因此，如果我们尝试合并它们，我们会得到 <em>“拒绝合并不相关的历史”</em> 错误。在本教程中，我们将讨论如何修复这个错误以及如何在未来的项目中避免这个错误。</p>\\n<p>让我们看看分支具有不相关历史的情况。 <strong>具有不相关历史基础的最常见原因是彼此独立地开始分支。</strong> 例如，如果我们在本地机器上启动一个新的 Git 项目，然后将其连接到远程 GitHub 分支，这些分支将具有不同的历史基础。</p>","autoDesc":true}');export{m as comp,g as data};
