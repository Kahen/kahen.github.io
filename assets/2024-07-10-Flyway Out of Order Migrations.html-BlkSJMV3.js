import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as e,a as s}from"./app-DpYLEM_u.js";const t={},l=s(`<h1 id="flyway-无序迁移教程" tabindex="-1"><a class="header-anchor" href="#flyway-无序迁移教程"><span>Flyway 无序迁移教程</span></a></h1><p>在本教程中，我们将学习使用 Flyway 进行数据库迁移的基础知识，并看到一个特定的用例，即当我们需要按非顺序运行迁移时。</p><h2 id="_2-flyway-简介" tabindex="-1"><a class="header-anchor" href="#_2-flyway-简介"><span>2. Flyway 简介</span></a></h2><p><strong>Flyway 是一个通过迁移帮助进行数据库版本控制的工具。</strong> 我们可以创建改变数据库状态的脚本，这些脚本被称为迁移。</p><p>我们需要迁移的情况有几种。例如，我们可能需要从先前的数据源填充我们的数据库。或者我们有一个已经发布的应用程序，它已经使用了一个数据库，我们需要部署一个依赖于修改后的数据库模式的新版本。在这两种情况下，我们都可以使用迁移来实现所需的结果。</p><p><strong>使用 Flyway，我们甚至可以将这些脚本上传到版本控制系统，以便我们能够追踪何时以及为什么需要引入特定的修改。</strong></p><h2 id="_3-示例迁移" tabindex="-1"><a class="header-anchor" href="#_3-示例迁移"><span>3. 示例迁移</span></a></h2><p>以我们的示例，我们将使用一个简单的 Spring Boot 应用程序，并以 Flyway 作为起点。</p><h3 id="_3-1-maven-插件" tabindex="-1"><a class="header-anchor" href="#_3-1-maven-插件"><span>3.1. Maven 插件</span></a></h3><p>首先，让我们将 Flyway Maven 插件添加到我们的 <em>pom.xml</em>：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>build</span><span class="token punctuation">&gt;</span></span>\`
    ...
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>plugin</span><span class="token punctuation">&gt;</span></span>\`
        \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`org.flywaydb\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`
        \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`flyway-maven-plugin\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`
        \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\`10.7.1\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>plugin</span><span class="token punctuation">&gt;</span></span>\`
    ...
\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>build</span><span class="token punctuation">&gt;</span></span>\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们需要这个插件来运行不同的 Flyway 目标。然而，在我们使用它之前，我们需要配置这个插件。这可能包括设置数据库 URL、用户名和密码等。</p><h3 id="_3-2-迁移脚本" tabindex="-1"><a class="header-anchor" href="#_3-2-迁移脚本"><span>3.2. 迁移脚本</span></a></h3><p><strong>让我们在项目中 <em>db/out-of-order-migration</em> 目录下创建两个 SQL 迁移。</strong> 我们必须遵循这些文件的命名约定。让我们将我们的第一个脚本命名为 <em>V1_0__create_city_table.sql</em>：</p><div class="language-sql line-numbers-mode" data-ext="sql" data-title="sql"><pre class="language-sql"><code><span class="token keyword">create</span> <span class="token keyword">table</span> city <span class="token punctuation">(</span>
  id <span class="token keyword">numeric</span><span class="token punctuation">,</span>
  name <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token keyword">constraint</span> pk_city <span class="token keyword">primary</span> <span class="token keyword">key</span> <span class="token punctuation">(</span>id<span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，创建另一个名为 <em>V2_0__create_person_table.sql</em> 的脚本：</p><div class="language-sql line-numbers-mode" data-ext="sql" data-title="sql"><pre class="language-sql"><code><span class="token keyword">create</span> <span class="token keyword">table</span> person <span class="token punctuation">(</span>
  id <span class="token keyword">numeric</span><span class="token punctuation">,</span>
  name <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token keyword">constraint</span> pk_person <span class="token keyword">primary</span> <span class="token keyword">key</span> <span class="token punctuation">(</span>id<span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们执行这些迁移：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>mvn <span class="token parameter variable">-Dflyway.user</span><span class="token operator">=</span>sa <span class="token parameter variable">-Dflyway.url</span><span class="token operator">=</span>jdbc:h2:file:./database <span class="token parameter variable">-Dflyway.locations</span><span class="token operator">=</span>filesystem:db/out-of-order-migration flyway:migrate
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>在这个命令中，我们使用了 flyway 插件的 <em>migrate</em> 目标</strong> 并带有与数据库相关的三个参数。首先，我们设置了用户名，然后是数据库所在的 URL，最后是迁移脚本的位置。</p><p>作为这个命令的结果，Flyway 成功运行了我们的两个脚本。我们甚至可以检查状态：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>mvn <span class="token parameter variable">-Dflyway.user</span><span class="token operator">=</span>sa <span class="token parameter variable">-Dflyway.url</span><span class="token operator">=</span>jdbc:h2:file:./database <span class="token parameter variable">-Dflyway.locations</span><span class="token operator">=</span>filesystem:db/out-of-order-migration flyway:info
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这将打印以下消息：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Schema version: 2.0
+-----------+---------+---------------------+------+---------------------+---------+
| Category  | Version | Description         | Type | Installed On        | State   |
+-----------+---------+---------------------+------+---------------------+---------+
| Versioned | 1.0     | create city table   | SQL  | 2023-01-02 21:08:45 | Success |
| Versioned | 2.0     | create person table | SQL  | 2023-01-02 21:08:45 | Success |
+-----------+---------+---------------------+------+---------------------+---------+
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当我们添加新的迁移时，Flyway 可以检测到变化并执行最新的迁移。<strong>然而，当最新脚本的版本号不是最高的时候，这就成了问题。</strong> 换句话说，它是无序的。</p><p>默认情况下，Flyway 会忽略我们最新的迁移。幸运的是，我们可以解决这个问题。<strong>我们可以使用 <em>outOfOrder</em> 配置参数来告诉 Flyway 运行这些脚本而不是跳过它们。</strong></p><p>让我们通过在我们的项目中添加一个名为 <em>V1_1__add_zipcode_to_city.sql</em> 的新迁移来尝试：</p><div class="language-sql line-numbers-mode" data-ext="sql" data-title="sql"><pre class="language-sql"><code><span class="token keyword">alter</span> <span class="token keyword">table</span> city <span class="token keyword">add</span> <span class="token keyword">column</span> <span class="token punctuation">(</span>
  zip <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个脚本的版本是 1.1，但根据 Flyway，我们已经迁移到了 2.0 版本。这意味着脚本将被忽略。我们甚至可以使用 <em>info</em> 命令来检查它：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>mvn <span class="token parameter variable">-Dflyway.user</span><span class="token operator">=</span>sa <span class="token parameter variable">-Dflyway.url</span><span class="token operator">=</span>jdbc:h2:file:./database <span class="token parameter variable">-Dflyway.locations</span><span class="token operator">=</span>filesystem:db/out-of-order-migration flyway:info
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Flyway 识别了脚本，但状态是被忽略的：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>+-----------+---------+---------------------+------+---------------------+---------+
| Category  | Version | Description         | Type | Installed On        | State   |
+-----------+---------+---------------------+------+---------------------+---------+
| Versioned | 1.0     | create city table   | SQL  | 2023-01-02 21:08:45 | Success |
| Versioned | 2.0     | create person table | SQL  | 2023-01-02 21:08:45 | Success |
| Versioned | 1.1     | add zipcode to city | SQL  |                     | Ignored |
+-----------+---------+---------------------+------+---------------------+---------+
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>现在，如果我们再次获取状态但添加了 <em>outOfOrder</em> 标志，结果会有所不同：</strong></p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>mvn <span class="token parameter variable">-Dflyway.user</span><span class="token operator">=</span>sa <span class="token parameter variable">-Dflyway.url</span><span class="token operator">=</span>jdbc:h2:file:./database <span class="token parameter variable">-Dflyway.locations</span><span class="token operator">=</span>filesystem:db/out-of-order-migration <span class="token parameter variable">-Dflyway.outOfOrder</span><span class="token operator">=</span>true flyway:info
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>最新迁移的状态变为待定：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>+-----------+---------+---------------------+------+---------------------+---------+
| Category  | Version | Description         | Type | Installed On        | State   |
+-----------+---------+---------------------+------+---------------------+---------+
| Versioned | 1.0     | create city table   | SQL  | 2023-01-02 21:08:45 | Success |
| Versioned | 2.0     | create person table | SQL  | 2023-01-02 21:08:45 | Success |
| Versioned | 1.1     | add zipcode to city | SQL  |                     | Pending |
+-----------+---------+---------------------+------+---------------------+---------+
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这意味着我们可以运行迁移命令并应用更改。<strong>尽管，我们也必须在这里添加 <em>outOfOrder</em> 标志：</strong></p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>mvn <span class="token parameter variable">-Dflyway.user</span><span class="token operator">=</span>sa <span class="token parameter variable">-Dflyway.url</span><span class="token operator">=</span>jdbc:h2:file:./database <span class="token parameter variable">-Dflyway.locations</span><span class="token operator">=</span>filesystem:db/out-of-order-migration <span class="token parameter variable">-Dflyway.outOfOrder</span><span class="token operator">=</span>true flyway:migrate
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们成功执行了新更改：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>[INFO] Successfully validated 3 migrations (execution time 00:00.015s)
[INFO] Current version of schema &quot;PUBLIC&quot;: 2.0
[WARNING] outOfOrder mode is active. Migration of schema &quot;PUBLIC&quot; may not be reproducible.
[INFO] Migrating schema &quot;PUBLIC&quot; to version &quot;1.1 - add zipcode to city&quot; [out of order]
[INFO] Successfully applied 1 migration to schema &quot;PUBLIC&quot;, now at version v1.1 (execution time 00:00.019s)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>这些迁移在被 Flyway 应用后有不同的状态。</strong> 我们的前两个迁移处于“成功”状态，但第三个即使成功也是“无序”的：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>+-----------+---------+---------------------+------+---------------------+--------------+
| Category  | Version | Description         | Type | Installed On        | State        |
+-----------+---------+---------------------+------+---------------------+--------------+
| Versioned | 1.0     | create city table   | SQL  | 2023-01-02 21:08:45 | Success      |
| Versioned | 2.0     | create person table | SQL  | 2023-01-02 21:08:45 | Success      |
| Versioned | 1.1     | add zipcode to city | SQL  | 2023-01-02 21:17:38 | Out of Order |
+-----------+---------+---------------------+------+---------------------+--------------+
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本教程中，我们简要介绍了 Flyway 迁移，并专注于一个特定的用例。<strong>我们找到了一种方法来运行那些根据它们的版本号被认为无序的迁移。</strong> 然后，我们将这个解决方案应用到了我们的项目中。</p><p>如常，这些示例的源代码可以在 GitHub 上找到。</p>`,45),i=[l];function r(o,p){return e(),n("div",null,i)}const u=a(t,[["render",r],["__file","2024-07-10-Flyway Out of Order Migrations.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-07-10/2024-07-10-Flyway%20Out%20of%20Order%20Migrations.html","title":"Flyway 无序迁移教程","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Database","Spring Boot"],"tag":["Flyway","Migrations"],"head":[["meta",{"name":"keywords","content":"Flyway, Database Migrations, Spring Boot, Out of Order Migrations"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-10/2024-07-10-Flyway%20Out%20of%20Order%20Migrations.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Flyway 无序迁移教程"}],["meta",{"property":"og:description","content":"Flyway 无序迁移教程 在本教程中，我们将学习使用 Flyway 进行数据库迁移的基础知识，并看到一个特定的用例，即当我们需要按非顺序运行迁移时。 2. Flyway 简介 Flyway 是一个通过迁移帮助进行数据库版本控制的工具。 我们可以创建改变数据库状态的脚本，这些脚本被称为迁移。 我们需要迁移的情况有几种。例如，我们可能需要从先前的数据源填..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-10T19:39:19.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Flyway"}],["meta",{"property":"article:tag","content":"Migrations"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-10T19:39:19.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Flyway 无序迁移教程\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-10T19:39:19.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Flyway 无序迁移教程 在本教程中，我们将学习使用 Flyway 进行数据库迁移的基础知识，并看到一个特定的用例，即当我们需要按非顺序运行迁移时。 2. Flyway 简介 Flyway 是一个通过迁移帮助进行数据库版本控制的工具。 我们可以创建改变数据库状态的脚本，这些脚本被称为迁移。 我们需要迁移的情况有几种。例如，我们可能需要从先前的数据源填..."},"headers":[{"level":2,"title":"2. Flyway 简介","slug":"_2-flyway-简介","link":"#_2-flyway-简介","children":[]},{"level":2,"title":"3. 示例迁移","slug":"_3-示例迁移","link":"#_3-示例迁移","children":[{"level":3,"title":"3.1. Maven 插件","slug":"_3-1-maven-插件","link":"#_3-1-maven-插件","children":[]},{"level":3,"title":"3.2. 迁移脚本","slug":"_3-2-迁移脚本","link":"#_3-2-迁移脚本","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720640359000,"updatedTime":1720640359000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.65,"words":1394},"filePathRelative":"posts/baeldung/2024-07-10/2024-07-10-Flyway Out of Order Migrations.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在本教程中，我们将学习使用 Flyway 进行数据库迁移的基础知识，并看到一个特定的用例，即当我们需要按非顺序运行迁移时。</p>\\n<h2>2. Flyway 简介</h2>\\n<p><strong>Flyway 是一个通过迁移帮助进行数据库版本控制的工具。</strong> 我们可以创建改变数据库状态的脚本，这些脚本被称为迁移。</p>\\n<p>我们需要迁移的情况有几种。例如，我们可能需要从先前的数据源填充我们的数据库。或者我们有一个已经发布的应用程序，它已经使用了一个数据库，我们需要部署一个依赖于修改后的数据库模式的新版本。在这两种情况下，我们都可以使用迁移来实现所需的结果。</p>\\n","autoDesc":true}');export{u as comp,m as data};
