import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as n,a as t}from"./app-BOJj4F50.js";const i={},s=t(`<h1 id="java中将正整数转换为负数以及反之的方法-baeldung" tabindex="-1"><a class="header-anchor" href="#java中将正整数转换为负数以及反之的方法-baeldung"><span>Java中将正整数转换为负数以及反之的方法 | Baeldung</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在Java编程中，理解如何操作整数是编写健壮且高效代码的基础。一个常见的操作是取反整数。</p><p>在本教程中，我们将探索取反整数的不同方法。</p><h2 id="_2-问题介绍" tabindex="-1"><a class="header-anchor" href="#_2-问题介绍"><span>2. 问题介绍</span></a></h2><p>取反整数涉及将正数变为负数，或反之。例如，给定一个整数42，取反后我们期望得到-42作为结果。</p><p>我们不应忘记数字0既不是正数也不是负数。因此，取反0的结果也应该是0。</p><p>在Java中，这个操作很简单，我们将看到三种不同的实现方式。此外，我们将讨论一个边缘情况：整数溢出。</p><p>为了简化，我们将使用单元测试断言来验证每种方法的结果。</p><h2 id="_3-使用一元负号运算符" tabindex="-1"><a class="header-anchor" href="#_3-使用一元负号运算符"><span>3. 使用一元负号运算符</span></a></h2><p>取反整数最直接的方法是使用一元负号运算符（-）。它简单地改变了给定整数的符号：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>int x = 42;
assertEquals(-42, -x);

int z = 0;
assertEquals(0, -z);

int n = -42;
assertEquals(42, -n);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如测试所示，通过在输入整数上应用‘-’，我们得到了预期的结果。</p><h2 id="_4-使用按位补码运算符" tabindex="-1"><a class="header-anchor" href="#_4-使用按位补码运算符"><span>4. 使用按位补码运算符</span></a></h2><p>另一种不常见但有效的方法使用按位补码运算符（~）。这个运算符反转了给定整数的位，有效地创建了二进制补码：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>int number = 12;
int negative13 = ~number; // ~00001100 = 11110011 = -13
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>因此，给定一个整数x，~x + 1是x的取反。</p><p>接下来，让我们编写一个测试来验证这一点：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>int x = 42;
assertEquals(-42, ~x + 1);

int z = 0;
assertEquals(0, ~z + 1);

int n = -42;
assertEquals(42, ~n + 1);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所见，~x + 1解决了问题。</p><h2 id="_5-与integer-min-value的溢出问题" tabindex="-1"><a class="header-anchor" href="#_5-与integer-min-value的溢出问题"><span>5. 与Integer.MIN_VALUE的溢出问题</span></a></h2><p>我们知道Java的整数类型是一个有符号的32位类型，范围从-2147483648到2147483647。如果我们取反Integer.MAX_VALUE，结果-2147483647仍在范围内。但是，如果我们取反Integer.MIN_VALUE，我们应该得到2147483648，这大于Integer.MAX_VALUE。因此，在这种边缘情况下，会发生溢出错误。</p><p>尽管‘-x’和‘~x + 1’方法很直接，但**我们只有在确保不会发生溢出的情况下才能在我们的应用程序中使用它们。**一些可能适当使用它们的场景包括：</p><ul><li>计算一个足球队在锦标赛中的目标差异</li><li>计算一个员工一个月的工作时间</li></ul><p>然而，如果在我们的程序中可能会发生溢出，使用这些方法是不鼓励的。</p><p>接下来，让我们探索为什么这两种方法在将Integer.MIN_VALUE作为输入时会导致溢出错误。</p><h3 id="_5-1-使用integer-min-value的-x" tabindex="-1"><a class="header-anchor" href="#_5-1-使用integer-min-value的-x"><span>5.1. 使用Integer.MIN_VALUE的-x</span></a></h3><p>首先，让我们使用‘-’运算符取反Integer.MIN_VALUE：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>int min = Integer.MIN_VALUE;
LOG.info(&quot;The value of &#39;-min&#39; is: &quot; + -min);

assertTrue((-min) \`&lt; 0);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个测试通过，意味着在取反Integer.MIN_VALUE后我们仍然得到了一个负数。我们可以从输出中进一步验证这一点：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>The value of &#39;-min&#39; is: -2147483648
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>因此，<strong>当溢出发生时，‘-x’方法返回了错误的结果。</strong></p><h3 id="_5-2-使用integer-min-value的-x-1" tabindex="-1"><a class="header-anchor" href="#_5-2-使用integer-min-value的-x-1"><span>5.2. 使用Integer.MIN_VALUE的~x + 1</span></a></h3><p>让我们使用相同的测试使用‘~x + 1’方法：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>int min = Integer.MIN_VALUE;
int result = ~min + 1;
LOG.info(&quot;The value of &#39;~min + 1&#39; is: &quot; + result);

assertFalse(result &gt;\` 0);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>**我们可以看到，当溢出发生时，这种方法也不会给出预期的结果。**让我们通过检查控制台中的日志输出来进一步验证：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>The value of &#39;~min + 1&#39; is: -2147483648
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_6-使用math-negateexact-方法" tabindex="-1"><a class="header-anchor" href="#_6-使用math-negateexact-方法"><span>6. 使用Math.negateExact()方法</span></a></h2><p>对于需要处理Integer.MIN_VALUE的场景，Math.negateExact()方法提供了一种安全和精确的方式来取反一个整数。</p><p>首先，Math.negateExact()在正常情况下按预期工作：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>int x = 42;
assertEquals(-42, Math.negateExact(x));

int z = 0;
assertEquals(0, Math.negateExact(z));

int n = -42;
assertEquals(42, Math.negateExact(n));
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们看看如果输入是Integer.MIN_VALUE会发生什么：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>int min = Integer.MIN_VALUE;
assertThrowsExactly(ArithmeticException.class, () -&gt; Math.negateExact(min));
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>正如测试所示，**如果取反过程中发生溢出，Math.negateExact()方法会抛出一个ArithmeticException，**允许开发者在错误发生时处理它。</p><h2 id="_7-结论" tabindex="-1"><a class="header-anchor" href="#_7-结论"><span>7. 结论</span></a></h2><p>在本文中，我们探讨了Java中取反整数的三种方式。</p><p>‘-x’和‘~x + 1’是直接的解决方案。然而，<strong>如果我们的程序可能尝试取反Integer.MIN_VALUE，那么使用Math.negateExact()是正确的选择。</strong></p><p>如常，示例的完整源代码可在GitHub上找到。</p>`,48),l=[s];function r(d,c){return n(),a("div",null,l)}const p=e(i,[["render",r],["__file","2024-06-26-Convert Positive Integer to Negative and Vice Versa in Java.html.vue"]]),o=JSON.parse('{"path":"/posts/baeldung/2024-06-26/2024-06-26-Convert%20Positive%20Integer%20to%20Negative%20and%20Vice%20Versa%20in%20Java.html","title":"Java中将正整数转换为负数以及反之的方法 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-06-27T00:00:00.000Z","category":["Java","编程"],"tag":["整数","取反"],"head":[["meta",{"name":"keywords","content":"Java, 整数取反, 编程技巧"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-26/2024-06-26-Convert%20Positive%20Integer%20to%20Negative%20and%20Vice%20Versa%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中将正整数转换为负数以及反之的方法 | Baeldung"}],["meta",{"property":"og:description","content":"Java中将正整数转换为负数以及反之的方法 | Baeldung 1. 概述 在Java编程中，理解如何操作整数是编写健壮且高效代码的基础。一个常见的操作是取反整数。 在本教程中，我们将探索取反整数的不同方法。 2. 问题介绍 取反整数涉及将正数变为负数，或反之。例如，给定一个整数42，取反后我们期望得到-42作为结果。 我们不应忘记数字0既不是正数也..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-26T17:51:32.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"整数"}],["meta",{"property":"article:tag","content":"取反"}],["meta",{"property":"article:published_time","content":"2024-06-27T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-26T17:51:32.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中将正整数转换为负数以及反之的方法 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-27T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-26T17:51:32.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中将正整数转换为负数以及反之的方法 | Baeldung 1. 概述 在Java编程中，理解如何操作整数是编写健壮且高效代码的基础。一个常见的操作是取反整数。 在本教程中，我们将探索取反整数的不同方法。 2. 问题介绍 取反整数涉及将正数变为负数，或反之。例如，给定一个整数42，取反后我们期望得到-42作为结果。 我们不应忘记数字0既不是正数也..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 问题介绍","slug":"_2-问题介绍","link":"#_2-问题介绍","children":[]},{"level":2,"title":"3. 使用一元负号运算符","slug":"_3-使用一元负号运算符","link":"#_3-使用一元负号运算符","children":[]},{"level":2,"title":"4. 使用按位补码运算符","slug":"_4-使用按位补码运算符","link":"#_4-使用按位补码运算符","children":[]},{"level":2,"title":"5. 与Integer.MIN_VALUE的溢出问题","slug":"_5-与integer-min-value的溢出问题","link":"#_5-与integer-min-value的溢出问题","children":[{"level":3,"title":"5.1. 使用Integer.MIN_VALUE的-x","slug":"_5-1-使用integer-min-value的-x","link":"#_5-1-使用integer-min-value的-x","children":[]},{"level":3,"title":"5.2. 使用Integer.MIN_VALUE的~x + 1","slug":"_5-2-使用integer-min-value的-x-1","link":"#_5-2-使用integer-min-value的-x-1","children":[]}]},{"level":2,"title":"6. 使用Math.negateExact()方法","slug":"_6-使用math-negateexact-方法","link":"#_6-使用math-negateexact-方法","children":[]},{"level":2,"title":"7. 结论","slug":"_7-结论","link":"#_7-结论","children":[]}],"git":{"createdTime":1719424292000,"updatedTime":1719424292000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.73,"words":1119},"filePathRelative":"posts/baeldung/2024-06-26/2024-06-26-Convert Positive Integer to Negative and Vice Versa in Java.md","localizedDate":"2024年6月27日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>在Java编程中，理解如何操作整数是编写健壮且高效代码的基础。一个常见的操作是取反整数。</p>\\n<p>在本教程中，我们将探索取反整数的不同方法。</p>\\n<h2>2. 问题介绍</h2>\\n<p>取反整数涉及将正数变为负数，或反之。例如，给定一个整数42，取反后我们期望得到-42作为结果。</p>\\n<p>我们不应忘记数字0既不是正数也不是负数。因此，取反0的结果也应该是0。</p>\\n<p>在Java中，这个操作很简单，我们将看到三种不同的实现方式。此外，我们将讨论一个边缘情况：整数溢出。</p>\\n<p>为了简化，我们将使用单元测试断言来验证每种方法的结果。</p>","autoDesc":true}');export{p as comp,o as data};
