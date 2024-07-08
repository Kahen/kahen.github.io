import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-C_fPDS1x.js";const e={},p=t('<h1 id="使用java-stream-api获取布尔条件匹配的第一个元素的索引" tabindex="-1"><a class="header-anchor" href="#使用java-stream-api获取布尔条件匹配的第一个元素的索引"><span>使用Java Stream API获取布尔条件匹配的第一个元素的索引</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>在数据结构中查找元素的索引是开发者的常见任务。在本教程中，我们将使用Java Stream API和第三方库来查找列表中第一个匹配布尔条件的元素的索引。</p><h2 id="_2-环境搭建" tabindex="-1"><a class="header-anchor" href="#_2-环境搭建"><span>2. 环境搭建</span></a></h2><p>在本文中，我们将使用下面提到的User对象编写一些测试用例来实现我们的目标：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">User</span> <span class="token punctuation">{</span>\n    <span class="token keyword">private</span> <span class="token class-name">String</span> userName<span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token class-name">Integer</span> userId<span class="token punctuation">;</span>\n\n    <span class="token comment">// 构造函数和getter方法</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此外，我们将创建一个User对象的ArrayList，用于有的测试用例。之后，我们将找到名字为&quot;John&quot;的第一个用户的索引：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">User</span><span class="token punctuation">&gt;</span></span>` userList <span class="token operator">=</span> <span class="token class-name">List</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">&quot;David&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">&quot;John&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token string">&quot;Roger&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token string">&quot;John&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token class-name">String</span> searchName <span class="token operator">=</span> <span class="token string">&quot;John&quot;</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-使用java-stream-api" tabindex="-1"><a class="header-anchor" href="#_3-使用java-stream-api"><span>3. 使用Java Stream API</span></a></h2><p>Java Stream API是在Java 8中引入的最佳特性之一。它提供了许多方法来迭代、过滤、映射、匹配和收集数据。考虑到这一点，让我们使用这些方法从列表中找到一个索引。</p><h3 id="_3-1-使用stream-和filter" tabindex="-1"><a class="header-anchor" href="#_3-1-使用stream-和filter"><span>3.1. 使用stream()和filter()</span></a></h3><p>让我们编写一个使用Stream类基本功能的测试用例，以获得一个索引：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenUsingStream_thenFindFirstMatchingUserIndex</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">AtomicInteger</span> counter <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">AtomicInteger</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">int</span> index <span class="token operator">=</span> userList<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>user <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>\n          counter<span class="token punctuation">.</span><span class="token function">getAndIncrement</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n          <span class="token keyword">return</span> searchName<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>user<span class="token punctuation">.</span><span class="token function">getUserName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n      <span class="token punctuation">}</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">mapToInt</span><span class="token punctuation">(</span>user <span class="token operator">-&gt;</span> counter<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">findFirst</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">orElse</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> index<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们可以从列表创建一个Stream并应用filter()方法。在filter()方法内部，我们增加AtomicInteger以跟踪元素的索引。最后，我们映射计数器的值并使用findFirst()方法获得第一个匹配元素的索引。</p><h3 id="_3-2-使用intstream" tabindex="-1"><a class="header-anchor" href="#_3-2-使用intstream"><span>3.2. 使用IntStream</span></a></h3><p>或者，我们可以使用IntStream类来迭代列表元素，并使用上述部分中提到的类似逻辑获得索引：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenUsingIntStream_thenFindFirstMatchingUserIndex</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">int</span> index <span class="token operator">=</span> <span class="token class-name">IntStream</span><span class="token punctuation">.</span><span class="token function">range</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> userList<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>streamIndex <span class="token operator">-&gt;</span> searchName<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>userList<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>streamIndex<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getUserName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">findFirst</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">orElse</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> index<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-使用stream-takewhile" tabindex="-1"><a class="header-anchor" href="#_3-3-使用stream-takewhile"><span>3.3. 使用Stream takeWhile()</span></a></h3><p>takeWhile()方法返回在谓词保持true时的数据。然而，一旦谓词失败，它就停止迭代以收集迭代的数据：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenUsingTakeWhile_thenFindFirstMatchingUserIndex</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">long</span> predicateIndex <span class="token operator">=</span> userList<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">takeWhile</span><span class="token punctuation">(</span>user <span class="token operator">-&gt;</span> <span class="token operator">!</span>user<span class="token punctuation">.</span><span class="token function">getUserName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>searchName<span class="token punctuation">)</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">count</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> predicateIndex<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的示例显示takeWhile()方法收集元素直到找到一个名为&quot;John&quot;的User对象，然后停止迭代。之后，我们可以使用count()方法获得第一个匹配元素的索引。</p><p>让我们再考虑一个列表中没有匹配元素的情况。在这种情况下，迭代继续到最后一个元素，输出值是4，这是从输入列表中迭代的总元素数：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenUsingTakeWhile_thenFindIndexFromNoMatchingElement</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">long</span> predicateIndex <span class="token operator">=</span> userList<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">takeWhile</span><span class="token punctuation">(</span>user <span class="token operator">-&gt;</span> <span class="token operator">!</span>user<span class="token punctuation">.</span><span class="token function">getUserName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>searchName<span class="token punctuation">)</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">count</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span> predicateIndex<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>takeWhile()方法是在Java 9中引入的。</strong></p><h2 id="_4-使用第三方库" tabindex="-1"><a class="header-anchor" href="#_4-使用第三方库"><span>4. 使用第三方库</span></a></h2><p>尽管Java Stream API足以实现我们的目标，但它仅从Java 1.8版本开始可用。如果应用程序使用的是较旧版本的Java，那么外部库就变得有用。</p><h3 id="_4-1-google-guava中的iterables" tabindex="-1"><a class="header-anchor" href="#_4-1-google-guava中的iterables"><span>4.1. Google Guava中的Iterables</span></a></h3><p>我们将在pom.xml中添加最新的Maven依赖项：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>``com.google.guava``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>``guava``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>``33.0.0-jre``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>``\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Guava库中的Iterables类有一个名为indexOf()的方法，它返回指定可迭代对象中第一个匹配给定谓词的元素的索引：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenUsingGoogleGuava_thenFindFirstMatchingUserIndex</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">int</span> index <span class="token operator">=</span> <span class="token class-name">Iterables</span><span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span>userList<span class="token punctuation">,</span> user <span class="token operator">-&gt;</span> searchName<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>user<span class="token punctuation">.</span><span class="token function">getUserName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> index<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2-apache-common-collections中的iterableutils" tabindex="-1"><a class="header-anchor" href="#_4-2-apache-common-collections中的iterableutils"><span>4.2. Apache Common Collections中的IterableUtils</span></a></h3><p>同样，Apache Common Collections库中的IterableUtils类也提供了获取索引的功能。让我们在pom.xml中添加Maven依赖项：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>``org.apache.commons``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>``commons-collections4``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>``4.4``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>``\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>IterableUtils的indexOf()方法接受一个可迭代集合和一个谓词，然后返回第一个匹配元素的索引：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenUsingApacheCommons_thenFindFirstMatchingUserIndex</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">int</span> index <span class="token operator">=</span> <span class="token class-name">IterableUtils</span><span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span>userList<span class="token punctuation">,</span> user <span class="token operator">-&gt;</span> searchName<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>user<span class="token punctuation">.</span><span class="token function">getUserName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> index<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>两个库中的indexOf()方法如果在没有元素满足谓词条件的情况下返回-1。</strong></p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们学习了不同的方法来查找列表中第一个匹配布尔条件的元素的索引。我们使用了Java Stream API、Google Guava中的Iterables类和Apache Commons Collections中的IterableUtils类。</p><p>如常，参考代码可在GitHub上找到。</p>',40),o=[p];function c(l,i){return s(),a("div",null,o)}const k=n(e,[["render",c],["__file","2024-06-26-Get Index of First Element Matching Boolean Using Java Streams.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-06-26/2024-06-26-Get%20Index%20of%20First%20Element%20Matching%20Boolean%20Using%20Java%20Streams.html","title":"使用Java Stream API获取布尔条件匹配的第一个元素的索引","lang":"zh-CN","frontmatter":{"date":"2024-06-26T00:00:00.000Z","category":["Java","Streams"],"tag":["Java 8","Stream API"],"head":[["meta",{"name":"keywords","content":"Java, Streams, Index, First Match"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-26/2024-06-26-Get%20Index%20of%20First%20Element%20Matching%20Boolean%20Using%20Java%20Streams.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用Java Stream API获取布尔条件匹配的第一个元素的索引"}],["meta",{"property":"og:description","content":"使用Java Stream API获取布尔条件匹配的第一个元素的索引 1. 引言 在数据结构中查找元素的索引是开发者的常见任务。在本教程中，我们将使用Java Stream API和第三方库来查找列表中第一个匹配布尔条件的元素的索引。 2. 环境搭建 在本文中，我们将使用下面提到的User对象编写一些测试用例来实现我们的目标： 此外，我们将创建一个Us..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-26T09:51:24.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java 8"}],["meta",{"property":"article:tag","content":"Stream API"}],["meta",{"property":"article:published_time","content":"2024-06-26T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-26T09:51:24.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用Java Stream API获取布尔条件匹配的第一个元素的索引\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-26T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-26T09:51:24.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用Java Stream API获取布尔条件匹配的第一个元素的索引 1. 引言 在数据结构中查找元素的索引是开发者的常见任务。在本教程中，我们将使用Java Stream API和第三方库来查找列表中第一个匹配布尔条件的元素的索引。 2. 环境搭建 在本文中，我们将使用下面提到的User对象编写一些测试用例来实现我们的目标： 此外，我们将创建一个Us..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 环境搭建","slug":"_2-环境搭建","link":"#_2-环境搭建","children":[]},{"level":2,"title":"3. 使用Java Stream API","slug":"_3-使用java-stream-api","link":"#_3-使用java-stream-api","children":[{"level":3,"title":"3.1. 使用stream()和filter()","slug":"_3-1-使用stream-和filter","link":"#_3-1-使用stream-和filter","children":[]},{"level":3,"title":"3.2. 使用IntStream","slug":"_3-2-使用intstream","link":"#_3-2-使用intstream","children":[]},{"level":3,"title":"3.3. 使用Stream takeWhile()","slug":"_3-3-使用stream-takewhile","link":"#_3-3-使用stream-takewhile","children":[]}]},{"level":2,"title":"4. 使用第三方库","slug":"_4-使用第三方库","link":"#_4-使用第三方库","children":[{"level":3,"title":"4.1. Google Guava中的Iterables","slug":"_4-1-google-guava中的iterables","link":"#_4-1-google-guava中的iterables","children":[]},{"level":3,"title":"4.2. Apache Common Collections中的IterableUtils","slug":"_4-2-apache-common-collections中的iterableutils","link":"#_4-2-apache-common-collections中的iterableutils","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1719395484000,"updatedTime":1719395484000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.48,"words":1043},"filePathRelative":"posts/baeldung/2024-06-26/2024-06-26-Get Index of First Element Matching Boolean Using Java Streams.md","localizedDate":"2024年6月26日","excerpt":"\\n<h2>1. 引言</h2>\\n<p>在数据结构中查找元素的索引是开发者的常见任务。在本教程中，我们将使用Java Stream API和第三方库来查找列表中第一个匹配布尔条件的元素的索引。</p>\\n<h2>2. 环境搭建</h2>\\n<p>在本文中，我们将使用下面提到的User对象编写一些测试用例来实现我们的目标：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">User</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">private</span> <span class=\\"token class-name\\">String</span> userName<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">private</span> <span class=\\"token class-name\\">Integer</span> userId<span class=\\"token punctuation\\">;</span>\\n\\n    <span class=\\"token comment\\">// 构造函数和getter方法</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{k as comp,d as data};
