import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as e,o as i,a as n}from"./app-DpYLEM_u.js";const s={},t=n(`<hr><h1 id="使用spring-native和liberica工具构建原生镜像及其启动速度比较" tabindex="-1"><a class="header-anchor" href="#使用spring-native和liberica工具构建原生镜像及其启动速度比较"><span>使用Spring Native和Liberica工具构建原生镜像及其启动速度比较</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>随着微服务架构的流行，庞大的单体应用程序正在成为过去。Java并没有停滞不前，而是在适应现代需求。例如，Oracle、Red Hat、BellSoft和其他贡献者正在积极开发GraalVM项目。此外，针对微服务的框架Quarkus一年前发布。就Spring Boot而言，VMware已经致力于Spring Native项目两年了。</p><p>由于VMware和BellSoft的合作，Spring Native成为了一个端到端的原生镜像解决方案，其中包括基于GraalVM源代码的Liberica原生镜像工具包。Spring Native和Liberica NIK允许开发人员创建优化资源消耗并最小化启动时间的Spring Boot应用程序的原生可执行文件。</p><p>在本教程中，我们将通过三种方式构建并运行同一个应用程序，了解如何使用原生镜像技术与Spring Boot应用程序——作为一个经典的JAR文件；作为使用Liberica JDK和Spring Native的原生镜像容器；以及使用Liberica原生镜像工具包的原生镜像。然后我们将比较它们的启动速度。在每种情况下，我们都将以Spring Native项目中的petclinic JDBC应用程序为例。</p><h2 id="_2-安装liberica-jdk" tabindex="-1"><a class="header-anchor" href="#_2-安装liberica-jdk"><span>2. 安装Liberica JDK</span></a></h2><p>首先，让我们安装系统的Java运行时。我们可以访问Liberica JDK下载页面并选择我们平台的版本。让我们使用JDK 11，x86 Linux标准JDK包。</p><p>安装Liberica JDK有两种方法。一种是通过包管理器，或者通过下载.tar.gz包（对于Windows是.zip包）。</p><p>后者是一种更高级的方法，但不用担心，它只需要四个步骤。我们首先需要更改到我们想要安装的目录：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> directory_path_name
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在不离开目录的情况下，我们可以运行：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">wget</span> https://download.bell-sw.com/java/11.0.14.1+1/bellsoft-jdk11.0.14.1+1-linux-amd64.tar.gz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果我们没有wget命令，我们可以通过brew install wget（对于Linux和Mac）来安装它。</p><p>这样，我们将解包运行时到我们所在的目录：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">tar</span> <span class="token parameter variable">-zxvf</span> bellsoft-jdk11.0.14.1+1-linux-amd64.tar.gz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>安装完成后，如果我们想要节省磁盘空间，可以删除.tar.gz文件。</p><p>最后，我们需要通过指向Liberica JDK目录来设置_JAVA_HOME_变量：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token builtin class-name">export</span> <span class="token assign-left variable">JAVA_HOME</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">pwd</span><span class="token variable">)</span></span>/jdk-11.0.14.1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>请注意：macOS和Windows用户可以参阅Liberica JDK安装指南获取说明。</strong></p><h2 id="_3-获取spring-native项目" tabindex="-1"><a class="header-anchor" href="#_3-获取spring-native项目"><span>3. 获取Spring Native项目</span></a></h2><p>我们可以通过运行以下命令获取带有petclinic应用程序样本的Spring Native项目：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">git</span> clone https://github.com/spring-projects-experimental/spring-native.git
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_4-构建jar文件" tabindex="-1"><a class="header-anchor" href="#_4-构建jar文件"><span>4. 构建JAR文件</span></a></h2><p>我们希望在整个Spring Native项目中使用一个样本，因此通过运行以下命令进入带有spring petclinic JDBC的目录：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token builtin class-name">export</span> <span class="token assign-left variable">PROJECT_DIR</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">pwd</span><span class="token variable">)</span></span>/spring-native/samples/petclinic-jdbc <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">cd</span> <span class="token variable">$PROJECT_DIR</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>要构建JAR文件，我们可以应用此命令：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>./mvnw clean <span class="token function">install</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这将为我们提供一个24 MB的_target/petclinic-jdbc-0.0.1-SNAPSHOT.jar_。我们将通过运行以下命令来测试它：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">java</span> <span class="token parameter variable">-jar</span> target/petclinic-jdbc-0.0.1-SNAPSHOT.jar
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_5-使用liberica-jdk构建原生镜像容器" tabindex="-1"><a class="header-anchor" href="#_5-使用liberica-jdk构建原生镜像容器"><span>5. 使用Liberica JDK构建原生镜像容器</span></a></h2><p>现在让我们将我们的应用程序容器化。</p><p>确保我们的Docker守护进程正在运行。注意，如果我们使用Windows或macOS x86，我们需要为Docker分配至少8 GB的内存。从Spring petclinic JDBC应用程序目录，我们需要输入以下命令：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>./mvnw spring-boot:build-image
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这将构建一个原生镜像容器，我们可以使用以下命令启动：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-it</span> docker.io/library/petclinic-jdbc:0.0.1-SNAPSHOT
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果我们使用Apple M1，这一步将不可用，因为缺少Docker所需的构建包。然而，最新版本的Liberica原生镜像工具包完全兼容Apple Silicon，因此我们可以进入下一步，使用NIK构建原生镜像。</p><h2 id="_6-使用liberica-nik构建原生镜像" tabindex="-1"><a class="header-anchor" href="#_6-使用liberica-nik构建原生镜像"><span>6. 使用Liberica NIK构建原生镜像</span></a></h2><p>我们将使用Liberica原生镜像工具包构建另一个版本的petclinic原生镜像。下面我们可以找到为Linux安装NIK的步骤。对于macOS或Windows，让我们参考Liberica NIK安装指南。</p><p>我们首先需要更改到我们想要安装的目录：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> directory_path_name
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后我们下载适用于我们平台的Liberica NIK Core。它包含Liberica VM和基于GraalVM的原生镜像工具包，没有额外的语言，因此是构建Java原生镜像的绝佳工具。</p><p>在我们的情况下，我们将获取适用于Linux的Java 11版本的NIK：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">wget</span> https://download.bell-sw.com/vm/22.0.0.2/bellsoft-liberica-vm-openjdk11-22.0.0.2-linux-amd64.tar.gz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后我们通过运行以下命令解包文件：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">tar</span> <span class="token parameter variable">-xzf</span> bellsoft-liberica-vm-openjdk11-22.0.0.2-linux-amd64.tar.gz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>通过指向Liberica NIK来定义$JAVA_HOME变量：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token builtin class-name">export</span> <span class="token assign-left variable">JAVA_HOME</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">pwd</span><span class="token variable">)</span></span>/bellsoft-liberica-vm-openjdk11-22.0.0.2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>现在，我们进入petclinic JDBC应用程序目录：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> <span class="token variable">$PROJECT_DIR</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们可以通过运行以下命令创建原生镜像：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>./mvnw <span class="token parameter variable">-Pnative</span> <span class="token function">install</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>它涉及构建的“native”配置文件，并生成了102.3 MB大小的_target/petclinic-jdbc_二进制文件。</p><h2 id="_7-比较启动时间" tabindex="-1"><a class="header-anchor" href="#_7-比较启动时间"><span>7. 比较启动时间</span></a></h2><p>现在让我们测试我们的应用程序和镜像的速度。我们使用带有SSD的Intel(R) Core(TM) i7-8750H CPU PC来运行它们：</p><ul><li>JAR文件启动大约需要3.3秒</li><li>我们构建的第一个容器启动大约需要0.07秒</li><li>使用NIK Core制作的原生镜像启动时间为0.068秒。</li></ul><h2 id="_8-结论" tabindex="-1"><a class="header-anchor" href="#_8-结论"><span>8. 结论</span></a></h2><p>即使项目仍处于Beta阶段，Spring原生镜像的构建和运行都非常出色。启动时间的减少是巨大的。</p><p>我们可以期待当Spring Native与Liberica原生镜像工具包一起发布时，作为构建原生镜像的端到端解决方案，将获得更好的结果。</p>`,59),l=[t];function r(p,c){return i(),e("div",null,l)}const b=a(s,[["render",r],["__file","2024-07-18-Building Native Images With Spring Native and Liberica Tools With a Speed Comparison.html.vue"]]),v=JSON.parse('{"path":"/posts/baeldung/2024-07-18/2024-07-18-Building%20Native%20Images%20With%20Spring%20Native%20and%20Liberica%20Tools%20With%20a%20Speed%20Comparison.html","title":"使用Spring Native和Liberica工具构建原生镜像及其启动速度比较","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Spring Native","Liberica"],"tag":["Spring Boot","GraalVM","Native Image"],"head":[["meta",{"name":"keywords","content":"Spring Native, Liberica, GraalVM, Native Image"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-18/2024-07-18-Building%20Native%20Images%20With%20Spring%20Native%20and%20Liberica%20Tools%20With%20a%20Speed%20Comparison.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用Spring Native和Liberica工具构建原生镜像及其启动速度比较"}],["meta",{"property":"og:description","content":"使用Spring Native和Liberica工具构建原生镜像及其启动速度比较 1. 概述 随着微服务架构的流行，庞大的单体应用程序正在成为过去。Java并没有停滞不前，而是在适应现代需求。例如，Oracle、Red Hat、BellSoft和其他贡献者正在积极开发GraalVM项目。此外，针对微服务的框架Quarkus一年前发布。就Spring B..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-18T20:31:38.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Spring Boot"}],["meta",{"property":"article:tag","content":"GraalVM"}],["meta",{"property":"article:tag","content":"Native Image"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-18T20:31:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用Spring Native和Liberica工具构建原生镜像及其启动速度比较\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-18T20:31:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用Spring Native和Liberica工具构建原生镜像及其启动速度比较 1. 概述 随着微服务架构的流行，庞大的单体应用程序正在成为过去。Java并没有停滞不前，而是在适应现代需求。例如，Oracle、Red Hat、BellSoft和其他贡献者正在积极开发GraalVM项目。此外，针对微服务的框架Quarkus一年前发布。就Spring B..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 安装Liberica JDK","slug":"_2-安装liberica-jdk","link":"#_2-安装liberica-jdk","children":[]},{"level":2,"title":"3. 获取Spring Native项目","slug":"_3-获取spring-native项目","link":"#_3-获取spring-native项目","children":[]},{"level":2,"title":"4. 构建JAR文件","slug":"_4-构建jar文件","link":"#_4-构建jar文件","children":[]},{"level":2,"title":"5. 使用Liberica JDK构建原生镜像容器","slug":"_5-使用liberica-jdk构建原生镜像容器","link":"#_5-使用liberica-jdk构建原生镜像容器","children":[]},{"level":2,"title":"6. 使用Liberica NIK构建原生镜像","slug":"_6-使用liberica-nik构建原生镜像","link":"#_6-使用liberica-nik构建原生镜像","children":[]},{"level":2,"title":"7. 比较启动时间","slug":"_7-比较启动时间","link":"#_7-比较启动时间","children":[]},{"level":2,"title":"8. 结论","slug":"_8-结论","link":"#_8-结论","children":[]}],"git":{"createdTime":1721334698000,"updatedTime":1721334698000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.89,"words":1467},"filePathRelative":"posts/baeldung/2024-07-18/2024-07-18-Building Native Images With Spring Native and Liberica Tools With a Speed Comparison.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>使用Spring Native和Liberica工具构建原生镜像及其启动速度比较</h1>\\n<h2>1. 概述</h2>\\n<p>随着微服务架构的流行，庞大的单体应用程序正在成为过去。Java并没有停滞不前，而是在适应现代需求。例如，Oracle、Red Hat、BellSoft和其他贡献者正在积极开发GraalVM项目。此外，针对微服务的框架Quarkus一年前发布。就Spring Boot而言，VMware已经致力于Spring Native项目两年了。</p>\\n<p>由于VMware和BellSoft的合作，Spring Native成为了一个端到端的原生镜像解决方案，其中包括基于GraalVM源代码的Liberica原生镜像工具包。Spring Native和Liberica NIK允许开发人员创建优化资源消耗并最小化启动时间的Spring Boot应用程序的原生可执行文件。</p>","autoDesc":true}');export{b as comp,v as data};
