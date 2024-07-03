import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-BtbBZiJO.js";const e={},p=t(`<h1 id="java中通过引用传递字符串" tabindex="-1"><a class="header-anchor" href="#java中通过引用传递字符串"><span>Java中通过引用传递字符串</span></a></h1><ol><li>概述</li></ol><p>有时，我们可能希望在Java中的方法内传递并修改一个字符串。例如，当我们想要将另一个字符串附加到输入的字符串上。然而，输入变量在方法内部有其作用域。此外，字符串是不可变的。因此，如果我们不理解Java的内存管理，找到解决方案就不清楚了。</p><p>在本教程中，我们将理解输入字符串是如何传递给方法的。我们将看到如何使用StringBuilder以及如何通过创建新对象来保持不变性。</p><ol start="2"><li>按值传递还是按引用传递</li></ol><p>作为面向对象的语言，Java可以定义原始类型和对象。它们可以存储在栈或堆内存中。此外，它们可以通过值或引用传递给方法。</p><h3 id="_2-1-原始类型和对象" tabindex="-1"><a class="header-anchor" href="#_2-1-原始类型和对象"><span>2.1 原始类型和对象</span></a></h3><p><strong>原始类型在栈内存中分配。当传递给方法时，我们得到原始类型值的一个副本。</strong></p><p><strong>对象是类模板的实例。它们存储在堆内存中。</strong> 然而，在方法内部，程序可以访问它们，因为它有一个指向堆内存地址的引用。<strong>与原始类型类似，当传递对象给方法时，我们得到对象引用（我们可以将其视为指针）的一个副本。</strong></p><p>尽管传递原始类型或对象之间存在差异，但在两种情况下，变量或对象在方法内部都有其作用域。在两种情况下，发生的都是按共享调用，我们不能直接更新原始值或引用。<strong>因此，参数总是被复制。</strong></p><h3 id="_2-2-字符串不变性" tabindex="-1"><a class="header-anchor" href="#_2-2-字符串不变性"><span>2.2 字符串不变性</span></a></h3><p>字符串是Java中的一个类，而不是原始类型。因此，给定其运行时实例，我们在传递它给方法时会得到一个引用。</p><p>此外，它是不可变的。<strong>因此，即使我们想在方法内操作字符串，我们也不能修改它，除非我们创建一个新的。</strong></p><ol start="3"><li>使用案例</li></ol><p>在深入问题一般解决方案之前，让我们定义一个主要的使用案例。</p><p>假设我们想在方法内追加一个输入字符串。让我们测试方法执行前后会发生什么：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenAString_whenPassedToVoidMethod_thenStringIsNotModified</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> s <span class="token operator">=</span> <span class="token string">&quot;hello&quot;</span><span class="token punctuation">;</span>
    <span class="token function">concatStringWithNoReturn</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;hello&quot;</span><span class="token punctuation">,</span> s<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">void</span> <span class="token function">concatStringWithNoReturn</span><span class="token punctuation">(</span><span class="token class-name">String</span> input<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    input <span class="token operator">+=</span> <span class="token string">&quot; world&quot;</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;hello world&quot;</span><span class="token punctuation">,</span> input<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>字符串在concatStringWithNoReturn()方法内得到了一个新的值。然而，我们在方法的作用域之外仍然有原始值。</strong></p><p>自然地，一个逻辑解决方案是让一个方法返回一个新的字符串：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenAString_whenPassedToMethodAndReturnNewString_thenStringIsModified</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> s <span class="token operator">=</span> <span class="token string">&quot;hello&quot;</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;hello world&quot;</span><span class="token punctuation">,</span> <span class="token function">concatString</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token class-name">String</span> <span class="token function">concatStringWithReturn</span><span class="token punctuation">(</span><span class="token class-name">String</span> input<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> input <span class="token operator">+</span> <span class="token string">&quot; world&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>值得注意的是，我们避免了副作用，同时安全地返回了一个新的实例。</p><ol start="4"><li>使用StringBuilder或StringBuffer</li></ol><p><strong>尽管字符串连接是一个选项，但使用StringBuilder（或线程安全的StringBuffer版本）是更好的实践。</strong></p><h3 id="_4-1-stringbuilder" tabindex="-1"><a class="header-anchor" href="#_4-1-stringbuilder"><span>4.1 StringBuilder</span></a></h3><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenAString_whenPassStringBuilderToVoidMethod_thenConcatNewStringOk</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">StringBuilder</span> builder <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringBuilder</span><span class="token punctuation">(</span><span class="token string">&quot;hello&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">concatWithStringBuilder</span><span class="token punctuation">(</span>builder<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;hello world&quot;</span><span class="token punctuation">,</span> builder<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">void</span> <span class="token function">concatWithStringBuilder</span><span class="token punctuation">(</span><span class="token class-name">StringBuilder</span> input<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    input<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot; world&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们附加到构建器的字符串是暂时存储在一个字符数组中的。因此，与字符串连接相比，这种方法的主要好处是性能方面的。因此，我们不会每次都创建一个新的字符串。相反，我们等到我们有了想要的序列，然后，在那一刻，制作所需的字符串。</p><h3 id="_4-2-stringbuffer" tabindex="-1"><a class="header-anchor" href="#_4-2-stringbuffer"><span>4.2 StringBuffer</span></a></h3><p>我们还有线程安全的版本，StringBuffer。让我们也看看这个在行动中：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenAString_whenPassStringBufferToVoidMethod_thenConcatNewStringOk</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">StringBuffer</span> builder <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringBuffer</span><span class="token punctuation">(</span><span class="token string">&quot;hello&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">concatWithStringBuffer</span><span class="token punctuation">(</span>builder<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;hello world&quot;</span><span class="token punctuation">,</span> builder<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">void</span> <span class="token function">concatWithStringBuffer</span><span class="token punctuation">(</span><span class="token class-name">StringBuffer</span> input<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    input<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot; world&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们需要同步，这是我们想要的类。自然，这可能会减慢进程，所以让我们首先了解它是否值得。</p><ol start="5"><li>使用对象属性</li></ol><p>如果一个字符串是一个对象属性怎么办？</p><p>让我们定义一个我们可以用于测试的简单类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Dummy</span> <span class="token punctuation">{</span>

    <span class="token class-name">String</span> dummyString<span class="token punctuation">;</span>
    <span class="token comment">// getter和setter</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-1-使用setter修改字符串状态" tabindex="-1"><a class="header-anchor" href="#_5-1-使用setter修改字符串状态"><span>5.1 使用setter修改字符串状态</span></a></h3><p>起初，我们可能会考虑简单地使用setter来修改对象的字符串状态：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenObjectWithStringField_whenSetDifferentValue_thenObjectIsModified</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Dummy</span> dummy <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Dummy</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertNull</span><span class="token punctuation">(</span>dummy<span class="token punctuation">.</span><span class="token function">getDummyString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">modifyStringValueInInputObject</span><span class="token punctuation">(</span>dummy<span class="token punctuation">,</span> <span class="token string">&quot;hello world&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;hello world&quot;</span><span class="token punctuation">,</span> dummy<span class="token punctuation">.</span><span class="token function">getDummyString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">void</span> <span class="token function">modifyStringValueInInputObject</span><span class="token punctuation">(</span><span class="token class-name">Dummy</span> dummy<span class="token punctuation">,</span> <span class="token class-name">String</span> dummyString<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    dummy<span class="token punctuation">.</span><span class="token function">setDummyString</span><span class="token punctuation">(</span>dummyString<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>值得注意的是，我们将更新堆内存中原始对象的一个副本（仍然指向实际值）。</p><p>然而，这不是一个好的实践。它隐藏了字符串的变化。此外，如果多个线程试图修改对象，我们可能会有同步问题。</p><p><strong>总的来说，只要可能，我们应该寻求不变性，并使方法返回一个新对象。</strong></p><h3 id="_5-2-创建一个新对象" tabindex="-1"><a class="header-anchor" href="#_5-2-创建一个新对象"><span>5.2 创建一个新对象</span></a></h3><p>当应用一些业务逻辑时，使方法返回新对象是一个好习惯。此外，我们还可以使用我们之前看到的StringBuilder模式来设置属性。让我们将这个包装在一个测试用例中：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenObjectWithStringField_whenSetDifferentValueWithStringBuilder_thenSetStringInNewObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;hello world&quot;</span><span class="token punctuation">,</span> <span class="token function">getDummy</span><span class="token punctuation">(</span><span class="token string">&quot;hello&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;world&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getDummyString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token class-name">Dummy</span> <span class="token function">getDummy</span><span class="token punctuation">(</span><span class="token class-name">String</span> hello<span class="token punctuation">,</span> <span class="token class-name">String</span> world<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">StringBuilder</span> builder <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    builder<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span>hello<span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot; &quot;</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span>world<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">Dummy</span> dummy <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Dummy</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    dummy<span class="token punctuation">.</span><span class="token function">setDummyString</span><span class="token punctuation">(</span>builder<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> dummy<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>尽管这是一个简化的例子，我们可以看到代码更具可读性。此外，我们避免了副作用并保持了不变性。<strong>任何方法的输入信息都是我们用来构建一个明确定义的新对象实例的东西。</strong></p><ol start="6"><li>结论</li></ol><p>在这篇文章中，我们看到了如何在保持不变性和避免副作用的同时改变方法的输入字符串。我们看到了如何使用StringBuilder并应用这种模式来创建新对象。</p><p>正如文章中所展示的代码，它在GitHub上也是可用的。</p>`,47),i=[p];function o(c,l){return a(),s("div",null,i)}const d=n(e,[["render",o],["__file","2024-06-28-Passing Strings by Reference in Java.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-06-28/2024-06-28-Passing%20Strings%20by%20Reference%20in%20Java.html","title":"Java中通过引用传递字符串","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","String"],"tag":["Java","String","StringBuilder","StringBuffer","引用传递"],"head":[["meta",{"name":"keywords","content":"Java, String, 引用传递, StringBuilder, StringBuffer"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-28/2024-06-28-Passing%20Strings%20by%20Reference%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中通过引用传递字符串"}],["meta",{"property":"og:description","content":"Java中通过引用传递字符串 概述 有时，我们可能希望在Java中的方法内传递并修改一个字符串。例如，当我们想要将另一个字符串附加到输入的字符串上。然而，输入变量在方法内部有其作用域。此外，字符串是不可变的。因此，如果我们不理解Java的内存管理，找到解决方案就不清楚了。 在本教程中，我们将理解输入字符串是如何传递给方法的。我们将看到如何使用Strin..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-28T12:49:16.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"String"}],["meta",{"property":"article:tag","content":"StringBuilder"}],["meta",{"property":"article:tag","content":"StringBuffer"}],["meta",{"property":"article:tag","content":"引用传递"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-28T12:49:16.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中通过引用传递字符串\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-28T12:49:16.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中通过引用传递字符串 概述 有时，我们可能希望在Java中的方法内传递并修改一个字符串。例如，当我们想要将另一个字符串附加到输入的字符串上。然而，输入变量在方法内部有其作用域。此外，字符串是不可变的。因此，如果我们不理解Java的内存管理，找到解决方案就不清楚了。 在本教程中，我们将理解输入字符串是如何传递给方法的。我们将看到如何使用Strin..."},"headers":[{"level":3,"title":"2.1 原始类型和对象","slug":"_2-1-原始类型和对象","link":"#_2-1-原始类型和对象","children":[]},{"level":3,"title":"2.2 字符串不变性","slug":"_2-2-字符串不变性","link":"#_2-2-字符串不变性","children":[]},{"level":3,"title":"4.1 StringBuilder","slug":"_4-1-stringbuilder","link":"#_4-1-stringbuilder","children":[]},{"level":3,"title":"4.2 StringBuffer","slug":"_4-2-stringbuffer","link":"#_4-2-stringbuffer","children":[]},{"level":3,"title":"5.1 使用setter修改字符串状态","slug":"_5-1-使用setter修改字符串状态","link":"#_5-1-使用setter修改字符串状态","children":[]},{"level":3,"title":"5.2 创建一个新对象","slug":"_5-2-创建一个新对象","link":"#_5-2-创建一个新对象","children":[]}],"git":{"createdTime":1719578956000,"updatedTime":1719578956000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.94,"words":1482},"filePathRelative":"posts/baeldung/2024-06-28/2024-06-28-Passing Strings by Reference in Java.md","localizedDate":"2022年4月1日","excerpt":"\\n<ol>\\n<li>概述</li>\\n</ol>\\n<p>有时，我们可能希望在Java中的方法内传递并修改一个字符串。例如，当我们想要将另一个字符串附加到输入的字符串上。然而，输入变量在方法内部有其作用域。此外，字符串是不可变的。因此，如果我们不理解Java的内存管理，找到解决方案就不清楚了。</p>\\n<p>在本教程中，我们将理解输入字符串是如何传递给方法的。我们将看到如何使用StringBuilder以及如何通过创建新对象来保持不变性。</p>\\n<ol start=\\"2\\">\\n<li>按值传递还是按引用传递</li>\\n</ol>\\n<p>作为面向对象的语言，Java可以定义原始类型和对象。它们可以存储在栈或堆内存中。此外，它们可以通过值或引用传递给方法。</p>","autoDesc":true}');export{d as comp,k as data};
