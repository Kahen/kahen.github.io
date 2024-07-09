import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as t,a as n}from"./app-COaDJFIk.js";const i={},s=n(`<hr><h1 id="在java中从给定数组中找到缺失的数字" tabindex="-1"><a class="header-anchor" href="#在java中从给定数组中找到缺失的数字"><span>在Java中从给定数组中找到缺失的数字</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在Java中，从数组中找出指定范围内的缺失数字在多种场景下都非常有用，例如数据验证、确保完整性或识别数据集中的空白。</p><p>在本教程中，我们将<strong>学习多种方法来从整数范围 <em>[1-N]</em> 的数组中找出单个缺失的数字</strong>。</p><h2 id="_2-理解场景" tabindex="-1"><a class="header-anchor" href="#_2-理解场景"><span>2. 理解场景</span></a></h2><p>让我们想象我们有一个包含整数范围 <em>[1-9]</em>（包括两端）的 <em>numbers</em> 数组：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>int[] numbers = new int[] { 1, 4, 5, 2, 7, 8, 6, 9 };
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>现在，我们的目标是找出数组中范围 <em>[1-9]</em> 的缺失数字</strong>。</p><p>为了概括问题陈述，我们可以计算数组的长度并设置上限 <em>N</em>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>int N = numbers.length + 1;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在接下来的部分中，我们将学习不同的方法来从给定的数组中找出范围 <em>[1-N]</em> 的缺失数字。</p><h2 id="_3-使用算术求和" tabindex="-1"><a class="header-anchor" href="#_3-使用算术求和"><span>3. 使用算术求和</span></a></h2><p>让我们首先使用算术求和来找出 <em>numbers</em> 数组中的缺失数字。</p><p>首先，我们将计算范围 <em>[1-N]</em> 的等差数列的预期求和和数组的实际求和：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>int expectedSum = (N * (N + 1)) / 2;
int actualSum = Arrays.stream(numbers).sum();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们可以通过从 <em>expectedSum</em> 中减去 <em>actualSum</em> 来得到 <em>missingNumber</em>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>int missingNumber = expectedSum - actualSum;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>最后，让我们验证结果：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>assertEquals(3, missingNumber);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这是正确的！</p><h2 id="_4-使用xor属性" tabindex="-1"><a class="header-anchor" href="#_4-使用xor属性"><span>4. 使用XOR属性</span></a></h2><p>或者，我们可以使用异或操作符（ ^ ）的两个有趣的属性来解决我们的问题：</p><ul><li>X^X = 0: 当我们将一个数字与其自身进行异或操作时，我们得到零。</li><li>X^0 = X: 当我们将一个数字与零进行异或操作时，我们得到相同的数字。</li></ul><p>首先，我们将使用 <em>reduce</em> 函数对封闭范围 <em>[1-9]</em> 中的所有整数值进行异或操作：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>int xorValue = IntStream.rangeClosed(1, N).reduce(0, (a, b) -&gt; a ^ b);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们使用0和 <em>(a, b) -&gt; a ^ b</em>，这是一个lambda表达式，分别作为_reduce()_ 操作的标识和累加器。</p><p>接下来，我们将使用来自 <em>numbers</em> 数组的整数值继续进行异或操作：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>xorValue = Arrays.stream(numbers).reduce(xorValue, (x, y) -&gt; x ^ y);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>由于除了缺失数字之外的每个数字都出现了两次，<em>xorValue</em> 将只包含 <em>numbers</em> 数组中范围 <em>[1-9]</em> 的缺失数字</strong>。</p><p>最后，我们应该验证我们的方法是否给出了正确的结果：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>assertEquals(3, xorValue);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>太好了！我们这次也做对了。</p><h2 id="_5-使用排序" tabindex="-1"><a class="header-anchor" href="#_5-使用排序"><span>5. 使用排序</span></a></h2><p>我们的输入数组 <em>numbers</em> 预计包含范围 <em>[1-N]</em> 中的所有连续值，除了缺失的数字。因此，如果我们对数组进行排序，将便于发现缺失数字的位置，即我们没有看到连续数字的地方。</p><p>首先，让我们对 <em>numbers</em> 数组进行排序：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Arrays.sort(numbers);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>接下来，我们可以遍历 <em>numbers</em> 数组并检查索引处的值是否为 <em>index+1</em>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>int missingNumber = -1;
for (int index = 0; index \`&lt; numbers.length; index++) {
    if (numbers[index] != index + 1) {
        missingNumber = index + 1;
        break;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>当条件失败时，这意味着预期值 <em>index + 1</em> 缺失于数组</strong>。因此，我们设置 <em>missingNumber</em> 并提前退出循环。</p><p>最后，让我们检查我们是否得到了期望的输出：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>assertEquals(3, missingNumber);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>结果看起来是正确的。然而，我们必须注意，在这种情况下<strong>我们改变了原始输入数组</strong>。</p><h2 id="_6-使用布尔数组跟踪" tabindex="-1"><a class="header-anchor" href="#_6-使用布尔数组跟踪"><span>6. 使用布尔数组跟踪</span></a></h2><p>在排序方法中，有两个主要缺点：</p><ul><li>排序的开销成本</li><li>原始输入数组的变异</li></ul><p>我们可以通过使用布尔数组来跟踪当前数字来减轻这些问题。</p><p>首先，让我们将 <em>present</em> 定义为大小为 <em>N</em> 的布尔数组：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>boolean[] present = new boolean[N];
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们必须回忆 <em>N</em> 被初始化为 <em>numbers.length + 1</em>。</p><p>接下来，我们将<strong>遍历 numbers 数组并在 <em>present</em> 数组中标记每个数字的存在</strong>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>int missingNumber = -1;
Arrays.stream(numbers).forEach(number -&gt;\` present[number - 1] = true);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>进一步，我们将进行另一次迭代，但这次是对 <em>present</em> 数组，以找到未标记为存在的数字：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>for (int index = 0; index &lt; present.length; index++) {
    if (!present[index]) {
        missingNumber = index + 1;
        break;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，让我们通过检查 <em>missingNumber</em> 变量的值来验证我们的方法：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>assertEquals(3, missingNumber);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>完美！我们的方法奏效了。此外，我们必须注意<strong>我们使用了 <em>N</em> 字节的额外空间</strong>，因为每个布尔值在Java中将占用1字节。</p><h2 id="_7-使用位集跟踪" tabindex="-1"><a class="header-anchor" href="#_7-使用位集跟踪"><span>7. 使用位集跟踪</span></a></h2><p>我们可以通过使用位集而不是布尔数组来优化空间复杂度。</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>BitSet bitSet = new BitSet(N);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>通过这种初始化，<strong>我们将只使用足够的空间来表示 <em>N</em> 位</strong>。当 <em>N</em> 的值相当高时，这是一个相当大的优化。</p><p>接下来，让我们<strong>遍历 numbers 数组并通过在 <em>bitset</em> 中的他们的位置设置位来标记它们的存在</strong>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>for (int num : numbers) {
    bitSet.set(num);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，<strong>我们可以通过检查未设置的位来找到缺失的数字</strong>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>int missingNumber = bitSet.nextClearBit(1);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>最后，让我们确认我们在 <em>missingNumber</em> 中得到了正确的值：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>assertEquals(3, missingNumber);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>太棒了！看起来我们这次也做得很好。</p><h2 id="_8-结论" tabindex="-1"><a class="header-anchor" href="#_8-结论"><span>8. 结论</span></a></h2><p>在本教程中，<strong>我们学习了如何从数组中找出缺失的数字</strong>。此外，我们探索了多种解决这个问题的方法，如算术求和、异或操作、排序以及像 <em>Bitset</em> 和 <em>boolean</em> 数组这样的附加数据结构。</p><p>正如往常一样，本文的代码可在GitHub上找到。</p>`,71),r=[s];function d(l,m){return t(),a("div",null,r)}const p=e(i,[["render",d],["__file","2024-06-25-Find Missing Number From a Given Array in Java.html.vue"]]),o=JSON.parse('{"path":"/posts/baeldung/2024-06-25/2024-06-25-Find%20Missing%20Number%20From%20a%20Given%20Array%20in%20Java.html","title":"在Java中从给定数组中找到缺失的数字","lang":"zh-CN","frontmatter":{"date":"2024-06-25T00:00:00.000Z","category":["Java","数组"],"tag":["数组","缺失数字","Java"],"head":[["meta",{"name":"keywords","content":"Java, 数组, 缺失数字, 查找"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-25/2024-06-25-Find%20Missing%20Number%20From%20a%20Given%20Array%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Java中从给定数组中找到缺失的数字"}],["meta",{"property":"og:description","content":"在Java中从给定数组中找到缺失的数字 1. 概述 在Java中，从数组中找出指定范围内的缺失数字在多种场景下都非常有用，例如数据验证、确保完整性或识别数据集中的空白。 在本教程中，我们将学习多种方法来从整数范围 [1-N] 的数组中找出单个缺失的数字。 2. 理解场景 让我们想象我们有一个包含整数范围 [1-9]（包括两端）的 numbers 数组：..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-25T01:49:46.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"数组"}],["meta",{"property":"article:tag","content":"缺失数字"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:published_time","content":"2024-06-25T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-25T01:49:46.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Java中从给定数组中找到缺失的数字\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-25T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-25T01:49:46.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Java中从给定数组中找到缺失的数字 1. 概述 在Java中，从数组中找出指定范围内的缺失数字在多种场景下都非常有用，例如数据验证、确保完整性或识别数据集中的空白。 在本教程中，我们将学习多种方法来从整数范围 [1-N] 的数组中找出单个缺失的数字。 2. 理解场景 让我们想象我们有一个包含整数范围 [1-9]（包括两端）的 numbers 数组：..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 理解场景","slug":"_2-理解场景","link":"#_2-理解场景","children":[]},{"level":2,"title":"3. 使用算术求和","slug":"_3-使用算术求和","link":"#_3-使用算术求和","children":[]},{"level":2,"title":"4. 使用XOR属性","slug":"_4-使用xor属性","link":"#_4-使用xor属性","children":[]},{"level":2,"title":"5. 使用排序","slug":"_5-使用排序","link":"#_5-使用排序","children":[]},{"level":2,"title":"6. 使用布尔数组跟踪","slug":"_6-使用布尔数组跟踪","link":"#_6-使用布尔数组跟踪","children":[]},{"level":2,"title":"7. 使用位集跟踪","slug":"_7-使用位集跟踪","link":"#_7-使用位集跟踪","children":[]},{"level":2,"title":"8. 结论","slug":"_8-结论","link":"#_8-结论","children":[]}],"git":{"createdTime":1719280186000,"updatedTime":1719280186000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.74,"words":1421},"filePathRelative":"posts/baeldung/2024-06-25/2024-06-25-Find Missing Number From a Given Array in Java.md","localizedDate":"2024年6月25日","excerpt":"<hr>\\n<h1>在Java中从给定数组中找到缺失的数字</h1>\\n<h2>1. 概述</h2>\\n<p>在Java中，从数组中找出指定范围内的缺失数字在多种场景下都非常有用，例如数据验证、确保完整性或识别数据集中的空白。</p>\\n<p>在本教程中，我们将<strong>学习多种方法来从整数范围 <em>[1-N]</em> 的数组中找出单个缺失的数字</strong>。</p>\\n<h2>2. 理解场景</h2>\\n<p>让我们想象我们有一个包含整数范围 <em>[1-9]</em>（包括两端）的 <em>numbers</em> 数组：</p>\\n<div class=\\"language-text\\" data-ext=\\"text\\" data-title=\\"text\\"><pre class=\\"language-text\\"><code>int[] numbers = new int[] { 1, 4, 5, 2, 7, 8, 6, 9 };\\n</code></pre></div>","autoDesc":true}');export{p as comp,o as data};
