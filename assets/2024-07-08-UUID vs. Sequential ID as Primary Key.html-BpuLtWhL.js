import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as a,a as p}from"./app-on0L14Tx.js";const n={},r=p('<hr><h1 id="uuid与顺序id作为主键的比较" tabindex="-1"><a class="header-anchor" href="#uuid与顺序id作为主键的比较"><span>UUID与顺序ID作为主键的比较</span></a></h1><p>在本教程中，我们将探讨UUID和顺序ID作为主键的区别。</p><p>在设计数据库时，选择适当的主键格式对系统的性能、可扩展性和数据完整性至关重要。</p><p>数据库中的表必须有一个主键列，该列既唯一又不允许为空。这样，主键值就可以唯一地识别每一行。</p><p>在选择主键时的一个主要决策是使用UUID还是顺序ID。虽然两种方法都有其优缺点，但最佳选择取决于特定用例和系统的目标。</p><p><strong>根据RFC 4122标准定义，UUID（通用唯一识别码）表示一个128位的值。</strong></p><p>如今，大多数关系型数据库支持UUID类型：</p><ul><li>Oracle – RAW(16)类型</li><li>SQL Server – NEWID()函数</li><li>PostgreSQL – UUID类型</li><li>MySQL – BINARY(16)类型或UUID()函数</li></ul><p>然而，如果数据库不支持这种类型，我们应该将其定义为BINARY(16)类型。使用不同的类型（例如，CHAR(32)也可以工作，但它会占用额外且不必要的空间来存储值）。</p><p>现在，让我们来讨论使用UUID作为主键的优点和缺点。</p><h3 id="_2-1-分布式系统" tabindex="-1"><a class="header-anchor" href="#_2-1-分布式系统"><span>2.1. 分布式系统</span></a></h3><p>在与共享数据库的分布式系统一起工作时，UUID可以派上用场。</p><p><strong>使用UUID作为主键的主要目的是能够在分布式系统中共享数据。</strong></p><p>使用UUID作为主键，我们可以保证不会发生冲突，而且我们不需要创建一个中央协调系统来管理主键的唯一性。</p><p>此外，它还减少了数据库之间的集成复杂性。</p><p>分布式和NoSQL数据库依赖于UUID作为键（例如，MongoDB或CouchDB），而不是数值。</p><h3 id="_2-2-唯一性" tabindex="-1"><a class="header-anchor" href="#_2-2-唯一性"><span>2.2. 唯一性</span></a></h3><p><strong>UUID是全局唯一的。</strong> 换句话说，我们可以使用一个在表、数据库和系统之间都唯一的ID来标识数据库中的每条记录。这在动态添加或删除节点的分布式系统中尤为重要，因为它们之间的协调可能具有挑战性。冲突只存在于理论上。</p><p>此外，由于下一个值很难预测，它们提供了额外的安全性，因此几乎不可能让恶意用户猜测ID。另一方面，这样的用户可以很容易地猜测顺序ID的下一个值。</p><p>此外，它们不暴露有关业务数据的信息，因此我们可以安全地将它们用作URL路径的一部分。</p><h3 id="_2-3-生成值" tabindex="-1"><a class="header-anchor" href="#_2-3-生成值"><span>2.3. 生成值</span></a></h3><p>UUID的另一个优点是它可以由应用程序或数据库系统本身生成。</p><p>通常，当我们使用顺序ID时，我们依赖数据库系统来生成和递增主键值，而不是我们自己。否则，跟踪我们应该使用的下一个值将变得复杂。</p><p>然而，放弃生成顺序主键的责任也有一个缺点。我们只能在执行插入语句后才能得到新记录的实际值。</p><p>相反，我们可以在代码中自己生成UUID，而不是告诉数据库代表我们生成它。由于UUID是唯一的且不是顺序的，我们不必担心之前的值。</p><p>因此，我们可以立即拥有主键值。我们不需要等到插入查询执行。</p><h3 id="_2-4-内存使用" tabindex="-1"><a class="header-anchor" href="#_2-4-内存使用"><span>2.4. 内存使用</span></a></h3><p><strong>UUID是128位长，是BIGINT大小的两倍，是INTEGER类型的四倍。</strong></p><p>在关系型数据库中，我们通常使用BIGINT来存储数值标识符，使用UUID代替可能没有太大区别，因为它只是大了两倍。</p><p>然而，拥有一个大的主键可能会导致性能问题，特别是在选择查询和索引方面。</p><h3 id="_2-5-可读性" tabindex="-1"><a class="header-anchor" href="#_2-5-可读性"><span>2.5. 可读性</span></a></h3><p>UUID由32个十六进制数字组成，由四个短划线分隔，这使得它很难记住。</p><p>因此，UUID的表示可能不被认为是用户友好的，可能很难口头表达。它不容易阅读和记忆。</p><p>另一方面，顺序ID易于阅读和记忆。</p><p>然而，ID值本身是否适合人类阅读是值得怀疑的。</p><h3 id="_2-6-排序" tabindex="-1"><a class="header-anchor" href="#_2-6-排序"><span>2.6. 排序</span></a></h3><p><strong>另一个缺点是我们不能按自然顺序对UUID值进行排序。</strong></p><p>由于这个限制，我们可能被迫使用另一个列，例如创建时间戳，来获取有序的项目。因此，这可能会增加查询的执行时间。</p><h2 id="_3-顺序id" tabindex="-1"><a class="header-anchor" href="#_3-顺序id"><span>3. 顺序ID</span></a></h2><p>序列是一个在数据库中标识序列记录的唯一字母数字值。</p><p>此外，我们只能在序列中使用数值标识符，因为系统无法为UUID类型确定下一个序列值。</p><p><strong>通常更倾向于使用顺序ID而不是UUID，因为它们需要的空间更少。</strong></p><p>数据库引擎为顺序ID提供原生支持：</p><ul><li>PostgreSQL – SERIAL</li><li>SQL Server – IDENTITY</li><li>MySQL – AUTO_INCREMENT</li><li>SQLite – AUTOINCREMENT</li></ul><p>让我们看看使用顺序ID作为主键的优点和缺点。</p><h3 id="_3-1-可读性" tabindex="-1"><a class="header-anchor" href="#_3-1-可读性"><span>3.1. 可读性</span></a></h3><p><strong>与UUID值不同，数值标识符更简单易读易记。</strong></p><p>使用数值标识符，我们可以轻松地跟踪记录插入数据库的顺序。</p><p>此外，我们可以根据它们的ID快速识别记录之间的关系。</p><h3 id="_3-2-索引" tabindex="-1"><a class="header-anchor" href="#_3-2-索引"><span>3.2. 索引</span></a></h3><p>我们经常在主键和外键上使用索引来加速选择查询和连接。</p><p>一些数据库使用B+树结构进行索引，而其他数据库，如SQL和MySQL，使用聚集索引。</p><p>此外，UUID值的索引效果不佳。<strong>键越长，索引条目所需的内存就越多。</strong></p><p>此外，UUID的索引因子很低，因为它们的值是随机的。每次我们修改表时，索引都需要更新。这可能会影响我们系统的性能并使用不必要的内存。</p><p>此外，我们还可以在外键上对连接的表进行索引，这在处理UUID值时可能会对性能产生额外的打击。</p><h3 id="_3-3-批量操作" tabindex="-1"><a class="header-anchor" href="#_3-3-批量操作"><span>3.3. 批量操作</span></a></h3><p>批量操作指的是将多个数据库操作作为一个工作单元执行的过程。</p><p>使用顺序ID的批量操作效果更好的一个原因是顺序ID以可预测的顺序生成。多个数据库操作可以作为一个单一的批次执行，优化系统的性能。</p><p>主键值以可预测的顺序生成，新记录被添加到序列的末尾。这使得可以使用某些类型的查询，例如需要按主键排序的区间查询。</p><p>此外，顺序ID通常比UUID小，这可以通过减少所需的存储量来提高系统的性能。</p><p>然而，在使用顺序ID的分布式系统中，需要考虑序列中的间隙潜力。在这种情况下，使用UUID作为主键可能是更好的选择。</p><h3 id="_3-4-可预测性" tabindex="-1"><a class="header-anchor" href="#_3-4-可预测性"><span>3.4. 可预测性</span></a></h3><p>序列标识符遵循特定的结构，这使它们可预测。</p><p>这可能允许恶意用户读取他们不应该阅读的信息。</p><p>我们可能无意中暴露了一些私人数据和业务逻辑。例如，最后一个ID可能代表用户生成的发票总数，这可以揭示收入信息。</p><h3 id="_3-5-并发" tabindex="-1"><a class="header-anchor" href="#_3-5-并发"><span>3.5. 并发</span></a></h3><p>正如前面提到的，通过应用程序生成顺序ID会很复杂。要创建ID，我们需要查询数据库以找出下一个可用的值。</p><p>在分布式系统中，如果有多个系统正在将数据插入数据库，这通常意味着我们的数据可能会发生冲突。不同的系统可能会产生相同的键值。</p><p>为了解决这个问题，我们需要创建单独的服务来产生顺序值。此外，相同的服务将成为单点故障。</p><h3 id="_3-6-大小限制" tabindex="-1"><a class="header-anchor" href="#_3-6-大小限制"><span>3.6. 大小限制</span></a></h3><p><strong>最后，顺序ID限制了它们的大小。</strong> 尽管数值标识符的最大数量相当大，但耗尽数字是可能的。</p><p>如果我们使用INT类型作为主键，最终可能会达到最大数量（2,147,483,647），这将导致静默溢出错误。因此，我们最终可能会有负值作为主键。</p><h2 id="_4-uuid和顺序id之间的区别" tabindex="-1"><a class="header-anchor" href="#_4-uuid和顺序id之间的区别"><span>4. UUID和顺序ID之间的区别</span></a></h2><p>总之，下表显示了UUID和顺序ID之间的区别。</p><table><thead><tr><th>UUID</th><th>顺序ID</th></tr></thead><tbody><tr><td>占用128位</td><td>当涉及到BIGINT时占用64位，INT类型占用32位</td></tr><tr><td>冲突只存在于理论上</td><td>由于大小限制，冲突是可能的</td></tr><tr><td>在分布式系统中表现良好</td><td>需要有协调组件以避免重复值</td></tr><tr><td>得到NoSQL和分布式数据库的良好支持</td><td>不建议在NoSQL和分布式数据库中使用</td></tr><tr><td>不可预测</td><td>可预测</td></tr><tr><td>难以记忆和口头表达</td><td>易于阅读和记忆</td></tr></tbody></table><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本教程中，我们学习了UUID和顺序ID作为主键的区别。</p><p>总之，是否使用UUID或顺序ID作为主键取决于系统的特定用例和目标。</p><p>如果我们正在使用分布式系统并且需要全局唯一性，UUID可能是最佳选择。另一方面，如果我们有有限的内存使用量，并且执行SQL查询的性能至关重要，顺序ID可能是最佳选择。</p><p>最终，主键的选择应该基于对系统要求和限制的仔细评估。</p>',81),i=[r];function l(s,d){return a(),t("div",null,i)}const I=e(n,[["render",l],["__file","2024-07-08-UUID vs. Sequential ID as Primary Key.html.vue"]]),U=JSON.parse('{"path":"/posts/baeldung/2024-07-08/2024-07-08-UUID%20vs.%20Sequential%20ID%20as%20Primary%20Key.html","title":"UUID与顺序ID作为主键的比较","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Database","Programming"],"tag":["UUID","Primary Key","Database Design"],"head":[["meta",{"name":"keywords","content":"UUID, Sequential ID, Primary Key, Database, Uniqueness, Performance"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-08/2024-07-08-UUID%20vs.%20Sequential%20ID%20as%20Primary%20Key.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"UUID与顺序ID作为主键的比较"}],["meta",{"property":"og:description","content":"UUID与顺序ID作为主键的比较 在本教程中，我们将探讨UUID和顺序ID作为主键的区别。 在设计数据库时，选择适当的主键格式对系统的性能、可扩展性和数据完整性至关重要。 数据库中的表必须有一个主键列，该列既唯一又不允许为空。这样，主键值就可以唯一地识别每一行。 在选择主键时的一个主要决策是使用UUID还是顺序ID。虽然两种方法都有其优缺点，但最佳选择..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-08T07:59:25.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"UUID"}],["meta",{"property":"article:tag","content":"Primary Key"}],["meta",{"property":"article:tag","content":"Database Design"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-08T07:59:25.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"UUID与顺序ID作为主键的比较\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-08T07:59:25.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"UUID与顺序ID作为主键的比较 在本教程中，我们将探讨UUID和顺序ID作为主键的区别。 在设计数据库时，选择适当的主键格式对系统的性能、可扩展性和数据完整性至关重要。 数据库中的表必须有一个主键列，该列既唯一又不允许为空。这样，主键值就可以唯一地识别每一行。 在选择主键时的一个主要决策是使用UUID还是顺序ID。虽然两种方法都有其优缺点，但最佳选择..."},"headers":[{"level":3,"title":"2.1. 分布式系统","slug":"_2-1-分布式系统","link":"#_2-1-分布式系统","children":[]},{"level":3,"title":"2.2. 唯一性","slug":"_2-2-唯一性","link":"#_2-2-唯一性","children":[]},{"level":3,"title":"2.3. 生成值","slug":"_2-3-生成值","link":"#_2-3-生成值","children":[]},{"level":3,"title":"2.4. 内存使用","slug":"_2-4-内存使用","link":"#_2-4-内存使用","children":[]},{"level":3,"title":"2.5. 可读性","slug":"_2-5-可读性","link":"#_2-5-可读性","children":[]},{"level":3,"title":"2.6. 排序","slug":"_2-6-排序","link":"#_2-6-排序","children":[]},{"level":2,"title":"3. 顺序ID","slug":"_3-顺序id","link":"#_3-顺序id","children":[{"level":3,"title":"3.1. 可读性","slug":"_3-1-可读性","link":"#_3-1-可读性","children":[]},{"level":3,"title":"3.2. 索引","slug":"_3-2-索引","link":"#_3-2-索引","children":[]},{"level":3,"title":"3.3. 批量操作","slug":"_3-3-批量操作","link":"#_3-3-批量操作","children":[]},{"level":3,"title":"3.4. 可预测性","slug":"_3-4-可预测性","link":"#_3-4-可预测性","children":[]},{"level":3,"title":"3.5. 并发","slug":"_3-5-并发","link":"#_3-5-并发","children":[]},{"level":3,"title":"3.6. 大小限制","slug":"_3-6-大小限制","link":"#_3-6-大小限制","children":[]}]},{"level":2,"title":"4. UUID和顺序ID之间的区别","slug":"_4-uuid和顺序id之间的区别","link":"#_4-uuid和顺序id之间的区别","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720425565000,"updatedTime":1720425565000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":8,"words":2400},"filePathRelative":"posts/baeldung/2024-07-08/2024-07-08-UUID vs. Sequential ID as Primary Key.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>UUID与顺序ID作为主键的比较</h1>\\n<p>在本教程中，我们将探讨UUID和顺序ID作为主键的区别。</p>\\n<p>在设计数据库时，选择适当的主键格式对系统的性能、可扩展性和数据完整性至关重要。</p>\\n<p>数据库中的表必须有一个主键列，该列既唯一又不允许为空。这样，主键值就可以唯一地识别每一行。</p>\\n<p>在选择主键时的一个主要决策是使用UUID还是顺序ID。虽然两种方法都有其优缺点，但最佳选择取决于特定用例和系统的目标。</p>\\n<p><strong>根据RFC 4122标准定义，UUID（通用唯一识别码）表示一个128位的值。</strong></p>\\n<p>如今，大多数关系型数据库支持UUID类型：</p>","autoDesc":true}');export{I as comp,U as data};
