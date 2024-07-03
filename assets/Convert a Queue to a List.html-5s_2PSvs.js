import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as t}from"./app-BX3-P94R.js";const e={},p=t('<h1 id="java中将队列转换为列表" tabindex="-1"><a class="header-anchor" href="#java中将队列转换为列表"><span>Java中将队列转换为列表</span></a></h1><p>在本教程中，我们将学习如何在Java中将队列对象转换为列表。</p><p>我们将解释几种流行的方法及其实现方式，并在每个部分结束时提供一个测试用例来测试相应的实现。</p><p>在这一部分，我们将使用标准Java类和方法介绍不同的将队列转换为列表的方法。我们假设所有示例中的队列都不为null。</p><h3 id="_2-1-使用arraylist构造器" tabindex="-1"><a class="header-anchor" href="#_2-1-使用arraylist构造器"><span>2.1 使用ArrayList构造器</span></a></h3><p>ArrayList构造器提供了将队列转换为ArrayList的最简单和最常见的方法。</p><p><strong>基本思想是将队列作为参数传递给ArrayList构造器</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>````` list <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span>queue<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>构造器<code>new ArrayList&lt;&gt;(queue)</code>有效地将队列中的所有元素插入到新的ArrayList中。</p><h3 id="_2-2-使用addall-方法" tabindex="-1"><a class="header-anchor" href="#_2-2-使用addall-方法"><span>2.2 使用addAll()方法</span></a></h3><p>addAll()方法是另一个值得考虑的选项，如果我们想要将队列转换为列表。</p><p>顾名思义，<strong>此方法允许将指定集合中的所有元素添加到列表中</strong>。</p><p>现在，让我们看看逻辑：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>````` list <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nlist<span class="token punctuation">.</span><span class="token function">addAll</span><span class="token punctuation">(</span>queue<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>我们创建一个新的名为list的列表，并使用addAll()方法使用队列的元素填充它。然后该方法返回结果列表。</p><h3 id="_2-3-使用linkedlist构造器" tabindex="-1"><a class="header-anchor" href="#_2-3-使用linkedlist构造器"><span>2.3 使用LinkedList构造器</span></a></h3><p>LinkedList构造器提供了将队列转换为LinkedList的最常见和最简单的方法。</p><p>类似于上面使用ArrayList构造器的例子，<strong>我们只需将队列作为参数传递给LinkedList构造器</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">LinkedList</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>````` list <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LinkedList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span>queue<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>构造器<code>new LinkedList&lt;&gt;(queue)</code>有效地将队列元素转换为新的LinkedList。</p><h3 id="_2-4-使用stream-api" tabindex="-1"><a class="header-anchor" href="#_2-4-使用stream-api"><span>2.4 使用Stream API</span></a></h3><p>Java 8带来了许多新功能，帮助我们增强代码。在这些特性中，我们发现了Stream API。</p><p>让我们说明如何使用stream API将队列转换为列表：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>````` list <span class="token operator">=</span> queue<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>**我们使用collect(Collectors.toList())操作将队列转换为列表，该操作将流中的元素收集到一个新列表中并返回它。**这种方法利用了流的简洁和函数式编程风格来执行转换。</p><h3 id="_2-5-使用guava" tabindex="-1"><a class="header-anchor" href="#_2-5-使用guava"><span>2.5 使用Guava</span></a></h3><p>Guava是由Google开发的流行的开源库，它提供了一系列实用类和方法，以简化Java中的常见编程任务。</p><p>让我们使用Guava将队列转换为列表：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>````` list <span class="token operator">=</span> <span class="token class-name">Lists</span><span class="token punctuation">.</span><span class="token function">newArrayList</span><span class="token punctuation">(</span>queue<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>Guava的实用方法Lists.newArrayList(queue)简化了从队列元素创建新列表的过程。</strong></p><h2 id="_3-结论" tabindex="-1"><a class="header-anchor" href="#_3-结论"><span>3 结论</span></a></h2><p>在本文中，我们看到了Java中将队列转换为列表的多种方式。无论我们喜欢LinkedList的简单性、ArrayList的多功能性、Java 8流的优雅性，还是Guava的强大功能，了解这些技术使我们能够在Java项目中无缝处理数据。我们可以试验这些方法，找到最适合我们需求和编码风格的方法。</p><p>所有这些示例的源代码都可以在GitHub上找到。</p><p>文章发布后30天内开放评论。对于此日期之后的任何问题，请使用网站上的联系表单。</p>',34),l=[p];function i(c,o){return s(),n("div",null,l)}const d=a(e,[["render",i],["__file","Convert a Queue to a List.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/Archive/Convert%20a%20Queue%20to%20a%20List.html","title":"Java中将队列转换为列表","lang":"zh-CN","frontmatter":{"date":"2024-06-16T00:00:00.000Z","category":["Java"],"tag":["队列","列表"],"description":"Java中将队列转换为列表 在本教程中，我们将学习如何在Java中将队列对象转换为列表。 我们将解释几种流行的方法及其实现方式，并在每个部分结束时提供一个测试用例来测试相应的实现。 在这一部分，我们将使用标准Java类和方法介绍不同的将队列转换为列表的方法。我们假设所有示例中的队列都不为null。 2.1 使用ArrayList构造器 ArrayLis...","head":[["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/Convert%20a%20Queue%20to%20a%20List.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中将队列转换为列表"}],["meta",{"property":"og:description","content":"Java中将队列转换为列表 在本教程中，我们将学习如何在Java中将队列对象转换为列表。 我们将解释几种流行的方法及其实现方式，并在每个部分结束时提供一个测试用例来测试相应的实现。 在这一部分，我们将使用标准Java类和方法介绍不同的将队列转换为列表的方法。我们假设所有示例中的队列都不为null。 2.1 使用ArrayList构造器 ArrayLis..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"队列"}],["meta",{"property":"article:tag","content":"列表"}],["meta",{"property":"article:published_time","content":"2024-06-16T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中将队列转换为列表\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-16T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]]},"headers":[{"level":3,"title":"2.1 使用ArrayList构造器","slug":"_2-1-使用arraylist构造器","link":"#_2-1-使用arraylist构造器","children":[]},{"level":3,"title":"2.2 使用addAll()方法","slug":"_2-2-使用addall-方法","link":"#_2-2-使用addall-方法","children":[]},{"level":3,"title":"2.3 使用LinkedList构造器","slug":"_2-3-使用linkedlist构造器","link":"#_2-3-使用linkedlist构造器","children":[]},{"level":3,"title":"2.4 使用Stream API","slug":"_2-4-使用stream-api","link":"#_2-4-使用stream-api","children":[]},{"level":3,"title":"2.5 使用Guava","slug":"_2-5-使用guava","link":"#_2-5-使用guava","children":[]},{"level":2,"title":"3 结论","slug":"_3-结论","link":"#_3-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":2.67,"words":801},"filePathRelative":"posts/baeldung/Archive/Convert a Queue to a List.md","localizedDate":"2024年6月16日","excerpt":"\\n<p>在本教程中，我们将学习如何在Java中将队列对象转换为列表。</p>\\n<p>我们将解释几种流行的方法及其实现方式，并在每个部分结束时提供一个测试用例来测试相应的实现。</p>\\n<p>在这一部分，我们将使用标准Java类和方法介绍不同的将队列转换为列表的方法。我们假设所有示例中的队列都不为null。</p>\\n<h3>2.1 使用ArrayList构造器</h3>\\n<p>ArrayList构造器提供了将队列转换为ArrayList的最简单和最常见的方法。</p>\\n<p><strong>基本思想是将队列作为参数传递给ArrayList构造器</strong>：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token class-name\\">List</span>`````<span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">String</span><span class=\\"token punctuation\\">&gt;</span></span>````` list <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">ArrayList</span><span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token punctuation\\">&gt;</span></span><span class=\\"token punctuation\\">(</span>queue<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n</code></pre></div>","autoDesc":true}');export{d as comp,k as data};
