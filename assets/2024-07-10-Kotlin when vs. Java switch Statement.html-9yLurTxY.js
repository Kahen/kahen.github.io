import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-D5kFWV-m.js";const e={},o=t(`<h1 id="kotlin-的-when-表达式与-java-的-switch-语句" tabindex="-1"><a class="header-anchor" href="#kotlin-的-when-表达式与-java-的-switch-语句"><span>Kotlin 的 when 表达式与 Java 的 switch 语句</span></a></h1><p>Kotlin 和 Java 作为构建健壮且可扩展应用的流行选择而脱颖而出。这两种语言都提供了独特的特性和语法，有助于它们的优势。</p><p>在本教程中，我们将深入探讨 Kotlin 的强大 when 表达式和 Java 的传统 switch 语句，比较它们的使用、语法和能力。通过检查代码示例并提供详细的解释，我们旨在帮助理解这些结构的优势和细微差别。</p><p>Java 的 switch 语句虽然是语言的长期特性，但与 Kotlin 的 when 表达式相比有其局限性。在 Java 7 之前，switch 语句仅支持原始类型和枚举类型。从 Java 7 开始，它还支持 Strings。让我们探索一个使用 Java 的 switch 语句的简单示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span> number <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> description<span class="token punctuation">;</span>
<span class="token keyword">switch</span> <span class="token punctuation">(</span>number<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token number">0</span><span class="token operator">:</span>
        description <span class="token operator">=</span> <span class="token string">&quot;Zero&quot;</span><span class="token punctuation">;</span>
        <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token keyword">case</span> <span class="token number">1</span><span class="token operator">:</span>
    <span class="token keyword">case</span> <span class="token number">2</span><span class="token operator">:</span>
        description <span class="token operator">=</span> <span class="token string">&quot;One or Two&quot;</span><span class="token punctuation">;</span>
        <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token keyword">case</span> <span class="token number">3</span><span class="token operator">:</span>
    <span class="token keyword">case</span> <span class="token number">4</span><span class="token operator">:</span>
    <span class="token keyword">case</span> <span class="token number">5</span><span class="token operator">:</span>
        description <span class="token operator">=</span> <span class="token string">&quot;Between Three and Five&quot;</span><span class="token punctuation">;</span>
        <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token keyword">default</span><span class="token operator">:</span>
        description <span class="token operator">=</span> <span class="token string">&quot;Other&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>description<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这段代码中，我们用值三初始化了一个整数变量 number，并使用 switch 语句根据 number 的值确定 String 变量 description 的内容。default 情况涵盖了任何其他值，分配了 &quot;Other&quot;。然后，description 的最终值被打印到控制台，在这个特定实例中将打印 &quot;Between Three and Five&quot;。</p><p>Kotlin 引入了多功能的 when 表达式，这是 Java 的 switch 语句的更强大和富有表现力的替代品。when 表达式允许开发人员用简洁易读的语法替换一系列 if-else 语句。让我们将第一个示例重写为 when 表达式：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">fun</span> <span class="token function">describeNumber</span><span class="token punctuation">(</span>number<span class="token operator">:</span> Int<span class="token punctuation">)</span><span class="token operator">:</span> String <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">when</span> <span class="token punctuation">(</span>number<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token number">0</span> <span class="token operator">-&gt;</span> <span class="token string-literal singleline"><span class="token string">&quot;Zero&quot;</span></span>
        <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span> <span class="token operator">-&gt;</span> <span class="token string-literal singleline"><span class="token string">&quot;One or Two&quot;</span></span>
        <span class="token keyword">in</span> <span class="token number">3</span><span class="token operator">..</span><span class="token number">5</span> <span class="token operator">-&gt;</span> <span class="token string-literal singleline"><span class="token string">&quot;Between Three and Five&quot;</span></span>
        <span class="token keyword">else</span> <span class="token operator">-&gt;</span> <span class="token string-literal singleline"><span class="token string">&quot;Other&quot;</span></span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们的 describeNumber() 函数中的 when 表达式处理相同的比较并返回与上述 switch 语句相同的描述。注意我们如何一次处理更复杂的比较，同时保持相同的逻辑含义。也就是说，when 表达式可以一次性检查多个值，使用逗号分隔的值进行比较，甚至可以检查数字范围。<strong>最后，如果 number 与我们的任何表达式都不匹配，我们的代码将执行 else 块。</strong></p><p>首先，我们来看看 Java 中的 switch 语句和 Kotlin 中的 when 表达式的相似之处：</p><ul><li>Java 中的 switch 语句和 Kotlin 中的 when 表达式都用于模式匹配。它们通常允许我们将表达式的值与一个或多个可能的值进行比较，并相应地执行不同的代码块。</li><li>这两种结构都支持多个分支，允许我们为不同的情况定义不同的操作。</li></ul><p>最后，我们将强调 Java 中的 switch 语句和 Kotlin 中的 when 的不同之处：</p><ul><li>Kotlin 的 when 在定义条件方面比 Java 的 switch 更灵活。它允许复杂的条件，包括范围、类型检查和其他表达式。</li><li>在 Kotlin 的 when 中，我们不需要使用 break 语句。when 表达式默认不会继续执行下一个表达式。</li></ul><p>在本文中，我们比较了 Kotlin 的强大 when 表达式和 Java 的传统 switch 语句。</p><p>Kotlin 的 when 表达式提供了一种更多样化和富有表现力的语法，允许开发人员简化他们的代码，用简洁易读的结构替换冗长的 if-else 结构。另一方面，Java 的 switch 语句虽然是一个成熟的功能，但有其局限性，例如从 Java 7 开始只支持原始类型、枚举类型和 String 类型。</p><p>最后，我们查看了 Java 中的 switch 语句和 Kotlin 中的 when 表达式的相似之处和不同之处。</p><p>如常，这些示例的完整实现可以在 GitHub 上找到。好的，翻译已经完成。以下是翻译的剩余部分：</p><p>文章的最后，我们比较了 Kotlin 的强大 when 表达式和 Java 的传统 switch 语句。</p><p>Kotlin 的 when 表达式提供了一种更多样化和富有表现力的语法，允许开发人员简化他们的代码，用简洁易读的结构替换冗长的 if-else 结构。另一方面，Java 的 switch 语句虽然是一个成熟的功能，但有其局限性，例如从 Java 7 开始只支持原始类型、枚举类型和 String 类型。</p><p>最后，我们查看了 Java 中的 switch 语句和 Kotlin 中的 when 表达式的相似之处和不同之处。</p><p>如常，这些示例的完整实现可以在 GitHub 上找到。</p><p><img src="https://www.baeldung.com/kotlin/wp-content/themes/baeldung/icon/logo.svg" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/sites/5/2022/11/kotlin_sublogo.png" alt="img" loading="lazy"><img src="https://secure.gravatar.com/avatar/2b7c820e884a055a46b81eb79a49cd12?s=50&amp;r=g" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/custom_avatars/brandon_ward_headshot-150x150.jpeg" alt="img" loading="lazy"><img src="https://www.baeldung.com/kotlin/wp-content/themes/baeldung/icon/whiteleaf.svg" alt="img" loading="lazy"></p><p>OK</p>`,23),p=[o];function i(l,c){return s(),a("div",null,p)}const d=n(e,[["render",i],["__file","2024-07-10-Kotlin when vs. Java switch Statement.html.vue"]]),w=JSON.parse('{"path":"/posts/baeldung/2024-07-10/2024-07-10-Kotlin%20when%20vs.%20Java%20switch%20Statement.html","title":"Kotlin 的 when 表达式与 Java 的 switch 语句","lang":"zh-CN","frontmatter":{"date":"2022-11-01T00:00:00.000Z","category":["Kotlin","Java"],"tag":["when","switch"],"head":[["meta",{"name":"keywords","content":"Kotlin when, Java switch, 比较, 语法, 特性"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-10/2024-07-10-Kotlin%20when%20vs.%20Java%20switch%20Statement.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Kotlin 的 when 表达式与 Java 的 switch 语句"}],["meta",{"property":"og:description","content":"Kotlin 的 when 表达式与 Java 的 switch 语句 Kotlin 和 Java 作为构建健壮且可扩展应用的流行选择而脱颖而出。这两种语言都提供了独特的特性和语法，有助于它们的优势。 在本教程中，我们将深入探讨 Kotlin 的强大 when 表达式和 Java 的传统 switch 语句，比较它们的使用、语法和能力。通过检查代码示例..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/kotlin/wp-content/themes/baeldung/icon/logo.svg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-10T16:44:45.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"when"}],["meta",{"property":"article:tag","content":"switch"}],["meta",{"property":"article:published_time","content":"2022-11-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-10T16:44:45.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Kotlin 的 when 表达式与 Java 的 switch 语句\\",\\"image\\":[\\"https://www.baeldung.com/kotlin/wp-content/themes/baeldung/icon/logo.svg\\",\\"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg\\",\\"https://www.baeldung.com/wp-content/uploads/sites/5/2022/11/kotlin_sublogo.png\\",\\"https://secure.gravatar.com/avatar/2b7c820e884a055a46b81eb79a49cd12?s=50&r=g\\",\\"https://www.baeldung.com/wp-content/uploads/custom_avatars/brandon_ward_headshot-150x150.jpeg\\",\\"https://www.baeldung.com/kotlin/wp-content/themes/baeldung/icon/whiteleaf.svg\\"],\\"datePublished\\":\\"2022-11-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-10T16:44:45.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Kotlin 的 when 表达式与 Java 的 switch 语句 Kotlin 和 Java 作为构建健壮且可扩展应用的流行选择而脱颖而出。这两种语言都提供了独特的特性和语法，有助于它们的优势。 在本教程中，我们将深入探讨 Kotlin 的强大 when 表达式和 Java 的传统 switch 语句，比较它们的使用、语法和能力。通过检查代码示例..."},"headers":[],"git":{"createdTime":1720629885000,"updatedTime":1720629885000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.01,"words":1204},"filePathRelative":"posts/baeldung/2024-07-10/2024-07-10-Kotlin when vs. Java switch Statement.md","localizedDate":"2022年11月1日","excerpt":"\\n<p>Kotlin 和 Java 作为构建健壮且可扩展应用的流行选择而脱颖而出。这两种语言都提供了独特的特性和语法，有助于它们的优势。</p>\\n<p>在本教程中，我们将深入探讨 Kotlin 的强大 when 表达式和 Java 的传统 switch 语句，比较它们的使用、语法和能力。通过检查代码示例并提供详细的解释，我们旨在帮助理解这些结构的优势和细微差别。</p>\\n<p>Java 的 switch 语句虽然是语言的长期特性，但与 Kotlin 的 when 表达式相比有其局限性。在 Java 7 之前，switch 语句仅支持原始类型和枚举类型。从 Java 7 开始，它还支持 Strings。让我们探索一个使用 Java 的 switch 语句的简单示例：</p>","autoDesc":true}');export{d as comp,w as data};
