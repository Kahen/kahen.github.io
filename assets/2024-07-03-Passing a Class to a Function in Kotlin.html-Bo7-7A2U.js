import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-B_xdonR7.js";const e={},l=t('<h1 id="在kotlin中将类传递给函数" tabindex="-1"><a class="header-anchor" href="#在kotlin中将类传递给函数"><span>在Kotlin中将类传递给函数</span></a></h1><p>在Kotlin中，类是语言的基本构建块，我们使用它们来定义对象及其行为。虽然通常传递各种数据类型的参数，但有时我们需要将类作为参数传递给函数。</p><p>将类传递给函数允许我们将其用作函数中的参数，从而可以对其进行操作。本教程将探讨在Kotlin中将类引用传递给函数的方法。</p><h2 id="_2-使用类引用" tabindex="-1"><a class="header-anchor" href="#_2-使用类引用"><span>2. 使用类引用</span></a></h2><p>在Kotlin中，每个类都与一个类引用相关联。Kotlin中有两类类引用。_KClass_是Kotlin类引用：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>MyClass::class\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>还有我们从Java熟悉的传统_Class_引用：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>MyClass::class.java\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_2-1-class-与-kclass-的区别" tabindex="-1"><a class="header-anchor" href="#_2-1-class-与-kclass-的区别"><span>2.1. _Class_与_KClass_的区别</span></a></h3><p>如上所述，类引用有两种表示形式：<em>Class_和_KClass</em>。<strong>主要区别在于_KClass_提供了额外的Kotlin特定特性，如类型参数和可空类型</strong>。更重要的是，<em>KClass_提供了一种统一的方式来处理用_Kotlin</em>、_Java_和其他_JVM_语言编写的类，而_Class_主要用于_Java_互操作目的。</p><h3 id="_2-2-使用-class-参数访问" tabindex="-1"><a class="header-anchor" href="#_2-2-使用-class-参数访问"><span>2.2. 使用_Class_参数访问</span></a></h3><p>首先，我们定义一个可以作为参数传递给函数的类：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">class</span> ParameterClass <span class="token punctuation">{</span>\n    <span class="token keyword">fun</span> <span class="token function">parameterClassMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> String <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token string-literal singleline"><span class="token string">&quot;这是我们类上调用的方法&quot;</span></span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是一个只有一种返回_String_的方法的简单类。</p><p>我们现在可以定义一个接受这个类作为参数的函数，使用类引用：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">fun</span> ```<span class="token operator">&lt;</span>T <span class="token operator">:</span> ParameterClass<span class="token operator">&gt;</span>``` <span class="token function">functionAcceptingClassReference</span><span class="token punctuation">(</span>clazz<span class="token operator">:</span> Class```<span class="token operator">&lt;</span>T<span class="token operator">&gt;</span>```<span class="token punctuation">)</span><span class="token operator">:</span> String <span class="token punctuation">{</span>\n    <span class="token keyword">val</span> instance <span class="token operator">=</span> clazz<span class="token punctuation">.</span><span class="token function">newInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n    <span class="token keyword">return</span> instance<span class="token punctuation">.</span><span class="token function">parameterClassMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该方法接受一个名为_clazz_的单一参数，类型为_T_的类引用，必须是_ParameterClass_的子类。</p><p><strong>我们使用_Class_的_newInstance()_方法创建类引用的实例</strong>。这将创建一个新的_ParameterClass_实例。</p><p>最后，我们调用_ParameterClass_实例上的_paramterClassMethod()_并将方法调用的结果作为_String_返回。</p><p>现在让我们测试这个方法以确保它正常工作：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token annotation builtin">@Test</span>\n<span class="token keyword">fun</span> <span class="token function">`使用类引用将类作为函数参数传递`</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">val</span> result <span class="token operator">=</span> <span class="token function">functionAcceptingClassReference</span><span class="token punctuation">(</span>ParameterClass<span class="token operator">::</span><span class="token keyword">class</span><span class="token punctuation">.</span>java<span class="token punctuation">)</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;这是我们类上调用的方法&quot;</span></span><span class="token punctuation">,</span> result<span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个单元测试中，我们将_ParameterClass_的_Class_引用作为参数传递给我们的方法。最后，我们断言这个方法返回了我们_ParameterClass_的预期字符串，以证明我们使用了类型引用。</p><h3 id="_2-3-使用-kclass-参数访问" tabindex="-1"><a class="header-anchor" href="#_2-3-使用-kclass-参数访问"><span>2.3. 使用_KClass_参数访问</span></a></h3><p>或者，我们可以将_KClass_参数传递给我们的函数，而不是_Class_参数：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">fun</span> ```<span class="token operator">&lt;</span>T <span class="token operator">:</span> ParameterClass<span class="token operator">&gt;</span>``` <span class="token function">functionAcceptingKClassReference</span><span class="token punctuation">(</span>clazz<span class="token operator">:</span> KClass```<span class="token operator">&lt;</span>T<span class="token operator">&gt;</span>```<span class="token punctuation">)</span><span class="token operator">:</span> String <span class="token punctuation">{</span>\n    <span class="token keyword">val</span> instance <span class="token operator">=</span> clazz<span class="token punctuation">.</span><span class="token function">createInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n    <span class="token keyword">return</span> instance<span class="token punctuation">.</span><span class="token function">paramterClassMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个辅助方法接受一个_KClass_参数。<strong>这个参数必须是扩展了_ParameterClass_的_KClass_引用</strong>。</p><p>与之前的方法不同，_KClass_提供了_createInstance()<em>来创建_ParameterClass_的实例。最后，我们使用这个实例调用_parameterClassMethod()</em>：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token annotation builtin">@Test</span>\n<span class="token keyword">fun</span> <span class="token function">`使用kclass引用将类作为函数参数传递`</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">val</span> result <span class="token operator">=</span> <span class="token function">functionAcceptingKClassReference</span><span class="token punctuation">(</span>ParameterClass<span class="token operator">::</span><span class="token keyword">class</span><span class="token punctuation">)</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;这是我们类上调用的方法&quot;</span></span><span class="token punctuation">,</span> result<span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，我们断言我们的辅助方法返回了我们_ParameterClass_方法的正确字符串。</p><h2 id="_3-使用-reified-类型参数" tabindex="-1"><a class="header-anchor" href="#_3-使用-reified-类型参数"><span>3. 使用_reified_类型参数</span></a></h2><p>另外，我们可以使用_reified_类型参数将类传递给函数。<strong>它允许我们在运行时访问泛型类型参数的类</strong>。</p><p>_reified_关键字允许我们在不将其作为参数传递的情况下访问泛型类型参数。更重要的是，我们可以轻松地使用类型参数获取类的_Class_或_KClass_对象：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">inline</span> <span class="token keyword">fun</span> `<span class="token operator">&lt;</span><span class="token keyword">reified</span> T <span class="token operator">:</span> ParameterClass<span class="token operator">&gt;</span>` <span class="token function">functionAcceptingClassNameUsingReifiedParameters</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> String <span class="token punctuation">{</span>\n    <span class="token keyword">val</span> instance <span class="token operator">=</span> T<span class="token operator">::</span><span class="token keyword">class</span><span class="token punctuation">.</span>java<span class="token punctuation">.</span><span class="token function">newInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n    <span class="token keyword">return</span> instance<span class="token punctuation">.</span><span class="token function">parameterClassMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>类似地，这个方法从类引用创建了_ParameterClass_类的实例</strong>。然后我们返回来自_parameterClassMethod()_方法的字符串：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token annotation builtin">@Test</span>\n<span class="token keyword">fun</span> <span class="token function">`使用reified参数将类作为函数参数传递`</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">val</span> result <span class="token operator">=</span> functionAcceptingClassNameUsingReifiedParameters``<span class="token operator">&lt;</span>ParameterClass<span class="token operator">&gt;</span>``<span class="token punctuation">(</span><span class="token punctuation">)</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;这是我们类上调用的方法&quot;</span></span><span class="token punctuation">,</span> result<span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个单元测试中，由于_reified_类型参数，我们作为参数传递了_ParameterClass_类型。最后，我们断言_functionAcceptingClassNameUsingReifiedParameters()_方法返回了正确的字符串。</p><h2 id="_4-使用java反射" tabindex="-1"><a class="header-anchor" href="#_4-使用java反射"><span>4. 使用Java反射</span></a></h2><p>最后，我们可以使用Java的反射将类传递给函数。<strong>这是通过将完全限定的类名作为_String_传递，然后使用反射创建类的实例来完成的</strong>：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">fun</span> ```<span class="token operator">&lt;</span>T <span class="token operator">:</span> ParameterClass<span class="token operator">&gt;</span>``` <span class="token function">functionAcceptingClassNameUsingReflection</span><span class="token punctuation">(</span>className<span class="token operator">:</span> String<span class="token punctuation">)</span><span class="token operator">:</span> String <span class="token punctuation">{</span>\n    <span class="token keyword">val</span> clazz <span class="token operator">=</span> Class<span class="token punctuation">.</span><span class="token function">forName</span><span class="token punctuation">(</span>className<span class="token punctuation">)</span> <span class="token keyword">as</span> Class```<span class="token operator">&lt;</span>T<span class="token operator">&gt;</span>```\n    <span class="token keyword">val</span> instance <span class="token operator">=</span> clazz<span class="token punctuation">.</span><span class="token function">newInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n\n    <span class="token keyword">return</span> instance<span class="token punctuation">.</span><span class="token function">parameterClassMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个方法首先通过调用_Class.forName(className)_方法获得对应于_className_参数的_Class_对象的引用。<em>as_关键字将_Class_对象转换为泛型类型_T_的_Class</em>。</p><p><strong>接下来，我们创建类的实例</strong>。</p><p>最后，我们在_ParameterClass_的实例上调用_parameterClassMethod()_方法：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token annotation builtin">@Test</span>\n<span class="token keyword">fun</span> <span class="token function">`使用反射将类作为函数参数传递`</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">val</span> result <span class="token operator">=</span> functionAcceptingClassNameUsingReflection``<span class="token operator">&lt;</span>ParameterClass<span class="token operator">&gt;</span>``<span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;com.baeldung.classParameterToFunction.ParameterClass&quot;</span></span><span class="token punctuation">)</span>\n\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;这是我们类上调用的方法&quot;</span></span><span class="token punctuation">,</span> result<span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们以_String_的形式提供完全限定的类名给这个方法。然后这个方法将访问_ParameterClass_类的_parameterClassMethod()_方法并返回所需的字符串。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们讨论了在Kotlin中将类传递给函数的不同方式。我们涵盖了_Class_引用、反射和_reified_类型参数方法。我们应该评估哪种方法最适合我们的项目需求。</p><p>如常，本文中使用的全部源代码可以在GitHub上找到。</p><p>OK</p>',48),p=[l];function o(i,c){return a(),s("div",null,p)}const d=n(e,[["render",o],["__file","2024-07-03-Passing a Class to a Function in Kotlin.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-03/2024-07-03-Passing%20a%20Class%20to%20a%20Function%20in%20Kotlin.html","title":"在Kotlin中将类传递给函数","lang":"zh-CN","frontmatter":{"date":"2022-11-01T00:00:00.000Z","category":["Kotlin","Programming"],"tag":["Kotlin","Class","Function","Reflection"],"head":[["meta",{"name":"keywords","content":"Kotlin, Class, Function, Reflection, KClass, reified"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-03/2024-07-03-Passing%20a%20Class%20to%20a%20Function%20in%20Kotlin.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Kotlin中将类传递给函数"}],["meta",{"property":"og:description","content":"在Kotlin中将类传递给函数 在Kotlin中，类是语言的基本构建块，我们使用它们来定义对象及其行为。虽然通常传递各种数据类型的参数，但有时我们需要将类作为参数传递给函数。 将类传递给函数允许我们将其用作函数中的参数，从而可以对其进行操作。本教程将探讨在Kotlin中将类引用传递给函数的方法。 2. 使用类引用 在Kotlin中，每个类都与一个类引用..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-03T14:55:30.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Kotlin"}],["meta",{"property":"article:tag","content":"Class"}],["meta",{"property":"article:tag","content":"Function"}],["meta",{"property":"article:tag","content":"Reflection"}],["meta",{"property":"article:published_time","content":"2022-11-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-03T14:55:30.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Kotlin中将类传递给函数\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-11-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-03T14:55:30.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Kotlin中将类传递给函数 在Kotlin中，类是语言的基本构建块，我们使用它们来定义对象及其行为。虽然通常传递各种数据类型的参数，但有时我们需要将类作为参数传递给函数。 将类传递给函数允许我们将其用作函数中的参数，从而可以对其进行操作。本教程将探讨在Kotlin中将类引用传递给函数的方法。 2. 使用类引用 在Kotlin中，每个类都与一个类引用..."},"headers":[{"level":2,"title":"2. 使用类引用","slug":"_2-使用类引用","link":"#_2-使用类引用","children":[{"level":3,"title":"2.1. _Class_与_KClass_的区别","slug":"_2-1-class-与-kclass-的区别","link":"#_2-1-class-与-kclass-的区别","children":[]},{"level":3,"title":"2.2. 使用_Class_参数访问","slug":"_2-2-使用-class-参数访问","link":"#_2-2-使用-class-参数访问","children":[]},{"level":3,"title":"2.3. 使用_KClass_参数访问","slug":"_2-3-使用-kclass-参数访问","link":"#_2-3-使用-kclass-参数访问","children":[]}]},{"level":2,"title":"3. 使用_reified_类型参数","slug":"_3-使用-reified-类型参数","link":"#_3-使用-reified-类型参数","children":[]},{"level":2,"title":"4. 使用Java反射","slug":"_4-使用java反射","link":"#_4-使用java反射","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720018530000,"updatedTime":1720018530000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.44,"words":1331},"filePathRelative":"posts/baeldung/2024-07-03/2024-07-03-Passing a Class to a Function in Kotlin.md","localizedDate":"2022年11月1日","excerpt":"\\n<p>在Kotlin中，类是语言的基本构建块，我们使用它们来定义对象及其行为。虽然通常传递各种数据类型的参数，但有时我们需要将类作为参数传递给函数。</p>\\n<p>将类传递给函数允许我们将其用作函数中的参数，从而可以对其进行操作。本教程将探讨在Kotlin中将类引用传递给函数的方法。</p>\\n<h2>2. 使用类引用</h2>\\n<p>在Kotlin中，每个类都与一个类引用相关联。Kotlin中有两类类引用。_KClass_是Kotlin类引用：</p>\\n<div class=\\"language-text\\" data-ext=\\"text\\" data-title=\\"text\\"><pre class=\\"language-text\\"><code>MyClass::class\\n</code></pre></div>","autoDesc":true}');export{d as comp,k as data};
