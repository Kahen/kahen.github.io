import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-c243dxVF.js";const p={},e=t('<h1 id="java中合并两个或更多字节数组" tabindex="-1"><a class="header-anchor" href="#java中合并两个或更多字节数组"><span>Java中合并两个或更多字节数组</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>作为Java开发者，我们可能会遇到需要合并两个或更多字节数组的情况。在本教程中，<strong>我们将探索几种合并两个或更多字节数组的方法</strong>。</p><p>我们将从Java的基本类和方法开始。然后，我们将查看一些外部库，如Guava和Apache Commons Collections，用于合并字节数组。</p><h2 id="_2-使用纯java" tabindex="-1"><a class="header-anchor" href="#_2-使用纯java"><span>2. 使用纯Java</span></a></h2><p>在以下所有示例中，我们将考虑以下两个字节数组：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> first <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token number">69</span><span class="token punctuation">,</span> <span class="token number">121</span><span class="token punctuation">,</span> <span class="token number">101</span><span class="token punctuation">,</span> <span class="token number">45</span><span class="token punctuation">,</span> <span class="token number">62</span><span class="token punctuation">,</span> <span class="token number">118</span><span class="token punctuation">,</span> <span class="token number">114</span><span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> second <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token number">58</span><span class="token punctuation">,</span> <span class="token number">120</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">,</span> <span class="token number">46</span><span class="token punctuation">,</span> <span class="token number">64</span><span class="token punctuation">,</span> <span class="token number">114</span><span class="token punctuation">,</span> <span class="token number">103</span><span class="token punctuation">,</span> <span class="token number">117</span><span class="token punctuation">}</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>为了存储这两个合并后的数组，我们需要一个新的结果数组：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> combined <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">byte</span><span class="token punctuation">[</span>first<span class="token punctuation">.</span>length <span class="token operator">+</span> second<span class="token punctuation">.</span>length<span class="token punctuation">]</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>预期的结果数组将是以下内容：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> expectedArray <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token number">69</span><span class="token punctuation">,</span> <span class="token number">121</span><span class="token punctuation">,</span> <span class="token number">101</span><span class="token punctuation">,</span> <span class="token number">45</span><span class="token punctuation">,</span> <span class="token number">62</span><span class="token punctuation">,</span> <span class="token number">118</span><span class="token punctuation">,</span> <span class="token number">114</span><span class="token punctuation">,</span> <span class="token number">58</span><span class="token punctuation">,</span> <span class="token number">120</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">,</span> <span class="token number">46</span><span class="token punctuation">,</span> <span class="token number">64</span><span class="token punctuation">,</span> <span class="token number">114</span><span class="token punctuation">,</span> <span class="token number">103</span><span class="token punctuation">,</span> <span class="token number">117</span><span class="token punctuation">}</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在一些示例中，我们将查看允许我们合并多个数组的方法。我们将考虑一个额外的字节数组进行合并：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> third <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token number">55</span><span class="token punctuation">,</span> <span class="token number">66</span><span class="token punctuation">,</span> <span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">111</span><span class="token punctuation">,</span> <span class="token number">25</span><span class="token punctuation">,</span> <span class="token number">84</span><span class="token punctuation">}</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在这种情况下，三个数组合并后的预期结果数组将是以下内容：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> expectedArray <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token number">69</span><span class="token punctuation">,</span> <span class="token number">121</span><span class="token punctuation">,</span> <span class="token number">101</span><span class="token punctuation">,</span> <span class="token number">45</span><span class="token punctuation">,</span> <span class="token number">62</span><span class="token punctuation">,</span> <span class="token number">118</span><span class="token punctuation">,</span> <span class="token number">114</span><span class="token punctuation">,</span> <span class="token number">58</span><span class="token punctuation">,</span> <span class="token number">120</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">,</span> <span class="token number">46</span><span class="token punctuation">,</span> <span class="token number">64</span><span class="token punctuation">,</span> <span class="token number">114</span><span class="token punctuation">,</span> <span class="token number">103</span><span class="token punctuation">,</span> <span class="token number">117</span><span class="token punctuation">,</span> <span class="token number">55</span><span class="token punctuation">,</span> <span class="token number">66</span><span class="token punctuation">,</span> <span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">111</span><span class="token punctuation">,</span> <span class="token number">25</span><span class="token punctuation">,</span> <span class="token number">84</span><span class="token punctuation">}</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_2-1-使用-system-arraycopy" tabindex="-1"><a class="header-anchor" href="#_2-1-使用-system-arraycopy"><span>2.1. 使用 <em>System.arraycopy()</em></span></a></h3><p><em>arrayCopy()</em> 是 <em>System</em> 类中的一个静态方法。它从指定的源数组开始，将数组或数组的一个子序列复制到目标数组的指定位置。</p><p>这个方法接受源数组和目标数组、数组中的位置和长度作为参数，以复制数组元素。让我们看看它的签名：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">arraycopy</span><span class="token punctuation">(</span><span class="token class-name">Object</span> src<span class="token punctuation">,</span> <span class="token keyword">int</span> srcPos<span class="token punctuation">,</span> <span class="token class-name">Object</span> dest<span class="token punctuation">,</span> <span class="token keyword">int</span> destPos<span class="token punctuation">,</span> <span class="token keyword">int</span> length<span class="token punctuation">)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们将了解这些参数的含义：</p><ul><li><em>src</em> 是源数组</li><li><em>srcPos</em> 是源数组中的起始位置</li><li><em>dest</em> 是目标数组</li><li><em>destPos</em> 是目标数组中的起始位置</li><li><em>length</em> 是要复制的数组元素数量</li></ul><p>让我们使用 <em>arrayCopy()</em> 方法将其复制到我们的 <em>combined</em> 数组：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">arraycopy</span><span class="token punctuation">(</span>first<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> combined<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> first<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">arraycopy</span><span class="token punctuation">(</span>second<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> combined<span class="token punctuation">,</span> first<span class="token punctuation">.</span>length<span class="token punctuation">,</span> second<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertArrayEquals</span><span class="token punctuation">(</span>expectedArray<span class="token punctuation">,</span> combined<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们运行上述测试，它会通过。</p><h3 id="_2-2-使用-bytebuffer" tabindex="-1"><a class="header-anchor" href="#_2-2-使用-bytebuffer"><span>2.2. 使用 <em>ByteBuffer</em></span></a></h3><p><em>ByteBuffer</em> 是扩展了 <em>java.nio.Buffer</em> 的Java类。我们可以使用它来合并两个或更多的字节数组：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">ByteBuffer</span> buffer <span class="token operator">=</span> <span class="token class-name">ByteBuffer</span><span class="token punctuation">.</span><span class="token function">wrap</span><span class="token punctuation">(</span>combined<span class="token punctuation">)</span><span class="token punctuation">;</span>\nbuffer<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>first<span class="token punctuation">)</span><span class="token punctuation">;</span>\nbuffer<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>second<span class="token punctuation">)</span><span class="token punctuation">;</span>\nbuffer<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>third<span class="token punctuation">)</span><span class="token punctuation">;</span>\ncombined <span class="token operator">=</span> buffer<span class="token punctuation">.</span><span class="token function">array</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertArrayEquals</span><span class="token punctuation">(</span>expectedArray<span class="token punctuation">,</span> combined<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>再次，如果我们运行测试，它会通过。</p><h3 id="_2-3-使用自定义方法" tabindex="-1"><a class="header-anchor" href="#_2-3-使用自定义方法"><span>2.3. 使用自定义方法</span></a></h3><p>我们可以通过编写自定义逻辑来合并两个字节数组。例如，我们可以通过比较索引与第一个数组的长度来将数据插入结果数组：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i `<span class="token operator">&lt;</span> combined<span class="token punctuation">.</span>length<span class="token punctuation">;</span> <span class="token operator">++</span>i<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    combined<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> i <span class="token operator">&lt;</span> first<span class="token punctuation">.</span>length <span class="token operator">?</span> first<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">:</span> second<span class="token punctuation">[</span>i <span class="token operator">-</span> first<span class="token punctuation">.</span>length<span class="token punctuation">]</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n<span class="token function">assertArrayEquals</span><span class="token punctuation">(</span>expectedArray<span class="token punctuation">,</span> combined<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们看到，当我们运行上述测试时，它会通过。</p><h2 id="_3-外部库" tabindex="-1"><a class="header-anchor" href="#_3-外部库"><span>3. 外部库</span></a></h2><p>我们可以使用几个外部库来合并两个字节数组。我们来看看最受欢迎的一些。</p><h3 id="_3-1-使用-guava" tabindex="-1"><a class="header-anchor" href="#_3-1-使用-guava"><span>3.1. 使用 Guava</span></a></h3><p>让我们首先在 <em>pom.xml</em> 中添加Google的Guava Maven依赖：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>``com.google.guava``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>``guava``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>``31.1-jre``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>``\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们将使用Guava的 <em>com.google.common.primitives.Bytes.concat()</em>。这是它的签名：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">concat</span><span class="token punctuation">(</span><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> arrays<span class="token punctuation">)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们可以使用上述方法结合两个或更多的字节数组：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> combined <span class="token operator">=</span> <span class="token class-name">Bytes</span><span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span>first<span class="token punctuation">,</span> second<span class="token punctuation">,</span> third<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertArrayEquals</span><span class="token punctuation">(</span>expectedArray<span class="token punctuation">,</span> combined<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，结果的 <em>combined</em> 数组包含了传递给 <em>concat()</em> 方法的所有数组中的元素。</p><h3 id="_3-2-使用-apache-commons" tabindex="-1"><a class="header-anchor" href="#_3-2-使用-apache-commons"><span>3.2. 使用 Apache Commons</span></a></h3><p>要开始使用Apache Commons Lang 3，我们首先需要添加Maven依赖：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>`\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>``org.apache.commons``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>``commons-lang3``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>``3.14.0``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>``\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们将使用Apache Commons Lang的 <em>org.apache.commons.lang3.ArrayUtils</em>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">addAll</span><span class="token punctuation">(</span><span class="token keyword">final</span> <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> array1<span class="token punctuation">,</span> <span class="token keyword">final</span> <span class="token keyword">byte</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> array2<span class="token punctuation">)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>让我们看看如何使用上述方法合并两个字节数组：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> combined <span class="token operator">=</span> <span class="token class-name">ArrayUtils</span><span class="token punctuation">.</span><span class="token function">addAll</span><span class="token punctuation">(</span>first<span class="token punctuation">,</span> second<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertArrayEquals</span><span class="token punctuation">(</span>expectedArray<span class="token punctuation">,</span> combined<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>再次，如果我们运行测试，它会通过。</p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在这篇短文中，我们首先看了几种使用纯Java合并两个字节数组的方法。后来，我们还使用了像Guava和Apache Commons这样的外部库来合并两个字节数组。</p><p>正如往常一样，本文的完整代码示例可以在GitHub上找到。</p><p>OK</p>',54),o=[e];function c(l,u){return s(),a("div",null,o)}const k=n(p,[["render",c],["__file","2024-07-04-Combining Two or More Byte Arrays.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-04/2024-07-04-Combining%20Two%20or%20More%20Byte%20Arrays.html","title":"Java中合并两个或更多字节数组","lang":"zh-CN","frontmatter":{"date":"2024-07-04T00:00:00.000Z","category":["Java","编程"],"tag":["字节数组","合并"],"head":[["meta",{"name":"keywords","content":"Java, 字节数组, 合并, ByteBuffer, System.arraycopy, Guava, Apache Commons"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-04/2024-07-04-Combining%20Two%20or%20More%20Byte%20Arrays.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中合并两个或更多字节数组"}],["meta",{"property":"og:description","content":"Java中合并两个或更多字节数组 1. 引言 作为Java开发者，我们可能会遇到需要合并两个或更多字节数组的情况。在本教程中，我们将探索几种合并两个或更多字节数组的方法。 我们将从Java的基本类和方法开始。然后，我们将查看一些外部库，如Guava和Apache Commons Collections，用于合并字节数组。 2. 使用纯Java 在以下所..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-04T13:56:38.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"字节数组"}],["meta",{"property":"article:tag","content":"合并"}],["meta",{"property":"article:published_time","content":"2024-07-04T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-04T13:56:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中合并两个或更多字节数组\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-04T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-04T13:56:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中合并两个或更多字节数组 1. 引言 作为Java开发者，我们可能会遇到需要合并两个或更多字节数组的情况。在本教程中，我们将探索几种合并两个或更多字节数组的方法。 我们将从Java的基本类和方法开始。然后，我们将查看一些外部库，如Guava和Apache Commons Collections，用于合并字节数组。 2. 使用纯Java 在以下所..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 使用纯Java","slug":"_2-使用纯java","link":"#_2-使用纯java","children":[{"level":3,"title":"2.1. 使用 System.arraycopy()","slug":"_2-1-使用-system-arraycopy","link":"#_2-1-使用-system-arraycopy","children":[]},{"level":3,"title":"2.2. 使用 ByteBuffer","slug":"_2-2-使用-bytebuffer","link":"#_2-2-使用-bytebuffer","children":[]},{"level":3,"title":"2.3. 使用自定义方法","slug":"_2-3-使用自定义方法","link":"#_2-3-使用自定义方法","children":[]}]},{"level":2,"title":"3. 外部库","slug":"_3-外部库","link":"#_3-外部库","children":[{"level":3,"title":"3.1. 使用 Guava","slug":"_3-1-使用-guava","link":"#_3-1-使用-guava","children":[]},{"level":3,"title":"3.2. 使用 Apache Commons","slug":"_3-2-使用-apache-commons","link":"#_3-2-使用-apache-commons","children":[]}]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1720101398000,"updatedTime":1720101398000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.59,"words":1076},"filePathRelative":"posts/baeldung/2024-07-04/2024-07-04-Combining Two or More Byte Arrays.md","localizedDate":"2024年7月4日","excerpt":"\\n<h2>1. 引言</h2>\\n<p>作为Java开发者，我们可能会遇到需要合并两个或更多字节数组的情况。在本教程中，<strong>我们将探索几种合并两个或更多字节数组的方法</strong>。</p>\\n<p>我们将从Java的基本类和方法开始。然后，我们将查看一些外部库，如Guava和Apache Commons Collections，用于合并字节数组。</p>\\n<h2>2. 使用纯Java</h2>\\n<p>在以下所有示例中，我们将考虑以下两个字节数组：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">byte</span><span class=\\"token punctuation\\">[</span><span class=\\"token punctuation\\">]</span> first <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">{</span><span class=\\"token number\\">69</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">121</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">101</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">45</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">62</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">118</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">114</span><span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">byte</span><span class=\\"token punctuation\\">[</span><span class=\\"token punctuation\\">]</span> second <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">{</span><span class=\\"token number\\">58</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">120</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">100</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">46</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">64</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">114</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">103</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">117</span><span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>\\n</code></pre></div>","autoDesc":true}');export{k as comp,d as data};
