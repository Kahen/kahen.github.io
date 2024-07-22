import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as a,a as n}from"./app-BMOUrRO4.js";const o={},i=n(`<h1 id="在windows上安装openjdk" tabindex="-1"><a class="header-anchor" href="#在windows上安装openjdk"><span>在Windows上安装OpenJDK</span></a></h1><p>Java在现代软件开发中扮演着关键角色，为许多应用程序和系统提供支持。为了在我们的机器上利用Java的力量，我们需要安装Java开发工具包（JDK）。虽然Oracle JDK是一个流行的选择，但OpenJDK提供了一个具有相似功能的开源替代品。</p><p>在本文中，我们将探讨在Windows环境中安装OpenJDK的各种方法，以满足不同的偏好和需求。</p><h2 id="_2-手动安装" tabindex="-1"><a class="header-anchor" href="#_2-手动安装"><span>2. 手动安装</span></a></h2><p>这种方法涉及直接从官方网站或受信任的存储库（如AdoptOpenJDK）下载OpenJDK发行版。</p><p>下载后，将归档的内容解压到我们机器上的首选位置。配置环境变量，如_PATH_和_JAVA_HOME_，指向OpenJDK安装的目录至关重要。让我们通过访问控制面板并导航到_系统设置_来继续操作：</p><p>选择_高级_系统设置将弹出一个对话框：</p><p>现在，让我们通过点击环境变量来查看系统和用户变量。在这里，我们将修改_PATH_变量，并包含_JAVA_HOME_变量。_JAVA_HOME_变量应该指示OpenJDK的安装目录，而_PATH_变量应该指向JDK的bin目录。</p><p>在我们的例子中，<em>JAVA_HOME_将是_C:\\Program Files\\Java\\jdk-21.0.2</em>，而_PATH_将是_C:\\Program Files\\Java\\jdk-21.0.2\\bin_。</p><p>最后，我们可以通过在命令提示符中运行以下命令来确认安装成功：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>&gt; java -version
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>运行上述命令后，命令提示符将显示类似的输出：</p><h2 id="_3-chocolatey包管理器" tabindex="-1"><a class="header-anchor" href="#_3-chocolatey包管理器"><span>3. Chocolatey包管理器</span></a></h2><p>Chocolatey是Windows的一个流行包管理器，它简化了软件包的安装和管理。它提供了一个命令行界面（CLI），允许用户轻松搜索、安装和卸载软件包，类似于Ubuntu上的apt或macOS上的Homebrew。</p><p>在我们继续之前，我们需要首先在我们的机器上安装Chocolatey。让我们打开一个提升的命令并运行以下命令：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>&gt; Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString(&#39;https://community.chocolatey.org/install.ps1&#39;))
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>一旦Chocolatey安装完成，我们可以使用它来安装OpenJDK。运行以下命令将安装Java：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>&gt; choco install openjdk
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_4-scoop包管理器" tabindex="-1"><a class="header-anchor" href="#_4-scoop包管理器"><span>4. Scoop包管理器</span></a></h2><p>与Chocolatey类似，Scoop是另一个专门为Windows设计的包管理器。Scoop面向个人用户而非系统范围的安装。它在用户的主目录中安装包，这不需要管理员权限。</p><p>要开始使用Scoop，我们首先必须安装它：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>&gt; Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
&gt; Invoke-RestMethod -Uri https://get.scoop.sh | Invoke-Expression
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，要使用Scoop安装OpenJDK，我们需要以管理员身份打开PowerShell并执行以下命令：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>&gt; scoop bucket add java
&gt; scoop install openjdk
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-使用第三方安装程序" tabindex="-1"><a class="header-anchor" href="#_5-使用第三方安装程序"><span>5. 使用第三方安装程序</span></a></h2><p>一些第三方工具和实用程序为Windows上的OpenJDK提供了简化的安装程序。例如，SDKMAN!和WinGet等工具提供了一个易于使用的界面，用于管理软件安装，包括OpenJDK。</p><p>如果我们更倾向于具有附加功能和自定义选项的更流畅的安装过程，我们可以探索这些选项。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们探讨了在Windows机器上安装OpenJDK的不同方式。我们可以选择手动安装，使用Chocolatey或Scoop等包管理器，或第三方安装程序，每种方法在简单性、定制性和自动化方面都提供了其优势。</p><p>我们可以选择最符合我们偏好和工作流程的方法。</p>`,30),p=[i];function s(l,d){return a(),t("div",null,p)}const h=e(o,[["render",s],["__file","2024-06-22-Install OpenJDK on Windows.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-06-22/2024-06-22-Install%20OpenJDK%20on%20Windows.html","title":"在Windows上安装OpenJDK","lang":"zh-CN","frontmatter":{"date":"2024-06-22T00:00:00.000Z","category":["OpenJDK","Windows"],"tag":["Java","JDK","安装"],"head":[["meta",{"name":"keywords","content":"OpenJDK, Windows, Java, JDK, 安装, 教程"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-22/2024-06-22-Install%20OpenJDK%20on%20Windows.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Windows上安装OpenJDK"}],["meta",{"property":"og:description","content":"在Windows上安装OpenJDK Java在现代软件开发中扮演着关键角色，为许多应用程序和系统提供支持。为了在我们的机器上利用Java的力量，我们需要安装Java开发工具包（JDK）。虽然Oracle JDK是一个流行的选择，但OpenJDK提供了一个具有相似功能的开源替代品。 在本文中，我们将探讨在Windows环境中安装OpenJDK的各种方法..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-22T02:38:38.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"JDK"}],["meta",{"property":"article:tag","content":"安装"}],["meta",{"property":"article:published_time","content":"2024-06-22T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-22T02:38:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Windows上安装OpenJDK\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-22T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-22T02:38:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Windows上安装OpenJDK Java在现代软件开发中扮演着关键角色，为许多应用程序和系统提供支持。为了在我们的机器上利用Java的力量，我们需要安装Java开发工具包（JDK）。虽然Oracle JDK是一个流行的选择，但OpenJDK提供了一个具有相似功能的开源替代品。 在本文中，我们将探讨在Windows环境中安装OpenJDK的各种方法..."},"headers":[{"level":2,"title":"2. 手动安装","slug":"_2-手动安装","link":"#_2-手动安装","children":[]},{"level":2,"title":"3. Chocolatey包管理器","slug":"_3-chocolatey包管理器","link":"#_3-chocolatey包管理器","children":[]},{"level":2,"title":"4. Scoop包管理器","slug":"_4-scoop包管理器","link":"#_4-scoop包管理器","children":[]},{"level":2,"title":"5. 使用第三方安装程序","slug":"_5-使用第三方安装程序","link":"#_5-使用第三方安装程序","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1719023918000,"updatedTime":1719023918000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.04,"words":913},"filePathRelative":"posts/baeldung/2024-06-22/2024-06-22-Install OpenJDK on Windows.md","localizedDate":"2024年6月22日","excerpt":"\\n<p>Java在现代软件开发中扮演着关键角色，为许多应用程序和系统提供支持。为了在我们的机器上利用Java的力量，我们需要安装Java开发工具包（JDK）。虽然Oracle JDK是一个流行的选择，但OpenJDK提供了一个具有相似功能的开源替代品。</p>\\n<p>在本文中，我们将探讨在Windows环境中安装OpenJDK的各种方法，以满足不同的偏好和需求。</p>\\n<h2>2. 手动安装</h2>\\n<p>这种方法涉及直接从官方网站或受信任的存储库（如AdoptOpenJDK）下载OpenJDK发行版。</p>\\n<p>下载后，将归档的内容解压到我们机器上的首选位置。配置环境变量，如_PATH_和_JAVA_HOME_，指向OpenJDK安装的目录至关重要。让我们通过访问控制面板并导航到_系统设置_来继续操作：</p>","autoDesc":true}');export{h as comp,m as data};
