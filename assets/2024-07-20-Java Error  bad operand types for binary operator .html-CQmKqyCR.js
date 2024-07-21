import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as e}from"./app-CXN34Kw1.js";const t={},p=e(`<hr><h1 id="java-位运算符类型不匹配问题解析" tabindex="-1"><a class="header-anchor" href="#java-位运算符类型不匹配问题解析"><span>Java 位运算符类型不匹配问题解析</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>Java 提供了一组位运算符。这些运算符允许我们方便地操作数字的单个位。</p><p>然而，当我们比较位运算的结果时，可能会遇到一个常见的陷阱。</p><p>在这个快速教程中，我们将讨论为什么我们可能会遇到 Java 编译时错误 “bad operand types for binary operator”（二元运算符的运算数类型不匹配），以及如何解决这个问题。</p><h2 id="_2-问题介绍" tabindex="-1"><a class="header-anchor" href="#_2-问题介绍"><span>2. 问题介绍</span></a></h2><p>像往常一样，我们将通过一个示例来理解这个问题。但首先，让我们看看一个简单的方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">checkNumber</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">List</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>\` intList <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    intList<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>i <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">&amp;</span> <span class="token number">1</span> <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>i <span class="token operator">+</span> <span class="token string">&quot; is odd.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>i <span class="token operator">+</span> <span class="token string">&quot; is even.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，<em>checkNumber</em> 方法遍历 <em>intList</em>，并检查并输出每个数字是偶数还是奇数。</p><p>我们应该注意到，该方法中的奇数检查逻辑并没有以常见的方式实现：<em>i % 2 == 1</em>。相反，<strong>我们对一个 <em>Integer</em> 类型的数字（<em>i</em>）和 1 执行位与（&amp;）操作</strong>。如果结果为 1，则我们知道整数 <em>i</em> 是一个奇数：<em>i &amp; 1 == 1</em>。</p><p>然而，当我们尝试测试上述方法时，代码意外地无法编译：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>java<span class="token operator">:</span> bad operand types <span class="token keyword">for</span> binary operator <span class="token char">&#39;&amp;&#39;</span>
  first type<span class="token operator">:</span>  <span class="token class-name"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span></span>Integer</span>
  second type<span class="token operator">:</span> <span class="token keyword">boolean</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们理解问题的原因以及如何解决它。</p><h2 id="_3-理解-java-运算符优先级" tabindex="-1"><a class="header-anchor" href="#_3-理解-java-运算符优先级"><span>3. 理解 Java 运算符优先级</span></a></h2><p>首先，错误消息非常直接。它说我们试图对一个 <em>boolean</em> 类型和一个 <em>Integer</em> 类型进行位与操作。</p><p>然而，这很奇怪，因为我们在代码中明确写了 “<em>i &amp; 1</em>”。为什么编译器认为一个 <em>boolean</em> 类型参与了位与操作？</p><p>这是因为 <strong>“==” 运算符的优先级高于 “&amp;” 运算符</strong>。也就是说表达式 “<em>i &amp; 1 == 1</em>” 等同于 “<em>i &amp; (1 == 1)</em>”。因此，我们有 “<em>i &amp; true (boolean)</em>”。</p><p>现在，我们可能会问：“好的，== 的优先级高于 &amp;。但为什么 ‘<em>i % 2 == 1</em>‘ 按预期工作？”</p><p>为了回答这个问题，我们需要更仔细地查看 Java 运算符的优先级规则。</p><p>Java 提供了很多运算符。在实践中，我们经常一起使用不同的运算符。因此，了解 Java 运算符的优先级是至关重要的。否则，我们可能会得到一个意想不到的结果。</p><p>接下来，让我们看看 Java 运算符优先级规则（表中运算符出现的越高，优先级越高）：</p><table><thead><tr><th>运算符</th><th>优先级</th></tr></thead><tbody><tr><td>后缀</td><td><em>expr++ expr–</em></td></tr><tr><td>一元</td><td><em>++expr –expr +expr -expr ~ !</em></td></tr><tr><td>乘法</td><td><em>* / %</em></td></tr><tr><td>加法</td><td><em>+ –</em></td></tr><tr><td>位移</td><td><em><code>&lt;</code>&lt; &gt;\`\`&gt;&gt;</em></td></tr><tr><td>关系</td><td><em><code>&lt; &gt;</code> <code>&lt;= &gt;</code>= instanceof</em></td></tr><tr><td>相等</td><td><em>== !=</em></td></tr><tr><td>位与</td><td><em>&amp;</em></td></tr><tr><td>位异或</td><td><em>^</em></td></tr><tr><td>位或</td><td><em>|</em></td></tr><tr><td>逻辑与</td><td><em>&amp;&amp;</em></td></tr><tr><td>逻辑或</td><td><em>||</em></td></tr><tr><td>三元</td><td><em>? :</em></td></tr><tr><td>赋值</td><td><em>= += -= *= /= %= &amp;= ^= |= &lt;<code>&lt;= &gt;</code>&gt;= &gt;&gt;&gt;=</em></td></tr></tbody></table><p>正如我们在上面的列表中看到的，<strong>取模运算符（%）的优先级高于等式运算符（==）</strong>。另一方面，<strong>位与运算符（&amp;）在表中的优先级低于等式运算符（==）</strong>。</p><p>这就是为什么 “<em>i % 2 == 1</em>” 按预期工作，但 “<em>i &amp; 1 == 1</em>” 不工作的原因。</p><p>我们在示例中遇到了编译时错误。因此，我们可以相对早地发现问题。然而，想象一下一些实现中存在运算符优先级错误的代码编译通过但产生了错误的结果。找出问题的真实原因可能会不必要地花费我们很多时间。</p><p>因此，记住 Java 运算符的优先级规则是值得的。</p><h2 id="_4-修复问题" tabindex="-1"><a class="header-anchor" href="#_4-修复问题"><span>4. 修复问题</span></a></h2><p>现在我们理解了问题的原因，修复问题并不难。我们只需要在位与操作中添加括号：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">&amp;</span> <span class="token number">1</span> <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">)</span>  <span class="token operator">--</span><span class="token operator">-&gt;</span>  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>i <span class="token operator">&amp;</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>修复后，如果我们再次运行该方法，我们将看到编译器不再抱怨，我们收到了预期的输出：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>1 is odd.
2 is even.
3 is odd.
4 is even.
5 is odd.
6 is even.
7 is odd.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在这篇文章中，我们通过一个位与操作的示例分析了编译错误 “bad operand types for binary operator”。</p><p>此外，我们讨论了 Java 运算符的优先级规则。</p><p>最后，我们修复了问题。</p>`,36),o=[p];function r(c,i){return s(),n("div",null,o)}const u=a(t,[["render",r],["__file","2024-07-20-Java Error  bad operand types for binary operator .html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-07-20/2024-07-20-Java%20Error%20%20bad%20operand%20types%20for%20binary%20operator%20.html","title":"Java 位运算符类型不匹配问题解析","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Programming"],"tag":["Java","Bitwise Operators","Operator Precedence"],"head":[["meta",{"name":"keywords","content":"Java, Bitwise Operators, Operator Precedence"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-20/2024-07-20-Java%20Error%20%20bad%20operand%20types%20for%20binary%20operator%20.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java 位运算符类型不匹配问题解析"}],["meta",{"property":"og:description","content":"Java 位运算符类型不匹配问题解析 1. 概述 Java 提供了一组位运算符。这些运算符允许我们方便地操作数字的单个位。 然而，当我们比较位运算的结果时，可能会遇到一个常见的陷阱。 在这个快速教程中，我们将讨论为什么我们可能会遇到 Java 编译时错误 “bad operand types for binary operator”（二元运算符的运算数..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-20T06:35:58.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Bitwise Operators"}],["meta",{"property":"article:tag","content":"Operator Precedence"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-20T06:35:58.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java 位运算符类型不匹配问题解析\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-20T06:35:58.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java 位运算符类型不匹配问题解析 1. 概述 Java 提供了一组位运算符。这些运算符允许我们方便地操作数字的单个位。 然而，当我们比较位运算的结果时，可能会遇到一个常见的陷阱。 在这个快速教程中，我们将讨论为什么我们可能会遇到 Java 编译时错误 “bad operand types for binary operator”（二元运算符的运算数..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 问题介绍","slug":"_2-问题介绍","link":"#_2-问题介绍","children":[]},{"level":2,"title":"3. 理解 Java 运算符优先级","slug":"_3-理解-java-运算符优先级","link":"#_3-理解-java-运算符优先级","children":[]},{"level":2,"title":"4. 修复问题","slug":"_4-修复问题","link":"#_4-修复问题","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1721457358000,"updatedTime":1721457358000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.63,"words":1089},"filePathRelative":"posts/baeldung/2024-07-20/2024-07-20-Java Error  bad operand types for binary operator .md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>Java 位运算符类型不匹配问题解析</h1>\\n<h2>1. 概述</h2>\\n<p>Java 提供了一组位运算符。这些运算符允许我们方便地操作数字的单个位。</p>\\n<p>然而，当我们比较位运算的结果时，可能会遇到一个常见的陷阱。</p>\\n<p>在这个快速教程中，我们将讨论为什么我们可能会遇到 Java 编译时错误 “bad operand types for binary operator”（二元运算符的运算数类型不匹配），以及如何解决这个问题。</p>\\n<h2>2. 问题介绍</h2>\\n<p>像往常一样，我们将通过一个示例来理解这个问题。但首先，让我们看看一个简单的方法：</p>","autoDesc":true}');export{u as comp,m as data};
