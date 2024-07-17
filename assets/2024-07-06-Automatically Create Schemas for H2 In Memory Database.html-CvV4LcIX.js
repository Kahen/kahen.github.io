import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as t,a as n}from"./app-yRPSFQJx.js";const i={},s=n(`<h1 id="h2内存数据库自动创建模式" tabindex="-1"><a class="header-anchor" href="#h2内存数据库自动创建模式"><span>H2内存数据库自动创建模式</span></a></h1><p>H2数据库引擎是一个流行的基于Java的开源数据库。在本简短教程中，我们将学习如何为H2内存数据库自动创建一个模式。</p><h2 id="_2-h2是什么" tabindex="-1"><a class="header-anchor" href="#_2-h2是什么"><span>2. H2是什么？</span></a></h2><p><strong>H2数据库引擎是一个基于Java的数据库，它既符合SQL也符合JDBC标准</strong>。它具有一些使它与其他关系型数据库区别开来的特性：</p><ul><li>持久性：它可以作为一个纯粹的内存数据库运行，或使用文件系统。</li><li>模式：作为一个独立的服务器运行，或嵌入到另一个应用程序中。</li></ul><p>这两个特性使H2成为开发和测试目的的绝佳选择。然而，由于它的短暂性质，它也可能带来一些挑战。</p><p><strong>当连接到H2内存数据库时，模式可能不存在</strong>。这是因为内存数据库的短暂性质，它们仅在运行它们的应用程序运行时存在。一旦应用程序终止，内存数据库的全部内容就会丢失。</p><p>接下来，我们将看到几种在连接到H2内存数据库时初始化H2内存数据库的不同方法。</p><h2 id="_3-在h2中自动创建模式" tabindex="-1"><a class="header-anchor" href="#_3-在h2中自动创建模式"><span>3. 在H2中自动创建模式</span></a></h2><p>有几种方法可以为H2内存数据库自动创建模式。正如大多数事情一样，每种方法都有其优缺点，选择使用哪一种取决于多种因素。</p><h3 id="_3-1-纯java" tabindex="-1"><a class="header-anchor" href="#_3-1-纯java"><span>3.1. 纯Java</span></a></h3><p>以下示例展示了如何使用纯Java代码和JDBC初始化一个内存H2数据库。这是对于那些不使用Spring或其他提供数据库连接的框架的应用程序的好选择：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Connection conn = DriverManager.getConnection(
  &quot;jdbc:h2:mem:baeldung;INIT=CREATE SCHEMA IF NOT EXISTS baeldung&quot;,
  &quot;admin&quot;,
  &quot;password&quot;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>在上面的示例中，我们使用连接URL来指定要创建的模式</strong>。我们还可以传递其他命令来进一步初始化数据库：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Connection conn = DriverManager.getConnection(
  &quot;jdbc:h2:mem:baeldung;INIT=CREATE SCHEMA IF NOT EXISTS baeldung\\\\;SET SCHEMA baeldung;CREATE TABLE users (name VARCHAR(100) NOT NULL, email VARCHAR(100) NOT NULL);&quot;,
  &quot;admin&quot;,
  &quot;password&quot;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因为所有这些命令可能会使URL难以阅读，<strong>H2还支持通过引用SQL文件来初始化内存数据库</strong>。首先，我们创建包含初始化语句的文件：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>CREATE SCHEMA IF NOT EXISTS baeldung;
SET SCHEMA baeldung;
CREATE TABLE users (name VARCHAR(100) NOT NULL, email VARCHAR(100) NOT NULL);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后我们使用稍微修改过的连接URL来引用文件：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Connection conn = DriverManager.getConnection(
  &quot;jdbc:h2:mem:baeldung;INIT=RUNSCRIPT FROM &#39;h2init.sql&#39;;&quot;,
  &quot;admin&quot;,
  &quot;password&quot;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-spring-boot" tabindex="-1"><a class="header-anchor" href="#_3-2-spring-boot"><span>3.2. Spring Boot</span></a></h3><p>当使用Spring Boot应用程序时，<strong>我们也可以利用熟悉的Spring数据属性来初始化H2内存数据库</strong>。</p><p>首先，我们可以像上面一样在URL本身中提供所有的初始化语句。我们首先定义H2数据源的Spring属性：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>spring.datasource.url=jdbc:h2:mem:baeldung;INIT=CREATE SCHEMA IF NOT EXISTS baeldung\\\\;SET SCHEMA baeldung;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后我们可以像在任何正常应用程序中一样使用默认的_Datasource_ bean：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public void initDatabaseUsingSpring(@Autowired DataSource ds) {
    try (Connection conn = ds.getConnection()) {
        conn.createStatement().execute(&quot;create table users (name VARCHAR(100) NOT NULL, email VARCHAR(100) NOT NULL);&quot;);
        conn.createStatement().execute(&quot;insert into users (name, email) values (&#39;Mike&#39;, &#39;mike@baeldung.com&#39;)&quot;);
    }
    catch (Exception e) {
        e.printStackTrace();
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>就像使用纯Java代码一样，我们也可以在连接URL中引用一个包含所有初始化语句的SQL文件。我们所要做的就是更新我们的属性：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>spring.datasource.url=jdbc:h2:mem:baeldung;INIT=RUNSCRIPT FROM &#39;src/main/resources/h2init.sql&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>值得注意的是，H2不通过Spring Boot加载资源</strong>。因此，我们必须在应用程序运行的完整上下文中引用文件路径。</p><p>现在我们可以像以前一样使用_Datasource_，但不需要首先初始化模式：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>private void initDatabaseUsingSpring(@Autowired DataSource ds) {
    try (Connection conn = ds.getConnection()) {
        conn.createStatement().execute(&quot;insert into users (name, email) values (&#39;Mike&#39;, &#39;mike@baeldung.com&#39;)&quot;);
    }
    catch (Exception e) {
        e.printStackTrace();
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，当使用Spring Boot时，我们还可以利用SQL init模式而不依赖于H2特性。我们只需将初始化文件重命名为_data.sql_并稍微更改我们的属性：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>spring.datasource.url=jdbc:h2:mem:baeldung
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=admin
spring.datasource.password=password
spring.sql.init.mode=embedded
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们应该注意到，我们的属性没有提到模式或初始化文件。</p><h3 id="_3-3-spring-xml" tabindex="-1"><a class="header-anchor" href="#_3-3-spring-xml"><span>3.3. Spring XML</span></a></h3><p>此外，如果我们使用纯Spring XML来配置_Datasource_，我们也可以在那里包含初始化语句。</p><p>让我们看看如何创建模式：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>\`\`&lt;bean id=&quot;dataSource&quot; class=&quot;org.apache.commons.dbcp.BasicDataSource&quot;&gt;\`\`
    \`\`&lt;property name=&quot;driverClassName&quot; value=&quot;org.h2.Driver&quot;/&gt;\`\`
    \`&lt;property name=&quot;url&quot; value=&quot;jdbc:h2:mem:testdb;INIT=CREATE SCHEMA IF NOT EXISTS baeldung\\\\;SET SCHEMA baeldung;&quot;/&gt;\`
    \`\`&lt;property name=&quot;username&quot; value=&quot;admin&quot;/&gt;\`\`
    \`\`&lt;property name=&quot;password&quot; value=&quot;password&quot;/&gt;\`\`
\`\`&lt;/bean&gt;\`\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们之前看到的，URL中的多个初始化语句可能会使属性难以阅读。因此，将它们放入一个单一的SQL文件中并在URL中引用该文件是一个好主意：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>\`\`&lt;bean id=&quot;dataSource&quot; class=&quot;org.apache.commons.dbcp.BasicDataSource&quot;&gt;\`\`
    \`\`&lt;property name=&quot;driverClassName&quot; value=&quot;org.h2.Driver&quot;/&gt;\`\`
    \`&lt;property name=&quot;url&quot; value=&quot;jdbc:h2:mem:testdb;INIT=RUNSCRIPT FROM &#39;src/main/resources/h2init.sql&#39;;&quot;/&gt;\`
    \`\`&lt;property name=&quot;username&quot; value=&quot;admin&quot;/&gt;\`\`
    \`\`&lt;property name=&quot;password&quot; value=&quot;password&quot;/&gt;\`\`
\`\`&lt;/bean&gt;\`\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>H2内存数据库是Java开发者更受欢迎的内存和嵌入式数据库选项之一。因为它快速且占用空间小，非常适合用于软件测试和自动化流水线等用例。</p><p>在本文中，我们看到了几种种方法来确保我们的H2内存数据库在应用程序启动时自动初始化并准备好进行查询。无论我们使用纯JDBC还是Spring框架，<strong>只需要几行配置就可以确保我们的内存数据库在启动时完全初始化并准备好使用</strong>。</p><p>如常，上述代码示例可以在GitHub上找到。</p>`,43),r=[s];function l(d,o){return t(),a("div",null,r)}const m=e(i,[["render",l],["__file","2024-07-06-Automatically Create Schemas for H2 In Memory Database.html.vue"]]),p=JSON.parse('{"path":"/posts/baeldung/2024-07-06/2024-07-06-Automatically%20Create%20Schemas%20for%20H2%20In%20Memory%20Database.html","title":"H2内存数据库自动创建模式","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","H2 Database"],"tag":["H2","In-Memory Database","Schema Creation"],"head":[["meta",{"name":"keywords","content":"Java, H2, In-Memory Database, Schema Creation"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-06/2024-07-06-Automatically%20Create%20Schemas%20for%20H2%20In%20Memory%20Database.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"H2内存数据库自动创建模式"}],["meta",{"property":"og:description","content":"H2内存数据库自动创建模式 H2数据库引擎是一个流行的基于Java的开源数据库。在本简短教程中，我们将学习如何为H2内存数据库自动创建一个模式。 2. H2是什么？ H2数据库引擎是一个基于Java的数据库，它既符合SQL也符合JDBC标准。它具有一些使它与其他关系型数据库区别开来的特性： 持久性：它可以作为一个纯粹的内存数据库运行，或使用文件系统。 ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-06T20:34:17.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"H2"}],["meta",{"property":"article:tag","content":"In-Memory Database"}],["meta",{"property":"article:tag","content":"Schema Creation"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-06T20:34:17.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"H2内存数据库自动创建模式\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-06T20:34:17.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"H2内存数据库自动创建模式 H2数据库引擎是一个流行的基于Java的开源数据库。在本简短教程中，我们将学习如何为H2内存数据库自动创建一个模式。 2. H2是什么？ H2数据库引擎是一个基于Java的数据库，它既符合SQL也符合JDBC标准。它具有一些使它与其他关系型数据库区别开来的特性： 持久性：它可以作为一个纯粹的内存数据库运行，或使用文件系统。 ..."},"headers":[{"level":2,"title":"2. H2是什么？","slug":"_2-h2是什么","link":"#_2-h2是什么","children":[]},{"level":2,"title":"3. 在H2中自动创建模式","slug":"_3-在h2中自动创建模式","link":"#_3-在h2中自动创建模式","children":[{"level":3,"title":"3.1. 纯Java","slug":"_3-1-纯java","link":"#_3-1-纯java","children":[]},{"level":3,"title":"3.2. Spring Boot","slug":"_3-2-spring-boot","link":"#_3-2-spring-boot","children":[]},{"level":3,"title":"3.3. Spring XML","slug":"_3-3-spring-xml","link":"#_3-3-spring-xml","children":[]}]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1720298057000,"updatedTime":1720298057000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.76,"words":1427},"filePathRelative":"posts/baeldung/2024-07-06/2024-07-06-Automatically Create Schemas for H2 In Memory Database.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>H2数据库引擎是一个流行的基于Java的开源数据库。在本简短教程中，我们将学习如何为H2内存数据库自动创建一个模式。</p>\\n<h2>2. H2是什么？</h2>\\n<p><strong>H2数据库引擎是一个基于Java的数据库，它既符合SQL也符合JDBC标准</strong>。它具有一些使它与其他关系型数据库区别开来的特性：</p>\\n<ul>\\n<li>持久性：它可以作为一个纯粹的内存数据库运行，或使用文件系统。</li>\\n<li>模式：作为一个独立的服务器运行，或嵌入到另一个应用程序中。</li>\\n</ul>\\n<p>这两个特性使H2成为开发和测试目的的绝佳选择。然而，由于它的短暂性质，它也可能带来一些挑战。</p>","autoDesc":true}');export{m as comp,p as data};
