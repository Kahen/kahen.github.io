import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-D4B8YWfq.js";const p={},o=t(`<h1 id="java-list-接口-baeldung" tabindex="-1"><a class="header-anchor" href="#java-list-接口-baeldung"><span>Java List 接口 | Baeldung</span></a></h1><ol><li>概述</li></ol><p>在本教程中，我们将探讨 Java 的 List 接口。我们将讨论 List 提供的方法、它的实现以及使用场景。</p><ol start="2"><li>Java 列表简介</li></ol><p>Java 是一种面向对象的语言，因此大多数问题都涉及对象以及与这些对象相关的行为或动作。</p><p>此外，我们经常需要同时操作多个相同类型的对象，这就是集合发挥作用的地方。Java 的 List 是一种集合的实现，它保证元素的顺序并允许重复。</p><ol start="3"><li>List 方法和用法</li></ol><p>让我们看看 List 接口中最重要的方法，并看看如何使用它们。在这个例子中，我们将使用 ArrayList 实现。</p><p>3.1. 添加元素</p><p>让我们使用 void add(E element) 方法向列表中添加新元素：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenAFruitList_whenAddNewFruit_thenFruitIsAdded</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token class-name">List</span> fruits <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;列表中的水果数量意外，应该是0&quot;</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> fruits<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    fruits<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&quot;Apple&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;列表中的水果数量意外，应该是1&quot;</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> fruits<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>3.2. 检查列表是否包含元素</p><p>我们可以使用 boolean contains(Object o) 方法检查列表是否包含元素：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenAFruitList_whenContainsFruit_thenFruitIsInTheList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token class-name">List</span> fruits <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    fruits<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&quot;Apple&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token string">&quot;Apple 应该在水果列表中&quot;</span><span class="token punctuation">,</span> fruits<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">&quot;Apple&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertFalse</span><span class="token punctuation">(</span><span class="token string">&quot;Banana 不应该在水果列表中&quot;</span><span class="token punctuation">,</span> fruits<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">&quot;Banana&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>3.3. 检查列表是否为空</p><p>让我们使用 boolean isEmpty() 方法检查列表是否为空：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenAnEmptyFruitList_whenEmptyCheck_thenListIsEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token class-name">List</span> fruits <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token string">&quot;水果列表应该是空的&quot;</span><span class="token punctuation">,</span> fruits<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    fruits<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&quot;Apple&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertFalse</span><span class="token punctuation">(</span><span class="token string">&quot;水果列表不应该为空&quot;</span><span class="token punctuation">,</span> fruits<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>3.4. 迭代列表</p><p>如果我们想要迭代列表，我们可以使用 ListIterator listIterator() 方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenAFruitList_whenIterateOverIt_thenFruitsAreInOrder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token class-name">List</span> fruits <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    fruits<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&quot;Apple&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 索引 0 的水果</span>
    fruits<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&quot;Orange&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">// 索引 1 的水果</span>
    fruits<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&quot;Banana&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">// 索引 2 的水果</span>
    <span class="token keyword">int</span> index <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Iterator</span> it <span class="token operator">=</span> fruits<span class="token punctuation">.</span><span class="token function">listIterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> it<span class="token punctuation">.</span><span class="token function">hasNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">String</span> fruit <span class="token operator">=</span> it<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;水果应该按顺序排列&quot;</span><span class="token punctuation">,</span> fruits<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>index<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">,</span> fruit<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>3.5. 移除元素</p><p>让我们使用 boolean remove(Object o) 方法从列表中移除元素：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenAFruitList_whenRemoveFruit_thenFruitIsRemoved</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token class-name">List</span> fruits <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    fruits<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&quot;Apple&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    fruits<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&quot;Orange&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;列表中的水果数量意外，应该是2&quot;</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> fruits<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    fruits<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span><span class="token string">&quot;Apple&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;列表中的水果数量意外，应该是1&quot;</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> fruits<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>3.6. 修改元素</p><p>让我们使用 E set(int index, E element) 方法修改列表中指定索引处的元素：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenAFruitList_whenSetFruit_thenFruitIsUpdated</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token class-name">List</span> fruits <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    fruits<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&quot;Apple&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    fruits<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&quot;Orange&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    fruits<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token string">&quot;Banana&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;索引 0 处的水果应该是 Banana&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Banana&quot;</span><span class="token punctuation">,</span> fruits<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>3.7. 获取列表大小</p><p>让我们使用 int size() 方法检索列表的大小：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span> fruits <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

fruits<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&quot;Apple&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
fruits<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&quot;Orange&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;列表中的水果数量意外，应该是2&quot;</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> fruits<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>3.8. 对列表进行排序</p><p>我们有多种对列表进行排序的方法。这里让我们看看如何使用 List 接口中的 default void sort(Comparator c) 方法。</p><p>这个方法需要一个比较器作为参数。让我们提供自然顺序比较器：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenAFruitList_whenSort_thenFruitsAreSorted</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token class-name">List</span> fruits <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    fruits<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&quot;Apple&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    fruits<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&quot;Orange&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    fruits<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&quot;Banana&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    fruits<span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span><span class="token class-name">Comparator</span><span class="token punctuation">.</span><span class="token function">naturalOrder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;索引 0 处的水果应该是 Apple&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Apple&quot;</span><span class="token punctuation">,</span> fruits<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;索引 1 处的水果应该是 Banana&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Banana&quot;</span><span class="token punctuation">,</span> fruits<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;索引 2 处的水果应该是 Orange&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Orange&quot;</span><span class="token punctuation">,</span> fruits<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>3.9. 创建子列表</p><p>我们可以通过提供 fromIndex 和 toIndex 参数到方法 List subList(int fromIndex, int toIndex) 来创建列表的子列表。我们需要考虑到 toIndex 是不包含的：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenAFruitList_whenSublist_thenWeGetASublist</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token class-name">List</span> fruits <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    fruits<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&quot;Apple&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    fruits<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&quot;Orange&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    fruits<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&quot;Banana&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">List</span> fruitsSublist <span class="token operator">=</span> fruits<span class="token punctuation">.</span><span class="token function">subList</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;子列表中的水果数量意外，应该是2&quot;</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> fruitsSublist<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;索引 0 处的水果应该是 Apple&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Apple&quot;</span><span class="token punctuation">,</span> fruitsSublist<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;索引 1 处的水果应该是 Orange&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Orange&quot;</span><span class="token punctuation">,</span> fruitsSublist<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>3.10. 使用列表元素创建数组</p><p>我们可以使用方法 T[] toArray(T[] a) 来创建包含列表元素的数组：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenAFruitList_whenToArray_thenWeGetAnArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token class-name">List</span> fruits <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    fruits<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&quot;Apple&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    fruits<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&quot;Orange&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    fruits<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&quot;Banana&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> fruitsArray <span class="token operator">=</span> fruits<span class="token punctuation">.</span><span class="token function">toArray</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;数组中的水果数量意外，应该是3&quot;</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> fruitsArray<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;索引 0 处的水果应该是 Apple&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Apple&quot;</span><span class="token punctuation">,</span> fruitsArray<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;索引 1 处的水果应该是 Orange&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Orange&quot;</span><span class="token punctuation">,</span> fruitsArray<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;索引 2 处的水果应该是 Banana&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Banana&quot;</span><span class="token punctuation">,</span> fruitsArray<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4"><li>List 实现</li></ol><p>让我们看看 Java 中 List 接口最常用的实现。</p><p>4.1. ArrayList</p><p>ArrayList 是 List 接口的可调整大小数组实现。它实现了所有可选操作，并允许所有元素，包括 null。这个类大致相当于 Vector，除了它是不同步的。</p><p>这是 List 接口最广泛使用的实现。</p><p>4.2. CopyOnWriteArrayList</p><p>CopyOnWriteArrayList 是 ArrayList 的线程安全变体。这个类的所有更改操作（添加、设置等）都会创建底层数组的新副本。</p><p>这个实现因其固有的线程安全能力而被使用。</p><p>4.3. LinkedList</p><p>LinkedList 是 List 和 Deque 接口的双向链表实现。它实现了所有可选操作，并允许所有元素（包括 null）。</p><p>4.4. 抽象列表实现</p><p>我们这里有两个抽象实现，它们为 List 接口提供了骨架实现。这些帮助最小化了扩展和自定义 List 所需的工作量：</p><ul><li>AbstractList - 保持一个“随机访问”数据存储（如数组）用于其内部状态</li><li>AbstractSequentialList - 保持一个“顺序访问”数据存储（如链表）用于其内部状态</li></ul><p>4.5. 其他具体列表实现</p><p>这里还有两个值得讨论的具体实现：</p><ul><li>Vector - 实现了一个可增长的对象数组。像数组一样，它包含可以使用整数值索引访问的组件。这个类是同步的。因此，如果不需要线程安全的实现，建议使用 ArrayList 代替 Vector。</li><li>Stack - 表示一个后进先出（LIFO）的对象栈。它扩展了 Vector 类，并提供了五个额外的操作，允许将向量视为栈。</li></ul><p>Java 还提供了几个特定的 List 实现，它们的行为类似于上面讨论的实现之一。</p><ol start="5"><li>结论</li></ol><p>在本文中，我们探讨了 Java 的 List 接口及其实现。当我们只关心元素顺序并允许重复时，列表是我们首选的集合类型。由于它们内部处理增长，它们比数组更受青睐。</p><p>像往常一样，代码片段可以在 GitHub 上找到。</p>`,59),e=[o];function c(u,i){return a(),s("div",null,e)}const r=n(p,[["render",c],["__file","2024-07-10-Java List Interface.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-10/2024-07-10-Java%20List%20Interface.html","title":"Java List 接口 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Collections"],"tag":["List","ArrayList","LinkedList"],"head":[["meta",{"name":"keywords","content":"Java List Interface, ArrayList, LinkedList, Collections Framework"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-10/2024-07-10-Java%20List%20Interface.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java List 接口 | Baeldung"}],["meta",{"property":"og:description","content":"Java List 接口 | Baeldung 概述 在本教程中，我们将探讨 Java 的 List 接口。我们将讨论 List 提供的方法、它的实现以及使用场景。 Java 列表简介 Java 是一种面向对象的语言，因此大多数问题都涉及对象以及与这些对象相关的行为或动作。 此外，我们经常需要同时操作多个相同类型的对象，这就是集合发挥作用的地方。Jav..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-10T07:38:22.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"List"}],["meta",{"property":"article:tag","content":"ArrayList"}],["meta",{"property":"article:tag","content":"LinkedList"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-10T07:38:22.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java List 接口 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-10T07:38:22.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java List 接口 | Baeldung 概述 在本教程中，我们将探讨 Java 的 List 接口。我们将讨论 List 提供的方法、它的实现以及使用场景。 Java 列表简介 Java 是一种面向对象的语言，因此大多数问题都涉及对象以及与这些对象相关的行为或动作。 此外，我们经常需要同时操作多个相同类型的对象，这就是集合发挥作用的地方。Jav..."},"headers":[],"git":{"createdTime":1720597102000,"updatedTime":1720597102000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.24,"words":1572},"filePathRelative":"posts/baeldung/2024-07-10/2024-07-10-Java List Interface.md","localizedDate":"2022年4月1日","excerpt":"\\n<ol>\\n<li>概述</li>\\n</ol>\\n<p>在本教程中，我们将探讨 Java 的 List 接口。我们将讨论 List 提供的方法、它的实现以及使用场景。</p>\\n<ol start=\\"2\\">\\n<li>Java 列表简介</li>\\n</ol>\\n<p>Java 是一种面向对象的语言，因此大多数问题都涉及对象以及与这些对象相关的行为或动作。</p>\\n<p>此外，我们经常需要同时操作多个相同类型的对象，这就是集合发挥作用的地方。Java 的 List 是一种集合的实现，它保证元素的顺序并允许重复。</p>\\n<ol start=\\"3\\">\\n<li>List 方法和用法</li>\\n</ol>\\n<p>让我们看看 List 接口中最重要的方法，并看看如何使用它们。在这个例子中，我们将使用 ArrayList 实现。</p>","autoDesc":true}');export{r as comp,d as data};
