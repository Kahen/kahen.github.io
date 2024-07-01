import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as a,a as i}from"./app-A4MjTl5e.js";const t={},s=i(`<h1 id="java中将数组中的零移动到末尾的方法-baeldung" tabindex="-1"><a class="header-anchor" href="#java中将数组中的零移动到末尾的方法-baeldung"><span>Java中将数组中的零移动到末尾的方法 | Baeldung</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在Java中使用数组时，一个常见的任务是重新排列数组以优化它们的结构。其中一种场景涉及将零移动到数组的末尾。</p><p>在本教程中，我们将探索使用Java实现此任务的不同方法。</p><h2 id="_2-问题介绍" tabindex="-1"><a class="header-anchor" href="#_2-问题介绍"><span>2. 问题介绍</span></a></h2><p>在我们深入实现之前，首先让我们理解这个问题的要求。</p><p>我们的输入是一个整数数组。我们的目标是重新排列整数，以便<strong>所有零都被移动到数组的末尾</strong>。此外，<strong>非零元素的顺序必须保持不变</strong>。</p><p>一个例子可以帮助我们快速理解问题。假设我们给定一个整数数组：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>[42, 2, 0, 3, 4, 0]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>重新排列其元素后，我们期望获得如下结果的数组：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>static final int[] EXPECTED = new int[] {42, 2, 3, 4, 0, 0};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>接下来，我们将介绍两种解决问题的方法。我们还将简要讨论它们的性能特性。</p><h2 id="_3-使用额外的数组" tabindex="-1"><a class="header-anchor" href="#_3-使用额外的数组"><span>3. 使用额外的数组</span></a></h2><p>解决问题的第一个想法可能是使用一个额外的数组。</p><p>假设我们创建一个新的数组并称之为_result_。这个数组初始化为<strong>与输入数组相同的长度</strong>，并且<strong>所有元素都设置为零</strong>。</p><p>接下来，我们遍历输入数组。<strong>每当遇到非零数字时，我们就相应地更新_result_数组中的对应元素</strong>。</p><p>让我们实现这个想法：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>int[] array = new int[] {42, 2, 0, 3, 4, 0};
int[] result = new int[array.length];
int idx = 0;
for (int n : array) {
    if (n != 0) {
        result[idx++] = n;
    }
}
assertArrayEquals(EXPECTED, result);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如我们所见，代码非常直接。有两件事值得一提：</p><ul><li>在Java中，<strong>int[]数组使用零作为元素的默认值</strong>。因此，当我们初始化_result_数组时，我们不需要显式地用零填充它。</li><li>当我们在测试中断言两个数组的等同时，<strong>我们应该使用assertArrayEquals()而不是assertEquals()</strong>。</li></ul><p>在这种解决方案中，我们只遍历输入数组一次。因此，<strong>这种方法具有线性时间复杂度：O(n)</strong>。然而，由于它复制了输入数组，<strong>其空间复杂度是O(n)</strong>。</p><p>接下来，让我们探讨如何改进这个解决方案，以实现原地排列，以保持恒定的空间复杂度O(1)。</p><h2 id="_4-具有线性时间复杂度的原地排列" tabindex="-1"><a class="header-anchor" href="#_4-具有线性时间复杂度的原地排列"><span>4. 具有线性时间复杂度的原地排列</span></a></h2><p>让我们重新审视“初始化新数组”的方法。我们维持了一个**非零指针(<em>idx</em>)**在新数组上，以便我们知道一旦在原始数组中检测到非零值，需要更新_result_数组中的哪个元素。</p><p>实际上，我们可以在输入数组上设置非零指针。这样，当我们迭代输入数组时，<strong>我们可以将非零元素移动到前面，保持它们的相对顺序</strong>。完成迭代后，我们将<strong>用零填充剩余的位置</strong>。</p><p>让我们以输入数组为例来理解这个算法是如何工作的：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>迭代指针: v
非零指针: ^
v
42, 2, 0, 3, 4, 0
^（用42替换42）

    v
42, 2, 0, 3, 4, 0
    ^（用2替换2）

       v
42, 2, 0, 3, 4, 0
    ^
          v
42, 2, 3, 3, 4, 0
      ^（用3替换0）

             v
42, 2, 3, 4, 4, 0
         ^（用4替换3）

                v
42, 2, 3, 4, 4, 0
     ^
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后一步：用0填充剩余的位置：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>42, 2, 3, 4, 0, 0
    ^
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们实现这个逻辑：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>int[] array = new int[] {42, 2, 0, 3, 4, 0};
int idx = 0;
for (int n : array) {
    if (n != 0) {
        array[idx++] = n;
    }
}
while (idx &lt; array.length) {
    array[idx++] = 0;
}
assertArrayEquals(EXPECTED, array);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如我们所见，<strong>上述代码中没有引入额外的数组</strong>。非零指针_idx_跟踪非零元素应该放置的位置。在迭代过程中，如果当前元素是非零的，我们将其移动到前面并增加指针。完成迭代后，我们使用_while_循环用零填充剩余的位置。</p><p>这种方法执行了原地重新排列。也就是说，不需要额外的空间。因此，它的<strong>空间复杂度是O(1)</strong>。</p><p>在最坏的情况下，如果<strong>输入数组中的所有元素都是零</strong>，那么_idx_指针在迭代后将保持静止。因此，随后的_while_循环将再次遍历整个数组。尽管如此，<strong>由于迭代执行的次数是固定的，整体时间复杂度仍然保持在O(n)</strong>。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们探讨了两种将整数数组中的零重新定位到末尾的方法。此外，我们还讨论了它们在时间和空间复杂度方面的性能。</p><p>如常，示例的完整源代码可在GitHub上找到。</p><p>OK</p>`,38),r=[s];function l(d,o){return a(),n("div",null,r)}const p=e(t,[["render",l],["__file","2024-06-22-Moves Zeros to the End of an Array in Java.html.vue"]]),u=JSON.parse('{"path":"/posts/baeldung/2024-06-22/2024-06-22-Moves%20Zeros%20to%20the%20End%20of%20an%20Array%20in%20Java.html","title":"Java中将数组中的零移动到末尾的方法 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-06-22T00:00:00.000Z","category":["Java","Arrays"],"tag":["Algorithm","Tutorial"],"head":[["meta",{"name":"keywords","content":"Java, Arrays, Zeros, Algorithm, Tutorial"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-22/2024-06-22-Moves%20Zeros%20to%20the%20End%20of%20an%20Array%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中将数组中的零移动到末尾的方法 | Baeldung"}],["meta",{"property":"og:description","content":"Java中将数组中的零移动到末尾的方法 | Baeldung 1. 概述 在Java中使用数组时，一个常见的任务是重新排列数组以优化它们的结构。其中一种场景涉及将零移动到数组的末尾。 在本教程中，我们将探索使用Java实现此任务的不同方法。 2. 问题介绍 在我们深入实现之前，首先让我们理解这个问题的要求。 我们的输入是一个整数数组。我们的目标是重新排..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-22T13:49:24.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Algorithm"}],["meta",{"property":"article:tag","content":"Tutorial"}],["meta",{"property":"article:published_time","content":"2024-06-22T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-22T13:49:24.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中将数组中的零移动到末尾的方法 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-22T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-22T13:49:24.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中将数组中的零移动到末尾的方法 | Baeldung 1. 概述 在Java中使用数组时，一个常见的任务是重新排列数组以优化它们的结构。其中一种场景涉及将零移动到数组的末尾。 在本教程中，我们将探索使用Java实现此任务的不同方法。 2. 问题介绍 在我们深入实现之前，首先让我们理解这个问题的要求。 我们的输入是一个整数数组。我们的目标是重新排..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 问题介绍","slug":"_2-问题介绍","link":"#_2-问题介绍","children":[]},{"level":2,"title":"3. 使用额外的数组","slug":"_3-使用额外的数组","link":"#_3-使用额外的数组","children":[]},{"level":2,"title":"4. 具有线性时间复杂度的原地排列","slug":"_4-具有线性时间复杂度的原地排列","link":"#_4-具有线性时间复杂度的原地排列","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1719064164000,"updatedTime":1719064164000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.07,"words":1220},"filePathRelative":"posts/baeldung/2024-06-22/2024-06-22-Moves Zeros to the End of an Array in Java.md","localizedDate":"2024年6月22日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>在Java中使用数组时，一个常见的任务是重新排列数组以优化它们的结构。其中一种场景涉及将零移动到数组的末尾。</p>\\n<p>在本教程中，我们将探索使用Java实现此任务的不同方法。</p>\\n<h2>2. 问题介绍</h2>\\n<p>在我们深入实现之前，首先让我们理解这个问题的要求。</p>\\n<p>我们的输入是一个整数数组。我们的目标是重新排列整数，以便<strong>所有零都被移动到数组的末尾</strong>。此外，<strong>非零元素的顺序必须保持不变</strong>。</p>\\n<p>一个例子可以帮助我们快速理解问题。假设我们给定一个整数数组：</p>","autoDesc":true}');export{p as comp,u as data};
