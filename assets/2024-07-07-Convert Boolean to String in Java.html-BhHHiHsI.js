import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as n,a as t}from"./app-CbPcg273.js";const o={},l=t(`<hr><h1 id="java中将布尔值转换为字符串" tabindex="-1"><a class="header-anchor" href="#java中将布尔值转换为字符串"><span>Java中将布尔值转换为字符串</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>我们经常需要在Java中将布尔值转换为字符串表示。例如，这在用户界面中显示值或将值写入文件或数据库时非常有用。</p><p>在这个快速教程中，我们将探讨将布尔值转换为字符串的各种方法。</p><h2 id="_2-问题介绍" tabindex="-1"><a class="header-anchor" href="#_2-问题介绍"><span>2. 问题介绍</span></a></h2><p>在Java中将布尔值转换为字符串是一个简单的任务。但是，正如我们所知，<strong>Java中有两种布尔类型：原始的_boolean_和对象_Boolean_</strong>。</p><p>原始_boolean_值和_Boolean_对象到字符串的转换非常相似。然而，有一些点我们应该考虑。</p><p>接下来，让我们从原始_boolean_值开始，看看如何将它们转换为字符串。</p><p>为了简单起见，我们将使用单元测试断言来验证转换结果是否符合预期。</p><h2 id="_3-将原始-boolean-值转换为-string" tabindex="-1"><a class="header-anchor" href="#_3-将原始-boolean-值转换为-string"><span>3. 将原始_boolean_值转换为_String_</span></a></h2><p><strong>原始_boolean_变量可以携带_true_或_false_</strong>。因此，我们可以使用_if-else_语句将其转换为字符串。此外，在Java中，三元运算符（也称为条件运算符）是编写_if-else_语句的简写方式。</p><p>让我们使用三元运算符使转换代码更紧凑和易读：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>boolean primitiveBoolean = true;
assertEquals(&quot;true&quot;, primitiveBoolean ? &quot;true&quot; : &quot;false&quot;);

primitiveBoolean = false;
assertEquals(&quot;false&quot;, primitiveBoolean ? &quot;true&quot; : &quot;false&quot;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述代码非常直接。正如我们所看到的，我们将_true_值转换为字符串“<em>true</em>”，将_false_转换为“<em>false</em>”。这是一种标准的转换方式。然而，有时我们可能想要重新定义转换后的字符串，例如将_true_转换为_“YES”<em>，将_false_转换为</em>“NO”_。然后，<strong>我们可以简单地在三元表达式中更改字符串</strong>。</p><p>当然，如果我们需要多次调用转换，我们可以将其包装在方法中。接下来，让我们看一个将_boolean_值转换为自定义字符串的示例：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>String optionToString(String optionName, boolean optionValue) {
    return String.format(&quot;The option &#39;%s&#39; is %s.&quot;, optionName, optionValue ? &quot;Enabled&quot; : &quot;Disabled&quot;);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>_optionToString()_方法接受一个布尔选项的名称及其值，以构建选项状态的描述：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>assertEquals(&quot;The option &#39;IgnoreWarnings&#39; is Enabled.&quot;, optionToString(&quot;IgnoreWarnings&quot;, true));
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_4-使用-boolean-tostring-方法将-boolean-对象转换为-string" tabindex="-1"><a class="header-anchor" href="#_4-使用-boolean-tostring-方法将-boolean-对象转换为-string"><span>4. 使用_Boolean.toString()<em>方法将_Boolean_对象转换为_String</em></span></a></h2><p>现在，让我们看看如何将_Boolean_变量转换为字符串。<strong>_Boolean_类提供了_Boolean.toString()<em>方法将_Boolean_转换为_String</em></strong>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Boolean myBoolean = Boolean.TRUE;
assertEquals(&quot;true&quot;, myBoolean.toString());

myBoolean = Boolean.FALSE;
assertEquals(&quot;false&quot;, myBoolean.toString());
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们仔细看看_Boolean.toString()_方法，我们会看到它的实现与我们的三元解决方案完全相同：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public String toString() {
    return this.value ? &quot;true&quot; : &quot;false&quot;;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对象_Boolean_与原始类型类似。然而，<strong>除了_true_和_false_，它还可以是_null_</strong>。因此，我们需要在调用_Boolean.toString()<em>方法之前**确保_Boolean_变量不是_null</em>**。否则，将引发_NullpointerException_：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Boolean nullBoolean = null;
assertThrows(NullPointerException.class, () -&gt; nullBoolean.toString());
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-使用-string-valueof-方法将-boolean-对象转换为-string" tabindex="-1"><a class="header-anchor" href="#_5-使用-string-valueof-方法将-boolean-对象转换为-string"><span>5. 使用_String.valueOf()<em>方法将_Boolean_对象转换为_String</em></span></a></h2><p>我们已经看到，标准库中的_Boolean.toString()_可以转换_Boolean_变量为字符串。或者，<strong>我们可以使用_String_类的_valueOf()_方法来解决问题</strong>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Boolean myBoolean = Boolean.TRUE;
assertEquals(&quot;true&quot;, String.valueOf(myBoolean));

myBoolean = Boolean.FALSE;
assertEquals(&quot;false&quot;, String.valueOf(myBoolean));
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>值得一提的是，_String.valueOf()<em>方法是null安全的。换句话说，如果我们的_Boolean_变量是_null</em>，_String.valueOf()<em>会产生</em>“null”<em>而不是抛出_NullPointerException</em>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Boolean nullBoolean = null;
assertEquals(&quot;null&quot;, String.valueOf(nullBoolean));
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这是因为_String.valueOf(Object obj)_方法进行了null检查：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public static String valueOf(Object obj) {
    return obj == null ? &quot;null&quot; : obj.toString();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在这篇文章中，我们探讨了Java中将布尔值转换为字符串的各种方法。</p><p>我们讨论了原始_boolean_和对象_Boolean_的情况：</p><ul><li><em>boolean</em> – 使用三元运算符</li><li><em>Boolean</em> – 我们可以使用_Boolean.toString()_方法（需要进行null检查）或_String.valueOf()_方法（null安全）</li></ul><p>像往常一样，这里展示的所有代码片段都可以在GitHub上找到。</p>`,38),i=[l];function r(s,d){return n(),a("div",null,i)}const v=e(o,[["render",r],["__file","2024-07-07-Convert Boolean to String in Java.html.vue"]]),c=JSON.parse('{"path":"/posts/baeldung/2024-07-07/2024-07-07-Convert%20Boolean%20to%20String%20in%20Java.html","title":"Java中将布尔值转换为字符串","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Programming"],"tag":["Java","Boolean to String"],"head":[["meta",{"name":"keywords","content":"Java, Boolean to String, Convert, Tutorial"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-07/2024-07-07-Convert%20Boolean%20to%20String%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中将布尔值转换为字符串"}],["meta",{"property":"og:description","content":"Java中将布尔值转换为字符串 1. 概述 我们经常需要在Java中将布尔值转换为字符串表示。例如，这在用户界面中显示值或将值写入文件或数据库时非常有用。 在这个快速教程中，我们将探讨将布尔值转换为字符串的各种方法。 2. 问题介绍 在Java中将布尔值转换为字符串是一个简单的任务。但是，正如我们所知，Java中有两种布尔类型：原始的_boolean_..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-07T19:30:06.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Boolean to String"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-07T19:30:06.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中将布尔值转换为字符串\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-07T19:30:06.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中将布尔值转换为字符串 1. 概述 我们经常需要在Java中将布尔值转换为字符串表示。例如，这在用户界面中显示值或将值写入文件或数据库时非常有用。 在这个快速教程中，我们将探讨将布尔值转换为字符串的各种方法。 2. 问题介绍 在Java中将布尔值转换为字符串是一个简单的任务。但是，正如我们所知，Java中有两种布尔类型：原始的_boolean_..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 问题介绍","slug":"_2-问题介绍","link":"#_2-问题介绍","children":[]},{"level":2,"title":"3. 将原始_boolean_值转换为_String_","slug":"_3-将原始-boolean-值转换为-string","link":"#_3-将原始-boolean-值转换为-string","children":[]},{"level":2,"title":"4. 使用_Boolean.toString()方法将_Boolean_对象转换为_String","slug":"_4-使用-boolean-tostring-方法将-boolean-对象转换为-string","link":"#_4-使用-boolean-tostring-方法将-boolean-对象转换为-string","children":[]},{"level":2,"title":"5. 使用_String.valueOf()方法将_Boolean_对象转换为_String","slug":"_5-使用-string-valueof-方法将-boolean-对象转换为-string","link":"#_5-使用-string-valueof-方法将-boolean-对象转换为-string","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1720380606000,"updatedTime":1720380606000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.28,"words":983},"filePathRelative":"posts/baeldung/2024-07-07/2024-07-07-Convert Boolean to String in Java.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>Java中将布尔值转换为字符串</h1>\\n<h2>1. 概述</h2>\\n<p>我们经常需要在Java中将布尔值转换为字符串表示。例如，这在用户界面中显示值或将值写入文件或数据库时非常有用。</p>\\n<p>在这个快速教程中，我们将探讨将布尔值转换为字符串的各种方法。</p>\\n<h2>2. 问题介绍</h2>\\n<p>在Java中将布尔值转换为字符串是一个简单的任务。但是，正如我们所知，<strong>Java中有两种布尔类型：原始的_boolean_和对象_Boolean_</strong>。</p>\\n<p>原始_boolean_值和_Boolean_对象到字符串的转换非常相似。然而，有一些点我们应该考虑。</p>","autoDesc":true}');export{v as comp,c as data};
