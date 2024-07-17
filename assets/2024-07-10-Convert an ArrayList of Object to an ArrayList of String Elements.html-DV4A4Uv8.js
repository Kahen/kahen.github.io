import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-YddbDb53.js";const p={},e=t('<h1 id="将arraylist-object-转换为arraylist-string-的不同方法" tabindex="-1"><a class="header-anchor" href="#将arraylist-object-转换为arraylist-string-的不同方法"><span>将ArrayList<code>&lt;Object&gt;</code>转换为ArrayList<code>&lt;String&gt;</code>的不同方法</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>在本文中，我们将探讨不同方式，将给定的ArrayList<code>&lt;Object&gt;</code>转换为ArrayList<code>&lt;String&gt;</code>。</p><h2 id="_2-问题陈述" tabindex="-1"><a class="header-anchor" href="#_2-问题陈述"><span>2. 问题陈述</span></a></h2><p>让我们在这里理解问题陈述。假设我们有一个ArrayList<code>&lt;Object&gt;</code>，其中的对象可以是任何类型，从自动装箱的基本类型如Integer、Float或Boolean，到非基本的引用类型如String、ArrayList、HashMap，甚至是自定义定义的类。<strong>我们必须编写代码将上述列表转换为ArrayList<code>&lt;String&gt;</code></strong>。让我们看一些例子：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Example</span> <span class="token number">1</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">]</span>\n<span class="token class-name">Output</span> <span class="token number">1</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;1&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;2&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;3&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;4&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;5&quot;</span><span class="token punctuation">]</span>\n\n<span class="token class-name">Example</span> <span class="token number">2</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;Hello&quot;</span><span class="token punctuation">,</span> <span class="token number">4.9837</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">19837338737</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">]</span>\n<span class="token class-name">Output</span> <span class="token number">2</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;Hello&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;4.9837&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;-19837338737&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;true&quot;</span><span class="token punctuation">]</span>\n\n<span class="token class-name">Example</span> <span class="token number">3</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Double</span><span class="token punctuation">(</span><span class="token number">7699.05</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token string">&quot;John Doe&quot;</span><span class="token punctuation">)</span><span class="token punctuation">]</span>\n<span class="token class-name">Output</span> <span class="token number">3</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;Node (x=1, y=4)&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;7699.05&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;User (full name=John Doe)&quot;</span><span class="token punctuation">]</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以在输入列表中提供各种不同的对象，包括自定义定义的类如User和Node，如下所示。<strong>假设这些类有一个重写的toString()方法</strong>。如果没有定义该方法，将调用Object类的toString()，它将生成如下输出：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Node</span><span class="token annotation punctuation">@f6d9f0</span><span class="token punctuation">,</span> <span class="token class-name">User</span><span class="token annotation punctuation">@u8g0f9</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上述示例包含自定义定义的类User和Node的实例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">User</span> <span class="token punctuation">{</span>\n    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">String</span> fullName<span class="token punctuation">;</span>\n\n    <span class="token comment">// getters and setters</span>\n\n    <span class="token annotation punctuation">@Override</span>\n    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token string">&quot;User (&quot;</span> <span class="token operator">+</span> <span class="token string">&quot;full name=&#39;&quot;</span> <span class="token operator">+</span> fullName <span class="token operator">+</span> <span class="token string">&quot;&#39;)&quot;</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Node</span> <span class="token punctuation">{</span>\n    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token keyword">int</span> x<span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token keyword">int</span> y<span class="token punctuation">;</span>\n\n    <span class="token comment">// getters and setters</span>\n\n    <span class="token annotation punctuation">@Override</span>\n    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token string">&quot;Node (&quot;</span> <span class="token operator">+</span> <span class="token string">&quot;x=&quot;</span> <span class="token operator">+</span> x <span class="token operator">+</span> <span class="token string">&quot;, y=&quot;</span> <span class="token operator">+</span> y <span class="token operator">+</span> <span class="token string">&quot;)&quot;</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，假设在剩余部分中，变量inputList和expectedStringList包含对我们期望的输入和输出列表的引用：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span>````` inputList <span class="token operator">=</span> <span class="token class-name">List</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span>\n                        <span class="token number">1</span><span class="token punctuation">,</span>\n                        <span class="token boolean">true</span><span class="token punctuation">,</span>\n                        <span class="token string">&quot;hello&quot;</span><span class="token punctuation">,</span>\n                        <span class="token class-name">Double</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span><span class="token number">273773.98</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n                        <span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n                        <span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token string">&quot;John Doe&quot;</span><span class="token punctuation">)</span>\n                    <span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>```````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``````````` expectedStringList <span class="token operator">=</span> <span class="token class-name">List</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span>\n                        <span class="token string">&quot;1&quot;</span><span class="token punctuation">,</span>\n                        <span class="token string">&quot;true&quot;</span><span class="token punctuation">,</span>\n                        <span class="token string">&quot;hello&quot;</span><span class="token punctuation">,</span>\n                        <span class="token class-name">Double</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token number">273773.98</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n                        <span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n                        <span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token string">&quot;John Doe&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n                    <span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-使用java-collections-for-each循环进行转换" tabindex="-1"><a class="header-anchor" href="#_3-使用java-collections-for-each循环进行转换"><span>3. 使用Java Collections For-Each循环进行转换</span></a></h2><p>让我们尝试使用Java Collections来解决我们的问题。我们的想法是遍历列表的元素，并将每个元素转换为String。完成后，我们就有了一个String对象的列表。在以下代码中，我们使用for-each循环遍历给定的列表，并显式地通过调用它的toString()将每个对象转换为String：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>```````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``````````` outputList <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span>inputList<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token class-name">Object</span> obj <span class="token operator">:</span> inputList<span class="token punctuation">)</span><span class="token punctuation">{</span>\n    outputList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>obj<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n<span class="token class-name">Assert</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span>expectedStringList<span class="token punctuation">,</span> outputList<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个解决方案适用于输入列表中的所有对象组合，并且在Java 5以上的所有Java版本上都有效。<strong>然而，上述解决方案对输入中的null对象并不免疫，并且在遇到null时会抛出NullPointerException</strong>。一个简单的增强是使用Java 7中引入的Objects实用类的toString()方法，它是null安全的：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>```````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``````````` outputList <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span>inputList<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token class-name">Object</span> obj <span class="token operator">:</span> inputList<span class="token punctuation">)</span><span class="token punctuation">{</span>\n    outputList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token class-name">Objects</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n<span class="token class-name">Assert</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span>expectedStringList<span class="token punctuation">,</span> outputList<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-使用java-streams进行转换" tabindex="-1"><a class="header-anchor" href="#_4-使用java-streams进行转换"><span>4. 使用Java Streams进行转换</span></a></h2><p>我们也可以利用Java Streams API来解决我们的问题。我们首先通过应用stream()方法将inputList，我们的数据源，转换为流。<strong>一旦我们有了元素的流，这些元素的类型是Object，我们需要一个中间操作，在我们的情况下是执行对象到字符串的转换，最后，是一个终端操作，即将结果收集到另一个String类型的列表中。</strong></p><p>在我们的情况下，中间操作是一个map()操作，它采用一个lambda表达式：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token punctuation">(</span>obj<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token class-name">Objects</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>最后，我们的流需要一个终端操作来编译并返回所需的列表。在下面的小节中，我们将讨论我们可以使用的不同终端操作。</p><h3 id="_4-1-使用collectors-tolist-作为终端操作" tabindex="-1"><a class="header-anchor" href="#_4-1-使用collectors-tolist-作为终端操作"><span>4.1. 使用Collectors.toList()作为终端操作</span></a></h3><p>在这种方法中，我们使用Collectors.toList()将由中间操作生成的流收集到输出列表中：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>```````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``````````` outputList<span class="token punctuation">;</span>\noutputList <span class="token operator">=</span> inputList\n    <span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n    <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token class-name">Objects</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n    <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">Assert</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span>expectedStringList<span class="token punctuation">,</span> outputList<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种方法适用于Java 8及以上版本，因为Streams API是在Java 8中引入的。这里产生的输出列表是可变的，这意味着我们可以向其中添加元素。输出列表也可以包含null值。</p><h3 id="_4-2-使用collectors-tounmodifablelist-作为终端操作-java-10兼容方法" tabindex="-1"><a class="header-anchor" href="#_4-2-使用collectors-tounmodifablelist-作为终端操作-java-10兼容方法"><span>4.2. 使用Collectors.toUnmodifableList()作为终端操作 - Java 10兼容方法</span></a></h3><p>如果我们想要生成一个不可修改的String对象的输出列表，我们可以利用Java 10中引入的Collectors.toUnmodifableList()实现：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>```````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``````````` outputList<span class="token punctuation">;</span>\noutputList <span class="token operator">=</span> inputList\n    <span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n    <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token class-name">Objects</span><span class="token operator">::</span><span class="token function">nonNull</span><span class="token punctuation">)</span>\n    <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token class-name">Objects</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n    <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toUnmodifiableList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">Assert</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span>expectedStringListWithoutNull<span class="token punctuation">,</span> outputList<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里的一个重要注意事项是列表不能包含null值，因此，如果inputList包含null，则此代码会产生NullPointerException。这就是为什么我们在应用操作之前添加了一个过滤器，以从流中选择非null元素。outputList是不可变的，如果稍后有尝试修改它，将会产生UnsupportedOperationException。</p><h3 id="_4-3-使用tolist-作为终端操作-java-16兼容方法" tabindex="-1"><a class="header-anchor" href="#_4-3-使用tolist-作为终端操作-java-16兼容方法"><span>4.3. 使用toList()作为终端操作 - Java 16兼容方法</span></a></h3><p>如果我们想直接从输入Stream创建一个不可修改的列表，但我们想允许结果列表中包含null值，我们可以使用在Java 16中引入的Stream接口的toList()方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>```````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``````````` outputList<span class="token punctuation">;</span>\noutputList <span class="token operator">=</span> inputList\n    <span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n    <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token class-name">Objects</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n    <span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">Assert</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span>expectedStringList<span class="token punctuation">,</span> outputList<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-使用guava进行转换" tabindex="-1"><a class="header-anchor" href="#_5-使用guava进行转换"><span>5. 使用Guava进行转换</span></a></h2><p>我们可以使用Google Guava库将输入对象列表转换为新的String列表。</p><h3 id="_5-1-maven配置" tabindex="-1"><a class="header-anchor" href="#_5-1-maven配置"><span>5.1. Maven配置</span></a></h3><p>要使用Google Guava库，我们需要在pom.xml中包含相应的Maven依赖项：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>`com.google.guava`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>`guava`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>`33.0.0-jre`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">&gt;</span></span>`test`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">&gt;</span></span>`\n`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>依赖项的最新版本可以从Maven Central获取。</p><h3 id="_5-2-使用lists-transform" tabindex="-1"><a class="header-anchor" href="#_5-2-使用lists-transform"><span>5.2. 使用Lists.transform()</span></a></h3><p>我们可以使用Google Guava Lists类的transform()方法。它接受inputList和上述lambda表达式，以生成String对象的outputList：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>```````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``````````` outputList<span class="token punctuation">;</span>\noutputList <span class="token operator">=</span> <span class="token class-name">Lists</span><span class="token punctuation">.</span><span class="token function">transform</span><span class="token punctuation">(</span>inputList<span class="token punctuation">,</span> obj <span class="token operator">-&gt;</span> <span class="token class-name">Objects</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">Assert</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span>expectedStringList<span class="token punctuation">,</span> outputList<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用这种方法，输出列表可以包含null值。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们探讨了几种不同的方法，将ArrayList<code>&lt;Object&gt;</code>元素转换为ArrayList<code>&lt;String&gt;</code>。我们从基于for-each循环的方法探索到基于Java Streams的方法。我们还查看了特定于不同Java版本的不同实现，以及一个来自Guava的实现。像往常一样，所有代码示例都可以在GitHub上找到。</p><p>OK</p>',47),o=[e];function c(l,i){return a(),s("div",null,o)}const k=n(p,[["render",c],["__file","2024-07-10-Convert an ArrayList of Object to an ArrayList of String Elements.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-10/2024-07-10-Convert%20an%20ArrayList%20of%20Object%20to%20an%20ArrayList%20of%20String%20Elements.html","title":"将ArrayList<Object>转换为ArrayList<String>的不同方法","lang":"zh-CN","frontmatter":{"date":"2023-04-06T00:00:00.000Z","category":["Java"],"tag":["ArrayList","String","Collections","Streams","Guava"],"head":[["meta",{"name":"keywords","content":"Java, ArrayList, String, Collections, Streams, Guava, 转换, 集合, 列表"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-10/2024-07-10-Convert%20an%20ArrayList%20of%20Object%20to%20an%20ArrayList%20of%20String%20Elements.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"将ArrayList<Object>转换为ArrayList<String>的不同方法"}],["meta",{"property":"og:description","content":"将ArrayList<Object>转换为ArrayList<String>的不同方法 1. 引言 在本文中，我们将探讨不同方式，将给定的ArrayList<Object>转换为ArrayList<String>。 2. 问题陈述 让我们在这里理解问题陈述。假设我们有一个ArrayList<Object>，其中的对象可以是任何类型，从自动装箱的基本类型..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-10T11:36:31.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"ArrayList"}],["meta",{"property":"article:tag","content":"String"}],["meta",{"property":"article:tag","content":"Collections"}],["meta",{"property":"article:tag","content":"Streams"}],["meta",{"property":"article:tag","content":"Guava"}],["meta",{"property":"article:published_time","content":"2023-04-06T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-10T11:36:31.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"将ArrayList<Object>转换为ArrayList<String>的不同方法\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-04-06T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-10T11:36:31.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"将ArrayList<Object>转换为ArrayList<String>的不同方法 1. 引言 在本文中，我们将探讨不同方式，将给定的ArrayList<Object>转换为ArrayList<String>。 2. 问题陈述 让我们在这里理解问题陈述。假设我们有一个ArrayList<Object>，其中的对象可以是任何类型，从自动装箱的基本类型..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 问题陈述","slug":"_2-问题陈述","link":"#_2-问题陈述","children":[]},{"level":2,"title":"3. 使用Java Collections For-Each循环进行转换","slug":"_3-使用java-collections-for-each循环进行转换","link":"#_3-使用java-collections-for-each循环进行转换","children":[]},{"level":2,"title":"4. 使用Java Streams进行转换","slug":"_4-使用java-streams进行转换","link":"#_4-使用java-streams进行转换","children":[{"level":3,"title":"4.1. 使用Collectors.toList()作为终端操作","slug":"_4-1-使用collectors-tolist-作为终端操作","link":"#_4-1-使用collectors-tolist-作为终端操作","children":[]},{"level":3,"title":"4.2. 使用Collectors.toUnmodifableList()作为终端操作 - Java 10兼容方法","slug":"_4-2-使用collectors-tounmodifablelist-作为终端操作-java-10兼容方法","link":"#_4-2-使用collectors-tounmodifablelist-作为终端操作-java-10兼容方法","children":[]},{"level":3,"title":"4.3. 使用toList()作为终端操作 - Java 16兼容方法","slug":"_4-3-使用tolist-作为终端操作-java-16兼容方法","link":"#_4-3-使用tolist-作为终端操作-java-16兼容方法","children":[]}]},{"level":2,"title":"5. 使用Guava进行转换","slug":"_5-使用guava进行转换","link":"#_5-使用guava进行转换","children":[{"level":3,"title":"5.1. Maven配置","slug":"_5-1-maven配置","link":"#_5-1-maven配置","children":[]},{"level":3,"title":"5.2. 使用Lists.transform()","slug":"_5-2-使用lists-transform","link":"#_5-2-使用lists-transform","children":[]}]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1720611391000,"updatedTime":1720611391000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.05,"words":1515},"filePathRelative":"posts/baeldung/2024-07-10/2024-07-10-Convert an ArrayList of Object to an ArrayList of String Elements.md","localizedDate":"2023年4月6日","excerpt":"\\n<h2>1. 引言</h2>\\n<p>在本文中，我们将探讨不同方式，将给定的ArrayList<code>&lt;Object&gt;</code>转换为ArrayList<code>&lt;String&gt;</code>。</p>\\n<h2>2. 问题陈述</h2>\\n<p>让我们在这里理解问题陈述。假设我们有一个ArrayList<code>&lt;Object&gt;</code>，其中的对象可以是任何类型，从自动装箱的基本类型如Integer、Float或Boolean，到非基本的引用类型如String、ArrayList、HashMap，甚至是自定义定义的类。<strong>我们必须编写代码将上述列表转换为ArrayList<code>&lt;String&gt;</code></strong>。让我们看一些例子：</p>","autoDesc":true}');export{k as comp,d as data};
