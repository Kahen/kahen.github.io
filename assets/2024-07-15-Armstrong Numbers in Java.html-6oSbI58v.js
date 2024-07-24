import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-BkL9UgS7.js";const p={},e=t('<h1 id="java中的阿姆斯特朗数" tabindex="-1"><a class="header-anchor" href="#java中的阿姆斯特朗数"><span>Java中的阿姆斯特朗数</span></a></h1><p>在这个快速教程中，我们将学习什么是阿姆斯特朗数，以及如何通过创建一个Java程序来检查和找到它们。</p><h2 id="_2-问题介绍" tabindex="-1"><a class="header-anchor" href="#_2-问题介绍"><span>2. 问题介绍</span></a></h2><p>首先，让我们了解什么是阿姆斯特朗数。</p><p><strong>给定一个正整数 <em>i</em>，如果它有 <em>n</em> 位数字，并且 <em>i</em> 等于其各位数字的 <em>n</em> 次幂之和，则整数 <em>i</em> 是一个阿姆斯特朗数。</strong> 阿姆斯特朗数形成了OEIS序列A005188。</p><p>一些例子可能有助于我们快速理解阿姆斯特朗数：</p><ul><li><em>1</em>：<em>pow(1,1) = 1</em> -&gt; 1是一个阿姆斯特朗数。</li><li><em>123</em>：<em>pow(1, 3) + pow(2, 3) + pow(3, 3) = 1 + 8 + 27 = 36 != 123</em> -&gt; 123不是阿姆斯特朗数。</li><li><em>1634</em>：<em>pow(1, 4) + pow(6, 4) + pow(3, 4) + pow(4, 4) = 1 + 1296 + 81 + 256 = 1643</em> -&gt; 1634是一个阿姆斯特朗数。</li></ul><p>所以，我们想要有一个Java程序方便地检查给定的数字是否是阿姆斯特朗数。此外，我们还想生成一个小于给定限制的OEIS序列A005188。</p><p>为了简单起见，我们将使用单元测试断言来验证我们的方法是否按预期工作。</p><h2 id="_3-解决问题的方法" tabindex="-1"><a class="header-anchor" href="#_3-解决问题的方法"><span>3. 解决问题的方法</span></a></h2><p>既然我们了解了阿姆斯特朗数，让我们看看问题并考虑解决它的方法。</p><p>首先，<strong>生成一个有限制的OEIS序列A005188可以转化为从0到给定限制，找出所有的阿姆斯特朗数。</strong> 如果我们有一个方法来检查一个整数是否是阿姆斯特朗数，那么从整数范围中过滤掉非阿姆斯特朗数并得到所需的序列就很容易了。</p><p>因此，主要问题就是创建阿姆斯特朗数检查方法。一个直接的检查方法是两步方法：</p><ul><li>步骤1 - 将给定的整数分解成数字列表，例如，<em>12345 -&gt; [1, 2, 3, 4, 5]</em></li><li>步骤2 - 对列表中的每个数字，计算 <em>pow(digit, list.size())</em>，然后求和结果，并最终将总和与最初给定的整数进行比较</li></ul><p>接下来，让我们将这个想法转换成Java代码。</p><h2 id="_4-创建阿姆斯特朗数方法" tabindex="-1"><a class="header-anchor" href="#_4-创建阿姆斯特朗数方法"><span>4. 创建阿姆斯特朗数方法</span></a></h2><p>正如我们所讨论的，让我们首先将给定的整数转换为数字列表：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token class-name">List</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>````` <span class="token function">digitsInList</span><span class="token punctuation">(</span><span class="token keyword">int</span> n<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">List</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>````` list <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">while</span> <span class="token punctuation">(</span>n <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        list<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>n <span class="token operator">%</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        n <span class="token operator">=</span> n <span class="token operator">/</span> <span class="token number">10</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n    <span class="token keyword">return</span> list<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上述代码所示，我们使用 <em>while</em> 循环从 <em>n</em> 中提取数字。<strong>在每一步中，我们通过 <em>n % 10</em> 取一个数字，然后通过 <em>n = n / 10</em> 缩小数字。</strong></p><p>或者，我们可以将数字转换为字符串，并使用 <em>split()</em> 方法获得一个数字字符串列表。然后，我们可以将每个数字重新转换为整数。这里，我们没有采用这种方法。</p><p>现在我们已经创建了检查方法，我们可以进行步骤2：<em>pow()</em> 计算和求和：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token keyword">boolean</span> <span class="token function">isArmstrong</span><span class="token punctuation">(</span><span class="token keyword">int</span> n<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>n <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n    <span class="token class-name">List</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>````` digitsList <span class="token operator">=</span> <span class="token function">digitsInList</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">int</span> len <span class="token operator">=</span> digitsList<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">int</span> sum <span class="token operator">=</span> digitsList<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">mapToInt</span><span class="token punctuation">(</span>d <span class="token operator">-&gt;</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">pow</span><span class="token punctuation">(</span>d<span class="token punctuation">,</span> len<span class="token punctuation">)</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">sum</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">return</span> n <span class="token operator">==</span> sum<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们在 <em>isArmstrong()</em> 检查方法中看到的，我们使用了Java <em>Stream</em> 的 <em>mapToInt()</em> 方法将每个数字转换为 <em>pow()</em> 计算后的结果，然后列表中的结果求和。</p><p>最后，我们将总和与初始整数进行比较，以确定数字是否是阿姆斯特朗数。</p><p>值得一提的是，<strong>我们可以将 <em>mapToInt()</em> 和 <em>sum()</em> 方法调用合并为一个 <em>reduce()</em> 调用</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span> sum <span class="token operator">=</span> digits<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token punctuation">(</span>subtotal<span class="token punctuation">,</span> digit<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> subtotal <span class="token operator">+</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">pow</span><span class="token punctuation">(</span>digit<span class="token punctuation">,</span> len<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们创建一个方法来生成限制内的OEIS序列A005188：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token class-name">List</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>````` <span class="token function">getA005188Sequence</span><span class="token punctuation">(</span><span class="token keyword">int</span> limit<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>limit `<span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalArgumentException</span><span class="token punctuation">(</span><span class="token string">&quot;The limit cannot be a negative number.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n    <span class="token keyword">return</span> <span class="token class-name">IntStream</span><span class="token punctuation">.</span><span class="token function">range</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> limit<span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">boxed</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token class-name">ArmstrongNumberUtil</span><span class="token operator">::</span><span class="token function">isArmstrong</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如上述代码中看到的，我们再次使用Stream API来过滤阿姆斯特朗数并生成序列。</p><h2 id="_5-测试" tabindex="-1"><a class="header-anchor" href="#_5-测试"><span>5. 测试</span></a></h2><p>现在，让我们创建一些测试来验证我们的方法是否按预期工作。首先，让我们从一些测试数据开始：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">,</span> <span class="token class-name">Boolean</span><span class="token punctuation">&gt;</span></span>` <span class="token constant">ARMSTRONG_MAP</span> <span class="token operator">=</span> <span class="token class-name">ImmutableMap</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span>\n  <span class="token number">0</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">,</span>\n  <span class="token number">1</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">,</span>\n  <span class="token number">2</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">,</span>\n  <span class="token number">153</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">,</span>\n  <span class="token number">370</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">,</span>\n  <span class="token number">407</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">,</span>\n  <span class="token number">42</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span>\n  <span class="token number">777</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span>\n  <span class="token number">12345</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们将上述 <em>Map</em> 中的每个数字传递到我们的检查方法，并看看是否返回预期的结果：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token constant">ARMSTRONG_MAP</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span>number<span class="token punctuation">,</span> result<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token function">assertEquals</span><span class="token punctuation">(</span>result<span class="token punctuation">,</span> <span class="token class-name">ArmstrongNumberUtil</span><span class="token punctuation">.</span><span class="token function">isArmstrong</span><span class="token punctuation">(</span>number<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果我们运行测试，它会通过。所以，检查方法正确地完成了工作。</p><p>接下来，让我们准备两个预期的序列，并测试 <em>getA005188Sequence()</em> 是否也按预期工作：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>````` <span class="token constant">A005188_SEQ_1K</span> <span class="token operator">=</span> <span class="token class-name">ImmutableList</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">,</span> <span class="token number">153</span><span class="token punctuation">,</span> <span class="token number">370</span><span class="token punctuation">,</span> <span class="token number">371</span><span class="token punctuation">,</span> <span class="token number">407</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">List</span>`````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>````` <span class="token constant">A005188_SEQ_10K</span> <span class="token operator">=</span> <span class="token class-name">ImmutableList</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">,</span> <span class="token number">153</span><span class="token punctuation">,</span> <span class="token number">370</span><span class="token punctuation">,</span> <span class="token number">371</span><span class="token punctuation">,</span> <span class="token number">407</span><span class="token punctuation">,</span> <span class="token number">1634</span><span class="token punctuation">,</span> <span class="token number">8208</span><span class="token punctuation">,</span> <span class="token number">9474</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token constant">A005188_SEQ_1K</span><span class="token punctuation">,</span> <span class="token class-name">ArmstrongNumberUtil</span><span class="token punctuation">.</span><span class="token function">getA005188Sequence</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token constant">A005188_SEQ_10K</span><span class="token punctuation">,</span> <span class="token class-name">ArmstrongNumberUtil</span><span class="token punctuation">.</span><span class="token function">getA005188Sequence</span><span class="token punctuation">(</span><span class="token number">10000</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们运行测试，它会通过。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们讨论了什么是阿姆斯特朗数。此外，我们创建了方法来检查一个整数是否是阿姆斯特朗数，并生成给定限制内的OEIS序列A005188。</p><p>像往常一样，这里展示的所有代码片段都可以在GitHub上找到。</p>',41),o=[e];function c(l,u){return a(),s("div",null,o)}const r=n(p,[["render",c],["__file","2024-07-15-Armstrong Numbers in Java.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-07-15/2024-07-15-Armstrong%20Numbers%20in%20Java.html","title":"Java中的阿姆斯特朗数","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Armstrong Numbers"],"tag":["Java","Armstrong Numbers","数学"],"head":[["meta",{"name":"keywords","content":"Java, Armstrong Numbers, 数学, 编程"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-15/2024-07-15-Armstrong%20Numbers%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中的阿姆斯特朗数"}],["meta",{"property":"og:description","content":"Java中的阿姆斯特朗数 在这个快速教程中，我们将学习什么是阿姆斯特朗数，以及如何通过创建一个Java程序来检查和找到它们。 2. 问题介绍 首先，让我们了解什么是阿姆斯特朗数。 给定一个正整数 i，如果它有 n 位数字，并且 i 等于其各位数字的 n 次幂之和，则整数 i 是一个阿姆斯特朗数。 阿姆斯特朗数形成了OEIS序列A005188。 一些例子..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-15T11:05:47.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Armstrong Numbers"}],["meta",{"property":"article:tag","content":"数学"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-15T11:05:47.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中的阿姆斯特朗数\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-15T11:05:47.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中的阿姆斯特朗数 在这个快速教程中，我们将学习什么是阿姆斯特朗数，以及如何通过创建一个Java程序来检查和找到它们。 2. 问题介绍 首先，让我们了解什么是阿姆斯特朗数。 给定一个正整数 i，如果它有 n 位数字，并且 i 等于其各位数字的 n 次幂之和，则整数 i 是一个阿姆斯特朗数。 阿姆斯特朗数形成了OEIS序列A005188。 一些例子..."},"headers":[{"level":2,"title":"2. 问题介绍","slug":"_2-问题介绍","link":"#_2-问题介绍","children":[]},{"level":2,"title":"3. 解决问题的方法","slug":"_3-解决问题的方法","link":"#_3-解决问题的方法","children":[]},{"level":2,"title":"4. 创建阿姆斯特朗数方法","slug":"_4-创建阿姆斯特朗数方法","link":"#_4-创建阿姆斯特朗数方法","children":[]},{"level":2,"title":"5. 测试","slug":"_5-测试","link":"#_5-测试","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1721041547000,"updatedTime":1721041547000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.44,"words":1332},"filePathRelative":"posts/baeldung/2024-07-15/2024-07-15-Armstrong Numbers in Java.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在这个快速教程中，我们将学习什么是阿姆斯特朗数，以及如何通过创建一个Java程序来检查和找到它们。</p>\\n<h2>2. 问题介绍</h2>\\n<p>首先，让我们了解什么是阿姆斯特朗数。</p>\\n<p><strong>给定一个正整数 <em>i</em>，如果它有 <em>n</em> 位数字，并且 <em>i</em> 等于其各位数字的 <em>n</em> 次幂之和，则整数 <em>i</em> 是一个阿姆斯特朗数。</strong> 阿姆斯特朗数形成了OEIS序列A005188。</p>\\n<p>一些例子可能有助于我们快速理解阿姆斯特朗数：</p>\\n<ul>\\n<li><em>1</em>：<em>pow(1,1) = 1</em> -&gt; 1是一个阿姆斯特朗数。</li>\\n<li><em>123</em>：<em>pow(1, 3) + pow(2, 3) + pow(3, 3) = 1 + 8 + 27 = 36 != 123</em> -&gt; 123不是阿姆斯特朗数。</li>\\n<li><em>1634</em>：<em>pow(1, 4) + pow(6, 4) + pow(3, 4) + pow(4, 4) = 1 + 1296 + 81 + 256 = 1643</em> -&gt; 1634是一个阿姆斯特朗数。</li>\\n</ul>","autoDesc":true}');export{r as comp,m as data};
