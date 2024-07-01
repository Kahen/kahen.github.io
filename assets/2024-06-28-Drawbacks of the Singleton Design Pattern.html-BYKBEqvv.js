import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-BEmnZ9jQ.js";const p={},e=t(`<h1 id="单例设计模式的缺点" tabindex="-1"><a class="header-anchor" href="#单例设计模式的缺点"><span>单例设计模式的缺点</span></a></h1><p>单例是1994年由四人帮（Gang of Four）发布的一种创建型设计模式。</p><p>由于其简单的实现方式，我们倾向于过度使用它。因此，现在它被认为是一种反模式。在将单例模式引入我们的代码之前，我们应该自问是否真的需要它提供的功能。</p><p>在本教程中，我们将讨论单例设计模式的一般缺点，并看看我们可以使用的替代方案。</p><h3 id="_2-代码示例" tabindex="-1"><a class="header-anchor" href="#_2-代码示例"><span>2. 代码示例</span></a></h3><p>首先，让我们创建一个我们将在示例中使用的类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Logger</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">Logger</span> instance<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">PrintWriter</span> fileWriter<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Logger</span> <span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>instance <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            instance <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Logger</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> instance<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token class-name">Logger</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            fileWriter <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PrintWriter</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">FileWriter</span><span class="token punctuation">(</span><span class="token string">&quot;app.log&quot;</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IOException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">log</span><span class="token punctuation">(</span><span class="token class-name">String</span> message<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> log <span class="token operator">=</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token string">&quot;[%s]- %s&quot;</span><span class="token punctuation">,</span> <span class="token class-name">LocalDateTime</span><span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> message<span class="token punctuation">)</span><span class="token punctuation">;</span>
        fileWriter<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>log<span class="token punctuation">)</span><span class="token punctuation">;</span>
        fileWriter<span class="token punctuation">.</span><span class="token function">flush</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的类表示一个简化的文件记录类。我们使用延迟初始化方法实现了它作为单例。</p><h3 id="_3-单例的缺点" tabindex="-1"><a class="header-anchor" href="#_3-单例的缺点"><span>3. 单例的缺点</span></a></h3><p>根据定义，单例模式确保一个类只有一个实例，并额外提供对这个实例的全局访问。因此，我们应该在需要这两件事情的情况下使用它。</p><p><strong>从它的定义来看，我们可以注意到它违反了单一职责原则。</strong> 该原则规定一个类应该只有一个职责。</p><p>然而，单例模式至少有两个职责——它确保类只有一个实例并包含业务逻辑。</p><p>在接下来的部分中，我们将讨论这种设计模式的其他陷阱。</p><h4 id="_3-1-全局状态" tabindex="-1"><a class="header-anchor" href="#_3-1-全局状态"><span>3.1. 全局状态</span></a></h4><p>我们知道全局状态被认为是一种不良实践，因此应该避免。</p><p>尽管可能不是很明显，但单例在我们的代码中引入了全局变量，但它们被封装在一个类中。</p><p><strong>由于它们是全局的，每个人都可以访问和使用它们。而且，如果它们不是不可变的，每个人都可以更改它们。</strong></p><p>假设我们在代码的多个地方使用_Logger_类。每个人都可以访问和修改它的值。</p><p>现在，如果我们在使用方法中遇到一个问题，并发现问题是在单例本身，我们需要检查整个代码库以及使用它的每个方法，以找到问题的影响。</p><p>这很快就会成为我们应用程序的瓶颈。</p><h4 id="_3-2-代码灵活性" tabindex="-1"><a class="header-anchor" href="#_3-2-代码灵活性"><span>3.2. 代码灵活性</span></a></h4><p>接下来，在软件开发方面，唯一确定的事情是我们的代码将来可能会发生变化。</p><p>当项目处于开发的早期阶段时，我们可以假设某些类不会有超过一个实例，并使用单例设计模式定义它们。</p><p><strong>然而，如果需求发生变化，我们的假设被证明是不正确的，我们将需要付出巨大的努力来重构我们的代码。</strong></p><p>让我们讨论我们工作示例中的问题。</p><p>我们假设我们只需要一个_Logger_类的实例。如果我们将来决定一个文件不够怎么办？</p><p>例如，我们可能需要为错误和信息消息分别使用不同的文件。此外，一个类的实例将不再足够。接下来，为了使修改成为可能，我们需要重构整个代码库并移除单例，这将需要大量的努力。</p><p><strong>使用单例，我们使代码紧密耦合且不够灵活。</strong></p><h4 id="_3-3-隐藏依赖" tabindex="-1"><a class="header-anchor" href="#_3-3-隐藏依赖"><span>3.3. 隐藏依赖</span></a></h4><p>继续前进，单例促进了隐藏的依赖。</p><p><strong>换句话说，当我们在其他类中使用它们时，我们隐藏了这些类依赖于单例实例的事实。</strong></p><p>让我们考虑_sum()_方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">sum</span><span class="token punctuation">(</span><span class="token keyword">int</span> a<span class="token punctuation">,</span> <span class="token keyword">int</span> b<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token class-name">Logger</span> logger <span class="token operator">=</span> <span class="token class-name">Logger</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    logger<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;A simple message&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> a <span class="token operator">+</span> b<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们没有直接查看_sum()_方法的实现，我们无法知道它使用了_Logger_类。</p><p>我们没有像通常那样将依赖项作为参数传递给构造函数或方法。</p><h4 id="_3-4-多线程" tabindex="-1"><a class="header-anchor" href="#_3-4-多线程"><span>3.4. 多线程</span></a></h4><p>接下来，在多线程环境中，单例可能会很棘手。</p><p><strong>主要问题是全局变量对我们代码中的所有线程都是可见的。</strong> 此外，每个线程都不了解其他线程对同一实例的活动。</p><p>因此，我们可能会面临不同的问题，例如竞态条件和其他同步问题。</p><p>我们之前实现的_Logger_类在多线程环境中不会很好地工作。我们的方法中没有任何东西可以防止多个线程同时访问_getInstance()_方法。结果，我们可能会拥有多个_Logger_类的实例。</p><p>让我们使用_synchronized_关键字修改_getInstance()_方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Logger</span> <span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">synchronized</span> <span class="token punctuation">(</span><span class="token class-name">Logger</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>instance <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            instance <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Logger</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> instance<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们现在强制每个线程等待轮到它。然而，我们应该意识到同步是昂贵的。此外，我们正在向我们的方法引入开销。</p><p>如果必要，我们可以通过应用双重检查锁定机制来解决我们的问题：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">volatile</span> <span class="token class-name">Logger</span> instance<span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Logger</span> <span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>instance <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">synchronized</span> <span class="token punctuation">(</span><span class="token class-name">Logger</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>instance <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                instance <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Logger</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> instance<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>然而，我们应该记住JVM允许访问部分构造的对象，这可能导致我们程序的意外行为。</strong> 因此，需要向_instance_变量添加_volatile_关键字。</p><p>我们可能考虑的其他替代方案包括：</p><ul><li>预先创建的实例而不是延迟的</li><li>枚举单例</li><li>Bill Pugh单例</li></ul><h4 id="_3-5-测试" tabindex="-1"><a class="header-anchor" href="#_3-5-测试"><span>3.5. 测试</span></a></h4><p>进一步地，我们可以注意到单例在测试我们的代码时的缺点。</p><p><strong>单元测试应该只测试我们代码的一小部分，不应该依赖于可能失败的其他服务，从而导致我们的测试失败。</strong></p><p>让我们测试我们的_sum()_方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenTwoValues_whenSum_thenReturnCorrectResult</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">SingletonDemo</span> singletonDemo <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SingletonDemo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> result <span class="token operator">=</span> singletonDemo<span class="token punctuation">.</span><span class="token function">sum</span><span class="token punctuation">(</span><span class="token number">12</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">16</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>尽管我们的测试通过了，但它创建了一个日志文件，因为_sum()_方法使用了_Logger_类。</p><p>如果_Logger_类出了问题，我们的测试就会失败。现在，我们应该如何防止记录日志发生呢？</p><p>如果适用，一种解决方案是使用Mockito模拟静态_getInstance()_方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenMockedLogger_whenSum_thenReturnCorrectResult</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Logger</span> logger <span class="token operator">=</span> <span class="token function">mock</span><span class="token punctuation">(</span><span class="token class-name">Logger</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">MockedStatic</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Logger</span><span class="token punctuation">&gt;</span></span>\` loggerMockedStatic <span class="token operator">=</span> <span class="token function">mockStatic</span><span class="token punctuation">(</span><span class="token class-name">Logger</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        loggerMockedStatic<span class="token punctuation">.</span><span class="token function">when</span><span class="token punctuation">(</span><span class="token class-name">Logger</span><span class="token operator">::</span><span class="token function">getInstance</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">thenReturn</span><span class="token punctuation">(</span>logger<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">doNothing</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">when</span><span class="token punctuation">(</span>logger<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">any</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">SingletonDemo</span> singletonDemo <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SingletonDemo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> result <span class="token operator">=</span> singletonDemo<span class="token punctuation">.</span><span class="token function">sum</span><span class="token punctuation">(</span><span class="token number">12</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">16</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-单例的替代方案" tabindex="-1"><a class="header-anchor" href="#_4-单例的替代方案"><span>4. 单例的替代方案</span></a></h3><p>最后，让我们讨论一些替代方案。</p><p>在需要只有一个实例的情况下，<strong>我们可以使用依赖注入。</strong> 换句话说，我们可以只创建一个实例，并将其作为参数传递到需要它的地方。这样，我们将提高方法或另一个类需要正常工作所依赖的依赖项的意识。</p><p>此外，如果我们将来需要多个实例，我们将更容易地更改我们的代码。</p><p>此外，我们可以使用工厂模式来处理长期存在的对象。</p><h3 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h3><p>在本文中，我们查看了单例设计模式的主要缺点。</p><p>总之，我们应该只在真正需要时使用这种模式。过度使用它在实际不需要单一实例的情况下引入了不必要的限制。作为替代方案，我们可以简单地使用依赖注入并将对象作为参数传递。</p><p>如常，所有示例的代码都可以在GitHub上找到。</p>`,66),o=[e];function c(l,i){return a(),s("div",null,o)}const r=n(p,[["render",c],["__file","2024-06-28-Drawbacks of the Singleton Design Pattern.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-06-28/2024-06-28-Drawbacks%20of%20the%20Singleton%20Design%20Pattern.html","title":"单例设计模式的缺点","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","设计模式"],"tag":["单例模式","设计模式"],"head":[["meta",{"name":"keywords","content":"单例设计模式, Java, 软件设计模式, 单例模式缺点"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-28/2024-06-28-Drawbacks%20of%20the%20Singleton%20Design%20Pattern.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"单例设计模式的缺点"}],["meta",{"property":"og:description","content":"单例设计模式的缺点 单例是1994年由四人帮（Gang of Four）发布的一种创建型设计模式。 由于其简单的实现方式，我们倾向于过度使用它。因此，现在它被认为是一种反模式。在将单例模式引入我们的代码之前，我们应该自问是否真的需要它提供的功能。 在本教程中，我们将讨论单例设计模式的一般缺点，并看看我们可以使用的替代方案。 2. 代码示例 首先，让我们..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-28T23:29:46.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"单例模式"}],["meta",{"property":"article:tag","content":"设计模式"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-28T23:29:46.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"单例设计模式的缺点\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-28T23:29:46.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"单例设计模式的缺点 单例是1994年由四人帮（Gang of Four）发布的一种创建型设计模式。 由于其简单的实现方式，我们倾向于过度使用它。因此，现在它被认为是一种反模式。在将单例模式引入我们的代码之前，我们应该自问是否真的需要它提供的功能。 在本教程中，我们将讨论单例设计模式的一般缺点，并看看我们可以使用的替代方案。 2. 代码示例 首先，让我们..."},"headers":[{"level":3,"title":"2. 代码示例","slug":"_2-代码示例","link":"#_2-代码示例","children":[]},{"level":3,"title":"3. 单例的缺点","slug":"_3-单例的缺点","link":"#_3-单例的缺点","children":[]},{"level":3,"title":"4. 单例的替代方案","slug":"_4-单例的替代方案","link":"#_4-单例的替代方案","children":[]},{"level":3,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1719617386000,"updatedTime":1719617386000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":6.44,"words":1931},"filePathRelative":"posts/baeldung/2024-06-28/2024-06-28-Drawbacks of the Singleton Design Pattern.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>单例是1994年由四人帮（Gang of Four）发布的一种创建型设计模式。</p>\\n<p>由于其简单的实现方式，我们倾向于过度使用它。因此，现在它被认为是一种反模式。在将单例模式引入我们的代码之前，我们应该自问是否真的需要它提供的功能。</p>\\n<p>在本教程中，我们将讨论单例设计模式的一般缺点，并看看我们可以使用的替代方案。</p>\\n<h3>2. 代码示例</h3>\\n<p>首先，让我们创建一个我们将在示例中使用的类：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">Logger</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">private</span> <span class=\\"token keyword\\">static</span> <span class=\\"token class-name\\">Logger</span> instance<span class=\\"token punctuation\\">;</span>\\n\\n    <span class=\\"token keyword\\">private</span> <span class=\\"token class-name\\">PrintWriter</span> fileWriter<span class=\\"token punctuation\\">;</span>\\n\\n    <span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">static</span> <span class=\\"token class-name\\">Logger</span> <span class=\\"token function\\">getInstance</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>instance <span class=\\"token operator\\">==</span> <span class=\\"token keyword\\">null</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n            instance <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">Logger</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token punctuation\\">}</span>\\n        <span class=\\"token keyword\\">return</span> instance<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span>\\n\\n    <span class=\\"token keyword\\">private</span> <span class=\\"token class-name\\">Logger</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token keyword\\">try</span> <span class=\\"token punctuation\\">{</span>\\n            fileWriter <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">PrintWriter</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">FileWriter</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"app.log\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token boolean\\">true</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token punctuation\\">}</span> <span class=\\"token keyword\\">catch</span> <span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">IOException</span> e<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n            e<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">printStackTrace</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token punctuation\\">}</span>\\n    <span class=\\"token punctuation\\">}</span>\\n\\n    <span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">void</span> <span class=\\"token function\\">log</span><span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">String</span> message<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token class-name\\">String</span> log <span class=\\"token operator\\">=</span> <span class=\\"token class-name\\">String</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">format</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"[%s]- %s\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token class-name\\">LocalDateTime</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">now</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">,</span> message<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n        fileWriter<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">println</span><span class=\\"token punctuation\\">(</span>log<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n        fileWriter<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">flush</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{r as comp,d as data};
