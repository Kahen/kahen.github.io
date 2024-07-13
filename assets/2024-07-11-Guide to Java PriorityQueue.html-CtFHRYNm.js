import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-DkA39C0B.js";const e={},p=t(`<h1 id="java优先队列指南" tabindex="-1"><a class="header-anchor" href="#java优先队列指南"><span>Java优先队列指南</span></a></h1><p>在这篇简短的教程中，我们将讨论Java优先队列的实现。首先，我们将看到标准用法，并展示一些通过自然顺序和逆序排序队列的示例。最后，我们将看到如何使用Java <em>Comparator</em> 定义自定义顺序。</p><h2 id="_2-java-util-priorityqueue" tabindex="-1"><a class="header-anchor" href="#_2-java-util-priorityqueue"><span><strong>2. java.util.PriorityQueue</strong></span></a></h2><p>java.util.PriorityQueue 类从JDK 1.5开始提供，它还包含其他 <em>AbstractQueue</em> 的实现。<strong>正如我们从它的名字可以推断的，我们使用 <em>PriorityQueue</em> 来维持给定集合中的一个定义好的顺序：队列的第一个元素（<em>head</em>）是根据我们指定的顺序来说最小的元素。</strong> 队列的每个检索操作（<em>poll</em>, <em>remove</em>, 或 <em>peek</em>）读取队列的头部。</p><p>在内部，<em>PriorityQueue</em> 依赖于一个对象数组。如果初始指定的容量（在JDK 17中默认为11）不足以存储所有项目，则此数组会自动调整大小。虽然给 <em>PriorityQueue</em> 一个初始容量不是必须的，但如果我们已经知道我们的 <em>collection</em> 的大小，我们可以避免自动调整大小，这会消耗我们最好节省的CPU周期。</p><p>在Javadoc中，它指定这个实现对入队和出队方法（<em>offer</em>, <em>poll</em>, <em>remove</em> 和 <em>add</em>）需要O(log(n))时间。这要归功于不断维护的平衡二叉堆数据结构，它对 <em>Queue</em> 的每次编辑都进行维护。它保证 <em>remove(Object)</em> 和 <em>contains(Object)</em> 方法的线性时间，以及检索方法（<em>peek</em>, <em>element</em>, 和 <em>size</em>）的常数时间。</p><h2 id="_3-自然顺序和逆序排序" tabindex="-1"><a class="header-anchor" href="#_3-自然顺序和逆序排序"><span><strong>3. 自然顺序和逆序排序</strong></span></a></h2><p>在之前的文章中，我们展示了如何根据自然顺序对插入到_PriorityQueue_中的元素进行排序。这是因为用null <em>Comparator</em> 初始化优先队列将直接使用 <em>compare</em> 操作对元素进行排序。</p><p><strong>例如，现在让我们看看通过提供一个标准的 <em>Integer</em> 自然排序比较器或null，队列将以相同的方式排序</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">PriorityQueue</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>\`\`\` integerQueue <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PriorityQueue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">PriorityQueue</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>\`\`\` integerQueueWithComparator <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PriorityQueue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token class-name">Integer</span><span class="token operator">::</span><span class="token function">compare</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

integerQueueWithComparator<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
integerQueue<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

integerQueueWithComparator<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
integerQueue<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

integerQueueWithComparator<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
integerQueue<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">assertThat</span><span class="token punctuation">(</span>integerQueue<span class="token punctuation">.</span><span class="token function">poll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span>integerQueueWithComparator<span class="token punctuation">.</span><span class="token function">poll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">assertThat</span><span class="token punctuation">(</span>integerQueue<span class="token punctuation">.</span><span class="token function">poll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span>integerQueueWithComparator<span class="token punctuation">.</span><span class="token function">poll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">assertThat</span><span class="token punctuation">(</span>integerQueue<span class="token punctuation">.</span><span class="token function">poll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span>integerQueueWithComparator<span class="token punctuation">.</span><span class="token function">poll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在让我们创建一个以逆自然顺序排序的 <em>PriorityQueue</em>。我们可以通过使用 <em>静态</em> 方法 <em>java.util.Collections.reverseOrder()</em> 来实现：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">PriorityQueue</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>\`\`\` reversedQueue <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PriorityQueue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token class-name">Collections</span><span class="token punctuation">.</span><span class="token function">reverseOrder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

reversedQueue<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
reversedQueue<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
reversedQueue<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">assertThat</span><span class="token punctuation">(</span>reversedQueue<span class="token punctuation">.</span><span class="token function">poll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertThat</span><span class="token punctuation">(</span>reversedQueue<span class="token punctuation">.</span><span class="token function">poll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertThat</span><span class="token punctuation">(</span>reversedQueue<span class="token punctuation">.</span><span class="token function">poll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-自定义排序" tabindex="-1"><a class="header-anchor" href="#_4-自定义排序"><span><strong>4. 自定义排序</strong></span></a></h2><p>现在让我们尝试为自定义类定义一个特殊的排序。首先，该类应该实现 <em>Comparable</em> 接口，或者我们应该在 <em>Queue</em> 的实例化中提供 <em>Comparator</em>，否则将抛出 <em>ClassCastException</em>。</p><p>例如，让我们创建一个 <em>ColoredNumber</em> 类来演示这种行为：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ColoredNumber</span> <span class="token punctuation">{</span>

   <span class="token keyword">private</span> <span class="token keyword">int</span> value<span class="token punctuation">;</span>
   <span class="token keyword">private</span> <span class="token class-name">String</span> color<span class="token punctuation">;</span>

   <span class="token keyword">public</span> <span class="token class-name">ColoredNumber</span><span class="token punctuation">(</span><span class="token keyword">int</span> value<span class="token punctuation">,</span> <span class="token class-name">String</span> color<span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token keyword">this</span><span class="token punctuation">.</span>value <span class="token operator">=</span> value<span class="token punctuation">;</span>
       <span class="token keyword">this</span><span class="token punctuation">.</span>color <span class="token operator">=</span> color<span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
   <span class="token comment">// getters and setters...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>当我们尝试在 <em>PriorityQueue</em> 中使用这个类时，它会抛出异常</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">PriorityQueue</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">ColoredNumber</span><span class="token punctuation">&gt;</span></span>\` queue <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PriorityQueue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
queue<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">ColoredNumber</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token string">&quot;red&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
queue<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">ColoredNumber</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">&quot;blue&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>这是因为 <em>PriorityQueue</em> 不知道如何通过比较将 <em>ColoredNumber</em> 对象与其他同一类的对象进行排序</strong>。</p><p>我们可以通过在构造函数中提供 <em>Comparator</em> 来提供排序，就像我们在前面的例子中所做的，或者我们可以实现 <em>Comparable</em> 接口：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token keyword">class</span> <span class="token class-name">ColoredNumberComparable</span> <span class="token keyword">implements</span> <span class="token class-name">Comparable</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">ColoredNumberComparable</span><span class="token punctuation">&gt;</span></span>\`\` <span class="token punctuation">{</span>
<span class="token comment">// ...</span>

<span class="token annotation punctuation">@Override</span>
<span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">compareTo</span><span class="token punctuation">(</span><span class="token class-name">ColoredNumberComparable</span> o<span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>color<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token string">&quot;red&quot;</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> o<span class="token punctuation">.</span>color<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token string">&quot;red&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">||</span>
           <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>color<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token string">&quot;red&quot;</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>o<span class="token punctuation">.</span>color<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token string">&quot;red&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token keyword">return</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token function">compare</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>value<span class="token punctuation">,</span> o<span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
   <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>color<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token string">&quot;red&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
   <span class="token keyword">else</span> <span class="token punctuation">{</span>
       <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这将保证每个项目都将根据“红色”颜色首先排序，然后是自然排序的值，这意味着所有红色对象将首先返回：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">PriorityQueue</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">ColoredNumberComparable</span><span class="token punctuation">&gt;</span></span>\`\` queue <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PriorityQueue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
queue<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">ColoredNumberComparable</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token string">&quot;red&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
queue<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">ColoredNumberComparable</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">,</span> <span class="token string">&quot;red&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
queue<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">ColoredNumberComparable</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">&quot;blue&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
queue<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">ColoredNumberComparable</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">&quot;blue&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">ColoredNumberComparable</span> first <span class="token operator">=</span> queue<span class="token punctuation">.</span><span class="token function">poll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertThat</span><span class="token punctuation">(</span>first<span class="token punctuation">.</span><span class="token function">getColor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token string">&quot;red&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertThat</span><span class="token punctuation">(</span>first<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

queue<span class="token punctuation">.</span><span class="token function">poll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">ColoredNumberComparable</span> third <span class="token operator">=</span> queue<span class="token punctuation">.</span><span class="token function">poll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertThat</span><span class="token punctuation">(</span>third<span class="token punctuation">.</span><span class="token function">getColor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token string">&quot;blue&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertThat</span><span class="token punctuation">(</span>third<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>关于多线程的最后说明：这个Java实现的优先队列不是 <em>synchronized</em>，这意味着多个线程不应该同时使用同一个Java <em>PriorityQueue</em> 实例。</p><p>如果多个线程需要访问 <em>PriorityQueue</em> 实例，我们应该使用线程安全的 <em>java.util.concurrent.PriorityBlockingQueue</em> 类。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span><strong>5. 结论</strong></span></a></h2><p>在这篇文章中，我们已经看到了Java <em>PriorityQueue</em> 实现是如何工作的。我们从JDK内部的类和它们的性能开始，然后展示了具有自然排序和逆序排序的 <em>PriorityQueue</em>。最后，我们提供了一个自定义类的用户定义 <em>Comparable</em> 实现，并验证了其排序行为。</p><p>如往常一样，代码可以在GitHub上找到。</p>`,28),o=[p];function c(u,l){return a(),s("div",null,o)}const k=n(e,[["render",c],["__file","2024-07-11-Guide to Java PriorityQueue.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-11/2024-07-11-Guide%20to%20Java%20PriorityQueue.html","title":"Java优先队列指南","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","PriorityQueue"],"tag":["Java","PriorityQueue"],"head":[["meta",{"name":"keywords","content":"Java, PriorityQueue, 优先队列, 排序"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-11/2024-07-11-Guide%20to%20Java%20PriorityQueue.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java优先队列指南"}],["meta",{"property":"og:description","content":"Java优先队列指南 在这篇简短的教程中，我们将讨论Java优先队列的实现。首先，我们将看到标准用法，并展示一些通过自然顺序和逆序排序队列的示例。最后，我们将看到如何使用Java Comparator 定义自定义顺序。 2. java.util.PriorityQueue java.util.PriorityQueue 类从JDK 1.5开始提供，它还..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-11T19:04:57.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"PriorityQueue"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-11T19:04:57.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java优先队列指南\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-11T19:04:57.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java优先队列指南 在这篇简短的教程中，我们将讨论Java优先队列的实现。首先，我们将看到标准用法，并展示一些通过自然顺序和逆序排序队列的示例。最后，我们将看到如何使用Java Comparator 定义自定义顺序。 2. java.util.PriorityQueue java.util.PriorityQueue 类从JDK 1.5开始提供，它还..."},"headers":[{"level":2,"title":"2. java.util.PriorityQueue","slug":"_2-java-util-priorityqueue","link":"#_2-java-util-priorityqueue","children":[]},{"level":2,"title":"3. 自然顺序和逆序排序","slug":"_3-自然顺序和逆序排序","link":"#_3-自然顺序和逆序排序","children":[]},{"level":2,"title":"4. 自定义排序","slug":"_4-自定义排序","link":"#_4-自定义排序","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720724697000,"updatedTime":1720724697000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.82,"words":1145},"filePathRelative":"posts/baeldung/2024-07-11/2024-07-11-Guide to Java PriorityQueue.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在这篇简短的教程中，我们将讨论Java优先队列的实现。首先，我们将看到标准用法，并展示一些通过自然顺序和逆序排序队列的示例。最后，我们将看到如何使用Java <em>Comparator</em> 定义自定义顺序。</p>\\n<h2><strong>2. java.util.PriorityQueue</strong></h2>\\n<p>java.util.PriorityQueue 类从JDK 1.5开始提供，它还包含其他 <em>AbstractQueue</em> 的实现。<strong>正如我们从它的名字可以推断的，我们使用 <em>PriorityQueue</em> 来维持给定集合中的一个定义好的顺序：队列的第一个元素（<em>head</em>）是根据我们指定的顺序来说最小的元素。</strong> 队列的每个检索操作（<em>poll</em>, <em>remove</em>, 或 <em>peek</em>）读取队列的头部。</p>","autoDesc":true}');export{k as comp,d as data};
