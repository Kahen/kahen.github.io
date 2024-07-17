import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as e}from"./app-yRPSFQJx.js";const t={},p=e(`<h1 id="java中整数的位级表示" tabindex="-1"><a class="header-anchor" href="#java中整数的位级表示"><span>Java中整数的位级表示</span></a></h1><p>Java在内存中以二进制形式存储数字。了解整数在位级别上的表示可以帮助我们进行某些操作。</p><p>在本教程中，我们将查看Java中数字表示的一些具体细节，并了解Java的位运算是如何工作的。</p><h2 id="_2-java中的位运算" tabindex="-1"><a class="header-anchor" href="#_2-java中的位运算"><span>2. Java中的位运算</span></a></h2><p>在Java中，整数使用32位表示，长整数使用64位。需要注意的是，Java使用2的补码表示负数。在这种情况下，如果第一位是1，则假定该数字为负数。负数是通过取数字，翻转所有的1和0，然后加1来计算的。</p><p>例如，在8位中，数字6是_0b00000110_。将其转换为-6，我们将其反转为_0b11111001_，然后加1，变成_0b11111010_。</p><p>此外，<strong>位运算为几个用例奠定了很好的基础</strong>，因为它们通常比完整的数学或逻辑表达式对CPU来说更快。</p><h3 id="_2-1-and运算符" tabindex="-1"><a class="header-anchor" href="#_2-1-and运算符"><span>2.1. AND运算符 (<em>&amp;</em>)</span></a></h3><p>AND运算符(&amp;)在两个32位整数之间执行位与操作：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span> result <span class="token operator">=</span> <span class="token number">0b1100</span> <span class="token operator">&amp;</span> <span class="token number">0b0111</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">0b0100</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>此操作独立评估每个位的位置。如果操作数中相应位都是1，则结果在该位置将有1；否则为0。在提供的示例中：</p><ul><li>12的二进制表示(0b1100)</li><li>7的二进制表示(0b0111)</li><li>位与运算得到0b0100</li><li>结果为十进制值4</li></ul><h3 id="_2-2-or运算符" tabindex="-1"><a class="header-anchor" href="#_2-2-or运算符"><span>2.2. OR运算符 (<em>|</em>)</span></a></h3><p>OR运算符(|)对两个数字的同一位执行位或操作：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span> result <span class="token operator">=</span> <span class="token number">0b1100</span> <span class="token operator">|</span> <span class="token number">0b0111</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">0b1111</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>与AND运算符类似，OR运算符比较每个位位置。如果操作数中至少有一个相应位是1，则结果在该位置将有1。在这个例子中，结果为0b1111，等同于十进制值15。</p><h3 id="_2-3-xor运算符" tabindex="-1"><a class="header-anchor" href="#_2-3-xor运算符"><span>2.3. XOR运算符 (<em>^</em>)</span></a></h3><p>我们可以使用XOR运算符(^)进行位异或操作，其中对操作数中的相应位进行操作：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span> result <span class="token operator">=</span> <span class="token number">0b1100</span> <span class="token operator">^</span> <span class="token number">0b0111</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">0b1011</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>此操作将结果位设置为1，如果操作数中的相应位不同。在提供的示例中，结果为0b1011，对应于十进制值11。</p><h3 id="_2-4-位非运算符" tabindex="-1"><a class="header-anchor" href="#_2-4-位非运算符"><span>2.4. 位非运算符 (<em>~</em>)</span></a></h3><p>位非运算符(~)反转其操作数的位，将1变成0，反之亦然：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span> result <span class="token operator">=</span> <span class="token operator">~</span><span class="token number">0b0101</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">0b0110</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>每个位都被反转，将0变成1，反之亦然。此外，结果为_-0b0110_，使用二进制补码表示法，等同于十进制值_-6_。</p><h3 id="_2-5-左移-和-右移" tabindex="-1"><a class="header-anchor" href="#_2-5-左移-和-右移"><span>2.5. 左移 (<em><code>&lt;&lt;_) 和 右移 (_&gt;</code>&gt;</em>)</span></a></h3><p>左移(\`&lt;&lt;)运算符将一个数字的位向左移动指定数量的位置：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span> result <span class="token operator">=</span> <span class="token number">0b0101</span> <span class="token operator">&lt;&lt;</span> <span class="token number">2</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">0b10100</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们对变量_a_中存储的值执行位左移操作。此外，此操作将二进制表示向左移动两个位置，用零填充右侧空出的位置。</p><p>类似地，右移(&gt;\`&gt;)运算符将位向右移动：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span> result <span class="token operator">=</span> <span class="token number">0b0101</span> <span class="token operator">&gt;&gt;</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">0b10</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>相反，我们通过将变量_a_的二进制表示向右移动一个位置来执行位右移操作。对于有符号整数，左侧空出的位置根据符号位填充。因此，正数保持为正，负数保持为负。</p><h2 id="_3-使用位运算修改颜色的实际示例" tabindex="-1"><a class="header-anchor" href="#_3-使用位运算修改颜色的实际示例"><span>3. 使用位运算修改颜色的实际示例</span></a></h2><p>在这个实际示例中，我们将探讨如何应用位运算来修改RGB值的颜色。</p><h3 id="_3-1-原始颜色和掩码" tabindex="-1"><a class="header-anchor" href="#_3-1-原始颜色和掩码"><span>3.1. 原始颜色和掩码</span></a></h3><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span> originalColor <span class="token operator">=</span> <span class="token number">0xFF336699</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> alphaMask <span class="token operator">=</span> <span class="token number">0xFF000000</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> redMask <span class="token operator">=</span> <span class="token number">0x00FF0000</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> greenMask <span class="token operator">=</span> <span class="token number">0x0000FF00</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> blueMask <span class="token operator">=</span> <span class="token number">0x000000FF</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里，我们将原始颜色初始化为_0xFF336699_，一个RGB颜色的十六进制表示。此外，定义了四个掩码(<em>alphaMask</em>, <em>redMask</em>, <em>greenMask</em>, 和 <em>blueMask</em>)，以根据它们的位置提取单独的颜色组件。</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span> alpha <span class="token operator">=</span> <span class="token punctuation">(</span>originalColor <span class="token operator">&amp;</span> alphaMask<span class="token punctuation">)</span> <span class="token operator">&gt;&gt;&gt;</span> <span class="token number">24</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> red <span class="token operator">=</span> <span class="token punctuation">(</span>originalColor <span class="token operator">&amp;</span> redMask<span class="token punctuation">)</span> <span class="token operator">&gt;&gt;&gt;</span> <span class="token number">16</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> green <span class="token operator">=</span> <span class="token punctuation">(</span>originalColor <span class="token operator">&amp;</span> greenMask<span class="token punctuation">)</span> <span class="token operator">&gt;&gt;&gt;</span> <span class="token number">8</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> blue <span class="token operator">=</span> originalColor <span class="token operator">&amp;</span> blueMask<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们使用位与操作和它们各自的掩码提取_alpha_, <em>red</em>, <em>green</em>, 和 <em>blue</em> 组件。然后，我们应用右移(&gt;&gt;&gt;)将提取的位对齐到最低有效位(LSB)位置。</p><ul><li>alpha组件，通过(<em>originalColor</em> &amp; <em>alphaMask</em>) &gt;&gt;&gt; 24提取，结果是二进制的1111 1111</li><li>red组件，通过(<em>originalColor</em> &amp; <em>redMask</em>) &gt;&gt;&gt; 16提取，是二进制的0011 0011</li><li>green组件，通过(<em>originalColor</em> &amp; <em>greenMask</em>) &gt;&gt;&gt; 8提取，是二进制的0110 1001</li><li>blue组件，通过_originalColor_ &amp; _blueMask_提取，是二进制的1001 1001</li></ul><h3 id="_3-3-修改颜色组件" tabindex="-1"><a class="header-anchor" href="#_3-3-修改颜色组件"><span>3.3. 修改颜色组件</span></a></h3><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>red <span class="token operator">=</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">min</span><span class="token punctuation">(</span><span class="token number">255</span><span class="token punctuation">,</span> red <span class="token operator">+</span> <span class="token number">50</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
green <span class="token operator">=</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">min</span><span class="token punctuation">(</span><span class="token number">255</span><span class="token punctuation">,</span> green <span class="token operator">+</span> <span class="token number">30</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们修改_red_和_green_组件，模拟颜色调整。此外，我们在进行修改时确保值不超过最大值255。</p><ul><li>使用red = _Math.min(255, red + 50)_修改red组件，结果是二进制的0100 0010</li><li>使用green = _Math.min(255, green + 30)_修改green组件，结果是二进制的0111 1111</li></ul><h3 id="_3-4-重新创建修改后的颜色" tabindex="-1"><a class="header-anchor" href="#_3-4-重新创建修改后的颜色"><span>3.4. 重新创建修改后的颜色</span></a></h3><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span> modifiedColor <span class="token operator">=</span> <span class="token punctuation">(</span>alpha <span class="token operator">&lt;&lt;</span> <span class="token number">24</span><span class="token punctuation">)</span> <span class="token operator">|</span> <span class="token punctuation">(</span>red <span class="token operator">&lt;&lt;</span> <span class="token number">16</span><span class="token punctuation">)</span> <span class="token operator">|</span> <span class="token punctuation">(</span>green <span class="token operator">&lt;&lt;</span> <span class="token number">8</span><span class="token punctuation">)</span> <span class="token operator">|</span> blue<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>此外，我们使用位或(|)和左移(&lt;&lt;)操作结合修改后的alpha, red, green, 和 blue组件重新创建修改后的颜色。</p><p>重建的颜色计算为_modifiedColor = (alpha &lt;&lt; 24) | (red &lt;&lt; 16) | (green &lt;&lt; 8) | blue_，结果是二进制的1111 1111 0010 0010 1101 0110 1001。</p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们查看了Java如何在内存中表示数字。我们查看了二进制表示以及如何使用它来理解位运算。</p><p>最后，我们查看了一个实际示例，展示了掩码和位移动在现实世界中的应用。</p><p>如常，本文的完整代码示例可以在GitHub上找到。</p>`,51),l=[p];function o(i,r){return s(),n("div",null,l)}const d=a(t,[["render",o],["__file","2024-06-20-Representation of Integers at a Bit Level in Java.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/Archive/2024-06-20-Representation%20of%20Integers%20at%20a%20Bit%20Level%20in%20Java.html","title":"Java中整数的位级表示","lang":"zh-CN","frontmatter":{"date":"2024-06-21T00:00:00.000Z","category":["Java","编程"],"tag":["位运算","Java"],"head":[["meta",{"name":"keywords","content":"Java, 位运算, 整数表示"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/2024-06-20-Representation%20of%20Integers%20at%20a%20Bit%20Level%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中整数的位级表示"}],["meta",{"property":"og:description","content":"Java中整数的位级表示 Java在内存中以二进制形式存储数字。了解整数在位级别上的表示可以帮助我们进行某些操作。 在本教程中，我们将查看Java中数字表示的一些具体细节，并了解Java的位运算是如何工作的。 2. Java中的位运算 在Java中，整数使用32位表示，长整数使用64位。需要注意的是，Java使用2的补码表示负数。在这种情况下，如果第一..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"位运算"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:published_time","content":"2024-06-21T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中整数的位级表示\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-21T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中整数的位级表示 Java在内存中以二进制形式存储数字。了解整数在位级别上的表示可以帮助我们进行某些操作。 在本教程中，我们将查看Java中数字表示的一些具体细节，并了解Java的位运算是如何工作的。 2. Java中的位运算 在Java中，整数使用32位表示，长整数使用64位。需要注意的是，Java使用2的补码表示负数。在这种情况下，如果第一..."},"headers":[{"level":2,"title":"2. Java中的位运算","slug":"_2-java中的位运算","link":"#_2-java中的位运算","children":[{"level":3,"title":"2.1. AND运算符 (&)","slug":"_2-1-and运算符","link":"#_2-1-and运算符","children":[]},{"level":3,"title":"2.2. OR运算符 (|)","slug":"_2-2-or运算符","link":"#_2-2-or运算符","children":[]},{"level":3,"title":"2.3. XOR运算符 (^)","slug":"_2-3-xor运算符","link":"#_2-3-xor运算符","children":[]},{"level":3,"title":"2.4. 位非运算符 (~)","slug":"_2-4-位非运算符","link":"#_2-4-位非运算符","children":[]},{"level":3,"title":"2.5. 左移 (<<_) 和 右移 (_>>)","slug":"_2-5-左移-和-右移","link":"#_2-5-左移-和-右移","children":[]}]},{"level":2,"title":"3. 使用位运算修改颜色的实际示例","slug":"_3-使用位运算修改颜色的实际示例","link":"#_3-使用位运算修改颜色的实际示例","children":[{"level":3,"title":"3.1. 原始颜色和掩码","slug":"_3-1-原始颜色和掩码","link":"#_3-1-原始颜色和掩码","children":[]},{"level":3,"title":"3.3. 修改颜色组件","slug":"_3-3-修改颜色组件","link":"#_3-3-修改颜色组件","children":[]},{"level":3,"title":"3.4. 重新创建修改后的颜色","slug":"_3-4-重新创建修改后的颜色","link":"#_3-4-重新创建修改后的颜色","children":[]}]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":4.58,"words":1373},"filePathRelative":"posts/baeldung/Archive/2024-06-20-Representation of Integers at a Bit Level in Java.md","localizedDate":"2024年6月21日","excerpt":"\\n<p>Java在内存中以二进制形式存储数字。了解整数在位级别上的表示可以帮助我们进行某些操作。</p>\\n<p>在本教程中，我们将查看Java中数字表示的一些具体细节，并了解Java的位运算是如何工作的。</p>\\n<h2>2. Java中的位运算</h2>\\n<p>在Java中，整数使用32位表示，长整数使用64位。需要注意的是，Java使用2的补码表示负数。在这种情况下，如果第一位是1，则假定该数字为负数。负数是通过取数字，翻转所有的1和0，然后加1来计算的。</p>\\n<p>例如，在8位中，数字6是_0b00000110_。将其转换为-6，我们将其反转为_0b11111001_，然后加1，变成_0b11111010_。</p>","autoDesc":true}');export{d as comp,k as data};
