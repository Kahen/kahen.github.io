import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as e}from"./app-BUAgDejY.js";const t={},o=e(`<h1 id="java中布尔值与整型之间的转换" tabindex="-1"><a class="header-anchor" href="#java中布尔值与整型之间的转换"><span>Java中布尔值与整型之间的转换</span></a></h1><p>在本教程中，我们将学习如何在布尔值和整数值之间进行转换。首先，我们将了解Java如何处理这两种原始数据类型；然后，我们将探索多种方法来促进布尔值和整型之间的转换。</p><h2 id="_2-数据类型" tabindex="-1"><a class="header-anchor" href="#_2-数据类型"><span>2. 数据类型</span></a></h2><p>在Java中，整数可以通过int原始数据类型或Integer包装类来表示。原始数据类型是一个32位的有符号整数，采用二进制补码编码方法。Integer类充当包装器，允许您执行无符号整数运算，并且可以将整数（原始）值作为对象与泛型一起使用。</p><p>另一方面，布尔值在内存中没有特定的大小，但它默认为操作系统和Java虚拟机（JVM）。与Java中的所有原始数据类型一样，布尔值也有Boolean包装类，允许布尔值表现得像对象。</p><p><strong>我们可以利用这两种数据类型（布尔值和整型）的原始值和包装类来执行数据转换。</strong> **假设true和false布尔值分别表示1和0，我们有多种方法来进行转换。</p><h2 id="_3-原始布尔值到整型" tabindex="-1"><a class="header-anchor" href="#_3-原始布尔值到整型"><span>3. 原始布尔值到整型</span></a></h2><p>要将原始的布尔值转换为整型，我们评估表达式的条件以确定要返回的整数：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">booleanPrimitiveToInt</span><span class="token punctuation">(</span><span class="token keyword">boolean</span> foo<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> bar <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>foo<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        bar <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> bar<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以使用三元运算符简化这个函数：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">booleanPrimitiveToIntTernary</span><span class="token punctuation">(</span><span class="token keyword">boolean</span> foo<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>foo<span class="token punctuation">)</span> <span class="token operator">?</span> <span class="token number">1</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种方法使用原始数据类型（布尔值和整型）进行转换。结果，当布尔表达式为true时，我们得到1。否则，方法返回0。</p><h2 id="_4-包装类" tabindex="-1"><a class="header-anchor" href="#_4-包装类"><span>4. 包装类</span></a></h2><p>使用Boolean包装类，我们有几种方法来进行转换：</p><ul><li>我们可以利用Boolean类的静态方法。</li><li>我们可以直接从Boolean对象调用方法。</li></ul><h3 id="_4-1-静态方法" tabindex="-1"><a class="header-anchor" href="#_4-1-静态方法"><span>4.1. 静态方法</span></a></h3><p>Boolean类有一个_compare_方法，我们可以这样使用：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">booleanObjectToInt</span><span class="token punctuation">(</span><span class="token keyword">boolean</span> foo<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">Boolean</span><span class="token punctuation">.</span><span class="token function">compare</span><span class="token punctuation">(</span>foo<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>记住静态_compare_方法如果两个参数的值相同则返回0。</strong> **换句话说，当foo为false时，比较将产生0。否则，当第一个参数为true且第二个参数为false时，函数返回1。</p><p>同样，我们可以使用相同的静态方法，将第二个参数改为true：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">booleanObjectToIntInverse</span><span class="token punctuation">(</span><span class="token keyword">boolean</span> foo<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">Boolean</span><span class="token punctuation">.</span><span class="token function">compare</span><span class="token punctuation">(</span>foo<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这次，如果foo为true，_compare_方法评估两个相同值的参数，结果为0。但是，将结果加1将返回来自真值布尔变量的预期整数值。</p><h3 id="_4-2-boolean类对象" tabindex="-1"><a class="header-anchor" href="#_4-2-boolean类对象"><span>4.2. Boolean类对象</span></a></h3><p>Boolean类对象具有如_compareTo_之类的函数，我们可以使用：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">booleanObjectMethodToInt</span><span class="token punctuation">(</span><span class="token class-name">Boolean</span> foo<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> foo<span class="token punctuation">.</span><span class="token function">compareTo</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用_method_ booleanObjectMethodToInt，我们可以像使用静态方法一样将布尔值转换为整数。同样，您可以通过将参数更改为true并将结果加1来应用反向版本。</p><h2 id="_5-apache-commons" tabindex="-1"><a class="header-anchor" href="#_5-apache-commons"><span>5. Apache Commons</span></a></h2><p>Apache Commons是Java的一个流行的开源库，提供了诸如_BooleanUtils_之类的实用类。我们可以按如下方式将库添加为Maven的依赖项：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`org.apache.commons\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`commons-lang3\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\`3.12.0\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\`
\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一旦库在我们的pom.xml文件中，我们就可以使用_BooleanUtils_类将布尔值转换为整数：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">booleanUtilsToInt</span><span class="token punctuation">(</span><span class="token class-name">Boolean</span> foo<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">BooleanUtils</span><span class="token punctuation">.</span><span class="token function">toInteger</span><span class="token punctuation">(</span>foo<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>与示例方法_booleanPrimitiveToIntTernary_一样，内部地，_toInteger_方法执行相同的三元运算符进行转换。</p><h2 id="_6-将整型转换为布尔值" tabindex="-1"><a class="header-anchor" href="#_6-将整型转换为布尔值"><span>6. 将整型转换为布尔值</span></a></h2><p>在探讨了将布尔值转换为整数值的多种技术之后，现在让我们将注意力转向相反的过程：将整数值转换为布尔值。</p><p>首先，我们将遵循这个规则来执行_int_到_boolean_的转换：</p><ul><li>true – 整数值是1</li><li>false – 整数值是0</li><li>如果整数值既不是1也不是0，则抛出异常</li></ul><h3 id="_6-1-使用-if-或-if-else-语句" tabindex="-1"><a class="header-anchor" href="#_6-1-使用-if-或-if-else-语句"><span>6.1. 使用_if_或_if-else_语句</span></a></h3><p><strong>为了实现转换，我们可以使用_if/if-else_语句</strong>，例如：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">boolean</span> <span class="token function">intToBooleanWithThrowing</span><span class="token punctuation">(</span><span class="token keyword">int</span> theInt<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>theInt <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>theInt <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalArgumentException</span><span class="token punctuation">(</span><span class="token string">&quot;Only 0 or 1 is allowed.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-2-使用-booleanutils-toboolean-方法" tabindex="-1"><a class="header-anchor" href="#_6-2-使用-booleanutils-toboolean-方法"><span>6.2. 使用_BooleanUtils.toBoolean()_方法</span></a></h3><p>来自Apache Commons Lang3库的_BooleanUtils_类还提供了将整数值转换为布尔值的_BooleanUtils.toBoolean(int value, int trueValue, int falseValue)_方法。</p><p>这个方法有三个参数：</p><ul><li>value – 要转换的整数值</li><li>trueValue – 如果value等于trueValue，方法返回true</li><li>falseValue – 如果value等于falseValue，方法返回false</li></ul><p>进一步地，<strong>如果value不等于trueValue或falseValue，将抛出IllegalArgumentException</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">boolean</span> <span class="token function">toBoolean</span><span class="token punctuation">(</span><span class="token keyword">final</span> <span class="token keyword">int</span> value<span class="token punctuation">,</span> <span class="token keyword">final</span> <span class="token keyword">int</span> trueValue<span class="token punctuation">,</span> <span class="token keyword">final</span> <span class="token keyword">int</span> falseValue<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>value <span class="token operator">==</span> trueValue<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>value <span class="token operator">==</span> falseValue<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalArgumentException</span><span class="token punctuation">(</span><span class="token string">&quot;The Integer did not match either specified value&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们通过单元测试演示如何使用这个方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span> trueValue <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> falseValue <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

<span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token class-name">BooleanUtils</span><span class="token punctuation">.</span><span class="token function">toBoolean</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> trueValue<span class="token punctuation">,</span> falseValue<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertFalse</span><span class="token punctuation">(</span><span class="token class-name">BooleanUtils</span><span class="token punctuation">.</span><span class="token function">toBoolean</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> trueValue<span class="token punctuation">,</span> falseValue<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertThrows</span><span class="token punctuation">(</span><span class="token class-name">IllegalArgumentException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token class-name">BooleanUtils</span><span class="token punctuation">.</span><span class="token function">toBoolean</span><span class="token punctuation">(</span><span class="token number">42</span><span class="token punctuation">,</span> trueValue<span class="token punctuation">,</span> falseValue<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertThrows</span><span class="token punctuation">(</span><span class="token class-name">IllegalArgumentException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token class-name">BooleanUtils</span><span class="token punctuation">.</span><span class="token function">toBoolean</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">42</span><span class="token punctuation">,</span> trueValue<span class="token punctuation">,</span> falseValue<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-3-其他转换规则" tabindex="-1"><a class="header-anchor" href="#_6-3-其他转换规则"><span>6.3. 其他转换规则</span></a></h3><p>有时，我们可能需要实现不同的转换规则，例如：</p><ul><li>true – 如果整数值是正数，否则false</li><li>true – 如果整数值是1，否则false</li><li>true – 如果整数值非零，否则false</li><li>…</li></ul><p><strong>实现这些转换的一种常见方法是使用布尔表达式。</strong></p><p>为了简单起见，让我们假设我们想要将整数转换为true，如果它是正数。否则，我们将转换为false。</p><p>然后，布尔表达式“<em>theInt &gt; 0</em>”就完成了这项工作：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">boolean</span> <span class="token function">intToBoolean</span><span class="token punctuation">(</span><span class="token keyword">int</span> theInt<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> theInt <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此外，_BooleanUtils_类还提供了另一个_toBoolean(int value)_方法，将整数值转换为布尔值。这个方法只接受一个_int_参数。</p><p>与我们的_intToBoolean()_实现类似，_toBoolean(int value)_也使用布尔表达式。<strong>如果整数值是零，方法返回false。相反，对于任何非零值，它返回true</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">boolean</span> <span class="token function">toBoolean</span><span class="token punctuation">(</span><span class="token keyword">final</span> <span class="token keyword">int</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> value <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_7-结论" tabindex="-1"><a class="header-anchor" href="#_7-结论"><span>7. 结论</span></a></h2><p>在本教程中，我们学习了如何将布尔值转换为整数值。假设true转换为1，false转换为0，我们探索了不同的实现方法来实现这种转换。此外，我们还讨论了如何将整数值转换为布尔值。</p><p>如往常一样，本文的完整代码示例可以在GitHub上找到。</p>`,60),p=[o];function l(c,i){return s(),a("div",null,p)}const d=n(t,[["render",l],["__file","2024-07-19-Convert Between boolean and int in Java.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-19/2024-07-19-Convert%20Between%20boolean%20and%20int%20in%20Java.html","title":"Java中布尔值与整型之间的转换","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Programming"],"tag":["boolean","int","conversion"],"head":[["meta",{"name":"keywords","content":"Java, boolean to int, programming, conversion"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-19/2024-07-19-Convert%20Between%20boolean%20and%20int%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中布尔值与整型之间的转换"}],["meta",{"property":"og:description","content":"Java中布尔值与整型之间的转换 在本教程中，我们将学习如何在布尔值和整数值之间进行转换。首先，我们将了解Java如何处理这两种原始数据类型；然后，我们将探索多种方法来促进布尔值和整型之间的转换。 2. 数据类型 在Java中，整数可以通过int原始数据类型或Integer包装类来表示。原始数据类型是一个32位的有符号整数，采用二进制补码编码方法。In..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-19T21:36:17.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"boolean"}],["meta",{"property":"article:tag","content":"int"}],["meta",{"property":"article:tag","content":"conversion"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-19T21:36:17.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中布尔值与整型之间的转换\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-19T21:36:17.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中布尔值与整型之间的转换 在本教程中，我们将学习如何在布尔值和整数值之间进行转换。首先，我们将了解Java如何处理这两种原始数据类型；然后，我们将探索多种方法来促进布尔值和整型之间的转换。 2. 数据类型 在Java中，整数可以通过int原始数据类型或Integer包装类来表示。原始数据类型是一个32位的有符号整数，采用二进制补码编码方法。In..."},"headers":[{"level":2,"title":"2. 数据类型","slug":"_2-数据类型","link":"#_2-数据类型","children":[]},{"level":2,"title":"3. 原始布尔值到整型","slug":"_3-原始布尔值到整型","link":"#_3-原始布尔值到整型","children":[]},{"level":2,"title":"4. 包装类","slug":"_4-包装类","link":"#_4-包装类","children":[{"level":3,"title":"4.1. 静态方法","slug":"_4-1-静态方法","link":"#_4-1-静态方法","children":[]},{"level":3,"title":"4.2. Boolean类对象","slug":"_4-2-boolean类对象","link":"#_4-2-boolean类对象","children":[]}]},{"level":2,"title":"5. Apache Commons","slug":"_5-apache-commons","link":"#_5-apache-commons","children":[]},{"level":2,"title":"6. 将整型转换为布尔值","slug":"_6-将整型转换为布尔值","link":"#_6-将整型转换为布尔值","children":[{"level":3,"title":"6.1. 使用_if_或_if-else_语句","slug":"_6-1-使用-if-或-if-else-语句","link":"#_6-1-使用-if-或-if-else-语句","children":[]},{"level":3,"title":"6.2. 使用_BooleanUtils.toBoolean()_方法","slug":"_6-2-使用-booleanutils-toboolean-方法","link":"#_6-2-使用-booleanutils-toboolean-方法","children":[]},{"level":3,"title":"6.3. 其他转换规则","slug":"_6-3-其他转换规则","link":"#_6-3-其他转换规则","children":[]}]},{"level":2,"title":"7. 结论","slug":"_7-结论","link":"#_7-结论","children":[]}],"git":{"createdTime":1721424977000,"updatedTime":1721424977000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.27,"words":1581},"filePathRelative":"posts/baeldung/2024-07-19/2024-07-19-Convert Between boolean and int in Java.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在本教程中，我们将学习如何在布尔值和整数值之间进行转换。首先，我们将了解Java如何处理这两种原始数据类型；然后，我们将探索多种方法来促进布尔值和整型之间的转换。</p>\\n<h2>2. 数据类型</h2>\\n<p>在Java中，整数可以通过int原始数据类型或Integer包装类来表示。原始数据类型是一个32位的有符号整数，采用二进制补码编码方法。Integer类充当包装器，允许您执行无符号整数运算，并且可以将整数（原始）值作为对象与泛型一起使用。</p>\\n<p>另一方面，布尔值在内存中没有特定的大小，但它默认为操作系统和Java虚拟机（JVM）。与Java中的所有原始数据类型一样，布尔值也有Boolean包装类，允许布尔值表现得像对象。</p>","autoDesc":true}');export{d as comp,k as data};
