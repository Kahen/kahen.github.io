import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-CtR6X2Br.js";const e={},p=t(`<h1 id="junit5中的assertall-与多个断言的比较" tabindex="-1"><a class="header-anchor" href="#junit5中的assertall-与多个断言的比较"><span>JUnit5中的assertAll()与多个断言的比较</span></a></h1><p>当编写单元测试时，我们有时会对输出提供多个断言。当这些断言中的任何一个失败时，测试就会停止。这意味着我们无法知道后面的断言是否会通过或失败，这可能会增加调试时间。</p><p>我们可以通过将多个断言包装成单个动作来解决这个问题。</p><p>在这个简短的教程中，我们将学习如何在JUnit5中使用引入的assertAll()方法，并看到它与使用多个断言的不同之处。</p><h2 id="_2-模型" tabindex="-1"><a class="header-anchor" href="#_2-模型"><span>2. 模型</span></a></h2><p>我们将使用一个_User_类来帮助我们的例子：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">User</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> username<span class="token punctuation">;</span>
    <span class="token class-name">String</span> email<span class="token punctuation">;</span>
    <span class="token keyword">boolean</span> activated<span class="token punctuation">;</span>
    <span class="token comment">//构造函数</span>
   <span class="token comment">//getters和setters</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-使用多个断言" tabindex="-1"><a class="header-anchor" href="#_3-使用多个断言"><span>3. 使用多个断言</span></a></h2><p>让我们从一个所有断言都会失败的例子开始：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">User</span> user <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token string">&quot;baeldung&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;support@baeldung.com&quot;</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;admin&quot;</span><span class="token punctuation">,</span> user<span class="token punctuation">.</span><span class="token function">getUsername</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;用户名应该是admin&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;admin@baeldung.com&quot;</span><span class="token punctuation">,</span> user<span class="token punctuation">.</span><span class="token function">getEmail</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;电子邮件应该是admin@baeldung.com&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertTrue</span><span class="token punctuation">(</span>user<span class="token punctuation">.</span><span class="token function">getActivated</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;用户应该被激活&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行测试后，只有第一个断言失败：</p><div class="language-plaintext line-numbers-mode" data-ext="plaintext" data-title="plaintext"><pre class="language-plaintext"><code>org.opentest4j.AssertionFailedError: Username should be admin ==&gt; 
Expected :admin
Actual   :baeldung
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>假设我们修复了失败的代码或测试并重新运行测试。然后我们会得到第二个失败，依此类推。<strong>在这种情况下，最好将所有这些断言组合成单个通过/失败。</strong></p><h2 id="_4-使用assertall-方法" tabindex="-1"><a class="header-anchor" href="#_4-使用assertall-方法"><span>4. 使用assertAll()方法</span></a></h2><p>我们可以使用JUnit5的assertAll()来组合断言。</p><h3 id="_4-1-理解assertall" tabindex="-1"><a class="header-anchor" href="#_4-1-理解assertall"><span>4.1. 理解assertAll()</span></a></h3><p>assertAll()断言函数接受多个Executable对象的集合：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertAll</span><span class="token punctuation">(</span>
  <span class="token string">&quot;Grouped Assertions of User&quot;</span><span class="token punctuation">,</span>
  <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;baeldung&quot;</span><span class="token punctuation">,</span> user<span class="token punctuation">.</span><span class="token function">getUsername</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;用户名应该是baeldung&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token comment">// 更多断言</span>
  <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因此，我们可以使用lambda来提供我们的每个断言。lambda将在由assertAll()提供的分组内运行断言。</p><p>在这里，我们在assertAll()的第一个参数中也提供了一个描述，以解释整个组的含义。</p><h3 id="_4-2-使用assertall-组合断言" tabindex="-1"><a class="header-anchor" href="#_4-2-使用assertall-组合断言"><span>4.2. 使用assertAll()组合断言</span></a></h3><p>让我们看看完整的示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">User</span> user <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token string">&quot;baeldung&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;support@baeldung.com&quot;</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertAll</span><span class="token punctuation">(</span>
  <span class="token string">&quot;Grouped Assertions of User&quot;</span><span class="token punctuation">,</span>
  <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;admin&quot;</span><span class="token punctuation">,</span> user<span class="token punctuation">.</span><span class="token function">getUsername</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;用户名应该是admin&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;admin@baeldung.com&quot;</span><span class="token punctuation">,</span> user<span class="token punctuation">.</span><span class="token function">getEmail</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;电子邮件应该是admin@baeldung.com&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token function">assertTrue</span><span class="token punctuation">(</span>user<span class="token punctuation">.</span><span class="token function">getActivated</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;用户应该被激活&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们看看运行测试时会发生什么：</p><div class="language-plaintext line-numbers-mode" data-ext="plaintext" data-title="plaintext"><pre class="language-plaintext"><code>org.opentest4j.MultipleFailuresError: Grouped Assertions of User (3 failures)
org.opentest4j.AssertionFailedError: Username should be admin ==&gt; expected: \`&lt;admin&gt;\` but was: \`&lt;baeldung&gt;\`
org.opentest4j.AssertionFailedError: Email should be admin@baeldung.com ==&gt; expected: \`&lt;admin@baeldung.com&gt;\` but was: \`&lt;support@baeldung.com&gt;\`
org.opentest4j.AssertionFailedError: User should be activated ==&gt; expected: \`&lt;true&gt;\` but was: \`&lt;false&gt;\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>与使用多个断言时发生的情况不同，<strong>这次所有断言都被执行了，并且它们的失败在_MultipleFailuresError_消息中被报告了。</strong></p><p>我们应该注意到，assertAll()只处理AssertionError。<strong>如果任何断言以异常结束，而不是通常的AssertionError，执行会立即停止</strong>，并且错误输出将与异常有关，而不是MultipleFailuresError。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们学习了如何在JUnit5中使用assertAll()，并看到了它与使用多个单独断言的不同之处。</p><p>如常，教程的完整代码可在GitHub上找到。</p>`,30),l=[p];function o(i,c){return a(),s("div",null,l)}const d=n(e,[["render",o],["__file","2024-07-13-assertAll   vs Multiple Assertions in JUnit5.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-13/2024-07-13-assertAll%20%20%20vs%20Multiple%20Assertions%20in%20JUnit5.html","title":"JUnit5中的assertAll()与多个断言的比较","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["JUnit5","Testing"],"tag":["assertAll","Assertions"],"head":[["meta",{"name":"keywords","content":"JUnit5, assertAll, Multiple Assertions, Testing"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-13/2024-07-13-assertAll%20%20%20vs%20Multiple%20Assertions%20in%20JUnit5.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"JUnit5中的assertAll()与多个断言的比较"}],["meta",{"property":"og:description","content":"JUnit5中的assertAll()与多个断言的比较 当编写单元测试时，我们有时会对输出提供多个断言。当这些断言中的任何一个失败时，测试就会停止。这意味着我们无法知道后面的断言是否会通过或失败，这可能会增加调试时间。 我们可以通过将多个断言包装成单个动作来解决这个问题。 在这个简短的教程中，我们将学习如何在JUnit5中使用引入的assertAll(..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-13T04:03:47.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"assertAll"}],["meta",{"property":"article:tag","content":"Assertions"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-13T04:03:47.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"JUnit5中的assertAll()与多个断言的比较\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-13T04:03:47.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"JUnit5中的assertAll()与多个断言的比较 当编写单元测试时，我们有时会对输出提供多个断言。当这些断言中的任何一个失败时，测试就会停止。这意味着我们无法知道后面的断言是否会通过或失败，这可能会增加调试时间。 我们可以通过将多个断言包装成单个动作来解决这个问题。 在这个简短的教程中，我们将学习如何在JUnit5中使用引入的assertAll(..."},"headers":[{"level":2,"title":"2. 模型","slug":"_2-模型","link":"#_2-模型","children":[]},{"level":2,"title":"3. 使用多个断言","slug":"_3-使用多个断言","link":"#_3-使用多个断言","children":[]},{"level":2,"title":"4. 使用assertAll()方法","slug":"_4-使用assertall-方法","link":"#_4-使用assertall-方法","children":[{"level":3,"title":"4.1. 理解assertAll()","slug":"_4-1-理解assertall","link":"#_4-1-理解assertall","children":[]},{"level":3,"title":"4.2. 使用assertAll()组合断言","slug":"_4-2-使用assertall-组合断言","link":"#_4-2-使用assertall-组合断言","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720843427000,"updatedTime":1720843427000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.52,"words":755},"filePathRelative":"posts/baeldung/2024-07-13/2024-07-13-assertAll   vs Multiple Assertions in JUnit5.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>当编写单元测试时，我们有时会对输出提供多个断言。当这些断言中的任何一个失败时，测试就会停止。这意味着我们无法知道后面的断言是否会通过或失败，这可能会增加调试时间。</p>\\n<p>我们可以通过将多个断言包装成单个动作来解决这个问题。</p>\\n<p>在这个简短的教程中，我们将学习如何在JUnit5中使用引入的assertAll()方法，并看到它与使用多个断言的不同之处。</p>\\n<h2>2. 模型</h2>\\n<p>我们将使用一个_User_类来帮助我们的例子：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">User</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token class-name\\">String</span> username<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token class-name\\">String</span> email<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">boolean</span> activated<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token comment\\">//构造函数</span>\\n   <span class=\\"token comment\\">//getters和setters</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{d as comp,k as data};
