import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-BaAI5AMv.js";const e={},p=t('<h1 id="kotlin中向泛型方法传递类型" tabindex="-1"><a class="header-anchor" href="#kotlin中向泛型方法传递类型"><span>Kotlin中向泛型方法传递类型</span></a></h1><p>泛型在Kotlin中使开发者能够编写可重用且类型安全的代码，提供在处理各种数据类型时的灵活性。</p><p>正如我们所知，泛型类和方法使用尖括号来指定类型参数。我们通常需要向泛型方法传递类型参数。</p><p>在本教程中，我们将探索向泛型方法传递类型的各种方法。</p><h2 id="_2-使用类参数" tabindex="-1"><a class="header-anchor" href="#_2-使用类参数"><span>2. 使用类参数</span></a></h2><p>向泛型方法传递类型的一种方式是使用<strong>类</strong>参数。这允许泛型方法访问并使用指定的类型：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">fun</span> ````<span class="token operator">&lt;</span>T<span class="token operator">&gt;</span>```` <span class="token function">passTypeUsingClassParameter</span><span class="token punctuation">(</span>clazz<span class="token operator">:</span> Class````<span class="token operator">&lt;</span>T<span class="token operator">&gt;</span>````<span class="token punctuation">)</span><span class="token operator">:</span> String <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> clazz<span class="token punctuation">.</span>simpleName\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们的辅助方法接受一个<code>Class````&lt;T&gt;`````参数，并以</code>String<code>的形式返回</code>simpleName`：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token annotation builtin">@Test</span>\n<span class="token keyword">fun</span> <span class="token function">`pass type to generic method using class parameters`</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;String&quot;</span></span><span class="token punctuation">,</span> <span class="token function">passTypeUsingClassParameter</span><span class="token punctuation">(</span>String<span class="token operator">::</span><span class="token keyword">class</span><span class="token punctuation">.</span>java<span class="token punctuation">)</span><span class="token punctuation">)</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Int&quot;</span></span><span class="token punctuation">,</span> <span class="token function">passTypeUsingClassParameter</span><span class="token punctuation">(</span>Int<span class="token operator">::</span><span class="token keyword">class</span><span class="token punctuation">.</span>java<span class="token punctuation">)</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在我们的测试中，我们验证了<code>passTypeUsingClassParameter()</code>方法是否正确返回了<code>String</code>和<code>Int</code>类的简单名称字符串。</p><p>Kotlin可以根据提供的类引用推断类型。因此，指定泛型类型的尖括号被省略了。</p><h2 id="_3-使用具现化类型参数" tabindex="-1"><a class="header-anchor" href="#_3-使用具现化类型参数"><span>3. 使用具现化类型参数</span></a></h2><p>Kotlin的<strong>具现化</strong>类型参数也可以用来向泛型方法传递类的类型。具现化类型参数允许在运行时访问类型的实际类，使得在方法内直接使用类型成为可能：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">inline</span> <span class="token keyword">fun</span> `<span class="token operator">&lt;</span><span class="token keyword">reified</span> T<span class="token operator">&gt;</span>` <span class="token function">passTypeUsingReifiedParameter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> String<span class="token operator">?</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> T<span class="token operator">::</span><span class="token keyword">class</span><span class="token punctuation">.</span>simpleName\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>随后，在方法内部，<code>T::class.simpleName</code>检索了泛型类型所表示的类的简单名称。</p><p>像往常一样，我们应该测试我们的方法以确保它们正确工作：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token annotation builtin">@Test</span>\n<span class="token keyword">fun</span> <span class="token function">`pass type to generic method using reified parameters`</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;String&quot;</span></span><span class="token punctuation">,</span> passTypeUsingReifiedParameter<span class="token function">`&lt;String&gt;`</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Int&quot;</span></span><span class="token punctuation">,</span> passTypeUsingReifiedParameter<span class="token function">`&lt;Int&gt;`</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>具现化</strong>关键字允许直接访问类型参数，使得客户端可以指定类型而无需传递类引用。这简化了泛型方法的使用并提高了代码的可读性。</p><h2 id="_4-使用高阶方法" tabindex="-1"><a class="header-anchor" href="#_4-使用高阶方法"><span>4. 使用高阶方法</span></a></h2><p>高阶函数也可以间接地向泛型方法传递类型。通过接受一个函数作为参数，我们可以将提供类型的职责委托给调用者：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">fun</span> ````<span class="token operator">&lt;</span>T<span class="token operator">&gt;</span>```` <span class="token function">passTypeUsingHigherOrderFunction</span><span class="token punctuation">(</span>action<span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> T<span class="token punctuation">)</span><span class="token operator">:</span> T <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token function">action</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>而不是直接确定类型，这个方法立即执行提供的lambda函数，通过调用<code>action()</code>，它返回了一个推断出的类型</strong>。</p><p>因此，<code>passTypeUsingHigherOrderFunction()</code>有效地将类型推断委托给了lambda函数，直接返回了它产生的结果。最后，我们可以用返回不同类型结果的lambda来证明这是有效的：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token annotation builtin">@Test</span>\n<span class="token keyword">fun</span> <span class="token function">`pass type to generic method using higher order functions`</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">val</span> intValue <span class="token operator">=</span> passTypeUsingHigherOrderFunction<span class="token punctuation">{</span><span class="token number">42</span><span class="token punctuation">}</span>\n    <span class="token keyword">val</span> stringValue <span class="token operator">=</span> passTypeUsingHigherOrderFunction<span class="token punctuation">{</span><span class="token string-literal singleline"><span class="token string">&quot;Generic Method!&quot;</span></span><span class="token punctuation">}</span>\n\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">42</span><span class="token punctuation">,</span> intValue<span class="token punctuation">)</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Generic Method!&quot;</span></span><span class="token punctuation">,</span> stringValue<span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们探索了向泛型方法传递类型的各种方法。我们从作为参数的类引用开始，这是一个基本方法。然后我们利用具现化类型参数在运行时提供对类类型的直接访问。最后，我们使用高阶方法来展示灵活的泛型系统，并展示了一种复杂的传递泛型类型的方式。</p><p>通过理解和使用这些多样化的方法，我们可以有效地解决各种场景，同时在我们的项目中保持类型安全性和清晰度。</p><p>如常，本文中使用的全部源代码可以在GitHub上找到。</p><p>OK</p>',29),o=[p];function i(l,c){return a(),s("div",null,o)}const d=n(e,[["render",i],["__file","2024-06-20-Passing a Type to Generic Method in Kotlin.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/Archive/2024-06-20-Passing%20a%20Type%20to%20Generic%20Method%20in%20Kotlin.html","title":"Kotlin中向泛型方法传递类型","lang":"zh-CN","frontmatter":{"date":"2024-06-20T00:00:00.000Z","category":["Kotlin","Programming"],"tag":["Generics","Kotlin Tutorial"],"head":[["meta",{"name":"keywords","content":"Kotlin, Generic Methods, Type Safety, Reified Type Parameters, Higher-Order Functions"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/2024-06-20-Passing%20a%20Type%20to%20Generic%20Method%20in%20Kotlin.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Kotlin中向泛型方法传递类型"}],["meta",{"property":"og:description","content":"Kotlin中向泛型方法传递类型 泛型在Kotlin中使开发者能够编写可重用且类型安全的代码，提供在处理各种数据类型时的灵活性。 正如我们所知，泛型类和方法使用尖括号来指定类型参数。我们通常需要向泛型方法传递类型参数。 在本教程中，我们将探索向泛型方法传递类型的各种方法。 2. 使用类参数 向泛型方法传递类型的一种方式是使用类参数。这允许泛型方法访问并..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Generics"}],["meta",{"property":"article:tag","content":"Kotlin Tutorial"}],["meta",{"property":"article:published_time","content":"2024-06-20T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Kotlin中向泛型方法传递类型\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-20T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Kotlin中向泛型方法传递类型 泛型在Kotlin中使开发者能够编写可重用且类型安全的代码，提供在处理各种数据类型时的灵活性。 正如我们所知，泛型类和方法使用尖括号来指定类型参数。我们通常需要向泛型方法传递类型参数。 在本教程中，我们将探索向泛型方法传递类型的各种方法。 2. 使用类参数 向泛型方法传递类型的一种方式是使用类参数。这允许泛型方法访问并..."},"headers":[{"level":2,"title":"2. 使用类参数","slug":"_2-使用类参数","link":"#_2-使用类参数","children":[]},{"level":2,"title":"3. 使用具现化类型参数","slug":"_3-使用具现化类型参数","link":"#_3-使用具现化类型参数","children":[]},{"level":2,"title":"4. 使用高阶方法","slug":"_4-使用高阶方法","link":"#_4-使用高阶方法","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":2.95,"words":886},"filePathRelative":"posts/baeldung/Archive/2024-06-20-Passing a Type to Generic Method in Kotlin.md","localizedDate":"2024年6月20日","excerpt":"\\n<p>泛型在Kotlin中使开发者能够编写可重用且类型安全的代码，提供在处理各种数据类型时的灵活性。</p>\\n<p>正如我们所知，泛型类和方法使用尖括号来指定类型参数。我们通常需要向泛型方法传递类型参数。</p>\\n<p>在本教程中，我们将探索向泛型方法传递类型的各种方法。</p>\\n<h2>2. 使用类参数</h2>\\n<p>向泛型方法传递类型的一种方式是使用<strong>类</strong>参数。这允许泛型方法访问并使用指定的类型：</p>\\n<div class=\\"language-kotlin\\" data-ext=\\"kt\\" data-title=\\"kt\\"><pre class=\\"language-kotlin\\"><code><span class=\\"token keyword\\">fun</span> ````<span class=\\"token operator\\">&lt;</span>T<span class=\\"token operator\\">&gt;</span>```` <span class=\\"token function\\">passTypeUsingClassParameter</span><span class=\\"token punctuation\\">(</span>clazz<span class=\\"token operator\\">:</span> Class````<span class=\\"token operator\\">&lt;</span>T<span class=\\"token operator\\">&gt;</span>````<span class=\\"token punctuation\\">)</span><span class=\\"token operator\\">:</span> String <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">return</span> clazz<span class=\\"token punctuation\\">.</span>simpleName\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{d as comp,k as data};
