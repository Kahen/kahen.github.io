import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-C_fPDS1x.js";const p={},e=t(`<h1 id="在java中检查字符串是否全部为大写或小写" tabindex="-1"><a class="header-anchor" href="#在java中检查字符串是否全部为大写或小写"><span>在Java中检查字符串是否全部为大写或小写</span></a></h1><p>当在Java中处理字符串时，确定一个字符串是否完全由大写或小写字符组成通常是必要的。</p><p>在本教程中，我们将探索执行此检查的不同方法。</p><h2 id="_2-问题介绍" tabindex="-1"><a class="header-anchor" href="#_2-问题介绍"><span>2. 问题介绍</span></a></h2><p>首先，让我们准备三个输入字符串：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">UPPER_INPUT</span> <span class="token operator">=</span> <span class="token string">&quot;1: COOL!&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">LOWER_INPUT</span> <span class="token operator">=</span> <span class="token string">&quot;2: cool!&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">MIXED_INPUT</span> <span class="token operator">=</span> <span class="token string">&quot;3: Cool!&quot;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如我们所见，上面的每个字符串都包含一个空格和两个标点符号。非字母字符，如数字和标点符号，是否属于大写/小写取决于要求。<strong>在本教程中，我们认为非字母字符既是大写也是小写字符。</strong></p><p>我们将在<code>CaseCheck</code>类中创建静态检查方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">CaseChecker</span> <span class="token punctuation">{</span>
    <span class="token keyword">static</span> <span class="token keyword">boolean</span> <span class="token function">allUpperX</span><span class="token punctuation">(</span><span class="token class-name">String</span> input<span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">}</span>
    <span class="token keyword">static</span> <span class="token keyword">boolean</span> <span class="token function">allLowerX</span><span class="token punctuation">(</span><span class="token class-name">String</span> input<span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">}</span>
    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以利用Java的<code>String</code>类和字符操作的强大功能，轻松执行这些检查并处理各种用例。</p><p>为了简单起见，我们将使用单元测试断言来验证每种方法是否返回预期的结果。</p><p>现在，让我们深入研究！</p><h2 id="_3-转换和比较" tabindex="-1"><a class="header-anchor" href="#_3-转换和比较"><span>3. 转换和比较</span></a></h2><p>我们知道<code>String</code>类为我们提供了两个方法：<code>toUpperCase()</code>和<code>toLowerCase()</code>。<strong>如果一个字符串（s）的字符是大写的，那么字符串（s）必须等于s.toUpperCase()的结果。</strong> 因此，根据这个想法，让我们创建两个检查方法，一个用于大写检查，另一个用于小写检查：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token keyword">boolean</span> <span class="token function">allUpper1</span><span class="token punctuation">(</span><span class="token class-name">String</span> input<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> input<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>input<span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">static</span> <span class="token keyword">boolean</span> <span class="token function">allLower1</span><span class="token punctuation">(</span><span class="token class-name">String</span> input<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> input<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>input<span class="token punctuation">.</span><span class="token function">toLowerCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们使用我们准备的输入字符串测试这些方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token class-name">CaseChecker</span><span class="token punctuation">.</span><span class="token function">allLower1</span><span class="token punctuation">(</span><span class="token constant">LOWER_INPUT</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertFalse</span><span class="token punctuation">(</span><span class="token class-name">CaseChecker</span><span class="token punctuation">.</span><span class="token function">allLower1</span><span class="token punctuation">(</span><span class="token constant">UPPER_INPUT</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertFalse</span><span class="token punctuation">(</span><span class="token class-name">CaseChecker</span><span class="token punctuation">.</span><span class="token function">allLower1</span><span class="token punctuation">(</span><span class="token constant">MIXED_INPUT</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">assertFalse</span><span class="token punctuation">(</span><span class="token class-name">CaseChecker</span><span class="token punctuation">.</span><span class="token function">allUpper1</span><span class="token punctuation">(</span><span class="token constant">LOWER_INPUT</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token class-name">CaseChecker</span><span class="token punctuation">.</span><span class="token function">allUpper1</span><span class="token punctuation">(</span><span class="token constant">UPPER_INPUT</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertFalse</span><span class="token punctuation">(</span><span class="token class-name">CaseChecker</span><span class="token punctuation">.</span><span class="token function">allUpper1</span><span class="token punctuation">(</span><span class="token constant">MIXED_INPUT</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们执行它，测试就会通过。所以检查方法解决了问题。</p><h2 id="_4-检查每个字符" tabindex="-1"><a class="header-anchor" href="#_4-检查每个字符"><span>4. 检查每个字符</span></a></h2><p>尽管我们使用转换和比较方法成功地解决了问题，例如<code>input.equals(input.toUpperCase())</code>，但这种方法在处理长输入字符串时可能不是最优的。它转换每个字符的大小写。因此，<strong>这个过程可能变得耗时，对于长输入字符串来说可能是不必要的。</strong></p><p>另一个想法是遍历输入字符串中的字符。我们可以在检测到不是大写/小写的字符时确定结果。所以<strong>我们可以跳过任何进一步的检查。</strong></p><p>我们可以使用<code>String.toCharArray()</code>将字符串分解为<code>char</code>数组。<code>Character.isLowerCase()</code>和<code>Character.isUpperCase()</code>方法可以告诉我们一个<code>char</code>是否是小写/大写字符。</p><p>接下来，让我们结合这两种方法并创建我们的检查方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token keyword">boolean</span> <span class="token function">allUpper2</span><span class="token punctuation">(</span><span class="token class-name">String</span> input<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">char</span> c <span class="token operator">:</span> input<span class="token punctuation">.</span><span class="token function">toCharArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 不要这样写：if (!Character.isUpperCase(c))</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">Character</span><span class="token punctuation">.</span><span class="token function">isLowerCase</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">static</span> <span class="token keyword">boolean</span> <span class="token function">allLower2</span><span class="token punctuation">(</span><span class="token class-name">String</span> input<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">char</span> c <span class="token operator">:</span> input<span class="token punctuation">.</span><span class="token function">toCharArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 不要这样写：if (!Character.isLowerCase(c))</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">Character</span><span class="token punctuation">.</span><span class="token function">isUpperCase</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>实现不难理解。然而，人们可能会对上述代码中的注释感到好奇。例如，在<code>allUpper2()</code>中，为什么我们不应该写“if (!Character.isUpperCase(c)) return false;”？</p><p>这是因为<strong>任何非字母字符，如‘.’或‘7’，<code>Character</code>的<code>isUpperCase()</code>和<code>isLowerCase()</code>都返回<code>false</code>。</strong> 但根据要求，我们需要在大写/小写检查逻辑中忽略非字母字符。因此，使用“if (Character.isLowerCase(c)) return false;”而不是“if (!Character.isUpperCase(c)) return false;”更合适。</p><p>测试表明我们的检查方法也能完成工作：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token class-name">CaseChecker</span><span class="token punctuation">.</span><span class="token function">allLower2</span><span class="token punctuation">(</span><span class="token constant">LOWER_INPUT</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertFalse</span><span class="token punctuation">(</span><span class="token class-name">CaseChecker</span><span class="token punctuation">.</span><span class="token function">allLower2</span><span class="token punctuation">(</span><span class="token constant">UPPER_INPUT</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertFalse</span><span class="token punctuation">(</span><span class="token class-name">CaseChecker</span><span class="token punctuation">.</span><span class="token function">allLower2</span><span class="token punctuation">(</span><span class="token constant">MIXED_INPUT</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">assertFalse</span><span class="token punctuation">(</span><span class="token class-name">CaseChecker</span><span class="token punctuation">.</span><span class="token function">allUpper2</span><span class="token punctuation">(</span><span class="token constant">LOWER_INPUT</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token class-name">CaseChecker</span><span class="token punctuation">.</span><span class="token function">allUpper2</span><span class="token punctuation">(</span><span class="token constant">UPPER_INPUT</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertFalse</span><span class="token punctuation">(</span><span class="token class-name">CaseChecker</span><span class="token punctuation">.</span><span class="token function">allUpper2</span><span class="token punctuation">(</span><span class="token constant">MIXED_INPUT</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>或者，我们可以使用Stream API实现相同的逻辑：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token keyword">boolean</span> <span class="token function">allUpper3</span><span class="token punctuation">(</span><span class="token class-name">String</span> input<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> input<span class="token punctuation">.</span><span class="token function">chars</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">noneMatch</span><span class="token punctuation">(</span><span class="token class-name">Character</span><span class="token operator">::</span><span class="token function">isLowerCase</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">static</span> <span class="token keyword">boolean</span> <span class="token function">allLower3</span><span class="token punctuation">(</span><span class="token class-name">String</span> input<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> input<span class="token punctuation">.</span><span class="token function">chars</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">noneMatch</span><span class="token punctuation">(</span><span class="token class-name">Character</span><span class="token operator">::</span><span class="token function">isUpperCase</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-关于apache-commons-lang-3库中的stringutils" tabindex="-1"><a class="header-anchor" href="#_5-关于apache-commons-lang-3库中的stringutils"><span>5. 关于Apache Commons Lang 3库中的StringUtils</span></a></h2><p>Apache Commons Lang 3提供了方便的<code>StringUtils</code>类。这个实用类有两个方法：<code>isAllLowerCase()</code>和<code>isAllUpperCase()</code>。</p><p>值得注意的是<strong>这些方法认为非字母字符既不是大写也不是小写：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertFalse</span><span class="token punctuation">(</span><span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">isAllLowerCase</span><span class="token punctuation">(</span><span class="token constant">LOWER_INPUT</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertFalse</span><span class="token punctuation">(</span><span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">isAllLowerCase</span><span class="token punctuation">(</span><span class="token constant">UPPER_INPUT</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertFalse</span><span class="token punctuation">(</span><span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">isAllLowerCase</span><span class="token punctuation">(</span><span class="token constant">MIXED_INPUT</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">assertFalse</span><span class="token punctuation">(</span><span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">isAllLowerCase</span><span class="token punctuation">(</span><span class="token string">&quot;a b&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">isAllLowerCase</span><span class="token punctuation">(</span><span class="token string">&quot;ab&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">assertFalse</span><span class="token punctuation">(</span><span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">isAllUpperCase</span><span class="token punctuation">(</span><span class="token constant">LOWER_INPUT</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertFalse</span><span class="token punctuation">(</span><span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">isAllUpperCase</span><span class="token punctuation">(</span><span class="token constant">UPPER_INPUT</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertFalse</span><span class="token punctuation">(</span><span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">isAllUpperCase</span><span class="token punctuation">(</span><span class="token constant">MIXED_INPUT</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">assertFalse</span><span class="token punctuation">(</span><span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">isAllUpperCase</span><span class="token punctuation">(</span><span class="token string">&quot;A B&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">isAllUpperCase</span><span class="token punctuation">(</span><span class="token string">&quot;AB&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当我们使用它们时，我们应该记住这一点。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们探讨了在Java中检查字符串是否全部为大写或小写的不同方法。转换和比较方法是直接的。但如果输入字符串很长，我们可能希望通过检查字符并尽早退出来获得更好的性能。</p><p>像往常一样，这里展示的所有代码片段都可以在GitHub上找到。</p>`,38),c=[e];function o(l,i){return a(),s("div",null,c)}const k=n(p,[["render",o],["__file","2024-07-04-Check if a String Is All Uppercase or Lowercase in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-04/2024-07-04-Check%20if%20a%20String%20Is%20All%20Uppercase%20or%20Lowercase%20in%20Java.html","title":"在Java中检查字符串是否全部为大写或小写","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","String Manipulation"],"tag":["Java","String","Uppercase","Lowercase"],"head":[["meta",{"name":"keywords","content":"Java, String, Uppercase, Lowercase, Case Check"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-04/2024-07-04-Check%20if%20a%20String%20Is%20All%20Uppercase%20or%20Lowercase%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Java中检查字符串是否全部为大写或小写"}],["meta",{"property":"og:description","content":"在Java中检查字符串是否全部为大写或小写 当在Java中处理字符串时，确定一个字符串是否完全由大写或小写字符组成通常是必要的。 在本教程中，我们将探索执行此检查的不同方法。 2. 问题介绍 首先，让我们准备三个输入字符串： 如我们所见，上面的每个字符串都包含一个空格和两个标点符号。非字母字符，如数字和标点符号，是否属于大写/小写取决于要求。在本教程中..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-04T08:38:03.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"String"}],["meta",{"property":"article:tag","content":"Uppercase"}],["meta",{"property":"article:tag","content":"Lowercase"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-04T08:38:03.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Java中检查字符串是否全部为大写或小写\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-04T08:38:03.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Java中检查字符串是否全部为大写或小写 当在Java中处理字符串时，确定一个字符串是否完全由大写或小写字符组成通常是必要的。 在本教程中，我们将探索执行此检查的不同方法。 2. 问题介绍 首先，让我们准备三个输入字符串： 如我们所见，上面的每个字符串都包含一个空格和两个标点符号。非字母字符，如数字和标点符号，是否属于大写/小写取决于要求。在本教程中..."},"headers":[{"level":2,"title":"2. 问题介绍","slug":"_2-问题介绍","link":"#_2-问题介绍","children":[]},{"level":2,"title":"3. 转换和比较","slug":"_3-转换和比较","link":"#_3-转换和比较","children":[]},{"level":2,"title":"4. 检查每个字符","slug":"_4-检查每个字符","link":"#_4-检查每个字符","children":[]},{"level":2,"title":"5. 关于Apache Commons Lang 3库中的StringUtils","slug":"_5-关于apache-commons-lang-3库中的stringutils","link":"#_5-关于apache-commons-lang-3库中的stringutils","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1720082283000,"updatedTime":1720082283000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.9,"words":1170},"filePathRelative":"posts/baeldung/2024-07-04/2024-07-04-Check if a String Is All Uppercase or Lowercase in Java.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>当在Java中处理字符串时，确定一个字符串是否完全由大写或小写字符组成通常是必要的。</p>\\n<p>在本教程中，我们将探索执行此检查的不同方法。</p>\\n<h2>2. 问题介绍</h2>\\n<p>首先，让我们准备三个输入字符串：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">static</span> <span class=\\"token keyword\\">final</span> <span class=\\"token class-name\\">String</span> <span class=\\"token constant\\">UPPER_INPUT</span> <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\\"1: COOL!\\"</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">static</span> <span class=\\"token keyword\\">final</span> <span class=\\"token class-name\\">String</span> <span class=\\"token constant\\">LOWER_INPUT</span> <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\\"2: cool!\\"</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">static</span> <span class=\\"token keyword\\">final</span> <span class=\\"token class-name\\">String</span> <span class=\\"token constant\\">MIXED_INPUT</span> <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\\"3: Cool!\\"</span><span class=\\"token punctuation\\">;</span>\\n</code></pre></div>","autoDesc":true}');export{k as comp,d as data};
