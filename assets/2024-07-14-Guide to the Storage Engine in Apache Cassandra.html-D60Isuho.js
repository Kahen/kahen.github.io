import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as t,a as r}from"./app-yRPSFQJx.js";const n={},s=r('<hr><h1 id="apache-cassandra存储引擎指南" tabindex="-1"><a class="header-anchor" href="#apache-cassandra存储引擎指南"><span>Apache Cassandra存储引擎指南</span></a></h1><p>现代数据库系统通过利用复杂的存储引擎来保证可靠性、一致性、高吞吐量等能力，从而定制化以满足一系列需求。在本教程中，我们将深入探讨Apache Cassandra使用的存储引擎的内部结构，它专为写入密集型工作负载设计，同时保持了良好的读取性能。</p><h2 id="_2-log-structured-merge-tree-lsmt" tabindex="-1"><a class="header-anchor" href="#_2-log-structured-merge-tree-lsmt"><span>2. Log-Structured Merge-Tree (LSMT)</span></a></h2><p>Apache Cassandra利用基于两层Log-Structured Merge-Tree（LSMT）的数据结构进行存储。在高层次上，LSM树有两个类似树的组件，一个是内存缓存组件（C0）和一个磁盘组件（C1）：</p><p>阅读和写入内存通常比磁盘快。因此，按照设计，所有请求在到达C1之前都会先击中C0。此外，同步操作会定期将数据从C0持久化到C1。因此，它通过减少I/O操作有效利用了网络带宽。</p><p>在接下来的部分中，我们将更多地了解Apache Cassandra的两级LSM树的C0和C1数据结构，分别称为MemTable和SSTable。</p><h2 id="_3-memtable" tabindex="-1"><a class="header-anchor" href="#_3-memtable"><span>3. MemTable</span></a></h2><p>顾名思义，MemTable是一个内存驻留的数据结构，例如具有自平衡二叉搜索树属性的红黑树。因此，所有的读写操作，即搜索、插入、更新和删除，都可以以O(log n)的时间复杂度实现。</p><p>作为一个内存中的可变数据结构，MemTable使所有的写操作变得顺序化，并允许快速写入操作。此外，由于物理内存的典型限制，例如容量有限和易失性，我们需要将MemTable中的数据持久化到磁盘：</p><p>一旦MemTable的大小达到阈值，所有的读写请求就会切换到一个新的MemTable，而旧的MemTable在刷新到磁盘后就被丢弃。</p><p>到目前为止，一切都很好！我们可以有效地处理大量的写入。然而，如果节点在刷新操作之前崩溃了怎么办？很简单——我们将丢失尚未刷新到磁盘的数据。</p><p>在下一节中，我们将看到Apache Cassandra如何通过使用Write-Ahead Logs（WAL）的概念来解决这个问题。</p><h2 id="_4-commit-log" tabindex="-1"><a class="header-anchor" href="#_4-commit-log"><span>4. Commit Log</span></a></h2><p>Apache Cassandra推迟了将数据从内存持久化到磁盘的刷新操作。因此，意外的节点或进程崩溃可能导致数据丢失。</p><p>持久性是任何现代数据库系统的必备功能，Apache Cassandra也不例外。它通过确保所有写入都持久化到一个名为Commit Log的仅追加文件中来保证持久性。之后，它使用MemTable作为写入路径中的写回缓存：</p><p>我们必须注意，仅追加操作是快速的，因为它们避免了磁盘上的随机查找。因此，Commit Log在不妥协写入性能的情况下带来了持久性能力。此外，Apache Cassandra仅在崩溃恢复场景中引用Commit Log，而常规的读取请求不会访问Commit Log。</p><h2 id="_5-sstable" tabindex="-1"><a class="header-anchor" href="#_5-sstable"><span>5. SSTable</span></a></h2><p>Sorted String Table（SSTable）是Apache Cassandra存储引擎使用的LSM树的磁盘组件。它的名字来源于Google的BigTable数据库首次使用的一个类似数据结构，表明数据以排序格式提供。一般来说，从MemTable的每次刷新操作都会在SSTable中生成一个新的不可变段。</p><p>让我们尝试想象一下SSTable在包含有关动物园中各种动物数量的数据时的样子：</p><p>尽管段按键排序，但相同的键可能存在于多个段中。因此，如果我们要找特定的键，我们需要从最新的段开始搜索，并在找到它后立即返回结果。</p><p>通过这种策略，最近写入的键的读取操作会很快。然而，在最坏的情况下，算法的执行将以O(<em>N</em>*log(<em>K</em>))的时间复杂度进行，其中_N_是段的总数，_K_是段的大小。由于_K_是一个常数，我们可以认为总体时间复杂度是O(<em>N</em>)，这是不高效的。</p><p>在接下来的几节中，我们将了解Apache Cassandra如何通过稀疏索引优化SSTable的读取操作。</p><h2 id="_6-sparse-index" tabindex="-1"><a class="header-anchor" href="#_6-sparse-index"><span>6. Sparse Index</span></a></h2><p>Apache Cassandra维护一个稀疏索引，以限制在查找键时需要扫描的段的数量。</p><p>稀疏索引中的每个条目包含一个段的第一个成员以及它在磁盘上的偏移位置。此外，索引作为B-Tree数据结构在内存中维护，以便我们可以用O(log(<em>K</em>))的时间复杂度在索引中搜索偏移。</p><p>假设我们要搜索键“beer”。我们将首先搜索所有在稀疏索引中排在“beer”之前的键。之后，使用偏移值，我们将只查看有限数量的段。在这种情况下，我们将查看第一个键是“alligator”的第四个段：</p><p>另一方面，如果我们不得不搜索一个不存在的键，比如“kangaroo”，我们将不得不徒劳地查看所有段。因此，我们意识到使用稀疏索引在有限的程度上优化了搜索。</p><p>此外，我们应该注意到SSTable允许相同的键出现在不同的段中。因此，随着时间的推移，对同一键的更新会越来越多，从而在稀疏索引中也创建了重复的键。</p><p>在接下来的几节中，我们将了解Apache Cassandra如何通过布隆过滤器和压缩来解决这两个问题。</p><h2 id="_7-bloom-filter" tabindex="-1"><a class="header-anchor" href="#_7-bloom-filter"><span>7. Bloom Filter</span></a></h2><p>Apache Cassandra使用一种称为布隆过滤器的概率数据结构来优化读取查询。简单来说，它通过首先使用布隆过滤器对键进行成员资格检查来优化搜索。</p><p>因此，通过为SSTable的每个段附加一个布隆过滤器，我们将为我们的读取查询获得显著的优化，特别是对于那些不在段中的键：</p><p>由于布隆过滤器是概率数据结构，我们甚至对于缺失的键也可能得到“可能”作为响应。然而，如果我们得到“否”作为响应，我们可以确定键肯定缺失。</p><p>尽管它们有局限性，但我们可以通过为它们分配更大的存储空间来计划提高布隆过滤器的准确性。</p><h2 id="_8-compaction" tabindex="-1"><a class="header-anchor" href="#_8-compaction"><span>8. Compaction</span></a></h2><p>尽管使用了布隆过滤器和稀疏索引，随着时间的推移，读取查询的性能会下降。这是因为随着每次MemTable刷新操作，包含键的不同版本的段的数量可能会增长。</p><p>为了解决这个问题，Apache Cassandra运行了一个后台压缩进程，它合并较小的排序段成为较大的段，同时只保留每个键的最新值。因此，<strong>压缩过程提供了更快的读取和更少的存储空间的双重好处</strong>。</p><p>让我们看看在我们的现有SSTable上进行一次压缩操作会是什么样子：</p><p>我们注意到压缩操作通过只保留最新版本来回收一些空间。例如，不再存在“elephant”和“tiger”等键的旧版本，从而释放了磁盘空间。</p><p>此外，压缩过程启用了键的硬删除。虽然删除操作会用墓碑标记一个键，但实际的删除会推迟到压缩时进行。</p><h2 id="_9-conclusion" tabindex="-1"><a class="header-anchor" href="#_9-conclusion"><span>9. Conclusion</span></a></h2><p>在本文中，我们探讨了Apache Cassandra存储引擎的内部组件。在这样做的过程中，<strong>我们学习了LSM树、MemTable和SSTable等高级数据结构概念</strong>。此外，我们还学习了一些使用Write-Ahead Logging、Bloom Filters、Sparse Index和Compaction的优化技术。</p>',43),p=[s];function o(l,c){return t(),a("div",null,p)}const h=e(n,[["render",o],["__file","2024-07-14-Guide to the Storage Engine in Apache Cassandra.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-07-14/2024-07-14-Guide%20to%20the%20Storage%20Engine%20in%20Apache%20Cassandra.html","title":"Apache Cassandra存储引擎指南","lang":"zh-CN","frontmatter":{"date":"2022-09-01T00:00:00.000Z","category":["Database","Apache Cassandra"],"tag":["Storage Engine","LSMT"],"head":[["meta",{"name":"keywords","content":"Apache Cassandra, Storage Engine, LSMT, MemTable, SSTable"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-14/2024-07-14-Guide%20to%20the%20Storage%20Engine%20in%20Apache%20Cassandra.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Apache Cassandra存储引擎指南"}],["meta",{"property":"og:description","content":"Apache Cassandra存储引擎指南 现代数据库系统通过利用复杂的存储引擎来保证可靠性、一致性、高吞吐量等能力，从而定制化以满足一系列需求。在本教程中，我们将深入探讨Apache Cassandra使用的存储引擎的内部结构，它专为写入密集型工作负载设计，同时保持了良好的读取性能。 2. Log-Structured Merge-Tree (LS..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-14T08:48:57.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Storage Engine"}],["meta",{"property":"article:tag","content":"LSMT"}],["meta",{"property":"article:published_time","content":"2022-09-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-14T08:48:57.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Apache Cassandra存储引擎指南\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-09-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-14T08:48:57.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Apache Cassandra存储引擎指南 现代数据库系统通过利用复杂的存储引擎来保证可靠性、一致性、高吞吐量等能力，从而定制化以满足一系列需求。在本教程中，我们将深入探讨Apache Cassandra使用的存储引擎的内部结构，它专为写入密集型工作负载设计，同时保持了良好的读取性能。 2. Log-Structured Merge-Tree (LS..."},"headers":[{"level":2,"title":"2. Log-Structured Merge-Tree (LSMT)","slug":"_2-log-structured-merge-tree-lsmt","link":"#_2-log-structured-merge-tree-lsmt","children":[]},{"level":2,"title":"3. MemTable","slug":"_3-memtable","link":"#_3-memtable","children":[]},{"level":2,"title":"4. Commit Log","slug":"_4-commit-log","link":"#_4-commit-log","children":[]},{"level":2,"title":"5. SSTable","slug":"_5-sstable","link":"#_5-sstable","children":[]},{"level":2,"title":"6. Sparse Index","slug":"_6-sparse-index","link":"#_6-sparse-index","children":[]},{"level":2,"title":"7. Bloom Filter","slug":"_7-bloom-filter","link":"#_7-bloom-filter","children":[]},{"level":2,"title":"8. Compaction","slug":"_8-compaction","link":"#_8-compaction","children":[]},{"level":2,"title":"9. Conclusion","slug":"_9-conclusion","link":"#_9-conclusion","children":[]}],"git":{"createdTime":1720946937000,"updatedTime":1720946937000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":6.57,"words":1972},"filePathRelative":"posts/baeldung/2024-07-14/2024-07-14-Guide to the Storage Engine in Apache Cassandra.md","localizedDate":"2022年9月1日","excerpt":"<hr>\\n<h1>Apache Cassandra存储引擎指南</h1>\\n<p>现代数据库系统通过利用复杂的存储引擎来保证可靠性、一致性、高吞吐量等能力，从而定制化以满足一系列需求。在本教程中，我们将深入探讨Apache Cassandra使用的存储引擎的内部结构，它专为写入密集型工作负载设计，同时保持了良好的读取性能。</p>\\n<h2>2. Log-Structured Merge-Tree (LSMT)</h2>\\n<p>Apache Cassandra利用基于两层Log-Structured Merge-Tree（LSMT）的数据结构进行存储。在高层次上，LSM树有两个类似树的组件，一个是内存缓存组件（C0）和一个磁盘组件（C1）：</p>","autoDesc":true}');export{h as comp,m as data};
