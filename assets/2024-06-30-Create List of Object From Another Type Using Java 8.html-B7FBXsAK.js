import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-BUAgDejY.js";const p={},e=t(`<h1 id="使用java-8从另一种类型创建对象列表" tabindex="-1"><a class="header-anchor" href="#使用java-8从另一种类型创建对象列表"><span>使用Java 8从另一种类型创建对象列表</span></a></h1><p>当我们使用Java工作时，有时我们想要根据另一个对象列表生成一个列表。Java 8引入了一系列新功能，简化了此类操作。</p><p>因此，本教程将探讨如何使用Java 8及以后版本中引入的强大功能，基于给定列表创建不同类型对象的列表。</p><h2 id="_2-问题介绍" tabindex="-1"><a class="header-anchor" href="#_2-问题介绍"><span>2. 问题介绍</span></a></h2><p>像往常一样，我们通过示例来理解问题。</p><p>假设一家公司想要启动一个内部网球比赛。现在，比赛委员会想要从所有公司员工中获取一个球员候选人名单。因此，我们将承担这项任务，并创建一个程序来构建球员候选人名单。</p><p><em>Employee</em> 类已经准备好了：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Getter</span>
<span class="token keyword">class</span> <span class="token class-name">Employee</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">Set</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\` hobbies <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashSet</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">String</span> email<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> department<span class="token punctuation">;</span>
    <span class="token comment">// ...其他属性</span>

    <span class="token keyword">public</span> <span class="token class-name">Employee</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token class-name">String</span> email<span class="token punctuation">,</span> <span class="token class-name">Collection</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\` hobbies<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>email <span class="token operator">=</span> email<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>hobbies<span class="token punctuation">.</span><span class="token function">addAll</span><span class="token punctuation">(</span>hobbies<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如上面的代码所示，我们使用Lombok的_@Getter_注解使_Employee_类具有所有属性的getter方法。</p><p>每个_Employee_对象都带有_hobbies_Set_，它以_String_形式保存员工的爱好。我们的任务是遍历员工。<strong>如果员工将“<em>Tennis</em>”列为他们的爱好之一，我们认为他们是参加比赛的潜在候选人。</strong> 因此，最后我们将拥有一个_TennisPlayerCandidate_实例列表：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">TennisPlayerCandidate</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">String</span> email<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">Boolean</span> confirmed <span class="token operator">=</span> <span class="token class-name">Boolean</span><span class="token punctuation">.</span><span class="token constant">FALSE</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token class-name">TennisPlayerCandidate</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token class-name">String</span> email<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>email <span class="token operator">=</span> email<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

  <span class="token comment">// 省略了equals()和hashcode()方法</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>假设我们的输入，_EMPLOYEES_列表包含五个对象：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">final</span> <span class="token keyword">static</span> <span class="token class-name">List</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Employee</span><span class="token punctuation">&gt;</span></span>\`\` <span class="token constant">EMPLOYEES</span> <span class="token operator">=</span> <span class="token class-name">Lists</span><span class="token punctuation">.</span><span class="token function">newArrayList</span><span class="token punctuation">(</span>
  <span class="token keyword">new</span> <span class="token class-name">Employee</span><span class="token punctuation">(</span><span class="token string">&quot;Kai&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;kai@company.com&quot;</span><span class="token punctuation">,</span> <span class="token class-name">Lists</span><span class="token punctuation">.</span><span class="token function">newArrayList</span><span class="token punctuation">(</span><span class="token string">&quot;Football&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Reading&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Chess&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token keyword">new</span> <span class="token class-name">Employee</span><span class="token punctuation">(</span><span class="token string">&quot;Eric&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;eric@company.com&quot;</span><span class="token punctuation">,</span> <span class="token class-name">Lists</span><span class="token punctuation">.</span><span class="token function">newArrayList</span><span class="token punctuation">(</span><span class="token string">&quot;Tennis&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Baseball&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Singing&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token keyword">new</span> <span class="token class-name">Employee</span><span class="token punctuation">(</span><span class="token string">&quot;Saajan&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;saajan@company.com&quot;</span><span class="token punctuation">,</span> <span class="token class-name">Lists</span><span class="token punctuation">.</span><span class="token function">newArrayList</span><span class="token punctuation">(</span><span class="token string">&quot;Tennis&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Baseball&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Reading&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token keyword">new</span> <span class="token class-name">Employee</span><span class="token punctuation">(</span><span class="token string">&quot;Kevin&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;kevin@company.com&quot;</span><span class="token punctuation">,</span> <span class="token class-name">Lists</span><span class="token punctuation">.</span><span class="token function">newArrayList</span><span class="token punctuation">(</span><span class="token string">&quot;Dancing&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Computer Games&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Tennis&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token keyword">new</span> <span class="token class-name">Employee</span><span class="token punctuation">(</span><span class="token string">&quot;Amanda&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;amanda@company.com&quot;</span><span class="token punctuation">,</span> <span class="token class-name">Lists</span><span class="token punctuation">.</span><span class="token function">newArrayList</span><span class="token punctuation">(</span><span class="token string">&quot;Painting&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Yoga&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Dancing&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>基于此输入，我们的目标是获得这个_TennisPlayerCandidate_实例列表：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">final</span> <span class="token keyword">static</span> <span class="token class-name">List</span>\`\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">TennisPlayerCandidate</span><span class="token punctuation">&gt;</span></span>\`\`\`\`\` <span class="token constant">EXPECTED</span> <span class="token operator">=</span> <span class="token class-name">Lists</span><span class="token punctuation">.</span><span class="token function">newArrayList</span><span class="token punctuation">(</span>
  <span class="token keyword">new</span> <span class="token class-name">TennisPlayerCandidate</span><span class="token punctuation">(</span><span class="token string">&quot;Eric&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;eric@company.com&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token keyword">new</span> <span class="token class-name">TennisPlayerCandidate</span><span class="token punctuation">(</span><span class="token string">&quot;Saajan&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;saajan@company.com&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token keyword">new</span> <span class="token class-name">TennisPlayerCandidate</span><span class="token punctuation">(</span><span class="token string">&quot;Kevin&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;kevin@company.com&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们看看从给定的_List<code>&lt;Employee&gt;</code>_构建预期的_List<code>&lt;TennisPlayerCandidate&gt;</code>_的不同解决方案。</p><p>为了简单起见，我们将使用单元测试断言来验证每种方法是否能够产生预期的结果。</p><h2 id="_3-使用-list-foreach-方法" tabindex="-1"><a class="header-anchor" href="#_3-使用-list-foreach-方法"><span>3. 使用_List.forEach()_方法</span></a></h2><p>解决这个问题的一个直接方法是<strong>首先初始化一个空的候选人列表</strong>。然后，我们遍历_EMPLOYEES_列表，<strong>为每个将网球列为爱好的员工创建一个_TennisPlayerCandidate_对象</strong>。如果他们满足这个标准，我们将员工添加到候选人列表中。</p><p>Java 8引入了_forEach()_方法，它允许我们在遍历列表时方便地执行操作：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>\`\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">TennisPlayerCandidate</span><span class="token punctuation">&gt;</span></span>\`\`\`\`\` result <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token constant">EMPLOYEES</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>e <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>e<span class="token punctuation">.</span><span class="token function">getHobbies</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">&quot;Tennis&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        result<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">TennisPlayerCandidate</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> e<span class="token punctuation">.</span><span class="token function">getEmail</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token constant">EXPECTED</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，这种方法有效地完成了工作。</p><p>除了_forEach()_方法，自Java 8以来，Stream API彻底改变了我们操作和转换数据集合的方式。</p><p>接下来，让我们使用Stream API来解决问题。</p><h2 id="_4-使用-stream-map-或-collectors-mapping" tabindex="-1"><a class="header-anchor" href="#_4-使用-stream-map-或-collectors-mapping"><span>4. 使用_Stream.map()<em>或_Collectors.mapping()</em></span></a></h2><p>我们可以这样理解问题：<strong>过滤那些爱好包括网球的员工，并将这些_Employee_对象转换为_TennisPlayerCandidate_对象。</strong></p><p>Stream的_filter()_和_map()_方法可以轻松支持我们完成任务。接下来，让我们将这个想法“翻译”成Java代码：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>\`\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">TennisPlayerCandidate</span><span class="token punctuation">&gt;</span></span>\`\`\`\`\` result <span class="token operator">=</span> <span class="token constant">EMPLOYEES</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>e <span class="token operator">-&gt;</span> e<span class="token punctuation">.</span><span class="token function">getHobbies</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">&quot;Tennis&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>e <span class="token operator">-&gt;</span> <span class="token keyword">new</span> <span class="token class-name">TennisPlayerCandidate</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> e<span class="token punctuation">.</span><span class="token function">getEmail</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token constant">EXPECTED</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如上面的代码所示，为_TennisPlayerCandidate_对象准备一个空列表是不必要的。<strong>filter().map()<em>流水线提供了一个_TennisPlayerCandidate_实例的_Stream</em></strong>。我们需要做的就是将对象收集到一个列表中。</p><p>或者，我们可以将映射逻辑移到收集阶段。换句话说，<strong>我们在收集时将过滤后的_Employee_实例转换为_TennisPlayerCandidate_。</strong></p><p><strong>_Collectors.mapping()_方法允许我们执行对象转换和从_Stream_收集</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>\`\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">TennisPlayerCandidate</span><span class="token punctuation">&gt;</span></span>\`\`\`\`\` result <span class="token operator">=</span> <span class="token constant">EMPLOYEES</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>e <span class="token operator">-&gt;</span> e<span class="token punctuation">.</span><span class="token function">getHobbies</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">&quot;Tennis&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">mapping</span><span class="token punctuation">(</span>e <span class="token operator">-&gt;</span> <span class="token keyword">new</span> <span class="token class-name">TennisPlayerCandidate</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> e<span class="token punctuation">.</span><span class="token function">getEmail</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token constant">EXPECTED</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们探讨了三种基于给定列表创建不同类型对象列表的方法。通过示例，我们了解到当在Java中使用列表时，Stream API提高了代码的生产力和可读性。</p><p>像往常一样，示例的完整源代码可以在GitHub上找到。</p>`,35),o=[e];function c(l,i){return a(),s("div",null,o)}const r=n(p,[["render",c],["__file","2024-06-30-Create List of Object From Another Type Using Java 8.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-06-30/2024-06-30-Create%20List%20of%20Object%20From%20Another%20Type%20Using%20Java%208.html","title":"使用Java 8从另一种类型创建对象列表","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Java 8"],"tag":["Java","List","Stream API"],"head":[["meta",{"name":"keywords","content":"Java, Java 8, List, Stream API"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-30/2024-06-30-Create%20List%20of%20Object%20From%20Another%20Type%20Using%20Java%208.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用Java 8从另一种类型创建对象列表"}],["meta",{"property":"og:description","content":"使用Java 8从另一种类型创建对象列表 当我们使用Java工作时，有时我们想要根据另一个对象列表生成一个列表。Java 8引入了一系列新功能，简化了此类操作。 因此，本教程将探讨如何使用Java 8及以后版本中引入的强大功能，基于给定列表创建不同类型对象的列表。 2. 问题介绍 像往常一样，我们通过示例来理解问题。 假设一家公司想要启动一个内部网球比..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-30T21:29:50.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"List"}],["meta",{"property":"article:tag","content":"Stream API"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-30T21:29:50.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用Java 8从另一种类型创建对象列表\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-30T21:29:50.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用Java 8从另一种类型创建对象列表 当我们使用Java工作时，有时我们想要根据另一个对象列表生成一个列表。Java 8引入了一系列新功能，简化了此类操作。 因此，本教程将探讨如何使用Java 8及以后版本中引入的强大功能，基于给定列表创建不同类型对象的列表。 2. 问题介绍 像往常一样，我们通过示例来理解问题。 假设一家公司想要启动一个内部网球比..."},"headers":[{"level":2,"title":"2. 问题介绍","slug":"_2-问题介绍","link":"#_2-问题介绍","children":[]},{"level":2,"title":"3. 使用_List.forEach()_方法","slug":"_3-使用-list-foreach-方法","link":"#_3-使用-list-foreach-方法","children":[]},{"level":2,"title":"4. 使用_Stream.map()或_Collectors.mapping()","slug":"_4-使用-stream-map-或-collectors-mapping","link":"#_4-使用-stream-map-或-collectors-mapping","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1719782990000,"updatedTime":1719782990000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.74,"words":1121},"filePathRelative":"posts/baeldung/2024-06-30/2024-06-30-Create List of Object From Another Type Using Java 8.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>当我们使用Java工作时，有时我们想要根据另一个对象列表生成一个列表。Java 8引入了一系列新功能，简化了此类操作。</p>\\n<p>因此，本教程将探讨如何使用Java 8及以后版本中引入的强大功能，基于给定列表创建不同类型对象的列表。</p>\\n<h2>2. 问题介绍</h2>\\n<p>像往常一样，我们通过示例来理解问题。</p>\\n<p>假设一家公司想要启动一个内部网球比赛。现在，比赛委员会想要从所有公司员工中获取一个球员候选人名单。因此，我们将承担这项任务，并创建一个程序来构建球员候选人名单。</p>\\n<p><em>Employee</em> 类已经准备好了：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token annotation punctuation\\">@Getter</span>\\n<span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">Employee</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">private</span> <span class=\\"token keyword\\">final</span> <span class=\\"token class-name\\">String</span> name<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">private</span> <span class=\\"token keyword\\">final</span> <span class=\\"token class-name\\">Set</span>``<span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">String</span><span class=\\"token punctuation\\">&gt;</span></span>`` hobbies <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">HashSet</span><span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token punctuation\\">&gt;</span></span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">private</span> <span class=\\"token keyword\\">final</span> <span class=\\"token class-name\\">String</span> email<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">private</span> <span class=\\"token class-name\\">String</span> department<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token comment\\">// ...其他属性</span>\\n\\n    <span class=\\"token keyword\\">public</span> <span class=\\"token class-name\\">Employee</span><span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">String</span> name<span class=\\"token punctuation\\">,</span> <span class=\\"token class-name\\">String</span> email<span class=\\"token punctuation\\">,</span> <span class=\\"token class-name\\">Collection</span>``<span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">String</span><span class=\\"token punctuation\\">&gt;</span></span>`` hobbies<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token keyword\\">this</span><span class=\\"token punctuation\\">.</span>name <span class=\\"token operator\\">=</span> name<span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token keyword\\">this</span><span class=\\"token punctuation\\">.</span>email <span class=\\"token operator\\">=</span> email<span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token keyword\\">this</span><span class=\\"token punctuation\\">.</span>hobbies<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">addAll</span><span class=\\"token punctuation\\">(</span>hobbies<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{r as comp,d as data};
