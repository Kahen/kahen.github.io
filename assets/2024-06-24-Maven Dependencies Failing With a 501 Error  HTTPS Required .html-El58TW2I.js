import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as n,a}from"./app-2zDpbLgD.js";const i={},r=a('<h1 id="maven依赖项因501错误-https-required-失败-baeldung" tabindex="-1"><a class="header-anchor" href="#maven依赖项因501错误-https-required-失败-baeldung"><span>Maven依赖项因501错误“HTTPS Required”失败 | Baeldung</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在本教程中，我们将了解错误“返回代码是：501，原因短语：HTTPS Required”。我们将首先理解这个错误的含义，然后探索解决此错误的步骤。</p><h2 id="_2-maven转向https" tabindex="-1"><a class="header-anchor" href="#_2-maven转向https"><span>2. Maven转向HTTPS</span></a></h2><p>Maven确保从Maven中央仓库自动下载外部库。然而，通过HTTP下载引发安全问题，例如中间人攻击（MITM）的风险。在这种攻击中，恶意代码可能在构建阶段被注入，这可能会感染下游组件及其最终用户。</p><p><strong>为了保持数据完整性和加密，从2020年1月15日起，Maven中央仓库已停止通过HTTP通信。这意味着任何使用HTTP访问中央仓库的尝试都将导致出现错误“返回代码是：501，原因短语：HTTPS Required”。要修复此错误，我们需要确保依赖项是通过HTTPS而不是HTTP获取的。</strong></p><h2 id="_3-更新maven版本" tabindex="-1"><a class="header-anchor" href="#_3-更新maven版本"><span>3. 更新Maven版本</span></a></h2><p>从Maven 3.2.3版本开始，默认通过HTTPS访问中央仓库。如果我们使用的是较旧版本的Maven，我们可以更新到3.2.3或更高版本来修复此错误。</p><p>要更新Maven版本，我们可以从官方Apache Maven下载页面下载最新稳定构建版本。</p><h2 id="_4-限制当前maven版本使用https链接" tabindex="-1"><a class="header-anchor" href="#_4-限制当前maven版本使用https链接"><span>4. 限制当前Maven版本使用HTTPS链接</span></a></h2><p>Maven提供了一个设置文件_settings.xml_，我们可以用它来配置Maven安装。这个_settings.xml_文件包含所有本地和远程仓库链接。要修复此错误，我们需要确保我们在Maven设置中使用HTTPS。以下是验证和更新Maven设置的步骤：</p><h3 id="_4-1-修复-settings-xml-中的-mirrors-部分" tabindex="-1"><a class="header-anchor" href="#_4-1-修复-settings-xml-中的-mirrors-部分"><span>4.1. 修复_settings.xml_中的_mirrors_部分</span></a></h3><p>如果_settings.xml_文件中存在<code>&lt;mirrors&gt;</code>部分，我们需要确保镜像的URL是_https://repo.maven.apache.org/maven2/_。如果该部分不存在，我们可以这样添加它：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>``&lt;mirrors&gt;``\n    `&lt;mirror&gt;`\n        ```&lt;id&gt;```central```&lt;/id&gt;```\n        ```&lt;url&gt;```https://repo.maven.apache.org/maven2/```&lt;/url&gt;```\n        `&lt;mirrorOf&gt;`central`&lt;/mirrorOf&gt;`\n    `&lt;/mirror&gt;`\n`&lt;/mirrors&gt;`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2-修复-settings-xml-中的-pluginrepositories-部分" tabindex="-1"><a class="header-anchor" href="#_4-2-修复-settings-xml-中的-pluginrepositories-部分"><span>4.2. 修复_settings.xml_中的_pluginRepositories_部分</span></a></h3><p>与镜像部分类似，我们也可能有一个_pluginRepositories_部分，我们需要使用带有HTTPS的URL：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>`&lt;pluginRepositories&gt;`\n    `&lt;pluginRepository&gt;`\n        ```&lt;id&gt;```central```&lt;/id&gt;```\n        ```&lt;url&gt;```https://repo.maven.apache.org/maven2/```&lt;/url&gt;```\n    `&lt;/pluginRepository&gt;`\n`&lt;/pluginRepositories&gt;`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-3-修复-pom-xml-中的-repositories-部分" tabindex="-1"><a class="header-anchor" href="#_4-3-修复-pom-xml-中的-repositories-部分"><span>4.3. 修复_pom.xml_中的_repositories_部分</span></a></h3><p>_pom.xml_文件还包含一个仓库部分，我们需要使用带有HTTPS的URL：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>`&lt;repositories&gt;`\n    `&lt;repository&gt;`\n        ```&lt;id&gt;```central```&lt;/id&gt;```\n        `&lt;name&gt;`Central Repository`&lt;/name&gt;`\n        ```&lt;url&gt;```https://repo.maven.apache.org/maven2```&lt;/url&gt;```\n        `&lt;layout&gt;`default`&lt;/layout&gt;`\n        `&lt;snapshots&gt;`\n            `&lt;enabled&gt;`false`&lt;/enabled&gt;`\n        `&lt;/snapshots&gt;`\n    `&lt;/repository&gt;`\n`&lt;/repositories&gt;`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在进行这些更改后，Maven应该通过HTTPS下载依赖项。</p><h2 id="_5-当构建环境不支持https时的修复" tabindex="-1"><a class="header-anchor" href="#_5-当构建环境不支持https时的修复"><span>5. 当构建环境不支持HTTPS时的修复</span></a></h2><p>有时，我们可能会遇到技术限制，例如在构建环境中使用JDK6或缺乏HTTPS支持。<strong>这些限制可能会阻碍我们过渡到HTTPS。</strong></p><p><strong>为了支持这些场景，Maven团队已经建立了一个专用域用于不安全流量。我们可以将所有现有引用替换为此URL，以便于通过HTTP下载。</strong></p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本教程中，我们探讨了解决“返回代码是：501，原因短语：HTTPS Required”错误的方法。首先，我们了解了错误的基本信息。</p><p>之后，我们通过更新Maven版本或修复_settings.xml_文件来查看修复方法。</p>',27),s=[r];function l(d,o){return n(),t("div",null,s)}const c=e(i,[["render",l],["__file","2024-06-24-Maven Dependencies Failing With a 501 Error  HTTPS Required .html.vue"]]),v=JSON.parse('{"path":"/posts/baeldung/2024-06-24/2024-06-24-Maven%20Dependencies%20Failing%20With%20a%20501%20Error%20%20HTTPS%20Required%20.html","title":"Maven依赖项因501错误“HTTPS Required”失败 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-06-24T00:00:00.000Z","category":["Maven","HTTPS"],"tag":["Maven","HTTPS","501错误"],"head":[["meta",{"name":"keywords","content":"Maven, HTTPS, 501错误, 解决方案"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-24/2024-06-24-Maven%20Dependencies%20Failing%20With%20a%20501%20Error%20%20HTTPS%20Required%20.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Maven依赖项因501错误“HTTPS Required”失败 | Baeldung"}],["meta",{"property":"og:description","content":"Maven依赖项因501错误“HTTPS Required”失败 | Baeldung 1. 概述 在本教程中，我们将了解错误“返回代码是：501，原因短语：HTTPS Required”。我们将首先理解这个错误的含义，然后探索解决此错误的步骤。 2. Maven转向HTTPS Maven确保从Maven中央仓库自动下载外部库。然而，通过HTTP下载引..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-24T10:32:54.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Maven"}],["meta",{"property":"article:tag","content":"HTTPS"}],["meta",{"property":"article:tag","content":"501错误"}],["meta",{"property":"article:published_time","content":"2024-06-24T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-24T10:32:54.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Maven依赖项因501错误“HTTPS Required”失败 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-24T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-24T10:32:54.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Maven依赖项因501错误“HTTPS Required”失败 | Baeldung 1. 概述 在本教程中，我们将了解错误“返回代码是：501，原因短语：HTTPS Required”。我们将首先理解这个错误的含义，然后探索解决此错误的步骤。 2. Maven转向HTTPS Maven确保从Maven中央仓库自动下载外部库。然而，通过HTTP下载引..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. Maven转向HTTPS","slug":"_2-maven转向https","link":"#_2-maven转向https","children":[]},{"level":2,"title":"3. 更新Maven版本","slug":"_3-更新maven版本","link":"#_3-更新maven版本","children":[]},{"level":2,"title":"4. 限制当前Maven版本使用HTTPS链接","slug":"_4-限制当前maven版本使用https链接","link":"#_4-限制当前maven版本使用https链接","children":[{"level":3,"title":"4.1. 修复_settings.xml_中的_mirrors_部分","slug":"_4-1-修复-settings-xml-中的-mirrors-部分","link":"#_4-1-修复-settings-xml-中的-mirrors-部分","children":[]},{"level":3,"title":"4.2. 修复_settings.xml_中的_pluginRepositories_部分","slug":"_4-2-修复-settings-xml-中的-pluginrepositories-部分","link":"#_4-2-修复-settings-xml-中的-pluginrepositories-部分","children":[]},{"level":3,"title":"4.3. 修复_pom.xml_中的_repositories_部分","slug":"_4-3-修复-pom-xml-中的-repositories-部分","link":"#_4-3-修复-pom-xml-中的-repositories-部分","children":[]}]},{"level":2,"title":"5. 当构建环境不支持HTTPS时的修复","slug":"_5-当构建环境不支持https时的修复","link":"#_5-当构建环境不支持https时的修复","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1719225174000,"updatedTime":1719225174000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.72,"words":815},"filePathRelative":"posts/baeldung/2024-06-24/2024-06-24-Maven Dependencies Failing With a 501 Error  HTTPS Required .md","localizedDate":"2024年6月24日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>在本教程中，我们将了解错误“返回代码是：501，原因短语：HTTPS Required”。我们将首先理解这个错误的含义，然后探索解决此错误的步骤。</p>\\n<h2>2. Maven转向HTTPS</h2>\\n<p>Maven确保从Maven中央仓库自动下载外部库。然而，通过HTTP下载引发安全问题，例如中间人攻击（MITM）的风险。在这种攻击中，恶意代码可能在构建阶段被注入，这可能会感染下游组件及其最终用户。</p>\\n<p><strong>为了保持数据完整性和加密，从2020年1月15日起，Maven中央仓库已停止通过HTTP通信。这意味着任何使用HTTP访问中央仓库的尝试都将导致出现错误“返回代码是：501，原因短语：HTTPS Required”。要修复此错误，我们需要确保依赖项是通过HTTPS而不是HTTP获取的。</strong></p>","autoDesc":true}');export{c as comp,v as data};
