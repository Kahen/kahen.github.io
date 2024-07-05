import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-C2EXT5sr.js";const p={},e=t('<h1 id="使用java中的error-prone库捕获常见错误-baeldung" tabindex="-1"><a class="header-anchor" href="#使用java中的error-prone库捕获常见错误-baeldung"><span>使用Java中的Error Prone库捕获常见错误 | Baeldung</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span><strong>1. 引言</strong></span></a></h2><p><strong>确保代码质量对我们应用程序的成功部署至关重要。</strong> 错误和缺陷的存在可能会显著妨碍软件的功能和稳定性。这里有一个有价值的工具可以帮助识别这些错误：Error Prone。</p><p>Error Prone是由Google维护并内部使用的一个库。它帮助Java开发者在编译阶段检测和修复常见的编程错误。</p><p>在本教程中，我们将探索Error Prone库的功能，从安装到定制，以及它在提高代码质量和健壮性方面提供的好处。</p><h2 id="_2-安装" tabindex="-1"><a class="header-anchor" href="#_2-安装"><span><strong>2. 安装</strong></span></a></h2><p>该库可在Maven中央仓库中获取。我们将添加一个新的构建配置，以配置我们的应用程序编译器运行Error Prone检查：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>build</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>plugins</span><span class="token punctuation">&gt;</span></span>``\n        ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>plugin</span><span class="token punctuation">&gt;</span></span>``\n            ````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>````````org.apache.maven.plugins````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>````````\n            ````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>````````maven-compiler-plugin````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>````````\n            ```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>```````3.12.1```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>```````\n            ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>configuration</span><span class="token punctuation">&gt;</span></span>``\n                `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>release</span><span class="token punctuation">&gt;</span></span>`17`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>release</span><span class="token punctuation">&gt;</span></span>`\n                `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>encoding</span><span class="token punctuation">&gt;</span></span>`UTF-8`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>encoding</span><span class="token punctuation">&gt;</span></span>`\n                ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>compilerArgs</span><span class="token punctuation">&gt;</span></span>``\n                    ````````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>arg</span><span class="token punctuation">&gt;</span></span>````````````-XDcompilePolicy=simple````````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>arg</span><span class="token punctuation">&gt;</span></span>````````````\n                    ````````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>arg</span><span class="token punctuation">&gt;</span></span>````````````-Xplugin:ErrorProne````````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>arg</span><span class="token punctuation">&gt;</span></span>````````````\n                ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>compilerArgs</span><span class="token punctuation">&gt;</span></span>``\n                ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>annotationProcessorPaths</span><span class="token punctuation">&gt;</span></span>```\n                    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>path</span><span class="token punctuation">&gt;</span></span>```\n                        ````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>````````com.google.errorprone````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>````````\n                        ````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>````````error_prone_core````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>````````\n                        ```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>```````2.23.0```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>```````\n                    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>path</span><span class="token punctuation">&gt;</span></span>``\n                ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>annotationProcessorPaths</span><span class="token punctuation">&gt;</span></span>``\n            ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>configuration</span><span class="token punctuation">&gt;</span></span>``\n        ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>plugin</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>plugins</span><span class="token punctuation">&gt;</span></span>``\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>build</span><span class="token punctuation">&gt;</span></span>``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于JDK内部的强封装在版本16中增加，我们需要添加一些标志以允许插件运行。一种选择是创建一个新文件<code>.mvn/jvm.config</code>（如果尚不存在）并添加插件所需的标志：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>--add-exports jdk.compiler/com.sun.tools.javac.api<span class="token operator">=</span>ALL-UNNAMED\n--add-exports jdk.compiler/com.sun.tools.javac.file<span class="token operator">=</span>ALL-UNNAMED\n--add-exports jdk.compiler/com.sun.tools.javac.main<span class="token operator">=</span>ALL-UNNAMED\n--add-exports jdk.compiler/com.sun.tools.javac.model<span class="token operator">=</span>ALL-UNNAMED\n--add-exports jdk.compiler/com.sun.tools.javac.parser<span class="token operator">=</span>ALL-UNNAMED\n--add-exports jdk.compiler/com.sun.tools.javac.processing<span class="token operator">=</span>ALL-UNNAMED\n--add-exports jdk.compiler/com.sun.tools.javac.tree<span class="token operator">=</span>ALL-UNNAMED\n--add-exports jdk.compiler/com.sun.tools.javac.util<span class="token operator">=</span>ALL-UNNAMED\n--add-opens jdk.compiler/com.sun.tools.javac.code<span class="token operator">=</span>ALL-UNNAMED\n--add-opens jdk.compiler/com.sun.tools.javac.comp<span class="token operator">=</span>ALL-UNNAMED\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们的<code>maven-compiler-plugin</code>使用外部可执行文件或启用了<code>maven-toolchains-plugin</code>，我们应该将<code>exports</code>和<code>opens</code>作为<code>compilerArgs</code>添加：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>compilerArgs</span><span class="token punctuation">&gt;</span></span>``\n    `<span class="token comment">&lt;!-- ... --&gt;</span>`\n    ````````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>arg</span><span class="token punctuation">&gt;</span></span>````````````-J--add-exports=jdk.compiler/com.sun.tools.javac.api=ALL-UNNAMED````````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>arg</span><span class="token punctuation">&gt;</span></span>````````````\n    ````````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>arg</span><span class="token punctuation">&gt;</span></span>````````````-J--add-exports=jdk.compiler/com.sun.tools.javac.file=ALL-UNNAMED````````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>arg</span><span class="token punctuation">&gt;</span></span>````````````\n    ````````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>arg</span><span class="token punctuation">&gt;</span></span>````````````-J--add-exports=jdk.compiler/com.sun.tools.javac.main=ALL-UNNAMED````````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>arg</span><span class="token punctuation">&gt;</span></span>````````````\n    ````````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>arg</span><span class="token punctuation">&gt;</span></span>````````````-J--add-exports=jdk.compiler/com.sun.tools.javac.model=ALL-UNNAMED````````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>arg</span><span class="token punctuation">&gt;</span></span>````````````\n    ````````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>arg</span><span class="token punctuation">&gt;</span></span>````````````-J--add-exports=jdk.compiler/com.sun.tools.javac.parser=ALL-UNNAMED````````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>arg</span><span class="token punctuation">&gt;</span></span>````````````\n    ````````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>arg</span><span class="token punctuation">&gt;</span></span>````````````-J--add-exports=jdk.compiler/com.sun.tools.javac.processing=ALL-UNNAMED````````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>arg</span><span class="token punctuation">&gt;</span></span>````````````\n    ````````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>arg</span><span class="token punctuation">&gt;</span></span>````````````-J--add-exports=jdk.compiler/com.sun.tools.javac.tree=ALL-UNNAMED````````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>arg</span><span class="token punctuation">&gt;</span></span>````````````\n    ````````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>arg</span><span class="token punctuation">&gt;</span></span>````````````-J--add-exports=jdk.compiler/com.sun.tools.javac.util=ALL-UNNAMED````````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>arg</span><span class="token punctuation">&gt;</span></span>````````````\n    ````````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>arg</span><span class="token punctuation">&gt;</span></span>````````````-J--add-opens=jdk.compiler/com.sun.tools.javac.code=ALL-UNNAMED````````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>arg</span><span class="token punctuation">&gt;</span></span>````````````\n    ````````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>arg</span><span class="token punctuation">&gt;</span></span>````````````-J--add-opens=jdk.compiler/com.sun.tools.javac.comp=ALL-UNNAMED````````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>arg</span><span class="token punctuation">&gt;</span></span>````````````\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>compilerArgs</span><span class="token punctuation">&gt;</span></span>``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-错误模式" tabindex="-1"><a class="header-anchor" href="#_3-错误模式"><span><strong>3. 错误模式</strong></span></a></h2><p>识别和理解常见的错误模式对于维护我们软件的稳定性和可靠性至关重要。通过在我们的开发过程中早期识别这些模式，我们可以积极地实施预防策略并提高我们代码的整体质量。</p><h3 id="_3-1-预定义的错误模式" tabindex="-1"><a class="header-anchor" href="#_3-1-预定义的错误模式"><span><strong>3.1. 预定义的错误模式</strong></span></a></h3><p><strong>插件包含500多个预定义的错误模式。</strong> 其中一个错误是DeadException，我们将以它为例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>args<span class="token punctuation">.</span>length <span class="token operator">==</span> <span class="token number">0</span> <span class="token operator">||</span> args<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">new</span> <span class="token class-name">IllegalArgumentException</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n    <span class="token comment">// 其他使用args[0]的操作</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的代码中，我们要确保我们的程序接收到一个非空参数。否则，我们想要抛出一个_IllegalArgumentException_。然而，由于疏忽，我们只是创建了异常而忘记抛出它。在许多情况下，如果没有错误检查工具，这种情况可能会被忽视。</p><p>我们可以使用_maven clean verify_命令在我们的代码上运行Error Prone检查。如果我们这样做，我们将得到以下编译错误：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>ERROR<span class="token punctuation">]</span> /C:/Dev/incercare_2/src/main/java/org/example/Main.java:<span class="token punctuation">[</span><span class="token number">6,12</span><span class="token punctuation">]</span> <span class="token punctuation">[</span>DeadException<span class="token punctuation">]</span> 异常创建但未抛出\n    <span class="token punctuation">(</span>查看 https://errorprone.info/bugpattern/DeadException<span class="token punctuation">)</span>\n  您是否意味着 <span class="token string">&#39;throw new IllegalArgumentException();&#39;</span>?\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以看到插件不仅检测到了我们的错误，还为我们提供了解决方案。</p><h3 id="_3-2-自定义错误模式" tabindex="-1"><a class="header-anchor" href="#_3-2-自定义错误模式"><span><strong>3.2. 自定义错误模式</strong></span></a></h3><p><strong>Error Prone的另一个显著特性是其支持创建自定义错误检查器。</strong> 这些自定义错误检查器使我们能够将工具定制到我们的特定代码库，并有效地解决特定领域的问题是。</p><p>要创建我们的自定义检查，我们需要初始化一个新项目。让我们称它为_my-bugchecker-plugin_。我们将通过添加错误检查器的配置来开始：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>build</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>plugins</span><span class="token punctuation">&gt;</span></span>``\n        ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>plugin</span><span class="token punctuation">&gt;</span></span>``\n            ````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>````````org.apache.maven.plugins````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>````````\n            ````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>````````maven-compiler-plugin````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>````````\n            ```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>```````3.12.1```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>```````\n            ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>configuration</span><span class="token punctuation">&gt;</span></span>``\n                ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>annotationProcessorPaths</span><span class="token punctuation">&gt;</span></span>```\n                    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>path</span><span class="token punctuation">&gt;</span></span>```\n                        ````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>````````com.google.auto.service````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>````````\n                        ````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>````````auto-service````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>````````\n                        ```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>```````1.0.1```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>```````\n                    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>path</span><span class="token punctuation">&gt;</span></span>``\n                ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>annotationProcessorPaths</span><span class="token punctuation">&gt;</span></span>``\n            ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>configuration</span><span class="token punctuation">&gt;</span></span>``\n        ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>plugin</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>plugins</span><span class="token punctuation">&gt;</span></span>``\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>build</span><span class="token punctuation">&gt;</span></span>``\n\n`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">&gt;</span></span>`\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n        ````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>````````com.google.errorprone````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>````````\n        ````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>````````error_prone_annotation````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>````````\n        ```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>```````2.23.0```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>```````\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n        ````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>````````com.google.errorprone````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>````````\n        ````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>````````error_prone_check_api````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>````````\n        ```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>```````2.23.0```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>```````\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n        ````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>````````com.google.auto.service````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>````````\n        ````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>````````auto-service-annotations````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>````````\n        ```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>```````1.0.1```````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>```````\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencies</span><span class="token punctuation">&gt;</span></span>`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这次我们添加了一些额外的依赖项。正如我们所看到的，除了Error Prone依赖项之外，我们还添加了Google AutoService。Google AutoService是由Google Auto项目开发的开源代码生成器工具。这将发现并加载我们的自定义检查。</p><p>现在我们将创建我们的自定义检查，它将验证我们的代码库中是否有任何空方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@AutoService</span><span class="token punctuation">(</span><span class="token class-name">BugChecker</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>\n<span class="token annotation punctuation">@BugPattern</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;EmptyMethodCheck&quot;</span><span class="token punctuation">,</span> summary <span class="token operator">=</span> <span class="token string">&quot;空方法应该被删除&quot;</span><span class="token punctuation">,</span> severity <span class="token operator">=</span> <span class="token class-name">BugPattern<span class="token punctuation">.</span>SeverityLevel</span><span class="token punctuation">.</span><span class="token constant">ERROR</span><span class="token punctuation">)</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">EmptyMethodChecker</span> <span class="token keyword">extends</span> <span class="token class-name">BugChecker</span> <span class="token keyword">implements</span> <span class="token class-name">BugChecker<span class="token punctuation">.</span>MethodTreeMatcher</span> <span class="token punctuation">{</span>\n\n    <span class="token annotation punctuation">@Override</span>\n    <span class="token keyword">public</span> <span class="token class-name">Description</span> <span class="token function">matchMethod</span><span class="token punctuation">(</span><span class="token class-name">MethodTree</span> methodTree<span class="token punctuation">,</span> <span class="token class-name">VisitorState</span> visitorState<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">if</span> <span class="token punctuation">(</span>methodTree<span class="token punctuation">.</span><span class="token function">getBody</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n          <span class="token punctuation">.</span><span class="token function">getStatements</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n          <span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token keyword">return</span> <span class="token function">describeMatch</span><span class="token punctuation">(</span>methodTree<span class="token punctuation">,</span> <span class="token class-name">SuggestedFix</span><span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span>methodTree<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n        <span class="token keyword">return</span> <span class="token class-name">Description</span><span class="token punctuation">.</span><span class="token constant">NO_MATCH</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先，注解_BugPattern_包含名称、简短摘要和错误的严重性。接下来，BugChecker本身是_MethodTreeMatcher_的实现，因为我们想要匹配具有空主体的方法。最后，_matchMethod()_中的逻辑应该在方法树主体没有任何语句时返回匹配。</p><p><strong>要在另一个项目中使用我们的自定义错误检查器，我们应该将其编译成一个单独的JAR。</strong> 我们通过运行_maven clean install_命令来完成。之后，我们应该通过将其添加到我们主项目的构建配置中的_annotationProcessorPaths_来包含生成的JAR作为依赖项：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>annotationProcessorPaths</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>path</span><span class="token punctuation">&gt;</span></span>```\n        ````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>````````com.google.errorprone````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>````````\n        ````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>````````error_prone_core````````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>````````\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>',31),o=[e];function c(l,i){return s(),a("div",null,o)}const k=n(p,[["render",c],["__file","2024-06-26-Catch Common Mistakes with Error Prone Library in Java.html.vue"]]),g=JSON.parse('{"path":"/posts/baeldung/2024-06-26/2024-06-26-Catch%20Common%20Mistakes%20with%20Error%20Prone%20Library%20in%20Java.html","title":"使用Java中的Error Prone库捕获常见错误 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-06-26T00:00:00.000Z","category":["Java","Error Prone"],"tag":["Error Prone","Java库"],"head":[["meta",{"name":"keywords","content":"Error Prone, Java, 代码质量, 编译期错误检测"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-26/2024-06-26-Catch%20Common%20Mistakes%20with%20Error%20Prone%20Library%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用Java中的Error Prone库捕获常见错误 | Baeldung"}],["meta",{"property":"og:description","content":"使用Java中的Error Prone库捕获常见错误 | Baeldung 1. 引言 确保代码质量对我们应用程序的成功部署至关重要。 错误和缺陷的存在可能会显著妨碍软件的功能和稳定性。这里有一个有价值的工具可以帮助识别这些错误：Error Prone。 Error Prone是由Google维护并内部使用的一个库。它帮助Java开发者在编译阶段检测和..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-26T15:31:02.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Error Prone"}],["meta",{"property":"article:tag","content":"Java库"}],["meta",{"property":"article:published_time","content":"2024-06-26T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-26T15:31:02.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用Java中的Error Prone库捕获常见错误 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-26T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-26T15:31:02.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用Java中的Error Prone库捕获常见错误 | Baeldung 1. 引言 确保代码质量对我们应用程序的成功部署至关重要。 错误和缺陷的存在可能会显著妨碍软件的功能和稳定性。这里有一个有价值的工具可以帮助识别这些错误：Error Prone。 Error Prone是由Google维护并内部使用的一个库。它帮助Java开发者在编译阶段检测和..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 安装","slug":"_2-安装","link":"#_2-安装","children":[]},{"level":2,"title":"3. 错误模式","slug":"_3-错误模式","link":"#_3-错误模式","children":[{"level":3,"title":"3.1. 预定义的错误模式","slug":"_3-1-预定义的错误模式","link":"#_3-1-预定义的错误模式","children":[]},{"level":3,"title":"3.2. 自定义错误模式","slug":"_3-2-自定义错误模式","link":"#_3-2-自定义错误模式","children":[]}]}],"git":{"createdTime":1719415862000,"updatedTime":1719415862000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.6,"words":1381},"filePathRelative":"posts/baeldung/2024-06-26/2024-06-26-Catch Common Mistakes with Error Prone Library in Java.md","localizedDate":"2024年6月26日","excerpt":"\\n<h2><strong>1. 引言</strong></h2>\\n<p><strong>确保代码质量对我们应用程序的成功部署至关重要。</strong> 错误和缺陷的存在可能会显著妨碍软件的功能和稳定性。这里有一个有价值的工具可以帮助识别这些错误：Error Prone。</p>\\n<p>Error Prone是由Google维护并内部使用的一个库。它帮助Java开发者在编译阶段检测和修复常见的编程错误。</p>\\n<p>在本教程中，我们将探索Error Prone库的功能，从安装到定制，以及它在提高代码质量和健壮性方面提供的好处。</p>\\n<h2><strong>2. 安装</strong></h2>","autoDesc":true}');export{k as comp,g as data};
