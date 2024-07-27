import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-CJGTm_7y.js";const p={},e=t(`<h1 id="java单元测试中单个断言调用多个属性" tabindex="-1"><a class="header-anchor" href="#java单元测试中单个断言调用多个属性"><span>Java单元测试中单个断言调用多个属性</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>作为程序员，我们经常编写测试以确保我们的代码按预期工作。在测试中的一个标准做法是使用断言。</p><p>当我们想要验证一个对象的多个属性时，我们可以编写一堆断言来完成这项工作。</p><p>然而，在本教程中，我们将探讨如何在单个断言调用中验证多个属性。</p><h2 id="_2-问题介绍" tabindex="-1"><a class="header-anchor" href="#_2-问题介绍"><span>2. 问题介绍</span></a></h2><p>在许多情况下，我们需要检查一个对象的多个属性。传统上，这意味着为每个属性编写单独的断言语句，这可能会使代码冗长且难以阅读。</p><p>然而，更好的方法是使用单个断言调用来验证多个属性。接下来，让我们看看如何做到这一点。</p><p>为了更直观的演示，首先，让我们以一个简单的POJO类为例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Product</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">Long</span> id<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> description<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">boolean</span> onSale<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">BigDecimal</span> price<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span> stockQuantity<span class="token punctuation">;</span>

    <span class="token comment">// 省略所有属性的构造函数</span>

    <span class="token comment">// 省略getter和setter</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>_Product_类有六个属性。假设我们已经实现了一个程序来生成一个_Product_实例。通常，我们将生成的_Product_实例与预期对象进行比较，以断言程序是否正常工作，例如<code>assertEquals(EXPECTED_PRODUCT, myProgram.createProduct())</code>。</p><p>然而，在我们的程序中，_id_和_description_是不可预测的。换句话说，<strong>如果我们能够验证其余四个字段（<em>name, onSale, price, 和 stockQuantity</em>）持有预期值，我们就认为程序正确地完成了工作。</strong></p><p>接下来，让我们创建一个_Product_对象作为预期结果：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Product</span> <span class="token constant">EXPECTED</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Product</span><span class="token punctuation">(</span><span class="token number">42L</span><span class="token punctuation">,</span> <span class="token string">&quot;LG Monitor&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;32 inches, 4K Resolution, Ideal for programmers&quot;</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">BigDecimal</span><span class="token punctuation">(</span><span class="token string">&quot;429.99&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">77</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>为了简单起见，我们不会真正实现一个创建_Product_对象的方法。相反，让我们简单地创建一个_Product_实例来保存所需的值，因为我们的重点是如何在单个语句中断言这四个属性：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Product</span> <span class="token constant">TO_BE_TESTED</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Product</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1L</span><span class="token punctuation">,</span> <span class="token string">&quot;LG Monitor&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;dummy value: whatever&quot;</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">BigDecimal</span><span class="token punctuation">(</span><span class="token string">&quot;429.99&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">77</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>接下来，让我们看看如何组织断言。</p><h2 id="_3-使用junit5的-assertall" tabindex="-1"><a class="header-anchor" href="#_3-使用junit5的-assertall"><span>3. 使用JUnit5的_assertAll()</span></a></h2><p>JUnit是最流行的单元测试框架之一。最新版本，JUnit 5，带来了许多新特性。例如，_assertAll()_就是其中之一。</p><p><strong>JUnit 5的_assertAll()_方法接受一系列断言，并且它们将在单个调用中全部执行。</strong> 进一步来说，如果任何断言失败，测试将失败，并且所有失败都将被报告。</p><p>接下来，让我们将属性断言分组到一个单独的_assertAll()_调用中：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertAll</span><span class="token punctuation">(</span><span class="token string">&quot;Verify Product properties&quot;</span><span class="token punctuation">,</span>
  <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token constant">EXPECTED</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token constant">TO_BE_TESTED</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token constant">EXPECTED</span><span class="token punctuation">.</span><span class="token function">isOnSale</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token constant">TO_BE_TESTED</span><span class="token punctuation">.</span><span class="token function">isOnSale</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token constant">EXPECTED</span><span class="token punctuation">.</span><span class="token function">getStockQuantity</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token constant">TO_BE_TESTED</span><span class="token punctuation">.</span><span class="token function">getStockQuantity</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token constant">EXPECTED</span><span class="token punctuation">.</span><span class="token function">getPrice</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token constant">TO_BE_TESTED</span><span class="token punctuation">.</span><span class="token function">getPrice</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，_assertAll()_方法将四个断言分组在一个调用中。值得一提的是，<em>price_字段的类型是_BigDecimal</em>。<strong>我们使用_assertEquals()_来验证_BigDecimal_对象的值和比例。</strong></p><p>我们实现了我们的目标。然而，如果我们仔细查看代码，即使在_assertAll()_体内，我们仍然有四个断言，尽管它们是以lambda表达式格式存在的。因此，代码仍然有点冗长。</p><p>接下来，让我们看看其他方法，如何在一个调用中断言这四个属性。</p><h2 id="_4-使用assertj的-extracting-和-containsexactly" tabindex="-1"><a class="header-anchor" href="#_4-使用assertj的-extracting-和-containsexactly"><span>4. 使用AssertJ的_extracting()_和_containsExactly()</span></a></h2><p>AssertJ是一个强大的Java库，它提供了一个流畅且直观的API，用于在测试中编写断言。它提供了_extracting()_方法，允许我们<strong>只从对象中提取我们所需的属性值。</strong> 提取的值存储在一个列表中。然后，AssertJ提供了其他方法来验证列表。例如，<strong>我们可以使用_containsExactly()_来验证实际组是否恰好包含按顺序给出的给定值，且没有其他内容。</strong></p><p>接下来，让我们组装_extracting()<em>和_containsExactly()</em>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertThat</span><span class="token punctuation">(</span><span class="token constant">TO_BE_TESTED</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">extracting</span><span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;onSale&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;stockQuantity&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;price&quot;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">containsExactly</span><span class="token punctuation">(</span><span class="token constant">EXPECTED</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token constant">EXPECTED</span><span class="token punctuation">.</span><span class="token function">isOnSale</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token constant">EXPECTED</span><span class="token punctuation">.</span><span class="token function">getStockQuantity</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token constant">EXPECTED</span><span class="token punctuation">.</span><span class="token function">getPrice</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，AssertJ的_extracting()_和_containsExactly()_允许我们编写更简洁和富有表现力的断言。</p><p>正如上面的代码所示，将属性名称作为字符串传递给_extracting()_方法非常简单。然而，由于名称是纯字符串，它们可能包含拼写错误。此外，如果我们重命名了属性，测试方法仍然可以编译而没有问题。我们直到运行测试时才会发现问题。此外，可能需要一些时间才能最终找到命名问题。</p><p>因此，AssertJ支持传递getter方法引用而不是属性名称到_extracting()_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertThat</span><span class="token punctuation">(</span><span class="token constant">TO_BE_TESTED</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">extracting</span><span class="token punctuation">(</span><span class="token class-name">Product</span><span class="token operator">::</span><span class="token function">getName</span><span class="token punctuation">,</span> <span class="token class-name">Product</span><span class="token operator">::</span><span class="token function">isOnSale</span><span class="token punctuation">,</span> <span class="token class-name">Product</span><span class="token operator">::</span><span class="token function">getStockQuantity</span><span class="token punctuation">,</span> <span class="token class-name">Product</span><span class="token operator">::</span><span class="token function">getPrice</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">containsExactly</span><span class="token punctuation">(</span><span class="token constant">EXPECTED</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token constant">EXPECTED</span><span class="token punctuation">.</span><span class="token function">isOnSale</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token constant">EXPECTED</span><span class="token punctuation">.</span><span class="token function">getStockQuantity</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token constant">EXPECTED</span><span class="token punctuation">.</span><span class="token function">getPrice</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-使用assertj的-returns-和-from" tabindex="-1"><a class="header-anchor" href="#_5-使用assertj的-returns-和-from"><span>5. 使用AssertJ的_returns()_和_from()</span></a></h2><p>AssertJ提供了丰富的断言集合，以满足各种需求。我们已经学会了使用_extracting()_和_containsExactly()_在一个断言调用中验证多个属性。在我们的示例中，我们将检查四个属性。然而，在现实世界中，我们可能想要验证十个属性。随着待检查属性数量的增加，断言行变得难以阅读。此外，编写如此长的断言行容易出错。</p><p>接下来，让我们看看使用AssertJ的_returns()_和_from()_方法的替代方法。使用非常简单：<em>assertThat(ToBeTestedObject).returns(Expected, from(FunctionToGetTheValue)).</em></p><p><strong>所以，_returns()_方法验证被测试的对象从给定的函数_FunctionToGetTheValue_返回_Expected_值。</strong></p><p>接下来，让我们将这种方法应用于验证_Product_对象：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertThat</span><span class="token punctuation">(</span><span class="token constant">TO_BE_TESTED</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">returns</span><span class="token punctuation">(</span><span class="token constant">EXPECTED</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">from</span><span class="token punctuation">(</span><span class="token class-name">Product</span><span class="token operator">::</span><span class="token function">getName</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">returns</span><span class="token punctuation">(</span><span class="token constant">EXPECTED</span><span class="token punctuation">.</span><span class="token function">isOnSale</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">from</span><span class="token punctuation">(</span><span class="token class-name">Product</span><span class="token operator">::</span><span class="token function">isOnSale</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">returns</span><span class="token punctuation">(</span><span class="token constant">EXPECTED</span><span class="token punctuation">.</span><span class="token function">getStockQuantity</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">from</span><span class="token punctuation">(</span><span class="token class-name">Product</span><span class="token operator">::</span><span class="token function">getStockQuantity</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">returns</span><span class="token punctuation">(</span><span class="token constant">EXPECTED</span><span class="token punctuation">.</span><span class="token function">getPrice</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">from</span><span class="token punctuation">(</span><span class="token class-name">Product</span><span class="token operator">::</span><span class="token function">getPrice</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，代码流畅且易于阅读。进一步来说，即使我们需要验证许多属性，我们也不会迷失方向。</p><p>值得一提的是，AssertJ提供了_doesNotReturn()_方法来验证_from()_结果与预期值不匹配。此外，<strong>我们可以在同一个断言中使用_doesNotReturn()<em>和_returns()</em>。</strong></p><p>最后，让我们编写一个一行断言，混合使用_returns()_和_doesNotReturn()_方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertThat</span><span class="token punctuation">(</span><span class="token constant">TO_BE_TESTED</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">returns</span><span class="token punctuation">(</span><span class="token constant">EXPECTED</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">from</span><span class="token punctuation">(</span><span class="token class-name">Product</span><span class="token operator">::</span><span class="token function">getName</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">returns</span><span class="token punctuation">(</span><span class="token constant">EXPECTED</span><span class="token punctuation">.</span><span class="token function">isOnSale</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">from</span><span class="token punctuation">(</span><span class="token class-name">Product</span><span class="token operator">::</span><span class="token function">isOnSale</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">returns</span><span class="token punctuation">(</span><span class="token constant">EXPECTED</span><span class="token punctuation">.</span><span class="token function">getStockQuantity</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">from</span><span class="token punctuation">(</span><span class="token class-name">Product</span><span class="token operator">::</span><span class="token function">getStockQuantity</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">returns</span><span class="token punctuation">(</span><span class="token constant">EXPECTED</span><span class="token punctuation">.</span><span class="token function">getPrice</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">from</span><span class="token punctuation">(</span><span class="token class-name">Product</span><span class="token operator">::</span><span class="token function">getPrice</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">doesNotReturn</span><span class="token punctuation">(</span><span class="token constant">EXPECTED</span><span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">from</span><span class="token punctuation">(</span><span class="token class-name">Product</span><span class="token operator">::</span><span class="token function">getId</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">doesNotReturn</span><span class="token punctuation">(</span><span class="token constant">EXPECTED</span><span class="token punctuation">.</span><span class="token function">getDescription</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">from</span><span class="token punctuation">(</span><span class="token class-name">Product</span><span class="token operator">::</span><span class="token function">getDescription</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>使用单个断言调用来测试多个属性提供了许多好处，例如提高可读性，减少错误，更好的可维护性等。</p><p>在本文中，我们通过示例学习了三种在单个断言调用中验证多个属性的方法：</p><ul><li>JUnit5 – <em>assertAll</em>()</li><li>AssertJ – _extracting()<em>和_containsExactly</em>()</li><li>AssertJ – <em>returns(), doesNotReturn(),</em> 和 <em>from</em></li></ul><p>像往常一样，文章中呈现的所有代码片段都可以在GitHub上找到。</p>`,48),o=[e];function c(l,u){return a(),s("div",null,o)}const k=n(p,[["render",c],["__file","2024-07-09-Single Assert Call for Multiple Properties in Java Unit Testing.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-09/2024-07-09-Single%20Assert%20Call%20for%20Multiple%20Properties%20in%20Java%20Unit%20Testing.html","title":"Java单元测试中单个断言调用多个属性","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Unit Testing"],"tag":["JUnit","AssertJ"],"head":[["meta",{"name":"keywords","content":"Java, Testing, JUnit, AssertJ, Single Assert, Multiple Properties"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-09/2024-07-09-Single%20Assert%20Call%20for%20Multiple%20Properties%20in%20Java%20Unit%20Testing.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java单元测试中单个断言调用多个属性"}],["meta",{"property":"og:description","content":"Java单元测试中单个断言调用多个属性 1. 概述 作为程序员，我们经常编写测试以确保我们的代码按预期工作。在测试中的一个标准做法是使用断言。 当我们想要验证一个对象的多个属性时，我们可以编写一堆断言来完成这项工作。 然而，在本教程中，我们将探讨如何在单个断言调用中验证多个属性。 2. 问题介绍 在许多情况下，我们需要检查一个对象的多个属性。传统上，这..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-09T21:01:03.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"JUnit"}],["meta",{"property":"article:tag","content":"AssertJ"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-09T21:01:03.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java单元测试中单个断言调用多个属性\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-09T21:01:03.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java单元测试中单个断言调用多个属性 1. 概述 作为程序员，我们经常编写测试以确保我们的代码按预期工作。在测试中的一个标准做法是使用断言。 当我们想要验证一个对象的多个属性时，我们可以编写一堆断言来完成这项工作。 然而，在本教程中，我们将探讨如何在单个断言调用中验证多个属性。 2. 问题介绍 在许多情况下，我们需要检查一个对象的多个属性。传统上，这..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 问题介绍","slug":"_2-问题介绍","link":"#_2-问题介绍","children":[]},{"level":2,"title":"3. 使用JUnit5的_assertAll()","slug":"_3-使用junit5的-assertall","link":"#_3-使用junit5的-assertall","children":[]},{"level":2,"title":"4. 使用AssertJ的_extracting()_和_containsExactly()","slug":"_4-使用assertj的-extracting-和-containsexactly","link":"#_4-使用assertj的-extracting-和-containsexactly","children":[]},{"level":2,"title":"5. 使用AssertJ的_returns()_和_from()","slug":"_5-使用assertj的-returns-和-from","link":"#_5-使用assertj的-returns-和-from","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1720558863000,"updatedTime":1720558863000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.66,"words":1697},"filePathRelative":"posts/baeldung/2024-07-09/2024-07-09-Single Assert Call for Multiple Properties in Java Unit Testing.md","localizedDate":"2022年4月1日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>作为程序员，我们经常编写测试以确保我们的代码按预期工作。在测试中的一个标准做法是使用断言。</p>\\n<p>当我们想要验证一个对象的多个属性时，我们可以编写一堆断言来完成这项工作。</p>\\n<p>然而，在本教程中，我们将探讨如何在单个断言调用中验证多个属性。</p>\\n<h2>2. 问题介绍</h2>\\n<p>在许多情况下，我们需要检查一个对象的多个属性。传统上，这意味着为每个属性编写单独的断言语句，这可能会使代码冗长且难以阅读。</p>\\n<p>然而，更好的方法是使用单个断言调用来验证多个属性。接下来，让我们看看如何做到这一点。</p>\\n<p>为了更直观的演示，首先，让我们以一个简单的POJO类为例：</p>","autoDesc":true}');export{k as comp,d as data};
