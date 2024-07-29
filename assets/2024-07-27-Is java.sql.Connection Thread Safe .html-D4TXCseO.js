import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as n,a as t}from"./app-BUAgDejY.js";const o={},l=t('<hr><h1 id="java-sql-connection-是否线程安全-baeldung" tabindex="-1"><a class="header-anchor" href="#java-sql-connection-是否线程安全-baeldung"><span>java.sql.Connection 是否线程安全？ | Baeldung---</span></a></h1><p>date: 2022-04-01 category:</p><ul><li>Java</li><li>JDBC tag:</li><li>Connection</li><li>Thread-Safety head:</li><li><ul><li>meta</li><li>name: keywords content: Java, JDBC, Connection, Thread-Safety</li></ul></li></ul><hr><h1 id="java-sql-connection-是否线程安全-baeldung-1" tabindex="-1"><a class="header-anchor" href="#java-sql-connection-是否线程安全-baeldung-1"><span>java.sql.Connection 是否线程安全？ | Baeldung</span></a></h1><ol><li>概述</li></ol><p>当我们在多线程项目中工作时，我们知道如果多个线程共享没有实现线程安全的类，线程的行为可能会出乎意料。</p><p>许多人可能都遭受过线程安全问题的困扰。因此，问题“这个类是否线程安全？”经常浮现在脑海中。</p><p>在Java应用程序中通过JDBC访问关系数据库并使用多线程是很常见的。在这个快速教程中，我们将讨论_java.sql.Connection_是否线程安全。</p><ol start="2"><li><em>java.sql.Connection</em> 接口</li></ol><p>当我们通过JDBC从应用程序中访问数据库时，我们会直接或间接地使用_java.sql.Connection_对象。我们依赖这些连接对象来执行数据库操作。因此，_java.sql.Connection_在JDBC中是一个相当重要的类型。</p><p>同时，多个线程需要同时与数据库通信也是一个常见的场景。因此，我们经常听到问题：“_java.sql.Connection_是否线程安全？”</p><p>在接下来的几节中，我们将更仔细地研究这个问题。此外，我们将讨论在多个线程中使用_java.sql.Connection_对象的正确方法，以便多个线程可以同时访问数据库。</p><ol start="3"><li>线程安全与 <em>java.sql.Connection</em></li></ol><p>首先，让我们快速谈谈线程安全。**线程安全是一种编程方法。也就是说，它是一个与实现相关的概念。**因此，我们可以使用不同的技术来使实现线程安全——例如，无状态实现、不可变实现等。</p><p>现在，让我们看看_java.sql.Connection_。首先，它是一个接口——它不包含任何实现。因此，<strong>如果我们一般性地问：“_java.sql.Connection_是否线程安全？”这并没有太多意义</strong>。我们必须检查实现这个接口的类来决定一个实现是否线程安全。</p><p>好吧，立即有几个问题浮现在脑海中：哪些类实现了这个接口？它们是否线程安全？</p><p>通常，我们不会在我们的应用程序代码中实现_java.sql.Connection_接口。<strong>JDBC驱动程序会实现这个接口</strong>，以便我们可以获得连接到特定数据库的连接，比如SQL Server或Oracle。</p><p>因此，_Connection_实现的线程安全性完全取决于JDBC驱动程序。</p><p>接下来，我们将以几个数据库的JDBC驱动程序为例进行探讨。</p><ol start="4"><li><em>java.sql.Connection</em> 实现示例</li></ol><p>Microsoft SQL Server和Oracle Database是两个广泛使用的关系数据库产品。</p><p>在这一部分，我们将查看这两个数据库的JDBC驱动程序，并讨论它们对_java.sql.Connection_接口的实现是否线程安全。</p><h3 id="_4-1-microsoft-sqlserver" tabindex="-1"><a class="header-anchor" href="#_4-1-microsoft-sqlserver"><span>4.1. Microsoft SQLServer</span></a></h3><p>Microsoft SQL Server驱动程序类_SQLServerConnection_实现了_java.sql.Connection_接口，并且根据其Javadoc，它不是线程安全的：</p><blockquote><p>_SQLServerConnection_不是线程安全的，然而从单个连接创建的多个语句可以在并发线程中同时处理。</p></blockquote><p>这意味着<strong>我们不应该在线程之间共享一个_SQLServerConnection_对象，但我们可以从同一个_SQLServerConnection_对象共享创建的语句</strong>。</p><p>接下来，让我们看看另一个知名的数据库产品，Oracle Database。</p><h3 id="_4-2-oracle-database" tabindex="-1"><a class="header-anchor" href="#_4-2-oracle-database"><span>4.2. Oracle Database</span></a></h3><p>Oracle官方JDBC驱动程序以线程安全的方式实现了_java.sql.Connection_接口。</p><p>Oracle在其官方文档中说明了其_Connection_实现的线程安全性：</p><blockquote><p>Oracle JDBC驱动程序为使用Java多线程的应用程序提供全面支持，并对其进行了高度优化……</p></blockquote><blockquote><p>然而，Oracle强烈不鼓励在多个线程之间共享数据库连接。避免允许多个线程同时访问一个连接……</p></blockquote><p>好吧，根据上述描述，我们可以说Oracle的连接实现是线程安全的。然而，<strong>在多个线程之间共享连接对象是“强烈不鼓励”的</strong>。</p><p>因此，从SQL Server和Oracle的例子中，我们知道我们不能假设_java.sql.Connection_实现是线程安全的。然后，我们可能会问，如果我们希望多个线程同时访问数据库，正确的方法是什么？让我们在下一节中找出答案。</p><ol start="5"><li>使用连接池</li></ol><p>当我们从应用程序访问数据库时，我们首先需要建立与数据库的连接。这被认为是一个昂贵的操作。为了提高性能，我们通常会使用连接池。</p><p>让我们快速了解在多线程场景中连接池是如何工作的。</p><p>连接池包含多个连接对象。我们可以配置池的大小。</p><p>当多个线程需要同时访问数据库时，它们会从连接池请求连接对象。</p><p>如果池中仍有空闲连接，一个线程将获得一个连接对象并开始其数据库操作。线程完成工作后，它将连接返回到池中。</p><p>如果没有空闲连接在池中，线程将等待另一个线程将连接对象返回到池中。</p><p>因此，<strong>连接池允许多个线程使用不同的连接对象而不是共享同一个连接来同时访问数据库</strong>。</p><p>此外，通过这种方式，我们不需要关心_Connection_接口的实现是否线程安全。</p><ol start="6"><li>结论</li></ol><p>在本文中，我们讨论了经常被问到的问题：_java.sql.Connection_是否线程安全？</p><p>由于_java.sql.Connection_是一个接口，很难预测实现是否线程安全。</p><p>此外，我们指出，如果多个线程需要同时访问数据库，连接池是处理连接的正确方法。</p><p>OK</p>',50),r=[l];function i(c,s){return n(),a("div",null,r)}const h=e(o,[["render",i],["__file","2024-07-27-Is java.sql.Connection Thread Safe .html.vue"]]),_=JSON.parse('{"path":"/posts/baeldung/2024-07-27/2024-07-27-Is%20java.sql.Connection%20Thread%20Safe%20.html","title":"java.sql.Connection 是否线程安全？ | Baeldung---","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","JDBC"],"tag":["Connection","Thread-Safety"],"head":[["meta",{"name":"keywords","content":"Java, JDBC, Connection, Thread-Safety"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-27/2024-07-27-Is%20java.sql.Connection%20Thread%20Safe%20.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"java.sql.Connection 是否线程安全？ | Baeldung---"}],["meta",{"property":"og:description","content":"java.sql.Connection 是否线程安全？ | Baeldung--- date: 2022-04-01 category: Java JDBC tag: Connection Thread-Safety head: meta name: keywords content: Java, JDBC, Connection, Thread-Sa..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-27T16:13:39.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Connection"}],["meta",{"property":"article:tag","content":"Thread-Safety"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-27T16:13:39.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"java.sql.Connection 是否线程安全？ | Baeldung---\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-27T16:13:39.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"java.sql.Connection 是否线程安全？ | Baeldung--- date: 2022-04-01 category: Java JDBC tag: Connection Thread-Safety head: meta name: keywords content: Java, JDBC, Connection, Thread-Sa..."},"headers":[{"level":3,"title":"4.1. Microsoft SQLServer","slug":"_4-1-microsoft-sqlserver","link":"#_4-1-microsoft-sqlserver","children":[]},{"level":3,"title":"4.2. Oracle Database","slug":"_4-2-oracle-database","link":"#_4-2-oracle-database","children":[]}],"git":{"createdTime":1722096819000,"updatedTime":1722096819000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.85,"words":1456},"filePathRelative":"posts/baeldung/2024-07-27/2024-07-27-Is java.sql.Connection Thread Safe .md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>java.sql.Connection 是否线程安全？ | Baeldung---</h1>\\n<p>date: 2022-04-01\\ncategory:</p>\\n<ul>\\n<li>Java</li>\\n<li>JDBC\\ntag:</li>\\n<li>Connection</li>\\n<li>Thread-Safety\\nhead:</li>\\n<li>\\n<ul>\\n<li>meta</li>\\n<li>name: keywords\\ncontent: Java, JDBC, Connection, Thread-Safety</li>\\n</ul>\\n</li>\\n</ul>\\n<hr>\\n<h1>java.sql.Connection 是否线程安全？ | Baeldung</h1>","autoDesc":true}');export{h as comp,_ as data};
