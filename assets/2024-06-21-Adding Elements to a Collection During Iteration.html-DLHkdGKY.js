import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-DlW52zYa.js";const p={},e=t(`<h1 id="在迭代期间向集合添加元素" tabindex="-1"><a class="header-anchor" href="#在迭代期间向集合添加元素"><span>在迭代期间向集合添加元素</span></a></h1><p>迭代一个列表是Java中的常见操作，但在迭代过程中向其中添加元素需要仔细考虑，以避免异常并确保代码的正确性。</p><p>在这个教程中，我们将讨论在迭代期间向集合添加元素的几种方法。</p><h2 id="_2-使用-listiterator-类" tabindex="-1"><a class="header-anchor" href="#_2-使用-listiterator-类"><span>2. 使用 ListIterator 类</span></a></h2><p>一种常见的方法是使用 ListIterator，它为列表提供了双向遍历和修改能力。</p><h3 id="_2-1-字符串场景" tabindex="-1"><a class="header-anchor" href="#_2-1-字符串场景"><span>2.1. 字符串场景</span></a></h3><p>考虑以下示例，我们在遇到 Python 后将 JavaScript 添加到编程语言列表中：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\`\` programmingLanguages <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token string">&quot;Java&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Python&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;C++&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenList_whenAddElementWithListIterator_thenModifiedList</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">ListIterator</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\`\` listIterator <span class="token operator">=</span> programmingLanguages<span class="token punctuation">.</span><span class="token function">listIterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>listIterator<span class="token punctuation">.</span><span class="token function">hasNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> language <span class="token operator">=</span> listIterator<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>language<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token string">&quot;Python&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            listIterator<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&quot;JavaScript&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token function">assertIterableEquals</span><span class="token punctuation">(</span><span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token string">&quot;Java&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Python&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;JavaScript&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;C++&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> programmingLanguages<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在提供的代码中，我们初始化了一个名为 programmingLanguages 的列表，其中包含字符串（Java、Python 和 C++）。此外，我们使用 listIterator.next() 方法遍历列表的元素。</p><p><strong>当我们遇到 Python 元素时，我们使用 listIterator.add(&quot;JavaScript&quot;) 动态地在其后立即插入字符串 JavaScript。</strong></p><p>最后，测试断言修改后的列表与预期结果匹配，确保成功地在 Python 后添加了 JavaScript。</p><h3 id="_2-2-数字场景" tabindex="-1"><a class="header-anchor" href="#_2-2-数字场景"><span>2.2. 数字场景</span></a></h3><p>让我们将 ListIterator 方法应用于一个整数列表，遇到数字 2 时将其值加倍：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>\`\`\`\` numbers <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenNumericalList_whenMultiplyElementWithListIterator_thenModifiedList</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">ListIterator</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>\`\`\`\` listIterator <span class="token operator">=</span> numbers<span class="token punctuation">.</span><span class="token function">listIterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>listIterator<span class="token punctuation">.</span><span class="token function">hasNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> num <span class="token operator">=</span> listIterator<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>num <span class="token operator">==</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            listIterator<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>num <span class="token operator">*</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token function">assertIterableEquals</span><span class="token punctuation">(</span><span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">,</span> numbers<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个数字场景中，我们使用 ListIterator 遍历一个整数列表。当遇到数字 2 时，其值乘以 10 并动态地添加到列表中。</p><h2 id="_3-使用增强型-for-循环与副本" tabindex="-1"><a class="header-anchor" href="#_3-使用增强型-for-循环与副本"><span>3. 使用增强型 for 循环与副本</span></a></h2><p>另一种策略涉及创建原始列表的副本，并在修改原始列表的同时遍历它。</p><h3 id="_3-1-字符串场景" tabindex="-1"><a class="header-anchor" href="#_3-1-字符串场景"><span>3.1. 字符串场景</span></a></h3><p>考虑以下示例，我们将原始列表中每个单词的大写版本添加到列表本身：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenStringList_whenAddElementWithEnhancedForLoopAndCopy_thenModifiedList</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">List</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\`\` copyOfWords <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span>programmingLanguages<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">String</span> word <span class="token operator">:</span> copyOfWords<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        programmingLanguages<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>word<span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token function">assertIterableEquals</span><span class="token punctuation">(</span><span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token string">&quot;Java&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Python&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;C++&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;JAVA&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;PYTHON&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;C++&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> programmingLanguages<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在增强型 for 循环中，我们遍历 copyOfWords 列表的每个元素，将相应的值转换为大写，并将其添加到原始列表 programmingLanguages 中。</p><p><strong>值得注意的是，这种插入过程确保原始列表在保持顺序完整性的同时扩展为现有单词的大写版本。换句话说，programmingLanguages 列表将包含原始元素，后跟新添加的大写版本。</strong></p><h3 id="_3-2-数字场景" tabindex="-1"><a class="header-anchor" href="#_3-2-数字场景"><span>3.2. 数字场景</span></a></h3><p>现在，让我们将增强型 for 循环方法应用于一个整数列表，将每个数字乘以 2：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>\`\`\`\` numbers <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenList_whenAddElementWithEnhancedForLoopAndCopy_thenModifiedList</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">List</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>\`\`\`\` copyOfNumbers <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span>numbers<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> num <span class="token operator">:</span> copyOfNumbers<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        numbers<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>num <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token function">assertIterableEquals</span><span class="token punctuation">(</span><span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">)</span><span class="token punctuation">,</span> numbers<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们迭代，将每个元素乘以 2，然后将其添加到原始列表中。与字符串方法一样，</p><h2 id="_4-使用-java-8-stream-方法" tabindex="-1"><a class="header-anchor" href="#_4-使用-java-8-stream-方法"><span>4. 使用 Java 8 Stream 方法</span></a></h2><p>Java 8 Streams 提供了一种在迭代期间向列表添加元素的简洁方式。</p><h3 id="_4-1-字符串场景" tabindex="-1"><a class="header-anchor" href="#_4-1-字符串场景"><span>4.1. 字符串场景</span></a></h3><p>考虑以下示例，我们使用 Java 8 Streams 将字符串 JavaScript 添加到 programmingLanguages 列表中：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenStringList_whenConvertToUpperCaseWithJava8Stream_thenModifiedList</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    programmingLanguages <span class="token operator">=</span> programmingLanguages<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token operator">::</span><span class="token function">toUpperCase</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertIterableEquals</span><span class="token punctuation">(</span><span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token string">&quot;JAVA&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;PYTHON&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;C++&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> programmingLanguages<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这段代码片段中，我们使用 map 操作将列表中的每个字符串元素转换为其大写等价物，使用 toUpperCase 方法。然后，我们使用 Collectors.toList() 将转换后的元素收集到一个新列表中。</p><p><strong>然而，需要注意的是，尽管转换操作看起来直接在原地更改了列表中的相应原始元素，但它实际上是用一个新的列表替换了原始列表。这种替换确保了列表内容的完整性，尽管它有效地从内存中移除了原始列表。</strong></p><p>因此，虽然转换是无缝执行的，但重要的是要考虑其影响，特别是如果原始列表引用在代码的其他部分仍然需要。</p><h3 id="_4-2-数字场景" tabindex="-1"><a class="header-anchor" href="#_4-2-数字场景"><span>4.2. 数字场景</span></a></h3><p>让我们将 Java 8 Stream 方法应用于一个整数列表，将每个数字乘以 3：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenNumericalList_whenMultiplyByThreeWithJava8Stream_thenModifiedList</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    numbers <span class="token operator">=</span> numbers<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>num <span class="token operator">-&gt;</span> num <span class="token operator">*</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertIterableEquals</span><span class="token punctuation">(</span><span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">)</span><span class="token punctuation">,</span> numbers<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个测试方法中，我们使用 map 操作，列表中的每个数字元素都经过转换，乘以 3。此外，通过 Collectors.toList() 将结果流收集到一个新列表中。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>总之，我们探索了多种方法，包括 ListIterator、增强型 for 循环与副本，以及 Java 8 Streams，用于在 Java 中迭代期间向列表添加元素。</p><p>如常，相应的源代码可以在 GitHub 上找到。</p>`,41),o=[e];function c(l,i){return a(),s("div",null,o)}const k=n(p,[["render",c],["__file","2024-06-21-Adding Elements to a Collection During Iteration.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/Archive/2024-06-21-Adding%20Elements%20to%20a%20Collection%20During%20Iteration.html","title":"在迭代期间向集合添加元素","lang":"zh-CN","frontmatter":{"date":"2024-06-21T00:00:00.000Z","category":["Java","Collections"],"tag":["List","ListIterator","Java 8"],"head":[["meta",{"name":"keywords","content":"Java, Collections, List, ListIterator, Java 8"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/2024-06-21-Adding%20Elements%20to%20a%20Collection%20During%20Iteration.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在迭代期间向集合添加元素"}],["meta",{"property":"og:description","content":"在迭代期间向集合添加元素 迭代一个列表是Java中的常见操作，但在迭代过程中向其中添加元素需要仔细考虑，以避免异常并确保代码的正确性。 在这个教程中，我们将讨论在迭代期间向集合添加元素的几种方法。 2. 使用 ListIterator 类 一种常见的方法是使用 ListIterator，它为列表提供了双向遍历和修改能力。 2.1. 字符串场景 考虑以下..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"List"}],["meta",{"property":"article:tag","content":"ListIterator"}],["meta",{"property":"article:tag","content":"Java 8"}],["meta",{"property":"article:published_time","content":"2024-06-21T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在迭代期间向集合添加元素\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-21T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在迭代期间向集合添加元素 迭代一个列表是Java中的常见操作，但在迭代过程中向其中添加元素需要仔细考虑，以避免异常并确保代码的正确性。 在这个教程中，我们将讨论在迭代期间向集合添加元素的几种方法。 2. 使用 ListIterator 类 一种常见的方法是使用 ListIterator，它为列表提供了双向遍历和修改能力。 2.1. 字符串场景 考虑以下..."},"headers":[{"level":2,"title":"2. 使用 ListIterator 类","slug":"_2-使用-listiterator-类","link":"#_2-使用-listiterator-类","children":[{"level":3,"title":"2.1. 字符串场景","slug":"_2-1-字符串场景","link":"#_2-1-字符串场景","children":[]},{"level":3,"title":"2.2. 数字场景","slug":"_2-2-数字场景","link":"#_2-2-数字场景","children":[]}]},{"level":2,"title":"3. 使用增强型 for 循环与副本","slug":"_3-使用增强型-for-循环与副本","link":"#_3-使用增强型-for-循环与副本","children":[{"level":3,"title":"3.1. 字符串场景","slug":"_3-1-字符串场景","link":"#_3-1-字符串场景","children":[]},{"level":3,"title":"3.2. 数字场景","slug":"_3-2-数字场景","link":"#_3-2-数字场景","children":[]}]},{"level":2,"title":"4. 使用 Java 8 Stream 方法","slug":"_4-使用-java-8-stream-方法","link":"#_4-使用-java-8-stream-方法","children":[{"level":3,"title":"4.1. 字符串场景","slug":"_4-1-字符串场景","link":"#_4-1-字符串场景","children":[]},{"level":3,"title":"4.2. 数字场景","slug":"_4-2-数字场景","link":"#_4-2-数字场景","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":3.96,"words":1188},"filePathRelative":"posts/baeldung/Archive/2024-06-21-Adding Elements to a Collection During Iteration.md","localizedDate":"2024年6月21日","excerpt":"\\n<p>迭代一个列表是Java中的常见操作，但在迭代过程中向其中添加元素需要仔细考虑，以避免异常并确保代码的正确性。</p>\\n<p>在这个教程中，我们将讨论在迭代期间向集合添加元素的几种方法。</p>\\n<h2>2. 使用 ListIterator 类</h2>\\n<p>一种常见的方法是使用 ListIterator，它为列表提供了双向遍历和修改能力。</p>\\n<h3>2.1. 字符串场景</h3>\\n<p>考虑以下示例，我们在遇到 Python 后将 JavaScript 添加到编程语言列表中：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token class-name\\">List</span>```<span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">String</span><span class=\\"token punctuation\\">&gt;</span></span>``` programmingLanguages <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">ArrayList</span><span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token punctuation\\">&gt;</span></span><span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">Arrays</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">asList</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"Java\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"Python\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"C++\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\n<span class=\\"token annotation punctuation\\">@Test</span>\\n<span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">void</span> <span class=\\"token function\\">givenList_whenAddElementWithListIterator_thenModifiedList</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token class-name\\">ListIterator</span>```<span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">String</span><span class=\\"token punctuation\\">&gt;</span></span>``` listIterator <span class=\\"token operator\\">=</span> programmingLanguages<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">listIterator</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">while</span> <span class=\\"token punctuation\\">(</span>listIterator<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">hasNext</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token class-name\\">String</span> language <span class=\\"token operator\\">=</span> listIterator<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">next</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>language<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">equals</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"Python\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n            listIterator<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">add</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"JavaScript\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token punctuation\\">}</span>\\n    <span class=\\"token punctuation\\">}</span>\\n    <span class=\\"token function\\">assertIterableEquals</span><span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">Arrays</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">asList</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"Java\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"Python\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"JavaScript\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"C++\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">,</span> programmingLanguages<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{k as comp,d as data};
