import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as e,o as i,a as t}from"./app-8nJ1rqSf.js";const s={},l=t('<h1 id="liquibase与flyway的比较" tabindex="-1"><a class="header-anchor" href="#liquibase与flyway的比较"><span>Liquibase与Flyway的比较</span></a></h1><p>在持续集成和数据库开发的自动化重构时代，我们需要采用渐进式数据库设计的技术。像Liquibase和Flyway这样的工具遵循这些技术，并提供迭代的开发方法。在本文中，我们将研究Liquibase和Flyway之间的差异和相似之处。</p><p>请注意，没有一种工具适合所有用例。每种工具在各自领域都有其优势。</p><h3 id="liquibase和flyway的相似之处" tabindex="-1"><a class="header-anchor" href="#liquibase和flyway的相似之处"><span>Liquibase和Flyway的相似之处</span></a></h3><p>由于<strong>Liquibase和Flyway实现了渐进式数据库的设计原则</strong>，它们提供了许多相似的功能。这两个工具：</p><ul><li>在一定程度上都是开源的，帮助管理、跟踪和部署数据库模式变更。</li><li>使用版本化的迁移方法来改变数据库模式。</li><li>基于Java，并为Java框架如Spring Boot和Vert.x提供广泛支持。</li><li>支持与构建工具如Maven和Gradle集成。</li><li>可以通过提供的脚本独立于命令行运行。</li><li>支持多种数据库。</li></ul><p>现在我们将讨论这些工具提供的不同之处。</p><h3 id="liquibase和flyway的差异" tabindex="-1"><a class="header-anchor" href="#liquibase和flyway的差异"><span>Liquibase和Flyway的差异</span></a></h3><h4 id="_3-1-定义变更" tabindex="-1"><a class="header-anchor" href="#_3-1-定义变更"><span>3.1. 定义变更</span></a></h4><p>Flyway使用SQL来定义变更。另一方面，Liquibase提供了灵活性，可以以不同格式指定变更，包括SQL，如XML、YAML和JSON。使用Liquibase，我们可以使用数据库无关的语言，轻松地将模式变更应用到不同类型的数据库。</p><p><strong>Flyway围绕线性数据库版本控制系统构建</strong>，每次版本化变更都会递增。这有时可能会与并行开发产生冲突。Flyway脚本的文件名定义了迁移的类型。例如，迁移应该遵循前缀的约定，如_V_（表示版本化）、U（表示撤销）和R（表示可重复的）。后面跟着版本号和分隔符__（两个下划线），然后是描述和后缀.sql，如_V01__Add_New_Column.sql_。</p><p>Liquibase的迁移不需要遵循任何文件名约定。<strong>在Liquibase中，变更由一个称为主变更日志的账本管理</strong>，它将定义包括所有迁移。</p><h4 id="_3-2-存储变更" tabindex="-1"><a class="header-anchor" href="#_3-2-存储变更"><span>3.2. 存储变更</span></a></h4><p><strong>两种工具都将部署的变更存储在表中。</strong> Flyway迁移存储在数据库模式中的默认表名为_flyway_schema_history_。同样，Liquibase将其部署的迁移存储在名为_databasechangelog_的表中。两种工具都支持覆盖默认配置以更改表名。</p><h4 id="_3-3-变更的执行顺序" tabindex="-1"><a class="header-anchor" href="#_3-3-变更的执行顺序"><span>3.3. 变更的执行顺序</span></a></h4><p>在Flyway中管理变更的顺序相对困难。使用Flyway时，顺序取决于文件名中的版本号和迁移类型。相反，Liquibase使用一个名为_master_changelog_的单独文件，其中定义的变更将按照它们定义的顺序部署。</p><h4 id="_3-4-回滚变更" tabindex="-1"><a class="header-anchor" href="#_3-4-回滚变更"><span>3.4. 回滚变更</span></a></h4><p>现在，让我们讨论数据库迁移的一个主要方面。<strong>当一个不良变更导致应用程序出现灾难性问题时，需要回滚。</strong> Liquibase提供了回滚所有内容或撤消特定迁移的方法（仅在付费版本中可用）。</p><p>Flyway也有撤销迁移的功能，可以通过文件名以_U_开头并跟随需要撤销的版本来部署。其付费版本还提供了更复杂的撤销功能。</p><p>两种工具都提供了不错的回滚功能，但考虑到仅免费版本，Flyway提供了一个好用的解决方案。</p><h4 id="_3-5-选择性部署变更" tabindex="-1"><a class="header-anchor" href="#_3-5-选择性部署变更"><span>3.5. 选择性部署变更</span></a></h4><p>有些情况下，我们需要只将变更部署到一个环境中。当我们需要选择性地部署变更时，Liquibase在这里胜出。Flyway也能够做到这一点，但你必须为每个环境或数据库设置不同的配置文件。使用Liquibase，我们可以轻松添加标签和上下文以确保在特定位置部署。</p><h4 id="_3-6-基于java的迁移" tabindex="-1"><a class="header-anchor" href="#_3-6-基于java的迁移"><span>3.6. 基于Java的迁移</span></a></h4><p>两种工具都强烈倾向于Java，并提供<strong>基于Java的迁移</strong>。Flyway和Liquibase允许在Java文件中定义迁移。这在某些场景中可能是有利的。</p><h4 id="_3-7-快照与比较数据库" tabindex="-1"><a class="header-anchor" href="#_3-7-快照与比较数据库"><span>3.7. 快照与比较数据库</span></a></h4><p><strong>Liquibase允许用户拍摄当前数据库状态的快照</strong>。我们可以使用这个状态与另一个数据库进行比较。这在故障转移和数据库复制等场景中非常有用。另一方面，Flyway不支持任何快照功能。</p><h4 id="_3-8-条件部署" tabindex="-1"><a class="header-anchor" href="#_3-8-条件部署"><span>3.8. 条件部署</span></a></h4><p><strong>Liquibase提供了一个名为先决条件的附加功能</strong>。先决条件允许用户根据数据库的当前状态应用变更。只有在通过这些先决条件后，变更集才会执行。</p><p><strong>另一方面，Flyway不支持这一点</strong>。但通过过程，我们可以在大多数基于SQL的数据库中应用条件。</p><h3 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h3><p>在本文中，我们比较了两种最常用的数据库迁移工具Liquibase和Flyway。在选择工具时，总是需要权衡。当比较这两种工具时，它们之间没有明显的弱点或优势。你可以根据你的应用需求选择Liquibase或Flyway，并检查大部分选项。</p>',31),n=[l];function r(y,o){return i(),e("div",null,n)}const u=a(s,[["render",r],["__file","2024-07-19-Liquibase vs Flyway.html.vue"]]),c=JSON.parse('{"path":"/posts/baeldung/2024-07-19/2024-07-19-Liquibase%20vs%20Flyway.html","title":"Liquibase与Flyway的比较","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Database","Development Tools"],"tag":["Liquibase","Flyway"],"head":[["meta",{"name":"keywords","content":"database migration, Liquibase, Flyway, Java, Spring Boot, Vert.x, Maven, Gradle"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-19/2024-07-19-Liquibase%20vs%20Flyway.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Liquibase与Flyway的比较"}],["meta",{"property":"og:description","content":"Liquibase与Flyway的比较 在持续集成和数据库开发的自动化重构时代，我们需要采用渐进式数据库设计的技术。像Liquibase和Flyway这样的工具遵循这些技术，并提供迭代的开发方法。在本文中，我们将研究Liquibase和Flyway之间的差异和相似之处。 请注意，没有一种工具适合所有用例。每种工具在各自领域都有其优势。 Liquibas..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-19T22:37:36.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Liquibase"}],["meta",{"property":"article:tag","content":"Flyway"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-19T22:37:36.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Liquibase与Flyway的比较\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-19T22:37:36.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Liquibase与Flyway的比较 在持续集成和数据库开发的自动化重构时代，我们需要采用渐进式数据库设计的技术。像Liquibase和Flyway这样的工具遵循这些技术，并提供迭代的开发方法。在本文中，我们将研究Liquibase和Flyway之间的差异和相似之处。 请注意，没有一种工具适合所有用例。每种工具在各自领域都有其优势。 Liquibas..."},"headers":[{"level":3,"title":"Liquibase和Flyway的相似之处","slug":"liquibase和flyway的相似之处","link":"#liquibase和flyway的相似之处","children":[]},{"level":3,"title":"Liquibase和Flyway的差异","slug":"liquibase和flyway的差异","link":"#liquibase和flyway的差异","children":[]},{"level":3,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1721428656000,"updatedTime":1721428656000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.35,"words":1306},"filePathRelative":"posts/baeldung/2024-07-19/2024-07-19-Liquibase vs Flyway.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在持续集成和数据库开发的自动化重构时代，我们需要采用渐进式数据库设计的技术。像Liquibase和Flyway这样的工具遵循这些技术，并提供迭代的开发方法。在本文中，我们将研究Liquibase和Flyway之间的差异和相似之处。</p>\\n<p>请注意，没有一种工具适合所有用例。每种工具在各自领域都有其优势。</p>\\n<h3>Liquibase和Flyway的相似之处</h3>\\n<p>由于<strong>Liquibase和Flyway实现了渐进式数据库的设计原则</strong>，它们提供了许多相似的功能。这两个工具：</p>\\n<ul>\\n<li>在一定程度上都是开源的，帮助管理、跟踪和部署数据库模式变更。</li>\\n<li>使用版本化的迁移方法来改变数据库模式。</li>\\n<li>基于Java，并为Java框架如Spring Boot和Vert.x提供广泛支持。</li>\\n<li>支持与构建工具如Maven和Gradle集成。</li>\\n<li>可以通过提供的脚本独立于命令行运行。</li>\\n<li>支持多种数据库。</li>\\n</ul>","autoDesc":true}');export{u as comp,c as data};
