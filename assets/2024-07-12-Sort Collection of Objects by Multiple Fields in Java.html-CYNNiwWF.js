import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-CbPcg273.js";const p={},e=t('<h1 id="java中按多个字段对对象集合进行排序-baeldung" tabindex="-1"><a class="header-anchor" href="#java中按多个字段对对象集合进行排序-baeldung"><span>Java中按多个字段对对象集合进行排序 | Baeldung</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在编程中，我们经常需要对对象集合进行排序。如果我们想要根据多个字段对对象进行排序，排序逻辑有时可能变得难以实现。在本教程中，我们将讨论这个问题的几种不同方法，以及它们的优缺点。</p><h2 id="_2-示例-person-类" tabindex="-1"><a class="header-anchor" href="#_2-示例-person-类"><span>2. 示例_Person_类</span></a></h2><p>让我们定义一个_Person_类，它包含两个字段，<em>name_和_age</em>。在我们的示例中，我们将首先根据_name_然后根据_age_比较_Person_对象：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span>\n    <span class="token annotation punctuation">@Nonnull</span> <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token keyword">int</span> age<span class="token punctuation">;</span>\n\n    <span class="token comment">// 构造函数</span>\n    <span class="token comment">// getter和setter</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们添加了_@Nonnull_注解以简化示例。但在生产代码中，我们可能需要处理可空字段的比较。</p><h2 id="_3-使用-comparator-compare" tabindex="-1"><a class="header-anchor" href="#_3-使用-comparator-compare"><span>3. 使用_Comparator.compare()_</span></a></h2><p>Java提供了_Comparator_接口来比较两个相同类型的对象。我们可以实现它的_compare(T o1, T o2)_方法，以自定义逻辑执行所需的比较。</p><h3 id="_3-1-逐个检查不同字段" tabindex="-1"><a class="header-anchor" href="#_3-1-逐个检查不同字段"><span>3.1. 逐个检查不同字段</span></a></h3><p>让我们一个接一个地比较字段：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CheckFieldsOneByOne</span> <span class="token keyword">implements</span> <span class="token class-name">Comparator</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Person</span><span class="token punctuation">&gt;</span></span>````` <span class="token punctuation">{</span>\n    <span class="token annotation punctuation">@Override</span>\n    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">compare</span><span class="token punctuation">(</span><span class="token class-name">Person</span> o1<span class="token punctuation">,</span> <span class="token class-name">Person</span> o2<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">int</span> nameCompare <span class="token operator">=</span> o1<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">compareTo</span><span class="token punctuation">(</span>o2<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">if</span><span class="token punctuation">(</span>nameCompare <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token keyword">return</span> nameCompare<span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n        <span class="token keyword">return</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token function">compare</span><span class="token punctuation">(</span>o1<span class="token punctuation">.</span><span class="token function">getAge</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> o2<span class="token punctuation">.</span><span class="token function">getAge</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们使用_String_类的_compareTo()_方法和_Integer_类的_compare()_方法分别比较_name_和_age_字段。</p><p>这种方法需要大量的打字，有时还要处理许多特殊情况。因此，它很难维护和扩展，当我们有更多的字段要比较时。<strong>通常，不推荐在生产代码中使用这种方法。</strong></p><h3 id="_3-2-使用guava的-comparisonchain" tabindex="-1"><a class="header-anchor" href="#_3-2-使用guava的-comparisonchain"><span>3.2. 使用Guava的_ComparisonChain_</span></a></h3><p>首先，让我们将Google Guava库依赖项添加到我们的_pom.xml_：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>``com.google.guava``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>``guava``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>``31.1-jre``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>``\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以通过使用这个库中的_ComparisonChain_类来简化逻辑：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ComparisonChainExample</span> <span class="token keyword">implements</span> <span class="token class-name">Comparator</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Person</span><span class="token punctuation">&gt;</span></span>````` <span class="token punctuation">{</span>\n    <span class="token annotation punctuation">@Override</span>\n    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">compare</span><span class="token punctuation">(</span><span class="token class-name">Person</span> o1<span class="token punctuation">,</span> <span class="token class-name">Person</span> o2<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token class-name">ComparisonChain</span><span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n          <span class="token punctuation">.</span><span class="token function">compare</span><span class="token punctuation">(</span>o1<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> o2<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n          <span class="token punctuation">.</span><span class="token function">compare</span><span class="token punctuation">(</span>o1<span class="token punctuation">.</span><span class="token function">getAge</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> o2<span class="token punctuation">.</span><span class="token function">getAge</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n          <span class="token punctuation">.</span><span class="token function">result</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们使用_ComparisonChain_中的_compare(int left, int right)_和_compare(Comparable<code>&lt;?&gt;</code> left, Comparable<code>&lt;?&gt;</code> right)<em>方法分别比较_name_和_age</em>。</p><p><strong>这种方法隐藏了比较细节，只展示了我们关心的内容——我们想要比较的字段以及它们应该比较的顺序。</strong> 另外，我们应该注意到，我们不需要任何额外的逻辑来处理_null_，因为库方法已经处理了它。因此，它更容易维护和扩展。</p><h3 id="_3-3-使用apache-commons的-comparetobuilder-排序" tabindex="-1"><a class="header-anchor" href="#_3-3-使用apache-commons的-comparetobuilder-排序"><span>3.3. 使用Apache Commons的_CompareToBuilder_排序</span></a></h3><p>首先，让我们将Apache Commons的依赖项添加到_pom.xml_：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>``org.apache.commons``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>``commons-lang3``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>``3.12.0``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>``\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>类似于前面的例子，我们可以使用Apache Commons的_CompareToBuilder_来减少所需的样板代码：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CompareToBuilderExample</span> <span class="token keyword">implements</span> <span class="token class-name">Comparator</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Person</span><span class="token punctuation">&gt;</span></span>````` <span class="token punctuation">{</span>\n    <span class="token annotation punctuation">@Override</span>\n    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">compare</span><span class="token punctuation">(</span><span class="token class-name">Person</span> o1<span class="token punctuation">,</span> <span class="token class-name">Person</span> o2<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">CompareToBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n          <span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span>o1<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> o2<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n          <span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span>o1<span class="token punctuation">.</span><span class="token function">getAge</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> o2<span class="token punctuation">.</span><span class="token function">getAge</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n          <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种方法与Guava的_ComparisonChain_非常相似——<strong>它也隐藏了比较细节，并且很容易维护和扩展。</strong></p><h2 id="_4-使用-comparator-comparing-和lambda表达式" tabindex="-1"><a class="header-anchor" href="#_4-使用-comparator-comparing-和lambda表达式"><span>4. 使用_Comparator.comparing()_和Lambda表达式</span></a></h2><p>自从Java 8以来，_Comparator_接口添加了几个静态方法，它们可以采用lambda表达式来创建_Comparator_对象。我们可以使用它的_comparing()<em>方法来构建我们需要的_Comparator</em>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Comparator</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Person</span><span class="token punctuation">&gt;</span></span>````` <span class="token function">createPersonLambdaComparator</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token class-name">Comparator</span><span class="token punctuation">.</span><span class="token function">comparing</span><span class="token punctuation">(</span><span class="token class-name">Person</span><span class="token operator">::</span><span class="token function">getName</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">thenComparing</span><span class="token punctuation">(</span><span class="token class-name">Person</span><span class="token operator">::</span><span class="token function">getAge</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>这种方法更加简洁易读，因为它直接采用了_Person_类的getters。</strong></p><p>它还保持了我们之前看到的方法的可维护性和可扩展性。此外，<strong>这里的getters是懒加载评估的</strong>，与前面方法中的立即评估相比。因此，它的性能更好，更适合需要大量大数据比较的延迟敏感系统。</p><p>此外，这种方法只使用Java核心类，不需要任何第三方库作为依赖。总的来说，<strong>这是最推荐的方法。</strong></p><h2 id="_5-检查比较结果" tabindex="-1"><a class="header-anchor" href="#_5-检查比较结果"><span>5. 检查比较结果</span></a></h2><p>让我们测试我们看到的四个比较器，并检查它们的行为。所有这些比较器可以以相同的方式调用，并且应该产生相同的结果：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">testComparePersonsFirstNameThenAge</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">Person</span> person1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token string">&quot;John&quot;</span><span class="token punctuation">,</span> <span class="token number">21</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">Person</span> person2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token string">&quot;Tom&quot;</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token comment">// 另一个名叫John的人</span>\n    <span class="token class-name">Person</span> person3 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token string">&quot;John&quot;</span><span class="token punctuation">,</span> <span class="token number">22</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token class-name">List</span><span class="token operator">&lt;</span><span class="token class-name">Comparator</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Person</span><span class="token punctuation">&gt;</span></span>`````<span class="token operator">&gt;</span> comparators <span class="token operator">=</span>\n      <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">CheckFieldsOneByOne</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n        <span class="token keyword">new</span> <span class="token class-name">ComparisonChainExample</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n        <span class="token keyword">new</span> <span class="token class-name">CompareToBuilderExample</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n        <span class="token function">createPersonLambdaComparator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token comment">// 所有比较器应该产生相同的结果</span>\n    <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token class-name">Comparator</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Person</span><span class="token punctuation">&gt;</span></span>````` comparator <span class="token operator">:</span> comparators<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertIterableEquals</span><span class="token punctuation">(</span>\n          <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span>person1<span class="token punctuation">,</span> person2<span class="token punctuation">,</span> person3<span class="token punctuation">)</span>\n            <span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n            <span class="token punctuation">.</span><span class="token function">sorted</span><span class="token punctuation">(</span>comparator<span class="token punctuation">)</span>\n            <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n          <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span>person1<span class="token punctuation">,</span> person3<span class="token punctuation">,</span> person2<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，<em>person1_与_person3_有相同的名字（&quot;John&quot;），但更年轻（21 &lt; 22），而_person3_的名字（&quot;John&quot;）在字典序上小于_person2_的名字（&quot;Tom&quot;）。因此，最终的排序是_person1</em>，<em>person3</em>，<em>person2</em>。</p><p>另外，我们应该<strong>注意，如果我们没有在类变量_name_上加上_@Nonnull_注解，我们将需要在所有方法中添加额外的逻辑来处理null情况，除了Apache Commons的_CompareToBuilder_（它内置了处理null的逻辑）。</strong></p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们学习了在对对象集合进行排序时按多个字段进行比较的不同方法。</p><p>如常，示例的源代码可以在GitHub上找到。</p>',41),o=[e];function c(l,i){return s(),a("div",null,o)}const k=n(p,[["render",c],["__file","2024-07-12-Sort Collection of Objects by Multiple Fields in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-12/2024-07-12-Sort%20Collection%20of%20Objects%20by%20Multiple%20Fields%20in%20Java.html","title":"Java中按多个字段对对象集合进行排序 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","编程"],"tag":["Java","排序","集合"],"head":[["meta",{"name":"keywords","content":"Java, 排序, 集合, 多字段排序"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-12/2024-07-12-Sort%20Collection%20of%20Objects%20by%20Multiple%20Fields%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中按多个字段对对象集合进行排序 | Baeldung"}],["meta",{"property":"og:description","content":"Java中按多个字段对对象集合进行排序 | Baeldung 1. 概述 在编程中，我们经常需要对对象集合进行排序。如果我们想要根据多个字段对对象进行排序，排序逻辑有时可能变得难以实现。在本教程中，我们将讨论这个问题的几种不同方法，以及它们的优缺点。 2. 示例_Person_类 让我们定义一个_Person_类，它包含两个字段，name_和_age。..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-12T10:45:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"排序"}],["meta",{"property":"article:tag","content":"集合"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-12T10:45:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中按多个字段对对象集合进行排序 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-12T10:45:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中按多个字段对对象集合进行排序 | Baeldung 1. 概述 在编程中，我们经常需要对对象集合进行排序。如果我们想要根据多个字段对对象进行排序，排序逻辑有时可能变得难以实现。在本教程中，我们将讨论这个问题的几种不同方法，以及它们的优缺点。 2. 示例_Person_类 让我们定义一个_Person_类，它包含两个字段，name_和_age。..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 示例_Person_类","slug":"_2-示例-person-类","link":"#_2-示例-person-类","children":[]},{"level":2,"title":"3. 使用_Comparator.compare()_","slug":"_3-使用-comparator-compare","link":"#_3-使用-comparator-compare","children":[{"level":3,"title":"3.1. 逐个检查不同字段","slug":"_3-1-逐个检查不同字段","link":"#_3-1-逐个检查不同字段","children":[]},{"level":3,"title":"3.2. 使用Guava的_ComparisonChain_","slug":"_3-2-使用guava的-comparisonchain","link":"#_3-2-使用guava的-comparisonchain","children":[]},{"level":3,"title":"3.3. 使用Apache Commons的_CompareToBuilder_排序","slug":"_3-3-使用apache-commons的-comparetobuilder-排序","link":"#_3-3-使用apache-commons的-comparetobuilder-排序","children":[]}]},{"level":2,"title":"4. 使用_Comparator.comparing()_和Lambda表达式","slug":"_4-使用-comparator-comparing-和lambda表达式","link":"#_4-使用-comparator-comparing-和lambda表达式","children":[]},{"level":2,"title":"5. 检查比较结果","slug":"_5-检查比较结果","link":"#_5-检查比较结果","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1720781156000,"updatedTime":1720781156000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.25,"words":1276},"filePathRelative":"posts/baeldung/2024-07-12/2024-07-12-Sort Collection of Objects by Multiple Fields in Java.md","localizedDate":"2022年4月1日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>在编程中，我们经常需要对对象集合进行排序。如果我们想要根据多个字段对对象进行排序，排序逻辑有时可能变得难以实现。在本教程中，我们将讨论这个问题的几种不同方法，以及它们的优缺点。</p>\\n<h2>2. 示例_Person_类</h2>\\n<p>让我们定义一个_Person_类，它包含两个字段，<em>name_和_age</em>。在我们的示例中，我们将首先根据_name_然后根据_age_比较_Person_对象：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">Person</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token annotation punctuation\\">@Nonnull</span> <span class=\\"token keyword\\">private</span> <span class=\\"token class-name\\">String</span> name<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">private</span> <span class=\\"token keyword\\">int</span> age<span class=\\"token punctuation\\">;</span>\\n\\n    <span class=\\"token comment\\">// 构造函数</span>\\n    <span class=\\"token comment\\">// getter和setter</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{k as comp,d as data};
