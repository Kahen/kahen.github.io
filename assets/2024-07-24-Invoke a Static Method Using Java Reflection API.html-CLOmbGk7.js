import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-B6f8H54y.js";const e={},p=t(`<hr><h1 id="使用java反射api调用静态方法" tabindex="-1"><a class="header-anchor" href="#使用java反射api调用静态方法"><span>使用Java反射API调用静态方法</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在本快速教程中，我们将讨论如何使用反射API在Java中调用静态方法。</p><p>我们将涵盖两种不同的情况：</p><ul><li>静态方法是<strong>公共的</strong>。</li><li>静态方法是<strong>私有的</strong>。</li></ul><h2 id="_2-示例类" tabindex="-1"><a class="header-anchor" href="#_2-示例类"><span>2. 示例类</span></a></h2><p>为了使演示和解释更简单，我们首先创建一个<strong>GreetingAndBye</strong>类作为示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">GreetingAndBye</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">greeting</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token string">&quot;Hey %s, nice to meet you!&quot;</span><span class="token punctuation">,</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">goodBye</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token string">&quot;Bye %s, see you next time.&quot;</span><span class="token punctuation">,</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>GreetingAndBye</strong>类看起来很简单。它有两个静态方法，一个公共的和一个私有的。</p><p>这两个方法都接受一个<strong>String</strong>参数，并返回一个<strong>String</strong>作为结果。</p><p>现在，让我们使用Java反射API调用这两个静态方法。在本教程中，我们将把代码作为单元测试方法来处理。</p><h2 id="_3-调用公共静态方法" tabindex="-1"><a class="header-anchor" href="#_3-调用公共静态方法"><span>3. 调用<strong>公共</strong>静态方法</span></a></h2><p>首先，让我们看看如何调用<strong>公共</strong>静态方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">invokePublicMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">NoSuchMethodException</span><span class="token punctuation">,</span> <span class="token class-name">InvocationTargetException</span><span class="token punctuation">,</span> <span class="token class-name">IllegalAccessException</span> <span class="token punctuation">{</span>
    <span class="token class-name">Class</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">GreetingAndBye</span><span class="token punctuation">&gt;</span></span>\`\` clazz <span class="token operator">=</span> <span class="token class-name">GreetingAndBye</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">;</span>
    <span class="token class-name">Method</span> method <span class="token operator">=</span> clazz<span class="token punctuation">.</span><span class="token function">getMethod</span><span class="token punctuation">(</span><span class="token string">&quot;greeting&quot;</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">Object</span> result <span class="token operator">=</span> method<span class="token punctuation">.</span><span class="token function">invoke</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token string">&quot;Eric&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Hey Eric, nice to meet you!&quot;</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们应该注意，当我们使用反射API时，需要处理所需的受检异常。</p><p>在上面的示例中，我们首先获取我们想要测试的类的实例，即<strong>GreetingAndBye</strong>。</p><p>有了类实例后，我们可以通过调用<strong>getMethod</strong>方法获取公共静态方法对象。</p><p>一旦我们有了<strong>method</strong>对象，我们可以通过调用<strong>invoke</strong>方法简单地调用它。</p><p>值得解释的是<strong>invoke</strong>方法的第一个参数。如果方法是实例方法，第一个参数是从哪个对象调用底层方法的。</p><p>然而，<strong>当我们调用静态方法时，我们传递</strong>null****作为第一个参数**，因为静态方法不需要实例就可以被调用。</p><p>最后，如果我们运行测试，它将通过。</p><h2 id="_3-调用私有静态方法" tabindex="-1"><a class="header-anchor" href="#_3-调用私有静态方法"><span>3. 调用<strong>私有</strong>静态方法</span></a></h2><p>调用<strong>私有</strong>静态方法与调用<strong>公共</strong>方法非常相似。让我们先看看代码：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">invokePrivateMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">NoSuchMethodException</span><span class="token punctuation">,</span> <span class="token class-name">InvocationTargetException</span><span class="token punctuation">,</span> <span class="token class-name">IllegalAccessException</span> <span class="token punctuation">{</span>
    <span class="token class-name">Class</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">GreetingAndBye</span><span class="token punctuation">&gt;</span></span>\`\` clazz <span class="token operator">=</span> <span class="token class-name">GreetingAndBye</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">;</span>
    <span class="token class-name">Method</span> method <span class="token operator">=</span> clazz<span class="token punctuation">.</span><span class="token function">getDeclaredMethod</span><span class="token punctuation">(</span><span class="token string">&quot;goodBye&quot;</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    method<span class="token punctuation">.</span><span class="token function">setAccessible</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">Object</span> result <span class="token operator">=</span> method<span class="token punctuation">.</span><span class="token function">invoke</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token string">&quot;Eric&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Bye Eric, see you next time.&quot;</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们在上面的代码中看到的，<strong>当我们尝试获取</strong>私有方法<strong>的</strong>Method<strong>对象时，我们应该使用</strong>getDeclaredMethod<strong>而不是</strong>getMethod**。</p><p>此外，<strong>我们需要调用</strong>method.setAccessible(true)<strong>来调用</strong>私有<strong>方法</strong>。这将要求JVM抑制对此方法的访问控制检查。</p><p>因此，它允许我们调用私有方法。否则，将引发<strong>IllegalAccessException</strong>异常。</p><p>如果我们执行测试，它将通过。</p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在这篇简短的文章中，我们讨论了如何使用Java反射API调用静态方法。</p><p>一如既往，完整的代码可以在GitHub上找到。</p>`,32),o=[p];function c(l,i){return a(),s("div",null,o)}const k=n(e,[["render",c],["__file","2024-07-24-Invoke a Static Method Using Java Reflection API.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-24/2024-07-24-Invoke%20a%20Static%20Method%20Using%20Java%20Reflection%20API.html","title":"使用Java反射API调用静态方法","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Reflection API"],"tag":["Java Reflection","Static Method Invocation"],"head":[["meta",{"name":"keywords","content":"Java Reflection API, Static Method Invocation"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-24/2024-07-24-Invoke%20a%20Static%20Method%20Using%20Java%20Reflection%20API.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用Java反射API调用静态方法"}],["meta",{"property":"og:description","content":"使用Java反射API调用静态方法 1. 概述 在本快速教程中，我们将讨论如何使用反射API在Java中调用静态方法。 我们将涵盖两种不同的情况： 静态方法是公共的。 静态方法是私有的。 2. 示例类 为了使演示和解释更简单，我们首先创建一个GreetingAndBye类作为示例： GreetingAndBye类看起来很简单。它有两个静态方法，一个公共..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-24T04:48:12.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java Reflection"}],["meta",{"property":"article:tag","content":"Static Method Invocation"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-24T04:48:12.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用Java反射API调用静态方法\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-24T04:48:12.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用Java反射API调用静态方法 1. 概述 在本快速教程中，我们将讨论如何使用反射API在Java中调用静态方法。 我们将涵盖两种不同的情况： 静态方法是公共的。 静态方法是私有的。 2. 示例类 为了使演示和解释更简单，我们首先创建一个GreetingAndBye类作为示例： GreetingAndBye类看起来很简单。它有两个静态方法，一个公共..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 示例类","slug":"_2-示例类","link":"#_2-示例类","children":[]},{"level":2,"title":"3. 调用公共静态方法","slug":"_3-调用公共静态方法","link":"#_3-调用公共静态方法","children":[]},{"level":2,"title":"3. 调用私有静态方法","slug":"_3-调用私有静态方法","link":"#_3-调用私有静态方法","children":[]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1721796492000,"updatedTime":1721796492000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.44,"words":733},"filePathRelative":"posts/baeldung/2024-07-24/2024-07-24-Invoke a Static Method Using Java Reflection API.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>使用Java反射API调用静态方法</h1>\\n<h2>1. 概述</h2>\\n<p>在本快速教程中，我们将讨论如何使用反射API在Java中调用静态方法。</p>\\n<p>我们将涵盖两种不同的情况：</p>\\n<ul>\\n<li>静态方法是<strong>公共的</strong>。</li>\\n<li>静态方法是<strong>私有的</strong>。</li>\\n</ul>\\n<h2>2. 示例类</h2>\\n<p>为了使演示和解释更简单，我们首先创建一个<strong>GreetingAndBye</strong>类作为示例：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">GreetingAndBye</span> <span class=\\"token punctuation\\">{</span>\\n\\n    <span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">static</span> <span class=\\"token class-name\\">String</span> <span class=\\"token function\\">greeting</span><span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">String</span> name<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token keyword\\">return</span> <span class=\\"token class-name\\">String</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">format</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"Hey %s, nice to meet you!\\"</span><span class=\\"token punctuation\\">,</span> name<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span>\\n\\n    <span class=\\"token keyword\\">private</span> <span class=\\"token keyword\\">static</span> <span class=\\"token class-name\\">String</span> <span class=\\"token function\\">goodBye</span><span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">String</span> name<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token keyword\\">return</span> <span class=\\"token class-name\\">String</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">format</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"Bye %s, see you next time.\\"</span><span class=\\"token punctuation\\">,</span> name<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span>\\n\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{k as comp,d as data};
