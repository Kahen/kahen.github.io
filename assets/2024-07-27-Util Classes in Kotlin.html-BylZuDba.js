import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-CbPcg273.js";const e={},o=t(`<h1 id="kotlin中的实用类" tabindex="-1"><a class="header-anchor" href="#kotlin中的实用类"><span>Kotlin中的实用类</span></a></h1><p>实用类，简称工具类，是通常包含静态方法和常量的类。实用类在封装应用程序的核心功能中扮演着关键角色。这些类不打算被实例化，其主要目的是提供一组可重用的功能性。</p><p>在本教程中，我们将学习Kotlin中的实用类是什么，探索它们的重要性，提供代码示例，编写相应的测试，并展示实际用例。</p><h2 id="_2-为什么实用类很重要" tabindex="-1"><a class="header-anchor" href="#_2-为什么实用类很重要"><span>2. 为什么实用类很重要？</span></a></h2><p>实用类在软件开发中扮演着至关重要的角色。首先，它们遵循单一责任原则，专注于一组特定的实用功能。这确保了每个实用类都有一个明确定义的目的，有助于整体代码库的清晰度和可维护性。</p><p>此外，实用类通常具有静态方法和常量，消除了实例化的需求，这促进了效率。通过在专用类中封装实用功能，我们促进了项目中的关注点分离。这种隔离有助于维护一个干净和模块化的代码结构，使我们更容易管理和增强应用程序逻辑。</p><h2 id="_3-创建实用类" tabindex="-1"><a class="header-anchor" href="#_3-创建实用类"><span>3. 创建实用类</span></a></h2><p>接下来，我们将学习如何在Kotlin中创建实用类并测试它们。</p><p>在Kotlin中，<code>object</code>关键字确保我们在运行时只有一个实用类的实例。这个Kotlin特性确保了单例模式，意味着有一个单一的、全局可访问的实例对象，其中放置了任何实用函数。我们将在声明我们的实用类时使用<code>object</code>关键字，而不是<code>class</code>关键字。</p><p>让我们从一个简单的实用类开始，该类计算给定数字的平方：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">object</span> MathUtils <span class="token punctuation">{</span>
    <span class="token keyword">fun</span> <span class="token function">square</span><span class="token punctuation">(</span>number<span class="token operator">:</span> Int<span class="token punctuation">)</span><span class="token operator">:</span> Int <span class="token punctuation">{</span>
        <span class="token keyword">return</span> number <span class="token operator">*</span> number
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们测试我们的<code>MathUtils</code>类：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token annotation builtin">@Test</span>
<span class="token keyword">fun</span> <span class="token function">\`Should Calculate Square\`</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">25</span><span class="token punctuation">,</span> MathUtils<span class="token punctuation">.</span><span class="token function">square</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">36</span><span class="token punctuation">,</span> MathUtils<span class="token punctuation">.</span><span class="token function">square</span><span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以无需任何额外步骤直接从我们的实用类访问<code>square()</code>函数。</p><h3 id="_3-1-带扩展函数的实用类" tabindex="-1"><a class="header-anchor" href="#_3-1-带扩展函数的实用类"><span>3.1. 带扩展函数的实用类</span></a></h3><p>同样，Kotlin中的实用类经常包含扩展函数，这是一个功能，允许开发人员在不直接修改其源代码的情况下为现有类增加新功能。</p><p>现在，让我们创建一个包含扩展函数的实用类：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">object</span> ExtensionUtil <span class="token punctuation">{</span>
    <span class="token keyword">fun</span> String<span class="token punctuation">.</span><span class="token function">isPalindrome</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> Boolean <span class="token punctuation">{</span>
        <span class="token keyword">val</span> cleanString <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;\\\\s&quot;</span></span><span class="token punctuation">.</span><span class="token function">toRegex</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toLowerCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> cleanString <span class="token operator">==</span> cleanString<span class="token punctuation">.</span><span class="token function">reversed</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这段代码中，<code>isPalindrome()</code>函数是<code>String</code>类的扩展函数。该函数返回一个<code>Boolean</code>值，指示字符串是否是回文。</p><p>让我们看看我们的<code>ExtensionUtil</code>类的测试：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token annotation builtin">@Test</span>
<span class="token keyword">fun</span> <span class="token function">\`Should Check If Palindrome\`</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;radar&quot;</span></span><span class="token punctuation">.</span><span class="token function">isPalindrome</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;A man a plan a canal Panama&quot;</span></span><span class="token punctuation">.</span><span class="token function">isPalindrome</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以再次直接使用这个函数，唯一的区别是我们必须从<code>String</code>实例调用它。</p><p>这些扩展函数的可重用性至关重要，因为它允许这些函数在代码的各个部分被访问，体现了DRY（不要重复自己）原则。一旦在实用类中定义，这些扩展函数可以在使用相关类型的任何地方使用，促进了代码实现的效率和一致性。</p><p>此外，实用类通过为扩展函数提供控制环境来<strong>促进封装</strong>。这种封装还简化了与特定类型相关的功能的管理和更新。与Kotlin强调的表达性和简洁的代码相一致，这种封装设计确保扩展逻辑分组，<strong>提高项目中代码的可读性和可维护性</strong>。</p><h2 id="_4-java互操作性和-jvmstatic" tabindex="-1"><a class="header-anchor" href="#_4-java互操作性和-jvmstatic"><span>4. Java互操作性和<code>@JvmStatic</code></span></a></h2><p>当我们使用Kotlin并希望我们的代码与Java互操作时，我们可能会遇到需要在实用类中使用<code>@JvmStatic</code>注解的场景。<strong>这个注解特别适用于定义我们打算从Java代码调用的Kotlin对象或伴生对象中的方法。</strong></p><p>这里有一个示例来说明<code>@JvmStatic</code>的使用：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">object</span> Utils <span class="token punctuation">{</span>
    <span class="token annotation builtin">@JvmStatic</span>
    <span class="token keyword">fun</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> Boolean <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token boolean">false</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>具体来说，我们来看看如果我们的实用函数没有<code>@JvmStatic</code>注解，我们如何从Java调用它：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Utils</span><span class="token punctuation">.</span><span class="token constant">INSTANCE</span><span class="token punctuation">.</span><span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>值得注意的是，Kotlin编译器生成了一个名为<code>INSTANCE</code>的静态属性来持有单例实用对象。因此，<strong>没有<code>@JvmStatic</code>注解，我们不能直接从<code>Utils</code>类访问<code>foo()</code>函数——我们必须通过实例。</strong></p><p>最后，让我们像使用<code>@JvmStatic</code>注解一样从Java调用我们的实用函数：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Utils</span><span class="token punctuation">.</span><span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>**<code>@JvmStatic</code>注解在Java字节码中生成了一个适当的静态方法。**这意味着我们可以从<code>Utils</code>直接调用<code>foo()</code>，无需首先引用实例属性。</p><p>如果我们打算同时在Kotlin和Java中使用我们的实用类，那么<code>@JvmStatic</code>注解简化了与Java的互操作，并让代码表现得更像典型的Java静态方法。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>Kotlin中的实用类为封装可重用功能提供了强大的机制，促进了代码组织，并提高了可维护性。通过探索各种示例并编写相应的测试，我们展示了Kotlin开发中实用类的多样性和重要性。</p><p>像往常一样，这些示例的完整实现可以在GitHub上找到。</p>`,38),p=[o];function i(l,c){return s(),a("div",null,p)}const r=n(e,[["render",i],["__file","2024-07-27-Util Classes in Kotlin.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-27/2024-07-27-Util%20Classes%20in%20Kotlin.html","title":"Kotlin中的实用类","lang":"zh-CN","frontmatter":{"date":"2022-11-01T00:00:00.000Z","category":["Kotlin","Utility Classes"],"tag":["Kotlin","Utility Classes"],"head":[["meta",{"name":"keywords","content":"Kotlin Utility Classes, Kotlin 工具类, Kotlin 实用类"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-27/2024-07-27-Util%20Classes%20in%20Kotlin.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Kotlin中的实用类"}],["meta",{"property":"og:description","content":"Kotlin中的实用类 实用类，简称工具类，是通常包含静态方法和常量的类。实用类在封装应用程序的核心功能中扮演着关键角色。这些类不打算被实例化，其主要目的是提供一组可重用的功能性。 在本教程中，我们将学习Kotlin中的实用类是什么，探索它们的重要性，提供代码示例，编写相应的测试，并展示实际用例。 2. 为什么实用类很重要？ 实用类在软件开发中扮演着至..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-27T06:00:18.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Kotlin"}],["meta",{"property":"article:tag","content":"Utility Classes"}],["meta",{"property":"article:published_time","content":"2022-11-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-27T06:00:18.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Kotlin中的实用类\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-11-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-27T06:00:18.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Kotlin中的实用类 实用类，简称工具类，是通常包含静态方法和常量的类。实用类在封装应用程序的核心功能中扮演着关键角色。这些类不打算被实例化，其主要目的是提供一组可重用的功能性。 在本教程中，我们将学习Kotlin中的实用类是什么，探索它们的重要性，提供代码示例，编写相应的测试，并展示实际用例。 2. 为什么实用类很重要？ 实用类在软件开发中扮演着至..."},"headers":[{"level":2,"title":"2. 为什么实用类很重要？","slug":"_2-为什么实用类很重要","link":"#_2-为什么实用类很重要","children":[]},{"level":2,"title":"3. 创建实用类","slug":"_3-创建实用类","link":"#_3-创建实用类","children":[{"level":3,"title":"3.1. 带扩展函数的实用类","slug":"_3-1-带扩展函数的实用类","link":"#_3-1-带扩展函数的实用类","children":[]}]},{"level":2,"title":"4. Java互操作性和@JvmStatic","slug":"_4-java互操作性和-jvmstatic","link":"#_4-java互操作性和-jvmstatic","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1722060018000,"updatedTime":1722060018000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.51,"words":1353},"filePathRelative":"posts/baeldung/2024-07-27/2024-07-27-Util Classes in Kotlin.md","localizedDate":"2022年11月1日","excerpt":"\\n<p>实用类，简称工具类，是通常包含静态方法和常量的类。实用类在封装应用程序的核心功能中扮演着关键角色。这些类不打算被实例化，其主要目的是提供一组可重用的功能性。</p>\\n<p>在本教程中，我们将学习Kotlin中的实用类是什么，探索它们的重要性，提供代码示例，编写相应的测试，并展示实际用例。</p>\\n<h2>2. 为什么实用类很重要？</h2>\\n<p>实用类在软件开发中扮演着至关重要的角色。首先，它们遵循单一责任原则，专注于一组特定的实用功能。这确保了每个实用类都有一个明确定义的目的，有助于整体代码库的清晰度和可维护性。</p>\\n<p>此外，实用类通常具有静态方法和常量，消除了实例化的需求，这促进了效率。通过在专用类中封装实用功能，我们促进了项目中的关注点分离。这种隔离有助于维护一个干净和模块化的代码结构，使我们更容易管理和增强应用程序逻辑。</p>","autoDesc":true}');export{r as comp,k as data};
