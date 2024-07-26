import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-8nJ1rqSf.js";const p={},e=t('<h1 id="在spring-data-jpa中返回map而不是list" tabindex="-1"><a class="header-anchor" href="#在spring-data-jpa中返回map而不是list"><span>在Spring Data JPA中返回Map而不是List</span></a></h1><p>Spring JPA提供了一个非常灵活且方便的API来与数据库交互。然而，有时我们需要自定义它或为返回的集合添加更多功能。</p><p>使用Map作为JPA仓库方法的返回类型可能有助于创建服务和数据库之间更直接的交互。<strong>不幸的是，Spring不允许这种转换自动发生。</strong> 在本教程中，我们将检查如何克服这个问题，并学习一些使仓库更具功能性的有趣技术。</p><h3 id="_2-手动实现" tabindex="-1"><a class="header-anchor" href="#_2-手动实现"><span>2. 手动实现</span></a></h3><p>当框架不提供某些功能时，最明显的方法是我们自己实现。在这种情况下，JPA允许我们从头开始实现仓库，跳过整个生成过程，或使用默认方法以获得两全其美的结果。</p><h4 id="_2-1-使用list" tabindex="-1"><a class="header-anchor" href="#_2-1-使用list"><span>2.1 使用List</span></a></h4><p>我们可以实现一个方法将结果列表映射到Map。Stream API在这方面提供了极大的帮助，允许几乎一行代码的实现：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">default</span> <span class="token class-name">Map</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Long</span><span class="token punctuation">,</span> <span class="token class-name">User</span><span class="token punctuation">&gt;</span></span>```` <span class="token function">findAllAsMapUsingCollection</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token function">findAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toMap</span><span class="token punctuation">(</span><span class="token class-name">User</span><span class="token operator">::</span><span class="token function">getId</span><span class="token punctuation">,</span> <span class="token class-name">Function</span><span class="token punctuation">.</span><span class="token function">identity</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-2-使用stream" tabindex="-1"><a class="header-anchor" href="#_2-2-使用stream"><span>2.2 使用Stream</span></a></h4><p>我们可以做类似的事情，但直接使用Stream。为此，我们可以确定一个自定义方法，它将返回用户的Stream。幸运的是，Spring JPA支持这种返回类型，我们可以从自动生成中受益：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Query</span><span class="token punctuation">(</span><span class="token string">&quot;select u from User u&quot;</span><span class="token punctuation">)</span>\n<span class="token class-name">Stream</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">User</span><span class="token punctuation">&gt;</span></span>```````` <span class="token function">findAllAsStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>之后，我们可以实现一个自定义方法，将结果映射到我们需要的数据结构：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Transactional</span>\n<span class="token keyword">default</span> <span class="token class-name">Map</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Long</span><span class="token punctuation">,</span> <span class="token class-name">User</span><span class="token punctuation">&gt;</span></span>```` <span class="token function">findAllAsMapUsingStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token function">findAllAsStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toMap</span><span class="token punctuation">(</span><span class="token class-name">User</span><span class="token operator">::</span><span class="token function">getId</span><span class="token punctuation">,</span> <span class="token class-name">Function</span><span class="token punctuation">.</span><span class="token function">identity</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>返回Stream的仓库方法应该在事务内部调用。在这种情况下，我们直接在默认方法上添加了@Transactional注解。</p><h4 id="_2-3-使用streamable" tabindex="-1"><a class="header-anchor" href="#_2-3-使用streamable"><span>2.3 使用Streamable</span></a></h4><p>这是一种与之前讨论的方法类似的方法。唯一的变化是我们将使用Streamable。我们需要先创建一个自定义方法来返回它：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Query</span><span class="token punctuation">(</span><span class="token string">&quot;select u from User u&quot;</span><span class="token punctuation">)</span>\n<span class="token class-name">Streamable</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">User</span><span class="token punctuation">&gt;</span></span>```````` <span class="token function">findAllAsStreamable</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，我们可以适当地映射结果：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">default</span> <span class="token class-name">Map</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Long</span><span class="token punctuation">,</span> <span class="token class-name">User</span><span class="token punctuation">&gt;</span></span>```` <span class="token function">findAllAsMapUsingStreamable</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token function">findAllAsStreamable</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toMap</span><span class="token punctuation">(</span><span class="token class-name">User</span><span class="token operator">::</span><span class="token function">getId</span><span class="token punctuation">,</span> <span class="token class-name">Function</span><span class="token punctuation">.</span><span class="token function">identity</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-自定义streamable包装器" tabindex="-1"><a class="header-anchor" href="#_3-自定义streamable包装器"><span>3. 自定义Streamable包装器</span></a></h3><p>前面的示例向我们展示了解决这个问题的非常简单的解决方案。然而，假设我们有几种不同的操作或数据结构，我们希望将结果映射到它们上面。<strong>在这种情况下，我们最终可能会得到散布在代码中的笨重的映射器或多个执行类似事情的仓库方法。</strong></p><p>更好的方法可能是创建一个代表实体集合的专用类，并将所有与集合操作相关的方法放在里面。为此，我们将使用Streamable。</p><p>正如之前所示，Spring JPA理解Streamable并且可以将其映射到它。有趣的是，我们可以扩展Streamable并为其提供方便的方法。让我们创建一个Users类来表示User对象的集合：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Users</span> <span class="token keyword">implements</span> <span class="token class-name">Streamable</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">User</span><span class="token punctuation">&gt;</span></span>```````` <span class="token punctuation">{</span>\n    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">Streamable</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">User</span><span class="token punctuation">&gt;</span></span>```````` userStreamable<span class="token punctuation">;</span>\n\n    <span class="token keyword">public</span> <span class="token class-name">Users</span><span class="token punctuation">(</span><span class="token class-name">Streamable</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">User</span><span class="token punctuation">&gt;</span></span>```````` userStreamable<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>userStreamable <span class="token operator">=</span> userStreamable<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token annotation punctuation">@Override</span>\n    <span class="token keyword">public</span> <span class="token class-name">Iterator</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">User</span><span class="token punctuation">&gt;</span></span>```````` <span class="token function">iterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> userStreamable<span class="token punctuation">.</span><span class="token function">iterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token comment">// 自定义方法</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为了使其与JPA一起工作，我们应该遵循一个简单的约定。<strong>首先，我们应该实现Streamable，其次，提供Spring能够初始化它的方式。</strong> 初始化部分可以通过接受Streamable的公共构造函数来解决，或者使用名为of(Streamable<code>&lt;T&gt;</code>)或valueOf(Streamable<code>&lt;T&gt;</code>)的静态工厂。</p><p>之后，我们可以将Users作为JPA仓库方法的返回类型：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Query</span><span class="token punctuation">(</span><span class="token string">&quot;select u from User u&quot;</span><span class="token punctuation">)</span>\n<span class="token class-name">Users</span> <span class="token function">findAllUsers</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，我们可以直接在Users类中放置我们在仓库中保留的方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">Map</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Long</span><span class="token punctuation">,</span> <span class="token class-name">User</span><span class="token punctuation">&gt;</span></span>```` <span class="token function">getUserIdToUserMap</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toMap</span><span class="token punctuation">(</span><span class="token class-name">User</span><span class="token operator">::</span><span class="token function">getId</span><span class="token punctuation">,</span> <span class="token class-name">Function</span><span class="token punctuation">.</span><span class="token function">identity</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最好的部分是，我们可以使用所有与处理或映射User实体相关的方法。假设我们想根据某些标准过滤用户：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">fetchUsersInMapUsingStreamableWrapperWithFilterThenAllOfThemPresent</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">Users</span> users <span class="token operator">=</span> repository<span class="token punctuation">.</span><span class="token function">findAllUsers</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">int</span> maxNameLength <span class="token operator">=</span> <span class="token number">4</span><span class="token punctuation">;</span>\n    <span class="token class-name">List</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">User</span><span class="token punctuation">&gt;</span></span>```````` actual <span class="token operator">=</span> users<span class="token punctuation">.</span><span class="token function">getAllUsersWithShortNames</span><span class="token punctuation">(</span>maxNameLength<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">User</span><span class="token punctuation">[</span><span class="token punctuation">]</span> expected <span class="token operator">=</span> <span class="token punctuation">{</span>\n        <span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token number">9L</span><span class="token punctuation">,</span> <span class="token string">&quot;Moe&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Oddy&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n        <span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token number">25L</span><span class="token punctuation">,</span> <span class="token string">&quot;Lane&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Endricci&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n        <span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token number">26L</span><span class="token punctuation">,</span> <span class="token string">&quot;Doro&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Kinforth&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n        <span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token number">34L</span><span class="token punctuation">,</span> <span class="token string">&quot;Otho&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Rowan&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n        <span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token number">39L</span><span class="token punctuation">,</span> <span class="token string">&quot;Mel&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Moffet&quot;</span><span class="token punctuation">)</span>\n    <span class="token punctuation">}</span><span class="token punctuation">;</span>\n    <span class="token function">assertThat</span><span class="token punctuation">(</span>actual<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">containsExactly</span><span class="token punctuation">(</span>expected<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们也可以将它们以某种方式分组：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">fetchUsersInMapUsingStreamableWrapperAndGroupingThenAllOfThemPresent</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">Users</span> users <span class="token operator">=</span> repository<span class="token punctuation">.</span><span class="token function">findAllUsers</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">Map</span><span class="token operator">&lt;</span><span class="token class-name">Character</span><span class="token punctuation">,</span> <span class="token class-name">List</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">User</span><span class="token punctuation">&gt;</span></span>````````<span class="token operator">&gt;</span> alphabeticalGrouping <span class="token operator">=</span> users<span class="token punctuation">.</span><span class="token function">groupUsersAlphabetically</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">List</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">User</span><span class="token punctuation">&gt;</span></span>```````` actual <span class="token operator">=</span> alphabeticalGrouping<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token char">&#39;A&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">User</span><span class="token punctuation">[</span><span class="token punctuation">]</span> expected <span class="token operator">=</span> <span class="token punctuation">{</span>\n        <span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token number">2L</span><span class="token punctuation">,</span> <span class="token string">&quot;Auroora&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Oats&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n        <span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token number">4L</span><span class="token punctuation">,</span> <span class="token string">&quot;Alika&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Capin&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n        <span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token number">20L</span><span class="token punctuation">,</span> <span class="token string">&quot;Artus&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Rickards&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n        <span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token number">27L</span><span class="token punctuation">,</span> <span class="token string">&quot;Antonina&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Vivian&quot;</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token punctuation">;</span>\n    <span class="token function">assertThat</span><span class="token punctuation">(</span>actual<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">containsExactly</span><span class="token punctuation">(</span>expected<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样，我们可以隐藏这些方法的实现，从我们的服务中移除混乱，并卸载仓库。</p><h3 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h3><p>Spring JPA允许自定义，但有时实现起来非常简单。围绕框架限制的类型构建应用程序可能会影响代码质量甚至应用程序的设计。</p><p>使用自定义集合作为返回类型可能会使设计更直接，减少映射和过滤逻辑的混乱。<strong>使用实体集合的专用包装器可以进一步提高代码质量。</strong></p><p>如常，本教程中使用的所有代码都可以在GitHub上找到。</p>',38),o=[e];function c(l,i){return a(),s("div",null,o)}const k=n(p,[["render",c],["__file","2024-06-25-Return Map Instead of List in Spring Data JPA.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-06-25/2024-06-25-Return%20Map%20Instead%20of%20List%20in%20Spring%20Data%20JPA.html","title":"在Spring Data JPA中返回Map而不是List","lang":"zh-CN","frontmatter":{"date":"2024-06-25T00:00:00.000Z","category":["Spring Data JPA","Java"],"tag":["Spring","JPA","Repository"],"head":[["meta",{"name":"keywords","content":"Spring Data JPA, Map, List, Repository, Java"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-25/2024-06-25-Return%20Map%20Instead%20of%20List%20in%20Spring%20Data%20JPA.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Spring Data JPA中返回Map而不是List"}],["meta",{"property":"og:description","content":"在Spring Data JPA中返回Map而不是List Spring JPA提供了一个非常灵活且方便的API来与数据库交互。然而，有时我们需要自定义它或为返回的集合添加更多功能。 使用Map作为JPA仓库方法的返回类型可能有助于创建服务和数据库之间更直接的交互。不幸的是，Spring不允许这种转换自动发生。 在本教程中，我们将检查如何克服这个问题，..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-25T06:51:08.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Spring"}],["meta",{"property":"article:tag","content":"JPA"}],["meta",{"property":"article:tag","content":"Repository"}],["meta",{"property":"article:published_time","content":"2024-06-25T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-25T06:51:08.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Spring Data JPA中返回Map而不是List\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-25T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-25T06:51:08.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Spring Data JPA中返回Map而不是List Spring JPA提供了一个非常灵活且方便的API来与数据库交互。然而，有时我们需要自定义它或为返回的集合添加更多功能。 使用Map作为JPA仓库方法的返回类型可能有助于创建服务和数据库之间更直接的交互。不幸的是，Spring不允许这种转换自动发生。 在本教程中，我们将检查如何克服这个问题，..."},"headers":[{"level":3,"title":"2. 手动实现","slug":"_2-手动实现","link":"#_2-手动实现","children":[]},{"level":3,"title":"3. 自定义Streamable包装器","slug":"_3-自定义streamable包装器","link":"#_3-自定义streamable包装器","children":[]},{"level":3,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1719298268000,"updatedTime":1719298268000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.24,"words":1272},"filePathRelative":"posts/baeldung/2024-06-25/2024-06-25-Return Map Instead of List in Spring Data JPA.md","localizedDate":"2024年6月25日","excerpt":"\\n<p>Spring JPA提供了一个非常灵活且方便的API来与数据库交互。然而，有时我们需要自定义它或为返回的集合添加更多功能。</p>\\n<p>使用Map作为JPA仓库方法的返回类型可能有助于创建服务和数据库之间更直接的交互。<strong>不幸的是，Spring不允许这种转换自动发生。</strong> 在本教程中，我们将检查如何克服这个问题，并学习一些使仓库更具功能性的有趣技术。</p>\\n<h3>2. 手动实现</h3>\\n<p>当框架不提供某些功能时，最明显的方法是我们自己实现。在这种情况下，JPA允许我们从头开始实现仓库，跳过整个生成过程，或使用默认方法以获得两全其美的结果。</p>\\n","autoDesc":true}');export{k as comp,d as data};
