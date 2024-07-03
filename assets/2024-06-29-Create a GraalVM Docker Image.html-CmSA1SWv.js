import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as e}from"./app-D1jsmMBg.js";const p={},t=e(`<h1 id="创建一个graalvm-docker镜像" tabindex="-1"><a class="header-anchor" href="#创建一个graalvm-docker镜像"><span>创建一个GraalVM Docker镜像</span></a></h1><p>GraalVM使用其Ahead-Of-Time (AOT)编译器将Java应用程序编译成机器可执行文件。这些可执行文件直接在目标机器上执行，无需使用Just-In-Time (JIT)编译器。GraalVM生成的二进制文件更小，具有快速启动时间，并在不需要预热的情况下提供峰值性能。此外，这些可执行文件的内存占用和CPU使用率比在JVM上运行的应用程序要低。</p><p>Docker允许我们将软件组件打包成Docker镜像，并作为Docker容器运行。Docker容器包含了应用程序运行所需的一切，包括应用程序代码、运行时、系统工具和库。</p><p>在本教程中，我们将讨论如何为Java应用程序创建GraalVM原生镜像。然后，我们将讨论如何使用这个原生镜像作为Docker镜像，并将其作为Docker容器运行。</p><p>原生镜像是一种技术，它将Java代码提前编译成原生可执行文件。这个原生可执行文件只包含在运行时需要的代码。这包括应用程序类、标准库类、语言运行时，以及从JDK静态链接的原生代码。</p><p>原生镜像构建器（<em>native-image</em>）扫描应用程序类和其他元数据，以创建特定于操作系统和架构的二进制文件。_native-image_工具执行静态应用程序代码分析，以确定在应用程序运行时可以访问的类和方法。然后，它将所需的类、方法和资源编译成一个二进制可执行文件。</p><p>原生镜像可执行文件有几个好处：</p><ul><li>作为一个原生镜像构建器，它只编译运行时需要的资源，因此可执行文件的大小很小。</li><li>原生可执行文件具有极快的启动时间，因为它们直接在目标机器上执行，无需JIT编译器。</li><li>由于它只打包所需的应用程序资源，因此攻击面较小。</li><li>适用于打包在轻量级容器镜像中，例如Docker镜像，以实现快速高效的部署。</li></ul><p>在本节中，我们将为Spring Boot应用程序构建GraalVM原生镜像。首先，我们需要安装GraalVM并设置_JAVA_HOME_环境变量。其次，创建一个带有Spring Web和GraalVM原生支持依赖项的Spring Boot应用程序：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
    \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`\`org.springframework.boot\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`\`
    \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`\`spring-boot-starter-web\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`\`
    \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\`\`3.1.5\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\`\`
\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们还需要添加以下插件以支持GraalVM原生：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>build</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>plugins</span><span class="token punctuation">&gt;</span></span>\`
        \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>plugin</span><span class="token punctuation">&gt;</span></span>\`
            \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`\`org.graalvm.buildtools\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`\`
            \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`\`native-maven-plugin\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`\`
            \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\`\`0.9.27\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\`\`
        \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>plugin</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>plugins</span><span class="token punctuation">&gt;</span></span>\`
\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>build</span><span class="token punctuation">&gt;</span></span>\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个应用程序包含一个示例rest控制器：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>
<span class="token keyword">class</span> <span class="token class-name">HelloController</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@GetMapping</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">hello</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">&quot;Hello GraalVM&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们使用Maven命令构建原生可执行文件：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token variable">$mvn</span> <span class="token parameter variable">-Pnative</span> native:compile
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>_native-maven-plugin_构建GraalVM原生镜像。由于GraalVM原生镜像编译器执行静态代码分析，构建时间比常规Java应用程序编译要长。</p><p>以下是GraalVM编译的输出：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span>
GraalVM Native Image: Generating <span class="token string">&#39;springboot-graalvm-docker&#39;</span> <span class="token punctuation">(</span>executable<span class="token punctuation">)</span><span class="token punctuation">..</span>.
<span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span>
<span class="token punctuation">[</span><span class="token number">1</span>/8<span class="token punctuation">]</span> Initializing<span class="token punctuation">..</span>. <span class="token punctuation">(</span><span class="token number">42</span>.7s @ <span class="token number">0</span>.15GB<span class="token punctuation">)</span>
Java version: <span class="token number">17.0</span>.8+9-LTS, vendor version: Oracle GraalVM <span class="token number">17.0</span>.8+9.1
Graal compiler: optimization level: <span class="token number">2</span>, target machine: x86-64-v3, PGO: ML-inferred
C compiler: gcc <span class="token punctuation">(</span>linux, x86_64, <span class="token number">11.3</span>.0<span class="token punctuation">)</span>
Garbage collector: Serial GC <span class="token punctuation">(</span>max heap size: <span class="token number">80</span>% of RAM<span class="token punctuation">)</span>

// 为清晰起见省略了部分内容

<span class="token punctuation">[</span><span class="token number">2</span>/8<span class="token punctuation">]</span> Performing analysis<span class="token punctuation">..</span>. <span class="token punctuation">[</span>******<span class="token punctuation">]</span> <span class="token punctuation">(</span><span class="token number">234</span>.6s @ <span class="token number">1</span>.39GB<span class="token punctuation">)</span>
<span class="token number">15,543</span> <span class="token punctuation">(</span><span class="token number">90.25</span>%<span class="token punctuation">)</span> of <span class="token number">17,222</span> types reachable
<span class="token number">25,854</span> <span class="token punctuation">(</span><span class="token number">67.59</span>%<span class="token punctuation">)</span> of <span class="token number">38,251</span> fields reachable
<span class="token number">84,701</span> <span class="token punctuation">(</span><span class="token number">65.21</span>%<span class="token punctuation">)</span> of <span class="token number">129,883</span> methods reachable
<span class="token number">4,906</span> types, <span class="token number">258</span> fields, and <span class="token number">4,984</span> methods registered <span class="token keyword">for</span> reflection
<span class="token number">64</span> types, <span class="token number">70</span> fields, and <span class="token number">55</span> methods registered <span class="token keyword">for</span> JNI access
<span class="token number">4</span> native libraries: dl, pthread, rt, z
<span class="token punctuation">[</span><span class="token number">3</span>/8<span class="token punctuation">]</span> Building universe<span class="token punctuation">..</span>. <span class="token punctuation">(</span><span class="token number">14</span>.7s @ <span class="token number">2</span>.03GB<span class="token punctuation">)</span>
<span class="token punctuation">[</span><span class="token number">4</span>/8<span class="token punctuation">]</span> Parsing methods<span class="token punctuation">..</span>. <span class="token punctuation">[</span>*******<span class="token punctuation">]</span> <span class="token punctuation">(</span><span class="token number">55</span>.6s @ <span class="token number">2</span>.05GB<span class="token punctuation">)</span>
<span class="token punctuation">[</span><span class="token number">5</span>/8<span class="token punctuation">]</span> Inlining methods<span class="token punctuation">..</span>. <span class="token punctuation">[</span>***<span class="token punctuation">]</span> <span class="token punctuation">(</span><span class="token number">4</span>.9s @ <span class="token number">2</span>.01GB<span class="token punctuation">)</span>
<span class="token punctuation">[</span><span class="token number">6</span>/8<span class="token punctuation">]</span> Compiling methods<span class="token punctuation">..</span>. <span class="token punctuation">[</span>**********<span class="token punctuation">]</span>
<span class="token punctuation">[</span><span class="token number">6</span>/8<span class="token punctuation">]</span> Compiling methods<span class="token punctuation">..</span>. <span class="token punctuation">[</span>*******************<span class="token punctuation">]</span> <span class="token punctuation">(</span><span class="token number">385</span>.2s @ <span class="token number">3</span>.02GB<span class="token punctuation">)</span>
<span class="token punctuation">[</span><span class="token number">7</span>/8<span class="token punctuation">]</span> Layouting methods<span class="token punctuation">..</span>. <span class="token punctuation">[</span>****<span class="token punctuation">]</span> <span class="token punctuation">(</span><span class="token number">14</span>.0s @ <span class="token number">2</span>.00GB<span class="token punctuation">)</span>
<span class="token punctuation">[</span><span class="token number">8</span>/8<span class="token punctuation">]</span> Creating image<span class="token punctuation">..</span>. <span class="token punctuation">[</span>*****<span class="token punctuation">]</span> <span class="token punctuation">(</span><span class="token number">30</span>.7s @ <span class="token number">2</span>.72GB<span class="token punctuation">)</span>
<span class="token number">48</span>.81MB <span class="token punctuation">(</span><span class="token number">58.93</span>%<span class="token punctuation">)</span> <span class="token keyword">for</span> code area: <span class="token number">48,318</span> compilation <span class="token function">units</span>
<span class="token number">30</span>.92MB <span class="token punctuation">(</span><span class="token number">37.33</span>%<span class="token punctuation">)</span> <span class="token keyword">for</span> image heap: <span class="token number">398,288</span> objects and <span class="token number">175</span> resources
<span class="token number">3</span>.10MB <span class="token punctuation">(</span> <span class="token number">3.75</span>%<span class="token punctuation">)</span> <span class="token keyword">for</span> other data
<span class="token number">82</span>.83MB <span class="token keyword">in</span> total

// 为清晰起见省略了部分内容

Finished generating <span class="token string">&#39;springboot-graalvm-docker&#39;</span> <span class="token keyword">in</span> 13m 7s.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上述编译输出中，以下是几个关键点：</p><ul><li>编译使用GraalVM Java编译器编译应用程序</li><li>编译器对类型、字段和方法进行可达性检查</li><li>接下来，它构建原生执行文件，并显示可执行文件的大小和编译所需的时间</li></ul><p>构建成功后，我们可以在目标目录中找到原生可执行文件。这个可执行文件可以在命令行中执行。</p><p>在本节中，我们将为上一步生成的原生可执行文件开发Docker镜像。</p><p>让我们创建以下Dockerfile：</p><div class="language-docker line-numbers-mode" data-ext="docker" data-title="docker"><pre class="language-docker"><code><span class="token instruction"><span class="token keyword">FROM</span> ubuntu:jammy</span>
<span class="token instruction"><span class="token keyword">COPY</span> target/springboot-graalvm-docker /springboot-graalvm-docker</span>
<span class="token instruction"><span class="token keyword">CMD</span> [<span class="token string">&quot;/springboot-graalvm-docker&quot;</span>]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们使用以下命令构建Docker镜像：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token variable">$docker</span> build <span class="token parameter variable">-t</span> springboot-graalvm-docker <span class="token builtin class-name">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>构建成功后，我们可以注意到_springboot-graalvm-docker_ Docker镜像可用：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token variable">$docker</span> images <span class="token operator">|</span> <span class="token function">grep</span> springboot-graalvm-docker
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们可以使用以下命令执行此镜像：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token variable">$docker</span> run <span class="token parameter variable">-p</span> <span class="token number">8080</span>:8080 springboot-graalvm-docker
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上述命令启动容器，我们可以注意到Spring Boot启动日志：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>// 省略了部分内容以清晰
*** INFO <span class="token number">1</span> --- <span class="token punctuation">[</span> main<span class="token punctuation">]</span> w.s.c.ServletWebServerApplicationContext <span class="token builtin class-name">:</span> Root WebApplicationContext: initialization completed <span class="token keyword">in</span> <span class="token number">14</span> ms
*** INFO <span class="token number">1</span> --- <span class="token punctuation">[</span> main<span class="token punctuation">]</span> o.s.b.w.embedded.tomcat.TomcatWebServer  <span class="token builtin class-name">:</span> Tomcat started on port<span class="token punctuation">(</span>s<span class="token punctuation">)</span>: <span class="token number">8080</span> <span class="token punctuation">(</span>http<span class="token punctuation">)</span> with context path <span class="token string">&#39;&#39;</span>
*** INFO <span class="token number">1</span> --- <span class="token punctuation">[</span> main<span class="token punctuation">]</span> c.b.g.GraalvmDockerImageApplication      <span class="token builtin class-name">:</span> Started GraalvmDockerImageApplication <span class="token keyword">in</span> <span class="token number">0.043</span> seconds <span class="token punctuation">(</span>process running <span class="token keyword">for</span> <span class="token number">0.046</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>应用程序在43毫秒内启动</strong>。我们可以通过访问以下命令来访问REST端点：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token variable">$curl</span> localhost:8080
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>它显示以下输出：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>Hello GraalVM
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="结论" tabindex="-1"><a class="header-anchor" href="#结论"><span>结论</span></a></h2><p>在本文中，我们为GraalVM原生可执行文件构建了一个Docker镜像。</p><p>我们首先讨论了GraalVM原生镜像及其优势。它适用于需要首次启动和低内存占用的使用场景。接下来，我们使用GraalVM原生镜像编译器生成了Spring Boot应用程序的原生可执行文件。最后，我们开发了一个带有原生可执行文件的Docker镜像，并使用镜像启动了一个Docker容器。</p><p>该应用程序的源代码可在GitHub上找到。</p>`,41),o=[t];function l(c,r){return s(),n("div",null,o)}const k=a(p,[["render",l],["__file","2024-06-29-Create a GraalVM Docker Image.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-06-29/2024-06-29-Create%20a%20GraalVM%20Docker%20Image.html","title":"创建一个GraalVM Docker镜像","lang":"zh-CN","frontmatter":{"date":"2024-06-30T00:00:00.000Z","category":["Java","GraalVM"],"tag":["Docker","Native Image"],"head":[["meta",{"name":"keywords","content":"Java, GraalVM, Docker, Native Image, AOT, JIT"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-29/2024-06-29-Create%20a%20GraalVM%20Docker%20Image.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"创建一个GraalVM Docker镜像"}],["meta",{"property":"og:description","content":"创建一个GraalVM Docker镜像 GraalVM使用其Ahead-Of-Time (AOT)编译器将Java应用程序编译成机器可执行文件。这些可执行文件直接在目标机器上执行，无需使用Just-In-Time (JIT)编译器。GraalVM生成的二进制文件更小，具有快速启动时间，并在不需要预热的情况下提供峰值性能。此外，这些可执行文件的内存占用..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-29T16:35:43.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Docker"}],["meta",{"property":"article:tag","content":"Native Image"}],["meta",{"property":"article:published_time","content":"2024-06-30T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-29T16:35:43.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"创建一个GraalVM Docker镜像\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-30T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-29T16:35:43.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"创建一个GraalVM Docker镜像 GraalVM使用其Ahead-Of-Time (AOT)编译器将Java应用程序编译成机器可执行文件。这些可执行文件直接在目标机器上执行，无需使用Just-In-Time (JIT)编译器。GraalVM生成的二进制文件更小，具有快速启动时间，并在不需要预热的情况下提供峰值性能。此外，这些可执行文件的内存占用..."},"headers":[{"level":2,"title":"结论","slug":"结论","link":"#结论","children":[]}],"git":{"createdTime":1719678943000,"updatedTime":1719678943000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.06,"words":1519},"filePathRelative":"posts/baeldung/2024-06-29/2024-06-29-Create a GraalVM Docker Image.md","localizedDate":"2024年6月30日","excerpt":"\\n<p>GraalVM使用其Ahead-Of-Time (AOT)编译器将Java应用程序编译成机器可执行文件。这些可执行文件直接在目标机器上执行，无需使用Just-In-Time (JIT)编译器。GraalVM生成的二进制文件更小，具有快速启动时间，并在不需要预热的情况下提供峰值性能。此外，这些可执行文件的内存占用和CPU使用率比在JVM上运行的应用程序要低。</p>\\n<p>Docker允许我们将软件组件打包成Docker镜像，并作为Docker容器运行。Docker容器包含了应用程序运行所需的一切，包括应用程序代码、运行时、系统工具和库。</p>\\n<p>在本教程中，我们将讨论如何为Java应用程序创建GraalVM原生镜像。然后，我们将讨论如何使用这个原生镜像作为Docker镜像，并将其作为Docker容器运行。</p>","autoDesc":true}');export{k as comp,d as data};
