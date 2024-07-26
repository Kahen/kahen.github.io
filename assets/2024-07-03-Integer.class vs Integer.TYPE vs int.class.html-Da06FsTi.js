import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as n,a as s}from"./app-8nJ1rqSf.js";const a={},i=s(`<hr><h1 id="integer-class-与-integer-type-与-int-class-baeldung" tabindex="-1"><a class="header-anchor" href="#integer-class-与-integer-type-与-int-class-baeldung"><span>Integer.class 与 Integer.TYPE 与 int.class | Baeldung</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>在Java中，有时我们需要使用基本类型及其对应的包装类。当处理_int_类型及其包装类_Integer_时，我们可能会遇到三种不同的表示形式。这些表示形式分别是_Integer.class_、<em>Integer.TYPE_和_int.class</em>。尽管它们乍一看可能很相似，但它们之间存在微妙的差异。</p><p>在本教程中，我们将探讨这些术语之间的区别，并了解它们在Java编程中的重要性。</p><p><strong><em>Integer.class</em> 表示与_Integer_包装类相关联的类对象</strong>。</p><p>我们可以使用它来获取有关类本身的信息，例如其名称、超类、接口、方法和字段。</p><p>此外，我们可以使用它进行与反射相关的操作，例如动态创建新实例或在运行时调用方法。</p><p>以下是演示使用_Integer.class_的示例：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
public void givenIntegerClass_whenGetName_thenVerifyClassName() {
    Class\`&lt;Integer&gt;\` integerClass = Integer.class;
    Assertions.assertEquals(&quot;java.lang.Integer&quot;, integerClass.getName());
    Assertions.assertEquals(Number.class, integerClass.getSuperclass());
    Assertions.assertFalse(integerClass.isPrimitive());
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们使用_Integer.class_获取_Integer_的类对象，允许我们对其执行各种操作。</p><p>例如，调用类的_getName()<em>方法返回“<em>java.lang.Integer</em>”。另一个有用的方法是_getSuperclass()</em>，它允许我们获取类的超类。这有助于识别与_Number_类的继承关系。</p><h2 id="_3-integer-type" tabindex="-1"><a class="header-anchor" href="#_3-integer-type"><span>3. <em>Integer.TYPE</em></span></a></h2><p>_Integer.TYPE_是Java中的一个特殊常量，表示基本类型int。我们可以使用_Integer.TYPE_来<strong>区分基本类型和它们对应的包装类</strong>。在涉及方法重载的场景中，这种区分变得特别重要。</p><p>让我们用一个示例来说明_Integer.TYPE_的使用：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>int sum(int a, int b) {
    return a + b;
}

int sum(Integer a, Integer b) {
    return a + b;
}

int sum(int a, Integer b) {
    return a + b;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的代码中，我们创建了三个重载的_sum()_方法。第一个_sum()_方法接受两个_int_基本值并返回它们的和。第二个_sum()_方法接受两个_Integer_包装对象并返回它们的和。第三个_sum()_方法接受一个_int_基本值和一个_Integer_包装对象，并返回它们的和。</p><p>让我们验证在处理_int_和_Integer_类型时值的总和。</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
public void givenIntAndInteger_whenAddingValues_thenVerifySum() {
    int primitiveValue = 10;
    Integer wrapperValue = Integer.valueOf(primitiveValue);
    Assertions.assertEquals(20, sum(primitiveValue, primitiveValue));
    Assertions.assertEquals(20, sum(wrapperValue, wrapperValue));
    Assertions.assertEquals(20, sum(primitiveValue, wrapperValue));
    Assertions.assertEquals(Integer.TYPE.getName(), int.class.getName());
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>给定的测试用例的主要使用是区分_int_基本类型和它们对应的_Integer_包装类，这在涉及方法重载的场景中至关重要。</p><p>提供的代码片段包含三个断言，验证不同_sum()_方法的正确功能。第一个断言检查_sum()<em>方法是否正确地添加了两个_int_基本值，确保返回预期的总和_20</em>。类似地，第二个断言测试了两个_Integer_包装对象的_sum()<em>方法，期望总和为_20</em>。最后，第三个断言验证了同时接受_int_基本值和_Integer_包装对象的_sum()<em>方法，确认它正确地计算了总和并返回了预期的结果_20</em>。</p><p>这些断言共同确保了在重载的_sum()_方法中正确区分了_int_基本类型和_Integer_包装类。</p><p>代码还比较了_int.class_（表示_int_基本类型）的类名称与_Integer.TYPE_的类名称。_assertEquals()_方法断言两个类名称是相等的。</p><h2 id="_4-int-class" tabindex="-1"><a class="header-anchor" href="#_4-int-class"><span>4. <em>int.class</em></span></a></h2><p>_int.class_表示与_int_基本类型相关联的类对象。具体来说，当我们需要显式引用基本类型本身时，可以使用它。</p><p>这在<strong>我们想要检查变量或参数的类型时特别有用。此外，它允许我们直接在基本类型_int_上执行类型特定的操作</strong>。</p><p>让我们通过一个示例来看看_int.class_的使用：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
public void givenIntClass_whenUsingIntClass_thenVerifyIntClassProperties() {
    Class\`&lt;?&gt;\` intClass = int.class;
    Assertions.assertEquals(&quot;int&quot;, intClass.getName());
    Assertions.assertTrue(intClass.isPrimitive());
    Assertions.assertEquals(int.class, intClass);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个示例中，我们使用_getClass()<em>方法获取_intValue_的类对象。尽管_intValue_是一个基本的_int</em>，但_getClass()<em>方法返回相应的包装类_java.lang.Integer</em>。为了将其与基本类型_int_进行比较，我们使用_int.class_并验证它们是否匹配。</p><h2 id="_5-每种类型之间的区别" tabindex="-1"><a class="header-anchor" href="#_5-每种类型之间的区别"><span>5. 每种类型之间的区别</span></a></h2><p>下表总结了_Integer.class_、_Integer.TYPE_和_int.class_之间的主要区别：</p><table><thead><tr><th></th><th><em>Integer.class</em></th><th><em>Integer.TYPE</em></th><th><em>int.class</em></th></tr></thead><tbody><tr><td><strong>表示</strong></td><td>与_Integer_包装类相关联的类对象</td><td>与_Integer_包装类相关联的_int_基本类型</td><td>与_int_基本类型相关联的类对象</td></tr><tr><td><strong>用途</strong></td><td>反射相关操作，获取类信息，动态创建实例</td><td>区分使用_Integer_和_int_参数的方法重载</td><td>直接在_int_基本类型上执行类型特定操作</td></tr><tr><td><strong>示例用法</strong></td><td><em>Integer.class.getName()</em> 返回 <em>java.lang.Integer</em></td><td><em>Integer.TYPE.getName()</em> 返回 <em>int</em></td><td><em>int.class.getSimpleName()</em> 返回 <em>int</em></td></tr><tr><td><strong>反射</strong></td><td>用于访问类的信息，例如名称、超类、方法和字段</td><td>不适用，因为它表示基本类型，而不是类</td><td>可以通过几种方法访问类的信息，例如 <em>getName()</em>、<em>getModifiers()</em>、<em>getSuperclass()</em> 等</td></tr><tr><td><strong>类型检查</strong></td><td><em>Integer.class.isPrimitive()</em> 返回 <em>false</em></td><td>不适用，因为它表示基本类型，而不是类</td><td><em>int.class.isInstance()</em> 可用于执行类型检查，以确定对象是否为int类型</td></tr><tr><td><strong>方法重载</strong></td><td>与方法重载无直接关系</td><td>用于区分重载方法中的_Integer_和_int_参数</td><td>与方法重载无直接关系</td></tr><tr><td><strong>性能</strong></td><td>涉及使用包装对象的开销</td><td>无开销，因为它直接表示基本类型</td><td>无开销，因为它直接表示基本类型</td></tr></tbody></table><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们探讨了Java中的_Integer.class_、_Integer.TYPE_和_int.class_的概念。理解这些概念使我们能够有效地使用基本类型及其包装类。</p><p>如往常一样，本文的完整代码示例可以在GitHub上找到。抱歉，由于篇幅限制，翻译内容未能一次性完成。以下是剩余部分的翻译：</p><h2 id="_6-结论-1" tabindex="-1"><a class="header-anchor" href="#_6-结论-1"><span>6. 结论</span></a></h2><p>在本文中，我们探讨了Java中的_Integer.class_、_Integer.TYPE_和_int.class_的概念。理解这些概念使我们能够有效地使用基本类型及其包装类。</p><p>正如往常一样，本文的完整代码示例可以在GitHub上找到。</p><p><img src="https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg" alt="img" loading="lazy"><img src="https://secure.gravatar.com/avatar/dc417739e22ae675b0e1f7012bbddaa5?s=50&amp;r=g" alt="img" loading="lazy"><img src="https://secure.gravatar.com/avatar/e10d6ff4ff6d95fd255cc95a5ab28c0e?s=50&amp;r=g" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png" alt="img" loading="lazy"></p><p>OK</p>`,40),r=[i];function l(d,g){return n(),t("div",null,r)}const _=e(a,[["render",l],["__file","2024-07-03-Integer.class vs Integer.TYPE vs int.class.html.vue"]]),p=JSON.parse('{"path":"/posts/baeldung/2024-07-03/2024-07-03-Integer.class%20vs%20Integer.TYPE%20vs%20int.class.html","title":"Integer.class 与 Integer.TYPE 与 int.class | Baeldung","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Programming"],"tag":["Integer","Wrapper Class","Primitive Type"],"head":[["meta",{"name":"keywords","content":"Java, Integer, Wrapper Class, Primitive Type, Class Object, Reflection, Method Overloading"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-03/2024-07-03-Integer.class%20vs%20Integer.TYPE%20vs%20int.class.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Integer.class 与 Integer.TYPE 与 int.class | Baeldung"}],["meta",{"property":"og:description","content":"Integer.class 与 Integer.TYPE 与 int.class | Baeldung 1. 引言 在Java中，有时我们需要使用基本类型及其对应的包装类。当处理_int_类型及其包装类_Integer_时，我们可能会遇到三种不同的表示形式。这些表示形式分别是_Integer.class_、Integer.TYPE_和_int.clas..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-03T07:56:00.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Integer"}],["meta",{"property":"article:tag","content":"Wrapper Class"}],["meta",{"property":"article:tag","content":"Primitive Type"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-03T07:56:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Integer.class 与 Integer.TYPE 与 int.class | Baeldung\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg\\",\\"https://secure.gravatar.com/avatar/dc417739e22ae675b0e1f7012bbddaa5?s=50&r=g\\",\\"https://secure.gravatar.com/avatar/e10d6ff4ff6d95fd255cc95a5ab28c0e?s=50&r=g\\",\\"https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png\\",\\"https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg\\",\\"https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-03T07:56:00.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Integer.class 与 Integer.TYPE 与 int.class | Baeldung 1. 引言 在Java中，有时我们需要使用基本类型及其对应的包装类。当处理_int_类型及其包装类_Integer_时，我们可能会遇到三种不同的表示形式。这些表示形式分别是_Integer.class_、Integer.TYPE_和_int.clas..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"3. Integer.TYPE","slug":"_3-integer-type","link":"#_3-integer-type","children":[]},{"level":2,"title":"4. int.class","slug":"_4-int-class","link":"#_4-int-class","children":[]},{"level":2,"title":"5. 每种类型之间的区别","slug":"_5-每种类型之间的区别","link":"#_5-每种类型之间的区别","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论-1","link":"#_6-结论-1","children":[]}],"git":{"createdTime":1719993360000,"updatedTime":1719993360000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.27,"words":1581},"filePathRelative":"posts/baeldung/2024-07-03/2024-07-03-Integer.class vs Integer.TYPE vs int.class.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>Integer.class 与 Integer.TYPE 与 int.class | Baeldung</h1>\\n<h2>1. 引言</h2>\\n<p>在Java中，有时我们需要使用基本类型及其对应的包装类。当处理_int_类型及其包装类_Integer_时，我们可能会遇到三种不同的表示形式。这些表示形式分别是_Integer.class_、<em>Integer.TYPE_和_int.class</em>。尽管它们乍一看可能很相似，但它们之间存在微妙的差异。</p>\\n<p>在本教程中，我们将探讨这些术语之间的区别，并了解它们在Java编程中的重要性。</p>\\n<p><strong><em>Integer.class</em> 表示与_Integer_包装类相关联的类对象</strong>。</p>","autoDesc":true}');export{_ as comp,p as data};
