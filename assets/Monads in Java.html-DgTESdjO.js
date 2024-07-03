import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-DlW52zYa.js";const p={},e=t('<h1 id="java中的单子模式-baeldung" tabindex="-1"><a class="header-anchor" href="#java中的单子模式-baeldung"><span>Java中的单子模式 | Baeldung</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在本教程中，我们将学习关于单子（monads），以及它们如何帮助我们处理副作用。我们将学习到关键的方法，这些方法使我们能够连接单子和操作：_map()<em>和_flatMap()</em>。在整篇文章中，我们将探索Java生态系统中一些流行的单子的API，重点关注它们的实际应用。</p><h2 id="_2-副作用" tabindex="-1"><a class="header-anchor" href="#_2-副作用"><span>2. 副作用</span></a></h2><p>在函数式编程中，“副作用”通常指的是那些超出函数或组件作用域的操作所引起的变化。</p><p>为了在处理这些副作用的同时应用函数式编程范式，我们可以将我们的操作或数据包装在一个容器中。<strong>我们可以将单子想象为容器，允许我们在函数作用域之外处理副作用，保持函数的纯度。</strong></p><p>例如，假设我们有一个函数，用于除以两个整数：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">double</span> <span class="token function">divide</span><span class="token punctuation">(</span><span class="token keyword">int</span> dividend<span class="token punctuation">,</span> <span class="token keyword">int</span> divisor<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> dividend <span class="token operator">/</span> divisor<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>虽然它看起来像是一个纯函数，但当我们将零作为_divisor_参数的值时，函数通过抛出一个_ArithmeticException_产生副作用。然而，我们可以使用一个单子来包装函数的结果并包含其效果。 让我们改变这个函数，让它返回一个_Optional<code>&lt;Double&gt;</code>_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Optional</span>``<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Double</span><span class="token punctuation">&gt;</span></span>`` <span class="token function">divide</span><span class="token punctuation">(</span><span class="token keyword">int</span> dividend<span class="token punctuation">,</span> <span class="token keyword">int</span> divisor<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>divisor <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">empty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n    <span class="token keyword">return</span> <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span>dividend <span class="token operator">/</span> divisor<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，当我们尝试除以零时，函数不再产生副作用。</p><p>以下是一些其他流行的Java单子示例，它们帮助我们处理各种副作用：</p><ul><li><em>Optional&lt;&gt;</em> - 处理空值</li><li><em>List&lt;&gt;, Stream&lt;&gt;</em> - 管理数据集合</li><li><em>Mono&lt;&gt;, CompletableFuture&lt;&gt;</em> - 处理并发和I/O</li><li><em>Try&lt;&gt;, Result&lt;&gt;</em> - 处理错误</li><li><em>Either&lt;&gt;</em> - 处理二元性</li></ul><h2 id="_3-函子" tabindex="-1"><a class="header-anchor" href="#_3-函子"><span>3. 函子</span></a></h2><p>当我们创建一个单子时，<strong>我们需要允许它改变其封装的对象或操作，同时保持相同的容器类型。</strong></p><p>以Java Streams为例。如果在“现实世界”中，一个_Long_类型的实例可以通过调用方法_Instant.ofEpochSeconds()<em>转换为_Instant</em>，那么这种关系必须在_Stream_的世界中得到保留。</p><p>为了实现这一点，<strong>Stream API公开了一个高阶函数，它“提升”了原始关系。这个概念也被称为“函子”，允许转换封装类型的方法是通常命名为“<em>map</em>”</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Stream</span>``<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Long</span><span class="token punctuation">&gt;</span></span>`` longs <span class="token operator">=</span> <span class="token class-name">Stream</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token number">1712000000L</span><span class="token punctuation">,</span> <span class="token number">1713000000L</span><span class="token punctuation">,</span> <span class="token number">1714000000L</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">Stream</span>``<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Instant</span><span class="token punctuation">&gt;</span></span>`` instants <span class="token operator">=</span> longs<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token class-name">Instant</span><span class="token operator">::</span><span class="token function">ofEpochSecond</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>尽管“<em>map</em>”是这种函数类型的典型术语，但特定的方法名称本身对于一个对象作为函子并不重要。例如，_CompletableFuture_单子提供了一个名为_thenApply()_的方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">CompletableFuture</span>``<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Long</span><span class="token punctuation">&gt;</span></span>`` timestamp <span class="token operator">=</span> <span class="token class-name">CompletableFuture</span><span class="token punctuation">.</span><span class="token function">completedFuture</span><span class="token punctuation">(</span><span class="token number">1713000000L</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">CompletableFuture</span>``<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Instant</span><span class="token punctuation">&gt;</span></span>`` instant <span class="token operator">=</span> timestamp<span class="token punctuation">.</span><span class="token function">thenApply</span><span class="token punctuation">(</span><span class="token class-name">Instant</span><span class="token operator">::</span><span class="token function">ofEpochSecond</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，_Stream_和_CompletableFuture_容器公开了方法，使我们能够应用封装数据支持的所有操作：</p><h2 id="_4-绑定" tabindex="-1"><a class="header-anchor" href="#_4-绑定"><span>4. 绑定</span></a></h2><p>**绑定是单子的一个关键特性，它允许我们在单子上下文中链接多个计算。**换句话说，我们可以通过替换_map()_来避免双重嵌套。</p><h3 id="_4-1-嵌套单子" tabindex="-1"><a class="header-anchor" href="#_4-1-嵌套单子"><span>4.1. 嵌套单子</span></a></h3><p>如果我们仅依赖于函子来序列化操作，我们最终会得到嵌套的容器。<strong>让我们使用Project Reactor的_Mono_单子作为这个例子。</strong></p><p>假设我们有两个方法，允许我们以响应式方式获取_Author_和_Book_实体：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Mono</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Author</span><span class="token punctuation">&gt;</span></span>```` <span class="token function">findAuthorByName</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">/* ... */</span> <span class="token punctuation">}</span>\n<span class="token class-name">Mono</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Book</span><span class="token punctuation">&gt;</span></span>```` <span class="token function">findLatestBookByAuthorId</span><span class="token punctuation">(</span><span class="token class-name">Long</span> authorId<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">/* ... */</span> <span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，如果我们从作者的名字开始，我们可以使第一个方法获取他的详细信息。结果是_Mono<code>&lt;Author&gt;</code>_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">void</span> <span class="token function">findLatestBookOfAuthor</span><span class="token punctuation">(</span><span class="token class-name">String</span> authorName<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">Mono</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Author</span><span class="token punctuation">&gt;</span></span>```` author <span class="token operator">=</span> <span class="token function">findAuthorByName</span><span class="token punctuation">(</span>authorName<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token comment">// ...</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>之后，我们可能会尝试使用_map()<em>方法将容器的内容从_Author_更改为他的最新的_Book</em>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Mono</span><span class="token operator">&lt;</span><span class="token class-name">Mono</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Book</span><span class="token punctuation">&gt;</span></span>````<span class="token operator">&gt;</span> book <span class="token operator">=</span> author<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>it <span class="token operator">-&gt;</span> <span class="token function">findLatestBookByAuthorId</span><span class="token punctuation">(</span>it<span class="token punctuation">.</span><span class="token function">authorId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>但是，正如我们所看到的，这导致了一个嵌套的_Mono_容器。这是因为_findLatestBookByAuthorId()<em>返回了一个_Mono<code>&lt;Book&gt;</code></em>，而_map()_又将结果包装了一次。</p><h3 id="_4-2-flatmap" tabindex="-1"><a class="header-anchor" href="#_4-2-flatmap"><span>4.2. <em>flatMap()</em></span></a></h3><p>然而，<strong>如果我们使用绑定代替，我们可以消除额外的容器并展平结构。</strong>“flatMap”这个名字通常被采用为绑定方法，尽管有一些例外，它被称为不同的名称：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">void</span> <span class="token function">findLatestBookOfAuthor</span><span class="token punctuation">(</span><span class="token class-name">String</span> authorName<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">Mono</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Author</span><span class="token punctuation">&gt;</span></span>```` author <span class="token operator">=</span> <span class="token function">findAuthorByName</span><span class="token punctuation">(</span>authorName<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">Mono</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Book</span><span class="token punctuation">&gt;</span></span>```` book <span class="token operator">=</span> author<span class="token punctuation">.</span><span class="token function">flatMap</span><span class="token punctuation">(</span>it <span class="token operator">-&gt;</span> <span class="token function">findLatestBookByAuthorId</span><span class="token punctuation">(</span>it<span class="token punctuation">.</span><span class="token function">authorId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token comment">// ...</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，我们可以通过内联操作来简化代码，并引入一个中间_map()<em>，它从_Author_转换到其_authorId</em>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">void</span> <span class="token function">findLatestBookOfAuthor</span><span class="token punctuation">(</span><span class="token class-name">String</span> authorName<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">Mono</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Book</span><span class="token punctuation">&gt;</span></span>```` book <span class="token operator">=</span> <span class="token function">findAuthorByName</span><span class="token punctuation">(</span>authorName<span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token class-name">Author</span><span class="token operator">::</span><span class="token function">authorId</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">flatMap</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token operator">::</span><span class="token function">findLatestBookByAuthorId</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token comment">// ...</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，<strong>结合_map()_和_flatMap()_是使用单子的一种有效方式，允许我们以声明性的方式定义一系列转换。</strong></p><h2 id="_5-实际用例" tabindex="-1"><a class="header-anchor" href="#_5-实际用例"><span>5. 实际用例</span></a></h2><p>正如我们在前面的代码示例中看到的，单子通过提供额外的抽象层来帮助我们处理副作用。<strong>大多数时候，它们使我们能够专注于主要场景，并在主逻辑之外处理边缘情况。</strong></p><h3 id="_5-1-铁路-模式" tabindex="-1"><a class="header-anchor" href="#_5-1-铁路-模式"><span>5.1. “铁路”模式</span></a></h3><p>像这样绑定单子也被称为“铁路”模式。<strong>我们可以通过想象一条直线进入的铁路来可视化主流程。此外，如果发生意外情况，我们将从主铁路切换到次要的并行铁路。</strong></p><p>让我们考虑验证一个_Book_对象。我们首先验证书的ISBN，然后检查_authorId_，最后验证书的genre：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">void</span> <span class="token function">validateBook</span><span class="token punctuation">(</span><span class="token class-name">Book</span> book<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">validIsbn</span><span class="token punctuation">(</span>book<span class="token punctuation">.</span><span class="token function">getIsbn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalArgumentException</span><span class="token punctuation">(</span><span class="token string">&quot;Invalid ISBN&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n    <span class="token class-name">Author</span> author <span class="token operator">=</span> authorRepository<span class="token punctuation">.</span><span class="token function">findById</span><span class="token punctuation">(</span>book<span class="token punctuation">.</span><span class="token function">getAuthorId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>author <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">AuthorNotFoundException</span><span class="token punctuation">(</span><span class="token string">&quot;Author not found&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>author<span class="token punctuation">.</span><span class="token function">genres</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span>book<span class="token punctuation">.</span><span class="token function">genre</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalArgumentException</span><span class="token punctuation">(</span><span class="token string">&quot;Author does not write in this genre&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>我们可以使用vavr的_Try_单子并将铁路模式应用于将这些验证链接在一起</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">void</span> <span class="token function">validateBook</span><span class="token punctuation">(</span><span class="token class-name">Book</span> bookToValidate<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">Try</span><span class="token punctuation">.</span><span class="token function">ofSupplier</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> bookToValidate<span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">andThen</span><span class="token punctuation">(</span>book <span class="token operator">-&gt;</span> <span class="token function">validateIsbn</span><span class="token punctuation">(</span>book<span class="token punctuation">.</span><span class="token function">getIsbn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>book <span class="token operator">-&gt;</span> <span class="token function">fetchAuthor</span><span class="token punctuation">(</span>book<span class="token punctuation">.</span><span class="token function">getAuthorId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">andThen</span><span class="token punctuation">(</span>author <span class="token operator">-&gt;</span> <span class="token function">validateBookGenre</span><span class="token punctuation">(</span>bookToValidate<span class="token punctuation">.</span><span class="token function">genre</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> author<span class="token punctuation">)</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">void</span> <span class="token function">validateIsbn</span><span class="token punctuation">(</span><span class="token class-name">String</span> isbn<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">/* ... */</span> <span class="token punctuation">}</span>\n\n<span class="token class-name">Author</span> <span class="token function">fetchAuthor</span><span class="token punctuation">(</span><span class="token class-name">Long</span> authorId<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">/* ... */</span> <span class="token punctuation">}</span>\n\n<span class="token keyword">void</span> <span class="token function">validateBookGenre</span><span class="token punctuation">(</span><span class="token class-name">String</span> genre<span class="token punctuation">,</span> <span class="token class-name">Author</span> author<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">/* ... */</span> <span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，API公开了像_andThen()_这样的方法，对于我们不需要它们响应的函数很有用。它们的目的是检查失败，并在需要时切换到次要通道。另一方面，像_map()_和_flatMap()_这样的方法旨在进一步推动流程，创建一个新的_Try&lt;&gt;_单子，包装函数的响应，在这种情况下，是_Author_对象：</p><h3 id="_5-2-恢复" tabindex="-1"><a class="header-anchor" href="#_5-2-恢复"><span>5.2. 恢复</span></a></h3><p>在某些情况下，**API允许我们从次要通道恢复到主通道。**大多数时候，这需要我们提供回退值。例如，当使用_Try&lt;&gt;_的API时，我们可以使用_recover()_方法从“失败”通道切换回主通道：</p><h3 id="_5-3-其他示例" tabindex="-1"><a class="header-anchor" href="#_5-3-其他示例"><span>5.3. 其他示例</span></a></h3><p>现在我们已经学习了单子的工作原理以及如何使用铁路模式绑定它们，我们理解了各种方法的实际名称是无关紧要的。相反，我们应该关注它们的目的。大多数单子API的方法：</p><ul><li>转换底层数据</li><li>如有需要，在通道之间切换</li></ul><p>例如，_Optional_单子使用_map()_和_flatMap()_来转换其数据，分别使用_filter()_和_or()_在“空”和“存在”状态之间可能切换。</p><p>另一方面，_CompletableFuture_使用像_thenApply()_和_thenCombine()_而不是_map()<em>和_flatMap()</em>，并允许我们通过_exceptionally()_从失败通道中恢复。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们讨论了单子及其主要特性。我们使用实际示例来理解它们如何帮助我们处理副作用，例如管理集合、并发、空值、异常等。之后，我们学习了如何应用“铁路”模式来绑定单子，并将所有这些副作用推出我们组件的作用域之外。</p><p>如常，完整的源代码可以在GitHub上找到。</p><p>发表帖子后的30天内开放评论。对于任何问题过去这个日期，使用网站上的联系表单。</p><p>评论在文章发布后30天内开放。</p>',59),o=[e];function c(l,i){return s(),a("div",null,o)}const k=n(p,[["render",c],["__file","Monads in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/Archive/Monads%20in%20Java.html","title":"Java中的单子模式 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-06-15T00:00:00.000Z","category":["Java"],"tag":["Monads","Functional Programming"],"description":"Java中的单子模式 | Baeldung 1. 概述 在本教程中，我们将学习关于单子（monads），以及它们如何帮助我们处理副作用。我们将学习到关键的方法，这些方法使我们能够连接单子和操作：_map()和_flatMap()。在整篇文章中，我们将探索Java生态系统中一些流行的单子的API，重点关注它们的实际应用。 2. 副作用 在函数式编程中，“...","head":[["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/Monads%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中的单子模式 | Baeldung"}],["meta",{"property":"og:description","content":"Java中的单子模式 | Baeldung 1. 概述 在本教程中，我们将学习关于单子（monads），以及它们如何帮助我们处理副作用。我们将学习到关键的方法，这些方法使我们能够连接单子和操作：_map()和_flatMap()。在整篇文章中，我们将探索Java生态系统中一些流行的单子的API，重点关注它们的实际应用。 2. 副作用 在函数式编程中，“..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Monads"}],["meta",{"property":"article:tag","content":"Functional Programming"}],["meta",{"property":"article:published_time","content":"2024-06-15T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中的单子模式 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-15T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]]},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 副作用","slug":"_2-副作用","link":"#_2-副作用","children":[]},{"level":2,"title":"3. 函子","slug":"_3-函子","link":"#_3-函子","children":[]},{"level":2,"title":"4. 绑定","slug":"_4-绑定","link":"#_4-绑定","children":[{"level":3,"title":"4.1. 嵌套单子","slug":"_4-1-嵌套单子","link":"#_4-1-嵌套单子","children":[]},{"level":3,"title":"4.2. flatMap()","slug":"_4-2-flatmap","link":"#_4-2-flatmap","children":[]}]},{"level":2,"title":"5. 实际用例","slug":"_5-实际用例","link":"#_5-实际用例","children":[{"level":3,"title":"5.1. “铁路”模式","slug":"_5-1-铁路-模式","link":"#_5-1-铁路-模式","children":[]},{"level":3,"title":"5.2. 恢复","slug":"_5-2-恢复","link":"#_5-2-恢复","children":[]},{"level":3,"title":"5.3. 其他示例","slug":"_5-3-其他示例","link":"#_5-3-其他示例","children":[]}]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":6.67,"words":2002},"filePathRelative":"posts/baeldung/Archive/Monads in Java.md","localizedDate":"2024年6月15日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>在本教程中，我们将学习关于单子（monads），以及它们如何帮助我们处理副作用。我们将学习到关键的方法，这些方法使我们能够连接单子和操作：_map()<em>和_flatMap()</em>。在整篇文章中，我们将探索Java生态系统中一些流行的单子的API，重点关注它们的实际应用。</p>\\n<h2>2. 副作用</h2>\\n<p>在函数式编程中，“副作用”通常指的是那些超出函数或组件作用域的操作所引起的变化。</p>\\n<p>为了在处理这些副作用的同时应用函数式编程范式，我们可以将我们的操作或数据包装在一个容器中。<strong>我们可以将单子想象为容器，允许我们在函数作用域之外处理副作用，保持函数的纯度。</strong></p>","autoDesc":true}');export{k as comp,d as data};
