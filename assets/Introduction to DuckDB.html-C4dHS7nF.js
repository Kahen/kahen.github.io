import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as a,a as n}from"./app-DzJ3ruqA.js";const d={},i=n(`<h1 id="duckdb数据库简介" tabindex="-1"><a class="header-anchor" href="#duckdb数据库简介"><span>DuckDB数据库简介</span></a></h1><ol><li>概览</li></ol><p>在本教程中，我们将学习一个名为DuckDB的分析型关系数据库。我们将探索它的优势，并了解它如何成为分析任务的高效解决方案。然后，我们将介绍安装过程和一些基本操作。</p><ol start="2"><li>DuckDB是什么？</li></ol><p><strong>DuckDB是一个主要设计用于数据分析的内存分析关系数据库。</strong> 由于其列存储特性，即将每个列的数据分别存储，因此被认为是分析数据库。相比之下，传统关系数据库使用基于行的存储，按行存储数据。</p><p>DuckDB的优势包括：</p><ul><li>快速查询——DuckDB利用列向量化查询执行引擎，优化了批量数据查询。</li><li>SQL兼容性——DuckDB支持标准SQL查询，例如聚合和窗口函数，非常适合熟悉SQL的数据分析人员。</li><li>快速部署——DuckDB外部依赖性很小，并且可以在应用程序进程内运行，无需单独的数据库实例，使得部署和集成变得简单。</li><li>免费——DuckDB是一个开源项目，对所有人免费开放。其全部源代码在GitHub上可供探索和贡献。</li></ul><ol start="3"><li>DuckDB安装</li></ol><p>DuckDB提供了多种安装选项以适应我们的环境。这里我们将演示两种常见的安装方法。</p><h3 id="_3-1-命令行" tabindex="-1"><a class="header-anchor" href="#_3-1-命令行"><span>3.1. 命令行</span></a></h3><p><strong>对于Windows用户，我们可以使用WinGet包管理器安装DuckDB。</strong> 我们只需要以管理员权限打开命令提示符并执行以下命令：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>winget install DuckDB.cli
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>在Mac OS上，我们可以使用Homebrew进行安装：</strong></p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>brew install duckdb
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>完成DuckDB CLI的安装后，brew会自动将二进制路径添加到现有的环境变量中。我们可以打开一个新的shell会话，并通过运行以下命令运行DuckDB CLI：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>duckdb
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_3-2-java" tabindex="-1"><a class="header-anchor" href="#_3-2-java"><span>3.2. Java</span></a></h3><p>DuckDB可以与Java集成，无需安装单独的数据库实例。要开始使用，我们在_pom.xml_中包含以下DuckDB JDBC依赖项：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>\`&lt;dependency&gt;\`
    \`&lt;groupId&gt;\`org.duckdb\`&lt;/groupId&gt;\`
    \`&lt;artifactId&gt;\`duckdb_jdbc\`&lt;/artifactId&gt;\`
    \`&lt;version&gt;\`0.10.0\`&lt;/version&gt;\`
\`&lt;/dependency&gt;\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以加载DuckDB JDBC驱动程序，然后通过以下JDBC URL创建JDBC连接：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Class.forName(&quot;org.duckdb.DuckDBDriver&quot;);
Connection conn = DriverManager.getConnection(&quot;jdbc:duckdb:&quot;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>默认情况下，当我们连接到DuckDB时，DuckDB会自动创建一个内存数据库实例。但是，一旦DuckDB进程完成，实例中持久化的所有数据都会丢失。要将我们的数据保存到磁盘，我们可以在连接URL后的冒号后附加数据库名称：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Connection conn = DriverManager.getConnection(&quot;jdbc:duckdb:/test_duckdb&quot;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在这个例子中，DuckDB在根目录下创建了一个名为_test_duckdb_的数据库文件。由于这是一个JDBC库，我们可以通过创建SQL <em>Statement</em> 并执行它来查询数据，以获取 <em>ResultSet</em>。以下是一个简单的JDBC示例，用于获取当前日期：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Statement stmt = conn.createStatement();
ResultSet rs = stmt.executeQuery(&quot;SELECT current_date&quot;);
Date currentDate = rs.next() ? rs.getDate(1) : null;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在本教程的后续部分中，我们可以使用相同的JDBC方法在Java中执行SQL语句。</p><ol start="4"><li>数据导入</li></ol><p>让我们继续将一些数据导入DuckDB。它可以处理各种数据格式，简化了从外部数据源的导入。</p><h3 id="_4-1-csv文件" tabindex="-1"><a class="header-anchor" href="#_4-1-csv文件"><span>4.1. CSV文件</span></a></h3><p>CSV是存储表格数据的常见数据格式。假设我们有以下包含客户数据的CSV文件：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>CustomerId,FirstName,LastName,Gender
101,John,Smith,Male
102,Sarah,Jones,Female
...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以使用SQL函数_read_csv_从CSV文件导入数据到DuckDB表_customer_：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>CREATE TABLE customer AS
SELECT * FROM read_csv(&#39;customer.csv&#39;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>DuckDB可以从CSV文件的标题行推断出模式。标题名称被视为表列名，而后续行被视为数据行。</p><h3 id="_4-2-json文件" tabindex="-1"><a class="header-anchor" href="#_4-2-json文件"><span>4.2. JSON文件</span></a></h3><p>另一种存储和共享数据的流行方式是JSON。例如，让我们看看以下的_product.json_ JSON文件：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>[
  {
    &quot;productId&quot;: 1,
    &quot;productName&quot;:&quot;EZ Curl Bar&quot;,
    &quot;category&quot;: &quot;Sports Equipment&quot;
  },
  {
    &quot;productId&quot;: 2,
    &quot;productName&quot;: &quot;7&#39; Barbell&quot;,
    &quot;category&quot;: &quot;Sports Equipment&quot;
  }
]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>与CSV导入类似，我们可以执行一个SQL语句将数据导入到DuckDB表_product_：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>CREATE TABLE product AS
SELECT * FROM read_json(&#39;product.json&#39;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>就像CSV一样，DuckDB根据JSON文件中的JSON属性名称自动推断出模式。</p><h3 id="_4-3-insert-语句" tabindex="-1"><a class="header-anchor" href="#_4-3-insert-语句"><span>4.3. _INSERT_语句</span></a></h3><p>我们可以使用_insert_语句向DuckDB表中添加数据，因为它是一个SQL关系数据库系统。以下示例展示了创建一个_purchase_表，该表定义了_customer_和_product_之间的关系，并填充了一些数据行：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>CREATE TABLE purchase(customerId BIGINT, productId BIGINT);
INSERT INTO purchase(customerId, productId) VALUES (101,1);
INSERT INTO purchase(customerId, productId) VALUES (102,1);
INSERT INTO purchase(customerId, productId) VALUES (102,2);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="5"><li>数据查询</li></ol><p>数据加载完成后，我们将探索查询DuckDB并分析我们的数据。</p><h3 id="_5-1-连接操作" tabindex="-1"><a class="header-anchor" href="#_5-1-连接操作"><span>5.1. 连接操作</span></a></h3><p><strong>除了将外部数据导入DuckDB外，我们还可以直接使用外部数据。</strong> 基于前一节的示例，我们将使用前一节中的三个数据源。现在，让我们连接这些数据源以收集有关客户产品的信息。</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>SELECT C.firstName, C.lastName, P.productName
FROM read_csv(&#39;customer.csv&#39;) AS C, read_json(&#39;product.json&#39;) AS P, purchase S
WHERE S.customerId = C.customerId
AND S.productId = P.productId
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行后，我们将看到以下查询结果，显示客户名称及其相应的产品购买情况：</p><table><thead><tr><th>firstName</th><th>lastName</th><th>productName</th></tr></thead><tbody><tr><td>John</td><td>Smith</td><td>EZ Curl Bar</td></tr><tr><td>Sarah</td><td>Jones</td><td>7&#39; Barbell</td></tr><tr><td>Sarah</td><td>Jones</td><td>EZ Curl Bar</td></tr></tbody></table><h3 id="_5-2-聚合函数" tabindex="-1"><a class="header-anchor" href="#_5-2-聚合函数"><span>5.2. 聚合函数</span></a></h3><p>DuckDB提供了丰富的聚合函数，用于对一组行执行计算。让我们通过这些函数探索一个示例：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>SELECT P.productName, COUNT(*) AS purchaseCount
FROM customer C, product P, purchase S
WHERE S.customerId = C.customerId
AND S.productId = P.productId
GROUP BY P.productName
ORDER BY COUNT(*) DESC
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该查询统计了每个产品的购买数量，并按购买数量降序排序：</p><table><thead><tr><th>productName</th><th>purchaseCount</th></tr></thead><tbody><tr><td>EZ Curl Bar</td><td>2</td></tr><tr><td>7&#39; Barbell</td><td>1</td></tr></tbody></table><ol start="6"><li>数据导出</li></ol><p>在数据分析任务中，我们经常需要将聚合数据导出到其他应用程序进行进一步分析。</p><p>让我们通过DuckDB以各种格式导出数据的过程。在我们的示例中，我们首先创建一个数据库视图，以便稍后轻松说明导出过程：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>CREATE VIEW purchase_view AS
SELECT P.productName, COUNT(*) AS purchaseCount
FROM customer C, product P, purchase S
WHERE S.customerId = C.customerId
AND S.productId = P.productId
GROUP BY P.productName
ORDER BY COUNT(*) DESC;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-1-csv文件" tabindex="-1"><a class="header-anchor" href="#_6-1-csv文件"><span>6.1. CSV文件</span></a></h3><p>在DuckDB中将数据导出到CSV文件非常简单。我们可以执行以下简单的SQL，将我们数据库视图_purchase_view_中的所有数据复制到根目录中的CSV文件：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>COPY purchase_view TO &#39;/output.csv&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_6-2-json文件" tabindex="-1"><a class="header-anchor" href="#_6-2-json文件"><span>6.2. JSON文件</span></a></h3><p>要将数据导出到JSON文件，我们需要包括一个额外的选项_array_，以指定将数据写入为JSON数组。这确保了我们导出的JSON文件具有适当的结构：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>COPY (SELECT * FROM purchase_view WHERE purchaseCount &gt; 1) TO &#39;/output.json&#39; (array true);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>与导出所有数据不同，我们可以根据_select_查询的条件复制部分结果。</p><ol start="7"><li>结论</li></ol><p>在本文中，我们了解了DuckDB数据库及其优势。我们还通过示例了解了一些基本操作。</p><p>如往常一样，所有代码都在GitHub上可用。</p><p>发布帖子后30天内开放评论。对于此日期之后的任何问题，请使用网站上的联系表单。</p><p>OK</p>`,71),s=[i];function l(r,c){return a(),t("div",null,s)}const p=e(d,[["render",l],["__file","Introduction to DuckDB.html.vue"]]),v=JSON.parse('{"path":"/posts/baeldung/Archive/Introduction%20to%20DuckDB.html","title":"DuckDB数据库简介","lang":"zh-CN","frontmatter":{"date":"2024-06-19T00:00:00.000Z","category":["Database","Java"],"tag":["DuckDB","SQL","CSV","JSON"],"head":[["meta",{"name":"keywords","content":"DuckDB, relational database, SQL, data analysis, Java integration, CSV import, JSON import"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/Introduction%20to%20DuckDB.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"DuckDB数据库简介"}],["meta",{"property":"og:description","content":"DuckDB数据库简介 概览 在本教程中，我们将学习一个名为DuckDB的分析型关系数据库。我们将探索它的优势，并了解它如何成为分析任务的高效解决方案。然后，我们将介绍安装过程和一些基本操作。 DuckDB是什么？ DuckDB是一个主要设计用于数据分析的内存分析关系数据库。 由于其列存储特性，即将每个列的数据分别存储，因此被认为是分析数据库。相比之下..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"DuckDB"}],["meta",{"property":"article:tag","content":"SQL"}],["meta",{"property":"article:tag","content":"CSV"}],["meta",{"property":"article:tag","content":"JSON"}],["meta",{"property":"article:published_time","content":"2024-06-19T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"DuckDB数据库简介\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-19T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"DuckDB数据库简介 概览 在本教程中，我们将学习一个名为DuckDB的分析型关系数据库。我们将探索它的优势，并了解它如何成为分析任务的高效解决方案。然后，我们将介绍安装过程和一些基本操作。 DuckDB是什么？ DuckDB是一个主要设计用于数据分析的内存分析关系数据库。 由于其列存储特性，即将每个列的数据分别存储，因此被认为是分析数据库。相比之下..."},"headers":[{"level":3,"title":"3.1. 命令行","slug":"_3-1-命令行","link":"#_3-1-命令行","children":[]},{"level":3,"title":"3.2. Java","slug":"_3-2-java","link":"#_3-2-java","children":[]},{"level":3,"title":"4.1. CSV文件","slug":"_4-1-csv文件","link":"#_4-1-csv文件","children":[]},{"level":3,"title":"4.2. JSON文件","slug":"_4-2-json文件","link":"#_4-2-json文件","children":[]},{"level":3,"title":"4.3. _INSERT_语句","slug":"_4-3-insert-语句","link":"#_4-3-insert-语句","children":[]},{"level":3,"title":"5.1. 连接操作","slug":"_5-1-连接操作","link":"#_5-1-连接操作","children":[]},{"level":3,"title":"5.2. 聚合函数","slug":"_5-2-聚合函数","link":"#_5-2-聚合函数","children":[]},{"level":3,"title":"6.1. CSV文件","slug":"_6-1-csv文件","link":"#_6-1-csv文件","children":[]},{"level":3,"title":"6.2. JSON文件","slug":"_6-2-json文件","link":"#_6-2-json文件","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":6.01,"words":1803},"filePathRelative":"posts/baeldung/Archive/Introduction to DuckDB.md","localizedDate":"2024年6月19日","excerpt":"\\n<ol>\\n<li>概览</li>\\n</ol>\\n<p>在本教程中，我们将学习一个名为DuckDB的分析型关系数据库。我们将探索它的优势，并了解它如何成为分析任务的高效解决方案。然后，我们将介绍安装过程和一些基本操作。</p>\\n<ol start=\\"2\\">\\n<li>DuckDB是什么？</li>\\n</ol>\\n<p><strong>DuckDB是一个主要设计用于数据分析的内存分析关系数据库。</strong> 由于其列存储特性，即将每个列的数据分别存储，因此被认为是分析数据库。相比之下，传统关系数据库使用基于行的存储，按行存储数据。</p>\\n<p>DuckDB的优势包括：</p>\\n<ul>\\n<li>快速查询——DuckDB利用列向量化查询执行引擎，优化了批量数据查询。</li>\\n<li>SQL兼容性——DuckDB支持标准SQL查询，例如聚合和窗口函数，非常适合熟悉SQL的数据分析人员。</li>\\n<li>快速部署——DuckDB外部依赖性很小，并且可以在应用程序进程内运行，无需单独的数据库实例，使得部署和集成变得简单。</li>\\n<li>免费——DuckDB是一个开源项目，对所有人免费开放。其全部源代码在GitHub上可供探索和贡献。</li>\\n</ul>","autoDesc":true}');export{p as comp,v as data};
