import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-BDZ-trJf.js";const p={},e=t('<h1 id="java中将map-string-object-转换为map-string-string" tabindex="-1"><a class="header-anchor" href="#java中将map-string-object-转换为map-string-string"><span>Java中将Map<code>&lt;String, Object&gt;</code>转换为Map<code>&lt;String, String&gt;</code></span></a></h1><p>我们经常在Java中使用诸如Map这样的集合来存储键值对。</p><p>在这个快速教程中，我们将探讨如何将<code>Map`````````&lt;String, Object&gt;``````````转换为</code>Map``````````````````&lt;String, String&gt;```````````````````。</p><h2 id="_2-问题介绍" tabindex="-1"><a class="header-anchor" href="#_2-问题介绍"><span>2. 问题介绍</span></a></h2><p>首先，让我们创建一个`Map`````````&lt;String, Object&gt;``````````：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Map</span>`````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span>````````` <span class="token constant">MAP1</span> <span class="token operator">=</span> <span class="token class-name">Maps</span><span class="token punctuation">.</span><span class="token function">newHashMap</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">static</span> <span class="token punctuation">{</span>\n    <span class="token constant">MAP1</span><span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;K01&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;GNU Linux&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token constant">MAP1</span><span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;K02&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Mac OS&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token constant">MAP1</span><span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;K03&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;MS Windows&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>所以，如果我们将其转换为`Map``````````````````&lt;String, String&gt;```````````````````，结果应该如下所示：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Map</span>``````````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`````````````````` <span class="token constant">EXPECTED_MAP1</span> <span class="token operator">=</span> <span class="token class-name">Maps</span><span class="token punctuation">.</span><span class="token function">newHashMap</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">static</span> <span class="token punctuation">{</span>\n    <span class="token constant">EXPECTED_MAP1</span><span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;K01&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;GNU Linux&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token constant">EXPECTED_MAP1</span><span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;K02&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Mac OS&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token constant">EXPECTED_MAP1</span><span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;K03&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;MS Windows&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用<code>HashMap(Map</code>&lt;? extends K, ? extends V&gt;<code> m)</code>构造函数可能是完成转换的第一个想法。让我们尝试一下：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Map</span>``````````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`````````````````` result <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span>``````````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``````````````````<span class="token punctuation">(</span><span class="token constant">MAP1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>不幸的是，上面的代码<strong>无法编译</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>no suitable constructor found <span class="token keyword">for</span> <span class="token class-name">HashMap</span><span class="token punctuation">(</span><span class="token class-name"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span>Map</span>`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span></span>String</span><span class="token punctuation">,</span><span class="token class-name"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span></span>Object</span><span class="token punctuation">&gt;</span></span>`<span class="token punctuation">)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在这个教程中，我们将讨论解决这个问题的不同方法。</p><p>正如我们所看到的，尽管<code>MAP1</code>的类型是<code>Map`````````&lt;String, Object&gt;``````````，所有条目的值都是字符串。由于值的类型参数是</code>Object`，<strong>我们的输入映射可能包含值不是字符串的条目</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Map</span>`````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span>````````` <span class="token constant">MAP2</span> <span class="token operator">=</span> <span class="token class-name">Maps</span><span class="token punctuation">.</span><span class="token function">newHashMap</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">static</span> <span class="token punctuation">{</span>\n    <span class="token constant">MAP2</span><span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;K01&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;GNU Linux&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token constant">MAP2</span><span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;K02&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Mac OS&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token constant">MAP2</span><span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;K03&quot;</span><span class="token punctuation">,</span> <span class="token class-name">BigDecimal</span><span class="token punctuation">.</span><span class="token constant">ONE</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 值不是字符串</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们也将涵盖这种转换场景。</p><p>为了简单起见，我们将使用<code>MAP1</code>和<code>MAP2</code>作为输入，并使用单元测试断言来验证每种解决方案是否按预期工作。</p><h2 id="_3-强制转换为map-不安全" tabindex="-1"><a class="header-anchor" href="#_3-强制转换为map-不安全"><span>3. 强制转换为Map（不安全）</span></a></h2><p>泛型是编译时的特性。<strong>在运行时，所有类型参数都被擦除，所有映射都具有相同的类型<code>Map</code>&lt;Object, Object&gt;``</strong>。因此，我们可以将<code>MAP1</code>强制转换为原始的<code>Map</code>并将其赋值给`Map``````````````````&lt;String, String&gt;```````````````````变量：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Map</span>``````````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`````````````````` result <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">Map</span><span class="token punctuation">)</span> <span class="token constant">MAP1</span><span class="token punctuation">;</span>\n<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token constant">EXPECTED_MAP1</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这个技巧有效，尽管<strong>在编译时有一个“Unchecked Conversion”警告</strong>。</p><p>然而，这并不安全。例如，<strong>如果某个条目的值不是字符串，这种方法会隐藏问题</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Map</span>``````````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`````````````````` result2 <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">Map</span><span class="token punctuation">)</span> <span class="token constant">MAP2</span><span class="token punctuation">;</span>\n<span class="token function">assertFalse</span><span class="token punctuation">(</span>result2<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;K03&quot;</span><span class="token punctuation">)</span> <span class="token keyword">instanceof</span> <span class="token class-name">String</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>正如上面的测试所示，尽管<code>result2</code>的类型是`Map``````````````````&lt;String, String&gt;```````````````````，映射中的一个值不是字符串。这可能导致后续流程中出现意外问题。</p><p>接下来，让我们看看如何实现安全转换。</p><h2 id="_4-创建checkandtransform-方法" tabindex="-1"><a class="header-anchor" href="#_4-创建checkandtransform-方法"><span>4. 创建checkAndTransform()方法</span></a></h2><p>我们可以构建一个<code>checkAndTransform()</code>方法来进行安全转换：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Map</span>``````````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`````````````````` <span class="token function">checkAndTransform</span><span class="token punctuation">(</span><span class="token class-name">Map</span>`````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span>````````` inputMap<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">Map</span>``````````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`````````````````` result <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Map<span class="token punctuation">.</span>Entry</span>`````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span>````````` entry <span class="token operator">:</span> inputMap<span class="token punctuation">.</span><span class="token function">entrySet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">try</span> <span class="token punctuation">{</span>\n            result<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>entry<span class="token punctuation">.</span><span class="token function">getKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">)</span> entry<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">ClassCastException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token keyword">throw</span> e<span class="token punctuation">;</span> <span class="token comment">// 或者所需的错误处理</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n    <span class="token keyword">return</span> result<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上述方法所示，<strong>我们遍历输入映射中的条目，将每个条目的值强制转换为<code>String</code>，并将键值对放入新的`Map``````````````````&lt;String, String&gt;```````````````````</strong>。</p><p>让我们用我们的<code>MAP1</code>测试它：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Map</span>``````````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`````````````````` result <span class="token operator">=</span> <span class="token function">checkAndTransform</span><span class="token punctuation">(</span><span class="token constant">MAP1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token constant">EXPECTED_MAP1</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>此外，一旦输入映射包含一些无法强制转换为<code>String</code>的值，就会抛出<code>ClassCastException</code>。让我们将<code>MAP2</code>传递给该方法进行测试：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertThrows</span><span class="token punctuation">(</span><span class="token class-name">ClassCastException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token function">checkAndTransform</span><span class="token punctuation">(</span><span class="token constant">MAP2</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>为了简单，在<code>catch</code>块中，我们<strong>抛出</strong>异常。根据要求，我们可以在捕获<code>ClassCastException</code>之后采用适当的错误处理过程。</p><h2 id="_5-将所有值转换为字符串" tabindex="-1"><a class="header-anchor" href="#_5-将所有值转换为字符串"><span>5. 将所有值转换为字符串</span></a></h2><p>有时，我们不想在映射包含无法强制转换为<code>String</code>的值时捕获任何异常。<strong>相反，对于那些“非字符串”值，我们希望使用对象的<code>String</code>表示作为值</strong>。例如，我们想将<code>MAP2</code>转换为此映射：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Map</span>``````````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`````````````````` <span class="token constant">EXPECTED_MAP2_STRING_VALUES</span> <span class="token operator">=</span> <span class="token class-name">Maps</span><span class="token punctuation">.</span><span class="token function">newHashMap</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">static</span> <span class="token punctuation">{</span>\n    <span class="token constant">EXPECTED_MAP2_STRING_VALUES</span><span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;K01&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;GNU Linux&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token constant">EXPECTED_MAP2_STRING_VALUES</span><span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;K02&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Mac OS&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token constant">EXPECTED_MAP2_STRING_VALUES</span><span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;K03&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// BigDecimal.ONE的字符串表示</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们使用Stream API来实现它：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Map</span>``````````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`````````````````` result <span class="token operator">=</span> <span class="token constant">MAP1</span><span class="token punctuation">.</span><span class="token function">entrySet</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token function">toMap</span><span class="token punctuation">(</span><span class="token class-name">Map<span class="token punctuation">.</span>Entry</span><span class="token operator">::</span><span class="token function">getKey</span><span class="token punctuation">,</span> e <span class="token operator">-&gt;</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token constant">EXPECTED_MAP1</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token class-name">Map</span>``````````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`````````````````` result2 <span class="token operator">=</span> <span class="token constant">MAP2</span><span class="token punctuation">.</span><span class="token function">entrySet</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token function">toMap</span><span class="token punctuation">(</span><span class="token class-name">Map<span class="token punctuation">.</span>Entry</span><span class="token operator">::</span><span class="token function">getKey</span><span class="token punctuation">,</span> e <span class="token operator">-&gt;</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token constant">EXPECTED_MAP2_STRING_VALUES</span><span class="token punctuation">,</span> result2<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>值得一提的是，<strong>我们使用了<code>String.valueOf()</code>而不是<code>e.toString()</code>来避免潜在的<code>NullPointerException</code></strong>。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们学习了将<code>Map`````````&lt;String, Object&gt;``````````转换为</code>Map``````````````````&lt;String, String&gt;```````````````````的不同方法。</p><p>我们还讨论了输入映射包含非字符串值的场景。</p><p>像往常一样，这里呈现的所有代码片段都可以在GitHub上找到。</p>',44),c=[e];function o(l,i){return a(),s("div",null,c)}const r=n(p,[["render",o],["__file","2024-07-04-Converting Map String  Object  to Map String  String  in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-04/2024-07-04-Converting%20Map%20String%20%20Object%20%20to%20Map%20String%20%20String%20%20in%20Java.html","title":"Java中将Map<String, Object>转换为Map<String, String>","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Collections"],"tag":["Java","Map","Conversion"],"head":[["meta",{"name":"keywords","content":"Java, Map, Conversion, Collections"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-04/2024-07-04-Converting%20Map%20String%20%20Object%20%20to%20Map%20String%20%20String%20%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中将Map<String, Object>转换为Map<String, String>"}],["meta",{"property":"og:description","content":"Java中将Map<String, Object>转换为Map<String, String> 我们经常在Java中使用诸如Map这样的集合来存储键值对。 在这个快速教程中，我们将探讨如何将Map`````````<String, Object>``````````转换为Map``````````````````<String, String>````..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-04T17:56:32.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Map"}],["meta",{"property":"article:tag","content":"Conversion"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-04T17:56:32.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中将Map<String, Object>转换为Map<String, String>\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-04T17:56:32.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中将Map<String, Object>转换为Map<String, String> 我们经常在Java中使用诸如Map这样的集合来存储键值对。 在这个快速教程中，我们将探讨如何将Map`````````<String, Object>``````````转换为Map``````````````````<String, String>````..."},"headers":[{"level":2,"title":"2. 问题介绍","slug":"_2-问题介绍","link":"#_2-问题介绍","children":[]},{"level":2,"title":"3. 强制转换为Map（不安全）","slug":"_3-强制转换为map-不安全","link":"#_3-强制转换为map-不安全","children":[]},{"level":2,"title":"4. 创建checkAndTransform()方法","slug":"_4-创建checkandtransform-方法","link":"#_4-创建checkandtransform-方法","children":[]},{"level":2,"title":"5. 将所有值转换为字符串","slug":"_5-将所有值转换为字符串","link":"#_5-将所有值转换为字符串","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1720115792000,"updatedTime":1720115792000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.54,"words":1063},"filePathRelative":"posts/baeldung/2024-07-04/2024-07-04-Converting Map String  Object  to Map String  String  in Java.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>我们经常在Java中使用诸如Map这样的集合来存储键值对。</p>\\n<p>在这个快速教程中，我们将探讨如何将<code>Map`````````&lt;String, Object&gt;``````````转换为</code>Map``````````````````&lt;String, String&gt;```````````````````。</p>\\n<h2>2. 问题介绍</h2>\\n<p>首先，让我们创建一个`Map`````````&lt;String, Object&gt;``````````：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">static</span> <span class=\\"token keyword\\">final</span> <span class=\\"token class-name\\">Map</span>`````````<span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">String</span><span class=\\"token punctuation\\">,</span> <span class=\\"token class-name\\">Object</span><span class=\\"token punctuation\\">&gt;</span></span>````````` <span class=\\"token constant\\">MAP1</span> <span class=\\"token operator\\">=</span> <span class=\\"token class-name\\">Maps</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">newHashMap</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\n<span class=\\"token keyword\\">static</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token constant\\">MAP1</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">put</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"K01\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"GNU Linux\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token constant\\">MAP1</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">put</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"K02\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"Mac OS\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token constant\\">MAP1</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">put</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"K03\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"MS Windows\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{r as comp,d as data};
