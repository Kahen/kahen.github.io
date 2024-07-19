import{_ as t}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as e,o as a,a as n}from"./app-D5kFWV-m.js";const d={},i=n('<h1 id="如何在java中选择合适的集合" tabindex="-1"><a class="header-anchor" href="#如何在java中选择合适的集合"><span>如何在Java中选择合适的集合</span></a></h1><p>在本教程中，我们将讨论如何在Java库中选择适当的集合接口和类。我们跳过了诸如_Vector_、_Stack_和_Hashtable_等遗留集合，因为我们需要避免使用它们，而转而使用新的集合。并发集合值得单独讨论，因此我们也不在此讨论它们。</p><h2 id="_2-java库中的集合接口" tabindex="-1"><a class="header-anchor" href="#_2-java库中的集合接口"><span>2. Java库中的集合接口</span></a></h2><p>在尝试有效使用它们之前，了解Java库中集合接口和类的组织结构非常有用。_Collection_接口是所有集合接口的根。<em>List</em>、<em>Set_和_Queue_接口扩展了_Collection</em>。</p><p>在Java库中，映射（Maps）不被视为常规集合，因此_Map_接口不扩展_Collection_。这是Java库中接口关系的图表：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/11/1-1.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>任何具体的集合实现（集合类）都是从集合接口派生的。集合类的语义由它们的接口定义，因为具体的集合为它们父接口定义的操作提供了具体的实现。因此，我们需要在选择适当的集合类之前，先选择正确的集合接口。</p><h2 id="_3-选择正确的集合接口" tabindex="-1"><a class="header-anchor" href="#_3-选择正确的集合接口"><span>3. 选择正确的集合接口</span></a></h2><p>选择正确的集合接口是相对直接的。实际上，下面的图表显示了一个逻辑接口选择流程：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/11/Interface-Selection-Diagram-1.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>总结来说，当元素的插入顺序很重要并且有重复元素时，我们使用列表（lists）。当元素被视为一组对象，没有重复项，且插入顺序不重要时，我们使用集合（sets）。</p><p>队列（queues）用于需要_LIFO_（后进先出）、<em>FIFO</em>（先进先出）或按优先级移除语义的情况，最后，当需要键值对关联时，我们使用映射（maps）。</p><h2 id="_4-选择正确的集合实现" tabindex="-1"><a class="header-anchor" href="#_4-选择正确的集合实现"><span>4. 选择正确的集合实现</span></a></h2><p>下面我们可以找到按它们实现的接口分类的集合类的比较表。比较是基于常见操作及其性能进行的。具体来说，操作的性能是使用大O符号估计的。可以在Java集合操作的基准测试中找到更实用的操作持续时间指南。</p><h3 id="_4-1-列表" tabindex="-1"><a class="header-anchor" href="#_4-1-列表"><span>4.1. 列表</span></a></h3><p>让我们从列表比较表开始。列表的常见操作包括添加和删除元素、通过索引访问元素、遍历元素和查找元素：</p><table><thead><tr><th>列表比较表</th><th>在开头添加/删除元素</th><th>在中间添加/删除元素</th><th>在末尾添加/删除元素</th><th>获取第i个元素（随机访问）</th><th>查找元素</th><th>遍历顺序</th></tr></thead><tbody><tr><td><em>ArrayList</em></td><td><em>O(n)</em></td><td><em>O(n)</em></td><td><em>O(1)</em></td><td><em>O(1)</em></td><td><em>O(n)</em>, 如果排序了则为_O(log(n))_</td><td>按插入顺序</td></tr><tr><td><em>LinkedList</em></td><td><em>O(1)</em></td><td><em>O(1)</em></td><td><em>O(1)</em></td><td><em>O(n)</em></td><td><em>O(n)</em></td><td>按插入顺序</td></tr></tbody></table><p>如我们所见，_ArrayList_擅长在末尾添加和删除元素，以及具有对元素的随机访问。相反，它不擅长在任意位置添加和删除元素。同时，_LinkedList_擅长在任何位置添加和删除元素。然而，它不支持真正的_O(1)<em>随机访问。所以，关于列表，除非我们需要在任何位置快速添加和删除元素，否则默认选择是_ArrayList</em>。</p><h3 id="_4-2-集合" tabindex="-1"><a class="header-anchor" href="#_4-2-集合"><span>4.2. 集合</span></a></h3><p>对于集合，我们感兴趣的是添加和删除元素、遍历元素和查找元素：</p><table><thead><tr><th>集合比较表</th><th>添加元素</th><th>删除元素</th><th>查找元素</th><th>遍历顺序</th></tr></thead><tbody><tr><td><em>HashSet</em></td><td>平均_O(1)_</td><td>平均_O(1)_</td><td><em>O(1)</em></td><td>随机，由哈希函数分散</td></tr><tr><td><em>LinkedHashSet</em></td><td>平均_O(1)_</td><td>平均_O(1)_</td><td><em>O(1)</em></td><td>按插入顺序</td></tr><tr><td><em>TreeSet</em></td><td><em>O(log(n))</em></td><td><em>O(log(n))</em></td><td><em>O(log(n))</em></td><td>排序，根据元素比较标准</td></tr><tr><td><em>EnumSet</em></td><td><em>O(1)</em></td><td><em>O(1)</em></td><td><em>O(1)</em></td><td>根据枚举值的定义顺序</td></tr></tbody></table><p>如我们所见，默认选择是_HashSet_集合，因为它在所有支持的操作中都非常快。此外，如果元素的插入顺序也很重要，我们选择_LinkedHashSet_。它基本上是_HashSet_的扩展，通过使用内部的链表结构来跟踪元素的插入顺序。</p><p>如果需要元素被排序，并且在添加和删除元素时需要保持排序顺序，那么我们应该选择_TreeSet_。</p><p>如果集合中的元素只是单个枚举类型的枚举值，那么最明智的选择是_EnumSet_。</p><h3 id="_4-3-队列" tabindex="-1"><a class="header-anchor" href="#_4-3-队列"><span>4.3. 队列</span></a></h3><p>队列可以分为两组：</p><ol><li><em>LinkedList</em>, <em>ArrayDeque</em> – 队列接口的实现可以作为栈、队列和双端队列数据结构。通常，_ArrayDeque_比_LinkedList_更快。因此它是默认选择。</li><li><em>PriorityQueue</em> – 队列接口的实现，由二叉堆数据结构支持。用于快速（<em>O(1)</em>）检索具有最高优先级的元素。添加和删除操作在_O(log(n))_时间内完成。</li></ol><h3 id="_4-4-映射" tabindex="-1"><a class="header-anchor" href="#_4-4-映射"><span>4.4. 映射</span></a></h3><p>与集合类似，我们考虑映射的操作：添加和删除元素、遍历元素和查找元素：</p><table><thead><tr><th>映射比较表</th><th>添加元素</th><th>删除元素</th><th>查找元素</th><th>遍历顺序</th></tr></thead><tbody><tr><td><em>HashMap</em></td><td>平均_O(1)_</td><td>平均_O(1)_</td><td><em>O(1)</em></td><td>随机，由哈希函数分散</td></tr><tr><td><em>LinkedHashMap</em></td><td>平均_O(1)_</td><td>平均_O(1)_</td><td><em>O(1)</em></td><td>按插入顺序</td></tr><tr><td><em>TreeMap</em></td><td><em>O(log(n))</em></td><td><em>O(log(n))</em></td><td><em>O(log(n))</em></td><td>排序，根据元素比较标准</td></tr><tr><td><em>EnumMap</em></td><td><em>O(1)</em></td><td><em>O(1)</em></td><td><em>O(1)</em></td><td>根据枚举值的定义顺序</td></tr></tbody></table><p>映射的选择逻辑与集合的选择逻辑类似：我们默认使用_HashMap_，如果插入顺序也很重要，则使用_LinkedHashMap_，排序时使用_TreeMap_，当键属于特定枚举类型的值时使用_EnumMap_。</p><p>最后，有两个_Map_接口的实现具有非常特定的应用：<em>IdentityHashMap_和_WeakHashMap</em>。</p><h2 id="_5-具体集合选择图表" tabindex="-1"><a class="header-anchor" href="#_5-具体集合选择图表"><span>5. 具体集合选择图表</span></a></h2><p>我们可以扩展选择适当集合接口的图表，以选择具体的集合实现：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/11/Concrete-Collection-Selection-Diagram.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们了解了Java库中的集合接口和集合类。此外，我们提出了选择正确接口和实现的方法。</p>',37),o=[i];function l(r,p){return a(),e("div",null,o)}const _=t(d,[["render",l],["__file","2024-07-11-Choosing the Right Java Collection.html.vue"]]),s=JSON.parse('{"path":"/posts/baeldung/2024-07-11/2024-07-11-Choosing%20the%20Right%20Java%20Collection.html","title":"如何在Java中选择合适的集合","lang":"zh-CN","frontmatter":{"date":"2022-11-01T00:00:00.000Z","category":["Java","Collections"],"tag":["Java","List","Set","Queue","Map"],"head":[["meta",{"name":"keywords","content":"Java Collection, List, Set, Queue, Map"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-11/2024-07-11-Choosing%20the%20Right%20Java%20Collection.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"如何在Java中选择合适的集合"}],["meta",{"property":"og:description","content":"如何在Java中选择合适的集合 在本教程中，我们将讨论如何在Java库中选择适当的集合接口和类。我们跳过了诸如_Vector_、_Stack_和_Hashtable_等遗留集合，因为我们需要避免使用它们，而转而使用新的集合。并发集合值得单独讨论，因此我们也不在此讨论它们。 2. Java库中的集合接口 在尝试有效使用它们之前，了解Java库中集合接口和..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2022/11/1-1.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-12T00:02:36.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"List"}],["meta",{"property":"article:tag","content":"Set"}],["meta",{"property":"article:tag","content":"Queue"}],["meta",{"property":"article:tag","content":"Map"}],["meta",{"property":"article:published_time","content":"2022-11-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-12T00:02:36.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"如何在Java中选择合适的集合\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2022/11/1-1.png\\",\\"https://www.baeldung.com/wp-content/uploads/2022/11/Interface-Selection-Diagram-1.png\\",\\"https://www.baeldung.com/wp-content/uploads/2022/11/Concrete-Collection-Selection-Diagram.png\\"],\\"datePublished\\":\\"2022-11-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-12T00:02:36.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"如何在Java中选择合适的集合 在本教程中，我们将讨论如何在Java库中选择适当的集合接口和类。我们跳过了诸如_Vector_、_Stack_和_Hashtable_等遗留集合，因为我们需要避免使用它们，而转而使用新的集合。并发集合值得单独讨论，因此我们也不在此讨论它们。 2. Java库中的集合接口 在尝试有效使用它们之前，了解Java库中集合接口和..."},"headers":[{"level":2,"title":"2. Java库中的集合接口","slug":"_2-java库中的集合接口","link":"#_2-java库中的集合接口","children":[]},{"level":2,"title":"3. 选择正确的集合接口","slug":"_3-选择正确的集合接口","link":"#_3-选择正确的集合接口","children":[]},{"level":2,"title":"4. 选择正确的集合实现","slug":"_4-选择正确的集合实现","link":"#_4-选择正确的集合实现","children":[{"level":3,"title":"4.1. 列表","slug":"_4-1-列表","link":"#_4-1-列表","children":[]},{"level":3,"title":"4.2. 集合","slug":"_4-2-集合","link":"#_4-2-集合","children":[]},{"level":3,"title":"4.3. 队列","slug":"_4-3-队列","link":"#_4-3-队列","children":[]},{"level":3,"title":"4.4. 映射","slug":"_4-4-映射","link":"#_4-4-映射","children":[]}]},{"level":2,"title":"5. 具体集合选择图表","slug":"_5-具体集合选择图表","link":"#_5-具体集合选择图表","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1720742556000,"updatedTime":1720742556000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.13,"words":1540},"filePathRelative":"posts/baeldung/2024-07-11/2024-07-11-Choosing the Right Java Collection.md","localizedDate":"2022年11月1日","excerpt":"\\n<p>在本教程中，我们将讨论如何在Java库中选择适当的集合接口和类。我们跳过了诸如_Vector_、_Stack_和_Hashtable_等遗留集合，因为我们需要避免使用它们，而转而使用新的集合。并发集合值得单独讨论，因此我们也不在此讨论它们。</p>\\n<h2>2. Java库中的集合接口</h2>\\n<p>在尝试有效使用它们之前，了解Java库中集合接口和类的组织结构非常有用。_Collection_接口是所有集合接口的根。<em>List</em>、<em>Set_和_Queue_接口扩展了_Collection</em>。</p>\\n<p>在Java库中，映射（Maps）不被视为常规集合，因此_Map_接口不扩展_Collection_。这是Java库中接口关系的图表：</p>","autoDesc":true}');export{_ as comp,s as data};
