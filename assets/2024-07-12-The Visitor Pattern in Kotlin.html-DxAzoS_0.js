import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-YddbDb53.js";const e={},p=t(`<h1 id="kotlin中的访问者模式" tabindex="-1"><a class="header-anchor" href="#kotlin中的访问者模式"><span>Kotlin中的访问者模式</span></a></h1><p>设计模式是软件开发中的一个重要概念，用于解决反复出现的问题。访问者模式正是这些模式之一。我们使用它来将算法与它操作的对象结构分离。当我们要向现有类添加新功能而无需修改它们的源代码时，这种模式特别有用。</p><p>在本教程中，我们将讨论访问者模式以及如何在Kotlin中实现它。</p><h2 id="定义" tabindex="-1"><a class="header-anchor" href="#定义"><span>定义</span></a></h2><p>根据定义，访问者设计模式是一种行为设计模式，它允许我们向现有类添加新操作，而无需修改其结构。<strong>当我们拥有一个复杂的对象结构并希望在该结构上执行不同的操作时，我们会使用这种模式。</strong></p><p>此外，这种模式定义了两个主要组件：<em>访问者_和_可访问的</em>。<em>访问者_负责定义一个接口，其中包含每个_可访问的_对象的_visit_方法，而_可访问的_负责接受_访问者</em>。这通常是通过一个_accept_方法完成的。</p><h3 id="_2-1-它解决的问题" tabindex="-1"><a class="header-anchor" href="#_2-1-它解决的问题"><span>2.1. 它解决的问题</span></a></h3><p>访问者模式旨在解决在不改变现有结构的情况下向对象结构添加新操作的问题。通常，将新操作纳入类层次结构需要修改已经存在的类。然而，这种方法可能并不总是可行或实用的。</p><p>因此，<strong>访问者模式引入了一个访问者类，它可以遍历现有的对象结构并执行所需的操作</strong>。最终，这使得系统更加适应性强和可扩展。</p><p>为了演示我们如何在Kotlin中实现访问者模式，让我们考虑一个简单的购物车应用程序。这个应用程序只有一个角色：计算购物车中商品的总价格。</p><p>具体来说，这个应用程序有两个类：_Listing_和_Cart_类。_Listing_类代表购物车中的一个带有价格的商品，而_Cart_类代表购物车并包含所有列表。</p><p><strong>正如前面提到的，要实现这种设计模式，我们需要创建一个访问者接口，为对象层次结构中的每个类提供一个_visit_方法</strong>。在我们的例子中，我们有两个类，所以我们需要两个_visit_方法。</p><h3 id="_3-1-访问者接口及其实现" tabindex="-1"><a class="header-anchor" href="#_3-1-访问者接口及其实现"><span>3.1. 访问者接口及其实现</span></a></h3><p>让我们编写我们的访问者接口，它定义了两个_visit_方法，一个用于_Listing_类，另一个用于_Cart_类：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">interface</span> ShoppingCartVisitor <span class="token punctuation">{</span>
    <span class="token keyword">fun</span> <span class="token function">visit</span><span class="token punctuation">(</span>listing<span class="token operator">:</span> Listing<span class="token punctuation">)</span><span class="token operator">:</span> Double
    <span class="token keyword">fun</span> <span class="token function">visit</span><span class="token punctuation">(</span>cart<span class="token operator">:</span> Cart<span class="token punctuation">)</span><span class="token operator">:</span> Double
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个接口为我们打算在其上执行某些操作的对象结构中的每个类提供了_visit_方法。</p><p>此外，我们需要一个具体的访问者类来实现我们的访问者接口：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">class</span> ShoppingCartVisitorImpl <span class="token operator">:</span> ShoppingCartVisitor <span class="token punctuation">{</span>
    <span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">visit</span><span class="token punctuation">(</span>listing<span class="token operator">:</span> Listing<span class="token punctuation">)</span><span class="token operator">:</span> Double <span class="token punctuation">{</span>
        <span class="token keyword">return</span> listing<span class="token punctuation">.</span>price
    <span class="token punctuation">}</span>

    <span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">visit</span><span class="token punctuation">(</span>cart<span class="token operator">:</span> Cart<span class="token punctuation">)</span><span class="token operator">:</span> Double <span class="token punctuation">{</span>
        <span class="token keyword">var</span> totalPrice <span class="token operator">=</span> <span class="token number">0.0</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span>listing <span class="token keyword">in</span> cart<span class="token punctuation">.</span>listings<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            totalPrice <span class="token operator">+=</span> listing<span class="token punctuation">.</span><span class="token function">accept</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> totalPrice
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这段代码片段中，_ShoppingCartVisitorImpl_类实现了我们的_ShoppingCartVisitor_接口，并为_visit_方法提供了具体的实现。</p><p>访问一个_Listing_只返回其价格，而访问一个_Cart_则遍历购物车中的所有列表，对每一个调用_accept()_方法。我们将在下一步实现这两个对象的_accept()_方法。</p><p>值得注意的是，访问者类负责处理在购物车中添加每个列表价格的复杂任务，同时<strong>确保我们的对象结构中的任对象都不知晓此操作</strong>。</p><h3 id="_3-2-可访问的接口及其实现" tabindex="-1"><a class="header-anchor" href="#_3-2-可访问的接口及其实现"><span>3.2. 可访问的接口及其实现</span></a></h3><p>_Listing_和_Cart_类构成了我们的可访问类。由于它们必须实现_accept()_方法，让我们定义一个_Visitable_接口：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">interface</span> Visitable <span class="token punctuation">{</span>
    <span class="token keyword">fun</span> <span class="token function">accept</span><span class="token punctuation">(</span>visitor<span class="token operator">:</span> ShoppingCartVisitor<span class="token punctuation">)</span><span class="token operator">:</span> Double
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们定义我们的_Listing_和_Cart_类：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">class</span> <span class="token function">Listing</span><span class="token punctuation">(</span><span class="token keyword">val</span> name<span class="token operator">:</span> String<span class="token punctuation">,</span> <span class="token keyword">val</span> price<span class="token operator">:</span> Double<span class="token punctuation">)</span><span class="token operator">:</span> Visitable <span class="token punctuation">{</span>
    <span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">accept</span><span class="token punctuation">(</span>visitor<span class="token operator">:</span> ShoppingCartVisitor<span class="token punctuation">)</span><span class="token operator">:</span> Double <span class="token punctuation">{</span>
        <span class="token keyword">return</span> visitor<span class="token punctuation">.</span><span class="token function">visit</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">class</span> Cart<span class="token operator">:</span> Visitable <span class="token punctuation">{</span>
    <span class="token keyword">val</span> listings <span class="token operator">=</span> mutableListOf<span class="token function">\`&lt;Listing&gt;\`</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">fun</span> <span class="token function">addListing</span><span class="token punctuation">(</span>listing<span class="token operator">:</span> Listing<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        listings<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>listing<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">fun</span> <span class="token function">removeListing</span><span class="token punctuation">(</span>listing<span class="token operator">:</span> Listing<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        listings<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span>listing<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">accept</span><span class="token punctuation">(</span>visitor<span class="token operator">:</span> ShoppingCartVisitor<span class="token punctuation">)</span><span class="token operator">:</span> Double <span class="token punctuation">{</span>
        <span class="token keyword">return</span> visitor<span class="token punctuation">.</span><span class="token function">visit</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的代码中，_Listing_和_Cart_类是<strong>可访问的类，负责接受访问者</strong>。因此，它们需要<strong>实现适当的_accept()_方法</strong>，这将作为访问者类的锚点。</p><p>最后，_accept()_方法将调用访问者上的适当方法，这有助于计算每个列表的价格以及购物车中内容的总价格。</p><h3 id="_3-3-测试" tabindex="-1"><a class="header-anchor" href="#_3-3-测试"><span>3.3. 测试</span></a></h3><p>接下来，我们需要通过使用访问者来计算购物车的总价格来测试我们的应用程序：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token annotation builtin">@Test</span>
<span class="token keyword">fun</span> <span class="token function">\`test shopping cart visitor\`</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">val</span> cart <span class="token operator">=</span> <span class="token function">Cart</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    cart<span class="token punctuation">.</span><span class="token function">addListing</span><span class="token punctuation">(</span><span class="token function">Listing</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Listing 1&quot;</span></span><span class="token punctuation">,</span> <span class="token number">10.0</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    cart<span class="token punctuation">.</span><span class="token function">addListing</span><span class="token punctuation">(</span><span class="token function">Listing</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Listing 2&quot;</span></span><span class="token punctuation">,</span> <span class="token number">20.0</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    cart<span class="token punctuation">.</span><span class="token function">addListing</span><span class="token punctuation">(</span><span class="token function">Listing</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Listing 3&quot;</span></span><span class="token punctuation">,</span> <span class="token number">30.0</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

    <span class="token keyword">val</span> visitor <span class="token operator">=</span> <span class="token function">ShoppingCartVisitorImpl</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">val</span> totalPrice <span class="token operator">=</span> cart<span class="token punctuation">.</span><span class="token function">accept</span><span class="token punctuation">(</span>visitor<span class="token punctuation">)</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">60.0</span><span class="token punctuation">,</span> totalPrice<span class="token punctuation">)</span>
 <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的单元测试中，我们创建了一个带有三个列表的购物车。然后，我们创建了一个访问者，并使用_accept()_方法计算购物车的总价格。最后，我们断言总价格等于预期值。</p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们论了Kotlin中的访问者模式以及如何使用一个简单的购物车应用程序来实现它。我们看到，通过使用这种模式，我们可以在不修改现有类的结构或源代码的情况下向现有类添加功能。</p><p>和往常一样，本文的代码示例可以在GitHub上找到。</p>`,36),i=[p];function o(c,l){return a(),s("div",null,i)}const d=n(e,[["render",o],["__file","2024-07-12-The Visitor Pattern in Kotlin.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-12/2024-07-12-The%20Visitor%20Pattern%20in%20Kotlin.html","title":"Kotlin中的访问者模式","lang":"zh-CN","frontmatter":{"date":"2022-11-01T00:00:00.000Z","category":["Kotlin","Design Patterns"],"tag":["Visitor Pattern","Kotlin"],"head":[["meta",{"name":"keywords","content":"Kotlin, 设计模式, 访问者模式"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-12/2024-07-12-The%20Visitor%20Pattern%20in%20Kotlin.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Kotlin中的访问者模式"}],["meta",{"property":"og:description","content":"Kotlin中的访问者模式 设计模式是软件开发中的一个重要概念，用于解决反复出现的问题。访问者模式正是这些模式之一。我们使用它来将算法与它操作的对象结构分离。当我们要向现有类添加新功能而无需修改它们的源代码时，这种模式特别有用。 在本教程中，我们将讨论访问者模式以及如何在Kotlin中实现它。 定义 根据定义，访问者设计模式是一种行为设计模式，它允许我..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-12T18:03:46.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Visitor Pattern"}],["meta",{"property":"article:tag","content":"Kotlin"}],["meta",{"property":"article:published_time","content":"2022-11-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-12T18:03:46.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Kotlin中的访问者模式\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-11-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-12T18:03:46.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Kotlin中的访问者模式 设计模式是软件开发中的一个重要概念，用于解决反复出现的问题。访问者模式正是这些模式之一。我们使用它来将算法与它操作的对象结构分离。当我们要向现有类添加新功能而无需修改它们的源代码时，这种模式特别有用。 在本教程中，我们将讨论访问者模式以及如何在Kotlin中实现它。 定义 根据定义，访问者设计模式是一种行为设计模式，它允许我..."},"headers":[{"level":2,"title":"定义","slug":"定义","link":"#定义","children":[{"level":3,"title":"2.1. 它解决的问题","slug":"_2-1-它解决的问题","link":"#_2-1-它解决的问题","children":[]},{"level":3,"title":"3.1. 访问者接口及其实现","slug":"_3-1-访问者接口及其实现","link":"#_3-1-访问者接口及其实现","children":[]},{"level":3,"title":"3.2. 可访问的接口及其实现","slug":"_3-2-可访问的接口及其实现","link":"#_3-2-可访问的接口及其实现","children":[]},{"level":3,"title":"3.3. 测试","slug":"_3-3-测试","link":"#_3-3-测试","children":[]}]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1720807426000,"updatedTime":1720807426000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.62,"words":1387},"filePathRelative":"posts/baeldung/2024-07-12/2024-07-12-The Visitor Pattern in Kotlin.md","localizedDate":"2022年11月1日","excerpt":"\\n<p>设计模式是软件开发中的一个重要概念，用于解决反复出现的问题。访问者模式正是这些模式之一。我们使用它来将算法与它操作的对象结构分离。当我们要向现有类添加新功能而无需修改它们的源代码时，这种模式特别有用。</p>\\n<p>在本教程中，我们将讨论访问者模式以及如何在Kotlin中实现它。</p>\\n<h2>定义</h2>\\n<p>根据定义，访问者设计模式是一种行为设计模式，它允许我们向现有类添加新操作，而无需修改其结构。<strong>当我们拥有一个复杂的对象结构并希望在该结构上执行不同的操作时，我们会使用这种模式。</strong></p>\\n<p>此外，这种模式定义了两个主要组件：<em>访问者_和_可访问的</em>。<em>访问者_负责定义一个接口，其中包含每个_可访问的_对象的_visit_方法，而_可访问的_负责接受_访问者</em>。这通常是通过一个_accept_方法完成的。</p>","autoDesc":true}');export{d as comp,k as data};
