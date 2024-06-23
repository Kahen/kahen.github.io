import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-C3BVsZqC.js";const p={},e=t('<h1 id="mockito中doanswer-和thenreturn-的区别-baeldung" tabindex="-1"><a class="header-anchor" href="#mockito中doanswer-和thenreturn-的区别-baeldung"><span>Mockito中doAnswer()和thenReturn()的区别 | Baeldung</span></a></h1><p>Mockito是一个广泛使用的Java应用程序单元测试框架。它提供了各种API来模拟对象的行为。在本教程中，我们将探讨doAnswer()和thenReturn()存根技术的用法，并进行比较。我们可以在某些情况下使用这两种API来存根或模拟方法，但在某些情况下，我们只能使用其中之一。</p><p>我们的代码将结合使用Mockito和JUnit 5作为我们的代码示例，并且我们需要在我们的pom.xml文件中添加一些依赖项：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>```org.junit.jupiter```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>```junit-jupiter-api```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>```5.10.0```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">&gt;</span></span>```test```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">&gt;</span></span>```\n```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>```org.junit.jupiter```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>```junit-jupiter-engine```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>```5.10.0```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">&gt;</span></span>```test```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">&gt;</span></span>```\n```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>```org.mockito```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>```mockito-core```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>```5.11.0```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">&gt;</span></span>```test```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">&gt;</span></span>```\n```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以在Maven中央仓库中找到JUnit 5 API库、JUnit 5引擎库和Mockito库。</p><p>使用thenReturn()存根方法 我们可以在Mockito中使用thenReturn()存根技术来存根返回值的方法。为了演示，我们将使用thenReturn()和doAnswer()测试列表的get()和add()操作：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">BaeldungList</span> <span class="token keyword">extends</span> <span class="token class-name">AbstractList</span>`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>` <span class="token punctuation">{</span>\n    <span class="token annotation punctuation">@Override</span>\n    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">get</span><span class="token punctuation">(</span><span class="token keyword">final</span> <span class="token keyword">int</span> index<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token annotation punctuation">@Override</span>\n    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">int</span> index<span class="token punctuation">,</span> <span class="token class-name">String</span> element<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token comment">// 无操作</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token annotation punctuation">@Override</span>\n    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的示例代码中，get()方法返回一个String。首先，我们将使用thenReturn()存根get()方法，并通过断言其返回值与存根方法相同来验证调用：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">givenThenReturn_whenGetCalled_thenValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">BaeldungList</span> myList <span class="token operator">=</span> <span class="token function">mock</span><span class="token punctuation">(</span><span class="token class-name">BaeldungList</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token function">when</span><span class="token punctuation">(</span>myList<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token function">anyInt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">thenReturn</span><span class="token punctuation">(</span><span class="token string">&quot;answer me&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;answer me&quot;</span><span class="token punctuation">,</span> myList<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-1-使用thenreturn-存根方法返回多个值" tabindex="-1"><a class="header-anchor" href="#_3-1-使用thenreturn-存根方法返回多个值"><span>3.1 使用thenReturn()存根方法返回多个值</span></a></h3><p>除此之外，thenReturn() API允许在连续调用中返回不同的值。我们可以链式调用其返回多个值。此外，我们可以在单个方法调用中传递多个值：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">givenThenReturn_whenGetCalled_thenReturnChaining</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">BaeldungList</span> myList <span class="token operator">=</span> <span class="token function">mock</span><span class="token punctuation">(</span><span class="token class-name">BaeldungList</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token function">when</span><span class="token punctuation">(</span>myList<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token function">anyInt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">thenReturn</span><span class="token punctuation">(</span><span class="token string">&quot;answer one&quot;</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">thenReturn</span><span class="token punctuation">(</span><span class="token string">&quot;answer two&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;answer one&quot;</span><span class="token punctuation">,</span> myList<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;answer two&quot;</span><span class="token punctuation">,</span> myList<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">givenThenReturn_whenGetCalled_thenMultipleValues</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">BaeldungList</span> myList <span class="token operator">=</span> <span class="token function">mock</span><span class="token punctuation">(</span><span class="token class-name">BaeldungList</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token function">when</span><span class="token punctuation">(</span>myList<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token function">anyInt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">thenReturn</span><span class="token punctuation">(</span><span class="token string">&quot;answer one&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;answer two&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;answer one&quot;</span><span class="token punctuation">,</span> myList<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;answer two&quot;</span><span class="token punctuation">,</span> myList<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用doAnswer()存根void方法 add()方法是一个void方法，不返回任何内容。我们不能使用thenReturn()存根add()方法，因为thenReturn()存根不能用于void方法。**相反，我们将使用doAnswer()，它允许存根void方法。**所以，我们将使用doAnswer()存根add()方法，当调用add()方法时，存根中提供的Answer将被调用：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">givenDoAnswer_whenAddCalled_thenAnswered</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">BaeldungList</span> myList <span class="token operator">=</span> <span class="token function">mock</span><span class="token punctuation">(</span><span class="token class-name">BaeldungList</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token function">doAnswer</span><span class="token punctuation">(</span>invocation <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>\n        <span class="token class-name">Object</span> index <span class="token operator">=</span> invocation<span class="token punctuation">.</span><span class="token function">getArgument</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token class-name">Object</span> element <span class="token operator">=</span> invocation<span class="token punctuation">.</span><span class="token function">getArgument</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n        <span class="token comment">// 验证调用是否使用正确的索引和元素调用</span>\n        <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> index<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;answer&quot;</span><span class="token punctuation">,</span> element<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n        <span class="token comment">// 返回null，因为这是一个void方法</span>\n        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">when</span><span class="token punctuation">(</span>myList<span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token function">any</span><span class="token punctuation">(</span><span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">any</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    myList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token string">&quot;answer&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在doAnswer()中，我们验证对add()方法的调用，并断言它被调用时使用的参数是预期的。</p><h3 id="_4-1-使用doanswer-存根非void方法" tabindex="-1"><a class="header-anchor" href="#_4-1-使用doanswer-存根非void方法"><span>4.1 使用doAnswer()存根非void方法</span></a></h3><p>由于我们可以使用返回值的Answer来存根方法，而不是null，我们可以使用doAnswer()方法来存根非void方法。例如，我们将通过使用doAnswer()存根get()方法并返回一个返回String的Answer来测试get()方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">givenDoAnswer_whenGetCalled_thenAnswered</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">BaeldungList</span> myList <span class="token operator">=</span> <span class="token function">mock</span><span class="token punctuation">(</span><span class="token class-name">BaeldungList</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token function">doAnswer</span><span class="token punctuation">(</span>invocation <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>\n        <span class="token class-name">Object</span> index <span class="token operator">=</span> invocation<span class="token punctuation">.</span><span class="token function">getArgument</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n        <span class="token comment">// 验证调用是否使用索引调用</span>\n        <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> index<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n        <span class="token comment">// 返回我们想要的值</span>\n        <span class="token keyword">return</span> <span class="token string">&quot;answer me&quot;</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">when</span><span class="token punctuation">(</span>myList<span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token function">any</span><span class="token punctuation">(</span><span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;answer me&quot;</span><span class="token punctuation">,</span> myList<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2-使用doanswer-存根方法返回多个值" tabindex="-1"><a class="header-anchor" href="#_4-2-使用doanswer-存根方法返回多个值"><span>4.2 使用doAnswer()存根方法返回多个值</span></a></h3><p>我们必须注意，在doAnswer()方法中，我们只能返回一个Answer。然而，我们可以在doAnswer()方法中放置条件逻辑，根据调用的参数返回不同的值。因此，在下面的示例代码中，我们将根据调用get()方法时使用的索引返回不同的值：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">givenDoAnswer_whenGetCalled_thenAnsweredConditionally</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">BaeldungList</span> myList <span class="token operator">=</span> <span class="token function">mock</span><span class="token punctuation">(</span><span class="token class-name">BaeldungList</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token function">doAnswer</span><span class="token punctuation">(</span>invocation <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>\n        <span class="token class-name">Integer</span> index <span class="token operator">=</span> invocation<span class="token punctuation">.</span><span class="token function">getArgument</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">switch</span> <span class="token punctuation">(</span>index<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token keyword">case</span> <span class="token number">1</span><span class="token operator">:</span>\n                <span class="token keyword">return</span> <span class="token string">&quot;answer one&quot;</span><span class="token punctuation">;</span>\n            <span class="token keyword">case</span> <span class="token number">2</span><span class="token operator">:</span>\n                <span class="token keyword">return</span> <span class="token string">&quot;answer two&quot;</span><span class="token punctuation">;</span>\n            <span class="token keyword">default</span><span class="token operator">:</span>\n                <span class="token keyword">return</span> <span class="token string">&quot;answer &quot;</span> <span class="token operator">+</span> index<span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">when</span><span class="token punctuation">(</span>myList<span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token function">anyInt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;answer one&quot;</span><span class="token punctuation">,</span> myList<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;answer two&quot;</span><span class="token punctuation">,</span> myList<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;answer 3&quot;</span><span class="token punctuation">,</span> myList<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h1><p>Mockito框架提供了许多存根/模拟技术，如doAnswer()、doReturn()、thenReturn()、thenAnswer()等，以促进各种类型和风格的Java代码及其测试。我们已经使用doAnswer()和thenReturn()来存根非void方法并执行类似的测试。**然而，我们只能使用doAnswer()来存根void方法，因为thenReturn()方法无法执行此功能。**像往常一样，我们所有的代码示例都在GitHub上提供。</p><p>OK</p>',26),o=[e];function c(l,i){return a(),s("div",null,o)}const d=n(p,[["render",c],["__file","The Difference Between doAnswer   and thenReturn   in Mockito.html.vue"]]),r=JSON.parse('{"path":"/posts/baeldung/Archive/The%20Difference%20Between%20doAnswer%20%20%20and%20thenReturn%20%20%20in%20Mockito.html","title":"Mockito中doAnswer()和thenReturn()的区别 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-06-15T00:00:00.000Z","category":["Testing","Java"],"tag":["Mockito","JUnit","doAnswer","thenReturn"],"description":"Mockito中doAnswer()和thenReturn()的区别 | Baeldung Mockito是一个广泛使用的Java应用程序单元测试框架。它提供了各种API来模拟对象的行为。在本教程中，我们将探讨doAnswer()和thenReturn()存根技术的用法，并进行比较。我们可以在某些情况下使用这两种API来存根或模拟方法，但在某些情况下，...","head":[["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/The%20Difference%20Between%20doAnswer%20%20%20and%20thenReturn%20%20%20in%20Mockito.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Mockito中doAnswer()和thenReturn()的区别 | Baeldung"}],["meta",{"property":"og:description","content":"Mockito中doAnswer()和thenReturn()的区别 | Baeldung Mockito是一个广泛使用的Java应用程序单元测试框架。它提供了各种API来模拟对象的行为。在本教程中，我们将探讨doAnswer()和thenReturn()存根技术的用法，并进行比较。我们可以在某些情况下使用这两种API来存根或模拟方法，但在某些情况下，..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Mockito"}],["meta",{"property":"article:tag","content":"JUnit"}],["meta",{"property":"article:tag","content":"doAnswer"}],["meta",{"property":"article:tag","content":"thenReturn"}],["meta",{"property":"article:published_time","content":"2024-06-15T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Mockito中doAnswer()和thenReturn()的区别 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-15T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]]},"headers":[{"level":3,"title":"3.1 使用thenReturn()存根方法返回多个值","slug":"_3-1-使用thenreturn-存根方法返回多个值","link":"#_3-1-使用thenreturn-存根方法返回多个值","children":[]},{"level":3,"title":"4.1 使用doAnswer()存根非void方法","slug":"_4-1-使用doanswer-存根非void方法","link":"#_4-1-使用doanswer-存根非void方法","children":[]},{"level":3,"title":"4.2 使用doAnswer()存根方法返回多个值","slug":"_4-2-使用doanswer-存根方法返回多个值","link":"#_4-2-使用doanswer-存根方法返回多个值","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":3.66,"words":1099},"filePathRelative":"posts/baeldung/Archive/The Difference Between doAnswer   and thenReturn   in Mockito.md","localizedDate":"2024年6月15日","excerpt":"\\n<p>Mockito是一个广泛使用的Java应用程序单元测试框架。它提供了各种API来模拟对象的行为。在本教程中，我们将探讨doAnswer()和thenReturn()存根技术的用法，并进行比较。我们可以在某些情况下使用这两种API来存根或模拟方法，但在某些情况下，我们只能使用其中之一。</p>\\n<p>我们的代码将结合使用Mockito和JUnit 5作为我们的代码示例，并且我们需要在我们的pom.xml文件中添加一些依赖项：</p>\\n<div class=\\"language-xml\\" data-ext=\\"xml\\" data-title=\\"xml\\"><pre class=\\"language-xml\\"><code>```<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>dependency</span><span class=\\"token punctuation\\">&gt;</span></span>```\\n    ```<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>groupId</span><span class=\\"token punctuation\\">&gt;</span></span>```org.junit.jupiter```<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>groupId</span><span class=\\"token punctuation\\">&gt;</span></span>```\\n    ```<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>artifactId</span><span class=\\"token punctuation\\">&gt;</span></span>```junit-jupiter-api```<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>artifactId</span><span class=\\"token punctuation\\">&gt;</span></span>```\\n    ```<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>version</span><span class=\\"token punctuation\\">&gt;</span></span>```5.10.0```<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>version</span><span class=\\"token punctuation\\">&gt;</span></span>```\\n    ```<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>scope</span><span class=\\"token punctuation\\">&gt;</span></span>```test```<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>scope</span><span class=\\"token punctuation\\">&gt;</span></span>```\\n```<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>dependency</span><span class=\\"token punctuation\\">&gt;</span></span>```\\n</code></pre></div>","autoDesc":true}');export{d as comp,r as data};
