import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-CBerKIce.js";const p={},e=t(`<h1 id="java中冒号的多种用法" tabindex="-1"><a class="header-anchor" href="#java中冒号的多种用法"><span>Java中冒号的多种用法</span></a></h1><p>许多编程语言使用冒号字符(:)来实现不同的功能。例如，C++使用它进行访问修饰符和类继承，JavaScript使用它进行对象声明。Python语言在函数定义、条件块、循环等方面大量依赖它。</p><p>事实证明，<strong>Java也有一个长长的列表，其中冒号字符出现的地方</strong>。在本教程中，我们将一一查看它们。</p><h2 id="_2-增强型for循环" tabindex="-1"><a class="header-anchor" href="#_2-增强型for循环"><span>2. 增强型for循环</span></a></h2><p>for循环是程序员在任何语言中首先学习的控制语句之一。这是Java中的语法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i \`<span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 做一些事情</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>除了其他事情外，这种控制结构非常适合遍历集合或数组中的项目。实际上，这个用例如此常见，以至于在Java 1.5中，语言引入了一种更紧凑的形式，称为for-each循环。</p><p>下面是一个使用for-each语法遍历数组的示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> numbers <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">:</span> numbers<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 做一些事情</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里我们可以注意到冒号字符。<strong>我们应该将其读作“在”</strong>。因此，上面的循环可以被认为是“对于numbers中的每个整数i”。</p><p>除了数组，这种语法还可以用于List和Set：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>\` numbers <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Integer</span> i <span class="token operator">:</span> numbers<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 做一些事情</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>for-each循环的目的是消除与标准for循环相关的样板代码，从而减少错误的可能性。但是，它通过牺牲一些功能来实现这一点，比如跳过索引、反向迭代等。</p><h2 id="_3-switch语句" tabindex="-1"><a class="header-anchor" href="#_3-switch语句"><span>3. switch语句</span></a></h2><p>在Java中，我们发现冒号字符的另一个地方是在switch语句中。<strong>switch语句是一种更易读、通常更紧凑的if/else块的形式</strong>。</p><p>让我们看一个例子：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">void</span> <span class="token function">printAnimalSound</span><span class="token punctuation">(</span><span class="token class-name">String</span> animal<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>animal<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token string">&quot;cat&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;meow&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>animal<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token string">&quot;lion&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;roar&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>animal<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token string">&quot;dog&quot;</span><span class="token punctuation">)</span> <span class="token operator">||</span> animal<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token string">&quot;seal&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;bark&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;unknown&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这组语句可以使用switch语句重写：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">void</span> <span class="token function">printAnimalSound</span><span class="token punctuation">(</span><span class="token class-name">String</span> animal<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">switch</span><span class="token punctuation">(</span>animal<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">case</span> <span class="token string">&quot;cat&quot;</span><span class="token operator">:</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;meow&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">break</span><span class="token punctuation">;</span>
        <span class="token keyword">case</span> <span class="token string">&quot;lion&quot;</span><span class="token operator">:</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;roar&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">break</span><span class="token punctuation">;</span>
        <span class="token keyword">case</span> <span class="token string">&quot;dog&quot;</span><span class="token operator">:</span>
        <span class="token keyword">case</span> <span class="token string">&quot;seal&quot;</span><span class="token operator">:</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;bark&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">break</span><span class="token punctuation">;</span>
        <span class="token keyword">default</span><span class="token operator">:</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;unknown&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这种情况下，冒号字符出现在每个case的末尾。但是，这只是传统的switch语句的情况。在Java 12中，语言添加了一种使用表达式的扩展形式的switch，<strong>在这种情况下，我们使用箭头运算符(-&gt;)而不是冒号</strong>。</p><h2 id="_4-标签" tabindex="-1"><a class="header-anchor" href="#_4-标签"><span>4. 标签</span></a></h2><p>Java的一个经常被遗忘的特性是标签。虽然一些程序员可能对标签及其与goto语句的关联有不好的记忆，但在Java中，标签有一个非常重要的用途。</p><p>让我们考虑一系列嵌套循环：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i \`<span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> j <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> j <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> j<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">checkSomeCondition</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">break</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这种情况下，break关键字导致内部循环停止执行，并将控制权返回给外部循环。这是因为，默认情况下，<strong>break语句将控制权返回到最近的控制块的末尾</strong>。在这种情况下，这意味着j变量的循环。让我们看看如何使用标签改变行为。</p><p>首先，我们需要用标签重写我们的循环：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>outerLoop<span class="token operator">:</span> <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    innerLoop<span class="token operator">:</span> <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> j <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> j <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> j<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">checkSomeCondition</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">break</span> outerLoop<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们有相同的两个循环，但现在每个都有一个标签：一个命名为outerLoop，另一个命名为innerLoop。我们可以注意到，break语句现在后面跟着一个标签名称。<strong>这指示JVM将控制权转移到该标记语句的末尾</strong>，而不是默认行为。结果是break语句退出了i变量的循环，有效地结束了两个循环。</p><h2 id="_5-三元运算符" tabindex="-1"><a class="header-anchor" href="#_5-三元运算符"><span>5. 三元运算符</span></a></h2><p><strong>Java三元运算符是简单if/else语句的简写</strong>。假设我们有以下代码：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span> x<span class="token punctuation">;</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">checkSomeCondition</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    x <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">else</span> <span class="token punctuation">{</span>
    x <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用三元运算符，我们可以缩短相同的代码：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>x <span class="token operator">=</span> <span class="token function">checkSomeCondition</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">?</span> <span class="token number">1</span> <span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>此外，三元运算符与其他语句一起使用可以提高我们的代码可读性：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">boolean</span> remoteCallResult <span class="token operator">=</span> <span class="token function">callRemoteApi</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token constant">LOG</span><span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span>
  <span class="token string">&quot;The result of the remote API call %s successful&quot;</span><span class="token punctuation">,</span>
  remoteCallResult <span class="token operator">?</span> <span class="token string">&quot;was&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;was not&quot;</span>
<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>这节省了我们将三元运算符的结果分配给单独变量的额外步骤</strong>，使我们的代码更紧凑，更易于理解。</p><h2 id="_6-方法引用" tabindex="-1"><a class="header-anchor" href="#_6-方法引用"><span>6. 方法引用</span></a></h2><p>作为lambda项目的一部分，在Java 8中引入的方法引用也使用冒号字符。<strong>方法引用在Java中的多个地方出现，最明显的是在流中</strong>。让我们看几个例子。</p><p>假设我们有一个名称列表，想要将每个名称大写。在lambdas和方法引用之前，我们可能会使用传统的for循环：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\`\`\` names <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token string">&quot;ross&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;joey&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;chandler&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">List</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\`\` upperCaseNames <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">String</span> name <span class="token operator">:</span> names<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  upperCaseNames<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>name<span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以使用流和方法引用来简化这个操作：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\`\` names <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token string">&quot;ross&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;joey&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;chandler&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">List</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\`\` upperCaseNames <span class="token operator">=</span> names
  <span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token operator">::</span><span class="token function">toUpperCase</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这种情况下，我们正在使用String类中的toUpperCase()实例方法的引用作为map()操作的一部分。</p><p>方法引用对于filter()操作也很有用，其中方法接受一个参数并返回一个boolean：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Animal</span><span class="token punctuation">&gt;</span></span>\`\`\`\` pets <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Cat</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Dog</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Parrot</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">List</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Animal</span><span class="token punctuation">&gt;</span></span>\`\`\`\` onlyDogs <span class="token operator">=</span> pets
  <span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token class-name">Dog</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token operator">::</span><span class="token function">isInstance</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这种情况下，我们正在使用所有类可用的isInstance()方法的方法引用来过滤不同动物类型的列表。</p><p>最后，我们也可以使用方法引用与构造函数。我们通过将new运算符与类名和方法引用结合来实现这一点：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Animal</span><span class="token punctuation">&gt;</span></span>\`\`\`\` pets <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Cat</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Dog</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Parrot</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Set</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Animal</span><span class="token punctuation">&gt;</span></span>\`\`\`\` onlyDogs <span class="token operator">=</span> pets
  <span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token class-name">Dog</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token operator">::</span><span class="token function">isInstance</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toCollection</span><span class="token punctuation">(</span><span class="token class-name">TreeSet</span><span class="token operator">::</span><span class="token keyword">new</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这种情况下，我们正在将过滤后的动物收集到一个新的TreeSet而不是List中。</p><h2 id="_7-断言" tabindex="-1"><a class="header-anchor" href="#_7-断言"><span>7. 断言</span></a></h2><p>Java语言的另一个经常被忽视的特性是断言。在Java 1.4中引入的assert关键字用于测试条件。如果该条件为false，则抛出错误。</p><p>让我们看一个例子：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">void</span> <span class="token function">verifyConditions</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">assert</span> <span class="token function">getConnection</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">:</span> <span class="token string">&quot;Connection is null&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，如果getConnection()方法的返回值是null，则JVM抛出AssertionError。<strong>冒号后的字符串是可选的</strong>。它允许我们在条件为false时抛出的错误中提供一条消息。</p><p><strong>我们必须记住，断言默认是禁用的</strong>。要使用它们，我们必须使用-ea命令行参数启用它们。</p><h2 id="_8-结论" tabindex="-1"><a class="header-anchor" href="#_8-结论"><span>8. 结论</span></a></h2><p>在本文中，我们学习了Java如何在多种不同的情况下使用冒号字符。具体来说，我们看到了冒号字符是如何在增强型for循环、switch语句、标签、三元运算符、方法引用和断言中使用的。</p><p>这些特性中的许多自从Java早期就已经存在，但随着语言的变化和添加新特性，一些特性已经被添加进来。</p><p>如往常一样，上述代码示例可以在GitHub上找到。</p>`,59),o=[e];function c(l,i){return a(),s("div",null,o)}const k=n(p,[["render",c],["__file","2024-06-26-All the Ways Java Uses the Colon Character.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-06-26/2024-06-26-All%20the%20Ways%20Java%20Uses%20the%20Colon%20Character.html","title":"Java中冒号的多种用法","lang":"zh-CN","frontmatter":{"date":"2024-06-26T00:00:00.000Z","category":["Programming","Java"],"tag":["Colon Usage","Java Features"],"head":[["meta",{"name":"keywords","content":"Java, Colon, for-each loop, switch statement, labels, ternary operator, method references, assertions"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-26/2024-06-26-All%20the%20Ways%20Java%20Uses%20the%20Colon%20Character.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中冒号的多种用法"}],["meta",{"property":"og:description","content":"Java中冒号的多种用法 许多编程语言使用冒号字符(:)来实现不同的功能。例如，C++使用它进行访问修饰符和类继承，JavaScript使用它进行对象声明。Python语言在函数定义、条件块、循环等方面大量依赖它。 事实证明，Java也有一个长长的列表，其中冒号字符出现的地方。在本教程中，我们将一一查看它们。 2. 增强型for循环 for循环是程序员..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-26T13:02:32.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Colon Usage"}],["meta",{"property":"article:tag","content":"Java Features"}],["meta",{"property":"article:published_time","content":"2024-06-26T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-26T13:02:32.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中冒号的多种用法\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-26T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-26T13:02:32.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中冒号的多种用法 许多编程语言使用冒号字符(:)来实现不同的功能。例如，C++使用它进行访问修饰符和类继承，JavaScript使用它进行对象声明。Python语言在函数定义、条件块、循环等方面大量依赖它。 事实证明，Java也有一个长长的列表，其中冒号字符出现的地方。在本教程中，我们将一一查看它们。 2. 增强型for循环 for循环是程序员..."},"headers":[{"level":2,"title":"2. 增强型for循环","slug":"_2-增强型for循环","link":"#_2-增强型for循环","children":[]},{"level":2,"title":"3. switch语句","slug":"_3-switch语句","link":"#_3-switch语句","children":[]},{"level":2,"title":"4. 标签","slug":"_4-标签","link":"#_4-标签","children":[]},{"level":2,"title":"5. 三元运算符","slug":"_5-三元运算符","link":"#_5-三元运算符","children":[]},{"level":2,"title":"6. 方法引用","slug":"_6-方法引用","link":"#_6-方法引用","children":[]},{"level":2,"title":"7. 断言","slug":"_7-断言","link":"#_7-断言","children":[]},{"level":2,"title":"8. 结论","slug":"_8-结论","link":"#_8-结论","children":[]}],"git":{"createdTime":1719406952000,"updatedTime":1719406952000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.99,"words":1797},"filePathRelative":"posts/baeldung/2024-06-26/2024-06-26-All the Ways Java Uses the Colon Character.md","localizedDate":"2024年6月26日","excerpt":"\\n<p>许多编程语言使用冒号字符(:)来实现不同的功能。例如，C++使用它进行访问修饰符和类继承，JavaScript使用它进行对象声明。Python语言在函数定义、条件块、循环等方面大量依赖它。</p>\\n<p>事实证明，<strong>Java也有一个长长的列表，其中冒号字符出现的地方</strong>。在本教程中，我们将一一查看它们。</p>\\n<h2>2. 增强型for循环</h2>\\n<p>for循环是程序员在任何语言中首先学习的控制语句之一。这是Java中的语法：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">for</span> <span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">int</span> i <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span> i `<span class=\\"token operator\\">&lt;</span> <span class=\\"token number\\">10</span><span class=\\"token punctuation\\">;</span> i<span class=\\"token operator\\">++</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token comment\\">// 做一些事情</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{k as comp,d as data};
