import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as e}from"./app-CtR6X2Br.js";const t={},p=e(`<h1 id="java字面量" tabindex="-1"><a class="header-anchor" href="#java字面量"><span>Java字面量</span></a></h1><p>在Java编程语言中，我们会使用大量的字面量。</p><p>在本教程中，我们将查看所有类型的字面量以及如何使用它们。</p><h2 id="_2-java字面量是什么" tabindex="-1"><a class="header-anchor" href="#_2-java字面量是什么"><span>2. Java字面量是什么？</span></a></h2><p>**Java字面量是我们在代码中指定为常量值的任何值。**它可以是任何类型 - 整数、浮点数、双精度、长整型、字符串、字符或布尔值。</p><p>在以下示例中，数字_1_和字符串_literal_string_是字面量。</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span> x <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> s <span class="token operator">=</span> <span class="token string">&quot;literal_string&quot;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在使用字面量时，同样重要的是要很好地理解Java基本类型。</p><h2 id="_3-字面量的类型" tabindex="-1"><a class="header-anchor" href="#_3-字面量的类型"><span>3. 字面量的类型</span></a></h2><p>让我们通过一些示例来查看不同类型的字面量。</p><h3 id="_3-1-整数字面量" tabindex="-1"><a class="header-anchor" href="#_3-1-整数字面量"><span>3.1. 整数字面量</span></a></h3><p>对于整数（int、long、short、byte），我们可以用不同的方式指定它们。</p><p>首先，我们可以使用<strong>十进制字面量（基数10）</strong>。这些是最常用的，因为它们是我们日常使用的数字。</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span> x <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>其次，我们可以以<strong>八进制形式（基数8）<strong>指定整数字面量。在这种形式中，它们必须以</strong>0</strong>开头。</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span> x <span class="token operator">=</span> <span class="token number">05</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>第三，整数字面量可以以<strong>十六进制形式（基数16）<strong>使用。它们必须以</strong>0x</strong>或<strong>0X</strong>开头。</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span> x <span class="token operator">=</span> <span class="token number">0x12ef</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>最后，我们有<strong>二进制形式（基数2）</strong>。这种形式是在Java 1.7中引入的，这些字面量必须以<strong>0b</strong>或<strong>0B</strong>开头。</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span> x <span class="token operator">=</span> <span class="token number">0b1101</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在上面的示例中，我们可以将_int_更改为任何整数类型，只要字面量值不超过类型限制。</p><p>这些字面量默认被视为_int_。对于_long_、<em>short_或_byte</em>，编译器会检查值是否接近类型的限制，如果是，它将被视为该类型的字面量。</p><p>我们可以通过使用_l_或_L_来覆盖默认的_int_字面量，以表示长整型字面量。我们仅在字面量值超过_int_限制时才需要使用此方法。</p><h3 id="_3-2-浮点字面量" tabindex="-1"><a class="header-anchor" href="#_3-2-浮点字面量"><span>3.2. 浮点字面量</span></a></h3><p>浮点字面量默认被视为_double_。我们也可以通过使用_d_或_D_来指定字面量是_double_。这不是强制性的，但这是一种良好的实践。</p><p>我们可以通过使用_f_或_F_来<strong>指定我们想要一个_float_</strong>。这对于_float_类型的字面量是强制性的。</p><p>浮点字面量只能以十进制形式（基数10）指定：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">double</span> d <span class="token operator">=</span> <span class="token number">123.456</span><span class="token punctuation">;</span>
<span class="token keyword">float</span> f <span class="token operator">=</span> <span class="token number">123.456</span><span class="token punctuation">;</span>
<span class="token keyword">float</span> f2 <span class="token operator">=</span> <span class="token number">123.456d</span><span class="token punctuation">;</span> <span class="token comment">// 此示例将因类型不匹配而无法编译</span>
<span class="token keyword">float</span> f3 <span class="token operator">=</span> <span class="token number">123.456f</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第二和第三个示例将因类型不匹配而无法编译。</p><h3 id="_3-3-字符字面量" tabindex="-1"><a class="header-anchor" href="#_3-3-字符字面量"><span>3.3. 字符字面量</span></a></h3><p>对于_char_数据类型，字面量可以有几种形式。</p><p>单引号字符很常见，特别是对于特殊字符。</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">char</span> c <span class="token operator">=</span> <span class="token char">&#39;a&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">char</span> c2 <span class="token operator">=</span> <span class="token char">&#39;\\n&#39;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以<strong>在单引号之间使用单个字符或特殊字符</strong>。</p><p>用于字符的整数值被转换为该字符的Unicode值：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">char</span> c <span class="token operator">=</span> <span class="token number">65</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们可以像整数字面量一样指定它。</p><p>最后，我们可以使用Unicode表示法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">char</span> c <span class="token operator">=</span> <span class="token char">&#39;\\u0041&#39;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>最后两个示例中的表达式评估为字符_A_。</p><h3 id="_3-4-字符串字面量" tabindex="-1"><a class="header-anchor" href="#_3-4-字符串字面量"><span>3.4. 字符串字面量</span></a></h3><p>双引号中的任何文本都是_String_字面量：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> s <span class="token operator">=</span> <span class="token string">&quot;string_literal&quot;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><em>String_字面量只能在一行上。为了拥有多行_String</em>，我们可以使用在编译时执行的表达式：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> multiLineText <span class="token operator">=</span> <span class="token string">&quot;When we want some text that is on more than one line,\\n&quot;</span>
<span class="token operator">+</span> <span class="token string">&quot;then we can use expressions to add text to a new line.\\n&quot;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-短整型和字节字面量" tabindex="-1"><a class="header-anchor" href="#_4-短整型和字节字面量"><span>4. 短整型和字节字面量</span></a></h2><p>在上面，我们看到了如何声明每种类型的字面量。对于所有类型，除了_byte_和_short_，我们不需要创建变量。我们可以直接使用字面量值。</p><p>例如，在向方法传递参数时，我们可以传递字面量：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">literals</span><span class="token punctuation">(</span><span class="token keyword">int</span> i<span class="token punctuation">,</span> <span class="token keyword">long</span> l<span class="token punctuation">,</span> <span class="token keyword">double</span> d<span class="token punctuation">,</span> <span class="token keyword">float</span> f<span class="token punctuation">,</span> <span class="token keyword">char</span> c<span class="token punctuation">,</span> <span class="token class-name">String</span> s<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// do something</span>
<span class="token punctuation">}</span>
<span class="token comment">// 调用literals方法</span>
<span class="token function">literals</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">123L</span><span class="token punctuation">,</span> <span class="token number">1.0D</span><span class="token punctuation">,</span> <span class="token number">1.0F</span><span class="token punctuation">,</span> <span class="token char">&#39;a&#39;</span><span class="token punctuation">,</span> <span class="token string">&quot;a&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的例子中，只有_F_是强制性的标记。</p><p>令人惊讶的是，对于_byte_和_short_类型会出现问题：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">shortAndByteLiterals</span><span class="token punctuation">(</span><span class="token keyword">short</span> s<span class="token punctuation">,</span> <span class="token keyword">byte</span> b<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// do something</span>
<span class="token punctuation">}</span>
<span class="token comment">// 调用方法</span>
<span class="token function">shortAndByteLiterals</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 无法编译</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>尽管有这个限制，但有两种解决方案。</p><p>第一种解决方案是使用我们之前声明的一些变量：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">short</span> s <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token keyword">byte</span> b <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token function">shortAndByteLiterals</span><span class="token punctuation">(</span>s<span class="token punctuation">,</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>另一个选择是将字面量值进行类型转换：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">shortAndByteLiterals</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">short</span><span class="token punctuation">)</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token keyword">byte</span><span class="token punctuation">)</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这是必要的，以便让编译器使用适当的类型。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们查看了在Java中指定和使用字面量的不同方式。</p>`,60),o=[p];function l(i,c){return s(),n("div",null,o)}const u=a(t,[["render",l],["__file","2024-07-13-Java Literals.html.vue"]]),v=JSON.parse('{"path":"/posts/baeldung/2024-07-13/2024-07-13-Java%20Literals.html","title":"Java字面量","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Programming"],"tag":["Java Literals","Programming"],"head":[["meta",{"name":"keywords","content":"Java, Literals, Programming"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-13/2024-07-13-Java%20Literals.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java字面量"}],["meta",{"property":"og:description","content":"Java字面量 在Java编程语言中，我们会使用大量的字面量。 在本教程中，我们将查看所有类型的字面量以及如何使用它们。 2. Java字面量是什么？ **Java字面量是我们在代码中指定为常量值的任何值。**它可以是任何类型 - 整数、浮点数、双精度、长整型、字符串、字符或布尔值。 在以下示例中，数字_1_和字符串_literal_string_是字..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-13T19:36:12.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java Literals"}],["meta",{"property":"article:tag","content":"Programming"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-13T19:36:12.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java字面量\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-13T19:36:12.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java字面量 在Java编程语言中，我们会使用大量的字面量。 在本教程中，我们将查看所有类型的字面量以及如何使用它们。 2. Java字面量是什么？ **Java字面量是我们在代码中指定为常量值的任何值。**它可以是任何类型 - 整数、浮点数、双精度、长整型、字符串、字符或布尔值。 在以下示例中，数字_1_和字符串_literal_string_是字..."},"headers":[{"level":2,"title":"2. Java字面量是什么？","slug":"_2-java字面量是什么","link":"#_2-java字面量是什么","children":[]},{"level":2,"title":"3. 字面量的类型","slug":"_3-字面量的类型","link":"#_3-字面量的类型","children":[{"level":3,"title":"3.1. 整数字面量","slug":"_3-1-整数字面量","link":"#_3-1-整数字面量","children":[]},{"level":3,"title":"3.2. 浮点字面量","slug":"_3-2-浮点字面量","link":"#_3-2-浮点字面量","children":[]},{"level":3,"title":"3.3. 字符字面量","slug":"_3-3-字符字面量","link":"#_3-3-字符字面量","children":[]},{"level":3,"title":"3.4. 字符串字面量","slug":"_3-4-字符串字面量","link":"#_3-4-字符串字面量","children":[]}]},{"level":2,"title":"4. 短整型和字节字面量","slug":"_4-短整型和字节字面量","link":"#_4-短整型和字节字面量","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720899372000,"updatedTime":1720899372000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.98,"words":1193},"filePathRelative":"posts/baeldung/2024-07-13/2024-07-13-Java Literals.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在Java编程语言中，我们会使用大量的字面量。</p>\\n<p>在本教程中，我们将查看所有类型的字面量以及如何使用它们。</p>\\n<h2>2. Java字面量是什么？</h2>\\n<p>**Java字面量是我们在代码中指定为常量值的任何值。**它可以是任何类型 - 整数、浮点数、双精度、长整型、字符串、字符或布尔值。</p>\\n<p>在以下示例中，数字_1_和字符串_literal_string_是字面量。</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">int</span> x <span class=\\"token operator\\">=</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token class-name\\">String</span> s <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\\"literal_string\\"</span><span class=\\"token punctuation\\">;</span>\\n</code></pre></div>","autoDesc":true}');export{u as comp,v as data};
