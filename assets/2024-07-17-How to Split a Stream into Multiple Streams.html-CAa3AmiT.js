import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-CE5go3V-.js";const p={},e=t('<hr><h1 id="如何将一个流分割成多个流-baeldung" tabindex="-1"><a class="header-anchor" href="#如何将一个流分割成多个流-baeldung"><span>如何将一个流分割成多个流 | Baeldung</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>Java的流API是一个强大且多功能的工具，用于处理数据。根据定义，流操作是对一组数据进行单次迭代。</p><p>然而，有时我们希望以不同的方式处理流的一部分，并得到多组结果。</p><p>在本教程中，我们将学习如何将流分割成多个组并独立处理它们。</p><h2 id="_2-使用收集器" tabindex="-1"><a class="header-anchor" href="#_2-使用收集器"><span>2. 使用收集器</span></a></h2><p><strong>一个流应该只操作一次，并有一个终端操作。</strong> 它可以有多个中间操作，但在关闭之前只能收集一次数据。</p><p>这意味着流API规范明确禁止将流分叉，并为每个分叉有不同的中间操作。这将导致多个终端操作。然而，我们可以在终端操作中分割流。这会创建一个分成两组或多组的结果。</p><h3 id="_2-1-使用-partitioningby-进行二元分割" tabindex="-1"><a class="header-anchor" href="#_2-1-使用-partitioningby-进行二元分割"><span>2.1. 使用_partitioningBy_进行二元分割</span></a></h3><p>如果我们想要将流分成两部分，我们可以使用_Collector_类的_partitioningBy_。它接受一个_Predicate_并返回一个_Map_，将满足谓词的元素分组在_Boolean_ _true_键下，其余的在_false_键下。</p><p>假设我们有一个包含文章列表，其中包含它们应该发布的目标站点信息以及是否应该被精选。</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Article</span><span class="token punctuation">&gt;</span></span>`````` articles <span class="token operator">=</span> <span class="token class-name">Lists</span><span class="token punctuation">.</span><span class="token function">newArrayList</span><span class="token punctuation">(</span>\n  <span class="token keyword">new</span> <span class="token class-name">Article</span><span class="token punctuation">(</span><span class="token string">&quot;Baeldung&quot;</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n  <span class="token keyword">new</span> <span class="token class-name">Article</span><span class="token punctuation">(</span><span class="token string">&quot;Baeldung&quot;</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n  <span class="token keyword">new</span> <span class="token class-name">Article</span><span class="token punctuation">(</span><span class="token string">&quot;Programming Daily&quot;</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n  <span class="token keyword">new</span> <span class="token class-name">Article</span><span class="token punctuation">(</span><span class="token string">&quot;The Code&quot;</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们将把它分成两组，一组只包含Baeldung文章，另一组包含其余的：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Map</span><span class="token operator">&lt;</span><span class="token class-name">Boolean</span><span class="token punctuation">,</span> <span class="token class-name">List</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Article</span><span class="token punctuation">&gt;</span></span>``````<span class="token operator">&gt;</span> groupedArticles <span class="token operator">=</span> articles<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">partitioningBy</span><span class="token punctuation">(</span>a <span class="token operator">-&gt;</span> a<span class="token punctuation">.</span>target<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token string">&quot;Baeldung&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们看看哪些文章被归档在_map_中的_true_和_false_键下：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertThat</span><span class="token punctuation">(</span>groupedArticles<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">containsExactly</span><span class="token punctuation">(</span>\n  <span class="token keyword">new</span> <span class="token class-name">Article</span><span class="token punctuation">(</span><span class="token string">&quot;Baeldung&quot;</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n  <span class="token keyword">new</span> <span class="token class-name">Article</span><span class="token punctuation">(</span><span class="token string">&quot;Baeldung&quot;</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertThat</span><span class="token punctuation">(</span>groupedArticles<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">containsExactly</span><span class="token punctuation">(</span>\n  <span class="token keyword">new</span> <span class="token class-name">Article</span><span class="token punctuation">(</span><span class="token string">&quot;Programming Daily&quot;</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n  <span class="token keyword">new</span> <span class="token class-name">Article</span><span class="token punctuation">(</span><span class="token string">&quot;The Code&quot;</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-使用-groupingby-进行分割" tabindex="-1"><a class="header-anchor" href="#_2-2-使用-groupingby-进行分割"><span>2.2. 使用_groupingBy_进行分割</span></a></h3><p>如果我们想要有更多的类别，那么我们需要使用_groupingBy_方法。它接受一个函数，将每个元素分类到一个组中。然后它返回一个_Map_，将每个组分类器链接到其元素的集合。</p><p>假设我们想要按目标站点对文章进行分组。返回的_Map_将有包含站点名称的键和包含与给定站点相关联的文章集合的值：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Map</span><span class="token operator">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">List</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Article</span><span class="token punctuation">&gt;</span></span>``````<span class="token operator">&gt;</span> groupedArticles <span class="token operator">=</span> articles<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">groupingBy</span><span class="token punctuation">(</span>a <span class="token operator">-&gt;</span> a<span class="token punctuation">.</span>target<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertThat</span><span class="token punctuation">(</span>groupedArticles<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;Baeldung&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">containsExactly</span><span class="token punctuation">(</span>\n  <span class="token keyword">new</span> <span class="token class-name">Article</span><span class="token punctuation">(</span><span class="token string">&quot;Baeldung&quot;</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n  <span class="token keyword">new</span> <span class="token class-name">Article</span><span class="token punctuation">(</span><span class="token string">&quot;Baeldung&quot;</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertThat</span><span class="token punctuation">(</span>groupedArticles<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;Programming Daily&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">containsExactly</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Article</span><span class="token punctuation">(</span><span class="token string">&quot;Programming Daily&quot;</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertThat</span><span class="token punctuation">(</span>groupedArticles<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;The Code&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">containsExactly</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Article</span><span class="token punctuation">(</span><span class="token string">&quot;The Code&quot;</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-使用-teeing" tabindex="-1"><a class="header-anchor" href="#_3-使用-teeing"><span>3. 使用_teeing_</span></a></h2><p>从Java 12开始，我们有了另一种二元分割的选项。我们可以使用_teeing_收集器。<strong>_teeing_将两个收集器组合成一个复合体。</strong> 每个元素都由它们两个处理，然后使用提供的合并函数合并到一个单一的返回值中。</p><h3 id="_3-1-使用-predicate-进行-teeing" tabindex="-1"><a class="header-anchor" href="#_3-1-使用-predicate-进行-teeing"><span>3.1. 使用_Predicate_进行_teeing_</span></a></h3><p><strong>_teeing_收集器与_Collector_类中的另一个收集器_filtering_搭配得很好。</strong> 它接受一个谓词，并使用它来过滤处理的元素，然后将它们传递给另一个收集器。</p><p>让我们将文章分成Baeldung和非Baeldung的组，并计算它们的数量。我们还将使用_List_构造函数作为合并函数：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Long</span><span class="token punctuation">&gt;</span></span>` countedArticles <span class="token operator">=</span> articles<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">teeing</span><span class="token punctuation">(</span>\n  <span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">filtering</span><span class="token punctuation">(</span>article <span class="token operator">-&gt;</span> article<span class="token punctuation">.</span>target<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token string">&quot;Baeldung&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">counting</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n  <span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">filtering</span><span class="token punctuation">(</span>article <span class="token operator">-&gt;</span> <span class="token operator">!</span>article<span class="token punctuation">.</span>target<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token string">&quot;Baeldung&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">counting</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n  <span class="token class-name">List</span><span class="token operator">::</span><span class="token function">of</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertThat</span><span class="token punctuation">(</span>countedArticles<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertThat</span><span class="token punctuation">(</span>countedArticles<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-使用重叠结果的-teeing" tabindex="-1"><a class="header-anchor" href="#_3-2-使用重叠结果的-teeing"><span>3.2. 使用重叠结果的_teeing_</span></a></h3><p>这种解决方案与之前的区别在于一个重要的不同之处。我们之前创建的组没有重叠，源流中的每个元素最多属于一个组。使用_teeing_，我们不再受此限制，因为每个收集器可能处理整个流。让我们看看如何利用它。</p><p>我们可能想要将文章分成两组，一组只有精选文章，另一组只有Baeldung文章。结果的文章集合可能会重叠，因为一篇文章可以同时是精选的并且针对Baeldung。</p><p>这次我们不是计数，而是将它们收集到列表中：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span><span class="token operator">&lt;</span><span class="token class-name">List</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Article</span><span class="token punctuation">&gt;</span></span>``````<span class="token operator">&gt;</span> groupedArticles <span class="token operator">=</span> articles<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">teeing</span><span class="token punctuation">(</span>\n  <span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">filtering</span><span class="token punctuation">(</span>article <span class="token operator">-&gt;</span> article<span class="token punctuation">.</span>target<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token string">&quot;Baeldung&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n  <span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">filtering</span><span class="token punctuation">(</span>article <span class="token operator">-&gt;</span> article<span class="token punctuation">.</span>featured<span class="token punctuation">,</span> <span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n  <span class="token class-name">List</span><span class="token operator">::</span><span class="token function">of</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token function">assertThat</span><span class="token punctuation">(</span>groupedArticles<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">hasSize</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertThat</span><span class="token punctuation">(</span>groupedArticles<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">hasSize</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token function">assertThat</span><span class="token punctuation">(</span>groupedArticles<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">containsExactly</span><span class="token punctuation">(</span>\n  <span class="token keyword">new</span> <span class="token class-name">Article</span><span class="token punctuation">(</span><span class="token string">&quot;Baeldung&quot;</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n  <span class="token keyword">new</span> <span class="token class-name">Article</span><span class="token punctuation">(</span><span class="token string">&quot;Baeldung&quot;</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertThat</span><span class="token punctuation">(</span>groupedArticles<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">containsExactly</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Article</span><span class="token punctuation">(</span><span class="token string">&quot;Baeldung&quot;</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-使用rxjava" tabindex="-1"><a class="header-anchor" href="#_4-使用rxjava"><span>4. 使用RxJava</span></a></h2><p>虽然Java的流API是一个有用的工具，但有时它还不够。其他解决方案，如RxJava提供的响应式流，可能能够帮助我们。让我们看看如何使用一个_Observable_和多个_Subscribers_来实现与我们的_Stream_示例相同的结果。</p><h3 id="_4-1-创建一个-observable" tabindex="-1"><a class="header-anchor" href="#_4-1-创建一个-observable"><span>4.1. 创建一个_Observable_</span></a></h3><p><strong>首先，我们需要从我们的文章列表创建一个_Observable_实例。</strong> 我们可以使用_Observable_类的_from_工厂方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Observable</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Article</span><span class="token punctuation">&gt;</span></span>`````` observableArticles <span class="token operator">=</span> <span class="token class-name">Observable</span><span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span>articles<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_4-2-过滤-observables" tabindex="-1"><a class="header-anchor" href="#_4-2-过滤-observables"><span>4.2. 过滤_Observables_</span></a></h3><p>接下来，我们需要创建将过滤文章的_Observables_。为此，我们将使用_Observable_类的_filter_方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Observable</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Article</span><span class="token punctuation">&gt;</span></span>`````` baeldungObservable <span class="token operator">=</span> observableArticles<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>\n  article <span class="token operator">-&gt;</span> article<span class="token punctuation">.</span>target<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token string">&quot;Baeldung&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">Observable</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Article</span><span class="token punctuation">&gt;</span></span>`````` featuredObservable <span class="token operator">=</span> observableArticles<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>\n  article <span class="token operator">-&gt;</span> article<span class="token punctuation">.</span>featured<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-3-创建多个-subscribers" tabindex="-1"><a class="header-anchor" href="#_4-3-创建多个-subscribers"><span>4.3. 创建多个_Subscribers_</span></a></h3><p><strong>最后，我们需要订阅_Observables_并提供一个_Action_，描述我们想要对文章做什么。</strong> 一个现实世界的例子可能是将它们保存在数据库中或发送给客户端，但我们将只添加到列表中：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Article</span><span class="token punctuation">&gt;</span></span>`````` baeldungArticles <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">List</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Article</span><span class="token punctuation">&gt;</span></span>`````` featuredArticles <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nbaeldungObservable<span class="token punctuation">.</span><span class="token function">subscribe</span><span class="token punctuation">(</span>baeldungArticles<span class="token operator">::</span><span class="token function">add</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nfeaturedObservable<span class="token punctuation">.</span><span class="token function">subscribe</span><span class="token punctuation">(</span>featuredArticles<span class="token operator">::</span><span class="token function">add</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本教程中，我们学习了如何将流分组并分别处理它们。首先，我们看了旧的流API方法：<em>groupingBy_和_partitionBy</em>。接下来，我们使用了Java 12中引入的_teeing_方法。最后，我们看到了如何使用RxJava以更大的灵活性实现类似的结果。</p><p>一如既往，源代码可以在GitHub上找到。</p>',46),o=[e];function c(l,i){return a(),s("div",null,o)}const k=n(p,[["render",c],["__file","2024-07-17-How to Split a Stream into Multiple Streams.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-17/2024-07-17-How%20to%20Split%20a%20Stream%20into%20Multiple%20Streams.html","title":"如何将一个流分割成多个流 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Streams"],"tag":["Java","Streams","Collectors","RxJava"],"head":[["meta",{"name":"keywords","content":"Java Streams, Collectors, RxJava"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-17/2024-07-17-How%20to%20Split%20a%20Stream%20into%20Multiple%20Streams.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"如何将一个流分割成多个流 | Baeldung"}],["meta",{"property":"og:description","content":"如何将一个流分割成多个流 | Baeldung 1. 概述 Java的流API是一个强大且多功能的工具，用于处理数据。根据定义，流操作是对一组数据进行单次迭代。 然而，有时我们希望以不同的方式处理流的一部分，并得到多组结果。 在本教程中，我们将学习如何将流分割成多个组并独立处理它们。 2. 使用收集器 一个流应该只操作一次，并有一个终端操作。 它可以有..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-17T12:08:18.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Streams"}],["meta",{"property":"article:tag","content":"Collectors"}],["meta",{"property":"article:tag","content":"RxJava"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-17T12:08:18.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"如何将一个流分割成多个流 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-17T12:08:18.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"如何将一个流分割成多个流 | Baeldung 1. 概述 Java的流API是一个强大且多功能的工具，用于处理数据。根据定义，流操作是对一组数据进行单次迭代。 然而，有时我们希望以不同的方式处理流的一部分，并得到多组结果。 在本教程中，我们将学习如何将流分割成多个组并独立处理它们。 2. 使用收集器 一个流应该只操作一次，并有一个终端操作。 它可以有..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 使用收集器","slug":"_2-使用收集器","link":"#_2-使用收集器","children":[{"level":3,"title":"2.1. 使用_partitioningBy_进行二元分割","slug":"_2-1-使用-partitioningby-进行二元分割","link":"#_2-1-使用-partitioningby-进行二元分割","children":[]},{"level":3,"title":"2.2. 使用_groupingBy_进行分割","slug":"_2-2-使用-groupingby-进行分割","link":"#_2-2-使用-groupingby-进行分割","children":[]}]},{"level":2,"title":"3. 使用_teeing_","slug":"_3-使用-teeing","link":"#_3-使用-teeing","children":[{"level":3,"title":"3.1. 使用_Predicate_进行_teeing_","slug":"_3-1-使用-predicate-进行-teeing","link":"#_3-1-使用-predicate-进行-teeing","children":[]},{"level":3,"title":"3.2. 使用重叠结果的_teeing_","slug":"_3-2-使用重叠结果的-teeing","link":"#_3-2-使用重叠结果的-teeing","children":[]}]},{"level":2,"title":"4. 使用RxJava","slug":"_4-使用rxjava","link":"#_4-使用rxjava","children":[{"level":3,"title":"4.1. 创建一个_Observable_","slug":"_4-1-创建一个-observable","link":"#_4-1-创建一个-observable","children":[]},{"level":3,"title":"4.2. 过滤_Observables_","slug":"_4-2-过滤-observables","link":"#_4-2-过滤-observables","children":[]},{"level":3,"title":"4.3. 创建多个_Subscribers_","slug":"_4-3-创建多个-subscribers","link":"#_4-3-创建多个-subscribers","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1721218098000,"updatedTime":1721218098000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.76,"words":1428},"filePathRelative":"posts/baeldung/2024-07-17/2024-07-17-How to Split a Stream into Multiple Streams.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>如何将一个流分割成多个流 | Baeldung</h1>\\n<h2>1. 概述</h2>\\n<p>Java的流API是一个强大且多功能的工具，用于处理数据。根据定义，流操作是对一组数据进行单次迭代。</p>\\n<p>然而，有时我们希望以不同的方式处理流的一部分，并得到多组结果。</p>\\n<p>在本教程中，我们将学习如何将流分割成多个组并独立处理它们。</p>\\n<h2>2. 使用收集器</h2>\\n<p><strong>一个流应该只操作一次，并有一个终端操作。</strong> 它可以有多个中间操作，但在关闭之前只能收集一次数据。</p>\\n<p>这意味着流API规范明确禁止将流分叉，并为每个分叉有不同的中间操作。这将导致多个终端操作。然而，我们可以在终端操作中分割流。这会创建一个分成两组或多组的结果。</p>","autoDesc":true}');export{k as comp,d as data};
