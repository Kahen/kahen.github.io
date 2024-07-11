import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-uizvaz9h.js";const e={},p=t(`<h1 id="java-中-priorityqueue-的-iterator-方法" tabindex="-1"><a class="header-anchor" href="#java-中-priorityqueue-的-iterator-方法"><span>Java 中 PriorityQueue 的 iterator() 方法</span></a></h1><ol><li>引言</li></ol><p>在 PriorityQueue 中，一个关键的方法是 iterator() 方法。这个方法允许我们无缝地遍历存储在队列中的元素。在本教程中，我们将探索 iterator() 方法的功能，并展示其在不同场景中的有效使用。</p><ol start="2"><li>PriorityQueue 概述</li></ol><p>Java 中的 PriorityQueue 类作为一个数据结构，允许我们根据元素的优先级将元素存储在队列中。</p><p>PriorityQueue 内部使用二叉堆，这是一种树状结构，元素根据优先级进行排列。最高优先级的元素位于根节点，子节点继承其父节点的优先级。<strong>这种排列确保了最高优先级的元素位于队列的最前面，而最低优先级的元素则位于队列的最后。</strong></p><p>此外，PriorityQueue 类实现了 Queue 接口，并提供了一系列方法来操作队列中的元素，包括 iterator() 方法。iterator() 方法是 Iterable 接口的一部分，用于获取集合元素的迭代器。iterator() 方法的定义如下：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">Iterator</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span>\` <span class="token function">iterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>iterator() 方法返回一个覆盖队列中元素的 Iterator。参数类型 E 指定了队列中元素的类型。这个方法不接受任何参数。</p><ol start="3"><li>Iterator 特性</li></ol><p>让我们深入了解迭代器的关键特性：</p><p>3.1. <strong>快速失败保证</strong></p><p>由 iterator() 方法返回的迭代器是一个快速失败（fail-fast）迭代器。这意味着，如果在使用迭代器的过程中尝试修改队列（添加或删除元素），将会抛出 ConcurrentModificationException。这种行为确保了迭代器始终反映队列的当前状态。</p><p>在代码中，我们在获取迭代器后，通过添加一个额外的元素来修改 PriorityQueue：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">PriorityQueue</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>\`\`\`\` numbers <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PriorityQueue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
numbers<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
numbers<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
numbers<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">Iterator</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>\`\`\`\` iterator <span class="token operator">=</span> numbers<span class="token punctuation">.</span><span class="token function">iterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
numbers<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">try</span> <span class="token punctuation">{</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>iterator<span class="token punctuation">.</span><span class="token function">hasNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>iterator<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">ConcurrentModificationException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;迭代期间发生了 ConcurrentModificationException。&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个程序的输出将是：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>迭代期间发生了 <span class="token class-name">ConcurrentModificationException</span>。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>3.2. 遍历顺序</p><p>iterator() 方法以特定的方式遍历堆结构，通常基于层次遍历方法。这意味着它按层次访问元素，从堆的顶部开始，然后向下工作。<strong>这种方法对访问元素是高效的，但可能不总是产生严格的基于优先级的顺序。</strong></p><p>让我们看一个如何使用 iterator() 方法来迭代 PriorityQueue 中的元素的例子：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">PriorityQueue</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>\`\`\`\` queue <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PriorityQueue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
queue<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
queue<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
queue<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">Iterator</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>\`\`\`\` iterator <span class="token operator">=</span> queue<span class="token punctuation">.</span><span class="token function">iterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">while</span> <span class="token punctuation">(</span>iterator<span class="token punctuation">.</span><span class="token function">hasNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Integer</span> element <span class="token operator">=</span> iterator<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>element<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，我们创建了一个整数的 PriorityQueue 并添加了三个元素。然后我们获取了队列元素的迭代器，并使用 while 循环来迭代元素，将每一个元素打印到控制台。这个程序的输出将是：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token number">1</span>
<span class="token number">3</span>
<span class="token number">2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>内部，PriorityQueue 看起来像：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>   <span class="token number">1</span>
  <span class="token operator">/</span> \\
 <span class="token number">3</span>   <span class="token number">2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>**在迭代期间，迭代器按层次顺序遍历元素，产生顺序 1, 3 和 2。**虽然这个顺序保持了堆的一般结构，但它并不严格遵循基于优先级的排序。</p><ol start="4"><li><strong>Comparator 接口</strong></li></ol><p>在某些情况下，我们可能想要根据自定义标准来对 PriorityQueue 中的元素进行排序。这可以通过使用 Comparator 接口来实现。这个接口允许我们定义一个比较函数，用于对队列中的元素进行排序。</p><p>Comparator 接口有一个单一的 compare() 方法，它接受两个相同类型的参数，并返回一个整数值。compare() 方法返回的值决定了队列中元素的排序。</p><p>让我们考虑以下例子，我们有一个 Person 类，要求是根据他们的年龄来优先排序。为此，我们将创建一个自定义比较器：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">PersonAgeComparator</span> <span class="token keyword">implements</span> <span class="token class-name">Comparator</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Person</span><span class="token punctuation">&gt;</span></span>\`\`\` <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">compare</span><span class="token punctuation">(</span><span class="token class-name">Person</span> p1<span class="token punctuation">,</span> <span class="token class-name">Person</span> p2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> p1<span class="token punctuation">.</span>age <span class="token operator">-</span> p2<span class="token punctuation">.</span>age<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>随后，我们将创建一个自定义排序的 PriorityQueue。我们需要将 PersonAgeComparator 接口的实例传递给 PriorityQueue 的构造函数。然后队列中的元素将根据 Comparator 定义的比较函数进行排序：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">PriorityQueue</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Person</span><span class="token punctuation">&gt;</span></span>\`\`\` priorityQueue <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PriorityQueue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">PersonAgeComparator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

priorityQueue<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token string">&quot;Alice&quot;</span><span class="token punctuation">,</span> <span class="token number">25</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
priorityQueue<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token string">&quot;Bob&quot;</span><span class="token punctuation">,</span> <span class="token number">30</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
priorityQueue<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token string">&quot;Charlie&quot;</span><span class="token punctuation">,</span> <span class="token number">22</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">Iterator</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Person</span><span class="token punctuation">&gt;</span></span>\`\`\` iterator <span class="token operator">=</span> priorityQueue<span class="token punctuation">.</span><span class="token function">iterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">while</span> <span class="token punctuation">(</span>iterator<span class="token punctuation">.</span><span class="token function">hasNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Person</span> person <span class="token operator">=</span> iterator<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Name: &quot;</span> <span class="token operator">+</span> person<span class="token punctuation">.</span>name <span class="token operator">+</span> <span class="token string">&quot;, Age: &quot;</span> <span class="token operator">+</span> person<span class="token punctuation">.</span>age<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个程序的输出将是：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Name</span><span class="token operator">:</span> <span class="token class-name">Charlie</span><span class="token punctuation">,</span> <span class="token class-name">Age</span><span class="token operator">:</span> <span class="token number">22</span>
<span class="token class-name">Name</span><span class="token operator">:</span> <span class="token class-name">Bob</span><span class="token punctuation">,</span> <span class="token class-name">Age</span><span class="token operator">:</span> <span class="token number">30</span>
<span class="token class-name">Name</span><span class="token operator">:</span> <span class="token class-name">Alice</span><span class="token punctuation">,</span> <span class="token class-name">Age</span><span class="token operator">:</span> <span class="token number">25</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="5"><li><strong>有序检索</strong></li></ol><p>上一个例子中，即使我们使用了自定义的 Comparator，也没有显示出元素按照严格的升序年龄顺序排列。PriorityQueue 的内部结构在直接迭代时可能会导致意外的结果。<strong>这是因为迭代器遵循层次遍历，这会在迭代期间产生不同的序列，因为它按层次访问元素。</strong></p><p>为了确保元素按照它们的优先级顺序被检索，我们可以使用 poll() 方法。这个方法专门从 PriorityQueue 中移除最高优先级的元素（在这种情况下是最小的年龄）并返回它。</p><p>让我们看看如何使用 poll() 方法按顺序检索元素：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token operator">!</span>priorityQueue<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Person</span> person <span class="token operator">=</span> priorityQueue<span class="token punctuation">.</span><span class="token function">poll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Name: &quot;</span> <span class="token operator">+</span> person<span class="token punctuation">.</span>name <span class="token operator">+</span> <span class="token string">&quot;, Age: &quot;</span> <span class="token operator">+</span> person<span class="token punctuation">.</span>age<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在这个程序的输出将是：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Name</span><span class="token operator">:</span> <span class="token class-name">Charlie</span><span class="token punctuation">,</span> <span class="token class-name">Age</span><span class="token operator">:</span> <span class="token number">22</span>
<span class="token class-name">Name</span><span class="token operator">:</span> <span class="token class-name">Alice</span><span class="token punctuation">,</span> <span class="token class-name">Age</span><span class="token operator">:</span> <span class="token number">25</span>
<span class="token class-name">Name</span><span class="token operator">:</span> <span class="token class-name">Bob</span><span class="token punctuation">,</span> <span class="token class-name">Age</span><span class="token operator">:</span> <span class="token number">30</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="6"><li><strong>使用场景</strong></li></ol><p>尽管 iterator() 可能不是严格有序检索的理想选择，但它在优先级顺序不重要的场景中表现出色 —— 例如，在 PriorityQueue 中大写人的名字或计算平均年龄，无论优先级如何。让我们用一个例子来说明使用场景：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">while</span> <span class="token punctuation">(</span>iterator<span class="token punctuation">.</span><span class="token function">hasNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Person</span> person <span class="token operator">=</span> iterator<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    person<span class="token punctuation">.</span><span class="token function">setName</span><span class="token punctuation">(</span>person<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="7"><li><strong>结论</strong></li></ol><p>在本文中，我们探讨了 Java 中的 PriorityQueue 类，强调了 iterator() 方法的作用。需要注意的是，尽管 PriorityQueue 在内部保持了排序顺序，但 iterator() 方法并不保证以该顺序遍历。因此，我们使用 iterator() 方法来执行不依赖于优先级顺序的操作。</p><p>如常，代码可在 GitHub 上找到。</p><p>OK</p>`,49),o=[p];function c(i,l){return s(),a("div",null,o)}const k=n(e,[["render",c],["__file","2024-06-24-PriorityQueue iterator   Method in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-06-24/2024-06-24-PriorityQueue%20iterator%20%20%20Method%20in%20Java.html","title":"Java 中 PriorityQueue 的 iterator() 方法","lang":"zh-CN","frontmatter":{"date":"2024-06-24T00:00:00.000Z","category":["Java","PriorityQueue"],"tag":["PriorityQueue","iterator","Java"],"head":[["meta",{"name":"keywords","content":"PriorityQueue, iterator, Java, 优先队列, 迭代器"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-24/2024-06-24-PriorityQueue%20iterator%20%20%20Method%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java 中 PriorityQueue 的 iterator() 方法"}],["meta",{"property":"og:description","content":"Java 中 PriorityQueue 的 iterator() 方法 引言 在 PriorityQueue 中，一个关键的方法是 iterator() 方法。这个方法允许我们无缝地遍历存储在队列中的元素。在本教程中，我们将探索 iterator() 方法的功能，并展示其在不同场景中的有效使用。 PriorityQueue 概述 Java 中的 Pr..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-24T07:51:26.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"PriorityQueue"}],["meta",{"property":"article:tag","content":"iterator"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:published_time","content":"2024-06-24T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-24T07:51:26.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java 中 PriorityQueue 的 iterator() 方法\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-24T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-24T07:51:26.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java 中 PriorityQueue 的 iterator() 方法 引言 在 PriorityQueue 中，一个关键的方法是 iterator() 方法。这个方法允许我们无缝地遍历存储在队列中的元素。在本教程中，我们将探索 iterator() 方法的功能，并展示其在不同场景中的有效使用。 PriorityQueue 概述 Java 中的 Pr..."},"headers":[],"git":{"createdTime":1719215486000,"updatedTime":1719215486000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.06,"words":1519},"filePathRelative":"posts/baeldung/2024-06-24/2024-06-24-PriorityQueue iterator   Method in Java.md","localizedDate":"2024年6月24日","excerpt":"\\n<ol>\\n<li>引言</li>\\n</ol>\\n<p>在 PriorityQueue 中，一个关键的方法是 iterator() 方法。这个方法允许我们无缝地遍历存储在队列中的元素。在本教程中，我们将探索 iterator() 方法的功能，并展示其在不同场景中的有效使用。</p>\\n<ol start=\\"2\\">\\n<li>PriorityQueue 概述</li>\\n</ol>\\n<p>Java 中的 PriorityQueue 类作为一个数据结构，允许我们根据元素的优先级将元素存储在队列中。</p>\\n<p>PriorityQueue 内部使用二叉堆，这是一种树状结构，元素根据优先级进行排列。最高优先级的元素位于根节点，子节点继承其父节点的优先级。<strong>这种排列确保了最高优先级的元素位于队列的最前面，而最低优先级的元素则位于队列的最后。</strong></p>","autoDesc":true}');export{k as comp,d as data};
