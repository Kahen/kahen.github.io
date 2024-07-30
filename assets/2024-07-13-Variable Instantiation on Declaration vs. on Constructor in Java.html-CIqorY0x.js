import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as e}from"./app-CbPcg273.js";const t={},p=e(`<h1 id="java中声明时变量实例化与构造函数中的比较-baeldung" tabindex="-1"><a class="header-anchor" href="#java中声明时变量实例化与构造函数中的比较-baeldung"><span>Java中声明时变量实例化与构造函数中的比较 | Baeldung</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>Java开发者之间存在不确定性，不确定是在声明时初始化变量还是在构造函数中初始化。</p><p>在本教程中，我们将看看在声明时或在构造函数中初始化变量时会发生什么。我们将尝试指出它们之间是否存在差异和相似之处。</p><h2 id="_2-字段声明初始化" tabindex="-1"><a class="header-anchor" href="#_2-字段声明初始化"><span>2. 字段声明初始化</span></a></h2><p>我们需要知道Java编译器会取出所有字段声明初始化，并按它们在类中的出现顺序将它们作为代码移动到构造函数中。从这一点，我们可以推断出在声明时或在构造函数中初始化变量并没有太大区别，因为编译后它们最终都会出现在构造函数中：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">A</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">B</span> b <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">B</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-构造函数字段初始化" tabindex="-1"><a class="header-anchor" href="#_3-构造函数字段初始化"><span>3. 构造函数字段初始化</span></a></h2><p>根据我们上面的代码，编译后我们得到这个构造函数：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">A</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">B</span> b<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">A</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>b <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">B</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>那么，我们在哪里初始化数据真的重要吗？</p><p>在了解了编译后会发生什么之后，这并不是那么重要。这更多是我们基于经验形成的偏好。</p><h2 id="_4-指南" tabindex="-1"><a class="header-anchor" href="#_4-指南"><span>4. 指南</span></a></h2><p>在决定是在字段声明还是在构造函数中初始化数据时，我们可以查看一些指南。</p><p>这是一个依赖注入构造函数：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">A</span><span class="token punctuation">(</span><span class="token class-name">B</span> b<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>b <span class="token operator">=</span> b<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用这种方式初始化变量是推荐的方式。通过使用这种方式初始化对象，我们遵循了不同的原则。</p><h3 id="_4-1-可读性" tabindex="-1"><a class="header-anchor" href="#_4-1-可读性"><span>4.1. 可读性</span></a></h3><p>为了更好的可读性，可能重要的是在字段声明或构造函数中初始化数据，而不是两者都做。当然，我们应该将这视为指南，而不是规则，因为你可以在两者中都有。</p><p>将所有初始化放在一个地方，可以更容易地知道在哪里查找初始化代码。这将使任何未来的开发者更容易地在一个地方查看初始化，而不是分散在多个地方。</p><h3 id="_4-2-单一职责" tabindex="-1"><a class="header-anchor" href="#_4-2-单一职责"><span>4.2. 单一职责</span></a></h3><p>通过使用依赖注入构造函，我们从A类中移除了实例化B对象的责任。尽可能遵循<strong>单一职责</strong>原则总是更可取的。</p><p>这也意味着我们将拥有<strong>类之间的低耦合</strong>，这是另一个值得遵循的很棒的指南。</p><h3 id="_4-3-可测试性" tabindex="-1"><a class="header-anchor" href="#_4-3-可测试性"><span>4.3. 可测试性</span></a></h3><p>使用这个构造函数倾向于有更容易的方法来测试我们的代码，因为我们可以很容易地模拟我们的B对象，然后使用这个构造函数将其注入到我们的A对象中：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">B</span> b <span class="token operator">=</span> <span class="token function">mock</span><span class="token punctuation">(</span><span class="token class-name">B</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">A</span> a <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">A</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-4-可维护性" tabindex="-1"><a class="header-anchor" href="#_4-4-可维护性"><span>4.4. 可维护性</span></a></h3><p>拥有低耦合的类也为我们带来了<strong>更好的代码可维护性</strong>。因此，我们将能够更容易地修改代码。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们看到了使用字段声明或构造函数初始化更多的是个人偏好，它们之间的一些差异可能是我们想要遵循的设计原则。</p><p>使用构造函数初始化和<strong>依赖注入</strong>可以给我们带来一些设计原则的优势。</p><p>如常，示例的源代码可在GitHub上找到。</p>`,32),l=[p];function o(c,i){return s(),n("div",null,l)}const u=a(t,[["render",o],["__file","2024-07-13-Variable Instantiation on Declaration vs. on Constructor in Java.html.vue"]]),v=JSON.parse('{"path":"/posts/baeldung/2024-07-13/2024-07-13-Variable%20Instantiation%20on%20Declaration%20vs.%20on%20Constructor%20in%20Java.html","title":"Java中声明时变量实例化与构造函数中的比较 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-07-14T00:00:00.000Z","category":["Java","Programming"],"tag":["Java","Constructor","Variable Initialization"],"head":[["meta",{"name":"keywords","content":"Java, Constructor, Variable Initialization, Dependency Injection"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-13/2024-07-13-Variable%20Instantiation%20on%20Declaration%20vs.%20on%20Constructor%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中声明时变量实例化与构造函数中的比较 | Baeldung"}],["meta",{"property":"og:description","content":"Java中声明时变量实例化与构造函数中的比较 | Baeldung 1. 引言 Java开发者之间存在不确定性，不确定是在声明时初始化变量还是在构造函数中初始化。 在本教程中，我们将看看在声明时或在构造函数中初始化变量时会发生什么。我们将尝试指出它们之间是否存在差异和相似之处。 2. 字段声明初始化 我们需要知道Java编译器会取出所有字段声明初始化，..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-13T20:40:35.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Constructor"}],["meta",{"property":"article:tag","content":"Variable Initialization"}],["meta",{"property":"article:published_time","content":"2024-07-14T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-13T20:40:35.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中声明时变量实例化与构造函数中的比较 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-14T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-13T20:40:35.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中声明时变量实例化与构造函数中的比较 | Baeldung 1. 引言 Java开发者之间存在不确定性，不确定是在声明时初始化变量还是在构造函数中初始化。 在本教程中，我们将看看在声明时或在构造函数中初始化变量时会发生什么。我们将尝试指出它们之间是否存在差异和相似之处。 2. 字段声明初始化 我们需要知道Java编译器会取出所有字段声明初始化，..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 字段声明初始化","slug":"_2-字段声明初始化","link":"#_2-字段声明初始化","children":[]},{"level":2,"title":"3. 构造函数字段初始化","slug":"_3-构造函数字段初始化","link":"#_3-构造函数字段初始化","children":[]},{"level":2,"title":"4. 指南","slug":"_4-指南","link":"#_4-指南","children":[{"level":3,"title":"4.1. 可读性","slug":"_4-1-可读性","link":"#_4-1-可读性","children":[]},{"level":3,"title":"4.2. 单一职责","slug":"_4-2-单一职责","link":"#_4-2-单一职责","children":[]},{"level":3,"title":"4.3. 可测试性","slug":"_4-3-可测试性","link":"#_4-3-可测试性","children":[]},{"level":3,"title":"4.4. 可维护性","slug":"_4-4-可维护性","link":"#_4-4-可维护性","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720903235000,"updatedTime":1720903235000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.97,"words":890},"filePathRelative":"posts/baeldung/2024-07-13/2024-07-13-Variable Instantiation on Declaration vs. on Constructor in Java.md","localizedDate":"2024年7月14日","excerpt":"\\n<h2>1. 引言</h2>\\n<p>Java开发者之间存在不确定性，不确定是在声明时初始化变量还是在构造函数中初始化。</p>\\n<p>在本教程中，我们将看看在声明时或在构造函数中初始化变量时会发生什么。我们将尝试指出它们之间是否存在差异和相似之处。</p>\\n<h2>2. 字段声明初始化</h2>\\n<p>我们需要知道Java编译器会取出所有字段声明初始化，并按它们在类中的出现顺序将它们作为代码移动到构造函数中。从这一点，我们可以推断出在声明时或在构造函数中初始化变量并没有太大区别，因为编译后它们最终都会出现在构造函数中：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">A</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">private</span> <span class=\\"token class-name\\">B</span> b <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">B</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{u as comp,v as data};
