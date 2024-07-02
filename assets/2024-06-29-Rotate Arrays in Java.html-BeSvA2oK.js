import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as t,a as e}from"./app-B3tK_ksD.js";const s={},p=e(`<h1 id="java中旋转数组的方法-baeldung" tabindex="-1"><a class="header-anchor" href="#java中旋转数组的方法-baeldung"><span>Java中旋转数组的方法 | Baeldung</span></a></h1><p>在这篇教程中，我们将学习一些在Java中旋转数组的算法。</p><p>我们将看到如何将数组元素向右旋转_k_次。我们还将了解如何就地修改数组，尽管我们可能会使用额外的空间来计算旋转。</p><h3 id="_2-1-找到最小的旋转数" tabindex="-1"><a class="header-anchor" href="#_2-1-找到最小的旋转数"><span>2.1. 找到最小的旋转数</span></a></h3><p>我们将使用字母_k_作为旋转数的别名。</p><h3 id="_2-2-单元测试" tabindex="-1"><a class="header-anchor" href="#_2-2-单元测试"><span>2.2. 单元测试</span></a></h3><p>我们可能想要测试_k_小于、等于和大于数组长度的情况。例如，如果我们将一个6个元素的数组旋转8次，我们只需要进行2次旋转。</p><h3 id="_2-3-数组和旋转测试变量" tabindex="-1"><a class="header-anchor" href="#_2-3-数组和旋转测试变量"><span>2.3. 数组和旋转测试变量</span></a></h3><p>我们将设置以下变量：</p><ul><li><em>arr</em> 作为测试长度为_6_的数组</li><li><em>rotationLtArrayLength</em> = <em>1</em> 作为小于数组长度的旋转</li><li><em>rotationGtArrayLength</em> = <em>8</em> 作为大于数组长度的旋转</li><li><em>ltArrayLengthRotation</em> 作为_rotationLtArrayLength_的解决方案</li><li><em>gtArrayLengthRotation</em> 作为_rotationGtArrayLength_的解决方案</li></ul><p>让我们看看它们的初始值：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arr <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> rotationLtArrayLength <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> rotationGtArrayLength <span class="token operator">=</span> arr<span class="token punctuation">.</span>length <span class="token operator">+</span> <span class="token number">2</span><span class="token punctuation">;</span>
<span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> ltArrayLengthRotation <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> gtArrayLengthRotation <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-4-空间和时间复杂度" tabindex="-1"><a class="header-anchor" href="#_2-4-空间和时间复杂度"><span>2.4. 空间和时间复杂度</span></a></h3><p>尽管如此，我们必须对时间和空间复杂度的概念有信心，以理解算法解决方案。</p><h3 id="_3-暴力法" tabindex="-1"><a class="header-anchor" href="#_3-暴力法"><span>3. 暴力法</span></a></h3><p>尝试用暴力法解决问题是一种常见的方法。这可能不是最有效的解决方案。然而，它有助于理解问题空间。</p><h3 id="_4-使用额外数组" tabindex="-1"><a class="header-anchor" href="#_4-使用额外数组"><span>4. 使用额外数组</span></a></h3><p>我们将使用额外的数组来放置每个元素在其正确的位置。然后，我们将复制回原始数组。</p><h3 id="_5-循环替换" tabindex="-1"><a class="header-anchor" href="#_5-循环替换"><span>5. 循环替换</span></a></h3><p>我们可以每次将元素替换为其所需位置。但是，我们会丢失原始值。因此，我们将在临时变量中存储它。</p><h3 id="_6-反转" tabindex="-1"><a class="header-anchor" href="#_6-反转"><span>6. 反转</span></a></h3><p>这是一个简单但非平凡的算法。当我们旋转时，我们可能会注意到数组后面的_k_个元素来到前面，而前面的其余元素向后移动。</p><h3 id="_7-结论" tabindex="-1"><a class="header-anchor" href="#_7-结论"><span>7. 结论</span></a></h3><p>在这篇文章中，我们看到了如何通过_k_次旋转来旋转数组。我们从暴力法开始，然后转向更复杂的算法，如反转或循环替换，无需额外空间。我们还讨论了时间和空间复杂度。最后，我们讨论了单元测试和一些边缘情况。</p><p>如往常一样，本文中展示的代码可在GitHub上找到。</p>`,25),o=[p];function r(l,i){return t(),n("div",null,o)}const h=a(s,[["render",r],["__file","2024-06-29-Rotate Arrays in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-06-29/2024-06-29-Rotate%20Arrays%20in%20Java.html","title":"Java中旋转数组的方法 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2023-10-01T00:00:00.000Z","category":["Java","Algorithms"],"tag":["Array Rotation","Java"],"head":[["meta",{"name":"keywords","content":"Java, Array Rotation, Algorithms"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-29/2024-06-29-Rotate%20Arrays%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中旋转数组的方法 | Baeldung"}],["meta",{"property":"og:description","content":"Java中旋转数组的方法 | Baeldung 在这篇教程中，我们将学习一些在Java中旋转数组的算法。 我们将看到如何将数组元素向右旋转_k_次。我们还将了解如何就地修改数组，尽管我们可能会使用额外的空间来计算旋转。 2.1. 找到最小的旋转数 我们将使用字母_k_作为旋转数的别名。 2.2. 单元测试 我们可能想要测试_k_小于、等于和大于数组长度..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-29T08:52:00.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Array Rotation"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:published_time","content":"2023-10-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-29T08:52:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中旋转数组的方法 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-10-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-29T08:52:00.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中旋转数组的方法 | Baeldung 在这篇教程中，我们将学习一些在Java中旋转数组的算法。 我们将看到如何将数组元素向右旋转_k_次。我们还将了解如何就地修改数组，尽管我们可能会使用额外的空间来计算旋转。 2.1. 找到最小的旋转数 我们将使用字母_k_作为旋转数的别名。 2.2. 单元测试 我们可能想要测试_k_小于、等于和大于数组长度..."},"headers":[{"level":3,"title":"2.1. 找到最小的旋转数","slug":"_2-1-找到最小的旋转数","link":"#_2-1-找到最小的旋转数","children":[]},{"level":3,"title":"2.2. 单元测试","slug":"_2-2-单元测试","link":"#_2-2-单元测试","children":[]},{"level":3,"title":"2.3. 数组和旋转测试变量","slug":"_2-3-数组和旋转测试变量","link":"#_2-3-数组和旋转测试变量","children":[]},{"level":3,"title":"2.4. 空间和时间复杂度","slug":"_2-4-空间和时间复杂度","link":"#_2-4-空间和时间复杂度","children":[]},{"level":3,"title":"3. 暴力法","slug":"_3-暴力法","link":"#_3-暴力法","children":[]},{"level":3,"title":"4. 使用额外数组","slug":"_4-使用额外数组","link":"#_4-使用额外数组","children":[]},{"level":3,"title":"5. 循环替换","slug":"_5-循环替换","link":"#_5-循环替换","children":[]},{"level":3,"title":"6. 反转","slug":"_6-反转","link":"#_6-反转","children":[]},{"level":3,"title":"7. 结论","slug":"_7-结论","link":"#_7-结论","children":[]}],"git":{"createdTime":1719651120000,"updatedTime":1719651120000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.16,"words":648},"filePathRelative":"posts/baeldung/2024-06-29/2024-06-29-Rotate Arrays in Java.md","localizedDate":"2023年10月1日","excerpt":"\\n<p>在这篇教程中，我们将学习一些在Java中旋转数组的算法。</p>\\n<p>我们将看到如何将数组元素向右旋转_k_次。我们还将了解如何就地修改数组，尽管我们可能会使用额外的空间来计算旋转。</p>\\n<h3>2.1. 找到最小的旋转数</h3>\\n<p>我们将使用字母_k_作为旋转数的别名。</p>\\n<h3>2.2. 单元测试</h3>\\n<p>我们可能想要测试_k_小于、等于和大于数组长度的情况。例如，如果我们将一个6个元素的数组旋转8次，我们只需要进行2次旋转。</p>\\n<h3>2.3. 数组和旋转测试变量</h3>\\n<p>我们将设置以下变量：</p>\\n<ul>\\n<li><em>arr</em> 作为测试长度为_6_的数组</li>\\n<li><em>rotationLtArrayLength</em> = <em>1</em> 作为小于数组长度的旋转</li>\\n<li><em>rotationGtArrayLength</em> = <em>8</em> 作为大于数组长度的旋转</li>\\n<li><em>ltArrayLengthRotation</em> 作为_rotationLtArrayLength_的解决方案</li>\\n<li><em>gtArrayLengthRotation</em> 作为_rotationGtArrayLength_的解决方案</li>\\n</ul>","autoDesc":true}');export{h as comp,d as data};
