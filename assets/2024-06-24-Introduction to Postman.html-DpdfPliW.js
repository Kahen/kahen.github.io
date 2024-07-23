import{_ as t}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as e,o as a,a as n}from"./app-LwwahXlT.js";const p={},s=n('<h1 id="postman入门指南" tabindex="-1"><a class="header-anchor" href="#postman入门指南"><span>Postman入门指南</span></a></h1><p>Postman是一个流行的API开发工具，它简化了设计、测试、修改和记录API的过程。它提供了一个用户友好的界面，允许用户发送和接收HTTP请求，使用环境和集合管理工作流，执行自动化测试，创建模拟服务器进行测试，并生成API文档。</p><p>由于其多功能性，它受到从事API中心工作流的开发人员、测试人员和其他IT专业人员的高度评价。</p><p>在本教程中，我们将讨论如何安装、设置和使用Postman的最重要功能。</p><h2 id="_2-安装和设置" tabindex="-1"><a class="header-anchor" href="#_2-安装和设置"><span>2. 安装和设置</span></a></h2><p>Postman可以作为Windows、Mac或Linux操作系统的桌面应用程序下载。它也可作为网络应用程序提供。然而，并非所有功能都可用。</p><p>安装后，我们需要注册并创建一个免费账户。</p><h2 id="_3-发送http请求" tabindex="-1"><a class="header-anchor" href="#_3-发送http请求"><span>3. 发送HTTP请求</span></a></h2><p>在Postman中发送API请求是一项基本操作。Postman提供了一组免费的公共REST API，这些API不需要任何认证，我们将利用这些API来展示一些Postman的功能。</p><p>我们将使用API检索特定国家的大学和学院。</p><p>让我们创建一个名为“baeldung-test-workspace”的工作区。创建后，我们可以点击“新建”按钮并选择“HTTP”。</p><p>为了在Postman中测试发送请求，我们将URL设置为http://universities.hipolabs.com/search?country=Germany，并将方法设置为GET：</p><p>发送请求后，Postman将在侧边栏中显示响应数据。我们可以在这里查看状态码、标头和响应体。</p><p>如果我们没有收到成功的响应，侧边栏中的响应状态和详细信息将帮助我们识别问题。</p><p>在这个例子中，我们使用了GET方法，但根据场景，我们可以选择其他最常见的方法，如POST、PUT、PATCH、DELETE，或者输入一种新的方法。</p><p>我们还使用了国家名称的查询参数。<strong>在使用查询参数时，它们可以输入在请求URL中，也可以在专门的查询参数标签页中输入，作为键值对。Postman自然支持路径参数，这些参数也作为请求URL的一部分输入。</strong></p><h2 id="_4-环境" tabindex="-1"><a class="header-anchor" href="#_4-环境"><span>4. 环境</span></a></h2><p>有效地管理跨不同环境的请求可能会很复杂。然而，<strong>Postman的环境允许我们为不同环境管理变量</strong>，使得在开发、测试和生产环境之间切换变得容易。</p><p>让我们通过点击“新建”按钮并选择“环境：开发和测试”来创建两个不同的环境：</p><p>在这里，我们可以输入初始值和当前值。<strong>初始值是变量的默认设置，而当前值是在实际请求中引用变量时使用的值。</strong> 如果我们在保存环境时留空当前值，初始值将用作当前值。</p><p>我们将在每个环境中创建一个名为country的变量，分别为开发环境分配“Germany”值，为测试环境分配“France”值：</p><p>我们选择了右上角的_Development_环境，然后点击了_发送_按钮。国家的值被解析为“Germany”。变量不仅可以用于查询参数——它们还可以在请求URL、标头和正文数据中引用。</p><h2 id="_5-集合" tabindex="-1"><a class="header-anchor" href="#_5-集合"><span>5. 集合</span></a></h2><p>管理针对API不同方面的单独请求在有效组织方面可能是一个挑战。此外，跨不同环境的API参数不同，需要在不同环境中执行相同的请求集而无需修改。</p><p>这就是集合的用处所在，<strong>它们帮助更有效地管理API工作流。</strong> 一个集合可以与特定环境相关联，允许我们在请求中使用环境变量。</p><p>在API工作流中，经常需要按特定顺序执行多个请求，<strong>集合可以通过按特定顺序执行请求来提供帮助。</strong></p><p>通常，<strong>集合是将请求分组以便更轻松地管理和团队成员之间协作的有效方式。</strong></p><h3 id="_5-1-创建集合" tabindex="-1"><a class="header-anchor" href="#_5-1-创建集合"><span>5.1. 创建集合</span></a></h3><p>让我们通过点击_创建集合_按钮或保存我们现有的GET请求来创建一个新的集合。我们还将添加一个GET请求，以检索法国的所有大学和学院，并将它们保存到这个新集合中。</p><p>通过点击左侧边栏中的集合名称，我们可以看到多个标签，每个标签<strong>允许我们自定义和配置我们的集合，例如通过添加将与集合中的每个请求一起执行的测试。</strong></p><h3 id="_5-2-集合运行器" tabindex="-1"><a class="header-anchor" href="#_5-2-集合运行器"><span>5.2. 集合运行器</span></a></h3><p>我们现在将专注于使用_集合运行器_运行我们的集合，在这里我们可以按特定顺序运行我们的请求，无论是手动、按计划，还是从命令行运行。<strong>我们可以通过这种方式测试API的功能方面。</strong> 然而，<strong>_集合运行器_还允许我们通过模拟现实世界的流量场景来测试API的性能。</strong></p><p>_集合运行器_可以以多种方式进一步配置，但为了演示目的，我们将保持简单，并仅选择手动运行选项。</p><p>最后，可以通过点击_运行测试集合_按钮来运行集合：</p><p>现在，我们可以查看我们的集合运行结果。<strong>Postman将显示执行请求的结果和任何包含的测试结果。</strong> 在这里，我们可以看到有用的信息，如环境、持续时间、平均响应时间和每个请求的结果。</p><h2 id="_6-总结" tabindex="-1"><a class="header-anchor" href="#_6-总结"><span>6. 总结</span></a></h2><p>在本文中，我们讨论了Postman——一个强大的API工作工具。</p><p><strong>我们涵盖了如何发送HTTP请求、将变量分组到可以在发送请求时引用的环境，以及将请求分组到集合中的基本要素。</strong> 然而，这只是Postman广泛功能的冰山一角。高级功能，如通过集合进行自动化测试和创建模拟服务器进行测试，可以显著增强我们的API开发过程，特别是在处理复杂场景时。Postman入门指南</p><p>Postman是一个流行的API开发工具，它简化了设计、测试、修改和记录API的过程。它提供了一个用户友好的界面，允许用户发送和接收HTTP请求，使用环境和集合管理工作流，执行自动化测试，创建模拟服务器进行测试，并生成API文档。</p><p>由于其多功能性，它受到从事API中心工作流的开发人员、测试人员和其他IT专业人员的高度评价。</p><p>在本教程中，我们将讨论如何安装、设置和使用Postman的最重要功能。</p><h2 id="_2-安装和设置-1" tabindex="-1"><a class="header-anchor" href="#_2-安装和设置-1"><span>2. 安装和设置</span></a></h2><p>Postman可以作为Windows、Mac或Linux操作系统的桌面应用程序下载。它也可作为网络应用程序提供。然而，并非所有功能都可用。</p><p>安装后，我们需要注册并创建一个免费账户。</p><h2 id="_3-发送http请求-1" tabindex="-1"><a class="header-anchor" href="#_3-发送http请求-1"><span>3. 发送HTTP请求</span></a></h2><p>在Postman中发送API请求是一项基本操作。Postman提供了一组免费的公共REST API，这些API不需要任何认证，我们将利用这些API来展示一些Postman的功能。</p><p>我们将使用API检索特定国家的大学和学院。</p><p>让我们创建一个名为“baeldung-test-workspace”的工作区。创建后，我们可以点击“新建”按钮并选择“HTTP”。</p><p>为了在Postman中测试发送请求，我们将URL设置为http://universities.hipolabs.com/search?country=Germany，并将方法设置为GET。</p><p>发送请求后，Postman将在侧边栏中显示响应数据。我们可以在这里查看状态码、标头和响应体。</p><p>如果我们没有收到成功的响应，侧边栏中的响应状态和详细信息将帮助我们识别问题。</p><p>在这个例子中，我们使用了GET方法，但根据场景，我们可以选择其他最常见的方法，如POST、PUT、PATCH、DELETE，或者输入一种新的方法。</p><p>我们还使用了国家名称的查询参数。在使用查询参数时，它们可以输入在请求URL中，也可以在专门的查询参数标签页中输入，作为键值对。Postman自然支持路径参数，这些参数也作为请求URL的一部分输入。</p><h2 id="_4-环境-1" tabindex="-1"><a class="header-anchor" href="#_4-环境-1"><span>4. 环境</span></a></h2><p>有效地管理跨不同环境的请求可能会很复杂。然而，Postman的环境允许我们为不同环境管理变量，使得在开发、测试和生产环境之间切换变得容易。</p><p>让我们通过点击“新建”按钮并选择“环境：开发和测试”来创建两个不同的环境：</p><p>在这里，我们可以输入初始值和当前值。初始值是变量的默认设置，而当前值是在实际请求中引用变量时使用的值。如果我们在保存环境时留空当前值，初始值将用作当前值。</p><p>我们将在每个环境中创建一个名为country的变量，分别为开发环境分配“Germany”值，为测试环境分配“France”值：</p><p>我们选择了右上角的_Development_环境，然后点击了_发送_按钮。国家的值被解析为“Germany”。变量不仅可以用于查询参数——它们还可以在请求URL、标头和正文数据中引用。</p><h2 id="_5-集合-1" tabindex="-1"><a class="header-anchor" href="#_5-集合-1"><span>5. 集合</span></a></h2><p>管理针对API不同方面的单独请求在有效组织方面可能是一个挑战。此外，跨不同环境的API参数不同，需要在不同环境中执行相同的请求集而无需修改。</p><p>这就是集合的用处所在，它们帮助更有效地管理API工作流。一个集合可以与特定环境相关联，允许我们在请求中使用环境变量。</p><p>在API工作流中，经常需要按特定顺序执行多个请求，集合可以通过按特定顺序执行请求来提供帮助。</p><p>通常，集合是将请求分组以便更轻松地管理和团队成员之间协作的有效方式。</p><h3 id="_5-1-创建集合-1" tabindex="-1"><a class="header-anchor" href="#_5-1-创建集合-1"><span>5.1. 创建集合</span></a></h3><p>让我们通过点击_创建集合_按钮或保存我们现有的GET请求来创建一个新的集合。我们还将添加一个GET请求，以检索法国的所有大学和学院，并将它们保存到这个新集合中。</p><p>通过点击左侧边栏中的集合名称，我们可以看到多个标签，每个标签允许我们自定义和配置我们的集合，例如通过添加将与集合中的每个请求一起执行的测试。</p><h3 id="_5-2-集合运行器-1" tabindex="-1"><a class="header-anchor" href="#_5-2-集合运行器-1"><span>5.2. 集合运行器</span></a></h3><p>我们现在将专注于使用_集合运行器_运行我们的集合，在这里我们可以按特定顺序运行我们的请求，无论是手动、按计划，还是从命令线运行。我们可以通过这种方式测试API的功能方面。然而，集合运行器还允许我们通过模拟现实世界的流量场景来测试API的性能。</p><p>集合运行器可以以多种方式进一步配置，但为了演示目的，我们将保持简单，并仅选择手动运行选项。</p><p>最后，可以通过点击_运行测试集合_按钮来运行集合：</p><p>现在，我们可以查看我们的集合运行结果。Postman将显示执行请求的结果和任何包含的测试结果。在这里，我们可以看到有用的信息，如环境、持续时间、平均响应时间和每个请求的结果。</p><h2 id="_6-总结-1" tabindex="-1"><a class="header-anchor" href="#_6-总结-1"><span>6. 总结</span></a></h2><p>在本文中，我们讨论了Postman——一个强大的API工作工具。</p><p>我们涵盖了如何发送HTTP请求、将变量分组到可以在发送请求时引用的环境，以及将请求分组到集合中的基本要素。然而，这只是Postman广泛功能的冰山一角。高级功能，如通过集合进行自动化测试和创建模拟服务器进行测试，可以显著增强我们的API开发过程，特别是在处理复杂场景时。</p><p>OK</p>',76),o=[s];function r(l,i){return a(),e("div",null,o)}const P=t(p,[["render",r],["__file","2024-06-24-Introduction to Postman.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-06-24/2024-06-24-Introduction%20to%20Postman.html","title":"Postman入门指南","lang":"zh-CN","frontmatter":{"date":"2024-06-24T00:00:00.000Z","category":["Java","Postman"],"tag":["REST","Spring Boot"],"head":[["meta",{"name":"keywords","content":"Postman, API开发, 教程"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-24/2024-06-24-Introduction%20to%20Postman.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Postman入门指南"}],["meta",{"property":"og:description","content":"Postman入门指南 Postman是一个流行的API开发工具，它简化了设计、测试、修改和记录API的过程。它提供了一个用户友好的界面，允许用户发送和接收HTTP请求，使用环境和集合管理工作流，执行自动化测试，创建模拟服务器进行测试，并生成API文档。 由于其多功能性，它受到从事API中心工作流的开发人员、测试人员和其他IT专业人员的高度评价。 在本..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-24T01:44:38.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"REST"}],["meta",{"property":"article:tag","content":"Spring Boot"}],["meta",{"property":"article:published_time","content":"2024-06-24T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-24T01:44:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Postman入门指南\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-24T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-24T01:44:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Postman入门指南 Postman是一个流行的API开发工具，它简化了设计、测试、修改和记录API的过程。它提供了一个用户友好的界面，允许用户发送和接收HTTP请求，使用环境和集合管理工作流，执行自动化测试，创建模拟服务器进行测试，并生成API文档。 由于其多功能性，它受到从事API中心工作流的开发人员、测试人员和其他IT专业人员的高度评价。 在本..."},"headers":[{"level":2,"title":"2. 安装和设置","slug":"_2-安装和设置","link":"#_2-安装和设置","children":[]},{"level":2,"title":"3. 发送HTTP请求","slug":"_3-发送http请求","link":"#_3-发送http请求","children":[]},{"level":2,"title":"4. 环境","slug":"_4-环境","link":"#_4-环境","children":[]},{"level":2,"title":"5. 集合","slug":"_5-集合","link":"#_5-集合","children":[{"level":3,"title":"5.1. 创建集合","slug":"_5-1-创建集合","link":"#_5-1-创建集合","children":[]},{"level":3,"title":"5.2. 集合运行器","slug":"_5-2-集合运行器","link":"#_5-2-集合运行器","children":[]}]},{"level":2,"title":"6. 总结","slug":"_6-总结","link":"#_6-总结","children":[]},{"level":2,"title":"2. 安装和设置","slug":"_2-安装和设置-1","link":"#_2-安装和设置-1","children":[]},{"level":2,"title":"3. 发送HTTP请求","slug":"_3-发送http请求-1","link":"#_3-发送http请求-1","children":[]},{"level":2,"title":"4. 环境","slug":"_4-环境-1","link":"#_4-环境-1","children":[]},{"level":2,"title":"5. 集合","slug":"_5-集合-1","link":"#_5-集合-1","children":[{"level":3,"title":"5.1. 创建集合","slug":"_5-1-创建集合-1","link":"#_5-1-创建集合-1","children":[]},{"level":3,"title":"5.2. 集合运行器","slug":"_5-2-集合运行器-1","link":"#_5-2-集合运行器-1","children":[]}]},{"level":2,"title":"6. 总结","slug":"_6-总结-1","link":"#_6-总结-1","children":[]}],"git":{"createdTime":1719193478000,"updatedTime":1719193478000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":10.5,"words":3151},"filePathRelative":"posts/baeldung/2024-06-24/2024-06-24-Introduction to Postman.md","localizedDate":"2024年6月24日","excerpt":"\\n<p>Postman是一个流行的API开发工具，它简化了设计、测试、修改和记录API的过程。它提供了一个用户友好的界面，允许用户发送和接收HTTP请求，使用环境和集合管理工作流，执行自动化测试，创建模拟服务器进行测试，并生成API文档。</p>\\n<p>由于其多功能性，它受到从事API中心工作流的开发人员、测试人员和其他IT专业人员的高度评价。</p>\\n<p>在本教程中，我们将讨论如何安装、设置和使用Postman的最重要功能。</p>\\n<h2>2. 安装和设置</h2>\\n<p>Postman可以作为Windows、Mac或Linux操作系统的桌面应用程序下载。它也可作为网络应用程序提供。然而，并非所有功能都可用。</p>","autoDesc":true}');export{P as comp,d as data};
