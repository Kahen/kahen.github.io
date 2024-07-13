import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-DkA39C0B.js";const e={},p=t(`<h1 id="java中通过n个字符旋转字符串" tabindex="-1"><a class="header-anchor" href="#java中通过n个字符旋转字符串"><span>Java中通过n个字符旋转字符串</span></a></h1><p>在我们的日常Java编程中，字符串通常是我们必须处理的基本对象。有时，我们需要通过n个字符来旋转给定的字符串。旋转字符串涉及以循环方式移动其字符，创造出动态且视觉上吸引人的效果。</p><p>在本教程中，我们将探讨解决字符串旋转问题的几种不同方法。</p><h3 id="_2-1-一个例子" tabindex="-1"><a class="header-anchor" href="#_2-1-一个例子"><span>2.1. 一个例子</span></a></h3><p>假设我们有一个字符串对象：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>String STRING = &quot;abcdefg&quot;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果我们以_STRING_作为输入，在旋转它n个字符后，结果将是以下这样：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>- 向前旋转 -
输入字符串    : abcdefg
旋转 (n = 1) -&gt; gabcdef
旋转 (n = 2) -&gt; fgabcde
旋转 (n = 3) -&gt; efgabcd
旋转 (n = 4) -&gt; defgabc
旋转 (n = 5) -&gt; cdefgab
旋转 (n = 6) -&gt; bcdefga
旋转 (n = 7) -&gt; abcdefg
旋转 (n = 8) -&gt; gabcdef
...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述示例展示了向前字符串旋转的行为。然而，字符串也可以向相反方向旋转——向后旋转，如下所示：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>- 向后旋转 -
输入字符串    : abcdefg
旋转 (n = 1) -&gt; bcdefga
旋转 (n = 2) -&gt; cdefgab
旋转 (n = 3) -&gt; defgabc
旋转 (n = 4) -&gt; efgabcd
旋转 (n = 5) -&gt; fgabcde
旋转 (n = 6) -&gt; gabcdef
旋转 (n = 7) -&gt; abcdefg
...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在本教程中，我们将探索向前和向后的旋转。我们的目标是创建一个能够通过移动n个字符按指定方向旋转输入字符串的方法。</p><p>为了保持简单，我们将限制我们的方法只接受非负值的n。</p><h3 id="_2-2-分析问题" tabindex="-1"><a class="header-anchor" href="#_2-2-分析问题"><span>2.2. 分析问题</span></a></h3><p>在我们深入代码之前，让我们分析这个问题并总结其关键特点。</p><p>首先，如果我们通过移动零个字符（n=0）旋转字符串，无论方向如何，结果应该反映输入字符串。当n等于0时，没有旋转发生，这是很自然的事情。</p><p>此外，如果我们看示例，当n=7时，输出等于输入：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>输入字符串    : abcdefg
...
旋转 (n = 7) -&gt; abcdefg
...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种现象出现的原因是输入字符串的长度是7。当n等于_STRING.length_时，每个字符在旋转后返回到其原始位置。因此，<strong>旋转_STRING_通过移动_STRING.length_个字符的结果是与原始_STRING相同。</strong></p><p>现在，很明显，当n = STRING.length × K（其中K是一个整数）时，输入和输出字符串是相等的。简单来说，<strong>有效的n&#39;移动字符实际上是n % STRING.length。</strong></p><p>接下来，让我们看看旋转方向。通过比较前面提供的向前和向后旋转示例，它显示了**“向后旋转n”实质上等同于“向前旋转STRING.length - n”**。例如，向后旋转n=2得到的结果与向前旋转n=5（STRING.length - 2）相同，如下所示：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>- 向前旋转 -
旋转 (n = 5) -&gt; cdefgab
...

- 向后旋转 -
旋转 (n = 2) -&gt; cdefgab
...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因此，<strong>我们只需要专注于解决向前旋转问题，并将所有向后旋转转换为向前旋转。</strong></p><p>让我们简要列出我们到目前为止学到的内容：</p><ul><li>有效的n&#39; = n % STRING.length</li><li>n=0或K × STRING.length：结果 = STRING</li><li>“向后旋转n”可以转换为“向前旋转(STRING.length - n)”</li></ul><h3 id="_2-3-准备测试数据" tabindex="-1"><a class="header-anchor" href="#_2-3-准备测试数据"><span>2.3. 准备测试数据</span></a></h3><p>由于我们将使用单元测试来验证我们的解决方案，让我们创建一些预期的输出以涵盖各种情况：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>// 向前
String EXPECT_1X = &quot;gabcdef&quot;;
String EXPECT_2X = &quot;fgabcde&quot;;
String EXPECT_3X = &quot;efgabcd&quot;;
String EXPECT_6X = &quot;bcdefga&quot;;
String EXPECT_7X = &quot;abcdefg&quot;;  // 长度 = 7
String EXPECT_24X = &quot;efgabcd&quot;; //24 = 3 × 7(长度) + 3

// 向后
String B_EXPECT_1X = &quot;bcdefga&quot;;
String B_EXPECT_2X = &quot;cdefgab&quot;;
String B_EXPECT_3X = &quot;defgabc&quot;;
String B_EXPECT_6X = &quot;gabcdef&quot;;
String B_EXPECT_7X = &quot;abcdefg&quot;;
String B_EXPECT_24X = &quot;defgabc&quot;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们转到第一个解决方案，“分割和组合”。</p><h3 id="_3-分割和组合" tabindex="-1"><a class="header-anchor" href="#_3-分割和组合"><span>3. 分割和组合</span></a></h3><p>解决问题的想法是<strong>将输入字符串分割成两个子字符串，然后交换它们的位置并重新组合它们</strong>。像往常一样，一个例子将帮助我们快速理解这个想法。</p><p>假设我们想要向前旋转_STRING_通过移动两个（n=2）字符。然后，我们可以通过以下方式执行旋转：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>索引   0   1   2   3   4   5   6
STRING a   b   c   d   e   f   g

Sub1   [a   b   c   d   e] --&gt;
Sub2                   &lt;-- [f   g]
结果 [f   g] [a   b   c   d   e]

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因此，解决问题的关键是找到两个子字符串的索引范围。这对我们来说不是挑战：</p><ul><li>Sub 1 – [0, STRING.length – n), 在这个例子中，它是[0,5)</li><li>Sub 2 – [STRING.length – n, STRING.length) 在这个例子中，它是[5, 7)</li></ul><p>值得注意的是，上面使用的半开符号“[a, b)”表明索引‘a&#39;是包含的，而‘b&#39;是不包含的。有趣的是，<strong>Java的String.subString(beginIndex, endIndex)方法恰好遵循了排除_endIndex_的相同约定</strong>，简化了索引计算。</p><p>现在，基于我们的了解，实现变得简单直接：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>String rotateString1(String s, int c, boolean forward) {
    if (c &lt; 0) {
        throw new IllegalArgumentException(&quot;Rotation character count cannot be negative!&quot;);
    }
    int len = s.length();
    int n = c % len;
    if (n == 0) {
        return s;
    }
    n = forward ? n : len - n;
    return s.substring(len - n, len) + s.substring(0, len - n);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如观察到的，_boolean_变量_forward_指示预期的旋转方向。随后，我们使用表达式“n = forward ? n : len – n”来无缝地将向后旋转转换为它们的向前对应物。</p><p>此外，该方法成功通过了我们准备的测试用例：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>// 向前
assertEquals(EXPECT_1X, rotateString1(STRING, 1, true));
assertEquals(EXPECT_2X, rotateString1(STRING, 2, true));
assertEquals(EXPECT_3X, rotateString1(STRING, 3, true));
assertEquals(EXPECT_6X, rotateString1(STRING, 6, true));
assertEquals(EXPECT_7X, rotateString1(STRING, 7, true));
assertEquals(EXPECT_24X, rotateString1(STRING, 24, true));

// 向后
assertEquals(B_EXPECT_1X, rotateString1(STRING, 1, false));
assertEquals(B_EXPECT_2X, rotateString1(STRING, 2, false));
assertEquals(B_EXPECT_3X, rotateString1(STRING, 3, false));
assertEquals(B_EXPECT_6X, rotateString1(STRING, 6, false));
assertEquals(B_EXPECT_7X, rotateString1(STRING, 7, false));
assertEquals(B_EXPECT_24X, rotateString1(STRING, 24, false));
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-自连接和提取" tabindex="-1"><a class="header-anchor" href="#_4-自连接和提取"><span>4. 自连接和提取</span></a></h3><p>这种方法的实质在于将字符串与其自身连接，创建_SS = STRING + STRING_。因此，<strong>无论我们如何旋转原始_STRING,_结果字符串必须是_SS_的一个子字符串</strong>。因此，我们可以高效地在_SS_中定位子字符串并提取它。</p><p>例如，如果我们向前旋转_STRING_与n=2，结果是_SS.subString(5,12)_：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>索引  0   1   2   3   4   5   6 | 7   8   9   10  11  12  13
 SS   a   b   c   d   e   f   g | a   b   c   d   e   f   g
                                 |
结果 a   b   c   d   e [f   g   a   b   c   d   e]  f   g

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，问题转化为在自连接字符串_SS_中识别预期的起始和结束索引。这对我们来说相对简单：</p><ul><li>起始索引：<em>STRING.length – n</em></li><li>结束索引：<em>StartIndex + STRING.length</em> = 2 × STRING.length – n接下来，让我们将这个想法“翻译”成Java代码：</li></ul><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> <span class="token function">rotateString2</span><span class="token punctuation">(</span><span class="token class-name">String</span> s<span class="token punctuation">,</span> <span class="token keyword">int</span> c<span class="token punctuation">,</span> <span class="token keyword">boolean</span> forward<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>c <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalArgumentException</span><span class="token punctuation">(</span><span class="token string">&quot;Rotation character count cannot be negative!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">int</span> len <span class="token operator">=</span> s<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> n <span class="token operator">=</span> c <span class="token operator">%</span> len<span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>n <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> s<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token class-name">String</span> ss <span class="token operator">=</span> s <span class="token operator">+</span> s<span class="token punctuation">;</span>

    n <span class="token operator">=</span> forward <span class="token operator">?</span> n <span class="token operator">:</span> len <span class="token operator">-</span> n<span class="token punctuation">;</span>
    <span class="token keyword">return</span> ss<span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span>len <span class="token operator">-</span> n<span class="token punctuation">,</span> <span class="token number">2</span> <span class="token operator">*</span> len <span class="token operator">-</span> n<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个方法也通过了我们的测试：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token comment">// 向前</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token constant">EXPECT_1X</span><span class="token punctuation">,</span> <span class="token function">rotateString2</span><span class="token punctuation">(</span><span class="token constant">STRING</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token constant">EXPECT_2X</span><span class="token punctuation">,</span> <span class="token function">rotateString2</span><span class="token punctuation">(</span><span class="token constant">STRING</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token constant">EXPECT_3X</span><span class="token punctuation">,</span> <span class="token function">rotateString2</span><span class="token punctuation">(</span><span class="token constant">STRING</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token constant">EXPECT_6X</span><span class="token punctuation">,</span> <span class="token function">rotateString2</span><span class="token punctuation">(</span><span class="token constant">STRING</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token constant">EXPECT_7X</span><span class="token punctuation">,</span> <span class="token function">rotateString2</span><span class="token punctuation">(</span><span class="token constant">STRING</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token constant">EXPECT_24X</span><span class="token punctuation">,</span> <span class="token function">rotateString2</span><span class="token punctuation">(</span><span class="token constant">STRING</span><span class="token punctuation">,</span> <span class="token number">24</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 向后</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token constant">B_EXPECT_1X</span><span class="token punctuation">,</span> <span class="token function">rotateString2</span><span class="token punctuation">(</span><span class="token constant">STRING</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token constant">B_EXPECT_2X</span><span class="token punctuation">,</span> <span class="token function">rotateString2</span><span class="token punctuation">(</span><span class="token constant">STRING</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token constant">B_EXPECT_3X</span><span class="token punctuation">,</span> <span class="token function">rotateString2</span><span class="token punctuation">(</span><span class="token constant">STRING</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token constant">B_EXPECT_6X</span><span class="token punctuation">,</span> <span class="token function">rotateString2</span><span class="token punctuation">(</span><span class="token constant">STRING</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token constant">B_EXPECT_7X</span><span class="token punctuation">,</span> <span class="token function">rotateString2</span><span class="token punctuation">(</span><span class="token constant">STRING</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token constant">B_EXPECT_24X</span><span class="token punctuation">,</span> <span class="token function">rotateString2</span><span class="token punctuation">(</span><span class="token constant">STRING</span><span class="token punctuation">,</span> <span class="token number">24</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>所以，它解决了我们的字符串旋转问题。</p><p>我们已经了解到_STRING_的旋转结果将是_SS_的一个子字符串。值得注意的是，<strong>我们可以使用这个规则来检查一个字符串是否是从另一个字符串旋转来的：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">boolean</span> <span class="token function">rotatedFrom</span><span class="token punctuation">(</span><span class="token class-name">String</span> rotated<span class="token punctuation">,</span> <span class="token class-name">String</span> rotateFrom<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> rotateFrom<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> rotated<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span>rotateFrom <span class="token operator">+</span> rotateFrom<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span>rotated<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，让我们快速测试这个方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token function">rotatedFrom</span><span class="token punctuation">(</span><span class="token constant">EXPECT_7X</span><span class="token punctuation">,</span> <span class="token constant">STRING</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token function">rotatedFrom</span><span class="token punctuation">(</span><span class="token constant">B_EXPECT_3X</span><span class="token punctuation">,</span> <span class="token constant">STRING</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertFalse</span><span class="token punctuation">(</span><span class="token function">rotatedFrom</span><span class="token punctuation">(</span><span class="token string">&quot;abcefgd&quot;</span><span class="token punctuation">,</span> <span class="token constant">STRING</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h3><p>在本文中，我们首先分析了通过n个字符旋转字符串的问题。然后，我们探索了解决这个问题的两种不同方法。</p><p>如往常一样，示例的完整源代码可在GitHub上找到。 OK</p>`,57),i=[p];function c(l,o){return s(),a("div",null,i)}const d=n(e,[["render",c],["__file","2024-06-25-Rotating a Java String By n Characters.html.vue"]]),v=JSON.parse('{"path":"/posts/baeldung/2024-06-25/2024-06-25-Rotating%20a%20Java%20String%20By%20n%20Characters.html","title":"Java中通过n个字符旋转字符串","lang":"zh-CN","frontmatter":{"date":"2024-06-25T00:00:00.000Z","category":["Java","编程"],"tag":["字符串操作","字符串旋转"],"head":[["meta",{"name":"keywords","content":"Java, 字符串旋转, 编程技巧"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-25/2024-06-25-Rotating%20a%20Java%20String%20By%20n%20Characters.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中通过n个字符旋转字符串"}],["meta",{"property":"og:description","content":"Java中通过n个字符旋转字符串 在我们的日常Java编程中，字符串通常是我们必须处理的基本对象。有时，我们需要通过n个字符来旋转给定的字符串。旋转字符串涉及以循环方式移动其字符，创造出动态且视觉上吸引人的效果。 在本教程中，我们将探讨解决字符串旋转问题的几种不同方法。 2.1. 一个例子 假设我们有一个字符串对象： 如果我们以_STRING_作为输入..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-25T11:25:39.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"字符串操作"}],["meta",{"property":"article:tag","content":"字符串旋转"}],["meta",{"property":"article:published_time","content":"2024-06-25T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-25T11:25:39.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中通过n个字符旋转字符串\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-25T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-25T11:25:39.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中通过n个字符旋转字符串 在我们的日常Java编程中，字符串通常是我们必须处理的基本对象。有时，我们需要通过n个字符来旋转给定的字符串。旋转字符串涉及以循环方式移动其字符，创造出动态且视觉上吸引人的效果。 在本教程中，我们将探讨解决字符串旋转问题的几种不同方法。 2.1. 一个例子 假设我们有一个字符串对象： 如果我们以_STRING_作为输入..."},"headers":[{"level":3,"title":"2.1. 一个例子","slug":"_2-1-一个例子","link":"#_2-1-一个例子","children":[]},{"level":3,"title":"2.2. 分析问题","slug":"_2-2-分析问题","link":"#_2-2-分析问题","children":[]},{"level":3,"title":"2.3. 准备测试数据","slug":"_2-3-准备测试数据","link":"#_2-3-准备测试数据","children":[]},{"level":3,"title":"3. 分割和组合","slug":"_3-分割和组合","link":"#_3-分割和组合","children":[]},{"level":3,"title":"4. 自连接和提取","slug":"_4-自连接和提取","link":"#_4-自连接和提取","children":[]},{"level":3,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1719314739000,"updatedTime":1719314739000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":6.59,"words":1977},"filePathRelative":"posts/baeldung/2024-06-25/2024-06-25-Rotating a Java String By n Characters.md","localizedDate":"2024年6月25日","excerpt":"\\n<p>在我们的日常Java编程中，字符串通常是我们必须处理的基本对象。有时，我们需要通过n个字符来旋转给定的字符串。旋转字符串涉及以循环方式移动其字符，创造出动态且视觉上吸引人的效果。</p>\\n<p>在本教程中，我们将探讨解决字符串旋转问题的几种不同方法。</p>\\n<h3>2.1. 一个例子</h3>\\n<p>假设我们有一个字符串对象：</p>\\n<div class=\\"language-text\\" data-ext=\\"text\\" data-title=\\"text\\"><pre class=\\"language-text\\"><code>String STRING = \\"abcdefg\\";\\n</code></pre></div>","autoDesc":true}');export{d as comp,v as data};
