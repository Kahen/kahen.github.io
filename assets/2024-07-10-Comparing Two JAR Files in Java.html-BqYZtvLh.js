import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as t,a as n}from"./app-BkL9UgS7.js";const i={},l=n(`<h1 id="java中比较两个jar文件" tabindex="-1"><a class="header-anchor" href="#java中比较两个jar文件"><span>Java中比较两个JAR文件</span></a></h1><p>JAR文件是分发Java应用程序的基本构件。有时，我们可能需要检查JAR文件以查看可能的变更，并找出向后兼容性。</p><p>在本教程中，我们将探索不同的工具来比较JAR文件。</p><h2 id="_2-示例jar文件" tabindex="-1"><a class="header-anchor" href="#_2-示例jar文件"><span>2. 示例JAR文件</span></a></h2><p>在本教程中，我们将比较mallet JAR文件。<strong>Mallet是一个Java机器学习库</strong>。<strong>它的用途包括聚类、自然语言处理</strong>等。我们将比较2.0.7版本和2.0.8版本。我们将使用不同的工具来比较这两个JAR文件并记录变更。</p><h2 id="_3-使用jarcomp" tabindex="-1"><a class="header-anchor" href="#_3-使用jarcomp"><span>3. 使用Jarcomp</span></a></h2><p><strong>Jarcomp是一个免费的跨平台工具，用于比较JAR和ZIP文件</strong>。它通过引用大小变化来显示两个文件之间的变化。</p><p>我们将使用它来比较我们的示例JAR文件。首先，让我们创建一个新目录并将我们的示例JAR文件复制到其中。</p><p>然后让我们获取jarcomp可执行JAR并将其放置在我们创建的目录中。最后，让我们打开我们的终端并更改到我们的目录。</p><p>接下来，我们将使用我们的示例JAR文件运行_Jarcomp_可执行JAR：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ java -jar jarcomp_02.jar mallet-2.0.7.jar mallet-2.0.8.jar
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们的工具生成了一份报告，显示了我们示例JAR文件中的变更：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/12/2_jarcomp.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>报告显示了我们二进制文件中的变更。此外，它总结了示例JAR文件中的文件数量。它还指示了示例JAR文件的总大小。</p><h2 id="_4-使用pkgdiff" tabindex="-1"><a class="header-anchor" href="#_4-使用pkgdiff"><span>4. 使用PkgDiff</span></a></h2><p><strong>PkgDiff意为包变更分析器</strong>。它可视化ZIP、JAR、TAR.GZ、DEB等软件包中的变更。<strong>该工具帮助软件维护者跟踪变更</strong>。<strong>并确保新旧版本之间的兼容性</strong>。</p><p>支持的平台包括FreeBSD、Mac OS X和GNU/Linux。</p><p>我们将使用这个工具来比较我们的示例JAR文件。</p><h3 id="_4-1-安装" tabindex="-1"><a class="header-anchor" href="#_4-1-安装"><span>4.1. 安装</span></a></h3><p>首先，我们将在我们的机器上下载这个工具。然后，我们将解压缩下载的tar.gz：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ tar -xvf pkgdiff-1.7.2.tar.gz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>接下来，让我们更改到解压缩的文件：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ cd pkgdiff-1.7.2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>最后，让我们使用makefile安装这个工具：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ sudo make install
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们的工具现在可以使用了。</p><h3 id="_4-2-使用方法" tabindex="-1"><a class="header-anchor" href="#_4-2-使用方法"><span>4.2. 使用方法</span></a></h3><p>让我们使用这个工具来可视化我们示例JAR文件中的变更。首先，让我们更改到包含我们示例JAR文件的目录。</p><p>然后让我们使用_pkgdiff_命令来比较示例JAR文件：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ pkgdiff mallet-2.0.7.jar mallet-2.0.8.jar
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们的工具生成了一份HTML格式的报告，显示了二进制和源文件之间的差异：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/12/2_pkgdiff.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>报告显示了我们二进制文件中的变更。它显示了类文件的百分比变化。此外，它总结了二进制文件。它显示了添加和删除的文件数量。最后，它指出了目录的总数和新增加的内容。</p><h2 id="_5-使用japicc" tabindex="-1"><a class="header-anchor" href="#_5-使用japicc"><span>5. 使用JAPICC</span></a></h2><p><strong>Java API兼容性检查器（JAPICC）是一个评估Java库之间相似性的工具</strong>。它显示二进制和源代码级别的变更。该工具检查可能危及向后兼容性的修改。它检查删除的方法和类字段，引入的方法等。它通过比较两个二进制文件来完成这些检查。</p><p>这个工具为二进制和源代码兼容性检查生成了HTML报告。它支持Java和Scala。</p><h3 id="_5-1-安装" tabindex="-1"><a class="header-anchor" href="#_5-1-安装"><span>5.1. 安装</span></a></h3><p>首先，我们将在我们的机器上下载这个工具。然后，我们将解压缩下载的zip：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ unzip japi-compliance-checker-2.4.zip
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>解压缩zip文件后，我们将更改到目录：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ cd japi-compliance-checker-2.4
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>最后，我们将使用makefile在我们的系统上安装它：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ sudo make install
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们的工具现在可以使用了。</p><h3 id="_5-2-使用方法" tabindex="-1"><a class="header-anchor" href="#_5-2-使用方法"><span>5.2. 使用方法</span></a></h3><p>我们将使用我们安装的工具来比较我们的示例JAR文件。首先，我们将创建一个新目录并将我们的JAR文件移动到其中。然后我们将打开我们的终端并更改到我们的新目录。最后，我们将运行_japi-compliance_命令来比较两个JAR文件：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ japi-compliance-checker mallet-2.0.7.jar mallet-2.0.8.jar
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这在我们的目录中生成了一份报告。报告包含了JAR文件在二进制和源代码级别的差异。</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/12/2_binary-compatibility-1.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>我们的报告显示了99.8%的兼容性，并在最新版本中添加了方法。它指出了源文件中方法和类的总数。它还比较了各个二进制和源文件，并给出了百分比变化。</p><h2 id="_6-使用intellij-idea" tabindex="-1"><a class="header-anchor" href="#_6-使用intellij-idea"><span>6. 使用IntelliJ IDEA</span></a></h2><p><strong>IntelliJ IDEA是JetBrains的集成开发环境</strong>。<strong>该IDE内置了一个比较JAR文件的工具</strong>。我们将使用IDE来比较我们的示例JAR文件。首先，让我们启动IDE并打开包含我们示例JAR文件的文件夹。</p><p>接下来，让我们选择两个示例JAR文件。最后，让我们按CTRL + D来比较这两个JAR文件。</p><p>我们将获得一份关于我们JAR文件变更的全面报告：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/12/2_intellij.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>生成的报告非常清晰。它显示了二进制文件、其内容以及变更的内容。这个特性简单易用，功能强大。我们不需要安装任何东西就可以使用它。</p><p>结果还比较了源文件。它显示了类，并指出了源文件中的变更。此外，它显示了类及其内容。并在源文件中明确显示了添加的代码。</p><h2 id="_7-结论" tabindex="-1"><a class="header-anchor" href="#_7-结论"><span>7. 结论</span></a></h2><p>在本教程中，我们检查了不同的工具来比较两个JAR文件。IntelliJ IDEA看起来简单，易于开始使用。它提供了全面的报告，并可视化了类文件中的变更。</p><p>其他工具也完成了工作。PkgDiff和JAPICC生成了报告，显示了二进制文件和源文件中的变更。</p>`,60),p=[l];function r(s,d){return t(),a("div",null,p)}const g=e(i,[["render",r],["__file","2024-07-10-Comparing Two JAR Files in Java.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-07-10/2024-07-10-Comparing%20Two%20JAR%20Files%20in%20Java.html","title":"Java中比较两个JAR文件","lang":"zh-CN","frontmatter":{"date":"2022-12-01T00:00:00.000Z","category":["Java","Tools"],"tag":["JAR Comparison","Java Tools"],"head":[["meta",{"name":"keywords","content":"Java, JAR, Comparison, Tools"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-10/2024-07-10-Comparing%20Two%20JAR%20Files%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中比较两个JAR文件"}],["meta",{"property":"og:description","content":"Java中比较两个JAR文件 JAR文件是分发Java应用程序的基本构件。有时，我们可能需要检查JAR文件以查看可能的变更，并找出向后兼容性。 在本教程中，我们将探索不同的工具来比较JAR文件。 2. 示例JAR文件 在本教程中，我们将比较mallet JAR文件。Mallet是一个Java机器学习库。它的用途包括聚类、自然语言处理等。我们将比较2.0..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2022/12/2_jarcomp.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-10T23:37:11.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"JAR Comparison"}],["meta",{"property":"article:tag","content":"Java Tools"}],["meta",{"property":"article:published_time","content":"2022-12-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-10T23:37:11.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中比较两个JAR文件\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2022/12/2_jarcomp.png\\",\\"https://www.baeldung.com/wp-content/uploads/2022/12/2_pkgdiff.png\\",\\"https://www.baeldung.com/wp-content/uploads/2022/12/2_binary-compatibility-1.png\\",\\"https://www.baeldung.com/wp-content/uploads/2022/12/2_intellij.png\\"],\\"datePublished\\":\\"2022-12-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-10T23:37:11.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中比较两个JAR文件 JAR文件是分发Java应用程序的基本构件。有时，我们可能需要检查JAR文件以查看可能的变更，并找出向后兼容性。 在本教程中，我们将探索不同的工具来比较JAR文件。 2. 示例JAR文件 在本教程中，我们将比较mallet JAR文件。Mallet是一个Java机器学习库。它的用途包括聚类、自然语言处理等。我们将比较2.0..."},"headers":[{"level":2,"title":"2. 示例JAR文件","slug":"_2-示例jar文件","link":"#_2-示例jar文件","children":[]},{"level":2,"title":"3. 使用Jarcomp","slug":"_3-使用jarcomp","link":"#_3-使用jarcomp","children":[]},{"level":2,"title":"4. 使用PkgDiff","slug":"_4-使用pkgdiff","link":"#_4-使用pkgdiff","children":[{"level":3,"title":"4.1. 安装","slug":"_4-1-安装","link":"#_4-1-安装","children":[]},{"level":3,"title":"4.2. 使用方法","slug":"_4-2-使用方法","link":"#_4-2-使用方法","children":[]}]},{"level":2,"title":"5. 使用JAPICC","slug":"_5-使用japicc","link":"#_5-使用japicc","children":[{"level":3,"title":"5.1. 安装","slug":"_5-1-安装","link":"#_5-1-安装","children":[]},{"level":3,"title":"5.2. 使用方法","slug":"_5-2-使用方法","link":"#_5-2-使用方法","children":[]}]},{"level":2,"title":"6. 使用IntelliJ IDEA","slug":"_6-使用intellij-idea","link":"#_6-使用intellij-idea","children":[]},{"level":2,"title":"7. 结论","slug":"_7-结论","link":"#_7-结论","children":[]}],"git":{"createdTime":1720654631000,"updatedTime":1720654631000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.09,"words":1528},"filePathRelative":"posts/baeldung/2024-07-10/2024-07-10-Comparing Two JAR Files in Java.md","localizedDate":"2022年12月1日","excerpt":"\\n<p>JAR文件是分发Java应用程序的基本构件。有时，我们可能需要检查JAR文件以查看可能的变更，并找出向后兼容性。</p>\\n<p>在本教程中，我们将探索不同的工具来比较JAR文件。</p>\\n<h2>2. 示例JAR文件</h2>\\n<p>在本教程中，我们将比较mallet JAR文件。<strong>Mallet是一个Java机器学习库</strong>。<strong>它的用途包括聚类、自然语言处理</strong>等。我们将比较2.0.7版本和2.0.8版本。我们将使用不同的工具来比较这两个JAR文件并记录变更。</p>\\n<h2>3. 使用Jarcomp</h2>\\n<p><strong>Jarcomp是一个免费的跨平台工具，用于比较JAR和ZIP文件</strong>。它通过引用大小变化来显示两个文件之间的变化。</p>","autoDesc":true}');export{g as comp,m as data};
