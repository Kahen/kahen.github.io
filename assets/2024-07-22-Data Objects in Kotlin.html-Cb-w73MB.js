import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as t,a as e}from"./app-C4eFoh0f.js";const s={},o=e(`<hr><h1 id="kotlin中的数据对象-baeldung关于kotlin" tabindex="-1"><a class="header-anchor" href="#kotlin中的数据对象-baeldung关于kotlin"><span>Kotlin中的数据对象 | Baeldung关于Kotlin</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span><strong>1. 引言</strong></span></a></h2><p>在使用Kotlin时，我们可以访问许多旨在提高我们生产力的特性。其中一项特性是数据类（Data Classes），它会自动生成如_equals()_、<em>hashCode()</em>、_toString()_和_copy()_等基本实用函数。然而，当我们在Kotlin中使用对象与封闭层次结构一起工作时，我们会遇到不一致性。我们通常需要编写额外的样板代码来处理这种不一致性。</p><p>**为了改善这种情况，在1.9版本中，Kotlin引入了一个名为数据对象的新特性。**让我们深入探讨数据对象是什么以及如何使用它们。</p><h2 id="_2-什么是数据对象" tabindex="-1"><a class="header-anchor" href="#_2-什么是数据对象"><span><strong>2. 什么是数据对象？</strong></span></a></h2><p>数据对象是解决Kotlin中数据类和常规对象之间不一致性的解决方案。与常规对象不同，**数据对象继承了数据类的便利特性，例如默认实现的_equals()_、_hashCode()_和_toString()_方法。**这些实用方法大大减少了大量样板代码。让我们看一个例子：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">class</span> DataObjectsExample <span class="token punctuation">{</span>
    <span class="token keyword">data</span> <span class="token keyword">class</span> <span class="token function">MyDataClass</span><span class="token punctuation">(</span><span class="token keyword">val</span> name<span class="token operator">:</span> String<span class="token punctuation">)</span>
    <span class="token keyword">object</span> MyRegularObject
    <span class="token keyword">data</span> <span class="token keyword">object</span> MyDataObject

    <span class="token keyword">fun</span> <span class="token function">printObjects</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">println</span><span class="token punctuation">(</span><span class="token function">MyDataClass</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Jon&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 输出：MyDataClass(name=Jon)</span>
        <span class="token function">println</span><span class="token punctuation">(</span>MyRegularObject<span class="token punctuation">)</span> <span class="token comment">// 输出：DataObjects$MyRegularObject@1b6d3586</span>
        <span class="token function">println</span><span class="token punctuation">(</span>MyDataObject<span class="token punctuation">)</span> <span class="token comment">// 输出：MyDataObject</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>正如我们所看到的，_MyDataClass_自动生成了_toString()_函数实现，并返回对象的字符串表示。这消除了手动编写这些函数的需要。</strong></p><p>接下来，让我们观察在Kotlin中打印常规对象的结果。我们可以看到字符串表示由类名和对象的哈希组成。这与数据类对象更干净的字符串表示不一致。</p><p>在上面的代码片段中，我们声明_MyDataObject_为一个_数据对象_而不是一个常规_对象_。这意味着_MyDataObject_将获得一个可读的_toString()_函数实现，而无需手动覆盖它。这有助于与_数据类_实现保持对称。</p><h2 id="_3-数据对象和数据类之间的区别" tabindex="-1"><a class="header-anchor" href="#_3-数据对象和数据类之间的区别"><span><strong>3. 数据对象和数据类之间的区别</strong></span></a></h2><p>正如我们所了解的，当我们将一个类标记为_数据类_或将一个对象标记为_数据对象_时，我们将获得一些自动生成的实用函数。然而，有一些微妙的区别。</p><h3 id="_3-1-数据对象中没有-copy-函数" tabindex="-1"><a class="header-anchor" href="#_3-1-数据对象中没有-copy-函数"><span><strong>3.1. 数据对象中没有_copy()_函数</strong></span></a></h3><p>**数据类和数据对象之间的主要区别之一是某些特定函数不会为数据对象自动生成。**其中一个函数是_copy()_函数。数据对象中缺少_copy()_函数的原因在于语言设计决策，使数据对象作为单例。</p><p>单例设计模式限制一个类只能有一个实例。根据这一设计理念，允许为这个单一实例创建副本将是一个矛盾，因为它本质上意味着创建另一个实例。</p><h3 id="_3-2-数据对象中没有-componentn-函数" tabindex="-1"><a class="header-anchor" href="#_3-2-数据对象中没有-componentn-函数"><span><strong>3.2. 数据对象中没有_componentN()_函数</strong></span></a></h3><p>当使用数据类时，我们还可以访问自动生成的_componentN()_函数。我们可以使用这些函数来映射_数据类_的属性，帮助我们解构这些属性。</p><p>然而，当我们处理数据对象时，Kotlin不会生成这些_componentN()_函数。<strong>主要原因是数据对象通常不像数据类那样拥有属性</strong>，使得_componentN()_函数变得不必要。</p><h3 id="_3-3-不允许为-equals-和-hashcode-提供自定义实现" tabindex="-1"><a class="header-anchor" href="#_3-3-不允许为-equals-和-hashcode-提供自定义实现"><span><strong>3.3. 不允许为_equals()_和_hashCode()_提供自定义实现</strong></span></a></h3><p>当我们定义一个_数据对象_时，我们基本上是在操作一个单例。这意味着对象只有一个实例。</p><p>因此，Kotlin不允许为数据对象覆盖_equals()_和_hashCode()_实用函数，这通常是为了提供区分多个实例的自定义实现。</p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span><strong>4. 结论</strong></span></a></h2><p>在Kotlin中引入数据对象是一个重要的步骤，旨在减少与常规对象一起工作时的不一致性。**通过这个特性，我们在创建_数据对象_时可以访问到基本的实用函数，如_toString()_、_equals()<em>和_hashCode()</em>。**这类似于我们在创建_数据类_时获得这些便捷的自动生成的实用函数。此外，这在我们处理像_封闭类_和_封闭接口_实现这样的封闭层次结构时特别有用。</p><p>如常，代码示例可以在GitHub上找到。</p>`,25),l=[o];function i(p,c){return t(),a("div",null,l)}const d=n(s,[["render",i],["__file","2024-07-22-Data Objects in Kotlin.html.vue"]]),u=JSON.parse('{"path":"/posts/baeldung/2024-07-22/2024-07-22-Data%20Objects%20in%20Kotlin.html","title":"Kotlin中的数据对象 | Baeldung关于Kotlin","lang":"zh-CN","frontmatter":{"date":"2022-11-01T00:00:00.000Z","category":["Kotlin"],"tag":["Data Objects","Kotlin"],"head":[["meta",{"name":"keywords","content":"Kotlin, Data Objects, Data Classes, Singleton"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-22/2024-07-22-Data%20Objects%20in%20Kotlin.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Kotlin中的数据对象 | Baeldung关于Kotlin"}],["meta",{"property":"og:description","content":"Kotlin中的数据对象 | Baeldung关于Kotlin 1. 引言 在使用Kotlin时，我们可以访问许多旨在提高我们生产力的特性。其中一项特性是数据类（Data Classes），它会自动生成如_equals()_、hashCode()、_toString()_和_copy()_等基本实用函数。然而，当我们在Kotlin中使用对象与封闭层次结..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-22T16:15:31.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Data Objects"}],["meta",{"property":"article:tag","content":"Kotlin"}],["meta",{"property":"article:published_time","content":"2022-11-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-22T16:15:31.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Kotlin中的数据对象 | Baeldung关于Kotlin\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-11-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-22T16:15:31.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Kotlin中的数据对象 | Baeldung关于Kotlin 1. 引言 在使用Kotlin时，我们可以访问许多旨在提高我们生产力的特性。其中一项特性是数据类（Data Classes），它会自动生成如_equals()_、hashCode()、_toString()_和_copy()_等基本实用函数。然而，当我们在Kotlin中使用对象与封闭层次结..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 什么是数据对象？","slug":"_2-什么是数据对象","link":"#_2-什么是数据对象","children":[]},{"level":2,"title":"3. 数据对象和数据类之间的区别","slug":"_3-数据对象和数据类之间的区别","link":"#_3-数据对象和数据类之间的区别","children":[{"level":3,"title":"3.1. 数据对象中没有_copy()_函数","slug":"_3-1-数据对象中没有-copy-函数","link":"#_3-1-数据对象中没有-copy-函数","children":[]},{"level":3,"title":"3.2. 数据对象中没有_componentN()_函数","slug":"_3-2-数据对象中没有-componentn-函数","link":"#_3-2-数据对象中没有-componentn-函数","children":[]},{"level":3,"title":"3.3. 不允许为_equals()_和_hashCode()_提供自定义实现","slug":"_3-3-不允许为-equals-和-hashcode-提供自定义实现","link":"#_3-3-不允许为-equals-和-hashcode-提供自定义实现","children":[]}]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1721664931000,"updatedTime":1721664931000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.77,"words":1131},"filePathRelative":"posts/baeldung/2024-07-22/2024-07-22-Data Objects in Kotlin.md","localizedDate":"2022年11月1日","excerpt":"<hr>\\n<h1>Kotlin中的数据对象 | Baeldung关于Kotlin</h1>\\n<h2><strong>1. 引言</strong></h2>\\n<p>在使用Kotlin时，我们可以访问许多旨在提高我们生产力的特性。其中一项特性是数据类（Data Classes），它会自动生成如_equals()_、<em>hashCode()</em>、_toString()_和_copy()_等基本实用函数。然而，当我们在Kotlin中使用对象与封闭层次结构一起工作时，我们会遇到不一致性。我们通常需要编写额外的样板代码来处理这种不一致性。</p>\\n<p>**为了改善这种情况，在1.9版本中，Kotlin引入了一个名为数据对象的新特性。**让我们深入探讨数据对象是什么以及如何使用它们。</p>","autoDesc":true}');export{d as comp,u as data};
