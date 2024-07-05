import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-C2EXT5sr.js";const p={},e=t('<h1 id="java中将hashmap值转换为arraylist" tabindex="-1"><a class="header-anchor" href="#java中将hashmap值转换为arraylist"><span>Java中将HashMap值转换为ArrayList</span></a></h1><p>在这篇简短的教程中，我们将阐明如何在Java中将HashMap的值转换为ArrayList。</p><p>首先，我们将解释如何使用Java核心方法进行转换。然后，我们将演示如何使用如Guava等外部库来解决我们的核心问题。</p><h3 id="_2-1-使用arraylist构造器" tabindex="-1"><a class="header-anchor" href="#_2-1-使用arraylist构造器"><span>2.1 使用ArrayList构造器</span></a></h3><p>ArrayList构造器提供了将HashMap转换为ArrayList的最常见和最简单的方法。</p><p>这里的基本思想是将HashMap的值作为参数传递给ArrayList构造器：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">ArrayList</span>```````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``````````````` <span class="token function">convertUsingConstructor</span><span class="token punctuation">(</span><span class="token class-name">HashMap</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``````` hashMap<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>hashMap <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span>```````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>```````````````<span class="token punctuation">(</span>hashMap<span class="token punctuation">.</span><span class="token function">values</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如我们所见，我们首先检查我们的HashMap是否为null以使我们的方法安全。然后，我们使用了values()方法，它返回了给定HashMap中包含的值的集合视图。</p><p>现在，让我们使用一个测试用例来确认：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">HashMapToArrayListConverterUtilsUnitTest</span> <span class="token punctuation">{</span>\n\n    <span class="token keyword">private</span> <span class="token class-name">HashMap</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``````` hashMap<span class="token punctuation">;</span>\n\n    <span class="token annotation punctuation">@Before</span>\n    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">beforeEach</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        hashMap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        hashMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">&quot;AAA&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        hashMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">&quot;BBB&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        hashMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token string">&quot;CCC&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        hashMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token string">&quot;DDD&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token annotation punctuation">@Test</span>\n    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenAHashMap_whenConvertUsingConstructor_thenReturnArrayList</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token class-name">ArrayList</span>```````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``````````````` myList <span class="token operator">=</span> <span class="token class-name">HashMapToArrayListConverterUtils</span><span class="token punctuation">.</span><span class="token function">convertUsingConstructor</span><span class="token punctuation">(</span>hashMap<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token function">assertThat</span><span class="token punctuation">(</span>hashMap<span class="token punctuation">.</span><span class="token function">values</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">containsInAnyOrder</span><span class="token punctuation">(</span>myList<span class="token punctuation">.</span><span class="token function">toArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token comment">// ...</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如预期的那样，测试成功通过。</p><h3 id="_2-2-使用addall-方法" tabindex="-1"><a class="header-anchor" href="#_2-2-使用addall-方法"><span>2.2 使用addAll()方法</span></a></h3><p>addAll()方法是另一个很好的选择，如果我们想要将HashMap转换为ArrayList。</p><p>顾名思义，这个方法允许我们将指定集合中的所有元素添加到列表的末尾。</p><p>现在，让我们举例说明addAll()方法的使用：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">ArrayList</span>```````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``````````````` <span class="token function">convertUsingAddAllMethod</span><span class="token punctuation">(</span><span class="token class-name">HashMap</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``````` hashMap<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>hashMap <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token class-name">ArrayList</span>```````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``````````````` arrayList <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span>```````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>```````````````<span class="token punctuation">(</span>hashMap<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    arrayList<span class="token punctuation">.</span><span class="token function">addAll</span><span class="token punctuation">(</span>hashMap<span class="token punctuation">.</span><span class="token function">values</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">return</span> arrayList<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上所示，我们首先以传递的HashMap的大小初始化了ArrayList。然后，我们调用了addAll()方法来追HashMap的所有值。</p><p>再次，让我们添加一个新的测试用例以验证一切是否按预期工作：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenAHashMap_whenConvertUsingAddAllMethod_thenReturnArrayList</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">ArrayList</span>```````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``````````````` myList <span class="token operator">=</span> <span class="token class-name">HashMapToArrayListConverterUtils</span><span class="token punctuation">.</span><span class="token function">convertUsingAddAllMethod</span><span class="token punctuation">(</span>hashMap<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token function">assertThat</span><span class="token punctuation">(</span>hashMap<span class="token punctuation">.</span><span class="token function">values</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">containsInAnyOrder</span><span class="token punctuation">(</span>myList<span class="token punctuation">.</span><span class="token function">toArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>不出所料，测试用例成功通过。</p><h3 id="_2-3-使用stream-api" tabindex="-1"><a class="header-anchor" href="#_2-3-使用stream-api"><span>2.3 使用Stream API</span></a></h3><p>Java 8带来了许多新特性和增强功能。在这些特性中，我们发现了Stream API。</p><p>那么，让我们通过一个实际的例子来说明如何使用流API将HashMap转换为ArrayList：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">ArrayList</span>```````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``````````````` <span class="token function">convertUsingStreamApi</span><span class="token punctuation">(</span><span class="token class-name">HashMap</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``````` hashMap<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>hashMap <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">return</span> hashMap<span class="token punctuation">.</span><span class="token function">values</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toCollection</span><span class="token punctuation">(</span><span class="token class-name">ArrayList</span><span class="token operator">::</span><span class="token keyword">new</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>简而言之，我们从给定HashMap的值创建了一个Stream。然后，我们使用Collectors类的collect()方法来创建一个新的ArrayList，该ArrayList包含我们的Stream中的元素。</p><p>一如既往，让我们使用一个新的测试用例来确认我们的方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenAHashMap_whenConvertUsingStreamApi_thenReturnArrayList</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">ArrayList</span>```````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``````````````` myList <span class="token operator">=</span> <span class="token class-name">HashMapToArrayListConverterUtils</span><span class="token punctuation">.</span><span class="token function">convertUsingStreamApi</span><span class="token punctuation">(</span>hashMap<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token function">assertThat</span><span class="token punctuation">(</span>hashMap<span class="token punctuation">.</span><span class="token function">values</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">containsInAnyOrder</span><span class="token punctuation">(</span>myList<span class="token punctuation">.</span><span class="token function">toArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-4-使用传统的循环" tabindex="-1"><a class="header-anchor" href="#_2-4-使用传统的循环"><span>2.4 使用传统的循环</span></a></h3><p>另外，我们可以使用传统的for循环来实现相同的目标：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">ArrayList</span>```````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``````````````` <span class="token function">convertUsingForLoop</span><span class="token punctuation">(</span><span class="token class-name">HashMap</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``````` hashMap<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>hashMap <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token class-name">ArrayList</span>```````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``````````````` arrayList <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span>```````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>```````````````<span class="token punctuation">(</span>hashMap<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Map<span class="token punctuation">.</span>Entry</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``````` entry <span class="token operator">:</span> hashMap<span class="token punctuation">.</span><span class="token function">entrySet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        arrayList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>entry<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">return</span> arrayList<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如我们所见，我们遍历了HashMap的条目。此外，我们对每个Entry使用了entry.getValue()来获取它的值。然后，我们使用add()方法将返回的值添加到ArrayList中。</p><p>最后，让我们使用另一个测试用例来测试我们的方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenAHashMap_whenConvertUsingForLoop_thenReturnArrayList</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">ArrayList</span>```````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``````````````` myList <span class="token operator">=</span> <span class="token class-name">HashMapToArrayListConverterUtils</span><span class="token punctuation">.</span><span class="token function">convertUsingForLoop</span><span class="token punctuation">(</span>hashMap<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token function">assertThat</span><span class="token punctuation">(</span>hashMap<span class="token punctuation">.</span><span class="token function">values</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">containsInAnyOrder</span><span class="token punctuation">(</span>myList<span class="token punctuation">.</span><span class="token function">toArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-使用guava" tabindex="-1"><a class="header-anchor" href="#_3-使用guava"><span>3. 使用Guava</span></a></h2><p>Guava提供了一套丰富的工具类，简化了诸如集合操作等常见的编程任务。</p><p>首先，我们需要将Guava依赖项添加到pom.xml文件中：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>`com.google.guava`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>`guava`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>`31.0.1-jre`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>`\n`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Guava提供了Lists工具类，主要用于处理列表。那么，让我们在实践中看看它：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">ArrayList</span>```````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``````````````` <span class="token function">convertUsingGuava</span><span class="token punctuation">(</span><span class="token class-name">HashMap</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``````` hashMap<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>hashMap <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n    <span class="token class-name">EntryTransformer</span>`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>` entryMapTransformer <span class="token operator">=</span> <span class="token punctuation">(</span>key<span class="token punctuation">,</span> value<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> value<span class="token punctuation">;</span>\n\n    <span class="token keyword">return</span> <span class="token class-name">Lists</span><span class="token punctuation">.</span><span class="token function">newArrayList</span><span class="token punctuation">(</span><span class="token class-name">Maps</span><span class="token punctuation">.</span><span class="token function">transformEntries</span><span class="token punctuation">(</span>hashMap<span class="token punctuation">,</span> entryMapTransformer<span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">values</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Lists类带有newArrayList()方法，它基于给定的元素创建一个新的ArrayList。</p><p>如上所示，我们使用自定义的EntryTransformer从键值对中获取值。然后，我们将转换器传递给我们的HashMap以及Maps.transformEntries()方法。</p><p>这样，我们告诉Guava从HashMap的值创建一个新的ArrayList。</p><p>最后，我们将为我们的方法添加一个测试用例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenAHashMap_whenConvertUsingGuava_thenReturnArrayList</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">ArrayList</span>```````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``````````````` myList <span class="token operator">=</span> <span class="token class-name">HashMapToArrayListConverterUtils</span><span class="token punctuation">.</span><span class="token function">convertUsingGuava</span><span class="token punctuation">(</span>hashMap<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token function">assertThat</span><span class="token punctuation">(</span>hashMap<span class="token punctuation">.</span><span class="token function">values</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">containsInAnyOrder</span><span class="token punctuation">(</span>myList<span class="token punctuation">.</span><span class="token function">toArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们探讨了在Java中将HashMap转换为ArrayList的不同方法。</p><p>我们查看了一些使用Java核心库的方法。然后，我们展示了如何使用第三方库来完成同样的事情。</p><p>正如往常一样，本文中使用的代码可以在GitHub上找到。</p>',48),c=[e];function o(l,i){return s(),a("div",null,c)}const k=n(p,[["render",o],["__file","2024-06-29-Converting HashMap Values to an ArrayList in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-06-29/2024-06-29-Converting%20HashMap%20Values%20to%20an%20ArrayList%20in%20Java.html","title":"Java中将HashMap值转换为ArrayList","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Collections"],"tag":["HashMap","ArrayList"],"head":[["meta",{"name":"keywords","content":"Java, HashMap, ArrayList, 转换"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-29/2024-06-29-Converting%20HashMap%20Values%20to%20an%20ArrayList%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中将HashMap值转换为ArrayList"}],["meta",{"property":"og:description","content":"Java中将HashMap值转换为ArrayList 在这篇简短的教程中，我们将阐明如何在Java中将HashMap的值转换为ArrayList。 首先，我们将解释如何使用Java核心方法进行转换。然后，我们将演示如何使用如Guava等外部库来解决我们的核心问题。 2.1 使用ArrayList构造器 ArrayList构造器提供了将HashMap转换..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-29T21:28:08.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"HashMap"}],["meta",{"property":"article:tag","content":"ArrayList"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-29T21:28:08.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中将HashMap值转换为ArrayList\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-29T21:28:08.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中将HashMap值转换为ArrayList 在这篇简短的教程中，我们将阐明如何在Java中将HashMap的值转换为ArrayList。 首先，我们将解释如何使用Java核心方法进行转换。然后，我们将演示如何使用如Guava等外部库来解决我们的核心问题。 2.1 使用ArrayList构造器 ArrayList构造器提供了将HashMap转换..."},"headers":[{"level":3,"title":"2.1 使用ArrayList构造器","slug":"_2-1-使用arraylist构造器","link":"#_2-1-使用arraylist构造器","children":[]},{"level":3,"title":"2.2 使用addAll()方法","slug":"_2-2-使用addall-方法","link":"#_2-2-使用addall-方法","children":[]},{"level":3,"title":"2.3 使用Stream API","slug":"_2-3-使用stream-api","link":"#_2-3-使用stream-api","children":[]},{"level":3,"title":"2.4 使用传统的循环","slug":"_2-4-使用传统的循环","link":"#_2-4-使用传统的循环","children":[]},{"level":2,"title":"3. 使用Guava","slug":"_3-使用guava","link":"#_3-使用guava","children":[]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1719696488000,"updatedTime":1719696488000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.77,"words":1131},"filePathRelative":"posts/baeldung/2024-06-29/2024-06-29-Converting HashMap Values to an ArrayList in Java.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在这篇简短的教程中，我们将阐明如何在Java中将HashMap的值转换为ArrayList。</p>\\n<p>首先，我们将解释如何使用Java核心方法进行转换。然后，我们将演示如何使用如Guava等外部库来解决我们的核心问题。</p>\\n<h3>2.1 使用ArrayList构造器</h3>\\n<p>ArrayList构造器提供了将HashMap转换为ArrayList的最常见和最简单的方法。</p>\\n<p>这里的基本思想是将HashMap的值作为参数传递给ArrayList构造器：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token class-name\\">ArrayList</span>```````````````<span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">String</span><span class=\\"token punctuation\\">&gt;</span></span>``````````````` <span class=\\"token function\\">convertUsingConstructor</span><span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">HashMap</span>```````<span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">Integer</span><span class=\\"token punctuation\\">,</span> <span class=\\"token class-name\\">String</span><span class=\\"token punctuation\\">&gt;</span></span>``````` hashMap<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>hashMap <span class=\\"token operator\\">==</span> <span class=\\"token keyword\\">null</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token keyword\\">return</span> <span class=\\"token keyword\\">null</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span>\\n    <span class=\\"token keyword\\">return</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">ArrayList</span>```````````````<span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">String</span><span class=\\"token punctuation\\">&gt;</span></span>```````````````<span class=\\"token punctuation\\">(</span>hashMap<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">values</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{k as comp,d as data};
