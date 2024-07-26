import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as t,a as i}from"./app-DpYLEM_u.js";const a={},l=i('<h1 id="maven插件中排除依赖" tabindex="-1"><a class="header-anchor" href="#maven插件中排除依赖"><span>Maven插件中排除依赖</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在Maven中排除依赖是一项常见操作。然而，当涉及到Maven插件时，这一操作会变得更加困难。</p><h2 id="_2-什么是依赖排除" tabindex="-1"><a class="header-anchor" href="#_2-什么是依赖排除"><span>2. 什么是依赖排除</span></a></h2><p>Maven管理依赖的传递性。这意味着<strong>Maven可以自动添加我们添加的依赖所需的所有依赖</strong>。在某些情况下，这种<strong>传递性可以迅速增加依赖的数量，因为它添加了级联依赖</strong>。</p><p>例如，如果我们有依赖关系如A → B → C → D，那么A将依赖于B、C和D。如果A只使用B的一小部分，而这部分不需要C，那么我们可以告诉Maven在A中忽略B → C的依赖。</p><p>因此，A将只依赖于B，而不再依赖于C和D。这被称为依赖排除。</p><h2 id="_3-排除传递依赖" tabindex="-1"><a class="header-anchor" href="#_3-排除传递依赖"><span>3. 排除传递依赖</span></a></h2><p>我们可以使用_<code>&lt;exclusions&gt;</code><em>元素来排除子依赖，该元素包含对特定依赖的一组排除。**简言之，我们只需要在POM文件中的</em><code>&lt;dependency&gt;</code><em>元素中添加一个</em><code>&lt;exclusions&gt;</code>_元素即可**。</p><p>例如，考虑_commons-text_依赖的例子，假设我们的项目只使用_commons-text_的代码，而不需要_commons-lang_子依赖。</p><p>我们将能够在POM文件中_commons-text_依赖声明中添加一个_<code>&lt;exclusions&gt;</code>_部分，从而从我们的项目中排除_commons-lang_依赖，如下所示：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>`&lt;project&gt;`\n    ...\n    ``&lt;dependencies&gt;``\n        ...\n        ```&lt;dependency&gt;```\n            `````&lt;groupId&gt;`````org.apache.commons`````&lt;/groupId&gt;`````\n            `````&lt;artifactId&gt;`````commons-text`````&lt;/artifactId&gt;`````\n            ````&lt;version&gt;````1.1````&lt;/version&gt;````\n            `````&lt;exclusions&gt;`````\n                `&lt;exclusion&gt;`\n                    `````&lt;groupId&gt;`````org.apache.commons`````&lt;/groupId&gt;`````\n                    `````&lt;artifactId&gt;`````commons-lang3`````&lt;/artifactId&gt;`````\n                `&lt;/exclusion&gt;`\n            `&lt;/exclusions&gt;`\n        ``&lt;/dependency&gt;``\n    ``&lt;/dependencies&gt;``\n    ...\n``&lt;/project&gt;``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因此，如果我们使用上述POM重建项目，我们将看到_commons-text_库被集成到我们的项目中，但没有_commons-lang_库。</p><h2 id="_4-从插件中排除传递依赖" tabindex="-1"><a class="header-anchor" href="#_4-从插件中排除传递依赖"><span>4. 从插件中排除传递依赖</span></a></h2><p>到目前为止，Maven还不支持从插件中排除直接依赖，并且已经有一个开放的问题来包含这个新功能。在本章中，<strong>我们将讨论一个通过使用虚拟依赖来覆盖来排除Maven插件的直接依赖的解决方法</strong>。</p><p>假设我们必须排除Maven Surefire插件的JUnit 4.7依赖。</p><p>首先，我们必须创建一个虚拟模块，它必须是我们项目根POM的一部分。该模块将只包含一个POM文件，如下所示：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>`&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;`\n`&lt;project xmlns:xsi=&quot;http://www.w3.org/2001/XMLSchema-instance&quot;\n         xmlns=&quot;http://maven.apache.org/POM/4.0.0&quot;\n         xsi:schemaLocation=&quot;http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd&quot;&gt;`\n    `&lt;modelVersion&gt;`4.0.0`&lt;/modelVersion&gt;`\n    `````&lt;groupId&gt;`````org.apache.maven.surefire`````&lt;/groupId&gt;`````\n    `````&lt;artifactId&gt;`````surefire-junit47`````&lt;/artifactId&gt;`````\n    ````&lt;version&gt;````dummy````&lt;/version&gt;````\n``&lt;/project&gt;``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们需要调整我们希望停用依赖的子POM。为此，我们必须将虚拟版本的依赖添加到Maven Surefire插件声明中：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>`&lt;build&gt;`\n    `&lt;plugins&gt;`\n        `&lt;plugin&gt;`\n            `````&lt;groupId&gt;`````org.apache.maven.plugins`````&lt;/groupId&gt;`````\n            `````&lt;artifactId&gt;`````maven-surefire-plugin`````&lt;/artifactId&gt;`````\n            ````&lt;version&gt;````${surefire-version}````&lt;/version&gt;````\n            `&lt;configuration&gt;`\n                `&lt;runOrder&gt;`alphabetical`&lt;/runOrder&gt;`\n                `&lt;threadCount&gt;`1`&lt;/threadCount&gt;`\n                `&lt;properties&gt;`\n                    `&lt;property&gt;`\n                        `&lt;name&gt;`junit`&lt;/name&gt;`\n                        `&lt;value&gt;`false`&lt;/value&gt;`\n                    `&lt;/property&gt;`\n                `&lt;/properties&gt;`\n            `&lt;/configuration&gt;`\n            ``&lt;dependencies&gt;``\n                ```&lt;dependency&gt;```\n                    `&lt;!-- 通过使用空的虚拟依赖来停用JUnit 4.7引擎 --&gt;`\n                    `````&lt;groupId&gt;`````org.apache.maven.surefire`````&lt;/groupId&gt;`````\n                    `````&lt;artifactId&gt;`````surefire-junit47`````&lt;/artifactId&gt;`````\n                    ````&lt;version&gt;````dummy````&lt;/version&gt;````\n                ``&lt;/dependency&gt;``\n            ``&lt;/dependencies&gt;``\n        `&lt;/plugin&gt;`\n    `&lt;/plugins&gt;`\n`&lt;/build&gt;`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，一旦我们构建项目，我们将看到Maven Surefire插件的JUnit 4.7依赖没有被包含在项目中，并且排除已经成功。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在这个快速教程中，我们解释了依赖排除以及如何使用_<code>&lt;exclusions&gt;</code>_元素来排除传递依赖。此外，我们展示了一个排除插件中直接依赖的解决方法，即通过使用虚拟依赖来覆盖。</p><p>如常，代码可在GitHub上找到。</p>',24),s=[l];function d(r,c){return t(),n("div",null,s)}const u=e(a,[["render",d],["__file","2024-07-08-Exclude a Dependency in a Maven Plugin.html.vue"]]),p=JSON.parse('{"path":"/posts/baeldung/2024-07-08/2024-07-08-Exclude%20a%20Dependency%20in%20a%20Maven%20Plugin.html","title":"Maven插件中排除依赖","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Maven","插件"],"tag":["Maven插件","依赖排除"],"head":[["meta",{"name":"keywords","content":"Maven, Maven插件, 依赖排除, 插件依赖, 排除插件依赖"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-08/2024-07-08-Exclude%20a%20Dependency%20in%20a%20Maven%20Plugin.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Maven插件中排除依赖"}],["meta",{"property":"og:description","content":"Maven插件中排除依赖 1. 概述 在Maven中排除依赖是一项常见操作。然而，当涉及到Maven插件时，这一操作会变得更加困难。 2. 什么是依赖排除 Maven管理依赖的传递性。这意味着Maven可以自动添加我们添加的依赖所需的所有依赖。在某些情况下，这种传递性可以迅速增加依赖的数量，因为它添加了级联依赖。 例如，如果我们有依赖关系如A → B ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-08T21:59:50.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Maven插件"}],["meta",{"property":"article:tag","content":"依赖排除"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-08T21:59:50.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Maven插件中排除依赖\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-08T21:59:50.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Maven插件中排除依赖 1. 概述 在Maven中排除依赖是一项常见操作。然而，当涉及到Maven插件时，这一操作会变得更加困难。 2. 什么是依赖排除 Maven管理依赖的传递性。这意味着Maven可以自动添加我们添加的依赖所需的所有依赖。在某些情况下，这种传递性可以迅速增加依赖的数量，因为它添加了级联依赖。 例如，如果我们有依赖关系如A → B ..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 什么是依赖排除","slug":"_2-什么是依赖排除","link":"#_2-什么是依赖排除","children":[]},{"level":2,"title":"3. 排除传递依赖","slug":"_3-排除传递依赖","link":"#_3-排除传递依赖","children":[]},{"level":2,"title":"4. 从插件中排除传递依赖","slug":"_4-从插件中排除传递依赖","link":"#_4-从插件中排除传递依赖","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720475990000,"updatedTime":1720475990000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.97,"words":891},"filePathRelative":"posts/baeldung/2024-07-08/2024-07-08-Exclude a Dependency in a Maven Plugin.md","localizedDate":"2022年4月1日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>在Maven中排除依赖是一项常见操作。然而，当涉及到Maven插件时，这一操作会变得更加困难。</p>\\n<h2>2. 什么是依赖排除</h2>\\n<p>Maven管理依赖的传递性。这意味着<strong>Maven可以自动添加我们添加的依赖所需的所有依赖</strong>。在某些情况下，这种<strong>传递性可以迅速增加依赖的数量，因为它添加了级联依赖</strong>。</p>\\n<p>例如，如果我们有依赖关系如A → B → C → D，那么A将依赖于B、C和D。如果A只使用B的一小部分，而这部分不需要C，那么我们可以告诉Maven在A中忽略B → C的依赖。</p>","autoDesc":true}');export{u as comp,p as data};
