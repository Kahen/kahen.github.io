import{_ as i}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as e,o as a,a as n}from"./app-C3EhKTFl.js";const t={},r=n(`<h1 id="在java中查找数组的平衡索引" tabindex="-1"><a class="header-anchor" href="#在java中查找数组的平衡索引"><span>在Java中查找数组的平衡索引</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在本教程中，我们首先学习数组平衡索引的定义。随后，我们将编写一个方法来识别和定位它们。</p><h2 id="_2-问题陈述" tabindex="-1"><a class="header-anchor" href="#_2-问题陈述"><span>2. 问题陈述</span></a></h2><p><strong>给定一个大小为N的零索引数组_A_，如果索引_i_满足左侧元素之和等于右侧元素之和，则该索引是平衡索引。</strong> 也就是说：A[0] + A[1] + … + A[i-1] = A[i+1] + A[i+2] + … + A[N-1]。特别是，对于数组的第一个和最后一个索引，其他元素的和应该是0。例如，考虑数组_{1, -3, 0, 4, -5, 4, 0, 1, -2, -1}_：</p><ul><li>1是一个平衡索引，因为A[0] = 1且A[2] + A[3] + A[4] + A[5] + A[6] + A[7] + A[8] + A[9] = 0 + 4 + (-5) + 4 + 0 + 1 + (-2) + (-1) = 1</li><li>4也是一个平衡索引，因为A[0] + A[1] + A[2] + A[3] = 1 + (-3) + 0 + 4 = 2且A[5] + A[6] + A[7] + A[8] + A[9] = 4 + 0 + 1 + (-2) + (-1) = 2</li><li>A[0] + A[1] + A[2] + A[3] + A[4] + A[5] + A[6] + A[7] + A[8] = 1 + (-3) + 0 + 4 + (-5) + 4 + 0 + 1 + (-2) = 0且没有索引大于9的元素，所以9也是这个数组的平衡索引</li><li>另一方面，5不是平衡索引，因为A[0] + A[1] + A[2] + A[3] + A[4] = 1 + (-3) + 0 + 4 + (-5) = -3，而A[6] + A[7] + A[8] + A[9] = 0 + 1 + (-2) + (-1) = -2</li></ul><h2 id="_3-算法" tabindex="-1"><a class="header-anchor" href="#_3-算法"><span>3. 算法</span></a></h2><p>让我们思考如何找到数组的平衡索引。首先想到的解决方案可能是遍历所有元素，然后计算两个和。然而，这将涉及对数组元素的内部迭代，这将损害我们算法的性能。</p><p>因此，我们最好首先计算数组的所有部分和。<strong>索引_i_处的部分和是所有索引小于或等于_i_的_A_元素的和。</strong> 我们可以通过一次对初始数组的迭代来完成这个操作。然后，我们将注意到我们可以通过部分和数组获得我们需要的两个和：</p><ul><li>如果_i=0_，则在部分和数组的索引_i-1_处找到左侧元素的和；否则为0</li><li>右侧索引元素的和等于数组的总和减去直到索引_i_的所有数组元素的和，或者用数学术语来说：A[i+1] + A[i+2] + … + A[N-1] = A[0] + A[1] + … + A[i-1] + A[i] + A[i+1] + … + A[N-1] – (A[0] + A[1] + … + A[i])。数组的总和是部分和数组在索引_N-1_处的值，第二个和是部分和数组在索引_i_处的值</li></ul><p>之后，我们将简单地遍历数组，如果两个表达式相等，就将元素添加到平衡索引列表中。因此，我们算法的复杂度是_O(N)_。</p><h2 id="_4-计算部分和" tabindex="-1"><a class="header-anchor" href="#_4-计算部分和"><span>4. 计算部分和</span></a></h2><p>除了部分和之外，0是0之前_A_元素的和。此外，0是累积和的自然起点。因此，<strong>在我们的部分和数组前面添加一个元素，值为0</strong>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>int[] partialSums = new int[array.length + 1];
partialSums[0] = 0;
for (int i=0; i\`&lt;array.length; i++) {
    partialSums[i+1] = partialSums[i] + array[i];
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>简而言之，在我们的实现中，部分和数组在索引_i+1_处包含A[0] + A[1] + … + A[i]的和。换句话说，<strong>我们的部分和数组的第_i_个值等于所有索引小于_i_的_A_元素的和</strong>。</p><h2 id="_5-列出所有平衡索引" tabindex="-1"><a class="header-anchor" href="#_5-列出所有平衡索引"><span>5. 列出所有平衡索引</span></a></h2><p><strong>现在我们可以遍历我们的初始数组，并决定给定的索引是否是平衡的</strong>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>List\`\`&lt;Integer&gt;\`\`\` equilibriumIndexes = new ArrayList\`\`&lt;Integer&gt;\`\`();
for (int i=0; i&lt;array.length; i++) {
    if (partialSums[i] == (partialSums[array.length] - (partialSums[i+1]))) {
        equilibriumIndexes.add(i);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，我们在我们的结果_List_中收集了所有符合条件项。</p><p>让我们看看我们的方法作为一个整体：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>List\`\`&lt;Integer&gt;\`\` findEquilibriumIndexes(int[] array) {
    int[] partialSums = new int[array.length + 1];
    partialSums[0] = 0;
    for (int i=0; i&lt;array.length; i++) {
        partialSums[i+1] = partialSums[i] + array[i];
    }

    List\`\`&lt;Integer&gt;\`\` equilibriumIndexes = new ArrayList\`\`&lt;Integer&gt;\`\`();
    for (int i=0; i&lt;array.length; i++) {
        if (partialSums[i] == (partialSums[array.length] - (partialSums[i+1]))) {
            equilibriumIndexes.add(i);
        }
    }
    return equilibriumIndexes;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们命名我们的类_EquilibriumIndexFinder_，我们现在可以在我们的示例数组上对我们的方法进行单元测试：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
void givenArrayHasEquilibriumIndexes_whenFindEquilibriumIndexes_thenListAllEquilibriumIndexes() {
    int[] array = {1, -3, 0, 4, -5, 4, 0, 1, -2, -1};
    assertThat(new EquilibriumIndexFinder().findEquilibriumIndexes(array)).containsExactly(1, 4, 9);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们使用了AssertJ来检查输出_List_是否包含正确的索引：我们的方法按预期工作！</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们设计并实现了一个算法来查找Java数组的所有平衡索引。数据结构不必是数组。它也可以是_List_或任何有序整数序列。</p><p>如常，代码可在GitHub上找到。</p>`,27),l=[r];function s(d,u){return a(),e("div",null,l)}const m=i(t,[["render",s],["__file","2024-06-22-Find the Equilibrium Indexes of an Array in Java.html.vue"]]),o=JSON.parse('{"path":"/posts/baeldung/2024-06-22/2024-06-22-Find%20the%20Equilibrium%20Indexes%20of%20an%20Array%20in%20Java.html","title":"在Java中查找数组的平衡索引","lang":"zh-CN","frontmatter":{"date":"2024-06-23T00:00:00.000Z","category":["Java","Algorithm"],"tag":["Equilibrium Index","Array"],"head":[["meta",{"name":"keywords","content":"Java, Algorithm, Equilibrium Index, Array"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-22/2024-06-22-Find%20the%20Equilibrium%20Indexes%20of%20an%20Array%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Java中查找数组的平衡索引"}],["meta",{"property":"og:description","content":"在Java中查找数组的平衡索引 1. 概述 在本教程中，我们首先学习数组平衡索引的定义。随后，我们将编写一个方法来识别和定位它们。 2. 问题陈述 给定一个大小为N的零索引数组_A_，如果索引_i_满足左侧元素之和等于右侧元素之和，则该索引是平衡索引。 也就是说：A[0] + A[1] + … + A[i-1] = A[i+1] + A[i+2] + ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-22T20:49:38.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Equilibrium Index"}],["meta",{"property":"article:tag","content":"Array"}],["meta",{"property":"article:published_time","content":"2024-06-23T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-22T20:49:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Java中查找数组的平衡索引\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-23T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-22T20:49:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Java中查找数组的平衡索引 1. 概述 在本教程中，我们首先学习数组平衡索引的定义。随后，我们将编写一个方法来识别和定位它们。 2. 问题陈述 给定一个大小为N的零索引数组_A_，如果索引_i_满足左侧元素之和等于右侧元素之和，则该索引是平衡索引。 也就是说：A[0] + A[1] + … + A[i-1] = A[i+1] + A[i+2] + ..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 问题陈述","slug":"_2-问题陈述","link":"#_2-问题陈述","children":[]},{"level":2,"title":"3. 算法","slug":"_3-算法","link":"#_3-算法","children":[]},{"level":2,"title":"4. 计算部分和","slug":"_4-计算部分和","link":"#_4-计算部分和","children":[]},{"level":2,"title":"5. 列出所有平衡索引","slug":"_5-列出所有平衡索引","link":"#_5-列出所有平衡索引","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1719089378000,"updatedTime":1719089378000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.93,"words":1178},"filePathRelative":"posts/baeldung/2024-06-22/2024-06-22-Find the Equilibrium Indexes of an Array in Java.md","localizedDate":"2024年6月23日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>在本教程中，我们首先学习数组平衡索引的定义。随后，我们将编写一个方法来识别和定位它们。</p>\\n<h2>2. 问题陈述</h2>\\n<p><strong>给定一个大小为N的零索引数组_A_，如果索引_i_满足左侧元素之和等于右侧元素之和，则该索引是平衡索引。</strong> 也就是说：A[0] + A[1] + … + A[i-1] = A[i+1] + A[i+2] + … + A[N-1]。特别是，对于数组的第一个和最后一个索引，其他元素的和应该是0。例如，考虑数组_{1, -3, 0, 4, -5, 4, 0, 1, -2, -1}_：</p>\\n<ul>\\n<li>1是一个平衡索引，因为A[0] = 1且A[2] + A[3] + A[4] + A[5] + A[6] + A[7] + A[8] + A[9] = 0 + 4 + (-5) + 4 + 0 + 1 + (-2) + (-1) = 1</li>\\n<li>4也是一个平衡索引，因为A[0] + A[1] + A[2] + A[3] = 1 + (-3) + 0 + 4 = 2且A[5] + A[6] + A[7] + A[8] + A[9] = 4 + 0 + 1 + (-2) + (-1) = 2</li>\\n<li>A[0] + A[1] + A[2] + A[3] + A[4] + A[5] + A[6] + A[7] + A[8] = 1 + (-3) + 0 + 4 + (-5) + 4 + 0 + 1 + (-2) = 0且没有索引大于9的元素，所以9也是这个数组的平衡索引</li>\\n<li>另一方面，5不是平衡索引，因为A[0] + A[1] + A[2] + A[3] + A[4] = 1 + (-3) + 0 + 4 + (-5) = -3，而A[6] + A[7] + A[8] + A[9] = 0 + 1 + (-2) + (-1) = -2</li>\\n</ul>","autoDesc":true}');export{m as comp,o as data};
