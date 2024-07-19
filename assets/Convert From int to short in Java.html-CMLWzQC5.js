import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as e}from"./app-D5kFWV-m.js";const t={},p=e(`<h1 id="java中从int转换为short的方法" tabindex="-1"><a class="header-anchor" href="#java中从int转换为short的方法"><span>Java中从int转换为short的方法</span></a></h1><p>当我们在Java中工作时，经常会遇到需要转换数据类型以满足特定要求的场景。一种常见的转换是从int转换为short。</p><p>在本教程中，我们将探讨如何在Java中将int转换为short以及需要注意的潜在陷阱。</p><h2 id="_2-问题介绍" tabindex="-1"><a class="header-anchor" href="#_2-问题介绍"><span>2. 问题介绍</span></a></h2><p>Java提供了几种原始数据类型来存储数值，每种数据类型都有其范围和精度。例如，int数据类型是一个32位有符号整数，能够存储从-2<sup>31到2</sup>31 - 1的值。另一方面，short数据类型是一个16位有符号整数，能够存储从-2<sup>15到2</sup>15 - 1的值。</p><p>由于int的范围比short宽，将int转换为short可能会有潜在的陷阱，我们将在接下来的部分中详细讨论。</p><p>接下来，让我们探索在Java中将int转换为short的方法。</p><h2 id="_3-将int强制转换为short" tabindex="-1"><a class="header-anchor" href="#_3-将int强制转换为short"><span>3. 将int强制转换为short</span></a></h2><p>将int转换为short最直接的方法是通过强制转换。一个示例可以清楚地显示它的工作原理：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">short</span> expected <span class="token operator">=</span> <span class="token number">42</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">42</span><span class="token punctuation">;</span>
<span class="token keyword">short</span> result <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">short</span><span class="token punctuation">)</span> i<span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span>expected<span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在Java中，整数有两种类型：原始int和Integer。接下来，让我们看看如何将Integer实例转换为short。</p><h2 id="_4-使用integer-shortvalue-方法" tabindex="-1"><a class="header-anchor" href="#_4-使用integer-shortvalue-方法"><span>4. 使用Integer.shortValue()方法</span></a></h2><p>Integer类提供了shortValue()方法。顾名思义，shortValue()允许我们方便地将给定的Integer转换为short值：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">short</span> expected <span class="token operator">=</span> <span class="token number">42</span><span class="token punctuation">;</span>
<span class="token class-name">Integer</span> intObj <span class="token operator">=</span> <span class="token number">42</span><span class="token punctuation">;</span>
<span class="token keyword">short</span> result <span class="token operator">=</span> intObj<span class="token punctuation">.</span><span class="token function">shortValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span>expected<span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然而，如果我们查看shortValue()方法的实现，我们会发现它在内部将Integer值强制转换为short值：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">short</span> <span class="token function">shortValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token keyword">short</span><span class="token punctuation">)</span>value<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们已经注意到Java中int的范围比short大。因此，我们可能会想知道，如果给定的整数超出了short的范围会发生什么。接下来，让我们详细探讨这个问题。</p><h2 id="_5-潜在陷阱" tabindex="-1"><a class="header-anchor" href="#_5-潜在陷阱"><span>5. 潜在陷阱</span></a></h2><p>将超出short范围的整数值进行强制转换可能会产生“令人惊讶”的结果。接下来，让我们检查几个转换示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span> oneMillion <span class="token operator">=</span> <span class="token number">1_000_000</span><span class="token punctuation">;</span>
<span class="token keyword">short</span> result <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">short</span><span class="token punctuation">)</span> oneMillion<span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">16960</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个示例中，整数值是一百万，超出了short的最大值（32767）。强制转换后，我们得到了一个short值16960。</p><p>此外，如果我们将整数更改为二百万，我们甚至得到一个负数（-31616）：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span> twoMillion <span class="token operator">=</span> <span class="token number">2_000_000</span><span class="token punctuation">;</span>
result <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">short</span><span class="token punctuation">)</span> twoMillion<span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">31616</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们将找出为什么我们得到这些“令人惊讶”的数字。</p><p>为了回答这个问题，我们首先需要了解Java中short是如何表示为二进制数的。</p><h3 id="_5-1-short-16位有符号整数" tabindex="-1"><a class="header-anchor" href="#_5-1-short-16位有符号整数"><span>5.1. short：16位有符号整数</span></a></h3><p>我们已经知道short是Java中的16位有符号整数。最高有效位（MSB）表示整数的符号：正数为0，负数为1。例如，short值42是这样存储的：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">short</span> <span class="token number">42</span><span class="token operator">:</span>
    <span class="token number">00000000</span> <span class="token number">00101010</span>
    <span class="token operator">^</span>
    <span class="token constant">MSB</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>按照这个规则，有些人可能认为-42可以表示为“10000000 00101010”。但它不是：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">short</span> <span class="token operator">-</span><span class="token number">42</span><span class="token operator">:</span>
    <span class="token number">11111111</span> <span class="token number">11010110</span>
    <span class="token operator">^</span>
    <span class="token constant">MSB</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是因为Java采用二进制补码来表示负数。简单来说，在二进制补码计算中，有两个步骤：首先，反转每个位，然后向反转后的二进制数加1。</p><p>接下来，让我们理解为什么-42可以表示为“11111111 11010110”：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>二进制          <span class="token operator">:</span> <span class="token number">11111111</span> <span class="token number">11010110</span> <span class="token punctuation">(</span><span class="token constant">MSB</span><span class="token operator">:</span> <span class="token number">1</span> <span class="token operator">-&gt;</span> 负数<span class="token punctuation">)</span>
反转位     <span class="token operator">:</span> <span class="token number">00000000</span> <span class="token number">00101001</span>
<span class="token operator">+</span> <span class="token number">1</span>             <span class="token operator">:</span> <span class="token number">00000000</span> <span class="token number">00101010</span>
十进制         <span class="token operator">:</span> <span class="token number">42</span>
结果          <span class="token operator">:</span> <span class="token operator">-</span><span class="token number">42</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在我们知道了short是如何存储的，让我们理解将int转换为short时会发生什么。</p><h3 id="_5-2-强制转换是如何工作的" tabindex="-1"><a class="header-anchor" href="#_5-2-强制转换是如何工作的"><span>5.2. 强制转换是如何工作的</span></a></h3><p>在Java中，int是一个32位有符号整数，比short多出16位。因此，当我们将int强制转换为short时，int的16位高阶位将被截断。</p><p>一个示例可以快速澄清这一点。让我们看看当我们将int值42强制转换为short时是如何工作的：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token number">42</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span>      <span class="token operator">:</span> <span class="token number">00000000</span> <span class="token number">00000000</span> <span class="token number">00000000</span> <span class="token number">00101010</span>
强制转换为<span class="token keyword">short</span> <span class="token operator">:</span>                   <span class="token number">00000000</span> <span class="token number">00101010</span>
结果        <span class="token operator">:</span> <span class="token number">42</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，我们可以明白当我们将整数一百万强制转换为short时为什么会得到“令人惊讶”的结果。由于short的范围比int窄，超出short容量的高阶位在强制转换过程中被丢弃，导致结果short中出现意外的值：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token number">1</span> million <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span>  <span class="token operator">:</span> <span class="token number">00000000</span> <span class="token number">00001111</span> <span class="token number">01000010</span> <span class="token number">01000000</span>
强制转换为<span class="token keyword">short</span>    <span class="token operator">:</span>                   <span class="token number">01000010</span> <span class="token number">01000000</span>
十进制          <span class="token operator">:</span>                   <span class="token number">16960</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在“将整数二百万强制转换”的例子中，<strong>我们得到了一个负数，因为在截断高阶位后MSB是1：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token number">2</span> million <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span>  <span class="token operator">:</span> <span class="token number">00000000</span> <span class="token number">00011110</span> <span class="token number">10000100</span> <span class="token number">10000000</span>
强制转换为<span class="token keyword">short</span>    <span class="token operator">:</span>                   <span class="token number">10000100</span> <span class="token number">10000000</span>
<span class="token constant">MSB</span><span class="token operator">:</span> <span class="token number">1</span> <span class="token operator">-&gt;</span> 负数
反转位      <span class="token operator">:</span>                   <span class="token number">01111011</span> <span class="token number">01111111</span>
<span class="token operator">+</span> <span class="token number">1</span>              <span class="token operator">:</span>                   <span class="token number">01111011</span> <span class="token number">10000000</span>
十进制          <span class="token operator">:</span>                   <span class="token number">31616</span>
结果           <span class="token operator">:</span>                   <span class="token operator">-</span><span class="token number">31616</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-3-创建inttoshort" tabindex="-1"><a class="header-anchor" href="#_5-3-创建inttoshort"><span>5.3. 创建intToShort()</span></a></h3><p>在将int转换为short时，我们必须小心，因为这可能会导致数据丢失或如果int值超出short范围则出现意外行为。<strong>我们应该始终在强制转换之前检查int值是否在Short.MIN_VALUE和Short.MAX_VALUE之间：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">short</span> <span class="token function">intToShort</span><span class="token punctuation">(</span><span class="token keyword">int</span> i<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>i \`\`<span class="token operator">&lt;</span> <span class="token class-name">Short</span><span class="token punctuation">.</span><span class="token constant">MIN_VALUE</span> <span class="token operator">||</span> i <span class="token operator">&gt;</span>\`\` <span class="token class-name">Short</span><span class="token punctuation">.</span><span class="token constant">MAX_VALUE</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalArgumentException</span><span class="token punctuation">(</span><span class="token string">&quot;Int is out of short range&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token keyword">short</span><span class="token punctuation">)</span> i<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，当输入的整数超出short的范围时，它会抛出一个异常：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">short</span> expected <span class="token operator">=</span> <span class="token number">42</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> int42 <span class="token operator">=</span> <span class="token number">42</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span>expected<span class="token punctuation">,</span> <span class="token function">intToShort</span><span class="token punctuation">(</span>int42<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">int</span> oneMillion <span class="token operator">=</span> <span class="token number">1_000_000</span><span class="token punctuation">;</span>
<span class="token function">assertThrows</span><span class="token punctuation">(</span><span class="token class-name">IllegalArgumentException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token function">intToShort</span><span class="token punctuation">(</span>oneMillion<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们探讨了如何在Java中将int转换为short，并讨论了当我们强制转换一个超出short范围的int值时可能遇到的潜在陷阱。</p><p>如常，示例的完整源代码可在GitHub上找到。</p><p>文章发布后30天内开放评论。对于此日期之后的任何问题，请使用网站上的联系表单。翻译已经完成，以下是翻译的完整内容：</p><hr><p>date: 2024-06-17 category:</p><ul><li>Java</li><li>数据类型转换 tag:</li><li>int</li><li>short</li></ul><hr><h1 id="java中从int转换为short的方法-1" tabindex="-1"><a class="header-anchor" href="#java中从int转换为short的方法-1"><span>Java中从int转换为short的方法</span></a></h1><p>当我们在Java中工作时，经常会遇到需要转换数据类型以满足特定要求的场景。一种常见的转换是从int转换为short。</p><p>在本教程中，我们将探讨如何在Java中将int转换为short以及需要注意的潜在陷阱。</p><h2 id="问题介绍" tabindex="-1"><a class="header-anchor" href="#问题介绍"><span>问题介绍</span></a></h2><p>Java提供了几种原始数据类型来存储数值，每种数据类型都有其范围和精度。例如，int数据类型是一个32位有符号整数，能够存储从-2<sup>31到2</sup>31 - 1的值。另一方面，short数据类型是一个16位有符号整数，能够存储从-2<sup>15到2</sup>15 - 1的值。</p><p>由于int的范围比short宽，将int转换为short可能会有潜在的陷阱，我们将在接下来的部分中详细讨论。</p><p>接下来，让我们探索在Java中将int转换为short的方法。</p><h2 id="将int强制转换为short" tabindex="-1"><a class="header-anchor" href="#将int强制转换为short"><span>将int强制转换为short</span></a></h2><p>将int转换为short最直接的方法是通过强制转换。一个示例可以清楚地显示它的工作原理：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">short</span> expected <span class="token operator">=</span> <span class="token number">42</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">42</span><span class="token punctuation">;</span>
<span class="token keyword">short</span> result <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">short</span><span class="token punctuation">)</span> i<span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span>expected<span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在Java中，整数有两种类型：原始int和Integer。接下来，让我们看看如何将Integer实例转换为short。</p><h2 id="使用integer-shortvalue-方法" tabindex="-1"><a class="header-anchor" href="#使用integer-shortvalue-方法"><span>使用Integer.shortValue()方法</span></a></h2><p>Integer类提供了shortValue()方法。顾名思义，shortValue()允许我们方便地将给定的Integer转换为short值：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">short</span> expected <span class="token operator">=</span> <span class="token number">42</span><span class="token punctuation">;</span>
<span class="token class-name">Integer</span> intObj <span class="token operator">=</span> <span class="token number">42</span><span class="token punctuation">;</span>
<span class="token keyword">short</span> result <span class="token operator">=</span> intObj<span class="token punctuation">.</span><span class="token function">shortValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span>expected<span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然而，如果我们查看shortValue()方法的实现，我们会发现它在内部将Integer值强制转换为short值：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">short</span> <span class="token function">shortValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token keyword">short</span><span class="token punctuation">)</span>value<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们已经注意到Java中int的范围比short大。因此，我们可能会想知道，如果给定的整数超出了short的范围会发生什么。接下来，让我们详细探讨这个问题。</p><h2 id="潜在陷阱" tabindex="-1"><a class="header-anchor" href="#潜在陷阱"><span>潜在陷阱</span></a></h2><p>将超出short范围的整数值进行强制转换可能会产生“令人惊讶”的结果。接下来，让我们检查几个转换示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span> oneMillion <span class="token operator">=</span> <span class="token number">1_000_000</span><span class="token punctuation">;</span>
<span class="token keyword">short</span> result <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">short</span><span class="token punctuation">)</span> oneMillion<span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">16960</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个示例中，整数值是一百万，超出了short的最大值（32767）。强制转换后，我们得到了一个short值16960。</p><p>此外，如果我们将整数更改为二百万，我们甚至得到一个负数（-31616）：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span> twoMillion <span class="token operator">=</span> <span class="token number">2_000_000</span><span class="token punctuation">;</span>
result <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">short</span><span class="token punctuation">)</span> twoMillion<span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">31616</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们将找出为什么我们得到这些“令人惊讶”的数字。</p><p>为了回答这个问题，我们首先需要了解Java中short是如何表示为二进制数的。</p><h3 id="short-16位有符号整数" tabindex="-1"><a class="header-anchor" href="#short-16位有符号整数"><span>short：16位有符号整数</span></a></h3><p>我们已经知道short是Java中的16位有符号整数。最高有效位（MSB）表示整数的符号：正数为0，负数为1。例如，short值42是这样存储的：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">short</span> <span class="token number">42</span><span class="token operator">:</span>
    <span class="token number">00000000</span> <span class="token number">00101010</span>
    <span class="token operator">^</span>
    <span class="token constant">MSB</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>按照这个规则，有些人可能认为-42可以表示为“10000000 00101010”。但它不是：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">short</span> <span class="token operator">-</span><span class="token number">42</span><span class="token operator">:</span>
    <span class="token number">11111111</span> <span class="token number">11010110</span>
    <span class="token operator">^</span>
    <span class="token constant">MSB</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是因为Java采用二进制补码来表示负数。简单来说，在二进制补码计算中，有两个步骤：首先，反转每个位，然后向反转后的二进制数加1。</p><p>接下来，让我们理解为什么-42可以表示为“11111111 11010110”：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>二进制          <span class="token operator">:</span> <span class="token number">11111111</span> <span class="token number">11010110</span> <span class="token punctuation">(</span><span class="token constant">MSB</span><span class="token operator">:</span> <span class="token number">1</span> <span class="token operator">-&gt;</span> 负数<span class="token punctuation">)</span>
反转位     <span class="token operator">:</span> <span class="token number">00000000</span> <span class="token number">00101001</span>
<span class="token operator">+</span> <span class="token number">1</span>             <span class="token operator">:</span> <span class="token number">00000000</span> <span class="token number">00101010</span>
十进制         <span class="token operator">:</span> <span class="token number">42</span>
结果          <span class="token operator">:</span> <span class="token operator">-</span><span class="token number">42</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在我们知道了short是如何存储的，让我们理解将int转换为short时会发生什么。</p><h3 id="强制转换是如何工作的" tabindex="-1"><a class="header-anchor" href="#强制转换是如何工作的"><span>强制转换是如何工作的</span></a></h3><p>在Java中，int是一个32位有符号整数，比short多出16位。因此，当我们将int强制转换为short时，int的16位高阶位将被截断。</p><p>一个示例可以快速澄清这一点。让我们看看当我们将int值42强制转换为short时是如何工作的：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token number">42</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span>      <span class="token operator">:</span> <span class="token number">00000000</span> <span class="token number">00000000</span> <span class="token number">00000000</span> <span class="token number">00101010</span>
强制转换为<span class="token keyword">short</span> <span class="token operator">:</span>                   <span class="token number">00000000</span> <span class="token number">00101010</span>
结果        <span class="token operator">:</span> <span class="token number">42</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，我们可以明白当我们将整数一百万强制转换为short时为什么会得到“令人惊讶”的结果。由于short的范围比int窄，超出short容量的高阶位在强制转换过程中被丢弃，导致结果short中出现意外的值：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token number">1</span> million <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span>  <span class="token operator">:</span> <span class="token number">00000000</span> <span class="token number">00001111</span> <span class="token number">01000010</span> <span class="token number">01000000</span>
强制转换为<span class="token keyword">short</span>    <span class="token operator">:</span>                   <span class="token number">01000010</span> <span class="token number">01000000</span>
十进制          <span class="token operator">:</span>                   <span class="token number">16960</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在“将整数二百万强制转换”的例子中，<strong>我们得到了一个负数，因为在截断高阶位后MSB是1：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token number">2</span> million <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span>  <span class="token operator">:</span> <span class="token number">00000000</span> <span class="token number">00011110</span> <span class="token number">10000100</span> <span class="token number">10000000</span>
强制转换为<span class="token keyword">short</span>    <span class="token operator">:</span>                   <span class="token number">10000100</span> <span class="token number">10000000</span>
<span class="token constant">MSB</span><span class="token operator">:</span> <span class="token number">1</span> <span class="token operator">-&gt;</span> 负数
反转位      <span class="token operator">:</span>                   <span class="token number">01111011</span> <span class="token number">01111111</span>
<span class="token operator">+</span> <span class="token number">1</span>              <span class="token operator">:</span>                   <span class="token number">01111011</span> <span class="token number">10000000</span>
十进制          <span class="token operator">:</span>                   <span class="token number">31616</span>
结果           <span class="token operator">:</span>                   <span class="token operator">-</span><span class="token number">31616</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="创建inttoshort" tabindex="-1"><a class="header-anchor" href="#创建inttoshort"><span>创建intToShort()</span></a></h3><p>在将int转换为short时，我们必须小心，因为这可能会导致数据丢失或如果int值超出short范围则出现意外行为。<strong>我们应该始终在强制转换之前检查int值是否在Short.MIN_VALUE和Short.MAX_VALUE之间：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">short</span> <span class="token function">intToShort</span><span class="token punctuation">(</span><span class="token keyword">int</span> i<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>i \`\`<span class="token operator">&lt;</span> <span class="token class-name">Short</span><span class="token punctuation">.</span><span class="token constant">MIN_VALUE</span> <span class="token operator">||</span> i <span class="token operator">&gt;</span>\`\` <span class="token class-name">Short</span><span class="token punctuation">.</span><span class="token constant">MAX_VALUE</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalArgumentException</span><span class="token punctuation">(</span><span class="token string">&quot;Int is out of short range&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token keyword">short</span><span class="token punctuation">)</span> i<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，当输入的整数超出short的范围时，它会抛出一个异常：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">short</span> expected <span class="token operator">=</span> <span class="token number">42</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> int42 <span class="token operator">=</span> <span class="token number">42</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span>expected<span class="token punctuation">,</span> <span class="token function">intToShort</span><span class="token punctuation">(</span>int42<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">int</span> oneMillion <span class="token operator">=</span> <span class="token number">1_000_000</span><span class="token punctuation">;</span>
<span class="token function">assertThrows</span><span class="token punctuation">(</span><span class="token class-name">IllegalArgumentException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token function">intToShort</span><span class="token punctuation">(</span>oneMillion<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="结论" tabindex="-1"><a class="header-anchor" href="#结论"><span>结论</span></a></h2><p>在本文中，我们探讨了如何在Java中将int转换为short，并讨论了当我们强制转换一个超出short范围的int值时可能遇到的潜在陷阱。</p><p>如常，示例的完整源代码可在GitHub上找到。</p><p>文章发布后30天内开放评论。对于此日期之后的任何问题，请使用网站上的联系表单。</p>`,106),o=[p];function l(i,c){return a(),s("div",null,o)}const d=n(t,[["render",l],["__file","Convert From int to short in Java.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/Archive/Convert%20From%20int%20to%20short%20in%20Java.html","title":"Java中从int转换为short的方法","lang":"zh-CN","frontmatter":{"date":"2024-06-17T00:00:00.000Z","category":["Java","数据类型转换"],"tag":["int","short"],"description":"Java中从int转换为short的方法 当我们在Java中工作时，经常会遇到需要转换数据类型以满足特定要求的场景。一种常见的转换是从int转换为short。 在本教程中，我们将探讨如何在Java中将int转换为short以及需要注意的潜在陷阱。 2. 问题介绍 Java提供了几种原始数据类型来存储数值，每种数据类型都有其范围和精度。例如，int数据类...","head":[["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/Convert%20From%20int%20to%20short%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中从int转换为short的方法"}],["meta",{"property":"og:description","content":"Java中从int转换为short的方法 当我们在Java中工作时，经常会遇到需要转换数据类型以满足特定要求的场景。一种常见的转换是从int转换为short。 在本教程中，我们将探讨如何在Java中将int转换为short以及需要注意的潜在陷阱。 2. 问题介绍 Java提供了几种原始数据类型来存储数值，每种数据类型都有其范围和精度。例如，int数据类..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"int"}],["meta",{"property":"article:tag","content":"short"}],["meta",{"property":"article:published_time","content":"2024-06-17T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中从int转换为short的方法\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-17T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]]},"headers":[{"level":2,"title":"2. 问题介绍","slug":"_2-问题介绍","link":"#_2-问题介绍","children":[]},{"level":2,"title":"3. 将int强制转换为short","slug":"_3-将int强制转换为short","link":"#_3-将int强制转换为short","children":[]},{"level":2,"title":"4. 使用Integer.shortValue()方法","slug":"_4-使用integer-shortvalue-方法","link":"#_4-使用integer-shortvalue-方法","children":[]},{"level":2,"title":"5. 潜在陷阱","slug":"_5-潜在陷阱","link":"#_5-潜在陷阱","children":[{"level":3,"title":"5.1. short：16位有符号整数","slug":"_5-1-short-16位有符号整数","link":"#_5-1-short-16位有符号整数","children":[]},{"level":3,"title":"5.2. 强制转换是如何工作的","slug":"_5-2-强制转换是如何工作的","link":"#_5-2-强制转换是如何工作的","children":[]},{"level":3,"title":"5.3. 创建intToShort()","slug":"_5-3-创建inttoshort","link":"#_5-3-创建inttoshort","children":[]}]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]},{"level":2,"title":"问题介绍","slug":"问题介绍","link":"#问题介绍","children":[]},{"level":2,"title":"将int强制转换为short","slug":"将int强制转换为short","link":"#将int强制转换为short","children":[]},{"level":2,"title":"使用Integer.shortValue()方法","slug":"使用integer-shortvalue-方法","link":"#使用integer-shortvalue-方法","children":[]},{"level":2,"title":"潜在陷阱","slug":"潜在陷阱","link":"#潜在陷阱","children":[{"level":3,"title":"short：16位有符号整数","slug":"short-16位有符号整数","link":"#short-16位有符号整数","children":[]},{"level":3,"title":"强制转换是如何工作的","slug":"强制转换是如何工作的","link":"#强制转换是如何工作的","children":[]},{"level":3,"title":"创建intToShort()","slug":"创建inttoshort","link":"#创建inttoshort","children":[]}]},{"level":2,"title":"结论","slug":"结论","link":"#结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":9.58,"words":2874},"filePathRelative":"posts/baeldung/Archive/Convert From int to short in Java.md","localizedDate":"2024年6月17日","excerpt":"\\n<p>当我们在Java中工作时，经常会遇到需要转换数据类型以满足特定要求的场景。一种常见的转换是从int转换为short。</p>\\n<p>在本教程中，我们将探讨如何在Java中将int转换为short以及需要注意的潜在陷阱。</p>\\n<h2>2. 问题介绍</h2>\\n<p>Java提供了几种原始数据类型来存储数值，每种数据类型都有其范围和精度。例如，int数据类型是一个32位有符号整数，能够存储从-2<sup>31到2</sup>31 - 1的值。另一方面，short数据类型是一个16位有符号整数，能够存储从-2<sup>15到2</sup>15 - 1的值。</p>\\n<p>由于int的范围比short宽，将int转换为short可能会有潜在的陷阱，我们将在接下来的部分中详细讨论。</p>","autoDesc":true}');export{d as comp,k as data};
