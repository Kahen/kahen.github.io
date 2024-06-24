import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as t,a as s}from"./app-C-OIrTa1.js";const e={},o=s(`<h1 id="java中optional-of-与optional-ofnullable-的区别-baeldung" tabindex="-1"><a class="header-anchor" href="#java中optional-of-与optional-ofnullable-的区别-baeldung"><span>Java中Optional.of()与Optional.ofNullable()的区别 | Baeldung</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在Java中，一个引用可能指向内存中的一个对象，也可能不指向任何对象，换句话说，一个引用可以是_null_。因此，这可能导致抛出一个_NullPointerException_。</p><p>为了解决这个问题，Java 8引入了_Optional_类。<strong>将一个引用包装在_Optional_中可以让我们更好地表达一个值是否存在的可能性。</strong> 此外，我们可以利用_Optional_类上的多种工具方法，如_isPresent()<em>，以避免运行时抛出_NullPointerException</em>。</p><p>我们可以使用静态工厂方法_Optional.of()_和_Optional.ofNullable()<em>来为给定的引用获取一个_Optional</em>。但是，我们应该使用哪一个呢？在本教程中，我们将探讨这些方法之间的区别，并了解何时使用哪一个。</p><h2 id="_2-optional-of-方法" tabindex="-1"><a class="header-anchor" href="#_2-optional-of-方法"><span>2. _Optional.of()_方法</span></a></h2><p><strong>当我们确定我们有一个非_null_引用时，我们应该使用_Optional.of()_静态工厂方法。</strong></p><p>假设我们有一个本地_String_变量，我们想从中获取一个_Optional_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenNonNullReference_whenUsingOptionalOf_thenObtainOptional</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> s <span class="token operator">=</span> <span class="token string">&quot;no null here&quot;</span><span class="token punctuation">;</span>
    <span class="token function">assertThat</span><span class="token punctuation">(</span><span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">isNotEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">hasValue</span><span class="token punctuation">(</span><span class="token string">&quot;no null here&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从我们的断言中，我们可以看到我们的optional不为空。换句话说，返回一个_Optional_是否有值的工具方法_isPresent()<em>将返回_true</em>。</p><p><strong>然而，当我们在_null_引用上使用这个方法时，我们将遇到一个_NullPointerException_。</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenNullReference_whenUsingOptionalOf_thenNullPointerExceptionThrown</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> s <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token function">assertThatThrownBy</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">isInstanceOf</span><span class="token punctuation">(</span><span class="token class-name">NullPointerException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-optional-ofnullable-方法" tabindex="-1"><a class="header-anchor" href="#_3-optional-ofnullable-方法"><span>3. _Optional.ofNullable()_方法</span></a></h2><p>我们应该在可能有或可能没有_null_引用时使用_Optional.ofNullable()<em>静态工厂方法。**因此，我们不会在引用为_null_时遇到_NullPointerException</em>。** <strong>相反，我们将获得一个空的_Optional_</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenNullReference_whenUsingOptionalOfNullable_thenObtainOptional</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> s <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token function">assertThat</span><span class="token punctuation">(</span><span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">ofNullable</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们自然会问，为什么我们不总是使用_Optional.ofNullable()<em>而不是_Optional.of()</em>。</p><p>使用_Optional.of()_允许我们通过抛出异常立即停止代码的执行。这发生在我们之前发现的，当我们为一个_null_引用获取_Optional_时。<strong>换句话说，使用_Optional.of()_方法允许我们遵循尽早失败的原则。</strong></p><p>顺便说一下，我们可能会遇到开发者使用这些静态工厂方法作为使用函数式编程的入口点。这是通过使用_Optional_类上使用函数对象作为方法参数的方法实现的，如_map()_。</p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在这篇文章中，我们学习了静态工厂方法_Optional.of()_和_Optional.ofNullable()_之间的主要区别，以及何时使用它们最合适。</p><p>我们看到如何利用_Optional_类帮助避免抛出_NullPointerException_。</p><p>最后，我们触及了尽早失败的原则，以及遵循这一原则如何影响使用哪个静态工厂方法。</p><p>如往常一样，本文中使用的代码示例可在GitHub上找到。</p>`,23),l=[o];function p(i,c){return t(),a("div",null,l)}const _=n(e,[["render",p],["__file","Difference Between Optional.of   and Optional.ofNullable   in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/Archive/Difference%20Between%20Optional.of%20%20%20and%20Optional.ofNullable%20%20%20in%20Java.html","title":"Java中Optional.of()与Optional.ofNullable()的区别 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-06-15T00:00:00.000Z","category":["Java","Optional"],"tag":["Java","Optional.of()","Optional.ofNullable()"],"description":"Java中Optional.of()与Optional.ofNullable()的区别 | Baeldung 1. 概述 在Java中，一个引用可能指向内存中的一个对象，也可能不指向任何对象，换句话说，一个引用可以是_null_。因此，这可能导致抛出一个_NullPointerException_。 为了解决这个问题，Java 8引入了_Optiona...","head":[["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/Difference%20Between%20Optional.of%20%20%20and%20Optional.ofNullable%20%20%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中Optional.of()与Optional.ofNullable()的区别 | Baeldung"}],["meta",{"property":"og:description","content":"Java中Optional.of()与Optional.ofNullable()的区别 | Baeldung 1. 概述 在Java中，一个引用可能指向内存中的一个对象，也可能不指向任何对象，换句话说，一个引用可以是_null_。因此，这可能导致抛出一个_NullPointerException_。 为了解决这个问题，Java 8引入了_Optiona..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Optional.of()"}],["meta",{"property":"article:tag","content":"Optional.ofNullable()"}],["meta",{"property":"article:published_time","content":"2024-06-15T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中Optional.of()与Optional.ofNullable()的区别 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-15T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]]},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. _Optional.of()_方法","slug":"_2-optional-of-方法","link":"#_2-optional-of-方法","children":[]},{"level":2,"title":"3. _Optional.ofNullable()_方法","slug":"_3-optional-ofnullable-方法","link":"#_3-optional-ofnullable-方法","children":[]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":2.41,"words":724},"filePathRelative":"posts/baeldung/Archive/Difference Between Optional.of   and Optional.ofNullable   in Java.md","localizedDate":"2024年6月15日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>在Java中，一个引用可能指向内存中的一个对象，也可能不指向任何对象，换句话说，一个引用可以是_null_。因此，这可能导致抛出一个_NullPointerException_。</p>\\n<p>为了解决这个问题，Java 8引入了_Optional_类。<strong>将一个引用包装在_Optional_中可以让我们更好地表达一个值是否存在的可能性。</strong> 此外，我们可以利用_Optional_类上的多种工具方法，如_isPresent()<em>，以避免运行时抛出_NullPointerException</em>。</p>\\n<p>我们可以使用静态工厂方法_Optional.of()_和_Optional.ofNullable()<em>来为给定的引用获取一个_Optional</em>。但是，我们应该使用哪一个呢？在本教程中，我们将探讨这些方法之间的区别，并了解何时使用哪一个。</p>","autoDesc":true}');export{_ as comp,d as data};
