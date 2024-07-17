import{_ as o}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as n,a as e}from"./app-yRPSFQJx.js";const r={},a=e('<h1 id="mongo-经验总结分享" tabindex="-1"><a class="header-anchor" href="#mongo-经验总结分享"><span>Mongo 经验总结分享</span></a></h1><h2 id="mongodb-基础" tabindex="-1"><a class="header-anchor" href="#mongodb-基础"><span>MongoDB 基础</span></a></h2><h3 id="mongodb-是什么" tabindex="-1"><a class="header-anchor" href="#mongodb-是什么"><span>MongoDB 是什么？</span></a></h3><p>MongoDB 是一个基于 <strong>分布式文件存储</strong> 的开源 NoSQL 数据库系统，由 <strong>C++</strong> 编写的。MongoDB 提供了 <strong>面向文档</strong> 的存储方式，操作起来比较简单和容易，支持“<strong>无模式</strong>”的数据建模，可以存储比较复杂的数据类型，是一款非常流行的 <strong>文档类型数据库</strong> 。</p><p>在高负载的情况下，MongoDB 天然支持水平扩展和高可用，可以很方便地添加更多的节点/实例，以保证服务性能和可用性。在许多场景下，MongoDB 可以用于代替传统的关系型数据库或键/值存储方式，皆在为 Web 应用提供可扩展的高可用高性能数据存储解决方案。</p><h3 id="mongodb-的存储结构是什么" tabindex="-1"><a class="header-anchor" href="#mongodb-的存储结构是什么"><span>MongoDB 的存储结构是什么？</span></a></h3><p>MongoDB 的存储结构区别于传统的关系型数据库，主要由如下三个单元组成：</p><ul><li><strong>文档（Document）</strong>：MongoDB 中最基本的单元，由 BSON 键值对（key-value）组成，类似于关系型数据库中的行（Row）。</li><li><strong>集合（Collection）</strong>：一个集合可以包含多个文档，类似于关系型数据库中的表（Table）。</li><li><strong>数据库（Database）</strong>：一个数据库中可以包含多个集合，可以在 MongoDB 中创建多个数据库，类似于关系型数据库中的数据库（Database）。</li></ul><p>也就是说，MongoDB 将数据记录存储为文档 （更具体来说是<a href="https://www.mongodb.com/docs/manual/core/document/#std-label-bson-document-format" target="_blank" rel="noopener noreferrer">BSON 文档</a>），这些文档在集合中聚集在一起，数据库中存储一个或多个文档集合。</p><p><strong>SQL 与 MongoDB 常见术语对比</strong>：</p><table><thead><tr><th>SQL</th><th>MongoDB</th></tr></thead><tbody><tr><td>表（Table）</td><td>集合（Collection）</td></tr><tr><td>行（Row）</td><td>文档（Document）</td></tr><tr><td>列（Col）</td><td>字段（Field）</td></tr><tr><td>主键（Primary Key）</td><td>对象 ID（Objectid）</td></tr><tr><td>索引（Index）</td><td>索引（Index）</td></tr><tr><td>嵌套表（Embedded Table）</td><td>嵌入式文档（Embedded Document）</td></tr><tr><td>数组（Array）</td><td>数组（Array）</td></tr></tbody></table><h4 id="文档" tabindex="-1"><a class="header-anchor" href="#文档"><span>文档</span></a></h4><p>MongoDB 中的记录就是一个 BSON 文档，它是由键值对组成的数据结构，类似于 JSON 对象，是 MongoDB 中的基本数据单元。字段的值可能包括其他文档、数组和文档数组。</p><figure><img src="https://github.com/Kahen/kahen.github.io/blob/master/crud-annotated-document..png?raw=true" alt="MongoDB 文档" tabindex="0" loading="lazy"><figcaption>MongoDB 文档</figcaption></figure><p>文档的键是字符串。除了少数例外情况，键可以使用任意 UTF-8 字符。</p><ul><li>键不能含有 <code>\\0</code>(空字符）。这个字符用来表示键的结尾。</li><li><code>.</code> 和 <code>$</code> 有特别的意义，只有在特定环境下才能使用。</li><li>以下划线 <code>_</code>开头的键是保留的(不是严格要求的)。</li></ul><h4 id="集合" tabindex="-1"><a class="header-anchor" href="#集合"><span>集合</span></a></h4><p>MongoDB 集合存在于数据库中，<strong>没有固定的结构</strong>，也就是 <strong>无模式</strong> 的，这意味着可以往集合插入不同格式和类型的数据。不过，通常情况下，插入集合中的数据都会有一定的关联性。</p><figure><img src="https://github.com/Kahen/kahen.github.io/blob/master/crud-annotated-collection.png?raw=true" alt="MongoDB 集合" tabindex="0" loading="lazy"><figcaption>MongoDB 集合</figcaption></figure><p>集合不需要事先创建，当第一个文档插入或者第一个索引创建时，如果该集合不存在，则会创建一个新的集合。</p><p>集合名可以是满足下列条件的任意 UTF-8 字符串：</p><ul><li>集合名不能是空字符串 <code>&quot;&quot;</code>。</li><li>集合名不能含有 <code>\\0</code> （空字符)，这个字符表示集合名的结尾。</li><li>集合名不能以&quot;system.&quot;开头，这是为系统集合保留的前缀。例如 <code>system.users</code> 这个集合保存着数据库的用户信息，<code>system.namespaces</code> 集合保存着所有数据库集合的信息。</li><li>集合名必须以下划线或者字母符号开始，并且不能包含 <code>$</code>。</li></ul><h3 id="mongodb-有什么特点" tabindex="-1"><a class="header-anchor" href="#mongodb-有什么特点"><span>MongoDB 有什么特点？</span></a></h3><ul><li><strong>数据记录被存储为文档</strong>：MongoDB 中的记录就是一个 BSON 文档，它是由键值对组成的数据结构，类似于 JSON 对象，是 MongoDB 中的基本数据单元。</li><li><strong>模式自由</strong>：集合的概念类似 MySQL 里的表，但它不需要定义任何模式，能够用更少的数据对象表现复杂的领域模型对象。</li><li><strong>支持多种查询方式</strong>：MongoDB 查询 API 支持读写操作 (CRUD)以及数据聚合、文本搜索和地理空间查询。</li><li><strong>支持 ACID 事务</strong>：NoSQL 数据库通常不支持事务，为了可扩展和高性能进行了权衡。不过，也有例外，MongoDB 就支持事务。与关系型数据库一样，MongoDB 事务同样具有 ACID 特性。MongoDB 单文档原生支持原子性，也具备事务的特性。MongoDB 4.0 加入了对多文档事务的支持，但只支持复制集部署模式下的事务，也就是说事务的作用域限制为一个副本集内。MongoDB 4.2 引入了分布式事务，增加了对分片集群上多文档事务的支持，并合并了对副本集上多文档事务的现有支持。</li><li><strong>高效的二进制存储</strong>：存储在集合中的文档，是以键值对的形式存在的。键用于唯一标识一个文档，一般是 ObjectId 类型，值是以 BSON 形式存在的。BSON = Binary JSON， 是在 JSON 基础上加了一些类型及元数据描述的格式。</li><li><strong>自带数据压缩功能</strong>：存储同样的数据所需的资源更少。</li><li><strong>支持多种类型的索引</strong>：MongoDB 支持多种类型的索引，包括单字段索引、复合索引、多键索引、哈希索引、文本索引、 地理位置索引等，每种类型的索引有不同的使用场合。</li><li><strong>支持 failover</strong>：提供自动故障恢复的功能，主节点发生故障时，自动从从节点中选举出一个新的主节点，确保集群的正常使用，这对于客户端来说是无感知的。</li><li><strong>支持分片集群</strong>：MongoDB 支持集群自动切分数据，让集群存储更多的数据，具备更强的性能。在数据插入和更新时，能够自动路由和存储。</li><li><strong>支持存储大文件</strong>：MongoDB 的单文档存储空间要求不超过 16MB。对于超过 16MB 的大文件，MongoDB 提供了 GridFS 来进行存储，通过 GridFS，可以将大型数据进行分块处理，然后将这些切分后的小文档保存在数据库中。</li></ul><h3 id="mongodb-对比-mysql-的优势" tabindex="-1"><a class="header-anchor" href="#mongodb-对比-mysql-的优势"><span>MongoDB 对比 MySQL 的优势</span></a></h3><ol><li>MongoDB使用类似JSON的BSON文档表示，可以灵活地添加、删除和修改字段，并且与关系型数据库一样拥有索引支持和ACID属性</li><li>拓展性强，MongoDB天生支持水平扩展，可以通过分片技术将数据分布在多个节点上，以支持大规模数据和高并发访问</li><li>高可用性，支持自动将数据复制到其他节点，系统出现故障自动完成，官方文档说通常不到5秒</li><li>非结构化数据支持：MongoDB适用于存储非结构化或半结构化数据，例如<strong>日志</strong>、地理位置数据、图像、视频等，而MySQL更适合结构化数据和复杂的关系型数据。</li><li>查询速度上，MongoDB通常将相关数据存储在一起，检索单个文档通常比MySQL多个表JOIN数据快</li></ol><h3 id="mongodb-适合什么应用场景" tabindex="-1"><a class="header-anchor" href="#mongodb-适合什么应用场景"><span>MongoDB 适合什么应用场景？</span></a></h3><p><strong>MongoDB 的优势在于其数据模型和存储引擎的灵活性、架构的可扩展性以及对强大的索引支持。</strong></p><p>选用 MongoDB 应该充分考虑 MongoDB 的优势，结合实际项目的需求来决定：</p><ul><li>随着项目的发展，使用类 JSON 格式（BSON）保存数据是否满足项目需求？MongoDB 中的记录就是一个 BSON 文档，它是由键值对组成的数据结构，类似于 JSON 对象，是 MongoDB 中的基本数据单元。</li><li>是否需要大数据量的存储？是否需要快速水平扩展？MongoDB 支持分片集群，可以很方便地添加更多的节点（实例），让集群存储更多的数据，具备更强的性能。</li><li>是否需要更多类型索引来满足更多应用场景？MongoDB 支持多种类型的索引，包括单字段索引、复合索引、多键索引、哈希索引、文本索引、 地理位置索引等，每种类型的索引有不同的使用场合。</li></ul><hr><h3 id="参考链接" tabindex="-1"><a class="header-anchor" href="#参考链接"><span>参考链接：</span></a></h3><ul><li><a href="https://www.mongodb.com/docs/manual/introduction/#introduction-to-mongodb" target="_blank" rel="noopener noreferrer">Introduction to MongoDB ： https://www.mongodb.com/docs/manual/introduction/#introduction-to-mongodb</a></li><li><a href="https://www.mongodb.com/zh-cn/compare/mongodb-mysql" target="_blank" rel="noopener noreferrer">比较 MongoDB 与 MySQL：https://www.mongodb.com/compare/mongodb-mysql</a></li><li><a href="https://developer.aliyun.com/article/64352" target="_blank" rel="noopener noreferrer">什么场景应该用 MongoDB ？：https://developer.aliyun.com/article/64352 </a></li><li><a href="https://mongoing.com/topic/archives-35143" target="_blank" rel="noopener noreferrer">WiredTiger存储引擎之一：基础数据结构分析：https://mongoing.com/topic/archives-35143</a></li><li><a href="https://cloud.tencent.com/developer/article/1784274" target="_blank" rel="noopener noreferrer">非关系型数据库（NOSQL）和关系型数据库（SQL）区别详解：https://cloud.tencent.com/developer/article/1784274</a></li><li><a href="https://fatedeity.cn/posts/database/mongodb-index-knowledge.html" target="_blank" rel="noopener noreferrer">MongoDB - 索引知识：https://fatedeity.cn/posts/database/mongodb-index-knowledge.html</a></li></ul>',33),g=[a];function l(i,d){return n(),t("div",null,g)}const h=o(r,[["render",l],["__file","mongo-share.html.vue"]]),p=JSON.parse('{"path":"/posts/articles/mongo-share.html","title":"Mongo 经验总结分享","lang":"zh-CN","frontmatter":{"description":"Mongo 经验总结分享 MongoDB 基础 MongoDB 是什么？ MongoDB 是一个基于 分布式文件存储 的开源 NoSQL 数据库系统，由 C++ 编写的。MongoDB 提供了 面向文档 的存储方式，操作起来比较简单和容易，支持“无模式”的数据建模，可以存储比较复杂的数据类型，是一款非常流行的 文档类型数据库 。 在高负载的情况下，Mo...","head":[["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/articles/mongo-share.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Mongo 经验总结分享"}],["meta",{"property":"og:description","content":"Mongo 经验总结分享 MongoDB 基础 MongoDB 是什么？ MongoDB 是一个基于 分布式文件存储 的开源 NoSQL 数据库系统，由 C++ 编写的。MongoDB 提供了 面向文档 的存储方式，操作起来比较简单和容易，支持“无模式”的数据建模，可以存储比较复杂的数据类型，是一款非常流行的 文档类型数据库 。 在高负载的情况下，Mo..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://github.com/Kahen/kahen.github.io/blob/master/crud-annotated-document..png?raw=true"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-13T02:37:42.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:modified_time","content":"2024-06-13T02:37:42.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Mongo 经验总结分享\\",\\"image\\":[\\"https://github.com/Kahen/kahen.github.io/blob/master/crud-annotated-document..png?raw=true\\",\\"https://github.com/Kahen/kahen.github.io/blob/master/crud-annotated-collection.png?raw=true\\"],\\"dateModified\\":\\"2024-06-13T02:37:42.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]]},"headers":[{"level":2,"title":"MongoDB 基础","slug":"mongodb-基础","link":"#mongodb-基础","children":[{"level":3,"title":"MongoDB 是什么？","slug":"mongodb-是什么","link":"#mongodb-是什么","children":[]},{"level":3,"title":"MongoDB 的存储结构是什么？","slug":"mongodb-的存储结构是什么","link":"#mongodb-的存储结构是什么","children":[]},{"level":3,"title":"MongoDB 有什么特点？","slug":"mongodb-有什么特点","link":"#mongodb-有什么特点","children":[]},{"level":3,"title":"MongoDB 对比 MySQL 的优势","slug":"mongodb-对比-mysql-的优势","link":"#mongodb-对比-mysql-的优势","children":[]},{"level":3,"title":"MongoDB 适合什么应用场景？","slug":"mongodb-适合什么应用场景","link":"#mongodb-适合什么应用场景","children":[]},{"level":3,"title":"参考链接：","slug":"参考链接","link":"#参考链接","children":[]}]}],"git":{"createdTime":1718246262000,"updatedTime":1718246262000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":7.2,"words":2159},"filePathRelative":"posts/articles/mongo-share.md","localizedDate":"2024年6月13日","excerpt":"\\n<h2>MongoDB 基础</h2>\\n<h3>MongoDB 是什么？</h3>\\n<p>MongoDB 是一个基于 <strong>分布式文件存储</strong> 的开源 NoSQL 数据库系统，由 <strong>C++</strong> 编写的。MongoDB 提供了 <strong>面向文档</strong> 的存储方式，操作起来比较简单和容易，支持“<strong>无模式</strong>”的数据建模，可以存储比较复杂的数据类型，是一款非常流行的 <strong>文档类型数据库</strong> 。</p>\\n<p>在高负载的情况下，MongoDB 天然支持水平扩展和高可用，可以很方便地添加更多的节点/实例，以保证服务性能和可用性。在许多场景下，MongoDB 可以用于代替传统的关系型数据库或键/值存储方式，皆在为 Web 应用提供可扩展的高可用高性能数据存储解决方案。</p>","autoDesc":true}');export{h as comp,p as data};
