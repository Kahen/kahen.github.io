import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-uizvaz9h.js";const p={},e=t(`<h1 id="从失败点开始恢复maven构建" tabindex="-1"><a class="header-anchor" href="#从失败点开始恢复maven构建"><span>从失败点开始恢复Maven构建</span></a></h1><p>在这个教程中，我们将学习如何在Maven构建失败后恢复它。我们将看到如何跳过已经成功构建的模块。因此，我们将直接跳到问题出现的地方。</p><h2 id="示例设置" tabindex="-1"><a class="header-anchor" href="#示例设置"><span>示例设置</span></a></h2><p>让我们构建一个多模块Maven项目。我们称父模块为_resume-from_，两个子模块为_lib_和_business_。为了演示，我们将_lib_项目留空。然而，<em>business_项目包含一个单独的_src/main/java/Main.java_文件，其中包含一个_Hello World</em>。现在让我们在_business_模块中添加_lib_的依赖：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`com.baeldung\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`lib\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\`1.0-SNAPSHOT\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\`
\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>到目前为止，项目的内容是正确的，所以我们可以成功构建它：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ mvn clean <span class="token function">install</span>
<span class="token punctuation">[</span><span class="token punctuation">..</span>.<span class="token punctuation">]</span> 
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> Reactor Summary <span class="token keyword">for</span> resume-from <span class="token number">1.0</span>-SNAPSHOT:
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> resume-from <span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span> SUCCESS <span class="token punctuation">[</span>  <span class="token number">1.749</span> s<span class="token punctuation">]</span>
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> lib <span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span> SUCCESS <span class="token punctuation">[</span>  <span class="token number">2.021</span> s<span class="token punctuation">]</span>
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> business <span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span>. SUCCESS <span class="token punctuation">[</span>  <span class="token number">0.991</span> s<span class="token punctuation">]</span>
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> ------------------------------------------------------------------------ 
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> BUILD SUCCESS
<span class="token punctuation">[</span><span class="token punctuation">..</span>.<span class="token punctuation">]</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="运行-install-阶段时" tabindex="-1"><a class="header-anchor" href="#运行-install-阶段时"><span>运行_install_阶段时</span></a></h2><p>现在让我们从_Main.java_文件中删除分号。这破坏了_business_子模块的构建：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ mvn clean <span class="token function">install</span>
<span class="token punctuation">[</span><span class="token punctuation">..</span>.<span class="token punctuation">]</span> 
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> Reactor Summary <span class="token keyword">for</span> resume-from <span class="token number">1.0</span>-SNAPSHOT:
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> resume-from <span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span> SUCCESS <span class="token punctuation">[</span>  <span class="token number">1.186</span> s<span class="token punctuation">]</span>
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> lib <span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span> SUCCESS <span class="token punctuation">[</span>  <span class="token number">0.984</span> s<span class="token punctuation">]</span>
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> business <span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span>. FAILURE <span class="token punctuation">[</span>  <span class="token number">0.334</span> s<span class="token punctuation">]</span>
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> ------------------------------------------------------------------------ 
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> BUILD FAILURE
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> ------------------------------------------------------------------------ 
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> Total time:  <span class="token number">2.809</span> s
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> Finished at: <span class="token number">2023</span>-06-20T16:15:13+02:00
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> ------------------------------------------------------------------------ 
<span class="token punctuation">[</span>ERROR<span class="token punctuation">]</span> Failed to execute goal org.apache.maven.plugins:maven-compiler-plugin:3.8.1:compile <span class="token punctuation">(</span>default-compile<span class="token punctuation">)</span> on project business: Compilation failure
<span class="token punctuation">[</span>ERROR<span class="token punctuation">]</span> <span class="token punctuation">[</span><span class="token punctuation">..</span>.<span class="token punctuation">]</span>/resume-from/business/src/main/java/Main.java:<span class="token punctuation">[</span><span class="token number">4,43</span><span class="token punctuation">]</span> <span class="token string">&#39;;&#39;</span> expected
<span class="token punctuation">[</span><span class="token punctuation">..</span>.<span class="token punctuation">]</span>
<span class="token punctuation">[</span>ERROR<span class="token punctuation">]</span> After correcting the problems, you can resume the build with the <span class="token builtin class-name">command</span>
<span class="token punctuation">[</span>ERROR<span class="token punctuation">]</span>   mvn \`<span class="token variable"><span class="token variable">\`</span><span class="token operator">&lt;</span>args<span class="token operator">&gt;</span><span class="token variable">\`</span></span>\` <span class="token parameter variable">-rf</span> :business
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于_lib_子模块已成功构建，修复问题后跳过它的构建将是很好的。正如Maven的错误消息所说，我们可以使用_rf_选项从给定模块恢复反应器。让我们修复_Main.java_文件并尝试这个：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ mvn clean <span class="token function">install</span> <span class="token parameter variable">-rf</span> :business
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> Scanning <span class="token keyword">for</span> projects<span class="token punctuation">..</span>.
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> -----------------------\`<span class="token variable"><span class="token variable">\`</span><span class="token operator">&lt;</span> com.baeldung:business <span class="token operator">&gt;</span><span class="token variable">\`</span></span>\`------------------------ 
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> Building business <span class="token number">1.0</span>-SNAPSHOT
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> --------------------------------<span class="token punctuation">[</span> jar <span class="token punctuation">]</span>--------------------------------- 
<span class="token punctuation">[</span><span class="token punctuation">..</span>.<span class="token punctuation">]</span> 
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> BUILD SUCCESS
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> ------------------------------------------------------------------------ 
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> Total time:  <span class="token number">1.318</span> s
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> Finished at: <span class="token number">2023</span>-06-20T17:21:07+02:00
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> ------------------------------------------------------------------------ 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如预期的那样，这次只构建了_business_子模块。实际上，_rf_是_resume-from_的简写，所以我们也可以等价地写：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ mvn clean <span class="token function">install</span> --resume-from :business
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="不运行-install" tabindex="-1"><a class="header-anchor" href="#不运行-install"><span>不运行_install_</span></a></h2><p>现在让我们假设我们没有运行Maven <em>install</em>，而是在早期阶段停止了构建。为了展示这一点，我们可以回到_Main.java_文件损坏的情况。让我们也清理我们的本地仓库并运行_package_阶段：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ mvn clean package
<span class="token punctuation">[</span><span class="token punctuation">..</span>.<span class="token punctuation">]</span> 
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> Reactor Summary <span class="token keyword">for</span> resume-from <span class="token number">1.0</span>-SNAPSHOT:
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> resume-from <span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span> SUCCESS <span class="token punctuation">[</span>  <span class="token number">0.108</span> s<span class="token punctuation">]</span>
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> lib <span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span> SUCCESS <span class="token punctuation">[</span>  <span class="token number">0.709</span> s<span class="token punctuation">]</span>
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> business <span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span>. FAILURE <span class="token punctuation">[</span>  <span class="token number">0.316</span> s<span class="token punctuation">]</span>
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> ------------------------------------------------------------------------ 
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> BUILD FAILURE
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> ------------------------------------------------------------------------ 
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> Total time: <span class="token number">1.216</span> s
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> Finished at: <span class="token number">2023</span>-06-20T17:49:59+02:00
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> ------------------------------------------------------------------------ 
<span class="token punctuation">[</span>ERROR<span class="token punctuation">]</span> Failed to execute goal org.apache.maven.plugins:maven-compiler-plugin:3.1:compile <span class="token punctuation">(</span>default-compile<span class="token punctuation">)</span> on project business: Compilation failure
<span class="token punctuation">[</span>ERROR<span class="token punctuation">]</span> <span class="token punctuation">[</span><span class="token punctuation">..</span>.<span class="token punctuation">]</span>/resume-from/business/src/main/java/Main.java:<span class="token punctuation">[</span><span class="token number">4,43</span><span class="token punctuation">]</span> <span class="token string">&#39;;&#39;</span> expected
<span class="token punctuation">[</span><span class="token punctuation">..</span>.<span class="token punctuation">]</span>
<span class="token punctuation">[</span>ERROR<span class="token punctuation">]</span> After correcting the problems, you can resume the build with the <span class="token builtin class-name">command</span>
<span class="token punctuation">[</span>ERROR<span class="token punctuation">]</span> mvn \`<span class="token variable"><span class="token variable">\`</span><span class="token operator">&lt;</span>args<span class="token operator">&gt;</span><span class="token variable">\`</span></span>\` <span class="token parameter variable">-rf</span> :business
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>毫不意外，我们得到了相同的编译错误。错误消息给了我们同样的提示，在修复问题后使用_rf_选项。因此，让我们修复问题并运行这个命令：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ mvn clean package <span class="token parameter variable">-rf</span> :business
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> Scanning <span class="token keyword">for</span> projects<span class="token punctuation">..</span>.
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> -----------------------\`<span class="token variable"><span class="token variable">\`</span><span class="token operator">&lt;</span> com.baeldung:business <span class="token operator">&gt;</span><span class="token variable">\`</span></span>\`------------------------
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> Building business <span class="token number">1.0</span>-SNAPSHOT
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> --------------------------------<span class="token punctuation">[</span> jar <span class="token punctuation">]</span>--------------------------------- 
<span class="token punctuation">[</span>WARNING<span class="token punctuation">]</span> The POM <span class="token keyword">for</span> com.baeldung:lib:jar:1.0-SNAPSHOT is missing, no dependency information available
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> ------------------------------------------------------------------------ 
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> BUILD FAILURE
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> ------------------------------------------------------------------------ 
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> Total time:  <span class="token number">0.187</span> s
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> Finished at: <span class="token number">2023</span>-06-20T17:56:34+02:00
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> ------------------------------------------------------------------------ 
<span class="token punctuation">[</span>ERROR<span class="token punctuation">]</span> Failed to execute goal on project business: Could not resolve dependencies <span class="token keyword">for</span> project com.baeldung:business:jar:1.0-SNAPSHOT: Could not <span class="token function">find</span> artifact com.baeldung:lib:jar:1.0-SNAPSHOT -<span class="token operator">&gt;</span> <span class="token punctuation">[</span>Help <span class="token number">1</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因为我们没有运行_install_阶段，<em>lib_子模块在第一次构建期间没有安装在我们的本地仓库中。因此，当尝试恢复构建时，Maven找不到_lib_工件。理论上，我们可以通过在命令行中添加_also-make_选项来解决这个问题。有了_also-make</em>，Maven应该构建所有_business_依赖的项目。然而，Maven 3中有一个bug，当与_resume-from_一起使用时，_also-make_被忽略了。</p><p>这个bug将在Maven 4中得到修复，目前Maven 4仍在开发中。与此同时，我们不能在这种情况下从特定模块恢复反应器。<strong>不幸的是，我们需要重新进行整个构建：</strong></p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ mvn clean package
<span class="token punctuation">[</span><span class="token punctuation">..</span>.<span class="token punctuation">]</span> 
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> Reactor Summary <span class="token keyword">for</span> resume-from <span class="token number">1.0</span>-SNAPSHOT:
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> resume-from <span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span> SUCCESS <span class="token punctuation">[</span>  <span class="token number">0.109</span> s<span class="token punctuation">]</span>
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> lib <span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span> SUCCESS <span class="token punctuation">[</span>  <span class="token number">0.660</span> s<span class="token punctuation">]</span>
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> business <span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span>. SUCCESS <span class="token punctuation">[</span>  <span class="token number">0.436</span> s<span class="token punctuation">]</span>
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> ------------------------------------------------------------------------ 
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> BUILD SUCCESS
<span class="token punctuation">[</span><span class="token punctuation">..</span>.<span class="token punctuation">]</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="结论" tabindex="-1"><a class="header-anchor" href="#结论"><span>结论</span></a></h2><p>在本文中，我们看到了如何在Maven构建失败后跳过部分构建。当我们将子模块安装到本地仓库时，我们可以使用_rf_选项。另一方面，不安装它们将导致需要重新进行整个构建，因为Maven的一个bug。</p><p>如往常一样，代码可在GitHub上获取。</p>`,25),c=[e];function o(u,i){return a(),s("div",null,c)}const r=n(p,[["render",o],["__file","2024-07-03-Starting the Maven Build From the Point Where It Failed.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-03/2024-07-03-Starting%20the%20Maven%20Build%20From%20the%20Point%20Where%20It%20Failed.html","title":"从失败点开始恢复Maven构建","lang":"zh-CN","frontmatter":{"date":"2023-06-20T00:00:00.000Z","category":["Maven","Build"],"tag":["Maven","Build","Resume"],"head":[["meta",{"name":"keywords","content":"Maven, Build, Resume, 构建, 恢复, Maven构建"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-03/2024-07-03-Starting%20the%20Maven%20Build%20From%20the%20Point%20Where%20It%20Failed.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"从失败点开始恢复Maven构建"}],["meta",{"property":"og:description","content":"从失败点开始恢复Maven构建 在这个教程中，我们将学习如何在Maven构建失败后恢复它。我们将看到如何跳过已经成功构建的模块。因此，我们将直接跳到问题出现的地方。 示例设置 让我们构建一个多模块Maven项目。我们称父模块为_resume-from_，两个子模块为_lib_和_business_。为了演示，我们将_lib_项目留空。然而，busine..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-03T19:28:40.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Maven"}],["meta",{"property":"article:tag","content":"Build"}],["meta",{"property":"article:tag","content":"Resume"}],["meta",{"property":"article:published_time","content":"2023-06-20T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-03T19:28:40.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"从失败点开始恢复Maven构建\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-06-20T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-03T19:28:40.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"从失败点开始恢复Maven构建 在这个教程中，我们将学习如何在Maven构建失败后恢复它。我们将看到如何跳过已经成功构建的模块。因此，我们将直接跳到问题出现的地方。 示例设置 让我们构建一个多模块Maven项目。我们称父模块为_resume-from_，两个子模块为_lib_和_business_。为了演示，我们将_lib_项目留空。然而，busine..."},"headers":[{"level":2,"title":"示例设置","slug":"示例设置","link":"#示例设置","children":[]},{"level":2,"title":"运行_install_阶段时","slug":"运行-install-阶段时","link":"#运行-install-阶段时","children":[]},{"level":2,"title":"不运行_install_","slug":"不运行-install","link":"#不运行-install","children":[]},{"level":2,"title":"结论","slug":"结论","link":"#结论","children":[]}],"git":{"createdTime":1720034920000,"updatedTime":1720034920000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.88,"words":1165},"filePathRelative":"posts/baeldung/2024-07-03/2024-07-03-Starting the Maven Build From the Point Where It Failed.md","localizedDate":"2023年6月20日","excerpt":"\\n<p>在这个教程中，我们将学习如何在Maven构建失败后恢复它。我们将看到如何跳过已经成功构建的模块。因此，我们将直接跳到问题出现的地方。</p>\\n<h2>示例设置</h2>\\n<p>让我们构建一个多模块Maven项目。我们称父模块为_resume-from_，两个子模块为_lib_和_business_。为了演示，我们将_lib_项目留空。然而，<em>business_项目包含一个单独的_src/main/java/Main.java_文件，其中包含一个_Hello World</em>。现在让我们在_business_模块中添加_lib_的依赖：</p>\\n<div class=\\"language-xml\\" data-ext=\\"xml\\" data-title=\\"xml\\"><pre class=\\"language-xml\\"><code>`<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>dependency</span><span class=\\"token punctuation\\">&gt;</span></span>`\\n    `<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>groupId</span><span class=\\"token punctuation\\">&gt;</span></span>`com.baeldung`<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>groupId</span><span class=\\"token punctuation\\">&gt;</span></span>`\\n    `<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>artifactId</span><span class=\\"token punctuation\\">&gt;</span></span>`lib`<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>artifactId</span><span class=\\"token punctuation\\">&gt;</span></span>`\\n    `<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>version</span><span class=\\"token punctuation\\">&gt;</span></span>`1.0-SNAPSHOT`<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>version</span><span class=\\"token punctuation\\">&gt;</span></span>`\\n`<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>dependency</span><span class=\\"token punctuation\\">&gt;</span></span>`\\n</code></pre></div>","autoDesc":true}');export{r as comp,d as data};
