import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-C3BVsZqC.js";const p={},e=t(`<hr><h1 id="在字符串中找到最大数字" tabindex="-1"><a class="header-anchor" href="#在字符串中找到最大数字"><span>在字符串中找到最大数字</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>在处理多种编程场景时，经常会遇到包含数字的字符串，可能需要找到这些值中的最大值。</p><p><strong>本教程将深入探讨不同的方法和Java代码示例，以正确识别并提取给定字符串中的最大数值。</strong></p><h2 id="_2-使用比较的字符串解析" tabindex="-1"><a class="header-anchor" href="#_2-使用比较的字符串解析"><span>2. 使用比较的字符串解析</span></a></h2><p>最简单的方法包括读取字符串并识别数字子字符串。我们可以通过比较前缀来检测最大数字。让我们来看一个例子：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> inputString <span class="token operator">=</span> <span class="token string">&quot;The numbers are 10, 20, and 5&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> expectedLargestNumber <span class="token operator">=</span> <span class="token number">20</span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenInputString_whenUsingBasicApproach_thenFindingLargestNumber</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> numbers <span class="token operator">=</span> inputString<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">&quot;[^0-9]+&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">int</span> largestNumber <span class="token operator">=</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token constant">MIN_VALUE</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">String</span> number <span class="token operator">:</span> numbers<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>number<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">int</span> currentNumber <span class="token operator">=</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token function">parseInt</span><span class="token punctuation">(</span>number<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>currentNumber <span class="token operator">&gt;</span> largestNumber<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                largestNumber <span class="token operator">=</span> currentNumber<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span>expectedLargestNumber<span class="token punctuation">,</span> largestNumber<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们首先使用_split()_方法将名为_inputString_的输入字符串分割成一个子字符串数组。这种分割是通过正则表达式[^0-9]+进行的，该表达式只截取字符串中的数字。</p><p>随后，一个常规循环展示了字符串的分割。循环限制数组只包含结果子字符串，并且故意不包含空字符串。<strong>每个非空子字符串的实现都包含了使用_Integer.parseInt()_方法的显著转换。</strong></p><p><strong>之后，当前数值与迄今为止找到的_largestNumber_进行比较，并在遇到更大值时进行更新。</strong> 最后，我们使用_assertEquals()<em>方法确保_largestNumber_等于_expectedLargestNumber</em>。</p><p>正则表达式使我们能够简洁有效地从字符串中提取数值。利用_Pattern_和_Matcher_类，我们使过程更加流畅。这里有一个简单的例子：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenInputString_whenUsingRegularExpression_thenFindingLargestNumber</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Pattern</span> pattern <span class="token operator">=</span> <span class="token class-name">Pattern</span><span class="token punctuation">.</span><span class="token function">compile</span><span class="token punctuation">(</span><span class="token string">&quot;\\\\d+&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Matcher</span> matcher <span class="token operator">=</span> pattern<span class="token punctuation">.</span><span class="token function">matcher</span><span class="token punctuation">(</span>inputString<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">int</span> largestNumber <span class="token operator">=</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token constant">MIN_VALUE</span><span class="token punctuation">;</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>matcher<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> currentNumber <span class="token operator">=</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token function">parseInt</span><span class="token punctuation">(</span>matcher<span class="token punctuation">.</span><span class="token function">group</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>currentNumber <span class="token operator">&gt;</span> largestNumber<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            largestNumber <span class="token operator">=</span> currentNumber<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span>expectedLargestNumber<span class="token punctuation">,</span> largestNumber<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们首先使用_Pattern.compile()_方法编译一个正则表达式(\\\\\\d+)。这个表达式被精心设计为匹配输入字符串中的一个或多个数字。</p><p>然后，我们通过将编译好的_pattern_应用于_inputString_来初始化_Matcher_对象，表示为_matcher_。</p><p><strong>之后，我们进入一个后续的while循环。在每次迭代中使用_Integer.parseInt(matcher.group())<em>方法提取数值。一个关键的比较展开，评估这个当前数值与现有的_largestNumber</em>。如果发现更大的值，_largestNumber_会立即更新以反映这个识别。</strong></p><h2 id="_4-流和lambda表达式" tabindex="-1"><a class="header-anchor" href="#_4-流和lambda表达式"><span>4. 流和Lambda表达式</span></a></h2><p>Java 8引入了Stream API和lambda表达式；因此，代码更加紧凑，更易于阅读。</p><p>让我们来看一个简单的实现：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenInputString_whenUsingStreamAndLambdaExpression_thenFindingLargestNumber</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> largestNumber <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span>inputString<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">&quot;[^0-9]+&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>s <span class="token operator">-&gt;</span> <span class="token operator">!</span>s<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">mapToInt</span><span class="token punctuation">(</span><span class="token class-name">Integer</span><span class="token operator">::</span><span class="token function">parseInt</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">orElse</span><span class="token punctuation">(</span><span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token constant">MIN_VALUE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span>expectedLargestNumber<span class="token punctuation">,</span> largestNumber<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个测试方法中，我们首先通过使用_split()_方法过滤字符串来提取其数字组件。此外，我们采取措施解决空流的潜在发生，实现_isEmpty()_方法。</p><p><strong>在初始过滤之后，我们利用_mapToInt()_方法系统地将每个非空子字符串转换为整数，由_Integer::parseInt_引用辅助。随后，_max()_操作有效地识别了处理流中存在的最大整数值。</strong></p><p>我们使用_orElse()<em>方法来完成流线化的方法，策略性地将默认值设置为_Integer.MIN_VALUE</em>。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>总之，本教程是对在Java中处理包含数字的字符串的技术进行了彻底的检查。</p><p>如常，本文的完整代码示例可以在GitHub上找到。头信息中没有提供具体的category和tag，因此我根据文章内容自行添加了这些信息。以下是翻译的完整内容：</p><hr><p>date: 2024-06-22 category:</p><ul><li>Java</li><li>编程技巧 tag:</li><li>字符串处理</li><li>数字提取 head:</li><li><ul><li>meta</li><li>name: keywords content: Java, 字符串, 数字, 最大值, 正则表达式</li></ul></li></ul><hr><h1 id="在字符串中找到最大数字-1" tabindex="-1"><a class="header-anchor" href="#在字符串中找到最大数字-1"><span>在字符串中找到最大数字</span></a></h1><h2 id="_1-引言-1" tabindex="-1"><a class="header-anchor" href="#_1-引言-1"><span>1. 引言</span></a></h2><p>在处理多种编程场景时，经常会遇到包含数字的字符串，可能需要找到这些值中的最大值。</p><p><strong>本教程将深入探讨不同的方法和Java代码示例，以正确识别并提取给定字符串中的最大数值。</strong></p><h2 id="_2-使用比较的字符串解析-1" tabindex="-1"><a class="header-anchor" href="#_2-使用比较的字符串解析-1"><span>2. 使用比较的字符串解析</span></a></h2><p>最简单的方法包括读取字符串并识别数字子字符串。我们可以通过比较前缀来检测最大数字。让我们来看一个例子：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> inputString <span class="token operator">=</span> <span class="token string">&quot;The numbers are 10, 20, and 5&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> expectedLargestNumber <span class="token operator">=</span> <span class="token number">20</span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenInputString_whenUsingBasicApproach_thenFindingLargestNumber</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> numbers <span class="token operator">=</span> inputString<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">&quot;[^0-9]+&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">int</span> largestNumber <span class="token operator">=</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token constant">MIN_VALUE</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">String</span> number <span class="token operator">:</span> numbers<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>number<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">int</span> currentNumber <span class="token operator">=</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token function">parseInt</span><span class="token punctuation">(</span>number<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>currentNumber <span class="token operator">&gt;</span> largestNumber<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                largestNumber <span class="token operator">=</span> currentNumber<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span>expectedLargestNumber<span class="token punctuation">,</span> largestNumber<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们首先使用_split()_方法将名为_inputString_的输入字符串分割成一个子字符串数组。这种分割是通过正则表达式[^0-9]+进行的，该表达式只截取字符串中的数字。</p><p>随后，一个常规循环展示了字符串的分割。循环限制数组只包含结果子字符串，并且故意不包含空字符串。<strong>每个非空子字符串的实现都包含了使用_Integer.parseInt()_方法的显著转换。</strong></p><p><strong>之后，当前数值与迄今为止找到的_largestNumber_进行比较，并在遇到更大值时进行更新。</strong> 最后，我们使用_assertEquals()<em>方法确保_largestNumber_等于_expectedLargestNumber</em>。</p><p>正则表达式使我们能够简洁有效地从字符串中提取数值。利用_Pattern_和_Matcher_类，我们使过程更加流畅。这里有一个简单的例子：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenInputString_whenUsingRegularExpression_thenFindingLargestNumber</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Pattern</span> pattern <span class="token operator">=</span> <span class="token class-name">Pattern</span><span class="token punctuation">.</span><span class="token function">compile</span><span class="token punctuation">(</span><span class="token string">&quot;\\\\d+&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Matcher</span> matcher <span class="token operator">=</span> pattern<span class="token punctuation">.</span><span class="token function">matcher</span><span class="token punctuation">(</span>inputString<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">int</span> largestNumber <span class="token operator">=</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token constant">MIN_VALUE</span><span class="token punctuation">;</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>matcher<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> currentNumber <span class="token operator">=</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token function">parseInt</span><span class="token punctuation">(</span>matcher<span class="token punctuation">.</span><span class="token function">group</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>currentNumber <span class="token operator">&gt;</span> largestNumber<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            largestNumber <span class="token operator">=</span> currentNumber<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span>expectedLargestNumber<span class="token punctuation">,</span> largestNumber<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们首先使用_Pattern.compile()_方法编译一个正则表达式(\\\\\\d+)。这个表达式被精心设计为匹配输入字符串中的一个或多个数字。</p><p>然后，我们通过将编译好的_pattern_应用于_inputString_来初始化_Matcher_对象，表示为_matcher_。</p><p><strong>之后，我们进入一个后续的while循环。在每次迭代中使用_Integer.parseInt(matcher.group())<em>方法提取数值。一个关键的比较展开，评估这个当前数值与现有的_largestNumber</em>。如果发现更大的值，_largestNumber_会立即更新以反映这个识别。</strong></p><h2 id="_4-流和lambda表达式-1" tabindex="-1"><a class="header-anchor" href="#_4-流和lambda表达式-1"><span>4. 流和Lambda表达式</span></a></h2><p>Java 8引入了Stream API和lambda表达式；因此，代码更加紧凑，更易于阅读。</p><p>让我们来看一个简单的实现：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenInputString_whenUsingStreamAndLambdaExpression_thenFindingLargestNumber</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> largestNumber <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span>inputString<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">&quot;[^0-9]+&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>s <span class="token operator">-&gt;</span> <span class="token operator">!</span>s<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">mapToInt</span><span class="token punctuation">(</span><span class="token class-name">Integer</span><span class="token operator">::</span><span class="token function">parseInt</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">orElse</span><span class="token punctuation">(</span><span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token constant">MIN_VALUE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span>expectedLargestNumber<span class="token punctuation">,</span> largestNumber<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个测试方法中，我们首先通过使用_split()_方法过滤字符串来提取其数字组件。此外，我们采取措施解决空流的潜在发生，实现_isEmpty()_方法。</p><p><strong>在初始过滤之后，我们利用_mapToInt()_方法系统地将每个非空子字符串转换为整数，由_Integer::parseInt_引用辅助。随后，_max()_操作有效地识别了处理流中存在的最大整数值。</strong></p><p>我们使用_orElse()<em>方法来完成流线化的方法，策略性地将默认值设置为_Integer.MIN_VALUE</em>。</p><h2 id="_5-结论-1" tabindex="-1"><a class="header-anchor" href="#_5-结论-1"><span>5. 结论</span></a></h2><p>总之，本教程是对在Java中处理包含数字的字符串的技术进行了彻底的检查。</p><p>如常，本文的完整代码示例可以在GitHub上找到。</p><p>OK</p>`,56),o=[e];function c(i,l){return a(),s("div",null,o)}const k=n(p,[["render",c],["__file","2024-06-22-Find The Largest Number in a String.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-06-22/2024-06-22-Find%20The%20Largest%20Number%20in%20a%20String.html","title":"在字符串中找到最大数字","lang":"zh-CN","frontmatter":{"date":"2024-06-22T00:00:00.000Z","category":["Java","编程技巧"],"tag":["字符串处理","数字提取"],"head":[["meta",{"name":"keywords","content":"Java, 字符串, 数字, 最大值, 正则表达式"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-22/2024-06-22-Find%20The%20Largest%20Number%20in%20a%20String.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在字符串中找到最大数字"}],["meta",{"property":"og:description","content":"在字符串中找到最大数字 1. 引言 在处理多种编程场景时，经常会遇到包含数字的字符串，可能需要找到这些值中的最大值。 本教程将深入探讨不同的方法和Java代码示例，以正确识别并提取给定字符串中的最大数值。 2. 使用比较的字符串解析 最简单的方法包括读取字符串并识别数字子字符串。我们可以通过比较前缀来检测最大数字。让我们来看一个例子： 在这里，我们首先..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-22T06:49:53.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"字符串处理"}],["meta",{"property":"article:tag","content":"数字提取"}],["meta",{"property":"article:published_time","content":"2024-06-22T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-22T06:49:53.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在字符串中找到最大数字\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-22T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-22T06:49:53.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在字符串中找到最大数字 1. 引言 在处理多种编程场景时，经常会遇到包含数字的字符串，可能需要找到这些值中的最大值。 本教程将深入探讨不同的方法和Java代码示例，以正确识别并提取给定字符串中的最大数值。 2. 使用比较的字符串解析 最简单的方法包括读取字符串并识别数字子字符串。我们可以通过比较前缀来检测最大数字。让我们来看一个例子： 在这里，我们首先..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 使用比较的字符串解析","slug":"_2-使用比较的字符串解析","link":"#_2-使用比较的字符串解析","children":[]},{"level":2,"title":"4. 流和Lambda表达式","slug":"_4-流和lambda表达式","link":"#_4-流和lambda表达式","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]},{"level":2,"title":"1. 引言","slug":"_1-引言-1","link":"#_1-引言-1","children":[]},{"level":2,"title":"2. 使用比较的字符串解析","slug":"_2-使用比较的字符串解析-1","link":"#_2-使用比较的字符串解析-1","children":[]},{"level":2,"title":"4. 流和Lambda表达式","slug":"_4-流和lambda表达式-1","link":"#_4-流和lambda表达式-1","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论-1","link":"#_5-结论-1","children":[]}],"git":{"createdTime":1719038993000,"updatedTime":1719038993000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":6.18,"words":1853},"filePathRelative":"posts/baeldung/2024-06-22/2024-06-22-Find The Largest Number in a String.md","localizedDate":"2024年6月22日","excerpt":"<hr>\\n<h1>在字符串中找到最大数字</h1>\\n<h2>1. 引言</h2>\\n<p>在处理多种编程场景时，经常会遇到包含数字的字符串，可能需要找到这些值中的最大值。</p>\\n<p><strong>本教程将深入探讨不同的方法和Java代码示例，以正确识别并提取给定字符串中的最大数值。</strong></p>\\n<h2>2. 使用比较的字符串解析</h2>\\n<p>最简单的方法包括读取字符串并识别数字子字符串。我们可以通过比较前缀来检测最大数字。让我们来看一个例子：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token class-name\\">String</span> inputString <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\\"The numbers are 10, 20, and 5\\"</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">int</span> expectedLargestNumber <span class=\\"token operator\\">=</span> <span class=\\"token number\\">20</span><span class=\\"token punctuation\\">;</span>\\n\\n<span class=\\"token annotation punctuation\\">@Test</span>\\n<span class=\\"token keyword\\">void</span> <span class=\\"token function\\">givenInputString_whenUsingBasicApproach_thenFindingLargestNumber</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token class-name\\">String</span><span class=\\"token punctuation\\">[</span><span class=\\"token punctuation\\">]</span> numbers <span class=\\"token operator\\">=</span> inputString<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">split</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"[^0-9]+\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\n    <span class=\\"token keyword\\">int</span> largestNumber <span class=\\"token operator\\">=</span> <span class=\\"token class-name\\">Integer</span><span class=\\"token punctuation\\">.</span><span class=\\"token constant\\">MIN_VALUE</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">for</span> <span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">String</span> number <span class=\\"token operator\\">:</span> numbers<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span><span class=\\"token operator\\">!</span>number<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">isEmpty</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n            <span class=\\"token keyword\\">int</span> currentNumber <span class=\\"token operator\\">=</span> <span class=\\"token class-name\\">Integer</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">parseInt</span><span class=\\"token punctuation\\">(</span>number<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n            <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>currentNumber <span class=\\"token operator\\">&gt;</span> largestNumber<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n                largestNumber <span class=\\"token operator\\">=</span> currentNumber<span class=\\"token punctuation\\">;</span>\\n            <span class=\\"token punctuation\\">}</span>\\n        <span class=\\"token punctuation\\">}</span>\\n    <span class=\\"token punctuation\\">}</span>\\n    <span class=\\"token function\\">assertEquals</span><span class=\\"token punctuation\\">(</span>expectedLargestNumber<span class=\\"token punctuation\\">,</span> largestNumber<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{k as comp,d as data};
