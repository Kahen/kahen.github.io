import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-DkA39C0B.js";const p={},e=t(`<hr><h1 id="在java字符串中查找第一个嵌入的整数" tabindex="-1"><a class="header-anchor" href="#在java字符串中查找第一个嵌入的整数"><span>在Java字符串中查找第一个嵌入的整数</span></a></h1><p>在本教程中，我们将探讨不同的方法来查找字符串中的第一个整数出现。例如，给定字符串 &quot;ba31dung123&quot;，我们只想找到第一个嵌入的整数，即 31。我们将看到如何使用正则表达式和纯Java来实现这一点。</p><h2 id="_2-使用正则表达式的解决方案" tabindex="-1"><a class="header-anchor" href="#_2-使用正则表达式的解决方案"><span>2. 使用正则表达式的解决方案</span></a></h2><p>正则表达式（regex）是一种强大的工具，可以根据特定模式匹配和操作字符串。它们提供了一种简洁的方式来指定字符串模式，我们可以使用它们来搜索特定的字符、单词或短语，替换文本以及根据特定规则验证字符串。</p><h3 id="_2-1-使用-matcher-和-pattern-类" tabindex="-1"><a class="header-anchor" href="#_2-1-使用-matcher-和-pattern-类"><span>2.1. 使用 Matcher 和 Pattern 类</span></a></h3><p>java.util.regex 包提供了两个主要的类用于正则表达式的模式匹配：</p><ul><li>Matcher：这个类提供了使用给定模式在字符串上执行各种匹配操作的方法。它是通过在 Pattern 实例上调用 matcher() 方法获得的。</li><li>Pattern：这个类表示一个编译后的正则表达式，并提供各种方法在字符串上执行匹配操作。我们可以通过调用 Pattern 类的 compile() 方法从正则表达式创建一个模式。</li></ul><p>我们可以利用它们来查找字符串中的第一个整数出现：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenUsingPatternMatcher_findFirstInteger</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> str <span class="token operator">=</span> <span class="token string">&quot;ba31dung123&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">Matcher</span> matcher <span class="token operator">=</span> <span class="token class-name">Pattern</span><span class="token punctuation">.</span><span class="token function">compile</span><span class="token punctuation">(</span><span class="token string">&quot;\\\\d+&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">matcher</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span><span class="token punctuation">;</span>
    matcher<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>matcher<span class="token punctuation">.</span><span class="token function">group</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">31</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们使用表达式 <code>\\\\d+</code> 来匹配一个或多个连续的数字。</p><h3 id="_2-2-使用-scanner" tabindex="-1"><a class="header-anchor" href="#_2-2-使用-scanner"><span>2.2. 使用 Scanner</span></a></h3><p>我们还可以使用 java.util.Scanner 类。这是一个解析输入数据的强大工具。首先，我们将使用它的 useDelimiter() 方法来删除所有非数字。之后，我们可以使用 nextInt() 方法逐个提取数字：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenUsingScanner_findFirstInteger</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Scanner</span><span class="token punctuation">(</span><span class="token string">&quot;ba31dung123&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">useDelimiter</span><span class="token punctuation">(</span><span class="token string">&quot;\\\\D+&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">nextInt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">31</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正则表达式 <code>\\\\D+</code> 表示所有连续的非数字字符（与 <code>\\\\d+</code> 相反）。</p><h3 id="_2-3-使用-split" tabindex="-1"><a class="header-anchor" href="#_2-3-使用-split"><span>2.3. 使用 split()</span></a></h3><p>Java 中的 split() 方法是一个 String 类方法。它根据指定的分隔符将字符串分割成子字符串，并返回子字符串的数组。分隔符可以是一个正则表达式或一个普通字符串：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenUsingSplit_findFirstInteger</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> str <span class="token operator">=</span> <span class="token string">&quot;ba31dung123&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">List</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\` tokens <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span>str<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">&quot;\\\\D+&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>s <span class="token operator">-&gt;</span> s<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">31</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token function">parseInt</span><span class="token punctuation">(</span>tokens<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们使用了与前面相同的正则表达式。然而，这个解决方案如果字符串以分隔符开头，例如我们的情况，可能会给我们一个空的数组元素。因此，为了避免这种情况，我们使用 Java Stream API 和 filter() 方法过滤了我们的列表。</p><h2 id="_3-不使用正则表达式的解决方案" tabindex="-1"><a class="header-anchor" href="#_3-不使用正则表达式的解决方案"><span>3. 不使用正则表达式的解决方案</span></a></h2><p>我们看到正则表达式是解决这个问题的好方法，但我们也可以不使用它们。</p><p>让我们创建一个方法，从字符串中提取第一个整数：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token class-name">Integer</span> <span class="token function">findFirstInteger</span><span class="token punctuation">(</span><span class="token class-name">String</span> s<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>i <span class="token operator">&lt;</span> s<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span><span class="token class-name">Character</span><span class="token punctuation">.</span><span class="token function">isDigit</span><span class="token punctuation">(</span>s<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        i<span class="token operator">++</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">int</span> j <span class="token operator">=</span> i<span class="token punctuation">;</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>j <span class="token operator">&lt;</span> s<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token class-name">Character</span><span class="token punctuation">.</span><span class="token function">isDigit</span><span class="token punctuation">(</span>s<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span>j<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        j<span class="token operator">++</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token function">parseInt</span><span class="token punctuation">(</span>s<span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span>i<span class="token punctuation">,</span> j<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们首先通过迭代字符串直到找到第一个数字。然后使用 isDigit() 方法来识别一个数字字符。接下来，我们存储第一个数字的索引在变量 i 中。然后，我们再次迭代直到找到我们的数字的结束（等于第一个非数字字符）。然后我们可以返回从 i 到 j 的子字符串。</p><p>让我们测试我们的 findFirstInteger() 方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenUsingCustomMethod_findFirstInteger</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> str <span class="token operator">=</span> <span class="token string">&quot;ba31dung123&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">Integer</span> i <span class="token operator">=</span> <span class="token class-name">FirstOccurrenceOfAnInteger</span><span class="token punctuation">.</span><span class="token function">findFirstInteger</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">31</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在这篇简短的文章中，我们探讨了从字符串中提取第一个嵌入整数的不同替代方案。我们看到正则表达式对于这个任务有多种应用，但我们也可以不使用它。</p><p>像往常一样，示例的源代码可以在 GitHub 上找到。头文件中的日期和分类信息需要从网页的元数据中获取，但目前提供的网页内容并没有包含这些信息。因此，我将使用网页的最后更新日期作为文章日期，并假设分类和标签可能与Java字符串操作和正则表达式相关。</p><p>以下是翻译的完整内容：</p><hr><p>date: 2024-07-09 category:</p><ul><li>Java字符串操作</li><li>正则表达式 tag:</li><li>Java</li><li>正则表达式</li><li>java.util.regex</li><li>java.util.Scanner</li><li>String split head:</li><li><ul><li>meta</li><li>name: keywords content: Java, 字符串, 正则表达式, Pattern, Matcher, Scanner, split</li></ul></li></ul><hr><h1 id="在java字符串中查找第一个嵌入的整数-1" tabindex="-1"><a class="header-anchor" href="#在java字符串中查找第一个嵌入的整数-1"><span>在Java字符串中查找第一个嵌入的整数</span></a></h1><p>在本教程中，我们将探讨不同的方法来查找字符串中的第一个整数出现。例如，给定字符串 &quot;ba31dung123&quot;，我们只想找到第一个嵌入的整数，即 31。我们将看到如何使用正则表达式和纯Java来实现这一点。</p><h2 id="解决方案与正则表达式" tabindex="-1"><a class="header-anchor" href="#解决方案与正则表达式"><span>解决方案与正则表达式</span></a></h2><p>正则表达式（regex）是一种强大的工具，可以根据特定模式匹配和操作字符串。它们提供了一种简洁的方式来指定字符串模式，我们可以使用它们来搜索特定的字符、单词或短语，替换文本以及根据特定规则验证字符串。</p><h3 id="使用-matcher-和-pattern-类" tabindex="-1"><a class="header-anchor" href="#使用-matcher-和-pattern-类"><span>使用 Matcher 和 Pattern 类</span></a></h3><p>java.util.regex 包提供了两个主要的类用于正则表达式的模式匹配：</p><ul><li>Matcher: 这个类提供了使用给定模式在字符串上执行各种匹配操作的方法。它是通过在 Pattern 实例上调用 matcher() 方法获得的。</li><li>Pattern: 这个类代表一个编译后的正则表达式，并提供各种方法在字符串上执行匹配操作。我们通过调用 Pattern 类的 compile() 方法从正则表达式创建一个模式。</li></ul><p>我们可以利用它们来查找字符串中的第一个整数出现：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenUsingPatternMatcher_findFirstInteger</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> str <span class="token operator">=</span> <span class="token string">&quot;ba31dung123&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">Matcher</span> matcher <span class="token operator">=</span> <span class="token class-name">Pattern</span><span class="token punctuation">.</span><span class="token function">compile</span><span class="token punctuation">(</span><span class="token string">&quot;\\\\d+&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">matcher</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span><span class="token punctuation">;</span>
    matcher<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>matcher<span class="token punctuation">.</span><span class="token function">group</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">31</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们使用表达式 <code>\\\\d+</code> 来匹配一个或多个连续的数字。</p><h3 id="使用-scanner" tabindex="-1"><a class="header-anchor" href="#使用-scanner"><span>使用 Scanner</span></a></h3><p>我们还可以使用 java.util.Scanner 类。这是一个解析输入数据的强大工具。首先，我们将使用它的 useDelimiter() 方法来删除所有非数字。之后，我们可以使用 nextInt() 方法逐个提取数字：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenUsingScanner_findFirstInteger</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Scanner</span><span class="token punctuation">(</span><span class="token string">&quot;ba31dung123&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">useDelimiter</span><span class="token punctuation">(</span><span class="token string">&quot;\\\\D+&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">nextInt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">31</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正则表达式 <code>\\\\D+</code> 表示所有连续的非数字字符（与 <code>\\\\d+</code> 相反）。</p><h3 id="使用-split" tabindex="-1"><a class="header-anchor" href="#使用-split"><span>使用 split()</span></a></h3><p>Java 中的 split() 方法是一个 String 类方法。它根据指定的分隔符将字符串分割成子字符串，并返回子字符串的数组。分隔符可以是一个正则表达式或一个普通字符串：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenUsingSplit_findFirstInteger</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> str <span class="token operator">=</span> <span class="token string">&quot;ba31dung123&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">List</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\` tokens <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span>str<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">&quot;\\\\D+&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>s <span class="token operator">-&gt;</span> s<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">31</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token function">parseInt</span><span class="token punctuation">(</span>tokens<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们使用了与前面相同的正则表达式。但是，这个解决方案如果字符串以分隔符开头，例如我们的情况，可能会给我们一个空的数组元素。因此，为了避免这种情况，我们使用 Java Stream API 和 filter() 方法过滤了我们的列表。</p><h2 id="解决方案不使用正则表达式" tabindex="-1"><a class="header-anchor" href="#解决方案不使用正则表达式"><span>解决方案不使用正则表达式</span></a></h2><p>我们看到正则表达式是解决这个问题的好方法，但我们也可以不使用它们。</p><p>让我们创建一个方法，从字符串中提取第一个整数：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token class-name">Integer</span> <span class="token function">findFirstInteger</span><span class="token punctuation">(</span><span class="token class-name">String</span> s<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>i <span class="token operator">&lt;</span> s<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span><span class="token class-name">Character</span><span class="token punctuation">.</span><span class="token function">isDigit</span><span class="token punctuation">(</span>s<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        i<span class="token operator">++</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">int</span> j <span class="token operator">=</span> i<span class="token punctuation">;</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>j <span class="token operator">&lt;</span> s<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token class-name">Character</span><span class="token punctuation">.</span><span class="token function">isDigit</span><span class="token punctuation">(</span>s<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span>j<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        j<span class="token operator">++</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token function">parseInt</span><span class="token punctuation">(</span>s<span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span>i<span class="token punctuation">,</span> j<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们首先通过迭代字符串直到找到第一个数字。然后使用 isDigit() 方法来识别一个数字字符。接下来，我们存储第一个数字的索引在变量 i 中。然后，我们再次迭代直到找到我们的数字的结束（等于第一个非数字字符）。然后我们可以返回从 i 到 j 的子字符串。</p><p>让我们测试我们的 findFirstInteger() 方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenUsingCustomMethod_findFirstInteger</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> str <span class="token operator">=</span> <span class="token string">&quot;ba31dung123&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">Integer</span> i <span class="token operator">=</span> <span class="token class-name">FirstOccurrenceOfAnInteger</span><span class="token punctuation">.</span><span class="token function">findFirstInteger</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">31</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="结论" tabindex="-1"><a class="header-anchor" href="#结论"><span>结论</span></a></h2><p>在这篇简短的文章中，我们探讨了从字符串中提取第一个嵌入整数的不同替代方案。我们看到正则表达式对于这个任务有多种应用，但我们也可以不使用它。</p><p>像往常一样，示例的源代码可以在 GitHub 上找到。</p><p>OK</p>`,63),c=[e];function o(i,l){return s(),a("div",null,c)}const k=n(p,[["render",o],["__file","2024-07-09-Find the First Embedded Occurrence of an Integer in a Java String.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-09/2024-07-09-Find%20the%20First%20Embedded%20Occurrence%20of%20an%20Integer%20in%20a%20Java%20String.html","title":"在Java字符串中查找第一个嵌入的整数","lang":"zh-CN","frontmatter":{"date":"2024-07-09T00:00:00.000Z","category":["Java","String Manipulation"],"tag":["regex","java.util.regex","java.util.Scanner","String split"],"head":[["meta",{"name":"keywords","content":"Java, String, Regular Expressions, Pattern, Matcher, Scanner, split"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-09/2024-07-09-Find%20the%20First%20Embedded%20Occurrence%20of%20an%20Integer%20in%20a%20Java%20String.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Java字符串中查找第一个嵌入的整数"}],["meta",{"property":"og:description","content":"在Java字符串中查找第一个嵌入的整数 在本教程中，我们将探讨不同的方法来查找字符串中的第一个整数出现。例如，给定字符串 \\"ba31dung123\\"，我们只想找到第一个嵌入的整数，即 31。我们将看到如何使用正则表达式和纯Java来实现这一点。 2. 使用正则表达式的解决方案 正则表达式（regex）是一种强大的工具，可以根据特定模式匹配和操作字符串。..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-09T13:39:28.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"regex"}],["meta",{"property":"article:tag","content":"java.util.regex"}],["meta",{"property":"article:tag","content":"java.util.Scanner"}],["meta",{"property":"article:tag","content":"String split"}],["meta",{"property":"article:published_time","content":"2024-07-09T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-09T13:39:28.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Java字符串中查找第一个嵌入的整数\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-09T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-09T13:39:28.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Java字符串中查找第一个嵌入的整数 在本教程中，我们将探讨不同的方法来查找字符串中的第一个整数出现。例如，给定字符串 \\"ba31dung123\\"，我们只想找到第一个嵌入的整数，即 31。我们将看到如何使用正则表达式和纯Java来实现这一点。 2. 使用正则表达式的解决方案 正则表达式（regex）是一种强大的工具，可以根据特定模式匹配和操作字符串。..."},"headers":[{"level":2,"title":"2. 使用正则表达式的解决方案","slug":"_2-使用正则表达式的解决方案","link":"#_2-使用正则表达式的解决方案","children":[{"level":3,"title":"2.1. 使用 Matcher 和 Pattern 类","slug":"_2-1-使用-matcher-和-pattern-类","link":"#_2-1-使用-matcher-和-pattern-类","children":[]},{"level":3,"title":"2.2. 使用 Scanner","slug":"_2-2-使用-scanner","link":"#_2-2-使用-scanner","children":[]},{"level":3,"title":"2.3. 使用 split()","slug":"_2-3-使用-split","link":"#_2-3-使用-split","children":[]}]},{"level":2,"title":"3. 不使用正则表达式的解决方案","slug":"_3-不使用正则表达式的解决方案","link":"#_3-不使用正则表达式的解决方案","children":[]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]},{"level":2,"title":"解决方案与正则表达式","slug":"解决方案与正则表达式","link":"#解决方案与正则表达式","children":[{"level":3,"title":"使用 Matcher 和 Pattern 类","slug":"使用-matcher-和-pattern-类","link":"#使用-matcher-和-pattern-类","children":[]},{"level":3,"title":"使用 Scanner","slug":"使用-scanner","link":"#使用-scanner","children":[]},{"level":3,"title":"使用 split()","slug":"使用-split","link":"#使用-split","children":[]}]},{"level":2,"title":"解决方案不使用正则表达式","slug":"解决方案不使用正则表达式","link":"#解决方案不使用正则表达式","children":[]},{"level":2,"title":"结论","slug":"结论","link":"#结论","children":[]}],"git":{"createdTime":1720532368000,"updatedTime":1720532368000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":7.11,"words":2133},"filePathRelative":"posts/baeldung/2024-07-09/2024-07-09-Find the First Embedded Occurrence of an Integer in a Java String.md","localizedDate":"2024年7月9日","excerpt":"<hr>\\n<h1>在Java字符串中查找第一个嵌入的整数</h1>\\n<p>在本教程中，我们将探讨不同的方法来查找字符串中的第一个整数出现。例如，给定字符串 \\"ba31dung123\\"，我们只想找到第一个嵌入的整数，即 31。我们将看到如何使用正则表达式和纯Java来实现这一点。</p>\\n<h2>2. 使用正则表达式的解决方案</h2>\\n<p>正则表达式（regex）是一种强大的工具，可以根据特定模式匹配和操作字符串。它们提供了一种简洁的方式来指定字符串模式，我们可以使用它们来搜索特定的字符、单词或短语，替换文本以及根据特定规则验证字符串。</p>\\n<h3>2.1. 使用 Matcher 和 Pattern 类</h3>","autoDesc":true}');export{k as comp,d as data};
