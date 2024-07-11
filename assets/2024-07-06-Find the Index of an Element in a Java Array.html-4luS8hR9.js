import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as a,a as t}from"./app-bN4DcMMr.js";const i={},r=t(`<h1 id="在java数组中查找元素的索引" tabindex="-1"><a class="header-anchor" href="#在java数组中查找元素的索引"><span>在Java数组中查找元素的索引</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在本教程中，我们将讨论使用Java内置API和第三方库，通过代码示例查找数组元素索引的多种方法。这对于搜索、排序和修改数组等许多任务都非常有用。</p><h2 id="_2-使用-for-循环" tabindex="-1"><a class="header-anchor" href="#_2-使用-for-循环"><span>2. 使用_for_循环</span></a></h2><p>我们的第一个方法是使用_for_循环来查找数组中元素的索引，这是最简单的方法之一。</p><p><strong>基本思想是遍历输入数组并在每次迭代中检查元素。</strong> <strong>如果找到了元素，我们就返回当前索引。</strong></p><p>否则，如果我们在数组的末尾找不到元素，我们返回一个固定的常量值。这个固定值可以是任何我们事先知道的东西。我们使用它来表示元素在数组中未找到。</p><p>这些固定常量值的示例包括_-1_、<em>Integer.MAX_VALUE</em>、_Integer.MIN_VALUE_等。</p><p>首先，让我们使用这种方法创建一个简单的方法：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>int forLoop(int[] numbers, int target) {
    for (int index = 0; index \`&lt; numbers.length; index++) {
        if (numbers[index] == target) {
            return index;
        }
    }
    return -1;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们遍历输入的_numbers_数组，然后检查每个元素。如果我们找到匹配项，我们返回当前的_index_值。否则，我们返回_-1_，表示我们找不到_target_。</p><p>现在让我们用一些示例输入数据测试我们的_forLoop()_方法：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
void givenIntegerArray_whenUseForLoop_thenWillGetElementIndex() {
    int[] numbers = { 10, 20, 30, 40, 50 };
    assertEquals(2, forLoop(numbers, 30));
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们正在寻找值_30_。_forLoop()<em>方法返回_2</em>，这是输入数组中的位置。我们必须记住Java中数组的起始索引是零。</p><p>接下来，让我们寻找一个不在输入数组中的元素：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
void givenIntegerArray_whenUseForLoop_thenWillGetElementMinusOneIndex() {
    int[] numbers = { 10, 20, 30, 40, 50 };
    assertEquals(-1, forLoop(numbers, 100));
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这种情况下，我们尝试搜索数字_100_。然而，它不在我们的数组中。这就是为什么我们的方法返回_-1_，表示元素未找到。</p><h2 id="_3-使用-list-indexof" tabindex="-1"><a class="header-anchor" href="#_3-使用-list-indexof"><span>3. 使用_List_indexOf()</span></a></h2><p>我们将使用_List_类的_indexOf()_方法作为下一个方法：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>static int listIndexOf(Integer[] numbers, int target) {
    List&lt;Integer&gt;\` list = Arrays.asList(numbers);
    return list.indexOf(target);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在我们的_listIndexOf()_方法中，我们传递一个_Integer_数组和一个目标值作为参数。在内部，我们使用_Arrays_工具类的_asList()<em>方法。这个方法将对象数组转换为相同对象类型的_List</em>。值得注意的是，_asList()_方法没有为原始类型实现。</p><p>将输入数组转换为列表后，我们使用_indexOf()<em>方法找到我们目标元素的索引。如果目标元素不在列表中，那么_indexOf()<em>方法返回</em>-1</em>。</p><p>现在，让我们实现几个测试用例。在第一个测试用例中，目标将在输入数组中：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
void givenIntegerArray_whenUseIndexOf_thenWillGetElementIndex() {
    Integer[] numbers = { 10, 20, 30, 40, 50 };
    assertEquals(2, listIndexOf(numbers, 30));
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当我们调用我们的_listIndexOf()<em>方法时，我们得到索引_2</em>，这是输入数组中目标数字_30_的位置。</p><p>在第二个测试用例中，目标元素不在输入数组中：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
void givenIntegerArray_whenUseIndexOf_thenWillGetElementMinusOneIndex() {
    Integer[] numbers = { 10, 20, 30, 40, 50 };
    assertEquals(-1, listIndexOf(numbers, 100));
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这种情况下，我们得到了预期的结果，<em>-1</em>。</p><h2 id="_4-使用-arrays-binarysearch" tabindex="-1"><a class="header-anchor" href="#_4-使用-arrays-binarysearch"><span>4. 使用_Arrays_ binarySearch()</span></a></h2><p>_Arrays_工具类的另一个有用方法是_binarySearch()_方法。<strong>这个方法执行二分搜索算法。</strong> <strong>在使用这个方法之前，输入数组必须先排序。</strong> 我们可以使用_binarySearch()_方法在排序数组中查找元素的索引。</p><p>让我们使用_binarySearch()_方法实现一些测试：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
void givenIntegerArray_whenUseBinarySearch_thenWillGetElementIndex() {
    int[] numbers = { 10, 20, 30, 40, 50 };
    assertEquals(2, Arrays.binarySearch(numbers, 30));
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上述代码中，使用_binarySearch()<em>方法，如果找到了目标元素，方法将返回其索引号。在这种情况下，我们得到了索引_2</em>。</p><p>然而，如果目标没有找到，方法将返回一个负值。根据Java中_binarySearch()<em>方法的官方文档，这个负值是通过一个插入点来计算的。插入点是键应该在数组中的位置。它的值是数组中第一个大于键的元素的索引，或者是如果数组中的所有元素都小于键，则为_arr.length</em>。元素不在数组中的索引等于_(-(插入点)-1)_。</p><p>让我们实现一些关于这个负值的测试：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
void givenIntegerArray_whenUseBinarySearch_thenWillGetUpperBoundMinusIndex() {
    int[] numbers = { 10, 20, 30, 40, 50 };
    assertEquals(-6, Arrays.binarySearch(numbers, 100));
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于_100_不在数组中，方法返回了一个负值。在这种情况下，返回的值是_-6_。这是因为数组中的所有元素都小于我们的_target_值。然后，插入点是_5_（数组长度），得到的索引是_(-5-1)<em>，即</em>-6_。</p><p>另一个案例是当目标元素值在数组的上下界值之间时：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
void givenIntegerArray_whenUseBinarySearch_thenWillGetInArrayMinusIndex() {
    int[] numbers = { 10, 20, 30, 40, 50 };
    assertEquals(-2, Arrays.binarySearch(numbers, 15));
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的测试用例中，由于15是在10和50之间的值，这个数组的边界值，我们得到了索引值_-2_。我们得到这个值是因为插入点是_1_。因此，得到的索引是_(-1-1)<em>或</em>-2_。</p><p>这个方法的最后一个案例是当目标值不存在并且小于数组中的最小值时：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
void givenIntegerArray_whenUseBinarySearch_thenWillGetLowerBoundMinusIndex() {
    int[] numbers = { 10, 20, 30, 40, 50 };
    assertEquals(-1, Arrays.binarySearch(numbers, -15));
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这种情况下，我们得到了_-1_，因为我们的目标值小于数组中的最小值。</p><h2 id="_5-使用-intstream" tabindex="-1"><a class="header-anchor" href="#_5-使用-intstream"><span>5. 使用_IntStream_</span></a></h2><p>在接下来的测试代码中，我们将使用_IntStream_接口。这个接口是在Java 8中引入的。从_IntStream_接口，我们将使用_range()_方法。_range()<em>方法产生一个从0（包括）到_arr.length</em>（不包括）的有序整数流。</p><p>首先，我们将使用_IntStream.range()_实现一个方法来遍历输入数组：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>static int intStream(int[] numbers, int target) {
    return IntStream.range(0, numbers.length)
      .filter(i -&gt; numbers[i] == target)
      .findFirst()
      .orElse(-1);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由_range()<em>方法产生的整数代表_numbers_数组的索引。然后_filter()<em>方法检查索引_i_处的元素是否等于目标值。如果目标元素不在数组中，那么_orElse()<em>返回</em>-1</em>。最后，使用_findFirst(</em>)，我们得到第一个等于目标值的元素。</p><p>使用我们的_intStream()_方法，我们可以实施下一个测试用例：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
void givenIntegerArray_whenUseIntStream_thenWillGetElementIndex() {
    int[] numbers = { 10, 20, 30, 40, 50 };
    assertEquals(2, intStream(numbers, 30));
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在我们的测试代码中，我们调用我们实现的_intStream()<em>方法，我们得到了目标元素放置的索引。如果目标元素不在数组中，那么我们将得到</em>-1_。</p><h2 id="_6-apache-commons库" tabindex="-1"><a class="header-anchor" href="#_6-apache-commons库"><span>6. Apache Commons库</span></a></h2><p>到目前为止，我们已经查看了我们可以用来在数组中查找元素索引的大多数内置Java API。然而，还有一些第三方库我们可以使用。一个有用的第三方库是Apache Commons Lang 3。在我们实现测试用例之前，我们需要将Apache Commons Lang依赖项添加到我们的_pom.xml_文件中：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>\`&lt;dependency&gt;\`
    \`&lt;groupId&gt;\`org.apache.commons\`&lt;/groupId&gt;\`
    \`&lt;artifactId&gt;\`commons-lang3\`&lt;/artifactId&gt;\`
    \`&lt;version&gt;\`3.12.0\`&lt;/version&gt;\`
\`&lt;/dependency&gt;\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在我们的测试用例中，我们使用_ArrayUtils_类的_indexOf()_方法。这个方法接收一个</p>`,55),s=[r];function d(l,m){return a(),n("div",null,s)}const o=e(i,[["render",d],["__file","2024-07-06-Find the Index of an Element in a Java Array.html.vue"]]),u=JSON.parse('{"path":"/posts/baeldung/2024-07-06/2024-07-06-Find%20the%20Index%20of%20an%20Element%20in%20a%20Java%20Array.html","title":"在Java数组中查找元素的索引","lang":"zh-CN","frontmatter":{"date":"2024-07-06T00:00:00.000Z","category":["Java","编程"],"tag":["数组","索引","Java 8"],"head":[["meta",{"name":"keywords","content":"Java 数组, 索引查找, 性能比较"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-06/2024-07-06-Find%20the%20Index%20of%20an%20Element%20in%20a%20Java%20Array.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Java数组中查找元素的索引"}],["meta",{"property":"og:description","content":"在Java数组中查找元素的索引 1. 概述 在本教程中，我们将讨论使用Java内置API和第三方库，通过代码示例查找数组元素索引的多种方法。这对于搜索、排序和修改数组等许多任务都非常有用。 2. 使用_for_循环 我们的第一个方法是使用_for_循环来查找数组中元素的索引，这是最简单的方法之一。 基本思想是遍历输入数组并在每次迭代中检查元素。 如果找..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-06T09:58:33.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"数组"}],["meta",{"property":"article:tag","content":"索引"}],["meta",{"property":"article:tag","content":"Java 8"}],["meta",{"property":"article:published_time","content":"2024-07-06T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-06T09:58:33.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Java数组中查找元素的索引\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-06T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-06T09:58:33.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Java数组中查找元素的索引 1. 概述 在本教程中，我们将讨论使用Java内置API和第三方库，通过代码示例查找数组元素索引的多种方法。这对于搜索、排序和修改数组等许多任务都非常有用。 2. 使用_for_循环 我们的第一个方法是使用_for_循环来查找数组中元素的索引，这是最简单的方法之一。 基本思想是遍历输入数组并在每次迭代中检查元素。 如果找..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 使用_for_循环","slug":"_2-使用-for-循环","link":"#_2-使用-for-循环","children":[]},{"level":2,"title":"3. 使用_List_indexOf()","slug":"_3-使用-list-indexof","link":"#_3-使用-list-indexof","children":[]},{"level":2,"title":"4. 使用_Arrays_ binarySearch()","slug":"_4-使用-arrays-binarysearch","link":"#_4-使用-arrays-binarysearch","children":[]},{"level":2,"title":"5. 使用_IntStream_","slug":"_5-使用-intstream","link":"#_5-使用-intstream","children":[]},{"level":2,"title":"6. Apache Commons库","slug":"_6-apache-commons库","link":"#_6-apache-commons库","children":[]}],"git":{"createdTime":1720259913000,"updatedTime":1720259913000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":6.05,"words":1816},"filePathRelative":"posts/baeldung/2024-07-06/2024-07-06-Find the Index of an Element in a Java Array.md","localizedDate":"2024年7月6日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>在本教程中，我们将讨论使用Java内置API和第三方库，通过代码示例查找数组元素索引的多种方法。这对于搜索、排序和修改数组等许多任务都非常有用。</p>\\n<h2>2. 使用_for_循环</h2>\\n<p>我们的第一个方法是使用_for_循环来查找数组中元素的索引，这是最简单的方法之一。</p>\\n<p><strong>基本思想是遍历输入数组并在每次迭代中检查元素。</strong> <strong>如果找到了元素，我们就返回当前索引。</strong></p>\\n<p>否则，如果我们在数组的末尾找不到元素，我们返回一个固定的常量值。这个固定值可以是任何我们事先知道的东西。我们使用它来表示元素在数组中未找到。</p>","autoDesc":true}');export{o as comp,u as data};
