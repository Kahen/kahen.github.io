import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-DlW52zYa.js";const p={},e=t(`<h1 id="java-21的新特性概览" tabindex="-1"><a class="header-anchor" href="#java-21的新特性概览"><span>Java 21的新特性概览</span></a></h1><p>Oracle在2023年9月19日发布了Java 21，这是继Java 17之后的最新的Java长期支持(LTS)版本。</p><p>本文将讨论Java 21中新增的特性和增强功能。</p><h2 id="_2-通过jep引入的显著增强功能列表" tabindex="-1"><a class="header-anchor" href="#_2-通过jep引入的显著增强功能列表"><span>2. 通过JEP引入的显著增强功能列表</span></a></h2><h3 id="_2-1-记录模式-jep-440" tabindex="-1"><a class="header-anchor" href="#_2-1-记录模式-jep-440"><span>2.1. 记录模式（JEP 440）</span></a></h3><p>记录模式在Java 19和Java 20中作为预览特性被包含进来，Java 21进一步改进了这一特性。</p><p><strong>此JEP将现有的模式匹配功能扩展到解构记录类实例，这使得编写复杂的数据查询成为可能</strong>。还增加了对嵌套模式的支持，以实现更可组合的数据查询。</p><p>以下是示例代码：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">record</span> <span class="token class-name">Point</span><span class="token punctuation">(</span><span class="token keyword">int</span> x<span class="token punctuation">,</span> <span class="token keyword">int</span> y<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">beforeRecordPattern</span><span class="token punctuation">(</span><span class="token class-name">Object</span> obj<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> sum <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>obj <span class="token keyword">instanceof</span> <span class="token class-name">Point</span> p<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> x <span class="token operator">=</span> p<span class="token punctuation">.</span><span class="token function">x</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> y <span class="token operator">=</span> p<span class="token punctuation">.</span><span class="token function">y</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        sum <span class="token operator">=</span> x<span class="token operator">+</span>y<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> sum<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">afterRecordPattern</span><span class="token punctuation">(</span><span class="token class-name">Object</span> obj<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>obj <span class="token keyword">instanceof</span> <span class="token class-name">Point</span><span class="token punctuation">(</span><span class="token keyword">int</span> x<span class="token punctuation">,</span> <span class="token keyword">int</span> y<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> x<span class="token operator">+</span>y<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们还可以使用嵌套记录模式。以下示例演示了这一点：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">enum</span> <span class="token class-name">Color</span> <span class="token punctuation">{</span><span class="token constant">RED</span><span class="token punctuation">,</span> <span class="token constant">GREEN</span><span class="token punctuation">,</span> <span class="token constant">BLUE</span><span class="token punctuation">}</span>
<span class="token keyword">record</span> <span class="token class-name">ColoredPoint</span><span class="token punctuation">(</span><span class="token class-name">Point</span> point<span class="token punctuation">,</span> <span class="token class-name">Color</span> color<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token keyword">record</span> <span class="token class-name">RandomPoint</span><span class="token punctuation">(</span><span class="token class-name">ColoredPoint</span> cp<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Color</span> <span class="token function">getRamdomPointColor</span><span class="token punctuation">(</span><span class="token class-name">RandomPoint</span> r<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>r <span class="token keyword">instanceof</span> <span class="token class-name">RandomPoint</span><span class="token punctuation">(</span><span class="token class-name">ColoredPoint</span> cp<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> cp<span class="token punctuation">.</span><span class="token function">color</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的代码片段中，我们解构了_ColoredPoint_以访问_color()_方法。</p><h3 id="_2-2-switch语句的模式匹配-jep-441" tabindex="-1"><a class="header-anchor" href="#_2-2-switch语句的模式匹配-jep-441"><span>2.2. switch语句的模式匹配（JEP 441）</span></a></h3><p>switch语句的模式匹配在JDK 17中引入，并在JDK 18、19、20和JDK 21中进行了改进。</p><p><strong>此特性的主要目标是</strong> <strong>允许在switch case标签中使用模式，以提高switch语句和表达式的表达能力</strong>。此外，还通过允许null case标签来增强处理_NullPointerException_的能力。</p><p>让我们通过一个示例来探索这一点：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Account</span><span class="token punctuation">{</span>
    <span class="token keyword">double</span> <span class="token function">getBalance</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">SavingsAccount</span> <span class="token keyword">extends</span> <span class="token class-name">Account</span> <span class="token punctuation">{</span>
    <span class="token keyword">double</span> <span class="token function">getBalance</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token number">100</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">TermAccount</span> <span class="token keyword">extends</span> <span class="token class-name">Account</span> <span class="token punctuation">{</span>
    <span class="token keyword">double</span> <span class="token function">getBalance</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token number">1000</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">CurrentAccount</span> <span class="token keyword">extends</span> <span class="token class-name">Account</span> <span class="token punctuation">{</span>
    <span class="token keyword">double</span> <span class="token function">getBalance</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token number">10000</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在Java 21之前，我们可以使用以下代码来获取余额：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token keyword">double</span> <span class="token function">getBalanceWithOutSwitchPattern</span><span class="token punctuation">(</span><span class="token class-name">Account</span> account<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">double</span> balance <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>account <span class="token keyword">instanceof</span> <span class="token class-name">SavingsAccount</span> sa<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        balance <span class="token operator">=</span> sa<span class="token punctuation">.</span><span class="token function">getBalance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span>account <span class="token keyword">instanceof</span> <span class="token class-name">TermAccount</span> ta<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        balance <span class="token operator">=</span> ta<span class="token punctuation">.</span><span class="token function">getBalance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span>account <span class="token keyword">instanceof</span> <span class="token class-name">CurrentAccount</span> ca<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        balance <span class="token operator">=</span> ca<span class="token punctuation">.</span><span class="token function">getBalance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> balance<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述代码的表达能力不是很强。有了Java 21，我们可以在_case_标签中使用模式：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token keyword">double</span> <span class="token function">getBalanceWithSwitchPattern</span><span class="token punctuation">(</span><span class="token class-name">Account</span> account<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">double</span> result <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">switch</span> <span class="token punctuation">(</span>account<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">case</span> <span class="token keyword">null</span> <span class="token operator">-&gt;</span> <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span><span class="token string">&quot;Oops, account is null&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">case</span> <span class="token class-name">SavingsAccount</span> sa <span class="token operator">-&gt;</span> result <span class="token operator">=</span> sa<span class="token punctuation">.</span><span class="token function">getBalance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">case</span> <span class="token class-name">TermAccount</span> ta <span class="token operator">-&gt;</span> result <span class="token operator">=</span> ta<span class="token punctuation">.</span><span class="token function">getBalance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">case</span> <span class="token class-name">CurrentAccount</span> ca <span class="token operator">-&gt;</span> result <span class="token operator">=</span> ca<span class="token punctuation">.</span><span class="token function">getBalance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">default</span> <span class="token operator">-&gt;</span> result <span class="token operator">=</span> account<span class="token punctuation">.</span><span class="token function">getBalance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> result<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一个模式_case_标签还支持多个值。让我们通过一个示例来详细说明这一点：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">processInputOld</span><span class="token punctuation">(</span><span class="token class-name">String</span> input<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> output <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token keyword">switch</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">case</span> <span class="token keyword">null</span> <span class="token operator">-&gt;</span> output <span class="token operator">=</span> <span class="token string">&quot;Oops, null&quot;</span><span class="token punctuation">;</span>
        <span class="token keyword">case</span> <span class="token class-name">String</span> s <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token string">&quot;Yes&quot;</span><span class="token punctuation">.</span><span class="token function">equalsIgnoreCase</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                output <span class="token operator">=</span> <span class="token string">&quot;It&#39;s Yes&quot;</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token string">&quot;No&quot;</span><span class="token punctuation">.</span><span class="token function">equalsIgnoreCase</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                output <span class="token operator">=</span> <span class="token string">&quot;It&#39;s No&quot;</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">else</span> <span class="token punctuation">{</span>
                output <span class="token operator">=</span> <span class="token string">&quot;Try Again&quot;</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> output<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述代码可以使用Java 21的_case_标签中的_when_子句进行增强：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">processInputNew</span><span class="token punctuation">(</span><span class="token class-name">String</span> input<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> output <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token keyword">switch</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">case</span> <span class="token keyword">null</span> <span class="token operator">-&gt;</span> output <span class="token operator">=</span> <span class="token string">&quot;Oops, null&quot;</span><span class="token punctuation">;</span>
        <span class="token keyword">case</span> <span class="token class-name">String</span> s when <span class="token string">&quot;Yes&quot;</span><span class="token punctuation">.</span><span class="token function">equalsIgnoreCase</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> output <span class="token operator">=</span> <span class="token string">&quot;It&#39;s Yes&quot;</span><span class="token punctuation">;</span>
        <span class="token keyword">case</span> <span class="token class-name">String</span> s when <span class="token string">&quot;No&quot;</span><span class="token punctuation">.</span><span class="token function">equalsIgnoreCase</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> output <span class="token operator">=</span> <span class="token string">&quot;It&#39;s No&quot;</span><span class="token punctuation">;</span>
        <span class="token keyword">case</span> <span class="token class-name">String</span> s <span class="token operator">-&gt;</span> output <span class="token operator">=</span> <span class="token string">&quot;Try Again&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> output<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3-字符串字面量-jep-430" tabindex="-1"><a class="header-anchor" href="#_2-3-字符串字面量-jep-430"><span>2.3. 字符串字面量（JEP 430）</span></a></h3><p>Java提供了几种机制来使用字符串字面量和表达式来组合字符串。其中一些是字符串连接、StringBuilder类、String类的format()方法和MessageFormat类。</p><p><strong>Java 21引入了</strong> <strong>字符串模板</strong>。这补充了Java现有的字符串字面量和文本块，通过将文本与模板表达式和模板处理器结合，生成所需的结果。</p><p>让我们看一个例子：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> name <span class="token operator">=</span> <span class="token string">&quot;Baeldung&quot;</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> welcomeText <span class="token operator">=</span> <span class="token constant">STR</span><span class="token punctuation">.</span><span class="token string">&quot;Welcome to {name}&quot;</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>welcomeText<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述代码片段打印文本“<em>Welcome to Baeldung</em>”。</p><p>在上述文本中，我们有一个模板处理器（STR）、一个点字符和一个包含嵌入表达式的模板（<em>{name}</em>）。在运行时，当模板处理器评估模板表达式时，它将模板中的文本与嵌入表达式的值结合起来，以产生结果。</p><p>STR是由Java提供的模板处理器之一，并且自动导入到所有Java源文件中。Java提供的其他模板处理器是FMT和RAW。</p><h3 id="_2-4-虚拟线程-jep-444" tabindex="-1"><a class="header-anchor" href="#_2-4-虚拟线程-jep-444"><span>2.4. 虚拟线程（JEP 444）</span></a></h3><p>虚拟线程最初作为Java 19中的预览特性引入，并在Java 20中进一步改进。Java 21引入了一些新的变化。</p><p><strong>虚拟线程是轻量级线程。这些线程的主要目的是减少开发高并发应用程序的工作量。</strong> 传统线程也称为平台线程，是OS线程的薄包装器。平台线程的一个主要问题是它们在OS线程上运行代码，并在其整个生命周期中捕获OS线程。OS线程的数量有限，这造成了可扩展性瓶颈。</p><p><strong>像平台线程一样，虚拟线程也是java.lang.Thread类的实例，但它不绑定到特定的OS线程</strong>。它在特定的OS线程上运行代码，但不会在整个生命周期中捕获线程。因此，许多虚拟线程可以共享OS线程来运行它们的代码。</p><p>让我们通过一个示例来使用虚拟线程：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">try</span><span class="token punctuation">(</span><span class="token keyword">var</span> executor <span class="token operator">=</span> <span class="token class-name">Executors</span><span class="token punctuation">.</span><span class="token function">newVirtualThreadPerTaskExecutor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">IntStream</span><span class="token punctuation">.</span><span class="token function">rangeClosed</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">10_000</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>i <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
        executor<span class="token punctuation">.</span><span class="token function">submit</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">try</span> <span class="token punctuation">{</span>
                <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token class-name">Duration</span><span class="token punctuation">.</span><span class="token function">ofSeconds</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的代码片段中，我们使用静态_newVirtualThreadPerTaskExecutor()_方法。这个执行器为每个任务创建一个新的虚拟线程。因此，在上述示例中，我们创建了_10000_个虚拟线程。</p><p>Java 21对虚拟线程引入了两个值得注意的变化：</p><ul><li>虚拟线程现在始终支持线程局部变量。</li><li>通过_Thread.Builder_ API创建的虚拟线程也在其生命周期内被监控，并且在新的线程转储中可观察</li></ul><h3 id="_2-5-有序集合-jep-431" tabindex="-1"><a class="header-anchor" href="#_2-5-有序集合-jep-431"><span>2.5. 有序集合（JEP 431）</span></a></h3><p>在Java集合框架中，没有集合类型表示具有定义的遇到顺序的元素序列。例如，List和Deque接口定义了遇到顺序，但它们的公共超类型Collection没有。同样，Set没有定义遇到顺序，但像LinkedHashSet或SortedSet这样的子类型确实有。</p><p><strong>Java 21引入了三个新的接口来表示有序集合、有序集合和有序映射。</strong></p><p>有序集合是一个元素具有定义的遇到顺序的集合。它有第一个和最后一个元素，它们之间的元素有后继和前驱。有序集合是一个没有重复元素的有序集合。有序映射是一个条目具有定义的遇到顺序的映射。</p><p>下图显示了新引入的接口在集合框架层次结构中的改装：</p><h3 id="_2-6-密钥封装机制api-jep-452" tabindex="-1"><a class="header-anchor" href="#_2-6-密钥封装机制api-jep-452"><span>2.6. 密钥封装机制API（JEP 452）</span></a></h3><p>密钥封装是一种使用非对称密钥或公钥密码学来保护对称密钥的技术。</p><p>传统的方法使用公钥来保护随机生成的对称密钥。然而，这种方法需要填充，这很难证明是安全的。</p><p>密钥封装机制（KEM）使用公钥来派生不需要任何填充的对称密钥。</p><p><strong>Java 21引入了一个新的KEM API，使应用程序能够使用KEM算法。</strong></p><h2 id="_3-结论" tabindex="-1"><a class="header-anchor" href="#_3-结论"><span>3. 结论</span></a></h2><p>在本文中，我们讨论了Java 21中交付的一些显著变化。</p><p>我们讨论了记录模式、switch语句的模式匹配、字符串模板、有序集合、虚拟线程和新的</p>`,55),o=[e];function c(l,i){return a(),s("div",null,o)}const k=n(p,[["render",c],["__file","2024-06-19-New Features in Java 21.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/Archive/2024-06-19-New%20Features%20in%20Java%2021.html","title":"Java 21的新特性概览","lang":"zh-CN","frontmatter":{"date":"2023-09-19T00:00:00.000Z","category":["Java","New Features"],"tag":["Java 21","JEP"],"head":[["meta",{"name":"keywords","content":"Java 21, New Features, JEP, LTS"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/2024-06-19-New%20Features%20in%20Java%2021.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java 21的新特性概览"}],["meta",{"property":"og:description","content":"Java 21的新特性概览 Oracle在2023年9月19日发布了Java 21，这是继Java 17之后的最新的Java长期支持(LTS)版本。 本文将讨论Java 21中新增的特性和增强功能。 2. 通过JEP引入的显著增强功能列表 2.1. 记录模式（JEP 440） 记录模式在Java 19和Java 20中作为预览特性被包含进来，Java ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java 21"}],["meta",{"property":"article:tag","content":"JEP"}],["meta",{"property":"article:published_time","content":"2023-09-19T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java 21的新特性概览\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-09-19T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java 21的新特性概览 Oracle在2023年9月19日发布了Java 21，这是继Java 17之后的最新的Java长期支持(LTS)版本。 本文将讨论Java 21中新增的特性和增强功能。 2. 通过JEP引入的显著增强功能列表 2.1. 记录模式（JEP 440） 记录模式在Java 19和Java 20中作为预览特性被包含进来，Java ..."},"headers":[{"level":2,"title":"2. 通过JEP引入的显著增强功能列表","slug":"_2-通过jep引入的显著增强功能列表","link":"#_2-通过jep引入的显著增强功能列表","children":[{"level":3,"title":"2.1. 记录模式（JEP 440）","slug":"_2-1-记录模式-jep-440","link":"#_2-1-记录模式-jep-440","children":[]},{"level":3,"title":"2.2. switch语句的模式匹配（JEP 441）","slug":"_2-2-switch语句的模式匹配-jep-441","link":"#_2-2-switch语句的模式匹配-jep-441","children":[]},{"level":3,"title":"2.3. 字符串字面量（JEP 430）","slug":"_2-3-字符串字面量-jep-430","link":"#_2-3-字符串字面量-jep-430","children":[]},{"level":3,"title":"2.4. 虚拟线程（JEP 444）","slug":"_2-4-虚拟线程-jep-444","link":"#_2-4-虚拟线程-jep-444","children":[]},{"level":3,"title":"2.5. 有序集合（JEP 431）","slug":"_2-5-有序集合-jep-431","link":"#_2-5-有序集合-jep-431","children":[]},{"level":3,"title":"2.6. 密钥封装机制API（JEP 452）","slug":"_2-6-密钥封装机制api-jep-452","link":"#_2-6-密钥封装机制api-jep-452","children":[]}]},{"level":2,"title":"3. 结论","slug":"_3-结论","link":"#_3-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":6.07,"words":1821},"filePathRelative":"posts/baeldung/Archive/2024-06-19-New Features in Java 21.md","localizedDate":"2023年9月19日","excerpt":"\\n<p>Oracle在2023年9月19日发布了Java 21，这是继Java 17之后的最新的Java长期支持(LTS)版本。</p>\\n<p>本文将讨论Java 21中新增的特性和增强功能。</p>\\n<h2>2. 通过JEP引入的显著增强功能列表</h2>\\n<h3>2.1. 记录模式（JEP 440）</h3>\\n<p>记录模式在Java 19和Java 20中作为预览特性被包含进来，Java 21进一步改进了这一特性。</p>\\n<p><strong>此JEP将现有的模式匹配功能扩展到解构记录类实例，这使得编写复杂的数据查询成为可能</strong>。还增加了对嵌套模式的支持，以实现更可组合的数据查询。</p>","autoDesc":true}');export{k as comp,d as data};
