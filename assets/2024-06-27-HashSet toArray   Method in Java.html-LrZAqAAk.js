import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as a,a as n}from"./app-BaAI5AMv.js";const s={},r=n(`<h1 id="java中hashset的toarray-方法-baeldung" tabindex="-1"><a class="header-anchor" href="#java中hashset的toarray-方法-baeldung"><span>Java中HashSet的toArray()方法 | Baeldung</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p><em>HashSet</em> 是我们可以在Java <em>Collections</em> 中使用的一种常见数据结构。</p><p><strong>在本教程中，我们将深入探讨_HashSet_类的_toArray()_方法，展示如何将_HashSet_转换为数组。</strong></p><h2 id="_2-将-hashset-转换为-数组" tabindex="-1"><a class="header-anchor" href="#_2-将-hashset-转换为-数组"><span>2. 将_HashSet_转换为_数组_</span></a></h2><p>让我们看一组示例，说明如何应用_toArray()_方法将_HashSet_转换为数组。</p><h3 id="_2-1-hashset-转换为-字符串数组" tabindex="-1"><a class="header-anchor" href="#_2-1-hashset-转换为-字符串数组"><span>2.1. <em>HashSet_转换为_字符串数组</em></span></a></h3><p>在以下方法中，我们试图将字符串的_HashSet_转换为字符串数组：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
public void givenStringHashSet_whenConvertedToArray_thenArrayContainsStringElements() {
    HashSet\`&lt;String&gt;\` stringSet = new HashSet&lt;&gt;();
    stringSet.add(&quot;Apple&quot;);
    stringSet.add(&quot;Banana&quot;);
    stringSet.add(&quot;Cherry&quot;);

    // 将字符串HashSet转换为字符串数组
    String[] stringArray = stringSet.toArray(new String[0]);

    // 测试数组的长度是否正确
    assertEquals(3, stringArray.length);

    for (String str : stringArray) {
        assertTrue(stringSet.contains(str));
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里，初始化了一个名为_stringSet_的_HashSet_，包含三个_String_元素：（&quot;Apple&quot;、&quot;Banana&quot;和&quot;Cherry&quot;）。具体来说，测试方法确保结果数组的长度为3，与_HashSet_中的元素数量相匹配。</p><p><strong>然后，它遍历_stringArray_并检查每个元素是否包含在原始_stringSet_中，断言数组确实包含_String_元素，确认_HashSet_成功转换为字符串数组。</strong></p><h3 id="_2-2-hashset-转换为-整数数组" tabindex="-1"><a class="header-anchor" href="#_2-2-hashset-转换为-整数数组"><span>2.2. <em>HashSet_转换为_整数数组</em></span></a></h3><p>此外，我们可以使用_ toArray()_方法将_整数HashSet_转换为整数数组，如下所示：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
public void givenIntegerHashSet_whenConvertedToArray_thenArrayContainsIntegerElements() {
    HashSet\`&lt;Integer&gt;\` integerSet = new HashSet&lt;&gt;();
    integerSet.add(5);
    integerSet.add(10);
    integerSet.add(15);

    // 将整数HashSet转换为整数数组
    Integer[] integerArray = integerSet.toArray(new Integer[0]);

    // 测试数组的长度是否正确
    assertEquals(3, integerArray.length);

    for (Integer num : integerArray) {
        assertTrue(integerSet.contains(num));
    }

    assertTrue(integerSet.contains(5));
    assertTrue(integerSet.contains(10));
    assertTrue(integerSet.contains(15));
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里，我们创建了一个名为_integerSet_的_HashSet_，包含三个整数元素：(5、10和15)。测试方法负责验证这个整数_HashSet_转换为整数数组，称为_integerArray_。</p><p><strong>此外，它确认结果数组的长度=3，对应于原始_HashSet_中的元素数量。随后，方法遍历_integerArray_，确保每个元素都包含在原始_integerSet_中。</strong></p><h2 id="_3-结论" tabindex="-1"><a class="header-anchor" href="#_3-结论"><span>3. 结论</span></a></h2><p>总之，使用_HashSet_类的_toArray()_方法将_HashSet_转换为数组是很容易的。这在处理基于数组的数据结构或我们Java应用程序中的其他组件时也可能很有用。</p><p>如常，本文的完整代码示例可以在GitHub上找到。</p>`,19),i=[r];function l(d,h){return a(),t("div",null,i)}const c=e(s,[["render",l],["__file","2024-06-27-HashSet toArray   Method in Java.html.vue"]]),v=JSON.parse('{"path":"/posts/baeldung/2024-06-27/2024-06-27-HashSet%20toArray%20%20%20Method%20in%20Java.html","title":"Java中HashSet的toArray()方法 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-06-27T00:00:00.000Z","category":["Java","Collections"],"tag":["HashSet","toArray"],"head":[["meta",{"name":"keywords","content":"Java, HashSet, toArray, Baeldung"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-27/2024-06-27-HashSet%20toArray%20%20%20Method%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中HashSet的toArray()方法 | Baeldung"}],["meta",{"property":"og:description","content":"Java中HashSet的toArray()方法 | Baeldung 1. 引言 HashSet 是我们可以在Java Collections 中使用的一种常见数据结构。 在本教程中，我们将深入探讨_HashSet_类的_toArray()_方法，展示如何将_HashSet_转换为数组。 2. 将_HashSet_转换为_数组_ 让我们看一组示例，说..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-27T13:51:41.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"HashSet"}],["meta",{"property":"article:tag","content":"toArray"}],["meta",{"property":"article:published_time","content":"2024-06-27T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-27T13:51:41.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中HashSet的toArray()方法 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-27T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-27T13:51:41.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中HashSet的toArray()方法 | Baeldung 1. 引言 HashSet 是我们可以在Java Collections 中使用的一种常见数据结构。 在本教程中，我们将深入探讨_HashSet_类的_toArray()_方法，展示如何将_HashSet_转换为数组。 2. 将_HashSet_转换为_数组_ 让我们看一组示例，说..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 将_HashSet_转换为_数组_","slug":"_2-将-hashset-转换为-数组","link":"#_2-将-hashset-转换为-数组","children":[{"level":3,"title":"2.1. HashSet_转换为_字符串数组","slug":"_2-1-hashset-转换为-字符串数组","link":"#_2-1-hashset-转换为-字符串数组","children":[]},{"level":3,"title":"2.2. HashSet_转换为_整数数组","slug":"_2-2-hashset-转换为-整数数组","link":"#_2-2-hashset-转换为-整数数组","children":[]}]},{"level":2,"title":"3. 结论","slug":"_3-结论","link":"#_3-结论","children":[]}],"git":{"createdTime":1719496301000,"updatedTime":1719496301000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":1.95,"words":586},"filePathRelative":"posts/baeldung/2024-06-27/2024-06-27-HashSet toArray   Method in Java.md","localizedDate":"2024年6月27日","excerpt":"\\n<h2>1. 引言</h2>\\n<p><em>HashSet</em> 是我们可以在Java <em>Collections</em> 中使用的一种常见数据结构。</p>\\n<p><strong>在本教程中，我们将深入探讨_HashSet_类的_toArray()_方法，展示如何将_HashSet_转换为数组。</strong></p>\\n<h2>2. 将_HashSet_转换为_数组_</h2>\\n<p>让我们看一组示例，说明如何应用_toArray()_方法将_HashSet_转换为数组。</p>\\n<h3>2.1. <em>HashSet_转换为_字符串数组</em></h3>\\n<p>在以下方法中，我们试图将字符串的_HashSet_转换为字符串数组：</p>","autoDesc":true}');export{c as comp,v as data};
