import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-bN4DcMMr.js";const e={},p=t(`<h1 id="在kotlin中检查枚举值是否包含给定字符串" tabindex="-1"><a class="header-anchor" href="#在kotlin中检查枚举值是否包含给定字符串"><span>在Kotlin中检查枚举值是否包含给定字符串</span></a></h1><p>枚举是Kotlin中的一项强大功能，它允许程序员定义一组命名常量。它们通常用于表示一个封闭的值集合，比如一周的天数或一年中的月份。有时，我们可能需要检查某个字符串值是否包含在枚举中。</p><p>在本教程中，我们将探讨在Kotlin中检查枚举值是否包含给定字符串的多种方法。</p><h2 id="_2-枚举类定义" tabindex="-1"><a class="header-anchor" href="#_2-枚举类定义"><span>2. 枚举类定义</span></a></h2><p>在本教程中，我们将查看各种方法和技术，以检查枚举值是否包含某个字符串。首先，我们定义我们的枚举常量：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">enum</span> <span class="token keyword">class</span> DaysOfWeek <span class="token punctuation">{</span>
    MONDAY<span class="token punctuation">,</span> TUESDAY<span class="token punctuation">,</span> WEDNESDAY<span class="token punctuation">,</span> THURSDAY<span class="token punctuation">,</span> FRIDAY<span class="token punctuation">,</span> SATURDAY<span class="token punctuation">,</span> SUNDAY

    <span class="token keyword">companion</span> <span class="token keyword">object</span> <span class="token punctuation">{</span>
        <span class="token keyword">val</span> names <span class="token keyword">by</span> lazy <span class="token punctuation">{</span> DaysOfWeek<span class="token punctuation">.</span><span class="token function">values</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">{</span> it<span class="token punctuation">.</span>name <span class="token punctuation">}</span> <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们的枚举类包含七个值，代表一周的天数。此外，这个类包含一个伴生对象，它使用_map()_方法为每个枚举常量生成名称。这会创建一个字符串值列表，我们稍后将能够使用。</p><h2 id="_3-使用for-循环" tabindex="-1"><a class="header-anchor" href="#_3-使用for-循环"><span>3. 使用for()循环</span></a></h2><p>我们可以通过使用传统的for()循环来检查枚举值是否包含特定的字符串：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">fun</span> <span class="token function">containsValueUsingForLoop</span><span class="token punctuation">(</span>value<span class="token operator">:</span> String<span class="token punctuation">)</span><span class="token operator">:</span> Boolean <span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span>day <span class="token keyword">in</span> DaysOfWeek<span class="token punctuation">.</span><span class="token function">values</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>day<span class="token punctuation">.</span>name <span class="token operator">==</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token boolean">true</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token boolean">false</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>在这种方法中，我们遍历所有的枚举常量，并检查给定的字符串是否匹配任何枚举的_name_</strong>。</p><p>始终对代码进行单元测试以确保其按预期工作是一个好主意：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token annotation builtin">@Test</span>
<span class="token keyword">fun</span> <span class="token function">\`checks if enum value contains a specific string correctly using for loop\`</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">assertFalse</span><span class="token punctuation">(</span><span class="token function">containsValueUsingForLoop</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;RED&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token function">containsValueUsingForLoop</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;WEDNESDAY&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token function">assertFalse</span><span class="token punctuation">(</span><span class="token function">containsValueUsingForLoop</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;AUGUST&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token function">containsValueUsingForLoop</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;SATURDAY&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这段代码中，我们使用辅助方法来确定是否任何枚举值包含给定的字符串。使用断言语句，我们断言枚举不包含字符串“RED”和“AUGUST”。然而，我们的枚举确实包含字符串“WEDNESDAY”和“SATURDAY”，正如预期的那样。</p><h2 id="_4-使用when-表达式" tabindex="-1"><a class="header-anchor" href="#_4-使用when-表达式"><span>4. 使用when()表达式</span></a></h2><p>我们同样可以使用when()表达式来检查给定的字符串是否包含在枚举值中：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">fun</span> <span class="token function">containsValueUsingWhenExpression</span><span class="token punctuation">(</span>value<span class="token operator">:</span> String<span class="token punctuation">)</span><span class="token operator">:</span> Boolean <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">when</span> <span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">in</span> DaysOfWeek<span class="token punctuation">.</span>names <span class="token operator">-&gt;</span> <span class="token boolean">true</span>
        <span class="token keyword">else</span> <span class="token operator">-&gt;</span> <span class="token boolean">false</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>与前一种技术中的辅助方法不同，<strong>这种方法不执行迭代，而是简单地使用when()表达式来检查给定值是否与任何枚举常量的_name_匹配</strong>。如果有匹配，它返回_true_，否则返回_false_。注意，这是使用了我们从枚举的列表名称中的辅助属性。</p><p>让我们也测试一下我们的辅助方法：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token annotation builtin">@Test</span>
<span class="token keyword">fun</span> <span class="token function">\`checks if enum value contains a specific string correctly using when expression\`</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">assertFalse</span><span class="token punctuation">(</span><span class="token function">containsValueUsingWhenExpression</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;RED&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token function">containsValueUsingWhenExpression</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;WEDNESDAY&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token function">assertFalse</span><span class="token punctuation">(</span><span class="token function">containsValueUsingWhenExpression</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;AUGUST&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token function">containsValueUsingWhenExpression</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;SATURDAY&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们的辅助方法正确地报告了给定的字符串是否与任何枚举常量的名称匹配。</p><h2 id="_5-使用map-方法" tabindex="-1"><a class="header-anchor" href="#_5-使用map-方法"><span>5. 使用map()方法</span></a></h2><p>正如前面提到的，我们也可以利用map()方法。我们可以使用map()方法生成一个包含我们所有枚举常量的名称的列表，然后看看给定的字符串是否包含在名称列表中：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token annotation builtin">@Test</span>
<span class="token keyword">fun</span> <span class="token function">\`checks if enum value contains a specific string correctly using map method\`</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">val</span> names <span class="token operator">=</span> DaysOfWeek<span class="token punctuation">.</span><span class="token function">values</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">map</span> <span class="token punctuation">{</span> it<span class="token punctuation">.</span>name <span class="token punctuation">}</span>

    <span class="token function">assertFalse</span><span class="token punctuation">(</span>names<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;RED&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token function">assertTrue</span><span class="token punctuation">(</span>names<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;WEDNESDAY&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token function">assertFalse</span><span class="token punctuation">(</span>names<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;AUGUST&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token function">assertTrue</span><span class="token punctuation">(</span>names<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;SATURDAY&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>map()方法返回了枚举类中所有常量的名称列表。随后，我们使用名称列表上的contains()方法来检查给定的字符串是否存在于其中。如果存在，那么这个表达式的结果将是_true_；否则，将是_false_。</p><h3 id="_5-1-使用any-方法" tabindex="-1"><a class="header-anchor" href="#_5-1-使用any-方法"><span>5.1. 使用any()方法</span></a></h3><p><strong>然而，map()方法的方法必须不可避免地对所有枚举常量应用lambda函数</strong>。因此，作为一种优化策略，我们可以使用any()代替。</p><p>any()方法接受一个lambda函数，并在lambda函数中的条件对任何数组项成立时返回_true_：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token annotation builtin">@Test</span>
<span class="token keyword">fun</span> <span class="token function">\`checks if enum value contains a specific string correctly using any method\`</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">val</span> names <span class="token operator">=</span> DaysOfWeek<span class="token punctuation">.</span><span class="token function">values</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token function">assertFalse</span><span class="token punctuation">(</span>names<span class="token punctuation">.</span><span class="token function">any</span><span class="token punctuation">{</span> it<span class="token punctuation">.</span>name <span class="token operator">==</span> <span class="token string-literal singleline"><span class="token string">&quot;RED&quot;</span></span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token function">assertTrue</span><span class="token punctuation">(</span>names<span class="token punctuation">.</span><span class="token function">any</span><span class="token punctuation">{</span> it<span class="token punctuation">.</span>name <span class="token operator">==</span> <span class="token string-literal singleline"><span class="token string">&quot;WEDNESDAY&quot;</span></span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token function">assertFalse</span><span class="token punctuation">(</span>names<span class="token punctuation">.</span><span class="token function">any</span><span class="token punctuation">{</span> it<span class="token punctuation">.</span>name <span class="token operator">==</span> <span class="token string-literal singleline"><span class="token string">&quot;AUGUST&quot;</span></span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token function">assertTrue</span><span class="token punctuation">(</span>names<span class="token punctuation">.</span><span class="token function">any</span><span class="token punctuation">{</span> it<span class="token punctuation">.</span>name <span class="token operator">==</span> <span class="token string-literal singleline"><span class="token string">&quot;SATURDAY&quot;</span></span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们使用values()方法来获取所有枚举常量的数组，any()方法检查该数组中的任何枚举常量的名称是否等于给定的值。</p><p><strong>这种方法比map()方法的方法更好，因为它在找到匹配项后就会停止查找</strong>。注意我们没有首先转换_values()_，而是只在_any()<em>检查中只展开_name</em>。</p><h2 id="_6-使用hashset" tabindex="-1"><a class="header-anchor" href="#_6-使用hashset"><span>6. 使用HashSet</span></a></h2><p>最后，<strong>我们还可以通过创建一个包含所有枚举常量名称的_HashSet_来检查枚举值是否包含给定的字符串</strong>：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">fun</span> <span class="token function">containsValueUsingHashSet</span><span class="token punctuation">(</span>value<span class="token operator">:</span> String<span class="token punctuation">)</span><span class="token operator">:</span> Boolean <span class="token punctuation">{</span>
    <span class="token keyword">val</span> <span class="token keyword">set</span> <span class="token operator">=</span> HashSet<span class="token function">\`&lt;String&gt;\`</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    DaysOfWeek<span class="token punctuation">.</span><span class="token function">values</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span> <span class="token punctuation">{</span> <span class="token keyword">set</span><span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>it<span class="token punctuation">.</span>name<span class="token punctuation">)</span> <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token keyword">set</span><span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个辅助方法将创建一个_DaysOfWeek_名称的_HashSet_。然后我们可以使用_set_的_contains()_方法来检查给定的值是否包含在其中。</p><p>和往常一样，我们也需要测试这个：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token annotation builtin">@Test</span>
<span class="token keyword">fun</span> <span class="token function">\`checks if enum value contains a specific string correctly using a hashset\`</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">assertFalse</span><span class="token punctuation">(</span><span class="token function">containsValueUsingHashSet</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;RED&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token function">containsValueUsingHashSet</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;WEDNESDAY&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token function">assertFalse</span><span class="token punctuation">(</span><span class="token function">containsValueUsingHashSet</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;AUGUST&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token function">containsValueUsingHashSet</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;SATURDAY&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个测试中，我们可以轻松地断言字符串“WEDNESDAY”和“SATURDAY”与我们的枚举常量中的一个名称匹配。</p><h2 id="_7-结论" tabindex="-1"><a class="header-anchor" href="#_7-结论"><span>7. 结论</span></a></h2><p>在本文中，我们探讨了在Kotlin中检查枚举值是否包含给定字符串的多种方式。通过拥有多种实现相同结果的方式，我们有灵活性选择最适合我们需求的方法。此外，拥有不同的选项可以帮助我们避免在使用特定方法时可能出现的潜在陷阱和限制。</p><p>此外，可用的选项范围使我们能够学习不同的Kotlin语言结构和概念，这可以帮助我们成为更好的程序员。因此，了解检查枚举是否包含字符串的不同方式非常重要，这样我们就可以在编写代码时做出明智的决策。</p><p>和往常一样，与本文相关的代码样本和测试用例可以在GitHub上找到。</p>`,42),o=[p];function i(c,l){return a(),s("div",null,o)}const r=n(e,[["render",i],["__file","2024-07-08-Check if an Enum Value Contains a Given String in Kotlin.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-08/2024-07-08-Check%20if%20an%20Enum%20Value%20Contains%20a%20Given%20String%20in%20Kotlin.html","title":"在Kotlin中检查枚举值是否包含给定字符串","lang":"zh-CN","frontmatter":{"date":"2022-11-01T00:00:00.000Z","category":["Kotlin","Enums"],"tag":["Kotlin","Enum","String"],"head":[["meta",{"name":"keywords","content":"Kotlin, Enum, String, contains, tutorial"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-08/2024-07-08-Check%20if%20an%20Enum%20Value%20Contains%20a%20Given%20String%20in%20Kotlin.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Kotlin中检查枚举值是否包含给定字符串"}],["meta",{"property":"og:description","content":"在Kotlin中检查枚举值是否包含给定字符串 枚举是Kotlin中的一项强大功能，它允许程序员定义一组命名常量。它们通常用于表示一个封闭的值集合，比如一周的天数或一年中的月份。有时，我们可能需要检查某个字符串值是否包含在枚举中。 在本教程中，我们将探讨在Kotlin中检查枚举值是否包含给定字符串的多种方法。 2. 枚举类定义 在本教程中，我们将查看各种..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-08T14:41:04.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Kotlin"}],["meta",{"property":"article:tag","content":"Enum"}],["meta",{"property":"article:tag","content":"String"}],["meta",{"property":"article:published_time","content":"2022-11-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-08T14:41:04.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Kotlin中检查枚举值是否包含给定字符串\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-11-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-08T14:41:04.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Kotlin中检查枚举值是否包含给定字符串 枚举是Kotlin中的一项强大功能，它允许程序员定义一组命名常量。它们通常用于表示一个封闭的值集合，比如一周的天数或一年中的月份。有时，我们可能需要检查某个字符串值是否包含在枚举中。 在本教程中，我们将探讨在Kotlin中检查枚举值是否包含给定字符串的多种方法。 2. 枚举类定义 在本教程中，我们将查看各种..."},"headers":[{"level":2,"title":"2. 枚举类定义","slug":"_2-枚举类定义","link":"#_2-枚举类定义","children":[]},{"level":2,"title":"3. 使用for()循环","slug":"_3-使用for-循环","link":"#_3-使用for-循环","children":[]},{"level":2,"title":"4. 使用when()表达式","slug":"_4-使用when-表达式","link":"#_4-使用when-表达式","children":[]},{"level":2,"title":"5. 使用map()方法","slug":"_5-使用map-方法","link":"#_5-使用map-方法","children":[{"level":3,"title":"5.1. 使用any()方法","slug":"_5-1-使用any-方法","link":"#_5-1-使用any-方法","children":[]}]},{"level":2,"title":"6. 使用HashSet","slug":"_6-使用hashset","link":"#_6-使用hashset","children":[]},{"level":2,"title":"7. 结论","slug":"_7-结论","link":"#_7-结论","children":[]}],"git":{"createdTime":1720449664000,"updatedTime":1720449664000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.07,"words":1520},"filePathRelative":"posts/baeldung/2024-07-08/2024-07-08-Check if an Enum Value Contains a Given String in Kotlin.md","localizedDate":"2022年11月1日","excerpt":"\\n<p>枚举是Kotlin中的一项强大功能，它允许程序员定义一组命名常量。它们通常用于表示一个封闭的值集合，比如一周的天数或一年中的月份。有时，我们可能需要检查某个字符串值是否包含在枚举中。</p>\\n<p>在本教程中，我们将探讨在Kotlin中检查枚举值是否包含给定字符串的多种方法。</p>\\n<h2>2. 枚举类定义</h2>\\n<p>在本教程中，我们将查看各种方法和技术，以检查枚举值是否包含某个字符串。首先，我们定义我们的枚举常量：</p>\\n<div class=\\"language-kotlin\\" data-ext=\\"kt\\" data-title=\\"kt\\"><pre class=\\"language-kotlin\\"><code><span class=\\"token keyword\\">enum</span> <span class=\\"token keyword\\">class</span> DaysOfWeek <span class=\\"token punctuation\\">{</span>\\n    MONDAY<span class=\\"token punctuation\\">,</span> TUESDAY<span class=\\"token punctuation\\">,</span> WEDNESDAY<span class=\\"token punctuation\\">,</span> THURSDAY<span class=\\"token punctuation\\">,</span> FRIDAY<span class=\\"token punctuation\\">,</span> SATURDAY<span class=\\"token punctuation\\">,</span> SUNDAY\\n\\n    <span class=\\"token keyword\\">companion</span> <span class=\\"token keyword\\">object</span> <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token keyword\\">val</span> names <span class=\\"token keyword\\">by</span> lazy <span class=\\"token punctuation\\">{</span> DaysOfWeek<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">values</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">map</span><span class=\\"token punctuation\\">{</span> it<span class=\\"token punctuation\\">.</span>name <span class=\\"token punctuation\\">}</span> <span class=\\"token punctuation\\">}</span>\\n    <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{r as comp,d as data};
