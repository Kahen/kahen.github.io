import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-CJGTm_7y.js";const e={},p=t(`<h1 id="java中数字从一个进制转换到另一个进制" tabindex="-1"><a class="header-anchor" href="#java中数字从一个进制转换到另一个进制"><span>Java中数字从一个进制转换到另一个进制</span></a></h1><p>在本教程中，我们将探讨如何在Java中将数字从一个进制转换到另一个进制。例如，将数字从二进制转换到五进制以及相反的操作，我们将使用两种方法。</p><h2 id="_2-integer类" tabindex="-1"><a class="header-anchor" href="#_2-integer类"><span>2. Integer类</span></a></h2><p>java.lang包中的Integer类是一个包装类，它将基本类型int封装为Integer对象。这个类有几种方法用于操作int，并用于将int转换为String对象，以及将String转换为int类型。我们将需要使用parseInt()和toString()方法来帮助我们进行数字的进制转换。</p><h3 id="_2-1-parseint-方法" tabindex="-1"><a class="header-anchor" href="#_2-1-parseint-方法"><span>2.1. parseInt()方法</span></a></h3><p>parseInt()方法有两个参数：String s和int radix：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public static int parseInt(String s, int radix)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>它返回给定字符串参数在指定的基数中的整数值，该基数作为第二个参数给出。</strong> 字符串参数必须是指定基数中的数字。它还会在Java官方文档中提到的某些情况下抛出NumberFormatException。</p><h3 id="_2-2-tostring-方法" tabindex="-1"><a class="header-anchor" href="#_2-2-tostring-方法"><span>2.2. toString()方法</span></a></h3><p>toString()方法与前面提到的parseInt()方法一起使用，用于将数字从一个进制转换到另一个进制：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public static String toString(int i, int radix)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>根据其签名，这个方法接受两个参数，int i和基数radix。<strong>该方法返回一个表示指定基数的字符串，这是第二个参数。</strong> 如果没有提供第二个参数，它将使用10作为默认值。</p><h2 id="_3-使用integer类方法parseint-和tostring-进行进制转换" tabindex="-1"><a class="header-anchor" href="#_3-使用integer类方法parseint-和tostring-进行进制转换"><span>3. 使用Integer类方法parseInt()和toString()进行进制转换</span></a></h2><p>正如我们之前提到的，Java中将数字从一个进制转换到另一个进制有两种方法。第一种也是最简单的方法是使用Integer类的方法parseInt()和toString()来进行这种从给定基数到目标基数的转换。让我们创建一个使用parseInt()和toString()进行基数转换的方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">convertNumberToNewBase</span><span class="token punctuation">(</span><span class="token class-name">String</span> number<span class="token punctuation">,</span> <span class="token keyword">int</span> base<span class="token punctuation">,</span> <span class="token keyword">int</span> newBase<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token function">parseInt</span><span class="token punctuation">(</span>number<span class="token punctuation">,</span> base<span class="token punctuation">)</span><span class="token punctuation">,</span> newBase<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们的convertNumberToNewBase()方法接受三个参数，一个字符串表示在指定基数或第二个参数的数字进制系统中的数字。第三个参数是新基数的int。该方法返回新基数中的字符串。parseInt()接受字符串参数及其基数，并返回整数值。然后，这个整数值作为toString()方法的第一个参数，将整数转换为新基数中的字符串。</p><p>让我们看一个例子：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenConvertingBase10NumberToBase5_ThenResultShouldBeDigitsInBase5</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token function">convertNumberToNewBase</span><span class="token punctuation">(</span><span class="token string">&quot;89&quot;</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;324&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>字符串&quot;89&quot;以10进制给出，用于转换为5进制。我们的方法返回字符串结果&quot;324&quot;，这确实是5进制数字系统中的数字。</p><h2 id="_4-使用自定义方法进行进制转换" tabindex="-1"><a class="header-anchor" href="#_4-使用自定义方法进行进制转换"><span>4. 使用自定义方法进行进制转换</span></a></h2><p>我们转换数字进制的另一种方法是编写我们自己的自定义Java方法来执行此任务。建议的方法应该有四个参数，一个数字字符串，一个指定基数的int，以及另一个表示转换新基数的int。</p><p>实现这一目标的逻辑方法是创建子方法来处理我们数字转换代码的较小部分。我们将定义一个方法，用于将任何数字从基数2到9和16转换为十进制（基数10），以及另一个用于将数字从基数10转换为基数2到9和16的方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">convertFromDecimalToBaseX</span><span class="token punctuation">(</span><span class="token keyword">int</span> num<span class="token punctuation">,</span> <span class="token keyword">int</span> newBase<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IllegalArgumentException</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>newBase \`<span class="token operator">&lt;</span> <span class="token number">2</span> <span class="token operator">||</span> newBase <span class="token operator">&gt;</span>\` <span class="token number">10</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> newBase <span class="token operator">!=</span> <span class="token number">16</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalArgumentException</span><span class="token punctuation">(</span><span class="token string">&quot;New base must be from 2 - 10 or 16&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token class-name">String</span> result <span class="token operator">=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> remainder<span class="token punctuation">;</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>num <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        remainder <span class="token operator">=</span> num <span class="token operator">%</span> newBase<span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>newBase <span class="token operator">==</span> <span class="token number">16</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>remainder <span class="token operator">==</span> <span class="token number">10</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                result <span class="token operator">+=</span> <span class="token char">&#39;A&#39;</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>remainder <span class="token operator">==</span> <span class="token number">11</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                result <span class="token operator">+=</span> <span class="token char">&#39;B&#39;</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>remainder <span class="token operator">==</span> <span class="token number">12</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                result <span class="token operator">+=</span> <span class="token char">&#39;C&#39;</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>remainder <span class="token operator">==</span> <span class="token number">13</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                result <span class="token operator">+=</span> <span class="token char">&#39;D&#39;</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>remainder <span class="token operator">==</span> <span class="token number">14</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                result <span class="token operator">+=</span> <span class="token char">&#39;E&#39;</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>remainder <span class="token operator">==</span> <span class="token number">15</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                result <span class="token operator">+=</span> <span class="token char">&#39;F&#39;</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                result <span class="token operator">+=</span> remainder<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            result <span class="token operator">+=</span> remainder<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        num <span class="token operator">/=</span> newBase<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">StringBuffer</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">reverse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>convertFromDecimalToBaseX()方法接受两个参数，一个整数和一个新基数用于转换。<strong>结果是通过不断地将整数除以新基数并取余数来获得的</strong>。该方法还具有基数16数字的条件。另一种方法将任何给定基数转换为基数10，具有一个子方法用于将基数16字符转换为十进制值：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">convertFromAnyBaseToDecimal</span><span class="token punctuation">(</span><span class="token class-name">String</span> num<span class="token punctuation">,</span> <span class="token keyword">int</span> base<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>base \`<span class="token operator">&lt;</span> <span class="token number">2</span> <span class="token operator">||</span> <span class="token punctuation">(</span>base <span class="token operator">&gt;</span>\` <span class="token number">10</span> <span class="token operator">&amp;&amp;</span> base <span class="token operator">!=</span> <span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">int</span> val <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> power <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> num<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&gt;=</span> <span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">--</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> digit <span class="token operator">=</span> <span class="token function">charToDecimal</span><span class="token punctuation">(</span>num<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>digit \`<span class="token operator">&lt;</span> <span class="token number">0</span> <span class="token operator">||</span> digit <span class="token operator">&gt;</span>\`<span class="token operator">=</span> base<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        val <span class="token operator">+=</span> digit <span class="token operator">*</span> power<span class="token punctuation">;</span>
        power <span class="token operator">*=</span> base<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> val<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">charToDecimal</span><span class="token punctuation">(</span><span class="token keyword">char</span> c<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>c <span class="token operator">&gt;=</span> <span class="token char">&#39;0&#39;</span> <span class="token operator">&amp;&amp;</span> c <span class="token operator">&lt;=</span> <span class="token char">&#39;9&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span> c <span class="token operator">-</span> <span class="token char">&#39;0&#39;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span> c <span class="token operator">-</span> <span class="token char">&#39;A&#39;</span> <span class="token operator">+</span> <span class="token number">10</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们将这些方法结合起来，拥有一个强大的方法，可以将数字从任何基数转换到另一个基数：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">convertNumberToNewBaseCustom</span><span class="token punctuation">(</span><span class="token class-name">String</span> num<span class="token punctuation">,</span> <span class="token keyword">int</span> base<span class="token punctuation">,</span> <span class="token keyword">int</span> newBase<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> decimalNumber <span class="token operator">=</span> <span class="token function">convertFromAnyBaseToDecimal</span><span class="token punctuation">(</span>num<span class="token punctuation">,</span> base<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> targetBase <span class="token operator">=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        targetBase <span class="token operator">=</span> <span class="token function">convertFromDecimalToBaseX</span><span class="token punctuation">(</span>decimalNumber<span class="token punctuation">,</span> newBase<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IllegalArgumentException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span>  targetBase<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们测试我们的自定义方法，以确认它按预期工作：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenConvertingBase2NumberToBase8_ThenResultShouldBeDigitsInBase8</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token function">convertNumberToNewBaseCustom</span><span class="token punctuation">(</span><span class="token string">&quot;11001000&quot;</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;310&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当将基数2的字符串“11001000”转换为基数8时，该方法返回字符串“310”。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本教程中，我们学习了如何使用java.lang.Integer类的toString()和parseInt()方法在Java中将数字从一个进制转换到另一个进制。我们将这两种方法整合到另一个方法中以提高可重用性。我们还进一步编写了我们自己的自定义方法，该方法将字符串数字转换为其基数10等效项，然后将其转换为另一个数字进制。整个教程的代码可以在GitHub上找到。</p>`,32),o=[p];function c(i,l){return a(),s("div",null,o)}const k=n(e,[["render",c],["__file","2024-07-10-Converting a Number from One Base to Another in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-10/2024-07-10-Converting%20a%20Number%20from%20One%20Base%20to%20Another%20in%20Java.html","title":"Java中数字从一个进制转换到另一个进制","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Number Conversion"],"tag":["Java","Base Conversion","Integer Class"],"head":[["meta",{"name":"keywords","content":"Java, Base Conversion, Integer Class, parseInt, toString"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-10/2024-07-10-Converting%20a%20Number%20from%20One%20Base%20to%20Another%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中数字从一个进制转换到另一个进制"}],["meta",{"property":"og:description","content":"Java中数字从一个进制转换到另一个进制 在本教程中，我们将探讨如何在Java中将数字从一个进制转换到另一个进制。例如，将数字从二进制转换到五进制以及相反的操作，我们将使用两种方法。 2. Integer类 java.lang包中的Integer类是一个包装类，它将基本类型int封装为Integer对象。这个类有几种方法用于操作int，并用于将int转..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-10T09:39:06.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Base Conversion"}],["meta",{"property":"article:tag","content":"Integer Class"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-10T09:39:06.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中数字从一个进制转换到另一个进制\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-10T09:39:06.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中数字从一个进制转换到另一个进制 在本教程中，我们将探讨如何在Java中将数字从一个进制转换到另一个进制。例如，将数字从二进制转换到五进制以及相反的操作，我们将使用两种方法。 2. Integer类 java.lang包中的Integer类是一个包装类，它将基本类型int封装为Integer对象。这个类有几种方法用于操作int，并用于将int转..."},"headers":[{"level":2,"title":"2. Integer类","slug":"_2-integer类","link":"#_2-integer类","children":[{"level":3,"title":"2.1. parseInt()方法","slug":"_2-1-parseint-方法","link":"#_2-1-parseint-方法","children":[]},{"level":3,"title":"2.2. toString()方法","slug":"_2-2-tostring-方法","link":"#_2-2-tostring-方法","children":[]}]},{"level":2,"title":"3. 使用Integer类方法parseInt()和toString()进行进制转换","slug":"_3-使用integer类方法parseint-和tostring-进行进制转换","link":"#_3-使用integer类方法parseint-和tostring-进行进制转换","children":[]},{"level":2,"title":"4. 使用自定义方法进行进制转换","slug":"_4-使用自定义方法进行进制转换","link":"#_4-使用自定义方法进行进制转换","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720604346000,"updatedTime":1720604346000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.71,"words":1412},"filePathRelative":"posts/baeldung/2024-07-10/2024-07-10-Converting a Number from One Base to Another in Java.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在本教程中，我们将探讨如何在Java中将数字从一个进制转换到另一个进制。例如，将数字从二进制转换到五进制以及相反的操作，我们将使用两种方法。</p>\\n<h2>2. Integer类</h2>\\n<p>java.lang包中的Integer类是一个包装类，它将基本类型int封装为Integer对象。这个类有几种方法用于操作int，并用于将int转换为String对象，以及将String转换为int类型。我们将需要使用parseInt()和toString()方法来帮助我们进行数字的进制转换。</p>\\n<h3>2.1. parseInt()方法</h3>\\n<p>parseInt()方法有两个参数：String s和int radix：</p>","autoDesc":true}');export{k as comp,d as data};
