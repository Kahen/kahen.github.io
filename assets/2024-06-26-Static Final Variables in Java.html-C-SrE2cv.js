import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as t}from"./app-8nJ1rqSf.js";const e={},p=t(`<h1 id="java中的静态最终变量" tabindex="-1"><a class="header-anchor" href="#java中的静态最终变量"><span>Java中的静态最终变量</span></a></h1><p>简单来说，静态最终变量，也称为常量，是Java中创建一个在初始化后不会改变的类变量的关键特性。然而，在静态最终对象引用的情况下，对象的状态可能会改变。</p><p>在本教程中，我们将学习如何声明和初始化常量变量。我们还将讨论它们的用途。</p><p>静态关键字将变量与类本身关联，而不是类的实例。</p><p>此外，最终关键字使变量不可变。其值在初始化后不能改变。</p><p>两个关键字的组合有助于创建常量。它们通常使用大写字母和下划线来分隔单词。</p><h3 id="_2-1-初始化静态最终变量" tabindex="-1"><a class="header-anchor" href="#_2-1-初始化静态最终变量"><span>2.1. 初始化静态最终变量</span></a></h3><p>以下是如何声明静态最终字段并赋值的示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Bike</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">int</span> <span class="token constant">TIRE</span> <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们创建了一个名为Bike的类，一个名为TIRE的类常量，并将其初始化为2。</p><p>或者，我们可以通过静态初始化块来初始化变量：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">int</span> <span class="token constant">PEDAL</span><span class="token punctuation">;</span>
<span class="token keyword">static</span> <span class="token punctuation">{</span>
    <span class="token constant">PEDAL</span> <span class="token operator">=</span> <span class="token number">5</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这将无误编译：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenPedalConstantSetByStaticBlock_whenGetPedal_thenReturnFive</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token class-name">Bike</span><span class="token punctuation">.</span><span class="token constant">PEDAL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>常量变量的一些关键规则：</p><ul><li>我们必须在声明时或在静态初始化块中初始化</li><li>我们不能在初始化后重新分配它</li></ul><p>尝试在初始化范围之外初始化它将导致异常。</p><p><strong>此外，我们不能通过构造函数来初始化它，因为构造函数是在我们创建类的实例时调用的。静态变量属于类本身，而不是个别实例。</strong></p><h3 id="_2-2-静态最终对象" tabindex="-1"><a class="header-anchor" href="#_2-2-静态最终对象"><span>2.2. 静态最终对象</span></a></h3><p>我们也可以创建静态最终对象引用：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">HashMap</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>\` <span class="token constant">PART</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>由于PART引用是常量，它不能被重新分配：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token constant">PART</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上述代码会抛出异常，因为我们为不可变变量分配了一个新的引用。</p><p>然而，我们可以修改对象的状态：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenPartConstantObject_whenObjectStateChanged_thenCorrect</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Bike</span><span class="token punctuation">.</span><span class="token constant">PART</span><span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;seat&quot;</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token class-name">Bike</span><span class="token punctuation">.</span><span class="token constant">PART</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;seat&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Bike</span><span class="token punctuation">.</span><span class="token constant">PART</span><span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;seat&quot;</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token class-name">Bike</span><span class="token punctuation">.</span><span class="token constant">PART</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;seat&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们可以改变seat的值，尽管最初设置为1。尽管PART是一个常量引用，我们仍然可以改变其内容。只有引用本身是不可变的。</p><p><strong>值得注意的是，最终关键字只使原始类型、String和其他不可变类型成为常量。在对象的情况下，它只使引用常量，但对象的状态可以被改变。</strong></p><h2 id="_3-常量为什么有用" tabindex="-1"><a class="header-anchor" href="#_3-常量为什么有用"><span>3. 常量为什么有用</span></a></h2><p>使用静态最终变量有几个优点。<strong>它提供了更好的性能，因为在编译时内联其值，而不是在运行时查找值。</strong></p><p>此外，将可重用的值声明为常量可以避免重复字面量。常量可以在代码的任何地方重用，这取决于访问修饰符。具有私有访问修饰符的常量只能在类内部使用。</p><p>此外，原始类型或String类型的静态最终变量是线程安全的。当在多个线程之间共享时，其值保持不变。</p><p>最后，给常量值赋予语义名称可以增加代码的可读性。它还使代码自文档化。例如，java.math包提供了PI这样的常量：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenMathClass_whenAccessingPiConstant_thenVerifyPiValueIsCorrect</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">3.141592653589793</span><span class="token punctuation">,</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token constant">PI</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Math.PI以可重用的方式封装了数学常数值。</p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们学习了如何声明和初始化常量变量。我们也强调了一些使用情况。</p><p>最终静态变量定义了一个类级常量。然而，静态最终对象仍然可能是可变的，即使引用不能改变。</p><p>如常，示例的完整源代码可以在GitHub上找到。</p>`,39),c=[p];function o(l,i){return s(),n("div",null,c)}const d=a(e,[["render",o],["__file","2024-06-26-Static Final Variables in Java.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-06-26/2024-06-26-Static%20Final%20Variables%20in%20Java.html","title":"Java中的静态最终变量","lang":"zh-CN","frontmatter":{"date":"2024-06-26T00:00:00.000Z","category":["Java","编程"],"tag":["static","final","常量"],"head":[["meta",{"name":"keywords","content":"Java, static final, 常量, 编程"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-26/2024-06-26-Static%20Final%20Variables%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中的静态最终变量"}],["meta",{"property":"og:description","content":"Java中的静态最终变量 简单来说，静态最终变量，也称为常量，是Java中创建一个在初始化后不会改变的类变量的关键特性。然而，在静态最终对象引用的情况下，对象的状态可能会改变。 在本教程中，我们将学习如何声明和初始化常量变量。我们还将讨论它们的用途。 静态关键字将变量与类本身关联，而不是类的实例。 此外，最终关键字使变量不可变。其值在初始化后不能改变。..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-26T04:32:38.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"static"}],["meta",{"property":"article:tag","content":"final"}],["meta",{"property":"article:tag","content":"常量"}],["meta",{"property":"article:published_time","content":"2024-06-26T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-26T04:32:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中的静态最终变量\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-26T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-26T04:32:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中的静态最终变量 简单来说，静态最终变量，也称为常量，是Java中创建一个在初始化后不会改变的类变量的关键特性。然而，在静态最终对象引用的情况下，对象的状态可能会改变。 在本教程中，我们将学习如何声明和初始化常量变量。我们还将讨论它们的用途。 静态关键字将变量与类本身关联，而不是类的实例。 此外，最终关键字使变量不可变。其值在初始化后不能改变。..."},"headers":[{"level":3,"title":"2.1. 初始化静态最终变量","slug":"_2-1-初始化静态最终变量","link":"#_2-1-初始化静态最终变量","children":[]},{"level":3,"title":"2.2. 静态最终对象","slug":"_2-2-静态最终对象","link":"#_2-2-静态最终对象","children":[]},{"level":2,"title":"3. 常量为什么有用","slug":"_3-常量为什么有用","link":"#_3-常量为什么有用","children":[]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1719376358000,"updatedTime":1719376358000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.24,"words":972},"filePathRelative":"posts/baeldung/2024-06-26/2024-06-26-Static Final Variables in Java.md","localizedDate":"2024年6月26日","excerpt":"\\n<p>简单来说，静态最终变量，也称为常量，是Java中创建一个在初始化后不会改变的类变量的关键特性。然而，在静态最终对象引用的情况下，对象的状态可能会改变。</p>\\n<p>在本教程中，我们将学习如何声明和初始化常量变量。我们还将讨论它们的用途。</p>\\n<p>静态关键字将变量与类本身关联，而不是类的实例。</p>\\n<p>此外，最终关键字使变量不可变。其值在初始化后不能改变。</p>\\n<p>两个关键字的组合有助于创建常量。它们通常使用大写字母和下划线来分隔单词。</p>\\n<h3>2.1. 初始化静态最终变量</h3>\\n<p>以下是如何声明静态最终字段并赋值的示例：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">Bike</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">static</span> <span class=\\"token keyword\\">final</span> <span class=\\"token keyword\\">int</span> <span class=\\"token constant\\">TIRE</span> <span class=\\"token operator\\">=</span> <span class=\\"token number\\">2</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{d as comp,k as data};
