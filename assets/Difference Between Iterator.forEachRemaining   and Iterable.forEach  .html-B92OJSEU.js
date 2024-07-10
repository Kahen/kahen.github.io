import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as e,a as t}from"./app-B_O3I5S1.js";const s={},o=t(`<h1 id="java中iterator-foreachremaining-与iterable-foreach-的区别-baeldung" tabindex="-1"><a class="header-anchor" href="#java中iterator-foreachremaining-与iterable-foreach-的区别-baeldung"><span>Java中Iterator.forEachRemaining()与Iterable.forEach()的区别 | Baeldung</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>_Iterator_和_Iterable_接口是Java中处理集合的基本构造。实际上，每个接口都提供了遍历元素的方法，但它们有不同的目的和使用场景。</p><p><strong>在本教程中，我们将深入探讨_Iterator.forEachRemaining()_和_Iterable.forEach()_之间的差异，以理解它们独特的功能。</strong></p><h2 id="_2-iterator-foreachremaining-方法" tabindex="-1"><a class="header-anchor" href="#_2-iterator-foreachremaining-方法"><span>2. _Iterator.forEachRemaining()_方法</span></a></h2><p>_Iterator_接口提供了一种顺序遍历集合元素的方式。_Iterator_接口中的_forEachRemaining()_方法是在Java 8中引入的。</p><p><strong>此外，它提供了一种简洁的方式来对迭代器中的每个剩余元素执行操作。此外，它接受一个_Consumer_函数式接口作为参数，代表对每个元素执行的操作。</strong></p><p>假设我们有以下员工详细信息，并希望处理它们以生成一个简单的报告：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">List</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\` employeeDetails <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span>
    <span class="token string">&quot;Alice Johnson, 30, Manager&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;Bob Smith, 25, Developer&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;Charlie Brown, 28, Designer&quot;</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> expectedReport <span class="token operator">=</span>
    <span class="token string">&quot;Employee: Alice Johnson, 30, Manager\\n&quot;</span> <span class="token operator">+</span>
    <span class="token string">&quot;Employee: Bob Smith, 25, Developer\\n&quot;</span> <span class="token operator">+</span>
    <span class="token string">&quot;Employee: Charlie Brown, 28, Designer\\n&quot;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们初始化了一个员工详细信息列表，并指定了一个预期报告格式，每个员工信息格式化为(<strong>员工：姓名，年龄，职位</strong>)。</p><p>现在，让我们使用_Iterator.forEachRemaining()_方法遍历_employeeDetails_列表并生成报告：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenEmployeeDetails_whenUsingIterator_thenGenerateEmployeeReport</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">StringBuilder</span> report <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    employeeDetails<span class="token punctuation">.</span><span class="token function">iterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEachRemaining</span><span class="token punctuation">(</span>employee <span class="token operator">-&gt;</span>
        report<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot;Employee: &quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span>employee<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot;\\n&quot;</span><span class="token punctuation">)</span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span>expectedReport<span class="token punctuation">,</span> report<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个测试方法中，我们处理迭代器中的每个元素，将格式化的员工信息附加到_StringBuilder_ <em>report</em>。对于_employeeDetails_列表中的每个员工详细信息字符串，该方法附加前缀“<strong>员工：</strong>”后跟员工详细信息和一个换行符。</p><p>生成报告后，我们使用_assertEquals()_断言来验证生成的报告(<em>report</em>)是否与预期报告(<em>expectedReport</em>)匹配。</p><h2 id="_3-iterable-foreach-方法" tabindex="-1"><a class="header-anchor" href="#_3-iterable-foreach-方法"><span>3. _Iterable.forEach()_方法</span></a></h2><p>Java中的_Iterable_接口表示可以遍历的对象集合。_Iterable_接口中的_forEach()_方法也是在Java 8中引入的。</p><p><strong>默认方法允许我们对集合中的每个元素执行操作。像_Iterator.forEachRemaining()_一样，它也使用_Consumer_函数式接口作为参数。</strong></p><p>为了提供上下文，让我们看看实现：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenEmployeeDetails_whenUsingForEach_thenGenerateEmployeeReport</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">StringBuilder</span> report <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    employeeDetails<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>employee <span class="token operator">-&gt;</span>
        report<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot;Employee: &quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span>employee<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot;\\n&quot;</span><span class="token punctuation">)</span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span>expectedReport<span class="token punctuation">,</span> report<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在_forEach()_方法中，我们使用lambda表达式将每个格式化的员工详细信息附加到_StringBuilder_的报告中。</p><p>与_Iterator.forEachRemaining()_类似，这里的lambda表达式接收每个元素作为输入，我们执行相同的格式化操作，即前缀“<strong>员工：</strong>”后跟员工详细信息和一个换行符。</p><h2 id="_4-关键差异" tabindex="-1"><a class="header-anchor" href="#_4-关键差异"><span>4. 关键差异</span></a></h2><p>以下表格简洁地总结了基于它们的使用、实现和灵活性，_Iterator.forEachRemaining()_和_Iterable.forEach()_之间的区别：</p><table><thead><tr><th>关键差异</th><th><em>Iterator.forEachRemaining()</em></th><th><em>Iterable.forEach()</em></th></tr></thead><tbody><tr><td>使用</td><td>我们可以使用它来对迭代器中的每个剩余元素执行操作。</td><td>我们可以直接使用它来对集合中的每个元素执行操作，而无需显式使用迭代器。</td></tr><tr><td>实现</td><td>特定于_Iterator_接口，直接在迭代器实例上操作。</td><td>是可迭代接口的默认方法，直接在可迭代集合上操作。</td></tr><tr><td>灵活性</td><td>当使用迭代器遍历集合的子集时很有用。</td><td>直接与集合一起工作更方便，特别是当使用lambda表达式时。</td></tr></tbody></table><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们讨论了_Iterator.forEachRemaining()_和_Iterable.forEach()_这两种方法来遍历集合中的元素。根据我们是直接使用迭代器还是集合来选择适当的方法，可以基于用户偏好。</p><p>如往常一样，本文的完整代码示例可以在GitHub上找到。</p>`,28),p=[o];function r(i,c){return e(),n("div",null,p)}const d=a(s,[["render",r],["__file","Difference Between Iterator.forEachRemaining   and Iterable.forEach  .html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/Archive/Difference%20Between%20Iterator.forEachRemaining%20%20%20and%20Iterable.forEach%20%20.html","title":"Java中Iterator.forEachRemaining()与Iterable.forEach()的区别 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-06-14T00:00:00.000Z","category":["Java"],"tag":["Iterator","Iterable"],"description":"Java中Iterator.forEachRemaining()与Iterable.forEach()的区别 | Baeldung 1. 引言 _Iterator_和_Iterable_接口是Java中处理集合的基本构造。实际上，每个接口都提供了遍历元素的方法，但它们有不同的目的和使用场景。 在本教程中，我们将深入探讨_Iterator.forEach...","head":[["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/Difference%20Between%20Iterator.forEachRemaining%20%20%20and%20Iterable.forEach%20%20.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中Iterator.forEachRemaining()与Iterable.forEach()的区别 | Baeldung"}],["meta",{"property":"og:description","content":"Java中Iterator.forEachRemaining()与Iterable.forEach()的区别 | Baeldung 1. 引言 _Iterator_和_Iterable_接口是Java中处理集合的基本构造。实际上，每个接口都提供了遍历元素的方法，但它们有不同的目的和使用场景。 在本教程中，我们将深入探讨_Iterator.forEach..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Iterator"}],["meta",{"property":"article:tag","content":"Iterable"}],["meta",{"property":"article:published_time","content":"2024-06-14T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中Iterator.forEachRemaining()与Iterable.forEach()的区别 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-14T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]]},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. _Iterator.forEachRemaining()_方法","slug":"_2-iterator-foreachremaining-方法","link":"#_2-iterator-foreachremaining-方法","children":[]},{"level":2,"title":"3. _Iterable.forEach()_方法","slug":"_3-iterable-foreach-方法","link":"#_3-iterable-foreach-方法","children":[]},{"level":2,"title":"4. 关键差异","slug":"_4-关键差异","link":"#_4-关键差异","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":3.15,"words":946},"filePathRelative":"posts/baeldung/Archive/Difference Between Iterator.forEachRemaining   and Iterable.forEach  .md","localizedDate":"2024年6月14日","excerpt":"\\n<h2>1. 引言</h2>\\n<p>_Iterator_和_Iterable_接口是Java中处理集合的基本构造。实际上，每个接口都提供了遍历元素的方法，但它们有不同的目的和使用场景。</p>\\n<p><strong>在本教程中，我们将深入探讨_Iterator.forEachRemaining()_和_Iterable.forEach()_之间的差异，以理解它们独特的功能。</strong></p>\\n<h2>2. _Iterator.forEachRemaining()_方法</h2>\\n<p>_Iterator_接口提供了一种顺序遍历集合元素的方式。_Iterator_接口中的_forEachRemaining()_方法是在Java 8中引入的。</p>","autoDesc":true}');export{d as comp,m as data};
