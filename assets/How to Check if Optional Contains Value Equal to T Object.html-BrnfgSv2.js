import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as a,a as n}from"./app-DRFG6C5y.js";const l={},i=n(`<h1 id="如何检查optional是否包含等于t对象的值-baeldung" tabindex="-1"><a class="header-anchor" href="#如何检查optional是否包含等于t对象的值-baeldung"><span>如何检查Optional是否包含等于T对象的值 | Baeldung</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p><em>Optional</em> 是Java 8引入的一个类，属于_java.util_包。它作为一个容器，可能包含也可能不包含一个非空值。<em>Optional_可以帮助我们更有效地处理_null_值，并避免代码中的_NullPointerException</em>。</p><p>当我们使用_Optional_时，一个常见的任务是检查它是否包含一个等于特定对象的值。在本教程中，我们将探讨执行此检查的各种技术。</p><h2 id="_2-问题的介绍" tabindex="-1"><a class="header-anchor" href="#_2-问题的介绍"><span>2. 问题的介绍</span></a></h2><p>首先，让我们澄清等值检查的要求。假设我们有两个对象；一个是类型为_T_的非空_valueOfT_对象，另一个是一个类型为_Optional<code>&lt;T&gt;</code>_的_opt_实例。</p><p><strong>如果_opt_为空，它不包含任何值</strong>。也就是说，**里面的值不能与任何目标对象相等，所以检查将总是返回_false_。**相反，如果_opt_存在，我们需要验证_opt_携带的值是否等于_valueOfT_。</p><p>简单来说，<strong>我们将执行一个“<em>opt_存在并且等于_valueOfT</em>”的检查。</strong></p><p>在本教程中，我们将探索完成此任务的各种方法。为了保持简单，我们将使用_String_作为_T_的示例来演示每种方法。让我们创建两个_String_常量：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>static final String A_B_C = &quot;a b c&quot;;
static final String X_Y_Z = &quot;x y z&quot;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>我们将在单元测试中使用这些_String_值来展示不同方法的结果。</p><p>接下来，让我们深入代码并检查如何实现检查。</p><h2 id="_3-使用-optional-equals" tabindex="-1"><a class="header-anchor" href="#_3-使用-optional-equals"><span>3. 使用_Optional._ <em>equals()</em></span></a></h2><p>_Optional_类重写了_equals()<em>方法。**如果两个_Optional_对象都存在，并且它们持有的值相等，该方法返回_true</em>。**因此，我们可以首先从_valueOfT_创建一个_Optional_实例，然后使用给定的_opt_对象使用_Optional.equals()_进行检查：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>opt.isPresent() &amp;&amp; opt.equals(Optional.of(valueOfT));
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>接下来，让我们检查这种方法是否按预期工作。</p><p>首先，让我们看看_opt_的缺失情况：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Optional\`\`\`&lt;String&gt;\`\`\` opt = Optional.empty();
assertFalse(opt.isPresent() &amp;&amp; opt.equals(Optional.of(A_B_C)));
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们提到的，<strong>如果_opt_为空，无论_valueOfT_的值是什么，整个检查应该返回_false_。</strong></p><p>接下来，让我们看看当_opt_存在时这种方法是否产生预期的结果：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>opt = Optional.of(X_Y_Z);
assertFalse(opt.isPresent() &amp;&amp; opt.equals(Optional.of(A_B_C)));

opt = Optional.of(A_B_C);
assertTrue(opt.isPresent() &amp;&amp; opt.equals(Optional.of(A_B_C)));
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，<strong>这种方法解决了问题，但它创建了一个中间_Optional_对象</strong>。</p><h2 id="_4-使用-optional-get" tabindex="-1"><a class="header-anchor" href="#_4-使用-optional-get"><span>4. 使用_Optional.get()_</span></a></h2><p>检查_opt_中包含的值是否等于_valueOfT_的一个直接方法是<strong>首先使用_Optional.get()_检索_opt_中的值，然后验证它与_valueOfT_的等值性</strong>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>opt.isPresent() &amp;&amp; opt.get().equals(valueOfT);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>接下来，让我们按照这种模式使用相同的输入来验证它是否产生正确的结果：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Optional\`\`\`&lt;String&gt;\`\`\` opt = Optional.empty();
assertFalse(opt.isPresent() &amp;&amp; opt.get().equals(A_B_C));

opt = Optional.of(X_Y_Z);
assertFalse(opt.isPresent() &amp;&amp; opt.get().equals(A_B_C));

opt = Optional.of(A_B_C);
assertTrue(opt.isPresent() &amp;&amp; opt.get().equals(A_B_C));
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如代码所示，<strong>这个解决方案没有创建额外的对象</strong>。</p><h2 id="_5-使用-optional-map-和-optional-orelse" tabindex="-1"><a class="header-anchor" href="#_5-使用-optional-map-和-optional-orelse"><span>5. 使用_Optional.map()<em>和_Optional.orElse()</em></span></a></h2><p>我们期望在“<em>opt_存在并且等于_valueOfT</em>”检查后获得一个_boolean_值。因此，我们可以将这个问题视为<strong>将_Optional_对象转换为_boolean_，遵循一定的规则</strong>。</p><p>_Optional_类提供了_map()<em>来将存在的_Optional_转换为携带不同值的另一个_Optional</em>。</p><p>此外，_orElse()_方法如果_Optional_存在，则返回_Optional_实例包装的值。否则，<strong>如果_Optional_为空，_orElse()_返回我们指定的值</strong>。</p><p>所以，我们可以结合这两种方法来执行等值检查，并从给定的_Optional_中获得一个_boolean_：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>opt.map(v -&gt; v.equals(valueOfT)).orElse(false);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>接下来，让我们看看它是否适用于我们的输入：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Optional\`\`\`&lt;String&gt;\`\`\` opt = Optional.empty();
assertFalse(opt.map(A_B_C::equals).orElse(false));

opt = Optional.of(X_Y_Z);
assertFalse(opt.map(A_B_C::equals).orElse(false));

opt = Optional.of(A_B_C);
assertTrue(opt.map(A_B_C::equals).orElse(false));
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个解决方案也产生了一个由_Optional_对象_map()_创建的中间对象。然而，它是一个功能性和流畅的方法。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们探讨了三种检查_Optional_是否包含等于特定对象值的方法。这些方法允许我们对_Optional_实例执行空安全值比较操作，确保代码的健壮性和无错误。</p><p>如常，示例的完整源代码可在GitHub上获得。</p>`,40),o=[i];function p(s,r){return a(),t("div",null,o)}const c=e(l,[["render",p],["__file","How to Check if Optional Contains Value Equal to T Object.html.vue"]]),u=JSON.parse('{"path":"/posts/baeldung/Archive/How%20to%20Check%20if%20Optional%20Contains%20Value%20Equal%20to%20T%20Object.html","title":"如何检查Optional是否包含等于T对象的值 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-06-15T00:00:00.000Z","category":["Java","Optional"],"tag":["Java 8","Optional","equals","get","map"],"description":"如何检查Optional是否包含等于T对象的值 | Baeldung 1. 概述 Optional 是Java 8引入的一个类，属于_java.util_包。它作为一个容器，可能包含也可能不包含一个非空值。Optional_可以帮助我们更有效地处理_null_值，并避免代码中的_NullPointerException。 当我们使用_Optional_...","head":[["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/How%20to%20Check%20if%20Optional%20Contains%20Value%20Equal%20to%20T%20Object.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"如何检查Optional是否包含等于T对象的值 | Baeldung"}],["meta",{"property":"og:description","content":"如何检查Optional是否包含等于T对象的值 | Baeldung 1. 概述 Optional 是Java 8引入的一个类，属于_java.util_包。它作为一个容器，可能包含也可能不包含一个非空值。Optional_可以帮助我们更有效地处理_null_值，并避免代码中的_NullPointerException。 当我们使用_Optional_..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java 8"}],["meta",{"property":"article:tag","content":"Optional"}],["meta",{"property":"article:tag","content":"equals"}],["meta",{"property":"article:tag","content":"get"}],["meta",{"property":"article:tag","content":"map"}],["meta",{"property":"article:published_time","content":"2024-06-15T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"如何检查Optional是否包含等于T对象的值 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-15T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]]},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 问题的介绍","slug":"_2-问题的介绍","link":"#_2-问题的介绍","children":[]},{"level":2,"title":"3. 使用_Optional._ equals()","slug":"_3-使用-optional-equals","link":"#_3-使用-optional-equals","children":[]},{"level":2,"title":"4. 使用_Optional.get()_","slug":"_4-使用-optional-get","link":"#_4-使用-optional-get","children":[]},{"level":2,"title":"5. 使用_Optional.map()和_Optional.orElse()","slug":"_5-使用-optional-map-和-optional-orelse","link":"#_5-使用-optional-map-和-optional-orelse","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":3.61,"words":1082},"filePathRelative":"posts/baeldung/Archive/How to Check if Optional Contains Value Equal to T Object.md","localizedDate":"2024年6月15日","excerpt":"\\n<h2>1. 概述</h2>\\n<p><em>Optional</em> 是Java 8引入的一个类，属于_java.util_包。它作为一个容器，可能包含也可能不包含一个非空值。<em>Optional_可以帮助我们更有效地处理_null_值，并避免代码中的_NullPointerException</em>。</p>\\n<p>当我们使用_Optional_时，一个常见的任务是检查它是否包含一个等于特定对象的值。在本教程中，我们将探讨执行此检查的各种技术。</p>\\n<h2>2. 问题的介绍</h2>\\n<p>首先，让我们澄清等值检查的要求。假设我们有两个对象；一个是类型为_T_的非空_valueOfT_对象，另一个是一个类型为_Optional<code>&lt;T&gt;</code>_的_opt_实例。</p>","autoDesc":true}');export{c as comp,u as data};
