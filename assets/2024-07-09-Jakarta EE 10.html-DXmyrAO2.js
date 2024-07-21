import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as e,a as r}from"./app-CtR6X2Br.js";const o={},l=r('<h1 id="jakarta-ee-10-baeldung" tabindex="-1"><a class="header-anchor" href="#jakarta-ee-10-baeldung"><span>Jakarta EE 10 | Baeldung</span></a></h1><ol><li>概览</li></ol><p>在本教程中，我们将讨论Jakarta EE的最新发布。我们的目标是理解Jakarta的新变化以及这些变化如何影响Java平台。</p><p>到本教程结束时，我们希望您能够理解Jakarta的变化及其近期的未来。</p><ol start="2"><li>什么是Jakarta EE</li></ol><p><strong>Jakarta EE是一个用于开发Java Web应用程序的开源框架，或者按照目前的表述，是云原生Java。</strong> 之前被称为Java EE（Java Enterprise Edition），由Oracle通过JCP（Java社区过程）开发和维护。然而，几年前，更确切地说是在2017年，Eclipse基金会接管了该项目。尽管如此，这两个组织无法达成一致，项目无法继续使用_javax.<em>*和_java.</em>*商标。这就是为什么现在项目被称为Jakarta的原因。</p><p><strong>项目的主要理念始终是标准化并提供一套供应商中立的规范，以便Java应用程序能够轻松地从一个供应商实现移植到另一个供应商。</strong> 这将确保供应商之间的灵活性、可靠性、稳定性、互操作性和质量。</p><p>Jakarta EE现在使用JESP（Jakarta EE规范过程）。该过程保证所有规范包含以下内容：</p><ul><li>规范和_JavaDocs_的文档。</li><li>为给定规范定义的API。</li><li>TCK（技术兼容性工具包）和定义必须实现以确保规范合规性的测试的文档。</li><li>至少有一个实现遵循TCK。</li></ul><ol start="3"><li>Jakarta EE发布</li></ol><p>现在我们知道Jakarta EE是一个提供一套规范的框架，以便其他供应商可以以标准方式实现它们。让我们回顾一下这个项目的近期历史。</p><p>自从Eclipse基金会接手该项目以来，项目中没有引入任何新功能。在这段时间里，交付的唯一变化包括：</p><ul><li>版本8：与Java版本8完全兼容。</li><li>版本9：破坏性发布，将命名空间更改为_jakarta.<em>*而不是_javax.</em>*。</li><li>版本9.1：支持Java 11。</li></ul><p>正如人们可以想象的，对于开发人员来说，最近的几个版本并没有像它们可能的那样令人兴奋。然而，这给了他们时间来成熟其他讨论，比如像_MicroProfile_这样的轻量级应用程序和其他可能的未来规范。</p><p>现在我们已经清楚了Jakarta EE是什么以及我们是如何到达这里的。让我们讨论它最近的发布，Jakarta EE 10。</p><p>这些最后的发布专注于使Jakarta成为一个强大的框架，允许通过云原生Java应用程序进行创新。或者，用他们自己的话来说，“<strong>Jakarta EE 10现已推出，引入了构建现代化、简化和轻量级云原生Java应用程序的功能，为企业Java技术在开放、供应商中立、社区驱动的过程中的演变和创新提供了新的基线。</strong>”</p><p>正如所提到的，这个发布是自项目开发和协调控制变化以来最相关的。在新功能、内部变化、弃用和删除之间，有超过20个组件规范的变化。该发布现在针对Java 11，但也支持Java 17，当前的LTS版本。此外，平台现在支持JPMS：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/02/jakarta-ee-10-platform-1-974x1024.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>在平台新增方面，两个重要新闻是名为CDI Lite 4.0的新组件规范和新的Jarkarta Core配置文件。接下来，让我们更深入地了解一些新增加和较小的变化。</p><p>4.1. 新组件</p><p><strong>全新的CDI Lite 4.0组件规范专注于提供CDI规范中已有功能的较小子集。</strong> 它针对像Micronaut、Quarkus、Helidon等较短的运行时间，并还将支持使用GraalVM编译为本地代码。因此，许多动态特性必须在构建时工作，一些特性必须重写，例如扩展。由于目标是较小的运行时间，一些关键特性被移除。</p><p><strong>继续朝着较小运行时间的方向发展，新的Core Profile规范旨在尝试标准化这样的MicroProfiles</strong>，以及上述框架。使用像Web Profile这样的规范子集，但不带一些用户关注规范，例如Faces。这个规范旨在通过减少学习曲线并使它们更便携，使微服务或较小应用程序的开发更加容易。</p><p>4.2. 组件更新</p><p>平台上的更新列表非常显著，但一些亮点包括：</p><ul><li><strong>Web Profile 10</strong>：并发和资源管理现在成为这个规范的一部分</li><li><strong>Security 3.0</strong>：新的认证方法OpenId连接，标准化了这项技术在不同供应商之间的实现。一些较小的内部更新和一些较旧事物的弃用</li><li><strong>Persistency 3.1</strong>：增加了对_UUIDs_和_UUID_主键生成策略的支持，并再次标准化了供应商之间的使用</li><li><strong>Restful APIs 3.1</strong>：Multipart/form-data支持下载和上传。新的引导API可以在不需要应用程序服务器的情况下运行jar，并且_@Context_被弃用</li><li><strong>EJB 4.0</strong>：移除了实体bean，可嵌入_EJB_容器</li><li><strong>Faces 4.0</strong>：移除了对_JSP_支持、管理bean、资源解析器等的支持。新的类型安全Faces视图和_@ClientWindowScoped_</li><li><strong>CDI 4.0</strong>：发现模式现在默认为注释而不是全部。因此，如果beans.xml为空，将默认只发现注释的bean</li><li><strong>Servlets 6.0</strong>：之前标记为弃用的所有类和方法都被移除</li><li><strong>Batch 2.1</strong>：更好的CDI支持</li></ul><p>除此之外，与并发相关的，还添加了新的注释来管理资源和控制任务的执行_@ManagedExecutionDefinition_和_@Asynchronous_。</p><p>4.2. 未来</p><p>尽管这个发布为平台带来了许多新功能和概念，但社区和项目论坛中仍在进行许多讨论。关于下一个版本，Jakarta 11的对话已经开始，未来承诺将带来更多创新。预期的新规范示例包括RPC、Data、Config和NoSQL。始终致力于现代化、简化和标准化平台中的这些技术。</p><ol start="5"><li>如何迁移？</li></ol><p>然而，要利用所有这些新功能和能力，我们需要升级版本并迁移到Jakarta 10。许多工具可以帮助我们迁移；尽管如此，如果我们决定走这条路，我们需要确保遵循一些步骤：</p><ol><li>在POM/Gradle或首选构建工具中更新Jakarta版本</li><li>将导入从_javax.<em>*更改为_jakarta.</em>*</li><li>修复XML模式命名空间，如持久性XML等</li><li>重命名属性前缀。与包命名空间类似，属性前缀也发生了变化</li><li>重命名引导文件，同上</li><li>验证应用程序行为</li></ol><p>通过遵循所有步骤，我们可以以较小到适度的努力迁移我们的应用程序。</p><ol start="6"><li>结论</li></ol><p>在本文中，我们研究了Jakarta EE 10的新发布，它为平台带来的演变，以及它的一些细微差别。此外，我们还查看了项目的未来和可能即将到来的规范。最后，我们了解了从任何低于9.0版本的版本迁移到最新发布版本的所有必要步骤。</p><p>希望现在我们对这个平台历史上的重要里程碑有了更多的了解，并决定是否考虑在我们的应用程序和未来项目中升级或使用它。</p>',35),n=[l];function i(p,s){return e(),t("div",null,n)}const E=a(o,[["render",i],["__file","2024-07-09-Jakarta EE 10.html.vue"]]),g=JSON.parse('{"path":"/posts/baeldung/2024-07-09/2024-07-09-Jakarta%20EE%2010.html","title":"Jakarta EE 10 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2023-02-01T00:00:00.000Z","category":["Jakarta EE","Java"],"tag":["Java","Web Applications"],"head":[["meta",{"name":"keywords","content":"Jakarta EE 10, Java, Cloud-Native, MicroProfile, Open Source, Eclipse Foundation"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-09/2024-07-09-Jakarta%20EE%2010.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Jakarta EE 10 | Baeldung"}],["meta",{"property":"og:description","content":"Jakarta EE 10 | Baeldung 概览 在本教程中，我们将讨论Jakarta EE的最新发布。我们的目标是理解Jakarta的新变化以及这些变化如何影响Java平台。 到本教程结束时，我们希望您能够理解Jakarta的变化及其近期的未来。 什么是Jakarta EE Jakarta EE是一个用于开发Java Web应用程序的开源框架，..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2023/02/jakarta-ee-10-platform-1-974x1024.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-09T12:00:23.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Web Applications"}],["meta",{"property":"article:published_time","content":"2023-02-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-09T12:00:23.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Jakarta EE 10 | Baeldung\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2023/02/jakarta-ee-10-platform-1-974x1024.png\\"],\\"datePublished\\":\\"2023-02-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-09T12:00:23.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Jakarta EE 10 | Baeldung 概览 在本教程中，我们将讨论Jakarta EE的最新发布。我们的目标是理解Jakarta的新变化以及这些变化如何影响Java平台。 到本教程结束时，我们希望您能够理解Jakarta的变化及其近期的未来。 什么是Jakarta EE Jakarta EE是一个用于开发Java Web应用程序的开源框架，..."},"headers":[],"git":{"createdTime":1720526423000,"updatedTime":1720526423000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":6.33,"words":1899},"filePathRelative":"posts/baeldung/2024-07-09/2024-07-09-Jakarta EE 10.md","localizedDate":"2023年2月1日","excerpt":"\\n<ol>\\n<li>概览</li>\\n</ol>\\n<p>在本教程中，我们将讨论Jakarta EE的最新发布。我们的目标是理解Jakarta的新变化以及这些变化如何影响Java平台。</p>\\n<p>到本教程结束时，我们希望您能够理解Jakarta的变化及其近期的未来。</p>\\n<ol start=\\"2\\">\\n<li>什么是Jakarta EE</li>\\n</ol>\\n<p><strong>Jakarta EE是一个用于开发Java Web应用程序的开源框架，或者按照目前的表述，是云原生Java。</strong> 之前被称为Java EE（Java Enterprise Edition），由Oracle通过JCP（Java社区过程）开发和维护。然而，几年前，更确切地说是在2017年，Eclipse基金会接管了该项目。尽管如此，这两个组织无法达成一致，项目无法继续使用_javax.<em>*和_java.</em>*商标。这就是为什么现在项目被称为Jakarta的原因。</p>","autoDesc":true}');export{E as comp,g as data};
