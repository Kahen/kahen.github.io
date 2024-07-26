import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as t}from"./app-C4eFoh0f.js";const e={},p=t(`<h1 id="java中将字符串转换为浮点数及反向转换" tabindex="-1"><a class="header-anchor" href="#java中将字符串转换为浮点数及反向转换"><span>Java中将字符串转换为浮点数及反向转换</span></a></h1><p>将数据从浮点数转换为字符串以及反向操作在Java中是一种常规操作。然而，进行这种转换的多种方法可能会引起混乱和不确定性，使人不确定应该选择哪种方法。</p><p>在本文中，我们将展示并比较所有可用的选项。</p><p>首先，让我们看看将浮点数值转换为字符串的最常见方式。</p><h3 id="_2-1-字符串拼接" tabindex="-1"><a class="header-anchor" href="#_2-1-字符串拼接"><span>2.1 字符串拼接</span></a></h3><p>我们可以使用的最直接解决方案是将浮点值与一个空字符串进行拼接。</p><p>让我们看一个例子：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">float</span> givenFloat <span class="token operator">=</span> <span class="token number">1.25f</span><span class="token punctuation">;</span>

<span class="token class-name">String</span> result <span class="token operator">=</span> givenFloat <span class="token operator">+</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>

<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;1.25&quot;</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同样，我们可以将一个Float对象添加到空字符串中，并得到相同的结果。当我们使用一个Float对象时，它的toString()方法会自动被调用：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Float</span> givenFloat <span class="token operator">=</span> <span class="token number">1.25f</span><span class="token punctuation">;</span>

<span class="token class-name">String</span> result <span class="token operator">=</span> givenFloat <span class="token operator">+</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>

<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;1.25&quot;</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果Float对象为null，拼接结果将是“null”字符串：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Float</span> givenFloat <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

<span class="token class-name">String</span> result <span class="token operator">=</span> givenFloat <span class="token operator">+</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>

<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;null&quot;</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-float-tostring" tabindex="-1"><a class="header-anchor" href="#_2-2-float-tostring"><span>2.2 Float.toString()</span></a></h3><p>我们可以使用Float类的静态toString()方法作为另一种选项，用于字符串转换。我们可以将浮点原始值或Float对象传递给toString()方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Float</span> givenFloat <span class="token operator">=</span> <span class="token number">1.25f</span><span class="token punctuation">;</span>

<span class="token class-name">String</span> result <span class="token operator">=</span> <span class="token class-name">Float</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span>givenFloat<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;1.25&quot;</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们将null作为参数传递给该方法，我们将在运行时得到一个NullPointerException：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Float</span> givenFloat <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

<span class="token function">assertThrows</span><span class="token punctuation">(</span><span class="token class-name">NullPointerException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token class-name">Float</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span>givenFloat<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3-string-valueof" tabindex="-1"><a class="header-anchor" href="#_2-3-string-valueof"><span>2.3 String.valueOf()</span></a></h3><p>同样，我们可以使用String的静态valueOf()方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Float</span> givenFloat <span class="token operator">=</span> <span class="token number">1.25f</span><span class="token punctuation">;</span>

<span class="token class-name">String</span> result <span class="token operator">=</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>givenFloat<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;1.25&quot;</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>与Float.toString()不同，如果我们传递null作为参数，String.valueOf()不会抛出异常，而是返回“null”字符串：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Float</span> givenFloat <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

<span class="token class-name">String</span> result <span class="token operator">=</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>givenFloat<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;null&quot;</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-4-string-format" tabindex="-1"><a class="header-anchor" href="#_2-4-string-format"><span>2.4 String.format()</span></a></h3><p>String的format()静态方法为我们提供了额外的格式化选项。我们必须意识到，如果不限制小数位数，结果将包含尾随零，即使没有小数部分，如下例所示：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Float</span> givenFloat <span class="token operator">=</span> <span class="token number">1.25f</span><span class="token punctuation">;</span>

<span class="token class-name">String</span> result <span class="token operator">=</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token string">&quot;%f&quot;</span><span class="token punctuation">,</span> givenFloat<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;1.250000&quot;</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当我们格式化浮点数并指定小数位数时，format()方法也会对结果进行四舍五入：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Float</span> givenFloat <span class="token operator">=</span> <span class="token number">1.256f</span><span class="token punctuation">;</span>

<span class="token class-name">String</span> result <span class="token operator">=</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token string">&quot;%.2f&quot;</span><span class="token punctuation">,</span> givenFloat<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;1.26&quot;</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们传递一个null的Float，那么转换结果将是一个“null”字符串：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Float</span> givenFloat <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

<span class="token class-name">String</span> result <span class="token operator">=</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token string">&quot;%f&quot;</span><span class="token punctuation">,</span> givenFloat<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;null&quot;</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-5-decimalformat" tabindex="-1"><a class="header-anchor" href="#_2-5-decimalformat"><span>2.5 DecimalFormat</span></a></h3><p>最后，DecimalFormat类有一个format()方法，允许将浮点值转换为自定义格式的字符串。优势在于我们可以精确定义我们想要的字符串中的小数位数。</p><p>让我们看看如何在示例中使用它：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Float</span> givenFloat <span class="token operator">=</span> <span class="token number">1.25f</span><span class="token punctuation">;</span>

<span class="token class-name">String</span> result <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DecimalFormat</span><span class="token punctuation">(</span><span class="token string">&quot;#.0000&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span>givenFloat<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;1.2500&quot;</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们应用格式化后没有小数部分，DecimalFormat将返回整个数字：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Float</span> givenFloat <span class="token operator">=</span> <span class="token number">1.0025f</span><span class="token punctuation">;</span>

<span class="token class-name">String</span> result <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DecimalFormat</span><span class="token punctuation">(</span><span class="token string">&quot;#.##&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span>givenFloat<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;1&quot;</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们传递null作为参数，那么我们将得到一个IllegalArgumentException：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Float</span> givenFloat <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

<span class="token function">assertThrows</span><span class="token punctuation">(</span><span class="token class-name">IllegalArgumentException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token keyword">new</span> <span class="token class-name">DecimalFormat</span><span class="token punctuation">(</span><span class="token string">&quot;#.000&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span>givenFloat<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-字符串到float" tabindex="-1"><a class="header-anchor" href="#_3-字符串到float"><span>3. 字符串到Float</span></a></h2><p>接下来，让我们看看将字符串值转换为Float的最常见方式。</p><h3 id="_3-1-float-parsefloat" tabindex="-1"><a class="header-anchor" href="#_3-1-float-parsefloat"><span>3.1 Float.parseFloat()</span></a></h3><p>最常见的方式之一是使用Float的静态方法：parseFloat()。它将返回一个由字符串参数表示的原始float值。此外，它还会忽略前导和尾随空格：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> givenString <span class="token operator">=</span> <span class="token string">&quot;1.25&quot;</span><span class="token punctuation">;</span>

<span class="token keyword">float</span> result <span class="token operator">=</span> <span class="token class-name">Float</span><span class="token punctuation">.</span><span class="token function">parseFloat</span><span class="token punctuation">(</span>givenString<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">1.25f</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们的字符串参数是null，我们将得到一个NullPointerException：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> givenString <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

<span class="token function">assertThrows</span><span class="token punctuation">(</span><span class="token class-name">NullPointerException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token class-name">Float</span><span class="token punctuation">.</span><span class="token function">parseFloat</span><span class="token punctuation">(</span>givenString<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果字符串参数不包含可解析的float，我们将得到一个NumberFormatException：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> givenString <span class="token operator">=</span> <span class="token string">&quot;1.23x&quot;</span><span class="token punctuation">;</span>

<span class="token function">assertThrows</span><span class="token punctuation">(</span><span class="token class-name">NumberFormatException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token class-name">Float</span><span class="token punctuation">.</span><span class="token function">parseFloat</span><span class="token punctuation">(</span>givenString<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-float-valueof" tabindex="-1"><a class="header-anchor" href="#_3-2-float-valueof"><span>3.2 Float.valueOf()</span></a></h3><p>同样，我们可以使用Float的静态valueOf()方法。不同之处在于valueOf()返回一个Float对象。具体来说，它调用parseFloat()方法并将结果装箱到一个Float对象中：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> givenString <span class="token operator">=</span> <span class="token string">&quot;1.25&quot;</span><span class="token punctuation">;</span>

<span class="token class-name">Float</span> result <span class="token operator">=</span> <span class="token class-name">Float</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>givenString<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">1.25f</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同样，如果我们传递一个不可解析的字符串，我们将得到一个NumberFormatException：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> givenString <span class="token operator">=</span> <span class="token string">&quot;1.25x&quot;</span><span class="token punctuation">;</span>

<span class="token function">assertThrows</span><span class="token punctuation">(</span><span class="token class-name">NumberFormatException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token class-name">Float</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>givenString<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-decimalformat" tabindex="-1"><a class="header-anchor" href="#_3-3-decimalformat"><span>3.3 DecimalFormat</span></a></h3><p>我们也可以使用DecimalFormat将字符串转换为Float。主要优势之一是指定自定义的小数点分隔符。</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> givenString <span class="token operator">=</span> <span class="token string">&quot;1,250&quot;</span><span class="token punctuation">;</span>
<span class="token class-name">DecimalFormatSymbols</span> symbols <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DecimalFormatSymbols</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
symbols<span class="token punctuation">.</span><span class="token function">setDecimalSeparator</span><span class="token punctuation">(</span><span class="token char">&#39;,&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">DecimalFormat</span> decimalFormat <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DecimalFormat</span><span class="token punctuation">(</span><span class="token string">&quot;#.000&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
decimalFormat<span class="token punctuation">.</span><span class="token function">setDecimalFormatSymbols</span><span class="token punctuation">(</span>symbols<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">Float</span> result <span class="token operator">=</span> decimalFormat<span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>givenString<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">floatValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">1.25f</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-4-float的构造函数" tabindex="-1"><a class="header-anchor" href="#_3-4-float的构造函数"><span>3.4 Float的构造函数</span></a></h3><p>最后，我们可以直接使用Float的构造函数进行转换。在内部，它将使用Float的静态parseFloat()方法并创建一个Float对象：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> givenString <span class="token operator">=</span> <span class="token string">&quot;1.25&quot;</span><span class="token punctuation">;</span>

<span class="token class-name">Float</span> result <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Float</span><span class="token punctuation">(</span>givenString<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">1.25f</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从Java 9开始，这个构造函数已被弃用。相反，我们应该考虑使用其他静态工厂方法，如parseFloat()或valueOf()。</p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们探讨了将字符串实例转换为float或Float实例以及反向转换的多种方式。</p><p>对于简单的转换，字符串拼接和Float.toString()是将转换为字符串的首选选项。如果我们需要更复杂的格式化，那么DecimalFormat是完成工作的最佳工具。对于将字符串转换为浮点值，如果我们需要一个float原始值，可以使用Float.parseFloat()，如果我们更喜欢一个Float对象，可以使用Float.valueOf()。同样，对于自定义格式化，DecimalFormat是最佳选项。</p><p>如常，这些示例的代码可以在GitHub上找到。</p>`,62),l=[p];function o(c,i){return s(),n("div",null,l)}const d=a(e,[["render",o],["__file","2024-07-23-Convert String to Float and Back in Java.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-23/2024-07-23-Convert%20String%20to%20Float%20and%20Back%20in%20Java.html","title":"Java中将字符串转换为浮点数及反向转换","lang":"zh-CN","frontmatter":{"date":"2024-07-23T00:00:00.000Z","category":["Java","字符串转换"],"tag":["Java","浮点数","字符串"],"head":[["meta",{"name":"keywords","content":"Java, 字符串转换, 浮点数"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-23/2024-07-23-Convert%20String%20to%20Float%20and%20Back%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中将字符串转换为浮点数及反向转换"}],["meta",{"property":"og:description","content":"Java中将字符串转换为浮点数及反向转换 将数据从浮点数转换为字符串以及反向操作在Java中是一种常规操作。然而，进行这种转换的多种方法可能会引起混乱和不确定性，使人不确定应该选择哪种方法。 在本文中，我们将展示并比较所有可用的选项。 首先，让我们看看将浮点数值转换为字符串的最常见方式。 2.1 字符串拼接 我们可以使用的最直接解决方案是将浮点值与一个..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-23T03:19:34.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"浮点数"}],["meta",{"property":"article:tag","content":"字符串"}],["meta",{"property":"article:published_time","content":"2024-07-23T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-23T03:19:34.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中将字符串转换为浮点数及反向转换\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-23T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-23T03:19:34.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中将字符串转换为浮点数及反向转换 将数据从浮点数转换为字符串以及反向操作在Java中是一种常规操作。然而，进行这种转换的多种方法可能会引起混乱和不确定性，使人不确定应该选择哪种方法。 在本文中，我们将展示并比较所有可用的选项。 首先，让我们看看将浮点数值转换为字符串的最常见方式。 2.1 字符串拼接 我们可以使用的最直接解决方案是将浮点值与一个..."},"headers":[{"level":3,"title":"2.1 字符串拼接","slug":"_2-1-字符串拼接","link":"#_2-1-字符串拼接","children":[]},{"level":3,"title":"2.2 Float.toString()","slug":"_2-2-float-tostring","link":"#_2-2-float-tostring","children":[]},{"level":3,"title":"2.3 String.valueOf()","slug":"_2-3-string-valueof","link":"#_2-3-string-valueof","children":[]},{"level":3,"title":"2.4 String.format()","slug":"_2-4-string-format","link":"#_2-4-string-format","children":[]},{"level":3,"title":"2.5 DecimalFormat","slug":"_2-5-decimalformat","link":"#_2-5-decimalformat","children":[]},{"level":2,"title":"3. 字符串到Float","slug":"_3-字符串到float","link":"#_3-字符串到float","children":[{"level":3,"title":"3.1 Float.parseFloat()","slug":"_3-1-float-parsefloat","link":"#_3-1-float-parsefloat","children":[]},{"level":3,"title":"3.2 Float.valueOf()","slug":"_3-2-float-valueof","link":"#_3-2-float-valueof","children":[]},{"level":3,"title":"3.3 DecimalFormat","slug":"_3-3-decimalformat","link":"#_3-3-decimalformat","children":[]},{"level":3,"title":"3.4 Float的构造函数","slug":"_3-4-float的构造函数","link":"#_3-4-float的构造函数","children":[]}]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1721704774000,"updatedTime":1721704774000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.51,"words":1352},"filePathRelative":"posts/baeldung/2024-07-23/2024-07-23-Convert String to Float and Back in Java.md","localizedDate":"2024年7月23日","excerpt":"\\n<p>将数据从浮点数转换为字符串以及反向操作在Java中是一种常规操作。然而，进行这种转换的多种方法可能会引起混乱和不确定性，使人不确定应该选择哪种方法。</p>\\n<p>在本文中，我们将展示并比较所有可用的选项。</p>\\n<p>首先，让我们看看将浮点数值转换为字符串的最常见方式。</p>\\n<h3>2.1 字符串拼接</h3>\\n<p>我们可以使用的最直接解决方案是将浮点值与一个空字符串进行拼接。</p>\\n<p>让我们看一个例子：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">float</span> givenFloat <span class=\\"token operator\\">=</span> <span class=\\"token number\\">1.25f</span><span class=\\"token punctuation\\">;</span>\\n\\n<span class=\\"token class-name\\">String</span> result <span class=\\"token operator\\">=</span> givenFloat <span class=\\"token operator\\">+</span> <span class=\\"token string\\">\\"\\"</span><span class=\\"token punctuation\\">;</span>\\n\\n<span class=\\"token function\\">assertEquals</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"1.25\\"</span><span class=\\"token punctuation\\">,</span> result<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n</code></pre></div>","autoDesc":true}');export{d as comp,k as data};
