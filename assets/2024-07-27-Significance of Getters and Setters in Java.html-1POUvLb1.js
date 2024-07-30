import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as e,a as s}from"./app-CbPcg273.js";const t={},p=s(`<h1 id="java中getter和setter的重要性" tabindex="-1"><a class="header-anchor" href="#java中getter和setter的重要性"><span>Java中Getter和Setter的重要性</span></a></h1><ol><li>引言</li></ol><p>Getter和Setter在Java中扮演着重要的角色，用于在封装类之外检索和更新变量的值。Setter用于更新变量的值，而Getter用于读取变量的值。本教程将讨论不使用Getter/Setter的问题、它们的重要性以及在Java中实现它们时应避免的常见错误。</p><ol start="2"><li>Java中没有Getter和Setter的生活</li></ol><p>想象一下，如果我们想根据某些条件改变对象的状态，没有Setter方法我们如何实现这一点？</p><ul><li>将变量标记为public、protected或默认</li><li>使用点(.)操作符更改值</li></ul><p>让我们看看这样做的后果。</p><ol start="3"><li>没有Getter和Setter访问变量</li></ol><p>首先，要在类外部访问变量而不使用Getter和Setter，我们必须将它们标记为public、protected或默认。<strong>这样，我们就失去了对数据的控制，损害了面向对象编程的基本原则——封装。</strong></p><p>其次，由于任何人都可以直接从类外部更改非私有字段，<strong>我们无法实现不变性。</strong></p><p>第三，我们无法为变量的更改提供任何条件逻辑。让我们考虑一个名为_Employee_的类，它有一个字段_retirementAge_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Employee</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> retirementAge<span class="token punctuation">;</span>

<span class="token comment">// 构造函数，但没有getter/setter</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意，我们在这里将字段设置为public，以便从类外部访问_Employee_。现在，我们需要更改员工的_retirementAge_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RetirementAgeModifier</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token class-name">Employee</span> employee <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Employee</span><span class="token punctuation">(</span><span class="token string">&quot;John&quot;</span><span class="token punctuation">,</span> <span class="token number">58</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">modifyRetirementAge</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        employee<span class="token punctuation">.</span>retirementAge<span class="token operator">=</span><span class="token number">18</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，任何_Employee_类的客户端都可以轻易地对_retirementAge_字段做他们想做的事情。<strong>没有办法验证更改。</strong></p><p>第四，我们如何实现从类外部对字段的只读或只写访问？</p><p>这时Getter和Setter就派上用场了。</p><p>让我们来谈谈使用Getter和Setter的一些最重要的好处：</p><ul><li><strong>它帮助我们实现封装，这是用来隐藏类内结构化数据对象的状态，防止未经授权的直接访问</strong></li><li>通过将字段声明为private并仅使用getters来实现不变性</li><li><strong>Getter和Setter还允许我们更容易地添加额外的功能，如验证、错误处理，以便在未来更容易地添加条件逻辑。因此我们可以添加条件逻辑并根据需要提供行为</strong></li><li>我们可以为字段提供不同的访问级别；例如，get（读取访问）可以是public，而set（写入访问）可以是protected</li><li>控制正确设置属性值</li><li>使用Getter和Setter，我们还实现了面向对象的另一个关键原则，即抽象，隐藏实现细节，以便没有人可以在其他类或模块中直接使用字段</li></ul><ol start="5"><li>避免错误</li></ol><p>以下是实现Getter和Setter时需要避免的最常见的错误。</p><h3 id="_5-1-使用公共变量的getter和setter" tabindex="-1"><a class="header-anchor" href="#_5-1-使用公共变量的getter和setter"><span>5.1 使用公共变量的Getter和Setter</span></a></h3><p>公共变量可以使用点(.)操作符在类外部访问。对于公共变量使用Getter和Setter是没有意义的：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Employee</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> retirementAge<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setName</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// retirementAge的getter/setter</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这种情况下，使用Getter和Setter可以做到的事情也可以通过简单地使字段公开来完成。</p><p>作为经验法则，我们需要<strong>始终根据需要使用最受限的访问修饰符以实现封装。</strong></p><h3 id="_5-2-在setter方法中直接分配对象引用" tabindex="-1"><a class="header-anchor" href="#_5-2-在setter方法中直接分配对象引用"><span>5.2 在Setter方法中直接分配对象引用</span></a></h3><p>当我们在Setter方法中直接分配对象引用时，这两个引用指向内存中的同一个对象。因此，使用任何一个引用变量所做的更改实际上是对同一个对象进行的：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setEmployee</span><span class="token punctuation">(</span><span class="token class-name">Employee</span> employee<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>employee <span class="token operator">=</span> employee<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然而，我们可以通过深度复制将一个对象的所有元素复制到另一个对象中。这样，_this_对象的状态就独立于现有的（传递的）员工对象：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setEmployee</span><span class="token punctuation">(</span><span class="token class-name">Employee</span> employee<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>employee<span class="token punctuation">.</span><span class="token function">setName</span><span class="token punctuation">(</span>employee<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>employee<span class="token punctuation">.</span><span class="token function">setRetirementAge</span><span class="token punctuation">(</span>employee<span class="token punctuation">.</span><span class="token function">getRetirementAge</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-3-直接从getter方法返回对象引用" tabindex="-1"><a class="header-anchor" href="#_5-3-直接从getter方法返回对象引用"><span>5.3 直接从Getter方法返回对象引用</span></a></h3><p>同样，如果Getter方法直接返回对象的引用，任何外部代码都可以使用这个引用来更改对象的状态：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">Employee</span> <span class="token function">getEmployee</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>employee<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们使用这个_getEmployee()<em>方法来更改_retirementAge</em>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">modifyAge</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Employee</span> employeeTwo <span class="token operator">=</span> <span class="token function">getEmployee</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    employeeTwo<span class="token punctuation">.</span><span class="token function">setRetirementAge</span><span class="token punctuation">(</span><span class="token number">65</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这导致了原始对象的不可恢复的损失。</p><p>因此，而不是从Getter方法返回引用，我们应该返回对象的副本。一种方法是：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">Employee</span> <span class="token function">getEmployee</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Employee</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>employee<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>employee<span class="token punctuation">.</span><span class="token function">getRetirementAge</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然而，我们还应该记住，在Getter或Setter中创建对象副本并不总是最佳实践。例如，在循环中调用上述Getter方法可能会导致昂贵的操作。</p><p>另一方面，如果我们希望我们的集合保持不可修改，那么从Getter返回集合的副本是有意义的。然后我们必须确定哪种方法在特定情况下最合适。</p><h3 id="_5-4-添加不必要的getter和setter" tabindex="-1"><a class="header-anchor" href="#_5-4-添加不必要的getter和setter"><span>5.4 添加不必要的Getter和Setter</span></a></h3><p>通过拥有Getter和Setter，我们可以控制成员变量的访问和分配。但在许多地方，这被证明是不必要的。此外，它使代码变得冗长：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> name<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setName</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>简单地为类中的私有字段定义公共的getter和setter等同于在没有getter和setter的情况下使字段公开。因此，总是建议深思熟虑地决定是否为所有字段定义访问器方法。</p><ol start="6"><li>结论</li></ol><p>在本教程中，我们讨论了在Java中使用Getter和Setter的优缺点。我们还讨论了实现Getter和Setter时需要避免的一些常见错误，以及如何适当地使用它们。</p>`,47),o=[p];function l(i,c){return e(),a("div",null,o)}const d=n(t,[["render",l],["__file","2024-07-27-Significance of Getters and Setters in Java.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-27/2024-07-27-Significance%20of%20Getters%20and%20Setters%20in%20Java.html","title":"Java中Getter和Setter的重要性","lang":"zh-CN","frontmatter":{"date":"2024-07-28T00:00:00.000Z","category":["Java","Programming"],"tag":["Getters","Setters"],"head":[["meta",{"name":"keywords","content":"Java, Getters, Setters, Encapsulation, OOP"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-27/2024-07-27-Significance%20of%20Getters%20and%20Setters%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中Getter和Setter的重要性"}],["meta",{"property":"og:description","content":"Java中Getter和Setter的重要性 引言 Getter和Setter在Java中扮演着重要的角色，用于在封装类之外检索和更新变量的值。Setter用于更新变量的值，而Getter用于读取变量的值。本教程将讨论不使用Getter/Setter的问题、它们的重要性以及在Java中实现它们时应避免的常见错误。 Java中没有Getter和Sette..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-27T17:00:07.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Getters"}],["meta",{"property":"article:tag","content":"Setters"}],["meta",{"property":"article:published_time","content":"2024-07-28T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-27T17:00:07.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中Getter和Setter的重要性\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-28T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-27T17:00:07.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中Getter和Setter的重要性 引言 Getter和Setter在Java中扮演着重要的角色，用于在封装类之外检索和更新变量的值。Setter用于更新变量的值，而Getter用于读取变量的值。本教程将讨论不使用Getter/Setter的问题、它们的重要性以及在Java中实现它们时应避免的常见错误。 Java中没有Getter和Sette..."},"headers":[{"level":3,"title":"5.1 使用公共变量的Getter和Setter","slug":"_5-1-使用公共变量的getter和setter","link":"#_5-1-使用公共变量的getter和setter","children":[]},{"level":3,"title":"5.2 在Setter方法中直接分配对象引用","slug":"_5-2-在setter方法中直接分配对象引用","link":"#_5-2-在setter方法中直接分配对象引用","children":[]},{"level":3,"title":"5.3 直接从Getter方法返回对象引用","slug":"_5-3-直接从getter方法返回对象引用","link":"#_5-3-直接从getter方法返回对象引用","children":[]},{"level":3,"title":"5.4 添加不必要的Getter和Setter","slug":"_5-4-添加不必要的getter和setter","link":"#_5-4-添加不必要的getter和setter","children":[]}],"git":{"createdTime":1722099607000,"updatedTime":1722099607000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.92,"words":1476},"filePathRelative":"posts/baeldung/2024-07-27/2024-07-27-Significance of Getters and Setters in Java.md","localizedDate":"2024年7月28日","excerpt":"\\n<ol>\\n<li>引言</li>\\n</ol>\\n<p>Getter和Setter在Java中扮演着重要的角色，用于在封装类之外检索和更新变量的值。Setter用于更新变量的值，而Getter用于读取变量的值。本教程将讨论不使用Getter/Setter的问题、它们的重要性以及在Java中实现它们时应避免的常见错误。</p>\\n<ol start=\\"2\\">\\n<li>Java中没有Getter和Setter的生活</li>\\n</ol>\\n<p>想象一下，如果我们想根据某些条件改变对象的状态，没有Setter方法我们如何实现这一点？</p>\\n<ul>\\n<li>将变量标记为public、protected或默认</li>\\n<li>使用点(.)操作符更改值</li>\\n</ul>","autoDesc":true}');export{d as comp,k as data};
