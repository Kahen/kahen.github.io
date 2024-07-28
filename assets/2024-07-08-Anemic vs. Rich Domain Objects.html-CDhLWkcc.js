import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as e}from"./app-D4B8YWfq.js";const t={},p=e(`<h1 id="贫血模型与丰富领域对象-baeldung" tabindex="-1"><a class="header-anchor" href="#贫血模型与丰富领域对象-baeldung"><span>贫血模型与丰富领域对象 | Baeldung</span></a></h1><p>在本文中，我们将探讨贫血和丰富领域模型之间的区别。我们将首先定义什么是丰富对象，并将其与贫血对象进行对比。从那里开始，我们将检查一个实际的代码示例，并通过封装数据和为我们的领域模型建立一个强大的API来逐步增强其设计。</p><p>让我们首先理解丰富和贫血对象是什么。在个人博客上，Robert C. Martin，《Clean Code》的作者，讨论了贫血对象的概念，称它们为“数据结构”。他通过声明：“类使函数可见，同时使数据隐含。数据结构使数据可见，同时使函数隐含。”来强调数据结构和对象之间的根本区别。</p><p>简单来说，丰富对象隐藏了其底层数据，并且只公开一组公共方法与之交互。相比之下，贫血对象和数据结构揭示了它们的数据，并依赖外部组件进行操作。</p><h3 id="_2-1-丰富对象" tabindex="-1"><a class="header-anchor" href="#_2-1-丰富对象"><span>2.1. 丰富对象</span></a></h3><p>在面向对象编程（OOP）的背景下，对象是一组操作封装数据的函数。一个常见的错误是将对象视为仅仅是元素的集合，并通过直接操作其字段来满足业务需求，从而破坏其封装性。</p><p>为了更深入地理解领域并构建一个丰富的领域模型，我们应该封装数据。结果，我们将把对象视为自治实体，专注于它们的公共接口以满足业务用例。</p><h3 id="_2-2-贫血对象" tabindex="-1"><a class="header-anchor" href="#_2-2-贫血对象"><span>2.2. 贫血对象</span></a></h3><p>相比之下，贫血对象只公开一组数据元素，这些数据元素旨在由隐式函数操作。例如，我们可以想到一个DTO（数据传输对象）：它通过getter和setter公开其字段，但它不知道对它们执行任何操作。</p><p>对于本文的代码示例，让我们假设我们正在开发一个模拟网球比赛的应用程序。让我们看看这个应用程序的贫血领域模型可能是什么样子：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Player</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span> points<span class="token punctuation">;</span>

    <span class="token comment">// 构造函数，getter和setter</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，Player类没有提供任何有用的方法，并且通过getter和setter公开了它所有的字段。随着文章的进展，我们将逐步丰富我们的领域模型，封装其数据。</p><h2 id="_3-封装" tabindex="-1"><a class="header-anchor" href="#_3-封装"><span>3. 封装</span></a></h2><p>缺乏封装是贫血模型的一个主要症状。假设数据通过getter和setter公开。在这种情况下，我们冒着将与我们的模型相关的逻辑散布在整个应用程序并在不同的领域服务中潜在地复制它的风险。</p><p>因此，丰富Player模型的第一步将是质疑它的getter和setter。让我们看看Player类的简单用法，并了解这些数据是如何用于网球比赛的：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TennisGame</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token class-name">Player</span> server<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">Player</span> receiver<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">TennisGame</span><span class="token punctuation">(</span><span class="token class-name">String</span> serverName<span class="token punctuation">,</span> <span class="token class-name">String</span> receiverName<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>server <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Player</span><span class="token punctuation">(</span>serverName<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>receiver <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Player</span><span class="token punctuation">(</span>receiverName<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">wonPoint</span><span class="token punctuation">(</span><span class="token class-name">String</span> playerName<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>server<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>playerName<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            server<span class="token punctuation">.</span><span class="token function">setPoints</span><span class="token punctuation">(</span>server<span class="token punctuation">.</span><span class="token function">getPoints</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            receiver<span class="token punctuation">.</span><span class="token function">setPoints</span><span class="token punctuation">(</span>receiver<span class="token punctuation">.</span><span class="token function">getPoints</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getScore</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 使用下面私有方法的一些逻辑</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">boolean</span> <span class="token function">isScoreEqual</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> server<span class="token punctuation">.</span><span class="token function">getPoints</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> receiver<span class="token punctuation">.</span><span class="token function">getPoints</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">boolean</span> <span class="token function">isGameFinished</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">leadingPlayer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getPoints</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token class-name">Score</span><span class="token punctuation">.</span><span class="token constant">FORTY</span><span class="token punctuation">.</span>points
          <span class="token operator">&amp;&amp;</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">abs</span><span class="token punctuation">(</span>server<span class="token punctuation">.</span><span class="token function">getPoints</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> receiver<span class="token punctuation">.</span><span class="token function">getPoints</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">&gt;=</span> <span class="token number">2</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token class-name">Player</span> <span class="token function">leadingPlayer</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>server<span class="token punctuation">.</span><span class="token function">getPoints</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> receiver<span class="token punctuation">.</span><span class="token function">getPoints</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> server<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> receiver<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">enum</span> <span class="token class-name">Score</span> <span class="token punctuation">{</span>
        <span class="token function">LOVE</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token string">&quot;Love&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token function">FIFTEEN</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">&quot;Fifteen&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token function">THIRTY</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">&quot;Thirty&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token function">FORTY</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token string">&quot;Forty&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token keyword">int</span> points<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">String</span> label<span class="token punctuation">;</span>
        <span class="token comment">// 构造函数</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-1-质疑setters" tabindex="-1"><a class="header-anchor" href="#_3-1-质疑setters"><span>3.1. 质疑Setters</span></a></h3><p>首先，让我们考虑代码中的setter方法。目前，球员的名字作为构造函数参数传递，并且在之后从不改变。因此，我们可以通过删除相应的setter方法，安全地使它们不可变。</p><p>接下来，我们观察到球员一次只能获得一分。因此，我们可以将现有的setter方法替换为一个更专业的_wonPoint()_方法，该方法将球员的得分增加一分：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Player</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span> points<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">Player</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>points <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">wonPoint</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>points<span class="token operator">++</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// getters</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-质疑getters" tabindex="-1"><a class="header-anchor" href="#_3-2-质疑getters"><span>3.2. 质疑Getters</span></a></h3><p>点数的getter被多次用于比较两个球员之间的得分差异。让我们引入一个方法，返回当前球员和他的对手之间的点数差异：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">pointsDifference</span><span class="token punctuation">(</span><span class="token class-name">Player</span> opponent<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>points <span class="token operator">-</span> opponent<span class="token punctuation">.</span>points<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为了检查一个球员是否处于“优势”或者是否赢得了比赛，我们需要一个额外的方法来检查一个球员的得分是否大于给定值：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">hasScoreBiggerThan</span><span class="token punctuation">(</span><span class="token class-name">Score</span> score<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>points <span class="token operator">&gt;</span> score<span class="token punctuation">.</span><span class="token function">points</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们删除getter并使用Player对象上的丰富接口：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">boolean</span> <span class="token function">isScoreEqual</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> server<span class="token punctuation">.</span><span class="token function">pointsDifference</span><span class="token punctuation">(</span>receiver<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">private</span> <span class="token class-name">Player</span> <span class="token function">leadingPlayer</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>server<span class="token punctuation">.</span><span class="token function">pointsDifference</span><span class="token punctuation">(</span>receiver<span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> server<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> receiver<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">private</span> <span class="token keyword">boolean</span> <span class="token function">isGameFinished</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">leadingPlayer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">hasScoreBiggerThan</span><span class="token punctuation">(</span><span class="token class-name">Score</span><span class="token punctuation">.</span><span class="token constant">FORTY</span><span class="token punctuation">)</span>
      <span class="token operator">&amp;&amp;</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">abs</span><span class="token punctuation">(</span>server<span class="token punctuation">.</span><span class="token function">pointsDifference</span><span class="token punctuation">(</span>receiver<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">&gt;=</span> <span class="token number">2</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">private</span> <span class="token keyword">boolean</span> <span class="token function">isAdvantage</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">leadingPlayer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">hasScoreBiggerThan</span><span class="token punctuation">(</span><span class="token class-name">Score</span><span class="token punctuation">.</span><span class="token constant">FORTY</span><span class="token punctuation">)</span>
      <span class="token operator">&amp;&amp;</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">abs</span><span class="token punctuation">(</span>server<span class="token punctuation">.</span><span class="token function">pointsDifference</span><span class="token punctuation">(</span>receiver<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-低耦合" tabindex="-1"><a class="header-anchor" href="#_4-低耦合"><span>4. 低耦合</span></a></h2><p>**一个丰富的领域模型会导致设计具有低耦合。**通过移除_getPoints()_和_setPoints()_方法并增强对象的API，我们成功地隐藏了实现细节。让我们再次看看Player类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Player</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span> points<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">Player</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>points <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">gainPoint</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        points<span class="token operator">++</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">hasScoreBiggerThan</span><span class="token punctuation">(</span><span class="token class-name">Score</span> score<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>points <span class="token operator">&gt;</span> score<span class="token punctuation">.</span><span class="token function">points</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">pointsDifference</span><span class="token punctuation">(</span><span class="token class-name">Player</span> other<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> points <span class="token operator">-</span> other<span class="token punctuation">.</span>points<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">name</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> name<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">score</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">Score</span><span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span>points<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">label</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，我们可以轻松地更改内部数据结构。例如，我们可以创建一个新的类来存储球员的得分，而不是依赖于_int_原始类型，而不影响使用Player类的任何客户端。</p><h2 id="_5-高内聚" tabindex="-1"><a class="header-anchor" href="#_5-高内聚"><span>5. 高内聚</span></a></h2><p>一个丰富的模型也可以增加我们领域的内聚性，并符合单一职责原则。在这种情况下，Player实例负责管理它赢得的分数数量，而TennisGame类承担协调两名球员和跟踪比赛总得分的责任。</p><p><strong>然而，当将这些小逻辑片段从用例实现移动到我们的模型中时，我们应该小心。作为经验法则，我们只应该移动与用例无关的函数以保持高内聚。</strong></p><p>换句话说，我们可能被诱惑向Player类添加一个方法，如“<em>hasWonOver(Player opponent)</em>”，但这个规则只有在球员相互对抗时才有意义。此外，这不是一个与用例无关的规则：赢得比赛的条件可能根据比赛的格式（例如，当打单打、双打、三盘两胜制、五盘三胜制或其他格式）而有所不同。</p><h2 id="_6-增加表达力" tabindex="-1"><a class="header-anchor" href="#_6-增加表达力"><span>6. 增加表达力</span></a></h2><p>**丰富领域模型的另一个好处是，它允许我们减少领域服务或用例类的复杂性。**换句话说，TennisGame类现在将更具表达力，允许开发人员通过隐藏与Player相关的细节来专注于业务规则。</p><p>**质疑getter和setter的使用过程以及对Player类公共API的更改，挑战了我们对我们领域模型及其能力的更深入理解。**这是一个经常被忽视的重要步骤，因为使用像IDEs或Lombok这样的工具自动生成getter和setter的便利性。</p><h2 id="_7-结论" tabindex="-1"><a class="header-anchor" href="#_7-结论"><span>7. 结论</span></a></h2><p>在本文中，我们讨论了贫血对象的概念以及采用丰富领域模型的优势。随后，我们提供了一个实际示例，展示了如何封装对象的数据并提供改进的接口。最后，我们发现这种方法的许多好处，包括增加的表达力、提高的内聚性和降低的耦合。</p><p>像往常一样，完整的代码可以在GitHub上找到。</p>`,41),o=[p];function c(i,l){return a(),s("div",null,o)}const k=n(t,[["render",c],["__file","2024-07-08-Anemic vs. Rich Domain Objects.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-08/2024-07-08-Anemic%20vs.%20Rich%20Domain%20Objects.html","title":"贫血模型与丰富领域对象 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Software Engineering"],"tag":["Domain-Driven Design","Object-Oriented Programming"],"head":[["meta",{"name":"keywords","content":"Java, Anemic Domain Model, Rich Domain Model, Encapsulation"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-08/2024-07-08-Anemic%20vs.%20Rich%20Domain%20Objects.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"贫血模型与丰富领域对象 | Baeldung"}],["meta",{"property":"og:description","content":"贫血模型与丰富领域对象 | Baeldung 在本文中，我们将探讨贫血和丰富领域模型之间的区别。我们将首先定义什么是丰富对象，并将其与贫血对象进行对比。从那里开始，我们将检查一个实际的代码示例，并通过封装数据和为我们的领域模型建立一个强大的API来逐步增强其设计。 让我们首先理解丰富和贫血对象是什么。在个人博客上，Robert C. Martin，《C..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-08T14:59:33.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Domain-Driven Design"}],["meta",{"property":"article:tag","content":"Object-Oriented Programming"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-08T14:59:33.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"贫血模型与丰富领域对象 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-08T14:59:33.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"贫血模型与丰富领域对象 | Baeldung 在本文中，我们将探讨贫血和丰富领域模型之间的区别。我们将首先定义什么是丰富对象，并将其与贫血对象进行对比。从那里开始，我们将检查一个实际的代码示例，并通过封装数据和为我们的领域模型建立一个强大的API来逐步增强其设计。 让我们首先理解丰富和贫血对象是什么。在个人博客上，Robert C. Martin，《C..."},"headers":[{"level":3,"title":"2.1. 丰富对象","slug":"_2-1-丰富对象","link":"#_2-1-丰富对象","children":[]},{"level":3,"title":"2.2. 贫血对象","slug":"_2-2-贫血对象","link":"#_2-2-贫血对象","children":[]},{"level":2,"title":"3. 封装","slug":"_3-封装","link":"#_3-封装","children":[{"level":3,"title":"3.1. 质疑Setters","slug":"_3-1-质疑setters","link":"#_3-1-质疑setters","children":[]},{"level":3,"title":"3.2. 质疑Getters","slug":"_3-2-质疑getters","link":"#_3-2-质疑getters","children":[]}]},{"level":2,"title":"4. 低耦合","slug":"_4-低耦合","link":"#_4-低耦合","children":[]},{"level":2,"title":"5. 高内聚","slug":"_5-高内聚","link":"#_5-高内聚","children":[]},{"level":2,"title":"6. 增加表达力","slug":"_6-增加表达力","link":"#_6-增加表达力","children":[]},{"level":2,"title":"7. 结论","slug":"_7-结论","link":"#_7-结论","children":[]}],"git":{"createdTime":1720450773000,"updatedTime":1720450773000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":6.44,"words":1931},"filePathRelative":"posts/baeldung/2024-07-08/2024-07-08-Anemic vs. Rich Domain Objects.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在本文中，我们将探讨贫血和丰富领域模型之间的区别。我们将首先定义什么是丰富对象，并将其与贫血对象进行对比。从那里开始，我们将检查一个实际的代码示例，并通过封装数据和为我们的领域模型建立一个强大的API来逐步增强其设计。</p>\\n<p>让我们首先理解丰富和贫血对象是什么。在个人博客上，Robert C. Martin，《Clean Code》的作者，讨论了贫血对象的概念，称它们为“数据结构”。他通过声明：“类使函数可见，同时使数据隐含。数据结构使数据可见，同时使函数隐含。”来强调数据结构和对象之间的根本区别。</p>\\n<p>简单来说，丰富对象隐藏了其底层数据，并且只公开一组公共方法与之交互。相比之下，贫血对象和数据结构揭示了它们的数据，并依赖外部组件进行操作。</p>","autoDesc":true}');export{k as comp,d as data};
