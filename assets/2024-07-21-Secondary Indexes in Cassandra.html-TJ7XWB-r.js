import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as n,a as e}from"./app-BMOUrRO4.js";const p={},t=e(`<h1 id="apache-cassandra中的二级索引" tabindex="-1"><a class="header-anchor" href="#apache-cassandra中的二级索引"><span>Apache Cassandra中的二级索引</span></a></h1><p>在本教程中，我们将讨论如何在Apache Cassandra中使用二级索引。</p><p>我们将看到数据库中数据是如何分布的，并探索所有索引类型。最后，我们将讨论使用二级索引的最佳实践和建议。</p><h3 id="_2-1-主键" tabindex="-1"><a class="header-anchor" href="#_2-1-主键"><span>2.1. 主键</span></a></h3><p>主键是数据建模中最重要的选择，它唯一地标识了一个数据记录。它至少由一个分区键和零个或多个聚簇列组成。</p><p>分区键定义了我们如何在集群中分割数据。聚簇列在磁盘上对数据进行排序，以实现快速的读取操作。</p><p>让我们看一个例子：</p><div class="language-sql line-numbers-mode" data-ext="sql" data-title="sql"><pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> company <span class="token punctuation">(</span>
    company_name <span class="token keyword">text</span><span class="token punctuation">,</span>
    employee_name <span class="token keyword">text</span><span class="token punctuation">,</span>
    employee_email <span class="token keyword">text</span><span class="token punctuation">,</span>
    employee_age <span class="token keyword">int</span><span class="token punctuation">,</span>
    <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>company_name<span class="token punctuation">)</span><span class="token punctuation">,</span> employee_email<span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里，我们定义了_company_name_作为用于在节点之间均匀分布表数据的分区键。接下来，由于我们指定了_employee_email_作为聚簇列，Cassandra使用它在每个节点上按升序保持数据，以便有效检索行。</p><h3 id="_2-2-集群拓扑" tabindex="-1"><a class="header-anchor" href="#_2-2-集群拓扑"><span>2.2. 集群拓扑</span></a></h3><p>Cassandra提供了与可用节点数量成正比的线性可扩展性和性能。</p><p>节点被放置在一个环中，形成一个数据中心，通过连接多个地理分布的数据中心，我们创建了一个集群。</p><p>Cassandra自动分割数据，无需手动干预，从而使其准备好处理大数据。</p><p>接下来，让我们看看Cassandra如何通过_company_name_对表进行分区：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/03/cassandra-topology.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>正如我们所看到的，_company_表使用分区键_company_name_进行分割，并跨节点分布。我们可以注意到Cassandra将具有相同_company_name_值的行分组，并将其存储在磁盘上的同一物理分区上。因此，我们可以以最小的I/O成本读取给定公司的所有数据。</p><p>此外，我们可以通过定义复制因子在数据中心跨数据中心复制数据。复制因子N将在集群中的N个不同节点上存储每行数据。</p><p>我们可以在数据中心级别而不是集群级别指定副本的数量。因此，我们可以拥有一个由多个数据中心组成的集群，每个数据中心具有不同的复制因子。</p><h3 id="_3-在非主键上查询" tabindex="-1"><a class="header-anchor" href="#_3-在非主键上查询"><span>3. 在非主键上查询</span></a></h3><p>让我们以我们之前定义的_company_表为例，尝试通过_employee_age_进行搜索：</p><div class="language-sql line-numbers-mode" data-ext="sql" data-title="sql"><pre class="language-sql"><code><span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> company <span class="token keyword">WHERE</span> employee_age <span class="token operator">=</span> <span class="token number">30</span><span class="token punctuation">;</span>

InvalidRequest: Error <span class="token keyword">from</span> server: code<span class="token operator">=</span><span class="token number">2200</span> <span class="token punctuation">[</span>Invalid query<span class="token punctuation">]</span> message<span class="token operator">=</span><span class="token string">&quot;Cannot execute this query as it might involve data filtering and thus may have unpredictable performance. If you want to execute this query despite the performance unpredictability, use ALLOW FILTERING&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们收到此错误消息是因为我们不能查询不是主键一部分的列，除非我们使用_ALLOW FILTERING_子句。</p><p>然而，即使我们技术上可以，我们也不应在生产中使用它，因为_ALLOW FILTERING_是昂贵且耗时的。这是因为，在后台，它开始对集群中的所有节点进行全面的表扫描以获取结果，这会对性能产生负面影响。</p><p>然而，一个可接受的使用案例是我们在单个分区上需要进行大量过滤。在这种情况下，Cassandra仍然执行表扫描，但我们可以将其限制在单个节点：</p><div class="language-sql line-numbers-mode" data-ext="sql" data-title="sql"><pre class="language-sql"><code><span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> company <span class="token keyword">WHERE</span> company_name <span class="token operator">=</span> <span class="token string">&#39;company_a&#39;</span> <span class="token operator">AND</span> employee_age <span class="token operator">=</span> <span class="token number">30</span> ALLOW FILTERING<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>因为我们将_company_name_聚簇列作为条件添加，Cassandra使用它来识别保存所有公司数据的节点。因此，它只对个特定节点上的表数据执行表扫描。</p><p><strong>Cassandra中的二级索引解决了对非主键列进行查询的需求。</strong></p><p>当我们插入数据时，Cassandra使用一个名为_commitlog_的仅追加文件来存储更改，因此写入速度很快。同时，数据被写入到一个名为_Memtable_的键/列值的内存缓存中。定期地，Cassandra将_Memtable_刷新到磁盘上，形成不可变的_SSTable_。</p><p>接下来，让我们看看Cassandra中的三种不同的索引方法，并讨论它们的优缺点。</p><h3 id="_4-1-常规二级索引-2i" tabindex="-1"><a class="header-anchor" href="#_4-1-常规二级索引-2i"><span>4.1. 常规二级索引（2i）</span></a></h3><p>常规二级索引是我们为在非主键列上执行查询可以定义的最基本索引。</p><p>让我们在_employee_age_列上定义一个二级索引：</p><div class="language-sql line-numbers-mode" data-ext="sql" data-title="sql"><pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">INDEX</span> <span class="token keyword">IF</span> <span class="token operator">NOT</span> <span class="token keyword">EXISTS</span> <span class="token keyword">ON</span> company <span class="token punctuation">(</span>employee_age<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>有了这个，我们现在可以无误地通过_employee_age_运行查询：</p><div class="language-sql line-numbers-mode" data-ext="sql" data-title="sql"><pre class="language-sql"><code><span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> company <span class="token keyword">WHERE</span> employee_age <span class="token operator">=</span> <span class="token number">30</span><span class="token punctuation">;</span>

company_name  <span class="token operator">|</span> employee_email    <span class="token operator">|</span> employee_age <span class="token operator">|</span> employee_name
<span class="token comment">--------------+-------------------+--------------+---------------</span>
    company_A <span class="token operator">|</span> emp1<span class="token variable">@companyA.com</span> <span class="token operator">|</span>           <span class="token number">30</span> <span class="token operator">|</span>     employee_1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当我们设置索引时，Cassandra在后台创建了一个隐藏表来存储索引数据：</p><div class="language-sql line-numbers-mode" data-ext="sql" data-title="sql"><pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> company_by_employee_age_idx <span class="token punctuation">(</span>
    employee_age <span class="token keyword">int</span><span class="token punctuation">,</span>
    company_name <span class="token keyword">text</span><span class="token punctuation">,</span>
    employee_email <span class="token keyword">text</span><span class="token punctuation">,</span>
    <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>employee_age<span class="token punctuation">)</span><span class="token punctuation">,</span> company_name<span class="token punctuation">,</span> employee_email<span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>与常规表不同，Cassandra不使用集群范围内的分区器来分发隐藏索引表。索引数据与源数据在同一节点上共存。</p><p><strong>因此，当使用二级索引执行搜索查询时，Cassandra从每个节点读取索引数据并收集所有结果。如果我们的集群有很多节点，这可能导致数据传输增加和高延迟。</strong></p><p>我们可能会问自己为什么Cassandra不根据主键将索引表分区到节点上。答案是将索引数据与源数据一起存储可以减少延迟。另外，由于索引更新是在本地执行的，而不是通过网络，因此没有因连接问题而丢失更新操作的风险。此外，如果索引列数据分布不均匀，Cassandra避免了创建宽分区。</p><p>当我们向附加了二级索引的表中插入数据时，Cassandra同时写入索引和基础_Memtable_。此外，两者同时被刷新到_SSTable_ s。因此，索引数据将具有与源数据不同的生命周期。</p><p><strong>当我们根据二级索引读取数据时，Cassandra首先检索所有匹配行的主键，然后使用它们从源表中获取所有数据。</strong></p><h3 id="_4-2-sstable附加二级索引-sasi" tabindex="-1"><a class="header-anchor" href="#_4-2-sstable附加二级索引-sasi"><span>4.2. SSTable附加二级索引（SASI）</span></a></h3><p>SASI引入了将_SSTable_生命周期绑定到索引的新概念。执行内存索引，然后与_SSTable_一起将索引刷新到磁盘，减少了磁盘使用并节省了CPU周期。</p><p>让我们看看如何定义SASI索引：</p><div class="language-sql line-numbers-mode" data-ext="sql" data-title="sql"><pre class="language-sql"><code><span class="token keyword">CREATE</span> CUSTOM <span class="token keyword">INDEX</span> <span class="token keyword">IF</span> <span class="token operator">NOT</span> <span class="token keyword">EXISTS</span> company_by_employee_age <span class="token keyword">ON</span> company <span class="token punctuation">(</span>employee_age<span class="token punctuation">)</span> <span class="token keyword">USING</span> <span class="token string">&#39;org.apache.cassandra.index.sasi.SASIIndex&#39;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>SASI的优点是标记化文本搜索、快速范围扫描和内存索引。另一方面，一个缺点是它生成大索引文件，特别是启用文本标记化时。</p><p><strong>最后，我们应该注意，在DataStax Enterprise（DSE）中，SASI索引是实验性的。DataStax不支持SASI索引用于生产。</strong></p><h3 id="_4-3-存储附加索引-sai" tabindex="-1"><a class="header-anchor" href="#_4-3-存储附加索引-sai"><span>4.3. 存储附加索引（SAI）</span></a></h3><p>存储附加索引是DataStax Astra和DataStax Enterprise数据库中可用的高度可扩展的数据索引机制。我们可以在任何列上定义一个或多个SAI索引，然后使用范围查询（仅限数字）、_CONTAIN_语义和过滤查询。</p><p>SAI为每个列存储单独的索引文件，并包含指向_SSTable_中源数据偏移量的指针。一旦我们将数据插入到索引列中，它首先会被写入到内存中。每当Cassandra将数据从内存刷新到磁盘时，它会将索引与数据表一起写入。</p><p>**这种方法通过减少写入开销，将吞吐量提高了43%，将延迟提高了230%。**与SASI和2i相比，它用于索引的磁盘空间显著减少，故障点更少，并具有更简化的架构。</p><p>让我们使用SAI定义我们的索引：</p><div class="language-sql line-numbers-mode" data-ext="sql" data-title="sql"><pre class="language-sql"><code><span class="token keyword">CREATE</span> CUSTOM <span class="token keyword">INDEX</span> <span class="token keyword">ON</span> company <span class="token punctuation">(</span>employee_age<span class="token punctuation">)</span> <span class="token keyword">USING</span> <span class="token string">&#39;StorageAttachedIndex&#39;</span> <span class="token keyword">WITH</span> OPTIONS <span class="token operator">=</span> {<span class="token string">&#39;case_sensitive&#39;</span>: <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token string">&#39;normalize&#39;</span>: <span class="token boolean">false</span>}<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>规范化选项将特殊字符转换为其基本字符。例如，我们可以将德语字符_ö_规范化为常规的o，从而在不输入特殊字符的情况下实现查询匹配。因此，例如，我们可以通过简单地使用“schon”作为条件来搜索术语“schön”。</p><h3 id="_4-4-最佳实践" tabindex="-1"><a class="header-anchor" href="#_4-4-最佳实践"><span>4.4. 最佳实践</span></a></h3><p>首先，当我们在查询中使用二级索引时，建议添加分区键作为条件。<strong>结果，我们可以将读取操作减少到单个节点</strong>（加上根据一致性级别而定的副本）：</p><div class="language-sql line-numbers-mode" data-ext="sql" data-title="sql"><pre class="language-sql"><code><span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> company <span class="token keyword">WHERE</span> employee_age <span class="token operator">=</span> <span class="token number">30</span> <span class="token operator">AND</span> company_name <span class="token operator">=</span> <span class="token string">&quot;company_A&quot;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>其次，我们可以将查询限制在一系列分区键上</strong>，并限制参与获取结果的节点数量：</p><div class="language-sql line-numbers-mode" data-ext="sql" data-title="sql"><pre class="language-sql"><code><span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> company <span class="token keyword">WHERE</span> employee_age <span class="token operator">=</span> <span class="token number">30</span> <span class="token operator">AND</span> company_name <span class="token operator">IN</span> <span class="token punctuation">(</span><span class="token string">&quot;company_A&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;company_B&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;company_C&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>第三，如果我们只需要结果的一个子集，我们可以向查询添加限制</strong>。这也减少了参与读取路径的节点数量：</p><div class="language-sql line-numbers-mode" data-ext="sql" data-title="sql"><pre class="language-sql"><code><span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> company <span class="token keyword">WHERE</span> employee_age <span class="token operator">=</span> <span class="token number">30</span> <span class="token keyword">LIMIT</span> <span class="token number">10</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>此外，<strong>我们必须避免在具有非常低基数的列上定义二级索引</strong>（性别、真/假列等），因为它们产生非常宽的分区，影响性能。</p><p>同样，<strong>具有高基数的列</strong> <strong>（社会安全号码、电子邮件等）将导致索引具有非常细粒度的分区</strong>，在最坏的情况下，将迫使集群协调器访问所有主副本。</p><p>最后，<strong>我们必须避免在频繁更新的列上使用二级索引</strong>。其背后的原因是Cassandra使用不可变数据结构，频繁更新会增加磁盘上的写操作次数。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们探讨了Cassandra如何在数据中心中分割数据，并探讨了三种类型的二级索引。</p><p>在考虑二级索引之前，我们应该考虑将我们的数据反规范化到第二个表中，并保持它与主表的更新，如果我们计划频繁访问它。</p><p>另一方面，如果数据访问是零星的，添加一个单独的表会增加不必要的复杂性。因此，引入二级索引是更好的选择。毫无疑问，存储附加索引是我们所拥有的三种索引选项中的最佳选择，提供了最佳的性能和简化的架构。</p><p><img src="https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg" alt="img" loading="lazy"><img src="https://secure.gravatar.com/avatar/476058cc2637ccd0fe79b5674405748e?s=50&amp;r=g" alt="img" loading="lazy"><img src="https://secure.gravatar.com/avatar/e10d6ff4ff6d95fd255cc95a5ab28c0e?s=50&amp;r=g" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2022/03/cassandra-topology.png" alt="img" loading="lazy"></p><p>OK</p>`,71),o=[t];function l(c,r){return n(),s("div",null,o)}const u=a(p,[["render",l],["__file","2024-07-21-Secondary Indexes in Cassandra.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-07-21/2024-07-21-Secondary%20Indexes%20in%20Cassandra.html","title":"Apache Cassandra中的二级索引","lang":"zh-CN","frontmatter":{"date":"2022-03-01T00:00:00.000Z","category":["Database","Cassandra"],"tag":["Secondary Indexes","NoSQL"],"head":[["meta",{"name":"keywords","content":"Cassandra, Secondary Indexes, NoSQL, Database"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-21/2024-07-21-Secondary%20Indexes%20in%20Cassandra.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Apache Cassandra中的二级索引"}],["meta",{"property":"og:description","content":"Apache Cassandra中的二级索引 在本教程中，我们将讨论如何在Apache Cassandra中使用二级索引。 我们将看到数据库中数据是如何分布的，并探索所有索引类型。最后，我们将讨论使用二级索引的最佳实践和建议。 2.1. 主键 主键是数据建模中最重要的选择，它唯一地标识了一个数据记录。它至少由一个分区键和零个或多个聚簇列组成。 分区键定..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2022/03/cassandra-topology.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-21T00:40:43.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Secondary Indexes"}],["meta",{"property":"article:tag","content":"NoSQL"}],["meta",{"property":"article:published_time","content":"2022-03-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-21T00:40:43.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Apache Cassandra中的二级索引\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2022/03/cassandra-topology.png\\",\\"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg\\",\\"https://secure.gravatar.com/avatar/476058cc2637ccd0fe79b5674405748e?s=50&r=g\\",\\"https://secure.gravatar.com/avatar/e10d6ff4ff6d95fd255cc95a5ab28c0e?s=50&r=g\\",\\"https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png\\",\\"https://www.baeldung.com/wp-content/uploads/2022/03/cassandra-topology.png\\"],\\"datePublished\\":\\"2022-03-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-21T00:40:43.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Apache Cassandra中的二级索引 在本教程中，我们将讨论如何在Apache Cassandra中使用二级索引。 我们将看到数据库中数据是如何分布的，并探索所有索引类型。最后，我们将讨论使用二级索引的最佳实践和建议。 2.1. 主键 主键是数据建模中最重要的选择，它唯一地标识了一个数据记录。它至少由一个分区键和零个或多个聚簇列组成。 分区键定..."},"headers":[{"level":3,"title":"2.1. 主键","slug":"_2-1-主键","link":"#_2-1-主键","children":[]},{"level":3,"title":"2.2. 集群拓扑","slug":"_2-2-集群拓扑","link":"#_2-2-集群拓扑","children":[]},{"level":3,"title":"3. 在非主键上查询","slug":"_3-在非主键上查询","link":"#_3-在非主键上查询","children":[]},{"level":3,"title":"4.1. 常规二级索引（2i）","slug":"_4-1-常规二级索引-2i","link":"#_4-1-常规二级索引-2i","children":[]},{"level":3,"title":"4.2. SSTable附加二级索引（SASI）","slug":"_4-2-sstable附加二级索引-sasi","link":"#_4-2-sstable附加二级索引-sasi","children":[]},{"level":3,"title":"4.3. 存储附加索引（SAI）","slug":"_4-3-存储附加索引-sai","link":"#_4-3-存储附加索引-sai","children":[]},{"level":3,"title":"4.4. 最佳实践","slug":"_4-4-最佳实践","link":"#_4-4-最佳实践","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1721522443000,"updatedTime":1721522443000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":8.51,"words":2552},"filePathRelative":"posts/baeldung/2024-07-21/2024-07-21-Secondary Indexes in Cassandra.md","localizedDate":"2022年3月1日","excerpt":"\\n<p>在本教程中，我们将讨论如何在Apache Cassandra中使用二级索引。</p>\\n<p>我们将看到数据库中数据是如何分布的，并探索所有索引类型。最后，我们将讨论使用二级索引的最佳实践和建议。</p>\\n<h3>2.1. 主键</h3>\\n<p>主键是数据建模中最重要的选择，它唯一地标识了一个数据记录。它至少由一个分区键和零个或多个聚簇列组成。</p>\\n<p>分区键定义了我们如何在集群中分割数据。聚簇列在磁盘上对数据进行排序，以实现快速的读取操作。</p>\\n<p>让我们看一个例子：</p>\\n<div class=\\"language-sql\\" data-ext=\\"sql\\" data-title=\\"sql\\"><pre class=\\"language-sql\\"><code><span class=\\"token keyword\\">CREATE</span> <span class=\\"token keyword\\">TABLE</span> company <span class=\\"token punctuation\\">(</span>\\n    company_name <span class=\\"token keyword\\">text</span><span class=\\"token punctuation\\">,</span>\\n    employee_name <span class=\\"token keyword\\">text</span><span class=\\"token punctuation\\">,</span>\\n    employee_email <span class=\\"token keyword\\">text</span><span class=\\"token punctuation\\">,</span>\\n    employee_age <span class=\\"token keyword\\">int</span><span class=\\"token punctuation\\">,</span>\\n    <span class=\\"token keyword\\">PRIMARY</span> <span class=\\"token keyword\\">KEY</span> <span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">(</span>company_name<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">,</span> employee_email<span class=\\"token punctuation\\">)</span>\\n<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n</code></pre></div>","autoDesc":true}');export{u as comp,m as data};
