import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as t,a}from"./app-c243dxVF.js";const l={},i=a('<hr><h1 id="如何查找maven依赖" tabindex="-1"><a class="header-anchor" href="#如何查找maven依赖"><span>如何查找Maven依赖</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>Maven 是一个项目管理和理解工具。它基于项目对象模型的概念，也称为 POM。使用 POM 作为中心信息，Maven 可以管理项目的构建、报告和文档。</p><p><strong>Maven 的一个重要部分是依赖管理。</strong> 大多数开发人员在开发应用程序时会与 Maven 的这个特性交互。</p><p>Maven 的高级依赖管理提供了自动更新以及依赖闭包。公司使用 Maven 进行依赖管理的另一种方式是使用自定义的中央仓库。通过这样做，开发人员可以在公司内使用其他项目中的依赖。</p><p>在本教程中，我们将学习如何查找 Maven 依赖。</p><h2 id="_2-maven-依赖是什么" tabindex="-1"><a class="header-anchor" href="#_2-maven-依赖是什么"><span>2. Maven 依赖是什么</span></a></h2><p>在 Maven 的上下文中，<strong>依赖只是一个由 Java 应用程序使用的 JAR 文件。</strong> 根据 POM 文件，Maven 会下载并添加 JAR 文件到我们的 Java 路径。然后 Java 将能够找到并使用 JAR 文件中的类。</p><p><strong>还需要注意的是，Maven 有一个本地仓库，它下载所有的依赖。</strong> 默认情况下，这位于 <em>{用户主文件夹}/.m2/repository</em>。</p><h2 id="_3-pom-文件" tabindex="-1"><a class="header-anchor" href="#_3-pom-文件"><span>3. POM 文件</span></a></h2><p>POM 文件使用 XML 语法，其中所有内容都包含在标签之间。</p><p>默认情况下，POM 文件只包含我们的项目信息。为了添加项目将使用的依赖，我们需要添加 <em>dependencies</em> 部分：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>`&lt;project xmlns=&quot;http://maven.apache.org/POM/4.0.0&quot;\n  xmlns:xsi=&quot;http://www.w3.org/2001/XMLSchema-instance&quot;\n  xsi:schemaLocation=&quot;http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd&quot;&gt;`\n    `&lt;modelVersion&gt;`4.0.0`&lt;/modelVersion&gt;`\n    ``&lt;groupId&gt;``com.baeldung``&lt;/groupId&gt;``\n    ``&lt;artifactId&gt;``maven.dependency``&lt;/artifactId&gt;``\n    ``&lt;version&gt;``0.0.1-SNAPSHOT``&lt;/version&gt;``\n\n    `&lt;dependencies&gt;`\n        ....\n    `&lt;/dependencies&gt;`\n`&lt;/project&gt;`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>这只在我们手动编辑 POM 文件时需要。</strong></p><p>在开始一个新项目或添加一个新功能时，我们可能会意识到需要向我们的项目中添加一个新的依赖。让我们以一个简单的例子为例，我们需要添加 JDBC 依赖。</p><p>根据我们的 IDE 和设置，有不同的方法来找到 JDBC 依赖所需的详细信息。</p><h3 id="_4-1-intellij" tabindex="-1"><a class="header-anchor" href="#_4-1-intellij"><span>4.1. IntelliJ</span></a></h3><p>如果我们使用 IntelliJ IDEA，我们可以通过以下步骤将新的依赖添加到项目的 POM：</p><p>首先，我们打开 POM 文件，然后按 ALT+INSERT，然后点击 DEPENDENCY 选项： <img src="https://www.baeldung.com/wp-content/uploads/2022/08/IntelliJAdd-Dependency-Menu.png" alt="img" loading="lazy"></p><p>然后，们可以搜索所需的依赖并点击 ADD： <img src="https://www.baeldung.com/wp-content/uploads/2022/08/IntelliJDependency-Search.png" alt="img" loading="lazy"></p><h3 id="_4-2-eclipse" tabindex="-1"><a class="header-anchor" href="#_4-2-eclipse"><span>4.2. Eclipse</span></a></h3><p>Eclipse IDE 有一个类似于 IntelliJ 的方法来添加新的依赖。</p><p>我们需要右键点击包资源管理器中的 POM 文件或在打开文件后，然后我们转到 Maven -&gt; Add dependency 选项： <img src="https://www.baeldung.com/wp-content/uploads/2022/08/EclipseMaven-Menu.png" alt="img" loading="lazy"> 然后，我们可以搜索所需的依赖并点击 OK： <img src="https://www.baeldung.com/wp-content/uploads/2022/08/EclipseDependency-Search.png" alt="img" loading="lazy"></p><h3 id="_4-3-互联网搜索" tabindex="-1"><a class="header-anchor" href="#_4-3-互联网搜索"><span>4.3. 互联网搜索</span></a></h3><p><strong>如果我们愿意手动编辑 POM 文件，那么我们可以直接在 search.maven.org 或 Google 上搜索以找到依赖的所有详细信息。</strong></p><p>当访问 <strong>search.maven.org</strong> 时，我们可以简单地在搜索栏中输入依赖，我们将找到许多依赖的版本。除非我们的项目中有其他限制，我们应该使用最新稳定版本：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/08/SearchMaven-DependencySearch.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p><strong>在我们的 POM 文件中，在依赖部分，只需粘贴找到的依赖详细信息。</strong></p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>`&lt;dependency&gt;`\n    ``&lt;groupId&gt;``org.springframework``&lt;/groupId&gt;``\n    ``&lt;artifactId&gt;``spring-jdbc``&lt;/artifactId&gt;``\n    ``&lt;version&gt;``5.3.21``&lt;/version&gt;``\n`&lt;/dependency&gt;`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>还有许多其他类似于 <strong>search.maven.org</strong> 的网站，我们可以使用和探索。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本教程中，我们看到了将 Maven 依赖添加到我们项目的不同方法。</p><p>我们还学习了如何编辑 POM 文件以使 Maven 下载并使用添加的依赖。</p>',34),p=[i];function s(d,o){return t(),n("div",null,p)}const g=e(l,[["render",s],["__file","2024-07-16-How To Find Maven Dependencies.html.vue"]]),v=JSON.parse('{"path":"/posts/baeldung/2024-07-16/2024-07-16-How%20To%20Find%20Maven%20Dependencies.html","title":"如何查找Maven依赖","lang":"zh-CN","frontmatter":{"date":"2022-08-01T00:00:00.000Z","category":["Java","Maven"],"tag":["Maven","Dependency Management"],"head":[["meta",{"name":"keywords","content":"Maven, Dependency Management, POM, Java"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-16/2024-07-16-How%20To%20Find%20Maven%20Dependencies.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"如何查找Maven依赖"}],["meta",{"property":"og:description","content":"如何查找Maven依赖 1. 引言 Maven 是一个项目管理和理解工具。它基于项目对象模型的概念，也称为 POM。使用 POM 作为中心信息，Maven 可以管理项目的构建、报告和文档。 Maven 的一个重要部分是依赖管理。 大多数开发人员在开发应用程序时会与 Maven 的这个特性交互。 Maven 的高级依赖管理提供了自动更新以及依赖闭包。公司..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2022/08/IntelliJAdd-Dependency-Menu.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-16T10:27:38.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Maven"}],["meta",{"property":"article:tag","content":"Dependency Management"}],["meta",{"property":"article:published_time","content":"2022-08-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-16T10:27:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"如何查找Maven依赖\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2022/08/IntelliJAdd-Dependency-Menu.png\\",\\"https://www.baeldung.com/wp-content/uploads/2022/08/IntelliJDependency-Search.png\\",\\"https://www.baeldung.com/wp-content/uploads/2022/08/EclipseMaven-Menu.png\\",\\"https://www.baeldung.com/wp-content/uploads/2022/08/EclipseDependency-Search.png\\",\\"https://www.baeldung.com/wp-content/uploads/2022/08/SearchMaven-DependencySearch.png\\"],\\"datePublished\\":\\"2022-08-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-16T10:27:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"如何查找Maven依赖 1. 引言 Maven 是一个项目管理和理解工具。它基于项目对象模型的概念，也称为 POM。使用 POM 作为中心信息，Maven 可以管理项目的构建、报告和文档。 Maven 的一个重要部分是依赖管理。 大多数开发人员在开发应用程序时会与 Maven 的这个特性交互。 Maven 的高级依赖管理提供了自动更新以及依赖闭包。公司..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. Maven 依赖是什么","slug":"_2-maven-依赖是什么","link":"#_2-maven-依赖是什么","children":[]},{"level":2,"title":"3. POM 文件","slug":"_3-pom-文件","link":"#_3-pom-文件","children":[{"level":3,"title":"4.1. IntelliJ","slug":"_4-1-intellij","link":"#_4-1-intellij","children":[]},{"level":3,"title":"4.2. Eclipse","slug":"_4-2-eclipse","link":"#_4-2-eclipse","children":[]},{"level":3,"title":"4.3. 互联网搜索","slug":"_4-3-互联网搜索","link":"#_4-3-互联网搜索","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1721125658000,"updatedTime":1721125658000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.06,"words":917},"filePathRelative":"posts/baeldung/2024-07-16/2024-07-16-How To Find Maven Dependencies.md","localizedDate":"2022年8月1日","excerpt":"<hr>\\n<h1>如何查找Maven依赖</h1>\\n<h2>1. 引言</h2>\\n<p>Maven 是一个项目管理和理解工具。它基于项目对象模型的概念，也称为 POM。使用 POM 作为中心信息，Maven 可以管理项目的构建、报告和文档。</p>\\n<p><strong>Maven 的一个重要部分是依赖管理。</strong> 大多数开发人员在开发应用程序时会与 Maven 的这个特性交互。</p>\\n<p>Maven 的高级依赖管理提供了自动更新以及依赖闭包。公司使用 Maven 进行依赖管理的另一种方式是使用自定义的中央仓库。通过这样做，开发人员可以在公司内使用其他项目中的依赖。</p>\\n<p>在本教程中，我们将学习如何查找 Maven 依赖。</p>","autoDesc":true}');export{g as comp,v as data};
