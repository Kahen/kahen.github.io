import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as e}from"./app-c243dxVF.js";const t={},p=e(`<h1 id="java中的不可达语句-baeldung" tabindex="-1"><a class="header-anchor" href="#java中的不可达语句-baeldung"><span>Java中的不可达语句 | Baeldung</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在本教程中，我们将讨论Java规范，该规范指出如果有任何语句是不可达的，编译器应该抛出错误。不可达语句是在程序执行期间永远无法执行的代码，因为程序流程无法到达它。我们将看到各种代码示例，这些示例符合这一定义。</p><h2 id="_2-循环中的-break-指令后的代码" tabindex="-1"><a class="header-anchor" href="#_2-循环中的-break-指令后的代码"><span>2. 循环中的_break_指令后的代码</span></a></h2><p><strong>在循环中，如果我们在_break_语句后放置指令，它们是不可达的：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UnreachableStatement</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i \`<span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token keyword">int</span> j <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们尝试使用_javac_编译我们的代码：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ javac UnreachableStatement.java
UnreachableStatement.java:9: error: unreachable statement
            int j <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
                ^  
<span class="token number">1</span> error
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如预期的那样，编译失败了，因为_int j = 0;_语句是不可达的。类似地，在循环中的_continue_关键字后的指令也是不可达的：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>i <span class="token operator">&lt;</span> <span class="token number">5</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        i<span class="token operator">++</span><span class="token punctuation">;</span>
        <span class="token keyword">continue</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> j <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-while-true-后的代码" tabindex="-1"><a class="header-anchor" href="#_3-while-true-后的代码"><span>3. _while(true)_后的代码</span></a></h2><p><strong>_while(true)_指令意味着其中的代码将永远运行。</strong> 因此，该代码之后的任何代码都是不可达的：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token keyword">int</span> j <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>再次，之前的代码中的_int j = 0;_语句是不可达的。这一观点也适用于使用_do-while_结构的等效代码：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">do</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> j <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>另一方面，任何在_while(false)_循环内的代码都是不可达的：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> j <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-方法返回后" tabindex="-1"><a class="header-anchor" href="#_4-方法返回后"><span>4. 方法返回后</span></a></h2><p><strong>方法在_return_语句上立即退出。</strong> 因此，此指令之后的任何代码都是不可达的：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>再次，_int j = 0;_行是不可达的，导致编译器错误。类似地，当_throw_语句没有包含在_try-catch_块中或在_throws_子句中指定时，方法异常完成。因此，此行之后的任何代码都是不可达的：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Exception</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>总结一下，如果所有代码分支都返回，以下代码无论如何都是不可达的：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Random</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">nextInt</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">&gt;</span>\` <span class="token number">5</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Exception</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">int</span> j <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这段代码中，我们选择了一个介于_0_（包括）和_10_（不包括）之间的随机数。如果这个数字大于_5_，我们立即返回，如果不是，我们抛出一个通用的_Exception_。因此，没有可能的执行路径到达_if-else_块之后的代码。</p><h2 id="_5-死亡但可达的代码" tabindex="-1"><a class="header-anchor" href="#_5-死亡但可达的代码"><span>5. 死亡但可达的代码</span></a></h2><p>最后，让我们注意到<strong>即使明显的死亡代码从编译器的角度来看也不是强制性的不可达</strong>。特别是，它不评估_if_语句中的条件：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>即使我们一眼就知道_if_块内的代码是死亡代码，这段代码仍然可以成功编译。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们看了很多不可达的语句。在开发人员社区中有一个争论，即是否应该对不可达的代码发出警告或错误。Java语言遵循这样一个原则，即每个编写的代码都应该有目的，因此会抛出错误。在像C++这样的其他语言中，由于编译器可以执行代码，尽管代码不一致，它只会发出警告。</p>`,31),o=[p];function c(l,i){return s(),a("div",null,o)}const d=n(t,[["render",c],["__file","2024-06-27-Unreachable Statements in Java.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-06-27/2024-06-27-Unreachable%20Statements%20in%20Java.html","title":"Java中的不可达语句 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-06-28T00:00:00.000Z","category":["Java","编程"],"tag":["代码","编译错误"],"head":[["meta",{"name":"keywords","content":"Java, 代码, 编译错误, 不可达代码"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-27/2024-06-27-Unreachable%20Statements%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中的不可达语句 | Baeldung"}],["meta",{"property":"og:description","content":"Java中的不可达语句 | Baeldung 1. 概述 在本教程中，我们将讨论Java规范，该规范指出如果有任何语句是不可达的，编译器应该抛出错误。不可达语句是在程序执行期间永远无法执行的代码，因为程序流程无法到达它。我们将看到各种代码示例，这些示例符合这一定义。 2. 循环中的_break_指令后的代码 在循环中，如果我们在_break_语句后放置..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-27T17:31:45.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"代码"}],["meta",{"property":"article:tag","content":"编译错误"}],["meta",{"property":"article:published_time","content":"2024-06-28T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-27T17:31:45.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中的不可达语句 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-28T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-27T17:31:45.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中的不可达语句 | Baeldung 1. 概述 在本教程中，我们将讨论Java规范，该规范指出如果有任何语句是不可达的，编译器应该抛出错误。不可达语句是在程序执行期间永远无法执行的代码，因为程序流程无法到达它。我们将看到各种代码示例，这些示例符合这一定义。 2. 循环中的_break_指令后的代码 在循环中，如果我们在_break_语句后放置..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 循环中的_break_指令后的代码","slug":"_2-循环中的-break-指令后的代码","link":"#_2-循环中的-break-指令后的代码","children":[]},{"level":2,"title":"3. _while(true)_后的代码","slug":"_3-while-true-后的代码","link":"#_3-while-true-后的代码","children":[]},{"level":2,"title":"4. 方法返回后","slug":"_4-方法返回后","link":"#_4-方法返回后","children":[]},{"level":2,"title":"5. 死亡但可达的代码","slug":"_5-死亡但可达的代码","link":"#_5-死亡但可达的代码","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1719509505000,"updatedTime":1719509505000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.04,"words":912},"filePathRelative":"posts/baeldung/2024-06-27/2024-06-27-Unreachable Statements in Java.md","localizedDate":"2024年6月28日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>在本教程中，我们将讨论Java规范，该规范指出如果有任何语句是不可达的，编译器应该抛出错误。不可达语句是在程序执行期间永远无法执行的代码，因为程序流程无法到达它。我们将看到各种代码示例，这些示例符合这一定义。</p>\\n<h2>2. 循环中的_break_指令后的代码</h2>\\n<p><strong>在循环中，如果我们在_break_语句后放置指令，它们是不可达的：</strong></p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">UnreachableStatement</span> <span class=\\"token punctuation\\">{</span>\\n\\n    <span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">static</span> <span class=\\"token keyword\\">void</span> <span class=\\"token function\\">main</span><span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">String</span><span class=\\"token punctuation\\">[</span><span class=\\"token punctuation\\">]</span> args<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token keyword\\">for</span> <span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">int</span> i <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span> i `<span class=\\"token operator\\">&lt;</span> <span class=\\"token number\\">10</span><span class=\\"token punctuation\\">;</span> i<span class=\\"token operator\\">++</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n            <span class=\\"token keyword\\">break</span><span class=\\"token punctuation\\">;</span>\\n            <span class=\\"token keyword\\">int</span> j <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token punctuation\\">}</span>\\n    <span class=\\"token punctuation\\">}</span>\\n\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{d as comp,k as data};
