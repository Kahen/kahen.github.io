import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as a,a as t}from"./app-CbPcg273.js";const e={},p=t('<hr><h1 id="java-中-list-与-arraylist-的比较" tabindex="-1"><a class="header-anchor" href="#java-中-list-与-arraylist-的比较"><span>Java 中 List 与 ArrayList 的比较</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在本文中，我们将探讨使用 <em>List</em> 和 <em>ArrayList</em> 类型的区别。</p><p>首先，我们将看到一个使用 <em>ArrayList</em> 的示例实现。然后，我们将切换到 <em>List</em> 接口并比较它们的差异。</p><h2 id="_2-使用-arraylist" tabindex="-1"><a class="header-anchor" href="#_2-使用-arraylist"><span>2. 使用 <em>ArrayList</em></span></a></h2><p><strong><em>ArrayList</em> 是 Java 中最常用的 <em>List</em> 实现之一</strong>。它建立在数组之上，可以随着我们添加/删除元素而动态增长和缩小。当我们知道列表会变得很大时，最好初始化一个具有初始容量的列表：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">ArrayList</span>``<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`` list <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token number">25</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>通过使用 <em>ArrayList</em> 作为引用类型，我们可以使用 <em>ArrayList</em> API 中的方法，而这些方法不在 <em>List</em> API 中 —— 例如，<em>ensureCapacity, trimToSize</em>, 或 <em>removeRange</em>。</p><h3 id="_2-1-快速示例" tabindex="-1"><a class="header-anchor" href="#_2-1-快速示例"><span>2.1. 快速示例</span></a></h3><p>让我们编写一个基本的乘客处理应用程序：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ArrayListDemo</span> <span class="token punctuation">{</span>\n    <span class="token keyword">private</span> <span class="token class-name">ArrayList</span>`````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Passenger</span><span class="token punctuation">&gt;</span></span>````````````` passengers <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">public</span> <span class="token class-name">ArrayList</span>`````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Passenger</span><span class="token punctuation">&gt;</span></span>````````````` <span class="token function">addPassenger</span><span class="token punctuation">(</span><span class="token class-name">Passenger</span> passenger<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        passengers<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>passenger<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">return</span> passengers<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">public</span> <span class="token class-name">ArrayList</span>`````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Passenger</span><span class="token punctuation">&gt;</span></span>````````````` <span class="token function">getPassengersBySource</span><span class="token punctuation">(</span><span class="token class-name">String</span> source<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span>`````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Passenger</span><span class="token punctuation">&gt;</span></span>`````````````<span class="token punctuation">(</span>passengers<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n            <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>it <span class="token operator">-&gt;</span> it<span class="token punctuation">.</span><span class="token function">getSource</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>source<span class="token punctuation">)</span><span class="token punctuation">)</span>\n            <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token comment">// 其他一些函数用于删除乘客，按目的地获取...</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们使用 <em>ArrayList</em> 类型来存储和返回乘客列表。由于最大乘客数为20，因此列表的初始容量设置为20。</p><h3 id="_2-2-可变大小数据的问题" tabindex="-1"><a class="header-anchor" href="#_2-2-可变大小数据的问题"><span>2.2. 可变大小数据的问题</span></a></h3><p>只要我们不需要更改我们正在使用的 <em>List</em> 类型，上述实现就可以正常工作。在我们的示例中，我们选择了 <em>ArrayList</em>，并认为它满足了我们的需求。</p><p>然而，假设随着应用程序的成熟，很明显乘客数量变化很大。例如，如果只有五个预订的乘客，而初始容量为20，则内存浪费为75%。假设我们决定切换到更高效的 <em>List</em>。</p><h3 id="_2-3-更改实现类型" tabindex="-1"><a class="header-anchor" href="#_2-3-更改实现类型"><span>2.3. 更改实现类型</span></a></h3><p>Java 提供了另一种名为 <em>LinkedList</em> 的 <em>List</em> 实现，用于存储可变大小的数据。<strong><em>LinkedList</em> 使用一系列链接节点来存储和检索元素</strong>。如果我们决定将基础实现从 <em>ArrayList</em> 更改为 <em>LinkedList</em>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token class-name">LinkedList</span>`````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Passenger</span><span class="token punctuation">&gt;</span></span>````````````` passengers <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LinkedList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>这一更改会影响应用程序的更多部分，因为演示应用程序中的所有函数都期望与 <em>ArrayList</em> 类型一起工作</strong>。</p><h2 id="_3-切换到-list" tabindex="-1"><a class="header-anchor" href="#_3-切换到-list"><span>3. 切换到 <em>List</em></span></a></h2><p>让我们看看如何通过使用 <em>List</em> 接口类型来处理这种情况：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token class-name">List</span>`````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Passenger</span><span class="token punctuation">&gt;</span></span>````````````` passengers <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在这里，我们使用 <em>List</em> 接口作为引用类型，而不是更具体的 <em>ArrayList</em> 类型。我们可以将同样的原则应用于所有函数调用和返回类型。例如：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">List</span>`````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Passenger</span><span class="token punctuation">&gt;</span></span>````````````` <span class="token function">getPassengersBySource</span><span class="token punctuation">(</span><span class="token class-name">String</span> source<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> passengers<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n        <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>it <span class="token operator">-&gt;</span> it<span class="token punctuation">.</span><span class="token function">getSource</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>source<span class="token punctuation">)</span><span class="token punctuation">)</span>\n        <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们考虑相同的问题陈述，并将基础实现更改为 <em>LinkedList</em> 类型。 <em>ArrayList</em> 和 <em>LinkedList</em> 类都是 <em>List</em> 接口的实现。因此，我们现在可以安全地更改基础实现，而不会对应用程序的其他部分造成任何干扰。类仍然像以前一样编译和工作。</p><h2 id="_4-比较方法" tabindex="-1"><a class="header-anchor" href="#_4-比较方法"><span>4. 比较方法</span></a></h2><p>如果我们在程序中使用具体的列表类型，则所有代码都不必要地与该列表类型耦合。这使得将来更改列表类型更加困难。</p><p>此外，Java 中的实用程序类返回抽象类型而不是具体类型。例如，以下实用程序函数返回 <em>List</em> 类型：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Collections</span><span class="token punctuation">.</span><span class="token function">singletonList</span><span class="token punctuation">(</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">Collections</span><span class="token punctuation">.</span><span class="token function">unmodifiableList</span><span class="token punctuation">(</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">ArrayList</span><span class="token punctuation">.</span><span class="token function">sublist</span><span class="token punctuation">(</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>特别是 <em>ArrayList.sublist</em> 返回 <em>List</em> 类型，即使原始对象是 <em>ArrayList</em> 类型。因此，<em>List</em> API 中的方法不保证返回相同类型的列表。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们检查了使用 <em>List</em> 与 <em>ArrayList</em> 类型的区别和最佳实践。</p><p>我们看到了引用具体类型可以使应用程序在稍后更改时变得脆弱。具体来说，当底层实现发生变化时，它会影响应用程序的其他层。因此，通常更倾向于使用最抽象的类型（顶级类/接口）而不是使用具体的引用类型。</p><p>如常，示例的源代码可在 GitHub 上获取。--- date: 2022-04-01 category:</p><ul><li>Java tag:</li><li>List</li><li>ArrayList head:</li><li><ul><li>meta</li><li>name: keywords content: Java List vs ArrayList</li></ul></li></ul><hr><h1 id="java-中-list-与-arraylist-的比较-1" tabindex="-1"><a class="header-anchor" href="#java-中-list-与-arraylist-的比较-1"><span>Java 中 List 与 ArrayList 的比较</span></a></h1><h2 id="_1-概述-1" tabindex="-1"><a class="header-anchor" href="#_1-概述-1"><span>1. 概述</span></a></h2><p>在本文中，我们将探讨使用 <em>List</em> 和 <em>ArrayList</em> 类型的区别。</p><p>首先，我们将看到一个使用 <em>ArrayList</em> 的示例实现。然后，我们将切换到 <em>List</em> 接口并比较它们的差异。</p><h2 id="_2-使用-arraylist-1" tabindex="-1"><a class="header-anchor" href="#_2-使用-arraylist-1"><span>2. 使用 <em>ArrayList</em></span></a></h2><p><strong><em>ArrayList</em> 是 Java 中最常用的 <em>List</em> 实现之一</strong>。它建立在数组之上，可以随着我们添加/删除元素而动态增长和缩小。当我们知道列表会变得很大时，最好初始化一个具有初始容量的列表：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">ArrayList</span>``<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`` list <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token number">25</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>通过使用 <em>ArrayList</em> 作为引用类型，我们可以使用 <em>ArrayList</em> API 中的方法，而这些方法不在 <em>List</em> API 中 —— 例如，<em>ensureCapacity, trimToSize</em>, 或 <em>removeRange</em>。</p><h3 id="_2-1-快速示例-1" tabindex="-1"><a class="header-anchor" href="#_2-1-快速示例-1"><span>2.1. 快速示例</span></a></h3><p>让我们编写一个基本的乘客处理应用程序：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ArrayListDemo</span> <span class="token punctuation">{</span>\n    <span class="token keyword">private</span> <span class="token class-name">ArrayList</span>`````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Passenger</span><span class="token punctuation">&gt;</span></span>````````````` passengers <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">public</span> <span class="token class-name">ArrayList</span>`````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Passenger</span><span class="token punctuation">&gt;</span></span>````````````` <span class="token function">addPassenger</span><span class="token punctuation">(</span><span class="token class-name">Passenger</span> passenger<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        passengers<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>passenger<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">return</span> passengers<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">public</span> <span class="token class-name">ArrayList</span>`````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Passenger</span><span class="token punctuation">&gt;</span></span>````````````` <span class="token function">getPassengersBySource</span><span class="token punctuation">(</span><span class="token class-name">String</span> source<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span>passengers<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n            <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>it <span class="token operator">-&gt;</span> it<span class="token punctuation">.</span><span class="token function">getSource</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>source<span class="token punctuation">)</span><span class="token punctuation">)</span>\n            <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token comment">// 其他一些函数用于删除乘客，按目的地获取...</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们使用 <em>ArrayList</em> 类型来存储和返回乘客列表。由于最大乘客数为20，因此列表的初始容量设置为20。</p><h3 id="_2-2-可变大小数据的问题-1" tabindex="-1"><a class="header-anchor" href="#_2-2-可变大小数据的问题-1"><span>2.2. 可变大小数据的问题</span></a></h3><p>只要我们不需要更改我们正在使用的 <em>List</em> 类型，上述实现就可以正常工作。在我们的示例中，我们选择了 <em>ArrayList</em>，并认为它满足了我们的需求。</p><p>然而，假设随着应用程序的成熟，很明显乘客数量变化很大。例如，如果只有五个预订的乘客，而初始容量为20，则内存浪费为75%。假设我们决定切换到更高效的 <em>List</em>。</p><h3 id="_2-3-更改实现类型-1" tabindex="-1"><a class="header-anchor" href="#_2-3-更改实现类型-1"><span>2.3. 更改实现类型</span></a></h3><p>Java 提供了另一种名为 <em>LinkedList</em> 的 <em>List</em> 实现，用于存储可变大小的数据。<strong><em>LinkedList</em> 使用一系列链接节点来存储和检索元素</strong>。如果我们决定将基础实现从 <em>ArrayList</em> 更改为 <em>LinkedList</em>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token class-name">LinkedList</span>`````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Passenger</span><span class="token punctuation">&gt;</span></span>````````````` passengers <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LinkedList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>这一更改会影响应用程序的更多部分，因为演示应用程序中的所有函数都期望与 <em>ArrayList</em> 类型一起工作</strong>。</p><h2 id="_3-切换到-list-1" tabindex="-1"><a class="header-anchor" href="#_3-切换到-list-1"><span>3. 切换到 <em>List</em></span></a></h2><p>让我们看看如何通过使用 <em>List</em> 接口类型来处理这种情况：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token class-name">List</span>`````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Passenger</span><span class="token punctuation">&gt;</span></span>````````````` passengers <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在这里，我们使用 <em>List</em> 接口作为引用类型，而不是更具体的 <em>ArrayList</em> 类型。我们可以将同样的原则应用于所有函数调用和返回类型。例如：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">List</span>`````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Passenger</span><span class="token punctuation">&gt;</span></span>````````````` <span class="token function">getPassengersBySource</span><span class="token punctuation">(</span><span class="token class-name">String</span> source<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> passengers<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n        <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>it <span class="token operator">-&gt;</span> it<span class="token punctuation">.</span><span class="token function">getSource</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>source<span class="token punctuation">)</span><span class="token punctuation">)</span>\n        <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们考虑相同的问题陈述，并将基础实现更改为 <em>LinkedList</em> 类型。 <em>ArrayList</em> 和 <em>LinkedList</em> 类都是 <em>List</em> 接口的实现。因此，我们现在可以安全地更改基础实现，而不会对应用程序的其他部分造成任何干扰。类仍然像以前一样编译和工作。</p><h2 id="_4-比较方法-1" tabindex="-1"><a class="header-anchor" href="#_4-比较方法-1"><span>4. 比较方法</span></a></h2><p>如果我们在程序中使用具体的列表类型，则所有代码都不必要地与该列表类型耦合。这使得将来更改列表类型更加困难。</p><p>此外，Java 中的实用程序类返回抽象类型而不是具体类型。例如，以下实用程序函数返回 <em>List</em> 类型：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Collections</span><span class="token punctuation">.</span><span class="token function">singletonList</span><span class="token punctuation">(</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">Collections</span><span class="token punctuation">.</span><span class="token function">unmodifiableList</span><span class="token punctuation">(</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">ArrayList</span><span class="token punctuation">.</span><span class="token function">sublist</span><span class="token punctuation">(</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>特别是 <em>ArrayList.sublist</em> 返回 <em>List</em> 类型，即使原始对象是 <em>ArrayList</em> 类型。因此，<em>List</em> API 中的方法不保证返回一个相同类型的列表。</p><h2 id="_5-结论-1" tabindex="-1"><a class="header-anchor" href="#_5-结论-1"><span>5. 结论</span></a></h2><p>在本文中，我们检查了使用 <em>List</em> 与 <em>ArrayList</em> 类型的区别和最佳实践。</p><p>我们看到了引用具体类型可以使应用程序在稍后更改时变得脆弱。具体来说，当底层实现发生变化时，它会影响应用程序的其他层。因此，通常更倾向于使用最抽象的类型（顶级类/接口）而不是使用具体的引用类型。</p><p>如常，示例的源代码可在 GitHub 上获取。</p><p>OK</p>',74),c=[p];function i(o,l){return a(),n("div",null,c)}const k=s(e,[["render",i],["__file","2024-07-19-List vs. ArrayList in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-19/2024-07-19-List%20vs.%20ArrayList%20in%20Java.html","title":"Java 中 List 与 ArrayList 的比较","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java"],"tag":["List","ArrayList"],"head":[["meta",{"name":"keywords","content":"Java List vs ArrayList"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-19/2024-07-19-List%20vs.%20ArrayList%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java 中 List 与 ArrayList 的比较"}],["meta",{"property":"og:description","content":"Java 中 List 与 ArrayList 的比较 1. 概述 在本文中，我们将探讨使用 List 和 ArrayList 类型的区别。 首先，我们将看到一个使用 ArrayList 的示例实现。然后，我们将切换到 List 接口并比较它们的差异。 2. 使用 ArrayList ArrayList 是 Java 中最常用的 List 实现之一。它..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-19T19:37:03.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"List"}],["meta",{"property":"article:tag","content":"ArrayList"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-19T19:37:03.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java 中 List 与 ArrayList 的比较\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-19T19:37:03.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java 中 List 与 ArrayList 的比较 1. 概述 在本文中，我们将探讨使用 List 和 ArrayList 类型的区别。 首先，我们将看到一个使用 ArrayList 的示例实现。然后，我们将切换到 List 接口并比较它们的差异。 2. 使用 ArrayList ArrayList 是 Java 中最常用的 List 实现之一。它..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 使用 ArrayList","slug":"_2-使用-arraylist","link":"#_2-使用-arraylist","children":[{"level":3,"title":"2.1. 快速示例","slug":"_2-1-快速示例","link":"#_2-1-快速示例","children":[]},{"level":3,"title":"2.2. 可变大小数据的问题","slug":"_2-2-可变大小数据的问题","link":"#_2-2-可变大小数据的问题","children":[]},{"level":3,"title":"2.3. 更改实现类型","slug":"_2-3-更改实现类型","link":"#_2-3-更改实现类型","children":[]}]},{"level":2,"title":"3. 切换到 List","slug":"_3-切换到-list","link":"#_3-切换到-list","children":[]},{"level":2,"title":"4. 比较方法","slug":"_4-比较方法","link":"#_4-比较方法","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]},{"level":2,"title":"1. 概述","slug":"_1-概述-1","link":"#_1-概述-1","children":[]},{"level":2,"title":"2. 使用 ArrayList","slug":"_2-使用-arraylist-1","link":"#_2-使用-arraylist-1","children":[{"level":3,"title":"2.1. 快速示例","slug":"_2-1-快速示例-1","link":"#_2-1-快速示例-1","children":[]},{"level":3,"title":"2.2. 可变大小数据的问题","slug":"_2-2-可变大小数据的问题-1","link":"#_2-2-可变大小数据的问题-1","children":[]},{"level":3,"title":"2.3. 更改实现类型","slug":"_2-3-更改实现类型-1","link":"#_2-3-更改实现类型-1","children":[]}]},{"level":2,"title":"3. 切换到 List","slug":"_3-切换到-list-1","link":"#_3-切换到-list-1","children":[]},{"level":2,"title":"4. 比较方法","slug":"_4-比较方法-1","link":"#_4-比较方法-1","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论-1","link":"#_5-结论-1","children":[]}],"git":{"createdTime":1721417823000,"updatedTime":1721417823000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":6.91,"words":2074},"filePathRelative":"posts/baeldung/2024-07-19/2024-07-19-List vs. ArrayList in Java.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>Java 中 List 与 ArrayList 的比较</h1>\\n<h2>1. 概述</h2>\\n<p>在本文中，我们将探讨使用 <em>List</em> 和 <em>ArrayList</em> 类型的区别。</p>\\n<p>首先，我们将看到一个使用 <em>ArrayList</em> 的示例实现。然后，我们将切换到 <em>List</em> 接口并比较它们的差异。</p>\\n<h2>2. 使用 <em>ArrayList</em></h2>\\n<p><strong><em>ArrayList</em> 是 Java 中最常用的 <em>List</em> 实现之一</strong>。它建立在数组之上，可以随着我们添加/删除元素而动态增长和缩小。当我们知道列表会变得很大时，最好初始化一个具有初始容量的列表：</p>","autoDesc":true}');export{k as comp,d as data};
