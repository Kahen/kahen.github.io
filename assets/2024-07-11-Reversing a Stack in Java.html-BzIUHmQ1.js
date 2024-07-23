import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as a,a as n}from"./app-on0L14Tx.js";const i={},s=n('<hr><h1 id="java中反转栈的不同方法" tabindex="-1"><a class="header-anchor" href="#java中反转栈的不同方法"><span>Java中反转栈的不同方法</span></a></h1><p>在这篇文章中，我们将探讨使用Java反转栈的不同方法。栈是一种后进先出（LIFO）的数据结构，支持从同一侧插入（push）和移除（pop）元素。</p><p>我们可以将栈想象成桌子上的一摞盘子；从顶部拿盘子是最安全的。</p><h2 id="_2-问题-反转栈" tabindex="-1"><a class="header-anchor" href="#_2-问题-反转栈"><span>2. 问题：反转栈</span></a></h2><p>让我们深入探讨问题陈述。我们得到一个对象的_栈_作为输入，我们需要返回元素顺序相反的栈。这里有一个例子。</p><p>输入：[1, 2, 3, 4, 5, 6, 7, 8, 9] 输出：[9, 8, 7, 6, 5, 4, 3, 2, 1] 输入是前九个自然数的栈，我们的代码输出应该是顺序相反的相同自然数。<strong>我们可以将这个问题扩展到任何类型的栈，例如，一个_字符串_元素的栈，一个自定义对象如_Node_的栈等。</strong></p><p>例如：</p><p>输入：[&quot;Red&quot;, &quot;Blue&quot;, &quot;Green&quot;, &quot;Yellow&quot;] 输出：[&quot;Yellow&quot;, &quot;Green&quot;, &quot;Blue&quot;, &quot;Red&quot;]</p><h2 id="_3-使用-队列-反转栈" tabindex="-1"><a class="header-anchor" href="#_3-使用-队列-反转栈"><span>3. 使用_队列_反转栈</span></a></h2><p>在这一部分，让我们看看如何通过使用_队列_数据结构来解决问题。_队列_是一个先进先出（FIFO）的数据结构，支持从后端添加元素和从前端移除元素。</p><p>给定一个元素的栈作为输入，<strong>我们可以一次从栈的顶部取出元素，并将它们插入到我们的队列中。</strong> 从我们的第一个自然数示例开始，我们将从指向9的栈顶部开始。我们在每一步将栈的顶部元素插入队列的后端，最终，我们将清空栈。此时，我们已经用以下顺序的元素填充了队列： (后端) [1, 2, 3, 4, 5, 6, 7, 8, 9] (前端)。</p><p>完成这项工作后，<strong>我们可以从队列中移除元素，这发生在前端，并将其推回到我们的栈上。</strong> 完成这项活动后，我们将得到我们期望的输出栈 [9, 8, 7, 6, 5, 4, 3, 2, 1]。</p><p>这是代码的样子，假设栈的类型是_Integer_：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public Stack reverseIntegerStack(Stack````&lt;Integer&gt;```` inputStack) {\n    Queue````&lt;Integer&gt;```` queue = new LinkedList&lt;&gt;();\n    while (!inputStack.isEmpty()) {\n        queue.add(inputStack.pop());\n    }\n    while (!queue.isEmpty()) {\n        inputStack.add(queue.remove());\n    }\n    return inputStack;\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-使用递归反转栈" tabindex="-1"><a class="header-anchor" href="#_4-使用递归反转栈"><span>4. 使用递归反转栈</span></a></h2><p>让我们讨论一种不使用任何额外数据结构解决问题的方法。<strong>递归是计算机科学中的核心概念，它涉及到一个方法反复调用自己，只要满足一个先决条件。</strong> 任何递归函数都应该有两个组成部分：</p><ul><li>递归调用：在我们的例子中，递归调用该方法将从给定的栈中移除元素</li><li>停止条件：当给定的栈为空时，递归将结束</li></ul><p>每次对递归方法的调用都会向JVM内存中的调用栈添加内容。我们可以利用这一事实来反转给定的栈。<strong>递归调用将从栈的顶部移除一个元素并将其添加到内存调用栈中。</strong></p><p><strong>当输入栈为空时，内存调用栈包含栈元素的逆序。</strong> 调用栈的顶部包含数字1，而最底部的调用栈包含数字10。此时，我们从调用栈中取出项目<strong>并将元素插入到栈的底部，反转元素的原始顺序。</strong></p><p>让我们看看这里的两步递归算法的代码：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>private void reverseStack(Stack````&lt;Integer&gt;```` stack) {\n    if (stack.isEmpty()) {\n        return;\n    }\n    int top = stack.pop();\n    reverseStack(stack);\n    insertBottom(stack, top);\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>reverseStack()</strong> 方法递归地从栈中弹出顶部元素。一旦输入栈为空，我们将当前在调用栈中的元素插入到栈的底部：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>private void insertBottom(Stack````&lt;Integer&gt;```` stack, int value) {\n    if (stack.isEmpty()) {\n        stack.add(value);\n    } else {\n        int top = stack.pop();\n        insertBottom(stack, value);\n        stack.add(top);\n    }\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-比较反转栈的方法" tabindex="-1"><a class="header-anchor" href="#_5-比较反转栈的方法"><span>5. 比较反转栈的方法</span></a></h2><p>我们讨论了两种反转给定栈的方法。这些算法适用于任何类型的_栈_。<strong>第一种使用额外的_队列_数据结构的解决方案在O(n)时间复杂度内反转栈。</strong> 然而，由于我们使用额外的空间形式的_队列_，空间复杂度也是O(n)。</p><p>另一方面，递归解决方案由于递归调用具有O(n²)的时间复杂度**，但由于我们使用程序调用栈来存储栈的元素，所以没有额外的空间复杂度。**</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在这篇文章中，我们讨论了在Java中反转_栈_的两种方法，并比较了算法的运行时间和空间复杂度。像往常一样，所有代码示例都可以在GitHub上找到。</p>',29),r=[s];function l(d,o){return a(),t("div",null,r)}const u=e(i,[["render",l],["__file","2024-07-11-Reversing a Stack in Java.html.vue"]]),v=JSON.parse('{"path":"/posts/baeldung/2024-07-11/2024-07-11-Reversing%20a%20Stack%20in%20Java.html","title":"Java中反转栈的不同方法","lang":"zh-CN","frontmatter":{"date":"2023-04-06T00:00:00.000Z","category":["Java","数据结构"],"tag":["栈","队列","递归"],"head":[["meta",{"name":"keywords","content":"Java, 栈, 队列, 递归, 数据结构"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-11/2024-07-11-Reversing%20a%20Stack%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中反转栈的不同方法"}],["meta",{"property":"og:description","content":"Java中反转栈的不同方法 在这篇文章中，我们将探讨使用Java反转栈的不同方法。栈是一种后进先出（LIFO）的数据结构，支持从同一侧插入（push）和移除（pop）元素。 我们可以将栈想象成桌子上的一摞盘子；从顶部拿盘子是最安全的。 2. 问题：反转栈 让我们深入探讨问题陈述。我们得到一个对象的_栈_作为输入，我们需要返回元素顺序相反的栈。这里有一个..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-11T13:41:38.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"栈"}],["meta",{"property":"article:tag","content":"队列"}],["meta",{"property":"article:tag","content":"递归"}],["meta",{"property":"article:published_time","content":"2023-04-06T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-11T13:41:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中反转栈的不同方法\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-04-06T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-11T13:41:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中反转栈的不同方法 在这篇文章中，我们将探讨使用Java反转栈的不同方法。栈是一种后进先出（LIFO）的数据结构，支持从同一侧插入（push）和移除（pop）元素。 我们可以将栈想象成桌子上的一摞盘子；从顶部拿盘子是最安全的。 2. 问题：反转栈 让我们深入探讨问题陈述。我们得到一个对象的_栈_作为输入，我们需要返回元素顺序相反的栈。这里有一个..."},"headers":[{"level":2,"title":"2. 问题：反转栈","slug":"_2-问题-反转栈","link":"#_2-问题-反转栈","children":[]},{"level":2,"title":"3. 使用_队列_反转栈","slug":"_3-使用-队列-反转栈","link":"#_3-使用-队列-反转栈","children":[]},{"level":2,"title":"4. 使用递归反转栈","slug":"_4-使用递归反转栈","link":"#_4-使用递归反转栈","children":[]},{"level":2,"title":"5. 比较反转栈的方法","slug":"_5-比较反转栈的方法","link":"#_5-比较反转栈的方法","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1720705298000,"updatedTime":1720705298000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.95,"words":1184},"filePathRelative":"posts/baeldung/2024-07-11/2024-07-11-Reversing a Stack in Java.md","localizedDate":"2023年4月6日","excerpt":"<hr>\\n<h1>Java中反转栈的不同方法</h1>\\n<p>在这篇文章中，我们将探讨使用Java反转栈的不同方法。栈是一种后进先出（LIFO）的数据结构，支持从同一侧插入（push）和移除（pop）元素。</p>\\n<p>我们可以将栈想象成桌子上的一摞盘子；从顶部拿盘子是最安全的。</p>\\n<h2>2. 问题：反转栈</h2>\\n<p>让我们深入探讨问题陈述。我们得到一个对象的_栈_作为输入，我们需要返回元素顺序相反的栈。这里有一个例子。</p>\\n<p>输入：[1, 2, 3, 4, 5, 6, 7, 8, 9]\\n输出：[9, 8, 7, 6, 5, 4, 3, 2, 1]\\n输入是前九个自然数的栈，我们的代码输出应该是顺序相反的相同自然数。<strong>我们可以将这个问题扩展到任何类型的栈，例如，一个_字符串_元素的栈，一个自定义对象如_Node_的栈等。</strong></p>","autoDesc":true}');export{u as comp,v as data};
