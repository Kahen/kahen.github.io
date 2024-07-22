import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-BMOUrRO4.js";const e={},p=t('<h1 id="java-中-iterable-和-iterator-接口的区别及使用方式" tabindex="-1"><a class="header-anchor" href="#java-中-iterable-和-iterator-接口的区别及使用方式"><span>Java 中 Iterable 和 Iterator 接口的区别及使用方式</span></a></h1><p>在本教程中，我们将探讨 Java 中 Iterable 和 Iterator 接口的用法以及它们之间的区别。</p><h2 id="_2-iterable-接口" tabindex="-1"><a class="header-anchor" href="#_2-iterable-接口"><span>2. Iterable 接口</span></a></h2><p>Iterable 接口属于 java.lang 包。它表示可以被迭代的数据结构。</p><p>Iterable 接口提供了一个方法来产生一个 Iterator。使用 Iterable 时，我们不能通过索引获取元素。同样，我们也不能从数据结构中获取第一个或最后一个元素。</p><p>所有 Java 集合都实现了 Iterable 接口。</p><h3 id="_2-1-迭代-iterable" tabindex="-1"><a class="header-anchor" href="#_2-1-迭代-iterable"><span>2.1 迭代 Iterable</span></a></h3><p>我们可以使用增强型 for 循环（也称为 for-each 循环）来迭代集合中的元素。然而，只有实现了 Iterable 接口的对象才能在此类语句中使用。同样，我们也可以结合使用 while 语句和 Iterator 来迭代元素。</p><p>让我们看一个使用 for-each 语句迭代 List 中元素的例子：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>``````` numbers <span class="token operator">=</span> <span class="token function">getNumbers</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Integer</span> number <span class="token operator">:</span> numbers<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>number<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同样，我们可以使用 forEach() 方法结合 lambda 表达式：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>``````` numbers <span class="token operator">=</span> <span class="token function">getNumbers</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nnumbers<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token operator">::</span><span class="token function">println</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-实现-iterable-接口" tabindex="-1"><a class="header-anchor" href="#_2-2-实现-iterable-接口"><span>2.2 实现 Iterable 接口</span></a></h3><p>自定义实现 Iterable 接口在我们需要迭代自定义数据结构时非常有用。</p><p>让我们从一个表示购物车并使用数组存储元素的类开始。我们不会直接在数组上调用 for-each 循环。相反，我们将实现 Iterable 接口。我们不希望我们的客户端依赖于选择的数据结构。如果我们提供迭代的能力，我们可以轻松地使用不同的数据结构而不需要客户端更改代码。</p><p>ShoppingCart 类实现了 Iterable 接口并覆盖了它的 iterator() 方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ShoppingCart</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span>```` <span class="token keyword">implements</span> <span class="token class-name">Iterable</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span>```` <span class="token punctuation">{</span>\n\n    <span class="token keyword">private</span> <span class="token class-name">E</span><span class="token punctuation">[</span><span class="token punctuation">]</span> elementData<span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token keyword">int</span> size<span class="token punctuation">;</span>\n\n    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token class-name">E</span> element<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token function">ensureCapacity</span><span class="token punctuation">(</span>size <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        elementData<span class="token punctuation">[</span>size<span class="token operator">++</span><span class="token punctuation">]</span> <span class="token operator">=</span> element<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token annotation punctuation">@Override</span>\n    <span class="token keyword">public</span> <span class="token class-name">Iterator</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span>```` <span class="token function">iterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">ShoppingCartIterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>add() 方法将元素存储在数组中。由于数组的大小和容量是固定的，我们使用 ensureCapacity() 方法来扩展元素的最大数量。</p><p>每次对自定义数据结构调用 iterator() 方法都会产生一个新的 Iterator 实例。我们创建一个新实例，因为迭代器负责维护当前迭代状态。</p><p>通过提供 iterator() 方法的具体实现，我们可以使用增强型 for 语句来迭代实现类的实例。</p><p>现在，让我们在 ShoppingCart 类中创建一个内部类来表示我们的自定义迭代器：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ShoppingCartIterator</span> <span class="token keyword">implements</span> <span class="token class-name">Iterator</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span>```` <span class="token punctuation">{</span>\n    <span class="token keyword">int</span> cursor<span class="token punctuation">;</span>\n    <span class="token keyword">int</span> lastReturned <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">hasNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> cursor <span class="token operator">!=</span> size<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">public</span> <span class="token class-name">E</span> <span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token function">getNextElement</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">private</span> <span class="token class-name">E</span> <span class="token function">getNextElement</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">int</span> current <span class="token operator">=</span> cursor<span class="token punctuation">;</span>\n        <span class="token function">exist</span><span class="token punctuation">(</span>current<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n        <span class="token class-name">E</span><span class="token punctuation">[</span><span class="token punctuation">]</span> elements <span class="token operator">=</span> <span class="token class-name">ShoppingCart</span><span class="token punctuation">.</span><span class="token keyword">this</span><span class="token punctuation">.</span>elementData<span class="token punctuation">;</span>\n        <span class="token function">validate</span><span class="token punctuation">(</span>elements<span class="token punctuation">,</span> current<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n        cursor <span class="token operator">=</span> current <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>\n        lastReturned <span class="token operator">=</span> current<span class="token punctuation">;</span>\n        <span class="token keyword">return</span> elements<span class="token punctuation">[</span>lastReturned<span class="token punctuation">]</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，让我们创建一个可迭代类的实例，并在增强型 for 循环中使用它：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">ShoppingCart</span>`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Product</span><span class="token punctuation">&gt;</span></span>` shoppingCart  <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ShoppingCart</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nshoppingCart<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Product</span><span class="token punctuation">(</span><span class="token string">&quot;Tuna&quot;</span><span class="token punctuation">,</span> <span class="token number">42</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nshoppingCart<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Product</span><span class="token punctuation">(</span><span class="token string">&quot;Eggplant&quot;</span><span class="token punctuation">,</span> <span class="token number">65</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nshoppingCart<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Product</span><span class="token punctuation">(</span><span class="token string">&quot;Salad&quot;</span><span class="token punctuation">,</span> <span class="token number">45</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nshoppingCart<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Product</span><span class="token punctuation">(</span><span class="token string">&quot;Banana&quot;</span><span class="token punctuation">,</span> <span class="token number">29</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Product</span> product <span class="token operator">:</span> shoppingCart<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n   <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>product<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-iterator-接口" tabindex="-1"><a class="header-anchor" href="#_3-iterator-接口"><span>3. Iterator 接口</span></a></h2><p>Iterator 是 Java Collections Framework 的成员。它属于 java.util 包。这个接口允许我们在迭代过程中检索或从集合中移除元素。</p><p>此外，它还有两个方法来帮助我们迭代数据结构并检索其元素——next() 和 hasNext()。</p><p>此外，remove() 方法可以移除 Iterator 指向的当前元素。</p><p>最后，forEachRemaining(Consumer<code>&lt;? super E&gt;</code> action) 方法对数据结构中的每个剩余元素执行给定的操作。</p><h3 id="_3-1-迭代-collection" tabindex="-1"><a class="header-anchor" href="#_3-1-迭代-collection"><span>3.1 迭代 Collection</span></a></h3><p>让我们看看如何迭代一个 Integer 元素的 List。在示例中，我们将结合使用 while 循环和 hasNext() 和 next() 方法。</p><p>List 接口是 Collection 的一部分，因此它扩展了 Iterable 接口。要从集合中获取迭代器，我们只需要调用 iterator() 方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>``````` numbers <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nnumbers<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nnumbers<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nnumbers<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">30</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nnumbers<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">40</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token class-name">Iterator</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>``````` iterator <span class="token operator">=</span> numbers<span class="token punctuation">.</span><span class="token function">iterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此外，我们可以通过调用 hasNext() 方法来检查迭代器是否还有剩余元素。之后，我们可以通过调用 next() 方法来获取一个元素：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">while</span> <span class="token punctuation">(</span>iterator<span class="token punctuation">.</span><span class="token function">hasNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n   <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>iterator<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>next() 方法返回迭代中的下一个元素。另一方面，如果没有这样的元素，它会抛出 NoSuchElementException。</p><h3 id="_3-2-实现-iterator-接口" tabindex="-1"><a class="header-anchor" href="#_3-2-实现-iterator-接口"><span>3.2 实现 Iterator 接口</span></a></h3><p>现在，我们将实现 Iterator 接口。自定义实现在我们需要使用条件元素检索来迭代集合时非常有用。例如，我们可以使用自定义迭代器来迭代奇数或偶数。</p><p>为了说明，我们将从给定集合中迭代质数。我们知道，如果一个数字只能被1和自己整除，那么它被认为是质数。</p><p>首先，让我们创建一个包含数字元素集合的类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Numbers</span> <span class="token punctuation">{</span>\n\n    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">List</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>``````` <span class="token constant">NUMBER_LIST</span> <span class="token operator">=</span>\n      <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此外，让我们定义 Iterator 接口的具体实现：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">PrimeIterator</span> <span class="token keyword">implements</span> <span class="token class-name">Iterator</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>``````` <span class="token punctuation">{</span>\n\n    <span class="token keyword">private</span> <span class="token keyword">int</span> cursor<span class="token punctuation">;</span>\n\n    <span class="token annotation punctuation">@Override</span>\n    <span class="token keyword">public</span> <span class="token class-name">Integer</span> <span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token function">exist</span><span class="token punctuation">(</span>cursor<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">return</span> <span class="token constant">NUMBER_LIST</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>cursor<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token annotation punctuation">@Override</span>\n    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">hasNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">if</span> <span class="token punctuation">(</span>cursor <span class="token operator">&gt;</span> <span class="token constant">NUMBER_LIST</span><span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n\n        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> cursor<span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token constant">NUMBER_LIST</span><span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isPrime</span><span class="token punctuation">(</span><span class="token constant">NUMBER_LIST</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n                cursor <span class="token operator">=</span> i<span class="token punctuation">;</span>\n                <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>\n            <span class="token punctuation">}</span>\n        <span class="token punctuation">}</span>\n\n        <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>具体实现通常是作为内部类创建的。此外，它们负责维护当前迭代状态。在上面的例子中，我们在实例变量中存储了下一个质数的当前位置。每次我们调用 next() 方法时，该变量将包含下一个质数的索引。</p><p>任何 next() 方法的实现在没有更多元素时都应该抛出 NoSuchElementException 异常。否则，迭代可能会导致意外的行为。</p><p>让我们在 Number 类中定义一个方法，返回一个新的 PrimeIterator 类的实例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Iterator</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>``````` <span class="token function">iterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">PrimeIterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，我们可以在 while 语句中使用我们的自定义迭代器：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Iterator</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>``````` iterator <span class="token operator">=</span> <span class="token class-name">Numbers</span><span class="token punctuation">.</span><span class="token function">iterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">while</span> <span class="token punctuation">(</span>iterator<span class="token punctuation">.</span><span class="token function">hasNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n   <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>iterator<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>总结来说，以下表格显示了 Iterable 和 Iterator 接口之间的主要区别：</p><table><thead><tr><th>Iterable</th><th>Iterator</th></tr></thead><tbody><tr><td>表示可以使用 for-each 循环迭代的集合</td><td>表示可以用来迭代集合的接口</td></tr><tr><td>实现 Iterable 时，我们需要覆盖 iterator() 方法</td><td>实现 Iterator 时，我们需要覆盖 hasNext() 和 next() 方法</td></tr><tr><td>不存储迭代状态</td><td>存储迭代状态</td></tr><tr><td>迭代期间不允许移除元素</td><td>迭代期间允许移除元素</td></tr></tbody></table><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们探讨了 Java 中 Iterable 和 Iterator 接口的区别及其用法。</p><p>如常，示例的源代码可以在 GitHub 上找到。</p>',54),o=[p];function c(l,i){return s(),a("div",null,o)}const k=n(e,[["render",c],["__file","2024-07-19-Differences Between Iterator and Iterable and How to Use Them .html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-19/2024-07-19-Differences%20Between%20Iterator%20and%20Iterable%20and%20How%20to%20Use%20Them%20.html","title":"Java 中 Iterable 和 Iterator 接口的区别及使用方式","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Collection Framework"],"tag":["Iterable","Iterator"],"head":[["meta",{"name":"keywords","content":"Java, Iterable, Iterator, Collection Framework"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-19/2024-07-19-Differences%20Between%20Iterator%20and%20Iterable%20and%20How%20to%20Use%20Them%20.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java 中 Iterable 和 Iterator 接口的区别及使用方式"}],["meta",{"property":"og:description","content":"Java 中 Iterable 和 Iterator 接口的区别及使用方式 在本教程中，我们将探讨 Java 中 Iterable 和 Iterator 接口的用法以及它们之间的区别。 2. Iterable 接口 Iterable 接口属于 java.lang 包。它表示可以被迭代的数据结构。 Iterable 接口提供了一个方法来产生一个 Iter..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-19T02:11:15.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Iterable"}],["meta",{"property":"article:tag","content":"Iterator"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-19T02:11:15.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java 中 Iterable 和 Iterator 接口的区别及使用方式\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-19T02:11:15.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java 中 Iterable 和 Iterator 接口的区别及使用方式 在本教程中，我们将探讨 Java 中 Iterable 和 Iterator 接口的用法以及它们之间的区别。 2. Iterable 接口 Iterable 接口属于 java.lang 包。它表示可以被迭代的数据结构。 Iterable 接口提供了一个方法来产生一个 Iter..."},"headers":[{"level":2,"title":"2. Iterable 接口","slug":"_2-iterable-接口","link":"#_2-iterable-接口","children":[{"level":3,"title":"2.1 迭代 Iterable","slug":"_2-1-迭代-iterable","link":"#_2-1-迭代-iterable","children":[]},{"level":3,"title":"2.2 实现 Iterable 接口","slug":"_2-2-实现-iterable-接口","link":"#_2-2-实现-iterable-接口","children":[]}]},{"level":2,"title":"3. Iterator 接口","slug":"_3-iterator-接口","link":"#_3-iterator-接口","children":[{"level":3,"title":"3.1 迭代 Collection","slug":"_3-1-迭代-collection","link":"#_3-1-迭代-collection","children":[]},{"level":3,"title":"3.2 实现 Iterator 接口","slug":"_3-2-实现-iterator-接口","link":"#_3-2-实现-iterator-接口","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1721355075000,"updatedTime":1721355075000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.3,"words":1589},"filePathRelative":"posts/baeldung/2024-07-19/2024-07-19-Differences Between Iterator and Iterable and How to Use Them .md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在本教程中，我们将探讨 Java 中 Iterable 和 Iterator 接口的用法以及它们之间的区别。</p>\\n<h2>2. Iterable 接口</h2>\\n<p>Iterable 接口属于 java.lang 包。它表示可以被迭代的数据结构。</p>\\n<p>Iterable 接口提供了一个方法来产生一个 Iterator。使用 Iterable 时，我们不能通过索引获取元素。同样，我们也不能从数据结构中获取第一个或最后一个元素。</p>\\n<p>所有 Java 集合都实现了 Iterable 接口。</p>\\n<h3>2.1 迭代 Iterable</h3>\\n<p>我们可以使用增强型 for 循环（也称为 for-each 循环）来迭代集合中的元素。然而，只有实现了 Iterable 接口的对象才能在此类语句中使用。同样，我们也可以结合使用 while 语句和 Iterator 来迭代元素。</p>","autoDesc":true}');export{k as comp,d as data};
