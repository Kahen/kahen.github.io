import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-DkA39C0B.js";const p={},e=t('<h1 id="java中使用零值或空值初始化arraylist的方法" tabindex="-1"><a class="header-anchor" href="#java中使用零值或空值初始化arraylist的方法"><span>Java中使用零值或空值初始化ArrayList的方法</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在本教程中，我们将探索使用Java ArrayList初始化所有值为null或零的不同方法。我们也可以按照我们的喜好进行初始化，并将列表初始化为不同的数值或对象。</p><h2 id="_2-使用for循环" tabindex="-1"><a class="header-anchor" href="#_2-使用for循环"><span>2. 使用for循环</span></a></h2><p>当考虑使用所需值或对象初始化ArrayList的问题时，我们首先想到的解决方案是使用简单的for循环。理所当然，这是一个直接可行的解决方案：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">ArrayList</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>``````` arrayList <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    arrayList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token comment">// arrayList.add(0);</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们声明一个空的ArrayList，并使用add()方法进行循环。</p><h2 id="_3-使用arraylist构造器方法" tabindex="-1"><a class="header-anchor" href="#_3-使用arraylist构造器方法"><span>3. 使用ArrayList构造器方法</span></a></h2><p>另一种可能不太为人所知的方法是使用ArrayList类的构造器之一。这需要一个集合作为参数，并构造一个新的ArrayList，其中包含指定列表中元素的顺序，这些元素是集合的迭代器返回的。<strong>为了向我们的构造器提供所需的列表，我们将使用Collections类的nCopies()函数。</strong> 这个函数接受项目和所需副本数作为参数。我们还可以编写一个单元测试来检查我们的构造器是否正确工作：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenInitializingListWithNCopies_thenListIsCorrectlyPopulated</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token comment">// when</span>\n    <span class="token class-name">ArrayList</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>``````` list <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token class-name">Collections</span><span class="token punctuation">.</span><span class="token function">nCopies</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token comment">// then</span>\n    <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> list<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertTrue</span><span class="token punctuation">(</span>list<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">allMatch</span><span class="token punctuation">(</span>elem <span class="token operator">-&gt;</span> elem <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们将检查列表是否具有所需数量的元素，以及是所有元素都等于我们要求的值。检查列表元素是否全部相同的方法有多种。在我们的示例中，我们使用Java Stream API的allMatch()函数。</p><h2 id="_4-使用java-stream-api" tabindex="-1"><a class="header-anchor" href="#_4-使用java-stream-api"><span>4. 使用Java Stream API</span></a></h2><p>在上一个示例中，我们使用Java Stream API来确定我们是否正确初始化了列表。但是，Java Stream能够做更多。我们可以使用静态函数generate()根据供应商生成无限数量的元素：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenInitializingListWithStream_thenListIsCorrectlyPopulated</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n\n    <span class="token comment">// when</span>\n    <span class="token class-name">ArrayList</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>``````` listWithZeros <span class="token operator">=</span> <span class="token class-name">Stream</span><span class="token punctuation">.</span><span class="token function">generate</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">limit</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toCollection</span><span class="token punctuation">(</span><span class="token class-name">ArrayList</span><span class="token operator">::</span><span class="token keyword">new</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token class-name">ArrayList</span>`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span>` listWithNulls <span class="token operator">=</span> <span class="token class-name">Stream</span><span class="token punctuation">.</span><span class="token function">generate</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token keyword">null</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">limit</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toCollection</span><span class="token punctuation">(</span><span class="token class-name">ArrayList</span><span class="token operator">::</span><span class="token keyword">new</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token comment">// then</span>\n    <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> listWithZeros<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertTrue</span><span class="token punctuation">(</span>listWithZeros<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">allMatch</span><span class="token punctuation">(</span>elem <span class="token operator">-&gt;</span> elem <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> listWithNulls<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertTrue</span><span class="token punctuation">(</span>listWithNulls<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">allMatch</span><span class="token punctuation">(</span><span class="token class-name">Objects</span><span class="token operator">::</span><span class="token function">isNull</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>limit()函数接受一个数字作为参数。这表示应该限制流的元素数量，该方法返回一个新的Stream，由原始流中挑选出的对象组成。</p><h2 id="_5-使用intstream" tabindex="-1"><a class="header-anchor" href="#_5-使用intstream"><span>5. 使用IntStream</span></a></h2><p><strong>我们可以使用IntStream类使用所需的数值初始化列表。</strong> 这是一个从BaseStream派生的类，像Stream接口一样。这意味着这个类能够做Stream类能做的大部分事情。这个类让我们创建一个原始数字的流。然后我们使用boxed()函数将原始类型包装成对象。之后，我们可以轻松地收集所有生成的数字：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenInitializingListWithIntStream_thenListIsCorrectlyPopulated</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token comment">// when</span>\n    <span class="token class-name">ArrayList</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>``````` list <span class="token operator">=</span> <span class="token class-name">IntStream</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token number">10</span><span class="token punctuation">]</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">boxed</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toCollection</span><span class="token punctuation">(</span><span class="token class-name">ArrayList</span><span class="token operator">::</span><span class="token keyword">new</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token comment">// then</span>\n    <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> list<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertTrue</span><span class="token punctuation">(</span>list<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">allMatch</span><span class="token punctuation">(</span>elem <span class="token operator">-&gt;</span> elem <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们还应该考虑这种方法只适用于插入原始数字。因此，我们不能使用这种方法来初始化列表为null值。</p><h2 id="_6-使用arrays-aslist" tabindex="-1"><a class="header-anchor" href="#_6-使用arrays-aslist"><span>6. 使用Arrays.asList</span></a></h2><p>Arrays.asList()是java.util.Arrays类的一个方法。使用这个方法，我们可以将数组转换为集合。因此，对于这种方法，我们应该初始化一个数组。因为我们的数组在初始化时只包含null值，我们使用fill()方法用我们所需的值0填充它，在我们的例子中。这个方法像nCopies()一样，用给定的参数值填充我们的数组。在用零填充数组之后，我们最终可以使用toList()函数将其转换为列表：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenInitializingListWithAsList_thenListIsCorrectlyPopulated</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token comment">// when</span>\n    <span class="token class-name">Integer</span><span class="token punctuation">[</span><span class="token punctuation">]</span> integers <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Integer</span><span class="token punctuation">[</span><span class="token number">10</span><span class="token punctuation">]</span><span class="token punctuation">;</span>\n    <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">fill</span><span class="token punctuation">(</span>integers<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">List</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>``````` integerList <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span>integers<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token comment">// then</span>\n    <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> integerList<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertTrue</span><span class="token punctuation">(</span>integerList<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">allMatch</span><span class="token punctuation">(</span>elem <span class="token operator">-&gt;</span> elem <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，我们应该考虑我们得到的是一个List而不是一个ArrayList。如果我们尝试向列表中添加一个新元素，我们将得到一个UnsupportedOperationException。这个问题可以通过使用前一节中介绍的方法轻松解决。我们需要将List转换为ArrayList。我们可以通过更改integerList声明来做到这一点：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>``````` integerList <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span>integers<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>此外，我们可以通过删除fill()方法调用来使这种方法向我们的列表添加null值。正如前面所说的，数组默认初始化为null值。</p><h2 id="_7-使用vector类" tabindex="-1"><a class="header-anchor" href="#_7-使用vector类"><span>7. 使用Vector类</span></a></h2><p>像ArrayList类一样，Java Vector类表示一个可增长的对象数组。此外，Vector是一个实现List接口的Java遗留类。所以我们可以很容易地将其转换为列表。然而，尽管这两个实体之间有很多相似之处，它们是不同的，并且有不同的用例。一个相当大的区别是Vector类的所有方法都是同步的。</p><p>Vector在我们问题中的优势是它可以初始化任意数量的元素。除此之外，它的所有元素默认都是null：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenInitializingListWithVector_thenListIsCorrectlyPopulated</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token comment">// when</span>\n    <span class="token class-name">List</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>``````` integerList <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vector</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>```````<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token function">setSize</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">;</span>\n    \n    <span class="token comment">// then</span>\n    <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> integerList<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertTrue</span><span class="token punctuation">(</span>integerList<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">allMatch</span><span class="token punctuation">(</span>elem <span class="token operator">-&gt;</span> elem <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们使用setSize()函数初始化Vector所需的元素数量。之后，Vector将用null值填充自己。我们必须考虑这种方法只帮助我们如果我们想在我们的列表中插入null值。</p><p>我们还可以通过使用ArrayList类的构造器像前面的示例一样或使用addAll()方法将我们新初始化的空ArrayList中的所有元素添加进来，将列表转换为ArrayList。</p><h2 id="_8-结论" tabindex="-1"><a class="header-anchor" href="#_8-结论"><span>8. 结论</span></a></h2><p>在这个快速教程中，我们探索了所有需要用null或0值初始化ArrayList的替代方案。特别是，我们通过使用流、数组、向量或示例循环进行了示例。像往常一样，你可以在GitHub上找到所有的代码样本。</p>',33),o=[e];function c(l,i){return a(),s("div",null,o)}const k=n(p,[["render",c],["__file","2024-07-09-Initialize an ArrayList with Zeroes or Null in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-09/2024-07-09-Initialize%20an%20ArrayList%20with%20Zeroes%20or%20Null%20in%20Java.html","title":"Java中使用零值或空值初始化ArrayList的方法","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","ArrayList"],"tag":["Java","ArrayList","初始化"],"head":[["meta",{"name":"keywords","content":"Java, ArrayList, 初始化, 零值, 空值"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-09/2024-07-09-Initialize%20an%20ArrayList%20with%20Zeroes%20or%20Null%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中使用零值或空值初始化ArrayList的方法"}],["meta",{"property":"og:description","content":"Java中使用零值或空值初始化ArrayList的方法 1. 概述 在本教程中，我们将探索使用Java ArrayList初始化所有值为null或零的不同方法。我们也可以按照我们的喜好进行初始化，并将列表初始化为不同的数值或对象。 2. 使用for循环 当考虑使用所需值或对象初始化ArrayList的问题时，我们首先想到的解决方案是使用简单的for循环..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-09T23:00:55.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"ArrayList"}],["meta",{"property":"article:tag","content":"初始化"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-09T23:00:55.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中使用零值或空值初始化ArrayList的方法\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-09T23:00:55.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中使用零值或空值初始化ArrayList的方法 1. 概述 在本教程中，我们将探索使用Java ArrayList初始化所有值为null或零的不同方法。我们也可以按照我们的喜好进行初始化，并将列表初始化为不同的数值或对象。 2. 使用for循环 当考虑使用所需值或对象初始化ArrayList的问题时，我们首先想到的解决方案是使用简单的for循环..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 使用for循环","slug":"_2-使用for循环","link":"#_2-使用for循环","children":[]},{"level":2,"title":"3. 使用ArrayList构造器方法","slug":"_3-使用arraylist构造器方法","link":"#_3-使用arraylist构造器方法","children":[]},{"level":2,"title":"4. 使用Java Stream API","slug":"_4-使用java-stream-api","link":"#_4-使用java-stream-api","children":[]},{"level":2,"title":"5. 使用IntStream","slug":"_5-使用intstream","link":"#_5-使用intstream","children":[]},{"level":2,"title":"6. 使用Arrays.asList","slug":"_6-使用arrays-aslist","link":"#_6-使用arrays-aslist","children":[]},{"level":2,"title":"7. 使用Vector类","slug":"_7-使用vector类","link":"#_7-使用vector类","children":[]},{"level":2,"title":"8. 结论","slug":"_8-结论","link":"#_8-结论","children":[]}],"git":{"createdTime":1720566055000,"updatedTime":1720566055000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.03,"words":1508},"filePathRelative":"posts/baeldung/2024-07-09/2024-07-09-Initialize an ArrayList with Zeroes or Null in Java.md","localizedDate":"2022年4月1日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>在本教程中，我们将探索使用Java ArrayList初始化所有值为null或零的不同方法。我们也可以按照我们的喜好进行初始化，并将列表初始化为不同的数值或对象。</p>\\n<h2>2. 使用for循环</h2>\\n<p>当考虑使用所需值或对象初始化ArrayList的问题时，我们首先想到的解决方案是使用简单的for循环。理所当然，这是一个直接可行的解决方案：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token class-name\\">ArrayList</span>```````<span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">Integer</span><span class=\\"token punctuation\\">&gt;</span></span>``````` arrayList <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">ArrayList</span><span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token punctuation\\">&gt;</span></span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">for</span> <span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">int</span> i <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span> i <span class=\\"token operator\\">&lt;</span> <span class=\\"token number\\">10</span><span class=\\"token punctuation\\">;</span> i<span class=\\"token operator\\">++</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    arrayList<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">add</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">null</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token comment\\">// arrayList.add(0);</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{k as comp,d as data};
