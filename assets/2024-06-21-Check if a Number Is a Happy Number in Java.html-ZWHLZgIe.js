import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as i,a}from"./app-DAOx5Ihl.js";const s={},r=a(`<h1 id="java中判断一个数是否是快乐数" tabindex="-1"><a class="header-anchor" href="#java中判断一个数是否是快乐数"><span>Java中判断一个数是否是快乐数</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>我们经常在编程中解决数学问题。确定一个数是否是快乐数是一个有趣的任务。</p><p>在本教程中，我们将理解快乐数的定义，并探索如何实现一个Java程序来检查给定的数是否是快乐数。</p><h2 id="_2-理解快乐数" tabindex="-1"><a class="header-anchor" href="#_2-理解快乐数"><span>2. 理解快乐数</span></a></h2><p><strong>快乐数是通过重复替换其数字平方和达到1的数。</strong> 相反，非快乐数（悲伤数）会陷入一个无限循环，永远无法达到1。</p><p>像往常一样，一些例子可以帮助我们快速理解快乐数的定义：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>给定数字：19

 19 -&gt; 1^2 + 9^2 = 82
 82 -&gt; 8^2 + 2^2 = 68
 68 -&gt; 6^2 + 8^2 = 100
100 -&gt; 1^2 + 0^2 + 0^2 = 1
  1

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如上面的例子所示，我们最终为输入数字19达到了1。因此，19是一个快乐数。类似地，更多的快乐数例子包括7、10、13、23等。</p><p>然而，如果输入是15，我们将永远无法达到1：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>给定数字：15

       15 -&gt; 1^2 + 5^2 = 26
       26 -&gt; 2^2 + 6^2 = 40
       40 -&gt; 4^2 + 0^2 = 16
+---  16 -&gt; 1^2 + 6^2 = 37
|      37 -&gt; 3^2 + 7^2 = 58
|      58 -&gt; 5^2 + 8^2 = 89
|      89 -&gt; 8^2 + 9^2 = 145
|     145 -&gt; 1^2 + 4^2 + 5^2 = 42
|      42 -&gt; 4^2 + 2^2 = 20
|      20 -&gt; 2^2 + 0^2 = 4
|       4 -&gt; 4^2 = 16
+------16

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，过程在16和4之间无限循环，永远不会达到1。因此，15是一个悲伤数。</p><p>根据这个规则，我们可以找到更多的悲伤数，例如4、6、11、20等。</p><h2 id="_3-实现检查方法" tabindex="-1"><a class="header-anchor" href="#_3-实现检查方法"><span>3. 实现检查方法</span></a></h2><p>现在我们已经理解了快乐数的定义，让我们实现Java方法来检查给定的数是否是快乐数。</p><p>如果一个数的序列，每个数字平方和形成的序列包含循环，则该数是悲伤的。换句话说，<strong>给定一个数，如果一步计算结果已经存在于序列中，它就是悲伤数</strong>。</p><p>我们可以在Java中使用_HashSet_数据结构来实现这个逻辑。这允许我们存储每个步骤的结果，并有效地检查新计算的结果是否已经存在于集合中：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>class HappyNumberDecider {
    public static boolean isHappyNumber(int n) {
        Set\`&lt;Integer&gt;\` checkedNumbers = new HashSet&lt;&gt;();
        while (true) {
            n = sumDigitsSquare(n);
            if (n == 1) {
                return true;
            }
            if (checkedNumbers.contains(n)) {
                return false;
            }
            checkedNumbers.add(n);
        }
    }

    // ...
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如上面的代码所示，_sumDigitsSquare()_方法执行实际的计算并返回结果：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>private static int sumDigitsSquare(int n) {
    int squareSum = 0;
    while (n != 0) {
        squareSum += (n % 10) * (n % 10);
        n /= 10;
    }
    return squareSum;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们创建一个测试来验证我们的_isHappyNumber()_方法是否为不同的输入报告了预期的结果：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>assertTrue(HappyNumberDecider.isHappyNumber(7));
assertTrue(HappyNumberDecider.isHappyNumber(10));
assertTrue(HappyNumberDecider.isHappyNumber(13));
assertTrue(HappyNumberDecider.isHappyNumber(19));
assertTrue(HappyNumberDecider.isHappyNumber(23));

assertFalse(HappyNumberDecider.isHappyNumber(4));
assertFalse(HappyNumberDecider.isHappyNumber(6));
assertFalse(HappyNumberDecider.isHappyNumber(11));
assertFalse(HappyNumberDecider.isHappyNumber(15));
assertFalse(HappyNumberDecider.isHappyNumber(20));
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-性能分析" tabindex="-1"><a class="header-anchor" href="#_4-性能分析"><span>4. 性能分析</span></a></h2><p>首先，让我们分析解决方案的时间复杂度。</p><p>假设我们有一个数字_n_，它有_k_位数字。因此，我们需要_k_次迭代来计算数字平方的和。进一步，<strong>由于_k = log n_</strong>（以10为底的对数），<strong>O(log n)是计算第一个结果的时间复杂度</strong>。让我们称它为_result1_。<strong>由于最大数字是9，_result1_的最大值是</strong> _<strong>9^2 * log n</strong>。</p><p>如果_result1_不是1，我们必须重复调用_sumDigitsSquare()<em>。然后，**到目前为止的时间复杂度是_O(log n) + O(log (9^2 * log n)) = O(log n) + O(log 81 + log log n)</em>。** 去掉常数部分后，<strong>我们得到_O(log n) + O(log log n)_。</strong></p><p>因此，我们的总时间复杂度变为_O(log n) + O(log log n) + O(log log log n) + O(log log log log n) + …_ 直到结果达到1或我们检测到循环。<strong>由于_log n_是这个表达式中的主导部分，解决方案的时间复杂度是O(log n)。</strong></p><p>在我们转向空间复杂度分析之前，让我们列出有_k_位数字的最大的数字_n_和相应的_result1_：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>k     Largest n        result1
1     9                81
2     99               162
3     999              243
4     9999             324
5     99999            405
6     999999           486
7     9999999          567
8     99999999         648
9     999999999        729
10    9999999999       810
11    99999999999      891
12    999999999999     972
13    9999999999999    1053
       ...
1m    9..a million..9  81000000
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，给定超过三位数字的数字_n_，<strong>重复应用_sumDigitsSquare()_操作可以迅速将_n_减少到三位数数字的几个步骤内</strong>。</p><p>例如，当_k=1m_时，_n_比Java的_Long.MAX_VALUE_大得多。它只需要两个步骤就可以达到一个少于三位数的数字：<em>9..(1m)..9 -&gt; 81000000 (9^2 * 1m = 81000000) -&gt; 65 (8^2 + 1^2 = 65)</em></p><p>因此，在Java的_int_或_long_范围内，我们可以合理地假设_n_需要一个常数_C_步骤才能达到一个三位数或更少的数字。因此，我们的_HashSet_最多持有_C+243_个结果，<strong>得到一个空间复杂度为O(1)</strong>。</p><p>虽然这种方法的空间复杂度是O(1)，但它仍然需要空间来存储结果以检测循环。</p><h2 id="_5-改进-ishappynumber-方法" tabindex="-1"><a class="header-anchor" href="#_5-改进-ishappynumber-方法"><span>5. 改进_isHappyNumber()_方法</span></a></h2><p>Floyd的循环检测算法可以检测序列中的循环。例如，我们可以将这个算法应用于检查一个_LinkedList_是否包含一个圆圈。</p><p>这个想法是维护两个指针，_slow_和_fast。<strong>slow****每次更新一步，而</strong>fast<strong>每两步更新一次</strong>。如果它们在1处相遇，给定的数字是快乐的。否则，<strong>如果它们相遇但值不是1，就检测到循环</strong>。因此，给定的数字是悲伤的。</p><p>接下来，让我们在Java中实现慢快逻辑：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public static boolean isHappyNumberFloyd(int n) {
    int slow = n;
    int fast = n;
    do {
        slow = sumDigitsSquare(slow);
        fast = sumDigitsSquare(sumDigitsSquare(fast));
    } while (slow != fast);

    return slow == 1;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们用相同的输入测试_isHappyNumberFloyd()_方法：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>assertTrue(HappyNumberDecider.isHappyNumberFloyd(7));
assertTrue(HappyNumberDecider.isHappyNumberFloyd(10));
assertTrue(HappyNumberDecider.isHappyNumberFloyd(13));
assertTrue(HappyNumberDecider.isHappyNumberFloyd(19));
assertTrue(HappyNumberDecider.isHappyNumberFloyd(23));

assertFalse(HappyNumberDecider.isHappyNumberFloyd(4));
assertFalse(HappyNumberDecider.isHappyNumberFloyd(6));
assertFalse(HappyNumberDecider.isHappyNumberFloyd(11));
assertFalse(HappyNumberDecider.isHappyNumberFloyd(15));
assertFalse(HappyNumberDecider.isHappyNumberF
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,40),l=[r];function t(d,u){return i(),n("div",null,l)}const c=e(s,[["render",t],["__file","2024-06-21-Check if a Number Is a Happy Number in Java.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/Archive/2024-06-21-Check%20if%20a%20Number%20Is%20a%20Happy%20Number%20in%20Java.html","title":"Java中判断一个数是否是快乐数","lang":"zh-CN","frontmatter":{"date":"2024-06-21T00:00:00.000Z","category":["Java","算法"],"tag":["Happy Number","算法实现"],"head":[["meta",{"name":"keywords","content":"Java, Happy Number, 算法实现, 快乐数, 判断快乐数"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/2024-06-21-Check%20if%20a%20Number%20Is%20a%20Happy%20Number%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中判断一个数是否是快乐数"}],["meta",{"property":"og:description","content":"Java中判断一个数是否是快乐数 1. 概述 我们经常在编程中解决数学问题。确定一个数是否是快乐数是一个有趣的任务。 在本教程中，我们将理解快乐数的定义，并探索如何实现一个Java程序来检查给定的数是否是快乐数。 2. 理解快乐数 快乐数是通过重复替换其数字平方和达到1的数。 相反，非快乐数（悲伤数）会陷入一个无限循环，永远无法达到1。 像往常一样，一..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Happy Number"}],["meta",{"property":"article:tag","content":"算法实现"}],["meta",{"property":"article:published_time","content":"2024-06-21T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中判断一个数是否是快乐数\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-21T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中判断一个数是否是快乐数 1. 概述 我们经常在编程中解决数学问题。确定一个数是否是快乐数是一个有趣的任务。 在本教程中，我们将理解快乐数的定义，并探索如何实现一个Java程序来检查给定的数是否是快乐数。 2. 理解快乐数 快乐数是通过重复替换其数字平方和达到1的数。 相反，非快乐数（悲伤数）会陷入一个无限循环，永远无法达到1。 像往常一样，一..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 理解快乐数","slug":"_2-理解快乐数","link":"#_2-理解快乐数","children":[]},{"level":2,"title":"3. 实现检查方法","slug":"_3-实现检查方法","link":"#_3-实现检查方法","children":[]},{"level":2,"title":"4. 性能分析","slug":"_4-性能分析","link":"#_4-性能分析","children":[]},{"level":2,"title":"5. 改进_isHappyNumber()_方法","slug":"_5-改进-ishappynumber-方法","link":"#_5-改进-ishappynumber-方法","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":5.03,"words":1508},"filePathRelative":"posts/baeldung/Archive/2024-06-21-Check if a Number Is a Happy Number in Java.md","localizedDate":"2024年6月21日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>我们经常在编程中解决数学问题。确定一个数是否是快乐数是一个有趣的任务。</p>\\n<p>在本教程中，我们将理解快乐数的定义，并探索如何实现一个Java程序来检查给定的数是否是快乐数。</p>\\n<h2>2. 理解快乐数</h2>\\n<p><strong>快乐数是通过重复替换其数字平方和达到1的数。</strong> 相反，非快乐数（悲伤数）会陷入一个无限循环，永远无法达到1。</p>\\n<p>像往常一样，一些例子可以帮助我们快速理解快乐数的定义：</p>\\n<div class=\\"language-text\\" data-ext=\\"text\\" data-title=\\"text\\"><pre class=\\"language-text\\"><code>给定数字：19\\n\\n 19 -&gt; 1^2 + 9^2 = 82\\n 82 -&gt; 8^2 + 2^2 = 68\\n 68 -&gt; 6^2 + 8^2 = 100\\n100 -&gt; 1^2 + 0^2 + 0^2 = 1\\n  1\\n\\n</code></pre></div>","autoDesc":true}');export{c as comp,m as data};
