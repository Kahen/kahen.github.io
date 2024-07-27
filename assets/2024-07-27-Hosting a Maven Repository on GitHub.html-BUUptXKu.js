import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as n,a}from"./app-CBerKIce.js";const i={},s=a('<h1 id="在github上托管maven仓库" tabindex="-1"><a class="header-anchor" href="#在github上托管maven仓库"><span>在GitHub上托管Maven仓库</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在本教程中，我们将了解如何使用_site-maven插件_在GitHub上托管一个带有源代码的Maven仓库。这是一种使用Nexus等仓库的可负担得起的替代方案。</p><h2 id="_2-前提条件" tabindex="-1"><a class="header-anchor" href="#_2-前提条件"><span>2. 前提条件</span></a></h2><p>如果我们还没有一个Maven项目的GitHub仓库，我们需要创建一个。在本文中，我们使用一个名为“<em>host-maven-repo-example</em>”的仓库，以及“main”分支。这是一个GitHub上的空仓库：</p><h2 id="_3-maven项目" tabindex="-1"><a class="header-anchor" href="#_3-maven项目"><span>3. Maven项目</span></a></h2><p>让我们创建一个简单的Maven项目。我们将把这个项目的生成的构件推送到GitHub。</p><p>这是项目的_pom.xml_：</p><p>首先，我们需要<strong>在项目中创建一个本地仓库</strong>。Maven构件将在推送到GitHub之前被部署到项目构建目录中的这个位置。</p><p>我们将在_pom.xml_中添加本地仓库的定义：</p><p>现在，让我们<strong>添加_maven-deploy-plugin_配置</strong>到我们的_pom.xml_。我们将使用这个插件将我们的构件添加到目录_${project.build.directory}/mvn-artifact_中的本地仓库：</p><p>此外，<strong>如果我们想将源文件与Maven构件一起推送到GitHub，那么我们也需要包含源插件</strong>：</p><p>一旦上述配置和插件被添加到_pom.xml_，构建<strong>将在目录_target/mvn-artifact_中本地部署Maven构件</strong>。</p><p>现在，<strong>下一步是从本地目录将这些构件部署到GitHub</strong>。</p><h2 id="_4-配置github认证" tabindex="-1"><a class="header-anchor" href="#_4-配置github认证"><span>4. 配置GitHub认证</span></a></h2><p>在将构部署到GitHub之前，我们将在_~/.m2/settings.xml_中配置认证信息。这是为了使_site-maven-plugin_能够将构件推送到GitHub。</p><p>根据我们想要的认证方式，我们将在我们的_settings.xml_中添加以下两种配置之一。让我们接下来查看这些选项。</p><h3 id="_4-1-使用github用户名和密码" tabindex="-1"><a class="header-anchor" href="#_4-1-使用github用户名和密码"><span>4.1. 使用GitHub用户名和密码</span></a></h3><p>要使用GitHub用户名和密码，我们将在_settings.xml_中配置它们：</p><h3 id="_4-2-使用个人访问令牌" tabindex="-1"><a class="header-anchor" href="#_4-2-使用个人访问令牌"><span>4.2. 使用个人访问令牌</span></a></h3><p><strong>推荐使用GitHub API或命令行进行认证的方式是使用个人访问令牌(PAT)</strong>：</p><h2 id="_5-使用-site-maven-plugin-将构件推送到github" tabindex="-1"><a class="header-anchor" href="#_5-使用-site-maven-plugin-将构件推送到github"><span>5. 使用_site-maven-plugin_将构件推送到GitHub</span></a></h2><p>最后一步是<strong>配置_site-maven插件_以推送我们的本地暂存仓库</strong>。这个暂存仓库位于_target_目录：</p><p>现在，我们将<strong>执行_mvn deploy_命令将构件上传到GitHub</strong>。如果不存在，_main_分支将自动创建。构建成功后，在浏览器中检查GitHub上的仓库，并在_main_分支下。我们的所有二进制文件都将存在于仓库中。</p><p>在我们的例子中，它将看起来像这样：</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>最后，我们已经看到了如何使用_site-maven-plugin_在GitHub上托管Maven构件。</p><p>如往常一样，这些例子的代码可以在GitHub上找到。</p>',28),o=[s];function p(r,l){return n(),t("div",null,o)}const u=e(i,[["render",p],["__file","2024-07-27-Hosting a Maven Repository on GitHub.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-07-27/2024-07-27-Hosting%20a%20Maven%20Repository%20on%20GitHub.html","title":"在GitHub上托管Maven仓库","lang":"zh-CN","frontmatter":{"date":"2021-08-01T00:00:00.000Z","category":["Maven","GitHub"],"tag":["Maven Repository","GitHub Pages"],"head":[["meta",{"name":"keywords","content":"Maven, GitHub, Repository, Hosting, Tutorial"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-27/2024-07-27-Hosting%20a%20Maven%20Repository%20on%20GitHub.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在GitHub上托管Maven仓库"}],["meta",{"property":"og:description","content":"在GitHub上托管Maven仓库 1. 概述 在本教程中，我们将了解如何使用_site-maven插件_在GitHub上托管一个带有源代码的Maven仓库。这是一种使用Nexus等仓库的可负担得起的替代方案。 2. 前提条件 如果我们还没有一个Maven项目的GitHub仓库，我们需要创建一个。在本文中，我们使用一个名为“host-maven-rep..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-27T02:57:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Maven Repository"}],["meta",{"property":"article:tag","content":"GitHub Pages"}],["meta",{"property":"article:published_time","content":"2021-08-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-27T02:57:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在GitHub上托管Maven仓库\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2021-08-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-27T02:57:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在GitHub上托管Maven仓库 1. 概述 在本教程中，我们将了解如何使用_site-maven插件_在GitHub上托管一个带有源代码的Maven仓库。这是一种使用Nexus等仓库的可负担得起的替代方案。 2. 前提条件 如果我们还没有一个Maven项目的GitHub仓库，我们需要创建一个。在本文中，我们使用一个名为“host-maven-rep..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 前提条件","slug":"_2-前提条件","link":"#_2-前提条件","children":[]},{"level":2,"title":"3. Maven项目","slug":"_3-maven项目","link":"#_3-maven项目","children":[]},{"level":2,"title":"4. 配置GitHub认证","slug":"_4-配置github认证","link":"#_4-配置github认证","children":[{"level":3,"title":"4.1. 使用GitHub用户名和密码","slug":"_4-1-使用github用户名和密码","link":"#_4-1-使用github用户名和密码","children":[]},{"level":3,"title":"4.2. 使用个人访问令牌","slug":"_4-2-使用个人访问令牌","link":"#_4-2-使用个人访问令牌","children":[]}]},{"level":2,"title":"5. 使用_site-maven-plugin_将构件推送到GitHub","slug":"_5-使用-site-maven-plugin-将构件推送到github","link":"#_5-使用-site-maven-plugin-将构件推送到github","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1722049076000,"updatedTime":1722049076000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.39,"words":717},"filePathRelative":"posts/baeldung/2024-07-27/2024-07-27-Hosting a Maven Repository on GitHub.md","localizedDate":"2021年8月1日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>在本教程中，我们将了解如何使用_site-maven插件_在GitHub上托管一个带有源代码的Maven仓库。这是一种使用Nexus等仓库的可负担得起的替代方案。</p>\\n<h2>2. 前提条件</h2>\\n<p>如果我们还没有一个Maven项目的GitHub仓库，我们需要创建一个。在本文中，我们使用一个名为“<em>host-maven-repo-example</em>”的仓库，以及“main”分支。这是一个GitHub上的空仓库：</p>\\n<h2>3. Maven项目</h2>\\n<p>让我们创建一个简单的Maven项目。我们将把这个项目的生成的构件推送到GitHub。</p>","autoDesc":true}');export{u as comp,m as data};
