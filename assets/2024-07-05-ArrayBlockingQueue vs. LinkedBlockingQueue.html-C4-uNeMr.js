import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as n,a as i}from"./app-BEVMBw2k.js";const u={},a=i('<h1 id="java中的arrayblockingqueue与linkedblockingqueue对比" tabindex="-1"><a class="header-anchor" href="#java中的arrayblockingqueue与linkedblockingqueue对比"><span>Java中的ArrayBlockingQueue与LinkedBlockingQueue对比</span></a></h1><ol><li>概述</li></ol><p>Java的_BlockingQueue_接口表示一个线程安全的队列。如果队列满了，尝试向队列中添加元素的线程会被阻塞。如果队列为空，尝试从队列中取出元素的线程也会被阻塞。</p><p>BlockingQueue有多种实现，如_ArrayBlockingQueue_、<em>LinkedBlockingQueue</em>、<em>SynchronousQueue</em>、<em>PriorityBlockingQueue</em>。</p><p>在本教程中，我们将探讨_ArrayBlockingQueue_和_LinkedBlockingQueue_之间的差异。</p><p>_ArrayBlockingQueue_是一个有界队列。它内部使用数组。在创建实例时，我们可以指定数组的大小。</p><p>下面代码片段展示了如何创建一个_ArrayBlockingQueue_对象。我们指定内部数组的大小为_10_：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>int INIT_CAPACITY = 10;\n\nBlockingQueue``&lt;String&gt;`` arrayBlockingQueue = new ArrayBlockingQueue&lt;&gt;(INIT_CAPACITY, true);\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们在队列已满的情况下插入超过定义容量的元素，那么添加操作将抛出_IllegalStateException_。同样，如果我们将初始大小设置为小于_1_，我们将得到_IllegalArgumentException_。</p><p>**这里的第二个参数代表公平性策略。**我们可以选择设置公平性策略以保持阻塞的生产者和消费者线程的顺序。它允许按FIFO顺序访问队列的阻塞线程。因此，首先进入等待状态的线程将首先获得访问队列的机会。这有助于避免线程饥饿。</p><ol start="3"><li><em>LinkedBlockingQueue</em></li></ol><p>_LinkedBlockingQueue_是一个可选有界的_BlockingQueue_实现。它由链接节点支持。</p><p><strong>在创建实例时，我们也可以指定容量。如果没有指定，则将_Integer.MAX_VALUE_设置为容量。</strong></p><p>插入元素时，链接节点会动态创建。</p><p>让我们看看如何创建一个_LinkedBlockingQueue_：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>BlockingQueue``&lt;String&gt;`` linkedBlockingQueue = new LinkedBlockingQueue&lt;&gt;();\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="4"><li>_ArrayBlockingQueue_与_LinkedBlockingQueue_的比较</li></ol><p>尽管_ArrayBlockingQueue_和_LinkedBlockingQueue_都是_BlockingQueue_的实现，并且以FIFO顺序存储元素，但它们之间存在某些差异。现在我们将看看这些差异：</p><table><thead><tr><th>特性</th><th>ArrayBlockingQueue</th><th>LinkedBlockingQueue</th></tr></thead><tbody><tr><td>实现</td><td>由数组支持</td><td>使用链接节点</td></tr><tr><td>队列大小</td><td>它是一个有界队列。因此，在创建时必须指定初始容量。</td><td>不必须指定大小。</td></tr><tr><td>公平性策略</td><td>可以在其中设置公平性策略</td><td>没有设置公平性策略的选项</td></tr><tr><td>锁的数量</td><td>使用一个_ReentrantLock_。同一把锁用于put和take操作。</td><td>为读写操作使用单独的_ReentrantLock_。这防止了生产者和消费者线程之间的争用。</td></tr><tr><td>内存空间</td><td>由于必须在其中指定初始容量，我们可能会分配比所需更多的空间。</td><td>通常不预先分配节点。因此，其内存占用与其大小相匹</td></tr></tbody></table><ol start="5"><li>结论</li></ol><p>在本文中，我们了解了_ArrayBlockingQueue_和_LinkedBlockingQueue_之间的差异。_ArrayBlockingQueue_由数组支持，而_LinkedBlockingQueue_由链接节点支持。我们还涉及了_ArrayBlockingQueue_中存在的公平性策略的额外特性，以及两种队列的锁定机制和内存占用。</p><p>像往常一样，示例的源代码可以在GitHub上找到。</p><p>OK</p>',23),o=[a];function r(l,c){return n(),t("div",null,o)}const k=e(u,[["render",r],["__file","2024-07-05-ArrayBlockingQueue vs. LinkedBlockingQueue.html.vue"]]),p=JSON.parse('{"path":"/posts/baeldung/2024-07-05/2024-07-05-ArrayBlockingQueue%20vs.%20LinkedBlockingQueue.html","title":"Java中的ArrayBlockingQueue与LinkedBlockingQueue对比","lang":"zh-CN","frontmatter":{"date":"2024-07-06T00:00:00.000Z","category":["Java","Concurrency"],"tag":["ArrayBlockingQueue","LinkedBlockingQueue"],"head":[["meta",{"name":"keywords","content":"Java, BlockingQueue, ArrayBlockingQueue, LinkedBlockingQueue, concurrency, thread safety"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-05/2024-07-05-ArrayBlockingQueue%20vs.%20LinkedBlockingQueue.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中的ArrayBlockingQueue与LinkedBlockingQueue对比"}],["meta",{"property":"og:description","content":"Java中的ArrayBlockingQueue与LinkedBlockingQueue对比 概述 Java的_BlockingQueue_接口表示一个线程安全的队列。如果队列满了，尝试向队列中添加元素的线程会被阻塞。如果队列为空，尝试从队列中取出元素的线程也会被阻塞。 BlockingQueue有多种实现，如_ArrayBlockingQueue_、..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-05T21:32:17.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"ArrayBlockingQueue"}],["meta",{"property":"article:tag","content":"LinkedBlockingQueue"}],["meta",{"property":"article:published_time","content":"2024-07-06T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-05T21:32:17.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中的ArrayBlockingQueue与LinkedBlockingQueue对比\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-06T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-05T21:32:17.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中的ArrayBlockingQueue与LinkedBlockingQueue对比 概述 Java的_BlockingQueue_接口表示一个线程安全的队列。如果队列满了，尝试向队列中添加元素的线程会被阻塞。如果队列为空，尝试从队列中取出元素的线程也会被阻塞。 BlockingQueue有多种实现，如_ArrayBlockingQueue_、..."},"headers":[],"git":{"createdTime":1720215137000,"updatedTime":1720215137000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.52,"words":757},"filePathRelative":"posts/baeldung/2024-07-05/2024-07-05-ArrayBlockingQueue vs. LinkedBlockingQueue.md","localizedDate":"2024年7月6日","excerpt":"\\n<ol>\\n<li>概述</li>\\n</ol>\\n<p>Java的_BlockingQueue_接口表示一个线程安全的队列。如果队列满了，尝试向队列中添加元素的线程会被阻塞。如果队列为空，尝试从队列中取出元素的线程也会被阻塞。</p>\\n<p>BlockingQueue有多种实现，如_ArrayBlockingQueue_、<em>LinkedBlockingQueue</em>、<em>SynchronousQueue</em>、<em>PriorityBlockingQueue</em>。</p>\\n<p>在本教程中，我们将探讨_ArrayBlockingQueue_和_LinkedBlockingQueue_之间的差异。</p>","autoDesc":true}');export{k as comp,p as data};
