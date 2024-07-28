import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-D4B8YWfq.js";const p={},e=t(`<h1 id="java中optional类的用途" tabindex="-1"><a class="header-anchor" href="#java中optional类的用途"><span>Java中Optional类的用途</span></a></h1><p>在本教程中，我们将探讨Java中_Optional_类的目的以及在构建应用程序时使用它的一些优势。</p><h2 id="_2-java中-optional-t-的目的" tabindex="-1"><a class="header-anchor" href="#_2-java中-optional-t-的目的"><span>2. Java中_Optional<code>&lt;T&gt;</code>_的目的</span></a></h2><p>_Optional_类是一个表示某物存在或不存在的类。从技术上讲，<em>Optional_是一个泛型类型_T_的包装类，如果_T_为_null</em>，则_Optional_实例为空。否则，它是满的。</p><p>根据Java 11文档，<em>Optional_的**目的是在返回类型中提供一个可以表示值缺失的场景，其中返回_null_可能会导致意外的错误，**比如著名的_NullPointerException</em>。</p><h3 id="_2-1-有用的方法" tabindex="-1"><a class="header-anchor" href="#_2-1-有用的方法"><span>2.1. 有用的方法</span></a></h3><p><em>Optional_类提供了有用的方法来帮助我们使用该API。本文中重要的方法是_of()</em>、_orElse()_和_empty()_方法：</p><ul><li>_of(T value)_返回一个包含值的_Optional_实例</li><li>_orElse(T other)<em>返回_Optional_中的值，否则返回_other</em></li><li>最后，_empty()_返回一个空的_Optional_实例</li></ul><p>我们将看到这些方法在行动中，以构建返回_Optional_的代码和使用它的代码。</p><h2 id="_3-optional-的优势" tabindex="-1"><a class="header-anchor" href="#_3-optional-的优势"><span>3. _Optional_的优势</span></a></h2><p>我们已经看了_Optional_的目的和它的一些方法。但是，我们如何在我们的程序中从这个类中受益呢？在这一部分中，我们将看到一些使用它的方式，这有助于我们创建清晰和健壮的API。</p><h3 id="_3-1-optional-与-null" tabindex="-1"><a class="header-anchor" href="#_3-1-optional-与-null"><span>3.1. <em>Optional_与_null</em></span></a></h3><p>在创建_Optional_类之前，我们表示值的缺失的方式是使用_null_。语言并不强制我们适当地处理_null_案例。换句话说，<strong>_null_检查有时是必要的，但不是强制性的</strong>。因此，创建返回_null_的方法被证明是一种产生意外的运行时错误的方式，比如_NullPointerException_。</p><p>另一方面，<strong>_Optional_的实例应该在编译时总是被适当处理以获取其内部的值</strong>。这种在编译时处理_Optional_的义务导致更少的意外_NullPointerException_s。</p><p>让我们尝试一个模拟数据库的_用户_的例子：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">User</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token class-name">String</span> id<span class="token punctuation">,</span> <span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>id <span class="token operator">=</span> id<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> id<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> name<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> id<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们也定义一个返回_用户_的存储库类，如果没有找到，则返回_null_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UserRepositoryWithNull</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">List</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">User</span><span class="token punctuation">&gt;</span></span>\`\`\` dbUsers <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token string">&quot;1&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;John&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token string">&quot;2&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Maria&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token string">&quot;3&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Daniel&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">User</span> <span class="token function">findById</span><span class="token punctuation">(</span><span class="token class-name">String</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">User</span> u <span class="token operator">:</span> dbUsers<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>u<span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span> u<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，我们将编写一个单元测试，展示如果我们不使用_null_检查来解决_null_，代码将如何因_NullPointerException_而中断：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenNonExistentUserId_whenSearchForUser_andNoNullCheck_thenThrowException</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">UserRepositoryWithNull</span> userRepositoryWithNull <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">UserRepositoryWithNull</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> nonExistentUserId <span class="token operator">=</span> <span class="token string">&quot;4&quot;</span><span class="token punctuation">;</span>

    <span class="token function">assertThrows</span><span class="token punctuation">(</span><span class="token class-name">NullPointerException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;User name: &quot;</span> <span class="token operator">+</span> userRepositoryWithNull<span class="token punctuation">.</span><span class="token function">findById</span><span class="token punctuation">(</span>nonExistentUserId<span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Java允许我们使用_findById()_返回的对象的_getName()_方法而不进行_null_检查。在这种情况下，我们只能在运行时发现问题。</strong></p><p>为了避免这种情况，我们可以创建另一个存储库，如果我们找到_用户_，我们就返回一个满的_Optional_。否则，我们返回一个空的。让我们在实践中看看这个：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UserRepositoryWithOptional</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">List</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">User</span><span class="token punctuation">&gt;</span></span>\`\`\` dbUsers <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token string">&quot;1&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;John&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token string">&quot;2&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Maria&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token string">&quot;3&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Daniel&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">Optional</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">User</span><span class="token punctuation">&gt;</span></span>\`\`\` <span class="token function">findById</span><span class="token punctuation">(</span><span class="token class-name">String</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">User</span> u <span class="token operator">:</span> dbUsers<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>u<span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span> <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span>u<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">return</span> <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">empty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，当我们重写我们的单元测试时，我们可以看到我们必须首先处理_Optional_才能在找不到任何_用户_时获取它的值：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenNonExistentUserId_whenSearchForUser_thenOptionalShouldBeTreatedProperly</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">UserRepositoryWithOptional</span> userRepositoryWithOptional <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">UserRepositoryWithOptional</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> nonExistentUserId <span class="token operator">=</span> <span class="token string">&quot;4&quot;</span><span class="token punctuation">;</span>

    <span class="token class-name">String</span> userName <span class="token operator">=</span> userRepositoryWithOptional<span class="token punctuation">.</span><span class="token function">findById</span><span class="token punctuation">(</span>nonExistentUserId<span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">orElse</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token string">&quot;0&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;admin&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;admin&quot;</span><span class="token punctuation">,</span> userName<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的情况下，我们没有找到任何_用户_，所以我们可以使用_orElse()<em>方法返回一个默认用户。要获取它的值，必须在编译时适当处理_Optional</em>。有了这个，我们可以减少运行时的意外错误。</p><p>我们可以使用_orElseThrow()_代替提供默认的_orElse()_方法来抛出异常，或者使用_orElseGet()_调用_Supplier_函数。</p><h3 id="_3-2-设计清晰的意图api" tabindex="-1"><a class="header-anchor" href="#_3-2-设计清晰的意图api"><span>3.2. 设计清晰的意图API</span></a></h3><p>正如我们之前讨论的，_null_被广泛用来表示无。然而，_null_的含义只有创建API的人清楚。其他浏览该API的开发人员可能会为_null_找到不同的含义。</p><p>可能“Optional”这个名字是_Optional_在构建我们的API时成为有用工具的主要原因。<strong>方法返回中的_Optional_提供了我们应该从该方法中期望什么的清晰意图：它返回某些东西或什么都不返回</strong>。不需要任何文档来解释该方法的返回类型。代码自解释。</p><p>使用返回_null_的存储库，我们可能会以最坏的方式发现_null_表示数据库中没有找到_用户_。或者它可能代表其他事情，比如连接数据库时的错误，或者对象尚未初始化。很难知道。</p><p>另一方面，使用返回_Optional_实例的存储库，只需查看方法签名，就可以清楚地知道我们可能会或可能不会在数据库中找到用户。</p><p><strong>设计清晰API的一个重要做法是永远不要返回一个_null_ <em>Optional</em></strong>。方法应该总是返回一个有效的_Optional_实例，使用静态方法。</p><h3 id="_3-3-声明式编程" tabindex="-1"><a class="header-anchor" href="#_3-3-声明式编程"><span>3.3. 声明式编程</span></a></h3><p>使用_Optional_类的另一个很好的理由是能够使用一系列流畅的方法。它提供了一个类似于集合中的_stream()_的“伪流”，但只有一个值。这意味着我们可以在其上调用像_map()_和_filter()_这样的方法。这有助于创建更多的声明式程序，而不是命令式的。</p><p>假设要求是如果_用户_的名字以字母‘M’开头，则将其转换为大写。</p><p>首先，让我们看看使用不返回_Optional_的存储库的命令式方式：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenExistentUserId_whenFoundUserWithNameStartingWithMInRepositoryUsingNull_thenNameShouldBeUpperCased</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">UserRepositoryWithNull</span> userRepositoryWithNull <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">UserRepositoryWithNull</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">User</span> user <span class="token operator">=</span> userRepositoryWithNull<span class="token punctuation">.</span><span class="token function">findById</span><span class="token punctuation">(</span><span class="token string">&quot;2&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> upperCasedName <span class="token operator">=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>user <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>user<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">startsWith</span><span class="token punctuation">(</span><span class="token string">&quot;M&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            upperCasedName <span class="token operator">=</span> user<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;MARIA&quot;</span><span class="token punctuation">,</span> upperCasedName<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们看看使用_Optional_版本的存储库的声明式方式：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenExistentUserId_whenFoundUserWithNameStartingWithMInRepositoryUsingOptional_thenNameShouldBeUpperCased</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">UserRepositoryWithOptional</span> userRepositoryWithOptional <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">UserRepositoryWithOptional</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">String</span> upperCasedName <span class="token operator">=</span> userRepositoryWithOptional<span class="token punctuation">.</span><span class="token function">findById</span><span class="token punctuation">(</span><span class="token string">&quot;2&quot;</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>u <span class="token operator">-&gt;</span> u<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">startsWith</span><span class="token punctuation">(</span><span class="token string">&quot;M&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>u <span class="token operator">-&gt;</span> u<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">orElse</span><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;MARIA&quot;</span><span class="token punctuation">,</span> upperCasedName<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>命令式方式需要两个嵌套的_if_语句来检查对象是否不是_null_并过滤用户名。如果未找到_用户_，则大写字符串保持为空。</p><p>在声明式方式中，我们使用lambda表达式来过滤名称，并将大写函数映射到找到的_用户_。如果未找到_用户_，我们使用_orElse()_返回一个空字符串。</p><p>使用哪一个仍然是个人偏好的问题。它们都达到了相同的结果。命令式方式需要更深入地了解代码的含义。例如，如果我们在第一个或第二个_if_语句中添加更多逻辑，可能会对该代码的意图产生一些混淆。在这种类型的情境中，<strong>声明式编程清楚地说明了代码的意图</strong>：返回大写名称，否则返回一个空字符串。</p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们探讨了_Optional_类的目的以及如何有效地使用它来设计清晰和健壮的API。</p><p>如往常一样，示例的源代码可在GitHub上找到。</p>`,46),o=[e];function l(c,i){return a(),s("div",null,o)}const k=n(p,[["render",l],["__file","2024-07-12-Uses for Optional in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-12/2024-07-12-Uses%20for%20Optional%20in%20Java.html","title":"Java中Optional类的用途","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Optional"],"tag":["Java","Optional","API"],"head":[["meta",{"name":"keywords","content":"Java, Optional, API, Optional类, Java编程"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-12/2024-07-12-Uses%20for%20Optional%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中Optional类的用途"}],["meta",{"property":"og:description","content":"Java中Optional类的用途 在本教程中，我们将探讨Java中_Optional_类的目的以及在构建应用程序时使用它的一些优势。 2. Java中_Optional<T>_的目的 _Optional_类是一个表示某物存在或不存在的类。从技术上讲，Optional_是一个泛型类型_T_的包装类，如果_T_为_null，则_Optional_实例为空..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-12T04:09:59.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Optional"}],["meta",{"property":"article:tag","content":"API"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-12T04:09:59.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中Optional类的用途\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-12T04:09:59.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中Optional类的用途 在本教程中，我们将探讨Java中_Optional_类的目的以及在构建应用程序时使用它的一些优势。 2. Java中_Optional<T>_的目的 _Optional_类是一个表示某物存在或不存在的类。从技术上讲，Optional_是一个泛型类型_T_的包装类，如果_T_为_null，则_Optional_实例为空..."},"headers":[{"level":2,"title":"2. Java中_Optional<T>_的目的","slug":"_2-java中-optional-t-的目的","link":"#_2-java中-optional-t-的目的","children":[{"level":3,"title":"2.1. 有用的方法","slug":"_2-1-有用的方法","link":"#_2-1-有用的方法","children":[]}]},{"level":2,"title":"3. _Optional_的优势","slug":"_3-optional-的优势","link":"#_3-optional-的优势","children":[{"level":3,"title":"3.1. Optional_与_null","slug":"_3-1-optional-与-null","link":"#_3-1-optional-与-null","children":[]},{"level":3,"title":"3.2. 设计清晰的意图API","slug":"_3-2-设计清晰的意图api","link":"#_3-2-设计清晰的意图api","children":[]},{"level":3,"title":"3.3. 声明式编程","slug":"_3-3-声明式编程","link":"#_3-3-声明式编程","children":[]}]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1720757399000,"updatedTime":1720757399000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":6.2,"words":1860},"filePathRelative":"posts/baeldung/2024-07-12/2024-07-12-Uses for Optional in Java.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在本教程中，我们将探讨Java中_Optional_类的目的以及在构建应用程序时使用它的一些优势。</p>\\n<h2>2. Java中_Optional<code>&lt;T&gt;</code>_的目的</h2>\\n<p>_Optional_类是一个表示某物存在或不存在的类。从技术上讲，<em>Optional_是一个泛型类型_T_的包装类，如果_T_为_null</em>，则_Optional_实例为空。否则，它是满的。</p>\\n<p>根据Java 11文档，<em>Optional_的**目的是在返回类型中提供一个可以表示值缺失的场景，其中返回_null_可能会导致意外的错误，**比如著名的_NullPointerException</em>。</p>","autoDesc":true}');export{k as comp,d as data};
