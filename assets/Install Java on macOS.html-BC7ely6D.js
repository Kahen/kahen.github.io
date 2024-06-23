import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as t,a as n}from"./app-BXAsn5ym.js";const i={},r=n(`<hr><h1 id="在macos上安装java" tabindex="-1"><a class="header-anchor" href="#在macos上安装java"><span>在macOS上安装Java</span></a></h1><p>Java是由Oracle拥有的一种编程语言，最初由Sun Microsystems在1995年开发。在企业中，Web开发以及开发高度可扩展的解决方案时，Java仍然是首选的开发语言。</p><p>Oracle提供了两种Java版本：Oracle JDK和OpenJDK。Oracle JDK是商业产品，而OpenJDK是开源替代品。</p><p>在这个简短的教程中，我们将讨论在macOS上安装Java的方法。以我们的例子，我们将通过DMG包安装Oracle JDK，并通过Homebrew包管理器安装OpenJDK。</p><h2 id="_2-通过dmg包手动安装" tabindex="-1"><a class="header-anchor" href="#_2-通过dmg包手动安装"><span>2. 通过DMG包手动安装</span></a></h2><p>第一种安装Java的方法是使用DMG包（磁盘映像文件）。DMG包充当虚拟光盘，包含压缩的软件安装文件和其他数据，如可启动映像。</p><p>通过DMG包安装Java涉及一些手动步骤：打开.dmg包并按照屏幕上的指示完成安装过程。</p><p>首先，访问Oracle的官方网站并下载dmg包。默认情况下，页面会跳转到Linux下载标签，因此我们需要<strong>选择macOS标签</strong>并选择正确的dmg安装程序。</p><p>有<strong>两种类型的dmg安装程序可用：一种适用于最新的Mac机器，如M1和M2的ARM芯片，另一种适用于带有Intel芯片的旧款“x64”Mac</strong>。</p><p>以我们的例子，我们将安装x64安装程序，尽管使用ARM安装程序的步骤基本相同：</p><p>下载完成后，双击DMG文件启动安装程序：</p><p>进一步，当介绍标签打开时，点击_继续_：</p><p>点击_继续_在选择目的地：</p><p>现在，点击_安装_开始安装过程：</p><p>这将需要几分钟，所以让它运行：</p><p>现在，安装完成后，_摘要_标签将打开。点击_关闭_按钮：</p><p>我们已经通过DMG包成功在Mac上安装了Java。</p><p>最后，我们需要运行以下命令来检查安装的Java版本：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>% java -version
java version &quot;17.0.10&quot; 2024-01-16 LTS
Java(TM) SE Runtime Environment (build 17.0.10+11-LTS-240)
Java HotSpot(TM) 64-Bit Server VM (build 17.0.10+11-LTS-240, mixed mode, sharing)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在macOS上，<strong>Java的默认位置是_/Library/Java/JavaVirtualMachines/jdk<code>&lt;version&gt;</code>.jdk/Contents/Home/_</strong>，其中_<code>&lt;version&gt;</code>_是我们安装的JDK的版本号。</p><p>此外，我们可以检查已安装的JDK版本列表，以及它们对应的版本号和安装路径：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>% /usr/libexec/java_home -V
Matching Java Virtual Machines (3):
    17.0.10 (x86_64) &quot;Oracle Corporation&quot; - &quot;Java SE 17.0.10&quot; /Library/Java/JavaVirtualMachines/jdk-17.jdk/Contents/Home
    11.0.12 (x86_64) &quot;Oracle Corporation&quot; - &quot;Java SE 11.0.12&quot; /Library/Java/JavaVirtualMachines/jdk-11.0.12.jdk/Contents/Home
    1.8.0_401 (x86_64) &quot;Oracle Corporation&quot; - &quot;Java SE 8&quot; /Library/Java/JavaVirtualMachines/jdk-1.8.jdk/Contents/Home
/Library/Java/JavaVirtualMachines/jdk-17.jdk/Contents/Home
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-使用homebrew包管理器" tabindex="-1"><a class="header-anchor" href="#_3-使用homebrew包管理器"><span>3. 使用Homebrew包管理器</span></a></h2><p>另一种安装Java的方法是通过命令行。为此，我们可以使用Homebrew，这是macOS的流行包管理器。</p><p>让我们看看使用Homebrew安装OpenJDK的步骤。</p><p>在我们开始之前，首先，让我们确保Homebrew已安装并更新：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>% brew update
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>让我们搜索Homebrew公式中的OpenJDK：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>% brew search openjdk
==&gt; Formulae
openjdk ✔ openjdk@11 openjdk@17 ✔ openjdk@8 openj9 openjph openvdb

==&gt; Casks
adoptopenjdk
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以看到这些OpenJDK公式的详细信息（最新版本）或任何特定版本，如openjdk@17：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>% brew info openjdk
或
% brew info openjdk@17
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们可以安装最新版本的Java或特定LTS版本。让我们安装最新版本：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>% brew install openjdk
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果我们想要任何特定版本，例如OpenJDK 17，我们需要运行以下命令：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>% brew install openjdk@17
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>OpenJDK安装在_/usr/local/opt_但不链接到像_/usr/local/bin_或_/Library/Java/JavaVirtualMachines/_这样的地方。因此，我们需要手动创建一个符号链接</strong>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>% sudo ln -sfn /usr/local/opt/openjdk@17/libexec/openjdk.jdk /Library/Java/JavaVirtualMachines/openjdk-17.jdk
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>最后，让我们看看如何检查安装的Java版本：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>% java -version
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们探讨了在macOS机器上安装Java的不同方法。我们可以通过DMG安装或像Homebrew这样的包管理器。此外，一旦Java安装完成，我们可以运行一个Hello World Java程序并探索Java语言。</p><p>评论在文章发布后的30天内开放。对于此日期之后的任何问题，请使用网站上的联系表单。</p>`,43),d=[r];function l(s,o){return t(),a("div",null,d)}const v=e(i,[["render",l],["__file","Install Java on macOS.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/Archive/Install%20Java%20on%20macOS.html","title":"在macOS上安装Java","lang":"zh-CN","frontmatter":{"date":"2024-01-16T00:00:00.000Z","category":["Java","macOS"],"tag":["Java安装","macOS"],"head":[["meta",{"name":"keywords","content":"Java, macOS, 安装, Oracle JDK, OpenJDK, DMG, Homebrew"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/Install%20Java%20on%20macOS.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在macOS上安装Java"}],["meta",{"property":"og:description","content":"在macOS上安装Java Java是由Oracle拥有的一种编程语言，最初由Sun Microsystems在1995年开发。在企业中，Web开发以及开发高度可扩展的解决方案时，Java仍然是首选的开发语言。 Oracle提供了两种Java版本：Oracle JDK和OpenJDK。Oracle JDK是商业产品，而OpenJDK是开源替代品。 在这..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java安装"}],["meta",{"property":"article:tag","content":"macOS"}],["meta",{"property":"article:published_time","content":"2024-01-16T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在macOS上安装Java\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-01-16T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在macOS上安装Java Java是由Oracle拥有的一种编程语言，最初由Sun Microsystems在1995年开发。在企业中，Web开发以及开发高度可扩展的解决方案时，Java仍然是首选的开发语言。 Oracle提供了两种Java版本：Oracle JDK和OpenJDK。Oracle JDK是商业产品，而OpenJDK是开源替代品。 在这..."},"headers":[{"level":2,"title":"2. 通过DMG包手动安装","slug":"_2-通过dmg包手动安装","link":"#_2-通过dmg包手动安装","children":[]},{"level":2,"title":"3. 使用Homebrew包管理器","slug":"_3-使用homebrew包管理器","link":"#_3-使用homebrew包管理器","children":[]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":3.43,"words":1028},"filePathRelative":"posts/baeldung/Archive/Install Java on macOS.md","localizedDate":"2024年1月16日","excerpt":"<hr>\\n<h1>在macOS上安装Java</h1>\\n<p>Java是由Oracle拥有的一种编程语言，最初由Sun Microsystems在1995年开发。在企业中，Web开发以及开发高度可扩展的解决方案时，Java仍然是首选的开发语言。</p>\\n<p>Oracle提供了两种Java版本：Oracle JDK和OpenJDK。Oracle JDK是商业产品，而OpenJDK是开源替代品。</p>\\n<p>在这个简短的教程中，我们将讨论在macOS上安装Java的方法。以我们的例子，我们将通过DMG包安装Oracle JDK，并通过Homebrew包管理器安装OpenJDK。</p>\\n<h2>2. 通过DMG包手动安装</h2>","autoDesc":true}');export{v as comp,m as data};
