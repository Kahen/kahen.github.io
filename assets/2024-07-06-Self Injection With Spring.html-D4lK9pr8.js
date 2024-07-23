import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as e}from"./app-LwwahXlT.js";const t={},p=e(`<h1 id="spring中的自我注入" tabindex="-1"><a class="header-anchor" href="#spring中的自我注入"><span>Spring中的自我注入</span></a></h1><p>自我注入意味着一个Spring bean将自己作为依赖项注入。它使用Spring容器来获取自己的引用，然后使用该引用执行某些操作。</p><p>在这个简短的教程中，我们将看到如何在Spring中使用自我注入。</p><h2 id="_2-自我注入的使用案例" tabindex="-1"><a class="header-anchor" href="#_2-自我注入的使用案例"><span>2. 自我注入的使用案例</span></a></h2><p>自我注入最常见的使用案例是当需要将一个切面应用于一个自引用的方法或类时，绕过Spring AOP的限制。</p><p>假设我们有一个服务类执行一些业务逻辑，并且需要在该逻辑的一部分调用它自己的一个方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Service</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyService</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">doSomething</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// ...</span>
        <span class="token function">doSomethingElse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Transactional</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">doSomethingElse</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// ...</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然而，当我们运行应用程序时，我们可能会注意到<code>@Transactional</code>没有被应用。这是因为<code>doSomething()</code>方法直接调用<code>doSomethingElse()</code>，绕过了Spring代理。</p><p>为了解决这个问题，我们可以使用自我注入来获取Spring代理的引用，并通过该代理调用方法。</p><h2 id="_3-使用-autowired进行自我注入" tabindex="-1"><a class="header-anchor" href="#_3-使用-autowired进行自我注入"><span>3. 使用@Autowired进行自我注入</span></a></h2><p>我们可以通过在bean的字段、构造函数参数或setter方法上使用@Autowired注解来在Spring中执行自我注入。</p><p>以下是使用字段进行自我注入的示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyBean</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">MyBean</span> self<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">doSomething</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 在这里使用自我引用</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以及使用构造函数参数：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyBean</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">MyBean</span> self<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">public</span> <span class="token class-name">MyBean</span><span class="token punctuation">(</span><span class="token class-name">MyBean</span> self<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>self <span class="token operator">=</span> self<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-使用applicationcontextaware进行自我注入" tabindex="-1"><a class="header-anchor" href="#_4-使用applicationcontextaware进行自我注入"><span>4. 使用ApplicationContextAware进行自我注入</span></a></h2><p>另一种进行自我注入的方法是通过实现ApplicationContextAware接口。这个接口允许bean意识到Spring应用程序上下文并获取自己的引用：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyBean</span> <span class="token keyword">implements</span> <span class="token class-name">ApplicationContextAware</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">ApplicationContext</span> context<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setApplicationContext</span><span class="token punctuation">(</span><span class="token class-name">ApplicationContext</span> context<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">BeansException</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>context <span class="token operator">=</span> context<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">doSomething</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">MyBean</span> self <span class="token operator">=</span> context<span class="token punctuation">.</span><span class="token function">getBean</span><span class="token punctuation">(</span><span class="token class-name">MyBean</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// ...</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-缺点" tabindex="-1"><a class="header-anchor" href="#_5-缺点"><span>5. 缺点</span></a></h2><p>当一个bean注入自己时，<strong>它可能会造成对bean责任的混淆</strong>，并使追踪应用程序中数据流变得更加困难。</p><p>自我注入<strong>也可能创建循环依赖</strong>。从2.6版本开始，如果项目有循环依赖，Spring Boot将引发异常。当然，也有一些解决方法。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在这篇快速文章中，我们学习了在Spring中使用自我注入的几种方式以及何时使用它。我们还了解了Spring中自我注入的一些缺点。</p><p>OK</p>`,24),o=[p];function i(c,l){return s(),a("div",null,o)}const u=n(t,[["render",i],["__file","2024-07-06-Self Injection With Spring.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-06/2024-07-06-Self%20Injection%20With%20Spring.html","title":"Spring中的自我注入","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Spring","Java"],"tag":["Spring Framework","Self-Injection"],"head":[["meta",{"name":"keywords","content":"Spring, Java, Self-Injection, AOP, ApplicationContextAware"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-06/2024-07-06-Self%20Injection%20With%20Spring.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Spring中的自我注入"}],["meta",{"property":"og:description","content":"Spring中的自我注入 自我注入意味着一个Spring bean将自己作为依赖项注入。它使用Spring容器来获取自己的引用，然后使用该引用执行某些操作。 在这个简短的教程中，我们将看到如何在Spring中使用自我注入。 2. 自我注入的使用案例 自我注入最常见的使用案例是当需要将一个切面应用于一个自引用的方法或类时，绕过Spring AOP的限制。..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-06T06:57:31.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Spring Framework"}],["meta",{"property":"article:tag","content":"Self-Injection"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-06T06:57:31.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Spring中的自我注入\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-06T06:57:31.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Spring中的自我注入 自我注入意味着一个Spring bean将自己作为依赖项注入。它使用Spring容器来获取自己的引用，然后使用该引用执行某些操作。 在这个简短的教程中，我们将看到如何在Spring中使用自我注入。 2. 自我注入的使用案例 自我注入最常见的使用案例是当需要将一个切面应用于一个自引用的方法或类时，绕过Spring AOP的限制。..."},"headers":[{"level":2,"title":"2. 自我注入的使用案例","slug":"_2-自我注入的使用案例","link":"#_2-自我注入的使用案例","children":[]},{"level":2,"title":"3. 使用@Autowired进行自我注入","slug":"_3-使用-autowired进行自我注入","link":"#_3-使用-autowired进行自我注入","children":[]},{"level":2,"title":"4. 使用ApplicationContextAware进行自我注入","slug":"_4-使用applicationcontextaware进行自我注入","link":"#_4-使用applicationcontextaware进行自我注入","children":[]},{"level":2,"title":"5. 缺点","slug":"_5-缺点","link":"#_5-缺点","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1720249051000,"updatedTime":1720249051000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.11,"words":633},"filePathRelative":"posts/baeldung/2024-07-06/2024-07-06-Self Injection With Spring.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>自我注入意味着一个Spring bean将自己作为依赖项注入。它使用Spring容器来获取自己的引用，然后使用该引用执行某些操作。</p>\\n<p>在这个简短的教程中，我们将看到如何在Spring中使用自我注入。</p>\\n<h2>2. 自我注入的使用案例</h2>\\n<p>自我注入最常见的使用案例是当需要将一个切面应用于一个自引用的方法或类时，绕过Spring AOP的限制。</p>\\n<p>假设我们有一个服务类执行一些业务逻辑，并且需要在该逻辑的一部分调用它自己的一个方法：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token annotation punctuation\\">@Service</span>\\n<span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">MyService</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">void</span> <span class=\\"token function\\">doSomething</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token comment\\">// ...</span>\\n        <span class=\\"token function\\">doSomethingElse</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span>\\n\\n    <span class=\\"token annotation punctuation\\">@Transactional</span>\\n    <span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">void</span> <span class=\\"token function\\">doSomethingElse</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token comment\\">// ...</span>\\n    <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{u as comp,k as data};
