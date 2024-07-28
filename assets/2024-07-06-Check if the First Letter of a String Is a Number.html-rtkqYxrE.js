import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-DzJ3ruqA.js";const p={},e=t(`<h1 id="检查字符串首字符是否为数字-baeldung" tabindex="-1"><a class="header-anchor" href="#检查字符串首字符是否为数字-baeldung"><span>检查字符串首字符是否为数字 | Baeldung</span></a></h1><p>在本简短教程中，我们将学习如何在Java中检查字符串的第一个字符是否为数字。</p><p>我们将首先探索使用JDK本身的方法。然后，我们将看到如何使用第三方库，如Guava，来实现相同的目标。</p><h3 id="使用jdk" tabindex="-1"><a class="header-anchor" href="#使用jdk"><span>使用JDK</span></a></h3><p>Java提供了多种方便的方法来检查字符串是否以数字开头。让我们仔细看看每个选项。</p><h4 id="使用charat" tabindex="-1"><a class="header-anchor" href="#使用charat"><span>使用charAt()</span></a></h4><p>实现我们目标的最简单方法是使用charAt()方法。</p><p>首先，我们将使用charAt(0)返回第一个字符：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token keyword">boolean</span> <span class="token function">checkUsingCharAtMethod</span><span class="token punctuation">(</span><span class="token class-name">String</span> str<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>str <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> str<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">char</span> c <span class="token operator">=</span> str<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> c <span class="token operator">&gt;=</span> <span class="token char">&#39;0&#39;</span> <span class="token operator">&amp;&amp;</span> c \`<span class="token operator">&lt;=</span> <span class="token char">&#39;9&#39;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的例子中，如果指定的字符串为null或其长度为零，我们返回false。否则，我们获取第一个字符并检查它是否为数字。</p><p>接下来，让我们使用一个测试用例来确认：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenString_whenUsingCharAtMethod_thenSuccess</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token class-name">FirstCharDigit</span><span class="token punctuation">.</span><span class="token function">checkUsingCharAtMethod</span><span class="token punctuation">(</span><span class="token string">&quot;12 years&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertFalse</span><span class="token punctuation">(</span><span class="token class-name">FirstCharDigit</span><span class="token punctuation">.</span><span class="token function">checkUsingCharAtMethod</span><span class="token punctuation">(</span><span class="token string">&quot;years&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertFalse</span><span class="token punctuation">(</span><span class="token class-name">FirstCharDigit</span><span class="token punctuation">.</span><span class="token function">checkUsingCharAtMethod</span><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertFalse</span><span class="token punctuation">(</span><span class="token class-name">FirstCharDigit</span><span class="token punctuation">.</span><span class="token function">checkUsingCharAtMethod</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="使用character-isdigit" tabindex="-1"><a class="header-anchor" href="#使用character-isdigit"><span>使用Character.isDigit()</span></a></h4><p>Character类提供了一个方便的方法叫做isDigit()。顾名思义，它确定指定的字符是否为数字。</p><p>让我们看看它的实际应用：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token keyword">boolean</span> <span class="token function">checkUsingIsDigitMethod</span><span class="token punctuation">(</span><span class="token class-name">String</span> str<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">Character</span><span class="token punctuation">.</span><span class="token function">isDigit</span><span class="token punctuation">(</span>str<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们在上面看到的，我们使用charAt(0)获取第一个字符。然后，我们将返回的值传递给isDigit()方法。</p><p>现在，让我们使用一个测试用例来测试它：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenString_whenUsingIsDigitMethod_thenSuccess</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token class-name">FirstCharDigit</span><span class="token punctuation">.</span><span class="token function">checkUsingIsDigitMethod</span><span class="token punctuation">(</span><span class="token string">&quot;10 cm&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertFalse</span><span class="token punctuation">(</span><span class="token class-name">FirstCharDigit</span><span class="token punctuation">.</span><span class="token function">checkUsingIsDigitMethod</span><span class="token punctuation">(</span><span class="token string">&quot;cm&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertFalse</span><span class="token punctuation">(</span><span class="token class-name">FirstCharDigit</span><span class="token punctuation">.</span><span class="token function">checkUsingIsDigitMethod</span><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertFalse</span><span class="token punctuation">(</span><span class="token class-name">FirstCharDigit</span><span class="token punctuation">.</span><span class="token function">checkUsingIsDigitMethod</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="使用pattern类" tabindex="-1"><a class="header-anchor" href="#使用pattern类"><span>使用Pattern类</span></a></h4><p>或者，我们可以使用Pattern类来编译一个正则表达式，检查给定的字符串是否以数字开头。</p><p>通常，我们可以使用正则表达式&quot;<sup>[0-9]&quot;或&quot;</sup>\\d&quot;来匹配以数字开头的字符串。</p><p>接下来，让我们看看如何使用Pattern来编译我们的正则表达式与给定的字符串：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token keyword">boolean</span> <span class="token function">checkUsingPatternClass</span><span class="token punctuation">(</span><span class="token class-name">String</span> str<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">Pattern</span><span class="token punctuation">.</span><span class="token function">compile</span><span class="token punctuation">(</span><span class="token string">&quot;^[0-9].*&quot;</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">matcher</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">matches</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，compile()返回一个Matcher，它提供了matches()方法。</p><p>这个解决方案也运行得很好，如单元测试所示：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenString_whenUsingPatternClass_thenSuccess</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token class-name">FirstCharDigit</span><span class="token punctuation">.</span><span class="token function">checkUsingPatternClass</span><span class="token punctuation">(</span><span class="token string">&quot;1 kg&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertFalse</span><span class="token punctuation">(</span><span class="token class-name">FirstCharDigit</span><span class="token punctuation">.</span><span class="token function">checkUsingPatternClass</span><span class="token punctuation">(</span><span class="token string">&quot;kg&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertFalse</span><span class="token punctuation">(</span><span class="token class-name">FirstCharDigit</span><span class="token punctuation">.</span><span class="token function">checkUsingPatternClass</span><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertFalse</span><span class="token punctuation">(</span><span class="token class-name">FirstCharDigit</span><span class="token punctuation">.</span><span class="token function">checkUsingPatternClass</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="使用matches" tabindex="-1"><a class="header-anchor" href="#使用matches"><span>使用matches()</span></a></h4><p>检查字符串是否以数字开头的另一种方法是使用matches()方法。它接受一个正则表达式作为参数。</p><p>所以，让我们重用我们在前面的例子中指定的相同正则表达式：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token keyword">boolean</span> <span class="token function">checkUsingMatchesMethod</span><span class="token punctuation">(</span><span class="token class-name">String</span> str<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> str<span class="token punctuation">.</span><span class="token function">matches</span><span class="token punctuation">(</span><span class="token string">&quot;^[0-9].*&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在让我们添加另一个测试用例来验证我们的方法按预期工作：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenString_whenUsingMatchesMethod_thenSuccess</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token class-name">FirstCharDigit</span><span class="token punctuation">.</span><span class="token function">checkUsingMatchesMethod</span><span class="token punctuation">(</span><span class="token string">&quot;123&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertFalse</span><span class="token punctuation">(</span><span class="token class-name">FirstCharDigit</span><span class="token punctuation">.</span><span class="token function">checkUsingMatchesMethod</span><span class="token punctuation">(</span><span class="token string">&quot;ABC&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertFalse</span><span class="token punctuation">(</span><span class="token class-name">FirstCharDigit</span><span class="token punctuation">.</span><span class="token function">checkUsingMatchesMethod</span><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertFalse</span><span class="token punctuation">(</span><span class="token class-name">FirstCharDigit</span><span class="token punctuation">.</span><span class="token function">checkUsingMatchesMethod</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="使用guava" tabindex="-1"><a class="header-anchor" href="#使用guava"><span>使用Guava</span></a></h3><p>同样，我们可以使用Guava库来实现相同的目标。首先，我们需要将Guava依赖项添加到pom.xml文件中：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`com.google.guava\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`guava\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\`31.0.1-jre\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\`
\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Guava提供了一组用于字符串和字符操作的现成的实用类。在这些类中，我们找到了CharMatcher类。</p><h4 id="使用charmatcher-inrange" tabindex="-1"><a class="header-anchor" href="#使用charmatcher-inrange"><span>使用CharMatcher.inRange()</span></a></h4><p>CharMatcher实用类带有一个名为inRange()的静态方法，它匹配给定范围内的任何字符。</p><p>这里的主要思想是定义一个只表示数字的范围。</p><p>现在，让我们举例说明CharMatcher.inRange()的使用：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token keyword">boolean</span> <span class="token function">checkUsingCharMatcherInRangeMethod</span><span class="token punctuation">(</span><span class="token class-name">String</span> str<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">CharMatcher</span><span class="token punctuation">.</span><span class="token function">inRange</span><span class="token punctuation">(</span><span class="token char">&#39;0&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;9&#39;</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">matches</span><span class="token punctuation">(</span>str<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>值得注意的是，这里的两个端点&#39;0&#39;和&#39;9&#39;都是包含在内的。</p><p>像往常一样，让我们创建一个测试用例来测试我们的方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenString_whenUsingCharMatcherInRangeMethod_thenSuccess</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token class-name">FirstCharDigit</span><span class="token punctuation">.</span><span class="token function">checkUsingCharMatcherInRangeMethod</span><span class="token punctuation">(</span><span class="token string">&quot;2023&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertFalse</span><span class="token punctuation">(</span><span class="token class-name">FirstCharDigit</span><span class="token punctuation">.</span><span class="token function">checkUsingCharMatcherInRangeMethod</span><span class="token punctuation">(</span><span class="token string">&quot;abc&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertFalse</span><span class="token punctuation">(</span><span class="token class-name">FirstCharDigit</span><span class="token punctuation">.</span><span class="token function">checkUsingCharMatcherInRangeMethod</span><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertFalse</span><span class="token punctuation">(</span><span class="token class-name">FirstCharDigit</span><span class="token punctuation">.</span><span class="token function">checkUsingCharMatcherInRangeMethod</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="使用charmatcher-forpredicate" tabindex="-1"><a class="header-anchor" href="#使用charmatcher-forpredicate"><span>使用CharMatcher.forPredicate()</span></a></h4><p>或者，我们可以使用CharMatcher.forPredicate()来指示给定的字符是否为数字。所以，让我们在实践中看到它：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token keyword">boolean</span> <span class="token function">checkUsingCharMatcherForPredicateMethod</span><span class="token punctuation">(</span><span class="token class-name">String</span> str<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">CharMatcher</span><span class="token punctuation">.</span><span class="token function">forPredicate</span><span class="token punctuation">(</span><span class="token class-name">Character</span><span class="token operator">::</span><span class="token function">isDigit</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">matches</span><span class="token punctuation">(</span>str<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>简而言之，我们在给定字符串的第一个字符上应用了谓词Character::isDigit。</p><p>现在，让我们使用一个测试用例来确认一切正常工作：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenString_whenUsingCharMatcherForPredicateMethod_thenSuccess</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token class-name">FirstCharDigit</span><span class="token punctuation">.</span><span class="token function">checkUsingCharMatcherForPredicateMethod</span><span class="token punctuation">(</span><span class="token string">&quot;100&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertFalse</span><span class="token punctuation">(</span><span class="token class-name">FirstCharDigit</span><span class="token punctuation">.</span><span class="token function">checkUsingCharMatcherForPredicateMethod</span><span class="token punctuation">(</span><span class="token string">&quot;abdo&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertFalse</span><span class="token punctuation">(</span><span class="token class-name">FirstCharDigit</span><span class="token punctuation">.</span><span class="token function">checkUsingCharMatcherForPredicateMethod</span><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertFalse</span><span class="token punctuation">(</span><span class="token class-name">FirstCharDigit</span><span class="token punctuation">.</span><span class="token function">checkUsingCharMatcherForPredicateMethod</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="结论" tabindex="-1"><a class="header-anchor" href="#结论"><span>结论</span></a></h3><p>在这篇短文中，我们学习了多种检查给定字符串的第一个字符是否为数字的方法。</p><p>我们查看了一些使用JDK方法的方法。然后我们讨论了如何使用Guava实现相同的目标。</p><p>一如既往，示例的完整源代码可在GitHub上找到。</p>`,55),c=[e];function o(i,l){return s(),a("div",null,c)}const k=n(p,[["render",o],["__file","2024-07-06-Check if the First Letter of a String Is a Number.html.vue"]]),d=JSON.parse(`{"path":"/posts/baeldung/2024-07-06/2024-07-06-Check%20if%20the%20First%20Letter%20of%20a%20String%20Is%20a%20Number.html","title":"检查字符串首字符是否为数字 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-07-06T00:00:00.000Z","category":["Java","字符串处理"],"tag":["Java","正则表达式","Guava"],"head":[["meta",{"name":"keywords","content":"Java, 字符串, 数字, 正则表达式, Guava"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-06/2024-07-06-Check%20if%20the%20First%20Letter%20of%20a%20String%20Is%20a%20Number.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"检查字符串首字符是否为数字 | Baeldung"}],["meta",{"property":"og:description","content":"检查字符串首字符是否为数字 | Baeldung 在本简短教程中，我们将学习如何在Java中检查字符串的第一个字符是否为数字。 我们将首先探索使用JDK本身的方法。然后，我们将看到如何使用第三方库，如Guava，来实现相同的目标。 使用JDK Java提供了多种方便的方法来检查字符串是否以数字开头。让我们仔细看看每个选项。 使用charAt() 实现我..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-06T13:33:51.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"正则表达式"}],["meta",{"property":"article:tag","content":"Guava"}],["meta",{"property":"article:published_time","content":"2024-07-06T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-06T13:33:51.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"检查字符串首字符是否为数字 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-06T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-06T13:33:51.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"检查字符串首字符是否为数字 | Baeldung 在本简短教程中，我们将学习如何在Java中检查字符串的第一个字符是否为数字。 我们将首先探索使用JDK本身的方法。然后，我们将看到如何使用第三方库，如Guava，来实现相同的目标。 使用JDK Java提供了多种方便的方法来检查字符串是否以数字开头。让我们仔细看看每个选项。 使用charAt() 实现我..."},"headers":[{"level":3,"title":"使用JDK","slug":"使用jdk","link":"#使用jdk","children":[]},{"level":3,"title":"使用Guava","slug":"使用guava","link":"#使用guava","children":[]},{"level":3,"title":"结论","slug":"结论","link":"#结论","children":[]}],"git":{"createdTime":1720272831000,"updatedTime":1720272831000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.82,"words":1145},"filePathRelative":"posts/baeldung/2024-07-06/2024-07-06-Check if the First Letter of a String Is a Number.md","localizedDate":"2024年7月6日","excerpt":"\\n<p>在本简短教程中，我们将学习如何在Java中检查字符串的第一个字符是否为数字。</p>\\n<p>我们将首先探索使用JDK本身的方法。然后，我们将看到如何使用第三方库，如Guava，来实现相同的目标。</p>\\n<h3>使用JDK</h3>\\n<p>Java提供了多种方便的方法来检查字符串是否以数字开头。让我们仔细看看每个选项。</p>\\n<h4>使用charAt()</h4>\\n<p>实现我们目标的最简单方法是使用charAt()方法。</p>\\n<p>首先，我们将使用charAt(0)返回第一个字符：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">static</span> <span class=\\"token keyword\\">boolean</span> <span class=\\"token function\\">checkUsingCharAtMethod</span><span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">String</span> str<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>str <span class=\\"token operator\\">==</span> <span class=\\"token keyword\\">null</span> <span class=\\"token operator\\">||</span> str<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">length</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">==</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token keyword\\">return</span> <span class=\\"token boolean\\">false</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span>\\n\\n    <span class=\\"token keyword\\">char</span> c <span class=\\"token operator\\">=</span> str<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">charAt</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">0</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">return</span> c <span class=\\"token operator\\">&gt;=</span> <span class=\\"token char\\">'0'</span> <span class=\\"token operator\\">&amp;&amp;</span> c \`<span class=\\"token operator\\">&lt;=</span> <span class=\\"token char\\">'9'</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}`);export{k as comp,d as data};
