import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as e}from"./app-DzJ3ruqA.js";const t={},p=e(`<h1 id="java中构造器链式调用" tabindex="-1"><a class="header-anchor" href="#java中构造器链式调用"><span>Java中构造器链式调用</span></a></h1><p>在这个简短的教程中，我们将看到如何在Java中链式调用构造器。这是一种方便的设计理念，它减少了代码的重复，使代码更加易读。</p><p>首先，我们将解释构造器链式调用的含义。然后，我们将看到如何在同一个类中链式调用它们，以及如何使用父类的构造器。最后，我们将分析这种方法的优点和缺点。</p><h3 id="_2-1-同一类中构造器的链式调用" tabindex="-1"><a class="header-anchor" href="#_2-1-同一类中构造器的链式调用"><span>2.1. 同一类中构造器的链式调用</span></a></h3><p>让我们定义一个简单的<code>Person</code>类，它包含一些属性：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">String</span> firstName<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">String</span> middleName<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">String</span> lastName<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token keyword">int</span> age<span class="token punctuation">;</span>

    <span class="token comment">//getters, equals和hashcode</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>firstName</code>、<code>lastName</code>和<code>age</code>是在对象初始化时我们总是要设置的属性。然而，并不是每个人都有中间名。因此，<code>middleName</code>属性是可选的。</p><p>考虑到这一点，我们将创建两个构造器。第一个接受所有四个属性：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token class-name">String</span> firstName<span class="token punctuation">,</span> <span class="token class-name">String</span> middleName<span class="token punctuation">,</span> <span class="token class-name">String</span> lastName<span class="token punctuation">,</span> <span class="token keyword">int</span> age<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>firstName <span class="token operator">=</span> firstName<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>middleName <span class="token operator">=</span> middleName<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>lastName <span class="token operator">=</span> lastName<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> age<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第二个构造器将接受三个必需的属性并省略可选字段：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token class-name">String</span> firstName<span class="token punctuation">,</span> <span class="token class-name">String</span> lastName<span class="token punctuation">,</span> <span class="token keyword">int</span> age<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">(</span>firstName<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> lastName<span class="token punctuation">,</span> age<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们使用<code>this()</code>关键字。它必须是构造器的第一行。这确保了我们正在链式调用的构造器首先被调用。</p><p>请记住，构造器在类中的顺序并不重要。这意味着我们的第二个构造器可以放在<code>Person</code>类的任何位置，它仍然可以正确工作。</p><h3 id="_2-2-从父类链式调用构造器" tabindex="-1"><a class="header-anchor" href="#_2-2-从父类链式调用构造器"><span>2.2. 从父类链式调用构造器</span></a></h3><p>让我们定义一个从上一节中创建的<code>Person</code>类继承的<code>Customer</code>类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Customer</span> <span class="token keyword">extends</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">String</span> loyaltyCardId<span class="token punctuation">;</span>

    <span class="token comment">//getters, equals和hashcode</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>它包含一个额外的属性。现在，让我们以类似于<code>Person</code>类的方式创建两个构造器：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">Customer</span><span class="token punctuation">(</span><span class="token class-name">String</span> firstName<span class="token punctuation">,</span> <span class="token class-name">String</span> lastName<span class="token punctuation">,</span> <span class="token keyword">int</span> age<span class="token punctuation">,</span> <span class="token class-name">String</span> loyaltyCardId<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">(</span>firstName<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> lastName<span class="token punctuation">,</span> age<span class="token punctuation">,</span> loyaltyCardId<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token class-name">Customer</span><span class="token punctuation">(</span><span class="token class-name">String</span> firstName<span class="token punctuation">,</span> <span class="token class-name">String</span> middleName<span class="token punctuation">,</span> <span class="token class-name">String</span> lastName<span class="token punctuation">,</span> <span class="token keyword">int</span> age<span class="token punctuation">,</span> <span class="token class-name">String</span> loyaltyCardId<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">(</span>firstName<span class="token punctuation">,</span> middleName<span class="token punctuation">,</span> lastName<span class="token punctuation">,</span> age<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>loyaltyCardId <span class="token operator">=</span> loyaltyCardId<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第一个构造器使用<code>this()</code>关键字链式调用到第二个构造器，它接受所有必需和可选属性。在这里，我们首次使用<code>super()</code>关键字。</p><p>它的行为与<code>this()</code>关键字非常相似。唯一的区别是<code>super()</code>链式调用到父类中的相应构造器，而<code>this()</code>链式调用到同一类中的构造器。</p><p>请记住，与之前的关键字类似，<code>super()</code>必须始终是构造器的第一行。这意味着首先调用父类的构造器。之后，将值分配给<code>loyaltyCardId</code>属性。</p><h2 id="_3-构造器链式调用的优点和缺点" tabindex="-1"><a class="header-anchor" href="#_3-构造器链式调用的优点和缺点"><span>3. 构造器链式调用的优点和缺点</span></a></h2><p>构造器链式调用的最大优点是<strong>减少重复代码</strong>。换句话说，我们使用了不要重复自己（DRY）原则。这是因为我们在单个构造器中完成了对象的初始化，通常是接受所有属性的那个构造器。其他构造器只是用于传递接收到的数据并为缺失的属性添加默认值。</p><p>链式调用构造器使代码更易读。我们不必在所有构造器中重复属性赋值。相反，我们在一个地方完成这个操作。</p><p>另一方面，<strong>使用构造器链式调用时，我们暴露了更多的对象构造方式</strong>。这在某些项目中可能是一个显著的缺点。在这些情况下，我们应该寻找工厂或建造者模式来隐藏多个构造器。</p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们讨论了Java中的构造器链式调用。首先，我们解释了什么是构造器链式调用。然后，我们展示了如何在同一个类中这样做，以及如何使用父类的构造器。最后，我们讨论了链式构造器的优点和缺点。</p><p>和往常一样，本文的完整源代码可以在GitHub上找到。</p>`,28),o=[p];function c(l,i){return s(),n("div",null,o)}const u=a(t,[["render",c],["__file","2024-07-24-Chaining Constructors in Java.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-24/2024-07-24-Chaining%20Constructors%20in%20Java.html","title":"Java中构造器链式调用","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Tutorial"],"tag":["Java","Constructor Chaining"],"head":[["meta",{"name":"keywords","content":"Java, Constructor Chaining, Chaining Constructors in Java, Java Tutorial"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-24/2024-07-24-Chaining%20Constructors%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中构造器链式调用"}],["meta",{"property":"og:description","content":"Java中构造器链式调用 在这个简短的教程中，我们将看到如何在Java中链式调用构造器。这是一种方便的设计理念，它减少了代码的重复，使代码更加易读。 首先，我们将解释构造器链式调用的含义。然后，我们将看到如何在同一个类中链式调用它们，以及如何使用父类的构造器。最后，我们将分析这种方法的优点和缺点。 2.1. 同一类中构造器的链式调用 让我们定义一个简单..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-24T19:50:37.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Constructor Chaining"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-24T19:50:37.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中构造器链式调用\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-24T19:50:37.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中构造器链式调用 在这个简短的教程中，我们将看到如何在Java中链式调用构造器。这是一种方便的设计理念，它减少了代码的重复，使代码更加易读。 首先，我们将解释构造器链式调用的含义。然后，我们将看到如何在同一个类中链式调用它们，以及如何使用父类的构造器。最后，我们将分析这种方法的优点和缺点。 2.1. 同一类中构造器的链式调用 让我们定义一个简单..."},"headers":[{"level":3,"title":"2.1. 同一类中构造器的链式调用","slug":"_2-1-同一类中构造器的链式调用","link":"#_2-1-同一类中构造器的链式调用","children":[]},{"level":3,"title":"2.2. 从父类链式调用构造器","slug":"_2-2-从父类链式调用构造器","link":"#_2-2-从父类链式调用构造器","children":[]},{"level":2,"title":"3. 构造器链式调用的优点和缺点","slug":"_3-构造器链式调用的优点和缺点","link":"#_3-构造器链式调用的优点和缺点","children":[]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1721850637000,"updatedTime":1721850637000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.43,"words":1028},"filePathRelative":"posts/baeldung/2024-07-24/2024-07-24-Chaining Constructors in Java.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在这个简短的教程中，我们将看到如何在Java中链式调用构造器。这是一种方便的设计理念，它减少了代码的重复，使代码更加易读。</p>\\n<p>首先，我们将解释构造器链式调用的含义。然后，我们将看到如何在同一个类中链式调用它们，以及如何使用父类的构造器。最后，我们将分析这种方法的优点和缺点。</p>\\n<h3>2.1. 同一类中构造器的链式调用</h3>\\n<p>让我们定义一个简单的<code>Person</code>类，它包含一些属性：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">Person</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">private</span> <span class=\\"token keyword\\">final</span> <span class=\\"token class-name\\">String</span> firstName<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">private</span> <span class=\\"token keyword\\">final</span> <span class=\\"token class-name\\">String</span> middleName<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">private</span> <span class=\\"token keyword\\">final</span> <span class=\\"token class-name\\">String</span> lastName<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">private</span> <span class=\\"token keyword\\">final</span> <span class=\\"token keyword\\">int</span> age<span class=\\"token punctuation\\">;</span>\\n\\n    <span class=\\"token comment\\">//getters, equals和hashcode</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{u as comp,k as data};
