import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as n,a}from"./app-BUAgDejY.js";const i={},s=a(`<h1 id="kotlin是按值传递还是按引用传递" tabindex="-1"><a class="header-anchor" href="#kotlin是按值传递还是按引用传递"><span>Kotlin是按值传递还是按引用传递？</span></a></h1><p>了解Kotlin在按值传递和按引用传递方面的行为对于有效使用该语言至关重要。</p><p>在本教程中，我们将探索Kotlin传递参数的行为。我们将通过一系列实际示例来检验按值传递和按引用传递。</p><p><strong>在Kotlin函数中，默认情况下参数是按值传递的，就像Java方法一样</strong>。这意味着参数的值作为函数的参数传递。如果我们在函数内更改参数的值，函数外原始值不会受到影响。这种机制的优点是防止函数外部意外更改。</p><p>在测试这种行为之前，重要的是要承认<strong>Kotlin中的参数不能重新赋值</strong>。当我们尝试这样做时，代码将无法编译，如下例所示：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>fun modifyValue(a: Int) {
    a = 5
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>考虑到这一点，让我们定义一个函数，它接受一个_Int_参数，加上10，然后返回结果：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>private fun modifyValue(value: Int): Int {
    return value + 10
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，让我们用单元测试来断言其行为：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
fun \`Test using pass-by-value\`(){
    val num = 5
    val modifiedNum = modifyValue(num)

    assertEquals(5, num)
    assertEquals(15, modifiedNum)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先，我们调用_modifyValue()<em>函数，传递变量_num</em>。然后我们断言_num_的值保持不变，而_modifiedNum_变量应该具有从函数调用解析得到的值15。</p><h2 id="_3-按引用传递" tabindex="-1"><a class="header-anchor" href="#_3-按引用传递"><span>3. 按引用传递</span></a></h2><p><strong>按引用传递是一种函数接收参数的内存地址的行为</strong>，允许访问和修改。</p><p>Java和Kotlin总是使用按值传递。<strong>但是，当传递对象或非原始类型时，函数复制引用，模拟按引用传递</strong>。方法内部的更改由于共享引用而影响外部对象。</p><p>让我们用一个简单的例子来说明这种行为：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>data class SomeObj(var x: Int = 0)

private fun modifyObject(someObj: SomeObj) {
    someObj.x = 3
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先，我们定义了一个数据类_SomeObj_，它有一个属性_x_，类型为_Int_，默认值为0。</p><p>然后，我们创建了一个名为_modifyObject()<em>的函数，它接受一个参数_o</em>，类型为_SomeObj_。在函数内部，对象_o_的属性_x_的值被更新为3。</p><p>为了验证函数内部对对象的更改是否影响外部的原始对象，让我们编写一个单元测试：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
fun \`Test using pass-by-reference\`() {
    val obj = SomeObj()

    assertEquals(0, obj.x) // before modify

    modifyObject(obj)

    assertEquals(3, obj.x) // after modify
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，我们断言在调用_modifyObject()_函数之前，_obj_中的_x_仍然是0。</p><p>Kotlin和Java都使用相同的内存模型，其中栈存储引用变量，堆存储对象。我们新创建的对象包含对_obj_的引用：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/sites/5/2023/12/diagram-1.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>最后，我们调用_modifyObject()_函数，并断言_x_已更改为3。</p><p>在我们的内存模型中，我们现在在堆上有两个对象：函数内部的一个和函数外部的一个。当函数内部的对象被创建时，一个新的引用变量被复制到栈上。现在栈上存在两个具有相同值的引用变量：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/sites/5/2023/12/diagram-2.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>请注意，当函数调用发生时，_obj_的引用被复制并作为参数发送到_modifyObject()_函数。这与原始的按引用传递不同，后者参数是原始的引用。</p><h2 id="_4-并排比较" tabindex="-1"><a class="header-anchor" href="#_4-并排比较"><span>4. 并排比较</span></a></h2><p>让我们通过一个表格探索按值传递和按引用传递之间的主要区别，涵盖驱动行为的机制、对原始值的影响以及其常见用法：</p><table><thead><tr><th><strong>标准</strong></th><th><strong>按值传递</strong></th><th><strong>按引用传递</strong></th><th><strong>按值传递与引用复制</strong></th></tr></thead><tbody><tr><td>机制</td><td>将参数的值传递到函数中</td><td>将对象引用或内存地址传递到函数中</td><td>复制对象引用的值并以值的形式传递</td></tr><tr><td>原始值变化</td><td>不影响原始值</td><td>可能会影响原始值</td><td>外部可见变化</td></tr><tr><td>安全性</td><td>避免函数外部的意外错误或不想要的值更改</td><td>函数外部可能发生意外的更改</td><td>通过不影响原始值提供安全性</td></tr><tr><td>可预测性</td><td>预测函数行为更容易</td><td>代码可能导致意外行为</td><td>通过保持原始值的独立性增强可预测性</td></tr></tbody></table><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们展示了<strong>Kotlin默认对原始类型的函数参数使用按值传递</strong>。我们还观察到<strong>对于对象和非原始类型，在Java和Kotlin中，我们有按值传递与引用复制</strong>，其行为类似于按引用传递。</p><p>在Kotlin中，我们必须意识到我们的函数是处理原始还是非原始参数，以理解哪种行为被应用。</p><p>如常，完整的源代码可以在GitHub上找到。</p><p><img src="https://www.baeldung.com/kotlin/wp-content/themes/baeldung/icon/logo.svg" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/sites/5/2022/11/kotlin_sublogo.png" alt="img" loading="lazy"><img src="https://secure.gravatar.com/avatar/dc417739e22ae675b0e1f7012bbddaa5?s=50&amp;r=g" alt="img" loading="lazy"></p><p>OK</p>`,36),l=[s];function o(d,r){return n(),t("div",null,l)}const m=e(i,[["render",o],["__file","2024-07-26-Is Kotlin Pass By Value or Pass By Reference .html.vue"]]),u=JSON.parse('{"path":"/posts/baeldung/2024-07-26/2024-07-26-Is%20Kotlin%20Pass%20By%20Value%20or%20Pass%20By%20Reference%20.html","title":"Kotlin是按值传递还是按引用传递？","lang":"zh-CN","frontmatter":{"date":"2023-12-05T00:00:00.000Z","category":["Kotlin","Programming"],"tag":["Kotlin","Pass-by-Value","Pass-by-Reference"],"head":[["meta",{"name":"keywords","content":"Kotlin, Pass-by-Value, Pass-by-Reference"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-26/2024-07-26-Is%20Kotlin%20Pass%20By%20Value%20or%20Pass%20By%20Reference%20.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Kotlin是按值传递还是按引用传递？"}],["meta",{"property":"og:description","content":"Kotlin是按值传递还是按引用传递？ 了解Kotlin在按值传递和按引用传递方面的行为对于有效使用该语言至关重要。 在本教程中，我们将探索Kotlin传递参数的行为。我们将通过一系列实际示例来检验按值传递和按引用传递。 在Kotlin函数中，默认情况下参数是按值传递的，就像Java方法一样。这意味着参数的值作为函数的参数传递。如果我们在函数内更改参数..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/sites/5/2023/12/diagram-1.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-26T05:56:13.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Kotlin"}],["meta",{"property":"article:tag","content":"Pass-by-Value"}],["meta",{"property":"article:tag","content":"Pass-by-Reference"}],["meta",{"property":"article:published_time","content":"2023-12-05T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-26T05:56:13.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Kotlin是按值传递还是按引用传递？\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/sites/5/2023/12/diagram-1.png\\",\\"https://www.baeldung.com/wp-content/uploads/sites/5/2023/12/diagram-2.png\\",\\"https://www.baeldung.com/kotlin/wp-content/themes/baeldung/icon/logo.svg\\",\\"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg\\",\\"https://www.baeldung.com/wp-content/uploads/sites/5/2022/11/kotlin_sublogo.png\\",\\"https://secure.gravatar.com/avatar/dc417739e22ae675b0e1f7012bbddaa5?s=50&r=g\\"],\\"datePublished\\":\\"2023-12-05T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-26T05:56:13.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Kotlin是按值传递还是按引用传递？ 了解Kotlin在按值传递和按引用传递方面的行为对于有效使用该语言至关重要。 在本教程中，我们将探索Kotlin传递参数的行为。我们将通过一系列实际示例来检验按值传递和按引用传递。 在Kotlin函数中，默认情况下参数是按值传递的，就像Java方法一样。这意味着参数的值作为函数的参数传递。如果我们在函数内更改参数..."},"headers":[{"level":2,"title":"3. 按引用传递","slug":"_3-按引用传递","link":"#_3-按引用传递","children":[]},{"level":2,"title":"4. 并排比较","slug":"_4-并排比较","link":"#_4-并排比较","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1721973373000,"updatedTime":1721973373000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.16,"words":1248},"filePathRelative":"posts/baeldung/2024-07-26/2024-07-26-Is Kotlin Pass By Value or Pass By Reference .md","localizedDate":"2023年12月5日","excerpt":"\\n<p>了解Kotlin在按值传递和按引用传递方面的行为对于有效使用该语言至关重要。</p>\\n<p>在本教程中，我们将探索Kotlin传递参数的行为。我们将通过一系列实际示例来检验按值传递和按引用传递。</p>\\n<p><strong>在Kotlin函数中，默认情况下参数是按值传递的，就像Java方法一样</strong>。这意味着参数的值作为函数的参数传递。如果我们在函数内更改参数的值，函数外原始值不会受到影响。这种机制的优点是防止函数外部意外更改。</p>\\n<p>在测试这种行为之前，重要的是要承认<strong>Kotlin中的参数不能重新赋值</strong>。当我们尝试这样做时，代码将无法编译，如下例所示：</p>","autoDesc":true}');export{m as comp,u as data};
