import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-DE4beumH.js";const e={},o=t(`<h1 id="lombok-allargsconstructor-requiredargsconstructor-和-noargsconstructor-的区别-baeldung" tabindex="-1"><a class="header-anchor" href="#lombok-allargsconstructor-requiredargsconstructor-和-noargsconstructor-的区别-baeldung"><span>Lombok @AllArgsConstructor, @RequiredArgsConstructor 和 @NoArgsConstructor 的区别 | Baeldung</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>Lombok 项目通过提供注解自动生成常用的代码，从而减少了Java应用程序中的样板代码。</p><p>在本教程中，我们将探讨这个库提供的三种构造函数注解之间的区别。</p><h2 id="_2-设置" tabindex="-1"><a class="header-anchor" href="#_2-设置"><span>2. 设置</span></a></h2><p>为了突出这些差异，让我们首先将 <em>lombok</em> 添加到我们的依赖中：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`org.projectlombok\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`lombok\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\`1.18.30\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">&gt;</span></span>\`provided\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">&gt;</span></span>\`
\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们创建一个类作为我们演示的基础：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span> age<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">String</span> race<span class="token punctuation">;</span>
    <span class="token annotation punctuation">@NonNull</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">String</span> nickname <span class="token operator">=</span> <span class="token string">&quot;unknown&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们故意在 <em>Person</em> 对象中散布了各种非访问修饰符，每种构造函数注解都以不同的方式处理它们。我们将使用这个类的不同名称副本进行以下各节。</p><p>顾名思义，<strong>@AllArgsConstructor 注解生成一个初始化所有对象字段的构造函数</strong>。用 <em>@NonNull</em> 注解的字段在生成的构造函数中会进行 <em>null</em> 检查。</p><p>让我们将注解添加到我们的类中：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@AllArgsConstructor</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AllArgsPerson</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们触发生成的构造函数中的 <em>null</em> 检查：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenUsingAllArgsConstructor_thenCheckNotNullFields</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">assertThatThrownBy</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">new</span> <span class="token class-name">AllArgsPerson</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token string">&quot;Asian&quot;</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isInstanceOf</span><span class="token punctuation">(</span><span class="token class-name">NullPointerException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">hasMessageContaining</span><span class="token punctuation">(</span><span class="token string">&quot;name is marked non-null but is null&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>@AllArgsConstructor 为我们提供了一个 <em>AllArgsPerson</em> 构造函数，其中包含了对象的所有必要字段。</p><h2 id="_4-requiredargsconstructor" tabindex="-1"><a class="header-anchor" href="#_4-requiredargsconstructor"><span>4. @RequiredArgsConstructor</span></a></h2><p><strong>@RequiredArgsConstructor 生成一个只初始化标记为 <em>final</em> 或 <em>@NonNull</em> 的字段的构造函数</strong>，前提是它们在声明时没有被初始化。</p><p>让我们使用 <em>@RequiredArgsConstructor</em> 更新我们的类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@RequiredArgsConstructor</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RequiredArgsPerson</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于我们的 <em>RequiredArgsPerson</em> 对象，这将导致一个只有两个参数的构造函数：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenUsingRequiredArgsConstructor_thenInitializedFinalFieldsWillBeIgnored</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">RequiredArgsPerson</span> person <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">RequiredArgsPerson</span><span class="token punctuation">(</span><span class="token string">&quot;Hispanic&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Isabela&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;unknown&quot;</span><span class="token punctuation">,</span> person<span class="token punctuation">.</span><span class="token function">getNickname</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于我们初始化了 <em>nickname</em> 字段，尽管它是 <em>final</em> 的，它也不会成为生成的构造函数参数的一部分。相反，它像其他非 <em>final</em> 字段和没有标记为 <em>@NotNull</em> 的字段一样被处理。</p><p><strong>像 @AllArgsConstructor 一样，@RequiredArgsConstructor 注解也为用 <em>@NonNull</em> 标记的字段进行 <em>null</em> 检查</strong>，正如我们的单元测试所示：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenUsingRequiredArgsConstructor_thenCheckNotNullFields</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">assertThatThrownBy</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">new</span> <span class="token class-name">RequiredArgsPerson</span><span class="token punctuation">(</span><span class="token string">&quot;Hispanic&quot;</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isInstanceOf</span><span class="token punctuation">(</span><span class="token class-name">NullPointerException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">hasMessageContaining</span><span class="token punctuation">(</span><span class="token string">&quot;name is marked non-null but is null&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当使用 @AllArgsConstructor 或 @RequiredArgsConstructor 时，保持对象字段顺序至关重要。例如，如果我们在 <em>Person</em> 对象中交换了 <em>name</em> 和 <em>race</em> 字段，由于它们的类型相同，这不会引起编译器的投诉。然而，我们库的现有用户可能会忽视调整构造函数参数的需要。</p><h2 id="_5-noargsconstructor" tabindex="-1"><a class="header-anchor" href="#_5-noargsconstructor"><span>5. @NoArgsConstructor</span></a></h2><p>通常，如果我们没有定义构造函数，Java会提供一个默认的。同样地，<strong>@NoArgsConstructor 生成一个类没有参数的构造函数</strong>，类似于默认构造函数。我们指定 <em>force</em> 参数标志以避免由于未初始化的 <em>final</em> 字段而引起的编译错误：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@NoArgsConstructor</span><span class="token punctuation">(</span>force <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">NoArgsPerson</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们检查未初始化字段的默认值：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenUsingNoArgsConstructor_thenAddDefaultValuesToUnInitializedFinalFields</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">NoArgsPerson</span> person <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">NoArgsPerson</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertNull</span><span class="token punctuation">(</span>person<span class="token punctuation">.</span><span class="token function">getRace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;unknown&quot;</span><span class="token punctuation">,</span> person<span class="token punctuation">.</span><span class="token function">getNickname</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>与其他字段不同，由于我们在声明时初始化了 <em>nickname</em> 字段，它没有接收到 <em>null</em> 的默认值。</p><h2 id="_6-使用多个注解" tabindex="-1"><a class="header-anchor" href="#_6-使用多个注解"><span>6. 使用多个注解</span></a></h2><p>在某些情况下，不同的需求可能导致使用多个注解。例如，如果我们希望提供静态工厂方法，但仍然需要默认构造函数以兼容外部框架，如JPA，<strong>我们可以使用两个注解：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@RequiredArgsConstructor</span><span class="token punctuation">(</span>staticName <span class="token operator">=</span> <span class="token string">&quot;construct&quot;</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@NoArgsConstructor</span><span class="token punctuation">(</span>access <span class="token operator">=</span> <span class="token class-name">AccessLevel</span><span class="token punctuation">.</span><span class="token constant">PRIVATE</span><span class="token punctuation">,</span> force <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SpecialPerson</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>之后，让我们用示例值调用我们的静态构造函数：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenUsingRequiredArgsConstructorWithStaticName_thenHideTheConstructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">SpecialPerson</span> person <span class="token operator">=</span> <span class="token class-name">SpecialPerson</span><span class="token punctuation">.</span><span class="token function">construct</span><span class="token punctuation">(</span><span class="token string">&quot;value1&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;value2&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertNotNull</span><span class="token punctuation">(</span>person<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这种情况下，尝试实例化默认构造函数将导致编译错误。</p><h2 id="_7-比较总结" tabindex="-1"><a class="header-anchor" href="#_7-比较总结"><span>7. 比较总结</span></a></h2><p>让我们在表格中总结一下我们讨论的内容：</p><table><thead><tr><th>注解</th><th>生成的构造函数参数</th><th><em>@NonNull</em> 字段 <em>null</em> 检查</th></tr></thead><tbody><tr><td>@AllArgsConstructor</td><td>所有对象字段（除了静态和已初始化的最终字段）</td><td>是</td></tr><tr><td>@RequiredArgsConstructor</td><td>只有 <em>final</em> 或 <em>@NonNull</em> 字段</td><td>是</td></tr><tr><td>@NoArgsConstructor</td><td>无</td><td>否</td></tr></tbody></table><h2 id="_8-结论" tabindex="-1"><a class="header-anchor" href="#_8-结论"><span>8. 结论</span></a></h2><p>在本文中，我们探讨了 Project Lombok 提供的构造函数注解。我们了解到 @AllArgsConstructor 初始化所有对象字段，而 @RequiredArgsConstructor 仅初始化 <em>final</em> 和 <em>@NotNull</em> 字段。此外，我们发现 @NoArgsConstructor 生成一个类似默认的构造函数，我们还讨论了这些注解如何一起使用。</p><p>如常，所有示例的源代码都可以在 GitHub 上找到。</p><p>文章发布后30天内开放评论。对于此日期之后的任何问题，请使用网站上的联系表单。</p>`,45),p=[o];function c(l,i){return a(),s("div",null,p)}const d=n(e,[["render",c],["__file","Difference Between Lombok  AllArgsConstructor   RequiredArgsConstructor and  NoArgConstructor.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/Archive/Difference%20Between%20Lombok%20%20AllArgsConstructor%20%20%20RequiredArgsConstructor%20and%20%20NoArgConstructor.html","title":"Lombok @AllArgsConstructor, @RequiredArgsConstructor 和 @NoArgsConstructor 的区别 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-06-17T00:00:00.000Z","category":["Java","Lombok"],"tag":["Lombok","Annotations","Constructors"],"description":"Lombok @AllArgsConstructor, @RequiredArgsConstructor 和 @NoArgsConstructor 的区别 | Baeldung 1. 概述 Lombok 项目通过提供注解自动生成常用的代码，从而减少了Java应用程序中的样板代码。 在本教程中，我们将探讨这个库提供的三种构造函数注解之间的区别。 2. 设...","head":[["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/Difference%20Between%20Lombok%20%20AllArgsConstructor%20%20%20RequiredArgsConstructor%20and%20%20NoArgConstructor.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Lombok @AllArgsConstructor, @RequiredArgsConstructor 和 @NoArgsConstructor 的区别 | Baeldung"}],["meta",{"property":"og:description","content":"Lombok @AllArgsConstructor, @RequiredArgsConstructor 和 @NoArgsConstructor 的区别 | Baeldung 1. 概述 Lombok 项目通过提供注解自动生成常用的代码，从而减少了Java应用程序中的样板代码。 在本教程中，我们将探讨这个库提供的三种构造函数注解之间的区别。 2. 设..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Lombok"}],["meta",{"property":"article:tag","content":"Annotations"}],["meta",{"property":"article:tag","content":"Constructors"}],["meta",{"property":"article:published_time","content":"2024-06-17T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Lombok @AllArgsConstructor, @RequiredArgsConstructor 和 @NoArgsConstructor 的区别 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-17T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]]},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 设置","slug":"_2-设置","link":"#_2-设置","children":[]},{"level":2,"title":"4. @RequiredArgsConstructor","slug":"_4-requiredargsconstructor","link":"#_4-requiredargsconstructor","children":[]},{"level":2,"title":"5. @NoArgsConstructor","slug":"_5-noargsconstructor","link":"#_5-noargsconstructor","children":[]},{"level":2,"title":"6. 使用多个注解","slug":"_6-使用多个注解","link":"#_6-使用多个注解","children":[]},{"level":2,"title":"7. 比较总结","slug":"_7-比较总结","link":"#_7-比较总结","children":[]},{"level":2,"title":"8. 结论","slug":"_8-结论","link":"#_8-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":3.9,"words":1169},"filePathRelative":"posts/baeldung/Archive/Difference Between Lombok  AllArgsConstructor   RequiredArgsConstructor and  NoArgConstructor.md","localizedDate":"2024年6月17日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>Lombok 项目通过提供注解自动生成常用的代码，从而减少了Java应用程序中的样板代码。</p>\\n<p>在本教程中，我们将探讨这个库提供的三种构造函数注解之间的区别。</p>\\n<h2>2. 设置</h2>\\n<p>为了突出这些差异，让我们首先将 <em>lombok</em> 添加到我们的依赖中：</p>\\n<div class=\\"language-xml\\" data-ext=\\"xml\\" data-title=\\"xml\\"><pre class=\\"language-xml\\"><code>`<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>dependency</span><span class=\\"token punctuation\\">&gt;</span></span>`\\n    `<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>groupId</span><span class=\\"token punctuation\\">&gt;</span></span>`org.projectlombok`<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>groupId</span><span class=\\"token punctuation\\">&gt;</span></span>`\\n    `<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>artifactId</span><span class=\\"token punctuation\\">&gt;</span></span>`lombok`<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>artifactId</span><span class=\\"token punctuation\\">&gt;</span></span>`\\n    `<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>version</span><span class=\\"token punctuation\\">&gt;</span></span>`1.18.30`<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>version</span><span class=\\"token punctuation\\">&gt;</span></span>`\\n    `<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>scope</span><span class=\\"token punctuation\\">&gt;</span></span>`provided`<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>scope</span><span class=\\"token punctuation\\">&gt;</span></span>`\\n`<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>dependency</span><span class=\\"token punctuation\\">&gt;</span></span>`\\n</code></pre></div>","autoDesc":true}');export{d as comp,k as data};
