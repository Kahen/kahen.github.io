import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as a,a as t}from"./app-CNQ479je.js";const i={},l=t(`<h1 id="使用jenv管理多个jdk安装" tabindex="-1"><a class="header-anchor" href="#使用jenv管理多个jdk安装"><span>使用jEnv管理多个JDK安装</span></a></h1><ol><li>引言</li></ol><p>随着Java每次新版本的发布，我们可能需要在环境中管理多个并行版本的软件开发工具包（SDK）。因此，设置和管理_JAVA_HOME_路径变量有时可能非常麻烦。</p><p>在本教程中，我们将看到jEnv如何帮助管理多个不同版本的JDK安装。</p><ol start="2"><li>jEnv是什么？</li></ol><p>jEnv是一个命令行工具，帮助我们管理多个JDK安装。它基本上在我们的shell中设置_JAVA_HOME_，可以全局设置，也可以仅针对当前工作目录或每个shell设置。</p><p>它让我们能够快速切换不同的Java版本。这在处理使用不同Java版本的多个应用程序时特别有用。</p><p>值得注意的是，<strong>jEnv并不为我们安装Java JDK。相反，它只是帮助我们方便地管理多个JDK安装。</strong></p><p>接下来，让我们深入了解jEnv的安装并查看其最常见的命令。</p><ol start="3"><li>安装jEnv</li></ol><p>jEnv支持Linux和MacOS操作系统。此外，它支持Bash和Zsh shell。让我们从终端开始安装它：</p><p>在MacOS上，我们可以简单地使用Homebrew安装jEnv：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ brew install jenv
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在Linux上，我们可以从源代码安装jEnv：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ git clone https://github.com/jenv/jenv.git ~/.jenv
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>接下来，让我们根据使用的shell添加已安装的_jenv_命令到路径。</p><p>为Bash shell添加PATH条目：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ echo &#39;export PATH=&quot;$HOME/.jenv/bin:$PATH&quot;&#39; &gt;&gt; ~/.bash_profile
$ echo &#39;eval &quot;$(jenv init -)&quot;&#39; &gt;&gt; ~/.bash_profile
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>为Zsh shell添加PATH条目：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ echo &#39;export PATH=&quot;$HOME/.jenv/bin:$PATH&quot;&#39; &gt;&gt; ~/.zshrc
$ echo &#39;eval &quot;$(jenv init -)&quot;&#39; &gt;&gt; ~/.zshrc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，为了验证jEnv的安装，我们使用_jenv doctor_命令。在MacOS上，命令将显示以下内容：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ jenv doctor
[OK] 没有设置JAVA_HOME
[ERROR] 路径中的Java二进制文件不在jenv shims中。
[ERROR] 请检查您的路径，或尝试使用/path/to/java/home不是有效的java安装路径。
    PATH : /opt/homebrew/Cellar/jenv/0.5.4/libexec/libexec:/Users/jenv/.jenv/shims:/Users/user/.jenv/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin
[OK] jEnv已正确加载
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这表明_jenv_已正确安装并加载，但Java尚未安装。</p><p>接下来，让我们看看如何安装和管理多个JDK版本。</p><p>让我们从设置一个JDK版本开始。我们可以使用像brew、yum或apt这样的可用包管理器安装JDK。或者，我们也可以下载JDK并将其放在某个文件夹中。</p><p>jEnv的好处是我们不需要通过包管理器安装JDK。我们可以简单地下载一个JDK并将其放在某个文件夹中。</p><p>4.1. 向jEnv添加JDK</p><p>首先，要使用新的JDK与jEnv，我们需要告诉jEnv在哪里找到它。为此，我们使用_jenv add_命令并指定JDK的路径：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ jenv add /Library/Java/JavaVirtualMachines/openjdk-8.jdk/Contents/Home/
openjdk8-1.8.0.332 added
1.8.0.332 added
1.8 added
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这将向jEnv添加JDK 8。每个版本都以三个不同的名称可用。让我们再次运行_jenv doctor_以确认JDK设置：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ jenv doctor
[OK] 没有设置JAVA_HOME
[OK] 路径中的Java二进制文件是jenv shims
[OK] jEnv已正确加载
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以看到jEnv现在识别了配置的JDK。</p><p>接下来，让我们使用_jenv versions_命令列出所有可用的JDK：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ jenv versions
* system (set by /Users/user/.jenv/version)
  1.8
  1.8.0.332
  openjdk64-1.8.0.332
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这列出了所有注册到jEnv的JDK。在我们的例子中，我们配置了JDK 8到jEnv。</p><p>为了演示使用多JDK，让我们再安装一个JDK版本——11，并用jEnv配置它：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ jenv add /Library/Java/JavaVirtualMachines/openjdk-11.jdk/Contents/Home/
openjdk64-11.0.15 added
11.0.15 added
11.0 added
11 added
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在运行_jenv versions_命令将列出两个配置的JDK版本：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ jenv versions
* system (set by /Users/avinb/.jenv/version)
  1.8
  1.8.0.332
  11
  11.0
  11.0.15
  openjdk64-11.0.15
  openjdk64-1.8.0.332
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>显然，我们现在有两个JDK版本配置在jEnv上。</p><p>4.2. 使用jEnv管理JDK版本</p><p>jEnv支持三种类型的JDK配置：</p><ul><li>全局 – 我们在计算机上任何地方输入_java_命令时将使用的JDK。</li><li>本地 – 仅针对特定文件夹配置的JDK。在文件夹中输入java命令将使用本地JDK版本而不是全局JDK版本。</li><li>Shell – 仅用于当前shell实例的JDK。</li></ul><p>首先，让我们检查全局JDK的版本：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ jenv global
system
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>此命令输出“<em>system”</em>，表示系统安装的JDK将用作全局JDK。让我们将全局JDK版本设置为JDK 11：</p><p>现在检查全局版本将显示JDK 11：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ jenv global
11
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们看看如何设置本地JDK版本。</p><p>例如，假设我们在_~/baeldung-project_目录中有一个使用JDK 8的示例项目。让我们_cd_进入此目录并检查此项目的本地JDK版本：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ jenv local
jenv: no local version configured for this directory
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>此错误消息表明我们尚未为此目录设置任何本地JDK版本。在没有本地JDK版本的情况下运行_jenv version_命令将显示全局JDK版本。让我们为此目录设置本地JDK版本：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ jenv local 1.8
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>此命令为_~/baeldung-project_目录设置了本地JDK。设置本地JDK基本上会在当前目录中创建一个名为_.java-version_的文件。该文件包含我们设置的本地JDK版本“<em>1.8″</em>。</p><p>再次在此目录中运行jenv version命令现在将输出JDK 8。让我们检查此目录中设置的本地JDK版本：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ jenv local
1.8
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，要为特定的shell实例设置JDK版本，我们使用_jenv shell_命令：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ jenv shell 1.8
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这将为当前shell实例设置JDK版本，并覆盖已经设置的任何本地和全局JDK版本。</p><p>4.3. 配置jEnv与Maven和Gradle</p><p>众所周知，像Maven和Gradle这样的工具使用系统JDK运行。它不使用jEnv配置的JDK。为了确保jEnv能够正确地与Maven和Gradle一起工作，我们必须启用它们各自的插件。</p><p>对于Maven，我们将启用jEnv的_maven_插件：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ jenv enable-plugin maven
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>同样，对于Gradle，我们将启用jEnv的_gradle_插件：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ jenv enable-plugin gradle
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>现在运行Maven和Gradle命令将使用jEnv特定的JDK版本，而不是系统JDK。</p><p>注意，有时jEnv可能无法选择正确的JDK版本，我们可能会遇到错误。对于这种情况，我们可能需要启用jEnv的_export_插件：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ jenv enable-plugin export
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>换句话说，这个插件将确保_JAVA_HOME_变量被正确设置。</p><p>另外，SDKMAN是管理JDKs等工具的另一种替代工具。</p><ol start="5"><li>结论</li></ol><p>在本文中，我们首先了解了jEnv是什么以及如何安装它。</p><p>然后，我们看到了jEnv如何帮助我们方便地配置和管理不同的JDK安装。接下来，我们看到了如何快速使用全局、本地和特定于shell的JDK版本。这将特别有助于我们处理使用不同JDK版本的多个不同项目。</p><p>最后，我们看到了如何配置jEnv以与构建工具如Maven和Gradle一起工作。</p>`,74),d=[l];function s(v,r){return a(),n("div",null,d)}const p=e(i,[["render",s],["__file","2024-07-08-Managing Multiple JDK Installations With jEnv.html.vue"]]),u=JSON.parse('{"path":"/posts/baeldung/2024-07-08/2024-07-08-Managing%20Multiple%20JDK%20Installations%20With%20jEnv.html","title":"使用jEnv管理多个JDK安装","lang":"zh-CN","frontmatter":{"date":"2024-07-09T00:00:00.000Z","category":["Software Development","Java"],"tag":["jEnv","JDK","Java Development"],"head":[["meta",{"name":"keywords","content":"jEnv, JDK, Java Development, Software Development Kit"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-08/2024-07-08-Managing%20Multiple%20JDK%20Installations%20With%20jEnv.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用jEnv管理多个JDK安装"}],["meta",{"property":"og:description","content":"使用jEnv管理多个JDK安装 引言 随着Java每次新版本的发布，我们可能需要在环境中管理多个并行版本的软件开发工具包（SDK）。因此，设置和管理_JAVA_HOME_路径变量有时可能非常麻烦。 在本教程中，我们将看到jEnv如何帮助管理多个不同版本的JDK安装。 jEnv是什么？ jEnv是一个命令行工具，帮助我们管理多个JDK安装。它基本上在我们..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-08T19:31:31.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"jEnv"}],["meta",{"property":"article:tag","content":"JDK"}],["meta",{"property":"article:tag","content":"Java Development"}],["meta",{"property":"article:published_time","content":"2024-07-09T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-08T19:31:31.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用jEnv管理多个JDK安装\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-09T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-08T19:31:31.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用jEnv管理多个JDK安装 引言 随着Java每次新版本的发布，我们可能需要在环境中管理多个并行版本的软件开发工具包（SDK）。因此，设置和管理_JAVA_HOME_路径变量有时可能非常麻烦。 在本教程中，我们将看到jEnv如何帮助管理多个不同版本的JDK安装。 jEnv是什么？ jEnv是一个命令行工具，帮助我们管理多个JDK安装。它基本上在我们..."},"headers":[],"git":{"createdTime":1720467091000,"updatedTime":1720467091000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.81,"words":1744},"filePathRelative":"posts/baeldung/2024-07-08/2024-07-08-Managing Multiple JDK Installations With jEnv.md","localizedDate":"2024年7月9日","excerpt":"\\n<ol>\\n<li>引言</li>\\n</ol>\\n<p>随着Java每次新版本的发布，我们可能需要在环境中管理多个并行版本的软件开发工具包（SDK）。因此，设置和管理_JAVA_HOME_路径变量有时可能非常麻烦。</p>\\n<p>在本教程中，我们将看到jEnv如何帮助管理多个不同版本的JDK安装。</p>\\n<ol start=\\"2\\">\\n<li>jEnv是什么？</li>\\n</ol>\\n<p>jEnv是一个命令行工具，帮助我们管理多个JDK安装。它基本上在我们的shell中设置_JAVA_HOME_，可以全局设置，也可以仅针对当前工作目录或每个shell设置。</p>\\n<p>它让我们能够快速切换不同的Java版本。这在处理使用不同Java版本的多个应用程序时特别有用。</p>","autoDesc":true}');export{p as comp,u as data};
