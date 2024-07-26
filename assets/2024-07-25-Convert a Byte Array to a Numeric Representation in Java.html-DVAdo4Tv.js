import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-DpYLEM_u.js";const e={},p=t(`<h1 id="java中将字节数组转换为数值表示" tabindex="-1"><a class="header-anchor" href="#java中将字节数组转换为数值表示"><span>Java中将字节数组转换为数值表示</span></a></h1><p>在本教程中，我们将探讨将字节数组转换为数值（int、long、float、double）及其反向转换的不同方法。</p><p>字节是计算机存储和处理信息的基本单位。Java语言中定义的原始类型是同时操作多个字节的便捷方式。因此，字节数组与原始类型之间存在固有的转换关系。</p><p>由于short和char类型仅由两个字节组成，它们不需要太多关注。因此，我们将重点放在字节数组与int、long、float和double类型的转换上。</p><h3 id="_2-使用位移运算符" tabindex="-1"><a class="header-anchor" href="#_2-使用位移运算符"><span>2. 使用位移运算符</span></a></h3><p>将字节数组转换为数值的最直接方法是使用位移运算符。</p><h4 id="_2-1-字节数组到int和long" tabindex="-1"><a class="header-anchor" href="#_2-1-字节数组到int和long"><span>2.1. 字节数组到int和long</span></a></h4><p>将字节数组转换为int值时，我们使用\`&lt;&lt;（左移）运算符：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span> value <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">byte</span> b <span class="token operator">:</span> bytes<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    value <span class="token operator">=</span> <span class="token punctuation">(</span>value <span class="token operator">&lt;&lt;</span> <span class="token number">8</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token punctuation">(</span>b <span class="token operator">&amp;</span> <span class="token number">0xFF</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通常，上述代码片段中的bytes数组的长度应等于或小于四个字节。这是因为int值占用四个字节。否则，将导致int范围溢出。</p><p>为了验证转换的正确性，让我们定义两个常量：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token constant">INT_BYTE_ARRAY</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span>
    <span class="token punctuation">(</span><span class="token keyword">byte</span><span class="token punctuation">)</span> <span class="token number">0xCA</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token keyword">byte</span><span class="token punctuation">)</span> <span class="token number">0xFE</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token keyword">byte</span><span class="token punctuation">)</span> <span class="token number">0xBA</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token keyword">byte</span><span class="token punctuation">)</span> <span class="token number">0xBE</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> <span class="token constant">INT_VALUE</span> <span class="token operator">=</span> <span class="token number">0xCAFEBABE</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们仔细观察这两个常量，INT_BYTE_ARRAY和INT_VALUE，我们将发现它们是十六进制数0xCAFEBABE的不同表示形式。</p><p>然后，让我们检查这种转换是否正确：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span> value <span class="token operator">=</span> <span class="token function">convertByteArrayToIntUsingShiftOperator</span><span class="token punctuation">(</span><span class="token constant">INT_BYTE_ARRAY</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token constant">INT_VALUE</span><span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>类似地，将字节数组转换为long值时，我们可以重用上述代码片段，但有两个修改：value的类型是long，并且bytes的长度应等于或小于八个字节。</p><h4 id="_2-2-int和long到字节数组" tabindex="-1"><a class="header-anchor" href="#_2-2-int和long到字节数组"><span>2.2. int和long到字节数组</span></a></h4><p>将int值转换为字节数组时，我们可以使用&gt;\`&gt;（有符号右移）或&gt;&gt;&gt;（无符号右移）运算符：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> bytes <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token constant">BYTES</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> length <span class="token operator">=</span> bytes<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i \`<span class="token operator">&lt;</span> length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    bytes<span class="token punctuation">[</span>length <span class="token operator">-</span> i <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">byte</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>value <span class="token operator">&amp;</span> <span class="token number">0xFF</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    value <span class="token operator">&gt;</span>\`<span class="token operator">&gt;=</span> <span class="token number">8</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上述代码片段中，我们可以将&gt;&gt;运算符替换为&gt;&gt;&gt;运算符。这是因为我们只使用value参数最初包含的字节。因此，有符号扩展或零扩展的右移不会影响最终结果。</p><p>然后，我们可以检查上述转换的正确性：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> bytes <span class="token operator">=</span> <span class="token function">convertIntToByteArrayUsingShiftOperator</span><span class="token punctuation">(</span><span class="token constant">INT_VALUE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">assertArrayEquals</span><span class="token punctuation">(</span><span class="token constant">INT_BYTE_ARRAY</span><span class="token punctuation">,</span> bytes<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>将long值转换为字节数组时，我们只需要将Integer.BYTES更改为Long.BYTES，并确保value的类型是long。</p><h4 id="_2-3-字节数组到float和double" tabindex="-1"><a class="header-anchor" href="#_2-3-字节数组到float和double"><span>2.3. 字节数组到float和double</span></a></h4><p><strong>将字节数组转换为float时，我们使用Float.intBitsToFloat()方法：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token comment">// 将字节转换为int</span>
<span class="token keyword">int</span> intValue <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">byte</span> b <span class="token operator">:</span> bytes<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    intValue <span class="token operator">=</span> <span class="token punctuation">(</span>intValue \`<span class="token operator">&lt;&lt;</span> <span class="token number">8</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token punctuation">(</span>b <span class="token operator">&amp;</span> <span class="token number">0xFF</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 将int转换为float</span>
<span class="token keyword">float</span> value <span class="token operator">=</span> <span class="token class-name">Float</span><span class="token punctuation">.</span><span class="token function">intBitsToFloat</span><span class="token punctuation">(</span>intValue<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从上述代码片段中，我们可以了解到字节数组不能直接转换为float值。基本上，它需要两个独立的步骤：首先，我们将字节数组转换为int值，然后将相同的位模式解释为float值。</p><p>为了验证转换的正确性，让我们定义两个常量：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token constant">FLOAT_BYTE_ARRAY</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span>
    <span class="token punctuation">(</span><span class="token keyword">byte</span><span class="token punctuation">)</span> <span class="token number">0x40</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token keyword">byte</span><span class="token punctuation">)</span> <span class="token number">0x48</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token keyword">byte</span><span class="token punctuation">)</span> <span class="token number">0xF5</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token keyword">byte</span><span class="token punctuation">)</span> <span class="token number">0xC3</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">float</span> <span class="token constant">FLOAT_VALUE</span> <span class="token operator">=</span> <span class="token number">3.14F</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，让我们检查这种转换是否正确：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">float</span> value <span class="token operator">=</span> <span class="token function">convertByteArrayToFloatUsingShiftOperator</span><span class="token punctuation">(</span><span class="token constant">FLOAT_BYTE_ARRAY</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token class-name">Float</span><span class="token punctuation">.</span><span class="token function">floatToIntBits</span><span class="token punctuation">(</span><span class="token constant">FLOAT_VALUE</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">Float</span><span class="token punctuation">.</span><span class="token function">floatToIntBits</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同样，<strong>我们可以利用中间的long值和Double.longBitsToDouble()方法将字节数组转换为double值。</strong></p><h4 id="_2-4-float和double到字节数组" tabindex="-1"><a class="header-anchor" href="#_2-4-float和double到字节数组"><span>2.4. float和double到字节数组</span></a></h4><p><strong>将float转换为字节数组时，我们可以利用Float.floatToIntBits()方法：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token comment">// 将float转换为int</span>
<span class="token keyword">int</span> intValue <span class="token operator">=</span> <span class="token class-name">Float</span><span class="token punctuation">.</span><span class="token function">floatToIntBits</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 将int转换为字节</span>
<span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> bytes <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token class-name">Float</span><span class="token punctuation">.</span><span class="token constant">BYTES</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> length <span class="token operator">=</span> bytes<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    bytes<span class="token punctuation">[</span>length <span class="token operator">-</span> i <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">byte</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>intValue <span class="token operator">&amp;</span> <span class="token number">0xFF</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    intValue <span class="token operator">&gt;</span>\`<span class="token operator">&gt;=</span> <span class="token number">8</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，让我们检查这种转换是否正确：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> bytes <span class="token operator">=</span> <span class="token function">convertFloatToByteArrayUsingShiftOperator</span><span class="token punctuation">(</span><span class="token constant">FLOAT_VALUE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">assertArrayEquals</span><span class="token punctuation">(</span><span class="token constant">FLOAT_BYTE_ARRAY</span><span class="token punctuation">,</span> bytes<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>类似地，<strong>我们可以利用Double.doubleToLongBits()方法将double值转换为字节数组。</strong></p><h3 id="_3-使用bytebuffer" tabindex="-1"><a class="header-anchor" href="#_3-使用bytebuffer"><span>3. 使用ByteBuffer</span></a></h3><p><strong>java.nio.ByteBuffer类提供了一种整洁、统一的方式来在字节数组和数值（int、long、float、double）之间进行转换。</strong></p><h4 id="_3-1-字节数组到数值" tabindex="-1"><a class="header-anchor" href="#_3-1-字节数组到数值"><span>3.1. 字节数组到数值</span></a></h4><p>现在，我们使用ByteBuffer类将字节数组转换为int值：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">ByteBuffer</span> buffer <span class="token operator">=</span> <span class="token class-name">ByteBuffer</span><span class="token punctuation">.</span><span class="token function">allocate</span><span class="token punctuation">(</span><span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token constant">BYTES</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
buffer<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>bytes<span class="token punctuation">)</span><span class="token punctuation">;</span>
buffer<span class="token punctuation">.</span><span class="token function">rewind</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> value <span class="token operator">=</span> buffer<span class="token punctuation">.</span><span class="token function">getInt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，我们使用ByteBuffer类将int值转换为字节数组：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">ByteBuffer</span> buffer <span class="token operator">=</span> <span class="token class-name">ByteBuffer</span><span class="token punctuation">.</span><span class="token function">allocate</span><span class="token punctuation">(</span><span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token constant">BYTES</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
buffer<span class="token punctuation">.</span><span class="token function">putInt</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
buffer<span class="token punctuation">.</span><span class="token function">rewind</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> bytes <span class="token operator">=</span> buffer<span class="token punctuation">.</span><span class="token function">array</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们应该注意到，上述两个代码片段遵循相同的模式：</p><ul><li>首先，我们使用ByteBuffer.allocate(int)方法获得具有指定容量的ByteBuffer对象。</li><li>然后，我们将原始值（字节数组或int值）放入ByteBuffer对象中，例如buffer.put(bytes)和buffer.putInt(value)方法。</li><li>之后，我们将ByteBuffer对象的位置重置为零，以便我们可以从开始处读取。</li><li>最后，我们使用buffer.getInt()和buffer.array()等方法从ByteBuffer对象中获取目标值。</li></ul><p>这种模式非常通用，并且支持long、float和double类型的转换。我们唯一需要做的修改是与类型相关的信息。</p><h4 id="_3-2-使用现有的字节数组" tabindex="-1"><a class="header-anchor" href="#_3-2-使用现有的字节数组"><span>3.2. 使用现有的字节数组</span></a></h4><p>此外，ByteBuffer.wrap(byte[])方法允许我们重用现有的字节数组，而无需创建新的数组：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">ByteBuffer</span><span class="token punctuation">.</span><span class="token function">wrap</span><span class="token punctuation">(</span>bytes<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getFloat</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然而，我们还应该注意到，上述bytes变量的长度等于或大于目标类型的大小（Float.BYTES）。否则，将抛出BufferUnderflowException。</p><h3 id="_4-使用biginteger" tabindex="-1"><a class="header-anchor" href="#_4-使用biginteger"><span>4. 使用BigInteger</span></a></h3><p>java.math.BigInteger类的主要目的是表示大数值，这些数值否则无法适应原始数据类型。<strong>尽管我们可以使用它在字节数组和原始值之间进行转换，但使用BigInteger对于这种目的来说有点过于繁重。</strong></p><h4 id="_4-1-字节数组到int和long" tabindex="-1"><a class="header-anchor" href="#_4-1-字节数组到int和long"><span>4.1. 字节数组到int和long</span></a></h4><p>现在，让我们使用BigInteger类将字节数组转换为int值：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span> value <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BigInteger</span><span class="token punctuation">(</span>bytes<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">intValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>类似地，BigInteger类有一个longValue()方法，可以将字节数组转换为long值：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">long</span> value <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BigInteger</span><span class="token punctuation">(</span>bytes<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">longValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>此外，BigInteger类还有一个intValueExact()方法和longValueExact()方法。<strong>这两个方法应该小心使用：如果BigInteger对象超出了int或long类型的范围，两种方法都会抛出ArithmeticException。</strong></p><p>当将int或long值转换为字节数组时，我们可以使用相同的代码片段：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> bytes <span class="token operator">=</span> <span class="token class-name">BigInteger</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toByteArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然而，BigInteger类的toByteArray()方法返回的字节数是最小的，不一定是四个字节或八个字节。</p><h4 id="_4-2-字节数组到float和double" tabindex="-1"><a class="header-anchor" href="#_4-2-字节数组到float和double"><span>4.2. 字节数组到float和double</span></a></h4><p>尽管BigInteger类有一个floatValue()方法，但我们不能像预期的那样使用它将字节数组转换为float值。那么，我们应该怎么做呢？我们可以使用int值作为中间步骤，将字节数组转换为float值：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span> intValue <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BigInteger</span><span class="token punctuation">(</span>bytes<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">intValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">float</span> value <span class="token operator">=</span> <span class="token class-name">Float</span><span class="token punctuation">.</span><span class="token function">intBitsToFloat</span><span class="token punctuation">(</span>intValue<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>同样，我们可以将float值转换为字节数组：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span> intValue <span class="token operator">=</span> <span class="token class-name">Float</span><span class="token punctuation">.</span><span class="token function">floatToIntBits</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> bytes <span class="token operator">=</span> <span class="token class-name">BigInteger</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>intValue<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toByteArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>同样，通过利用Double.longBitsToDouble()和Double.doubleToLongBits()方法，我们可以使用BigInteger类在字节数组和double值之间进行转换。</p><h3 id="_5-使用guava" tabindex="-1"><a class="header-anchor" href="#_5-使用guava"><span>5. 使用Guava</span></a></h3><p>Guava库为我们提供了方便的方法来进行这种转换。</p><h4 id="_5-1-字节数组到int和long" tabindex="-1"><a class="header-anchor" href="#_5-1-字节数组到int和long"><span>5.1. 字节数组到int和long</span></a></h4><p>在Guava中，com.google.common.primitives包中的Ints类包含fromByteArray()方法。因此，将字节数组转换为int值对我们来说相当容易：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span> value <span class="token operator">=</span> <span class="token class-name">Ints</span><span class="token punctuation">.</span>fromByteArray\`\`\`java
<span class="token keyword">int</span> value <span class="token operator">=</span> <span class="token class-name">Ints</span><span class="token punctuation">.</span><span class="token function">fromByteArray</span><span class="token punctuation">(</span>bytes<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>Ints类还有一个toByteArray()方法，可以用来将int值转换为字节数组：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> bytes <span class="token operator">=</span> <span class="token class-name">Ints</span><span class="token punctuation">.</span><span class="token function">toByteArray</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>并且，Longs类的使用方法与Ints类类似：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">long</span> value <span class="token operator">=</span> <span class="token class-name">Longs</span><span class="token punctuation">.</span><span class="token function">fromByteArray</span><span class="token punctuation">(</span>bytes<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> bytes <span class="token operator">=</span> <span class="token class-name">Longs</span><span class="token punctuation">.</span><span class="token function">toByteArray</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>此外，如果我们查看fromByteArray()和toByteArray()方法的源代码，我们可以发现<strong>这两个方法都使用位移运算符来完成它们的任务</strong>。</p><h4 id="_5-2-字节数组到float和double" tabindex="-1"><a class="header-anchor" href="#_5-2-字节数组到float和double"><span>5.2. 字节数组到float和double</span></a></h4><p>在同一个包中也存在Floats和Doubles类。但是，这两个类都不支持fromByteArray()和toByteArray()方法。</p><p>然而，我们可以利用Float.intBitsToFloat()、Float.floatToIntBits()、Double.longBitsToDouble()和Double.doubleToLongBits()方法来完成字节数组和float或double值之间的转换。为了简洁，我们在这里省略了代码。</p><h3 id="_6-使用commons-lang" tabindex="-1"><a class="header-anchor" href="#_6-使用commons-lang"><span>6. 使用Commons Lang</span></a></h3><p>当我们使用Apache Commons Lang 3时，进行这些转换会有点复杂。因为<strong>Commons Lang库默认使用小端字节数组</strong>。然而，我们上面提到的字节数组都是大端字节序。因此，我们需要将大端字节数组转换为小端字节数组，反之亦然。</p><h4 id="_6-1-字节数组到int和long" tabindex="-1"><a class="header-anchor" href="#_6-1-字节数组到int和long"><span>6.1. 字节数组到int和long</span></a></h4><p>org.apache.commons.lang3包中的Conversion类提供了byteArrayToInt()和intToByteArray()方法。</p><p>现在，让我们将字节数组转换为int值：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> copyBytes <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">copyOf</span><span class="token punctuation">(</span>bytes<span class="token punctuation">,</span> bytes<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">ArrayUtils</span><span class="token punctuation">.</span><span class="token function">reverse</span><span class="token punctuation">(</span>copyBytes<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> value <span class="token operator">=</span> <span class="token class-name">Conversion</span><span class="token punctuation">.</span><span class="token function">byteArrayToInt</span><span class="token punctuation">(</span>copyBytes<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> copyBytes<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>在上述代码中，我们对原始bytes变量进行了复制。这是因为有时我们不想更改原始字节数组的内容。</strong></p><p>然后，让我们将int值转换为字节数组：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> bytes <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token constant">BYTES</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token class-name">Conversion</span><span class="token punctuation">.</span><span class="token function">intToByteArray</span><span class="token punctuation">(</span>value<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> bytes<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> bytes<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">ArrayUtils</span><span class="token punctuation">.</span><span class="token function">reverse</span><span class="token punctuation">(</span>bytes<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Conversion类还定义了byteArrayToLong()和longToByteArray()方法。我们可以使用这两个方法在字节数组和long值之间进行转换。</p><h4 id="_6-2-字节数组到float和double" tabindex="-1"><a class="header-anchor" href="#_6-2-字节数组到float和double"><span>6.2. 字节数组到float和double</span></a></h4><p>然而，Conversion类并没有直接提供相应的方法来转换float或double值。</p><p>再次，我们需要一个中间的int或long值来在字节数组和float或double值之间进行转换。</p><h3 id="_7-结论" tabindex="-1"><a class="header-anchor" href="#_7-结论"><span>7. 结论</span></a></h3><p>在本文中，我们展示了使用纯Java通过位移运算符、ByteBuffer和BigInteger将字节数组转换为数值的各种方法。然后，我们看到了使用Guava和Apache Commons Lang进行相应转换的方法。</p><p>像往常一样，本教程的源代码可以在GitHub上找到。 OK</p>`,98),o=[p];function c(l,i){return s(),a("div",null,o)}const k=n(e,[["render",c],["__file","2024-07-25-Convert a Byte Array to a Numeric Representation in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-25/2024-07-25-Convert%20a%20Byte%20Array%20to%20a%20Numeric%20Representation%20in%20Java.html","title":"Java中将字节数组转换为数值表示","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Byte Array"],"tag":["Java","Byte Array","Numeric Conversion"],"head":[["meta",{"name":"keywords","content":"Java, Byte Array, Numeric Conversion"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-25/2024-07-25-Convert%20a%20Byte%20Array%20to%20a%20Numeric%20Representation%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中将字节数组转换为数值表示"}],["meta",{"property":"og:description","content":"Java中将字节数组转换为数值表示 在本教程中，我们将探讨将字节数组转换为数值（int、long、float、double）及其反向转换的不同方法。 字节是计算机存储和处理信息的基本单位。Java语言中定义的原始类型是同时操作多个字节的便捷方式。因此，字节数组与原始类型之间存在固有的转换关系。 由于short和char类型仅由两个字节组成，它们不需要太..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-25T08:54:17.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Byte Array"}],["meta",{"property":"article:tag","content":"Numeric Conversion"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-25T08:54:17.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中将字节数组转换为数值表示\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-25T08:54:17.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中将字节数组转换为数值表示 在本教程中，我们将探讨将字节数组转换为数值（int、long、float、double）及其反向转换的不同方法。 字节是计算机存储和处理信息的基本单位。Java语言中定义的原始类型是同时操作多个字节的便捷方式。因此，字节数组与原始类型之间存在固有的转换关系。 由于short和char类型仅由两个字节组成，它们不需要太..."},"headers":[{"level":3,"title":"2. 使用位移运算符","slug":"_2-使用位移运算符","link":"#_2-使用位移运算符","children":[]},{"level":3,"title":"3. 使用ByteBuffer","slug":"_3-使用bytebuffer","link":"#_3-使用bytebuffer","children":[]},{"level":3,"title":"4. 使用BigInteger","slug":"_4-使用biginteger","link":"#_4-使用biginteger","children":[]},{"level":3,"title":"5. 使用Guava","slug":"_5-使用guava","link":"#_5-使用guava","children":[]},{"level":3,"title":"6. 使用Commons Lang","slug":"_6-使用commons-lang","link":"#_6-使用commons-lang","children":[]},{"level":3,"title":"7. 结论","slug":"_7-结论","link":"#_7-结论","children":[]}],"git":{"createdTime":1721897657000,"updatedTime":1721897657000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":7.89,"words":2368},"filePathRelative":"posts/baeldung/2024-07-25/2024-07-25-Convert a Byte Array to a Numeric Representation in Java.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在本教程中，我们将探讨将字节数组转换为数值（int、long、float、double）及其反向转换的不同方法。</p>\\n<p>字节是计算机存储和处理信息的基本单位。Java语言中定义的原始类型是同时操作多个字节的便捷方式。因此，字节数组与原始类型之间存在固有的转换关系。</p>\\n<p>由于short和char类型仅由两个字节组成，它们不需要太多关注。因此，我们将重点放在字节数组与int、long、float和double类型的转换上。</p>\\n<h3>2. 使用位移运算符</h3>\\n<p>将字节数组转换为数值的最直接方法是使用位移运算符。</p>\\n<h4>2.1. 字节数组到int和long</h4>","autoDesc":true}');export{k as comp,d as data};
