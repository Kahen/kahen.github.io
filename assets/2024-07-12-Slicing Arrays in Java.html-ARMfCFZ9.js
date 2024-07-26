import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as t}from"./app-DpYLEM_u.js";const p={},e=t(`<h1 id="java中数组切片" tabindex="-1"><a class="header-anchor" href="#java中数组切片"><span>Java中数组切片</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>我们知道Java的_List_有一个_subList()_方法，它允许我们切分源_List_对象。然而，在数组方面并没有标准的_subArray()_方法。</p><p>在本教程中，让我们探索如何在Java中获取给定数组的子数组。</p><h2 id="_2-问题介绍" tabindex="-1"><a class="header-anchor" href="#_2-问题介绍"><span>2. 问题介绍</span></a></h2><p>像往常一样，让我们通过一个例子来理解问题。假设我们有一个字符串数组：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token constant">LANGUAGES</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span> <span class="token string">&quot;Python&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Java&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Kotlin&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Scala&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Ruby&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Go&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Rust&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如我们所见，<em>LANGUAGES_数组保存了一些编程语言名称。另外，由于应用程序是用&quot;Java&quot;、&quot;Kotlin&quot;或&quot;Scala&quot;编写的，并且可以在Java虚拟机上运行，假设我们想要一个包含这三个元素的子数组。换句话说，**我们想要从_LANGUAGES_数组中获取从第二个到第四个元素（索引_1</em>, <em>2</em>, <em>3</em>）：**</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token constant">JVM_LANGUAGES</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span> <span class="token string">&quot;Java&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Kotlin&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Scala&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在本教程中，我们将讨论解决这个问题的不同方法。此外，为了简单起见，我们将使用单元测试断言来验证每种解决方案是否按预期工作。</p><p>接下来，让我们看看它们是如何工作的。</p><h2 id="_3-使用stream-api" tabindex="-1"><a class="header-anchor" href="#_3-使用stream-api"><span>3. 使用Stream API</span></a></h2><p>Java 8带给我们的一个重要新特性是Stream API。因此，如果我们使用的Java版本是8或更高版本，我们可以使用Stream API来切分给定的数组。</p><p><strong>首先，我们可以使用_Arrays.stream()_方法将数组转换为_Stream_对象。</strong> 我们应该注意到，我们应该使用带有三个参数的_Arrays.stream()_方法：</p><ul><li><em>数组</em> - 在这个例子中，它是_LANGUAGES_</li><li><em>startInclusive</em> - 从上面的数组中提取的起始索引，包括在内</li><li><em>endExclusive</em> - 结束索引，顾名思义，不包括</li></ul><p>因此，要解决我们的问题，我们可以将_LANGUAGES_, _1_和_4_传递给_Arrays.stream()_方法。</p><p>接下来，让我们创建一个测试来看看它是否可以获得我们想要的子数组：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> result <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token constant">LANGUAGES</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toArray</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">::</span><span class="token keyword">new</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertArrayEquals</span><span class="token punctuation">(</span><span class="token constant">JVM_LANGUAGES</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>正如上面的代码所示，将数组转换为_Stream_之后，我们可以调用_toArray()_方法将其转换回数组。</p><p>如果我们运行测试，它会通过。因此，它完成了工作。</p><h2 id="_4-使用-arrays-copyofrange-方法" tabindex="-1"><a class="header-anchor" href="#_4-使用-arrays-copyofrange-方法"><span>4. 使用_Arrays.copyOfRange()_方法</span></a></h2><p>我们已经学会了使用Stream API来解决问题。然而，<strong>Stream API仅在Java 8及更高版本中可用</strong>。</p><p>如果我们的Java版本是6或更高版本，我们可以使用_Arrays.copyOfRange()_方法来解决问题。这个方法的参数与_Arrays.stream()_方法相似 - 数组，from-index（包括）和to-index（不包括）。</p><p>所以接下来，让我们创建一个测试来看看_Arrays.copyOfRange()_是否可以解决问题：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> result <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">copyOfRange</span><span class="token punctuation">(</span><span class="token constant">LANGUAGES</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertArrayEquals</span><span class="token punctuation">(</span><span class="token constant">JVM_LANGUAGES</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们运行测试，它会通过。所以它也解决了我们的问题。</p><h2 id="_5-使用-system-arraycopy-方法" tabindex="-1"><a class="header-anchor" href="#_5-使用-system-arraycopy-方法"><span>5. 使用_System.arraycopy()_方法</span></a></h2><p>_Arrays.copyOfRange()_方法通过将给定数组的一部分复制到一个新数组来解决问题。</p><p>当我们想要从数组中复制一部分时，除了_Arrays.copyOfRange()_方法，我们还可以使用_System.arraycopy()_方法。所以接下来，让我们使用这个方法来解决问题。</p><p>我们已经看到_Arrays.copyOfRange()_返回结果子数组。然而，<strong>_System.arraycopy()<em>方法的返回类型是_void</em></strong>。因此，我们必须创建一个新的数组对象并将其传递给_arraycopy()_方法。该方法在数组中填充复制的元素：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> result <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">arraycopy</span><span class="token punctuation">(</span><span class="token constant">LANGUAGES</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> result<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertArrayEquals</span><span class="token punctuation">(</span><span class="token constant">JVM_LANGUAGES</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们运行测试，它会通过。</p><p>正如上面的代码所示，_arraycopy()_方法有五个参数。让我们了解它们的含义：</p><ul><li>源数组 - <em>LANGUAGE</em></li><li>源数组中要复制的from索引 - <em>1</em></li><li>用于保存复制结果的目标数组 - <em>result</em></li><li>在目标数组中存储复制结果的起始索引 - <em>0</em></li><li>我们想要从源数组中复制的元素数量 - <em>3</em></li></ul><p>值得一提的是，<strong>如果结果数组已经包含数据，_arraycopy()_方法可能会覆盖数据</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> result2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span> <span class="token string">&quot;value one&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;value two&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;value three&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;value four&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;value five&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;value six&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;value seven&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">arraycopy</span><span class="token punctuation">(</span><span class="token constant">LANGUAGES</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> result2<span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertArrayEquals</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span> <span class="token string">&quot;value one&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;value two&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Java&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Kotlin&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Scala&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;value six&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;value seven&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> result2<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这次，_result2_数组包含七个元素。进一步地，当我们调用_arraycopy()_方法时，我们告诉它从_result2_的索引2开始填充复制的数据。正如我们所看到的，复制的三个元素已经覆盖了_result2_中的原始元素。</p><p>我们还应该注意到_System.arraycopy()_是一个本地方法，而_Arrays.copyOfRange()<em>方法在内部调用_System.arraycopy()</em>。</p><h2 id="_6-使用apache-commons-lang3库中的-arrayutils" tabindex="-1"><a class="header-anchor" href="#_6-使用apache-commons-lang3库中的-arrayutils"><span>6. 使用Apache Commons Lang3库中的_ArrayUtils_</span></a></h2><p>Apache Commons Lang3是一个相当广泛使用的库。它的_ArrayUtils_提供了许多方便的方法，以便我们可以更容易地使用数组。</p><p>最后，让我们使用_ArrayUtils_类来解决问题。</p><p>在我们开始使用_ArrayUtils_之前，让我们将依赖项添加到我们的Maven配置中：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`org.apache.commons\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`commons-lang3\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\`3.14.0\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\`
\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当然，我们总是可以在Maven中央仓库中找到最新版本。</p><p>_ArrayUtils_类有一个_subarray()_方法，它允许我们快速获取子数组：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> result <span class="token operator">=</span> <span class="token class-name">ArrayUtils</span><span class="token punctuation">.</span><span class="token function">subarray</span><span class="token punctuation">(</span><span class="token constant">LANGUAGES</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertArrayEquals</span><span class="token punctuation">(</span><span class="token constant">JVM_LANGUAGES</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，使用_subarray()_方法解决问题非常简单。</p><h2 id="_7-结论" tabindex="-1"><a class="header-anchor" href="#_7-结论"><span>7. 结论</span></a></h2><p>在本文中，我们学习了从给定数组中获取子数组的不同方法。</p><p>像往常一样，这里展示的所有代码片段都可以在GitHub上找到。</p>`,50),o=[e];function c(l,u){return s(),n("div",null,o)}const k=a(p,[["render",c],["__file","2024-07-12-Slicing Arrays in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-12/2024-07-12-Slicing%20Arrays%20in%20Java.html","title":"Java中数组切片","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Arrays"],"tag":["Java","Arrays","Subarray"],"head":[["meta",{"name":"keywords","content":"Java, Arrays, Subarray, Slicing"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-12/2024-07-12-Slicing%20Arrays%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中数组切片"}],["meta",{"property":"og:description","content":"Java中数组切片 1. 概述 我们知道Java的_List_有一个_subList()_方法，它允许我们切分源_List_对象。然而，在数组方面并没有标准的_subArray()_方法。 在本教程中，让我们探索如何在Java中获取给定数组的子数组。 2. 问题介绍 像往常一样，让我们通过一个例子来理解问题。假设我们有一个字符串数组： 如我们所见，LA..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-13T00:05:31.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Arrays"}],["meta",{"property":"article:tag","content":"Subarray"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-13T00:05:31.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中数组切片\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-13T00:05:31.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中数组切片 1. 概述 我们知道Java的_List_有一个_subList()_方法，它允许我们切分源_List_对象。然而，在数组方面并没有标准的_subArray()_方法。 在本教程中，让我们探索如何在Java中获取给定数组的子数组。 2. 问题介绍 像往常一样，让我们通过一个例子来理解问题。假设我们有一个字符串数组： 如我们所见，LA..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 问题介绍","slug":"_2-问题介绍","link":"#_2-问题介绍","children":[]},{"level":2,"title":"3. 使用Stream API","slug":"_3-使用stream-api","link":"#_3-使用stream-api","children":[]},{"level":2,"title":"4. 使用_Arrays.copyOfRange()_方法","slug":"_4-使用-arrays-copyofrange-方法","link":"#_4-使用-arrays-copyofrange-方法","children":[]},{"level":2,"title":"5. 使用_System.arraycopy()_方法","slug":"_5-使用-system-arraycopy-方法","link":"#_5-使用-system-arraycopy-方法","children":[]},{"level":2,"title":"6. 使用Apache Commons Lang3库中的_ArrayUtils_","slug":"_6-使用apache-commons-lang3库中的-arrayutils","link":"#_6-使用apache-commons-lang3库中的-arrayutils","children":[]},{"level":2,"title":"7. 结论","slug":"_7-结论","link":"#_7-结论","children":[]}],"git":{"createdTime":1720829131000,"updatedTime":1720829131000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.74,"words":1422},"filePathRelative":"posts/baeldung/2024-07-12/2024-07-12-Slicing Arrays in Java.md","localizedDate":"2022年4月1日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>我们知道Java的_List_有一个_subList()_方法，它允许我们切分源_List_对象。然而，在数组方面并没有标准的_subArray()_方法。</p>\\n<p>在本教程中，让我们探索如何在Java中获取给定数组的子数组。</p>\\n<h2>2. 问题介绍</h2>\\n<p>像往常一样，让我们通过一个例子来理解问题。假设我们有一个字符串数组：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token class-name\\">String</span><span class=\\"token punctuation\\">[</span><span class=\\"token punctuation\\">]</span> <span class=\\"token constant\\">LANGUAGES</span> <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">String</span><span class=\\"token punctuation\\">[</span><span class=\\"token punctuation\\">]</span> <span class=\\"token punctuation\\">{</span> <span class=\\"token string\\">\\"Python\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"Java\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"Kotlin\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"Scala\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"Ruby\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"Go\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"Rust\\"</span> <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>\\n</code></pre></div>","autoDesc":true}');export{k as comp,d as data};
