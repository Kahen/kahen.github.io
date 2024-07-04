import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-CM1q4_9A.js";const p={},e=t(`<hr><h1 id="在java中对列表的每个元素调用方法" tabindex="-1"><a class="header-anchor" href="#在java中对列表的每个元素调用方法"><span>在Java中对列表的每个元素调用方法</span></a></h1><p>当我们在Java中工作时，无论是处理Java 8之前的代码还是采用Java 8及更高版本中的Stream API的功能性优雅，对列表中的每个元素调用方法是一项基本操作。</p><p>在本教程中，我们将探索可用于对列表元素调用方法的方法和技术。</p><h3 id="_2-问题介绍" tabindex="-1"><a class="header-anchor" href="#_2-问题介绍"><span>2. 问题介绍</span></a></h3><p>像往常一样，让我们通过一个例子快速理解问题。假设我们有一个_玩家_类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Player</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span> id<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span> score<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">Player</span><span class="token punctuation">(</span><span class="token keyword">int</span> id<span class="token punctuation">,</span> <span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token keyword">int</span> score<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>id <span class="token operator">=</span> id<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>score <span class="token operator">=</span> score<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

   <span class="token comment">// getter和setter方法省略</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，让我们初始化一个_玩家_列表作为我们的输入：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Player</span><span class="token punctuation">&gt;</span></span>\` <span class="token constant">PLAYERS</span> <span class="token operator">=</span> <span class="token class-name">List</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span>
  <span class="token keyword">new</span> <span class="token class-name">Player</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">&quot;Kai&quot;</span><span class="token punctuation">,</span> <span class="token number">42</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token keyword">new</span> <span class="token class-name">Player</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">&quot;Eric&quot;</span><span class="token punctuation">,</span> <span class="token number">43</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token keyword">new</span> <span class="token class-name">Player</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token string">&quot;Saajan&quot;</span><span class="token punctuation">,</span> <span class="token number">64</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token keyword">new</span> <span class="token class-name">Player</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token string">&quot;Kevin&quot;</span><span class="token punctuation">,</span> <span class="token number">30</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token keyword">new</span> <span class="token class-name">Player</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token string">&quot;John&quot;</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>假设我们想要在_PLAYERS_列表中的每个玩家上执行一个方法。然而，这个需求可以有两种场景：</p><ul><li><strong>对每个元素执行操作，不关心返回值</strong>，例如打印每个玩家的名字</li><li>方法返回结果，有效地<strong>将输入列表转换为另一个列表</strong>，例如从_PLAYERS_中提取玩家名字到一个新的_List<code>&lt;String&gt;</code>_</li></ul><p>在本教程中，我们将讨论这两种场景。此外，我们将看到如何在Java 8之前和Java 8+中实现它们。</p><p>接下来，让我们看看它们是如何工作的。</p><h3 id="_3-传统方法-java-8之前" tabindex="-1"><a class="header-anchor" href="#_3-传统方法-java-8之前"><span>3. 传统方法（Java 8之前）</span></a></h3><p>在Java 8之前，<strong>循环是当我们想要在列表中的每个元素上调用方法时的基础技术</strong>。然而，一些外部库可能提供方便的方法，使我们能够更有效地解决问题。</p><p>接下来，让我们仔细看看它们。</p><h4 id="_3-1-对每个元素执行操作" tabindex="-1"><a class="header-anchor" href="#_3-1-对每个元素执行操作"><span>3.1. 对每个元素执行操作</span></a></h4><p><strong>循环遍历元素并调用方法可以是执行每个元素上的操作的最直接解决方案</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Player</span> p <span class="token operator">:</span> <span class="token constant">PLAYERS</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span>p<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们在运行上述_for_循环后检查控制台，我们将看到日志输出。每个玩家的名字都被打印出来了：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>21:14:47.219 [main] INFO ... - Kai
21:14:47.220 [main] INFO ... - Eric
21:14:47.220 [main] INFO ... - Saajan
21:14:47.220 [main] INFO ... - Kevin
21:14:47.220 [main] INFO ... - John
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-2-转换为另一个列表" tabindex="-1"><a class="header-anchor" href="#_3-2-转换为另一个列表"><span>3.2. 转换为另一个列表</span></a></h4><p>同样，如果我们想要通过调用_player.getName()_来提取玩家的名字，<strong>我们可以先声明一个空的字符串列表，并在循环中添加每个玩家的名字</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\`\`\` names <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Player</span> p <span class="token operator">:</span> <span class="token constant">PLAYERS</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    names<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>p<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token string">&quot;Kai&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Eric&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Saajan&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Kevin&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;John&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> names<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-3-使用guava的-transform-方法" tabindex="-1"><a class="header-anchor" href="#_3-3-使用guava的-transform-方法"><span>3.3. 使用Guava的_transform()_方法</span></a></h4><p>另外，我们可以使用Guava的_Lists.transform()_方法来应用列表转换。</p><p>使用Guava库的第一步是将依赖项添加到我们的_pom.xml_：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`com.google.guava\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`guava\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\`32.1.3-jre\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\`
\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Guava的最新版本可以在这里检查。</p><p>然后，我们可以使用_Lists.transform()_方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\`\`\` names <span class="token operator">=</span> <span class="token class-name">Lists</span><span class="token punctuation">.</span><span class="token function">transform</span><span class="token punctuation">(</span><span class="token constant">PLAYERS</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Function</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Player</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\`<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">apply</span><span class="token punctuation">(</span><span class="token class-name">Player</span> input<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> input<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token string">&quot;Kai&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Eric&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Saajan&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Kevin&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;John&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> names<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如上面的代码所示，<strong>我们将一个匿名的_Function<code>&lt;Player, String&gt;</code>_对象传递给了transform()方法</strong>。当然，我们必须在_Function<code>&lt;F, T&gt;</code>_接口中实现_apply()_方法，以<strong>执行从F（Player）到T（String）的转换逻辑</strong>。</p><h3 id="_4-java-8及更高版本-流式api" tabindex="-1"><a class="header-anchor" href="#_4-java-8及更高版本-流式api"><span>4. Java 8及更高版本：流式API</span></a></h3><p>流式API是在Java 8中引入的，它为集合的操作提供了一种方便的方式。接下来，让我们看看我们的问题如何在Java 8+中解决。</p><h4 id="_4-1-对每个元素执行操作" tabindex="-1"><a class="header-anchor" href="#_4-1-对每个元素执行操作"><span>4.1. 对每个元素执行操作</span></a></h4><p>在Java 8中，_forEach()_方法是_Iterable_接口中的一个新方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">default</span> <span class="token keyword">void</span> <span class="token function">forEach</span><span class="token punctuation">(</span><span class="token class-name">Consumer</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span> <span class="token keyword">super</span> <span class="token class-name">T</span><span class="token punctuation">&gt;</span></span>\` action<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Objects</span><span class="token punctuation">.</span><span class="token function">requireNonNull</span><span class="token punctuation">(</span>action<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">T</span> t <span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        action<span class="token punctuation">.</span><span class="token function">accept</span><span class="token punctuation">(</span>t<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，<strong>_forEach()_包装了循环实现，使调用者端的代码更容易阅读</strong>。</p><p>由于_Iterable_是_Collection_接口的超类型，<em>forEach()</em><strong>在所有</strong><em>Collection</em><strong>类型中都可用</strong>，例如_List_和_Set_。</p><p><strong>_forEach()_方法期望一个_Consumer_对象作为参数</strong>。它非常适合对列表的每个元素执行操作。例如，让我们运行以下代码行：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token constant">PLAYERS</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>player <span class="token operator">-&gt;</span> log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span>player<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们看到预期的输出被打印出来：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>21:14:47.223 [main] INFO ... - Kai
21:14:47.223 [main] INFO ... - Eric
21:14:47.224 [main] INFO ... - Saajan
21:14:47.224 [main] INFO ... - Kevin
21:14:47.224 [main] INFO ... - John
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的代码中，我们将一个lambda表达式作为_Consumer_对象传递给了_forEach()_方法。</p><h4 id="_4-2-转换为另一个列表" tabindex="-1"><a class="header-anchor" href="#_4-2-转换为另一个列表"><span>4.2. 转换为另一个列表</span></a></h4><p><strong>要通过应用特定函数转换列表中的元素，并将这些修改后的元素收集到一个新的列表中，可以使用_Stream.map()_方法</strong>。当然，我们必须首先调用_stream()<em>将我们的列表转换为_Stream</em>，并使用_collect()_收集转换后的元素：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\`\`\` names <span class="token operator">=</span> <span class="token constant">PLAYERS</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token class-name">Player</span><span class="token operator">::</span><span class="token function">getName</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token class-name">List</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;Kai&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Eric&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Saajan&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Kevin&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;John&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> names<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，与Guava的_Lists.transform()_相比，_Stream.map()_方法更加流畅，更容易理解。</p><p>值得注意的是，我们传递给_map()_方法的“<em>Player::getName</em>”是一个方法引用。如果我们将方法引用替换为这个lambda表达式：“<em>player -&gt; player.getName()</em>”，它同样有效。</p><h3 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h3><p>在本文中，我们探讨了在列表的每个元素上调用方法的两种场景。我们深入研究了解决这一挑战的各种解决方案，考虑了Java 8之前和Java 8及更高版本的情况。</p><p>一如既往，示例的完整源代码可以在GitHub上找到。</p>`,52),o=[e];function c(l,i){return s(),a("div",null,o)}const k=n(p,[["render",c],["__file","2024-06-24-Call a Method on Each Element of a List in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-06-24/2024-06-24-Call%20a%20Method%20on%20Each%20Element%20of%20a%20List%20in%20Java.html","title":"在Java中对列表的每个元素调用方法","lang":"zh-CN","frontmatter":{"date":"2024-06-24T00:00:00.000Z","category":["Java","编程"],"tag":["Java 8","流式API","列表操作"],"head":[["meta",{"name":"keywords","content":"Java, 列表操作, 方法调用, 流式API"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-24/2024-06-24-Call%20a%20Method%20on%20Each%20Element%20of%20a%20List%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Java中对列表的每个元素调用方法"}],["meta",{"property":"og:description","content":"在Java中对列表的每个元素调用方法 当我们在Java中工作时，无论是处理Java 8之前的代码还是采用Java 8及更高版本中的Stream API的功能性优雅，对列表中的每个元素调用方法是一项基本操作。 在本教程中，我们将探索可用于对列表元素调用方法的方法和技术。 2. 问题介绍 像往常一样，让我们通过一个例子快速理解问题。假设我们有一个_玩家_类..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-24T14:30:45.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java 8"}],["meta",{"property":"article:tag","content":"流式API"}],["meta",{"property":"article:tag","content":"列表操作"}],["meta",{"property":"article:published_time","content":"2024-06-24T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-24T14:30:45.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Java中对列表的每个元素调用方法\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-24T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-24T14:30:45.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Java中对列表的每个元素调用方法 当我们在Java中工作时，无论是处理Java 8之前的代码还是采用Java 8及更高版本中的Stream API的功能性优雅，对列表中的每个元素调用方法是一项基本操作。 在本教程中，我们将探索可用于对列表元素调用方法的方法和技术。 2. 问题介绍 像往常一样，让我们通过一个例子快速理解问题。假设我们有一个_玩家_类..."},"headers":[{"level":3,"title":"2. 问题介绍","slug":"_2-问题介绍","link":"#_2-问题介绍","children":[]},{"level":3,"title":"3. 传统方法（Java 8之前）","slug":"_3-传统方法-java-8之前","link":"#_3-传统方法-java-8之前","children":[]},{"level":3,"title":"4. Java 8及更高版本：流式API","slug":"_4-java-8及更高版本-流式api","link":"#_4-java-8及更高版本-流式api","children":[]},{"level":3,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1719239445000,"updatedTime":1719239445000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.83,"words":1450},"filePathRelative":"posts/baeldung/2024-06-24/2024-06-24-Call a Method on Each Element of a List in Java.md","localizedDate":"2024年6月24日","excerpt":"<hr>\\n<h1>在Java中对列表的每个元素调用方法</h1>\\n<p>当我们在Java中工作时，无论是处理Java 8之前的代码还是采用Java 8及更高版本中的Stream API的功能性优雅，对列表中的每个元素调用方法是一项基本操作。</p>\\n<p>在本教程中，我们将探索可用于对列表元素调用方法的方法和技术。</p>\\n<h3>2. 问题介绍</h3>\\n<p>像往常一样，让我们通过一个例子快速理解问题。假设我们有一个_玩家_类：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">Player</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">private</span> <span class=\\"token keyword\\">int</span> id<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">private</span> <span class=\\"token class-name\\">String</span> name<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">private</span> <span class=\\"token keyword\\">int</span> score<span class=\\"token punctuation\\">;</span>\\n\\n    <span class=\\"token keyword\\">public</span> <span class=\\"token class-name\\">Player</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">int</span> id<span class=\\"token punctuation\\">,</span> <span class=\\"token class-name\\">String</span> name<span class=\\"token punctuation\\">,</span> <span class=\\"token keyword\\">int</span> score<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token keyword\\">this</span><span class=\\"token punctuation\\">.</span>id <span class=\\"token operator\\">=</span> id<span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token keyword\\">this</span><span class=\\"token punctuation\\">.</span>name <span class=\\"token operator\\">=</span> name<span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token keyword\\">this</span><span class=\\"token punctuation\\">.</span>score <span class=\\"token operator\\">=</span> score<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span>\\n\\n   <span class=\\"token comment\\">// getter和setter方法省略</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{k as comp,d as data};
