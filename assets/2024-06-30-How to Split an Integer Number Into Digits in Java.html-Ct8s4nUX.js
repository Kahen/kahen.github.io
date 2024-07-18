import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as a,a as n}from"./app-c243dxVF.js";const i={},r=n('<h1 id="如何在java中将整数拆分成单个数字-baeldung" tabindex="-1"><a class="header-anchor" href="#如何在java中将整数拆分成单个数字-baeldung"><span>如何在Java中将整数拆分成单个数字 | Baeldung</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在Java中处理整数时，有时我们需要将它们拆分成单独的数字以进行各种计算或数据操作任务。</p><p>在本教程中，我们将探索使用Java将整数拆分成其构成数字的各种方法。</p><h2 id="_2-问题介绍" tabindex="-1"><a class="header-anchor" href="#_2-问题介绍"><span>2. 问题介绍</span></a></h2><p>像往常一样，让我们通过一个例子来理解问题。假设我们有一个整数：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>int THE_NUMBER = 1230456;\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们的目标是按顺序将数字拆分成：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>1, 2, 3, 0, 4, 5, 6\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>为简单起见，<strong>本教程将主要集中在正十进制整数上</strong>。然而，根据具体需求，我们可能希望以_Integer_、_char_或_String_的形式获取每个数字。</p><p>接下来，让我们探索各种方法来适应这些不同的返回类型。</p><h2 id="_3-拆分成-integer-列表" tabindex="-1"><a class="header-anchor" href="#_3-拆分成-integer-列表"><span>3. 拆分成_Integer_列表</span></a></h2><p>首先，让我们将给定的整数拆分成_Integer_的列表。也就是说，我们的目标是得到这个列表：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>List`````&lt;Integer&gt;````` EXPECTED_INT_LIST = Lists.newArrayList(1, 2, 3, 0, 4, 5, 6);\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>最直接的方法之一是<strong>使用循环反复将数字除以10，每次迭代提取余数，直到数字变为零</strong>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>      1230456 / 10 = 123045 余数：6\n  |-&gt; 123045 / 10 = 12304 余数：5\n  |-&gt; 12304 / 10 = 1230 余数：4\n  |-&gt; 1230 / 10 = 123 余数：0\n  |-&gt; 123 / 10 = 12 余数：3\n  |-&gt; 12 / 10 = 1 余数：2\n  |-&gt; 1 / 10 = 0 余数：1\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然而，正如上面的例子所示，<strong>这种方法生成的数字顺序是相反的</strong>。为了解决这个问题，<strong>我们可以使用_LinkedList_作为一个栈</strong>并在每一步中将余数_push()_到栈上：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>int number = THE_NUMBER;\nLinkedList`````&lt;Integer&gt;````` result = new LinkedList&lt;&gt;();\nwhile (number &gt; 0) {\n    result.push(number % 10);\n    number /= 10;\n}\nassertEquals(EXPECTED_INT_LIST, result);\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同样，<strong>我们可以使用递归来实现相同的想法</strong>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>void collectDigits(int num, List`````&lt;Integer&gt;````` digitList) {\n    if (num / 10 &gt; 0) {\n        collectDigits(num / 10, digitList);\n    }\n    digitList.add(num % 10);\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，我们可以调用_collectDigits()_方法来获取结果：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>List`````&lt;Integer&gt;````` result = new ArrayList&lt;&gt;();\ncollectDigits(THE_NUMBER, result);\nassertEquals(EXPECTED_INT_LIST, result);\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>如果我们的Java版本是Java 9或更高版本，我们可以使用_String.chars()_和_IntStream_来获取数字列表</strong>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>String numStr = String.valueOf(THE_NUMBER);\nList`````&lt;Integer&gt;````` result = numStr.chars().map(Character::getNumericValue).boxed().collect(Collectors.toList());\nassertEquals(EXPECTED_INT_LIST, result);\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如上面的代码所示，我们首先将整数转换为字符串。然后，<strong>_numStr.chars()_方法将数字字符串拆分为一个_IntStream_的字符</strong>。接下来，<strong>_Character_的_getNumericValue()<em>从_IntStream_中的字符获取数字作为_int</em></strong>。最后，我们将_int_装箱为_Integer_并收集结果列表。</p><h2 id="_4-拆分成-char-数组" tabindex="-1"><a class="header-anchor" href="#_4-拆分成-char-数组"><span>4. 拆分成_char_数组</span></a></h2><p>有时，我们希望将给定的整数拆分成_char[]_数组：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>char[] EXPECTED_CHAR_ARRAY = new char[] { &#39;1&#39;, &#39;2&#39;, &#39;3&#39;, &#39;0&#39;, &#39;4&#39;, &#39;5&#39;, &#39;6&#39; };\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这项任务很直接，因为<strong>标准_String_类提供了_toCharArray()<em>来将字符串拆分为_char[]</em></strong>。我们需要做的只是简单地将整数转换为_String_并调用_toCharArray()_方法：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>String numStr = String.valueOf(THE_NUMBER);\nchar[] result = numStr.toCharArray();\nassertArrayEquals(EXPECTED_CHAR_ARRAY, result);\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当然，如果需要，我们可以快速将数组转换为列表。</p><h2 id="_5-拆分成-string-数组或-string-列表" tabindex="-1"><a class="header-anchor" href="#_5-拆分成-string-数组或-string-列表"><span>5. 拆分成_String_数组或_String_列表</span></a></h2><p>最后，让我们看看如何将整数拆分成_String[]_数组或_String_列表：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>String[] EXPECTED_STR_ARRAY = new String[] { &quot;1&quot;, &quot;2&quot;, &quot;3&quot;, &quot;0&quot;, &quot;4&quot;, &quot;5&quot;, &quot;6&quot; };\nList`&lt;String&gt;` EXPECTED_STR_LIST = Lists.newArrayList(&quot;1&quot;, &quot;2&quot;, &quot;3&quot;, &quot;0&quot;, &quot;4&quot;, &quot;5&quot;, &quot;6&quot;);\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>由于我们称此操作为“split”，强大的_split()_方法可以帮助我们解决问题：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>String numStr = String.valueOf(THE_NUMBER);\nString[] result = numStr.split(&quot;(?&lt;=.)&quot;);\nassertArrayEquals(EXPECTED_STR_ARRAY, result);\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，代码看起来相当紧凑。关键是我们在_split()<em>函数中使用的正则表达式模式。**</em>(?&lt;=.)<em>是一个正向后发表达式**。例如，</em>“(?&lt;=X)a”<em>匹配每个在‘<em>X</em>’字符后的‘<em>a</em>’。然而，我们只有</em>(?&lt;=.)_在我们的模式中。<strong>这使得模式匹配零宽度</strong>。所以，<em>split()<em>将<strong>任何字符后的零宽度“字符”作为分隔符</strong>。如果我们用‘#’字符替换数字字符串中的零宽度“字符”，可能更容易理解：</em>“1#2#3#0#4#5#6#”</em>。</p><p>此外，<strong>_split()_默认丢弃尾随的空元素</strong>。因此，它产生了所需的结果。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们探索了将整数拆分成数字的多种方法。此外，我们还看到了如何通过示例以不同的类型，如_Integer_、<em>char_和_String</em>，获取数字。</p><p>像往常一样，示例的完整源代码可在GitHub上找到。</p>',41),s=[r];function l(d,u){return a(),t("div",null,s)}const g=e(i,[["render",l],["__file","2024-06-30-How to Split an Integer Number Into Digits in Java.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-06-30/2024-06-30-How%20to%20Split%20an%20Integer%20Number%20Into%20Digits%20in%20Java.html","title":"如何在Java中将整数拆分成单个数字 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Programming"],"tag":["Java","Integer","Digits"],"head":[["meta",{"name":"keywords","content":"Java, Integer, Digits, Split"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-30/2024-06-30-How%20to%20Split%20an%20Integer%20Number%20Into%20Digits%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"如何在Java中将整数拆分成单个数字 | Baeldung"}],["meta",{"property":"og:description","content":"如何在Java中将整数拆分成单个数字 | Baeldung 1. 概述 在Java中处理整数时，有时我们需要将它们拆分成单独的数字以进行各种计算或数据操作任务。 在本教程中，我们将探索使用Java将整数拆分成其构成数字的各种方法。 2. 问题介绍 像往常一样，让我们通过一个例子来理解问题。假设我们有一个整数： 我们的目标是按顺序将数字拆分成： 为简单起..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-30T17:53:26.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Integer"}],["meta",{"property":"article:tag","content":"Digits"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-30T17:53:26.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"如何在Java中将整数拆分成单个数字 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-30T17:53:26.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"如何在Java中将整数拆分成单个数字 | Baeldung 1. 概述 在Java中处理整数时，有时我们需要将它们拆分成单独的数字以进行各种计算或数据操作任务。 在本教程中，我们将探索使用Java将整数拆分成其构成数字的各种方法。 2. 问题介绍 像往常一样，让我们通过一个例子来理解问题。假设我们有一个整数： 我们的目标是按顺序将数字拆分成： 为简单起..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 问题介绍","slug":"_2-问题介绍","link":"#_2-问题介绍","children":[]},{"level":2,"title":"3. 拆分成_Integer_列表","slug":"_3-拆分成-integer-列表","link":"#_3-拆分成-integer-列表","children":[]},{"level":2,"title":"4. 拆分成_char_数组","slug":"_4-拆分成-char-数组","link":"#_4-拆分成-char-数组","children":[]},{"level":2,"title":"5. 拆分成_String_数组或_String_列表","slug":"_5-拆分成-string-数组或-string-列表","link":"#_5-拆分成-string-数组或-string-列表","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1719770006000,"updatedTime":1719770006000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.72,"words":1115},"filePathRelative":"posts/baeldung/2024-06-30/2024-06-30-How to Split an Integer Number Into Digits in Java.md","localizedDate":"2022年4月1日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>在Java中处理整数时，有时我们需要将它们拆分成单独的数字以进行各种计算或数据操作任务。</p>\\n<p>在本教程中，我们将探索使用Java将整数拆分成其构成数字的各种方法。</p>\\n<h2>2. 问题介绍</h2>\\n<p>像往常一样，让我们通过一个例子来理解问题。假设我们有一个整数：</p>\\n<div class=\\"language-text\\" data-ext=\\"text\\" data-title=\\"text\\"><pre class=\\"language-text\\"><code>int THE_NUMBER = 1230456;\\n</code></pre></div>","autoDesc":true}');export{g as comp,m as data};
