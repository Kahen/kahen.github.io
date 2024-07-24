import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as a,a as n}from"./app-BkL9UgS7.js";const i={},p=n('<h1 id="将现有maven项目导入eclipse" tabindex="-1"><a class="header-anchor" href="#将现有maven项目导入eclipse"><span>将现有Maven项目导入Eclipse</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在本教程中，我们将看到如何将现有的Maven项目导入Eclipse。为此，我们可以使用Eclipse的Maven插件或Apache Maven Eclipse插件。</p><h2 id="_2-eclipse和maven项目设置" tabindex="-1"><a class="header-anchor" href="#_2-eclipse和maven项目设置"><span>2. Eclipse和Maven项目设置</span></a></h2><p>以我们的例子为例，我们将使用来自我们GitHub仓库的多模块Maven项目。一旦我们克隆了仓库或下载了项目，我们的多模块Maven项目的目录根应该看起来像这样：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>|-multimodulemavenproject\n    |--daomodule\n    |--entitymodule\n    |--mainappmodule\n    |--userdaomodule\n    |--pom.xml\n    |--README.md\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-maven项目的小改动" tabindex="-1"><a class="header-anchor" href="#_2-2-maven项目的小改动"><span>2.2. Maven项目的小改动</span></a></h3><p>我们的多模块Maven项目本身是一个子项目。因此，为了限制我们练习的范围，我们需要在_multimodulemavenproject_目录中的_pom.xml_中做一些小改动，这将是我们的项目根。这里，让我们<strong>删除引用_multimodulemavenproject_的父级</strong>的行：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>`&lt;parent&gt;`\n    `&lt;groupId&gt;`com.baeldung`&lt;/groupId&gt;`\n    `&lt;artifactId&gt;`parent-modules`&lt;/artifactId&gt;`\n    `&lt;version&gt;`1.0.0-SNAPSHOT`&lt;/version&gt;`\n    `&lt;relativePath&gt;`../../`&lt;/relativePath&gt;`\n`&lt;/parent&gt;`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>删除这些行后，我们就可以准备将Maven项目导入Eclipse了。</p><h2 id="_3-使用-m2e-eclipse插件导入" tabindex="-1"><a class="header-anchor" href="#_3-使用-m2e-eclipse插件导入"><span>3. 使用_m2e_ Eclipse插件导入</span></a></h2><p>让我们使用Eclipse菜单路径_File::Import::Maven::Existing Maven Projects_来导入Maven项目。我们可以先点击_File_菜单下的_Import_选项：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2021/11/import-1.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>然后，让我们展开_Maven_文件夹，选择_Existing Maven Projects_，然后点击_Next_按钮：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2021/11/import2-1.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>最后，让我们提供我们Maven项目的根目录路径，然后点击_Finish_按钮：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2021/11/import3-1.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>完成这一步后，我们应该能够在Eclipse中看到_Package Explorer_视图：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2021/11/package_view.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>这个视图可能有点令人困惑，因为我们看到的是所有模块分开显示，而不是以层次结构显示。这是由于Eclipse的默认视图_Package Explorer_。然而，我们可以很容易地将视图切换到_Project Explorer_，并以树状结构查看多模块项目：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2021/11/project_explorer.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>由于Eclipse的Maven插件m2e，我们能够顺利导入Maven项目。我们没有必要单独添加它到我们的Eclipse中，因为它<strong>内置****于Eclipse安装</strong>中，并且可以通过路径_Help::About Eclipse IDE::Installation Details::Installed Software_查看：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2021/11/m2e_plugin.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>如果我们有一个较旧版本的Eclipse，它没有内置的_m2e_插件，我们总是可以通过Eclipse Marketplace添加这个插件。</p><h2 id="_4-apache-maven-eclipse插件" tabindex="-1"><a class="header-anchor" href="#_4-apache-maven-eclipse插件"><span>4. Apache Maven Eclipse插件</span></a></h2><p>Apache Maven Eclipse插件也可以用来生成Eclipse IDE文件（*. <em>classpath</em>, *. <em>project</em>, *. <em>wtpmodules</em>, 和 . <em>settings</em> 文件夹）以用于项目。然而，这个<strong>插件现在被Maven退役了</strong>，并且<strong>推荐使用Eclipse的_m2e_插件</strong>。更多细节可以在Apache Maven插件页面找到。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本教程中，我们学习了将现有Maven项目导入Eclipse的两种方式。由于Apache Maven Eclipse插件现在已经退役，<strong>我们应该使用Eclipse的Maven插件，<em>m2e</em></strong>，它在最新版本的Eclipse中内置。</p><p>本教程中展示的所有代码示例都可以在GitHub上找到。</p>',29),l=[p];function s(c,o){return a(),t("div",null,l)}const d=e(i,[["render",s],["__file","2024-07-24-Importing Maven Project into Eclipse.html.vue"]]),g=JSON.parse('{"path":"/posts/baeldung/2024-07-24/2024-07-24-Importing%20Maven%20Project%20into%20Eclipse.html","title":"将现有Maven项目导入Eclipse","lang":"zh-CN","frontmatter":{"date":"2021-11-01T00:00:00.000Z","category":["Development","Tools"],"tag":["Eclipse","Maven"],"head":[["meta",{"name":"keywords","content":"Maven, Eclipse, Import, Tutorial, m2e"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-24/2024-07-24-Importing%20Maven%20Project%20into%20Eclipse.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"将现有Maven项目导入Eclipse"}],["meta",{"property":"og:description","content":"将现有Maven项目导入Eclipse 1. 概述 在本教程中，我们将看到如何将现有的Maven项目导入Eclipse。为此，我们可以使用Eclipse的Maven插件或Apache Maven Eclipse插件。 2. Eclipse和Maven项目设置 以我们的例子为例，我们将使用来自我们GitHub仓库的多模块Maven项目。一旦我们克隆了仓库..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2021/11/import-1.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-24T02:51:16.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Eclipse"}],["meta",{"property":"article:tag","content":"Maven"}],["meta",{"property":"article:published_time","content":"2021-11-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-24T02:51:16.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"将现有Maven项目导入Eclipse\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2021/11/import-1.png\\",\\"https://www.baeldung.com/wp-content/uploads/2021/11/import2-1.png\\",\\"https://www.baeldung.com/wp-content/uploads/2021/11/import3-1.png\\",\\"https://www.baeldung.com/wp-content/uploads/2021/11/package_view.png\\",\\"https://www.baeldung.com/wp-content/uploads/2021/11/project_explorer.png\\",\\"https://www.baeldung.com/wp-content/uploads/2021/11/m2e_plugin.png\\"],\\"datePublished\\":\\"2021-11-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-24T02:51:16.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"将现有Maven项目导入Eclipse 1. 概述 在本教程中，我们将看到如何将现有的Maven项目导入Eclipse。为此，我们可以使用Eclipse的Maven插件或Apache Maven Eclipse插件。 2. Eclipse和Maven项目设置 以我们的例子为例，我们将使用来自我们GitHub仓库的多模块Maven项目。一旦我们克隆了仓库..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. Eclipse和Maven项目设置","slug":"_2-eclipse和maven项目设置","link":"#_2-eclipse和maven项目设置","children":[{"level":3,"title":"2.2. Maven项目的小改动","slug":"_2-2-maven项目的小改动","link":"#_2-2-maven项目的小改动","children":[]}]},{"level":2,"title":"3. 使用_m2e_ Eclipse插件导入","slug":"_3-使用-m2e-eclipse插件导入","link":"#_3-使用-m2e-eclipse插件导入","children":[]},{"level":2,"title":"4. Apache Maven Eclipse插件","slug":"_4-apache-maven-eclipse插件","link":"#_4-apache-maven-eclipse插件","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1721789476000,"updatedTime":1721789476000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.52,"words":755},"filePathRelative":"posts/baeldung/2024-07-24/2024-07-24-Importing Maven Project into Eclipse.md","localizedDate":"2021年11月1日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>在本教程中，我们将看到如何将现有的Maven项目导入Eclipse。为此，我们可以使用Eclipse的Maven插件或Apache Maven Eclipse插件。</p>\\n<h2>2. Eclipse和Maven项目设置</h2>\\n<p>以我们的例子为例，我们将使用来自我们GitHub仓库的多模块Maven项目。一旦我们克隆了仓库或下载了项目，我们的多模块Maven项目的目录根应该看起来像这样：</p>\\n<div class=\\"language-text\\" data-ext=\\"text\\" data-title=\\"text\\"><pre class=\\"language-text\\"><code>|-multimodulemavenproject\\n    |--daomodule\\n    |--entitymodule\\n    |--mainappmodule\\n    |--userdaomodule\\n    |--pom.xml\\n    |--README.md\\n</code></pre></div>","autoDesc":true}');export{d as comp,g as data};
