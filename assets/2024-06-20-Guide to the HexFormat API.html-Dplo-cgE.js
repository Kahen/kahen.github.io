import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as e}from"./app-BMOUrRO4.js";const t={},o=e(`<h1 id="kotlin中hexformat-api指南" tabindex="-1"><a class="header-anchor" href="#kotlin中hexformat-api指南"><span>Kotlin中HexFormat API指南</span></a></h1><p>十六进制表示因其人类可读性和紧凑性而被广泛使用，这使得它成为在Kotlin中表示二进制数据的一种高效且直接的方式。因此，Kotlin引入了HexFormat API作为一个方便的数据格式化为十六进制字符串形式并解析回原始数据的包。</p><p>在本教程中，<strong>我们将探索HexFormat API并解决一些涉及十六进制表示的常见用例</strong>。</p><h3 id="_2-1-hexformat类" tabindex="-1"><a class="header-anchor" href="#_2-1-hexformat类"><span>2.1. HexFormat类</span></a></h3><p>在Kotlin的标准库中，<strong>_HexFormat_类位于_kotlin.text_包中，它表示十六进制格式化的总体配置</strong>。让我们快速看一下它的定义：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token annotation builtin">@ExperimentalStdlibApi</span>
<span class="token annotation builtin">@SinceKotlin</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;1.9&quot;</span></span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> HexFormat <span class="token keyword">internal</span> <span class="token keyword">constructor</span><span class="token punctuation">(</span>
    <span class="token keyword">val</span> upperCase<span class="token operator">:</span> Boolean<span class="token punctuation">,</span>
    <span class="token keyword">val</span> bytes<span class="token operator">:</span> BytesHexFormat<span class="token punctuation">,</span>
    <span class="token keyword">val</span> number<span class="token operator">:</span> NumberHexFormat
<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 其他方法和属性</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们必须注意，<em>@ExperimentalStdlibApi_注解将其标记为实验性功能，因此我们必须**在调用方法或类中添加</em>@OptIn(ExperimentalStdlibApi::class)_注解**。</p><p>此外，它包含三个属性，即_upperCase_、<em>bytes_和_number</em>，用于指定不同类型的十六进制表示的不同格式化选项。而_upperCase_适用于两种类型，_bytes_和_number_属性分别特定于各自的类型。</p><h3 id="_2-2-numberhexformat和byteshexformat" tabindex="-1"><a class="header-anchor" href="#_2-2-numberhexformat和byteshexformat"><span>2.2. NumberHexFormat和BytesHexFormat</span></a></h3><p>在HexFormat API中，<strong>_NumberHexFormat_类定义了数值的格式化选项</strong>。让我们更详细地查看_NumberHexFormat_类：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">public</span> <span class="token keyword">class</span> NumberHexFormat <span class="token keyword">internal</span> <span class="token keyword">constructor</span><span class="token punctuation">(</span>
    <span class="token keyword">val</span> prefix<span class="token operator">:</span> String<span class="token punctuation">,</span>
    <span class="token keyword">val</span> suffix<span class="token operator">:</span> String<span class="token punctuation">,</span>
    <span class="token keyword">val</span> removeLeadingZeros<span class="token operator">:</span> Boolean
<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 其他方法和属性</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以在格式化数值时指定_prefix_和_suffix_字符串。此外，我们可以使用_removeLeadingZeros_选项来修剪前导零。</p><p>进一步地，让我们看看**_BytesHexFormat_类，在定义_ByteArray_值的格式化选项中起着至关重要的作用**：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">public</span> <span class="token keyword">class</span> BytesHexFormat <span class="token keyword">internal</span> <span class="token keyword">constructor</span><span class="token punctuation">(</span>
    <span class="token keyword">val</span> bytesPerLine<span class="token operator">:</span> Int<span class="token punctuation">,</span>
    <span class="token keyword">val</span> bytesPerGroup<span class="token operator">:</span> Int<span class="token punctuation">,</span>
    <span class="token keyword">val</span> groupSeparator<span class="token operator">:</span> String<span class="token punctuation">,</span>
    <span class="token keyword">val</span> byteSeparator<span class="token operator">:</span> String<span class="token punctuation">,</span>
    <span class="token keyword">val</span> bytePrefix<span class="token operator">:</span> String<span class="token punctuation">,</span>
    <span class="token keyword">val</span> byteSuffix<span class="token operator">:</span> String
<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 其他方法和属性</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>它提供了几个选项，如_bytesPerLine_、<em>bytesPerGroup</em>、_groupSeparator_等，用于自定义十六进制格式化并控制其布局。</p><p>现在我们已经讨论了基础知识，我们准备深入探索HexFormat API的一些常见用例。</p><h3 id="_3-将数字格式化为十六进制值" tabindex="-1"><a class="header-anchor" href="#_3-将数字格式化为十六进制值"><span>3. 将数字格式化为十六进制值</span></a></h3><p>在这一部分，我们将学习如何使用HexFormat API将不同类型的数字格式化为十六进制字符串。</p><h3 id="_3-1-默认hexformat" tabindex="-1"><a class="header-anchor" href="#_3-1-默认hexformat"><span>3.1. 默认HexFormat</span></a></h3><p>让我们首先初始化_number_变量为_Byte_类型：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> number<span class="token operator">:</span> Byte <span class="token operator">=</span> <span class="token number">63</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>现在，我们可以<strong>使用_toHexString()_扩展函数将数值格式化为十六进制字符串</strong>：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;3f&quot;</span></span><span class="token punctuation">,</span> number<span class="token punctuation">.</span><span class="token function">toHexString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在这种情况下，我们没有显式使用_HexFormat_的实例，因此Kotlin在内部应用了默认实例进行格式化。</p><p>或者，我们可以显式将_HexFormat.Default_实例作为参数传递给_toHexString()_扩展函数：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;3f&quot;</span></span><span class="token punctuation">,</span> number<span class="token punctuation">.</span><span class="token function">toHexString</span><span class="token punctuation">(</span>HexFormat<span class="token punctuation">.</span>Default<span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>正如预期的那样，我们得到了相同的输出。</p><p>最后，重要的是要注意，我们可以应用_toHexString()<em>扩展函数来格式化其他数值类型，如_Short</em>、<em>Int_和_Long</em>。</p><h3 id="_3-2-添加前缀" tabindex="-1"><a class="header-anchor" href="#_3-2-添加前缀"><span>3.2. 添加前缀</span></a></h3><p>对于一些用例，例如URL编码，我们在字符的ASCII值的十六进制表示之前添加一个前缀。</p><p>让我们创建_prefixNumberFormat_作为_HexFormat_类的实例：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> prefixNumberFormat <span class="token operator">=</span> HexFormat <span class="token punctuation">{</span>
    number<span class="token punctuation">.</span>prefix <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot;%&quot;</span></span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们<strong>使用%字符初始化了_number.prefix_属性</strong>。</p><p>现在，我们可以调用_toHexString()_扩展函数将_number_变量格式化为其十六进制表示：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;%3f&quot;</span></span><span class="token punctuation">,</span> number<span class="token punctuation">.</span><span class="token function">toHexString</span><span class="token punctuation">(</span>prefixNumberFormat<span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们可以注意到%字符被添加为十六进制字符串的前缀。</p><h3 id="_3-3-移除前导零" tabindex="-1"><a class="header-anchor" href="#_3-3-移除前导零"><span>3.3. 移除前导零</span></a></h3><p>首先，让我们将_number_变量初始化为_Long_类型：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> number<span class="token operator">:</span> Long <span class="token operator">=</span> <span class="token number">63</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>现在，让我们使用_toHexString()_扩展函数将其转换为十六进制表示：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;000000000000003f&quot;</span></span><span class="token punctuation">,</span> number<span class="token punctuation">.</span><span class="token function">toHexString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们可以注意到<strong>因为_Long_为存储预留了8个字节，而值63只需要2个字节的十六进制字符串，所以在开头有14个零</strong>。</p><p>接下来，让我们创建_prefixRemoveLeadingZerosNumberFormat_实例的_HexFormat_类：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> prefixRemoveLeadingZerosNumberFormat <span class="token operator">=</span> HexFormat <span class="token punctuation">{</span>
    number <span class="token punctuation">{</span>
        removeLeadingZeros <span class="token operator">=</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们<strong>将_removeLeadingZeros_属性设置为_true_</strong>。</p><p>最后，让我们使用_prefixRemoveLeadingZerosNumberFormat_ HexFormat表示_number_的十六进制值：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;3f&quot;</span></span><span class="token punctuation">,</span> number<span class="token punctuation">.</span><span class="token function">toHexString</span><span class="token punctuation">(</span>prefixRemoveLeadingZerosNumberFormat<span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>太好了！输出中不再有前导零。</p><h3 id="_4-将十六进制值解析为数字" tabindex="-1"><a class="header-anchor" href="#_4-将十六进制值解析为数字"><span>4. 将十六进制值解析为数字</span></a></h3><p>在这一部分，让我们学习如何<strong>使用_hexTo<code>&lt;Type&gt;</code>()_扩展函数将十六进制值解析为数值</strong>，例如_hexToByte()_、_hexToShort()_等。</p><p>让我们使用_hexToByte()_扩展函数将“<em>3f</em>”十六进制字符串转换为_Byte_的数值：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">63</span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;3f&quot;</span></span><span class="token punctuation">.</span><span class="token function">hexToByte</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们得到了正确的结果。</p><p>然而，如果我们尝试转换一个带有额外前缀的十六进制字符串，例如“<em>%3f</em>”，那么我们会得到_IllegalArgumentException_：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code>assertThrows\`<span class="token operator">&lt;</span>IllegalArgumentException<span class="token operator">&gt;</span>\` <span class="token punctuation">{</span> <span class="token string-literal singleline"><span class="token string">&quot;%3f&quot;</span></span><span class="token punctuation">.</span><span class="token function">hexToByte</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们注意到这种行为是因为，在没有_HexFormat_实例的情况下，_hexToByte()<em>使用_HexFormat.Default</em>。</p><p>最后，让我们使用_prefixNumberFormat_实例的_HexFormat_与_hexToByte()<em>将“</em>%3f_”十六进制字符串转换为_Byte_值：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">63</span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;%3f&quot;</span></span><span class="token punctuation">.</span><span class="token function">hexToByte</span><span class="token punctuation">(</span>prefixNumberFormat<span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>完美！这次我们做对了。</p><h3 id="_5-将-bytearray-格式化为十六进制值" tabindex="-1"><a class="header-anchor" href="#_5-将-bytearray-格式化为十六进制值"><span>5. 将_ByteArray_格式化为十六进制值</span></a></h3><p>在这一部分，让我们探索一个有趣的用例，即将MAC地址的字节表示格式化为其十六进制表示。</p><p>让我们创建一个名为_macAddressFormat_的_HexFormat_类实例：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> macAddressFormat <span class="token operator">=</span> HexFormat <span class="token punctuation">{</span>
    upperCase <span class="token operator">=</span> <span class="token boolean">true</span>
    bytes<span class="token punctuation">.</span>bytesPerGroup <span class="token operator">=</span> <span class="token number">1</span>
    bytes<span class="token punctuation">.</span>groupSeparator <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot;:&quot;</span></span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们<strong>将_bytes.bytesPerGroup_和_bytes.groupSeparator_属性设置为1和:<em>。此外，我们还将_upperCase_属性设置为_true</em></strong>。</p><p>现在，让我们使用_byteArrayOf()<em>工厂函数创建_macAddressBytes</em> <em>ByteArray</em>：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> macAddressBytes <span class="token operator">=</span> <span class="token function">byteArrayOf</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">66</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">64</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">117</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">14</span><span class="token punctuation">,</span> <span class="token number">94</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>有趣的是，一些值是负数，因为带符号字节的范围是_-128_到_127_。</p><p>进一步地，让我们<strong>使用_toHexString()_扩展函数将_macAddressBytes_转换为其十六进制表示</strong>：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> macAddressHexValue <span class="token operator">=</span> macAddressBytes<span class="token punctuation">.</span><span class="token function">toHexString</span><span class="token punctuation">(</span>macAddressFormat<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>最后，我们必须测试我们的方法：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;02:42:C0:8B:F2:5E&quot;</span></span><span class="token punctuation">,</span> macAddressHexValue<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>太好了！MAC地址格式正确。</p><h3 id="_6-将十六进制值解析为-bytearray" tabindex="-1"><a class="header-anchor" href="#_6-将十六进制值解析为-bytearray"><span>6. 将十六进制值解析为_ByteArray_</span></a></h3><p>我们已经学会了如何将MAC地址字节表示为其十六进制值。现在，让我们解决将MAC地址的十六进制字符串解析为_ByteArray_的用例。</p><p>首先，让我们用一个示例MAC地址十六进制字符串初始化_macAddressHexValue_：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> macAddressHexValue <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot;02:42:C0:8B:F2:5E&quot;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>接下来，让我们<strong>使用_hexToByteArray()_扩展函数和_macAddressFormat_实例的_HexFormat_类</strong>：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> macAddressBytes <span class="token operator">=</span> macAddressHexValue<span class="token punctuation">.</span><span class="token function">hexToByteArray</span><span class="token punctuation">(</span>macAddressFormat<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>由于十六进制字符串具有特定格式，我们传递了_macAddressFormat_。否则，它将抛出_NumberFormatException_异常。</p><p>最后，让我们确认我们已经以正确的顺序获得了所有的字节：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token function">assertArrayEquals</span><span class="token punctuation">(</span><span class="token function">byteArrayOf</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">666</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">64</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">117</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">14</span><span class="token punctuation">,</span> <span class="token number">94</span><span class="token punctuation">)</span><span class="token punctuation">,</span> macAddressBytes<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>太棒了！看起来我们这次做得很好。</p><h3 id="_7-结论" tabindex="-1"><a class="header-anchor" href="#_7-结论"><span>7. 结论</span></a></h3><p>在本文中，我们学习了Kotlin中的HexFormat API。进一步地，<strong>我们探索了_toHexString()_和_hexTo<code>&lt;Type&gt;</code>()_扩展函数，用于将数据格式化为十六进制字符串并解析回原始数据</strong>。</p><p>如常，本文的代码可以在GitHub上找到。</p><p>OK</p>`,86),p=[o];function l(i,r){return s(),a("div",null,p)}const d=n(t,[["render",l],["__file","2024-06-20-Guide to the HexFormat API.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/Archive/2024-06-20-Guide%20to%20the%20HexFormat%20API.html","title":"Kotlin中HexFormat API指南","lang":"zh-CN","frontmatter":{"date":"2024-06-20T00:00:00.000Z","category":["Kotlin","HexFormat API"],"tag":["Hexadecimal","String","Parse"],"head":[["meta",{"name":"keywords","content":"Kotlin, HexFormat API, Hexadecimal, String, Parse"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/2024-06-20-Guide%20to%20the%20HexFormat%20API.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Kotlin中HexFormat API指南"}],["meta",{"property":"og:description","content":"Kotlin中HexFormat API指南 十六进制表示因其人类可读性和紧凑性而被广泛使用，这使得它成为在Kotlin中表示二进制数据的一种高效且直接的方式。因此，Kotlin引入了HexFormat API作为一个方便的数据格式化为十六进制字符串形式并解析回原始数据的包。 在本教程中，我们将探索HexFormat API并解决一些涉及十六进制表示的..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Hexadecimal"}],["meta",{"property":"article:tag","content":"String"}],["meta",{"property":"article:tag","content":"Parse"}],["meta",{"property":"article:published_time","content":"2024-06-20T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Kotlin中HexFormat API指南\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-20T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Kotlin中HexFormat API指南 十六进制表示因其人类可读性和紧凑性而被广泛使用，这使得它成为在Kotlin中表示二进制数据的一种高效且直接的方式。因此，Kotlin引入了HexFormat API作为一个方便的数据格式化为十六进制字符串形式并解析回原始数据的包。 在本教程中，我们将探索HexFormat API并解决一些涉及十六进制表示的..."},"headers":[{"level":3,"title":"2.1. HexFormat类","slug":"_2-1-hexformat类","link":"#_2-1-hexformat类","children":[]},{"level":3,"title":"2.2. NumberHexFormat和BytesHexFormat","slug":"_2-2-numberhexformat和byteshexformat","link":"#_2-2-numberhexformat和byteshexformat","children":[]},{"level":3,"title":"3. 将数字格式化为十六进制值","slug":"_3-将数字格式化为十六进制值","link":"#_3-将数字格式化为十六进制值","children":[]},{"level":3,"title":"3.1. 默认HexFormat","slug":"_3-1-默认hexformat","link":"#_3-1-默认hexformat","children":[]},{"level":3,"title":"3.2. 添加前缀","slug":"_3-2-添加前缀","link":"#_3-2-添加前缀","children":[]},{"level":3,"title":"3.3. 移除前导零","slug":"_3-3-移除前导零","link":"#_3-3-移除前导零","children":[]},{"level":3,"title":"4. 将十六进制值解析为数字","slug":"_4-将十六进制值解析为数字","link":"#_4-将十六进制值解析为数字","children":[]},{"level":3,"title":"5. 将_ByteArray_格式化为十六进制值","slug":"_5-将-bytearray-格式化为十六进制值","link":"#_5-将-bytearray-格式化为十六进制值","children":[]},{"level":3,"title":"6. 将十六进制值解析为_ByteArray_","slug":"_6-将十六进制值解析为-bytearray","link":"#_6-将十六进制值解析为-bytearray","children":[]},{"level":3,"title":"7. 结论","slug":"_7-结论","link":"#_7-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":5.85,"words":1754},"filePathRelative":"posts/baeldung/Archive/2024-06-20-Guide to the HexFormat API.md","localizedDate":"2024年6月20日","excerpt":"\\n<p>十六进制表示因其人类可读性和紧凑性而被广泛使用，这使得它成为在Kotlin中表示二进制数据的一种高效且直接的方式。因此，Kotlin引入了HexFormat API作为一个方便的数据格式化为十六进制字符串形式并解析回原始数据的包。</p>\\n<p>在本教程中，<strong>我们将探索HexFormat API并解决一些涉及十六进制表示的常见用例</strong>。</p>\\n<h3>2.1. HexFormat类</h3>\\n<p>在Kotlin的标准库中，<strong>_HexFormat_类位于_kotlin.text_包中，它表示十六进制格式化的总体配置</strong>。让我们快速看一下它的定义：</p>","autoDesc":true}');export{d as comp,k as data};
