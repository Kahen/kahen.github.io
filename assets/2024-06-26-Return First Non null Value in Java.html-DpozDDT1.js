import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-on0L14Tx.js";const p={},e=t('<h1 id="java中返回第一个非空值" tabindex="-1"><a class="header-anchor" href="#java中返回第一个非空值"><span>Java中返回第一个非空值</span></a></h1><p>在本教程中，我们将学习如何<strong>从一个列表或数据序列中返回第一个非空元素</strong>。</p><p>我们还将探索在返回一系列昂贵方法的第一个非空值时的惰性评估。最后，我们将发现使用_Optional_类将要求我们<strong>返回第一个非空的_Optional_</strong>。</p><h2 id="_2-for循环" tabindex="-1"><a class="header-anchor" href="#_2-for循环"><span>2. for循环</span></a></h2><p>在Java 8引入函数式编程之前，通常使用_for_循环来从列表中返回第一个非空元素。</p><p>假设我们有一个列表，第一个元素为_null_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>````` objects <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span>\n    <span class="token keyword">null</span><span class="token punctuation">,</span>\n    <span class="token string">&quot;第一个非空&quot;</span><span class="token punctuation">,</span>\n    <span class="token string">&quot;第二个非空&quot;</span>\n<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>要返回第一个非空元素，我们可以使用传统的_for_循环来迭代并检查每个元素是否为null，通过一个简单的_if_语句：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> object <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>\n<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> objects<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>objects<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        object <span class="token operator">=</span> objects<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">break</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-stream-api" tabindex="-1"><a class="header-anchor" href="#_3-stream-api"><span>3. Stream API</span></a></h2><p>随着Java 8中Stream API的引入，我们现在能够以更易读、更简洁、更声明式的方式来完成许多常见模式。</p><p><strong>要找到第一个非空元素，我们通过调用_stream()_方法顺序地流化我们的列表，并搜索第一个非空元素：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Optional</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>````` object <span class="token operator">=</span> objects\n  <span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>o <span class="token operator">-&gt;</span> o <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">findFirst</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>我们使用中间_filter()<em>操作来根据_Predicate_过滤我们的流，在我们的情况下是一个简单的null检查lambda表达式_o -&gt; o != null</em>。</strong> 最后，我们调用终端_findFirst()<em>操作来返回满足前面操作的第一个元素或者一个空的_Optional</em>。</p><p>为了提高可读性，我们可以使用_Objects.nonNull()_作为方法引用来代替lambda表达式：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Optional</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>````` object <span class="token operator">=</span> objects\n  <span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token class-name">Objects</span><span class="token operator">::</span><span class="token function">nonNull</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">findFirst</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-可能返回-null-的方法的惰性评估" tabindex="-1"><a class="header-anchor" href="#_4-可能返回-null-的方法的惰性评估"><span>4. 可能返回_null_的方法的惰性评估</span></a></h2><p>在本文中，我们假设我们想要从一个现成的数据序列中返回第一个非空项。但是，如果我们用来获取值的方法计算成本很高怎么办？相反，我们可能想要<strong>出于性能原因，惰性评估一个方法序列，直到我们获得第一个非空</strong>。</p><p>让我们考虑以下方法，我们将假装它们计算成本很高：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> <span class="token function">methodA</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token class-name">String</span> <span class="token function">methodB</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token string">&quot;第一个非空&quot;</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token class-name">String</span> <span class="token function">methodC</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token string">&quot;第二个非空&quot;</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在Java 8之前，我们可能使用了一系列_if_语句：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> object <span class="token operator">=</span> <span class="token function">methodA</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">if</span> <span class="token punctuation">(</span>object <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    object <span class="token operator">=</span> <span class="token function">methodB</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">if</span> <span class="token punctuation">(</span>object <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    object <span class="token operator">=</span> <span class="token function">methodC</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用Stream API，我们可以利用<strong>功能接口_Supplier_来实现我们方法的惰性评估</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Optional</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>````` object <span class="token operator">=</span> <span class="token class-name">Stream</span>\n  <span class="token punctuation">.</span>&lt;<span class="token class-name">Supplier</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`````<span class="token operator">&gt;</span><span class="token function">of</span><span class="token punctuation">(</span>\n      <span class="token keyword">this</span><span class="token operator">::</span><span class="token function">methodA</span><span class="token punctuation">,</span>\n      <span class="token keyword">this</span><span class="token operator">::</span><span class="token function">methodB</span><span class="token punctuation">,</span>\n      <span class="token keyword">this</span><span class="token operator">::</span><span class="token function">methodC</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token class-name">Supplier</span><span class="token operator">::</span><span class="token function">get</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token class-name">Objects</span><span class="token operator">::</span><span class="token function">nonNull</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">findFirst</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在我们的流管道中，一个昂贵的方法只有在作为_map()_操作的一部分调用_Supplier_函数对象的_get()_时才被评估。我们通过使用顺序流来确保惰性评估。每个流元素都由中间_filter()_条件进行检查，一旦我们找到满足条件的第一个非空元素，流就会终止。</p><h2 id="_5-外部库" tabindex="-1"><a class="header-anchor" href="#_5-外部库"><span>5. 外部库</span></a></h2><p>除了编写我们自己的实现之外，我们还可以利用解决这个问题的流行外部库。</p><h3 id="_5-1-apache-commons-lang-3" tabindex="-1"><a class="header-anchor" href="#_5-1-apache-commons-lang-3"><span>5.1. Apache Commons Lang 3</span></a></h3><p>要使用Apache Commons Lang 3，我们需要将以下依赖项添加到我们的_pom.xml_：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>``org.apache.commons``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>``commons-lang3``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>``3.14.0``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>``\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>给定一个可能为_null_的单个引用，<strong>我们可以使用_ObjectUtils.getIfNull()<em>来获得它的值，如果它不是_null</em>，或者返回一个替代方法的值，该方法是惰性评估的：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">ObjectUtils</span><span class="token punctuation">.</span><span class="token function">getIfNull</span><span class="token punctuation">(</span>object<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token operator">::</span><span class="token function">methodB</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>给定一个对象列表，我们可以利用_ObjectUtils.firstNonNull()_，它接受可变参数：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">givenListOfObjects_whenUsingApacheCommonsLang3_thenReturnFirstNonNull</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">String</span> object <span class="token operator">=</span> <span class="token class-name">ObjectUtils</span><span class="token punctuation">.</span><span class="token function">firstNonNull</span><span class="token punctuation">(</span>objects<span class="token punctuation">.</span><span class="token function">toArray</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;第一个非空&quot;</span><span class="token punctuation">,</span> object<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果所有参数都是_null_，则返回_null_。</p><p><strong>此外，我们还可以使用_ObjectUtils.getFirstNonNull()_来惰性评估我们的可空方法：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">ObjectUtils</span><span class="token punctuation">.</span><span class="token function">getFirstNonNull</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token operator">::</span><span class="token function">methodA</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token operator">::</span><span class="token function">methodB</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token operator">::</span><span class="token function">methodC</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_5-2-google-guava" tabindex="-1"><a class="header-anchor" href="#_5-2-google-guava"><span>5.2. Google Guava</span></a></h3><p>要使用Google Guava，我们需要将以下依赖项添加到我们的_pom.xml_：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>``com.google.guava``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>``guava``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>``32.1.3-jre``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>``\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>给定两个引用，我们可以使用_MoreObjects.firstNonNull()_：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">givenTwoObjects_whenUsingGoogleGuavaMoreObjects_thenReturnFirstNonNull</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">String</span> nullObject <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>\n    <span class="token class-name">String</span> nonNullObject <span class="token operator">=</span> <span class="token string">&quot;第一个非空&quot;</span><span class="token punctuation">;</span>\n    <span class="token class-name">String</span> object <span class="token operator">=</span> <span class="token class-name">MoreObjects</span><span class="token punctuation">.</span><span class="token function">firstNonNull</span><span class="token punctuation">(</span>nullObject<span class="token punctuation">,</span> nonNullObject<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;第一个非空&quot;</span><span class="token punctuation">,</span> object<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然而，如果两个参数都是_null_，则会抛出_NullPointerExecption_。</p><p><strong>给定一个列表，我们可以使用_Iterables.find()_与_Predicates.nonNull()_来返回第一个非空：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">givenListOfObjects_whenUsingGoogleGuavaIterables_thenReturnFirstNonNull</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">String</span> object <span class="token operator">=</span> <span class="token class-name">Iterables</span><span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span>objects<span class="token punctuation">,</span> <span class="token class-name">Predicates</span><span class="token punctuation">.</span><span class="token function">notNull</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;第一个非空&quot;</span><span class="token punctuation">,</span> object<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-optional" tabindex="-1"><a class="header-anchor" href="#_6-optional"><span>6. Optional</span></a></h2><p>如果本文没有提到_Optional_类型的使用，那将是不完整的。这个类在Java 8中被特别引入，以解决_null_引用的不足。</p><p><strong>_Optional_类型允许开发人员明确表示一个方法或变量可能有或可能没有值。</strong> 因此，我们之前返回_null_或值的方法现在改为返回_Optional_。</p><p>因此，我们之前的问题“返回第一个非空值”转变成了一个微妙不同的问题。我们如何返回第一个非空的_Optional_？</p><p>让我们考虑以下列表，它有一个空的第一个元素：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span><span class="token operator">&lt;</span><span class="token class-name">Optional</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`````<span class="token operator">&gt;</span> optionals <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span>\n    <span class="token class-name">Optional</span><span class="token punctuation">.</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`````<span class="token function">empty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;第一个非空&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;第二个非空&quot;</span><span class="token punctuation">)</span>\n<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以流化我们的列表并搜索第一个非空元素：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">givenListOfOptionals_whenStreaming_thenReturnFirstNonEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">Optional</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>````` object <span class="token operator">=</span> optionals<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token class-name">Optional</span><span class="token operator">::</span><span class="token function">isPresent</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token class-name">Optional</span><span class="token operator">::</span><span class="token function">get</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">findFirst</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token function">assertThat</span><span class="token punctuation">(</span>object<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">&quot;第一个非空&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>我们使用_ifPresent()_方法检查每个给定的_Optional_是否有值。如果一个元素满足这个谓词，那么我们就可以安全地使用_get()_作为_map()_中间操作的一部分来获取值。</strong></p><h2 id="_7-结论" tabindex="-1"><a class="header-anchor" href="#_7-结论"><span>7. 结论</span></a></h2><p>在本文中，我们探讨了如何使用我们自己的实现以及外部库来返回第一个非空值。</p><p>我们还考虑了当我们想要从一个昂贵方法链中返回第一个非空时的惰性评估。</p><p>最后，我们还展示了如何返回第一个非空的_Optional_，因为自从Java 8引入以来，这可能是一个更合适的用例。</p><p>本文中使用的所有代码示例可以在GitHub上找到。</p>',59),o=[e];function c(l,i){return s(),a("div",null,o)}const k=n(p,[["render",c],["__file","2024-06-26-Return First Non null Value in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-06-26/2024-06-26-Return%20First%20Non%20null%20Value%20in%20Java.html","title":"Java中返回第一个非空值","lang":"zh-CN","frontmatter":{"date":"2024-06-27T00:00:00.000Z","category":["Java","编程技巧"],"tag":["Java","Optional","非空"],"head":[["meta",{"name":"keywords","content":"Java, 非空, Optional, 编程技巧"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-26/2024-06-26-Return%20First%20Non%20null%20Value%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中返回第一个非空值"}],["meta",{"property":"og:description","content":"Java中返回第一个非空值 在本教程中，我们将学习如何从一个列表或数据序列中返回第一个非空元素。 我们还将探索在返回一系列昂贵方法的第一个非空值时的惰性评估。最后，我们将发现使用_Optional_类将要求我们返回第一个非空的_Optional_。 2. for循环 在Java 8引入函数式编程之前，通常使用_for_循环来从列表中返回第一个非空元素。..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-26T23:52:01.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Optional"}],["meta",{"property":"article:tag","content":"非空"}],["meta",{"property":"article:published_time","content":"2024-06-27T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-26T23:52:01.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中返回第一个非空值\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-27T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-26T23:52:01.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中返回第一个非空值 在本教程中，我们将学习如何从一个列表或数据序列中返回第一个非空元素。 我们还将探索在返回一系列昂贵方法的第一个非空值时的惰性评估。最后，我们将发现使用_Optional_类将要求我们返回第一个非空的_Optional_。 2. for循环 在Java 8引入函数式编程之前，通常使用_for_循环来从列表中返回第一个非空元素。..."},"headers":[{"level":2,"title":"2. for循环","slug":"_2-for循环","link":"#_2-for循环","children":[]},{"level":2,"title":"3. Stream API","slug":"_3-stream-api","link":"#_3-stream-api","children":[]},{"level":2,"title":"4. 可能返回_null_的方法的惰性评估","slug":"_4-可能返回-null-的方法的惰性评估","link":"#_4-可能返回-null-的方法的惰性评估","children":[]},{"level":2,"title":"5. 外部库","slug":"_5-外部库","link":"#_5-外部库","children":[{"level":3,"title":"5.1. Apache Commons Lang 3","slug":"_5-1-apache-commons-lang-3","link":"#_5-1-apache-commons-lang-3","children":[]},{"level":3,"title":"5.2. Google Guava","slug":"_5-2-google-guava","link":"#_5-2-google-guava","children":[]}]},{"level":2,"title":"6. Optional","slug":"_6-optional","link":"#_6-optional","children":[]},{"level":2,"title":"7. 结论","slug":"_7-结论","link":"#_7-结论","children":[]}],"git":{"createdTime":1719445921000,"updatedTime":1719445921000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.21,"words":1563},"filePathRelative":"posts/baeldung/2024-06-26/2024-06-26-Return First Non null Value in Java.md","localizedDate":"2024年6月27日","excerpt":"\\n<p>在本教程中，我们将学习如何<strong>从一个列表或数据序列中返回第一个非空元素</strong>。</p>\\n<p>我们还将探索在返回一系列昂贵方法的第一个非空值时的惰性评估。最后，我们将发现使用_Optional_类将要求我们<strong>返回第一个非空的_Optional_</strong>。</p>\\n<h2>2. for循环</h2>\\n<p>在Java 8引入函数式编程之前，通常使用_for_循环来从列表中返回第一个非空元素。</p>\\n<p>假设我们有一个列表，第一个元素为_null_：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token class-name\\">List</span>`````<span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">String</span><span class=\\"token punctuation\\">&gt;</span></span>````` objects <span class=\\"token operator\\">=</span> <span class=\\"token class-name\\">Arrays</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">asList</span><span class=\\"token punctuation\\">(</span>\\n    <span class=\\"token keyword\\">null</span><span class=\\"token punctuation\\">,</span>\\n    <span class=\\"token string\\">\\"第一个非空\\"</span><span class=\\"token punctuation\\">,</span>\\n    <span class=\\"token string\\">\\"第二个非空\\"</span>\\n<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n</code></pre></div>","autoDesc":true}');export{k as comp,d as data};
