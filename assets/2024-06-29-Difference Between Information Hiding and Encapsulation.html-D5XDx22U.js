import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-DlW52zYa.js";const p={},e=t(`<h1 id="信息隐藏与封装的区别-baeldung" tabindex="-1"><a class="header-anchor" href="#信息隐藏与封装的区别-baeldung"><span>信息隐藏与封装的区别 | Baeldung</span></a></h1><p>封装是面向对象编程的一个基本范式。它允许将数据和方法在类中组合在一起。然而，封装本身并不能保证防御性编程。</p><p>为了实现健壮性，我们采用了信息隐藏。信息隐藏是一种编程原则，它提倡限制对内部实现细节的访问。</p><p>在本教程中，我们将探讨封装和信息隐藏的细节。此外，我们将查看一些示例代码并理解这两个概念之间的主要区别。</p><h2 id="_2-历史背景" tabindex="-1"><a class="header-anchor" href="#_2-历史背景"><span>2. 历史背景</span></a></h2><p><strong>1972年，Parnas首次提出“信息隐藏”一词，试图区分过程式编程和模块化编程。</strong></p><p>Parnas推断，数据的实现应对外部模块不可见。</p><p>此外，在1973年，Zelis提出了封装一词，以解释如何减少对类中底层数据的访问，以防止不必要的修改。</p><p><strong>1978年，Parnas声称封装和信息隐藏是同义词。然而，在2001年，Paul Roger通过示例代码展示了封装和信息隐藏之间的区别。他声称我们可以有封装而没有信息隐藏。</strong></p><p>封装是面向对象编程中的一个广泛概念，它将数据与操作数据的方法捆绑在一起。这确保了模块化设计。</p><p>封装和信息隐藏有时被用作同义词，但它们之间存在一些差异。</p><p>根据Paul Roger的说法，<strong>封装仅仅是将数据与操作数据的操作捆绑在一起。</strong></p><h3 id="_3-1-没有封装" tabindex="-1"><a class="header-anchor" href="#_3-1-没有封装"><span>3.1. 没有封装</span></a></h3><p>让我们看一个没有封装的示例类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Book</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> author<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> isbn<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里，《Book》类为其字段使用了公共访问修饰符。这使得字段可以从外部类访问。</p><p>让我们创建另一个名为《BookDetails》的类，以获取《Book》对象的详细信息：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">BookDetails</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">bookDetails</span><span class="token punctuation">(</span><span class="token class-name">Book</span> book<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">&quot;author name: &quot;</span> <span class="token operator">+</span> book<span class="token punctuation">.</span>author <span class="token operator">+</span> <span class="token string">&quot; ISBN: &quot;</span> <span class="token operator">+</span> book<span class="token punctuation">.</span>isbn<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>《BookDetails》类包含一个方法，该方法使用《Book》数据。在这里，我们将《Book》类视为数据容器，将《BookDetails》视为对数据执行操作的方法集合。</p><p>我们使用一种编程程序，强制创建一个实现类，该类操作来自另一个类的数据。这种编程风格是过时的，它不是模块化的。</p><p>以下是获取一本书详细信息的单元测试：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenUnencapsulatedClass_whenImplementationClassIsSeparate_thenReturnResult</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Book</span> myBook <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Book</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    myBook<span class="token punctuation">.</span>author <span class="token operator">=</span> <span class="token string">&quot;J.K Rowlings&quot;</span><span class="token punctuation">;</span>
    myBook<span class="token punctuation">.</span>isbn <span class="token operator">=</span> <span class="token number">67890</span><span class="token punctuation">;</span>
    <span class="token class-name">BookDetails</span> details <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BookDetails</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> result <span class="token operator">=</span> details<span class="token punctuation">.</span><span class="token function">bookDetails</span><span class="token punctuation">(</span>myBook<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;author name: &quot;</span> <span class="token operator">+</span> myBook<span class="token punctuation">.</span>author <span class="token operator">+</span> <span class="token string">&quot; ISBN: &quot;</span> <span class="token operator">+</span> myBook<span class="token punctuation">.</span>isbn<span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以上实现可以通过封装来简化。《Book》类的更改会影响使用《Book》数据的任何类。</p><h3 id="_3-2-有封装" tabindex="-1"><a class="header-anchor" href="#_3-2-有封装"><span>3.2. 有封装</span></a></h3><p>让我们使用封装改进上一节的设计。我们可以将数据和操作它的捆绑到一个单独的类中：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">BookEncapsulation</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> author<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> isbn<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token class-name">BookEncapsulation</span><span class="token punctuation">(</span><span class="token class-name">String</span> author<span class="token punctuation">,</span> <span class="token keyword">int</span> isbn<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>author <span class="token operator">=</span> author<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>isbn <span class="token operator">=</span> isbn<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getBookDetails</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">&quot;author name: &quot;</span> <span class="token operator">+</span> author <span class="token operator">+</span> <span class="token string">&quot; ISBN: &quot;</span> <span class="token operator">+</span> isbn<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们通过将实现与类捆绑在一起来改进代码。这使得代码模块化。客户端可以轻松调用《getBookDetails()》方法，而无需对其实现有太多了解。</p><p>让我们看看调用《getBookDetails()》的单元测试：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenEncapsulatedClass_whenDataIsNotHidden_thenReturnResult</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">BookEncapsulation</span> myBook <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BookEncapsulation</span><span class="token punctuation">(</span><span class="token string">&quot;J.K Rowlings&quot;</span><span class="token punctuation">,</span> <span class="token number">67890</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> result <span class="token operator">=</span> myBook<span class="token punctuation">.</span><span class="token function">getBookDetails</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;author name: &quot;</span> <span class="token operator">+</span> myBook<span class="token punctuation">.</span>author <span class="token operator">+</span> <span class="token string">&quot; ISBN: &quot;</span> <span class="token operator">+</span> myBook<span class="token punctuation">.</span>isbn<span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>封装改进了代码，但外部类可以修改《Book》数据，因为字段使用了公共访问修饰符。然而，<strong>封装没有严格规定使用哪种访问修饰符</strong>。我们可以使用公共、私有受保护的访问修饰符。</p><p>此外，<strong>封装有助于在不破坏使用类的外部代码的情况下向类引入功能</strong>。让我们通过引入一个《id》来修改《BookEncapsulation》类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token comment">// ...</span>
<span class="token keyword">public</span> <span class="token keyword">int</span> id <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token keyword">public</span> <span class="token class-name">BookEncapsulation</span><span class="token punctuation">(</span><span class="token class-name">String</span> author<span class="token punctuation">,</span> <span class="token keyword">int</span> isbn<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>author <span class="token operator">=</span> author<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>isbn <span class="token operator">=</span> isbn<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getBookDetails</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">&quot;author id: &quot;</span> <span class="token operator">+</span> id <span class="token operator">+</span> <span class="token string">&quot; author name: &quot;</span> <span class="token operator">+</span> author <span class="token operator">+</span> <span class="token string">&quot; ISBN: &quot;</span> <span class="token operator">+</span> isbn<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// ...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们引入了《id》字段，并修改了《getBookDetails()》返回的详细信息。这些内部更改不会破坏任何客户端代码。这使得封装功能强大且模块化。</p><p><strong>然而，我们可以通过应用“信息隐藏”的概念来使封装更加严格</strong>。封装本身对于防御性编程是不够的。我们需要将信息隐藏与封装结合使用，以防止不必要的数据修改。</p><h2 id="_4-信息隐藏" tabindex="-1"><a class="header-anchor" href="#_4-信息隐藏"><span>4. 信息隐藏</span></a></h2><p>信息隐藏是一种编程原则，旨在<strong>防止直接修改类的内部数据</strong>。此外，它提供了访问和修改类数据的严格指南。</p><p><strong>此外，它有助于隐藏设计实现细节，特别是那些可能会改变的设计实现细节</strong>。</p><p>此外，当信息隐藏与封装一起使用时，确保了模块化代码。</p><p>让我们通过应用信息隐藏来改进封装的类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">BookInformationHiding</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> author<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span> isbn<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span> id <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">BookInformationHiding</span><span class="token punctuation">(</span><span class="token class-name">String</span> author<span class="token punctuation">,</span> <span class="token keyword">int</span> isbn<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">setAuthor</span><span class="token punctuation">(</span>author<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">setIsbn</span><span class="token punctuation">(</span>isbn<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getAuthor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> author<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setAuthor</span><span class="token punctuation">(</span><span class="token class-name">String</span> author<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>author <span class="token operator">=</span> author<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">getIsbn</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> isbn<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setIsbn</span><span class="token punctuation">(</span><span class="token keyword">int</span> isbn<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>isbn <span class="token operator">=</span> isbn<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getBookDetails</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">&quot;author id: &quot;</span> <span class="token operator">+</span> id <span class="token operator">+</span> <span class="token string">&quot; author name: &quot;</span> <span class="token operator">+</span> author <span class="token operator">+</span> <span class="token string">&quot; ISBN: &quot;</span> <span class="token operator">+</span> isbn<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们使用私有访问修饰符来限制外部类对字段的访问和修改。此外，我们创建了getter和setter来设置字段如何被访问和修改。</p><p><strong>与没有信息隐藏的封装不同，后者可以使用任何访问修饰符，信息隐藏是通过使用私有访问修饰符来实现的</strong>。限制了只有类内部才能访问字段。</p><p>字段不能直接从客户端代码访问，从而使其更加健壮。</p><p>让我们看看修改后的类的单元测试：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenEncapsulatedClass_whenDataIsHidden_thenReturnResult</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">BookInformationHiding</span> myBook <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BookInformationHiding</span><span class="token punctuation">(</span><span class="token string">&quot;J.K Rowlings&quot;</span><span class="token punctuation">,</span> <span class="token number">67890</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> result <span class="token operator">=</span> myBook<span class="token punctuation">.</span><span class="token function">getBookDetails</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;author id: &quot;</span> <span class="token operator">+</span> <span class="token number">1</span> <span class="token operator">+</span> <span class="token string">&quot; author name: &quot;</span> <span class="token operator">+</span> myBook<span class="token punctuation">.</span><span class="token function">getAuthor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot; ISBN: &quot;</span> <span class="token operator">+</span> myBook<span class="token punctuation">.</span><span class="token function">getIsbn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此外，我们可以创建一个严格的规则来修改数据。例如，我们可以通过修改setter来避免ISBN为负数：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setIsbn</span><span class="token punctuation">(</span><span class="token keyword">int</span> isbn<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>isbn <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalArgumentException</span><span class="token punctuation">(</span><span class="token string">&quot;ISBN can&#39;t be negative&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>isbn <span class="token operator">=</span> isbn<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们创建了一个严格的规则来修改ISBN。</p><h2 id="_5-主要区别" tabindex="-1"><a class="header-anchor" href="#_5-主要区别"><span>5. 主要区别</span></a></h2><p>以下是显示封装和信息隐藏主要区别的摘要表：</p><table><thead><tr><th>信息隐藏</th><th>封装</th></tr></thead><tbody><tr><td>一种设计原则，用于隐藏实现细节和对数据的非预期修改</td><td>一个面向对象的原则，将数据与操作它们的函数捆绑在一起</td></tr><tr><td>严格使用私有访问修饰符</td><td>对访问修饰符不严格，可以使用公共、私有或受保护的访问修饰符</td></tr><tr><td>有助于实现防御性编程</td><td>实现信息隐藏的方法论</td></tr></tbody></table><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们学习了封装和信息隐藏的关键概念。此外，我们看到了示例代码，展示了封装和信息隐藏之间的微小差异。</p><p><strong>然而，有一种观点认为信息隐藏和封装是同义词。在封装一个类时，我们需要始终应用信息隐藏的原则。</strong></p><p>如常，示例的源代码可在GitHub上找到。</p>`,55),o=[e];function c(i,l){return a(),s("div",null,o)}const k=n(p,[["render",c],["__file","2024-06-29-Difference Between Information Hiding and Encapsulation.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-06-29/2024-06-29-Difference%20Between%20Information%20Hiding%20and%20Encapsulation.html","title":"信息隐藏与封装的区别 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Software Engineering","Java"],"tag":["Information Hiding","Encapsulation"],"head":[["meta",{"name":"keywords","content":"Java, Information Hiding, Encapsulation, OOP"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-29/2024-06-29-Difference%20Between%20Information%20Hiding%20and%20Encapsulation.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"信息隐藏与封装的区别 | Baeldung"}],["meta",{"property":"og:description","content":"信息隐藏与封装的区别 | Baeldung 封装是面向对象编程的一个基本范式。它允许将数据和方法在类中组合在一起。然而，封装本身并不能保证防御性编程。 为了实现健壮性，我们采用了信息隐藏。信息隐藏是一种编程原则，它提倡限制对内部实现细节的访问。 在本教程中，我们将探讨封装和信息隐藏的细节。此外，我们将查看一些示例代码并理解这两个概念之间的主要区别。 2..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-29T04:34:17.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Information Hiding"}],["meta",{"property":"article:tag","content":"Encapsulation"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-29T04:34:17.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"信息隐藏与封装的区别 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-29T04:34:17.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"信息隐藏与封装的区别 | Baeldung 封装是面向对象编程的一个基本范式。它允许将数据和方法在类中组合在一起。然而，封装本身并不能保证防御性编程。 为了实现健壮性，我们采用了信息隐藏。信息隐藏是一种编程原则，它提倡限制对内部实现细节的访问。 在本教程中，我们将探讨封装和信息隐藏的细节。此外，我们将查看一些示例代码并理解这两个概念之间的主要区别。 2..."},"headers":[{"level":2,"title":"2. 历史背景","slug":"_2-历史背景","link":"#_2-历史背景","children":[{"level":3,"title":"3.1. 没有封装","slug":"_3-1-没有封装","link":"#_3-1-没有封装","children":[]},{"level":3,"title":"3.2. 有封装","slug":"_3-2-有封装","link":"#_3-2-有封装","children":[]}]},{"level":2,"title":"4. 信息隐藏","slug":"_4-信息隐藏","link":"#_4-信息隐藏","children":[]},{"level":2,"title":"5. 主要区别","slug":"_5-主要区别","link":"#_5-主要区别","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1719635657000,"updatedTime":1719635657000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.94,"words":1782},"filePathRelative":"posts/baeldung/2024-06-29/2024-06-29-Difference Between Information Hiding and Encapsulation.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>封装是面向对象编程的一个基本范式。它允许将数据和方法在类中组合在一起。然而，封装本身并不能保证防御性编程。</p>\\n<p>为了实现健壮性，我们采用了信息隐藏。信息隐藏是一种编程原则，它提倡限制对内部实现细节的访问。</p>\\n<p>在本教程中，我们将探讨封装和信息隐藏的细节。此外，我们将查看一些示例代码并理解这两个概念之间的主要区别。</p>\\n<h2>2. 历史背景</h2>\\n<p><strong>1972年，Parnas首次提出“信息隐藏”一词，试图区分过程式编程和模块化编程。</strong></p>\\n<p>Parnas推断，数据的实现应对外部模块不可见。</p>\\n<p>此外，在1973年，Zelis提出了封装一词，以解释如何减少对类中底层数据的访问，以防止不必要的修改。</p>","autoDesc":true}');export{k as comp,d as data};
