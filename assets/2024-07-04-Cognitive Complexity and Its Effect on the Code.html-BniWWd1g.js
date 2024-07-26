import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-C4eFoh0f.js";const p={},e=t(`<h1 id="认知复杂度及其对代码的影响" tabindex="-1"><a class="header-anchor" href="#认知复杂度及其对代码的影响"><span>认知复杂度及其对代码的影响</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在本教程中，我们将学习什么是认知复杂度以及如何计算这一度量。我们将逐步了解增加函数认知复杂度的不同模式和结构。包括循环、条件语句、跳转标签、递归、嵌套等元素。接下来，我们将讨论认知复杂度对代码可维护性的有害影响。最后，我们将探索一些重构技术，这些技术可以帮助我们减少这些负面影响。</p><h2 id="_2-圈复杂度与认知复杂度" tabindex="-1"><a class="header-anchor" href="#_2-圈复杂度与认知复杂度"><span>2. 圈复杂度与认知复杂度</span></a></h2><p>有一段时间，圈复杂度是衡量代码复杂度的唯一方式。因此，出现了一个新的度量标准，它允许我们更准确地衡量代码片段的复杂度。虽然它提供了一个不错的整体评估，但它确实忽略了一些使代码更难理解的重要方面。</p><h3 id="_2-1-圈复杂度" tabindex="-1"><a class="header-anchor" href="#_2-1-圈复杂度"><span>2.1. 圈复杂度</span></a></h3><p>圈复杂度是最早允许衡量代码复杂度的度量标准之一。它由Thomas J. McCabe在1976年提出，定义函数的圈复杂度为<strong>相应代码段内所有独立路径的数量</strong>。</p><p>例如，一个创建五个不同分支的switch语句将导致圈复杂度为五：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">tennisScore</span><span class="token punctuation">(</span><span class="token keyword">int</span> pointsWon<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">switch</span> <span class="token punctuation">(</span>pointsWon<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">case</span> <span class="token number">0</span><span class="token operator">:</span> <span class="token keyword">return</span> <span class="token string">&quot;Love&quot;</span><span class="token punctuation">;</span> <span class="token comment">// +1</span>
        <span class="token keyword">case</span> <span class="token number">1</span><span class="token operator">:</span> <span class="token keyword">return</span> <span class="token string">&quot;Fifteen&quot;</span><span class="token punctuation">;</span> <span class="token comment">// +1</span>
        <span class="token keyword">case</span> <span class="token number">2</span><span class="token operator">:</span> <span class="token keyword">return</span> <span class="token string">&quot;Thirty&quot;</span><span class="token punctuation">;</span> <span class="token comment">// +1</span>
        <span class="token keyword">case</span> <span class="token number">3</span><span class="token operator">:</span> <span class="token keyword">return</span> <span class="token string">&quot;Forty&quot;</span><span class="token punctuation">;</span> <span class="token comment">// +1</span>
        <span class="token keyword">default</span><span class="token operator">:</span> <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalArgumentException</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// +1</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span> <span class="token comment">// 圈复杂度 = 5</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>虽然我们可以使用这个度量来量化我们代码中不同路径的数量，但我们<strong>不能精确地比较不同函数的复杂度</strong>。它忽略了多个嵌套级别、像break或continue这样的跳转标签、递归、复杂的布尔运算和其他未能适当惩罚的因素。</p><p>结果，我们将得到客观上更难理解和维护的函数，但它们的圈复杂度并不一定更大。例如，countVowels的圈复杂度也测量为五：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">countVowels</span><span class="token punctuation">(</span><span class="token class-name">String</span> word<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> count <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">String</span> c <span class="token operator">:</span> word<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// +1</span>
        <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token class-name">String</span> v<span class="token operator">:</span> vowels<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// +1</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>c<span class="token punctuation">.</span><span class="token function">equalsIgnoreCase</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// +1</span>
                count<span class="token operator">++</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>count <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// +1</span>
        <span class="token keyword">return</span> <span class="token string">&quot;does not contain vowels&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token string">&quot;contains %s vowels&quot;</span><span class="token punctuation">,</span> count<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// +1</span>
<span class="token punctuation">}</span>  <span class="token comment">// 圈复杂度 = 5</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-认知复杂度" tabindex="-1"><a class="header-anchor" href="#_2-2-认知复杂度"><span>2.2. 认知复杂度</span></a></h3><p>因此，认知复杂度度量标准由Sonar开发，其主要目标是提供一种可靠的代码可理解性度量。其背后的动机是<strong>促进重构实践，以提高代码质量和可读性</strong>。</p><p>尽管我们可以配置静态代码分析器（如SonarQube）自动计算我们代码的认知复杂度，让我们理解认知复杂度分数是如何计算的，以及考虑了哪些主要原则。</p><p>首先，对于简化代码并使其更易读的结构没有惩罚。例如，我们可以想象提取一个函数或引入早期返回来减少代码的嵌套级别。</p><p>其次，对于每次线性流程的中断，认知复杂度会增加。循环、条件语句、try-catch块和其他类似结构打破了这种线性流程，因此它们将使复杂度级别增加一。目标是从上到下、从左到右以线性流程阅读所有代码。</p><p>最后，嵌套会导致额外的复杂度惩罚。因此，如果我们回顾之前的代码示例，使用switch语句的tennisScore函数将具有一个认知复杂度。另一方面，countVowels函数将因嵌套循环而受到严重惩罚，导致复杂度级别为七：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">countVowels</span><span class="token punctuation">(</span><span class="token class-name">String</span> word<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> count <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">String</span> c <span class="token operator">:</span> word<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// +1</span>
        <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token class-name">String</span> v<span class="token operator">:</span> vowels<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// +2 (嵌套级别 = 1)</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>c<span class="token punctuation">.</span><span class="token function">equalsIgnoreCase</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// +3 (嵌套级别 = 2)</span>
                count<span class="token operator">++</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>count <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// +1</span>
        <span class="token keyword">return</span> <span class="token string">&quot;does not contain vowels&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token string">&quot;contains %s vowels&quot;</span><span class="token punctuation">,</span> count<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token comment">// 认知复杂度 = 7</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-线性流程的中断" tabindex="-1"><a class="header-anchor" href="#_3-线性流程的中断"><span>3. 线性流程的中断</span></a></h2><p>正如前一节提到的，我们应该能够从开始到结束，无障碍地、不间断地阅读认知复杂度最小的代码。然而，一些破坏代码自然流程的元素，因此会增加复杂度级别。这将是以下结构的情况：</p><ul><li>语句：if、三元运算符、switch</li><li>循环：for、while、do while</li><li>try-catch块</li><li>递归</li><li>跳转标签：continue、break</li><li>逻辑运算符序列</li></ul><p>现在，让我们看一个简单的方法示例，并尝试找到使代码可读性降低的结构：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">readFile</span><span class="token punctuation">(</span><span class="token class-name">String</span> path<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// +1 个if；+2 个逻辑运算符序列（&quot;or&quot; 和 &quot;not&quot;）</span>
    <span class="token class-name">String</span> text <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>path <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> path<span class="token punctuation">.</span><span class="token function">trim</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token operator">!</span>path<span class="token punctuation">.</span><span class="token function">endsWith</span><span class="token punctuation">(</span><span class="token string">&quot;.txt&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token constant">DEFAULT_TEXT</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        text <span class="token operator">=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
        <span class="token comment">// +1 个循环</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">String</span> line<span class="token operator">:</span> <span class="token class-name">Files</span><span class="token punctuation">.</span><span class="token function">readAllLines</span><span class="token punctuation">(</span><span class="token class-name">Path</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// +1 个if语句</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>line<span class="token punctuation">.</span><span class="token function">trim</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// +1 个跳转标签</span>
                <span class="token keyword">continue</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            text <span class="token operator">+=</span> line<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IOException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// +1 个catch块</span>
        <span class="token comment">// +1 个if语句</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>e <span class="token keyword">instanceof</span> <span class="token class-name">FileNotFoundException</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            log<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">&quot;could not read the file, returning the default content..&quot;</span><span class="token punctuation">,</span> e<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// +1 个三元运算符</span>
    <span class="token keyword">return</span> text <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">?</span> <span class="token constant">DEFAULT_TEXT</span> <span class="token operator">:</span> text<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>目前，该方法的结构不允许无缝线性流程。<strong>我们讨论的流程中断结构将使认知复杂度级别增加九</strong>。</p><h2 id="_4-嵌套的流程中断结构" tabindex="-1"><a class="header-anchor" href="#_4-嵌套的流程中断结构"><span>4. 嵌套的流程中断结构</span></a></h2><p>随着嵌套作用域的每个额外级别，代码的可读性降低。因此，if、else、catch、switch、循环和lambda表达式的每个后续嵌套级别都将导致认知复杂度增加+1。如果我们回顾前面的例子，我们将发现<strong>两个地方深度嵌套可能导致复杂度分数的额外惩罚</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">readFile</span><span class="token punctuation">(</span><span class="token class-name">String</span> path<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> text <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>path <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> path<span class="token punctuation">.</span><span class="token function">trim</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token operator">!</span>path<span class="token punctuation">.</span><span class="token function">endsWith</span><span class="token punctuation">(</span><span class="token string">&quot;.txt&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token constant">DEFAULT_TEXT</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        text <span class="token operator">=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
        <span class="token comment">// 嵌套级别是1</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">String</span> line<span class="token operator">:</span> <span class="token class-name">Files</span><span class="token punctuation">.</span><span class="token function">readAllLines</span><span class="token punctuation">(</span><span class="token class-name">Path</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 嵌套级别是2 =&gt; 复杂度 +1</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>line<span class="token punctuation">.</span><span class="token function">trim</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">continue</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            text <span class="token operator">+=</span> line<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IOException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 嵌套级别是2 =&gt; 复杂度 +1</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>e <span class="token keyword">instanceof</span> <span class="token class-name">FileNotFoundException</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            log<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">&quot;could not read the file, returning the default content..&quot;</span><span class="token punctuation">,</span> e<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> text <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">?</span> <span class="token constant">DEFAULT_TEXT</span> <span class="token operator">:</span> text<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因此，该方法表现出十一个认知复杂度，准确地代表了其在可读性和理解方面的难度。然而，<strong>通过重构，我们可以显著降低其认知复杂度并提高其整体可读性</strong>。我们将在下一节深入探讨这个重构过程的具体内容。</p><h2 id="_5-重构" tabindex="-1"><a class="header-anchor" href="#_5-重构"><span>5. 重构</span></a></h2><p>我们有一系列重构技术可以降低我们代码的认知复杂度。让我们探索每一种技术，同时突出我们的IDE如何促进它们的安全和有效执行。</p><p>**一种有效的方法包括提取方法或类，这允许我们压缩代码而不会遭受惩罚。**在这种情况下，我们可以使用方法提取来验证_filePath_参数，提高整体清晰度。</p><p>大多数IDE将允许您使用简单的快捷方式或_重构_菜单自动执行此操作。例如，在IntelliJ中，我们可以通过突出显示相应行并使用_Ctrl+Alt+M_（或_Ctrl+Enter_）快捷方式来提取_hasInvalidPath_方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">boolean</span> <span class="token function">hasInvalidPath</span><span class="token punctuation">(</span><span class="token class-name">String</span> path<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> path <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> path<span class="token punctuation">.</span><span class="token function">trim</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token operator">!</span>path<span class="token punctuation">.</span><span class="token function">endsWith</span><span class="token punctuation">(</span><span class="token string">&quot;.txt&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-2-反转条件" tabindex="-1"><a class="header-anchor" href="#_5-2-反转条件"><span>5.2. 反转条件</span></a></h3><p>根据上下文，有时，反转简单的_if_语句可以是减少代码嵌套级别的便捷方式。在我们的示例中，我们可以反转_if_语句，检查行是否为空并避免使用_continue_关键字。再次，IDE可以为这种简单的重构提供帮助：在Intellij中，我们需要突出显示if并点击_Alt+Enter_：</p><h3 id="_5-3-语言特性" tabindex="-1"><a class="header-anchor" href="#_5-3-语言特性"><span>5.3. 语言特性</span></a></h3><p>我们还应该尽可能利用语言特性来避免流程中断结构。例如，我们可以使用多个_catch_块来不同地处理异常。这将帮助我们防止增加额外的_if_语句，这将增加嵌套级别。</p><h3 id="_5-4-提前返回" tabindex="-1"><a class="header-anchor" href="#_5-4-提前返回"><span>5.4. 提前返回</span></a></h3><p>提前返回也可以使方法更短，更容易理解。在这种情况下，提前返回可以帮助我们处理函数末尾的三元运算符。</p><p>如我们所见，我们有机会为_text_变量引入提前返回，并处理_FileNotFoundException_的发生，通过返回_DEFAULT_TEXT_。因此，我们可以通过将_text_变量的声明更靠近其使用（IntelliJ中的_Alt+M_）来改善代码。</p><p>这种调整增强了代码的组织，并避免了使用_null_：</p><h3 id="_5-5-声明式代码" tabindex="-1"><a class="header-anchor" href="#_5-5-声明式代码"><span>5.5. 声明式代码</span></a></h3><p>最后，声明式模式通常会降低代码的嵌套级别和复杂度。例如，Java Streams可以帮助我们使代码更紧凑和全面。让我们使用_Files.lines()_ ——它返回一个_Stream<code>&lt;String&gt;</code><em>——而不是_File.readAllLines</em>。此外，我们可以在初始_path_验证之后立即检查文件是否存在，因为它们使用相同的返回值。</p><p>生成的代码将只有两个处罚，用于执行初始参数验证的_if_语句和逻辑运算：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">readFile</span><span class="token punctuation">(</span><span class="token class-name">String</span> path<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// +1 个if语句；+1 个逻辑运算</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token function">hasInvalidPath</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token function">fileDoesNotExist</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token constant">DEFAULT_TEXT</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">Files</span><span class="token punctuation">.</span><span class="token function">lines</span><span class="token punctuation">(</span><span class="token class-name">Path</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token function">not</span><span class="token punctuation">(</span>line <span class="token operator">-&gt;</span> line<span class="token punctuation">.</span><span class="token function">trim</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">joining</span><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IOException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>由于需要一种精确的方式来评估代码的可读性和可维护性，Sonar开发了认知复杂度度量标准。在本文中，我们介绍了计算函数认知复杂度的过程。</p><p>之后，我们检查了打断代码线性流程的结构。最后，我们讨论了各种重构代码的技术，这些技术允许我们减少函数的认知复杂度。我们使用了IDE功能来重构一个函数，将其复杂度分数从_十一_降低到_二_。</p><p>OK</p>`,50),o=[e];function c(l,i){return a(),s("div",null,o)}const r=n(p,[["render",c],["__file","2024-07-04-Cognitive Complexity and Its Effect on the Code.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-04/2024-07-04-Cognitive%20Complexity%20and%20Its%20Effect%20on%20the%20Code.html","title":"认知复杂度及其对代码的影响","lang":"zh-CN","frontmatter":{"date":"2023-06-01T00:00:00.000Z","category":["Software Engineering"],"tag":["Code Quality","Refactoring"],"head":[["meta",{"name":"keywords","content":"cognitive complexity, cyclomatic complexity, code maintainability, refactoring techniques"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-04/2024-07-04-Cognitive%20Complexity%20and%20Its%20Effect%20on%20the%20Code.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"认知复杂度及其对代码的影响"}],["meta",{"property":"og:description","content":"认知复杂度及其对代码的影响 1. 概述 在本教程中，我们将学习什么是认知复杂度以及如何计算这一度量。我们将逐步了解增加函数认知复杂度的不同模式和结构。包括循环、条件语句、跳转标签、递归、嵌套等元素。接下来，我们将讨论认知复杂度对代码可维护性的有害影响。最后，我们将探索一些重构技术，这些技术可以帮助我们减少这些负面影响。 2. 圈复杂度与认知复杂度 有一..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-04T08:59:04.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Code Quality"}],["meta",{"property":"article:tag","content":"Refactoring"}],["meta",{"property":"article:published_time","content":"2023-06-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-04T08:59:04.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"认知复杂度及其对代码的影响\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-06-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-04T08:59:04.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"认知复杂度及其对代码的影响 1. 概述 在本教程中，我们将学习什么是认知复杂度以及如何计算这一度量。我们将逐步了解增加函数认知复杂度的不同模式和结构。包括循环、条件语句、跳转标签、递归、嵌套等元素。接下来，我们将讨论认知复杂度对代码可维护性的有害影响。最后，我们将探索一些重构技术，这些技术可以帮助我们减少这些负面影响。 2. 圈复杂度与认知复杂度 有一..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 圈复杂度与认知复杂度","slug":"_2-圈复杂度与认知复杂度","link":"#_2-圈复杂度与认知复杂度","children":[{"level":3,"title":"2.1. 圈复杂度","slug":"_2-1-圈复杂度","link":"#_2-1-圈复杂度","children":[]},{"level":3,"title":"2.2. 认知复杂度","slug":"_2-2-认知复杂度","link":"#_2-2-认知复杂度","children":[]}]},{"level":2,"title":"3. 线性流程的中断","slug":"_3-线性流程的中断","link":"#_3-线性流程的中断","children":[]},{"level":2,"title":"4. 嵌套的流程中断结构","slug":"_4-嵌套的流程中断结构","link":"#_4-嵌套的流程中断结构","children":[]},{"level":2,"title":"5. 重构","slug":"_5-重构","link":"#_5-重构","children":[{"level":3,"title":"5.2. 反转条件","slug":"_5-2-反转条件","link":"#_5-2-反转条件","children":[]},{"level":3,"title":"5.3. 语言特性","slug":"_5-3-语言特性","link":"#_5-3-语言特性","children":[]},{"level":3,"title":"5.4. 提前返回","slug":"_5-4-提前返回","link":"#_5-4-提前返回","children":[]},{"level":3,"title":"5.5. 声明式代码","slug":"_5-5-声明式代码","link":"#_5-5-声明式代码","children":[]}]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1720083544000,"updatedTime":1720083544000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":7.98,"words":2394},"filePathRelative":"posts/baeldung/2024-07-04/2024-07-04-Cognitive Complexity and Its Effect on the Code.md","localizedDate":"2023年6月1日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>在本教程中，我们将学习什么是认知复杂度以及如何计算这一度量。我们将逐步了解增加函数认知复杂度的不同模式和结构。包括循环、条件语句、跳转标签、递归、嵌套等元素。接下来，我们将讨论认知复杂度对代码可维护性的有害影响。最后，我们将探索一些重构技术，这些技术可以帮助我们减少这些负面影响。</p>\\n<h2>2. 圈复杂度与认知复杂度</h2>\\n<p>有一段时间，圈复杂度是衡量代码复杂度的唯一方式。因此，出现了一个新的度量标准，它允许我们更准确地衡量代码片段的复杂度。虽然它提供了一个不错的整体评估，但它确实忽略了一些使代码更难理解的重要方面。</p>\\n<h3>2.1. 圈复杂度</h3>","autoDesc":true}');export{r as comp,d as data};
