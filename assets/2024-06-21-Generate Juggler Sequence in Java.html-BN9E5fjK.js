import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as t,a as i}from"./app-BGKAvMxA.js";const a={},r=i(`<h1 id="java中生成杂耍序列" tabindex="-1"><a class="header-anchor" href="#java中生成杂耍序列"><span>Java中生成杂耍序列</span></a></h1><p>杂耍序列以其迷人的行为和优雅的简单性而脱颖而出。</p><p>在本教程中，我们将理解杂耍序列，并探索如何使用Java中的给定初始数字生成序列。</p><h3 id="_2-理解杂耍序列" tabindex="-1"><a class="header-anchor" href="#_2-理解杂耍序列"><span>2. 理解杂耍序列</span></a></h3><p>在我们深入到生成杂耍序列的代码之前，让我们快速了解一下杂耍序列是什么。</p><p>在数论中，杂耍序列是一个整数序列，定义为递归如下：​​</p><ul><li>以正整数( n )作为序列的第一项。</li><li>如果 ( n ) 是偶数，下一项是 ( n ) 的平方根，向下取整到最近的整数。</li><li>如果 ( n ) 是奇数，则下一项是 ( n \\times \\sqrt{n} )，向下取整到最近的整数。</li></ul><p><strong>此过程继续进行，直到达到1，序列终止。</strong></p><p>值得一提的是，<strong>( n ) 的平方根和 ( n \\times \\sqrt{n} ) 都可以转换为平方根计算：</strong></p><ul><li>( n ) 的平方根是 ( \\sqrt{n} )。因此，( n ) 的平方根 ( = \\sqrt{n} )。</li><li>( n \\times \\sqrt{n} = n \\times (n ) 的平方根 ( ) = n \\times \\sqrt{n} )。</li></ul><p>一个例子可能有助于我们快速理解序列：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>给定数字：3
-----------------
3 - 奇数 - 3 × √3 - (int)5.19.. - 5
5 - 奇数 - 5 × √5 - (int)11.18.. - 11
11 - 奇数 - 11 × √11 - (int)36.48.. - 36
36 - 偶数 - √36 - (int)6 - 6
6 - 偶数 - √6 - (int)2.45.. - 2
2 - 偶数 - √2 - (int)1.41.. - 1
1

序列：3, 5, 11, 36, 6, 2, 1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>值得注意的是，人们推测所有的杂耍序列最终都会达到1，但<strong>这个猜想还没有被证明</strong>。因此，我们实际上无法完成大O时间复杂度分析。</p><p>现在我们知道了如何生成杂耍序列，让我们在Java中实现一些序列生成方法。</p><h3 id="_3-基于循环的解决方案" tabindex="-1"><a class="header-anchor" href="#_3-基于循环的解决方案"><span>3. 基于循环的解决方案</span></a></h3><p>让我们首先实现一个基于循环的生成方法：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>class JugglerSequenceGenerator {
    public static List\`\`\`&lt;Integer&gt;\`\`\` byLoop(int n) {
        if (n &lt;= 0) {
            throw new IllegalArgumentException(&quot;The initial integer must be greater than zero.&quot;);
        }
        List\`\`\`&lt;Integer&gt;\`\`\` seq = new ArrayList&lt;&gt;();
        int current = n;
        seq.add(current);
        while (current != 1) {
            int next = (int) (Math.sqrt(current) * (current % 2 == 0 ? 1 : current));
            seq.add(next);
            current = next;
        }
        return seq;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>代码看起来相当直接。让我们快速浏览一下代码并理解它的工作原理：</p><ul><li>首先，验证输入 ( n )，因为初始数字必须是正整数。</li><li>然后，创建 <em>seq</em> 列表以存储结果序列，将初始整数分配给 <em>current，并将其添加到_seq</em>。</li><li>一个 <em>while</em> 循环负责根据我们之前讨论的计算生成每一项并将其附加到序列中。</li><li>一旦循环终止（当 <em>current</em> 变为1），存储在 <em>seq</em> 列表中的生成序列将被返回。</li></ul><p>接下来，让我们创建一个测试方法来验证我们的基于循环的方法是否可以生成预期的结果：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>assertThrows(IllegalArgumentException.class, () -&gt; JugglerSequenceGenerator.byLoop(0));
assertEquals(List.of(3, 5, 11, 36, 6, 2, 1), JugglerSequenceGenerator.byLoop(3));
assertEquals(List.of(4, 2, 1), JugglerSequenceGenerator.byLoop(4));
assertEquals(List.of(9, 27, 140, 11, 36, 6, 2, 1), JugglerSequenceGenerator.byLoop(9));
assertEquals(List.of(21, 96, 9, 27, 140, 11, 36, 6, 2, 1), JugglerSequenceGenerator.byLoop(21));
assertEquals(List.of(42, 6, 2, 1), JugglerSequenceGenerator.byLoop(42));
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-基于递归的解决方案" tabindex="-1"><a class="header-anchor" href="#_4-基于递归的解决方案"><span>4. 基于递归的解决方案</span></a></h3><p>或者，我们可以递归地从给定数字生成杂耍序列。首先，让我们将 <em>byRecursion()</em> 方法添加到 <em>JugglerSequenceGenerator</em> 类中：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public static List\`\`\`&lt;Integer&gt;\`\`\` byRecursion(int n) {
    if (n &lt;= 0) {
        throw new IllegalArgumentException(&quot;The initial integer must be greater than zero.&quot;);
    }
    List\`\`\`&lt;Integer&gt;\`\`\` seq = new ArrayList&lt;&gt;();
    fillSeqRecursively(n, seq);
    return seq;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，<em>byRecursion()</em> 方法是另一个杂耍序列生成器的入口点。它验证输入数字并准备结果序列列表。然而，主要的序列生成逻辑是在 <em>fillSeqRecursively()</em> 方法中实现的：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>private static void fillSeqRecursively(int current, List\`\`\`&lt;Integer&gt;\`\`\` result) {
    result.add(current);
    if (current == 1) {
        return;
    }
    int next = (int) (Math.sqrt(current) * (current % 2 == 0 ? 1 : current));
    fillSeqRecursively(next, result);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如代码所示，**该方法使用 <em>next</em> 值和 <em>result</em> 列表递归调用自身。**这意味着该方法将重复添加 <em>current</em> 数字到序列中，检查终止条件，并计算下一项，直到满足终止条件（<em>current == 1</em>）。</p><p>递归方法通过相同的测试：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>assertThrows(IllegalArgumentException.class, () -&gt; JugglerSequenceGenerator.byRecursion(0));
assertEquals(List.of(3, 5, 11, 36, 6, 2, 1), JugglerSequenceGenerator.byRecursion(3));
assertEquals(List.of(4, 2, 1), JugglerSequenceGenerator.byRecursion(4));
assertEquals(List.of(9, 27, 140, 11, 36, 6, 2, 1), JugglerSequenceGenerator.byRecursion(9));
assertEquals(List.of(21, 96, 9, 27, 140, 11, 36, 6, 2, 1), JugglerSequenceGenerator.byRecursion(21));
assertEquals(List.of(42, 6, 2, 1), JugglerSequenceGenerator.byRecursion(42));
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h3><p>在本文中，我们首先讨论了什么是杂耍序列。值得注意的是，尚未证明所有杂耍序列最终都会达到1。</p><p>此外，我们探索了两种从给定整数开始生成杂耍序列的方法。</p><p>如常，示例的完整源代码可在GitHub上找到。</p>`,33),s=[r];function l(d,u){return t(),n("div",null,s)}const v=e(a,[["render",l],["__file","2024-06-21-Generate Juggler Sequence in Java.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-06-21/2024-06-21-Generate%20Juggler%20Sequence%20in%20Java.html","title":"Java中生成杂耍序列","lang":"zh-CN","frontmatter":{"date":"2024-06-21T00:00:00.000Z","category":["Java","算法"],"tag":["序列","递归"],"head":[["meta",{"name":"keywords","content":"Java, 算法, 递归, 序列, 杂耍序列"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-21/2024-06-21-Generate%20Juggler%20Sequence%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中生成杂耍序列"}],["meta",{"property":"og:description","content":"Java中生成杂耍序列 杂耍序列以其迷人的行为和优雅的简单性而脱颖而出。 在本教程中，我们将理解杂耍序列，并探索如何使用Java中的给定初始数字生成序列。 2. 理解杂耍序列 在我们深入到生成杂耍序列的代码之前，让我们快速了解一下杂耍序列是什么。 在数论中，杂耍序列是一个整数序列，定义为递归如下：​​ 以正整数( n )作为序列的第一项。 如果 ( n..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T14:31:06.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"序列"}],["meta",{"property":"article:tag","content":"递归"}],["meta",{"property":"article:published_time","content":"2024-06-21T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T14:31:06.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中生成杂耍序列\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-21T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T14:31:06.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中生成杂耍序列 杂耍序列以其迷人的行为和优雅的简单性而脱颖而出。 在本教程中，我们将理解杂耍序列，并探索如何使用Java中的给定初始数字生成序列。 2. 理解杂耍序列 在我们深入到生成杂耍序列的代码之前，让我们快速了解一下杂耍序列是什么。 在数论中，杂耍序列是一个整数序列，定义为递归如下：​​ 以正整数( n )作为序列的第一项。 如果 ( n..."},"headers":[{"level":3,"title":"2. 理解杂耍序列","slug":"_2-理解杂耍序列","link":"#_2-理解杂耍序列","children":[]},{"level":3,"title":"3. 基于循环的解决方案","slug":"_3-基于循环的解决方案","link":"#_3-基于循环的解决方案","children":[]},{"level":3,"title":"4. 基于递归的解决方案","slug":"_4-基于递归的解决方案","link":"#_4-基于递归的解决方案","children":[]},{"level":3,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1718980266000,"updatedTime":1718980266000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.85,"words":1156},"filePathRelative":"posts/baeldung/2024-06-21/2024-06-21-Generate Juggler Sequence in Java.md","localizedDate":"2024年6月21日","excerpt":"\\n<p>杂耍序列以其迷人的行为和优雅的简单性而脱颖而出。</p>\\n<p>在本教程中，我们将理解杂耍序列，并探索如何使用Java中的给定初始数字生成序列。</p>\\n<h3>2. 理解杂耍序列</h3>\\n<p>在我们深入到生成杂耍序列的代码之前，让我们快速了解一下杂耍序列是什么。</p>\\n<p>在数论中，杂耍序列是一个整数序列，定义为递归如下：​​</p>\\n<ul>\\n<li>以正整数( n )作为序列的第一项。</li>\\n<li>如果 ( n ) 是偶数，下一项是 ( n ) 的平方根，向下取整到最近的整数。</li>\\n<li>如果 ( n ) 是奇数，则下一项是 ( n \\\\times \\\\sqrt{n} )，向下取整到最近的整数。</li>\\n</ul>","autoDesc":true}');export{v as comp,m as data};
