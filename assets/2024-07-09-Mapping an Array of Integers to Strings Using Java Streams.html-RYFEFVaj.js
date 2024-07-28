import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as n,a as r}from"./app-DzJ3ruqA.js";const a={},i=r(`<hr><h1 id="使用java-streams将整数数组映射为字符串" tabindex="-1"><a class="header-anchor" href="#使用java-streams将整数数组映射为字符串"><span>使用Java Streams将整数数组映射为字符串</span></a></h1><p>在本教程中，我们将探讨如何使用Java Streams将整数数组转换为字符串数组。我们将比较根据我们拥有的是Integer数组还是原始int值所需要采取的不同方法。对于Integer，我们将使用Stream<code>&lt;Integer&gt;</code>和Integer从Object继承的方法进行转换。对于int，我们将使用专门的IntStream。</p><h3 id="_2-从数组创建stream" tabindex="-1"><a class="header-anchor" href="#_2-从数组创建stream"><span>2. 从数组创建Stream</span></a></h3><p>让我们从将数组转换为Stream开始。这里我们可以为Integer和原始整数使用相同的方法，但返回类型会有所不同。如果我们有一个Integer数组，我们将得到一个Stream<code>&lt;Integer&gt;</code>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Integer[] integerArray = { 1, 2, 3, 4, 5 };
Stream\`\`\`\`\`\`&lt;Integer&gt;\`\`\`\`\`\` integerStream = Arrays.stream(integerArray);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们从原始整数数组开始，我们将得到一个IntStream：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>int[] intArray = { 1, 2, 3, 4, 5 };
IntStream intStream = Arrays.stream(intArray);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>IntStream为我们提供了自己的一套方法，我们稍后将用于类型转换。</p><h3 id="_3-从integer转换" tabindex="-1"><a class="header-anchor" href="#_3-从integer转换"><span>3. 从Integer转换</span></a></h3><p>有了Stream<code>&lt;Integer&gt;</code>，我们可以继续将Integer转换为String。由于Integer提供了所有来自Object的方法，我们可以使用Object.toString()以及map()：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>String[] convertToStringArray(Integer[] input) {
    return Arrays.stream(input)
      .map(Object::toString)
      .toArray(String[]::new);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后我们使用convertToStringArray()将Integer数组转换，并确认返回的String数组看起来符合我们的预期：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
void whenConvertingIntegers_thenHandleStreamOfIntegers() {
    Integer[] integerNumbers = { 1, 2, 3, 4, 5 };
    String[] expectedOutput = { &quot;1&quot;, &quot;2&quot;, &quot;3&quot;, &quot;4&quot;, &quot;5&quot; };

    String[] strings = convertToStringArray(integerNumbers);

    Assert.assertArrayEquals(expectedOutput, strings);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-从原始整数转换" tabindex="-1"><a class="header-anchor" href="#_4-从原始整数转换"><span>4. 从原始整数转换</span></a></h3><p>现在让我们看看如何处理由整数数组开始得到的IntStream。</p><h4 id="_4-1-返回数组" tabindex="-1"><a class="header-anchor" href="#_4-1-返回数组"><span>4.1. 返回数组</span></a></h4><p>有了IntStream，我们可以使用IntStream.mapToObj()进行转换：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>String[] convertToStringArray(int[] input) {
    return Arrays.stream(input)
      .mapToObj(Integer::toString)
      .toArray(String[]::new);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>mapToObj()方法返回一个对象值的Stream，使用我们给它的Integer.toString()方法。因此，在我们的方法的这个阶段之后，我们有一个Stream<code>&lt;String&gt;</code>可以处理，我们可以使用toArray()简单地收集内容。</p><p>然后我们可以再次检查使用convertToStringArray()是否给我们一个与输入整数数组匹配的String数组：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
void whenConvertingInts_thenHandleIntStream() {
    int[] intNumbers = { 1, 2, 3, 4, 5 };
    String[] expectedOutput = { &quot;1&quot;, &quot;2&quot;, &quot;3&quot;, &quot;4&quot;, &quot;5&quot; };

    String[] strings = convertToStringArray(intNumbers);

    Assert.assertArrayEquals(expectedOutput, strings);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此外，如果我们想在Stream中使用任何Integer类型的好处，我们可以使用boxed()：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>String[] convertToStringArrayWithBoxing(int[] input) {
    return Arrays.stream(input)
      .boxed()
      .map(Object::toString)
      .toArray(String[]::new);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_4-2-返回单个string" tabindex="-1"><a class="header-anchor" href="#_4-2-返回单个string"><span>4.2. 返回单个String</span></a></h4><p>另一个潜在的用例是将整数数组转换为单个String。我们可以重用上述大部分代码，并使用Stream.collect()将Stream减少为一个String。collect()方法非常灵活，让我们可以将Stream终止为多种类型。在这里，我们将传递Collectors.joining(&quot;, &quot;)，以便数组中的每个元素都将被连接成一个单独的String，元素之间用逗号分隔：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>String convertToString(int[] input){
    return Arrays.stream(input)
      .mapToObj(Integer::toString)
      .collect(Collectors.joining(&quot;, &quot;));
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后我们可以测试返回的String看起来是否符合我们的预期：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
void givenAnIntArray_whenUsingCollectorsJoining_thenReturnCommaSeparatedString(){
    int[] intNumbers = { 1, 2, 3, 4, 5 };
    String expectedOutput = &quot;1, 2, 3, 4, 5&quot;;

    String string = convertToString(intNumbers);

    Assert.assertEquals(expectedOutput, string);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h3><p>在本文中，我们学习了如何使用Java Streams将Integer数组或原始整数数组转换为String数组。我们了解到，处理Integer时，我们需要预期一个Stream<code>&lt;Integer&gt;</code>。但是，当我们处理原始整数时，我们预期一个IntStream。</p><p>然后我们看到了如何处理两种Stream类型以最终得到一个String数组。map()方法可以用于Stream<code>&lt;Integer&gt;</code>，mapToObj()用于IntStream。最后，我们看到了如何使用Collectors.joining()返回一个单独的String。</p><p>如往常一样，示例的完整代码可在GitHub上找到。</p>`,33),s=[i];function d(l,o){return n(),t("div",null,s)}const g=e(a,[["render",d],["__file","2024-07-09-Mapping an Array of Integers to Strings Using Java Streams.html.vue"]]),v=JSON.parse('{"path":"/posts/baeldung/2024-07-09/2024-07-09-Mapping%20an%20Array%20of%20Integers%20to%20Strings%20Using%20Java%20Streams.html","title":"使用Java Streams将整数数组映射为字符串","lang":"zh-CN","frontmatter":{"category":["Java","Streams"],"tag":["Java","Stream","Integer","String"],"head":[["meta",{"name":"keywords","content":"Java, Stream, Integer, String, Arrays, Conversion"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-09/2024-07-09-Mapping%20an%20Array%20of%20Integers%20to%20Strings%20Using%20Java%20Streams.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用Java Streams将整数数组映射为字符串"}],["meta",{"property":"og:description","content":"使用Java Streams将整数数组映射为字符串 在本教程中，我们将探讨如何使用Java Streams将整数数组转换为字符串数组。我们将比较根据我们拥有的是Integer数组还是原始int值所需要采取的不同方法。对于Integer，我们将使用Stream<Integer>和Integer从Object继承的方法进行转换。对于int，我们将使用专门的..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-09T06:00:08.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Stream"}],["meta",{"property":"article:tag","content":"Integer"}],["meta",{"property":"article:tag","content":"String"}],["meta",{"property":"article:modified_time","content":"2024-07-09T06:00:08.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用Java Streams将整数数组映射为字符串\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-07-09T06:00:08.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用Java Streams将整数数组映射为字符串 在本教程中，我们将探讨如何使用Java Streams将整数数组转换为字符串数组。我们将比较根据我们拥有的是Integer数组还是原始int值所需要采取的不同方法。对于Integer，我们将使用Stream<Integer>和Integer从Object继承的方法进行转换。对于int，我们将使用专门的..."},"headers":[{"level":3,"title":"2. 从数组创建Stream","slug":"_2-从数组创建stream","link":"#_2-从数组创建stream","children":[]},{"level":3,"title":"3. 从Integer转换","slug":"_3-从integer转换","link":"#_3-从integer转换","children":[]},{"level":3,"title":"4. 从原始整数转换","slug":"_4-从原始整数转换","link":"#_4-从原始整数转换","children":[]},{"level":3,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720504808000,"updatedTime":1720504808000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.1,"words":930},"filePathRelative":"posts/baeldung/2024-07-09/2024-07-09-Mapping an Array of Integers to Strings Using Java Streams.md","localizedDate":"2024年7月9日","excerpt":"<hr>\\n<h1>使用Java Streams将整数数组映射为字符串</h1>\\n<p>在本教程中，我们将探讨如何使用Java Streams将整数数组转换为字符串数组。我们将比较根据我们拥有的是Integer数组还是原始int值所需要采取的不同方法。对于Integer，我们将使用Stream<code>&lt;Integer&gt;</code>和Integer从Object继承的方法进行转换。对于int，我们将使用专门的IntStream。</p>\\n<h3>2. 从数组创建Stream</h3>\\n<p>让我们从将数组转换为Stream开始。这里我们可以为Integer和原始整数使用相同的方法，但返回类型会有所不同。如果我们有一个Integer数组，我们将得到一个Stream<code>&lt;Integer&gt;</code>：</p>","autoDesc":true}');export{g as comp,v as data};
