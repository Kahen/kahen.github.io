import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as l,a}from"./app--lzXT3lN.js";const t={},i=a(`<h1 id="在java中检查整数是否为null或零" tabindex="-1"><a class="header-anchor" href="#在java中检查整数是否为null或零"><span>在Java中检查整数是否为null或零</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在这篇快速教程中，我们将学习几种不同的方式来检查给定的_Integer_实例的值是否为null或零。</p><p>为了简化，我们将使用单元测试断言来验证每种方法是否按预期工作。</p><p>接下来，让我们看看它们是如何工作的。</p><h2 id="_2-使用标准方式" tabindex="-1"><a class="header-anchor" href="#_2-使用标准方式"><span>2. 使用标准方式</span></a></h2><p>使用逻辑或运算符可能是执行检查的第一个想法。它简单地检查给定的_Integer_数字是否为null或零。</p><p>让我们创建一个方法来实现这个检查，以便于验证：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public static boolean usingStandardWay(Integer num) {
    return num == null || num == 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这可能是执行检查的最直接方法。让我们创建一个测试来看看它对不同的_Integer_实例是否有效：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>int n0 = 0;
boolean result0 = usingStandardWay(n0);
assertTrue(result0);

boolean resultNull = usingStandardWay(null);
assertTrue(resultNull);

int n42 = 42;
boolean result42 = usingStandardWay(n42);
assertFalse(result42);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，我们已经通过传递三个_Integer_对象给_ usingStandardWay()_方法进行了测试：零，null和42。我们将使用这三个_Integer_对象作为本教程中进一步测试的输入。</p><h2 id="_3-使用三元运算符" tabindex="-1"><a class="header-anchor" href="#_3-使用三元运算符"><span>3. 使用三元运算符</span></a></h2><p>我们经常使用三元运算符编写带有条件的变量赋值，例如：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>variable = booleanExpression ? expression1 : expression2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>接下来，让我们看看如何使用三元运算符来执行所需的_Integer_检查：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public static boolean usingTernaryOperator(Integer num) {
    return 0 == (num == null ? 0 : num);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如上面的代码所示，_(num == null ? 0 : num)_首先检查_num_变量是否为null。如果是这样，我们取零。否则，我们将取原始的_num_值。</p><p>换句话说，<strong>这个表达式在这里进行了“null到零”的转换</strong>。由于我们已经处理了null的情况，我们只需要检查带有三元运算符的表达式的结果是否为零。</p><p>接下来，让我们测试这种方法是否适用于我们的三个_Integer_实例：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>int n0 = 0;
boolean result0 = usingTernaryOperator(n0);
assertTrue(result0);

boolean resultNull = usingTernaryOperator(null);
assertTrue(resultNull);

int n42 = 42;
boolean result42 = usingTernaryOperator(n42);
assertFalse(result42);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们运行测试，它会通过。因此，_usingTernaryOperator()_方法按预期工作。</p><h2 id="_4-使用-optional-类" tabindex="-1"><a class="header-anchor" href="#_4-使用-optional-类"><span>4. 使用_Optional_类</span></a></h2><p>Java 8引入了_Optional_类型，因此如果我们的Java版本是8或更高版本，我们还可以使用_Optional_类的静态方法来实现这个检查：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public static boolean usingOptional(Integer num) {
    return Optional.ofNullable(num).orElse(0) == 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于我们不知道给定的_Integer_变量是否为null，我们可以使用_Optional.ofNullable(num)_从它构建一个_Optional_实例。</p><p>接下来，我们调用_Optional_的_orElse()_方法。**_orElse(x)<em>方法检查_Optional_对象：如果存在值，则返回该值，否则返回_x</em>。**因此，_orElse(0)_也进行了“null到零”的转换。然后，剩下的就很简单了。我们只需要检查_orElse(0)_是否等于零。</p><p>接下来，让我们验证这种方法是否适用于我们的输入：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>int n0 = 0;
boolean result0 = usingOptional(n0);
assertTrue(result0);

boolean resultNull = usingOptional(null);
assertTrue(resultNull);

int n42 = 42;
boolean result42 = usingOptional(n42);
assertFalse(result42);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们运行测试，它会通过。因此，_usingOptional()_方法也完成了工作。</p><h2 id="_5-使用-objectutils-类" tabindex="-1"><a class="header-anchor" href="#_5-使用-objectutils-类"><span>5. 使用_ObjectUtils_类</span></a></h2><p>Apache Commons Lang 3是一个非常流行的库。如果这个库已经是我们正在工作的Java项目的依赖项，我们也可以使用它的_ObjectUtils_类来执行_Integer_检查：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public static boolean usingObjectUtils(Integer num) {
    return ObjectUtils.defaultIfNull(num, 0) == 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如上面的实现所示，我们在检查中调用了_ObjectUtils.defaultIfNull(num, 0)_方法。_defaultIfNull()_方法是一个泛型方法。如果我们看看它的实现方式，我们就会理解_usingObjectUtils()_实现：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public static \`&lt;T&gt;\` T defaultIfNull(final T object, final T defaultValue) {
    return object != null ? object : defaultValue;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，如果我们跳过泛型声明，_defaultIfNull()_的实现就像使用三元运算符的表达式一样简单。这对我们来说并不新鲜。因此，<strong>它也进行了“null到零”的转换</strong>。</p><p>像往常一样，让我们测试我们的_usingObjectUtils()_方法：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>int n0 = 0;
boolean result0 = usingObjectUtils(n0);
assertTrue(result0);

boolean resultNull = usingObjectUtils(null);
assertTrue(resultNull);

int n42 = 42;
boolean result42 = usingObjectUtils(n42);
assertFalse(result42);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>毫不意外，测试也通过了。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在这篇文章中，我们探讨了三种检查给定_Integer_对象是否为null或其值是否为零的方法。</p><p>像往常一样，文章中展示的所有代码片段都可以在GitHub上找到。</p>`,42),s=[i];function r(d,u){return l(),n("div",null,s)}const v=e(t,[["render",r],["__file","2024-07-10-Check if an Integer Value Is Null or Zero in Java.html.vue"]]),p=JSON.parse('{"path":"/posts/baeldung/2024-07-10/2024-07-10-Check%20if%20an%20Integer%20Value%20Is%20Null%20or%20Zero%20in%20Java.html","title":"在Java中检查整数是否为null或零","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Programming"],"tag":["Java","Integer","Null Check"],"head":[["meta",{"name":"keywords","content":"Java, Integer, Null Check, Zero Check"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-10/2024-07-10-Check%20if%20an%20Integer%20Value%20Is%20Null%20or%20Zero%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Java中检查整数是否为null或零"}],["meta",{"property":"og:description","content":"在Java中检查整数是否为null或零 1. 概述 在这篇快速教程中，我们将学习几种不同的方式来检查给定的_Integer_实例的值是否为null或零。 为了简化，我们将使用单元测试断言来验证每种方法是否按预期工作。 接下来，让我们看看它们是如何工作的。 2. 使用标准方式 使用逻辑或运算符可能是执行检查的第一个想法。它简单地检查给定的_Integer..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-10T02:54:11.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Integer"}],["meta",{"property":"article:tag","content":"Null Check"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-10T02:54:11.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Java中检查整数是否为null或零\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-10T02:54:11.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Java中检查整数是否为null或零 1. 概述 在这篇快速教程中，我们将学习几种不同的方式来检查给定的_Integer_实例的值是否为null或零。 为了简化，我们将使用单元测试断言来验证每种方法是否按预期工作。 接下来，让我们看看它们是如何工作的。 2. 使用标准方式 使用逻辑或运算符可能是执行检查的第一个想法。它简单地检查给定的_Integer..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 使用标准方式","slug":"_2-使用标准方式","link":"#_2-使用标准方式","children":[]},{"level":2,"title":"3. 使用三元运算符","slug":"_3-使用三元运算符","link":"#_3-使用三元运算符","children":[]},{"level":2,"title":"4. 使用_Optional_类","slug":"_4-使用-optional-类","link":"#_4-使用-optional-类","children":[]},{"level":2,"title":"5. 使用_ObjectUtils_类","slug":"_5-使用-objectutils-类","link":"#_5-使用-objectutils-类","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1720580051000,"updatedTime":1720580051000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.79,"words":1136},"filePathRelative":"posts/baeldung/2024-07-10/2024-07-10-Check if an Integer Value Is Null or Zero in Java.md","localizedDate":"2022年4月1日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>在这篇快速教程中，我们将学习几种不同的方式来检查给定的_Integer_实例的值是否为null或零。</p>\\n<p>为了简化，我们将使用单元测试断言来验证每种方法是否按预期工作。</p>\\n<p>接下来，让我们看看它们是如何工作的。</p>\\n<h2>2. 使用标准方式</h2>\\n<p>使用逻辑或运算符可能是执行检查的第一个想法。它简单地检查给定的_Integer_数字是否为null或零。</p>\\n<p>让我们创建一个方法来实现这个检查，以便于验证：</p>\\n<div class=\\"language-text\\" data-ext=\\"text\\" data-title=\\"text\\"><pre class=\\"language-text\\"><code>public static boolean usingStandardWay(Integer num) {\\n    return num == null || num == 0;\\n}\\n</code></pre></div>","autoDesc":true}');export{v as comp,p as data};
