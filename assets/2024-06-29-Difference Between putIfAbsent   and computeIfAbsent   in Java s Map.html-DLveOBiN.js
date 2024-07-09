import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-DRFG6C5y.js";const p={},e=t(`<h1 id="java中map的putifabsent-与computeifabsent-的区别-baeldung" tabindex="-1"><a class="header-anchor" href="#java中map的putifabsent-与computeifabsent-的区别-baeldung"><span>Java中Map的putIfAbsent()与computeIfAbsent()的区别 | Baeldung</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>_Map_是一种常用的数据结构，包含键值对关联。Java提供了多种方法来操作映射条目。自Java 8以来，一些新成员加入了_Map_家族。</p><p>_putIfAbsent()_和_computeIfAbsent()_是其中的两个。我们经常使用这两种方法来添加条目。尽管它们乍一看可能很相似，但它们具有不同的行为和用例。</p><p>在本教程中，我们将讨论这两种方法之间的区别。</p><h2 id="_2-引言" tabindex="-1"><a class="header-anchor" href="#_2-引言"><span>2. 引言</span></a></h2><p>在深入讨论这两种方法的区别之前，让我们建立一些共同基础。</p><p>_putIfAbsent()_和_computeIfAbsent()_都是Java中_Map_接口提供的方法，它们共享一个共同目标：**如果键不存在，则向映射中添加一个键值对。**当我们要防止覆盖现有条目时，这种行为特别有用。</p><p>值得注意的是，“<strong>不存在</strong>”涵盖了两种情况：</p><ul><li>键在映射中不存在</li><li>键存在，但关联的值是_null_</li></ul><p>然而，这两种方法的行为并不相同。</p><p>在本教程中，我们不会讨论这两种方法的一般用法。相反，我们将只关注它们的区别，并从三个角度来查看它们的差异。</p><p>此外，我们将使用单元测试断言来演示这些差异。那么接下来，让我们快速设置我们的测试示例。</p><h2 id="_3-准备" tabindex="-1"><a class="header-anchor" href="#_3-准备"><span>3. 准备</span></a></h2><p>由于我们将调用_putIfAbsent()_和_computeIfAbsent()_来向映射中插入条目，让我们首先为所有测试创建一个_HashMap_实例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Map</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\` <span class="token constant">MY_MAP</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@BeforeEach</span>
<span class="token keyword">void</span> <span class="token function">resetTheMap</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token constant">MY_MAP</span><span class="token punctuation">.</span><span class="token function">clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token constant">MY_MAP</span><span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;Key A&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;value A&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token constant">MY_MAP</span><span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;Key B&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;value B&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token constant">MY_MAP</span><span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;Key C&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;value C&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token constant">MY_MAP</span><span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;Key Null&quot;</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，<strong>我们还创建了带有_@BeforeEach_注解的_resetTheMap()_方法。此方法确保MY_MAP对于每个测试都包含相同的键值对。</strong></p><p>如果我们查看_computeIfAbsent()_的签名，我们可以看到该方法接受_mappingFunction_函数来计算新值：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">default</span> <span class="token class-name">V</span> <span class="token function">computeIfAbsent</span><span class="token punctuation">(</span><span class="token class-name">K</span> key<span class="token punctuation">,</span> <span class="token class-name">Function</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span> <span class="token keyword">super</span> <span class="token class-name">K</span><span class="token punctuation">,</span> <span class="token operator">?</span> <span class="token keyword">extends</span> <span class="token class-name">V</span><span class="token punctuation">&gt;</span></span>\` mappingFunction<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>因此，让我们创建_Magic_类来提供一些函数：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token class-name">Magic</span> magic <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Magic</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>_Magic_类非常简单。它只提供两个方法：<strong>_nullFunc()<em>总是返回_null</em>，而_strFunc()_返回一个非空字符串。</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Magic</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">nullFunc</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">strFunc</span><span class="token punctuation">(</span><span class="token class-name">String</span> input<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> input <span class="token operator">+</span> <span class="token string">&quot;: A nice string&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为了公平起见，在测试中，所有在_putIfAbsent()_和_computeIfAbsent()_中使用的新的映射值都来自_magic_的方法。</p><h2 id="_4-当键不存在时的返回值" tabindex="-1"><a class="header-anchor" href="#_4-当键不存在时的返回值"><span>4. 当键不存在时的返回值</span></a></h2><p>这两种方法的共同部分是“<em>IfAbsent</em>”。我们已经讨论了“不存在”的定义。第一个区别是这两种方法在“不存在”的情况下的返回值。</p><p>让我们首先看看_putIfAbsent()_方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token comment">// 不存在：放置新键 -&gt; null</span>
<span class="token class-name">String</span> putResult <span class="token operator">=</span> <span class="token constant">MY_MAP</span><span class="token punctuation">.</span><span class="token function">putIfAbsent</span><span class="token punctuation">(</span><span class="token string">&quot;new key1&quot;</span><span class="token punctuation">,</span> magic<span class="token punctuation">.</span><span class="token function">nullFunc</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertNull</span><span class="token punctuation">(</span>putResult<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 不存在：放置新键 -&gt; 非空</span>
putResult <span class="token operator">=</span> <span class="token constant">MY_MAP</span><span class="token punctuation">.</span><span class="token function">putIfAbsent</span><span class="token punctuation">(</span><span class="token string">&quot;new key2&quot;</span><span class="token punctuation">,</span> magic<span class="token punctuation">.</span><span class="token function">strFunc</span><span class="token punctuation">(</span><span class="token string">&quot;new key2&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertNull</span><span class="token punctuation">(</span>putResult<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 不存在：现有键 -&gt; 空（原始）</span>
putResult <span class="token operator">=</span> <span class="token constant">MY_MAP</span><span class="token punctuation">.</span><span class="token function">putIfAbsent</span><span class="token punctuation">(</span><span class="token string">&quot;Key Null&quot;</span><span class="token punctuation">,</span> magic<span class="token punctuation">.</span><span class="token function">strFunc</span><span class="token punctuation">(</span><span class="token string">&quot;Key Null&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertNull</span><span class="token punctuation">(</span>putResult<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从上述测试中，我们可以看到<strong>当不存在时，_putIfAbsent()<em>方法总是返回_null</em>，无论新值是否为空。</strong></p><p>接下来，让我们执行相同的测试与_computeIfAbsent()_并看看它返回什么：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token comment">// 不存在：计算新键 -&gt; 空</span>
<span class="token class-name">String</span> computeResult <span class="token operator">=</span> <span class="token constant">MY_MAP</span><span class="token punctuation">.</span><span class="token function">computeIfAbsent</span><span class="token punctuation">(</span><span class="token string">&quot;new key1&quot;</span><span class="token punctuation">,</span> k <span class="token operator">-&gt;</span> magic<span class="token punctuation">.</span><span class="token function">nullFunc</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertNull</span><span class="token punctuation">(</span>computeResult<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 不存在：计算新键 -&gt; 非空</span>
computeResult <span class="token operator">=</span> <span class="token constant">MY_MAP</span><span class="token punctuation">.</span><span class="token function">computeIfAbsent</span><span class="token punctuation">(</span><span class="token string">&quot;new key2&quot;</span><span class="token punctuation">,</span> k <span class="token operator">-&gt;</span> magic<span class="token punctuation">.</span><span class="token function">strFunc</span><span class="token punctuation">(</span>k<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;new key2: A nice string&quot;</span><span class="token punctuation">,</span> computeResult<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 不存在：现有键 -&gt; 空（原始）</span>
computeResult <span class="token operator">=</span> <span class="token constant">MY_MAP</span><span class="token punctuation">.</span><span class="token function">computeIfAbsent</span><span class="token punctuation">(</span><span class="token string">&quot;Key Null&quot;</span><span class="token punctuation">,</span> k <span class="token operator">-&gt;</span> magic<span class="token punctuation">.</span><span class="token function">strFunc</span><span class="token punctuation">(</span>k<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Key Null: A nice string&quot;</span><span class="token punctuation">,</span> computeResult<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如测试所示，<strong>当不存在时，_computeIfAbsent()_方法返回_mappingFunction_的返回值。</strong></p><h2 id="_5-当新值是-null-时" tabindex="-1"><a class="header-anchor" href="#_5-当新值是-null-时"><span>5. 当新值是_null_时</span></a></h2><p>我们知道_HashMap_允许空值。那么接下来，让我们尝试向_MY_MAP_插入一个_null_值，并看看这两种方法的行为。</p><p>首先，让我们看看_putIfAbsent()_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token constant">MY_MAP</span><span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 初始：4个条目</span>
<span class="token constant">MY_MAP</span><span class="token punctuation">.</span><span class="token function">putIfAbsent</span><span class="token punctuation">(</span><span class="token string">&quot;new key&quot;</span><span class="token punctuation">,</span> magic<span class="token punctuation">.</span><span class="token function">nullFunc</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token constant">MY_MAP</span><span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token constant">MY_MAP</span><span class="token punctuation">.</span><span class="token function">containsKey</span><span class="token punctuation">(</span><span class="token string">&quot;new key&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 新条目已添加到映射中</span>
<span class="token function">assertNull</span><span class="token punctuation">(</span><span class="token constant">MY_MAP</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;new key&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>所以，<strong>当键在目标映射中不存在时，_putIfAbsent()<em>将始终向映射中添加一个新的键值对，即使新值是_null</em>。</strong></p><p>现在轮到_computeIfAbsent()_了：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token constant">MY_MAP</span><span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 初始：4个条目</span>
<span class="token constant">MY_MAP</span><span class="token punctuation">.</span><span class="token function">computeIfAbsent</span><span class="token punctuation">(</span><span class="token string">&quot;new key&quot;</span><span class="token punctuation">,</span> k <span class="token operator">-&gt;</span> magic<span class="token punctuation">.</span><span class="token function">nullFunc</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token constant">MY_MAP</span><span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertFalse</span><span class="token punctuation">(</span><span class="token constant">MY_MAP</span><span class="token punctuation">.</span><span class="token function">containsKey</span><span class="token punctuation">(</span><span class="token string">&quot;new key&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// \`&lt;- 没有新条目添加到映射中</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，<strong>如果_mappingFunction_返回_null，computeIfAbsent()_拒绝将键值对添加到映射中。</strong></p><h2 id="_6-compute-是懒惰的-put-是急切的" tabindex="-1"><a class="header-anchor" href="#_6-compute-是懒惰的-put-是急切的"><span>6. “<em>compute</em>”是懒惰的，“<em>put</em>”是急切的</span></a></h2><p>我们已经讨论了这两种方法之间的两个区别。接下来，让我们看看当“<em>value</em>”部分由方法或函数提供时，这两种方法的行为是否相同。</p><p>像往常一样，让我们首先看看_putIfAbsent()_方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Magic</span> spyMagic <span class="token operator">=</span> <span class="token function">spy</span><span class="token punctuation">(</span>magic<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 键存在</span>
<span class="token constant">MY_MAP</span><span class="token punctuation">.</span><span class="token function">putIfAbsent</span><span class="token punctuation">(</span><span class="token string">&quot;Key A&quot;</span><span class="token punctuation">,</span> spyMagic<span class="token punctuation">.</span><span class="token function">strFunc</span><span class="token punctuation">(</span><span class="token string">&quot;Key A&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">verify</span><span class="token punctuation">(</span>spyMagic<span class="token punctuation">,</span> <span class="token function">times</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">strFunc</span><span class="token punctuation">(</span><span class="token function">anyString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 键不存在</span>
<span class="token constant">MY_MAP</span><span class="token punctuation">.</span><span class="token function">putIfAbsent</span><span class="token punctuation">(</span><span class="token string">&quot;new key&quot;</span><span class="token punctuation">,</span> spyMagic<span class="token punctuation">.</span><span class="token function">strFunc</span><span class="token punctuation">(</span><span class="token string">&quot;new key&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">verify</span><span class="token punctuation">(</span>spyMagic<span class="token punctuation">,</span> <span class="token function">times</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">strFunc</span><span class="token punctuation">(</span><span class="token function">anyString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如上面的测试所示，<strong>我们使用Mockito _spy_对_magic_对象进行了测试</strong>，以验证是否调用了_strFunc()_方法。测试结果显示，<strong>无论键是否存在，_strFunc()_方法总是被调用。</strong></p><p>接下来，让我们看看_computeIfAbsent()<em>如何处理_mappingFunction</em>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Magic</span> spyMagic <span class="token operator">=</span> <span class="token function">spy</span><span class="token punctuation">(</span>magic<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 键存在</span>
<span class="token constant">MY_MAP</span><span class="token punctuation">.</span><span class="token function">computeIfAbsent</span><span class="token punctuation">(</span><span class="token string">&quot;Key A&quot;</span><span class="token punctuation">,</span> k <span class="token operator">-&gt;</span>\` spyMagic<span class="token punctuation">.</span><span class="token function">strFunc</span><span class="token punctuation">(</span>k<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">verify</span><span class="token punctuation">(</span>spyMagic<span class="token punctuation">,</span> <span class="token function">never</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">strFunc</span><span class="token punctuation">(</span><span class="token function">anyString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 函数没有被调用</span>

<span class="token comment">// 键不存在</span>
<span class="token constant">MY_MAP</span><span class="token punctuation">.</span><span class="token function">computeIfAbsent</span><span class="token punctuation">(</span><span class="token string">&quot;new key&quot;</span><span class="token punctuation">,</span> k <span class="token operator">-&gt;</span> spyMagic<span class="token punctuation">.</span><span class="token function">strFunc</span><span class="token punctuation">(</span>k<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">verify</span><span class="token punctuation">(</span>spyMagic<span class="token punctuation">,</span> <span class="token function">times</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">strFunc</span><span class="token punctuation">(</span><span class="token function">anyString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如测试所示，<strong>_computeIfAbsent()<em>正如其名，仅在“不存在”的情况下计算_mappingFunction</em>。</strong></p><p>另一个日常用例是当我们使用类似_Map<code>&lt;String, List&lt;String&gt;</code>&gt;_的东西时：</p><ul><li><em>putIfAbsent(aKey, new ArrayList()) –</em> 无论“aKey”是否存在，都会创建一个新的_ArrayList_对象</li><li><em>computeIfAbsent(aKey, k -&gt; new ArrayList()) –</em> 只有在“aKey”不存在时才会创建一个新的_ArrayList_实例</li></ul><p>因此，<strong>我们应该使用_putIfAbsent()_在键不存在时直接添加键值对，而不需要任何计算。<strong>另一方面，</strong>_computeIfAbsent()_可以在我们需要计算值并在键不存在时添加键值对时使用。</strong></p><h2 id="_7-结论" tabindex="-1"><a class="header-anchor" href="#_7-结论"><span>7. 结论</span></a></h2><p>在本文中，我们通过示例讨论了_putIfAbsent()_和_computeIfAbsent()_之间的区别。了解这种区别对于在我们的代码中做出正确的选择至关重要。</p><p>像往常一样，示例的完整源代码可在GitHub上找到。翻译已经结束，以下是文章的剩余部分：</p><h2 id="_7-结论-1" tabindex="-1"><a class="header-anchor" href="#_7-结论-1"><span>7. 结论</span></a></h2><p>在这篇文章中，我们通过示例讨论了_putIfAbsent()_和_computeIfAbsent()_之间的区别。了解这些差异对于在代码中做出正确的选择至关重要。</p><p>如往常一样，示例的完整源代码可以在GitHub上找到。</p><p><a href="https://www.baeldung.com" target="_blank" rel="noopener noreferrer">Baeldung</a> 的文章通常提供源代码和示例，以帮助读者更好地理解概念。如果你对Java中的Map操作有任何疑问，或者想要了解更多关于_putIfAbsent()_和_computeIfAbsent()_的使用场景，请访问他们的网站。</p><p>OK。</p>`,59),c=[e];function o(u,l){return a(),s("div",null,c)}const r=n(p,[["render",o],["__file","2024-06-29-Difference Between putIfAbsent   and computeIfAbsent   in Java s Map.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-06-29/2024-06-29-Difference%20Between%20putIfAbsent%20%20%20and%20computeIfAbsent%20%20%20in%20Java%20s%20Map.html","title":"Java中Map的putIfAbsent()与computeIfAbsent()的区别 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Collection"],"tag":["putIfAbsent","computeIfAbsent"],"head":[["meta",{"name":"keywords","content":"Java, Map, putIfAbsent, computeIfAbsent"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-29/2024-06-29-Difference%20Between%20putIfAbsent%20%20%20and%20computeIfAbsent%20%20%20in%20Java%20s%20Map.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中Map的putIfAbsent()与computeIfAbsent()的区别 | Baeldung"}],["meta",{"property":"og:description","content":"Java中Map的putIfAbsent()与computeIfAbsent()的区别 | Baeldung 1. 概述 _Map_是一种常用的数据结构，包含键值对关联。Java提供了多种方法来操作映射条目。自Java 8以来，一些新成员加入了_Map_家族。 _putIfAbsent()_和_computeIfAbsent()_是其中的两个。我们经常..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-29T02:27:37.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"putIfAbsent"}],["meta",{"property":"article:tag","content":"computeIfAbsent"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-29T02:27:37.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中Map的putIfAbsent()与computeIfAbsent()的区别 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-29T02:27:37.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中Map的putIfAbsent()与computeIfAbsent()的区别 | Baeldung 1. 概述 _Map_是一种常用的数据结构，包含键值对关联。Java提供了多种方法来操作映射条目。自Java 8以来，一些新成员加入了_Map_家族。 _putIfAbsent()_和_computeIfAbsent()_是其中的两个。我们经常..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 引言","slug":"_2-引言","link":"#_2-引言","children":[]},{"level":2,"title":"3. 准备","slug":"_3-准备","link":"#_3-准备","children":[]},{"level":2,"title":"4. 当键不存在时的返回值","slug":"_4-当键不存在时的返回值","link":"#_4-当键不存在时的返回值","children":[]},{"level":2,"title":"5. 当新值是_null_时","slug":"_5-当新值是-null-时","link":"#_5-当新值是-null-时","children":[]},{"level":2,"title":"6. “compute”是懒惰的，“put”是急切的","slug":"_6-compute-是懒惰的-put-是急切的","link":"#_6-compute-是懒惰的-put-是急切的","children":[]},{"level":2,"title":"7. 结论","slug":"_7-结论","link":"#_7-结论","children":[]},{"level":2,"title":"7. 结论","slug":"_7-结论-1","link":"#_7-结论-1","children":[]}],"git":{"createdTime":1719628057000,"updatedTime":1719628057000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.83,"words":1748},"filePathRelative":"posts/baeldung/2024-06-29/2024-06-29-Difference Between putIfAbsent   and computeIfAbsent   in Java s Map.md","localizedDate":"2022年4月1日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>_Map_是一种常用的数据结构，包含键值对关联。Java提供了多种方法来操作映射条目。自Java 8以来，一些新成员加入了_Map_家族。</p>\\n<p>_putIfAbsent()_和_computeIfAbsent()_是其中的两个。我们经常使用这两种方法来添加条目。尽管它们乍一看可能很相似，但它们具有不同的行为和用例。</p>\\n<p>在本教程中，我们将讨论这两种方法之间的区别。</p>\\n<h2>2. 引言</h2>\\n<p>在深入讨论这两种方法的区别之前，让我们建立一些共同基础。</p>\\n<p>_putIfAbsent()_和_computeIfAbsent()_都是Java中_Map_接口提供的方法，它们共享一个共同目标：**如果键不存在，则向映射中添加一个键值对。**当我们要防止覆盖现有条目时，这种行为特别有用。</p>","autoDesc":true}');export{r as comp,d as data};
