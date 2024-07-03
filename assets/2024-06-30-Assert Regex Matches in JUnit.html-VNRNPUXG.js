import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as t}from"./app-D1jsmMBg.js";const e={},c=t(`<h1 id="junit中断言正则表达式匹配的方法" tabindex="-1"><a class="header-anchor" href="#junit中断言正则表达式匹配的方法"><span>JUnit中断言正则表达式匹配的方法</span></a></h1><p>JUnit 成为许多开发者首选的Java代码单元测试工具。在现实世界场景中，一个常见的测试需求是验证给定的字符串是否符合特定的正则表达式（regex）模式。</p><p>在本教程中，我们将探讨在JUnit中断言正则表达式匹配的几种方法，使我们能够有效地测试我们的字符串模式。</p><h2 id="_2-问题介绍" tabindex="-1"><a class="header-anchor" href="#_2-问题介绍"><span>2. 问题介绍</span></a></h2><p>问题相当简单：我们希望有一种自然而有效的方法来确认输入字符串与特定正则表达式模式一致。理想情况下，我们还应该有一种可靠的方法来断言相反的情况，即输入字符串不匹配正则表达式模式。</p><p>让我们首先探索广泛使用的JUnit 5框架，并学习如何使用其标准特性执行正则表达式模式匹配的断言。此外，我们将讨论在使用JUnit 5进行此类断言时可能遇到的一个潜在陷阱。</p><p>除了JUnit 5，还有一些方便且补充的测试和断言库，它们与JUnit 5无缝集成。在本教程中，我们将重点关注这两个流行的外部库。我们将探讨在这些库的上下文中如何断言正则表达式模式匹配，扩展我们高效测试的工具箱。</p><h2 id="_3-使用标准的junit-5方法" tabindex="-1"><a class="header-anchor" href="#_3-使用标准的junit-5方法"><span>3. 使用标准的JUnit 5方法</span></a></h2><p>JUnit 5在<code>org.junit.jupiter.api.Assertions</code>包中提供了一系列常用断言，如<code>assertSame()</code>、<code>assertEquals()</code>等。</p><p>然而，JUnit 5缺少像<code>assertMatches()</code>这样的专用断言方法用于正则表达式模式验证。由于<code>String.matches()</code>方法返回一个布尔值，我们可以利用<code>assertTrue()</code>方法确保字符串匹配正则表达式模式：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token string">&quot;Java at Baeldung&quot;</span><span class="token punctuation">.</span><span class="token function">matches</span><span class="token punctuation">(</span><span class="token string">&quot;.* at Baeldung$&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>毫不意外地，如果我们想要断言字符串不匹配正则表达式模式，我们可以使用<code>assertFalse()</code>断言：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertFalse</span><span class="token punctuation">(</span><span class="token string">&quot;something else&quot;</span><span class="token punctuation">.</span><span class="token function">matches</span><span class="token punctuation">(</span><span class="token string">&quot;.* at Baeldung$&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_4-为什么我们不应该使用assertlinesmatch-方法进行正则表达式匹配测试" tabindex="-1"><a class="header-anchor" href="#_4-为什么我们不应该使用assertlinesmatch-方法进行正则表达式匹配测试"><span>4. 为什么我们不应该使用<code>assertLinesMatch()</code>方法进行正则表达式匹配测试</span></a></h2><p>虽然我们之前提到JUnit 5缺少专用的正则表达式模式断言方法，一些人可能不同意这一说法。JUnit 5确实提供了<code>assertLinesMatch()</code>方法，它可以在文本行中验证正则表达式模式匹配，例如：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertLinesMatch</span><span class="token punctuation">(</span><span class="token class-name">List</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;.* at Baeldung$&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">List</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;Kotlin at Baeldung&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>正如上面的例子所示，由于该方法接受两个字符串列表（预期列表和实际列表），我们将正则表达式模式和输入字符串包装在列表中，测试通过了。</p><p>然而，值得注意的是，使用<code>assertLinesMatch()</code>方法进行正则表达式匹配测试是不安全的。一个例子可以快速展示这一点：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertFalse</span><span class="token punctuation">(</span><span class="token string">&quot;.* at Baeldung$&quot;</span><span class="token punctuation">.</span><span class="token function">matches</span><span class="token punctuation">(</span><span class="token string">&quot;.* at Baeldung$&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertLinesMatch</span><span class="token punctuation">(</span><span class="token class-name">List</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;.* at Baeldung$&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">List</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;.* at Baeldung$&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的例子中，我们的输入字符串和正则表达式模式是相同的：&quot;.* at Baeldung$&quot;。显然，输入不匹配模式，因为输入字符串以&#39;$&#39;字符结束，而不是&quot;Baeldung&quot;。所以，<code>assertFalse()</code>断言通过了。</p><p>然后，我们将相同的输入和正则表达式模式传递给<code>assertLinesMatch()</code>方法，断言通过了！这是因为<code>assertLinesMatch()</code>按以下三个步骤验证预期列表和实际列表中的每对字符串：</p><ol><li>如果预期字符串等于实际字符串，则继续下一对。</li><li>否则，将预期字符串视为正则表达式模式并检查<code>actualString.matches(expectedString)</code>。如果结果为真，则继续下一对。</li><li>否则，如果预期字符串是快进标记，相应地快进实际行，并从第一步开始。</li></ol><p>我们不会深入使用<code>assertLinesMatches()</code>方法。正如上述步骤所示，正则表达式模式测试在第二步执行。在我们的示例中，实际字符串，即输入，和预期字符串，即正则表达式模式，是相等的。因此，第一步通过了。也就是说，断言在根本没有应用正则匹配检查的情况下通过了。</p><p>所以，<code>assertLinesMatch()</code>方法不是验证正则表达式模式匹配的正确断言方法。</p><h2 id="_5-使用assertj的matches-方法" tabindex="-1"><a class="header-anchor" href="#_5-使用assertj的matches-方法"><span>5. 使用AssertJ的<code>matches()</code>方法</span></a></h2><p>使用流行的AssertJ库，我们可以快速编写流畅的断言。<strong>AssertJ提供了<code>matches()</code>方法来测试正则表达式模式：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token comment">// assertThat()下面的内容从org.assertj.core.api.Assertions导入</span>
<span class="token function">assertThat</span><span class="token punctuation">(</span><span class="token string">&quot;Linux at Baeldung&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">matches</span><span class="token punctuation">(</span><span class="token string">&quot;.* at Baeldung$&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>顾名思义，<code>doesNotMatch()</code>方法允许我们执行否定测试场景：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertThat</span><span class="token punctuation">(</span><span class="token string">&quot;something unrelated&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">doesNotMatch</span><span class="token punctuation">(</span><span class="token string">&quot;.* at Baeldung$&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_6-使用hamcrest的matchespattern-方法" tabindex="-1"><a class="header-anchor" href="#_6-使用hamcrest的matchespattern-方法"><span>6. 使用Hamcrest的<code>matchesPattern()</code>方法</span></a></h2><p>同样，Hamcrest是另一个广泛使用的测试框架。它也提供了<code>matchesPattern()</code>方法用于正则匹配测试：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token comment">// assertThat()下面的内容从org.hamcrest.MatcherAssert导入</span>
<span class="token function">assertThat</span><span class="token punctuation">(</span><span class="token string">&quot;Computer science at Baeldung&quot;</span><span class="token punctuation">,</span> <span class="token function">matchesPattern</span><span class="token punctuation">(</span><span class="token string">&quot;.* at Baeldung$&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>要执行否定的正则匹配测试，我们可以使用<code>not()</code>来否定由<code>matchesPattern()</code>创建的<code>Matcher</code>：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertThat</span><span class="token punctuation">(</span><span class="token string">&quot;something unrelated&quot;</span><span class="token punctuation">,</span> <span class="token function">not</span><span class="token punctuation">(</span><span class="token function">matchesPattern</span><span class="token punctuation">(</span><span class="token string">&quot;.* at Baeldung$&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_7-结论" tabindex="-1"><a class="header-anchor" href="#_7-结论"><span>7. 结论</span></a></h2><p>在本文中，我们探讨了不同的断言正则表达式模式匹配的方法。</p><p>两个常用的库，AssertJ和Hamcrest，提供了专用的正则匹配测试方法。另一方面，如果我们希望最小化外部依赖，JUnit 5的<code>assertTrue()</code>结合<code>String.matches()</code>方法也可以实现相同的目标。</p><p>此外，我们讨论了我们不应该使用JUnit 5的<code>assertLinesMatch()</code>进行正则表达式匹配测试。</p><p>如往常一样，示例的完整源代码可以在GitHub上找到。</p>`,39),p=[c];function o(i,l){return s(),n("div",null,p)}const d=a(e,[["render",o],["__file","2024-06-30-Assert Regex Matches in JUnit.html.vue"]]),h=JSON.parse('{"path":"/posts/baeldung/2024-06-30/2024-06-30-Assert%20Regex%20Matches%20in%20JUnit.html","title":"JUnit中断言正则表达式匹配的方法","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["JUnit","正则表达式"],"tag":["JUnit","正则表达式","断言"],"head":[["meta",{"name":"keywords","content":"JUnit, 正则表达式, 断言, 测试"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-30/2024-06-30-Assert%20Regex%20Matches%20in%20JUnit.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"JUnit中断言正则表达式匹配的方法"}],["meta",{"property":"og:description","content":"JUnit中断言正则表达式匹配的方法 JUnit 成为许多开发者首选的Java代码单元测试工具。在现实世界场景中，一个常见的测试需求是验证给定的字符串是否符合特定的正则表达式（regex）模式。 在本教程中，我们将探讨在JUnit中断言正则表达式匹配的几种方法，使我们能够有效地测试我们的字符串模式。 2. 问题介绍 问题相当简单：我们希望有一种自然而有..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-30T13:30:09.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"JUnit"}],["meta",{"property":"article:tag","content":"正则表达式"}],["meta",{"property":"article:tag","content":"断言"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-30T13:30:09.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"JUnit中断言正则表达式匹配的方法\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-30T13:30:09.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"JUnit中断言正则表达式匹配的方法 JUnit 成为许多开发者首选的Java代码单元测试工具。在现实世界场景中，一个常见的测试需求是验证给定的字符串是否符合特定的正则表达式（regex）模式。 在本教程中，我们将探讨在JUnit中断言正则表达式匹配的几种方法，使我们能够有效地测试我们的字符串模式。 2. 问题介绍 问题相当简单：我们希望有一种自然而有..."},"headers":[{"level":2,"title":"2. 问题介绍","slug":"_2-问题介绍","link":"#_2-问题介绍","children":[]},{"level":2,"title":"3. 使用标准的JUnit 5方法","slug":"_3-使用标准的junit-5方法","link":"#_3-使用标准的junit-5方法","children":[]},{"level":2,"title":"4. 为什么我们不应该使用assertLinesMatch()方法进行正则表达式匹配测试","slug":"_4-为什么我们不应该使用assertlinesmatch-方法进行正则表达式匹配测试","link":"#_4-为什么我们不应该使用assertlinesmatch-方法进行正则表达式匹配测试","children":[]},{"level":2,"title":"5. 使用AssertJ的matches()方法","slug":"_5-使用assertj的matches-方法","link":"#_5-使用assertj的matches-方法","children":[]},{"level":2,"title":"6. 使用Hamcrest的matchesPattern()方法","slug":"_6-使用hamcrest的matchespattern-方法","link":"#_6-使用hamcrest的matchespattern-方法","children":[]},{"level":2,"title":"7. 结论","slug":"_7-结论","link":"#_7-结论","children":[]}],"git":{"createdTime":1719754209000,"updatedTime":1719754209000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.78,"words":1433},"filePathRelative":"posts/baeldung/2024-06-30/2024-06-30-Assert Regex Matches in JUnit.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>JUnit 成为许多开发者首选的Java代码单元测试工具。在现实世界场景中，一个常见的测试需求是验证给定的字符串是否符合特定的正则表达式（regex）模式。</p>\\n<p>在本教程中，我们将探讨在JUnit中断言正则表达式匹配的几种方法，使我们能够有效地测试我们的字符串模式。</p>\\n<h2>2. 问题介绍</h2>\\n<p>问题相当简单：我们希望有一种自然而有效的方法来确认输入字符串与特定正则表达式模式一致。理想情况下，我们还应该有一种可靠的方法来断言相反的情况，即输入字符串不匹配正则表达式模式。</p>\\n<p>让我们首先探索广泛使用的JUnit 5框架，并学习如何使用其标准特性执行正则表达式模式匹配的断言。此外，我们将讨论在使用JUnit 5进行此类断言时可能遇到的一个潜在陷阱。</p>","autoDesc":true}');export{d as comp,h as data};
